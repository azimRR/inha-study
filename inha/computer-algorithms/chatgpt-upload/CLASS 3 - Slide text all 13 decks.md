# CLASS material - verbatim slide text, decks 01-13



---

<!-- FILE: 01 - Fundamentals of Computer Algorithms.md -->

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


---

<!-- FILE: 02 - ADT and its specification.md -->

# 02 - ADT and its specification — raw slide text (verbatim from class slides)
Source file: 02 -ADT and its specification.pptx · 16 slides · images: slide-images/02 - ADT and its specification/

---

## Slide 1: Slide 1

Data Abstraction
&
Basic Data Structures

---

## Slide 2: Abstract Data Type (ADT)

❑An ADT describes a set of objects sharing the same properties and behaviors
✈The properties of an ADT are its data
✈The behaviors of an ADT are its operations or functions

❑Thus, an ADT couples its data and operations
✈OOP emphasizes data abstraction

Abstract Data Type (ADT)

2

Abstraction: hide implementation details.
A data structure is the physical implementation of an ADT.

---

## Slide 3: Slide 3

Logical vs. Physical Form
Data items have both a logical and a physical form.

Logical form:
definition of the data item within an ADT.

Abstract Data Type (ADT): This is a logical, conceptual model. It defines what data is handled and what operations can be performed (such as push, pop, or insert), but it hides how those operations are achieved.

Physical form:
implementation of the data item within a data structure.

Data Structure: This is the physical, programmatic realization in memory. It defines how the data is stored and manipulated using arrays, pointers, or linked nodes

---

## Slide 4: Data Abstraction and Basic Data Structures

TECH
Computer Science

Data Abstraction and Basic Data Structures

•Improving efficiency by building better
✈Data Structure
•Object IN
✈Abstract Data Type
Specification
Design
✈Architecture [Structure, Function]
•Abstract Data Types
✈Lists, Trees
✈Stacks, Queues
✈Priority Queue, Union-Find
✈Dictionary

ADT

---

## Slide 5: Abstract Data type

Abstract Data type

✈i is an instance of type T, i  T
✈e is an element of set S, e  S
✈o is an object of class C, o  C

•Abstract Data Type
✈Structures: data structure declarations
✈Functions: operation definitions

•An ADT is identified as a Class
✈in languages such as C++ and Java

---

## Slide 6: ADT Specification

ADT Specification

•The specification of an ADT describe how the operations (functions, procedures, or methods) behave
✈in terms of Inputs and Outputs
•A specification of an operation consists of:
✈Calling prototype
✈Preconditions
✈Postconditions
•The calling prototype includes
✈name of the operation
✈parameters and their types
✈return value and its types
•The preconditions are statements
✈assumed to be true when the operation is called.
•The postconditions are statements
✈assumed to be true when the operation returns.

---

## Slide 7: Operations for ADT

Operations for ADT

•Constructors
✈create a new object and return a reference to it
•Access functions
✈return information about an object, but do not modify it
•Manipulation procedures
✈modify an object, but do not return information
•State of an object
✈current values of its data
•Recursive ADT
✈if any of its access functions returns the same class as the ADT

---

## Slide 8: ADT Design e.g. Lists 

ADT Design e.g. Lists

✈Every computable function can be computed using
Lists as the only data structure!
•IntList cons(int newElement, IntList oldList)
✈Precondition: None.
✈Postconditions: If x = cons(newElement, oldList) then
1. x refers to a newly created object;
2. x != nil;
3. first(x) = newElement;
4. rest(x) = oldList
•int first(IntList aList) // access function
✈Precondition: aList != nil
•IntList rest(IntList aList) // access function
✈Precondition: aList != nil
•IntList nil //constant denoting the empty list.

---

## Slide 9: Binary Tree

Binary Tree

•A binary tree T is a set of elements, called nodes,
that is empty or satisfies:
✈1. There is a distinguished node r called the root
✈2. The remaining nodes are divided into two disjoint subsets, L and R, each of which is a binary tree.
L is called the left subtree of T and R is called the right subtree of T.
•There are at most 2d nodes at depth d of a binary tree.
•A binary tree with n nodes has height at least Ceiling[lg(n+1)] – 1.
•A binary tree with height h has at most 2h+1 –1 nodes

---

## Slide 10: Stacks

Stacks

•A stack is a linear structure in which insertions and deletions are always make at one end, called the top.

•This updating policy is call last in, first out (LIFO)

---

## Slide 11: Queue

Queue

•A queue is a linear structure in which
✈all insertions are done at one end, called the rear or back, and
✈all deletions are done at the other end, called the front.

•This updating policy is called first in, first out (FIFO)

---

## Slide 12: Priority Queue

Priority Queue

•A priority queue is a structure with some aspects of FIFO queue but
✈in which element order is related to each element’s priority,
✈rather than its chronological arrival time.
•As each element is inserted into a priority queue, conceptually it is inserted in order of its priority
•The one element that can be inspected and removed is the most important element currently in the priority queue.
✈a cost viewpoint: the smallest priority
✈a profit viewpoint: the largest priority

---

## Slide 13: Union-Find ADT for Disjoint Sets

Union-Find ADT for Disjoint Sets

•Through a Union operation, two (disjoint) sets can be combined.
✈(to insure the disjoint property of all existing sets, the original two sets are removed and the new set is added)
✈Let the set id of the original two set be, s and t, s != t
✈Then, new set has one unique set id that is either s or t.

•Through a Find operation, the current set id of an element can be retrieved.

•Often elements are integers and
✈the set id is some particular element in the set,
called the leader,

---

## Slide 14: Union-Find ADT e.g.

Union-Find ADT e.g.

