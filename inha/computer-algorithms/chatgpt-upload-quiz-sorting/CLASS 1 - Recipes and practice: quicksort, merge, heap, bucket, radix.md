# CLASS material - sorting recipes, rules and practice questions (from the midterm review)

### 2.6 PARTITION trace — Lomuto, 1-based as in the A2 sample [D07-S4, S5]

```
QUICKSORT(A, p, r)                PARTITION (A,p,r)
if  p< r                           x=A[r]
   then q←PARTITION(A, p, r)       i ← p -1
        QUICKSORT(A, p, q–1)       For  j ← p to r-1
        QUICKSORT(A, q+1, r)            do if A[j] <= x
                                              then i ← i + 1
                                                   exchange A[i] <-> A[j]
                                   Exchange A[i+1] <-> A[r]
                                   Return i+1
```
**Steps** (first call QUICKSORT(A, 1, n))
1. Margin: **p = 1, r = n, x = A[r]** (the **last** element), **i = p − 1 = 0, j runs from p = 1 to r − 1**.
2. For each j: if **A[j] ≤ x**, then i ← i + 1 and exchange A[i] ↔ A[j] (possibly with itself); otherwise nothing changes.
3. After the loop: **exchange A[i+1] ↔ A[r]** and **return q = i + 1**.
4. Check: everything left of q is ≤ x and everything right of q is > x. The loop makes **r − p comparisons**.

✍️ Layout (columns 1…n, as on the sheet):

| Row | Margin | 1 | 2 | 3 | 4 | 5 | 6 | Action |
|---|---|---|---|---|---|---|---|---|
| start | p = 1, r = 6, x = A[6] = 10, i = 0, j from 1 | 18 | 7 | 12 | 15 | 22 | 10 | |
| j = 1 | 18 ≤ 10? no | | | | | | | i = 0 |
| j = 2 | 7 ≤ 10? **yes** | **7** | **18** | 12 | 15 | 22 | 10 | i = 1, A[1] ↔ A[2] |
| j = 3, 4, 5 | 12, 15, 22 > 10 | | | | | | | i = 1 |
| exchange | A[i+1] = A[2] ↔ A[r] = A[6] | 7 | **10** | 12 | 15 | 22 | **18** | **q = 2** ✅ (your A2 sheet) |

**🪤 Traps** (the sample solution slipped on the first three; see §6)
- i starts at **p − 1 = 0** on a 1-based sheet (the sample wrote "J=0, I=−1").
- The final exchange is at **i + 1**, not i (the sample labelled it "i").
- The test is **≤**, not < (the sample wrote "A[j] < x"). With a key equal to the pivot the two tests give different arrays: see mock Q6.
- Stop after the first PARTITION if that is all the sheet asks for.

**0-based note.** If a table is numbered 0 … n−1, the same code runs with p = 0 and r = n − 1, so i starts at **−1** and j at **0**. That is where the sample's "J = 0, I = −1" comes from. Use whichever matches the column numbers printed on the sheet.

**Performance as taught** [D07-S11–S21]

| Situation | Recurrence | Result |
|---|---|---|
| Worst split (n−1 : 0); happens on **already sorted** input | T(n) = T(n−1) + T(0) + Θ(n) = T(n−1) + Θ(n) | **Θ(n²)** [S12] |
| Best split (halves) | T(n) ≤ 2T(n/2) + Θ(n) | **Θ(n log n)** by the "Main recurrence (Master) theorem" [S13] |
| Split in a fixed ratio, or alternating best/worst | — | Θ(n log n) [S14] |
| Median as pivot (found in O(n)) | T(n) = O(n) + O(1) + O(n) + 2T(n/2) | **O(n log n)** [S16] |
| (n/4)-th smallest as pivot | T(n) = O(n) + O(1) + O(n) + T(n/4) + T(3n/4) | **Θ(n log n)** [S18] |
| Sorted 1…n vs reversed n…1 | — | **T1 = T2** (both worst case) [S20] |
| Space | levels of the recursion tree | **O(log n)** balanced, **O(n)** unbalanced [S21] |

- Variants [D07-S6–S10]:
  - **Randomized:** swap A[RANDOM(p, r)] into A[r], then PARTITION. RANDOM(a, b) gives b − a + 1 values.
  - **Median-of-3:** pivot = middle value of three random positions, swapped to A[r].
  - **Median Method V2:** two pointers, i from the left and j from the right; swap when both stop; when they cross, swap A[i] with the last element.
