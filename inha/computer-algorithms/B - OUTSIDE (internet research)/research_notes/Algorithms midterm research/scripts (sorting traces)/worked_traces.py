"""Worked traces for the notes (main body). Run: python3 worked_traces.py"""
from clrs import *
from fractions import Fraction as F

def h(t):
    print("\n" + "=" * 8 + " " + t + " " + "=" * 8)

h("1. INSERTION SORT on [5, 2, 4, 6, 1, 3]")
insertion_sort([5, 2, 4, 6, 1, 3])

h("1b. INSERTION SORT best case [1..6] and worst case [6..1]")
insertion_sort([1, 2, 3, 4, 5, 6])
insertion_sort([6, 5, 4, 3, 2, 1])

h("1c. INSERTION SORT stability with tags [3a, 1, 3b, 2, 3c]")
insertion_sort([It(3, 'a'), It(1), It(3, 'b'), It(2), It(3, 'c')])

h("2. LOMUTO PARTITION on [2, 8, 7, 1, 3, 5, 6, 4]")
A = one_based([2, 8, 7, 1, 3, 5, 6, 4])
st = {"cmp": 0, "xchg": 0}
partition_lomuto(A, 1, len(A) - 1, print, st)
print("stats:", st)

h("2b. FULL QUICKSORT (Lomuto) on [2, 8, 7, 1, 3, 5, 6, 4]: each partition call")
A = one_based([2, 8, 7, 1, 3, 5, 6, 4])
calls = []
st = {"cmp": 0, "xchg": 0}
quicksort(A, 1, len(A) - 1, "lomuto", None, st, 0, calls)
for (d, p, r, q, sub, whole) in calls:
    print(f"{'  '*d}QUICKSORT(A,{p},{r}): pivot ends at q={q}; A[{p}..{r}] = {sub}; whole = {whole}")
print("sorted:", show(A), "stats:", st)

h("3. HOARE PARTITION on [13, 19, 9, 5, 12, 8, 7, 4, 11, 2, 6, 21]")
A = one_based([13, 19, 9, 5, 12, 8, 7, 4, 11, 2, 6, 21])
st = {"cmp": 0, "xchg": 0}
q = partition_hoare(A, 1, len(A) - 1, print, st)
print("result:", show(A), "q =", q, "stats:", st)

h("3b. FULL QUICKSORT (Hoare) on [2, 8, 7, 1, 3, 5, 6, 4]: each partition call")
A = one_based([2, 8, 7, 1, 3, 5, 6, 4])
calls = []
st = {"cmp": 0, "xchg": 0}
quicksort(A, 1, len(A) - 1, "hoare", None, st, 0, calls)
for (d, p, r, q, sub, whole) in calls:
    print(f"{'  '*d}QUICKSORT(A,{p},{r}): HOARE-PARTITION returned q={q}; A[{p}..{r}] = {sub}; whole = {whole}")
print("sorted:", show(A), "stats:", st)

h("3c. HOARE partition first call on [2, 8, 7, 1, 3, 5, 6, 4] (detailed)")
A = one_based([2, 8, 7, 1, 3, 5, 6, 4])
partition_hoare(A, 1, 8, print)

h("4. QUICKSORT worst case: sorted [1..8], last-element pivot (Lomuto)")
A = one_based(list(range(1, 9)))
calls = []
st = {"cmp": 0, "xchg": 0}
quicksort(A, 1, 8, "lomuto", None, st, 0, calls)
for (d, p, r, q, sub, whole) in calls:
    print(f"{'  '*d}QUICKSORT(A,{p},{r}) -> q={q} (split sizes {q-p} and {r-q})")