•UnionFind create(int n)
✈// create a set (called sets) of n singleton disjoint sets {{1},{2},{3},…,{n}}
•int find(UnionFind sets, e)
✈// return the set id for e
•void makeSet(unionFind sets, int e)
✈//union one singleton set {e} (e not already in the sets)
into the exiting sets
•void union(UnionFind sets, int s, int t)
✈// s and t are set ids, s != t
✈// a new set is created by union of set [s] and set [t]
✈// the new set id is either s or t, in some case min(s, t)

---

## Slide 15: Dictionary ADT

Dictionary ADT

•A dictionary is a general associative storage structure.
•Items in a dictionary
✈have an identifier, and
✈associated information that needs to be stored and retrieved.
✈no order implied for identifiers in a dictionary ADT

---

## Slide 16: Slide 16

Video Lecture of the topic can be found at

Computer Algorithms - Abstract Data Types (ADT)
https://youtu.be/aHWNxF0c08U

Basics for Analysing Computer Algorithms
https://youtu.be/n1ArVTvMJtE


---

<!-- FILE: 03 - Asymptotic notations.md -->

# 03 - Asymptotic notations — raw slide text (verbatim from class slides)
Source file: 03 -Asymptotic notations.pptx · 29 slides · images: slide-images/03 - Asymptotic notations/

---

## Slide 1: Asymptotic Notations

Asymptotic Notations

---

## Slide 2: Mathematical Model of Computation

asymp - 1

Mathematical Model of Computation

Framework for Algorithmic Analysis

Need of Mathematical Model

Real Computers Vs Mathematical Model

---

## Slide 3: Mathematical Model of Computation

asymp - 2

Mathematical Model of Computation

Model of Computation specifies:
What operations in an algorithm is allowed
Cost (time) of each operation

Two components of Model
Processor (has defined instruction set)
Memory (collection of locations)

---

## Slide 4: Computing running time in Model

asymp - 3

Computing running time in Model

Simple Statement
(1 step execution )
Arithmetic & logical operations.
Jumps & conditional jumps
Pointer instruction

Array operations (1D) [2 step execution]

---

## Slide 5: Slide 5

asymp - 4

More Complex Statement
(multistep execution)
A=B+C*D-F 3 steps

A[I]=B[I] + C[I] 4 steps

C = A[I,J]4 steps
A’ [(I)*M + J] where m is the number of columns

X=B[I]
Y=C[I]
Z=X+Y
A[I]=Z

---

## Slide 6: Slide 6

asymp - 5

General Analysis Strategy T(n)
T(n)= n
📫Max time taken by an algorithm to solve any instance of size n.
📫measures a goodness of an algorithm, i.e functional form of T(n) is important (linear, cubic, quadratic, etc.)
📫Significance of T(n) is independent of model/computer we used for analysis because here the objective is to characterize the algorithm not the machine

Running Time Calculations
To Add elements of two arrays of size n

---

## Slide 7: Asymptotic Notations

Asymptotic Notations

Has two features

1.Function classification

2.Identify the behaviour as n

---

## Slide 8: Asymptotic Complexity

asymp - 7

Asymptotic Complexity

Running time of an algorithm as a function of input size n for large n.

Expressed using only the highest-order term in the expression for the exact running time.
Instead of exact running time, say (n2).

Written using Asymptotic Notation.

---

## Slide 9: Asymptotic Notation

asymp - 8

Asymptotic Notation

 , O, , o, 

Defined for functions over the natural numbers.
Ex: f(n) = (n2).
Describes how f(n) grows in comparison to n2.

The notations describe different rate-of-growth relations between the defining function and the defined set of functions.

---

## Slide 10: O-notation

asymp - 9

O-notation

O(g(n)) = {f(n) :
 positive constants c and n0, such that n  n0,
we have 0  f(n)  cg(n) }

For function g(n), we define O(g(n)), big-O of n, as the set:

g(n) is an asymptotic upper bound for f(n).

Intuitively: Set of all functions whose rate of growth is the same as or lower than that of g(n).

f(n) = (g(n))  f(n) = O(g(n)).
(g(n))  O(g(n)).

---

## Slide 11: Examples

asymp - 10

Examples

Any linear function an + b is in O(n2). How?
Show that 3n3=O(n4) for appropriate c and n0.

O(g(n)) = {f(n) :  positive constants c and n0, such that n  n0, we have 0  f(n)  cg(n) }

---

## Slide 12:  -notation

asymp - 11

 -notation

g(n) is an asymptotic lower bound for f(n).

Intuitively: Set of all functions whose rate of growth is the same as or higher than that of g(n).

f(n) = (g(n))  f(n) = (g(n)).
(g(n))  (g(n)).

(g(n)) = {f(n) :
 positive constants c and n0, such that n  n0,
we have 0  cg(n)  f(n)}

For function g(n), we define (g(n)), big-Omega of n, as the set:

---

## Slide 13: -notation

asymp - 12

-notation

(g(n)) = {f(n) :
 positive constants c1, c2, and n0, such that n  n0,
we have 0  c1g(n)  f(n)  c2g(n)
}

For function g(n), we define (g(n)), big-Theta of n, as the set:

g(n) is an asymptotically tight bound for f(n).

Intuitively: Set of all functions that
have the same rate of growth as g(n).

---

## Slide 14: -notation

asymp - 13

-notation

(g(n)) = {f(n) :
 positive constants c1, c2, and n0, such that n  n0,
we have 0  c1g(n)  f(n)  c2g(n)
}

For function g(n), we define (g(n)), big-Theta of n, as the set:

Technically, f(n)  (g(n)).
Older usage, f(n) = (g(n)).
accept either notation

f(n) and g(n) are nonnegative, for large n.

---

## Slide 15: Example

asymp - 14

Example

10n2 - 3n = (n2)
What constants for n0, c1, and c2 will work?
Make c1 a little smaller than the leading coefficient, and c2 a little bigger.
To compare orders of growth, look at the leading term.

(g(n)) = {f(n) :  positive constants c1, c2, and n0, such that n  n0, 0  c1g(n)  f(n)  c2g(n)}

