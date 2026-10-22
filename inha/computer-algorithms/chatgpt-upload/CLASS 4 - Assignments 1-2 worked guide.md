# CLASS material - assignments



---

<!-- FILE: Assignments 1-2 - worked study guide (class material).md -->

# Assignments 1–2: worked study guide (CLASS MATERIAL ONLY)

> **Course:** SOC3030-003 Computer Algorithm, Inha University in Tashkent, Prof. Seth Ashish, Fall 2026. The assignment sheets print the course as "Computer Algorithms (CIE3090)".
> **Weights:** midterm 25% (week 8, 24–30 Oct 2026). Assignments 30%, all handwritten. A1 was graded **4.25 / 5** (breakdown 0.25 + 0.25 + 0.5 + 0.5 + 0.75 + 0.75 + 0.75 + 0.5). The A2 deadline has passed, and the professor has published a sample solution.
> **Sources (Track A only):**
> - the two assignment sheets (.docx files; the .txt exports lost every superscript);
> - the professor's A2 sample solution (PDF);
> - the 13 class decks: slide text, slide images, and the speaker notes stored inside the original .pptx files.
>
> No web and no textbook. Anything the slides don't cover gets a 🔎 pointer to Track B.
> **Verified:** two Python scripts recomputed every number, table row, closed form and trace in this guide. The scripts follow the slide pseudo-code. Of 57 checks, 53 pass. The other 4 are checks on the sample solution's margin labels, and they fail because those labels are wrong (see §2.4). Every array and final answer in the sample is correct.

**Legend**

| Mark | Meaning |
|---|---|
| [D03-S10] | Deck 03, the "## Slide 10" heading in `slide-text/03 - Asymptotic notations.md` |
| [D03-S11 notes] | The professor's speaker notes for that slide. They are inside the original .pptx but not in the slide-text export. |
| ✅ | Re-checked by script |
| ⚠️ | An error or slip in the professor's material, followed by the correct version |
| ℹ️ | A note that is not an error |
| 🪤 | Trap: an easy way to lose the mark |
| ✍️ | What to write on the sheet (the answer format) |
| 🔎 | Not covered by the slides. Look it up in Track B. |

**Conventions.** `log` means log₂. `x^y` means x to the power y. The slides write big-O with the digit zero ("0(n)"). Heap questions use **0-based** indices. Quicksort and merge-sort questions use **1-based** indices, exactly as on the sheets.

