"""Brute-force / Monte Carlo checks of the counting formulas used in the notes."""
import itertools, math, random, sys
from fractions import Fraction as F
from clrs import *

sys.setrecursionlimit(50000)

def H(n):
    return sum(F(1, k) for k in range(1, n + 1))

print("=== Insertion sort over ALL permutations ===")
for n in range(2, 8):
    cs, ss = [], []
    for perm in itertools.permutations(range(n)):
        _, c, s = insertion_sort(list(perm), log=None)
        cs.append(c); ss.append(s)
    N = len(cs)
    avg_c = F(sum(cs), N); avg_s = F(sum(ss), N)
    pred_c = F(n * (n - 1), 4) + n - H(n)
    print(f"n={n}: cmp min={min(cs)} (n-1={n-1}) max={max(cs)} (n(n-1)/2={n*(n-1)//2}) "
          f"avg={float(avg_c):.4f} (n(n-1)/4+n-H_n={float(pred_c):.4f}, match={avg_c==pred_c}); "
          f"shifts avg={avg_s} (n(n-1)/4={F(n*(n-1),4)})")

print("\n=== Quicksort (Lomuto, last-element pivot) over ALL permutations ===")
for n in range(2, 9):
    cs = []
    for perm in itertools.permutations(range(n)):
        A = one_based(perm); st = {"cmp": 0, "xchg": 0}
        quicksort(A, 1, n, "lomuto", None, st)
        cs.append(st["cmp"])
    avg = F(sum(cs), len(cs))
    pred = 2 * (n + 1) * H(n) - 4 * n
    print(f"n={n}: cmp min={min(cs)} max={max(cs)} (n(n-1)/2={n*(n-1)//2}) avg={float(avg):.4f} "
          f"(2(n+1)H_n-4n={float(pred):.4f}, match={avg==pred})")

print("\n=== Top-down merge sort over ALL permutations (element comparisons, no sentinels) ===")
for n in range(2, 9):
    cs = []
    for perm in itertools.permutations(range(n)):
        A = one_based(perm); st = {"cmp": 0}
        merge_sort(A, 1, n, None, st)
        cs.append(st["cmp"])
    L = math.ceil(math.log2(n))
    print(f"n={n}: worst={max(cs)} (n*ceil(lg n)-2^ceil(lg n)+1={n*L - 2**L + 1}) best={min(cs)} "
          f"avg={sum(cs)/len(cs):.3f}; ceil(lg n!)={math.ceil(math.log2(math.factorial(n)))}")

print("\n=== Decision-tree lower bound table ===")
for n in (3, 4, 5, 6, 8, 10, 12, 16, 100, 1000):
    lb = math.ceil(math.log2(math.factorial(n)))
    L = math.ceil(math.log2(n))
    ms = n * L - 2 ** L + 1
    print(f"n={n:5d}: n!={math.factorial(n) if n <= 12 else '...':>10} ceil(lg n!)={lb:6d}  merge-sort worst={ms:6d}  "
          f"insertion worst={n*(n-1)//2:7d}  n lg n={n*math.log2(n):9.1f}  (n/2)lg(n/2)={n/2*math.log2(n/2):8.1f}")

print("\n=== BUILD-MAX-HEAP cost on random inputs (algs4: < 2n compares, < n exchanges) ===")
rng = random.Random(1)
for n in (10, 100, 1000, 10000):
    worst_c = worst_x = 0
    for _ in range(20):
        A = one_based(rng.sample(range(10 * n), n)); st = {"cmp": 0, "xchg": 0}
        build_max_heap(A, None, st); assert is_max_heap(A)
        worst_c = max(worst_c, st["cmp"]); worst_x = max(worst_x, st["xchg"])
    # exact worst-case exchange bound = sum of node heights
    heights = 0
    for i in range(1, n + 1):
        h = 0; j = i
        while 2 * j <= n:
            j *= 2; h += 1
        heights += h
    print(f"n={n:6d}: max cmp over 20 runs={worst_c:6d} (2n={2*n}), max xchg={worst_x:6d} (n={n}), sum of heights={heights}")