---

## Slide 16: Relations Between Q, O, W

asymp - 15

Relations Between , O, 

---

## Slide 17: Relations Between Q, W, O

asymp - 16

Relations Between , , O

I.e., (g(n)) = O(g(n))  (g(n))
In practice, asymptotically tight bounds are obtained from asymptotic upper and lower bounds.

Theorem : For any two functions g(n) and f(n),
f(n) = (g(n)) iff
f(n) = O(g(n)) and f(n) = (g(n)).

---

## Slide 18: Running Times

asymp - 17

Running Times

“Running time is O(f(n))”  Worst case is O(f(n))
“Running time is (f(n))”  Best case is (f(n))

---

## Slide 19: Comparison of Functions

asymp - 18

Comparison of Functions

f  g  a  b

f (n) = O(g(n))  a  b
f (n) = (g(n))  a  b
f (n) = (g(n))  a = b
f (n) = o(g(n))  a < b
f (n) =  (g(n))  a > b

---

## Slide 20: Properties

asymp - 19

Properties

Transitivity
f(n) = (g(n)) & g(n) = (h(n))  f(n) = (h(n))
f(n) = O(g(n)) & g(n) = O(h(n))  f(n) = O(h(n))
f(n) = (g(n)) & g(n) = (h(n))  f(n) = (h(n))
f(n) = o (g(n)) & g(n) = o (h(n))  f(n) = o (h(n))
f(n) = (g(n)) & g(n) = (h(n))  f(n) = (h(n))

Reflexivity
f(n) = (f(n))
f(n) = O(f(n))
f(n) = (f(n))

---

## Slide 21: Properties

asymp - 20

Properties

Symmetry
f(n) = (g(n)) iff g(n) = (f(n))

