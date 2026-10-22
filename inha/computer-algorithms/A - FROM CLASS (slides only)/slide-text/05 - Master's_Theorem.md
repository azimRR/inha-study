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
