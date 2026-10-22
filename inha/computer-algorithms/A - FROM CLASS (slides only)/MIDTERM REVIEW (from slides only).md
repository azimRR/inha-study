# Midterm review — Computer Algorithm (from class slides only)

> **Track A note:** 261 slides, 13 decks, plus Assignments 1–2 and the professor's sample solution. Nothing else.
> - Everything here is condensed from the five weekly class-notes files and the Assignments 1–2 study guide in this folder; those were written from the slides, the speaker notes inside the .pptx files, the assignment sheets and the A2 sample solution.
> - No web, no textbook. Where the slides stop, a 🔎 line points to Track B (kept elsewhere).
> - **Verified:** every number, trace, tree and Θ-answer in this file was recomputed by Python scripts that implement the *class* conventions:
>   - the Master theorem exactly as on D05;
>   - Lomuto PARTITION (pivot = A[r], test A[j] ≤ x), 1-based like the A2 sheet;
>   - 1-based merge sort with q = ⌊(p+r)/2⌋;
>   - 0-based heap tables (L = 2i+1, R = 2i+2);
>   - RB deletion with the in-order **predecessor** and the D13-S8 case numbers, including Case 3(5) and the "Or" shortcut check.
>
>   The same scripts first reproduced every worked example in the decks and in A2 before they were used on new data.

**Legend**

