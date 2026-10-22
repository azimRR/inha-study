# semsim.py -- tiny explicit-state model checker for semaphore programs.
# Each instruction is one atomic step. Semaphore modes:
#   'set'  : Dijkstra/Silberschatz semantics. wait() decrements; if result < 0 the thread
#            blocks in the semaphore's waiting set; signal() increments and, if result <= 0,
#            wakes ONE waiter (any waiter -> nondeterministic = "weak" wake-up choice).
#   'fifo' : same, but waiters are woken in FIFO order ("strong" semaphore).
#   'weak' : POSIX-like: value never negative; wait() is enabled only when value > 0
#            (blocked threads retry; barging allowed).
import collections

def P(s): return ('P', s, f'{s}.wait()')
def V(s, n=1): return ('V', (s, n), f'{s}.signal()' if n == 1 else f'{s}.signal({n})')
def PD(f, txt): return ('PD', f, txt)
def VD(f, txt): return ('VD', f, txt)
def OUT(x, txt=None): return ('OUT', x, txt or f'print {x}')
def DO(f, txt): return ('DO', f, txt)          # f(env) mutates env; may set env['_V']=[sems]
def JF(cond, label, txt): return ('JF', (cond, label), txt)   # if not cond(env): goto label
def J(label): return ('J', label, f'goto {label}')
def L(name): return ('L', name, '')
def AWAIT(cond, txt): return ('AWAIT', cond, txt)

class Thread:
    def __init__(self, name, code, daemon=False):
        labels, clean = {}, []
        for ins in code:
            if ins[0] == 'L':
                labels[ins[1]] = len(clean)
            else:
                clean.append(ins)
        self.code = []
        for k, a, t in clean:
            if k == 'JF':
                self.code.append((k, (a[0], labels[a[1]]), t))
            elif k == 'J':
                self.code.append((k, labels[a], t))
            else:
                self.code.append((k, a, t))
        self.name, self.daemon = name, daemon


class View:
    def __init__(self, m, st):
        self.m, self.st = m, st
    def v(self, name): return self.st[2][self.m.vi[name]]
    def s(self, name): return self.st[1][self.m.si[name]]
    def pc(self, t): return self.st[0][t]
    def waiting(self, name): return self.st[4][self.m.si[name]]


