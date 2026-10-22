# Sorting Algorithms: Exam-Oriented Outside Notes (SOC3030-003 Computer Algorithms, Inha University in Tashkent, Fall 2026 midterm)

These notes are outside material only, compiled on 2026-10-19 from free external sources: MIT OCW 6.006, Jeff Erickson's *Algorithms*, the Princeton *algs4* booksite, Wikipedia, VisuAlgo and the USF visualizations. No class slides, no assignment files and no pirated textbook copies were used.

Conventions used throughout:
- Arrays are 1-based (the CLRS convention) unless a section says "0-based".
- A "comparison" means a key comparison: `A[i] > key`, `A[j] <= x`, `L[i] <= R[j]`, `A[l] > A[i]`. Index tests such as `i > 0` are not counted.
- In insertion sort, "pass j" is one iteration of the outer for loop, and the first pass is j = 2.
- Every trace and count shown in a code block was printed by a Python script that mirrors the pseudocode line by line (run on 2026-10-19). The outputs are pasted without edits.

Contents: 1 Insertion sort · 2 Quicksort · 3 Merge sort · 4 Heapsort and priority queues · 5 Counting, radix and bucket sort · 6 Comparison lower bound · 7 Master complexity table and recurrences · 8 Common traps · 9 Twenty practice problems with solutions · 10 Free resources and visualizers

---

## 1. Insertion sort: loop invariant, comparisons and shifts in the best and worst cases, and a trace

### Takeaway
Insertion sort is stable, in place, online and adaptive. The number of shifts equals the number of inversions I, and the number of comparisons lies between I and I + n − 1. The best case (already sorted) costs n − 1 comparisons and 0 shifts. The worst case (reverse sorted) costs n(n−1)/2 comparisons and n(n−1)/2 shifts. On average both counts are about n²/4.

