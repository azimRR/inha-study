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