- 🔎 Expected running time of randomized quicksort; the names "Lomuto" and "Hoare": Track B.

### 2.7 Merge sort trace [D08-S3–S11]

```
MERGESORT(A, p, r)
if  p< r
   then q← floor[(p+r)/2]
        MERGESORT(A, p, q)
        MERGESORT(A, q+1, r)
        MERGE(A,p,q,r)
```
**Steps**
1. Split at **q = ⌊(p + r)/2⌋**. The left half A[p..q] gets the extra element when the size is odd (p = 1, r = 7 gives q = 4, so 4 + 3).
2. Recurse until every piece has one element.
3. **MERGE** two sorted runs: repeatedly take the smaller front item (on a tie, **take from L**, because the test is `L[i] <= R[j]` [D08-S8]). When one run is used up, copy the rest of the other (the "merge the rest" strategy of D08-S6).
4. A merge of n1 + n2 items makes at most n1 + n2 − 1 comparisons.

✍️ The A2-sample grid: columns 1…n with "p = 1, r = 6, q = 3" in the margin. One row per split level down to single elements, then one row per merge back up, colour-boxing each block; final sorted row last. Your A2 sheet, 19 17 12 5 20 10 ✅:
```
index:      1    2    3   |   4    5    6
start:     19   17   12   |   5   20   10        p=1, r=6, q=3
divide:   [19   17] [12]  |  [5   20] [10]       q=2 · q=5
divide:   [19] [17]       |  [5] [20]            q=1 · q=4
merge:    [17   19]       |  [5   20]
merge:    [12   17   19]  |  [5   10   20]
merge:    [ 5   10   12       17   19   20]      final MERGE: 5 comparisons, then copy 20
```
- **Cost** [D08-S9, S11]: T(n) = O(1) + 2T(n/2) + O(n), which gives **Θ(n log n)** by the Master theorem (a = 2, b = 2, k = 1, p = 0 → 2(a)). *"There is no worst scenario as it works same for ascending or descending order."* So merge sort is **non-adaptive**.
- **Space** [D08-S10]: stack O(log n) + merge array O(n) = **O(n)**, so it is **out-place**. Labels [D06-S3]: comparison-based, external, **stable**.
- **Cost recipe** [D08-S13–S19]: total = (merge cost per level) × (number of levels):
  - n elements: O(n) · log n = **O(n log n)**;
  - log n sorted lists of size n/log n: O(n) · log log n = **O(n log log n)**;
  - n strings of length n: O(n²) · log n = **O(n² log n)**;
  - pieces of size k solved directly: O(n) · log(n/k) = **O(n log(n/k))**.

### 2.8 MAX-HEAPIFY / BUILD-MAX-HEAP / EXTRACT / HEAPSORT, 0-based tables [D09-S9–S22]

**Index formulas** [D09-S9]

| | 1-based (the pseudocode) | **0-based (every class table, A2)** |
|---|---|---|
| Left child | 2i | **2i + 1** |
| Right child | 2i + 1 | **2i + 2** |
| Parent | ⌊i/2⌋ | **⌈i/2⌉ − 1** |
| Leaves | ⌊n/2⌋+1 … n | **⌊n/2⌋ … n−1** (⚠️ the slide writes "to n") |
| BUILD loop | i = ⌊n/2⌋ downto 1 | **i = ⌊n/2⌋ − 1 downto 0** |

```
MAX-HEAPIFY(A,i)                              BUILD-MAX-HEAP(A)
  l=2i ; r=2i+1          (0-based: 2i+1, 2i+2)   A.heap-size = A.length
  If(l<=A.heap-size and A[l]>A[i]) largest=l     for(i=floor(A.length/2) downto 1*)
  else largest = i                                   MAX-HEAPIFY(A,i)
  If(r<=A.heap-size and A[r]>A[largest]) largest=r   *OR i=floor(A.length/2)-1 downto 0
  If(largest<>i)
      Exchange A[i] with A[largest]
      MAX-HEAPIFY(A,largest)          ← inside the If (see §6)
```
**BUILD-MAX-HEAP steps**
1. Write "For i → ⌊n/2⌋−1 to 0" ("non-leaf nodes, (n/2)−1 to 0", as the sample does).
2. For each i: write **i, L, R** in the margin; mark a child index ≥ heap-size with **(X)**; compare A[i] with the children that exist; swap with the **larger** child if it is bigger.
3. After a swap, **continue at the index the value moved to** ("heapify(5): L = 11 (X) → exit"). This recursive call belongs to the **same** loop iteration.
4. Write the full array after every swap; shade the final heap.