Complementarity
f(n) = O(g(n)) iff g(n) = (f(n))
f(n) = o(g(n)) iff g(n) = ((f(n))

---

## Slide 22: Growth of a function

asymp - 21

Growth of a function

Find the big oh for the following functions

f(n) = 3n + 5
f(n) = 27n2 + 16n + 25
f(n) = 3n3 + 4n
f(n) = 2n + 6n2 + 3n
f(n) = 5*2n + 3n +5
 f(n) = 3*2n + 4n2 + 5n + 3

---

## Slide 23: Incorrect bounds 

asymp - 22

Incorrect bounds

7n+5 ≠ O(1)
27n2 + 16n + 25 ≠ O(n)
5n3 + n2 + 3n + 2 ≠ O(n2)

---

## Slide 24: Find the big Omega for the following functions 

asymp - 23

Find the big Omega for the following functions

f(n) = 27n2 + 16n
f(n) = 4n3 + 2n + 3
f(n) = 2n + 6n2 +3n
f(n) = 5*2n + 3n +5

---

## Slide 25: Incorrect bounds 

asymp - 24

7n+5 ≠ (n2)
5n2 + 4n +2 ≠ (n3)
3n3+ 5n2 +2n ≠ (n4)

Incorrect bounds

---

## Slide 26: Find the Thetafor the following functions

asymp - 25

Find the Thetafor the following functions

f(n) = 27n2 + 16n
f(n) = 4n3 + 2n + 3
f(n) = 2n + 6n2 +3n

---

## Slide 27: Incorrect bounds 

asymp - 26

Incorrect bounds

7n+5 ≠  (1)
10n2+ 7 ≠  (n3)
5n+8 ≠  (n2)

---

## Slide 28: Related Contents 

asymp - 27

Related Contents

Basics of Asymptotic Notations
https://cexpertvision.com/2023/06/23/basics-of-asymptotic-notations/

---

## Slide 29: Slide 29

asymp - 28

Mathematical Model of Computation
https://youtu.be/JEnXJPlXhng

Basics of Asymptotic Notations
https://youtu.be/OQZySiRblPo

Video Lecture of the topic can be found at


---

<!-- FILE: 04 - Analyzing Running Times of recursive Programs.md -->

# 04 - Analyzing Running Times of recursive Programs — raw slide text (verbatim from class slides)
Source file: 04 -Analyzing Running Times of recursive Programs.pptx · 14 slides · images: slide-images/04 - Analyzing Running Times of recursive Programs/

---

## Slide 1: AnalyzingRunning TimesOf Recursive Program Code

Analyzing Running Times
Of
Recursive Program Code

1

---

## Slide 2: Techniques of AnalyzingRecursive Code

Techniques of Analyzing
Recursive Code

•Back Substitution Method
•Recursive Tree Method
•Master’s Theorem

2

---

## Slide 3: 0(n2)

0(n2)

demo(int n)
{
if(n>0)
{
for(i=1; i<=n; i++)
print (“message”);
demo(n-1);
}
else
return 1;
}

3

---

## Slide 4: 0(n logn)

0(n logn)

demo(int n)
{
if(n>0)
{
for(i=1; i<=n; i=i*2)
print (“message”);
demo(n-1);
}
else
return 1;
}

4

---

## Slide 5: 0(2n)

0(2n)

demo(int n)
{
if(n>0)
{
print (“message”);
demo(n-1);
demo(n-1);
}
else
return 1;
}

5

---

## Slide 6: 0(logn)

0(logn)

demo(int n)
{
if(n>1)
{
print (“message”);
demo(n/2);
}
else
return 1;
}

6

---

## Slide 7: 0(n)

0(n)

demo(int n)
{
if(n>1)
{
for(i=1; i<=n; i=i+1)
print (“message”);
demo(n/2);
}
else
return 1;
}

7

---

## Slide 8: 0(n logn)

0(n logn)

demo(int n)
{
if(n>1)
{
for(i=1; i<=n; i=i+1)
print (“message”);
demo(n/2);
demo(n/2);
}
else
return 1;
}

8

---

## Slide 9: Slide 9

T(n) = c + 2T(n/2) n>1
= c n=1

0(n)

9

---

## Slide 10: Slide 10

Amount of work done varies at different levels

(max. work done at root)
T(n) = 2T(n/2) + cn2 [ n2 ]

(work is done equally at all levels)
T(n) = 2T(n/2) + cn [ n log n ]

(max. work done at leaves)
T(n) = 2T(n/2) + c [ n ]

10

---

## Slide 11: Results 

Results

T(n) = c + T(n-1) => 0(n)
= 1 + T(n-1)=> 0(n)
= n + T(n-1)=> 0(n2)
= n2 + T(n-1) => 0(n3)
= logn + T(n-1) => 0(nlogn)

T(n) = 2T(n-1) + c => 0(2n)
= 3T(n-1) + 1=> 0(3n)
= 2T(n-1) + n=> 0(n2n)
= 2T(n-1) + log n=> 0(log n.2n)

11

---

## Slide 12: Slide 12

•T(n) = T(n/2) +1 = 0 (log n)
= T(n/2) + n = 0 ( n)
= 2T(n/2) +n = 0 (n log n)

12

---

## Slide 13: Related contents can be found

Related contents can be found

Analyzing Running Time of Iterative Algorithms
https://cexpertvision.com/analyzing-running-time-of-iterative-algorithms/

Back Substitution Method
https://cexpertvision.com/back-substitution-method/

13

---

## Slide 14: Slide 14

14

Analyzing Running Time of Iterative Program Code
https://youtu.be/zcPF4ZXt5FI

Analyzing Running Time of Recursive Code using Back Substitution method
https://youtu.be/9OXy5V7jMYc

Analyzing Running Time of Recursive Code using Recursive tree Method
https://youtu.be/KPtjTsAmDn4

Video Lecture of the topic can be found at


---

<!-- FILE: 05 - Master's_Theorem.md -->

# 05 - Master's_Theorem — raw slide text (verbatim from class slides)
Source file: 05 -Master's_Theorem.pptx · 7 slides · images: slide-images/05 - Master's_Theorem/

---

## Slide 1: Master’s Theorem

Master’s Theorem

---

## Slide 2: Slide 2

The Master Theorem applies to recurrences of the following form:

T (n) = a T (n/b) +f(n) [f(n)=ϴ( nklogpn)]
T (n) = a T (n-b) +f(n) [f(n)=0( nk)]

•a ≥ 1, b > 1,k>=0 are constants and p is real number

---

## Slide 3: For Decreasing Recursive FunctionsT (n) = a T (n-b) +f(n)		[f(n)=0( nk)]a ≥ 1, b ≥ 1,k>=0 are constants and p is real number

For Decreasing Recursive Functions
T (n) = a T (n-b) +f(n) [f(n)=0( nk)]
a ≥ 1, b ≥ 1,k>=0 are constants and p is real number

Defined on value of a

Case 1 : a=1
T(n) = 0(f(n)*n) = 0(nk+1)

Case 2: a>1
T(n) = 0(f(n)*an/b) = 0(nk an/b)

---

## Slide 4: For Decreasing Recursive FunctionsT (n) = a T (n-b) +f(n)		[f(n)=0( nk)]a ≥ 1, b ≥ 1,k>=0 are constants and p is real number

For Decreasing Recursive Functions
T (n) = a T (n-b) +f(n) [f(n)=0( nk)]
a ≥ 1, b ≥ 1,k>=0 are constants and p is real number

Defined on value of a

Case 1 : a=1
T(n) = 0(f(n)*n) = 0(nk+1)

Case 2: a>1
T(n) = 0(f(n)*an/b) = 0(nk an/b)

T(n) = c + T(n-1) => 0(n)
= 1 + T(n-1)=> 0(n)
= n + T(n-1)=> 0(n2)
= n2 + T(n-1) => 0(n3)
= logn + T(n-1) => 0(nlogn)

T(n) = 2T(n-1) + c => 0(2n)
= 3T(n-1) + 1=> 0(3n)
= 2T(n-1) + n=> 0(n2n)
= 2T(n-1) + log n=> 0(log n.2n)

---

## Slide 5: Slide 5

There are 3 cases: [compare logba and k]
1.If a>bk
then T (n) = Θ(n logba ).
2. If a=bk
a)If p> -1 then T(n)= Θ(n logba logp+1 n)
b)If p= -1 then T(n)= Θ(n logba log log n)
c)If p< -1 then T(n)= Θ(n logba)

3. If a<bk
a)If p>= 0 then T(n)= Θ(nk logp n)
b)a) If p< 0 then T(n)= Θ(nk )

The Master Theorem applies to recurrences of the following form:
T (n) = a T (n/b) +ϴ( nklogpn)
a ≥ 1, b > 1,k>=0 are constants and p is real number

---

## Slide 6: Slide 6

T (n) = a T (n/b) +ϴ( nklogpn) [compare logb a and k]
1.If a>bk
then T (n) = Θ(n logb a ).
2. If a=bk
a)If p> -1 then T(n)= Θ(n logb a logp+1 n)
b)If p= -1 then T(n)= Θ(n logb a log log n)
c)If p< -1 then T(n)= Θ(n logb a)

3. If a<bk
a)If p>= 0 then T(n)= Θ(nk logp n)
b)a) If p< 0 then T(n)= Θ(nk )

