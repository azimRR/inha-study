# CLASS material - verbatim slide text, decks 07-10


---

<!-- FILE: 07 - quicksort.md -->

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


---

<!-- FILE: 08 - merge sort.md -->

# 08 - merge sort — raw slide text (verbatim from class slides)
Source file: 08 -merge sort.pptx · 20 slides · images: slide-images/08 - merge sort/

---

## Slide 1: Slide 1

MERGE SORT

ANALYSIS

---

## Slide 2: Divide and Conquer

Divide and Conquer

✈It is often easier to solve several small instances of a problem than one large one.
divide the problem into smaller instances of the same problem
solve (conquer) the smaller instances recursively
combine the solutions to obtain the solution for original input
•Solve(I)
✈n = size(I)
✈if (n <= smallsize)
solution = directlySolve(I);
✈else
divide I into I1, , Ik.
for each i in {1, , k}
•Si = solve(Ii);
solution = combine(S1, , Sk);
✈return solution;

---

## Slide 3: Mergesort : Using Divide and Conquer 

Mergesort : Using Divide and Conquer

Mergesort Strategy

---

## Slide 4: Using Divide and Conquer: Mergesort

Using Divide and Conquer: Mergesort

Mergesort Strategy

---

## Slide 5: Algorithm: Mergesort

Algorithm: Mergesort

Pseudocode for MergeSort

MERGESORT(A, p, r)
if p< r
then q← floor[(p+r)/2]
MERGESORT(A, p, q)
MERGESORT(A, q+1, r)
MERGE(A,p,q,r)

Input: Array A and indexes first (p) and last (r).

Output: A[first], …, A[last] is sorted rearrangement of the same elements

---

## Slide 6: MERGE(A,p,q,r)  - Merging Sorted Sequences

MERGE(A,p,q,r) - Merging Sorted Sequences

•Strategy:
✈determine the first item in C:
✓It is the minimum between the first items of A and B.
✓Suppose it is the first items of A. Then, rest of C consisting of merging rest of A with B.

•Problem:
➢Given two sequences A and B sorted in nondecreasing order,
➢merge them to create one sorted sequence C

Example: A (12, 34, 38, 78) B( 2, 56, 87, 90, 98)

C(2, 12, 34, 38, 56, 78, 87, 90, 98)

---

## Slide 7: Slide 7

MERGESORT(A, p, r)
if p< r
then q← floor[(p+r)/2]
MERGESORT(A, p, q)
MERGESORT(A, q+1, r)
MERGE(A,p,q,r)

---

## Slide 8: Slide 8

Merge(A,p,q,r)
{
•n1=q – p + 1
•n2=r - q
•Let L[1..n1] & R[1..n2] be new array
•for ( i= 0 to n1-1 )
• L[i]= A[p+i]
•for ( j= 0 to n2-1 )
• R[j]= A[(q+1)+j]

•i=0, j=0
•for ( k= p to r )
•if (L[i] <= R[j])
• A[k] = L[i]
• i =i +1
•else
• A[k] = R[j]
• j=j+1

}

---

## Slide 9: Slide 9

Merge(A,p,q,r)
•{
•n1=q – p + 1
•n2=r - q
•Let L[1..n1] & R[1..n2] be new array
•for ( i= 0 to n1-1 )
• L[i]= A[p+i]
•for ( j= 0 to n2-1 )
• R[j]= A[q+1+j]

•i=0, j=0
•for ( k= p to r )
•if (L[i] <= R[j])
• A[k] = L[i]
• i =i +1
•else
• A[k] = R[j]
• j=j+1
•}

MERGESORT(A, p, r)
if p< r
then q← floor[(p+r)/2]
MERGESORT(A, p, q)
MERGESORT(A, q+1, r)
MERGE(A,p,q,r)

MERGE SORT ANALYSIS

Total Cost = Divide + conquer + merge
T(n) = C1 + 2T(n/2) + Cn
 O(n log n)

➔ O(n)

---

## Slide 10: Space Complexity 

Space Complexity

Memory Requirement
•Each merge-sort consumes = O (log n)
•Merge Consumes = O(n)

Total space rqmnts = O (log n) + O(n) = O(n)

