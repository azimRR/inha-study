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
