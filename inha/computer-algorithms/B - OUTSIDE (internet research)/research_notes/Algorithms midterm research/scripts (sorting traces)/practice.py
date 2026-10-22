"""Compute/verify every answer in the 20 practice problems."""
import itertools, math
from fractions import Fraction as F
from clrs import *

def h(t):
    print("\n" + "#" * 6 + " " + t + " " + "#" * 6)

def Hn(n): return sum(F(1, k) for k in range(1, n + 1))

h("P1 insertion sort [7, 4, 9, 2, 6, 3]")
insertion_sort([7, 4, 9, 2, 6, 3])

h("P2 insertion sort [6, 5a, 3, 1, 8, 7, 2, 5b]")
insertion_sort([It(6), It(5, 'a'), It(3), It(1), It(8), It(7), It(2), It(5, 'b')])

h("P3 insertion sort counts for n = 10")
_, c, s = insertion_sort(list(range(10)), log=None); print("sorted: cmp", c, "shifts", s)
_, c, s = insertion_sort(list(range(10, 0, -1)), log=None); print("reverse: cmp", c, "shifts", s)
print("random avg shifts n(n-1)/4 =", F(90, 4), "avg cmp = n(n-1)/4 + n - H_n =", float(F(90, 4) + 10 - Hn(10)))
# an array with exactly 7 inversions, show cmp is between 7 and 7 + 9
ex = [2, 1, 4, 3, 6, 5, 8, 7, 10, 9]   # 5 inversions
ex7 = [3, 1, 2, 5, 4, 7, 6, 9, 8, 10]  # check count
print("ex7 inversions:", inversions(ex7)); _, c, s = insertion_sort(ex7, log=None); print("ex7: cmp", c, "shifts", s)

h("P4 Lomuto PARTITION on [6, 3, 9, 1, 8, 2, 7, 5]")
A = one_based([6, 3, 9, 1, 8, 2, 7, 5]); st = {"cmp": 0, "xchg": 0}
partition_lomuto(A, 1, 8, print, st); print(st)

h("P5 HOARE-PARTITION on [6, 3, 9, 1, 8, 2, 7, 5]")
A = one_based([6, 3, 9, 1, 8, 2, 7, 5]); st = {"cmp": 0, "xchg": 0}
q = partition_hoare(A, 1, 8, print, st); print("final", show(A), "q =", q, st)

h("P6 full QUICKSORT (Lomuto) on [6, 3, 9, 1, 8, 2, 7, 5]")
A = one_based([6, 3, 9, 1, 8, 2, 7, 5]); calls = []; st = {"cmp": 0, "xchg": 0}
quicksort(A, 1, 8, "lomuto", None, st, 0, calls)
for (d, p, r, q, sub, whole) in calls:
    print(f"{'  '*d}QUICKSORT(A,{p},{r}) -> q={q}: A[{p}..{r}]={sub}  whole={whole}  (partition cmp = {r-p})")
print("sorted", show(A), st)

h("P7 worst cases n = 6 (Lomuto)")
for name, data in (("sorted", [1, 2, 3, 4, 5, 6]), ("reverse", [6, 5, 4, 3, 2, 1]), ("all equal", [4] * 6), ("example", [3, 6, 1, 5, 2, 4])):
    A = one_based(data); calls = []; st = {"cmp": 0, "xchg": 0}
    quicksort(A, 1, 6, "lomuto", None, st, 0, calls)
    print(f"{name:9s}: cmp={st['cmp']}, depth={st['maxdepth']}, splits={[ (q-p, r-q) for (_,p,r,q,_,_) in calls ]}")

h("P8 recurrences numerically")
def T1(n):  # T(n) = T(n-1) + n, T(1) = 0... use iterative
    t = 0
    for k in range(2, n + 1): t += k
    return t
