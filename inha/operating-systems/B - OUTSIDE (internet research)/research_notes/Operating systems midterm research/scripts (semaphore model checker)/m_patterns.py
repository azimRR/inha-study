import itertools, sys
from semsim import *

def outs(m, res):
    fin = sorted({' '.join(o) for (o, v) in res['finals']})
    dl = sorted({' '.join(st[3]) for st in res['deadlocks']})
    return fin, dl

def finals_var(m, res, name):
    return sorted({v[m.vi[name]] for (o, v) in res['finals']})

def report(title, m, res, show_outputs=True):
    fin, dl = outs(m, res)
    print(f'\n=== {title} (mode={m.mode}) ===')
    print(f'states={res["states"]} complete-runs-terminal-states={len(res["terminal"])} deadlock-states={len(res["deadlocks"])} violations={len(res["violations"])}')
    if show_outputs:
        print(f'possible complete outputs ({len(fin)}): {fin}')
        if dl:
            print(f'outputs printed on deadlocking runs ({len(dl)}): {dl}')

def inc(name, d=1, txt=None):
    def f(e, name=name, d=d):
        e[name] = e[name] + d
    return DO(f, txt or (f'{name} += {d}' if d > 0 else f'{name} -= {-d}'))

# ---------------- signaling ----------------
def signaling():
    m = Model({'sem': 0}, {}, [Thread('A', [OUT('a1'), V('sem'), OUT('a2')]),
                                 Thread('B', [OUT('b1'), P('sem'), OUT('b2')])])
    r = m.explore(); report('Signaling: A: a1; sem.signal(); a2 | B: b1; sem.wait(); b2', m, r)
    print('schedules (complete, deadlocking) =', m.count_paths())
    # all orders of the 4 prints without sync:
    m2 = Model({}, {}, [Thread('A', [OUT('a1'), OUT('a2')]), Thread('B', [OUT('b1'), OUT('b2')])])
    r2 = m2.explore(); report('No sync, 2+2 prints', m2, r2)

# ---------------- rendezvous ----------------
def rendezvous():
    good = Model({'aArrived': 0, 'bArrived': 0}, {}, [
        Thread('A', [OUT('a1'), V('aArrived'), P('bArrived'), OUT('a2')]),
        Thread('B', [OUT('b1'), V('bArrived'), P('aArrived'), OUT('b2')])])
    r = good.explore(); report('Rendezvous (signal then wait)', good, r)
    print('schedules (complete, deadlocking) =', good.count_paths())
    ineff = Model({'aArrived': 0, 'bArrived': 0}, {}, [
        Thread('A', [OUT('a1'), P('bArrived'), V('aArrived'), OUT('a2')]),
        Thread('B', [OUT('b1'), V('bArrived'), P('aArrived'), OUT('b2')])])
    r = ineff.explore(); report('Rendezvous (A waits first, B signals first) - less efficient', ineff, r)
    bad = Model({'aArrived': 0, 'bArrived': 0}, {}, [
        Thread('A', [OUT('a1'), P('bArrived'), V('aArrived'), OUT('a2')]),
        Thread('B', [OUT('b1'), P('aArrived'), V('bArrived'), OUT('b2')])])
    r = bad.explore(); report('Rendezvous DEADLOCK version (both wait first)', bad, r)
    print('schedules (complete, deadlocking) =', bad.count_paths())
    st = r['deadlocks'][0]
    print(bad.table(bad.path(st)))

# ---------------- count++ race and mutex ----------------
def counter(nthreads, iters, use_mutex, mode='set'):
    vars = {'count': 0}
    for i in range(nthreads):
        vars['tmp%d' % i] = 0
    def code():
        c = []
        for _ in range(iters):
            if use_mutex: c.append(P('mutex'))
            c.append(DO(lambda e: e.__setitem__('tmp%d' % e['me'], e['count']), 'temp = count'))
            c.append(DO(lambda e: e.__setitem__('count', e['tmp%d' % e['me']] + 1), 'count = temp + 1'))
            if use_mutex: c.append(V('mutex'))
        return c
    m = Model({'mutex': 1}, vars, [Thread('T%d' % i, code()) for i in range(nthreads)],
              track_out=False, mode=mode)
    r = m.explore()
    return m, r

