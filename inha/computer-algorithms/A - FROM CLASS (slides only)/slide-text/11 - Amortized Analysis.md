# 11 - Amortized Analysis — raw slide text (verbatim from class slides)
Source file: 11 -Amortized Analysis.pptx · 11 slides · images: slide-images/11 - Amortized Analysis/

---

## Slide 1: Amortized Analysis

Amortized Analysis

---

## Slide 2: Slide 2

An Amortized analysis is an strategy for analyzing a sequence of operations to show that the average cost per operation is small, even though a single operation within the sequence might be expensive

•It refers to finding the average running time per operation over a worst case sequence of operations

•It is technique for analysing algorithms under some conditions

---

## Slide 3: Slide 3

•Amortized analysis differs from average case performance in that probability is not involved;
In average case analysis, we are averaging over all possible inputs

•Amortized analysis guarantees the time per operation over worst case performance

•Amortized analysis assumes worst case input and typically does not allow random choices

---

## Slide 4: Slide 4

Techniques used in Amortized Analysis

•Aggregate Analysis determines the upper bound T(n) on the total cost of a sequence of n operations, then calculates the average cost to be T(n)/n

•Accounting Method determines the individual cost of each operation, combining its intermediate execution time and its influence on the running time of future operations

•Potential Method like an accounting method, but overcharges operations early to compensate for undercharges later

Amortized bounds
- assign amortized cost for each operations such that it “preserve the sum”

∑ amortized cost >= ∑ Actual cost

---

## Slide 5: Slide 5

•Idea is that the worst case operation can alter the state in such way that worst case cannot occur again for a long time, thus “amortizing” its cost

•It is applicable to some special set of problems like hash tables, disjoint set, splay trees etc.

•It has significance where first set of input affects the next set of inputs

---

## Slide 6: Slide 6

Case 1: Find kth smallest element

int find_Kth _smallest ( int A[], int n, int k)
{
If (! Sorted)
Sort(A,n)
return A[k]
}
Running Time is O(n log n)

---

## Slide 7: Slide 7

•To find n different kth smallest element
K= 1st, 10th, 50th …..
Worst Case n* (n log n)

Amortized cost per operation
= Total cost of k operations/k

Amortized Analysis
(nlogn)+O(1)+O(1)+……….
nlogn +1+1+…..(n-1) = (nlogn+n)/n
= O(logn+1) =logn

---

## Slide 8: Slide 8

Scenario – doubling the space

Ex: (Adding puppies)
•If there is a space
–Add puppy in free space O(1)

If there is no space left
-buy a space with 2 X storage (1 unit )
-Move all puppies in new facility ( N + 1 unit)
-Total Cost = 1+N+1 = O(N)

---

## Slide 9: Slide 9

(no text — image/graph only, see image)

---

## Slide 10: Slide 10

Observation
•-it is only expensive when full
•Many cheap add after expensive one
•Spread out the expensive cost uniformly

---

## Slide 11: Slide 11

Sequence of Operations
PUSH, POP, MULTIPOP
Actual Cost
•PUSH 0(1) 1
•POP 0(1) 1
•Multipop (S,k) min(S,k)

Amortized analysis
•PUSH 2
•POP 0
•Multipop (S,k) 0

Multipop(S,k)
While not stackEmpty(S) and k<>0
Do POP S
K=k-1

Total cost for n sequence of operations = 2n

Amortized cost/operation
= Total Cost / Total Ops
= 2n / n
= 2 (constant )
Therefore Effective cost per operation in constant i.e. O(1).
