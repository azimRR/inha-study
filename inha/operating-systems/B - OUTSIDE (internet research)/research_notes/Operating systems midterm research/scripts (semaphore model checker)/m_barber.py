import sys
from semsim import *
from m_patterns import inc

def setv(name, val):
    def f(e): e[name] = val
    return f

# ---------------- Downey 5.2 barbershop, one barber ----------------
def downey_barbershop(n=2, ncust=3, nbarb=1, mode='set'):
    vars = {'customers': 0, 'balked': 0, 'served': 0, 'inHC': 0, 'pending': (), 'pair': (None,) * ncust,
            'bad': False, 'hc': (0,) * ncust}
    def barber_signal(b):
        def f(e):
            e['pending'] = e['pending'] + (b,)
            # barber may not call a new customer while his previous customer is still in the chair
            for c in range(ncust):
                if e['pair'][c] == b and e['hc'][c] == 1:
                    e['bad'] = True
            e['_V'] = ['barber']
        return DO(f, 'barber.signal()')
    def take_seat(c):
        def f(e):
            b = e['pending'][0]; e['pending'] = e['pending'][1:]
            p = list(e['pair']); p[c] = b; e['pair'] = tuple(p)
            h = list(e['hc']); h[c] = 1; e['hc'] = tuple(h)
            e['inHC'] += 1
        return DO(f, '# getHairCut() begins')
    def leave_chair(c):
        def f(e):
            h = list(e['hc']); h[c] = 0; e['hc'] = tuple(h); e['inHC'] -= 1
        return DO(f, '# getHairCut() ends')
    threads = []
    for c in range(ncust):
        code = [P('mutex'), JF(lambda e: e['customers'] == n, 'enter', 'if customers == n:'),
                V('mutex'), inc('balked', 1, 'balk()'), J('end'), L('enter'),
                inc('customers', 1, 'customers += 1'), V('mutex'), V('customer'), P('barber'),
                take_seat(c), leave_chair(c), V('customerDone'), P('barberDone'),
                P('mutex'), inc('customers', -1, 'customers -= 1'), V('mutex'), inc('served', 1, '(leaves)'), L('end')]
        threads.append(Thread(f'C{c}', code))
    for b in range(nbarb):
        code = [L('top'), P('customer'), barber_signal(b), DO(lambda e: None, '# cutHair()'),
                P('customerDone'), V('barberDone'), J('top')]
        threads.append(Thread(f'B{b}', code, daemon=True))
    inv = lambda v: (not v.v('bad')) and v.v('inHC') <= nbarb and v.v('customers') <= n
    m = Model({'mutex': 1, 'customer': 0, 'barber': 0, 'customerDone': 0, 'barberDone': 0}, vars, threads,
              track_out=False, invariant=inv, mode=mode)
    return m

# ---------------- k barbers, FIFO queue of per-customer semaphores ----------------
def multi_barber_fifo(n=3, ncust=3, nbarb=2, mode='set'):
    vars = {'customers': 0, 'queue': (), 'balked': 0, 'served': 0, 'bad': False,
            'hc': (0,) * ncust, 'servedby': (None,) * ncust}
    for b in range(nbarb):
        vars[f'cur{b}'] = None
        vars[f'cut{b}'] = 0
    sems = {'mutex': 1, 'customer': 0}
    for c in range(ncust):
        sems.update({f'call{c}': 0, f'cdone{c}': 0, f'bdone{c}': 0})
    def enqueue(c):
        def f(e): e['queue'] = e['queue'] + (c,); e['customers'] += 1
        return DO(f, 'customers += 1; queue.append(self)')
    def hc(c, on):
        def f(e):
            h = list(e['hc']); h[c] = on; e['hc'] = tuple(h)
            if on:
                b = e['servedby'][c]
                if b is None or e[f'cur{b}'] != c or e[f'cut{b}'] != 1:
                    e['bad'] = True
        return DO(f, '# getHairCut() begins' if on else '# getHairCut() ends')
    threads = []
    for c in range(ncust):
        code = [P('mutex'), JF(lambda e: e['customers'] == n, 'enter', 'if customers == n:'),
                V('mutex'), inc('balked', 1, 'balk()'), J('end'), L('enter'),
                enqueue(c), V('mutex'), V('customer'), P(f'call{c}'),
                hc(c, 1), hc(c, 0), V(f'cdone{c}'), P(f'bdone{c}'),
                P('mutex'), inc('customers', -1, 'customers -= 1'), V('mutex'), inc('served', 1, '(leaves)'), L('end')]
        threads.append(Thread(f'C{c}', code))
    for b in range(nbarb):
        def pop(e, b=b):
            c = e['queue'][0]; e['queue'] = e['queue'][1:]
            e[f'cur{b}'] = c
            s = list(e['servedby']); s[c] = b; e['servedby'] = tuple(s)
            e[f'cut{b}'] = 1
        def endcut(e, b=b):
            c = e[f'cur{b}']
            if e['hc'][c] == 1:
                e['bad'] = True   # barber finished while his customer still in the chair
            e[f'cut{b}'] = 0
        code = [L('top'), P('customer'), P('mutex'), DO(pop, 'c = queue.pop(0)'), V('mutex'),
                VD(lambda e, b=b: f"call{e[f'cur{b}']}", 'c.call.signal()'), DO(lambda e: None, '# cutHair()'),
                PD(lambda e, b=b: f"cdone{e[f'cur{b}']}", 'c.custDone.wait()'), DO(endcut, '(cutHair ends)'),
                VD(lambda e, b=b: f"bdone{e[f'cur{b}']}", 'c.barberDone.signal()'), J('top')]
        threads.append(Thread(f'B{b}', code, daemon=True))
    m = Model(sems, vars, threads, track_out=False, invariant=lambda v: not v.v('bad') and v.v('customers') <= n, mode=mode)
    return m