1)T(n)= 4 T (n/2) + n2 [a=4, b=2, k=2, p=0]
2)T(n)= T (n/2) + n2 [a=1, b=2, k=2, p=0]
3)T(n)= 2n T (n/2) + nn [Not applicable]
4)T(n)= 14 T (n/4) + n [a=14, b=4, k=1, p=0]
5)T(n)= 2 T (n/2) + n log n [a=2, b=2, k=1, p=1]
6)T(n)= 2 T (n/2) + n / log n [a=2, b=2, k=1, p=-1]
7)T(n)= 2 T (n/4) + n0.51 [a=2, b=4, k=0.51, p=0]
8)T(n)= 0.5 T (n/2) + 1/n [a=0.5, b=2, k=-1, p=0]
9)T(n)= 6 T (n/3) + n2 log n [a=6, b=3, k=2, p=1]
10)T(n)= 64 T (n/8) - n2 log n [a=64, b=8, k=2, p=1]
11)T(n)= 7 T (n/3) + n2 [a=7, b=3, k=2, p=0]
12)T(n)= 4 T (n/2) + log n [a=4, b=2, k=0, p=1]
13)T(n)= 21/2 T (n/2) + n2 log n [a=21/2, b=2, k=2, p=1]
14)T(n)= 2 T (n/2) + n1/2 [a=2, b=2, k=1/2, p=0]

---

## Slide 7: Slide 7

Masters Theorem
https://youtu.be/d7WLeosewi8

Video Lecture of the topic can be found at


---

<!-- FILE: 06 - Insertion Sort-IUT.md -->

# 06 - Insertion Sort-IUT — raw slide text (verbatim from class slides)
Source file: 06 -Insertion Sort-IUT.pptx · 10 slides · images: slide-images/06 - Insertion Sort-IUT/

---

## Slide 1: Slide 1

Sorting

arranging elements of set into order

Solution:
Insertion Sort
Quicksort
Mergesort
Heapsort
Shellsort
Radix Sorting

---

## Slide 2: Application of Sorting

Application of Sorting

For searching on unsorted data by comparing keys, optimal solutions require (n) comparisons.

For searching on sorted data by comparing keys, optimal solutions require (log n) comparisons.

Sorting data for users

More…

---

## Slide 3: Slide 3

•Comparison based sorting:. (eg. insertion sort. merge sort, bubble sort, quick sort etc.

•Non-Comparison based sorting: ( eg. bucket sort, radix sort, counting sort etc.)

•Internal Sorting: (eg. bubble sort. insertion sort. etc.)

•External Sorting: (eg. quick sort. merge sort. etc.)

•Stable sorting: (eg. merge sort, insertion sort, bubble sort)

•Unstable sorting :(quicksort, heap sort, and selection sort)

•Adaptive Sorting : (i.e. sorted or unsorted data eg. bubble sort, insertion sort, quick sort etc)

•Non-Adaptive Sorting : (eg. selection sort, merge sort, heap sort etc.)

•In-place/Outplace technique – (eg. in comparison based techniques mentioned above only merge sort is outplaced. Among the non-comparison based techniques mentioned above all are outplaced techniques.

---

## Slide 4: Slide 4

Insertion Sort

---

## Slide 5: Insertion Sort

Insertion Sort

Strategy: Insertion of an element in proper order:
Begin with a sequence E of n elements in arbitrary order
Initially assume the sorted segment contains first element

Let x be the next element to be inserted in sorted segment, pull x “out of the way”, leaving a vacancy

repeatedly compare x to the element just to the left of the vacancy, and as long as x is smaller, move that element into the vacancy,

else put x in the vacancy,

repeat the next element that has not yet examined.

---

## Slide 6: Insertion Sort

Insertion Sort

2026-10-19

6

---

## Slide 7: Slide 7

Insertion Sort (A)
for j=2 to A.length
key = A[j]
//insert A[j] into sorted sequence A[1..j-1]
i=j-1
while (i>0 and A[i] > key )
A[i+1] =A [i]
i=i-1
A[i+1]= key

---

## Slide 8: Insertion Sort: Analysis

Insertion Sort: Analysis

Worst-Case Complexity
W(n) = O(n2)
When the elements are in reversed order

Best Case
W(n) = Omega(n)
When the elements are already sorted in ascending order

Analysis [no of comparisons/movement ]

F(n) = 1 + 2 + 3 + ………(n-3) +(n-2)+ (n-1)
= n (n-1 ) / 2
= O (n2 )

---

## Slide 9: Slide 9

Improvement Analysis
(by reducing number of comparisons and movement)

Reduce number of Comparison
Apply binary search

Reduce number of Movement
-Implement doubly linked list

cannot make total running time better than O(n2)

---

## Slide 10: Slide 10

Insertion Sort Analysis
https://youtu.be/jikkNiuR2CQ

Video Lecture of the topic can be found at


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


---

<!-- FILE: 11 - Amortized Analysis.md -->

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


---

<!-- FILE: 12 - RED BLACK TREES.md -->

# 12 - RED BLACK TREES — raw slide text (verbatim from class slides)
Source file: 12 -RED BLACK TREES.pptx · 27 slides · images: slide-images/12 - RED BLACK TREES/

---

## Slide 1: RED BLACK TREES RB-Trees

RED BLACK TREES
RB-Trees

---

## Slide 2: Slide 2

Red Black Tree is a type of self balancing binary search tree

•It is invented in 1972 by Rudolf Bayer who called it “symmetric binary B-Trees”

•Each node of this tree has an extra attribute ‘color’ which can be RED or BLACK

•Coloring of nodes ensures that longest path from root to a leaf is no longer then twice the length of a shortest path which means the tree is balanced

---

## Slide 3: Slide 3

Parameter
AVL Tree
R-B tree

Balance Factor
AVL trees are more strictly balanced compared to RB trees.
In AVL trees, the balance factor (the height difference between the left and right subtrees) of every node is restricted to be at most 1, ensuring a height-balanced tree.

RB trees have less strict balance requirements.
They ensure that the tree remains approximately balanced by coloring the nodes (red or black) and enforcing several properties.

Insertion and Deletion

Insertions and deletions in AVL trees typically require more rotations, which can make them slower for these operations.

Balancing an AVL tree can take multiple rotations in some cases.

RB trees require fewer rotations during insertion and deletion, making them more efficient for dynamic datasets where elements are frequently added or removed.

RB trees are considered more practical for use in databases and file systems where there are many insertions and deletions.

AVL Vs RB Tree

---

## Slide 4: Slide 4

Parameter
AVL Tree
R-B tree

Performance Considerations
AVL trees are well-suited for scenarios where read operations significantly outnumber write operations, as their read performance is generally better due to their stricter balance criteria.

RB trees are preferred when the dataset is more dynamic, and there are frequent insertions and deletions. Their performance is often better in situations with a mix of read and write operations, and they are commonly used in real-time systems.

Code Complexity

AVL trees tend to have more complex code for maintaining balance, which can lead to larger codebases and potentially more room for bugs.

RB trees are usually easier to implement, maintain, and debug due to their simpler balance maintenance.

AVL Vs RB Tree

---

## Slide 5: Slide 5

AVL Vs RB Vs B-Tree

---

## Slide 6: Properties of RB Tree

Properties of RB Tree

1.Root is always black

2.Nil is considered to be black which means that every non-Nil node has two children

3.Black Children Rule: children of each red node are black

4.Black Height Rule: For each node v, there exist an integer bh(v) such that each downward path from v to a nil has exactly bh(v) black real(ie non nill) nodes.

---

## Slide 7: Ex- RB Tree

Ex- RB Tree

---

## Slide 8: Rotations 

Rotations

A C
B
C
A B

The rotations do not break BST- property
The order (AxByC is preserved)

x

y

x

Left Rotate (T, x)

Right Rotate (T, x)

y

---

## Slide 9: Insertion 

Insertion

---

## Slide 10: The type of discrepancy is determined by the location of the node with respect to its grand parent, and the colorof the sibling of the parent

The type of discrepancy is determined by

➔the location of the node with respect to its grand parent, and

➔ the color of the sibling of the parent

---

## Slide 11: 1. where the parent sibling (uncle) is red: fixed by changing color2 where the parent sibling (uncle) is black : fixed by rotations

1. where the parent sibling (uncle) is red :
fixed by changing color

2 where the parent sibling (uncle) is black :
fixed by rotations

(note: at most one rotation is sufficient for fixing the problem)

Discrepancies

---

## Slide 12: Slide 12

(no text — image/graph only, see image)

---

## Slide 13: Slide 13

(no text — image/graph only, see image)

---

## Slide 14: Slide 14

(no text — image/graph only, see image)

---

## Slide 15: Slide 15

(no text — image/graph only, see image)

---

## Slide 16: Slide 16

1) Perform standard BST insertion and make the color of newly inserted nodes as RED.
2) If x is root, change color of x as BLACK
3) Do following if color of x’s parent is not BLACK or x is not root.
a) If x’s uncle is RED (case1)
(i) Change color of parent and uncle as BLACK.
(ii) color of grand parent as RED.
(iii) Change x = x’s grandparent, repeat steps 2 and 3 for new x.

