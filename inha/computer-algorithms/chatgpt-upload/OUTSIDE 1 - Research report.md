# OUTSIDE (internet research) - report, NOT from class



---

<!-- FILE: Algorithms midterm research.md -->

# Convention-Exact Traces Win the Algorithms Midterm

A top grade on the SOC3030-003 midterm depends less on covering more topics than on two habits the slides alone do not drill. The first is reproducing every hand trace exactly under the professor's conventions: Lomuto partitioning with the last element as pivot, 0-based heap tables, and CLRS-style red-black fixups with successor-based deletion. The second is backing every claim with the short justification graders look for: an explicit c and n₀, a named Master-theorem case with its ε and regularity check, a potential function that never drops below its starting value, or the case condition written beside each red-black step. Free outside sources fill the gap the slides leave. MIT 6.006 and 6.046J publish recitations and quizzes with official solutions, a Western University (UWO) handout gives 22 Master-theorem problems with answers, CMU 15-451's amortized-analysis lecture proves the table-resizing bounds in full, and MIT's red-black lecture is co-taught by a CLRS co-author. The main hazard is that these sources disagree with one another. Hoare versus Lomuto partitioning, 1-based versus 0-based heaps, the strict versus extended Master theorem, CLRS versus Sedgewick's left-leaning red-black trees, successor versus predecessor deletion, black-height counting and B-tree "order" each change the expected answer, and a few sources are simply wrong, including GeeksforGeeks' "advanced master theorem" for negative log powers and two answers in a free Rutgers CLRS solution set. Every trace, table and numeric answer below comes from the research notes' script-verified output or was re-run for this report, and the scripts sit next to the notes so new hand traces can be checked the same way. The exam window opens on Saturday 24 October 2026, so the plan below covers one topic per day from 19 to 23 October and then switches to timed mixed practice.

## Seven syllabus topics reduce to five kinds of handwritten answer

The first half of the course runs from "ADT and its specification" (week 1) and "Problem based on Recurrences and Master theorem" (week 2), through the six sorting algorithms, to "Amortized Analysis" and the "RED BLACK TREES" and "RB Tree Deletion" slides. The syllabus describes the amortized part as "problem scenarios of amortized analysis", and AVL trees and B-trees serve as points of comparison for red-black trees. Because the professor's own assignments are handwritten traces and calculations, the midterm will most likely reward five kinds of answer: a definition or bound proved with explicit constants, a running time derived from loops or a recurrence, an algorithm traced state by state, an amortized bound built from a bookkeeping table or potential function, and a red-black insertion or deletion traced case by case. The table maps each topic to what a full-marks answer must show and to the best free drill that comes with answers.