✍️ A2 sheet, 11 19 7 12 15 30 ✅:

| Row | Margin | 0 | 1 | 2 | 3 | 4 | 5 | Right margin |
|---|---|---|---|---|---|---|---|---|
| start | For i → 2 to 0 | 11 | 19 | 7 | 12 | 15 | 30 | non-leaf nodes (n/2)−1 to 0 |
| i = 2 | L = 5, R = 6 (X) | 11 | 19 | **30** | 12 | 15 | **7** | 7 < 30, swap; heapify(5): L = 11 (X), exit |
| i = 1 | L = 3, R = 4 | 11 | 19 | 30 | 12 | 15 | 7 | 19 ≥ 12, 15: exit |
| i = 0 | L = 1, R = 2 | **30** | 19 | **11** | 12 | 15 | 7 | largest R; heapify(2): L = 5, R = 6 (X), 11 ≥ 7, exit |
| **final** | | **30** | **19** | **11** | **12** | **15** | **7** | max-heap |

**HEAP-EXTRACT-MAX** [D09-S15] (0-based):
1. max = A[0];
2. A[0] ← A[heap-size − 1];
3. heap-size − 1;
4. MAX-HEAPIFY(A, 0);
5. return max. (Error "heap underflow" if heap-size < 1.)

Example: [7, 3, 6, 1, 2, 5, 4] → returns 7, heap **[6, 3, 5, 1, 2, 4]** ✅. D09-S20 draws the same thing as a "vacant" spot moving down.

**HEAP-SORT** [D09-S21, S22]: BUILD-MAX-HEAP; then for i = n−1 down to 1: exchange A[0] ↔ A[i], heap-size − 1, MAX-HEAPIFY(A, 0).
- The max is **parked at the right end**, so the output is **ascending** with a **max-heap**.
- D09-S22: 12 7 8 23 3 21 → heap [23, 12, 21, 7, 3, 8] → **3 7 8 12 21 23** ✅.
- Write one block per iteration "It-1 … It-(n−1)", with the sorted part shaded.

**Costs** [D09-S17, S21]: MAX-HEAPIFY O(log n) (O(h) at height h); EXTRACT O(log n); **BUILD O(n)** (at most ⌈n/2^(h+1)⌉ nodes of height h); HEAPSORT O(n) + (n−1)·O(log n) = **O(n log n)**, extra space **O(1)**, **unstable** [D06-S3, D10-S3]. 🔎 Why Σ ⌈n/2^(h+1)⌉·O(h) = O(n): Track B.

🪤 A single MAX-HEAPIFY(A, 0) on an arbitrary array does **not** build a heap: D09-S11 gives [6, 2, 7, 1, 3, 5, 4], where 7 sits above 6. BUILD works bottom-up for exactly this reason.

### 2.9 Bucket sort [D10-S6–S16]

```
Algorithm BucketSort( S )     ( values in S are between 0 and m-1 )
for j ← 0 to m-1 do  b[j] ← 0                 // initialize m buckets
for i ← 0 to n-1 do  b[S[i]] ← b[S[i]] + 1    // place elements in buckets
i ← 0
for j ← 0 to m-1 do                           // place elements back in S
    for r ← 1 to b[j] do  S[i] ← j ; i ← i + 1
```
**Steps**
1. One bucket per possible value 0 … m−1: *the values are the bucket indexes*, and **no comparisons** are made [D10-S7].
2. Scan and count (or enqueue).
3. Read buckets 0 → m−1 back into S.

✍️ Show the b[ ] array (or a row per element if asked), then the output. D10-S8: 4 2 1 2 0 3 2 1 4 0 2 3 0 with m = 5 gives b = [3, 2, 4, 2, 2] and 0 0 0 1 1 2 2 2 2 3 3 4 4 ✅.