# ---------------- Wikipedia / Tanenbaum style (no "done" handshake) ----------------
def tanenbaum_barber(N=1, ncust=3, nbarb=1, mode='set'):
    vars = {'free': N, 'balked': 0, 'served': 0}
    threads = []
    for c in range(ncust):
        code = [P('accessWRSeats'), JF(lambda e: e['free'] > 0, 'full', 'if numberOfFreeWRSeats > 0:'),
                inc('free', -1, 'numberOfFreeWRSeats -= 1'), V('custReady'), V('accessWRSeats'), P('barberReady'),
                inc('served', 1, '# have hair cut'), J('end'), L('full'), V('accessWRSeats'), inc('balked', 1, '# leave'), L('end')]
        threads.append(Thread(f'C{c}', code))
    for b in range(nbarb):
        code = [L('top'), P('custReady'), P('accessWRSeats'), inc('free', 1, 'numberOfFreeWRSeats += 1'),
                V('barberReady'), V('accessWRSeats'), DO(lambda e: None, '# cut hair'), J('top')]
        threads.append(Thread(f'B{b}', code, daemon=True))
    return Model({'barberReady': 0, 'accessWRSeats': 1, 'custReady': 0}, vars, threads, track_out=False,
                 invariant=lambda v: 0 <= v.v('free') <= N, mode=mode)

def main():
    for (n, nc) in [(2, 3), (1, 3), (3, 4)]:
        m = downey_barbershop(n, nc, 1); r = m.explore()
        sb = sorted({(st[2][m.vi['served']], st[2][m.vi['balked']]) for st in r['terminal']})
        print(f'Downey barbershop 1 barber n={n} customers={nc}: states={r["states"]} deadlocks={len(r["deadlocks"])} violations={len(r["violations"])} (served,balked) outcomes={sb}')
    m = downey_barbershop(3, 3, 2); r = m.explore()
    print(f'Downey barbershop code with 2 barbers sharing customerDone/barberDone n=3 customers=3: deadlocks={len(r["deadlocks"])} violations={len(r["violations"])}')
    if r['violations']:
        st = min(r['violations'], key=lambda s: len(m.path(s)))
        print(m.table(m.path(st), sems=['customer', 'barber', 'customerDone', 'barberDone'], vars=['pair', 'hc']))
    for (n, nc, nb) in [(3, 3, 2), (2, 4, 2), (3, 4, 2)]:
        m = multi_barber_fifo(n, nc, nb); r = m.explore()
        sb = sorted({(st[2][m.vi['served']], st[2][m.vi['balked']]) for st in r['terminal']})
        print(f'k-barber FIFO per-customer handshake n={n} customers={nc} barbers={nb}: states={r["states"]} deadlocks={len(r["deadlocks"])} violations={len(r["violations"])} outcomes={sb}')
    for (N, nc, nb) in [(1, 3, 1), (2, 3, 1), (2, 3, 2)]:
        m = tanenbaum_barber(N, nc, nb); r = m.explore()
        sb = sorted({(st[2][m.vi['served']], st[2][m.vi['balked']]) for st in r['terminal']})
        print(f'Wikipedia/Tanenbaum barber N={N} customers={nc} barbers={nb}: states={r["states"]} deadlocks={len(r["deadlocks"])} violations={len(r["violations"])} outcomes={sb}')
    # trace for single barber, n=2 (1 waiting chair), 3 customers, one balks
    m = downey_barbershop(2, 3, 1, mode='fifo'); r = m.explore()
    best = None
    for st in r['terminal']:
        if st[2][m.vi['balked']] == 1:
            p = m.path(st)
            if best is None or len(p) < len(best): best = p
    print(m.table(best, sems=['mutex', 'customer', 'barber', 'customerDone', 'barberDone'], vars=['customers']))

if __name__ == '__main__':
    main()