import functools
@functools.lru_cache(None)
def T2(n):  # T(n) = 2T(n/2) + n, T(1)=0
    return 0 if n <= 1 else 2 * T2(n // 2) + n
@functools.lru_cache(None)
def T3(n):  # T(n) = T(9n/10) + T(n/10) + n
    if n <= 1: return 0
    a = (9 * n) // 10; b = n - a
    return T3(a) + T3(b) + n
for n in (2 ** 10, 2 ** 14):
    print(f"n={n}: T(n-1)+n -> {T1(n)} vs n^2/2={n*n//2}; 2T(n/2)+n -> {T2(n)} vs n lg n={int(n*math.log2(n))}; "
          f"9/10-1/10 split -> {T3(n)} vs n log_(10/9) n={n*math.log(n)/math.log(10/9):.0f}, n lg n={n*math.log2(n):.0f}")

h("P9 MERGE-SORT on [12, 7, 3, 15, 9, 1, 10, 4]")
A = one_based([12, 7, 3, 15, 9, 1, 10, 4]); st = {"cmp": 0}
merge_sort(A, 1, 8, print, st); print("total cmp", st["cmp"])

h("P10 merge comparisons")
for L, R in (([1, 4, 6, 9], [2, 3, 7, 8]), ([2, 3, 5], [10, 11, 12, 13, 14]), ([1, 2, 3, 20], [4, 5, 6, 7])):
    A = one_based(L + R); _, _, c = merge(A, 1, len(L), len(L) + len(R))
    print(L, "+", R, "->", show(A), "cmp:", c)

h("P11 bottom-up merge sort on [5, 1, 6, 2, 7, 3, 8, 4, 0]")
A = one_based([5, 1, 6, 2, 7, 3, 8, 4, 0]); st = {"cmp": 0}
merge_sort_bottom_up(A, print, st); print("total cmp", st["cmp"])

h("P12 heap index arithmetic, n = 13")
n = 13
print("1-based: PARENT(13) =", 13 // 2, "; LEFT(5), RIGHT(5) =", 2 * 5, 2 * 5 + 1, "; leaves:", list(range(n // 2 + 1, n + 1)), "; height floor(lg n) =", int(math.log2(n)))
print("0-based: parent(12) =", (12 - 1) // 2, "; left(4), right(4) =", 2 * 4 + 1, 2 * 4 + 2, "; leaves:", list(range(n // 2, n)))
for hh in range(0, 5):
    print(f"height {hh}: min elements {2**hh}, max elements {2**(hh+1)-1}")

h("P12b (MIT 6.006 S20 Quiz 1 P3) min-heap [A..J], 10 distinct keys: possible positions of ranks 1, 3 and 10")
pos = {1: set(), 2: set(), 3: set(), 10: set()}
letters = "ABCDEFGHIJ"
count = 0
def gen(arr, remaining):
    # build min-heaps by assigning ranks in order of position, prune by heap property
    global count
    i = len(arr)
    if i == 10:
        count += 1
        for rank in pos:
            pos[rank].add(letters[arr.index(rank)])
        return
    for v in list(remaining):
        if i == 0 or arr[(i - 1) // 2] < v:
            arr.append(v); remaining.remove(v)
            gen(arr, remaining)
            arr.pop(); remaining.add(v)
gen([], set(range(1, 11)))
print("number of distinct min-heaps on 10 keys:", count)
for rank in sorted(pos):
    print(f"rank {rank}: positions {sorted(pos[rank])}")

h("P13 is it a max-heap?")
for arr in ([30, 20, 25, 15, 18, 22, 10, 5, 16, 3], [23, 17, 14, 6, 13, 10, 1, 5, 7, 12], [9, 8, 7, 6, 5, 4, 3, 2, 1], [10, 9, 3, 8, 7, 2, 1]):
    A = one_based(arr)
    bad = [(PARENT(i), i) for i in range(2, len(arr) + 1) if A[PARENT(i)] < A[i]]
    print(arr, "max-heap:", is_max_heap(A), "violations (parent idx, child idx):", bad)

h("P14 BUILD-MAX-HEAP on [2, 8, 6, 1, 10, 15, 3, 12, 11]")
A = one_based([2, 8, 6, 1, 10, 15, 3, 12, 11]); st = {"cmp": 0, "xchg": 0}
build_max_heap(A, print, st); print("result", show(A), is_max_heap(A), st)

h("P15 HEAPSORT on [2, 8, 6, 1, 10, 15, 3, 12, 11]")
A = one_based([2, 8, 6, 1, 10, 15, 3, 12, 11]); st = {"cmp": 0, "xchg": 0}
heapsort(A, print, st)
print("final", show(A))

h("P16 priority-queue ops on [20, 18, 15, 12, 9, 10, 7, 4, 8, 3]")
base = [20, 18, 15, 12, 9, 10, 7, 4, 8, 3]
print("is max-heap:", is_max_heap(one_based(base)))
A = one_based(base); print("(a) EXTRACT-MAX"); mx = heap_extract_max(A, print); print("   returned", mx, show(A), is_max_heap(A))
A = one_based(base); print("(b) INSERT 19"); max_heap_insert(A, 19, print); print("  ", show(A), is_max_heap(A))
A = one_based(base); print("(c) INCREASE-KEY(A, 9, 25)"); heap_increase_key(A, 9, 25, print); print("  ", show(A), is_max_heap(A))

h("P17 COUNTING-SORT on [4a, 1a, 3a, 4b, 0, 1b, 3b, 4c, 2], k = 5")
A = one_based([It(4, 'a'), It(1, 'a'), It(3, 'a'), It(4, 'b'), It(0), It(1, 'b'), It(3, 'b'), It(4, 'c'), It(2)])
B = counting_sort(A, 5, log=print); print("B =", show(B))

h("P18 RADIX-SORT on [512, 307, 123, 456, 721, 89, 34, 700]")
A = one_based([512, 307, 123, 456, 721, 89, 34, 700])
radix_sort(A, 3, log=print)
print("unstable variant:"); A = one_based([512, 307, 123, 456, 721, 89, 34, 700]); radix_sort(A, 3, log=print, stable=False)
print("MSD-first (wrong order of passes) with stable sort:")
A = one_based([512, 307, 123, 456, 721, 89, 34, 700])
for d in (3, 2, 1):
    A = counting_sort(A, 9, key=lambda x, d=d: digit(x, d)); print(f"  after digit {d}: {show(A)}")

h("P19 BUCKET-SORT on [.45, .12, .87, .33, .91, .05, .48, .36, .62, .17]")
vals = [F(s) for s in ("0.45", "0.12", "0.87", "0.33", "0.91", "0.05", "0.48", "0.36", "0.62", "0.17")]
bucket_sort(vals, print)
print("worst case: all keys in [0.40, 0.50) with n = 10 -> one bucket, insertion sort on 10 items: up to", 10 * 9 // 2, "comparisons")

h("P20 lower bound numbers")
for n in (3, 4, 5, 6):
    print(f"n={n}: leaves >= n! = {math.factorial(n)}, height >= ceil(lg n!) = {math.ceil(math.log2(math.factorial(n)))}")
print("half the inputs in linear time: need 2^h >= n!/2 -> h >= lg(n!) - 1")