- **Values vs entries** [D10-S12]: a bucket is a **counter** when you sort plain values, and a **queue** when you sort entries by key. A queue keeps equal keys in arrival order, which is the stability radix sort needs.
- **Cost** [D10-S13]: O(m) + O(n) + O(n) = **O(n + m)**, which is "O(n)" when m is small. When **m >>> n** (max 999999 needs 1 million buckets) it is **O(m)** [D10-S16].
- **Floats in 0.0–0.9** [D10-S14]: bucket = the first digit after the decimal point; each bucket is a list in increasing order; read buckets 0 → 9. 🔎 How the lists are kept sorted, and the O(n²) worst case listed on D10-S3: Track B.

### 2.10 Radix sort passes [D10-S17–S30]

**Steps** [D10-S18]
1. **p** = the number of digits of the **maximum** value. That is the number of passes.
2. Use 10 buckets (0–9), or 256 for byte characters.
3. Pass 1 uses the **rightmost (least significant)** digit, then move left. Short numbers get **leading zeros** (9 = 09 goes to bucket 0 in the tens pass).
4. In each pass, put each element in the bucket for the current digit, **in list order**, then collect buckets 0 → 9, **each in the order placed** (stable).

✍️ For each pass: the non-empty buckets with their contents in placement order, then "list after pass k".

- **Stability is required** [D10-S23]: equal digits must keep the order produced by earlier passes (52 before 58 after pass 1 must stay so in pass 2).
- 🪤 D10-S20 itself breaks this: in the input 99 comes before 9, so pass 1 must end "… 88, **99, 9**", not "… 88, 9, 99" (§6).
- **Cost** [D10-S24]: p passes × O(n) = **O(pn)**, which is O(n) for a fixed p. Max 999999 needs **10 buckets and 6 passes** [D10-S17, S24].
- **Words** [D10-S25, S29]:
  - 27 buckets (a–z plus blank);
  - read characters **right → left**;
  - **pad blanks at the end**;
  - the **blank bucket comes last**;
  - passes = the word-length limit.
  - Example: dart, fear, do, car → **car, dart, do, fear** ✅ (D10-S28–S30).
- Both bucket sort and radix sort are O(n) **only because of restrictions** on the input [D10-S26]; a comparison sort needs "at least" n log n [D10-S5] (⚠️ a lower bound is Ω).



---

### 4.6 Sorting classification [D06-S3]: learn it by heart

| Category | Examples on the slide |
|---|---|
| Comparison based | insertion, merge, bubble, quick |
| Non-comparison based | bucket, radix, counting |
| Internal | bubble, insertion |
| External | quick, merge |
| **Stable** | **merge, insertion, bubble** |
| **Unstable** | **quick, heap, selection** |
| Adaptive ("sorted or unsorted data" matters) | bubble, insertion, quick |
| Non-adaptive | selection, merge, heap |
| In-place / out-place | among the comparison sorts, **only merge sort is out-place**; **all** non-comparison sorts are out-place |

- The slide gives examples only, no definitions. 🔎 Formal definitions of internal/external, stable and adaptive (and why the slide lists quicksort as "external"): Track B.

### 4.7 Trees and heaps [D09-S4–S10]

- **Full** binary tree: every node has 0 or 2 children. **Complete**: every level is full except possibly the last, which is filled as far left as possible. **Perfect**: both full and complete [D09-S4].
- **Heap** = (1) **heap structure**: T is complete and all leaves are at depth h or h−1; plus (2) the **partial order tree property**: "the key at any node is greater than or equal to the keys at each of its children" (max-heap) [D09-S7].
- Height (log n); a complete tree of height h has at most **2^(h+1) − 1** nodes; "every node is heap in itself"; a descending array is a max-heap, an ascending array is a min-heap [D09-S9, S10].
- Index formulas and the BUILD loop range: §2.8.



---

### 6.4 Index conventions: one table to avoid every off-by-one