print("total comparisons:", st["cmp"], "= n(n-1)/2 =", 8 * 7 // 2, "max recursion depth:", st["maxdepth"])

h("4b. all-equal keys [5]*8: Lomuto vs Hoare")
for scheme in ("lomuto", "hoare"):
    A = one_based([5] * 8)
    st = {"cmp": 0, "xchg": 0}
    calls = []
    quicksort(A, 1, 8, scheme, None, st, 0, calls)
    print(scheme, "comparisons:", st["cmp"], "max depth:", st["maxdepth"], "first split q =", calls[0][3])

h("4c. median-of-three on sorted [1..7]")
A = one_based(list(range(1, 8)))
q = median_of_three_partition(A, 1, 7, print)
print("q =", q, show(A))

h("4d. stack depth, n = 900: plain quicksort vs smaller-side-first (sorted input and random input)")
import random, sys
sys.setrecursionlimit(20000)
n = 900
for name, data in (("sorted", list(range(n))), ("random", random.Random(7).sample(range(n), n))):
    A = one_based(data); st = {"cmp": 0, "xchg": 0}
    quicksort(A, 1, n, "lomuto", None, st)
    A2 = one_based(data); st2 = {"cmp": 0, "xchg": 0}
    quicksort_smaller_first(A2, 1, n, st2)
    assert A[1:] == sorted(data) and A2[1:] == sorted(data)
    print(f"{name:6s}: plain max depth = {st['maxdepth']}, smaller-first max depth = {st2['maxdepth']}, lg n = {math.log2(n):.2f}")

h("5. MERGE SORT (top-down) on [5, 2, 4, 7, 1, 3, 2, 6]")
A = one_based([5, 2, 4, 7, 1, 3, 2, 6])
st = {"cmp": 0}
merge_sort(A, 1, 8, print, st)
print("total comparisons:", st["cmp"])

h("5b. MERGE SORT (top-down) on [38, 27, 43, 3, 9, 82, 10]")
A = one_based([38, 27, 43, 3, 9, 82, 10])
st = {"cmp": 0}
merge_sort(A, 1, 7, print, st)
print("total comparisons:", st["cmp"])

h("5c. BOTTOM-UP MERGE SORT on [5, 2, 4, 7, 1, 3, 2, 6]")
A = one_based([5, 2, 4, 7, 1, 3, 2, 6])
st = {"cmp": 0}
merge_sort_bottom_up(A, print, st)
print("total comparisons:", st["cmp"])

h("5d. BOTTOM-UP MERGE SORT on [38, 27, 43, 3, 9, 82, 10] (odd n)")
A = one_based([38, 27, 43, 3, 9, 82, 10])
st = {"cmp": 0}
merge_sort_bottom_up(A, print, st)
print("total comparisons:", st["cmp"])

h("5e. MERGE comparison counts")
for L, R in (([1, 3, 5, 7], [2, 4, 6, 8]), ([1, 2, 3, 4], [5, 6, 7, 8]), ([5, 6, 7, 8], [1, 2, 3, 4])):
    A = one_based(L + R); _, _, c = merge(A, 1, len(L), len(L) + len(R))
    print(L, "+", R, "->", show(A), "comparisons:", c)

h("6. MAX-HEAPIFY(A, 2) on [16, 4, 10, 14, 7, 9, 3, 2, 8, 1]")
A = one_based([16, 4, 10, 14, 7, 9, 3, 2, 8, 1])
max_heapify(A, 2, 10, print)
print("result:", show(A), "is max-heap:", is_max_heap(A))

h("6b. BUILD-MAX-HEAP on [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]")
A = one_based([4, 1, 3, 2, 16, 9, 10, 14, 8, 7])
st = {"cmp": 0, "xchg": 0}
build_max_heap(A, print, st)
print("result:", show(A), "is max-heap:", is_max_heap(A), "stats:", st)

h("6c. HEAPSORT on [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]")
A = one_based([4, 1, 3, 2, 16, 9, 10, 14, 8, 7])
st = {"cmp": 0, "xchg": 0}
heapsort(A, print, st)
print("sorted:", show(A))

h("6d. HEAP-INCREASE-KEY(A, 9, 15) on [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]")
A = one_based([16, 14, 10, 8, 7, 9, 3, 2, 4, 1])
heap_increase_key(A, 9, 15, print)
print("result:", show(A), "is max-heap:", is_max_heap(A))

h("6e. HEAP-EXTRACT-MAX on [15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1]")
A = one_based([15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1])
mx = heap_extract_max(A, print)
print("returned", mx, "heap:", show(A), "is max-heap:", is_max_heap(A))

h("6f. MAX-HEAP-INSERT(A, 10) on [15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1]")
A = one_based([15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1])
max_heap_insert(A, 10, print)
print("result:", show(A), "is max-heap:", is_max_heap(A))

h("6g. MIT 6.006 S20 Quiz 1 P4(a) check (0-based): delete_max on [93, 85, 38, 23, 63, 11, 13, 17]")
A = one_based([93, 85, 38, 23, 63, 11, 13, 17])   # same array, our routine is 1-based but the array content is identical
print("is max-heap:", is_max_heap(A))
mx = heap_extract_max(A, print)
print("after:", show(A), "(official answer: [85, 63, 38, 23, 17, 11, 13])")

h("7. COUNTING SORT on [2a, 5, 3a, 0a, 2b, 3b, 0b, 3c], k = 5")
A = one_based([It(2, 'a'), It(5), It(3, 'a'), It(0, 'a'), It(2, 'b'), It(3, 'b'), It(0, 'b'), It(3, 'c')])
B = counting_sort(A, 5, log=print)
print("output B:", show(B))

h("8. RADIX SORT (LSD) on [329, 457, 657, 839, 436, 720, 355]")
A = one_based([329, 457, 657, 839, 436, 720, 355])
radix_sort(A, 3, log=print)

h("8b. RADIX SORT pass 1 detail (counting sort on the ones digit, k = 9)")
A = one_based([329, 457, 657, 839, 436, 720, 355])
counting_sort(A, 9, key=lambda x: digit(x, 1), log=print)

h("8c. RADIX SORT with an UNSTABLE digit sort (counting sort run left-to-right)")
A = one_based([329, 457, 657, 839, 436, 720, 355])
radix_sort(A, 3, log=print, stable=False)

h("9. BUCKET SORT on [.78, .17, .39, .26, .72, .94, .21, .12, .23, .68]")
vals = [F(s) for s in ("0.78", "0.17", "0.39", "0.26", "0.72", "0.94", "0.21", "0.12", "0.23", "0.68")]
out = bucket_sort(vals, print)
