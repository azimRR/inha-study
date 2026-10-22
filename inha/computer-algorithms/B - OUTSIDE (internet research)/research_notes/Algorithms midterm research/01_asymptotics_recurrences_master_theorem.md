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