def counters():
    for (n, k) in [(2, 1), (2, 2), (2, 3), (3, 1), (3, 2), (2, 4)]:
        m, r = counter(n, k, False)
        vals = finals_var(m, r, 'count')
        print(f'count++ race: {n} threads x {k} iterations, no mutex -> final count in {vals} (min {min(vals)}, max {max(vals)}); states={r["states"]}')
    m, r = counter(2, 2, True)
    print('with mutex 2x2 ->', finals_var(m, r, 'count'))
    m, r = counter(2, 1, False)
    # shortest lost-update trace
    for st in r['terminal']:
        if st[2][m.vi['count']] == 1:
            print(m.table(m.path(st), sems=[], vars=['count', 'tmp0', 'tmp1']))
            break

# ---------------- concurrent writes (Downey 1.5.1) ----------------
def concurrent_writes():
    m = Model({}, {'x': 0, 'printed': None}, [
        Thread('A', [DO(lambda e: e.__setitem__('x', 5), 'x = 5'), DO(lambda e: e.__setitem__('printed', e['x']), 'print x')]),
        Thread('B', [DO(lambda e: e.__setitem__('x', 7), 'x = 7')])], track_out=False)
    r = m.explore()
    print('\n=== Downey 1.5.1 concurrent writes: (printed, final x) pairs:',
          sorted({(v[m.vi['printed']], v[m.vi['x']]) for (o, v) in r['finals']}))

# ---------------- multiplex ----------------
def multiplex(init):
    code = [P('multiplex'), inc('inCS'), inc('inCS', -1), V('multiplex')]
    m = Model({'multiplex': init}, {'inCS': 0, 'maxCS': 0},
              [Thread('T%d' % i, code) for i in range(4)], track_out=False,
              invariant=lambda v: v.v('inCS') <= 2)
    r = m.explore()
    print(f'multiplex init={init}, 4 threads, require <=2 inside: violations={len(r["violations"])} deadlocks={len(r["deadlocks"])}')

# ---------------- barrier (single use) ----------------
def barrier(variant, N=3, mode='set'):
    def cp(e):
        e['bad'] = e['bad'] or e['arr'] < N
    c = [inc('arr', 1, 'rendezvous')]
    if variant in ('nonsol', 'sol'):
        c += [P('mutex'), inc('count', 1, 'count = count + 1'), V('mutex'),
              JF(lambda e: e['count'] == N, 'skip', 'if count == n:'), V('barrier'), L('skip'),
              P('barrier')]
        if variant == 'sol':
            c += [V('barrier')]
    elif variant == 'inside':
        c += [P('mutex'), inc('count', 1, 'count = count + 1'),
              JF(lambda e: e['count'] == N, 'skip', 'if count == n:'), V('barrier'), L('skip'),
              P('barrier'), V('barrier'), V('mutex')]
    c += [DO(cp, 'critical point')]
    m = Model({'mutex': 1, 'barrier': 0}, {'count': 0, 'arr': 0, 'bad': False},
              [Thread('T%d' % i, c) for i in range(N)], track_out=False,
              invariant=lambda v: not v.v('bad'), mode=mode)
    r = m.explore()
    fin = sorted({st[1][m.si['barrier']] for st in r['terminal']})
    print(f'\n=== Barrier variant={variant} n={N}: states={r["states"]} complete-terminal={len(r["terminal"])} deadlock-states={len(r["deadlocks"])} violations={len(r["violations"])} final barrier values={fin}')
    if variant != 'sol':
        print('schedules (complete, deadlocking) =', m.count_paths())
    return m, r