### Cited Findings
- "For randomly ordered arrays of length N with distinct keys, insertion sort uses ~N²/4 compares and ~N²/4 exchanges on the average. The worst case is ~N²/2 compares and ~N²/2 exchanges and the best case is N−1 compares and 0 exchanges." — [algs4 §2.1 Elementary Sorts](https://algs4.cs.princeton.edu/21elementary/)
- An inversion is a pair of keys that is out of order. "The number of exchanges used by insertion sort is equal to the number of inversions in the array, and the number of compares is at least equal to the number of inversions and at most equal to the number of inversions plus the array size." — [algs4 §2.1](https://algs4.cs.princeton.edu/21elementary/)
- Insertion sort works well on "partially-sorted" arrays, meaning arrays whose number of inversions is at most a constant times the array size. — [algs4 §2.1](https://algs4.cs.princeton.edu/21elementary/)
- Insertion sort is adaptive: it runs in O(kn) when each element is at most k places from its sorted position. It is also stable, in place (O(1) extra memory) and online. Its best case (already sorted) is linear, with one comparison per element. Its worst case (reverse sorted) and its average case are quadratic. — [Wikipedia: Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort)
- "Good quicksort implementations use insertion sort for arrays smaller than a certain threshold", typically around ten elements. — [Wikipedia: Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort). algs4 recommends a cutoff "between 5 and 15". — [algs4 §2.3](https://algs4.cs.princeton.edu/23quicksort/)
- The MIT 6.006 summary table lists Insertion Sort as n², in-place Y, stable Y, with the comment "O(nk) for k-proximate". — [MIT 6.006 S20 Lecture 5 notes (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf)
- "In-place priority queue sort with Sorted Array is exactly Insertion Sort". — [MIT 6.006 S20 Lecture 8 notes (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/40d4851e550507ca14dc778b9b2266cc_MIT6_006S20_lec8.pdf)
- Definition: "A sorting method is stable if it preserves the relative order of equal keys in the array." — [algs4 §2.5](https://algs4.cs.princeton.edu/25applications/)

### Inferences

#### Pseudocode (CLRS 3rd-edition style)
```
INSERTION-SORT(A)
1  for j = 2 to A.length
2      key = A[j]
3      // Insert A[j] into the sorted sequence A[1 .. j-1].
4      i = j - 1
5      while i > 0 and A[i] > key
6          A[i + 1] = A[i]          // shift one place right
7          i = i - 1
8      A[i + 1] = key
```
The 4th edition writes this as `INSERTION-SORT(A, n)`. The logic is the same (see Gaps).

#### Loop invariant proof (initialization, maintenance, termination)
- **Invariant:** At the start of each iteration of the for loop with index j, the subarray A[1..j−1] holds exactly the elements originally in A[1..j−1], in sorted order.
- **Initialization:** When j = 2, A[1..1] is a single element, so it is trivially sorted.
- **Maintenance:** The while loop shifts A[j−1], A[j−2], … one place right as long as each of them is > key, then drops key into the hole. After that, A[1..j] holds the original A[1..j] in sorted order, so incrementing j restores the invariant. A formal proof would add a second invariant for the while loop.
- **Termination:** The loop exits when j = n + 1. Substituting into the invariant, A[1..n] is the whole array, in sorted order.
- **Why it is stable:** The test is the strict `A[i] > key`, so an element equal to key is never shifted past it.

#### Verified trace: A = ⟨5, 2, 4, 6, 1, 3⟩
```
start          : [5, 2, 4, 6, 1, 3]
pass j=2 key=  2: 1 cmp, 1 shift -> [2, 5, 4, 6, 1, 3]
pass j=3 key=  4: 2 cmp, 1 shift -> [2, 4, 5, 6, 1, 3]
pass j=4 key=  6: 1 cmp, 0 shift -> [2, 4, 5, 6, 1, 3]
pass j=5 key=  1: 4 cmp, 4 shift -> [1, 2, 4, 5, 6, 3]
pass j=6 key=  3: 4 cmp, 3 shift -> [1, 2, 3, 4, 5, 6]
TOTAL: 12 comparisons, 9 shifts (inversions = 9)
```
Best case (sorted) and worst case (reverse sorted), n = 6, verified:
```
start          : [1, 2, 3, 4, 5, 6]        (every pass: 1 cmp, 0 shift)
TOTAL: 5 comparisons, 0 shifts (inversions = 0)
start          : [6, 5, 4, 3, 2, 1]
pass j=2 key=  5: 1 cmp, 1 shift -> [5, 6, 4, 3, 2, 1]
pass j=3 key=  4: 2 cmp, 2 shift -> [4, 5, 6, 3, 2, 1]
pass j=4 key=  3: 3 cmp, 3 shift -> [3, 4, 5, 6, 2, 1]
pass j=5 key=  2: 4 cmp, 4 shift -> [2, 3, 4, 5, 6, 1]
pass j=6 key=  1: 5 cmp, 5 shift -> [1, 2, 3, 4, 5, 6]
TOTAL: 15 comparisons, 15 shifts (inversions = 15)
```
Stability demonstration on ⟨3a, 1, 3b, 2, 3c⟩, where the letters tag equal keys:
```
start          : [3a, 1, 3b, 2, 3c]
pass j=2 key=  1: 1 cmp, 1 shift -> [1, 3a, 3b, 2, 3c]
pass j=3 key= 3b: 1 cmp, 0 shift -> [1, 3a, 3b, 2, 3c]
pass j=4 key=  2: 3 cmp, 2 shift -> [1, 2, 3a, 3b, 3c]
pass j=5 key= 3c: 1 cmp, 0 shift -> [1, 2, 3a, 3b, 3c]
TOTAL: 6 comparisons, 3 shifts (inversions = 3)
```

#### Exact counts (checked by brute force over all n! permutations for n = 2..7)
| Case | Input | Key comparisons | Shifts |
|---|---|---|---|
| Best | sorted | n − 1 | 0 |
| Worst | strictly decreasing | n(n−1)/2 | n(n−1)/2 |
| Average (random distinct keys) | — | n(n−1)/4 + n − H_n | n(n−1)/4 |
| Any input with I inversions | — | I + (n − 1) − m | I |

Here H_n = 1 + 1/2 + … + 1/n, and m is the number of passes j ≥ 2 whose key is smaller than everything before it. Such a pass ends because i reaches 0, not because a comparison fails, so it saves one comparison. Check on ⟨5,2,4,6,1,3⟩: 9 + 5 − 2 = 12, since keys 2 and 1 were new minima. The brute force for n = 7 gave average comparisons 14.9071, which equals the formula exactly, and average shifts 21/2.
- Running time is Θ(n + I): Θ(n) on sorted input and Θ(n²) in the worst case.
- As a recursion: T(n) = T(n−1) + Θ(n) in the worst case, which gives Θ(n²).

### Gaps
- I could not quote CLRS's own wording of the loop invariant or its exact 4th-edition pseudocode, because I had no legal online copy. The invariant above is the standard one in my own words, and the pseudocode was checked by a line-by-line script.

---

## 2. Quicksort: Lomuto vs Hoare (with traces), worst vs balanced recurrences, average case, randomized pivot, median-of-three, tail recursion and stack depth

### Takeaway
All of quicksort's work happens in PARTITION, which costs Θ(n) per call. Balanced splits give T(n) = 2T(n/2) + Θ(n) = Θ(n lg n). Maximally unbalanced splits give T(n) = T(n−1) + Θ(n) = Θ(n²), with exactly n(n−1)/2 comparisons. With a last-element Lomuto pivot, sorted, reverse-sorted and all-equal inputs all produce this worst case. A random pivot makes the expected comparison count 2(n+1)H_n − 4n ≈ 1.39 n lg n on every input. Hoare's scheme does fewer swaps and splits equal keys evenly, but it returns a split point rather than the pivot's final position. Recursing on the smaller side first bounds the stack depth by lg n.

### Cited Findings
**Partition schemes**
- Erickson presents the Lomuto partition ("the one I'm presenting here is attributed to Nico Lomuto") and notes: "Hoare proposed a more complicated 'two-way' partitioning algorithm that has some practical advantages over Lomuto's algorithm. On the other hand, Hoare's partitioning algorithm is one of the places off-by-one errors go to die." — [Erickson, *Algorithms*, Ch. 1 (PDF)](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- Erickson states the Lomuto loop invariant: "At the end of each iteration of the main loop, everything in the subarray A[1 .. ℓ] is less than A[n], and nothing in the subarray A[ℓ + 1 .. i] is less than A[n]." — [Erickson Ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- With Lomuto, "The complexity of Quicksort with this scheme degrades to O(n²) when the array is already in order". It also performs poorly when all elements are equal. "Hoare's scheme is more efficient than Lomuto's partition scheme because it does three times fewer swaps on average." With Hoare, "the index returned in the partition function isn't necessarily where the actual pivot is", and the recursion is on (lo..p) and (p+1..hi) instead of Lomuto's (lo..p−1) and (p+1..hi). — [Wikipedia: Quicksort](https://en.wikipedia.org/wiki/Quicksort)
- algs4's partition makes both scans stop on keys equal to the pivot. This is "crucial to avoiding quadratic running time in certain typical applications". With all keys equal it uses "~N lg N compares. Each partition will divide the array in half, plus or minus one." — [algs4 §2.3 Quicksort](https://algs4.cs.princeton.edu/23quicksort/)

**Analysis**
- Erickson gives T(n) = T(r−1) + T(n−r) + O(n), where r is the pivot's rank. A median pivot gives T(n) ≤ 2T(n/2) + O(n) = O(n log n). "In the worst case, the two subproblems are completely unbalanced—either r = 1 or r = n—and the recurrence becomes T(n) ≤ T(n−1) + O(n). The solution is T(n) = O(n²)." — [Erickson Ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- If the pivot always lands in the middle third, then T(n) ≤ T(n/3) + T(2n/3) + O(n). Each level sums to at most n, and the depth is log_{3/2} n, so T(n) = O(n log n). "The fact that the recursion tree is unbalanced simply doesn't matter." In the worst-case tree, "every level value is at most n and there are at most n levels", and the bound is tight "because n/2 levels each have value at least n/2." — [Erickson Ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- Median-of-three "is somewhat more efficient in practice … especially when the array is already (nearly) sorted, [but] we can still have r = 2 or r = n − 1 in the worst case", which gives T(n) ≤ T(1) + T(n−2) + O(n) = O(n²). — [Erickson Ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- "If we choose the pivot index p uniformly at random, then QuickSort runs in O(n log n) time with high probability, for every possible input array." Here the randomness is controlled by the algorithm, not by an adversary. The usual "average case" argument instead assumes "that all permutations of the input array are equally likely", which Erickson calls "completely unrealistic". — [Erickson Ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- Erickson's indicator-variable analysis of the quicksort-like nuts-and-bolts algorithm: two items are compared "if and only if the first pivot chosen from the set {Bi, …, Bj} is either Bi or Bj". The probability of that is 2/(j − i + 1). — [Erickson, randomized algorithms notes (PDF)](http://jeffe.cs.illinois.edu/teaching/algorithms/notes/02-nutsbolts.pdf)
- "Quicksort uses ~2 N ln N compares (and one-sixth that many exchanges) on the average to sort an array of length N with distinct keys." "Quicksort uses ~N²/2 compares in the worst case, but random shuffling protects against this case." — [algs4 §2.3](https://algs4.cs.princeton.edu/23quicksort/)
- The average comparison count is C(n) = 2n ln n ≈ 1.39 n log₂ n, and median-of-three lowers the expected count to about 1.188 n log₂ n. — [Wikipedia: Quicksort](https://en.wikipedia.org/wiki/Quicksort)
- VisuAlgo describes the worst case this way: "The first partition takes O(N) time, splits A into 0, 1, N−1 items … This is the classic N+(N−1)+(N−2)+...+1 pattern, which is O(N²)." — [VisuAlgo: Sorting](https://visualgo.net/en/sorting)

**Pivot strategies, stack depth and practice**
- To keep stack space at O(log n), "Recur first into the smaller side of the partition, then use a tail call to recur into the other". — [Wikipedia: Quicksort](https://en.wikipedia.org/wiki/Quicksort)
- algs4's suggested improvements are a cutoff to insertion sort for tiny subarrays (5–15), median-of-three partitioning, and 3-way partitioning. "Quicksort with 3-way partitioning is entropy-optimal." — [algs4 §2.3](https://algs4.cs.princeton.edu/23quicksort/)
- Quicksort is not stable. "In most practical situations, quicksort is the method of choice. If stability is important and space is available, mergesort might be best." — [algs4 §2.5](https://algs4.cs.princeton.edu/25applications/)

### Inferences

#### Pseudocode (CLRS 3rd-edition style)
```
QUICKSORT(A, p, r)                      // initial call: QUICKSORT(A, 1, A.length)
1  if p < r
2      q = PARTITION(A, p, r)
3      QUICKSORT(A, p, q - 1)
4      QUICKSORT(A, q + 1, r)

PARTITION(A, p, r)                      // Lomuto; pivot = last element
1  x = A[r]
2  i = p - 1
3  for j = p to r - 1
4      if A[j] <= x
5          i = i + 1
6          exchange A[i] with A[j]
7  exchange A[i + 1] with A[r]
8  return i + 1
```
Lomuto invariant (CLRS form): at the start of each iteration with index j, A[p..i] ≤ x, A[i+1..j−1] > x, A[r] = x, and A[j..r−1] is not yet examined. PARTITION always makes exactly r − p comparisons.

```
HOARE-PARTITION(A, p, r)                // CLRS Problem 7-1; pivot = FIRST element
1  x = A[p]
2  i = p - 1
3  j = r + 1
4  while TRUE
5      repeat
6          j = j - 1
7      until A[j] <= x
8      repeat
9          i = i + 1
10     until A[i] >= x
11     if i < j
12         exchange A[i] with A[j]
13     else return j

QUICKSORT-HOARE(A, p, r)
1  if p < r
2      q = HOARE-PARTITION(A, p, r)
3      QUICKSORT-HOARE(A, p, q)            // q, NOT q - 1
4      QUICKSORT-HOARE(A, q + 1, r)
```
After HOARE-PARTITION, every element of A[p..q] is ≤ every element of A[q+1..r], and p ≤ q < r, so both sides are non-empty. That is why the recursion uses q rather than q − 1. The pivot is not necessarily at index q.

```
RANDOMIZED-PARTITION(A, p, r)
1  i = RANDOM(p, r)
2  exchange A[r] with A[i]
3  return PARTITION(A, p, r)

RANDOMIZED-QUICKSORT(A, p, r)
1  if p < r
2      q = RANDOMIZED-PARTITION(A, p, r)
3      RANDOMIZED-QUICKSORT(A, p, q - 1)
4      RANDOMIZED-QUICKSORT(A, q + 1, r)

MEDIAN-OF-3-PARTITION(A, p, r)
1  m = ⌊(p + r) / 2⌋
2  let k ∈ {p, m, r} be the index of the median of A[p], A[m], A[r]
3  exchange A[k] with A[r]
4  return PARTITION(A, p, r)

TAIL-RECURSIVE-QUICKSORT(A, p, r)       // recurse on the smaller side, loop on the larger
1  while p < r
2      q = PARTITION(A, p, r)
3      if q - p < r - q
4          TAIL-RECURSIVE-QUICKSORT(A, p, q - 1)
5          p = q + 1
6      else TAIL-RECURSIVE-QUICKSORT(A, q + 1, r)
7          r = q - 1
```

#### Verified trace 1: Lomuto PARTITION(A, 1, 8) on ⟨2, 8, 7, 1, 3, 5, 6, 4⟩ (pivot 4)
```
PARTITION(A,1,8): pivot x=A[8]=4; i=0
  j=1: A[j]=2 <= 4: i=1, self-exchange                  [2, 8, 7, 1, 3, 5, 6, 4]
  j=2: A[j]=8 >  4: no change                         [2, 8, 7, 1, 3, 5, 6, 4]
  j=3: A[j]=7 >  4: no change                         [2, 8, 7, 1, 3, 5, 6, 4]
  j=4: A[j]=1 <= 4: i=2, exchange A[2]=8 <-> A[4]=1     [2, 1, 7, 8, 3, 5, 6, 4]
  j=5: A[j]=3 <= 4: i=3, exchange A[3]=7 <-> A[5]=3     [2, 1, 3, 8, 7, 5, 6, 4]
  j=6: A[j]=5 >  4: no change                         [2, 1, 3, 8, 7, 5, 6, 4]
  j=7: A[j]=6 >  4: no change                         [2, 1, 3, 8, 7, 5, 6, 4]
  final exchange A[4] <-> A[8]: [2, 1, 3, 4, 7, 5, 6, 8]  return q=4
stats: {'cmp': 7, 'xchg': 4}
```
The exchange count includes the self-exchange at j = 1 and the final exchange on line 7.

#### Verified trace 2: full Lomuto QUICKSORT on the same array (each PARTITION result)
```
QUICKSORT(A,1,8): pivot ends at q=4; A[1..8] = [2, 1, 3, 4, 7, 5, 6, 8]; whole = [2, 1, 3, 4, 7, 5, 6, 8]
  QUICKSORT(A,1,3): pivot ends at q=3; A[1..3] = [2, 1, 3]; whole = [2, 1, 3, 4, 7, 5, 6, 8]
    QUICKSORT(A,1,2): pivot ends at q=1; A[1..2] = [1, 2]; whole = [1, 2, 3, 4, 7, 5, 6, 8]
  QUICKSORT(A,5,8): pivot ends at q=8; A[5..8] = [7, 5, 6, 8]; whole = [1, 2, 3, 4, 7, 5, 6, 8]
    QUICKSORT(A,5,7): pivot ends at q=6; A[5..7] = [5, 6, 7]; whole = [1, 2, 3, 4, 5, 6, 7, 8]
sorted: [1, 2, 3, 4, 5, 6, 7, 8] stats: {'cmp': 15, 'xchg': 14, 'maxdepth': 3}
```
Total comparisons: 7 + 2 + 1 + 3 + 2 = 15.

#### Verified trace 3: HOARE-PARTITION(A, 1, 12) on ⟨13, 19, 9, 5, 12, 8, 7, 4, 11, 2, 6, 21⟩ (pivot 13)
```
HOARE-PARTITION(A,1,12): pivot x=A[1]=13; i=0, j=13
  stop at i=1 (A[i]=13), j=11 (A[j]=6); i<j -> exchange: [6, 19, 9, 5, 12, 8, 7, 4, 11, 2, 13, 21]
  stop at i=2 (A[i]=19), j=10 (A[j]=2); i<j -> exchange: [6, 2, 9, 5, 12, 8, 7, 4, 11, 19, 13, 21]
  stop at i=10 (A[i]=19), j=9 (A[j]=11); i>=j -> return j=9
result: [6, 2, 9, 5, 12, 8, 7, 4, 11, 19, 13, 21] q = 9 stats: {'cmp': 14, 'xchg': 2}
```
The pivot 13 ends at index 11, not at the returned q = 9. The guarantee is only that A[1..9] ≤ 13 ≤ A[10..12].

#### Verified trace 4: full Hoare QUICKSORT on ⟨2, 8, 7, 1, 3, 5, 6, 4⟩ (pivot = first element)
```
HOARE-PARTITION(A,1,8): pivot x=A[1]=2; i=0, j=9
  stop at i=1 (A[i]=2), j=4 (A[j]=1); i<j -> exchange: [1, 8, 7, 2, 3, 5, 6, 4]
  stop at i=2 (A[i]=8), j=1 (A[j]=1); i>=j -> return j=1

QUICKSORT(A,1,8): HOARE-PARTITION returned q=1; A[1..8] = [1, 8, 7, 2, 3, 5, 6, 4]; whole = [1, 8, 7, 2, 3, 5, 6, 4]
  QUICKSORT(A,2,8): HOARE-PARTITION returned q=7; A[2..8] = [4, 7, 2, 3, 5, 6, 8]; whole = [1, 4, 7, 2, 3, 5, 6, 8]
    QUICKSORT(A,2,7): HOARE-PARTITION returned q=3; A[2..7] = [3, 2, 7, 4, 5, 6]; whole = [1, 3, 2, 7, 4, 5, 6, 8]
      QUICKSORT(A,2,3): HOARE-PARTITION returned q=2; A[2..3] = [2, 3]; whole = [1, 2, 3, 7, 4, 5, 6, 8]
      QUICKSORT(A,4,7): HOARE-PARTITION returned q=6; A[4..7] = [6, 4, 5, 7]; whole = [1, 2, 3, 6, 4, 5, 7, 8]
        QUICKSORT(A,4,6): HOARE-PARTITION returned q=5; A[4..6] = [5, 4, 6]; whole = [1, 2, 3, 5, 4, 6, 7, 8]
          QUICKSORT(A,4,5): HOARE-PARTITION returned q=4; A[4..5] = [4, 5]; whole = [1, 2, 3, 4, 5, 6, 7, 8]
sorted: [1, 2, 3, 4, 5, 6, 7, 8] stats: {'cmp': 46, 'xchg': 8, 'maxdepth': 6}
```
The same array produces a completely different recursion tree under the two schemes, because Hoare uses the first element (2) as the pivot. On an exam, always check which pivot rule is specified.

Verified failure: running Hoare partition with Lomuto-style recursion `(p, q-1)` and `(q+1, r)` on ⟨6, 3, 9, 1, 8, 2, 7, 5⟩ produced `[2, 3, 5, 1, 6, 7, 8, 9]`, which is not sorted.

#### Worst, best and average case: recurrences and verified numbers
- **Worst case:** T(n) = T(n−1) + T(0) + Θ(n) = Θ(n²), with exactly (n−1) + (n−2) + … + 1 = n(n−1)/2 comparisons. Verified on sorted ⟨1..8⟩ with a last-element pivot:
```
QUICKSORT(A,1,8) -> q=8 (split sizes 7 and 0)
  QUICKSORT(A,1,7) -> q=7 (split sizes 6 and 0)
    QUICKSORT(A,1,6) -> q=6 (split sizes 5 and 0)
      QUICKSORT(A,1,5) -> q=5 (split sizes 4 and 0)
        QUICKSORT(A,1,4) -> q=4 (split sizes 3 and 0)
          QUICKSORT(A,1,3) -> q=3 (split sizes 2 and 0)
            QUICKSORT(A,1,2) -> q=2 (split sizes 1 and 0)
total comparisons: 28 = n(n-1)/2 = 28 max recursion depth: 7
```
  For n = 6, sorted, reverse-sorted and all-equal inputs each took 15 comparisons (see Practice Problem 7). Hoare with a first-element pivot is also quadratic on sorted input. Verified: n = 8 took 42 comparisons with splits 1 | 7, 1 | 6, …; n = 64 took 2,142 comparisons with recursion depth 63.
- **Best case and any constant-proportion split:** T(n) = 2T(n/2) + Θ(n) = Θ(n lg n). A 9:1 split, T(n) = T(9n/10) + T(n/10) + Θ(n), is still Θ(n lg n): every level costs ≤ cn and there are log_{10/9} n = O(lg n) levels. The smallest possible comparison count, found by brute force, is 10 for n = 7 and 13 for n = 8.
- **Average case** (all permutations equally likely, or a random pivot on any input): C(n) = (n − 1) + (2/n) Σ_{k=0}^{n−1} C(k), with C(0) = C(1) = 0.
  - Multiply by n and subtract the n − 1 version: nC(n) = (n+1)C(n−1) + 2(n−1).
  - Divide by n(n+1) and telescope: C(n) = 2(n+1)H_n − 4n ≈ 2n ln n ≈ 1.39 n lg n.
  - Checked exactly over all permutations for n = 2..8. For example, n = 8 averages 16.9214, matching the formula.
  - Checked by simulation for random quicksort: at n = 1000 the mean over 200 runs was 10,943.9, against the formula's 10,985.9.
  - The leading term alone overestimates at moderate n: 2n ln n = 13,815.5 at n = 1000, because 2(n+1)H_n − 4n ≈ 2n ln n − 2.85n.
- **Indicator-variable route** (the CLRS-style argument, using Erickson's probability): E[comparisons] = Σ_{i<j} 2/(j−i+1) < Σ_{i=1}^{n−1} 2H_n = O(n lg n).
- **Average-case intuition:**
  - A random pivot has rank between n/10 and 9n/10 with probability about 0.8, and even a constant 9:1 split keeps the depth at O(lg n).
  - A bad split (n−1 : 0) followed by a good split costs Θ(n) + Θ(n) = Θ(n) and still yields balanced pieces. The bad split is absorbed into the good level, so alternating good and bad splits remains Θ(n lg n).
- **Randomized quicksort:** The worst case is still Θ(n²), reached only if the random pivots are repeatedly extreme, which has negligible probability. The expected time is Θ(n lg n) for every input, because the expectation is over the algorithm's coin flips, not over the inputs.

#### Equal keys and swaps, Lomuto vs Hoare (verified)
| n (all keys equal) | Lomuto comparisons / max depth | Hoare comparisons / max depth |
|---|---|---|
| 8 | 28 / 7 | 38 / 3 |
| 64 | 2,016 / 63 | 510 / 6 |
| 512 | 130,816 / 511 | 5,630 / 9 |

With equal keys, Lomuto's `A[j] <= x` is always true, so q = r every time and the recursion degrades to the quadratic chain. Hoare's scans stop on equal keys, so the splits stay balanced.

Exchanges on random permutations, measured at n = 1000 over 200 runs: Lomuto averaged about 5,014 non-trivial exchanges plus about 993 self-exchanges, and Hoare averaged about 2,345. That is 2.1 to 2.6 times fewer for Hoare at this size, depending on whether self-exchanges are counted. Wikipedia's "three times fewer" is the asymptotic average.

#### Median-of-three (verified on sorted ⟨1..7⟩)
```
median-of-three of A[1]=1, A[4]=4, A[7]=7 is 4 (index 4)
PARTITION(A,1,7): pivot x=A[7]=4; i=0
  j=1: A[j]=1 <= 4: i=1, self-exchange                  [1, 2, 3, 7, 5, 6, 4]
  j=2: A[j]=2 <= 4: i=2, self-exchange                  [1, 2, 3, 7, 5, 6, 4]
  j=3: A[j]=3 <= 4: i=3, self-exchange                  [1, 2, 3, 7, 5, 6, 4]
  j=4: A[j]=7 >  4: no change                         [1, 2, 3, 7, 5, 6, 4]
  j=5: A[j]=5 >  4: no change                         [1, 2, 3, 7, 5, 6, 4]
  j=6: A[j]=6 >  4: no change                         [1, 2, 3, 7, 5, 6, 4]
  final exchange A[4] <-> A[7]: [1, 2, 3, 4, 5, 6, 7]  return q=4
```
Median-of-three turns the sorted-input worst case into a perfect split. It does not help all-equal input, and adversarial inputs can still force O(n²) (Erickson).

#### Tail recursion and stack depth (verified, n = 900)
```
sorted: plain max depth = 899, smaller-first max depth = 1, lg n = 9.81
random: plain max depth = 19, smaller-first max depth = 8, lg n = 9.81
```
The smaller side has at most half the elements, so each nested recursive call at least halves the subproblem size, and the depth is ≤ lg n. The stack therefore stays O(lg n) even in the worst case. The running time does not change: it is still Θ(n²) in the worst case.

### Gaps
- Wikipedia's "three times fewer swaps" was reproduced only approximately (2.1 to 2.6 times at n = 1000). I found no primary derivation within my fetch budget.
- The HOARE-PARTITION, RANDOMIZED-QUICKSORT and tail-recursive pseudocode reconstructs CLRS Chapter 7 and Problems 7-1 and 7-4 from memory. I validated it by script but could not compare it with the book's text legally online.

---

## 3. Merge sort: the MERGE procedure with a trace, T(n) = 2T(n/2) + Θ(n), number of comparisons, space, and the bottom-up variant

### Takeaway
MERGE-SORT splits at q = ⌊(p+r)/2⌋ and costs T(n) = 2T(n/2) + Θ(n) = Θ(n lg n) on every input, so it is not adaptive.
- **One merge:** Merging n₁ + n₂ items takes between min(n₁, n₂) and n₁ + n₂ − 1 comparisons. With CLRS 3e sentinels it always takes exactly n₁ + n₂.
- **Whole sort:** The worst-case total is n⌈lg n⌉ − 2^⌈lg n⌉ + 1, and the extra space is Θ(n).
- **Stability:** Merge sort is stable when ties are taken from the left (≤).
- **Bottom-up:** This version merges runs of width 1, 2, 4, … in ⌈lg n⌉ passes.

### Cited Findings
- Erickson's three steps are: "Divide the input array into two subarrays of roughly equal size. Recursively mergesort each of the subarrays. Merge the newly-sorted subarrays into a single sorted array." The recurrence T(n) = T(⌈n/2⌉) + T(⌊n/2⌋) + O(n) simplifies to T(n) = 2T(n/2) + O(n), and "the 'all levels equal' case of the recursion tree method … immediately implies the closed-form solution T(n) = O(n log n)." Goldstine and von Neumann "actually described an non-recursive variant now usually called bottom-up mergesort." — [Erickson Ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- "Top-down mergesort uses between 1/2 N lg N and N lg N compares and at most 6 N lg N array accesses to sort any array of length N." Bottom-up mergesort has the same bounds. Mergesort "uses extra space proportional to N". Suggested improvements are a cutoff to insertion sort (10–15% faster), testing whether the array is already in order (linear time on sorted arrays), and eliminating the copy to the auxiliary array. — [algs4 §2.2 Mergesort](https://algs4.cs.princeton.edu/22mergesort/)
- "Mergesort is an asymptotically optimal compare-based sorting algorithm." — [algs4 §2.2](https://algs4.cs.princeton.edu/22mergesort/)
- The worst-case number of comparisons is n⌈lg n⌉ − 2^⌈lg n⌉ + 1, which lies between n lg n − n + 1 and n lg n + n + O(lg n). The recurrence is T(n) = 2T(n/2) + n. Bottom-up merges runs of width 1, 2, 4, 8, … and needs O(n) auxiliary memory. "Most implementations of merge sort are stable". Standard merge sort is not adaptive, while natural merge sort exploits existing runs. — [Wikipedia: Merge sort](https://en.wikipedia.org/wiki/Merge_sort)
- MIT's table lists Merge Sort as n log n, in-place N, stable Y, "stable, optimal comparison". The notes also say: "So merge sort is optimal in comparison model". — [MIT 6.006 S20 Lecture 5 (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf)

### Inferences

#### Pseudocode (CLRS 3rd edition, sentinel version)
```
MERGE(A, p, q, r)
1  n1 = q - p + 1
2  n2 = r - q
3  let L[1 .. n1 + 1] and R[1 .. n2 + 1] be new arrays
4  for i = 1 to n1
5      L[i] = A[p + i - 1]
6  for j = 1 to n2
7      R[j] = A[q + j]
8  L[n1 + 1] = ∞
9  R[n2 + 1] = ∞
10 i = 1
11 j = 1
12 for k = p to r
13     if L[i] <= R[j]          // <= : ties taken from the left, so the sort is stable
14         A[k] = L[i]
15         i = i + 1
16     else A[k] = R[j]
17         j = j + 1

MERGE-SORT(A, p, r)                      // initial call: MERGE-SORT(A, 1, A.length)
1  if p < r
2      q = ⌊(p + r) / 2⌋
3      MERGE-SORT(A, p, q)
4      MERGE-SORT(A, q + 1, r)
5      MERGE(A, p, q, r)
```
No-sentinel MERGE, which is the version used for the comparison counts below and matches the approach of the 4th edition:
```
MERGE(A, p, q, r)
1  copy A[p .. q] into L[1 .. n1] and A[q+1 .. r] into R[1 .. n2]
2  i = 1; j = 1; k = p
3  while i <= n1 and j <= n2
4      if L[i] <= R[j]
5          A[k] = L[i]; i = i + 1
6      else A[k] = R[j]; j = j + 1
7      k = k + 1
8  copy the leftover L[i .. n1] or R[j .. n2] into A[k .. r]   // no comparisons
```
Bottom-up merge sort:
```
MERGE-SORT-BOTTOM-UP(A, n)
1  width = 1
2  while width < n
3      lo = 1
4      while lo + width <= n               // a right-hand run exists
5          mid = lo + width - 1
6          hi  = min(lo + 2*width - 1, n)
7          MERGE(A, lo, mid, hi)
8          lo  = lo + 2*width
9      width = 2*width
```

#### Verified trace 1: top-down MERGE-SORT on ⟨5, 2, 4, 7, 1, 3, 2, 6⟩ (merges in execution order)
```
MERGE(A,1,1,2): [5] + [2] -> [2, 5]  (1 cmp)   whole array: [2, 5, 4, 7, 1, 3, 2, 6]
MERGE(A,3,3,4): [4] + [7] -> [4, 7]  (1 cmp)   whole array: [2, 5, 4, 7, 1, 3, 2, 6]
MERGE(A,1,2,4): [2, 5] + [4, 7] -> [2, 4, 5, 7]  (3 cmp)   whole array: [2, 4, 5, 7, 1, 3, 2, 6]
MERGE(A,5,5,6): [1] + [3] -> [1, 3]  (1 cmp)   whole array: [2, 4, 5, 7, 1, 3, 2, 6]
MERGE(A,7,7,8): [2] + [6] -> [2, 6]  (1 cmp)   whole array: [2, 4, 5, 7, 1, 3, 2, 6]
MERGE(A,5,6,8): [1, 3] + [2, 6] -> [1, 2, 3, 6]  (3 cmp)   whole array: [2, 4, 5, 7, 1, 2, 3, 6]
MERGE(A,1,4,8): [2, 4, 5, 7] + [1, 2, 3, 6] -> [1, 2, 2, 3, 4, 5, 6, 7]  (7 cmp)   whole array: [1, 2, 2, 3, 4, 5, 6, 7]
total comparisons: 17
```
In the last merge, the tie 2 (left) vs 2 (right) is resolved by `<=`, so the left 2 is output first and stability is kept.

#### Verified trace 2: odd n, ⟨38, 27, 43, 3, 9, 82, 10⟩
```
MERGE(A,1,1,2): [38] + [27] -> [27, 38]  (1 cmp)   whole array: [27, 38, 43, 3, 9, 82, 10]
MERGE(A,3,3,4): [43] + [3] -> [3, 43]  (1 cmp)   whole array: [27, 38, 3, 43, 9, 82, 10]
MERGE(A,1,2,4): [27, 38] + [3, 43] -> [3, 27, 38, 43]  (3 cmp)   whole array: [3, 27, 38, 43, 9, 82, 10]
MERGE(A,5,5,6): [9] + [82] -> [9, 82]  (1 cmp)   whole array: [3, 27, 38, 43, 9, 82, 10]
MERGE(A,5,6,7): [9, 82] + [10] -> [9, 10, 82]  (2 cmp)   whole array: [3, 27, 38, 43, 9, 10, 82]
MERGE(A,1,4,7): [3, 27, 38, 43] + [9, 10, 82] -> [3, 9, 10, 27, 38, 43, 82]  (6 cmp)   whole array: [3, 9, 10, 27, 38, 43, 82]
total comparisons: 14
```

#### Verified trace 3: bottom-up passes
```
pass 1 (run width 1 -> 2): [2, 5, 4, 7, 1, 3, 2, 6]  (4 cmp)
pass 2 (run width 2 -> 4): [2, 4, 5, 7, 1, 2, 3, 6]  (6 cmp)
pass 3 (run width 4 -> 8): [1, 2, 2, 3, 4, 5, 6, 7]  (7 cmp)
total comparisons: 17

pass 1 (run width 1 -> 2): [27, 38, 3, 43, 9, 82, 10]  (3 cmp)
pass 2 (run width 2 -> 4): [3, 27, 38, 43, 9, 10, 82]  (5 cmp)
pass 3 (run width 4 -> 8): [3, 9, 10, 27, 38, 43, 82]  (6 cmp)
total comparisons: 14
```
See Practice Problem 11 for n = 9, where bottom-up and top-down produce different intermediate arrays.

#### Comparison counts (verified)
- **One MERGE of sizes (n₁, n₂):** min(n₁, n₂) comparisons when one run is entirely smaller, and n₁ + n₂ − 1 when the runs interleave to the end. This was checked over all interleavings for sizes (1,1), (2,3), (3,3), (4,4) and (2,5). Examples: [1,3,5,7]+[2,4,6,8] takes 7, [1,2,3,4]+[5,6,7,8] takes 4, and [5,6,7,8]+[1,2,3,4] takes 4.
- **Sentinel version:** Every MERGE of k elements makes exactly k comparisons. Totals are 24 = n lg n for the n = 8 example and 20 for the n = 7 example.
- **Whole sort by brute force over all permutations:** The worst case equals n⌈lg n⌉ − 2^⌈lg n⌉ + 1 for every n = 2..8. For n = 8: worst 17, best 12 = (n/2) lg n, average 15.733.
- **Recurrence:** T(n) = 2T(n/2) + cn. The recursion tree has lg n + 1 levels each costing cn, so the total is cn lg n + cn = Θ(n lg n). In master-theorem terms this is case 2, with a = 2, b = 2 and f(n) = Θ(n^{log₂2}).
- **Space:** Θ(n) for the L and R arrays, plus Θ(lg n) of recursion stack for the top-down version. Merge sort is not in place. It is still the natural choice for linked lists, since it needs no random access.

### Gaps
- I could not verify the 4th edition's exact MERGE text, because I had no legal online copy.

---

## 4. Heapsort and priority queues: array representation (1-based vs 0-based), MAX-HEAPIFY trace, why BUILD-MAX-HEAP is O(n), heapsort trace, insert / extract-max / increase-key

### Takeaway
- **Index arithmetic:** 1-based PARENT(i) = ⌊i/2⌋, LEFT(i) = 2i, RIGHT(i) = 2i + 1. 0-based parent = ⌊(i−1)/2⌋, children 2i + 1 and 2i + 2.
- **MAX-HEAPIFY** sinks one key along a path, in O(lg n).
- **BUILD-MAX-HEAP** calls MAX-HEAPIFY for i = ⌊n/2⌋ down to 1. It is O(n) because most nodes have small height: Σ h/2^h = 2.
- **HEAPSORT** is one build plus n − 1 rounds of "swap the root to the end, shrink the heap, heapify". It runs in Θ(n lg n), in place, and is not stable.
- **Priority-queue operations** (extract-max, increase-key, insert) each cost O(lg n).

### Cited Findings
- "A binary tree is heap-ordered if the key in each node is larger than (or equal to) the keys in that node's two children (if any)." In the 1-based array representation, "The parent of the node in position k is in position k/2" and "The two children of the node in position k are in positions 2k and 2k + 1". Heap order is restored by swim (bottom-up) and sink (top-down). — [algs4 §2.4 Priority Queues](https://algs4.cs.princeton.edu/24pq/)
- "In an n-item priority queue, the heap algorithms require no more than 1 + lg n compares for insert and no more than 2 lg n compares for remove the maximum." "Sink-based heap construction is linear time", using fewer than 2n compares and fewer than n exchanges. "Heapsort uses fewer than 2 n lg n compare and exchanges to sort n items." — [algs4 §2.4](https://algs4.cs.princeton.edu/24pq/)
- MIT (0-based): "Root is at index 0", left(i) = 2i + 1, right(i) = 2i + 2, parent(i) = ⌊(i−1)/2⌋. "Max-Heap Property at node i: Q[i] ≥ Q[j] for j ∈ {left(i), right(i)}"; "max item is at root of max-heap". — [MIT 6.006 S20 Lecture 8 (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/40d4851e550507ca14dc778b9b2266cc_MIT6_006S20_lec8.pdf)
- MIT on the operations. Insert means append, then "max heapify up(i): swap with parent until Max-Heap Property". Delete-max means "swap item at root node i = 0 with last item at node n − 1", remove it, then "max heapify down(i): swap root with larger child until Max-Heap Property". Both take "height of tree, so Θ(log n)". "In-place priority queue sort with binary Max Heap is Heap Sort". — [MIT Lecture 8 (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/40d4851e550507ca14dc778b9b2266cc_MIT6_006S20_lec8.pdf)
- MIT on linear build. Inserting n items one at a time costs Σ depth(i) = lg(n!) = Ω(n lg n) worst-case swaps. Calling max_heapify_down(i) from i = n − 1 down to 0 costs Σ height(i) = lg(nⁿ/n!) = O(n), so "can build heap in O(n) time" — but this "Doesn't speed up O(n lg n) performance of heap sort". MIT also states that the "Height of complete tree … of n item is ⌈lg n⌉". — [MIT Lecture 8 (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/40d4851e550507ca14dc778b9b2266cc_MIT6_006S20_lec8.pdf)
- Wikipedia gives the same 0-based and 1-based index formulas. Floyd's bottom-up build is O(n), with the analysis using "∑ h/2^h = 2", while repeated insertion is O(n log n). Insert is O(log n) worst case and O(1) on average. Extract is O(log n). Increase-key and decrease-key are O(log n). — [Wikipedia: Binary heap](https://en.wikipedia.org/wiki/Binary_heap)
- Heapsort is O(n log n) in the worst, average and best case (distinct keys), with O(1) auxiliary space. It is "an in-place algorithm" and "not a stable sort". "A well-implemented quicksort is usually 2–3 times faster than heapsort", mainly because of cache locality. Bottom-up heapsort needs about "n log₂ n + O(1) comparisons on average", against "2n log₂ n + O(n)" for the standard version. — [Wikipedia: Heapsort](https://en.wikipedia.org/wiki/Heapsort)
- VisuAlgo's heap page uses a 1-based array ("To simplify the navigation operations below, we use 1-based array"). It credits the O(N) Create(A) to "Robert W. Floyd in 1964" and says "HeapSort() clearly runs in O(N log N) — an optimal comparison-based sorting algorithm". — [VisuAlgo: Binary Heap](https://visualgo.net/en/heap)
- MIT 6.006 S20 Quiz 1, Problem 4(a) official solution: the max-heap is "Before: [93, 85, 38, 23, 63, 11, 13, 17]" and "After: [85, 63, 38, 23, 17, 11, 13]" delete_max. The listed common mistakes are "confusing heap order with traversal order" and not swapping the root with the last leaf before heapifying down. — [MIT 6.006 S20 Quiz 1 solutions (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf)

### Inferences

#### Pseudocode (CLRS 3rd-edition style, 1-based, A.heap-size ≤ A.length)
```
PARENT(i)   return ⌊i/2⌋
LEFT(i)     return 2i
RIGHT(i)    return 2i + 1

MAX-HEAPIFY(A, i)                       // assumes the subtrees at LEFT(i) and RIGHT(i) are max-heaps
1  l = LEFT(i)
2  r = RIGHT(i)
3  if l <= A.heap-size and A[l] > A[i]
4      largest = l
5  else largest = i
6  if r <= A.heap-size and A[r] > A[largest]
7      largest = r
8  if largest != i
9      exchange A[i] with A[largest]
10     MAX-HEAPIFY(A, largest)

BUILD-MAX-HEAP(A)
1  A.heap-size = A.length
2  for i = ⌊A.length / 2⌋ downto 1        // nodes ⌊n/2⌋+1 .. n are leaves
3      MAX-HEAPIFY(A, i)

HEAPSORT(A)
1  BUILD-MAX-HEAP(A)
2  for i = A.length downto 2
3      exchange A[1] with A[i]
4      A.heap-size = A.heap-size - 1
5      MAX-HEAPIFY(A, 1)

HEAP-MAXIMUM(A)
1  return A[1]

HEAP-EXTRACT-MAX(A)
1  if A.heap-size < 1
2      error "heap underflow"
3  max = A[1]
4  A[1] = A[A.heap-size]
5  A.heap-size = A.heap-size - 1
6  MAX-HEAPIFY(A, 1)
7  return max

HEAP-INCREASE-KEY(A, i, key)
1  if key < A[i]
2      error "new key is smaller than current key"
3  A[i] = key
4  while i > 1 and A[PARENT(i)] < A[i]
5      exchange A[i] with A[PARENT(i)]
6      i = PARENT(i)

MAX-HEAP-INSERT(A, key)
1  A.heap-size = A.heap-size + 1
2  A[A.heap-size] = -∞
3  HEAP-INCREASE-KEY(A, A.heap-size, key)
```
In 0-based code, use parent(i) = ⌊(i−1)/2⌋, left(i) = 2i + 1 and right(i) = 2i + 2. The build loop then runs i = ⌊n/2⌋ − 1 down to 0, and the leaves are indices ⌊n/2⌋ … n − 1.

#### Verified trace 1: MAX-HEAPIFY(A, 2) on ⟨16, 4, 10, 14, 7, 9, 3, 2, 8, 1⟩
```
    MAX-HEAPIFY at i=2: exchange A[2]=4 <-> A[4]=14
    MAX-HEAPIFY at i=4: exchange A[4]=4 <-> A[9]=8
    MAX-HEAPIFY at i=9: no exchange (heap property holds)
result: [16, 14, 10, 8, 7, 9, 3, 2, 4, 1] is max-heap: True
```

#### Verified trace 2: BUILD-MAX-HEAP on ⟨4, 1, 3, 2, 16, 9, 10, 14, 8, 7⟩ (n = 10, loop i = 5 down to 1)
```
  i=5 (A[i]=16):
    MAX-HEAPIFY at i=5: no exchange (heap property holds)
    array: [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]
  i=4 (A[i]=2):
    MAX-HEAPIFY at i=4: exchange A[4]=2 <-> A[8]=14
    MAX-HEAPIFY at i=8: no exchange (heap property holds)
    array: [4, 1, 3, 14, 16, 9, 10, 2, 8, 7]
  i=3 (A[i]=3):
    MAX-HEAPIFY at i=3: exchange A[3]=3 <-> A[7]=10
    MAX-HEAPIFY at i=7: no exchange (heap property holds)
    array: [4, 1, 10, 14, 16, 9, 3, 2, 8, 7]
  i=2 (A[i]=1):
    MAX-HEAPIFY at i=2: exchange A[2]=1 <-> A[5]=16
    MAX-HEAPIFY at i=5: exchange A[5]=1 <-> A[10]=7
    MAX-HEAPIFY at i=10: no exchange (heap property holds)
    array: [4, 16, 10, 14, 7, 9, 3, 2, 8, 1]
  i=1 (A[i]=4):
    MAX-HEAPIFY at i=1: exchange A[1]=4 <-> A[2]=16
    MAX-HEAPIFY at i=2: exchange A[2]=4 <-> A[4]=14
    MAX-HEAPIFY at i=4: exchange A[4]=4 <-> A[9]=8
    MAX-HEAPIFY at i=9: no exchange (heap property holds)
    array: [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]
result: [16, 14, 10, 8, 7, 9, 3, 2, 4, 1] is max-heap: True stats: {'cmp': 14, 'xchg': 7}
```

#### Verified trace 3: HEAPSORT on ⟨4, 1, 3, 2, 16, 9, 10, 14, 8, 7⟩ (array after each iteration of the for loop)
```
after BUILD-MAX-HEAP: [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]
i=10: heap [14, 8, 10, 4, 7, 9, 3, 2, 1] | sorted [16]
i= 9: heap [10, 8, 9, 4, 7, 1, 3, 2] | sorted [14, 16]
i= 8: heap [9, 8, 3, 4, 7, 1, 2] | sorted [10, 14, 16]
i= 7: heap [8, 7, 3, 4, 2, 1] | sorted [9, 10, 14, 16]
i= 6: heap [7, 4, 3, 1, 2] | sorted [8, 9, 10, 14, 16]
i= 5: heap [4, 2, 3, 1] | sorted [7, 8, 9, 10, 14, 16]
i= 4: heap [3, 2, 1] | sorted [4, 7, 8, 9, 10, 14, 16]
i= 3: heap [2, 1] | sorted [3, 4, 7, 8, 9, 10, 14, 16]
i= 2: heap [1] | sorted [2, 3, 4, 7, 8, 9, 10, 14, 16]
sorted: [1, 2, 3, 4, 7, 8, 9, 10, 14, 16]
```
The "array after the k-th iteration" is the heap part followed by the sorted part. For example, after the first iteration it is [14, 8, 10, 4, 7, 9, 3, 2, 1, 16].

#### Verified trace 4: priority-queue operations
HEAP-INCREASE-KEY(A, 9, 15) on ⟨16, 14, 10, 8, 7, 9, 3, 2, 4, 1⟩:
```
  set A[9]=15: [16, 14, 10, 8, 7, 9, 3, 2, 15, 1]
  A[4]=8 < A[9]=15 -> exchange
    [16, 14, 10, 15, 7, 9, 3, 2, 8, 1]
  A[2]=14 < A[4]=15 -> exchange
    [16, 15, 10, 14, 7, 9, 3, 2, 8, 1]
result: [16, 15, 10, 14, 7, 9, 3, 2, 8, 1] is max-heap: True
```
HEAP-EXTRACT-MAX on ⟨15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1⟩:
```
  max=15; move A[12] to root: [1, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2]
    MAX-HEAPIFY at i=1: exchange A[1]=1 <-> A[2]=13
    MAX-HEAPIFY at i=2: exchange A[2]=1 <-> A[5]=12
    MAX-HEAPIFY at i=5: exchange A[5]=1 <-> A[10]=6
    MAX-HEAPIFY at i=10: no exchange (heap property holds)
  result: [13, 12, 9, 5, 6, 8, 7, 4, 0, 1, 2]
returned 15 heap: [13, 12, 9, 5, 6, 8, 7, 4, 0, 1, 2] is max-heap: True
```
MAX-HEAP-INSERT(A, 10) on ⟨15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1⟩:
```
  append -inf at index 13
  set A[13]=10: [15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1, 10]
  A[6]=8 < A[13]=10 -> exchange
    [15, 13, 9, 5, 12, 10, 7, 4, 0, 6, 2, 1, 8]
  A[3]=9 < A[6]=10 -> exchange
    [15, 13, 10, 5, 12, 9, 7, 4, 0, 6, 2, 1, 8]
result: [15, 13, 10, 5, 12, 9, 7, 4, 0, 6, 2, 1, 8] is max-heap: True
```
Cross-check against MIT Quiz 1 P4(a). The array contents are the same in 0-based and 1-based form, and my output matches the official answer:
```
  max=93; move A[8] to root: [17, 85, 38, 23, 63, 11, 13]
    MAX-HEAPIFY at i=1: exchange A[1]=17 <-> A[2]=85
    MAX-HEAPIFY at i=2: exchange A[2]=17 <-> A[5]=63
    MAX-HEAPIFY at i=5: no exchange (heap property holds)
  result: [85, 63, 38, 23, 17, 11, 13]
```

#### Why BUILD-MAX-HEAP is O(n), not O(n lg n)
1. The naive bound is n/2 calls × O(lg n) = O(n lg n). It is correct but not tight.
2. A heap has at most ⌈n/2^{h+1}⌉ nodes of height h, and MAX-HEAPIFY on a node of height h costs O(h).
3. So the total is Σ_{h=0}^{⌊lg n⌋} ⌈n/2^{h+1}⌉·O(h) = O(n · Σ_{h≥0} h/2^h) = O(n · 2) = O(n).
4. The sum Σ_{h≥0} h·x^h = x/(1−x)² equals 2 at x = 1/2. Verified partial sums: 0.5, 1.375, 1.93, 1.9995, …
5. Intuition: half of the nodes are leaves and cost 0, a quarter have height 1, and so on. Most of the work happens near the bottom, where paths are short.
6. Exact form, verified for every n < 3000: the sum of all node heights equals n − (number of 1-bits in n), which is < n. So BUILD-MAX-HEAP makes fewer than n exchanges, and with at most 2 comparisons per level, fewer than 2n comparisons. This matches the algs4 bounds.
7. Measured worst case over 20 random arrays for each n:

   | n | max comparisons | 2n | max exchanges | sum of heights |
   |---|---|---|---|---|
   | 10 | 15 | 20 | 7 | 8 |
   | 100 | 186 | 200 | 75 | 97 |
   | 1,000 | 1,896 | 2,000 | 767 | 994 |
   | 10,000 | 18,890 | 20,000 | 7,549 | 9,995 |
8. Why the loop runs downward from ⌊n/2⌋: MAX-HEAPIFY(i) requires both child subtrees to be heaps already. That holds only if the loop processes nodes bottom-up. Nodes ⌊n/2⌋+1..n are leaves, which are already one-element heaps.
9. Building by n repeated inserts is Θ(n lg n) in the worst case (MIT's Σ depth = lg(n!)).

#### Other heap facts (verified)
- **MAX-HEAPIFY recurrence:** T(n) ≤ T(2n/3) + Θ(1) = O(lg n). The 2n/3 is the largest possible child subtree, which occurs when the last level is exactly half full. Measured fraction of the root's left subtree: n = 11 gives 7/11 = 0.636, n = 95 gives 0.663, n = 3071 gives 0.6666.
- **Height:** The height is ⌊lg n⌋ edges. For example, n = 10 gives height 3 with 4 levels. A heap of height h holds between 2^h and 2^{h+1} − 1 elements. MIT's "⌈lg n⌉" is a different convention: n = 8 gives ⌈lg 8⌉ = 3 = ⌊lg 8⌋, but n = 10 gives ⌈lg 10⌉ = 4 ≠ ⌊lg 10⌋ = 3.
- **Leaves (1-based):** ⌊n/2⌋+1 … n. Verified: n = 9 gives 5..9, n = 10 gives 6..10, n = 13 gives 7..13.
- **Heapsort comparisons on random input** (measured), all below algs4's 2n lg n + 2n:

  | n | comparisons | ratio to n lg n |
  |---|---|---|
  | 100 | 1,030 | 1.55 |
  | 1,000 | 16,807 | 1.69 |
  | 10,000 | 235,395 | 1.77 |
- **Heapsort running time:** BUILD costs O(n), and each of the n − 1 extract steps costs O(lg n), for O(n lg n) total. It stays Θ(n lg n) for distinct keys even when the input is sorted, so heapsort is not adaptive.

### Gaps
- I could not cite CLRS's own statements of the 2n/3 bound, the ⌈n/2^{h+1}⌉ node count, or its pseudocode. These were reconstructed and then checked numerically or by script.

---

## 5. Counting sort, radix sort and bucket sort

### Takeaway
These algorithms beat Ω(n lg n) because they do not compare keys.
- **Counting sort** is Θ(n + k). It needs integer keys in 0..k, and it is stable only because the placement loop runs right to left.
- **LSD radix sort** applies a stable sort (counting sort) to each of d digits, least significant first, for Θ(d(n + k)). It is wrong if the per-digit sort is unstable or if the digits are processed most significant first.
- **Bucket sort** is expected Θ(n) only when the inputs are uniform on [0, 1). Its worst case is Θ(n²) when all keys land in one bucket that is insertion-sorted.

### Cited Findings
- Counting sort has three loops. The first counts each key value. The second takes prefix sums, "count[i] = count[i] + count[i − 1]". The third "loops over the items of input again, but in reverse order, moving each item into its sorted position", so "the relative order of items with equal keys is preserved here; i.e., this is a stable sort". Time is "O(n + k)" and space is "also O(n + k)". It "is often used as a subroutine in radix sort". — [Wikipedia: Counting sort](https://en.wikipedia.org/wiki/Counting_sort)
- MIT explains why stability matters. Tuple sort works "Least significant to most significant!"; the auxiliary sort must be stable, meaning "repeated keys appear in output in same order as input"; and "Stability ensures previous sorts stay sorted". "Direct access array sort cannot even sort arrays having repeated keys!" Counting sort stores a chain per key, and "For stability, chain data structure should remember the order in which items were added". Radix sort with base-n digits runs in O(cn), and "If c is constant, so each key is ≤ n^c, this sort is linear O(n)!" — [MIT 6.006 S20 Lecture 5 (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf)
- MIT's table lists Counting Sort as n+u, in-place N, stable Y, "O(n) when u = O(n)", and Radix Sort as n + n log_n(u), in-place N, stable Y, "O(n) when u = O(n^c)". — [MIT Lecture 5 (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf)
- Radix sort is "a non-comparative sorting algorithm". "LSD sorts are generally stable sorts" while "MSD sorts are not necessarily stable". It runs in Θ(d(n + k)), also written O(d·n). — [Wikipedia: Radix sort](https://en.wikipedia.org/wiki/Radix_sort)
- VisuAlgo gives counting sort's cost as "O(N+k)... which is O(N) if k is small" and radix sort's as "O(w × (N+k))" iterations. — [VisuAlgo: Sorting](https://visualgo.net/en/sorting)
- Bucket sort's worst case "occurs when all the elements are placed in a single bucket", costing O(n²) with insertion sort. Under a uniform distribution the expected cost is O(n + n²/k + k), which is O(n) when k ≈ n. With one bucket per key value it degenerates into counting sort, and with two buckets it behaves like quicksort with the midpoint as pivot. Wikipedia lists it among stable sorts, which holds when the per-bucket sort is stable. — [Wikipedia: Bucket sort](https://en.wikipedia.org/wiki/Bucket_sort)
- algs4's §5.1 page (key-indexed counting and LSD) states that it is "under major construction" and showed only code links and exercises in my fetch. — [algs4 §5.1](https://algs4.cs.princeton.edu/51radix/)
- MIT Quiz 1 P5(a), official solution: friend numbers are "non-negative integers less than n, so we can use counting sort to sort the students in worst-case O(n) time. (Radix sort also works …)". P5(d): for keys bounded by a polynomial in n, "we can use radix sort … in worst-case O(n) time". The listed common mistake there is treating 2^{3⌈log n⌉+4} as O(n) and using counting sort. — [MIT Quiz 1 solutions (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf)

### Inferences

#### Pseudocode (CLRS 3rd-edition style)
```
COUNTING-SORT(A, B, k)                  // keys are integers in 0..k; output goes to B[1..n]
1  let C[0 .. k] be a new array
2  for i = 0 to k
3      C[i] = 0
4  for j = 1 to A.length
5      C[A[j]] = C[A[j]] + 1
6  // C[i] now contains the number of elements equal to i.
7  for i = 1 to k
8      C[i] = C[i] + C[i - 1]
9  // C[i] now contains the number of elements less than or equal to i.
10 for j = A.length downto 1             // RIGHT TO LEFT -> stable
11     B[C[A[j]]] = A[j]
12     C[A[j]] = C[A[j]] - 1

RADIX-SORT(A, d)                        // digit 1 is the lowest-order digit
1  for i = 1 to d
2      use a stable sort to sort array A on digit i

BUCKET-SORT(A)                          // assumes 0 <= A[i] < 1, ideally uniform
1  n = A.length
2  let B[0 .. n - 1] be a new array
3  for i = 0 to n - 1
4      make B[i] an empty list
5  for i = 1 to n
6      insert A[i] into list B[⌊n · A[i]⌋]   // append at the tail keeps it stable
7  for i = 0 to n - 1
8      sort list B[i] with insertion sort
9  concatenate the lists B[0], B[1], ..., B[n - 1] together in order
```
Costs:
- **Counting sort:** Θ(k) + Θ(n) + Θ(k) + Θ(n) = Θ(n + k). It is linear when k = O(n), and it is not in place because B and C take Θ(n + k) extra space.
- **Radix sort:** d passes × Θ(n + k) = Θ(d(n + k)).
  - For b-bit keys split into r-bit digits, the cost is Θ((b/r)(n + 2^r)).
  - Choosing r ≈ lg n (when b ≥ lg n) gives Θ(bn / lg n).
  - Example with n = 10⁶ 32-bit keys: r = 8 means 4 passes with k = 256, and r = 16 means 2 passes with k = 65,536.

#### Verified trace 1: COUNTING-SORT on ⟨2a, 5, 3a, 0a, 2b, 3b, 0b, 3c⟩, k = 5 (letters tag equal keys)
```
  C after counting   (index 0..5): [2, 0, 2, 3, 0, 1]
  C after prefix sums (index 0..5): [2, 2, 4, 7, 7, 8]
  j= 8: A[j]=  3c (key 3) -> B[7]; C[3]=6; B=[., ., ., ., ., ., 3c, .]
  j= 7: A[j]=  0b (key 0) -> B[2]; C[0]=1; B=[., 0b, ., ., ., ., 3c, .]
  j= 6: A[j]=  3b (key 3) -> B[6]; C[3]=5; B=[., 0b, ., ., ., 3b, 3c, .]
  j= 5: A[j]=  2b (key 2) -> B[4]; C[2]=3; B=[., 0b, ., 2b, ., 3b, 3c, .]
  j= 4: A[j]=  0a (key 0) -> B[1]; C[0]=0; B=[0a, 0b, ., 2b, ., 3b, 3c, .]
  j= 3: A[j]=  3a (key 3) -> B[5]; C[3]=4; B=[0a, 0b, ., 2b, 3a, 3b, 3c, .]
  j= 2: A[j]=   5 (key 5) -> B[8]; C[5]=7; B=[0a, 0b, ., 2b, 3a, 3b, 3c, 5]
  j= 1: A[j]=  2a (key 2) -> B[3]; C[2]=2; B=[0a, 0b, 2a, 2b, 3a, 3b, 3c, 5]
output B: [0a, 0b, 2a, 2b, 3a, 3b, 3c, 5]
```
After prefix sums, C[i] is the last output position for key i. When the placement loop ends, C[i] = (number of elements < i). Running line 10 left to right with the same decrement still sorts by key, but it reverses equal keys. Verified on the Practice Problem 17 input: the result is [0, 1b, 1a, 2, 3b, 3a, 4c, 4b, 4a].

#### Verified trace 2: LSD RADIX-SORT on ⟨329, 457, 657, 839, 436, 720, 355⟩ (d = 3, counting sort per digit, k = 9)
```
after sorting on digit 1: [720, 355, 436, 457, 657, 329, 839]
after sorting on digit 2: [720, 329, 436, 839, 355, 457, 657]
after sorting on digit 3: [329, 355, 436, 457, 657, 720, 839]
```
Detail of pass 1 (counting sort on the ones digit):
```
  C after counting   (index 0..9): [1, 0, 0, 0, 0, 1, 1, 2, 0, 2]
  C after prefix sums (index 0..9): [1, 1, 1, 1, 1, 2, 3, 5, 5, 7]
  j= 7: A[j]= 355 (key 5) -> B[2]; C[5]=1; B=[., 355, ., ., ., ., .]
  j= 6: A[j]= 720 (key 0) -> B[1]; C[0]=0; B=[720, 355, ., ., ., ., .]
  j= 5: A[j]= 436 (key 6) -> B[3]; C[6]=2; B=[720, 355, 436, ., ., ., .]
  j= 4: A[j]= 839 (key 9) -> B[7]; C[9]=6; B=[720, 355, 436, ., ., ., 839]
  j= 3: A[j]= 657 (key 7) -> B[5]; C[7]=4; B=[720, 355, 436, ., 657, ., 839]
  j= 2: A[j]= 457 (key 7) -> B[4]; C[7]=3; B=[720, 355, 436, 457, 657, ., 839]
  j= 1: A[j]= 329 (key 9) -> B[6]; C[9]=5; B=[720, 355, 436, 457, 657, 329, 839]
```
Why stability matters, verified. The same radix sort with an unstable digit sort (the counting sort placement loop run left to right) gives a wrong final answer:
```
after sorting on digit 1: [720, 355, 436, 657, 457, 839, 329]
after sorting on digit 2: [329, 720, 839, 436, 457, 657, 355]
after sorting on digit 3: [355, 329, 457, 436, 657, 720, 839]     <- NOT sorted (355 before 329, 457 before 436)
```
Correctness argument (induction on passes): after pass i, the keys are sorted by their last i digits. In pass i + 1, keys with different (i+1)-th digits are ordered by that digit. Keys with the same (i+1)-th digit keep their relative order from pass i, but only if the sort is stable, and that order is already correct on the last i digits.

#### Verified trace 3: BUCKET-SORT on ⟨.78, .17, .39, .26, .72, .94, .21, .12, .23, .68⟩ (n = 10, bucket index ⌊10·x⌋)
```
  B[1] before sort: .17, .12
  B[2] before sort: .26, .21, .23
  B[3] before sort: .39
  B[6] before sort: .68
  B[7] before sort: .78, .72
  B[9] before sort: .94
  B[0] after  sort: /
  B[1] after  sort: .12, .17
  B[2] after  sort: .21, .23, .26
  B[3] after  sort: .39
  B[4] after  sort: /
  B[5] after  sort: /
  B[6] after  sort: .68
  B[7] after  sort: .72, .78
  B[8] after  sort: /
  B[9] after  sort: .94
  concatenated: .12, .17, .21, .23, .26, .39, .68, .72, .78, .94
```

#### Why bucket sort is expected Θ(n)
- T(n) = Θ(n) + Σ_{i=0}^{n−1} O(n_i²), where n_i is the size of bucket i.
- For uniform input, n_i ~ Binomial(n, 1/n), so E[n_i²] = Var + E² = (1 − 1/n) + 1 = 2 − 1/n.
- Therefore E[T(n)] = Θ(n) + n·O(2 − 1/n) = Θ(n).
- Monte Carlo check of Σ n_i², which should be 2n − 1:

  | n | measured mean | 2n − 1 |
  |---|---|---|
  | 10 | 18.94 | 19 |
  | 100 | 198.94 | 199 |
  | 1,000 | 1,997.82 | 1,999 |
- If every key falls into one bucket, the cost is Θ(n²) with insertion sort, or O(n lg n) if the buckets are merge-sorted instead.
- The "expected" is over the input distribution, not over coin flips as in randomized quicksort.

#### MIT example caution (verified)
MIT Lecture 5's tuple-sort exercise reads "[32, 03, 44, 42, 22] ⟹ [42, 22, 32, 03, 44] ⟹ [03, 22, 32, 42, 44]". The final list is correct, but a stable pass on the low digit actually gives [32, 42, 22, 03, 44], since 32 comes before 42 and 22 in the input. Do not copy that intermediate line as a stable-sort trace.

### Gaps
- The algs4 §5.1 text on key-indexed counting and LSD (its proposition on array accesses) was not available ("under major construction"), so no algs4 cost formula is cited for LSD.
- CLRS's lemma on choosing r for b-bit keys is stated from memory, not quoted.

---

## 6. The decision-tree Ω(n lg n) lower bound for comparison sorting

### Takeaway
Any comparison sort can be drawn as a binary decision tree. The tree needs at least n! leaves, one per permutation, so its height, which is the worst-case number of comparisons, is at least lg(n!) = Θ(n lg n). Merge sort and heapsort meet this bound, so they are asymptotically optimal. Counting, radix and bucket sort escape the bound because they do not use only comparisons.

### Cited Findings
- MIT: "Comparison model implies that algorithm decision tree is binary (constant branching factor)"; "Requires # leaves L ≥ # possible outputs"; "Tree height lower bounded by Ω(log L), so worst-case running time is Ω(log L)"; "To sort array of n elements, # outputs is n! permutations"; "Thus height lower bounded by log(n!) ≥ log((n/2)^{n/2}) = Ω(n log n)"; "So merge sort is optimal in comparison model". — [MIT 6.006 S20 Lecture 5 (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf)
- "No compare-based sorting algorithm can guarantee to sort N items with fewer than lg(N!) ~ N lg N compares." "Mergesort is an asymptotically optimal compare-based sorting algorithm." — [algs4 §2.2](https://algs4.cs.princeton.edu/22mergesort/)
- From 2^f(n) ≥ n! it follows that f(n) ≥ log₂(n!) ≈ n log₂ n − 1.443n. The bound is asymptotically tight. The minimum worst-case comparison counts for n = 3, 4, 5 are 3, 5 and 7. For n = 13 the bound gives 33, but 34 comparisons are actually needed. Non-comparison sorts such as counting sort are not subject to the bound. — [Wikipedia: Comparison sort](https://en.wikipedia.org/wiki/Comparison_sort)
- MIT Quiz 1 P5(b), official solution: "A scale weighing is a comparison with a constant number of outcomes, so the comparison sort Ω(n log n) lower bound applies." P5(c), where an oracle returns the bravest of any set in O(1), is solvable in O(n) "priority queue sort". The listed common mistake there is "Arguing a Ω(n log n) lower bound". — [MIT Quiz 1 solutions (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf)

### Inferences

#### Proof (exam form)
1. **Model.** A comparison sort gets information about the input only through comparisons a_i ≤ a_j. Fix n. Each internal node of the decision tree is a comparison, each branch is an outcome, and each leaf is an output permutation.
2. **Leaves.** A correct algorithm must be able to produce each of the n! permutations of distinct inputs, so the tree has L ≥ n! reachable leaves.
3. **Height.** A binary tree of height h has at most 2^h leaves, so 2^h ≥ L ≥ n!, which gives h ≥ lg(n!).
4. **Estimate.** n! ≥ (n/2)^{n/2}, so lg(n!) ≥ (n/2) lg(n/2) = Ω(n lg n). Stirling's formula gives lg(n!) = n lg n − n lg e + O(lg n).
5. **Conclusion.** The worst-case number of comparisons equals the tree height, so any comparison sort is Ω(n lg n) in the worst case. Heapsort and merge sort are O(n lg n), so they are asymptotically optimal.

#### Decision tree of INSERTION-SORT for n = 3 (verified by tracing all 6 orderings)
```
                       a1 <= a2 ?
                  yes /          \ no
             a2 <= a3 ?           a1 <= a3 ?
           yes /    \ no        yes /    \ no
      <1,2,3>   a1 <= a3 ?   <2,1,3>   a2 <= a3 ?
              yes /   \ no           yes /   \ no
          <1,3,2>   <3,1,2>      <2,3,1>   <3,2,1>
```
Each leaf ⟨i, j, k⟩ means a_i ≤ a_j ≤ a_k. There are 6 = 3! leaves and the height is 3 = ⌈lg 6⌉. The shallowest leaves are at depth 2 = n − 1, which is the best case. In general the shallowest leaf has depth ≥ n − 1, because the comparisons made must connect all n elements to certify an order.

#### Numbers (verified)
| n | n! | ⌈lg n!⌉ (lower bound) | merge sort worst | insertion sort worst | n lg n |
|---|---|---|---|---|---|
| 3 | 6 | 3 | 3 | 3 | 4.8 |
| 4 | 24 | 5 | 5 | 6 | 8.0 |
| 5 | 120 | 7 | 8 | 10 | 11.6 |
| 6 | 720 | 10 | 11 | 15 | 15.5 |
| 8 | 40,320 | 16 | 17 | 28 | 24.0 |
| 10 | 3,628,800 | 22 | 25 | 45 | 33.2 |
| 12 | 479,001,600 | 29 | 33 | 66 | 43.0 |
| 100 | — | 525 | 573 | 4,950 | 664.4 |
| 1000 | — | 8,530 | 8,977 | 499,500 | 9,965.8 |

#### Extensions exams like
- **Average case.** The average leaf depth of a binary tree with n! leaves is also ≥ lg(n!), so the average case is Ω(n lg n) too.
- **Linear time on half the inputs is impossible.** If a sort ran in linear time on n!/2 inputs, it would need 2^h ≥ n!/2 leaves within depth h, so h ≥ lg(n!) − 1 = Ω(n lg n). The same holds for a 1/n or 1/2^n fraction of inputs, since lg(n!/2^n) is still Θ(n lg n).
- **Scope.** The bound covers comparison sorts only. Counting, radix and bucket sort use keys as array indices or digits, and stronger primitives such as a max-of-set oracle are not two-outcome comparisons.

### Gaps
- None material. The CLRS-exercise extensions (shallowest leaf, half the inputs) are standard reasoning shown here without a fetched citation.

---

## 7. Master complexity table and recurrences

### Takeaway
Only insertion sort is adaptive. Only insertion sort and merge sort are stable among the comparison sorts covered here, and only quicksort has a quadratic worst case with an n lg n average. Heapsort is the only one that is both in place and worst-case n lg n. Non-comparison sorts are linear only under assumptions on the keys: a small range k, a constant number of digits d, or a uniform distribution.

### Cited Findings
- Stable sorts are insertion sort and mergesort. Unstable ones are "selection sort, shellsort, quicksort, and heapsort". — [algs4 §2.5](https://algs4.cs.princeton.edu/25applications/)
- Selection sort is not stable because "It exchanges nonadjacent elements". — [algs4 §2.5](https://algs4.cs.princeton.edu/25applications/)
- Selection sort uses "~n²/2 compares and n exchanges". — [algs4 §2.1](https://algs4.cs.princeton.edu/21elementary/)
- Definitions: "A sorting algorithm is called stable if the relative order of elements with the same key value is preserved" and "A sorting algorithm is said to be in-place if it requires only a constant amount O(1) of extra space." — [VisuAlgo: Sorting](https://visualgo.net/en/sorting)
- Per-algorithm sources: insertion — [algs4 §2.1](https://algs4.cs.princeton.edu/21elementary/), [Wikipedia](https://en.wikipedia.org/wiki/Insertion_sort); quicksort — [algs4 §2.3](https://algs4.cs.princeton.edu/23quicksort/), [Wikipedia](https://en.wikipedia.org/wiki/Quicksort); merge sort — [algs4 §2.2](https://algs4.cs.princeton.edu/22mergesort/), [Wikipedia](https://en.wikipedia.org/wiki/Merge_sort); heapsort — [Wikipedia](https://en.wikipedia.org/wiki/Heapsort), [algs4 §2.4](https://algs4.cs.princeton.edu/24pq/); counting, radix and bucket — [MIT Lecture 5 table (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf), [Wikipedia counting](https://en.wikipedia.org/wiki/Counting_sort), [radix](https://en.wikipedia.org/wiki/Radix_sort), [bucket](https://en.wikipedia.org/wiki/Bucket_sort).

### Inferences

#### Master table (compiled from the cited sources plus the script checks in sections 1–6)
| Algorithm | Best | Average | Worst | Extra space | Stable? | In place? | Adaptive? |
|---|---|---|---|---|---|---|---|
| Insertion sort | Θ(n) (sorted) | Θ(n²) (~n²/4 cmp) | Θ(n²) (reverse; n(n−1)/2 cmp) | Θ(1) | Yes | Yes | Yes: Θ(n + I) |
| Quicksort (Lomuto, last-element pivot) | Θ(n lg n) | Θ(n lg n) (~1.39 n lg n cmp) | Θ(n²) (sorted, reverse, all-equal) | Θ(lg n) stack on average, Θ(n) worst; O(lg n) with smaller-side-first | No | Yes* | No (sorted input is the worst case) |
| Quicksort (Hoare, first-element pivot) | Θ(n lg n) | Θ(n lg n) | Θ(n²) (e.g., sorted input) | same as above | No | Yes* | No |
| Randomized quicksort | Θ(n lg n) | Θ(n lg n) expected on every input | Θ(n²) (negligible probability) | O(lg n) expected | No | Yes* | No |
| Merge sort (top-down or bottom-up) | Θ(n lg n) (≥ ½ n lg n cmp) | Θ(n lg n) | Θ(n lg n) (n⌈lg n⌉ − 2^⌈lg n⌉ + 1 cmp) | Θ(n) | Yes (with ≤) | No | No (natural merge sort is) |
| Heapsort | Θ(n lg n) (distinct keys) | Θ(n lg n) | Θ(n lg n) | Θ(1) | No | Yes | No |
| Counting sort | Θ(n + k) | Θ(n + k) | Θ(n + k) | Θ(n + k) | Yes (placement loop right to left) | No | n/a |
| LSD radix sort (counting sort per digit) | Θ(d(n + k)) | Θ(d(n + k)) | Θ(d(n + k)) | Θ(n + k) | Yes | No | n/a |
| Bucket sort (n buckets, insertion sort) | Θ(n) | Θ(n) expected (uniform input) | Θ(n²) (one bucket) | Θ(n) | Yes, if the bucket sort is stable | No | n/a |
| Selection sort (for comparison) | Θ(n²) | Θ(n²) | Θ(n²) (~n²/2 cmp, n exchanges) | Θ(1) | No | Yes | No |

*Quicksort partitions in place, so textbooks call it in place. Under VisuAlgo's strict "O(1) extra space" definition, its O(lg n) recursion stack disqualifies it. On an exam, say "in place (apart from the O(lg n) stack)".

#### Recurrences and solutions
| Algorithm / case | Recurrence | Solution | Method |
|---|---|---|---|
| Insertion sort, worst (recursive view) | T(n) = T(n−1) + Θ(n) | Θ(n²) | arithmetic series |
| Merge sort (all cases) | T(n) = 2T(n/2) + Θ(n) | Θ(n lg n) | recursion tree, all levels equal (master theorem case 2) |
| Quicksort, worst | T(n) = T(n−1) + T(0) + Θ(n) | Θ(n²) | Σ k = n(n−1)/2 |
| Quicksort, best | T(n) = 2T(n/2) + Θ(n) | Θ(n lg n) | master theorem case 2 |
| Quicksort, constant split α : 1−α | T(n) = T(αn) + T((1−α)n) + Θ(n) | Θ(n lg n) | each level ≤ cn, depth log_{1/max(α,1−α)} n |
| Quicksort, median-of-three worst | T(n) ≤ T(n−2) + T(1) + O(n) | O(n²) | Erickson |
| Quicksort, average or randomized | C(n) = n − 1 + (2/n) Σ_{k<n} C(k) | 2(n+1)H_n − 4n ≈ 1.39 n lg n | telescoping, or Σ_{i<j} 2/(j−i+1) |
| MAX-HEAPIFY | T(n) ≤ T(2n/3) + Θ(1) | O(lg n) | master theorem case 2 (a = 1, b = 3/2) |
| BUILD-MAX-HEAP | Σ_h ⌈n/2^{h+1}⌉·O(h) | O(n) | Σ h/2^h = 2 |
| HEAPSORT | O(n) + (n−1)·O(lg n) | O(n lg n) | — |
| Counting sort | Θ(k) + Θ(n) + Θ(k) + Θ(n) | Θ(n + k) | loops |
| Radix sort | d × Θ(n + k) | Θ(d(n + k)); Θ((b/r)(n + 2^r)) for b-bit keys | — |
| Bucket sort | Θ(n) + Σ O(n_i²) | expected Θ(n), since E[n_i²] = 2 − 1/n | indicator / binomial variance |

### Gaps
- Heapsort's best case for inputs with many equal keys was not verified; for example, all-equal keys make it linear. Wikipedia's "(distinct keys)" qualifier is the safe exam answer.

---

## 8. Common traps (cross-cutting checklist)

### Takeaway
Most lost marks come from conventions, not from concepts: 0-based vs 1-based indices, which pivot rule is in use, what counts as a "pass" or a "comparison", and the direction of loops (BUILD-MAX-HEAP downward, counting sort placement right to left, radix sort least significant digit first).

### Cited Findings
- MIT's official common mistakes on heaps include "confusing heap order with traversal order" and not swapping the root with the last leaf before heapifying down in delete. On a 10-item min-heap they include "Thinking the largest integer must be in the bottom level (instead of in any leaf)" and assuming the third smallest must be in B or C. — [MIT Quiz 1 solutions (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf)
- MIT's sorting common mistakes include "Using a sort that is not O(n)", "Insufficient justification for why O(n log n) is optimal", and "Arguing a Ω(n log n) lower bound" when an O(1) max-oracle exists. — [MIT Quiz 1 solutions (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf)
- "Hoare's partitioning algorithm is one of the places off-by-one errors go to die." — [Erickson Ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- With Hoare, the returned index "isn't necessarily where the actual pivot is". — [Wikipedia: Quicksort](https://en.wikipedia.org/wiki/Quicksort)
- Merge sort with a "decreasing-order copy" faster merge "is not stable". — [algs4 §2.2](https://algs4.cs.princeton.edu/22mergesort/)

### Inferences
Each item below is backed by the verified outputs in sections 1–6.

**Heaps**
1. **0-based vs 1-based heap formulas.** In 1-based form the children of i are 2i and 2i+1 and the leaves are ⌊n/2⌋+1..n. In 0-based form the children are 2i+1 and 2i+2 and the leaves are ⌊n/2⌋..n−1. Check which convention the question uses before computing anything.
2. **BUILD-MAX-HEAP loops downward, from ⌊n/2⌋ to 1.** An upward loop is wrong because MAX-HEAPIFY assumes both subtrees are already heaps.
3. **MAX-HEAPIFY swaps with the larger child**, and then continues down from that child's position.
4. **EXTRACT-MAX moves the last element to the root before sinking it.** It does not promote the larger child. INCREASE-KEY and INSERT swim up, comparing only with the parent. To decrease a key, sink it with MAX-HEAPIFY.
5. **Heapsort traces must respect heap-size.** After k iterations the last k slots hold the k largest keys in final order. Do not heapify into them.
6. **Height conventions differ:** ⌊lg n⌋ edges (CLRS style) vs MIT's ⌈lg n⌉.
7. **An O(n) build does not make heapsort O(n).** The n − 1 extractions cost Θ(n lg n).

**Quicksort**

8. **"Quicksort is Θ(n lg n)" holds only for the best, average or expected case.** Its worst case is Θ(n²). Randomization changes which inputs are bad, not the worst-case bound.
9. **Lomuto with a last-element pivot is quadratic on sorted, reverse-sorted and all-equal inputs.** Median-of-three fixes the first two but not all-equal input; Hoare or 3-way partitioning fixes all-equal input.
10. **Recursion bounds depend on the scheme.** Hoare's partition returns a split index: recurse on (p, q) and (q+1, r). Using (p, q−1) gave an unsorted result in my test. Lomuto returns the pivot's final position: recurse on (p, q−1) and (q+1, r). Using (p, q) with Lomuto can loop forever when q = r.
11. **Comparison counts are fixed for Lomuto.** Lomuto PARTITION always makes exactly r − p comparisons. Hoare's count varies, because the scans may overshoot.
12. **Tail-recursion elimination with smaller-side-first bounds the stack**, to O(lg n), not the running time.

**Merge sort**

13. **Merge sort is Θ(n lg n) on every input**, so it is not adaptive, and it needs Θ(n) extra space, so it is not in place. It is stable only if ties take from the left (≤).
14. **Order of merges.** Top-down MERGE-SORT merges depth-first: the whole left half is finished before the right half starts. "Array after the 3rd merge" of ⟨5,2,4,7,1,3,2,6⟩ is [2,4,5,7,1,3,2,6]. Bottom-up merges level by level, so the two versions give different intermediate arrays unless n is a power of 2.
15. **Comparison counting conventions differ.** CLRS 3e MERGE with sentinels makes exactly r − p + 1 comparisons. The no-sentinel version makes between min(n₁, n₂) and n₁ + n₂ − 1. Ask which convention applies, or state yours.

**Insertion sort**

16. **"Pass" indexing.** The first pass is j = 2, and after pass k the first k+1 entries are sorted among themselves, though not yet in their final positions. In selection sort, by contrast, the prefix is final.
17. **Insertion-sort comparisons are not shifts.** A pass that ends with i = 0 makes no failing comparison. The total is I + (n − 1) − m (see section 1).

**Linear-time sorts**

18. **Counting sort's last loop runs from n down to 1** when C is decremented. Running it forward reverses equal keys, which breaks radix sort.
19. **LSD radix sort must start with the least significant digit and use a stable sort.** MSD-first passes with a stable sort leave the array sorted by the last digit processed (see Practice Problem 18).
20. **Linear-time sorts are linear only under conditions.** Counting sort needs k = O(n). Radix sort needs d constant and k = O(n). Bucket sort is linear only in expectation and only for uniform input; its worst case is Θ(n²).
21. **Counting sort's preconditions.** It needs integer keys in a known range. Negative keys need an offset, and real-valued keys need bucket sort or a comparison sort.

**Lower bound and definitions**

22. **The Ω(n lg n) bound applies only to comparison sorts**, in the worst and average case. It is not a bound on every way of sorting.
23. **Know which sorts are not stable:** selection sort, quicksort and heapsort. Shellsort, which is not on this syllabus, is also unstable.
24. **"In place" has two definitions.** Under the strict O(1) definition, recursive quicksort is not in place; under the textbook convention it is. State your definition.
25. **Do not copy MIT's tuple-sort intermediate line.** "[42, 22, 32, 03, 44]" is not what a stable last-digit pass produces (see section 5).

### Gaps
- I cannot know SOC3030's own conventions: which partition the slides use, whether "pass" counting starts at j = 2, and whether comparisons are counted with sentinels. Compare against the professor's Assignment #2 sample solution, which I did not see.

---

## 9. Twenty practice problems with full solutions (all answers verified by script)

### Takeaway
These problems cover the exam formats listed in the brief: full traces, "array after the k-th pass", comparison counts, stability and in-place questions, recurrences, heap index arithmetic, linear-time sorts, the lower bound, and "best choice for scenario X". Problem 12(d) is adapted from MIT 6.006's official Quiz 1, and its answers were re-verified by brute force.

### Cited Findings
- Source of the adapted problems in 12(d), 20(e) and the heap delete-max style: [MIT 6.006 S20 Quiz 1 solutions (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf). The official min-heap answers are A for the smallest, B–G for the 3rd smallest and F–J for the largest.
- Source of the "why is selection sort unstable" answer ("It exchanges nonadjacent elements"): [algs4 §2.5](https://algs4.cs.princeton.edu/25applications/)
- Source of the scenario guidance ("quicksort is the method of choice"; mergesort "if stability is important and space is available"): [algs4 §2.5](https://algs4.cs.princeton.edu/25applications/)

### Inferences

**Problem 1 (insertion sort trace and counts).** Run INSERTION-SORT on ⟨7, 4, 9, 2, 6, 3⟩. Give the array after each pass and the comparisons and shifts per pass.
*Solution.*
```
start          : [7, 4, 9, 2, 6, 3]
pass j=2 key=  4: 1 cmp, 1 shift -> [4, 7, 9, 2, 6, 3]
pass j=3 key=  9: 1 cmp, 0 shift -> [4, 7, 9, 2, 6, 3]
pass j=4 key=  2: 3 cmp, 3 shift -> [2, 4, 7, 9, 6, 3]
pass j=5 key=  6: 3 cmp, 2 shift -> [2, 4, 6, 7, 9, 3]
pass j=6 key=  3: 5 cmp, 4 shift -> [2, 3, 4, 6, 7, 9]
TOTAL: 13 comparisons, 10 shifts (inversions = 10)
```
Check: I = 10 and the new minima were 4 and 2, so the comparisons are 10 + 5 − 2 = 13.

**Problem 2 ("array after the k-th pass" and stability).** A = ⟨6, 5a, 3, 1, 8, 7, 2, 5b⟩, where 5a and 5b have equal keys. (a) What is the array after the 3rd pass? (b) After the 6th pass? (c) In what order do 5a and 5b end up? (d) How many comparisons and shifts are there in total?
*Solution.*
```
pass j=2 key= 5a: 1 cmp, 1 shift -> [5a, 6, 3, 1, 8, 7, 2, 5b]
pass j=3 key=  3: 2 cmp, 2 shift -> [3, 5a, 6, 1, 8, 7, 2, 5b]
pass j=4 key=  1: 3 cmp, 3 shift -> [1, 3, 5a, 6, 8, 7, 2, 5b]
pass j=5 key=  8: 1 cmp, 0 shift -> [1, 3, 5a, 6, 8, 7, 2, 5b]
pass j=6 key=  7: 2 cmp, 1 shift -> [1, 3, 5a, 6, 7, 8, 2, 5b]
pass j=7 key=  2: 6 cmp, 5 shift -> [1, 2, 3, 5a, 6, 7, 8, 5b]
pass j=8 key= 5b: 4 cmp, 3 shift -> [1, 2, 3, 5a, 5b, 6, 7, 8]
TOTAL: 19 comparisons, 15 shifts (inversions = 15)
```
(a) The 3rd pass is j = 4: [1, 3, 5a, 6, 8, 7, 2, 5b]. (b) The 6th pass is j = 7: [1, 2, 3, 5a, 6, 7, 8, 5b]. (c) 5a stays before 5b, because 5a > 5b is false, so 5b stops behind 5a. (d) 19 comparisons and 15 shifts (15 + 7 − 3 = 19).

**Problem 3 (insertion sort count formulas).** For n = 10 distinct keys, give the comparisons and shifts for (a) sorted input, (b) reverse-sorted input, (c) the average over random permutations, and (d) A = ⟨5, 1, 2, 3, 4, 8, 6, 7, 10, 9⟩.
*Solution.*
- (a) 9 comparisons, 0 shifts.
- (b) 45 comparisons, 45 shifts.
- (c) Shifts n(n−1)/4 = 22.5. Comparisons n(n−1)/4 + n − H₁₀ ≈ 22.5 + 10 − 2.929 = 29.57.
- (d) The verified run shows 7 inversions, so 7 shifts. There are 15 comparisons = 7 + 9 − 1, since only key 1, at j = 2, is a new minimum.
- In general, I ≤ comparisons ≤ I + n − 1.

**Problem 4 (Lomuto PARTITION trace).** Run PARTITION(A, 1, 8) on ⟨6, 3, 9, 1, 8, 2, 7, 5⟩. Show the array after each iteration, and give q, the number of comparisons and the number of exchanges.
*Solution.*
```
PARTITION(A,1,8): pivot x=A[8]=5; i=0
  j=1: A[j]=6 >  5: no change                         [6, 3, 9, 1, 8, 2, 7, 5]
  j=2: A[j]=3 <= 5: i=1, exchange A[1]=6 <-> A[2]=3     [3, 6, 9, 1, 8, 2, 7, 5]
  j=3: A[j]=9 >  5: no change                         [3, 6, 9, 1, 8, 2, 7, 5]
  j=4: A[j]=1 <= 5: i=2, exchange A[2]=6 <-> A[4]=1     [3, 1, 9, 6, 8, 2, 7, 5]
  j=5: A[j]=8 >  5: no change                         [3, 1, 9, 6, 8, 2, 7, 5]
  j=6: A[j]=2 <= 5: i=3, exchange A[3]=9 <-> A[6]=2     [3, 1, 2, 6, 8, 9, 7, 5]
  j=7: A[j]=7 >  5: no change                         [3, 1, 2, 6, 8, 9, 7, 5]
  final exchange A[4] <-> A[8]: [3, 1, 2, 5, 8, 9, 7, 6]  return q=4
{'cmp': 7, 'xchg': 4}
```
q = 4. There are 7 comparisons (r − p) and 4 exchanges: 3 on line 6 and the final one.

**Problem 5 (Hoare partition trace).** Run HOARE-PARTITION(A, 1, 8) on the same array. Show each exchange, the returned index and the recursive calls.
*Solution.*
```
HOARE-PARTITION(A,1,8): pivot x=A[1]=6; i=0, j=9
  stop at i=1 (A[i]=6), j=8 (A[j]=5); i<j -> exchange: [5, 3, 9, 1, 8, 2, 7, 6]
  stop at i=3 (A[i]=9), j=6 (A[j]=2); i<j -> exchange: [5, 3, 2, 1, 8, 9, 7, 6]
  stop at i=5 (A[i]=8), j=4 (A[j]=1); i>=j -> return j=4
final [5, 3, 2, 1, 8, 9, 7, 6] q = 4 {'cmp': 10, 'xchg': 2}
```
The returned index is q = 4, and the recursion is QUICKSORT(A, 1, 4) and QUICKSORT(A, 5, 8). The pivot 6 is at index 8, not at q. There are 2 exchanges, against Lomuto's 4, and 10 comparisons.

**Problem 6 (full quicksort).** Run QUICKSORT with Lomuto partition on ⟨6, 3, 9, 1, 8, 2, 7, 5⟩. List every partition result, the total number of comparisons and the deepest recursion level.
*Solution.*
```
QUICKSORT(A,1,8) -> q=4: A[1..8]=[3, 1, 2, 5, 8, 9, 7, 6]  whole=[3, 1, 2, 5, 8, 9, 7, 6]  (partition cmp = 7)
  QUICKSORT(A,1,3) -> q=2: A[1..3]=[1, 2, 3]  whole=[1, 2, 3, 5, 8, 9, 7, 6]  (partition cmp = 2)
  QUICKSORT(A,5,8) -> q=5: A[5..8]=[6, 9, 7, 8]  whole=[1, 2, 3, 5, 6, 9, 7, 8]  (partition cmp = 3)
    QUICKSORT(A,6,8) -> q=7: A[6..8]=[7, 8, 9]  whole=[1, 2, 3, 5, 6, 7, 8, 9]  (partition cmp = 2)
sorted [1, 2, 3, 5, 6, 7, 8, 9] {'cmp': 14, 'xchg': 9, 'maxdepth': 3}
```
There are 14 comparisons (7 + 2 + 3 + 2). The deepest call is at depth 3 with the root at depth 0, counting calls on 1-element subarrays. The array after the 2nd partition is [1, 2, 3, 5, 8, 9, 7, 6].

**Problem 7 (worst-case inputs).** QUICKSORT uses Lomuto PARTITION with the last element as pivot, n = 6. Count the comparisons for (a) ⟨1..6⟩, (b) ⟨6..1⟩, (c) six equal keys, and (d) ⟨3, 6, 1, 5, 2, 4⟩. Give the recurrence and a fix for each bad case.
*Solution.*
```
sorted   : cmp=15, depth=5, splits=[(5, 0), (4, 0), (3, 0), (2, 0), (1, 0)]
reverse  : cmp=15, depth=5, splits=[(0, 5), (4, 0), (0, 3), (2, 0), (0, 1)]
all equal: cmp=15, depth=5, splits=[(5, 0), (4, 0), (3, 0), (2, 0), (1, 0)]
example  : cmp=8, depth=2, splits=[(3, 2), (1, 1), (0, 1)]
```
- Cases (a)–(c) each take n(n−1)/2 = 15 comparisons. The recurrence is T(n) = T(n−1) + Θ(n), which gives Θ(n²).
- The reverse-sorted splits alternate between 0 | n−1 and n−1 | 0.
- Fixes: for (a) and (b), use a random pivot or median-of-three. For (c), use Hoare partition or 3-way partitioning; median-of-three does not help.

**Problem 8 (recurrences).** Solve: (a) T(n) = T(n−1) + n; (b) T(n) = 2T(n/2) + n; (c) T(n) = T(9n/10) + T(n/10) + n; (d) T(n) = T(n−2) + T(1) + n; (e) T(n) = T(2n/3) + 1; (f) C(n) = n − 1 + (2/n)Σ_{k=0}^{n−1} C(k).
*Solution.*
- (a) Θ(n²). Numerically, T(1024) = 524,799 ≈ n²/2 = 524,288.
- (b) Θ(n lg n). It equals n lg n exactly for n = 2^m with T(1) = 0; T(1024) = 10,240.
- (c) Θ(n lg n). Each level costs ≤ n and the depth is log_{10/9} n. Numerically, T(1024) = 19,250 ≈ 1.88 n lg n and T(16384) = 447,940 ≈ 1.95 n lg n, a bounded ratio.
- (d) Θ(n²). This is the median-of-three worst case.
- (e) Θ(lg n). This is the MAX-HEAPIFY bound, master theorem case 2 with a = 1 and b = 3/2.
- (f) 2(n+1)H_n − 4n ≈ 1.39 n lg n. The derivation is in section 2, and it was verified exactly for n ≤ 8.

**Problem 9 (merge sort trace).** Run MERGE-SORT on ⟨12, 7, 3, 15, 9, 1, 10, 4⟩. List the merges in execution order, give the array after the 3rd merge, and count the comparisons.
*Solution.*
```
MERGE(A,1,1,2): [12] + [7] -> [7, 12]  (1 cmp)   whole array: [7, 12, 3, 15, 9, 1, 10, 4]
MERGE(A,3,3,4): [3] + [15] -> [3, 15]  (1 cmp)   whole array: [7, 12, 3, 15, 9, 1, 10, 4]
MERGE(A,1,2,4): [7, 12] + [3, 15] -> [3, 7, 12, 15]  (3 cmp)   whole array: [3, 7, 12, 15, 9, 1, 10, 4]
MERGE(A,5,5,6): [9] + [1] -> [1, 9]  (1 cmp)   whole array: [3, 7, 12, 15, 1, 9, 10, 4]
MERGE(A,7,7,8): [10] + [4] -> [4, 10]  (1 cmp)   whole array: [3, 7, 12, 15, 1, 9, 4, 10]
MERGE(A,5,6,8): [1, 9] + [4, 10] -> [1, 4, 9, 10]  (3 cmp)   whole array: [3, 7, 12, 15, 1, 4, 9, 10]
MERGE(A,1,4,8): [3, 7, 12, 15] + [1, 4, 9, 10] -> [1, 3, 4, 7, 9, 10, 12, 15]  (6 cmp)   whole array: [1, 3, 4, 7, 9, 10, 12, 15]
total cmp 16
```
After the 3rd merge the array is [3, 7, 12, 15, 9, 1, 10, 4]. There are 16 comparisons in total; the worst case for n = 8 is 17.

**Problem 10 (merge comparisons).** (a) What are the minimum and maximum comparisons when merging sorted runs of sizes n₁ and n₂? (b) Count the comparisons for ⟨1,4,6,9⟩+⟨2,3,7,8⟩, ⟨2,3,5⟩+⟨10,11,12,13,14⟩ and ⟨1,2,3,20⟩+⟨4,5,6,7⟩. (c) What changes with CLRS 3e sentinels?
*Solution.*
- (a) Between min(n₁, n₂) and n₁ + n₂ − 1. This was verified over all interleavings.
- (b) The verified counts are 7, 3 and 7.
- (c) Each merge then takes exactly n₁ + n₂ = 8 comparisons.
```
[1, 4, 6, 9] + [2, 3, 7, 8] -> [1, 2, 3, 4, 6, 7, 8, 9] cmp: 7
[2, 3, 5] + [10, 11, 12, 13, 14] -> [2, 3, 5, 10, 11, 12, 13, 14] cmp: 3
[1, 2, 3, 20] + [4, 5, 6, 7] -> [1, 2, 3, 4, 5, 6, 7, 20] cmp: 7
```

**Problem 11 (bottom-up merge sort).** Run bottom-up merge sort on ⟨5, 1, 6, 2, 7, 3, 8, 4, 0⟩. Give the array after each pass, the number of passes and the total comparisons.
*Solution.*
```
pass 1 (run width 1 -> 2): [1, 5, 2, 6, 3, 7, 4, 8, 0]  (4 cmp)
pass 2 (run width 2 -> 4): [1, 2, 5, 6, 3, 4, 7, 8, 0]  (6 cmp)
pass 3 (run width 4 -> 8): [1, 2, 3, 4, 5, 6, 7, 8, 0]  (6 cmp)
pass 4 (run width 8 -> 16): [0, 1, 2, 3, 4, 5, 6, 7, 8]  (1 cmp)
total cmp 17
```
There are ⌈lg 9⌉ = 4 passes and 17 comparisons. The lone 0 waits until the last pass. Top-down would split 5 | 4 instead, so its intermediate arrays are different.

**Problem 12 (heap index arithmetic).** n = 13.
- (a) In 1-based form, find PARENT(13), the children of 5, the range of leaves, and the height.
- (b) In 0-based form, find parent(12), the children of 4, and the range of leaves.
- (c) What are the minimum and maximum numbers of elements in a heap of height h?
- (d) This part is adapted from MIT Quiz 1 P3. The array [A..J] is a min-heap on 10 distinct keys. Which positions can hold the smallest, 2nd smallest, 3rd smallest and largest key?

*Solution.*
- (a) PARENT(13) = 6; the children of 5 are 10 and 11; the leaves are 7..13; the height is ⌊lg 13⌋ = 3.
- (b) parent(12) = 5; the children of 4 are 9 and 10; the leaves are 6..12.
- (c) Between 2^h and 2^{h+1} − 1.
- (d) Smallest: A. 2nd smallest: B or C. 3rd smallest: any of B–G. Largest: any of F–J, which are the leaves.
- (d) was verified by enumerating all 3,360 min-heaps on 10 keys, and it matches MIT's official answers:
```
number of distinct min-heaps on 10 keys: 3360
rank 1: positions ['A']
rank 2: positions ['B', 'C']
rank 3: positions ['B', 'C', 'D', 'E', 'F', 'G']
rank 10: positions ['F', 'G', 'H', 'I', 'J']
```

**Problem 13 (is it a max-heap?).** (a) ⟨30, 20, 25, 15, 18, 22, 10, 5, 16, 3⟩ (b) ⟨23, 17, 14, 6, 13, 10, 1, 5, 7, 12⟩ (c) ⟨9, 8, 7, 6, 5, 4, 3, 2, 1⟩ (d) ⟨10, 9, 3, 8, 7, 2, 1⟩
*Solution.* For each i = 2..n, check A[⌊i/2⌋] ≥ A[i].
- (a) No: A[4] = 15 < A[9] = 16.
- (b) No: A[4] = 6 < A[9] = 7.
- (c) Yes: every descending array is a max-heap.
- (d) Yes.

**Problem 14 (BUILD-MAX-HEAP).** Run BUILD-MAX-HEAP on ⟨2, 8, 6, 1, 10, 15, 3, 12, 11⟩ and show the array after each MAX-HEAPIFY call.
*Solution.* Here n = 9, so the loop starts at ⌊9/2⌋ = 4.
```
  i=4 (A[i]=1):
    MAX-HEAPIFY at i=4: exchange A[4]=1 <-> A[8]=12
    MAX-HEAPIFY at i=8: no exchange (heap property holds)
    array: [2, 8, 6, 12, 10, 15, 3, 1, 11]
  i=3 (A[i]=6):
    MAX-HEAPIFY at i=3: exchange A[3]=6 <-> A[6]=15
    MAX-HEAPIFY at i=6: no exchange (heap property holds)
    array: [2, 8, 15, 12, 10, 6, 3, 1, 11]
  i=2 (A[i]=8):
    MAX-HEAPIFY at i=2: exchange A[2]=8 <-> A[4]=12
    MAX-HEAPIFY at i=4: exchange A[4]=8 <-> A[9]=11
    MAX-HEAPIFY at i=9: no exchange (heap property holds)
    array: [2, 12, 15, 11, 10, 6, 3, 1, 8]
  i=1 (A[i]=2):
    MAX-HEAPIFY at i=1: exchange A[1]=2 <-> A[3]=15
    MAX-HEAPIFY at i=3: exchange A[3]=2 <-> A[6]=6
    MAX-HEAPIFY at i=6: no exchange (heap property holds)
    array: [15, 12, 6, 11, 10, 2, 3, 1, 8]
result [15, 12, 6, 11, 10, 2, 3, 1, 8] True {'cmp': 12, 'xchg': 6}
```

**Problem 15 (heapsort iterations).** Continue Problem 14 with HEAPSORT. Give the array after each of the first 3 iterations, and the final result.
*Solution.*
```
after BUILD-MAX-HEAP: [15, 12, 6, 11, 10, 2, 3, 1, 8]
i= 9: heap [12, 11, 6, 8, 10, 2, 3, 1] | sorted [15]
i= 8: heap [11, 10, 6, 8, 1, 2, 3] | sorted [12, 15]
i= 7: heap [10, 8, 6, 3, 1, 2] | sorted [11, 12, 15]
i= 6: heap [8, 3, 6, 2, 1] | sorted [10, 11, 12, 15]
i= 5: heap [6, 3, 1, 2] | sorted [8, 10, 11, 12, 15]
i= 4: heap [3, 2, 1] | sorted [6, 8, 10, 11, 12, 15]
i= 3: heap [2, 1] | sorted [3, 6, 8, 10, 11, 12, 15]
i= 2: heap [1] | sorted [2, 3, 6, 8, 10, 11, 12, 15]
final [1, 2, 3, 6, 8, 10, 11, 12, 15]
```
The array after 3 iterations is [10, 8, 6, 3, 1, 2, 11, 12, 15].

**Problem 16 (priority-queue operations).** Start each part from H = ⟨20, 18, 15, 12, 9, 10, 7, 4, 8, 3⟩, which is a valid max-heap. Perform (a) HEAP-EXTRACT-MAX, (b) MAX-HEAP-INSERT(H, 19) and (c) HEAP-INCREASE-KEY(H, 9, 25).
*Solution.*
```
(a) EXTRACT-MAX
  max=20; move A[10] to root: [3, 18, 15, 12, 9, 10, 7, 4, 8]
    MAX-HEAPIFY at i=1: exchange A[1]=3 <-> A[2]=18
    MAX-HEAPIFY at i=2: exchange A[2]=3 <-> A[4]=12
    MAX-HEAPIFY at i=4: exchange A[4]=3 <-> A[9]=8
    MAX-HEAPIFY at i=9: no exchange (heap property holds)
  result: [18, 12, 15, 8, 9, 10, 7, 4, 3]
(b) INSERT 19
  append -inf at index 11
  set A[11]=19: [20, 18, 15, 12, 9, 10, 7, 4, 8, 3, 19]
  A[5]=9 < A[11]=19 -> exchange
    [20, 18, 15, 12, 19, 10, 7, 4, 8, 3, 9]
  A[2]=18 < A[5]=19 -> exchange
    [20, 19, 15, 12, 18, 10, 7, 4, 8, 3, 9]
(c) INCREASE-KEY(A, 9, 25)
  set A[9]=25: [20, 18, 15, 12, 9, 10, 7, 4, 25, 3]
  A[4]=12 < A[9]=25 -> exchange
    [20, 18, 15, 25, 9, 10, 7, 4, 12, 3]
  A[2]=18 < A[4]=25 -> exchange
    [20, 25, 15, 18, 9, 10, 7, 4, 12, 3]
  A[1]=20 < A[2]=25 -> exchange
    [25, 20, 15, 18, 9, 10, 7, 4, 12, 3]
```

**Problem 17 (counting sort).** Run COUNTING-SORT on ⟨4a, 1a, 3a, 4b, 0, 1b, 3b, 4c, 2⟩ with k = 5. Show C after counting and after prefix sums, every placement, the final B and the final C. What happens if line 10 runs j = 1 to n?
*Solution.*
```
  C after counting   (index 0..5): [1, 2, 1, 2, 3, 0]
  C after prefix sums (index 0..5): [1, 3, 4, 6, 9, 9]
  j= 9: A[j]=   2 (key 2) -> B[4]; C[2]=3; B=[., ., ., 2, ., ., ., ., .]
  j= 8: A[j]=  4c (key 4) -> B[9]; C[4]=8; B=[., ., ., 2, ., ., ., ., 4c]
  j= 7: A[j]=  3b (key 3) -> B[6]; C[3]=5; B=[., ., ., 2, ., 3b, ., ., 4c]
  j= 6: A[j]=  1b (key 1) -> B[3]; C[1]=2; B=[., ., 1b, 2, ., 3b, ., ., 4c]
  j= 5: A[j]=   0 (key 0) -> B[1]; C[0]=0; B=[0, ., 1b, 2, ., 3b, ., ., 4c]
  j= 4: A[j]=  4b (key 4) -> B[8]; C[4]=7; B=[0, ., 1b, 2, ., 3b, ., 4b, 4c]
  j= 3: A[j]=  3a (key 3) -> B[5]; C[3]=4; B=[0, ., 1b, 2, 3a, 3b, ., 4b, 4c]
  j= 2: A[j]=  1a (key 1) -> B[2]; C[1]=1; B=[0, 1a, 1b, 2, 3a, 3b, ., 4b, 4c]
  j= 1: A[j]=  4a (key 4) -> B[7]; C[4]=6; B=[0, 1a, 1b, 2, 3a, 3b, 4a, 4b, 4c]
B = [0, 1a, 1b, 2, 3a, 3b, 4a, 4b, 4c]
```
The final C is [0, 1, 3, 4, 6, 9], meaning C[i] = (number of keys < i). Running the loop forward gives [0, 1b, 1a, 2, 3b, 3a, 4c, 4b, 4a]. That is still sorted by key, but it is unstable: every group of equal keys comes out reversed.

**Problem 18 (LSD radix sort).** Run RADIX-SORT with counting sort per decimal digit on ⟨512, 307, 123, 456, 721, 89, 34, 700⟩. (a) Give the array after each pass. (b) What does an unstable digit sort produce? (c) What does MSD-first processing produce? (d) What is the cost for n = 10⁶ 32-bit keys?
*Solution.*
```
after sorting on digit 1: [700, 721, 512, 123, 34, 456, 307, 89]
after sorting on digit 2: [700, 307, 512, 721, 123, 34, 456, 89]
after sorting on digit 3: [34, 89, 123, 307, 456, 512, 700, 721]
unstable variant:
after sorting on digit 1: [700, 721, 512, 123, 34, 456, 307, 89]
after sorting on digit 2: [307, 700, 512, 123, 721, 34, 456, 89]
after sorting on digit 3: [89, 34, 123, 307, 456, 512, 721, 700]
MSD-first (wrong order of passes) with stable sort:
  after digit 3: [89, 34, 123, 307, 456, 512, 721, 700]
  after digit 2: [307, 700, 512, 123, 721, 34, 456, 89]
  after digit 1: [700, 721, 512, 123, 34, 456, 307, 89]
```
- (a) Treat 89 as 089 and 34 as 034; the passes are shown in the first block above.
- (b) The unstable version ends with 89 before 34 and 721 before 700, which is wrong.
- (c) MSD-first leaves the array sorted by the ones digit only.
- (d) With r = 8-bit digits: 4 passes with k = 256, so Θ(4(n + 256)). With r = 16-bit digits: 2 passes with k = 65,536, so Θ(2(n + 65,536)). Both are linear, compared with n lg n ≈ 2 × 10⁷ comparisons for a comparison sort.

**Problem 19 (bucket sort).** Run BUCKET-SORT on ⟨.45, .12, .87, .33, .91, .05, .48, .36, .62, .17⟩ with n = 10. Show the buckets and the output, then give a worst-case input and its cost, and explain why the expected cost is Θ(n).
*Solution.*
```
  B[0] before sort: .05
  B[1] before sort: .12, .17
  B[3] before sort: .33, .36
  B[4] before sort: .45, .48
  B[6] before sort: .62
  B[8] before sort: .87
  B[9] before sort: .91
  concatenated: .05, .12, .17, .33, .36, .45, .48, .62, .87, .91
```
- **Worst case:** If all 10 keys lie in [0.40, 0.50), they all land in B[4]. Insertion sort on n items then costs Θ(n²), up to 45 comparisons for n = 10.
- **Expected case:** For uniform input, E[n_i²] = 2 − 1/n, so the expected total is Θ(n).

**Problem 20 (concepts: stability, in place, scenarios, lower bound, models).**
- (a) Which of these are stable: insertion, selection, merge, quick, heap, counting, LSD radix, bucket?
- (b) Which are in place?
- (c) What is the best choice for each of the scenarios below?
- (d) For n = 4 and n = 5, what is the minimum worst-case number of comparisons? Can a comparison sort run in linear time on half of all inputs?
- (e) Which bound applies in each of the MIT-style models below?

*Solution.*
- (a) Stable: insertion, merge (with ≤), counting (placement loop right to left), LSD radix (if the digit sort is stable), and bucket (if items are appended in input order and each bucket is sorted stably). Not stable: selection ("It exchanges nonadjacent elements", per algs4), quicksort and heapsort.
- (b) In place: insertion, selection, heapsort, and quicksort (apart from its O(lg n) stack). Not in place: merge (Θ(n)), counting and radix (Θ(n + k)), and bucket (Θ(n)).
- (c) Scenarios:

  | Scenario | Best choice |
  |---|---|
  | Nearly sorted data (each item ≤ k places away) | insertion sort, Θ(nk) |
  | Guaranteed O(n lg n) with O(1) extra memory | heapsort |
  | Stability plus guaranteed O(n lg n) | merge sort |
  | Sorting a linked list | merge sort |
  | General in-memory data, fastest in practice | randomized quicksort (3-way if there are many duplicates) |
  | 10⁶ integers in 0..1000 | counting sort, Θ(n + k) |
  | 10⁶ ten-digit phone numbers or 32-bit integers | LSD radix sort |
  | 10⁶ floats uniform in [0, 1) | bucket sort, expected Θ(n) |
  | Subarrays smaller than about 10–15 inside quicksort or merge sort | insertion-sort cutoff |
  | Repeatedly needing the current maximum (scheduling, top-k) | binary heap |
  | Adversarial inputs | randomized quicksort, or heapsort / merge sort for a deterministic guarantee |
- (d) For n = 4 there are 24 leaves, so ⌈lg 24⌉ = 5 comparisons. For n = 5 there are 120 leaves, so ⌈lg 120⌉ = 7 comparisons. Linear time on half the inputs is impossible: 2^h ≥ n!/2 forces h ≥ lg(n!) − 1 = Ω(n lg n).
- (e) Models (adapted from MIT Quiz 1 P5):
  - Integer keys in [0, n): counting sort, Θ(n) worst case.
  - Only a balance scale (three outcomes): Ω(n lg n) applies, so use merge sort or heapsort.
  - An O(1) oracle that returns the maximum of any set: repeated max gives O(n), and the comparison lower bound does not apply.

### Gaps
- Apart from 12(d) and the MIT-derived models, these problems are original. There is no external answer key, but every trace and count was produced by the scripts. MIT's official solutions confirm 12(d) and the heap delete-max format (section 4).

---

## 10. Best free resources and visualizers

### Takeaway
For CLRS-style exam prep, use MIT 6.006 for lecture notes and real quizzes with official solutions, Erickson for free rigorous chapters on recursion, mergesort and quicksort, algs4 for exact comparison counts and stability facts, and VisuAlgo or the USF visualizations to replay traces. Check each tool's pivot and indexing convention before comparing it with an exam trace. CLRS itself should be bought or borrowed; do not use pirated PDFs.

### Cited Findings
- **MIT OCW 6.006 Introduction to Algorithms (Spring 2020; Demaine, Ku, Solomon).**
  - [Lecture 5: Linear Sorting (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf) covers the decision-tree lower bound, counting sort, radix sort and a summary table.
  - [Lecture 8: Binary Heaps (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/40d4851e550507ca14dc778b9b2266cc_MIT6_006S20_lec8.pdf) covers 0-based heaps, heap sort and linear build.
  - The [exams page](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/exams/) lists Quizzes 1–3 and the final, each with solutions, plus quiz reviews with solutions.
  - [Quiz 1 solutions (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf) includes heap problems and a "which sort is most efficient" problem.
- **Jeff Erickson, *Algorithms*** ([home page](https://jeffe.cs.illinois.edu/teaching/algorithms/)). The textbook is "licensed under a Creative Commons Attribution 4.0 International license", and the page says "Anyone is welcome to download, print, use, copy, and/or distribute anything on this page".
  - [Chapter 1 Recursion (PDF)](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf) covers mergesort, quicksort and recursion trees.
  - The [randomized algorithms / nuts-and-bolts notes (PDF)](http://jeffe.cs.illinois.edu/teaching/algorithms/notes/02-nutsbolts.pdf) give the 2/(j−i+1) comparison probability.
  - These details are from [Erickson's home page](https://jeffe.cs.illinois.edu/teaching/algorithms/).
- **Princeton algs4 booksite (Sedgewick and Wayne):** [2.1 Elementary Sorts](https://algs4.cs.princeton.edu/21elementary/), [2.2 Mergesort](https://algs4.cs.princeton.edu/22mergesort/), [2.3 Quicksort](https://algs4.cs.princeton.edu/23quicksort/), [2.4 Priority Queues](https://algs4.cs.princeton.edu/24pq/), [2.5 Sorting Applications (stability, choosing a sort)](https://algs4.cs.princeton.edu/25applications/) and [5.1 String Sorts (LSD)](https://algs4.cs.princeton.edu/51radix/). These contain the exact compare and exchange propositions quoted above.
- **VisuAlgo Sorting** ([visualgo.net/en/sorting](https://visualgo.net/en/sorting)) covers bubble, selection, insertion, merge, quick, random quick, counting and radix sort. It has an e-Lecture mode, custom input (random, sorted, nearly sorted, many duplicates, or your own array), and an online quiz and training mode with auto-grading. — [VisuAlgo](https://visualgo.net/en/sorting)
- **VisuAlgo Binary Heap** ([visualgo.net/en/heap](https://visualgo.net/en/heap)) uses a 1-based array and covers Insert, ExtractMax, Create in O(N log N) and in O(N), HeapSort, UpdateKey and Delete. — [VisuAlgo heap](https://visualgo.net/en/heap)
- **USF Data Structure Visualizations (David Galles)** ([index](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)): [Comparison Sorting](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html) (bubble, selection, insertion, shell, merge, quick), [Heap Sort](https://www.cs.usfca.edu/~galles/visualization/HeapSort.html), [Heaps](https://www.cs.usfca.edu/~galles/visualization/Heap.html), [Counting Sort](https://www.cs.usfca.edu/~galles/visualization/CountingSort.html), [Radix Sort](https://www.cs.usfca.edu/~galles/visualization/RadixSort.html) and [Bucket Sort](https://www.cs.usfca.edu/~galles/visualization/BucketSort.html). — [USF index](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)
- **Wikipedia quick references:** [Quicksort](https://en.wikipedia.org/wiki/Quicksort) (Lomuto and Hoare pseudocode, stack depth), [Merge sort](https://en.wikipedia.org/wiki/Merge_sort), [Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort), [Binary heap](https://en.wikipedia.org/wiki/Binary_heap), [Heapsort](https://en.wikipedia.org/wiki/Heapsort), [Counting sort](https://en.wikipedia.org/wiki/Counting_sort), [Radix sort](https://en.wikipedia.org/wiki/Radix_sort), [Bucket sort](https://en.wikipedia.org/wiki/Bucket_sort) and [Comparison sort](https://en.wikipedia.org/wiki/Comparison_sort).

### Inferences
Suggested 5-day plan before the week-8 midterm (24–30 Oct 2026):
- **Day 1.** Read sections 1–3 of these notes alongside algs4 §2.1–2.3. Replay the quicksort and merge traces in VisuAlgo with custom input `2,8,7,1,3,5,6,4`.
- **Day 2.** Read section 4 alongside MIT Lecture 8. Use the USF HeapSort and Heaps pages to replay BUILD-MAX-HEAP on `4,1,3,2,16,9,10,14,8,7`.
- **Day 3.** Read sections 5 and 6 alongside MIT Lecture 5. Replay counting and radix sort on the USF pages.
- **Day 4.** Do Practice Problems 1–20 on paper with the solutions hidden. Then try MIT Quiz 1 under timed conditions.
- **Day 5.** Review the trap list in section 8 and the master table in section 7. Compare conventions with the professor's Assignment #2 sample solution.

Two cautions:
- The visualizers may use different pivot rules, for example the first element rather than CLRS's last element, and different indexing. Their intermediate arrays may not match a CLRS trace even when both are correct.
- These notes use the classic textbook example arrays for the main traces, which are likely to match the textbook, and fresh arrays for the practice problems.

### Gaps
- My web-search budget for this session ran out partway through. Because of that, I could not locate and verify more .edu practice exams with answer keys, such as Princeton COS 226 or Berkeley CS 61B sorting midterms. MIT 6.006 is the only exam source with official solutions cited here.
- I did not verify which partition scheme or pivot VisuAlgo and the USF pages animate, so check that before comparing their output with a CLRS trace.
- The MIT Press page for CLRS returned HTTP 403 to my fetcher, so no publisher link is given. Buy or borrow the book; I did not consult it online.
- The verification scripts (`clrs.py`, `worked_traces.py`, `verify_counts.py`, `practice.py`, `final_checks.py`) were run in a temporary session scratchpad and are not saved next to these notes.