MERGESORT(A, p, r)
if p< r
then q← floor[(p+r)/2]
MERGESORT(A, p, q)
MERGESORT(A, q+1, r)
MERGE(A,p,q,r)

Calculation of stack size :
In general, stack size will be levels in a tree, which is (log n),

This is also called out-of-space / out-place algorithms as its needs extra array to do partial processing.
Extra space used by an algorithm depends on the input size.

It requires ‘n’ extra cells to copy elements from two sorted arrays into one, therefore each merge procedure requires O(n) memory. Since this memory is reused ‘log n’ times.
The effective memory requirement is O(n)

---

## Slide 11: Time Complexity

Time Complexity

MERGESORT(A, p, r)
if p< r
then q← floor[(p+r)/2]
MERGESORT(A, p, q)
MERGESORT(A, q+1, r)
MERGE(A,p,q,r)

T(n) = O(1) + T(n/2) + T(n/2) + O(n)
= (n) + 2 T(n/2) [By masters theorem]
= Θ( n log n)

Divide n Conquer Notation

[ T(n)= Divide + Recursion+ Merge]

There is no worst scenario as it works same for ascending or descending order

---

## Slide 12: Calculate the cost :

Calculate the cost :

Given n elements, merge them using merge procedure to get one sorted list of n elements.

---

## Slide 13: Calculate the cost :

Calculate the cost :

•Each merge procedure time to merge two sorted list into one and moving to next higher level = O(n)

•Total levels to reach to the one sorted list = log n

➔ Total time = O(n) * log n = O (n log n)

Given n elements, merge them using merge procedure to get one sorted list of n elements.

---

## Slide 14: Slide 14

Given “log n” sorted list each of size “n/log n”

what is the total time required to merge them into single sorted list

---

## Slide 15: Slide 15

N elements each of size 1 will take
n*1 = O(n)
(log n) elements each of size n/logn will take (log n)* n/(log n) = O(n)

For n elements, number of levels will be
log n

For (log n) elements, number of levels will be
log (log n)

Total Cost
= cost of merge at each level * total levels
= O(n) * log n = O ( n log n)
Total Cost
= cost of merge at each level * total levels
= O(n) * log (log n) = O ( n log (log n))

Given “log n” sorted list each of size “n/log n”
what is the total time required to merge them into single sorted list

---

## Slide 16: Slide 16

“n” strings each of length “n” are given.

-What will be the time taken to sort them ?

---

## Slide 17: Slide 17

Cost of merging n elements(size 1) = O(n)
Hence, cost of merging n strings, each of size n
=O(n) * O (n) = O(n2)

“n” strings each of length “n” are given.
-What will be the time taken to sort them ?

Total levels = (log n)
therefore,
Total Cost T(n) = O(n2) * log n = O(n2logn)

---

## Slide 18: Slide 18

Assume that size k problem could be independently solved ( instead of 1)

n numbers (k<n) to be sorted
Compute the running time of Merge sort ?

---

## Slide 19: Slide 19

•Number of elements of size k to be merged (n/k)
•Cost of merging k elements of size (n/k) = O (n)
•Total numbers of levels = log (n/k)

➔ Total cost = O (n ) * log (n/k)
= O( n log (n/k))

Assume that size k problem could be independently solved ( instead of 1)
Compute the running time of Merge sort ?

---

## Slide 20: Slide 20

Merge Sort Algorithm
https://www.youtube.com/watch?v=RH0p7DYyMn4

Merge Procedure illustrative Example
https://www.youtube.com/watch?v=WzDq-WQALy0

Understanding Space Complexity
https://youtu.be/HEZdrU8ZPIk

Merge Sort Complexity Analysis
https://www.youtube.com/watch?v=x1dJx89Elf0

Video Lecture of the topic can be found at

https://cexpertvision.com/2020/10/18/comparison-based-sorting-ca/

Quick Sort Analysis for various partitioning scenarios
https://youtu.be/gCP06CTpEaE


---

<!-- FILE: 09 - Heap sort.md -->

# 09 - Heap sort — raw slide text (verbatim from class slides)
Source file: 09 -Heap sort.pptx · 24 slides · images: slide-images/09 - Heap sort/

---

## Slide 1: Slide 1

Heap and Heapsort

---

## Slide 2: Performance of certain operations with different data structure