class Model:
    def __init__(self, sems, vars, threads, invariant=None, track_out=True,
                 trans_check=None, mode='set'):
        self.semnames = list(sems)
        self.si = {k: i for i, k in enumerate(self.semnames)}
        self.sem0 = tuple(sems[k] for k in self.semnames)
        self.varnames = list(vars)
        self.vi = {k: i for i, k in enumerate(self.varnames)}
        self.var0 = tuple(vars[k] for k in self.varnames)
        self.threads = threads
        self.n = len(threads)
        self.invariant, self.trans_check = invariant, trans_check
        self.track_out, self.mode = track_out, mode

    # ---------- basic machinery ----------
    def skip(self, t, pc):
        code = self.threads[t].code
        guard = 0
        while pc < len(code) and code[pc][0] == 'J':
            pc = code[pc][1]
            guard += 1
            if guard > 10000:
                raise RuntimeError('jump loop')
        return pc

    def init(self):
        return (tuple(self.skip(t, 0) for t in range(self.n)), self.sem0, self.var0, (),
                tuple(() for _ in self.semnames))

    def env(self, st, t):
        e = dict(zip(self.varnames, st[2]))
        e['me'] = t
        return e

    def is_done(self, st, t):
        return st[0][t] >= len(self.threads[t].code)

    def all_done(self, st):
        return all(self.is_done(st, t) for t in range(self.n) if not self.threads[t].daemon)

    def blocked(self, st, t):
        return any(t in w for w in st[4])

    def enabled(self, st, t):
        if self.is_done(st, t) or self.blocked(st, t):
            return False
        k, a, _ = self.threads[t].code[st[0][t]]
        if self.mode == 'weak':
            if k == 'P':
                return st[1][self.si[a]] > 0
            if k == 'PD':
                return st[1][self.si[a(self.env(st, t))]] > 0
        if k == 'AWAIT':
            return bool(a(self.env(st, t)))
        return True

    def _signal(self, branches, s, n):
        for _ in range(n):
            nxt = []
            for ss, ww in branches:
                ss = list(ss); ss[s] += 1
                if self.mode != 'weak' and ss[s] <= 0:
                    q = ww[s]
                    choices = [0] if self.mode == 'fifo' else range(len(q))
                    for ci in choices:
                        w2 = list(ww); w2[s] = q[:ci] + q[ci + 1:]
                        nxt.append((tuple(ss), tuple(w2)))
                else:
                    nxt.append((tuple(ss), ww))
            branches = nxt
        return branches

    def succ(self, st, t):
        pcs, sems, vals, out, waits = st
        pc = pcs[t]
        k, a, txt = self.threads[t].code[pc]
        npc = pc + 1
        branches = [(sems, waits)]
        if k in ('P', 'PD'):
            s = self.si[a] if k == 'P' else self.si[a(self.env(st, t))]
            ss = list(sems); ss[s] -= 1
            ww = list(waits)
            if self.mode != 'weak' and ss[s] < 0:
                ww[s] = ww[s] + (t,)
                if self.mode == 'set':
                    ww[s] = tuple(sorted(ww[s]))
            branches = [(tuple(ss), tuple(ww))]
        elif k == 'V':
            branches = self._signal(branches, self.si[a[0]], a[1])
        elif k == 'VD':
            branches = self._signal(branches, self.si[a(self.env(st, t))], 1)
        elif k == 'OUT':
            if self.track_out:
                out = out + (a,)
        elif k == 'DO':
            e = self.env(st, t)
            a(e)
            vals = tuple(e[x] for x in self.varnames)
            for sname in e.get('_V', []):
                branches = self._signal(branches, self.si[sname], 1)
        elif k == 'JF':
            if not a[0](self.env(st, t)):
                npc = a[1]
        npc = self.skip(t, npc)
        npcs = pcs[:t] + (npc,) + pcs[t + 1:]
        res = []
        seen = set()
        for ss, ww in branches:
            ns = (npcs, ss, vals, out, ww)
            if ns not in seen:
                seen.add(ns); res.append(ns)
        return res

    def label(self, st, t):
        if self.is_done(st, t):
            return '(done)'
        return self.threads[t].code[st[0][t]][2]

    # ---------- exhaustive exploration ----------
    def explore(self, limit=4_000_000, keep_graph=False):
        init = self.init()
        parent = {init: None}
        q = collections.deque([init])
        res = dict(deadlocks=[], violations=[], finals=collections.Counter(), states=0,
                   terminal=[])
        graph = {} if keep_graph else None
        while q:
            st = q.popleft()
            res['states'] += 1
            if res['states'] > limit:
                raise RuntimeError('state limit exceeded')
            if self.invariant is not None and not self.invariant(View(self, st)):
                res['violations'].append(st)
            if self.all_done(st) and not keep_graph:
                res['finals'][(st[3], st[2])] += 1
                res['terminal'].append(st)
                continue
            en = [t for t in range(self.n) if self.enabled(st, t)]
            if self.all_done(st):
                res['finals'][(st[3], st[2])] += 1
                res['terminal'].append(st)
            elif not en:
                res['deadlocks'].append(st)
            edges = []
            for t in en:
                for ns in self.succ(st, t):
                    if self.trans_check is not None and not self.trans_check(View(self, st), View(self, ns), t):
                        res['violations'].append(ns)
                        if ns not in parent:
                            parent[ns] = (st, t)
                    edges.append((t, ns))
                    if ns not in parent:
                        parent[ns] = (st, t)
                        q.append(ns)
            if keep_graph:
                graph[st] = edges
        self.parent = parent
        self.graph = graph
        return res

    def path(self, st):
        seq = []
        while self.parent[st] is not None:
            prev, t = self.parent[st]
            seq.append((prev, t, st))
            st = prev
        return list(reversed(seq))

    def count_paths(self):
        """Number of complete schedules (paths init->terminal) and deadlocking schedules.
        Only valid for loop-free programs (state graph is a DAG)."""
        memo = {}
        import sys
        sys.setrecursionlimit(100000)
        def go(st):
            if st in memo:
                return memo[st]
            if self.all_done(st):
                r = (1, 0)
            else:
                en = [t for t in range(self.n) if self.enabled(st, t)]
                if not en:
                    r = (0, 1)
                else:
                    c = d = 0
                    for t in en:
                        for ns in self.succ(st, t):
                            a, b = go(ns)
                            c += a; d += b
                    r = (c, d)
            memo[st] = r
            return r
        return go(self.init())

    # ---------- starvation: a reachable cycle in which `victim` is never enabled ----------
    def starvation_cycle(self, victim, progress):
        self.explore(keep_graph=True)
        G = self.graph
        def restricted(st):
            return (not self.is_done(st, victim)) and (not self.enabled(st, victim))
        nodes = [s for s in G if restricted(s)]
        nodeset = set(nodes)
        # iterative Tarjan SCC on the restricted subgraph
        index, low, onstack, stack, sccs = {}, {}, set(), [], []
        counter = [0]
        for root in nodes:
            if root in index:
                continue
            work = [(root, iter([ns for (t, ns) in G[root] if ns in nodeset]))]
            index[root] = low[root] = counter[0]; counter[0] += 1
            stack.append(root); onstack.add(root)
            while work:
                v, it = work[-1]
                advanced = False
                for w in it:
                    if w not in index:
                        index[w] = low[w] = counter[0]; counter[0] += 1
                        stack.append(w); onstack.add(w)
                        work.append((w, iter([ns for (t, ns) in G[w] if ns in nodeset])))
                        advanced = True
                        break
                    elif w in onstack:
                        low[v] = min(low[v], index[w])
                if advanced:
                    continue
                work.pop()
                if work:
                    low[work[-1][0]] = min(low[work[-1][0]], low[v])
                if low[v] == index[v]:
                    comp = set()
                    while True:
                        w = stack.pop(); onstack.discard(w); comp.add(w)
                        if w == v:
                            break
                    sccs.append(comp)
        for comp in sccs:
            for u in comp:
                for (t, w) in G[u]:
                    if w in comp and progress(View(self, u), View(self, w), t):
                        # BFS from w back to u inside comp
                        prev = {w: None}
                        dq = collections.deque([w])
                        while dq:
                            x = dq.popleft()
                            if x == u:
                                break
                            for (t2, y) in G[x]:
                                if y in comp and y not in prev:
                                    prev[y] = (x, t2); dq.append(y)
                        if u not in prev:
                            continue
                        back = []
                        x = u
                        while prev[x] is not None:
                            px, tt = prev[x]
                            back.append((px, tt, x)); x = px
                        back.reverse()
                        cycle = [(u, t, w)] + back
                        return self.path(u), cycle
        return None

    # ---------- pretty printing ----------
    def semstr(self, st, s):
        i = self.si[s]
        v = st[1][i]
        w = st[4][i]
        if w:
            return f"{v} [{','.join(self.threads[x].name for x in w)}]"
        return str(v)

    def table(self, steps, sems=None, vars=None, varfmt=None, start=None):
        sems = self.semnames if sems is None else sems
        vars = vars or []
        hdr = ['#', 'Thread', 'Executes'] + sems + vars
        rows = []
        def vstr(st, name):
            val = st[2][self.vi[name]]
            return varfmt(name, val) if varfmt else str(val)
        st0 = steps[0][0] if steps else self.init()
        if start is None:
            rows.append(['0', '', '(initial state)'] + [self.semstr(st0, s) for s in sems] +
                        [vstr(st0, x) for x in vars])
        for i, (prev, t, nxt) in enumerate(steps, 1 if start is None else start):
            rows.append([str(i), self.threads[t].name, self.label(prev, t)] +
                        [self.semstr(nxt, s) for s in sems] + [vstr(nxt, x) for x in vars])
        out = ['| ' + ' | '.join(hdr) + ' |', '|' + '---|' * len(hdr)]
        for r in rows:
            out.append('| ' + ' | '.join(x.replace('|', '\\|') for x in r) + ' |')
        return '\n'.join(out)