| Topic | Base on the slides / sheets | Start values and formulas |
|---|---|---|
| **Heap tables** (D09-S11–S22, A2 Q1) | **0-based**, columns 0 … n−1 | L = 2i + 1, R = 2i + 2, P = ⌈i/2⌉ − 1; leaves ⌊n/2⌋ … n−1; BUILD loop i = ⌊n/2⌋ − 1 downto 0; child index ≥ heap-size → "(X)" |
| Heap **pseudocode** (D09-S10, S15, S21) | 1-based (root A[1]) | L = 2i, R = 2i + 1, P = ⌊i/2⌋; BUILD i = ⌊n/2⌋ downto 1 |
| Insertion sort (D06-S7) | 1-based | j = 2 … n; i = j − 1; stop when i = 0 |
| **PARTITION** (D07-S5, A2 Q2) | **1-based**, columns 1 … n | p = 1, r = n, **i = p − 1 = 0**, j = p … r − 1; final A[i+1] ↔ A[r]; q = i + 1 (0-based table: i = −1, j from 0) |
| **MERGESORT** (D08-S5, A2 Q3) | **1-based** | q = ⌊(p + r)/2⌋; the left half gets the extra element |
| MERGE helpers (D08-S8) | ⚠️ declared L[1..n1], R[1..n2] but filled and read as L[0..n1−1], R[0..n2−1] | i = j = 0; when one list is used up, copy the rest of the other |
| Searches, get_max (D01) | 0-based | E[0 … n−1]; A[i:n] means A[i] … A[n−1] |
| BucketSort (D10-S11) | 0-based | buckets b[0 … m−1], S[0 … n−1] |
| find_Kth_smallest (D11-S6) | 0-based C array | ⚠️ `return A[k]` should be A[k−1] when k counts 1st, 10th, … |



---

### Q6. First PARTITION on 13, 6, 21, 9, 15, 4, 9 (positions 1–7)

| Row | Margin / test | 1 | 2 | 3 | 4 | 5 | 6 | 7 | Action |
|---|---|---|---|---|---|---|---|---|---|
| start | p = 1, r = 7, x = A[7] = 9, i = 0, j from 1 to 6 | 13 | 6 | 21 | 9 | 15 | 4 | 9 | |
| j = 1 | 13 ≤ 9? no |  |  |  |  |  |  |  | nothing (i = 0) |
| j = 2 | 6 ≤ 9? **yes** | **6** | **13** | 21 | 9 | 15 | 4 | 9 | i = 1, exchange A[1] ↔ A[2] |
| j = 3 | 21 ≤ 9? no |  |  |  |  |  |  |  | nothing (i = 1) |
| j = 4 | 9 ≤ 9? **yes** | 6 | **9** | 21 | **13** | 15 | 4 | 9 | i = 2, exchange A[2] ↔ A[4] |
| j = 5 | 15 ≤ 9? no |  |  |  |  |  |  |  | nothing (i = 2) |
| j = 6 | 4 ≤ 9? **yes** | 6 | 9 | **4** | 13 | 15 | **21** | 9 | i = 3, exchange A[3] ↔ A[6] |
| exchange | A[i+1] = A[4] ↔ A[r] = A[7] | 6 | 9 | 4 | **9** | 15 | 21 | **13** | return **q = 4** |

- **Answer: 6, 9, 4, 9, 15, 21, 13, with q = 4** ✅.
  - Left part {6, 9, 4} ≤ 9; right part {15, 21, 13} > 9; pivot 9 in its final place.
  - 6 comparisons (r − p).
  - The next calls would be QUICKSORT(A, 1, 3) and QUICKSORT(A, 5, 7), but the question stops here.
- **(b)** With `A[j] < x`, the 9 at j = 4 is **not** moved left. The result is **6, 4, 9, 9, 15, 13, 21 with q = 3** ✅, a different array and a different q.
  - The class test is **A[j] ≤ x** [D07-S5]: keys equal to the pivot go to the left part.
  - This is exactly why the "A[j] < x" in the A2 sample is a slip (§6.3), even though it was harmless there.

### Q7. Merge sort on 26, 11, 39, 4, 18, 31, 7 (positions 1–7)

```
index:      1    2    3    4   |   5    6    7
start:     26   11   39    4   |  18   31    7        p=1, r=7, q=⌊(1+7)/2⌋=4
divide:   [26   11] [39    4]  |  [18   31] [7]       q=⌊(1+4)/2⌋=2 · q=⌊(5+7)/2⌋=6
divide:   [26] [11] [39]  [4]  |  [18] [31]           q=1, q=3 · q=5
merge:    [11   26] [ 4   39]  |  [18   31]           1 + 1 · 1 comparisons
merge:    [ 4   11   26   39]  |  [ 7   18   31]      3 · 1 comparisons
merge:    [ 4    7   11   18       26   31   39]      6 comparisons
```