Performance of certain operations with different data structure

Array Input
Insert
Search
Find Minimum
Delete (Min)

Unsorted array

Sorted Array

Unsorted Linked List

Heap(Min)

---

## Slide 3: Performance of certain operations with different data structure

Performance of certain operations with different data structure

Array Input
Insert
Search
Find Minimum
Delete (Min)

Unsorted array
0(1)
0(n)
0(n)
0(n)

Sorted Array
0(n)
0(log n)
0(1)
0(n)

Unsorted Linked List
0(1)
0(n)
0(n)
0(n)

Heap(Min)
0(log n)
0(log n)
0(1)
0(1)

---

## Slide 4: Slide 4

Complete Binary Tree:
•A binary tree is considered complete if all levels are completely filled, except possibly the last level.
•If the last level is not completely filled, all nodes in that level must be as far left as possible.
•There cannot be any gaps in the filling of nodes from left to right on the last level.

Perfect Binary Tree:
•A perfect binary tree is a special type of binary tree that is both full and complete.
•All internal nodes have exactly two children, and all leaf nodes are at the same level (depth).
•This implies that all levels of the tree are completely filled.

Full Binary Tree:
•A binary tree is considered full if every node has either zero or two children.
•In other words, no node in a full binary tree can have only one child.
•All internal nodes (non-leaf nodes) must have exactly two children.

Binary trees can be categorized based on specific structural properties:

---

## Slide 5: Slide 5

(no text — image/graph only, see image)

---

## Slide 6: Slide 6

(no text — image/graph only, see image)

---

## Slide 7: Heap 

Heap

•A Heap data structure is a binary tree with special properties:
✈Heap Structure
✈Partial order tree property

•Definition: Heap Structure
✈A binary tree T is a heap structure if and only if it satisfies the following conditions: (h = height of the tree)
1. T is complete
2. All leaves are at depth h or h –1

•Definition: Partial order tree property
✈A tree T is a (maximizing) partial order tree if and only if the key at any node is greater than or equal to the keys at each of its children (if it has any)

---

## Slide 8: e.g. Heaps (or not)

e.g. Heaps (or not)

---

## Slide 9: Some Properties

•Height of binary tree (log n)
•Max. number of nodes in complete binary tree of height h is (2h+1 – 1)
•All leaves in tree are consecutive and starts at [floor(n/2)+1 to n] (for index starts at 1 else [floor(n/2) to n] )
•Every node is heap in itself
•Binary heap can be implemented in array using relationship
➢Left_child= 2*index
➢Right_child = 2 *index +1
➢Parent of node = floor (index /2)

Some Properties

If index starts with 0 then
➢Left_child= 2*index +1
➢Right_child = 2 *index + 2
➢Parent of node = ceil(index /2) -1

---

## Slide 10: Slide 10

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
• MAX-HEAPIFY(A,largest)
}

An array with descending Order (complete tree)is Max-Heap
An array with ascending Order (complete tree)is Min-Heap
=> Sorting cost is n log n

i=floor(A.length/2) downto 1*) OR i=floor(A.length/2)-1 downto 0*)

---

## Slide 11: Slide 11

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

Heapify (A,0) = ?

0
1
2
3
4
5
6

4
2
6
1
3
5
7

0
1
2
3
4
5
6

6
2
7
1
3
5
4

STEPS

0
1
2
3
4
5
6

4
2
6
1
3
5
7

6

4

7

4

6
2
7
1
3
5
4

---

## Slide 12: Slide 12

Heapify (A,0) = ?

0
1
2
3
4
5
6

16
46
15
18
17
22
19

STEPS

0
1
2
3
4
5
6

16
46
15
18
17
22
19

---

## Slide 13: Slide 13

i ➔ 2 to 0
0
1
2
3
4
5
6

4
2
6
1
3
5
7

i=2

i=2
Heapify(A,2)

Swap A[2] <->A[6]

i=2
l=5, r=6

Heapify(A,6)

7

6
Exit-heapify(A,6)

4
2
7
1
3
5
6

i=1

i=1
Heapify(A,1)
4
2
7
1
3
5
6
i=1
l=3, r=4

Swap A[1] <->A[4]

Heapify(A,4)

3

2

