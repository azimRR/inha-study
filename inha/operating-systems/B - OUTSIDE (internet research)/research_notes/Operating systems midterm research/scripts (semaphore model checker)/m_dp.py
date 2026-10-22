import sys
from semsim import *
from m_patterns import inc

N = 5
def eat_on(e):
    t = list(e['eat']); t[e['me']] = 1; e['eat'] = tuple(t)
def eat_off(e):
    t = list(e['eat']); t[e['me']] = 0; e['eat'] = tuple(t)
def no_adjacent(v):
    t = v.v('eat')
    return not any(t[i] and t[(i + 1) % N] for i in range(N))

def fork_code(i, variant, loop):
    L_, R_ = f'fork{i}', f'fork{(i + 1) % N}'      # Downey: left(i)=i, right(i)=i+1
    first, second = R_, L_                            # non-solution: right first
    if variant == 'asym' and i == 0:
        first, second = L_, R_                        # philosopher 0 is a "leftie"
    if variant == 'ordered':                          # resource hierarchy: lower number first
        a, b = sorted([i, (i + 1) % N])
        first, second = f'fork{a}', f'fork{b}'
    c = [L('top')]
    if variant == 'footman': c.append(P('footman'))
    if variant == 'waiter': c.append(P('waiter'))
    c += [P(first), P(second)]
    if variant == 'waiter': c.append(V('waiter'))
    c += [DO(eat_on, 'eat() begins'), DO(eat_off, 'eat() ends'), V(first), V(second)]
    if variant == 'footman': c.append(V('footman'))
    if loop: c.append(J('top'))
    return c

def tanenbaum_code(i, loop, literal_left=False):
    left = (lambda k: k) if literal_left else (lambda k: (k + N - 1) % N)
    right = lambda k: (k + 1) % N
    def test(e, k):
        s = e['state']
        if s[k] == 'H' and s[left(k)] != 'E' and s[right(k)] != 'E':
            s = list(s); s[k] = 'E'; e['state'] = tuple(s)
            e.setdefault('_V', []).append(f'sem{k}')
    def hungry(e):
        s = list(e['state']); s[e['me']] = 'H'; e['state'] = tuple(s); test(e, e['me'])
    def putdown(e):
        s = list(e['state']); s[e['me']] = 'T'; e['state'] = tuple(s)
        test(e, right(e['me'])); test(e, left(e['me']))
    c = [L('top'), P('mutex'), DO(hungry, "state[i]='hungry'; test(i)"), V('mutex'), P(f'sem{i}'),
         DO(eat_on, 'eat() begins'), DO(eat_off, 'eat() ends'),
         P('mutex'), DO(putdown, "state[i]='thinking'; test(right(i)); test(left(i))"), V('mutex')]
    if loop: c.append(J('top'))
    return c

def dp_model(variant, loop=False, mode='set', literal_left=False):
    sems = {f'fork{i}': 1 for i in range(N)}
    sems.update({'footman': N - 1, 'waiter': 1, 'mutex': 1})
    sems.update({f'sem{i}': 0 for i in range(N)})
    vars = {'eat': (0,) * N, 'state': ('T',) * N}
    if variant == 'tanenbaum':
        threads = [Thread(f'Ph{i}', tanenbaum_code(i, loop, literal_left)) for i in range(N)]
    else:
        threads = [Thread(f'Ph{i}', fork_code(i, variant, loop)) for i in range(N)]
    return Model(sems, vars, threads, track_out=False, invariant=no_adjacent, mode=mode)

def main():
    for variant in ['naive', 'footman', 'asym', 'ordered', 'waiter', 'tanenbaum']:
        m = dp_model(variant); r = m.explore()
        print(f'DP {variant} (one meal each): states={r["states"]} deadlock-states={len(r["deadlocks"])} violations={len(r["violations"])}')
        if variant == 'naive':
            st = min(r['deadlocks'], key=lambda s: len(m.path(s)))
            print(m.table(m.path(st), sems=[f'fork{i}' for i in range(N)]))
    m = dp_model('tanenbaum', literal_left=True); r = m.explore()
    print(f'DP tanenbaum with LITERAL left(i)=i helper: deadlock-states={len(r["deadlocks"])} violations={len(r["violations"])}')
    if r['violations']:
        st = min(r['violations'], key=lambda s: len(m.path(s)))
        print(m.table(m.path(st), sems=['mutex'] + [f'sem{i}' for i in range(N)], vars=['state', 'eat']))
    for variant in ['naive', 'footman', 'asym', 'waiter', 'tanenbaum']:
        for mode in ['fifo', 'set']:
            m = dp_model(variant, loop=True, mode=mode)
            r = m.explore()
            res = m.fair_starvation_cycle(0, lambda u, w, t: sum(w.v('eat')) > sum(u.v('eat')))
            print(f'DP {variant} looping mode={mode}: states={r["states"]} deadlock-states={len(r["deadlocks"])} violations={len(r["violations"])}; Ph0 can be blocked forever while others eat? {res is not None}')
            if res and variant == 'tanenbaum' and mode == 'fifo':
                prefix, cycle = res
                print('prefix length', len(prefix))
                print(m.table(cycle, sems=['mutex'] + [f'sem{i}' for i in range(N)], vars=['state', 'eat'], start=len(prefix) + 1))

if __name__ == '__main__':
    main()
