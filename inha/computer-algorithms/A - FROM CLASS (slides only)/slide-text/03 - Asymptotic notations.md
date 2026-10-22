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