i=4
l=9, r=10 (X)

4
3
7
1
2
5
6
Exit-heapify(A,4)

i=0
i=0
Heapify(A,0)
4
3
7
1
2
5
6
i=0
l=1, r=2

Swap A[0] <->A[2]

Heapify(A,2)

7

4

i=2
l=5, r=6

7
3
4
1
2
5
6

Swap A[2] <->A[6]

6

4
Exit-heapify(A,4)

Heapify(A,6)
7
3
6
1
2
5
4

i=floor(A.length/2) downto 1*) OR i=floor(A.length/2)-1 downto 0*)

BUILD-MAX-HEAP(A)
{
A.heap-size= A.length
for(i=floor(A.length/2) downto 1*)
MAX-HEAPIFY(A,i)
}

---

## Slide 14: Slide 14

i ➔ 2 to 0
0
1
2
3
4
5
6

16
46
15
18
17
22
19

i=floor(A.length/2) downto 1*) OR i=floor(A.length/2)-1 downto 0*)

---

## Slide 15: Slide 15

Heap-Extract-Max(A)
{
If A.heap-size < 1
error “ heap underflow”
max=A[1]
A[1]=A[A.heap-size]
A.heap-size=A.heap-size-1
MAX-HEAPIFY(A,1)
return max
}

0
1
2
3
4
5
6

7
3
6
1
2
5
4

STEPS

0
1
2
3
4
5
6

7
3
6
1
2
5
4

4

4
i
3
l
6
r
1
2
5

6

4

6
3
4
i
1
2
5
l

r

5

4

6
3
5
1
2
4

---

## Slide 16: Slide 16

Complexity Analysis

Max-Heapify
Heap-Extract-Max
Build_Heap

---

## Slide 17: Performance Analysis

Performance Analysis

•Number of at most node with height h ceil(n/2h+1)
•Time taken by any Max-Heapify at any node is O(h)

Max-Heapify takes O(log n)
Heap-Extract-Max running time is O(log n)
The running time of Build_Heap is O(n)

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
• MAX-HEAPIFY(A,largest)
}

BUILD-MAX-HEAP(A)
{
A.heap-size= A.length
for(i=floor(A.length/2) downto 1)
MAX-HEAPIFY(A,i)
}

Heap-Extract-Max(A)
{
If A.heap-size < 1
error “ heap underflow”
max=A[1]
A[1]=A[A.heap-size]
A.heap-size=A.heap-size-1
MAX-HEAPIFY(A,1)
return max
}

---

## Slide 18: Slide 18

Heap sort

---

## Slide 19: Heapsort Strategy

Heapsort Strategy

•The elements to be sorted are arranged in a heap

•With this heap, we can build a sorted sequence in reverse order by repeatedly removing the element from the root,

•Rearranging the remaining elements to reestablish the partial order tree property, and so on.

How does it work?(Max-Heapify/Build-Max-Heap/Heap-Extract-Max)

Note
Ascending and descending will always be min and max heap respectively

---

## Slide 20: Heapsort in action

Heapsort
in action

---

## Slide 21: Slide 21

HEAP-SORT(A)
BUILD-MAX-HEAP(A)
For I  length [A] down to 2
Do exchange A[1]  A [i]
Heap-size[A]  heap-size[A]-1
MAX-HEAPIFY(A,1)

The running time of Build_Heap is O(n)
Max-Heapify takes O(log n)
(heapify to apply n-1 times)

Therefore running time is O(n log n)

---

## Slide 22: Slide 22

HEAP-SORT(A)
BUILD-MAX-HEAP(A)
For I  length [A] down to 2
Do exchange A[1]  A [i]
Heap-size[A]  heap-size[A]-1
MAX-HEAPIFY(A,1)

BUILD-MAX-HEAP(A)
{
A.heap-size= A.length
for(i=floor(A.length/2) downto 1)
MAX-HEAPIFY(A,i)
}

Build Max heap
0
1
2
3
4
5

i 2 to 0
12
7
8
23
3
21

for i2

i

L

exit

21

8

12
7
21
23
3
8

for i1

i

L
R

exit

23

7

12
23
21
7
3
8

for i0
i
L
R

23
12

for i1
i

L
R

exit
23
12
21
7
3
8

