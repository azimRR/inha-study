"""CLRS-style (1-based) sorting implementations with tracing.

Every procedure mirrors the CLRS pseudocode line by line so that the printed
intermediate states are exactly what a hand trace of the pseudocode produces.
Arrays are Python lists with a dummy element at index 0 (A[0] is unused).
"""
import math
from fractions import Fraction


class It:
    """An element with a key and a tag (to show stability, e.g. 3a vs 3b)."""
    def __init__(self, k, tag=""):
        self.k, self.tag = k, tag
    def _k(self, o):
        return o.k if isinstance(o, It) else o
    def __lt__(self, o): return self.k < self._k(o)
    def __le__(self, o): return self.k <= self._k(o)
    def __gt__(self, o): return self.k > self._k(o)
    def __ge__(self, o): return self.k >= self._k(o)
    def __repr__(self): return f"{self.k}{self.tag}"


def key_of(x):
    return x.k if isinstance(x, It) else x


def show(A, lo=1, hi=None):
    if hi is None:
        hi = len(A) - 1
    return "[" + ", ".join(fmtv(x) for x in A[lo:hi + 1]) + "]"


def fmtv(x):
    if isinstance(x, Fraction):
        return f"{float(x):.2f}".lstrip("0")
    return str(x)


def one_based(arr):
    return [None] + list(arr)


def inversions(arr):
    a = [key_of(x) for x in arr]
    return sum(1 for i in range(len(a)) for j in range(i + 1, len(a)) if a[i] > a[j])


# ---------------------------------------------------------------- insertion
def insertion_sort(arr, log=print):
    """INSERTION-SORT(A). Counts key comparisons (A[i] > key) and shifts."""
    A = one_based(arr)
    n = len(arr)
    C = S = 0
    if log: log(f"start          : {show(A)}")
    for j in range(2, n + 1):
        key = A[j]
        i = j - 1
        c = s = 0
        while i > 0:
            c += 1                      # evaluate A[i] > key
            if A[i] > key:
                A[i + 1] = A[i]         # shift
                s += 1
                i -= 1
            else:
                break
        A[i + 1] = key
        C += c
        S += s
        if log: log(f"pass j={j} key={fmtv(key):>3}: {c} cmp, {s} shift -> {show(A)}")
    if log: log(f"TOTAL: {C} comparisons, {S} shifts (inversions = {inversions(arr)})")
    return A[1:], C, S


# ---------------------------------------------------------------- quicksort
def partition_lomuto(A, p, r, log=None, st=None):
    """PARTITION(A, p, r) -- Lomuto, pivot = A[r]."""
    x = A[r]
    i = p - 1
    if log: log(f"PARTITION(A,{p},{r}): pivot x=A[{r}]={x}; i={i}")
    for j in range(p, r):
        if st is not None: st["cmp"] += 1
        if A[j] <= x:
            i += 1
            ai, aj = A[i], A[j]
            A[i], A[j] = A[j], A[i]
            if st is not None: st["xchg"] += 1
            if log:
                what = "self-exchange" if i == j else f"exchange A[{i}]={ai} <-> A[{j}]={aj}"
                log(f"  j={j}: A[j]={aj} <= {x}: i={i}, {what:30s} {show(A, p, r)}")
        else:
            if log: log(f"  j={j}: A[j]={A[j]} >  {x}: no change{'':24s} {show(A, p, r)}")
    A[i + 1], A[r] = A[r], A[i + 1]
    if st is not None: st["xchg"] += 1
    if log: log(f"  final exchange A[{i+1}] <-> A[{r}]: {show(A, p, r)}  return q={i+1}")
    return i + 1


def partition_hoare(A, p, r, log=None, st=None):
    """HOARE-PARTITION(A, p, r) -- CLRS Problem 7-1, pivot = A[p]."""
    x = A[p]
    i = p - 1
    j = r + 1
    if log: log(f"HOARE-PARTITION(A,{p},{r}): pivot x=A[{p}]={x}; i={i}, j={j}")
    while True:
        while True:
            j -= 1
            if st is not None: st["cmp"] += 1
            if A[j] <= x:
                break
        while True:
            i += 1
            if st is not None: st["cmp"] += 1
            if A[i] >= x:
                break
        if i < j:
            ai, aj = A[i], A[j]
            A[i], A[j] = A[j], A[i]
            if st is not None: st["xchg"] += 1
            if log: log(f"  stop at i={i} (A[i]={ai}), j={j} (A[j]={aj}); i<j -> exchange: {show(A, p, r)}")
        else:
            if log: log(f"  stop at i={i} (A[i]={A[i]}), j={j} (A[j]={A[j]}); i>=j -> return j={j}")
            return j