**Contents**
1. [Assignment #1: asymptotic notation and recurrences](#1-assignment-1-asymptotic-notation-and-recurrences-graded-425--5)
2. [Assignment #2: sorting, checked against the professor's sample solution](#2-assignment-2-sorting-checked-against-the-professors-sample-solution)
3. [What these assignments tell us about the midterm](#3-what-these-assignments-tell-us-about-the-midterm)
4. [Eight new practice questions with verified answers](#4-eight-new-practice-questions-same-styles-with-verified-answers)

---

## 1. Assignment #1: asymptotic notation and recurrences (graded 4.25 / 5)

**Sheet rules.** Due 29 Sep 2026, 23:30 (Tuesday). You print the sheet and solve the questions by hand **on that sheet only**, then upload a scan to eclass. *"Submissions not conforming to the given format will not be evaluated."* Copying gives zero marks.

ℹ️ **Transcription note.** The .txt export shows "f(n) = n2 + 2n" and "8n3". The .docx, which is the printed sheet, has the superscripts: **f(n) = n² + 2ⁿ** and **8n³**. This guide solves the .docx version.
(If your printed copy really said n² + 2n, the answer would be O(n²) with c = 3, n₀ = 1, and Ω(n²) with c = 1, n₀ = 1 ✅.)

### 1.0 Answers at a glance

| Part | Question | Answer |
|---|---|---|
| Q1(i) | f(n) = 8n³ + 6n + 8 | **O(n³)** with c = 9, n₀ = 3. **Ω(n³)** with c = 8, n₀ = 1. |
| Q1(ii) | f(n) = n² + 2ⁿ | **O(2ⁿ)** with c = 2, n₀ = 4. **Ω(2ⁿ)** with c = 1, n₀ = 1. |
| Q2 | f = 10n³ + 2n² + 3, g = n³ | f = o(g)? **Incorrect.** f = Ω(g)? **Correct** (c = 10, n₀ = 1). |
| Q3a | T(n) = 4T(n/2) + n² | a = 4, b = 2, k = 2, p = 0. **Case 2(a)**, so **Θ(n² log n)**. |
| Q3b | T(n) = 2T(n/2) + n log n | a = 2, b = 2, k = 1, p = 1. **Case 2(a)**, so **Θ(n log² n)**. |
| Q4(i) | T(n) = 2T(n/2) + n, T(1) = 1 | T(n) = n log n + n = **Θ(n log n)** |
| Q4(ii) | T(n) = 2T(n−1) + 1, T(1) = 1 | T(n) = 2ⁿ − 1 = **Θ(2ⁿ)** |

### 1.1 Q1: find O and Ω, showing how c and n₀ are found

**Question (transcribed).**
> Q1. For following functions (Show the steps to evaluate value of c and n₀)
> Find the O-notation. | Find the big omega-notation.
> • f(n) = 8n³ + 6n + 8
> • f(n) = n² + 2ⁿ

**Skill tested.** This question tests three things:
- applying the **formal definitions** of O and Ω;
- choosing g(n) as the highest-order term;
- producing **explicit constants c and n₀** and showing that the inequality holds for **every** n ≥ n₀.

The second function also tests whether you know that an exponential term beats any polynomial term.

**Method from class.**
- **O(g(n))** is the set of f(n) for which there exist positive constants c and n₀ such that 0 ≤ f(n) ≤ c·g(n) for all n ≥ n₀ [D03-S10].
- **Ω(g(n))** is the set of f(n) for which there exist positive constants c and n₀ such that 0 ≤ c·g(n) ≤ f(n) for all n ≥ n₀ [D03-S12].
- To choose g, keep only the highest-order term [D03-S8]. *"To compare orders of growth, look at the leading term"* [D03-S15].
- Make the upper constant "a little bigger" than the leading coefficient and the lower constant "a little smaller" [D03-S15].
- Many (c, n₀) pairs are correct. The professor's notes add a preference: *"a smaller (c) with a reasonable (n) is generally preferred"* for O, and *"in Big-Omega … a larger (c) is generally preferred"* [D03-S11 notes].
- You may add inequalities, chain them (transitivity) and multiply both sides by a positive number [D01-S23].
- The class drills of this exact type are D03-S22 ("Find the big oh") and D03-S24 ("Find the big Omega"). Both include 2ⁿ-type functions such as 2ⁿ + 6n² + 3n.

#### (i) f(n) = 8n³ + 6n + 8. The leading term is 8n³, so g(n) = n³.

**O-notation**
1. We want 8n³ + 6n + 8 ≤ c·n³.
2. Take c = 9, one more than the leading coefficient 8. Subtracting 8n³ from both sides, we need **6n + 8 ≤ n³**.
3. Test values of n:

   | n | 6n + 8 | n³ | holds? |
   |---|---|---|---|
   | 1 | 14 | 1 | ✗ |
   | 2 | 20 | 8 | ✗ |
   | 3 | 26 | 27 | ✓ |
   | 4 | 32 | 64 | ✓ |

4. It stays true for every n ≥ 3. For n ≥ 3 we have n³ = n²·n ≥ 9n, and 9n = 6n + 3n ≥ 6n + 9, which is greater than 6n + 8.
5. **f(n) = O(n³) with c = 9, n₀ = 3** ✅.

A shortcut that needs no table: for n ≥ 1, each lower term is at most a multiple of n³ (n ≤ n³ and 1 ≤ n³). So 8n³ + 6n + 8 ≤ 8n³ + 6n³ + 8n³ = 22n³, which gives c = 22, n₀ = 1 ✅. This is also correct, but the c is looser [D03-S11 notes].

**Ω-notation**
1. We want c·n³ ≤ 8n³ + 6n + 8.
2. Take c = 8. Then 8n³ ≤ 8n³ + 6n + 8 because 6n + 8 > 0, so it holds for every n ≥ 1.
3. **f(n) = Ω(n³) with c = 8, n₀ = 1** ✅.

c = 8 is the largest constant that keeps working: f(n)/n³ = 8 + 6/n² + 8/n³ falls toward 8 from above. The professor prefers the largest c for Ω. A smaller constant such as c = 7 is also correct ✅.

Since f is both O(n³) and Ω(n³), **f(n) = Θ(n³)** [D03-S17].

#### (ii) f(n) = n² + 2ⁿ. The fastest-growing term is 2ⁿ, so g(n) = 2ⁿ.

**O-notation**
1. We want n² + 2ⁿ ≤ c·2ⁿ.
2. Take c = 2. Subtracting 2ⁿ from both sides, we need **n² ≤ 2ⁿ**.
3. Test values of n:

   | n | n² | 2ⁿ | n² ≤ 2ⁿ? |
   |---|---|---|---|
   | 1 | 1 | 2 | ✓ |
   | 2 | 4 | 4 | ✓ |
   | **3** | **9** | **8** | **✗** 🪤 |
   | 4 | 16 | 16 | ✓ |
   | 5 | 25 | 32 | ✓ |
   | 6 | 36 | 64 | ✓ |

4. 🪤 The inequality is true at n = 1 and n = 2 but **fails at n = 3**. Because n₀ must work for every n ≥ n₀, the answer is **n₀ = 4**, not 1.
5. It stays true from n = 4 onward. Each step from n to n + 1 doubles 2ⁿ, but multiplies n² by only ((n+1)/n)² ≤ (5/4)² ≈ 1.56, which is less than 2 ✅.
6. **f(n) = O(2ⁿ) with c = 2, n₀ = 4** ✅.

There is an alternative pair. With c = 3 you need n² ≤ 2·2ⁿ, which holds for every n ≥ 1 (1 ≤ 4, 4 ≤ 8, 9 ≤ 16, …). That gives c = 3, n₀ = 1 ✅: a larger c but a smaller n₀.

**Ω-notation**
1. We want c·2ⁿ ≤ n² + 2ⁿ.
2. Take c = 1. Then 2ⁿ ≤ n² + 2ⁿ because n² ≥ 0.
3. **f(n) = Ω(2ⁿ) with c = 1, n₀ = 1** ✅. This is the largest c that keeps working, because f(n)/2ⁿ = 1 + n²/2ⁿ is always above 1 and gets closer to 1 as n grows.

Since f is both O(2ⁿ) and Ω(2ⁿ), **f(n) = Θ(2ⁿ)**.

✍️ **On the sheet** (the sheet has two columns, O on the left and Ω on the right):

| f(n) | Find the O-notation | Find the big omega-notation |
|---|---|---|
| 8n³ + 6n + 8 | 8n³+6n+8 ≤ 9n³ ⇔ 6n+8 ≤ n³. This holds for n ≥ 3 (table). **O(n³), c = 9, n₀ = 3** | 8n³ ≤ 8n³+6n+8 ∀n ≥ 1. **Ω(n³), c = 8, n₀ = 1** |
| n² + 2ⁿ | n²+2ⁿ ≤ 2·2ⁿ ⇔ n² ≤ 2ⁿ. This fails at n = 3 and holds for n ≥ 4. **O(2ⁿ), c = 2, n₀ = 4** | 2ⁿ ≤ n²+2ⁿ ∀n ≥ 1. **Ω(2ⁿ), c = 1, n₀ = 1** |

### 1.2 Q2: check whether the bounds are correct

**Question (transcribed).**
> Q2 Comment on the following (check bounds are correct or incorrect)
> Given f(n) = 10n³ + 2n² + 3 and g(n) = n³
> • Is f(n) = o g(n)? [o is small oh]
> • Is f(n) = Ω g(n)? [Ω is big omega]

**Skill tested.** This question tests two things:
- reading each notation as a **comparison of growth rates**;
- deciding whether a stated bound is correct or incorrect, and backing a "correct" verdict with c and n₀.

**Method from class.**
- *Comparison of functions* [D03-S19]: compare f with g the way you compare two numbers a and b.
  - O ≈ a ≤ b
  - Ω ≈ a ≥ b
  - Θ ≈ a = b
  - **o ≈ a < b** (strictly smaller)
  - ω ≈ a > b
- Find the order of f from its leading term [D03-S15]. Then use f = Θ(g) ⇔ f = O(g) and f = Ω(g) [D03-S17].
- "Incorrect bounds" drills: D03-S23 (O), D03-S25 (Ω), D03-S27 (Θ).

**Step 1.** The leading term of f is 10n³, so f(n) = Θ(n³). Compared with g(n) = n³, this is the **"a = b"** situation.

**(a) Is f(n) = o(g(n))? INCORRECT.**
- o means f grows **strictly slower** than g ("a < b") [D03-S19]. Here f and g grow at the same rate (both are n³), which is the "a = b" case.
- The correct statement is f(n) = Θ(g(n)), and therefore also O(g(n)).
- Sanity check with numbers ✅: f(n)/g(n) = 15, 10.203, 10.020, 10.002 at n = 1, 10, 100, 1000. The ratio settles at 10 and never shrinks toward 0. For example, f(n) < 10·g(n) is false for every n ≥ 1.
- 🔎 Look up in Track B: the formal definition of little-o, which must hold *for every* c > 0. You need it only if you are asked to prove an o-bound with constants. The slides give only the "a < b" comparison.

**(b) Is f(n) = Ω(g(n))? CORRECT.**
- 10n³ + 2n² + 3 ≥ 10·n³ for all n ≥ 1, because 2n² + 3 > 0. So **c = 10, n₀ = 1** satisfies the Ω definition [D03-S12] ✅. (c = 10 is the largest constant that keeps working.)
- In fact f is also O(n³), for example with c = 11, n₀ = 3 ✅. So f = Θ(n³) [D03-S17].

✍️ **On the sheet:**
- "f = o(g): **incorrect**. Both are of order n³ (f = Θ(n³)), and small-o needs a strictly lower order."
- "f = Ω(g): **correct**. 10n³ + 2n² + 3 ≥ 10n³ for all n ≥ 1, so c = 10, n₀ = 1. In fact f = Θ(g)."

### 1.3 Q3: Master's theorem with the [a, b, k, p] boxes

**Question (transcribed).**
> Q3. Solving Recurrence Equation using Masters Theorem
> 3a. T(n) = 4T(n/2) + n²  [a = ___, b = ___, k = ___, p = ___]  Case = ___  Ans = ___
> 3b. T(n) = 2T(n/2) + n log n  [a = ___, b = ___, k = ___, p = ___]  Case = ___  Ans = ___

**Skill tested.** You must match the recurrence to the class form T(n) = aT(n/b) + Θ(n^k log^p n), read off a, b, k and p, compare a with b^k, and apply the right case and sub-case. Both recurrences are **examples #1 and #5 of the list on D05-S6, word for word**, and the slide shows the same a, b, k, p values.

**Method from class** [D05-S2, D05-S5, D05-S6]. The conditions are a ≥ 1, b > 1, k ≥ 0, and p is any real number. Compare a with b^k (the slide says "compare log_b a and k", which is the same test):

| Case | Condition | Result |
|---|---|---|
| 1 | a > b^k | Θ(n^(log_b a)) |
| 2(a) | a = b^k and p > −1 | Θ(n^(log_b a) · log^(p+1) n) |
| 2(b) | a = b^k and p = −1 | Θ(n^(log_b a) · log log n) |
| 2(c) | a = b^k and p < −1 | Θ(n^(log_b a)) |
| 3(a) | a < b^k and p ≥ 0 | Θ(n^k · log^p n) |
| 3(b) | a < b^k and p < 0 | Θ(n^k) |

**3a. T(n) = 4T(n/2) + n²**
1. a = 4 and b = 2. Write f(n) = n² as n² · log⁰ n, so k = 2 and p = 0.
2. b^k = 2² = 4 = a, so this is **Case 2**. Since p = 0 > −1, it is **Case 2(a)**.
3. log_b a = log₂ 4 = 2 (log rules: [D01-S24]).
4. T(n) = Θ(n² · log^(0+1) n) = **Θ(n² log n)** ✅.

The script confirms the exact value for n = 2^m with T(1) = 1: T(n) = n²(log n + 1).

**3b. T(n) = 2T(n/2) + n log n**
1. a = 2 and b = 2. Write f(n) = n log n as n¹ · log¹ n, so k = 1 and **p = 1**.
2. b^k = 2¹ = 2 = a, so this is **Case 2**. Since p = 1 > −1, it is **Case 2(a)**.
3. log₂ 2 = 1.
4. T(n) = Θ(n¹ · log^(1+1) n) = **Θ(n log² n)** ✅.

The script confirms the exact value: T(n) = n(1 + log n (log n + 1)/2). Its ratio to n log² n tends to ½, so it is Θ(n log² n).

🪤 If you read p = 0 in 3b (ignoring the log n inside f(n)), you get Θ(n log n), which is wrong. The extra log comes from p + 1 = 2.

✍️ **On the sheet**, fill every box:
- 3a: [a = 4, b = 2, k = 2, p = 0], Case = 2(a) (a = b^k, p > −1), Ans = Θ(n² log n)
- 3b: [a = 2, b = 2, k = 1, p = 1], Case = 2(a) (a = b^k, p > −1), Ans = Θ(n log² n)

### 1.4 Q4: solve by recurrence tree

**Question (transcribed).**
> Q4. Solve recursive Equations using recurrence Tree
> • T(n) = 2T(n/2) + n for n > 1; T(n) = 1 for n = 1
> • T(n) = 2T(n−1) + 1 for n > 1; T(n) = 1 for n = 1

**Skill tested.** This is the recurrence-tree method [D04-S2]:
- draw the levels;
- write the cost of each level;
- find the height;
- add the level costs, using the series formulas [D01-S25].

Both recurrences come from the class `demo(n)` programs:
- (i) is the code on D04-S8 (a loop of n, then two calls on n/2), with the result on D04-S10 and D04-S12.
- (ii) is the code on D04-S5 (two calls on n−1), with the result on D04-S11.

#### (i) T(n) = 2T(n/2) + n, T(1) = 1

```
level 0:                  n                       level total = n
level 1:          n/2            n/2              level total = 2·(n/2) = n
level 2:       n/4   n/4      n/4   n/4           level total = 4·(n/4) = n
  ...
level i:      2^i nodes, each costs n/2^i         level total = n
  ...
leaves:       n nodes, each T(1) = 1              level total = n
```
1. **Height.** At level i the subproblem size is n/2^i. It reaches 1 when 2^i = n, that is, at i = log₂ n.
2. So there are **log n levels that each cost n** (levels 0 … log n − 1), plus the **leaf level, which costs n**.
3. **Sum.** T(n) = n·log n + n = **Θ(n log n)** ✅. For n = 8, the levels cost 8 + 8 + 8 + 8 = 32, and T(8) = 32.
4. **Cross-checks.** The slide's description is *"work is done equally at all levels"*, giving n log n [D04-S10]. The Master theorem gives a = 2, b = 2, k = 1, p = 0, so Case 2(a), so Θ(n log n) [D05-S5].

#### (ii) T(n) = 2T(n−1) + 1, T(1) = 1

```
level 0:              1                 (node T(n))           level total = 1
level 1:          1       1             (2 nodes T(n-1))      level total = 2
level 2:        1   1   1   1           (4 nodes T(n-2))      level total = 4
  ...
level i:       2^i nodes, each costs 1  (nodes T(n-i))        level total = 2^i
  ...
level n-1:     2^(n-1) leaves T(1) = 1                        level total = 2^(n-1)
```
1. **Height.** At level i the subproblem size is n − i. It reaches 1 at i = n − 1, so the tree has **n levels** (0 … n − 1). This is not log n.
2. **Sum.** T(n) = 1 + 2 + 4 + … + 2^(n−1) = Σ_{i=0}^{n−1} 2^i = **2ⁿ − 1**. This is the "power of 2" series Σ_{i=0}^{k} 2^i = 2^(k+1) − 1 [D01-S25] with k = n − 1.
3. **Answer: T(n) = 2ⁿ − 1 = Θ(2ⁿ)** ✅. For n = 4, the levels cost 1 + 2 + 4 + 8 = 15, and T(4) = 15.
4. **Cross-checks.** D04-S11 gives *"T(n) = 2T(n−1) + c ⇒ O(2ⁿ)"*. The decreasing-function Master theorem [D05-S3] applies with a = 2 > 1, b = 1 and f(n) = 1 = O(n⁰), so k = 0. It gives O(n⁰ · 2^(n/1)) = O(2ⁿ).

🪤 Two traps in (ii):
- The height is n − 1, not log n.
- The leaf level (2^(n−1)) must be included in the sum. If you stop one level early, you get 2^(n−1) − 1.

✍️ **On the sheet**, for each tree:
- draw at least three levels, the general level i, and the leaves;
- write each level's total at the side;
- state the height;
- write the sum, then the closed form, then Θ(·).

### 1.5 Skills map for A1

| Q | Skill | Class source |
|---|---|---|
| Q1 | O/Ω definitions; choosing g(n); deriving c and n₀; polynomial vs exponential growth | D03-S8, S10–S12, S15, S22, S24; D03-S11 notes; D01-S23 |
| Q2 | Meaning of o / Ω as growth comparisons; correct vs incorrect bounds | D03-S17, S19, S23, S25, S27 |
| Q3 | Extended Master theorem: read a, b, k, p, pick the case | D05-S2, S5, S6 (#1 and #5) |
| Q4 | Recurrence tree: level costs, height, series sums | D04-S2, S5, S8, S10–S12; D01-S25; cross-check D05-S3, S5 |

---

## 2. Assignment #2: sorting, checked against the professor's sample solution

**Sheet rules.** Deadline 9 Oct 2026, 23:00. Solve every question by hand on the printout, then submit a photo on eclass. Late submissions and e-mailed submissions are not accepted. *"Submissions not conforming to the given format will NOT be evaluated."*

### 2.0 Read this first: the sample solves different arrays

The sample solution PDF ("SAMPLE SOLUTION for reference"; the file metadata says it was created 4 Oct 2026) uses **different input arrays** from the A2 sheet in this folder. So you cannot compare numbers one-to-one.

This section therefore does two things for each question:
1. It summarises and checks the professor's sample.
2. It solves **your sheet's arrays** with exactly the same method and layout.

| Question (sheet wording) | Your sheet's array | Sample's array | Indices on the sheet |
|---|---|---|---|
| Q1. Convert to a Heap using Build Max Heap | 11, 19, 7, 12, 15, 30 | 12, 9, 7, 2, 15, 32 | 0 – 5 |
| Q2. Quicksort, first PARTITION only | 18, 7, 12, 15, 22, 10 | 9, 7, 2, 15, 32, 10 | 1 – 6 |
| "Q2" (really Q3). Merge sort, all steps | 19, 17, 12, 5, 20, 10 | 9, 7, 2, 15, 32, 10 | 1 – 6 |

**Answers at a glance** (all ✅):

| | Sample (professor's arrays) | Your sheet's arrays |
|---|---|---|
| Max-heap | 32, 15, 12, 2, 9, 7 | **30, 19, 11, 12, 15, 7** |
| After the first PARTITION | 9, 7, 2, **10**, 32, 15 (q = 4) | **7, 10, 12, 15, 22, 18** (q = 2) |
| Merge sort | 2, 7, 9, 10, 15, 32 | **5, 10, 12, 17, 19, 20** |

### 2.1 Q1: Build Max Heap

**Question (transcribed).**
> Q1. Convert the following sequence to a Heap using Build Max Heap
> 11, 19, 7, 12, 15, 30
>
> The sheet gives a table with column indices **0 1 2 3 4 5** and a side box labelled "Use this space for showing iterations".

**Skill tested.** You must trace BUILD-MAX-HEAP and MAX-HEAPIFY with **0-based index arithmetic**:
- loop over the non-leaf nodes from the last one back to the root;
- compute L and R;
- swap with the larger child;
- **continue heapifying at the index where the moved value landed**.

**Method from class.**
- 0-based indices: Left = 2i + 1, Right = 2i + 2, Parent = ⌈i/2⌉ − 1 [D09-S9]. The non-leaf nodes are 0 … ⌊n/2⌋ − 1, and the leaves are ⌊n/2⌋ … n − 1.
- BUILD-MAX-HEAP: *"i = floor(A.length/2) downto 1 OR i = floor(A.length/2) − 1 downto 0"*, calling MAX-HEAPIFY(A, i) each time [D09-S10].
- MAX-HEAPIFY(A, i) [D09-S10]:
  1. Set largest to whichever of A[i], A[L] (only if L exists) and A[R] (only if R exists) is biggest.
  2. If largest ≠ i, exchange A[i] ↔ A[largest] and call MAX-HEAPIFY(A, largest).
- Worked tables in exactly this layout:
  - D09-S13 (7 elements). It marks a missing child with "(X)", e.g. *"i=4, l=9, r=10 (X), Exit-heapify(A,4)"*.
  - D09-S22 (6 elements: 12, 7, 8, 23, 3, 21), with rows *"for i→2 … exit"*.

#### Professor's sample, step by step (12, 9, 7, 2, 15, 32; n = 6, so i runs 2 → 0)

| Sample row | Left margin | 0 | 1 | 2 | 3 | 4 | 5 | What happens / right margin |
|---|---|---|---|---|---|---|---|---|
| header | "For i → 2 to 0" | 12 | 9 | 7 | 2 | 15 | 32 | Right column: "Non leaf nodes, (n/2)−1 to 0" |
| i = 2 | i=2, L=5, R=6 | 12 | 9 | **32** | 2 | 15 | **7** | i at 2, L at 5. Since 7 < 32, swap A[2] ↔ A[5]. |
| i = 1 | i=1, L=3, R=4 | 12 | **15** | 32 | 2 | **9** | 7 | i at 1, L at 3, R at 4. The largest is R = 15, so swap A[1] ↔ A[4]. Right margin says "**i=3 exit**" ⚠️ |
| i = 0 | i=0, L=1, R=2 | **32** | 15 | **12** | 2 | 9 | 7 | i at 0. The largest is R = 32, so swap A[0] ↔ A[2]. |
| heapify(2) | right margin: "i=2, L=5, R=6, exit" | 32 | 15 | 12 | 2 | 9 | 7 | i at 2, L at 5. Since 12 > 7, there is no swap, so exit. |
| final (shaded) | | 32 | 15 | 12 | 2 | 9 | 7 | max-heap |

**Script check ✅.** All four array rows and the final heap are correct, and the heap property holds.

⚠️ **Slip 1: "i=3 exit" in the i = 1 row.**
- After the swap, the value 9 sits at index **4** (it was R). The recursive call is therefore MAX-HEAPIFY(A, **4**).
- There, L = 9 and R = 10, and both are ≥ n = 6, so the call exits.
- **Correct note: "i = 4, L = 9, R = 10 (X) → exit"**. This is the same style as *"i=4, l=9, r=10 (X), Exit-heapify(A,4)"* on D09-S13.
- Index 3 is where L points, not where 9 went. The final heap is unaffected, because indices 3 and 4 are both leaves. In a bigger heap, continuing at the wrong index would give a wrong heap.

ℹ️ **Not an error.** In the i = 2 row the sample writes "R = 6", but index 6 does not exist (the last index is 5). The slides mark a missing child with "(X)" [D09-S13]. Only L is compared, which the sample does correctly.

#### Same method on your sheet (11, 19, 7, 12, 15, 30)

| Row | Left margin | 0 | 1 | 2 | 3 | 4 | 5 | Right margin / action |
|---|---|---|---|---|---|---|---|---|
| start | For i → 2 to 0 ((n/2) − 1 to 0) | 11 | 19 | 7 | 12 | 15 | 30 | |
| markers | i = 2, L = 5, R = 6 (X) | | | i | | | L | 7 < 30, so swap A[2] ↔ A[5] |
| after | | 11 | 19 | **30** | 12 | 15 | **7** | heapify(5): L = 11 (X), so exit |
| markers | i = 1, L = 3, R = 4 | | i | | L | R | | 19 > 12 and 19 > 15, so no swap: exit |
| after | | 11 | 19 | 30 | 12 | 15 | 7 | (unchanged) |
| markers | i = 0, L = 1, R = 2 | i | L | R | | | | Largest is R (30), so swap A[0] ↔ A[2] |
| after | | **30** | 19 | **11** | 12 | 15 | 7 | heapify(2): L = 5, R = 6 (X). 11 > 7, so exit |
| **final** | | **30** | **19** | **11** | **12** | **15** | **7** | max-heap ✅ |

```
            30              index 0
          /    \
        19      11          indices 1, 2
       /  \    /
     12   15  7             indices 3, 4, 5
```
Check the heap property: 30 ≥ 19 and 30 ≥ 11; 19 ≥ 12 and 19 ≥ 15; 11 ≥ 7 ✅.

**✍️ Answer format the professor expects for Q1:**
- Use the sheet's table. Write the loop range as "i → 2 to 0", the non-leaf nodes, i.e. (n/2) − 1 to 0.
- For each i:
  - write "i = …, L = …, R = …" in the left margin;
  - put the markers i / L / R under the cells;
  - draw an arrow for the swap;
  - write the new array as a full row.
- Write each recursive heapify in the right margin as "i = …, L = …, R = … exit", **using the index the value moved to**.
- Shade the final heap row.

### 2.2 Q2: Quicksort, first PARTITION only

**Question (transcribed).**
> Q2. Apply Quicksort Algorithm to sort the given sequence
> (Show only steps of first PARTITION on the initial array)
> 18, 7, 12, 15, 22, 10 (column indices **1 2 3 4 5 6**)

**Skill tested.** You must trace the class PARTITION:
- pivot x = A[r];
- i starts at p − 1;
- j scans from p to r − 1, with an exchange whenever A[j] ≤ x;
- a final exchange A[i+1] ↔ A[r];
- return q = i + 1.

The sheet asks only for this one call, not the whole sort.

**Method from class.**
- QUICKSORT(A, p, r): if p < r, then q ← PARTITION(A, p, r), QUICKSORT(A, p, q − 1), QUICKSORT(A, q + 1, r) [D07-S4].
- PARTITION(A, p, r) [D07-S5]:
  ```
  x = A[r]
  i ← p − 1
  for j ← p to r − 1
      if A[j] <= x
          i ← i + 1
          exchange A[i] <-> A[j]
  exchange A[i+1] <-> A[r]
  return i + 1
  ```
- The initial call is QUICKSORT(A, 1, n), so arrays are 1-based [D07-S5].

#### Professor's sample, step by step (9, 7, 2, 15, 32, 10; p = 1, r = 6, x = 10)

| Sample row | What the sample writes | 1 | 2 | 3 | 4 | 5 | 6 | Meaning under the slide's PARTITION |
|---|---|---|---|---|---|---|---|---|
| start | "P=1 r=6, x=10, initially J=0, I=−1" ⚠️ | 9 | 7 | 2 | 15 | 32 | 10 | x = A[6] = 10. i = p − 1 = **0**, and j starts at **1**. |
| j = 1 | "A[j] < x, i = j" under column 1 | | | | | | | 9 ≤ 10, so i = 1 and A[1] ↔ A[1] (nothing moves) |
| j = 2 | "A[j] < x, i = j" under column 2 | | | | | | | 7 ≤ 10, so i = 2 (nothing moves) |
| j = 3, 4, 5 | "A[j] < x, i = j" under column 3; "j" under columns 4 and 5 | | | | | | | 2 ≤ 10, so i = 3. Then 15 > 10 and 32 > 10, so nothing happens. |
| exchange | "i" under column 4 ↔ "x" under column 6 ⚠️ | | | | | | | exchange A[i+1] = A[4] ↔ A[r] = A[6] |
| result | | 9 | 7 | 2 | **10** | 32 | 15 | pivot 10 lands at q = 4 (shaded) |

**Script check ✅.** The result 9, 7, 2, 10, 32, 15 and the pivot position q = 4 are correct.

⚠️ **Slip 2: "initially J = 0, I = −1".**
- Those are the starting values for **0-based** arrays.
- This array is indexed 1 … 6 with p = 1. The slide's PARTITION therefore starts with **i = p − 1 = 0**, and **j runs from p = 1 to r − 1 = 5** [D07-S5].
- Correct margin: "p = 1, r = 6, x = A[6] = 10, initially i = 0, j = 1".

⚠️ **Slip 3: the final exchange is labelled "i" at column 4.**
- After the loop, i = 3. The exchange is A[i+1] ↔ A[r], that is A[4] ↔ A[6], and PARTITION returns q = i + 1 = 4.
- Label that column **"i+1"**.

⚠️ **Minor: the rows say "A[j] < x".**
- The slide's test is **A[j] <= x** [D07-S5].
- Here all keys are distinct, so both tests give the same result. If a key equal to the pivot ever appears, follow the slide: ≤ sends it to the left part.

#### Same method on your sheet (18, 7, 12, 15, 22, 10)

| Row | Margin | 1 | 2 | 3 | 4 | 5 | 6 | Action |
|---|---|---|---|---|---|---|---|---|
| start | p = 1, r = 6, x = A[6] = 10, i = 0, j from 1 | 18 | 7 | 12 | 15 | 22 | 10 | |
| j = 1 | 18 ≤ 10? no | | | | | | | nothing (i = 0) |
| j = 2 | 7 ≤ 10? **yes** | **7** | **18** | 12 | 15 | 22 | 10 | i = 1, exchange A[1] ↔ A[2] |
| j = 3 | 12 ≤ 10? no | | | | | | | nothing (i = 1) |
| j = 4 | 15 ≤ 10? no | | | | | | | nothing (i = 1) |
| j = 5 | 22 ≤ 10? no | | | | | | | nothing (i = 1) |
| exchange | A[i+1] = A[2] ↔ A[r] = A[6] | 7 | **10** | 12 | 15 | 22 | **18** | return **q = 2** ✅ |

The pivot 10 is now in its final place:
- left part {7}: every value is ≤ 10;
- right part {12, 15, 22, 18}: every value is > 10.

The next calls would be QUICKSORT(A, 1, 1) and QUICKSORT(A, 3, 6), but the sheet does not ask for them.

Unlike the sample, your array has a **real exchange in the middle of the loop** (at j = 2). In the sample every in-loop exchange was A[i] ↔ A[i].

**✍️ Answer format the professor expects for Q2:**
- Use columns 1–6, as on the sheet.
- In the margin, write p, r, x = A[r], and the initial i and j.
- Add one row per j:
  - if A[j] ≤ x, write "A[j] ≤ x → i = i + 1, exchange A[i] ↔ A[j]";
  - otherwise just mark "j".
- Draw a final arrow between **i + 1** and x.
- Write the result row with the pivot highlighted.
- Stop after this first PARTITION.

### 2.3 Q3 (printed as a second "Q2"): Merge sort, all steps

**Question (transcribed).**
> Q2 [sic, this is the third question]. Apply Merge sort Algorithm to sort the given sequence
> (Show all steps)
> 19, 17, 12, 5, 20, 10 (column indices **1 2 3 4 5 6**)

**Skill tested.** You must:
- split recursively with q = ⌊(p + r)/2⌋ until every piece has one element;
- MERGE pairs of sorted lists back together;
- show every split and every merge.

**Method from class.**
- MERGESORT(A, p, r): if p < r, then q ← ⌊(p + r)/2⌋, MERGESORT(A, p, q), MERGESORT(A, q + 1, r), MERGE(A, p, q, r) [D08-S5]. The strategy is drawn on D08-S3 and D08-S4.
- MERGE: the next output item is the smaller of the two front items. The rest of the output is then the merge of what remains [D08-S6].
- The code on D08-S8 takes from the left list when L[i] <= R[j], so equal keys keep their order.
- Cost: Θ(n log n) for every input order [D08-S11].
- ⚠️ **Slide note.** The loop on D08-S8 keeps comparing L[i] with R[j] even after one list is used up, and nothing stops it running past the end. When tracing by hand, once one list is empty, copy the rest of the other list (the D08-S6 strategy). 🔎 Look up in Track B: the version of MERGE with end-of-list sentinels.

#### Professor's sample, reproduced row by row (9, 7, 2, 15, 32, 10)

| Sample row | 1 | 2 | 3 | 4 | 5 | 6 | What the row shows |
|---|---|---|---|---|---|---|---|
| header | 9 | 7 | 2 | 15 | 32 | 10 | margin: **p = 1, r = 6, q = 3** |
| 1 | 9 | 7 | 2 | | | | left half A[1..3] |
| 2 | 9 | 7 | | 15 | 32 | 10 | split of the left half: [9, 7]. Right half A[4..6]. |
| 3 | | | 2 | 15 | 32 | | [2]. Split of the right half: [15, 32]. |
| 4 | 9 | | | | | 10 | [9]; [10] |
| 5 | | 7 | | 15 | | | [7]; [15] |
| 6 | 7 | 9 | | | 32 | | merge to [7, 9]; [32] |
| 7 | 2 | 7 | 9 | 15 | 32 | | merge to [2, 7, 9]; merge to [15, 32] |
| 8 | | | | 10 | 15 | 32 | merge to [10, 15, 32] |
| final | 2 | 7 | 9 | 10 | 15 | 32 | final merge |

**Script check ✅.**
- Every block drawn in the table covers an index range that MERGE-SORT really works on.
- Each block shows either the original values (a split) or the sorted values (a merge).
- The final answer 2, 7, 9, 10, 15, 32 is correct.
- **No errors in the values.**

ℹ️ Some rows mix stages of the left and right halves; for example, row 4 holds [9] from the left half and [10] from the right half. That is fine. What matters is that every split and every merge appears.

The recursion behind the sample, in the order the algorithm runs it:
```
MERGESORT(1,6)  q=3 → [9 7 2] | [15 32 10]
  MERGESORT(1,3)  q=2 → [9 7] | [2]
    MERGESORT(1,2)  q=1 → [9] | [7]      MERGE → [7 9]
  MERGE [7 9] + [2]          → [2 7 9]
  MERGESORT(4,6)  q=5 → [15 32] | [10]
    MERGESORT(4,5)  q=4 → [15] | [32]    MERGE → [15 32]
  MERGE [15 32] + [10]       → [10 15 32]
MERGE [2 7 9] + [10 15 32]   → [2 7 9 10 15 32]
```

#### Same method on your sheet (19, 17, 12, 5, 20, 10)

```
index:      1    2    3   |   4    5    6
start:     19   17   12   |   5   20   10        p=1, r=6, q=⌊(1+6)/2⌋=3
divide:   [19   17] [12]  |  [5   20] [10]       left q=⌊(1+3)/2⌋=2 · right q=⌊(4+6)/2⌋=5
divide:   [19] [17]       |  [5] [20]            q=1 · q=4
merge:    [17   19]       |  [5   20]            1 comparison each
merge:    [12   17   19]  |  [5   10   20]       1 comparison · 2 comparisons
merge:    [ 5   10   12       17   19   20]      5 comparisons
```
Result: **5, 10, 12, 17, 19, 20** ✅.

The last merge, step by step (L = [12, 17, 19], R = [5, 10, 20]):

| Step | Compare | Take | Output so far |
|---|---|---|---|
| 1 | 12 vs 5 | 5 (R) | 5 |
| 2 | 12 vs 10 | 10 (R) | 5, 10 |
| 3 | 12 vs 20 | 12 (L) | 5, 10, 12 |
| 4 | 17 vs 20 | 17 (L) | 5, 10, 12, 17 |
| 5 | 19 vs 20 | 19 (L) | 5, 10, 12, 17, 19 |
| — | L is empty | copy the rest of R | 5, 10, 12, 17, 19, 20 |

**✍️ Answer format the professor expects for Q3:**
- Use columns 1–6, and write "p = 1, r = 6, q = 3" in the margin.
- Add one row for each split, down to single elements, then one row for each merge back up.
- Box or colour each sub-array. The sample colour-codes the blocks.
- Write the final sorted row.
- "Show all steps" means that no level may be skipped.

### 2.4 Errors found in the sample solution (summary)

| # | Where | The sample says | Correct version | Effect on the final answer |
|---|---|---|---|---|
| 1 ⚠️ | Q1 heap, i = 1 row, right margin | "i=3 exit" | "**i = 4**, L = 9, R = 10 (X), exit": continue at the index where 9 moved [D09-S10, S13] | none here (3 and 4 are both leaves) |
| 2 ⚠️ | Q2 partition, margin | "initially J=0, I=−1" | **i = p − 1 = 0, j from p = 1** (the array is 1-based, p = 1) [D07-S5] | none |
| 3 ⚠️ | Q2 partition, final exchange marker | "i" under column 4 | "**i + 1**" (i = 3 after the loop). Exchange A[4] ↔ A[6], return q = 4 | none |
| 4 ⚠️ (minor) | Q2 partition, row text | "A[j] < x" | "**A[j] ≤ x**" [D07-S5] | none here (all keys distinct) |
| 5 (label) | Sheet and sample headings | merge sort numbered "Q2" | Q3 | none |

**Bottom line:**
- Every array row and all three final answers in the sample are **correct** ✅.
- The errors are in the margin bookkeeping (indices and labels). These are exactly the details the sheet asks you to show, so copy the corrected versions.

### 2.5 Skills map for A2

| Q | Skill | Class source |
|---|---|---|
| Q1 | BUILD-MAX-HEAP and MAX-HEAPIFY with 0-based L/R arithmetic; recursive heapify at the child's index | D09-S9, S10, S13, S22 |
| Q2 | One call of PARTITION: pivot = last element, i/j pointers, final exchange, return q | D07-S4, S5 |
| Q3 | MERGE-SORT recursion with q = ⌊(p + r)/2⌋; MERGE of sorted lists | D08-S3 – S6, S8 |

---

## 3. What these assignments tell us about the midterm

> **Evidence used:** only the two sheets, the A2 sample solution, the A1 score breakdown, and the slides those questions come from. Anything that is an inference is labelled as one.

### 3.1 Question types: each one comes straight from a slide

| Question type | Seen in | Slide origin | How close to the slide |
|---|---|---|---|
| Find O and Ω, with the steps to c and n₀ | A1 Q1 | D03-S10 – S12; drills on D03-S22 and S24 | Same shape as the drills: a polynomial, and a 2ⁿ-plus-polynomial |
| Check whether bounds are correct (o, Ω) | A1 Q2 | D03-S19; "Incorrect bounds" D03-S23, S25, S27 | Same idea, new function |
| Master theorem with [a, b, k, p] / Case / Ans boxes | A1 Q3 | D05-S5, S6 | **Word for word:** examples #1 and #5 of D05-S6 |
| Recurrence tree | A1 Q4 | code on D04-S8 and S5; results on D04-S10 – S12 | Both recurrences are the slide examples |
| Build-Max-Heap trace table (0-based) | A2 Q1 | D09-S9, S10, S13, S22 | Same table layout as the 6-element example on D09-S22 |
| First PARTITION of quicksort (1-based) | A2 Q2 | D07-S4, S5 | The slide pseudo-code, traced once |
| Merge sort, all steps (1-based) | A2 Q3 | D08-S3 – S8 | The slide pseudo-code |

What this evidence supports:
- **Every question applies one slide definition, pseudo-code or worked example to a small input**: two functions, two recurrences, six-element arrays.
- None of the seven questions asks you to design an algorithm or write code. The only proof-like work is finding c and n₀ and showing that the inequality holds.
- A1 Q3 copied two items verbatim from the example list on D05-S6. The rest of that list (solved in §4.3), the drill lists on D03-S22 and S24, and the `demo(n)` programs on D04-S3 – S8 are the most direct practice material the evidence points to.

### 3.2 The level of detail expected

**The sheets say what to show**, question by question:

| Question | Instruction on the sheet |
|---|---|
| A1 Q1 | "Show the steps to evaluate value of c and n₀" |
| A1 Q2 | "Comment on … (check bounds are correct or incorrect)" |
| A1 Q3 | Separate boxes for a, b, k, p, Case and Ans |
| A2 Q1 | "Use this space for showing iterations" |
| A2 Q2 | "Show only steps of first PARTITION" |
| A2 Q3 | "Show all steps" |

Both sheets also say that submissions *"not conforming to the given format will not be evaluated"*, and you solve on the printed sheet itself.

**The sample solution shows what "steps" means for this professor:**
- one row for each loop iteration, with the whole array rewritten after every change;
- the index values written out in the margin (i = 2, L = 5, R = 6 · p = 1, r = 6, x = 10 · p = 1, r = 6, q = 3);
- markers under the cells (i / L / R or i / j / x) and an arrow for every exchange;
- the recursive heapify call written out, including its "exit";
- the final answer highlighted (shaded heap row, orange pivot, green sorted row);
- **the trace itself is the answer**, with no separate prose.

### 3.3 What the A1 breakdown shows, and what it cannot show

- 0.25 + 0.25 + 0.5 + 0.5 + 0.75 + 0.75 + 0.75 + 0.5 = 4.25, so **0.75 marks were lost**.
- Marks move in **0.25 steps**, so a sub-part can earn partial credit.
- The breakdown has 8 numbers, and the sheet has 8 sub-parts: Q1 ×2, Q2 ×2, Q3a, Q3b, Q4 ×2. The breakdown does **not** give each part's maximum.
- Assume that the numbers follow the sheet order and that the two parts of one question carry equal maxima. Then exactly **four** allocations add up to 5 marks (✅ the script enumerated them):

| Maximum per part (Q1, Q2, Q3, Q4) | Where the 0.75 was lost |
|---|---|
| 0.5, 0.5, 0.75, 0.75 | Q1 part 1 −0.25, Q1 part 2 −0.25, **Q4(ii) −0.25** |
| 0.25, 0.75, 0.75, 0.75 | Q2(o) −0.25, Q2(Ω) −0.25, **Q4(ii) −0.25** |
| 0.25, 0.5, 1.0, 0.75 | Q3a −0.25, Q3b −0.25, **Q4(ii) −0.25** |
| 0.25, 0.5, 0.75, 1.0 | Q4(i) −0.25, **Q4(ii) −0.5** |

- **Solid conclusion:** Q4(ii) lost marks in **every** allocation. That part is T(n) = 2T(n−1) + 1, solved by recurrence tree. It scored 0.5, against 0.75 for its sibling Q4(i).
- **Cannot be decided from the numbers:** where the other 0.5 went.
  - The first row is the only allocation in which Q1 and Q2 carry the same weight and Q3 and Q4 carry the same weight. That makes it plausible, but it is not proof.
  - The grader's marks on your returned sheet will settle the question.

### 3.4 Where marks are at risk

Each item below is tied to a piece of evidence.

1. **Decreasing recurrence solved by tree.** This is A1 Q4(ii), the only part that lost marks under every allocation. A complete answer contains:
   - the tree with level totals 1, 2, 4, …;
   - the height n − 1, meaning **n levels, not log n**;
   - the sum Σ_{i=0}^{n−1} 2^i, which equals **2ⁿ − 1** [D01-S25];
   - **Θ(2ⁿ)**.

   See §1.4.
2. **c and n₀, not just the O(·) (A1 Q1).** The sheet asks for the steps to c and n₀, for both O and Ω and for each function. n₀ must work for **every** n ≥ n₀; watch the n = 3 trap in n² ≤ 2ⁿ. The professor's notes accept any valid pair, but prefer a small c for O and a large c for Ω [D03-S11 notes].
3. **Index bookkeeping in traces (A2).** The professor's own sample slipped exactly here (§2.4).
   - Heaps are 0-based: L = 2i + 1, R = 2i + 2, and the recursive call goes to the child's index.
   - Quicksort and merge sort are 1-based: i = p − 1 = 0 at the start.
   - The final quicksort exchange is A[i+1] ↔ A[r].
4. **Format.** Both sheets warn that non-conforming submissions are not evaluated. Solve inside the given table or boxes.
5. **Separate boxes (A1 Q3).** The sheet has a separate box for each of a, b, k, p, Case and Ans. Fill all of them, and give the case together with its condition (for example "2(a): a = b^k, p > −1").

### 3.5 What these two assignments do not cover

These are facts only. They are not a prediction.
- The A1 and A2 questions draw on **D03, D04, D05, D07, D08 and D09**, plus the series formula on D01-S25.
- They do not test:
  - D02 (ADT);
  - D06 (insertion sort);
  - D10 (bucket and radix sort);
  - D11 (amortized analysis);
  - D12 – D13 (red-black trees);
  - Θ with constants c₁ and c₂ (D03-S13 – S15), or ω;
  - quicksort performance analysis (D07-S11 – S21);
  - heap sort and Heap-Extract-Max (D09-S15 – S22).
- These two assignments say nothing either way about whether those topics will be on the midterm.

---

## 4. Eight new practice questions (same styles) with verified answers

> These use the same wording and layout as the two sheets, with new numbers. Do them on paper first; the answers are in §4.2. A script checked every answer ✅.

### 4.1 Questions

**P1** (style of A1 Q1). For the following functions (show the steps to evaluate the value of c and n₀), find the O-notation and find the big-omega notation.
- f(n) = 6n² + 5n + 4
- f(n) = 3·2ⁿ + n³

**P2** (style of A1 Q2). Comment on the following (check whether the bounds are correct or incorrect). Given f(n) = 4n² + 3n + 1 and g(n) = n³:
- Is f(n) = o(g(n))?
- Is f(n) = Ω(g(n))?

**P3** (style of A1 Q3). Solve using Master's theorem.
- 3a. T(n) = 8T(n/2) + n²  [a = __, b = __, k = __, p = __]  Case = ____  Ans = ____
- 3b. T(n) = 3T(n/2) + n²  [a = __, b = __, k = __, p = __]  Case = ____  Ans = ____

**P4** (style of A1 Q4). Solve using a recurrence tree.
- T(n) = 2T(n/2) + n² for n > 1; T(1) = 1
- T(n) = T(n−1) + n for n > 1; T(1) = 1

**P5** (style of A2 Q1). Convert the following sequence to a heap using Build Max Heap (indices 0–5):
4, 10, 3, 5, 1, 8

**P6** (style of A2 Q2). Apply the Quicksort algorithm. Show only the steps of the first PARTITION on the initial array (indices 1–6):
14, 3, 17, 8, 21, 11

**P7** (style of A2 Q3). Apply the Merge sort algorithm and show all steps (indices 1–7):
25, 13, 31, 8, 19, 4, 16

**P8** (style of A1 Q3, using the cases A1 did not use). Solve using Master's theorem, filling in a, b, k, p, Case and Ans.
- 8a. T(n) = 4T(n/2) + n²/log n
- 8b. T(n) = 2T(n/2) + n/log² n
- 8c. T(n) = 3T(n/2) + n log n
- 8d. (decreasing form, D05-S3) T(n) = T(n−1) + n²

### 4.2 Answers

#### P1

**(a) f(n) = 6n² + 5n + 4, so g(n) = n².**

O-notation:
1. Take c = 7. Then we need 6n² + 5n + 4 ≤ 7n², which is the same as 5n + 4 ≤ n².
2. Test values of n:

   | n | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   |---|---|---|---|---|---|---|---|
   | 5n + 4 | 9 | 14 | 19 | 24 | 29 | 34 | 39 |
   | n² | 1 | 4 | 9 | 16 | 25 | **36** | 49 |
   | holds? | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |

3. It stays true for all n ≥ 6, because then n² ≥ 6n = 5n + n ≥ 5n + 6 > 5n + 4.
4. **O(n²) with c = 7, n₀ = 6** ✅.

The alternative from summing the coefficients is c = 6 + 5 + 4 = 15 with n₀ = 1 ✅.

Ω-notation: 6n² ≤ 6n² + 5n + 4 for all n ≥ 1, so **Ω(n²) with c = 6, n₀ = 1** ✅.

Since f is both O(n²) and Ω(n²), **f(n) = Θ(n²)**.

**(b) f(n) = 3·2ⁿ + n³, so g(n) = 2ⁿ.**

O-notation:
1. Take c = 4. Then we need n³ ≤ 2ⁿ.
2. Test values of n:

   | n | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | **10** | 11 |
   |---|---|---|---|---|---|---|---|---|---|---|---|
   | n³ | 1 | 8 | 27 | 64 | 125 | 216 | 343 | 512 | 729 | **1000** | 1331 |
   | 2ⁿ | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | **1024** | 2048 |
   | holds? | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |

3. 🪤 The inequality is true at n = 1, then false from n = 2 to n = 9. So **n₀ = 10**, not 1.
4. It stays true after n = 10: each step doubles 2ⁿ but multiplies n³ by at most (11/10)³ ≈ 1.33.
5. **O(2ⁿ) with c = 4, n₀ = 10** ✅.

A larger c gives a smaller n₀: c = 5 needs n³ ≤ 2·2ⁿ, which holds from **n₀ = 8** (512 ≤ 512) ✅.

Ω-notation: 3·2ⁿ ≤ 3·2ⁿ + n³ for all n ≥ 1, so **Ω(2ⁿ) with c = 3, n₀ = 1** ✅.

Since f is both O(2ⁿ) and Ω(2ⁿ), **f(n) = Θ(2ⁿ)**.

#### P2

f is of order n² and g is of order n³. In the comparison table [D03-S19] this is **"a < b"**.

**Is f = o(g)? CORRECT.**
- f grows strictly slower than g [D03-S19].
- Numbers ✅: f(n)/g(n) = 8, 0.431, 0.0403, 0.0040 at n = 1, 10, 100, 1000. The ratio keeps shrinking.

**Is f = Ω(g)? INCORRECT.** This follows the same pattern as *"5n² + 4n + 2 ≠ Ω(n³)"* on D03-S25.
1. For Ω we would need 4n² + 3n + 1 ≥ c·n³ for all n ≥ n₀.
2. Divide both sides by n³: c ≤ 4/n + 3/n² + 1/n³, and the right-hand side is at most 8/n.
3. Whatever positive c you choose, once n > 8/c the right-hand side drops below c, so the inequality fails.
4. Therefore no pair (c, n₀) exists.

The script confirms ✅: with c = 1 it fails from n = 9 on, with c = 0.1 from n = 81, and with c = 0.01 from n = 801.

#### P3

| | a, b, k, p | a vs b^k | Case | Ans |
|---|---|---|---|---|
| 3a. 8T(n/2) + n² | 8, 2, 2, 0 | 8 > 2² = 4 | **1** | Θ(n^(log₂ 8)) = **Θ(n³)** |
| 3b. 3T(n/2) + n² | 3, 2, 2, 0 | 3 < 4 | **3(a)** (p = 0 ≥ 0) | Θ(n² log⁰ n) = **Θ(n²)** |

✅ The script checked exact values for n = 2^m with T(1) = 1:
- 3a: T(n) = 2n³ − n².
- 3b: T(n) = 4n² − 3·n^(log₂ 3).

In 3b the n² term dominates, so the answer is Θ(n²).

#### P4

**(i) T(n) = 2T(n/2) + n²**
```
level 0:              n²                          level total = n²
level 1:       (n/2)²      (n/2)²                 level total = 2·n²/4  = n²/2
level 2:   (n/4)² (n/4)² (n/4)² (n/4)²            level total = 4·n²/16 = n²/4
  ...
level i:   2^i nodes, each (n/2^i)²               level total = n²/2^i
leaves:    n nodes, each T(1) = 1                 level total = n
```
1. **Height:** log n, as in Q4(i). The level totals **halve** at each level, so the root does the most work. This is the slide's *"max. work done at root"* case, n² [D04-S10].
2. **Sum:** n²(1 + 1/2 + … + 1/2^(log n − 1)) + n.
3. By the power-of-2 series [D01-S25], 1 + 1/2 + … + 1/2^(m−1) = (2^m − 1)/2^(m−1). With 2^m = n this is 2 − 2/n.
4. So T(n) = n²(2 − 2/n) + n = **2n² − n = Θ(n²)** ✅. For n = 8: 64 + 32 + 16 + 8 = 120, and T(8) = 120.

Cross-check with the Master theorem: a = 2 < b^k = 4, so Case 3(a), giving Θ(n²).

**(ii) T(n) = T(n−1) + n**
```
level 0:   n          (T(n))
level 1:   n-1        (T(n-1))
level 2:   n-2
  ...
level n-2: 2
level n-1: T(1) = 1   (leaf)
```
1. **Shape:** the tree is a single chain, one node per level, with n levels.
2. **Sum:** 1 + 2 + … + n = **n(n+1)/2 = Θ(n²)**, using the arithmetic series [D01-S25] ✅.

Cross-checks:
- D04-S11: *"n + T(n−1) ⇒ O(n²)"*.
- The decreasing-form Master theorem with a = 1 gives O(n^(k+1)) = O(n²) [D05-S3].

#### P5. Build Max Heap on 4, 10, 3, 5, 1, 8 (n = 6, i from 2 down to 0)

| Row | Left margin | 0 | 1 | 2 | 3 | 4 | 5 | Right margin / action |
|---|---|---|---|---|---|---|---|---|
| start | For i → 2 to 0 | 4 | 10 | 3 | 5 | 1 | 8 | |
| i = 2 | L = 5, R = 6 (X) | 4 | 10 | **8** | 5 | 1 | **3** | 3 < 8, so swap A[2] ↔ A[5]. heapify(5): leaf, so exit. |
| i = 1 | L = 3, R = 4 | 4 | 10 | 8 | 5 | 1 | 3 | 10 > 5 and 10 > 1: no swap, exit |
| i = 0 | L = 1, R = 2 | **10** | **4** | 8 | 5 | 1 | 3 | Largest is L (10), so swap A[0] ↔ A[1] |
| heapify(1) | L = 3, R = 4 | 10 | **5** | 8 | **4** | 1 | 3 | 4 < 5 (L), so swap A[1] ↔ A[3] |
| heapify(3) | L = 7, R = 8 (X) | 10 | 5 | 8 | 4 | 1 | 3 | leaf, so exit |
| **final** | | **10** | **5** | **8** | **4** | **1** | **3** | max-heap ✅ |

```
          10
        /    \
       5      8
      / \    /
     4   1  3
```
At i = 0 the swap **cascades**. The value 4 moves down to index 1 and then to index 3. This is exactly where the rule "continue at the index the value moved to" decides the answer (compare Slip 1 in §2.4).

#### P6. First PARTITION of 14, 3, 17, 8, 21, 11 (p = 1, r = 6, x = A[6] = 11, i = 0)

| Row | Test | 1 | 2 | 3 | 4 | 5 | 6 | i / action |
|---|---|---|---|---|---|---|---|---|
| start | | 14 | 3 | 17 | 8 | 21 | 11 | i = 0 |
| j = 1 | 14 ≤ 11? no | | | | | | | i = 0 |
| j = 2 | 3 ≤ 11? **yes** | **3** | **14** | 17 | 8 | 21 | 11 | i = 1, exchange A[1] ↔ A[2] |
| j = 3 | 17 ≤ 11? no | | | | | | | i = 1 |
| j = 4 | 8 ≤ 11? **yes** | 3 | **8** | 17 | **14** | 21 | 11 | i = 2, exchange A[2] ↔ A[4] |
| j = 5 | 21 ≤ 11? no | | | | | | | i = 2 |
| exchange | A[i+1] = A[3] ↔ A[6] | 3 | 8 | **11** | 14 | 21 | **17** | return **q = 3** ✅ |

The left part {3, 8} is ≤ 11, and the right part {14, 21, 17} is > 11.

#### P7. Merge sort of 25, 13, 31, 8, 19, 4, 16 (p = 1, r = 7)

```
index:     1    2    3    4   |   5    6    7
start:    25   13   31    8   |  19    4   16       p=1, r=7, q=⌊(1+7)/2⌋=4
divide:  [25   13] [31    8]  |  [19    4] [16]     q=⌊(1+4)/2⌋=2 · q=⌊(5+7)/2⌋=6
divide:  [25] [13] [31]  [8]  |  [19]  [4]          q=1, q=3 · q=5
merge:   [13   25] [ 8   31]  |  [ 4   19]          1 + 1 · 1 comparisons
merge:   [ 8   13   25   31]  |  [ 4   16   19]     3 · 2 comparisons
merge:   [ 4    8   13   16       19   25   31]     5 comparisons
```
Result: **4, 8, 13, 16, 19, 25, 31** ✅.

With 7 elements the split is uneven, 4 | 3, because q = ⌊(1+7)/2⌋ = 4 gives the left half the extra element.

#### P8

| | Recurrence | a, b, k, p | a vs b^k | Case | Ans | Script check ✅ |
|---|---|---|---|---|---|---|
| 8a | 4T(n/2) + n²/log n | 4, 2, 2, **−1** | 4 = 4 | **2(b)** (p = −1) | **Θ(n² log log n)** | T(n)/(n² log log n) stays bounded (0.85 when log n = 1024; 0.77 when log n = 2²⁰) |
| 8b | 2T(n/2) + n/log² n | 2, 2, 1, **−2** | 2 = 2 | **2(c)** (p < −1) | **Θ(n)** | T(n)/n stays below 2.65 |
| 8c | 3T(n/2) + n log n | 3, 2, 1, 1 | 3 > 2 | **1** (p does not matter) | **Θ(n^(log₂ 3)) ≈ Θ(n^1.585)** | T(n)/n^(log₂ 3) tends to 7 |
| 8d | T(n−1) + n² | decreasing form: a = 1, b = 1, k = 2 | — | **a = 1** [D05-S3] | O(n^(k+1)) = **O(n³)** | exact: T(n) = 1² + … + n² = n(n+1)(2n+1)/6 (sum of squares [D01-S25]), so the bound is tight: Θ(n³) |

🪤 To read p, rewrite the log factor as a power of log n:
- n²/log n = n² · log^(−1) n, so p = −1.
- n/log² n = n · log^(−2) n, so p = −2.

### 4.3 Bonus drill: the whole D05-S6 list, solved

A1 Q3 copied #1 and #5 from this slide, so here is the full list. The a, b, k, p values are the ones printed on the slide. Each case was checked by script ✅.

| # | T(n) | a, b, k, p | a vs b^k | Case | Answer |
|---|---|---|---|---|---|
| 1 | 4T(n/2) + n² | 4, 2, 2, 0 | 4 = 4 | 2(a) | Θ(n² log n) (**= A1 Q3a**) |
| 2 | T(n/2) + n² | 1, 2, 2, 0 | 1 < 4 | 3(a) | Θ(n²) |
| 3 | 2ⁿT(n/2) + nⁿ | — | — | **not applicable** (the slide itself says so: a = 2ⁿ is not a constant) | — |
| 4 | 14T(n/4) + n | 14, 4, 1, 0 | 14 > 4 | 1 | Θ(n^(log₄ 14)) ≈ Θ(n^1.904) |
| 5 | 2T(n/2) + n log n | 2, 2, 1, 1 | 2 = 2 | 2(a) | Θ(n log² n) (**= A1 Q3b**) |
| 6 | 2T(n/2) + n/log n | 2, 2, 1, −1 | 2 = 2 | 2(b) | Θ(n log log n) |
| 7 | 2T(n/4) + n^0.51 | 2, 4, 0.51, 0 | 2 < 4^0.51 ≈ 2.03 | 3(a) | Θ(n^0.51) |
| 8 | 0.5T(n/2) + 1/n | 0.5, 2, −1, 0 | — | **not applicable**: a = 0.5 < 1 and k = −1 < 0 break the slide's own conditions a ≥ 1, k ≥ 0 [D05-S2] | — |
| 9 | 6T(n/3) + n² log n | 6, 3, 2, 1 | 6 < 9 | 3(a) | Θ(n² log n) |
| 10 | 64T(n/8) − n² log n | (64, 8, 2, 1 on the slide) | — | **not applicable**: f(n) is negative. The professor's note says the theorem *"requires the driving function to be strictly positive"* [D05-S6 notes] | — |
| 11 | 7T(n/3) + n² | 7, 3, 2, 0 | 7 < 9 | 3(a) | Θ(n²) |
| 12 | 4T(n/2) + log n | 4, 2, 0, 1 | 4 > 1 | 1 | Θ(n²) |
| 13 | 2^(1/2)·T(n/2) + n² log n | √2, 2, 2, 1 | 1.41 < 4 | 3(a) | Θ(n² log n) |
| 14 | 2T(n/2) + n^(1/2) | 2, 2, ½, 0 | 2 > √2 ≈ 1.41 | 1 | Θ(n) |

⚠️ **Slide check on case 3(b).** D05-S5 and D05-S6 state case 3(b) (a < b^k, p < 0) as Θ(n^k).
- The script tested T(n) = 3T(n/2) + n²/log n, which has a = 3 < 4 and p = −1.
  - T(n)/n² keeps falling: 0.68, then 0.11, then 0.025 at log n = 10, 40 and 160.
  - T(n)/(n²/log n) levels off near 4.
- So in this case n^k is an **upper bound only**, not a tight bound.
- None of the 14 slide examples falls in case 3(b), and the class answer for that case is the slide's Θ(n^k).
- 🔎 Look up in Track B: how this case is usually stated.

---

## Appendix: self-check script for A2-style traces

The script below implements the slide pseudo-code: [D09-S10] (0-based heap), [D07-S5] (1-based PARTITION, `<=`) and [D08-S5] (1-based merge sort). Change the arrays at the bottom to check your own practice traces. Save it as `selfcheck.py` and run `python3 selfcheck.py`. As written, it prints the trace for your A2 sheet's arrays, followed by n₀ = 4 for Q1(ii).

```python
# Self-check for A2-style questions, written from the slide pseudo-code [D09-S10, D07-S5, D08-S5].
def build_max_heap(A):                      # 0-based, i = n/2-1 downto 0
    A, n = list(A), len(A)
    def heapify(i, tag):
        l, r, big = 2*i + 1, 2*i + 2, i
        if l < n and A[l] > A[big]: big = l
        if r < n and A[r] > A[big]: big = r
        if big != i:
            A[i], A[big] = A[big], A[i]
            print(f"{tag} i={i} L={l} R={r}: swap A[{i}]<->A[{big}] -> {A}")
            heapify(big, "   heapify")
        else:
            print(f"{tag} i={i} L={l} R={r}: exit")
    for i in range(n//2 - 1, -1, -1):
        heapify(i, "for")
    return A

def partition(A):                            # 1-based, p=1, r=n, test A[j] <= x
    A = [None] + list(A); p, r = 1, len(A) - 1
    x, i = A[r], p - 1
    print(f"p={p} r={r} x={x} i={i}")
    for j in range(p, r):
        if A[j] <= x:
            i += 1; A[i], A[j] = A[j], A[i]
            print(f"j={j}: A[j]<=x -> i={i}, swap A[{i}]<->A[{j}] -> {A[1:]}")
        else:
            print(f"j={j}: A[j]>x")
    A[i+1], A[r] = A[r], A[i+1]
    print(f"swap A[{i+1}]<->A[{r}] -> {A[1:]}, q={i+1}")
    return A[1:]

def merge_sort(A, p=1, r=None, d=0):         # 1-based, q = floor((p+r)/2)
    if r is None: A, r = [None] + list(A), len(A)
    if p < r:
        q = (p + r) // 2
        print("  "*d + f"split ({p},{r}) q={q}: {A[p:q+1]} | {A[q+1:r+1]}")
        merge_sort(A, p, q, d+1); merge_sort(A, q+1, r, d+1)
        A[p:r+1] = sorted(A[p:r+1])          # same result as MERGE [D08-S8]
        print("  "*d + f"merge ({p},{q},{r}) -> {A[p:r+1]}")
    return A[1:] if d == 0 else A

def smallest_n0(f, g, c, upto=500):          # smallest n0 with f(n) <= c*g(n) for all n0..upto
    n0 = None
    for n in range(upto, 0, -1):
        if f(n) <= c*g(n): n0 = n
        else: break
    return n0

print(build_max_heap([11, 19, 7, 12, 15, 30]))
print(partition([18, 7, 12, 15, 22, 10]))
print(merge_sort([19, 17, 12, 5, 20, 10]))
print(smallest_n0(lambda n: n*n + 2**n, lambda n: 2**n, 2))   # -> 4
```