Heap-Sort
0
1
2
3
4
5

It-1
23
12
21
7
3
8

8

23

heapify
i
L
R

21
12
8
7
3
23

exit

i

21
12
8
7
3
23

It-2
3

21
23

heapify
i
L
R

12
3
8
7
21
23

heapify

i

L

12
7
8
3
21
23

exit

i

It-3
12
7
8
3
21
23

3

12
21
23

heapify
i
L
R

8

3

exit

i

It-4
8
7
3
12
21
23

3
7
8
12
21
23

heapify
i
L

exit
7
3

It-5
7
3
8
12
21
23

3
7
8
12
21
23

---

## Slide 23: Slide 23

(no text — image/graph only, see image)

---

## Slide 24: Slide 24

Heap – Introduction
https://www.youtube.com/watch?v=phYfC_NqfHQ

Illustrative Example of MaxHeapify BuildMax ExtractMax Procedures
https://www.youtube.com/watch?v=iCQO2OP1_TI&t=5s

Build Max Heapify ExtractMAx Analysis
https://www.youtube.com/watch?v=qcoqre-JHQU

HeapSort Strategy and Complexity Analysis
https://youtu.be/jCKWkFTZwCk

Understanding HeapSort with an Illustrative Example
https://youtu.be/_UZ1gf0M0GM

Video Lecture of the topic can be found at


---

<!-- FILE: 10 - bucket n radix sort.md -->

# 10 - bucket n radix sort — raw slide text (verbatim from class slides)
Source file: 10 -bucket n radix sort.pptx · 31 slides · images: slide-images/10 - bucket n radix sort/

---

## Slide 1: Bucket Sort and Radix Sort

Bucket Sort and Radix Sort

---

## Slide 2: Bucket Sort

Bucket Sort

---

## Slide 3: Time Complexity comparison of Sorting Algorithms

10/02/05

Time Complexity comparison of Sorting Algorithms

Algorithm
Data Structure
Time Complexity
Space
Complexity

Best
Average
Worst

Quicksort
Array
O(n log(n))
O(n log(n))
O(n^2)
O(n)/0(logn)

Mergesort
Array
O(n log(n))
O(n log(n))
O(n log(n))
O(n)

Heapsort
Array
O(n log(n))
O(n log(n))
O(n log(n))
O(1)

Bubble Sort
Array
O(n)
O(n^2)
O(n^2)
O(1)

Insertion Sort
Array
O(n)
O(n^2)
O(n^2)
O(1)

Select Sort
Array
O(n^2)
O(n^2)
O(n^2)
O(1)

Bucket Sort
Array
O(n+k)
O(n+k)
O(n^2)
O(nk)

Radix Sort
Array
O(nk)
O(nk)
O(nk)
O(n+k)

2026-10-19

---

## Slide 4: Space Complexity comparison of Sorting Algorithms

10/02/05

Space Complexity comparison of Sorting Algorithms

Algorithm
Data Structure
Worst Case Auxiliary Space Complexity

Quicksort
Array
O(n)

Mergesort
Array
O(n)

Heapsort
Array
O(1)

Bubble Sort
Array
O(1)

Insertion Sort
Array
O(1)

Select Sort
Array
O(1)

Bucket Sort
Array
O(nk)

Radix Sort
Array
O(n+k)

2026-10-19

---

## Slide 5: Time complexity of Sorting

10/02/05

2026-10-19

Time complexity of Sorting

■Several sorting algorithms have been discussed, the best so far are:

■Heap sort and Merge sort: O( n log n )

■Quick sort (best one in practice): O( n log n ) on average,
: O( n2 ) worst case

Can we do better than O( n log n )?

■No.

Any comparison-based sorting algorithm will need at least
O( n log n ) operations

---

## Slide 6: Restrictions on the problem

10/02/05

2026-10-19

Restrictions on the problem

■Suppose the values in the list to be sorted can repeat but the values have a limit (e.g., values are digits from 0 to 9)

Sorting in such can be made more efficient

■Is it possible to come up with an algorithm better than O( n log n )?

■Yes , Strategy will not involve comparisons

---

## Slide 7: Bucket sort

10/02/05

2026-10-19

Bucket sort

Idea:
suppose the values are in the range 0..m-1;