# ---------------- reusable barrier ----------------
def reusable(variant, N=2, laps=2, mode='set'):
    vars = {'count': 0, 'bad': False}
    for k in range(laps):
        vars['arr%d' % k] = 0
    def code():
        c = []
        for k in range(laps):
            def arrive(e, k=k): e['arr%d' % k] += 1
            def cp(e, k=k): e['bad'] = e['bad'] or e['arr%d' % k] < N
            c.append(DO(arrive, f'rendezvous (lap {k})'))
            if variant == 'nonsol2':
                c += [P('mutex'), inc('count', 1, 'count += 1'), JF(lambda e: e['count'] == N, f's1_{k}', 'if count == n:'),
                      V('turnstile'), L(f's1_{k}'), V('mutex'), P('turnstile'), V('turnstile'),
                      DO(cp, f'critical point (lap {k})'),
                      P('mutex'), inc('count', -1, 'count -= 1'), JF(lambda e: e['count'] == 0, f's2_{k}', 'if count == 0:'),
                      P('turnstile'), L(f's2_{k}'), V('mutex')]
            elif variant == 'twophase':
                c += [P('mutex'), inc('count', 1, 'count += 1'), JF(lambda e: e['count'] == N, f's1_{k}', 'if count == n:'),
                      P('turnstile2'), V('turnstile'), L(f's1_{k}'), V('mutex'), P('turnstile'), V('turnstile'),
                      DO(cp, f'critical point (lap {k})'),
                      P('mutex'), inc('count', -1, 'count -= 1'), JF(lambda e: e['count'] == 0, f's2_{k}', 'if count == 0:'),
                      P('turnstile'), V('turnstile2'), L(f's2_{k}'), V('mutex'), P('turnstile2'), V('turnstile2')]
            elif variant == 'preloaded':
                c += [P('mutex'), inc('count', 1, 'count += 1'), JF(lambda e: e['count'] == N, f's1_{k}', 'if count == n:'),
                      V('turnstile', N), L(f's1_{k}'), V('mutex'), P('turnstile'),
                      DO(cp, f'critical point (lap {k})'),
                      P('mutex'), inc('count', -1, 'count -= 1'), JF(lambda e: e['count'] == 0, f's2_{k}', 'if count == 0:'),
                      V('turnstile2', N), L(f's2_{k}'), V('mutex'), P('turnstile2')]
        return c
    t2 = 1 if variant == 'twophase' else 0
    m = Model({'mutex': 1, 'turnstile': 0, 'turnstile2': t2}, vars,
              [Thread('T%d' % i, code()) for i in range(N)], track_out=False,
              invariant=lambda v: not v.v('bad'), mode=mode)
    r = m.explore()
    print(f'\n=== Reusable barrier variant={variant} n={N} laps={laps} mode={mode}: states={r["states"]} complete-terminal={len(r["terminal"])} deadlock-states={len(r["deadlocks"])} violations={len(r["violations"])}')
    return m, r

# ---------------- precedence graphs ----------------
def linear_extensions(nodes, edges):
    cnt = []
    for perm in itertools.permutations(nodes):
        pos = {x: i for i, x in enumerate(perm)}
        if all(pos[a] < pos[b] for a, b in edges):
            cnt.append(' '.join(perm))
    return cnt

def prec_graph_edges(nodes, edges, mode='set'):
    """One thread per statement, one semaphore per edge (init 0)."""
    sems = {f'{a}{b}': 0 for a, b in edges}
    threads = []
    for x in nodes:
        code = [P(f'{a}{b}') for a, b in edges if b == x] + [OUT(x)] + [V(f'{a}{b}') for a, b in edges if a == x]
        threads.append(Thread(x, code))
    return Model(sems, {}, threads, mode=mode)