def quicksort(A, p, r, scheme="lomuto", log=None, st=None, depth=0, calls=None):
    """QUICKSORT(A,p,r). Lomuto recurses on (p,q-1),(q+1,r); Hoare on (p,q),(q+1,r)."""
    if st is not None:
        st["maxdepth"] = max(st.get("maxdepth", 0), depth)
    if p < r:
        if scheme == "lomuto":
            q = partition_lomuto(A, p, r, None, st)
            if calls is not None: calls.append((depth, p, r, q, show(A, p, r), show(A)))
            quicksort(A, p, q - 1, scheme, log, st, depth + 1, calls)
            quicksort(A, q + 1, r, scheme, log, st, depth + 1, calls)
        else:
            q = partition_hoare(A, p, r, None, st)
            if calls is not None: calls.append((depth, p, r, q, show(A, p, r), show(A)))
            quicksort(A, p, q, scheme, log, st, depth + 1, calls)
            quicksort(A, q + 1, r, scheme, log, st, depth + 1, calls)


def quicksort_smaller_first(A, p, r, st, depth=0):
    """Tail-recursion-eliminated quicksort that recurses on the smaller side."""
    st["maxdepth"] = max(st.get("maxdepth", 0), depth)
    while p < r:
        q = partition_lomuto(A, p, r, None, st)
        if q - p < r - q:
            quicksort_smaller_first(A, p, q - 1, st, depth + 1)
            p = q + 1
        else:
            quicksort_smaller_first(A, q + 1, r, st, depth + 1)
            r = q - 1


def median_of_three_partition(A, p, r, log=None, st=None):
    """Put median of A[p], A[mid], A[r] into A[r], then Lomuto PARTITION."""
    m = (p + r) // 2
    trio = sorted([(A[p], p), (A[m], m), (A[r], r)], key=lambda t: key_of(t[0]))
    med_idx = trio[1][1]
    if log: log(f"median-of-three of A[{p}]={A[p]}, A[{m}]={A[m]}, A[{r}]={A[r]} is {A[med_idx]} (index {med_idx})")
    A[med_idx], A[r] = A[r], A[med_idx]
    return partition_lomuto(A, p, r, log, st)


# ---------------------------------------------------------------- merge sort
def merge(A, p, q, r, st=None):
    """MERGE(A,p,q,r) without sentinels (CLRS 4e style); counts element comparisons."""
    L = A[p:q + 1]
    R = A[q + 1:r + 1]
    i = j = 0
    k = p
    c = 0
    while i < len(L) and j < len(R):
        c += 1
        if L[i] <= R[j]:       # <= keeps it stable
            A[k] = L[i]; i += 1
        else:
            A[k] = R[j]; j += 1
        k += 1
    while i < len(L):
        A[k] = L[i]; i += 1; k += 1
    while j < len(R):
        A[k] = R[j]; j += 1; k += 1
    if st is not None: st["cmp"] += c
    return L, R, c


def merge_sort(A, p, r, log=None, st=None, depth=0):
    """MERGE-SORT(A,p,r) with q = floor((p+r)/2)."""
    if p < r:
        q = (p + r) // 2
        merge_sort(A, p, q, log, st, depth + 1)
        merge_sort(A, q + 1, r, log, st, depth + 1)
        L, R, c = merge(A, p, q, r, st)
        if log:
            log(f"MERGE(A,{p},{q},{r}): {show(one_based(L))} + {show(one_based(R))} "
                f"-> {show(A, p, r)}  ({c} cmp)   whole array: {show(A)}")


def merge_sort_bottom_up(A, log=None, st=None):
    n = len(A) - 1
    width = 1
    pas = 0
    while width < n:
        pas += 1
        lo = 1
        cmps = 0
        while lo + width <= n:            # there is a right run
            mid = lo + width - 1
            hi = min(lo + 2 * width - 1, n)
            _, _, c = merge(A, lo, mid, hi, st)
            cmps += c
            lo += 2 * width
        if log: log(f"pass {pas} (run width {width} -> {2*width}): {show(A)}  ({cmps} cmp)")
        width *= 2


# ---------------------------------------------------------------- heaps
def PARENT(i): return i // 2
def LEFT(i): return 2 * i
def RIGHT(i): return 2 * i + 1


def max_heapify(A, i, hs, log=None, st=None):
    """MAX-HEAPIFY(A,i) with A.heap-size = hs (recursive form unrolled)."""
    while True:
        l, r = LEFT(i), RIGHT(i)
        if l <= hs:
            if st is not None: st["cmp"] += 1
        if l <= hs and A[l] > A[i]:
            largest = l
        else:
            largest = i
        if r <= hs:
            if st is not None: st["cmp"] += 1
        if r <= hs and A[r] > A[largest]:
            largest = r
        if largest != i:
            if log: log(f"    MAX-HEAPIFY at i={i}: exchange A[{i}]={A[i]} <-> A[{largest}]={A[largest]}")
            A[i], A[largest] = A[largest], A[i]
            if st is not None: st["xchg"] += 1
            i = largest
        else:
            if log: log(f"    MAX-HEAPIFY at i={i}: no exchange (heap property holds)")
            return