■start with m empty buckets numbered 0 to m-1,

■scan the list and place element s[i] in bucket s[i], and

■then output the buckets in order

Will need an array of buckets, and the values in the list to be sorted will be the indexes to the buckets
■No comparisons will be necessary

---

## Slide 8: Example

10/02/05

2026-10-19

Example

4
2
1
2
0
3
2
1
4
0
2
3
0

0 00

1 1

2
2 22

3 3

4 4

0
0
0
1
1
2
2
2
2
3
3
4
4

---

## Slide 9: Example

10/02/05

2026-10-19

Example

4
2
1
2
0
3
2
1
4
0
2
3
0

0

1

2

3

4

0
0
0
1
1
2
2
2
2
3
3
4
4

Bucket with indices same as input range

---

## Slide 10: Example

10/02/05

2026-10-19

Example

4
2
1
2
0
3
2
1
4
0
2
3
0

0 00

1 1

2
2 22

3 3

4 4

0
0
0
1
1
2
2
2
2
3
3
4
4

---

## Slide 11: Bucket sort algorithm

10/02/05

2026-10-19

Bucket sort algorithm

Algorithm BucketSort( S )
( values in S are between 0 and m-1 )

for j  0 to m-1 do // initialize m buckets
b[j]  0

for i  0 to n-1 do // place elements in their
b[S[i]]  b[S[i]] + 1 // appropriate buckets

i  0
for j  0 to m-1 do // place elements in buckets
for r  1 to b[j] do // back in S
S[i]  j
i  i + 1

---

## Slide 12: Values versus entries

10/02/05

2026-10-19

Values versus entries

■If we were sorting values, each bucket is just a counter that we increment whenever a value matching the bucket’s number is encountered

■If we were sorting entries according to keys, then each bucket is a queue
■Entries are enqueued into a matching bucket
■Entries will be dequeued back into the array after the scan

---

## Slide 13: Time complexity

10/02/05

2026-10-19

Time complexity

■Bucket initialization : O( m )
■From array to buckets : O( n )
■From buckets to array : O( n )
■Even though this stage is a nested loop, but all we do is dequeue from each bucket until they are all empty –> n dequeue operations in all

■Since m will likely be small compared to n,
Bucket sort is O( n )
■Strictly speaking, time complexity is O ( n + m )

Algorithm BucketSort( S )
( values in S are between 0 and m-1 )

for j  0 to m-1 do // initialize m buckets
b[j]  0
for i  0 to n-1 do // place elements in their
b[S[i]]  b[S[i]] + 1 // appropriate buckets
i  0
for j  0 to m-1 do // place elements in buckets
for r  1 to b[j] do // back in S
S[i]  j
i  i + 10

---

## Slide 14: Sort a large set of floating point numbers which are in range from 0.0 to 0.9 and are uniformly distributed across the range.

10/02/05

Sort a large set of floating point numbers which are in range from 0.0 to 0.9 and are uniformly distributed across the range.

2026-10-19

Sorting floating point numbers

---

## Slide 15: Radix sort

10/02/05

Radix sort

2026-10-19

---

## Slide 16: Sorting integers

10/02/05

2026-10-19

Sorting integers

■To perform bucket sort on any array of (non-negative) integers?

➔number of buckets will depend on the maximum integer value

Example
■sorting 1000 integers and the maximum value is 999999, you will need 1 million buckets!

■Time complexity is not really O( n )
■because m >>>n, actual time complexity is O( m )

Can we do better?

---

## Slide 17: Radix sort

10/02/05

2026-10-19

Radix sort

Idea:
■repeatedly sort by digit—
■perform multiple bucket sorts on S starting with the rightmost digit

■If maximum value is 999999, only ten buckets will be necessary (not 1 million)

■Use this strategy when the keys are integers, and there is a reasonable limit on their values
■Number of passes (bucket sort stages) will depend on the number of digits in the maximum value

---

## Slide 18: Slide 18

10/02/05

2026-10-19

1. Determine the maximum number of digits or characters in the elements to be sorted. You can do this by finding the maximum element and counting its digits or characters.

2. Initialize ten buckets (0 to 9) for decimal digits or 256 buckets (0 to 255) for characters in a byte, one for each possible digit or character value.

