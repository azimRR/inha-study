# 07 - quicksort — raw slide text (verbatim from class slides)
Source file: 07 -quicksort.pptx · 22 slides · images: slide-images/07 - quicksort/

---

## Slide 1: Slide 1

Quick Sort
Analysis

---

## Slide 2: Algorithm Design Technique Divide and Conquer

Algorithm Design Technique

Divide and Conquer

---

## Slide 3: Divide and Conquer

◦It is often easier to solve several small instances of a problem than one large one.

divide the problem into smaller instances of the same problem
solve (conquer) the smaller instances recursively
combine the solutions to obtain the solution for original input

Solve(I)
◦n = size(I)
◦if (n <= smallsize)
solution = directlySolve(I);
◦else
divide I into I1, , Ik.
for each i in {1, , k}
Si = solve(Ii);
solution = combine(S1, , Sk);
◦return solution;

Divide and Conquer

---

## Slide 4: Pseudocode for quicksortQUICKSORT(A, p, r)if  p< rthen q←PARTITION(A, p, r)           QUICKSORT(A, p, q–1)QUICKSORT(A, q+1, r)

Pseudocode for quicksort

QUICKSORT(A, p, r)
if p< r
then q←PARTITION(A, p, r) QUICKSORT(A, p, q–1)
QUICKSORT(A, q+1, r)

Versions Of Quick sort
• Randomized Quick sort
• Median of 3 Partition

---

## Slide 5: Slide 5

PARTITION (A,p,r)
 x=A[r]
 i ← p -1
 For j ← p to r-1
 do if A[j] <= x
 then i ← i + 1
 exchange A[i] <-> A[j]
 Exchange A[i+1] <-> A[r]
 Return i+1

Ex: 5 7 6 1 3 2 4

Initial call:QUICKSORT(A, p, r)
➔ QUICKSORT(A, 1, 7)

---

## Slide 6: Slide 6

Versions Of Quick sort

Randomized Quick sort

RANDOMIZED-PARTITION (A, p, r)
i ← RANDOM (p, r)
exchange A[r] <-> A[i]
return PARTITION (A, p, r)

RANDOMIZED-QUICKSORT(A, p, r)
if p< r
then q ← RANDOMIZED-PARTITION(A, p, r) RANDOMIZED-QUICKSORT(A, p, q–1)
RANDOMIZED-QUICKSORT(A, q+1, r)

RANDOM(a,b) returns a random integer in the range (a,b) i.e. (b-a+1) integers

---

## Slide 7: Median Method V2- Quick Sort

Partition
1. Choose a random pivot element
2. swap it with last index element
3. (for i) proceed from left (i++) till elements are less than pivot [also (i<j)]
4. (for j) proceed from right (j--) till elements are more than pivot [also (i<j)]
5.exchange i & j elements when condition is unsatisfied [keeping (i<j)]
6. for (i>j) swap i with last element

Median Method V2- Quick Sort

---

## Slide 8: Median Method V2- Quick Sort

Partition
1. Choose a random pivot element
2. swap it with last index element
3. (for i) proceed from left (i++) till elements are less than pivot [also (i<j)]
4. (for j) proceed from right (j--) till elements are more than pivot [also (i<j)]
5.exchange i & j elements when condition is unsatisfied [keeping (i<j)]
6. for (i>j) swap i with last element

Ex.

5 7 6 1 3 2 4

Median Method V2- Quick Sort

---

## Slide 9: Slide 9

MEDIAN-OF-3-PARTITION

Median-of-3-Partition (A, p, r)
i  RANDOM (p, r)
j  RANDOM (p, r)
k  RANDOM (p, r)

if(A[i]<=A[j] and A[j]<=A[k]) or (A[k]<=A[j] and A[j]<=A[i])
then l  j
else if if(A[j]<=A[i] and A[i]<=A[k]) or (A[k]<=A[i] and A[i]<=A[j])
then l  i
else if (A[i]<=A[k] and A[k]<=A[j]) or (A[j]<=A[k] and A[k]<=A[i])
then l  k

exchange A[r] <-> A[l]
return PARTITION (A, p, r)

