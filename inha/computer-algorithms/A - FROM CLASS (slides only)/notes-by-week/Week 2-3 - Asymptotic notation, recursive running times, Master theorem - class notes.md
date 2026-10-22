# Weeks 2–3 — Asymptotic notations, running time of recursive programs, Master theorem (CLASS NOTES — from slides only)

> Sources: [D03-S#] = "03 - Asymptotic notations" (29 slides) · [D04-S#] = "04 - Analyzing Running Times of recursive Programs" (14 slides) · [D05-S#] = "05 - Master's_Theorem" (7 slides).
> Course: SOC3030-003 Computer Algorithm, Prof. Seth Ashish, Fall 2026. Midterm = week 8 (24–30 Oct 2026). Syllabus line: *"Problem based on Recurrences and Master theorem"*.
> **Track A only.** Everything below comes from the slides (plus the professor's own speaker notes inside the current .pptx files). Anything the slides don't explain gets a 🔎 pointer to Track B.

**Legend**

| Mark | Meaning |
|---|---|
| ⭐ | Emphasized on the slide (red, bold, boxed) or matches the syllabus exam line exactly |
| ⚠️ | Typo, inconsistency or math error on the slide (checked by script where it is math) |
| ✅ | I re-checked this with a sympy or numeric script (exact integers, or ratios for n up to b^10000) |
| 📝 | The professor's **speaker notes** in the current .pptx. They are not visible on the slide image but are part of the class file. The older W2 upload of deck 03 had none, so he added them recently. |
| 🔎 | Not explained on the slides. Look it up in Track B. |

**Reading the symbols**
- In the slide PNGs, many symbols (Θ, Ω, ω, ∃, ∀, ≤, ≥, ⇒, ⊂, ∩, ↔) show up as **empty boxes** because of the Symbol font. I recovered every one of them from the .pptx XML.
- In decks 04–05 the professor writes big-O with the **digit zero**, so "0(n)" means O(n). "ϴ" means Θ.
- In these notes, `x^y` means x to the power y, and `log_b a` means log base b of a.
- Unless a base is shown, `log` = log₂. Changing the base only changes constants.
- In the raw-text export, superscripts are lost: "2n" in a function means 2ⁿ, "n2" means n², and "21/2" means 2^(1/2) = √2.

---

## 1. Big picture

- **Why a model.** Running time is measured in a *mathematical model of computation*, which has two parts: a processor with a defined instruction set and a memory made of locations. The model says which operations are allowed and how much each one costs. This way T(n) describes the **algorithm, not the machine** [D03-S2–S6].
- **Count, then simplify.** Simple statements cost 1 step. A 1-D array operation costs 2 steps. Complex statements cost several steps; for example, `A[I]=B[I]+C[I]` is 4 steps [D03-S4, S5]. You then keep only the **highest-order term**, because only large n matters [D03-S8].
- **Five notations: Θ, O, Ω, o, ω** [D03-S9].
  - O = asymptotic **upper** bound (constants c, n₀).
  - Ω = asymptotic **lower** bound (constants c, n₀).
  - Θ = asymptotically **tight** bound (constants c₁, c₂, n₀).
  - The formal definitions are on [D03-S10–S14].
- **Key theorem and properties.** f = Θ(g) ⇔ f = O(g) and f = Ω(g), so Θ = O ∩ Ω [D03-S17]. The properties are transitivity, reflexivity, symmetry and complementarity. o and ω behave like "<" and ">" [D03-S19–S21].
- **Practice drills.** Find O, Ω or Θ (with c and n₀) for polynomials and 2ⁿ-type functions, and spot **incorrect bounds** [D03-S22–S27].
- **From recursive code to a recurrence.** T(n) = (number of recursive calls) × T(smaller size) + (work done inside this call). There are six standard `demo(n)` programs, which give O(n²), O(n log n), O(2ⁿ), O(log n), O(n) and O(n log n) [D04-S3–S8].
- **Three solving techniques:** back substitution, the recursion tree, and Master's theorem [D04-S2]. Recursion-tree intuition: the work concentrates at the **root** (giving n²), is **equal on all levels** (giving n log n), or concentrates at the **leaves** (giving n) [D04-S10].
- **Master theorem, two forms** [D05-S2–S6]:
  - **Dividing form:** T(n) = aT(n/b) + Θ(n^k log^p n). Compare a with b^k to choose one of 3 cases, then use p to choose the sub-case.
  - **Decreasing form:** T(n) = aT(n−b) + f(n). There are 2 cases, depending on whether a = 1 or a > 1.
- ⭐ **Highest exam value:** the "Results" tables [D04-S11, S12] and the **14 Master-theorem examples** [D05-S6]. All of them are solved and verified in §5.
- ⚠️ **Watch out for:**
  - Case 3(b) of the slide's theorem is mathematically wrong as a Θ.
  - Examples #8 and #10 on [D05-S6] are **not applicable**, even though the slide doesn't say so.
  - Details are in [D05-S5] and [D05-S6].

---

## 2. Slide-by-slide notes

### Deck 03 — Asymptotic notations (29 slides)

> The footer "asymp - k" on a slide means slide k+1 (e.g., "asymp - 9" = S10 = O-notation). S7 has no footer.

### [D03-S1] Asymptotic Notations (title slide)
- Title only.

### [D03-S2] Mathematical Model of Computation
- The slide has three underlined/plain headings and nothing else:
  - "Framework for Algorithmic Analysis"
  - "Need of Mathematical Model"
  - "Real Computers Vs Mathematical Model"
- These are talking points for the lecture. The video "Mathematical Model of Computation" is linked on [D03-S29].
- 🔎 Look up in Track B: why a mathematical model is needed, and how a real computer differs from the model.

### [D03-S3] Mathematical Model of Computation
- A model of computation specifies two things:
  - which operations an algorithm is allowed to use;
  - the cost (time) of each operation.
- The model has **two components**:
  - **Processor**, which has a defined instruction set;
  - **Memory**, which is a collection of locations.
- 📝 Speaker notes: first identify the model you are measuring in:
  - **Turing Machine:** count the state transitions (tape movements and writes) until it halts.
  - **Random Access Machine (RAM):** count the basic machine-level instructions executed (assignments, comparisons, basic arithmetic).
  - **Boolean Circuit:** count the logic gates (AND, OR, NOT), or the circuit depth.

### [D03-S4] Computing running time in Model
- **Simple statement = 1-step execution.** This covers:
  - arithmetic & logical operations;
  - jumps & conditional jumps;
  - pointer instructions.
- **Array operations (1D) = [2 step execution].** This bracket is new: the old W2 upload of this deck did not have it.
- 📝 Speaker notes explain how *multiplication* is costed in different RAM variants:
  1. **Standard (unit-cost) RAM.** Multiplication is a primitive with uniform cost O(1), however large the numbers are. This model is used because it keeps the analysis simple.
  2. **Word RAM.** Data sits in machine words of w bits, with w ≥ log n.
     - Multiplication is O(1) only if both numbers fit in one word.
     - Multi-word numbers need an explicit multiplication algorithm (the notes name Karatsuba and Schönhage–Strassen), which has a non-constant cost.
  3. **Logarithmic-cost RAM.** This is for strict complexity theory. The unit-cost model would let you multiply arbitrarily large numbers in one step, which is unrealistic, and this model "fixes this". The note stops mid-sentence there.

### [D03-S5] More Complex Statement (multistep execution)

| Statement | Steps (as on slide) | How the slide counts it |
|---|---|---|
| `A=B+C*D-F` | **3 steps** | three operators: `*`, `+`, `−` |
| `A[I]=B[I] + C[I]` | **4 steps** | split into 4 simple statements: `X=B[I]` · `Y=C[I]` · `Z=X+Y` · `A[I]=Z` |
| `C = A[I,J]` | **4 steps** | a 2-D access is computed as `A' [(I)*M + J]`, where M = number of columns |

- 📝 Speaker notes:
  - A 2-D access needs **1 multiplication + 2 additions + 1 fetch = 4 steps**.
  - The address is base address + (i × no. of columns + j) × size of element.
  - The pattern: **2-D: 4, 3-D: 6, N-D: 2N operations**. That is N−1 multiplications, N−1 additions for the offset, 1 base-address addition and 1 memory fetch.
- ⚠️ Inconsistencies to be aware of:
  - (a) The notes say "1D Array: 1 operation". But their own formula 2N gives **2** for N = 1, which matches "[2 step execution]" on [D03-S4].
  - (b) [D03-S4] says a 1-D array operation costs 2 steps, yet here `A[I]=B[I]+C[I]` is counted as **4** steps, with each array access counted as 1. If each of the 3 array accesses cost 2 steps, you would get 3×2 + 1 = 7.
    - **For the exam, use the slide's numbers (3, 4, 4).** If you're unsure, ask the professor which convention he wants.
  - (c) The address formula in the notes includes "× size of elements", but the "1 mult + 2 add + 1 fetch" count leaves that multiplication out.
  - (d) The slide writes **M** in the formula and **m** in the caption. They are the same thing.

### [D03-S6] General Analysis Strategy T(n)
- The slide writes **"T(n)= n"** under the heading and doesn't explain it further. Read it as: T is a function of the input size n.
- What the slide says about T(n):
  - T(n) is the **maximum time** the algorithm takes on **any** instance of size n. In other words, it is the worst case.
  - T(n) measures how good an algorithm is. What matters is the **functional form** of T(n): linear, quadratic, cubic, and so on.
  - The meaning of T(n) does **not depend on the model or computer** used. The goal is to characterize the algorithm, not the machine.
- **"Running Time Calculations: To Add elements of two arrays of size n."** This is only a heading; the slide shows no worked numbers.
  - Using the slide's own counting from [D03-S5], each `A[I]=B[I]+C[I]` costs 4 steps.
  - Done n times, that is about 4n steps, plus loop control (each 1 step by [D03-S4]).
  - So T(n) is **linear**. See §5 W1.

### [D03-S7] Asymptotic Notations — two features
- Asymptotic notation has two features:
  1. **Function classification.**
  2. **Identifying the behaviour as n → ∞.** The "∞" is missing in the PNG; the .pptx has "n → ∞".

### [D03-S8] Asymptotic Complexity ⭐
- Asymptotic complexity is the running time of an algorithm as a function of the input size n, **for large n** (red on the slide).
- It is expressed using only the **highest-order term** (red) of the exact running time. Example: instead of the exact running time, say **Θ(n²)**. The Θ is a box in the PNG but Θ in the .pptx.
- It is written using **Asymptotic Notation** (red).

### [D03-S9] Asymptotic Notation ⭐
- The five notations, in red bold on the slide: **Θ, O, Ω, o, ω**.
- They are defined for functions over the **natural numbers**.
- Example: f(n) = Θ(n²) describes how f(n) grows compared with n².
- Each notation describes a different **rate-of-growth relation** between the defining function g and the defined *set* of functions.

### [D03-S10] O-notation ⭐
> For function g(n), we define O(g(n)), big-O of n, as the set:
> **O(g(n)) = {f(n) : ∃ positive constants c and n₀, such that ∀n ≥ n₀, we have 0 ≤ f(n) ≤ cg(n) }**

- g(n) is an **asymptotic upper bound** for f(n).
- Intuitively, O(g(n)) is the set of all functions whose rate of growth is the **same as or lower** than that of g(n).
- f(n) = Θ(g(n)) ⇒ f(n) = O(g(n)), and Θ(g(n)) ⊂ O(g(n)).
- **Figure:** two curves, f(n) and cg(n), plotted against n, with a dashed vertical line at n₀.
  - Left of n₀, f(n) wiggles and is sometimes above cg(n).
  - From n₀ on, f(n) always stays **on or below** cg(n). The yellow area is the region under cg(n).
  - Caption: f(n) = O(g(n)).
- ⚠️ Wording: "big-O of n" should be read as "big-O of g of n". The same slip appears on [D03-S12] and [D03-S13].

### [D03-S11] Examples ⭐
- The slide repeats the O definition in a box.
- Two questions:
  - "Any linear function an + b is in O(n²). **How?**" ("How?" is in red bold.)
  - "Show that 3n³ = O(n⁴) for appropriate c and n₀."
- Answers ✅ (full working in §5 W2–W3):
  - For a > 0: an + b ≤ (a + |b|)·n² for n ≥ max(1, −b/a). For example, 3n + 5 ≤ 8n² for n ≥ 1.
  - 3n³ ≤ 3·n⁴ for n ≥ 1, so **c = 3, n₀ = 1**. Alternatively, 3n³ ≤ 1·n⁴ for n ≥ 3, so **c = 1, n₀ = 3**.
- 📝 Speaker notes on choosing c:
  - In a big-O calculation, many (c, n₀) combinations are possible, and **all are equally correct**. Big-O only needs *some* valid pair to exist.
  - A **smaller c** with a reasonable n₀ is preferred, because it gives a tighter upper bound. A huge c such as 1,000,000 technically works but is loose.
  - **For Big-Omega the preference flips:** a **larger c** is preferred, because it gives a tighter, more realistic estimate of the minimum work the algorithm must do.
  - ⚠️ Wording in the notes: "your algorithm will run at least this fast". For a *lower* bound, this means it needs at least this much work. The next sentence of the notes says exactly that.

### [D03-S12] Ω-notation ⭐
> For function g(n), we define Ω(g(n)), big-Omega of n, as the set:
> **Ω(g(n)) = {f(n) : ∃ positive constants c and n₀, such that ∀n ≥ n₀, we have 0 ≤ cg(n) ≤ f(n)}**

- g(n) is an **asymptotic lower bound** for f(n).
- Intuitively, Ω(g(n)) is the set of all functions whose rate of growth is the **same as or higher** than that of g(n).
- f(n) = Θ(g(n)) ⇒ f(n) = Ω(g(n)), and Θ(g(n)) ⊂ Ω(g(n)).
- **Figure:** f(n) and cg(n) against n.
  - Before n₀, f(n) dips below cg(n).
  - From n₀ on, f(n) stays **on or above** cg(n). The yellow area is the region above cg(n).
  - Caption: f(n) = Ω(g(n)).
- 📝 Speaker notes, "What happens to the negative sign?": when you turn an exact function into O, Ω or Θ, the negative terms are dropped, because only the fastest-growing term matters as n → ∞.
  - **For O (upper bound):** you may simply drop the negative term. Since −2n ≤ 0, 5n² − 2n ≤ 5n², so **c = 5** gives O(n²).
  - **For Ω (lower bound):** you *cannot* just drop it, because that would make your estimate larger. Instead, "pay" for the negative term with a fraction of the dominant term. For n ≥ 2, 5n² − 2n ≥ 5n² − 2n² = 3n², so **c = 3** gives Ω(n²).
  - ✅ The inequality actually holds from n = 1 already.

### [D03-S13] Θ-notation ⭐
> For function g(n), we define Θ(g(n)), big-Theta of n, as the set:
> **Θ(g(n)) = {f(n) : ∃ positive constants c₁, c₂, and n₀, such that ∀n ≥ n₀, we have 0 ≤ c₁g(n) ≤ f(n) ≤ c₂g(n) }**

- g(n) is an **asymptotically tight bound** for f(n).
- Intuitively, Θ(g(n)) is the set of all functions that have the **same rate of growth** as g(n).
- **Figure:** f(n) is sandwiched in a yellow band between c₁g(n), the lower curve, and c₂g(n), the upper curve, for all n ≥ n₀. Before n₀ it may leave the band. Caption: f(n) = Θ(g(n)).

### [D03-S14] Θ-notation (continued)
- This slide repeats the Θ definition and the figure.
- Notation:
  - Technically, **f(n) ∈ Θ(g(n))**.
  - The older usage is **f(n) = Θ(g(n))**.
  - Either notation is accepted.
- **f(n) and g(n) are nonnegative, for large n.** (Bold on the slide.)

### [D03-S15] Example ⭐
- The slide repeats the Θ definition in a box.
- The question: **10n² − 3n = Θ(n²)**. What constants n₀, c₁ and c₂ will work?
- The slide's hint: make c₁ a little **smaller** than the leading coefficient, and c₂ a little **bigger**.
- ⭐ In red italics: **"To compare orders of growth, look at the leading term."**
- Answer ✅ (full working in §5 W4):
  - **c₁ = 9, c₂ = 11, n₀ = 3**, because 9n² ≤ 10n² − 3n ⇔ 3n ≤ n² ⇔ n ≥ 3.
  - Alternative using the notes' "pay for the negative term" trick: **c₁ = 7, c₂ = 10, n₀ = 1**.

### [D03-S16] Relations Between Θ, O, Ω
- Figure only: three graphs side by side, each with a dashed line at n₀.
  - **f(n) = Θ(g(n)):** f lies between c₁g(n) and c₂g(n).
  - **f(n) = O(g(n)):** f lies below cg(n).
  - **f(n) = Ω(g(n)):** f lies above cg(n).

### [D03-S17] Relations Between Θ, Ω, O ⭐
> **Theorem:** For any two functions g(n) and f(n), **f(n) = Θ(g(n)) iff f(n) = O(g(n)) and f(n) = Ω(g(n)).**

- In other words, **Θ(g(n)) = O(g(n)) ∩ Ω(g(n))**.
- In practice, tight bounds are obtained by proving an upper bound and a lower bound. This is exactly how a Θ answer is proved in §5 W9.

### [D03-S18] Running Times
- "Running time is O(f(n))" ⇒ **worst case** is O(f(n)).
- "Running time is Ω(f(n))" ⇒ **best case** is Ω(f(n)).

### [D03-S19] Comparison of Functions
- The analogy on the slide is **f ↔ g ≈ a ↔ b**: comparing functions is like comparing two real numbers a and b.

| Function relation | Number analogy |
|---|---|
| f(n) = O(g(n)) | a ≤ b |
| f(n) = Ω(g(n)) | a ≥ b |
| f(n) = Θ(g(n)) | a = b |
| f(n) = o(g(n)) | a < b |
| f(n) = ω(g(n)) | a > b |

- This analogy is the **only "definition" of o and ω** in the class slides. There is no set definition with constants for them.
- 🔎 Look up in Track B: the formal definitions of little-o and little-omega.

### [D03-S20] Properties — Transitivity, Reflexivity
- **Transitivity**, stated for all five notations:
  - f(n) = Θ(g(n)) & g(n) = Θ(h(n)) ⇒ f(n) = Θ(h(n))
  - f(n) = O(g(n)) & g(n) = O(h(n)) ⇒ f(n) = O(h(n))
  - f(n) = Ω(g(n)) & g(n) = Ω(h(n)) ⇒ f(n) = Ω(h(n))
  - f(n) = o(g(n)) & g(n) = o(h(n)) ⇒ f(n) = o(h(n))
  - f(n) = ω(g(n)) & g(n) = ω(h(n)) ⇒ f(n) = ω(h(n))
- **Reflexivity:** f(n) = Θ(f(n)), f(n) = O(f(n)) and f(n) = Ω(f(n)).
  - The slide lists reflexivity **only for Θ, O and Ω**. This fits the analogy on S19: a = a, a ≤ a and a ≥ a are true, but a < a and a > a are false.

### [D03-S21] Properties — Symmetry, Complementarity
- **Symmetry:** f(n) = Θ(g(n)) iff g(n) = Θ(f(n)).
- **Complementarity:**
  - f(n) = O(g(n)) iff g(n) = Ω(f(n));
  - f(n) = o(g(n)) iff g(n) = ω(f(n)).
- ⚠️ Typo on the slide: "ω((f(n))" has an extra "(".

### [D03-S22] Growth of a function — "Find the **big oh** for the following functions" ⭐
- f(n) = 3n + 5
- f(n) = 27n² + 16n + 25
- f(n) = 3n³ + 4n
- f(n) = 2ⁿ + 6n² + 3n
- f(n) = 5·2ⁿ + 3n + 5
- f(n) = 3·2ⁿ + 4n² + 5n + 3

Answers ✅ (proofs in §5 W5): **O(n), O(n²), O(n³), O(2ⁿ), O(2ⁿ), O(2ⁿ)**. In each case, keep the leading term [D03-S15].

### [D03-S23] Incorrect bounds (O)
- 7n + 5 ≠ O(1)
- 27n² + 16n + 25 ≠ O(n)
- 5n³ + n² + 3n + 2 ≠ O(n²)

Why ✅: in each case f(n)/g(n) grows without limit. For example, (27n² + 16n + 25)/n ≈ 27n. So no constant c can satisfy f(n) ≤ c·g(n) for all large n. Proofs are in §5 W6.

### [D03-S24] Find the **big Omega** for the following functions ⭐
- f(n) = 27n² + 16n → **Ω(n²)**
- f(n) = 4n³ + 2n + 3 → **Ω(n³)**
- f(n) = 2ⁿ + 6n² + 3n → **Ω(2ⁿ)**
- f(n) = 5·2ⁿ + 3n + 5 → **Ω(2ⁿ)**

The answers are mine ✅, with constants in §5 W7.

### [D03-S25] Incorrect bounds (Ω)
- 7n + 5 ≠ Ω(n²)
- 5n² + 4n + 2 ≠ Ω(n³)
- 3n³ + 5n² + 2n ≠ Ω(n⁴)

Why ✅: f(n)/g(n) → 0. For example, (7n + 5)/n² ≤ 12/n. So no positive c can satisfy c·g(n) ≤ f(n) for all large n. Proofs are in §5 W8.

### [D03-S26] Find the **Theta** for the following functions ⭐
- f(n) = 27n² + 16n → **Θ(n²)**
- f(n) = 4n³ + 2n + 3 → **Θ(n³)**
- f(n) = 2ⁿ + 6n² + 3n → **Θ(2ⁿ)**

The answers are mine ✅, with c₁, c₂ and n₀ in §5 W9. They follow from the theorem on [D03-S17]: O plus Ω gives Θ.

### [D03-S27] Incorrect bounds (Θ)
- 7n + 5 ≠ Θ(1). It is not O(1).
- 10n² + 7 ≠ Θ(n³). It is O(n³) but **not Ω(n³)**.
- 5n + 8 ≠ Θ(n²). It is O(n²) but **not Ω(n²)**.

Why: Θ needs **both** halves of the theorem on [D03-S17]. Proofs are in §5 W10.

### [D03-S28] Related Contents
- Link: "Basics of Asymptotic Notations" — https://cexpertvision.com/2023/06/23/basics-of-asymptotic-notations/

### [D03-S29] Video Lecture of the topic
- Mathematical Model of Computation — https://youtu.be/JEnXJPlXhng
- Basics of Asymptotic Notations — https://youtu.be/OQZySiRblPo

---

### Deck 04 — Analyzing Running Times of Recursive Programs (14 slides)

> In this deck, "0(…)" written with the digit zero means big-O.
> The six `demo` programs (S3–S8) are the class template for the question "running time of this code". Each one is set up as a recurrence and solved below.

### [D04-S1] Analyzing Running Times Of Recursive Program Code (title slide)
- Title only.

### [D04-S2] Techniques of Analyzing Recursive Code ⭐
- **Back Substitution Method**
- **Recursive Tree Method**
- **Master's Theorem** (covered in deck 05)
- The slides use the first two only through examples and results (S9–S12); they don't give a general write-up.
- The class videos for both are on [D04-S14].
- 🔎 Look up in Track B: a general step-by-step write-up of back substitution and the recursion-tree method.
- In §4 I describe both exactly as they are applied to the slide's own examples.

### [D04-S3] 0(n²) ⭐
```
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
```
- **Recurrence.**
  - A call with n > 0 runs the loop n times (n prints) and makes **one** call on n−1. The base case is n = 0, which costs a constant.
  - So **T(n) = T(n−1) + n**, with T(0) = constant.
- **Back substitution.**
  - T(n) = n + (n−1) + (n−2) + … + 1 + T(0) = n(n+1)/2 + T(0).
  - So T(n) = **O(n²)**.
  - ✅ Simulating the code, the print count is exactly n(n+1)/2 for every n ≤ 2000.
- **Recursion "tree".** It is a single chain: demo(n) → demo(n−1) → … → demo(0). The levels cost n, n−1, …, 1.

### [D04-S4] 0(n logn) ⭐
```
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
```
- **The loop.** i takes the values 1, 2, 4, …, up to n, so it runs **⌊log₂ n⌋ + 1 ≈ log n** times.
- **Recurrence:** **T(n) = T(n−1) + log n**.
- **Back substitution.**
  - T(n) = log n + log(n−1) + … + log 1 = log(n!).
  - Since log(n!) ≤ n log n, T(n) = **O(n log n)**.
  - ✅ The print count divided by n log₂ n climbs to 0.92 at n = 4000 and keeps approaching 1.
- **Recursion "tree".** A chain whose levels cost log n, log(n−1), …

### [D04-S5] 0(2ⁿ) ⭐
```
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
```
- **Recurrence:** **T(n) = 2T(n−1) + 1** (one print plus **two** calls on n−1).
- **Back substitution.**
  - T(n) = 2T(n−1) + 1 = 4T(n−2) + 2 + 1 = … = 2^k T(n−k) + (2^k − 1).
  - Taking k = n gives T(n) = 2ⁿ·T(0) + 2ⁿ − 1, so T(n) = **O(2ⁿ)**.
  - ✅ The print count is exactly 2ⁿ − 1.
- **Recursion tree.**
  - It is a full binary tree of depth n.
  - Level i has 2^i calls, and each prints once.
  - The level costs are 1, 2, 4, …, 2^(n−1), so most of the work is near the leaves.

### [D04-S6] 0(logn) ⭐
```
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
```
- **Recurrence:** **T(n) = T(n/2) + 1**, with T(1) = constant. Note that the base case here is **n > 1**, unlike n > 0 on S3–S5.
- **Back substitution.**
  - T(n) = T(n/2^k) + k.
  - n/2^k reaches 1 when k = log₂ n, so T(n) = **O(log n)**.
  - ✅ The print count is exactly ⌊log₂ n⌋ for every n < 100000.

### [D04-S7] 0(n) ⭐
```
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
```
- The loop has no braces, so **only `print` is inside the loop**. The `demo(n/2)` call runs once, after the loop. The slide's indentation hides this.
- **Recurrence:** **T(n) = T(n/2) + n**.
- **Back substitution.**
  - T(n) = n + n/2 + n/4 + … + 1 < 2n.
  - So T(n) = **O(n)**.
  - ✅ The print count is ≤ 2n and the ratio tends to exactly 2.

### [D04-S8] 0(n logn) ⭐
```
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
```
- **Recurrence:** **T(n) = 2T(n/2) + n**. The loop does n prints, then there are **two** calls on n/2. Again, only `print` is inside the loop.
- **Recursion tree.**
  - Level i has 2^i calls, each of size n/2^i, so the level costs 2^i · (n/2^i) = **n**.
  - There are log₂ n levels.
  - Total ≈ n log₂ n, so T(n) = **O(n log n)**.
  - ✅ For n = 2^m the print count is exactly m·2^m = n log₂ n.

### [D04-S9] T(n) = c + 2T(n/2) → 0(n) ⭐
```
T(n) = c + 2T(n/2)     n>1
     = c               n=1          ⇒ 0(n)
```
- **Back substitution** (my step-by-step derivation of the slide's answer):
  - T(n) = c + 2T(n/2)
  - = c + 2c + 4T(n/4)
  - = c + 2c + 4c + 8T(n/8)
  - = c(1 + 2 + … + 2^(k−1)) + 2^k T(n/2^k).
  - Stop when n/2^k = 1, i.e. 2^k = n. Then T(n) = c(n − 1) + n·c = **c(2n − 1)**, so T(n) = **O(n)**.
  - ✅ The closed form holds exactly for n = 2^m (m ≤ 39).
- **Recursion tree.**
  - Level i has 2^i nodes, each costing c, so the level cost is 2^i·c: c, 2c, 4c, …, nc.
  - The cost **doubles** each level, so the bottom (leaf) level dominates, as in the third line of S10.
- **Connection to S8:** this is the code of [D04-S8] *without the loop*, i.e. constant work per call. ✅ The number of calls made by the S8 program is exactly 2n − 1.

### [D04-S10] Amount of work done varies at different levels ⭐
The slide's bold heading is "Amount of work done varies at different levels":

| Recurrence (slide) | Slide's comment | Slide's answer |
|---|---|---|
| T(n) = 2T(n/2) + cn² | (max. work done at **root**) | **[ n² ]** |
| T(n) = 2T(n/2) + cn | (work is done **equally at all levels**) | **[ n log n ]** |
| T(n) = 2T(n/2) + c | (max. work done at **leaves**) | **[ n ]** |

**The recursion trees in words.** All three trees are binary: each node has 2 children of half the size, and level i has 2^i nodes of size n/2^i.
- **+cn².**
  - Level i costs 2^i · c(n/2^i)² = cn²/2^i, so the levels cost cn², cn²/2, cn²/4, …, halving each time.
  - The total is less than 2cn², so T(n) = Θ(n²). The **root** level alone already costs cn².
  - ✅ T/n² → 2.
- **+cn.**
  - Level i costs 2^i · c(n/2^i) = **cn**, the same on every level.
  - With log₂ n + 1 levels, the total is cn(log₂ n + 1), so T(n) = Θ(n log n).
  - ✅ T/(n log n) → 1.
- **+c.**
  - Level i costs 2^i·c, so the levels cost c, 2c, 4c, …, doubling each time.
  - The **leaf** level has n nodes, and the total is c(2n − 1), so T(n) = Θ(n).
  - ✅ T/n → 2.

### [D04-S11] Results ⭐
Decreasing recurrences: the size drops by 1 at each call.

| Recurrence | Slide's answer |
|---|---|
| T(n) = c + T(n−1) | 0(n) |
| T(n) = 1 + T(n−1) | 0(n) |
| T(n) = n + T(n−1) | 0(n²) |
| T(n) = n² + T(n−1) | 0(n³) |
| T(n) = logn + T(n−1) | 0(nlogn) |
| T(n) = 2T(n−1) + c | 0(2ⁿ) |
| T(n) = 3T(n−1) + 1 | 0(3ⁿ) |
| T(n) = 2T(n−1) + n | 0(n2ⁿ) |
| T(n) = 2T(n−1) + log n | 0(log n.2ⁿ) |

- **The pattern to memorize** (formalized on [D05-S3]):
  - With **one** recursive call (a = 1), the answer is n × (the added term).
  - With **a > 1** calls, the answer is aⁿ × (the added term).
- All nine are worked by back substitution in §5 W14. The exact closed forms are ✅ checked with sympy.
- ✅ Two lines are **valid upper bounds but not tight**. This is not an error, since the answers are stated with O:
  - 2T(n−1) + n is exactly 2^(n+1) − n − 2, which is Θ(2ⁿ).
  - 2T(n−1) + log n is about 0.73·2ⁿ, which is Θ(2ⁿ).
  - So O(n2ⁿ) and O(log n·2ⁿ) are correct but loose.
  - On the exam, give the professor's answers; they are exactly what his rule on [D05-S3] produces.

### [D04-S12] Dividing recurrences ⭐
- T(n) = T(n/2) + 1 = 0(log n)
- T(n) = T(n/2) + n = 0(n)
- T(n) = 2T(n/2) + n = 0(n log n)

These are the recurrences of the codes on S6, S7 and S8. ✅ All three are re-derived with the Master theorem in §5 W15. Numerically, the ratios to log n, n and n log n tend to 1, 2 and 1.

### [D04-S13] Related contents can be found
- Analyzing Running Time of Iterative Algorithms — https://cexpertvision.com/analyzing-running-time-of-iterative-algorithms/
- Back Substitution Method — https://cexpertvision.com/back-substitution-method/

### [D04-S14] Video Lecture of the topic
- Analyzing Running Time of Iterative Program Code — https://youtu.be/zcPF4ZXt5FI
- Analyzing Running Time of Recursive Code using Back Substitution method — https://youtu.be/9OXy5V7jMYc
- Analyzing Running Time of Recursive Code using Recursive tree Method — https://youtu.be/KPtjTsAmDn4

---

### Deck 05 — Master's Theorem (7 slides)

### [D05-S1] Master's Theorem (title slide)
- Title only.

### [D05-S2] The forms the Master Theorem applies to ⭐
```
The Master Theorem applies to recurrences of the following form:
T (n) = a T (n/b) +f(n)        [f(n)=ϴ( n^k log^p n)]
T (n) = a T (n-b) +f(n)        [f(n)=0( n^k)]
• a ≥ 1, b > 1, k>=0 are constants and p is real number
```
- There are two forms:
  - **n/b form:** the problem size is *divided* by b. The extra work must be **Θ(n^k log^p n)**.
  - **n−b form:** the problem size is *decreased* by b. S3 calls these "Decreasing Recursive Functions". The extra work must be **O(n^k)**.
- ⚠️ The slide has a single conditions line, "b > 1", for both forms.
  - For the n−b form, S3 and S4 say **b ≥ 1**. That is necessary, because every T(n−1) example has b = 1.
  - So use **b > 1 for n/b** and **b ≥ 1 for n−b**.
  - "p is real number" doesn't apply to the n−b form, since that form has no p.

### [D05-S3] For Decreasing Recursive Functions ⭐
```
For Decreasing Recursive Functions
T (n) = a T (n-b) +f(n)        [f(n)=0( n^k)]
a ≥ 1, b ≥ 1, k>=0 are constants and p is real number

Defined on value of a
Case 1 :  a=1
T(n) = 0(f(n)*n)  = 0(n^(k+1))
Case 2:   a>1
T(n) = 0(f(n)*a^(n/b))  = 0(n^k a^(n/b))
```

| Case | Condition | Result (as on slide) |
|---|---|---|
| 1 | a = 1 | T(n) = O(f(n)·n) = **O(n^(k+1))** |
| 2 | a > 1 | T(n) = O(f(n)·a^(n/b)) = **O(n^k · a^(n/b))** |

- **Why it works.** This is my back-substitution reading of the slide's rule.
  - **a = 1:** T(n) = f(n) + f(n−b) + f(n−2b) + … There are about n/b terms and each is ≤ f(n). Since b is a constant, T(n) = O(n·f(n)).
  - **a > 1:** each unrolling step multiplies by a. There are about n/b steps, giving a factor of a^(n/b), so T(n) = O(f(n)·a^(n/b)).
- Both results are stated with **O**, so they are upper bounds. See the ✅ note on [D04-S11] about the two lines that are not tight.
- In practice you can use either form of the result: **f(n)·n** or **n^(k+1)**. Use the f(n) form when f(n) is a log, e.g. log n + T(n−1) gives O(n log n).

### [D05-S4] For Decreasing Recursive Functions (with the examples)
- Same statement as S3. On the right, in small type, it repeats the "Results" list from [D04-S11].
- The last example line, "= 2T(n−1) + log n => 0(log n.2ⁿ)", runs off the bottom of the slide in the rendered image. It is in the .pptx text.
- How each example fits the rule ✅ (all solved in §5 W14):

| Example | a | b | f(n) (k) | Case | Result |
|---|---|---|---|---|---|
| c + T(n−1) | 1 | 1 | c (k=0) | 1 | O(n) |
| 1 + T(n−1) | 1 | 1 | 1 (k=0) | 1 | O(n) |
| n + T(n−1) | 1 | 1 | n (k=1) | 1 | O(n²) |
| n² + T(n−1) | 1 | 1 | n² (k=2) | 1 | O(n³) |
| logn + T(n−1) | 1 | 1 | log n | 1 | O(f(n)·n) = O(n log n) |
| 2T(n−1) + c | 2 | 1 | c (k=0) | 2 | O(2ⁿ) |
| 3T(n−1) + 1 | 3 | 1 | 1 (k=0) | 2 | O(3ⁿ) |
| 2T(n−1) + n | 2 | 1 | n (k=1) | 2 | O(n·2ⁿ) |
| 2T(n−1) + log n | 2 | 1 | log n | 2 | O(f(n)·aⁿ) = O(log n·2ⁿ) |

### [D05-S5] Master Theorem for T(n) = aT(n/b) + Θ(n^k log^p n), 3 cases ⭐ (highest priority)
Exact statement:
```
The Master Theorem applies to recurrences of the following form:
              T (n) = a T (n/b) +ϴ( n^k log^p n)
a ≥ 1, b > 1,k>=0 are constants and p is real number

There are 3 cases:    [compare  log_b a  and  k]
1.If  a>b^k
              then  T (n) = Θ(n^(log_b a)).
2. If a=b^k
  a)If p> -1    then   T(n)= Θ(n^(log_b a) log^(p+1) n)
  b)If p= -1    then   T(n)= Θ(n^(log_b a) log log n)
  c)If p< -1    then   T(n)= Θ(n^(log_b a))
3. If a<b^k
  a)If p>= 0  then T(n)= Θ(n^k log^p n)
  b)a) If p< 0  then T(n)= Θ(n^k)
```

The same statement as a table:

| Case | Compare | Sub-condition on p | T(n) |
|---|---|---|---|
| 1 | a > b^k (i.e. log_b a > k) | any p | **Θ(n^(log_b a))** |
| 2(a) | a = b^k (i.e. log_b a = k) | p > −1 | **Θ(n^(log_b a) · log^(p+1) n)** |
| 2(b) | a = b^k | p = −1 | **Θ(n^(log_b a) · log log n)** |
| 2(c) | a = b^k | p < −1 | **Θ(n^(log_b a))** |
| 3(a) | a < b^k (i.e. log_b a < k) | p ≥ 0 | **Θ(n^k · log^p n)** |
| 3(b) | a < b^k | p < 0 | **Θ(n^k)** ← ⚠️ see below |

- **How to read "[compare log_b a and k]".** The cases are written as a vs b^k, but this is the same comparison. Because b > 1, taking log_b of both sides keeps the inequality: a > b^k ⇔ log_b a > k.
  - In Case 2, n^(log_b a) = n^k.
- **Conditions for using it** (from S5, plus the S6 speaker note):
  - a ≥ 1 and b > 1 are **constants**;
  - k ≥ 0;
  - p is a real number;
  - the extra work has the form n^k log^p n and is positive.
- ⚠️ **Typo:** the last line is labelled "b)a)". It should just be "b)".
- ⚠️ **Math error in Case 3(b)** (checked numerically).
  - When a < b^k and p < 0, the recurrence actually grows like **n^k·log^p n**, which is *smaller* than n^k by a log factor.
  - Test: T(n) = 2T(n/2) + n²/log n. Here a = 2 < 2² = 4 and p = −1, so the slide gives Θ(n²).
    - ✅ T(n)/n² = 0.23, 0.020, 0.0020, 0.0002 at n = 2^10, 2^100, 2^1000, 2^10000. That ratio goes to 0.
    - ✅ T(n)/(n²/log n) → **2.00**.
    - A second test with p = −2 behaves the same way.
  - So Θ(n^k) holds **only as an upper bound, O(n^k)**. As a Θ statement it is false.
  - None of the 14 slide examples falls into Case 3(b); practice P6 in §5 does.
  - **Exam advice:** if a Case 3(b) recurrence appears, give the class answer n^k (that is what the professor's theorem gives), and add "(upper bound)" if you can.
  - 🔎 Look up in Track B: the precise statement of case 3(b).

### [D05-S6] Theorem recap + 14 practice recurrences ⭐ (highest priority)
- The top half repeats the S5 statement, including the same "b)a)" typo.
- The bottom half lists 14 recurrences. **The slide gives only the parameters**, not the final answers. The answers below are mine, each ✅ checked numerically: T(n)/answer settles to a constant for n = b^m with m up to 10000. Full step-by-step working is in §5 W16.

| # | Recurrence (slide) | Slide's parameters | a vs b^k | Case | Answer |
|---|---|---|---|---|---|
| 1 | T(n) = 4T(n/2) + n² | a=4, b=2, k=2, p=0 | 4 = 2² | 2(a), p=0 > −1 | **Θ(n² log n)** |
| 2 | T(n) = T(n/2) + n² | a=1, b=2, k=2, p=0 | 1 < 4 | 3(a), p=0 ≥ 0 | **Θ(n²)** |
| 3 | T(n) = 2ⁿT(n/2) + nⁿ | [Not applicable] | — | — | **Not applicable**: a = 2ⁿ is not a constant |
| 4 | T(n) = 14T(n/4) + n | a=14, b=4, k=1, p=0 | 14 > 4¹ | 1 | **Θ(n^(log₄ 14)) ≈ Θ(n^1.904)** |
| 5 | T(n) = 2T(n/2) + n log n | a=2, b=2, k=1, p=1 | 2 = 2¹ | 2(a), p=1 | **Θ(n log² n)** |
| 6 | T(n) = 2T(n/2) + n/log n | a=2, b=2, k=1, p=−1 | 2 = 2¹ | 2(b), p=−1 | **Θ(n log log n)** |
| 7 | T(n) = 2T(n/4) + n^0.51 | a=2, b=4, k=0.51, p=0 | 2 < 4^0.51 ≈ 2.028 | 3(a), p=0 | **Θ(n^0.51)** |
| 8 | T(n) = 0.5T(n/2) + 1/n | a=0.5, b=2, k=−1, p=0 | — | — | ⚠️ **Not applicable**: a = 0.5 < 1 and k = −1 < 0 |
| 9 | T(n) = 6T(n/3) + n² log n | a=6, b=3, k=2, p=1 | 6 < 3² = 9 | 3(a), p=1 | **Θ(n² log n)** |
| 10 | T(n) = 64T(n/8) − n² log n | a=64, b=8, k=2, p=1 | — | — | ⚠️ **Not applicable**: f(n) is negative |
| 11 | T(n) = 7T(n/3) + n² | a=7, b=3, k=2, p=0 | 7 < 9 | 3(a), p=0 | **Θ(n²)** |
| 12 | T(n) = 4T(n/2) + log n | a=4, b=2, k=0, p=1 | 4 > 2⁰ = 1 | 1 | **Θ(n²)** |
| 13 | T(n) = 2^(1/2)·T(n/2) + n² log n | a=2^(1/2), b=2, k=2, p=1 | √2 ≈ 1.414 < 4 | 3(a), p=1 | **Θ(n² log n)** |
| 14 | T(n) = 2T(n/2) + n^(1/2) | a=2, b=2, k=1/2, p=0 | 2 > 2^(1/2) ≈ 1.414 | 1 | **Θ(n)** |

- ⚠️ **#3:** the slide itself says "Not applicable". The reason is that a = 2ⁿ changes with n instead of being a constant, and f(n) = nⁿ is not of the form n^k log^p n.
- ⚠️ **#8:** the slide lists [a=0.5, b=2, k=−1, p=0] but does **not** say "Not applicable". Yet a = 0.5 breaks the slide's own condition a ≥ 1, and k = −1 breaks k ≥ 0.
  - ✅ With T(1) = 1, T(n) = (log₂ n + 1)/n. That shrinks toward 0 as n grows, which makes no sense as a running time.
  - Answer: **not applicable**.
- ⚠️ **#10:** the slide lists [a=64, b=8, k=2, p=1] without saying "Not applicable". However, the driving function −n² log n is **negative**.
  - 📝 Speaker note on this slide: time cannot be negative, because an algorithm can't take "negative time" or "undo" work. The standard Master theorem can't be applied to such cases, since it requires the driving function to be **strictly positive**.
  - ✅ With T(1) = 1, T(8) = 64 − 64·3 = −128, a negative "time".
  - Answer: **not applicable**.
- **#13:** the raw text shows "21/2"; the .pptx has 2^(1/2), i.e. **a = √2**.
- **Case coverage of the slide's examples:**

| Case | Examples |
|---|---|
| 1 | #4, #12, #14 |
| 2(a) | #1, #5 |
| 2(b) | #6 |
| 3(a) | #2, #7, #9, #11, #13 |
| Not applicable | #3, #8, #10 |

  - No example exercises **2(c)** or **3(b)**. Practice P5 and P6 in §5 cover them.

### [D05-S7] Video Lecture of the topic
- Masters Theorem — https://youtu.be/d7WLeosewi8

---

## 3. Definitions & notation sheet

### 3.1 The three formal definitions (exactly as taught)

> **O(g(n)) = {f(n) : ∃ positive constants c and n₀, such that ∀n ≥ n₀, we have 0 ≤ f(n) ≤ cg(n) }** [D03-S10]

- g(n) is an **asymptotic upper bound** for f(n): f grows at the same rate as g, or slower.
- Picture: after n₀, f stays under cg.

> **Ω(g(n)) = {f(n) : ∃ positive constants c and n₀, such that ∀n ≥ n₀, we have 0 ≤ cg(n) ≤ f(n)}** [D03-S12]

- g(n) is an **asymptotic lower bound** for f(n): f grows at the same rate as g, or faster.
- Picture: after n₀, f stays above cg.

> **Θ(g(n)) = {f(n) : ∃ positive constants c₁, c₂, and n₀, such that ∀n ≥ n₀, we have 0 ≤ c₁g(n) ≤ f(n) ≤ c₂g(n) }** [D03-S13]

- g(n) is an **asymptotically tight bound** for f(n): f has the same growth rate as g.
- Picture: after n₀, f is sandwiched between c₁g and c₂g.

**What each piece means**
- **∃** ("there exist"): you only need to find **one** working choice of the constants. Many choices are fine (📝 [D03-S11]).
- **∀n ≥ n₀**: the inequality must hold for **every** n from n₀ onward. What happens before n₀ doesn't matter (see the figures on S10, S12 and S13).
- **"0 ≤"**: the functions are nonnegative for large n [D03-S14].
- **"positive constants"**: c, c₁, c₂ and n₀ must not depend on n.

### 3.2 o and ω (only as taught)
- The slides give **no set definition** for o and ω. They appear in only four places:
  - the list of five notations [D03-S9];
  - the number analogy [D03-S19]: f = o(g) ≈ **a < b**, and f = ω(g) ≈ **a > b**;
  - transitivity [D03-S20];
  - complementarity: f = o(g) iff g = ω(f) [D03-S21].
- 🔎 Look up in Track B: the formal definitions of o and ω, with constants.

### 3.3 Relations, conventions and the theorem

| Fact | Ref |
|---|---|
| **Θ(g) = O(g) ∩ Ω(g)**. Theorem: f = Θ(g) **iff** f = O(g) **and** f = Ω(g) | [D03-S17] |
| Θ(g(n)) ⊂ O(g(n)); f = Θ(g) ⇒ f = O(g) | [D03-S10] |
| Θ(g(n)) ⊂ Ω(g(n)); f = Θ(g) ⇒ f = Ω(g) | [D03-S12] |
| "Running time is O(f(n))" ⇒ **worst case** is O(f(n)) | [D03-S18] |
| "Running time is Ω(f(n))" ⇒ **best case** is Ω(f(n)) | [D03-S18] |
| Technically f(n) **∈** Θ(g(n)); the older usage f(n) **=** Θ(g(n)) is also accepted | [D03-S14] |
| Defined for functions over the natural numbers; f and g are nonnegative for large n | [D03-S9, S14] |
| Asymptotic complexity keeps only the **highest-order term**, for **large n** | [D03-S8] |
| "To compare orders of growth, look at the leading term" | [D03-S15] |
| In decks 04–05, "0(…)" is big-O and "ϴ" is Θ | [D04], [D05] |

### 3.4 Properties [D03-S19–S21]

| Property | Θ | O | Ω | o | ω |
|---|---|---|---|---|---|
| Number analogy (f ↔ g ≈ a ↔ b) | a = b | a ≤ b | a ≥ b | a < b | a > b |
| **Transitivity**: f R g and g R h ⇒ f R h | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Reflexivity**: f R f | ✓ | ✓ | ✓ | not listed | not listed |
| **Symmetry**: f = Θ(g) iff g = Θ(f) | ✓ | — | — | — | — |
| **Complementarity** | — | f = O(g) iff g = Ω(f) | (pair of O) | f = o(g) iff g = ω(f) | (pair of o) |

### 3.5 Choosing the constants (slides + 📝 notes)

| Situation | Rule | Ref |
|---|---|---|
| Θ | Make c₁ a little smaller than the leading coefficient and c₂ a little bigger | [D03-S15] |
| O | Any valid (c, n₀) is correct. A smaller c is preferred because it is tighter; a huge c is legal but loose | 📝 [D03-S11] |
| Ω | A larger c is preferred, because it gives a tighter lower bound | 📝 [D03-S11] |
| Negative terms, for O | Just drop them: 5n² − 2n ≤ 5n² | 📝 [D03-S12] |
| Negative terms, for Ω | "Pay" for them with part of the leading term: 5n² − 2n ≥ 5n² − 2n² = 3n² | 📝 [D03-S12] |

---

## 4. Methods as taught

### 4.1 Running time of plain (iterative) code [D03-S3–S8]
1. **Fix the model.** That means a processor with an instruction set, memory locations, the set of allowed operations, and a cost per operation [S3].
2. **Count steps** [S4, S5]:
   - a simple statement (arithmetic/logical operation, jump or conditional jump, pointer instruction) costs **1**;
   - a 1-D array operation costs **2**;
   - `A=B+C*D-F` costs **3**;
   - `A[I]=B[I]+C[I]` costs **4**;
   - `C=A[I,J]` costs **4**.
   - (⚠️ The 2-step and 4-step conventions don't fully agree; see [D03-S5].)
3. **Multiply by how often each statement runs.** For example, a loop over n elements runs its body n times. This gives T(n), the maximum over all inputs of size n [S6].
4. **Keep the highest-order term** and write the result in asymptotic notation [S8, S15].
   - Example: adding two arrays of size n takes about 4n steps plus loop control, which is **linear** (§5 W1).

### 4.2 Recursive code → recurrence [D04-S3–S8]
Write **T(n) = (number of recursive calls) × T(new size) + (work done in this call)**, and add a base case. Every piece comes straight from the six `demo` programs:

| Piece of code | Contributes | Seen on |
|---|---|---|
| `if(n>0) … else return 1;` | base case T(0) = constant | S3, S4, S5 |
| `if(n>1) … else return 1;` | base case T(1) = constant | S6, S7, S8 |
| `print` once (no loop) | + 1 (a constant) | S5, S6 |
| `for(i=1; i<=n; i++)` around `print` | + n | S3, S7, S8 |
| `for(i=1; i<=n; i=i*2)` around `print` | + log n (≈ ⌊log₂ n⌋ + 1 iterations) | S4 |
| one call `demo(n-1)` | T(n−1) | S3, S4 |
| two calls `demo(n-1)` | 2T(n−1) | S5 |
| one call `demo(n/2)` | T(n/2) | S6, S7 |
| two calls `demo(n/2)` | 2T(n/2) | S8 |

- Watch the braces. In S7 and S8, only `print` is inside the `for`; the recursive calls come **after** the loop.
- Then solve the recurrence with one of the three techniques [D04-S2], described below.

### 4.3 Technique 1: Back substitution [D04-S2; used on S9 and S11]
1. Substitute the recurrence into itself 2–3 times.
2. Spot the pattern after **k** substitutions.
3. Choose k so that the argument reaches the base case: n/2^k = 1 gives k = log₂ n, and n − k = 0 gives k = n.
4. Add up the series.
- The sums used in the slide examples:
  - 1 + 2 + … + n = n(n+1)/2
  - 1 + 2 + 4 + … + 2^(k−1) = 2^k − 1
  - n + n/2 + n/4 + … < 2n
  - log 1 + log 2 + … + log n = log(n!) ≤ n log n
- Worked templates: [D04-S9] in §2, and §5 W12 and W14.

### 4.4 Technique 2: Recursion tree [D04-S2; used on S10]
1. The root costs the non-recursive work f(n). Each recursive call becomes a child with its smaller size.
2. Compute the **cost of each level**: (number of nodes on the level) × (work per node).
3. Count the levels: about log_b n for n/b recursions, and about n/b for n−b recursions.
4. Add up the levels. There are three shapes [D04-S10]:
   - **Level costs shrink** geometrically → the root dominates → the answer is the root's cost (2T(n/2) + cn² → n²).
   - **Level costs are equal** → the answer is (cost per level) × (number of levels) (2T(n/2) + cn → n log n).
   - **Level costs grow** geometrically → the leaves dominate → the answer is about the number of leaves (2T(n/2) + c → n).

### 4.5 Technique 3: Master theorem, n/b form [D05-S5] — step-by-step
1. **Check the form.** It must be T(n) = a·T(n/b) + f(n), where:
   - a ≥ 1 is a **constant**;
   - b > 1 is a **constant**;
   - f(n) = Θ(n^k log^p n) with **k ≥ 0** and f positive.
   - If any of these fails, the answer is **"Not applicable"** (as in D05-S6 #3, #8, #10).
2. **Read off a, b, k, p:**

| f(n) | k | p |
|---|---|---|
| c or 1 | 0 | 0 |
| log n | 0 | 1 |
| n | 1 | 0 |
| n log n | 1 | 1 |
| n/log n | 1 | −1 |
| n² | 2 | 0 |
| n² log n | 2 | 1 |
| √n = n^(1/2) | 1/2 | 0 |
| n^0.51 | 0.51 | 0 |

3. **Compare a with b^k**, which is the same as comparing log_b a with k:
   - a > b^k → **Case 1**: Θ(n^(log_b a)).
   - a = b^k → **Case 2**; use p to pick the sub-case:
     - p > −1 → Θ(n^(log_b a) log^(p+1) n)
     - p = −1 → Θ(n^(log_b a) log log n)
     - p < −1 → Θ(n^(log_b a))
   - a < b^k → **Case 3**:
     - p ≥ 0 → Θ(n^k log^p n)
     - p < 0 → Θ(n^k) (⚠️ this is really only an upper bound; see [D05-S5])
4. **Write the answer.** Simplify log_b a when you can: log₂ 4 = 2 and log₂ 2 = 1, while log₄ 14 ≈ 1.904.

### 4.6 Master theorem, n−b ("Decreasing") form [D05-S3] — step-by-step
1. **Check the form.** It must be T(n) = a·T(n−b) + f(n) with a ≥ 1, b ≥ 1 and f(n) = O(n^k), k ≥ 0.
2. **If a = 1:** T(n) = O(f(n)·n) = O(n^(k+1)).
3. **If a > 1:** T(n) = O(f(n)·a^(n/b)) = O(n^k·a^(n/b)).
4. Both results are **upper bounds (O)**.

### 4.7 Results to memorize [D04-S10, S11, S12 = D05-S4]

| Recurrence | Answer | Recurrence | Answer |
|---|---|---|---|
| T(n−1) + c (or + 1) | O(n) | 2T(n−1) + c | O(2ⁿ) |
| T(n−1) + n | O(n²) | 3T(n−1) + 1 | O(3ⁿ) |
| T(n−1) + n² | O(n³) | 2T(n−1) + n | O(n·2ⁿ) |
| T(n−1) + log n | O(n log n) | 2T(n−1) + log n | O(log n·2ⁿ) |
| T(n/2) + 1 | O(log n) | 2T(n/2) + c | O(n) (max. work at leaves) |
| T(n/2) + n | O(n) | 2T(n/2) + cn | O(n log n) (equal at all levels) |
| 2T(n/2) + n | O(n log n) | 2T(n/2) + cn² | O(n²) (max. work at root) |

---

## 5. Worked examples

> Every example from the slides is re-solved here. **✅** means the claim was checked by script: exact integer arithmetic for all n ≤ 3000 for the (c, n₀) claims; exact simulation of the `demo` codes; sympy closed forms; and normalized ratios T(n)/answer computed with 40-digit arithmetic up to n = b^10000 for the Master-theorem cases.

### Part A — Asymptotic notation (deck 03)

#### W1. Step counting [D03-S5, S6]

| Statement | Breakdown | Steps |
|---|---|---|
| `A=B+C*D-F` | `*`, `+`, `−` (3 operators) | **3** |
| `A[I]=B[I]+C[I]` | `X=B[I]`; `Y=C[I]`; `Z=X+Y`; `A[I]=Z` | **4** |
| `C=A[I,J]` | address `(I)*M + J` → 1 mult + 1 add; + base address → 1 add; 1 fetch (📝) | **4** |

**"Add elements of two arrays of size n"** [D03-S6]:
```
for I = 1 to n
    A[I] = B[I] + C[I]        // 4 steps each time (D03-S5)
```
- **Body:** 4 steps × n = 4n.
- **Loop control:** the I ≤ n test, the conditional jump and I = I + 1 are each 1 step by [D03-S4], so about 3 steps per iteration.
- **Total:** about 7n + (a constant).
- **Highest-order term:** n, so the running time is **linear**, i.e. Θ(n) [D03-S8].
- The exact constant depends on how you count loop control, and the slides don't fix that. The **functional form** (linear) is what matters [D03-S6].

#### W2. "Any linear function an + b is in O(n²). How?" [D03-S11]
- **Goal:** find c and n₀ with 0 ≤ an + b ≤ cn² for all n ≥ n₀. Take a > 0, so the function is nonnegative for large n [D03-S14].
- **Upper bound.** For n ≥ 1, we have n ≤ n² and 1 ≤ n². So:
  - an + b ≤ an + |b| ≤ an² + |b|n² = (a + |b|)·n².
- **Nonnegativity.** an + b ≥ 0 once n ≥ −b/a. This is automatic when b ≥ 0.
- ⇒ **c = a + |b|, n₀ = max(1, −b/a)**.
- Concrete instance: **3n + 5 ≤ 8n² for all n ≥ 1** ✅.

#### W3. Show 3n³ = O(n⁴) [D03-S11]
- **Need:** 0 ≤ 3n³ ≤ c·n⁴ for all n ≥ n₀. Dividing by n³ > 0, this becomes **3 ≤ c·n**.
  - With **c = 3**, we need n ≥ 1, so **n₀ = 1**.
  - With **c = 1**, we need n ≥ 3, so **n₀ = 3**.
- Both pairs are correct ✅ (📝 "both combinations are equally correct"). The one with the smaller c is the tighter bound.

#### W4. 10n² − 3n = Θ(n²): find n₀, c₁, c₂ [D03-S15]
- **Need:** 0 ≤ c₁n² ≤ 10n² − 3n ≤ c₂n² for all n ≥ n₀. Dividing by n², this becomes **c₁ ≤ 10 − 3/n ≤ c₂**.
- **Right inequality.** 10 − 3/n < 10 always, so **c₂ = 11** works ("a little bigger"; c₂ = 10 also works).
- **Left inequality.** With **c₁ = 9** ("a little smaller"), we need 10 − 3/n ≥ 9, i.e. 3/n ≤ 1, i.e. **n ≥ 3**.
- ⇒ **c₁ = 9, c₂ = 11, n₀ = 3** ✅.
- **The notes' "pay for the negative term" method** gives another pair ✅:
  - 3n ≤ 3n² for n ≥ 1, so 10n² − 3n ≥ 10n² − 3n² = 7n².
  - ⇒ **c₁ = 7, c₂ = 10, n₀ = 1**.
- **Why this works:** 10 − 3/n → 10, the leading coefficient ("look at the leading term").

#### W5. Find the big oh [D03-S22]

**Method:** replace each lower-order term by (its coefficient) × (the leading function). This is valid once n is large enough for each lower function to be ≤ the leading one. The facts used are ✅ checked:
- 1 ≤ n ≤ n² ≤ n³ for n ≥ 1;
- n ≤ 2ⁿ for n ≥ 1;
- **n² ≤ 2ⁿ for n ≥ 4**. It fails at n = 3, because 9 > 8.

| f(n) | Big-O | Proof | c, n₀ | Other valid pair ✅ (smallest n₀ for that c) |
|---|---|---|---|---|
| 3n + 5 | **O(n)** | 3n + 5 ≤ 3n + 5n = 8n for n ≥ 1 | **8, 1** | c = 4, n₀ = 5 (3n + 5 ≤ 4n ⇔ n ≥ 5) |
| 27n² + 16n + 25 | **O(n²)** | ≤ 27n² + 16n² + 25n² = 68n² for n ≥ 1 | **68, 1** | c = 28, n₀ = 18 (n² − 16n − 25 ≥ 0 ⇔ n ≥ 8 + √89 ≈ 17.4) |
| 3n³ + 4n | **O(n³)** | ≤ 3n³ + 4n³ = 7n³ for n ≥ 1 | **7, 1** | c = 4, n₀ = 2 (4n ≤ n³ ⇔ n ≥ 2) |
| 2ⁿ + 6n² + 3n | **O(2ⁿ)** | ≤ 2ⁿ + 6·2ⁿ + 3·2ⁿ = 10·2ⁿ for n ≥ 4 | **10, 4** (✅ in fact true from n = 1) | c = 7, n₀ = 5 |
| 5·2ⁿ + 3n + 5 | **O(2ⁿ)** | ≤ 5·2ⁿ + 3·2ⁿ + 5·2ⁿ = 13·2ⁿ for n ≥ 1 | **13, 1** | c = 6, n₀ = 5 |
| 3·2ⁿ + 4n² + 5n + 3 | **O(2ⁿ)** | ≤ (3 + 4 + 5 + 3)·2ⁿ = 15·2ⁿ for n ≥ 4 | **15, 4** (✅ in fact true from n = 1) | c = 4, n₀ = 9 |

#### W6. Incorrect O bounds [D03-S23]
The proofs are **by contradiction**: assume constants c and n₀ exist, then find an n ≥ n₀ that breaks the inequality.
- **7n + 5 ≠ O(1).**
  - Suppose 7n + 5 ≤ c·1 for all n ≥ n₀.
  - Take n ≥ max(n₀, c). Then 7n + 5 > n ≥ c. Contradiction.
- **27n² + 16n + 25 ≠ O(n).**
  - Suppose 27n² + 16n + 25 ≤ cn for all n ≥ n₀.
  - Dividing by n: 27n + 16 + 25/n ≤ c, so 27n < c.
  - That is false for n ≥ max(n₀, c/27). Contradiction.
- **5n³ + n² + 3n + 2 ≠ O(n²).**
  - Dividing by n²: 5n + 1 + 3/n + 2/n² ≤ c, so 5n < c.
  - That is false for n ≥ max(n₀, c/5).
- ✅ The ratios f/g at n = 10⁵ are about 7·10⁵, 2.7·10⁶ and 5·10⁵, and they keep growing.

#### W7. Find the big Omega [D03-S24]
For Ω, positive lower-order terms can simply be dropped.

| f(n) | Big-Ω | Proof | c, n₀ |
|---|---|---|---|
| 27n² + 16n | **Ω(n²)** | 27n² + 16n ≥ 27n² (since 16n ≥ 0) | **27, 1** |
| 4n³ + 2n + 3 | **Ω(n³)** | 4n³ + 2n + 3 ≥ 4n³ | **4, 1** |
| 2ⁿ + 6n² + 3n | **Ω(2ⁿ)** | ≥ 1·2ⁿ | **1, 1** |
| 5·2ⁿ + 3n + 5 | **Ω(2ⁿ)** | ≥ 5·2ⁿ | **5, 1** |

- Ω(n) or Ω(1) are also true, but they are loose.
- Per 📝 [D03-S11], the larger c (here the leading coefficient) is the preferred, tighter choice. ✅

#### W8. Incorrect Ω bounds [D03-S25]
Again by contradiction: suppose c > 0 and n₀ exist.
- **7n + 5 ≠ Ω(n²).**
  - Suppose 7n + 5 ≥ cn² for all n ≥ n₀. Dividing by n²: 7/n + 5/n² ≥ c.
  - For n ≥ 1, the left side is ≤ 12/n, which is < c once n > 12/c.
  - Take n > max(n₀, 12/c). Contradiction.
- **5n² + 4n + 2 ≠ Ω(n³).** (5n² + 4n + 2)/n³ ≤ 11/n < c once n > 11/c.
- **3n³ + 5n² + 2n ≠ Ω(n⁴).** (3n³ + 5n² + 2n)/n⁴ ≤ 10/n < c once n > 10/c.
- ✅ The ratios f/g go to 0: at n = 10⁵ they are about 10⁻⁴ or smaller.

#### W9. Find the Theta [D03-S26]
Prove the O half (W5) and the Ω half (W7), then combine them with the theorem [D03-S17].

| f(n) | Θ | c₁ | c₂ | n₀ | Sandwich |
|---|---|---|---|---|---|
| 27n² + 16n | **Θ(n²)** | 27 | 43 | 1 | 27n² ≤ 27n² + 16n ≤ 27n² + 16n² = 43n² |
| 4n³ + 2n + 3 | **Θ(n³)** | 4 | 9 | 1 | 4n³ ≤ 4n³ + 2n + 3 ≤ 4n³ + 2n³ + 3n³ = 9n³ |
| 2ⁿ + 6n² + 3n | **Θ(2ⁿ)** | 1 | 10 | 4 (✅ also 1) | 2ⁿ ≤ f(n) ≤ 10·2ⁿ |

#### W10. Incorrect Θ bounds [D03-S27]
Θ needs **both** O and Ω [D03-S17], so it is enough to show that one half fails.
- **7n + 5 ≠ Θ(1).** It is **not O(1)** (W6). It *is* Ω(1).
- **10n² + 7 ≠ Θ(n³).** It is **not Ω(n³)**: (10n² + 7)/n³ ≤ 17/n < c once n > 17/c. It *is* O(n³), since 10n² + 7 ≤ 17n³ for n ≥ 1.
- **5n + 8 ≠ Θ(n²).** It is **not Ω(n²)**: (5n + 8)/n² ≤ 13/n < c once n > 13/c. It *is* O(n²), since 5n + 8 ≤ 13n² for n ≥ 1.

### Part B — Recursive running times (deck 04)

#### W11. The six `demo` programs [D04-S3–S8]

| Slide | Work per call | Recursive calls | Recurrence | Solution | Answer | ✅ exact print count |
|---|---|---|---|---|---|---|
| S3 | loop i++ to n → **n** | `demo(n-1)` | T(n) = T(n−1) + n | n + (n−1) + … + 1 | **O(n²)** | n(n+1)/2 |
| S4 | loop i=i*2 → **log n** | `demo(n-1)` | T(n) = T(n−1) + log n | log n + log(n−1) + … = log(n!) ≤ n log n | **O(n log n)** | Σ_{k=1..n} (⌊log₂ k⌋ + 1) |
| S5 | one print → **1** | `demo(n-1)` ×2 | T(n) = 2T(n−1) + 1 | 1 + 2 + 4 + … + 2^(n−1) | **O(2ⁿ)** | 2ⁿ − 1 |
| S6 | one print → **1** | `demo(n/2)` | T(n) = T(n/2) + 1 | 1 per level, log₂ n levels | **O(log n)** | ⌊log₂ n⌋ |
| S7 | loop i+1 to n → **n** | `demo(n/2)` | T(n) = T(n/2) + n | n + n/2 + n/4 + … < 2n | **O(n)** | ≤ 2n (ratio → 2) |
| S8 | loop i+1 to n → **n** | `demo(n/2)` ×2 | T(n) = 2T(n/2) + n | n per level × log₂ n levels | **O(n log n)** | n·log₂ n (for n = 2^m) |

#### W12. T(n) = c + 2T(n/2) for n > 1, T(1) = c [D04-S9]
```
T(n) = c + 2T(n/2)
     = c + 2[c + 2T(n/4)]           = c + 2c + 4T(n/4)
     = c + 2c + 4[c + 2T(n/8)]      = c + 2c + 4c + 8T(n/8)
     = c(1 + 2 + … + 2^(k-1)) + 2^k·T(n/2^k)
stop at n/2^k = 1  (2^k = n, k = log₂ n):
     = c(n − 1) + n·c = c(2n − 1)   ⇒  O(n)
```
- ✅ c(2n − 1) is exact for every n = 2^m with m ≤ 39.
- Master-theorem cross-check: a = 2, b = 2, k = 0. Since 2 > 2⁰ = 1, this is Case 1: Θ(n^(log₂ 2)) = **Θ(n)**.

#### W13. Recursion-tree level sums [D04-S10]
Each tree is binary. Level i has 2^i nodes, each of size n/2^i, and there are log₂ n + 1 levels.

| Recurrence | Level i cost | Level costs | Total | Answer | ✅ ratio | Master check |
|---|---|---|---|---|---|---|
| 2T(n/2) + cn² | 2^i·c(n/2^i)² = cn²/2^i | cn², cn²/2, cn²/4, … (shrinking) | < 2cn² | **Θ(n²)**, root dominates | T/n² → 2 | a = 2 < 2² → Case 3(a) |
| 2T(n/2) + cn | 2^i·c(n/2^i) = cn | cn on every level | cn(log₂ n + 1) | **Θ(n log n)**, all levels equal | T/(n log n) → 1 | a = 2 = 2¹, p = 0 → Case 2(a) |
| 2T(n/2) + c | 2^i·c | c, 2c, 4c, …, cn (growing) | c(2n − 1) | **Θ(n)**, leaves dominate | T/n → 2 | a = 2 > 2⁰ → Case 1 |

#### W14. The nine decreasing "Results" [D04-S11 = D05-S4]

**Back substitution, two templates:**
```
a = 1:  T(n) = T(n−1) + f(n) = T(n−2) + f(n−1) + f(n) = … = T(0) + f(1) + f(2) + … + f(n)
a = 2:  T(n) = 2T(n−1) + 1 = 4T(n−2) + 2 + 1 = 8T(n−3) + 4 + 2 + 1 = … = 2^k·T(n−k) + (2^k − 1)
        k = n  ⇒  T(n) = 2^n·T(0) + 2^n − 1
```

| Recurrence | Exact solution (T(0) = 0) ✅ sympy | Slide's answer | Rule on [D05-S3] | Tight? |
|---|---|---|---|---|
| c + T(n−1) | c·n | O(n) | a=1, k=0 → O(n^1) | yes |
| 1 + T(n−1) | n | O(n) | a=1, k=0 | yes |
| n + T(n−1) | n(n+1)/2 | O(n²) | a=1, k=1 → O(n²) | yes |
| n² + T(n−1) | n(n+1)(2n+1)/6 | O(n³) | a=1, k=2 → O(n³) | yes |
| log n + T(n−1) | log(n!) | O(n log n) | a=1 → O(f(n)·n) | yes ✅ (log₂ n!/(n log₂ n) = 0.79 at n = 100, 0.93 at n = 10⁶, still rising) |
| 2T(n−1) + c | c(2ⁿ − 1) | O(2ⁿ) | a=2, b=1, k=0 → O(2ⁿ) | yes |
| 3T(n−1) + 1 | (3ⁿ − 1)/2 | O(3ⁿ) | a=3 → O(3ⁿ) | yes |
| 2T(n−1) + n | **2^(n+1) − n − 2** | O(n·2ⁿ) | a=2, k=1 → O(n·2ⁿ) | **upper bound only**: exact is Θ(2ⁿ) (T/2ⁿ → 2) |
| 2T(n−1) + log n | Σ_{j=1..n} 2^(n−j)·log j | O(log n·2ⁿ) | a=2 → O(f(n)·2ⁿ) | **upper bound only**: exact is Θ(2ⁿ) (T/2ⁿ → 0.733) |

- Exam: give the slide's answers, because they are what the class rule produces. The last two are still correct, since O only promises an upper bound.

#### W15. The dividing results [D04-S12] via the Master theorem [D05-S5]

| Recurrence | a, b, k, p | a vs b^k | Case | Answer | ✅ ratio |
|---|---|---|---|---|---|
| T(n/2) + 1 | 1, 2, 0, 0 | 1 = 2⁰ | 2(a), p=0 > −1 | Θ(n⁰·log¹ n) = **Θ(log n)** | T/log n → 1 |
| T(n/2) + n | 1, 2, 1, 0 | 1 < 2¹ | 3(a), p=0 ≥ 0 | **Θ(n)** | T/n → 2 |
| 2T(n/2) + n | 2, 2, 1, 0 | 2 = 2¹ | 2(a) | Θ(n^1·log n) = **Θ(n log n)** | T/(n log n) → 1 |

### Part C — Master theorem (deck 05)

#### W16. The 14 Master-theorem examples [D05-S6]
**Recipe** (§4.5): check the form, read off a, b, k, p, compare a with b^k, choose the sub-case by p, then write the answer.

The ✅ column is T(n)/answer at n = b^m for m = 10 → 10000. If it settles to a constant, the Θ answer is confirmed.

**#1 T(n) = 4T(n/2) + n²**
- a = 4, b = 2, k = 2, p = 0, so b^k = 4 = a → **Case 2**.
- p = 0 > −1 → **2(a)**: Θ(n^(log₂ 4)·log^(0+1) n) = **Θ(n² log n)**.
- ✅ The ratio → 1.00.

**#2 T(n) = T(n/2) + n²**
- a = 1, b = 2, k = 2, p = 0, so b^k = 4 > 1 = a → **Case 3**.
- p = 0 ≥ 0 → **3(a)**: Θ(n²·log⁰ n) = **Θ(n²)**.
- ✅ The ratio → 1.333 (= 4/3).

**#3 T(n) = 2ⁿT(n/2) + nⁿ** → **Not applicable**, as the slide says.
- a = 2ⁿ is not a constant.
- f(n) = nⁿ is not of the form n^k log^p n.

**#4 T(n) = 14T(n/4) + n**
- a = 14, b = 4, k = 1, p = 0, so b^k = 4 < 14 → **Case 1**.
- T(n) = **Θ(n^(log₄ 14))**, where log₄ 14 = ln 14 / ln 4 ≈ 1.904. So T(n) ≈ Θ(n^1.904).
- ✅ The ratio → 1.40.

**#5 T(n) = 2T(n/2) + n log n**
- a = 2, b = 2, k = 1, p = 1, so b^k = 2 = a → **Case 2**.
- p = 1 > −1 → **2(a)**: Θ(n·log² n) = **Θ(n log² n)**.
- ✅ The ratio → 0.50.

**#6 T(n) = 2T(n/2) + n/log n**
- a = 2, b = 2, k = 1, p = −1 (because 1/log n = log^(−1) n), so b^k = 2 = a → **Case 2**.
- p = −1 → **2(b)**: **Θ(n log log n)**.
- ✅ Exact (T(1) = 1, n = 2^m): T(n) = n·(1 + 1 + 1/2 + 1/3 + … + 1/m). The sum 1 + 1/2 + … + 1/m grows like log m = log log n.
- The ratio is 1.18, 0.93, 0.85, 0.81, 0.79 for m = 10 … 10⁵. It settles slowly towards about 0.69 but stays bounded, which is consistent with Θ.

**#7 T(n) = 2T(n/4) + n^0.51**
- a = 2, b = 4, k = 0.51, p = 0, so b^k = 4^0.51 ≈ 2.028 > 2 = a → **Case 3**. (Equivalently, log₄ 2 = 0.5 < 0.51 = k.)
- p = 0 ≥ 0 → **3(a)**: **Θ(n^0.51)**.
- ✅ The ratio → 72.6. The constant is large because a and b^k are very close, but it is bounded.

**#8 T(n) = 0.5T(n/2) + 1/n** → ⚠️ **Not applicable**.
- The slide's parameters are a = 0.5, b = 2, k = −1, p = 0.
- That breaks **a ≥ 1** and **k ≥ 0** from [D05-S5].
- ✅ With T(1) = 1, T(n) = (log₂ n + 1)/n, which shrinks towards 0. That can't be a running time.

**#9 T(n) = 6T(n/3) + n² log n**
- a = 6, b = 3, k = 2, p = 1, so b^k = 9 > 6 → **Case 3**.
- p = 1 ≥ 0 → **3(a)**: **Θ(n² log n)**.
- ✅ The ratio → 3.00.

**#10 T(n) = 64T(n/8) − n² log n** → ⚠️ **Not applicable**.
- The driving function −n² log n is **negative**. 📝 The slide's speaker note says time can't be negative, and the theorem needs a strictly positive driving function.
- With the slide's parameters (a = 64, b = 8, k = 2, p = 1) it would *look like* Case 2(a), since 64 = 8². Don't be fooled.
- ✅ T(8) = −128 when T(1) = 1.

**#11 T(n) = 7T(n/3) + n²**
- a = 7, b = 3, k = 2, p = 0, so b^k = 9 > 7 → **Case 3(a)**: **Θ(n²)**.
- ✅ The ratio → 4.50.

**#12 T(n) = 4T(n/2) + log n**
- a = 4, b = 2, k = 0, p = 1, so b^k = 2⁰ = 1 < 4 → **Case 1**: Θ(n^(log₂ 4)) = **Θ(n²)**.
- ✅ The ratio → 1.444.

**#13 T(n) = √2·T(n/2) + n² log n**
- a = 2^(1/2) ≈ 1.414, b = 2, k = 2, p = 1, so b^k = 4 > 1.414 → **Case 3(a)**: **Θ(n² log n)**.
- ✅ The ratio → 1.547.

**#14 T(n) = 2T(n/2) + n^(1/2)**
- a = 2, b = 2, k = 1/2, p = 0, so b^k = √2 ≈ 1.414 < 2 → **Case 1**: Θ(n^(log₂ 2)) = **Θ(n)**.
- ✅ The ratio → 3.414.

### Part D — 6 NEW practice recurrences (same methods as the slides; solutions verified)

> Try each one before reading the solution.
> - P1–P4 start from code, like [D04-S3–S8].
> - P5 and P6 are pure recurrences, like [D05-S6]. They cover the two Master-theorem cases that **no slide example** uses: **2(c)** and **3(b)**.

#### P1. Code → decreasing recurrence with b = 2
```
demo(int n)
{
 if(n>0)
   {
     for(i=1; i<=n; i++)
        print (“message”);
     demo(n-2);
   }
else
return 1;
}
```
- **Recurrence:** T(n) = T(n−2) + n, with T(n ≤ 0) = constant.
- **Decreasing Master theorem** [D05-S3]: a = 1, b = 2, f(n) = n (k = 1) → **Case 1**: O(f(n)·n) = **O(n²)**.
- **Back substitution:** T(n) = n + (n−2) + (n−4) + … For even n = 2m, this is 2m + 2(m−1) + … + 2 = 2(1 + 2 + … + m) = m(m+1) = (n/2)(n/2 + 1), which is Θ(n²).
- ✅ The simulated print count is exactly (n/2)(n/2 + 1) for even n and ((n+1)/2)² for odd n. Count/n² → 0.25.
- **Lesson:** decreasing by 2 instead of 1 only changes the constant (n²/4 instead of n²/2).

#### P2. Code → decreasing recurrence with a = 2, b = 2
```
demo(int n)
{
 if(n>0)
   {
     print (“message”);
     demo(n-2);
     demo(n-2);
   }
else
return 1;
}
```
- **Recurrence:** T(n) = 2T(n−2) + 1.
- **Decreasing Master theorem:** a = 2 > 1, b = 2, k = 0 → **Case 2**: O(n⁰·2^(n/2)) = **O(2^(n/2))**.
- **Back substitution:** T(n) = 2T(n−2) + 1 = 4T(n−4) + 2 + 1 = … = 2^j·T(n−2j) + (2^j − 1). Taking j = n/2 gives Θ(2^(n/2)).
- ✅ The simulated print count is exactly 2^m − 1 for both n = 2m and n = 2m − 1. Count/2^(n/2) stays bounded, between about 0.97 and 1.41: it approaches 1 for even n and √2 for odd n.
- **Lesson:** here b changes the **exponent**. 2^(n/2) = (√2)ⁿ is *not* Θ(2ⁿ), because the ratio 2ⁿ/2^(n/2) = 2^(n/2) grows without bound.

#### P3. Code → dividing recurrence with a log-loop (Case 2(a), k = 0)
```
demo(int n)
{
 if(n>1)
   {
     for(i=1; i<=n; i=i*2)
        print (“message”);
     demo(n/2);
   }
else
return 1;
}
```
- **Recurrence:** T(n) = T(n/2) + log n. The loop runs ⌊log₂ n⌋ + 1 times, as on [D04-S4].
- **Master theorem:** a = 1, b = 2, f(n) = log n, so k = 0 and p = 1. b^k = 2⁰ = 1 = a → **Case 2**. p = 1 > −1 → **2(a)**: Θ(n⁰·log² n) = **Θ(log² n)**.
- **Back substitution (n = 2^m):** (m + 1) + m + (m − 1) + … + 2 = (m² + 3m)/2 ≈ (log n)²/2.
- ✅ The simulated print count equals (m² + 3m)/2 exactly. Count/(log₂ n)² → 0.5.

#### P4. Code → three calls on n/2 (Case 1, recursion tree)
```
demo(int n)
{
 if(n>1)
   {
     for(i=1; i<=n; i=i+1)
        print (“message”);
     demo(n/2);
     demo(n/2);
     demo(n/2);
   }
else
return 1;
}
```
- **Recurrence:** T(n) = 3T(n/2) + n.
- **Master theorem:** a = 3, b = 2, k = 1, p = 0. b^k = 2 < 3 → **Case 1**: **Θ(n^(log₂ 3)) ≈ Θ(n^1.585)**.
- **Recursion tree:**
  - Level i has 3^i nodes, each of size n/2^i, so the level cost is n·(3/2)^i: n, 1.5n, 2.25n, …
  - The costs **grow**, so the **leaves dominate**, as in the third line of [D04-S10].
  - The number of leaves is 3^(log₂ n) = n^(log₂ 3).
- ✅ Exact (T(1) = 1, n = 2^m): **T(n) = 3·n^(log₂ 3) − 2n**, checked for m ≤ 199. T/n^(log₂ 3) → 3.

#### P5. Case 2(c): T(n) = 2T(n/2) + n/log² n
- **Master theorem:** a = 2, b = 2, k = 1, p = −2. b^k = 2 = a → **Case 2**. p = −2 < −1 → **2(c)**: Θ(n^(log₂ 2)) = **Θ(n)**.
- **Back substitution (n = 2^m, T(1) = 1):** T(n) = n·(1 + 1/1² + 1/2² + … + 1/m²). The bracket stays below a constant (≈ 2.645), so T(n) = Θ(n).
- ✅ T/n = 2.550, 2.635, 2.644, 2.6448 for m = 10, 100, 1000, 10000. That settles to a constant.
- **Compare with #6 on the slide:** p = −1 gives n log log n, but p = −2 gives just n.

#### P6. Case 3(b): T(n) = 2T(n/2) + n²/log n (this tests the ⚠️ on [D05-S5])
- **Master theorem as taught:** a = 2, b = 2, k = 2, p = −1. b^k = 4 > 2 → **Case 3**. p = −1 < 0 → **3(b)**: the class answer is **Θ(n²)**.
- **Back substitution (n = 2^m):**
  - T(n) = n²·[1/m + (1/2)/(m−1) + (1/4)/(m−2) + …] + n.
  - The bracket is about 2/m = 2/log n, so T(n) ≈ 2n²/log n.
- ✅ Numeric check:
  - T/n² = 0.233, 0.020, 0.0020, 0.0002 for m = 10, 100, 1000, 10000. That goes to 0, so T(n) is **not** Θ(n²).
  - T/(n²/log n) → **2.00**.
- **Conclusion:** the true growth is n²/log n = n^k·log^p n. The class answer n² is a correct **upper bound**, O(n²), but not a tight bound.
- **On the exam:** write the class rule's answer, "Case 3(b) ⇒ n^k = n²", and add "(upper bound)".
- 🔎 Track B: the exact statement of case 3(b).

**Summary of the practice set**

| # | Recurrence | Method | Answer | ✅ |
|---|---|---|---|---|
| P1 | T(n−2) + n | Decreasing MT, Case 1 / back substitution | O(n²) | count = (n/2)(n/2+1) |
| P2 | 2T(n−2) + 1 | Decreasing MT, Case 2 / back substitution | O(2^(n/2)) | count = 2^⌈n/2⌉ − 1 |
| P3 | T(n/2) + log n | MT Case 2(a) | Θ(log² n) | count = (m² + 3m)/2 |
| P4 | 3T(n/2) + n | MT Case 1 / recursion tree | Θ(n^(log₂ 3)) | T = 3n^(log₂ 3) − 2n |
| P5 | 2T(n/2) + n/log² n | MT Case 2(c) | Θ(n) | T/n → 2.645 |
| P6 | 2T(n/2) + n²/log n | MT Case 3(b) | class rule: n²; true growth n²/log n | T/(n²/log n) → 2 |

---

## 6. Likely exam questions (built only from these slides)

**Q1.** Write the formal definition of Θ(g(n)) as given in class, and say what c₁, c₂ and n₀ mean.

**Q2.** Prove that 3n³ = O(n⁴) by giving c and n₀.

**Q3.** Find constants c₁, c₂ and n₀ that show 10n² − 3n = Θ(n²).

**Q4.** Find the big-O of f(n) = 3·2ⁿ + 4n² + 5n + 3, and prove it with c and n₀.

**Q5.** Prove that 5n³ + n² + 3n + 2 ≠ O(n²).

**Q6.** Is 5n + 8 = Θ(n²)? Justify your answer using the theorem that relates Θ, O and Ω.

**Q7. (MCQ)** In the class analogy f ↔ g ≈ a ↔ b, the relation f(n) = o(g(n)) corresponds to:
(A) a ≤ b  (B) a < b  (C) a = b  (D) a > b

**Q8. (MCQ)** Complete the sentence: f(n) = O(g(n)) iff ____ .
(A) g(n) = O(f(n))  (B) g(n) = Ω(f(n))  (C) g(n) = Θ(f(n))  (D) g(n) = o(f(n))

**Q9. (MCQ)** Which property is listed in class only for Θ, O and Ω, and not for o and ω?
(A) Transitivity  (B) Reflexivity  (C) Complementarity  (D) None of these

**Q10. (True/False)** "Running time is Ω(f(n))" means that the worst case is Ω(f(n)).

**Q11.** In the class model of computation, how many steps do `A=B+C*D-F`, `A[I]=B[I]+C[I]` and `C=A[I,J]` take? Show the breakdown for the last two.

**Q12.** Write the recurrence and the running time of:
```
demo(int n){ if(n>0){ for(i=1; i<=n; i=i*2) print("message"); demo(n-1); } else return 1; }
```

**Q13.** Write the recurrence and the running time of:
```
demo(int n){ if(n>1){ for(i=1; i<=n; i=i+1) print("message"); demo(n/2); demo(n/2); } else return 1; }
```

**Q14.** Solve T(n) = c + 2T(n/2) for n > 1, with T(1) = c, by back substitution.

**Q15.** For each of T(n) = 2T(n/2) + cn², T(n) = 2T(n/2) + cn and T(n) = 2T(n/2) + c, say where the recursion tree does the most work, and give T(n).

**Q16.** Use the rule for decreasing recursive functions to solve (a) T(n) = n² + T(n−1) and (b) T(n) = 3T(n−1) + 1. Name the case each time.

**Q17.** Apply the Master theorem to T(n) = 2T(n/2) + n/log n. Give a, b, k, p, the case and the answer.

**Q18.** Apply the Master theorem to T(n) = 2T(n/4) + n^0.51. Which case is it?

**Q19.** Apply the Master theorem to (a) T(n) = 14T(n/4) + n and (b) T(n) = 6T(n/3) + n² log n.

**Q20. (MCQ)** The Master theorem as taught does **not** apply to which recurrence? Give the reason.
(A) T(n) = 7T(n/3) + n²  (B) T(n) = 2ⁿT(n/2) + nⁿ  (C) T(n) = 4T(n/2) + log n  (D) T(n) = √2·T(n/2) + n² log n

### Answers

**A1.** Θ(g(n)) = {f(n) : ∃ positive constants c₁, c₂, and n₀, such that ∀n ≥ n₀, we have 0 ≤ c₁g(n) ≤ f(n) ≤ c₂g(n)}.
- c₁g(n) is the lower curve and c₂g(n) is the upper curve.
- From n₀ onward, f(n) stays sandwiched between them.
- g(n) is then an asymptotically tight bound for f(n). [D03-S13]

**A2.** 3n³ ≤ c·n⁴ ⇔ 3 ≤ c·n. So **c = 3, n₀ = 1** works, and so does **c = 1, n₀ = 3**. [D03-S11; §5 W3]

**A3.** **c₁ = 9, c₂ = 11, n₀ = 3**, since 9n² ≤ 10n² − 3n ⇔ n ≥ 3. Another valid answer is c₁ = 7, c₂ = 10, n₀ = 1. [D03-S15; W4]

**A4.** **O(2ⁿ).**
- For n ≥ 4, we have n² ≤ 2ⁿ, n ≤ 2ⁿ and 1 ≤ 2ⁿ.
- So f(n) ≤ (3 + 4 + 5 + 3)·2ⁿ = 15·2ⁿ, which gives **c = 15, n₀ = 4**. (✅ It in fact holds from n = 1.)
- [D03-S22; W5]

**A5.** By contradiction:
- Suppose 5n³ + n² + 3n + 2 ≤ cn² for all n ≥ n₀.
- Dividing by n²: 5n + 1 + 3/n + 2/n² ≤ c, so 5n < c.
- That is false for n ≥ max(n₀, c/5). [D03-S23; W6]

**A6.** **No.**
- 5n + 8 is O(n²), but it is **not Ω(n²)**, because (5n + 8)/n² ≤ 13/n, which is < c once n is large.
- Θ requires both O and Ω [D03-S17], so 5n + 8 ≠ Θ(n²). [D03-S27; W10]

**A7.** **(B)** a < b. [D03-S19]

**A8.** **(B)** g(n) = Ω(f(n)). This is complementarity. [D03-S21]

**A9.** **(B)** Reflexivity. [D03-S20]

**A10.** **False.** "Running time is Ω(f(n))" means the **best** case is Ω(f(n)). The worst case goes with O. [D03-S18]

**A11.** The counts are **3, 4 and 4**.
- `A[I]=B[I]+C[I]` splits into `X=B[I]`, `Y=C[I]`, `Z=X+Y`, `A[I]=Z`.
- `C=A[I,J]` is computed as A′[(I)*M + J], with M = number of columns. That is 1 multiplication + 2 additions (one of them for the base address) + 1 fetch.
- [D03-S5 + 📝 notes]

**A12.** The loop runs ⌊log₂ n⌋ + 1 times, and there is one call on n−1.
- So **T(n) = T(n−1) + log n**.
- T(n) = log(n!) ≤ n log n, so T(n) = **O(n log n)**. [D04-S4; W11]

**A13.** **T(n) = 2T(n/2) + n.** Each of the log₂ n levels costs n, so T(n) = **O(n log n)**. [D04-S8; W11]

**A14.** Substituting repeatedly:
- T(n) = c(1 + 2 + … + 2^(k−1)) + 2^k·T(n/2^k).
- With 2^k = n: T(n) = c(n − 1) + cn = **c(2n − 1) = O(n)**. [D04-S9; W12]

**A15.**
- **+cn²:** the most work is at the **root**. The level costs cn², cn²/2, … shrink, so T(n) = **Θ(n²)**.
- **+cn:** the work is **equal on all levels**. That is cn × (log n + 1), so T(n) = **Θ(n log n)**.
- **+c:** the most work is at the **leaves**. The level costs c, 2c, …, cn grow, so T(n) = **Θ(n)**.
- [D04-S10; W13]

**A16.**
- (a) a = 1 and f(n) = n², so k = 2. This is **Case 1**: O(n^(k+1)) = **O(n³)**.
- (b) a = 3 > 1, b = 1, k = 0. This is **Case 2**: O(n⁰·3^(n/1)) = **O(3ⁿ)**.
- [D04-S11, D05-S3; W14]

**A17.** a = 2, b = 2, k = 1, p = −1.
- b^k = 2 = a, so this is **Case 2**.
- p = −1 gives sub-case **2(b)**: **Θ(n log log n)**. [D05-S6 #6; W16]

**A18.** a = 2, b = 4, k = 0.51, p = 0.
- b^k = 4^0.51 ≈ 2.028 > 2. (Equivalently, log₄ 2 = 0.5 < 0.51.)
- With p = 0 ≥ 0, this is **Case 3(a)**: **Θ(n^0.51)**. [D05-S6 #7; W16]

**A19.**
- (a) a = 14 > 4¹, so this is **Case 1**: **Θ(n^(log₄ 14)) ≈ Θ(n^1.904)**.
- (b) a = 6 < 3² = 9 and p = 1 ≥ 0, so this is **Case 3(a)**: **Θ(n² log n)**.
- [D05-S6 #4, #9; W16]

**A20.** **(B).**
- a = 2ⁿ is not a constant, and nⁿ is not of the form n^k log^p n. The slide marks it "Not applicable".
- The other three do apply: (A) Θ(n²) by Case 3(a); (C) Θ(n²) by Case 1; (D) Θ(n² log n) by Case 3(a).
- [D05-S6 #3, #11, #12, #13]

---

## 7. Self-check

- [ ] I can write the definitions of **O, Ω and Θ** with their constants (c, or c₁, c₂, and n₀) exactly as on [D03-S10, S12, S13], and sketch the three pictures [D03-S16].
- [ ] I can **prove** f = O(g), f = Ω(g) or f = Θ(g) by giving explicit constants and n₀. I can also explain why many (c, n₀) pairs are valid, and which c the notes prefer [D03-S11, S15, S22, S24, S26].
- [ ] I can **disprove** a bound by contradiction, for example 7n + 5 ≠ O(1) or 5n + 8 ≠ Θ(n²) [D03-S23, S25, S27].
- [ ] I can state the theorem **Θ = O ∩ Ω**, the worst-case/best-case meaning of O and Ω, the a ↔ b analogy, and the four properties: transitivity, reflexivity, symmetry and complementarity [D03-S17–S21].
- [ ] I can **count steps** in the class model (3 / 4 / 4 for the [D03-S5] statements) and explain why T(n) describes the algorithm, not the machine [D03-S3–S6].
- [ ] I can turn any of the six **`demo` programs**, or a variation of one, into a recurrence and solve it [D04-S3–S8].
- [ ] I can solve a recurrence by **back substitution** (for example c + 2T(n/2) → c(2n − 1)) and by the **recursion tree** (work at the root, equal on all levels, or at the leaves) [D04-S9, S10].
- [ ] I can recite the **Results** tables [D04-S11, S12] and the decreasing rule: a = 1 → n·f(n); a > 1 → f(n)·a^(n/b) [D05-S3].
- [ ] I can state the **Master theorem** with all 3 cases and their p sub-cases, check its conditions, and solve all 14 examples on [D05-S6], including **why #3, #8 and #10 are not applicable**.
- [ ] I can name the slide pitfalls:
  - Case 3(b) is only an upper bound.
  - "b)a)" is a typo for "b)".
  - The decreasing form needs b ≥ 1, not b > 1.
  - "0(…)" means O(…).
  - A 1-D array operation costs 2 steps on [D03-S4], but array accesses count as 1 step in the 4-step count on [D03-S5].