def precedence():
    nodes = ['S1', 'S2', 'S3', 'S4']
    edges = [('S1', 'S2'), ('S1', 'S3'), ('S2', 'S4'), ('S3', 'S4')]
    le = linear_extensions(nodes, edges)
    m = prec_graph_edges(nodes, edges); r = m.explore()
    report('Diamond precedence graph, one semaphore per edge', m, r)
    print('linear extensions (brute force):', le)
    # two counting semaphores
    m2 = Model({'s1done': 0, 'join': 0}, {}, [
        Thread('P1', [OUT('S1'), V('s1done'), V('s1done')]),
        Thread('P2', [P('s1done'), OUT('S2'), V('join')]),
        Thread('P3', [P('s1done'), OUT('S3'), V('join')]),
        Thread('P4', [P('join'), P('join'), OUT('S4')])])
    r2 = m2.explore(); report('Diamond, 2 counting semaphores', m2, r2)
    # two processes
    m3 = Model({'x': 0, 'y': 0}, {}, [
        Thread('PA', [OUT('S1'), V('x'), OUT('S2'), P('y'), OUT('S4')]),
        Thread('PB', [P('x'), OUT('S3'), V('y')])])
    r3 = m3.explore(); report('Diamond, 2 processes / 2 semaphores', m3, r3)
    # bug: one semaphore, one signal
    m4 = Model({'s1done': 0, 'join': 0}, {}, [
        Thread('P1', [OUT('S1'), V('s1done')]),
        Thread('P2', [P('s1done'), OUT('S2'), V('join')]),
        Thread('P3', [P('s1done'), OUT('S3'), V('join')]),
        Thread('P4', [P('join'), P('join'), OUT('S4')])])
    r4 = m4.explore(); report('BUG: S1 signals shared semaphore only once', m4, r4)
    # bug: S4 waits only once on join
    m5 = Model({'s1done': 0, 'join': 0}, {}, [
        Thread('P1', [OUT('S1'), V('s1done'), V('s1done')]),
        Thread('P2', [P('s1done'), OUT('S2'), V('join')]),
        Thread('P3', [P('s1done'), OUT('S3'), V('join')]),
        Thread('P4', [P('join'), OUT('S4')])])
    r5 = m5.explore(); report('BUG: S4 waits on join only once', m5, r5)
    # GfG 7-node example
    nodes7 = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7']
    edges7 = [('S1', 'S2'), ('S1', 'S3'), ('S2', 'S4'), ('S4', 'S5'), ('S4', 'S6'), ('S3', 'S7'), ('S5', 'S7'), ('S6', 'S7')]
    le7 = linear_extensions(nodes7, edges7)
    m7 = prec_graph_edges(nodes7, edges7); r7 = m7.explore()
    fin7, dl7 = outs(m7, r7)
    print(f'\n=== 7-node graph: edge-semaphore program outputs={len(fin7)}, linear extensions={len(le7)}, equal={sorted(fin7)==sorted(le7)}, deadlocks={len(r7["deadlocks"])}')
    m8 = Model({'x': 0, 'y': 0, 'j': 0}, {}, [
        Thread('PA', [OUT('S1'), V('x'), OUT('S2'), OUT('S4'), V('y'), OUT('S5'), P('j'), P('j'), OUT('S7')]),
        Thread('PB', [P('x'), OUT('S3'), V('j')]),
        Thread('PC', [P('y'), OUT('S6'), V('j')])])
    r8 = m8.explore(); fin8, dl8 = outs(m8, r8)
    print(f'7-node graph, 3 processes/3 semaphores: outputs={len(fin8)}, equal to linear extensions={sorted(fin8)==sorted(le7)}, deadlocks={len(r8["deadlocks"])}')
    for bad in [['S1', 'S3', 'S7'], ['S1', 'S2', 'S4', 'S5', 'S7']]:
        print('prefix', bad, 'possible?', any(o.startswith(' '.join(bad)) for o in le7))
    # N-shaped graph
    nodesN = ['a', 'b', 'c', 'd']
    edgesN = [('a', 'c'), ('b', 'c'), ('b', 'd')]
    leN = linear_extensions(nodesN, edgesN)
    mN = prec_graph_edges(nodesN, edgesN); rN = mN.explore(); finN, _ = outs(mN, rN)
    print(f'N-graph a->c, b->c, b->d: linear extensions={len(leN)} {leN}; program outputs equal={sorted(finN)==sorted(leN)}')