def build_max_heap(A, log=None, st=None):
    n = len(A) - 1
    for i in range(n // 2, 0, -1):
        if log: log(f"  i={i} (A[i]={A[i]}):")
        max_heapify(A, i, n, log, st)
        if log: log(f"    array: {show(A)}")


def heapsort(A, log=None, st=None, log_build=None):
    n = len(A) - 1
    build_max_heap(A, log_build, st)
    if log: log(f"after BUILD-MAX-HEAP: {show(A)}")
    hs = n
    for i in range(n, 1, -1):
        A[1], A[i] = A[i], A[1]
        if st is not None: st["xchg"] += 1
        hs -= 1
        max_heapify(A, 1, hs, None, st)
        if log: log(f"i={i:2d}: heap {show(A, 1, hs)} | sorted {show(A, hs + 1, n)}")


def heap_increase_key(A, i, key, log=None):
    if key < A[i]:
        raise ValueError("new key is smaller than current key")
    A[i] = key
    if log: log(f"  set A[{i}]={key}: {show(A)}")
    while i > 1 and A[PARENT(i)] < A[i]:
        if log: log(f"  A[{PARENT(i)}]={A[PARENT(i)]} < A[{i}]={A[i]} -> exchange")
        A[i], A[PARENT(i)] = A[PARENT(i)], A[i]
        i = PARENT(i)
        if log: log(f"    {show(A)}")
    return A


def heap_extract_max(A, log=None):
    hs = len(A) - 1
    if hs < 1:
        raise ValueError("heap underflow")
    mx = A[1]
    A[1] = A[hs]
    A.pop()                      # heap-size decreases by one
    hs -= 1
    if log: log(f"  max={mx}; move A[{hs+1}] to root: {show(A)}")
    max_heapify(A, 1, hs, log)
    if log: log(f"  result: {show(A)}")
    return mx


def max_heap_insert(A, key, log=None):
    A.append(-math.inf)
    if log: log(f"  append -inf at index {len(A)-1}")
    return heap_increase_key(A, len(A) - 1, key, log)


def is_max_heap(A):
    n = len(A) - 1
    return all(A[PARENT(i)] >= A[i] for i in range(2, n + 1))


# ---------------------------------------------------------------- counting / radix / bucket
def counting_sort(A, k, key=key_of, log=None, label=""):
    """COUNTING-SORT(A,B,k) (CLRS 3e): returns B (1-based)."""
    n = len(A) - 1
    B = [None] * (n + 1)
    C = [0] * (k + 1)
    for j in range(1, n + 1):
        C[key(A[j])] += 1
    if log: log(f"  C after counting   (index 0..{k}): {C}")
    for i in range(1, k + 1):
        C[i] += C[i - 1]
    if log: log(f"  C after prefix sums (index 0..{k}): {C}")
    for j in range(n, 0, -1):
        B[C[key(A[j])]] = A[j]
        pos = C[key(A[j])]
        C[key(A[j])] -= 1
        if log: log(f"  j={j:2d}: A[j]={fmtv(A[j]):>4} (key {key(A[j])}) -> B[{pos}]; C[{key(A[j])}]={C[key(A[j])]}; "
                    f"B={show_partial(B)}")
    return B


def counting_sort_unstable_forward(A, k, key=key_of):
    """WRONG variant: iterate j = 1..n while still decrementing C -> reverses equal keys."""
    n = len(A) - 1
    B = [None] * (n + 1)
    C = [0] * (k + 1)
    for j in range(1, n + 1):
        C[key(A[j])] += 1
    for i in range(1, k + 1):
        C[i] += C[i - 1]
    for j in range(1, n + 1):
        B[C[key(A[j])]] = A[j]
        C[key(A[j])] -= 1
    return B


def show_partial(B):
    return "[" + ", ".join("." if x is None else fmtv(x) for x in B[1:]) + "]"


def digit(x, d, base=10):
    """d-th digit, d=1 is the lowest-order digit."""
    return (key_of(x) // base ** (d - 1)) % base


def radix_sort(A, d, base=10, log=None, stable=True, inner_log=None):
    for i in range(1, d + 1):
        if stable:
            A = counting_sort(A, base - 1, key=lambda x, i=i: digit(x, i, base), log=inner_log)
        else:
            A = counting_sort_unstable_forward(A, base - 1, key=lambda x, i=i: digit(x, i, base))
        if log: log(f"after sorting on digit {i}: {show(A)}")
    return A


def bucket_sort(arr, log=None):
    """BUCKET-SORT(A) (CLRS 3e): n buckets, bucket index floor(n*A[i]), insertion sort per bucket."""
    n = len(arr)
    B = [[] for _ in range(n)]
    for x in arr:
        B[math.floor(n * x)].append(x)
    if log:
        for i in range(n):
            if B[i]:
                log(f"  B[{i}] before sort: {', '.join(fmtv(x) for x in B[i])}")
    out = []
    for i in range(n):
        Bi, _, _ = insertion_sort(B[i], log=None)
        B[i] = Bi
        out.extend(Bi)
    if log:
        for i in range(n):
            log(f"  B[{i}] after  sort: {', '.join(fmtv(x) for x in B[i]) if B[i] else '/'}")
        log(f"  concatenated: {', '.join(fmtv(x) for x in out)}")
    return out