print("partial sums of sum_{h>=0} h/2^h:", [float(sum(F(h, 2 ** h) for h in range(0, m))) for m in (2, 4, 8, 16, 32)])

print("\n=== MAX-HEAPIFY: largest child-subtree fraction (CLRS uses <= 2n/3) ===")
best = (0, 0)
for n in range(2, 5000):
    def size(i):
        if i > n: return 0
        return 1 + size(2 * i) + size(2 * i + 1)
    if n in (5, 11, 23, 47, 95, 191, 383, 767, 1535, 3071):
        s = size(2)
        print(f"n={n}: left subtree size={s}, fraction={s/n:.4f}")

print("\n=== Heapsort compares on random input (algs4: < 2n lg n + 2n) ===")
for n in (100, 1000, 10000):
    A = one_based(rng.sample(range(10 * n), n)); st = {"cmp": 0, "xchg": 0}
    heapsort(A, None, st)
    assert all(A[i] <= A[i + 1] for i in range(1, n))
    print(f"n={n}: compares={st['cmp']}, 2n lg n + 2n={2*n*math.log2(n)+2*n:.0f}, ratio cmp/(n lg n)={st['cmp']/(n*math.log2(n)):.3f}")

print("\n=== Randomized quicksort: average compares (Monte Carlo) vs 2(n+1)H_n - 4n ===")
for n in (100, 1000):
    tot = 0; trials = 200
    for t in range(trials):
        A = one_based(rng.sample(range(n), n)); st = {"cmp": 0, "xchg": 0}
        quicksort(A, 1, n, "lomuto", None, st)
        tot += st["cmp"]
    pred = float(2 * (n + 1) * H(n) - 4 * n)
    print(f"n={n}: mean cmp={tot/trials:.1f}, formula={pred:.1f}, 2n ln n={2*n*math.log(n):.1f}, 1.39 n lg n={1.39*n*math.log2(n):.1f}")

print("\n=== Lomuto vs Hoare: exchanges on random permutations (n=1000, 200 runs) ===")
n = 1000; lx = hx = lself = 0
for t in range(200):
    data = rng.sample(range(n), n)
    A = one_based(data); st = {"cmp": 0, "xchg": 0}
    # count Lomuto exchanges excluding self-exchanges
    def lom(A, p, r):
        global lx, lself
        x = A[r]; i = p - 1
        for j in range(p, r):
            if A[j] <= x:
                i += 1
                if i != j: lx += 1
                else: lself += 1
                A[i], A[j] = A[j], A[i]
        if i + 1 != r: lx += 1
        A[i + 1], A[r] = A[r], A[i + 1]
        return i + 1
    def qs(A, p, r):
        while p < r:
            q = lom(A, p, r)
            if q - p < r - q: qs(A, p, q - 1); p = q + 1
            else: qs(A, q + 1, r); r = q - 1
    qs(A, 1, n)
    B = one_based(data); st = {"cmp": 0, "xchg": 0}
    quicksort(B, 1, n, "hoare", None, st)
    hx += st["xchg"]
print(f"Lomuto non-trivial exchanges avg={lx/200:.0f} (+ self-exchanges avg={lself/200:.0f}); Hoare exchanges avg={hx/200:.0f}; ratio={lx/hx:.2f}")

print("\n=== All-equal keys: Lomuto vs Hoare ===")
for n in (8, 64, 512):
    for scheme in ("lomuto", "hoare"):
        A = one_based([7] * n); st = {"cmp": 0, "xchg": 0}
        quicksort(A, 1, n, scheme, None, st)
        print(f"n={n:4d} {scheme:6s}: comparisons={st['cmp']:7d}, max depth={st['maxdepth']}")

print("\n=== Bucket sort: E[sum n_i^2] = n(2 - 1/n) = 2n - 1 (Monte Carlo) ===")
for n in (10, 100, 1000):
    trials = 2000 if n < 1000 else 300
    tot = 0
    for t in range(trials):
        cnt = [0] * n
        for _ in range(n):
            cnt[int(n * rng.random())] += 1
        tot += sum(c * c for c in cnt)
    print(f"n={n}: mean sum n_i^2 = {tot/trials:.2f}, 2n-1 = {2*n-1}")