# ---------------- output-enumeration puzzles ----------------
def puzzles():
    # PZ3: one signal, two waiters
    m = Model({'s': 0}, {}, [Thread('T1', [P('s'), OUT('A')]), Thread('T2', [P('s'), OUT('B')]),
                             Thread('T3', [OUT('C'), V('s'), OUT('D')])])
    r = m.explore(); report('PZ3: T1: P(s);A  T2: P(s);B  T3: C;V(s);D  (s=0)', m, r)
    # PZ4: ping-pong
    m = Model({'a': 1, 'b': 0}, {}, [
        Thread('T1', [P('a'), OUT('1'), V('b'), P('a'), OUT('2'), V('b')]),
        Thread('T2', [P('b'), OUT('3'), V('a'), P('b'), OUT('4'), V('a')])])
    r = m.explore(); report('PZ4 ping-pong a=1,b=0', m, r)
    # PZ5: prints outside the critical section
    def add1(e): e['x'] = e['x'] + 1
    def dbl(e): e['x'] = e['x'] * 2
    def pr(e): e['_p'] = e['x']
    m = Model({'m': 1}, {'x': 0, 'log': ()}, [
        Thread('T1', [P('m'), DO(add1, 'x = x + 1'), V('m'), DO(lambda e: e.__setitem__('log', e['log'] + (('T1', e['x']),)), 'print x')]),
        Thread('T2', [P('m'), DO(dbl, 'x = x * 2'), V('m'), DO(lambda e: e.__setitem__('log', e['log'] + (('T2', e['x']),)), 'print x')])],
        track_out=False)
    r = m.explore()
    logs = sorted({' '.join(f'{a}:{b}' for a, b in v[m.vi['log']]) + f'  (final x={v[m.vi["x"]]})' for (o, v) in r['finals']})
    print('\n=== PZ5 prints outside CS: possible print sequences:', logs)
    # PZ5b: same without mutex, two-step updates
    m = Model({}, {'x': 0, 'r1': 0, 'r2': 0}, [
        Thread('T1', [DO(lambda e: e.__setitem__('r1', e['x']), 'r1 = x'), DO(lambda e: e.__setitem__('x', e['r1'] + 1), 'x = r1 + 1')]),
        Thread('T2', [DO(lambda e: e.__setitem__('r2', e['x']), 'r2 = x'), DO(lambda e: e.__setitem__('x', e['r2'] * 2), 'x = r2 * 2')])],
        track_out=False)
    r = m.explore(); print('PZ5b x=x+1 || x=x*2 unsynchronized, final x in', finals_var(m, r, 'x'))
    m = Model({'s': 0}, {'x': 0, 'r1': 0, 'r2': 0}, [
        Thread('T1', [DO(lambda e: e.__setitem__('r1', e['x']), 'r1 = x'), DO(lambda e: e.__setitem__('x', e['r1'] + 1), 'x = r1 + 1'), V('s')]),
        Thread('T2', [P('s'), DO(lambda e: e.__setitem__('r2', e['x']), 'r2 = x'), DO(lambda e: e.__setitem__('x', e['r2'] * 2), 'x = r2 * 2')])],
        track_out=False)
    r = m.explore(); print('PZ5c with signaling (T1 before T2), final x in', finals_var(m, r, 'x'))
    # PZ6: 3 threads, print before/after barrier
    N = 3
    def bcode(i):
        return [OUT(f'{i}'), P('mutex'), inc('count'), V('mutex'),
                JF(lambda e: e['count'] == N, 'skip', 'if count == n:'), V('barrier'), L('skip'),
                P('barrier'), V('barrier'), OUT(f"{i}'")]
    m = Model({'mutex': 1, 'barrier': 0}, {'count': 0}, [Thread('T%d' % i, bcode(i)) for i in range(N)])
    r = m.explore(); fin, dl = outs(m, r)
    print(f"\n=== PZ6 3 threads print i; barrier; print i': {len(fin)} distinct outputs; deadlocks={len(r['deadlocks'])}")
    # PZ7: interleaving counts
    m = Model({}, {}, [Thread('A', [OUT('a1'), OUT('a2'), OUT('a3')]), Thread('B', [OUT('b1'), OUT('b2'), OUT('b3')])])
    r = m.explore(); print('PZ7a two threads x 3 statements, no sync:', len(outs(m, r)[0]))
    m = Model({'aArr': 0, 'bArr': 0}, {}, [
        Thread('A', [OUT('a1'), V('aArr'), P('bArr'), OUT('a2'), OUT('a3')]),
        Thread('B', [OUT('b1'), V('bArr'), P('aArr'), OUT('b2'), OUT('b3')])])
    r = m.explore(); print('PZ7b with rendezvous after first statement:', len(outs(m, r)[0]))
    m = Model({'mx': 1}, {}, [
        Thread('A', [P('mx'), OUT('a1'), OUT('a2'), OUT('a3'), V('mx')]),
        Thread('B', [P('mx'), OUT('b1'), OUT('b2'), OUT('b3'), V('mx')])])
    r = m.explore(); print('PZ7c whole bodies inside one mutex:', len(outs(m, r)[0]), outs(m, r)[0])
    m = Model({'s': 0}, {}, [
        Thread('A', [OUT('a1'), OUT('a2'), V('s'), OUT('a3')]),
        Thread('B', [OUT('b1'), P('s'), OUT('b2'), OUT('b3')])])
    r = m.explore(); print('PZ7d signal after a2, wait before b2:', len(outs(m, r)[0]))
    # PZ8: cyclic three threads
    m = Model({'a': 1, 'b': 0, 'c': 0}, {}, [
        Thread('T1', [P('a'), OUT('X'), V('b')]), Thread('T2', [P('b'), OUT('Y'), V('c')]),
        Thread('T3', [P('c'), OUT('Z'), V('a')])])
    r = m.explore(); report('PZ8 a=1,b=0,c=0 cyclic', m, r)
    # PZ9: counting semaphore 2, three threads each print in-out
    m = Model({'s': 2}, {}, [Thread(f'T{i}', [P('s'), OUT(f'{i}<'), OUT(f'{i}>'), V('s')]) for i in range(3)])
    r = m.explore(); fin, dl = outs(m, r)
    bad = [o for o in fin if any(o.split().index(f'{i}<') < o.split().index(f'{j}<') < o.split().index(f'{k}<') < min(o.split().index(f'{i}>'), o.split().index(f'{j}>')) for i, j, k in itertools.permutations('012'))]
    print(f'\n=== PZ9 multiplex 2, 3 threads: {len(fin)} outputs; outputs with 3 inside at once: {len(bad)}')

