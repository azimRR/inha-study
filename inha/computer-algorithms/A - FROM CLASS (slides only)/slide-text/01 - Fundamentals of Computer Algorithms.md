# 01 - Fundamentals of Computer Algorithms — raw slide text (verbatim from class slides)
Source file: 01- Fundamentals of Computer Algorithms.pptx · 30 slides · images: slide-images/01 - Fundamentals of Computer Algorithms/

---

## Slide 1: Slide 1

TECH
Computer Science

Computer Algorithms

Dr. Ashish Seth

---

## Slide 2: What is a Computer Algorithm?

What is a Computer Algorithm?

•A computer algorithm is
✈a detailed step-by-step method for
✈solving a problem
✈by using a computer.

Properties
➢Finiteness
➢Unambiguous
➢Definiteness of sequence
➢Input /Output defined
➢Feasibility

---

## Slide 3: Design Techniques -Problem Solving Strategies

Design Techniques -Problem Solving Strategies

•Divide & Conquer
•Greedy Method
•Branch & Bound
•Backtracking
•Dynamic Programming
•Brute Force
•Randomized

---

## Slide 4: Problem Solving Using Computers

Problem Solving Using Computers

•Problem:
•Strategy:
•Algorithm:
✈Input:
✈Output:
✈Step:
•Analysis:
✈Time & Space:
✈Optimality:
✈Correctness:
•Implementation:
•Verification:

---

## Slide 5: Example: Search in an unordered array

Example: Search in an unordered array

•Problem:
✈Let E be an array containing n entries, E[0], …, E[n-1], in no particular order.
✈Find an index of a specified key K, if K is in the array;
✈return –1 as the answer if K is not in the array.

•Strategy:
✈Compare K to each entry in turn until a match is found or the array is exhausted.
✈If K is not in the array, the algorithm returns –1 as its answer.

---

## Slide 6: Example: Sequential Search, Unordered

Example: Sequential Search, Unordered

•Algorithm (and data structure)

✈Input:
E, n, K, where E is an array with n entries (indexed 0, …, n- 1), and K is the item sought.

✈Output:
Returns ans, the location of K in E (-1 if K is not found)

---

## Slide 7: Algorithm: Step (Specification)

Algorithm: Step (Specification)

•int seqSearch(int[] E, int n, int K)
•int ans, index;
•ans = -1; // Assume failure.
•for (index = 0; index < n; index++)
• if (K == E[index])
• ans = index; // Success!
• break; // Done!
•return ans;

---

## Slide 8: Analysis of the Algorithm

Analysis of the Algorithm

we measure the amount of work done by an algorithm.
•Basic Operation:
✈Comparison of x with an array entry

•Worst-Case Analysis:
✈Let W(n) be a function.
W(n) is the maximum number of basic operations performed by the algorithm on any input size n.
✈For our example, clearly W(n) = n.

✈The worst cases occur when K appears only in the last position in the array OR when K is not in the array at all.

---

## Slide 9: More Analysis of the Algorithm

•Optimality:
✈The Best possible solution?
✈Searching an Ordered Array
Using Binary Search
✈W(n) = Ceiling[lg(n+1)]
✈The Binary Search algorithm is optimal.

More Analysis of the Algorithm

---

## Slide 10: Correctnesscan be proved!

Correctness can be proved!

Correctness: (proving correctness of procedures)

An algorithm consists of sequences of steps
(operations, instructions, statements) for transforming
inputs (preconditions) to outputs (postconditions)

•Proving
✈if the preconditions are satisfied,
✈then the postconditions will be true,
✈when the algorithm terminates.

---

## Slide 11: Algorithm Language (Specifying the Steps)

Algorithm Language (Specifying the Steps)

•Java/C++ as an algorithm language can be used

•steps within an algorithm may be specified in pseduocode (English phrases)

•Focus on the strategy and techniques of an algorithm, not on detail implementation

---

## Slide 12: Loop Invariant – Analysing Correctness of Algorithm

Loop Invariant – Analysing Correctness of Algorithm

---

## Slide 13: Finding Max value in an array

Finding Max value in an array

---

## Slide 14: … finding max value in an array

… finding max value in an array

---

## Slide 15: Linear Search

Linear Search

---

## Slide 16: Slide 16

(means now you are at ith index and at this index you have find x)

---

## Slide 17: Amount of work done

Amount of work done

✈We want a measure of work that tells us something about the efficiency of the method used by the algorithm

✈independent of computer, programming language, programmer, and other implementation details.

✈Usually depending on the size of the input

•Counting passes through loops

•Basic Operation
✈Identify a particular operation fundamental to the problem
✈the total number of operations performed is roughly proportional to the number of basic operations

•Identifying the properties of the inputs that affect the behavior of the algorithm

---

## Slide 18: Worst-case complexity

Worst-case complexity

✈Let Dn be the set of inputs of size n for the problem under consideration, and let I be an element of Dn.

✈Let t(I) be the number of basic operations performed by the algorithm on input I.

✈We define the function W by
•W(n) = max{t(I) | I  Dn}
✈called the worst-case complexity of the algorithm.
✈W(n) is the maximum number of basic operations performed by the algorithm on any input of size n.

•The input, I, for which an algorithm behaves worst
depends on the particular algorithm.

---