Understanding Insertion
Let x be the newly inserted node.

---

## Slide 17: Slide 17

i) Left Left Case (p is left child of g and x is left child of p)

ii) Left Right Case (p is left child of g and x is right child of p)

iii) Right Right Case (Mirror case i)

iv) Right Left Case (Mirror case ii)

b) If x’s uncle is BLACK,
then there can be four configurations for x, x’s parent (p) and x’s grandparent (g)

---

## Slide 18: Inserting a new node

Inserting a new node

1.Change Color of Grand Parent of New Node
2.Change Color of Parent and Uncle of New Node
3.Grandparent will be marked as New Node

Strategy to resolve :
CHANGE COLOR

---

## Slide 19: Slide 19

Strategy to resolve :
ROTATION

✓Anti Clockwise Rotation at Parent Node

✓Make Parent as New Node

---

## Slide 20: Slide 20

Strategy to resolve :
ROTATION

Anti Clockwise Rotation at Parent Node
Make Parent as New Node

---

## Slide 21: Case 3 

Case 3

Strategy to resolve :
ROTATION & COLOR CHANGE

✓Clockwise Rotation at GrandParent Node

✓Exchange Color of GrandParent and Parent

---

## Slide 22: Case 3 

Case 3

BLACK

RED

---

## Slide 23: Example 

Example

---

## Slide 24: Slide 24

Insert 4

Case-1

Anti Clockwise Rotation at Parent Node
Make Parent as New Node

Change Color of Grand Parent of New Node
Change Color of Parent and Uncle of New Node
Grandparent will be marked as New Node

Case-2

x

Case-3

x

Clockwise Rotation at GrandParent Node
Exchange Color of GrandParent and Parent

---

## Slide 25: Slide 25

Insert following nodes in an empty RB Tree

•41, 38,31, 12, 19, 8

•5, 10, 15, 25, 20, 30

---

## Slide 26: Slide 26

Exercises
-1 Draw the complete binary search tree of height 3 on the keys {1, 2, . . . , 15}. Add the NIL leaves and color the nodes in three different ways such that the black-heights of the resulting red-black trees are 2, 3, and 4.

-2 Suppose that the root of a red-black tree is red. If we make it black, does the tree remain a red-black tree?

---

## Slide 27: Video Lecture of the topic can be found at

Red Black Tree and Insertion
https://www.youtube.com/watch?v=H0MutN9u-Ik

Understanding RB Tree Deletion cases with an Example
https://youtu.be/1qEjtfR0gIo

How To Perform Search & Insert Operation In Binary Search Tree (BST)
https://www.youtube.com/watch?v=smE0gHcd5Gg

Video Lecture of the topic can be found at


---

<!-- FILE: 13 - RB Tree Deletion.md -->

# 13 - RB Tree Deletion — raw slide text (verbatim from class slides)
Source file: 13 -RB Tree Deletion.pptx · 20 slides · images: slide-images/13 - RB Tree Deletion/

