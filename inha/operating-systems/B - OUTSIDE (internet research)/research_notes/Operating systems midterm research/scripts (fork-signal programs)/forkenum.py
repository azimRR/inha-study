"""Exhaustive interleaving enumerator for fork/wait/print programs.

A process's code is a list of actions:
  ('p', s)          print string s (one atomic output unit, e.g. a line)
  ('f', childcode)  fork: child starts executing childcode; parent continues
  ('w',)            wait(): block until some direct child has exited & is unreaped; reap one
  ('wp', k)         waitpid(k-th child created by this process, 0-based)
  ('wr', fmt)       wait() then print fmt.format(label of reaped child)
  ('x',)            exit (implicit at end of list)
All feasible output sequences = all topological sorts of the process graph.
"""
import sys
from functools import lru_cache

def enumerate_outputs(code, sep=' '):
    # processes: tuple of (code_id, pc, parent_idx, children_tuple, exited, reaped, label)
    codes = []
    def cid(c):
        for i, x in enumerate(codes):
            if x is c:
                return i
        codes.append(c)
        return len(codes) - 1
    # pre-register recursively
    def reg(c):
        cid(c)
        for a in c:
            if a[0] == 'f':
                reg(a[1])
    reg(code)
    start = ((cid(code), 0, -1, (), False, False, 'P'),)
    nproc_max = [1]

    @lru_cache(maxsize=None)
    def go(state):
        procs = list(state)
        results = set()
        progressed = False
        for i, (c, pc, par, kids, exited, reaped, label) in enumerate(procs):
            if exited:
                continue
            prog = codes[c]
            if pc >= len(prog) or prog[pc][0] == 'x':
                # exit
                np = list(procs)
                np[i] = (c, len(prog), par, kids, True, False, label)
                results |= go(tuple(np)); progressed = True
                continue
            a = prog[pc]
            if a[0] == 'p':
                np = list(procs)
                np[i] = (c, pc + 1, par, kids, exited, reaped, label)
                for rest in go(tuple(np)):
                    results.add((a[1],) + rest)
                progressed = True
            elif a[0] == 'f':
                np = list(procs)
                newidx = len(np)
                newlabel = label + '.' + str(len(kids) + 1) if label != 'P' else 'C' + str(len(kids) + 1)
                np[i] = (c, pc + 1, par, kids + (newidx,), exited, reaped, label)
                np.append((cid(a[1]), 0, i, (), False, False, newlabel))
                nproc_max[0] = max(nproc_max[0], len(np))
                results |= go(tuple(np)); progressed = True
            elif a[0] in ('w', 'wr'):
                live_unreaped = [k for k in kids if not procs[k][5]]
                if not live_unreaped:
                    # wait returns -1 (ECHILD) immediately
                    np = list(procs)
                    np[i] = (c, pc + 1, par, kids, exited, reaped, label)
                    sub = go(tuple(np))
                    if a[0] == 'wr':
                        sub = {('wait=-1',) + r for r in sub}
                    results |= sub; progressed = True
                    continue
                for k in live_unreaped:
                    if procs[k][4]:  # exited, reapable
                        np = list(procs)
                        kc = np[k]
                        np[k] = kc[:5] + (True,) + kc[6:]
                        np[i] = (c, pc + 1, par, kids, exited, reaped, label)
                        sub = go(tuple(np))
                        if a[0] == 'wr':
                            sub = {(a[1].format(procs[k][6]),) + r for r in sub}
                        results |= sub; progressed = True
            elif a[0] == 'wp':
                k = kids[a[1]]
                if procs[k][4]:
                    np = list(procs)
                    kc = np[k]
                    np[k] = kc[:5] + (True,) + kc[6:]
                    np[i] = (c, pc + 1, par, kids, exited, reaped, label)
                    results |= go(tuple(np)); progressed = True
        if not progressed:
            # everyone exited (or deadlock); terminal state
            if all(p[4] for p in procs):
                return frozenset({()})
            return frozenset({('<DEADLOCK>',)})
        return frozenset(results)

    outs = go(start)
    # count processes = number of 'f' executions along any run (same in all runs here)
    return sorted(outs), nproc_max[0]

def show(name, code, sep=' ', limit=40):
    outs, n = enumerate_outputs(code)
    print(f'== {name}: processes={n}, distinct orderings={len(outs)}')
    for o in outs[:limit]:
        print('   ' + sep.join(o))
    if len(outs) > limit:
        print(f'   ... ({len(outs) - limit} more)')
    return outs

P = lambda s: ('p', s)
F = lambda c: ('f', c)
W = ('w',)

if __name__ == '__main__':
    # 1. CMU fork.c: x=1; fork; child prints ++x (2); parent prints --x (0)
    show('fork-x', [F([P('child:x=2')]), P('parent:x=0')])
    # 2. CMU fork2: L0; fork; L1; fork; Bye
    tail2 = [P('Bye')]
    after1 = [P('L1'), F(tail2), P('Bye')]
    show('fork2', [P('L0'), F(after1)] + after1)
    # 3. CMU fork4: nested forks in parent
    # L0; if(fork()!=0){ L1; if(fork()!=0){ L2; } } Bye
    show('fork4', [P('L0'), F([P('Bye')]), P('L1'), F([P('Bye')]), P('L2'), P('Bye')])
    # 4. CMU fork5: nested forks in children
    # L0; if(fork()==0){ L1; if(fork()==0){ L2; } } Bye
    show('fork5', [P('L0'), F([P('L1'), F([P('L2'), P('Bye')]), P('Bye')]), P('Bye')])
    # 5. CMU fork9: wait synchronization
    show('fork9', [F([P('HC')]), P('HP'), W, P('CT'), P('Bye')])