Call order (D08-S5):
```
MERGESORT(1,7)  q=4  →  [26, 11, 39, 4] | [18, 31, 7]
  MERGESORT(1,4)  q=2  →  [26, 11] | [39, 4]
    MERGESORT(1,2)  q=1  →  [26] | [11]
    MERGE(1,1,2)  [26] + [11] → [11, 26]   (1 comparison)
    MERGESORT(3,4)  q=3  →  [39] | [4]
    MERGE(3,3,4)  [39] + [4] → [4, 39]   (1 comparison)
  MERGE(1,2,4)  [11, 26] + [4, 39] → [4, 11, 26, 39]   (3 comparisons)
  MERGESORT(5,7)  q=6  →  [18, 31] | [7]
    MERGESORT(5,6)  q=5  →  [18] | [31]
    MERGE(5,5,6)  [18] + [31] → [18, 31]   (1 comparison)
  MERGE(5,6,7)  [18, 31] + [7] → [7, 18, 31]   (1 comparison)
MERGE(1,4,7)  [4, 11, 26, 39] + [7, 18, 31] → [4, 7, 11, 18, 26, 31, 39]   (6 comparisons)
```

Final MERGE(A,1,4,7): L = [4, 11, 26, 39], R = [7, 18, 31], i = j = 0:

| k | Compare | A[k] |
|---|---|---|
| 1 | 4 vs 7 | 4 (L) |
| 2 | 11 vs 7 | 7 (R) |
| 3 | 11 vs 18 | 11 (L) |
| 4 | 26 vs 18 | 18 (R) |
| 5 | 26 vs 31 | 26 (L) |
| 6 | 39 vs 31 | 31 (R) |
| 7 | R used up | 39 |

- **Result 4, 7, 11, 18, 26, 31, 39** ✅: 6 MERGE calls, 13 comparisons in total.
- The odd size gives an uneven 4 | 3 split: the left half gets the extra element because q = ⌊(1+7)/2⌋ = 4.

### Q8. Build Max Heap on 6, 14, 3, 25, 9, 17, 1, 20 (positions 0–7), then two extracts

**(a)** n = 8, so the loop runs i = ⌊8/2⌋ − 1 = **3 down to 0**; the leaves are indexes 4 … 7.

| Row | Margin | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | Right margin / action |
|---|---|---|---|---|---|---|---|---|---|---|
| start | For i → 3 to 0 | 6 | 14 | 3 | 25 | 9 | 17 | 1 | 20 | non-leaf nodes (n/2)−1 = 3 to 0 |
| loop i = 3 | i = 3, L = 7, R = 8(X) |  |  |  |  |  |  |  |  | largest = 3 = i → **exit** |
| loop i = 2 | i = 2, L = 5, R = 6 | 6 | 14 | 17 | 25 | 9 | 3 | 1 | 20 | largest = 5: swap A[2] ↔ A[5] |
| ↳ heapify(5) | i = 5, L = 11(X), R = 12(X) |  |  |  |  |  |  |  |  | largest = 5 = i → **exit** |
| loop i = 1 | i = 1, L = 3, R = 4 | 6 | 25 | 17 | 14 | 9 | 3 | 1 | 20 | largest = 3: swap A[1] ↔ A[3] |
| ↳ heapify(3) | i = 3, L = 7, R = 8(X) | 6 | 25 | 17 | 20 | 9 | 3 | 1 | 14 | largest = 7: swap A[3] ↔ A[7] |
| ↳ heapify(7) | i = 7, L = 15(X), R = 16(X) |  |  |  |  |  |  |  |  | largest = 7 = i → **exit** |
| loop i = 0 | i = 0, L = 1, R = 2 | 25 | 6 | 17 | 20 | 9 | 3 | 1 | 14 | largest = 1: swap A[0] ↔ A[1] |
| ↳ heapify(1) | i = 1, L = 3, R = 4 | 25 | 20 | 17 | 6 | 9 | 3 | 1 | 14 | largest = 3: swap A[1] ↔ A[3] |
| ↳ heapify(3) | i = 3, L = 7, R = 8(X) | 25 | 20 | 17 | 14 | 9 | 3 | 1 | 6 | largest = 7: swap A[3] ↔ A[7] |
| ↳ heapify(7) | i = 7, L = 15(X), R = 16(X) |  |  |  |  |  |  |  |  | largest = 7 = i → **exit** |
| **heap** |  | 25 | 20 | 17 | 14 | 9 | 3 | 1 | 6 | max-heap ✅ |

**(b) Extract #1** (heap-size 8 → 7):

