import sys, itertools
from semsim import *
from m_patterns import inc, report, outs

# ======================= producer-consumer (bounded buffer) =======================
def pc_model(N=2, nprod=2, ncons=2, per=1, variant='ok', sp0=None, it0=0, mode='set'):
    items_total = [(p, j) for p in range(nprod) for j in range(per)]
    def put(e):
        if e['buf'][e['fill']] is not None:
            e['bad'] = 'overwrite'
        b = list(e['buf']); b[e['fill']] = e['item%d' % e['me']]; e['buf'] = tuple(b)
    def adv_fill(e): e['fill'] = (e['fill'] + 1) % N
    def get(e):
        x = e['buf'][e['use']]
        if x is None:
            e['bad'] = 'read-empty'
        b = list(e['buf']); b[e['use']] = None; e['buf'] = tuple(b)
        e['got'] = tuple(sorted(e['got'] + ((x,) if x is not None else ())))
    def adv_use(e): e['use'] = (e['use'] + 1) % N
    def setitem(p, j):
        def f(e): e['item%d' % e['me']] = (p, j)
        return DO(f, f'item = produce()')
    vars = {'buf': (None,) * N, 'fill': 0, 'use': 0, 'got': (), 'bad': None}
    threads = []
    for p in range(nprod):
        vars['item%d' % p] = None
        code = []
        for j in range(per):
            code.append(setitem(p, j))
            if variant == 'ok':
                code += [P('spaces'), P('mutex'), DO(put, 'buffer[fill] = item'), DO(adv_fill, 'fill = (fill+1) % N'), V('mutex'), V('items')]
            elif variant == 'lock-outside':   # OSTEP Fig 31.11
                code += [P('mutex'), P('spaces'), DO(put, 'buffer[fill] = item'), DO(adv_fill, 'fill = (fill+1) % N'), V('items'), V('mutex')]
            elif variant == 'no-mutex':
                code += [P('spaces'), DO(put, 'buffer[fill] = item'), DO(adv_fill, 'fill = (fill+1) % N'), V('items')]
            elif variant == 'cons-lock-outside':  # Downey deadlock #4: only consumer wrong
                code += [P('spaces'), P('mutex'), DO(put, 'buffer[fill] = item'), DO(adv_fill, 'fill = (fill+1) % N'), V('mutex'), V('items')]
        threads.append(Thread('P%d' % p, code))
    for c in range(ncons):
        code = []
        for j in range(per * nprod // ncons):
            if variant == 'ok' or variant == 'no-mutex' and False:
                code += [P('items'), P('mutex'), DO(get, 'item = buffer[use]'), DO(adv_use, 'use = (use+1) % N'), V('mutex'), V('spaces')]
            elif variant in ('lock-outside', 'cons-lock-outside'):
                code += [P('mutex'), P('items'), DO(get, 'item = buffer[use]'), DO(adv_use, 'use = (use+1) % N'), V('spaces'), V('mutex')]
            elif variant == 'no-mutex':
                code += [P('items'), DO(get, 'item = buffer[use]'), DO(adv_use, 'use = (use+1) % N'), V('spaces')]
        threads.append(Thread('C%d' % c, code))
    sp = N if sp0 is None else sp0
    m = Model({'mutex': 1, 'items': it0, 'spaces': sp}, vars, threads, track_out=False,
              invariant=lambda v: v.v('bad') is None, mode=mode)
    return m, sorted(items_total)

def producer_consumer():
    for (N, np_, nc, per) in [(2, 2, 2, 1), (2, 1, 1, 4), (1, 2, 2, 1), (2, 2, 2, 2)]:
        m, allitems = pc_model(N, np_, nc, per, 'ok')
        r = m.explore()
        lost = [st for st in r['terminal'] if st[2][m.vi['got']] != tuple(allitems)]
        print(f'PC ok N={N} prod={np_} cons={nc} per={per}: states={r["states"]} terminal={len(r["terminal"])} deadlocks={len(r["deadlocks"])} violations={len(r["violations"])} lost/dup-item-runs={len(lost)}')
    for variant in ['lock-outside', 'cons-lock-outside']:
        m, allitems = pc_model(2, 1, 1, 2, variant)
        r = m.explore()
        print(f'\nPC {variant} N=2 1 prod 1 cons 2 items: deadlock-states={len(r["deadlocks"])} terminal={len(r["terminal"])}')
        st = min(r['deadlocks'], key=lambda s: len(m.path(s)))
        print(m.table(m.path(st), vars=['buf']))
    m, allitems = pc_model(2, 2, 1, 1, 'no-mutex')
    # consumers: 2 items, 1 consumer
    r = m.explore()
    print(f'\nPC no-mutex N=2, 2 producers: violations={len(r["violations"])} (types={sorted({st[2][m.vi["bad"]] for st in r["violations"]})})')
    st = min(r['violations'], key=lambda s: len(m.path(s)))
    print(m.table(m.path(st), vars=['buf', 'fill']))
    m, allitems = pc_model(2, 1, 1, 2, 'ok', sp0=0)
    r = m.explore(); print(f'\nPC wrong init spaces=0: deadlock-states={len(r["deadlocks"])} terminal={len(r["terminal"])}')
    m, allitems = pc_model(2, 1, 1, 1, 'ok', it0=1)
    r = m.explore(); print(f'PC wrong init items=1: violations={len(r["violations"])} types={sorted({st[2][m.vi["bad"]] for st in r["violations"]})}')
    # Trace table of correct version N=2, producer 3 items fast, consumer slow
    m, allitems = pc_model(2, 1, 1, 3, 'ok', mode='fifo')
    r = m.explore()
    # choose a path where producer blocks on full buffer: find terminal path containing a blocked producer state
    best = None
    for st in r['terminal']:
        p = m.path(st)
        if any(nxt[4][m.si['spaces']] for (_, _, nxt) in p):
            if best is None or len(p) < len(best):
                best = p
    print('\nTrace: N=2, producer blocks when buffer is full:')
    print(m.table(best, vars=['buf']))

# ======================= lost wakeup with sleep()/wakeup() =======================
def lost_wakeup():
    N = 1
    def sleepP(e): e['asleepP'] = True
    def sleepC(e): e['asleepC'] = True
    def wakeC(e):
        if e['asleepC']: e['asleepC'] = False
        else: e['lost'] = e['lost'] + 1
    def wakeP(e):
        if e['asleepP']: e['asleepP'] = False
        else: e['lost'] = e['lost'] + 1
    prod, cons = [], []
    for j in range(2):
        prod += [JF(lambda e: e['count'] == N, f'pok{j}', 'if (count == N)'), DO(sleepP, 'sleep()'),
                 AWAIT(lambda e: not e['asleepP'], '(asleep)'), L(f'pok{j}'),
                 inc('count', 1, 'insert_item(); count = count + 1'),
                 JF(lambda e: e['count'] == 1, f'pnw{j}', 'if (count == 1)'), DO(wakeC, 'wakeup(consumer)'), L(f'pnw{j}')]
        cons += [JF(lambda e: e['count'] == 0, f'cok{j}', 'if (count == 0)'), DO(sleepC, 'sleep()'),
                 AWAIT(lambda e: not e['asleepC'], '(asleep)'), L(f'cok{j}'),
                 inc('count', -1, 'remove_item(); count = count - 1'),
                 JF(lambda e: e['count'] == N - 1, f'cnw{j}', 'if (count == N-1)'), DO(wakeP, 'wakeup(producer)'), L(f'cnw{j}')]
    m = Model({}, {'count': 0, 'asleepP': False, 'asleepC': False, 'lost': 0},
              [Thread('Producer', prod), Thread('Consumer', cons)], track_out=False)
    r = m.explore()
    print(f'\n=== Lost wakeup (sleep/wakeup, N=1, 2 items): deadlock-states={len(r["deadlocks"])} terminal={len(r["terminal"])}')
    st = min(r['deadlocks'], key=lambda s: len(m.path(s)))
    print(m.table(m.path(st), sems=[], vars=['count', 'asleepP', 'asleepC', 'lost']))

# ======================= readers-writers =======================
def ls_lock(sw, sem, lab, use_mutex=True):
    c = [P(sw + 'M')] if use_mutex else []
    c += [inc(sw + 'C', 1, f'{sw}.counter += 1'),
          JF(lambda e, k=sw + 'C': e[k] == 1, lab, f'if {sw}.counter == 1:'), P(sem), L(lab)]
    c += [V(sw + 'M')] if use_mutex else []
    return c

def ls_unlock(sw, sem, lab, use_mutex=True):
    c = [P(sw + 'M')] if use_mutex else []
    c += [inc(sw + 'C', -1, f'{sw}.counter -= 1'),
          JF(lambda e, k=sw + 'C': e[k] == 0, lab, f'if {sw}.counter == 0:'), V(sem), L(lab)]
    c += [V(sw + 'M')] if use_mutex else []
    return c

def rw_threads(variant, nR=2, nW=1, loopR=False, loopW=False, use_ls_mutex=True):
    enterR, exitR = inc('nR', 1, '# reader in CS'), inc('nR', -1, '# reader leaves CS')
    enterW, exitW = inc('nW', 1, '# writer in CS'), inc('nW', -1, '# writer leaves CS')
    threads = []
    for i in range(nR):
        if variant == 'pref':
            c = [L('top')] + ls_lock('readSwitch', 'roomEmpty', 'l1', use_ls_mutex) + [enterR, exitR] + ls_unlock('readSwitch', 'roomEmpty', 'l2', use_ls_mutex)
        elif variant == 'nostarve':
            c = [L('top'), P('turnstile'), V('turnstile')] + ls_lock('readSwitch', 'roomEmpty', 'l1') + [enterR, exitR] + ls_unlock('readSwitch', 'roomEmpty', 'l2')
        elif variant == 'wpri':
            c = [L('top'), P('noReaders')] + ls_lock('readSwitch', 'noWriters', 'l1') + [V('noReaders'), enterR, exitR] + ls_unlock('readSwitch', 'noWriters', 'l2')
        if loopR: c += [J('top')]
        threads.append(Thread('R%d' % i, c))
    for i in range(nW):
        if variant == 'pref':
            c = [L('top'), P('roomEmpty'), enterW, exitW, V('roomEmpty')]
        elif variant == 'nostarve':
            c = [L('top'), P('turnstile'), P('roomEmpty'), enterW, exitW, V('turnstile'), V('roomEmpty')]
        elif variant == 'wpri':
            c = [L('top')] + ls_lock('writeSwitch', 'noReaders', 'l1') + [P('noWriters'), enterW, exitW, V('noWriters')] + ls_unlock('writeSwitch', 'noReaders', 'l2')
        if loopW: c += [J('top')]
        threads.append(Thread('W%d' % i, c))
    return threads

def rw_model(variant, nR=2, nW=1, loopR=False, loopW=False, roomEmpty0=1, use_ls_mutex=True, mode='set'):
    sems = {'readSwitchM': 1, 'roomEmpty': roomEmpty0, 'turnstile': 1, 'writeSwitchM': 1, 'noReaders': 1, 'noWriters': 1}
    vars = {'readSwitchC': 0, 'writeSwitchC': 0, 'nR': 0, 'nW': 0}
    inv = lambda v: v.v('nW') <= 1 and not (v.v('nW') > 0 and v.v('nR') > 0)
    return Model(sems, vars, rw_threads(variant, nR, nW, loopR, loopW, use_ls_mutex), track_out=False, invariant=inv, mode=mode)

def readers_writers():
    for variant in ['pref', 'nostarve', 'wpri']:
        for (nR, nW) in [(2, 1), (2, 2), (3, 1)]:
            m = rw_model(variant, nR, nW); r = m.explore()
            print(f'RW {variant} R={nR} W={nW}: states={r["states"]} deadlocks={len(r["deadlocks"])} violations={len(r["violations"])}')
        m = rw_model(variant, 2, 1, loopR=True, loopW=True); r = m.explore()
        print(f'RW {variant} R=2 W=1 all looping forever: states={r["states"]} deadlocks={len(r["deadlocks"])} violations={len(r["violations"])}')
    m = rw_model('pref', 2, 1, use_ls_mutex=False); r = m.explore()
    print(f'\nRW BUG lightswitch without its mutex: violations={len(r["violations"])} deadlocks={len(r["deadlocks"])}')
    st = min(r['violations'], key=lambda s: len(m.path(s)))
    print(m.table(m.path(st), sems=['roomEmpty'], vars=['readSwitchC', 'nR', 'nW']))
    m = rw_model('pref', 2, 1, roomEmpty0=0); r = m.explore()
    print(f'RW BUG roomEmpty initialised to 0: deadlocks={len(r["deadlocks"])} terminal={len(r["terminal"])}')

def rw_starvation():
    prog_R = lambda u, w, t: w.v('nR') > u.v('nR')
    prog_W = lambda u, w, t: w.v('nW') > u.v('nW')
    for mode in ['set', 'fifo']:
        for variant in ['pref', 'nostarve', 'wpri']:
            # victim writer: readers loop forever, writer W0 one-shot
            m = rw_model(variant, 2, 1, loopR=True, loopW=False, mode=mode)
            victimW = 2
            res = m.fair_starvation_cycle(victimW, prog_R)
            print(f'STARVATION mode={mode} variant={variant}: writer can be blocked forever while readers keep entering? {res is not None}')
            if res and variant == 'pref' and mode == 'fifo':
                prefix, cycle = res
                print('prefix:'); print(m.table(prefix, sems=['readSwitchM', 'roomEmpty'], vars=['readSwitchC', 'nR', 'nW']))
                print('repeating cycle (W0 never runs):'); print(m.table(cycle, sems=['readSwitchM', 'roomEmpty'], vars=['readSwitchC', 'nR', 'nW'], start=len(prefix) + 1))
            if res and variant == 'nostarve' and mode == 'set':
                prefix, cycle = res
                print('nostarve with WEAK (set) semaphores - cycle:')
                print(m.table(cycle, sems=['turnstile', 'roomEmpty'], vars=['readSwitchC', 'nR', 'nW'], start=len(prefix) + 1))
            # victim reader: writers loop
            m = rw_model(variant, 1, 2, loopR=False, loopW=True, mode=mode)
            res = m.fair_starvation_cycle(0, prog_W)
            print(f'STARVATION mode={mode} variant={variant}: reader can be blocked forever while writers keep entering? {res is not None}')
            if res and variant == 'wpri' and mode == 'fifo':
                prefix, cycle = res
                print('repeating cycle (R0 never runs):'); print(m.table(cycle, sems=['noReaders', 'noWriters'], vars=['writeSwitchC', 'nR', 'nW'], start=len(prefix) + 1))

# ======================= unisex bathroom (categorical mutual exclusion) =======================
def unisex(nostarve=False, nF=2, nM=2, cap=1, loopF=False, loopM=False, mode='set'):
    threads = []
    for kind, n, loop in [('F', nF, loopF), ('M', nM, loopM)]:
        sw = 'femaleSwitch' if kind == 'F' else 'maleSwitch'
        mx = 'femaleMultiplex' if kind == 'F' else 'maleMultiplex'
        cnt = 'nF' if kind == 'F' else 'nM'
        for i in range(n):
            c = [L('top')]
            if nostarve:
                c += [P('turnstile')] + ls_lock(sw, 'empty', 'a') + [V('turnstile')]
            else:
                c += ls_lock(sw, 'empty', 'a')
            c += [P(mx), inc(cnt, 1, '# in bathroom'), inc(cnt, -1, '# leaves'), V(mx)] + ls_unlock(sw, 'empty', 'b')
            if loop: c += [J('top')]
            threads.append(Thread(f'{kind}{i}', c))
    sems = {'empty': 1, 'turnstile': 1, 'femaleSwitchM': 1, 'maleSwitchM': 1, 'femaleMultiplex': cap, 'maleMultiplex': cap}
    vars = {'femaleSwitchC': 0, 'maleSwitchC': 0, 'nF': 0, 'nM': 0}
    inv = lambda v: not (v.v('nF') > 0 and v.v('nM') > 0) and v.v('nF') <= cap and v.v('nM') <= cap
    return Model(sems, vars, threads, track_out=False, invariant=inv, mode=mode)

def bathroom():
    for ns in [False, True]:
        for cap in [1, 2]:
            m = unisex(ns, 2, 2, cap); r = m.explore()
            print(f'Unisex nostarve={ns} 2F+2M cap={cap}: states={r["states"]} deadlocks={len(r["deadlocks"])} violations={len(r["violations"])}')
    for ns in [False, True]:
        for mode in ['set', 'fifo']:
            m = unisex(ns, 2, 1, 2, loopF=True, loopM=False, mode=mode)
            res = m.fair_starvation_cycle(2, lambda u, w, t: w.v('nF') > u.v('nF'))
            print(f'Unisex nostarve={ns} mode={mode}: a man can wait forever while women keep entering? {res is not None}')

if __name__ == '__main__':
    which = sys.argv[1:] or ['all']
    if 'all' in which or 'pc' in which: producer_consumer()
    if 'all' in which or 'lw' in which: lost_wakeup()
    if 'all' in which or 'rw' in which: readers_writers()
    if 'all' in which or 'rws' in which: rw_starvation()
    if 'all' in which or 'ub' in which: bathroom()
