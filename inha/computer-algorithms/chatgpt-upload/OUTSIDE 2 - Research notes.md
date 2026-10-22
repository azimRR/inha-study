# OUTSIDE (internet research) - notes, NOT from class



---

<!-- FILE: 01_asymptotics_recurrences_master_theorem.md -->

# Algorithm Analysis for the Midterm: Asymptotic Notation, Running Times, Recurrences and the Master Theorem (outside notes)

> These are outside notes for SOC3030-003 (Computer Algorithm, Inha University in Tashkent, Fall 2026), compiled 2026-10-19 for the week-8 midterm. They draw only on external, legally free sources. No class slides were used.
> **Conventions:** `lg n = log₂ n`. `log` without a base means the base doesn't matter inside Θ. `lg² n = (lg n)²`. `n₀` is the threshold and `c, c₁, c₂` are the constants in the definitions. "W(n)" means the Master-Theorem watershed `n^(log_b a)`.
> **Verification:** I checked every worked answer marked "(verified)" with Python, sympy or mpmath scripts. The checks used exact rational arithmetic for closed forms, brute-force enumeration for best/worst/average cases, simulation for loop counts, and ratio tests `T(n)/answer → constant` for Θ-bounds. The scripts are in the session scratchpad folder `alg_r01_asymptotics/`. Derivations that come from me rather than from a source sit under **Inferences**.

---

## 1. What is an algorithm? Properties, time vs. space complexity, and best/worst/average case (linear search, insertion sort)

### Takeaway
An algorithm is a precisely specified, effective, always-terminating procedure that maps each input to an output. Knuth lists five properties: finiteness, definiteness, input, output and effectiveness. Time and space are measured as functions of the input size n, and you analyse them asymptotically to ignore machine constants. For a fixed n there is a best case (cheapest input), a worst case (most expensive input) and an average case (an expectation under a stated input distribution). Linear search costs 1, n and (n+1)/2 comparisons. Insertion sort is Θ(n) best, Θ(n²) worst and Θ(n²) average.

### Cited Findings
- **Knuth's five properties** (TAOCP Vol. 1, 1968/1973), as quoted on Wikipedia — [Wikipedia: Algorithm characterizations](https://en.wikipedia.org/wiki/Algorithm_characterizations):
  - **Finiteness:** "An algorithm must always terminate after a finite number of steps ... a *very* finite number, a reasonable number".
  - **Definiteness:** "Each step of an algorithm must be precisely defined; the actions to be carried out must be rigorously and unambiguously specified for each case".
  - **Input:** "quantities which are given to it initially before the algorithm begins. These inputs are taken from specified sets of objects".
  - **Output:** "quantities which have a specified relation to the inputs".
  - **Effectiveness:** "all of the operations to be performed in the algorithm must be sufficiently basic that they can in principle be done exactly and in a finite length of time by a man using paper and pencil".
  - The same article notes that Knuth admits these criteria are intuitive rather than mathematically rigorous ("precisely defined" and "sufficiently basic" are not formalised).
- **MIT 6.006 definitions:** "A problem is a binary relation connecting problem inputs to correct outputs." "A (deterministic) algorithm is a procedure that maps inputs to single outputs." "An algorithm solves a problem if for every problem input it returns a correct output." — [MIT 6.006 (Spring 2020) Recitation 1](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)
- **Correctness via induction:** "every algorithm we discuss in this class will need to repeat commands in the algorithm via loops or recursion, and we will be able to prove correctness of the algorithm via induction." — [MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)
- **Efficiency = resources (time and space):** "One program is said to be more efficient than another if it can solve the same problem input using fewer resources." "the resources used by a program, e.g. storage space or running time, will depend on both the algorithm used and the machine on which the algorithm is implemented." Therefore "we compare algorithms based on their asymptotic performance relative to problem input size, in order to ignore constant factor differences in hardware performance." — [MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)
- **What one "step" costs (Word-RAM model):** "A Word-RAM processor can perform basic binary operations on two machine words in constant time, including addition, subtraction, multiplication, integer division, modulo, bitwise operations, and binary comparisons." Reading or writing the word at a given address also takes constant time. — [MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)
- **Input size is not always "n items":** for graphs "a natural input size will be Θ(|V| + |E|)". For an n×n matrix the "problem input will have size Θ(n²)". — [MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)
- **Linear search:**
  - The best case is "when the value is equal to the first element of the list, in which case only one comparison is needed".
  - The worst case is "when the value is not in the list (or occurs only once at the end of the list), in which case n comparisons are needed".
  - If the value occurs once and every position is equally likely, the expected number of comparisons is (n+1)/2.
  - "asymptotically the worst-case cost and the expected cost of linear search are both O(n)".
  - Source: [Wikipedia: Linear search](https://en.wikipedia.org/wiki/Linear_search)
- **Insertion sort:**
  - The best case is "an array that is already sorted", which gives "linear running time (i.e., O(n))".
  - The worst case is "an array sorted in reverse order", which gives quadratic time, because "every iteration of the inner loop will scan and shift the entire sorted subsection".
  - "The average case is also quadratic."
  - It uses O(1) auxiliary space (it sorts in place).
  - It is efficient on nearly sorted data: O(kn) when every element is at most k positions from its final place.
  - Source: [Wikipedia: Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort)
- **Space example:** "Merge sort uses a linear amount of temporary storage (temp) when combining the two halves, so it is not in-place." — [MIT 6.006 R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf)

### Inferences
#### Time vs. space complexity (derived summary)
- **Time complexity** `T(n)` counts basic Word-RAM steps (or a chosen dominant operation such as key comparisons) as a function of the input size n.
- **Space complexity** `S(n)` counts the extra memory used beyond the input. That includes the recursion stack, which is easy to forget.
- Examples:

  | Algorithm | Extra space |
  |---|---|
  | Iterative binary search | Θ(1) |
  | Recursive binary search | Θ(log n) stack frames |
  | Insertion sort | Θ(1) (in place) |
  | Merge sort | Θ(n) auxiliary array |
  | Naive recursive Fibonacci | Θ(n) stack depth, even though its time is exponential |

- Time and space trade off: a hash table or a lookup array spends memory to save time.

#### Definitions of the three cases (state these precisely on the exam)
For a fixed size n, let `I_n` be the set of inputs of size n and `cost(I)` the steps taken on input I.
- **Worst case:** `T_worst(n) = max over I in I_n of cost(I)`. This is a guarantee for every input.
- **Best case:** `T_best(n) = min over I in I_n of cost(I)`. The best case is the cheapest input *of size n*, not "a small n" (common mistake).
- **Average case:** `T_avg(n) = Σ over I of Pr[I]·cost(I)`. It is meaningless without a stated probability model, such as "key equally likely at each position" or "all n! orderings equally likely".

#### Linear search, fully worked (verified with exact fractions for n < 30)
```
LinearSearch(A[1..n], x):
    for i = 1 to n:
        if A[i] == x: return i      # i comparisons if x is first found at position i
    return NOT_FOUND                # n comparisons
```
- **Best:** 1 comparison, so Θ(1).
- **Worst:** n comparisons, so Θ(n).
- **Average, key present at a uniformly random position:** (1/n)·Σᵢ i = (n+1)/2, so Θ(n).
- **Average, key present with probability p (uniform position):** E = p·(n+1)/2 + (1−p)·n. Check the ends: p = 1 gives (n+1)/2 and p = 0 gives n. This form is a classic exam variant.

#### Insertion sort, fully worked (verified by exhaustive enumeration of all permutations, n ≤ 8)
```
InsertionSort(A[1..n]):
    for j = 2 to n:
        key = A[j]; i = j - 1
        while i >= 1 and A[i] > key:      # key comparison
            A[i+1] = A[i]; i = i - 1      # shift
        A[i+1] = key
```
Let `t_j` be the number of times the while-test runs for a given j. Then `T(n) = (constant)·n + (constant)·Σ_{j=2..n} t_j`.

| Case | Input | t_j | Key comparisons (exact) | Order |
|---|---|---|---|---|
| Best | already sorted | 1 | n − 1 | Θ(n) |
| Worst | reverse sorted | j | n(n−1)/2 | Θ(n²) |
| Average | random permutation | ≈ j/2 | n(n−1)/4 + n − H_n ≈ n²/4 | Θ(n²) |

- Expected number of shifts = expected number of inversions = n(n−1)/4.
- Verified sample values. For n = 4 the best, worst and average comparison counts are 3, 6 and 59/12 ≈ 4.92. For n = 8 they are 7, 28 and 5399/280 ≈ 19.28.
- **Exam phrasing trap:** "Insertion sort runs in O(n²)" is true for every input. "Insertion sort runs in Θ(n²)" is only correct as a statement about the worst case (or the average case). Its running time on every input is Ω(n).

### Gaps
- Knuth's exact wording "zero or more inputs" / "one or more outputs" could not be confirmed verbatim from a fetched source. The Wikipedia text I retrieved does not contain those words. The variant "zero or more quantities are externally supplied; at least one quantity is produced", typical of Horowitz–Sahni-style books, is also unverified. The course's slide title "Fundamentals of Computer Algorithms" matches the Horowitz–Sahni–Rajasekaran textbook title, so the slides may use that wording. Check the slides.
- The fixed-plus-variable space formula `S(P) = c + S_P(instance characteristics)` taught in Horowitz–Sahni-style courses could not be checked against a free primary source.
- The exact average-comparison formula n(n−1)/4 + n − H_n is my own derivation, verified by brute force. I did not fetch a published source for it. Wikipedia only says "quadratic".

---

## 2. Asymptotic notations O, Ω, Θ, o, ω: definitions (c, n₀), limit tests, properties, prove/disprove, and ranking functions

### Takeaway
- **O** means "eventually ≤ c·g": you need *some* constant c.
- **Ω** means "eventually ≥ c·g".
- **Θ** means both.
- **o and ω** are the strict versions, and they must hold for *every* c > 0. Equivalently lim f/g = 0 (for o) or ∞ (for ω).

To **prove** f = O(g), exhibit explicit (c, n₀) or show lim f/g < ∞. To **disprove** it, assume (c, n₀) exist and derive an impossible inequality such as n ≤ c for all large n, or show f/g → ∞. Inside Θ the base of a logarithm doesn't matter. The base of an exponential, and of a logarithm that appears inside an exponent, does matter. The hierarchy is polylog ≪ polynomial ≪ exponential ≪ factorial ≪ nⁿ.

### Cited Findings
- **Formal definitions with c and n₀**, quoted verbatim from MIT 6.006. Note that R01 uses g for the bounded function and f for the bound, the reverse of CLRS's letters. Source: [MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)
  - "**O Notation:** Non-negative function g(n) is in O(f(n)) if and only if there exists a positive real number c and positive integer n₀ such that g(n) ≤ c · f(n) for all n ≥ n₀."
  - "**Ω Notation:** Non-negative function g(n) is in Ω(f(n)) if and only if there exists a positive real number c and positive integer n₀ such that c · f(n) ≤ g(n) for all n ≥ n₀."
  - "**Θ Notation:** Non-negative g(n) is in Θ(f(n)) if and only if g(n) ∈ O(f(n)) ∩ Ω(f(n))."
  - On the equals sign: "it is more common for people to say that a function g(n) is O(f(n)) or equal to O(f(n)), but what they really mean is set containment, i.e., g(n) ∈ O(f(n))."
- **Little-o**, Knuth's Ω and Θ: Source: [Wikipedia: Big O notation](https://en.wikipedia.org/wiki/Big_O_notation)
  - f(x) = o(g(x)) iff lim f(x)/g(x) = 0. In ε-form: "for every positive constant ε there exists a constant x₀ such that |f(x)| ≤ ε g(x) for all x ≥ x₀".
  - Knuth's Ω: f = Ω(g) ⟺ g = O(f).
  - Θ: f = O(g) and g = O(f), so N·g(x) ≤ f(x) ≤ M·g(x) for positive constants M and N.
  - "f(x)=O(g(x)) does not refer to an equality", so one can write f(x) ∈ O(g(x)).
- **Properties listed on Wikipedia** — [Wikipedia: Big O notation](https://en.wikipedia.org/wiki/Big_O_notation):

  | Property | Rule |
  |---|---|
  | Product | f₁ = O(g₁), f₂ = O(g₂) ⇒ f₁f₂ = O(g₁g₂) |
  | Sum | f₁ = O(g), f₂ = O(g) ⇒ f₁ + f₂ = O(g) |
  | Constant | O(\|k\|·g) = O(g) for a nonzero constant k |
  | Transitivity | f = O(g), g = O(h) ⇒ f = O(h) |

  Its growth table runs O(1) (constant) → O(log n) (binary search) → O(n) → O(n log n) (merge sort, heapsort) → O(n²) (bubble sort) → O(n!) (brute-force TSP).
- **MIT 6.006 growth shorthand:** Θ(1) constant, Θ(log n) logarithmic, Θ(n) linear, Θ(n²) quadratic, Θ(n^c) polynomial, 2^Θ(n^c) exponential. Illustration: "If n = 1000, log n ≈ 10¹, n ≈ 10³, while 2ⁿ ≈ 10³⁰⁰." — [MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)
- **MIT 6.006 asymptotics exercises (with solutions)** — [MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf):
  - C(n, 6006) = Θ(n^6006).
  - 2^(n+1) ∈ Θ(2ⁿ), but 2^(2^(n+1)) ∉ O(2^(2ⁿ)), because 2^(2^(n+1)) = (2^(2ⁿ))².
  - (log n)^a = O(n^b) for all positive constants a, b. Proof: lim log(n^b/(log n)^a) = lim (b log n − a log log n) = ∞. "for the same reasons, n^a = O(cⁿ) for any c > 1".
  - (log n)^(log n) = Ω(n), because m^m = Ω(2^m) with n = 2^m.
  - (6n)! ∉ Θ(n!), but log((6n)!) ∈ Θ(log(n!)), using Stirling n! = √(2πn)(n/e)ⁿ(1 + Θ(1/n)), which gives log(n!) = Θ(n log n).
- **CLRS Problem 3-3 ordering** (30 functions, fastest to slowest; from community solutions to CLRS 3rd ed.) — [walkccc: CLRS 3-3](https://walkccc.me/CLRS/Chap03/Problems/3-3/):
  - Order: 2^(2^(n+1)), 2^(2ⁿ), (n+1)!, n!, eⁿ, n·2ⁿ, 2ⁿ, (3/2)ⁿ, (lg n)^(lg n) = n^(lg lg n), (lg n)!, n³, n² = 4^(lg n), n lg n and lg(n!), n = 2^(lg n), (√2)^(lg n) (= √n), 2^(√(2 lg n)), lg² n, ln n, √(lg n), ln ln n, 2^(lg* n), lg* n and lg*(lg n), lg(lg* n), n^(1/lg n) (= 2) and 1.
  - Part (b) gives a function that is neither O nor Ω of any of them: f(n) = 2^(2^(n+2)) for even n and 0 for odd n.

### Inferences
#### Definitions in CLRS letter convention (f is the function, g the bound)
These are equivalent to the R01 and Wikipedia definitions above. The only change is the letters, plus the standard "0 ≤" for asymptotically nonnegative functions.

| Notation | Read as | Formal definition (watch ∃ vs ∀) | Limit test (if L = lim f/g exists) |
|---|---|---|---|
| f = O(g) | f ≤ g up to a constant | **∃** c > 0, n₀ ≥ 1: 0 ≤ f(n) ≤ c·g(n) for all n ≥ n₀ | L < ∞ |
| f = Ω(g) | f ≥ g up to a constant | **∃** c > 0, n₀: 0 ≤ c·g(n) ≤ f(n) for all n ≥ n₀ | L > 0 (L may be ∞) |
| f = Θ(g) | f ≈ g | **∃** c₁, c₂ > 0, n₀: 0 ≤ c₁g(n) ≤ f(n) ≤ c₂g(n) for all n ≥ n₀ | 0 < L < ∞ |
| f = o(g) | f ≪ g (strictly) | **∀** c > 0 **∃** n₀: 0 ≤ f(n) < c·g(n) for all n ≥ n₀ | L = 0 |
| f = ω(g) | f ≫ g (strictly) | **∀** c > 0 **∃** n₀: 0 ≤ c·g(n) < f(n) for all n ≥ n₀ | L = ∞ |

- The limit test is **sufficient, not necessary**. If lim f/g does not exist, go back to the definitions:
  - f(n) = n(2 + sin n) is still Θ(n), since n ≤ f ≤ 3n, even though f/n has no limit.
  - n^(1+sin n) and n are **incomparable** (neither O nor Ω), because the exponent keeps swinging between about 0 and 2.
- Use L'Hôpital's rule for log versus polynomial: lim ln n / n^ε = lim (1/n)/(ε n^(ε−1)) = lim 1/(ε n^ε) = 0.

#### Properties cheat-sheet (derived or standard, all consistent with the sources)
- **Transitivity** holds for all five notations.
- **Reflexivity** holds for O, Ω and Θ (not for o or ω).
- **Symmetry:** f = Θ(g) ⟺ g = Θ(f).
- **Transpose symmetry:** f = O(g) ⟺ g = Ω(f), and f = o(g) ⟺ g = ω(f).
- **Sums:** f₁ + f₂ = O(max(g₁, g₂)). Also max(f, g) = Θ(f + g) for nonnegative f, g, since max ≤ f + g ≤ 2·max.
- **Products and constants:** O(g₁)·O(g₂) = O(g₁g₂). Positive constant factors disappear.
- **Polynomials:** a_d n^d + … + a₀ with a_d > 0 is Θ(n^d).
- **Logarithms:** log_a n = log_b n / log_b a, so all log bases are Θ of each other. Exponents are a different story: 2^(lg n) = n but 2^(log₄ n) = √n.
- **Hierarchy** (constants a, b > 0, c > 1): (log n)^a = o(n^b), n^a = o(cⁿ), cⁿ = o(n!), n! = o(nⁿ), and aⁿ = o(bⁿ) iff 1 ≤ a < b.
- **Identities (verified):**
  - a^(log_b n) = n^(log_b a)
  - (lg n)^(lg n) = n^(lg lg n)
  - n^(1/lg n) = 2
  - 4^(lg n) = n²
  - (√2)^(lg n) = √n
  - lg(n!) = Θ(n lg n)

#### Recipe: how to prove or disprove f(n) = O(g(n))
- **Prove:**
  1. Write the target inequality f(n) ≤ c·g(n).
  2. For n ≥ n₀, bound every lower-order term of f by a multiple of g, and drop negative terms (upper bound only).
  3. Add the multiples to get c.
  4. State the pair (c, n₀) explicitly. Alternatively, show lim f/g is finite.
- **Disprove:**
  1. Assume c and n₀ exist.
  2. Rearrange until an unbounded quantity is ≤ c (for example n ≤ c, 2ⁿ ≤ c, or n/lg n ≤ c).
  3. Pick n = max(n₀, a value large enough to break it). Contradiction. Alternatively, show lim f/g = ∞.
- **For Θ:** do both directions, giving c₁, c₂ and one common n₀ (the larger of the two thresholds).

#### 18 worked "prove or disprove" examples (each checked with sympy limits or numeric scans)
1. **3n² + 10n + 5 = Θ(n²). TRUE.**
   - Upper bound: for n ≥ 10 we have 10n ≤ n² and 5 ≤ n², so f ≤ 5n². That gives c₂ = 5, n₀ = 10. A cruder version for n ≥ 1 is f ≤ 3n² + 10n² + 5n² = 18n².
   - Lower bound: f ≥ 3n² for n ≥ 1, so c₁ = 3.
   - Verified for n < 10⁵.
2. **n² = O(n)? FALSE.** If n² ≤ cn for all n ≥ n₀, then n ≤ c for all n ≥ n₀. That fails at n = max(n₀, ⌊c⌋+1).
3. **2^(n+1) = O(2ⁿ)? TRUE.** 2^(n+1) = 2·2ⁿ, so c = 2 and n₀ = 1 (MIT R01).
4. **2^(2n) = O(2ⁿ)? FALSE.** 4ⁿ/2ⁿ = 2ⁿ, which is unbounded. If 2ⁿ ≤ c, then n ≤ lg c, a contradiction.
5. **n³ = Ω(n² lg n)? TRUE, and in fact ω.** n² lg n ≤ n³ ⟺ lg n ≤ n, which holds for all n ≥ 1 (c = 1, n₀ = 1). And lim n/lg n = ∞.
6. **lg(n!) = Θ(n lg n). TRUE.** Verified for 4 ≤ n < 2·10⁵.
   - Upper bound: n! ≤ nⁿ, so lg n! ≤ n lg n (c₂ = 1, n₀ = 1).
   - Lower bound: the largest ⌈n/2⌉ factors of n! are each ≥ n/2, so n! ≥ (n/2)^(n/2). Then lg n! ≥ (n/2)(lg n − 1) ≥ (n/4) lg n once lg n ≥ 2. So c₁ = 1/4, n₀ = 4.
7. **n^1.001 = O(n lg n)? FALSE.** The ratio is n^0.001/lg n → ∞, because every polynomial beats every log.
   - **Trap:** n^0.001 overtakes lg n only around n ≈ 2^13747 ≈ 10^4138 (computed numerically). A table of small n values would wrongly suggest the opposite.
8. **√n = O(lg² n)? FALSE.** lg² n = o(√n) by the (log n)^a = O(n^b) fact with a = 2, b = 1/2.
9. **(lg n)^(lg n) = O(n³)? FALSE.** It equals n^(lg lg n), and lg lg n > 3 once n > 256 (verified). After that it beats any fixed polynomial n^c.
10. **n^(1/lg n) = Θ(1)? TRUE.** n^(1/lg n) = 2^(lg n / lg n) = 2.
11. **ln n = Θ(log₁₀ n)? TRUE.** The ratio is ln 10, a constant (sympy).
12. **3ⁿ = O(2ⁿ)? FALSE.** (3/2)ⁿ → ∞. The base of an exponential matters.
13. **n! = O(nⁿ) TRUE, n! = ω(2ⁿ) TRUE, n! = o(nⁿ) TRUE.**
    - n! ≤ nⁿ with c = 1.
    - n!/2ⁿ → ∞.
    - n!/nⁿ = Π (k/n) ≤ 1/n → 0 (sympy confirms both limits).
14. **"f = O(g) ⇒ 2^f = O(2^g)": FALSE.** Counterexample: f = 2n, g = n (see example 4).
15. **"f = O(g) ⇒ g = Ω(f)": TRUE.** f ≤ c·g implies g ≥ (1/c)·f.
16. **"max(f, g) = Θ(f + g)" for nonnegative f, g: TRUE.** Use c₁ = 1/2, c₂ = 1.
17. **"f(n) = O(f(n)²)": FALSE in general.** f = 1/n is a counterexample. It is true whenever f(n) ≥ 1 eventually.
18. **"f(n) = Θ(f(n/2))": FALSE in general.** For f = 2ⁿ the ratio is 2^(n/2) → ∞. It is true for f = n^k (ratio 2^k).

#### Ranking 15 functions by growth rate (verified)
How this was checked: log-scale comparison of every adjacent pair at ln n = 10²…10⁶ (mpmath), plus sympy limits f_i/f_{i+1} → 0 for each pair.

**Rank slowest to fastest:** n^(1/lg n), lg lg n, √(lg n), ln n, lg² n, (√2)^(lg n), n/lg n, 2^(lg n), lg(n!), 4^(lg n), (lg n)^(lg n), (3/2)ⁿ, 2ⁿ, n!, nⁿ.

| # | Function | Simplified | Why it sits above the previous one |
|---|---|---|---|
| 1 | n^(1/lg n) | = 2 (constant) | — |
| 2 | lg lg n | | it is unbounded |
| 3 | √(lg n) | | put m = lg n: lg m ≪ √m |
| 4 | ln n | Θ(lg n) | √m ≪ m |
| 5 | lg² n | | an extra lg factor |
| 6 | (√2)^(lg n) | = √n | polylog ≪ polynomial |
| 7 | n/lg n | | (n/lg n)/√n = √n/lg n → ∞ |
| 8 | 2^(lg n) | = n | an extra lg factor |
| 9 | lg(n!) | Θ(n lg n) | an extra lg factor |
| 10 | 4^(lg n) | = n² | n/lg n → ∞ |
| 11 | (lg n)^(lg n) | = n^(lg lg n), superpolynomial | its exponent lg lg n → ∞ |
| 12 | (3/2)ⁿ | | lg of #11 is lg n · lg lg n = o(n · lg 1.5) |
| 13 | 2ⁿ | | (4/3)ⁿ → ∞ |
| 14 | n! | | n!/2ⁿ → ∞ |
| 15 | nⁿ | | n!/nⁿ ≤ 1/n → 0 |

Ties that are commonly tested:
- lg n ≡ ln n ≡ log₁₀ n
- n² ≡ 4^(lg n)
- n ≡ 2^(lg n)
- n lg n ≡ lg(n!) ≡ ln(nⁿ)
- (lg n)^(lg n) ≡ n^(lg lg n)
- n^(1/lg n) ≡ 2 ≡ 1
- 2^(n+1) ≡ 2ⁿ, but 2^(2n) ≢ 2ⁿ.

### Gaps
- No legitimate free copy of CLRS's own definition text was fetched. The c, n₀ definitions above come from MIT 6.006 R01 and Wikipedia. CLRS's versions are standardly stated equivalently, with 0 ≤ f(n) ≤ c·g(n), but I did not verify them verbatim.
- Whether the course (Horowitz–Sahni-style "Fundamentals of Computer Algorithms" slides) defines o and ω through limits, rather than ∀c/∃n₀, is unverified. Both forms are equivalent for eventually positive g. Check the slides.
- The incomparable example n^(1+sin n) and the n(2 + sin n) example come from my own reasoning, not from a fetched source.

---

## 3. Counting the running time of loops: nested, dependent and logarithmic loops

### Takeaway
Count how many times the innermost statement runs.
- An additive step (i += k) gives about range/k iterations.
- A multiplicative step (i *= 2 or i /= 2) gives Θ(log n) iterations.
- Repeated squaring (i = i²) gives Θ(log log n) iterations.
- For dependent loops, write the sum Σ and evaluate it with the standard formulas: arithmetic, sum of squares, geometric and harmonic.

The two most-missed patterns:
- An outer loop that halves (or doubles) around an inner loop running to i is only **Θ(n)** in total, because the work is geometric.
- `for i: for (j = 1; j ≤ n; j += i)` is **Θ(n log n)**, because the work is harmonic.

### Cited Findings
- **Worked nested-loop analysis:** in the birthday-matching code, an outer loop over k = 0…n−1 has an inner loop over the k records already stored. The running time is "at most O(n) + Σ_{k=0}^{n−1} (O(1) + k·O(1)) = O(n²)". — [MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)
- **Harmonic numbers:** "H_n = Θ(log n); in fact, we have the stronger inequalities ln(n + 1) ≤ H_n ≤ ln n + 1." — [Erickson, Solving Recurrences](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)
- **An "almost geometric" sum:** Σ_{j≥1} j/2^j = 2. Erickson uses it to show such sums are dominated by their largest term. — [Erickson, Solving Recurrences](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)
- **Geometric series fact:** "The sum of any increasing geometric series is, within a constant factor, simply the last term of the series." For a decreasing series the sum is given by its first term. — [Dasgupta–Papadimitriou–Vazirani, Algorithms, ch. 2](https://people.eecs.berkeley.edu/~vazirani/algorithms/chap2.pdf)
- **Binary search is the canonical O(log n) example**, and merge sort the canonical O(n log n) example. — [Wikipedia: Big O notation](https://en.wikipedia.org/wiki/Big_O_notation)

### Inferences
#### Toolbox of sums (each verified numerically)

| Sum | Value |
|---|---|
| Σ_{i=1..n} 1 | n |
| Σ i | n(n+1)/2 |
| Σ i² | n(n+1)(2n+1)/6 |
| Σ i³ | (n(n+1)/2)² |
| Σ_{i=0..k} 2^i | 2^(k+1) − 1 |
| Σ_{i≥0} r^i (\|r\| < 1) | 1/(1−r) |
| H_n = Σ 1/i | ln n + O(1) |
| Σ 1/i² | converges, to π²/6 |
| Σ_{i=1..n} lg i | lg(n!) = Θ(n lg n) |
| Σ_{k≥0} ⌊n/2^k⌋ | 2n − (number of 1-bits in n) < 2n |

**Rules of thumb:**
- Sequential blocks add, and the dominant term wins.
- For if/else in the worst case, charge the more expensive branch.
- Independent nested loops multiply.
- Dependent loops must be **summed**.
- For a while-loop, solve for the iteration count k at which the condition first fails.
- Multiplying the maximum inner count by the outer count gives a valid **O** bound. For **Θ** you also need a matching lower bound. For example, in Σ_{i=1..n} i the top n/2 terms are each ≥ n/2, so the sum is ≥ n²/4.

#### 17 worked loop examples (exact counts verified by simulation for n ∈ {1, 2, 3, 7, 8, 10, 31, 64, 100}; asymptotic ratios checked up to n = 10⁶–10⁸)

**L1. Independent nested: n² → Θ(n²)**
```
for i = 1 to n:
    for j = 1 to n:  x++
```

**L2. Dependent: Σ_{i=1..n} i = n(n+1)/2 → Θ(n²)**
```
for i = 1 to n:
    for j = 1 to i:  x++
```

**L3. All pairs i < j: n(n−1)/2 → Θ(n²)**
```
for i = 1 to n:
    for j = i+1 to n:  x++
```

**L4. Triple dependent: n(n+1)(n+2)/6 = C(n+2, 3) → Θ(n³)**
```
for i = 1 to n:
    for j = 1 to i:
        for k = 1 to j:  x++
```

**L5. Doubling: ⌊lg n⌋ + 1 iterations → Θ(log n)**
```
i = 1
while i <= n:  i = 2*i
```

**L6. Halving: ⌊lg n⌋ + 1 iterations → Θ(log n)**
```
i = n
while i >= 1:  i = i / 2      # integer division
```

**L7. Linear × log: n(⌊lg n⌋ + 1) → Θ(n log n)**
```
for i = 1 to n:
    j = 1
    while j <= n:  j = 2*j
```

**L8. Halving outer, linear inner: n + ⌊n/2⌋ + ⌊n/4⌋ + … = 2n − popcount(n) < 2n → Θ(n), NOT n log n**
```
for (i = n; i >= 1; i = i/2)
    for (j = 1; j <= i; j++)  x++
```

**L9. Harmonic: Σᵢ (⌊(n−1)/i⌋ + 1) ≈ n·H_n → Θ(n log n)**

At n = 10⁶ the simulated count divided by n ln n is 1.08, and the ratio drifts toward 1 as n grows.
```
for i = 1 to n:
    for (j = 1; j <= n; j += i)  x++
```

**L10. Square-root bound: ⌊√n⌋ iterations → Θ(√n)**
```
for (i = 1; i*i <= n; i++)  x++
```

**L11. Growing step: after k iterations p = k(k+1)/2 > n, so k ≈ √(2n) → Θ(√n)**

Simulated k/√(2n) = 1.0000 at n = 10⁸.
```
p = 0
for (i = 1; p <= n; i++)  p = p + i
```

**L12. Repeated squaring: i = 2^(2^t) ≤ n ⇔ t ≤ lg lg n, so ⌊lg lg n⌋ + 1 iterations → Θ(log log n)**
```
for (i = 2; i <= n; i = i*i)  x++
```

**L13. Doubling outer, linear inner: 1 + 2 + 4 + … + 2^⌊lg n⌋ = 2^(⌊lg n⌋+1) − 1 < 2n → Θ(n)**
```
for (i = 1; i <= n; i *= 2)
    for (j = 1; j <= i; j++)  x++
```

**L14. Doubling outer, doubling inner: Σ_{t=0..L} (t+1) = (L+1)(L+2)/2 with L = ⌊lg n⌋ → Θ(log² n)**
```
for (i = 1; i <= n; i *= 2)
    for (j = 1; j <= i; j *= 2)  x++
```

**L15. Polynomial inner bound: n·Σ i² = n·n(n+1)(2n+1)/6 → Θ(n⁴)**
```
for i = 1 to n:
    for j = 1 to i*i:
        for k = 1 to n:  x++
```

**L16. Mixed: (n − ⌊n/2⌋ + 1)·(n − ⌊n/2⌋)·(⌊lg n⌋ + 1) → Θ(n² log n)**
```
for (i = n/2; i <= n; i++)
    for (j = 1; j + n/2 <= n; j++)
        for (k = 1; k <= n; k = 2*k)  x++
```

**L17. √ inner: Σ ⌊√i⌋ ≈ (2/3)n^(3/2) → Θ(n^(3/2))**

Simulated count/((2/3)n^1.5) = 0.9993 at n = 10⁶.
```
for i = 1 to n:
    for (j = 1; j*j <= i; j++)  x++
```

#### Loop traps
- **Infinite loops:**
  - `for (j = 1; j <= n; j = j*i)` never terminates when i = 1, because j stays 1.
  - `for (j = 0; j < n; j *= 2)` never terminates, because j stays 0. Always check the starting value and the multiplier.
- **Early exit (`break`/`return`):** the best and worst cases then differ, as in linear search. Say which case you are analysing.
- **"Two nested loops ⇒ n²" is false whenever an inner bound shrinks geometrically.** See L8 and L13, which are Θ(n).
- **Integer division matters for exact counts, not for Θ.** ⌊lg n⌋ + 1 = Θ(log n).

### Gaps
- No single fetched source works through all 17 patterns. They are my own derivations, checked by brute-force simulation. Examples like L11 are often credited to popular YouTube lectures (e.g., Abdul Bari), but I could not verify those videos this session.

---

## 4. Recurrences: setting them up from code; substitution (incl. subtracting a lower-order term); iteration/unrolling; recursion trees

### Takeaway
A recurrence has the shape T(n) = (sum of T(subproblem size) over the recursive calls actually made) + (non-recursive work in one call), plus a base case.
1. Get a **guess** by unrolling (iteration) or by drawing a **recursion tree** and summing level by level. If the level sums decrease geometrically the root dominates. If they are equal, the answer is per-level cost × number of levels. If they increase geometrically, the leaves dominate.
2. **Prove** the guess by substitution (induction) with the *same* constant c.
3. If the induction "almost" works and leaves an extra +1 or +n, strengthen the hypothesis by **subtracting a lower-order term** (cn − d, or cn² − dn). Do not give up on the guess.

### Cited Findings
- **The one fail-safe method:** "Guess the answer, and then prove it correct by induction." A recurrence "consists of one or more base cases and one or more recursive cases". — [Erickson, Solving Recurrences](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)
- **Tower of Hanoi:** T(n) = 2T(n−1) + 1 with T(0) = 0. Unrolling k times gives T(n) = 2^k T(n−k) + (2^k − 1), so T(n) = 2ⁿ − 1. — [Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)
- **Fibonacci:** induction gives F_n ≤ φ^(n−1) (n ≥ 0) and F_n ≥ φ^(n−2) (n ≥ 1), so F_n = Θ(φⁿ) with φ = (1+√5)/2 ≈ 1.618034. Exactly, F(n) = (φⁿ − φ̂ⁿ)/√5 with φ̂ = (1−√5)/2. — [Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)
- **Mergesort:**
  - The worst-case recurrence is T(n) = T(⌈n/2⌉) + T(⌊n/2⌋) + Θ(n). Simplify it to 2T(n/2) + n and unroll to 2^k T(n/2^k) + kn, which gives T(n) = n log₂ n + n = Θ(n log n). — [Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)
  - On dropping the Θ's before solving: "if we kept the asymptotic expressions, we might be tempted to simplify them inappropriately". — [Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)
  - "The recurrence relation for merge sort is then T(n) = 2T(n/2) + Θ(n), which solves to T(n) = Θ(n log n)." — [MIT 6.006 R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf)
- **Floors and ceilings don't matter asymptotically.** Erickson's domain-transformation argument starts from T(n) ≤ 2T(⌈n/2⌉) + n ≤ 2T(n/2 + 1) + n and sets S(n) = T(n + 2). Then S(n) ≤ 2S(n/2) + O(n), so T(n) = O(n log n). A matching lower bound gives Θ. — [Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)
- **Three primary methods** (MIT 6.006): "Substitution: Guess a solution and substitute to show the recurrence holds." "Recursion Tree: Draw a tree representing the recurrence and sum computation at nodes." "Master Theorem: A general formula to solve a large class of recurrences." — [MIT 6.006 R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf)
- **MIT 6.006 R03 exercises with answers:**

  | Recurrence | Answer |
  |---|---|
  | binary search | T(n) = T(n/2) + O(1) ⇒ O(log n) |
  | T(n−1) + O(1) | O(n) |
  | T(n−1) + O(n) | O(n²) |
  | 2T(n−1) + O(1) | O(2ⁿ) |
  | T(2n/3) + O(1) | O(log n) |
  | 2T(n/2) + O(1) | O(n) |
  | T(n/2) + O(n) | O(n) |
  | 2T(n/2) + O(n log n) | O(n log² n) |
  | 4T(n/2) + O(n) | O(n²) |

  Source: [MIT 6.006 R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf)
- **Recursion trees (Erickson):** the tree is "a complete a-ary tree where each node at depth i contains the value f(n/b^i)". T(n) = Σ_{i=0}^{L} a^i f(n/b^i) with L = log_b n, and the last level contributes Θ(n^(log_b a)). "only the largest term in the geometric series matters". — [Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)
- **Erickson's worked recursion-tree results** — [Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf):

  | Recurrence | How the levels behave | Result |
  |---|---|---|
  | 2T(n/2) + n | every level sums to n | Θ(n log n) |
  | T(3n/4) + n | decreasing | Θ(n) |
  | 3T(n/2) + n | increasing; dominated by the leaves | Θ(n^(log₂ 3)) |
  | 2T(n/2) + n/lg n | level sums n/(lg n − i); total n·H_{lg n} | Θ(n lg lg n) |
  | 4T(n/2) + n lg n | | Θ(n²) |
  | T(3n/4) + T(n/4) + n | n log₄ n ≤ T(n) ≤ n log_{4/3} n | Θ(n log n) |
  | T(n/5) + T(7n/10) + n | level sums n, 9n/10, 81n/100, … | Θ(n) |
  | √n·T(√n) + n | | Θ(n lg lg n) |

  For √n·T(√n) + n, Erickson first tries guess-and-check: n lg n is too big and n is too small.
- **DPV's level-sum view:** level k does O(nᵈ)·(a/bᵈ)^k work. "As k goes from 0 (the root) to log_b n (the leaves), these numbers form a geometric series with ratio a/bᵈ." Binary search satisfies "T(n) = T(⌈n/2⌉) + O(1) ... a running time of just O(log n)". — [DPV ch. 2](https://people.eecs.berkeley.edu/~vazirani/algorithms/chap2.pdf)
- **Substitution-method solutions to CLRS 3rd ed. exercises (unofficial community solutions)** — [walkccc: CLRS 4.3](https://walkccc.me/CLRS/Chap04/4.3/):
  - 4.3-1: T(n) = T(n−1) + n is O(n²), via T(n) ≤ c(n−1)² + n = cn² − 2cn + c + n ≤ cn².
  - 4.3-3: T(n) = 2T(⌊n/2⌋) + n is Θ(n lg n).
  - 4.3-7: T(n) = 4T(n/3) + n. The guess cn^(log₃ 4) fails ("cn^(log₃ 4) + n"), but cn^(log₃ 4) − dn works for d ≥ 3.
  - 4.3-9: T(n) = 3T(√n) + log n. With m = lg n, S(m) = 3S(m/2) + m, so T(n) = Θ((lg n)^(lg 3)).
- **Recursion-tree exercise answers, CLRS 3rd ed. 4.4** — [walkccc: CLRS 4.4](https://walkccc.me/CLRS/Chap04/4.4/):

  | Recurrence | Answer |
  |---|---|
  | 3T(⌊n/2⌋) + n | O(n^(lg 3)) |
  | T(n/2) + n² | Θ(n²) |
  | 4T(n/2 + 2) + n | Θ(n²) |
  | 2T(n−1) + 1 | Θ(2ⁿ) |
  | T(n−1) + T(n/2) + n | O(2ⁿ) and Ω(n²) |
  | T(n/3) + T(2n/3) + cn | Ω(n lg n) (the exercise asks for the lower bound) |
  | T(n−a) + T(a) + cn | Θ(n²) |
  | T(αn) + T((1−α)n) + cn | Θ(n lg n) |

### Inferences
#### A. Setting up recurrences from code (closed forms verified exactly)

**1. Binary search.** One recursive call on at most ⌊n/2⌋ elements plus Θ(1) work, so T(n) = T(⌊n/2⌋) + Θ(1) = **Θ(log n)** in the worst case.
```
BinSearch(A, lo, hi, x):
    if lo > hi: return NOT_FOUND
    mid = (lo + hi) / 2                       # floor
    if A[mid] == x: return mid
    if A[mid] < x: return BinSearch(A, mid+1, hi, x)
    else:          return BinSearch(A, lo, mid-1, x)
```
- Exact count: T(1) = 1 and T(n) = T(⌊n/2⌋) + 1 give **T(n) = ⌊lg n⌋ + 1**, verified for all n < 65,536.
- The best case is Θ(1): the key is at the first mid.
- Space: Θ(log n) of stack if written recursively, Θ(1) if iterative.

**2. Merge sort.** T(n) = T(⌈n/2⌉) + T(⌊n/2⌋) + Θ(n) = **Θ(n log n)**. For n = 2^k with T(1) = 1 and T(n) = 2T(n/2) + n, the exact solution is **n lg n + n** (verified up to n = 2²⁰).

**3. Naive Fibonacci.**
```
Fib(n): if n <= 1: return n
        return Fib(n-1) + Fib(n-2)
```
- The recurrence is T(n) = T(n−1) + T(n−2) + Θ(1), so **T(n) = Θ(φⁿ)**, about Θ(1.618ⁿ).
- The number of calls satisfies C(n) = C(n−1) + C(n−2) + 1 with C(0) = C(1) = 1, so **C(n) = 2F(n+1) − 1**. Verified for n < 80, where C(n)/φⁿ → 2φ/√5 ≈ 1.447.
- Quick bounds for n ≥ 2: since T(n−2) ≤ T(n−1), we get 2T(n−2) ≤ T(n) ≤ 2T(n−1). Hence **2^(n/2) ≤ C(n) ≤ 2ⁿ** (verified).

**4. Tower of Hanoi.**
```
Hanoi(n, src, dst, tmp):
    if n == 0: return
    Hanoi(n-1, src, tmp, dst); move disk n src→dst; Hanoi(n-1, tmp, dst, src)
```
T(n) = 2T(n−1) + 1 with T(0) = 0 gives **2ⁿ − 1 moves**, which is Θ(2ⁿ) (Erickson; verified).

**5. More quick set-ups:**

| Code | Recurrence | Solution |
|---|---|---|
| factorial | T(n−1) + Θ(1) | Θ(n) |
| recursive selection sort or insertion sort | T(n−1) + Θ(n) | Θ(n²) |
| quicksort, worst case | T(n−1) + Θ(n) | Θ(n²) |
| quicksort, balanced splits | 2T(n/2) + Θ(n) | Θ(n log n) |
| Karatsuba | 3T(n/2) + Θ(n) | Θ(n^(lg 3)) ≈ n^1.585 |
| Strassen | 7T(n/2) + Θ(n²) | Θ(n^(lg 7)) ≈ n^2.81 (DPV) |

**6. Fast power: count the calls.**
```
Power(x, n): if n == 0: return 1
             h = Power(x, n/2)                 # ONE call
             return h*h if n even else h*h*x
```
- This makes one call, so T(n) = T(n/2) + Θ(1) = **Θ(log n)**.
- If you write `return Power(x, n/2) * Power(x, n/2)` you make **two** calls, so T(n) = 2T(n/2) + Θ(1) = **Θ(n)**. It is the same arithmetic with a different recurrence (trap).

#### B. Substitution method: procedure plus 6 worked proofs
**Procedure:**
1. Guess the form.
2. Write the inductive hypothesis (IH): T(m) ≤ c·g(m) for all n₀ ≤ m < n.
3. Substitute the IH into the recurrence and reach **exactly** T(n) ≤ c·g(n), with the same c and nothing left over.
4. Choose n₀ and c so the base cases hold, and make sure every recursive argument of an n you induct on is ≥ n₀ or is itself a base case.

**S1. T(n) = 2T(⌊n/2⌋) + n with T(1) = 1. Claim: T(n) ≤ 2 n lg n for n ≥ 2. Verified for n < 65,536.**
- Inductive step: T(n) ≤ 2·c⌊n/2⌋ lg⌊n/2⌋ + n ≤ cn lg(n/2) + n = cn lg n − cn + n ≤ cn lg n whenever **c ≥ 1**.
- Base: n = 1 cannot work, because c·1·lg 1 = 0 < T(1) = 1. So take **n₀ = 2**.
- For n ≥ 4 we have ⌊n/2⌋ ≥ 2, so the IH applies. The remaining base cases are n = 2, 3, with T(2) = 4 ≤ 2c and T(3) = 5 ≤ 3c·lg 3. These force **c ≥ 2**.
- A matching lower bound T(n) ≥ ½ n lg n (n ≥ 2, verified) gives Θ(n lg n).

**S2. Subtracting a lower-order term: T(n) = T(⌊n/2⌋) + T(⌈n/2⌉) + 1 with T(1) = 1.**
- Guess T(n) ≤ cn. Then T(n) ≤ c⌊n/2⌋ + c⌈n/2⌉ + 1 = **cn + 1**, which fails: cn + 1 ≤ cn is false for every c.
- Strengthen the guess to T(n) ≤ cn − d. Then T(n) ≤ (c⌊n/2⌋ − d) + (c⌈n/2⌉ − d) + 1 = cn − 2d + 1 ≤ cn − d ⟺ **d ≥ 1**.
- Base: T(1) = 1 ≤ c − d, so c = 2, d = 1, and T(n) ≤ 2n − 1 = O(n). In fact **T(n) = 2n − 1 exactly** (verified for n < 65,536).
- Lesson: a *stronger* claim can be *easier* to prove, because the IH hands you more.

**S3. T(n) = 4T(n/2) + n for n a power of 2, T(1) = 1.**
- Guess cn². Then 4c(n/2)² + n = cn² + n, which fails.
- Guess cn² − dn. Then 4(c n²/4 − d n/2) + n = cn² − 2dn + n ≤ cn² − dn ⟺ d ≥ 1.
- Base T(1) = 1 ≤ c − d gives c = 2, d = 1, so **T(n) ≤ 2n² − n**. The exact solution is **2n² − n** (verified).
- Same pattern as CLRS 4.3-7: for 4T(n/3) + n you need d ≥ 3.

**S4. T(n) = T(n−1) + n is O(n²).** T(n) ≤ c(n−1)² + n = cn² − (2c − 1)n + c ≤ cn² ⟺ (2c−1)n ≥ c. With c = 1 this is n ≥ 1, which holds.

**S5. The classic wrong proof (trap).** "T(n) = 2T(n/2) + n ≤ 2c(n/2) + n = cn + n = O(n)."
- This is wrong. You must reach T(n) ≤ **cn** with the *same* c, and cn + n is not ≤ cn.
- Calling it "O(n)" hides a constant that grows at every level. The true answer is Θ(n lg n).

**S6. Change of variables.** T(n) = 2T(√n) + lg n.
- Let m = lg n and S(m) = T(2^m). Then S(m) = 2S(m/2) + m, so S(m) = Θ(m lg m), and **T(n) = Θ(lg n · lg lg n)**.
- With T(2) = 1 and n = 2^(2^k), the exact solution is **lg n·lg lg n + lg n** (verified).
- Variants:
  - T(n) = 2T(√n) + 1 gives Θ(lg n), exactly 2 lg n − 1.
  - T(n) = T(√n) + 1 gives Θ(lg lg n).
  - T(n) = 3T(√n) + lg n gives Θ((lg n)^(lg 3)) (walkccc 4.3-9).

#### C. Iteration / unrolling: worked examples (all closed forms verified exactly)
**Template:** after i steps, T(n) = a^i·T(n/b^i) + Σ_{j=0}^{i−1} a^j f(n/b^j). Stop when n/b^i = 1, i.e. i = log_b n. There are a^(log_b n) = n^(log_b a) leaves.

| # | Recurrence (base) | Unrolled sum | Closed form | Order |
|---|---|---|---|---|
| I1 | T(n−1) + n, T(1)=1 | n + (n−1) + … + 2 + 1 | n(n+1)/2 | Θ(n²) |
| I2 | 2T(n/2) + n, T(1)=1, n=2^k | 2^i T(n/2^i) + i·n, stop at i = k | n lg n + n | Θ(n lg n) |
| I3 | 2T(n−1) + 1, T(0)=0 | 2^i T(n−i) + 2^i − 1 | 2ⁿ − 1 | Θ(2ⁿ) |
| I4 | T(n/2) + 1, T(1)=1 | 1 + 1 + … (lg n + 1 terms) | lg n + 1 | Θ(lg n) |
| I5 | T(n/2) + n, T(1)=1 | n + n/2 + … + 2 + 1 | 2n − 1 | Θ(n) |
| I6 | 3T(n/2) + n, T(1)=1 | n·Σ(3/2)^i + 3^k = 2n((3/2)^k − 1) + n^(lg 3) | 3n^(lg 3) − 2n | Θ(n^(lg 3)) |
| I7 | 4T(n/2) + n, T(1)=1 | n·Σ 2^i + 4^k = n(n−1) + n² | 2n² − n | Θ(n²) |
| I8 | 2T(n/2) + n², T(1)=1 | n²·Σ(1/2)^i + n | 2n² − n | Θ(n²) |
| I9 | 2T(n−1) + n, T(0)=0 | Σ_{i=0}^{n−1} 2^i (n−i) = 2ⁿ·Σ_{j=1}^{n} j/2^j | 2^(n+1) − n − 2 | Θ(2ⁿ) — not n·2ⁿ |
| I10 | T(n−1) + 1/n, T(0)=0 | 1 + 1/2 + … + 1/n | H_n | Θ(log n) |
| I11 | T(n−2) + n², T(0)=0, T(1)=1 | n² + (n−2)² + (n−4)² + … | n(n+1)(n+2)/6 (both parities) | Θ(n³) |

#### D. Recursion trees: worked examples (verified numerically)
**R1. T(n) = 3T(n/4) + cn² (the classic CLRS example). Root dominates: Θ(n²).**
- Level i has 3^i nodes, each costing c(n/4^i)², so the level sum is (3/16)^i·cn².
- The depth is log₄ n, and there are 3^(log₄ n) = n^(log₄ 3) ≈ n^0.79 leaves.
- Total < cn²·Σ(3/16)^i + Θ(n^(log₄ 3)) = (16/13)cn² + o(n²) = **Θ(n²)**.
- Exact for c = 1, T(1) = 1, n = 4^k: (16/13)n² − (3/13)n^(log₄ 3).

**R2. T(n) = T(n/3) + T(2n/3) + cn. Θ(n lg n).**
- Every complete level sums to cn.
- The shortest root-to-leaf path has length log₃ n and the longest has length log_{3/2} n.
- So about cn·log₃ n ≤ T(n) ≤ cn·log_{3/2} n, i.e. **Θ(n lg n)**. Simulation gives T/(n lg n) ≈ 1.03 at n = 10⁶.

**R3. T(n) = 4T(n/2) + n. Leaves dominate: Θ(n²).** The level sums are n, 2n, 4n, … (ratio 2), so the leaves win: n^(lg 4) = **Θ(n²)**.

**R4. T(n) = 2T(n/2) + n lg n. Θ(n lg² n).**
- Level i sums to 2^i·(n/2^i)·lg(n/2^i) = n(lg n − i).
- Total n·Σ_{j=1}^{lg n} j = n·lg n(lg n + 1)/2, i.e. **Θ(n lg² n)**. Exact with T(1) = 1: n(1 + lg n(lg n+1)/2).

**R5. T(n) = 2T(n/2) + n/lg n. Θ(n lg lg n).** Level i sums to n/(lg n − i), so the total is n·H_{lg n} = **Θ(n lg lg n)**. Exact: n(1 + H_{lg n}).

**R6. T(n) = T(n/5) + T(7n/10) + n. Θ(n).** The levels are n, 0.9n, 0.81n, … , a decreasing geometric series, so **Θ(n)**. Simulation: T/n → 10 = 1/(1 − 0.9), slowly (8.5 at n = 10⁶).

**Level-sum rule** (DPV, Erickson, MIT R03 all say this). Let r be the ratio between consecutive level sums.

| r | Who dominates | Answer |
|---|---|---|
| r < 1 | the root | Θ(f(n)) |
| r = 1 | all levels equally | Θ(f(n)·log n) |
| r > 1 | the leaves | Θ(n^(log_b a)) |

### Gaps
- CLRS §4.3–4.4 text was not fetched (there is no legitimate free copy). The CLRS exercise answers above come from walkccc, an unofficial community solution set, and should be treated as reliable but unofficial.
- The tight-constant claims (c = 2, n₀ = 2 in S1; c = 3 in P9 of section 6) are my own, verified numerically. They are not quoted from a source.

---

## 5. The Master Theorem: exact CLRS statement (with regularity), the simplified Θ(n^k log^p n) form, 20+ worked examples, when it does NOT apply, and Akra–Bazzi

### Takeaway
For T(n) = aT(n/b) + f(n), compare f(n) with the **watershed** W(n) = n^(log_b a), which is the number of leaves.
- **Case 1:** f is *polynomially* smaller (by a factor n^ε). Then T = Θ(W).
- **Case 2:** f = Θ(W·lg^k n). Then multiply by one more lg: T = Θ(W·lg^(k+1) n). The strict CLRS 3rd-edition statement has only k = 0.
- **Case 3:** f is *polynomially* larger **and** satisfies the regularity condition a·f(n/b) ≤ c·f(n) for some c < 1. Then T = Θ(f).

The theorem does **not** apply in any of these situations:
- subtractive recurrences such as T(n−1)
- subproblems of unequal sizes
- sizes like √n
- a not constant, or a < 1
- negative f
- "non-polynomial gaps" in the 3-case version, such as n/lg n or n lg n against n
- an irregular f

Use recursion trees, substitution, change of variables or Akra–Bazzi instead.

### Cited Findings
- **Wikipedia: form, cases and extended case 2.** Source: [Wikipedia: Master theorem](https://en.wikipedia.org/wiki/Master_theorem_%28analysis_of_algorithms%29)
  - Form: T(n) = aT(n/b) + f(n). a is the number of subproblems; b > 1 is the factor by which the size shrinks; f(n) is the time to split and recombine. The critical exponent is c_crit = log_b a.
  - **Case 1:** f(n) = O(n^c) with c < c_crit ⇒ T(n) = Θ(n^(c_crit)).
  - **Case 2:** f(n) = Θ(n^(c_crit)·log^k n) for k ≥ 0 ⇒ T(n) = Θ(n^(c_crit)·log^(k+1) n).
  - **Case 3:** f(n) = Ω(n^c) with c > c_crit, plus the regularity condition a·f(n/b) ≤ k·f(n) for some k < 1 ⇒ T(n) = Θ(f(n)).
  - **Extended case 2:**
    - 2a: k > −1 ⇒ Θ(n^(c_crit)·log^(k+1) n)
    - 2b: k = −1, i.e. f = Θ(n^(c_crit)/log n) ⇒ Θ(n^(c_crit)·log log n)
    - 2c: k < −1 ⇒ Θ(n^(c_crit))
- **Wikipedia: examples, inadmissible equations and history.** Source: [Wikipedia: Master theorem](https://en.wikipedia.org/wiki/Master_theorem_%28analysis_of_algorithms%29)
  - Examples: 8T(n/2) + 1000n² ⇒ Θ(n³) (case 1). 2T(n/2) + 10n ⇒ Θ(n log n) (case 2). 2T(n/2) + n² ⇒ Θ(n²) (case 3, regularity 2(n²/4) ≤ ½n²).
  - **Inadmissible:**
    - T(n) = 2ⁿT(n/2) + nⁿ ("a is not a constant")
    - T(n) = 2T(n/2) + n/log n ("non-polynomial difference" between f(n) and n^(log_b a))
    - T(n) = 64T(n/8) − n² log n ("f(n) is not positive")
    - T(n) = T(n/2) + n(2 − cos n) ("case 3 but regularity violation")
  - **History:** "first presented by Jon Bentley, Dorothea Blostein (née Haken), and James B. Saxe in 1980". The name was popularised by CLRS.
- **MIT 6.006 statement** — [MIT 6.006 R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf):
  - Hypotheses: "T(n) = aT(n/b) + f(n) and T(1) = Θ(1), with branching factor a ≥ 1, problem size reduction factor b > 1, and asymptotically non-negative function f(n)". The theorem compares f(n) "to a^(log_b n) = n^(log_b a), the number of leaves at the bottom of the recursion tree".

  | Case | Solution | Condition |
  |---|---|---|
  | 1 | Θ(n^(log_b a)) | f(n) = O(n^(log_b a − ε)) for some constant ε > 0 |
  | 2 | Θ(n^(log_b a)·log^(k+1) n) | f(n) = Θ(n^(log_b a)·log^k n) for some constant k ≥ 0 |
  | 3 | Θ(f(n)) | f(n) = Ω(n^(log_b a + ε)) for some constant ε > 0, **and** a·f(n/b) < c·f(n) for some constant 0 < c < 1 |

  - Polynomial special case T(n) = aT(n/b) + Θ(n^c):
    - c < log_b a ⇒ Θ(n^(log_b a)): "Work done at leaves dominates".
    - c = log_b a ⇒ Θ(n^c log n): "Work balanced across the tree".
    - c > log_b a ⇒ Θ(n^c): "Work done at root dominates".
  - Exam advice: "To apply the Master Theorem (or this simpler special case), you should state which case applies, and show that your recurrence relation satisfies all conditions required by the relevant case."
- **UWO "Master Theorem: Practice Problems and Solutions" handout** — [UWO handout (PDF)](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf):
  - Statement: a ≥ 1 and b > 1 are constants and f(n) is asymptotically positive.
    1. f = O(n^(log_b a − ε)) ⇒ Θ(n^(log_b a)).
    2. f = Θ(n^(log_b a)·log^k n) with k ≥ 0 ("most of the time, k = 0") ⇒ Θ(n^(log_b a)·log^(k+1) n).
    3. f = Ω(n^(log_b a + ε)) and regularity "af(n/b) ≤ cf(n) for some constant c < 1 and all sufficiently large n" ⇒ Θ(f(n)).
  - Its 22 problems with official answers:

    | # | Recurrence | Answer (case) |
    |---|---|---|
    | 1 | 3T(n/2) + n² | Θ(n²) (3) |
    | 2 | 4T(n/2) + n² | Θ(n² log n) (2) |
    | 3 | T(n/2) + 2ⁿ | Θ(2ⁿ) (3) |
    | 4 | 2ⁿT(n/2) + nⁿ | does not apply: a not constant |
    | 5 | 16T(n/4) + n | Θ(n²) (1) |
    | 6 | 2T(n/2) + n log n | n log² n (2) |
    | 7 | 2T(n/2) + n/log n | does not apply: non-polynomial difference |
    | 8 | 2T(n/4) + n^0.51 | Θ(n^0.51) (3) |
    | 9 | 0.5T(n/2) + 1/n | does not apply: a < 1 |
    | 10 | 16T(n/4) + n! | Θ(n!) (3) |
    | 11 | √2·T(n/2) + log n | Θ(√n) (1) |
    | 12 | 3T(n/2) + n | Θ(n^(lg 3)) (1) |
    | 13 | 3T(n/3) + √n | Θ(n) (1) |
    | 14 | 4T(n/2) + cn | Θ(n²) (1) |
    | 15 | 3T(n/4) + n log n | Θ(n log n) (3) |
    | 16 | 3T(n/3) + n/2 | Θ(n log n) (2) |
    | 17 | 6T(n/3) + n² log n | Θ(n² log n) (3) |
    | 18 | 4T(n/2) + n/log n | Θ(n²) (1) |
    | 19 | 64T(n/8) − n² log n | does not apply: f not positive |
    | 20 | 7T(n/3) + n² | Θ(n²) (3) |
    | 21 | 4T(n/2) + log n | Θ(n²) (1) |
    | 22 | T(n/2) + n(2 − cos n) | does not apply: regularity violated |

  - For #22 the handout says: "Consider n = 2πk, where k is odd and arbitrarily large. For any such choice of n, you can show that c ≥ 3/2."
- **Dasgupta–Papadimitriou–Vazirani form:** "If T(n) = aT(⌈n/b⌉) + O(nᵈ) for some constants a > 0, b > 1, and d ≥ 0, then T(n) = O(nᵈ) if d > log_b a; O(nᵈ log n) if d = log_b a; O(n^(log_b a)) if d < log_b a." The proof is the geometric series of level sums with ratio a/bᵈ. — [DPV ch. 2](https://people.eecs.berkeley.edu/~vazirani/algorithms/chap2.pdf)
- **Erickson's "level-ratio" form:**
  - "If a f(n/b) = κ f(n) for some constant κ < 1, then T(n) = Θ(f(n))."
  - "If a f(n/b) = K f(n) for some constant K > 1, then T(n) = Θ(n^(log_b a))."
  - "If a f(n/b) = f(n), then T(n) = Θ(f(n) log_b n)."
  - "If none of these three cases apply, you're on your own."
  - Source: [Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)
- **GeeksforGeeks "advanced" form** (page last updated 12 Jan 2026) — [GfG: Advanced master theorem](https://www.geeksforgeeks.org/advanced-master-theorem-for-divide-and-conquer-recurrences/):
  - Form: T(n) = aT(n/b) + Θ(n^k log^p n) with a ≥ 1, b > 1, k ≥ 0, p real.
  - a > b^k ⇒ Θ(n^(log_b a)).
  - a = b^k: p > −1 ⇒ Θ(n^(log_b a)·log^(p+1) n); p = −1 ⇒ Θ(n^(log_b a)·log log n); p < −1 ⇒ Θ(n^(log_b a)).
  - a < b^k: p ≥ 0 ⇒ Θ(n^k log^p n); p < 0 ⇒ stated as "θ(n^k)". **This sub-case is wrong. See the correction under Inferences.**
- **CLRS 3rd-ed. §4.5 exercise answers (unofficial community solutions)** — [walkccc: CLRS 4.5](https://walkccc.me/CLRS/Chap04/4.5/):
  - 2T(n/4) + 1 ⇒ Θ(√n). 2T(n/4) + √n ⇒ Θ(√n lg n). 2T(n/4) + n ⇒ Θ(n). 2T(n/4) + n² ⇒ Θ(n²).
  - The largest a for which aT(n/4) + Θ(n²) is asymptotically faster than Strassen's Θ(n^(lg 7)) is **a = 48**.
  - Binary search T(n/2) + Θ(1) ⇒ Θ(lg n).
  - 4T(n/2) + n² lg n: the (3rd-edition) master method does not apply. The answer is Θ(n² lg² n).
  - Regularity counterexample: a = 1, b = 2, f(n) = n(2 − cos n), which needs c ≥ 3/2.
- **Akra–Bazzi** — [Wikipedia: Akra–Bazzi method](https://en.wikipedia.org/wiki/Akra%E2%80%93Bazzi_method):
  - Form: T(x) = g(x) + Σᵢ aᵢ·T(bᵢx + hᵢ(x)) for x ≥ x₀.
  - Conditions: aᵢ > 0; 0 < bᵢ < 1; |g′(x)| ∈ O(x^c); |hᵢ(x)| ∈ O(x/(log x)²).
  - Find p with Σ aᵢbᵢ^p = 1. Then T(x) ∈ Θ(x^p(1 + ∫₁ˣ g(u)/u^(p+1) du)).
  - Example: n² + (7/4)T(⌊n/2⌋) + T(⌈3n/4⌉) gives p = 2 and Θ(x² log x).
  - Mohamad Akra and Louay Bazzi, 1998.
- **Erickson's Akra–Bazzi examples:**
  - T(3n/4) + T(n/4) + n: ρ = 1, so Θ(n log n).
  - T(n/5) + T(7n/10) + n: 0 < ρ < 1 (ρ ≈ 0.83978), so Θ(n).
  - ¼T(n/4) + ¾T(3n/4) + 1: ρ = 0, so Θ(log n).
  - T(n/2) + T(n/4) + 1: ρ = lg φ ≈ 0.69424, so Θ(n^(lg φ)).
  - "There are a few nasty exceptions like T(n) = √n T(√n) + n where we have to fall back on recursion trees."
  - Source: [Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)

### Inferences
#### 5.1 The CLRS statement to memorise (CLRS 3rd ed., §4.5, Theorem 4.1; see the provenance caveat in Gaps)
> Let **a ≥ 1** and **b > 1** be constants, let f(n) be a function, and let T(n) be defined on the nonnegative integers by the recurrence **T(n) = aT(n/b) + f(n)**, where we interpret n/b to mean either ⌊n/b⌋ or ⌈n/b⌉. Then T(n) has the following asymptotic bounds:
> 1. If f(n) = O(n^(log_b a − ε)) for some constant ε > 0, then T(n) = Θ(n^(log_b a)).
> 2. If f(n) = Θ(n^(log_b a)), then T(n) = Θ(n^(log_b a) lg n).
> 3. If f(n) = Ω(n^(log_b a + ε)) for some constant ε > 0, **and if a·f(n/b) ≤ c·f(n) for some constant c < 1 and all sufficiently large n** (the *regularity condition*), then T(n) = Θ(f(n)).

- **Extended case 2**, used by MIT 6.006, the UWO handout and Wikipedia: if f(n) = Θ(n^(log_b a)·lg^k n) with k ≥ 0, then T(n) = Θ(n^(log_b a)·lg^(k+1) n). If your course only allows the 3-case version, say so, then solve the case with a recursion tree.
- **Why regularity matters:** it guarantees the level sums decrease geometrically from the root.
- **Shortcut:** for f(n) = n^k·lg^p n with k > log_b a, a·f(n/b)/f(n) → a/b^k < 1, so regularity holds automatically for large n. Verified with sympy: 3(n/4)lg(n/4) / (n lg n) → 3/4, and 6(n/3)²lg(n/3) / (n² lg n) → 2/3. Still *write the check* on the exam.

#### 5.2 Exam template for applying it
1. Read off a, b, f(n). Check that a ≥ 1 and b > 1 are constants, that f(n) ≥ 0, and that the recurrence has the form a·T(n/b) with equal sizes.
2. Compute W(n) = n^(log_b a). Useful values: log₂3 ≈ 1.585, log₂7 ≈ 2.807, log₄3 ≈ 0.792, log₃6 ≈ 1.631, log₃7 ≈ 1.771.
3. Compare f with W:
   - If f ≤ W/n^ε for some ε > 0, it is case 1.
   - If f = Θ(W·lg^k n), it is case 2 (k = 0 in strict CLRS 3e).
   - If f ≥ W·n^ε, it is case 3. **Verify regularity**, writing down c.
4. Write the Θ answer. Optionally sanity-check with the level-sum ratio a·f(n/b)/f(n).

#### 5.3 Simplified ("advanced") form for T(n) = aT(n/b) + Θ(n^k log^p n), corrected
With a ≥ 1, b > 1, k ≥ 0 and p real:

| Condition | Sub-case | T(n) |
|---|---|---|
| a > b^k (k < log_b a) | any p | Θ(n^(log_b a)) |
| a = b^k (k = log_b a) | p > −1 | Θ(n^k·log^(p+1) n) |
| a = b^k | p = −1 | Θ(n^k·log log n) |
| a = b^k | p < −1 | Θ(n^k) |
| a < b^k (k > log_b a) | **any real p** | **Θ(n^k·log^p n)** = Θ(f(n)) |

**Correction to the GfG page.** For a < b^k and p < 0 the tight answer is Θ(n^k log^p n), not Θ(n^k).

Take T(n) = T(n/2) + n/lg n, where a = 1, b = 2, k = 1, p = −1.
- CLRS case 3 applies. First, n/lg n = Ω(n^0.5). Second, regularity holds: (n/2)/lg(n/2) ≤ (3/4)·n/lg n for n ≥ 8 (verified). So T(n) = Θ(n/lg n).
- Numerically, T(n)/(n/lg n) → 2 (2.045 at n = 2⁴⁸), while T(n)/n → 0 (0.043 at n = 2⁴⁸).
- "O(n^k)" is a true but loose bound. "Θ(n^k)" is false.

#### 5.4 Worked Master-Theorem examples (each checked numerically: T(b^k)/answer → a positive constant)
Four of them in full:
- **9T(n/3) + n:** a = 9, b = 3, W = n^(log₃9) = n². f = n = O(n^(2−1)) with ε = 1, so **case 1: Θ(n²)**. Numerically T/n² = 1.5.
- **T(2n/3) + 1:** a = 1, b = 3/2, W = n^(log_{3/2} 1) = n⁰ = 1. f = Θ(1) = Θ(W), so **case 2: Θ(lg n)**.
- **3T(n/4) + n lg n:** W = n^(log₄3) ≈ n^0.793. f = n lg n ≥ n = Ω(n^(0.793+0.2)). Regularity: 3·(n/4)·lg(n/4) = (3/4)n(lg n − 2) ≤ (3/4)·n lg n, so c = 3/4. **Case 3: Θ(n lg n).** Numerically the ratio climbs toward 1/(1 − 3/4) = 4.
- **2T(n/4) + n^0.51:** W = n^0.5. f = Ω(n^(0.5+0.01)). Regularity: 2(n/4)^0.51 = 2·4^(−0.51)·n^0.51 = 2^(−0.02)·n^0.51 ≈ 0.986·n^0.51, so c ≈ 0.986 < 1. **Case 3: Θ(n^0.51).** When c is this close to 1 the hidden constant 1/(1 − c) ≈ 72.6 is large, and numerical ratios converge slowly (22.7 at n = 4²⁶).

| # | Recurrence | a, b, W = n^(log_b a) | f vs W | Case | Answer | Source of answer |
|---|---|---|---|---|---|---|
| 1 | 9T(n/3) + n | 9, 3, n² | smaller by n¹ | 1 | Θ(n²) | derived |
| 2 | T(2n/3) + 1 | 1, 3/2, 1 | equal | 2 | Θ(lg n) | MIT R03 |
| 3 | 3T(n/4) + n lg n | 3, 4, n^0.793 | larger; reg. c = 3/4 | 3 | Θ(n lg n) | UWO #15 |
| 4 | 2T(n/2) + n | 2, 2, n | equal | 2 | Θ(n lg n) | Wikipedia |
| 5 | 8T(n/2) + 1000n² | 8, 2, n³ | smaller by n¹ | 1 | Θ(n³) | Wikipedia |
| 6 | 7T(n/2) + Θ(n²) (Strassen) | 7, 2, n^2.807 | smaller | 1 | Θ(n^(lg 7)) | DPV |
| 7 | 3T(n/2) + n (Karatsuba) | 3, 2, n^1.585 | smaller | 1 | Θ(n^(lg 3)) | UWO #12, Erickson |
| 8 | 2T(n/2) + n² | 2, 2, n | larger; reg. c = 1/2 | 3 | Θ(n²) | Wikipedia |
| 9 | 4T(n/2) + n² | 4, 2, n² | equal | 2 | Θ(n² lg n) | UWO #2 |
| 10 | 3T(n/2) + n² | 3, 2, n^1.585 | larger; reg. c = 3/4 | 3 | Θ(n²) | UWO #1 |
| 11 | 16T(n/4) + n | 16, 4, n² | smaller | 1 | Θ(n²) | UWO #5 |
| 12 | 2T(n/4) + √n | 2, 4, n^0.5 | equal | 2 | Θ(√n lg n) | walkccc 4.5-1 |
| 13 | 2T(n/4) + 1 | 2, 4, n^0.5 | smaller | 1 | Θ(√n) | walkccc 4.5-1 |
| 14 | 2T(n/4) + n^0.51 | 2, 4, n^0.5 | larger; reg. c ≈ 0.986 | 3 | Θ(n^0.51) | UWO #8 |
| 15 | √2·T(n/2) + lg n | √2, 2, n^0.5 | lg n = O(n^(0.5−ε)) | 1 | Θ(√n) | UWO #11 |
| 16 | 3T(n/3) + √n | 3, 3, n | smaller | 1 | Θ(n) | UWO #13 |
| 17 | 6T(n/3) + n² lg n | 6, 3, n^1.631 | larger; reg. c = 2/3 | 3 | Θ(n² lg n) | UWO #17 |
| 18 | 4T(n/2) + n/lg n | 4, 2, n² | smaller (n/lg n ≤ n) | 1 | Θ(n²) | UWO #18 |
| 19 | T(n/2) + 2ⁿ | 1, 2, 1 | larger; reg. 2^(n/2) ≤ ½·2ⁿ | 3 | Θ(2ⁿ) | UWO #3 |
| 20 | 7T(n/3) + n² | 7, 3, n^1.771 | larger; reg. c = 7/9 | 3 | Θ(n²) | UWO #20 |
| 21 | 4T(n/2) + lg n | 4, 2, n² | smaller | 1 | Θ(n²) | UWO #21 |
| 22 | 3T(n/3) + n/2 | 3, 3, n | equal | 2 | Θ(n lg n) | UWO #16 |
| 23 | 16T(n/4) + n! | 16, 4, n² | larger | 3 | Θ(n!) | UWO #10 |
| 24 | 2T(n/2) + n lg n | 2, 2, n | W·lg¹ n | ext. 2 (k = 1) | Θ(n lg² n) | UWO #6, R03 ex. 8 |
| 25 | 4T(n/2) + n² lg n | 4, 2, n² | W·lg¹ n | ext. 2 (k = 1) | Θ(n² lg² n) | walkccc 4.5-4 |
| 26 | 2T(n/2) + n/lg n | 2, 2, n | W·lg⁻¹ n | ext. 2b only | Θ(n lg lg n) | Wikipedia 2b, Erickson |
| 27 | 2T(n/2) + n/lg² n | 2, 2, n | W·lg⁻² n | ext. 2c | Θ(n) | Wikipedia 2c (numeric ratio → ≈2.62) |

Verification notes:
- For #9, #12, #22, #24 and #25 the ratio T/answer converges slowly toward a constant (at the largest n tested, between 2⁴⁸ and 3⁴⁸, the ratios were 1.02, 0.52, 0.33, 0.51 and 0.51). That is expected, because of the lower-order "+n" terms.
- For #26 the exact solution is n(1 + H_{lg n}).

**Bonus (walkccc 4.5-2):** aT(n/4) + n² beats Strassen iff log₄ a < lg 7, i.e. a < 4^(lg 7) = 49. So the largest such integer a is 48 (verified 4^(lg 7) = 49.000).

#### 5.5 When the Master Theorem does NOT apply: 11 cases and what to do instead
1. **T(n) = 2T(n/2) + n/lg n.**
   - Why it fails: f/W = 1/lg n → 0, but not polynomially (f is not O(n^(1−ε))). This falls in the gap between cases 1 and 2 of the 3-case version (UWO #7, Wikipedia).
   - Instead: a recursion tree gives level sums n/(lg n − i), so the total is n·H_{lg n} = **Θ(n lg lg n)**. Extended case 2b agrees.
2. **T(n) = T(n−1) + n.**
   - Why it fails: the size shrinks by *subtraction*, so it is not of the form aT(n/b).
   - Instead: unroll to n(n+1)/2 = **Θ(n²)**.
3. **T(n) = 2ⁿT(n/2) + nⁿ.** a is not constant (UWO #4, Wikipedia).
4. **T(n) = 0.5T(n/2) + 1/n.** a < 1, i.e. "less than one subproblem" (UWO #9).
5. **T(n) = 64T(n/8) − n² lg n.** f is negative (UWO #19, Wikipedia).
6. **T(n) = T(n/2) + n(2 − cos n).**
   - Why it fails: f is polynomially larger than W = 1, but regularity fails. Near n = 2π·(odd) we get (n/2)(2 − cos(n/2)) / (n(2 − cos n)) ≈ 3/2 > 1 (UWO #22, walkccc 4.5-5). Numerically the ratio reaches 1.5000 at n = 1,667,438.
   - Instead: n ≤ f(n) ≤ 3n, so sandwich T between T(n/2) + n and T(n/2) + 3n. That gives **T(n) = Θ(n)** (numerically T/n stays in [2.13, 5.37]).
   - Lesson: "the theorem doesn't apply" ≠ "the answer is unknown".
7. **T(n) = T(n/3) + T(2n/3) + n.**
   - Why it fails: the subproblems have unequal sizes.
   - Instead: a recursion tree, or Akra–Bazzi with p = 1, gives **Θ(n lg n)**.
8. **T(n) = 2T(√n) + lg n.**
   - Why it fails: the size is √n, not n/b.
   - Instead: change variables (m = lg n) to get **Θ(lg n·lg lg n)**.
9. **T(n) = T(n−1) + T(n−2) + 1.**
   - Why it fails: it is subtractive, with two different sizes.
   - Instead: **Θ(φⁿ)** (Fibonacci).
10. **T(n) = 2T(n/2) + n lg n** under the strict CLRS 3rd-ed. 3-case statement.
    - Why it fails: n lg n is larger than W = n, but not polynomially, so no case fits (cf. walkccc 4.5-4 for the analogous 4T(n/2) + n² lg n).
    - Instead: extended case 2 or a recursion tree gives **Θ(n lg² n)**.
11. **T(n) = √n·T(√n) + n.** Here a is not constant and the size is not n/b. It is even a "nasty exception" for Akra–Bazzi (Erickson). A recursion tree gives **Θ(n lg lg n)**.

#### 5.6 Bonus tool: "decreasing" (subtract-and-conquer) recurrences (derived; verified numerically)
Take T(n) = aT(n − b) + f(n) with constants a > 0, b ≥ 1, f(n) = Θ(n^k) for k ≥ 0, and a positive Θ(1) base.

| a | Answer | Why | Numeric check |
|---|---|---|---|
| a < 1 | Θ(n^k) | geometric decrease from the root | (1/2)T(n−1) + n: T/n → 2 |
| a = 1 | Θ(n^(k+1)) | about n/b terms of size ≈ n^k | T(n−1) + n²: T/n³ → 1/3 |
| a > 1 | **Θ(a^(n/b))** | the leaves dominate | see below |

For a > 1:
- T(n) = Σᵢ aⁱ f(n − ib) = a^(n/b)·Σⱼ a^(−j)·f(jb), and that last sum converges.
- Checks: 2T(n−1) + n = 2^(n+1) − n − 2 = Θ(2ⁿ). 3T(n−1) + n² gives T/3ⁿ → 2.5. 2T(n−2) + 1 = Θ(2^(n/2)).
- The often-quoted bound "O(n^k·a^(n/b))" is a valid upper bound but **not tight**. For 2T(n−1) + n, T/(n·2ⁿ) → 0.

#### 5.7 Akra–Bazzi in one minute (brief; enough to recognise it)
**Recipe:**
1. Solve Σ aᵢ·bᵢ^p = 1 for p.
2. Then T(n) = Θ(n^p·(1 + ∫₁ⁿ g(u)/u^(p+1) du)).

**Examples** (p values verified numerically with mpmath):
- T(n/3) + T(2n/3) + n: (1/3)^p + (2/3)^p = 1 gives p = 1. The integral ∫ u/u² du = ln n, so **Θ(n log n)**.
- T(n/5) + T(7n/10) + n: p ≈ 0.83978 < 1. The integral ∫ u^(−p) du = Θ(n^(1−p)), so **Θ(n)**.
- (7/4)T(⌊n/2⌋) + T(⌈3n/4⌉) + n²: p = 2, so **Θ(n² log n)**.
- T(n/2) + T(n/4) + 1: p = lg φ ≈ 0.69424, so **Θ(n^0.694)**.

Floors, ceilings and small additive perturbations hᵢ(x) = O(x/log² x) don't change the answer.

### Gaps
- **Provenance of the verbatim theorem text in 5.1.** I could not fetch a legitimate free copy of CLRS. The wording is the commonly reproduced text of CLRS 3rd ed. Theorem 4.1, reconstructed from memory. Its structure (a ≥ 1, b > 1, ε-polynomial gaps, regularity with c < 1 "for all sufficiently large n") matches the fetched Wikipedia, MIT 6.006 R03 and UWO statements. walkccc 4.5-4 confirms the 3rd edition's case 2 has no lg^k extension. **Check the exact wording against your own copy or the course slides.**
- **CLRS 4th edition (2022) differences could not be verified** (the MIT Press page returned HTTP 403). As far as I know, the 4th edition:
  - folds the lg^k n (k ≥ 0) extension into case 2,
  - uses the terms "driving function" and "watershed function",
  - relaxes a ≥ 1 to a > 0,
  - adds a section on Akra–Bazzi recurrences.

  Treat all of this as unconfirmed.
- I don't know which variant the course's "Master's Theorem" slides use: the CLRS 3-case version, the extended version, or the a vs b^k "advanced" table. Check before the exam, because the "does it apply?" answers for n lg n and n/lg n depend on it.
- The decreasing-recurrence rule (5.6) is my own derivation, checked numerically. No fetched source states it.

---

## 6. 20 practice problems with full solutions (mixed: solve the recurrence / is f = O(g)? / running time of code / rank the functions)

### Takeaway
The set has 20 exam-style problems:
- 9 recurrences, including one with two substitution proofs
- 5 "is f = O(g)?" questions
- 4 code analyses
- 2 ranking problems

Every answer was verified by script (exact closed forms, simulation, sympy limits or log-scale comparisons). Try each one before reading its solution. For more drill with official answer keys, use the UWO handout (22 Master-Theorem problems), MIT 6.006 R01 (7 asymptotics exercises) and R03 (9 recurrence exercises), all cited below.

### Cited Findings
- **Practice sets with answer keys:**
  - UWO handout: 22 Master-Theorem problems, each with its answer and case. — [UWO handout](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf)
  - MIT 6.006 R01: 7 asymptotics exercises with written solutions. — [MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)
  - MIT 6.006 R03: 9 recurrence exercises with solutions. — [MIT 6.006 R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf)
  - MIT 6.006 Spring 2020 publishes assignments and exams with solutions. — [MIT OCW 6.006](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)
  - MIT 6.046J Spring 2015 publishes problem sets, problem-set solutions, exams and exam solutions. — [MIT OCW 6.046J](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/)
- **Problems below that also appear in a sourced answer key:**
  - P2, P3 and P8: the same recurrences are treated in Wikipedia, walkccc 4.5-4 and the UWO handout.
  - P6 and P8: Erickson.
  - P11(c), P12 and P13: MIT R01.
  - Each solution below names its source where there is one.

### Inferences
*(All solutions derived here; each carries a "(verified)" note on how it was checked.)*

**P1. Solve T(n) = 3T(n/2) + n, T(1) = 1.**
- a = 3, b = 2, W = n^(lg 3) ≈ n^1.585. f = n = O(n^(lg 3 − 0.5)), so Master **case 1: T(n) = Θ(n^(lg 3))**.
- Exact for n = 2^k by unrolling: T(n) = Σ_{i<k} 3^i(n/2^i) + 3^k = 2n((3/2)^k − 1) + n^(lg 3) = **3n^(lg 3) − 2n**. Verified exactly for k ≤ 24.
- The recursion-tree level sums are n·(3/2)^i, an increasing series, so the leaves dominate. Source for the answer: UWO #12, Erickson (Karatsuba).

**P2. Solve T(n) = 2T(n/2) + n², T(1) = 1.**
- W = n. f = n² = Ω(n^(1+1)). Regularity: 2(n/2)² = n²/2 ≤ ½·n², so c = ½ < 1. **Case 3: Θ(n²).**
- Exact: **2n² − n**. The level sums are n², n²/2, n²/4, …, so the root dominates (Wikipedia example; verified).

**P3. Solve T(n) = 4T(n/2) + n² lg n.**
- W = n², and f = W·lg¹ n. Extended **case 2 (k = 1): Θ(n² lg² n)**.
- Under the strict CLRS 3rd-ed. statement no case applies: f exceeds W only by lg n, which is not polynomial (walkccc 4.5-4).
- Recursion tree: level i sums to n²(lg n − i), so the total is n²·Σ_{j=1}^{lg n} j ≈ ½·n² lg² n. Exact with T(1) = 1: n²(1 + lg n(lg n+1)/2) (verified).

**P4. Solve T(n) = T(n−2) + n², T(0) = 0, T(1) = 1.**
- The size shrinks by subtraction, so the Master Theorem does not apply. Unroll: T(n) = n² + (n−2)² + (n−4)² + ….
- Upper bound: about n/2 terms, each ≤ n², gives O(n³).
- Lower bound: the first n/4 terms are each ≥ (n/2)², so T ≥ n³/16.
- Hence **Θ(n³)**. The exact solution is n(n+1)(n+2)/6 for both parities (verified for n < 500).

**P5. Solve T(n) = 2T(√n) + 1, T(2) = 1.**
- Let m = lg n and S(m) = T(2^m). Then S(m) = 2S(m/2) + 1. W = m and f = 1 is polynomially smaller, so S(m) = Θ(m).
- Therefore **T(n) = Θ(lg n)**. Exact for n = 2^(2^k): 2 lg n − 1 (verified).

**P6. Solve T(n) = T(n/4) + T(3n/4) + n.**
- The sizes are unequal, so use a recursion tree. Every complete level sums to n, and the leaves lie between depth log₄ n and log_{4/3} n.
- So n·log₄ n ≲ T(n) ≲ n·log_{4/3} n, i.e. **Θ(n lg n)**.
- Akra–Bazzi agrees: (1/4)^p + (3/4)^p = 1 gives p = 1, and ∫ 1/u = ln n.
- Erickson treats this exact recurrence. Simulation: T/(n lg n) = 1.14 at n = 10⁶ and bounded (verified).

**P7. Solve T(n) = 2T(n−1) + n, T(0) = 0.**
- Unroll: T(n) = Σ_{i=0}^{n−1} 2^i·(n−i). Substituting j = n − i gives 2ⁿ·Σ_{j=1}^{n} j/2^j = 2ⁿ·(2 − (n+2)/2ⁿ) = **2^(n+1) − n − 2 = Θ(2ⁿ)**.
- Induction check: 2(2ⁿ − (n−1) − 2) + n = 2^(n+1) − n − 2. Verified for n < 60.
- **Trap:** the answer is not Θ(n·2ⁿ). T/(n2ⁿ) → 0.

**P8. Solve T(n) = 2T(n/2) + n/lg n.**
- The 3-case Master Theorem does not apply: this is a non-polynomial gap (UWO #7, Wikipedia).
- Recursion tree: level i sums to 2^i·(n/2^i)/lg(n/2^i) = n/(lg n − i) for i = 0 … lg n − 1. So T(n) = n·Σ_{j=1}^{lg n} 1/j = n·H_{lg n} = **Θ(n lg lg n)** (Erickson).
- Exact with T(1) = 1: n(1 + H_{lg n}) (verified).

**P9. Substitution proofs.**

(a) Show that T(n) = 4T(n/2) + n (T(1) = 1, n a power of 2) is O(n²), including why the naive guess fails.
- The naive guess T ≤ cn² gives 4c(n/2)² + n = cn² + n, which does not close.
- Strengthen to T ≤ cn² − dn: 4[c(n/2)² − d(n/2)] + n = cn² − 2dn + n = cn² − dn − (d−1)n ≤ cn² − dn when **d ≥ 1**.
- Base: T(1) = 1 ≤ c − d, so **c = 2, d = 1**. Then T(n) ≤ 2n² − n, and in fact equality holds (verified).

(b) Show that T(n) = T(⌈n/2⌉) + 1, T(1) = 1, is O(lg n).
- Claim: T(n) ≤ 3 lg n for n ≥ 2.
- Base: T(2) = 2 ≤ 3.
- Step for n ≥ 3, where 2 ≤ ⌈n/2⌉ < n: T(n) ≤ 3 lg⌈n/2⌉ + 1 ≤ 3 lg((n+1)/2) + 1 = 3 lg(n+1) − 2. This is ≤ 3 lg n iff lg(1 + 1/n) ≤ 2/3, which holds for all n ≥ 2.
- Hence O(lg n). The exact solution is ⌈lg n⌉ + 1 (verified for n < 65,536).
- In general the step needs c·lg(3/2) ≤ c − 1, i.e. c ≥ 2.41, which is why c = 3 was chosen.

**P10. Is n^1.001 = O(n lg n)?**
- **No.** Suppose n^1.001 ≤ c·n lg n for n ≥ n₀. Then n^0.001 ≤ c·lg n.
- But lg n / n^0.001 → 0 (by L'Hôpital, the derivative ratio is (1/(n ln 2)) / (0.001·n^(−0.999)) = 1000/(ln 2 · n^0.001) → 0). So n^0.001/lg n → ∞, a contradiction.
- In fact n lg n = o(n^1.001).
- **Trap:** the curves cross only near n ≈ 2^13747 ≈ 10^4138 (computed), so small-n tables mislead.

**P11. (a) Is 2^(n+1) = O(2ⁿ)? (b) Is 2^(2n) = O(2ⁿ)? (c) Is 2^(2^(n+1)) = O(2^(2ⁿ))?**
- (a) **Yes**, with c = 2 and n₀ = 1.
- (b) **No.** 2^(2n)/2ⁿ = 2ⁿ is unbounded.
- (c) **No.** 2^(2^(n+1)) = (2^(2ⁿ))², so the ratio 2^(2ⁿ) is unbounded (MIT R01 ex. 4).

**P12. Is (lg n)^(lg n) = O(n^10)?**
- **No.** (lg n)^(lg n) = 2^(lg n · lg lg n) = n^(lg lg n).
- For n > 2^1024 we have lg lg n > 10, so the ratio n^(lg lg n − 10) → ∞. The function is superpolynomial.
- It is still subexponential: lg n·lg lg n = o(n), so it is o(2ⁿ).
- Compare MIT R01 ex. 6: (log n)^(log n) = Ω(n).

**P13. Prove lg(n!) = Θ(n lg n) with explicit constants.**
- Upper bound: n! ≤ nⁿ, so lg n! ≤ n lg n. Take **c₂ = 1, n₀ = 1**.
- Lower bound: n! has at least ⌈n/2⌉ factors that are each ≥ n/2, so n! ≥ (n/2)^(n/2). Then lg n! ≥ (n/2)(lg n − 1) ≥ (n/4)·lg n whenever lg n ≥ 2. Take **c₁ = 1/4, n₀ = 4**.
- Verified for 4 ≤ n < 2·10⁵. MIT R01 gets the same result via Stirling.

**P14. True or false? Prove or give a counterexample.**
- (a) **f = O(g) ⇒ 2^f = O(2^g): False.** Take f = 2n and g = n: 4ⁿ is not O(2ⁿ).
- (b) **f = O(g) ⇒ g = Ω(f): True.** f ≤ c·g implies g ≥ (1/c)·f.
- (c) **max(f, g) = Θ(f + g) for f, g ≥ 0: True.** ½(f+g) ≤ max(f, g) ≤ f + g.
- (d) **f(n) = Θ(f(n/2)): False in general.** For f = 2ⁿ the ratio is 2^(n/2) → ∞. It is true for f = n^k (ratio 2^k).

**P15. Running time?**
```
for (i = 1; i <= n; i++)
    for (j = 1; j <= n; j += i)
        x++;
```
- The inner loop runs ⌊(n−1)/i⌋ + 1 ≈ n/i times. The total is ≈ Σ n/i = n·H_n, which is **Θ(n log n)**.
- Simulation: count/(n ln n) = 1.08 at n = 10⁶, with the ratio drifting toward 1.

**P16. Running time?**
```
for (i = n; i >= 1; i = i / 2)      // integer division
    for (j = 1; j <= i; j++)
        x++;
```
- The count is n + ⌊n/2⌋ + ⌊n/4⌋ + … = 2n − popcount(n) < 2n, which is **Θ(n)**.
- It is not Θ(n log n). The outer loop runs about lg n times, but the inner work halves each time. Verified exactly.

**P17. Running time of each fragment?**
```
(a)  i = 2;  while (i <= n)  i = i * i;
(b)  for (i = 1; i <= n; i++)
         for (j = 1; j * j <= i; j++)  x++;
```
- (a) After t iterations i = 2^(2^t) ≤ n ⇔ t ≤ lg lg n. That is ⌊lg lg n⌋ + 1 iterations, so **Θ(log log n)**.
- (b) The inner loop runs ⌊√i⌋ times. Σ ⌊√i⌋ ≈ ∫₀ⁿ √x dx = (2/3)n^(3/2), so **Θ(n^(3/2))**. Simulation ratio: 0.9993 at n = 10⁶.

**P18. Write the recurrence for each function, then solve it.**
```
int A(int n) {                    int B(int n) {
    if (n <= 1) return 1;             if (n <= 1) return 1;
    int s = 0;                        int s = 0;
    for (i = 0; i < n; i++) s += i;   for (i = 0; i < n; i++) s += i;
    return A(n/2) + A(n/2) + s;       return 2 * B(n/2) + s;
}                                 }

void C(int n) {
    if (n <= 1) return;
    for (i = 0; i < n*n; i++) work();     // Θ(1) work
    C(n/3); C(n/3); C(n/3);
}
```
- **A:** two calls of size n/2 plus Θ(n) work. T(n) = 2T(n/2) + Θ(n) = **Θ(n log n)** (case 2).
- **B:** **one** call, because `2 *` is arithmetic and not a second call. T(n) = T(n/2) + Θ(n) = **Θ(n)** (case 3; regularity n/2 ≤ ½n).
- **C:** T(n) = 3T(n/3) + Θ(n²). W = n. Case 3 with regularity 3(n/3)² = n²/3, so c = 1/3, giving **Θ(n²)**.
- Lesson: count the recursive *calls* and their *sizes*, not the arithmetic.

**P19. Rank from slowest to fastest growth, marking ties: n lg n, 2^(n/2), n^100, lg(n⁵), 4^(lg n), (1.01)ⁿ, n^(3/2), 10^100, √(2ⁿ), lg² n, n^(lg 3), n!, 2^(lg n).**
- **Answer:** 10^100 ≺ lg(n⁵) (= 5 lg n) ≺ lg² n ≺ 2^(lg n) (= n) ≺ n lg n ≺ n^(3/2) ≺ n^(lg 3) (≈ n^1.585) ≺ 4^(lg n) (= n²) ≺ n^100 ≺ (1.01)ⁿ ≺ 2^(n/2) ≡ √(2ⁿ) ≺ n!.
- Notes:
  - n^100 versus 1.01ⁿ only crosses at n ≈ 117,308 (computed), so a small table would put n^100 on top. Asymptotically every exponential with base > 1 wins.
  - 2^(n/2) = (√2)ⁿ ≈ 1.414ⁿ ≫ 1.01ⁿ.
  - lg(n⁵) = 5 lg n is Θ(lg n), not Θ(lg⁵ n).
- Verified with log-scale comparisons and sympy limits.

**P20. Group into Θ-classes and rank: lg(n!), n lg n, ln(nⁿ), (lg n)^(lg n), n^(lg lg n), n^(lg n), 2^(lg² n), 2^(√n), 2ⁿ, 2^(n+1), 4ⁿ, n!, 2^(2ⁿ).**
- **Answer:** {lg(n!), n lg n, ln(nⁿ) = n ln n} ≺ {(lg n)^(lg n), n^(lg lg n)} ≺ {n^(lg n), 2^(lg² n)} ≺ 2^(√n) ≺ {2ⁿ, 2^(n+1)} ≺ 4ⁿ ≺ n! ≺ 2^(2ⁿ).
- Reasons:
  - n^(lg n) = 2^(lg n · lg n) = 2^(lg² n).
  - lg² n = o(√n), so n^(lg n) ≺ 2^(√n).
  - 4ⁿ = 2^(2n) is *not* Θ(2ⁿ).
  - n!/4ⁿ → ∞, by Stirling: n! ≈ √(2πn)(n/e)ⁿ, and n/(4e) > 1 eventually.
  - n! ≤ nⁿ = 2^(n lg n) ≪ 2^(2ⁿ).
- Verified with sympy limits (4ⁿ/n! → 0, n^(lg n)/2^(√n) → 0) and log-scale numerics.

### Gaps
- No past Inha SOC3030 papers were available, so the exact question style at this course is unknown. These problems follow the four types requested (solve a recurrence, is f = O(g)?, running time of code, rank functions) and mirror typical US university exam items.
- Several problems (P4, P7, P9b, P15–P18) are my own compositions, so they have no external answer key. Their answers were verified by script instead.

---

## 7. Common traps, exam strategy, a one-page formula sheet, and the best free resources

### Takeaway
Most lost marks come from five places:
1. Treating O as "tight", or reading "=" as true equality.
2. Letting the induction constant drift (cn + n "= O(n)").
3. Forgetting base cases or n₀.
4. Applying the Master Theorem where it doesn't fit (subtraction, unequal splits, non-polynomial gaps, missing regularity check).
5. Miscounting loops or calls: geometric inner loops, "2·f(n/2)" versus "f(n/2) + f(n/2)".

The best free study path is:
1. MIT 6.006 R01 and R03 (definitions plus exercises with solutions).
2. The UWO 22-problem Master Theorem drill.
3. Jeff Erickson's "Solving Recurrences" notes (recursion trees).
4. Community CLRS solutions (walkccc) for extra practice.
5. MIT 6.006/6.046 exams with solutions for timed practice.

### Cited Findings
- **Sourced traps:**
  - **"=" means "∈".** Saying a function "is O(f(n)) or equal to O(f(n))" really means set containment, g(n) ∈ O(f(n)). — [MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf); also [Wikipedia: Big O notation](https://en.wikipedia.org/wiki/Big_O_notation)
  - **Check all conditions.** "you should state which case applies, and show that your recurrence relation satisfies all conditions required by the relevant case." — [MIT 6.006 R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf)
  - **Non-polynomial gaps and regularity failure** are listed as cases where the theorem is inadmissible: 2T(n/2) + n/log n, and T(n/2) + n(2 − cos n). — [Wikipedia: Master theorem](https://en.wikipedia.org/wiki/Master_theorem_%28analysis_of_algorithms%29); [UWO handout](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf)
  - **Base cases for Ω-bounds:** "asymptotic Ω( ) bounds only have to work for sufficiently large n". In the Fibonacci lower bound, the base case F₀ = 0 forces the trivial constant β = 0, so Erickson starts the induction from F₂ instead. — [Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)
  - **Tightness heuristic:** when an upper-bound induction "worked for any constant a, no matter how small", that "strongly suggests that our upper bound ... is not tight". When the proof *requires* a constraint on the constant, that is "a good indication that we've found the right answer". — [Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)
  - **Keeping Θ's inside a recurrence while solving it** invites mistakes: "if we kept the asymptotic expressions, we might be tempted to simplify them inappropriately". — [Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)
  - **The number of recursive calls is the branching factor:** "small changes in this coefficient can have a big impact on running time." — [DPV ch. 2](https://people.eecs.berkeley.edu/~vazirani/algorithms/chap2.pdf)
- **Best free resources (all checked to exist and to be free or openly licensed):**
  - **MIT OCW 6.006 Introduction to Algorithms (Spring 2020).** Erik Demaine, Jason Ku, Justin Solomon. Lecture videos and notes, recitation notes, problem sets with solutions, quizzes/exams with solutions; Creative Commons BY-NC-SA. Topic-relevant pieces:
    - [Recitation 1: asymptotic notation, definitions and 7 exercises with solutions](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_r01/)
    - [Recitation 3: merge sort, recurrences, Master Theorem and 9 exercises](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_r03/)
    - [Lecture notes list](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/), including "Lecture 1: Introduction" and "Lecture 3: Sorting"
    - Course page: [MIT OCW 6.006](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)
  - **MIT OCW 6.046J Design and Analysis of Algorithms (Spring 2015).** Erik Demaine, Srini Devadas, Nancy Lynch. Lecture notes and videos, recitation notes and videos, problem sets with solutions, exams with solutions; CC BY-NC-SA. — [MIT OCW 6.046J](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/)
  - **Jeff Erickson, *Algorithms*** (1st edition, June 2019). Free full PDF under CC BY 4.0; Chapter 1 is "Recursion". The separate 22-page **"Appendix II: Solving Recurrences"** notes (CC BY-NC-SA 4.0) cover guess-and-confirm, recursion trees, Akra–Bazzi, annihilators and transformations, with exercises. Erickson's homework/exam archive is public but "solutions not provided per author request". — [Book page](https://jeffe.cs.illinois.edu/teaching/algorithms/); [Recurrences notes (PDF)](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf); [HW/exam archive](http://jeffe.cs.illinois.edu/teaching/algorithms/hwex.html)
  - **Dasgupta, Papadimitriou & Vazirani, *Algorithms*, chapter 2 (Divide-and-conquer).** An author-hosted draft with the simplified Master Theorem and its geometric-series proof. — [DPV ch. 2 (PDF)](https://people.eecs.berkeley.edu/~vazirani/algorithms/chap2.pdf)
  - **"Master Theorem: Practice Problems and Solutions"** (22 problems with answers). — [UWO handout](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf)
  - **walkccc CLRS solutions** (unofficial, community-written, CLRS 3rd ed.): [3-3 ranking](https://walkccc.me/CLRS/Chap03/Problems/3-3/), [4.3 substitution](https://walkccc.me/CLRS/Chap04/4.3/), [4.4 recursion trees](https://walkccc.me/CLRS/Chap04/4.4/), [4.5 master method](https://walkccc.me/CLRS/Chap04/4.5/).
  - **Quick-reference pages:** [Wikipedia: Master theorem](https://en.wikipedia.org/wiki/Master_theorem_%28analysis_of_algorithms%29), [Wikipedia: Akra–Bazzi](https://en.wikipedia.org/wiki/Akra%E2%80%93Bazzi_method), [Wikipedia: Big O notation](https://en.wikipedia.org/wiki/Big_O_notation). [GfG advanced master theorem](https://www.geeksforgeeks.org/advanced-master-theorem-for-divide-and-conquer-recurrences/) is usable, but its case 3b (p < 0) is wrong; see §5.3.

### Inferences
#### 22 common traps (derived from the material above; examples verified)
1. **O is only an upper bound.** "2n = O(n²)" is TRUE. Use Θ when you mean "exactly this order".
2. **One-way equality.** n = O(n²) does not give O(n²) = O(n). Never "cancel" O's.
3. **The constant must not depend on n.** "≤ cn + n = O(n)" inside an induction is the classic wrong proof (§4 S5).
4. **Induction leaves a +1 or +n:** subtract a lower-order term (cn − d, cn² − dn). Don't abandon a correct guess (§4 S2, S3).
5. **Base cases:** n lg n is 0 at n = 1, so start at n₀ = 2 and check every base case the recursion can reach (n = 2, 3 for ⌊n/2⌋).
6. **Log bases** don't matter inside Θ, but they **do** matter in exponents: 2^(lg n) = n while 2^(log₄ n) = √n, and 4^(lg n) = n². **Exponential bases** matter: 3ⁿ ≠ O(2ⁿ) and 2^(2n) ≠ O(2ⁿ).
7. **Notation:** lg² n = (lg n)², while lg n² = 2 lg n = Θ(lg n), and lg lg n is something else again. In the CLRS 3-3 ranking lg* n grows even slower than ln ln n.
8. **Small-n tables lie.** n^0.001 beats lg n only past ≈ 10^4138, and 1.01ⁿ beats n^100 only past ≈ 117,308.
9. **"Polynomially larger/smaller"** means by a factor n^ε. A factor of lg n is not polynomial, so n lg n and n/lg n against n are gaps in the 3-case theorem.
10. **Case 3 always needs the regularity check.** It holds automatically for n^k lg^p n with k > log_b a, but it can fail (n(2 − cos n)).
11. **The Master Theorem needs** constant a ≥ 1, constant b > 1, f ≥ 0, and *equal* subproblem sizes n/b. It does not fit T(n−1), T(√n), T(n/3) + T(2n/3), a = 2ⁿ, a < 1, or negative f.
12. **Count recursive calls, not arithmetic.** `2*B(n/2)` is one call; `A(n/2) + A(n/2)` is two. For fast power the difference is Θ(log n) versus Θ(n).
13. **Geometric inner loops:** halving or doubling outer loops with an inner loop up to i are Θ(n), not Θ(n log n).
14. **Harmonic loops** (`j += i`) are Θ(n log n), not Θ(n²).
15. **Infinite loops:** j *= i with i = 1, or j *= 2 starting from j = 0.
16. **Best case means the best input of size n**, not a small n.
17. **The average case needs a stated distribution** (uniform key position, random permutation), and it can differ from both best and worst.
18. **"Insertion sort is Θ(n²)"** is true only for the worst or average case. Over all inputs it is O(n²) and Ω(n).
19. **Decreasing recurrences with a > 1** are Θ(a^(n/b)). "n^k·a^(n/b)" is only an upper bound; for example 2T(n−1) + n = Θ(2ⁿ).
20. **T(n) = 2T(n/2) + n lg n is Θ(n lg² n)**, not Θ(n lg n). Don't confuse it with merge sort's 2T(n/2) + n.
21. **Recursion trees have log_b n + 1 levels and n^(log_b a) leaves.** The leaf count is n only when a = b. Remember a^(log_b n) = n^(log_b a).
22. **The limit test is one-directional.** If lim f/g doesn't exist, the test says nothing. Use the definitions: n(2 + sin n) = Θ(n), while n^(1+sin n) and n are incomparable.

#### Exam-day strategy
- **"Prove f = O(g)":** write the chain of inequalities, then *state* c and n₀. For Θ, give c₁, c₂ and n₀. For "disprove", use contradiction ("then n ≤ c for all n ≥ n₀, impossible") or a limit of ∞.
- **Master Theorem:** write a, b, f(n), compute n^(log_b a), name the case, show ε (or k), *check regularity* in case 3, then give the Θ answer. If it doesn't apply, say why in one phrase, then use a recursion tree, unrolling or a change of variables.
- **Code:** first write T(n) by counting calls and sizes, plus the cost of one call. Then solve. Sanity-check with n = 1, 2, 4, 8.
- **Ranking:** rewrite every function as 2^(something) or n^(something) and compare the exponents. Group ties first.

#### One-page formula sheet
- **Sums:**
  - Σi = n(n+1)/2; Σi² = n(n+1)(2n+1)/6
  - Σ_{i=0}^{k} 2^i = 2^(k+1) − 1; Σ_{i≥0} r^i = 1/(1−r)
  - H_n = ln n + O(1); Σ j/2^j = 2
  - lg n! = Θ(n lg n)
- **Identities:**
  - a^(log_b n) = n^(log_b a); log_b n = lg n / lg b
  - (lg n)^(lg n) = n^(lg lg n); n^(1/lg n) = 2
- **Master Theorem:** W = n^(log_b a). Case 1: f = O(W/n^ε) ⇒ Θ(W). Case 2: f = Θ(W lg^k n) ⇒ Θ(W lg^(k+1) n). Case 3: f = Ω(W·n^ε) and a·f(n/b) ≤ c·f(n), c < 1 ⇒ Θ(f).
- **Common recurrences:**

  | Recurrence | Solution |
  |---|---|
  | T(n/2) + 1 | lg n |
  | T(n/2) + n | n |
  | 2T(n/2) + 1 | n |
  | 2T(n/2) + n | n lg n |
  | 2T(n/2) + n lg n | n lg² n |
  | 2T(n/2) + n/lg n | n lg lg n |
  | 3T(n/2) + n | n^1.585 |
  | 4T(n/2) + n | n² |
  | 7T(n/2) + n² | n^2.807 |
  | T(n−1) + 1 | n |
  | T(n−1) + n | n² |
  | 2T(n−1) + 1 | 2ⁿ |
  | T(n−1) + T(n−2) + 1 | φⁿ |
  | T(√n) + 1 | lg lg n |
  | 2T(√n) + lg n | lg n·lg lg n |
  | T(n/3) + T(2n/3) + n | n lg n |
  | T(n/5) + T(7n/10) + n | n |

### Gaps
- Several resources the user asked about could not be verified this session. The WebSearch budget for the session was exhausted, YouTube pages did not render, and one OCW page redirect-looped.
  - **Stanford CS161 notes:** not fetched.
  - **Abdul Bari's YouTube lectures:** the playlist page did not render. To find them, search YouTube for "Abdul Bari Algorithms". They are popular for intuition on loop counting and on the "Master theorem for decreasing/dividing functions", but I have not checked their content against these notes.
  - **MIT 6.046J Fall 2005 (SMA 5503) video lectures:** these include "Lecture 2: Asymptotic Notation, Recurrences, Substitution, Master Method". The page hit a redirect loop, so the link is unverified.
- **CLRS 4th edition:** the publisher's page returned HTTP 403, so the 4th-edition Master Theorem wording and the existence of an official free solutions PDF could not be confirmed.
- **Course-specific emphasis is unknown.** The syllabus says week 2 covered "Problem based on Recurrences and Master theorem". Check which Master Theorem variant and which o/ω definitions the slides use, and whether the professor accepts the extended case 2.


---

<!-- FILE: 02_sorting_algorithms.md -->

# Sorting Algorithms: Exam-Oriented Outside Notes (SOC3030-003 Computer Algorithms, Inha University in Tashkent, Fall 2026 midterm)

These notes are outside material only, compiled on 2026-10-19 from free external sources: MIT OCW 6.006, Jeff Erickson's *Algorithms*, the Princeton *algs4* booksite, Wikipedia, VisuAlgo and the USF visualizations. No class slides, no assignment files and no pirated textbook copies were used.

Conventions used throughout:
- Arrays are 1-based (the CLRS convention) unless a section says "0-based".
- A "comparison" means a key comparison: `A[i] > key`, `A[j] <= x`, `L[i] <= R[j]`, `A[l] > A[i]`. Index tests such as `i > 0` are not counted.
- In insertion sort, "pass j" is one iteration of the outer for loop, and the first pass is j = 2.
- Every trace and count shown in a code block was printed by a Python script that mirrors the pseudocode line by line (run on 2026-10-19). The outputs are pasted without edits.

Contents: 1 Insertion sort · 2 Quicksort · 3 Merge sort · 4 Heapsort and priority queues · 5 Counting, radix and bucket sort · 6 Comparison lower bound · 7 Master complexity table and recurrences · 8 Common traps · 9 Twenty practice problems with solutions · 10 Free resources and visualizers

---

## 1. Insertion sort: loop invariant, comparisons and shifts in the best and worst cases, and a trace

### Takeaway
Insertion sort is stable, in place, online and adaptive. The number of shifts equals the number of inversions I, and the number of comparisons lies between I and I + n − 1. The best case (already sorted) costs n − 1 comparisons and 0 shifts. The worst case (reverse sorted) costs n(n−1)/2 comparisons and n(n−1)/2 shifts. On average both counts are about n²/4.

### Cited Findings
- "For randomly ordered arrays of length N with distinct keys, insertion sort uses ~N²/4 compares and ~N²/4 exchanges on the average. The worst case is ~N²/2 compares and ~N²/2 exchanges and the best case is N−1 compares and 0 exchanges." — [algs4 §2.1 Elementary Sorts](https://algs4.cs.princeton.edu/21elementary/)
- An inversion is a pair of keys that is out of order. "The number of exchanges used by insertion sort is equal to the number of inversions in the array, and the number of compares is at least equal to the number of inversions and at most equal to the number of inversions plus the array size." — [algs4 §2.1](https://algs4.cs.princeton.edu/21elementary/)
- Insertion sort works well on "partially-sorted" arrays, meaning arrays whose number of inversions is at most a constant times the array size. — [algs4 §2.1](https://algs4.cs.princeton.edu/21elementary/)
- Insertion sort is adaptive: it runs in O(kn) when each element is at most k places from its sorted position. It is also stable, in place (O(1) extra memory) and online. Its best case (already sorted) is linear, with one comparison per element. Its worst case (reverse sorted) and its average case are quadratic. — [Wikipedia: Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort)
- "Good quicksort implementations use insertion sort for arrays smaller than a certain threshold", typically around ten elements. — [Wikipedia: Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort). algs4 recommends a cutoff "between 5 and 15". — [algs4 §2.3](https://algs4.cs.princeton.edu/23quicksort/)
- The MIT 6.006 summary table lists Insertion Sort as n², in-place Y, stable Y, with the comment "O(nk) for k-proximate". — [MIT 6.006 S20 Lecture 5 notes (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf)
- "In-place priority queue sort with Sorted Array is exactly Insertion Sort". — [MIT 6.006 S20 Lecture 8 notes (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/40d4851e550507ca14dc778b9b2266cc_MIT6_006S20_lec8.pdf)
- Definition: "A sorting method is stable if it preserves the relative order of equal keys in the array." — [algs4 §2.5](https://algs4.cs.princeton.edu/25applications/)

### Inferences

#### Pseudocode (CLRS 3rd-edition style)
```
INSERTION-SORT(A)
1  for j = 2 to A.length
2      key = A[j]
3      // Insert A[j] into the sorted sequence A[1 .. j-1].
4      i = j - 1
5      while i > 0 and A[i] > key
6          A[i + 1] = A[i]          // shift one place right
7          i = i - 1
8      A[i + 1] = key
```
The 4th edition writes this as `INSERTION-SORT(A, n)`. The logic is the same (see Gaps).

#### Loop invariant proof (initialization, maintenance, termination)
- **Invariant:** At the start of each iteration of the for loop with index j, the subarray A[1..j−1] holds exactly the elements originally in A[1..j−1], in sorted order.
- **Initialization:** When j = 2, A[1..1] is a single element, so it is trivially sorted.
- **Maintenance:** The while loop shifts A[j−1], A[j−2], … one place right as long as each of them is > key, then drops key into the hole. After that, A[1..j] holds the original A[1..j] in sorted order, so incrementing j restores the invariant. A formal proof would add a second invariant for the while loop.
- **Termination:** The loop exits when j = n + 1. Substituting into the invariant, A[1..n] is the whole array, in sorted order.
- **Why it is stable:** The test is the strict `A[i] > key`, so an element equal to key is never shifted past it.

#### Verified trace: A = ⟨5, 2, 4, 6, 1, 3⟩
```
start          : [5, 2, 4, 6, 1, 3]
pass j=2 key=  2: 1 cmp, 1 shift -> [2, 5, 4, 6, 1, 3]
pass j=3 key=  4: 2 cmp, 1 shift -> [2, 4, 5, 6, 1, 3]
pass j=4 key=  6: 1 cmp, 0 shift -> [2, 4, 5, 6, 1, 3]
pass j=5 key=  1: 4 cmp, 4 shift -> [1, 2, 4, 5, 6, 3]
pass j=6 key=  3: 4 cmp, 3 shift -> [1, 2, 3, 4, 5, 6]
TOTAL: 12 comparisons, 9 shifts (inversions = 9)
```
Best case (sorted) and worst case (reverse sorted), n = 6, verified:
```
start          : [1, 2, 3, 4, 5, 6]        (every pass: 1 cmp, 0 shift)
TOTAL: 5 comparisons, 0 shifts (inversions = 0)
start          : [6, 5, 4, 3, 2, 1]
pass j=2 key=  5: 1 cmp, 1 shift -> [5, 6, 4, 3, 2, 1]
pass j=3 key=  4: 2 cmp, 2 shift -> [4, 5, 6, 3, 2, 1]
pass j=4 key=  3: 3 cmp, 3 shift -> [3, 4, 5, 6, 2, 1]
pass j=5 key=  2: 4 cmp, 4 shift -> [2, 3, 4, 5, 6, 1]
pass j=6 key=  1: 5 cmp, 5 shift -> [1, 2, 3, 4, 5, 6]
TOTAL: 15 comparisons, 15 shifts (inversions = 15)
```
Stability demonstration on ⟨3a, 1, 3b, 2, 3c⟩, where the letters tag equal keys:
```
start          : [3a, 1, 3b, 2, 3c]
pass j=2 key=  1: 1 cmp, 1 shift -> [1, 3a, 3b, 2, 3c]
pass j=3 key= 3b: 1 cmp, 0 shift -> [1, 3a, 3b, 2, 3c]
pass j=4 key=  2: 3 cmp, 2 shift -> [1, 2, 3a, 3b, 3c]
pass j=5 key= 3c: 1 cmp, 0 shift -> [1, 2, 3a, 3b, 3c]
TOTAL: 6 comparisons, 3 shifts (inversions = 3)
```

#### Exact counts (checked by brute force over all n! permutations for n = 2..7)
| Case | Input | Key comparisons | Shifts |
|---|---|---|---|
| Best | sorted | n − 1 | 0 |
| Worst | strictly decreasing | n(n−1)/2 | n(n−1)/2 |
| Average (random distinct keys) | — | n(n−1)/4 + n − H_n | n(n−1)/4 |
| Any input with I inversions | — | I + (n − 1) − m | I |

Here H_n = 1 + 1/2 + … + 1/n, and m is the number of passes j ≥ 2 whose key is smaller than everything before it. Such a pass ends because i reaches 0, not because a comparison fails, so it saves one comparison. Check on ⟨5,2,4,6,1,3⟩: 9 + 5 − 2 = 12, since keys 2 and 1 were new minima. The brute force for n = 7 gave average comparisons 14.9071, which equals the formula exactly, and average shifts 21/2.
- Running time is Θ(n + I): Θ(n) on sorted input and Θ(n²) in the worst case.
- As a recursion: T(n) = T(n−1) + Θ(n) in the worst case, which gives Θ(n²).

### Gaps
- I could not quote CLRS's own wording of the loop invariant or its exact 4th-edition pseudocode, because I had no legal online copy. The invariant above is the standard one in my own words, and the pseudocode was checked by a line-by-line script.

---

## 2. Quicksort: Lomuto vs Hoare (with traces), worst vs balanced recurrences, average case, randomized pivot, median-of-three, tail recursion and stack depth

### Takeaway
All of quicksort's work happens in PARTITION, which costs Θ(n) per call. Balanced splits give T(n) = 2T(n/2) + Θ(n) = Θ(n lg n). Maximally unbalanced splits give T(n) = T(n−1) + Θ(n) = Θ(n²), with exactly n(n−1)/2 comparisons. With a last-element Lomuto pivot, sorted, reverse-sorted and all-equal inputs all produce this worst case. A random pivot makes the expected comparison count 2(n+1)H_n − 4n ≈ 1.39 n lg n on every input. Hoare's scheme does fewer swaps and splits equal keys evenly, but it returns a split point rather than the pivot's final position. Recursing on the smaller side first bounds the stack depth by lg n.

### Cited Findings
**Partition schemes**
- Erickson presents the Lomuto partition ("the one I'm presenting here is attributed to Nico Lomuto") and notes: "Hoare proposed a more complicated 'two-way' partitioning algorithm that has some practical advantages over Lomuto's algorithm. On the other hand, Hoare's partitioning algorithm is one of the places off-by-one errors go to die." — [Erickson, *Algorithms*, Ch. 1 (PDF)](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- Erickson states the Lomuto loop invariant: "At the end of each iteration of the main loop, everything in the subarray A[1 .. ℓ] is less than A[n], and nothing in the subarray A[ℓ + 1 .. i] is less than A[n]." — [Erickson Ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- With Lomuto, "The complexity of Quicksort with this scheme degrades to O(n²) when the array is already in order". It also performs poorly when all elements are equal. "Hoare's scheme is more efficient than Lomuto's partition scheme because it does three times fewer swaps on average." With Hoare, "the index returned in the partition function isn't necessarily where the actual pivot is", and the recursion is on (lo..p) and (p+1..hi) instead of Lomuto's (lo..p−1) and (p+1..hi). — [Wikipedia: Quicksort](https://en.wikipedia.org/wiki/Quicksort)
- algs4's partition makes both scans stop on keys equal to the pivot. This is "crucial to avoiding quadratic running time in certain typical applications". With all keys equal it uses "~N lg N compares. Each partition will divide the array in half, plus or minus one." — [algs4 §2.3 Quicksort](https://algs4.cs.princeton.edu/23quicksort/)

**Analysis**
- Erickson gives T(n) = T(r−1) + T(n−r) + O(n), where r is the pivot's rank. A median pivot gives T(n) ≤ 2T(n/2) + O(n) = O(n log n). "In the worst case, the two subproblems are completely unbalanced—either r = 1 or r = n—and the recurrence becomes T(n) ≤ T(n−1) + O(n). The solution is T(n) = O(n²)." — [Erickson Ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- If the pivot always lands in the middle third, then T(n) ≤ T(n/3) + T(2n/3) + O(n). Each level sums to at most n, and the depth is log_{3/2} n, so T(n) = O(n log n). "The fact that the recursion tree is unbalanced simply doesn't matter." In the worst-case tree, "every level value is at most n and there are at most n levels", and the bound is tight "because n/2 levels each have value at least n/2." — [Erickson Ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- Median-of-three "is somewhat more efficient in practice … especially when the array is already (nearly) sorted, [but] we can still have r = 2 or r = n − 1 in the worst case", which gives T(n) ≤ T(1) + T(n−2) + O(n) = O(n²). — [Erickson Ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- "If we choose the pivot index p uniformly at random, then QuickSort runs in O(n log n) time with high probability, for every possible input array." Here the randomness is controlled by the algorithm, not by an adversary. The usual "average case" argument instead assumes "that all permutations of the input array are equally likely", which Erickson calls "completely unrealistic". — [Erickson Ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- Erickson's indicator-variable analysis of the quicksort-like nuts-and-bolts algorithm: two items are compared "if and only if the first pivot chosen from the set {Bi, …, Bj} is either Bi or Bj". The probability of that is 2/(j − i + 1). — [Erickson, randomized algorithms notes (PDF)](http://jeffe.cs.illinois.edu/teaching/algorithms/notes/02-nutsbolts.pdf)
- "Quicksort uses ~2 N ln N compares (and one-sixth that many exchanges) on the average to sort an array of length N with distinct keys." "Quicksort uses ~N²/2 compares in the worst case, but random shuffling protects against this case." — [algs4 §2.3](https://algs4.cs.princeton.edu/23quicksort/)
- The average comparison count is C(n) = 2n ln n ≈ 1.39 n log₂ n, and median-of-three lowers the expected count to about 1.188 n log₂ n. — [Wikipedia: Quicksort](https://en.wikipedia.org/wiki/Quicksort)
- VisuAlgo describes the worst case this way: "The first partition takes O(N) time, splits A into 0, 1, N−1 items … This is the classic N+(N−1)+(N−2)+...+1 pattern, which is O(N²)." — [VisuAlgo: Sorting](https://visualgo.net/en/sorting)

**Pivot strategies, stack depth and practice**
- To keep stack space at O(log n), "Recur first into the smaller side of the partition, then use a tail call to recur into the other". — [Wikipedia: Quicksort](https://en.wikipedia.org/wiki/Quicksort)
- algs4's suggested improvements are a cutoff to insertion sort for tiny subarrays (5–15), median-of-three partitioning, and 3-way partitioning. "Quicksort with 3-way partitioning is entropy-optimal." — [algs4 §2.3](https://algs4.cs.princeton.edu/23quicksort/)
- Quicksort is not stable. "In most practical situations, quicksort is the method of choice. If stability is important and space is available, mergesort might be best." — [algs4 §2.5](https://algs4.cs.princeton.edu/25applications/)

### Inferences

#### Pseudocode (CLRS 3rd-edition style)
```
QUICKSORT(A, p, r)                      // initial call: QUICKSORT(A, 1, A.length)
1  if p < r
2      q = PARTITION(A, p, r)
3      QUICKSORT(A, p, q - 1)
4      QUICKSORT(A, q + 1, r)

PARTITION(A, p, r)                      // Lomuto; pivot = last element
1  x = A[r]
2  i = p - 1
3  for j = p to r - 1
4      if A[j] <= x
5          i = i + 1
6          exchange A[i] with A[j]
7  exchange A[i + 1] with A[r]
8  return i + 1
```
Lomuto invariant (CLRS form): at the start of each iteration with index j, A[p..i] ≤ x, A[i+1..j−1] > x, A[r] = x, and A[j..r−1] is not yet examined. PARTITION always makes exactly r − p comparisons.

```
HOARE-PARTITION(A, p, r)                // CLRS Problem 7-1; pivot = FIRST element
1  x = A[p]
2  i = p - 1
3  j = r + 1
4  while TRUE
5      repeat
6          j = j - 1
7      until A[j] <= x
8      repeat
9          i = i + 1
10     until A[i] >= x
11     if i < j
12         exchange A[i] with A[j]
13     else return j

QUICKSORT-HOARE(A, p, r)
1  if p < r
2      q = HOARE-PARTITION(A, p, r)
3      QUICKSORT-HOARE(A, p, q)            // q, NOT q - 1
4      QUICKSORT-HOARE(A, q + 1, r)
```
After HOARE-PARTITION, every element of A[p..q] is ≤ every element of A[q+1..r], and p ≤ q < r, so both sides are non-empty. That is why the recursion uses q rather than q − 1. The pivot is not necessarily at index q.

```
RANDOMIZED-PARTITION(A, p, r)
1  i = RANDOM(p, r)
2  exchange A[r] with A[i]
3  return PARTITION(A, p, r)

RANDOMIZED-QUICKSORT(A, p, r)
1  if p < r
2      q = RANDOMIZED-PARTITION(A, p, r)
3      RANDOMIZED-QUICKSORT(A, p, q - 1)
4      RANDOMIZED-QUICKSORT(A, q + 1, r)

MEDIAN-OF-3-PARTITION(A, p, r)
1  m = ⌊(p + r) / 2⌋
2  let k ∈ {p, m, r} be the index of the median of A[p], A[m], A[r]
3  exchange A[k] with A[r]
4  return PARTITION(A, p, r)

TAIL-RECURSIVE-QUICKSORT(A, p, r)       // recurse on the smaller side, loop on the larger
1  while p < r
2      q = PARTITION(A, p, r)
3      if q - p < r - q
4          TAIL-RECURSIVE-QUICKSORT(A, p, q - 1)
5          p = q + 1
6      else TAIL-RECURSIVE-QUICKSORT(A, q + 1, r)
7          r = q - 1
```

#### Verified trace 1: Lomuto PARTITION(A, 1, 8) on ⟨2, 8, 7, 1, 3, 5, 6, 4⟩ (pivot 4)
```
PARTITION(A,1,8): pivot x=A[8]=4; i=0
  j=1: A[j]=2 <= 4: i=1, self-exchange                  [2, 8, 7, 1, 3, 5, 6, 4]
  j=2: A[j]=8 >  4: no change                         [2, 8, 7, 1, 3, 5, 6, 4]
  j=3: A[j]=7 >  4: no change                         [2, 8, 7, 1, 3, 5, 6, 4]
  j=4: A[j]=1 <= 4: i=2, exchange A[2]=8 <-> A[4]=1     [2, 1, 7, 8, 3, 5, 6, 4]
  j=5: A[j]=3 <= 4: i=3, exchange A[3]=7 <-> A[5]=3     [2, 1, 3, 8, 7, 5, 6, 4]
  j=6: A[j]=5 >  4: no change                         [2, 1, 3, 8, 7, 5, 6, 4]
  j=7: A[j]=6 >  4: no change                         [2, 1, 3, 8, 7, 5, 6, 4]
  final exchange A[4] <-> A[8]: [2, 1, 3, 4, 7, 5, 6, 8]  return q=4
stats: {'cmp': 7, 'xchg': 4}
```
The exchange count includes the self-exchange at j = 1 and the final exchange on line 7.

#### Verified trace 2: full Lomuto QUICKSORT on the same array (each PARTITION result)
```
QUICKSORT(A,1,8): pivot ends at q=4; A[1..8] = [2, 1, 3, 4, 7, 5, 6, 8]; whole = [2, 1, 3, 4, 7, 5, 6, 8]
  QUICKSORT(A,1,3): pivot ends at q=3; A[1..3] = [2, 1, 3]; whole = [2, 1, 3, 4, 7, 5, 6, 8]
    QUICKSORT(A,1,2): pivot ends at q=1; A[1..2] = [1, 2]; whole = [1, 2, 3, 4, 7, 5, 6, 8]
  QUICKSORT(A,5,8): pivot ends at q=8; A[5..8] = [7, 5, 6, 8]; whole = [1, 2, 3, 4, 7, 5, 6, 8]
    QUICKSORT(A,5,7): pivot ends at q=6; A[5..7] = [5, 6, 7]; whole = [1, 2, 3, 4, 5, 6, 7, 8]
sorted: [1, 2, 3, 4, 5, 6, 7, 8] stats: {'cmp': 15, 'xchg': 14, 'maxdepth': 3}
```
Total comparisons: 7 + 2 + 1 + 3 + 2 = 15.

#### Verified trace 3: HOARE-PARTITION(A, 1, 12) on ⟨13, 19, 9, 5, 12, 8, 7, 4, 11, 2, 6, 21⟩ (pivot 13)
```
HOARE-PARTITION(A,1,12): pivot x=A[1]=13; i=0, j=13
  stop at i=1 (A[i]=13), j=11 (A[j]=6); i<j -> exchange: [6, 19, 9, 5, 12, 8, 7, 4, 11, 2, 13, 21]
  stop at i=2 (A[i]=19), j=10 (A[j]=2); i<j -> exchange: [6, 2, 9, 5, 12, 8, 7, 4, 11, 19, 13, 21]
  stop at i=10 (A[i]=19), j=9 (A[j]=11); i>=j -> return j=9
result: [6, 2, 9, 5, 12, 8, 7, 4, 11, 19, 13, 21] q = 9 stats: {'cmp': 14, 'xchg': 2}
```
The pivot 13 ends at index 11, not at the returned q = 9. The guarantee is only that A[1..9] ≤ 13 ≤ A[10..12].

#### Verified trace 4: full Hoare QUICKSORT on ⟨2, 8, 7, 1, 3, 5, 6, 4⟩ (pivot = first element)
```
HOARE-PARTITION(A,1,8): pivot x=A[1]=2; i=0, j=9
  stop at i=1 (A[i]=2), j=4 (A[j]=1); i<j -> exchange: [1, 8, 7, 2, 3, 5, 6, 4]
  stop at i=2 (A[i]=8), j=1 (A[j]=1); i>=j -> return j=1

QUICKSORT(A,1,8): HOARE-PARTITION returned q=1; A[1..8] = [1, 8, 7, 2, 3, 5, 6, 4]; whole = [1, 8, 7, 2, 3, 5, 6, 4]
  QUICKSORT(A,2,8): HOARE-PARTITION returned q=7; A[2..8] = [4, 7, 2, 3, 5, 6, 8]; whole = [1, 4, 7, 2, 3, 5, 6, 8]
    QUICKSORT(A,2,7): HOARE-PARTITION returned q=3; A[2..7] = [3, 2, 7, 4, 5, 6]; whole = [1, 3, 2, 7, 4, 5, 6, 8]
      QUICKSORT(A,2,3): HOARE-PARTITION returned q=2; A[2..3] = [2, 3]; whole = [1, 2, 3, 7, 4, 5, 6, 8]
      QUICKSORT(A,4,7): HOARE-PARTITION returned q=6; A[4..7] = [6, 4, 5, 7]; whole = [1, 2, 3, 6, 4, 5, 7, 8]
        QUICKSORT(A,4,6): HOARE-PARTITION returned q=5; A[4..6] = [5, 4, 6]; whole = [1, 2, 3, 5, 4, 6, 7, 8]
          QUICKSORT(A,4,5): HOARE-PARTITION returned q=4; A[4..5] = [4, 5]; whole = [1, 2, 3, 4, 5, 6, 7, 8]
sorted: [1, 2, 3, 4, 5, 6, 7, 8] stats: {'cmp': 46, 'xchg': 8, 'maxdepth': 6}
```
The same array produces a completely different recursion tree under the two schemes, because Hoare uses the first element (2) as the pivot. On an exam, always check which pivot rule is specified.

Verified failure: running Hoare partition with Lomuto-style recursion `(p, q-1)` and `(q+1, r)` on ⟨6, 3, 9, 1, 8, 2, 7, 5⟩ produced `[2, 3, 5, 1, 6, 7, 8, 9]`, which is not sorted.

#### Worst, best and average case: recurrences and verified numbers
- **Worst case:** T(n) = T(n−1) + T(0) + Θ(n) = Θ(n²), with exactly (n−1) + (n−2) + … + 1 = n(n−1)/2 comparisons. Verified on sorted ⟨1..8⟩ with a last-element pivot:
```
QUICKSORT(A,1,8) -> q=8 (split sizes 7 and 0)
  QUICKSORT(A,1,7) -> q=7 (split sizes 6 and 0)
    QUICKSORT(A,1,6) -> q=6 (split sizes 5 and 0)
      QUICKSORT(A,1,5) -> q=5 (split sizes 4 and 0)
        QUICKSORT(A,1,4) -> q=4 (split sizes 3 and 0)
          QUICKSORT(A,1,3) -> q=3 (split sizes 2 and 0)
            QUICKSORT(A,1,2) -> q=2 (split sizes 1 and 0)
total comparisons: 28 = n(n-1)/2 = 28 max recursion depth: 7
```
  For n = 6, sorted, reverse-sorted and all-equal inputs each took 15 comparisons (see Practice Problem 7). Hoare with a first-element pivot is also quadratic on sorted input. Verified: n = 8 took 42 comparisons with splits 1 | 7, 1 | 6, …; n = 64 took 2,142 comparisons with recursion depth 63.
- **Best case and any constant-proportion split:** T(n) = 2T(n/2) + Θ(n) = Θ(n lg n). A 9:1 split, T(n) = T(9n/10) + T(n/10) + Θ(n), is still Θ(n lg n): every level costs ≤ cn and there are log_{10/9} n = O(lg n) levels. The smallest possible comparison count, found by brute force, is 10 for n = 7 and 13 for n = 8.
- **Average case** (all permutations equally likely, or a random pivot on any input): C(n) = (n − 1) + (2/n) Σ_{k=0}^{n−1} C(k), with C(0) = C(1) = 0.
  - Multiply by n and subtract the n − 1 version: nC(n) = (n+1)C(n−1) + 2(n−1).
  - Divide by n(n+1) and telescope: C(n) = 2(n+1)H_n − 4n ≈ 2n ln n ≈ 1.39 n lg n.
  - Checked exactly over all permutations for n = 2..8. For example, n = 8 averages 16.9214, matching the formula.
  - Checked by simulation for random quicksort: at n = 1000 the mean over 200 runs was 10,943.9, against the formula's 10,985.9.
  - The leading term alone overestimates at moderate n: 2n ln n = 13,815.5 at n = 1000, because 2(n+1)H_n − 4n ≈ 2n ln n − 2.85n.
- **Indicator-variable route** (the CLRS-style argument, using Erickson's probability): E[comparisons] = Σ_{i<j} 2/(j−i+1) < Σ_{i=1}^{n−1} 2H_n = O(n lg n).
- **Average-case intuition:**
  - A random pivot has rank between n/10 and 9n/10 with probability about 0.8, and even a constant 9:1 split keeps the depth at O(lg n).
  - A bad split (n−1 : 0) followed by a good split costs Θ(n) + Θ(n) = Θ(n) and still yields balanced pieces. The bad split is absorbed into the good level, so alternating good and bad splits remains Θ(n lg n).
- **Randomized quicksort:** The worst case is still Θ(n²), reached only if the random pivots are repeatedly extreme, which has negligible probability. The expected time is Θ(n lg n) for every input, because the expectation is over the algorithm's coin flips, not over the inputs.

#### Equal keys and swaps, Lomuto vs Hoare (verified)
| n (all keys equal) | Lomuto comparisons / max depth | Hoare comparisons / max depth |
|---|---|---|
| 8 | 28 / 7 | 38 / 3 |
| 64 | 2,016 / 63 | 510 / 6 |
| 512 | 130,816 / 511 | 5,630 / 9 |

With equal keys, Lomuto's `A[j] <= x` is always true, so q = r every time and the recursion degrades to the quadratic chain. Hoare's scans stop on equal keys, so the splits stay balanced.

Exchanges on random permutations, measured at n = 1000 over 200 runs: Lomuto averaged about 5,014 non-trivial exchanges plus about 993 self-exchanges, and Hoare averaged about 2,345. That is 2.1 to 2.6 times fewer for Hoare at this size, depending on whether self-exchanges are counted. Wikipedia's "three times fewer" is the asymptotic average.

#### Median-of-three (verified on sorted ⟨1..7⟩)
```
median-of-three of A[1]=1, A[4]=4, A[7]=7 is 4 (index 4)
PARTITION(A,1,7): pivot x=A[7]=4; i=0
  j=1: A[j]=1 <= 4: i=1, self-exchange                  [1, 2, 3, 7, 5, 6, 4]
  j=2: A[j]=2 <= 4: i=2, self-exchange                  [1, 2, 3, 7, 5, 6, 4]
  j=3: A[j]=3 <= 4: i=3, self-exchange                  [1, 2, 3, 7, 5, 6, 4]
  j=4: A[j]=7 >  4: no change                         [1, 2, 3, 7, 5, 6, 4]
  j=5: A[j]=5 >  4: no change                         [1, 2, 3, 7, 5, 6, 4]
  j=6: A[j]=6 >  4: no change                         [1, 2, 3, 7, 5, 6, 4]
  final exchange A[4] <-> A[7]: [1, 2, 3, 4, 5, 6, 7]  return q=4
```
Median-of-three turns the sorted-input worst case into a perfect split. It does not help all-equal input, and adversarial inputs can still force O(n²) (Erickson).

#### Tail recursion and stack depth (verified, n = 900)
```
sorted: plain max depth = 899, smaller-first max depth = 1, lg n = 9.81
random: plain max depth = 19, smaller-first max depth = 8, lg n = 9.81
```
The smaller side has at most half the elements, so each nested recursive call at least halves the subproblem size, and the depth is ≤ lg n. The stack therefore stays O(lg n) even in the worst case. The running time does not change: it is still Θ(n²) in the worst case.

### Gaps
- Wikipedia's "three times fewer swaps" was reproduced only approximately (2.1 to 2.6 times at n = 1000). I found no primary derivation within my fetch budget.
- The HOARE-PARTITION, RANDOMIZED-QUICKSORT and tail-recursive pseudocode reconstructs CLRS Chapter 7 and Problems 7-1 and 7-4 from memory. I validated it by script but could not compare it with the book's text legally online.

---

## 3. Merge sort: the MERGE procedure with a trace, T(n) = 2T(n/2) + Θ(n), number of comparisons, space, and the bottom-up variant

### Takeaway
MERGE-SORT splits at q = ⌊(p+r)/2⌋ and costs T(n) = 2T(n/2) + Θ(n) = Θ(n lg n) on every input, so it is not adaptive.
- **One merge:** Merging n₁ + n₂ items takes between min(n₁, n₂) and n₁ + n₂ − 1 comparisons. With CLRS 3e sentinels it always takes exactly n₁ + n₂.
- **Whole sort:** The worst-case total is n⌈lg n⌉ − 2^⌈lg n⌉ + 1, and the extra space is Θ(n).
- **Stability:** Merge sort is stable when ties are taken from the left (≤).
- **Bottom-up:** This version merges runs of width 1, 2, 4, … in ⌈lg n⌉ passes.

### Cited Findings
- Erickson's three steps are: "Divide the input array into two subarrays of roughly equal size. Recursively mergesort each of the subarrays. Merge the newly-sorted subarrays into a single sorted array." The recurrence T(n) = T(⌈n/2⌉) + T(⌊n/2⌋) + O(n) simplifies to T(n) = 2T(n/2) + O(n), and "the 'all levels equal' case of the recursion tree method … immediately implies the closed-form solution T(n) = O(n log n)." Goldstine and von Neumann "actually described an non-recursive variant now usually called bottom-up mergesort." — [Erickson Ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- "Top-down mergesort uses between 1/2 N lg N and N lg N compares and at most 6 N lg N array accesses to sort any array of length N." Bottom-up mergesort has the same bounds. Mergesort "uses extra space proportional to N". Suggested improvements are a cutoff to insertion sort (10–15% faster), testing whether the array is already in order (linear time on sorted arrays), and eliminating the copy to the auxiliary array. — [algs4 §2.2 Mergesort](https://algs4.cs.princeton.edu/22mergesort/)
- "Mergesort is an asymptotically optimal compare-based sorting algorithm." — [algs4 §2.2](https://algs4.cs.princeton.edu/22mergesort/)
- The worst-case number of comparisons is n⌈lg n⌉ − 2^⌈lg n⌉ + 1, which lies between n lg n − n + 1 and n lg n + n + O(lg n). The recurrence is T(n) = 2T(n/2) + n. Bottom-up merges runs of width 1, 2, 4, 8, … and needs O(n) auxiliary memory. "Most implementations of merge sort are stable". Standard merge sort is not adaptive, while natural merge sort exploits existing runs. — [Wikipedia: Merge sort](https://en.wikipedia.org/wiki/Merge_sort)
- MIT's table lists Merge Sort as n log n, in-place N, stable Y, "stable, optimal comparison". The notes also say: "So merge sort is optimal in comparison model". — [MIT 6.006 S20 Lecture 5 (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf)

### Inferences

#### Pseudocode (CLRS 3rd edition, sentinel version)
```
MERGE(A, p, q, r)
1  n1 = q - p + 1
2  n2 = r - q
3  let L[1 .. n1 + 1] and R[1 .. n2 + 1] be new arrays
4  for i = 1 to n1
5      L[i] = A[p + i - 1]
6  for j = 1 to n2
7      R[j] = A[q + j]
8  L[n1 + 1] = ∞
9  R[n2 + 1] = ∞
10 i = 1
11 j = 1
12 for k = p to r
13     if L[i] <= R[j]          // <= : ties taken from the left, so the sort is stable
14         A[k] = L[i]
15         i = i + 1
16     else A[k] = R[j]
17         j = j + 1

MERGE-SORT(A, p, r)                      // initial call: MERGE-SORT(A, 1, A.length)
1  if p < r
2      q = ⌊(p + r) / 2⌋
3      MERGE-SORT(A, p, q)
4      MERGE-SORT(A, q + 1, r)
5      MERGE(A, p, q, r)
```
No-sentinel MERGE, which is the version used for the comparison counts below and matches the approach of the 4th edition:
```
MERGE(A, p, q, r)
1  copy A[p .. q] into L[1 .. n1] and A[q+1 .. r] into R[1 .. n2]
2  i = 1; j = 1; k = p
3  while i <= n1 and j <= n2
4      if L[i] <= R[j]
5          A[k] = L[i]; i = i + 1
6      else A[k] = R[j]; j = j + 1
7      k = k + 1
8  copy the leftover L[i .. n1] or R[j .. n2] into A[k .. r]   // no comparisons
```
Bottom-up merge sort:
```
MERGE-SORT-BOTTOM-UP(A, n)
1  width = 1
2  while width < n
3      lo = 1
4      while lo + width <= n               // a right-hand run exists
5          mid = lo + width - 1
6          hi  = min(lo + 2*width - 1, n)
7          MERGE(A, lo, mid, hi)
8          lo  = lo + 2*width
9      width = 2*width
```

#### Verified trace 1: top-down MERGE-SORT on ⟨5, 2, 4, 7, 1, 3, 2, 6⟩ (merges in execution order)
```
MERGE(A,1,1,2): [5] + [2] -> [2, 5]  (1 cmp)   whole array: [2, 5, 4, 7, 1, 3, 2, 6]
MERGE(A,3,3,4): [4] + [7] -> [4, 7]  (1 cmp)   whole array: [2, 5, 4, 7, 1, 3, 2, 6]
MERGE(A,1,2,4): [2, 5] + [4, 7] -> [2, 4, 5, 7]  (3 cmp)   whole array: [2, 4, 5, 7, 1, 3, 2, 6]
MERGE(A,5,5,6): [1] + [3] -> [1, 3]  (1 cmp)   whole array: [2, 4, 5, 7, 1, 3, 2, 6]
MERGE(A,7,7,8): [2] + [6] -> [2, 6]  (1 cmp)   whole array: [2, 4, 5, 7, 1, 3, 2, 6]
MERGE(A,5,6,8): [1, 3] + [2, 6] -> [1, 2, 3, 6]  (3 cmp)   whole array: [2, 4, 5, 7, 1, 2, 3, 6]
MERGE(A,1,4,8): [2, 4, 5, 7] + [1, 2, 3, 6] -> [1, 2, 2, 3, 4, 5, 6, 7]  (7 cmp)   whole array: [1, 2, 2, 3, 4, 5, 6, 7]
total comparisons: 17
```
In the last merge, the tie 2 (left) vs 2 (right) is resolved by `<=`, so the left 2 is output first and stability is kept.

#### Verified trace 2: odd n, ⟨38, 27, 43, 3, 9, 82, 10⟩
```
MERGE(A,1,1,2): [38] + [27] -> [27, 38]  (1 cmp)   whole array: [27, 38, 43, 3, 9, 82, 10]
MERGE(A,3,3,4): [43] + [3] -> [3, 43]  (1 cmp)   whole array: [27, 38, 3, 43, 9, 82, 10]
MERGE(A,1,2,4): [27, 38] + [3, 43] -> [3, 27, 38, 43]  (3 cmp)   whole array: [3, 27, 38, 43, 9, 82, 10]
MERGE(A,5,5,6): [9] + [82] -> [9, 82]  (1 cmp)   whole array: [3, 27, 38, 43, 9, 82, 10]
MERGE(A,5,6,7): [9, 82] + [10] -> [9, 10, 82]  (2 cmp)   whole array: [3, 27, 38, 43, 9, 10, 82]
MERGE(A,1,4,7): [3, 27, 38, 43] + [9, 10, 82] -> [3, 9, 10, 27, 38, 43, 82]  (6 cmp)   whole array: [3, 9, 10, 27, 38, 43, 82]
total comparisons: 14
```

#### Verified trace 3: bottom-up passes
```
pass 1 (run width 1 -> 2): [2, 5, 4, 7, 1, 3, 2, 6]  (4 cmp)
pass 2 (run width 2 -> 4): [2, 4, 5, 7, 1, 2, 3, 6]  (6 cmp)
pass 3 (run width 4 -> 8): [1, 2, 2, 3, 4, 5, 6, 7]  (7 cmp)
total comparisons: 17

pass 1 (run width 1 -> 2): [27, 38, 3, 43, 9, 82, 10]  (3 cmp)
pass 2 (run width 2 -> 4): [3, 27, 38, 43, 9, 10, 82]  (5 cmp)
pass 3 (run width 4 -> 8): [3, 9, 10, 27, 38, 43, 82]  (6 cmp)
total comparisons: 14
```
See Practice Problem 11 for n = 9, where bottom-up and top-down produce different intermediate arrays.

#### Comparison counts (verified)
- **One MERGE of sizes (n₁, n₂):** min(n₁, n₂) comparisons when one run is entirely smaller, and n₁ + n₂ − 1 when the runs interleave to the end. This was checked over all interleavings for sizes (1,1), (2,3), (3,3), (4,4) and (2,5). Examples: [1,3,5,7]+[2,4,6,8] takes 7, [1,2,3,4]+[5,6,7,8] takes 4, and [5,6,7,8]+[1,2,3,4] takes 4.
- **Sentinel version:** Every MERGE of k elements makes exactly k comparisons. Totals are 24 = n lg n for the n = 8 example and 20 for the n = 7 example.
- **Whole sort by brute force over all permutations:** The worst case equals n⌈lg n⌉ − 2^⌈lg n⌉ + 1 for every n = 2..8. For n = 8: worst 17, best 12 = (n/2) lg n, average 15.733.
- **Recurrence:** T(n) = 2T(n/2) + cn. The recursion tree has lg n + 1 levels each costing cn, so the total is cn lg n + cn = Θ(n lg n). In master-theorem terms this is case 2, with a = 2, b = 2 and f(n) = Θ(n^{log₂2}).
- **Space:** Θ(n) for the L and R arrays, plus Θ(lg n) of recursion stack for the top-down version. Merge sort is not in place. It is still the natural choice for linked lists, since it needs no random access.

### Gaps
- I could not verify the 4th edition's exact MERGE text, because I had no legal online copy.

---

## 4. Heapsort and priority queues: array representation (1-based vs 0-based), MAX-HEAPIFY trace, why BUILD-MAX-HEAP is O(n), heapsort trace, insert / extract-max / increase-key

### Takeaway
- **Index arithmetic:** 1-based PARENT(i) = ⌊i/2⌋, LEFT(i) = 2i, RIGHT(i) = 2i + 1. 0-based parent = ⌊(i−1)/2⌋, children 2i + 1 and 2i + 2.
- **MAX-HEAPIFY** sinks one key along a path, in O(lg n).
- **BUILD-MAX-HEAP** calls MAX-HEAPIFY for i = ⌊n/2⌋ down to 1. It is O(n) because most nodes have small height: Σ h/2^h = 2.
- **HEAPSORT** is one build plus n − 1 rounds of "swap the root to the end, shrink the heap, heapify". It runs in Θ(n lg n), in place, and is not stable.
- **Priority-queue operations** (extract-max, increase-key, insert) each cost O(lg n).

### Cited Findings
- "A binary tree is heap-ordered if the key in each node is larger than (or equal to) the keys in that node's two children (if any)." In the 1-based array representation, "The parent of the node in position k is in position k/2" and "The two children of the node in position k are in positions 2k and 2k + 1". Heap order is restored by swim (bottom-up) and sink (top-down). — [algs4 §2.4 Priority Queues](https://algs4.cs.princeton.edu/24pq/)
- "In an n-item priority queue, the heap algorithms require no more than 1 + lg n compares for insert and no more than 2 lg n compares for remove the maximum." "Sink-based heap construction is linear time", using fewer than 2n compares and fewer than n exchanges. "Heapsort uses fewer than 2 n lg n compare and exchanges to sort n items." — [algs4 §2.4](https://algs4.cs.princeton.edu/24pq/)
- MIT (0-based): "Root is at index 0", left(i) = 2i + 1, right(i) = 2i + 2, parent(i) = ⌊(i−1)/2⌋. "Max-Heap Property at node i: Q[i] ≥ Q[j] for j ∈ {left(i), right(i)}"; "max item is at root of max-heap". — [MIT 6.006 S20 Lecture 8 (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/40d4851e550507ca14dc778b9b2266cc_MIT6_006S20_lec8.pdf)
- MIT on the operations. Insert means append, then "max heapify up(i): swap with parent until Max-Heap Property". Delete-max means "swap item at root node i = 0 with last item at node n − 1", remove it, then "max heapify down(i): swap root with larger child until Max-Heap Property". Both take "height of tree, so Θ(log n)". "In-place priority queue sort with binary Max Heap is Heap Sort". — [MIT Lecture 8 (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/40d4851e550507ca14dc778b9b2266cc_MIT6_006S20_lec8.pdf)
- MIT on linear build. Inserting n items one at a time costs Σ depth(i) = lg(n!) = Ω(n lg n) worst-case swaps. Calling max_heapify_down(i) from i = n − 1 down to 0 costs Σ height(i) = lg(nⁿ/n!) = O(n), so "can build heap in O(n) time" — but this "Doesn't speed up O(n lg n) performance of heap sort". MIT also states that the "Height of complete tree … of n item is ⌈lg n⌉". — [MIT Lecture 8 (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/40d4851e550507ca14dc778b9b2266cc_MIT6_006S20_lec8.pdf)
- Wikipedia gives the same 0-based and 1-based index formulas. Floyd's bottom-up build is O(n), with the analysis using "∑ h/2^h = 2", while repeated insertion is O(n log n). Insert is O(log n) worst case and O(1) on average. Extract is O(log n). Increase-key and decrease-key are O(log n). — [Wikipedia: Binary heap](https://en.wikipedia.org/wiki/Binary_heap)
- Heapsort is O(n log n) in the worst, average and best case (distinct keys), with O(1) auxiliary space. It is "an in-place algorithm" and "not a stable sort". "A well-implemented quicksort is usually 2–3 times faster than heapsort", mainly because of cache locality. Bottom-up heapsort needs about "n log₂ n + O(1) comparisons on average", against "2n log₂ n + O(n)" for the standard version. — [Wikipedia: Heapsort](https://en.wikipedia.org/wiki/Heapsort)
- VisuAlgo's heap page uses a 1-based array ("To simplify the navigation operations below, we use 1-based array"). It credits the O(N) Create(A) to "Robert W. Floyd in 1964" and says "HeapSort() clearly runs in O(N log N) — an optimal comparison-based sorting algorithm". — [VisuAlgo: Binary Heap](https://visualgo.net/en/heap)
- MIT 6.006 S20 Quiz 1, Problem 4(a) official solution: the max-heap is "Before: [93, 85, 38, 23, 63, 11, 13, 17]" and "After: [85, 63, 38, 23, 17, 11, 13]" delete_max. The listed common mistakes are "confusing heap order with traversal order" and not swapping the root with the last leaf before heapifying down. — [MIT 6.006 S20 Quiz 1 solutions (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf)

### Inferences

#### Pseudocode (CLRS 3rd-edition style, 1-based, A.heap-size ≤ A.length)
```
PARENT(i)   return ⌊i/2⌋
LEFT(i)     return 2i
RIGHT(i)    return 2i + 1

MAX-HEAPIFY(A, i)                       // assumes the subtrees at LEFT(i) and RIGHT(i) are max-heaps
1  l = LEFT(i)
2  r = RIGHT(i)
3  if l <= A.heap-size and A[l] > A[i]
4      largest = l
5  else largest = i
6  if r <= A.heap-size and A[r] > A[largest]
7      largest = r
8  if largest != i
9      exchange A[i] with A[largest]
10     MAX-HEAPIFY(A, largest)

BUILD-MAX-HEAP(A)
1  A.heap-size = A.length
2  for i = ⌊A.length / 2⌋ downto 1        // nodes ⌊n/2⌋+1 .. n are leaves
3      MAX-HEAPIFY(A, i)

HEAPSORT(A)
1  BUILD-MAX-HEAP(A)
2  for i = A.length downto 2
3      exchange A[1] with A[i]
4      A.heap-size = A.heap-size - 1
5      MAX-HEAPIFY(A, 1)

HEAP-MAXIMUM(A)
1  return A[1]

HEAP-EXTRACT-MAX(A)
1  if A.heap-size < 1
2      error "heap underflow"
3  max = A[1]
4  A[1] = A[A.heap-size]
5  A.heap-size = A.heap-size - 1
6  MAX-HEAPIFY(A, 1)
7  return max

HEAP-INCREASE-KEY(A, i, key)
1  if key < A[i]
2      error "new key is smaller than current key"
3  A[i] = key
4  while i > 1 and A[PARENT(i)] < A[i]
5      exchange A[i] with A[PARENT(i)]
6      i = PARENT(i)

MAX-HEAP-INSERT(A, key)
1  A.heap-size = A.heap-size + 1
2  A[A.heap-size] = -∞
3  HEAP-INCREASE-KEY(A, A.heap-size, key)
```
In 0-based code, use parent(i) = ⌊(i−1)/2⌋, left(i) = 2i + 1 and right(i) = 2i + 2. The build loop then runs i = ⌊n/2⌋ − 1 down to 0, and the leaves are indices ⌊n/2⌋ … n − 1.

#### Verified trace 1: MAX-HEAPIFY(A, 2) on ⟨16, 4, 10, 14, 7, 9, 3, 2, 8, 1⟩
```
    MAX-HEAPIFY at i=2: exchange A[2]=4 <-> A[4]=14
    MAX-HEAPIFY at i=4: exchange A[4]=4 <-> A[9]=8
    MAX-HEAPIFY at i=9: no exchange (heap property holds)
result: [16, 14, 10, 8, 7, 9, 3, 2, 4, 1] is max-heap: True
```

#### Verified trace 2: BUILD-MAX-HEAP on ⟨4, 1, 3, 2, 16, 9, 10, 14, 8, 7⟩ (n = 10, loop i = 5 down to 1)
```
  i=5 (A[i]=16):
    MAX-HEAPIFY at i=5: no exchange (heap property holds)
    array: [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]
  i=4 (A[i]=2):
    MAX-HEAPIFY at i=4: exchange A[4]=2 <-> A[8]=14
    MAX-HEAPIFY at i=8: no exchange (heap property holds)
    array: [4, 1, 3, 14, 16, 9, 10, 2, 8, 7]
  i=3 (A[i]=3):
    MAX-HEAPIFY at i=3: exchange A[3]=3 <-> A[7]=10
    MAX-HEAPIFY at i=7: no exchange (heap property holds)
    array: [4, 1, 10, 14, 16, 9, 3, 2, 8, 7]
  i=2 (A[i]=1):
    MAX-HEAPIFY at i=2: exchange A[2]=1 <-> A[5]=16
    MAX-HEAPIFY at i=5: exchange A[5]=1 <-> A[10]=7
    MAX-HEAPIFY at i=10: no exchange (heap property holds)
    array: [4, 16, 10, 14, 7, 9, 3, 2, 8, 1]
  i=1 (A[i]=4):
    MAX-HEAPIFY at i=1: exchange A[1]=4 <-> A[2]=16
    MAX-HEAPIFY at i=2: exchange A[2]=4 <-> A[4]=14
    MAX-HEAPIFY at i=4: exchange A[4]=4 <-> A[9]=8
    MAX-HEAPIFY at i=9: no exchange (heap property holds)
    array: [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]
result: [16, 14, 10, 8, 7, 9, 3, 2, 4, 1] is max-heap: True stats: {'cmp': 14, 'xchg': 7}
```

#### Verified trace 3: HEAPSORT on ⟨4, 1, 3, 2, 16, 9, 10, 14, 8, 7⟩ (array after each iteration of the for loop)
```
after BUILD-MAX-HEAP: [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]
i=10: heap [14, 8, 10, 4, 7, 9, 3, 2, 1] | sorted [16]
i= 9: heap [10, 8, 9, 4, 7, 1, 3, 2] | sorted [14, 16]
i= 8: heap [9, 8, 3, 4, 7, 1, 2] | sorted [10, 14, 16]
i= 7: heap [8, 7, 3, 4, 2, 1] | sorted [9, 10, 14, 16]
i= 6: heap [7, 4, 3, 1, 2] | sorted [8, 9, 10, 14, 16]
i= 5: heap [4, 2, 3, 1] | sorted [7, 8, 9, 10, 14, 16]
i= 4: heap [3, 2, 1] | sorted [4, 7, 8, 9, 10, 14, 16]
i= 3: heap [2, 1] | sorted [3, 4, 7, 8, 9, 10, 14, 16]
i= 2: heap [1] | sorted [2, 3, 4, 7, 8, 9, 10, 14, 16]
sorted: [1, 2, 3, 4, 7, 8, 9, 10, 14, 16]
```
The "array after the k-th iteration" is the heap part followed by the sorted part. For example, after the first iteration it is [14, 8, 10, 4, 7, 9, 3, 2, 1, 16].

#### Verified trace 4: priority-queue operations
HEAP-INCREASE-KEY(A, 9, 15) on ⟨16, 14, 10, 8, 7, 9, 3, 2, 4, 1⟩:
```
  set A[9]=15: [16, 14, 10, 8, 7, 9, 3, 2, 15, 1]
  A[4]=8 < A[9]=15 -> exchange
    [16, 14, 10, 15, 7, 9, 3, 2, 8, 1]
  A[2]=14 < A[4]=15 -> exchange
    [16, 15, 10, 14, 7, 9, 3, 2, 8, 1]
result: [16, 15, 10, 14, 7, 9, 3, 2, 8, 1] is max-heap: True
```
HEAP-EXTRACT-MAX on ⟨15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1⟩:
```
  max=15; move A[12] to root: [1, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2]
    MAX-HEAPIFY at i=1: exchange A[1]=1 <-> A[2]=13
    MAX-HEAPIFY at i=2: exchange A[2]=1 <-> A[5]=12
    MAX-HEAPIFY at i=5: exchange A[5]=1 <-> A[10]=6
    MAX-HEAPIFY at i=10: no exchange (heap property holds)
  result: [13, 12, 9, 5, 6, 8, 7, 4, 0, 1, 2]
returned 15 heap: [13, 12, 9, 5, 6, 8, 7, 4, 0, 1, 2] is max-heap: True
```
MAX-HEAP-INSERT(A, 10) on ⟨15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1⟩:
```
  append -inf at index 13
  set A[13]=10: [15, 13, 9, 5, 12, 8, 7, 4, 0, 6, 2, 1, 10]
  A[6]=8 < A[13]=10 -> exchange
    [15, 13, 9, 5, 12, 10, 7, 4, 0, 6, 2, 1, 8]
  A[3]=9 < A[6]=10 -> exchange
    [15, 13, 10, 5, 12, 9, 7, 4, 0, 6, 2, 1, 8]
result: [15, 13, 10, 5, 12, 9, 7, 4, 0, 6, 2, 1, 8] is max-heap: True
```
Cross-check against MIT Quiz 1 P4(a). The array contents are the same in 0-based and 1-based form, and my output matches the official answer:
```
  max=93; move A[8] to root: [17, 85, 38, 23, 63, 11, 13]
    MAX-HEAPIFY at i=1: exchange A[1]=17 <-> A[2]=85
    MAX-HEAPIFY at i=2: exchange A[2]=17 <-> A[5]=63
    MAX-HEAPIFY at i=5: no exchange (heap property holds)
  result: [85, 63, 38, 23, 17, 11, 13]
```

#### Why BUILD-MAX-HEAP is O(n), not O(n lg n)
1. The naive bound is n/2 calls × O(lg n) = O(n lg n). It is correct but not tight.
2. A heap has at most ⌈n/2^{h+1}⌉ nodes of height h, and MAX-HEAPIFY on a node of height h costs O(h).
3. So the total is Σ_{h=0}^{⌊lg n⌋} ⌈n/2^{h+1}⌉·O(h) = O(n · Σ_{h≥0} h/2^h) = O(n · 2) = O(n).
4. The sum Σ_{h≥0} h·x^h = x/(1−x)² equals 2 at x = 1/2. Verified partial sums: 0.5, 1.375, 1.93, 1.9995, …
5. Intuition: half of the nodes are leaves and cost 0, a quarter have height 1, and so on. Most of the work happens near the bottom, where paths are short.
6. Exact form, verified for every n < 3000: the sum of all node heights equals n − (number of 1-bits in n), which is < n. So BUILD-MAX-HEAP makes fewer than n exchanges, and with at most 2 comparisons per level, fewer than 2n comparisons. This matches the algs4 bounds.
7. Measured worst case over 20 random arrays for each n:

   | n | max comparisons | 2n | max exchanges | sum of heights |
   |---|---|---|---|---|
   | 10 | 15 | 20 | 7 | 8 |
   | 100 | 186 | 200 | 75 | 97 |
   | 1,000 | 1,896 | 2,000 | 767 | 994 |
   | 10,000 | 18,890 | 20,000 | 7,549 | 9,995 |
8. Why the loop runs downward from ⌊n/2⌋: MAX-HEAPIFY(i) requires both child subtrees to be heaps already. That holds only if the loop processes nodes bottom-up. Nodes ⌊n/2⌋+1..n are leaves, which are already one-element heaps.
9. Building by n repeated inserts is Θ(n lg n) in the worst case (MIT's Σ depth = lg(n!)).

#### Other heap facts (verified)
- **MAX-HEAPIFY recurrence:** T(n) ≤ T(2n/3) + Θ(1) = O(lg n). The 2n/3 is the largest possible child subtree, which occurs when the last level is exactly half full. Measured fraction of the root's left subtree: n = 11 gives 7/11 = 0.636, n = 95 gives 0.663, n = 3071 gives 0.6666.
- **Height:** The height is ⌊lg n⌋ edges. For example, n = 10 gives height 3 with 4 levels. A heap of height h holds between 2^h and 2^{h+1} − 1 elements. MIT's "⌈lg n⌉" is a different convention: n = 8 gives ⌈lg 8⌉ = 3 = ⌊lg 8⌋, but n = 10 gives ⌈lg 10⌉ = 4 ≠ ⌊lg 10⌋ = 3.
- **Leaves (1-based):** ⌊n/2⌋+1 … n. Verified: n = 9 gives 5..9, n = 10 gives 6..10, n = 13 gives 7..13.
- **Heapsort comparisons on random input** (measured), all below algs4's 2n lg n + 2n:

  | n | comparisons | ratio to n lg n |
  |---|---|---|
  | 100 | 1,030 | 1.55 |
  | 1,000 | 16,807 | 1.69 |
  | 10,000 | 235,395 | 1.77 |
- **Heapsort running time:** BUILD costs O(n), and each of the n − 1 extract steps costs O(lg n), for O(n lg n) total. It stays Θ(n lg n) for distinct keys even when the input is sorted, so heapsort is not adaptive.

### Gaps
- I could not cite CLRS's own statements of the 2n/3 bound, the ⌈n/2^{h+1}⌉ node count, or its pseudocode. These were reconstructed and then checked numerically or by script.

---

## 5. Counting sort, radix sort and bucket sort

### Takeaway
These algorithms beat Ω(n lg n) because they do not compare keys.
- **Counting sort** is Θ(n + k). It needs integer keys in 0..k, and it is stable only because the placement loop runs right to left.
- **LSD radix sort** applies a stable sort (counting sort) to each of d digits, least significant first, for Θ(d(n + k)). It is wrong if the per-digit sort is unstable or if the digits are processed most significant first.
- **Bucket sort** is expected Θ(n) only when the inputs are uniform on [0, 1). Its worst case is Θ(n²) when all keys land in one bucket that is insertion-sorted.

### Cited Findings
- Counting sort has three loops. The first counts each key value. The second takes prefix sums, "count[i] = count[i] + count[i − 1]". The third "loops over the items of input again, but in reverse order, moving each item into its sorted position", so "the relative order of items with equal keys is preserved here; i.e., this is a stable sort". Time is "O(n + k)" and space is "also O(n + k)". It "is often used as a subroutine in radix sort". — [Wikipedia: Counting sort](https://en.wikipedia.org/wiki/Counting_sort)
- MIT explains why stability matters. Tuple sort works "Least significant to most significant!"; the auxiliary sort must be stable, meaning "repeated keys appear in output in same order as input"; and "Stability ensures previous sorts stay sorted". "Direct access array sort cannot even sort arrays having repeated keys!" Counting sort stores a chain per key, and "For stability, chain data structure should remember the order in which items were added". Radix sort with base-n digits runs in O(cn), and "If c is constant, so each key is ≤ n^c, this sort is linear O(n)!" — [MIT 6.006 S20 Lecture 5 (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf)
- MIT's table lists Counting Sort as n+u, in-place N, stable Y, "O(n) when u = O(n)", and Radix Sort as n + n log_n(u), in-place N, stable Y, "O(n) when u = O(n^c)". — [MIT Lecture 5 (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf)
- Radix sort is "a non-comparative sorting algorithm". "LSD sorts are generally stable sorts" while "MSD sorts are not necessarily stable". It runs in Θ(d(n + k)), also written O(d·n). — [Wikipedia: Radix sort](https://en.wikipedia.org/wiki/Radix_sort)
- VisuAlgo gives counting sort's cost as "O(N+k)... which is O(N) if k is small" and radix sort's as "O(w × (N+k))" iterations. — [VisuAlgo: Sorting](https://visualgo.net/en/sorting)
- Bucket sort's worst case "occurs when all the elements are placed in a single bucket", costing O(n²) with insertion sort. Under a uniform distribution the expected cost is O(n + n²/k + k), which is O(n) when k ≈ n. With one bucket per key value it degenerates into counting sort, and with two buckets it behaves like quicksort with the midpoint as pivot. Wikipedia lists it among stable sorts, which holds when the per-bucket sort is stable. — [Wikipedia: Bucket sort](https://en.wikipedia.org/wiki/Bucket_sort)
- algs4's §5.1 page (key-indexed counting and LSD) states that it is "under major construction" and showed only code links and exercises in my fetch. — [algs4 §5.1](https://algs4.cs.princeton.edu/51radix/)
- MIT Quiz 1 P5(a), official solution: friend numbers are "non-negative integers less than n, so we can use counting sort to sort the students in worst-case O(n) time. (Radix sort also works …)". P5(d): for keys bounded by a polynomial in n, "we can use radix sort … in worst-case O(n) time". The listed common mistake there is treating 2^{3⌈log n⌉+4} as O(n) and using counting sort. — [MIT Quiz 1 solutions (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf)

### Inferences

#### Pseudocode (CLRS 3rd-edition style)
```
COUNTING-SORT(A, B, k)                  // keys are integers in 0..k; output goes to B[1..n]
1  let C[0 .. k] be a new array
2  for i = 0 to k
3      C[i] = 0
4  for j = 1 to A.length
5      C[A[j]] = C[A[j]] + 1
6  // C[i] now contains the number of elements equal to i.
7  for i = 1 to k
8      C[i] = C[i] + C[i - 1]
9  // C[i] now contains the number of elements less than or equal to i.
10 for j = A.length downto 1             // RIGHT TO LEFT -> stable
11     B[C[A[j]]] = A[j]
12     C[A[j]] = C[A[j]] - 1

RADIX-SORT(A, d)                        // digit 1 is the lowest-order digit
1  for i = 1 to d
2      use a stable sort to sort array A on digit i

BUCKET-SORT(A)                          // assumes 0 <= A[i] < 1, ideally uniform
1  n = A.length
2  let B[0 .. n - 1] be a new array
3  for i = 0 to n - 1
4      make B[i] an empty list
5  for i = 1 to n
6      insert A[i] into list B[⌊n · A[i]⌋]   // append at the tail keeps it stable
7  for i = 0 to n - 1
8      sort list B[i] with insertion sort
9  concatenate the lists B[0], B[1], ..., B[n - 1] together in order
```
Costs:
- **Counting sort:** Θ(k) + Θ(n) + Θ(k) + Θ(n) = Θ(n + k). It is linear when k = O(n), and it is not in place because B and C take Θ(n + k) extra space.
- **Radix sort:** d passes × Θ(n + k) = Θ(d(n + k)).
  - For b-bit keys split into r-bit digits, the cost is Θ((b/r)(n + 2^r)).
  - Choosing r ≈ lg n (when b ≥ lg n) gives Θ(bn / lg n).
  - Example with n = 10⁶ 32-bit keys: r = 8 means 4 passes with k = 256, and r = 16 means 2 passes with k = 65,536.

#### Verified trace 1: COUNTING-SORT on ⟨2a, 5, 3a, 0a, 2b, 3b, 0b, 3c⟩, k = 5 (letters tag equal keys)
```
  C after counting   (index 0..5): [2, 0, 2, 3, 0, 1]
  C after prefix sums (index 0..5): [2, 2, 4, 7, 7, 8]
  j= 8: A[j]=  3c (key 3) -> B[7]; C[3]=6; B=[., ., ., ., ., ., 3c, .]
  j= 7: A[j]=  0b (key 0) -> B[2]; C[0]=1; B=[., 0b, ., ., ., ., 3c, .]
  j= 6: A[j]=  3b (key 3) -> B[6]; C[3]=5; B=[., 0b, ., ., ., 3b, 3c, .]
  j= 5: A[j]=  2b (key 2) -> B[4]; C[2]=3; B=[., 0b, ., 2b, ., 3b, 3c, .]
  j= 4: A[j]=  0a (key 0) -> B[1]; C[0]=0; B=[0a, 0b, ., 2b, ., 3b, 3c, .]
  j= 3: A[j]=  3a (key 3) -> B[5]; C[3]=4; B=[0a, 0b, ., 2b, 3a, 3b, 3c, .]
  j= 2: A[j]=   5 (key 5) -> B[8]; C[5]=7; B=[0a, 0b, ., 2b, 3a, 3b, 3c, 5]
  j= 1: A[j]=  2a (key 2) -> B[3]; C[2]=2; B=[0a, 0b, 2a, 2b, 3a, 3b, 3c, 5]
output B: [0a, 0b, 2a, 2b, 3a, 3b, 3c, 5]
```
After prefix sums, C[i] is the last output position for key i. When the placement loop ends, C[i] = (number of elements < i). Running line 10 left to right with the same decrement still sorts by key, but it reverses equal keys. Verified on the Practice Problem 17 input: the result is [0, 1b, 1a, 2, 3b, 3a, 4c, 4b, 4a].

#### Verified trace 2: LSD RADIX-SORT on ⟨329, 457, 657, 839, 436, 720, 355⟩ (d = 3, counting sort per digit, k = 9)
```
after sorting on digit 1: [720, 355, 436, 457, 657, 329, 839]
after sorting on digit 2: [720, 329, 436, 839, 355, 457, 657]
after sorting on digit 3: [329, 355, 436, 457, 657, 720, 839]
```
Detail of pass 1 (counting sort on the ones digit):
```
  C after counting   (index 0..9): [1, 0, 0, 0, 0, 1, 1, 2, 0, 2]
  C after prefix sums (index 0..9): [1, 1, 1, 1, 1, 2, 3, 5, 5, 7]
  j= 7: A[j]= 355 (key 5) -> B[2]; C[5]=1; B=[., 355, ., ., ., ., .]
  j= 6: A[j]= 720 (key 0) -> B[1]; C[0]=0; B=[720, 355, ., ., ., ., .]
  j= 5: A[j]= 436 (key 6) -> B[3]; C[6]=2; B=[720, 355, 436, ., ., ., .]
  j= 4: A[j]= 839 (key 9) -> B[7]; C[9]=6; B=[720, 355, 436, ., ., ., 839]
  j= 3: A[j]= 657 (key 7) -> B[5]; C[7]=4; B=[720, 355, 436, ., 657, ., 839]
  j= 2: A[j]= 457 (key 7) -> B[4]; C[7]=3; B=[720, 355, 436, 457, 657, ., 839]
  j= 1: A[j]= 329 (key 9) -> B[6]; C[9]=5; B=[720, 355, 436, 457, 657, 329, 839]
```
Why stability matters, verified. The same radix sort with an unstable digit sort (the counting sort placement loop run left to right) gives a wrong final answer:
```
after sorting on digit 1: [720, 355, 436, 657, 457, 839, 329]
after sorting on digit 2: [329, 720, 839, 436, 457, 657, 355]
after sorting on digit 3: [355, 329, 457, 436, 657, 720, 839]     <- NOT sorted (355 before 329, 457 before 436)
```
Correctness argument (induction on passes): after pass i, the keys are sorted by their last i digits. In pass i + 1, keys with different (i+1)-th digits are ordered by that digit. Keys with the same (i+1)-th digit keep their relative order from pass i, but only if the sort is stable, and that order is already correct on the last i digits.

#### Verified trace 3: BUCKET-SORT on ⟨.78, .17, .39, .26, .72, .94, .21, .12, .23, .68⟩ (n = 10, bucket index ⌊10·x⌋)
```
  B[1] before sort: .17, .12
  B[2] before sort: .26, .21, .23
  B[3] before sort: .39
  B[6] before sort: .68
  B[7] before sort: .78, .72
  B[9] before sort: .94
  B[0] after  sort: /
  B[1] after  sort: .12, .17
  B[2] after  sort: .21, .23, .26
  B[3] after  sort: .39
  B[4] after  sort: /
  B[5] after  sort: /
  B[6] after  sort: .68
  B[7] after  sort: .72, .78
  B[8] after  sort: /
  B[9] after  sort: .94
  concatenated: .12, .17, .21, .23, .26, .39, .68, .72, .78, .94
```

#### Why bucket sort is expected Θ(n)
- T(n) = Θ(n) + Σ_{i=0}^{n−1} O(n_i²), where n_i is the size of bucket i.
- For uniform input, n_i ~ Binomial(n, 1/n), so E[n_i²] = Var + E² = (1 − 1/n) + 1 = 2 − 1/n.
- Therefore E[T(n)] = Θ(n) + n·O(2 − 1/n) = Θ(n).
- Monte Carlo check of Σ n_i², which should be 2n − 1:

  | n | measured mean | 2n − 1 |
  |---|---|---|
  | 10 | 18.94 | 19 |
  | 100 | 198.94 | 199 |
  | 1,000 | 1,997.82 | 1,999 |
- If every key falls into one bucket, the cost is Θ(n²) with insertion sort, or O(n lg n) if the buckets are merge-sorted instead.
- The "expected" is over the input distribution, not over coin flips as in randomized quicksort.

#### MIT example caution (verified)
MIT Lecture 5's tuple-sort exercise reads "[32, 03, 44, 42, 22] ⟹ [42, 22, 32, 03, 44] ⟹ [03, 22, 32, 42, 44]". The final list is correct, but a stable pass on the low digit actually gives [32, 42, 22, 03, 44], since 32 comes before 42 and 22 in the input. Do not copy that intermediate line as a stable-sort trace.

### Gaps
- The algs4 §5.1 text on key-indexed counting and LSD (its proposition on array accesses) was not available ("under major construction"), so no algs4 cost formula is cited for LSD.
- CLRS's lemma on choosing r for b-bit keys is stated from memory, not quoted.

---

## 6. The decision-tree Ω(n lg n) lower bound for comparison sorting

### Takeaway
Any comparison sort can be drawn as a binary decision tree. The tree needs at least n! leaves, one per permutation, so its height, which is the worst-case number of comparisons, is at least lg(n!) = Θ(n lg n). Merge sort and heapsort meet this bound, so they are asymptotically optimal. Counting, radix and bucket sort escape the bound because they do not use only comparisons.

### Cited Findings
- MIT: "Comparison model implies that algorithm decision tree is binary (constant branching factor)"; "Requires # leaves L ≥ # possible outputs"; "Tree height lower bounded by Ω(log L), so worst-case running time is Ω(log L)"; "To sort array of n elements, # outputs is n! permutations"; "Thus height lower bounded by log(n!) ≥ log((n/2)^{n/2}) = Ω(n log n)"; "So merge sort is optimal in comparison model". — [MIT 6.006 S20 Lecture 5 (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf)
- "No compare-based sorting algorithm can guarantee to sort N items with fewer than lg(N!) ~ N lg N compares." "Mergesort is an asymptotically optimal compare-based sorting algorithm." — [algs4 §2.2](https://algs4.cs.princeton.edu/22mergesort/)
- From 2^f(n) ≥ n! it follows that f(n) ≥ log₂(n!) ≈ n log₂ n − 1.443n. The bound is asymptotically tight. The minimum worst-case comparison counts for n = 3, 4, 5 are 3, 5 and 7. For n = 13 the bound gives 33, but 34 comparisons are actually needed. Non-comparison sorts such as counting sort are not subject to the bound. — [Wikipedia: Comparison sort](https://en.wikipedia.org/wiki/Comparison_sort)
- MIT Quiz 1 P5(b), official solution: "A scale weighing is a comparison with a constant number of outcomes, so the comparison sort Ω(n log n) lower bound applies." P5(c), where an oracle returns the bravest of any set in O(1), is solvable in O(n) "priority queue sort". The listed common mistake there is "Arguing a Ω(n log n) lower bound". — [MIT Quiz 1 solutions (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf)

### Inferences

#### Proof (exam form)
1. **Model.** A comparison sort gets information about the input only through comparisons a_i ≤ a_j. Fix n. Each internal node of the decision tree is a comparison, each branch is an outcome, and each leaf is an output permutation.
2. **Leaves.** A correct algorithm must be able to produce each of the n! permutations of distinct inputs, so the tree has L ≥ n! reachable leaves.
3. **Height.** A binary tree of height h has at most 2^h leaves, so 2^h ≥ L ≥ n!, which gives h ≥ lg(n!).
4. **Estimate.** n! ≥ (n/2)^{n/2}, so lg(n!) ≥ (n/2) lg(n/2) = Ω(n lg n). Stirling's formula gives lg(n!) = n lg n − n lg e + O(lg n).
5. **Conclusion.** The worst-case number of comparisons equals the tree height, so any comparison sort is Ω(n lg n) in the worst case. Heapsort and merge sort are O(n lg n), so they are asymptotically optimal.

#### Decision tree of INSERTION-SORT for n = 3 (verified by tracing all 6 orderings)
```
                       a1 <= a2 ?
                  yes /          \ no
             a2 <= a3 ?           a1 <= a3 ?
           yes /    \ no        yes /    \ no
      <1,2,3>   a1 <= a3 ?   <2,1,3>   a2 <= a3 ?
              yes /   \ no           yes /   \ no
          <1,3,2>   <3,1,2>      <2,3,1>   <3,2,1>
```
Each leaf ⟨i, j, k⟩ means a_i ≤ a_j ≤ a_k. There are 6 = 3! leaves and the height is 3 = ⌈lg 6⌉. The shallowest leaves are at depth 2 = n − 1, which is the best case. In general the shallowest leaf has depth ≥ n − 1, because the comparisons made must connect all n elements to certify an order.

#### Numbers (verified)
| n | n! | ⌈lg n!⌉ (lower bound) | merge sort worst | insertion sort worst | n lg n |
|---|---|---|---|---|---|
| 3 | 6 | 3 | 3 | 3 | 4.8 |
| 4 | 24 | 5 | 5 | 6 | 8.0 |
| 5 | 120 | 7 | 8 | 10 | 11.6 |
| 6 | 720 | 10 | 11 | 15 | 15.5 |
| 8 | 40,320 | 16 | 17 | 28 | 24.0 |
| 10 | 3,628,800 | 22 | 25 | 45 | 33.2 |
| 12 | 479,001,600 | 29 | 33 | 66 | 43.0 |
| 100 | — | 525 | 573 | 4,950 | 664.4 |
| 1000 | — | 8,530 | 8,977 | 499,500 | 9,965.8 |

#### Extensions exams like
- **Average case.** The average leaf depth of a binary tree with n! leaves is also ≥ lg(n!), so the average case is Ω(n lg n) too.
- **Linear time on half the inputs is impossible.** If a sort ran in linear time on n!/2 inputs, it would need 2^h ≥ n!/2 leaves within depth h, so h ≥ lg(n!) − 1 = Ω(n lg n). The same holds for a 1/n or 1/2^n fraction of inputs, since lg(n!/2^n) is still Θ(n lg n).
- **Scope.** The bound covers comparison sorts only. Counting, radix and bucket sort use keys as array indices or digits, and stronger primitives such as a max-of-set oracle are not two-outcome comparisons.

### Gaps
- None material. The CLRS-exercise extensions (shallowest leaf, half the inputs) are standard reasoning shown here without a fetched citation.

---

## 7. Master complexity table and recurrences

### Takeaway
Only insertion sort is adaptive. Only insertion sort and merge sort are stable among the comparison sorts covered here, and only quicksort has a quadratic worst case with an n lg n average. Heapsort is the only one that is both in place and worst-case n lg n. Non-comparison sorts are linear only under assumptions on the keys: a small range k, a constant number of digits d, or a uniform distribution.

### Cited Findings
- Stable sorts are insertion sort and mergesort. Unstable ones are "selection sort, shellsort, quicksort, and heapsort". — [algs4 §2.5](https://algs4.cs.princeton.edu/25applications/)
- Selection sort is not stable because "It exchanges nonadjacent elements". — [algs4 §2.5](https://algs4.cs.princeton.edu/25applications/)
- Selection sort uses "~n²/2 compares and n exchanges". — [algs4 §2.1](https://algs4.cs.princeton.edu/21elementary/)
- Definitions: "A sorting algorithm is called stable if the relative order of elements with the same key value is preserved" and "A sorting algorithm is said to be in-place if it requires only a constant amount O(1) of extra space." — [VisuAlgo: Sorting](https://visualgo.net/en/sorting)
- Per-algorithm sources: insertion — [algs4 §2.1](https://algs4.cs.princeton.edu/21elementary/), [Wikipedia](https://en.wikipedia.org/wiki/Insertion_sort); quicksort — [algs4 §2.3](https://algs4.cs.princeton.edu/23quicksort/), [Wikipedia](https://en.wikipedia.org/wiki/Quicksort); merge sort — [algs4 §2.2](https://algs4.cs.princeton.edu/22mergesort/), [Wikipedia](https://en.wikipedia.org/wiki/Merge_sort); heapsort — [Wikipedia](https://en.wikipedia.org/wiki/Heapsort), [algs4 §2.4](https://algs4.cs.princeton.edu/24pq/); counting, radix and bucket — [MIT Lecture 5 table (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf), [Wikipedia counting](https://en.wikipedia.org/wiki/Counting_sort), [radix](https://en.wikipedia.org/wiki/Radix_sort), [bucket](https://en.wikipedia.org/wiki/Bucket_sort).

### Inferences

#### Master table (compiled from the cited sources plus the script checks in sections 1–6)
| Algorithm | Best | Average | Worst | Extra space | Stable? | In place? | Adaptive? |
|---|---|---|---|---|---|---|---|
| Insertion sort | Θ(n) (sorted) | Θ(n²) (~n²/4 cmp) | Θ(n²) (reverse; n(n−1)/2 cmp) | Θ(1) | Yes | Yes | Yes: Θ(n + I) |
| Quicksort (Lomuto, last-element pivot) | Θ(n lg n) | Θ(n lg n) (~1.39 n lg n cmp) | Θ(n²) (sorted, reverse, all-equal) | Θ(lg n) stack on average, Θ(n) worst; O(lg n) with smaller-side-first | No | Yes* | No (sorted input is the worst case) |
| Quicksort (Hoare, first-element pivot) | Θ(n lg n) | Θ(n lg n) | Θ(n²) (e.g., sorted input) | same as above | No | Yes* | No |
| Randomized quicksort | Θ(n lg n) | Θ(n lg n) expected on every input | Θ(n²) (negligible probability) | O(lg n) expected | No | Yes* | No |
| Merge sort (top-down or bottom-up) | Θ(n lg n) (≥ ½ n lg n cmp) | Θ(n lg n) | Θ(n lg n) (n⌈lg n⌉ − 2^⌈lg n⌉ + 1 cmp) | Θ(n) | Yes (with ≤) | No | No (natural merge sort is) |
| Heapsort | Θ(n lg n) (distinct keys) | Θ(n lg n) | Θ(n lg n) | Θ(1) | No | Yes | No |
| Counting sort | Θ(n + k) | Θ(n + k) | Θ(n + k) | Θ(n + k) | Yes (placement loop right to left) | No | n/a |
| LSD radix sort (counting sort per digit) | Θ(d(n + k)) | Θ(d(n + k)) | Θ(d(n + k)) | Θ(n + k) | Yes | No | n/a |
| Bucket sort (n buckets, insertion sort) | Θ(n) | Θ(n) expected (uniform input) | Θ(n²) (one bucket) | Θ(n) | Yes, if the bucket sort is stable | No | n/a |
| Selection sort (for comparison) | Θ(n²) | Θ(n²) | Θ(n²) (~n²/2 cmp, n exchanges) | Θ(1) | No | Yes | No |

*Quicksort partitions in place, so textbooks call it in place. Under VisuAlgo's strict "O(1) extra space" definition, its O(lg n) recursion stack disqualifies it. On an exam, say "in place (apart from the O(lg n) stack)".

#### Recurrences and solutions
| Algorithm / case | Recurrence | Solution | Method |
|---|---|---|---|
| Insertion sort, worst (recursive view) | T(n) = T(n−1) + Θ(n) | Θ(n²) | arithmetic series |
| Merge sort (all cases) | T(n) = 2T(n/2) + Θ(n) | Θ(n lg n) | recursion tree, all levels equal (master theorem case 2) |
| Quicksort, worst | T(n) = T(n−1) + T(0) + Θ(n) | Θ(n²) | Σ k = n(n−1)/2 |
| Quicksort, best | T(n) = 2T(n/2) + Θ(n) | Θ(n lg n) | master theorem case 2 |
| Quicksort, constant split α : 1−α | T(n) = T(αn) + T((1−α)n) + Θ(n) | Θ(n lg n) | each level ≤ cn, depth log_{1/max(α,1−α)} n |
| Quicksort, median-of-three worst | T(n) ≤ T(n−2) + T(1) + O(n) | O(n²) | Erickson |
| Quicksort, average or randomized | C(n) = n − 1 + (2/n) Σ_{k<n} C(k) | 2(n+1)H_n − 4n ≈ 1.39 n lg n | telescoping, or Σ_{i<j} 2/(j−i+1) |
| MAX-HEAPIFY | T(n) ≤ T(2n/3) + Θ(1) | O(lg n) | master theorem case 2 (a = 1, b = 3/2) |
| BUILD-MAX-HEAP | Σ_h ⌈n/2^{h+1}⌉·O(h) | O(n) | Σ h/2^h = 2 |
| HEAPSORT | O(n) + (n−1)·O(lg n) | O(n lg n) | — |
| Counting sort | Θ(k) + Θ(n) + Θ(k) + Θ(n) | Θ(n + k) | loops |
| Radix sort | d × Θ(n + k) | Θ(d(n + k)); Θ((b/r)(n + 2^r)) for b-bit keys | — |
| Bucket sort | Θ(n) + Σ O(n_i²) | expected Θ(n), since E[n_i²] = 2 − 1/n | indicator / binomial variance |

### Gaps
- Heapsort's best case for inputs with many equal keys was not verified; for example, all-equal keys make it linear. Wikipedia's "(distinct keys)" qualifier is the safe exam answer.

---

## 8. Common traps (cross-cutting checklist)

### Takeaway
Most lost marks come from conventions, not from concepts: 0-based vs 1-based indices, which pivot rule is in use, what counts as a "pass" or a "comparison", and the direction of loops (BUILD-MAX-HEAP downward, counting sort placement right to left, radix sort least significant digit first).

### Cited Findings
- MIT's official common mistakes on heaps include "confusing heap order with traversal order" and not swapping the root with the last leaf before heapifying down in delete. On a 10-item min-heap they include "Thinking the largest integer must be in the bottom level (instead of in any leaf)" and assuming the third smallest must be in B or C. — [MIT Quiz 1 solutions (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf)
- MIT's sorting common mistakes include "Using a sort that is not O(n)", "Insufficient justification for why O(n log n) is optimal", and "Arguing a Ω(n log n) lower bound" when an O(1) max-oracle exists. — [MIT Quiz 1 solutions (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf)
- "Hoare's partitioning algorithm is one of the places off-by-one errors go to die." — [Erickson Ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)
- With Hoare, the returned index "isn't necessarily where the actual pivot is". — [Wikipedia: Quicksort](https://en.wikipedia.org/wiki/Quicksort)
- Merge sort with a "decreasing-order copy" faster merge "is not stable". — [algs4 §2.2](https://algs4.cs.princeton.edu/22mergesort/)

### Inferences
Each item below is backed by the verified outputs in sections 1–6.

**Heaps**
1. **0-based vs 1-based heap formulas.** In 1-based form the children of i are 2i and 2i+1 and the leaves are ⌊n/2⌋+1..n. In 0-based form the children are 2i+1 and 2i+2 and the leaves are ⌊n/2⌋..n−1. Check which convention the question uses before computing anything.
2. **BUILD-MAX-HEAP loops downward, from ⌊n/2⌋ to 1.** An upward loop is wrong because MAX-HEAPIFY assumes both subtrees are already heaps.
3. **MAX-HEAPIFY swaps with the larger child**, and then continues down from that child's position.
4. **EXTRACT-MAX moves the last element to the root before sinking it.** It does not promote the larger child. INCREASE-KEY and INSERT swim up, comparing only with the parent. To decrease a key, sink it with MAX-HEAPIFY.
5. **Heapsort traces must respect heap-size.** After k iterations the last k slots hold the k largest keys in final order. Do not heapify into them.
6. **Height conventions differ:** ⌊lg n⌋ edges (CLRS style) vs MIT's ⌈lg n⌉.
7. **An O(n) build does not make heapsort O(n).** The n − 1 extractions cost Θ(n lg n).

**Quicksort**

8. **"Quicksort is Θ(n lg n)" holds only for the best, average or expected case.** Its worst case is Θ(n²). Randomization changes which inputs are bad, not the worst-case bound.
9. **Lomuto with a last-element pivot is quadratic on sorted, reverse-sorted and all-equal inputs.** Median-of-three fixes the first two but not all-equal input; Hoare or 3-way partitioning fixes all-equal input.
10. **Recursion bounds depend on the scheme.** Hoare's partition returns a split index: recurse on (p, q) and (q+1, r). Using (p, q−1) gave an unsorted result in my test. Lomuto returns the pivot's final position: recurse on (p, q−1) and (q+1, r). Using (p, q) with Lomuto can loop forever when q = r.
11. **Comparison counts are fixed for Lomuto.** Lomuto PARTITION always makes exactly r − p comparisons. Hoare's count varies, because the scans may overshoot.
12. **Tail-recursion elimination with smaller-side-first bounds the stack**, to O(lg n), not the running time.

**Merge sort**

13. **Merge sort is Θ(n lg n) on every input**, so it is not adaptive, and it needs Θ(n) extra space, so it is not in place. It is stable only if ties take from the left (≤).
14. **Order of merges.** Top-down MERGE-SORT merges depth-first: the whole left half is finished before the right half starts. "Array after the 3rd merge" of ⟨5,2,4,7,1,3,2,6⟩ is [2,4,5,7,1,3,2,6]. Bottom-up merges level by level, so the two versions give different intermediate arrays unless n is a power of 2.
15. **Comparison counting conventions differ.** CLRS 3e MERGE with sentinels makes exactly r − p + 1 comparisons. The no-sentinel version makes between min(n₁, n₂) and n₁ + n₂ − 1. Ask which convention applies, or state yours.

**Insertion sort**

16. **"Pass" indexing.** The first pass is j = 2, and after pass k the first k+1 entries are sorted among themselves, though not yet in their final positions. In selection sort, by contrast, the prefix is final.
17. **Insertion-sort comparisons are not shifts.** A pass that ends with i = 0 makes no failing comparison. The total is I + (n − 1) − m (see section 1).

**Linear-time sorts**

18. **Counting sort's last loop runs from n down to 1** when C is decremented. Running it forward reverses equal keys, which breaks radix sort.
19. **LSD radix sort must start with the least significant digit and use a stable sort.** MSD-first passes with a stable sort leave the array sorted by the last digit processed (see Practice Problem 18).
20. **Linear-time sorts are linear only under conditions.** Counting sort needs k = O(n). Radix sort needs d constant and k = O(n). Bucket sort is linear only in expectation and only for uniform input; its worst case is Θ(n²).
21. **Counting sort's preconditions.** It needs integer keys in a known range. Negative keys need an offset, and real-valued keys need bucket sort or a comparison sort.

**Lower bound and definitions**

22. **The Ω(n lg n) bound applies only to comparison sorts**, in the worst and average case. It is not a bound on every way of sorting.
23. **Know which sorts are not stable:** selection sort, quicksort and heapsort. Shellsort, which is not on this syllabus, is also unstable.
24. **"In place" has two definitions.** Under the strict O(1) definition, recursive quicksort is not in place; under the textbook convention it is. State your definition.
25. **Do not copy MIT's tuple-sort intermediate line.** "[42, 22, 32, 03, 44]" is not what a stable last-digit pass produces (see section 5).

### Gaps
- I cannot know SOC3030's own conventions: which partition the slides use, whether "pass" counting starts at j = 2, and whether comparisons are counted with sentinels. Compare against the professor's Assignment #2 sample solution, which I did not see.

---

## 9. Twenty practice problems with full solutions (all answers verified by script)

### Takeaway
These problems cover the exam formats listed in the brief: full traces, "array after the k-th pass", comparison counts, stability and in-place questions, recurrences, heap index arithmetic, linear-time sorts, the lower bound, and "best choice for scenario X". Problem 12(d) is adapted from MIT 6.006's official Quiz 1, and its answers were re-verified by brute force.

### Cited Findings
- Source of the adapted problems in 12(d), 20(e) and the heap delete-max style: [MIT 6.006 S20 Quiz 1 solutions (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf). The official min-heap answers are A for the smallest, B–G for the 3rd smallest and F–J for the largest.
- Source of the "why is selection sort unstable" answer ("It exchanges nonadjacent elements"): [algs4 §2.5](https://algs4.cs.princeton.edu/25applications/)
- Source of the scenario guidance ("quicksort is the method of choice"; mergesort "if stability is important and space is available"): [algs4 §2.5](https://algs4.cs.princeton.edu/25applications/)

### Inferences

**Problem 1 (insertion sort trace and counts).** Run INSERTION-SORT on ⟨7, 4, 9, 2, 6, 3⟩. Give the array after each pass and the comparisons and shifts per pass.
*Solution.*
```
start          : [7, 4, 9, 2, 6, 3]
pass j=2 key=  4: 1 cmp, 1 shift -> [4, 7, 9, 2, 6, 3]
pass j=3 key=  9: 1 cmp, 0 shift -> [4, 7, 9, 2, 6, 3]
pass j=4 key=  2: 3 cmp, 3 shift -> [2, 4, 7, 9, 6, 3]
pass j=5 key=  6: 3 cmp, 2 shift -> [2, 4, 6, 7, 9, 3]
pass j=6 key=  3: 5 cmp, 4 shift -> [2, 3, 4, 6, 7, 9]
TOTAL: 13 comparisons, 10 shifts (inversions = 10)
```
Check: I = 10 and the new minima were 4 and 2, so the comparisons are 10 + 5 − 2 = 13.

**Problem 2 ("array after the k-th pass" and stability).** A = ⟨6, 5a, 3, 1, 8, 7, 2, 5b⟩, where 5a and 5b have equal keys. (a) What is the array after the 3rd pass? (b) After the 6th pass? (c) In what order do 5a and 5b end up? (d) How many comparisons and shifts are there in total?
*Solution.*
```
pass j=2 key= 5a: 1 cmp, 1 shift -> [5a, 6, 3, 1, 8, 7, 2, 5b]
pass j=3 key=  3: 2 cmp, 2 shift -> [3, 5a, 6, 1, 8, 7, 2, 5b]
pass j=4 key=  1: 3 cmp, 3 shift -> [1, 3, 5a, 6, 8, 7, 2, 5b]
pass j=5 key=  8: 1 cmp, 0 shift -> [1, 3, 5a, 6, 8, 7, 2, 5b]
pass j=6 key=  7: 2 cmp, 1 shift -> [1, 3, 5a, 6, 7, 8, 2, 5b]
pass j=7 key=  2: 6 cmp, 5 shift -> [1, 2, 3, 5a, 6, 7, 8, 5b]
pass j=8 key= 5b: 4 cmp, 3 shift -> [1, 2, 3, 5a, 5b, 6, 7, 8]
TOTAL: 19 comparisons, 15 shifts (inversions = 15)
```
(a) The 3rd pass is j = 4: [1, 3, 5a, 6, 8, 7, 2, 5b]. (b) The 6th pass is j = 7: [1, 2, 3, 5a, 6, 7, 8, 5b]. (c) 5a stays before 5b, because 5a > 5b is false, so 5b stops behind 5a. (d) 19 comparisons and 15 shifts (15 + 7 − 3 = 19).

**Problem 3 (insertion sort count formulas).** For n = 10 distinct keys, give the comparisons and shifts for (a) sorted input, (b) reverse-sorted input, (c) the average over random permutations, and (d) A = ⟨5, 1, 2, 3, 4, 8, 6, 7, 10, 9⟩.
*Solution.*
- (a) 9 comparisons, 0 shifts.
- (b) 45 comparisons, 45 shifts.
- (c) Shifts n(n−1)/4 = 22.5. Comparisons n(n−1)/4 + n − H₁₀ ≈ 22.5 + 10 − 2.929 = 29.57.
- (d) The verified run shows 7 inversions, so 7 shifts. There are 15 comparisons = 7 + 9 − 1, since only key 1, at j = 2, is a new minimum.
- In general, I ≤ comparisons ≤ I + n − 1.

**Problem 4 (Lomuto PARTITION trace).** Run PARTITION(A, 1, 8) on ⟨6, 3, 9, 1, 8, 2, 7, 5⟩. Show the array after each iteration, and give q, the number of comparisons and the number of exchanges.
*Solution.*
```
PARTITION(A,1,8): pivot x=A[8]=5; i=0
  j=1: A[j]=6 >  5: no change                         [6, 3, 9, 1, 8, 2, 7, 5]
  j=2: A[j]=3 <= 5: i=1, exchange A[1]=6 <-> A[2]=3     [3, 6, 9, 1, 8, 2, 7, 5]
  j=3: A[j]=9 >  5: no change                         [3, 6, 9, 1, 8, 2, 7, 5]
  j=4: A[j]=1 <= 5: i=2, exchange A[2]=6 <-> A[4]=1     [3, 1, 9, 6, 8, 2, 7, 5]
  j=5: A[j]=8 >  5: no change                         [3, 1, 9, 6, 8, 2, 7, 5]
  j=6: A[j]=2 <= 5: i=3, exchange A[3]=9 <-> A[6]=2     [3, 1, 2, 6, 8, 9, 7, 5]
  j=7: A[j]=7 >  5: no change                         [3, 1, 2, 6, 8, 9, 7, 5]
  final exchange A[4] <-> A[8]: [3, 1, 2, 5, 8, 9, 7, 6]  return q=4
{'cmp': 7, 'xchg': 4}
```
q = 4. There are 7 comparisons (r − p) and 4 exchanges: 3 on line 6 and the final one.

**Problem 5 (Hoare partition trace).** Run HOARE-PARTITION(A, 1, 8) on the same array. Show each exchange, the returned index and the recursive calls.
*Solution.*
```
HOARE-PARTITION(A,1,8): pivot x=A[1]=6; i=0, j=9
  stop at i=1 (A[i]=6), j=8 (A[j]=5); i<j -> exchange: [5, 3, 9, 1, 8, 2, 7, 6]
  stop at i=3 (A[i]=9), j=6 (A[j]=2); i<j -> exchange: [5, 3, 2, 1, 8, 9, 7, 6]
  stop at i=5 (A[i]=8), j=4 (A[j]=1); i>=j -> return j=4
final [5, 3, 2, 1, 8, 9, 7, 6] q = 4 {'cmp': 10, 'xchg': 2}
```
The returned index is q = 4, and the recursion is QUICKSORT(A, 1, 4) and QUICKSORT(A, 5, 8). The pivot 6 is at index 8, not at q. There are 2 exchanges, against Lomuto's 4, and 10 comparisons.

**Problem 6 (full quicksort).** Run QUICKSORT with Lomuto partition on ⟨6, 3, 9, 1, 8, 2, 7, 5⟩. List every partition result, the total number of comparisons and the deepest recursion level.
*Solution.*
```
QUICKSORT(A,1,8) -> q=4: A[1..8]=[3, 1, 2, 5, 8, 9, 7, 6]  whole=[3, 1, 2, 5, 8, 9, 7, 6]  (partition cmp = 7)
  QUICKSORT(A,1,3) -> q=2: A[1..3]=[1, 2, 3]  whole=[1, 2, 3, 5, 8, 9, 7, 6]  (partition cmp = 2)
  QUICKSORT(A,5,8) -> q=5: A[5..8]=[6, 9, 7, 8]  whole=[1, 2, 3, 5, 6, 9, 7, 8]  (partition cmp = 3)
    QUICKSORT(A,6,8) -> q=7: A[6..8]=[7, 8, 9]  whole=[1, 2, 3, 5, 6, 7, 8, 9]  (partition cmp = 2)
sorted [1, 2, 3, 5, 6, 7, 8, 9] {'cmp': 14, 'xchg': 9, 'maxdepth': 3}
```
There are 14 comparisons (7 + 2 + 3 + 2). The deepest call is at depth 3 with the root at depth 0, counting calls on 1-element subarrays. The array after the 2nd partition is [1, 2, 3, 5, 8, 9, 7, 6].

**Problem 7 (worst-case inputs).** QUICKSORT uses Lomuto PARTITION with the last element as pivot, n = 6. Count the comparisons for (a) ⟨1..6⟩, (b) ⟨6..1⟩, (c) six equal keys, and (d) ⟨3, 6, 1, 5, 2, 4⟩. Give the recurrence and a fix for each bad case.
*Solution.*
```
sorted   : cmp=15, depth=5, splits=[(5, 0), (4, 0), (3, 0), (2, 0), (1, 0)]
reverse  : cmp=15, depth=5, splits=[(0, 5), (4, 0), (0, 3), (2, 0), (0, 1)]
all equal: cmp=15, depth=5, splits=[(5, 0), (4, 0), (3, 0), (2, 0), (1, 0)]
example  : cmp=8, depth=2, splits=[(3, 2), (1, 1), (0, 1)]
```
- Cases (a)–(c) each take n(n−1)/2 = 15 comparisons. The recurrence is T(n) = T(n−1) + Θ(n), which gives Θ(n²).
- The reverse-sorted splits alternate between 0 | n−1 and n−1 | 0.
- Fixes: for (a) and (b), use a random pivot or median-of-three. For (c), use Hoare partition or 3-way partitioning; median-of-three does not help.

**Problem 8 (recurrences).** Solve: (a) T(n) = T(n−1) + n; (b) T(n) = 2T(n/2) + n; (c) T(n) = T(9n/10) + T(n/10) + n; (d) T(n) = T(n−2) + T(1) + n; (e) T(n) = T(2n/3) + 1; (f) C(n) = n − 1 + (2/n)Σ_{k=0}^{n−1} C(k).
*Solution.*
- (a) Θ(n²). Numerically, T(1024) = 524,799 ≈ n²/2 = 524,288.
- (b) Θ(n lg n). It equals n lg n exactly for n = 2^m with T(1) = 0; T(1024) = 10,240.
- (c) Θ(n lg n). Each level costs ≤ n and the depth is log_{10/9} n. Numerically, T(1024) = 19,250 ≈ 1.88 n lg n and T(16384) = 447,940 ≈ 1.95 n lg n, a bounded ratio.
- (d) Θ(n²). This is the median-of-three worst case.
- (e) Θ(lg n). This is the MAX-HEAPIFY bound, master theorem case 2 with a = 1 and b = 3/2.
- (f) 2(n+1)H_n − 4n ≈ 1.39 n lg n. The derivation is in section 2, and it was verified exactly for n ≤ 8.

**Problem 9 (merge sort trace).** Run MERGE-SORT on ⟨12, 7, 3, 15, 9, 1, 10, 4⟩. List the merges in execution order, give the array after the 3rd merge, and count the comparisons.
*Solution.*
```
MERGE(A,1,1,2): [12] + [7] -> [7, 12]  (1 cmp)   whole array: [7, 12, 3, 15, 9, 1, 10, 4]
MERGE(A,3,3,4): [3] + [15] -> [3, 15]  (1 cmp)   whole array: [7, 12, 3, 15, 9, 1, 10, 4]
MERGE(A,1,2,4): [7, 12] + [3, 15] -> [3, 7, 12, 15]  (3 cmp)   whole array: [3, 7, 12, 15, 9, 1, 10, 4]
MERGE(A,5,5,6): [9] + [1] -> [1, 9]  (1 cmp)   whole array: [3, 7, 12, 15, 1, 9, 10, 4]
MERGE(A,7,7,8): [10] + [4] -> [4, 10]  (1 cmp)   whole array: [3, 7, 12, 15, 1, 9, 4, 10]
MERGE(A,5,6,8): [1, 9] + [4, 10] -> [1, 4, 9, 10]  (3 cmp)   whole array: [3, 7, 12, 15, 1, 4, 9, 10]
MERGE(A,1,4,8): [3, 7, 12, 15] + [1, 4, 9, 10] -> [1, 3, 4, 7, 9, 10, 12, 15]  (6 cmp)   whole array: [1, 3, 4, 7, 9, 10, 12, 15]
total cmp 16
```
After the 3rd merge the array is [3, 7, 12, 15, 9, 1, 10, 4]. There are 16 comparisons in total; the worst case for n = 8 is 17.

**Problem 10 (merge comparisons).** (a) What are the minimum and maximum comparisons when merging sorted runs of sizes n₁ and n₂? (b) Count the comparisons for ⟨1,4,6,9⟩+⟨2,3,7,8⟩, ⟨2,3,5⟩+⟨10,11,12,13,14⟩ and ⟨1,2,3,20⟩+⟨4,5,6,7⟩. (c) What changes with CLRS 3e sentinels?
*Solution.*
- (a) Between min(n₁, n₂) and n₁ + n₂ − 1. This was verified over all interleavings.
- (b) The verified counts are 7, 3 and 7.
- (c) Each merge then takes exactly n₁ + n₂ = 8 comparisons.
```
[1, 4, 6, 9] + [2, 3, 7, 8] -> [1, 2, 3, 4, 6, 7, 8, 9] cmp: 7
[2, 3, 5] + [10, 11, 12, 13, 14] -> [2, 3, 5, 10, 11, 12, 13, 14] cmp: 3
[1, 2, 3, 20] + [4, 5, 6, 7] -> [1, 2, 3, 4, 5, 6, 7, 20] cmp: 7
```

**Problem 11 (bottom-up merge sort).** Run bottom-up merge sort on ⟨5, 1, 6, 2, 7, 3, 8, 4, 0⟩. Give the array after each pass, the number of passes and the total comparisons.
*Solution.*
```
pass 1 (run width 1 -> 2): [1, 5, 2, 6, 3, 7, 4, 8, 0]  (4 cmp)
pass 2 (run width 2 -> 4): [1, 2, 5, 6, 3, 4, 7, 8, 0]  (6 cmp)
pass 3 (run width 4 -> 8): [1, 2, 3, 4, 5, 6, 7, 8, 0]  (6 cmp)
pass 4 (run width 8 -> 16): [0, 1, 2, 3, 4, 5, 6, 7, 8]  (1 cmp)
total cmp 17
```
There are ⌈lg 9⌉ = 4 passes and 17 comparisons. The lone 0 waits until the last pass. Top-down would split 5 | 4 instead, so its intermediate arrays are different.

**Problem 12 (heap index arithmetic).** n = 13.
- (a) In 1-based form, find PARENT(13), the children of 5, the range of leaves, and the height.
- (b) In 0-based form, find parent(12), the children of 4, and the range of leaves.
- (c) What are the minimum and maximum numbers of elements in a heap of height h?
- (d) This part is adapted from MIT Quiz 1 P3. The array [A..J] is a min-heap on 10 distinct keys. Which positions can hold the smallest, 2nd smallest, 3rd smallest and largest key?

*Solution.*
- (a) PARENT(13) = 6; the children of 5 are 10 and 11; the leaves are 7..13; the height is ⌊lg 13⌋ = 3.
- (b) parent(12) = 5; the children of 4 are 9 and 10; the leaves are 6..12.
- (c) Between 2^h and 2^{h+1} − 1.
- (d) Smallest: A. 2nd smallest: B or C. 3rd smallest: any of B–G. Largest: any of F–J, which are the leaves.
- (d) was verified by enumerating all 3,360 min-heaps on 10 keys, and it matches MIT's official answers:
```
number of distinct min-heaps on 10 keys: 3360
rank 1: positions ['A']
rank 2: positions ['B', 'C']
rank 3: positions ['B', 'C', 'D', 'E', 'F', 'G']
rank 10: positions ['F', 'G', 'H', 'I', 'J']
```

**Problem 13 (is it a max-heap?).** (a) ⟨30, 20, 25, 15, 18, 22, 10, 5, 16, 3⟩ (b) ⟨23, 17, 14, 6, 13, 10, 1, 5, 7, 12⟩ (c) ⟨9, 8, 7, 6, 5, 4, 3, 2, 1⟩ (d) ⟨10, 9, 3, 8, 7, 2, 1⟩
*Solution.* For each i = 2..n, check A[⌊i/2⌋] ≥ A[i].
- (a) No: A[4] = 15 < A[9] = 16.
- (b) No: A[4] = 6 < A[9] = 7.
- (c) Yes: every descending array is a max-heap.
- (d) Yes.

**Problem 14 (BUILD-MAX-HEAP).** Run BUILD-MAX-HEAP on ⟨2, 8, 6, 1, 10, 15, 3, 12, 11⟩ and show the array after each MAX-HEAPIFY call.
*Solution.* Here n = 9, so the loop starts at ⌊9/2⌋ = 4.
```
  i=4 (A[i]=1):
    MAX-HEAPIFY at i=4: exchange A[4]=1 <-> A[8]=12
    MAX-HEAPIFY at i=8: no exchange (heap property holds)
    array: [2, 8, 6, 12, 10, 15, 3, 1, 11]
  i=3 (A[i]=6):
    MAX-HEAPIFY at i=3: exchange A[3]=6 <-> A[6]=15
    MAX-HEAPIFY at i=6: no exchange (heap property holds)
    array: [2, 8, 15, 12, 10, 6, 3, 1, 11]
  i=2 (A[i]=8):
    MAX-HEAPIFY at i=2: exchange A[2]=8 <-> A[4]=12
    MAX-HEAPIFY at i=4: exchange A[4]=8 <-> A[9]=11
    MAX-HEAPIFY at i=9: no exchange (heap property holds)
    array: [2, 12, 15, 11, 10, 6, 3, 1, 8]
  i=1 (A[i]=2):
    MAX-HEAPIFY at i=1: exchange A[1]=2 <-> A[3]=15
    MAX-HEAPIFY at i=3: exchange A[3]=2 <-> A[6]=6
    MAX-HEAPIFY at i=6: no exchange (heap property holds)
    array: [15, 12, 6, 11, 10, 2, 3, 1, 8]
result [15, 12, 6, 11, 10, 2, 3, 1, 8] True {'cmp': 12, 'xchg': 6}
```

**Problem 15 (heapsort iterations).** Continue Problem 14 with HEAPSORT. Give the array after each of the first 3 iterations, and the final result.
*Solution.*
```
after BUILD-MAX-HEAP: [15, 12, 6, 11, 10, 2, 3, 1, 8]
i= 9: heap [12, 11, 6, 8, 10, 2, 3, 1] | sorted [15]
i= 8: heap [11, 10, 6, 8, 1, 2, 3] | sorted [12, 15]
i= 7: heap [10, 8, 6, 3, 1, 2] | sorted [11, 12, 15]
i= 6: heap [8, 3, 6, 2, 1] | sorted [10, 11, 12, 15]
i= 5: heap [6, 3, 1, 2] | sorted [8, 10, 11, 12, 15]
i= 4: heap [3, 2, 1] | sorted [6, 8, 10, 11, 12, 15]
i= 3: heap [2, 1] | sorted [3, 6, 8, 10, 11, 12, 15]
i= 2: heap [1] | sorted [2, 3, 6, 8, 10, 11, 12, 15]
final [1, 2, 3, 6, 8, 10, 11, 12, 15]
```
The array after 3 iterations is [10, 8, 6, 3, 1, 2, 11, 12, 15].

**Problem 16 (priority-queue operations).** Start each part from H = ⟨20, 18, 15, 12, 9, 10, 7, 4, 8, 3⟩, which is a valid max-heap. Perform (a) HEAP-EXTRACT-MAX, (b) MAX-HEAP-INSERT(H, 19) and (c) HEAP-INCREASE-KEY(H, 9, 25).
*Solution.*
```
(a) EXTRACT-MAX
  max=20; move A[10] to root: [3, 18, 15, 12, 9, 10, 7, 4, 8]
    MAX-HEAPIFY at i=1: exchange A[1]=3 <-> A[2]=18
    MAX-HEAPIFY at i=2: exchange A[2]=3 <-> A[4]=12
    MAX-HEAPIFY at i=4: exchange A[4]=3 <-> A[9]=8
    MAX-HEAPIFY at i=9: no exchange (heap property holds)
  result: [18, 12, 15, 8, 9, 10, 7, 4, 3]
(b) INSERT 19
  append -inf at index 11
  set A[11]=19: [20, 18, 15, 12, 9, 10, 7, 4, 8, 3, 19]
  A[5]=9 < A[11]=19 -> exchange
    [20, 18, 15, 12, 19, 10, 7, 4, 8, 3, 9]
  A[2]=18 < A[5]=19 -> exchange
    [20, 19, 15, 12, 18, 10, 7, 4, 8, 3, 9]
(c) INCREASE-KEY(A, 9, 25)
  set A[9]=25: [20, 18, 15, 12, 9, 10, 7, 4, 25, 3]
  A[4]=12 < A[9]=25 -> exchange
    [20, 18, 15, 25, 9, 10, 7, 4, 12, 3]
  A[2]=18 < A[4]=25 -> exchange
    [20, 25, 15, 18, 9, 10, 7, 4, 12, 3]
  A[1]=20 < A[2]=25 -> exchange
    [25, 20, 15, 18, 9, 10, 7, 4, 12, 3]
```

**Problem 17 (counting sort).** Run COUNTING-SORT on ⟨4a, 1a, 3a, 4b, 0, 1b, 3b, 4c, 2⟩ with k = 5. Show C after counting and after prefix sums, every placement, the final B and the final C. What happens if line 10 runs j = 1 to n?
*Solution.*
```
  C after counting   (index 0..5): [1, 2, 1, 2, 3, 0]
  C after prefix sums (index 0..5): [1, 3, 4, 6, 9, 9]
  j= 9: A[j]=   2 (key 2) -> B[4]; C[2]=3; B=[., ., ., 2, ., ., ., ., .]
  j= 8: A[j]=  4c (key 4) -> B[9]; C[4]=8; B=[., ., ., 2, ., ., ., ., 4c]
  j= 7: A[j]=  3b (key 3) -> B[6]; C[3]=5; B=[., ., ., 2, ., 3b, ., ., 4c]
  j= 6: A[j]=  1b (key 1) -> B[3]; C[1]=2; B=[., ., 1b, 2, ., 3b, ., ., 4c]
  j= 5: A[j]=   0 (key 0) -> B[1]; C[0]=0; B=[0, ., 1b, 2, ., 3b, ., ., 4c]
  j= 4: A[j]=  4b (key 4) -> B[8]; C[4]=7; B=[0, ., 1b, 2, ., 3b, ., 4b, 4c]
  j= 3: A[j]=  3a (key 3) -> B[5]; C[3]=4; B=[0, ., 1b, 2, 3a, 3b, ., 4b, 4c]
  j= 2: A[j]=  1a (key 1) -> B[2]; C[1]=1; B=[0, 1a, 1b, 2, 3a, 3b, ., 4b, 4c]
  j= 1: A[j]=  4a (key 4) -> B[7]; C[4]=6; B=[0, 1a, 1b, 2, 3a, 3b, 4a, 4b, 4c]
B = [0, 1a, 1b, 2, 3a, 3b, 4a, 4b, 4c]
```
The final C is [0, 1, 3, 4, 6, 9], meaning C[i] = (number of keys < i). Running the loop forward gives [0, 1b, 1a, 2, 3b, 3a, 4c, 4b, 4a]. That is still sorted by key, but it is unstable: every group of equal keys comes out reversed.

**Problem 18 (LSD radix sort).** Run RADIX-SORT with counting sort per decimal digit on ⟨512, 307, 123, 456, 721, 89, 34, 700⟩. (a) Give the array after each pass. (b) What does an unstable digit sort produce? (c) What does MSD-first processing produce? (d) What is the cost for n = 10⁶ 32-bit keys?
*Solution.*
```
after sorting on digit 1: [700, 721, 512, 123, 34, 456, 307, 89]
after sorting on digit 2: [700, 307, 512, 721, 123, 34, 456, 89]
after sorting on digit 3: [34, 89, 123, 307, 456, 512, 700, 721]
unstable variant:
after sorting on digit 1: [700, 721, 512, 123, 34, 456, 307, 89]
after sorting on digit 2: [307, 700, 512, 123, 721, 34, 456, 89]
after sorting on digit 3: [89, 34, 123, 307, 456, 512, 721, 700]
MSD-first (wrong order of passes) with stable sort:
  after digit 3: [89, 34, 123, 307, 456, 512, 721, 700]
  after digit 2: [307, 700, 512, 123, 721, 34, 456, 89]
  after digit 1: [700, 721, 512, 123, 34, 456, 307, 89]
```
- (a) Treat 89 as 089 and 34 as 034; the passes are shown in the first block above.
- (b) The unstable version ends with 89 before 34 and 721 before 700, which is wrong.
- (c) MSD-first leaves the array sorted by the ones digit only.
- (d) With r = 8-bit digits: 4 passes with k = 256, so Θ(4(n + 256)). With r = 16-bit digits: 2 passes with k = 65,536, so Θ(2(n + 65,536)). Both are linear, compared with n lg n ≈ 2 × 10⁷ comparisons for a comparison sort.

**Problem 19 (bucket sort).** Run BUCKET-SORT on ⟨.45, .12, .87, .33, .91, .05, .48, .36, .62, .17⟩ with n = 10. Show the buckets and the output, then give a worst-case input and its cost, and explain why the expected cost is Θ(n).
*Solution.*
```
  B[0] before sort: .05
  B[1] before sort: .12, .17
  B[3] before sort: .33, .36
  B[4] before sort: .45, .48
  B[6] before sort: .62
  B[8] before sort: .87
  B[9] before sort: .91
  concatenated: .05, .12, .17, .33, .36, .45, .48, .62, .87, .91
```
- **Worst case:** If all 10 keys lie in [0.40, 0.50), they all land in B[4]. Insertion sort on n items then costs Θ(n²), up to 45 comparisons for n = 10.
- **Expected case:** For uniform input, E[n_i²] = 2 − 1/n, so the expected total is Θ(n).

**Problem 20 (concepts: stability, in place, scenarios, lower bound, models).**
- (a) Which of these are stable: insertion, selection, merge, quick, heap, counting, LSD radix, bucket?
- (b) Which are in place?
- (c) What is the best choice for each of the scenarios below?
- (d) For n = 4 and n = 5, what is the minimum worst-case number of comparisons? Can a comparison sort run in linear time on half of all inputs?
- (e) Which bound applies in each of the MIT-style models below?

*Solution.*
- (a) Stable: insertion, merge (with ≤), counting (placement loop right to left), LSD radix (if the digit sort is stable), and bucket (if items are appended in input order and each bucket is sorted stably). Not stable: selection ("It exchanges nonadjacent elements", per algs4), quicksort and heapsort.
- (b) In place: insertion, selection, heapsort, and quicksort (apart from its O(lg n) stack). Not in place: merge (Θ(n)), counting and radix (Θ(n + k)), and bucket (Θ(n)).
- (c) Scenarios:

  | Scenario | Best choice |
  |---|---|
  | Nearly sorted data (each item ≤ k places away) | insertion sort, Θ(nk) |
  | Guaranteed O(n lg n) with O(1) extra memory | heapsort |
  | Stability plus guaranteed O(n lg n) | merge sort |
  | Sorting a linked list | merge sort |
  | General in-memory data, fastest in practice | randomized quicksort (3-way if there are many duplicates) |
  | 10⁶ integers in 0..1000 | counting sort, Θ(n + k) |
  | 10⁶ ten-digit phone numbers or 32-bit integers | LSD radix sort |
  | 10⁶ floats uniform in [0, 1) | bucket sort, expected Θ(n) |
  | Subarrays smaller than about 10–15 inside quicksort or merge sort | insertion-sort cutoff |
  | Repeatedly needing the current maximum (scheduling, top-k) | binary heap |
  | Adversarial inputs | randomized quicksort, or heapsort / merge sort for a deterministic guarantee |
- (d) For n = 4 there are 24 leaves, so ⌈lg 24⌉ = 5 comparisons. For n = 5 there are 120 leaves, so ⌈lg 120⌉ = 7 comparisons. Linear time on half the inputs is impossible: 2^h ≥ n!/2 forces h ≥ lg(n!) − 1 = Ω(n lg n).
- (e) Models (adapted from MIT Quiz 1 P5):
  - Integer keys in [0, n): counting sort, Θ(n) worst case.
  - Only a balance scale (three outcomes): Ω(n lg n) applies, so use merge sort or heapsort.
  - An O(1) oracle that returns the maximum of any set: repeated max gives O(n), and the comparison lower bound does not apply.

### Gaps
- Apart from 12(d) and the MIT-derived models, these problems are original. There is no external answer key, but every trace and count was produced by the scripts. MIT's official solutions confirm 12(d) and the heap delete-max format (section 4).

---

## 10. Best free resources and visualizers

### Takeaway
For CLRS-style exam prep, use MIT 6.006 for lecture notes and real quizzes with official solutions, Erickson for free rigorous chapters on recursion, mergesort and quicksort, algs4 for exact comparison counts and stability facts, and VisuAlgo or the USF visualizations to replay traces. Check each tool's pivot and indexing convention before comparing it with an exam trace. CLRS itself should be bought or borrowed; do not use pirated PDFs.

### Cited Findings
- **MIT OCW 6.006 Introduction to Algorithms (Spring 2020; Demaine, Ku, Solomon).**
  - [Lecture 5: Linear Sorting (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf) covers the decision-tree lower bound, counting sort, radix sort and a summary table.
  - [Lecture 8: Binary Heaps (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/40d4851e550507ca14dc778b9b2266cc_MIT6_006S20_lec8.pdf) covers 0-based heaps, heap sort and linear build.
  - The [exams page](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/exams/) lists Quizzes 1–3 and the final, each with solutions, plus quiz reviews with solutions.
  - [Quiz 1 solutions (PDF)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf) includes heap problems and a "which sort is most efficient" problem.
- **Jeff Erickson, *Algorithms*** ([home page](https://jeffe.cs.illinois.edu/teaching/algorithms/)). The textbook is "licensed under a Creative Commons Attribution 4.0 International license", and the page says "Anyone is welcome to download, print, use, copy, and/or distribute anything on this page".
  - [Chapter 1 Recursion (PDF)](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf) covers mergesort, quicksort and recursion trees.
  - The [randomized algorithms / nuts-and-bolts notes (PDF)](http://jeffe.cs.illinois.edu/teaching/algorithms/notes/02-nutsbolts.pdf) give the 2/(j−i+1) comparison probability.
  - These details are from [Erickson's home page](https://jeffe.cs.illinois.edu/teaching/algorithms/).
- **Princeton algs4 booksite (Sedgewick and Wayne):** [2.1 Elementary Sorts](https://algs4.cs.princeton.edu/21elementary/), [2.2 Mergesort](https://algs4.cs.princeton.edu/22mergesort/), [2.3 Quicksort](https://algs4.cs.princeton.edu/23quicksort/), [2.4 Priority Queues](https://algs4.cs.princeton.edu/24pq/), [2.5 Sorting Applications (stability, choosing a sort)](https://algs4.cs.princeton.edu/25applications/) and [5.1 String Sorts (LSD)](https://algs4.cs.princeton.edu/51radix/). These contain the exact compare and exchange propositions quoted above.
- **VisuAlgo Sorting** ([visualgo.net/en/sorting](https://visualgo.net/en/sorting)) covers bubble, selection, insertion, merge, quick, random quick, counting and radix sort. It has an e-Lecture mode, custom input (random, sorted, nearly sorted, many duplicates, or your own array), and an online quiz and training mode with auto-grading. — [VisuAlgo](https://visualgo.net/en/sorting)
- **VisuAlgo Binary Heap** ([visualgo.net/en/heap](https://visualgo.net/en/heap)) uses a 1-based array and covers Insert, ExtractMax, Create in O(N log N) and in O(N), HeapSort, UpdateKey and Delete. — [VisuAlgo heap](https://visualgo.net/en/heap)
- **USF Data Structure Visualizations (David Galles)** ([index](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)): [Comparison Sorting](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html) (bubble, selection, insertion, shell, merge, quick), [Heap Sort](https://www.cs.usfca.edu/~galles/visualization/HeapSort.html), [Heaps](https://www.cs.usfca.edu/~galles/visualization/Heap.html), [Counting Sort](https://www.cs.usfca.edu/~galles/visualization/CountingSort.html), [Radix Sort](https://www.cs.usfca.edu/~galles/visualization/RadixSort.html) and [Bucket Sort](https://www.cs.usfca.edu/~galles/visualization/BucketSort.html). — [USF index](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)
- **Wikipedia quick references:** [Quicksort](https://en.wikipedia.org/wiki/Quicksort) (Lomuto and Hoare pseudocode, stack depth), [Merge sort](https://en.wikipedia.org/wiki/Merge_sort), [Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort), [Binary heap](https://en.wikipedia.org/wiki/Binary_heap), [Heapsort](https://en.wikipedia.org/wiki/Heapsort), [Counting sort](https://en.wikipedia.org/wiki/Counting_sort), [Radix sort](https://en.wikipedia.org/wiki/Radix_sort), [Bucket sort](https://en.wikipedia.org/wiki/Bucket_sort) and [Comparison sort](https://en.wikipedia.org/wiki/Comparison_sort).

### Inferences
Suggested 5-day plan before the week-8 midterm (24–30 Oct 2026):
- **Day 1.** Read sections 1–3 of these notes alongside algs4 §2.1–2.3. Replay the quicksort and merge traces in VisuAlgo with custom input `2,8,7,1,3,5,6,4`.
- **Day 2.** Read section 4 alongside MIT Lecture 8. Use the USF HeapSort and Heaps pages to replay BUILD-MAX-HEAP on `4,1,3,2,16,9,10,14,8,7`.
- **Day 3.** Read sections 5 and 6 alongside MIT Lecture 5. Replay counting and radix sort on the USF pages.
- **Day 4.** Do Practice Problems 1–20 on paper with the solutions hidden. Then try MIT Quiz 1 under timed conditions.
- **Day 5.** Review the trap list in section 8 and the master table in section 7. Compare conventions with the professor's Assignment #2 sample solution.

Two cautions:
- The visualizers may use different pivot rules, for example the first element rather than CLRS's last element, and different indexing. Their intermediate arrays may not match a CLRS trace even when both are correct.
- These notes use the classic textbook example arrays for the main traces, which are likely to match the textbook, and fresh arrays for the practice problems.

### Gaps
- My web-search budget for this session ran out partway through. Because of that, I could not locate and verify more .edu practice exams with answer keys, such as Princeton COS 226 or Berkeley CS 61B sorting midterms. MIT 6.006 is the only exam source with official solutions cited here.
- I did not verify which partition scheme or pivot VisuAlgo and the USF pages animate, so check that before comparing their output with a CLRS trace.
- The MIT Press page for CLRS returned HTTP 403 to my fetcher, so no publisher link is given. Buy or borrow the book; I did not consult it online.
- The verification scripts (`clrs.py`, `worked_traces.py`, `verify_counts.py`, `practice.py`, `final_checks.py`) were run in a temporary session scratchpad and are not saved next to these notes.


---

<!-- FILE: 03_amortized_analysis_adt.md -->

# Amortized Analysis and Abstract Data Types: outside notes for the Computer Algorithms midterm (SOC3030-003)

> **Scope.** These are outside notes, built from free external sources only. They are kept separate from the class slides, and no textbook PDFs are linked. Course context: SOC3030-003, Inha University in Tashkent, Fall 2026, Prof. Seth Ashish. The midterm is in week 8 (24–30 Oct 2026) and covers the week 1 slides "ADT and its specification" and the week 7 slides "Amortized Analysis"; the syllabus phrase is "Problem scenarios of amortized analysis".
> **Notation** (textbook style): c_i is the actual cost of operation i, ĉ_i its amortized cost, D_i the data structure after operation i, and Φ the potential. Sources use other letters: Erickson writes a_i and Φ_i, and CMU writes ac_i and S_i.
> **Verification.** Every bookkeeping table and numeric answer below was generated or checked by a Python script: 590,655 assertions, 0 failures. A compact re-runnable version is at the end of Q7.

## Q1. Amortized analysis vs average-case analysis: what the guarantee means

### Takeaway
An amortized bound is a **worst-case guarantee on whole sequences**: for every sequence of operations (normally starting from the empty structure), Σĉ_i ≥ Σc_i, with no probability involved. "Amortized O(1)" therefore means that n operations cost O(n) in total, even though a single call may cost Θ(n). Average-case bounds, by contrast, average over a distribution of inputs, and expected bounds average over the algorithm's own random choices.

### Cited Findings
- "Amortized cost can be, but does not have to be, average cost. We can assign any amortized cost to each operation, as long as they 'preserve the total cost', i.e., for any sequence of operations, Σ amortized cost ≥ Σ actual cost." — [MIT 6.046J S15, Lecture 5 notes](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/13e2c7d165259712327af0af312a068e_MIT6_046JS15_lec05.pdf)
- Stanford CS166 puts it the same way: assign each operation a "(fake!)" amortized cost such that Σ amortized-cost ≥ Σ real-cost for any series of operations. "Amortized costs shift work backwards from expensive operations onto cheaper ones." For the two-stack queue: "Any sequence of n operations … will take time n · O(1) = O(n). However, each individual operation may take more than O(1) time to complete." — [Stanford CS166 (Spring 2026), Lecture 9 "Amortized Analysis"](https://web.stanford.edu/class/archive/cs/cs166/cs166.1266/lectures/09/)
- Erickson: the averaging in amortization "is quite different from the averaging we consider with randomized algorithms. There is no probability involved; we are averaging over a sequence of operations, not the possible running times of a single operation." Increment has worst-case cost O(log n) but amortized cost O(1). — [Erickson, *Algorithms*, Lecture 9: Amortized Analysis](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)
- CMU 15-451: "The key idea of amortized analysis is to consider the worst-case cost of a sequence of operations on a data structure, rather than the worst-case individual cost of any particular operation." Amortized analysis therefore isn't meaningful for "an isolated run of a single algorithm, e.g., it wouldn't make logical sense to ask about the amortized cost of Quicksort." Also: "It is extremely important to not confuse this kind of analysis with average-case analysis, even though both involve averages!" The lecture's Exercise 1 asks students to distinguish aggregate amortized, average-case, and expected cost. — [CMU 15-451 F25, Lecture 7 notes](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)
- Princeton: "Amortized analysis provides a worst-case performance guarantee on a sequence of operations." Proposition: with resizing arrays, "starting from an empty data structure, any sequence of N operations takes time proportional to N in the worst case (amortized constant time per operation)". By contrast, the guarantees of randomized algorithms (quicksort, hashing) "are not absolute". — [algs4 §1.4 Analysis of Algorithms](https://algs4.cs.princeton.edu/14analysis/)
- Standard reference tables mark the two kinds of guarantee differently. Hash-table O(1) costs are average-case under the "uniform hashing assumption" (worst case n), while Fibonacci-heap costs carry the mark "† amortized guarantee". — [algs4 cheatsheet](https://algs4.cs.princeton.edu/cheatsheet/)
- Amortized costs are not unique: "different amortization schemes can assign different costs to exactly the same algorithms", and such results "are not necessarily inconsistent!" — [Erickson §9.5](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)
- Amortized analysis was formally introduced by Robert Tarjan in "Amortized Computational Complexity" (SIAM J. Algebraic and Discrete Methods, 1985) and grew out of aggregate analysis. — [Wikipedia: Amortized analysis](https://en.wikipedia.org/wiki/Amortized_analysis)

### Inferences
#### Four kinds of bounds side by side (derived from the sources above)
| | Worst case per operation | Amortized | Average case | Expected (randomized) |
|---|---|---|---|---|
| Averages over… | nothing | the operations of one sequence | a probability distribution of inputs | the algorithm's random choices |
| Holds for every input/sequence? | yes | yes (worst case over all sequences) | no, only on average over inputs | yes, in expectation |
| Typical statement | "this append costs Θ(n) when it resizes" | "any m appends cost ≤ 3m" (CMU) | "unbalanced BST search ~log n on average, n worst case" (algs4 cheatsheet) | "randomized quicksort / hashing" (algs4 §1.4) |

#### What you may and may not conclude from "ĉ = amortized cost"
- **May:** for every sequence of n operations from the stated start state, total actual cost ≤ Σĉ_i. If each ĉ_i = O(1), any n operations take O(n) time.
- **May not:** that each call is O(1) (row 17 of table T3 costs 17); that the bound holds from an arbitrary start state (see Q4 and P8); that it survives adding a new operation (P6, P7).
- Different operation types can get different amortized costs (e.g., ENQ 3 and DEQ 1 for the two-stack queue; MIT's 2-3 tree insert O(lg n) and delete 0). The plain aggregate method gives every operation the same cost T(n)/n (CMU), so differentiated costs need the accounting or potential method.

#### Common traps (exam checklist)
1. Saying "amortized = average-case". There's no probability (Erickson, CMU).
2. Saying "amortized O(1) ⇒ every call is O(1)". A doubling insert or a transferring DEQUEUE costs Θ(n) (CS166).
3. Spending credit you don't have. CMU: "we must never spend credit that doesn't exist" — check that the bank is ≥ 0 after **every prefix**.
4. Checking only "Φ ≥ 0". The real condition is **Φ(D_i) ≥ Φ(D_0) for all i**, and "Φ ≥ 0" is enough only when Φ(D_0) = 0 (MIT, Erickson). P17 shows a Φ that drifts below Φ(D_0) and "proves" a false bound.
5. Starting from a non-empty state, such as a counter that doesn't start at 0. MIT: Φ(initial) = 0 "is necessary for the above amortized analysis" (see P8).
6. A Φ that points the wrong way. CS166's first guess, Φ = number of free slots, makes doubling cost Θ(n) amortized.
7. Assuming a bound survives a new operation. Adding operations can destroy it: DECREMENT on a counter (Erickson §9.3), MultiPush on a queue (Erickson Ex. 6b), a symmetric two-stack deque (CMU Recitation 4a). See P6, P7 and Q5.
8. Halving at 1/2 full instead of 1/4. This causes thrashing, Θ(n) per operation (algs4 exercise; CMU Ex. 3). See T4b and P15.
9. Growing by a constant amount (+10) instead of a constant factor. This gives Θ(n) amortized per insert (P14).
10. Not stating the cost model (bit flips? element moves? stack pushes/pops?). CMU stresses that the cost model is a deliberate choice.
11. Covering only one case. Potential proofs must cover every case: resize vs no resize, α ≥ 1/2 vs α < 1/2, DEQUEUE with vs without a transfer.
12. Sign errors. ΔΦ = Φ(after) − Φ(before), so the expensive operation must have a large **negative** ΔΦ.
13. Asking for the amortized cost of a single algorithm run, such as "quicksort" (CMU says this makes no sense).
14. Calling hash-table O(1) "amortized". It is average-case (uniform hashing); table resizing adds an amortized part on top (Erickson Ex. 9).

### Gaps
- I did not consult the course slides, so check their notation and conventions against these notes. Examples: does the table start at size 0 or 1? Is the shrink condition "< 1/4" or "= 1/4"? Is the amortized cost written ĉ_i or a_i?
- I read Tarjan's 1985 paper only through Wikipedia's citation, not directly.
- I fetched no dedicated formal source for "average-case analysis" itself; the contrast comes from the algs4, CMU and Erickson remarks above.

## Q2. Aggregate method, worked in full (MULTIPOP stack, binary counter, dynamic table)

### Takeaway
Find the worst-case total T(n) of any n operations; the amortized cost of every operation is T(n)/n. The three standard results are: MULTIPOP stack T(n) ≤ 2n, binary counter T(n) < 2n, and doubling table T(n) < 3n. The aggregate method is the simplest but gives every operation the same cost, and it needs you to know the worst-case sequence.

### Cited Findings
- Erickson: "The Summation Method. Let T(n) be the worst-case running time for a sequence of n operations. The amortized time for each operation is T(n)/n." "Most textbooks call this particular technique 'the aggregate method'." — [Erickson §9.2.1](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)
- MIT: "just add up the cost of all the operations and then divide by the number of operations … Because it's simple, it may not be able to analyze more complicated algorithms." — [MIT 6.046J L5](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/13e2c7d165259712327af0af312a068e_MIT6_046JS15_lec05.pdf)
- CMU: the aggregate method is "the simplest and least general method of analysis because we will end up assigning each operation the same amortized cost." — [CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)
- CS166: aggregate analysis "doesn't scale well". What if operations "contribute to / clean up messes in different ways", or "it's not clear what sequence is the worst-case sequence"? — [CS166 L9](https://web.stanford.edu/class/archive/cs/cs166/cs166.1266/lectures/09/)
- Erickson: you can't use the aggregate method for the increment/decrement counter "because we don't know what the sequence of operations looks like". — [Erickson §9.3](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)
- Binary counter: B[i] flips every 2^i-th increment, so n increments from 0 flip B[i] exactly ⌊n/2^i⌋ times, for a total < Σ n/2^i = 2n. "More precisely, the number of flips is exactly 2n − #1(n)." — [Erickson §9.2.1](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)
- Multi-pop stack: Pop(k) takes O(k) time, yet "any sequence of m operations takes O(m) actual time in the worst case" (proved there with Φ = number of elements in the stack). — [Wikipedia: Potential method](https://en.wikipedia.org/wiki/Potential_method)
- Table doubling: the total cost of n insertions is at most 2^0 + 2^1 + … + 2^⌈lg n⌉ = Θ(n), so each insertion is Θ(1) amortized. — [MIT 6.046J L5](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/13e2c7d165259712327af0af312a068e_MIT6_046JS15_lec05.pdf)
- CMU (cost model: write = 1, move = 1): "The cost of a sequence of m append operations using array-doubling is at most 3m", from m writes plus 1 + 2 + 4 + … ≤ 2m moves. — [CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)
- CMU names CLRS, *Introduction to Algorithms*, Chapter 17 ("Amortized Analysis") as the recommended reading; MULTIPOP, the binary counter and dynamic tables are that chapter's standard trio. — [CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)

### Inferences
#### One-glance matrix: 3 examples × 3 methods (derived; all script-verified)
| Example and cost model | Aggregate | Accounting: charges and credit invariant | Potential: Φ (Φ(D_0) = 0, Φ ≥ 0) |
|---|---|---|---|
| Stack with MULTIPOP; 1 per element pushed or popped | each element is popped at most once per push, so T(n) ≤ 2·#PUSH ≤ 2n | PUSH $2, POP $0, MULTIPOP $0; invariant: $1 sits on every stacked element (bank = stack size) | Φ = stack size; ĉ: PUSH 2, POP 0, MULTIPOP 0 |
| k-bit counter INCREMENT; 1 per bit flip | bit j flips ⌊n/2^j⌋ times, so T(n) < 2n | $2 per 0→1 set; invariant: $1 sits on every 1-bit | Φ = number of 1-bits; ĉ = (t+1) + (1 − t) = 2 (0 on overflow) |
| Dynamic table, double when full; 1 per elementary insert or copy | c_i = i if i−1 is a power of 2, else 1; T(n) < 3n | $3 per insert; invariant: bank ≥ 2·num − size (every item holds $1 when the table is full) | Φ = 2·num − size; ĉ = 3 (2 on the very first insert) |

#### Worked example A: stack with MULTIPOP
- Operations: PUSH(S, x) costs 1. POP(S) costs 1 and requires S non-empty. MULTIPOP(S, k) pops min(k, s) elements, where s is the current size, and costs min(k, s).
- Naive bound: a single MULTIPOP can cost Θ(n), so n operations look like O(n²). This is correct but loose.
- Aggregate argument: every element popped (by POP or inside MULTIPOP) was pushed earlier and is popped at most once, so the total pop work is ≤ #PUSH. Hence T(n) = #PUSH + (pop work) ≤ 2·#PUSH ≤ 2n, and the amortized cost is ≤ 2 = O(1).
- Concrete check (the T1 sequence in Q3): 10 operations with 7 PUSHes cost **13** in total, within 2·7 = 14, i.e. 1.3 per operation.

#### Worked example B: binary counter (k bits, starting at 0)
- INCREMENT(A): set i = 0; while i < k and A[i] = 1, set A[i] = 0 and i = i + 1; then if i < k, set A[i] = 1. The cost is t + 1 bit flips, where t is the number of trailing 1s (cost k on overflow from all 1s).
- Naive bound: up to k flips per call, so O(nk).
- Aggregate: A[0] flips n times, A[1] ⌊n/2⌋ times, A[j] ⌊n/2^j⌋ times. So T(n) = Σ_j ⌊n/2^j⌋ < n·Σ 2^−j = 2n, and the amortized cost is < 2.
- Concrete check: a 4-bit counter incremented 16 times (the 16th wraps 1111 → 0000) costs 16 + 8 + 4 + 2 = **30** ≤ 32 (table T2 in Q3). For an unbounded counter the cost is exactly 2n − popcount(n), as Erickson states; the script checked every n ≤ 20,000.

#### Worked example C: dynamic table with doubling
- Convention (gives the same numbers as CMU's): start with size 0. The first insert allocates 1 slot. An insert into a full table allocates 2·size slots, copies the num items (cost num), then inserts (cost 1).
- Actual cost: c_i = i if i − 1 is an exact power of 2 (copy i − 1 items, then insert), and 1 otherwise.
- Aggregate: T(n) = n + Σ_{j=0}^{⌊lg(n−1)⌋} 2^j < n + 2n = 3n, so the amortized cost is < 3.
- Concrete check: n = 17 gives copies 1 + 2 + 4 + 8 + 16 = 31, so T = 17 + 31 = **48** ≤ 51 (table T3 in Q3).

### Gaps
- I did not consult CLRS §17.1 (the canonical MULTIPOP and counter source) because no legal free copy is available; the multi-pop example is sourced from Wikipedia and the notes above. CMU cites "Chapter 17", which is the 3rd-edition numbering. I believe the 4th edition (2022) moved amortized analysis to Chapter 16, but I did not verify this.

## Q3. Accounting (banker's) method: amortized costs, credits and the credit invariant

### Takeaway
Assign each operation type a charge ĉ. A cheap operation's surplus is stored as credit on a specific part of the structure (an element, a bit), and expensive operations spend that credit. The scheme is valid only if the **credit invariant** holds: the bank, Σĉ − Σc, is never negative after any prefix of any sequence. The tables below show the bank, step by step, for all three examples, with the potential method in the last columns.

### Cited Findings
- CMU definition: each operation "may choose to pay an extra cost (a credit) to store in the data structure for later use. A future operation may use this credit to offset the cost of an expensive operation. The amortized cost of an operation is its actual cost in the cost model, plus any credit it pays for, minus the value of any previous credit that it consumes." Warning: "we must never spend credit that doesn't exist." — [CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)
- CMU on the dynamic array: "Whenever we insert a new element into the list, we will pay a credit of 2 and leave it on the list element", so append costs 3. When a grow is triggered, "the final half of the elements (n/2 of them) will each possess an unused credit of 2", which pays exactly for moving the n elements, so grow is amortized 0. — [CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)
- MIT: the accounting method "allows an operation to store credit into a bank for future use, if its assigned amortized cost > its actual cost". In table doubling, the n/2 elements inserted since the previous doubling still have unused coins, which pay for the next doubling. — [MIT 6.046J L5](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/13e2c7d165259712327af0af312a068e_MIT6_046JS15_lec05.pdf)
- Erickson's "taxation" version for the counter: a two-dollar tax whenever a bit goes 0→1; "One of those dollars is spent changing the bit from zero to one; the other is stored away as credit until we need to reset the same bit to zero", giving amortized cost 2. An alternative schedule has each bit B[i] charge 1/2^i per increment (total 2). "The tightest bounds are obtained from tax schedules that just barely stay in the black." — [Erickson §9.2.2](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)
- The charging method is a variant. Erickson charges the cost of clearing a bit to the earlier operation that set it, so each Increment pays for at most 2 flips. MIT charges a doubling to the ≥ m/2 inserts since the last doubling, and a halving at 1/4 to the ≥ m/4 deletes since the last resize. — [Erickson §9.2.3](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf); [MIT 6.046J L5](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/13e2c7d165259712327af0af312a068e_MIT6_046JS15_lec05.pdf)
- Wikipedia states the principle: "the expensive operations will only occur when there is sufficient payment in the pool to cover their costs". Caution: since April 2026 the article has been flagged for a cleanup rewrite. — [Wikipedia: Accounting method](https://en.wikipedia.org/wiki/Accounting_method_%28computer_science%29)

### Inferences
#### Exam recipe
(1) State the cost model. (2) Choose charges per operation type, overcharging the cheap ones. (3) Say where the credit is stored. (4) State the invariant and prove that every operation preserves it, especially that the expensive one finds enough credit. (5) Conclude Σc ≤ Σĉ.

#### T1: stack with MULTIPOP. Charges: PUSH $2, POP $0, MULTIPOP $0. Invariant: bank = stack size.
| i | operation | stack after (bottom→top) | actual c_i | Σc | acct ĉ_i | Σĉ | bank | Φ = size: before→after | pot. ĉ_i = c_i + ΔΦ |
|---|---|---|---|---|---|---|---|---|---|
| 1 | PUSH(a) | a | 1 | 1 | 2 | 2 | 1 | 0→1 | 1 +1 = 2 |
| 2 | PUSH(b) | ab | 1 | 2 | 2 | 4 | 2 | 1→2 | 1 +1 = 2 |
| 3 | PUSH(c) | abc | 1 | 3 | 2 | 6 | 3 | 2→3 | 1 +1 = 2 |
| 4 | POP | ab | 1 | 4 | 0 | 6 | 2 | 3→2 | 1 −1 = 0 |
| 5 | PUSH(d) | abd | 1 | 5 | 2 | 8 | 3 | 2→3 | 1 +1 = 2 |
| 6 | PUSH(e) | abde | 1 | 6 | 2 | 10 | 4 | 3→4 | 1 +1 = 2 |
| 7 | MULTIPOP(3) | a | 3 | 9 | 0 | 10 | 1 | 4→1 | 3 −3 = 0 |
| 8 | PUSH(f) | af | 1 | 10 | 2 | 12 | 2 | 1→2 | 1 +1 = 2 |
| 9 | MULTIPOP(5) | (empty) | 2 | 12 | 0 | 12 | 0 | 2→0 | 2 −2 = 0 |
| 10 | PUSH(g) | g | 1 | 13 | 2 | 14 | 1 | 0→1 | 1 +1 = 2 |

Each popped element pays for its own pop with the $1 it has carried since its PUSH. The bank always equals the stack size. Σĉ = 14 ≥ Σc = 13. MULTIPOP(5) on 2 items costs only 2, because the cost is min(k, s).

#### T2: 4-bit binary counter, 16 increments. Charge $2 per 0→1 set. Invariant: $1 on every 1-bit (bank = number of 1s).
| i | A[3..0] after | resets 1→0 | sets 0→1 | actual c_i | Σc | acct ĉ_i | Σĉ | bank (= #1s) | Φ = #1s: before→after | pot. ĉ_i = c_i + ΔΦ |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0001 | 0 | 1 | 1 | 1 | 2 | 2 | 1 | 0→1 | 1 +1 = 2 |
| 2 | 0010 | 1 | 1 | 2 | 3 | 2 | 4 | 1 | 1→1 | 2 +0 = 2 |
| 3 | 0011 | 0 | 1 | 1 | 4 | 2 | 6 | 2 | 1→2 | 1 +1 = 2 |
| 4 | 0100 | 2 | 1 | 3 | 7 | 2 | 8 | 1 | 2→1 | 3 −1 = 2 |
| 5 | 0101 | 0 | 1 | 1 | 8 | 2 | 10 | 2 | 1→2 | 1 +1 = 2 |
| 6 | 0110 | 1 | 1 | 2 | 10 | 2 | 12 | 2 | 2→2 | 2 +0 = 2 |
| 7 | 0111 | 0 | 1 | 1 | 11 | 2 | 14 | 3 | 2→3 | 1 +1 = 2 |
| 8 | 1000 | 3 | 1 | 4 | 15 | 2 | 16 | 1 | 3→1 | 4 −2 = 2 |
| 9 | 1001 | 0 | 1 | 1 | 16 | 2 | 18 | 2 | 1→2 | 1 +1 = 2 |
| 10 | 1010 | 1 | 1 | 2 | 18 | 2 | 20 | 2 | 2→2 | 2 +0 = 2 |
| 11 | 1011 | 0 | 1 | 1 | 19 | 2 | 22 | 3 | 2→3 | 1 +1 = 2 |
| 12 | 1100 | 2 | 1 | 3 | 22 | 2 | 24 | 2 | 3→2 | 3 −1 = 2 |
| 13 | 1101 | 0 | 1 | 1 | 23 | 2 | 26 | 3 | 2→3 | 1 +1 = 2 |
| 14 | 1110 | 1 | 1 | 2 | 25 | 2 | 28 | 3 | 3→3 | 2 +0 = 2 |
| 15 | 1111 | 0 | 1 | 1 | 26 | 2 | 30 | 4 | 3→4 | 1 +1 = 2 |
| 16 | 0000 | 4 | 0 | 4 | 30 | 0 | 30 | 0 | 4→0 | 4 −4 = 0 |

Row 16 is the overflow: it sets no bit, so its charge is $0, and its 4 resets are paid by the 4 stored dollars. If you prefer a flat $2 per INCREMENT, the bank just ends $2 higher; that is still valid. Σc = 30 ≤ Σĉ = 30, and the per-bit count 16 + 8 + 4 + 2 = 30 matches.

#### T3: doubling table, 17 inserts. Charge $3 per insert. Invariant: bank ≥ Φ = 2·num − size ≥ 0.
The $3 splits as $1 for the insertion itself, $1 stored on the new item (for its own future move), and $1 stored on an older item that has no credit yet.

| i | resize | moves | actual c_i | Σc | Σĉ = 3i | bank = 3i − Σc | num/size after | Φ = 2·num − size | pot. ĉ_i = c_i + ΔΦ |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0→1 | 0 | 1 | 1 | 3 | 2 | 1/1 | 1 | 1 +1 = 2 |
| 2 | 1→2 | 1 | 2 | 3 | 6 | 3 | 2/2 | 2 | 2 +1 = 3 |
| 3 | 2→4 | 2 | 3 | 6 | 9 | 3 | 3/4 | 2 | 3 +0 = 3 |
| 4 | — | 0 | 1 | 7 | 12 | 5 | 4/4 | 4 | 1 +2 = 3 |
| 5 | 4→8 | 4 | 5 | 12 | 15 | 3 | 5/8 | 2 | 5 −2 = 3 |
| 6 | — | 0 | 1 | 13 | 18 | 5 | 6/8 | 4 | 1 +2 = 3 |
| 7 | — | 0 | 1 | 14 | 21 | 7 | 7/8 | 6 | 1 +2 = 3 |
| 8 | — | 0 | 1 | 15 | 24 | 9 | 8/8 | 8 | 1 +2 = 3 |
| 9 | 8→16 | 8 | 9 | 24 | 27 | 3 | 9/16 | 2 | 9 −6 = 3 |
| 10 | — | 0 | 1 | 25 | 30 | 5 | 10/16 | 4 | 1 +2 = 3 |
| 11 | — | 0 | 1 | 26 | 33 | 7 | 11/16 | 6 | 1 +2 = 3 |
| 12 | — | 0 | 1 | 27 | 36 | 9 | 12/16 | 8 | 1 +2 = 3 |
| 13 | — | 0 | 1 | 28 | 39 | 11 | 13/16 | 10 | 1 +2 = 3 |
| 14 | — | 0 | 1 | 29 | 42 | 13 | 14/16 | 12 | 1 +2 = 3 |
| 15 | — | 0 | 1 | 30 | 45 | 15 | 15/16 | 14 | 1 +2 = 3 |
| 16 | — | 0 | 1 | 31 | 48 | 17 | 16/16 | 16 | 1 +2 = 3 |
| 17 | 16→32 | 16 | 17 | 48 | 51 | 3 | 17/32 | 2 | 17 −14 = 3 |

- Per-element view, just before insert 9: items 5–8 each put $1 on themselves and $1 on one of items 1–4. So all 8 items hold $1, which pays the 8 moves; the bank of $9 = $8 on items + $1 surplus.
- The bank always equals Φ + 1. The extra $1 is surplus from insert 1, which had no older item to fund.
- Before row 17 the bank is $17 ≥ 16 moves. It never goes negative (script-checked for n ≤ 5000).
- CMU's equivalent scheme puts $2 on each new element; the totals are the same.

### Gaps
- I took the $1/$1/$1 split for the table from memory of the standard textbook (CLRS-style) presentation; a script checked it, but I did not quote it from a fetched source. CMU's "$2 on each new element" scheme is the sourced equivalent.

## Q4. Potential method: choosing Φ, Φ(D_i) ≥ Φ(D_0), amortized = actual + ΔΦ (with expansion and contraction)

### Takeaway
Define Φ on states and set ĉ_i = c_i + Φ(D_i) − Φ(D_{i−1}). The sum telescopes: Σĉ_i = Σc_i + Φ(D_n) − Φ(D_0). So if Φ(D_i) ≥ Φ(D_0) for every i, the amortized costs bound the actual costs on every prefix. A good Φ rises slightly on cheap operations and drops sharply on expensive ones. For a table that both grows and shrinks, the piecewise Φ = 2·num − size (α ≥ 1/2) or size/2 − num (α < 1/2) gives insert ≤ 3 and delete ≤ 2. That works only if the table is halved when α falls **below 1/4**; halving at 1/2 lets an adversary force Θ(n) per operation.

### Cited Findings
- Erickson's definition: a_i = c_i + Φ_i − Φ_{i−1}, and Σa_i = Σc_i + Φ_n − Φ_0. "A potential function is valid if Φ_i − Φ_0 ≥ 0 for all i. If the potential function is valid, then the total actual cost of any sequence of operations is always less than the total amortized cost." His summary: "Define a potential function for the data structure that is initially equal to zero and is always non-negative. The amortized cost of an operation is its actual cost plus the change in potential." — [Erickson §9.2.4](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)
- Erickson on choosing Φ: "A good potential function goes up a little during any cheap/fast operation, and goes down a lot during any expensive/slow operation. Unfortunately, there is no general technique for finding good potential functions." — [Erickson §9.2.4](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)
- MIT: Φ "is equivalent to the total unused credits stored up by all past operations (the bank account balance)". The rule: "Φ should never go below Φ(initial DS) at any point. If Φ(initial DS) = 0, which is usually the case, then Φ should never go negative (intuitively, we cannot 'owe the bank')." And: "In accounting method, we specify ΔΦ, while in potential method, we specify Φ. One determines the other, so the two methods are equivalent." — [MIT 6.046J L5](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/13e2c7d165259712327af0af312a068e_MIT6_046JS15_lec05.pdf)
- MIT on the counter: Φ = c·#1, so amortized cost = Θ(1 + #1) + c(−#1 + 1) = Θ(1). "Φ(initial DS) = 0 if the counter starts at 000···0. This is necessary for the above amortized analysis. Otherwise, Φ may become smaller than Φ(initial DS)." MIT also uses Φ = number of 3-nodes for 2-3 tree inserts (amortized splits = 1), and Φ = number of 5-nodes + 2-nodes for 2-5 trees. — [MIT 6.046J L5](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/13e2c7d165259712327af0af312a068e_MIT6_046JS15_lec05.pdf)
- CMU theorem: "If Φ(S_0) ≤ Φ(S_m), then Σc_i ≤ Σac_i." "It is very common (but not required) to define our potential functions such that Φ(S_0) = 0 and Φ(S_i) ≥ 0." — [CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)
- CMU's trial and error for the dynamic array: Φ = n − c is rejected ("never being positive"). Φ = n − c/2 leaves grow with amortized cost n/2. Φ = 2(n − c/2) = 2n − c works: append is amortized 3 and grow is 0. Its initial value is Φ(0, 1) = −1, which "doesn't matter at all because it is still true that Φ(S_m) ≥ Φ(S_0)." — [CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)
- CMU's growing-and-shrinking list grows when c = n and shrinks when n = c/4 (c ≥ 4). With Φ = 2(n − c/2) if n ≥ c/2 and c/2 − n if n < c/2, "the amortized cost of append is at most 3, the amortized cost of pop is at most 2". Shrink needs only "a 1 to 1 charge for each pop". CMU Exercise 3: "Suppose we change pop() to shrink when [n = c/2], show a sequence of operations that incur large amortized cost." — [CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)
- CS166 writes amortized-cost = real-cost + k·ΔΦ, where k is a constant under our control and Φ measures how "messy" the structure is, assuming Φ_start = 0 and Φ ≥ 0. Its wrong first guess, Φ = number of free slots, makes an expanding append O(n) + k·Θ(n) = O(n) amortized. The fix is Φ = #elems − #free-slots, patched to max{0, ·} for a new array. — [CS166 L9](https://web.stanford.edu/class/archive/cs/cs166/cs166.1266/lectures/09/)
- algs4: "We double the size of the array in push() if it is full; we halve the size of the array in pop() if it is less than one-quarter full." Web exercise: "whenever the array is 1/4 full or less, shrink it to half the size. Explain why we don't shrink it to half the size when it is 1/2 full or less." — [algs4 §1.3](https://algs4.cs.princeton.edu/13stacks/)
- MIT: shrink from m to m/2 when n = m/4, so "the table is half full again after any resize". Each doubling then has ≥ m/2 inserts to charge to, and each halving ≥ m/4 deletes, so insert and delete stay Θ(1) amortized. — [MIT 6.046J L5](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/13e2c7d165259712327af0af312a068e_MIT6_046JS15_lec05.pdf)
- Erickson Exercise 9: a hash table that doubles when more than 3/4 full and halves when less than 1/4 full has O(1) amortized cost per operation. — [Erickson, Exercises](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)

### Inferences
#### Formula sheet
- ĉ_i = c_i + Φ(D_i) − Φ(D_{i−1}), and Σ_{i=1}^{n} ĉ_i = Σ_{i=1}^{n} c_i + Φ(D_n) − Φ(D_0).
- Validity: if Φ(D_i) ≥ Φ(D_0) for **all** i, then Σc ≤ Σĉ for every prefix. Checking only the final state is not enough, because sequences can stop anywhere.
- Accounting ↔ potential: the bank after i operations, Σ_{j≤i}(ĉ_j − c_j), equals Φ(D_i) − Φ(D_0).
- Recipe for choosing Φ: (1) find the "mess" that builds up before the expensive operation (1-bits; elements in the In stack; filled slots beyond half). (2) Set Φ = constant × mess, with Φ = 0 for the empty structure. (3) Calibrate the constant so the drop during the expensive operation covers its actual cost: n/2 inserts must prepay n copies, hence the coefficient 2 in 2·num − size. (4) Check every case. (5) Check Φ(D_i) ≥ Φ(D_0).

#### A. MULTIPOP stack, Φ(D_i) = s_i (stack size)
PUSH: ĉ = 1 + 1 = 2. POP: ĉ = 1 − 1 = 0. MULTIPOP(k) with k′ = min(k, s): ĉ = k′ − k′ = 0. Φ(D_0) = 0 and Φ ≥ 0, so Σc ≤ 2·#PUSH (last column of T1).

#### B. Counter, Φ(D_i) = b_i (number of 1-bits)
INCREMENT resets t_i bits and sets one (no overflow): c_i = t_i + 1 and ΔΦ = 1 − t_i, so ĉ_i = 2. On overflow (all k bits go 1→0): c = k and ΔΦ = −k, so ĉ = 0. Starting from a counter with b_0 ones: Σc = Σĉ − b_n + b_0 ≤ 2n + b_0 ≤ 2n + k (P8).

#### C. Doubling table, Φ(T) = 2·num − size
Φ(T_0) = 0, and Φ ≥ 0 because the table is always at least half full. Without expansion: ĉ = 1 + 2 = 3. With expansion at num = size = s (inserting item s+1): c = s + 1, Φ goes from s to 2(s+1) − 2s = 2, so ĉ = (s + 1) + 2 − s = 3. The first insert (size 0 → 1) has ĉ = 1 + 1 − 0 = 2 (last column of T3). CMU's version starts at capacity 1, so Φ(D_0) = −1: Φ is sometimes negative, but the validity condition Φ(D_i) ≥ Φ(D_0) still holds.

#### D. Expansion **and** contraction (doubling when full; halving when a DELETE makes α = num/size < 1/4)
Φ(T) = 2·num − size if α ≥ 1/2, and size/2 − num if α < 1/2 (Φ = 0 for the empty size-0 table).

Why this Φ: right after any resize α = 1/2 and Φ ≈ 0. Φ grows toward num as α approaches 1, which pays for the doubling's num copies. It also grows toward num as α approaches 1/4: at α = 1/4, size/2 − num = 2num − num = num, which pays for the halving's copies. Only 1 unit per delete is needed on the shrinking side, because a halving copies just size/4 items after size/4 deletes (CMU's "1 to 1 charge").

| Case | c_i | ΔΦ | ĉ_i |
|---|---|---|---|
| INSERT, α_{i−1} ≥ 1/2, no expansion | 1 | +2 | 3 |
| INSERT that expands (num = size = s) | s + 1 | 2 − s | 3 |
| INSERT, α stays < 1/2 | 1 | −1 | 0 |
| INSERT crossing to α = 1/2 (e.g., 7/16 → 8/16) | 1 | −1 | 0 |
| DELETE, α stays ≥ 1/2 | 1 | −2 | −1 |
| DELETE from exactly α = 1/2 (e.g., 8/16 → 7/16) | 1 | +1 | 2 |
| DELETE, α < 1/2, no contraction | 1 | +1 | 2 |
| DELETE that contracts (num: size/4 → size/4 − 1, then size halves) | size/4 | 1 − size/4 | 1 |

So **INSERT ≤ 3 and DELETE ≤ 2**. The script checked 400 random sequences (maximum amortized INSERT = 3, DELETE = 2, Σc ≤ Σĉ, Φ ≥ 0 throughout) and the specific cases in P16.

#### T4b: why halve at 1/4, not at 1/2 (start from a full table, 8/8, then apply I, D, D, I, I, D, D, I, I)
| op# | op | num after | size (halve if α<1/2) | cost | event | size (halve if α<1/4) | cost | event |
|---|---|---|---|---|---|---|---|---|
| 9 | I | 9 | 16 | 9 | expand 8→16 | 16 | 9 | expand 8→16 |
| 10 | D | 8 | 16 | 1 | — | 16 | 1 | — |
| 11 | D | 7 | 8 | 8 | contract 16→8 | 16 | 1 | — |
| 12 | I | 8 | 8 | 1 | — | 16 | 1 | — |
| 13 | I | 9 | 16 | 9 | expand 8→16 | 16 | 1 | — |
| 14 | D | 8 | 16 | 1 | — | 16 | 1 | — |
| 15 | D | 7 | 8 | 8 | contract 16→8 | 16 | 1 | — |
| 16 | I | 8 | 8 | 1 | — | 16 | 1 | — |
| 17 | I | 9 | 16 | 9 | expand 8→16 | 16 | 1 | — |

- These 9 operations cost **47** with the 1/2 rule versus **17** with the 1/4 rule.
- At scale (N = 1024: fill to N/2, then I followed by 1000 × (D, D, I, I)), the 1/2 rule costs **1,028,536 for 4,513 operations (≈228 per operation, 2,011 resizes)**. The 1/4 rule costs **5,536 (≈1.2 per operation, 11 resizes)**. With N = 4096 the totals are 4,105,144 versus 10,144.
- Why: under the 1/2 rule, a resize leaves α exactly at the opposite threshold (Φ ≈ 0), so the very next operations can trigger another Θ(n) resize with nothing prepaid. Under the 1/4 rule, α = 1/2 after every resize, so at least size/2 inserts or size/4 deletes must happen before the next resize, each adding potential.
- Halving rather than quartering keeps α at 1/2 after the resize and keeps memory ≤ 4·num.

#### Φ cheat sheet
| Structure | Φ | Φ(D_0) | Amortized costs |
|---|---|---|---|
| MULTIPOP stack | stack size | 0 | PUSH 2, POP 0, MULTIPOP 0 |
| Binary counter (from 0) | number of 1-bits | 0 | INCREMENT ≤ 2 |
| Doubling table | 2·num − size | 0 | INSERT ≤ 3 |
| Doubling table, CMU start c = 1 | 2n − c | −1 | append 3 |
| Expand + contract at 1/4 | 2num − size if α ≥ 1/2; size/2 − num if α < 1/2 | 0 | INSERT ≤ 3, DELETE ≤ 2 |
| Two-stack queue | 2·len(In) | 0 | ENQ 3, DEQ 1 |
| Growth factor α | (α·num − size)/(α − 1) | 0 | INSERT ≤ 1 + α/(α−1) (P13) |
| INSERT + DELETE-LARGER-HALF | 2·size | 0 | INSERT 3, DLH ≤ 0 (P18) |
| 2-3 tree insert (MIT) | number of 3-nodes | 0 (empty tree) | 1 amortized split per insert |
| Lazy binomial / Fibonacci heap (CS166) | t = number of trees (plus a second tier for decrease-key) | 0 | enqueue O(1), extract-min O(log n) |

### Gaps
- Conventions differ slightly between sources. CMU shrinks when n = c/4 *before* erasing and starts at capacity 2 (so Φ(S_0) = 1, charged to initialize). algs4's text halves when the array is "less than one-quarter full" (its exercise says "1/4 full or less"); MIT shrinks when n = m/4; my script halves when a delete leaves α < 1/4. Off-by-one details can therefore differ from the class slides; the bounds 3 and 2 are the same in every version.
- I did not fetch the textbook (CLRS) version of the contraction proof; CMU's identical piecewise Φ stands in for it.

## Q5. Other examples: queue from two stacks; Fibonacci heaps and Union-Find (brief)

### Takeaway
Two-stack queue: ENQUEUE pushes onto In. DEQUEUE pops from Out, refilling Out from all of In only when Out is empty. Each element is pushed and popped at most twice, so n operations cost ≤ 4n stack operations. The standard schemes are accounting with ENQ $3 and DEQ $1, or potential Φ = 2·len(In), giving the same amortized costs. The flagship advanced examples are Fibonacci heaps (O(1) amortized insert and decrease-key, O(log n) amortized extract-min) and union-find with union by rank plus path compression (O(α(n)) amortized).

### Cited Findings
- CS166 Theorem: "The amortized cost of any enqueue or dequeue operation on a two-stack queue is O(1)." Proof with Φ = height of the In stack: enqueue is O(1) + k·1; dequeue with Out non-empty is O(1) + k·0; dequeue with Out empty does O(n) work while ΔΦ = −n, so it is O(1) for a suitable k. — [CS166 L9](https://web.stanford.edu/class/archive/cs/cs166/cs166.1266/lectures/09/)
- CMU Recitation 4: pushBack(x) does S2.pushFront(x); popFront moves all of S2 into S1 only when S1 is empty. "The amortized bounds follow from setting Φ(S1, S2) = 2|S2|", and correctness follows from the invariant that the queue's elements "are always equal to the elements of S1 appended to the elements of S2 in reverse." Part (a) asks for a sequence on which a naive symmetric *deque* costs Ω(n) amortized; parts (b–d) fix it with a third stack and a potential function. — [CMU 15-451 F25, Recitation 4](https://www.cs.cmu.edu/~15451-f25/reci/reci04.pdf)
- algs4: "Queue with two stacks. Implement a queue with two stacks so that each queue operations takes a constant amortized number of stack operations. Hint: If you push elements onto a stack and then pop them all, they appear in reverse order. If you repeat this process, they're now back in order." The page links a solution file (QueueWithTwoStacks.java) and lists harder variants credited to Tarjan: steque with two stacks, deque with a stack and a steque, deque with three stacks. — [algs4 §1.3](https://algs4.cs.princeton.edu/13stacks/)
- Erickson Exercise 11(a): implement a queue with two stacks and O(1) extra memory, with O(1) amortized enqueue and dequeue. Part (b): a "quack" with three stacks. — [Erickson, Exercises](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)
- Wikipedia's amortized-analysis article uses a Python two-list queue (input and output lists) as its worked example. — [Wikipedia: Amortized analysis](https://en.wikipedia.org/wiki/Amortized_analysis)
- Fibonacci heaps: "The Fibonacci heap has these amortized runtimes: enqueue: O(1), extract-min: O(log n), decrease-key: O(1)." The lazy-binomial-heap analysis uses Φ = t, the number of trees ("Each enqueue slowly introduces trees. Each extract-min rapidly cleans them up."). Fibonacci heaps use a "two-tiered potential function". Dijkstra/Prim need O(n) enqueues, O(n) extract-mins and O(m) decrease-keys, so they run in O(n·T_enq + n·T_ext + m·T_dec); with a binary heap that is O(m log n). The slides also note practical costs ("locality of reference and caching"). — [CS166 L11 "Fibonacci Heaps"](https://web.stanford.edu/class/archive/cs/cs166/cs166.1266/lectures/11/)
- The algs4 cheatsheet row for the Fibonacci heap: INSERT 1, DEL-MIN log n†, MIN 1, DEC-KEY 1†, DELETE log n†, MERGE 1, where † marks an amortized guarantee. — [algs4 cheatsheet](https://algs4.cs.princeton.edu/cheatsheet/)
- Union-find: m MakeWeightedSet and n WeightedUnion operations take O(m + n log n) worst-case time, so "The aggregate method now implies that each WeightedUnion has amortized cost O(log n)." Theorem 4 gives T(m, n, r) ≤ mα(r) + 3n(α(r) + 1): "if we use union by rank, Find with path compression runs in O(α(n)) amortized time." — [Erickson, Lecture 11: Disjoint Sets](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/11-unionfind.pdf)
- MIT 6.046J has a recitation handout titled "Union-Find and Amortization". — [MIT 6.046J S15, Recitation 3](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/resources/recitation-3-notes/)

### Inferences
#### Two-stack queue with all three methods (cost model: 1 per stack push or pop)
- **Aggregate.** Each element costs at most 4 stack operations over its lifetime (push In, pop In, push Out, pop Out). So T ≤ 4·#ENQ ≤ 4n; more exactly, T = #ENQ + 2·(elements moved) + #DEQ ≤ 3·#ENQ + #DEQ.
- **Accounting.** ENQ is charged $3: $1 for the push and $2 stored on the element (paying its later pop from In and push onto Out). DEQ is charged $1 for the pop from Out. Invariant: each element in In carries $2, so bank = 2·len(In).
- **Potential.** Φ = 2·len(In). ENQ: ĉ = 1 + 2 = 3. DEQ with Out non-empty: ĉ = 1 + 0 = 1. DEQ that moves m elements: ĉ = (2m + 1) − 2m = 1.

#### T5: sequence E1, E2, E3, D, E4, D, D, D, E5, D
| i | op | In (bottom→top) | Out (bottom→top) | moved | actual c_i | Σc | acct ĉ_i | Σĉ | bank | Φ = 2·len(In): before→after | pot. ĉ_i = c_i + ΔΦ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | ENQ(1) | 1 | ∅ | 0 | 1 | 1 | 3 | 3 | 2 | 0→2 | 1 +2 = 3 |
| 2 | ENQ(2) | 12 | ∅ | 0 | 1 | 2 | 3 | 6 | 4 | 2→4 | 1 +2 = 3 |
| 3 | ENQ(3) | 123 | ∅ | 0 | 1 | 3 | 3 | 9 | 6 | 4→6 | 1 +2 = 3 |
| 4 | DEQ→1 | ∅ | 32 | 3 | 7 | 10 | 1 | 10 | 0 | 6→0 | 7 −6 = 1 |
| 5 | ENQ(4) | 4 | 32 | 0 | 1 | 11 | 3 | 13 | 2 | 0→2 | 1 +2 = 3 |
| 6 | DEQ→2 | 4 | 3 | 0 | 1 | 12 | 1 | 14 | 2 | 2→2 | 1 +0 = 1 |
| 7 | DEQ→3 | 4 | ∅ | 0 | 1 | 13 | 1 | 15 | 2 | 2→2 | 1 +0 = 1 |
| 8 | DEQ→4 | ∅ | ∅ | 1 | 3 | 16 | 1 | 16 | 0 | 2→0 | 3 −2 = 1 |
| 9 | ENQ(5) | 5 | ∅ | 0 | 1 | 17 | 3 | 19 | 2 | 0→2 | 1 +2 = 3 |
| 10 | DEQ→5 | ∅ | ∅ | 1 | 3 | 20 | 1 | 20 | 0 | 2→0 | 3 −2 = 1 |

- Row 4 is a single DEQUEUE costing 7 (= 2·3 + 1): an amortized bound does not bound individual calls.
- Another valid scheme: ENQ $4 and DEQ $0, with each element prepaying its whole lifetime (P12). Amortized costs are not unique (Erickson §9.5).
- Correctness invariant (abstraction function): queue = reverse(Out) followed by In, front first; the queue's front is the top of Out (CMU).
- Traps: refilling Out while it is non-empty breaks FIFO order. Making the structure symmetric (a deque that moves *everything* each time) gives Θ(n²) for n operations: the script found 251,500 stack operations for n = 1000 (500 pushBacks, then alternating popFront/popBack).
- The script ran 300 random sequences against Python's deque: FIFO order was always correct and the total was always ≤ 3·#ENQ + #DEQ.

#### Why Fibonacci heaps matter
Applying CS166's formula with Fibonacci-heap amortized costs gives Dijkstra O(n·1 + n·log n + m·1) = O(m + n log n), versus O(m log n) with a binary heap. That improvement comes entirely from O(1) amortized decrease-key. (This is a derived application of the cited formula.) For the midterm, one sentence plus the cost table is probably enough.

### Gaps
- I did not extract the full two-tier Fibonacci-heap potential. The textbook form, Φ = trees + 2·marked nodes, is from memory and was not verified here.
- I have no fetched source for the practical size of α(n) or for the union-by-rank-only bound, so they are omitted.

## Q6. Abstract data types: definition, specification, ADT vs data structure vs implementation, common ADTs and costs

### Takeaway
An ADT is defined by its values, its operations and their behavior, from the user's point of view; the representation stays hidden. A data structure is a concrete representation (array, linked list, heap, hash table). An implementation is code that realizes an ADT using some data structure. A specification gives operation signatures plus preconditions (the client's obligations) and postconditions (the implementer's promises), and/or algebraic axioms. It can also include cost guarantees, because the same ADT has very different costs under different implementations.

### Cited Findings
- algs4: "A data type is a set of values and a set of operations on those values. An abstract data type is a data type whose internal representation is hidden from the client." The API specifies behavior (constructors and methods with descriptions of their effects), separating client, API and implementation. Encapsulation lets the implementation change without changing client code, and API design should "provide to clients the methods they need and no others." — [algs4 §1.2 Data Abstraction](https://algs4.cs.princeton.edu/12oop/)
- Wikipedia: an ADT is "a mathematical model for data types, defined by its behavior (semantics) from the point of view of a user of the data, specifically in terms of possible values, possible operations on data of this type, and the behavior of these operations. This mathematical model contrasts with data structures, which are concrete representations of data, and represent the point of view of an implementer, not a user." A stack "can be concretely implemented using either a linked list or an array." — [Wikipedia: Abstract data type](https://en.wikipedia.org/wiki/Abstract_data_type)
- Wikipedia on interface vs behavior: the interface covers the domain and operations "and perhaps some of the constraints on the operations, such as pre-conditions and post-conditions; but not to other constraints, such as relations between the operations, which are considered behavior". Behavior is specified in two main styles, axiomatic and operational semantics. "A stack and a queue have similar add element/remove element interfaces, but it is the constraints that distinguish last-in-first-out from first-in-first-out behavior." — [Wikipedia: Abstract data type](https://en.wikipedia.org/wiki/Abstract_data_type)
- Wikipedia's stack axioms (axiomatic style): push: S → X → S, pop: S → (S, X), top: S → X, create: S, empty: S → B, where create returns a distinguished state Λ. The axioms are pop(push(S, v)) = (S, v), top(push(S, v)) = v, empty(create) = T and empty(push(S, x)) = F. "These axioms do not define the effect of top(s) or pop(s), unless s is a stack state returned by a push … those two operations can be defined to be invalid when s = Λ." — [Wikipedia: Abstract data type](https://en.wikipedia.org/wiki/Abstract_data_type)
- Wikipedia on costs: "Some authors also include the computational complexity ('cost') of each operation." Stepanov (designer of the STL) put complexity guarantees into the STL specification: "You cannot have interchangeable modules unless these modules share similar complexity behavior." — [Wikipedia: Abstract data type](https://en.wikipedia.org/wiki/Abstract_data_type)
- Wikipedia lists common ADTs including collection, container, list, string, set, multiset, map, multimap, graph, tree, stack, queue, priority queue and double-ended queue. — [Wikipedia: Abstract data type](https://en.wikipedia.org/wiki/Abstract_data_type)
- MIT 6.005: "a type is characterized by the operations you can perform on it." Representation independence means "the use of an abstract type is independent of its representation (the actual data structure or data fields used to implement it), so that changes in representation have no effect on code outside the abstract type itself." Operations fall into four classes: creators t* → T, producers T+, t* → T, observers T+, t* → t, and mutators T+, t* → void|t|T. Design advice: a few simple operations, coherent behavior, an adequate set. — [MIT 6.005 Reading 12: Abstract Data Types](https://web.mit.edu/6.005/www/fa15/classes/12-abstract-data-types/)
- MIT 6.005 on specifications: "The specification acts as a contract: the implementer is responsible for meeting the contract, and a client that uses the method can rely on the contract … when the specification has a precondition, the client has responsibilities too." — [MIT 6.005 Reading 06: Specifications](https://web.mit.edu/6.005/www/fa15/classes/06-specifications/)
- algs4 costs: in the linked-list implementations of Bag, Stack and Queue, "all operations take constant time in the worst case". The resizing-array implementations are amortized constant per operation. — [algs4 §1.4](https://algs4.cs.princeton.edu/14analysis/)
- algs4 PQ costs (INSERT / DEL-MIN / MIN / DEC-KEY / MERGE): array 1 / n / n / 1 / n. Binary heap log n / log n / 1 / log n / n. Binomial heap 1 / log n / 1 / log n / log n. Fibonacci heap 1 / log n† / 1 / 1† / 1, where † means amortized. — [algs4 cheatsheet](https://algs4.cs.princeton.edu/cheatsheet/)
- algs4 symbol-table costs (SEARCH / INSERT / DELETE). Sequential search (unordered list): n / n / n, worst and average. Binary search (sorted array): log n / n / n. Unbalanced BST: n worst case; average log n / log n / √n. Red-black BST and AVL: log n for all three. Separate-chaining and linear-probing hash tables: n worst case; average 1†, where † is the "uniform hashing assumption". — [algs4 cheatsheet](https://algs4.cs.princeton.edu/cheatsheet/)
- CMU's List interface (initialize / append / get) implemented by array doubling: get is O(1) and append is amortized 3 in CMU's cost model. — [CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)

### Inferences
#### ADT vs data structure vs implementation
| Level | Question it answers | Examples |
|---|---|---|
| **ADT** | *What* values and operations exist, and what behavior is promised (the contract) | Stack (LIFO axioms); Queue (FIFO axioms); Priority queue; Dictionary/Map; Set; List |
| **Data structure** | *How* the data is laid out (the representation) | singly linked list; (resizing) array; binary heap; Fibonacci heap; hash table with chaining or linear probing; red-black BST |
| **Implementation** | The concrete code that realizes an ADT with a chosen data structure | algs4 `ResizingArrayQueue.java` (queue via resizing array); `QueueWithTwoStacks.java` (queue via two stacks); `IndexMinPQ.java` (PQ via binary heap); `IndexFibonacciMinPQ.java`; `SeparateChainingHashST.java`; `RedBlackBST.java` |

The relationship is many-to-many. One ADT has many data structures (a queue can be a linked list, a circular array or two stacks), and one data structure serves many ADTs (an array can back a stack, a queue, a list or a heap-ordered PQ). Clients depend only on the API, which is what lets you swap implementations (algs4; MIT 6.005).

#### How to write an ADT specification (exam template)
1. Name and type parameter, e.g., `Stack<Item>`.
2. Abstract values: the mathematical model, e.g., a finite sequence ⟨x1 … xn⟩ with xn on top.
3. Operations: signatures, each labelled creator, producer, observer or mutator.
4. For each operation, a **precondition** (what the caller must guarantee) and a **postcondition** (what the operation guarantees), stated about the abstract value and never about the representation.
5. Optional or alternative: **axioms**, i.e., equations relating operations.
6. Optional: **cost guarantees**, e.g., "push/pop O(1) amortized".
7. Error behavior when a precondition is violated (undefined, or an exception).

**Stack, operational (pre/postcondition) style:**
```
ADT Stack<Item>
  values: finite sequences s = ⟨x1, …, xn⟩ (n ≥ 0); xn is the top
  new()       : → Stack               creator    pre: none     post: s = ⟨⟩
  push(S, x)  : Stack × Item → void   mutator    pre: none*    post: s' = ⟨x1, …, xn, x⟩
  pop(S)      : Stack → Item          mutator    pre: n ≥ 1    post: returns xn; s' = ⟨x1, …, x(n−1)⟩
  top(S)      : Stack → Item          observer   pre: n ≥ 1    post: returns xn; s unchanged
  isEmpty(S)  : Stack → Boolean       observer   pre: none     post: returns (n = 0); s unchanged
  size(S)     : Stack → Integer       observer   pre: none     post: returns n; s unchanged
  cost (optional): every operation O(1): worst case (linked list) or amortized (resizing array)
  * a bounded (fixed-capacity) stack adds the precondition n < capacity to push
```

**Stack, axiomatic style (Wikipedia):**
```
create : → S       push : S × X → S       pop : S → S × X       top : S → X       empty : S → Boolean
(A1) empty(create) = true
(A2) empty(push(S, x)) = false
(A3) top(push(S, x)) = x
(A4) pop(push(S, x)) = (S, x)
top(create), pop(create) are undefined  ⇒  precondition: not empty(S)
(common variant: pop : S → S with pop(push(S, x)) = S)
```

**Queue, axiomatic style.** The script checked Q1–Q6 on 3,000 random states each for a tuple implementation and for the two-stack queue, through its abstraction function AF(In, Out) = reverse(Out) + In.
```
new : → Q    enqueue : Q × X → Q    dequeue : Q → Q    front : Q → X    isEmpty : Q → Boolean
(Q1) isEmpty(new) = true
(Q2) isEmpty(enqueue(Q, x)) = false
(Q3) front(enqueue(new, x)) = x
(Q4) front(enqueue(Q, x)) = front(Q)                    if not isEmpty(Q)
(Q5) dequeue(enqueue(new, x)) = new
(Q6) dequeue(enqueue(Q, x)) = enqueue(dequeue(Q), x)    if not isEmpty(Q)
front(new), dequeue(new) are undefined  ⇒  precondition: not isEmpty(Q)
```

**Priority queue (min), pre/postcondition sketch.** Values: finite multisets M of keys.
```
insert(PQ, x)          pre: none                                  post: M' = M plus one copy of x
min(PQ)                pre: M ≠ ∅                                 post: returns some x ∈ M with x ≤ y for all y ∈ M; M unchanged
extractMin(PQ)         pre: M ≠ ∅                                 post: returns such an x; M' = M minus one copy of x
decreaseKey(PQ, h, k)  pre: h names an element e ∈ M and k ≤ key(e)   post: key(e) = k
isEmpty(PQ)            pre: none                                  post: returns (M = ∅)
```

**Dictionary/Map sketch.** Values: finite partial functions D: K → V.
```
put(D, k, v)    pre: none            post: D' = D with k ↦ v (any old value replaced)
get(D, k)       pre: k ∈ dom(D)*      post: returns D(k); D unchanged
remove(D, k)    pre: k ∈ dom(D)*      post: D' = D without k
contains(D, k)  pre: none            post: returns (k ∈ dom(D))
* alternative contract: no precondition; get returns null and remove does nothing when k ∉ dom(D)
```

#### Common ADTs × implementations (exam cost table)
| ADT | Implementation (data structure) | Key operation costs | Source |
|---|---|---|---|
| Stack (push, pop) | linked list | O(1) worst case | algs4 §1.4 |
| Stack | resizing array (×2 when full, ÷2 below 1/4) | O(1) amortized; Θ(n) on a resizing call | algs4 §1.3–1.4 |
| Queue (enqueue, dequeue) | linked list | O(1) worst case | algs4 §1.4 |
| Queue | resizing array | O(1) amortized | algs4 §1.3–1.4 |
| Queue | two stacks | O(1) amortized (3 and 1 stack operations) | CS166 L9; CMU R4; Q5 |
| List (get(i), append) | dynamic array | get O(1); append O(1) amortized (3 in CMU's model) | CMU L7 |
| List | linked list | get(i) Θ(i); insert/remove at the head O(1) | derived (standard) |
| Priority queue (insert, del-min, min, dec-key, merge) | unordered array | 1, n, n, 1, n | algs4 cheatsheet |
| Priority queue | binary heap | log n, log n, 1, log n, n | algs4 cheatsheet |
| Priority queue | binomial heap | 1, log n, 1, log n, log n | algs4 cheatsheet |
| Priority queue | Fibonacci heap | 1, log n†, 1, 1†, 1 († amortized) | algs4 cheatsheet; CS166 L11 |
| Set / dictionary (search, insert, delete) | sequential search (unordered list) | n, n, n (worst and average) | algs4 cheatsheet |
| Set / dictionary | binary search (sorted array) | log n, n, n | algs4 cheatsheet |
| Set / dictionary | BST (unbalanced) | worst n, n, n; average log n, log n, √n | algs4 cheatsheet |
| Set / dictionary | red-black BST / AVL | log n, log n, log n (worst case) | algs4 cheatsheet |
| Set / dictionary | hash table (chaining / linear probing) | worst n; average 1 under uniform hashing; resizing is amortized | algs4 cheatsheet; Erickson Ex. 9 |

#### Likely exam angles
- "Stack and queue have the same signatures; what makes them different?" The axioms: top(push(S, x)) = x for a stack, but front(enqueue(Q, x)) = front(Q) for a non-empty queue (Wikipedia).
- "Why put costs into an ADT spec?" Because implementations are interchangeable only if their complexity matches (Stepanov, via Wikipedia).
- "Classify the operations": creator, producer, observer, mutator (MIT 6.005).
- "When must you choose a worst-case O(1) implementation over an amortized one?" In real-time settings: algs4 notes the default Java garbage collector "achieves only a constant amortized time per operation guarantee", whereas real-time collectors "guarantee constant time per operation in the worst case" ([algs4 §1.4](https://algs4.cs.princeton.edu/14analysis/)). By analogy, a hard-deadline queue should use a linked list rather than a resizing array or two stacks.

### Gaps
- I did not see the week-1 slides, so their spec format is unknown. From memory and unverified: some data-structures textbooks (e.g., Horowitz, Sahni and Anderson-Freed) write ADTs as "structure Stack is objects: … functions: … ::= …"; compare this with the slides.
- The linked-list `get(i)` and array-list front-insertion costs are standard but derived here; no fetched source states them.

## Q7. Practice: 20 problems with full solutions, plus the best free resources

### Takeaway
Exam problems on amortized analysis follow five patterns:
1. Compute totals (aggregate method).
2. Design a credit scheme and its invariant (accounting).
3. Given Φ, compute ĉ in every case (potential).
4. Find the flaw or the bad sequence (wrong Φ, halving at 1/2, an added operation).
5. ADT specification or classification.

The 20 problems below cover all five, and every numeric answer was script-checked. The best free practice with official solutions I found is CMU 15-451 F25 Recitation 4. Its solutions link may require a CMU login: an automated check got HTTP 404.

### Cited Findings
Best free resources, ranked for this midterm:
1. **CMU 15-451 F25, Lecture 7 "Amortized Analysis"** (12 pp.). Aggregate → banker's → potential on dynamic arrays, including the full grow-and-shrink proof (append ≤ 3, pop ≤ 2) and 4 exercises (amortized vs average vs expected; banker's proof; shrinking at 1/2; Φ_0 = 0 fix). — [CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf). Practice: **Recitation 4 "Amortized Analysis and Union Find"** (two-stack queue → deque potential problem). Its solutions link is on the [schedule page](https://www.cs.cmu.edu/~15451-f25/schedule.html), hosted on cmu.box.com; my automated request got HTTP 404, so it may need a login. On that schedule, Lecture 7 (16 Sep 2025) and Recitation 4 (19 Sep) came just before Midterm One (23 Sep 2025). — [CMU R4](https://www.cs.cmu.edu/~15451-f25/reci/reci04.pdf)
2. **Erickson, *Algorithms*, Lecture 9 "Amortized Analysis"** (14 pp., CC BY-NC-SA). Four methods (summation, taxation, charging, potential), counters in depth, the increment/decrement double counter, and 16 exercises without solutions. The exercises include a queue from two stacks (11), MultiPull/MultiPush on a queue (6), a stack-based "good view" scan (8), hash-table rebuilding at 3/4 and 1/4 (9), and cost-sequence amortization drills (1a–1s). Lecture 11 covers union-find. — [Erickson L9](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf); [Erickson L11](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/11-unionfind.pdf); [course page](https://jeffe.cs.illinois.edu/teaching/algorithms/)
3. **MIT 6.046J (Spring 2015), Lecture 5 "Amortization"** (6 pp.). Aggregate, accounting, charging and potential methods; table doubling and halving at 1/4; binary counter; 2-3 and 2-5 trees. Recitation 3 covers "Union-Find and Amortization". MIT's Problem Sets 2–3 contain no amortization problems (I checked the PDFs). — [MIT L5](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/resources/lecture-5-notes/); [MIT R3](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/resources/recitation-3-notes/); [MIT assignments](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/pages/assignments/)
4. **Stanford CS166 (Spring 2026), Lecture 9 "Amortized Analysis" and Lecture 11 "Fibonacci Heaps"** (slides). Visual two-stack queue and dynamic-array potentials, a wrong-Φ example, the B-tree right-spine potential, and an exercise on growth factor α. — [CS166 L9](https://web.stanford.edu/class/archive/cs/cs166/cs166.1266/lectures/09/); [CS166 L11](https://web.stanford.edu/class/archive/cs/cs166/cs166.1266/lectures/11/)
5. **Princeton algs4 §§1.2–1.4 plus the cheatsheet.** ADT/API vocabulary, the resizing-array rule (double when full, halve below 1/4), exercises (queue with two stacks with a posted solution; "explain why we don't shrink at 1/2"), and the PQ and symbol-table cost tables. — [§1.2](https://algs4.cs.princeton.edu/12oop/); [§1.3](https://algs4.cs.princeton.edu/13stacks/); [§1.4](https://algs4.cs.princeton.edu/14analysis/); [cheatsheet](https://algs4.cs.princeton.edu/cheatsheet/)
6. **MIT 6.005 Readings 06 (Specifications) and 12 (Abstract Data Types).** How to write pre/postconditions, the four operation classes, representation independence. — [R06](https://web.mit.edu/6.005/www/fa15/classes/06-specifications/); [R12](https://web.mit.edu/6.005/www/fa15/classes/12-abstract-data-types/)
7. **Wikipedia: Abstract data type** (stack axioms), **Potential method** (multi-pop stack and counter examples), **Amortized analysis** (history; Python two-stack queue). — [ADT](https://en.wikipedia.org/wiki/Abstract_data_type); [Potential method](https://en.wikipedia.org/wiki/Potential_method); [Amortized analysis](https://en.wikipedia.org/wiki/Amortized_analysis)

### Inferences
#### Practice set (my own problems, some adapted from the sources above; solutions are derived and every number is script-checked)

**P1. True or false? Justify each in one line.**
(a) If ENQUEUE and DEQUEUE on a two-stack queue are O(1) amortized, no single DEQUEUE can take more than O(1) time.
(b) Amortized analysis assumes the operation sequence is random.
(c) The plain aggregate method can give PUSH and MULTIPOP different amortized costs.
(d) If Φ(D_0) = 0 and Φ(D_i) ≥ 0 for all i, then Σc_i ≤ Σĉ_i for every sequence.
(e) If Φ(D_0) = 5 and Φ(D_i) ≥ 0 for all i, then Σc_i ≤ Σĉ_i for every sequence.
(f) The O(1) search time usually quoted for hash tables is an amortized bound.

*Solution.*
- (a) **False.** A DEQUEUE that finds Out empty moves every element: 2m + 1 stack operations (row 4 of T5 costs 7). Amortized bounds limit sums, not single calls.
- (b) **False.** It is a worst-case bound over *all* sequences; no probability is involved.
- (c) **False.** The aggregate method gives every operation T(n)/n (CMU). Use the accounting or potential method for different costs.
- (d) **True.** Telescoping gives Σc = Σĉ − Φ(D_n) + Φ(D_0) ≤ Σĉ.
- (e) **False in general.** Σc = Σĉ − Φ(D_n) + 5 can exceed Σĉ by up to 5. The correct condition is Φ(D_i) ≥ Φ(D_0). A constant excess is harmless asymptotically; CMU charges such a constant to initialization.
- (f) **False / imprecise.** It is average-case, under the uniform hashing assumption. Resizing adds a separate *amortized* cost to insert and delete.

**P2 (aggregate).** The i-th operation of a sequence costs i if i is an exact power of 2, and 1 otherwise. Find the amortized cost per operation; give the exact total for n = 16.
*Solution.* The powers of 2 in [1, n] cost 1 + 2 + … + 2^⌊lg n⌋ = 2^(⌊lg n⌋+1) − 1 ≤ 2n − 1. The other n − ⌊lg n⌋ − 1 operations cost 1 each, at most n in total. So T(n) < 3n, and the amortized cost is < 3, i.e. O(1). For n = 16: 31 + 11 = **42** ≤ 48.

**P3 (design a credit scheme).** Same sequence as P2. Give charges and an invariant.
*Solution.* Charge **$3 for every operation**. A cheap operation (cost 1) banks $2. Take a power-of-two operation i = 2^j with j ≥ 1. Since the previous power of two, 2^(j−1) − 1 cheap operations have banked 2(2^(j−1) − 1) = 2^j − 2 dollars; adding its own $3 gives 2^j + 1 ≥ 2^j, enough to pay. Operation i = 1 costs 1 ≤ 3. Invariant: after operation i, the bank holds at least 2(i − 2^⌊lg i⌋) ≥ 0. Script check: the bank stays at or above that bound for all i ≤ 5000; after 16 operations it holds 48 − 42 = $6.

**P4 (potential with a given Φ).** Same sequence. Let Φ(D_0) = 0 and Φ(D_i) = 2(i − 2^⌊lg i⌋) for i ≥ 1. Compute ĉ_i in every case and conclude.
*Solution.*
- If i is not a power of 2, then ⌊lg i⌋ = ⌊lg(i−1)⌋, so ΔΦ = +2 and ĉ = 1 + 2 = **3**.
- If i = 2^j with j ≥ 1: Φ(D_i) = 0 and Φ(D_{i−1}) = 2((2^j − 1) − 2^(j−1)) = 2^j − 2, so ĉ = 2^j + 0 − (2^j − 2) = **2**.
- If i = 1: ĉ = 1 + 0 − 0 = **1**.

Since Φ ≥ 0 = Φ(D_0), Σc ≤ Σĉ ≤ 3n. The script confirmed these exact values for every i ≤ 5000.

**P5 (the amortized cost need not be O(1)).** Operation k costs n if k is a power of 2, and 1 otherwise, for k = 1, …, n (Erickson Ex. 1c). What is the amortized cost?
*Solution.* [1, n] contains ⌊lg n⌋ + 1 powers of 2. So T(n) = n(⌊lg n⌋ + 1) + (n − ⌊lg n⌋ − 1) = Θ(n log n), and the amortized cost is **Θ(log n)**. Check: n = 16 gives 91 (5.69 per operation); n = 1024 gives 12,277 (11.99 per operation).

**P6 (a new operation breaks the bound).** Add MULTIPUSH(S, k), which pushes k items at cost k, to the MULTIPOP stack. Is every operation still O(1) amortized?
*Solution.* **No.** Alternate MULTIPUSH(n) and MULTIPOP(n) for n operations: each costs n, so the total is n² and the amortized cost is Θ(n). The potential (stack size) fails because a single operation can now raise it by n. The same thing happens for queues in Erickson's Ex. 6(b): MultiPush plus MultiPull forces Ω(n) amortized cost.

**P7 (counter with DECREMENT).** A k-bit counter supports INCREMENT and DECREMENT. Show that n operations can cost Θ(nk).
*Solution.* Start at 2^(k−1) − 1 = 011…1. INCREMENT gives 100…0 (all k bits flip); DECREMENT returns to 011…1 (all k bits flip). Alternating, every operation costs k. Script check: k = 8, starting from 127, 10 alternating operations cost **80** = 10·8. Erickson §9.3 notes this, and fixes it with a pair (P, N) of counters, Φ = the number of 1-bits in P and N, and amortized cost ≤ 2.

**P8 (Φ(D_0) ≠ 0).** The counter starts at a value with b_0 one-bits. Show that n INCREMENTs without overflow cost exactly 2n − b_n + b_0, and hence O(n) when n = Ω(k). Evaluate for k = 8, starting value 127 = 01111111, n = 5.
*Solution.* With Φ = the number of 1-bits, every increment without overflow has ĉ = 2. So Σc = Σĉ − Φ(D_n) + Φ(D_0) = 2n − b_n + b_0 ≤ 2n + k, which is O(n) if n = Ω(k). Numbers: the costs are 8, 1, 2, 1, 3, total **15**; the formula gives 10 − 2 + 7 = 15 (the final value 132 has 2 one-bits). This is MIT's point that Φ(initial) = 0 "is necessary" for the plain 2n bound.

**P9 (bookkeeping table).** Starting from an empty stack: PUSH(p), PUSH(q), MULTIPOP(1), PUSH(r), PUSH(s), PUSH(t), MULTIPOP(10), PUSH(u). Give c_i, the bank under the charges PUSH $2 / others $0, Φ = stack size, and ĉ_i.
*Solution.*

| i | operation | stack after (bottom→top) | actual c_i | Σc | acct ĉ_i | Σĉ | bank | Φ = size: before→after | pot. ĉ_i = c_i + ΔΦ |
|---|---|---|---|---|---|---|---|---|---|
| 1 | PUSH(p) | p | 1 | 1 | 2 | 2 | 1 | 0→1 | 1 +1 = 2 |
| 2 | PUSH(q) | pq | 1 | 2 | 2 | 4 | 2 | 1→2 | 1 +1 = 2 |
| 3 | MULTIPOP(1) | p | 1 | 3 | 0 | 4 | 1 | 2→1 | 1 −1 = 0 |
| 4 | PUSH(r) | pr | 1 | 4 | 2 | 6 | 2 | 1→2 | 1 +1 = 2 |
| 5 | PUSH(s) | prs | 1 | 5 | 2 | 8 | 3 | 2→3 | 1 +1 = 2 |
| 6 | PUSH(t) | prst | 1 | 6 | 2 | 10 | 4 | 3→4 | 1 +1 = 2 |
| 7 | MULTIPOP(10) | (empty) | 4 | 10 | 0 | 10 | 0 | 4→0 | 4 −4 = 0 |
| 8 | PUSH(u) | u | 1 | 11 | 2 | 12 | 1 | 0→1 | 1 +1 = 2 |

The total actual cost is 11 ≤ Σĉ = 12 = 2·#PUSH. The final bank is 1, equal to the stack size. MULTIPOP(10) on 4 items costs only 4.

**P10 (design a credit scheme: stack with backups).** A stack never holds more than k items and supports PUSH and POP, each costing 1. After every k operations the whole stack is copied as a backup, at a cost equal to its current size. Show that n operations, including the copies, cost O(n).
*Solution.* Charge **$2 per PUSH and per POP**: $1 pays for the operation and $1 goes into a backup fund. Each block of k operations adds exactly $k to the fund, and the copy at the end of the block costs at most k (the size is ≤ k). The fund never goes negative, so the total is ≤ 2n.
*Extension with MULTIPOP:* charge PUSH $3 ($1 push, $1 stored on the item for its eventual pop, $1 to the fund), POP $1 and MULTIPOP $1. The pops are paid by the items' stored dollars, and each $1 charge goes to the fund. The total is then ≤ 3n. The script checked both versions on 300 random runs each.

**P11 (two-stack queue bookkeeping).** Operations: ENQ(a), ENQ(b), DEQ, ENQ(c), ENQ(d), DEQ, DEQ, DEQ, with cost 1 per stack push or pop. Give c_i, the bank under ENQ $3 / DEQ $1, and ĉ_i with Φ = 2·len(In).
*Solution.*

| i | op | In (bottom→top) | Out (bottom→top) | moved | actual c_i | Σc | acct ĉ_i | Σĉ | bank | Φ = 2·len(In): before→after | pot. ĉ_i = c_i + ΔΦ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | ENQ(a) | a | ∅ | 0 | 1 | 1 | 3 | 3 | 2 | 0→2 | 1 +2 = 3 |
| 2 | ENQ(b) | ab | ∅ | 0 | 1 | 2 | 3 | 6 | 4 | 2→4 | 1 +2 = 3 |
| 3 | DEQ→a | ∅ | b | 2 | 5 | 7 | 1 | 7 | 0 | 4→0 | 5 −4 = 1 |
| 4 | ENQ(c) | c | b | 0 | 1 | 8 | 3 | 10 | 2 | 0→2 | 1 +2 = 3 |
| 5 | ENQ(d) | cd | b | 0 | 1 | 9 | 3 | 13 | 4 | 2→4 | 1 +2 = 3 |
| 6 | DEQ→b | cd | ∅ | 0 | 1 | 10 | 1 | 14 | 4 | 4→4 | 1 +0 = 1 |
| 7 | DEQ→c | ∅ | d | 2 | 5 | 15 | 1 | 15 | 0 | 4→0 | 5 −4 = 1 |
| 8 | DEQ→d | ∅ | ∅ | 0 | 1 | 16 | 1 | 16 | 0 | 0→0 | 1 +0 = 1 |

Σc = 16 = Σĉ = 4·3 + 4·1, and the final bank is 0. The bound is tight here because every element was moved.

**P12 (an alternative credit scheme).** Design a valid scheme for the two-stack queue in which DEQUEUE costs $0 amortized, and state its invariant.
*Solution.* Charge **ENQ $4, DEQ $0.** An enqueued element pays $1 for its push and carries $3. When it is moved, it pays $2 (pop from In, push onto Out) and keeps $1, which later pays its final pop. Invariant: bank = 3·len(In) + len(Out) ≥ 0. Both this and $3/$1 are valid, because amortized costs are not unique (Erickson §9.5). Both bound Σc, since #DEQ ≤ #ENQ gives 4·#ENQ ≥ 3·#ENQ + #DEQ.

**P13 (designing Φ for growth factor 3, then α).** The table triples when full (the first insert allocates 1 slot). Find a Φ with Φ(D_0) = 0 and Φ ≥ 0 that gives a constant amortized insert cost, then generalize to a growth factor α.
*Solution.* Right after an expansion to size 3s, num = s + 1. About 2s inserts happen before the table is full again, and then 3s items must be copied. So each insert must raise Φ by 3s/(2s) = 3/2, which suggests **Φ = (3/2)·num − (1/2)·size**.
- Full table (num = size = s): Φ = s, which pays for the copy.
- Normal insert: ĉ = 1 + 3/2 = 5/2.
- Expanding insert: c = s + 1, and Φ goes from s to (3/2)(s + 1) − (3/2)s = 3/2, so ĉ = 5/2.
- First insert: ĉ = 2.

Φ ≥ 0 because num ≥ size/3 at all times. In general **Φ = (α·num − size)/(α − 1)** and ĉ ≤ **1 + α/(α − 1)**: 3 for α = 2, 5/2 for α = 3, 7/3 for α = 4. The script reached each bound exactly over 20,000 inserts. This is the growth-factor exercise suggested by CS166 L9.

**P14 (growing by a constant).** The table grows by 10 slots each time it fills. What is the total cost of n = 1000 inserts, and the amortized cost?
*Solution.* Copies happen when num = 10, 20, …, 990, costing 10(1 + 2 + … + 99) = 49,500. Adding the 1000 elementary inserts gives a total of **50,500**, about 50.5 per insert. In general the total is Θ(n²/c), so the amortized cost is Θ(n). Moral: only multiplicative (geometric) growth gives O(1) amortized.

**P15 (why halve at 1/4).** A table doubles when full. Policy A halves it when a DELETE leaves α < 1/2; policy B halves it when α < 1/4. Start from a full table holding 8 items (size 8) and apply I, D, D, I, I, D, D, I, I. Give the size and cost after each operation under each policy, and explain the difference.
*Solution.* See table T4b in Q4.
- Policy A costs 9, 1, 8, 1, 9, 1, 8, 1, 9 = **47**; policy B costs 9 + 8·1 = **17**.
- Repeating the pattern makes policy A Θ(n) per operation; at N = 1024 that is 1,028,536 for 4,513 operations.
- After a resize, policy A leaves the table exactly at the opposite threshold (Φ ≈ 0, nothing prepaid). Policy B leaves α = 1/2, so at least size/4 deletes or size/2 inserts, each adding potential, must happen before the next resize (MIT; the algs4 exercise; CMU Ex. 3).

**P16 (potential method with a given Φ).** Use Φ = 2·num − size if α ≥ 1/2 and size/2 − num if α < 1/2. The table doubles when full and halves when a DELETE leaves α < 1/4. Compute ĉ for:
(a) DELETE at num = 4, size = 16;
(b) INSERT at num = size = 8;
(c) DELETE at num = 10, size = 16;
(d) DELETE at num = 8, size = 16;
(e) INSERT at num = 7, size = 16.

*Solution.*
- (a) num drops to 3 < 16/4, so the table contracts to size 8 and copies 3 items: c = 4. Φ goes from 8 − 4 = 4 to 4 − 3 = 1. ĉ = 4 + 1 − 4 = **1**.
- (b) The table expands to size 16: c = 8 + 1 = 9. Φ goes from 8 to 18 − 16 = 2. ĉ = 9 − 6 = **3**.
- (c) c = 1. Φ goes from 4 to 2. ĉ = **−1**. Negative amortized costs are legal.
- (d) c = 1. Φ goes from 0 to 8 − 7 = 1. ĉ = **2**, the worst case for DELETE.
- (e) c = 1. Φ goes from 8 − 7 = 1 to 0. ĉ = **0**.

**P17 (find the flaw).** A student uses Φ = num − size for the doubling table (CMU model: start with size 1; a write costs 1; each move costs 1). They "prove" an amortized append cost of 2: a normal append gives 1 + 1 = 2, and a growing append at num = size = s gives (s + 1) + (1 − s) = 2. What is wrong? Give a counterexample.
*Solution.* The algebra is right, but Φ is not a valid potential, because it falls below Φ(D_0) = −1. Over five appends Φ goes −1, 0, 0, −1, 0, −3. Since Σc = Σĉ + Φ(D_0) − Φ(D_n), the amortized total underestimates the real one. Counterexample: 5 appends cost 1 + 2 + 3 + 1 + 5 = **12 > 10 = 2·5**. CMU's valid potential, Φ = 2n − c, gives 3. This is exactly why the condition Φ(D_i) ≥ Φ(D_0) matters.

**P18 (potential with a given Φ).** A set S supports INSERT (cost 1) and DELETE-LARGER-HALF, which removes the ⌈|S|/2⌉ largest elements at cost |S| using linear-time selection. With Φ = 2|S|, find the amortized costs and bound n operations.
*Solution.*
- INSERT: ĉ = 1 + 2 = **3**.
- DLH with s = |S|: c = s and ΔΦ = −2⌈s/2⌉ ≤ −s, so ĉ ≤ **0** (exactly 0 for even s, −1 for odd s).

Φ(D_0) = 0 and Φ ≥ 0, so n operations cost ≤ 3·#INSERT ≤ 3n. The script checked random sequences. This is a classic textbook-style exercise; the solution is derived here.

**P19 (write an ADT specification).** Specify the Queue ADT: (a) operation signatures with their classification, (b) pre/postconditions, (c) algebraic axioms. Then: which axiom distinguishes a queue from a stack?
*Solution.* Parts (a) and (b):
```
values: finite sequences q = ⟨x1, …, xn⟩, x1 = front
new()         : → Queue                creator    pre: none      post: q = ⟨⟩
enqueue(Q, x) : Queue × Item → void    mutator    pre: none      post: q' = ⟨x1, …, xn, x⟩
dequeue(Q)    : Queue → Item           mutator    pre: n ≥ 1     post: returns x1; q' = ⟨x2, …, xn⟩
front(Q)      : Queue → Item           observer   pre: n ≥ 1     post: returns x1; q unchanged
isEmpty(Q)    : Queue → Boolean        observer   pre: none      post: returns (n = 0)
size(Q)       : Queue → Integer        observer   pre: none      post: returns n
```
(c) Axioms Q1–Q6 as given in Q6.
Distinguishing axiom: for a stack, top(push(S, x)) = x; for a non-empty queue, front(enqueue(Q, x)) = front(Q) (Q4). This is Wikipedia's point that the interfaces are similar and "it is the constraints that distinguish" LIFO from FIFO.

**P20 (ADT vs data structure; choosing an implementation).**
(a) Classify each item as an ADT, a data structure or an implementation: priority queue; binary heap; `IndexMinPQ.java`; dictionary (symbol table); hash table with separate chaining; `SeparateChainingHashST.java`; stack; resizing array; Fibonacci heap.
(b) Choose an implementation, with the deciding cost, for each case:
(i) Dijkstra on a large graph with many more decrease-keys than vertices;
(ii) a dictionary that must also answer "all keys between a and b in sorted order";
(iii) a queue in a hard real-time controller where no single call may be slow.

*Solution.*
(a)
- ADTs: priority queue, dictionary, stack.
- Data structures: binary heap, hash table with separate chaining, resizing array, Fibonacci heap.
- Implementations: `IndexMinPQ.java` (a PQ via a binary heap) and `SeparateChainingHashST.java`.

(b)
- (i) A **Fibonacci heap**: Dijkstra makes O(n) extract-mins and O(m) decrease-keys, so the cost is O(m + n log n) with O(1) amortized decrease-key, versus O(m log n) with a binary heap (CS166 L11; algs4 cheatsheet). CS166 notes practical drawbacks (locality of reference, caching), so binary heaps remain common in practice.
- (ii) A **red-black BST**: log n worst case for search, insert and delete, and it keeps keys ordered. A hash table is O(1) only on average under uniform hashing, and it is unordered.
- (iii) A **linked-list queue**: O(1) worst case. A resizing array or a two-stack queue is O(1) only *amortized*, so a single call can cost Θ(n) (algs4 §1.4).

#### Compact verification script (re-runnable; Python 3, standard library only)
```python
# verify_tables.py -- re-checks the bookkeeping tables in these notes (Python 3, standard library only)
from fractions import Fraction as F
import random


def stack(ops):                      # T1/P9: PUSH $2, POP $0, MULTIPOP $0; potential = |S|
    S, bank, tot = [], 0, 0
    for op, arg in ops:
        before = len(S)
        if op == "PUSH":
            S.append(arg); c, a = 1, 2
        elif op == "POP":
            S.pop(); c, a = 1, 0
        else:
            k = min(arg, len(S)); del S[len(S) - k:]; c, a = k, 0
        tot += c; bank += a - c
        assert bank == len(S) and c + len(S) - before == a
    return tot


def counter(k, n):                   # T2: $2 per 0->1 set; potential = number of 1 bits
    A, bank, tot = [0] * k, 0, 0
    for i in range(1, n + 1):
        before, j = sum(A), 0
        while j < k and A[j]:
            A[j] = 0; j += 1
        sets = 1 if j < k else 0
        if sets:
            A[j] = 1
        c = j + sets; tot += c; bank += 2 * sets - c
        assert bank == sum(A) and c + sum(A) - before <= 2 and tot <= 2 * i
    return tot


def table(n):                        # T3: $3 per insert; potential = 2*num - size
    size = num = tot = 0
    for i in range(1, n + 1):
        phi0, moves = 2 * num - size, 0
        if num == size:
            moves, size = num, (2 * size if size else 1)
        num += 1; c = moves + 1; tot += c
        assert c + (2 * num - size) - phi0 <= 3 and 3 * i - tot == (2 * num - size) + 1
    return tot


def queue(ops):                      # T5: ENQ $3, DEQ $1; potential = 2*|In|
    In, Out, bank, tot, out = [], [], 0, 0, []
    for op in ops:
        before = 2 * len(In)
        if op[0] == "E":
            In.append(op[1:]); c, a = 1, 3
        else:
            c = 0
            if not Out:
                while In:
                    Out.append(In.pop()); c += 2
            out.append(Out.pop()); c += 1; a = 1
        tot += c; bank += a - c
        assert bank == 2 * len(In) and c + 2 * len(In) - before == a
    return tot, out


def phi(num, size):                  # expansion + contraction potential
    if size == 0:
        return F(0)
    return F(2 * num - size) if 2 * num >= size else F(size, 2) - num


def step(op, num, size, shrink):     # double when full; halve when a delete makes num/size < shrink
    if op == "I":
        moves = 0
        if num == size:
            moves, size = num, (2 * size if size else 1)
        return num + 1, size, moves + 1
    num -= 1; c = 1
    if size and F(num, size) < shrink:
        c += num; size //= 2
    return num, size, c


print(stack([("PUSH", "a"), ("PUSH", "b"), ("PUSH", "c"), ("POP", 0), ("PUSH", "d"), ("PUSH", "e"),
             ("MULTIPOP", 3), ("PUSH", "f"), ("MULTIPOP", 5), ("PUSH", "g")]))   # 13
print(counter(4, 16), table(17))                                                 # 30 48
print(queue(["E1", "E2", "E3", "D", "E4", "D", "D", "D", "E5", "D"]))            # (20, ['1', '2', '3', '4', '5'])
for shrink in (F(1, 2), F(1, 4)):                                                # P15: 47 vs 17
    num = size = 0
    for _ in range(8):
        num, size, _ = step("I", num, size, shrink)
    total = 0
    for op in "IDDIIDDII":
        num, size, c = step(op, num, size, shrink); total += c
    print("shrink when below", shrink, "-> cost of I,D,D,I,I,D,D,I,I =", total)
for op, num, size in [("D", 4, 16), ("I", 8, 8), ("D", 10, 16), ("D", 8, 16), ("I", 7, 16)]:  # P16
    n2, s2, c = step(op, num, size, F(1, 4))
    print(op, "at", num, "/", size, "-> amortized", c + phi(n2, s2) - phi(num, size))  # 1, 3, -1, 2, 0
worst = {"I": F(-99), "D": F(-99)}
for _ in range(2000):                                                            # random sequences
    num = size = 0
    for _ in range(200):
        op = "I" if num == 0 or random.random() < 0.5 else "D"
        n2, s2, c = step(op, num, size, F(1, 4))
        worst[op] = max(worst[op], c + phi(n2, s2) - phi(num, size)); num, size = n2, s2
print({k: str(v) for k, v in worst.items()})                                     # {'I': '3', 'D': '2'}
```
Expected output (verified): `13`, `30 48`, `(20, ['1', '2', '3', '4', '5'])`, the shrink costs 47 and 17, the P16 amortized costs 1, 3, −1, 2, 0, and `{'I': '3', 'D': '2'}`. The fuller script behind these notes ran 590,655 assertions with 0 failures. It also covered random MULTIPOP, two-stack-queue and expand/contract sequences, P2–P18, and property checks of the stack and queue axioms.

### Gaps
- I found no university exam with an answer key that targets amortized analysis specifically. The web-search quota ran out mid-task, so I could only fetch URLs I already knew. The CMU Recitation 4 solutions (cmu.box.com) may need a login.
- Erickson's exercises have no published solutions. The solutions to P2–P20 here are my own derivations, checked by script; they are not quoted from an answer key.


---

<!-- FILE: 04_red_black_trees_avl_btrees.md -->

# Red-Black Trees (CLRS), AVL Trees and B-Trees: Outside Research Notes for the SOC3030-003 Midterm

*Outside material (internet sources plus my own checks), kept separate from Prof. Seth Ashish's slides "RED BLACK TREES" and "RB Tree Deletion". Prepared 2026-10-19 for the week-8 midterm (24–30 Oct 2026). Every tree trace in these notes was generated and checked by [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>), a line-by-line Python port of the CLRS pseudocode saved in the `scripts (red-black tree traces)` subfolder next to this file. After every single insert and delete, the script re-checks BST order, parent pointers and all five red-black properties. It also stress-tests 30,000 random operations. Run `python3 "scripts (red-black tree traces)/04_rb_verify.py"` to reprint everything.*

**How to read the ASCII trees in these notes**
- `10B` is a black node with key 10 and `20R` is a red node. The NIL leaves are not drawn: every missing child is the black sentinel `T.nil`. For letter keys the format is `Q-B` / `K-R`.
- During insertion, `*` marks the current `z`.
- During deletion, `NIL(BB)` or `15(BB)` marks `x` while it carries an extra black ("doubly black"). `15(RB)` means `x` is red-and-black, so it only needs to be recolored black.
- Primed cases (Case 1', 2', 3', 4') are the **mirror images**. In insertion this means `z.p` is a right child. In deletion it means `x` is a right child.
- Black-height follows CLRS: `bh(x)` is the number of black nodes on a path from `x` down to a NIL leaf, **not counting x** and **counting the NIL**. Heights are counted in edges unless a line says otherwise.

## 1. The 5 RB properties, the NIL sentinel, black-height, and the height ≤ 2·lg(n+1) bound

### Takeaway
A red-black tree is a binary search tree with one color bit per node. Five rules force every root-to-NIL path to contain the same number of black nodes, and they forbid two reds in a row. So the longest path is at most twice the shortest, which gives height h ≤ 2·lg(n+1) and O(lg n) search.

### Cited Findings
**The five properties, using CLRS numbering.** The fixup proofs refer to these numbers ([CLRS ch. 13, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)):
1. Every node is either red or black.
2. The root is black.
3. Every leaf (NIL) is black.
4. If a node is red, then both its children are black (no two reds in a row on any path).
5. For each node, all simple paths from the node to descendant leaves contain the same number of black nodes.

- MIT's lecture uses a 4-rule version that merges CLRS rules 2 and 3 and states rule 4 from the child's side: "1. Every node is either red or black. 2. The root and leaves (NIL's) are black. 3. If a node is red, then its parent is black. 4. All simple paths from any node x to a descendant leaf have the same number of black nodes = black-height(x)." In MIT's numbering, property 3 is CLRS property 4 ([MIT 6.046J L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)).
- The root rule is a convention. "Some authors, e.g. Cormen & al., claim 'the root is black' as fifth requirement; but not Mehlhorn & Sanders or Sedgewick & Wayne." Also, "Since the root can always be changed from red to black, this rule has little effect on analysis." ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree))
- A handy corollary for "is this valid?" questions: "If a node N has exactly one child, the child must be red" ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)). That red child must itself have two NIL children, otherwise property 5 fails at N. Candidate (c) in Problem 7 shows this failure ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).

**The NIL sentinel**
- CLRS stores every NIL leaf, and also the root's parent, as one shared black object `T.nil`. Code can then read `x.color` or `x.p` for a "missing" child without special cases ([CLRS ch. 13, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)). The MIT slides draw the NIL leaves explicitly and color them black ([MIT L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)).
- RB-TRANSPLANT runs `v.p = u.p` even when `v = T.nil`. This lets RB-DELETE-FIXUP start from `x = T.nil` and still find `x.p` ([CLRS, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)). The script relies on the same trick. It asserts that when `x = T.nil` carries the extra black, the sibling is never `T.nil`, so the test `x == x.p.left` is never ambiguous ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).

**Black-height**
- CLRS defines `bh(x)` as the number of black nodes on any simple path from, but not including, `x` down to a leaf. The NIL leaf is counted, so `bh(T.nil) = 0`. The black-height of the tree is `bh(root)` ([CLRS, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)).
- The MIT slides annotate an example tree this way: "bh = 2" at the black root 7 and at the red node 18, "bh = 1" at the black node 10 and at the red node 8, and "bh = 0" at the NIL leaves. This matches "do not count x, do count NIL" ([MIT L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)).
- Other sources count differently. Wikipedia: "The black height of a red–black tree is the number of black nodes in any path from the root to the leaves", and "the black height of a null node shall be set to 0" ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)).
- Worked example: the tree built by inserting 10, 20, 30, 15, 25, 5, 1 (Section 3) has 1R: bh=1, 5B: bh=1, 10R: bh=2, 15B: bh=1, 20B: bh=2, 25R: bh=1, 30B: bh=1 ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).

**Proof sketch: height h ≤ 2·lg(n+1)** (CLRS Lemma 13.1; [CLRS, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/))
1. *Claim:* the subtree rooted at any node `x` has at least 2^bh(x) − 1 internal nodes. *Proof by induction on the height of x.* If x is `T.nil`, then 2^0 − 1 = 0. Otherwise each child has black-height at least bh(x) − 1: exactly bh(x) for a red child and bh(x) − 1 for a black child. So the subtree has at least 2·(2^(bh(x)−1) − 1) + 1 = 2^bh(x) − 1 internal nodes.
2. By property 4, at least half of the nodes on any root-to-leaf path, not counting the root, are black. So bh(root) ≥ h/2.
3. Combining: n ≥ 2^(h/2) − 1, so **h ≤ 2·lg(n+1)**.

- The free solution to CLRS 13.1-5 (longest path ≤ 2 × shortest) uses the same "no two reds in a row" counting ([Bodnar & Lohr, CLRS ch. 13 solutions](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)).
- MIT's intuition proof: "Merge red nodes into their black parents." "This process produces a tree in which each node has 2, 3, or 4 children." "The 2-3-4 tree has uniform depth h′ of leaves." "h′ ≥ h/2, since at most half the leaves on any path are red." "The number of leaves in each tree is n + 1 ⇒ n + 1 ≥ 2^h′ ⇒ lg(n + 1) ≥ h′ ≥ h/2 ⇒ h ≤ 2 lg(n + 1)." ([MIT L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf))
- Corollary: "The queries SEARCH, MIN, MAX, SUCCESSOR, and PREDECESSOR all run in O(lg n) time on a red-black tree with n nodes." ([MIT L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf))
- Wikipedia gives the range "log₂(n+1) ≤ h ≤ 2log₂(n+2)−2" under its own height convention ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)).
- **Extreme node counts for a given black-height k** (CLRS 13.1-6), computed exactly by dynamic programming over (black-height, color) ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)):

| k = bh(root) | min internal nodes (all black, perfect) | formula 2^k - 1 | max internal nodes (alternating B/R levels, complete) | formula 4^k - 1 = 2^(2k) - 1 |
|---|---|---|---|---|
| 1 | 1 | 1 | 3 | 3 |
| 2 | 3 | 3 | 15 | 15 |
| 3 | 7 | 7 | 63 | 63 |
| 4 | 15 | 15 | 255 | 255 |
| 5 | 31 | 31 | 1023 | 1023 |

- Conflicting source: the free Bodnar–Lohr solution to 13.1-6 says "2^(2k+1) − 1" (max) and "2^(k+1) − 1" (min) ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)). That does not match the CLRS black-height convention, and the DP above contradicts it ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)). Sanity check with k = 1: the root is black with bh = 1, so its children are NIL or red nodes with NIL children. That allows 1 to 3 nodes, not up to 7.
- Every count between those extremes is achievable (checked for k ≤ 4). So an RB tree with n internal nodes can have bh(root) = k **exactly when 2^k − 1 ≤ n ≤ 4^k − 1**. For example, n = 7 allows k ∈ {2, 3} and n = 20 allows k ∈ {3, 4} ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).

### Inferences
- The "factor 2" in the height bound comes entirely from properties 4 and 5. The shortest root-to-NIL path can be all black. The longest can at best alternate black/red. Both contain the same number of black nodes. With bh(root) = k, the height (in edges to NIL) is between k and 2k.
- Exam reflex for "is this a valid RB tree?": a red root violates 2, a red-red pair violates 4, and unequal black counts violate 5. Check property 5 at **every** node, not only at the root (Problem 7).
- The 2^bh − 1 lemma is the only real induction in the chapter. It is a likely "prove it" question, so memorize the three-line proof above.

### Gaps
- I could not quote the CLRS text directly. There is no legal free copy, and the MIT Press page refused automated access. The CLRS definitions above are the book's standard statements, cross-checked against the MIT slides and the free Rutgers solutions, not quoted from a page.
- These notes deliberately do not use the course slides. Check which black-height convention Prof. Ashish uses (counting the node itself or not, counting NIL or not), because answers shift by 1 between conventions.

## 2. Rotations: LEFT-ROTATE and RIGHT-ROTATE

### Takeaway
A rotation is an O(1) pointer operation that swaps a parent with one of its children. The in-order sequence (α, x, β, y, γ) stays identical, so BST order is preserved. In CLRS, rotations never change colors; recoloring is always a separate step.

### Cited Findings
- "Rotations maintain the inorder ordering of keys: a ∈ α, b ∈ β, c ∈ γ ⇒ a ≤ A ≤ b ≤ B ≤ c. A rotation can be performed in O(1) time." ([MIT L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf))
- CLRS-style pseudocode. It assumes `x.right ≠ T.nil` for LEFT-ROTATE and `y.left ≠ T.nil` for RIGHT-ROTATE, and that the root's parent is `T.nil` ([CLRS 13.2, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/); ported in [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)). RIGHT-ROTATE is also written out in the free solution to 13.2-1. That version has a typo: "t.right.p = x" should read "y.right.p = x" ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)).

```
LEFT-ROTATE(T, x)                          RIGHT-ROTATE(T, y)        // exact mirror
 1  y = x.right          // set y            1  x = y.left
 2  x.right = y.left     // beta moves       2  y.left = x.right
 3  if y.left != T.nil                       3  if x.right != T.nil
 4      y.left.p = x                         4      x.right.p = y
 5  y.p = x.p            // link parent      5  x.p = y.p
 6  if x.p == T.nil                          6  if y.p == T.nil
 7      T.root = y                           7      T.root = x
 8  elseif x == x.p.left                     8  elseif y == y.p.right
 9      x.p.left = y                         9      y.p.right = x
10  else x.p.right = y                      10  else y.p.left = x
11  y.left = x           // x under y       11  x.right = y
12  x.p = y                                 12  y.p = x
```

- **Pointer changes in LEFT-ROTATE(T, x)**, with y = x.right and β = y.left:
  1. `x.right = β`
  2. `β.p = x` (skipped if β is NIL)
  3. `y.p = x.p`
  4. the old parent's child pointer, or `T.root`, now points to y
  5. `y.left = x`
  6. `x.p = y`

  Three links change (x–β, parent–y, x–y), each written in both directions ([CLRS, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/); [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).
- Verified trace. The in-order list is printed before and after ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)):

```
Before (x = 10, y = x.right = 15, beta = y.left = 12):
    __________20B_
   /              \
  10B____        30B
 /       \
5B     _15B_
      /     \
     12B   17B
in-order: [5, 10, 12, 15, 17, 20, 30]

After LEFT-ROTATE(T, 10):
          ____20B_
         /        \
    ____15B_     30B
   /        \
  10B_     17B
 /    \
5B   12B
in-order: [5, 10, 12, 15, 17, 20, 30]   (unchanged)

After RIGHT-ROTATE(T, 15) (undoes it):
    __________20B_
   /              \
  10B____        30B
 /       \
5B     _15B_
      /     \
     12B   17B
```

- CLRS 13.2-3: after a left rotation at x, "the depth of c decreases by one, the depth of b stays the same, and the depth of a increases by 1" (a ∈ α, b ∈ β, c ∈ γ) ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)).
- An n-node BST has exactly n − 1 possible rotations (CLRS 13.2-2). Any BST can be turned into any other BST on the same keys with O(n) rotations (13.2-4): rotate both into a right-going chain using at most n − 1 right rotations each ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)).
- Contrast with Sedgewick's code: in algs4, `rotateLeft` also moves colors (`x.color = h.color; h.color = RED;`). CLRS rotations do not ([algs4 RedBlackBST.java](https://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html)).

### Inferences
- **Why BST order is preserved:** before the rotation the in-order listing is α, x, β, y, γ, and afterwards it is still α, x, β, y, γ. Only parenthood changes. β can move from y's left to x's right because every key in β lies between x and y.
- Mnemonic: in LEFT-ROTATE(x), x goes down to the left and its right child comes up. In RIGHT-ROTATE(y), y goes down to the right and its left child comes up. The node you pass in is the one that goes **down**.
- A simpler argument for "n − 1 rotations": each of the n − 1 parent–child edges supports exactly one rotation (left if the child is a right child, right otherwise).

### Gaps
- None significant.

## 3. Search and insertion: RB-INSERT and RB-INSERT-FIXUP (all cases and mirrors)

### Takeaway
Search is plain BST search and takes O(lg n) because of the height bound. Insertion does a BST insert of a **red** node z, then runs RB-INSERT-FIXUP, which only has to repair a red-red pair (property 4) or a red root (property 2).
- **Uncle red:** recolor and move up two levels.
- **Uncle black, triangle shape:** rotate at the parent to make a line.
- **Uncle black, line shape:** recolor and rotate at the grandparent, then stop.

So an insertion uses at most 2 rotations and O(lg n) recolorings.

### Cited Findings
- MIT's statement of the idea: "Insert x in tree. Color x red. Only red-black property 3 might be violated. Move the violation up the tree by recoloring until it can be fixed with rotations and recoloring." MIT property 3 is CLRS property 4 ([MIT L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)).
- Why the new node is red (CLRS 13.3-1): coloring z black would violate property 5, "because any path from the root to a leaf under z would have one more black node than the paths to the other leaves" ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)).
- MIT's analysis: "Go up the tree performing Case 1, which only recolors nodes. If Case 2 or Case 3 occurs, perform 1 or 2 rotations, and terminate. Running time: O(lg n) with O(1) rotations." ([MIT L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)). The Linux kernel docs say "at most two rotations" ([Linux kernel rbtree docs](https://docs.kernel.org/core-api/rbtree.html)), and Wikipedia says "at most two rotations occur in total" ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)).

#### CLRS-style pseudocode (mirror half written out in full)
Sources: [CLRS 12.2/13.3, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/), executed line by line in [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>). Some printings show only the "then" half and replace the mirror half with "same as then clause with right and left exchanged". MIT's slide version is the same algorithm in older notation ("color[p[x]]") ([MIT L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)).

```
ITERATIVE-TREE-SEARCH(x, k)        // call with x = T.root; returns T.nil if k is absent
1  while x != T.nil and k != x.key
2      if k < x.key
3          x = x.left
4      else x = x.right
5  return x

RB-INSERT(T, z)
 1  y = T.nil
 2  x = T.root
 3  while x != T.nil                  // ordinary BST descent
 4      y = x
 5      if z.key < x.key
 6          x = x.left
 7      else x = x.right
 8  z.p = y
 9  if y == T.nil
10      T.root = z                    // tree was empty
11  elseif z.key < y.key
12      y.left = z
13  else y.right = z
14  z.left = T.nil
15  z.right = T.nil
16  z.color = RED
17  RB-INSERT-FIXUP(T, z)

RB-INSERT-FIXUP(T, z)
 1  while z.p.color == RED
 2      if z.p == z.p.p.left                  // parent is a LEFT child
 3          y = z.p.p.right                   // y = uncle
 4          if y.color == RED
 5              z.p.color = BLACK             // case 1
 6              y.color = BLACK               // case 1
 7              z.p.p.color = RED             // case 1
 8              z = z.p.p                     // case 1
 9          else if z == z.p.right
10                  z = z.p                   // case 2
11                  LEFT-ROTATE(T, z)         // case 2
12              z.p.color = BLACK             // case 3
13              z.p.p.color = RED             // case 3
14              RIGHT-ROTATE(T, z.p.p)        // case 3
15      else                                  // parent is a RIGHT child: mirror image
16          y = z.p.p.left
17          if y.color == RED
18              z.p.color = BLACK             // case 1'
19              y.color = BLACK               // case 1'
20              z.p.p.color = RED             // case 1'
21              z = z.p.p                     // case 1'
22          else if z == z.p.left
23                  z = z.p                   // case 2'
24                  RIGHT-ROTATE(T, z)        // case 2'
25              z.p.color = BLACK             // case 3'
26              z.p.p.color = RED             // case 3'
27              LEFT-ROTATE(T, z.p.p)         // case 3'
28  T.root.color = BLACK
```

#### Every insertion case as a crisp rule
The loop runs only while z and its parent p are both red. Let g = grandparent and u = uncle. A NIL uncle counts as BLACK. Rules are from [CLRS, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) and checked in [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>).

| Case | When | Do exactly this | Rotations | Afterwards |
|---|---|---|---|---|
| 1 (p is LEFT child of g) | u is **RED** | p→BLACK, u→BLACK, g→RED; then z = g | 0 | loop again 2 levels higher (the red-red may reappear at g) |
| 2 (p LEFT) | u **BLACK**, z is p's **RIGHT** child (triangle, "LR") | z = p; **LEFT-ROTATE(p)** | 1 | always falls into Case 3 |
| 3 (p LEFT) | u **BLACK**, z is p's **LEFT** child (line, "LL") | p→BLACK, g→RED; **RIGHT-ROTATE(g)** | 1 | done (new subtree root is black) |
| 1' (p is RIGHT child of g) | u is **RED** | p→BLACK, u→BLACK, g→RED; then z = g | 0 | loop again 2 levels higher |
| 2' (p RIGHT) | u **BLACK**, z is p's **LEFT** child (triangle, "RL") | z = p; **RIGHT-ROTATE(p)** | 1 | always falls into Case 3' |
| 3' (p RIGHT) | u **BLACK**, z is p's **RIGHT** child (line, "RR") | p→BLACK, g→RED; **LEFT-ROTATE(g)** | 1 | done |
| (exit) | p is BLACK, or z is the root | color the root BLACK (last line) | 0 | done |

Wikipedia numbers the same cases differently: its I2 is CLRS Case 1 ("Recolor P and U to black, G to red; reassign N := G"), its I5 is Case 2 ("Rotate at P; reassign N := P, then proceed to I6"), and its I6 is Case 3 ("Rotate at G; swap colors of P and G") ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)).

#### Why at most 2 rotations, and why the time is O(lg n)
- Case 1 performs no rotation and moves z up two levels. So it can repeat at most about h/2 = O(lg n) times, and each repetition costs O(1).
- Rotations happen only in Cases 2 and 3. Case 2 always leads into Case 3, and Case 3 makes the top of the repaired subtree black, so the `while` test fails and the loop ends. In the worst case one insertion uses Case 2 + Case 3 = 2 rotations ([MIT L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf); [Linux kernel rbtree docs](https://docs.kernel.org/core-api/rbtree.html)).
- Empirical check. Rotations per insert never exceeded 2, and up to 5 Case-1 recolorings occurred in one insert ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)):

```
CLRS RB tree, 30,000 random inserts/deletes (keys 0..599), RB properties + BST order checked after EVERY op:
  rotations per insert : {0: 10697, 1: 2222, 2: 2231}   (max 2)
  rotations per delete : {0: 11177, 1: 2225, 2: 1343, 3: 105}   (max 3)
  most Case-1 recolorings in one insert: 5;  most Case-2 steps in one delete: 4
  worst observed height / lg(n+1): 1.439  (theory: <= 2)
AVL tree, same workload (a double rotation counted as 2 single rotations):
  rotations per insert : {0: 9059, 1: 3060, 2: 3039}   (max 2)
  rotations per delete : {0: 11357, 1: 2087, 2: 1194, 3: 145, 4: 56, 5: 3}   (max 5)
```

#### Worked trace A: insert 10, 20, 30, 15, 25, 5, 1 into an empty tree (the requested example)
Generated by [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>). Each step shows the tree immediately after that line of the algorithm.

**Insert 10** -- fixup cases: none; rotations: 0; after: n = 1, bh(root) = 1, RB properties OK.
```
(a) BST-insert 10: tree was empty, so z = 10 is the (red) root.
    10R*
(b) Last line of RB-INSERT-FIXUP: root 10 is RED -> color it BLACK.
    10B
```

**Insert 20** -- fixup cases: none; rotations: 0; after: n = 2, bh(root) = 1, RB properties OK.
```
(a) BST-insert 20 as a RED leaf, right child of 10B (z = 20).
    10B__
         \
       20R*
(b) Parent 10 is BLACK -> no violation, no fixup needed.
```

**Insert 30** -- fixup cases: Case 3'; rotations: 1; after: n = 3, bh(root) = 1, RB properties OK.
```
(a) BST-insert 30 as a RED leaf, right child of 20R (z = 30).
    10B_
        \
       20R__
            \
          30R*
(b) Case 3' (mirror line): uncle NIL is BLACK and z = 30 is the RIGHT child of RIGHT child 20 -> 20->B, 10->R; LEFT-ROTATE(10). Done.
      _20B__
     /      \
    10R   30R*
```

**Insert 15** -- fixup cases: Case 1; rotations: 0; after: n = 4, bh(root) = 2, RB properties OK.
```
(a) BST-insert 15 as a RED leaf, right child of 10R (z = 15).
      _____20B_
     /         \
    10R__     30R
         \
       15R*
(b) Case 1: parent 10 and uncle 30 are both RED -> recolor 10->B, 30->B, 20->R; z moves up to 20.
      ____20R*_
     /         \
    10B_      30B
        \
       15R
(c) Last line of RB-INSERT-FIXUP: root 20 is RED -> color it BLACK.
      ____20B_
     /        \
    10B_     30B
        \
       15R
```

**Insert 25** -- fixup cases: none; rotations: 0; after: n = 5, bh(root) = 2, RB properties OK.
```
(a) BST-insert 25 as a RED leaf, left child of 30B (z = 25).
      ____20B_____
     /            \
    10B_        _30B
        \      /
       15R   25R*
(b) Parent 30 is BLACK -> no violation, no fixup needed.
```

**Insert 5** -- fixup cases: none; rotations: 0; after: n = 6, bh(root) = 2, RB properties OK.
```
(a) BST-insert 5 as a RED leaf, left child of 10B (z = 5).
         ____20B____
        /           \
      _10B_       _30B
     /     \     /
    5R*   15R   25R
(b) Parent 10 is BLACK -> no violation, no fixup needed.
```

**Insert 1** -- fixup cases: Case 1; rotations: 0; after: n = 7, bh(root) = 2, RB properties OK.
```
(a) BST-insert 1 as a RED leaf, left child of 5R (z = 1).
           ____20B____
          /           \
         10B_       _30B
        /    \     /
      _5R   15R   25R
     /
    1R*
(b) Case 1: parent 5 and uncle 15 are both RED -> recolor 5->B, 15->B, 10->R; z moves up to 10.
           ____20B____
          /           \
        10R*_       _30B
       /     \     /
      5B    15B   25R
     /
    1R
(c) z = 10: its parent 20 is BLACK -> loop ends (root already BLACK).
```


Final tree after trace A (reused in Section 4):
```
      ____20B____
     /           \
    10R_       _30B
   /    \     /
  5B   15B   25R
 /
1R
```

#### Worked trace B: CLRS Figure 13.4, inserting 4 hits Case 1 → Case 2 → Case 3 in one call
This is the textbook's own example tree ([CLRS Fig. 13.4, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)), reproduced and checked by [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>).

Start tree (valid RB tree, bh(root) = 2):
```
    ______11B_
   /          \
  2R___      14B_
 /     \         \
1B    7B_       15R
     /   \
    5R  8R
```

**Insert 4** -- fixup cases: Case 1, Case 2, Case 3; rotations: 2; after: n = 9, bh(root) = 2, RB properties OK.
```
(a) BST-insert 4 as a RED leaf, left child of 5R (z = 4).
        _________11B_
       /             \
      2R______      14B_
     /        \         \
    1B       7B_       15R
            /   \
          _5R  8R
         /
        4R*
(b) Case 1: parent 5 and uncle 8 are both RED -> recolor 5->B, 8->B, 7->R; z moves up to 7.
        _________11B_
       /             \
      2R_____       14B_
     /       \          \
    1B      7R*_       15R
           /    \
          5B   8B
         /
        4R
(c) Case 2 (triangle): uncle 14 is BLACK and z = 7 is the RIGHT child of LEFT child 2 -> z = 2; LEFT-ROTATE(2). Now a line -> Case 3.
               __11B_
              /      \
        _____7R_    14B_
       /        \       \
      2R*___   8B      15R
     /      \
    1B     5B
          /
         4R
(d) Case 3 (line): uncle 14 is BLACK and z = 2 is the LEFT child of LEFT child 7 -> 7->B, 11->R; RIGHT-ROTATE(11). Done.
        _____7B___
       /          \
      2R*___     11R_
     /      \   /    \
    1B     5B  8B   14B_
          /             \
         4R            15R
```


#### Worked trace C: MIT lecture example, inserting 15 hits Case 1' → Case 2' → Case 3' (all mirrors)
The MIT slides narrate exactly this sequence: "Insert x = 15. Recolor, moving the violation up the tree. RIGHT-ROTATE(18). LEFT-ROTATE(7) and recolor." ([MIT L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)). The script output matches it ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).

Start tree (valid RB tree, bh(root) = 2):
```
  7B_________
 /           \
3B      ____18R_
       /        \
      10B_     22B_
     /    \        \
    8R   11R      26R
```

**Insert 15** -- fixup cases: Case 1', Case 2', Case 3'; rotations: 2; after: n = 9, bh(root) = 2, RB properties OK.
```
(a) BST-insert 15 as a RED leaf, right child of 11R (z = 15).
      7B_____________
     /               \
    3B      ________18R_
           /            \
          10B_         22B_
         /    \            \
        8R   11R__        26R
                  \
                15R*
(b) Case 1' (mirror): parent 11 and uncle 8 are both RED -> recolor 11->B, 8->B, 10->R; z moves up to 10.
      7B_____________
     /               \
    3B       _______18R_
            /           \
          10R*_        22B_
         /     \           \
        8B    11B_        26R
                  \
                 15R
(c) Case 2' (mirror triangle): uncle 3 is BLACK and z = 10 is the LEFT child of RIGHT child 18 -> z = 18; RIGHT-ROTATE(18). Now a line -> Case 3'.
      7B___
     /     \
    3B    10R________
         /           \
        8B     ____18R*_
              /         \
             11B_      22B_
                 \         \
                15R       26R
(d) Case 3' (mirror line): uncle 3 is BLACK and z = 18 is the RIGHT child of RIGHT child 10 -> 10->B, 7->R; LEFT-ROTATE(7). Done.
        __10B________
       /             \
      7R_      ____18R*_
     /   \    /         \
    3B  8B   11B_      22B_
                 \         \
                15R       26R
```


#### Mini-catalog: the four rotation shapes plus a mirror Case 1 ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>))

*Insert 10 after 30, 20: LL shape (line on the left) -> Case 3*

**Insert 10** -- fixup cases: Case 3; rotations: 1; after: n = 3, bh(root) = 1, RB properties OK.
```
(a) BST-insert 10 as a RED leaf, left child of 20R (z = 10).
          _30B
         /
       _20R
      /
    10R*
(b) Case 3 (line): uncle NIL is BLACK and z = 10 is the LEFT child of LEFT child 20 -> 20->B, 30->R; RIGHT-ROTATE(30). Done.
       _20B_
      /     \
    10R*   30R
```

*Insert 20 after 30, 10: LR shape (triangle) -> Case 2 then Case 3*

**Insert 20** -- fixup cases: Case 2, Case 3; rotations: 2; after: n = 3, bh(root) = 1, RB properties OK.
```
(a) BST-insert 20 as a RED leaf, right child of 10R (z = 20).
      _____30B
     /
    10R__
         \
       20R*
(b) Case 2 (triangle): uncle NIL is BLACK and z = 20 is the RIGHT child of LEFT child 10 -> z = 10; LEFT-ROTATE(10). Now a line -> Case 3.
          _30B
         /
       _20R
      /
    10R*
(c) Case 3 (line): uncle NIL is BLACK and z = 10 is the LEFT child of LEFT child 20 -> 20->B, 30->R; RIGHT-ROTATE(30). Done.
       _20B_
      /     \
    10R*   30R
```

*Insert 30 after 10, 20: RR shape (line on the right) -> Case 3' (mirror)*

**Insert 30** -- fixup cases: Case 3'; rotations: 1; after: n = 3, bh(root) = 1, RB properties OK.
```
(a) BST-insert 30 as a RED leaf, right child of 20R (z = 30).
    10B_
        \
       20R__
            \
          30R*
(b) Case 3' (mirror line): uncle NIL is BLACK and z = 30 is the RIGHT child of RIGHT child 20 -> 20->B, 10->R; LEFT-ROTATE(10). Done.
      _20B__
     /      \
    10R   30R*
```

*Insert 20 after 10, 30: RL shape (mirror triangle) -> Case 2' then Case 3'*

**Insert 20** -- fixup cases: Case 2', Case 3'; rotations: 2; after: n = 3, bh(root) = 1, RB properties OK.
```
(a) BST-insert 20 as a RED leaf, left child of 30R (z = 20).
    10B_____
            \
          _30R
         /
       20R*
(b) Case 2' (mirror triangle): uncle NIL is BLACK and z = 20 is the LEFT child of RIGHT child 30 -> z = 30; RIGHT-ROTATE(30). Now a line -> Case 3'.
    10B_
        \
       20R__
            \
          30R*
(c) Case 3' (mirror line): uncle NIL is BLACK and z = 30 is the RIGHT child of RIGHT child 20 -> 20->B, 10->R; LEFT-ROTATE(10). Done.
      _20B__
     /      \
    10R   30R*
```

*Insert 25 after 10, 5, 20: uncle red on the right side -> Case 1' (mirror)*

**Insert 25** -- fixup cases: Case 1'; rotations: 0; after: n = 4, bh(root) = 2, RB properties OK.
```
(a) BST-insert 25 as a RED leaf, right child of 20R (z = 25).
      10B_
     /    \
    5R   20R__
              \
            25R*
(b) Case 1' (mirror): parent 20 and uncle 5 are both RED -> recolor 20->B, 5->B, 10->R; z moves up to 10.
      10R*_
     /     \
    5B    20B_
              \
             25R
(c) Last line of RB-INSERT-FIXUP: root 10 is RED -> color it BLACK.
      10B_
     /    \
    5B   20B_
             \
            25R
```


### Inferences
- One-line decision procedure for insertion: **look at the uncle first**. If the uncle is red, recolor and move z to the grandparent. If the uncle is black, look at the shape. A triangle needs a rotation at the parent and then a line fix; a line needs a recolor plus a rotation at the grandparent.
- AVL-style names map directly: Case 3 = LL (one right rotation), Case 2 → 3 = LR (left then right), Case 3' = RR (one left rotation), Case 2' → 3' = RL (right then left). This matches the AVL rotation cases in Section 5, which helps remember both topics together.
- Case 1 is the red-black version of splitting a full 2-3-4 node: the grandparent "absorbs" the middle key and turns red. That is why it can propagate upward, the way B-tree splits do (Section 5).
- In trace A, inserting 15 shows that a red root produced by Case 1 is legal inside the loop and is fixed only by the final line `T.root.color = BLACK`. The tree's black-height grows in exactly those insertions where this last line actually recolors a red root. In 2-3-4 terms the root splits, and the tree gets one level taller at the top. The script confirmed this on 3,000 random insertions ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).

### Gaps
- The course slides might use different case numbers (some sources use I1–I6 or "LL/LR/RR/RL + recolor"). Learn the conditions, not the numbers.

## 4. Deletion: RB-TRANSPLANT, RB-DELETE and RB-DELETE-FIXUP (4 cases + mirrors, "double black")

### Takeaway
RB-DELETE works in three steps:
1. It does an ordinary BST delete with RB-TRANSPLANT. When z has two children, it uses the **successor** y = min(z.right).
2. It remembers the **original color of the node that was actually removed or moved (y)**.
3. It calls RB-DELETE-FIXUP(x) only if that color was **black**.

x is the node that took y's old place and is treated as carrying an "extra black". The fixup resolves it with 4 cases (plus mirrors), all decided by the sibling w and w's children. It uses at most 3 rotations and O(lg n) time.

### Cited Findings
- MIT on deletion: "RB-DELETE — same asymptotic running time and number of rotations as RB-INSERT (see textbook)." That means O(lg n) time and O(1) rotations; the exact worst case is 3 ([MIT L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)).
- Red-black trees "provide faster real-time bounded worst case performance for insertion and deletion (at most two rotations and three rotations, respectively, to balance the tree)" ([Linux kernel rbtree docs](https://docs.kernel.org/core-api/rbtree.html)). Wikipedia: "at most three rotations occur in total" ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)).
- Where the hard work is: "The complex case is when N is not the root, colored black and has no proper child (⇔ only NULL children)" ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)).
- CLRS 13.4-2: if x and x.p are both red, the fixup's `while` test fails immediately and x is simply colored black ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)).

#### CLRS-style pseudocode
Sources: [CLRS 13.4, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/), executed line by line in [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>). Some printings order lines 12–16 of RB-DELETE differently (testing `y ≠ z.right` first); the logic is identical.

```
RB-TRANSPLANT(T, u, v)           // put subtree v where subtree u was
1  if u.p == T.nil
2      T.root = v
3  elseif u == u.p.left
4      u.p.left = v
5  else u.p.right = v
6  v.p = u.p                     // executed even if v == T.nil (sentinel gets a parent)

TREE-MINIMUM(x)
1  while x.left != T.nil
2      x = x.left
3  return x

RB-DELETE(T, z)
 1  y = z
 2  y-original-color = y.color
 3  if z.left == T.nil
 4      x = z.right
 5      RB-TRANSPLANT(T, z, z.right)          // replace z by its right child
 6  elseif z.right == T.nil
 7      x = z.left
 8      RB-TRANSPLANT(T, z, z.left)           // replace z by its left child
 9  else y = TREE-MINIMUM(z.right)            // y = successor of z (no left child)
10      y-original-color = y.color
11      x = y.right
12      if y.p == z
13          x.p = y                           // needed when x == T.nil
14      else RB-TRANSPLANT(T, y, y.right)     // y leaves its old spot
15          y.right = z.right
16          y.right.p = y
17      RB-TRANSPLANT(T, z, y)                // y takes z's spot ...
18      y.left = z.left
19      y.left.p = y
20      y.color = z.color                     // ... and z's color
21  if y-original-color == BLACK
22      RB-DELETE-FIXUP(T, x)

RB-DELETE-FIXUP(T, x)
 1  while x != T.root and x.color == BLACK
 2      if x == x.p.left                          // x is a LEFT child
 3          w = x.p.right                         // w = sibling
 4          if w.color == RED
 5              w.color = BLACK                   // case 1
 6              x.p.color = RED                   // case 1
 7              LEFT-ROTATE(T, x.p)               // case 1
 8              w = x.p.right                     // case 1
 9          if w.left.color == BLACK and w.right.color == BLACK
10              w.color = RED                     // case 2
11              x = x.p                           // case 2
12          else if w.right.color == BLACK
13                  w.left.color = BLACK          // case 3
14                  w.color = RED                 // case 3
15                  RIGHT-ROTATE(T, w)            // case 3
16                  w = x.p.right                 // case 3
17              w.color = x.p.color               // case 4
18              x.p.color = BLACK                 // case 4
19              w.right.color = BLACK             // case 4
20              LEFT-ROTATE(T, x.p)               // case 4
21              x = T.root                        // case 4
22      else                                      // x is a RIGHT child: mirror image
23          w = x.p.left
24          if w.color == RED
25              w.color = BLACK                   // case 1'
26              x.p.color = RED                   // case 1'
27              RIGHT-ROTATE(T, x.p)              // case 1'
28              w = x.p.left                      // case 1'
29          if w.right.color == BLACK and w.left.color == BLACK
30              w.color = RED                     // case 2'
31              x = x.p                           // case 2'
32          else if w.left.color == BLACK
33                  w.right.color = BLACK         // case 3'
34                  w.color = RED                 // case 3'
35                  LEFT-ROTATE(T, w)             // case 3'
36                  w = x.p.left                  // case 3'
37              w.color = x.p.color               // case 4'
38              x.p.color = BLACK                 // case 4'
39              w.left.color = BLACK              // case 4'
40              RIGHT-ROTATE(T, x.p)              // case 4'
41              x = T.root                        // case 4'
42  x.color = BLACK
```

#### BST part: which node disappears, and when the fixup is needed
Rules from [CLRS 13.4, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/), checked in [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>):

| z has… | y (node removed or moved) | x (node that moves into y's old spot) | fixup needed iff |
|---|---|---|---|
| no left child | y = z | x = z.right (may be T.nil) | **z** was black |
| no right child | y = z | x = z.left | **z** was black |
| two children | y = successor = TREE-MINIMUM(z.right); y has no left child | x = y.right (may be T.nil). If y.p == z, then x.p = y. Otherwise y is first replaced by x at y's old spot | **y's original color** was black (z's color does not matter, because y inherits it) |

- CLRS gives three reasons why a black y causes trouble:
  1. If y was the root and a red child becomes the root, property 2 breaks.
  2. If x and x.p are both red, property 4 breaks.
  3. Every path that used to go through y now has one fewer black node, so property 5 breaks.

  Removing or moving a **red** y breaks nothing: no black-height changes, no red-red pair can form, and y could not have been the root ([CLRS 13.4, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)).

#### The "double black" view
- Pretend x carries one extra black, so property 5 holds again. The job of the fixup is to get rid of that extra black. There are three easy exits and four cases ([CLRS 13.4, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)):
  - **Exit 1:** x is red ("red-and-black"). Color it black and stop (the last line of the fixup).
  - **Exit 2:** x is the root. Drop the extra black; bh of the whole tree falls by 1.
  - **Exit 3:** x is black ("doubly black") and not the root. Apply the cases below.
- The cases look at the sibling w and its two children (the nephews). The **near** nephew is the child of w on x's side, and the **far** nephew is on the other side ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree) uses "close nephew C" and "distant nephew D").

#### Every deletion case as a crisp rule (x doubly black, w = sibling)
Rules from [CLRS 13.4, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/), checked in [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>):

| Case | When (x is a LEFT child) | Do exactly this | Rot. | Next |
|---|---|---|---|---|
| 1 | w is **RED** | w→BLACK, x.p→RED, **LEFT-ROTATE(x.p)**, w = new x.p.right | 1 | the new sibling is black and x.p is red → go to case 2, 3 or 4 |
| 2 | w BLACK, **both** nephews BLACK | w→RED; x = x.p (the extra black moves up) | 0 | if the new x is red → stop and color it black; if it is the root → stop; else loop |
| 3 | w BLACK, **near** nephew w.left RED, **far** nephew w.right BLACK | w.left→BLACK, w→RED, **RIGHT-ROTATE(w)**, w = new x.p.right | 1 | always → case 4 |
| 4 | w BLACK, **far** nephew w.right RED (near nephew any color) | w.color = x.p.color, x.p→BLACK, w.right→BLACK, **LEFT-ROTATE(x.p)**, x = root | 1 | stop |

| Mirror | When (x is a RIGHT child) | Do exactly this |
|---|---|---|
| 1' | w RED | w→BLACK, x.p→RED, **RIGHT-ROTATE(x.p)**, w = new x.p.left |
| 2' | w BLACK, both nephews BLACK | w→RED; x = x.p |
| 3' | w BLACK, **near** nephew w.right RED, **far** nephew w.left BLACK | w.right→BLACK, w→RED, **LEFT-ROTATE(w)**, w = new x.p.left |
| 4' | w BLACK, **far** nephew w.left RED | w.color = x.p.color, x.p→BLACK, w.left→BLACK, **RIGHT-ROTATE(x.p)**, x = root |

- Wikipedia numbers these differently: its D3 = Case 1 ("S red → Rotate at P"), D2 = Case 2 with a black parent, D4 = Case 2 with a red parent ("Swap colors of S and P; return"), D5 = Case 3 ("close nephew C red, distant nephew D black → Rotate at S"), and D6 = Case 4 ("distant nephew D red → Rotate at P; swap P and S colors; recolor D black") ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)).

#### Why at most 3 rotations, and O(lg n) time
- Case 2 is the only case that can repeat. It moves x up one level with no rotation, so there are at most about h = O(lg n) iterations.
- After Case 1, the parent of x is red. If Case 2 follows, the new x is that red parent, so the loop ends. Cases 3 and 4 also end the loop: Case 3 always goes to Case 4, and Case 4 sets x = root.
- So rotations happen only in the final stretch Case 1 → Case 3 → Case 4, which gives at most **3** rotations ([Linux kernel rbtree docs](https://docs.kernel.org/core-api/rbtree.html); [Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)).
- Problem 5 shows a deletion that really uses 3 rotations. In the stress test above, rotations per delete never exceeded 3 ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).

#### Worked trace D: from the trace-A tree, delete 20, 15, 30, 1, 5 (requested example)
The script searched every deletion order of up to 5 keys for this tree. The best orders reach 6 different fixup cases, and this order is one of them. Together with its first delete it covers:
- a two-child delete with a red successor (no fixup)
- Case 4'
- Case 1' → Case 2' (stops at a red parent)
- Case 3 → Case 4
- Case 2 reaching the root

Source: [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>).

Start tree (valid RB tree, bh(root) = 2):
```
      ____20B____
     /           \
    10R_       _30B
   /    \     /
  5B   15B   25R
 /
1R
```

**Delete 20** -- fixup cases: none; rotations: 0; after: n = 6, bh(root) = 2, RB properties OK.
```
(a) Delete 20B: two children -> successor y = 25 (original color R); x = y.right = NIL; y = 25 is deeper, so RB-TRANSPLANT(25, NIL) first; y moves into 20's spot and takes its color B. The moved node's original color was RED -> no property can break; no fixup.
          ____25B_
         /        \
        10R_     30B
       /    \
      5B   15B
     /
    1R
```

**Delete 15** -- fixup cases: Case 4'; rotations: 1; after: n = 5, bh(root) = 2, RB properties OK.
```
(a) Delete 15B: it has no left child -> RB-TRANSPLANT(15, its right child NIL); x = NIL. The removed node's original color was BLACK -> x gets an extra black (doubly black); call RB-DELETE-FIXUP(x = NIL).
          ________25B_
         /            \
        10R___       30B
       /      \
      5B   NIL(BB)
     /
    1R
(b) Case 4' (mirror): sibling w = 5 is BLACK and its FAR child 1 is RED -> 5 takes parent's color (R), 10->B, 1->B; RIGHT-ROTATE(10); x = root. Done.
        ___25B_
       /       \
      5R_     30B
     /   \
    1B  10B
```

**Delete 30** -- fixup cases: Case 1', Case 2'; rotations: 1; after: n = 4, bh(root) = 2, RB properties OK.
```
(a) Delete 30B: it has no left child -> RB-TRANSPLANT(30, its right child NIL); x = NIL. The removed node's original color was BLACK -> x gets an extra black (doubly black); call RB-DELETE-FIXUP(x = NIL).
        ___25B___
       /         \
      5R_     NIL(BB)
     /   \
    1B  10B
(b) Case 1' (mirror): sibling w = 5 is RED -> 5->B, parent 25->R; RIGHT-ROTATE(25); new sibling w = 10 (black) -> continue with case 2'/3'/4'.
      5B____
     /      \
    1B    _25R___
         /       \
        10B   NIL(BB)
(c) Case 2' (mirror): sibling w = 10 is BLACK with two BLACK children -> 10->R; the extra black moves up to the parent. x = 25 is RED (red-and-black) -> loop stops; color it BLACK.
      5B______
     /        \
    1B    _25(RB)
         /
        10R
(d) Last line of RB-DELETE-FIXUP: x = 25 is RED -> color it BLACK.
      5B____
     /      \
    1B    _25B
         /
        10R
```

**Delete 1** -- fixup cases: Case 3, Case 4; rotations: 2; after: n = 3, bh(root) = 2, RB properties OK.
```
(a) Delete 1B: it has no left child -> RB-TRANSPLANT(1, its right child NIL); x = NIL. The removed node's original color was BLACK -> x gets an extra black (doubly black); call RB-DELETE-FIXUP(x = NIL).
        ___5B____
       /         \
    NIL(BB)    _25B
              /
             10R
(b) Case 3: sibling w = 25 is BLACK, its NEAR child 10 is RED and FAR child NIL is BLACK -> 10->B, 25->R; RIGHT-ROTATE(25); new sibling w = 10 -> Case 4.
        ___5B_
       /      \
    NIL(BB)  10B_
                 \
                25R
(c) Case 4: sibling w = 10 is BLACK and its FAR child 25 is RED -> 10 takes parent's color (B), 5->B, 25->B; LEFT-ROTATE(5); x = root. Done.
      10B_
     /    \
    5B   25B
```

**Delete 5** -- fixup cases: Case 2; rotations: 0; after: n = 2, bh(root) = 1, RB properties OK.
```
(a) Delete 5B: it has no left child -> RB-TRANSPLANT(5, its right child NIL); x = NIL. The removed node's original color was BLACK -> x gets an extra black (doubly black); call RB-DELETE-FIXUP(x = NIL).
        ___10B_
       /       \
    NIL(BB)   25B
(b) Case 2: sibling w = 25 is BLACK with two BLACK children -> 25->R; the extra black moves up to the parent. x = 10 is the root -> loop stops.
    10(BB)_
           \
          25R
(c) x = 10 is the root: the extra black is simply dropped (every root-to-leaf path lost one black, so bh(root) fell by 1).
    10B_
        \
       25R
```


#### Deletion mini-catalog: every remaining case and every BST situation ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>))

*Case 1 (red sibling) -> Case 2 with a RED parent (stops at once)*

Start tree (valid RB tree, bh(root) = 2):
```
  10B____
 /       \
5B     _30R_
      /     \
     20B   40B
```

**Delete 5** -- fixup cases: Case 1, Case 2; rotations: 1; after: n = 4, bh(root) = 2, RB properties OK.
```
(a) Delete 5B: it has no left child -> RB-TRANSPLANT(5, its right child NIL); x = NIL. The removed node's original color was BLACK -> x gets an extra black (doubly black); call RB-DELETE-FIXUP(x = NIL).
        ___10B____
       /          \
    NIL(BB)     _30R_
               /     \
              20B   40B
(b) Case 1: sibling w = 30 is RED -> 30->B, parent 10->R; LEFT-ROTATE(10); new sibling w = 20 (black) -> continue with case 2/3/4.
             ____30B_
            /        \
        ___10R_     40B
       /       \
    NIL(BB)   20B
(c) Case 2: sibling w = 20 is BLACK with two BLACK children -> 20->R; the extra black moves up to the parent. x = 10 is RED (red-and-black) -> loop stops; color it BLACK.
        _____30B_
       /         \
    10(RB)_     40B
           \
          20R
(d) Last line of RB-DELETE-FIXUP: x = 10 is RED -> color it BLACK.
      ____30B_
     /        \
    10B_     40B
        \
       20R
```

*Case 2 twice: the extra black climbs to the root (all-black tree)*

Start tree (valid RB tree, bh(root) = 3):
```
    ____20B____
   /           \
  10B_       _30B_
 /    \     /     \
5B   15B   25B   35B
```

**Delete 5** -- fixup cases: Case 2, Case 2; rotations: 0; after: n = 6, bh(root) = 2, RB properties OK.
```
(a) Delete 5B: it has no left child -> RB-TRANSPLANT(5, its right child NIL); x = NIL. The removed node's original color was BLACK -> x gets an extra black (doubly black); call RB-DELETE-FIXUP(x = NIL).
             ____20B____
            /           \
        ___10B_       _30B_
       /       \     /     \
    NIL(BB)   15B   25B   35B
(b) Case 2: sibling w = 15 is BLACK with two BLACK children -> 15->R; the extra black moves up to the parent. x = 10 is BLACK -> still doubly black, repeat at the higher level.
        _____20B____
       /            \
    10(BB)_       _30B_
           \     /     \
          15R   25B   35B
(c) Case 2: sibling w = 30 is BLACK with two BLACK children -> 30->R; the extra black moves up to the parent. x = 20 is the root -> loop stops.
      ____20(BB)____
     /              \
    10B_          _30R_
        \        /     \
       15R      25B   35B
(d) x = 20 is the root: the extra black is simply dropped (every root-to-leaf path lost one black, so bh(root) fell by 1).
      ____20B____
     /           \
    10B_       _30R_
        \     /     \
       15R   25B   35B
```

*Case 3' -> Case 4' (mirror: x is a RIGHT child)*

Start tree (valid RB tree, bh(root) = 2):
```
  __10B_
 /      \
5B_    20B
   \
  7R
```

**Delete 20** -- fixup cases: Case 3', Case 4'; rotations: 2; after: n = 3, bh(root) = 2, RB properties OK.
```
(a) Delete 20B: it has no left child -> RB-TRANSPLANT(20, its right child NIL); x = NIL. The removed node's original color was BLACK -> x gets an extra black (doubly black); call RB-DELETE-FIXUP(x = NIL).
      __10B___
     /        \
    5B_    NIL(BB)
       \
      7R
(b) Case 3' (mirror): sibling w = 5 is BLACK, its NEAR child 7 is RED and FAR child NIL is BLACK -> 7->B, 5->R; LEFT-ROTATE(5); new sibling w = 7 -> Case 4'.
        10B___
       /      \
      7B   NIL(BB)
     /
    5R
(c) Case 4' (mirror): sibling w = 7 is BLACK and its FAR child 5 is RED -> 7 takes parent's color (B), 10->B, 5->B; RIGHT-ROTATE(10); x = root. Done.
      7B_
     /   \
    5B  10B
```

*Case 4 with a RED parent (w inherits RED)*

Start tree (valid RB tree, bh(root) = 2):
```
    _______20B____
   /              \
  10R_          _30B_
 /    \        /     \
5B   15B_     25R   35R
         \
        17R
```

**Delete 5** -- fixup cases: Case 4; rotations: 1; after: n = 7, bh(root) = 2, RB properties OK.
```
(a) Delete 5B: it has no left child -> RB-TRANSPLANT(5, its right child NIL); x = NIL. The removed node's original color was BLACK -> x gets an extra black (doubly black); call RB-DELETE-FIXUP(x = NIL).
             _______20B____
            /              \
        ___10R_          _30B_
       /       \        /     \
    NIL(BB)   15B_     25R   35R
                  \
                 17R
(b) Case 4: sibling w = 15 is BLACK and its FAR child 17 is RED -> 15 takes parent's color (R), 10->B, 17->B; LEFT-ROTATE(10); x = root. Done.
         ____20B____
        /           \
      _15R_       _30B_
     /     \     /     \
    10B   17B   25R   35R
```

*deleting a RED leaf: no fixup*

Start tree (valid RB tree, bh(root) = 2):
```
    _20B_
   /     \
  10B   30B
 /
5R
```

**Delete 5** -- fixup cases: none; rotations: 0; after: n = 3, bh(root) = 2, RB properties OK.
```
(a) Delete 5R: it has no left child -> RB-TRANSPLANT(5, its right child NIL); x = NIL. The removed node's original color was RED -> no property can break; no fixup.
      _20B_
     /     \
    10B   30B
```

*deleting a BLACK node with one RED child: x is red-and-black -> just recolor*

Start tree (valid RB tree, bh(root) = 2):
```
    _20B_
   /     \
  10B   30B
 /
5R
```

**Delete 10** -- fixup cases: none; rotations: 0; after: n = 3, bh(root) = 2, RB properties OK.
```
(a) Delete 10B: it has no right child -> RB-TRANSPLANT(10, its left child 5); x = 5. The removed node's original color was BLACK -> x gets an extra black (red-and-black); call RB-DELETE-FIXUP(x = 5).
       __20B_
      /      \
    5(RB)   30B
(b) Last line of RB-DELETE-FIXUP: x = 5 is RED -> color it BLACK.
      20B_
     /    \
    5B   30B
```

*two children, successor y IS z.right (the 'x.p = y' line); x red*

Start tree (valid RB tree, bh(root) = 3):
```
    _______20B____
   /              \
  10B_          _30B_
 /    \        /     \
5B   15B_     25B   35B
         \
        17R
```

**Delete 10** -- fixup cases: none; rotations: 0; after: n = 7, bh(root) = 3, RB properties OK.
```
(a) Delete 10B: two children -> successor y = 15 (original color B); x = y.right = 17; y = 15 is z's right child, so x.p = 15; y moves into 10's spot and takes its color B. The moved node's original color was BLACK -> x gets an extra black (red-and-black); call RB-DELETE-FIXUP(x = 17).
        _______20B____
       /              \
      15B___        _30B_
     /      \      /     \
    5B   17(RB)   25B   35B
(b) Last line of RB-DELETE-FIXUP: x = 17 is RED -> color it BLACK.
        ____20B____
       /           \
      15B_       _30B_
     /    \     /     \
    5B   17B   25B   35B
```

*two children, successor deeper and BLACK: x = NIL at y's old spot; Case 2 then Case 2'*

Start tree (valid RB tree, bh(root) = 3):
```
    ____20B____
   /           \
  10B_       _30B_
 /    \     /     \
5B   15B   25B   35B
```

**Delete 20** -- fixup cases: Case 2, Case 2'; rotations: 0; after: n = 6, bh(root) = 2, RB properties OK.
```
(a) Delete 20B: two children -> successor y = 25 (original color B); x = y.right = NIL; y = 25 is deeper, so RB-TRANSPLANT(25, NIL) first; y moves into 20's spot and takes its color B. The moved node's original color was BLACK -> x gets an extra black (doubly black); call RB-DELETE-FIXUP(x = NIL).
        ____25B________
       /               \
      10B_         ___30B_
     /    \       /       \
    5B   15B   NIL(BB)   35B
(b) Case 2: sibling w = 35 is BLACK with two BLACK children -> 35->R; the extra black moves up to the parent. x = 30 is BLACK -> still doubly black, repeat at the higher level.
        ____25B___
       /          \
      10B_     30(BB)_
     /    \           \
    5B   15B         35R
(c) Case 2' (mirror): sibling w = 10 is BLACK with two BLACK children -> 10->R; the extra black moves up to the parent. x = 25 is the root -> loop stops.
        ____25(BB)_
       /           \
      10R_        30B_
     /    \           \
    5B   15B         35R
(d) x = 25 is the root: the extra black is simply dropped (every root-to-leaf path lost one black, so bh(root) fell by 1).
        ____25B_
       /        \
      10R_     30B_
     /    \        \
    5B   15B      35R
```


### Inferences
- Exam decision procedure for deletion:
  1. Find y and x.
  2. If y's original color was red, stop.
  3. If x is red, recolor it black and stop.
  4. Otherwise look at the sibling w. If w is red, use Case 1 and re-look. If w's children are both black, use Case 2 and move up. If only the near nephew is red, use Case 3 then Case 4. If the far nephew is red, use Case 4.
- Mapping to 2-3-4 trees (my reading of the correspondence in Section 5):
  - Case 2 is a **merge** (fusion) of x's node with its sibling, pulling a key down from the parent; this is why it can propagate upward.
  - Cases 3 and 4 are a **borrow/transfer** from a sibling node that has a spare key; this is why they end the loop.
  - Case 1 only re-orients the parent's 3-node so that the real sibling becomes black.
- Case 4 gives w the **parent's original color**. When the parent was red (catalog example "Case 4 with a RED parent"), the new subtree root is red, not black.
- In trace D, deleting 20 needed no fixup even though 20 was black, because the node that moved (successor 25) was red. Problem 4 is the reverse: z = 10 is red, but the moved successor 15 was black, so the fixup is needed.

### Gaps
- I did not check which replacement rule the course slides use: CLRS uses the successor, while some textbooks and the USFCA visualizer use the predecessor. Answers differ (see Section 7).

## 5. AVL trees, B-trees, 2-3-4 trees, and the RB vs AVL vs B-tree comparison

### Takeaway
- **AVL trees** keep |height(left) − height(right)| ≤ 1 at every node. Their height is about 1.44·lg n, so lookups are a little faster than in RB trees. An insert needs at most one single or double rotation, but a delete may rotate at many levels.
- **B-trees** (CLRS minimum degree t) keep t−1 to 2t−1 keys per non-root node with all leaves on one level. Their height is about log_t n, which minimizes disk reads.
- **2-3-4 trees** are B-trees with t = 2. A CLRS red-black tree is a 2-3-4 tree written in binary form: each black node plus its red children is one 2-3-4 node.

### Cited Findings
**AVL trees**
- Definition: "For every node, require heights of left & right children to differ by at most ±1." with "treat nil tree as height -1" ([MIT 6.006 F11 Lecture 6 notes](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/83cdd705cd418d10d9769b741e34a2b8_MIT6_006F11_lec06.pdf)). Wikipedia defines the balance factor as height(right) − height(left) and requires "BF(X) ∈ {−1, 0, 1}" ([Wikipedia: AVL tree](https://en.wikipedia.org/wiki/AVL_tree)). These notes use height(left) − height(right); the sign convention differs between sources.
- Height bound: "Nh = Nh−1 + Nh−2 + 1", "Nh > Fh (nth Fibonacci number)", "max. h ≈ logϕ n ≈ 1.440 lg n" ([MIT 6.006 notes](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/83cdd705cd418d10d9769b741e34a2b8_MIT6_006F11_lec06.pdf)). The precise form is "log₂(n+1) ≤ h < log_φ(n+2)+b" with b ≈ −0.3277, that is h < 1.4405·lg(n+2) − 0.3277, because "an AVL tree of height h contains at least F_{h+2}−1 nodes" ([Wikipedia: AVL tree](https://en.wikipedia.org/wiki/AVL_tree)).
- The four imbalance cases ([Wikipedia: AVL tree](https://en.wikipedia.org/wiki/AVL_tree)):
  - Right Right → "simple rotation rotate_Left"
  - Left Left → "simple rotation rotate_Right"
  - Right Left → "double rotation rotate_RightLeft"
  - Left Right → "double rotation rotate_LeftRight"
- MIT describes the double rotation as Right-Rotate(z) followed by Left-Rotate(x) for a right-heavy x whose right child z is left-heavy ([MIT 6.006 notes](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/83cdd705cd418d10d9769b741e34a2b8_MIT6_006F11_lec06.pdf)).
- Rotations per update:
  - **Insert:** "the adequate rotation immediately perfectly rebalances the tree", so one single or double rotation suffices. Deletion may need rebalancing on "a maximum of O(log n) retracing levels" ([Wikipedia: AVL tree](https://en.wikipedia.org/wiki/AVL_tree)).
  - The free CLRS Problem 13-3(d) solution also argues that only a single rotation occurs per AVL insertion ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)).
  - **Measured:** at most 2 single rotations per insert and up to 5 per delete on the same random workload as the RB stress test above ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).
- AVL insertion of the trace-A keys. Only inserting 30 triggers a rotation, and the final shape happens to equal the RB tree's shape ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)):

```
insert 10: no rotation
insert 20: no rotation
insert 30: RR imbalance at 10 -> single LEFT rotation at 10
insert 15: no rotation
insert 25: no rotation
insert 5: no rotation
insert 1: no rotation
final AVL tree (keys only):
    __20___
   /       \
  10_     30
 /   \   /
 5  15  25
/
1
```

- Example of one AVL delete that rebalances at **two different levels**; an RB delete never needs more than 3 rotations in total ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)):

```
AVL tree built by inserting 4, 8, 5, 10, 11, 7, 12, 1, 9, 6, 3, 2:
     __8____
    /       \
   _5_     11_
  /   \   /   \
 _3   7  10  12
/  \ /  /
1  4 6  9
 \
 2

delete 11 (two children -> successor 12 copied up, then 12's node removed):
  rebalance #1: LL at 12 -> single RIGHT rotation at 12
  rebalance #2: LL at 8 -> single RIGHT rotation at 8

result:
   _5__
  /    \
 _3    8__
/  \  /   \
1  4  7  10_
 \   /  /   \
 2   6  9  12
```

- Relationship to RB trees: "Every AVL tree can be colored red–black, but there are RB trees which are not AVL balanced." "AVL trees are more rigidly balanced than RB trees with an asymptotic relation AVL/RB ≈0.720 of the maximal heights." For lookup-intensive applications, "AVL trees are faster than red–black trees because they are more strictly balanced." "RB trees require storing one bit … while AVL trees mostly use two bits for the balance factor." ([Wikipedia: AVL tree](https://en.wikipedia.org/wiki/AVL_tree)). Ben Pfaff's measured AVL-to-RB runtime ratios ranged from 0.677 to 1.077 (median 0.947), so in practice the two are close ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)).

**B-trees**
- CLRS definition with **minimum degree t ≥ 2** ([CLRS ch. 18, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/); the invariants are asserted after every insert in [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)):
  - Every node other than the root has **at least t−1 keys**, so a non-root internal node has at least t children.
  - Every node has **at most 2t−1 keys**, so at most 2t children. A node with 2t−1 keys is "full".
  - A non-empty root has at least 1 key.
  - Keys inside a node are sorted, and an internal node with k keys has k+1 children.
  - All leaves have the same depth.
- Knuth's "order m" convention: "Every node has at most m children. Every node, except for the root and the leaves, has at least ⌈m/2⌉ children. The root node has at least two children unless it is a leaf. All leaves appear on the same level. A non-leaf node with k children contains k−1 keys." Also, "the literature on B-trees is not uniform in its terminology" ([Wikipedia: B-tree](https://en.wikipedia.org/wiki/B-tree)). Rule of thumb: CLRS t corresponds to Knuth order m = 2t.
- Height bounds: worst case "h_max = ⌊log_d((n+1)/2)⌋", where d is the minimum number of children, which is CLRS's t. That is the same as CLRS's h ≤ log_t((n+1)/2). Best case "h_min = ⌈log_m(n+1)⌉ − 1" ([Wikipedia: B-tree](https://en.wikipedia.org/wiki/B-tree)).
- Proof sketch of the CLRS bound: the root has at least 1 key, and depth i has at least 2t^(i−1) nodes with at least t−1 keys each. So n ≥ 1 + (t−1)·Σ_{i=1..h} 2t^(i−1) = 2t^h − 1, which gives t^h ≤ (n+1)/2 ([CLRS ch. 18, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)).
- Insertion by splitting: "evenly split it into two nodes … A single median is chosen … The separation value is inserted in the node's parent, which may cause it to be split." The alternative "supports a single pass down the tree from the root … splitting any full nodes encountered on the way pre-emptively" ([Wikipedia: B-tree](https://en.wikipedia.org/wiki/B-tree)). CLRS B-TREE-INSERT uses the pre-emptive single pass. A full **root** is split first, and that is the only way the height grows: the tree grows at the top, not at the bottom ([CLRS ch. 18, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/); trace below from [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).
- Why B-trees suit disks: "By allowing more children under one node than a regular self-balancing binary search tree, the B-tree reduces the height of the tree and puts the data in fewer separate blocks. This is especially important for trees stored in secondary storage (e.g., disk drives)." ([Wikipedia: B-tree](https://en.wikipedia.org/wiki/B-tree)). With t in the hundreds or thousands, a search touches only h+1 nodes, i.e. h+1 disk pages. For example, a full height-2 tree with 1000 keys per node holds 1000·(1 + 1001 + 1001²) = 1,003,003,000 keys (arithmetic in [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).
- Uses: "The B-tree remains the standard index implementation in almost all relational databases". "Apple's filesystem HFS+ and APFS, Microsoft's NTFS, AIX (jfs2) and some Linux filesystems, such as Bcachefs, Btrfs and ext4, use B-trees." ([Wikipedia: B-tree](https://en.wikipedia.org/wiki/B-tree))
- Deletion handles underflow by **borrowing** ("steal") a key from a sibling through the parent, or by **merging** with a sibling. The USFCA implementation also replaces an internal key by its predecessor ("Finding the largest key in that subtree") ([USFCA BTree.js](https://www.cs.usfca.edu/~galles/visualization/AlgorithmLibrary/BTree.js)).

**2-3-4 trees and the red-black correspondence**
- "Red–black trees are similar in structure to 2–3–4 trees, which are B-trees of order 4." "These 2–3–4 nodes correspond to black node – red children groups in red-black trees." ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)). A CLRS B-tree with t = 2 is exactly a 2-3-4 tree: 1–3 keys and 2–4 children per node ([CLRS ch. 18, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)).
- MIT uses this to prove the height bound: merging red nodes into black parents "produces a tree in which each node has 2, 3, or 4 children", with all leaves at the same depth ([MIT L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)).
- The mapping is not unique in the RB direction: "Since red links can lean either way in 3-nodes (and, for some implementations in 4-nodes), the correspondence is not necessarily 1-1." Also, "In terms of 2-3-4 trees, a color flip is the essential operation: it corresponds to splitting a 4-node and passing the middle node up to the parent." ([Sedgewick, Left-leaning Red-Black Trees, 2008](https://sedgewick.io/wp-content/themes/sedgewick/papers/2008LLRB.pdf))
- Verified side by side: CLRS B-TREE-INSERT with t = 2 on the trace-A keys, compared with the RB tree from trace A collapsed into 2-3-4 nodes. They agree for this sequence ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)):

```
insert 10: no split   ->  [10]
insert 20: no split   ->  [10 20]
insert 30: no split   ->  [10 20 30]
insert 15: root is full -> make a new empty root (height grows by 1); split full node -> median 20 moves up; halves [10] and [30]   ->  [20] / [10 15]  [30]
insert 25: no split   ->  [20] / [10 15]  [25 30]
insert 5: no split   ->  [20] / [5 10 15]  [25 30]
insert 1: split full node -> median 10 moves up; halves [5] and [15]   ->  [10 20] / [1 5]  [15]  [25 30]

CLRS RB tree after the same inserts, red nodes merged into black parents:
[10 20] / [1 5]  [15]  [25 30]
```

#### Comparison table: RB vs AVL vs B-tree
Sources for each cell are cited above; rotation figures marked "measured" come from the stress test in Section 3 ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).

| | Red-black tree (CLRS) | AVL tree | B-tree (CLRS, minimum degree t) |
|---|---|---|---|
| Balance rule | 5 color properties: no red-red, equal black count on all paths | \|bf\| ≤ 1 at every node | non-root nodes hold t−1 … 2t−1 keys; all leaves at the same depth |
| Worst-case height | h ≤ 2·lg(n+1) | h < 1.4405·lg(n+2) − 0.3277 ≈ 1.44·lg n (≈ 0.72 × RB worst case) | h ≤ log_t((n+1)/2) |
| Extra data per node | 1 color bit | balance factor (2 bits) or height | key count, leaf flag, up to 2t child pointers |
| Search cost | O(lg n) | O(lg n), slightly shallower trees, so usually the fastest in-memory lookups | O(log_t n) node or disk reads; O(t·log_t n) CPU with linear scan in each node |
| Rotations per insert | ≤ 2 (measured max 2) | ≤ 1 single or double rotation = ≤ 2 single (measured max 2) | none; ≤ h+1 node splits (CLRS splits pre-emptively on the way down) |
| Rotations per delete | ≤ 3 (measured max 3) | O(lg n), possibly at every level (measured up to 5) | none; borrows (a key rotates through the parent) and merges, O(h) |
| Recolorings / height updates | O(lg n) worst case per update (Case 1 or Case 2 propagation), O(1) on average | O(lg n) height updates on the path | — |
| Typical uses | Java `TreeMap`, Linux kernel (CFS, timers, VMAs, epoll), Java 8 `HashMap` collision bins, library ordered maps/sets | lookup-heavy in-memory sets and maps | database indexes and file systems (NTFS, HFS+, APFS, Btrfs, ext4) — data on disk/SSD |

- Recoloring cost: "Rebalancing (i.e. color changes) has a worst-case time complexity of O(log n) and average of O(1)" ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)).
- Usage sources:
  - Java: "A Red-Black tree based NavigableMap implementation … guaranteed log(n) time cost for the containsKey, get, put and remove operations. Algorithms are adaptations of those in Cormen, Leiserson, and Rivest's Introduction to Algorithms." ([Java SE 21 TreeMap docs](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/TreeMap.html))
  - Linux: "The deadline and CFQ I/O schedulers employ rbtrees to track requests … The high-resolution timer code uses an rbtree … Virtual memory areas (VMAs) are tracked with red-black trees, as are epoll file descriptors, cryptographic keys, and network packets …" ([Linux kernel rbtree docs](https://docs.kernel.org/core-api/rbtree.html))
  - "the Completely Fair Scheduler and epoll system call of the Linux kernel use red–black trees" and "As of Java 8, the HashMap has been modified such that instead of using a LinkedList to store different elements with colliding hashcodes, a red–black tree is used" ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)).
  - Sedgewick: RB trees "are the underlying data structure for symbol-table implementations within C++, Java, Python, BSD Unix, and many other modern systems" ([Sedgewick 2008](https://sedgewick.io/wp-content/themes/sedgewick/papers/2008LLRB.pdf)).

### Inferences
- **Choosing a structure:** use an AVL tree when lookups dominate and data is in memory, and a red-black tree when inserts and deletes are frequent (O(1) rotations, cheap rebalancing). Use a B-tree whenever a node visit costs a disk or SSD page read, because there the height matters far more than CPU work inside a node.
- The three structures are one family. A 2-3-4 tree is a B-tree with t = 2, and an RB tree is a 2-3-4 tree in binary clothing. RB insert Case 1 corresponds to a B-tree split, and RB delete Case 2 corresponds to a B-tree merge (Sections 3–4). Black-height = number of levels of the 2-3-4 tree = 2-3-4 height + 1 (verified in Problem 16).
- AVL vs RB lookup speed is a constant-factor difference (1.44 vs 2 in the worst-case bounds). Both are O(lg n); measured differences are small (Pfaff's median ratio ≈ 0.95).

### Gaps
- I did not fetch a separate .edu page for the CLRS B-tree definitions. They come from the book (cited via the publisher page) and the invariant checks in the script, with Wikipedia's matching bound.
- I did not verify the claim that a specific C++ standard library uses RB trees; Sedgewick's general statement is the only cited support.

## 6. CLRS red-black trees vs Sedgewick's left-leaning red-black (LLRB) trees: don't mix them up

### Takeaway
Princeton's algs4 book, its Coursera course and Sedgewick's 2008 paper teach the **left-leaning** variant (LLRB). It corresponds 1-1 to 2-3 trees, forbids red right children, uses recursive put() with color flips, and has rotations that move colors. CLRS trees correspond to 2-3-4 trees, allow red right children and a black node with two red children, and use the uncle and sibling case analysis. The two give different trees for the same inputs, so an exam on CLRS must be answered with CLRS rules.

### Cited Findings
- Sedgewick's three ideas: "Use a recursive implementation." "Require that all 3-nodes lean left." "Perform rotations on the way up the tree (after the recursive calls)." And "the left-leaning versions of 2-3 trees and top-down 2-3-4 trees differ in the position of one line of code." ([Sedgewick 2008](https://sedgewick.io/wp-content/themes/sedgewick/papers/2008LLRB.pdf))
- algs4's RedBlackBST is a "left-leaning red-black BST", "the 2-3 version". Its `put()` ends with three fix-up lines ([algs4 RedBlackBST.java](https://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html)):
  ```
  if (isRed(h.right) && !isRed(h.left))      h = rotateLeft(h);
  if (isRed(h.left)  &&  isRed(h.left.left)) h = rotateRight(h);
  if (isRed(h.left)  &&  isRed(h.right))     flipColors(h);
  ```
  Each node stores the "color of parent link" ([algs4 RedBlackBST.java](https://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html)).
- algs4 on the 2-3 correspondence: "We represent 3-nodes as two 2-nodes connected by a single red link that leans left." Also: "if we draw the red links horizontally in a red-black BST, all of the null links are the same distance from the root, and if we then collapse together the nodes connected by red links, the result is a 2-3 tree." And: "The height of a red-black BST with N nodes is no more than 2 lg N." ([algs4 §3.3](https://algs4.cs.princeton.edu/33balanced/))
- LLRB deletion works top-down: "we perform rotations and color flips on the way down the search path to ensure that the search does not end on a 2-node", using `moveRedLeft()`/`moveRedRight()` and `fixUp()` ([Sedgewick 2008](https://sedgewick.io/wp-content/themes/sedgewick/papers/2008LLRB.pdf)). This is completely different from CLRS's bottom-up double-black fixup.
- "The LLRB maintains an additional invariant that all red links must lean left except during inserts and deletes." ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree))
- Open Data Structures uses yet another left-leaning variant ("At any node u, if u.left is black, then u.right is black") and says plainly: "No single definition of red-black trees exists. Rather, there is a family of structures that manage to maintain the black-height and no-red-edge properties." ([Open Data Structures §9.2](https://opendatastructures.org/ods-java/9_2_RedBlackTree_Simulated_.html))
- Same inputs, different answers. The left column runs CLRS RB-INSERT and the right column runs a port of algs4 `put()` ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)):

```
insert 10, 20:
CLRS (2-3-4 style)    Sedgewick LLRB (algs4, 2-3 style)
10B_                    _20B
    \                  /
   20R                10R

insert 1, 2, 3:
CLRS (2-3-4 style)    Sedgewick LLRB (algs4, 2-3 style)
  2B_                   2B_
 /   \                 /   \
1R  3R                1B  3B

insert 1, 2, 3, 4, 5:
CLRS (2-3-4 style)    Sedgewick LLRB (algs4, 2-3 style)
  2B___                   __4B_
 /     \                 /     \
1B    4B_               2R_   5B
     /   \             /   \
    3R  5R            1B  3B

insert 1, 2, 3, 4, 5, 6, 7, 8, 9, 10:
CLRS (2-3-4 style)         Sedgewick LLRB (algs4, 2-3 style)
    __4B___                    __4B_______
   /       \                  /           \
  2B_     6B___              2B_       __8B___
 /   \   /     \            /   \     /       \
1B  3B  5B    8R_          1B  3B    6R_     10B
             /   \                  /   \   /
            7B  9B_                5B  7B  9R
                   \       
                  10R      
```

| | CLRS (this course) | Sedgewick LLRB (algs4 / Coursera) |
|---|---|---|
| Equivalent B-tree | 2-3-4 tree (a black node with 2 red children = 4-node, kept) | 2-3 tree (4-nodes split immediately by flipColors) |
| Red right child allowed? | yes (insert 10, 20 → 10B with red right child 20) | no (rotateLeft) |
| Insert algorithm | iterative, bottom-up, parent pointers + sentinel, uncle-based Cases 1–3 + mirrors | recursive put(); 3 lines on the way up |
| Rotations change colors? | no | yes (`x.color = h.color; h.color = RED`) |
| Delete algorithm | transplant + successor + double-black Cases 1–4 + mirrors | top-down moveRedLeft/moveRedRight, deleteMin, fixUp |
| Max rotations per op | insert ≤ 2, delete ≤ 3 | not the CLRS bounds — do not quote CLRS numbers for LLRB |

### Inferences
- If a YouTube video or visualizer says "red links lean left", "flipColors" or "moveRedLeft", it is LLRB. Do not use its pictures to check CLRS answers. The USFCA Red/Black visualizer is the classic (non-left-leaning) bottom-up kind for insertion (Section 9).
- For the trace-A keys (10, 20, 30, 15, 25, 5, 1), CLRS and LLRB happen to end in the same tree (the script checked this). That coincidence can fool you into thinking the two are the same algorithm. The examples above show they are not.

### Gaps
- I did not check every popular video series for its variant. Classify any source by the clues above before trusting it.

## 7. Common exam traps

### Takeaway
Most lost points come from conventions and small rule slips, not from the big ideas:
- black-height counting;
- treating a NIL uncle or sibling as missing instead of black;
- rotating at the wrong node or in the wrong direction in mirror cases;
- using z's color instead of the successor's original color in deletion;
- mixing CLRS with LLRB or with predecessor-based tools.

### Cited Findings
1. **Black-height convention.** CLRS does not count the node itself and does count NIL. Wikipedia counts "black nodes in any path from the root to the leaves" and sets a null node's black height to 0 ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)). Free solution sets also disagree with each other (Section 1, 13.1-6) ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)). State your convention in the answer.
2. **NIL is black.** A missing uncle in insertion means "uncle black", so you rotate rather than recolor (e.g. inserting 30 in trace A, or the LL/LR/RR/RL catalog). A missing nephew in deletion counts as black ([CLRS, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/); [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).
3. **Triangle needs two rotations, at two different nodes.** First rotate at the parent (Case 2), then at the grandparent (Case 3). Only Case 3 swaps colors: the parent becomes black and the grandparent red ([MIT L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)).
4. **Mirror cases flip every LEFT/RIGHT**, including "near" and "far" nephews. For x a left child, near = w.left and far = w.right; for x a right child it is the other way round. Case 4' rotates RIGHT at x.p, and Case 3' rotates LEFT at w ([CLRS, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)).
5. **Forgetting `T.root.color = BLACK`** after insertion, for example after Case 1 recolors the root red (trace A, insert 15) ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).
6. **Wrong color tested in deletion.** When z has two children, the fixup depends on the **successor y's original color**, not z's. Problem 4 deletes a red z that still needs a fixup, and trace D deletes a black z (20) that needs none ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).
7. **Successor vs predecessor.** CLRS replaces a two-child node by its successor. The USFCA visualizer's code says "Node to delete has two childern. Find largest node in left subtree." — the predecessor ([USFCA RedBlack.js](https://www.cs.usfca.edu/~galles/visualization/AlgorithmLibrary/RedBlack.js)). With the same fixup, the results differ (trace-A tree, delete 20; [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)):

```
CLRS (successor 25)     predecessor 15 + same fixup
      ____25B_              ___15B____
     /        \            /          \
    10R_     30B          5R_       _30B
   /    \                /   \     /
  5B   15B              1B  10B   25R
 /                      
1R                      
```

8. **Case 2 with a red parent stops immediately.** Color the parent black and you are done, with no rotation. Case 3 never ends the fixup on its own; it always continues to Case 4 ([CLRS, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/); catalog traces in [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).
9. **In Case 4, w copies the parent's color**, which can be red. It is not always black ([CLRS, book](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/); catalog "Case 4 with a RED parent").
10. **CLRS rotations don't recolor**, but algs4's do ([algs4 RedBlackBST.java](https://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html)). Never add color changes to LEFT-ROTATE in a CLRS answer.
11. **Case numbers differ across sources.** CLRS insert Cases 1/2/3 are Wikipedia I2/I5/I6. CLRS delete Cases 1/2/3/4 are Wikipedia D3/(D2 or D4)/D5/D6 ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)). Write the condition next to the case number in your answer.
12. **Insert then delete does not undo.** Inserting 3, 2, 1 and then deleting 1 does not give back the tree you had before inserting 1 (CLRS 13.4-7) ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf); Problem 13).
13. **The root rule.** CLRS requires a black root; Sedgewick & Wayne and Mehlhorn & Sanders do not ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)). Under CLRS, a tree whose only fault is a red root is not a valid RB tree (Problem 7a).
14. **"Order" of a B-tree is ambiguous.** It can mean Knuth's maximum number of children m, or CLRS's minimum degree t (so m = 2t) ([Wikipedia: B-tree](https://en.wikipedia.org/wiki/B-tree)). The USFCA B-tree tool asks for "Max. Degree" (3–7). Its pre-emptive (CLRS-like) mode is labelled "Preemtive Split / Merge (Even max degree only)" ([USFCA BTree.js](https://www.cs.usfca.edu/~galles/visualization/AlgorithmLibrary/BTree.js)). To imitate CLRS with t = 2, choose max degree 4 and tick that box.
15. **Pre-emptive vs bottom-up B-tree splitting gives different trees.** CLRS splits every full node it passes on the way down, even if the new key would not overflow it. Bottom-up splitting only splits on overflow ([Wikipedia: B-tree](https://en.wikipedia.org/wiki/B-tree); [USFCA BTree.js](https://www.cs.usfca.edu/~galles/visualization/AlgorithmLibrary/BTree.js)). Example with t = 2 and the tree `[F Q T] / [C] [H K L] [S] [V W]` (the state in Problem 15 after W), inserting D:
    - CLRS splits the full root first and gives `[Q] / [F] [T] / [C D] [H K L] [S] [V W]` (height 2) ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).
    - A bottom-up insert would just place D into `[C]` and keep height 1.
16. **AVL details.** The balance factor sign convention differs (left − right vs right − left) ([Wikipedia: AVL tree](https://en.wikipedia.org/wiki/AVL_tree)). The "LR" name describes the path from the unbalanced node (Left child, then its Right subtree), and the fix is a left rotation at the child, then a right rotation at the node.
17. **Errors in free solution sets.** The Bodnar–Lohr RIGHT-ROTATE has a "t.right.p" typo, and its 13.1-6 counts disagree with the CLRS convention ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)). Its drawn solution to 18.2-1 (as rendered) keeps the full root "FQT" while later keys are inserted and ends with leaves at different depths. B-TREE-INSERT would split that full root first, and the invariant-checked result in Problem 15 differs ([Bodnar & Lohr ch. 18](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch18.pdf); [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).

### Inferences
**One-glance cheat sheet**
- **Insert:** color the new node red. While the parent is red:
  - uncle red → recolor parent, uncle and grandparent, and move up 2 levels;
  - uncle black and triangle → rotate at the parent so that z and its parent form a straight line (LEFT-ROTATE(parent) if z is a right child, RIGHT-ROTATE(parent) if z is a left child);
  - uncle black and line → swap colors of parent and grandparent, then rotate at the grandparent so that it goes down on the side opposite z (RIGHT-ROTATE(g) for a left-left line, LEFT-ROTATE(g) for a right-right line), and stop.

  Finally color the root black. At most 2 rotations.
- **Delete:** find y (z, or the successor if z has two children) and x (the child that takes y's place). Fix up only if y was black. Then:
  - x red → make it black;
  - w red → Case 1: swap colors of w and the parent, then rotate at the parent so that the parent goes down on x's side (LEFT-ROTATE(x.p) if x is a left child);
  - w black, both nephews black → Case 2: w red, move up;
  - near nephew red only → Case 3: swap colors of w and the near nephew, then rotate at w so that w goes down away from x (RIGHT-ROTATE(w) if x is a left child); then Case 4;
  - far nephew red → Case 4: w takes the parent's color, the parent and the far nephew become black, rotate at the parent so that it goes down on x's side, and stop.

  At most 3 rotations.
- **Bounds:** RB h ≤ 2·lg(n+1). AVL h < 1.44·lg(n+2). B-tree h ≤ log_t((n+1)/2). bh = k allows 2^k − 1 … 4^k − 1 internal nodes.

### Gaps
- I could not see which of these conventions Prof. Ashish's slides use (by design). Traps 1, 7, 11 and 14 are exactly where class conventions may differ from these notes.

## 8. Practice problems with full solutions (20)

### Takeaway
Twenty exam-style problems: insert traces, delete traces, validity checks, black-heights, node-count bounds, rotation facts, AVL, B-tree, 2-3-4 and LLRB comparisons. Every tree answer below is the actual output of the CLRS implementation in [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>), with all RB properties re-checked after every step. Try each problem on paper before reading the solution.

### Cited Findings
**Problem 1 (CLRS Ex. 13.3-2): insertion trace.** Insert 41, 38, 31, 12, 19, 8 into an initially empty red-black tree. Show the tree after each insertion and name the fixup cases.

*Solution* ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)). The final shape 38(19(12(8), 31), 41) matches the free solution's drawings ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)), which do not show colors.

**Insert 41** -- fixup cases: none; rotations: 0; after: n = 1, bh(root) = 1, RB properties OK.
```
(a) BST-insert 41: tree was empty, so z = 41 is the (red) root.
    41R*
(b) Last line of RB-INSERT-FIXUP: root 41 is RED -> color it BLACK.
    41B
```

**Insert 38** -- fixup cases: none; rotations: 0; after: n = 2, bh(root) = 1, RB properties OK.
```
(a) BST-insert 38 as a RED leaf, left child of 41B (z = 38).
       _41B
      /
    38R*
(b) Parent 41 is BLACK -> no violation, no fixup needed.
```

**Insert 31** -- fixup cases: Case 3; rotations: 1; after: n = 3, bh(root) = 1, RB properties OK.
```
(a) BST-insert 31 as a RED leaf, left child of 38R (z = 31).
          _41B
         /
       _38R
      /
    31R*
(b) Case 3 (line): uncle NIL is BLACK and z = 31 is the LEFT child of LEFT child 38 -> 38->B, 41->R; RIGHT-ROTATE(41). Done.
       _38B_
      /     \
    31R*   41R
```

**Insert 12** -- fixup cases: Case 1; rotations: 0; after: n = 4, bh(root) = 2, RB properties OK.
```
(a) BST-insert 12 as a RED leaf, left child of 31R (z = 12).
          _38B_
         /     \
       _31R   41R
      /
    12R*
(b) Case 1: parent 31 and uncle 41 are both RED -> recolor 31->B, 41->B, 38->R; z moves up to 38.
         _38R*_
        /      \
      _31B    41B
     /
    12R
(c) Last line of RB-INSERT-FIXUP: root 38 is RED -> color it BLACK.
         _38B_
        /     \
      _31B   41B
     /
    12R
```

**Insert 19** -- fixup cases: Case 2, Case 3; rotations: 2; after: n = 5, bh(root) = 2, RB properties OK.
```
(a) BST-insert 19 as a RED leaf, right child of 12R (z = 19).
             _38B_
            /     \
      _____31B   41B
     /
    12R__
         \
       19R*
(b) Case 2 (triangle): uncle NIL is BLACK and z = 19 is the RIGHT child of LEFT child 12 -> z = 12; LEFT-ROTATE(12). Now a line -> Case 3.
             _38B_
            /     \
          _31B   41B
         /
       _19R
      /
    12R*
(c) Case 3 (line): uncle NIL is BLACK and z = 12 is the LEFT child of LEFT child 19 -> 19->B, 31->R; RIGHT-ROTATE(31). Done.
          ____38B_
         /        \
       _19B_     41B
      /     \
    12R*   31R
```

**Insert 8** -- fixup cases: Case 1; rotations: 0; after: n = 6, bh(root) = 2, RB properties OK.
```
(a) BST-insert 8 as a RED leaf, left child of 12R (z = 8).
            ____38B_
           /        \
         _19B_     41B
        /     \
      _12R   31R
     /
    8R*
(b) Case 1: parent 12 and uncle 31 are both RED -> recolor 12->B, 31->B, 19->R; z moves up to 19.
            ____38B_
           /        \
        _19R*_     41B
       /      \
      12B    31B
     /
    8R
(c) z = 19: its parent 38 is BLACK -> loop ends (root already BLACK).
```


**Problem 2 (CLRS Ex. 13.4-3): deletion trace.** Starting from the final tree of Problem 1, delete 8, 12, 19, 31, 38, 41 in that order.

*Solution* ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)). Each intermediate shape matches the free solution's drawings ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)).

**Delete 8** -- fixup cases: none; rotations: 0; after: n = 5, bh(root) = 2, RB properties OK.
```
(a) Delete 8R: it has no left child -> RB-TRANSPLANT(8, its right child NIL); x = NIL. The removed node's original color was RED -> no property can break; no fixup.
         ____38B_
        /        \
      _19R_     41B
     /     \
    12B   31B
```

**Delete 12** -- fixup cases: Case 2; rotations: 0; after: n = 4, bh(root) = 2, RB properties OK.
```
(a) Delete 12B: it has no left child -> RB-TRANSPLANT(12, its right child NIL); x = NIL. The removed node's original color was BLACK -> x gets an extra black (doubly black); call RB-DELETE-FIXUP(x = NIL).
             ____38B_
            /        \
        ___19R_     41B
       /       \
    NIL(BB)   31B
(b) Case 2: sibling w = 31 is BLACK with two BLACK children -> 31->R; the extra black moves up to the parent. x = 19 is RED (red-and-black) -> loop stops; color it BLACK.
        _____38B_
       /         \
    19(RB)_     41B
           \
          31R
(c) Last line of RB-DELETE-FIXUP: x = 19 is RED -> color it BLACK.
      ____38B_
     /        \
    19B_     41B
        \
       31R
```

**Delete 19** -- fixup cases: none; rotations: 0; after: n = 3, bh(root) = 2, RB properties OK.
```
(a) Delete 19B: it has no left child -> RB-TRANSPLANT(19, its right child 31); x = 31. The removed node's original color was BLACK -> x gets an extra black (red-and-black); call RB-DELETE-FIXUP(x = 31).
        __38B_
       /      \
    31(RB)   41B
(b) Last line of RB-DELETE-FIXUP: x = 31 is RED -> color it BLACK.
      _38B_
     /     \
    31B   41B
```

**Delete 31** -- fixup cases: Case 2; rotations: 0; after: n = 2, bh(root) = 1, RB properties OK.
```
(a) Delete 31B: it has no left child -> RB-TRANSPLANT(31, its right child NIL); x = NIL. The removed node's original color was BLACK -> x gets an extra black (doubly black); call RB-DELETE-FIXUP(x = NIL).
        ___38B_
       /       \
    NIL(BB)   41B
(b) Case 2: sibling w = 41 is BLACK with two BLACK children -> 41->R; the extra black moves up to the parent. x = 38 is the root -> loop stops.
    38(BB)_
           \
          41R
(c) x = 38 is the root: the extra black is simply dropped (every root-to-leaf path lost one black, so bh(root) fell by 1).
    38B_
        \
       41R
```

**Delete 38** -- fixup cases: none; rotations: 0; after: n = 1, bh(root) = 1, RB properties OK.
```
(a) Delete 38B: it has no left child -> RB-TRANSPLANT(38, its right child 41); x = 41. The removed node's original color was BLACK -> x gets an extra black (red-and-black); call RB-DELETE-FIXUP(x = 41).
    41(RB)
(b) Last line of RB-DELETE-FIXUP: x = 41 is RED -> color it BLACK.
    41B
```

**Delete 41** -- fixup cases: none; rotations: 0; after: n = 0, bh(root) = 0, RB properties OK.
```
(a) Delete 41B: it has no left child -> RB-TRANSPLANT(41, its right child NIL); x = NIL. The tree is now empty (x = T.nil is the root, so RB-DELETE-FIXUP does nothing).
    (empty tree)
```


**Problem 3: ascending insertions.** Insert 1, 2, …, 10 in increasing order. List the fixup cases used by each insertion and give the final tree, its black-height and its height.

*Solution* ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)). Sorted input produces only mirror cases, because every new key goes to the right.

**Insert 1** -- fixup cases: none; rotations: 0; after: n = 1, bh(root) = 1, RB properties OK.
```
result:
    1B
```

**Insert 2** -- fixup cases: none; rotations: 0; after: n = 2, bh(root) = 1, RB properties OK.
```
result:
    1B_
       \
      2R
```

**Insert 3** -- fixup cases: Case 3'; rotations: 1; after: n = 3, bh(root) = 1, RB properties OK.
```
result:
      2B_
     /   \
    1R  3R
```

**Insert 4** -- fixup cases: Case 1'; rotations: 0; after: n = 4, bh(root) = 2, RB properties OK.
```
result:
      2B_
     /   \
    1B  3B_
           \
          4R
```

**Insert 5** -- fixup cases: Case 3'; rotations: 1; after: n = 5, bh(root) = 2, RB properties OK.
```
result:
      2B___
     /     \
    1B    4B_
         /   \
        3R  5R
```

**Insert 6** -- fixup cases: Case 1'; rotations: 0; after: n = 6, bh(root) = 2, RB properties OK.
```
result:
      2B___
     /     \
    1B    4R_
         /   \
        3B  5B_
               \
              6R
```

**Insert 7** -- fixup cases: Case 3'; rotations: 1; after: n = 7, bh(root) = 2, RB properties OK.
```
result:
      2B___
     /     \
    1B    4R___
         /     \
        3B    6B_
             /   \
            5R  7R
```

**Insert 8** -- fixup cases: Case 1', Case 3'; rotations: 1; after: n = 8, bh(root) = 2, RB properties OK.
```
result:
        __4B___
       /       \
      2R_     6R_
     /   \   /   \
    1B  3B  5B  7B_
                   \
                  8R
```

**Insert 9** -- fixup cases: Case 3'; rotations: 1; after: n = 9, bh(root) = 2, RB properties OK.
```
result:
        __4B___
       /       \
      2R_     6R___
     /   \   /     \
    1B  3B  5B    8B_
                 /   \
                7R  9R
```

**Insert 10** -- fixup cases: Case 1', Case 1'; rotations: 0; after: n = 10, bh(root) = 3, RB properties OK.
```
result:
        __4B___
       /       \
      2B_     6B___
     /   \   /     \
    1B  3B  5B    8R_
                 /   \
                7B  9B_
                       \
                      10R
```


Summary: bh(root) = 3, height = 4 edges (5 levels); 2-3-4 view: [4] / [2]  [6 8] / [1]  [3]  [5]  [7]  [9 10].

**Problem 4: two children, successor is z's right child.** In the trace-A tree (Section 3), delete 10.

*Solution* ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)). z = 10 is **red**, but its successor 15 is **black**, so the fixup runs. Here x = NIL is the right child of 15 after the move, so the mirror case applies.

**Delete 10** -- fixup cases: Case 4'; rotations: 1; after: n = 6, bh(root) = 2, RB properties OK.
```
(a) Delete 10R: two children -> successor y = 15 (original color B); x = y.right = NIL; y = 15 is z's right child, so x.p = 15; y moves into 10's spot and takes its color R. The moved node's original color was BLACK -> x gets an extra black (doubly black); call RB-DELETE-FIXUP(x = NIL).
          ________20B____
         /               \
        15R___         _30B
       /      \       /
      5B   NIL(BB)   25R
     /
    1R
(b) Case 4' (mirror): sibling w = 5 is BLACK and its FAR child 1 is RED -> 5 takes parent's color (R), 15->B, 1->B; RIGHT-ROTATE(15); x = root. Done.
        ___20B____
       /          \
      5R_       _30B
     /   \     /
    1B  15B   25R
```


**Problem 5: a deletion that needs the maximum of 3 rotations.** Delete 5 from the tree below.

*Solution* ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)). Case 1 → Case 3 → Case 4.

Start tree (valid RB tree, bh(root) = 2):
```
  10B_______
 /          \
5B        _30R_
         /     \
       _20B   40B
      /
     15R
```

**Delete 5** -- fixup cases: Case 1, Case 3, Case 4; rotations: 3; after: n = 5, bh(root) = 2, RB properties OK.
```
(a) Delete 5B: it has no left child -> RB-TRANSPLANT(5, its right child NIL); x = NIL. The removed node's original color was BLACK -> x gets an extra black (doubly black); call RB-DELETE-FIXUP(x = NIL).
        ___10B_______
       /             \
    NIL(BB)        _30R_
                  /     \
                _20B   40B
               /
              15R
(b) Case 1: sibling w = 30 is RED -> 30->B, parent 10->R; LEFT-ROTATE(10); new sibling w = 20 (black) -> continue with case 2/3/4.
             _______30B_
            /           \
        ___10R____     40B
       /          \
    NIL(BB)     _20B
               /
              15R
(c) Case 3: sibling w = 20 is BLACK, its NEAR child 15 is RED and FAR child NIL is BLACK -> 15->B, 20->R; RIGHT-ROTATE(20); new sibling w = 15 -> Case 4.
             _______30B_
            /           \
        ___10R_        40B
       /       \
    NIL(BB)   15B_
                  \
                 20R
(d) Case 4: sibling w = 15 is BLACK and its FAR child 20 is RED -> 15 takes parent's color (R), 10->B, 20->B; LEFT-ROTATE(10); x = root. Done.
         ____30B_
        /        \
      _15R_     40B
     /     \
    10B   20B
```


**Problem 6: Case 1 followed directly by Case 4.** Delete 5 from the tree below.

*Solution* ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)). This time the far nephew is red after Case 1, so there are 2 rotations.

Start tree (valid RB tree, bh(root) = 2):
```
  10B_______
 /          \
5B     ____30R_
      /        \
     20B_     40B
         \
        25R
```

**Delete 5** -- fixup cases: Case 1, Case 4; rotations: 2; after: n = 5, bh(root) = 2, RB properties OK.
```
(a) Delete 5B: it has no left child -> RB-TRANSPLANT(5, its right child NIL); x = NIL. The removed node's original color was BLACK -> x gets an extra black (doubly black); call RB-DELETE-FIXUP(x = NIL).
        ___10B_______
       /             \
    NIL(BB)     ____30R_
               /        \
              20B_     40B
                  \
                 25R
(b) Case 1: sibling w = 30 is RED -> 30->B, parent 10->R; LEFT-ROTATE(10); new sibling w = 20 (black) -> continue with case 2/3/4.
             _______30B_
            /           \
        ___10R_        40B
       /       \
    NIL(BB)   20B_
                  \
                 25R
(c) Case 4: sibling w = 20 is BLACK and its FAR child 25 is RED -> 20 takes parent's color (R), 10->B, 25->B; LEFT-ROTATE(10); x = root. Done.
         ____30B_
        /        \
      _20R_     40B
     /     \
    10B   25B
```


**Problem 7: is it a valid red-black tree?** For each tree, decide whether it satisfies all five CLRS properties. If not, name the violated property and where. NILs are not drawn.

```
(a)
  10R_
 /    \
5B   20B

(b)
    10B_
   /    \
  5R   20B
 /
3R

(c)
    10B_
   /    \
  5B   20B
 /
3B

(d)
    __10B____
   /         \
  5R_      _20R_
 /   \    /     \
3B  7B   15B   25B

(e)
  10B____
 /       \
5B     _20R_
      /     \
     15B   25B_
               \
              30R

(f)
    __10B_
   /      \
  5B_    20B_
 /   \       \
3R  7R      30B
```

*Solution* ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>) checker output). The "AVL-balanced shape" column feeds Problem 20.

```
(a) INVALID: Property 2: root 10 is RED; AVL-balanced shape: yes
(b) INVALID: Property 4: red node 5 has red child 3; Property 5: at node 10, paths down the left side see 1 black node(s) (NIL included) but paths down the right side see 2; AVL-balanced shape: yes
(c) INVALID: Property 5: at node 5, paths down the left side see 2 black node(s) (NIL included) but paths down the right side see 1; Property 5: at node 10, paths down the left side see 3 black node(s) (NIL included) but paths down the right side see 2; AVL-balanced shape: yes
(d) VALID red-black tree (bh(root) = 2); AVL-balanced shape: yes
(e) VALID red-black tree (bh(root) = 2); AVL-balanced shape: NO
(f) INVALID: Property 5: at node 20, paths down the left side see 1 black node(s) (NIL included) but paths down the right side see 2; Property 5: at node 10, paths down the left side see 2 black node(s) (NIL included) but paths down the right side see 3; AVL-balanced shape: yes
```

Explanation of the invalid ones:
- (a) A red root violates property 2. Recoloring the root black would fix it.
- (b) 5R has a red child 3R, violating property 4. The left side of 10 also has one fewer black node than the right side (only NIL vs 20 + NIL), violating property 5.
- (c) 5B has exactly one child and it is black, so property 5 fails at 5 and at 10.
- (f) Leaf 30B hangs under 20B, giving that path one more black node than the others.

(e) is valid but not AVL-balanced, which proves "RB does not imply AVL".

**Problem 8: compute every black-height.** Give bh(x) for every node of this tree (the result of CLRS Figure 13.4).

```
    ____7B___
   /         \
  2R___     11R_
 /     \   /    \
1B    5B  8B   14B_
     /             \
    4R            15R
```

*Solution* (CLRS convention; [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)): 1B: 1, 2R: 2, 4R: 1, 5B: 1, 7B: 2, 8B: 1, 11R: 2, 14B: 1, 15R: 1. Check: bh(7) = 2 because the path 7 → 2 → 1 → NIL has the blacks 1 and NIL. The red node 11 also has bh 2, because the color of a node never counts toward its own bh.

**Problem 9 (CLRS Ex. 13.1-6): node-count bounds.**
- (a) What are the largest and smallest possible numbers of internal nodes in an RB tree with black-height k?
- (b) Evaluate for k = 3.
- (c) Which black-heights are possible for n = 14 and for n = 20?

*Solution.*
- (a) Smallest: **2^k − 1**, from an all-black perfect tree with k levels. Largest: **2^(2k) − 1 = 4^k − 1**. To get it, levels alternate B, R, B, R, … and the tree is complete with 2k levels: the black root, then k pairs of (red level, black level), where the last black level is the NIL leaves.
- (b) For k = 3: 7 and 63.
- (c) A tree with n nodes can have bh = k exactly when 2^k − 1 ≤ n ≤ 4^k − 1. So n = 14 allows k ∈ {2, 3}, and n = 20 allows k ∈ {3, 4}.

Exact DP verification ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)):

| k = bh(root) | min internal nodes (all black, perfect) | formula 2^k - 1 | max internal nodes (alternating B/R levels, complete) | formula 4^k - 1 = 2^(2k) - 1 |
|---|---|---|---|---|
| 1 | 1 | 1 | 3 | 3 |
| 2 | 3 | 3 | 15 | 15 |
| 3 | 7 | 7 | 63 | 63 |
| 4 | 15 | 15 | 255 | 255 |
| 5 | 31 | 31 | 1023 | 1023 |

**Problem 10: height bounds in numbers.** For n = 1,000,000 keys, give the worst-case height bound of an RB tree, an AVL tree and a B-tree with t = 100. Also: how many keys fit in a full B-tree of height 2 whose nodes hold 1000 keys?

*Solution* (arithmetic in [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>); formulas from Sections 1 and 5):

- lg(n+1) = 19.932; a perfectly balanced BST would have height about lg n = 19.93.
- RB tree: h <= 2 lg(n+1) = 39.86, so **h <= 39**.
- AVL tree: h < 1.4405 lg(n+2) - 0.3277 = 28.38, so **h <= 28**.
- B-tree with t = 100: h <= log_100((n+1)/2) = 2.849, so **h <= 2** (at most 3 node or disk reads per search).
- Full B-tree of height 2 with 1000 keys per node (1001 children): 1000 * (1 + 1001 + 1001^2) = **1,003,003,000 keys**.

**Problem 11: rotations.**
- (a) Let a ∈ α, b ∈ β and c ∈ γ in the LEFT-ROTATE picture. How do their depths change?
- (b) How many different rotations are possible in an n-node BST?
- (c) List the pointer assignments made by LEFT-ROTATE(T, 10) in the Section 2 demo tree.

*Solution.*
- (a) a: +1; b: unchanged; c: −1 ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)).
- (b) Exactly n − 1, one per parent–child edge ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)).
- (c) The assignments are below; the in-order list stays 5, 10, 12, 15, 17, 20, 30 ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).
  1. y = 15
  2. 10.right = 12
  3. 12.p = 10
  4. 15.p = 20
  5. 20.left = 15 (10 was a left child)
  6. 15.left = 10
  7. 10.p = 15

**Problem 12 (CLRS Ex. 13.3-1): why red?** Why does RB-INSERT color the new node red rather than black?

*Solution.* A black z would add one black node to every path through z, which violates property 5 globally and cannot be repaired with local fixes ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)). A red z can only break property 4 (if the parent is red) or property 2 (if z is the root). Both are local and repaired by the fixup.

**Problem 13 (CLRS Ex. 13.4-7): does deleting undo inserting?** Insert 3, 2, 1, then delete 1. Is the result the tree you had before inserting 1?

*Solution.* **No** ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf); [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)):

```
after inserting 3, 2:
  3B
 /
2R

after inserting 1:
  2B_
 /   \
1R  3R

after deleting 1:
2B_
   \
  3R
```

**Problem 14: AVL vs RB on sorted input.** Insert 1, …, 10 into an AVL tree. Name every rotation, give the final tree and compare its height with the RB tree from Problem 3.

*Solution* ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)). Sorted input only ever creates RR imbalances, so every fix is a single left rotation. The AVL tree ends one level shorter than the RB tree.

```
AVL:
insert 1: no rotation
insert 2: no rotation
insert 3: RR at 1 (single LEFT rotation at 1)
insert 4: no rotation
insert 5: RR at 3 (single LEFT rotation at 3)
insert 6: RR at 2 (single LEFT rotation at 2)
insert 7: RR at 5 (single LEFT rotation at 5)
insert 8: no rotation
insert 9: RR at 7 (single LEFT rotation at 7)
insert 10: RR at 6 (single LEFT rotation at 6)
final AVL tree:
  _4___
 /     \
 2    _8
/ \  /  \
1 3  6  9_
    / \   \
    5 7  10
AVL height = 3 edges

CLRS RB tree for the same keys:
    __4B___
   /       \
  2B_     6B___
 /   \   /     \
1B  3B  5B    8R_
             /   \
            7B  9B_
                   \
                  10R
RB height = 4 edges
```

**Problem 15 (CLRS Ex. 18.2-1): B-tree insertion.** Insert F, S, Q, K, C, L, H, T, V, W, M, R, N, P, A, B, X, Y, D, Z, E in order into an empty B-tree with minimum degree t = 2, using CLRS B-TREE-INSERT (pre-emptive splitting).

*Solution* ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>); B-tree invariants checked after every key). Only the insertions that cause splits are listed; all other keys simply go into a leaf. When M arrives, the root [F Q T] is full, so B-TREE-INSERT first splits the root (Q moves up into a new root) and then splits the full child [H K L] on the way down. The free Bodnar–Lohr drawing differs at exactly this point (trap 17, Section 7).

```
insert K: root is full -> make a new empty root (height grows by 1); split full node -> median Q moves up; halves [F] and [S]   ->  [Q] / [F K]  [S]
insert L: split full node -> median F moves up; halves [C] and [K]   ->  [F Q] / [C]  [K L]  [S]
insert W: split full node -> median T moves up; halves [S] and [V]   ->  [F Q T] / [C]  [H K L]  [S]  [V W]
insert M: root is full -> make a new empty root (height grows by 1); split full node -> median Q moves up; halves [F] and [T]; split full node -> median K moves up; halves [H] and [L]   ->  [Q] / [F K]  [T] / [C]  [H]  [L M]  [S]  [V W]
insert P: split full node -> median M moves up; halves [L] and [N]   ->  [Q] / [F K M]  [T] / [C]  [H]  [L]  [N P]  [R S]  [V W]
insert A: split full node -> median K moves up; halves [F] and [M]   ->  [K Q] / [F]  [M]  [T] / [A C]  [H]  [L]  [N P]  [R S]  [V W]
insert Y: split full node -> median W moves up; halves [V] and [X]   ->  [K Q] / [F]  [M]  [T W] / [A B C]  [H]  [L]  [N P]  [R S]  [V]  [X Y]
insert D: split full node -> median B moves up; halves [A] and [C]   ->  [K Q] / [B F]  [M]  [T W] / [A]  [C D]  [H]  [L]  [N P]  [R S]  [V]  [X Y]

final B-tree (t = 2), by level:
[K Q]
[B F]  [M]  [T W]
[A]  [C D E]  [H]  [L]  [N P]  [R S]  [V]  [X Y Z]
height = 2
```

**Problem 16: 2-3-4 ↔ RB.**
- (a) Convert the trace-A RB tree into a 2-3-4 tree.
- (b) Convert the final B-tree of Problem 15 (a 2-3-4 tree) into a valid RB tree.

*Solution.*
- (a) Merge every red node into its black parent: **[10 20] / [1 5]  [15]  [25 30]**. This equals the CLRS B-tree from the same inserts (Section 5).
- (b) Map each 2-node to a black node, each 3-node [a b] to a black b with a red left child a (choosing a red right child b under a black a would be equally valid), and each 4-node [a b c] to a black b with red children a and c ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>), which checks the result):

```
                       _____________Q-B_____________
                      /                             \
                 ____K-R____                   ____W-B____
                /           \                 /           \
     __________F-B_       _M-B____          _T-R_       _Y-B_
    /              \     /        \        /     \     /     \
  _B-R____        H-B   L-B     _P-B     _S-B   V-B   X-R   Z-R
 /        \                    /        /
A-B     _D-B_                 N-R      R-R
       /     \
      C-R   E-R
```
Checked: valid RB tree, bh(root) = 3 = (2-3-4 height 2) + 1.

**Problem 17: CLRS vs LLRB.** Insert 1, 2, 3, 4, 5 with CLRS RB-INSERT and with Sedgewick's LLRB put(). Explain the difference.

*Solution* ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)):

```
CLRS RB-INSERT        algs4 LLRB put()
  2B___                   __4B_
 /     \                 /     \
1B    4B_               2R_   5B
     /   \             /   \
    3R  5R            1B  3B
```

CLRS keeps 4B with two red children, which is a 4-node [3 4 5] in 2-3-4 terms. LLRB never keeps a node with two red children: flipColors splits it and pushes the middle key up, and red links must lean left. So the root becomes 4 ([Sedgewick 2008](https://sedgewick.io/wp-content/themes/sedgewick/papers/2008LLRB.pdf); [algs4 §3.3](https://algs4.cs.princeton.edu/33balanced/)).

**Problem 18: AVL deletion cost.** Delete 11 from the AVL tree below. How many rebalancing steps happen? Could a CLRS RB deletion ever need more than 3 rotations?

*Solution* ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)). Two single right rotations happen, at two different levels: first at 12, which now holds 11's position, and then at the root 8. AVL deletion can cascade up to O(lg n) levels ([Wikipedia: AVL tree](https://en.wikipedia.org/wiki/AVL_tree)). An RB deletion never exceeds 3 rotations ([Linux kernel rbtree docs](https://docs.kernel.org/core-api/rbtree.html)).

```
AVL tree built by inserting 4, 8, 5, 10, 11, 7, 12, 1, 9, 6, 3, 2:
     __8____
    /       \
   _5_     11_
  /   \   /   \
 _3   7  10  12
/  \ /  /
1  4 6  9
 \
 2

delete 11 (two children -> successor 12 copied up, then 12's node removed):
  rebalance #1: LL at 12 -> single RIGHT rotation at 12
  rebalance #2: LL at 8 -> single RIGHT rotation at 8

result:
   _5__
  /    \
 _3    8__
/  \  /   \
1  4  7  10_
 \   /  /   \
 2   6  9  12
```

**Problem 19: quick-fire, which case?**

*Insertion* (z red; p = parent; u = uncle):
- (a) p = 20 is red and the RIGHT child of 10, and u = 5 is red.
- (b) p = 30 is red and the RIGHT child of 10, u is NIL, and z = 20 is p's LEFT child.
- (c) p = 20 is red and the LEFT child of 30, u is NIL, and z = 10 is p's LEFT child.
- (d) p is black.

*Deletion* (x doubly black; w = sibling):
- (e) x = NIL is the LEFT child of 10, and w = 30 is red.
- (f) x is a RIGHT child, w is black, w.left is black and w.right is red.
- (g) x is a LEFT child, w is black and w.right is red.
- (h) x is a LEFT child, w is black with two black children, and x.p is red.
- (i) The node being deleted is a red leaf.
- (j) The node being deleted is black and has exactly one (red) child.

*Solution* (rules of Sections 3–4; (a), (b), (c), (e), (h), (i), (j) also appear verbatim in the catalog traces of [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)):
- (a) Case 1': 20→B, 5→B, 10→R, z = 10.
- (b) Case 2': RIGHT-ROTATE(30), z = 30, then Case 3': 20→B, 10→R, LEFT-ROTATE(10).
- (c) Case 3: 20→B, 30→R, RIGHT-ROTATE(30).
- (d) Nothing to fix.
- (e) Case 1: 30→B, 10→R, LEFT-ROTATE(10), then look at the new sibling.
- (f) The near nephew (w.right) is red and the far nephew (w.left) is black, so Case 3': w.right→B, w→R, LEFT-ROTATE(w). Case 4' follows.
- (g) Case 4: w gets x.p's color, x.p→B, w.right→B, LEFT-ROTATE(x.p). Done.
- (h) Case 2: w→R and x = x.p, which is red, so color it black and stop. No rotation.
- (i) No fixup at all.
- (j) Splice the node out and color its red child black (x is red-and-black).

**Problem 20: true or false? Justify.**
1. An RB tree with n internal nodes has height ≤ 2·lg(n+1).
2. RB-INSERT-FIXUP can perform 3 rotations.
3. Case 2 of RB-DELETE-FIXUP performs a rotation.
4. Case 1 of RB-INSERT-FIXUP can repeat Θ(lg n) times in one insertion.
5. If z is red, RB-DELETE never calls the fixup.
6. Every AVL tree can be colored as a valid RB tree.
7. Every RB tree is AVL-balanced.
8. In a CLRS B-tree every node holds between t−1 and 2t−1 keys.
9. A B-tree with minimum degree 2 is a 2-3-4 tree.
10. AVL insertion needs at most one (single or double) rotation.

*Solution.*
1. **T** (Section 1).
2. **F**: at most 2 (Case 2 + Case 3).
3. **F**: it only recolors w red and moves x up.
4. **T**: each repetition moves z up 2 levels, so it repeats up to about h/2 times. The stress test saw 5 repetitions in one insert ([04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).
5. **F**: with two children, what matters is the successor's original color (Problem 4).
6. **T** ([Wikipedia: AVL tree](https://en.wikipedia.org/wiki/AVL_tree)).
7. **F**: Problem 7(e) is a valid RB tree that is not AVL-balanced.
8. **F**: the root may hold as few as 1 key.
9. **T**: nodes have 1–3 keys and 2–4 children.
10. **T**: the rotation restores the subtree's previous height ([Wikipedia: AVL tree](https://en.wikipedia.org/wiki/AVL_tree); measured max 2 single rotations per insert in [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>)).

### Inferences
- The highest-yield drills for this midterm are full traces of 6–10 inserts followed by 4–6 deletes (Problems 1–6), because they exercise every case and every mirror. Problems 7–9 are the typical short-answer items. Problems 14–18 cover the week-7 "comparison" topic.
- When practicing on a visualizer, check the answer to every two-child deletion against CLRS's successor rule (trap 7).

### Gaps
- I could not find a .edu practice exam with an answer key containing RB tree questions in this session. Web search was unavailable, and the MIT 6.046J (Fall 2005) Quiz 1 and Practice Quiz 1 solutions I checked contain no RB problems ([MIT 6.046J exams page](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/pages/exams/)). So the problems above are CLRS exercises plus original problems, all solved by the verified script.

## 9. Best free resources and visualizers

### Takeaway
To see CLRS-style trees, use MIT OCW 6.046J Lecture 10 (video and slides) together with the USFCA Red/Black visualizer, remembering that the visualizer deletes using the predecessor. For AVL, use MIT 6.006 Lecture 6 and VisuAlgo. For B-trees, use the USFCA B-tree visualizer with "max degree 2t" and pre-emptive split ticked. Treat Princeton algs4 and Open Data Structures as background on a **different** (left-leaning) variant.

### Cited Findings
- **MIT OCW 6.046J (Fall 2005), Lecture 10: "Red-black Trees, Rotations, Insertions, Deletions"** by Prof. Erik Demaine and Prof. Charles Leiserson. A free video ([lecture page](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/resources/lecture-10-red-black-trees-rotations-insertions-deletions/)) and slides covering the properties, the 2-3-4 height proof, rotations, and insertion Cases 1–3 with pictures ([slides PDF](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)). Leiserson is a CLRS co-author, so the notation is closest to the textbook. Deletion is deferred to "see textbook".
- **MIT OCW 6.006 (Fall 2011), Lecture 6: AVL trees, AVL sort.** Typed notes with the Fibonacci height argument and the insertion rotations ([PDF](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/83cdd705cd418d10d9769b741e34a2b8_MIT6_006F11_lec06.pdf)).
- **Bodnar & Lohr's free CLRS 3rd-edition solutions** (Rutgers), [chapter 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf) and [chapter 18](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch18.pdf). Useful for the shapes in 13.3-2 and 13.4-3, but the drawings omit colors and contain errors (trap 17).
- **USFCA Data Structure Visualizations (David Galles)**:
  - Red/Black tree: [RedBlack.html](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html). Insertion is bottom-up like CLRS: "this.fixDoubleRed(elem)" and "Uncle of node is red -- push blackness down from grandparent". It has a "Show Null Leaves" checkbox. Deletion of a two-child node uses the **largest key in the left subtree** (predecessor), and duplicates go to the right subtree ([source RedBlack.js](https://www.cs.usfca.edu/~galles/visualization/AlgorithmLibrary/RedBlack.js)).
  - B-tree: [BTree.html](https://www.cs.usfca.edu/~galles/visualization/BTree.html), with "Max. Degree" 3–7 and the "Preemtive Split / Merge (Even max degree only)" option. Deletion uses borrow ("steal") and merge ([source BTree.js](https://www.cs.usfca.edu/~galles/visualization/AlgorithmLibrary/BTree.js)).
  - An AVL page exists on the same site (not separately verified in this session).
- **VisuAlgo BST module** visualizes plain BST and AVL trees only. Red-black trees appear only in a list of "Other balanced BST implementations" ([VisuAlgo /bst](https://visualgo.net/en/bst)).
- **Princeton algs4 §3.3 Balanced Search Trees** and RedBlackBST.java cover the **left-leaning** 2-3 variant. They are good for 2-3 tree intuition but give different answers from CLRS ([algs4 §3.3](https://algs4.cs.princeton.edu/33balanced/); [RedBlackBST.java](https://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html)).
- **Sedgewick, "Left-leaning Red-Black Trees" (2008).** Background on 2-3 vs 2-3-4 variants and why CLRS-style code is longer ([PDF](https://sedgewick.io/wp-content/themes/sedgewick/papers/2008LLRB.pdf)).
- **Open Data Structures (Pat Morin), §9.1–9.2.** A free textbook covering 2-4 trees and another left-leaning RB variant ([§9.2](https://opendatastructures.org/ods-java/9_2_RedBlackTree_Simulated_.html)).
- **Linux kernel rbtree documentation.** A real-world use with the 2/3-rotation bounds stated ([docs.kernel.org](https://docs.kernel.org/core-api/rbtree.html)).
- **Wikipedia: [Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree), [AVL tree](https://en.wikipedia.org/wiki/AVL_tree), [B-tree](https://en.wikipedia.org/wiki/B-tree).** Good overviews, but they use different case numbers (I1–I6, D1–D6) and conventions.
- **The textbook itself:** [CLRS, MIT Press](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/). Use the library or a legally owned copy, not pirated PDFs.

### Inferences
- Suggested 1-hour routine for this week:
  1. Watch the MIT Lecture 10 insertion part.
  2. Do Problems 1–3 on paper and check them against this file.
  3. Do Problems 4–6 and 2, the deletion drills.
  4. Run your own key sequence in [04_rb_verify.py](<scripts (red-black tree traces)/04_rb_verify.py>) (edit the lists at the bottom) and compare with your hand trace.
- When using the USFCA RB tool, insertions should match CLRS exactly. For deletions of two-child nodes, expect a different but still valid result (trap 7).

### Gaps
- Web search was unavailable in this session, so I could not survey video series (for example popular YouTube RB-tree playlists) or other universities' lecture notes and exams. The resources above are ones I could open and verify directly.