---

## Slide 1: RB Tree Deletion

RB Tree Deletion

---

## Slide 2: Slide 2

Node Deletion
in
Binary Search Tree

---

## Slide 3: Deletion from Binary Search Tree

Deletion from Binary Search Tree

Case 1: Deleting a Node that has No Children

If we have to delete node 78,
we can simply remove this node without any issue.
This is the simplest case of deletion

---

## Slide 4: Slide 4

Case 2: Deleting a Node with One Child

the node’s child is set as the child of the node’s parent.
In other words, replace the node with its child.

❑if the node is the left child of its parent, the node’s child becomes the left child of the node’s parent.
❑if the node is the right child of its parent, the node’s child becomes the right child of the node’s parent.

Deletion of node 54

---

## Slide 5: Slide 5

Case 3: Deleting a Node with Two Children

Replace the node’s value with its
in-order predecessor (largest value in the left sub-tree) or
in-order successor (smallest value in the right sub-tree).

Using in-order predecessor in the above case.

deletion of node with value 56.

---

## Slide 6: Algorithm for Deletion

Algorithm for Deletion

---

## Slide 7: Example-BST Deletion

Example- BST Deletion

---

## Slide 8: Slide 8

Case 3(1) If root node is DB, => remove DB [Terminal]

Case 3(2) – If DB sibling is RED (also has BLACK parent)
➔ swap colors of PARENT and its SIBLING
➔ rotate PARENT in DB direction
➔ reapply cases

Case 3(3) - If DB’s sibling is BLACK and both of its children are BLACK
➔Remove DB (node)
= => Add extra black to its parent
=====> if parent is RED, then make it BLACK
======> if parent is BLACK, then make it double BLACK
 Make sibling RED
➔ If stillDB exists, apply other cases.

Case 3(4) – DB’s sibling is BLACK, check sibling child's who is far from DB is BLACK but near child to DB is RED
➔Swap color of DB’s sibling & siblings child who is near to DB
➔Rotate sibling in opposite direction to DB
➔Apply case 6

Case 3(5) – DB’s sibling is BLACK and far child is RED [Terminal]
➔Swap color of PARENT & SIBLING
➔Rotate PARENT in DB’s direction
➔Remove DB
➔Change color of RED child(far) to BLACK

Step 1 - Perform BST deletion
Step 2
Case 1-If node to be deleted is RED => just delete it [Terminal]
Case 2-If node to be deleted is BLACK but has RED child
=> Replace node with child and color it with BLACK
Or if the Node to be deleted is BLACK & has RED parent => swap the color of Parent & Sibling (terminal)

[if node to be deleted is black , it will be replaced by Double Black DB]

RB Tree Deletion

---

## Slide 9: RB tree Deletion

RB tree Deletion

Construct a tree as follows
49, 28, 58, 14, 30, 52, 67, 63, 75, 79

Perform the following deletion
52, 28, 79, 75, 49, 30, 14

---

## Slide 10: RB tree Deletion

RB tree Deletion

Construct a tree as follows
49, 28, 58, 14, 30, 52, 67, 63, 75, 79

Perform the following deletion
52, 28, 79, 75, 49, 30, 14

---

## Slide 11: Slide 11

Perform the following deletion
52, 28, 79, 75, 49, 30, 14

---

## Slide 12: Slide 12

Case 3(1) If root node is DB, => remove DB [Terminal]

Case 3(2) – If DB sibling is RED (also has BLACK parent)
➔ swap colors of PARENT and its SIBLING
➔ rotate PARENT in DB direction
➔ reapply cases

Case 3(3) - If DB’s sibling is BLACK and both of its children are BLACK
➔Remove DB
= => Add extra black to its parent
=====> if parent is RED, then make it BLACK
======> if parent is BLACK, then make it double BLACK
 Make sibling RED
➔ If stillDB exists, apply other cases.

Step 1 - Perform BST deletion
Step 2
Case 1-If node to be deleted is RED => just delete it [Terminal]
Case 2-If node to be deleted is BLACK but has RED child
=> Replace node with child and color it with BLACK

Or if the Node to be deleted is BLACK & has RED parent => swap the color of Parent & Sibling (terminal)

RB Tree Deletion

52, 28, 79, 75, 49, 30, 14

Case 3(4) – DB’s sibling is BLACK, check sibling child's who is far from DB is BLACK
but near child to DB is RED
➔Swap color of DB’s sibling & siblings child who is near to DB
➔Rotate sibling in opposite direction to DB
➔Apply case 3(5)

Case 3(5) – DB’s sibling is BLACK and far child is RED [Terminal]
➔Swap color of PARENT & SIBLING
➔Rotate PARENT in DB’s direction
➔Remove DB
➔Change color of RED child(far) to BLACK

---

## Slide 13: Slide 13

Delete 30, 45, 10, 12, 35

---

## Slide 14: Slide 14

Case 3(1) If root node is DB, => remove DB [Terminal]

Case 3(2) – If DB sibling is RED (also has BLACK parent)
➔ swap colors of PARENT and its SIBLING
➔ rotate PARENT in DB direction
➔ reapply cases

Case 3(3) - If DB’s sibling is BLACK and both of its children are BLACK
➔Remove DB
= => Add extra black to its parent
=====> if parent is RED, then make it BLACK
======> if parent is BLACK, then make it double BLACK
 Make sibling RED
➔ If stillDB exists, apply other cases.

Step 1 - Perform BST deletion
Step 2
Case 1-If node to be deleted is RED => just delete it [Terminal]
Case 2-If node to be deleted is BLACK but has RED child
=> Replace node with child and color it with BLACK
Or if the Node to be deleted is BLACK & has RED parent => swap the color of Parent & Sibling (terminal)

RB Tree Deletion