# ---------------- busy-wait / non-atomic semaphore ----------------
def busywait():
    code_nonatomic = [L('spin'), JF(lambda e: e['S'] <= 0, 'go', 'while (S <= 0) ;  // test'), J('spin'), L('go'),
                      inc('S', -1, 'S--'), inc('inCS', 1, '(enter CS)'), inc('inCS', -1, '(leave CS)'), inc('S', 1, 'signal: S++')]
    m = Model({}, {'S': 1, 'inCS': 0}, [Thread('T0', code_nonatomic), Thread('T1', code_nonatomic)],
              track_out=False, invariant=lambda v: v.v('inCS') <= 1)
    r = m.explore()
    print(f'\n=== Busy-wait wait() with non-atomic test and decrement: violations={len(r["violations"])}')
    st = r['violations'][0]
    print(m.table(m.path(st), sems=[], vars=['S', 'inCS']))
    def atomic(e):
        pass
    code_atomic = [AWAIT(lambda e: e['S'] > 0, 'wait: (atomically) await S > 0'), inc('S', -1, '...and S--'),
                   inc('inCS'), inc('inCS', -1), inc('S')]
    # model atomic test-and-decrement as one step:
    def tad(e): e['S'] -= 1
    code_atomic = [AWAIT(lambda e: e['S'] > 0, 'await S>0'), ]
    code_atomic = [('AWAIT', lambda e: e['S'] > 0, 'atomic wait')]
    # use a semaphore directly instead
    m2 = Model({'S': 1}, {'inCS': 0}, [Thread('T0', [P('S'), inc('inCS'), inc('inCS', -1), V('S')]),
                                        Thread('T1', [P('S'), inc('inCS'), inc('inCS', -1), V('S')])],
               track_out=False, invariant=lambda v: v.v('inCS') <= 1)
    r2 = m2.explore()
    print(f'atomic semaphore version: violations={len(r2["violations"])}')

if __name__ == '__main__':
    which = sys.argv[1:] or ['all']
    if 'all' in which or 'sig' in which: signaling(); rendezvous()
    if 'all' in which or 'cnt' in which: counters(); concurrent_writes(); multiplex(2); multiplex(3)
    if 'all' in which or 'bar' in which:
        for v in ['nonsol', 'inside', 'sol']:
            m, r = barrier(v)
            if v == 'nonsol':
                # show a deadlock trace and a non-deadlock complete run
                st = min(r['deadlocks'], key=lambda s: len(m.path(s)))
                print('shortest deadlock trace:'); print(m.table(m.path(st), vars=['count']))
                st = r['terminal'][0]
                print('a complete run (no deadlock):'); print(m.table(m.path(st), vars=['count']))
            if v == 'inside':
                st = min(r['deadlocks'], key=lambda s: len(m.path(s)))
                print(m.table(m.path(st), vars=['count']))
        for v in ['nonsol2', 'twophase', 'preloaded']:
            for (N, laps) in [(2, 2), (2, 3), (3, 2)]:
                m, r = reusable(v, N, laps)
                if v == 'nonsol2' and N == 2 and laps == 2 and r['violations']:
                    st = min(r['violations'], key=lambda s: len(m.path(s)))
                    print('shortest violation trace:'); print(m.table(m.path(st), vars=['count', 'arr0', 'arr1']))
    if 'all' in which or 'prec' in which: precedence()
    if 'all' in which or 'pz' in which: puzzles()
    if 'all' in which or 'busy' in which: busywait()