3. Start from the least significant digit or character position and perform the following steps for each digit or character position, moving from right to left:

a. Place each element in the appropriate bucket based on the value of the current digit or character position. For example, if sorting integers, place an integer in the bucket corresponding to the value of its current digit.

b. Collect the elements from the buckets in the order they were placed. This step preserves the order of elements with the same digit or character values.

4. Repeat step 3 for each digit or character position, moving from the least significant to the most significant.

5. After processing all digit or character positions, the array will be sorted.

Algorithm for Radix Sort:

---

## Slide 19: Example:  first pass

10/02/05

2026-10-19

Example: first pass

12
58
37
64
52
36
99
63
18
9
20
88
47

0

1

2

3

4

5

6

7

8

9

20
12
52
63
64
36
37
47
58
18
88
9
99

---

## Slide 20: Example:  first pass

10/02/05

2026-10-19

12
58
37
64
52
36
99
63
18
9
20
88
47

20

12 52

63

64

36

37 47

58
1888

9
99

20
12
52
63
64
36
37
47
58
18
88
9
99

Example: first pass

---

## Slide 21: Example: second pass

10/02/05

2026-10-19

Example: second pass

9
12
18
20
36
37
47
52
58
63
64
88
99

9

12
18

20

3637

47

52 58

63
64

88

99

20
12
52
63
64
36
37
47
58
18
88
9
99

---

## Slide 22: Example: 1stand 2ndpasses

10/02/05

2026-10-19

Example: 1st and 2nd passes

12
58
37
64
52
36
99
63
18
9
20
88
47

20
12
52
63
64
36
37
47
58
18
88
9
99

9
12
18
20
36
37
47
52
58
63
64
88
99

sort by rightmost digit
(least significant)

sort by leftmost digit
(second least significant)

---

## Slide 23: Radix sort and stability

10/02/05

2026-10-19

Radix sort and stability

■Radix sort works as long as the bucket sort stages are stable sorts

■Stable sort: in case of ties, relative order of elements are preserved in the resulting array
■Suppose there are two elements whose first digit is the same; for example, 52 & 58
■If 52 occurs before 58 in the array prior to the sorting stage, 52 should occur before 58 in the resulting array

■This way, the work carried out in the previous bucket sort stages is preserved

---

## Slide 24: Timecomplexity

10/02/05

2026-10-19

Time complexity

■If there is a fixed number p of bucket sort stages (six stages in the case where the maximum value is 999999), then radix sort is O( n )
■There are p bucket sort stages, each taking O( n ) time

■Strictly speaking, time complexity is O( pn ), where p is the number of digits

---

## Slide 25: Radix sort -summary

10/02/05

2026-10-19

Radix sort -summary

■Only 10 buckets are needed regardless of number of stages since the buckets are reused at each stage

■Radix sort can apply to words
■Set a limit to the number of letters in a word
■Use 27 buckets (or more, depending on the letters/characters allowed), one for each letter plus a “blank” character
■The word-length limit is exactly the number of bucket sort stages needed

Strategy ?
Read char left to right ? [R_L]
Blank spaces to be taken at beginning or last ? [L]
Space bucket to be kept at beginning or last ? [L]

---

## Slide 26: Summary

10/02/05

2026-10-19

Summary

■Bucket sort and Radix sort are O(n) algorithms only because we have imposed restrictions on the input list to be sorted

■Sorting, in general, can be done in O(nlogn) time

---

## Slide 27: Slide 27

10/02/05

2026-10-19

Sorting Words
Using
Radix Sort

---

## Slide 28: Slide 28

10/02/05

2026-10-19

Apply Radix sort on the following four words

dart, fear, do, car

---

## Slide 29: Slide 29

10/02/05

2026-10-19

Radix sort on the following four words

making the following assumptions
➢Read characters in word from right to left
➢Blank spaces in a word (if assumed) to be taken at last
➢Space bucket to be kept at last

---

## Slide 30: Slide 30

10/02/05

2026-10-19

---

## Slide 31: Slide 31

10/02/05

Bucket Sort Strategy and Analysis
https://youtu.be/N7-q_O3lgtg

Radix Sort and its Complexity Analysis
https://youtu.be/pdY5CC_3iEc

2026-10-19
