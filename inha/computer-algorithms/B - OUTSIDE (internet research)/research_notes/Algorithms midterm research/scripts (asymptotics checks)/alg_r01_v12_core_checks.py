"""alg_r01 consolidated checks (re-creation of verify1/verify2 after shared-scratchpad collision).
Covers: linear search / insertion sort cases, Big-O constants, limits, loop counts, recurrence closed forms,
master-theorem ratio checks, regularity failure, Akra-Bazzi exponents, edge-case limits."""
from fractions import Fraction as F
from functools import lru_cache
from itertools import permutations
import math, sys
import sympy as sp, mpmath as mp
sys.setrecursionlimit(100000)
ok = True
def check(c, m):
    global ok
    print(("PASS " if c else "FAIL ") + m); ok = ok and c
flog2 = lambda n: n.bit_length() - 1
clog2 = lambda n: (n - 1).bit_length()

# --- cases ---
for n in range(1, 30):
    assert F(sum(range(1, n+1)), n) == F(n+1, 2)
check(True, "linear search average (n+1)/2")
def ins(a):
    a = list(a); c = s = 0
    for j in range(1, len(a)):
        key = a[j]; i = j-1
        while i >= 0:
            c += 1
            if a[i] > key: a[i+1] = a[i]; s += 1; i -= 1
            else: break
        a[i+1] = key
    return c, s
for n in range(1, 9):
    cs, ss = zip(*(ins(p) for p in permutations(range(n))))
    H = sum(F(1, k) for k in range(1, n+1))
    check(min(cs) == max(n-1, 0) and max(cs) == n*(n-1)//2 and F(sum(cs), len(cs)) == F(n*(n-1), 4) + n - H
          and F(sum(ss), len(ss)) == F(n*(n-1), 4), f"insertion sort n={n}: best n-1, worst n(n-1)/2, avg n(n-1)/4+n-H_n, avg shifts n(n-1)/4")
# --- constants ---
check(all(3*n*n+10*n+5 <= 5*n*n for n in range(10, 10**5)), "3n^2+10n+5 <= 5n^2 (n>=10)")
check(all(3*n**3 <= 5*n**3-2*n*n+7 <= 12*n**3 for n in range(1, 10**5)), "3n^3 <= 5n^3-2n^2+7 <= 12n^3 (n>=1)")
s = 0.0; good = True
for n in range(1, 200000):
    s += math.log2(n)
    if n >= 4 and not ((n/4)*math.log2(n) <= s + 1e-9 <= n*math.log2(n) + 2e-9): good = False; break
check(good, "(n/4)lg n <= lg n! <= n lg n (n>=4)")
# --- limits ---
n = sp.symbols('n', positive=True); lg = lambda x: sp.log(x, 2)
for name, e, exp in [("n^1.001/(n lg n)", n**sp.Rational(1001, 1000)/(n*lg(n)), sp.oo), ("sqrt n/lg^2 n", sp.sqrt(n)/lg(n)**2, sp.oo),
                     ("4^n/2^n", 4**n/2**n, sp.oo), ("n!/n^n", sp.factorial(n)/n**n, 0), ("n!/2^n", sp.factorial(n)/2**n, sp.oo),
                     ("10^100/(5 lg n)", sp.Integer(10)**100/(5*lg(n)), 0), ("2^(n+1)/2^n", 2**(n+1)/2**n, 2),
                     ("4^n/n!", 4**n/sp.factorial(n), 0), ("n^(lg n)/2^sqrt n", sp.exp(sp.log(n)**2/sp.log(2))/2**sp.sqrt(n), 0)]:
    check(sp.limit(e, n, sp.oo) == exp, f"limit {name} = {exp}")
