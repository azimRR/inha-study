import sys
import forkenum as en
P, F, W, show, eo = en.P, en.F, en.W, en.show, en.enumerate_outputs

# W5a: for(i<3) fork(); printf("hi")
def loopA(i, n=3):
    if i == n: return [P('hi')]
    r = loopA(i + 1, n); return [F(r)] + r
show('W5a loop fork x3 then hi', loopA(0), limit=3)

# W5b: for(i<3){ fork(); printf(i); }
def loopB(i, n):
    if i == n: return []
    r = [P(str(i))] + loopB(i + 1, n); return [F(r)] + r
for n in (2, 3):
    outs = show(f'W5b loop fork+print n={n}', loopB(0, n), limit=12)

# W6: fork() && fork() || fork(); printf("x")
c1 = [F([P('x')]), P('x')]
c2 = [F([P('x')]), P('x')]
show('W6 A&&B||C', [F(c1), F(c2), P('x')])
# W7: if (fork() || fork()) fork(); printf("1")
c1 = [F([P('1')]), F([P('1')]), P('1')]   # C1: B=fork -> child C2 prints; C1 true -> fork C4; print
show('W7 if(A||B) C', [F(c1), F([P('1')]), P('1')])

# W12a: 3 children exit(100+i); parent wait() x3 printing which child
show('W12 wait() any order', [F([]), F([]), F([]), ('wr', '#{}'), ('wr', '#{}'), ('wr', '#{}')])
show('W12 waitpid reverse', [F([]), F([]), F([]), ('wp', 2), P('#C3'), ('wp', 1), P('#C2'), ('wp', 0), P('#C1')])

# Extra puzzle E1: parent prints A, forks; child prints B, forks; grandchild prints C; everyone prints D; parents wait for their child before D
gc = [P('C'), P('D')]
ch = [P('B'), F(gc), W, P('D')]
show('E1 waits in a chain', [P('A'), F(ch), W, P('D')])
# Extra puzzle E2: no waits version
show('E2 same, no waits', [P('A'), F([P('B'), F([P('C'), P('D')]), P('D')]), P('D')])
# Extra puzzle E3: pid = fork(); if (pid==0) { printf("1"); } else { printf("2"); wait; printf("3"); } printf("4")
show('E3', [F([P('1'), P('4')]), P('2'), W, P('3'), P('4')])