This approach tends to choose the pivot value as median of 3 elements selected randomly. In general this algorithm gives very good results except for few cases

---

## Slide 10: Slide 10

Median-of-3-Partition (A, p, r)

Generally, with any value of i, j, k it will dilute the worst sequence

Consider any worst case sequence

23, 67, 12, 89, 34, 95

---

## Slide 11: Performance of Quick Sort

Depends on whether partitioning is balanced or unbalanced
If it is balanced :
Runs asymptotically as fast as merge sort

If it is unbalanced
Runs asymptotically as slow as insertion sort

Performance of Quick Sort

---

## Slide 12: Worst Case Partitioning

When it produces one sub problem with n-1 elements and one with zero elements

Lets us assume unbalanced partitioning, the partitioning cost ө(n) time

The recurrence for running time is

T (n)= T(n-1) + T (0) + ө (n)
= T (n-1) + ө (n)
Using recurrence Method we get ө (n2)

Note : It occurs when input array is already sorted , the best case condition for insertion sort

Worst Case Partitioning

---

## Slide 13: Best Case Partitioning 

The recurrence for running time is

T (n) <= 2T (n/2) + ө (n)

Using Main recurrence theorem we get

T (n) = ө (n log n)

Best Case Partitioning

---

## Slide 14: Slide 14

When the partitioning splits into some ratio:
T(n) = ө (n log n)

When the partitioning split alternative best and worst segments
T(n) = ө (n log n)

---

## Slide 15: Slide 15

The median of ‘n’ elements can be found in O(n) time.

What is the complexity of quicksort, in which medium is selected as pivot ?

(finding median+swapping with last pivot position+partitioning+ division into equal halves)
T(n)= O(n)+O(1)+O(n)+ 2 T(n/2)
= O(n) + 2 T(n/2)
= ө (n log n)

---

## Slide 16: Slide 16

The median of ‘n’ elements can be found in O(n) time

What is the complexity of quicksort, in which medium is selected as pivot ?

(finding median + swapping with last pivot position + partitioning + division into equal halves)

T(n)= O(n) + O(1) + O(n) + 2 T(n/2)
= O(n) + 2 T(n/2)
= O (n log n)

---

## Slide 17: Slide 17

In quick sort, for sorting ‘n’ elements, the (n/4)th smallest element is selected as pivot using O(n) time algorithm.

What is the worst case complexity of quick sort?

(element selection, swapping with pivot position, two partition in ration 1:4)
T(n)=O(n)+O(1)+O(n)+T(n/4)+T(3n/4)
= O(n) + ө (n log n)

=ө (n log n)

---

## Slide 18: Slide 18

In quick sort, for sorting ‘n’ elements, the (n/4)th smallest element is selected as pivot using O(n) time algorithm.

What is the worst case complexity of quick sort?

(element selection + swapping with pivot + partition+ two partition in ration 1:4)

T(n)=O(n)+O(1)+O(n)+T(n/4)+T(3n/4)
= O(n) + ө (n log n)

=ө (n log n)

---

## Slide 19: Slide 19

Let T1 and T2 be the time taken partitioning the following sequences

1,2,3,4,5………..n T1

n,n-1,n-2……….1 T2

Find the relation between T1 and T2 ?

Ans : T1=T2

---

## Slide 20: Slide 20

Let T1 and T2 be the time taken partitioning the following sequences

1,2,3,4,5………..n T1

n,n-1,n-2……….1 T2

Find the relation between T1 and T2 ?

Ans : T1=T2

---

## Slide 21: Slide 21

Space Complexity
(defined by number of levels in recursive tree)

For Balanced partition = O(log n)

For unbalanced partition = O(n)

---

## Slide 22: Slide 22

Divide And Conquer Strategy of problem Solving
https://youtu.be/HO4B-kG_6Ag

Quick Sort Analysis
https://youtu.be/LPE9xYEsfIU

Quick Sort Analysis for various partitioning scenarios
https://youtu.be/gCP06CTpEaE

Understanding Space Complexity
https://youtu.be/HEZdrU8ZPIk

Video Lecture of the topic can be found at

https://cexpertvision.com/2020/10/18/comparison-based-sorting-ca/