## Slide 19: Space Usage

Space Usage

•worst-case analysis can be done.
==> If memory cells used by the algorithms depends on the particular input

➢Normally a program require space for instructions, constants, variables used by program and input data,

➢It may also use space for manipulating data and storing information to carry out computations

1.Fixed part: The size required to store certain data/variables, that is independent of the size of the problem:
- e.g. name of the data collection
- same size for classifying 2GB or 1MB of texts

1.Variable part: Space needed by variables, whose size is dependent on the size of the problem:
- e.g. actual text
- load 2GB of text VS. load 1MB of text

Generally we do
Time and Space Tradeoff.

---

## Slide 20: Analysis Tool: Mathematics: Set

Analysis Tool: Mathematics: Set

•A set is a collection of distinct elements.The elements are of the same “type”,

•“element e is a member of set S” is denoted as e  S

•A particular set is defined by listing or describing its elements between a pair of curly braces:
S1 = {a, b, c}, S2 = {x | x is an integer power of 2}
read “the set of all elements x such that x is …”

•S3 = {} = , has not elements, called empty set

•A set has no inherent order.

---

## Slide 21: Subset, Superset; Intersection, Union

Subset, Superset; Intersection, Union

•If all elements of one set, S1
✈are also in another set, S2,
•Then S1 is said to be a subset of S2, S1  S2
✈and S2 is said to be a superset of S1, S2  S1.
•Empty set is a subset of every set,   S
•Intersection
• S  T = {x | x  S and x  T}
•Union
• S  T = {x | x  S or x  T}

---

## Slide 22: Cardinality

Cardinality

•Cardinality
✈A set, S, is finite if there is an integer n such that the elements of S can be placed in a one-to-one correspondence with {1, 2, 3, …, n}
✈in this case we write |S| = n

•How many distinct subsets does a finite set on n elements have? There are 2n subsets.

•How many distinct subsets of cardinality k does a finite set of n elements have?
There are C(n, k) = n!/((n-k)!k!), “n choose k”

---

## Slide 23: Analysis Tool: Algebra

Analysis Tool: Algebra

Manipulating Inequalities
•Transitivity: If ((A  B) and (B  C) Then (A  C)
•Addition: If ((A  B) and (C  D) Then (A+C  B+D)
•Positive Scaling:
If ((A  B) and ( > 0) Then ( A   B)
•Floor and Ceiling Functions
•Floor[x] is the largest integer less than or equal to x.

•Ceiling[x] is the smallest integer greater than or equal to x.

---

## Slide 24: Logarithms

Logarithms

✈For b>1 and x>0, logbx = L such that bL = x

✈logb is a strictly increasing function,
if x > y then logb x > logb y

✈logb is a one-to-one function,
if logb x = logb y then x = y

✈logb 1 = 0; logb b = 1; logb xa = a logb x

✈logb(xy) = logb x + logb y

✈xlog y = ylog x

✈change base: logcx = (logb x)/(logb c)

---

## Slide 25: Series

Series

A series is the sum of a sequence.
•Arithmetic series
✈The sum of consecutive integers

•Polynomial Series
✈The sum of squares
✈The general case is

•Power of 2

•Arithmetic- Geometric Series

---

## Slide 26: Optimality “the best possible”

Optimality the best possible

•Each problem has inherent complexity
✈There is some minimum amount of work required to solve it.
•To analyze the complexity of a problem,
✈we choose a class of algorithms (by specifying the types of operations the algorithm is permitted to perform), and
✈Measure of complexity (ex, the basic operations to be counted)

An algorithm is optimal if there is no algorithm in the class under study that performs fewer operations (in worst case)

Optimal doesn't mean best known but it means best possible

---

## Slide 27: Show whether an algorithm is optimal?

Show whether an algorithm is optimal?

•Analyze the algorithm, call it A, and found the Worst-case complexity WA(n), for input of size n.
•Prove a theorem starting that,
✈for any algorithm in the same class of A
✈for any input of size n, there is some input for which the algorithm must perform at least W[A](n)
(lower bound in the worst-case)
•If WA(n) == W[A](n)
✈then the algorithm A is optimal
✈else there may be a better algorithm
✈ OR there may be a better lower bound.

---

## Slide 28: Optimality e.g. 

Optimality e.g.

•Problem
✈Fining the largest entry in an (unsorted) array of
n numbers
•Algorithm A
✈int findMax(int[] E, int n)
✈1. int max;
✈2. max = E[0]; // Assume the first is max.
✈3. for (index = 1; index < n; index++)
✈4. if (max < E[index])
✈5. max = E[index];
✈6. return max;

---

## Slide 29: Analyze the algorithm, find WA(n)

Analyze the algorithm, find WA(n)

•Basic Operation
✈Comparison of an array entry with another array entry or a stored variable.
•Worst-Case Analysis
✈For any input of size n, there are exactly n-1 basic operations
✈WA(n) = n-1

---

## Slide 30: Slide 30

Video Lecture of the topic can be found at

Introduction to Computer Algorithms
https://youtu.be/GI1NwGPGxNo

Computer Algorithms - Abstract Data Types (ADT)
https://youtu.be/aHWNxF0c08U

Basics for Analysing Computer Algorithms
https://youtu.be/n1ArVTvMJtE