Case 3(4) – DB’s sibling is BLACK, check sibling child's who is far from DB is BLACK
but near child to DB is RED
➔Swap color of DB’s sibling & siblings child who is near to DB
➔Rotate sibling in opposite direction to DB
➔Apply case 3(5)

Case 3(5) – DB’s sibling is BLACK and far child is RED [Terminal]
➔Swap color of PARENT & SIBLING
➔Rotate PARENT in DB’s direction
➔Remove DB
➔Change color of RED child(far) to BLACK

Delete 30, 45, 10, 12, 35

---

## Slide 15: Slide 15

Case 3(1) If root node is DB, => remove DB [Terminal]

Case 3(2) – If DB sibling is RED (also has BLACK parent)
➔ swap colors of PARENT and its SIBLING
➔ rotate PARENT in DB direction
➔ reapply cases

Case 3(3) - If DB’s sibling is BLACK and both of its children are BLACK
➔Remove DB
= => Add extra black to its parent
=====> if parent is RED, then make it BLACK
======> if parent is BLACK, then make it double BLACK
 Make sibling RED
➔ If stillDB exists, apply other cases.

Step 1 - Perform BST deletion
Step 2
Case 1-If node to be deleted is RED => just delete it [Terminal]
Case 2-If node to be deleted is BLACK but has RED child
=> Replace node with child and color it with BLACK
Or if the Node to be deleted is BLACK & has RED parent => swap the color of Parent & Sibling (terminal)

[if node to be deleted is black , it will be replaced by Double Black DB]

RB Tree Deletion

Delete 30, 45, 10, 12, 35

Case 3(4) – DB’s sibling is BLACK, check sibling child's who is far from DB is BLACK but near child to DB is RED
➔Swap color of DB’s sibling & siblings child who is near to DB
➔Rotate sibling in opposite direction to DB
➔Apply case 6

Case 3(5) – DB’s sibling is BLACK and far child is RED [Terminal]
➔Swap color of PARENT & SIBLING
➔Rotate PARENT in DB’s direction
➔Remove DB
➔Change color of RED child(far) to BLACK

---

## Slide 16: Delete      9, 3, 4, 10, 13, 2

Delete 9, 3, 4, 10, 13, 2

---

## Slide 17: Slide 17

Case 3(1) If root node is DB, => remove DB [Terminal]

Case 3(2) – If DB sibling is RED (also has BLACK parent)
➔ swap colors of PARENT and its SIBLING
➔ rotate PARENT in DB direction
➔ reapply cases

Case 3(3) - If DB’s sibling is BLACK and both of its children are BLACK
➔Remove DB
= => Add extra black to its parent
=====> if parent is RED, then make it BLACK
======> if parent is BLACK, then make it double BLACK
 Make sibling RED
➔ If stillDB exists, apply other cases.

Step 1 - Perform BST deletion
Step 2
Case 1-If node to be deleted is RED => just delete it [Terminal]
Case 2-If node to be deleted is BLACK but has RED child
=> Replace node with child and color it with BLACK
Or if the Node to be deleted is BLACK & has RED parent => swap the color of Parent & Sibling (terminal)

RB Tree Deletion

Case 3(4) – DB’s sibling is BLACK, check sibling child's who is far from DB is BLACK
but near child to DB is RED
➔Swap color of DB’s sibling & siblings child who is near to DB
➔Rotate sibling in opposite direction to DB
➔Apply case 3(5)

Case 3(5) – DB’s sibling is BLACK and far child is RED [Terminal]
➔Swap color of PARENT & SIBLING
➔Rotate PARENT in DB’s direction
➔Remove DB
➔Change color of RED child(far) to BLACK

Delete 9, 3, 4, 10, 13, 2

---

## Slide 18: Delete      9, 3, 4, 10, 13, 2

Case 3(1) If root node is DB, => remove DB [Terminal]

Case 3(2) – If DB sibling is RED (also has BLACK parent)
➔ swap colors of PARENT and its SIBLING
➔ rotate PARENT in DB direction
➔ reapply cases

Case 3(3) - If DB’s sibling is BLACK and both of its children are BLACK
➔Remove DB
= => Add extra black to its parent
=====> if parent is RED, then make it BLACK
======> if parent is BLACK, then make it double BLACK
 Make sibling RED
➔ If stillDB exists, apply other cases.

Step 1 - Perform BST deletion
Step 2
Case 1-If node to be deleted is RED => just delete it [Terminal]
Case 2-If node to be deleted is BLACK but has RED child
=> Replace node with child and color it with BLACK
Or if the Node to be deleted is BLACK & has RED parent => swap the color of Parent & Sibling (terminal)

[if node to be deleted is black , it will be replaced by Double Black DB]

RB Tree Deletion

Delete 9, 3, 4, 10, 13, 2

Case 3(4) – DB’s sibling is BLACK, check sibling child's who is far from DB is BLACK but near child to DB is RED
➔Swap color of DB’s sibling & siblings child who is near to DB
➔Rotate sibling in opposite direction to DB
➔Apply case 6

Case 3(5) – DB’s sibling is BLACK and far child is RED [Terminal]
➔Swap color of PARENT & SIBLING
➔Rotate PARENT in DB’s direction
➔Remove DB
➔Change color of RED child(far) to BLACK

---

## Slide 19: Slide 19

(no text — image/graph only, see image)

---

## Slide 20: Video Lecture of the topic can be found at

How to Delete Node in Binary Search Tree (BST)
https://www.youtube.com/watch?v=ad1KFYHZyMc

Red Black Tree and Insertion Operation
https://www.youtube.com/watch?v=H0MutN9u-Ik

Understanding RB Tree Deletion cases with an Example
https://youtu.be/1qEjtfR0gIo

RB Tree Deletion Example No.2
https://youtu.be/MjlQo2vRAnI

RB Tree Deletion Example No.3
https://youtu.be/vVRo_WagRLQ

Video Lecture of the topic can be found at