def _sccs(nodes, succ):
    """Iterative Tarjan. succ(v) -> iterable of successors (restricted to nodes)."""
    index, low, onstack, stack, out = {}, {}, set(), [], []
    c = [0]
    for root in nodes:
        if root in index:
            continue
        index[root] = low[root] = c[0]; c[0] += 1
        stack.append(root); onstack.add(root)
        work = [(root, iter(list(succ(root))))]
        while work:
            v, it = work[-1]
            adv = False
            for w in it:
                if w not in index:
                    index[w] = low[w] = c[0]; c[0] += 1
                    stack.append(w); onstack.add(w)
                    work.append((w, iter(list(succ(w)))))
                    adv = True
                    break
                elif w in onstack:
                    low[v] = min(low[v], index[w])
            if adv:
                continue
            work.pop()
            if work:
                low[work[-1][0]] = min(low[work[-1][0]], low[v])
            if low[v] == index[v]:
                comp = set()
                while True:
                    w = stack.pop(); onstack.discard(w); comp.add(w)
                    if w == v:
                        break
                out.append(comp)
    return out


def fair_starvation_cycle(self, victim, progress):
    """Find a reachable cycle in which `victim` is never enabled, some progress edge occurs,
    and the schedule is (strongly) fair to every OTHER thread: any other thread that is enabled
    in some state of the cycle also takes a step in the cycle. Semaphore wake-up choices
    (mode='set') are NOT constrained by fairness -- that is what a weak semaphore means."""
    self.explore(keep_graph=True)
    G = self.graph
    cand = {s for s in G if (not self.is_done(s, victim)) and (not self.enabled(s, victim))}
    while True:
        comps = _sccs(list(cand), lambda v: [w for (t, w) in G[v] if w in cand])
        newcand, changed, fair = set(), False, []
        for C in comps:
            internal = [(u, t, w) for u in C for (t, w) in G[u] if w in C]
            if not internal:
                changed = changed or False
                continue
            execd = {t for (u, t, w) in internal}
            bad = {u for u in C if any(t != victim and t not in execd and self.enabled(u, t) for t in range(self.n))}
            if bad:
                changed = True
                newcand |= (C - bad)
            else:
                newcand |= C
                fair.append((C, internal, execd))
        if not changed:
            break
        cand = newcand
    for C, internal, execd in fair:
        prog = [(u, t, w) for (u, t, w) in internal if progress(View(self, u), View(self, w), t)]
        if not prog:
            continue
        # required edges: one progress edge + one edge per thread that is enabled somewhere in C
        need_threads = {t for u in C for t in range(self.n) if t != victim and self.enabled(u, t)}
        req = [prog[0]]
        for t in sorted(need_threads):
            if t != prog[0][1]:
                req.append(next(e for e in internal if e[1] == t))
        def bfs(a, b):
            prev = {a: None}; dq = collections.deque([a])
            while dq:
                x = dq.popleft()
                if x == b:
                    break
                for (t2, y) in G[x]:
                    if y in C and y not in prev:
                        prev[y] = (x, t2); dq.append(y)
            seq = []; x = b
            while prev[x] is not None:
                px, tt = prev[x]; seq.append((px, tt, x)); x = px
            return list(reversed(seq))
        start = req[0][0]
        cycle, cur = [], start
        for (u, t, w) in req:
            cycle += bfs(cur, u); cycle.append((u, t, w)); cur = w
        cycle += bfs(cur, start)
        return self.path(start), cycle
    return None

Model.fair_starvation_cycle = fair_starvation_cycle
