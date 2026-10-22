"""Verification part 3: practice ranking problems, decreasing recurrences, misc identities."""
import math
import mpmath as mp
mp.mp.dps = 60
ok = True
def check(cond, msg):
    global ok
    print(("PASS " if cond else "FAIL ") + msg)
    ok = ok and cond

def lnf(name, t):
    """ln f(n) where n = e^t."""
    nn = mp.e**t; LG = t/mp.log(2)
    table = {
      "10^100": lambda: 100*mp.log(10),
      "lg(n^5)": lambda: mp.log(5*LG),
      "lg^2 n": lambda: 2*mp.log(LG),
      "2^(lg n)": lambda: t,
      "n lg n": lambda: t + mp.log(LG),
      "lg(n!)": lambda: mp.log(mp.loggamma(nn+1)/mp.log(2)),
      "ln(n^n)": lambda: t + mp.log(t),
      "n^(3/2)": lambda: 1.5*t,
      "n^(lg 3)": lambda: mp.log(3, 2)*t,
      "4^(lg n)": lambda: 2*t,
      "n^100": lambda: 100*t,
      "1.01^n": lambda: nn*mp.log(1.01),
      "2^(n/2)": lambda: nn/2*mp.log(2),
      "sqrt(2^n)": lambda: nn/2*mp.log(2),
      "n!": lambda: mp.loggamma(nn+1),
      "(lg n)^(lg n)": lambda: LG*mp.log(LG),
      "n^(lg lg n)": lambda: t*mp.log(LG, 2),
      "n^(lg n)": lambda: t*LG,
      "2^(lg^2 n)": lambda: LG**2*mp.log(2),
      "2^(sqrt n)": lambda: mp.sqrt(nn)*mp.log(2),
      "2^n": lambda: nn*mp.log(2),
      "2^(n+1)": lambda: (nn+1)*mp.log(2),
      "4^n": lambda: nn*mp.log(4),
    }
    return table[name]()

def compare(a, b, ts):
    d = [lnf(b, t) - lnf(a, t) for t in ts]
    if all(abs(x) < mp.mpf(10)**-30 * (1 + abs(lnf(a, ts[-1]))) for x in d): return "same", d
    if all(x2 > x1 + mp.mpf('1e-9') for x1, x2 in zip(d, d[1:])) and d[-1] > 0 and (d[-1] - d[-2]) > 1e-3: return "<<", d
    if abs(d[-1] - d[-2]) < 1e-2: return "Theta", d     # ln-ratio converges -> ratio tends to a constant
    return "?", d

ts_poly = [mp.mpf(10)**k for k in (3, 4, 5, 6, 7)]          # ln n from 1e3..1e7

# P19
order19 = ["10^100", "lg(n^5)", "lg^2 n", "2^(lg n)", "n lg n", "n^(3/2)", "n^(lg 3)", "4^(lg n)", "n^100", "1.01^n", "2^(n/2)", "n!"]
for a, b in zip(order19, order19[1:]):
    r, d = compare(a, b, ts_poly)
    check(r == "<<", f"P19: {a} << {b} ({r})")
r, d = compare("2^(n/2)", "sqrt(2^n)", ts_poly); check(r == "same", "P19 tie: 2^(n/2) == sqrt(2^n)")

# P20 classes
r, d = compare("n lg n", "lg(n!)", ts_poly); check(r == "Theta", f"P20: lg(n!) = Theta(n lg n) [ln ratio -> {float(d[-1]):.6f}]")
r, d = compare("ln(n^n)", "n lg n", ts_poly); check(r == "Theta", f"P20: ln(n^n) = Theta(n lg n) [ln ratio -> {float(d[-1]):.6f} = ln(1/ln2)={math.log(1/math.log(2)):.6f}]")
r, d = compare("(lg n)^(lg n)", "n^(lg lg n)", ts_poly); check(r == "same", "P20 tie: (lg n)^(lg n) == n^(lg lg n)")
r, d = compare("n^(lg n)", "2^(lg^2 n)", ts_poly); check(r == "same", "P20 tie: n^(lg n) == 2^(lg^2 n)")
chain20 = ["n lg n", "n^(lg lg n)", "n^(lg n)", "2^(sqrt n)", "2^n", "4^n", "n!"]
for a, b in zip(chain20, chain20[1:]):
    r, d = compare(a, b, ts_poly)
    check(r == "<<", f"P20: {a} << {b} ({r})")
r, d = compare("2^n", "2^(n+1)", ts_poly); check(r == "Theta", "P20: 2^(n+1) = Theta(2^n)")
check(all(math.lgamma(n+1) < (2**n)*math.log(2) for n in range(1, 60)) and
      (math.lgamma(61)/((2**60)*math.log(2))) < 1e-15, "P20: n! << 2^(2^n)")

check(all((math.log2(n))**math.log2(n) > n**3 for n in [257, 1000, 10**5]) and
      (math.log2(200))**math.log2(200) < 200**3, "(lg n)^(lg n) > n^3 once n > 256 (lg lg n > 3)")
check(all(n**math.log2(math.log2(n)) > n*math.log2(n) for n in [17, 100, 10**6]), "n^(lg lg n) > n lg n for n>16")

# ================= decreasing (subtract-and-conquer) recurrences =================
def run(a, b, f, N, base=1.0):
    T = {i: base for i in range(b)}
    for n in range(b, N+1): T[n] = a*T[n-b] + f(n)
    return T
T = run(0.5, 1, lambda n: n, 400);  print("INFO (1/2)T(n-1)+n : T/n ->", round(T[400]/400, 4), "(Theta(n), a<1)")
T = run(1, 1, lambda n: n*n, 4000); print("INFO T(n-1)+n^2   : T/n^3 ->", round(T[4000]/4000**3, 4), "(Theta(n^3), a=1)")
T = run(3, 1, lambda n: n*n, 300);  print("INFO 3T(n-1)+n^2  : T/3^n ->", [round(T[n]/3.0**n, 6) for n in (50, 100, 300)], "(Theta(3^n), NOT n^2 3^n)")
T = run(2, 2, lambda n: 1, 400);    print("INFO 2T(n-2)+1    : T/2^(n/2) ->", [round(T[n]/2**(n/2), 4) for n in (100, 200, 400)], "(Theta(2^(n/2)))")
T = run(2, 1, lambda n: n, 300, base=0.0); print("INFO 2T(n-1)+n    : T/2^n ->", [round(T[n]/2.0**n, 6) for n in (50, 100, 300)])
print("INFO 2T(n-1)+n    : T/(n 2^n) ->", [round(T[n]/(n*2.0**n), 6) for n in (50, 100, 300)], "(-> 0, so n*2^n is not tight)")

# identities used
for nn in [8, 1000, 123456]:
    a, b = 7, 2
    check(math.isclose(a**math.log(nn, b), nn**math.log(a, b), rel_tol=1e-9), f"a^(log_b n) == n^(log_b a) at n={nn}")
check(math.isclose(2**math.log(1000, 4), math.sqrt(1000)), "2^(log_4 n) = sqrt n")
H = sum(1/i for i in range(1, 10**6+1))
check(math.log(10**6+1) <= H <= math.log(10**6) + 1, "ln(n+1) <= H_n <= ln n + 1 (n=1e6)")
check(abs(sum(j/2**j for j in range(1, 200)) - 2) < 1e-12, "sum j/2^j = 2")
check(abs(sum(1/j**2 for j in range(1, 10**6)) - math.pi**2/6) < 1e-5, "sum 1/j^2 = pi^2/6")
print("\nALL PASS" if ok else "\nSOME FAILURES")