| Syllabus topic | Typical handwritten question | What earns full marks | Best free drill with answers |
|---|---|---|---|
| Algorithm fundamentals, ADT specification | properties of an algorithm; best, worst and average cost; specify an ADT | Knuth's five properties; cases defined over all inputs of size n, plus a stated distribution for the average; signatures with pre/postconditions or axioms | [MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf); [MIT 6.005 Reading 12](https://web.mit.edu/6.005/www/fa15/classes/12-abstract-data-types/) |
| Asymptotic notation | prove or disprove f = O(g); rank functions | explicit c and n₀, or a limit; a contradiction for each disproof; functions rewritten as 2^(·) before ranking | [MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf) (7 solved exercises); [walkccc CLRS 3-3](https://walkccc.me/CLRS/Chap03/Problems/3-3/) |
| Iterative and recursive running times | count loop iterations; write T(n) from code | a sum evaluated exactly or bounded above and below; recursive calls and their sizes counted correctly | [MIT 6.006 R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf); practice sets A and B below |
| Recurrences and the Master theorem | solve T(n) | a, b, f and n^(log_b a); the case with its ε or k; the regularity constant c; a recursion tree when the theorem fails | [UWO handout](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf) (22 problems); [Erickson's recurrence notes](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf) |
| Insertion, quick, merge, heap, bucket and radix sort | trace passes, partitions, merges, heap tables, digit passes and buckets; count comparisons | the professor's conventions and every intermediate array | [MIT 6.006 Quiz 1 solutions](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf); [VisuAlgo](https://visualgo.net/en/sorting) |
| Amortized analysis | aggregate total, accounting charges, potential function | the cost model; a credit invariant checked after every prefix; Φ(D_i) ≥ Φ(D_0); every case covered | [CMU 15-451 Lecture 7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf); [CMU Recitation 4](https://www.cs.cmu.edu/~15451-f25/reci/reci04.pdf) |
| Red-black trees vs AVL and B-trees | insert and delete traces; validity checks; black-heights; comparisons | the case and its condition named at each step; the successor rule; a black root | [MIT 6.046J Lecture 10](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/resources/lecture-10-red-black-trees-rotations-insertions-deletions/); [Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf) |

The research deliberately stayed away from the class slides, so eight conventions remain unconfirmed, and each one changes the expected answer. Before studying anything else, check them against the slides and the professor's sample solutions. The first is which Master-theorem statement is accepted: the strict three cases of the CLRS 3rd edition, or the extended case 2 with lg^k n factors. The second is whether o and ω are defined by limits or by "for every c > 0". The third and fourth are how insertion-sort passes and quicksort comparisons are numbered and counted, and whether merge comparisons include sentinels. The fifth is the exact set of 0-based heap formulas and loop bounds. The sixth is the black-height convention; CLRS counts the NIL leaf but not the node itself. The last two are whether two-child red-black deletion uses the successor, as CLRS does, or the predecessor, and whether B-trees are sized by CLRS's minimum degree t or by a maximum number of children.

## Analysis questions pay for explicit constants and named cases

### Fundamentals and ADT specifications: define cases over inputs and contracts over values

Knuth's five properties of an algorithm are finiteness ("must always terminate after a finite number of steps"), definiteness, input, output and effectiveness, and Knuth himself concedes they are intuitive rather than formal ([Wikipedia: Algorithm characterizations](https://en.wikipedia.org/wiki/Algorithm_characterizations)). The slide deck's title, "Fundamentals of Computer Algorithms", matches the Horowitz–Sahni–Rajasekaran textbook, whose wording in that book family ("zero or more inputs, at least one output") could not be confirmed from a free source, so quote whichever list the slides use. MIT 6.006 frames a **problem as a binary relation from inputs to correct outputs** and an algorithm as a procedure that maps each input to one output, proved correct by induction over its loops or recursion. It measures cost in the Word-RAM model, where arithmetic, comparisons and memory access on one machine word take constant time, and compares algorithms asymptotically "to ignore constant factor differences in hardware performance" ([MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)).

For a fixed input size n, the **worst case** is the maximum cost over all inputs of that size and serves as a guarantee. The **best case** is the minimum over inputs of the same size, not "a small n". The **average case** is an expectation that means nothing without a stated distribution. **Linear search** costs 1, n and (n+1)/2 comparisons in the best, worst and uniform-average cases ([Wikipedia: Linear search](https://en.wikipedia.org/wiki/Linear_search)). If the key is present only with probability p, the expectation becomes p(n+1)/2 + (1 − p)n. **Insertion sort** costs n − 1 comparisons on sorted input and n(n−1)/2 on reverse-sorted input ([Wikipedia: Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort)). On a random permutation it averages n(n−1)/4 + n − H_n comparisons and exactly n(n−1)/4 shifts. That average formula is derived rather than quoted, and was confirmed by enumerating every permutation up to n = 8; for n = 4 it gives 59/12 ([alg_r01_v12_core_checks.py](<../research_notes/Algorithms midterm research/scripts (asymptotics checks)/alg_r01_v12_core_checks.py>)).

"Insertion sort is O(n²)" is therefore true for every input, while "Θ(n²)" describes only its worst and average cases. Space analysis counts auxiliary memory, including the recursion stack. Recursive binary search needs Θ(log n) stack frames where the iterative version needs Θ(1), and merge sort "uses a linear amount of temporary storage" ([MIT 6.006 R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf)).

An **abstract data type** is "a data type whose internal representation is hidden from the client" ([algs4 §1.2](https://algs4.cs.princeton.edu/12oop/)). It is a mathematical model defined by behavior from the user's side, whereas a data structure is a concrete representation seen from the implementer's side; a stack, for instance, can be built on either a linked list or an array ([Wikipedia: Abstract data type](https://en.wikipedia.org/wiki/Abstract_data_type)). A specification is a **contract**: the implementer must meet it, the client may rely on it, and a precondition places obligations on the client ([MIT 6.005 Reading 06](https://web.mit.edu/6.005/www/fa15/classes/06-specifications/)). MIT 6.005 sorts operations into four classes. Creators build a value of the type from other data, producers build new values from existing ones, observers report on a value, and mutators change it ([MIT 6.005 Reading 12](https://web.mit.edu/6.005/www/fa15/classes/12-abstract-data-types/)).

Behavior can also be fixed by algebraic axioms. **A stack and a queue share almost the same interface, so only their axioms separate LIFO from FIFO** ([Wikipedia: Abstract data type](https://en.wikipedia.org/wiki/Abstract_data_type)). Cost guarantees belong in a specification too, because, as Stepanov argued, modules are interchangeable only if they "share similar complexity behavior" ([Wikipedia: Abstract data type](https://en.wikipedia.org/wiki/Abstract_data_type)). The template below is a full-marks answer for a queue; the notes property-checked its six axioms against a two-stack implementation.

```
ADT Queue<Item>      values: sequences q = <x1, ..., xn>, x1 is the front
new()          : -> Queue               creator    pre: none     post: q = <>
enqueue(Q, x)  : Queue x Item -> void   mutator    pre: none     post: q' = <x1, ..., xn, x>
dequeue(Q)     : Queue -> Item          mutator    pre: n >= 1   post: returns x1; q' = <x2, ..., xn>
front(Q)       : Queue -> Item          observer   pre: n >= 1   post: returns x1; q unchanged
isEmpty(Q)     : Queue -> Boolean       observer   pre: none     post: returns (n = 0)
axioms  isEmpty(new) = true                isEmpty(enqueue(Q, x)) = false
        front(enqueue(new, x)) = x         front(enqueue(Q, x)) = front(Q)    if not isEmpty(Q)
        dequeue(enqueue(new, x)) = new     dequeue(enqueue(Q, x)) = enqueue(dequeue(Q), x)  if not isEmpty(Q)
cost    O(1) worst case (linked list) or O(1) amortized (resizing array, two stacks)
```

The stack's distinguishing axiom is top(push(S, x)) = x. Linked-list stacks and queues take constant worst-case time per operation, and resizing-array versions take constant amortized time ([algs4 §1.4](https://algs4.cs.princeton.edu/14analysis/)). For priority queues, a binary heap costs log n per insert and delete-min. A Fibonacci heap's log n delete-min and O(1) decrease-key are amortized guarantees. For dictionaries, red-black BSTs guarantee log n search, insert and delete, while hash tables give O(1) only on average under the uniform hashing assumption and n in the worst case ([algs4 cheatsheet](https://algs4.cs.princeton.edu/cheatsheet/)).

### Asymptotic proofs need a witnessed c and n₀

MIT's definition reads: "Non-negative function g(n) is in O(f(n)) if and only if there exists a positive real number c and positive integer n₀ such that g(n) ≤ c · f(n) for all n ≥ n₀". Note that MIT writes g for the function being bounded and f for the bound, the reverse of CLRS's letters, and stresses that "=" really means set membership ([MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)). Little-o demands the inequality for every ε > 0 ([Wikipedia: Big O notation](https://en.wikipedia.org/wiki/Big_O_notation)). The table below states all five notations in CLRS letters, where f is the function and g the bound.

| Notation | Formal definition (watch ∃ versus ∀) | Limit test, when L = lim f/g exists |
|---|---|---|
| f = O(g) | **∃** c > 0, n₀: 0 ≤ f(n) ≤ c·g(n) for all n ≥ n₀ | L < ∞ |
| f = Ω(g) | **∃** c > 0, n₀: 0 ≤ c·g(n) ≤ f(n) for all n ≥ n₀ | L > 0 (∞ allowed) |
| f = Θ(g) | **∃** c₁, c₂ > 0, n₀: c₁g(n) ≤ f(n) ≤ c₂g(n) for all n ≥ n₀ | 0 < L < ∞ |
| f = o(g) | **∀** c > 0 **∃** n₀: 0 ≤ f(n) < c·g(n) for all n ≥ n₀ | L = 0 |
| f = ω(g) | **∀** c > 0 **∃** n₀: 0 ≤ c·g(n) < f(n) for all n ≥ n₀ | L = ∞ |

To **prove** f = O(g), bound each lower-order term by a multiple of g once n ≥ n₀, add the multiples to get c, and state the pair (c, n₀). For example, 3n² + 10n + 5 is at most 5n² once n ≥ 10 and is always at least 3n², so it is Θ(n²) with c₁ = 3, c₂ = 5 and n₀ = 10. To **disprove** a bound, assume c and n₀ exist and derive an absurd inequality: n² ≤ cn forces n ≤ c for all n ≥ n₀, which fails at n = max(n₀, ⌊c⌋ + 1).

The classic two-sided proof is lg(n!) = Θ(n lg n). For the upper bound, n! ≤ nⁿ gives c₂ = 1 with n₀ = 1. For the lower bound, the largest ⌈n/2⌉ factors of n! are each at least n/2, so lg n! ≥ (n/2)(lg n − 1) ≥ (n/4) lg n once n ≥ 4, giving c₁ = 1/4 with n₀ = 4. MIT reaches the same result through Stirling's formula ([MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)). The limit test is sufficient but not necessary. The function n(2 + sin n) is Θ(n) even though n(2 + sin n)/n has no limit, while n^(1+sin n) and n are incomparable: neither is O of the other.

To rank functions, rewrite each one as 2^(something) or n^(something) and compare the exponents. Five identities do most of the work: a^(log_b n) = n^(log_b a), (lg n)^(lg n) = n^(lg lg n), n^(1/lg n) = 2, 4^(lg n) = n² and (√2)^(lg n) = √n. **The base of a logarithm does not matter inside Θ but does matter inside an exponent**, since 2^(lg n) = n while 2^(log₄ n) = √n. **Exponential bases matter too.** 2^(n+1) = Θ(2ⁿ) ([MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)), but 2^(2n) is not O(2ⁿ), because the ratio 2ⁿ is unbounded. Every power of a logarithm is o of every polynomial, which in turn is o of every exponential with base above 1. Small-n tables mislead: n^0.001 overtakes lg n only near n ≈ 2^13747, and 1.01ⁿ overtakes n^100 only near n ≈ 117,308.

A verified ranking of fifteen functions, slowest first, is n^(1/lg n) (= 2) ≺ lg lg n ≺ √(lg n) ≺ ln n ≺ lg² n ≺ (√2)^(lg n) (= √n) ≺ n/lg n ≺ 2^(lg n) (= n) ≺ lg(n!) (= Θ(n lg n)) ≺ 4^(lg n) (= n²) ≺ (lg n)^(lg n) ≺ (3/2)ⁿ ≺ 2ⁿ ≺ n! ≺ nⁿ. The thirty-function list of CLRS Problem 3-3 makes a good timed drill ([walkccc CLRS 3-3](https://walkccc.me/CLRS/Chap03/Problems/3-3/)).

### Loop counting: geometric inner work is Θ(n) and harmonic work is Θ(n log n)

Count how many times the innermost statement executes. An additive step (i += k) gives about range/k iterations, a doubling or halving step gives Θ(log n), and repeated squaring gives Θ(log log n). Dependent loops must be summed, not multiplied. The standard sums are the arithmetic series, Σi², the geometric series and the harmonic number. The harmonic number obeys ln(n+1) ≤ H_n ≤ ln n + 1 ([Erickson, Solving Recurrences](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)), and an increasing geometric series is within a constant of its last term ([DPV ch. 2](https://people.eecs.berkeley.edu/~vazirani/algorithms/chap2.pdf)). Multiplying the maximum inner count by the outer count gives a valid O, but a Θ also needs a lower bound. For Σᵢ i, for instance, the top n/2 terms are each at least n/2. The table collects the patterns exams use most. Each exact count is derived, and the notes confirmed it by simulation ([alg_r01_v12_core_checks.py](<../research_notes/Algorithms midterm research/scripts (asymptotics checks)/alg_r01_v12_core_checks.py>)).

| Fragment | Exact count | Order |
|---|---|---|
| `for i=1..n: for j=1..i` | n(n+1)/2 | Θ(n²) |
| `for i=1..n: for j=1..i: for k=1..j` | n(n+1)(n+2)/6 | Θ(n³) |
| `i=1; while i<=n: i=2*i` | ⌊lg n⌋ + 1 | Θ(log n) |
| `for (i=n; i>=1; i=i/2) for (j=1; j<=i; j++)` | 2n − (number of 1-bits in n) | **Θ(n), not n log n** |
| `for (i=1; i<=n; i*=2) for (j=1; j<=i; j++)` | 2^(⌊lg n⌋+1) − 1 | Θ(n) |
| `for i=1..n: for (j=1; j<=n; j+=i)` | Σ(⌊(n−1)/i⌋ + 1) ≈ n·H_n | **Θ(n log n)** |
| `for (i=2; i<=n; i=i*i)` | ⌊lg lg n⌋ + 1 | Θ(log log n) |
| `p=0; for (i=1; p<=n; i++) p=p+i` | ≈ √(2n) | Θ(√n) |
| `for (i=1; i<=n; i*=2) for (j=1; j<=i; j*=2)` | (L+1)(L+2)/2 with L = ⌊lg n⌋ | Θ(log² n) |
| `for i=1..n: for (j=1; j*j<=i; j++)` | Σ⌊√i⌋ ≈ (2/3)n^1.5 | Θ(n^1.5) |

Two traps sit outside the table. The step `j = j*i` never terminates when i = 1, and `j *= 2` starting from j = 0 never terminates either. When a loop can exit early, the best and worst cases differ, so say which case you are analysing.

### Recurrences: guess with a recursion tree, prove by substitution

Write the recurrence by counting the recursive calls and their sizes, then add the cost of the non-recursive work. Fast exponentiation that computes `h = Power(x, n/2)` once satisfies T(n) = T(n/2) + Θ(1) = Θ(log n). Writing `Power(x, n/2) * Power(x, n/2)` makes two calls instead, which gives 2T(n/2) + Θ(1) = Θ(n). DPV warns that "small changes in this coefficient can have a big impact on running time" ([DPV ch. 2](https://people.eecs.berkeley.edu/~vazirani/algorithms/chap2.pdf)). By the same logic, `return 2 * B(n/2) + s` is one call, not two. Erickson calls "guess the answer, and then prove it correct by induction" the one fail-safe method ([Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)). MIT names substitution, recursion trees and the Master theorem as the three standard tools ([MIT 6.006 R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf)).

A substitution proof must end at T(n) ≤ c·g(n) with **the same c**. The classic wrong proof, "2T(n/2) + n ≤ cn + n = O(n)", lets the constant grow at every level, and the true answer is Θ(n lg n). When an induction misses by a lower-order term, strengthen the guess rather than abandoning it. Take T(n) = 4T(n/2) + n with T(1) = 1. The guess cn² yields cn² + n and does not close. The guess cn² − dn yields 4(c(n/2)² − d(n/2)) + n = cn² − 2dn + n, which is at most cn² − dn whenever d ≥ 1. The base case T(1) = 1 ≤ c − d then fixes c = 2 and d = 1, and in fact **T(n) = 2n² − n exactly**. CLRS exercise 4.3-7, T(n) = 4T(n/3) + n, needs d ≥ 3 in the same way ([walkccc CLRS 4.3](https://walkccc.me/CLRS/Chap04/4.3/)).

Base cases need care too. Because n lg n equals 0 at n = 1, start at n₀ = 2 and check every base case the recursion can reach. For T(n) = 2T(⌊n/2⌋) + n those are n = 2 and 3, and they force c ≥ 2. Erickson adds a tightness heuristic: if an upper-bound induction works for any constant however small, the bound is probably not tight ([Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)).

A **recursion tree** supplies the guess. Level i has a^i nodes, each costing f(n/b^i), so there are log_b n + 1 levels and n^(log_b a) leaves, and "only the largest term in the geometric series matters" ([Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)). Level sums that shrink geometrically mean the root dominates and T = Θ(f(n)). Equal level sums give Θ(f(n) log n). Growing level sums mean the leaves dominate and T = Θ(n^(log_b a)) ([DPV ch. 2](https://people.eecs.berkeley.edu/~vazirani/algorithms/chap2.pdf)). Four examples follow ([Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf)):

| Recurrence | Level sums | Answer |
|---|---|---|
| 3T(n/4) + cn² | (3/16)^i·cn², so the root dominates | Θ(n²) |
| T(n/3) + T(2n/3) + cn | every full level sums to cn; leaves lie between depth log₃ n and log_{3/2} n | Θ(n lg n), however lopsided the tree |
| T(n/5) + T(7n/10) + n | shrink by a factor of 0.9 per level | Θ(n) |
| 2T(n/2) + n/lg n | n/(lg n − i), totalling n·H_{lg n} | Θ(n lg lg n) |

Change of variables handles square roots. For T(n) = 2T(√n) + lg n, setting m = lg n gives S(m) = 2S(m/2) + m, so T(n) = Θ(lg n · lg lg n). Unrolling gives exact closed forms that make good self-checks.

| Recurrence (base) | Exact solution | Order |
|---|---|---|
| T(n−1) + n, T(1) = 1 | n(n+1)/2 | Θ(n²) |
| 2T(n/2) + n, T(1) = 1, n = 2^k | n lg n + n | Θ(n lg n) |
| 2T(n−1) + 1, T(0) = 0 (Tower of Hanoi) | 2ⁿ − 1 | Θ(2ⁿ) |
| T(n/2) + 1, T(1) = 1 | lg n + 1 | Θ(lg n) |
| T(n/2) + n, T(1) = 1 | 2n − 1 | Θ(n) |
| 3T(n/2) + n, T(1) = 1 | 3n^(lg 3) − 2n | Θ(n^1.585) |
| 2T(n/2) + n², T(1) = 1 | 2n² − n | Θ(n²) |
| 2T(n−1) + n, T(0) = 0 | 2^(n+1) − n − 2 | **Θ(2ⁿ), not Θ(n·2ⁿ)** |
| T(n−1) + 1/n, T(0) = 0 | H_n | Θ(lg n) |
| Fibonacci calls: C(n) = C(n−1) + C(n−2) + 1 | 2F(n+1) − 1 | Θ(φⁿ), φ ≈ 1.618 |

### The Master theorem earns marks only when a, b, ε and regularity are shown

The CLRS 3rd-edition statement, as reproduced by MIT, UWO and Wikipedia, assumes constants a ≥ 1 and b > 1 and T(n) = aT(n/b) + f(n), with n/b read as a floor or a ceiling. In **case 1**, if f(n) = O(n^(log_b a − ε)) for some ε > 0, then T(n) = Θ(n^(log_b a)). In **case 2**, if f(n) = Θ(n^(log_b a)), then T(n) = Θ(n^(log_b a) lg n). In **case 3**, if f(n) = Ω(n^(log_b a + ε)) for some ε > 0 **and** the regularity condition a·f(n/b) ≤ c·f(n) holds for some c < 1 and all large n, then T(n) = Θ(f(n)).

MIT 6.006, the UWO handout and Wikipedia also teach an **extended case 2**, absent from the strict 3rd-edition statement: if f(n) = Θ(n^(log_b a) lg^k n) with k ≥ 0, then T(n) = Θ(n^(log_b a) lg^(k+1) n) ([MIT 6.006 R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf); [UWO handout](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf); [Wikipedia: Master theorem](https://en.wikipedia.org/wiki/Master_theorem_%28analysis_of_algorithms%29)). The 2022 4th edition reportedly folds the lg^k extension into case 2, but that could not be verified. MIT's exam advice is the grading rubric in miniature: "you should state which case applies, and show that your recurrence relation satisfies all conditions required by the relevant case" ([MIT 6.006 R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf)).

A full-marks answer to T(n) = 3T(n/4) + n lg n runs as follows. Here a = 3 and b = 4, so n^(log_b a) = n^(log₄ 3) ≈ n^0.793. Then f(n) = n lg n = Ω(n^(0.793+0.2)), so ε = 0.2. Regularity holds with c = 3/4, because 3(n/4) lg(n/4) ≤ (3/4) n lg n. Case 3 therefore gives T(n) = Θ(n lg n). For f(n) = n^k lg^p n with k > log_b a, regularity holds automatically for large n, since a·f(n/b)/f(n) tends to a/b^k < 1, but write the check anyway.

| Recurrence | n^(log_b a) | Case | Answer | Answer key |
|---|---|---|---|---|
| 9T(n/3) + n | n² | 1 (ε = 1) | Θ(n²) | derived |
| T(2n/3) + 1 | 1 | 2 | Θ(lg n) | [MIT R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf) |
| 8T(n/2) + 1000n² | n³ | 1 | Θ(n³) | [Wikipedia](https://en.wikipedia.org/wiki/Master_theorem_%28analysis_of_algorithms%29) |
| 4T(n/2) + n² | n² | 2 | Θ(n² lg n) | [UWO #2](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf) |
| 3T(n/2) + n² | n^1.585 | 3 (c = 3/4) | Θ(n²) | [UWO #1](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf) |
| 16T(n/4) + n | n² | 1 | Θ(n²) | [UWO #5](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf) |
| 2T(n/4) + √n | √n | 2 | Θ(√n lg n) | [walkccc 4.5-1](https://walkccc.me/CLRS/Chap04/4.5/) |
| 2T(n/4) + n^0.51 | n^0.5 | 3 (c ≈ 0.986) | Θ(n^0.51) | [UWO #8](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf) |
| √2·T(n/2) + lg n | √n | 1 | Θ(√n) | [UWO #11](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf) |
| 6T(n/3) + n² lg n | n^1.631 | 3 (c = 2/3) | Θ(n² lg n) | [UWO #17](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf) |
| 4T(n/2) + n/lg n | n² | 1 | Θ(n²) | [UWO #18](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf) |
| T(n/2) + 2ⁿ | 1 | 3 | Θ(2ⁿ) | [UWO #3](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf) |
| 2T(n/2) + n lg n | n | extended 2 (k = 1) | Θ(n lg² n) | [UWO #6](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf) |
| 4T(n/2) + n² lg n | n² | extended 2 only | Θ(n² lg² n) | [walkccc 4.5-4](https://walkccc.me/CLRS/Chap04/4.5/) |

**The theorem does not apply** in eight standard situations, and each has a fallback. The five rows from "a not constant" onward are the inadmissible examples in the UWO handout and Wikipedia ([UWO handout](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf); [Wikipedia: Master theorem](https://en.wikipedia.org/wiki/Master_theorem_%28analysis_of_algorithms%29)). In the cos example the regularity ratio approaches 3/2 near n = 2π × (odd number), yet the sandwich still produces an answer: a theorem not applying never means the answer is unknown.

| Situation | Example | Use instead |
|---|---|---|
| Subtractive recurrence | T(n−1) + n | unroll |
| Unequal subproblem sizes | T(n/3) + T(2n/3) + n | recursion tree or Akra–Bazzi |
| Square-root sizes | 2T(√n) + lg n | change of variables |
| a not constant | 2ⁿT(n/2) + nⁿ | outside the theorem's scope |
| a < 1 | 0.5T(n/2) + 1/n | outside the theorem's scope |
| Negative driving function | 64T(n/8) − n² lg n | outside the theorem's scope |
| Non-polynomial gap | 2T(n/2) + n/lg n | recursion tree, giving Θ(n lg lg n) |
| Regularity fails | T(n/2) + n(2 − cos n) | sandwich between T(n/2) + n and T(n/2) + 3n, giving Θ(n) |

The popular "advanced" table for T(n) = aT(n/b) + Θ(n^k lg^p n) is correct except in one cell. When a < b^k and p < 0, GeeksforGeeks gives Θ(n^k) ([GfG](https://www.geeksforgeeks.org/advanced-master-theorem-for-divide-and-conquer-recurrences/)), but the tight answer is Θ(n^k lg^p n). For example, T(n) = T(n/2) + n/lg n satisfies CLRS case 3, because n/lg n = Ω(n^0.5) and (n/2)/lg(n/2) ≤ (3/4)·n/lg n once n ≥ 8. So it is Θ(n/lg n), and numerically T(n)/(n/lg n) tends to 2.

For subtract-and-conquer recurrences T(n) = aT(n − b) + Θ(n^k), derived and numerically checked in the notes ([alg_r01_v3_rank_decr.py](<../research_notes/Algorithms midterm research/scripts (asymptotics checks)/alg_r01_v3_rank_decr.py>)), the answer is Θ(n^k) when a < 1 and Θ(n^(k+1)) when a = 1. When a > 1 it is **Θ(a^(n/b))**: the bound O(n^k·a^(n/b)) is valid but loose, since 2T(n−1) + n is Θ(2ⁿ). For unequal splits, Akra–Bazzi solves Σaᵢbᵢ^p = 1 for p and gives T(n) = Θ(n^p(1 + ∫₁ⁿ g(u)/u^(p+1) du)). For T(n/3) + T(2n/3) + n this yields p = 1 and Θ(n log n) ([Wikipedia: Akra–Bazzi](https://en.wikipedia.org/wiki/Akra%E2%80%93Bazzi_method)).

## Sorting traces follow Lomuto and 0-based heap conventions exactly

Sorting questions lose marks on conventions, not ideas. The usual culprits are the pivot rule, the index base, what counts as a pass or a comparison, and the direction of each loop: build-heap runs downward, counting sort places right to left, and radix sort starts at the least significant digit. MIT's official quiz solutions list "confusing heap order with traversal order" and skipping the root-to-last-leaf swap among the common heap mistakes ([MIT 6.006 Quiz 1 solutions](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf)). Erickson warns that Hoare partitioning "is one of the places off-by-one errors go to die" ([Erickson ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)).

The summary table is compiled from algs4, Wikipedia and MIT, with counts checked by script. Among the comparison sorts here, only insertion sort and merge sort are stable, only heapsort is both in place and Θ(n lg n) in the worst case, and only quicksort pairs a quadratic worst case with an n lg n average ([algs4 §2.5](https://algs4.cs.princeton.edu/25applications/); [MIT 6.006 L5](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf)).

| Algorithm | Best | Average | Worst | Extra space | Stable | In place |
|---|---|---|---|---|---|---|
| Insertion sort | Θ(n), sorted input | Θ(n²), ~n²/4 comparisons | Θ(n²), n(n−1)/2 comparisons | Θ(1) | yes | yes |
| Quicksort (Lomuto, last-element pivot) | Θ(n lg n) | Θ(n lg n), ≈1.39 n lg n comparisons | Θ(n²) on sorted, reverse-sorted or all-equal input | Θ(lg n) to Θ(n) stack | no | yes, apart from the stack |
| Merge sort | Θ(n lg n) | Θ(n lg n) | Θ(n lg n), n⌈lg n⌉ − 2^⌈lg n⌉ + 1 comparisons | Θ(n) | yes, with ≤ | no |
| Heapsort | Θ(n lg n) (distinct keys) | Θ(n lg n) | Θ(n lg n) | Θ(1) | no | yes |
| Counting sort | Θ(n + k) | Θ(n + k) | Θ(n + k) | Θ(n + k) | yes, placing right to left | no |
| LSD radix sort | Θ(d(n + k)) | Θ(d(n + k)) | Θ(d(n + k)) | Θ(n + k) | yes | no |
| Bucket sort | Θ(n) | Θ(n) expected for uniform input | Θ(n²), all keys in one bucket | Θ(n) | yes, if each bucket is sorted stably | no |

### Insertion sort: shifts equal inversions

The loop invariant says that at the start of each iteration j, A[1..j−1] holds the original first j−1 elements in sorted order. It holds initially because a single element is sorted. Each iteration preserves it by shifting the larger keys right and dropping the key into the hole. At termination (j = n+1) it says the whole array is sorted. The strict test A[i] > key never moves an equal key past another, which is why the sort is stable.

Princeton's counting result is the key to fast hand checks: "The number of exchanges used by insertion sort is equal to the number of inversions in the array, and the number of compares is at least equal to the number of inversions and at most equal to the number of inversions plus the array size" ([algs4 §2.1](https://algs4.cs.princeton.edu/21elementary/)). More precisely, the comparison count is I + (n − 1) − m, where I is the number of inversions and m is the number of passes whose key is a new minimum. Such a pass ends because the index runs off the array, not because a comparison fails. The trace below was checked by the 0-based checker at the end of this report and matches the notes' 1-based CLRS trace.

```
start                [5, 2, 4, 6, 1, 3]
pass 1 (key 2): 1 cmp, 1 shift -> [2, 5, 4, 6, 1, 3]
pass 2 (key 4): 2 cmp, 1 shift -> [2, 4, 5, 6, 1, 3]
pass 3 (key 6): 1 cmp, 0 shift -> [2, 4, 5, 6, 1, 3]
pass 4 (key 1): 4 cmp, 4 shift -> [1, 2, 4, 5, 6, 3]
pass 5 (key 3): 4 cmp, 3 shift -> [1, 2, 3, 4, 5, 6]
total 12 comparisons = 9 inversions + 5 - 2 new minima; 9 shifts
```

Passes are numbered from j = 2 in 1-based CLRS form and from j = 1 in 0-based form, so label them the way the professor does. After pass k the first k+1 entries are sorted among themselves but are not yet in their final places. That differs from selection sort, whose sorted prefix is already final.

### Lomuto quicksort: exactly r − p comparisons per partition

The Lomuto scheme, which Erickson attributes to Nico Lomuto, maintains the invariant that "everything in the subarray A[1..ℓ] is less than A[n], and nothing in the subarray A[ℓ+1..i] is less than A[n]" ([Erickson ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)). In 0-based form it reads:

```
PARTITION(A, p, r)          // first call QUICKSORT(A, 0, n-1)
    x = A[r]                // pivot = last element
    i = p - 1
    for j = p to r - 1
        if A[j] <= x
            i = i + 1
            swap A[i], A[j]
    swap A[i+1], A[r]
    return i + 1            // pivot's final index; recurse on (p, q-1) and (q+1, r)
```

The table traces PARTITION(A, 0, 7) on the classic textbook array [2, 8, 7, 1, 3, 5, 6, 4] in the professor's 0-based form. It was regenerated for this report and matches the notes' 1-based trace, which ends with q = 4 ([worked_traces.py](<../research_notes/Algorithms midterm research/scripts (sorting traces)/worked_traces.py>)).

| j | A[j] | A[j] ≤ 4? | i after | Array after the step |
|---|---|---|---|---|
| start | — | — | −1 | [2, 8, 7, 1, 3, 5, 6, 4] |
| 0 | 2 | yes | 0 | self-swap A[0]: [2, 8, 7, 1, 3, 5, 6, 4] |
| 1 | 8 | no | 0 | unchanged |
| 2 | 7 | no | 0 | unchanged |
| 3 | 1 | yes | 1 | swap A[1], A[3]: [2, 1, 7, 8, 3, 5, 6, 4] |
| 4 | 3 | yes | 2 | swap A[2], A[4]: [2, 1, 3, 8, 7, 5, 6, 4] |
| 5 | 5 | no | 2 | unchanged |
| 6 | 6 | no | 2 | unchanged |
| final | — | — | — | swap A[3], A[7]: **[2, 1, 3, 4, 7, 5, 6, 8], q = 3** |

The partition makes 7 comparisons and 4 exchanges, counting the self-swap and the final swap. The remaining calls finish the sort:

| Call | Pivot | Returns | Array afterwards |
|---|---|---|---|
| PARTITION(A, 0, 2) | 3 | q = 2 | [2, 1, 3, 4, 7, 5, 6, 8] |
| PARTITION(A, 0, 1) | 1 | q = 0 | [1, 2, 3, 4, 7, 5, 6, 8] |
| PARTITION(A, 4, 7) | 8 | q = 7 | [1, 2, 3, 4, 7, 5, 6, 8] |
| PARTITION(A, 4, 6) | 6 | q = 5 | [1, 2, 3, 4, 5, 6, 7, 8] |

That makes 7 + 2 + 1 + 3 + 2 = 15 comparisons in total.

Because Lomuto always makes exactly r − p comparisons, sorted, reverse-sorted and all-equal inputs each cost **n(n−1)/2 comparisons**: 28 for n = 8 and 15 for n = 6. The worst-case recurrence is T(n) = T(n−1) + Θ(n) = Θ(n²). Balanced splits, and even constant 9:1 splits, give Θ(n lg n) ([Erickson ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)). The average over all permutations satisfies C(n) = (n−1) + (2/n)ΣC(k), which telescopes to **2(n+1)H_n − 4n ≈ 1.39 n lg n**. That formula matched exhaustive enumeration for every n ≤ 8 (16.9214 at n = 8), consistent with Princeton's "~2 N ln N compares" and Wikipedia's 1.39 n log₂ n ([algs4 §2.3](https://algs4.cs.princeton.edu/23quicksort/); [Wikipedia: Quicksort](https://en.wikipedia.org/wiki/Quicksort)).

A uniformly random pivot gives O(n log n) with high probability "for every possible input array". That expectation is over the algorithm's coin flips, unlike the average case, which assumes random inputs. Median-of-three repairs sorted input but can still be forced into r = 2 or r = n−1 splits that stay O(n²), and it does nothing for all-equal keys ([Erickson ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)). Hoare's scheme uses the first element as pivot, does about three times fewer swaps, and returns a split index that "isn't necessarily where the actual pivot is". It must therefore recurse on (p, q) and (q+1, r). Recursing first into the smaller side keeps the stack at O(log n) ([Wikipedia: Quicksort](https://en.wikipedia.org/wiki/Quicksort)). Running Hoare's partition with Lomuto's recursion bounds produced an unsorted array in the notes' test, so never mix the two schemes.

### Merge sort: Θ(n lg n) on every input, merged depth-first

MERGE-SORT splits at q = ⌊(p+r)/2⌋, so T(n) = 2T(n/2) + Θ(n) = Θ(n lg n) on every input. That is case 2 of the Master theorem, with all levels of the recursion tree equal ([Erickson ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)). Comparison counts depend on the convention. Merging runs of sizes n₁ and n₂ takes between min(n₁, n₂) and n₁ + n₂ − 1 comparisons. The CLRS 3rd edition's ∞ sentinels make every merge take exactly n₁ + n₂. A whole sort takes at most n⌈lg n⌉ − 2^⌈lg n⌉ + 1 comparisons ([Wikipedia: Merge sort](https://en.wikipedia.org/wiki/Merge_sort)). Merge sort is stable only when ties take from the left run (≤), and it needs Θ(n) extra space ([algs4 §2.2](https://algs4.cs.princeton.edu/22mergesort/)).

Top-down merging is depth-first, finishing the whole left half before the right half starts. "The array after the third merge" is therefore not the array after the second level. The verified trace on ⟨5, 2, 4, 7, 1, 3, 2, 6⟩ follows ([worked_traces.py](<../research_notes/Algorithms midterm research/scripts (sorting traces)/worked_traces.py>)).

```
merge 1: [5] + [2]               -> [2, 5]                    1 cmp   whole: [2, 5, 4, 7, 1, 3, 2, 6]
merge 2: [4] + [7]               -> [4, 7]                    1 cmp   whole: [2, 5, 4, 7, 1, 3, 2, 6]
merge 3: [2, 5] + [4, 7]         -> [2, 4, 5, 7]              3 cmp   whole: [2, 4, 5, 7, 1, 3, 2, 6]
merge 4: [1] + [3]               -> [1, 3]                    1 cmp   whole: [2, 4, 5, 7, 1, 3, 2, 6]
merge 5: [2] + [6]               -> [2, 6]                    1 cmp   whole: [2, 4, 5, 7, 1, 3, 2, 6]
merge 6: [1, 3] + [2, 6]         -> [1, 2, 3, 6]              3 cmp   whole: [2, 4, 5, 7, 1, 2, 3, 6]
merge 7: [2, 4, 5, 7] + [1, 2, 3, 6] -> [1, 2, 2, 3, 4, 5, 6, 7]  7 cmp  (left 2 output first: stable)
total 17 comparisons (= worst case for n = 8); with sentinels it would be 24
```

Bottom-up merge sort merges runs of width 1, 2, 4, … in ⌈lg n⌉ passes. When n is not a power of two, its intermediate arrays differ from the top-down version: with n = 9, the lone ninth element waits until the fourth pass.

### Heapsort as a 0-based table: children at 2i+1 and 2i+2

MIT 6.006 uses the professor's 0-based layout: "Root is at index 0", left(i) = 2i+1, right(i) = 2i+2 and parent(i) = ⌊(i−1)/2⌋. Delete-max swaps the root with the last item and then performs "max heapify down" by swapping with the larger child ([MIT 6.006 L8](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/40d4851e550507ca14dc778b9b2266cc_MIT6_006S20_lec8.pdf)). CLRS, algs4 and VisuAlgo use 1-based arrays instead ([algs4 §2.4](https://algs4.cs.princeton.edu/24pq/); [VisuAlgo heap](https://visualgo.net/en/heap)), but **the array contents of every trace are identical in both conventions**; only the index labels and loop bounds change. In 0-based form BUILD-MAX-HEAP runs i from ⌊n/2⌋ − 1 down to 0, and the leaves are ⌊n/2⌋ … n − 1. The loop must run downward because MAX-HEAPIFY(i) assumes both child subtrees are already heaps. The table shows the professor's format for ⟨4, 1, 3, 2, 16, 9, 10, 14, 8, 7⟩. It was regenerated 0-based and matches the notes' 1-based CLRS output.

| Step | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | Swaps made |
|---|---|---|---|---|---|---|---|---|---|---|---|
| start | 4 | 1 | 3 | 2 | 16 | 9 | 10 | 14 | 8 | 7 | — |
| heapify(4) | 4 | 1 | 3 | 2 | 16 | 9 | 10 | 14 | 8 | 7 | none |
| heapify(3) | 4 | 1 | 3 | 14 | 16 | 9 | 10 | 2 | 8 | 7 | A[3]↔A[7] |
| heapify(2) | 4 | 1 | 10 | 14 | 16 | 9 | 3 | 2 | 8 | 7 | A[2]↔A[6] |
| heapify(1) | 4 | 16 | 10 | 14 | 7 | 9 | 3 | 2 | 8 | 1 | A[1]↔A[4], A[4]↔A[9] |
| heapify(0) | **16** | 14 | 10 | 8 | 7 | 9 | 3 | 2 | 4 | 1 | A[0]↔A[1], A[1]↔A[3], A[3]↔A[8] |

Each heapsort iteration swaps A[0] with the last heap slot, shrinks the heap by one and sifts the new root down. The bold entries are the finished suffix.

| After extraction | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 14 | 8 | 10 | 4 | 7 | 9 | 3 | 2 | 1 | **16** |
| 2 | 10 | 8 | 9 | 4 | 7 | 1 | 3 | 2 | **14** | **16** |
| 3 | 9 | 8 | 3 | 4 | 7 | 1 | 2 | **10** | **14** | **16** |
| 4 | 8 | 7 | 3 | 4 | 2 | 1 | **9** | **10** | **14** | **16** |
| 5 | 7 | 4 | 3 | 1 | 2 | **8** | **9** | **10** | **14** | **16** |
| 6 | 4 | 2 | 3 | 1 | **7** | **8** | **9** | **10** | **14** | **16** |
| 7 | 3 | 2 | 1 | **4** | **7** | **8** | **9** | **10** | **14** | **16** |
| 8 | 2 | 1 | **3** | **4** | **7** | **8** | **9** | **10** | **14** | **16** |
| 9 | 1 | **2** | **3** | **4** | **7** | **8** | **9** | **10** | **14** | **16** |

Build-heap is **O(n), not O(n lg n)**, because at most ⌈n/2^(h+1)⌉ nodes have height h and Σh/2^h = 2 ([Wikipedia: Binary heap](https://en.wikipedia.org/wiki/Binary_heap)). The sum of all node heights is exactly n minus the number of 1-bits in n, which the notes checked for every n < 3000. That matches Princeton's bound of "fewer than 2n compares and fewer than n exchanges" ([algs4 §2.4](https://algs4.cs.princeton.edu/24pq/)). Building by n repeated inserts instead costs Σ depth = lg(n!) = Ω(n lg n) swaps in the worst case. A linear build "doesn't speed up O(n lg n) performance of heap sort" ([MIT 6.006 L8](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/40d4851e550507ca14dc778b9b2266cc_MIT6_006S20_lec8.pdf)). MAX-HEAPIFY satisfies T(n) ≤ T(2n/3) + Θ(1) = O(lg n), since the larger child subtree holds at most about 2n/3 of the nodes. Heapsort is in place, not stable, and Θ(n lg n) even on sorted input ([Wikipedia: Heapsort](https://en.wikipedia.org/wiki/Heapsort)).

The priority-queue operations follow the same rules. EXTRACT-MAX moves the last element to the root and sinks it. INSERT appends the key and swims it up, comparing only with the parent. INCREASE-KEY also swims up. MIT's official answer makes a good self-test: delete-max on [93, 85, 38, 23, 63, 11, 13, 17] gives [85, 63, 38, 23, 17, 11, 13] ([MIT 6.006 Quiz 1 solutions](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf)).

### Counting, radix and bucket sort beat n lg n only under key assumptions

Counting sort first counts each key. It then turns the counts into prefix sums, so that C[i] becomes the last output slot for key i. Finally it places items while scanning the input **in reverse**, which is what makes it stable. It costs Θ(n + k) time and space ([Wikipedia: Counting sort](https://en.wikipedia.org/wiki/Counting_sort)). The verified trace on ⟨2a, 5, 3a, 0a, 2b, 3b, 0b, 3c⟩ with k = 5 has C = [2, 0, 2, 3, 0, 1] after counting and [2, 2, 4, 7, 7, 8] after prefix sums, and it outputs [0a, 0b, 2a, 2b, 3a, 3b, 3c, 5]. Placing left to right with the same decrements still sorts by key but reverses every group of equal keys. LSD radix sort applies a stable sort to each digit, least significant first, for Θ(d(n + k)). MIT explains why both the order and the stability matter: "Stability ensures previous sorts stay sorted" ([MIT 6.006 L5](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf)). The verified passes on ⟨329, 457, 657, 839, 436, 720, 355⟩ are shown below, together with what an unstable digit sort produces.

```
after digit 1 (ones):     [720, 355, 436, 457, 657, 329, 839]
after digit 2 (tens):     [720, 329, 436, 839, 355, 457, 657]
after digit 3 (hundreds): [329, 355, 436, 457, 657, 720, 839]
unstable digit sort ends: [355, 329, 457, 436, 657, 720, 839]   <- wrong
```

Bucket sort on n keys drawn uniformly from [0, 1) puts key x into bucket ⌊n·x⌋, insertion-sorts each bucket and concatenates the results. It is expected Θ(n) because E[n_i²] = 2 − 1/n for each bucket; a Monte Carlo run gave a mean Σn_i² of 1,997.82 against the predicted 1,999 at n = 1000. If every key lands in one bucket, insertion sort makes it Θ(n²) ([Wikipedia: Bucket sort](https://en.wikipedia.org/wiki/Bucket_sort)). The verified trace on ⟨.78, .17, .39, .26, .72, .94, .21, .12, .23, .68⟩ fills these buckets before concatenation:

| Bucket | B1 | B2 | B3 | B6 | B7 | B9 |
|---|---|---|---|---|---|---|
| Sorted contents | .12, .17 | .21, .23, .26 | .39 | .68 | .72, .78 | .94 |

These sorts escape the comparison lower bound. Any comparison sort is a binary decision tree with at least n! leaves, so its height is at least lg(n!) ≥ (n/2)lg(n/2) = Ω(n lg n) ([MIT 6.006 L5](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf)), and four and five keys need at least 5 and 7 comparisons ([Wikipedia: Comparison sort](https://en.wikipedia.org/wiki/Comparison_sort)). Merge sort and heapsort meet the bound. Counting, radix and bucket sort sidestep it by using keys as indices or digits, but they are linear only when k = O(n), d is constant, or the input is uniform.

## Amortized analysis proves a worst-case bound on whole sequences

An amortized bound is **a worst-case guarantee on every sequence of operations, with no probability involved**. MIT puts it this way: "We can assign any amortized cost to each operation, as long as they 'preserve the total cost', i.e., for any sequence of operations, Σ amortized cost ≥ Σ actual cost" ([MIT 6.046J L5](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/13e2c7d165259712327af0af312a068e_MIT6_046JS15_lec05.pdf)). Erickson stresses that "there is no probability involved; we are averaging over a sequence of operations" ([Erickson L9](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)), and CMU calls it "extremely important to not confuse this kind of analysis with average-case analysis" ([CMU 15-451 L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)). Amortized O(1) therefore means n operations cost O(n) in total, even though one call may cost Θ(n). It says nothing about a single call, and it makes no sense for one run of one algorithm, such as "the amortized cost of quicksort".

| | Worst case per operation | Amortized | Average case | Expected (randomized) |
|---|---|---|---|---|
| Averages over | nothing | the operations in one sequence | a distribution of inputs | the algorithm's random choices |
| Holds for every input? | yes | yes, for every sequence | no | yes, in expectation |
| Example | a resizing append costs Θ(n) | any m appends cost ≤ 3m ([CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)) | hash-table search, average 1 under uniform hashing ([algs4 cheatsheet](https://algs4.cs.princeton.edu/cheatsheet/)) | randomized quicksort ([algs4 §1.4](https://algs4.cs.princeton.edu/14analysis/)) |

The **aggregate method** bounds the worst-case total T(n) of any n operations and gives every operation T(n)/n, so it cannot give different operation types different costs. The **accounting (banker's) method** overcharges cheap operations and stores the surplus as credit on specific elements or bits. Because "we must never spend credit that doesn't exist", the bank must stay non-negative after every prefix ([CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)). The **potential method** sets ĉ_i = c_i + Φ(D_i) − Φ(D_{i−1}). The sum telescopes to Σĉ = Σc + Φ(D_n) − Φ(D_0), so the potential must satisfy **Φ(D_i) ≥ Φ(D_0) for every i**; "Φ ≥ 0" suffices only when Φ(D_0) = 0 ([Erickson L9](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)). The last two methods are equivalent, because "in accounting method, we specify ΔΦ, while in potential method, we specify Φ" ([MIT 6.046J L5](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/13e2c7d165259712327af0af312a068e_MIT6_046JS15_lec05.pdf)). Erickson's rule for choosing Φ is that a good potential "goes up a little during any cheap/fast operation, and goes down a lot during any expensive/slow operation" ([Erickson L9](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)).

| Example (cost model) | Aggregate | Accounting | Potential |
|---|---|---|---|
| Stack with MULTIPOP (1 per push or pop) | each element is popped at most once, so T(n) ≤ 2n | PUSH $2, POP $0, MULTIPOP $0; $1 rests on every stacked element | Φ = stack size: PUSH 2, POP 0, MULTIPOP 0 |
| k-bit counter INCREMENT (1 per bit flip) | bit j flips ⌊n/2^j⌋ times, so T(n) < 2n, exactly 2n − (number of 1-bits in n) ([Erickson L9](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)) | $2 per 0→1 flip; $1 rests on every 1-bit | Φ = number of 1-bits: ĉ = (t+1) + (1−t) = 2 |
| Doubling table (1 per insert or copy) | n + (1 + 2 + 4 + …) < 3n | $3 per insert: $1 to insert, $1 on the new item, $1 on an older item | Φ = 2·num − size: ĉ = 3 |

Table doubling is the most likely exam table. Its bookkeeping for 17 inserts follows, with the first insert allocating one slot. Rows 10 to 16, omitted, are cheap inserts, each with c = 1, Φ rising by 2 and ĉ = 3.

| i | Resize | Actual c_i | Σc | Bank = 3i − Σc | num/size after | Φ = 2num − size | ĉ_i = c_i + ΔΦ |
|---|---|---|---|---|---|---|---|
| 1 | 0→1 | 1 | 1 | 2 | 1/1 | 1 | 2 |
| 2 | 1→2 | 2 | 3 | 3 | 2/2 | 2 | 3 |
| 3 | 2→4 | 3 | 6 | 3 | 3/4 | 2 | 3 |
| 4 | — | 1 | 7 | 5 | 4/4 | 4 | 3 |
| 5 | 4→8 | 5 | 12 | 3 | 5/8 | 2 | 3 |
| 6 | — | 1 | 13 | 5 | 6/8 | 4 | 3 |
| 7 | — | 1 | 14 | 7 | 7/8 | 6 | 3 |
| 8 | — | 1 | 15 | 9 | 8/8 | 8 | 3 |
| 9 | 8→16 | 9 | 24 | 3 | 9/16 | 2 | 3 |
| 17 | 16→32 | 17 | 48 | 3 | 17/32 | 2 | 3 |

The MULTIPOP stack is the other staple. Over PUSH a, PUSH b, PUSH c, POP, PUSH d, PUSH e, MULTIPOP(3), PUSH f, MULTIPOP(5), PUSH g, the actual costs are 1, 1, 1, 1, 1, 1, 3, 1, 2 and 1. They total 13, against the bound of 2 × 7 pushes = 14. The bank always equals the stack size, and MULTIPOP(5) on two items costs only 2.

A table that also shrinks needs the piecewise potential Φ = 2·num − size when α ≥ 1/2 and Φ = size/2 − num when α < 1/2, together with **halving only when a delete leaves α below 1/4**. That combination gives INSERT ≤ 3 and DELETE ≤ 2 ([CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf); [MIT 6.046J L5](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/13e2c7d165259712327af0af312a068e_MIT6_046JS15_lec05.pdf)). Princeton halves the array "if it is less than one-quarter full" and asks students to explain why not at one half ([algs4 §1.3](https://algs4.cs.princeton.edu/13stacks/)).

| Operation and state | c_i | ΔΦ | ĉ_i |
|---|---|---|---|
| INSERT, α ≥ 1/2, no expansion | 1 | +2 | 3 |
| INSERT that expands (num = size = s) | s + 1 | 2 − s | 3 |
| INSERT starting with α below 1/2 | 1 | −1 | 0 |
| DELETE while α stays ≥ 1/2 | 1 | −2 | −1 |
| DELETE from exactly α = 1/2 | 1 | +1 | 2 |
| DELETE below 1/2, no contraction | 1 | +1 | 2 |
| DELETE that contracts (num drops below size/4, size halves) | size/4 | 1 − size/4 | 1 |

The reason for 1/4 is numeric. Start from a full table of 8 and apply I, D, D, I, I, D, D, I, I. Halving below 1/2 costs 47, while halving below 1/4 costs 17. Repeated at N = 1024, the 1/2 rule costs 1,028,536 for 4,513 operations, about 228 each, against 5,536 for the 1/4 rule, because a resize under the 1/2 rule leaves the table exactly at the opposite threshold with nothing prepaid. The notes checked these numbers with an embedded script that still runs.

The **queue built from two stacks** pushes ENQUEUEs onto In. A DEQUEUE pops from Out, refilling Out from all of In only when Out is empty. Each element is pushed and popped at most twice, so charging ENQ $3 and DEQ $1, or equivalently using Φ = 2·len(In), gives O(1) amortized cost. A single transferring DEQUEUE that moves m elements still costs 2m + 1 ([Stanford CS166 L9](https://web.stanford.edu/class/archive/cs/cs166/cs166.1266/lectures/09/); [CMU Recitation 4](https://www.cs.cmu.edu/~15451-f25/reci/reci04.pdf)).

Five traps recur in exam problems. First, adding an operation can destroy the bound: MULTIPUSH on the MULTIPOP stack, or DECREMENT on a binary counter, lets n operations cost Θ(n²) or Θ(nk) ([Erickson L9](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf)). Second, the start state matters: a counter that starts with b₀ one-bits costs 2n − b_n + b₀, and MIT stresses that Φ(initial) = 0 "is necessary" for the plain 2n bound ([MIT 6.046J L5](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/13e2c7d165259712327af0af312a068e_MIT6_046JS15_lec05.pdf)). Third, constant growth is not enough: a table that grows by 10 slots costs 50,500 for 1,000 inserts, which is Θ(n) amortized. Fourth, the wrong potential can "prove" a false bound: Φ = num − size on a doubling table yields an amortized cost of 2 but sinks below Φ(D₀) = −1, and 5 appends really cost 12 > 10. Fifth, hash-table O(1) is an average-case bound, not an amortized one, although resizing adds a separate amortized cost.

For breadth, one line each on two advanced structures is enough. Fibonacci heaps offer O(1) amortized insert and decrease-key and O(log n) amortized extract-min ([Stanford CS166 L11](https://web.stanford.edu/class/archive/cs/cs166/cs166.1266/lectures/11/)). Union by rank with path compression runs in O(α(n)) amortized time ([Erickson L11](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/11-unionfind.pdf)).

## Red-black trees reduce to two decision tables

### Five properties force height at most 2 lg(n+1)

In CLRS numbering, the five properties are that (1) every node is red or black, (2) the root is black, (3) every NIL leaf is black, (4) a red node has two black children, and (5) for each node, all paths down to descendant leaves contain the same number of black nodes. MIT's lecture states the same rules in four lines from the child's side ([MIT 6.046J L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)). CLRS stores every NIL as one shared black sentinel, T.nil, so code can read the color of a missing child without special cases. The black-height bh(x) counts the black nodes below x on any path to a NIL. **It excludes x itself and includes the NIL**, matching MIT's slide annotations, which show bh = 2 at a red node and bh = 0 at the NILs. A handy corollary for validity questions is that a node with exactly one child must have a red child ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)).

The height proof takes three steps and is a likely "prove it" question. First, by induction, the subtree rooted at x contains at least 2^bh(x) − 1 internal nodes. Second, property 4 makes at least half the nodes on any root-to-leaf path black, so bh(root) ≥ h/2. Therefore n ≥ 2^(h/2) − 1, which gives **h ≤ 2 lg(n+1)**. MIT's alternative merges each red node into its black parent. That yields a 2-3-4 tree with uniform leaf depth h′ ≥ h/2 and n + 1 leaves, so h ≤ 2 lg(n+1) again ([MIT 6.046J L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)).

With bh(root) = k, a tree holds between **2^k − 1 nodes (all black and perfect) and 4^k − 1 nodes (alternating black and red levels)**. So a tree with n nodes can have bh = k exactly when 2^k − 1 ≤ n ≤ 4^k − 1. The notes verified this by dynamic programming, and it contradicts the free Rutgers solution to CLRS 13.1-6 ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)).

LEFT-ROTATE(x) lifts y = x.right, hands y's left subtree β to x, and makes x the left child of y. It takes O(1) time, preserves the in-order sequence α, x, β, y, γ, and changes three links, each in both directions ([MIT 6.046J L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)). The node passed in is the one that goes down. **CLRS rotations never change colors**, whereas Princeton's left-leaning code recolors inside its rotations ([algs4 RedBlackBST.java](https://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html)).

### Insertion: look at the uncle first

RB-INSERT places the new node z as a **red** leaf. A black z would add a black node to every path through it and break property 5 globally ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)), so only a red-red pair or a red root can go wrong. MIT summarizes the repair: "Go up the tree performing Case 1, which only recolors nodes. If Case 2 or Case 3 occurs, perform 1 or 2 rotations, and terminate" ([MIT 6.046J L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)). The table assumes the parent p is a left child of the grandparent g. The uncle is u, and a NIL uncle counts as black.

| Case | Condition | Action | Rotations | Next |
|---|---|---|---|---|
| 1 | u is red | p and u turn black, g turns red; set z = g | 0 | repeat two levels higher |
| 2 | u is black and z is p's right child (a triangle) | z = p; LEFT-ROTATE(z) | 1 | always becomes Case 3 |
| 3 | u is black and z is p's left child (a line) | p turns black, g turns red; RIGHT-ROTATE(g) | 1 | done |
| 1′, 2′, 3′ | p is a right child | swap every left and right above | same | same |
| exit | p is black, or z is the root | color the root black | 0 | done |

At most two rotations happen per insertion ([Linux kernel rbtree docs](https://docs.kernel.org/core-api/rbtree.html)), while Case 1 can repeat O(lg n) times. The verified trace inserting 10, 20, 30, 15, 25, 5, 1 into an empty tree follows. Trees are written as key(left, right), with "-" for NIL ([04_rb_verify.py](<../research_notes/Algorithms midterm research/scripts (red-black tree traces)/04_rb_verify.py>)).

```
insert 10  empty tree: z is the root -> final line colors it black          10B
insert 20  parent 10 is black: nothing to fix                                10B(-, 20R)
insert 30  Case 3' (uncle NIL is black; right-right line):
           20 -> B, 10 -> R, LEFT-ROTATE(10)                                 20B(10R, 30R)
insert 15  Case 1 (parent 10 and uncle 30 red): 10, 30 -> B, 20 -> R, z = 20;
           z is the root -> final line colors it black                       20B(10B(-, 15R), 30B)
insert 25  parent 30 is black                                                20B(10B(-, 15R), 30B(25R, -))
insert 5   parent 10 is black                                                20B(10B(5R, 15R), 30B(25R, -))
insert 1   Case 1 (parent 5 and uncle 15 red): 5, 15 -> B, 10 -> R, z = 10;
           parent 20 is black -> stop
                 20B
                /    \
             10R      30B
            /   \     /
          5B    15B  25R
         /
       1R
```

The CLRS Figure 13.4 insertion exercises all three left-side cases in one call. Start from 11B(2R(1B, 7B(5R, 8R)), 14B(-, 15R)) and insert 4, which becomes the left child of 5. **Case 1** recolors 5 and 8 black and 7 red, so z = 7. **Case 2** then applies, because z = 7 is the right child of the red left child 2 and the uncle 14 is black, so z = 2 and LEFT-ROTATE(2) runs. **Case 3** finally recolors 7 black and 11 red, and RIGHT-ROTATE(11) gives 7B(2R(1B, 5B(4R, -)), 11R(8B, 14B(-, 15R))). MIT's lecture runs the mirror sequence 1′ → 2′ → 3′ when inserting 15 ("RIGHT-ROTATE(18). LEFT-ROTATE(7) and recolor"), and the notes' script reproduces it exactly ([MIT 6.046J L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)).

### Deletion: check the moved node's original color, then the sibling

RB-DELETE first performs an ordinary BST delete with RB-TRANSPLANT. A two-child z is replaced by its **successor** y, the minimum of z's right subtree, which also inherits z's color. The procedure records y's **original** color (y is z itself when z has at most one child) and calls the fixup only if that color was black. The fixup starts from x, the node that moved into y's old spot, which may be T.nil.

Removing a red node cannot change any black-height or create a red-red pair. A black removal is repaired by pretending x carries an "extra black". If x is red ("red-and-black"), it is simply colored black. If x is the root, the extra black is dropped. Otherwise x is "doubly black", and the fixup consults the sibling w and w's children, the nephews. **The fixup depends on y's original color, not z's**, so deleting a red z whose successor is black still needs a fixup. The table assumes x is a left child, so w = x.p.right, the near nephew is w.left and the far nephew is w.right.

| Case | Condition | Action | Rotations | Next |
|---|---|---|---|---|
| 1 | w is red | w turns black, x.p turns red; LEFT-ROTATE(x.p); w = x.p.right | 1 | the new w is black: go to Case 2, 3 or 4 |
| 2 | w is black with two black children | w turns red; x = x.p | 0 | stop if the new x is red (color it black) or is the root; else loop |
| 3 | w is black, near nephew red, far nephew black | near nephew turns black, w turns red; RIGHT-ROTATE(w); w = x.p.right | 1 | always Case 4 |
| 4 | w is black and the far nephew is red | w takes x.p's color; x.p and the far nephew turn black; LEFT-ROTATE(x.p); x = root | 1 | done |
| 1′–4′ | x is a right child | swap every left and right (the near nephew becomes w.right) | same | same |

Only Case 2 can repeat, and rotations occur only in a final run of Case 1 → 3 → 4. That gives **at most three rotations per deletion**, against at most two per insertion ([Linux kernel rbtree docs](https://docs.kernel.org/core-api/rbtree.html)). The notes' stress test of 30,000 random operations never exceeded either limit. The verified deletions below start from the insertion trace's final tree and cover Cases 4′, 1′ → 2′ and 3 → 4, plus Case 2 reaching the root ([04_rb_verify.py](<../research_notes/Algorithms midterm research/scripts (red-black tree traces)/04_rb_verify.py>)).

```
start      20B(10R(5B(1R, -), 15B), 30B(25R, -))
delete 20  two children: successor 25 is RED -> it moves up taking color B; no fixup
                                                       25B(10R(5B(1R, -), 15B), 30B)
delete 15  black leaf: x = NIL is doubly black and a RIGHT child; w = 5 black,
           far nephew 1 red -> Case 4': 5 takes 10's color (R), 10 -> B, 1 -> B,
           RIGHT-ROTATE(10)                            25B(5R(1B, 10B), 30B)
delete 30  x = NIL right child of 25; w = 5 red -> Case 1': 5 -> B, 25 -> R,
           RIGHT-ROTATE(25); new w = 10 black with black children -> Case 2':
           10 -> R, x = 25 is red -> color it black    5B(1B, 25B(10R, -))
delete 1   x = NIL left child of 5; w = 25 black, near nephew 10 red, far NIL black
           -> Case 3: 10 -> B, 25 -> R, RIGHT-ROTATE(25); new w = 10 with far
           nephew 25 red -> Case 4: 10 takes 5's color (B), 5 -> B, 25 -> B,
           LEFT-ROTATE(5)                              10B(5B, 25B)
delete 5   x = NIL; w = 25 black with black children -> Case 2: 25 -> R, x = 10 is
           the root -> drop the extra black (bh falls from 2 to 1)   10B(-, 25R)
```

### AVL trees and B-trees trade height for rebalancing work

**AVL trees** require the two child heights of every node to differ by at most one, treating a nil tree as height −1 ([MIT 6.006 F11 L6](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/83cdd705cd418d10d9769b741e34a2b8_MIT6_006F11_lec06.pdf)). The minimum node count obeys the Fibonacci-like recurrence N_h = N_{h−1} + N_{h−2} + 1, so the height stays below 1.4405 lg(n+2) − 0.3277, about 0.72 of the red-black worst case ([Wikipedia: AVL tree](https://en.wikipedia.org/wiki/AVL_tree)). Its four imbalance cases correspond to red-black insertion's line and triangle cases:

| AVL case | Fix | Red-black analogue |
|---|---|---|
| LL | one right rotation | Case 3 |
| RR | one left rotation | Case 3′ |
| LR | left rotation at the child, then right rotation at the node | Case 2 → 3 |
| RL | right rotation at the child, then left rotation at the node | Case 2′ → 3′ |

One single or double rotation always repairs an AVL insertion, but a deletion may retrace O(log n) levels ([Wikipedia: AVL tree](https://en.wikipedia.org/wiki/AVL_tree)). In the notes' example, the AVL tree built from 4, 8, 5, 10, 11, 7, 12, 1, 9, 6, 3, 2 needs right rotations at two different levels when 11 is deleted. "Every AVL tree can be colored red–black, but there are RB trees which are not AVL balanced", and AVL lookups run slightly faster in lookup-heavy work ([Wikipedia: AVL tree](https://en.wikipedia.org/wiki/AVL_tree)).

**B-trees** in CLRS's minimum-degree form keep t−1 to 2t−1 keys in every non-root node. A node with k keys has k+1 children, and all leaves sit at one depth, which bounds the height by log_t((n+1)/2). Wikipedia gives the same bound as ⌊log_d((n+1)/2)⌋ ([Wikipedia: B-tree](https://en.wikipedia.org/wiki/B-tree)). Knuth's "order m" counts the maximum number of children instead, so m = 2t, and Wikipedia notes that "the literature on B-trees is not uniform in its terminology" ([Wikipedia: B-tree](https://en.wikipedia.org/wiki/B-tree)). CLRS inserts in a single downward pass that **splits every full node it meets**, and splitting a full root is the only way the tree grows taller. Deletion repairs underflow by borrowing from a sibling or merging with one ([USFCA BTree.js](https://www.cs.usfca.edu/~galles/visualization/AlgorithmLibrary/BTree.js)).

A B-tree with t = 2 is a 2-3-4 tree, and a CLRS red-black tree is a 2-3-4 tree in binary form: each black node together with its red children forms one 2-3-4 node ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)). The insertion trace above collapses to [10 20] / [1 5] [15] [25 30], the same tree that CLRS B-TREE-INSERT builds from those keys. The correspondence extends to the operations. Red-black insertion Case 1 is the split of a 4-node, which Sedgewick identifies with the color flip as "the essential operation" ([Sedgewick 2008](https://sedgewick.io/wp-content/themes/sedgewick/papers/2008LLRB.pdf)). Deletion Case 2 is a merge, and deletion Cases 3 and 4 borrow from a sibling.

| | Red-black tree (CLRS) | AVL tree | B-tree (minimum degree t) |
|---|---|---|---|
| Balance rule | no red-red; equal black count on all paths | child heights differ by at most 1 | t−1 to 2t−1 keys per non-root node; leaves level |
| Worst-case height | 2 lg(n+1) | about 1.44 lg n | log_t((n+1)/2) |
| Extra data per node | 1 color bit | balance factor or height | key count, leaf flag, up to 2t children |
| Rebalancing per insert | at most 2 rotations, O(lg n) recolorings | at most 1 single or double rotation | at most h + 1 splits, no rotations |
| Rebalancing per delete | at most 3 rotations | up to O(lg n) rotations | borrows and merges, O(h) |
| Typical use | Java TreeMap; Linux kernel I/O schedulers and memory areas ([Java TreeMap](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/TreeMap.html); [Linux rbtree](https://docs.kernel.org/core-api/rbtree.html)) | lookup-heavy in-memory maps | database indexes and file systems such as NTFS, APFS and ext4 ([Wikipedia: B-tree](https://en.wikipedia.org/wiki/B-tree)) |

The B-tree's advantage is measured in disk reads. A full height-2 B-tree with 1,000 keys per node holds 1,003,003,000 keys, so any search touches at most three pages. For n = 10⁶ the worst-case heights are 39 for a red-black tree, 28 for an AVL tree and 2 for a B-tree with t = 100.

### CLRS and Sedgewick's left-leaning trees give different answers

Princeton's algs4 book, its Coursera course and Sedgewick's 2008 paper teach the **left-leaning red-black tree** (LLRB). It corresponds 1-1 to 2-3 trees rather than 2-3-4 trees, and it forbids red right children. It inserts recursively, with three fix-up lines on the way up, and deletes top-down with moveRedLeft and moveRedRight ([algs4 §3.3](https://algs4.cs.princeton.edu/33balanced/); [Sedgewick 2008](https://sedgewick.io/wp-content/themes/sedgewick/papers/2008LLRB.pdf)). Inserting 1 to 5 gives 2B(1B, 4B(3R, 5R)) under CLRS but 4B(2R(1B, 3B), 5B) under LLRB, because CLRS keeps the 4-node [3 4 5] while LLRB splits it at once with a color flip. Any video or tool that mentions "red links lean left", "flipColors" or "moveRedLeft" describes LLRB and should not be used to check CLRS answers. Beware that for the insertion-trace keys above the two variants happen to end in the same tree.

## Popular sources disagree in twenty-one places that change the answer

Each row below is a point where two reputable sources, or a source and CLRS, would mark the same answer differently. The safe habit on the exam is to state your convention in a short parenthesis.

| Question | One convention or source | The other | Exam-safe move |
|---|---|---|---|
| Quicksort partition | Lomuto: last-element pivot, returns the pivot's final index, recurse on (p, q−1) and (q+1, r) ([Erickson ch. 1](http://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf)) | Hoare: first-element pivot, returns a split index that may not hold the pivot, recurse on (p, q) and (q+1, r) ([Wikipedia](https://en.wikipedia.org/wiki/Quicksort)) | use the professor's Lomuto and never mix recursion bounds |
| Heap indexing | 1-based: children 2i and 2i+1, parent ⌊i/2⌋ ([algs4 §2.4](https://algs4.cs.princeton.edu/24pq/); [VisuAlgo](https://visualgo.net/en/heap)) | 0-based: children 2i+1 and 2i+2, parent ⌊(i−1)/2⌋ ([MIT L8](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/40d4851e550507ca14dc778b9b2266cc_MIT6_006S20_lec8.pdf)) | same contents; shift the labels and loop bounds |
| Heap height | ⌊lg n⌋ edges (CLRS style) | ⌈lg n⌉ ([MIT L8](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/40d4851e550507ca14dc778b9b2266cc_MIT6_006S20_lec8.pdf)) | they differ at n = 10 (3 versus 4) |
| Merge comparisons | CLRS 3rd-edition sentinels: exactly n₁ + n₂ per merge | no sentinels: min(n₁, n₂) to n₁ + n₂ − 1 ([Wikipedia](https://en.wikipedia.org/wiki/Merge_sort)) | state the counting rule |
| "In place" | textbooks call quicksort in place | strict O(1) extra space ([VisuAlgo](https://visualgo.net/en/sorting)) excludes its O(lg n) stack | "in place apart from the stack" |
| Master theorem case 2 | strict CLRS 3rd edition: 4T(n/2) + n² lg n "does not apply" ([walkccc 4.5](https://walkccc.me/CLRS/Chap04/4.5/)) | extended: Θ(n^(log_b a) lg^(k+1) n) ([MIT R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf); [UWO](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf)) | name the version and fall back on a recursion tree |
| "Advanced" Master theorem, a < b^k with p < 0 | Θ(n^k) ([GfG](https://www.geeksforgeeks.org/advanced-master-theorem-for-divide-and-conquer-recurrences/)) | Θ(n^k lg^p n), by CLRS case 3 with regularity | use CLRS case 3 |
| Decreasing recurrences, a > 1 | upper bound O(n^k·a^(n/b)) | tight Θ(a^(n/b)); 2T(n−1) + n = Θ(2ⁿ) | unroll and sum |
| O-notation letters | CLRS: f(n) = O(g(n)) bounds f by g | MIT R01: g(n) ∈ O(f(n)) ([MIT R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)) | identify which function is the bound |
| Potential validity | Φ(D₀) = 0 and Φ ≥ 0, CS166's working assumption ([CS166 L9](https://web.stanford.edu/class/archive/cs/cs166/cs166.1266/lectures/09/)) | Φ(D_i) ≥ Φ(D₀); CMU's array starts at Φ = −1 ([CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)) | state Φ(D₀) and check every prefix |
| Table contraction | halve below 1/4 full ([algs4 §1.3](https://algs4.cs.princeton.edu/13stacks/)) | start size and exact trigger vary; CMU shrinks at n = c/4 ([CMU L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf)) | the bounds 3 and 2 hold either way; show your trigger |
| Hash-table O(1) | average case under uniform hashing ([algs4 cheatsheet](https://algs4.cs.princeton.edu/cheatsheet/)) | often mislabeled "amortized" | average case, plus amortized resizing |
| Red-black root | CLRS: the root must be black | Sedgewick & Wayne and Mehlhorn & Sanders drop the rule ([Wikipedia](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)) | under CLRS a red root is invalid |
| Black-height | CLRS: exclude the node, count the NIL ([MIT L10](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)) | Rutgers' 13.1-6 answer, 2^(k+1) − 1 to 2^(2k+1) − 1, does not fit the CLRS convention ([Bodnar & Lohr](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)) | use 2^k − 1 to 4^k − 1 and state the convention |
| Red-black case numbers | CLRS insert Cases 1–3 and delete Cases 1–4 | Wikipedia I2/I5/I6 and D3/D2–D4/D5/D6 ([Wikipedia](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)) | write the condition, not just the number |
| Two-child deletion | CLRS: successor | USFCA visualizer: "largest node in left subtree" ([RedBlack.js](https://www.cs.usfca.edu/~galles/visualization/AlgorithmLibrary/RedBlack.js)) | successor; expect the visualizer's deletions to differ |
| Which red-black tree | CLRS: 2-3-4 equivalent, rotations never recolor | LLRB: 2-3 equivalent, rotations recolor ([algs4 RedBlackBST](https://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html)) | inserting 1..5 gives root 2 under CLRS and root 4 under LLRB |
| B-tree size | CLRS minimum degree t | Knuth order m = maximum children = 2t ([Wikipedia](https://en.wikipedia.org/wiki/B-tree)); USFCA's "Max. Degree" | convert before answering |
| B-tree splitting | CLRS splits full nodes on the way down | bottom-up splitting only on overflow ([Wikipedia](https://en.wikipedia.org/wiki/B-tree)); Rutgers' drawn 18.2-1 answer keeps a full root ([Bodnar & Lohr ch. 18](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch18.pdf)) | follow CLRS, because the trees differ |
| AVL balance factor | height(left) − height(right) | height(right) − height(left) ([Wikipedia](https://en.wikipedia.org/wiki/AVL_tree)) | state the sign |
| Radix intermediate line | MIT L5 shows [32, 03, 44, 42, 22] ⟹ [42, 22, 32, 03, 44] ([MIT L5](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/78a3c3444de1ff837f81e52991c24a86_MIT6_006S20_lec5.pdf)) | a stable ones-digit pass gives [32, 42, 22, 03, 44] | do not copy that line |

## Sixty-six practice problems with verified answers

Cover the answer column and work each problem on paper first. Problems marked † come from sources with official or published answers: MIT, UWO, and CLRS exercises solved in free solution sets. The others are the notes' own problems, and every answer was produced or checked by script. Red-black answers use the notation key(left, right), with B or R for the color and "-" for a NIL child.

**A. Asymptotics, loops and cases**

| # | Problem | Answer |
|---|---|---|
| A1 | Is n^1.001 = O(n lg n)? | No. n^0.001/lg n → ∞ by L'Hôpital, so n lg n = o(n^1.001), and the curves cross only near n ≈ 2^13747. |
| A2 † | Is 2^(n+1) = O(2ⁿ)? Is 2^(2n) = O(2ⁿ)? Is 2^(2^(n+1)) = O(2^(2ⁿ))? | Yes (c = 2, n₀ = 1). No (the ratio 2ⁿ is unbounded). No (it is the square of 2^(2ⁿ)) ([MIT R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)). |
| A3 | Is (lg n)^(lg n) = O(n^10)? | No. It equals n^(lg lg n), and lg lg n > 10 once n > 2^1024. It is still o(2ⁿ). |
| A4 | Prove lg(n!) = Θ(n lg n) with explicit constants. | n! ≤ nⁿ gives c₂ = 1, n₀ = 1. n! ≥ (n/2)^(n/2) gives lg n! ≥ (n/4) lg n for n ≥ 4, so c₁ = 1/4, n₀ = 4. |
| A5 | True or false: (a) f = O(g) ⇒ 2^f = O(2^g); (b) max(f, g) = Θ(f + g) for f, g ≥ 0; (c) f(n) = Θ(f(n/2)). | (a) False: take f = 2n, g = n. (b) True with constants 1/2 and 1. (c) False for 2ⁿ, true for polynomials. |
| A6 | Rank, marking ties: n lg n, 2^(n/2), n^100, lg(n⁵), 4^(lg n), 1.01ⁿ, n^(3/2), 10^100, √(2ⁿ), lg² n, n^(lg 3), n!, 2^(lg n). | 10^100 ≺ lg(n⁵) ≺ lg² n ≺ 2^(lg n) ≺ n lg n ≺ n^(3/2) ≺ n^(lg 3) ≺ 4^(lg n) ≺ n^100 ≺ 1.01ⁿ ≺ 2^(n/2) ≡ √(2ⁿ) ≺ n! |
| A7 | Running time of `for i=1..n: for (j=1; j<=n; j+=i)`? | Θ(n log n): the inner loop runs about n/i times, for a total of about n·H_n. |
| A8 | Running time of `for (i=n; i>=1; i=i/2) for (j=1; j<=i; j++)`? | Θ(n). The exact count is 2n minus the number of 1-bits in n. |
| A9 | Running time of `i=2; while (i<=n) i=i*i`? | Θ(log log n), because after t rounds i = 2^(2^t). |
| A10 | Linear search when the key is present with probability p, at a uniformly random position: expected comparisons? | p(n+1)/2 + (1 − p)n. Check: p = 1 gives (n+1)/2 and p = 0 gives n. |

**B. Recurrences and the Master theorem**

| # | Problem | Answer |
|---|---|---|
| B1 | T(n) = 3T(n/2) + n, T(1) = 1 | Case 1: Θ(n^(lg 3)). Exactly 3n^(lg 3) − 2n when n = 2^k. |
| B2 | T(n) = 2T(n/2) + n² | Case 3, with regularity constant c = 1/2: Θ(n²). Exactly 2n² − n when T(1) = 1. |
| B3 | T(n) = 4T(n/2) + n² lg n | Extended case 2 with k = 1: Θ(n² lg² n). The strict 3rd-edition theorem does not apply, so use a recursion tree with level sums n²(lg n − i). |
| B4 | T(n) = T(n−2) + n² | Not a Master-theorem form. Unrolling gives Θ(n³), exactly n(n+1)(n+2)/6. |
| B5 | T(n) = 2T(√n) + 1 | Substitute m = lg n: S(m) = 2S(m/2) + 1 = Θ(m), so T(n) = Θ(lg n). |
| B6 | T(n) = T(n/4) + T(3n/4) + n | Full levels sum to n, and the depth is between log₄ n and log_{4/3} n, so Θ(n lg n). Akra–Bazzi gives p = 1. |
| B7 | T(n) = 2T(n−1) + n, T(0) = 0 | 2^(n+1) − n − 2 = Θ(2ⁿ), not Θ(n·2ⁿ). |
| B8 | T(n) = 2T(n/2) + n/lg n | The 3-case theorem fails because the gap is not polynomial. Level sums n/(lg n − i) give Θ(n lg lg n). |
| B9 | Prove T(n) = 4T(n/2) + n is O(n²) by substitution. | The guess cn² leaves an extra n. Use cn² − dn instead, which works for d ≥ 1. The base case gives c = 2 and d = 1, and T(n) = 2n² − n exactly. |
| B10 | Function A returns A(n/2) + A(n/2) + s after a Θ(n) loop. B returns 2*B(n/2) + s. C does n² work, then calls C(n/3) three times. | A = Θ(n lg n). B makes one call: T(n/2) + Θ(n) = Θ(n). C = 3T(n/3) + Θ(n²) = Θ(n²). |
| B11 † | 2T(n/4) + n^0.51; √2·T(n/2) + lg n; 3T(n/4) + n lg n; 64T(n/8) − n² lg n | Θ(n^0.51); Θ(√n); Θ(n lg n); does not apply, because f is negative ([UWO #8, #11, #15, #19](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf)) |
| B12 † | T(n) = T(n/2) + n(2 − cos n) | Regularity fails, so the theorem does not apply. Since n ≤ f ≤ 3n, sandwiching gives Θ(n) ([UWO #22](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf)). |
| B13 † | What is the largest integer a for which aT(n/4) + n² beats Strassen's Θ(n^(lg 7))? | 48, since it needs log₄ a < lg 7, i.e. a < 49 ([walkccc 4.5-2](https://walkccc.me/CLRS/Chap04/4.5/)). |

**C. Sorting traces and counts**

| # | Problem | Answer |
|---|---|---|
| C1 | Insertion sort on ⟨7, 4, 9, 2, 6, 3⟩: give the array, comparisons and shifts after each pass. | [4,7,9,2,6,3] (1, 1); [4,7,9,2,6,3] (1, 0); [2,4,7,9,6,3] (3, 3); [2,4,6,7,9,3] (3, 2); [2,3,4,6,7,9] (5, 4). Total 13 comparisons and 10 shifts. |
| C2 | Insertion sort on ⟨6, 5a, 3, 1, 8, 7, 2, 5b⟩: array after the 3rd pass; final order of 5a and 5b; totals. | [1, 3, 5a, 6, 8, 7, 2, 5b]. 5a stays before 5b. 19 comparisons and 15 shifts. |
| C3 | 0-based Lomuto PARTITION(A, 0, 7) on ⟨6, 3, 9, 1, 8, 2, 7, 5⟩. | [3, 1, 2, 5, 8, 9, 7, 6] with q = 3 (q = 4 in 1-based form). 7 comparisons and 4 exchanges (3 in the loop plus the final one). |
| C4 | Full Lomuto quicksort of the C3 array: each partition and the total comparisons. | (0,7) → q = 3. (0,2) with pivot 2 → q = 1. (4,7) with pivot 6 → q = 4. (5,7) with pivot 8 → q = 6. Total 7 + 2 + 3 + 2 = 14 comparisons. |
| C5 | Lomuto quicksort with n = 6 on sorted, reverse-sorted and all-equal input: comparisons, and a fix for each. | 15 = n(n−1)/2 each. A random pivot or median-of-three fixes sorted and reverse-sorted input; only Hoare or 3-way partitioning fixes equal keys. |
| C6 | Hoare partition (1-based, first-element pivot) on ⟨6, 3, 9, 1, 8, 2, 7, 5⟩. | [5, 3, 2, 1, 8, 9, 7, 6], returning q = 4, so recurse on (1, 4) and (5, 8). The pivot 6 ends at index 8. 2 exchanges and 10 comparisons. |
| C7 | Merge sort on ⟨12, 7, 3, 15, 9, 1, 10, 4⟩: array after the 3rd merge; total comparisons. | [3, 7, 12, 15, 9, 1, 10, 4]. 16 comparisons (the worst case for n = 8 is 17). |
| C8 | Comparisons to merge ⟨1,4,6,9⟩ + ⟨2,3,7,8⟩, ⟨2,3,5⟩ + ⟨10..14⟩ and ⟨1,2,3,20⟩ + ⟨4,5,6,7⟩, without and with sentinels. | 7, 3 and 7. With CLRS sentinels, 8 each. |
| C9 | Bottom-up merge sort on ⟨5, 1, 6, 2, 7, 3, 8, 4, 0⟩: number of passes and comparisons. | 4 passes and 17 comparisons. The 0 is merged only in the last pass. |
| C10 | 0-based BUILD-MAX-HEAP on ⟨2, 8, 6, 1, 10, 15, 3, 12, 11⟩, then the array after 3 heapsort extractions. | i = 3 → [2,8,6,12,10,15,3,1,11]. i = 2 → [2,8,15,12,10,6,3,1,11]. i = 1 → [2,12,15,11,10,6,3,1,8]. i = 0 → [15,12,6,11,10,2,3,1,8]. After 3 extractions: [10, 8, 6, 3, 1, 2, 11, 12, 15]. |
| C11 | Starting each time from H = [20, 18, 15, 12, 9, 10, 7, 4, 8, 3]: (a) EXTRACT-MAX; (b) INSERT 19; (c) INCREASE-KEY of 0-based index 8 to 25. | (a) Returns 20, leaving [18, 12, 15, 8, 9, 10, 7, 4, 3]. (b) [20, 19, 15, 12, 18, 10, 7, 4, 8, 3, 9]. (c) [25, 20, 15, 18, 9, 10, 7, 4, 12, 3]. |
| C12 † | In a 0-based heap with n = 13: parent(12), the children of 4, and the leaf range. In a 10-key min-heap stored in positions A..J: where can the 1st, 2nd and 3rd smallest keys and the largest key be? | parent(12) = 5; the children of 4 are 9 and 10; the leaves are 6..12. Smallest: A. 2nd: B or C. 3rd: any of B–G. Largest: any of F–J ([MIT Quiz 1](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf)). |
| C13 | Which are max-heaps? (a) [30,20,25,15,18,22,10,5,16,3]; (b) [23,17,14,6,13,10,1,5,7,12]; (c) [10,9,3,8,7,2,1] | (a) No: 15 sits above 16. (b) No: 6 sits above 7. (c) Yes. |
| C14 | Counting sort on ⟨4a, 1a, 3a, 4b, 0, 1b, 3b, 4c, 2⟩ with k = 5: C after counting and after prefix sums, and the output. What happens if the last loop runs forward? | C = [1,2,1,2,3,0], then [1,3,4,6,9,9]. Output [0, 1a, 1b, 2, 3a, 3b, 4a, 4b, 4c]. Running forward gives [0, 1b, 1a, 2, 3b, 3a, 4c, 4b, 4a]: still sorted but unstable. |
| C15 | LSD radix sort on ⟨512, 307, 123, 456, 721, 089, 034, 700⟩: each pass. What if the passes run MSD first? | [700,721,512,123,034,456,307,089] → [700,307,512,721,123,034,456,089] → [034,089,123,307,456,512,700,721]. MSD-first ends up sorted only by the last digit. |
| C16 | Bucket sort on ⟨.45, .12, .87, .33, .91, .05, .48, .36, .62, .17⟩ with n = 10, and its worst case. | B0 .05; B1 .12 .17; B3 .33 .36; B4 .45 .48; B6 .62; B8 .87; B9 .91. Worst case: all keys in one bucket, Θ(n²). |
| C17 † | Minimum worst-case comparisons for 4 and 5 keys? Can a comparison sort run in linear time on half of all inputs? | 5 and 7 ([Wikipedia](https://en.wikipedia.org/wiki/Comparison_sort)). No: 2^h ≥ n!/2 forces h ≥ lg(n!) − 1. |

**D. Amortized analysis and ADTs**

| # | Problem | Answer |
|---|---|---|
| D1 | True or false: (a) O(1) amortized DEQUEUE means no single DEQUEUE costs more than O(1); (b) amortized analysis assumes random sequences; (c) Φ(D₀) = 0 and Φ ≥ 0 imply Σc ≤ Σĉ; (d) Φ(D₀) = 5 and Φ ≥ 0 imply Σc ≤ Σĉ. | (a) F: a transferring DEQUEUE costs 2m + 1. (b) F. (c) T, by telescoping. (d) F in general: you need Φ(D_i) ≥ Φ(D₀). |
| D2 | Operation i costs i if i is a power of 2, and 1 otherwise. Give the amortized cost, the total for n = 16, and a credit scheme. | Under 3 per operation. 31 + 11 = 42 for n = 16. Charge $3 each: cheap operations bank $2, which covers the next power of 2. |
| D3 | Operation k costs n if k is a power of 2, and 1 otherwise. Amortized cost? | Θ(log n). For example, n = 16 costs 91 in total. |
| D4 | Add MULTIPUSH(k) to the MULTIPOP stack. Is it still O(1) amortized? | No. Alternating MULTIPUSH(n) and MULTIPOP(n) costs Θ(n) per operation. |
| D5 | A k-bit counter also supports DECREMENT. How much can n operations cost? | Θ(nk). Alternate from 011…1: with k = 8, 10 operations cost 80. |
| D6 | Two-stack queue: ENQ a, ENQ b, DEQ, ENQ c, ENQ d, DEQ, DEQ, DEQ. Actual and amortized costs? | Actual 1, 1, 5, 1, 1, 1, 5, 1 = 16. Amortized 3, 3, 1, 3, 3, 1, 1, 1 = 16. |
| D7 | A table that triples when full: find Φ and the amortized insert cost, then generalize to growth factor α. | Φ = (3·num − size)/2 gives ĉ = 5/2. In general Φ = (α·num − size)/(α − 1) and ĉ ≤ 1 + α/(α − 1). |
| D8 | A table that grows by 10 slots: total cost of 1,000 inserts? | 50,500, so Θ(n) amortized. |
| D9 | Start from a full table of size 8 and run I, D, D, I, I, D, D, I, I. Total cost when halving below 1/2 versus below 1/4? | 47 versus 17. |
| D10 | With the piecewise Φ from the table above, find the amortized cost of (a) DELETE at 4/16, (b) INSERT at 8/8, (c) DELETE at 10/16, (d) DELETE at 8/16, (e) INSERT at 7/16. | 1, 3, −1, 2 and 0. |
| D11 | A student uses Φ = num − size (initial size 1) to "prove" appends cost 2. What is wrong? | Φ falls to −3, below Φ(D₀) = −1, and 5 appends really cost 12 > 10. Φ = 2n − c gives 3. |
| D12 | A set supports INSERT (cost 1) and DELETE-LARGER-HALF (cost \|S\|). With Φ = 2\|S\|, bound n operations. | INSERT costs 3 amortized and DELETE-LARGER-HALF at most 0, so the total is at most 3n. |
| D13 | Classify each as ADT, data structure or implementation: priority queue, binary heap, IndexMinPQ.java, dictionary, hash table with chaining, stack, resizing array, Fibonacci heap. | ADTs: priority queue, dictionary, stack. Data structures: binary heap, hash table, resizing array, Fibonacci heap. Implementation: IndexMinPQ.java. |
| D14 | Which axiom separates a queue from a stack? | front(enqueue(Q, x)) = front(Q) for a non-empty Q, versus top(push(S, x)) = x. |

**E. Red-black, AVL and B-trees**

| # | Problem | Answer |
|---|---|---|
| E1 † | Insert 41, 38, 31, 12, 19, 8 into an empty tree (CLRS 13.3-2). | Cases: none, none, 3, 1, 2 → 3, 1. Final tree 38B(19R(12B(8R, -), 31B), 41B). |
| E2 † | Then delete 8, 12, 19, 31, 38, 41 (CLRS 13.4-3). | 38B(19R(12B, 31B), 41B); Case 2 stops at the red 19, giving 38B(19B(-, 31R), 41B); 38B(31B, 41B); Case 2 reaches the root, giving 38B(-, 41R); 41B; then the empty tree. |
| E3 | Insert 1, 2, …, 10. | Cases 3′, 1′, 3′, 1′, 3′, then 1′ + 3′, then 3′, then 1′ + 1′. Final tree 4B(2B(1B, 3B), 6B(5B, 8R(7B, 9B(-, 10R)))), with bh = 3 and height 4. |
| E4 | Delete 10 from 20B(10R(5B(1R, -), 15B), 30B(25R, -)). | z is red but its successor 15 is black, so the fixup runs: Case 4′ gives 20B(5R(1B, 15B), 30B(25R, -)). |
| E5 | Delete 5 from 10B(5B, 30R(20B(15R, -), 40B)). | Cases 1 → 3 → 4, with 3 rotations: 30B(15R(10B, 20B), 40B). |
| E6 | Which are valid? (a) 10R(5B, 20B); (b) 10B(5R(3R, -), 20B); (c) 10B(5B(3B, -), 20B); (d) 10B(5R(3B, 7B), 20R(15B, 25B)); (e) 10B(5B, 20R(15B, 25B(-, 30R))); (f) 10B(5B(3R, 7R), 20B(-, 30B)). | (a) No: property 2. (b) No: property 4, plus a black-count mismatch. (c) No: property 5 fails at 5. (d) Yes. (e) Yes, but it is not AVL-balanced. (f) No: property 5 fails at 20. |
| E7 | Give bh of every node of 7B(2R(1B, 5B(4R, -)), 11R(8B, 14B(-, 15R))). | 1:1, 2:2, 4:1, 5:1, 7:2, 8:1, 11:2, 14:1, 15:1. |
| E8 † | Minimum and maximum internal nodes when bh = k. Which bh values are possible for n = 14 and n = 20? | 2^k − 1 and 4^k − 1. n = 14 allows k ∈ {2, 3}; n = 20 allows k ∈ {3, 4}. |
| E9 † | Insert 3, 2, 1, then delete 1. Do you get back the tree you had before inserting 1? (CLRS 13.4-7) | No: 3B(2R, -) before, 2B(-, 3R) after. |
| E10 | AVL-insert 1..10: which rotations happen, and what is the height? | Single left rotations at inserts 3, 5, 6, 7, 9 and 10. Final tree 4(2(1, 3), 8(6(5, 7), 9(-, 10))), height 3, against height 4 for the red-black tree. |
| E11 † | CLRS B-tree with t = 2: insert F S Q K C L H T V W M R N P A B X Y D Z E (CLRS 18.2-1). | Final tree [K Q] / [B F] [M] [T W] / [A] [C D E] [H] [L] [N P] [R S] [V] [X Y Z]. When M arrives, the full root [F Q T] splits first, then [H K L]. |
| E12 | Which case? (a) insertion: p is a red right child and the uncle is red; (b) insertion: p = 30 is a red right child of 10, the uncle is NIL, z = 20 is a left child; (c) deletion: x is a right child, w is black, w.left is black, w.right is red; (d) deletion: x is a left child, w is black with black children, and x.p is red. | (a) Case 1′. (b) Case 2′ with RIGHT-ROTATE(30), then Case 3′ with LEFT-ROTATE(10). (c) Case 3′ (the near nephew is red), then Case 4′. (d) Case 2, then stop by coloring x.p black. |

## A five-day plan, free resources and scripts that check every trace

| Day | Focus | Outside drill | Self-check |
|---|---|---|---|
| Mon 19 Oct (evening) | Convention audit; asymptotic notation | Compare the professor's sample solutions with the disagreement table; [MIT 6.006 R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf) exercises | A1–A10 |
| Tue 20 Oct | Loops, recurrences, Master theorem | All 22 [UWO problems](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf), timed at about 2 minutes each; [MIT R03](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/1869dbf640ded6b31f1bd369d2001ef5_MIT6_006S20_r03.pdf); [Erickson's recurrence notes](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf) | B1–B13 |
| Wed 21 Oct | The six sorts by hand, in the professor's format | [algs4 §2.1–2.4](https://algs4.cs.princeton.edu/21elementary/); [MIT Quiz 1](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/d2f9999a0d1176c0c1c0f2ef55f52ad5_MIT6_006S20_q1_sol.pdf); replay the arrays on [VisuAlgo](https://visualgo.net/en/sorting) and the [USFCA tools](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html) | C1–C17, plus `check0.py` below |
| Thu 22 Oct | Amortized analysis; ADT specifications | [CMU 15-451 L7](https://www.cs.cmu.edu/~15451-f25/lectures/lecture07.pdf) and [Recitation 4](https://www.cs.cmu.edu/~15451-f25/reci/reci04.pdf); [Erickson L9](https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf); [MIT 6.005 Readings 06](https://web.mit.edu/6.005/www/fa15/classes/06-specifications/) and [12](https://web.mit.edu/6.005/www/fa15/classes/12-abstract-data-types/) | D1–D14; rebuild the doubling and MULTIPOP tables from memory |
| Fri 23 Oct | Red-black insertion and deletion; AVL and B-tree comparison | [MIT 6.046J Lecture 10 video](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/resources/lecture-10-red-black-trees-rotations-insertions-deletions/); the [USFCA Red/Black](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html) and [B-tree](https://www.cs.usfca.edu/~galles/visualization/BTree.html) tools | E1–E12, plus `04_rb_verify.py` on your own keys |
| Sat 24 Oct until the exam | A timed mixed mock (15 problems in 90 minutes), an error log and a one-page summary | the [MIT 6.006 exams page](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/exams/) for timed quizzes | rerun the scripts on fresh random arrays |

If the midterm falls on 24 October itself, merge Thursday's and Friday's sessions and move the mock to Friday evening.

### Free resources

**MIT OpenCourseWare** is the backbone, under a Creative Commons BY-NC-SA license. 6.006 (Spring 2020; Demaine, Ku, Solomon) supplies recitations R01 and R03 with solved exercises, Lecture 5 on linear-time sorting and the lower bound, Lecture 8 on 0-based heaps, and an exams page with every quiz and its solutions ([MIT OCW 6.006](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)). 6.046J (Spring 2015) adds the amortization lecture, a union-find recitation, and problem sets and exams with solutions ([MIT OCW 6.046J](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/)). The Fall 2005 6.046J red-black lecture is the closest free match to CLRS notation, since Leiserson co-wrote CLRS, though it leaves deletion to "see textbook" ([MIT 6.046J L10 slides](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/5bf91e541801a5a9f0f50722fbb178a8_lec10.pdf)). AVL trees are covered in 6.006 Fall 2011, Lecture 6 ([MIT 6.006 F11 L6](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/83cdd705cd418d10d9769b741e34a2b8_MIT6_006F11_lec06.pdf)).

Among free textbooks, Jeff Erickson's *Algorithms* (CC BY 4.0) covers mergesort, quicksort and recursion trees in chapter 1. Its separate notes on recurrences, amortization (16 exercises, without solutions) and union-find match this midterm closely ([Erickson's book page](https://jeffe.cs.illinois.edu/teaching/algorithms/)). Dasgupta–Papadimitriou–Vazirani's chapter 2 proves the simplified Master theorem from the geometric series ([DPV ch. 2](https://people.eecs.berkeley.edu/~vazirani/algorithms/chap2.pdf)). Princeton's algs4 booksite gives exact comparison counts and a cost cheat sheet, but its red-black material is the left-leaning variant ([algs4 cheatsheet](https://algs4.cs.princeton.edu/cheatsheet/)). CLRS itself should be bought or borrowed, not pirated ([MIT Press](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)).

For drill with answers, start with the UWO Master-theorem handout, whose 22 problems each come with the case and answer ([UWO](https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf)). Next come the unofficial walkccc CLRS solutions for Problem 3-3 and sections 4.3–4.5 ([walkccc 4.5](https://walkccc.me/CLRS/Chap04/4.5/)), and the Rutgers solutions for chapters 13 and 18, which are useful for tree shapes even though their drawings omit colors and contain the errors listed above ([Bodnar & Lohr ch. 13](https://sites.math.rutgers.edu/~ajl213/CLRS/Ch13.pdf)). CMU 15-451's Recitation 4 adds an amortized-analysis problem set, though its solutions link may require a CMU login ([CMU schedule](https://www.cs.cmu.edu/~15451-f25/schedule.html)), and Stanford CS166's Lecture 9 gives visual potential-function proofs ([CS166 L9](https://web.stanford.edu/class/archive/cs/cs166/cs166.1266/lectures/09/)).

Two visualizers let you replay traces. VisuAlgo offers custom input and an auto-graded quiz mode for the sorts ([VisuAlgo](https://visualgo.net/en/sorting)). The USFCA pages animate comparison sorts, heap sort, counting, radix and bucket sort, red-black trees and B-trees ([USFCA index](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)). The USFCA red-black tool matches CLRS for insertion but deletes using the predecessor. Its B-tree tool imitates a CLRS tree with t = 2 when the maximum degree is set to 4 and "Preemtive Split / Merge" is ticked ([USFCA BTree.js](https://www.cs.usfca.edu/~galles/visualization/AlgorithmLibrary/BTree.js)). Which pivot rule the visualizers animate was not verified, so compare their partitions with yours with care.

### Verification scripts

All the scripts in the table were re-run successfully for this report under Python 3.9. The sorting scripts import `clrs.py` and must be run from inside their own folder. The asymptotics checks need `pip install sympy mpmath`.

| Script | What it checks | Runtime |
|---|---|---|
| [worked_traces.py](<../research_notes/Algorithms midterm research/scripts (sorting traces)/worked_traces.py>) | every main sorting trace in 1-based CLRS form: insertion, Lomuto, Hoare, merge, heap, counting, radix and bucket | under 1 s |
| [practice.py](<../research_notes/Algorithms midterm research/scripts (sorting traces)/practice.py>) | the notes' 20 sorting practice answers | under 1 s |
| [verify_counts.py](<../research_notes/Algorithms midterm research/scripts (sorting traces)/verify_counts.py>) | brute-force counts over every permutation, heap-build bounds and the bucket Monte Carlo | about 3 s |
| [final_checks.py](<../research_notes/Algorithms midterm research/scripts (sorting traces)/final_checks.py>) | sentinel merge counts, merge minimum and maximum, heap height sums | under 1 s |
| [alg_r01_v12_core_checks.py](<../research_notes/Algorithms midterm research/scripts (asymptotics checks)/alg_r01_v12_core_checks.py>) | 58 checks on cases, constants, loop counts, closed forms, Master-theorem ratios and Akra–Bazzi exponents; prints ALL PASS | about 2 s |
| [alg_r01_v3_rank_decr.py](<../research_notes/Algorithms midterm research/scripts (asymptotics checks)/alg_r01_v3_rank_decr.py>) | ranking chains, decreasing recurrences and identities | under 1 s |
| [04_rb_verify.py](<../research_notes/Algorithms midterm research/scripts (red-black tree traces)/04_rb_verify.py>) | a CLRS red-black port that checks all five properties after every operation, plus AVL, B-tree and LLRB versions and a 30,000-operation stress test; edit `MY_INSERTS` and `MY_DELETES` at the bottom to trace your own keys | about 40 s |

The ranking script prints two FAIL lines, and both are artifacts of its numeric heuristic, not errors in the answers. The "10^100 ≪ lg(n⁵)" check fails because lg(n⁵) exceeds 10^100 only beyond n ≈ 2^(2·10^99), far outside the tested range. The "2^(n+1) = Θ(2ⁿ)" check fails because 60-digit arithmetic cannot see the "+1" next to e^(10⁷), so an exact ratio of 2 registers as "same" rather than "Θ". Both answers are textbook facts ([MIT R01](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/c6d8f06c6f11e3342633dec85498f551_MIT6_006S20_r01.pdf)). For amortized analysis, the notes embed a standard-library `verify_tables.py` at the end of their amortized-analysis chapter. Re-run for this report, it reproduced every table total and the bounds INSERT ≤ 3 and DELETE ≤ 2.

The notes' sorting scripts are 1-based, while the professor's tables are 0-based. The short checker below prints states in the professor's format. It was tested for this report and reproduces every 0-based trace above. Paste any array into the last five lines to check a handwritten answer.

```python
# check0.py - print 0-based hand-trace states (Python 3, standard library only)
def insertion(A):
    A = list(A)
    for j in range(1, len(A)):
        key, i, cmp, sh = A[j], j - 1, 0, 0
        while i >= 0:
            cmp += 1
            if A[i] <= key:
                break
            A[i + 1] = A[i]; i -= 1; sh += 1
        A[i + 1] = key
        print(f"pass j={j}: {cmp} cmp, {sh} shift -> {A}")

def partition(A, p, r):                      # Lomuto, pivot = A[r]
    x, i = A[r], p - 1
    for j in range(p, r):
        if A[j] <= x:
            i += 1; A[i], A[j] = A[j], A[i]
    A[i + 1], A[r] = A[r], A[i + 1]
    print(f"PARTITION(A,{p},{r}) pivot {x} -> q={i + 1}: {A}")
    return i + 1

def quicksort(A, p, r):
    if p < r:
        q = partition(A, p, r); quicksort(A, p, q - 1); quicksort(A, q + 1, r)

def heapify(A, i, n):                        # children 2i+1, 2i+2
    while True:
        l, r, big = 2 * i + 1, 2 * i + 2, i
        if l < n and A[l] > A[big]: big = l
        if r < n and A[r] > A[big]: big = r
        if big == i: return
        A[i], A[big] = A[big], A[i]; i = big

def heapsort(A):
    A, n = list(A), len(A)
    for i in range(n // 2 - 1, -1, -1):      # build: i = n/2 - 1 down to 0
        heapify(A, i, n); print(f"after heapify({i}): {A}")
    for end in range(n - 1, 0, -1):
        A[0], A[end] = A[end], A[0]; heapify(A, 0, end)
        print(f"extract to A[{end}]: heap {A[:end]} | sorted {A[end:]}")

def radix(A, d):                             # LSD, stable bucket pass per digit
    for k in range(d):
        A = [x for b in range(10) for x in A if (x // 10 ** k) % 10 == b]
        print(f"after digit {k + 1}: {A}")

def bucket(A):
    B = [[] for _ in A]
    for x in A: B[int(len(A) * x)].append(x)
    print([sorted(b) for b in B], "->", [x for b in B for x in sorted(b)])

insertion([5, 2, 4, 6, 1, 3])
A = [2, 8, 7, 1, 3, 5, 6, 4]; quicksort(A, 0, len(A) - 1)
heapsort([4, 1, 3, 2, 16, 9, 10, 14, 8, 7])
radix([329, 457, 657, 839, 436, 720, 355], 3)
bucket([.78, .17, .39, .26, .72, .94, .21, .12, .23, .68])
```

## Conclusion

The research changes what "studying for this midterm" should mean. The first-half concepts are few and stable across textbooks, but answer formats are not: twenty-one documented disagreements can turn a correct-looking trace or bound into a wrong one under the grader's conventions. The highest-return hour of preparation is therefore a convention audit against the professor's own assignment solutions. The cheapest insurance on the exam paper is a five-word parenthesis stating the convention, such as "0-based: children 2i+1, 2i+2" or "CLRS: bh excludes node, counts NIL". The verification scripts turn the remaining risk, arithmetic slips in long traces, into something the student can catch before the exam rather than discover after it.

The seven topics are also less separate than the syllabus makes them look. Three sums do most of the explaining: the geometric series, the harmonic series and Σh/2^h = 2 account for why halving loops are Θ(n), why build-heap is linear, why quicksort averages 1.39 n lg n and why table doubling costs 3 per insert. The Master theorem classifies merge sort and MAX-HEAPIFY as case 2, while quicksort's worst case falls outside it. The potential argument that bounds dynamic tables is the same one MIT uses to show that 2-3 tree insertions cost one amortized split ([MIT 6.046J L5](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/13e2c7d165259712327af0af312a068e_MIT6_046JS15_lec05.pdf)). That B-tree splitting picture is the one behind red-black insertion Case 1, and it is the same pay-ahead pattern seen in the red-black figures Wikipedia reports: O(1) color changes on average against O(lg n) in the worst case ([Wikipedia: Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)). A student who can explain these links can answer cross-topic questions, such as "why is build-heap linear?" or "why does red-black insertion need at most two rotations?", from first principles, and that is what separates the top band on a handwritten exam.
