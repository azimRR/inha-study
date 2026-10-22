# CLASS material - heap sort extracts from the midterm review

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



---

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

