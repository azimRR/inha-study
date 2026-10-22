# CLASS material - notes, weeks 4-5


---

<!-- FILE: Week 4-5 - Heap sort, bucket sort, radix sort - class notes.md -->

# Weeks 4–5 — Heap sort, bucket sort, radix sort (CLASS NOTES — from slides only)

> Sources: [D09-S#] = deck "09 - Heap sort" (24 slides) · [D10-S#] = deck "10 - bucket n radix sort" (31 slides) · Assignment 2 [A2] = "Assignment 2 – Sorting – Fall 2026" plus the professor's "SAMPLE SOLUTION". Two cross-references to other class decks are used: [D03-S12] (asymptotic notation) and [D06-S3] (sorting classification).
>
> **Track A only.** Everything here comes from the slides and the professor's assignment and solution. Anything the slides do not explain is marked 🔎 *Look up in Track B*.
> Legend: ⭐ emphasised on the slide or likely on the exam · ⚠️ typo, error or inconsistency on the slide · 🔎 pointer to Track B.
>
> Exam: SOC3030-003 midterm, week 8 (24–30 Oct 2026), 25 %, covers weeks 1–7.
>
> **Verification:** every trace below was re-run in Python with a line-by-line transcription of the slide pseudocode. It was run once literally (1-based: `l=2i`, `r=2i+1`, root `A[1]`) and once in the 0-based form that the slide tables use (`l=2i+1`, `r=2i+2`, root `A[0]`). Both versions give identical arrays on every example.

---

## 1. Big picture

- ⭐ A **heap** has two properties. Its **shape** is a complete binary tree with all leaves at depth h or h−1. Its **order** is the partial order tree property: in a max-heap every key ≥ its children's keys [D09-S7]. It is stored in a plain array, and parent/child positions are found with index formulas [D09-S9].
- ⭐ Three heap procedures do all the work [D09-S10, S15, S17]:
  - **MAX-HEAPIFY(A,i)** sinks one key down until it is ≥ both children. It costs O(log n).
  - **BUILD-MAX-HEAP** calls MAX-HEAPIFY on every non-leaf, from the last one up to the root. It costs O(n).
  - **HEAP-EXTRACT-MAX** removes the root, moves the last key to the root and re-heapifies. It costs O(log n).
- ⭐ **HEAP-SORT** = BUILD-MAX-HEAP, then n−1 rounds of: swap the root with the last heap cell, shrink the heap, MAX-HEAPIFY the root [D09-S21]. The maximum is parked at the right end each round, so the array ends up in **ascending** order. It runs in O(n log n) [D09-S21] and needs O(1) extra space [D10-S4].
- ⭐ **Index trap.** The pseudocode is **1-based**, but every worked table in class and in A2 is **0-based** (columns 0…n−1, loop "i → 2 to 0") [D09-S9, S10, S13, S22; A2].
- A comparison-based sort cannot beat n log n [D10-S5]. To go faster the input must be **restricted** (a limited range of values), and the sort must avoid comparisons [D10-S6].
- ⭐ **Bucket sort**: when the values lie in 0…m−1, each value is used as a bucket index. Count (or enqueue) the values, then output the buckets in order. It costs O(n + m), which is O(n) when m is small compared with n [D10-S7, S11, S13]. When m >>> n (for example a maximum of 999999) it becomes O(m) [D10-S16].
- ⭐ **Radix sort**: repeated bucket sorts, one per digit, starting from the **rightmost** (least significant) digit. It needs only 10 buckets, and p passes where p is the number of digits of the maximum value. It costs O(pn) [D10-S17, S18, S24].
- ⭐ Radix sort works **only if every pass is stable**, meaning ties keep their previous order [D10-S23]. It can also sort **words**: one pass per character position and 27 buckets. The class convention is to read right→left, pad blanks at the end and keep the blank bucket **last** [D10-S25, S29].
- Exam signal: A2 Q1 is exactly "convert this sequence to a heap using Build Max Heap" on a 0-based table, so expect a build-heap trace. The slides also drill extract-max, heap-sort iterations, radix passes and the complexity tables.

---

## 2. Slide-by-slide notes

### Deck 09 — "Heap and Heapsort" (24 slides)

> ⭐ **Read this first.** In deck 09 the **pseudocode is 1-based**: root `A[1]`, `l=2i`, `r=2i+1`. **Every worked table is 0-based**: root `A[0]`, `l=2i+1`, `r=2i+2`. The slides give both formula sets [D09-S9] and both loop ranges [D09-S10]. All traces in these notes use 0-based indexes, matching the slides and A2.

### [D09-S1] Heap and Heapsort (title slide)
- Title only.

### [D09-S2] Performance of certain operations with different data structure (blank table)
- An empty table used as a "think first" prompt. Its rows are unsorted array, sorted array, unsorted linked list and Heap(Min). Its columns are Insert, Search, Find Minimum and Delete (Min).
- Try to fill it in yourself before looking at S3.

### [D09-S3] Performance of certain operations … (filled table)

| Structure | Insert | Search | Find Minimum | Delete (Min) |
|---|---|---|---|---|
| Unsorted array | O(1) | O(n) | O(n) | O(n) |
| Sorted array | O(n) | O(log n) | O(1) | O(n) |
| Unsorted linked list | O(1) | O(n) | O(n) | O(n) |
| Heap (Min) | O(log n) | O(log n) | O(1) | O(1) |

- ⚠️ **Typo.** Every entry is typed with the digit zero, as "0(1)" and "0(n)", instead of the letter O.
- ⚠️ **Inconsistency.** Heap(Min) "Delete (Min) = O(1)" disagrees with the deck itself. Deleting the root is what HEAP-EXTRACT-MAX does (the max-heap mirror image). It calls MAX-HEAPIFY, and [D09-S17] states its cost as **O(log n)**. If asked to reproduce this table, write the slide's values. If asked for the cost of extracting the root, use O(log n) from S17.
- ⚠️/🔎 Heap(Min) "Search = O(log n)" is not supported anywhere in the deck. The partial order property [D09-S7] only compares a node with its own children; it gives no left/right ordering, and no heap-search procedure is taught. 🔎 Look up in Track B: the cost of searching for an arbitrary key in a heap.
- "Find Minimum = O(1)" for a min-heap fits the deck: the extreme key sits at the root, just as HEAP-EXTRACT-MAX reads the maximum straight from `A[1]` [D09-S15].

### [D09-S4] Full, complete and perfect binary trees
- Binary trees can be categorised by structural properties:
  - **Full binary tree.** Every node has **either zero or two children** (red on the slide). No node has exactly one child, and every internal node has exactly two children.
  - **Complete binary tree.** Every level is completely filled **except possibly the last**. On the last level **all nodes must be as far left as possible** (red on the slide), with no gaps from left to right.
  - **Perfect binary tree.** It is **both full and complete** (red on the slide). All internal nodes have two children and all leaves are at the same depth, so every level is completely filled.
- The figure numbers nodes in level order:

```text
  full binary tree      complete binary tree      perfect binary tree
         0                       0                         0
        / \                     / \                     /     \
       1   2                   1   2                   1       2
      / \                     / \  /                  / \     / \
     3   4                   3   4 5                 3   4   5   6
```

- Notes drawn from the definitions above:
  - The "full" picture also happens to be complete, because its last level (3, 4) is packed to the left.
  - The "complete" picture is **not** full, because node 2 has only one child (5).
- ⭐ The level-order numbers are exactly the **0-based array indexes** of [D09-S9]. The children of 1 are 3 = 2·1+1 and 4 = 2·1+2; the children of 2 are 5 and 6.

### [D09-S5] Quiz: classify trees A, B, C, D
- The three reference trees are shown again, with four unlabelled trees A–D. The task is to decide whether each one is full and/or complete. The answers are on S6.

### [D09-S6] Answers to the S5 quiz

```text
A: Neither complete nor full        B: Complete but not full
            o                                   o
        /       \                           /       \
      o           o                       o           o
    /   \       /   \                   /   \       /   \
   o     o     o     o                 o     o     o     o
  /           / \                     /
 o           o   o                   o

C: Full but not complete            D: Complete and full
            o                                   o
        /       \                           /       \
      o           o                       o           o
    /   \       /   \                   /   \       /   \
   o     o     o     o                 o     o     o     o
  / \         / \                     / \
 o   o       o   o                   o   o
```

- **A**: one node has a single child, so it is not full. The bottom level has a gap, with nodes further right after a missing position, so it is not complete.
- **B**: the bottom level is packed to the left, so it is complete. One node has a single child, so it is not full.
- **C**: every node has 0 or 2 children, so it is full. The bottom level has a gap in the middle, so it is not complete.
- **D**: every node has 0 or 2 children and the bottom level is packed to the left, so it is both complete and full.

### [D09-S7] Heap — definitions ⭐
- A heap is a binary tree with two special properties: (1) **heap structure** and (2) **partial order tree property**.
- **Heap structure.** "A binary tree T is a heap structure if and only if it satisfies the following conditions: (h = height of the tree) 1. T is complete 2. All leaves are at depth h or h–1".
- **Partial order tree property.** "A tree T is a (maximizing) partial order tree if and only if the key at any node is greater than or equal to the keys at each of its children (if it has any)".
- The slide defines only the **maximizing** version (max-heap). The "Heap(Min)" / "Min-Heap" mentioned on S3, S10 and S19 is the mirror image, with each key ≤ its children's keys; the slides never define it formally.

### [D09-S8] e.g. Heaps (or not)

```text
(a) "A 2-tree"            (b) "A complete binary tree" (15 nodes)
        o                                o
      /   \                        /           \
     o     o                    o                 o
    / \                       /   \             /   \
   o   o                     o     o           o     o
      / \                   / \   / \         / \   / \
     o   o                 o   o o   o       o   o o   o

(c) Heap 1                (d) Heap 2
      9                         50
    /   \                    /       \
  5       7             24              30
 / \     / \           /   \           /   \
1   4   3   6       20      21      18       3
                    / \     /
                  12   5   6
```

- (a) Every node has 0 or 2 children, which is the S4 "full" shape and is what "2-tree" means here. It is **not** a heap structure: it is not complete, and its leaves are at depths 1, 2 and 3. With h = 3, the leaf at depth 1 breaks "all leaves at depth h or h−1".
- (b) All levels are full, so this is a valid heap structure (no keys are shown). By S4 it is also perfect.
- (c) **Heap 1**, array `[9, 5, 7, 1, 4, 3, 6]`. Every parent ≥ its children (verified).
- (d) **Heap 2**, array `[50, 24, 30, 20, 21, 18, 3, 12, 5, 6]`. It is a valid max-heap (verified), and the same heap is reused on [D09-S20].
- Siblings are **not** ordered: 24 < 30, but 18 > 3. Only the parent-versus-child relation matters.

### [D09-S9] Some Properties ⭐
- "Height of binary tree (log n)". Examples: the S11 tree has 7 nodes and height 2; Heap 2 has 10 nodes and height 3.
- "Max. number of nodes in complete binary tree of height h is (2^(h+1) – 1)". So h = 2 gives 7 (the S11 tree) and h = 3 gives 15 (S8 (b)).
- Leaves are consecutive and occupy indexes **floor(n/2)+1 … n** when indexing starts at 1. For 0-based indexing the slide writes "[floor(n/2) to n]".
  - ⚠️ With 0-based indexes the last index is n−1, so the leaf range is **floor(n/2) … n−1**. Example from S11 (n = 7): the leaves are at indexes 3, 4, 5 and 6 (values 1, 3, 5, 7).
- "Every node is heap in itself": a lone node trivially satisfies the heap property. This is why BUILD-MAX-HEAP never calls MAX-HEAPIFY on the leaves; it starts at the last non-leaf [D09-S10].
- ⭐ **Array formulas:**

| | 1-based (root = A[1]) | 0-based (root = A[0]) — "If index starts with 0" |
|---|---|---|
| Left child | `2*index` | `2*index + 1` |
| Right child | `2*index + 1` | `2*index + 2` |
| Parent | `floor(index/2)` | `ceil(index/2) - 1` |

- Check of the 0-based parent formula: indexes 1 and 2 give 0, indexes 3 and 4 give 1, and indexes 5 and 6 give 2. This matches the level-order labels on S4.

### [D09-S10] BUILD-MAX-HEAP and MAX-HEAPIFY ⭐
```text
BUILD-MAX-HEAP(A)
{
    A.heap-size= A.length
    for(i=floor(A.length/2) downto 1*)
        MAX-HEAPIFY(A,i)
}

MAX-HEAPIFY(A,i)
{
    l=2i
    r=2i+1
    If(l<=A.heap-size and A[l]>A[i])
        largest=l
    else largest = i
    If(r<=A.heap-size and A[r]>A[largest])
        largest=r
    If(largest<>i)
        Exchange A[i] with A[largest]
        MAX-HEAPIFY(A,largest)
}
```
- The footnote for the `*` reads: "i=floor(A.length/2) downto 1*) OR i=floor(A.length/2)-1 downto 0*)". The first range is for 1-based arrays and the second for 0-based arrays.
- `<>` means "not equal".
- MAX-HEAPIFY in plain words:
  1. Look at A[i] and whichever of its two children exist.
  2. Find the largest of these (up to three) keys.
  3. If a child is largest, swap it up and repeat from that child's position.
  4. Stop when the parent is the largest, or when the node has no children inside the heap.
- The figure shows the tree 4 / 2, 6 / 1, 3, 5, 7, which is the running example of S11 and S13.
- Box at the bottom of the slide:
  - "An array with descending Order (complete tree) is Max-Heap".
  - "An array with ascending Order (complete tree) is Min-Heap".
  - "=> Sorting cost is **n log n**".
- ⚠️ **Index trap.** The pseudocode's `l=2i, r=2i+1` are the 1-based formulas, but all worked tables (S11–S15, S22 and A2) are 0-based. Their `l, r` labels use the S9 box formulas: on S13, i=2 gives "l=5, r=6", and i=4 gives "l=9, r=10 (X)". In a 0-based exam table:
  - use `l = 2i+1` and `r = 2i+2`;
  - loop `i = floor(n/2)−1 downto 0`;
  - a child counts only if its index is inside the heap (index ≤ heap-size−1). The slides mark children outside the heap with "(X)".
- ⚠️ **Placement of the recursive call.** `MAX-HEAPIFY(A,largest)` belongs **inside** the `If(largest<>i)` block, together with the exchange. On S10 and S17 it carries a stray bullet "•", and on S11 it is printed at the outer indentation. If it ran when `largest = i`, it would call itself on the same node forever. The slide traces stop ("Exit-heapify") as soon as no swap happens.

### [D09-S11] MAX-HEAPIFY example — "Heapify (A,0) = ?"
- Input (0-based): `[4, 2, 6, 1, 3, 5, 7]`. The slide's answer is `[6, 2, 7, 1, 3, 5, 4]`.
- The slide's STEPS table has four rows:

| row | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| start | 4 | 2 | 6 | 1 | 3 | 5 | 7 |
| swap 0↔2 | 6 | | 4 | | | | |
| swap 2↔6 | | | 7 | | | | 4 |
| result | 6 | 2 | 7 | 1 | 3 | 5 | 4 |

- Walk-through:
  - i=0: l=1 holds 2 and r=2 holds 6, so largest = 2. Swap A[0]↔A[2].
  - i=2: l=5 holds 5 and r=6 holds 7, so largest = 6. Swap A[2]↔A[6].
  - i=6: l=13 and r=14 are outside the heap (X), so stop.

```text
start                     swap 0<->2                swap 2<->6
[4, 2, 6, 1, 3, 5, 7]     [6, 2, 4, 1, 3, 5, 7]     [6, 2, 7, 1, 3, 5, 4]

      4                         6                         6
    /   \                     /   \                     /   \
  2       6                 2       4                 2       7
 / \     / \               / \     / \               / \     / \
1   3   5   7             1   3   5   7             1   3   5   4
```

- ⭐ **Key observation.** The result is **not** a max-heap, because 7 at index 2 is larger than its parent 6. One MAX-HEAPIFY call repairs only the path it walks down, from the root to index 6. This is why BUILD-MAX-HEAP works **bottom-up** (S13): by the time a node is heapified, every node below it has already been processed. 🔎 Look up in Track B: the formal precondition of MAX-HEAPIFY.

### [D09-S12] Exercise — Heapify (A,0) on a new array
- Input: `[16, 46, 15, 18, 17, 22, 19]`, with a blank STEPS table to fill in. The slide gives no answer.
- **Verified answer:** `[46, 18, 15, 16, 17, 22, 19]`.
  - i=0: l=1 holds 46 and r=2 holds 15, so largest = 1. Swap A[0]↔A[1].
  - i=1: l=3 holds 18 and r=4 holds 17, so largest = 3. Swap A[1]↔A[3].
  - i=3: l=7 and r=8 are (X), so stop.

```text
start                            swap 0<->1                       swap 1<->3
[16, 46, 15, 18, 17, 22, 19]     [46, 16, 15, 18, 17, 22, 19]     [46, 18, 15, 16, 17, 22, 19]

      16                               46                               46
     /   \                            /   \                            /   \
  46      15                       16      15                       18      15
  / \     / \                      / \     / \                      / \     / \
18  17  22  19                   18  17  22  19                   16  17  22  19
```

- The result is again **not** a heap, because 22 and 19 sit below 15. Compare it with S14, where BUILD-MAX-HEAP fixes this.

### [D09-S13] BUILD-MAX-HEAP trace — "i → 2 to 0" ⭐
- Input: `[4, 2, 6, 1, 3, 5, 7]`, n = 7. The 0-based loop runs i = floor(7/2)−1 = 2, then 1, then 0.
- What the slide's table shows:
  - **i=2**: Heapify(A,2) with l=5, r=6. Swap A[2]↔A[6], giving `[4,2,7,1,3,5,6]`. Then Heapify(A,6) exits.
  - **i=1**: Heapify(A,1) with l=3, r=4. Swap A[1]↔A[4], giving `[4,3,7,1,2,5,6]`. Then Heapify(A,4) has l=9, r=10 (X) and exits.
  - **i=0**: Heapify(A,0) with l=1, r=2. Swap A[0]↔A[2], giving `[7,3,4,1,2,5,6]`. Then Heapify(A,2) with l=5, r=6: swap A[2]↔A[6], giving `[7,3,6,1,2,5,4]`. Then Heapify(A,6) exits.

```text
start                     i=2: swap 2<->6           i=1: swap 1<->4
[4, 2, 6, 1, 3, 5, 7]     [4, 2, 7, 1, 3, 5, 6]     [4, 3, 7, 1, 2, 5, 6]

      4                         4                         4
    /   \                     /   \                     /   \
  2       6                 2       7                 3       7
 / \     / \               / \     / \               / \     / \
1   3   5   7             1   3   5   6             1   2   5   6

i=0: swap 0<->2           i=0: swap 2<->6  (final max-heap)
[7, 3, 4, 1, 2, 5, 6]     [7, 3, 6, 1, 2, 5, 4]

      7                         7
    /   \                     /   \
  3       4                 3       6
 / \     / \               / \     / \
1   2   5   6             1   2   5   4
```

- **Result: `[7, 3, 6, 1, 2, 5, 4]`**, a valid max-heap (verified). At i=0, key 4 sinks two levels (index 0 → 2 → 6).
- ⚠️ **Label slip.** The last label on the slide reads "Exit-heapify(A,4)". It should read "Exit-heapify(A,6)": after swapping A[2]↔A[6], the recursive call is Heapify(A,6), and it exits because l=13 and r=14 are out of range.

### [D09-S14] Exercise — BUILD-MAX-HEAP on `[16, 46, 15, 18, 17, 22, 19]`
- The slide gives a blank table ("i → 2 to 0") and the tree. No answer is given.
- **Verified answer:** `[46, 18, 22, 16, 17, 15, 19]`.
  - i=2: l=5 holds 22 and r=6 holds 19, so largest = 5. Swap A[2]↔A[5].
  - i=1: 46 ≥ 18 and 46 ≥ 17, so no swap.
  - i=0: largest = 1 (46). Swap A[0]↔A[1]. Then at index 1, largest = 3 (18). Swap A[1]↔A[3].

```text
start                            i=2: swap 2<->5                  i=1: no swap
[16, 46, 15, 18, 17, 22, 19]     [16, 46, 22, 18, 17, 15, 19]     [16, 46, 22, 18, 17, 15, 19]

      16                               16                               16
     /   \                            /   \                            /   \
  46      15                       46      22                       46      22
  / \     / \                      / \     / \                      / \     / \
18  17  22  19                   18  17  15  19                   18  17  15  19

i=0: swap 0<->1                  i=0: swap 1<->3  (final max-heap)
[46, 16, 22, 18, 17, 15, 19]     [46, 18, 22, 16, 17, 15, 19]

      46                               46
     /   \                            /   \
  16      22                       18      22
  / \     / \                      / \     / \
18  17  15  19                   16  17  15  19
```

### [D09-S15] Heap-Extract-Max ⭐
```text
Heap-Extract-Max(A)
{
    If A.heap-size < 1
        error " heap underflow"
    max=A[1]
    A[1]=A[A.heap-size]
    A.heap-size=A.heap-size-1
    MAX-HEAPIFY(A,1)
    return max
}
```
- Trace on the S13 heap `[7, 3, 6, 1, 2, 5, 4]`, 0-based:
  1. **max = 7** is removed (red cell on the slide).
  2. The last key, 4 at index 6 (red ✗), is copied into the root, and heap-size goes from 7 to 6.
  3. Heapify(0): l=1 holds 3 and r=2 holds 6, so largest = 2. Swap 0↔2.
  4. Heapify(2): l=5 holds 5, and r=6 is now **outside** the heap. Since 5 > 4, swap 2↔5.
  5. Heapify(5) exits.
- The result (green row) is `[6, 3, 5, 1, 2, 4]` and the procedure **returns 7**. Index 6 is left blank on the slide because it is no longer part of the heap.

```text
start heap                #1: max=7 out, A[0]=A[6]     #1: swap 0<->2         #1: swap 2<->5
[7, 3, 6, 1, 2, 5, 4]     [4, 3, 6, 1, 2, 5]           [6, 3, 4, 1, 2, 5]     [6, 3, 5, 1, 2, 4]

      7                         4                            6                      6
    /   \                     /   \                        /   \                  /   \
  3       6                 3       6                    3       4              3       5
 / \     / \               / \     /                    / \     /              / \     /
1   2   5   4             1   2   5                    1   2   5              1   2   4
```

- 0-based reading of the pseudocode: `max = A[0]` and `A[0] = A[heap-size − 1]`, then shrink the heap and call MAX-HEAPIFY(A,0).
- "heap underflow" is the error raised when the heap is empty (heap-size < 1).

### [D09-S16] Complexity Analysis (heading)
- This slide lists the three procedures that S17 analyses: Max-Heapify, Heap-Extract-Max and Build_Heap.

### [D09-S17] Performance Analysis ⭐
- Statements on the slide, quoted:
  - "Max-Heapify takes O(log n)"
  - "Heap-Extract-Max running time is O(log n)"
  - "The running time of Build_Heap is O(n)"
  - "Number of at most node with height h: ceil(n/2^(h+1))"
  - "Time taken by any Max-Heapify at any node is O(h)"
- The three pseudocode boxes from S10 and S15 are repeated on this slide. The BUILD box here has "downto 1" without the asterisk.
- What the statements mean:
  - **Max-Heapify, O(log n).** Each recursive call moves one level down. The cost at a node of height h is therefore O(h), and the root's height is about log n (S9).
  - **Heap-Extract-Max, O(log n).** It does a constant amount of work plus one MAX-HEAPIFY from the root.
  - **Build_Heap, O(n) rather than O(n log n).** Most nodes are near the bottom, where h is small, and only a few nodes are high up. The slide combines the two bullets (at most ceil(n/2^(h+1)) nodes of height h, each costing O(h)) into O(n).
- Check of the node-count bound on the S11 tree (n = 7):
  - height 0 (leaves): 4 nodes, and ceil(7/2) = 4;
  - height 1: 2 nodes, and ceil(7/4) = 2;
  - height 2 (root): 1 node, and ceil(7/8) = 1.
- 🔎 Look up in Track B: how the sum of ceil(n/2^(h+1))·O(h) over all heights evaluates to O(n). The summation is not worked on the slides.

### [D09-S18] Heap sort (section title)
- Section title only.

### [D09-S19] Heapsort Strategy
- The elements to sort are first arranged in a heap.
- Using this heap, a sorted sequence is built in **reverse order** by repeatedly removing the root element…
- …and then re-arranging the remaining elements to restore the partial order tree property, and so on.
- "How does it work? (Max-Heapify / Build-Max-Heap / Heap-Extract-Max)".
- Note (verbatim): "Ascending and descending will always be min and max heap respectively".
- ⚠️ Read this note together with S10: an array sorted in **ascending** order is a **min-heap**, and one sorted in **descending** order is a **max-heap**. Do **not** read it as "use a min-heap to sort ascending". The class HEAP-SORT (S21–S22) uses **BUILD-MAX-HEAP** and still outputs ascending order (`[3, 7, 8, 12, 21, 23]`). The largest key is removed first ("reverse order") and parked at the right end of the array.

### [D09-S20] Heapsort in action (one root removal on Heap 2, "vacant" method)
- The figure shows five stages:
  - (a) The heap.
  - (b) The root key has been removed, and the rightmost leaf at the bottom level has been removed. **K = 6 must be reinserted.**
  - (c) The larger child of the vacant spot, 30, is greater than K, so it moves up and the vacant spot moves down.
  - (d) The larger child of the vacant spot, 18, is greater than K, so it moves up and the vacant spot moves down.
  - (e) The vacant spot is now a leaf, so K = 6 is inserted there.

```text
(a) the heap                     (b) 50 removed; K=6 taken
                                     from the last leaf

              50                               __
           /       \                        /       \
      24              30               24              30
     /   \           /   \            /   \           /   \
  20      21      18       3       20      21      18       3
  / \     /                        / \
12   5   6                       12   5

(c) 30 > K: moves up             (d) 18 > K: moves up             (e) vacant is a leaf: K=6 inserted

              30                               30                               30
           /       \                        /       \                        /       \
      24              __               24              18               24              18
     /   \           /   \            /   \           /   \            /   \           /   \
  20      21      18       3       20      21      __       3       20      21       6       3
  / \                              / \                              / \
12   5                           12   5                           12   5
```

- **Verified:** this gives exactly the same result as HEAP-EXTRACT-MAX with MAX-HEAPIFY:
  `[50,24,30,20,21,18,3,12,5,6]` becomes `[30,24,18,20,21,6,3,12,5]`.
- The "vacant moves down" description is the same path as MAX-HEAPIFY's swaps (the larger child moves up each time). Here it is described as moving a hole instead of swapping K at every level.

### [D09-S21] HEAP-SORT ⭐
```text
HEAP-SORT(A)
    BUILD-MAX-HEAP(A)
    For I ← length [A] down to 2
        Do exchange A[1] ↔ A [i]
            Heap-size[A] ← heap-size[A]-1
            MAX-HEAPIFY(A,1)
```
- ⚠️ **Glyph loss.** On the slide the exchange arrow "↔" and the second "←" show as empty boxes "□". The loop variable is written "I" in the `For` line but "i" in the body; both mean the same variable.
- Complexity as stated on the slide:
  - "The running time of Build_Heap is O(n)".
  - "Max-Heapify takes O(log n) (heapify to apply n-1 times)".
  - "Therefore running time is **O(n log n)**".
- 0-based form, as used in the S22 table: for i = n−1 down to 1, exchange A[0] ↔ A[i], decrease heap-size by 1, then call MAX-HEAPIFY(A,0).
- Difference from HEAP-EXTRACT-MAX:
  - Extract **copies** the last key into the root and returns the max.
  - HEAP-SORT **exchanges** the root with the last heap cell, so the max is stored at the end of the array. This is what produces the sorted array in place.

### [D09-S22] Full HEAP-SORT trace on `[12, 7, 8, 23, 3, 21]` ⭐
- The slide has two tables, "Build Max heap" (i → 2 to 0) and "Heap-Sort" (It-1 … It-5). Yellow cells are the sorted part, which grows from the right.
- **Build phase:**
  - i=2: l=5 holds 21, and r=6 is out of range. Swap 2↔5, giving `[12,7,21,23,3,8]`.
  - i=1: l=3 holds 23 and r=4 holds 3. Swap 1↔3, giving `[12,23,21,7,3,8]`.
  - i=0: l=1 holds 23 and r=2 holds 21. Swap 0↔1, giving `[23,12,21,7,3,8]`. At index 1, 12 ≥ 7 and 12 ≥ 3, so it exits.

```text
start                     i=2: swap 2<->5           i=1: swap 1<->3           i=0: swap 0<->1 (heap built)
[12, 7, 8, 23, 3, 21]     [12, 7, 21, 23, 3, 8]     [12, 23, 21, 7, 3, 8]     [23, 12, 21, 7, 3, 8]

      12                        12                       12                        23
     /   \                     /   \                    /   \                     /   \
   7       8                 7      21               23      21                12      21
  / \     /                 / \     /                / \     /                 / \     /
23   3  21                23   3   8                7   3   8                 7   3   8
```

- ⚠️ **Confusing label.** In the slide's build table, the inner row labelled "for i→1" inside the i=0 block is **not** a new loop iteration. It is the recursive MAX-HEAPIFY(A,1) call that follows the swap 0↔1. The loop visits i = 2, 1 and 0 once each.
- **Sort phase.** Each iteration has two parts: exchange the root with the last heap cell, then heapify the root. In the trees below, `|` separates the heap from the sorted part.

```text
It-1: exch 0<->5           It-1: swap 0<->2           It-2: exch 0<->4
[8, 12, 21, 7, 3 | 23]     [21, 12, 8, 7, 3 | 23]     [3, 12, 8, 7 | 21, 23]

      8                         21                          3
    /   \                      /   \                      /   \
 12      21                 12       8                 12       8
 / \                        / \                        /
7   3                      7   3                      7

It-2: swap 0<->1           It-2: swap 1<->3           It-3: exch 0<->3
[12, 3, 8, 7 | 21, 23]     [12, 7, 8, 3 | 21, 23]     [3, 7, 8 | 12, 21, 23]

     12                         12                      3
    /   \                      /   \                   / \
  3       8                  7       8                7   8
 /                          /
7                          3

It-3: swap 0<->2           It-4: exch 0<->2           It-4: swap 0<->1
[8, 7, 3 | 12, 21, 23]     [3, 7 | 8, 12, 21, 23]     [7, 3 | 8, 12, 21, 23]

  8                          3                          7
 / \                        /                          /
7   3                      7                          3

It-5: exch 0<->1  -> heap of size 1, nothing to heapify
[3 | 7, 8, 12, 21, 23]   =>  final [3, 7, 8, 12, 21, 23]
```

- **Final: `[3, 7, 8, 12, 21, 23]`.** Every array in the slide's right-hand table matches the verified run row for row. The exam-format table is in §5, T7.

### [D09-S23] (blank slide)
- No content. The original .pptx is also empty for this slide.

### [D09-S24] Video Lecture of the topic can be found at
The professor's links:
- Heap – Introduction: https://www.youtube.com/watch?v=phYfC_NqfHQ
- Illustrative Example of MaxHeapify, BuildMax and ExtractMax Procedures: https://www.youtube.com/watch?v=iCQO2OP1_TI&t=5s
- Build Max Heapify ExtractMax Analysis: https://www.youtube.com/watch?v=qcoqre-JHQU
- HeapSort Strategy and Complexity Analysis: https://youtu.be/jCKWkFTZwCk
- Understanding HeapSort with an Illustrative Example: https://youtu.be/_UZ1gf0M0GM

This fifth link is cut off below the visible area of the slide image, but it is present in the original .pptx.

---

### Deck 10 — "Bucket Sort and Radix Sort" (31 slides)

> The footers "10/02/05" and "2026-10-19" on every slide are template dates; ignore them.

### [D10-S1] Bucket Sort and Radix Sort (title slide)
- Title only.

### [D10-S2] Bucket Sort (section title)
- Section title only.

### [D10-S3] Time Complexity comparison of Sorting Algorithms ⭐

| Algorithm (data structure: Array) | Best | Average | Worst | Space |
|---|---|---|---|---|
| Quicksort | O(n log(n)) | O(n log(n)) | O(n^2) | O(n)/O(log n) |
| Mergesort | O(n log(n)) | O(n log(n)) | O(n log(n)) | O(n) |
| Heapsort | O(n log(n)) | O(n log(n)) | O(n log(n)) | O(1) |
| Bubble Sort | O(n) | O(n^2) | O(n^2) | O(1) |
| Insertion Sort | O(n) | O(n^2) | O(n^2) | O(1) |
| Select Sort | O(n^2) | O(n^2) | O(n^2) | O(1) |
| Bucket Sort | O(n+k) | O(n+k) | O(n^2) | O(nk) |
| Radix Sort | O(nk) | O(nk) | O(nk) | O(n+k) |

- ⭐ Heapsort is the only O(n log n) algorithm in the table whose **worst** case is also O(n log n) **and** whose space is O(1).
- ⚠️ **Typo.** The Quicksort space entry is written "O(n)/0(logn)", with a digit zero instead of the letter O.
- ⚠️ **Undefined symbol.** k is not defined on this slide. Later slides write bucket sort as O(n+m), with m = range / number of buckets [D10-S13], and radix sort as O(pn), with p = number of digits [D10-S24]. The table's O(n+k) and O(nk) match these if k is read as m and p respectively.
- 🔎 Look up in Track B: what k means in these entries, and why bucket sort's worst case is listed as O(n²). The deck's own analysis of the integer version [D10-S13] only derives O(n+m).

### [D10-S4] Space Complexity comparison of Sorting Algorithms

| Algorithm | Worst Case Auxiliary Space Complexity |
|---|---|
| Quicksort | O(n) |
| Mergesort | O(n) |
| Heapsort | O(1) |
| Bubble / Insertion / Select Sort | O(1) |
| Bucket Sort | O(nk) |
| Radix Sort | O(n+k) |

- Heapsort's O(1) fits the S22 trace in deck 09, where everything happens inside the one array.
- In the same vein, [D06-S3] calls all the non-comparison techniques "outplaced" (not in-place).

### [D10-S5] Time complexity of Sorting
- The best algorithms discussed so far are heap sort and merge sort, which are O(n log n). Quick sort is called the "best one in practice": O(n log n) on average, O(n²) in the worst case.
- **Can we do better than O(n log n)? No.** "Any comparison-based sorting algorithm will need at least O( n log n ) operations".
- ⚠️ **Notation.** "At least O(…)" mixes notations. A lower bound is what Ω expresses in the class's asymptotic-notation deck ([D03-S12]: Ω gives an asymptotic lower bound).
- 🔎 Look up in Track B: the proof of the comparison-sort lower bound. It is not on the slides.

### [D10-S6] Restrictions on the problem
- Suppose the values to sort **can repeat** but **have a limit** (underlined on the slide), for example digits 0–9. Then sorting can be made more efficient.
- Is an algorithm better than O(n log n) possible? **Yes**, and the strategy will **not involve comparisons**.
- [D06-S3] lists bucket sort, radix sort and counting sort as non-comparison-based sorts.
- 🔎 Look up in Track B: counting sort. [D06-S3] names it, but deck 10 never teaches it under that name. The S11 bucket sort does count values ("each bucket is just a counter", S12).

### [D10-S7] Bucket sort — idea ⭐
- Suppose the values are in the range **0..m−1**. Then:
  1. Start with **m empty buckets** numbered 0 to m−1.
  2. Scan the list and place element s[i] **in bucket s[i]**.
  3. Output the buckets in order.
- This needs an array of buckets, and "the values in the list to be sorted will be the indexes to the buckets" (underlined on the slide).
- **No comparisons** are necessary.

### [D10-S8] Example (input and output)
- Input: `4 2 1 2 0 3 2 1 4 0 2 3 0` (n = 13). Output: `0 0 0 1 1 2 2 2 2 3 3 4 4`.
- The middle box is empty in this view; the bucket contents appear on S10.

### [D10-S9] Example (empty buckets)
- Five empty buckets labelled 0, 1, 2, 3 and 4, captioned "Bucket with indices same as input range". So m = 5.

### [D10-S10] Example (filled buckets)
```text
input : 4 2 1 2 0 3 2 1 4 0 2 3 0        (n = 13, m = 5)

bucket 0 | 0 0 0
bucket 1 | 1 1
bucket 2 | 2 2 2 2
bucket 3 | 3 3
bucket 4 | 4 4

output: 0 0 0 1 1 2 2 2 2 3 3 4 4        (read buckets 0 -> 4)
```

### [D10-S11] Bucket sort algorithm ⭐
```text
Algorithm BucketSort( S )
( values in S are between 0 and m-1 )

for j ← 0 to m-1 do              // initialize m buckets
    b[j] ← 0

for i ← 0 to n-1 do              // place elements in their
    b[S[i]] ← b[S[i]] + 1        // appropriate buckets

i ← 0
for j ← 0 to m-1 do              // place elements in buckets
    for r ← 1 to b[j] do         // back in S
        S[i] ← j
        i ← i + 1
```
- ⚠️ **Glyph loss.** Every "←" shows as an empty box "□" on the slide.
- This version stores **counts**: b[j] is the number of times value j occurs. It matches "sorting values" on S12.
- **Full trace on the S8 example** (verified). The counting phase:

| i | S[i] | b[0] | b[1] | b[2] | b[3] | b[4] |
|---|---|---|---|---|---|---|
| init | — | 0 | 0 | 0 | 0 | 0 |
| 0 | 4 | 0 | 0 | 0 | 0 | 1 |
| 1 | 2 | 0 | 0 | 1 | 0 | 1 |
| 2 | 1 | 0 | 1 | 1 | 0 | 1 |
| 3 | 2 | 0 | 1 | 2 | 0 | 1 |
| 4 | 0 | 1 | 1 | 2 | 0 | 1 |
| 5 | 3 | 1 | 1 | 2 | 1 | 1 |
| 6 | 2 | 1 | 1 | 3 | 1 | 1 |
| 7 | 1 | 1 | 2 | 3 | 1 | 1 |
| 8 | 4 | 1 | 2 | 3 | 1 | 2 |
| 9 | 0 | 2 | 2 | 3 | 1 | 2 |
| 10 | 2 | 2 | 2 | 4 | 1 | 2 |
| 11 | 3 | 2 | 2 | 4 | 2 | 2 |
| 12 | 0 | 3 | 2 | 4 | 2 | 2 |

- The write-back phase:
  - j=0 writes 0 into S[0..2];
  - j=1 writes 1 into S[3..4];
  - j=2 writes 2 into S[5..8];
  - j=3 writes 3 into S[9..10];
  - j=4 writes 4 into S[11..12].
- The result is S = `[0,0,0,1,1,2,2,2,2,3,3,4,4]`. The inner `S[i] ← j` line runs 13 = n times in total.

### [D10-S12] Values versus entries
- **Sorting values:** each bucket is **just a counter** that is incremented whenever a value matching the bucket's number is seen. This is the S11 version.
- **Sorting entries by keys:** each bucket is **a queue**. Entries are enqueued into the matching bucket and dequeued back into the array after the scan.
- Because a queue gives entries back in the order they arrived, entries with equal keys keep their original order. Radix sort relies on exactly this ([D10-S18] step 3b, [D10-S23]).

### [D10-S13] Time complexity (bucket sort) ⭐
- Bucket initialisation: **O(m)**.
- From array to buckets: **O(n)**.
- From buckets to array: **O(n)**. This stage is a nested loop, but all it does is dequeue from each bucket until all are empty, which is n dequeue operations in total.
- Since m will likely be small compared with n, **bucket sort is O(n)**. "Strictly speaking, time complexity is O ( n + m )".
- ⚠️ **Typo.** The pseudocode box on this slide ends with "i ← i + 10". It should be "i ← i + 1", as on S11.

### [D10-S14] Sorting floating point numbers
- Task (verbatim): "Sort a large set of floating point numbers which are in range from 0.0 to 0.9 and are uniformly distributed across the range."
- The figure shows the input array and the buckets created:

| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| input | 0.78 | 0.17 | 0.39 | 0.26 | 0.72 | 0.94 | 0.21 | 0.12 | 0.23 | 0.68 |

| bucket | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| list | / | 0.12 → 0.17 | 0.21 → 0.23 → 0.26 | 0.39 | / | / | 0.68 | 0.72 → 0.78 | / | 0.94 |

- What the figure shows:
  - Bucket k holds the numbers whose **first digit after the decimal point is k**: 0.78 goes to bucket 7, 0.17 to bucket 1, and so on (verified for all 10 values).
  - Each bucket is a linked list, and each list is shown in **increasing order**. Bucket 1 shows 0.12 → 0.17 even though 0.17 comes first in the input.
- Reading buckets 0 → 9 (S7: "output the buckets in order") gives: 0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94.
- ⚠️ The title says the range is "0.0 to 0.9", but the example contains 0.94. Bucket 9 actually holds 0.9…, up to just below 1.0.
- 🔎 Look up in Track B: how each bucket's list is kept sorted (the slide shows only the final lists), the full floating-point bucket-sort algorithm, and where the O(n²) worst case in the S3 table comes from.

### [D10-S15] Radix sort (section title)
- Section title only.

### [D10-S16] Sorting integers ⭐
- To bucket-sort an array of arbitrary (non-negative) integers, the **number of buckets depends on the maximum integer value** (bold and underlined on the slide).
- Example: sorting **1000** integers whose maximum value is **999999** would need **1 million buckets**.
- So the time complexity is not really O(n). Because **m >>> n**, the actual time complexity is **O(m)**.
- "Can we do better?" The answer is radix sort, on the next slide.

### [D10-S17] Radix sort — idea ⭐
- Repeatedly sort by digit: perform **multiple bucket sorts on S starting with the rightmost digit**.
- If the maximum value is 999999, **only ten buckets** are needed (not 1 million).
- Use this strategy when the keys are integers and there is a reasonable limit on their values.
- The **number of passes** (bucket-sort stages) depends on **the number of digits in the maximum value** (underlined on the slide).

### [D10-S18] Algorithm for Radix Sort ⭐
The five steps on the slide, paraphrased:
1. Find the **maximum number of digits or characters**: take the maximum element and count its digits or characters.
2. Set up **10 buckets (0–9)** for decimal digits, or **256 buckets (0–255)** for byte characters. There is one bucket per possible digit or character value.
3. Start at the **least significant** digit or character position and work **right to left**. For each position:
   - a. Put each element into the bucket for its **current** digit or character.
   - b. **Collect** the elements from the buckets **in the order they were placed**. This keeps elements with the same digit in their existing order.
4. Repeat step 3 for every position, from least significant to most significant.
5. After the last position, the array is sorted.

### [D10-S19] Example: first pass (empty buckets)
- Input: `12 58 37 64 52 36 99 63 18 9 20 88 47` (n = 13, maximum 99, so p = 2 passes).
- The slide shows ten empty buckets (0–9) and the result row `20 12 52 63 64 36 37 47 58 18 88 9 99`.

### [D10-S20] Example: first pass (buckets filled — ones digit)

| bucket (ones digit) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| contents, in order placed | 20 | — | 12, 52 | 63 | 64 | — | 36 | 37, 47 | 58, 18, 88 | 99, 9 |

- The slide's list after pass 1 is `20 12 52 63 64 36 37 47 58 18 88 9 99`.
- ⚠️ **Order error on the slide.** In the input, 99 comes **before** 9 (positions 7 and 10), so 99 is placed in bucket 9 first. By the slide's own rule (S18 step 3b: collect in the order placed), the pass-1 list must end **`… 88, 99, 9`**. The verified stable pass-1 list is `20 12 52 63 64 36 37 47 58 18 88 99 9`.
- The final answer is unaffected: in pass 2, 9 (tens digit 0) and 99 (tens digit 9) go to different buckets.

### [D10-S21] Example: second pass (tens digit)

| bucket (tens digit) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| contents | 9 | 12, 18 | 20 | 36, 37 | 47 | 52, 58 | 63, 64 | — | 88 | 99 |

- Result: **`9 12 18 20 36 37 47 52 58 63 64 88 99`**, which is sorted. The single-digit 9 is treated as 09, so it goes to bucket 0.

### [D10-S22] Example: 1st and 2nd passes (summary)
```text
input          12 58 37 64 52 36 99 63 18  9 20 88 47
  | sort by rightmost digit (least significant)
pass 1 (slide) 20 12 52 63 64 36 37 47 58 18 88  9 99   <- stable version ends "88 99  9" (see S20 ⚠️)
  | sort by leftmost digit (second least significant)
pass 2          9 12 18 20 36 37 47 52 58 63 64 88 99
```
- For two-digit numbers, the "leftmost digit" is the second least significant digit.

### [D10-S23] Radix sort and stability ⭐
- Radix sort works **as long as the bucket sort stages are stable sorts**.
- **Stable sort:** when keys tie, the relative order of the elements is preserved in the result. Example: 52 and 58 have the same first digit. If 52 is before 58 before a stage, 52 must still be before 58 after it.
- This way, the work done by the earlier bucket-sort stages is preserved.
- In the S21 pass, 52 and 58 both land in bucket 5. Pass 1 had already put 52 before 58 (bucket 2 comes before bucket 8), and the stable pass 2 keeps that order.

### [D10-S24] Time complexity (radix sort) ⭐
- If there is a fixed number **p** of bucket-sort stages (six stages when the maximum value is 999999), radix sort is **O(n)**: there are p stages, each taking O(n).
- "Strictly speaking, time complexity is **O( pn )**, where p is the number of digits".

### [D10-S25] Radix sort — summary ⭐
- **Only 10 buckets** are needed however many stages there are, because the buckets are reused at each stage.
- Radix sort can also be applied to **words**:
  - set a limit on the number of letters in a word;
  - use **27 buckets** (or more, depending on the allowed characters): one per letter plus a **"blank"**;
  - the word-length limit is **exactly the number of bucket-sort stages** needed.
- **Strategy?** The slide asks three questions and gives the class answers in brackets:

| Question on slide | Class answer |
|---|---|
| Read char left to right? | **[R_L]**, i.e. read **right to left** |
| Blank spaces to be taken at beginning or last? | **[L]**, i.e. at the **last** (pad short words at the end) |
| Space bucket to be kept at beginning or last? | **[L]**, i.e. the blank bucket comes **last**, after z |

### [D10-S26] Summary ⭐
- Bucket sort and radix sort are O(n) **only because restrictions were imposed** on the input list.
- Sorting in general can be done in O(n log n) time.

### [D10-S27] Sorting Words Using Radix Sort (section title)
- Section title only.

### [D10-S28] Exercise
- "Apply Radix sort on the following four words: **dart, fear, do, car**".

### [D10-S29] Assumptions for the word exercise ⭐
- Read the characters in a word **from right to left**.
- Blank spaces in a word (if assumed) are **taken at last**, so shorter words are padded at the end.
- The **space bucket is kept at last**.

### [D10-S30] (blank slide — the exercise was worked in class)
- The slide is empty; the original .pptx holds only a date placeholder.
- **Verified solution** under the S29 rules. The longest word has 4 letters, so there are 4 passes, and ␣ marks a blank. Padded: `dart`, `fear`, `do␣␣`, `car␣`.

| pass | position read | non-empty buckets, in bucket order (a…z, then ␣) | list after pass |
|---|---|---|---|
| 1 | 4th char | r: fear · t: dart · ␣: do␣␣, car␣ | fear, dart, do␣␣, car␣ |
| 2 | 3rd char | a: fear · r: dart, car␣ · ␣: do␣␣ | fear, dart, car␣, do␣␣ |
| 3 | 2nd char | a: dart, car␣ · e: fear · o: do␣␣ | dart, car␣, fear, do␣␣ |
| 4 | 1st char | c: car␣ · d: dart, do␣␣ · f: fear | **car, dart, do, fear** |

- In pass 4, dart stays before do in bucket d because pass 3 had placed dart first. That is stability at work [D10-S23].
- Here the answer would be the same with the blank bucket first, because no word is a prefix of another (verified). The position of the blank bucket matters when one word is a prefix of another; see §6 Q18.

### [D10-S31] Video lectures
The professor's links:
- Bucket Sort Strategy and Analysis: https://youtu.be/N7-q_O3lgtg
- Radix Sort and its Complexity Analysis: https://youtu.be/pdY5CC_3iEc

---

## 3. Definitions & key terms

| Term | Meaning as taught | Ref |
|---|---|---|
| Full binary tree | Every node has **either zero or two children**; no node has exactly one child. | [D09-S4] |
| Complete binary tree | All levels completely filled except possibly the last; on the last level **nodes are as far left as possible**, with no gaps. | [D09-S4] |
| Perfect binary tree | **Both full and complete**; all leaves at the same depth, so every level is full. | [D09-S4] |
| 2-tree | Label for figure (a) on D09-S8: every node has 0 or 2 children. | [D09-S8] |
| Heap | A binary tree with (1) heap structure and (2) the partial order tree property. | [D09-S7] |
| Heap structure | "T is complete" and "All leaves are at depth h or h–1" (h = height). | [D09-S7] |
| Partial order tree property (maximizing) | "the key at any node is greater than or equal to the keys at each of its children". | [D09-S7] |
| Max-heap / Min-heap | Max-heap: the maximizing property above. Min-heap: the mirror image (not formally defined on the slides). A **descending** array is a max-heap; an **ascending** array is a min-heap. | [D09-S10, S19] |
| Height | A heap's height is "(log n)". A complete tree of height h has at most **2^(h+1) − 1** nodes. | [D09-S9] |
| Leaves | Consecutive indexes: **floor(n/2)+1 … n** (1-based); **floor(n/2) … n−1** (0-based, corrected ⚠️). | [D09-S9] |
| A.length vs A.heap-size | Number of cells in the array vs number of cells that currently belong to the heap. heap-size shrinks during extract and heap-sort. | [D09-S10, S15, S21] |
| Index formulas | 1-based: L = 2i, R = 2i+1, P = floor(i/2). 0-based: L = 2i+1, R = 2i+2, P = ceil(i/2)−1. | [D09-S9] |
| MAX-HEAPIFY(A,i) | Sinks A[i]: swap it with its larger child while that child is larger, then recurse at the child's position. | [D09-S10] |
| BUILD-MAX-HEAP(A) | MAX-HEAPIFY on i = floor(n/2) downto 1 (1-based), or floor(n/2)−1 downto 0 (0-based). | [D09-S10] |
| HEAP-EXTRACT-MAX(A) | Return the root; move the last key to the root; heap-size − 1; MAX-HEAPIFY(root). | [D09-S15] |
| Heap underflow | The error raised by extract when heap-size < 1 (the heap is empty). | [D09-S15] |
| HEAP-SORT(A) | BUILD-MAX-HEAP, then for i = n down to 2: exchange root ↔ A[i], heap-size − 1, MAX-HEAPIFY(root). | [D09-S21] |
| Comparison-based sorting | Sorting by comparing keys; "will need at least … n log n operations". Examples: heap, merge, quick, insertion. | [D10-S5], [D06-S3] |
| Non-comparison sorting | Uses values as bucket indexes, so no comparisons are needed (bucket, radix, counting). | [D10-S6, S7], [D06-S3] |
| Bucket | An array cell indexed by a value. It is a **counter** when sorting values and a **queue** when sorting entries by key. | [D10-S7, S12] |
| m | Number of buckets; the values lie in 0..m−1. | [D10-S7, S11] |
| k | Symbol used in the comparison tables; **not defined** there (⚠️). | [D10-S3, S4] |
| p | Number of digits of the maximum value, which equals the number of radix passes (stages). | [D10-S24] |
| Pass / stage | One bucket sort on one digit or character position. | [D10-S17, S24] |
| Least significant digit | The rightmost digit; radix sort starts there and moves right to left. | [D10-S17, S18, S22] |
| Stable sort | "in case of ties, relative order of elements are preserved in the resulting array". | [D10-S23] |
| Blank (space) bucket | The 27th bucket, used for padding blanks when radix-sorting words. The class keeps it **last**. | [D10-S25, S29] |
| In-place vs "outplaced" | Heapsort needs O(1) auxiliary space. All the non-comparison techniques are "outplaced". | [D10-S4], [D06-S3] |

---

## 4. Algorithm cards as taught

### Card 1 — MAX-HEAPIFY(A, i) [D09-S10, S17]
```text
MAX-HEAPIFY(A,i)
{
    l=2i
    r=2i+1
    If(l<=A.heap-size and A[l]>A[i])
        largest=l
    else largest = i
    If(r<=A.heap-size and A[r]>A[largest])
        largest=r
    If(largest<>i)
        Exchange A[i] with A[largest]
        MAX-HEAPIFY(A,largest)
}
```
- **Idea:** compare a node with the children it actually has; if the larger child is bigger, swap the two and continue from the child's position; stop when no swap is needed.
- **Complexity:** O(log n). At a node of height h the cost is O(h) [D09-S17].
- **Stable?** Not applicable; this is a helper procedure, not a sort.
- **Assumptions:** the tree is stored as a complete binary tree in an array [D09-S7, S9].
  - It is always used bottom-up (BUILD-MAX-HEAP) or at the root of an otherwise valid heap (extract, heap-sort).
  - A single call on an arbitrary array does **not** necessarily produce a heap [D09-S11].
- **0-based form (slide tables):** `l = 2i+1`, `r = 2i+2`. A child exists only if its index is ≤ heap-size−1; otherwise the slides write "(X)".
- **Pitfalls:**
  - Choose the **larger** of the two children.
  - Recursion continues at the **child's index**, not at i+1.
  - "Exit" happens as soon as `largest = i`.

### Card 2 — BUILD-MAX-HEAP(A) [D09-S10, S13, S17; A2]
```text
BUILD-MAX-HEAP(A)
{
    A.heap-size= A.length
    for(i=floor(A.length/2) downto 1)          // 0-based: i=floor(A.length/2)-1 downto 0
        MAX-HEAPIFY(A,i)
}
```
- **Idea:** leaves are already heaps ("every node is heap in itself", [D09-S9]). Heapify every non-leaf, starting from the last one and moving back to the root.
- **Complexity:** **O(n)**. At most ceil(n/2^(h+1)) nodes have height h, and each costs O(h) [D09-S17].
- **Stable?** Not applicable.
- **Assumptions:** the input is any array, viewed as a complete tree.
- **0-based:** for n = 6 or 7 the loop is i = 2, 1, 0 ("i → 2 to 0" on [D09-S13, S22] and [A2]). The A2 solution annotates this as "Non leaf nodes (n/2)−1 to 0".
- **Pitfall:** a swap at one loop index can trigger recursive calls further down. These calls belong to the **same** loop iteration ([D09-S22] ⚠️ label).

### Card 3 — HEAP-EXTRACT-MAX(A) [D09-S15, S17, S20]
```text
Heap-Extract-Max(A)
{
    If A.heap-size < 1
        error " heap underflow"
    max=A[1]
    A[1]=A[A.heap-size]
    A.heap-size=A.heap-size-1
    MAX-HEAPIFY(A,1)
    return max
}
```
- **Idea:** the maximum is at the root. Take it, put the last heap element at the root, shrink the heap, and sink the new root. [D09-S20] shows the same movement as a "vacant" hole moving down.
- **Complexity:** **O(log n)** [D09-S17]. (⚠️ The S3 table's "Delete (Min) O(1)" contradicts this.)
- **Stable?** Not applicable.
- **0-based:** `max = A[0]`; `A[0] = A[heap-size−1]`; heap-size − 1; MAX-HEAPIFY(A,0).

### Card 4 — HEAP-SORT(A) [D09-S19, S21, S22; D10-S3, S4; D06-S3]
```text
HEAP-SORT(A)
    BUILD-MAX-HEAP(A)
    For i ← length[A] down to 2
        Do exchange A[1] ↔ A[i]
            heap-size[A] ← heap-size[A]-1
            MAX-HEAPIFY(A,1)
```
- The lost "↔" and "←" glyphs are restored here, and "I" is written as i (see the ⚠️ on [D09-S21]).
- **Idea:** build a max-heap. Then n−1 times: swap the root (the current maximum) with the last heap cell, shrink the heap by one, and re-heapify the root. The sorted part grows from the right.
- **Output order:** **ascending**, using a **max-heap** [D09-S22].
- **Complexity:**
  - O(n) + (n−1)·O(log n) = **O(n log n)** [D09-S21].
  - The table gives O(n log n) best, average and worst [D10-S3].
  - Auxiliary space is **O(1)** [D10-S4].
- **Stable?** **No.** Heap sort is listed under "Unstable sorting" [D06-S3].
- **Assumptions:** the array is treated as a complete binary tree; the sort works in place.
- **0-based:** for i = n−1 down to 1: exchange A[0] ↔ A[i], heap-size − 1, MAX-HEAPIFY(A,0).

### Card 5 — BucketSort(S) for integer values [D10-S7, S11, S12, S13, S16]
```text
Algorithm BucketSort( S )
( values in S are between 0 and m-1 )
for j ← 0 to m-1 do              // initialize m buckets
    b[j] ← 0
for i ← 0 to n-1 do              // place elements in their
    b[S[i]] ← b[S[i]] + 1        // appropriate buckets
i ← 0
for j ← 0 to m-1 do              // place elements in buckets
    for r ← 1 to b[j] do         // back in S
        S[i] ← j
        i ← i + 1
```
- **Idea:** use each value as a bucket index, count (or enqueue) it, then read the buckets back in order. **No comparisons** are made [D10-S7].
- **Complexity:**
  - Breakdown: O(m) to initialise + O(n) to fill + O(n) to write back = **O(n + m)**. This is "O(n)" when m is small compared with n [D10-S13].
  - When **m >>> n**, the cost is **O(m)** (example: max 999999 needs 1 million buckets) [D10-S16].
  - The table gives O(n+k) best and average, O(n²) worst, and O(nk) space [D10-S3, S4].
- **Stable?**
  - In the counter version only values are written back, so there are no separate entries whose order could change.
  - In the entries version each bucket is a **queue** (enqueue, then dequeue back), so equal keys come out in arrival order [D10-S12]. This is the property radix sort needs [D10-S18 step 3b, S23].
- **Assumptions:** non-negative integer values in **0..m−1**; values may repeat; the range is limited [D10-S6, S7].

### Card 6 — Bucket sort for floating-point numbers (figure only) [D10-S14]
- **Idea as shown in the figure:**
  - A number goes to the bucket numbered by its **first decimal digit** (10 buckets, 0–9).
  - Each bucket is a linked list displayed in **increasing order**.
  - Reading the buckets 0→9 gives the sorted output.
- **Assumptions:** a "large set" of numbers in the range 0.0–0.9 that are **uniformly distributed**. (⚠️ The example includes 0.94.)
- **Complexity / stability:** not derived on the slides. 🔎 Look up in Track B: the float bucket-sort algorithm, how the lists are kept sorted, and the O(n²) worst case shown in [D10-S3].

### Card 7 — Radix sort for integers [D10-S17, S18, S23, S24, S25]
- **Steps (S18, paraphrased):**
  1. p = number of digits of the maximum value.
  2. Set up 10 buckets (0–9).
  3. For each digit position, from the rightmost (least significant) to the leftmost:
     - place every element in the bucket for that digit;
     - collect the buckets 0→9, each **in the order its elements were placed**.
  4. After p passes the list is sorted.
- **Idea:** repeated stable bucket sorts. Only 10 buckets are needed, reused at every pass.
- **Complexity:**
  - p passes × O(n) = **O(pn)**, which is O(n) for a fixed p. Example: maximum 999999 gives p = 6 [D10-S24].
  - The table gives O(nk) in all cases and O(n+k) space [D10-S3, S4].
- **Stable?** **Every pass must be stable**; otherwise the earlier passes' work is lost [D10-S23].
- **Assumptions:** integer keys with a reasonable limit on their values [D10-S17]. Short numbers are treated as having leading zeros (9 = 09 goes to bucket 0 in the tens pass) [D10-S21].
- **Byte characters:** use 256 buckets (0–255) [D10-S18].

### Card 8 — Radix sort for words [D10-S25, S27–S30]
- **Rules (class convention):**
  - (1) Set a word-length limit L; the number of passes is L.
  - (2) Pad shorter words with **blanks at the end** ("taken at last").
  - (3) Read character positions **right → left**, from position L down to 1.
  - (4) Use **27 buckets**: a–z, then the **blank bucket last**.
  - (5) Collect in the order placed, which keeps every pass stable.
- **Complexity:** L passes × O(n). The number of passes equals the word-length limit [D10-S25].
- **Example:** dart, fear, do, car sorts to **car, dart, do, fear** ([D10-S30]; trace in §2).

### Complexity cheat-sheet (exactly as stated on the slides)

| Item | As stated | Ref |
|---|---|---|
| Max-Heapify | O(log n); O(h) at a node of height h | [D09-S17] |
| Heap-Extract-Max | O(log n) | [D09-S17] |
| Build_Heap | O(n) | [D09-S17], [D09-S21] |
| Heap sort | O(n log n) (best, average and worst); space O(1) | [D09-S21], [D10-S3, S4] |
| Heap (Min) operations | Insert O(log n), Search O(log n)⚠️, Find-Min O(1), Delete-Min O(1)⚠️ | [D09-S3] |
| Comparison sorting lower bound | "at least O(n log n)" (⚠️ a lower bound is Ω) | [D10-S5] |
| Bucket sort (integers) | O(m) + O(n) + O(n) = O(n + m), so O(n) when m is small | [D10-S13] |
| Bucket sort with m >>> n | O(m) | [D10-S16] |
| Bucket sort (table) | O(n+k) best and average, O(n²) worst; space O(nk) | [D10-S3, S4] |
| Radix sort | O(pn), so O(n) for fixed p (p = 6 when max = 999999) | [D10-S24] |
| Radix sort (table) | O(nk) best, average and worst; space O(n+k) | [D10-S3, S4] |
| Quick sort | O(n log n) average, O(n²) worst; "best one in practice" | [D10-S5] |
| Sorting in general | O(n log n); O(n) only under input restrictions | [D10-S26] |

---

## 5. Worked traces

> **How to lay out a heap answer (the professor's A2 format).**
> - Columns are the array indexes **0 … n−1**.
> - For each loop value of i, mark i, L and R under the matching columns (arrows show the swap), then write the array after the swap.
> - Write **exit** when the recursion stops.
> - The A2 solution also notes the loop range ("For I → 2 to 0", "Non leaf nodes (n/2)−1 to 0").
>
> The tables below add explicit `l, r` and `largest` columns.
> - "(X)" means the index is outside the heap.
> - "↳ recursive" is the recursive MAX-HEAPIFY call inside the same loop iteration.
> - **Bold** cells are the sorted part in heap-sort.
> - "—" marks a cell no longer in the heap after an extract.
>
> All tables were generated from the verified Python run.

### 5.1 Heap examples from the slides

#### T1 — MAX-HEAPIFY(A,0) on `[4, 2, 6, 1, 3, 5, 7]` [D09-S11]
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 4 | 2 | 6 | 1 | 3 | 5 | 7 |
| call i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 6 | 2 | 4 | 1 | 3 | 5 | 7 |
| ↳ recursive | 2 | 5, 6 | 6 | swap A[2]↔A[6] | 6 | 2 | 7 | 1 | 3 | 5 | 4 |
| ↳ recursive | 6 | 13(X), 14(X) | 6 | exit (no swap) | | | | | | | |

Result: `[6, 2, 7, 1, 3, 5, 4]`. This is **not** a max-heap, because 7 > 6. Trees are in §2 [D09-S11].

#### T2 — MAX-HEAPIFY(A,0) on `[16, 46, 15, 18, 17, 22, 19]` [D09-S12 exercise]
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 16 | 46 | 15 | 18 | 17 | 22 | 19 |
| call i=0 | 0 | 1, 2 | 1 | swap A[0]↔A[1] | 46 | 16 | 15 | 18 | 17 | 22 | 19 |
| ↳ recursive | 1 | 3, 4 | 3 | swap A[1]↔A[3] | 46 | 18 | 15 | 16 | 17 | 22 | 19 |
| ↳ recursive | 3 | 7(X), 8(X) | 3 | exit (no swap) | | | | | | | |

Result: `[46, 18, 15, 16, 17, 22, 19]`. This is **not** a max-heap, because 22 > 15.

#### T3 — BUILD-MAX-HEAP on `[4, 2, 6, 1, 3, 5, 7]` (i → 2 to 0) [D09-S13]
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 4 | 2 | 6 | 1 | 3 | 5 | 7 |
| loop i=2 | 2 | 5, 6 | 6 | swap A[2]↔A[6] | 4 | 2 | 7 | 1 | 3 | 5 | 6 |
| ↳ recursive | 6 | 13(X), 14(X) | 6 | exit (no swap) | | | | | | | |
| loop i=1 | 1 | 3, 4 | 4 | swap A[1]↔A[4] | 4 | 3 | 7 | 1 | 2 | 5 | 6 |
| ↳ recursive | 4 | 9(X), 10(X) | 4 | exit (no swap) | | | | | | | |
| loop i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 7 | 3 | 4 | 1 | 2 | 5 | 6 |
| ↳ recursive | 2 | 5, 6 | 6 | swap A[2]↔A[6] | 7 | 3 | 6 | 1 | 2 | 5 | 4 |
| ↳ recursive | 6 | 13(X), 14(X) | 6 | exit (no swap) | | | | | | | |

Result (max-heap): **`[7, 3, 6, 1, 2, 5, 4]`**.

#### T4 — BUILD-MAX-HEAP on `[16, 46, 15, 18, 17, 22, 19]` [D09-S14 exercise]
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 16 | 46 | 15 | 18 | 17 | 22 | 19 |
| loop i=2 | 2 | 5, 6 | 5 | swap A[2]↔A[5] | 16 | 46 | 22 | 18 | 17 | 15 | 19 |
| ↳ recursive | 5 | 11(X), 12(X) | 5 | exit (no swap) | | | | | | | |
| loop i=1 | 1 | 3, 4 | 1 | exit (no swap) | | | | | | | |
| loop i=0 | 0 | 1, 2 | 1 | swap A[0]↔A[1] | 46 | 16 | 22 | 18 | 17 | 15 | 19 |
| ↳ recursive | 1 | 3, 4 | 3 | swap A[1]↔A[3] | 46 | 18 | 22 | 16 | 17 | 15 | 19 |
| ↳ recursive | 3 | 7(X), 8(X) | 3 | exit (no swap) | | | | | | | |

Result (max-heap): **`[46, 18, 22, 16, 17, 15, 19]`**.

#### T5 — HEAP-EXTRACT-MAX on `[7, 3, 6, 1, 2, 5, 4]` [D09-S15]
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 7 | 3 | 6 | 1 | 2 | 5 | 4 |
| extract | | | | max=7 out; A[0]←A[6]; heap-size=6 | 4 | 3 | 6 | 1 | 2 | 5 | — |
| call i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 6 | 3 | 4 | 1 | 2 | 5 | — |
| ↳ recursive | 2 | 5, 6(X) | 5 | swap A[2]↔A[5] | 6 | 3 | 5 | 1 | 2 | 4 | — |
| ↳ recursive | 5 | 11(X), 12(X) | 5 | exit (no swap) | | | | | | | |

Returns **7**. The heap is now **`[6, 3, 5, 1, 2, 4]`** (heap-size 6), matching the green row on the slide.

#### T6 — Root removal on Heap 2 `[50, 24, 30, 20, 21, 18, 3, 12, 5, 6]` [D09-S20, "vacant" figure]
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 50 | 24 | 30 | 20 | 21 | 18 | 3 | 12 | 5 | 6 |
| extract | | | | max=50 out; A[0]←A[9]; heap-size=9 | 6 | 24 | 30 | 20 | 21 | 18 | 3 | 12 | 5 | — |
| call i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 30 | 24 | 6 | 20 | 21 | 18 | 3 | 12 | 5 | — |
| ↳ recursive | 2 | 5, 6 | 5 | swap A[2]↔A[5] | 30 | 24 | 18 | 20 | 21 | 6 | 3 | 12 | 5 | — |
| ↳ recursive | 5 | 11(X), 12(X) | 5 | exit (no swap) | | | | | | | | | | |

The heap is now **`[30, 24, 18, 20, 21, 6, 3, 12, 5]`**, which is picture (e) on the slide.

#### T7 — HEAP-SORT on `[12, 7, 8, 23, 3, 21]` [D09-S22]
Build phase:

| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 12 | 7 | 8 | 23 | 3 | 21 |
| loop i=2 | 2 | 5, 6(X) | 5 | swap A[2]↔A[5] | 12 | 7 | 21 | 23 | 3 | 8 |
| ↳ recursive | 5 | 11(X), 12(X) | 5 | exit (no swap) | | | | | | |
| loop i=1 | 1 | 3, 4 | 3 | swap A[1]↔A[3] | 12 | 23 | 21 | 7 | 3 | 8 |
| ↳ recursive | 3 | 7(X), 8(X) | 3 | exit (no swap) | | | | | | |
| loop i=0 | 0 | 1, 2 | 1 | swap A[0]↔A[1] | 23 | 12 | 21 | 7 | 3 | 8 |
| ↳ recursive | 1 | 3, 4 | 1 | exit (no swap) | | | | | | |

Sort phase:

| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|---|---|---|---|
| heap | | | | | 23 | 12 | 21 | 7 | 3 | 8 |
| **It-1** | | | | exchange A[0]↔A[5]; heap-size=5 | 8 | 12 | 21 | 7 | 3 | **23** |
| call i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 21 | 12 | 8 | 7 | 3 | **23** |
| ↳ recursive | 2 | 5(X), 6(X) | 2 | exit (no swap) | | | | | | |
| **It-2** | | | | exchange A[0]↔A[4]; heap-size=4 | 3 | 12 | 8 | 7 | **21** | **23** |
| call i=0 | 0 | 1, 2 | 1 | swap A[0]↔A[1] | 12 | 3 | 8 | 7 | **21** | **23** |
| ↳ recursive | 1 | 3, 4(X) | 3 | swap A[1]↔A[3] | 12 | 7 | 8 | 3 | **21** | **23** |
| ↳ recursive | 3 | 7(X), 8(X) | 3 | exit (no swap) | | | | | | |
| **It-3** | | | | exchange A[0]↔A[3]; heap-size=3 | 3 | 7 | 8 | **12** | **21** | **23** |
| call i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 8 | 7 | 3 | **12** | **21** | **23** |
| ↳ recursive | 2 | 5(X), 6(X) | 2 | exit (no swap) | | | | | | |
| **It-4** | | | | exchange A[0]↔A[2]; heap-size=2 | 3 | 7 | **8** | **12** | **21** | **23** |
| call i=0 | 0 | 1, 2(X) | 1 | swap A[0]↔A[1] | 7 | 3 | **8** | **12** | **21** | **23** |
| ↳ recursive | 1 | 3(X), 4(X) | 1 | exit (no swap) | | | | | | |
| **It-5** | | | | exchange A[0]↔A[1]; heap-size=1 | 3 | **7** | **8** | **12** | **21** | **23** |
| call i=0 | 0 | 1(X), 2(X) | 0 | exit (no swap) | | | | | | |

Final: **`[3, 7, 8, 12, 21, 23]`**. The trees for every step are in §2 [D09-S22].

### 5.2 Assignment 2 — heap question [A2]

#### T8 — A2 SAMPLE SOLUTION: BUILD-MAX-HEAP on `12, 9, 7, 2, 15, 32`
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 12 | 9 | 7 | 2 | 15 | 32 |
| loop i=2 | 2 | 5, 6(X) | 5 | swap A[2]↔A[5] | 12 | 9 | 32 | 2 | 15 | 7 |
| ↳ recursive | 5 | 11(X), 12(X) | 5 | exit (no swap) | | | | | | |
| loop i=1 | 1 | 3, 4 | 4 | swap A[1]↔A[4] | 12 | 15 | 32 | 2 | 9 | 7 |
| ↳ recursive | 4 | 9(X), 10(X) | 4 | exit (no swap) | | | | | | |
| loop i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 32 | 15 | 12 | 2 | 9 | 7 |
| ↳ recursive | 2 | 5, 6(X) | 2 | exit (no swap) | | | | | | |

Result: **`[32, 15, 12, 2, 9, 7]`**, which matches the professor's final (shaded) row.

```text
start                     i=2: swap 2<->5           i=1: swap 1<->4           i=0: swap 0<->2 (final)
[12, 9, 7, 2, 15, 32]     [12, 9, 32, 2, 15, 7]     [12, 15, 32, 2, 9, 7]     [32, 15, 12, 2, 9, 7]

     12                        12                        12                        32
    /   \                     /   \                     /   \                     /   \
  9       7                 9      32                15      32                15      12
 / \     /                 / \     /                 / \     /                 / \     /
2  15  32                 2  15   7                 2   9   7                 2   9   7
```

- ⚠️ **Slip in the sample solution.** After the i=1 swap (A[1]↔A[4], so R=4 is largest), the side note says "**i=3 exit**". The recursive call is actually MAX-HEAPIFY(A,**4**), which exits because 9 and 10 are out of range. It should read "i=4 exit". The arrays are all correct.
- The sample solution's numbers (12, 9, 7, 2, 15, 32) **differ** from the assignment sheet's Q1 numbers (11, 19, 7, 12, 15, 30). The sheet's version is traced next.
- A2's other two questions (quicksort's first PARTITION, and merge sort, both numbered "Q2") belong to decks 07 and 08. They use 1-based columns 1..6, whereas the heap question uses 0-based columns 0..5.

#### T9 — A2 Q1 as printed on the assignment sheet: BUILD-MAX-HEAP on `11, 19, 7, 12, 15, 30`
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 11 | 19 | 7 | 12 | 15 | 30 |
| loop i=2 | 2 | 5, 6(X) | 5 | swap A[2]↔A[5] | 11 | 19 | 30 | 12 | 15 | 7 |
| ↳ recursive | 5 | 11(X), 12(X) | 5 | exit (no swap) | | | | | | |
| loop i=1 | 1 | 3, 4 | 1 | exit (no swap) | | | | | | |
| loop i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 30 | 19 | 11 | 12 | 15 | 7 |
| ↳ recursive | 2 | 5, 6(X) | 2 | exit (no swap) | | | | | | |

Result: **`[30, 19, 11, 12, 15, 7]`** (verified max-heap).

```text
start                       i=2: swap 2<->5             i=1: no swap                i=0: swap 0<->2 (final)
[11, 19, 7, 12, 15, 30]     [11, 19, 30, 12, 15, 7]     [11, 19, 30, 12, 15, 7]     [30, 19, 11, 12, 15, 7]

      11                          11                          11                          30
     /   \                       /   \                       /   \                       /   \
  19       7                  19      30                  19      30                  19      11
  / \     /                   / \     /                   / \     /                   / \     /
12  15  30                  12  15   7                  12  15   7                  12  15   7
```

- Why there is no swap at i=1: 19 is already ≥ both of its children, 12 and 15.
- Why the recursive call at i=0 exits: after 11 moves down to index 2, its only child is 7 (index 5), and 11 ≥ 7.

### 5.3 Bucket and radix examples from the slides (answer format)

#### T10 — BucketSort on `4 2 1 2 0 3 2 1 4 0 2 3 0`, m = 5 [D10-S8–S11]
- After the counting loop: **b = [3, 2, 4, 2, 2]** (the full step table is in §2 [D10-S11]).
- Write-back gives **S = [0, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4]**. The line `S[i] ← j` runs 13 = n times.

#### T11 — Floating-point buckets [D10-S14]

| value | 0.78 | 0.17 | 0.39 | 0.26 | 0.72 | 0.94 | 0.21 | 0.12 | 0.23 | 0.68 |
|---|---|---|---|---|---|---|---|---|---|---|
| bucket | 7 | 1 | 3 | 2 | 7 | 9 | 2 | 1 | 2 | 6 |

- Output, reading buckets 0→9 with each list in increasing order: 0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94.

#### T12 — Radix sort on `12 58 37 64 52 36 99 63 18 9 20 88 47` [D10-S19–S22]

| pass | digit | list after the pass |
|---|---|---|
| 1 | ones | 20 12 52 63 64 36 37 47 58 18 88 **99 9** (stable). The slide prints "…88 9 99" ⚠️ |
| 2 | tens | 9 12 18 20 36 37 47 52 58 63 64 88 99 |

The bucket tables are in §2 [D10-S20, S21].

#### T13 — Radix sort on words dart, fear, do, car [D10-S28–S30]
- Passes on positions 4 → 3 → 2 → 1, with blanks at the end and the blank bucket last:
  - after pass 1: fear, dart, do, car;
  - after pass 2: fear, dart, car, do;
  - after pass 3: dart, car, fear, do;
  - after pass 4: **car, dart, do, fear**.
- The full bucket table is in §2 [D10-S30].

### 5.4 Practice problems (new, with verified answers in 5.5)

- **P1 (BUILD-MAX-HEAP).** Convert the 0-based array `[5, 13, 2, 25, 7, 17, 20, 8, 4]` into a max-heap with BUILD-MAX-HEAP.
  - State the loop range.
  - For every MAX-HEAPIFY call give i, l, r and largest.
  - Give the array after each swap, and draw the final tree.
- **P2 (HEAP-SORT).** Sort the 0-based array `[15, 5, 20, 1, 17, 10, 30]` with HEAP-SORT.
  - Show the heap after BUILD-MAX-HEAP.
  - Show the array after every iteration It-1 … It-6.
- **P3 (bucket sort).**
  - (a) Apply the [D10-S11] BucketSort to `S = [3, 0, 5, 3, 1, 4, 0, 3, 5, 2, 1, 3]` with m = 6. Show b after the counting loop and S after the write-back. How many times does `S[i] ← j` run?
  - (b) Use queue buckets ([D10-S12]) to sort the entries (key, tag) = (3,a) (1,b) (3,c) (0,d) (1,e) (2,f) (3,g) by key. Show each bucket and the output. Do equal keys keep their order?
- **P4 (radix sort).** Radix-sort `[472, 38, 815, 206, 91, 560, 347, 18, 724, 605]` with the [D10-S18] algorithm. How many passes are needed? Show every bucket and the list after each pass.

### 5.5 Practice answers (verified)

#### P1 — answer
- n = 9, so the 0-based loop runs i = floor(9/2)−1 = **3** down to **0**.
- The leaves are at indexes 4…8 (from floor(9/2) = 4 to n−1 = 8).

| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 5 | 13 | 2 | 25 | 7 | 17 | 20 | 8 | 4 |
| loop i=3 | 3 | 7, 8 | 3 | exit (no swap) | | | | | | | | | |
| loop i=2 | 2 | 5, 6 | 6 | swap A[2]↔A[6] | 5 | 13 | 20 | 25 | 7 | 17 | 2 | 8 | 4 |
| ↳ recursive | 6 | 13(X), 14(X) | 6 | exit (no swap) | | | | | | | | | |
| loop i=1 | 1 | 3, 4 | 3 | swap A[1]↔A[3] | 5 | 25 | 20 | 13 | 7 | 17 | 2 | 8 | 4 |
| ↳ recursive | 3 | 7, 8 | 3 | exit (no swap) | | | | | | | | | |
| loop i=0 | 0 | 1, 2 | 1 | swap A[0]↔A[1] | 25 | 5 | 20 | 13 | 7 | 17 | 2 | 8 | 4 |
| ↳ recursive | 1 | 3, 4 | 3 | swap A[1]↔A[3] | 25 | 13 | 20 | 5 | 7 | 17 | 2 | 8 | 4 |
| ↳ recursive | 3 | 7, 8 | 7 | swap A[3]↔A[7] | 25 | 13 | 20 | 8 | 7 | 17 | 2 | 5 | 4 |
| ↳ recursive | 7 | 15(X), 16(X) | 7 | exit (no swap) | | | | | | | | | |

**Result: `[25, 13, 20, 8, 7, 17, 2, 5, 4]`**. At i=0, key 5 sinks three levels (index 0 → 1 → 3 → 7).

```text
start                               i=3: no swap                        i=2: swap 2<->6
[5, 13, 2, 25, 7, 17, 20, 8, 4]     [5, 13, 2, 25, 7, 17, 20, 8, 4]     [5, 13, 20, 25, 7, 17, 2, 8, 4]

              5                                   5                                   5
          /       \                           /       \                           /       \
     13               2                  13               2                  13              20
    /   \           /   \               /   \           /   \               /   \           /   \
 25       7      17      20          25       7      17      20          25       7      17       2
 / \                                 / \                                 / \
8   4                               8   4                               8   4

i=1: swap 1<->3                     i=0: swap 0<->1                     i=0: swap 1<->3
[5, 25, 20, 13, 7, 17, 2, 8, 4]     [25, 5, 20, 13, 7, 17, 2, 8, 4]     [25, 13, 20, 5, 7, 17, 2, 8, 4]

              5                                  25                                  25
          /       \                           /       \                           /       \
     25              20                   5              20                  13              20
    /   \           /   \               /   \           /   \               /   \           /   \
 13       7      17       2          13       7      17       2           5       7      17       2
 / \                                 / \                                 / \
8   4                               8   4                               8   4

i=0: swap 3<->7  (final max-heap)
[25, 13, 20, 8, 7, 17, 2, 5, 4]

             25
          /       \
     13              20
    /   \           /   \
  8       7      17       2
 / \
5   4
```

#### P2 — answer
Build phase (loop i = 2, 1, 0):

| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 15 | 5 | 20 | 1 | 17 | 10 | 30 |
| loop i=2 | 2 | 5, 6 | 6 | swap A[2]↔A[6] | 15 | 5 | 30 | 1 | 17 | 10 | 20 |
| ↳ recursive | 6 | 13(X), 14(X) | 6 | exit (no swap) | | | | | | | |
| loop i=1 | 1 | 3, 4 | 4 | swap A[1]↔A[4] | 15 | 17 | 30 | 1 | 5 | 10 | 20 |
| ↳ recursive | 4 | 9(X), 10(X) | 4 | exit (no swap) | | | | | | | |
| loop i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 30 | 17 | 15 | 1 | 5 | 10 | 20 |
| ↳ recursive | 2 | 5, 6 | 6 | swap A[2]↔A[6] | 30 | 17 | 20 | 1 | 5 | 10 | 15 |
| ↳ recursive | 6 | 13(X), 14(X) | 6 | exit (no swap) | | | | | | | |

Heap after BUILD-MAX-HEAP: **`[30, 17, 20, 1, 5, 10, 15]`**.

Sort phase:

| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| heap | | | | | 30 | 17 | 20 | 1 | 5 | 10 | 15 |
| **It-1** | | | | exchange A[0]↔A[6]; heap-size=6 | 15 | 17 | 20 | 1 | 5 | 10 | **30** |
| call i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 20 | 17 | 15 | 1 | 5 | 10 | **30** |
| ↳ recursive | 2 | 5, 6(X) | 2 | exit (no swap) | | | | | | | |
| **It-2** | | | | exchange A[0]↔A[5]; heap-size=5 | 10 | 17 | 15 | 1 | 5 | **20** | **30** |
| call i=0 | 0 | 1, 2 | 1 | swap A[0]↔A[1] | 17 | 10 | 15 | 1 | 5 | **20** | **30** |
| ↳ recursive | 1 | 3, 4 | 1 | exit (no swap) | | | | | | | |
| **It-3** | | | | exchange A[0]↔A[4]; heap-size=4 | 5 | 10 | 15 | 1 | **17** | **20** | **30** |
| call i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 15 | 10 | 5 | 1 | **17** | **20** | **30** |
| ↳ recursive | 2 | 5(X), 6(X) | 2 | exit (no swap) | | | | | | | |
| **It-4** | | | | exchange A[0]↔A[3]; heap-size=3 | 1 | 10 | 5 | **15** | **17** | **20** | **30** |
| call i=0 | 0 | 1, 2 | 1 | swap A[0]↔A[1] | 10 | 1 | 5 | **15** | **17** | **20** | **30** |
| ↳ recursive | 1 | 3(X), 4(X) | 1 | exit (no swap) | | | | | | | |
| **It-5** | | | | exchange A[0]↔A[2]; heap-size=2 | 5 | 1 | **10** | **15** | **17** | **20** | **30** |
| call i=0 | 0 | 1, 2(X) | 0 | exit (no swap) | | | | | | | |
| **It-6** | | | | exchange A[0]↔A[1]; heap-size=1 | 1 | **5** | **10** | **15** | **17** | **20** | **30** |
| call i=0 | 0 | 1(X), 2(X) | 0 | exit (no swap) | | | | | | | |

**Final: `[1, 5, 10, 15, 17, 20, 30]`**.

The array at the end of each iteration:

| after | array (heap \| sorted) |
|---|---|
| It-1 | 20, 17, 15, 1, 5, 10 \| 30 |
| It-2 | 17, 10, 15, 1, 5 \| 20, 30 |
| It-3 | 15, 10, 5, 1 \| 17, 20, 30 |
| It-4 | 10, 1, 5 \| 15, 17, 20, 30 |
| It-5 | 5, 1 \| 10, 15, 17, 20, 30 |
| It-6 | 1 \| 5, 10, 15, 17, 20, 30 |

```text
BUILD:
start                          i=2: swap 2<->6                i=1: swap 1<->4
[15, 5, 20, 1, 17, 10, 30]     [15, 5, 30, 1, 17, 10, 20]     [15, 17, 30, 1, 5, 10, 20]

     15                             15                             15
    /   \                          /   \                          /   \
  5      20                      5      30                     17      30
 / \     / \                    / \     / \                    / \     / \
1  17  10  30                  1  17  10  20                  1   5  10  20

i=0: swap 0<->2                i=0: swap 2<->6  (heap built)
[30, 17, 15, 1, 5, 10, 20]     [30, 17, 20, 1, 5, 10, 15]

     30                             30
    /   \                          /   \
 17      15                     17      20
 / \     / \                    / \     / \
1   5  10  20                  1   5  10  15

SORT:
It-1: exch 0<->6                It-1: swap 0<->2                It-2: exch 0<->5
[15, 17, 20, 1, 5, 10 | 30]     [20, 17, 15, 1, 5, 10 | 30]     [10, 17, 15, 1, 5 | 20, 30]

     15                              20                              10
    /   \                           /   \                           /   \
 17      20                      17      15                      17      15
 / \     /                       / \     /                       / \
1   5  10                       1   5  10                       1   5

It-2: swap 0<->1                It-3: exch 0<->4                It-3: swap 0<->2
[17, 10, 15, 1, 5 | 20, 30]     [5, 10, 15, 1 | 17, 20, 30]     [15, 10, 5, 1 | 17, 20, 30]

     17                               5                              15
    /   \                           /   \                           /   \
 10      15                      10      15                      10       5
 / \                             /                               /
1   5                           1                               1

It-4: exch 0<->3                It-4: swap 0<->1                It-5: exch 0<->2 (5 >= 1: no swap)
[1, 10, 5 | 15, 17, 20, 30]     [10, 1, 5 | 15, 17, 20, 30]     [5, 1 | 10, 15, 17, 20, 30]

   1                             10                               5
  / \                            / \                             /
10   5                          1   5                           1

It-6: exch 0<->1 -> heap of size 1 -> final [1, 5, 10, 15, 17, 20, 30]
```

#### P3 — answer
(a) Counting phase (m = 6, n = 12):

| i | S[i] | b[0] | b[1] | b[2] | b[3] | b[4] | b[5] |
|---|---|---|---|---|---|---|---|
| init | — | 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 3 | 0 | 0 | 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 0 | 0 | 1 | 0 | 0 |
| 2 | 5 | 1 | 0 | 0 | 1 | 0 | 1 |
| 3 | 3 | 1 | 0 | 0 | 2 | 0 | 1 |
| 4 | 1 | 1 | 1 | 0 | 2 | 0 | 1 |
| 5 | 4 | 1 | 1 | 0 | 2 | 1 | 1 |
| 6 | 0 | 2 | 1 | 0 | 2 | 1 | 1 |
| 7 | 3 | 2 | 1 | 0 | 3 | 1 | 1 |
| 8 | 5 | 2 | 1 | 0 | 3 | 1 | 2 |
| 9 | 2 | 2 | 1 | 1 | 3 | 1 | 2 |
| 10 | 1 | 2 | 2 | 1 | 3 | 1 | 2 |
| 11 | 3 | 2 | 2 | 1 | 4 | 1 | 2 |

- **b = [2, 2, 1, 4, 1, 2]**.
- Write-back:
  - j=0 writes 0 into S[0..1];
  - j=1 writes 1 into S[2..3];
  - j=2 writes 2 into S[4];
  - j=3 writes 3 into S[5..8];
  - j=4 writes 4 into S[9];
  - j=5 writes 5 into S[10..11].
- Result: **S = [0, 0, 1, 1, 2, 3, 3, 3, 3, 4, 5, 5]**.
- `S[i] ← j` runs **12 = n** times. The total time is O(m) + O(n) + O(n) = O(n + m) [D10-S13].

(b) Queue buckets, enqueued in input order:

| bucket | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| queue | (0,d) | (1,b), (1,e) | (2,f) | (3,a), (3,c), (3,g) |

- Output: **(0,d) (1,b) (1,e) (2,f) (3,a) (3,c) (3,g)**.
- **Yes, equal keys keep their order**: b is still before e, and a before c before g. This is the "stable" behaviour that radix sort relies on [D10-S23].

#### P4 — answer
- The maximum is 815, which has 3 digits, so **p = 3 passes**. Numbers with fewer digits get leading zeros: 38 = 038, 91 = 091, 18 = 018.
- The buckets are listed in the order elements were placed; empty buckets are omitted.

| pass | digit | non-empty buckets | list after pass |
|---|---|---|---|
| 1 | ones | 0: 560 · 1: 91 · 2: 472 · 4: 724 · 5: 815, 605 · 6: 206 · 7: 347 · 8: 38, 18 | 560, 91, 472, 724, 815, 605, 206, 347, 38, 18 |
| 2 | tens | 0: 605, 206 · 1: 815, 18 · 2: 724 · 3: 38 · 4: 347 · 6: 560 · 7: 472 · 9: 91 | 605, 206, 815, 18, 724, 38, 347, 560, 472, 91 |
| 3 | hundreds | 0: 18, 38, 91 · 2: 206 · 3: 347 · 4: 472 · 5: 560 · 6: 605 · 7: 724 · 8: 815 | **18, 38, 91, 206, 347, 472, 560, 605, 724, 815** |

- Stability check, pass 3: 18, 38 and 91 all have hundreds digit 0. They come out in the order pass 2 left them (18 before 38 before 91), which is exactly why the result is correct [D10-S23].

---

## 6. Likely exam questions (only from these materials)

> Unless stated otherwise, arrays are **0-based**, as in the slide tables and A2. Answers are in the next subsection.

1. **Index formulas.**
   - In a 0-based heap array, give the left child, right child and parent of index 4.
   - Do the same for index 5 in a 1-based array.
2. **Leaves.** For n = 10, list the leaf indexes for 1-based indexing and for 0-based indexing. At which index does BUILD-MAX-HEAP's loop start in each case?
3. **Tree facts.**
   - (a) What is the maximum number of nodes in a complete binary tree of height 3?
   - (b) True or false: every perfect binary tree is both full and complete.
   - (c) Is the D09-S4 "complete" example tree (nodes 0–5) full?
4. **Heap or not?** Which of these arrays are max-heaps?
   - (i) `[9, 5, 7, 1, 4, 3, 6]`
   - (ii) `[6, 2, 7, 1, 3, 5, 4]`
   - (iii) `[9, 8, 7, 6, 5, 4, 3]`
   - (iv) `[50, 24, 30, 20, 21, 18, 3, 12, 5, 6]`
5. **MCQ.** For a 0-based array of length n, the BUILD-MAX-HEAP loop is:
   - (a) i = floor(n/2) downto 1
   - (b) i = floor(n/2)−1 downto 0
   - (c) i = 0 to floor(n/2)−1
   - (d) i = n−1 downto 0
6. **(A2 Q1)** Convert the sequence **11, 19, 7, 12, 15, 30** to a heap using Build Max Heap. Show every iteration in the table format.
7. Apply **one** MAX-HEAPIFY(A,0) to `[5, 20, 9, 14, 8, 2, 1]`. Give the array after each swap. Is the result a max-heap?
8. Starting from the max-heap `[7, 3, 6, 1, 2, 5, 4]`, perform HEAP-EXTRACT-MAX **twice**. Which values are returned, and what is the heap after each call?
9. HEAP-SORT `[4, 2, 6, 1, 3, 5, 7]`. Its BUILD-MAX-HEAP gives `[7, 3, 6, 1, 2, 5, 4]`. Give the whole array after **It-1** and after **It-2**.
10. **MCQ.** As stated in class, the running time of Build_Heap is: (a) O(log n) (b) O(n) (c) O(n log n) (d) O(n²).
11. **Heap-sort reasoning.**
    - (a) Using the slide's argument, explain why heap sort is O(n log n).
    - (b) True or false: the class HEAP-SORT builds a **min**-heap in order to sort in ascending order.
12. **Complexity tables.**
    - (a) MCQ: which statement matches the class comparison tables? (i) Heapsort worst case is O(n²). (ii) Heapsort auxiliary space is O(1). (iii) Mergesort auxiliary space is O(1). (iv) Radix sort worst case is O(n²).
    - (b) In the D09-S3 table, what is the cost of "Find Minimum" for Heap(Min)?
13. Apply BucketSort ([D10-S11]) to `S = [2, 0, 3, 2, 1, 0, 2]` with m = 4. Give b after the counting loop and the final S. State the time complexity.
14. You must sort 1000 integers whose maximum value is 999999.
    - Why is plain bucket sort a poor choice?
    - What does the deck use instead, and how many buckets and passes does it need?
15. Radix-sort `[43, 7, 91, 25, 70, 38, 15, 62]`. Give the buckets and the list after each pass.
16. In the slide's radix example ([D10-S19–S20]), the first-pass list ends "…88, 9, 99". Is this consistent with [D10-S18] step 3b? Does it change the final answer?
17. Using the bucket rule shown in the floating-point figure ([D10-S14]), which bucket does each of 0.47, 0.05, 0.91, 0.40 and 0.68 go to? What is the output?
18. Using the class conventions ([D10-S29]), radix-sort the words **bed, ad, bad, be**.
    - Show each pass.
    - What would the result be if the space bucket were kept at the **beginning** instead?
19. Why must every bucket-sort stage of radix sort be **stable**? Use the 52/58 example.
20. **MCQ.**
    - (a) Which of these is **not** comparison-based? Heap sort / Merge sort / Radix sort / Quick sort.
    - (b) Bucket sort and radix sort are O(n) because: they use heaps / of restrictions on the input / they are recursive / they compare keys cleverly.

### Answers

1. **0-based, i = 4:** L = 2·4+1 = **9**, R = 2·4+2 = **10**, P = ceil(4/2)−1 = **1**.
   **1-based, i = 5:** L = 2·5 = **10**, R = 2·5+1 = **11**, P = floor(5/2) = **2**. [D09-S9]
2. **1-based:** the leaves are **6…10**, and the loop starts at floor(10/2) = **5**.
   **0-based:** the leaves are **5…9**, and the loop starts at floor(10/2)−1 = **4**. [D09-S9, S10]
   (The slide writes the 0-based range as "[floor(n/2) to n]". The correct upper end is n−1 ⚠️.)
3. (a) 2^(3+1) − 1 = **15**. (b) **True**: a perfect tree is "both full and complete". (c) **No**: node 2 has only one child (5). [D09-S4, S9]
4. (i) **Yes**: this is Heap 1 [D09-S8].
   (ii) **No**: 7 at index 2 is larger than its parent 6. This is the D09-S11 result.
   (iii) **Yes**: a descending array is a max-heap [D09-S10].
   (iv) **Yes**: this is Heap 2 [D09-S8].
5. **(b)** [D09-S10 footnote]. The A2 solution writes it as "Non leaf nodes (n/2)−1 to 0".
6. Steps:
   - i=2: swap A[2]↔A[5], giving `[11,19,30,12,15,7]`.
   - i=1: no swap (19 ≥ 12 and 19 ≥ 15).
   - i=0: swap A[0]↔A[2], giving `[30,19,11,12,15,7]`. The recursive call at index 2 exits (11 ≥ 7).
   - **Heap: `[30, 19, 11, 12, 15, 7]`** (§5 T9) [A2].
7. Steps:
   - swap 0↔1, giving `[20,5,9,14,8,2,1]`;
   - swap 1↔3, giving `[20,14,9,5,8,2,1]`;
   - exit at index 3 (l = 7 and r = 8 are (X)).
   - **Yes**, the result is a max-heap (verified), because the rest of the tree was already in heap order (9 ≥ 2, 1). Compare [D09-S11], where a single call left 7 above 6. [D09-S10, S11]
8. **First call** returns **7**, leaving `[6, 3, 5, 1, 2, 4]` ([D09-S15]).
   **Second call** returns **6**:
   - A[0] ← A[5] = 4, giving `[4,3,5,1,2]`;
   - heapify(0) picks largest = 2 (5 > 3) and swaps 0↔2, giving **`[5, 3, 4, 1, 2]`**;
   - index 2 has no children (X), so it exits.
   [D09-S15, S17]
9. **It-1:** exchange 0↔6, giving `[4,3,6,1,2,5 | 7]`. Heapify (swap 0↔2, then 2↔5) gives **`[6, 3, 5, 1, 2, 4, 7]`**.
   **It-2:** exchange 0↔5, giving `[4,3,5,1,2 | 6,7]`. Heapify (swap 0↔2) gives **`[5, 3, 4, 1, 2, 6, 7]`**.
   The heap part is the same as in Q8: extract and heap-sort do the same heap work, but heap-sort parks each maximum at the end of the array. [D09-S21, S22]
10. **(b) O(n)** [D09-S17].
11. (a) Build_Heap costs O(n). Max-Heapify costs O(log n) and is applied n−1 times. The total is therefore **O(n log n)** [D09-S21].
    (b) **False.** HEAP-SORT calls BUILD-MAX-HEAP and still outputs ascending order, e.g. `[3,7,8,12,21,23]` [D09-S21, S22]. The S19 note only restates that an ascending array is a min-heap ⚠️.
12. (a) **(ii)** Heapsort auxiliary space is O(1) [D10-S3, S4]. (b) **O(1)** [D09-S3].
13. **b = [2, 1, 3, 1]**. S = **`[0, 0, 1, 2, 2, 2, 3]`**. The time is **O(n + m)**, which is O(n) when m is small compared with n [D10-S11, S13].
14. It would need **1 million buckets**. Since m >>> n, the cost is O(m), not O(n) [D10-S16].
    The deck uses **radix sort** instead [D10-S17, S24, S25]:
    - **10 buckets**, reused at every pass;
    - **6 passes**, the number of digits in 999999;
    - time **O(pn)**, which is O(n) for fixed p.
15. **Pass 1 (ones digit):**
    - buckets 0: 70 · 1: 91 · 2: 62 · 3: 43 · 5: 25, 15 · 7: 7 · 8: 38
    - list: **70, 91, 62, 43, 25, 15, 7, 38**

    **Pass 2 (tens digit; 7 counts as 07):**
    - buckets 0: 7 · 1: 15 · 2: 25 · 3: 38 · 4: 43 · 6: 62 · 7: 70 · 9: 91
    - list: **7, 15, 25, 38, 43, 62, 70, 91** [D10-S18, S21]
16. **Not consistent.** 99 comes before 9 in the input, and both have ones digit 9. Collecting in placement order gives "…88, **99, 9**".
    The final result is **unchanged**: in pass 2, 9 goes to bucket 0 and 99 to bucket 9 [D10-S18, S20, S21] ⚠️.
17. The buckets are 0.47 → **4**, 0.05 → **0**, 0.91 → **9**, 0.40 → **4**, 0.68 → **6**. Bucket 4's list is 0.40 → 0.47.
    Output: **0.05, 0.40, 0.47, 0.68, 0.91** [D10-S14].
18. L = 3; padded words: `bed`, `ad␣`, `bad`, `be␣`.
    - Pass 1 (3rd char): d: bed, bad · ␣: ad␣, be␣ → bed, bad, ad␣, be␣
    - Pass 2 (2nd char): a: bad · d: ad␣ · e: bed, be␣ → bad, ad␣, bed, be␣
    - Pass 3 (1st char): a: ad␣ · b: bad, bed, be␣ → **ad, bad, bed, be**

    With the **space bucket first**, the result is **ad, bad, be, bed** (verified). The convention matters when one word is a prefix of another; follow the class convention in the exam. [D10-S25, S29]
19. Each pass must keep the order produced by the earlier, less significant passes [D10-S23]:
    - After pass 1 (ones digit), 52 is before 58.
    - In pass 2 both go to bucket 5. A stable stage keeps 52 before 58.
    - An unstable stage could output 58, 52, and the sort would be wrong.
20. (a) **Radix sort** [D10-S6; D06-S3]. (b) **Restrictions on the input** [D10-S26]; comparison sorts need at least n log n [D10-S5].

---

## 7. Self-check

- [ ] **Trees.** I can define full, complete and perfect binary trees and classify any drawn tree, as in the A–D quiz [D09-S4–S6].
- [ ] **Heaps.** I can state the two heap properties (heap structure and partial order) and decide quickly whether an array is a max-heap [D09-S7, S8, S10].
- [ ] **Indexes.** I can write the left/right/parent formulas for 1-based and 0-based arrays, the leaf range, and where the BUILD loop starts, without mixing the two conventions [D09-S9, S10].
- [ ] **Pseudocode.** I can write MAX-HEAPIFY, BUILD-MAX-HEAP, HEAP-EXTRACT-MAX and HEAP-SORT from memory and convert them to 0-based form [D09-S10, S15, S21].
- [ ] **Build trace.** I can trace BUILD-MAX-HEAP in the A2 table format, including the recursive calls and "(X)" children, in a few minutes [D09-S13; A2].
- [ ] **Extract and sort.** I can trace HEAP-EXTRACT-MAX and every HEAP-SORT iteration, marking the shrinking heap and the growing sorted part [D09-S15, S22].
- [ ] **Complexities.** I can quote them exactly as taught and justify heap sort's O(n log n) with the "n−1 heapify calls" argument [D09-S17, S21; D10-S3, S4]:
  - Max-Heapify O(log n) and Extract O(log n);
  - Build O(n);
  - Heapsort O(n log n) with O(1) extra space;
  - Bucket O(n+m), or O(m) when m >>> n;
  - Radix O(pn).
- [ ] **Bucket sort.** I can run the D10-S11 BucketSort (counts, then write-back), explain values-versus-entries (counter versus queue), and say when bucket sort degrades to O(m) [D10-S11–S13, S16].
- [ ] **Radix sort.** I can radix-sort integers pass by pass, collecting in placement order, and explain why stability matters. I can also radix-sort words with the class conventions (right→left, blanks at the end, blank bucket last) [D10-S18–S25, S29].
- [ ] **Slide slips.** I can recognise the slips that could trip me up in the exam:
  - "0(…)" typos and the Heap(Min) Delete O(1) vs Extract O(log n) clash [D09-S3, S17];
  - the 0-based leaf range "to n" that should be "to n−1" [D09-S9];
  - "Exit-heapify(A,4)" that should be (A,6) [D09-S13];
  - the extra "for i→1" row [D09-S22];
  - "i ← i + 10" [D10-S13];
  - 0.94 outside the stated "0.0–0.9" range [D10-S14];
  - "…88, 9, 99" that should be "…88, 99, 9" [D10-S20];
  - "i=3 exit" that should be "i=4 exit" in the A2 sample solution.
