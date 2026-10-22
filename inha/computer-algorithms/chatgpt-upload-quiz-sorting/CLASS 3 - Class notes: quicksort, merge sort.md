# CLASS material - notes, weeks 3-4


---

<!-- FILE: Week 3-4 - Insertion sort, quicksort, merge sort - class notes.md -->

# Weeks 3–4 — Insertion sort, quicksort, merge sort (CLASS NOTES — from slides only)

> Sources: [D06-S#] = deck "06 - Insertion Sort-IUT" (10 slides) · [D07-S#] = deck "07 - quicksort" (22 slides) · [D08-S#] = deck "08 - merge sort" (20 slides) · Assignment 2 – Sorting handout + professor's sample solution [A2]. [D04]/[D05] (other class decks) are cited only where these slides lean on them.
> Course: SOC3030-003 Computer Algorithm · Prof. Seth Ashish · Inha University in Tashkent · Fall 2026 · Midterm (25 %) in week 8 (24–30 Oct 2026), covering weeks 1–7.
> Legend: ⭐ = emphasised on the slides (bold, underline, highlight box, or a question→answer reveal pair) / likely exam material · ⚠️ = typo or error on the slide, with the right reading · 🔎 = not explained on the slides, so look it up in Track B.
> Conventions: arrays are **1-indexed** as on the slides (A[1..n]). The helper arrays L and R inside MERGE are 0-indexed, as on [D08-S8]. Every trace in these notes was re-run in Python, with the slide pseudocode copied line by line.

---

## 1. Big picture

- **Sorting** means "arranging elements of set into order". The course lists six solutions: insertion sort, quicksort, mergesort, heapsort, shellsort and radix sorting [D06-S1]. These notes cover the first three.
- **Why sort?** To search unsorted data by comparing keys you need Θ(n) comparisons. Sorted data needs only Θ(log n) [D06-S2].
- The professor sorts algorithms into five pairs of categories: comparison / non-comparison, internal / external, stable / unstable, adaptive / non-adaptive and in-place / out-place [D06-S3]. This table is the easiest source of MCQs.
- **Insertion sort** keeps a sorted segment and grows it one element at a time. It pulls x out, shifts the larger elements right and drops x into the gap. The worst case is O(n²) on reversed input, with F(n) = n(n−1)/2 comparisons or moves. The best case is Ω(n) on input already in ascending order [D06-S5…S8].
- **Quicksort and merge sort are both Divide and Conquer.** Divide into smaller instances of the same problem, conquer them recursively, then combine [D07-S3, D08-S2].
- **Quicksort** does all its work in PARTITION. PARTITION uses the **last element A[r] as the pivot** and returns the pivot's final index q [D07-S4, S5]. The variants taught are randomized quicksort, median-of-3 partition and "Median Method V2" [D07-S6…S10].
- **Quicksort's speed depends on balance.** A balanced split runs as fast as merge sort, Θ(n log n). An unbalanced split (n−1 : 0) runs as slow as insertion sort, Θ(n²), and that happens on **already sorted** input [D07-S11…S14].
- **Merge sort** splits at q = ⌊(p+r)/2⌋, sorts both halves, then MERGEs them in O(n). So T(n) = 2T(n/2) + O(n) = Θ(n log n), and the order of the input makes no difference ("no worst scenario") [D08-S5, S9, S11].
- **Space.** Quicksort's space is the number of recursion levels: O(log n) when balanced, O(n) when unbalanced [D07-S21]. Merge sort needs an extra array, so it is out-place and uses O(n) in total [D08-S10].
- **The recipe for the cost questions in deck 08:** total cost = (merge cost per level) × (number of levels). It gives O(n log n), O(n log log n), O(n² log n) and O(n log(n/k)) [D08-S13…S19].

---

## 2. Slide-by-slide notes

## Deck 06 — Insertion Sort (10 slides)

### [D06-S1] Sorting
- Sorting: "arranging elements of set into order".
- "Solution:" Insertion Sort · Quicksort · Mergesort · Heapsort · Shellsort · Radix Sorting.

### [D06-S2] Application of Sorting
- Searching **unsorted** data by comparing keys: the best possible solutions need **Θ(n)** comparisons.
- Searching **sorted** data by comparing keys: the best possible solutions need **Θ(log n)** comparisons.
- Other uses: sorting data for users, and "More…".
- ⚠️ In the slide image the symbol in front of "(n)" and "(log n)" shows as an empty box. In the original .pptx it is the Symbol-font character θ, so read it as **Θ(n)** and **Θ(log n)**.

### [D06-S3] (untitled) Kinds of sorting ⭐
| Category (slide wording) | Examples given on the slide |
|---|---|
| Comparison based sorting | insertion sort, merge sort, bubble sort, quick sort |
| Non-Comparison based sorting | bucket sort, radix sort, counting sort |
| Internal Sorting | bubble sort, insertion sort |
| External Sorting | quick sort, merge sort |
| Stable sorting | merge sort, insertion sort, bubble sort |
| Unstable sorting | quicksort, heap sort, selection sort |
| Adaptive Sorting ("i.e. sorted or unsorted data") | bubble sort, insertion sort, quick sort |
| Non-Adaptive Sorting | selection sort, merge sort, heap sort |
| In-place / Outplace technique | Among the comparison-based sorts above, **only merge sort is out-place**. Among the non-comparison-based sorts above, **all are out-place**. |

- ⭐ Learn this table by heart. For this unit:
  - **insertion sort** is comparison-based, internal, stable, adaptive and in-place;
  - **quick sort** is comparison-based, external (as this slide lists it), **unstable**, adaptive and in-place;
  - **merge sort** is comparison-based, external, stable, **non-adaptive** and **out-place**.
- The slide gives examples only, not definitions. 🔎 Look up in Track B: the definitions of internal/external, stable and adaptive sorting, and how textbooks classify quick sort (this slide puts it under "External").

### [D06-S4] Insertion Sort (diagram)
- The figure shows two array bars, each split into a green "Sorted partial result" and a red "Unsorted data" part.
  - **Before inserting x:** the sorted part holds a block of "≤ x" values followed by a block of "> x" values. x (red) is the first unsorted cell, and "…" follows.
  - **After inserting x:** the sorted part reads "≤ x | x | > x", followed by the rest of the unsorted data.
- So inserting x places it after every sorted element ≤ x and before every sorted element > x.

### [D06-S5] Insertion Sort — strategy
- Strategy: insert each element in its proper order.
  1. Begin with a sequence E of n elements in arbitrary order.
  2. At first, assume the sorted segment contains only the first element.
  3. Let x be the next element to insert into the sorted segment. Pull x "out of the way", leaving a **vacancy**.
  4. Compare x with the element just left of the vacancy. While x is smaller, move that element into the vacancy, so the vacancy moves one place left.
  5. Otherwise, put x in the vacancy.
  6. Repeat with the next element that has not been examined yet.
- The professor's speaker notes on this slide say:
  - the main strategy is an **incremental (stepwise) approach**: take one element from the unsorted part and insert it into its correct place in the sorted part;
  - it is also **decrease-and-conquer**: the sorted portion acts as the smaller subproblem.

### [D06-S6] Insertion Sort — worked example ⭐
Array: 7, -5, 2, 16, 4. On the slide, a "?" box marks the vacancy and green marks the sorted part.

| Pass | x | Slide's commentary | Array after the pass |
|---|---|---|---|
| start | – | unsorted | 7 -5 2 16 4 |
| 1 | -5 | 7 > -5, shift → reached left boundary, insert -5 | -5 7 2 16 4 |
| 2 | 2 | 7 > 2, shift → -5 < 2, insert 2 | -5 2 7 16 4 |
| 3 | 16 | 7 < 16, insert 16 (no shift) | -5 2 7 16 4 |
| 4 | 4 | 16 > 4, shift → 7 > 4, shift → 2 < 4, insert 4 | -5 2 4 7 16 |

- Result: sorted -5 2 4 7 16. Running the [D06-S7] code gives 7 key comparisons and 4 shifts (full j-by-j trace in §5.1).
- The "2026-10-19 6" in the image footer is just an auto-updating date field and the page number.

### [D06-S7] Insertion Sort — pseudocode ⭐
```
Insertion Sort (A)
for j=2 to A.length
    key = A[j]
    //insert A[j] into sorted sequence A[1..j-1]
    i=j-1
    while (i>0 and A[i] > key )
        A[i+1] =A [i]
        i=i-1
    A[i+1]= key
```
- Mapping to [D06-S5]:
  - j is the position of the element being inserted, and `key` is the x of S5;
  - i walks left through the sorted part A[1..j−1];
  - `A[i+1] = A[i]` is the shift into the vacancy;
  - `A[i+1] = key` fills the vacancy. It runs once per j, so it belongs to the for-loop body.
- `i>0` is the "reached left boundary" case of [D06-S6]. The test `A[i] > key` is strict, so the loop stops at an element equal to key.
- The slide repeats the [D06-S6] trace beside the code.

### [D06-S8] Insertion Sort: Analysis ⭐
- **Worst-case complexity:** W(n) = O(n²), when the elements are in **reversed order**.
- **Best case:** "W(n) = Omega(n)", i.e. Ω(n), when the elements are **already sorted in ascending order**.
- **Analysis [no of comparisons/movement]:**
  F(n) = 1 + 2 + 3 + … + (n−3) + (n−2) + (n−1) = n(n−1)/2 = O(n²)
- Check, running the S7 code with n = 6:
  - reversed input 6 5 4 3 2 1 gives 15 comparisons and 15 shifts, which is 6·5/2;
  - sorted input gives 5 comparisons (n−1) and 0 shifts.
- ⚠️ The best-case line reuses the label W(n), which is the worst-case label. Read it as "best-case running time = Ω(n)".

### [D06-S9] Improvement Analysis ⭐
- Goal: reduce the number of ***comparisons*** and of ***movement*** (both words are underlined on the slide).
- *Reduce number of comparisons* → apply **binary search**.
- *Reduce number of movement* → implement a **doubly linked list**.
- Even so, these **cannot make total running time better than O(n²)**.
- 🔎 Look up in Track B: why neither fix brings the total below O(n²). The slide states this without reasoning.

### [D06-S10] Video lecture
- "Insertion Sort Analysis": https://youtu.be/jikkNiuR2CQ

---

## Deck 07 — Quick Sort Analysis (22 slides)

### [D07-S1] Quick Sort Analysis
- Title slide.

### [D07-S2] Algorithm Design Technique — Divide and Conquer
- Section title slide.

### [D07-S3] Divide and Conquer
- It is often easier to *solve several small instances* of a problem than one large one:
  - ***divide*** the problem into smaller instances of the same problem;
  - solve (***conquer***) the smaller instances recursively;
  - ***combine*** the solutions to get the solution for the original input.
```
Solve(I)
    n = size(I)
    if (n <= smallsize)
        solution = directlySolve(I);
    else
        divide I into I1, , Ik.
        for each i in {1, , k}
            Si = solve(Ii);
        solution = combine(S1, , Sk);
    return solution;
```
- ⚠️ "I1, , Ik", "{1, , k}" and "S1, , Sk" have lost their ellipsis. Read them as I1, …, Ik and so on.
- How the two sorts use the template, reading their pseudocode:
  - **QUICKSORT** [D07-S4] does its real work while dividing (PARTITION), and nothing follows the two recursive calls.
  - **MERGESORT** [D08-S5, S11] divides in O(1) (the midpoint) and does its work while combining (MERGE, O(n)).

### [D07-S4] Pseudocode for quicksort ⭐
```
QUICKSORT(A, p, r)
if  p< r
   then q←PARTITION(A, p, r)
QUICKSORT(A, p, q–1)
QUICKSORT(A, q+1, r)
```
- p and r are the first and last index of the current sub-array.
- PARTITION puts the pivot in its final place q. The two recursive calls then sort A[p..q−1] and A[q+1..r]; the pivot itself is left out.
- The first call is QUICKSORT(A, 1, n) [D07-S5].
- ⚠️ Layout: the two recursive calls are printed level with "if", but they belong to the then-branch. q only exists after PARTITION has run.
- The bottom of the slide lists the **Versions Of Quick sort**: Randomized Quick sort, and Median of 3 Partition.

### [D07-S5] PARTITION + example ⭐
```
PARTITION (A,p,r)
 x=A[r]
 i ← p -1
 For  j ← p to r-1
      do if A[j] <= x
            then i ← i + 1
                 exchange A[i] <-> A[j]
 Exchange A[i+1] <-> A[r]
 Return i+1
```
- **How it works.** The pivot is x = A[r], the **last** element.
  - i starts at p−1, meaning that no element ≤ x has been placed yet.
  - j scans from p to r−1. Each time A[j] ≤ x, i moves up one place and A[j] is swapped into position i.
  - At the end, the pivot is swapped into position i+1, and q = i+1 is returned.
  - Afterwards everything left of q is ≤ x and everything right of q is > x.
- **Scheme.** This single left-to-right scan with the pivot taken from the end is the scheme usually called **Lomuto-style**. The slides never use that name. 🔎 Look up in Track B: "Lomuto vs Hoare partition".
- **Same procedure in the assignment.** The professor's [A2] sample solution uses exactly this procedure (§5.9).
- **Cost.** The for-loop makes exactly r − p comparisons (`A[j] <= x`), which is Θ(n) for n elements. [D07-S12] calls this "the partitioning cost Θ(n)".
- **Slide example:** 5 7 6 1 3 2 4, starting with QUICKSORT(A, 1, 7). The slide gives no worked answer; this is the verified run, with the full j-by-j trace in §5.2.

| Call | Pivot x | Array after the call | q |
|---|---|---|---|
| PARTITION(A,1,7) | 4 | 1 3 2 **4** 7 6 5 | 4 |
| PARTITION(A,1,3) | 2 | 1 **2** 3 4 7 6 5 | 2 |
| PARTITION(A,5,7) | 5 | 1 2 3 4 **5** 6 7 | 5 |
| PARTITION(A,6,7) | 7 | 1 2 3 4 5 6 **7** | 7 |

- The array is sorted: 1 2 3 4 5 6 7.
- 4 PARTITION calls make 6 + 2 + 2 + 1 = 11 comparisons in total.
- 4 happens to be the median of the seven values, so the first split is perfectly balanced (3 | 3).

### [D07-S6] Versions Of Quick sort — Randomized Quick sort ⭐
```
RANDOMIZED-QUICKSORT(A, p, r)
if  p< r
   then q ← RANDOMIZED-PARTITION(A, p, r)
 RANDOMIZED-QUICKSORT(A, p, q–1)
   RANDOMIZED-QUICKSORT(A, q+1, r)

RANDOMIZED-PARTITION (A, p, r)
 i ← RANDOM (p, r)
 exchange A[r] <-> A[i]
 return PARTITION (A, p, r)
```
- "RANDOM(a,b) returns a random integer in the range (a,b) i.e. (b-a+1) integers."
- **Idea:** pick a random index, swap that element into the last slot, then run the ordinary PARTITION, which always uses A[r] as the pivot.
- ⚠️ Here "(a,b)" includes both ends, which is why it counts b − a + 1 integers. For example, RANDOM(1,7) can return any of 1, 2, …, 7, so 7 values.
- ⚠️ As on S4, the two recursive calls belong to the then-branch.
- 🔎 Look up in Track B: the expected running time of randomized quicksort. The slides give pseudocode only.

### [D07-S7] Median Method V2 – Quick Sort (rules)
Partition:
1. Choose a random pivot element
2. swap it with last index element
3. (for i) proceed from left (i++) till elements are less than pivot [also (i<j)]
4. (for j) proceed from right (j--) till elements are more than pivot [also (i<j)]
5. exchange i & j elements when condition is unsatisfied [keeping (i<j)]
6. for (i>j) swap i with last element

- **How it works.** This is a **two-pointer** scheme:
  - i moves right past elements smaller than the pivot;
  - j moves left past elements larger than the pivot;
  - when both have stopped, the two out-of-place elements are swapped;
  - when the pointers cross, A[i] is swapped with the pivot sitting in the last slot.
  - This style is usually called **Hoare-style**. 🔎 Look up in Track B: the name and the exact boundary rules.
- ⚠️ The rules are loose. Rules 3–4 keep i < j, yet rule 6 talks about i > j. Read them as: once the scans meet or cross, swap the element at i with the last element (the pivot). Both readings give the same result on the slide example and on every V2 problem in these notes.
- ⚠️ Despite the name "Median *Method*", rule 1 picks the pivot at random and no median is computed.

### [D07-S8] Median Method V2 – example ⭐
The slide repeats the six rules and gives the example **5 7 6 1 3 2 4**, with no worked answer. The trace below takes the pivot as 4, which is already last, so rule 2 changes nothing. 4 is also the median of the values.

| Round | i stops at (value) | j stops at (value) | Action | Array |
|---|---|---|---|---|
| start | 1 | 6 | pivot 4 sits at position 7 | 5 7 6 1 3 2 4 |
| 1 | 1 (5 ≥ 4) | 6 (2 ≤ 4) | i < j → exchange | 2 7 6 1 3 5 4 |
| 2 | 2 (7) | 5 (3) | exchange | 2 3 6 1 7 5 4 |
| 3 | 3 (6) | 4 (1) | exchange | 2 3 1 6 7 5 4 |
| 4 | 4 (6) | 3 (1), so the pointers have crossed | i > j → swap A[i] with last | 2 3 1 **4** 7 5 6 |

- The pivot 4 ends at position 4, with {2, 3, 1} < 4 on its left and {7, 5, 6} > 4 on its right.
- **Compare with PARTITION [D07-S5]** on the same array: it gives 1 3 2 4 7 6 5. Same q = 4, different order on each side.

### [D07-S9] MEDIAN-OF-3-PARTITION ⭐
```
Median-of-3-Partition (A, p, r)
i ← RANDOM (p, r)
j ← RANDOM (p, r)
k ← RANDOM (p, r)

if(A[i]<=A[j] and A[j]<=A[k]) or (A[k]<=A[j] and A[j]<=A[i])
    then l ← j
else if  if(A[j]<=A[i] and A[i]<=A[k]) or (A[k]<=A[i] and A[i]<=A[j])
    then l ← i
else if (A[i]<=A[k] and A[k]<=A[j]) or (A[j]<=A[k] and A[k]<=A[i])
    then l ← k

exchange A[r] <-> A[l]
return PARTITION (A, p, r)
```
- **Idea:** pick three random positions and let l be the index of the **middle value** of A[i], A[j], A[k]. j is tested first, then i, then k. Swap A[l] to the end, then run the ordinary PARTITION.
- Slide text: "This approach tends to choose the pivot value as median of 3 elements selected randomly. In general this algorithm gives very good results except for few cases."
- ⚠️ "else if  if(" has a stray second "if". Read it as "else if (".

### [D07-S10] Median-of-3-Partition — the worst sequence ⭐
- Slide text:
  - "Generally, with any value of i, j, k it will dilute the worst sequence."
  - "Consider any worst case sequence: **23, 67, 12, 89, 34, 95**."
- **Why it is bad for plain PARTITION:** the last element, 95, is the largest. PARTITION(A,1,6) leaves every other element to its left, a **5 : 0 split**, which is the unbalanced case of [D07-S12].
- **With median-of-3**, take for example i=1, j=2, k=5:
  - the values are 23, 67 and 34, so the median is 34 and l = k = 5;
  - exchange A[6]↔A[5] → 23 67 12 89 95 34;
  - PARTITION → 23 12 **34** 89 95 67, with q = 3, a 2 : 3 split. Full trace in §5.4.
- **Counting all 6·6·6 = 216 choices of (i, j, k)** with the slide's code:
  - the pivot is the extreme value 95 in only 16 choices, and 12 in another 16;
  - the other 184 choices give a 1 : 4 split or better.
  - That is the "dilution". The 32 extreme choices are the "few cases" of [D07-S9].

### [D07-S11] Performance of Quick Sort ⭐
- It depends on whether partitioning is **balanced or unbalanced**:
  - if it is **balanced**, it runs asymptotically **as fast as merge sort**;
  - if it is **unbalanced**, it runs asymptotically **as slow as insertion sort**.

### [D07-S12] Worst Case Partitioning ⭐
- The worst case happens when partitioning produces one sub-problem with **n−1** elements and one with **zero** elements.
- Assume unbalanced partitioning. The partitioning costs **Θ(n)** time.
- The recurrence for the running time:
  ```
  T(n) = T(n−1) + T(0) + Θ(n)
       = T(n−1) + Θ(n)
  ```
  "Using recurrence Method we get" **Θ(n²)**.
- ⭐ **Note:** this occurs when the **input array is already sorted**, which is the best-case condition for insertion sort.
- **Cross-reference:** this is the form "n + T(n−1) ⇒ O(n²)" in the class list for decreasing functions, Master theorem case a = 1 [D05-S4].
- **Demo** with sorted input 1 2 3 4 5 6:
  - every PARTITION takes the largest value as pivot and fixes it at the end;
  - the splits are 5:0, 4:0, 3:0, 2:0 and 1:0;
  - total comparisons = 5+4+3+2+1 = 15 = n(n−1)/2.

### [D07-S13] Best Case Partitioning ⭐
- The recurrence for the running time: **T(n) ≤ 2T(n/2) + Θ(n)**.
- "Using Main recurrence theorem we get **T(n) = Θ(n log n)**."
- ⚠️ "Main recurrence theorem" means the **Master theorem**. Deck 08 solves the same recurrence "By masters theorem" [D08-S11].
  - Here a = 2, b = 2, k = 1, p = 0, so a = bᵏ and p > −1.
  - That gives Θ(n^(log₂2) · log n) = Θ(n log n) [D05-S5].

### [D07-S14] Splits in a ratio, and alternating splits
- When the partitioning splits in **some ratio**: T(n) = Θ(n log n).
- When the partitioning **alternates between best and worst** splits: T(n) = Θ(n log n).
- 🔎 Look up in Track B: how these two results are derived. The slide gives the results only.

### [D07-S15] Median as pivot — question
- "The median of 'n' elements can be found in O(n) time. What is the complexity of quicksort, in which medium is selected as pivot?"
- The working is hidden under a blue box on this slide and revealed on S16. The hidden version ends "= Θ(n log n)".

### [D07-S16] Median as pivot — answer ⭐
- The cost parts are: finding the median + swapping it with the last (pivot) position + partitioning + dividing into equal halves.
```
T(n) = O(n) + O(1) + O(n) + 2T(n/2)
     = O(n) + 2T(n/2)
     = O(n log n)
```
- ⚠️ "medium" should read **median**.
- 🔎 Look up in Track B: how the median is found in O(n). The slide takes it as given.

### [D07-S17] (n/4)-th smallest as pivot — question
- "In quick sort, for sorting 'n' elements, the (n/4)th smallest element is selected as pivot using O(n) time algorithm. What is the worst case complexity of quick sort?"
- The working is hidden under a box and revealed on S18.

### [D07-S18] (n/4)-th smallest as pivot — answer ⭐
- The cost parts are: selecting the element + swapping it with the pivot position + partition + two partitions "in ration 1:4".
```
T(n) = O(n) + O(1) + O(n) + T(n/4) + T(3n/4)
     = O(n) + Θ(n log n)
     = Θ(n log n)
```
- ⚠️ "ration" should read **ratio**. The two parts hold n/4 and 3n/4 elements, which is a 1 : 3 split (one quarter against three quarters). Read the slide's "1:4" as "one-fourth".
- **Lesson:** a lopsided split stays Θ(n log n) as long as it is a fixed proportion. This matches "some ratio" on [D07-S14].
- 🔎 Look up in Track B: the recursion-tree working for T(n/4) + T(3n/4) + O(n). Deck 04 lists the recursion-tree method as a technique [D04-S2] but this slide doesn't show the working.

### [D07-S19] T1 vs T2 — question
- "Let T1 and T2 be the time taken partitioning the following sequences": 1, 2, 3, 4, 5, …, n takes T1, and n, n−1, n−2, …, 1 takes T2. "Find the relation between T1 and T2?"
- The answer is hidden on this slide.

### [D07-S20] T1 vs T2 — answer ⭐
- **Ans: T1 = T2** (bold on the slide).
- **Check with the slide's PARTITION:**
  - A single PARTITION call makes n−1 comparisons on either input.
  - The whole QUICKSORT makes n(n−1)/2 comparisons on both inputs (tested for n = 5, 6, 8 and 10).
  - Sorted input always takes the largest value as pivot. Reversed input takes the smallest and the largest in turn.
  - Either way every split is (k−1) : 0, the worst case of [D07-S12]. Both traces are in §5.5.

### [D07-S21] Space Complexity ⭐
- Space complexity is "defined by number of levels in recursive tree":
  - for a **balanced** partition it is **O(log n)**;
  - for an **unbalanced** partition it is **O(n)**.

### [D07-S22] Video lectures
- Divide And Conquer Strategy of problem Solving: https://youtu.be/HO4B-kG_6Ag
- Quick Sort Analysis: https://youtu.be/LPE9xYEsfIU
- Quick Sort Analysis for various partitioning scenarios: https://youtu.be/gCP06CTpEaE
- Understanding Space Complexity: https://youtu.be/HEZdrU8ZPIk
- https://cexpertvision.com/2020/10/18/comparison-based-sorting-ca/

---

## Deck 08 — Merge Sort Analysis (20 slides)

### [D08-S1] MERGE SORT ANALYSIS
- Title slide.

### [D08-S2] Divide and Conquer
- Same text and the same `Solve(I)` pseudocode as [D07-S3]: divide → conquer (solve recursively) → combine.
- ⚠️ Same missing ellipses: "I1, , Ik" should read I1, …, Ik.

### [D08-S3] Mergesort: Using Divide and Conquer — Mergesort Strategy
- Diagram:
  1. An array runs from "first" to "last". An arrow marks the split point ⌊(first + last)/2⌋.
  2. Each half goes down an arrow labelled "Sort recursively by Mergesort", giving two "Sorted" halves.
  3. Two arrows labelled "Merge" join them into one "Sorted" array.

### [D08-S4] Using Divide and Conquer: Mergesort — Mergesort Strategy
- Coloured-bar diagram, with a thumbnail of S3 in the corner:
  - **Division phase:** 1 bar → 2 halves → 4 quarters → 8 single cells.
  - **Merge phase:** the 8 cells merge in pairs → 4 bars → 2 bars → 1 bar.
- For 8 elements that is 3 levels of halving and 3 levels of merging, since log₂8 = 3. These are the "log n levels" used in [D08-S13].

### [D08-S5] Algorithm: Mergesort ⭐
- **Input:** array A and the indexes first (p) and last (r).
- **Output:** A[first], …, A[last] is a sorted rearrangement of the same elements.
```
MERGESORT(A, p, r)
if  p< r
   then q← floor[(p+r)/2]
        MERGESORT(A, p, q)
   MERGESORT(A, q+1, r)
     MERGE(A,p,q,r)
```
- **The split.** The left half is A[p..q] and includes the middle element. The right half is A[q+1..r].
  - When the size is odd, the left half is the bigger one: p=1, r=7 gives q=4, so 4 + 3; p=1, r=3 gives q=2, so 2 + 1.
  - The professor's [A2] sample splits 9 7 2 | 15 32 10, then 9 7 | 2 and 15 32 | 10.
- ⚠️ As on [D07-S4], all three lines after "then" belong to the then-branch, whatever their printed indentation.

### [D08-S6] MERGE(A,p,q,r) – Merging Sorted Sequences ⭐
- **Problem:** given two sequences A and B sorted in nondecreasing order, merge them into one sorted sequence C. Here A and B just name the two sequences; they are not the array A of MERGE(A,p,q,r).
- **Strategy:** determine the first item of C.
  - It is the minimum of the first items of A and B.
  - Suppose it is A's first item. Then the rest of C is the merge of the rest of A with B.
- **Example:** A (12, 34, 38, 78), B (2, 56, 87, 90, 98) → C (2, 12, 34, 38, 56, 78, 87, 90, 98).
- **Step by step**, comparing the two front items each time:
  - 12 vs 2 → 2
  - 12 vs 56 → 12
  - 34 vs 56 → 34
  - 38 vs 56 → 38
  - 78 vs 56 → 56
  - 78 vs 87 → 78
  - A is now empty, so copy 87, 90, 98.
  - That is 6 comparisons for 9 items (§5.6).

### [D08-S7] Example of Merge Sort (textbook table) ⭐
- The slide is a photo of a textbook table for **85 24 63 45 17 31 96 50**, with the MERGESORT pseudocode and the S4 bars laid over it.
- Row labels: "MS" means a MERGESORT call, "Div" means divide, "Merge" means merge. The number is the recursion level.

Rows visible on the slide:

| Row | Content |
|---|---|
| 0 MS | 85 24 63 45 17 31 96 50 |
| 1 Div | 85 24 63 45 ‖ 17 31 96 50 |
| 1 MS | 85 24 63 45 |
| 2 Div | 85 24 ‖ 63 45 |
| 2 MS | 85 24 |
| 3 Div | 85 ‖ 24 |
| 3 MS | 85 |
| 3 MS | 24 |
| 3 Merge | 24 85 |
| 2 MS | 63 45 |
| 3 Div | 63 ‖ 45 |
| 3 MS | 63 |
| 3 MS | 45 |
| 3 Merge | 45 63 |
| 2 Merge | 24 45 63 85 |

- The photo is cut off at this point; the right half, 17 31 96 50, is still shown greyed out.
- Completing it the same way (verified): 17 31 and 50 96 are merged into 17 31 50 96. The final merge gives **17 24 31 45 50 63 85 96**. The full table is in §5.7.

### [D08-S8] Merge(A,p,q,r) — pseudocode ⭐
```
Merge(A,p,q,r)
{
n1=q – p + 1
n2=r - q
Let L[1..n1] & R[1..n2] be new array
for ( i= 0 to n1-1 )
      L[i]= A[p+i]
for ( j= 0 to n2-1 )
      R[j]= A[(q+1)+j]

i=0, j=0
for ( k= p to r )
if (L[i]  <= R[j])
      A[k] = L[i]
      i =i +1
else
      A[k] = R[j]
      j=j+1

}
```
- **How it works.**
  - Copy the left run A[p..q] into L (n1 items) and the right run A[q+1..r] into R (n2 items).
  - Then refill A[p..r] from left to right, using k. Each time, take the smaller of the two front items L[i] and R[j].
  - Because the test is `<=`, a tie takes the item from L.
- The if/else is the body of the `for k` loop, so exactly one item is placed for each k.
- ⚠️ **Index base:** the slide declares L[1..n1] and R[1..n2], but then fills and reads L[0..n1−1] and R[0..n2−1].
- ⚠️ **Missing rule:** once L or R is used up, L[i] or R[j] no longer exists, and the slide doesn't say what to do.
  - In every trace in these notes, the rest of the other list is copied in order. That is the "merge the rest" strategy of [D08-S6].
  - 🔎 Look up in Track B: how the textbook version handles an exhausted list (for example, sentinel values).

### [D08-S9] MERGE SORT ANALYSIS ⭐
- The slide shows Merge (same code as S8) and MERGESORT side by side.
- An arrow points from Merge(A,p,q,r) to **O(n)**.
- **Total Cost = Divide + conquer + merge:**
  - T(n) = C1 + 2T(n/2) + Cn ∈ **O(n log n)**
- In the image the symbol before O(n log n) is an empty box. In the .pptx it is the Symbol-font "∈".

### [D08-S10] Space Complexity ⭐
- **Calculation of stack size:** "In general, ***stack size will be levels in a tree***, which is (log n)." (underlined on the slide)
- **Memory requirement:**
  - each merge-sort call consumes O(log n);
  - Merge consumes O(n);
  - total space requirement = O(log n) + O(n) = **O(n)**.
- Merge sort is called an **out-of-space / out-place** algorithm because it needs an extra array to do partial processing. The extra space it uses depends on the input size.
- It needs 'n' extra cells to copy elements from two sorted arrays into one, so each merge needs O(n) memory. Since this memory is **reused** 'log n' times, the **effective memory requirement is O(n)**.

### [D08-S11] Time Complexity ⭐
- Divide n Conquer notation: **[T(n) = Divide + Recursion + Merge]**
```
T(n) = O(1) + T(n/2) + T(n/2) + O(n)
     = (n) + 2 T(n/2)   [By masters theorem]
     = Θ( n log n)
```
- ⭐ Highlighted on the slide: "**There is no worst scenario as it works same for ascending or descending order.**" This matches [D06-S3], which lists merge sort as **non-adaptive**.
- ⚠️ In "= (n) + 2T(n/2)" the O is missing; it should read O(n) + 2T(n/2).
- **Master theorem check** [D05-S5]: a = 2, b = 2, k = 1, p = 0, so a = bᵏ and p > −1. That gives Θ(n log n).

### [D08-S12] Calculate the cost — question
- "Given n elements, merge them using merge procedure to get one sorted list of n elements."

### [D08-S13] Calculate the cost — answer ⭐
- Each merge procedure (merging two sorted lists into one and moving to the next higher level) costs **O(n)** per level.
- Total levels to reach one sorted list = **log n**.
- ➔ Total time = O(n) · log n = **O(n log n)**.

### [D08-S14] log n sorted lists of size n/log n — question
- "Given 'log n' sorted list each of size 'n/log n', what is the total time required to merge them into single sorted list?"

### [D08-S15] log n sorted lists — answer ⭐
The slide's two-column table:

| Normal merge sort | This question |
|---|---|
| n elements of size 1: one level costs n·1 = O(n) | (log n) lists of size n/log n: one level costs (log n)·n/(log n) = O(n) |
| for n elements there are **log n** levels | for (log n) lists there are **log (log n)** levels |
| total = cost of merge at each level × total levels = O(n) · log n = **O(n log n)** | total = O(n) · log(log n) = **O(n log(log n))** |

- ⚠️ Wording: "N elements" means n. "(log n) elements each of size n/logn" means log n sorted *lists*.

### [D08-S16] n strings of length n — question
- "'n' strings each of length 'n' are given. What will be the time taken to sort them?"

### [D08-S17] n strings — answer ⭐
- Cost of merging n elements of size 1 = O(n).
- So merging n strings, each of size n, costs O(n) · O(n) = **O(n²)** per level.
- Total levels = (log n).
- So the total cost is T(n) = O(n²) · log n = **O(n² log n)**.
- 🔎 Look up in Track B: why comparing two strings counts as O(n). The slide simply treats each item as having size n.

### [D08-S18] Base case of size k — question
- "Assume that size k problem could be independently solved (instead of 1). n numbers (k<n) to be sorted. Compute the running time of Merge sort?"

### [D08-S19] Base case of size k — answer ⭐
- Number of pieces of size k to be merged: (n/k).
- Cost of merging at each level = O(n).
- Total number of levels = log (n/k).
- ➔ Total cost = O(n) · log(n/k) = **O(n log(n/k))**.
- ⚠️ The second bullet on the slide says "k elements of size (n/k)", which swaps the first bullet's "n/k pieces of size k". The cost per level is O(n) either way.
- 🔎 Look up in Track B: whether to add the cost of solving the n/k base pieces themselves. The slide counts only the merging.

### [D08-S20] Video lectures
- Quick Sort Analysis for various partitioning scenarios: https://youtu.be/gCP06CTpEaE
- Merge Sort Algorithm: https://www.youtube.com/watch?v=RH0p7DYyMn4
- Merge Procedure illustrative Example: https://www.youtube.com/watch?v=WzDq-WQALy0
- Understanding Space Complexity: https://youtu.be/HEZdrU8ZPIk
- Merge Sort Complexity Analysis: https://www.youtube.com/watch?v=x1dJx89Elf0
- https://cexpertvision.com/2020/10/18/comparison-based-sorting-ca/
- In the image, this URL is printed on top of the "Merge Sort Complexity Analysis" line. The text is complete in the source file.

---

## 3. Definitions & key terms

| Term | Meaning as taught | Ref |
|---|---|---|
| Sorting | "arranging elements of set into order" | [D06-S1] |
| Comparison / non-comparison based sorting | Only examples are given: insertion, merge, bubble and quick are comparison-based; bucket, radix and counting are not. | [D06-S3] |
| Internal / External sorting | Only examples are given: bubble and insertion are internal; quick and merge are external. 🔎 Look up the definitions in Track B. | [D06-S3] |
| Stable / Unstable sorting | Only examples are given: merge, insertion and bubble are stable; quick, heap and selection are unstable. 🔎 Look up the definition in Track B. | [D06-S3] |
| Adaptive / Non-adaptive sorting | The slide's gloss is "i.e. sorted or unsorted data": the existing order of the input matters. Insertion sort (Ω(n) on sorted input against O(n²) on reversed [D06-S8]) and quicksort (worst on sorted input [D07-S12]) are adaptive. Merge sort "works same for ascending or descending order" [D08-S11], so it is non-adaptive. 🔎 Look up the formal definition in Track B. | [D06-S3] |
| In-place / Out-place (out-of-space) | An out-place algorithm "needs extra array to do partial processing", and its extra space depends on the input size. Among the comparison sorts listed, only merge sort is out-place. | [D06-S3], [D08-S10] |
| Divide and Conquer | **Divide** into smaller instances of the same problem, **conquer** them recursively, **combine** the solutions. Template: `Solve(I)`. | [D07-S3], [D08-S2] |
| Divide n Conquer notation | T(n) = Divide + Recursion + Merge | [D08-S11] |
| Incremental (stepwise) approach / decrease-and-conquer | Insertion sort's strategy: insert one element at a time into the growing sorted part. | [D06-S5] notes |
| Sorted segment, key (x), vacancy | The sorted prefix; the element being inserted; the gap left after pulling x "out of the way". | [D06-S5], [D06-S7] |
| F(n) | The insertion sort count of comparisons/movements: 1 + 2 + … + (n−1) = n(n−1)/2 | [D06-S8] |
| Pivot | The element PARTITION splits around. It is x = A[r], the last element. Other versions first swap their chosen element into A[r]. | [D07-S5], [D07-S6], [D07-S9] |
| PARTITION / q | PARTITION rearranges A[p..r] around the pivot and returns the pivot's final index q = i+1. | [D07-S5] |
| Balanced / unbalanced partitioning | Balanced: quicksort runs as fast as merge sort. Unbalanced: as slow as insertion sort. | [D07-S11] |
| Worst-case partitioning | One sub-problem with n−1 elements and one with 0 elements. | [D07-S12] |
| Best-case partitioning | Two halves: T(n) ≤ 2T(n/2) + Θ(n). | [D07-S13] |
| RANDOM(a,b) | Returns a random integer among the b−a+1 integers from a to b. | [D07-S6] |
| Randomized partition | Swap A[RANDOM(p,r)] into A[r], then run PARTITION. | [D07-S6] |
| Median-of-3 partition | The pivot is the middle value of three randomly chosen elements. | [D07-S9] |
| Median Method V2 | A partition with a random pivot and two pointers (i from the left, j from the right). | [D07-S7] |
| MERGE | Merging two sequences sorted in nondecreasing order into one sorted sequence. It costs O(n). | [D08-S6], [D08-S9] |
| Level (of the recursion tree) | Merge sort has log n levels [D08-S13]. Space = "number of levels in recursive tree" [D07-S21]. "Stack size will be levels in a tree" [D08-S10]. | as cited |
| Cost recipe | Total cost = cost of merge at each level × total levels. | [D08-S15] |
| W(n), best case | The worst-case and best-case running times used in the insertion sort analysis. | [D06-S8] |
| Recurrence method / "Main recurrence theorem" | The ways the slides solve T(n). "Main recurrence theorem" means the Master theorem [D08-S11], [D05]. | [D07-S12], [D07-S13] |

---

## 4. Algorithm cards as taught

### Card A — Insertion sort [D06]
```
Insertion Sort (A)
for j=2 to A.length
    key = A[j]
    //insert A[j] into sorted sequence A[1..j-1]
    i=j-1
    while (i>0 and A[i] > key )
        A[i+1] =A [i]
        i=i-1
    A[i+1]= key
```
| Field | As taught |
|---|---|
| Idea | Grow a sorted segment from the left. Pull out the next element x, shift the larger sorted elements right, and put x in the vacancy [D06-S5]. |
| Best case | **Ω(n)**, when the input is already sorted in ascending order [D06-S8]. Checked: n−1 comparisons, 0 shifts. |
| Worst case | **O(n²)**, when the input is in reversed order. F(n) = 1+2+…+(n−1) = **n(n−1)/2** comparisons/movements [D06-S8]. |
| Average case | Not on the slides. 🔎 Look up in Track B. |
| Recurrence | None on the slides. The speaker notes call it decrease-and-conquer. 🔎 Look up in Track B. |
| Stable? | **Yes** [D06-S3] |
| In-place? | **Yes**: among the comparison sorts listed, only merge sort is out-place [D06-S3]. |
| Other labels | Comparison-based, internal, adaptive [D06-S3]. |
| Improvements | Binary search cuts comparisons; a doubly linked list cuts movement. Neither makes the total better than O(n²) [D06-S9]. |

### Card B — Quicksort with PARTITION [D07-S4, S5]
```
QUICKSORT(A, p, r)
if  p< r
   then q←PARTITION(A, p, r)
QUICKSORT(A, p, q–1)
QUICKSORT(A, q+1, r)

PARTITION (A,p,r)
 x=A[r]
 i ← p -1
 For  j ← p to r-1
      do if A[j] <= x
            then i ← i + 1
                 exchange A[i] <-> A[j]
 Exchange A[i+1] <-> A[r]
 Return i+1
```
| Field | As taught |
|---|---|
| Idea | Partition around the pivot A[r], so that values ≤ pivot end up left of q and values > pivot end up right. Then recurse on both sides. Nothing is left to combine. |
| Partition scheme | Pivot taken from the end, one left-to-right scan with a boundary index i. This is the style usually called **Lomuto** (the name is not on the slides). Each call makes r − p comparisons. |
| Best case | **Θ(n log n)** from T(n) ≤ 2T(n/2) + Θ(n), by the "Main recurrence" (Master) theorem [D07-S13]. |
| Worst case | **Θ(n²)** from T(n) = T(n−1) + T(0) + Θ(n) = T(n−1) + Θ(n) [D07-S12]. It happens on an **already sorted** input. Sorted and reverse-sorted inputs take the same time: T1 = T2 [D07-S20]. |
| Other splits | A split in some ratio: Θ(n log n). Alternating best and worst splits: Θ(n log n) [D07-S14]. Median as pivot, found in O(n): O(n log n) [D07-S16]. The (n/4)-th smallest as pivot: Θ(n log n) [D07-S18]. |
| Average case | The slides don't use the word "average". 🔎 Look up in Track B. |
| Space | "Number of levels in recursive tree": **O(log n)** when balanced, **O(n)** when unbalanced [D07-S21]. |
| Stable? | **No**, it is listed as unstable [D06-S3]. |
| In-place? | **Yes**: only merge sort is out-place among the comparison sorts listed [D06-S3]. |
| Other labels | Comparison-based, adaptive, and "external" as the slide lists it [D06-S3]. |

### Card C — Randomized quicksort [D07-S6]
```
RANDOMIZED-PARTITION (A, p, r)
 i ← RANDOM (p, r)
 exchange A[r] <-> A[i]
 return PARTITION (A, p, r)
```
- **Idea:** a random element becomes the pivot by being swapped into A[r]. RANDOMIZED-QUICKSORT is QUICKSORT with RANDOMIZED-PARTITION in place of PARTITION.
- **Complexity, stability and in-place:** not stated on the slides. 🔎 Look up in Track B.

### Card D — Median-of-3 partition [D07-S9, S10]
- **Pseudocode:** see [D07-S9] in §2.
- **Idea:** l is the index of the middle value of three random positions. Exchange A[r] ↔ A[l], then PARTITION.
- **Claim on the slides:** "very good results except for few cases"; it "dilute[s] the worst sequence".
- **Complexity formula:** not on the slides. 🔎 Look up in Track B.

### Card E — Median Method V2 partition [D07-S7, S8]
- **Rules:**
  1. random pivot;
  2. swap it to the last index;
  3. i moves right while the elements are smaller than the pivot;
  4. j moves left while the elements are larger;
  5. when both stop with i < j, exchange them;
  6. once the pointers cross, swap A[i] with the last element.
- **Style:** two-pointer, usually called Hoare-style (the name is not on the slides).
- **Complexity:** not stated. 🔎 Look up in Track B.

### Card F — Merge sort with MERGE [D08-S5, S8]
```
MERGESORT(A, p, r)
if  p< r
   then q← floor[(p+r)/2]
        MERGESORT(A, p, q)
   MERGESORT(A, q+1, r)
     MERGE(A,p,q,r)
```
(MERGE as on [D08-S8], in §2.)

| Field | As taught |
|---|---|
| Idea | Split at the midpoint q = ⌊(p+r)/2⌋, sort A[p..q] and A[q+1..r] recursively, then MERGE the two sorted runs [D08-S3, S5]. |
| MERGE cost | **O(n)** [D08-S9] |
| Recurrence | T(n) = O(1) + T(n/2) + T(n/2) + O(n) = O(n) + 2T(n/2) [D08-S11]. Also written T(n) = C1 + 2T(n/2) + Cn [D08-S9]. |
| Best = worst | **Θ(n log n)** by the Master theorem. "There is no worst scenario as it works same for ascending or descending order" [D08-S11]. |
| Average case | Not stated separately. The same Θ(n log n) applies whatever the order, per [D08-S11]. |
| Space | Stack O(log n) + merge O(n) = **O(n)**. The merge memory is reused log n times, so the effective requirement is O(n) [D08-S10]. |
| Stable? | **Yes** [D06-S3]. 🔎 Look up in Track B: how the `<=` in MERGE relates to stability. |
| In-place? | **No**: out-place (out-of-space), because it needs an extra array [D06-S3], [D08-S10]. |
| Other labels | Comparison-based, external, non-adaptive [D06-S3]. |
| Cost variants | log n lists of size n/log n: O(n log log n) [D08-S15]. n strings of length n: O(n² log n) [D08-S17]. Base case of size k: O(n log(n/k)) [D08-S19]. |

### Side-by-side summary (only what the slides state)

| | Insertion | Quick | Merge |
|---|---|---|---|
| Best | Ω(n), already sorted | Θ(n log n), balanced | Θ(n log n) |
| Worst | O(n²), reversed | Θ(n²), already sorted | Θ(n log n): "no worst scenario" |
| Key recurrence | – | T(n−1)+Θ(n) and 2T(n/2)+Θ(n) | 2T(n/2)+O(n) |
| Extra space | – (in-place) | O(log n) balanced / O(n) unbalanced | O(n) |
| Stable | yes | no | yes |
| In-place | yes | yes | no (out-place) |
| Adaptive | yes | yes | no |

---

## 5. Worked traces

Every trace below was produced by running the slide pseudocode exactly as written (1-indexed). The only addition is the "list used up" rule in MERGE, explained at [D08-S8].

### 5.1 [D06-S6/S7] Insertion sort on 7, -5, 2, 16, 4

| j | key | while-loop steps (`A[i] > key` checks) | A[i+1] = key | Array after pass | comps | shifts |
|---|---|---|---|---|---|---|
| 2 | -5 | i=1: 7 > -5 → A[2]=7, i=0 · i=0 stops the loop (left boundary) | A[1] = -5 | -5 7 2 16 4 | 1 | 1 |
| 3 | 2 | i=2: 7 > 2 → A[3]=7, i=1 · i=1: -5 > 2? no → stop | A[2] = 2 | -5 2 7 16 4 | 2 | 1 |
| 4 | 16 | i=3: 7 > 16? no → stop | A[4] = 16 | -5 2 7 16 4 | 1 | 0 |
| 5 | 4 | i=4: 16 > 4 → A[5]=16, i=3 · i=3: 7 > 4 → A[4]=7, i=2 · i=2: 2 > 4? no → stop | A[3] = 4 | **-5 2 4 7 16** | 3 | 2 |

Totals: **7 comparisons, 4 shifts**. For n = 5, the worst case would be F(5) = 10 and the best case 4.

### 5.2 [D07-S5] QUICKSORT(A, 1, 7) on 5 7 6 1 3 2 4

**PARTITION(A,1,7):** x = A[7] = 4, i = 0

| j | A[j] | A[j] ≤ 4? | i | exchange | Array |
|---|---|---|---|---|---|
| 1 | 5 | no | 0 | – | 5 7 6 1 3 2 4 |
| 2 | 7 | no | 0 | – | 5 7 6 1 3 2 4 |
| 3 | 6 | no | 0 | – | 5 7 6 1 3 2 4 |
| 4 | 1 | yes | 1 | A[1]↔A[4] | 1 7 6 5 3 2 4 |
| 5 | 3 | yes | 2 | A[2]↔A[5] | 1 3 6 5 7 2 4 |
| 6 | 2 | yes | 3 | A[3]↔A[6] | 1 3 2 5 7 6 4 |
| end | | | | A[i+1]↔A[r] = A[4]↔A[7] | 1 3 2 **4** 7 6 5, **q = 4** |

**QUICKSORT(A,1,3) → PARTITION(A,1,3):** x = A[3] = 2, i = 0

| j | A[j] | ≤ 2? | i | exchange | A[1..3] |
|---|---|---|---|---|---|
| 1 | 1 | yes | 1 | A[1]↔A[1] (itself) | 1 3 2 |
| 2 | 3 | no | 1 | – | 1 3 2 |
| end | | | | A[2]↔A[3] | 1 **2** 3, **q = 2** |

QUICKSORT(A,1,1) and QUICKSORT(A,3,3) have p = r, so there is nothing to do.

**QUICKSORT(A,5,7) → PARTITION(A,5,7):** x = A[7] = 5, i = 4

| j | A[j] | ≤ 5? | i | exchange | A[5..7] |
|---|---|---|---|---|---|
| 5 | 7 | no | 4 | – | 7 6 5 |
| 6 | 6 | no | 4 | – | 7 6 5 |
| end | | | | A[5]↔A[7] | **5** 6 7, **q = 5** |

QUICKSORT(A,5,4) is empty. **QUICKSORT(A,6,7) → PARTITION(A,6,7):** x = 7, i = 5. At j=6, 6 ≤ 7, so i=6 and A[6] is exchanged with itself. The final exchange A[7]↔A[7] is also with itself, giving 6 **7** and **q = 7**.

Recursion tree:
```
QS(1,7) q=4
├── QS(1,3) q=2
│   ├── QS(1,1)
│   └── QS(3,3)
└── QS(5,7) q=5
    ├── QS(5,4)  empty
    └── QS(6,7) q=7
        ├── QS(6,6)
        └── QS(8,7)  empty
```
Result: **1 2 3 4 5 6 7**, after 4 PARTITION calls and 6 + 2 + 2 + 1 = **11 comparisons**.

### 5.3 [D07-S8] Median Method V2 on 5 7 6 1 3 2 4, with pivot 4

Rules 1–2: the pivot 4 is already at the last index (7). i starts at 1 and j at 6.
1. i: A[1]=5 is not < 4, so i stops at 1. j: A[6]=2 is not > 4, so j stops at 6. i < j, so exchange → **2 7 6 1 3 5 4**.
2. i: A[2]=7 stops it at 2. j: A[5]=3 stops it at 5. Exchange → **2 3 6 1 7 5 4**.
3. i: A[3]=6 stops it at 3. j: A[4]=1 stops it at 4. Exchange → **2 3 1 6 7 5 4**.
4. i: A[3]=1 < 4, so i moves to 4; A[4]=6 stops it. j: A[4]=6 > 4, so j moves to 3; A[3]=1 stops it. Now i = 4 > j = 3, so rule 6 swaps A[4] with A[7] → **2 3 1 4 7 5 6**.

The pivot is at position 4, with all smaller values to its left and all larger values to its right.

### 5.4 [D07-S10] 23, 67, 12, 89, 34, 95: plain PARTITION against median-of-3

**(a) Plain PARTITION(A,1,6):** x = 95.
- Every A[j] is ≤ 95, so i follows j and every exchange is with itself. The final exchange A[6]↔A[6] is also with itself.
- The array is unchanged and **q = 6**: the split is **5 : 0**, the worst case.

**(b) Median-of-3 with i=1, j=2, k=5:** the values are A[i]=23, A[j]=67, A[k]=34.
- Test 1 (is A[j] the middle value?): (23≤67 and 67≤34) is false; (34≤67 and 67≤23) is false.
- Test 2 (is A[i] the middle value?): (67≤23 …) is false; (34≤23 …) is false.
- Test 3 (is A[k] the middle value?): (23≤34 and 34≤67) is **true**, so **l = k = 5**.
- Exchange A[6]↔A[5] → 23 67 12 89 95 34.

PARTITION(A,1,6), x = 34, i = 0:

| j | A[j] | ≤ 34? | i | exchange | Array |
|---|---|---|---|---|---|
| 1 | 23 | yes | 1 | itself | 23 67 12 89 95 34 |
| 2 | 67 | no | 1 | – | 23 67 12 89 95 34 |
| 3 | 12 | yes | 2 | A[2]↔A[3] | 23 12 67 89 95 34 |
| 4 | 89 | no | 2 | – | 23 12 67 89 95 34 |
| 5 | 95 | no | 2 | – | 23 12 67 89 95 34 |
| end | | | | A[3]↔A[6] | 23 12 **34** 89 95 67, **q = 3** (2 : 3 split) |

**(c) "Dilution", counted over all 216 choices of (i, j, k):**

| Pivot chosen | Split | Choices |
|---|---|---|
| 12 | 0 : 5 | 16 |
| 23 | 1 : 4 | 40 |
| 34 | 2 : 3 | 52 |
| 67 | 3 : 2 | 52 |
| 89 | 4 : 1 | 40 |
| 95 | 5 : 0 | 16 |

Plain PARTITION always picks 95. Median-of-3 picks an extreme value in only 32 of the 216 choices, about 15 %.

### 5.5 [D07-S12, S19–S20] Sorted against reverse-sorted input, n = 6

| Sorted 1 2 3 4 5 6 | pivot | q | split | comps |
|---|---|---|---|---|
| PARTITION(1,6) | 6 | 6 | 5 : 0 | 5 |
| PARTITION(1,5) | 5 | 5 | 4 : 0 | 4 |
| PARTITION(1,4) | 4 | 4 | 3 : 0 | 3 |
| PARTITION(1,3) | 3 | 3 | 2 : 0 | 2 |
| PARTITION(1,2) | 2 | 2 | 1 : 0 | 1 |
| **total** | | | | **15** |

| Reverse 6 5 4 3 2 1 | pivot | array after | q | split | comps |
|---|---|---|---|---|---|
| PARTITION(1,6) | 1 | 1 5 4 3 2 6 | 1 | 0 : 5 | 5 |
| PARTITION(2,6) | 6 | 1 5 4 3 2 6 | 6 | 4 : 0 | 4 |
| PARTITION(2,5) | 2 | 1 2 4 3 5 6 | 2 | 0 : 3 | 3 |
| PARTITION(3,5) | 5 | 1 2 4 3 5 6 | 5 | 2 : 0 | 2 |
| PARTITION(3,4) | 3 | 1 2 3 4 5 6 | 3 | 0 : 1 | 1 |
| **total** | | | | | **15** |

Both are fully unbalanced and both make n(n−1)/2 = 15 comparisons. This is the worst case of [D07-S12], and it shows the slide's answer **T1 = T2** [D07-S20].

### 5.6 [D08-S6] MERGE of A(12, 34, 38, 78) and B(2, 56, 87, 90, 98)

Here L = (12, 34, 38, 78) and R = (2, 56, 87, 90, 98).

| k | L[i] vs R[j] | Taken | C so far |
|---|---|---|---|
| 1 | 12 vs 2 | R: 2 | 2 |
| 2 | 12 vs 56 | L: 12 | 2 12 |
| 3 | 34 vs 56 | L: 34 | 2 12 34 |
| 4 | 38 vs 56 | L: 38 | 2 12 34 38 |
| 5 | 78 vs 56 | R: 56 | 2 12 34 38 56 |
| 6 | 78 vs 87 | L: 78 | 2 12 34 38 56 78 |
| 7 | L used up | R: 87 | … 87 |
| 8 | L used up | R: 90 | … 90 |
| 9 | L used up | R: 98 | **2 12 34 38 56 78 87 90 98** |

That is 6 comparisons for 9 items.

### 5.7 [D08-S7] MERGESORT on 85 24 63 45 17 31 96 50 (full)

Rows 1–15 are on the slide; rows 16–29 complete it in the same style.

| # | Row | Content | # | Row | Content |
|---|---|---|---|---|---|
| 1 | 0 MS | 85 24 63 45 17 31 96 50 | 16 | 1 MS | 17 31 96 50 |
| 2 | 1 Div | 85 24 63 45 ‖ 17 31 96 50 | 17 | 2 Div | 17 31 ‖ 96 50 |
| 3 | 1 MS | 85 24 63 45 | 18 | 2 MS | 17 31 |
| 4 | 2 Div | 85 24 ‖ 63 45 | 19 | 3 Div | 17 ‖ 31 |
| 5 | 2 MS | 85 24 | 20 | 3 MS | 17 |
| 6 | 3 Div | 85 ‖ 24 | 21 | 3 MS | 31 |
| 7 | 3 MS | 85 | 22 | 3 Merge | 17 31 |
| 8 | 3 MS | 24 | 23 | 2 MS | 96 50 |
| 9 | 3 Merge | 24 85 | 24 | 3 Div | 96 ‖ 50 |
| 10 | 2 MS | 63 45 | 25 | 3 MS | 96 |
| 11 | 3 Div | 63 ‖ 45 | 26 | 3 MS | 50 |
| 12 | 3 MS | 63 | 27 | 3 Merge | 50 96 |
| 13 | 3 MS | 45 | 28 | 2 Merge | 17 31 50 96 |
| 14 | 3 Merge | 45 63 | 29 | 1 Merge | **17 24 31 45 50 63 85 96** |
| 15 | 2 Merge | 24 45 63 85 | | | |

The same run in the pseudocode's call order, with the whole array after each MERGE:

| Call | Whole array afterwards |
|---|---|
| MERGE(A,1,1,2) | 24 85 63 45 17 31 96 50 |
| MERGE(A,3,3,4) | 24 85 45 63 17 31 96 50 |
| MERGE(A,1,2,4) | 24 45 63 85 17 31 96 50 |
| MERGE(A,5,5,6) | 24 45 63 85 17 31 96 50 (17 31 is already in order) |
| MERGE(A,7,7,8) | 24 45 63 85 17 31 50 96 |
| MERGE(A,5,6,8) | 24 45 63 85 17 31 50 96 |
| MERGE(A,1,4,8) | **17 24 31 45 50 63 85 96** |

The final MERGE(A,1,4,8) has n1 = 4, n2 = 4, L = (24, 45, 63, 85) and R = (17, 31, 50, 96):
- 24 vs 17 → 17
- 24 vs 31 → 24
- 45 vs 31 → 31
- 45 vs 50 → 45
- 63 vs 50 → 50
- 63 vs 96 → 63
- 85 vs 96 → 85
- L is used up → 96
- That is 7 comparisons. Over the whole sort there are 7 MERGE calls and 3 levels (log₂ 8 = 3).

### 5.8 Four NEW practice traces in the slides' style (answers verified by running the slide pseudocode)

**P1 — Insertion sort.** Sort **12, 5, 9, 3, 15, 7** with Insertion Sort [D06-S7].
- Show the array after every pass, in the slide-6 style of "shift" and "insert".
- Count the comparisons (`A[i] > key`) and the shifts.

<details><summary>Answer P1</summary>

| Pass (j) | key | Steps | Array after | comps | shifts |
|---|---|---|---|---|---|
| 2 | 5 | 12 > 5 shift; left boundary reached, insert 5 | 5 12 9 3 15 7 | 1 | 1 |
| 3 | 9 | 12 > 9 shift; 5 < 9, insert 9 | 5 9 12 3 15 7 | 2 | 1 |
| 4 | 3 | 12 > 3, 9 > 3, 5 > 3 shift; left boundary reached, insert 3 | 3 5 9 12 15 7 | 3 | 3 |
| 5 | 15 | 12 < 15, insert 15 (no shift) | 3 5 9 12 15 7 | 1 | 0 |
| 6 | 7 | 15 > 7, 12 > 7, 9 > 7 shift; 5 < 7, insert 7 | **3 5 7 9 12 15** | 4 | 3 |

Totals: **11 comparisons, 8 shifts**. For comparison with [D06-S8] at n = 6: the worst case is F(6) = 15 (reversed input) and the best case is 5 (sorted input).
</details>

**P2 — Quicksort.** Apply QUICKSORT(A, 1, 8) [D07-S4, S5] to **15, 3, 22, 8, 17, 10, 5, 12**.
- (a) Show every step of the first PARTITION.
- (b) Give the array and q after every PARTITION call.
- (c) Give the total number of comparisons.

<details><summary>Answer P2</summary>

(a) PARTITION(A,1,8), x = 12, i = 0

| j | A[j] | ≤ 12? | i | exchange | Array |
|---|---|---|---|---|---|
| 1 | 15 | no | 0 | – | 15 3 22 8 17 10 5 12 |
| 2 | 3 | yes | 1 | A[1]↔A[2] | 3 15 22 8 17 10 5 12 |
| 3 | 22 | no | 1 | – | 3 15 22 8 17 10 5 12 |
| 4 | 8 | yes | 2 | A[2]↔A[4] | 3 8 22 15 17 10 5 12 |
| 5 | 17 | no | 2 | – | 3 8 22 15 17 10 5 12 |
| 6 | 10 | yes | 3 | A[3]↔A[6] | 3 8 10 15 17 22 5 12 |
| 7 | 5 | yes | 4 | A[4]↔A[7] | 3 8 10 5 17 22 15 12 |
| end | | | | A[5]↔A[8] | 3 8 10 5 **12** 22 15 17, **q = 5** |

(b)

| Call | Pivot | Whole array after | q |
|---|---|---|---|
| PARTITION(1,8) | 12 | 3 8 10 5 **12** 22 15 17 | 5 |
| PARTITION(1,4) | 5 | 3 **5** 10 8 12 22 15 17 | 2 |
| PARTITION(3,4) | 8 | 3 5 **8** 10 12 22 15 17 | 3 |
| PARTITION(6,8) | 17 | 3 5 8 10 12 15 **17** 22 | 7 |

- In PARTITION(1,4), 3 ≤ 5 is exchanged with itself, then 8 and 10 are > 5, and the final exchange is A[2]↔A[4].
- In PARTITION(6,8), 22 > 17, then 15 ≤ 17 is exchanged into A[6], and the final exchange is A[7]↔A[8].
- Every other call has p ≥ r.

(c) **13 comparisons** (7 + 3 + 1 + 2) over 4 PARTITION calls. Sorted: **3 5 8 10 12 15 17 22**.
</details>

**P3 — Merge sort.** Apply MERGESORT(A, 1, 8) [D08-S5] to **52, 19, 74, 33, 8, 61, 27, 45**.
- Fill in a [D08-S7]-style table.
- Then trace the final MERGE with L, R, i, j and k [D08-S8].

<details><summary>Answer P3</summary>

| Row | Content | Row | Content |
|---|---|---|---|
| 0 MS | 52 19 74 33 8 61 27 45 | 1 MS | 8 61 27 45 |
| 1 Div | 52 19 74 33 ‖ 8 61 27 45 | 2 Div | 8 61 ‖ 27 45 |
| 1 MS | 52 19 74 33 | 2 MS | 8 61 |
| 2 Div | 52 19 ‖ 74 33 | 3 Div | 8 ‖ 61 |
| 2 MS | 52 19 | 3 MS / 3 MS | 8 / 61 |
| 3 Div | 52 ‖ 19 | 3 Merge | 8 61 |
| 3 MS / 3 MS | 52 / 19 | 2 MS | 27 45 |
| 3 Merge | 19 52 | 3 Div | 27 ‖ 45 |
| 2 MS | 74 33 | 3 MS / 3 MS | 27 / 45 |
| 3 Div | 74 ‖ 33 | 3 Merge | 27 45 |
| 3 MS / 3 MS | 74 / 33 | 2 Merge | 8 27 45 61 |
| 3 Merge | 33 74 | **1 Merge** | **8 19 27 33 45 52 61 74** |
| 2 Merge | 19 33 52 74 | | |

The final MERGE(A,1,4,8) has n1 = 4, n2 = 4, L = (19, 33, 52, 74) and R = (8, 27, 45, 61), with i = j = 0 at the start:

| k | L[i] vs R[j] | A[k] | i after | j after |
|---|---|---|---|---|
| 1 | 19 vs 8 → R | 8 | 0 | 1 |
| 2 | 19 vs 27 → L | 19 | 1 | 1 |
| 3 | 33 vs 27 → R | 27 | 1 | 2 |
| 4 | 33 vs 45 → L | 33 | 2 | 2 |
| 5 | 52 vs 45 → R | 45 | 2 | 3 |
| 6 | 52 vs 61 → L | 52 | 3 | 3 |
| 7 | 74 vs 61 → R | 61 | 3 | 4 |
| 8 | R used up → L | 74 | 4 | 4 |

That is 7 comparisons.
</details>

**P4 — Median-of-3 and V2.** A = **14, 41, 23, 8, 35, 17, 29** (p = 1, r = 7).
- (a) Run Median-of-3-Partition [D07-S9], with RANDOM returning i = 1, j = 3, k = 6. Find l, the array after `exchange A[r] <-> A[l]`, the PARTITION result and q.
- (b) Run the Median Method V2 partition [D07-S7] on the original A, with the random pivot chosen as 23 (position 3).

<details><summary>Answer P4</summary>

(a) The values are A[i]=14, A[j]=23, A[k]=17.
- Test 1: (14≤23 and 23≤17) is false; (17≤23 and 23≤14) is false.
- Test 2: (23≤14 …) is false; (17≤14 …) is false.
- Test 3: (14≤17 and 17≤23) is **true**, so **l = k = 6** and the median is 17.
- Exchange A[7]↔A[6] → **14 41 23 8 35 29 17**.
- PARTITION, x = 17:
  - j=1: 14 ≤ 17, so i=1 and A[1] is exchanged with itself.
  - j=2 and j=3: 41 and 23 are > 17, nothing happens.
  - j=4: 8 ≤ 17, so i=2 and A[2]↔A[4] → 14 8 23 41 35 29 17.
  - j=5 and j=6: 35 and 29 are > 17, nothing happens.
  - The final exchange is A[3]↔A[7] → **14 8 17 41 35 29 23**, with **q = 3** (a 2 : 4 split).

(b)
- Swap the pivot 23 to the last index → 14 41 29 8 35 17 23.
- Round 1: i moves past 14 and stops at 2 (41). j stops at 6 (17). Exchange → 14 17 29 8 35 41 23.
- Round 2: i moves past 17 and stops at 3 (29). j moves left past 41 and 35 and stops at 4 (8). Exchange → 14 17 8 29 35 41 23.
- Round 3: i moves past 8 and stops at 4 (29). j moves past 29 and stops at 3 (8). Now i > j, so swap A[4] with the last element → **14 17 8 23 35 41 29**.
- The pivot 23 is at position 4, with {14, 17, 8} < 23 < {35, 41, 29}.
</details>

### 5.9 Assignment 2: how the professor solves the sorting questions

**The handout [A2].**
- **Q1** asks for Build Max Heap on 11, 19, 7, 12, 15, 30. That is the heap sort deck, not covered here.
- **Q2** asks to "Apply Quicksort Algorithm to sort the given sequence (Show only steps of first PARTITION on the initial array)" for **18, 7, 12, 15, 22, 10**, in positions 1–6.
- A second "Q2" asks to "Apply Merge sort Algorithm … (Show all steps)" for **19, 17, 12, 5, 20, 10**.
- ⚠️ Two questions are numbered Q2; the merge sort one is really Q3. This is true of both the handout and the sample solution.
- The sample solution is marked "for reference" and uses **different numbers**: Q1 uses 12, 9, 7, 2, 15, 32, and both sorting questions use **9, 7, 2, 15, 32, 10**.

#### (a) Quicksort, first PARTITION, in the professor's sample (9 7 2 15 32 10)

The professor's margin notes read "P=1 r=6, x=10 · initially J=0 · I=-1". His grid has one row per step:

| Row | Professor's mark | What it means in the [D07-S5] code |
|---|---|---|
| 1 | "A[j] < x, i = j" under 9 | j=1: 9 ≤ 10 → i becomes 1 (= j), so A[1] is exchanged with itself |
| 2 | "A[j] < x, i = j" under 7 | j=2: 7 ≤ 10 → i = 2, exchanged with itself |
| 3 | "A[j] < x, i = j" under 2; then "j" under 15 and under 32 | j=3: 2 ≤ 10 → i = 3; then j=4 and j=5 pass 15 and 32 (both > 10) with no change |
| 4 | "i" under position 4, a double arrow, "x" under position 6 | final `Exchange A[i+1] <-> A[r]`: A[4] ↔ A[6] |
| 5 | **9 7 2 [10] 32 15**, with 10 highlighted | the pivot is in its final place, **q = 4** |

- Running the [D07-S5] PARTITION reproduces this final row exactly.
- ⚠️ "J=0, I=−1" are 0-based starting values, but the grid is numbered 1–6 with P = 1. The slide code gives i = p−1 = 0, and j starts at p = 1. The meaning is the same: i starts just before the sub-array.
- ⚠️ The sample writes "A[j] < x", while the slide's test is `A[j] <= x`. It makes no difference here because no value equals 10.

**The same method on the handout's Q2 (18 7 12 15 22 10).** p = 1, r = 6, x = A[6] = 10, i = 0.

| j | A[j] | ≤ 10? | i | exchange | Array |
|---|---|---|---|---|---|
| 1 | 18 | no | 0 | – | 18 7 12 15 22 10 |
| 2 | 7 | yes | 1 | A[1]↔A[2] | 7 18 12 15 22 10 |
| 3 | 12 | no | 1 | – | 7 18 12 15 22 10 |
| 4 | 15 | no | 1 | – | 7 18 12 15 22 10 |
| 5 | 22 | no | 1 | – | 7 18 12 15 22 10 |
| end | | | | A[2]↔A[6] | **7 10 12 15 22 18**, **q = 2** |

After the first PARTITION the array is **7 | 10 | 12 15 22 18**. (This is our verified run of the slide code, not the professor's own answer, which uses different numbers.)

#### (b) Merge sort, all steps, in the professor's sample (9 7 2 15 32 10)

The professor writes "p=1, r=6, q=3" in the margin and fills a 6-column grid. The left half and right half are worked side by side, level by level, and colour-coded:

| Grid row | Positions 1–3 | Positions 4–6 | Meaning |
|---|---|---|---|
| 1 | 9 7 2 | | left half A[1..3] (q = 3) |
| 2 | 9 7 | 15 32 10 | left half split again (q = 2); right half A[4..6] |
| 3 | 2 (pos 3) | 15 32 (pos 4–5) | right half split (q = 5) |
| 4 | 9 (pos 1) | 10 (pos 6) | single elements |
| 5 | 7 (pos 2) | 15 (pos 4) | single elements |
| 6 | 7 9 | 32 (pos 5) | MERGE [9] + [7] |
| 7 | 2 7 9 | 15 32 | MERGE [7 9] + [2]; MERGE [15] + [32] |
| 8 | | 10 15 32 | MERGE [15 32] + [10] |
| 9 | (blank) | | |
| 10 | **2 7 9 10 15 32** | | final MERGE |

This matches the [D08-S5] recursion: (1,6) q=3 → (1,3) q=2 → (1,2) q=1 → (4,6) q=5 → (4,5) q=4. The final MERGE has L = (2, 7, 9) and R = (10, 15, 32): after 3 comparisons L is used up, and 10, 15, 32 are copied.

**The same method on the handout's merge sort question (19 17 12 5 20 10).**

| Grid row | Positions 1–3 | Positions 4–6 | Meaning |
|---|---|---|---|
| 1 | 19 17 12 | | MERGESORT(1,6): q = 3, left half |
| 2 | 19 17 | 5 20 10 | MERGESORT(1,3): q = 2; right half A[4..6] |
| 3 | 12 (pos 3) | 5 20 (pos 4–5) | MERGESORT(4,6): q = 5 |
| 4 | 19 (pos 1) | 10 (pos 6) | MERGESORT(1,2): q = 1 |
| 5 | 17 (pos 2) | 5 (pos 4) | MERGESORT(4,5): q = 4 |
| 6 | 17 19 | 20 (pos 5) | MERGE [19] + [17] |
| 7 | 12 17 19 | 5 20 | MERGE [17 19] + [12]; MERGE [5] + [20] |
| 8 | | 5 10 20 | MERGE [5 20] + [10] |
| 9 | **5 10 12 17 19 20** | | final MERGE |

The final MERGE(A,1,3,6) has L = (12, 17, 19) and R = (5, 10, 20):
- 12 vs 5 → 5
- 12 vs 10 → 10
- 12 vs 20 → 12
- 17 vs 20 → 17
- 19 vs 20 → 19
- L is used up → 20
- That is 5 comparisons. (This is our verified run of the slide code; the professor's sample uses different numbers.)

---

## 6. Likely exam questions (from these materials only)

1. **[Trace]** Sort **8, 3, 6, 1, 5** with Insertion Sort [D06-S7]. Give the array after each pass j = 2, 3, 4, 5, and the total number of `A[i] > key` comparisons.
2. **[Count]** Using F(n) from the slides, how many comparisons/movements does insertion sort make in the worst case for n = 10? Which input causes it? Which input gives the best case, and what is the best-case bound?
3. **[MCQ]** To reduce the number of *comparisons* in insertion sort, the slides suggest: (a) a doubly linked list (b) binary search (c) median-of-3 (d) a random pivot. With that change, the total running time becomes: (i) O(n log n) (ii) still O(n²) (iii) O(n).
4. **[MCQ]** According to the class slides, which list contains **only stable** sorts? (a) merge, insertion, bubble (b) quick, merge, insertion (c) heap, selection, merge (d) quick, heap, selection.
5. **[MCQ]** According to [D06-S3]: (i) Which comparison-based sort is **out-place**? (a) quick (b) insertion (c) merge (d) bubble. (ii) Which of these is **non-adaptive**? (a) insertion (b) bubble (c) quick (d) merge.
6. **[Partition result]** Apply PARTITION(A, 1, 8) [D07-S5] to **6, 11, 3, 9, 2, 14, 7, 8**. Show the array after each j, the returned q, and the number of `A[j] <= x` comparisons.
7. **[Trace / count]** For the slide example QUICKSORT(A, 1, 7) on **5 7 6 1 3 2 4**:
   - (a) What is the array after the first PARTITION, and what is q?
   - (b) How many PARTITION calls are made in total?
   - (c) How many comparisons are made in total?
8. **[Recurrence]** Write the recurrence for quicksort's worst-case partitioning and its solution. What kind of input causes it?
9. **[Recurrence]** Write the best-case partitioning recurrence and its solution, and name the theorem used.
10. **[Recurrence]** The median of n elements can be found in O(n) time. If the median is always used as the pivot, write the recurrence and the complexity of quicksort.
11. **[Recurrence]** The (n/4)-th smallest element is chosen as pivot by an O(n) algorithm. Give the recurrence and the worst-case complexity. In what ratio are the parts split?
12. **[MCQ]** T1 is the time to partition 1, 2, …, n and T2 is the time to partition n, n−1, …, 1. Then: (a) T1 < T2 (b) T1 > T2 (c) T1 = T2 (d) it depends on n.
13. **[Short]** What does RANDOMIZED-PARTITION do before calling PARTITION? How many different values can RANDOM(3, 9) return?
14. **[Median-of-3]** A = **31, 12, 47, 25, 8, 39** (p = 1, r = 6), and RANDOM returns i = 1, j = 5, k = 3. Find l, the array after `exchange A[r] <-> A[l]`, and the result of PARTITION with its q.
15. **[V2]** Using the Median Method V2 rules [D07-S7] with the pivot equal to the last element, partition **9, 4, 8, 2, 7, 5**. Where does the pivot end up?
16. **[Merge sort trace]** Run MERGESORT(A, 1, 7) on **40, 15, 33, 8, 27, 12, 50**. List every split with its q and the result of every MERGE, in call order. How many MERGE calls are there?
17. **[MERGE procedure]** Trace Merge [D08-S8] with L = (3, 9, 14) and R = (5, 6, 20). Give the comparison made and the value of A[k] at each k. How many comparisons are made?
18. **[Recurrence]** Give merge sort's recurrence as written on [D08-S11] and its solution. Why does merge sort have "no worst scenario"?
19. **[Cost]** Using merge procedures:
    - (a) How long does it take to merge **log n sorted lists, each of size n/log n**, into one list?
    - (b) How long does it take to sort **n strings, each of length n**?
20. **[Cost + space]**
    - (a) If problems of size k (k < n) can be solved directly, what is merge sort's running time?
    - (b) Give quicksort's space complexity for balanced and for unbalanced partitions, and merge sort's total space requirement.

### Answers

1. The passes give:
   - j=2: **3 8 6 1 5**
   - j=3: **3 6 8 1 5**
   - j=4: **1 3 6 8 5**
   - j=5: **1 3 5 6 8**
   - Comparisons: 1 + 2 + 3 + 3 = **9**, and there are 7 shifts. [D06-S6, S7]
2. F(10) = 1 + 2 + … + 9 = 10·9/2 = **45**, for **reversed** input. The best case is **already sorted ascending** input, which is **Ω(n)** (9 comparisons here). [D06-S8]
3. **(b) binary search**, and the total is **(ii) still O(n²)**. A doubly linked list reduces movement instead. [D06-S9]
4. **(a)** merge, insertion, bubble. Quicksort, heap sort and selection sort are listed as unstable. [D06-S3]
5. (i) **(c) merge sort**. (ii) **(d) merge sort**. [D06-S3, D08-S11]
6. x = 8 and i = 0.
   - j=1: 6 ≤ 8 → i=1, A[1] exchanged with itself → 6 11 3 9 2 14 7 8
   - j=2: 11 > 8, no change
   - j=3: 3 ≤ 8 → i=2, A[2]↔A[3] → 6 3 11 9 2 14 7 8
   - j=4: 9 > 8, no change
   - j=5: 2 ≤ 8 → i=3, A[3]↔A[5] → 6 3 2 9 11 14 7 8
   - j=6: 14 > 8, no change
   - j=7: 7 ≤ 8 → i=4, A[4]↔A[7] → 6 3 2 7 11 14 9 8
   - Final A[5]↔A[8] → **6 3 2 7 8 14 9 11**, with **q = 5**. There are **7** comparisons (r − p). [D07-S5]
7. (a) **1 3 2 4 7 6 5**, with q = 4. (b) **4** PARTITION calls. (c) 6 + 2 + 2 + 1 = **11** comparisons. [D07-S5; §5.2]
8. T(n) = T(n−1) + T(0) + Θ(n) = T(n−1) + Θ(n), which gives **Θ(n²)**. It happens when one side has n−1 elements and the other has 0, which is the case for an **already sorted** input (the best case for insertion sort). [D07-S12]
9. T(n) ≤ 2T(n/2) + Θ(n), which gives **Θ(n log n)** by the "Main recurrence" theorem, i.e. the Master theorem: a = 2, b = 2, k = 1, p = 0. [D07-S13; D05-S5]
10. T(n) = O(n) [find the median] + O(1) [swap it to the last position] + O(n) [partition] + 2T(n/2) = O(n) + 2T(n/2) = **O(n log n)**. [D07-S16]
11. T(n) = O(n) + O(1) + O(n) + T(n/4) + T(3n/4) = O(n) + Θ(n log n) = **Θ(n log n)**. The parts are n/4 and 3n/4. The slide calls this "1:4", meaning one-fourth; as a ratio it is 1 : 3. [D07-S18]
12. **(c) T1 = T2.** Both inputs give fully unbalanced splits (n(n−1)/2 comparisons for the whole sort). [D07-S20; §5.5]
13. It sets i ← RANDOM(p, r) and exchanges A[r] ↔ A[i], so a random element becomes the pivot. RANDOM(3, 9) can return 9 − 3 + 1 = **7** values. [D07-S6]
14. The values are A[i]=31, A[j]=8, A[k]=47.
    - Test 1 fails: (31≤8 …) is false and (47≤8 …) is false.
    - Test 2 holds: (8≤31 and 31≤47) is true, so **l = i = 1**.
    - Exchange A[6]↔A[1] → **39 12 47 25 8 31**.
    - PARTITION with x = 31:
      - 39 > 31, no change;
      - 12 ≤ 31, so A[1]↔A[2] → 12 39 47 25 8 31;
      - 47 > 31, no change;
      - 25 ≤ 31, so A[2]↔A[4] → 12 25 47 39 8 31;
      - 8 ≤ 31, so A[3]↔A[5] → 12 25 8 39 47 31;
      - the final A[4]↔A[6] gives **12 25 8 31 47 39**, with **q = 4**. [D07-S9, S5]
15. The pivot is 5.
    - i stops at 1 (9) and j stops at 4 (2), so exchange → 2 4 8 9 7 5.
    - i moves right past 2 and 4 and stops at 3 (8). j moves left past 9 and 8 and stops at 2 (4). Now i > j, so swap A[3] with the last element → **2 4 5 9 7 8**.
    - The pivot 5 ends at **position 3**. [D07-S7, S8]
16. The calls, in order:
    - (1,7) q=4 → [40 15 33 8] | [27 12 50]
    - (1,4) q=2 → [40 15] | [33 8]
    - (1,2) q=1 → MERGE → 15 40
    - (3,4) q=3 → MERGE → 8 33
    - MERGE(1,2,4) → 8 15 33 40
    - (5,7) q=6 → [27 12] | [50]
    - (5,6) q=5 → MERGE → 12 27
    - MERGE(5,6,7) → 12 27 50
    - MERGE(1,4,7) → **8 12 15 27 33 40 50**
    - There are **6** MERGE calls. [D08-S5]
17. The steps by k:
    - k1: 3 ≤ 5 → 3
    - k2: 9 > 5 → 5
    - k3: 9 > 6 → 6
    - k4: 9 ≤ 20 → 9
    - k5: 14 ≤ 20 → 14
    - k6: L is used up → 20
    - Result **3 5 6 9 14 20**, with **5** comparisons. [D08-S8]
18. T(n) = O(1) + T(n/2) + T(n/2) + O(n) = O(n) + 2T(n/2), which gives **Θ(n log n)** by the Master theorem. There is no worst scenario because "it works same for ascending or descending order", which is why merge sort is listed as non-adaptive. [D08-S11, D06-S3]
19. (a) O(n) per level × log(log n) levels = **O(n log(log n))** [D08-S15]. (b) O(n²) per level × log n levels = **O(n² log n)** [D08-S17].
20. (a) O(n) per level × log(n/k) levels = **O(n log(n/k))** [D08-S19]. (b) Quicksort needs **O(log n)** when balanced and **O(n)** when unbalanced [D07-S21]. Merge sort needs O(log n) + O(n) = **O(n)** [D08-S10].

---

## 7. Self-check

- [ ] I can write Insertion Sort exactly as on [D06-S7], and show the array after every pass with the number of comparisons and shifts.
- [ ] I can give insertion sort's best case (Ω(n), already sorted) and worst case (O(n²), reversed; F(n) = n(n−1)/2), plus the two improvements and why the slide says they don't beat O(n²).
- [ ] I can fill in the [D06-S3] table from memory: comparison/non-comparison, internal/external, stable/unstable, adaptive/non-adaptive, in-place/out-place.
- [ ] I can write QUICKSORT and PARTITION exactly, and trace PARTITION step by step (x, i, j, each exchange, the final exchange, the returned q), the way the professor does in [A2].
- [ ] I can explain and apply RANDOMIZED-PARTITION, Median-of-3-Partition (choosing l with the three tests) and the Median Method V2 two-pointer rules.
- [ ] I can write quicksort's worst-case and best-case recurrences and their solutions, say which input causes the worst case, and explain why T1 = T2.
- [ ] I can answer the pivot-choice questions (median as pivot → O(n log n); (n/4)-th smallest → Θ(n log n)) by adding up the cost parts and the recursive terms.
- [ ] I can write MERGESORT and Merge exactly, compute q = ⌊(p+r)/2⌋, and produce a full [D08-S7]/[A2]-style merge sort table, including the k-by-k steps of the final MERGE.
- [ ] I can derive merge sort's time Θ(n log n) and space O(n), and explain "no worst scenario" and "out-place".
- [ ] I can use "merge cost per level × number of levels" to get O(n log n), O(n log log n), O(n² log n) and O(n log(n/k)).