| Row | Margin | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | Action |
|---|---|---|---|---|---|---|---|---|---|---|
| extract | max = 25 | 6 | 20 | 17 | 14 | 9 | 3 | 1 |  | max = 25 out; A[0] ← A[7]; heap-size = 7 |
| heapify(0) | i = 0, L = 1, R = 2 | 20 | 6 | 17 | 14 | 9 | 3 | 1 |  | largest = 1: swap A[0] ↔ A[1] |
| ↳ heapify(1) | i = 1, L = 3, R = 4 | 20 | 14 | 17 | 6 | 9 | 3 | 1 |  | largest = 3: swap A[1] ↔ A[3] |
| ↳ heapify(3) | i = 3, L = 7(X), R = 8(X) |  |  |  |  |  |  |  |  | largest = 3 = i → **exit** |

Returns **25**; heap = **[20, 14, 17, 6, 9, 3, 1]** (heap-size 7) ✅

**(b) Extract #2** (heap-size 7 → 6):

| Row | Margin | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | Action |
|---|---|---|---|---|---|---|---|---|---|---|
| extract | max = 20 | 1 | 14 | 17 | 6 | 9 | 3 |  |  | max = 20 out; A[0] ← A[6]; heap-size = 6 |
| heapify(0) | i = 0, L = 1, R = 2 | 17 | 14 | 1 | 6 | 9 | 3 |  |  | largest = 2: swap A[0] ↔ A[2] |
| ↳ heapify(2) | i = 2, L = 5, R = 6(X) | 17 | 14 | 3 | 6 | 9 | 1 |  |  | largest = 5: swap A[2] ↔ A[5] |
| ↳ heapify(5) | i = 5, L = 11(X), R = 12(X) |  |  |  |  |  |  |  |  | largest = 5 = i → **exit** |

Returns **20**; heap = **[17, 14, 3, 6, 9, 1]** (heap-size 6) ✅

```
heap after (a)                 after extract #1 (returned 25)    after extract #2 (returned 20)
            25                             20                                17
         /      \                       /      \                          /      \
       20        17                   14        17                      14        3
      /  \      /  \                 /  \      /  \                    /  \      /
    14    9    3    1               6    9    3    1                  6    9    1
   /
  6
```

- **Cascades:** at i = 1, the key 14 sinks two levels (index 1 → 3 → 7); at i = 0, the key 6 sinks three levels (0 → 1 → 3 → 7). Each recursive call continues **at the index the value moved to** (compare the "i=3 exit" slip in §6.3).
- **Extract** = return A[0], copy the **last** heap key into A[0], shrink the heap, MAX-HEAPIFY(A, 0) [D09-S15]. The cell after the heap (shown blank) is no longer part of it.
- Validity check ✅: every parent ≥ its children in all three arrays.

### Q9. Radix sort of 612, 85, 437, 302, 95, 147, 760, 18, 432

The maximum is 760, which has 3 digits, so **p = 3 passes** (85 = 085, 95 = 095, 18 = 018).

| Pass | Digit | Non-empty buckets (in placement order) | List after the pass |
|---|---|---|---|
| 1 | ones | 0: 760 · 2: 612, 302, 432 · 5: 85, 95 · 7: 437, 147 · 8: 18 | 760, 612, 302, 432, 85, 95, 437, 147, 18 |
| 2 | tens | 0: 302 · 1: 612, 18 · 3: 432, 437 · 4: 147 · 6: 760 · 8: 85 · 9: 95 | 302, 612, 18, 432, 437, 147, 760, 85, 95 |
| 3 | hundreds | 0: 18, 85, 95 · 1: 147 · 3: 302 · 4: 432, 437 · 6: 612 · 7: 760 | 18, 85, 95, 147, 302, 432, 437, 612, 760 |

- **Result: 18, 85, 95, 147, 302, 432, 437, 612, 760** ✅.
- **Stability decides the answer, for example:**
  - **432 and 437:** in pass 2 both go to bucket 3, and in pass 3 both go to bucket 4. They stay correct only because each pass keeps the order from the earlier passes (432 before 437 since pass 1, as 2 < 7).
  - **18, 85, 95:** they share hundreds digit 0 in pass 3 and come out in pass-2 order.
  - An unstable pass could output 437 before 432 [D10-S23].
- Cost: p·O(n) = O(pn) [D10-S24].

