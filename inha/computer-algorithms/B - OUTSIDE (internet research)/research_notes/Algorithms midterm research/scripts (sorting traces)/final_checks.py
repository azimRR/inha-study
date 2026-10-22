import itertools, math
from clrs import *

def merge_sentinel(A, p, q, r):
    """CLRS 3e MERGE with infinity sentinels: count every L[i] <= R[j] test."""
    L = A[p:q+1] + [math.inf]; R = A[q+1:r+1] + [math.inf]
    i = j = 0; c = 0
    for k in range(p, r + 1):
        c += 1
        if L[i] <= R[j]: A[k] = L[i]; i += 1
        else: A[k] = R[j]; j += 1
    return c

def ms_sentinel(A, p, r):
    if p < r:
        q = (p + r) // 2
        return ms_sentinel(A, p, q) + ms_sentinel(A, q + 1, r) + merge_sentinel(A, p, q, r)
    return 0

for arr in ([5, 2, 4, 7, 1, 3, 2, 6], [38, 27, 43, 3, 9, 82, 10]):
    A = one_based(arr); c = ms_sentinel(A, 1, len(arr))
    print(arr, "-> sentinel-version comparisons:", c, "sorted:", show(A))

# merge comparisons: min and max over all interleavings of sizes (n1, n2)
for n1, n2 in ((1, 1), (2, 3), (3, 3), (4, 4), (2, 5)):
    cs = []
    for left in itertools.combinations(range(n1 + n2), n1):
        L = list(left); R = [x for x in range(n1 + n2) if x not in left]
        A = one_based(L + R); _, _, c = merge(A, 1, n1, n1 + n2); cs.append(c)
    print(f"merge sizes ({n1},{n2}): min cmp={min(cs)} (min(n1,n2)={min(n1,n2)}), max cmp={max(cs)} (n1+n2-1={n1+n2-1})")

# sum of node heights in heap == n - popcount(n)
ok = True
for n in range(1, 3000):
    s = 0
    for i in range(1, n + 1):
        hgt = 0; j = i
        while 2 * j <= n: j *= 2; hgt += 1
        s += hgt
    ok &= (s == n - bin(n).count("1"))
print("sum of heights == n - popcount(n) for n < 3000:", ok)

# heap height floor(lg n) (edges) vs levels
for n in (1, 7, 8, 10, 13, 15, 16):
    print(f"n={n}: height (edges) floor(lg n)={n.bit_length()-1}, levels={n.bit_length()}, ceil(lg n)={math.ceil(math.log2(n)) if n>1 else 0}")

# leaves of a 1-based heap are floor(n/2)+1..n
for n in (9, 10, 13):
    leaves = [i for i in range(1, n + 1) if 2 * i > n]
    print(f"n={n}: leaves={leaves[0]}..{leaves[-1]} (floor(n/2)+1={n//2+1})")