m = mp.findroot(lambda m: 0.001*m - mp.log(m, 2), 14000); print(f"INFO n^0.001 = lg n at n = 2^{float(m):.1f}")
x = mp.findroot(lambda x: 100*mp.log(x) - x*mp.log(1.01), 1.2e5); print(f"INFO n^100 = 1.01^n at n ~ {float(x):.0f}")
# --- loops ---
def cnt_harm(n): return sum((n-1)//i + 1 for i in range(1, n+1))
def cnt_half(n):
    c = 0; i = n
    while i >= 1: c += i; i //= 2
    return c
def cnt_sq(n):
    c = 0; i = 2
    while i <= n: i *= i; c += 1
    return c
def cnt_dd(n):
    c = 0; i = 1
    while i <= n:
        j = 1
        while j <= i: j *= 2; c += 1
        i *= 2
    return c
for N in [1, 2, 3, 7, 8, 10, 31, 64, 100, 1000]:
    check(cnt_half(N) == 2*N - bin(N).count('1'), f"halving-outer/linear-inner = 2n - popcount(n), n={N}")
    if N >= 2: check(cnt_sq(N) == math.floor(math.log2(math.log2(N)) + 1e-12) + 1, f"i=i*i loop = floor(lg lg n)+1, n={N}")
    L = flog2(N); check(cnt_dd(N) == (L+1)*(L+2)//2, f"doubling/doubling = (L+1)(L+2)/2, n={N}")
print(f"INFO harmonic loop / (n ln n) at 1e6 = {cnt_harm(10**6)/(10**6*math.log(10**6)):.4f}")
# --- recurrences exact ---
@lru_cache(None)
def Tmf(k): return 1 if k == 1 else 2*Tmf(k//2) + k
@lru_cache(None)
def Tsp(k): return 1 if k == 1 else Tsp(k//2) + Tsp((k+1)//2) + 1
@lru_cache(None)
def Tce(k): return 1 if k == 1 else Tce((k+1)//2) + 1
check(all(Tmf(k) <= 2*k*math.log2(k) for k in range(2, 1 << 16)) and Tmf(2) == 4 and Tmf(3) == 5, "2T(floor n/2)+n <= 2 n lg n (n>=2)")
check(all(Tsp(k) == 2*k - 1 for k in range(1, 1 << 16)), "T(floor)+T(ceil)+1 = 2n-1")
check(all(Tce(k) == clog2(k) + 1 and (k < 2 or Tce(k) <= 3*math.log2(k)) for k in range(1, 1 << 16)), "T(ceil n/2)+1 = ceil(lg n)+1 <= 3 lg n")
def unroll(a, b, f, k):
    T = F(1)
    for i in range(1, k+1): T = a*T + f(b**i, i)
    return T
for k in range(0, 22):
    N = 2**k
    assert unroll(2, 2, lambda n, i: n, k) == N*k + N
    assert unroll(3, 2, lambda n, i: n, k) == 3*3**k - 2*N
    assert unroll(4, 2, lambda n, i: n, k) == 2*N*N - N
    assert unroll(2, 2, lambda n, i: n*n, k) == 2*N*N - N
    assert unroll(2, 2, lambda n, i: n*i, k) == N*(1 + F(k*(k+1), 2))
    assert unroll(4, 2, lambda n, i: n*n*i, k) == N*N*(1 + F(k*(k+1), 2))
    assert unroll(2, 2, lambda n, i: F(n, i), k) == N*(1 + sum(F(1, j) for j in range(1, k+1)))
for k in range(0, 12): assert unroll(3, 4, lambda n, i: n*n, k) == F(16, 13)*16**k - F(3, 13)*3**k
check(True, "closed forms: nlgn+n, 3n^lg3-2n, 2n^2-n (x2), n(1+lg n(lg n+1)/2), n^2(1+..), n(1+H_lg n), (16/13)n^2-(3/13)n^log4(3)")
T = {0: 0}
for k in range(1, 60): T[k] = 2*T[k-1] + k
check(all(T[k] == 2**(k+1) - k - 2 for k in T), "2T(n-1)+n = 2^(n+1)-n-2")
T = {0: 0, 1: 1}
for k in range(2, 500): T[k] = T[k-2] + k*k
check(all(T[k] == k*(k+1)*(k+2)//6 for k in T), "T(n-2)+n^2 = n(n+1)(n+2)/6")
C = {0: 1, 1: 1}; Fb = {0: 0, 1: 1}
for k in range(2, 81): C[k] = C[k-1] + C[k-2] + 1; Fb[k] = Fb[k-1] + Fb[k-2]
check(all(C[k] == 2*Fb[k+1] - 1 for k in range(0, 80)), "fib calls = 2F(n+1)-1")
# --- master theorem ratio spot checks ---
def ratio(a, b, f, g, k):
    T = 1.0
    for i in range(1, k+1): T = a*T + f(b**i, i)
    return T / g(b**k, k)
print("INFO T(n/2)+n/lg n: T/(n/lg n) at k=16,48:", round(ratio(1, 2, lambda n, i: n/i, lambda n, k: n/k, 16), 3), round(ratio(1, 2, lambda n, i: n/i, lambda n, k: n/k, 48), 3),
      "| T/n at k=48:", round(ratio(1, 2, lambda n, i: n/i, lambda n, k: n, 48), 4))
c = 2*4**-0.51; print(f"INFO 2T(n/4)+n^0.51: regularity c={c:.5f}, limit ratio 1/(1-c)={1/(1-c):.1f}")
best = max((nn/2)*(2-math.cos(nn/2))/(nn*(2-math.cos(nn))) for nn in range(2, 2_000_000, 2))
print(f"INFO n(2-cos n): sup a f(n/2)/f(n) over even n<2e6 = {best:.4f}")
for name, eq, g in [("n/5+7n/10", lambda p: (mp.mpf(1)/5)**p + (mp.mpf(7)/10)**p - 1, 0.8), ("n/2+n/4", lambda p: mp.mpf(0.5)**p + mp.mpf(0.25)**p - 1, 0.7),
                    ("7/4 n/2 + 3n/4", lambda p: mp.mpf(7)/4*mp.mpf(0.5)**p + mp.mpf(0.75)**p - 1, 1.5), ("n/3+2n/3", lambda p: (mp.mpf(1)/3)**p + (mp.mpf(2)/3)**p - 1, 0.5)]:
    print(f"INFO Akra-Bazzi p for {name}: {float(mp.findroot(eq, g)):.5f}")
print("\nALL PASS" if ok else "\nSOME FAILURES")