| Mark | Meaning |
|---|---|
| ⭐ | Professor emphasis or high exam value |
| ⚠️ | Error or slip on a slide or in the sample solution, followed by the correct reading |
| 🙈 | Slide is **hidden** in the .pptx (still in your file, so study it) |
| 🪤 | Trap: an easy way to lose a mark |
| ✍️ | What to write on the answer sheet |
| ✅ | Re-checked by script |
| 🔎 | Not on the slides: look it up in Track B |
| [D05-S6] | Deck 05, slide 6 ([D03-S11 📝] = that slide's speaker notes) |

**More detail lives in** `notes-by-week/` (one file per block of weeks) and `assignments/Assignments 1-2 - worked study guide (class material).md`.

**Contents**
0. Exam facts
1. ⭐ The professor's question style & answer format
2. Recipes, step by step as taught
3. Week map
4. Definitions & formula sheet
5. All 14 Master-theorem examples (D05-S6)
6. Traps & slide errors
7. Mock midterm (practice, ~90 min)
8. Answer key (verified)
9. Last-48-hours checklist

---

## 0. Exam facts

| Item | Fact | Source |
|---|---|---|
| Course | SOC3030-003 Computer Algorithm (the assignment sheets print "Computer Algorithms (CIE3090)"). Prof. Seth Ashish, Inha University in Tashkent, Fall 2026. Tue/Wed, A-203 / B-201 | syllabus |
| **Midterm** | **25%** of the grade, in **week 8 (24–30 Oct 2026)**, covering **weeks 1–7** = decks 01–13 | syllabus |
| Day, room, length, allowed aids | **Not in the class material.** Check eclass or ask in class. (The class meets Tue/Wed, so the regular slots in week 8 are Tue 27 / Wed 28 Oct; that is an inference, not an announcement.) | — |
| Time left | Today is Mon 19 Oct: 5 days to the start of week 8, 11 days to its end | — |
| Textbook | None listed in the syllabus | syllabus |

**Grading**

| Midterm | Final | Assignments | Quiz | Attendance | Discussion |
|---|---|---|---|---|---|
| **25%** | 25% | **30%** (handwritten) | 10% | 5% | 5% |

**Assignment status**
- **A1** (asymptotics + recurrences): submitted, graded **4.25 / 5**; the breakdown is 0.25 + 0.25 + 0.5 + 0.5 + 0.75 + 0.75 + 0.75 + 0.5.
  - 0.75 was lost.
  - Under every allocation of the part maxima that adds up to 5, **Q4(ii)** (T(n) = 2T(n−1) + 1 by recursion tree) lost marks.
- **A2** (Sorting: Build-Max-Heap, first PARTITION, merge sort): due 9 Oct, 23:00; eclass shows "No attempt", so **A2 was missed**.
  - The A2 sheet says late and e-mailed submissions are not accepted. The syllabus note still suggests asking the professor whether a late submission is possible.
  - The professor's **sample solution** is the best model of the answer format he expects (§1). Your sheet's three questions are solved in the guide (§2 there) and practised again here in mock Q6–Q8.
- Both sheets: print the sheet, solve by hand **on the sheet only**, upload a scan or photo. *"Submissions not conforming to the given format will not be evaluated."*

**What the midterm will look like:** not announced. The only evidence is A1, A2 and the sample solution (§1). Everything in §1 about the midterm is an **inference** from that evidence.

---

## 1. ⭐ The professor's question style & answer format

### 1.1 Every question so far applied one slide to a small input

| Question type | Seen in | Slide origin | How close to the slide |
|---|---|---|---|
| Find O and Ω, "show the steps to evaluate value of c and n₀" | A1 Q1 | D03-S10–S12; drills D03-S22, S24 | same shape as the drills (a polynomial; a 2ⁿ-plus-polynomial) |
| "Comment on the following (check bounds are correct or incorrect)": o and Ω | A1 Q2 | D03-S19; "incorrect bounds" D03-S23, S25, S27 | same idea, new function |
| Master theorem with **[a = __, b = __, k = __, p = __] / Case = __ / Ans = __** boxes | A1 Q3 | D05-S5, S6 | **word for word**: examples #1 and #5 of D05-S6 |
| Recurrence tree | A1 Q4 | D04-S5, S8 code; D04-S10–S12 results | both recurrences are the slide examples |
| "Convert … to a Heap using Build Max Heap", table with columns **0–5** | A2 Q1 | D09-S9, S10, S13, S22 | same table as the 6-element example on D09-S22 |
| Quicksort: "Show only steps of first PARTITION", columns **1–6** | A2 Q2 | D07-S4, S5 | the slide pseudocode, traced once |
| Merge sort: "Show all steps", columns **1–6** | A2 "Q2" (really Q3) | D08-S3–S8 | the slide pseudocode |

- No question asked you to design an algorithm or write code. The only proof-like work was finding c and n₀.
- A1 Q3 copied two items **verbatim** from D05-S6. So the D05-S6 list (§5), the D03-S22/S24 drills and the D04 `demo(n)` programs are the most direct practice material.
- A1 and A2 did **not** test D02 (ADT), D06 (insertion sort), D10 (bucket/radix), D11 (amortized) or D12–D13 (RB trees). That says nothing about the midterm: the syllabus lists "Problem scenarios of amortized analysis" and "Practice on RB tree operations" as practice for weeks 5–6.

### 1.2 What he grades, and how marks move

| What | Evidence | What to do |
|---|---|---|
| **c and n₀**, for O **and** Ω, for **each** function | A1 Q1 wording; D03-S11 📝 | Give both constants and **show the inequality holds for every n ≥ n₀** (a small table plus one sentence). Any valid pair is accepted. He *prefers* a small c for O and a large c for Ω [D03-S11 📝]. |
| **Every box** filled: a, b, k, p, Case, Ans | A1 Q3 layout | Write the case **with its condition**, e.g. "2(a): a = b^k, p > −1". |
| **One row per iteration**, with the index values in the margin | A2 sample | Heap: "i = 2, L = 5, R = 6". PARTITION: "p = 1, r = 6, x = 10, i = 0, j from 1". Merge: "p = 1, r = 6, q = 3". |
| Markers under the cells and an arrow for each swap | A2 sample | i / L / R (heap) or i / j / x (PARTITION) under the columns. |
| The whole array **rewritten after every change** | A2 sample | Never skip a row; "show all steps" means no level may be skipped. |
| Recursive heapify written out, **including "exit"** | A2 sample | "i = 4, L = 9, R = 10 (X) → exit". Use the index the value **moved to**. |
| Final answer highlighted | A2 sample (shaded heap row, orange pivot, green sorted row) | Box or shade the final row. |
| **Partial credit in 0.25 steps** | A1 breakdown (0.25 … 0.75 per part) | A half-finished trace still earns marks: always write the setup row and the margin values. |
| Printed-sheet format | both sheets | Solve **inside** the given table or boxes; "not conforming … will not be evaluated". |

### 1.3 ✍️ Answer templates (copy these layouts)

**O / Ω with c and n₀** (A1 Q1 has the O column on the left and the Ω column on the right)
```
f(n) = 8n³+6n+8          | O-notation                         | Ω-notation
                         | 8n³+6n+8 ≤ 9n³ ⇔ 6n+8 ≤ n³          | 8n³ ≤ 8n³+6n+8  ∀n ≥ 1
                         | n=1: 14>1 ✗  n=2: 20>8 ✗  n=3: 26≤27 ✓ |
                         | stays true for n ≥ 3                | 
                         | ⇒ O(n³), c = 9, n₀ = 3              | ⇒ Ω(n³), c = 8, n₀ = 1
```

**Correct / incorrect bound** (A1 Q2)
```
f = Θ(n³) (leading term), g = n³ → "a = b" case [D03-S19]
f = o(g)?  INCORRECT – o needs strictly lower order (a < b); here a = b
f = Ω(g)?  CORRECT   – 10n³+2n²+3 ≥ 10·n³ ∀n ≥ 1 ⇒ c = 10, n₀ = 1
```

**Master theorem box** (A1 Q3)
```
T(n) = 2T(n/2) + n log n     [a = 2, b = 2, k = 1, p = 1]
b^k = 2 = a, p = 1 > −1  →  Case = 2(a)
Ans = Θ(n^(log₂2) · log^(p+1) n) = Θ(n log² n)
```

**Recursion tree** (A1 Q4): draw 3 levels, the general level i and the leaves; write each level's total at the side; state the height; write the sum, the closed form, then Θ.

**Heap / PARTITION / merge tables:** exactly the layouts in §2.6–§2.8 (copied from the A2 sample, with its slips corrected).

**RB trees** (no assignment yet; this is the class-slide style [D12-S24, D13-S8]): one line per repair step naming the case ("parent 5 RED, uncle 7 RED → Case 1: recolour, x = 6"), then the tree after that step. Mark colours on every node (R/B).

### 1.4 Five mark-savers, each tied to evidence

1. **Decreasing recurrence by tree** (A1 Q4(ii), the part that lost marks under every allocation):
   - the height is **n − 1** (n levels), not log n;
   - **include the leaf level**: 1 + 2 + … + 2^(n−1) = 2ⁿ − 1 [D01-S25];
   - finish with Θ(2ⁿ).
2. **n₀ must work for every n ≥ n₀.** n² ≤ 2ⁿ is true at n = 1, 2, false at n = 3, true from n = 4. So n₀ = 4, not 1.
3. **Index bookkeeping:** the professor's own sample slipped exactly here (§6).
   - Heaps are 0-based: L = 2i+1, R = 2i+2, and the recursive call goes to the **child's** index.
   - PARTITION on a 1…n sheet starts with **i = p − 1 = 0, j = p = 1**. The final exchange is **A[i+1] ↔ A[r]**, and the test is **A[j] ≤ x**.
4. **Fill every box**, and name the case with its condition.
5. **Stay inside the printed format**: rows and columns as on the sheet.

---

## 2. Recipes, step by step as taught

### 2.1 Prove O / Ω / Θ with c and n₀ [D03-S10–S15, S22–S27; D03-S11 📝, S12 📝]

**Definitions** (quote; see §4.1): O needs 0 ≤ f(n) ≤ c·g(n), Ω needs 0 ≤ c·g(n) ≤ f(n), each **∀ n ≥ n₀**; Θ needs both, with c₁ and c₂.

**Steps**
1. **Choose g(n):** keep the highest-order term and drop its coefficient [D03-S8]. *"To compare orders of growth, look at the leading term"* [D03-S15]. An exponential term (2ⁿ) beats every polynomial term.
2. **O:** take c a little **bigger** than the leading coefficient (e.g. leading + 1). Cancel the leading term and get "lower terms ≤ (c − lead)·g(n)". Find the smallest n₀ with a small table, then say why it stays true for larger n.
   - Shortcut: c = the sum of all coefficients, n₀ = 1 (each lower term ≤ the leading function for n ≥ 1). Valid but loose [D03-S11 📝].
   - **Negative terms, for O:** just drop them: 5n² − 2n ≤ 5n² [D03-S12 📝].
3. **Ω:** take c = the leading coefficient and drop the positive lower terms (n₀ = 1 usually).
   - **Negative terms, for Ω:** "pay" for them with part of the leading term: 5n² − 2n ≥ 5n² − 2n² = 3n², so c = 3 [D03-S12 📝].
4. **Θ:** do both. Make c₁ a little smaller and c₂ a little bigger than the leading coefficient [D03-S15]. Theorem: f = Θ(g) ⇔ f = O(g) and f = Ω(g) [D03-S17].
5. **Incorrect bound** (e.g. 27n² + 16n + 25 ≠ O(n)) [D03-S23, S25, S27]: argue by contradiction.
   - Divide both sides by g(n).
   - For a false O, the left side grows without limit (27n + … ≤ c fails once n > c/27).
   - For a false Ω, it shrinks below any c > 0.
   - For a false Θ, show that one half fails.
6. **o and ω:** the slides give only the analogy f ↔ g ≈ a ↔ b: o is "a < b", ω is "a > b" [D03-S19]. Decide from the leading terms and back it with the ratio f/g (→ 0 for o; grows without bound for ω). 🔎 Formal little-o / little-ω definitions (with "for every c > 0"): Track B.

**🪤 Traps**
- n₀ must hold for **all** larger n: check the values *before* the one that works, and argue for the ones after.
- Ω with a negative term: you may not just drop it.
- Writing only "O(n³)" without c and n₀ loses the marks; the sheet asks for the steps.

**Class results ✅**
- A1 Q1:
  - 8n³ + 6n + 8 → **O(n³), c = 9, n₀ = 3** · **Ω(n³), c = 8, n₀ = 1**;
  - n² + 2ⁿ → **O(2ⁿ), c = 2, n₀ = 4** (or c = 3, n₀ = 1) · **Ω(2ⁿ), c = 1, n₀ = 1**.
- D03-S15: 10n² − 3n = Θ(n²) with **c₁ = 9, c₂ = 11, n₀ = 3** (or c₁ = 7, c₂ = 10, n₀ = 1).
- D03-S11: 3n³ = O(n⁴) with c = 3, n₀ = 1 (or c = 1, n₀ = 3).

### 2.2 Running time of loops and of recursive code [D03-S4–S8; D04-S3–S12]

**Plain code: the step-count model** [D03-S4, S5]
1. Fix the model: a processor with an instruction set, plus memory locations [D03-S3].
2. Count steps, then multiply by how often each statement runs:
   - a simple statement (arithmetic/logic, jump, pointer instruction) = **1 step**;
   - a 1-D array operation = **2 steps** [D03-S4];
   - `A=B+C*D-F` = **3**; `A[I]=B[I]+C[I]` = **4** (X=B[I]; Y=C[I]; Z=X+Y; A[I]=Z); `C=A[I,J]` = **4** (1 multiplication + 2 additions + 1 fetch) [D03-S5].
   - ⚠️ The 2-step and the 4-step conventions disagree; use the slide's numbers 3 / 4 / 4 (§6).
3. Keep the highest-order term [D03-S8]. Example: adding two arrays of size n costs about 4n plus loop control, which is **linear** [D03-S6].

**Loop patterns** [D04]
- `for(i=1; i<=n; i++)` runs **n** times.
- `for(i=1; i<=n; i=i*2)` runs **⌊log₂ n⌋ + 1 ≈ log n** times.

**Recursive code → recurrence:** T(n) = (number of recursive calls) × T(new size) + (work in this call), plus a base case [D04-S3–S8].

| Slide | Body of `demo(n)` | Recurrence | Answer (slide) |
|---|---|---|---|
| D04-S3 | loop i++ to n; `demo(n-1)` | T(n−1) + n | O(n²) |
| D04-S4 | loop i=i*2 to n; `demo(n-1)` | T(n−1) + log n | O(n log n) |
| D04-S5 | print; `demo(n-1)` twice | 2T(n−1) + 1 | O(2ⁿ) |
| D04-S6 | print; `demo(n/2)` | T(n/2) + 1 | O(log n) |
| D04-S7 | loop i+1 to n; `demo(n/2)` | T(n/2) + n | O(n) |
| D04-S8 | loop i+1 to n; `demo(n/2)` twice | 2T(n/2) + n | O(n log n) |

- 🪤 **Braces:** in S7 and S8 only `print` is inside the `for`; the recursive calls run once, **after** the loop.
- 🪤 The base case is `n>0` in S3–S5 but `n>1` in S6–S8.
- Then solve by back substitution, a recursion tree (§2.4) or the Master theorem (§2.3) [D04-S2].
- **Back substitution template** [D04-S9]: T(n) = c + 2T(n/2) = c + 2c + 4T(n/4) = … = c(1 + 2 + … + 2^(k−1)) + 2^k T(n/2^k). Stop at 2^k = n, giving c(2n − 1) = **O(n)** ✅.

### 2.3 Master theorem, both forms, with the boxes [D05-S2–S6]

**Dividing form** [D05-S5]: T(n) = aT(n/b) + Θ(n^k log^p n), with **a ≥ 1, b > 1, k ≥ 0 constants, p real**.

1. **Check that it applies.** Otherwise write "Not applicable" (D05-S6 #3, #8, #10):
   - a and b must be **constants** (#3 has a = 2ⁿ);
   - a ≥ 1 and k ≥ 0 (#8 has a = 0.5, k = −1);
   - the driving function must be **positive** (#10 has −n² log n) [D05-S6 📝].
2. **Fill the box [a, b, k, p].** Read k and p from f(n):

   | f(n) | 1 or c | log n | n | n log n | n/log n | n/log² n | n² | n² log n | √n | n^0.51 |
   |---|---|---|---|---|---|---|---|---|---|---|
   | **k** | 0 | 0 | 1 | 1 | 1 | 1 | 2 | 2 | ½ | 0.51 |
   | **p** | 0 | 1 | 0 | 1 | **−1** | **−2** | 0 | 1 | 0 | 0 |

   (1/log n = log^(−1) n, so p = −1.)
3. **Compare a with b^k.** This is the slide's "[compare log_b a and k]"; the two tests are equivalent because b > 1.

   | Case | Condition | Answer |
   |---|---|---|
   | 1 | a > b^k | **Θ(n^(log_b a))** (p does not matter) |
   | 2(a) | a = b^k, p > −1 | **Θ(n^(log_b a) · log^(p+1) n)** |
   | 2(b) | a = b^k, p = −1 | **Θ(n^(log_b a) · log log n)** |
   | 2(c) | a = b^k, p < −1 | **Θ(n^(log_b a))** |
   | 3(a) | a < b^k, p ≥ 0 | **Θ(n^k · log^p n)** |
   | 3(b) | a < b^k, p < 0 | **Θ(n^k)** ⚠️ only an upper bound (§5, §6) |

4. **Write Ans**, simplifying log_b a where you can: log₂ 4 = 2, log₄ 8 = 1.5, log₃ 9 = 2; log₄ 14 ≈ 1.904 (change of base [D01-S24]). In Case 2, n^(log_b a) = n^k.

✍️ `[a = 4, b = 2, k = 2, p = 0]   Case = 2(a) (a = b^k = 4, p = 0 > −1)   Ans = Θ(n² log n)` (A1 Q3a = D05-S6 #1 ✅). A1 Q3b = #5: [2, 2, 1, 1], 2(a), **Θ(n log² n)** ✅.

🪤 **p from a log factor:** 2T(n/2) + n log n has **p = 1**; reading p = 0 gives the wrong Θ(n log n).

**Decreasing form** [D05-S3]: T(n) = aT(n−b) + f(n), with f(n) = O(n^k), **a ≥ 1, b ≥ 1** (⚠️ D05-S2 prints b > 1 for both forms; for n−b it must be b ≥ 1, see §6).

| Case | Condition | Answer (an **O**, an upper bound) |
|---|---|---|
| 1 | a = 1 | O(f(n)·n) = **O(n^(k+1))** |
| 2 | a > 1 | O(f(n)·a^(n/b)) = **O(n^k · a^(n/b))** |

- Use the f(n) form when f is a log: log n + T(n−1) gives **O(n log n)**; 2T(n−1) + log n gives **O(log n · 2ⁿ)** [D04-S11].
- ✅ Two slide answers are valid but loose: 2T(n−1) + n is exactly 2^(n+1) − n − 2 = Θ(2ⁿ), not Θ(n2ⁿ). On the exam give the slide's O answer (§4.4).

### 2.4 Recursion tree [D04-S2, S9–S12; A1 Q4]

**Steps**
1. The root costs the non-recursive work f(n). Each call becomes a child with the smaller size.
2. **Level cost** = (number of nodes on the level) × (work per node). Write level 0, 1, 2, the general level i, and the leaves.
3. **Height:** n/b^i = 1 gives **log_b n** levels; n − i·b = 1 gives about **n/b** levels (decreasing recurrences).
4. **Add the levels, including the leaf level**, with the slide series [D01-S25]:
   - Σ_{i=0..k} 2^i = 2^(k+1) − 1;
   - Σ_{i=1..n} i = n(n+1)/2;
   - Σ i² = (2n³ + 3n² + n)/6.
5. Check the shape against D04-S10:

| Shape of the level costs | Recurrence (slide) | Where the work is | Answer |
|---|---|---|---|
| shrink geometrically | 2T(n/2) + cn² | **root** | n² |
| all equal | 2T(n/2) + cn | **equally at all levels** | n log n |
| grow geometrically | 2T(n/2) + c | **leaves** | n |

**Class answers ✅**
- A1 Q4(i): T(n) = 2T(n/2) + n, T(1) = 1. log n levels cost n each, plus a leaf level that costs n, so **T(n) = n log n + n = Θ(n log n)**. Check: T(8) = 8 + 8 + 8 + 8 = 32.
- A1 Q4(ii): T(n) = 2T(n−1) + 1, T(1) = 1. Level i has 2^i nodes, there are n levels (0 … n−1), so T(n) = 1 + 2 + … + 2^(n−1) = **2ⁿ − 1 = Θ(2ⁿ)**. Check: T(4) = 15.
- Always cross-check with the Master theorem: 2T(n/2) + n → 2(a) → Θ(n log n); 2T(n−1) + 1 → decreasing form, a = 2 → O(2ⁿ).

### 2.5 Insertion sort trace [D06-S5–S8]

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
**Steps** for each pass j = 2 … n:
1. Pull out key = A[j], leaving a vacancy [D06-S5].
2. Walk left: while A[i] > key, shift A[i] right. Stop at an element ≤ key, or at the left boundary (i = 0).
3. Drop key into A[i+1].
4. Write the array after the pass.

✍️ One row per pass: `j | key | "16 > 4 shift, 7 > 4 shift, 2 < 4 insert" | array after`, plus counts if asked.

- **Counting:** a comparison is each `A[i] > key` test that is actually made (a stop at i = 0 makes no comparison).
  - D06-S6, 7 −5 2 16 4: **7 comparisons, 4 shifts**, result −5 2 4 7 16 ✅.
- **Best case:** **Ω(n)**, already sorted ascending (n − 1 comparisons, 0 shifts).
- **Worst case:** **O(n²)**, reversed order; F(n) = 1 + 2 + … + (n−1) = **n(n−1)/2** comparisons/movements [D06-S8].
- **Improvements** [D06-S9]: binary search cuts comparisons; a doubly linked list cuts movements. Neither makes the total better than O(n²).
- **Labels** [D06-S3]: comparison-based, internal, **stable**, adaptive, in-place.

### 2.6 PARTITION trace — Lomuto, 1-based as in the A2 sample [D07-S4, S5]

```
QUICKSORT(A, p, r)                PARTITION (A,p,r)
if  p< r                           x=A[r]
   then q←PARTITION(A, p, r)       i ← p -1
        QUICKSORT(A, p, q–1)       For  j ← p to r-1
        QUICKSORT(A, q+1, r)            do if A[j] <= x
                                              then i ← i + 1
                                                   exchange A[i] <-> A[j]
                                   Exchange A[i+1] <-> A[r]
                                   Return i+1
```
**Steps** (first call QUICKSORT(A, 1, n))
1. Margin: **p = 1, r = n, x = A[r]** (the **last** element), **i = p − 1 = 0, j runs from p = 1 to r − 1**.
2. For each j: if **A[j] ≤ x**, then i ← i + 1 and exchange A[i] ↔ A[j] (possibly with itself); otherwise nothing changes.
3. After the loop: **exchange A[i+1] ↔ A[r]** and **return q = i + 1**.
4. Check: everything left of q is ≤ x and everything right of q is > x. The loop makes **r − p comparisons**.

✍️ Layout (columns 1…n, as on the sheet):

| Row | Margin | 1 | 2 | 3 | 4 | 5 | 6 | Action |
|---|---|---|---|---|---|---|---|---|
| start | p = 1, r = 6, x = A[6] = 10, i = 0, j from 1 | 18 | 7 | 12 | 15 | 22 | 10 | |
| j = 1 | 18 ≤ 10? no | | | | | | | i = 0 |
| j = 2 | 7 ≤ 10? **yes** | **7** | **18** | 12 | 15 | 22 | 10 | i = 1, A[1] ↔ A[2] |
| j = 3, 4, 5 | 12, 15, 22 > 10 | | | | | | | i = 1 |
| exchange | A[i+1] = A[2] ↔ A[r] = A[6] | 7 | **10** | 12 | 15 | 22 | **18** | **q = 2** ✅ (your A2 sheet) |

**🪤 Traps** (the sample solution slipped on the first three; see §6)
- i starts at **p − 1 = 0** on a 1-based sheet (the sample wrote "J=0, I=−1").
- The final exchange is at **i + 1**, not i (the sample labelled it "i").
- The test is **≤**, not < (the sample wrote "A[j] < x"). With a key equal to the pivot the two tests give different arrays: see mock Q6.
- Stop after the first PARTITION if that is all the sheet asks for.

**0-based note.** If a table is numbered 0 … n−1, the same code runs with p = 0 and r = n − 1, so i starts at **−1** and j at **0**. That is where the sample's "J = 0, I = −1" comes from. Use whichever matches the column numbers printed on the sheet.

**Performance as taught** [D07-S11–S21]

| Situation | Recurrence | Result |
|---|---|---|
| Worst split (n−1 : 0); happens on **already sorted** input | T(n) = T(n−1) + T(0) + Θ(n) = T(n−1) + Θ(n) | **Θ(n²)** [S12] |
| Best split (halves) | T(n) ≤ 2T(n/2) + Θ(n) | **Θ(n log n)** by the "Main recurrence (Master) theorem" [S13] |
| Split in a fixed ratio, or alternating best/worst | — | Θ(n log n) [S14] |
| Median as pivot (found in O(n)) | T(n) = O(n) + O(1) + O(n) + 2T(n/2) | **O(n log n)** [S16] |
| (n/4)-th smallest as pivot | T(n) = O(n) + O(1) + O(n) + T(n/4) + T(3n/4) | **Θ(n log n)** [S18] |
| Sorted 1…n vs reversed n…1 | — | **T1 = T2** (both worst case) [S20] |
| Space | levels of the recursion tree | **O(log n)** balanced, **O(n)** unbalanced [S21] |

- Variants [D07-S6–S10]:
  - **Randomized:** swap A[RANDOM(p, r)] into A[r], then PARTITION. RANDOM(a, b) gives b − a + 1 values.
  - **Median-of-3:** pivot = middle value of three random positions, swapped to A[r].
  - **Median Method V2:** two pointers, i from the left and j from the right; swap when both stop; when they cross, swap A[i] with the last element.
- 🔎 Expected running time of randomized quicksort; the names "Lomuto" and "Hoare": Track B.

### 2.7 Merge sort trace [D08-S3–S11]

```
MERGESORT(A, p, r)
if  p< r
   then q← floor[(p+r)/2]
        MERGESORT(A, p, q)
        MERGESORT(A, q+1, r)
        MERGE(A,p,q,r)
```
**Steps**
1. Split at **q = ⌊(p + r)/2⌋**. The left half A[p..q] gets the extra element when the size is odd (p = 1, r = 7 gives q = 4, so 4 + 3).
2. Recurse until every piece has one element.
3. **MERGE** two sorted runs: repeatedly take the smaller front item (on a tie, **take from L**, because the test is `L[i] <= R[j]` [D08-S8]). When one run is used up, copy the rest of the other (the "merge the rest" strategy of D08-S6).
4. A merge of n1 + n2 items makes at most n1 + n2 − 1 comparisons.

✍️ The A2-sample grid: columns 1…n with "p = 1, r = 6, q = 3" in the margin. One row per split level down to single elements, then one row per merge back up, colour-boxing each block; final sorted row last. Your A2 sheet, 19 17 12 5 20 10 ✅:
```
index:      1    2    3   |   4    5    6
start:     19   17   12   |   5   20   10        p=1, r=6, q=3
divide:   [19   17] [12]  |  [5   20] [10]       q=2 · q=5
divide:   [19] [17]       |  [5] [20]            q=1 · q=4
merge:    [17   19]       |  [5   20]
merge:    [12   17   19]  |  [5   10   20]
merge:    [ 5   10   12       17   19   20]      final MERGE: 5 comparisons, then copy 20
```
- **Cost** [D08-S9, S11]: T(n) = O(1) + 2T(n/2) + O(n), which gives **Θ(n log n)** by the Master theorem (a = 2, b = 2, k = 1, p = 0 → 2(a)). *"There is no worst scenario as it works same for ascending or descending order."* So merge sort is **non-adaptive**.
- **Space** [D08-S10]: stack O(log n) + merge array O(n) = **O(n)**, so it is **out-place**. Labels [D06-S3]: comparison-based, external, **stable**.
- **Cost recipe** [D08-S13–S19]: total = (merge cost per level) × (number of levels):
  - n elements: O(n) · log n = **O(n log n)**;
  - log n sorted lists of size n/log n: O(n) · log log n = **O(n log log n)**;
  - n strings of length n: O(n²) · log n = **O(n² log n)**;
  - pieces of size k solved directly: O(n) · log(n/k) = **O(n log(n/k))**.

### 2.8 MAX-HEAPIFY / BUILD-MAX-HEAP / EXTRACT / HEAPSORT, 0-based tables [D09-S9–S22]

**Index formulas** [D09-S9]

| | 1-based (the pseudocode) | **0-based (every class table, A2)** |
|---|---|---|
| Left child | 2i | **2i + 1** |
| Right child | 2i + 1 | **2i + 2** |
| Parent | ⌊i/2⌋ | **⌈i/2⌉ − 1** |
| Leaves | ⌊n/2⌋+1 … n | **⌊n/2⌋ … n−1** (⚠️ the slide writes "to n") |
| BUILD loop | i = ⌊n/2⌋ downto 1 | **i = ⌊n/2⌋ − 1 downto 0** |

```
MAX-HEAPIFY(A,i)                              BUILD-MAX-HEAP(A)
  l=2i ; r=2i+1          (0-based: 2i+1, 2i+2)   A.heap-size = A.length
  If(l<=A.heap-size and A[l]>A[i]) largest=l     for(i=floor(A.length/2) downto 1*)
  else largest = i                                   MAX-HEAPIFY(A,i)
  If(r<=A.heap-size and A[r]>A[largest]) largest=r   *OR i=floor(A.length/2)-1 downto 0
  If(largest<>i)
      Exchange A[i] with A[largest]
      MAX-HEAPIFY(A,largest)          ← inside the If (see §6)
```
**BUILD-MAX-HEAP steps**
1. Write "For i → ⌊n/2⌋−1 to 0" ("non-leaf nodes, (n/2)−1 to 0", as the sample does).
2. For each i: write **i, L, R** in the margin; mark a child index ≥ heap-size with **(X)**; compare A[i] with the children that exist; swap with the **larger** child if it is bigger.
3. After a swap, **continue at the index the value moved to** ("heapify(5): L = 11 (X) → exit"). This recursive call belongs to the **same** loop iteration.
4. Write the full array after every swap; shade the final heap.

✍️ A2 sheet, 11 19 7 12 15 30 ✅:

| Row | Margin | 0 | 1 | 2 | 3 | 4 | 5 | Right margin |
|---|---|---|---|---|---|---|---|---|
| start | For i → 2 to 0 | 11 | 19 | 7 | 12 | 15 | 30 | non-leaf nodes (n/2)−1 to 0 |
| i = 2 | L = 5, R = 6 (X) | 11 | 19 | **30** | 12 | 15 | **7** | 7 < 30, swap; heapify(5): L = 11 (X), exit |
| i = 1 | L = 3, R = 4 | 11 | 19 | 30 | 12 | 15 | 7 | 19 ≥ 12, 15: exit |
| i = 0 | L = 1, R = 2 | **30** | 19 | **11** | 12 | 15 | 7 | largest R; heapify(2): L = 5, R = 6 (X), 11 ≥ 7, exit |
| **final** | | **30** | **19** | **11** | **12** | **15** | **7** | max-heap |

**HEAP-EXTRACT-MAX** [D09-S15] (0-based):
1. max = A[0];
2. A[0] ← A[heap-size − 1];
3. heap-size − 1;
4. MAX-HEAPIFY(A, 0);
5. return max. (Error "heap underflow" if heap-size < 1.)

Example: [7, 3, 6, 1, 2, 5, 4] → returns 7, heap **[6, 3, 5, 1, 2, 4]** ✅. D09-S20 draws the same thing as a "vacant" spot moving down.

**HEAP-SORT** [D09-S21, S22]: BUILD-MAX-HEAP; then for i = n−1 down to 1: exchange A[0] ↔ A[i], heap-size − 1, MAX-HEAPIFY(A, 0).
- The max is **parked at the right end**, so the output is **ascending** with a **max-heap**.
- D09-S22: 12 7 8 23 3 21 → heap [23, 12, 21, 7, 3, 8] → **3 7 8 12 21 23** ✅.
- Write one block per iteration "It-1 … It-(n−1)", with the sorted part shaded.

**Costs** [D09-S17, S21]: MAX-HEAPIFY O(log n) (O(h) at height h); EXTRACT O(log n); **BUILD O(n)** (at most ⌈n/2^(h+1)⌉ nodes of height h); HEAPSORT O(n) + (n−1)·O(log n) = **O(n log n)**, extra space **O(1)**, **unstable** [D06-S3, D10-S3]. 🔎 Why Σ ⌈n/2^(h+1)⌉·O(h) = O(n): Track B.

🪤 A single MAX-HEAPIFY(A, 0) on an arbitrary array does **not** build a heap: D09-S11 gives [6, 2, 7, 1, 3, 5, 4], where 7 sits above 6. BUILD works bottom-up for exactly this reason.

### 2.9 Bucket sort [D10-S6–S16]

```
Algorithm BucketSort( S )     ( values in S are between 0 and m-1 )
for j ← 0 to m-1 do  b[j] ← 0                 // initialize m buckets
for i ← 0 to n-1 do  b[S[i]] ← b[S[i]] + 1    // place elements in buckets
i ← 0
for j ← 0 to m-1 do                           // place elements back in S
    for r ← 1 to b[j] do  S[i] ← j ; i ← i + 1
```
**Steps**
1. One bucket per possible value 0 … m−1: *the values are the bucket indexes*, and **no comparisons** are made [D10-S7].
2. Scan and count (or enqueue).
3. Read buckets 0 → m−1 back into S.

✍️ Show the b[ ] array (or a row per element if asked), then the output. D10-S8: 4 2 1 2 0 3 2 1 4 0 2 3 0 with m = 5 gives b = [3, 2, 4, 2, 2] and 0 0 0 1 1 2 2 2 2 3 3 4 4 ✅.

- **Values vs entries** [D10-S12]: a bucket is a **counter** when you sort plain values, and a **queue** when you sort entries by key. A queue keeps equal keys in arrival order, which is the stability radix sort needs.
- **Cost** [D10-S13]: O(m) + O(n) + O(n) = **O(n + m)**, which is "O(n)" when m is small. When **m >>> n** (max 999999 needs 1 million buckets) it is **O(m)** [D10-S16].
- **Floats in 0.0–0.9** [D10-S14]: bucket = the first digit after the decimal point; each bucket is a list in increasing order; read buckets 0 → 9. 🔎 How the lists are kept sorted, and the O(n²) worst case listed on D10-S3: Track B.

### 2.10 Radix sort passes [D10-S17–S30]

**Steps** [D10-S18]
1. **p** = the number of digits of the **maximum** value. That is the number of passes.
2. Use 10 buckets (0–9), or 256 for byte characters.
3. Pass 1 uses the **rightmost (least significant)** digit, then move left. Short numbers get **leading zeros** (9 = 09 goes to bucket 0 in the tens pass).
4. In each pass, put each element in the bucket for the current digit, **in list order**, then collect buckets 0 → 9, **each in the order placed** (stable).

✍️ For each pass: the non-empty buckets with their contents in placement order, then "list after pass k".

- **Stability is required** [D10-S23]: equal digits must keep the order produced by earlier passes (52 before 58 after pass 1 must stay so in pass 2).
- 🪤 D10-S20 itself breaks this: in the input 99 comes before 9, so pass 1 must end "… 88, **99, 9**", not "… 88, 9, 99" (§6).
- **Cost** [D10-S24]: p passes × O(n) = **O(pn)**, which is O(n) for a fixed p. Max 999999 needs **10 buckets and 6 passes** [D10-S17, S24].
- **Words** [D10-S25, S29]:
  - 27 buckets (a–z plus blank);
  - read characters **right → left**;
  - **pad blanks at the end**;
  - the **blank bucket comes last**;
  - passes = the word-length limit.
  - Example: dart, fear, do, car → **car, dart, do, fear** ✅ (D10-S28–S30).
- Both bucket sort and radix sort are O(n) **only because of restrictions** on the input [D10-S26]; a comparison sort needs "at least" n log n [D10-S5] (⚠️ a lower bound is Ω).

### 2.11 Amortized analysis methods as taught [D11-S2–S11]

- **Definition:** analyse a *sequence* of operations to show the **average cost per operation is small** even if one operation is expensive. The average is taken over a **worst-case sequence**, and **no probability** is involved (unlike average-case analysis) [D11-S2, S3].
- **Three techniques** [D11-S4]:
  - **Aggregate:** total T(n) for n operations, then **T(n)/n**.
  - **Accounting:** give each operation type its own amortized cost (its own time plus what it pays in advance for future operations).
  - **Potential:** like accounting, but overcharge early operations to compensate for undercharges later. No worked example on the slides; 🔎 Track B.
- **Rule for any amortized costs:** *preserve the sum*, **Σ amortized cost ≥ Σ actual cost**.

**The three class scenarios, with the recipe for each**

| Scenario | Rule from the slide | Recipe | Result |
|---|---|---|---|
| k-th smallest with sort-once [D11-S6, S7] | first query sorts (n log n); later queries return A[k] (1 each) | total = n log n + (n − 1) ≤ n log n + n; divide by n | **≤ log n + 1 = O(log n)** per query (n = 8: 31/8 = 3.875 ✅) |
| Doubling the space, "puppies" [D11-S8–S10] | room left → 1; full → **1 (buy) + N (move) + 1 (add)** | list the cost of each add; expensive only at a doubling; average the totals | add costs 1, 3, 4, 1, 6, 1, 1, 1, 10, …; segment averages 1, 3, 2.5, **2.25**, 2.125, **2.0625** ✅ (⚠️ two slide totals are wrong, §6) |
| Stack PUSH / POP / MULTIPOP [D11-S11] | actual: 1, 1, **min(\|S\|, k)**; amortized: **2, 0, 0** | bookkeeping table with a running "credit" = Σ amortized − Σ actual ≥ 0 | total ≤ **2n**, so **O(1)** per operation |

✍️ **Stack bookkeeping table:** `# | op | size before | actual | amortized | size after | Σ actual | Σ amortized | credit`.
- The credit never goes negative, and it equals the number of items on the stack: each item prepaid its own pop.
- Conclude: "Σ actual ≤ Σ amortized ≤ 2n ⇒ amortized cost per operation ≤ 2 = O(1)".
- MULTIPOP pseudocode [D11-S11]: `While not stackEmpty(S) and k<>0 do POP S; k=k-1`.
- Used for hash tables, disjoint sets, splay trees [D11-S5]; 🔎 how, in Track B.

### 2.12 RB insert fix-up cases [D12-S6–S24]

**Properties** [D12-S6]:
1. root black;
2. NIL black;
3. a red node's children are black;
4. every path from v down to a nil has the same number **bh(v)** of black real nodes.

**Card** (the D12-S14 pseudocode, in the D12-S16–S22 wording):
```
BST-insert k as a RED node; x = k
repeat:
  x is the root ......................... colour x BLACK, stop
  parent p BLACK ........................ stop
  p RED, uncle u RED .................... CASE 1 (change colour): p,u → BLACK; g → RED; x = g; repeat
  p RED, uncle u BLACK (a NIL counts as black):
    p left of g,  x right of p  (Left-Right)   CASE 2: anticlockwise rotation at p; x = old p   → now Left-Left
    p left of g,  x left of p   (Left-Left)    CASE 3: clockwise rotation at g; swap colours of g and p; stop
    p right of g, x left of p   (Right-Left)   mirror CASE 2: clockwise rotation at p; x = old p → now Right-Right
    p right of g, x right of p  (Right-Right)  mirror CASE 3: anticlockwise rotation at g; swap colours of g and p; stop
finally: root → BLACK
```
- **Fast shape test:** a straight line x–p–g needs one rotation at g (Case 3); a bend needs a rotation at p first (Case 2), then Case 3.
- **Cost** [D12-S15]: O(lg n). Only Case 1 repeats (x moves two levels up). **At most 2 rotations** overall (⚠️ D12-S11 says "at most one"; use S15).
- **Rotation** [D12-S8]: left rotation at x = y moves up, x becomes y's left child, y's left subtree B becomes x's right subtree. The in-order sequence **A x B y C** is preserved.

✍️ After each insertion: one line per repair step (parent, uncle, shape → case → action), then the tree with every node marked R/B. Run the validity check (root black? red–red? equal black counts?) on the final tree.

**Class example** [D12-S24], insert 4 into 9B(3R(2B, 6B(5R, 7R)), 10B(–, 13R)) ✅:
- Case 1 at 4: 5, 7 → black; 6 → red; x = 6.
- Case 2: 6 is the right child of 3, 3 is the left child of 9, uncle 10 black → rotL(3); x = 3.
- Case 3: rotR(9); swap the colours of 9 and 6.
- Final: 6B(3R(2B, 5B(4R, –)), 9R(7B, 10B(–, 13R))). This is the starting tree of D13-S16.

### 2.13 RB delete cases: predecessor, Case 3(5) and the "Or" caveat [D13-S3–S18]

**Step 1: BST delete** [D13-S3–S6]
- A leaf is removed.
- A node with one child is replaced by that child.
- A node with **two children takes the value of its in-order PREDECESSOR**: `findLargestNode(TREE -> LEFT)`, i.e. go left once, then right as far as possible. The node keeps its own colour; the predecessor's old node is the one physically removed. That is the class algorithm [D13-S6]; D13-S5 also allows the successor, so **say which one you use**.

**Step 2** (rule sheet D13-S8; check in this order):
```
m = node physically removed
m RED ..................................... Case 1: just delete it                             [Terminal]
m BLACK with a RED child .................. Case 2: replace m by the child, colour it BLACK     [Terminal]
m BLACK, RED parent ("Or" rule) ........... swap colours of parent and sibling                 (terminal)
        ⚠️ ONLY if the sibling's two children are both BLACK (NIL counts); otherwise go to Case 3
otherwise m's place becomes DB (double black):
  3(1) DB is the root ..................... remove DB                                          [Terminal]
  3(2) sibling RED (parent BLACK) ......... swap colours parent↔sibling; rotate parent TOWARD DB; reapply
  3(3) sibling BLACK, both its kids BLACK . remove DB; sibling → RED; parent RED → BLACK [Terminal],
                                            parent BLACK → becomes DB (move up, reapply)
  3(4) sibling BLACK, far kid BLACK,
       near kid RED ....................... swap colours sibling↔near kid; rotate sibling AWAY from DB; → 3(5)
  3(5) sibling BLACK, far kid RED ......... swap colours parent↔sibling; rotate parent TOWARD DB;
                                            remove DB; far kid → BLACK                          [Terminal]
near kid = the sibling's child on DB's side; far kid = the other one.
TOWARD DB: DB is a left child → rotL(parent); DB is a right child → rotR(parent).
```
- ⚠️ **The "Or" shortcut caveat.** With a red parent and a sibling whose children are both black, the "Or" swap gives exactly the 3(3) result. If the sibling has a **red** child, the swap would put a red sibling over a red child (rule 3 breaks), so use 3(4) / 3(5) instead. Class example: deleting 52 in D13-S9 (sibling 28 has red children 14, 30) is **3(5)**, not the "Or" rule.
- ⚠️ D13-S8, S15 🙈 and S18 🙈 say "Apply **case 6**" at the end of 3(4); there is no Case 6. S12, S14 and S17 correct it to **case 3(5)**.
- 🪤 **Two different "Case 2"s:** insertion Case 2 is a rotation at the parent; deletion Case 2 is "black node with a red child". Name the deck when you write the case.

✍️ For each deletion:
1. "k has two children → copy predecessor p up (node keeps colour X); remove the old p node" (if needed);
2. one line per case with the colours that justify it (sibling, near/far child);
3. the tree after each case;
4. "[terminal]" where the fix-up stops.

**Class example** [D13-S16, Example C], from 6B(3R(2B, 5B(4R, –)), 9R(7B, 10B(–, 13R))) ✅:
- **Delete 9:** two children, so the predecessor 7 is copied up. The old 7 is a black leaf with a red parent, but sibling 10 has a red child 13, so the "Or" rule is unsafe → DB. DB is a left child and the far child 13 is red → **3(5)**: swap colours, rotL, remove DB, 13 → black.
- **Delete 3:** the predecessor 2 is copied up; the old 2 is a black leaf; sibling 5 has a red near child 4 and a black (NIL) far child → **3(4)**: swap 5 ↔ 4, rotR(5) → **3(5)**.
- **Delete 4:** the "Or" rule (sibling 5 has NIL children). **Delete 10:** the "Or" rule. **Delete 13:** Case 1. **Delete 2:** Case 2.
- Final tree: **6B(5B, 7B)**.
- With the successor the final tree is the same; only some cases differ.
- 🔎 The textbook deletion fix-up, and whether it has an "Or" shortcut: Track B.

---

## 3. Week map

The syllabus weeks against the 13 decks (261 slides). 🙈 = hidden slides in that deck (§6.2). "Mock" = the practice questions in §7 that drill the week.

| Wk | Syllabus theme | Decks (slides) | Skills to be able to do on paper | Recipe | Assignment | Mock | Notes file |
|---|---|---|---|---|---|---|---|
| 1 | Introduction to algorithms: definitions, design techniques, worst-/average-case analysis | **D01** Fundamentals (30; 🙈 S26–S29) · **D02** ADT & specification (16; 🙈 S5) | 5 properties, 7 techniques; W(n) = max{t(I) \| I ∈ Dₙ}; loop-invariant proof (init / maintenance / termination); fixed vs variable space; optimality; ADT vs data structure; spec = prototype + pre + post; stack/queue/PQ/union-find | §4.2 | — | Q13 S1 | Week 1 |
| 2 | Analyzing recurrences: model, asymptotic notations, recurrence equations, recursion trees, **Master theorem** | **D03** Asymptotic notations (29) · **D04** Recursive running times (14; 🙈 S13) · **D05** Master theorem (7; 🙈 S7) | c and n₀ for O/Ω/Θ; incorrect bounds; o/ω analogy; step counts; `demo(n)` → recurrence; back substitution; recursion tree; both Master forms with boxes | §2.1–2.4, §4.1, §4.4, §5 | **A1** (all 4 Qs) | Q1–Q4, Q13 S2 | Week 2-3 |
| 3 | ADTs and sorting: basic data structures, ADTs; **insertion sort**; divide & conquer; **quicksort** | **D06** Insertion sort (10) · **D07** Quicksort (22) (· D02 for ADTs) | insertion-sort passes and counts; D06-S3 classification table; PARTITION trace; quicksort best/worst recurrences and pivot variants | §2.5, §2.6, §4.6 | **A2** Q2 (missed) | Q5, Q6, Q13 S3 | Week 3-4 |
| 4 | Comparison sorts: **merge sort, heapsort**; compare sorts on the same data | **D08** Merge sort (20) · **D09** Heap sort (24) | merge-sort grid and MERGE steps; cost recipes; heap index formulas; BUILD-MAX-HEAP table; extract-max; heapsort iterations | §2.7, §2.8 | **A2** Q1, Q3 (missed) | Q7, Q8, Q13 S4 | Week 3-4 · Week 4-5 |
| 5 | Non-comparison sorts and amortization: **bucket, radix**; **amortized analysis** | **D10** Bucket & radix (31; 🙈 S4) · **D11** Amortized (11) | bucket counts; radix passes (numbers and words) with stability; aggregate / accounting / potential; the three class scenarios | §2.9–2.11 | — | Q9, Q10 | Week 4-5 · Week 5-7 |
| 6 | Dynamic sets 1: **red-black trees**: search, insertion, deletion | **D12** RB trees (27) | 4 properties, bh, rotations, insertion Cases 1–3 and mirrors | §2.12, §4.8 | — | Q11 | Week 5-7 |
| 7 | Dynamic sets 2: RB-tree operations; **RB vs AVL vs B-trees** | **D13** RB deletion (20; 🙈 S15, S18) · D12-S3–S5 | BST delete with the predecessor; deletion Cases 1, 2, "Or", 3(1)–3(5); AVL/RB/B-tree comparison | §2.13, §4.9 | — | Q12, Q13 S5 | Week 5-7 |
| **8** | **MIDTERM** (weeks 1–7) | | | | | | |

- The weekly notes files are in `notes-by-week/`. Their names give the week ranges used above ("Week 1", "Week 2-3", "Week 3-4", "Week 4-5", "Week 5-7").
- The syllabus places ADTs in week 3, while the notes cover D02 together with D01 in "Week 1". Either way, D02 is midterm material.

---

## 4. Definitions & formula sheet

### 4.1 Asymptotic notation [D03-S7–S21]

> **O(g(n)) = {f(n) : ∃ positive constants c and n₀, such that ∀n ≥ n₀, we have 0 ≤ f(n) ≤ cg(n)}**: g is an **asymptotic upper bound** [D03-S10]
>
> **Ω(g(n)) = {f(n) : ∃ positive constants c and n₀, such that ∀n ≥ n₀, we have 0 ≤ cg(n) ≤ f(n)}**: g is an **asymptotic lower bound** [D03-S12]
>
> **Θ(g(n)) = {f(n) : ∃ positive constants c₁, c₂, and n₀, such that ∀n ≥ n₀, we have 0 ≤ c₁g(n) ≤ f(n) ≤ c₂g(n)}**: g is an **asymptotically tight bound** [D03-S13]

| | Θ | O | Ω | o | ω |
|---|---|---|---|---|---|
| Analogy f ↔ g ≈ a ↔ b [S19] | a = b | a ≤ b | a ≥ b | **a < b** | **a > b** |
| Transitivity [S20] | ✓ | ✓ | ✓ | ✓ | ✓ |
| Reflexivity f R f [S20] | ✓ | ✓ | ✓ | not listed | not listed |
| Symmetry [S21] | f = Θ(g) iff g = Θ(f) | | | | |
| Complementarity [S21] | | f = O(g) iff g = Ω(f) | | f = o(g) iff g = ω(f) | |

- **Theorem** [D03-S17]: f(n) = Θ(g(n)) **iff** f(n) = O(g(n)) and f(n) = Ω(g(n)). So Θ(g) = O(g) ∩ Ω(g).
- "Running time is O(f(n))" means the **worst case** is O(f(n)); "Running time is Ω(f(n))" means the **best case** is Ω(f(n)) [D03-S18].
- The five notations are Θ, O, Ω, o, ω, defined for functions over the natural numbers [D03-S9]. Technically f(n) ∈ Θ(g(n)); the older "=" is accepted. f and g are nonnegative for large n [D03-S14].
- **Asymptotic complexity:** the running time as a function of n **for large n**, written with only the **highest-order term** [D03-S8].
- **Model of computation:** a processor (with an instruction set) plus memory (a collection of locations). It fixes which operations are allowed and what each costs, so T(n) describes the **algorithm, not the machine**. T(n) is the maximum time on any instance of size n [D03-S3, S6].
- 📝 Notes on constants [D03-S11, S12]: any valid (c, n₀) is correct. Prefer a small c for O and a large c for Ω. Drop negative terms for O; "pay" for them with part of the leading term for Ω.
- In decks 04–05, **"0(n)" written with the digit zero means O(n)**, and "ϴ" means Θ.
- 🔎 Formal definitions of o and ω: Track B.

### 4.2 Week 1 essentials [D01, D02]

| Term | As taught | Ref |
|---|---|---|
| Computer algorithm | "a detailed step-by-step method for solving a problem by using a computer" | D01-S2 |
| 5 properties | **Finiteness, Unambiguous, Definiteness of sequence, Input/Output defined, Feasibility** (F-U-D-I-F) | D01-S2 |
| 7 design techniques | Divide & Conquer, Greedy Method, Branch & Bound, Backtracking, Dynamic Programming, Brute Force, Randomized | D01-S3 |
| Problem-solving template | Problem → Strategy → Algorithm (Input, Output, Step) → Analysis (Time & Space, Optimality, Correctness) → Implementation → Verification | D01-S4 |
| Basic operation | an operation fundamental to the problem; the total work is roughly proportional to the number of basic operations | D01-S17 |
| Worst-case complexity | **W(n) = max{t(I) \| I ∈ Dₙ}**: Dₙ = the inputs of size n, t(I) = the basic operations on input I. "The input, I, for which an algorithm behaves worst depends on the particular algorithm." | D01-S18 |
| Class W(n) results | sequential search **n** (K last or absent) · binary search on a sorted array **⌈lg(n+1)⌉**, "optimal" · findMax **W_A(n) = n − 1** for every input 🙈 | D01-S8, S9, S29 |
| Correctness | if the preconditions are satisfied, the postconditions are true when the algorithm terminates | D01-S10 |
| Loop invariant | a boolean property aligned with the goal; show **Initialization** (true before the first iteration), **Maintenance** (true before one iteration ⇒ true before the next), **Termination** (invariant + reason for stopping ⇒ a useful property) | D01-S12 |
| Class invariants | get_max: "max is the maximum value in a[0..i-1]"; linear search: "if x is present in the array A, then it is present in the subarray A[i:n]", finished with the **contrapositive** "if A then B" ≡ "if not B then not A" | D01-S13–S16 |
| Space | **fixed part** (independent of problem size) + **variable part** (depends on it); "Generally we do Time and Space Tradeoff" | D01-S19 |
| Optimal 🙈 | no algorithm in the class under study performs fewer operations in the worst case; "best possible", not "best known". Show it: find W_A(n), prove a lower bound W_[A](n) for the whole class, check whether they are equal | D01-S26, S27 |
| ADT | a set of objects sharing the same properties (**data**) and behaviours (**operations**); couples data and operations. **Abstraction:** hide implementation details. A **data structure** is the physical implementation of an ADT | D02-S2 |
| Logical vs physical form | ADT = logical form = **what** (data and operations); data structure = physical form = **how** (arrays, pointers, linked nodes) | D02-S3 |
| ADT in code 🙈 | Structures (data structure declarations) + Functions (operation definitions); identified as a Class in C++/Java | D02-S5 |
| Specification of an operation | **calling prototype** (name; parameters and their types; return value and its type) + **preconditions** (assumed true when called) + **postconditions** (assumed true when it returns) | D02-S6 |
| Kinds of operations | **constructor** (creates an object, returns a reference) · **access function** (returns information, does not modify) · **manipulation procedure** (modifies, returns no information); **state** = current values of the data; **recursive ADT** = an access function returns the same class | D02-S7 |
| List ADT | `cons` (constructor; post: new object, ≠ nil, first = newElement, rest = oldList), `first` / `rest` (access functions; pre: aList ≠ nil), `nil` | D02-S8 |
| Binary tree | empty, or a root plus two disjoint binary trees L and R. At most **2^d** nodes at depth d; n nodes ⇒ height ≥ **⌈lg(n+1)⌉ − 1**; height h ⇒ at most **2^(h+1) − 1** nodes | D02-S9 |
| Stack / Queue | stack: insert and delete at the **top**, **LIFO** · queue: insert at the rear, delete at the front, **FIFO** | D02-S10, S11 |
| Priority queue | order by priority, not arrival; only the most important element can be inspected or removed (cost view: smallest; profit view: largest) | D02-S12 |
| Union-Find / Dictionary | Union merges two disjoint sets (the new id is s or t); Find returns the set id (the **leader**) · Dictionary: identifier + associated information, no order implied | D02-S13–S15 |

### 4.3 Math toolkit [D01-S20–S25]

- **Sets:** e ∈ S; ∅ ⊆ S; S ∩ T = {x | x ∈ S **and** x ∈ T}; S ∪ T = {x | x ∈ S **or** x ∈ T}; an n-element set has **2ⁿ** subsets and **C(n, k) = n!/((n−k)!k!)** subsets of size k.
- **Inequalities:** transitivity (A ≤ B, B ≤ C ⇒ A ≤ C); addition (A ≤ B, C ≤ D ⇒ A + C ≤ B + D); positive scaling (A ≤ B, α > 0 ⇒ αA ≤ αB).
- **Floor and ceiling:** ⌊x⌋ = the largest integer ≤ x; ⌈x⌉ = the smallest integer ≥ x. So ⌊−2.7⌋ = −3 and ⌈2.1⌉ = 3.
- **Logs** (b > 1, x > 0):
  - log_b x = L ⇔ b^L = x;
  - log_b 1 = 0; log_b b = 1; log_b x^a = a·log_b x; log_b(xy) = log_b x + log_b y;
  - x^(log y) = y^(log x);
  - **change of base:** log_c x = log_b x / log_b c.
  - log is strictly increasing and one-to-one. "lg" behaves as log₂.

| Series | Formula [D01-S25] |
|---|---|
| Arithmetic | Σ_{i=1..n} i = **n(n+1)/2** |
| Squares | Σ_{i=1..n} i² = **(2n³ + 3n² + n)/6 ≈ n³/3** |
| General polynomial | Σ_{i=1..n} i^k ≈ **n^(k+1)/(k+1)** |
| Power of 2 (starts at **i = 0**) | Σ_{i=0..k} 2^i = **2^(k+1) − 1** |
| Arithmetic-geometric | Σ_{i=1..k} i·2^i = **(k − 1)2^(k+1) + 2** |

### 4.4 Recurrence results to memorize [D04-S10–S12 = D05-S4]

| Decreasing recurrence | Slide answer | Dividing recurrence | Slide answer |
|---|---|---|---|
| c + T(n−1), 1 + T(n−1) | O(n) | T(n/2) + 1 | O(log n) |
| n + T(n−1) | O(n²) | T(n/2) + n | O(n) |
| n² + T(n−1) | O(n³) | 2T(n/2) + n | O(n log n) |
| log n + T(n−1) | O(n log n) | 2T(n/2) + cn² | n² (max. work at the **root**) |
| 2T(n−1) + c | O(2ⁿ) | 2T(n/2) + cn | n log n (**equal** at all levels) |
| 3T(n−1) + 1 | O(3ⁿ) | 2T(n/2) + c | n (max. work at the **leaves**) |
| 2T(n−1) + n | O(n·2ⁿ) (✅ true growth Θ(2ⁿ)) | c + 2T(n/2), T(1) = c | O(n): exactly c(2n − 1) [D04-S9] |
| 2T(n−1) + log n | O(log n·2ⁿ) (✅ true growth Θ(2ⁿ)) | | |

The decreasing rule behind the left column: **a = 1 → n·f(n); a > 1 → f(n)·a^(n/b)** [D05-S3].

### 4.5 Complexities as taught

**D10-S3: time complexity comparison (array)**

| Algorithm | Best | Average | Worst | Space |
|---|---|---|---|---|
| Quicksort | O(n log n) | O(n log n) | O(n²) | O(n) / O(log n) |
| Mergesort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Heapsort | O(n log n) | O(n log n) | O(n log n) | O(1) |
| Bubble sort | O(n) | O(n²) | O(n²) | O(1) |
| Insertion sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection ("Select") sort | O(n²) | O(n²) | O(n²) | O(1) |
| Bucket sort | O(n+k) | O(n+k) | O(n²) | O(nk) |
| Radix sort | O(nk) | O(nk) | O(nk) | O(n+k) |

- ⚠️ k is not defined on this slide. Read it as m (the number of buckets) for bucket sort and as p (the number of digits) for radix sort, matching D10-S13 and S24.
- ⚠️ This table writes every best case with O, while D06-S8 writes insertion sort's best case as **Ω(n)**. Use Ω when asked for a best-case *bound* in the notation of D03-S18.
- 🔎 Why bucket sort's worst case is O(n²): Track B.

**D10-S4 🙈 (hidden slide): worst-case auxiliary space.** Quicksort O(n) · Mergesort O(n) · Heapsort O(1) · Bubble / Insertion / Selection O(1) · Bucket O(nk) · Radix O(n+k).

**D09-S3: operations on data structures** (as printed; the ⚠️ marks are explained in §6)

| Structure | Insert | Search | Find minimum | Delete (min) |
|---|---|---|---|---|
| Unsorted array | O(1) | O(n) | O(n) | O(n) |
| Sorted array | O(n) | O(log n) | O(1) | O(n) |
| Unsorted linked list | O(1) | O(n) | O(n) | O(n) |
| Heap (min) | O(log n) | O(log n) ⚠️ | O(1) | O(1) ⚠️ (extract is O(log n) on D09-S17) |

**Per-algorithm facts stated in the decks**

| Algorithm | Best | Worst | Other facts | Ref |
|---|---|---|---|---|
| Insertion sort | **Ω(n)**, already sorted | **O(n²)**, reversed; F(n) = n(n−1)/2 | binary search / doubly linked list still O(n²) | D06-S8, S9 |
| Quicksort | **Θ(n log n)**, balanced splits | **Θ(n²)**, already sorted (n−1 : 0 splits) | space O(log n) balanced / O(n) unbalanced; T1 = T2 for sorted vs reversed | D07-S12–S21 |
| Merge sort | **Θ(n log n)** | **Θ(n log n)**: "no worst scenario" | space O(n) (stack O(log n) + merge O(n)); out-place | D08-S9–S11 |
| Heap procedures | MAX-HEAPIFY **O(log n)** (O(h) at height h), EXTRACT **O(log n)**, BUILD **O(n)** | HEAPSORT **O(n log n)** | in place, O(1) extra | D09-S17, S21 |
| Bucket sort | **O(n + m)**, "O(n)" for small m | **O(m)** when m >>> n | no comparisons | D10-S13, S16 |
| Radix sort | **O(pn)**, p = number of digits | O(n) for a fixed p | needs stable passes | D10-S24 |
| Comparison sorting | — | "at least" n log n operations | ⚠️ written "at least O(n log n)"; a lower bound is Ω | D10-S5 |

### 4.6 Sorting classification [D06-S3]: learn it by heart

| Category | Examples on the slide |
|---|---|
| Comparison based | insertion, merge, bubble, quick |
| Non-comparison based | bucket, radix, counting |
| Internal | bubble, insertion |
| External | quick, merge |
| **Stable** | **merge, insertion, bubble** |
| **Unstable** | **quick, heap, selection** |
| Adaptive ("sorted or unsorted data" matters) | bubble, insertion, quick |
| Non-adaptive | selection, merge, heap |
| In-place / out-place | among the comparison sorts, **only merge sort is out-place**; **all** non-comparison sorts are out-place |

- The slide gives examples only, no definitions. 🔎 Formal definitions of internal/external, stable and adaptive (and why the slide lists quicksort as "external"): Track B.

### 4.7 Trees and heaps [D09-S4–S10]

- **Full** binary tree: every node has 0 or 2 children. **Complete**: every level is full except possibly the last, which is filled as far left as possible. **Perfect**: both full and complete [D09-S4].
- **Heap** = (1) **heap structure**: T is complete and all leaves are at depth h or h−1; plus (2) the **partial order tree property**: "the key at any node is greater than or equal to the keys at each of its children" (max-heap) [D09-S7].
- Height (log n); a complete tree of height h has at most **2^(h+1) − 1** nodes; "every node is heap in itself"; a descending array is a max-heap, an ascending array is a min-heap [D09-S9, S10].
- Index formulas and the BUILD loop range: §2.8.

### 4.8 Red-black trees [D12-S2–S26]

- **Definition** [D12-S2]: a **self-balancing** BST in which each node has an extra attribute, its colour (RED or BLACK). Invented in 1972 by Rudolf Bayer as "symmetric binary B-Trees". The colouring keeps the **longest root-to-leaf path at most twice the shortest**.
- **The four properties** [D12-S6]:
  1. ***Root*** is always black.
  2. ***Nil*** is considered black (so every real node has two children).
  3. ***Black Children Rule***: the children of each red node are black (no red–red).
  4. ***Black Height Rule***: *"For each node v, there exist an integer bh(v) such that each downward path from v to a nil has exactly bh(v) black real (ie non nill) nodes."*
- **bh by the slide's wording:** count v itself if it is black. The D12-S7 tree has bh(root) = 2. 🔎 Textbook counting convention: Track B.
- **Insertion** [D12-S9–S15]:
  - the new node is **red**;
  - the only possible violations are "the new node is the root" and "the parent is red";
  - the fix is decided by the node's **position relative to its grandparent** and the **uncle's colour**: a red uncle means recolour, a black uncle means rotations;
  - cost **O(lg n)**, at most 2 rotations.
  - Cases: §2.12.
- **Deletion:** cases in §2.13. The terminal cases are Case 1, Case 2, the "Or" rule, 3(1) and 3(5); 3(3) is terminal only with a red parent; 3(2) and 3(4) always continue.
- **D12-S26 exercises ✅:**
  - The complete BST on 1…15 can be coloured with bh = 2 (levels B R B R), 3 (B B B R) and 4 (all black).
  - Making a red root black **keeps** it a red-black tree: every root-to-nil path gains exactly one black node.

### 4.9 AVL vs RB vs B-tree, as on the slides [D12-S3–S5]

| Parameter | AVL tree | RB tree |
|---|---|---|
| Balance | **more strictly** balanced: the balance factor of every node is at most 1 (height-balanced) | **less strict**: approximately balanced by colours and properties |
| Insertion / deletion | **more rotations**, so slower updates | **fewer rotations**, so better for dynamic data (databases, file systems) |
| Performance | best when **reads far outnumber writes** (faster look-ups) | preferred for **frequent insertions/deletions**; mixed workloads; real-time systems |
| Code | more complex balance code, more room for bugs | easier to implement, maintain and debug |

| (D12-S5) | Red-Black tree | AVL tree | B-tree |
|---|---|---|---|
| Tree type | self-balancing BST | self-balancing BST | multi-way (N-ary) tree |
| Children | at most 2 | at most 2 | multiple |
| Self-balancing | rotations, but **recolours first** (red ↔ black) | balance factor −1, 0 or 1; BF = height(left) − height(right) (or right − left) | minimum degree **t** (depends on the disk block size); every node except the root has at least **t − 1** keys; the root may have 1 key |
| Height (as printed) | log(N), "N = depth of the RB tree in terms of black nodes" | log(N), N = number of nodes | log(M·N), M = order, N = nodes; also h ≤ ⌈log_⌈m/2⌉((n+1)/2)⌉ − 1 |

- One-line exam answer: **read-heavy → AVL; many inserts and deletes → RB; disk-block storage → B-tree.**
- ⚠️ The height row of D12-S5 is internally inconsistent (§6). 🔎 Correct height bounds: Track B.

### 4.10 Amortized analysis [D11]

| Term | As taught |
|---|---|
| Amortized analysis | the average cost per operation over a **worst-case sequence**; one operation may be expensive; **no probability** involved [S2, S3] |
| vs average case | average case averages over all inputs, with probability; amortized analysis *guarantees* the time per operation [S3] |
| Aggregate / Accounting / Potential | T(n)/n · each operation gets its own amortized cost · like accounting, but overcharge early operations to pay for later ones [S4] |
| Amortized bound | **Σ amortized cost ≥ Σ actual cost** ("preserve the sum") [S4] |
| Where it is used | hash tables, disjoint sets, splay trees; whenever the first set of inputs affects the next [S5] |
| Class scenarios | k-th smallest with sort-once → O(log n) per query; doubling space → constant average; stack PUSH/POP/MULTIPOP → amortized 2/0/0, O(1) per operation [S6–S11] |

---

## 5. All 14 Master-theorem examples (D05-S6)

The slide gives the recurrences and the [a, b, k, p] values, but **no answers**. A1 Q3 copied #1 and #5 word for word, so expect this list.

- The answers below follow the D05-S5 rules.
- ✅ For each Θ answer, a script computed T(n)/Ans at n = b^m for m = 10, 100, 1000, 10000 (T(1) = 1, f(n) = n^k log₂^p n). A ratio that settles to a constant confirms the Θ.

| # | Recurrence | [a, b, k, p] (slide) | a vs b^k | Case | **Ans** | ✅ T/Ans at m = 10 → 10⁴ |
|---|---|---|---|---|---|---|
| 1 | T(n) = 4T(n/2) + n² | [4, 2, 2, 0] | 4 = 2² | **2(a)** (p = 0 > −1) | **Θ(n² log n)** | 1.10 → 1.00 |
| 2 | T(n) = T(n/2) + n² | [1, 2, 2, 0] | 1 < 4 | **3(a)** (p = 0 ≥ 0) | **Θ(n²)** | 1.333 (= 4/3) |
| 3 | T(n) = 2ⁿT(n/2) + nⁿ | [Not applicable] | — | — | **Not applicable** (the slide says so) | — |
| 4 | T(n) = 14T(n/4) + n | [14, 4, 1, 0] | 14 > 4 | **1** | **Θ(n^(log₄ 14)) ≈ Θ(n^1.904)** | 1.40 |
| 5 | T(n) = 2T(n/2) + n log n | [2, 2, 1, 1] | 2 = 2 | **2(a)** (p = 1) | **Θ(n log² n)** | 0.56 → 0.50 |
| 6 | T(n) = 2T(n/2) + n/log n | [2, 2, 1, −1] | 2 = 2 | **2(b)** (p = −1) | **Θ(n log log n)** | 1.18, 0.93, 0.85, 0.81 (bounded; settles slowly) |
| 7 | T(n) = 2T(n/4) + n^0.51 | [2, 4, 0.51, 0] | 2 < 4^0.51 ≈ 2.028 | **3(a)** | **Θ(n^0.51)** | 10.3 → 72.6 |
| 8 | T(n) = 0.5T(n/2) + 1/n | [0.5, 2, −1, 0] | — | — | ⚠️ **Not applicable** (a < 1, k < 0) | T(n) = (log₂ n + 1)/n → 0 |
| 9 | T(n) = 6T(n/3) + n² log n | [6, 3, 2, 1] | 6 < 9 | **3(a)** (p = 1) | **Θ(n² log n)** | 2.41 → 3.00 |
| 10 | T(n) = 64T(n/8) − n² log n | [64, 8, 2, 1] | (64 = 8²) | — | ⚠️ **Not applicable** (driving function negative) | T(8) = −128 |
| 11 | T(n) = 7T(n/3) + n² | [7, 3, 2, 0] | 7 < 9 | **3(a)** | **Θ(n²)** | 4.22 → 4.50 |
| 12 | T(n) = 4T(n/2) + log n | [4, 2, 0, 1] | 4 > 2⁰ = 1 | **1** | **Θ(n²)** | 1.444 |
| 13 | T(n) = 2^(1/2)·T(n/2) + n² log n | [√2, 2, 2, 1] | 1.414 < 4 | **3(a)** (p = 1) | **Θ(n² log n)** | 1.46 → 1.547 |
| 14 | T(n) = 2T(n/2) + n^(1/2) | [2, 2, ½, 0] | 2 > √2 ≈ 1.414 | **1** | **Θ(n)** | 3.34 → 3.414 |

**Case coverage:** Case 1: #4, #12, #14 · 2(a): #1, #5 · 2(b): #6 · 3(a): #2, #7, #9, #11, #13 · not applicable: #3, #8, #10. **No example uses 2(c) or 3(b)**. For practice, 2T(n/2) + n/log² n is 2(c) → Θ(n) ✅ (W2-3 P5, guide P8b).

**Notes on the tricky ones**
- **#3:** the slide itself prints "[Not applicable]". The reason: a = 2ⁿ is not a constant, and nⁿ is not of the form n^k log^p n.
- **#7:** a close call. 4^0.51 ≈ 2.028 is just above 2, so this is Case 3, not Case 2. Equivalently, log₄ 2 = 0.5 < k = 0.51. The big constant (72.6) comes from a and b^k being so close.
- **#8** ⚠️: the slide prints [a = 0.5, b = 2, k = −1, p = 0] but does **not** say "Not applicable".
  - Yet a = 0.5 breaks the slide's own condition **a ≥ 1**, and k = −1 breaks **k ≥ 0** [D05-S5].
  - ✅ With T(1) = 1, T(n) = (log₂ n + 1)/n, which shrinks to 0, so it cannot be a running time.
  - ✍️ Write: "Not applicable: a = 0.5 < 1 and k = −1 < 0".
- **#10** ⚠️: the slide prints [64, 8, 2, 1], which *looks like* Case 2(a) because 64 = 8².
  - But the driving function −n² log n is **negative**. The professor's own speaker note on this slide says the theorem requires a **strictly positive** driving function, because time cannot be negative [D05-S6 📝].
  - ✅ With T(1) = 1, T(8) = 64 − 192 = −128.
  - ✍️ Write: "Not applicable: f(n) < 0".
- **#12:** log n = n⁰·log¹ n, so k = 0, p = 1, and b^k = 1 < a = 4.
- **#13:** a = 2^(1/2) = √2 (the raw text export shows "21/2").
- **#14:** n^(1/2) = √n, so k = ½ and b^k = √2.
- **Case 3(b)** ⚠️ (D05-S5/S6: a < b^k, p < 0 ⇒ Θ(n^k)): the numbers show this is an **upper bound only**.
  - ✅ T(n) = 2T(n/2) + n²/log n: T/n² = 0.233, 0.020, 0.0020, 0.0002 → 0, while T/(n²/log n) → **2.00**.
  - ✅ T(n) = 3T(n/2) + n²/log n behaves the same way: T/(n²/log n) → **4.0**.
  - So the true growth is n^k·log^p n, smaller than n^k by a log factor.
  - ✍️ On the exam, give the class answer "Case 3(b) ⇒ Θ(n^k)" and add "(upper bound)" if you can. 🔎 The precise statement of this case: Track B.
- The last line of the theorem on D05-S5/S6 is labelled **"b)a)"**: a typo for "b)".

---

## 6. Traps & slide errors

Consolidated from the five notes files and the assignments guide. Where a slide is wrong, **write the correct version, and mention the slide's version if the question is about that slide**.

### 6.1 Errors that can change an exam answer

| # | Where | The slide says | Correct reading | ✍️ In the exam |
|---|---|---|---|---|
| 1 | **D05-S5, S6: case 3(b)** | a < b^k, p < 0 ⇒ Θ(n^k) | ✅ only an **upper bound**: the true growth is n^k·log^p n (§5) | give the class answer Θ(n^k), and add "(upper bound)" |
| 2 | D05-S6 **#8** | [a = 0.5, b = 2, k = −1, p = 0], not marked N/A | breaks a ≥ 1 and k ≥ 0 | "Not applicable" |
| 3 | D05-S6 **#10** | [64, 8, 2, 1], not marked N/A | the driving function is negative (speaker note: it must be strictly positive) | "Not applicable" |
| 4 | D05-S2 | one condition line "b > 1" for both forms | the n−b (decreasing) form needs **b ≥ 1** (as D05-S3/S4 say); every T(n−1) example has b = 1 | b > 1 for n/b, b ≥ 1 for n−b |
| 5 | **D13-S8 rule sheet: the "Or" rule** | "Or if the Node to be deleted is BLACK & has RED parent ⇒ swap the color of Parent & Sibling (terminal)" | ✅ safe **only if both of the sibling's children are black** (then it equals Case 3(3)). If the sibling has a red child, the swap makes red-over-red | use 3(4)/3(5) instead, e.g. D13-S9 "delete 52" is **3(5)** |
| 6 | **D13-S8** (also S15 🙈, S18 🙈) | Case 3(4) ends "→ Apply case 6" | there is no Case 6; S12, S14 and S17 print "Apply case **3(5)**" | write 3(5) |
| 7 | **D13-S13 tree** | the starting tree for "delete 30, 45, 10, 12, 35" | ✅ **not a valid RB tree**: rule 4 fails at 10 (10 → 5 → 2 → nil has 2 black nodes, 10 → nil on the right has 1; from the root, 3 vs 2) | say so if asked "is it valid?". Deleting 10 (Case 2) repairs it; the other deletions are unaffected |
| 8 | **D11-S9 puppy table** | segment totals 10 (avg 2.5) and 34 (avg 2.125) | ✅ **9 (avg 2.25)** and **33 (avg 2.0625)**; also, the last column (N = 32, full) costs 1 + 32 + 1 = **34**, not 1 | use the corrected numbers; the conclusion (small constant average) stands |
| 9 | D10-S20 / S22 (radix, pass 1) | "… 88 9 99" | ✅ 99 precedes 9 in the input and both have ones digit 9, so the stable pass gives "… 88 **99 9**" | collect in placement order; the final result is unchanged |
| 10 | D09-S3 (Heap(min) row) | Delete (Min) O(1); Search O(log n) | extracting the root is **O(log n)** [D09-S17]; nothing in the deck supports a heap search in O(log n) (🔎) | reproduce the table if asked for *the table*; otherwise extract = O(log n) |
| 11 | D12-S11 | "at most one rotation is sufficient" | D12-S15: **at most 2 rotations overall** (Case 2 then Case 3, as on D12-S24) | "at most 2 rotations" |
| 12 | D04-S11 | 2T(n−1) + n ⇒ O(n2ⁿ); 2T(n−1) + log n ⇒ O(log n·2ⁿ) | ✅ valid but loose: both are Θ(2ⁿ) | give the slide's O answers; they are what the D05-S3 rule produces |
| 13 | D03-S4 vs S5 | a 1-D array operation = 2 steps, yet `A[I]=B[I]+C[I]` = 4 steps | the two conventions disagree | use the slide numbers 3 / 4 / 4; ask if unsure |
| 14 | D10-S5 | comparison sorting needs "at least O(n log n)" | a lower bound is written with **Ω** [D03-S12] | say "Ω(n log n) comparisons" if you restate it |
| 15 | D09-S13 | the last label in the i = 0 block reads "Exit-heapify(A,**4**)" | after swap A[2] ↔ A[6] the call is heapify(A, **6**); the earlier "i = 4, l = 9, r = 10 (X), Exit-heapify(A,4)" in the i = 1 block **is** correct (checked on the slide image) | always exit at the index the value moved to |

### 6.2 Hidden slides 🙈: the complete list (checked in the .pptx files)

| Slide | Content | Status |
|---|---|---|
| **D01-S26, S27** | Optimality: "best possible", W_A(n) vs W_[A](n) procedure | in the file, so study it |
| **D01-S28, S29** | findMax example, W_A(n) = n − 1 | in the file |
| **D02-S5** | ADT notation (i ∈ T, e ∈ S, o ∈ C); Structures + Functions; ADT = Class | in the file |
| **D04-S13** | "Related contents" links only | no content |
| **D05-S7** | video link only | no content |
| **D10-S4** | **space complexity comparison table** (Quicksort O(n), Mergesort O(n), Heapsort O(1), …) | in the file; ⚠️ the Week 4-5 notes cite it without the 🙈 flag |
| **D13-S15, S18** | duplicates of the rule sheet + tree (they still say "Apply case 6") | duplicates |

Hidden slides may have been skipped in class, but they are in the decks you were given.

### 6.3 Slips in the professor's A2 sample solution (every array and final answer is correct ✅)

| # | Where | The sample writes | Correct |
|---|---|---|---|
| 1 | Q1 heap, i = 1 row, right margin | "i=3 exit" | "**i = 4**, L = 9, R = 10 (X) → exit": continue at the index where 9 moved (R = 4) |
| 2 | Q2 PARTITION margin | "initially J=0, I=−1" | on the 1…6 sheet: **i = p − 1 = 0, j from p = 1** ("J = 0, I = −1" are the 0-based start values) |
| 3 | Q2 final exchange marker | "i" under column 4 | "**i + 1**": i = 3 after the loop; exchange A[4] ↔ A[6]; q = 4 |
| 4 | Q2 row text | "A[j] < x" | "**A[j] ≤ x**" [D07-S5]. Harmless there (all keys distinct), but it changes the result when a key equals the pivot (mock Q6) |
| 5 | Headings | merge sort numbered "Q2" a second time | it is Q3 |
| ℹ️ | Q1 i = 2 row | "R = 6" | index 6 does not exist (n = 6); the slides write "6 (X)". Not an error: only L is compared |

### 6.4 Index conventions: one table to avoid every off-by-one

| Topic | Base on the slides / sheets | Start values and formulas |
|---|---|---|
| **Heap tables** (D09-S11–S22, A2 Q1) | **0-based**, columns 0 … n−1 | L = 2i + 1, R = 2i + 2, P = ⌈i/2⌉ − 1; leaves ⌊n/2⌋ … n−1; BUILD loop i = ⌊n/2⌋ − 1 downto 0; child index ≥ heap-size → "(X)" |
| Heap **pseudocode** (D09-S10, S15, S21) | 1-based (root A[1]) | L = 2i, R = 2i + 1, P = ⌊i/2⌋; BUILD i = ⌊n/2⌋ downto 1 |
| Insertion sort (D06-S7) | 1-based | j = 2 … n; i = j − 1; stop when i = 0 |
| **PARTITION** (D07-S5, A2 Q2) | **1-based**, columns 1 … n | p = 1, r = n, **i = p − 1 = 0**, j = p … r − 1; final A[i+1] ↔ A[r]; q = i + 1 (0-based table: i = −1, j from 0) |
| **MERGESORT** (D08-S5, A2 Q3) | **1-based** | q = ⌊(p + r)/2⌋; the left half gets the extra element |
| MERGE helpers (D08-S8) | ⚠️ declared L[1..n1], R[1..n2] but filled and read as L[0..n1−1], R[0..n2−1] | i = j = 0; when one list is used up, copy the rest of the other |
| Searches, get_max (D01) | 0-based | E[0 … n−1]; A[i:n] means A[i] … A[n−1] |
| BucketSort (D10-S11) | 0-based | buckets b[0 … m−1], S[0 … n−1] |
| find_Kth_smallest (D11-S6) | 0-based C array | ⚠️ `return A[k]` should be A[k−1] when k counts 1st, 10th, … |

### 6.5 Pseudocode and wording slips (read them right)

| Where | Slip | Read it as |
|---|---|---|
| **D01-S7** seqSearch | **missing braces**: `if (K == E[index]) ans = index; break;`, so as typed, `break;` sits outside the `for` (a C compile error) | `if (K == E[index]) { ans = index; break; }` |
| D01-S8 | "Comparison of x with an array entry" | x means the key K |
| D01-S14 | iteration "k / k+1" labels off by one | the idea is right: after iteration i = k, max = max(a[0..k]) |
| D01-S19 | both space parts numbered "1." | fixed part and variable part |
| D03-S10, S12, S13 | "big-O of n" | "of g(n)" |
| D03-S21 | "ω((f(n))" | ω(f(n)) |
| D04-S7, S8 | indentation hides the missing braces | only `print` is inside the `for`; the calls run after it |
| D05-S5, S6 | "b)a) If p< 0" | "b)" |
| D06-S8 | best case labelled "W(n) = Omega(n)" | best case = Ω(n) (W is the worst-case label) |
| D07-S4, D08-S5 | recursive calls printed at the `if` level | they belong to the then-branch |
| D07-S7 | V2 rules mix i < j and i > j; rule 1 is random | once the scans cross, swap A[i] with the last element; no median is computed |
| D07-S9 | "else if  if(" | "else if (" |
| D07-S15/S16, S18 | "medium"; "ration 1:4" | median; ratio, with parts n/4 and 3n/4 (a 1 : 3 split, "one-fourth") |
| D08-S11 | "= (n) + 2T(n/2)" | O(n) + 2T(n/2) |
| D08-S19 | "k elements of size (n/k)" | n/k pieces of size k |
| D09-S10, S11, S17 | `MAX-HEAPIFY(A,largest)` printed outside the `If` | it belongs **inside** `If(largest<>i)`, with the exchange |
| D09-S9 | 0-based leaves "[floor(n/2) to n]" | ⌊n/2⌋ … **n − 1** |
| D09-S19 | "Ascending and descending will always be min and max heap respectively" | an ascending array is a min-heap; HEAP-SORT still uses a **max**-heap and outputs ascending order |
| D09-S22 | an inner row "for i→1" inside the i = 0 block | the recursive MAX-HEAPIFY(A,1), not a new loop iteration |
| D10-S3 | k undefined; every best case written with O | k = m (bucket), k = p (radix) |
| D10-S13 | "i ← i + 10" | i ← i + 1 |
| D10-S14 | range "0.0 to 0.9", but the example contains 0.94 | bucket 9 holds 0.9…, up to just below 1.0 |
| D11-S6 | `Sorted` is never set to true after the first sort | the sort-once idea needs the flag set |
| D11-S7 | total and average joined by one "="; k reused; "O(log n + 1) = log n" | total = n log n + (n − 1); per query ≤ log n + 1 = O(log n) |
| D11-S11 | "K=k-1"; "= 2n" | k = k − 1; total ≤ 2n |
| D12-S5 | RB "N = depth in black nodes" vs AVL "N = number of nodes"; B-tree log(M·N) ≠ the formula below it | 🔎 correct bounds: Track B |
| D12-S8 | reverse arrow "Right Rotate (T, x)"; labels A/B/C misplaced | the top node there is y: Right Rotate (T, y); in-order A x B y C |
| D12-S12 | "while x – NIL" | while x ≠ NIL |
| **D12-S16** step 3 | "if color of x's parent is not BLACK **or** x is not root" | must be **and**: fix only while x is not the root **and** its parent is red [S13; S14 line 1] |
| D13-S8 | "If stillDB exists", "child's who is far", a ☒ box used as a bullet | small typos; the meaning is clear |

### 6.6 Exam traps that are not slide errors

- **n₀ must hold for every n ≥ n₀**: n² ≤ 2ⁿ fails at n = 3; 5n² ≤ 2ⁿ fails until n = 9.
- **Read p from every log factor:** n log n has p = 1; n/log n has p = −1; n/log² n has p = −2; log n alone has k = 0, p = 1.
- **Near-ties in the Master theorem:** compute b^k (4^0.51 ≈ 2.028 > 2 makes #7 Case 3, not Case 2).
- **Decreasing recurrence trees:** n levels (height n − 1), **and include the leaf level**.
- **Two different "Case 2"s:** insertion Case 2 is a rotation at the parent (Left-Right); deletion Case 2 is "black node with a red child".
- **NIL counts as black:** a NIL uncle means a rotation case, not Case 1; a sibling with NIL children has "both children black".
- **Predecessor vs successor:** the class algorithm uses the predecessor [D13-S6]; say which one you use, since the cases (not always the final tree) can differ.
- **PARTITION:** the pivot is the **last** element; test **≤**; the final exchange uses **i + 1**.
- **Heaps:** recurse at the child's index; mark missing children "(X)"; a single MAX-HEAPIFY on a random array does not make a heap.
- **Radix:** leading zeros (9 = 09); collect each bucket in the order placed; p = digits of the **maximum**.
- **Quicksort's worst input is the *sorted* array**, which is insertion sort's *best* input [D07-S12]. Sorted and reversed take the same time, T1 = T2 [D07-S20].
- **Merge sort has "no worst scenario"** (non-adaptive) and is the only out-place comparison sort in D06-S3.
- **Bucket sort is O(n + m)**, but **O(m)** when m >>> n; that is why radix sort exists [D10-S16, S17].
- **AVL vs RB:** read-heavy → AVL; frequent inserts and deletes → RB.
- **"0(n)" in decks 04–05 is big-O**, not "zero of n".

---

## 7. Mock midterm (PRACTICE), about 90 minutes, in his style

> **PRACTICE PAPER: new data, the same methods and layouts as A1, A2 and the slide exercises. It is not the professor's paper.**
> - Solve everything by hand, inside the layouts shown (as on his printed sheets), and **show all steps**.
> - The suggested minutes add up to 90. Mark yourself in **0.25 steps** per box or row, the way A1 was graded.
> - Answers (all script-verified ✅) are in §8. Do not look until you have finished.

---

**Q1.** For the following functions (show the steps to evaluate the values of **c and n₀**): find the O-notation | find the big-omega notation. *[10 min]*
- (a) f(n) = 6n³ − 4n + 5
- (b) f(n) = 2ⁿ + 5n²

| f(n) | Find the O-notation | Find the big-omega notation |
|---|---|---|
| 6n³ − 4n + 5 | | |
| 2ⁿ + 5n² | | |

**Q2.** Comment on the following (check whether the bounds are correct or incorrect). *[4 min]*
Given f(n) = 2n⁴ + 3n and g(n) = n³:
- Is f(n) = o(g(n))? [o is small oh]
- Is f(n) = Ω(g(n))? [Ω is big omega]

**Q3.** Solve the recurrence equations using Master's theorem. *[10 min]*
- 3a. T(n) = 8T(n/4) + n log n  [a = ___, b = ___, k = ___, p = ___]  Case = ______  Ans = __________
- 3b. T(n) = 9T(n/3) + n² log² n  [a = ___, b = ___, k = ___, p = ___]  Case = ______  Ans = __________
- 3c. T(n) = 8T(n/2) + n³/log n  [a = ___, b = ___, k = ___, p = ___]  Case = ______  Ans = __________
- 3d. T(n) = 3T(n/4) + n log n  [a = ___, b = ___, k = ___, p = ___]  Case = ______  Ans = __________

**Q4.** Solve the recursive equation using a recurrence tree. *[6 min]*
- T(n) = 4T(n/2) + n for n > 1; T(n) = 1 for n = 1.
- Give the cost of each level (levels 0, 1, 2, i and the leaves), the height, the sum in closed form and the Θ-answer. Cross-check with the Master theorem.

**Q5.** Sort the sequence with **Insertion Sort** [D06-S7]. Show the array after every pass (j = 2 … 6), say what is shifted and where the key is inserted, and count the `A[i] > key` comparisons and the shifts. What is F(6), the worst case for n = 6? *[5 min]*

| 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|
| 9 | 4 | 7 | 1 | 8 | 2 |

**Q6.** Apply the Quicksort algorithm to sort the given sequence (**show only the steps of the first PARTITION** on the initial array). *[6 min]*

| Use this space for any calculations | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| | 13 | 6 | 21 | 9 | 15 | 4 | 9 |

- (b) Which array would you get if the test were `A[j] < x` instead of the class test? Why does it matter here?

**Q7.** Apply the Merge sort algorithm to sort the given sequence (**show all steps**). Give q at every split and trace the final MERGE (count its comparisons). *[6 min]*

| Use this space for any calculations | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| | 26 | 11 | 39 | 4 | 18 | 31 | 7 |

**Q8.** *[9 min]*
- (a) Convert the following sequence to a heap using **Build Max Heap** (use this space for showing the iterations).
- (b) Then perform **HEAP-EXTRACT-MAX twice** on your heap. Show each MAX-HEAPIFY call with i, L, R, the value returned, and the heap after each extract.

| Use this space for showing iterations | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| | 6 | 14 | 3 | 25 | 9 | 17 | 1 | 20 |

**Q9.** Apply **radix sort** [D10-S18] to 612, 85, 437, 302, 95, 147, 760, 18, 432. *[5 min]*
- How many passes are needed?
- Show the non-empty buckets (in the order the elements are placed) and the list after each pass.
- Point out one place where the stability of a pass decides the answer.

**Q10.** Amortized analysis. *[6 min]*
- (a) A stack starts empty. For the sequence **PUSH, PUSH, PUSH, PUSH, POP, MULTIPOP(S,2), PUSH, PUSH, MULTIPOP(S,5), PUSH**:
  - give the actual cost and the amortized cost (class values) of each operation;
  - give the totals and check that the amortized costs "preserve the sum";
  - state the amortized cost per operation.
- (b) Using the class model of `find_Kth_smallest` (sort only on the first call), find the total cost and the cost per query for **32** different k-th-smallest queries on an array of **32** numbers. Compare with the naive bound "worst case per query × number of queries".
- (c) Name the three amortized-analysis techniques. Which one is the calculation in (b)?

**Q11.** Insert the following nodes into an **empty RB tree**: **15, 85, 25, 65, 80, 30, 60, 40**. Name the case at every repair step and draw the tree (with colours) after each insertion. *[9 min]*

**Q12.** Start from your final tree of Q11. Check it against §8 Q11 first, so that an insertion slip does not carry over. Perform the following deletions, using the **in-order predecessor** for two-child nodes as in the class algorithm: **15, 85, 80, 65, 30, 25**. Name the case(s) for each deletion and draw the tree after each one. *[9 min]*

**Q13.** Short questions. *[5 min]*
- **S1.** (Definition)
  - (a) A specification of an operation consists of which three parts, and what does the calling prototype include?
  - (b) Name the three things a loop-invariant proof must show.
- **S2.** (MCQ) The Master theorem as taught does **not** apply to which recurrence? Give the reason, and solve the other three.
  - (A) T(n) = 3T(n/2) + n²
  - (B) T(n) = 0.5T(n/2) + n
  - (C) T(n) = 16T(n/4) + n²
  - (D) T(n) = T(n/2) + log n
- **S3.** (MCQ) According to the class classification (D06-S3), which list contains **only unstable** sorts?
  - (A) merge, insertion, bubble
  - (B) quick, heap, selection
  - (C) quick, merge, heap
  - (D) insertion, selection, bubble
- **S4.** (Short) In a **0-based** heap array with n = 11 keys, give:
  - the children of index 4;
  - the parent of index 7;
  - the range of leaf indexes;
  - the first value of i in the BUILD-MAX-HEAP loop.
- **S5.** (MCQ) Which statement matches the class comparison of trees?
  - (A) AVL trees need fewer rotations than RB trees.
  - (B) RB trees suit frequent insertions and deletions; AVL trees suit read-heavy workloads.
  - (C) Every B-tree node has at most 2 children.
  - (D) An RB tree keeps every balance factor in {−1, 0, 1}.

---

## 8. Answer key (all verified ✅, in his answer format)

> Every value below was produced or re-checked by the class-convention scripts (c/n₀ by exact integer search; Θ by ratio checks up to n = b^10000; traces by running the slide pseudocode). The layouts follow the A2 sample (with its slips corrected) and the A1 boxes.

### Q1. O and Ω with c and n₀

**(a) f(n) = 6n³ − 4n + 5.** The leading term is 6n³, so g(n) = n³.

*O-notation*
1. Try c = 6, the leading coefficient; the negative term helps. 6n³ − 4n + 5 ≤ 6n³ ⇔ 5 ≤ 4n ⇔ n ≥ 5/4.
2. Table:

   | n | f(n) | 6n³ | holds? |
   |---|---|---|---|
   | 1 | 7 | 6 | ✗ |
   | 2 | 45 | 48 | ✓ |
   | 3 | 155 | 162 | ✓ |

3. For n ≥ 2, 4n ≥ 8 > 5, so it stays true.
4. **O(n³) with c = 6, n₀ = 2** ✅.

Alternatives ✅:
- c = 7, n₀ = 1, because 7n³ − f(n) = n³ + 4n − 5 ≥ 0 for all n ≥ 1;
- "drop the negative term" [D03-S12 📝]: f(n) ≤ 6n³ + 5 ≤ 11n³, so c = 11, n₀ = 1.

*Ω-notation*
1. The −4n cannot simply be dropped. "Pay" for it with part of the leading term [D03-S12 📝]: 4n ≤ 4n³ for n ≥ 1, so f(n) ≥ 6n³ − 4n³ = 2n³. That gives c = 2, n₀ = 1 ✅.
2. A larger c is preferred for Ω [D03-S11 📝]. With c = 5 we need n³ − 4n + 5 ≥ 0: n = 1 gives 2 ✓, n = 2 gives 5 ✓, and for n ≥ 2, n³ ≥ 4n. So **Ω(n³) with c = 5, n₀ = 1** ✅.
3. c = 6 fails for every n ≥ 2 (it would need 5 ≥ 4n), so 5 is the largest integer c.
4. Both halves hold, so **f(n) = Θ(n³)** [D03-S17].

**(b) f(n) = 2ⁿ + 5n².** The fastest-growing term is 2ⁿ, so g(n) = 2ⁿ.

*O-notation*
1. Take c = 2. Then 2ⁿ + 5n² ≤ 2·2ⁿ ⇔ **5n² ≤ 2ⁿ**.

   | n | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | **9** | 10 |
   |---|---|---|---|---|---|---|---|---|---|---|
   | 5n² | 5 | 20 | 45 | 80 | 125 | 180 | 245 | 320 | **405** | 500 |
   | 2ⁿ | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | **512** | 1024 |
   | holds? | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |

2. From n = 9 on, each step doubles 2ⁿ but multiplies 5n² by at most (10/9)² ≈ 1.23, so the inequality stays true.
3. **O(2ⁿ) with c = 2, n₀ = 9** ✅.

Alternative ✅: c = 6 needs n² ≤ 2ⁿ. That is true at n = 1, 2, **false at n = 3** (9 > 8) 🪤, and true from n = 4, so **c = 6, n₀ = 4**. (Also c = 3 with n₀ = 7.)

*Ω-notation:* 2ⁿ ≤ 2ⁿ + 5n² for all n ≥ 1, so **Ω(2ⁿ) with c = 1, n₀ = 1** ✅. c = 1 is the largest constant that works, because f(n)/2ⁿ = 1 + 5n²/2ⁿ falls toward 1. Hence **f(n) = Θ(2ⁿ)**.

✍️ On the sheet:

| f(n) | Find the O-notation | Find the big-omega notation |
|---|---|---|
| 6n³ − 4n + 5 | 6n³−4n+5 ≤ 6n³ ⇔ 5 ≤ 4n; n = 1 ✗, n = 2 ✓, stays true ⇒ **O(n³), c = 6, n₀ = 2** | 6n³−4n+5 ≥ 5n³ ⇔ n³−4n+5 ≥ 0 ∀n ≥ 1 ⇒ **Ω(n³), c = 5, n₀ = 1** |
| 2ⁿ + 5n² | 2ⁿ+5n² ≤ 2·2ⁿ ⇔ 5n² ≤ 2ⁿ; false n = 1…8, true from 9 ⇒ **O(2ⁿ), c = 2, n₀ = 9** | 2ⁿ ≤ 2ⁿ+5n² ∀n ≥ 1 ⇒ **Ω(2ⁿ), c = 1, n₀ = 1** |

### Q2. Correct or incorrect bounds

The leading term of f is 2n⁴, so f is of order n⁴, against g(n) = n³. In the class analogy this is **"a > b"** [D03-S19].

- **Is f = o(g)? INCORRECT.**
  - o means a strictly **lower** order ("a < b"), but f grows faster than g.
  - ✅ f(n)/g(n) = 5, 20.03, 200.0003, 2000.000003 at n = 1, 10, 100, 1000. It grows without bound instead of shrinking to 0.
  - In fact f = ω(g); by complementarity, g = o(f) [D03-S21].
  - f is not even O(g): 2n⁴ + 3n ≤ c·n³ would need 2n < c, which fails for n > c/2.
- **Is f = Ω(g)? CORRECT.**
  - 2n⁴ + 3n ≥ 2n⁴ ≥ 2n³ for all n ≥ 1, so **c = 2, n₀ = 1** ✅.
  - Any c works for large enough n (e.g. c = 5 from n₀ = 3), because f/g ≈ 2n grows.

✍️ "f = o(g): **incorrect**: f has order n⁴, which is higher than n³ (a > b); in fact f = ω(g). f = Ω(g): **correct**: 2n⁴ + 3n ≥ 2n³ ∀n ≥ 1, so c = 2, n₀ = 1."

### Q3. Master's theorem with the boxes

| | Recurrence | [a, b, k, p] | a vs b^k | Case | **Ans** | ✅ T/Ans, n = b^10 → b^10000 |
|---|---|---|---|---|---|---|
| 3a | 8T(n/4) + n log n | [8, 4, 1, 1] | 8 > 4¹ = 4 | **1** | **Θ(n^(log₄ 8)) = Θ(n^1.5)** | 4.98 → 5.00 |
| 3b | 9T(n/3) + n² log² n | [9, 3, 2, 2] | 9 = 3² | **2(a)** (p = 2 > −1) | **Θ(n² log³ n)** | 0.243 → 0.210 |
| 3c | 8T(n/2) + n³/log n | [8, 2, 3, −1] | 8 = 2³ | **2(b)** (p = −1) | **Θ(n³ log log n)** | 1.18, 0.93, 0.85, 0.81 (bounded; settles slowly, like D05-S6 #6) |
| 3d | 3T(n/4) + n log n | [3, 4, 1, 1] | 3 < 4 | **3(a)** (p = 1 ≥ 0) | **Θ(n log n)** | 2.87 → 4.00 |

✍️ On the sheet:
```
3a. [a = 8, b = 4, k = 1, p = 1]    Case = 1    (a = 8 > b^k = 4)          Ans = Θ(n^(log₄8)) = Θ(n^1.5)
3b. [a = 9, b = 3, k = 2, p = 2]    Case = 2(a) (a = b^k = 9, p = 2 > −1)  Ans = Θ(n² · log³ n)
3c. [a = 8, b = 2, k = 3, p = −1]   Case = 2(b) (a = b^k = 8, p = −1)      Ans = Θ(n³ log log n)
3d. [a = 3, b = 4, k = 1, p = 1]    Case = 3(a) (a = 3 < b^k = 4, p ≥ 0)   Ans = Θ(n log n)
```
- 🪤 **3a:** Case 1 ignores p, so do not add a log factor. log₄ 8 = log₂ 8 / log₂ 4 = 3/2 (change of base [D01-S24]).
- 🪤 **3b:** the answer's log power is p + 1 = 3, not 2.
- 🪤 **3c:** n³/log n = n³·log^(−1) n, so p = −1, which is sub-case (b).
- 🪤 **3d:** in Case 3(a) the log **stays** (Θ(n^k log^p n)).

### Q4. Recurrence tree for T(n) = 4T(n/2) + n, T(1) = 1

```
level 0:                         n                                level total = n
level 1:          n/2      n/2       n/2      n/2                 level total = 4·(n/2)  = 2n
level 2:          16 nodes, each n/4                              level total = 16·(n/4) = 4n
  ...
level i:          4^i nodes, each n/2^i                           level total = 2^i · n
  ...
leaves:           4^(log₂n) = n² nodes, each T(1) = 1             level total = n²
```
1. **Height:** n/2^i = 1 at i = log₂ n. So levels 0 … log n − 1 cost n, 2n, 4n, …, 2^(log n − 1)·n, and then comes the leaf level.
2. **Leaves:** 4^(log₂ n) = n^(log₂ 4) = n², using x^(log y) = y^(log x) [D01-S24].
3. **Sum:** T(n) = n(1 + 2 + … + 2^(log n − 1)) + n² = n(2^(log n) − 1) + n² = n(n − 1) + n². This is the power-of-2 series with k = log n − 1 [D01-S25].
4. So **T(n) = 2n² − n = Θ(n²)** ✅ (exact for every n = 2^m checked, m ≤ 20).
5. **Check n = 8:** 8 + 16 + 32 + 64 = 120 = T(8) (T(2) = 6, T(4) = 28, T(8) = 4·28 + 8) ✅.
6. **Shape:** the level costs **double**, so the **leaves dominate**, as in the third line of D04-S10 ("max. work done at leaves").
7. **Master cross-check:** [a = 4, b = 2, k = 1, p = 0], 4 > 2¹, **Case 1**, Θ(n^(log₂ 4)) = **Θ(n²)** ✅.
8. 🪤 Do not stop at level log n − 1: the leaf level (n²) is the biggest term.

### Q5. Insertion sort on 9, 4, 7, 1, 8, 2 (positions 1–6)

| Pass j | key | `A[i] > key` checks, as on D06-S6 | Insert at | Array after the pass | comps | shifts |
|---|---|---|---|---|---|---|
| 2 | 4 | 9 > 4 shift; left boundary | A[1] | 4 9 7 1 8 2 | 1 | 1 |
| 3 | 7 | 9 > 7 shift; 4 ≤ 7 stop | A[2] | 4 7 9 1 8 2 | 2 | 1 |
| 4 | 1 | 9 > 1 shift; 7 > 1 shift; 4 > 1 shift; left boundary | A[1] | 1 4 7 9 8 2 | 3 | 3 |
| 5 | 8 | 9 > 8 shift; 7 ≤ 8 stop | A[4] | 1 4 7 8 9 2 | 2 | 1 |
| 6 | 2 | 9 > 2 shift; 8 > 2 shift; 7 > 2 shift; 4 > 2 shift; 1 ≤ 2 stop | A[2] | 1 2 4 7 8 9 | 5 | 4 |
| **total** | | | | **1 2 4 7 8 9** | **13** | **10** |

- Result **1 2 4 7 8 9**: **13 comparisons and 10 shifts** ✅. ("left boundary" means the while loop stops at i = 0, with no comparison made.)
- F(6) = 1 + 2 + 3 + 4 + 5 = **15**, for reversed input (the worst case). The best case is sorted input: 5 comparisons, 0 shifts, Ω(n) [D06-S8].

### Q6. First PARTITION on 13, 6, 21, 9, 15, 4, 9 (positions 1–7)

| Row | Margin / test | 1 | 2 | 3 | 4 | 5 | 6 | 7 | Action |
|---|---|---|---|---|---|---|---|---|---|
| start | p = 1, r = 7, x = A[7] = 9, i = 0, j from 1 to 6 | 13 | 6 | 21 | 9 | 15 | 4 | 9 | |
| j = 1 | 13 ≤ 9? no |  |  |  |  |  |  |  | nothing (i = 0) |
| j = 2 | 6 ≤ 9? **yes** | **6** | **13** | 21 | 9 | 15 | 4 | 9 | i = 1, exchange A[1] ↔ A[2] |
| j = 3 | 21 ≤ 9? no |  |  |  |  |  |  |  | nothing (i = 1) |
| j = 4 | 9 ≤ 9? **yes** | 6 | **9** | 21 | **13** | 15 | 4 | 9 | i = 2, exchange A[2] ↔ A[4] |
| j = 5 | 15 ≤ 9? no |  |  |  |  |  |  |  | nothing (i = 2) |
| j = 6 | 4 ≤ 9? **yes** | 6 | 9 | **4** | 13 | 15 | **21** | 9 | i = 3, exchange A[3] ↔ A[6] |
| exchange | A[i+1] = A[4] ↔ A[r] = A[7] | 6 | 9 | 4 | **9** | 15 | 21 | **13** | return **q = 4** |

- **Answer: 6, 9, 4, 9, 15, 21, 13, with q = 4** ✅.
  - Left part {6, 9, 4} ≤ 9; right part {15, 21, 13} > 9; pivot 9 in its final place.
  - 6 comparisons (r − p).
  - The next calls would be QUICKSORT(A, 1, 3) and QUICKSORT(A, 5, 7), but the question stops here.
- **(b)** With `A[j] < x`, the 9 at j = 4 is **not** moved left. The result is **6, 4, 9, 9, 15, 13, 21 with q = 3** ✅, a different array and a different q.
  - The class test is **A[j] ≤ x** [D07-S5]: keys equal to the pivot go to the left part.
  - This is exactly why the "A[j] < x" in the A2 sample is a slip (§6.3), even though it was harmless there.

### Q7. Merge sort on 26, 11, 39, 4, 18, 31, 7 (positions 1–7)

```
index:      1    2    3    4   |   5    6    7
start:     26   11   39    4   |  18   31    7        p=1, r=7, q=⌊(1+7)/2⌋=4
divide:   [26   11] [39    4]  |  [18   31] [7]       q=⌊(1+4)/2⌋=2 · q=⌊(5+7)/2⌋=6
divide:   [26] [11] [39]  [4]  |  [18] [31]           q=1, q=3 · q=5
merge:    [11   26] [ 4   39]  |  [18   31]           1 + 1 · 1 comparisons
merge:    [ 4   11   26   39]  |  [ 7   18   31]      3 · 1 comparisons
merge:    [ 4    7   11   18       26   31   39]      6 comparisons
```

Call order (D08-S5):
```
MERGESORT(1,7)  q=4  →  [26, 11, 39, 4] | [18, 31, 7]
  MERGESORT(1,4)  q=2  →  [26, 11] | [39, 4]
    MERGESORT(1,2)  q=1  →  [26] | [11]
    MERGE(1,1,2)  [26] + [11] → [11, 26]   (1 comparison)
    MERGESORT(3,4)  q=3  →  [39] | [4]
    MERGE(3,3,4)  [39] + [4] → [4, 39]   (1 comparison)
  MERGE(1,2,4)  [11, 26] + [4, 39] → [4, 11, 26, 39]   (3 comparisons)
  MERGESORT(5,7)  q=6  →  [18, 31] | [7]
    MERGESORT(5,6)  q=5  →  [18] | [31]
    MERGE(5,5,6)  [18] + [31] → [18, 31]   (1 comparison)
  MERGE(5,6,7)  [18, 31] + [7] → [7, 18, 31]   (1 comparison)
MERGE(1,4,7)  [4, 11, 26, 39] + [7, 18, 31] → [4, 7, 11, 18, 26, 31, 39]   (6 comparisons)
```

Final MERGE(A,1,4,7): L = [4, 11, 26, 39], R = [7, 18, 31], i = j = 0:

| k | Compare | A[k] |
|---|---|---|
| 1 | 4 vs 7 | 4 (L) |
| 2 | 11 vs 7 | 7 (R) |
| 3 | 11 vs 18 | 11 (L) |
| 4 | 26 vs 18 | 18 (R) |
| 5 | 26 vs 31 | 26 (L) |
| 6 | 39 vs 31 | 31 (R) |
| 7 | R used up | 39 |

- **Result 4, 7, 11, 18, 26, 31, 39** ✅: 6 MERGE calls, 13 comparisons in total.
- The odd size gives an uneven 4 | 3 split: the left half gets the extra element because q = ⌊(1+7)/2⌋ = 4.

### Q8. Build Max Heap on 6, 14, 3, 25, 9, 17, 1, 20 (positions 0–7), then two extracts

**(a)** n = 8, so the loop runs i = ⌊8/2⌋ − 1 = **3 down to 0**; the leaves are indexes 4 … 7.

| Row | Margin | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | Right margin / action |
|---|---|---|---|---|---|---|---|---|---|---|
| start | For i → 3 to 0 | 6 | 14 | 3 | 25 | 9 | 17 | 1 | 20 | non-leaf nodes (n/2)−1 = 3 to 0 |
| loop i = 3 | i = 3, L = 7, R = 8(X) |  |  |  |  |  |  |  |  | largest = 3 = i → **exit** |
| loop i = 2 | i = 2, L = 5, R = 6 | 6 | 14 | 17 | 25 | 9 | 3 | 1 | 20 | largest = 5: swap A[2] ↔ A[5] |
| ↳ heapify(5) | i = 5, L = 11(X), R = 12(X) |  |  |  |  |  |  |  |  | largest = 5 = i → **exit** |
| loop i = 1 | i = 1, L = 3, R = 4 | 6 | 25 | 17 | 14 | 9 | 3 | 1 | 20 | largest = 3: swap A[1] ↔ A[3] |
| ↳ heapify(3) | i = 3, L = 7, R = 8(X) | 6 | 25 | 17 | 20 | 9 | 3 | 1 | 14 | largest = 7: swap A[3] ↔ A[7] |
| ↳ heapify(7) | i = 7, L = 15(X), R = 16(X) |  |  |  |  |  |  |  |  | largest = 7 = i → **exit** |
| loop i = 0 | i = 0, L = 1, R = 2 | 25 | 6 | 17 | 20 | 9 | 3 | 1 | 14 | largest = 1: swap A[0] ↔ A[1] |
| ↳ heapify(1) | i = 1, L = 3, R = 4 | 25 | 20 | 17 | 6 | 9 | 3 | 1 | 14 | largest = 3: swap A[1] ↔ A[3] |
| ↳ heapify(3) | i = 3, L = 7, R = 8(X) | 25 | 20 | 17 | 14 | 9 | 3 | 1 | 6 | largest = 7: swap A[3] ↔ A[7] |
| ↳ heapify(7) | i = 7, L = 15(X), R = 16(X) |  |  |  |  |  |  |  |  | largest = 7 = i → **exit** |
| **heap** |  | 25 | 20 | 17 | 14 | 9 | 3 | 1 | 6 | max-heap ✅ |

**(b) Extract #1** (heap-size 8 → 7):

| Row | Margin | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | Action |
|---|---|---|---|---|---|---|---|---|---|---|
| extract | max = 25 | 6 | 20 | 17 | 14 | 9 | 3 | 1 |  | max = 25 out; A[0] ← A[7]; heap-size = 7 |
| heapify(0) | i = 0, L = 1, R = 2 | 20 | 6 | 17 | 14 | 9 | 3 | 1 |  | largest = 1: swap A[0] ↔ A[1] |
| ↳ heapify(1) | i = 1, L = 3, R = 4 | 20 | 14 | 17 | 6 | 9 | 3 | 1 |  | largest = 3: swap A[1] ↔ A[3] |
| ↳ heapify(3) | i = 3, L = 7(X), R = 8(X) |  |  |  |  |  |  |  |  | largest = 3 = i → **exit** |

Returns **25**; heap = **[20, 14, 17, 6, 9, 3, 1]** (heap-size 7) ✅

**(b) Extract #2** (heap-size 7 → 6):

| Row | Margin | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | Action |
|---|---|---|---|---|---|---|---|---|---|---|
| extract | max = 20 | 1 | 14 | 17 | 6 | 9 | 3 |  |  | max = 20 out; A[0] ← A[6]; heap-size = 6 |
| heapify(0) | i = 0, L = 1, R = 2 | 17 | 14 | 1 | 6 | 9 | 3 |  |  | largest = 2: swap A[0] ↔ A[2] |
| ↳ heapify(2) | i = 2, L = 5, R = 6(X) | 17 | 14 | 3 | 6 | 9 | 1 |  |  | largest = 5: swap A[2] ↔ A[5] |
| ↳ heapify(5) | i = 5, L = 11(X), R = 12(X) |  |  |  |  |  |  |  |  | largest = 5 = i → **exit** |

Returns **20**; heap = **[17, 14, 3, 6, 9, 1]** (heap-size 6) ✅

```
heap after (a)                 after extract #1 (returned 25)    after extract #2 (returned 20)
            25                             20                                17
         /      \                       /      \                          /      \
       20        17                   14        17                      14        3
      /  \      /  \                 /  \      /  \                    /  \      /
    14    9    3    1               6    9    3    1                  6    9    1
   /
  6
```

- **Cascades:** at i = 1, the key 14 sinks two levels (index 1 → 3 → 7); at i = 0, the key 6 sinks three levels (0 → 1 → 3 → 7). Each recursive call continues **at the index the value moved to** (compare the "i=3 exit" slip in §6.3).
- **Extract** = return A[0], copy the **last** heap key into A[0], shrink the heap, MAX-HEAPIFY(A, 0) [D09-S15]. The cell after the heap (shown blank) is no longer part of it.
- Validity check ✅: every parent ≥ its children in all three arrays.

### Q9. Radix sort of 612, 85, 437, 302, 95, 147, 760, 18, 432

The maximum is 760, which has 3 digits, so **p = 3 passes** (85 = 085, 95 = 095, 18 = 018).

| Pass | Digit | Non-empty buckets (in placement order) | List after the pass |
|---|---|---|---|
| 1 | ones | 0: 760 · 2: 612, 302, 432 · 5: 85, 95 · 7: 437, 147 · 8: 18 | 760, 612, 302, 432, 85, 95, 437, 147, 18 |
| 2 | tens | 0: 302 · 1: 612, 18 · 3: 432, 437 · 4: 147 · 6: 760 · 8: 85 · 9: 95 | 302, 612, 18, 432, 437, 147, 760, 85, 95 |
| 3 | hundreds | 0: 18, 85, 95 · 1: 147 · 3: 302 · 4: 432, 437 · 6: 612 · 7: 760 | 18, 85, 95, 147, 302, 432, 437, 612, 760 |

- **Result: 18, 85, 95, 147, 302, 432, 437, 612, 760** ✅.
- **Stability decides the answer, for example:**
  - **432 and 437:** in pass 2 both go to bucket 3, and in pass 3 both go to bucket 4. They stay correct only because each pass keeps the order from the earlier passes (432 before 437 since pass 1, as 2 < 7).
  - **18, 85, 95:** they share hundreds digit 0 in pass 3 and come out in pass-2 order.
  - An unstable pass could output 437 before 432 [D10-S23].
- Cost: p·O(n) = O(pn) [D10-S24].

### Q10. Amortized analysis

**(a)** Class costs [D11-S11]: actual PUSH 1, POP 1, MULTIPOP(S,k) = min(|S|, k); amortized PUSH 2, POP 0, MULTIPOP 0.

| # | Operation | Size before | Actual | Amortized | Size after | Σ actual | Σ amortized | Credit |
|---|---|---|---|---|---|---|---|---|
| 1 | PUSH | 0 | 1 | 2 | 1 | 1 | 2 | 1 |
| 2 | PUSH | 1 | 1 | 2 | 2 | 2 | 4 | 2 |
| 3 | PUSH | 2 | 1 | 2 | 3 | 3 | 6 | 3 |
| 4 | PUSH | 3 | 1 | 2 | 4 | 4 | 8 | 4 |
| 5 | POP | 4 | 1 | 0 | 3 | 5 | 8 | 3 |
| 6 | MULTIPOP(S,2) | 3 | min(3, 2) = 2 | 0 | 1 | 7 | 8 | 1 |
| 7 | PUSH | 1 | 1 | 2 | 2 | 8 | 10 | 2 |
| 8 | PUSH | 2 | 1 | 2 | 3 | 9 | 12 | 3 |
| 9 | MULTIPOP(S,5) | 3 | min(3, 5) = 3 | 0 | 0 | 12 | 12 | 0 |
| 10 | PUSH | 0 | 1 | 2 | 1 | 13 | 14 | 1 |

- Σ actual = **13**; Σ amortized = **14**.
- **Preserve the sum:** 14 ≥ 13 ✓ [D11-S4].
- Also Σ actual ≤ Σ amortized ≤ 2n = 20, so the **amortized cost per operation is ≤ 2 = O(1)**. The real average is 13/10 = 1.3.
- The credit column never goes negative, and it always equals the number of items on the stack: every item prepaid its own pop.
- The naive bound "worst single operation × n" would charge a MULTIPOP as up to the whole stack each time; amortization shows the total never exceeds 2n.

**(b)** n = 32, log₂ 32 = 5 [D11-S7]:
- total = 32·5 (one sort) + 31·1 (the other queries) = **191**;
- per query = 191/32 ≈ **5.97** ≤ log n + 1 = 6, so **O(log n)** per query ✅;
- naive bound: 32 × (32·5) = **5120**.

**(c)** **Aggregate analysis, accounting method, potential method** [D11-S4].
- (b) is "total cost ÷ number of operations" (T(n)/n), which is the **aggregate** idea; D11-S7 defines the amortized cost per operation exactly this way.
- The slides do not label the scenarios by technique. The stack's per-operation costs 2/0/0 fit the accounting description.

### Q11. RB insertion of 15, 85, 25, 65, 80, 30, 60, 40 into an empty tree

Rules: §2.12 [D12-S14–S22]. NIL counts as black, so a NIL uncle means a rotation case.

- **Insert 15.** BST-insert 15 as root (red).
  - 15 is the root → colour it BLACK.
```
(a) insert 15    (b) root 15 -> black
15R              15B
```
- **Insert 85.** BST-insert 85 as right child of 15 (red).
  - Parent 15 is BLACK → no violation, done.
```
after insert 85
15B_
    \
   85R
```
- **Insert 25.** BST-insert 25 as left child of 85 (red).
  - Parent 85 RED, uncle NIL BLACK, 25 is LEFT child of 85, 85 is RIGHT child of 15 → **mirror Case 2 (Right-Left)**: clockwise (right) rotation at parent 85; 85 becomes new x.
  - 85 is RIGHT child of 25, 25 is RIGHT child of 15, uncle NIL BLACK → **mirror Case 3 (Right-Right)**: anticlockwise (left) rotation at grandparent 15; exchange colours of 15 and 25.
```
(a) insert 25    (b) mirror Case 2: rotR(85)    (c) mirror Case 3: rotL(15)
15B____          15B_                             _25B_
       \             \                           /     \
     _85R           25R_                        15R   85R
    /                   \
   25R                 85R
```
- **Insert 65.** BST-insert 65 as left child of 85 (red).
  - Parent 85 RED, uncle 15 RED → **Case 1**: 85, 15 → BLACK, grandparent 25 → RED; new x = 25.
  - 25 is the root → colour it BLACK.
```
(a) insert 65    (b) Case 1, x=25    (c) root 25 -> black
  _25B____         _25R____            _25B____
 /        \       /        \          /        \
15R     _85R     15B     _85B        15B     _85B
       /                /                   /
      65R              65R                 65R
```
- **Insert 80.** BST-insert 80 as right child of 65 (red).
  - Parent 65 RED, uncle NIL BLACK, 80 is RIGHT child of 65, 65 is LEFT child of 85 → **Case 2 (Left-Right)**: anticlockwise (left) rotation at parent 65; 65 becomes new x.
  - 65 is LEFT child of 80, 80 is LEFT child of 85, uncle NIL BLACK → **Case 3 (Left-Left)**: clockwise (right) rotation at grandparent 85; exchange colours of 85 and 80.
```
(a) insert 80      (b) Case 2: rotL(65)    (c) Case 3: rotR(85)
  _25B_______        _25B_______             _25B____
 /           \      /           \           /        \
15B     ____85B    15B        _85B         15B     _80B_
       /                     /                    /     \
      65R_                 _80R                  65R   85R
          \               /
         80R             65R
```
- **Insert 30.** BST-insert 30 as left child of 65 (red).
  - Parent 65 RED, uncle 85 RED → **Case 1**: 65, 85 → BLACK, grandparent 80 → RED; new x = 80.
  - Parent 25 is BLACK → no violation, done.
```
(a) insert 30         (b) Case 1, x=80
  _25B_______           _25B_______
 /           \         /           \
15B        _80B_      15B        _80R_
          /     \               /     \
        _65R   85R            _65B   85B
       /                     /
      30R                   30R
```
- **Insert 60.** BST-insert 60 as right child of 30 (red).
  - Parent 30 RED, uncle NIL BLACK, 60 is RIGHT child of 30, 30 is LEFT child of 65 → **Case 2 (Left-Right)**: anticlockwise (left) rotation at parent 30; 30 becomes new x.
  - 30 is LEFT child of 60, 60 is LEFT child of 65, uncle NIL BLACK → **Case 3 (Left-Left)**: clockwise (right) rotation at grandparent 65; exchange colours of 65 and 60.
```
(a) insert 60            (b) Case 2: rotL(30)     (c) Case 3: rotR(65)
  _25B__________           _25B__________           _25B__________
 /              \         /              \         /              \
15B           _80R_      15B           _80R_      15B        ____80R_
             /     \                  /     \               /        \
        ____65B   85B               _65B   85B            _60B_     85B
       /                           /                     /     \
      30R_                       _60R                   30R   65R
          \                     /
         60R                   30R
```
- **Insert 40.** BST-insert 40 as right child of 30 (red).
  - Parent 30 RED, uncle 65 RED → **Case 1**: 30, 65 → BLACK, grandparent 60 → RED; new x = 60.
  - Parent 80 RED, uncle 15 BLACK, 60 is LEFT child of 80, 80 is RIGHT child of 25 → **mirror Case 2 (Right-Left)**: clockwise (right) rotation at parent 80; 80 becomes new x.
  - 80 is RIGHT child of 60, 60 is RIGHT child of 25, uncle 15 BLACK → **mirror Case 3 (Right-Right)**: anticlockwise (left) rotation at grandparent 25; exchange colours of 25 and 60.
```
(a) insert 40               (b) Case 1, x=60            (c) mirror Case 2: rotR(80)    (d) mirror Case 3: rotL(25)
  _25B_____________           _25B_____________           _25B_______                       _______60B____
 /                 \         /                 \         /           \                     /              \
15B           ____80R_      15B           ____80R_      15B     ____60R____              _25R_          _80R_
             /        \                  /        \            /           \            /     \        /     \
        ____60B_     85B            ____60R_     85B          30B_       _80R_         15B   30B_     65B   85B
       /        \                  /        \                     \     /     \                  \
      30R_     65R                30B_     65B                   40R   65B   85B                40R
          \                           \
         40R                         40R
```

| Insert | Situation | Case(s) |
|---|---|---|
| 15 | the new node is the root | root → black |
| 85 | parent 15 black | none |
| 25 | parent 85 red, uncle NIL (black), bend Right-Left | mirror Case 2 → mirror Case 3 |
| 65 | parent 85 red, uncle 15 red | Case 1 up to the root, then root 25 → black |
| 80 | parent 65 red, uncle NIL, bend Left-Right | Case 2 → Case 3 |
| 30 | parent 65 red, uncle 85 red | Case 1; it stops because the new x (80) has a black parent (25) |
| 60 | parent 30 red, uncle NIL, bend Left-Right | Case 2 → Case 3 |
| 40 | parent 30 red, uncle 65 red; then x = 60 has a red parent 80 and a black uncle 15, bend Right-Left | Case 1 → mirror Case 2 → mirror Case 3 (a rotation at the **root**; the D12-S24 pattern, mirrored) |

- **Final tree:** 60B; 25R with 15B and 30B (30 has a right child 40R); 80R with 65B and 85B ✅.
- Validity check: root black; reds 25, 80 and 40 have only black children or NILs; every root-to-nil path has **2** black nodes, so bh(root) = 2.
- Each insertion used at most 2 rotations, as D12-S15 promises.

### Q12. RB deletion of 15, 85, 80, 65, 30, 25 (in-order predecessor)

Start (= the Q11 answer):
```
     _______60B____
    /              \
  _25R_          _80R_
 /     \        /     \
15B   30B_     65B   85B
          \
         40R
```
Rules: §2.13 [D13-S6, S8]; check the cases in the slide order.

- **Delete 15.**
  - 15 is BLACK with RED parent 25, BUT sibling 30 has a RED child (40): the 'Or' swap would put red 30 over red 40 (breaks rule 3), so the 'Or' rule is NOT safe → treat 15 as Double Black and use the Case 3 rules.
  - 15 is BLACK → replaced by a Double Black (DB) NIL.
  - DB (left child of 25); sibling 30 BLACK, far child 40 RED → **Case 3(5)**: swap colours of parent 25 and sibling 30; rotate parent 25 toward DB (left/anticlockwise); remove DB; far child 40 → BLACK [terminal].
```
(a) 15 -> DB               (b) Case 3(5): rotL(25)
    _______60B____              ____60B____
   /              \            /           \
  25R_          _80R_        _30R_       _80R_
 /    \        /     \      /     \     /     \
DB   30B_     65B   85B    25B   40B   65B   85B
         \
        40R
```
- **Delete 85.**
  - 85 is BLACK with RED parent 80; sibling 65 BLACK with two BLACK children → **Case 2 'Or' rule**: delete it, swap colours of parent 80 and sibling 65 [terminal] (same result as **Case 3(3)** with a red parent).
```
(a) 'Or' rule
     ____60B____
    /           \
  _30R_       _80B
 /     \     /
25B   40B   65R
```
- **Delete 80.**
  - The node removed (80) is BLACK with RED child 65 → **Case 2**: replace it by 65 and colour 65 BLACK [terminal].
```
(a) Case 2
     ____60B_
    /        \
  _30R_     65B
 /     \
25B   40B
```
- **Delete 65.**
  - 65 is BLACK → replaced by a Double Black (DB) NIL.
  - DB (right child of 60); sibling 30 is RED (parent BLACK) → **Case 3(2)**: swap colours of parent 60 and sibling 30; rotate parent 60 toward DB (right/clockwise); reapply cases.
  - DB (right child of 60); sibling 40 BLACK with both children BLACK → **Case 3(3)**: remove DB, extra black to parent 60 (RED → BLACK), sibling 40 → RED [terminal].
```
(a) 65 -> DB      (b) Case 3(2): rotR(60)    (c) Case 3(3)
     ____60B_       _30B____                   _30B____
    /        \     /        \                 /        \
  _30R_     DB    25B     _60R_              25B     _60B
 /     \                 /     \                    /
25B   40B               40B   DB                   40R
```
- **Delete 30.**
  - 30 has two children → copy in-order predecessor 25 into the node (node keeps colour B); now remove the old 25 node.
  - The old 25 node is BLACK (a leaf) → replaced by a Double Black (DB) NIL.
  - DB (left child of 25 (was 30)); sibling 60 BLACK, far child NIL BLACK, near child 40 RED → **Case 3(4)**: swap colours of sibling 60 and near child 40; rotate sibling 60 away from DB (right/clockwise); go to **Case 3(5)**.
  - DB (left child of 25 (was 30)); sibling 40 BLACK, far child 60 RED → **Case 3(5)**: swap colours of parent 25 (was 30) and sibling 40; rotate parent 25 (was 30) toward DB (left/anticlockwise); remove DB; far child 60 → BLACK [terminal].
```
(a) copy 25 up    (b) 25 -> DB    (c) Case 3(4): rotR(60)    (d) Case 3(5): rotL(25)
  _25B____          25B____         25B_                       _40B_
 /        \        /       \       /    \                     /     \
25B     _60B      DB     _60B     DB   40B_                  25B   60B
       /                /                  \
      40R              40R                60R
```
- **Delete 25.**
  - 25 is BLACK → replaced by a Double Black (DB) NIL.
  - DB (left child of 40); sibling 60 BLACK with both children BLACK → **Case 3(3)**: remove DB, extra black to parent 40 (BLACK → DOUBLE BLACK), sibling 60 → RED; DB moves up.
  - DB(40) is the root → **Case 3(1)**: remove DB [terminal].
```
(a) 25 -> DB    (b) Case 3(3): DB up    (c) Case 3(1)
  40B_          40DB_                   40B_
 /    \              \                      \
DB   60B            60R                    60R
```

| Delete | Node actually removed | Situation | Case(s) |
|---|---|---|---|
| 15 | 15, black leaf | parent 25 red, **but** sibling 30 has a red child 40, so the "Or" rule is unsafe; DB is a left child and the far child 40 is red | **3(5)** |
| 85 | 85, black leaf | parent 80 red, sibling 65 black with NIL children | **"Or" rule** (= 3(3) with a red parent) |
| 80 | 80, black with red child 65 | — | **Case 2** |
| 65 | 65, black leaf | parent 60 black, sibling 30 **red**; after the rotation the new sibling 40 is black with NIL children and the parent 60 is red | **3(2) → 3(3)** |
| 30 | two children → predecessor 25 copied up; the old 25 is a black leaf | parent black; sibling 60 black, far child NIL (black), near child 40 red | **3(4) → 3(5)** |
| 25 | 25, black leaf | parent 40 black, sibling 60 black with NIL children → 3(3) turns the root 40 into DB → 3(1) | **3(3) → 3(1)** |

- **Final tree: 40B with a right child 60R** ✅ (bh = 1).
- **With the successor instead,** only "delete 30" changes: the successor 40 is a red leaf, so it is copied up and removed by **Case 1**. The tree after that step (40B with 25B and 60B) is the same, so the final tree is the same ✅.
- Deletion Case 1 (a red node) does not occur in this sequence; the class Example A has it (delete 79).
- 🪤 **Delete 15** is the "Or"-caveat situation from §2.13: a black node, a red parent, but a sibling with a red child.

### Q13. Short questions

- **S1.**
  - (a) A **calling prototype** (the name of the operation; its parameters and their types; the return value and its type) + **preconditions** (statements assumed true when the operation is called) + **postconditions** (statements assumed true when it returns) [D02-S6].
  - (b) **Initialization** (the invariant is true before the first iteration), **Maintenance** (true before an iteration ⇒ true before the next one), **Termination** (the invariant plus the reason the loop stopped give a useful property) [D01-S12].
- **S2. (B).** a = 0.5 < 1 breaks the condition a ≥ 1, just like D05-S6 #8. The other three ✅:
  - (A) [3, 2, 2, 0]: 3 < 4 → 3(a) → **Θ(n²)**;
  - (C) [16, 4, 2, 0]: 16 = 4² → 2(a) → **Θ(n² log n)**;
  - (D) [1, 2, 0, 1]: 1 = 2⁰ and p = 1 → 2(a) → **Θ(log² n)**.
- **S3. (B)** quick, heap, selection [D06-S3]. (A) is the stable list; (C) and (D) mix stable and unstable sorts.
- **S4.** ✅
  - children of 4: **9 and 10** (2i + 1, 2i + 2);
  - parent of 7: **⌈7/2⌉ − 1 = 3**;
  - leaves: **5 … 10** (⌊11/2⌋ to n − 1);
  - the BUILD loop starts at **i = ⌊11/2⌋ − 1 = 4** [D09-S9, S10].
- **S5. (B)** [D12-S3, S4].
  - (A) is reversed: AVL trees need *more* rotations.
  - (C) is false: B-tree nodes can have multiple children [D12-S5].
  - (D) describes the AVL balance factor, not RB trees.

---

## 9. Last-48-hours checklist

Tick each line only when you can do it **on paper, without notes, in the sheet format of §1**. The section and slide pointers say where to re-read.

- [ ] **1.** I can write the O, Ω and Θ definitions exactly and find **c and n₀** for a polynomial and for a 2ⁿ-plus-polynomial, checking the values *before* n₀ (n² ≤ 2ⁿ fails at n = 3). [§2.1; D03-S10–S15]
- [ ] **2.** I can deal with a negative term: drop it for O, "pay" for it with part of the leading term for Ω. [D03-S12 📝; mock Q1(a)]
- [ ] **3.** I can judge o / Ω / Θ / ω claims from the leading terms (a < b, a ≥ b, …) and disprove a wrong bound by contradiction. [D03-S19, S23–S27; mock Q2]
- [ ] **4.** I can turn any `demo(n)` program into a recurrence (watching the braces and the base case) and give the slide answer. [§2.2; D04-S3–S8]
- [ ] **5.** I can fill **[a, b, k, p] / Case / Ans** for any n/b recurrence: p from 1/log n, near-ties like #7, "not applicable" for #3, #8, #10. I know case 3(b) is only an upper bound. [§2.3; §5]
- [ ] **6.** I can apply the decreasing form: a = 1 → n·f(n); a > 1 → f(n)·a^(n/b); b ≥ 1. [D05-S3; D04-S11]
- [ ] **7.** I can draw a recursion tree with level totals, height and **leaf level** and sum it with the slide series, including 2T(n−1) + 1 = 2ⁿ − 1 (the A1 part that lost marks). [§2.4; mock Q4]
- [ ] **8.** I can trace insertion sort pass by pass, count comparisons and shifts, and quote F(n) = n(n−1)/2, best Ω(n), worst O(n²). [§2.5; mock Q5]
- [ ] **9.** I can trace the **first PARTITION** on a 1…n sheet (x = A[r], i = 0, j = 1 … r−1, test ≤, final A[i+1] ↔ A[r], return q) in the A2-sample table. [§2.6; mock Q6]
- [ ] **10.** I can give quicksort's worst and best recurrences and answers, say which input is worst (sorted), explain T1 = T2, and give the median and (n/4)-th pivot results. [D07-S11–S21]
- [ ] **11.** I can produce the merge-sort grid (q = ⌊(p+r)/2⌋, uneven halves for odd n), trace a MERGE k by k with "copy the rest", and use "merge cost per level × levels". [§2.7; mock Q7]
- [ ] **12.** I can run **BUILD-MAX-HEAP** in the 0-based table: loop ⌊n/2⌋−1 → 0, "(X)" children, recursion **at the child's index**, "exit" notes. [§2.8; A2 Q1; mock Q8]
- [ ] **13.** I can do HEAP-EXTRACT-MAX and every HEAP-SORT iteration, and quote heapify O(log n), build O(n), sort O(n log n), O(1) space, unstable. [D09-S15–S22]
- [ ] **14.** I can run BucketSort (counts, then write-back; O(n + m), or O(m) when m >>> n) and radix sort pass by pass (leading zeros, stable collection), including words (right → left, blanks at the end, blank bucket last). [§2.9, §2.10; mock Q9]
- [ ] **15.** I can reproduce the **D06-S3 classification** and the **D10-S3 complexity table** from memory. [§4.5, §4.6]
- [ ] **16.** I can explain amortized vs average-case analysis, name the three techniques and "Σ amortized ≥ Σ actual", and work the k-th-smallest, doubling and stack scenarios with a bookkeeping table. [§2.11; mock Q10]
- [ ] **17.** I can state the four RB properties, compute bh, check whether a drawn tree is valid (D13-S13 is not), and do left and right rotations keeping A x B y C. [§4.8; D12-S6–S8]
- [ ] **18.** I can insert a key sequence into an RB tree, naming Case 1 / 2 / 3 and the mirror cases at every step, with at most 2 rotations per insert. [§2.12; mock Q11]
- [ ] **19.** I can delete from an RB tree with the **predecessor**, naming Case 1, Case 2, the "Or" rule (and when it is **unsafe**) and 3(1)–3(5). [§2.13; mock Q12]
- [ ] **20.** I can answer the week-1 definition questions (5 properties, 7 techniques, W(n), loop invariant, optimality, ADT spec, stack/queue) and the AVL vs RB vs B-tree comparison. [§4.2, §4.9; mock Q13]

**If time is short** (an inference from A1/A2, not an announcement), go in this order:
1. the D05-S6 list and the c/n₀ proofs;
2. the recursion tree;
3. the heap, PARTITION and merge tables;
4. RB insert/delete;
5. amortized analysis;
6. the definitions and tables.

Then sit the §7 mock once, timed, and mark it against §8.
