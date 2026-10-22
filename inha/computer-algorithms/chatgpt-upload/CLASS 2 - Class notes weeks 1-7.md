# CLASS material - notes by week



---

<!-- FILE: Week 1 - Fundamentals of algorithms + ADT - class notes.md -->

# Week 1 — Fundamentals of computer algorithms & ADT specification (CLASS NOTES — from slides only)
> Sources: 01-Fundamentals.pptx [D01-S#], 02-ADT.pptx [D02-S#].

> **Course:** SOC3030-003 Computer Algorithms · Prof. Seth Ashish · Inha University in Tashkent · Fall 2026. **Midterm:** 25%, week 8 (24–30 Oct 2026), covers weeks 1–7.
> **Track A only.** Everything below comes from the two decks: slide text, slide images, the equation objects and the speaker notes stored inside the .pptx files. Where the slides stop, a 🔎 line points to Track B.

**Legend:**
- ⭐ = professor emphasis (bold, coloured or boxed text, star icons, questions to the class)
- ⚠️ = apparent typo or error on the slide
- 🔎 = look this up in Track B
- 🙈 = slide is marked **hidden** in the original .pptx. It may have been skipped in the slideshow, but it is in your file, so study it.
- 📝 = speaker notes stored in the .pptx (not visible on the slide image)
- ✅ = checked with a small script

**Symbol recovery:** in the rendered images and PDF, many math symbols appear as empty boxes or stray letters such as "é…ù" or "ëxû". This happens because the slides use the old *Symbol* font. I recovered the real characters from the .pptx files: ∈ (is a member of), ∅ (empty set), ⊆ (subset), ⊇ (superset), ∩, ∪, ≤, α, Σ (sum), ≈ (approximately), ⌈ ⌉ (ceiling), ⌊ ⌋ (floor) and the stacked "n over k" binomial symbol. Formulas below use these real symbols.

---

## 1. Big picture

- A **computer algorithm** is "a detailed step-by-step method for solving a problem by using a computer". It must have five properties: Finiteness, Unambiguous, Definiteness of sequence, Input/Output defined, Feasibility [D01-S2].
- Class problem-solving template: **Problem → Strategy → Algorithm (Input, Output, Step) → Analysis (Time & Space, Optimality, Correctness) → Implementation → Verification** [D01-S4]. The running example is sequential search in an unordered array [D01-S5–S8].
- **Analysis = counting work.** Choose a *basic operation*, count how many times it runs as a function of the input size n, and take the worst case: **W(n) = max{t(I) | I ∈ Dn}** [D01-S17, S18]. Sequential search has W(n) = n [D01-S8].
- **Correctness can be proved.** If the preconditions hold, the postconditions are true when the algorithm terminates [D01-S10]. For loops we use a **loop invariant** (Initialization, Maintenance, Termination), worked for *find-max* and *linear search* [D01-S12–S16].
- **Space** has a *fixed part* (independent of problem size) and a *variable part* (dependent on it). "Generally we do Time and Space Tradeoff" [D01-S19].
- **Math toolkit for analysis:** sets, subsets, ∩ and ∪, cardinality (2^n subsets, C(n,k)), inequality rules, floor and ceiling, logarithm rules, and series formulas [D01-S20–S25].
- **Optimality** means *best possible*, not *best known*. Compare an algorithm's worst case W_A(n) with a proven lower bound W_[A](n) [D01-S26–S27]. Binary search is optimal with W(n) = ⌈lg(n+1)⌉ [D01-S9], and findMax has W_A(n) = n − 1 [D01-S28–S29].
- An **ADT** couples data (properties) with operations (behaviours). It is the *logical form*; a **data structure** is its *physical implementation*. "Abstraction: hide implementation details." [D02-S2, S3]
- **ADT specification** describes operations by Inputs/Outputs: **calling prototype + preconditions + postconditions** [D02-S6]. Operations are *constructors*, *access functions* or *manipulation procedures* [D02-S7]. Worked example: List ADT with `cons`, `first`, `rest`, `nil` [D02-S8].
- **Catalogue of ADTs:** List, Binary Tree (three size/height facts), Stack (LIFO), Queue (FIFO), Priority Queue, Union-Find (disjoint sets), Dictionary [D02-S4, S8–S15].

---

## 2. Slide-by-slide notes

### Deck 01 — Fundamentals of Computer Algorithms (30 slides)

### [D01-S1] Title — "Computer Algorithms"
- Title slide: **"Computer Algorithms"**, **"Dr. Ashish Seth"**, in an orange box with a small cyan shape under it.
- The extracted text also contains "TECH / Computer Science". This is template text and is not visible on the rendered slide.

### [D01-S2] What is a Computer Algorithm? ⭐
- ⭐ **Definition** (bold on the slide): "A computer algorithm is **a detailed step-by-step method for** / **solving a problem** / **by using a computer.**"
- ⭐ **Properties** (five, shown as arrow bullets):
  1. Finiteness
  2. Unambiguous
  3. Definiteness of sequence
  4. Input /Output defined
  5. Feasibility
- The slide gives only the names, not what each property means.
- 🔎 Look up in Track B: a one-line meaning for each of the five properties.

### [D01-S3] Design Techniques – Problem Solving Strategies ⭐
- ⭐ The words "Design Techniques" in the title are coloured blue.
- The seven techniques listed:
  1. Divide & Conquer
  2. Greedy Method
  3. Branch & Bound
  4. Backtracking
  5. Dynamic Programming
  6. Brute Force
  7. Randomized
- Only the names are given here.
- 🔎 Look up in Track B: what each technique is, with one example each.

### [D01-S4] Problem Solving Using Computers
- This is a **template of headings**; each ends with a colon and is filled in on later slides.
  - **Problem:**
  - **Strategy:**
  - **Algorithm:**
    - Input:
    - Output:
    - Step:
  - **Analysis:**
    - Time & Space:
    - Optimality:
    - Correctness:
  - **Implementation:**
  - **Verification:**
- The sub-items (Input/Output/Step and Time & Space/Optimality/Correctness) are in bold.
- How the deck fills the template for the search example:

  | Template field | Slide |
  |---|---|
  | Problem | S5 |
  | Strategy | S5 |
  | Input/Output | S6 |
  | Step | S7 |
  | Time | S8 |
  | Optimality | S9 |
  | Correctness | S10 |
  | Space | S19 |

  Implementation and Verification are listed but never filled in.

### [D01-S5] Example: Search in an unordered array
- ⭐ ***Problem*** (bold, italic and underlined heading):
  - "Let E be an array containing n entries, E[0], …, E[n-1], in no particular order."
  - "Find an index of a specified key K, if K is in the array;"
  - "return –1 as the answer if K is not in the array."
- ⭐ ***Strategy***:
  - "Compare K to each entry in turn until a match is found or the array is exhausted."
  - If K is not in the array, the algorithm returns –1.

### [D01-S6] Example: Sequential Search, Unordered
- ***Algorithm*** (and data structure):
  - **Input:** "E, n, K, where E is an array with n entries (indexed 0, …, n- 1), and K is the item sought."
  - **Output:** "Returns ans, the location of K in E (-1 if K is not found)"

### [D01-S7] Algorithm: Step (Specification)
- The steps, exactly as on the slide (one bullet per line on the slide):
  ```
  int seqSearch(int[] E, int n, int K)
  int ans, index;
  ans = -1;                          // Assume failure.
  for (index = 0; index < n; index++)
     if (K == E[index])
        ans = index;                 // Success!
        break;                       // Done!
  return ans;
  ```
- **How it works:**
  1. `ans` starts at −1 ("Assume failure").
  2. The loop visits index 0, 1, …, n−1.
  3. At the first index where `K == E[index]`, it stores that index and stops.
  4. If no entry matches, −1 is returned.
- ⚠️ **Missing braces.**
  - Problem: as typed, `break;` is not inside the `if`. Compiled literally (C), this is an error: *"'break' statement not in loop or switch statement"* ✅.
  - Intended meaning: the indentation shows both lines belong to the `if`, so it should be `if (K == E[index]) { ans = index; break; }`.
  - Check: with braces it works ✅. For E = [7, 3, 9, 5]: K = 9 → 2, K = 5 → 3, K = 4 → −1.

### [D01-S8] Analysis of the Algorithm ⭐
- "we measure the amount of work done by an algorithm."
- ⭐ **Basic Operation:** "Comparison of x with an array entry"
- ⭐ **Worst-Case Analysis:**
  - "Let W(n) be a function. W(n) is the maximum number of basic operations performed by the algorithm on any input size n."
  - "For our example, clearly W(n) = n."
  - "The worst cases occur when K appears only in the last position in the array OR when K is not in the array at all."
- **Why W(n) = n:** in both worst cases the loop compares K with every one of the n entries. If K is in the last position, the match comes on comparison n. If K is absent, all n comparisons fail and −1 is returned. ✅ Simulated for n = 1…29: the maximum is always n, reached exactly in those two cases.
- ⚠️ The slide says "x", but the key is called **K** on S5–S7. Read "x" as K.

### [D01-S9] More Analysis of the Algorithm ⭐
- ***Optimality:***
  - ⭐ "The Best possible solution?" (a question to the class)
  - "Searching an Ordered Array" — "Using Binary Search"
  - "W(n) = Ceiling[lg(n+1)]", also drawn as an equation object: **= ⌈lg(n+1)⌉**. It renders as "= élg(n+1)ù" because of the font glitch; the real symbols were recovered from the .pptx.
  - ⭐ **"The Binary Search algorithm is optimal."** (bold)
- ✅ Check: a script simulated binary search on ordered arrays for n = 1…2049, counting one comparison of K per array entry examined. The maximum count always equals ⌈log₂(n+1)⌉.
  - So "lg" here behaves as log base 2. The slides never define "lg".
  - Sample values: n = 1 → 1, n = 7 → 3, n = 8 → 4, n = 1000 → 10. Sequential search would need up to 1000.
- 🔎 Look up in Track B:
  - how binary search works and why ⌈lg(n+1)⌉ is a lower bound (the slides only state the result);
  - the convention lg = log₂.

### [D01-S10] *Correctness* can be proved! ⭐
- "***Correctness***: (proving correctness of procedures)"
- An algorithm is a sequence of steps (operations, instructions, statements) for *transforming* inputs (***preconditions***) into outputs (***postconditions***). The two terms are bold and italic.
- ⭐ **Proving** (bold):
  - "if the preconditions are satisfied,"
  - "then the postconditions will be true,"
  - "when the algorithm terminates."
- The same words *precondition* and *postcondition* come back in **ADT specification** [D02-S6, S8].

### [D01-S11] Algorithm Language (Specifying the Steps) ⭐
- "Java/C++ as an algorithm language can be used"
- "steps within an algorithm may be specified in pseduocode (English phrases)"
- "Focus on the strategy and techniques of an algorithm, not on detail implementation"
- ⭐ An orange **star** icon sits in the bottom-right corner.
- ⚠️ "pseduocode" should be "pseudocode".

### [D01-S12] Loop Invariant – Analysing Correctness of Algorithm ⭐
- The slide is made of screenshots. The subtitle "Analysing Correctness of Algorithm" is in light blue.
- **What a loop invariant is** (grey box):
  - "A tool used to prove the correctness of an algorithm, specifically in regards to a loop"
  - "It is a property or set of properties of type boolean and must be aligned with the goal of the algorithm"
  - "Must hold (be true) at initialization, maintenance, and termination"
- ⭐ "To prove correctness with a **loop invariant** we need to show **three** things:" ("loop invariant" and "three" are in blue):
  1. **Initialization** — "Invariant is true prior to the first iteration of the loop."
  2. **Maintenance** — "If the invariant is true before an iteration of the loop, it remains true before the next iteration."
  3. **Termination** — "When the loop terminates, the loop invariant along with the reason that the loop terminated gives us a useful property."
- 📝 **Speaker notes (paraphrased):**
  - A loop invariant is a condition that stays true at specific points of a loop:
    - before the first iteration,
    - at the start of each later iteration,
    - after each iteration,
    - when the loop finally ends.
  - Variables change from one iteration to the next, but this condition keeps holding.
  - Analogy: a magician hides a ball under one of three cups and moves the cups around. The rule "the ball is under one of the cups" is the invariant. It is true before the trick, after every move and at the end.
  - If you can define an invariant and show it holds throughout, you can trust that the loop achieves its purpose. This is why loop invariants are "crucial for proving the correctness of algorithms".

### [D01-S13] Finding Max value in an array
- Code (Python screenshot):
  ```python
  def get_max(a):
    max = a[0]

    for i in range(1,len(a)):
      if a[i] > max:
        max = a[i]

    return max
  ```
- **Loop invariant:** "max is the maximum value in a[0..i-1]"
- **Initialization:**
  - "i=1 and the scope of the array is a[0..i-1]=a[0..1-1]=a[0], max=a[0]"
  - "Thus, invariant holds"
- Notation: a[0..i-1] means entries a[0] through a[i-1], *inclusive*. That is why a[0..1-1] is just a[0].

### [D01-S14] … finding max value in an array
- Same code shown again on the left.
- **Maintenance:**
  - "Assuming loop invariant holds at iteration k, then max is the maximum value in a[0..k-1]"
  - "In the next iteration k+1, the code compares and possibly updates max with a[k]. max is the maximum value in scope a[0..k]"
  - "Thus, invariant holds"
- **Termination:**
  - "i = len(a), max is the maximum value in a[0..len(a)-1]"
  - "Thus, invariant holds"
  - Since a[0..len(a)-1] is the whole array, max is the maximum of the array. This is the "useful property" from S12.
- ⚠️ **Loose indexing in the wording.** The comparison with a[k] happens *during* the iteration where i = k. After it, max = max of a[0..k], which is the invariant for the start of iteration i = k+1. The idea on the slide is right; only the "iteration k / k+1" labels are off by one.
- ℹ️ **Python detail.** The termination step treats i as a counter that reaches len(a), like a C-style `for` loop. In Python the loop variable actually stops at len(a)−1. The conclusion is the same ✅ (checked with assertions on 2,000 random arrays).

### [D01-S15] Linear Search
- Specification (screenshot):
  ```
  Input:
    ▪ A: an array
    ▪ n: the number of elements in A
    ▪ x: the value to be searched for
  Output: Either an index i for which A[i] = x,
          or Not-Found if A does not contain x

  1. For i = 0 to n-1:
       A. If A[i] = x, then return i
  2. Return Not-Found
  ```
- "*output* is correct:" means:
  1. "if index i is returned then A[i] = x"
  2. "if Not-Found is returned then x is not in the array"
- This is the same problem as seqSearch [D01-S5–S7] with different names:

  | Linear search (S15) | seqSearch (S5–S7) |
  |---|---|
  | A | E |
  | x | K |
  | Not-Found | −1 |

### [D01-S16] (untitled) Linear search — the loop-invariant proof ⭐
- The top repeats the two correctness conditions from S15:
  1. "if index i is returned then A[i] = x"
  2. "if Not-Found is returned then x is not in the array"
- **Loop invariant:** "At the start of each iteration of step 1, if x is present in the array A, then it is present in the subarray A[i:n]"
- **Initialization:** "Initially, i=0 so that the subarray in the loop invariant is A[0:n], which is the entire array. Thus, the loop invariant holds initially."
- **Maintenance:**
  - "If at the start of an iteration x is present in the array, then it is present the subarray A[i:n]."
  - ⭐ The professor added an orange note: **"(means now you are at ith index and at this index you have find x)"**
  - "If we do not return, then A[i] ≠ x."
  - "Hence, if x is in the array then is it in the subarray A[i+1:n]."
  - "i is incremented before the next iteration, so the invariant will hold a…". The end of this line is cut off at the edge of the screenshot.
- **Termination:**
  - "If A[i] = x ✔. If i > n-1 consider contrapositive of invariant."
  - ⭐ A **boxed callout** with an arrow points at the word *contrapositive*: **"“if A then B” ≡ “if not B then not A”"**
  - Contrapositive of the invariant: "“if x is not present in the subarray A[i:n], then x is not present in A.”"
- **Reading the notation:** A[i:n] means entries A[i] up to A[n−1]. The slide calls A[0:n] "the entire array", and the indices run from 0 to n−1.
- **The two ways the loop can end:**
  1. *Return inside the loop* (A[i] = x ✔). Then condition 1 holds directly.
  2. *The loop runs out* (i > n−1, so i = n). Then A[n:n] contains no entries, so x is not present in it. By the contrapositive, x is not present in A, so returning Not-Found is correct (condition 2). ✅ The invariant was checked with assertions on 3,000 random arrays.
- ⚠️ Grammar slips on the screenshot and note:
  - "present the subarray" should be "present **in** the subarray";
  - "then is it in" should be "then it is in";
  - "you have find x" should be "you have found x";
  - the final line is truncated.

### [D01-S17] Amount of work done ⭐
- ⭐ What we want from a measure of work (bold):
  - "We want a measure of work that tells us something about the *efficiency* of the method used by the algorithm"
  - "independent of computer, programming language, programmer, and other implementation details."
  - "Usually depending on the *size of the input*"
- "Counting passes through loops"
- "Basic Operation":
  - "Identify a particular operation fundamental to the problem"
  - "the total number of operations performed is roughly proportional to the number of basic operations"
- "Identifying the properties of the inputs that affect the behavior of the algorithm"
- Basic operations chosen in class:

  | Algorithm | Basic operation |
  |---|---|
  | Sequential search [S8] | comparison of K with an array entry |
  | findMax [S29] | comparison of an array entry with another entry or a stored variable |

### [D01-S18] Worst-case complexity ⭐
- "Let D<sub>n</sub> be *the set of inputs of size n* for the problem under consideration, and let I be an element of D<sub>n</sub>."
- "Let t(I) be *the number of basic operations* performed by the algorithm on input I."
- "We define the function W by":
  - **W(n) = max{t(I) | I ∈ D<sub>n</sub>}**
  - The ∈ shows as an empty box in the image; recovered from the .pptx.
  - "called the worst-case complexity of the algorithm."
  - "W(n) is the maximum number of basic operations performed by the algorithm on any input of size n."
- ⭐ ***"The input, I, for which an algorithm behaves worst depends on the particular algorithm."*** (bold, italic and underlined)
- Example: for seqSearch, D<sub>n</sub> is all (array of n entries, key K) inputs, and t(I) is the number of comparisons. The maximum, n, comes from inputs where K is last or absent [S8].
- 🔎 Look up in Track B: *average-case* and *best-case* complexity. Only the worst case is defined in these two decks.

### [D01-S19] Space Usage ⭐
- "worst-case analysis can be done." — "==> If memory cells used by the algorithms depends on the particular input"
- A program normally needs space for instructions, constants, variables and input data. It may also use extra space to manipulate data and store information while computing.
- Two parts:
  1. **Fixed part:** "The size required to store certain data/variables, that is independent of the size of the problem"
     - e.g. name of the data collection
     - same size for classifying 2GB or 1MB of texts
  2. **Variable part:** "Space needed by variables, whose size is dependent on the size of the problem"
     - e.g. actual text
     - load 2GB of text VS. load 1MB of text
- ⭐ **"Generally we do Time and Space Tradeoff."** (large red text, bottom right)
- ⚠️ Slide errors:
  - both parts are numbered "1." (the second should be "2.");
  - "a program require" should be "requires";
  - "the algorithms depends" should be "algorithm depends".
- 🔎 Look up in Track B: an example of a time–space tradeoff. The slide states it without an example.

### [D01-S20] Analysis Tool: Mathematics: Set ⭐
- "A set is a collection of distinct elements. The elements are of the same “type”,"
- "“element e is a member of set S” is denoted as **e ∈ S**"
- A set is defined by listing or describing its elements between curly braces:
  - S<sub>1</sub> = {a, b, c}
  - S<sub>2</sub> = {x | x is an integer power of 2}, read "*the set of* all elements x *such that* x is …"
- "S<sub>3</sub> = {} = **∅**, has not elements, called empty set"
- "A set has no inherent order."
- ⭐ A hollow **star** icon (☆) is in the top-right corner.
- ⚠️ "has not elements" should be "has no elements". There is also a missing space in "elements.The".
- The ∈ and ∅ show as boxes in the image.

### [D01-S21] Subset, Superset; Intersection, Union
- If all elements of one set S<sub>1</sub> are also in another set S<sub>2</sub>:
  - S<sub>1</sub> is a *subset* of S<sub>2</sub>, written **S<sub>1</sub> ⊆ S<sub>2</sub>**
  - S<sub>2</sub> is a *superset* of S<sub>1</sub>, written **S<sub>2</sub> ⊇ S<sub>1</sub>**
- "Empty set is a subset of every set, **∅ ⊆ S**"
- *Intersection:* **S ∩ T = {x | x ∈ S and x ∈ T}**
- *Union:* **S ∪ T = {x | x ∈ S or x ∈ T}**
- Every symbol on this slide shows as an empty box in the image. All were recovered from the .pptx.
- Remember: intersection uses "**and**" (in both sets); union uses "**or**" (in at least one).

### [D01-S22] Cardinality ⭐
- "A set, S, is *finite* if there is an integer n such that the elements of S can be placed in a one-to-one correspondence with {1, 2, 3, …, n}"
- "in this case we write **|S| = n**"
- ⭐ "How many **distinct subsets does a finite set** on n elements have? There are **2<sup>n</sup> subsets**."
- ⭐ "How many **distinct subsets of cardinality** k does a finite set of n elements have? There are **C(n, k) = n!/((n-k)!k!)**, “n choose k”"
- Figure: a small equation object shows the stacked binomial symbol (n over k inside tall parentheses). It overlaps the word "set" and renders garbled as "æ n ö / ç k ÷ / è ø".
- ✅ Both counts checked by listing all subsets for n = 0…10.
  - Example: S<sub>1</sub> = {a, b, c} has 2³ = 8 subsets.
  - It has C(3,2) = 3 subsets of size 2: {a,b}, {a,c}, {b,c}.

### [D01-S23] Analysis Tool: Algebra ⭐
- *Manipulating Inequalities:*
  - **Transitivity:** If ((A ≤ B) and (B ≤ C) Then (A ≤ C)
  - **Addition:** If ((A ≤ B) and (C ≤ D) Then (A+C ≤ B+D)
  - **Positive Scaling:** If ((A ≤ B) and (α > 0) Then (α A ≤ α B)
- *Floor and Ceiling Functions:*
  - "Floor[x] is the largest integer less than or equal to x." The symbol is **⌊x⌋**.
  - "Ceiling[x] is the smallest integer greater than or equal to x." The symbol is **⌈x⌉**.
  - The two symbol images render as "ëxû" and "éxù", and the floor one overlaps the "Ceiling" line.
- ⭐ An orange **star** icon is in the top-right corner.
- ⚠️ Slide errors:
  - The parentheses are unbalanced: "If ((A ≤ B) and (B ≤ C) Then" is missing one ")".
  - The ≤ and α symbols show as empty boxes in the image (recovered from the .pptx).
- Examples from the definitions ✅:

  | x | ⌊x⌋ | ⌈x⌉ |
  |---|---|---|
  | 2.7 | 2 | 3 |
  | −2.7 | −3 | −2 |
  | 3 | 3 | 3 |

### [D01-S24] Logarithms ⭐
- ⭐ All lines are bold, and an orange **star** icon is in the top-right corner.
- The rules, as shown:
  - For b>1 and x>0, **log<sub>b</sub>x = L such that b<sup>L</sup> = x**
  - log<sub>b</sub> is a **strictly increasing** function: if x > y then log<sub>b</sub> x > log<sub>b</sub> y
  - log<sub>b</sub> is a **one-to-one** function: if log<sub>b</sub> x = log<sub>b</sub> y then x = y
  - **log<sub>b</sub> 1 = 0;** **log<sub>b</sub> b = 1;** **log<sub>b</sub> x<sup>a</sup> = a log<sub>b</sub> x**
  - **log<sub>b</sub>(xy) = log<sub>b</sub> x + log<sub>b</sub> y**
  - **x<sup>log y</sup> = y<sup>log x</sup>**
  - change base: **log<sub>c</sub>x = (log<sub>b</sub> x)/(log<sub>b</sub> c)**
- ✅ Every identity checked numerically (2,000 random trials). Examples:
  - lg 8 = 3, because 2³ = 8
  - lg(8·4) = 3 + 2 = 5 = lg 32
  - 8<sup>lg 4</sup> = 8² = 64 = 4<sup>lg 8</sup> = 4³
  - log<sub>4</sub> 64 = lg 64 / lg 4 = 6/2 = 3

### [D01-S25] Series ⭐
- "A *series* is the sum of a sequence."
- ⭐ An orange **star** icon is in the top-right corner.
- The formulas are equation objects. Σ renders as a crossed box and ≈ renders as "≫" because of the font glitch; the real symbols were recovered from the .pptx.

  | Series | Formula on the slide |
  |---|---|
  | **Arithmetic series**: "The sum of consecutive integers" | **Σ[i=1..n] i = n(n+1)/2** |
  | **Polynomial Series**: "The sum of squares" | **Σ[i=1..n] i² = (2n³ + 3n² + n)/6 ≈ n³/3** |
  | Polynomial Series: "The general case is" | **Σ[i=1..n] i<sup>k</sup> ≈ n<sup>k+1</sup>/(k+1)** |
  | **Power of 2** | **Σ[i=0..k] 2<sup>i</sup> = 2<sup>k+1</sup> − 1** |
  | **Arithmetic-Geometric Series** | **Σ[i=1..k] i·2<sup>i</sup> = (k − 1)2<sup>k+1</sup> + 2** |

- ✅ The three exact formulas were checked for n, k up to 200 and 60. The "≈" lines are approximations that get better as n grows:
  - n = 100: Σ i² = 338,350 against n³/3 ≈ 333,333 (ratio 1.015);
  - n = 10,000: the ratio is 1.00015.
- Watch the **lower limits**: the Power-of-2 sum starts at **i = 0**; the others start at **i = 1**.
- ⚠️ Layout only: the "i=0" under the Power-of-2 sum overlaps the "Arithmetic- Geometric Series" label.

### [D01-S26] Optimality "the best possible" ⭐ 🙈
- 🙈 Hidden slide in the .pptx.
- "Each problem has inherent complexity" — "There is some *minimum* amount of work required to solve it."
- "To analyze the complexity of a problem,"
  - "we choose a **class of algorithms** (by specifying the types of operations the algorithm is permitted to perform), and"
  - "**Measure of complexity** (ex, the basic operations to be counted)"
- ⭐ **"An algorithm is optimal if there is no algorithm in the class under study that performs fewer operations (in worst case)"**
- ⭐ **"Optimal doesn't mean best known but it means best possible"**

### [D01-S27] Show whether an algorithm is optimal? ⭐ 🙈
- 🙈 Hidden slide in the .pptx. The title is a question to the class.
- The procedure:
  1. "Analyze the algorithm, call it A, and found the Worst-case complexity W<sub>A</sub>(n), for input of size n."
  2. "Prove a theorem starting that,"
     - "for any algorithm in the same class of A"
     - "for any input of size n, there is some input for which the algorithm must perform at least W<sub>[A]</sub>(n)"
     - "(lower bound in the worst-case)"
  3. "If W<sub>A</sub>(n) == W<sub>[A]</sub>(n)"
     - "then the algorithm A is optimal"
     - "else there may be a better algorithm"
     - "OR there may be a better lower bound."
- The two similar symbols:
  - **W<sub>A</sub>(n)** is the worst case of *this* algorithm A, found by analysis (step 1).
  - **W<sub>[A]</sub>(n)** is the *lower bound*: work that *every* algorithm in A's class must do on some input of size n (step 2).
  - Optimal means the two are equal.
- ⚠️ Slide errors:
  - "found" should be "find";
  - "starting that" should be "stating that";
  - "for any input of size n, there is some input…" reads oddly. It should be "for any input *size* n, there is some input (of that size) for which…".

### [D01-S28] Optimality e.g. 🙈
- 🙈 Hidden slide in the .pptx.
- **Problem:** "Fining the largest entry in an (unsorted) array of n numbers"
- **Algorithm A:**
  ```
  int findMax(int[] E, int n)
  1. int max;
  2. max = E[0];  // Assume the first is max.
  3. for (index = 1; index < n; index++)
  4.     if (max < E[index])
  5.         max = E[index];
  6. return max;
  ```
- This is the same algorithm as `get_max` in Python [D01-S13–S14].
- ⚠️ Slide errors:
  - "Fining" should be "Finding";
  - `index` is used but never declared (minor).

### [D01-S29] Analyze the algorithm, find W<sub>A</sub>(n) 🙈
- 🙈 Hidden slide in the .pptx.
- **Basic Operation:** "Comparison of an array entry with another array entry or a stored variable."
- **Worst-Case Analysis:**
  - "For any input of size n, there are exactly n-1 basic operations"
  - **W<sub>A</sub>(n) = n-1**
- **Why:**
  - Line 3 runs index = 1, 2, …, n−1, which is n−1 iterations.
  - Each iteration does exactly one comparison (line 4), whatever the values are.
  - So *every* input of size n costs n−1, and every input is a worst case.
  - ✅ Checked on every permutation for n = 1…7. Example: findMax([4, 9, 2, 7, 5], 5) returns 9 after 4 comparisons.
- The deck stops here. It gives step 1 of S27 (W<sub>A</sub>(n) = n−1) but **not** step 2, the lower-bound theorem. So the slides do not finish the argument that findMax is optimal.
- 🔎 Look up in Track B: the lower bound for finding the maximum, and whether W<sub>A</sub>(n) = n−1 is optimal.

### [D01-S30] Video lectures (end of deck)
- "Video Lecture of the topic can be found at":
  - **Introduction to Computer Algorithms** — https://youtu.be/GI1NwGPGxNo (hyperlinked on the slide)
  - **Computer Algorithms - Abstract Data Types (ADT)** — https://youtu.be/aHWNxF0c08U
  - **Basics for Analysing Computer Algorithms** — https://youtu.be/n1ArVTvMJtE
- These are the professor's recommended class videos.

---

### Deck 02 — ADT and its specification (16 slides)

> Speaker-notes pages exist for S2, S3, S4 and S9. Only S2 has real notes; the others contain just the slide number.

### [D02-S1] Title — "Data Abstraction & Basic Data Structures"
- Title only: **"Data Abstraction & Basic Data Structures"**.

### [D02-S2] Abstract Data Type (ADT) ⭐
- ⭐ In red: "An **ADT** describes a set of objects sharing the same properties and behaviors"
  - "The properties of an ADT are its data"
  - "The behaviors of an ADT are its operations or functions"
- "Thus, an ADT couples its data and operations"
  - **"OOP emphasizes data abstraction"** (large bold)
- ⭐ Magenta bold, bottom of slide: **"Abstraction: hide implementation details."**
- ⭐ Red: **"A data structure is the physical implementation of an ADT."**
- In short:
  - properties = **data**
  - behaviours = **operations or functions**
  - ADT = data + operations, coupled together
- 📝 **Speaker notes (paraphrased):**
  - *Abstraction* is the method of hiding unwanted information.
  - *Encapsulation* hides data inside a single entity or unit, together with a way of protecting that information from outside.
  - Encapsulation can be implemented with the access modifiers private, protected and public.

### [D02-S3] Logical vs. Physical Form ⭐
- Title (red): "Logical vs. Physical Form".
- "Data items have both a logical and a physical form." This line overlaps the title rule (layout only).
- ⭐ **Logical form:** (blue bold) "definition of the data item within an ADT."
  - **Abstract Data Type (ADT):** "This is a logical, conceptual model. It defines **what** data is handled and **what** operations can be performed (such as push, pop, or insert), but it hides *how* those operations are achieved."
- ⭐ **Physical form:** (blue bold) "implementation of the data item within a data structure."
  - **Data Structure:** "This is the physical, programmatic realization in memory. It defines **how** the data is stored and manipulated using arrays, pointers, or linked nodes"
- **Figure** (bottom right): an outer box titled "Data Type" with two rows.
  - Top row: "ADT: • Type • Operations", next to "Data Items: Logical Form".
  - An arrow points down to the bottom row: "Data Structure: – Storage Space – Subroutines", next to "Data Items: Physical Form".
  - Meaning: the ADT (logical form) is realised by a data structure (physical form).
- Memory hook from the slide's bold words: **ADT = what, data structure = how.**

  | | ADT | Data structure |
  |---|---|---|
  | Form | logical (conceptual) | physical (in memory) |
  | Defines | *what* data and *what* operations | *how* data is stored and manipulated |
  | Parts (figure) | Type, Operations | Storage Space, Subroutines |
  | Examples on the slide | push, pop, insert | arrays, pointers, linked nodes |

### [D02-S4] Data Abstraction and Basic Data Structures
- "Improving efficiency by building better" → **Data Structure**
- "Object IN" →
  - **Abstract Data Type**, with sub-points Specification and Design
  - **Architecture [Structure, Function]**
- "Abstract Data Types" →
  - **Lists, Trees**
  - **Stacks, Queues**
  - **Priority Queue, Union-Find**
  - **Dictionary**
- Figure: a yellow box labelled **"ADT"** on a cyan diamond (decoration).
- The "Specification" and "Design" bullets render as crossed boxes (bullet-font glitch).
- ⚠️ "Object IN" is unclear as written (it may be truncated). The slide gives nothing more.
- **Roadmap** — this list is the plan for the rest of the deck:
  - Specification → S6
  - Design → S8
  - Lists → S8
  - Trees → S9
  - Stacks → S10
  - Queues → S11
  - Priority Queue → S12
  - Union-Find → S13–S14
  - Dictionary → S15
- The extracted text also contains "TECH / Computer Science" (template text, not visible).

### [D02-S5] Abstract Data type 🙈
- 🙈 Hidden slide in the .pptx.
- Notation (all three use ∈, which shows as an empty box in the image):
  - "i is an instance of type T, **i ∈ T**"
  - "e is an element of set S, **e ∈ S**"
  - "o is an object of class C, **o ∈ C**"
- "Abstract Data Type":
  - "***Structures***: data structure declarations"
  - "***Functions***: operation definitions"
- "An ADT is identified as a Class" — "in languages such as C++ and Java"
- Links to other slides:
  - Structures and Functions are the "data" and "operations" of S2.
  - ∈ is set membership from [D01-S20].

### [D02-S6] ADT Specification ⭐
- "The specification of an ADT describe how the operations (functions, procedures, or methods) behave" — "**in terms of Inputs and Outputs**"
- ⭐ "A specification of an operation consists of:"
  1. **Calling prototype**
  2. **Preconditions**
  3. **Postconditions**
- ⭐ "The calling prototype includes"
  - **name of the operation**
  - **parameters and their types**
  - **return value and its types**
- ⭐ "The preconditions are statements" — "**assumed to be true when the operation is called.**"
- ⭐ "The postconditions are statements" — "**assumed to be true when the operation returns.**"
- ⚠️ "describe" should be "describes".
- **The class format** for a spec, as laid out on S8:
  ```
  <return type> <operation name>(<type> <parameter>, ...)    // calling prototype
     Precondition(s):  statements assumed true when the operation is called
     Postcondition(s): statements assumed true when the operation returns
  ```
- Same idea as [D01-S10]: if the preconditions hold, the postconditions are true at the end.

### [D02-S7] Operations for ADT
- ***Constructors*** — "create a new object and return a reference to it"
- ***Access functions*** — "return information about an object, but do not modify it"
- ***Manipulation procedures*** — "modify an object, but do not return information"
- **State** of an object — "current values of its data"
- Recursive ADT — "if any of its access functions returns the same class as the ADT"

  | Kind | Creates a new object? | Returns information? | Modifies the object? |
  |---|---|---|---|
  | Constructor | **yes** | a reference to the new object | — (not stated) |
  | Access function | no | **yes** | **no** |
  | Manipulation procedure | no | **no** | **yes** |

### [D02-S8] ADT Design e.g. Lists ⭐
- ⭐ "**Every computable function can be computed using *Lists* as the only data structure!**" (bold, with an exclamation mark)
- The specification, exactly as on the slide:
  ```
  IntList cons(int newElement, IntList oldList)
     Precondition: None.
     Postconditions: If x = cons(newElement, oldList) then
        1. x refers to a newly created object;
        2. x != nil;
        3. first(x) = newElement;
        4. rest(x) = oldList
  int first(IntList aList)      // access function
     Precondition: aList != nil
  IntList rest(IntList aList)   // access function
     Precondition: aList != nil
  IntList nil   //constant denoting the empty list.
  ```
- Reading it with S6 and S7:
  - **Calling prototype of `cons`:** name `cons`; parameters `int newElement` and `IntList oldList`; return type `IntList`.
  - **`cons` is a constructor.** Postcondition 1, "x refers to a newly created object", matches S7's "create a new object and return a reference to it".
  - **`first` and `rest` are access functions** (labelled so on the slide). They only read the list. Their precondition `aList != nil` means you may not ask for the first element or the rest of the *empty* list.
  - **`nil`** is a constant for the empty list.
  - **IntList is a recursive ADT.** The access function `rest` returns an `IntList`, the same class as the ADT (S7's definition).
- The slide gives postconditions only for `cons`. For `first` and `rest` it gives only preconditions; what they return follows from postconditions 3 and 4 of `cons`.
- Worked trace in §5.10 ✅.

### [D02-S9] Binary Tree
- "A binary tree T is a set of elements, called nodes, that is empty or satisfies:"
  1. "There is a distinguished node r called the root"
  2. "The remaining nodes are divided into two disjoint subsets, L and R, each of which is a binary tree." "L is called the left subtree of T and R is called the right subtree of T."
- The definition is **recursive**: L and R are binary trees themselves, and either may be empty.
- Three facts:
  - "There are at most **2<sup>d</sup>** nodes at depth d of a binary tree."
  - "A binary tree with n nodes has height at least **Ceiling[lg(n+1)] – 1**", i.e. **⌈lg(n+1)⌉ − 1**.
  - "A binary tree with height h has at most **2<sup>h+1</sup> – 1** nodes"
- **Depth and height conventions** are not defined on the slide. The formulas themselves imply them:
  - The root is at depth 0, since depth 0 allows at most 2⁰ = 1 node.
  - A one-node tree has height 0, since height 0 allows at most 2¹ − 1 = 1 node.
- **How facts 2 and 3 connect,** using only slide material: a tree of height h holds at most 2<sup>h+1</sup> − 1 nodes. So n nodes need 2<sup>h+1</sup> − 1 ≥ n, i.e. h ≥ lg(n+1) − 1. Height is a whole number, so h ≥ ⌈lg(n+1)⌉ − 1 (ceiling [D01-S23]; logs [D01-S24]).
- ✅ All three facts checked by listing every binary-tree shape with up to 11 nodes. Examples:
  - n = 7 → height ≥ ⌈lg 8⌉ − 1 = 2
  - n = 20 → height ≥ ⌈lg 21⌉ − 1 = 4
  - h = 4 → at most 31 nodes
  - depth 3 → at most 8 nodes
- 🔎 Look up in Track B: formal definitions of node *depth* and tree *height*.

### [D02-S10] Stacks
- "A stack is a linear structure in which insertions and deletions are always make at one end, called the **top**."
- "This updating policy is call **last in, first out (LIFO)**"
- ⚠️ "are always make" should be "made"; "is call" should be "is called".
- Example from the definition: insert 10, 20, 30. Deletions then remove 30, then 20, then 10.

### [D02-S11] Queue
- "A queue is a linear structure in which"
  - "all insertions are done at one end, called the **rear or back**, and"
  - "all deletions are done at the other end, called the **front**."
- "This updating policy is called **first in, first out (FIFO)**"
- Example: insert 10, 20, 30 at the rear. Deletions from the front give 10, then 20, then 30.

  | | Stack [S10] | Queue [S11] |
  |---|---|---|
  | Insert at | top | rear (back) |
  | Delete at | top (the *same* end) | front (the *other* end) |
  | Policy | LIFO | FIFO |

### [D02-S12] Priority Queue
- "A priority queue is a structure with some aspects of FIFO queue but"
  - "in which element order is related to each element’s priority,"
  - "rather than its chronological arrival time."
- "As each element is inserted into a priority queue, conceptually it is inserted *in order of* its priority"
- "The one element that can be inspected and removed is the most *important element* currently in the priority queue."
  - "a cost viewpoint: the smallest priority"
  - "a profit viewpoint: the largest priority"
- Example: insert items with priorities 5, 2, 8 in that arrival order.
  - Cost viewpoint: 2 is removed first.
  - Profit viewpoint: 8 is removed first.
  - Arrival order does not matter.

### [D02-S13] Union-Find ADT for Disjoint Sets
- "Through a *Union* operation, two (disjoint) sets can be combined."
  - "(to insure the disjoint property of all existing sets, the original two sets are removed and the new set is added)"
  - "Let the set id of the original two set be, s and t, s != t"
  - "Then, new set has one unique set id that is either s or t."
- "Through a *Find* operation, the current *set id* of an element can be retrieved."
- "Often elements are integers and" — "the set id is some particular element in the set, called the **leader**,"
- Why the two old sets are removed and the new one added: so that every element stays in exactly one set (the disjoint property).
- ⚠️ Slide errors:
  - "insure" should be "ensure";
  - "two set be" should be "two sets be";
  - the last bullet ends with a comma, so the sentence is unfinished.

### [D02-S14] Union-Find ADT e.g.
- As shown on the slide:
  ```
  UnionFind create(int n)
     // create a set (called sets) of  n singleton disjoint sets {{1},{2},{3},…,{n}}
  int find(UnionFind sets, e)
     // return the set id for e
  void makeSet(unionFind sets, int e)
     //union one singleton set {e} (e not already in the sets)
       into the exiting sets
  void union(UnionFind sets, int s, int t)
     // s and t are set ids, s != t
     // a new set is created by union of set [s] and set [t]
     // the new set id is either s or t, in some case min(s, t)
  ```
- **Classified using S7's definitions** (the slide itself does not label them):
  - `create` is a constructor: it builds a new collection.
  - `find` returns information (a set id) without modifying, so it is an access function.
  - `makeSet` and `union` change `sets` and return `void`, so they are manipulation procedures.
- **Read as a specification** (S6), the comments act as preconditions and postconditions:
  - union's precondition: s and t are set ids, s != t
  - makeSet's precondition: e not already in the sets
- ⚠️ Slide errors:
  - `find(UnionFind sets, e)` gives no type for `e` (should be `int e`);
  - `makeSet(unionFind …)` has a lowercase "u" (inconsistent type name);
  - "exiting sets" should be "existing sets";
  - "in some case" should be "in some cases".
- Worked trace in §5.11 ✅.

### [D02-S15] Dictionary ADT
- "A dictionary is a general associative storage structure."
- "Items in a dictionary"
  - "have an identifier, and"
  - "associated information that needs to be stored and retrieved."
  - "no order implied for identifiers in a dictionary ADT"
- Like a set [D01-S20], a dictionary has no built-in order for its identifiers.

### [D02-S16] Video lectures (end of deck)
- "Video Lecture of the topic can be found at":
  - **Computer Algorithms - Abstract Data Types (ADT)** — https://youtu.be/aHWNxF0c08U
  - **Basics for Analysing Computer Algorithms** — https://youtu.be/n1ArVTvMJtE
- These are the same two links as on [D01-S30].

---

## 3. Definitions & key terms

*Quoted where the slide gives a definition; otherwise a close paraphrase.*

### 3a. Deck 01 — algorithms and analysis

| Term | Definition as taught | Ref |
|---|---|---|
| Computer algorithm | "a detailed step-by-step method for solving a problem by using a computer" | D01-S2 |
| Algorithm (correctness view) | "sequences of steps (operations, instructions, statements) for transforming inputs (preconditions) to outputs (postconditions)" | D01-S10 |
| Proving correctness | "if the preconditions are satisfied, then the postconditions will be true, when the algorithm terminates" | D01-S10 |
| Basic operation | "a particular operation fundamental to the problem". The total number of operations is "roughly proportional to the number of basic operations" | D01-S17 |
| D<sub>n</sub> | "the set of inputs of size n for the problem under consideration" | D01-S18 |
| t(I) | "the number of basic operations performed by the algorithm on input I" | D01-S18 |
| Worst-case complexity W(n) | **W(n) = max{t(I) \| I ∈ D<sub>n</sub>}**: "the maximum number of basic operations performed by the algorithm on any input of size n" | D01-S8, S18 |
| Loop invariant | "A tool used to prove the correctness of an algorithm, specifically in regards to a loop". It is "a property or set of properties of type boolean", aligned with the goal of the algorithm, and must hold at initialization, maintenance and termination | D01-S12 |
| Initialization | "Invariant is true prior to the first iteration of the loop." | D01-S12 |
| Maintenance | "If the invariant is true before an iteration of the loop, it remains true before the next iteration." | D01-S12 |
| Termination | "When the loop terminates, the loop invariant along with the reason that the loop terminated gives us a useful property." | D01-S12 |
| Contrapositive | "“if A then B” ≡ “if not B then not A”" | D01-S16 |
| Fixed part (space) | "The size required to store certain data/variables, that is independent of the size of the problem" | D01-S19 |
| Variable part (space) | "Space needed by variables, whose size is dependent on the size of the problem" | D01-S19 |
| Set | "a collection of distinct elements. The elements are of the same “type”". A set has no inherent order | D01-S20 |
| e ∈ S | "element e is a member of set S" | D01-S20 |
| Empty set | S<sub>3</sub> = {} = ∅, a set with no elements. It is a subset of every set: ∅ ⊆ S | D01-S20, S21 |
| Subset / superset | If all elements of S<sub>1</sub> are also in S<sub>2</sub>, then S<sub>1</sub> ⊆ S<sub>2</sub> (subset) and S<sub>2</sub> ⊇ S<sub>1</sub> (superset) | D01-S21 |
| Intersection | S ∩ T = {x \| x ∈ S **and** x ∈ T} | D01-S21 |
| Union (of sets) | S ∪ T = {x \| x ∈ S **or** x ∈ T} | D01-S21 |
| Finite set, cardinality | S is *finite* if its elements can be put in one-to-one correspondence with {1, 2, 3, …, n}; then \|S\| = n | D01-S22 |
| Number of subsets | 2<sup>n</sup> distinct subsets for a set of n elements | D01-S22 |
| C(n, k) | n!/((n−k)!k!), "n choose k": the number of distinct subsets of cardinality k | D01-S22 |
| Floor ⌊x⌋ | "the largest integer less than or equal to x" | D01-S23 |
| Ceiling ⌈x⌉ | "the smallest integer greater than or equal to x" | D01-S23 |
| Logarithm | For b>1 and x>0, log<sub>b</sub>x = L such that b<sup>L</sup> = x | D01-S24 |
| Series | "the sum of a sequence" | D01-S25 |
| Inherent complexity | Every problem has "some minimum amount of work required to solve it" | D01-S26 🙈 |
| Optimal algorithm | "An algorithm is optimal if there is no algorithm in the class under study that performs fewer operations (in worst case)". "Optimal doesn't mean best known but it means best possible" | D01-S26 🙈 |
| W<sub>A</sub>(n) vs W<sub>[A]</sub>(n) | W<sub>A</sub>(n) is the worst case of algorithm A, found by analysis. W<sub>[A]</sub>(n) is the "lower bound in the worst-case": every algorithm in A's class must do at least this much on some input of size n | D01-S27 🙈 |

### 3b. Deck 02 — ADTs and basic data structures

| Term | Definition as taught | Ref |
|---|---|---|
| Abstract Data Type (ADT) | "An ADT describes a set of objects sharing the same properties and behaviors". "The properties of an ADT are its data". "The behaviors of an ADT are its operations or functions". "an ADT couples its data and operations" | D02-S2 |
| ADT (logical model) | "a logical, conceptual model. It defines what data is handled and what operations can be performed (such as push, pop, or insert), but it hides how those operations are achieved" | D02-S3 |
| ADT parts | "Structures: data structure declarations"; "Functions: operation definitions". An ADT is identified as a Class in C++ and Java | D02-S5 🙈 |
| Abstraction | "hide implementation details." Speaker notes: hiding unwanted information | D02-S2 |
| Encapsulation | *Speaker notes only:* hiding data in a single entity or unit, with a way to protect information from outside; done with the access modifiers private, protected and public | D02-S2 📝 |
| Data structure | "the physical implementation of an ADT". It is the physical, programmatic realisation in memory, defining *how* data is stored and manipulated (arrays, pointers, linked nodes) | D02-S2, S3 |
| Logical form | "definition of the data item within an ADT." | D02-S3 |
| Physical form | "implementation of the data item within a data structure." | D02-S3 |
| ADT specification | Describes how the operations behave "in terms of Inputs and Outputs" | D02-S6 |
| Specification of an operation | Calling prototype + Preconditions + Postconditions | D02-S6 |
| Calling prototype | name of the operation; parameters and their types; return value and its type | D02-S6 |
| Preconditions | statements "assumed to be true when the operation is called." | D02-S6 |
| Postconditions | statements "assumed to be true when the operation returns." | D02-S6 |
| Constructor | "create a new object and return a reference to it" | D02-S7 |
| Access function | "return information about an object, but do not modify it" | D02-S7 |
| Manipulation procedure | "modify an object, but do not return information" | D02-S7 |
| State of an object | "current values of its data" | D02-S7 |
| Recursive ADT | "if any of its access functions returns the same class as the ADT" | D02-S7 |
| nil | "constant denoting the empty list" | D02-S8 |
| Binary tree | "a set of elements, called nodes, that is empty or satisfies: 1. There is a distinguished node r called the root 2. The remaining nodes are divided into two disjoint subsets, L and R, each of which is a binary tree." L is the left subtree and R the right subtree | D02-S9 |
| Stack | "a linear structure in which insertions and deletions are always make [sic: made] at one end, called the top". Policy: **LIFO** (last in, first out) | D02-S10 |
| Queue | "a linear structure in which all insertions are done at one end, called the rear or back, and all deletions are done at the other end, called the front". Policy: **FIFO** (first in, first out) | D02-S11 |
| Priority queue | Has some aspects of a FIFO queue, but element order is related to each element's priority rather than its arrival time. The one element that can be inspected and removed is the most important: the smallest priority (cost view) or the largest (profit view) | D02-S12 |
| Union (Union-Find) | Combines two disjoint sets: the original two are removed, the new set is added, and its id is either s or t | D02-S13 |
| Find | Retrieves "the current set id of an element" | D02-S13 |
| Leader | "the set id is some particular element in the set, called the leader" (when elements are integers) | D02-S13 |
| Dictionary | "a general associative storage structure". Each item has an identifier and associated information; no order is implied for identifiers | D02-S15 |

---

## 4. Lists to memorize, as taught

### 4.1 Five properties of an algorithm [D01-S2]
1. Finiteness
2. Unambiguous
3. Definiteness of sequence
4. Input/Output defined
5. Feasibility

Memory aid (initials): **F-U-D-I-F**.

### 4.2 Seven design techniques (problem-solving strategies) [D01-S3]
1. Divide & Conquer
2. Greedy Method
3. Branch & Bound
4. Backtracking
5. Dynamic Programming
6. Brute Force
7. Randomized

### 4.3 Problem-solving template [D01-S4]
- **Problem**
- **Strategy**
- **Algorithm**: Input, Output, Step
- **Analysis**: Time & Space, Optimality, Correctness
- **Implementation**
- **Verification**

That is six top-level headings, with three sub-items each under Algorithm and Analysis.

### 4.4 Measuring the amount of work [D01-S17]
- The measure should:
  - tell us about the **efficiency** of the method;
  - be **independent** of computer, programming language, programmer and other implementation details;
  - usually **depend on the size of the input**.
- How: **count passes through loops**; choose a **basic operation**; identify the **properties of the inputs** that affect the algorithm's behaviour.

### 4.5 Case analysis as taught
- **Worst case is the only case defined in these decks.**
  - W(n) = max{t(I) | I ∈ D<sub>n</sub>} [D01-S18]
  - "The input, I, for which an algorithm behaves worst depends on the particular algorithm." [D01-S18]
- Worst-case results from class:

  | Algorithm | W(n) | When it happens | Ref |
  |---|---|---|---|
  | Sequential search (unordered array) | **n** | K only in the last position, OR K not in the array | D01-S8 |
  | Binary search (ordered array) | **⌈lg(n+1)⌉** (optimal) | not stated on the slide | D01-S9 |
  | findMax (Algorithm A) | **n − 1** | every input: exactly n−1 comparisons | D01-S29 |

- Space can also get a worst-case analysis when the memory used depends on the particular input [D01-S19].
- 🔎 Look up in Track B: *average case* and *best case*. Neither term appears on these slides.

### 4.6 Loop-invariant proof [D01-S12]
- The invariant must be: a boolean property (or set of properties); aligned with the goal of the algorithm; true at initialization, maintenance and termination.
- Three things to show:
  1. **Initialization** — true before the first iteration.
  2. **Maintenance** — true before an iteration ⇒ true before the next.
  3. **Termination** — invariant + the reason the loop stopped ⇒ a useful property.
- Class examples:
  - get_max: "max is the maximum value in a[0..i-1]" [D01-S13–S14]
  - linear search: "if x is present in the array A, then it is present in the subarray A[i:n]" [D01-S16]

### 4.7 Space usage [D01-S19]
1. **Fixed part** — independent of problem size (e.g. the name of the data collection).
2. **Variable part** — depends on problem size (e.g. the actual text: 2GB vs 1MB).
- "Generally we do **Time and Space Tradeoff**."

### 4.8 Inequality rules [D01-S23]
- **Transitivity:** A ≤ B and B ≤ C ⇒ A ≤ C
- **Addition:** A ≤ B and C ≤ D ⇒ A+C ≤ B+D
- **Positive Scaling:** A ≤ B and α > 0 ⇒ αA ≤ αB

### 4.9 Logarithm rules [D01-S24]
1. log<sub>b</sub>x = L ⇔ b<sup>L</sup> = x (b>1, x>0)
2. strictly increasing: x > y ⇒ log<sub>b</sub>x > log<sub>b</sub>y
3. one-to-one: log<sub>b</sub>x = log<sub>b</sub>y ⇒ x = y
4. log<sub>b</sub>1 = 0; log<sub>b</sub>b = 1; log<sub>b</sub>x<sup>a</sup> = a·log<sub>b</sub>x
5. log<sub>b</sub>(xy) = log<sub>b</sub>x + log<sub>b</sub>y
6. x<sup>log y</sup> = y<sup>log x</sup>
7. change of base: log<sub>c</sub>x = log<sub>b</sub>x / log<sub>b</sub>c

### 4.10 Series [D01-S25]

| Kind | Formula |
|---|---|
| Arithmetic | Σ[i=1..n] i = n(n+1)/2 |
| Polynomial (squares) | Σ[i=1..n] i² = (2n³+3n²+n)/6 ≈ n³/3 |
| Polynomial (general) | Σ[i=1..n] i<sup>k</sup> ≈ n<sup>k+1</sup>/(k+1) |
| Power of 2 | Σ[i=**0**..k] 2<sup>i</sup> = 2<sup>k+1</sup> − 1 |
| Arithmetic-Geometric | Σ[i=1..k] i·2<sup>i</sup> = (k−1)2<sup>k+1</sup> + 2 |

### 4.11 Showing an algorithm is optimal [D01-S27] 🙈
1. Analyse algorithm A to get W<sub>A</sub>(n).
2. Prove a lower bound W<sub>[A]</sub>(n) for **any** algorithm in the same class as A.
3. If W<sub>A</sub>(n) == W<sub>[A]</sub>(n), A is **optimal**. Otherwise, either there may be a **better algorithm**, OR there may be a **better lower bound**.
- Before you start, choose (a) a **class of algorithms**, by the operations they may use, and (b) a **measure of complexity**, the basic operation to count [D01-S26].

### 4.12 ADT essentials [D02-S2, S3, S5]
- ADT = **properties (data)** + **behaviours (operations or functions)**, coupled together.
- In code: **Structures** (data structure declarations) + **Functions** (operation definitions). An ADT is identified as a **Class** in C++/Java.

  | | ADT | Data structure |
  |---|---|---|
  | Form | logical | physical |
  | Defines | **what** | **how** |
  | Made of (figure) | Type, Operations | Storage Space, Subroutines |

- "Abstraction: hide implementation details."

### 4.13 The specification format [D02-S6] — know this cold
- A specification of an operation consists of:
  1. **Calling prototype**, which includes:
     - name of the operation
     - parameters and their types
     - return value and its type
  2. **Preconditions** — assumed true when the operation is **called**.
  3. **Postconditions** — assumed true when the operation **returns**.
- Layout used in class [D02-S8]:
  ```
  IntList cons(int newElement, IntList oldList)
     Precondition: None.
     Postconditions: If x = cons(newElement, oldList) then 1. … 2. … 3. … 4. …
  ```

### 4.14 Operations for an ADT [D02-S7]
1. **Constructors** — create a new object and return a reference to it.
2. **Access functions** — return information, do not modify.
3. **Manipulation procedures** — modify, do not return information.
- Related terms:
  - **State** of an object: the current values of its data.
  - **Recursive ADT**: some access function returns the same class as the ADT.

### 4.15 ADT catalogue [D02-S4]
- Lists, Trees
- Stacks, Queues
- Priority Queue, Union-Find
- Dictionary

That is **seven** ADTs, covered on S8–S15.

### 4.16 Binary tree [D02-S9]
- Definition: empty, OR a root r plus two disjoint subsets L and R, each a binary tree (left subtree and right subtree).
- Facts:
  1. At most **2<sup>d</sup>** nodes at depth d.
  2. n nodes ⇒ height ≥ **⌈lg(n+1)⌉ − 1**.
  3. Height h ⇒ at most **2<sup>h+1</sup> − 1** nodes.

### 4.17 Update policies [D02-S10–S12]

| Structure | Insert at | Delete at | Policy |
|---|---|---|---|
| Stack | top | top | **LIFO** |
| Queue | rear / back | front | **FIFO** |
| Priority queue | conceptually in order of priority | the most important element only | **cost view: smallest priority; profit view: largest priority** |

### 4.18 Union-Find operations [D02-S13, S14]
- `UnionFind create(int n)` → {{1},{2},…,{n}}
- `int find(UnionFind sets, e)` → the set id of e
- `void makeSet(unionFind sets, int e)` → adds the singleton {e} (e not already present)
- `void union(UnionFind sets, int s, int t)` → s and t are set ids, s != t; the new id is s or t (sometimes min(s, t))
- The **set id** is often a particular element of the set, called the **leader**.

### 4.19 Dictionary [D02-S15]
- Each item has: (1) an **identifier**, and (2) **associated information** to be stored and retrieved.
- **No order** is implied for the identifiers.

---

## 5. Worked examples & exercises from class

The slides ask two questions directly: "The Best possible solution?" [D01-S9] and "Show whether an algorithm is optimal?" [D01-S27]. Their answers are in 5.2 and 5.13. Every other example below is a class example worked step by step. Wherever a sample array or sample numbers were needed, they are labelled; all results are ✅ script-checked.

### 5.1 Sequential search — trace and W(n) [D01-S5–S8]
Sample: E = [7, 3, 9, 5], n = 4. The basic operation is "K == E[index]".

| K | Comparisons made | # comparisons | ans returned |
|---|---|---|---|
| 7 | E[0]=7 ✔ | 1 | 0 |
| 9 | E[0]=7, E[1]=3, E[2]=9 ✔ | 3 | 2 |
| 5 (**last position**) | E[0], E[1], E[2], E[3]=5 ✔ | **4 = n** | 3 |
| 4 (**not in array**) | all four entries, no match | **4 = n** | −1 |

- **Conclusion:** W(4) = 4 = n. The maximum occurs exactly in the slide's two worst cases. ✅
- **The definition on n = 3** [D01-S18]:
  - Group the inputs in D<sub>3</sub> by the first position of K: position 0 → t(I) = 1; position 1 → 2; position 2 → 3; absent → 3.
  - W(3) = max{1, 2, 3, 3} = 3 = n.

### 5.2 "The Best possible solution?" — binary search, W(n) = ⌈lg(n+1)⌉ [D01-S9]
For an **ordered** array, the slide's answer is binary search, with W(n) = ⌈lg(n+1)⌉, and "The Binary Search algorithm is optimal."

| n | lg(n+1) | ⌈lg(n+1)⌉ (binary search) | n (sequential search) |
|---|---|---|---|
| 1 | 1 | 1 | 1 |
| 3 | 2 | 2 | 3 |
| 7 | 3 | 3 | 7 |
| 8 | 3.17 | 4 | 8 |
| 1000 | 9.97 | **10** | 1000 |

- ✅ The formula matched a simulated binary search for every n from 1 to 2049.
- 🔎 Look up in Track B: the binary search procedure itself (not on these slides).

### 5.3 get_max — loop-invariant proof on a sample array [D01-S13–S14]
Sample: a = [4, 9, 2, 7, 5]. Invariant: *max is the maximum value in a[0..i-1].*

| Start of iteration | Invariant check | Body: a[i] > max? | max after |
|---|---|---|---|
| i = 1 (**Initialization**) | max = 4 = max{4} = max(a[0..0]) ✔ | 9 > 4 → yes | 9 |
| i = 2 (**Maintenance**) | 9 = max{4, 9} ✔ | 2 > 9 → no | 9 |
| i = 3 | 9 = max{4, 9, 2} ✔ | 7 > 9 → no | 9 |
| i = 4 | 9 = max{4, 9, 2, 7} ✔ | 5 > 9 → no | 9 |
| loop ends, i = len(a) = 5 (**Termination**) | 9 = max(a[0..4]) = max of the whole array ✔ | — | **return 9** |

- 4 comparisons = n − 1, the same as findMax's W<sub>A</sub>(n) [D01-S29]. ✅

### 5.4 Linear search — loop-invariant proof on a sample array [D01-S15–S16]
Sample: A = [4, 7, 2], n = 3. Invariant: *if x is in A, then x is in A[i:n].*

**Case x = 2 (found):**

| i | A[i:n] | Invariant | A[i] = x? | Action |
|---|---|---|---|---|
| 0 (Initialization) | [4, 7, 2] — the whole array | ✔ | 4 ≠ 2 | not returned, so x must be in A[1:3]; i → 1 |
| 1 (Maintenance) | [7, 2] | ✔ | 7 ≠ 2 | i → 2 |
| 2 | [2] | ✔ | **2 = 2** | **return 2**, and A[2] = x, so condition 1 holds |

**Case x = 5 (not found):**
- i = 0, 1, 2: A[i] = 4, 7, 2, never 5.
- The loop ends with i = 3 > n − 1. A[3:3] is **empty**, so x is not in A[3:3].
- Contrapositive ("if not B then not A"): x is not in A[i:n] ⇒ x is not in A.
- So **Not-Found** is correct (condition 2). ✅
- Here x is never in A, so the invariant's "if" part is false at every step and the invariant can never fail.

### 5.5 Space — fixed or variable? [D01-S19]
Use the slide's own examples:
- *Name of the data collection* → **fixed** (same whether you classify 2GB or 1MB of text).
- *The actual text* → **variable** (2GB vs 1MB changes the space).

### 5.6 Sets, subsets and cardinality [D01-S20–S22]
- S<sub>1</sub> = {a, b, c}, so |S<sub>1</sub>| = 3.
  - All subsets: ∅, {a}, {b}, {c}, {a,b}, {a,c}, {b,c}, {a,b,c}. That is **8 = 2³** ✔.
  - Subsets of cardinality 2: C(3,2) = 3!/(1!·2!) = 3, namely {a,b}, {a,c}, {b,c} ✔.
  - ∅ is among the subsets, matching "Empty set is a subset of every set".
- Practice numbers, with T = {b, c, d}:
  - S<sub>1</sub> ∩ T = {b, c} (in both — "and")
  - S<sub>1</sub> ∪ T = {a, b, c, d} (in either — "or")
- A 5-element set has 2⁵ = 32 subsets. C(5,2) = 5!/(3!·2!) = 120/12 = 10, and C(5,3) = 10. ✅

### 5.7 Floor, ceiling and logs [D01-S23–S24]

| Expression | Value | Why (slide rule) |
|---|---|---|
| ⌊2.7⌋, ⌈2.7⌉ | 2, 3 | largest integer ≤ x; smallest integer ≥ x |
| ⌊−2.7⌋, ⌈−2.7⌉ | −3, −2 | the same definitions; careful with negatives |
| ⌈2.1⌉ | 3 | smallest integer ≥ 2.1 |
| lg 8 | 3 | 2³ = 8 (definition of log) |
| lg(8·4) | 5 | log(xy) = log x + log y = 3 + 2 |
| lg(8²) | 6 | log x<sup>a</sup> = a log x = 2·3 |
| 8<sup>lg 4</sup> and 4<sup>lg 8</sup> | 64 and 64 | x<sup>log y</sup> = y<sup>log x</sup> (8² = 4³) |
| log<sub>4</sub> 64 | 3 | change of base: lg 64 / lg 4 = 6/2 |

### 5.8 Series — hand checks [D01-S25]

| Formula | Small case | Direct sum | Formula gives |
|---|---|---|---|
| Σ[i=1..n] i = n(n+1)/2 | n = 10 | 1+…+10 = 55 | 10·11/2 = **55** ✔ |
| Σ[i=1..n] i² = (2n³+3n²+n)/6 | n = 4 | 1+4+9+16 = 30 | (128+48+4)/6 = **30** ✔ |
| Σ[i=0..k] 2<sup>i</sup> = 2<sup>k+1</sup> − 1 | k = 4 | 1+2+4+8+16 = 31 | 2⁵ − 1 = **31** ✔ |
| Σ[i=1..k] i·2<sup>i</sup> = (k−1)2<sup>k+1</sup> + 2 | k = 3 | 2+8+24 = 34 | 2·16 + 2 = **34** ✔ |

- The approximation Σ i² ≈ n³/3: at n = 100 the exact value is 338,350 and n³/3 ≈ 333,333 (within 1.5%). ✅

### 5.9 The specification format in action — reading `cons` [D02-S6, S8]
- **Calling prototype:** `IntList cons(int newElement, IntList oldList)`
  - name: cons
  - parameters: newElement of type int, oldList of type IntList
  - return type: IntList
- **Precondition:** None. It can always be called, even with oldList = nil.
- **Postconditions:** the result x is a new object, x != nil, first(x) = newElement, rest(x) = oldList.
- **Kind:** constructor [D02-S7].

### 5.10 List ADT trace [D02-S8]
Build x = cons(3, cons(5, nil)) and apply only the slide's postconditions:
1. y = cons(5, nil). Postconditions: y is new, y != nil, **first(y) = 5**, **rest(y) = nil**.
2. x = cons(3, y). Postconditions: **first(x) = 3**, **rest(x) = y**.
3. Queries:
   - first(x) = 3
   - first(rest(x)) = first(y) = 5
   - rest(rest(x)) = rest(y) = nil
4. **first(nil)** is *not allowed*: it breaks the precondition `aList != nil`. ✅ A script implementation with these pre/postconditions as assertions behaves exactly this way.

### 5.11 Union-Find trace [D02-S13–S14]
Rule used: new set id = min(s, t), as the slide allows.

| Operation | Collection afterwards | Set ids (leaders) | Query |
|---|---|---|---|
| create(5) | {{1},{2},{3},{4},{5}} | 1, 2, 3, 4, 5 | — |
| union(sets, 1, 3) | {{1,3},{2},{4},{5}} | 1, 2, 4, 5 | find(sets, 3) = **1** |
| union(sets, 2, 4) | {{1,3},{2,4},{5}} | 1, 2, 5 | find(sets, 4) = **2** |
| union(sets, 1, 2) | {{1,2,3,4},{5}} | 1, 5 | find(sets, 4) = **1**; find(sets, 5) = 5 |
| makeSet(sets, 6) | {{1,2,3,4},{5},{6}} | 1, 5, 6 | find(sets, 6) = 6 |

- **Precondition check:** after the second union, `union(sets, 3, 4)` would be **illegal**. 3 and 4 are no longer set ids, and the slide requires "s and t are set ids, s != t". ✅

### 5.12 Binary-tree numbers [D02-S9]
- **n = 7:** height ≥ ⌈lg 8⌉ − 1 = 2. A tree of height 2 holds at most 2³ − 1 = 7 nodes, so 7 nodes fit exactly.
- **n = 20:**
  - lg 21 ≈ 4.39, so height ≥ ⌈4.39⌉ − 1 = 4.
  - Cross-check with fact 3: height 3 allows at most 15 nodes, which is too few; height 4 allows up to 31, which is enough. ✔
- **Depth 3:** at most 2³ = 8 nodes. ✅ (Enumeration of all shapes up to 11 nodes agreed with all three facts.)

### 5.13 "Show whether an algorithm is optimal?" — applied to findMax [D01-S27–S29]
1. **Analyse A.**
   - Basic operation: comparison of an array entry with another entry or a stored variable.
   - Line 3 runs n−1 times, and line 4 compares once each time, so **W<sub>A</sub>(n) = n − 1**.
   - Sample: [4, 9, 2, 7, 5] → 4 comparisons. ✅
2. **Lower bound W<sub>[A]</sub>(n).** Not given on the slides. 🔎 Look up in Track B.
3. **Compare.** If the lower bound turns out to equal n − 1, findMax is optimal. If not, there may be a better algorithm or a better lower bound.
- The slides stop after step 1.

### 5.14 Stack / queue / priority queue mini-traces [D02-S10–S12]
- **Stack:** insert 10, 20, 30 (all at the top), then delete → **30** (LIFO).
- **Queue:** insert 10, 20, 30 (at the rear), then delete (from the front) → **10** (FIFO).
- **Priority queue:** insert priorities 5, 2, 8 in that order.
  - Cost viewpoint: removes **2** (smallest).
  - Profit viewpoint: removes **8** (largest).
  - Arrival order does not matter.

---

## 6. Likely exam questions

*Built only from these two decks. Try them first; answers follow in the next subsection.*

**Q1. (Definition)** State the class definition of a *computer algorithm* and list its five properties.

**Q2. (List)** Name the seven design techniques (problem-solving strategies) given in class.

**Q3. (MCQ)** Which of these is **NOT** one of the five algorithm properties listed in class?
- (a) Finiteness
- (b) Definiteness of sequence
- (c) Optimality
- (d) Feasibility

**Q4. (Template)** Fill in the class template (Problem, Strategy, Algorithm with Input/Output/Step, Analysis) for *searching an unordered array for a key K*.

**Q5. (Definition / case analysis)**
- Define D<sub>n</sub>, t(I) and W(n), and write W(n) as a formula.
- Does the input on which an algorithm behaves worst depend on the algorithm?

**Q6. (Case analysis / trace)** For `seqSearch` with E = [7, 3, 9, 5]:
- How many comparisons are made, and what is returned, for K = 7, 9, 5 and 4?
- Which of these are worst cases, and why?

**Q7. (MCQ)** By the class formula, the worst-case number of comparisons for binary search on an *ordered* array of 1000 entries is:
- (a) 1000
- (b) 500
- (c) 10
- (d) 9

**Q8. (Loop invariant)**
- Name and explain the three things you must show to prove correctness with a loop invariant.
- Give the loop invariant for `get_max` and prove each of the three steps.

**Q9. (Loop invariant)** For linear search:
- State the loop invariant.
- Explain how the termination step proves that returning *Not-Found* is correct.
- What role does the contrapositive play?

**Q10. (Short answer)**
- What are the *fixed part* and the *variable part* of a program's space? Give the class examples.
- What does the slide say we "generally" do?

**Q11. (Math tools)** Compute:
- (a) the number of subsets of a 5-element set;
- (b) the number of its 3-element subsets;
- (c) ⌊−2.7⌋ and ⌈2.1⌉;
- (d) log<sub>4</sub> 64, using change of base;
- (e) Σ[i=1..100] i;
- (f) Σ[i=0..9] 2<sup>i</sup>;
- (g) Σ[i=1..10] i², both exactly and with the class approximation.

**Q12. (Optimality)**
- (a) Complete: "An algorithm is optimal if …"
- (b) True or false: "optimal" means "the best algorithm known so far".
- (c) Describe how to show that an algorithm A is optimal, and what you may conclude if W<sub>A</sub>(n) ≠ W<sub>[A]</sub>(n).

**Q13. (MCQ)** For `findMax` (Algorithm A in class) on an array of n numbers, W<sub>A</sub>(n) equals:
- (a) n
- (b) n − 1
- (c) ⌈lg(n+1)⌉
- (d) n/2

Does the number of comparisons differ between inputs of the same size n?

**Q14. (Definition)**
- Define an ADT. What are its *properties* and its *behaviours*?
- How does an ADT differ from a data structure? Use the terms *logical form* and *physical form*.

**Q15. (Specification format)**
- What does a specification of an operation consist of?
- What does the calling prototype include?
- Define *preconditions* and *postconditions*.

**Q16. (Write the ADT specification in the class format)**
- Write the specification of `cons`, `first` and `rest` for the integer List ADT.
- Classify each operation as constructor, access function or manipulation procedure.
- Is IntList a recursive ADT? Why?
- *Stretch:* write, in the same format, a specification for inserting an element into a stack.

**Q17. (Write a spec + trace)**
- Write the class-format specification for `void union(UnionFind sets, int s, int t)`.
- Using "new set id = min(s, t)", trace `create(5)`, `union(sets,1,3)`, `union(sets,2,4)`, `union(sets,1,2)`. What is `find(sets,4)`?
- Why would `union(sets,3,4)` be illegal after the first two unions?

**Q18. (MCQ set)**
- (a) An operation that returns information about an object but does not modify it is a:
  - constructor
  - access function
  - manipulation procedure
  - recursive ADT
- (b) A queue's updating policy is:
  - LIFO
  - FIFO
  - by priority
  - no order
- (c) Insert 10, 20, 30 into an empty stack, then delete once. Which element is removed?
- (d) A binary tree with 20 nodes has height at least:
  - 3
  - 4
  - 5
  - 19
- (e) In a priority queue with a *profit* viewpoint, the element removed is the one with:
  - the smallest priority
  - the largest priority
  - the earliest arrival
  - the latest arrival

### Answers

**A1.** "A computer algorithm is a detailed step-by-step method for solving a problem by using a computer." Its properties:
1. Finiteness
2. Unambiguous
3. Definiteness of sequence
4. Input/Output defined
5. Feasibility

[D01-S2]

**A2.** Divide & Conquer; Greedy Method; Branch & Bound; Backtracking; Dynamic Programming; Brute Force; Randomized. [D01-S3]

**A3.** **(c) Optimality.** It belongs to the *Analysis* part of the problem-solving template [D01-S4, S9], not to the list of properties [D01-S2].

**A4.**
- **Problem:** E is an array of n entries E[0], …, E[n−1] in no particular order. Find an index of key K if K is in the array; return −1 if it is not [D01-S5].
- **Strategy:** compare K to each entry in turn until a match is found or the array is exhausted; return −1 if K is absent [D01-S5].
- **Input:** E, n, K. **Output:** ans, the location of K in E (−1 if not found) [D01-S6].
- **Step:** the `seqSearch` code [D01-S7].
- **Analysis:**
  - Basic operation: comparison of K with an array entry. W(n) = n [D01-S8].
  - Optimality: for an *ordered* array, binary search with W(n) = ⌈lg(n+1)⌉ is optimal [D01-S9].
  - Correctness: if the preconditions hold, the postconditions are true when it terminates [D01-S10].

**A5.**
- D<sub>n</sub> = the set of inputs of size n.
- t(I) = the number of basic operations performed on input I.
- **W(n) = max{t(I) | I ∈ D<sub>n</sub>}**, the maximum number of basic operations on any input of size n.
- Yes, the worst input depends on the algorithm: "The input, I, for which an algorithm behaves worst depends on the particular algorithm." [D01-S18]

**A6.**

| K | Comparisons | Returns |
|---|---|---|
| 7 | 1 | 0 |
| 9 | 3 | 2 |
| 5 | 4 | 3 |
| 4 | 4 | −1 |

The worst cases are **K = 5** (only in the last position) and **K = 4** (not in the array). Both cost n = 4 = W(4). [D01-S7, S8] ✅

**A7.** **(c) 10.** ⌈lg 1001⌉ = 10, since 2⁹ = 512 < 1001 ≤ 1024 = 2¹⁰. [D01-S9] ✅

**A8.**
- The three steps:
  - **Initialization:** the invariant is true before the first iteration.
  - **Maintenance:** if it is true before an iteration, it stays true before the next one.
  - **Termination:** when the loop ends, the invariant together with the reason it ended gives a useful property.
- **get_max invariant:** "max is the maximum value in a[0..i-1]".
  - *Init:* i = 1, so a[0..0] = a[0] and max = a[0] ✔.
  - *Maintenance:* at the start of iteration i = k, max = max(a[0..k−1]). The iteration compares a[k] and updates max if a[k] is larger, so max = max(a[0..k]) at the start of iteration k+1 ✔.
  - *Termination:* i = len(a), so max is the maximum of a[0..len(a)−1], the whole array ✔.

[D01-S12–S14]

**A9.**
- Invariant: "At the start of each iteration of step 1, if x is present in the array A, then it is present in the subarray A[i:n]."
- If the algorithm returns i, then A[i] = x directly.
- If the loop runs out, i > n−1 (i = n), so A[n:n] is empty and x is not in it.
- The contrapositive ("if A then B" ≡ "if not B then not A") turns the invariant into: "if x is not present in the subarray A[i:n], then x is not present in A". So Not-Found is correct.

[D01-S15, S16]

**A10.**
- **Fixed part:** space for data and variables that is independent of problem size, e.g. the name of the data collection (the same for classifying 2GB or 1MB of texts).
- **Variable part:** space for variables whose size depends on the problem, e.g. the actual text (loading 2GB vs 1MB).
- "Generally we do **Time and Space Tradeoff**." [D01-S19]

**A11.** [D01-S22–S25] ✅
- (a) 2⁵ = **32**
- (b) C(5,3) = 5!/(2!·3!) = **10**
- (c) **−3** and **3**
- (d) lg 64 / lg 4 = 6/2 = **3**
- (e) 100·101/2 = **5050**
- (f) 2¹⁰ − 1 = **1023**
- (g) Exactly (2000 + 300 + 10)/6 = **385**. The approximation n³/3 ≈ **333.3**.

**A12.**
- (a) "…there is no algorithm in the class under study that performs fewer operations (in worst case)."
- (b) **False.** "Optimal doesn't mean best known but it means best possible."
- (c) The procedure:
  1. Analyse A to get W<sub>A</sub>(n).
  2. Prove that every algorithm in A's class must perform at least W<sub>[A]</sub>(n) on some input of size n (the lower bound in the worst case).
  3. If W<sub>A</sub>(n) == W<sub>[A]</sub>(n), A is optimal. Otherwise there may be a better algorithm OR a better lower bound.

[D01-S26, S27] (🙈 hidden slides — still in the deck)

**A13.** **(b) n − 1.** The count does **not** differ: "For any input of size n, there are exactly n-1 basic operations". The loop always does n−1 comparisons. [D01-S28, S29] ✅

**A14.**
- "An ADT describes a set of objects sharing the same properties and behaviors". The properties are its **data**; the behaviours are its **operations or functions**; an ADT couples data and operations [D02-S2].
- An ADT is the **logical form**: it defines *what* data and *what* operations, and hides *how*.
- A data structure is the **physical form**, "the physical implementation of an ADT". It defines *how* data is stored and manipulated, using arrays, pointers or linked nodes. [D02-S2, S3]

**A15.**
- A specification has three parts: a **calling prototype**, **preconditions** and **postconditions**.
- The calling prototype includes the name of the operation, the parameters and their types, and the return value and its type.
- Preconditions are statements "assumed to be true when the operation is called".
- Postconditions are statements "assumed to be true when the operation returns".

[D02-S6]

**A16.**
```
IntList cons(int newElement, IntList oldList)
   Precondition: None.
   Postconditions: If x = cons(newElement, oldList) then
      1. x refers to a newly created object;
      2. x != nil;
      3. first(x) = newElement;
      4. rest(x) = oldList
int first(IntList aList)      // access function
   Precondition: aList != nil
IntList rest(IntList aList)   // access function
   Precondition: aList != nil
IntList nil                   // constant denoting the empty list
```
- `cons` is a **constructor**: it creates a new object and returns a reference to it.
- `first` and `rest` are **access functions**.
- **Yes, IntList is recursive:** its access function `rest` returns an `IntList`, the same class as the ADT.

[D02-S7, S8]

*Stretch (model answer: the class format from D02-S6 applied to the stack definition on D02-S10; the slides give no stack spec themselves):*
```
void push(Stack s, int newElement)     // manipulation procedure: modifies s, returns nothing
   Precondition: None.
   Postconditions: newElement is at the top of s;
                   the elements that were already in s are still in s.
```

**A17.**
```
void union(UnionFind sets, int s, int t)
   Preconditions: s and t are set ids; s != t.
   Postconditions: set [s] and set [t] are removed and the new set (their union) is added,
                   so all sets stay disjoint; the new set id is either s or t
                   (here, min(s, t)).
```
- The trace:

  | Step | Collection |
  |---|---|
  | create(5) | {{1},{2},{3},{4},{5}} |
  | union(sets,1,3) | {{1,3},{2},{4},{5}} |
  | union(sets,2,4) | {{1,3},{2,4},{5}} |
  | union(sets,1,2) | {{1,2,3,4},{5}} |

  **find(sets,4) = 1.**
- After the first two unions the set ids are 1, 2 and 5. Since 3 and 4 are not set ids, union(sets,3,4) violates the precondition.

[D02-S13, S14] ✅

**A18.** ✅
- (a) **access function** [D02-S7]
- (b) **FIFO** [D02-S11]
- (c) **30**, last in, first out [D02-S10]
- (d) **4** = ⌈lg 21⌉ − 1 [D02-S9]
- (e) **the largest priority** [D02-S12]

---

## 7. Self-check

- [ ] I can recite the class definition of a computer algorithm, its **5 properties** and the **7 design techniques** [D01-S2, S3].
- [ ] I can fill in the **Problem → Strategy → Algorithm (Input/Output/Step) → Analysis** template for sequential search [D01-S4–S8].
- [ ] I can define the basic operation, D<sub>n</sub>, t(I) and **W(n) = max{t(I) | I ∈ D<sub>n</sub>}**, and explain why seqSearch has W(n) = n and when it happens [D01-S8, S17, S18].
- [ ] I can write a full **loop-invariant proof** (Initialization, Maintenance, Termination) for get_max and for linear search, including the **contrapositive** step [D01-S12–S16].
- [ ] I can explain **fixed vs variable** space with the class examples and quote "Generally we do Time and Space Tradeoff" [D01-S19].
- [ ] I can use the **set, cardinality, inequality, floor/ceiling, log and series** rules in a quick calculation without notes [D01-S20–S25].
- [ ] I can define **optimal** (best possible, not best known), describe the **W<sub>A</sub>(n) vs W<sub>[A]</sub>(n)** test, and quote W(n) = ⌈lg(n+1)⌉ for binary search and W<sub>A</sub>(n) = n − 1 for findMax [D01-S9, S26–S29].
- [ ] I can define an **ADT**, contrast it with a **data structure** (logical/what vs physical/how), and name the three kinds of operations plus *state* and *recursive ADT* [D02-S2, S3, S7].
- [ ] I can write an operation spec **in the class format** (calling prototype + preconditions + postconditions) for cons, first, rest and union, and spot a precondition violation [D02-S6, S8, S14].
- [ ] I can state the policies of **stack (LIFO), queue (FIFO), priority queue (cost/profit)**, describe **Union-Find** and **Dictionary**, and apply the **three binary-tree bounds** [D02-S9–S15].


---

<!-- FILE: Week 2-3 - Asymptotic notation, recursive running times, Master theorem - class notes.md -->

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


---

<!-- FILE: Week 3-4 - Insertion sort, quicksort, merge sort - class notes.md -->

# Weeks 3–4 — Insertion sort, quicksort, merge sort (CLASS NOTES — from slides only)

> Sources: [D06-S#] = deck "06 - Insertion Sort-IUT" (10 slides) · [D07-S#] = deck "07 - quicksort" (22 slides) · [D08-S#] = deck "08 - merge sort" (20 slides) · Assignment 2 – Sorting handout + professor's sample solution [A2]. [D04]/[D05] (other class decks) are cited only where these slides lean on them.
> Course: SOC3030-003 Computer Algorithm · Prof. Seth Ashish · Inha University in Tashkent · Fall 2026 · Midterm (25 %) in week 8 (24–30 Oct 2026), covering weeks 1–7.
> Legend: ⭐ = emphasised on the slides (bold, underline, highlight box, or a question→answer reveal pair) / likely exam material · ⚠️ = typo or error on the slide, with the right reading · 🔎 = not explained on the slides, so look it up in Track B.
> Conventions: arrays are **1-indexed** as on the slides (A[1..n]). The helper arrays L and R inside MERGE are 0-indexed, as on [D08-S8]. Every trace in these notes was re-run in Python, with the slide pseudocode copied line by line.

---

## 1. Big picture

- **Sorting** means "arranging elements of set into order". The course lists six solutions: insertion sort, quicksort, mergesort, heapsort, shellsort and radix sorting [D06-S1]. These notes cover the first three.
- **Why sort?** To search unsorted data by comparing keys you need Θ(n) comparisons. Sorted data needs only Θ(log n) [D06-S2].
- The professor sorts algorithms into five pairs of categories: comparison / non-comparison, internal / external, stable / unstable, adaptive / non-adaptive and in-place / out-place [D06-S3]. This table is the easiest source of MCQs.
- **Insertion sort** keeps a sorted segment and grows it one element at a time. It pulls x out, shifts the larger elements right and drops x into the gap. The worst case is O(n²) on reversed input, with F(n) = n(n−1)/2 comparisons or moves. The best case is Ω(n) on input already in ascending order [D06-S5…S8].
- **Quicksort and merge sort are both Divide and Conquer.** Divide into smaller instances of the same problem, conquer them recursively, then combine [D07-S3, D08-S2].
- **Quicksort** does all its work in PARTITION. PARTITION uses the **last element A[r] as the pivot** and returns the pivot's final index q [D07-S4, S5]. The variants taught are randomized quicksort, median-of-3 partition and "Median Method V2" [D07-S6…S10].
- **Quicksort's speed depends on balance.** A balanced split runs as fast as merge sort, Θ(n log n). An unbalanced split (n−1 : 0) runs as slow as insertion sort, Θ(n²), and that happens on **already sorted** input [D07-S11…S14].
- **Merge sort** splits at q = ⌊(p+r)/2⌋, sorts both halves, then MERGEs them in O(n). So T(n) = 2T(n/2) + O(n) = Θ(n log n), and the order of the input makes no difference ("no worst scenario") [D08-S5, S9, S11].
- **Space.** Quicksort's space is the number of recursion levels: O(log n) when balanced, O(n) when unbalanced [D07-S21]. Merge sort needs an extra array, so it is out-place and uses O(n) in total [D08-S10].
- **The recipe for the cost questions in deck 08:** total cost = (merge cost per level) × (number of levels). It gives O(n log n), O(n log log n), O(n² log n) and O(n log(n/k)) [D08-S13…S19].

---

## 2. Slide-by-slide notes

## Deck 06 — Insertion Sort (10 slides)

### [D06-S1] Sorting
- Sorting: "arranging elements of set into order".
- "Solution:" Insertion Sort · Quicksort · Mergesort · Heapsort · Shellsort · Radix Sorting.

### [D06-S2] Application of Sorting
- Searching **unsorted** data by comparing keys: the best possible solutions need **Θ(n)** comparisons.
- Searching **sorted** data by comparing keys: the best possible solutions need **Θ(log n)** comparisons.
- Other uses: sorting data for users, and "More…".
- ⚠️ In the slide image the symbol in front of "(n)" and "(log n)" shows as an empty box. In the original .pptx it is the Symbol-font character θ, so read it as **Θ(n)** and **Θ(log n)**.

### [D06-S3] (untitled) Kinds of sorting ⭐
| Category (slide wording) | Examples given on the slide |
|---|---|
| Comparison based sorting | insertion sort, merge sort, bubble sort, quick sort |
| Non-Comparison based sorting | bucket sort, radix sort, counting sort |
| Internal Sorting | bubble sort, insertion sort |
| External Sorting | quick sort, merge sort |
| Stable sorting | merge sort, insertion sort, bubble sort |
| Unstable sorting | quicksort, heap sort, selection sort |
| Adaptive Sorting ("i.e. sorted or unsorted data") | bubble sort, insertion sort, quick sort |
| Non-Adaptive Sorting | selection sort, merge sort, heap sort |
| In-place / Outplace technique | Among the comparison-based sorts above, **only merge sort is out-place**. Among the non-comparison-based sorts above, **all are out-place**. |

- ⭐ Learn this table by heart. For this unit:
  - **insertion sort** is comparison-based, internal, stable, adaptive and in-place;
  - **quick sort** is comparison-based, external (as this slide lists it), **unstable**, adaptive and in-place;
  - **merge sort** is comparison-based, external, stable, **non-adaptive** and **out-place**.
- The slide gives examples only, not definitions. 🔎 Look up in Track B: the definitions of internal/external, stable and adaptive sorting, and how textbooks classify quick sort (this slide puts it under "External").

### [D06-S4] Insertion Sort (diagram)
- The figure shows two array bars, each split into a green "Sorted partial result" and a red "Unsorted data" part.
  - **Before inserting x:** the sorted part holds a block of "≤ x" values followed by a block of "> x" values. x (red) is the first unsorted cell, and "…" follows.
  - **After inserting x:** the sorted part reads "≤ x | x | > x", followed by the rest of the unsorted data.
- So inserting x places it after every sorted element ≤ x and before every sorted element > x.

### [D06-S5] Insertion Sort — strategy
- Strategy: insert each element in its proper order.
  1. Begin with a sequence E of n elements in arbitrary order.
  2. At first, assume the sorted segment contains only the first element.
  3. Let x be the next element to insert into the sorted segment. Pull x "out of the way", leaving a **vacancy**.
  4. Compare x with the element just left of the vacancy. While x is smaller, move that element into the vacancy, so the vacancy moves one place left.
  5. Otherwise, put x in the vacancy.
  6. Repeat with the next element that has not been examined yet.
- The professor's speaker notes on this slide say:
  - the main strategy is an **incremental (stepwise) approach**: take one element from the unsorted part and insert it into its correct place in the sorted part;
  - it is also **decrease-and-conquer**: the sorted portion acts as the smaller subproblem.

### [D06-S6] Insertion Sort — worked example ⭐
Array: 7, -5, 2, 16, 4. On the slide, a "?" box marks the vacancy and green marks the sorted part.

| Pass | x | Slide's commentary | Array after the pass |
|---|---|---|---|
| start | – | unsorted | 7 -5 2 16 4 |
| 1 | -5 | 7 > -5, shift → reached left boundary, insert -5 | -5 7 2 16 4 |
| 2 | 2 | 7 > 2, shift → -5 < 2, insert 2 | -5 2 7 16 4 |
| 3 | 16 | 7 < 16, insert 16 (no shift) | -5 2 7 16 4 |
| 4 | 4 | 16 > 4, shift → 7 > 4, shift → 2 < 4, insert 4 | -5 2 4 7 16 |

- Result: sorted -5 2 4 7 16. Running the [D06-S7] code gives 7 key comparisons and 4 shifts (full j-by-j trace in §5.1).
- The "2026-10-19 6" in the image footer is just an auto-updating date field and the page number.

### [D06-S7] Insertion Sort — pseudocode ⭐
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
- Mapping to [D06-S5]:
  - j is the position of the element being inserted, and `key` is the x of S5;
  - i walks left through the sorted part A[1..j−1];
  - `A[i+1] = A[i]` is the shift into the vacancy;
  - `A[i+1] = key` fills the vacancy. It runs once per j, so it belongs to the for-loop body.
- `i>0` is the "reached left boundary" case of [D06-S6]. The test `A[i] > key` is strict, so the loop stops at an element equal to key.
- The slide repeats the [D06-S6] trace beside the code.

### [D06-S8] Insertion Sort: Analysis ⭐
- **Worst-case complexity:** W(n) = O(n²), when the elements are in **reversed order**.
- **Best case:** "W(n) = Omega(n)", i.e. Ω(n), when the elements are **already sorted in ascending order**.
- **Analysis [no of comparisons/movement]:**
  F(n) = 1 + 2 + 3 + … + (n−3) + (n−2) + (n−1) = n(n−1)/2 = O(n²)
- Check, running the S7 code with n = 6:
  - reversed input 6 5 4 3 2 1 gives 15 comparisons and 15 shifts, which is 6·5/2;
  - sorted input gives 5 comparisons (n−1) and 0 shifts.
- ⚠️ The best-case line reuses the label W(n), which is the worst-case label. Read it as "best-case running time = Ω(n)".

### [D06-S9] Improvement Analysis ⭐
- Goal: reduce the number of ***comparisons*** and of ***movement*** (both words are underlined on the slide).
- *Reduce number of comparisons* → apply **binary search**.
- *Reduce number of movement* → implement a **doubly linked list**.
- Even so, these **cannot make total running time better than O(n²)**.
- 🔎 Look up in Track B: why neither fix brings the total below O(n²). The slide states this without reasoning.

### [D06-S10] Video lecture
- "Insertion Sort Analysis": https://youtu.be/jikkNiuR2CQ

---

## Deck 07 — Quick Sort Analysis (22 slides)

### [D07-S1] Quick Sort Analysis
- Title slide.

### [D07-S2] Algorithm Design Technique — Divide and Conquer
- Section title slide.

### [D07-S3] Divide and Conquer
- It is often easier to *solve several small instances* of a problem than one large one:
  - ***divide*** the problem into smaller instances of the same problem;
  - solve (***conquer***) the smaller instances recursively;
  - ***combine*** the solutions to get the solution for the original input.
```
Solve(I)
    n = size(I)
    if (n <= smallsize)
        solution = directlySolve(I);
    else
        divide I into I1, , Ik.
        for each i in {1, , k}
            Si = solve(Ii);
        solution = combine(S1, , Sk);
    return solution;
```
- ⚠️ "I1, , Ik", "{1, , k}" and "S1, , Sk" have lost their ellipsis. Read them as I1, …, Ik and so on.
- How the two sorts use the template, reading their pseudocode:
  - **QUICKSORT** [D07-S4] does its real work while dividing (PARTITION), and nothing follows the two recursive calls.
  - **MERGESORT** [D08-S5, S11] divides in O(1) (the midpoint) and does its work while combining (MERGE, O(n)).

### [D07-S4] Pseudocode for quicksort ⭐
```
QUICKSORT(A, p, r)
if  p< r
   then q←PARTITION(A, p, r)
QUICKSORT(A, p, q–1)
QUICKSORT(A, q+1, r)
```
- p and r are the first and last index of the current sub-array.
- PARTITION puts the pivot in its final place q. The two recursive calls then sort A[p..q−1] and A[q+1..r]; the pivot itself is left out.
- The first call is QUICKSORT(A, 1, n) [D07-S5].
- ⚠️ Layout: the two recursive calls are printed level with "if", but they belong to the then-branch. q only exists after PARTITION has run.
- The bottom of the slide lists the **Versions Of Quick sort**: Randomized Quick sort, and Median of 3 Partition.

### [D07-S5] PARTITION + example ⭐
```
PARTITION (A,p,r)
 x=A[r]
 i ← p -1
 For  j ← p to r-1
      do if A[j] <= x
            then i ← i + 1
                 exchange A[i] <-> A[j]
 Exchange A[i+1] <-> A[r]
 Return i+1
```
- **How it works.** The pivot is x = A[r], the **last** element.
  - i starts at p−1, meaning that no element ≤ x has been placed yet.
  - j scans from p to r−1. Each time A[j] ≤ x, i moves up one place and A[j] is swapped into position i.
  - At the end, the pivot is swapped into position i+1, and q = i+1 is returned.
  - Afterwards everything left of q is ≤ x and everything right of q is > x.
- **Scheme.** This single left-to-right scan with the pivot taken from the end is the scheme usually called **Lomuto-style**. The slides never use that name. 🔎 Look up in Track B: "Lomuto vs Hoare partition".
- **Same procedure in the assignment.** The professor's [A2] sample solution uses exactly this procedure (§5.9).
- **Cost.** The for-loop makes exactly r − p comparisons (`A[j] <= x`), which is Θ(n) for n elements. [D07-S12] calls this "the partitioning cost Θ(n)".
- **Slide example:** 5 7 6 1 3 2 4, starting with QUICKSORT(A, 1, 7). The slide gives no worked answer; this is the verified run, with the full j-by-j trace in §5.2.

| Call | Pivot x | Array after the call | q |
|---|---|---|---|
| PARTITION(A,1,7) | 4 | 1 3 2 **4** 7 6 5 | 4 |
| PARTITION(A,1,3) | 2 | 1 **2** 3 4 7 6 5 | 2 |
| PARTITION(A,5,7) | 5 | 1 2 3 4 **5** 6 7 | 5 |
| PARTITION(A,6,7) | 7 | 1 2 3 4 5 6 **7** | 7 |

- The array is sorted: 1 2 3 4 5 6 7.
- 4 PARTITION calls make 6 + 2 + 2 + 1 = 11 comparisons in total.
- 4 happens to be the median of the seven values, so the first split is perfectly balanced (3 | 3).

### [D07-S6] Versions Of Quick sort — Randomized Quick sort ⭐
```
RANDOMIZED-QUICKSORT(A, p, r)
if  p< r
   then q ← RANDOMIZED-PARTITION(A, p, r)
 RANDOMIZED-QUICKSORT(A, p, q–1)
   RANDOMIZED-QUICKSORT(A, q+1, r)

RANDOMIZED-PARTITION (A, p, r)
 i ← RANDOM (p, r)
 exchange A[r] <-> A[i]
 return PARTITION (A, p, r)
```
- "RANDOM(a,b) returns a random integer in the range (a,b) i.e. (b-a+1) integers."
- **Idea:** pick a random index, swap that element into the last slot, then run the ordinary PARTITION, which always uses A[r] as the pivot.
- ⚠️ Here "(a,b)" includes both ends, which is why it counts b − a + 1 integers. For example, RANDOM(1,7) can return any of 1, 2, …, 7, so 7 values.
- ⚠️ As on S4, the two recursive calls belong to the then-branch.
- 🔎 Look up in Track B: the expected running time of randomized quicksort. The slides give pseudocode only.

### [D07-S7] Median Method V2 – Quick Sort (rules)
Partition:
1. Choose a random pivot element
2. swap it with last index element
3. (for i) proceed from left (i++) till elements are less than pivot [also (i<j)]
4. (for j) proceed from right (j--) till elements are more than pivot [also (i<j)]
5. exchange i & j elements when condition is unsatisfied [keeping (i<j)]
6. for (i>j) swap i with last element

- **How it works.** This is a **two-pointer** scheme:
  - i moves right past elements smaller than the pivot;
  - j moves left past elements larger than the pivot;
  - when both have stopped, the two out-of-place elements are swapped;
  - when the pointers cross, A[i] is swapped with the pivot sitting in the last slot.
  - This style is usually called **Hoare-style**. 🔎 Look up in Track B: the name and the exact boundary rules.
- ⚠️ The rules are loose. Rules 3–4 keep i < j, yet rule 6 talks about i > j. Read them as: once the scans meet or cross, swap the element at i with the last element (the pivot). Both readings give the same result on the slide example and on every V2 problem in these notes.
- ⚠️ Despite the name "Median *Method*", rule 1 picks the pivot at random and no median is computed.

### [D07-S8] Median Method V2 – example ⭐
The slide repeats the six rules and gives the example **5 7 6 1 3 2 4**, with no worked answer. The trace below takes the pivot as 4, which is already last, so rule 2 changes nothing. 4 is also the median of the values.

| Round | i stops at (value) | j stops at (value) | Action | Array |
|---|---|---|---|---|
| start | 1 | 6 | pivot 4 sits at position 7 | 5 7 6 1 3 2 4 |
| 1 | 1 (5 ≥ 4) | 6 (2 ≤ 4) | i < j → exchange | 2 7 6 1 3 5 4 |
| 2 | 2 (7) | 5 (3) | exchange | 2 3 6 1 7 5 4 |
| 3 | 3 (6) | 4 (1) | exchange | 2 3 1 6 7 5 4 |
| 4 | 4 (6) | 3 (1), so the pointers have crossed | i > j → swap A[i] with last | 2 3 1 **4** 7 5 6 |

- The pivot 4 ends at position 4, with {2, 3, 1} < 4 on its left and {7, 5, 6} > 4 on its right.
- **Compare with PARTITION [D07-S5]** on the same array: it gives 1 3 2 4 7 6 5. Same q = 4, different order on each side.

### [D07-S9] MEDIAN-OF-3-PARTITION ⭐
```
Median-of-3-Partition (A, p, r)
i ← RANDOM (p, r)
j ← RANDOM (p, r)
k ← RANDOM (p, r)

if(A[i]<=A[j] and A[j]<=A[k]) or (A[k]<=A[j] and A[j]<=A[i])
    then l ← j
else if  if(A[j]<=A[i] and A[i]<=A[k]) or (A[k]<=A[i] and A[i]<=A[j])
    then l ← i
else if (A[i]<=A[k] and A[k]<=A[j]) or (A[j]<=A[k] and A[k]<=A[i])
    then l ← k

exchange A[r] <-> A[l]
return PARTITION (A, p, r)
```
- **Idea:** pick three random positions and let l be the index of the **middle value** of A[i], A[j], A[k]. j is tested first, then i, then k. Swap A[l] to the end, then run the ordinary PARTITION.
- Slide text: "This approach tends to choose the pivot value as median of 3 elements selected randomly. In general this algorithm gives very good results except for few cases."
- ⚠️ "else if  if(" has a stray second "if". Read it as "else if (".

### [D07-S10] Median-of-3-Partition — the worst sequence ⭐
- Slide text:
  - "Generally, with any value of i, j, k it will dilute the worst sequence."
  - "Consider any worst case sequence: **23, 67, 12, 89, 34, 95**."
- **Why it is bad for plain PARTITION:** the last element, 95, is the largest. PARTITION(A,1,6) leaves every other element to its left, a **5 : 0 split**, which is the unbalanced case of [D07-S12].
- **With median-of-3**, take for example i=1, j=2, k=5:
  - the values are 23, 67 and 34, so the median is 34 and l = k = 5;
  - exchange A[6]↔A[5] → 23 67 12 89 95 34;
  - PARTITION → 23 12 **34** 89 95 67, with q = 3, a 2 : 3 split. Full trace in §5.4.
- **Counting all 6·6·6 = 216 choices of (i, j, k)** with the slide's code:
  - the pivot is the extreme value 95 in only 16 choices, and 12 in another 16;
  - the other 184 choices give a 1 : 4 split or better.
  - That is the "dilution". The 32 extreme choices are the "few cases" of [D07-S9].

### [D07-S11] Performance of Quick Sort ⭐
- It depends on whether partitioning is **balanced or unbalanced**:
  - if it is **balanced**, it runs asymptotically **as fast as merge sort**;
  - if it is **unbalanced**, it runs asymptotically **as slow as insertion sort**.

### [D07-S12] Worst Case Partitioning ⭐
- The worst case happens when partitioning produces one sub-problem with **n−1** elements and one with **zero** elements.
- Assume unbalanced partitioning. The partitioning costs **Θ(n)** time.
- The recurrence for the running time:
  ```
  T(n) = T(n−1) + T(0) + Θ(n)
       = T(n−1) + Θ(n)
  ```
  "Using recurrence Method we get" **Θ(n²)**.
- ⭐ **Note:** this occurs when the **input array is already sorted**, which is the best-case condition for insertion sort.
- **Cross-reference:** this is the form "n + T(n−1) ⇒ O(n²)" in the class list for decreasing functions, Master theorem case a = 1 [D05-S4].
- **Demo** with sorted input 1 2 3 4 5 6:
  - every PARTITION takes the largest value as pivot and fixes it at the end;
  - the splits are 5:0, 4:0, 3:0, 2:0 and 1:0;
  - total comparisons = 5+4+3+2+1 = 15 = n(n−1)/2.

### [D07-S13] Best Case Partitioning ⭐
- The recurrence for the running time: **T(n) ≤ 2T(n/2) + Θ(n)**.
- "Using Main recurrence theorem we get **T(n) = Θ(n log n)**."
- ⚠️ "Main recurrence theorem" means the **Master theorem**. Deck 08 solves the same recurrence "By masters theorem" [D08-S11].
  - Here a = 2, b = 2, k = 1, p = 0, so a = bᵏ and p > −1.
  - That gives Θ(n^(log₂2) · log n) = Θ(n log n) [D05-S5].

### [D07-S14] Splits in a ratio, and alternating splits
- When the partitioning splits in **some ratio**: T(n) = Θ(n log n).
- When the partitioning **alternates between best and worst** splits: T(n) = Θ(n log n).
- 🔎 Look up in Track B: how these two results are derived. The slide gives the results only.

### [D07-S15] Median as pivot — question
- "The median of 'n' elements can be found in O(n) time. What is the complexity of quicksort, in which medium is selected as pivot?"
- The working is hidden under a blue box on this slide and revealed on S16. The hidden version ends "= Θ(n log n)".

### [D07-S16] Median as pivot — answer ⭐
- The cost parts are: finding the median + swapping it with the last (pivot) position + partitioning + dividing into equal halves.
```
T(n) = O(n) + O(1) + O(n) + 2T(n/2)
     = O(n) + 2T(n/2)
     = O(n log n)
```
- ⚠️ "medium" should read **median**.
- 🔎 Look up in Track B: how the median is found in O(n). The slide takes it as given.

### [D07-S17] (n/4)-th smallest as pivot — question
- "In quick sort, for sorting 'n' elements, the (n/4)th smallest element is selected as pivot using O(n) time algorithm. What is the worst case complexity of quick sort?"
- The working is hidden under a box and revealed on S18.

### [D07-S18] (n/4)-th smallest as pivot — answer ⭐
- The cost parts are: selecting the element + swapping it with the pivot position + partition + two partitions "in ration 1:4".
```
T(n) = O(n) + O(1) + O(n) + T(n/4) + T(3n/4)
     = O(n) + Θ(n log n)
     = Θ(n log n)
```
- ⚠️ "ration" should read **ratio**. The two parts hold n/4 and 3n/4 elements, which is a 1 : 3 split (one quarter against three quarters). Read the slide's "1:4" as "one-fourth".
- **Lesson:** a lopsided split stays Θ(n log n) as long as it is a fixed proportion. This matches "some ratio" on [D07-S14].
- 🔎 Look up in Track B: the recursion-tree working for T(n/4) + T(3n/4) + O(n). Deck 04 lists the recursion-tree method as a technique [D04-S2] but this slide doesn't show the working.

### [D07-S19] T1 vs T2 — question
- "Let T1 and T2 be the time taken partitioning the following sequences": 1, 2, 3, 4, 5, …, n takes T1, and n, n−1, n−2, …, 1 takes T2. "Find the relation between T1 and T2?"
- The answer is hidden on this slide.

### [D07-S20] T1 vs T2 — answer ⭐
- **Ans: T1 = T2** (bold on the slide).
- **Check with the slide's PARTITION:**
  - A single PARTITION call makes n−1 comparisons on either input.
  - The whole QUICKSORT makes n(n−1)/2 comparisons on both inputs (tested for n = 5, 6, 8 and 10).
  - Sorted input always takes the largest value as pivot. Reversed input takes the smallest and the largest in turn.
  - Either way every split is (k−1) : 0, the worst case of [D07-S12]. Both traces are in §5.5.

### [D07-S21] Space Complexity ⭐
- Space complexity is "defined by number of levels in recursive tree":
  - for a **balanced** partition it is **O(log n)**;
  - for an **unbalanced** partition it is **O(n)**.

### [D07-S22] Video lectures
- Divide And Conquer Strategy of problem Solving: https://youtu.be/HO4B-kG_6Ag
- Quick Sort Analysis: https://youtu.be/LPE9xYEsfIU
- Quick Sort Analysis for various partitioning scenarios: https://youtu.be/gCP06CTpEaE
- Understanding Space Complexity: https://youtu.be/HEZdrU8ZPIk
- https://cexpertvision.com/2020/10/18/comparison-based-sorting-ca/

---

## Deck 08 — Merge Sort Analysis (20 slides)

### [D08-S1] MERGE SORT ANALYSIS
- Title slide.

### [D08-S2] Divide and Conquer
- Same text and the same `Solve(I)` pseudocode as [D07-S3]: divide → conquer (solve recursively) → combine.
- ⚠️ Same missing ellipses: "I1, , Ik" should read I1, …, Ik.

### [D08-S3] Mergesort: Using Divide and Conquer — Mergesort Strategy
- Diagram:
  1. An array runs from "first" to "last". An arrow marks the split point ⌊(first + last)/2⌋.
  2. Each half goes down an arrow labelled "Sort recursively by Mergesort", giving two "Sorted" halves.
  3. Two arrows labelled "Merge" join them into one "Sorted" array.

### [D08-S4] Using Divide and Conquer: Mergesort — Mergesort Strategy
- Coloured-bar diagram, with a thumbnail of S3 in the corner:
  - **Division phase:** 1 bar → 2 halves → 4 quarters → 8 single cells.
  - **Merge phase:** the 8 cells merge in pairs → 4 bars → 2 bars → 1 bar.
- For 8 elements that is 3 levels of halving and 3 levels of merging, since log₂8 = 3. These are the "log n levels" used in [D08-S13].

### [D08-S5] Algorithm: Mergesort ⭐
- **Input:** array A and the indexes first (p) and last (r).
- **Output:** A[first], …, A[last] is a sorted rearrangement of the same elements.
```
MERGESORT(A, p, r)
if  p< r
   then q← floor[(p+r)/2]
        MERGESORT(A, p, q)
   MERGESORT(A, q+1, r)
     MERGE(A,p,q,r)
```
- **The split.** The left half is A[p..q] and includes the middle element. The right half is A[q+1..r].
  - When the size is odd, the left half is the bigger one: p=1, r=7 gives q=4, so 4 + 3; p=1, r=3 gives q=2, so 2 + 1.
  - The professor's [A2] sample splits 9 7 2 | 15 32 10, then 9 7 | 2 and 15 32 | 10.
- ⚠️ As on [D07-S4], all three lines after "then" belong to the then-branch, whatever their printed indentation.

### [D08-S6] MERGE(A,p,q,r) – Merging Sorted Sequences ⭐
- **Problem:** given two sequences A and B sorted in nondecreasing order, merge them into one sorted sequence C. Here A and B just name the two sequences; they are not the array A of MERGE(A,p,q,r).
- **Strategy:** determine the first item of C.
  - It is the minimum of the first items of A and B.
  - Suppose it is A's first item. Then the rest of C is the merge of the rest of A with B.
- **Example:** A (12, 34, 38, 78), B (2, 56, 87, 90, 98) → C (2, 12, 34, 38, 56, 78, 87, 90, 98).
- **Step by step**, comparing the two front items each time:
  - 12 vs 2 → 2
  - 12 vs 56 → 12
  - 34 vs 56 → 34
  - 38 vs 56 → 38
  - 78 vs 56 → 56
  - 78 vs 87 → 78
  - A is now empty, so copy 87, 90, 98.
  - That is 6 comparisons for 9 items (§5.6).

### [D08-S7] Example of Merge Sort (textbook table) ⭐
- The slide is a photo of a textbook table for **85 24 63 45 17 31 96 50**, with the MERGESORT pseudocode and the S4 bars laid over it.
- Row labels: "MS" means a MERGESORT call, "Div" means divide, "Merge" means merge. The number is the recursion level.

Rows visible on the slide:

| Row | Content |
|---|---|
| 0 MS | 85 24 63 45 17 31 96 50 |
| 1 Div | 85 24 63 45 ‖ 17 31 96 50 |
| 1 MS | 85 24 63 45 |
| 2 Div | 85 24 ‖ 63 45 |
| 2 MS | 85 24 |
| 3 Div | 85 ‖ 24 |
| 3 MS | 85 |
| 3 MS | 24 |
| 3 Merge | 24 85 |
| 2 MS | 63 45 |
| 3 Div | 63 ‖ 45 |
| 3 MS | 63 |
| 3 MS | 45 |
| 3 Merge | 45 63 |
| 2 Merge | 24 45 63 85 |

- The photo is cut off at this point; the right half, 17 31 96 50, is still shown greyed out.
- Completing it the same way (verified): 17 31 and 50 96 are merged into 17 31 50 96. The final merge gives **17 24 31 45 50 63 85 96**. The full table is in §5.7.

### [D08-S8] Merge(A,p,q,r) — pseudocode ⭐
```
Merge(A,p,q,r)
{
n1=q – p + 1
n2=r - q
Let L[1..n1] & R[1..n2] be new array
for ( i= 0 to n1-1 )
      L[i]= A[p+i]
for ( j= 0 to n2-1 )
      R[j]= A[(q+1)+j]

i=0, j=0
for ( k= p to r )
if (L[i]  <= R[j])
      A[k] = L[i]
      i =i +1
else
      A[k] = R[j]
      j=j+1

}
```
- **How it works.**
  - Copy the left run A[p..q] into L (n1 items) and the right run A[q+1..r] into R (n2 items).
  - Then refill A[p..r] from left to right, using k. Each time, take the smaller of the two front items L[i] and R[j].
  - Because the test is `<=`, a tie takes the item from L.
- The if/else is the body of the `for k` loop, so exactly one item is placed for each k.
- ⚠️ **Index base:** the slide declares L[1..n1] and R[1..n2], but then fills and reads L[0..n1−1] and R[0..n2−1].
- ⚠️ **Missing rule:** once L or R is used up, L[i] or R[j] no longer exists, and the slide doesn't say what to do.
  - In every trace in these notes, the rest of the other list is copied in order. That is the "merge the rest" strategy of [D08-S6].
  - 🔎 Look up in Track B: how the textbook version handles an exhausted list (for example, sentinel values).

### [D08-S9] MERGE SORT ANALYSIS ⭐
- The slide shows Merge (same code as S8) and MERGESORT side by side.
- An arrow points from Merge(A,p,q,r) to **O(n)**.
- **Total Cost = Divide + conquer + merge:**
  - T(n) = C1 + 2T(n/2) + Cn ∈ **O(n log n)**
- In the image the symbol before O(n log n) is an empty box. In the .pptx it is the Symbol-font "∈".

### [D08-S10] Space Complexity ⭐
- **Calculation of stack size:** "In general, ***stack size will be levels in a tree***, which is (log n)." (underlined on the slide)
- **Memory requirement:**
  - each merge-sort call consumes O(log n);
  - Merge consumes O(n);
  - total space requirement = O(log n) + O(n) = **O(n)**.
- Merge sort is called an **out-of-space / out-place** algorithm because it needs an extra array to do partial processing. The extra space it uses depends on the input size.
- It needs 'n' extra cells to copy elements from two sorted arrays into one, so each merge needs O(n) memory. Since this memory is **reused** 'log n' times, the **effective memory requirement is O(n)**.

### [D08-S11] Time Complexity ⭐
- Divide n Conquer notation: **[T(n) = Divide + Recursion + Merge]**
```
T(n) = O(1) + T(n/2) + T(n/2) + O(n)
     = (n) + 2 T(n/2)   [By masters theorem]
     = Θ( n log n)
```
- ⭐ Highlighted on the slide: "**There is no worst scenario as it works same for ascending or descending order.**" This matches [D06-S3], which lists merge sort as **non-adaptive**.
- ⚠️ In "= (n) + 2T(n/2)" the O is missing; it should read O(n) + 2T(n/2).
- **Master theorem check** [D05-S5]: a = 2, b = 2, k = 1, p = 0, so a = bᵏ and p > −1. That gives Θ(n log n).

### [D08-S12] Calculate the cost — question
- "Given n elements, merge them using merge procedure to get one sorted list of n elements."

### [D08-S13] Calculate the cost — answer ⭐
- Each merge procedure (merging two sorted lists into one and moving to the next higher level) costs **O(n)** per level.
- Total levels to reach one sorted list = **log n**.
- ➔ Total time = O(n) · log n = **O(n log n)**.

### [D08-S14] log n sorted lists of size n/log n — question
- "Given 'log n' sorted list each of size 'n/log n', what is the total time required to merge them into single sorted list?"

### [D08-S15] log n sorted lists — answer ⭐
The slide's two-column table:

| Normal merge sort | This question |
|---|---|
| n elements of size 1: one level costs n·1 = O(n) | (log n) lists of size n/log n: one level costs (log n)·n/(log n) = O(n) |
| for n elements there are **log n** levels | for (log n) lists there are **log (log n)** levels |
| total = cost of merge at each level × total levels = O(n) · log n = **O(n log n)** | total = O(n) · log(log n) = **O(n log(log n))** |

- ⚠️ Wording: "N elements" means n. "(log n) elements each of size n/logn" means log n sorted *lists*.

### [D08-S16] n strings of length n — question
- "'n' strings each of length 'n' are given. What will be the time taken to sort them?"

### [D08-S17] n strings — answer ⭐
- Cost of merging n elements of size 1 = O(n).
- So merging n strings, each of size n, costs O(n) · O(n) = **O(n²)** per level.
- Total levels = (log n).
- So the total cost is T(n) = O(n²) · log n = **O(n² log n)**.
- 🔎 Look up in Track B: why comparing two strings counts as O(n). The slide simply treats each item as having size n.

### [D08-S18] Base case of size k — question
- "Assume that size k problem could be independently solved (instead of 1). n numbers (k<n) to be sorted. Compute the running time of Merge sort?"

### [D08-S19] Base case of size k — answer ⭐
- Number of pieces of size k to be merged: (n/k).
- Cost of merging at each level = O(n).
- Total number of levels = log (n/k).
- ➔ Total cost = O(n) · log(n/k) = **O(n log(n/k))**.
- ⚠️ The second bullet on the slide says "k elements of size (n/k)", which swaps the first bullet's "n/k pieces of size k". The cost per level is O(n) either way.
- 🔎 Look up in Track B: whether to add the cost of solving the n/k base pieces themselves. The slide counts only the merging.

### [D08-S20] Video lectures
- Quick Sort Analysis for various partitioning scenarios: https://youtu.be/gCP06CTpEaE
- Merge Sort Algorithm: https://www.youtube.com/watch?v=RH0p7DYyMn4
- Merge Procedure illustrative Example: https://www.youtube.com/watch?v=WzDq-WQALy0
- Understanding Space Complexity: https://youtu.be/HEZdrU8ZPIk
- Merge Sort Complexity Analysis: https://www.youtube.com/watch?v=x1dJx89Elf0
- https://cexpertvision.com/2020/10/18/comparison-based-sorting-ca/
- In the image, this URL is printed on top of the "Merge Sort Complexity Analysis" line. The text is complete in the source file.

---

## 3. Definitions & key terms

| Term | Meaning as taught | Ref |
|---|---|---|
| Sorting | "arranging elements of set into order" | [D06-S1] |
| Comparison / non-comparison based sorting | Only examples are given: insertion, merge, bubble and quick are comparison-based; bucket, radix and counting are not. | [D06-S3] |
| Internal / External sorting | Only examples are given: bubble and insertion are internal; quick and merge are external. 🔎 Look up the definitions in Track B. | [D06-S3] |
| Stable / Unstable sorting | Only examples are given: merge, insertion and bubble are stable; quick, heap and selection are unstable. 🔎 Look up the definition in Track B. | [D06-S3] |
| Adaptive / Non-adaptive sorting | The slide's gloss is "i.e. sorted or unsorted data": the existing order of the input matters. Insertion sort (Ω(n) on sorted input against O(n²) on reversed [D06-S8]) and quicksort (worst on sorted input [D07-S12]) are adaptive. Merge sort "works same for ascending or descending order" [D08-S11], so it is non-adaptive. 🔎 Look up the formal definition in Track B. | [D06-S3] |
| In-place / Out-place (out-of-space) | An out-place algorithm "needs extra array to do partial processing", and its extra space depends on the input size. Among the comparison sorts listed, only merge sort is out-place. | [D06-S3], [D08-S10] |
| Divide and Conquer | **Divide** into smaller instances of the same problem, **conquer** them recursively, **combine** the solutions. Template: `Solve(I)`. | [D07-S3], [D08-S2] |
| Divide n Conquer notation | T(n) = Divide + Recursion + Merge | [D08-S11] |
| Incremental (stepwise) approach / decrease-and-conquer | Insertion sort's strategy: insert one element at a time into the growing sorted part. | [D06-S5] notes |
| Sorted segment, key (x), vacancy | The sorted prefix; the element being inserted; the gap left after pulling x "out of the way". | [D06-S5], [D06-S7] |
| F(n) | The insertion sort count of comparisons/movements: 1 + 2 + … + (n−1) = n(n−1)/2 | [D06-S8] |
| Pivot | The element PARTITION splits around. It is x = A[r], the last element. Other versions first swap their chosen element into A[r]. | [D07-S5], [D07-S6], [D07-S9] |
| PARTITION / q | PARTITION rearranges A[p..r] around the pivot and returns the pivot's final index q = i+1. | [D07-S5] |
| Balanced / unbalanced partitioning | Balanced: quicksort runs as fast as merge sort. Unbalanced: as slow as insertion sort. | [D07-S11] |
| Worst-case partitioning | One sub-problem with n−1 elements and one with 0 elements. | [D07-S12] |
| Best-case partitioning | Two halves: T(n) ≤ 2T(n/2) + Θ(n). | [D07-S13] |
| RANDOM(a,b) | Returns a random integer among the b−a+1 integers from a to b. | [D07-S6] |
| Randomized partition | Swap A[RANDOM(p,r)] into A[r], then run PARTITION. | [D07-S6] |
| Median-of-3 partition | The pivot is the middle value of three randomly chosen elements. | [D07-S9] |
| Median Method V2 | A partition with a random pivot and two pointers (i from the left, j from the right). | [D07-S7] |
| MERGE | Merging two sequences sorted in nondecreasing order into one sorted sequence. It costs O(n). | [D08-S6], [D08-S9] |
| Level (of the recursion tree) | Merge sort has log n levels [D08-S13]. Space = "number of levels in recursive tree" [D07-S21]. "Stack size will be levels in a tree" [D08-S10]. | as cited |
| Cost recipe | Total cost = cost of merge at each level × total levels. | [D08-S15] |
| W(n), best case | The worst-case and best-case running times used in the insertion sort analysis. | [D06-S8] |
| Recurrence method / "Main recurrence theorem" | The ways the slides solve T(n). "Main recurrence theorem" means the Master theorem [D08-S11], [D05]. | [D07-S12], [D07-S13] |

---

## 4. Algorithm cards as taught

### Card A — Insertion sort [D06]
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
| Field | As taught |
|---|---|
| Idea | Grow a sorted segment from the left. Pull out the next element x, shift the larger sorted elements right, and put x in the vacancy [D06-S5]. |
| Best case | **Ω(n)**, when the input is already sorted in ascending order [D06-S8]. Checked: n−1 comparisons, 0 shifts. |
| Worst case | **O(n²)**, when the input is in reversed order. F(n) = 1+2+…+(n−1) = **n(n−1)/2** comparisons/movements [D06-S8]. |
| Average case | Not on the slides. 🔎 Look up in Track B. |
| Recurrence | None on the slides. The speaker notes call it decrease-and-conquer. 🔎 Look up in Track B. |
| Stable? | **Yes** [D06-S3] |
| In-place? | **Yes**: among the comparison sorts listed, only merge sort is out-place [D06-S3]. |
| Other labels | Comparison-based, internal, adaptive [D06-S3]. |
| Improvements | Binary search cuts comparisons; a doubly linked list cuts movement. Neither makes the total better than O(n²) [D06-S9]. |

### Card B — Quicksort with PARTITION [D07-S4, S5]
```
QUICKSORT(A, p, r)
if  p< r
   then q←PARTITION(A, p, r)
QUICKSORT(A, p, q–1)
QUICKSORT(A, q+1, r)

PARTITION (A,p,r)
 x=A[r]
 i ← p -1
 For  j ← p to r-1
      do if A[j] <= x
            then i ← i + 1
                 exchange A[i] <-> A[j]
 Exchange A[i+1] <-> A[r]
 Return i+1
```
| Field | As taught |
|---|---|
| Idea | Partition around the pivot A[r], so that values ≤ pivot end up left of q and values > pivot end up right. Then recurse on both sides. Nothing is left to combine. |
| Partition scheme | Pivot taken from the end, one left-to-right scan with a boundary index i. This is the style usually called **Lomuto** (the name is not on the slides). Each call makes r − p comparisons. |
| Best case | **Θ(n log n)** from T(n) ≤ 2T(n/2) + Θ(n), by the "Main recurrence" (Master) theorem [D07-S13]. |
| Worst case | **Θ(n²)** from T(n) = T(n−1) + T(0) + Θ(n) = T(n−1) + Θ(n) [D07-S12]. It happens on an **already sorted** input. Sorted and reverse-sorted inputs take the same time: T1 = T2 [D07-S20]. |
| Other splits | A split in some ratio: Θ(n log n). Alternating best and worst splits: Θ(n log n) [D07-S14]. Median as pivot, found in O(n): O(n log n) [D07-S16]. The (n/4)-th smallest as pivot: Θ(n log n) [D07-S18]. |
| Average case | The slides don't use the word "average". 🔎 Look up in Track B. |
| Space | "Number of levels in recursive tree": **O(log n)** when balanced, **O(n)** when unbalanced [D07-S21]. |
| Stable? | **No**, it is listed as unstable [D06-S3]. |
| In-place? | **Yes**: only merge sort is out-place among the comparison sorts listed [D06-S3]. |
| Other labels | Comparison-based, adaptive, and "external" as the slide lists it [D06-S3]. |

### Card C — Randomized quicksort [D07-S6]
```
RANDOMIZED-PARTITION (A, p, r)
 i ← RANDOM (p, r)
 exchange A[r] <-> A[i]
 return PARTITION (A, p, r)
```
- **Idea:** a random element becomes the pivot by being swapped into A[r]. RANDOMIZED-QUICKSORT is QUICKSORT with RANDOMIZED-PARTITION in place of PARTITION.
- **Complexity, stability and in-place:** not stated on the slides. 🔎 Look up in Track B.

### Card D — Median-of-3 partition [D07-S9, S10]
- **Pseudocode:** see [D07-S9] in §2.
- **Idea:** l is the index of the middle value of three random positions. Exchange A[r] ↔ A[l], then PARTITION.
- **Claim on the slides:** "very good results except for few cases"; it "dilute[s] the worst sequence".
- **Complexity formula:** not on the slides. 🔎 Look up in Track B.

### Card E — Median Method V2 partition [D07-S7, S8]
- **Rules:**
  1. random pivot;
  2. swap it to the last index;
  3. i moves right while the elements are smaller than the pivot;
  4. j moves left while the elements are larger;
  5. when both stop with i < j, exchange them;
  6. once the pointers cross, swap A[i] with the last element.
- **Style:** two-pointer, usually called Hoare-style (the name is not on the slides).
- **Complexity:** not stated. 🔎 Look up in Track B.

### Card F — Merge sort with MERGE [D08-S5, S8]
```
MERGESORT(A, p, r)
if  p< r
   then q← floor[(p+r)/2]
        MERGESORT(A, p, q)
   MERGESORT(A, q+1, r)
     MERGE(A,p,q,r)
```
(MERGE as on [D08-S8], in §2.)

| Field | As taught |
|---|---|
| Idea | Split at the midpoint q = ⌊(p+r)/2⌋, sort A[p..q] and A[q+1..r] recursively, then MERGE the two sorted runs [D08-S3, S5]. |
| MERGE cost | **O(n)** [D08-S9] |
| Recurrence | T(n) = O(1) + T(n/2) + T(n/2) + O(n) = O(n) + 2T(n/2) [D08-S11]. Also written T(n) = C1 + 2T(n/2) + Cn [D08-S9]. |
| Best = worst | **Θ(n log n)** by the Master theorem. "There is no worst scenario as it works same for ascending or descending order" [D08-S11]. |
| Average case | Not stated separately. The same Θ(n log n) applies whatever the order, per [D08-S11]. |
| Space | Stack O(log n) + merge O(n) = **O(n)**. The merge memory is reused log n times, so the effective requirement is O(n) [D08-S10]. |
| Stable? | **Yes** [D06-S3]. 🔎 Look up in Track B: how the `<=` in MERGE relates to stability. |
| In-place? | **No**: out-place (out-of-space), because it needs an extra array [D06-S3], [D08-S10]. |
| Other labels | Comparison-based, external, non-adaptive [D06-S3]. |
| Cost variants | log n lists of size n/log n: O(n log log n) [D08-S15]. n strings of length n: O(n² log n) [D08-S17]. Base case of size k: O(n log(n/k)) [D08-S19]. |

### Side-by-side summary (only what the slides state)

| | Insertion | Quick | Merge |
|---|---|---|---|
| Best | Ω(n), already sorted | Θ(n log n), balanced | Θ(n log n) |
| Worst | O(n²), reversed | Θ(n²), already sorted | Θ(n log n): "no worst scenario" |
| Key recurrence | – | T(n−1)+Θ(n) and 2T(n/2)+Θ(n) | 2T(n/2)+O(n) |
| Extra space | – (in-place) | O(log n) balanced / O(n) unbalanced | O(n) |
| Stable | yes | no | yes |
| In-place | yes | yes | no (out-place) |
| Adaptive | yes | yes | no |

---

## 5. Worked traces

Every trace below was produced by running the slide pseudocode exactly as written (1-indexed). The only addition is the "list used up" rule in MERGE, explained at [D08-S8].

### 5.1 [D06-S6/S7] Insertion sort on 7, -5, 2, 16, 4

| j | key | while-loop steps (`A[i] > key` checks) | A[i+1] = key | Array after pass | comps | shifts |
|---|---|---|---|---|---|---|
| 2 | -5 | i=1: 7 > -5 → A[2]=7, i=0 · i=0 stops the loop (left boundary) | A[1] = -5 | -5 7 2 16 4 | 1 | 1 |
| 3 | 2 | i=2: 7 > 2 → A[3]=7, i=1 · i=1: -5 > 2? no → stop | A[2] = 2 | -5 2 7 16 4 | 2 | 1 |
| 4 | 16 | i=3: 7 > 16? no → stop | A[4] = 16 | -5 2 7 16 4 | 1 | 0 |
| 5 | 4 | i=4: 16 > 4 → A[5]=16, i=3 · i=3: 7 > 4 → A[4]=7, i=2 · i=2: 2 > 4? no → stop | A[3] = 4 | **-5 2 4 7 16** | 3 | 2 |

Totals: **7 comparisons, 4 shifts**. For n = 5, the worst case would be F(5) = 10 and the best case 4.

### 5.2 [D07-S5] QUICKSORT(A, 1, 7) on 5 7 6 1 3 2 4

**PARTITION(A,1,7):** x = A[7] = 4, i = 0

| j | A[j] | A[j] ≤ 4? | i | exchange | Array |
|---|---|---|---|---|---|
| 1 | 5 | no | 0 | – | 5 7 6 1 3 2 4 |
| 2 | 7 | no | 0 | – | 5 7 6 1 3 2 4 |
| 3 | 6 | no | 0 | – | 5 7 6 1 3 2 4 |
| 4 | 1 | yes | 1 | A[1]↔A[4] | 1 7 6 5 3 2 4 |
| 5 | 3 | yes | 2 | A[2]↔A[5] | 1 3 6 5 7 2 4 |
| 6 | 2 | yes | 3 | A[3]↔A[6] | 1 3 2 5 7 6 4 |
| end | | | | A[i+1]↔A[r] = A[4]↔A[7] | 1 3 2 **4** 7 6 5, **q = 4** |

**QUICKSORT(A,1,3) → PARTITION(A,1,3):** x = A[3] = 2, i = 0

| j | A[j] | ≤ 2? | i | exchange | A[1..3] |
|---|---|---|---|---|---|
| 1 | 1 | yes | 1 | A[1]↔A[1] (itself) | 1 3 2 |
| 2 | 3 | no | 1 | – | 1 3 2 |
| end | | | | A[2]↔A[3] | 1 **2** 3, **q = 2** |

QUICKSORT(A,1,1) and QUICKSORT(A,3,3) have p = r, so there is nothing to do.

**QUICKSORT(A,5,7) → PARTITION(A,5,7):** x = A[7] = 5, i = 4

| j | A[j] | ≤ 5? | i | exchange | A[5..7] |
|---|---|---|---|---|---|
| 5 | 7 | no | 4 | – | 7 6 5 |
| 6 | 6 | no | 4 | – | 7 6 5 |
| end | | | | A[5]↔A[7] | **5** 6 7, **q = 5** |

QUICKSORT(A,5,4) is empty. **QUICKSORT(A,6,7) → PARTITION(A,6,7):** x = 7, i = 5. At j=6, 6 ≤ 7, so i=6 and A[6] is exchanged with itself. The final exchange A[7]↔A[7] is also with itself, giving 6 **7** and **q = 7**.

Recursion tree:
```
QS(1,7) q=4
├── QS(1,3) q=2
│   ├── QS(1,1)
│   └── QS(3,3)
└── QS(5,7) q=5
    ├── QS(5,4)  empty
    └── QS(6,7) q=7
        ├── QS(6,6)
        └── QS(8,7)  empty
```
Result: **1 2 3 4 5 6 7**, after 4 PARTITION calls and 6 + 2 + 2 + 1 = **11 comparisons**.

### 5.3 [D07-S8] Median Method V2 on 5 7 6 1 3 2 4, with pivot 4

Rules 1–2: the pivot 4 is already at the last index (7). i starts at 1 and j at 6.
1. i: A[1]=5 is not < 4, so i stops at 1. j: A[6]=2 is not > 4, so j stops at 6. i < j, so exchange → **2 7 6 1 3 5 4**.
2. i: A[2]=7 stops it at 2. j: A[5]=3 stops it at 5. Exchange → **2 3 6 1 7 5 4**.
3. i: A[3]=6 stops it at 3. j: A[4]=1 stops it at 4. Exchange → **2 3 1 6 7 5 4**.
4. i: A[3]=1 < 4, so i moves to 4; A[4]=6 stops it. j: A[4]=6 > 4, so j moves to 3; A[3]=1 stops it. Now i = 4 > j = 3, so rule 6 swaps A[4] with A[7] → **2 3 1 4 7 5 6**.

The pivot is at position 4, with all smaller values to its left and all larger values to its right.

### 5.4 [D07-S10] 23, 67, 12, 89, 34, 95: plain PARTITION against median-of-3

**(a) Plain PARTITION(A,1,6):** x = 95.
- Every A[j] is ≤ 95, so i follows j and every exchange is with itself. The final exchange A[6]↔A[6] is also with itself.
- The array is unchanged and **q = 6**: the split is **5 : 0**, the worst case.

**(b) Median-of-3 with i=1, j=2, k=5:** the values are A[i]=23, A[j]=67, A[k]=34.
- Test 1 (is A[j] the middle value?): (23≤67 and 67≤34) is false; (34≤67 and 67≤23) is false.
- Test 2 (is A[i] the middle value?): (67≤23 …) is false; (34≤23 …) is false.
- Test 3 (is A[k] the middle value?): (23≤34 and 34≤67) is **true**, so **l = k = 5**.
- Exchange A[6]↔A[5] → 23 67 12 89 95 34.

PARTITION(A,1,6), x = 34, i = 0:

| j | A[j] | ≤ 34? | i | exchange | Array |
|---|---|---|---|---|---|
| 1 | 23 | yes | 1 | itself | 23 67 12 89 95 34 |
| 2 | 67 | no | 1 | – | 23 67 12 89 95 34 |
| 3 | 12 | yes | 2 | A[2]↔A[3] | 23 12 67 89 95 34 |
| 4 | 89 | no | 2 | – | 23 12 67 89 95 34 |
| 5 | 95 | no | 2 | – | 23 12 67 89 95 34 |
| end | | | | A[3]↔A[6] | 23 12 **34** 89 95 67, **q = 3** (2 : 3 split) |

**(c) "Dilution", counted over all 216 choices of (i, j, k):**

| Pivot chosen | Split | Choices |
|---|---|---|
| 12 | 0 : 5 | 16 |
| 23 | 1 : 4 | 40 |
| 34 | 2 : 3 | 52 |
| 67 | 3 : 2 | 52 |
| 89 | 4 : 1 | 40 |
| 95 | 5 : 0 | 16 |

Plain PARTITION always picks 95. Median-of-3 picks an extreme value in only 32 of the 216 choices, about 15 %.

### 5.5 [D07-S12, S19–S20] Sorted against reverse-sorted input, n = 6

| Sorted 1 2 3 4 5 6 | pivot | q | split | comps |
|---|---|---|---|---|
| PARTITION(1,6) | 6 | 6 | 5 : 0 | 5 |
| PARTITION(1,5) | 5 | 5 | 4 : 0 | 4 |
| PARTITION(1,4) | 4 | 4 | 3 : 0 | 3 |
| PARTITION(1,3) | 3 | 3 | 2 : 0 | 2 |
| PARTITION(1,2) | 2 | 2 | 1 : 0 | 1 |
| **total** | | | | **15** |

| Reverse 6 5 4 3 2 1 | pivot | array after | q | split | comps |
|---|---|---|---|---|---|
| PARTITION(1,6) | 1 | 1 5 4 3 2 6 | 1 | 0 : 5 | 5 |
| PARTITION(2,6) | 6 | 1 5 4 3 2 6 | 6 | 4 : 0 | 4 |
| PARTITION(2,5) | 2 | 1 2 4 3 5 6 | 2 | 0 : 3 | 3 |
| PARTITION(3,5) | 5 | 1 2 4 3 5 6 | 5 | 2 : 0 | 2 |
| PARTITION(3,4) | 3 | 1 2 3 4 5 6 | 3 | 0 : 1 | 1 |
| **total** | | | | | **15** |

Both are fully unbalanced and both make n(n−1)/2 = 15 comparisons. This is the worst case of [D07-S12], and it shows the slide's answer **T1 = T2** [D07-S20].

### 5.6 [D08-S6] MERGE of A(12, 34, 38, 78) and B(2, 56, 87, 90, 98)

Here L = (12, 34, 38, 78) and R = (2, 56, 87, 90, 98).

| k | L[i] vs R[j] | Taken | C so far |
|---|---|---|---|
| 1 | 12 vs 2 | R: 2 | 2 |
| 2 | 12 vs 56 | L: 12 | 2 12 |
| 3 | 34 vs 56 | L: 34 | 2 12 34 |
| 4 | 38 vs 56 | L: 38 | 2 12 34 38 |
| 5 | 78 vs 56 | R: 56 | 2 12 34 38 56 |
| 6 | 78 vs 87 | L: 78 | 2 12 34 38 56 78 |
| 7 | L used up | R: 87 | … 87 |
| 8 | L used up | R: 90 | … 90 |
| 9 | L used up | R: 98 | **2 12 34 38 56 78 87 90 98** |

That is 6 comparisons for 9 items.

### 5.7 [D08-S7] MERGESORT on 85 24 63 45 17 31 96 50 (full)

Rows 1–15 are on the slide; rows 16–29 complete it in the same style.

| # | Row | Content | # | Row | Content |
|---|---|---|---|---|---|
| 1 | 0 MS | 85 24 63 45 17 31 96 50 | 16 | 1 MS | 17 31 96 50 |
| 2 | 1 Div | 85 24 63 45 ‖ 17 31 96 50 | 17 | 2 Div | 17 31 ‖ 96 50 |
| 3 | 1 MS | 85 24 63 45 | 18 | 2 MS | 17 31 |
| 4 | 2 Div | 85 24 ‖ 63 45 | 19 | 3 Div | 17 ‖ 31 |
| 5 | 2 MS | 85 24 | 20 | 3 MS | 17 |
| 6 | 3 Div | 85 ‖ 24 | 21 | 3 MS | 31 |
| 7 | 3 MS | 85 | 22 | 3 Merge | 17 31 |
| 8 | 3 MS | 24 | 23 | 2 MS | 96 50 |
| 9 | 3 Merge | 24 85 | 24 | 3 Div | 96 ‖ 50 |
| 10 | 2 MS | 63 45 | 25 | 3 MS | 96 |
| 11 | 3 Div | 63 ‖ 45 | 26 | 3 MS | 50 |
| 12 | 3 MS | 63 | 27 | 3 Merge | 50 96 |
| 13 | 3 MS | 45 | 28 | 2 Merge | 17 31 50 96 |
| 14 | 3 Merge | 45 63 | 29 | 1 Merge | **17 24 31 45 50 63 85 96** |
| 15 | 2 Merge | 24 45 63 85 | | | |

The same run in the pseudocode's call order, with the whole array after each MERGE:

| Call | Whole array afterwards |
|---|---|
| MERGE(A,1,1,2) | 24 85 63 45 17 31 96 50 |
| MERGE(A,3,3,4) | 24 85 45 63 17 31 96 50 |
| MERGE(A,1,2,4) | 24 45 63 85 17 31 96 50 |
| MERGE(A,5,5,6) | 24 45 63 85 17 31 96 50 (17 31 is already in order) |
| MERGE(A,7,7,8) | 24 45 63 85 17 31 50 96 |
| MERGE(A,5,6,8) | 24 45 63 85 17 31 50 96 |
| MERGE(A,1,4,8) | **17 24 31 45 50 63 85 96** |

The final MERGE(A,1,4,8) has n1 = 4, n2 = 4, L = (24, 45, 63, 85) and R = (17, 31, 50, 96):
- 24 vs 17 → 17
- 24 vs 31 → 24
- 45 vs 31 → 31
- 45 vs 50 → 45
- 63 vs 50 → 50
- 63 vs 96 → 63
- 85 vs 96 → 85
- L is used up → 96
- That is 7 comparisons. Over the whole sort there are 7 MERGE calls and 3 levels (log₂ 8 = 3).

### 5.8 Four NEW practice traces in the slides' style (answers verified by running the slide pseudocode)

**P1 — Insertion sort.** Sort **12, 5, 9, 3, 15, 7** with Insertion Sort [D06-S7].
- Show the array after every pass, in the slide-6 style of "shift" and "insert".
- Count the comparisons (`A[i] > key`) and the shifts.

<details><summary>Answer P1</summary>

| Pass (j) | key | Steps | Array after | comps | shifts |
|---|---|---|---|---|---|
| 2 | 5 | 12 > 5 shift; left boundary reached, insert 5 | 5 12 9 3 15 7 | 1 | 1 |
| 3 | 9 | 12 > 9 shift; 5 < 9, insert 9 | 5 9 12 3 15 7 | 2 | 1 |
| 4 | 3 | 12 > 3, 9 > 3, 5 > 3 shift; left boundary reached, insert 3 | 3 5 9 12 15 7 | 3 | 3 |
| 5 | 15 | 12 < 15, insert 15 (no shift) | 3 5 9 12 15 7 | 1 | 0 |
| 6 | 7 | 15 > 7, 12 > 7, 9 > 7 shift; 5 < 7, insert 7 | **3 5 7 9 12 15** | 4 | 3 |

Totals: **11 comparisons, 8 shifts**. For comparison with [D06-S8] at n = 6: the worst case is F(6) = 15 (reversed input) and the best case is 5 (sorted input).
</details>

**P2 — Quicksort.** Apply QUICKSORT(A, 1, 8) [D07-S4, S5] to **15, 3, 22, 8, 17, 10, 5, 12**.
- (a) Show every step of the first PARTITION.
- (b) Give the array and q after every PARTITION call.
- (c) Give the total number of comparisons.

<details><summary>Answer P2</summary>

(a) PARTITION(A,1,8), x = 12, i = 0

| j | A[j] | ≤ 12? | i | exchange | Array |
|---|---|---|---|---|---|
| 1 | 15 | no | 0 | – | 15 3 22 8 17 10 5 12 |
| 2 | 3 | yes | 1 | A[1]↔A[2] | 3 15 22 8 17 10 5 12 |
| 3 | 22 | no | 1 | – | 3 15 22 8 17 10 5 12 |
| 4 | 8 | yes | 2 | A[2]↔A[4] | 3 8 22 15 17 10 5 12 |
| 5 | 17 | no | 2 | – | 3 8 22 15 17 10 5 12 |
| 6 | 10 | yes | 3 | A[3]↔A[6] | 3 8 10 15 17 22 5 12 |
| 7 | 5 | yes | 4 | A[4]↔A[7] | 3 8 10 5 17 22 15 12 |
| end | | | | A[5]↔A[8] | 3 8 10 5 **12** 22 15 17, **q = 5** |

(b)

| Call | Pivot | Whole array after | q |
|---|---|---|---|
| PARTITION(1,8) | 12 | 3 8 10 5 **12** 22 15 17 | 5 |
| PARTITION(1,4) | 5 | 3 **5** 10 8 12 22 15 17 | 2 |
| PARTITION(3,4) | 8 | 3 5 **8** 10 12 22 15 17 | 3 |
| PARTITION(6,8) | 17 | 3 5 8 10 12 15 **17** 22 | 7 |

- In PARTITION(1,4), 3 ≤ 5 is exchanged with itself, then 8 and 10 are > 5, and the final exchange is A[2]↔A[4].
- In PARTITION(6,8), 22 > 17, then 15 ≤ 17 is exchanged into A[6], and the final exchange is A[7]↔A[8].
- Every other call has p ≥ r.

(c) **13 comparisons** (7 + 3 + 1 + 2) over 4 PARTITION calls. Sorted: **3 5 8 10 12 15 17 22**.
</details>

**P3 — Merge sort.** Apply MERGESORT(A, 1, 8) [D08-S5] to **52, 19, 74, 33, 8, 61, 27, 45**.
- Fill in a [D08-S7]-style table.
- Then trace the final MERGE with L, R, i, j and k [D08-S8].

<details><summary>Answer P3</summary>

| Row | Content | Row | Content |
|---|---|---|---|
| 0 MS | 52 19 74 33 8 61 27 45 | 1 MS | 8 61 27 45 |
| 1 Div | 52 19 74 33 ‖ 8 61 27 45 | 2 Div | 8 61 ‖ 27 45 |
| 1 MS | 52 19 74 33 | 2 MS | 8 61 |
| 2 Div | 52 19 ‖ 74 33 | 3 Div | 8 ‖ 61 |
| 2 MS | 52 19 | 3 MS / 3 MS | 8 / 61 |
| 3 Div | 52 ‖ 19 | 3 Merge | 8 61 |
| 3 MS / 3 MS | 52 / 19 | 2 MS | 27 45 |
| 3 Merge | 19 52 | 3 Div | 27 ‖ 45 |
| 2 MS | 74 33 | 3 MS / 3 MS | 27 / 45 |
| 3 Div | 74 ‖ 33 | 3 Merge | 27 45 |
| 3 MS / 3 MS | 74 / 33 | 2 Merge | 8 27 45 61 |
| 3 Merge | 33 74 | **1 Merge** | **8 19 27 33 45 52 61 74** |
| 2 Merge | 19 33 52 74 | | |

The final MERGE(A,1,4,8) has n1 = 4, n2 = 4, L = (19, 33, 52, 74) and R = (8, 27, 45, 61), with i = j = 0 at the start:

| k | L[i] vs R[j] | A[k] | i after | j after |
|---|---|---|---|---|
| 1 | 19 vs 8 → R | 8 | 0 | 1 |
| 2 | 19 vs 27 → L | 19 | 1 | 1 |
| 3 | 33 vs 27 → R | 27 | 1 | 2 |
| 4 | 33 vs 45 → L | 33 | 2 | 2 |
| 5 | 52 vs 45 → R | 45 | 2 | 3 |
| 6 | 52 vs 61 → L | 52 | 3 | 3 |
| 7 | 74 vs 61 → R | 61 | 3 | 4 |
| 8 | R used up → L | 74 | 4 | 4 |

That is 7 comparisons.
</details>

**P4 — Median-of-3 and V2.** A = **14, 41, 23, 8, 35, 17, 29** (p = 1, r = 7).
- (a) Run Median-of-3-Partition [D07-S9], with RANDOM returning i = 1, j = 3, k = 6. Find l, the array after `exchange A[r] <-> A[l]`, the PARTITION result and q.
- (b) Run the Median Method V2 partition [D07-S7] on the original A, with the random pivot chosen as 23 (position 3).

<details><summary>Answer P4</summary>

(a) The values are A[i]=14, A[j]=23, A[k]=17.
- Test 1: (14≤23 and 23≤17) is false; (17≤23 and 23≤14) is false.
- Test 2: (23≤14 …) is false; (17≤14 …) is false.
- Test 3: (14≤17 and 17≤23) is **true**, so **l = k = 6** and the median is 17.
- Exchange A[7]↔A[6] → **14 41 23 8 35 29 17**.
- PARTITION, x = 17:
  - j=1: 14 ≤ 17, so i=1 and A[1] is exchanged with itself.
  - j=2 and j=3: 41 and 23 are > 17, nothing happens.
  - j=4: 8 ≤ 17, so i=2 and A[2]↔A[4] → 14 8 23 41 35 29 17.
  - j=5 and j=6: 35 and 29 are > 17, nothing happens.
  - The final exchange is A[3]↔A[7] → **14 8 17 41 35 29 23**, with **q = 3** (a 2 : 4 split).

(b)
- Swap the pivot 23 to the last index → 14 41 29 8 35 17 23.
- Round 1: i moves past 14 and stops at 2 (41). j stops at 6 (17). Exchange → 14 17 29 8 35 41 23.
- Round 2: i moves past 17 and stops at 3 (29). j moves left past 41 and 35 and stops at 4 (8). Exchange → 14 17 8 29 35 41 23.
- Round 3: i moves past 8 and stops at 4 (29). j moves past 29 and stops at 3 (8). Now i > j, so swap A[4] with the last element → **14 17 8 23 35 41 29**.
- The pivot 23 is at position 4, with {14, 17, 8} < 23 < {35, 41, 29}.
</details>

### 5.9 Assignment 2: how the professor solves the sorting questions

**The handout [A2].**
- **Q1** asks for Build Max Heap on 11, 19, 7, 12, 15, 30. That is the heap sort deck, not covered here.
- **Q2** asks to "Apply Quicksort Algorithm to sort the given sequence (Show only steps of first PARTITION on the initial array)" for **18, 7, 12, 15, 22, 10**, in positions 1–6.
- A second "Q2" asks to "Apply Merge sort Algorithm … (Show all steps)" for **19, 17, 12, 5, 20, 10**.
- ⚠️ Two questions are numbered Q2; the merge sort one is really Q3. This is true of both the handout and the sample solution.
- The sample solution is marked "for reference" and uses **different numbers**: Q1 uses 12, 9, 7, 2, 15, 32, and both sorting questions use **9, 7, 2, 15, 32, 10**.

#### (a) Quicksort, first PARTITION, in the professor's sample (9 7 2 15 32 10)

The professor's margin notes read "P=1 r=6, x=10 · initially J=0 · I=-1". His grid has one row per step:

| Row | Professor's mark | What it means in the [D07-S5] code |
|---|---|---|
| 1 | "A[j] < x, i = j" under 9 | j=1: 9 ≤ 10 → i becomes 1 (= j), so A[1] is exchanged with itself |
| 2 | "A[j] < x, i = j" under 7 | j=2: 7 ≤ 10 → i = 2, exchanged with itself |
| 3 | "A[j] < x, i = j" under 2; then "j" under 15 and under 32 | j=3: 2 ≤ 10 → i = 3; then j=4 and j=5 pass 15 and 32 (both > 10) with no change |
| 4 | "i" under position 4, a double arrow, "x" under position 6 | final `Exchange A[i+1] <-> A[r]`: A[4] ↔ A[6] |
| 5 | **9 7 2 [10] 32 15**, with 10 highlighted | the pivot is in its final place, **q = 4** |

- Running the [D07-S5] PARTITION reproduces this final row exactly.
- ⚠️ "J=0, I=−1" are 0-based starting values, but the grid is numbered 1–6 with P = 1. The slide code gives i = p−1 = 0, and j starts at p = 1. The meaning is the same: i starts just before the sub-array.
- ⚠️ The sample writes "A[j] < x", while the slide's test is `A[j] <= x`. It makes no difference here because no value equals 10.

**The same method on the handout's Q2 (18 7 12 15 22 10).** p = 1, r = 6, x = A[6] = 10, i = 0.

| j | A[j] | ≤ 10? | i | exchange | Array |
|---|---|---|---|---|---|
| 1 | 18 | no | 0 | – | 18 7 12 15 22 10 |
| 2 | 7 | yes | 1 | A[1]↔A[2] | 7 18 12 15 22 10 |
| 3 | 12 | no | 1 | – | 7 18 12 15 22 10 |
| 4 | 15 | no | 1 | – | 7 18 12 15 22 10 |
| 5 | 22 | no | 1 | – | 7 18 12 15 22 10 |
| end | | | | A[2]↔A[6] | **7 10 12 15 22 18**, **q = 2** |

After the first PARTITION the array is **7 | 10 | 12 15 22 18**. (This is our verified run of the slide code, not the professor's own answer, which uses different numbers.)

#### (b) Merge sort, all steps, in the professor's sample (9 7 2 15 32 10)

The professor writes "p=1, r=6, q=3" in the margin and fills a 6-column grid. The left half and right half are worked side by side, level by level, and colour-coded:

| Grid row | Positions 1–3 | Positions 4–6 | Meaning |
|---|---|---|---|
| 1 | 9 7 2 | | left half A[1..3] (q = 3) |
| 2 | 9 7 | 15 32 10 | left half split again (q = 2); right half A[4..6] |
| 3 | 2 (pos 3) | 15 32 (pos 4–5) | right half split (q = 5) |
| 4 | 9 (pos 1) | 10 (pos 6) | single elements |
| 5 | 7 (pos 2) | 15 (pos 4) | single elements |
| 6 | 7 9 | 32 (pos 5) | MERGE [9] + [7] |
| 7 | 2 7 9 | 15 32 | MERGE [7 9] + [2]; MERGE [15] + [32] |
| 8 | | 10 15 32 | MERGE [15 32] + [10] |
| 9 | (blank) | | |
| 10 | **2 7 9 10 15 32** | | final MERGE |

This matches the [D08-S5] recursion: (1,6) q=3 → (1,3) q=2 → (1,2) q=1 → (4,6) q=5 → (4,5) q=4. The final MERGE has L = (2, 7, 9) and R = (10, 15, 32): after 3 comparisons L is used up, and 10, 15, 32 are copied.

**The same method on the handout's merge sort question (19 17 12 5 20 10).**

| Grid row | Positions 1–3 | Positions 4–6 | Meaning |
|---|---|---|---|
| 1 | 19 17 12 | | MERGESORT(1,6): q = 3, left half |
| 2 | 19 17 | 5 20 10 | MERGESORT(1,3): q = 2; right half A[4..6] |
| 3 | 12 (pos 3) | 5 20 (pos 4–5) | MERGESORT(4,6): q = 5 |
| 4 | 19 (pos 1) | 10 (pos 6) | MERGESORT(1,2): q = 1 |
| 5 | 17 (pos 2) | 5 (pos 4) | MERGESORT(4,5): q = 4 |
| 6 | 17 19 | 20 (pos 5) | MERGE [19] + [17] |
| 7 | 12 17 19 | 5 20 | MERGE [17 19] + [12]; MERGE [5] + [20] |
| 8 | | 5 10 20 | MERGE [5 20] + [10] |
| 9 | **5 10 12 17 19 20** | | final MERGE |

The final MERGE(A,1,3,6) has L = (12, 17, 19) and R = (5, 10, 20):
- 12 vs 5 → 5
- 12 vs 10 → 10
- 12 vs 20 → 12
- 17 vs 20 → 17
- 19 vs 20 → 19
- L is used up → 20
- That is 5 comparisons. (This is our verified run of the slide code; the professor's sample uses different numbers.)

---

## 6. Likely exam questions (from these materials only)

1. **[Trace]** Sort **8, 3, 6, 1, 5** with Insertion Sort [D06-S7]. Give the array after each pass j = 2, 3, 4, 5, and the total number of `A[i] > key` comparisons.
2. **[Count]** Using F(n) from the slides, how many comparisons/movements does insertion sort make in the worst case for n = 10? Which input causes it? Which input gives the best case, and what is the best-case bound?
3. **[MCQ]** To reduce the number of *comparisons* in insertion sort, the slides suggest: (a) a doubly linked list (b) binary search (c) median-of-3 (d) a random pivot. With that change, the total running time becomes: (i) O(n log n) (ii) still O(n²) (iii) O(n).
4. **[MCQ]** According to the class slides, which list contains **only stable** sorts? (a) merge, insertion, bubble (b) quick, merge, insertion (c) heap, selection, merge (d) quick, heap, selection.
5. **[MCQ]** According to [D06-S3]: (i) Which comparison-based sort is **out-place**? (a) quick (b) insertion (c) merge (d) bubble. (ii) Which of these is **non-adaptive**? (a) insertion (b) bubble (c) quick (d) merge.
6. **[Partition result]** Apply PARTITION(A, 1, 8) [D07-S5] to **6, 11, 3, 9, 2, 14, 7, 8**. Show the array after each j, the returned q, and the number of `A[j] <= x` comparisons.
7. **[Trace / count]** For the slide example QUICKSORT(A, 1, 7) on **5 7 6 1 3 2 4**:
   - (a) What is the array after the first PARTITION, and what is q?
   - (b) How many PARTITION calls are made in total?
   - (c) How many comparisons are made in total?
8. **[Recurrence]** Write the recurrence for quicksort's worst-case partitioning and its solution. What kind of input causes it?
9. **[Recurrence]** Write the best-case partitioning recurrence and its solution, and name the theorem used.
10. **[Recurrence]** The median of n elements can be found in O(n) time. If the median is always used as the pivot, write the recurrence and the complexity of quicksort.
11. **[Recurrence]** The (n/4)-th smallest element is chosen as pivot by an O(n) algorithm. Give the recurrence and the worst-case complexity. In what ratio are the parts split?
12. **[MCQ]** T1 is the time to partition 1, 2, …, n and T2 is the time to partition n, n−1, …, 1. Then: (a) T1 < T2 (b) T1 > T2 (c) T1 = T2 (d) it depends on n.
13. **[Short]** What does RANDOMIZED-PARTITION do before calling PARTITION? How many different values can RANDOM(3, 9) return?
14. **[Median-of-3]** A = **31, 12, 47, 25, 8, 39** (p = 1, r = 6), and RANDOM returns i = 1, j = 5, k = 3. Find l, the array after `exchange A[r] <-> A[l]`, and the result of PARTITION with its q.
15. **[V2]** Using the Median Method V2 rules [D07-S7] with the pivot equal to the last element, partition **9, 4, 8, 2, 7, 5**. Where does the pivot end up?
16. **[Merge sort trace]** Run MERGESORT(A, 1, 7) on **40, 15, 33, 8, 27, 12, 50**. List every split with its q and the result of every MERGE, in call order. How many MERGE calls are there?
17. **[MERGE procedure]** Trace Merge [D08-S8] with L = (3, 9, 14) and R = (5, 6, 20). Give the comparison made and the value of A[k] at each k. How many comparisons are made?
18. **[Recurrence]** Give merge sort's recurrence as written on [D08-S11] and its solution. Why does merge sort have "no worst scenario"?
19. **[Cost]** Using merge procedures:
    - (a) How long does it take to merge **log n sorted lists, each of size n/log n**, into one list?
    - (b) How long does it take to sort **n strings, each of length n**?
20. **[Cost + space]**
    - (a) If problems of size k (k < n) can be solved directly, what is merge sort's running time?
    - (b) Give quicksort's space complexity for balanced and for unbalanced partitions, and merge sort's total space requirement.

### Answers

1. The passes give:
   - j=2: **3 8 6 1 5**
   - j=3: **3 6 8 1 5**
   - j=4: **1 3 6 8 5**
   - j=5: **1 3 5 6 8**
   - Comparisons: 1 + 2 + 3 + 3 = **9**, and there are 7 shifts. [D06-S6, S7]
2. F(10) = 1 + 2 + … + 9 = 10·9/2 = **45**, for **reversed** input. The best case is **already sorted ascending** input, which is **Ω(n)** (9 comparisons here). [D06-S8]
3. **(b) binary search**, and the total is **(ii) still O(n²)**. A doubly linked list reduces movement instead. [D06-S9]
4. **(a)** merge, insertion, bubble. Quicksort, heap sort and selection sort are listed as unstable. [D06-S3]
5. (i) **(c) merge sort**. (ii) **(d) merge sort**. [D06-S3, D08-S11]
6. x = 8 and i = 0.
   - j=1: 6 ≤ 8 → i=1, A[1] exchanged with itself → 6 11 3 9 2 14 7 8
   - j=2: 11 > 8, no change
   - j=3: 3 ≤ 8 → i=2, A[2]↔A[3] → 6 3 11 9 2 14 7 8
   - j=4: 9 > 8, no change
   - j=5: 2 ≤ 8 → i=3, A[3]↔A[5] → 6 3 2 9 11 14 7 8
   - j=6: 14 > 8, no change
   - j=7: 7 ≤ 8 → i=4, A[4]↔A[7] → 6 3 2 7 11 14 9 8
   - Final A[5]↔A[8] → **6 3 2 7 8 14 9 11**, with **q = 5**. There are **7** comparisons (r − p). [D07-S5]
7. (a) **1 3 2 4 7 6 5**, with q = 4. (b) **4** PARTITION calls. (c) 6 + 2 + 2 + 1 = **11** comparisons. [D07-S5; §5.2]
8. T(n) = T(n−1) + T(0) + Θ(n) = T(n−1) + Θ(n), which gives **Θ(n²)**. It happens when one side has n−1 elements and the other has 0, which is the case for an **already sorted** input (the best case for insertion sort). [D07-S12]
9. T(n) ≤ 2T(n/2) + Θ(n), which gives **Θ(n log n)** by the "Main recurrence" theorem, i.e. the Master theorem: a = 2, b = 2, k = 1, p = 0. [D07-S13; D05-S5]
10. T(n) = O(n) [find the median] + O(1) [swap it to the last position] + O(n) [partition] + 2T(n/2) = O(n) + 2T(n/2) = **O(n log n)**. [D07-S16]
11. T(n) = O(n) + O(1) + O(n) + T(n/4) + T(3n/4) = O(n) + Θ(n log n) = **Θ(n log n)**. The parts are n/4 and 3n/4. The slide calls this "1:4", meaning one-fourth; as a ratio it is 1 : 3. [D07-S18]
12. **(c) T1 = T2.** Both inputs give fully unbalanced splits (n(n−1)/2 comparisons for the whole sort). [D07-S20; §5.5]
13. It sets i ← RANDOM(p, r) and exchanges A[r] ↔ A[i], so a random element becomes the pivot. RANDOM(3, 9) can return 9 − 3 + 1 = **7** values. [D07-S6]
14. The values are A[i]=31, A[j]=8, A[k]=47.
    - Test 1 fails: (31≤8 …) is false and (47≤8 …) is false.
    - Test 2 holds: (8≤31 and 31≤47) is true, so **l = i = 1**.
    - Exchange A[6]↔A[1] → **39 12 47 25 8 31**.
    - PARTITION with x = 31:
      - 39 > 31, no change;
      - 12 ≤ 31, so A[1]↔A[2] → 12 39 47 25 8 31;
      - 47 > 31, no change;
      - 25 ≤ 31, so A[2]↔A[4] → 12 25 47 39 8 31;
      - 8 ≤ 31, so A[3]↔A[5] → 12 25 8 39 47 31;
      - the final A[4]↔A[6] gives **12 25 8 31 47 39**, with **q = 4**. [D07-S9, S5]
15. The pivot is 5.
    - i stops at 1 (9) and j stops at 4 (2), so exchange → 2 4 8 9 7 5.
    - i moves right past 2 and 4 and stops at 3 (8). j moves left past 9 and 8 and stops at 2 (4). Now i > j, so swap A[3] with the last element → **2 4 5 9 7 8**.
    - The pivot 5 ends at **position 3**. [D07-S7, S8]
16. The calls, in order:
    - (1,7) q=4 → [40 15 33 8] | [27 12 50]
    - (1,4) q=2 → [40 15] | [33 8]
    - (1,2) q=1 → MERGE → 15 40
    - (3,4) q=3 → MERGE → 8 33
    - MERGE(1,2,4) → 8 15 33 40
    - (5,7) q=6 → [27 12] | [50]
    - (5,6) q=5 → MERGE → 12 27
    - MERGE(5,6,7) → 12 27 50
    - MERGE(1,4,7) → **8 12 15 27 33 40 50**
    - There are **6** MERGE calls. [D08-S5]
17. The steps by k:
    - k1: 3 ≤ 5 → 3
    - k2: 9 > 5 → 5
    - k3: 9 > 6 → 6
    - k4: 9 ≤ 20 → 9
    - k5: 14 ≤ 20 → 14
    - k6: L is used up → 20
    - Result **3 5 6 9 14 20**, with **5** comparisons. [D08-S8]
18. T(n) = O(1) + T(n/2) + T(n/2) + O(n) = O(n) + 2T(n/2), which gives **Θ(n log n)** by the Master theorem. There is no worst scenario because "it works same for ascending or descending order", which is why merge sort is listed as non-adaptive. [D08-S11, D06-S3]
19. (a) O(n) per level × log(log n) levels = **O(n log(log n))** [D08-S15]. (b) O(n²) per level × log n levels = **O(n² log n)** [D08-S17].
20. (a) O(n) per level × log(n/k) levels = **O(n log(n/k))** [D08-S19]. (b) Quicksort needs **O(log n)** when balanced and **O(n)** when unbalanced [D07-S21]. Merge sort needs O(log n) + O(n) = **O(n)** [D08-S10].

---

## 7. Self-check

- [ ] I can write Insertion Sort exactly as on [D06-S7], and show the array after every pass with the number of comparisons and shifts.
- [ ] I can give insertion sort's best case (Ω(n), already sorted) and worst case (O(n²), reversed; F(n) = n(n−1)/2), plus the two improvements and why the slide says they don't beat O(n²).
- [ ] I can fill in the [D06-S3] table from memory: comparison/non-comparison, internal/external, stable/unstable, adaptive/non-adaptive, in-place/out-place.
- [ ] I can write QUICKSORT and PARTITION exactly, and trace PARTITION step by step (x, i, j, each exchange, the final exchange, the returned q), the way the professor does in [A2].
- [ ] I can explain and apply RANDOMIZED-PARTITION, Median-of-3-Partition (choosing l with the three tests) and the Median Method V2 two-pointer rules.
- [ ] I can write quicksort's worst-case and best-case recurrences and their solutions, say which input causes the worst case, and explain why T1 = T2.
- [ ] I can answer the pivot-choice questions (median as pivot → O(n log n); (n/4)-th smallest → Θ(n log n)) by adding up the cost parts and the recursive terms.
- [ ] I can write MERGESORT and Merge exactly, compute q = ⌊(p+r)/2⌋, and produce a full [D08-S7]/[A2]-style merge sort table, including the k-by-k steps of the final MERGE.
- [ ] I can derive merge sort's time Θ(n log n) and space O(n), and explain "no worst scenario" and "out-place".
- [ ] I can use "merge cost per level × number of levels" to get O(n log n), O(n log log n), O(n² log n) and O(n log(n/k)).


---

<!-- FILE: Week 4-5 - Heap sort, bucket sort, radix sort - class notes.md -->

# Weeks 4–5 — Heap sort, bucket sort, radix sort (CLASS NOTES — from slides only)

> Sources: [D09-S#] = deck "09 - Heap sort" (24 slides) · [D10-S#] = deck "10 - bucket n radix sort" (31 slides) · Assignment 2 [A2] = "Assignment 2 – Sorting – Fall 2026" plus the professor's "SAMPLE SOLUTION". Two cross-references to other class decks are used: [D03-S12] (asymptotic notation) and [D06-S3] (sorting classification).
>
> **Track A only.** Everything here comes from the slides and the professor's assignment and solution. Anything the slides do not explain is marked 🔎 *Look up in Track B*.
> Legend: ⭐ emphasised on the slide or likely on the exam · ⚠️ typo, error or inconsistency on the slide · 🔎 pointer to Track B.
>
> Exam: SOC3030-003 midterm, week 8 (24–30 Oct 2026), 25 %, covers weeks 1–7.
>
> **Verification:** every trace below was re-run in Python with a line-by-line transcription of the slide pseudocode. It was run once literally (1-based: `l=2i`, `r=2i+1`, root `A[1]`) and once in the 0-based form that the slide tables use (`l=2i+1`, `r=2i+2`, root `A[0]`). Both versions give identical arrays on every example.

---

## 1. Big picture

- ⭐ A **heap** has two properties. Its **shape** is a complete binary tree with all leaves at depth h or h−1. Its **order** is the partial order tree property: in a max-heap every key ≥ its children's keys [D09-S7]. It is stored in a plain array, and parent/child positions are found with index formulas [D09-S9].
- ⭐ Three heap procedures do all the work [D09-S10, S15, S17]:
  - **MAX-HEAPIFY(A,i)** sinks one key down until it is ≥ both children. It costs O(log n).
  - **BUILD-MAX-HEAP** calls MAX-HEAPIFY on every non-leaf, from the last one up to the root. It costs O(n).
  - **HEAP-EXTRACT-MAX** removes the root, moves the last key to the root and re-heapifies. It costs O(log n).
- ⭐ **HEAP-SORT** = BUILD-MAX-HEAP, then n−1 rounds of: swap the root with the last heap cell, shrink the heap, MAX-HEAPIFY the root [D09-S21]. The maximum is parked at the right end each round, so the array ends up in **ascending** order. It runs in O(n log n) [D09-S21] and needs O(1) extra space [D10-S4].
- ⭐ **Index trap.** The pseudocode is **1-based**, but every worked table in class and in A2 is **0-based** (columns 0…n−1, loop "i → 2 to 0") [D09-S9, S10, S13, S22; A2].
- A comparison-based sort cannot beat n log n [D10-S5]. To go faster the input must be **restricted** (a limited range of values), and the sort must avoid comparisons [D10-S6].
- ⭐ **Bucket sort**: when the values lie in 0…m−1, each value is used as a bucket index. Count (or enqueue) the values, then output the buckets in order. It costs O(n + m), which is O(n) when m is small compared with n [D10-S7, S11, S13]. When m >>> n (for example a maximum of 999999) it becomes O(m) [D10-S16].
- ⭐ **Radix sort**: repeated bucket sorts, one per digit, starting from the **rightmost** (least significant) digit. It needs only 10 buckets, and p passes where p is the number of digits of the maximum value. It costs O(pn) [D10-S17, S18, S24].
- ⭐ Radix sort works **only if every pass is stable**, meaning ties keep their previous order [D10-S23]. It can also sort **words**: one pass per character position and 27 buckets. The class convention is to read right→left, pad blanks at the end and keep the blank bucket **last** [D10-S25, S29].
- Exam signal: A2 Q1 is exactly "convert this sequence to a heap using Build Max Heap" on a 0-based table, so expect a build-heap trace. The slides also drill extract-max, heap-sort iterations, radix passes and the complexity tables.

---

## 2. Slide-by-slide notes

### Deck 09 — "Heap and Heapsort" (24 slides)

> ⭐ **Read this first.** In deck 09 the **pseudocode is 1-based**: root `A[1]`, `l=2i`, `r=2i+1`. **Every worked table is 0-based**: root `A[0]`, `l=2i+1`, `r=2i+2`. The slides give both formula sets [D09-S9] and both loop ranges [D09-S10]. All traces in these notes use 0-based indexes, matching the slides and A2.

### [D09-S1] Heap and Heapsort (title slide)
- Title only.

### [D09-S2] Performance of certain operations with different data structure (blank table)
- An empty table used as a "think first" prompt. Its rows are unsorted array, sorted array, unsorted linked list and Heap(Min). Its columns are Insert, Search, Find Minimum and Delete (Min).
- Try to fill it in yourself before looking at S3.

### [D09-S3] Performance of certain operations … (filled table)

| Structure | Insert | Search | Find Minimum | Delete (Min) |
|---|---|---|---|---|
| Unsorted array | O(1) | O(n) | O(n) | O(n) |
| Sorted array | O(n) | O(log n) | O(1) | O(n) |
| Unsorted linked list | O(1) | O(n) | O(n) | O(n) |
| Heap (Min) | O(log n) | O(log n) | O(1) | O(1) |

- ⚠️ **Typo.** Every entry is typed with the digit zero, as "0(1)" and "0(n)", instead of the letter O.
- ⚠️ **Inconsistency.** Heap(Min) "Delete (Min) = O(1)" disagrees with the deck itself. Deleting the root is what HEAP-EXTRACT-MAX does (the max-heap mirror image). It calls MAX-HEAPIFY, and [D09-S17] states its cost as **O(log n)**. If asked to reproduce this table, write the slide's values. If asked for the cost of extracting the root, use O(log n) from S17.
- ⚠️/🔎 Heap(Min) "Search = O(log n)" is not supported anywhere in the deck. The partial order property [D09-S7] only compares a node with its own children; it gives no left/right ordering, and no heap-search procedure is taught. 🔎 Look up in Track B: the cost of searching for an arbitrary key in a heap.
- "Find Minimum = O(1)" for a min-heap fits the deck: the extreme key sits at the root, just as HEAP-EXTRACT-MAX reads the maximum straight from `A[1]` [D09-S15].

### [D09-S4] Full, complete and perfect binary trees
- Binary trees can be categorised by structural properties:
  - **Full binary tree.** Every node has **either zero or two children** (red on the slide). No node has exactly one child, and every internal node has exactly two children.
  - **Complete binary tree.** Every level is completely filled **except possibly the last**. On the last level **all nodes must be as far left as possible** (red on the slide), with no gaps from left to right.
  - **Perfect binary tree.** It is **both full and complete** (red on the slide). All internal nodes have two children and all leaves are at the same depth, so every level is completely filled.
- The figure numbers nodes in level order:

```text
  full binary tree      complete binary tree      perfect binary tree
         0                       0                         0
        / \                     / \                     /     \
       1   2                   1   2                   1       2
      / \                     / \  /                  / \     / \
     3   4                   3   4 5                 3   4   5   6
```

- Notes drawn from the definitions above:
  - The "full" picture also happens to be complete, because its last level (3, 4) is packed to the left.
  - The "complete" picture is **not** full, because node 2 has only one child (5).
- ⭐ The level-order numbers are exactly the **0-based array indexes** of [D09-S9]. The children of 1 are 3 = 2·1+1 and 4 = 2·1+2; the children of 2 are 5 and 6.

### [D09-S5] Quiz: classify trees A, B, C, D
- The three reference trees are shown again, with four unlabelled trees A–D. The task is to decide whether each one is full and/or complete. The answers are on S6.

### [D09-S6] Answers to the S5 quiz

```text
A: Neither complete nor full        B: Complete but not full
            o                                   o
        /       \                           /       \
      o           o                       o           o
    /   \       /   \                   /   \       /   \
   o     o     o     o                 o     o     o     o
  /           / \                     /
 o           o   o                   o

C: Full but not complete            D: Complete and full
            o                                   o
        /       \                           /       \
      o           o                       o           o
    /   \       /   \                   /   \       /   \
   o     o     o     o                 o     o     o     o
  / \         / \                     / \
 o   o       o   o                   o   o
```

- **A**: one node has a single child, so it is not full. The bottom level has a gap, with nodes further right after a missing position, so it is not complete.
- **B**: the bottom level is packed to the left, so it is complete. One node has a single child, so it is not full.
- **C**: every node has 0 or 2 children, so it is full. The bottom level has a gap in the middle, so it is not complete.
- **D**: every node has 0 or 2 children and the bottom level is packed to the left, so it is both complete and full.

### [D09-S7] Heap — definitions ⭐
- A heap is a binary tree with two special properties: (1) **heap structure** and (2) **partial order tree property**.
- **Heap structure.** "A binary tree T is a heap structure if and only if it satisfies the following conditions: (h = height of the tree) 1. T is complete 2. All leaves are at depth h or h–1".
- **Partial order tree property.** "A tree T is a (maximizing) partial order tree if and only if the key at any node is greater than or equal to the keys at each of its children (if it has any)".
- The slide defines only the **maximizing** version (max-heap). The "Heap(Min)" / "Min-Heap" mentioned on S3, S10 and S19 is the mirror image, with each key ≤ its children's keys; the slides never define it formally.

### [D09-S8] e.g. Heaps (or not)

```text
(a) "A 2-tree"            (b) "A complete binary tree" (15 nodes)
        o                                o
      /   \                        /           \
     o     o                    o                 o
    / \                       /   \             /   \
   o   o                     o     o           o     o
      / \                   / \   / \         / \   / \
     o   o                 o   o o   o       o   o o   o

(c) Heap 1                (d) Heap 2
      9                         50
    /   \                    /       \
  5       7             24              30
 / \     / \           /   \           /   \
1   4   3   6       20      21      18       3
                    / \     /
                  12   5   6
```

- (a) Every node has 0 or 2 children, which is the S4 "full" shape and is what "2-tree" means here. It is **not** a heap structure: it is not complete, and its leaves are at depths 1, 2 and 3. With h = 3, the leaf at depth 1 breaks "all leaves at depth h or h−1".
- (b) All levels are full, so this is a valid heap structure (no keys are shown). By S4 it is also perfect.
- (c) **Heap 1**, array `[9, 5, 7, 1, 4, 3, 6]`. Every parent ≥ its children (verified).
- (d) **Heap 2**, array `[50, 24, 30, 20, 21, 18, 3, 12, 5, 6]`. It is a valid max-heap (verified), and the same heap is reused on [D09-S20].
- Siblings are **not** ordered: 24 < 30, but 18 > 3. Only the parent-versus-child relation matters.

### [D09-S9] Some Properties ⭐
- "Height of binary tree (log n)". Examples: the S11 tree has 7 nodes and height 2; Heap 2 has 10 nodes and height 3.
- "Max. number of nodes in complete binary tree of height h is (2^(h+1) – 1)". So h = 2 gives 7 (the S11 tree) and h = 3 gives 15 (S8 (b)).
- Leaves are consecutive and occupy indexes **floor(n/2)+1 … n** when indexing starts at 1. For 0-based indexing the slide writes "[floor(n/2) to n]".
  - ⚠️ With 0-based indexes the last index is n−1, so the leaf range is **floor(n/2) … n−1**. Example from S11 (n = 7): the leaves are at indexes 3, 4, 5 and 6 (values 1, 3, 5, 7).
- "Every node is heap in itself": a lone node trivially satisfies the heap property. This is why BUILD-MAX-HEAP never calls MAX-HEAPIFY on the leaves; it starts at the last non-leaf [D09-S10].
- ⭐ **Array formulas:**

| | 1-based (root = A[1]) | 0-based (root = A[0]) — "If index starts with 0" |
|---|---|---|
| Left child | `2*index` | `2*index + 1` |
| Right child | `2*index + 1` | `2*index + 2` |
| Parent | `floor(index/2)` | `ceil(index/2) - 1` |

- Check of the 0-based parent formula: indexes 1 and 2 give 0, indexes 3 and 4 give 1, and indexes 5 and 6 give 2. This matches the level-order labels on S4.

### [D09-S10] BUILD-MAX-HEAP and MAX-HEAPIFY ⭐
```text
BUILD-MAX-HEAP(A)
{
    A.heap-size= A.length
    for(i=floor(A.length/2) downto 1*)
        MAX-HEAPIFY(A,i)
}

MAX-HEAPIFY(A,i)
{
    l=2i
    r=2i+1
    If(l<=A.heap-size and A[l]>A[i])
        largest=l
    else largest = i
    If(r<=A.heap-size and A[r]>A[largest])
        largest=r
    If(largest<>i)
        Exchange A[i] with A[largest]
        MAX-HEAPIFY(A,largest)
}
```
- The footnote for the `*` reads: "i=floor(A.length/2) downto 1*) OR i=floor(A.length/2)-1 downto 0*)". The first range is for 1-based arrays and the second for 0-based arrays.
- `<>` means "not equal".
- MAX-HEAPIFY in plain words:
  1. Look at A[i] and whichever of its two children exist.
  2. Find the largest of these (up to three) keys.
  3. If a child is largest, swap it up and repeat from that child's position.
  4. Stop when the parent is the largest, or when the node has no children inside the heap.
- The figure shows the tree 4 / 2, 6 / 1, 3, 5, 7, which is the running example of S11 and S13.
- Box at the bottom of the slide:
  - "An array with descending Order (complete tree) is Max-Heap".
  - "An array with ascending Order (complete tree) is Min-Heap".
  - "=> Sorting cost is **n log n**".
- ⚠️ **Index trap.** The pseudocode's `l=2i, r=2i+1` are the 1-based formulas, but all worked tables (S11–S15, S22 and A2) are 0-based. Their `l, r` labels use the S9 box formulas: on S13, i=2 gives "l=5, r=6", and i=4 gives "l=9, r=10 (X)". In a 0-based exam table:
  - use `l = 2i+1` and `r = 2i+2`;
  - loop `i = floor(n/2)−1 downto 0`;
  - a child counts only if its index is inside the heap (index ≤ heap-size−1). The slides mark children outside the heap with "(X)".
- ⚠️ **Placement of the recursive call.** `MAX-HEAPIFY(A,largest)` belongs **inside** the `If(largest<>i)` block, together with the exchange. On S10 and S17 it carries a stray bullet "•", and on S11 it is printed at the outer indentation. If it ran when `largest = i`, it would call itself on the same node forever. The slide traces stop ("Exit-heapify") as soon as no swap happens.

### [D09-S11] MAX-HEAPIFY example — "Heapify (A,0) = ?"
- Input (0-based): `[4, 2, 6, 1, 3, 5, 7]`. The slide's answer is `[6, 2, 7, 1, 3, 5, 4]`.
- The slide's STEPS table has four rows:

| row | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| start | 4 | 2 | 6 | 1 | 3 | 5 | 7 |
| swap 0↔2 | 6 | | 4 | | | | |
| swap 2↔6 | | | 7 | | | | 4 |
| result | 6 | 2 | 7 | 1 | 3 | 5 | 4 |

- Walk-through:
  - i=0: l=1 holds 2 and r=2 holds 6, so largest = 2. Swap A[0]↔A[2].
  - i=2: l=5 holds 5 and r=6 holds 7, so largest = 6. Swap A[2]↔A[6].
  - i=6: l=13 and r=14 are outside the heap (X), so stop.

```text
start                     swap 0<->2                swap 2<->6
[4, 2, 6, 1, 3, 5, 7]     [6, 2, 4, 1, 3, 5, 7]     [6, 2, 7, 1, 3, 5, 4]

      4                         6                         6
    /   \                     /   \                     /   \
  2       6                 2       4                 2       7
 / \     / \               / \     / \               / \     / \
1   3   5   7             1   3   5   7             1   3   5   4
```

- ⭐ **Key observation.** The result is **not** a max-heap, because 7 at index 2 is larger than its parent 6. One MAX-HEAPIFY call repairs only the path it walks down, from the root to index 6. This is why BUILD-MAX-HEAP works **bottom-up** (S13): by the time a node is heapified, every node below it has already been processed. 🔎 Look up in Track B: the formal precondition of MAX-HEAPIFY.

### [D09-S12] Exercise — Heapify (A,0) on a new array
- Input: `[16, 46, 15, 18, 17, 22, 19]`, with a blank STEPS table to fill in. The slide gives no answer.
- **Verified answer:** `[46, 18, 15, 16, 17, 22, 19]`.
  - i=0: l=1 holds 46 and r=2 holds 15, so largest = 1. Swap A[0]↔A[1].
  - i=1: l=3 holds 18 and r=4 holds 17, so largest = 3. Swap A[1]↔A[3].
  - i=3: l=7 and r=8 are (X), so stop.

```text
start                            swap 0<->1                       swap 1<->3
[16, 46, 15, 18, 17, 22, 19]     [46, 16, 15, 18, 17, 22, 19]     [46, 18, 15, 16, 17, 22, 19]

      16                               46                               46
     /   \                            /   \                            /   \
  46      15                       16      15                       18      15
  / \     / \                      / \     / \                      / \     / \
18  17  22  19                   18  17  22  19                   16  17  22  19
```

- The result is again **not** a heap, because 22 and 19 sit below 15. Compare it with S14, where BUILD-MAX-HEAP fixes this.

### [D09-S13] BUILD-MAX-HEAP trace — "i → 2 to 0" ⭐
- Input: `[4, 2, 6, 1, 3, 5, 7]`, n = 7. The 0-based loop runs i = floor(7/2)−1 = 2, then 1, then 0.
- What the slide's table shows:
  - **i=2**: Heapify(A,2) with l=5, r=6. Swap A[2]↔A[6], giving `[4,2,7,1,3,5,6]`. Then Heapify(A,6) exits.
  - **i=1**: Heapify(A,1) with l=3, r=4. Swap A[1]↔A[4], giving `[4,3,7,1,2,5,6]`. Then Heapify(A,4) has l=9, r=10 (X) and exits.
  - **i=0**: Heapify(A,0) with l=1, r=2. Swap A[0]↔A[2], giving `[7,3,4,1,2,5,6]`. Then Heapify(A,2) with l=5, r=6: swap A[2]↔A[6], giving `[7,3,6,1,2,5,4]`. Then Heapify(A,6) exits.

```text
start                     i=2: swap 2<->6           i=1: swap 1<->4
[4, 2, 6, 1, 3, 5, 7]     [4, 2, 7, 1, 3, 5, 6]     [4, 3, 7, 1, 2, 5, 6]

      4                         4                         4
    /   \                     /   \                     /   \
  2       6                 2       7                 3       7
 / \     / \               / \     / \               / \     / \
1   3   5   7             1   3   5   6             1   2   5   6

i=0: swap 0<->2           i=0: swap 2<->6  (final max-heap)
[7, 3, 4, 1, 2, 5, 6]     [7, 3, 6, 1, 2, 5, 4]

      7                         7
    /   \                     /   \
  3       4                 3       6
 / \     / \               / \     / \
1   2   5   6             1   2   5   4
```

- **Result: `[7, 3, 6, 1, 2, 5, 4]`**, a valid max-heap (verified). At i=0, key 4 sinks two levels (index 0 → 2 → 6).
- ⚠️ **Label slip.** The last label on the slide reads "Exit-heapify(A,4)". It should read "Exit-heapify(A,6)": after swapping A[2]↔A[6], the recursive call is Heapify(A,6), and it exits because l=13 and r=14 are out of range.

### [D09-S14] Exercise — BUILD-MAX-HEAP on `[16, 46, 15, 18, 17, 22, 19]`
- The slide gives a blank table ("i → 2 to 0") and the tree. No answer is given.
- **Verified answer:** `[46, 18, 22, 16, 17, 15, 19]`.
  - i=2: l=5 holds 22 and r=6 holds 19, so largest = 5. Swap A[2]↔A[5].
  - i=1: 46 ≥ 18 and 46 ≥ 17, so no swap.
  - i=0: largest = 1 (46). Swap A[0]↔A[1]. Then at index 1, largest = 3 (18). Swap A[1]↔A[3].

```text
start                            i=2: swap 2<->5                  i=1: no swap
[16, 46, 15, 18, 17, 22, 19]     [16, 46, 22, 18, 17, 15, 19]     [16, 46, 22, 18, 17, 15, 19]

      16                               16                               16
     /   \                            /   \                            /   \
  46      15                       46      22                       46      22
  / \     / \                      / \     / \                      / \     / \
18  17  22  19                   18  17  15  19                   18  17  15  19

i=0: swap 0<->1                  i=0: swap 1<->3  (final max-heap)
[46, 16, 22, 18, 17, 15, 19]     [46, 18, 22, 16, 17, 15, 19]

      46                               46
     /   \                            /   \
  16      22                       18      22
  / \     / \                      / \     / \
18  17  15  19                   16  17  15  19
```

### [D09-S15] Heap-Extract-Max ⭐
```text
Heap-Extract-Max(A)
{
    If A.heap-size < 1
        error " heap underflow"
    max=A[1]
    A[1]=A[A.heap-size]
    A.heap-size=A.heap-size-1
    MAX-HEAPIFY(A,1)
    return max
}
```
- Trace on the S13 heap `[7, 3, 6, 1, 2, 5, 4]`, 0-based:
  1. **max = 7** is removed (red cell on the slide).
  2. The last key, 4 at index 6 (red ✗), is copied into the root, and heap-size goes from 7 to 6.
  3. Heapify(0): l=1 holds 3 and r=2 holds 6, so largest = 2. Swap 0↔2.
  4. Heapify(2): l=5 holds 5, and r=6 is now **outside** the heap. Since 5 > 4, swap 2↔5.
  5. Heapify(5) exits.
- The result (green row) is `[6, 3, 5, 1, 2, 4]` and the procedure **returns 7**. Index 6 is left blank on the slide because it is no longer part of the heap.

```text
start heap                #1: max=7 out, A[0]=A[6]     #1: swap 0<->2         #1: swap 2<->5
[7, 3, 6, 1, 2, 5, 4]     [4, 3, 6, 1, 2, 5]           [6, 3, 4, 1, 2, 5]     [6, 3, 5, 1, 2, 4]

      7                         4                            6                      6
    /   \                     /   \                        /   \                  /   \
  3       6                 3       6                    3       4              3       5
 / \     / \               / \     /                    / \     /              / \     /
1   2   5   4             1   2   5                    1   2   5              1   2   4
```

- 0-based reading of the pseudocode: `max = A[0]` and `A[0] = A[heap-size − 1]`, then shrink the heap and call MAX-HEAPIFY(A,0).
- "heap underflow" is the error raised when the heap is empty (heap-size < 1).

### [D09-S16] Complexity Analysis (heading)
- This slide lists the three procedures that S17 analyses: Max-Heapify, Heap-Extract-Max and Build_Heap.

### [D09-S17] Performance Analysis ⭐
- Statements on the slide, quoted:
  - "Max-Heapify takes O(log n)"
  - "Heap-Extract-Max running time is O(log n)"
  - "The running time of Build_Heap is O(n)"
  - "Number of at most node with height h: ceil(n/2^(h+1))"
  - "Time taken by any Max-Heapify at any node is O(h)"
- The three pseudocode boxes from S10 and S15 are repeated on this slide. The BUILD box here has "downto 1" without the asterisk.
- What the statements mean:
  - **Max-Heapify, O(log n).** Each recursive call moves one level down. The cost at a node of height h is therefore O(h), and the root's height is about log n (S9).
  - **Heap-Extract-Max, O(log n).** It does a constant amount of work plus one MAX-HEAPIFY from the root.
  - **Build_Heap, O(n) rather than O(n log n).** Most nodes are near the bottom, where h is small, and only a few nodes are high up. The slide combines the two bullets (at most ceil(n/2^(h+1)) nodes of height h, each costing O(h)) into O(n).
- Check of the node-count bound on the S11 tree (n = 7):
  - height 0 (leaves): 4 nodes, and ceil(7/2) = 4;
  - height 1: 2 nodes, and ceil(7/4) = 2;
  - height 2 (root): 1 node, and ceil(7/8) = 1.
- 🔎 Look up in Track B: how the sum of ceil(n/2^(h+1))·O(h) over all heights evaluates to O(n). The summation is not worked on the slides.

### [D09-S18] Heap sort (section title)
- Section title only.

### [D09-S19] Heapsort Strategy
- The elements to sort are first arranged in a heap.
- Using this heap, a sorted sequence is built in **reverse order** by repeatedly removing the root element…
- …and then re-arranging the remaining elements to restore the partial order tree property, and so on.
- "How does it work? (Max-Heapify / Build-Max-Heap / Heap-Extract-Max)".
- Note (verbatim): "Ascending and descending will always be min and max heap respectively".
- ⚠️ Read this note together with S10: an array sorted in **ascending** order is a **min-heap**, and one sorted in **descending** order is a **max-heap**. Do **not** read it as "use a min-heap to sort ascending". The class HEAP-SORT (S21–S22) uses **BUILD-MAX-HEAP** and still outputs ascending order (`[3, 7, 8, 12, 21, 23]`). The largest key is removed first ("reverse order") and parked at the right end of the array.

### [D09-S20] Heapsort in action (one root removal on Heap 2, "vacant" method)
- The figure shows five stages:
  - (a) The heap.
  - (b) The root key has been removed, and the rightmost leaf at the bottom level has been removed. **K = 6 must be reinserted.**
  - (c) The larger child of the vacant spot, 30, is greater than K, so it moves up and the vacant spot moves down.
  - (d) The larger child of the vacant spot, 18, is greater than K, so it moves up and the vacant spot moves down.
  - (e) The vacant spot is now a leaf, so K = 6 is inserted there.

```text
(a) the heap                     (b) 50 removed; K=6 taken
                                     from the last leaf

              50                               __
           /       \                        /       \
      24              30               24              30
     /   \           /   \            /   \           /   \
  20      21      18       3       20      21      18       3
  / \     /                        / \
12   5   6                       12   5

(c) 30 > K: moves up             (d) 18 > K: moves up             (e) vacant is a leaf: K=6 inserted

              30                               30                               30
           /       \                        /       \                        /       \
      24              __               24              18               24              18
     /   \           /   \            /   \           /   \            /   \           /   \
  20      21      18       3       20      21      __       3       20      21       6       3
  / \                              / \                              / \
12   5                           12   5                           12   5
```

- **Verified:** this gives exactly the same result as HEAP-EXTRACT-MAX with MAX-HEAPIFY:
  `[50,24,30,20,21,18,3,12,5,6]` becomes `[30,24,18,20,21,6,3,12,5]`.
- The "vacant moves down" description is the same path as MAX-HEAPIFY's swaps (the larger child moves up each time). Here it is described as moving a hole instead of swapping K at every level.

### [D09-S21] HEAP-SORT ⭐
```text
HEAP-SORT(A)
    BUILD-MAX-HEAP(A)
    For I ← length [A] down to 2
        Do exchange A[1] ↔ A [i]
            Heap-size[A] ← heap-size[A]-1
            MAX-HEAPIFY(A,1)
```
- ⚠️ **Glyph loss.** On the slide the exchange arrow "↔" and the second "←" show as empty boxes "□". The loop variable is written "I" in the `For` line but "i" in the body; both mean the same variable.
- Complexity as stated on the slide:
  - "The running time of Build_Heap is O(n)".
  - "Max-Heapify takes O(log n) (heapify to apply n-1 times)".
  - "Therefore running time is **O(n log n)**".
- 0-based form, as used in the S22 table: for i = n−1 down to 1, exchange A[0] ↔ A[i], decrease heap-size by 1, then call MAX-HEAPIFY(A,0).
- Difference from HEAP-EXTRACT-MAX:
  - Extract **copies** the last key into the root and returns the max.
  - HEAP-SORT **exchanges** the root with the last heap cell, so the max is stored at the end of the array. This is what produces the sorted array in place.

### [D09-S22] Full HEAP-SORT trace on `[12, 7, 8, 23, 3, 21]` ⭐
- The slide has two tables, "Build Max heap" (i → 2 to 0) and "Heap-Sort" (It-1 … It-5). Yellow cells are the sorted part, which grows from the right.
- **Build phase:**
  - i=2: l=5 holds 21, and r=6 is out of range. Swap 2↔5, giving `[12,7,21,23,3,8]`.
  - i=1: l=3 holds 23 and r=4 holds 3. Swap 1↔3, giving `[12,23,21,7,3,8]`.
  - i=0: l=1 holds 23 and r=2 holds 21. Swap 0↔1, giving `[23,12,21,7,3,8]`. At index 1, 12 ≥ 7 and 12 ≥ 3, so it exits.

```text
start                     i=2: swap 2<->5           i=1: swap 1<->3           i=0: swap 0<->1 (heap built)
[12, 7, 8, 23, 3, 21]     [12, 7, 21, 23, 3, 8]     [12, 23, 21, 7, 3, 8]     [23, 12, 21, 7, 3, 8]

      12                        12                       12                        23
     /   \                     /   \                    /   \                     /   \
   7       8                 7      21               23      21                12      21
  / \     /                 / \     /                / \     /                 / \     /
23   3  21                23   3   8                7   3   8                 7   3   8
```

- ⚠️ **Confusing label.** In the slide's build table, the inner row labelled "for i→1" inside the i=0 block is **not** a new loop iteration. It is the recursive MAX-HEAPIFY(A,1) call that follows the swap 0↔1. The loop visits i = 2, 1 and 0 once each.
- **Sort phase.** Each iteration has two parts: exchange the root with the last heap cell, then heapify the root. In the trees below, `|` separates the heap from the sorted part.

```text
It-1: exch 0<->5           It-1: swap 0<->2           It-2: exch 0<->4
[8, 12, 21, 7, 3 | 23]     [21, 12, 8, 7, 3 | 23]     [3, 12, 8, 7 | 21, 23]

      8                         21                          3
    /   \                      /   \                      /   \
 12      21                 12       8                 12       8
 / \                        / \                        /
7   3                      7   3                      7

It-2: swap 0<->1           It-2: swap 1<->3           It-3: exch 0<->3
[12, 3, 8, 7 | 21, 23]     [12, 7, 8, 3 | 21, 23]     [3, 7, 8 | 12, 21, 23]

     12                         12                      3
    /   \                      /   \                   / \
  3       8                  7       8                7   8
 /                          /
7                          3

It-3: swap 0<->2           It-4: exch 0<->2           It-4: swap 0<->1
[8, 7, 3 | 12, 21, 23]     [3, 7 | 8, 12, 21, 23]     [7, 3 | 8, 12, 21, 23]

  8                          3                          7
 / \                        /                          /
7   3                      7                          3

It-5: exch 0<->1  -> heap of size 1, nothing to heapify
[3 | 7, 8, 12, 21, 23]   =>  final [3, 7, 8, 12, 21, 23]
```

- **Final: `[3, 7, 8, 12, 21, 23]`.** Every array in the slide's right-hand table matches the verified run row for row. The exam-format table is in §5, T7.

### [D09-S23] (blank slide)
- No content. The original .pptx is also empty for this slide.

### [D09-S24] Video Lecture of the topic can be found at
The professor's links:
- Heap – Introduction: https://www.youtube.com/watch?v=phYfC_NqfHQ
- Illustrative Example of MaxHeapify, BuildMax and ExtractMax Procedures: https://www.youtube.com/watch?v=iCQO2OP1_TI&t=5s
- Build Max Heapify ExtractMax Analysis: https://www.youtube.com/watch?v=qcoqre-JHQU
- HeapSort Strategy and Complexity Analysis: https://youtu.be/jCKWkFTZwCk
- Understanding HeapSort with an Illustrative Example: https://youtu.be/_UZ1gf0M0GM

This fifth link is cut off below the visible area of the slide image, but it is present in the original .pptx.

---

### Deck 10 — "Bucket Sort and Radix Sort" (31 slides)

> The footers "10/02/05" and "2026-10-19" on every slide are template dates; ignore them.

### [D10-S1] Bucket Sort and Radix Sort (title slide)
- Title only.

### [D10-S2] Bucket Sort (section title)
- Section title only.

### [D10-S3] Time Complexity comparison of Sorting Algorithms ⭐

| Algorithm (data structure: Array) | Best | Average | Worst | Space |
|---|---|---|---|---|
| Quicksort | O(n log(n)) | O(n log(n)) | O(n^2) | O(n)/O(log n) |
| Mergesort | O(n log(n)) | O(n log(n)) | O(n log(n)) | O(n) |
| Heapsort | O(n log(n)) | O(n log(n)) | O(n log(n)) | O(1) |
| Bubble Sort | O(n) | O(n^2) | O(n^2) | O(1) |
| Insertion Sort | O(n) | O(n^2) | O(n^2) | O(1) |
| Select Sort | O(n^2) | O(n^2) | O(n^2) | O(1) |
| Bucket Sort | O(n+k) | O(n+k) | O(n^2) | O(nk) |
| Radix Sort | O(nk) | O(nk) | O(nk) | O(n+k) |

- ⭐ Heapsort is the only O(n log n) algorithm in the table whose **worst** case is also O(n log n) **and** whose space is O(1).
- ⚠️ **Typo.** The Quicksort space entry is written "O(n)/0(logn)", with a digit zero instead of the letter O.
- ⚠️ **Undefined symbol.** k is not defined on this slide. Later slides write bucket sort as O(n+m), with m = range / number of buckets [D10-S13], and radix sort as O(pn), with p = number of digits [D10-S24]. The table's O(n+k) and O(nk) match these if k is read as m and p respectively.
- 🔎 Look up in Track B: what k means in these entries, and why bucket sort's worst case is listed as O(n²). The deck's own analysis of the integer version [D10-S13] only derives O(n+m).

### [D10-S4] Space Complexity comparison of Sorting Algorithms

| Algorithm | Worst Case Auxiliary Space Complexity |
|---|---|
| Quicksort | O(n) |
| Mergesort | O(n) |
| Heapsort | O(1) |
| Bubble / Insertion / Select Sort | O(1) |
| Bucket Sort | O(nk) |
| Radix Sort | O(n+k) |

- Heapsort's O(1) fits the S22 trace in deck 09, where everything happens inside the one array.
- In the same vein, [D06-S3] calls all the non-comparison techniques "outplaced" (not in-place).

### [D10-S5] Time complexity of Sorting
- The best algorithms discussed so far are heap sort and merge sort, which are O(n log n). Quick sort is called the "best one in practice": O(n log n) on average, O(n²) in the worst case.
- **Can we do better than O(n log n)? No.** "Any comparison-based sorting algorithm will need at least O( n log n ) operations".
- ⚠️ **Notation.** "At least O(…)" mixes notations. A lower bound is what Ω expresses in the class's asymptotic-notation deck ([D03-S12]: Ω gives an asymptotic lower bound).
- 🔎 Look up in Track B: the proof of the comparison-sort lower bound. It is not on the slides.

### [D10-S6] Restrictions on the problem
- Suppose the values to sort **can repeat** but **have a limit** (underlined on the slide), for example digits 0–9. Then sorting can be made more efficient.
- Is an algorithm better than O(n log n) possible? **Yes**, and the strategy will **not involve comparisons**.
- [D06-S3] lists bucket sort, radix sort and counting sort as non-comparison-based sorts.
- 🔎 Look up in Track B: counting sort. [D06-S3] names it, but deck 10 never teaches it under that name. The S11 bucket sort does count values ("each bucket is just a counter", S12).

### [D10-S7] Bucket sort — idea ⭐
- Suppose the values are in the range **0..m−1**. Then:
  1. Start with **m empty buckets** numbered 0 to m−1.
  2. Scan the list and place element s[i] **in bucket s[i]**.
  3. Output the buckets in order.
- This needs an array of buckets, and "the values in the list to be sorted will be the indexes to the buckets" (underlined on the slide).
- **No comparisons** are necessary.

### [D10-S8] Example (input and output)
- Input: `4 2 1 2 0 3 2 1 4 0 2 3 0` (n = 13). Output: `0 0 0 1 1 2 2 2 2 3 3 4 4`.
- The middle box is empty in this view; the bucket contents appear on S10.

### [D10-S9] Example (empty buckets)
- Five empty buckets labelled 0, 1, 2, 3 and 4, captioned "Bucket with indices same as input range". So m = 5.

### [D10-S10] Example (filled buckets)
```text
input : 4 2 1 2 0 3 2 1 4 0 2 3 0        (n = 13, m = 5)

bucket 0 | 0 0 0
bucket 1 | 1 1
bucket 2 | 2 2 2 2
bucket 3 | 3 3
bucket 4 | 4 4

output: 0 0 0 1 1 2 2 2 2 3 3 4 4        (read buckets 0 -> 4)
```

### [D10-S11] Bucket sort algorithm ⭐
```text
Algorithm BucketSort( S )
( values in S are between 0 and m-1 )

for j ← 0 to m-1 do              // initialize m buckets
    b[j] ← 0

for i ← 0 to n-1 do              // place elements in their
    b[S[i]] ← b[S[i]] + 1        // appropriate buckets

i ← 0
for j ← 0 to m-1 do              // place elements in buckets
    for r ← 1 to b[j] do         // back in S
        S[i] ← j
        i ← i + 1
```
- ⚠️ **Glyph loss.** Every "←" shows as an empty box "□" on the slide.
- This version stores **counts**: b[j] is the number of times value j occurs. It matches "sorting values" on S12.
- **Full trace on the S8 example** (verified). The counting phase:

| i | S[i] | b[0] | b[1] | b[2] | b[3] | b[4] |
|---|---|---|---|---|---|---|
| init | — | 0 | 0 | 0 | 0 | 0 |
| 0 | 4 | 0 | 0 | 0 | 0 | 1 |
| 1 | 2 | 0 | 0 | 1 | 0 | 1 |
| 2 | 1 | 0 | 1 | 1 | 0 | 1 |
| 3 | 2 | 0 | 1 | 2 | 0 | 1 |
| 4 | 0 | 1 | 1 | 2 | 0 | 1 |
| 5 | 3 | 1 | 1 | 2 | 1 | 1 |
| 6 | 2 | 1 | 1 | 3 | 1 | 1 |
| 7 | 1 | 1 | 2 | 3 | 1 | 1 |
| 8 | 4 | 1 | 2 | 3 | 1 | 2 |
| 9 | 0 | 2 | 2 | 3 | 1 | 2 |
| 10 | 2 | 2 | 2 | 4 | 1 | 2 |
| 11 | 3 | 2 | 2 | 4 | 2 | 2 |
| 12 | 0 | 3 | 2 | 4 | 2 | 2 |

- The write-back phase:
  - j=0 writes 0 into S[0..2];
  - j=1 writes 1 into S[3..4];
  - j=2 writes 2 into S[5..8];
  - j=3 writes 3 into S[9..10];
  - j=4 writes 4 into S[11..12].
- The result is S = `[0,0,0,1,1,2,2,2,2,3,3,4,4]`. The inner `S[i] ← j` line runs 13 = n times in total.

### [D10-S12] Values versus entries
- **Sorting values:** each bucket is **just a counter** that is incremented whenever a value matching the bucket's number is seen. This is the S11 version.
- **Sorting entries by keys:** each bucket is **a queue**. Entries are enqueued into the matching bucket and dequeued back into the array after the scan.
- Because a queue gives entries back in the order they arrived, entries with equal keys keep their original order. Radix sort relies on exactly this ([D10-S18] step 3b, [D10-S23]).

### [D10-S13] Time complexity (bucket sort) ⭐
- Bucket initialisation: **O(m)**.
- From array to buckets: **O(n)**.
- From buckets to array: **O(n)**. This stage is a nested loop, but all it does is dequeue from each bucket until all are empty, which is n dequeue operations in total.
- Since m will likely be small compared with n, **bucket sort is O(n)**. "Strictly speaking, time complexity is O ( n + m )".
- ⚠️ **Typo.** The pseudocode box on this slide ends with "i ← i + 10". It should be "i ← i + 1", as on S11.

### [D10-S14] Sorting floating point numbers
- Task (verbatim): "Sort a large set of floating point numbers which are in range from 0.0 to 0.9 and are uniformly distributed across the range."
- The figure shows the input array and the buckets created:

| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| input | 0.78 | 0.17 | 0.39 | 0.26 | 0.72 | 0.94 | 0.21 | 0.12 | 0.23 | 0.68 |

| bucket | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| list | / | 0.12 → 0.17 | 0.21 → 0.23 → 0.26 | 0.39 | / | / | 0.68 | 0.72 → 0.78 | / | 0.94 |

- What the figure shows:
  - Bucket k holds the numbers whose **first digit after the decimal point is k**: 0.78 goes to bucket 7, 0.17 to bucket 1, and so on (verified for all 10 values).
  - Each bucket is a linked list, and each list is shown in **increasing order**. Bucket 1 shows 0.12 → 0.17 even though 0.17 comes first in the input.
- Reading buckets 0 → 9 (S7: "output the buckets in order") gives: 0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94.
- ⚠️ The title says the range is "0.0 to 0.9", but the example contains 0.94. Bucket 9 actually holds 0.9…, up to just below 1.0.
- 🔎 Look up in Track B: how each bucket's list is kept sorted (the slide shows only the final lists), the full floating-point bucket-sort algorithm, and where the O(n²) worst case in the S3 table comes from.

### [D10-S15] Radix sort (section title)
- Section title only.

### [D10-S16] Sorting integers ⭐
- To bucket-sort an array of arbitrary (non-negative) integers, the **number of buckets depends on the maximum integer value** (bold and underlined on the slide).
- Example: sorting **1000** integers whose maximum value is **999999** would need **1 million buckets**.
- So the time complexity is not really O(n). Because **m >>> n**, the actual time complexity is **O(m)**.
- "Can we do better?" The answer is radix sort, on the next slide.

### [D10-S17] Radix sort — idea ⭐
- Repeatedly sort by digit: perform **multiple bucket sorts on S starting with the rightmost digit**.
- If the maximum value is 999999, **only ten buckets** are needed (not 1 million).
- Use this strategy when the keys are integers and there is a reasonable limit on their values.
- The **number of passes** (bucket-sort stages) depends on **the number of digits in the maximum value** (underlined on the slide).

### [D10-S18] Algorithm for Radix Sort ⭐
The five steps on the slide, paraphrased:
1. Find the **maximum number of digits or characters**: take the maximum element and count its digits or characters.
2. Set up **10 buckets (0–9)** for decimal digits, or **256 buckets (0–255)** for byte characters. There is one bucket per possible digit or character value.
3. Start at the **least significant** digit or character position and work **right to left**. For each position:
   - a. Put each element into the bucket for its **current** digit or character.
   - b. **Collect** the elements from the buckets **in the order they were placed**. This keeps elements with the same digit in their existing order.
4. Repeat step 3 for every position, from least significant to most significant.
5. After the last position, the array is sorted.

### [D10-S19] Example: first pass (empty buckets)
- Input: `12 58 37 64 52 36 99 63 18 9 20 88 47` (n = 13, maximum 99, so p = 2 passes).
- The slide shows ten empty buckets (0–9) and the result row `20 12 52 63 64 36 37 47 58 18 88 9 99`.

### [D10-S20] Example: first pass (buckets filled — ones digit)

| bucket (ones digit) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| contents, in order placed | 20 | — | 12, 52 | 63 | 64 | — | 36 | 37, 47 | 58, 18, 88 | 99, 9 |

- The slide's list after pass 1 is `20 12 52 63 64 36 37 47 58 18 88 9 99`.
- ⚠️ **Order error on the slide.** In the input, 99 comes **before** 9 (positions 7 and 10), so 99 is placed in bucket 9 first. By the slide's own rule (S18 step 3b: collect in the order placed), the pass-1 list must end **`… 88, 99, 9`**. The verified stable pass-1 list is `20 12 52 63 64 36 37 47 58 18 88 99 9`.
- The final answer is unaffected: in pass 2, 9 (tens digit 0) and 99 (tens digit 9) go to different buckets.

### [D10-S21] Example: second pass (tens digit)

| bucket (tens digit) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| contents | 9 | 12, 18 | 20 | 36, 37 | 47 | 52, 58 | 63, 64 | — | 88 | 99 |

- Result: **`9 12 18 20 36 37 47 52 58 63 64 88 99`**, which is sorted. The single-digit 9 is treated as 09, so it goes to bucket 0.

### [D10-S22] Example: 1st and 2nd passes (summary)
```text
input          12 58 37 64 52 36 99 63 18  9 20 88 47
  | sort by rightmost digit (least significant)
pass 1 (slide) 20 12 52 63 64 36 37 47 58 18 88  9 99   <- stable version ends "88 99  9" (see S20 ⚠️)
  | sort by leftmost digit (second least significant)
pass 2          9 12 18 20 36 37 47 52 58 63 64 88 99
```
- For two-digit numbers, the "leftmost digit" is the second least significant digit.

### [D10-S23] Radix sort and stability ⭐
- Radix sort works **as long as the bucket sort stages are stable sorts**.
- **Stable sort:** when keys tie, the relative order of the elements is preserved in the result. Example: 52 and 58 have the same first digit. If 52 is before 58 before a stage, 52 must still be before 58 after it.
- This way, the work done by the earlier bucket-sort stages is preserved.
- In the S21 pass, 52 and 58 both land in bucket 5. Pass 1 had already put 52 before 58 (bucket 2 comes before bucket 8), and the stable pass 2 keeps that order.

### [D10-S24] Time complexity (radix sort) ⭐
- If there is a fixed number **p** of bucket-sort stages (six stages when the maximum value is 999999), radix sort is **O(n)**: there are p stages, each taking O(n).
- "Strictly speaking, time complexity is **O( pn )**, where p is the number of digits".

### [D10-S25] Radix sort — summary ⭐
- **Only 10 buckets** are needed however many stages there are, because the buckets are reused at each stage.
- Radix sort can also be applied to **words**:
  - set a limit on the number of letters in a word;
  - use **27 buckets** (or more, depending on the allowed characters): one per letter plus a **"blank"**;
  - the word-length limit is **exactly the number of bucket-sort stages** needed.
- **Strategy?** The slide asks three questions and gives the class answers in brackets:

| Question on slide | Class answer |
|---|---|
| Read char left to right? | **[R_L]**, i.e. read **right to left** |
| Blank spaces to be taken at beginning or last? | **[L]**, i.e. at the **last** (pad short words at the end) |
| Space bucket to be kept at beginning or last? | **[L]**, i.e. the blank bucket comes **last**, after z |

### [D10-S26] Summary ⭐
- Bucket sort and radix sort are O(n) **only because restrictions were imposed** on the input list.
- Sorting in general can be done in O(n log n) time.

### [D10-S27] Sorting Words Using Radix Sort (section title)
- Section title only.

### [D10-S28] Exercise
- "Apply Radix sort on the following four words: **dart, fear, do, car**".

### [D10-S29] Assumptions for the word exercise ⭐
- Read the characters in a word **from right to left**.
- Blank spaces in a word (if assumed) are **taken at last**, so shorter words are padded at the end.
- The **space bucket is kept at last**.

### [D10-S30] (blank slide — the exercise was worked in class)
- The slide is empty; the original .pptx holds only a date placeholder.
- **Verified solution** under the S29 rules. The longest word has 4 letters, so there are 4 passes, and ␣ marks a blank. Padded: `dart`, `fear`, `do␣␣`, `car␣`.

| pass | position read | non-empty buckets, in bucket order (a…z, then ␣) | list after pass |
|---|---|---|---|
| 1 | 4th char | r: fear · t: dart · ␣: do␣␣, car␣ | fear, dart, do␣␣, car␣ |
| 2 | 3rd char | a: fear · r: dart, car␣ · ␣: do␣␣ | fear, dart, car␣, do␣␣ |
| 3 | 2nd char | a: dart, car␣ · e: fear · o: do␣␣ | dart, car␣, fear, do␣␣ |
| 4 | 1st char | c: car␣ · d: dart, do␣␣ · f: fear | **car, dart, do, fear** |

- In pass 4, dart stays before do in bucket d because pass 3 had placed dart first. That is stability at work [D10-S23].
- Here the answer would be the same with the blank bucket first, because no word is a prefix of another (verified). The position of the blank bucket matters when one word is a prefix of another; see §6 Q18.

### [D10-S31] Video lectures
The professor's links:
- Bucket Sort Strategy and Analysis: https://youtu.be/N7-q_O3lgtg
- Radix Sort and its Complexity Analysis: https://youtu.be/pdY5CC_3iEc

---

## 3. Definitions & key terms

| Term | Meaning as taught | Ref |
|---|---|---|
| Full binary tree | Every node has **either zero or two children**; no node has exactly one child. | [D09-S4] |
| Complete binary tree | All levels completely filled except possibly the last; on the last level **nodes are as far left as possible**, with no gaps. | [D09-S4] |
| Perfect binary tree | **Both full and complete**; all leaves at the same depth, so every level is full. | [D09-S4] |
| 2-tree | Label for figure (a) on D09-S8: every node has 0 or 2 children. | [D09-S8] |
| Heap | A binary tree with (1) heap structure and (2) the partial order tree property. | [D09-S7] |
| Heap structure | "T is complete" and "All leaves are at depth h or h–1" (h = height). | [D09-S7] |
| Partial order tree property (maximizing) | "the key at any node is greater than or equal to the keys at each of its children". | [D09-S7] |
| Max-heap / Min-heap | Max-heap: the maximizing property above. Min-heap: the mirror image (not formally defined on the slides). A **descending** array is a max-heap; an **ascending** array is a min-heap. | [D09-S10, S19] |
| Height | A heap's height is "(log n)". A complete tree of height h has at most **2^(h+1) − 1** nodes. | [D09-S9] |
| Leaves | Consecutive indexes: **floor(n/2)+1 … n** (1-based); **floor(n/2) … n−1** (0-based, corrected ⚠️). | [D09-S9] |
| A.length vs A.heap-size | Number of cells in the array vs number of cells that currently belong to the heap. heap-size shrinks during extract and heap-sort. | [D09-S10, S15, S21] |
| Index formulas | 1-based: L = 2i, R = 2i+1, P = floor(i/2). 0-based: L = 2i+1, R = 2i+2, P = ceil(i/2)−1. | [D09-S9] |
| MAX-HEAPIFY(A,i) | Sinks A[i]: swap it with its larger child while that child is larger, then recurse at the child's position. | [D09-S10] |
| BUILD-MAX-HEAP(A) | MAX-HEAPIFY on i = floor(n/2) downto 1 (1-based), or floor(n/2)−1 downto 0 (0-based). | [D09-S10] |
| HEAP-EXTRACT-MAX(A) | Return the root; move the last key to the root; heap-size − 1; MAX-HEAPIFY(root). | [D09-S15] |
| Heap underflow | The error raised by extract when heap-size < 1 (the heap is empty). | [D09-S15] |
| HEAP-SORT(A) | BUILD-MAX-HEAP, then for i = n down to 2: exchange root ↔ A[i], heap-size − 1, MAX-HEAPIFY(root). | [D09-S21] |
| Comparison-based sorting | Sorting by comparing keys; "will need at least … n log n operations". Examples: heap, merge, quick, insertion. | [D10-S5], [D06-S3] |
| Non-comparison sorting | Uses values as bucket indexes, so no comparisons are needed (bucket, radix, counting). | [D10-S6, S7], [D06-S3] |
| Bucket | An array cell indexed by a value. It is a **counter** when sorting values and a **queue** when sorting entries by key. | [D10-S7, S12] |
| m | Number of buckets; the values lie in 0..m−1. | [D10-S7, S11] |
| k | Symbol used in the comparison tables; **not defined** there (⚠️). | [D10-S3, S4] |
| p | Number of digits of the maximum value, which equals the number of radix passes (stages). | [D10-S24] |
| Pass / stage | One bucket sort on one digit or character position. | [D10-S17, S24] |
| Least significant digit | The rightmost digit; radix sort starts there and moves right to left. | [D10-S17, S18, S22] |
| Stable sort | "in case of ties, relative order of elements are preserved in the resulting array". | [D10-S23] |
| Blank (space) bucket | The 27th bucket, used for padding blanks when radix-sorting words. The class keeps it **last**. | [D10-S25, S29] |
| In-place vs "outplaced" | Heapsort needs O(1) auxiliary space. All the non-comparison techniques are "outplaced". | [D10-S4], [D06-S3] |

---

## 4. Algorithm cards as taught

### Card 1 — MAX-HEAPIFY(A, i) [D09-S10, S17]
```text
MAX-HEAPIFY(A,i)
{
    l=2i
    r=2i+1
    If(l<=A.heap-size and A[l]>A[i])
        largest=l
    else largest = i
    If(r<=A.heap-size and A[r]>A[largest])
        largest=r
    If(largest<>i)
        Exchange A[i] with A[largest]
        MAX-HEAPIFY(A,largest)
}
```
- **Idea:** compare a node with the children it actually has; if the larger child is bigger, swap the two and continue from the child's position; stop when no swap is needed.
- **Complexity:** O(log n). At a node of height h the cost is O(h) [D09-S17].
- **Stable?** Not applicable; this is a helper procedure, not a sort.
- **Assumptions:** the tree is stored as a complete binary tree in an array [D09-S7, S9].
  - It is always used bottom-up (BUILD-MAX-HEAP) or at the root of an otherwise valid heap (extract, heap-sort).
  - A single call on an arbitrary array does **not** necessarily produce a heap [D09-S11].
- **0-based form (slide tables):** `l = 2i+1`, `r = 2i+2`. A child exists only if its index is ≤ heap-size−1; otherwise the slides write "(X)".
- **Pitfalls:**
  - Choose the **larger** of the two children.
  - Recursion continues at the **child's index**, not at i+1.
  - "Exit" happens as soon as `largest = i`.

### Card 2 — BUILD-MAX-HEAP(A) [D09-S10, S13, S17; A2]
```text
BUILD-MAX-HEAP(A)
{
    A.heap-size= A.length
    for(i=floor(A.length/2) downto 1)          // 0-based: i=floor(A.length/2)-1 downto 0
        MAX-HEAPIFY(A,i)
}
```
- **Idea:** leaves are already heaps ("every node is heap in itself", [D09-S9]). Heapify every non-leaf, starting from the last one and moving back to the root.
- **Complexity:** **O(n)**. At most ceil(n/2^(h+1)) nodes have height h, and each costs O(h) [D09-S17].
- **Stable?** Not applicable.
- **Assumptions:** the input is any array, viewed as a complete tree.
- **0-based:** for n = 6 or 7 the loop is i = 2, 1, 0 ("i → 2 to 0" on [D09-S13, S22] and [A2]). The A2 solution annotates this as "Non leaf nodes (n/2)−1 to 0".
- **Pitfall:** a swap at one loop index can trigger recursive calls further down. These calls belong to the **same** loop iteration ([D09-S22] ⚠️ label).

### Card 3 — HEAP-EXTRACT-MAX(A) [D09-S15, S17, S20]
```text
Heap-Extract-Max(A)
{
    If A.heap-size < 1
        error " heap underflow"
    max=A[1]
    A[1]=A[A.heap-size]
    A.heap-size=A.heap-size-1
    MAX-HEAPIFY(A,1)
    return max
}
```
- **Idea:** the maximum is at the root. Take it, put the last heap element at the root, shrink the heap, and sink the new root. [D09-S20] shows the same movement as a "vacant" hole moving down.
- **Complexity:** **O(log n)** [D09-S17]. (⚠️ The S3 table's "Delete (Min) O(1)" contradicts this.)
- **Stable?** Not applicable.
- **0-based:** `max = A[0]`; `A[0] = A[heap-size−1]`; heap-size − 1; MAX-HEAPIFY(A,0).

### Card 4 — HEAP-SORT(A) [D09-S19, S21, S22; D10-S3, S4; D06-S3]
```text
HEAP-SORT(A)
    BUILD-MAX-HEAP(A)
    For i ← length[A] down to 2
        Do exchange A[1] ↔ A[i]
            heap-size[A] ← heap-size[A]-1
            MAX-HEAPIFY(A,1)
```
- The lost "↔" and "←" glyphs are restored here, and "I" is written as i (see the ⚠️ on [D09-S21]).
- **Idea:** build a max-heap. Then n−1 times: swap the root (the current maximum) with the last heap cell, shrink the heap by one, and re-heapify the root. The sorted part grows from the right.
- **Output order:** **ascending**, using a **max-heap** [D09-S22].
- **Complexity:**
  - O(n) + (n−1)·O(log n) = **O(n log n)** [D09-S21].
  - The table gives O(n log n) best, average and worst [D10-S3].
  - Auxiliary space is **O(1)** [D10-S4].
- **Stable?** **No.** Heap sort is listed under "Unstable sorting" [D06-S3].
- **Assumptions:** the array is treated as a complete binary tree; the sort works in place.
- **0-based:** for i = n−1 down to 1: exchange A[0] ↔ A[i], heap-size − 1, MAX-HEAPIFY(A,0).

### Card 5 — BucketSort(S) for integer values [D10-S7, S11, S12, S13, S16]
```text
Algorithm BucketSort( S )
( values in S are between 0 and m-1 )
for j ← 0 to m-1 do              // initialize m buckets
    b[j] ← 0
for i ← 0 to n-1 do              // place elements in their
    b[S[i]] ← b[S[i]] + 1        // appropriate buckets
i ← 0
for j ← 0 to m-1 do              // place elements in buckets
    for r ← 1 to b[j] do         // back in S
        S[i] ← j
        i ← i + 1
```
- **Idea:** use each value as a bucket index, count (or enqueue) it, then read the buckets back in order. **No comparisons** are made [D10-S7].
- **Complexity:**
  - Breakdown: O(m) to initialise + O(n) to fill + O(n) to write back = **O(n + m)**. This is "O(n)" when m is small compared with n [D10-S13].
  - When **m >>> n**, the cost is **O(m)** (example: max 999999 needs 1 million buckets) [D10-S16].
  - The table gives O(n+k) best and average, O(n²) worst, and O(nk) space [D10-S3, S4].
- **Stable?**
  - In the counter version only values are written back, so there are no separate entries whose order could change.
  - In the entries version each bucket is a **queue** (enqueue, then dequeue back), so equal keys come out in arrival order [D10-S12]. This is the property radix sort needs [D10-S18 step 3b, S23].
- **Assumptions:** non-negative integer values in **0..m−1**; values may repeat; the range is limited [D10-S6, S7].

### Card 6 — Bucket sort for floating-point numbers (figure only) [D10-S14]
- **Idea as shown in the figure:**
  - A number goes to the bucket numbered by its **first decimal digit** (10 buckets, 0–9).
  - Each bucket is a linked list displayed in **increasing order**.
  - Reading the buckets 0→9 gives the sorted output.
- **Assumptions:** a "large set" of numbers in the range 0.0–0.9 that are **uniformly distributed**. (⚠️ The example includes 0.94.)
- **Complexity / stability:** not derived on the slides. 🔎 Look up in Track B: the float bucket-sort algorithm, how the lists are kept sorted, and the O(n²) worst case shown in [D10-S3].

### Card 7 — Radix sort for integers [D10-S17, S18, S23, S24, S25]
- **Steps (S18, paraphrased):**
  1. p = number of digits of the maximum value.
  2. Set up 10 buckets (0–9).
  3. For each digit position, from the rightmost (least significant) to the leftmost:
     - place every element in the bucket for that digit;
     - collect the buckets 0→9, each **in the order its elements were placed**.
  4. After p passes the list is sorted.
- **Idea:** repeated stable bucket sorts. Only 10 buckets are needed, reused at every pass.
- **Complexity:**
  - p passes × O(n) = **O(pn)**, which is O(n) for a fixed p. Example: maximum 999999 gives p = 6 [D10-S24].
  - The table gives O(nk) in all cases and O(n+k) space [D10-S3, S4].
- **Stable?** **Every pass must be stable**; otherwise the earlier passes' work is lost [D10-S23].
- **Assumptions:** integer keys with a reasonable limit on their values [D10-S17]. Short numbers are treated as having leading zeros (9 = 09 goes to bucket 0 in the tens pass) [D10-S21].
- **Byte characters:** use 256 buckets (0–255) [D10-S18].

### Card 8 — Radix sort for words [D10-S25, S27–S30]
- **Rules (class convention):**
  - (1) Set a word-length limit L; the number of passes is L.
  - (2) Pad shorter words with **blanks at the end** ("taken at last").
  - (3) Read character positions **right → left**, from position L down to 1.
  - (4) Use **27 buckets**: a–z, then the **blank bucket last**.
  - (5) Collect in the order placed, which keeps every pass stable.
- **Complexity:** L passes × O(n). The number of passes equals the word-length limit [D10-S25].
- **Example:** dart, fear, do, car sorts to **car, dart, do, fear** ([D10-S30]; trace in §2).

### Complexity cheat-sheet (exactly as stated on the slides)

| Item | As stated | Ref |
|---|---|---|
| Max-Heapify | O(log n); O(h) at a node of height h | [D09-S17] |
| Heap-Extract-Max | O(log n) | [D09-S17] |
| Build_Heap | O(n) | [D09-S17], [D09-S21] |
| Heap sort | O(n log n) (best, average and worst); space O(1) | [D09-S21], [D10-S3, S4] |
| Heap (Min) operations | Insert O(log n), Search O(log n)⚠️, Find-Min O(1), Delete-Min O(1)⚠️ | [D09-S3] |
| Comparison sorting lower bound | "at least O(n log n)" (⚠️ a lower bound is Ω) | [D10-S5] |
| Bucket sort (integers) | O(m) + O(n) + O(n) = O(n + m), so O(n) when m is small | [D10-S13] |
| Bucket sort with m >>> n | O(m) | [D10-S16] |
| Bucket sort (table) | O(n+k) best and average, O(n²) worst; space O(nk) | [D10-S3, S4] |
| Radix sort | O(pn), so O(n) for fixed p (p = 6 when max = 999999) | [D10-S24] |
| Radix sort (table) | O(nk) best, average and worst; space O(n+k) | [D10-S3, S4] |
| Quick sort | O(n log n) average, O(n²) worst; "best one in practice" | [D10-S5] |
| Sorting in general | O(n log n); O(n) only under input restrictions | [D10-S26] |

---

## 5. Worked traces

> **How to lay out a heap answer (the professor's A2 format).**
> - Columns are the array indexes **0 … n−1**.
> - For each loop value of i, mark i, L and R under the matching columns (arrows show the swap), then write the array after the swap.
> - Write **exit** when the recursion stops.
> - The A2 solution also notes the loop range ("For I → 2 to 0", "Non leaf nodes (n/2)−1 to 0").
>
> The tables below add explicit `l, r` and `largest` columns.
> - "(X)" means the index is outside the heap.
> - "↳ recursive" is the recursive MAX-HEAPIFY call inside the same loop iteration.
> - **Bold** cells are the sorted part in heap-sort.
> - "—" marks a cell no longer in the heap after an extract.
>
> All tables were generated from the verified Python run.

### 5.1 Heap examples from the slides

#### T1 — MAX-HEAPIFY(A,0) on `[4, 2, 6, 1, 3, 5, 7]` [D09-S11]
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 4 | 2 | 6 | 1 | 3 | 5 | 7 |
| call i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 6 | 2 | 4 | 1 | 3 | 5 | 7 |
| ↳ recursive | 2 | 5, 6 | 6 | swap A[2]↔A[6] | 6 | 2 | 7 | 1 | 3 | 5 | 4 |
| ↳ recursive | 6 | 13(X), 14(X) | 6 | exit (no swap) | | | | | | | |

Result: `[6, 2, 7, 1, 3, 5, 4]`. This is **not** a max-heap, because 7 > 6. Trees are in §2 [D09-S11].

#### T2 — MAX-HEAPIFY(A,0) on `[16, 46, 15, 18, 17, 22, 19]` [D09-S12 exercise]
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 16 | 46 | 15 | 18 | 17 | 22 | 19 |
| call i=0 | 0 | 1, 2 | 1 | swap A[0]↔A[1] | 46 | 16 | 15 | 18 | 17 | 22 | 19 |
| ↳ recursive | 1 | 3, 4 | 3 | swap A[1]↔A[3] | 46 | 18 | 15 | 16 | 17 | 22 | 19 |
| ↳ recursive | 3 | 7(X), 8(X) | 3 | exit (no swap) | | | | | | | |

Result: `[46, 18, 15, 16, 17, 22, 19]`. This is **not** a max-heap, because 22 > 15.

#### T3 — BUILD-MAX-HEAP on `[4, 2, 6, 1, 3, 5, 7]` (i → 2 to 0) [D09-S13]
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 4 | 2 | 6 | 1 | 3 | 5 | 7 |
| loop i=2 | 2 | 5, 6 | 6 | swap A[2]↔A[6] | 4 | 2 | 7 | 1 | 3 | 5 | 6 |
| ↳ recursive | 6 | 13(X), 14(X) | 6 | exit (no swap) | | | | | | | |
| loop i=1 | 1 | 3, 4 | 4 | swap A[1]↔A[4] | 4 | 3 | 7 | 1 | 2 | 5 | 6 |
| ↳ recursive | 4 | 9(X), 10(X) | 4 | exit (no swap) | | | | | | | |
| loop i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 7 | 3 | 4 | 1 | 2 | 5 | 6 |
| ↳ recursive | 2 | 5, 6 | 6 | swap A[2]↔A[6] | 7 | 3 | 6 | 1 | 2 | 5 | 4 |
| ↳ recursive | 6 | 13(X), 14(X) | 6 | exit (no swap) | | | | | | | |

Result (max-heap): **`[7, 3, 6, 1, 2, 5, 4]`**.

#### T4 — BUILD-MAX-HEAP on `[16, 46, 15, 18, 17, 22, 19]` [D09-S14 exercise]
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 16 | 46 | 15 | 18 | 17 | 22 | 19 |
| loop i=2 | 2 | 5, 6 | 5 | swap A[2]↔A[5] | 16 | 46 | 22 | 18 | 17 | 15 | 19 |
| ↳ recursive | 5 | 11(X), 12(X) | 5 | exit (no swap) | | | | | | | |
| loop i=1 | 1 | 3, 4 | 1 | exit (no swap) | | | | | | | |
| loop i=0 | 0 | 1, 2 | 1 | swap A[0]↔A[1] | 46 | 16 | 22 | 18 | 17 | 15 | 19 |
| ↳ recursive | 1 | 3, 4 | 3 | swap A[1]↔A[3] | 46 | 18 | 22 | 16 | 17 | 15 | 19 |
| ↳ recursive | 3 | 7(X), 8(X) | 3 | exit (no swap) | | | | | | | |

Result (max-heap): **`[46, 18, 22, 16, 17, 15, 19]`**.

#### T5 — HEAP-EXTRACT-MAX on `[7, 3, 6, 1, 2, 5, 4]` [D09-S15]
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 7 | 3 | 6 | 1 | 2 | 5 | 4 |
| extract | | | | max=7 out; A[0]←A[6]; heap-size=6 | 4 | 3 | 6 | 1 | 2 | 5 | — |
| call i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 6 | 3 | 4 | 1 | 2 | 5 | — |
| ↳ recursive | 2 | 5, 6(X) | 5 | swap A[2]↔A[5] | 6 | 3 | 5 | 1 | 2 | 4 | — |
| ↳ recursive | 5 | 11(X), 12(X) | 5 | exit (no swap) | | | | | | | |

Returns **7**. The heap is now **`[6, 3, 5, 1, 2, 4]`** (heap-size 6), matching the green row on the slide.

#### T6 — Root removal on Heap 2 `[50, 24, 30, 20, 21, 18, 3, 12, 5, 6]` [D09-S20, "vacant" figure]
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 50 | 24 | 30 | 20 | 21 | 18 | 3 | 12 | 5 | 6 |
| extract | | | | max=50 out; A[0]←A[9]; heap-size=9 | 6 | 24 | 30 | 20 | 21 | 18 | 3 | 12 | 5 | — |
| call i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 30 | 24 | 6 | 20 | 21 | 18 | 3 | 12 | 5 | — |
| ↳ recursive | 2 | 5, 6 | 5 | swap A[2]↔A[5] | 30 | 24 | 18 | 20 | 21 | 6 | 3 | 12 | 5 | — |
| ↳ recursive | 5 | 11(X), 12(X) | 5 | exit (no swap) | | | | | | | | | | |

The heap is now **`[30, 24, 18, 20, 21, 6, 3, 12, 5]`**, which is picture (e) on the slide.

#### T7 — HEAP-SORT on `[12, 7, 8, 23, 3, 21]` [D09-S22]
Build phase:

| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 12 | 7 | 8 | 23 | 3 | 21 |
| loop i=2 | 2 | 5, 6(X) | 5 | swap A[2]↔A[5] | 12 | 7 | 21 | 23 | 3 | 8 |
| ↳ recursive | 5 | 11(X), 12(X) | 5 | exit (no swap) | | | | | | |
| loop i=1 | 1 | 3, 4 | 3 | swap A[1]↔A[3] | 12 | 23 | 21 | 7 | 3 | 8 |
| ↳ recursive | 3 | 7(X), 8(X) | 3 | exit (no swap) | | | | | | |
| loop i=0 | 0 | 1, 2 | 1 | swap A[0]↔A[1] | 23 | 12 | 21 | 7 | 3 | 8 |
| ↳ recursive | 1 | 3, 4 | 1 | exit (no swap) | | | | | | |

Sort phase:

| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|---|---|---|---|
| heap | | | | | 23 | 12 | 21 | 7 | 3 | 8 |
| **It-1** | | | | exchange A[0]↔A[5]; heap-size=5 | 8 | 12 | 21 | 7 | 3 | **23** |
| call i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 21 | 12 | 8 | 7 | 3 | **23** |
| ↳ recursive | 2 | 5(X), 6(X) | 2 | exit (no swap) | | | | | | |
| **It-2** | | | | exchange A[0]↔A[4]; heap-size=4 | 3 | 12 | 8 | 7 | **21** | **23** |
| call i=0 | 0 | 1, 2 | 1 | swap A[0]↔A[1] | 12 | 3 | 8 | 7 | **21** | **23** |
| ↳ recursive | 1 | 3, 4(X) | 3 | swap A[1]↔A[3] | 12 | 7 | 8 | 3 | **21** | **23** |
| ↳ recursive | 3 | 7(X), 8(X) | 3 | exit (no swap) | | | | | | |
| **It-3** | | | | exchange A[0]↔A[3]; heap-size=3 | 3 | 7 | 8 | **12** | **21** | **23** |
| call i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 8 | 7 | 3 | **12** | **21** | **23** |
| ↳ recursive | 2 | 5(X), 6(X) | 2 | exit (no swap) | | | | | | |
| **It-4** | | | | exchange A[0]↔A[2]; heap-size=2 | 3 | 7 | **8** | **12** | **21** | **23** |
| call i=0 | 0 | 1, 2(X) | 1 | swap A[0]↔A[1] | 7 | 3 | **8** | **12** | **21** | **23** |
| ↳ recursive | 1 | 3(X), 4(X) | 1 | exit (no swap) | | | | | | |
| **It-5** | | | | exchange A[0]↔A[1]; heap-size=1 | 3 | **7** | **8** | **12** | **21** | **23** |
| call i=0 | 0 | 1(X), 2(X) | 0 | exit (no swap) | | | | | | |

Final: **`[3, 7, 8, 12, 21, 23]`**. The trees for every step are in §2 [D09-S22].

### 5.2 Assignment 2 — heap question [A2]

#### T8 — A2 SAMPLE SOLUTION: BUILD-MAX-HEAP on `12, 9, 7, 2, 15, 32`
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 12 | 9 | 7 | 2 | 15 | 32 |
| loop i=2 | 2 | 5, 6(X) | 5 | swap A[2]↔A[5] | 12 | 9 | 32 | 2 | 15 | 7 |
| ↳ recursive | 5 | 11(X), 12(X) | 5 | exit (no swap) | | | | | | |
| loop i=1 | 1 | 3, 4 | 4 | swap A[1]↔A[4] | 12 | 15 | 32 | 2 | 9 | 7 |
| ↳ recursive | 4 | 9(X), 10(X) | 4 | exit (no swap) | | | | | | |
| loop i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 32 | 15 | 12 | 2 | 9 | 7 |
| ↳ recursive | 2 | 5, 6(X) | 2 | exit (no swap) | | | | | | |

Result: **`[32, 15, 12, 2, 9, 7]`**, which matches the professor's final (shaded) row.

```text
start                     i=2: swap 2<->5           i=1: swap 1<->4           i=0: swap 0<->2 (final)
[12, 9, 7, 2, 15, 32]     [12, 9, 32, 2, 15, 7]     [12, 15, 32, 2, 9, 7]     [32, 15, 12, 2, 9, 7]

     12                        12                        12                        32
    /   \                     /   \                     /   \                     /   \
  9       7                 9      32                15      32                15      12
 / \     /                 / \     /                 / \     /                 / \     /
2  15  32                 2  15   7                 2   9   7                 2   9   7
```

- ⚠️ **Slip in the sample solution.** After the i=1 swap (A[1]↔A[4], so R=4 is largest), the side note says "**i=3 exit**". The recursive call is actually MAX-HEAPIFY(A,**4**), which exits because 9 and 10 are out of range. It should read "i=4 exit". The arrays are all correct.
- The sample solution's numbers (12, 9, 7, 2, 15, 32) **differ** from the assignment sheet's Q1 numbers (11, 19, 7, 12, 15, 30). The sheet's version is traced next.
- A2's other two questions (quicksort's first PARTITION, and merge sort, both numbered "Q2") belong to decks 07 and 08. They use 1-based columns 1..6, whereas the heap question uses 0-based columns 0..5.

#### T9 — A2 Q1 as printed on the assignment sheet: BUILD-MAX-HEAP on `11, 19, 7, 12, 15, 30`
| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 11 | 19 | 7 | 12 | 15 | 30 |
| loop i=2 | 2 | 5, 6(X) | 5 | swap A[2]↔A[5] | 11 | 19 | 30 | 12 | 15 | 7 |
| ↳ recursive | 5 | 11(X), 12(X) | 5 | exit (no swap) | | | | | | |
| loop i=1 | 1 | 3, 4 | 1 | exit (no swap) | | | | | | |
| loop i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 30 | 19 | 11 | 12 | 15 | 7 |
| ↳ recursive | 2 | 5, 6(X) | 2 | exit (no swap) | | | | | | |

Result: **`[30, 19, 11, 12, 15, 7]`** (verified max-heap).

```text
start                       i=2: swap 2<->5             i=1: no swap                i=0: swap 0<->2 (final)
[11, 19, 7, 12, 15, 30]     [11, 19, 30, 12, 15, 7]     [11, 19, 30, 12, 15, 7]     [30, 19, 11, 12, 15, 7]

      11                          11                          11                          30
     /   \                       /   \                       /   \                       /   \
  19       7                  19      30                  19      30                  19      11
  / \     /                   / \     /                   / \     /                   / \     /
12  15  30                  12  15   7                  12  15   7                  12  15   7
```

- Why there is no swap at i=1: 19 is already ≥ both of its children, 12 and 15.
- Why the recursive call at i=0 exits: after 11 moves down to index 2, its only child is 7 (index 5), and 11 ≥ 7.

### 5.3 Bucket and radix examples from the slides (answer format)

#### T10 — BucketSort on `4 2 1 2 0 3 2 1 4 0 2 3 0`, m = 5 [D10-S8–S11]
- After the counting loop: **b = [3, 2, 4, 2, 2]** (the full step table is in §2 [D10-S11]).
- Write-back gives **S = [0, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4]**. The line `S[i] ← j` runs 13 = n times.

#### T11 — Floating-point buckets [D10-S14]

| value | 0.78 | 0.17 | 0.39 | 0.26 | 0.72 | 0.94 | 0.21 | 0.12 | 0.23 | 0.68 |
|---|---|---|---|---|---|---|---|---|---|---|
| bucket | 7 | 1 | 3 | 2 | 7 | 9 | 2 | 1 | 2 | 6 |

- Output, reading buckets 0→9 with each list in increasing order: 0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94.

#### T12 — Radix sort on `12 58 37 64 52 36 99 63 18 9 20 88 47` [D10-S19–S22]

| pass | digit | list after the pass |
|---|---|---|
| 1 | ones | 20 12 52 63 64 36 37 47 58 18 88 **99 9** (stable). The slide prints "…88 9 99" ⚠️ |
| 2 | tens | 9 12 18 20 36 37 47 52 58 63 64 88 99 |

The bucket tables are in §2 [D10-S20, S21].

#### T13 — Radix sort on words dart, fear, do, car [D10-S28–S30]
- Passes on positions 4 → 3 → 2 → 1, with blanks at the end and the blank bucket last:
  - after pass 1: fear, dart, do, car;
  - after pass 2: fear, dart, car, do;
  - after pass 3: dart, car, fear, do;
  - after pass 4: **car, dart, do, fear**.
- The full bucket table is in §2 [D10-S30].

### 5.4 Practice problems (new, with verified answers in 5.5)

- **P1 (BUILD-MAX-HEAP).** Convert the 0-based array `[5, 13, 2, 25, 7, 17, 20, 8, 4]` into a max-heap with BUILD-MAX-HEAP.
  - State the loop range.
  - For every MAX-HEAPIFY call give i, l, r and largest.
  - Give the array after each swap, and draw the final tree.
- **P2 (HEAP-SORT).** Sort the 0-based array `[15, 5, 20, 1, 17, 10, 30]` with HEAP-SORT.
  - Show the heap after BUILD-MAX-HEAP.
  - Show the array after every iteration It-1 … It-6.
- **P3 (bucket sort).**
  - (a) Apply the [D10-S11] BucketSort to `S = [3, 0, 5, 3, 1, 4, 0, 3, 5, 2, 1, 3]` with m = 6. Show b after the counting loop and S after the write-back. How many times does `S[i] ← j` run?
  - (b) Use queue buckets ([D10-S12]) to sort the entries (key, tag) = (3,a) (1,b) (3,c) (0,d) (1,e) (2,f) (3,g) by key. Show each bucket and the output. Do equal keys keep their order?
- **P4 (radix sort).** Radix-sort `[472, 38, 815, 206, 91, 560, 347, 18, 724, 605]` with the [D10-S18] algorithm. How many passes are needed? Show every bucket and the list after each pass.

### 5.5 Practice answers (verified)

#### P1 — answer
- n = 9, so the 0-based loop runs i = floor(9/2)−1 = **3** down to **0**.
- The leaves are at indexes 4…8 (from floor(9/2) = 4 to n−1 = 8).

| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 5 | 13 | 2 | 25 | 7 | 17 | 20 | 8 | 4 |
| loop i=3 | 3 | 7, 8 | 3 | exit (no swap) | | | | | | | | | |
| loop i=2 | 2 | 5, 6 | 6 | swap A[2]↔A[6] | 5 | 13 | 20 | 25 | 7 | 17 | 2 | 8 | 4 |
| ↳ recursive | 6 | 13(X), 14(X) | 6 | exit (no swap) | | | | | | | | | |
| loop i=1 | 1 | 3, 4 | 3 | swap A[1]↔A[3] | 5 | 25 | 20 | 13 | 7 | 17 | 2 | 8 | 4 |
| ↳ recursive | 3 | 7, 8 | 3 | exit (no swap) | | | | | | | | | |
| loop i=0 | 0 | 1, 2 | 1 | swap A[0]↔A[1] | 25 | 5 | 20 | 13 | 7 | 17 | 2 | 8 | 4 |
| ↳ recursive | 1 | 3, 4 | 3 | swap A[1]↔A[3] | 25 | 13 | 20 | 5 | 7 | 17 | 2 | 8 | 4 |
| ↳ recursive | 3 | 7, 8 | 7 | swap A[3]↔A[7] | 25 | 13 | 20 | 8 | 7 | 17 | 2 | 5 | 4 |
| ↳ recursive | 7 | 15(X), 16(X) | 7 | exit (no swap) | | | | | | | | | |

**Result: `[25, 13, 20, 8, 7, 17, 2, 5, 4]`**. At i=0, key 5 sinks three levels (index 0 → 1 → 3 → 7).

```text
start                               i=3: no swap                        i=2: swap 2<->6
[5, 13, 2, 25, 7, 17, 20, 8, 4]     [5, 13, 2, 25, 7, 17, 20, 8, 4]     [5, 13, 20, 25, 7, 17, 2, 8, 4]

              5                                   5                                   5
          /       \                           /       \                           /       \
     13               2                  13               2                  13              20
    /   \           /   \               /   \           /   \               /   \           /   \
 25       7      17      20          25       7      17      20          25       7      17       2
 / \                                 / \                                 / \
8   4                               8   4                               8   4

i=1: swap 1<->3                     i=0: swap 0<->1                     i=0: swap 1<->3
[5, 25, 20, 13, 7, 17, 2, 8, 4]     [25, 5, 20, 13, 7, 17, 2, 8, 4]     [25, 13, 20, 5, 7, 17, 2, 8, 4]

              5                                  25                                  25
          /       \                           /       \                           /       \
     25              20                   5              20                  13              20
    /   \           /   \               /   \           /   \               /   \           /   \
 13       7      17       2          13       7      17       2           5       7      17       2
 / \                                 / \                                 / \
8   4                               8   4                               8   4

i=0: swap 3<->7  (final max-heap)
[25, 13, 20, 8, 7, 17, 2, 5, 4]

             25
          /       \
     13              20
    /   \           /   \
  8       7      17       2
 / \
5   4
```

#### P2 — answer
Build phase (loop i = 2, 1, 0):

| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| start | | | | | 15 | 5 | 20 | 1 | 17 | 10 | 30 |
| loop i=2 | 2 | 5, 6 | 6 | swap A[2]↔A[6] | 15 | 5 | 30 | 1 | 17 | 10 | 20 |
| ↳ recursive | 6 | 13(X), 14(X) | 6 | exit (no swap) | | | | | | | |
| loop i=1 | 1 | 3, 4 | 4 | swap A[1]↔A[4] | 15 | 17 | 30 | 1 | 5 | 10 | 20 |
| ↳ recursive | 4 | 9(X), 10(X) | 4 | exit (no swap) | | | | | | | |
| loop i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 30 | 17 | 15 | 1 | 5 | 10 | 20 |
| ↳ recursive | 2 | 5, 6 | 6 | swap A[2]↔A[6] | 30 | 17 | 20 | 1 | 5 | 10 | 15 |
| ↳ recursive | 6 | 13(X), 14(X) | 6 | exit (no swap) | | | | | | | |

Heap after BUILD-MAX-HEAP: **`[30, 17, 20, 1, 5, 10, 15]`**.

Sort phase:

| step | i | l, r | largest | action | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| heap | | | | | 30 | 17 | 20 | 1 | 5 | 10 | 15 |
| **It-1** | | | | exchange A[0]↔A[6]; heap-size=6 | 15 | 17 | 20 | 1 | 5 | 10 | **30** |
| call i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 20 | 17 | 15 | 1 | 5 | 10 | **30** |
| ↳ recursive | 2 | 5, 6(X) | 2 | exit (no swap) | | | | | | | |
| **It-2** | | | | exchange A[0]↔A[5]; heap-size=5 | 10 | 17 | 15 | 1 | 5 | **20** | **30** |
| call i=0 | 0 | 1, 2 | 1 | swap A[0]↔A[1] | 17 | 10 | 15 | 1 | 5 | **20** | **30** |
| ↳ recursive | 1 | 3, 4 | 1 | exit (no swap) | | | | | | | |
| **It-3** | | | | exchange A[0]↔A[4]; heap-size=4 | 5 | 10 | 15 | 1 | **17** | **20** | **30** |
| call i=0 | 0 | 1, 2 | 2 | swap A[0]↔A[2] | 15 | 10 | 5 | 1 | **17** | **20** | **30** |
| ↳ recursive | 2 | 5(X), 6(X) | 2 | exit (no swap) | | | | | | | |
| **It-4** | | | | exchange A[0]↔A[3]; heap-size=3 | 1 | 10 | 5 | **15** | **17** | **20** | **30** |
| call i=0 | 0 | 1, 2 | 1 | swap A[0]↔A[1] | 10 | 1 | 5 | **15** | **17** | **20** | **30** |
| ↳ recursive | 1 | 3(X), 4(X) | 1 | exit (no swap) | | | | | | | |
| **It-5** | | | | exchange A[0]↔A[2]; heap-size=2 | 5 | 1 | **10** | **15** | **17** | **20** | **30** |
| call i=0 | 0 | 1, 2(X) | 0 | exit (no swap) | | | | | | | |
| **It-6** | | | | exchange A[0]↔A[1]; heap-size=1 | 1 | **5** | **10** | **15** | **17** | **20** | **30** |
| call i=0 | 0 | 1(X), 2(X) | 0 | exit (no swap) | | | | | | | |

**Final: `[1, 5, 10, 15, 17, 20, 30]`**.

The array at the end of each iteration:

| after | array (heap \| sorted) |
|---|---|
| It-1 | 20, 17, 15, 1, 5, 10 \| 30 |
| It-2 | 17, 10, 15, 1, 5 \| 20, 30 |
| It-3 | 15, 10, 5, 1 \| 17, 20, 30 |
| It-4 | 10, 1, 5 \| 15, 17, 20, 30 |
| It-5 | 5, 1 \| 10, 15, 17, 20, 30 |
| It-6 | 1 \| 5, 10, 15, 17, 20, 30 |

```text
BUILD:
start                          i=2: swap 2<->6                i=1: swap 1<->4
[15, 5, 20, 1, 17, 10, 30]     [15, 5, 30, 1, 17, 10, 20]     [15, 17, 30, 1, 5, 10, 20]

     15                             15                             15
    /   \                          /   \                          /   \
  5      20                      5      30                     17      30
 / \     / \                    / \     / \                    / \     / \
1  17  10  30                  1  17  10  20                  1   5  10  20

i=0: swap 0<->2                i=0: swap 2<->6  (heap built)
[30, 17, 15, 1, 5, 10, 20]     [30, 17, 20, 1, 5, 10, 15]

     30                             30
    /   \                          /   \
 17      15                     17      20
 / \     / \                    / \     / \
1   5  10  20                  1   5  10  15

SORT:
It-1: exch 0<->6                It-1: swap 0<->2                It-2: exch 0<->5
[15, 17, 20, 1, 5, 10 | 30]     [20, 17, 15, 1, 5, 10 | 30]     [10, 17, 15, 1, 5 | 20, 30]

     15                              20                              10
    /   \                           /   \                           /   \
 17      20                      17      15                      17      15
 / \     /                       / \     /                       / \
1   5  10                       1   5  10                       1   5

It-2: swap 0<->1                It-3: exch 0<->4                It-3: swap 0<->2
[17, 10, 15, 1, 5 | 20, 30]     [5, 10, 15, 1 | 17, 20, 30]     [15, 10, 5, 1 | 17, 20, 30]

     17                               5                              15
    /   \                           /   \                           /   \
 10      15                      10      15                      10       5
 / \                             /                               /
1   5                           1                               1

It-4: exch 0<->3                It-4: swap 0<->1                It-5: exch 0<->2 (5 >= 1: no swap)
[1, 10, 5 | 15, 17, 20, 30]     [10, 1, 5 | 15, 17, 20, 30]     [5, 1 | 10, 15, 17, 20, 30]

   1                             10                               5
  / \                            / \                             /
10   5                          1   5                           1

It-6: exch 0<->1 -> heap of size 1 -> final [1, 5, 10, 15, 17, 20, 30]
```

#### P3 — answer
(a) Counting phase (m = 6, n = 12):

| i | S[i] | b[0] | b[1] | b[2] | b[3] | b[4] | b[5] |
|---|---|---|---|---|---|---|---|
| init | — | 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 3 | 0 | 0 | 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 0 | 0 | 1 | 0 | 0 |
| 2 | 5 | 1 | 0 | 0 | 1 | 0 | 1 |
| 3 | 3 | 1 | 0 | 0 | 2 | 0 | 1 |
| 4 | 1 | 1 | 1 | 0 | 2 | 0 | 1 |
| 5 | 4 | 1 | 1 | 0 | 2 | 1 | 1 |
| 6 | 0 | 2 | 1 | 0 | 2 | 1 | 1 |
| 7 | 3 | 2 | 1 | 0 | 3 | 1 | 1 |
| 8 | 5 | 2 | 1 | 0 | 3 | 1 | 2 |
| 9 | 2 | 2 | 1 | 1 | 3 | 1 | 2 |
| 10 | 1 | 2 | 2 | 1 | 3 | 1 | 2 |
| 11 | 3 | 2 | 2 | 1 | 4 | 1 | 2 |

- **b = [2, 2, 1, 4, 1, 2]**.
- Write-back:
  - j=0 writes 0 into S[0..1];
  - j=1 writes 1 into S[2..3];
  - j=2 writes 2 into S[4];
  - j=3 writes 3 into S[5..8];
  - j=4 writes 4 into S[9];
  - j=5 writes 5 into S[10..11].
- Result: **S = [0, 0, 1, 1, 2, 3, 3, 3, 3, 4, 5, 5]**.
- `S[i] ← j` runs **12 = n** times. The total time is O(m) + O(n) + O(n) = O(n + m) [D10-S13].

(b) Queue buckets, enqueued in input order:

| bucket | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| queue | (0,d) | (1,b), (1,e) | (2,f) | (3,a), (3,c), (3,g) |

- Output: **(0,d) (1,b) (1,e) (2,f) (3,a) (3,c) (3,g)**.
- **Yes, equal keys keep their order**: b is still before e, and a before c before g. This is the "stable" behaviour that radix sort relies on [D10-S23].

#### P4 — answer
- The maximum is 815, which has 3 digits, so **p = 3 passes**. Numbers with fewer digits get leading zeros: 38 = 038, 91 = 091, 18 = 018.
- The buckets are listed in the order elements were placed; empty buckets are omitted.

| pass | digit | non-empty buckets | list after pass |
|---|---|---|---|
| 1 | ones | 0: 560 · 1: 91 · 2: 472 · 4: 724 · 5: 815, 605 · 6: 206 · 7: 347 · 8: 38, 18 | 560, 91, 472, 724, 815, 605, 206, 347, 38, 18 |
| 2 | tens | 0: 605, 206 · 1: 815, 18 · 2: 724 · 3: 38 · 4: 347 · 6: 560 · 7: 472 · 9: 91 | 605, 206, 815, 18, 724, 38, 347, 560, 472, 91 |
| 3 | hundreds | 0: 18, 38, 91 · 2: 206 · 3: 347 · 4: 472 · 5: 560 · 6: 605 · 7: 724 · 8: 815 | **18, 38, 91, 206, 347, 472, 560, 605, 724, 815** |

- Stability check, pass 3: 18, 38 and 91 all have hundreds digit 0. They come out in the order pass 2 left them (18 before 38 before 91), which is exactly why the result is correct [D10-S23].

---

## 6. Likely exam questions (only from these materials)

> Unless stated otherwise, arrays are **0-based**, as in the slide tables and A2. Answers are in the next subsection.

1. **Index formulas.**
   - In a 0-based heap array, give the left child, right child and parent of index 4.
   - Do the same for index 5 in a 1-based array.
2. **Leaves.** For n = 10, list the leaf indexes for 1-based indexing and for 0-based indexing. At which index does BUILD-MAX-HEAP's loop start in each case?
3. **Tree facts.**
   - (a) What is the maximum number of nodes in a complete binary tree of height 3?
   - (b) True or false: every perfect binary tree is both full and complete.
   - (c) Is the D09-S4 "complete" example tree (nodes 0–5) full?
4. **Heap or not?** Which of these arrays are max-heaps?
   - (i) `[9, 5, 7, 1, 4, 3, 6]`
   - (ii) `[6, 2, 7, 1, 3, 5, 4]`
   - (iii) `[9, 8, 7, 6, 5, 4, 3]`
   - (iv) `[50, 24, 30, 20, 21, 18, 3, 12, 5, 6]`
5. **MCQ.** For a 0-based array of length n, the BUILD-MAX-HEAP loop is:
   - (a) i = floor(n/2) downto 1
   - (b) i = floor(n/2)−1 downto 0
   - (c) i = 0 to floor(n/2)−1
   - (d) i = n−1 downto 0
6. **(A2 Q1)** Convert the sequence **11, 19, 7, 12, 15, 30** to a heap using Build Max Heap. Show every iteration in the table format.
7. Apply **one** MAX-HEAPIFY(A,0) to `[5, 20, 9, 14, 8, 2, 1]`. Give the array after each swap. Is the result a max-heap?
8. Starting from the max-heap `[7, 3, 6, 1, 2, 5, 4]`, perform HEAP-EXTRACT-MAX **twice**. Which values are returned, and what is the heap after each call?
9. HEAP-SORT `[4, 2, 6, 1, 3, 5, 7]`. Its BUILD-MAX-HEAP gives `[7, 3, 6, 1, 2, 5, 4]`. Give the whole array after **It-1** and after **It-2**.
10. **MCQ.** As stated in class, the running time of Build_Heap is: (a) O(log n) (b) O(n) (c) O(n log n) (d) O(n²).
11. **Heap-sort reasoning.**
    - (a) Using the slide's argument, explain why heap sort is O(n log n).
    - (b) True or false: the class HEAP-SORT builds a **min**-heap in order to sort in ascending order.
12. **Complexity tables.**
    - (a) MCQ: which statement matches the class comparison tables? (i) Heapsort worst case is O(n²). (ii) Heapsort auxiliary space is O(1). (iii) Mergesort auxiliary space is O(1). (iv) Radix sort worst case is O(n²).
    - (b) In the D09-S3 table, what is the cost of "Find Minimum" for Heap(Min)?
13. Apply BucketSort ([D10-S11]) to `S = [2, 0, 3, 2, 1, 0, 2]` with m = 4. Give b after the counting loop and the final S. State the time complexity.
14. You must sort 1000 integers whose maximum value is 999999.
    - Why is plain bucket sort a poor choice?
    - What does the deck use instead, and how many buckets and passes does it need?
15. Radix-sort `[43, 7, 91, 25, 70, 38, 15, 62]`. Give the buckets and the list after each pass.
16. In the slide's radix example ([D10-S19–S20]), the first-pass list ends "…88, 9, 99". Is this consistent with [D10-S18] step 3b? Does it change the final answer?
17. Using the bucket rule shown in the floating-point figure ([D10-S14]), which bucket does each of 0.47, 0.05, 0.91, 0.40 and 0.68 go to? What is the output?
18. Using the class conventions ([D10-S29]), radix-sort the words **bed, ad, bad, be**.
    - Show each pass.
    - What would the result be if the space bucket were kept at the **beginning** instead?
19. Why must every bucket-sort stage of radix sort be **stable**? Use the 52/58 example.
20. **MCQ.**
    - (a) Which of these is **not** comparison-based? Heap sort / Merge sort / Radix sort / Quick sort.
    - (b) Bucket sort and radix sort are O(n) because: they use heaps / of restrictions on the input / they are recursive / they compare keys cleverly.

### Answers

1. **0-based, i = 4:** L = 2·4+1 = **9**, R = 2·4+2 = **10**, P = ceil(4/2)−1 = **1**.
   **1-based, i = 5:** L = 2·5 = **10**, R = 2·5+1 = **11**, P = floor(5/2) = **2**. [D09-S9]
2. **1-based:** the leaves are **6…10**, and the loop starts at floor(10/2) = **5**.
   **0-based:** the leaves are **5…9**, and the loop starts at floor(10/2)−1 = **4**. [D09-S9, S10]
   (The slide writes the 0-based range as "[floor(n/2) to n]". The correct upper end is n−1 ⚠️.)
3. (a) 2^(3+1) − 1 = **15**. (b) **True**: a perfect tree is "both full and complete". (c) **No**: node 2 has only one child (5). [D09-S4, S9]
4. (i) **Yes**: this is Heap 1 [D09-S8].
   (ii) **No**: 7 at index 2 is larger than its parent 6. This is the D09-S11 result.
   (iii) **Yes**: a descending array is a max-heap [D09-S10].
   (iv) **Yes**: this is Heap 2 [D09-S8].
5. **(b)** [D09-S10 footnote]. The A2 solution writes it as "Non leaf nodes (n/2)−1 to 0".
6. Steps:
   - i=2: swap A[2]↔A[5], giving `[11,19,30,12,15,7]`.
   - i=1: no swap (19 ≥ 12 and 19 ≥ 15).
   - i=0: swap A[0]↔A[2], giving `[30,19,11,12,15,7]`. The recursive call at index 2 exits (11 ≥ 7).
   - **Heap: `[30, 19, 11, 12, 15, 7]`** (§5 T9) [A2].
7. Steps:
   - swap 0↔1, giving `[20,5,9,14,8,2,1]`;
   - swap 1↔3, giving `[20,14,9,5,8,2,1]`;
   - exit at index 3 (l = 7 and r = 8 are (X)).
   - **Yes**, the result is a max-heap (verified), because the rest of the tree was already in heap order (9 ≥ 2, 1). Compare [D09-S11], where a single call left 7 above 6. [D09-S10, S11]
8. **First call** returns **7**, leaving `[6, 3, 5, 1, 2, 4]` ([D09-S15]).
   **Second call** returns **6**:
   - A[0] ← A[5] = 4, giving `[4,3,5,1,2]`;
   - heapify(0) picks largest = 2 (5 > 3) and swaps 0↔2, giving **`[5, 3, 4, 1, 2]`**;
   - index 2 has no children (X), so it exits.
   [D09-S15, S17]
9. **It-1:** exchange 0↔6, giving `[4,3,6,1,2,5 | 7]`. Heapify (swap 0↔2, then 2↔5) gives **`[6, 3, 5, 1, 2, 4, 7]`**.
   **It-2:** exchange 0↔5, giving `[4,3,5,1,2 | 6,7]`. Heapify (swap 0↔2) gives **`[5, 3, 4, 1, 2, 6, 7]`**.
   The heap part is the same as in Q8: extract and heap-sort do the same heap work, but heap-sort parks each maximum at the end of the array. [D09-S21, S22]
10. **(b) O(n)** [D09-S17].
11. (a) Build_Heap costs O(n). Max-Heapify costs O(log n) and is applied n−1 times. The total is therefore **O(n log n)** [D09-S21].
    (b) **False.** HEAP-SORT calls BUILD-MAX-HEAP and still outputs ascending order, e.g. `[3,7,8,12,21,23]` [D09-S21, S22]. The S19 note only restates that an ascending array is a min-heap ⚠️.
12. (a) **(ii)** Heapsort auxiliary space is O(1) [D10-S3, S4]. (b) **O(1)** [D09-S3].
13. **b = [2, 1, 3, 1]**. S = **`[0, 0, 1, 2, 2, 2, 3]`**. The time is **O(n + m)**, which is O(n) when m is small compared with n [D10-S11, S13].
14. It would need **1 million buckets**. Since m >>> n, the cost is O(m), not O(n) [D10-S16].
    The deck uses **radix sort** instead [D10-S17, S24, S25]:
    - **10 buckets**, reused at every pass;
    - **6 passes**, the number of digits in 999999;
    - time **O(pn)**, which is O(n) for fixed p.
15. **Pass 1 (ones digit):**
    - buckets 0: 70 · 1: 91 · 2: 62 · 3: 43 · 5: 25, 15 · 7: 7 · 8: 38
    - list: **70, 91, 62, 43, 25, 15, 7, 38**

    **Pass 2 (tens digit; 7 counts as 07):**
    - buckets 0: 7 · 1: 15 · 2: 25 · 3: 38 · 4: 43 · 6: 62 · 7: 70 · 9: 91
    - list: **7, 15, 25, 38, 43, 62, 70, 91** [D10-S18, S21]
16. **Not consistent.** 99 comes before 9 in the input, and both have ones digit 9. Collecting in placement order gives "…88, **99, 9**".
    The final result is **unchanged**: in pass 2, 9 goes to bucket 0 and 99 to bucket 9 [D10-S18, S20, S21] ⚠️.
17. The buckets are 0.47 → **4**, 0.05 → **0**, 0.91 → **9**, 0.40 → **4**, 0.68 → **6**. Bucket 4's list is 0.40 → 0.47.
    Output: **0.05, 0.40, 0.47, 0.68, 0.91** [D10-S14].
18. L = 3; padded words: `bed`, `ad␣`, `bad`, `be␣`.
    - Pass 1 (3rd char): d: bed, bad · ␣: ad␣, be␣ → bed, bad, ad␣, be␣
    - Pass 2 (2nd char): a: bad · d: ad␣ · e: bed, be␣ → bad, ad␣, bed, be␣
    - Pass 3 (1st char): a: ad␣ · b: bad, bed, be␣ → **ad, bad, bed, be**

    With the **space bucket first**, the result is **ad, bad, be, bed** (verified). The convention matters when one word is a prefix of another; follow the class convention in the exam. [D10-S25, S29]
19. Each pass must keep the order produced by the earlier, less significant passes [D10-S23]:
    - After pass 1 (ones digit), 52 is before 58.
    - In pass 2 both go to bucket 5. A stable stage keeps 52 before 58.
    - An unstable stage could output 58, 52, and the sort would be wrong.
20. (a) **Radix sort** [D10-S6; D06-S3]. (b) **Restrictions on the input** [D10-S26]; comparison sorts need at least n log n [D10-S5].

---

## 7. Self-check

- [ ] **Trees.** I can define full, complete and perfect binary trees and classify any drawn tree, as in the A–D quiz [D09-S4–S6].
- [ ] **Heaps.** I can state the two heap properties (heap structure and partial order) and decide quickly whether an array is a max-heap [D09-S7, S8, S10].
- [ ] **Indexes.** I can write the left/right/parent formulas for 1-based and 0-based arrays, the leaf range, and where the BUILD loop starts, without mixing the two conventions [D09-S9, S10].
- [ ] **Pseudocode.** I can write MAX-HEAPIFY, BUILD-MAX-HEAP, HEAP-EXTRACT-MAX and HEAP-SORT from memory and convert them to 0-based form [D09-S10, S15, S21].
- [ ] **Build trace.** I can trace BUILD-MAX-HEAP in the A2 table format, including the recursive calls and "(X)" children, in a few minutes [D09-S13; A2].
- [ ] **Extract and sort.** I can trace HEAP-EXTRACT-MAX and every HEAP-SORT iteration, marking the shrinking heap and the growing sorted part [D09-S15, S22].
- [ ] **Complexities.** I can quote them exactly as taught and justify heap sort's O(n log n) with the "n−1 heapify calls" argument [D09-S17, S21; D10-S3, S4]:
  - Max-Heapify O(log n) and Extract O(log n);
  - Build O(n);
  - Heapsort O(n log n) with O(1) extra space;
  - Bucket O(n+m), or O(m) when m >>> n;
  - Radix O(pn).
- [ ] **Bucket sort.** I can run the D10-S11 BucketSort (counts, then write-back), explain values-versus-entries (counter versus queue), and say when bucket sort degrades to O(m) [D10-S11–S13, S16].
- [ ] **Radix sort.** I can radix-sort integers pass by pass, collecting in placement order, and explain why stability matters. I can also radix-sort words with the class conventions (right→left, blanks at the end, blank bucket last) [D10-S18–S25, S29].
- [ ] **Slide slips.** I can recognise the slips that could trip me up in the exam:
  - "0(…)" typos and the Heap(Min) Delete O(1) vs Extract O(log n) clash [D09-S3, S17];
  - the 0-based leaf range "to n" that should be "to n−1" [D09-S9];
  - "Exit-heapify(A,4)" that should be (A,6) [D09-S13];
  - the extra "for i→1" row [D09-S22];
  - "i ← i + 10" [D10-S13];
  - 0.94 outside the stated "0.0–0.9" range [D10-S14];
  - "…88, 9, 99" that should be "…88, 99, 9" [D10-S20];
  - "i=3 exit" that should be "i=4 exit" in the A2 sample solution.


---

<!-- FILE: Week 5-7 - Amortized analysis + Red-black trees (insert, delete) - class notes.md -->

# Weeks 5–7 — Amortized analysis; red-black trees: insertion & deletion (CLASS NOTES — from slides only)
> Sources: 11 - Amortized Analysis.pptx [D11-S#] (11 slides), 12 - RED BLACK TREES.pptx [D12-S#] (27 slides), 13 - RB Tree Deletion.pptx [D13-S#] (20 slides).

> **Course:** SOC3030-003 Computer Algorithms · Prof. Seth Ashish · Inha University in Tashkent · Fall 2026. **Midterm:** 25%, week 8 (24–30 Oct 2026), covers weeks 1–7. Syllabus items for this block: "Problem scenarios of amortized analysis" and "Practice on RB tree operations".
> **Track A only.** Everything below comes from the three decks: the slide text, the slide images (including the screenshot tables and the hand-drawn trees) and the .pptx files, which supplied the hidden-slide flags. The speaker notes in these decks hold only slide numbers. Where the slides stop, a 🔎 line points to Track B.

**Legend:**
- ⭐ = professor emphasis (bold, coloured, underlined or boxed text; rule sheets repeated on several slides; worked examples)
- ⚠️ = typo, error or inconsistency on the slide
- 🔎 = look this up in Track B
- 🙈 = slide is marked **hidden** in the .pptx (only D13-S15 and D13-S18). It may have been skipped in class, but it is in your file.
- ✅ = checked with a small Python script that applies the slides' own rules (insert cases, delete cases, the four RB properties)

**How trees are drawn in these notes**
- `58B` = key 58, black. `49R` = key 49, red.
- `DB` = a double-black NIL (deletion only). `8DB` = the real node 8 carrying a double black.
- NIL leaves are not drawn unless the slide draws them. Every missing child is a black NIL [D12-S6 rule 2].
- `/` and `\` lead to the left and right child. Underscores only stretch the line from a parent to its children.
- `rotL(x)` = left (anticlockwise) rotation at x. `rotR(x)` = right (clockwise) rotation at x [D12-S8, S19–S22].
- Side-by-side pictures read left to right, (a) → (b) → (c) …

---

## 1. Big picture

- **Amortized analysis** looks at a *sequence* of operations and shows that the *average cost per operation* is small, even if a single operation is expensive. It averages over a worst-case sequence and uses no probability [D11-S2, S3].
- **Three techniques** are named [D11-S4]:
  - **aggregate analysis**: total cost T(n), then T(n)/n;
  - **accounting method**: give each operation its own amortized cost;
  - **potential method**: like accounting, but overcharge early operations to pay for later ones.
  - Any amortized costs must "preserve the sum": **Σ amortized cost ≥ Σ actual cost**.
- **Three class scenarios:**
  - k-th smallest with sort-once: about log n per query [D11-S6, S7];
  - doubling the space for puppies: expensive only when full, so spread that cost out [D11-S8–S10];
  - stack PUSH/POP/MULTIPOP: amortized costs 2, 0, 0, so the total is ≤ 2n, which is O(1) per operation [D11-S11].
- A **red-black (RB) tree** is a self-balancing BST whose nodes also carry a colour. It has four properties [D12-S2, S6]:
  1. the root is black;
  2. NIL is black;
  3. both children of a red node are black;
  4. every downward path from a node has the same number of black nodes, its black height bh.
  - Effect: the longest root-to-leaf path is at most twice the shortest one [D12-S2].
- **Rotations** (left = anticlockwise, right = clockwise) rebuild a small part of the tree but keep the BST order A x B y C [D12-S8].
- **Insertion:** BST-insert the new node as **RED**, then repair. The repair depends on where the node sits relative to its grandparent and on the uncle's colour [D12-S10, S11, S14, S16–S22]:
  - uncle red → **Case 1**: recolour and move up two levels;
  - uncle black, Left-Right shape → **Case 2**: rotate at the parent, which then gives Case 3;
  - uncle black, Left-Left shape → **Case 3**: rotate at the grandparent and swap the colours of grandparent and parent;
  - the Right-Left and Right-Right shapes are the mirror images.
- **Insertion costs O(lg n).** Only Case 1 repeats (two levels up each time), and there are at most 2 rotations overall [D12-S15].
- **Deletion** starts with a BST delete: a leaf goes, a one-child node is replaced by its child, and a two-child node takes the value of its in-order predecessor (class algorithm) or successor [D13-S3–S6]. Then [D13-S8]:
  - a red node is just deleted;
  - a black node with a red child is replaced by that child, coloured black;
  - otherwise the hole becomes a **Double Black (DB)**, removed by Cases 3(1)–3(5), which look at the sibling's colour and its near/far children.
- **In-class deletion exercises:** three trees with key sequences [D13-S9–S18]. Their full, verified solutions are in §5.5.
- ⚠️ **Two problems on the slides:**
  - the "Or" shortcut inside deletion Case 2 is only safe in one situation;
  - the D13-S13 starting tree is not a valid RB tree. Details in §2.

---

## 2. Slide-by-slide notes

### Deck 11 — Amortized Analysis (11 slides)

### [D11-S1] Title — "Amortized Analysis"
- Title slide only ("Amortized Analysis" in an orange box).

### [D11-S2] What amortized analysis is ⭐
- ⭐ **Definition:** an amortized analysis is a strategy for analysing a <u>sequence of operations</u> (underlined on the slide) to show that the **average cost per operation is small** (bold), even though a single operation within the sequence might be expensive.
- It means finding the average running time per operation **over a worst-case sequence** of operations.
- ⭐ It is a technique for analysing algorithms ***under some conditions*** (bold italic). The slide does not say which conditions.
- ⚠️ Grammar: "an strategy" should be "a strategy"; "It is technique" should be "It is a technique".
- 🔎 Look up in Track B: which "conditions" make amortized analysis applicable.

### [D11-S3] Amortized analysis vs average case
- Amortized analysis differs from average-case performance because **no probability is involved**. Average-case analysis averages over all possible inputs.
- Amortized analysis **guarantees** the time per operation over worst-case performance.
- It assumes a worst-case input and typically does not allow random choices.
- Quick contrast:

  | | Average-case analysis | Amortized analysis |
  |---|---|---|
  | Averages over | all possible inputs | the operations of one worst-case sequence |
  | Probability | involved | not involved |
  | What you get | an average over inputs | a guaranteed time per operation |

### [D11-S4] Techniques used in amortized analysis ⭐
- ⭐ The three technique names are bold, italic and underlined:
  1. ***Aggregate Analysis***: find an upper bound **T(n)** on the total cost of a sequence of n operations, then the average cost is **T(n)/n**.
  2. ***Accounting Method***: give each operation its own cost. That cost combines the operation's own execution time with its influence on the running time of future operations.
  3. ***Potential Method***: "like an accounting method, but overcharges operations early to compensate for undercharges later".
- ⭐ Blue box, bold: **Amortized bounds** — assign an amortized cost to each operation so that it "preserves the sum":

  > **Σ amortized cost ≥ Σ actual cost**

- Why the box matters: if the inequality holds, the sum of the amortized costs is a safe upper bound on the true total cost.
- Which class example uses which idea (the slides do not label them; this is my reading):
  - k-th smallest [S7] and the puppies [S9] divide a total by the number of operations, which is the aggregate idea;
  - the stack slide [S11] gives each operation type its own amortized cost (2, 0, 0), which fits the accounting description.
- The potential method has **no worked example** on the slides.
- ⚠️ "its intermediate execution time" is probably meant to be "immediate" (its own) execution time. Grammar: "for each operations such that it 'preserve the sum'".
- 🔎 Look up in Track B: a worked example of the potential method.

### [D11-S5] The idea, and where it applies
- The worst-case operation can change the state so that the worst case cannot happen again for a long time. That is what "amortizing" its cost means.
- It applies to some special problems, such as **hash tables, disjoint sets and splay trees**.
- It matters where the first set of inputs affects the next set of inputs.
- The class scenarios all show this idea:
  - after the one sort, every later k-th-smallest query is cheap [S6, S7];
  - after a doubling, many cheap adds follow [S10];
  - a MULTIPOP that empties the stack cannot pop again until new items are pushed [S11].
- 🔎 Look up in Track B: how amortized analysis is used for hash tables, disjoint sets and splay trees (only named here).

### [D11-S6] Case 1: Find the k-th smallest element ⭐
- ⭐ Title in red bold italic: "Case 1: Find kth smallest element".
- Code exactly as on the slide:
  ```
  int find_Kth _smallest ( int A[], int n, int k)
  {
  If (! Sorted)
  Sort(A,n)
  return A[k]
  }
  Running Time is O(n log n)
  ```
- One call costs O(n log n) because of the sort. Once the array is sorted, a call only returns A[k].
- ⚠️ Code issues:
  - stray space in `find_Kth _smallest`, and `If` should be `if`;
  - `Sorted` is never declared and never set to true after `Sort(A,n)`. As written, every call would sort again. The idea on S7 needs the flag set after the first sort;
  - `return A[k]`: C arrays start at index 0, so with k counted from 1 ("1st, 10th, 50th" on S7) the k-th smallest is `A[k-1]`.

### [D11-S7] n different k-th smallest queries — amortized ⭐
- ⭐ Red bold italic: "To find n different kth smallest element", for example K = 1st, 10th, 50th, …
- **Worst case per query × number of queries:** n·(n log n).
- **Amortized cost per operation** = total cost of all the operations ÷ number of operations.
- **Amortized analysis on the slide:**
  - (n log n) + O(1) + O(1) + … because only the first query sorts;
  - total n log n + 1 + 1 + … with (n−1) ones;
  - per query (n log n + n)/n = O(log n + 1) = log n.
- ✅ Re-worked:
  - total = n log n + (n − 1) ≤ n log n + n;
  - divide by n: at most log n + 1 per query, i.e. **O(log n)**;
  - for n = 8 (log₂ 8 = 3): the naive bound is 8·24 = 192, but the real total is 24 + 7 = 31, which is 3.875 per query ≤ 4. Table in §5.1.
- ⚠️ Notation slips:
  - "nlogn +1+1+…(n−1) = (nlogn+n)/n" puts the total and the average on the two sides of one "=", and rounds n−1 up to n;
  - "Total cost of k operations/k" uses k for the number of operations, but k is already the rank;
  - "O(logn+1) = logn" should be "= O(log n)".

### [D11-S8] Scenario — doubling the space (adding puppies) ⭐
- ⭐ Red bold italic title: "Scenario – doubling the space". Example: adding puppies.
- **If there is a space:** add the puppy in the free space, O(1).
- **If there is no space left:**
  - buy a space with 2× storage: **1 unit**;
  - move all puppies into the new facility: **N + 1 units** (N old puppies + the new one);
  - **Total cost = 1 + N + 1 = O(N)**.
- So one add can cost O(N), but only when the facility is full.

### [D11-S9] The bookkeeping table (screenshot) ⭐
- The slide is only an image: a spreadsheet screenshot from a video. A mouse cursor (red cross) and a logo are visible.
- ⭐ Red hand annotations:
  - the "move" costs 2, 4, 8, 16 are circled (the 4 and the 8 are hidden under the red circles; by the S8 rule they must be 4 and 8);
  - braces group the adds into segments of 2, 4, 8 and 16.
- **Rows:** Add Puppy; N puppies in facility (before the add); Spaces available in current facility; Time to buy new facility; Time to move puppies from old place to new; Time to move new puppy into empty space; Total Time; Total Time in Segment; Number of add puppy operations in segment; Average Time in segment.
- Slide values, transcribed:

  | Segment (N before the add) | 0 | 1 | 2–3 | 4–7 | 8–15 | 16–31 |
  |---|---|---|---|---|---|---|
  | Spaces at the start of each add | 1 | 1 | 2, 4 | 4, 8, 8, 8 | 8, then 16 ×7 | 16, then 32 ×15 |
  | Total time of each add | 1 | 3 | 4, 1 | 6, 1, 1, 1 | 10, then 1 ×7 | 18, then 1 ×15 |
  | Total time in segment (slide) | 1 | 3 | 5 | **10** | 17 | **34** |
  | Adds in segment | 1 | 1 | 2 | 4 | 8 | 16 |
  | Average (slide) | 1 | 3 | 2.5 | **2.5** | 2.125 | **2.125** |

- ✅ ⚠️ **Two segment totals on the slide are wrong:**
  - N = 4–7: 6 + 1 + 1 + 1 = **9**, not 10, so the average is **2.25**, not 2.5;
  - N = 16–31: 18 + 15 × 1 = **33**, not 34, so the average is **2.0625**, not 2.125.
- ⚠️ The last column (N = 32, with 32 spaces) is drawn as a cheap add with total time 1. But the facility is full there, so by the S8 rule it costs 1 + 32 + 1 = 34; it starts the next segment.
- The full corrected table is in §5.1.

### [D11-S10] Observation ⭐
- The same table again (smaller), plus an "Observation" box:
  - it is only expensive when the facility is full;
  - many cheap adds come after an expensive one;
  - spread out the expensive cost uniformly.
- ✅ What "spreading out" gives (corrected numbers):
  - the running average cost per add over the first 2, 4, 8, 16 and 32 adds is 2, 2.25, 2.25, 2.1875 and 2.125;
  - just after a doubling it jumps for a moment. The highest value is 53/17 ≈ 3.12, right after the 17th add;
  - in a check of the first 2 million adds it never went higher.
  - So the average cost per add stays a small constant, even though a single add can cost O(N).
- ⚠️ "•-it is only expensive when full" has a stray dash.
- 🔎 Look up in Track B: the formal amortized bound for the doubling scenario (the slides give only the table).

### [D11-S11] Stack with PUSH, POP, MULTIPOP ⭐
- ⭐ Bold heading: "Sequence of Operations PUSH, POP, MULTIPOP".
- **Actual cost** (underlined):

  | Operation | Actual cost |
  |---|---|
  | PUSH | O(1) → 1 |
  | POP | O(1) → 1 |
  | Multipop(S,k) | min(S,k) |

- **Amortized analysis** (underlined):

  | Operation | Amortized cost |
  |---|---|
  | PUSH | 2 |
  | POP | 0 |
  | Multipop(S,k) | 0 |

- Pseudocode (orange box), as on the slide:
  ```
  Multipop(S,k)
  While not stackEmpty(S) and k<>0
  Do POP S
  K=k-1
  ```
  MULTIPOP pops until the stack is empty or k items are gone, whichever comes first. That is why its cost is min(number of items in S, k).
- Green box:
  - total cost for a sequence of n operations = **2n**;
  - amortized cost per operation = total cost / total ops = 2n/n = **2** (constant);
  - "Therefore effective cost per operation [is] constant i.e. **O(1)**".
- Why the numbers work, read with the S4 rules:
  - each PUSH is charged 2: 1 for itself and 1 paid in advance for the later POP or MULTIPOP step that removes that item;
  - POP and MULTIPOP are charged 0 because the items they remove were paid for in advance;
  - n operations contain at most n PUSHes, so Σ amortized ≤ 2n;
  - "preserve the sum" then gives Σ actual ≤ Σ amortized ≤ 2n.
- Compare with S7's naive style: a single MULTIPOP can cost as much as the whole stack, so "worst single operation × n" would be a much larger bound. The amortized costs show the real total never exceeds 2n.
- ✅ A bookkeeping check is in §5.1: an 8-operation sequence has actual total 10 ≤ 2n = 16, and the running credit (Σ amortized − Σ actual) is never negative.
- ⚠️ Slide slips:
  - "0(1)" is written with a zero instead of O(1);
  - min(S,k) means min(number of items in S, k);
  - "K=k-1" mixes K and k;
  - "in constant" should be "is constant";
  - "= 2n" is really an upper bound (≤ 2n).
- 🔎 Look up in Track B: the formal accounting-method and potential-method proofs for MULTIPOP (the slide gives only the costs).

### Deck 12 — Red Black Trees (27 slides)

### [D12-S1] Title — "RED BLACK TREES / RB-Trees"
- Title slide only.

### [D12-S2] What a red-black tree is ⭐
- ⭐ A Red Black Tree is a type of **self balancing** (bold and underlined) binary search tree.
- It was invented in 1972 by Rudolf Bayer, who called it "symmetric binary B-Trees".
- Each node has an extra attribute, **'color'**, which is RED or BLACK.
- The colouring ensures that the **longest path from the root to a leaf is no longer than twice the length of a shortest path**, which means the tree is balanced.
- ⚠️ Grammar: "It is invented" should be "It was invented"; "no longer then twice" should be "than".
- 🔎 Look up in Track B: why the four properties of S6 give the "at most twice" bound and an O(log n) height.

### [D12-S3] AVL vs RB tree (1/2) ⭐
- ⭐ Underlined phrases on the slide are shown in *italics* below.

| Parameter | AVL tree | RB tree |
|---|---|---|
| Balance factor | AVL trees are *more strictly* balanced than RB trees. The balance factor (height difference between the left and right subtrees) of every node is at most 1, so the tree is height-balanced. | RB trees have *less strict* balance requirements. They stay approximately balanced by colouring nodes red or black and enforcing several properties. |
| Insertion and deletion | AVL trees *typically require more rotations*, which can make insertion and deletion slower. Rebalancing can take multiple rotations in some cases. | RB trees *require fewer rotations*, so they are more efficient for dynamic data where elements are often added or removed. They are considered more practical for databases and file systems. |

### [D12-S4] AVL vs RB tree (2/2) ⭐

| Parameter | AVL tree | RB tree |
|---|---|---|
| Performance considerations | Well suited to *scenarios where read operations significantly outnumber* writes; reads are generally faster because of the stricter balance. | *Preferred when the dataset is more dynamic*, with frequent insertions and deletions; often better for mixed reads and writes; commonly used in real-time systems. |
| Code complexity | More complex code for maintaining *balance*, so larger codebases and more room for bugs. | Usually *easier to implement, maintain, and debug* because balance maintenance is simpler. |

- One-line summary for exams: read-heavy → AVL; many inserts and deletes → RB.

### [D12-S5] AVL vs RB vs B-Tree
- The slide is a table image:

| | Red-Black Tree | AVL Trees | B-Tree |
|---|---|---|---|
| Tree type | self-balancing BST | self-balancing BST | multi-way tree (N-ary tree) |
| Child number | every node has at most 2 children | every node has at most 2 children | nodes can have multiple children |
| Self-balancing methods | like AVL, RB trees can rotate; but before rotating, they change node colours (red ↔ black) to self-balance the depth | balance factor is −1, 0 or 1; BF = height(left) − height(right), or right − left | defined by the minimum degree t, which depends on the disk block size; every node except the root has at least t−1 keys; the root may have just 1 key |
| Tree height | "log(N), where N represents the depth of the RB tree in terms of black nodes" | log(N), N = number of nodes | "log(M\*N)", M = order of the tree, N = number of nodes |

- Under the table: "The height (h) of a B-tree is given by: h ≤ ⌈log<sub>⌈m/2⌉</sub>((n+1)/2)⌉ − 1". The formula image is garbled; its brackets look like ceilings.
- ⚠️ The table is inconsistent:
  - N means "depth in black nodes" in the RB column but "number of nodes" in the AVL column;
  - the B-tree "log(M\*N)" does not match the formula printed under the table.
- 🔎 Look up in Track B: the correct height bounds for RB trees, AVL trees and B-trees.

### [D12-S6] Properties of RB Tree ⭐⭐
- ⭐ The four properties, with their names in bold italic on the slide:
  1. ***Root*** is always black.
  2. ***Nil*** is considered to be black, which means that every non-Nil node has two children.
  3. ***Black Children Rule***: children of each red node are black.
  4. ***Black Height Rule***: "For each node v, there exist an integer **bh**(v) such that each downward path from v to a nil has exactly bh(v) black real (ie non nill) nodes."
- How to read them:
  - **Rule 2:** NIL leaves count as (black) children. A node drawn with "one child" really has one real child plus one NIL.
  - **Rule 3:** no red node has a red child. The same thing said the other way round (S9): a red node's parent is black. So there are never two reds in a row.
  - **Rule 4:** bh(v) counts the black **real** nodes (NILs are not counted) on any path from v down to a nil. Following the slide's words "path from v", v itself is counted when it is black. Example values for the S7 tree are in §5.2.
- ⚠️ Grammar: "there exist" should be "there exists"; "nill" should be "nil".
- 🔎 Look up in Track B: the standard statement of the RB properties and the exact counting rule for bh (is v counted? is the nil counted?).

### [D12-S7] Ex- RB Tree
- The slide's picture: black squares are black nodes, red squares are red nodes, and every empty child is drawn as a small black square (a NIL). Redrawn with the NILs:
  ```
            __________________11B____
           /                         \
       ___2R_________              _14B____
      /              \            /        \
    _1B_         ___7B____       nil     _15R_
   /    \       /         \             /     \
  nil  nil    _5R_      _8R_           nil   nil
             /    \    /    \
            nil  nil  nil  nil
  ```
- ✅ It satisfies all four rules: root black; reds 2, 5, 8 and 15 have only black children (or NILs); every root-to-nil path has exactly **2** black real nodes, so **bh(11) = 2**.
- The same tree is the starting point of the insertion figure on S12.

### [D12-S8] Rotations ⭐
- The figure, redrawn (labels placed where they belong):
  ```
         |                                              |
        (x)            Left Rotate (T, x)              (y)
       /   \          ------------------->            /   \
      A    (y)                                      (x)    C
          /   \       <-------------------         /   \
         B     C      "Right Rotate (T, x)"       A     B
  ```
- ⭐ "The rotations do not break BST-property. The order (AxByC is preserved)". The in-order sequence of both pictures is **A, x, B, y, C**.
- **Left rotation at x** (x has a right child y):
  - y moves up into x's place;
  - x becomes y's left child;
  - y's old left subtree B becomes x's right subtree.
- **Right rotation** is the exact reverse.
- Names used later in the deck: left rotation = **anticlockwise**, right rotation = **clockwise** [S19–S22].
- ⚠️ Figure slips:
  - in the right-hand picture the labels A and B are both drawn under x's right edge (A belongs on x's left edge);
  - the label C floats near the arrows instead of under y's right edge.
- ⚠️ The reverse arrow is labelled "Right Rotate (T, x)". In the right-hand picture the node at the top of the rotation is **y**. The deck's own pseudocode passes the top node, e.g. RIGHT-ROTATE(T, p[p[z]]) rotates at the grandparent [S14 line 14]. So by that convention it should read Right Rotate (T, y).
- 🔎 Look up in Track B: the LEFT-ROTATE / RIGHT-ROTATE pseudocode (not on the slides) and its argument convention.

### [D12-S9] Insertion ⭐
- The slide is an image (from a video):
  - ⭐ **Insert (New Node Must be Red)**;
  - arrange colours according to the RBT properties:
    - root is always black;
    - every leaf which is NIL is black;
    - if a node is red then both its children must be black, or (said another way) if a node is red, then its parent must be black;
  - **Rotation**.
- So insertion uses only two tools: **recolouring** and **rotation**.

### [D12-S10] Violations, and what decides the fix ⭐
- ⭐ Image heading (bold, underlined): "Violation of properties of red black tree":
  - if the new node is the root node;
  - if the parent of the new node is red.
- "The type of discrepancy is determined by":
  - the location of the node with respect to its **grandparent**, and
  - the colour of the **sibling of the parent** (the uncle).
- Why only these two violations can happen:
  - the new node is red. If it is the root, rule 1 breaks; if its parent is red, rule 3 breaks;
  - a red node adds no black nodes to any path, so rule 4 is never broken by the insert itself.

### [D12-S11] Discrepancies ⭐
1. ⭐ ***where the parent sibling (uncle) is red***: fixed by **changing colour**.
2. ⭐ ***where the parent sibling (uncle) is black***: fixed by **rotations**.
- Note box: "at most one rotation is sufficient for fixing the problem".
- ⚠️ This note clashes with S15 ("at most 2 rotations overall") and with the S24 example, where the Left-Right case uses two rotations (rotL(3), then rotR(9)). Perhaps it means one rotation *step*, single or double.

### [D12-S12] RB-Insertion 1/2 — pseudocode ⭐
- "Start by doing regular binary-search-tree insertion."
  ```
  RB-INSERT(T, z)
  1.  y ← NIL; x ← root[T]
  2.  while x ≠ NIL
  3.      do y ← x
  4.         if key[z] < key[x]
  5.            then x ← left[x]
  6.            else x ← right[x]
  7.  p[z] ← y
  8.  if y = NIL
  9.     then root[T] ← z            /* Tree T was empty */
  10.    else if key[z] < key[y]
  11.            then left[y] ← z
  12.            else right[y] ← z
  13. left[z] ← nil[T]; right[z] ← nil[T]; color[z] ← RED
  14. RB-INSERT-FIXUP(T, z)
  ```
- Line by line:
  - lines 1–6 walk down from the root, with y one step behind x;
  - lines 7–12 hang z under y, or make z the root if the tree was empty;
  - line 13 gives z two NIL children and colours it **RED**;
  - line 14 repairs the colours.
- Figure: the S7 tree with the new node **z = 4** (red) as the left child of 5 (red):
  ```
      ________11B_
     /            \
    2R_____      14B_
   /       \         \
  1B      7B_       15R
         /   \
        5R  8R
       /
      4R   <- z
  ```
- ⚠️ Line 2 shows "while x – NIL" in the image: the "≠" symbol is lost. The loop walks down until x reaches NIL, so it must be **≠**.
- The fix-up for this figure is not on the slide. It is worked in §5.3 with the slide rules; result: 7 becomes the root.

### [D12-S13] RB-Insertion 2/2 ⭐
- Same code, plus a panel "RB-Insertion 2/2":
  - RB-INSERT ends by colouring the new node z **red**;
  - then it calls **RB-INSERT-FIXUP**, because a red-black property could have been violated;
  - which property might be violated?
    1. If z is the root, there is a violation (rule 1, the root must be black). Otherwise OK.
    2. If p[z] is red, there is a violation: both z and p[z] are red (rule 3).

### [D12-S14] RB-INSERT-FIXUP procedure ⭐⭐
- The slide's pseudocode (case labels in the right-hand column):
  ```
  RB-INSERT-FIXUP(T, z)
  1.  while color[p[z]] = RED
  2.     do if p[z] = left[p[p[z]]]
  3.           then y ← right[p[p[z]]]
  4.                if color[y] = RED
  5.                   then color[p[z]] ← BLACK            ▹ Case 1
  6.                        color[y] ← BLACK                ▹ Case 1
  7.                        color[p[p[z]]] ← RED            ▹ Case 1
  8.                        z ← p[p[z]]                     ▹ Case 1
  9.                   else if z = right[p[z]]
  10.                          then z ← p[z]                ▹ Case 2
  11.                               LEFT-ROTATE(T, z)       ▹ Case 2
  12.                        color[p[z]] ← BLACK            ▹ Case 3
  13.                        color[p[p[z]]] ← RED           ▹ Case 3
  14.                        RIGHT-ROTATE(T, p[p[z]])       ▹ Case 3
  15.          else (same as then clause
  16.                     with "right" and "left" exchanged)
  17. color[root[T]] ← BLACK
  ```
- Who is who: **z** = current node, **p[z]** = parent, **p[p[z]]** = grandparent, **y** = uncle.
- The cases:
  - **Case 1** (uncle red): parent and uncle → black, grandparent → red, z moves up two levels, loop again.
  - **Case 2** (uncle black, z is a *right* child while its parent is a *left* child): z moves up to its parent, then a left rotation at it. This turns the shape into Case 3; it does not end the loop by itself.
  - **Case 3** (uncle black, z is a *left* child): parent → black, grandparent → red, right rotation at the grandparent. Afterwards p[z] is black, so the loop ends.
  - Lines 15–16: the mirror cases when the parent is a **right** child.
  - Line 17: the root is always made black, which fixes the "z is the root" violation.
- The same numbering is used on S18–S22: Case 1 = change colour; Case 2 = anticlockwise rotation at the parent; Case 3 = clockwise rotation at the grandparent plus a colour exchange.

### [D12-S15] Time complexity of RB-INSERT ⭐
- Analysis, as on the slide:
  - each iteration takes O(1) time;
  - the **while** loop repeats only if Case 1 is executed, and then the pointer z moves **two levels up** the tree;
  - the **while** loop terminates if Case 2 or Case 3 is executed;
  - O(lg n) levels → O(lg n) time;
  - "Also note that there are **at most 2 rotations overall**."
- ⭐ "Thus, insertion into a red-black tree takes **O(lg n)** time."
- The BST walk of RB-INSERT (S12, lines 1–6) also follows one root-to-leaf path, so it is O(lg n) too. The slides take the O(lg n) height from the balance guarantee on S2.
- 🔎 Look up in Track B: the proof that an RB tree with n nodes has height O(lg n).

### [D12-S16] Understanding insertion — (a) uncle is RED ⭐
- "Let x be the newly inserted node."
  1. Perform <u>standard BST insertion</u> and make the colour of newly inserted nodes RED.
  2. If x is the root, change the colour of x to BLACK.
  3. Do the following if the colour of x's parent is not BLACK or x is not root:
     - ⭐ **a) If x's uncle is RED (case 1):**
       - (i) change the colour of parent and uncle to BLACK;
       - (ii) colour the grandparent RED;
       - (iii) change x = x's grandparent, and repeat steps 2 and 3 for the new x.
- Figure "Uncle Red" (x = current node, p = parent, u = uncle, g = grandparent; T1–T5 are subtrees):
  ```
            g(B)          1] Change Color of p and u as Black          g(R)  <- new x
          /      \        2] Change Color of g as Red                /      \
       p(R)      u(R)     3] Recur for g                          p(B)      u(B)
       /   \     /   \    ----------------------------->          /   \     /   \
    x(R)   T3   T4   T5                                        x(R)   T3   T4   T5
    /   \                                                      /   \
   T1   T2                                                    T1   T2
  ```
- Why recolouring is safe:
  - g must be black, because its child p is red (rule 3);
  - moving "one black" from g down onto p and u keeps the black count of every path through g the same (rule 4).
  - New risk: g is now red, and its own parent may be red. That is why x jumps to g and the check repeats.
- ⚠️ Step 3 says "not BLACK **or** x is not root". It must be **and**: the fix runs only while x is not the root *and* its parent is red [S13; S14 line 1]. With "or", step 3 would also run when the parent is black.
- ⚠️ Step (iii) is in the slide's text box but is hidden behind the figure in the rendered slide. The figure's "3] Recur for g" says the same thing.

### [D12-S17] Understanding insertion — (b) uncle is BLACK ⭐
- ⭐ **b) If x's uncle is BLACK**, there are four configurations of x, x's parent (p) and x's grandparent (g):
  - (i) **Left Left Case**: p is the left child of g and x is the left child of p.
  - (ii) **Left Right Case**: p is the left child of g and x is the right child of p.
  - (iii) **Right Right Case**: mirror of case (i).
  - (iv) **Right Left Case**: mirror of case (ii).
- This slide names the shapes but gives no actions. The actions come from S19–S22 (and S14 lines 9–16):

  | Shape (uncle black) | Slide case | Action |
  |---|---|---|
  | Left-Right | Case 2 [S19, S20] | anticlockwise (left) rotation at the parent; the old parent becomes the new x, and the shape is now Left-Left |
  | Left-Left | Case 3 [S21, S22] | clockwise (right) rotation at the grandparent; exchange the colours of grandparent and parent |
  | Right-Left | mirror of Case 2 [S14 lines 15–16] | clockwise (right) rotation at the parent; the old parent becomes the new x, and the shape is now Right-Right |
  | Right-Right | mirror of Case 3 | anticlockwise (left) rotation at the grandparent; exchange the colours of grandparent and parent |

- The slides draw only the left-side cases. The mirror cases appear in the exercise answers of §5.3 (for example 5, 10, 15 → Right-Right).

### [D12-S18] Inserting a new node — Case 1: uncle is red ⭐
- Title (image): "Case 1: New Node's Uncle is Red".
- Two pictures:
  - left: a black node with two red children;
  - right: the same, with a red **New Node** below the left red child (drawn as its right child).
  ```
        (B)               (B)
       /   \             /   \
     (R)   (R)         (R)   (R)
                          \
                          (R)  <- New Node
  ```
- ⭐ **Strategy to resolve: CHANGE COLOR**
  1. Change colour of the grandparent of the new node.
  2. Change colour of the parent and uncle of the new node.
  3. The grandparent will be marked as the new node.
- After the change, the grandparent is red and the parent and uncle are black; the check continues from the grandparent. If the grandparent is the root, step 2 of S16 makes it black again.

### [D12-S19] Case 2: uncle black, new node is the RIGHT child of its parent ⭐
- Title (image): "Case 2: New Node's Uncle is Black and New Node is right Child of its parent".
  ```
          A(B)
         /    \
       B(R)   C(B)
          \
          N(R)  <- New Node
  ```
- ⭐ **Strategy to resolve: ROTATION**
  - ✓ Anti-clockwise rotation at the parent node (B).
  - ✓ Make the parent the new node.
- ⚠️ The title only covers the left side, where the parent B is a *left* child (as drawn). When the parent is a right child, the mirror case applies [S17].

### [D12-S20] Case 2 — the rotation drawn
- Three pictures: the start, a curved arrow showing the anticlockwise rotation at B, and the result.
  ```
     before                      after rotL(B)
          A(B)                        A(B)
         /    \                      /    \
       B(R)   C(B)                 N(R)   C(B)
          \                        /
          N(R)                   B(R)   <- B is now the "new node"
  ```
- There are still two reds in a row (N–B). But now B is the **left** child of N, and N is the left child of A, so this is Case 3.
- Strategy box repeated: "Anti Clockwise Rotation at Parent Node / Make Parent as New Node".

### [D12-S21] Case 3: uncle black, new node is the LEFT child of its parent ⭐
- Title (image): "New Node's Uncle is black and New Node is left Child of its Parent". A curved arrow over A shows a clockwise rotation.
  ```
          A(B)
         /    \
       B(R)   C(B)
       /
     N(R)  <- New Node
  ```
- ⭐ **Strategy to resolve: ROTATION & COLOR CHANGE**
  - ✓ Clockwise rotation at the grandparent node (A).
  - ✓ Exchange the colours of grandparent and parent.

### [D12-S22] Case 3 — the result
- Text (image): "1. Clockwise Rotation in grand Parent of New Node. 2. Exchange the color of Grand Parent and Parent of New Node."
  ```
     before                      after rotR(A), then exchange colours
          A(B)                          B   <- labelled "BLACK"
         /    \                        / \
       B(R)   C(B)                  N(R)   A   <- labelled "RED"
       /                                    \
     N(R)                                   C(B)
  ```
- The right-hand picture shows the rotated tree still in the old colours (B red, A black). The arrows labelled BLACK (at B) and RED (at A) give the colours *after* the exchange.
- Final result: **B black**, with children **N red** and **A red**; C (black) is A's right child.
- ⚠️ The figures on S19–S22 are schematic: they leave out the subtrees. With C a real black node, the B side would also need black nodes below it to satisfy rule 4. Read A, B, C, N as the tops of larger subtrees, as in the S16 figure with T1–T5. In the class examples the black uncle is sometimes a NIL (S25 answers) and sometimes a real black node with subtrees (S24: uncle 10).
- ⚠️ "in grand Parent" should be "at the grandparent".

### [D12-S23] Example — the starting tree
  ```
      ______9B_
     /         \
    3R___     10B_
   /     \        \
  2B    6B_      13R
       /   \
      5R  7R
  ```
- ✅ Valid RB tree with bh(root) = 2.

### [D12-S24] Insert 4 — the worked example ⭐⭐
- The slide shows four pictures joined by arrows, with these boxes:
  - **Case-1** box: "Change Color of Grand Parent of New Node; Change Color of Parent and Uncle of New Node; Grandparent will be marked as New Node";
  - **Case-2** box: "Anti Clockwise Rotation at Parent Node; Make Parent as New Node";
  - **Case-3** box: "Clockwise Rotation at GrandParent Node; Exchange Color of GrandParent and Parent".
- Each "Case" label sits on the picture *where that case applies*. "x" arrows mark the current node: x = 6 after Case 1, x = 3 after Case 2.
- Redrawn step by step:

- **Insert 4** — BST-insert as left child of 5 (red).
  - Parent 5 RED, uncle 7 RED → **Case 1 (recolour)**: 5 and 7 → BLACK, grandparent 6 → RED; new x = 6.
  - Parent 3 RED, uncle 10 BLACK, 6 is RIGHT child of 3, 3 is LEFT child of 9 → **Case 2 (Left-Right)**: anticlockwise (left) rotation at parent 3; parent 3 becomes new x.
  - 3 is LEFT child of 6, 6 is LEFT child of 9, uncle 10 BLACK → **Case 3 (Left-Left)**: clockwise (right) rotation at grandparent 9; exchange colours of 9 and 6.
```
(a) insert 4          →  (b) Case 1, x=6       →  (c) Case 2: rotL(3)   →  (d) Case 3: rotR(9)
    ________9B_              ________9B_                    __9B_              ____6B___
   /           \            /           \                  /     \            /         \
  3R_____     10B_         3R_____     10B_           ____6R_   10B_         3R___     9R_
 /       \        \       /       \        \         /       \      \       /     \   /   \
2B      6B_      13R     2B      6R_      13R       3R___   7B     13R     2B    5B  7B  10B_
       /   \                    /   \              /     \                      /            \
      5R  7R                   5B  7B             2B    5B                     4R           13R
     /                        /                        /
    4R                       4R                       4R
```

- ✅ The script, applying the slide rules, reproduces every picture on the slide. Final tree: 6 black; 3 and 9 red; 2, 5, 7, 10 black; 4 and 13 red; bh(root) = 2.
- This final tree is the **starting tree of the deletion exercise D13-S16**.

### [D12-S25] Exercise — insert into an empty RB tree ⭐
- "Insert following nodes in an empty RB Tree":
  - **41, 38, 31, 12, 19, 8**
  - **5, 10, 15, 25, 20, 30**
- No answers on the slide. Full verified traces are in §5.3. Final trees:
  ```
  41, 38, 31, 12, 19, 8           5, 10, 15, 25, 20, 30
         ____38B_                       10B____
        /        \                     /       \
      _19R_     41B                   5B     _20R_
     /     \                                /     \
    12B   31B                              15B   25B_
   /                                                 \
  8R                                                30R
  ```

### [D12-S26] Exercises
1. Draw the complete binary search tree of height 3 on the keys {1, 2, …, 15}. Add the NIL leaves and colour the nodes in three different ways so that the black-heights of the resulting red-black trees are 2, 3 and 4.
2. Suppose the root of a red-black tree is red. If we make it black, does the tree remain a red-black tree?
- Answers, worked from the S6 rules, are in §5.2.

### [D12-S27] Video lectures (end of deck)
- "Video Lecture of the topic can be found at":
  - Red Black Tree and Insertion — https://www.youtube.com/watch?v=H0MutN9u-Ik
  - Understanding RB Tree Deletion cases with an Example — https://youtu.be/1qEjtfR0gIo
  - How To Perform Search & Insert Operation In Binary Search Tree (BST) — https://www.youtube.com/watch?v=smE0gHcd5Gg
- These are the professor's recommended class videos.

### Deck 13 — RB Tree Deletion (20 slides)

### [D13-S1] Title — "RB Tree Deletion"
- Title slide only (yellow box).

### [D13-S2] Section title — "Node Deletion in Binary Search Tree"
- Red bold title on yellow. The next five slides cover plain BST deletion, which is Step 1 of RB deletion [S8].

### [D13-S3] BST deletion, Case 1: node with no children ⭐
- ⭐ Bold heading: "Case 1: Deleting a Node that has No Children". Example: delete 78.
- The figure shows four steps: the search starts at 45 (step 1), goes right to 56 (step 2), finds 78 (step 3), and removes it (step 4).

```
start (steps 1-3: 45 -> 56 -> 78)  →  step 4: 78 removed
  45_____                               45_____
 /       \                             /       \
39    __56_                           39    __56
     /     \                               /
    54_   78                              54_
       \                                     \
      55                                    55
```

- If we have to delete a leaf such as 78, we simply remove it. This is the simplest case.

### [D13-S4] BST deletion, Case 2: node with one child ⭐
- ⭐ "the **node's child is set as the child of the node's parent**." In other words, replace the node with its child:
  - if the node is the **left** child of its parent, the node's child becomes the **left** child of the node's parent;
  - if the node is the **right** child of its parent, the node's child becomes the **right** child of the node's parent.
- Example: delete **54**, whose only child is 55. Steps 45 → 56 → 54, then "Replace 54 with 55".

```
start (steps 1-3: 45 -> 56 -> 54)  →  step 4: replace 54 with 55
  45_____                               45___
 /       \                             /     \
39    __56_                           39    56_
     /     \                               /   \
    54_   78                              55  78
       \
      55
```

### [D13-S5] BST deletion, Case 3: node with two children ⭐
- ⭐ Replace the node's value with its
  - ***in-order predecessor*** (largest value in the left subtree), or
  - ***in-order successor*** (smallest value in the right subtree).
- Example: delete **56**, "Using in-order predecessor in the above case". The predecessor of 56 is 55, the largest key in 56's left subtree {54, 55}.
  - Step 3: 56's value is replaced by 55; for a moment 55 appears twice.
  - Step 4: the old 55 node (a leaf) is removed.

```
steps 1-2: find 56  →  step 3: 56 := 55  →  step 4: old 55 removed
  45_____                45_____              45___
 /       \              /       \            /     \
39    __56_            39    __55_          39    55_
     /     \                /     \              /   \
    54_   78_              54_   78_            54  78_
       \     \                \     \                  \
      55    80               55    80                 80
```

- With the successor instead: 78 (the smallest key in {78, 80}) would move up. The old 78 node has one child (80), so 80 would take its place.

### [D13-S6] Algorithm for deletion ⭐
- The slide's pseudocode:
  ```
  Delete (TREE, VAL)
  Step 1: IF TREE = NULL
            Write "VAL not found in the tree"
          ELSE IF VAL < TREE -> DATA
            Delete(TREE->LEFT, VAL)
          ELSE IF VAL > TREE -> DATA
            Delete(TREE -> RIGHT, VAL)
          ELSE IF TREE -> LEFT AND TREE -> RIGHT
            SET TEMP = findLargestNode(TREE -> LEFT)
            SET TREE -> DATA = TEMP -> DATA
            Delete(TREE -> LEFT, TEMP -> DATA)
          ELSE
            SET TEMP = TREE
            IF TREE -> LEFT = NULL AND TREE -> RIGHT = NULL
                 SET TREE = NULL
            ELSE IF TREE -> LEFT != NULL
                 SET TREE = TREE -> LEFT
            ELSE
                 SET TREE = TREE -> RIGHT
            [END OF IF]
            FREE TEMP
          [END OF IF]
  Step 2: END
  ```
- How it works:
  - It is **recursive**: go left or right until VAL is found, or report "not found".
  - **Two children:** `findLargestNode(TREE -> LEFT)` is the **in-order predecessor**. Copy its data into the node, then delete that predecessor from the left subtree.
  - **Zero or one child:** the node is replaced by NULL, by its left child or by its right child, and then freed (Cases 1 and 2 of S3, S4).
- The class algorithm always uses the **predecessor**, so the RB deletion answers in §5.5 use it by default, with the successor version noted wherever it changes the result.
- `findLargestNode` is not written out. From "largest value in the left sub-tree" [S5] and BST order, it means: start at TREE → LEFT and keep going right while a right child exists.

### [D13-S7] Example — BST deletion (practice tree)
```
           ______39___
          /           \
     ____27___       45_
    /         \     /   \
 __18___     29_   40  54_
/       \   /   \         \
9_     21  28  36        59___
  \   /                       \
 10  19                      65
                            /
                           60
```
- The slide gives only the tree, with no operation. Practice deletions (leaf, one child, two children) are worked in §5.4.

### [D13-S8] RB tree deletion — the rules ⭐⭐
- ⭐ This rule sheet is the core of the deck. On the slide, **RED** is in red, **BLACK** in bold, and **[Terminal]** in red. It is repeated on S12, S14, S15, S17 and S18.
- **Step 1** – Perform BST deletion.
- **Step 2**
  - **Case 1** – If the node to be deleted is RED ⇒ just delete it **[Terminal]**.
  - **Case 2** – If the node to be deleted is BLACK but has a RED child ⇒ replace the node with its child and colour it BLACK.
    - "Or if the Node to be deleted is BLACK & has RED parent ⇒ swap the color of Parent & Sibling (terminal)."
  - Green box: "[if node to be deleted is black, it will be replaced by Double Black DB]".
  - **Case 3(1)** – If the root node is DB ⇒ remove DB **[Terminal]**.
  - **Case 3(2)** – If DB's sibling is RED (and so the parent is BLACK):
    - swap the colours of PARENT and its SIBLING;
    - rotate the PARENT in DB's direction;
    - reapply the cases.
  - **Case 3(3)** – If DB's sibling is BLACK and both of its children are BLACK:
    - remove DB (node) and add an extra black to its parent:
      - if the parent is RED, make it BLACK;
      - if the parent is BLACK, make it double BLACK;
    - make the sibling RED;
    - if a DB still exists, apply the other cases.
  - **Case 3(4)** – DB's sibling is BLACK, the sibling's child **far** from DB is BLACK, but the child **near** DB is RED:
    - swap the colours of DB's sibling and the sibling's near child;
    - rotate the sibling in the direction opposite to DB;
    - "Apply case 6" [sic], i.e. Case 3(5).
  - **Case 3(5)** – DB's sibling is BLACK and the far child is RED **[Terminal]**:
    - swap the colours of PARENT and SIBLING;
    - rotate the PARENT in DB's direction;
    - remove DB;
    - change the colour of the RED far child to BLACK.
- Words used by the rules:
  - **node to be deleted:** after Step 1, this is the node physically removed: the node itself, or its predecessor/successor if it had two children.
  - **DB (double black):** the place left by a removed black node. A path through it is one black short, so the DB carries an "extra black" until it is removed.
  - **sibling:** DB's parent's other child.
  - **near / far child:** of the sibling's two children, the *near* one is on DB's side and the *far* one is on the other side. If DB is a left child, the sibling's left child is near and its right child is far.
  - **rotate in DB's direction:** if DB is a left child, rotate the parent left (anticlockwise); if DB is a right child, rotate right (clockwise).
  - **rotate opposite to DB:** the reverse direction.
  - **remove DB:** if DB is a NIL, it just becomes an ordinary NIL. If DB sits on a real node (after Case 3(3) pushed it up), that node becomes ordinary black. This is the reading used in all traces here.
- ⭐ Which cases end the fix-up:
  - always terminal: Cases 1, 2, the "Or" rule, 3(1) and 3(5);
  - 3(3) ends only when the parent was red;
  - 3(2) and 3(4) always lead to another case.
- ⚠️ "Apply case 6": there is no Case 6 in this numbering. S12, S14 and S17 correct it to "Apply case 3(5)"; S8 and the hidden S15 and S18 keep "case 6".
- ⚠️ **The "Or" rule is safe only when the sibling's two children are both black** (NILs count as black). Then it gives exactly the Case 3(3) result: parent red → black, sibling → red.
  - If the sibling has a red child, the swap makes the sibling red right above a red child, which breaks rule 3 [D12-S6].
  - Example: deleting 52 in the S9 exercise (sibling 28 has red children 14 and 30). There the Case 3 rules must be used: DB → Case 3(5). See §5.5.
- ⚠️ Small slips: "If stillDB exists" (missing space); "child's who is far" (grammar); a ☒ box symbol is used as the bullet before "Make sibling RED".
- 🔎 Look up in Track B: the standard deletion fix-up, whether it has an "Or" shortcut, and how it handles a double black on a real node.

### [D13-S9] Exercise — construct, then delete ⭐
- "Construct a tree as follows": **49, 28, 58, 14, 30, 52, 67, 63, 75, 79** (RB insertion into an empty tree).
- "Perform the following deletion": **52, 28, 79, 75, 49, 30, 14** (large bold font).
- No solution on the slide. The construction trace is in §5.3 and the full deletion solution in §5.5 (Example A).
- ⚠️ The slide title "RB tree Deletion" is cut off at the top edge.

### [D13-S10] Same exercise, with the constructed tree (hand-drawn) ⭐
- The professor's hand-drawn tree, with B and R written beside each node:

```
           ____58B____
          /           \
     ____49R_       _67R_
    /        \     /     \
  _28B_     52B   63B   75B_
 /     \                    \
14R   30R                  79R
```

- ✅ Building the tree with the slide's insertion rules gives exactly this tree. The last insert, 79, triggers Case 1 at 75/63 and then a Right-Right rotation at the root 49, so 58 becomes the root.
- The handwritten "30" is hard to read (it looks like "3D"). BST order confirms it: it is the right child of 28 and lies between 28 and 49.

### [D13-S11] Same tree (smaller)
- The same hand-drawn tree with "Perform the following deletion 52, 28, 79, 75, 49, 30, 14", nothing else.

### [D13-S12] Rule sheet next to the tree ⭐
- The S8 rules again, with the tree and the deletion sequence. Here Case 3(4) correctly ends with "Apply case 3(5)".

### [D13-S13] Exercise — delete 30, 45, 10, 12, 35 ⭐

```
           _____________20B________________
          /                                \
        _11R_______             __________40B_
       /           \           /              \
    __10B     ____15B_       _30R____        45B
   /         /        \     /        \
  5R_       12B_     18B   28B     _35B_
 /   \          \                 /     \
2B  6B         13R               31R   38R
```

- ⚠️ ✅ **This tree breaks the Black Height Rule at node 10.**
  - 10 has only a left child: 5 (red), whose children 2 and 6 are black.
  - Path 10 → 5 → 2 → nil has 2 black real nodes (10, 2), but 10 → nil (right side) has only 1 (10). So bh(10) does not exist.
  - From the root, paths through 2 or 6 have 3 black nodes, but 20 → 11 → 10 → nil has only 2.
- Effect on the exercise:
  - deleting 10 (black, with red child 5) is Case 2: 5 takes its place and turns black, which repairs the problem (every path then has 3 black nodes);
  - the other deletions are not affected.
- Full solution: §5.5, Example B.

### [D13-S14] Rule sheet next to the tree ⭐
- The S8 rules again, beside the S13 tree, with Case 3(4) → "Apply case 3(5)".

### [D13-S15] 🙈 Hidden duplicate of S14
- Hidden in the .pptx. A different layout of the same rule sheet and tree; it still says "Apply case 6". The tree picture covers the Case 3(1) line and part of the "Or" line.

### [D13-S16] Exercise — delete 9, 3, 4, 10, 13, 2 ⭐

```
    ____6B___
   /         \
  3R___     9R_
 /     \   /   \
2B    5B  7B  10B_
     /            \
    4R           13R
```

- ✅ Valid RB tree, bh(root) = 2. It is exactly the **final tree of the insertion example D12-S24**: the class continues from insertion into deletion.
- Full solution: §5.5, Example C.

### [D13-S17] Rule sheet next to the tree ⭐
- The S8 rules again, beside the S16 tree, with "Apply case 3(5)".

### [D13-S18] 🙈 Hidden duplicate of S17
- Hidden in the .pptx. Same content in another layout; it still says "Apply case 6".

### [D13-S19] An RB tree with an "x" label (no text)
- The slide has no text, only this figure. Small squares mark the NIL children of 10, 20 and 51 (each has no right child):

```
       _______33B__________
      /                    \
    _15R____          ____47R____
   /        \        /           \
  10B     _20B     _38B_       _51B
 /       /        /     \     /
5R      18R      36R   39R   49R
```

- An italic **x** is written on the edge from 10 to its left child **5**.
- ✅ Valid RB tree, bh(root) = 2.
- No question is attached, and the meaning of "x" is not explained.
- One reading with the class rules: deleting 10 (black, with red child 5) is Case 2, so x = 5 replaces 10 and turns black.
- 🔎 Look up in Track B: what this figure is meant to show.
- This tree is used for the new practice problem NEW-D1 in §5.6.

### [D13-S20] Video lectures (end of deck)
- "Video Lecture of the topic can be found at":
  - How to Delete Node in Binary Search Tree (BST) — https://www.youtube.com/watch?v=ad1KFYHZyMc
  - Red Black Tree and Insertion Operation — https://www.youtube.com/watch?v=H0MutN9u-Ik
  - Understanding RB Tree Deletion cases with an Example — https://youtu.be/1qEjtfR0gIo
  - RB Tree Deletion Example No.2 — https://youtu.be/MjlQo2vRAnI
  - RB Tree Deletion Example No.3 — https://youtu.be/vVRo_WagRLQ

---

## 3. Definitions & key terms

| Term | Meaning as taught | Ref |
|---|---|---|
| Amortized analysis | Analysing a *sequence* of operations to show that the average cost per operation is small, even if one operation is expensive; the average is taken over a worst-case sequence. | D11-S2 |
| Average-case analysis | Averaging over all possible inputs; probability is involved, unlike amortized analysis. | D11-S3 |
| Actual cost | The real cost of an operation, e.g. PUSH 1, POP 1, MULTIPOP min(S,k). | D11-S11 |
| Amortized cost | The cost charged to an operation in the analysis, e.g. PUSH 2, POP 0, MULTIPOP 0. | D11-S11 |
| Amortized bound ("preserve the sum") | Choose amortized costs so that **Σ amortized cost ≥ Σ actual cost**. | D11-S4 |
| Aggregate analysis | Find an upper bound T(n) on the total cost of n operations; the average cost is T(n)/n. | D11-S4 |
| Accounting method | Give each operation its own cost: its own execution time plus its influence on the running time of future operations. | D11-S4 |
| Potential method | Like the accounting method, but overcharges early operations to compensate for undercharges later. | D11-S4 |
| Red-black (RB) tree | A self-balancing BST in which every node has an extra attribute, colour (RED or BLACK). Invented in 1972 by Rudolf Bayer as "symmetric binary B-Trees". | D12-S2 |
| NIL | The empty child. It is black, so every real node has two children (some of them NIL). | D12-S6 |
| Black Children Rule | Both children of a red node are black, so there are never two reds in a row. | D12-S6, S9 |
| Black height bh(v) | The number of black *real* (non-NIL) nodes on every downward path from v to a nil; the Black Height Rule says this number is the same for all such paths. | D12-S6 |
| Balance factor (AVL) | Height(left subtree) − height(right subtree); must be −1, 0 or 1 in an AVL tree. | D12-S3, S5 |
| Rotation | A local restructuring that keeps the in-order sequence A x B y C. A left rotation is anticlockwise; a right rotation is clockwise. | D12-S8, S19–S22 |
| Uncle | The sibling of the parent. Its colour selects the insertion case. | D12-S10, S11 |
| Discrepancy | A broken property after insertion: the new node is the root, or its parent is red. | D12-S10 |
| RB-INSERT / RB-INSERT-FIXUP | The BST insertion that colours the new node red, and the loop that repairs the colours. | D12-S12–S14 |
| Insertion Case 1 / 2 / 3 | Uncle red → recolour. Uncle black and Left-Right → rotate at the parent. Uncle black and Left-Left → rotate at the grandparent and swap colours. | D12-S14, S18–S22 |
| LL, LR, RR, RL | The four shapes of x, parent and grandparent when the uncle is black. | D12-S17 |
| In-order predecessor / successor | The largest value in the left subtree / the smallest value in the right subtree. | D13-S5 |
| findLargestNode | Used by the class BST-delete algorithm to find the in-order predecessor. | D13-S6 |
| Node to be deleted | After the BST step, the node actually removed: the node itself, or its predecessor/successor. | D13-S8 |
| Double Black (DB) | The place of a removed black node. It holds an "extra black" until Case 3 removes it. | D13-S8 |
| Near / far child | The sibling's child on DB's side / on the side away from DB. | D13-S8 |
| Terminal | A deletion case after which no more fixing is needed. | D13-S8 |
| B-tree minimum degree t | Depends on the disk block size; every node except the root has at least t−1 keys, and the root may have just 1 key. | D12-S5 |

---

## 4. Rule cards as taught

### 4.1 Amortized analysis — the methods
```
AMORTIZED ANALYSIS                                          [D11-S2..S4]
  Goal : average cost per operation over a WORST-CASE sequence (no probability)
  Rule : sum(amortized costs) >= sum(actual costs)          ("preserve the sum")
  Aggregate  : T(n) = total cost of n ops      ->  cost per op = T(n)/n
  Accounting : give each op type its own amortized cost
               (its own time + what it pays in advance for future ops)
  Potential  : like accounting; overcharge early ops, undercharge later ones
               (no worked example on the slides)

CLASS SCENARIOS
  k-th smallest, sort once [S6,S7] : total = n log n + (n-1)*1 <= n log n + n
                                     -> per query <= log n + 1 = O(log n)
  doubling space (puppies) [S8-S10]: room left -> 1 ; full -> 1 (buy) + N (move) + 1 (add)
                                     -> costly only when full; running avg <= 53/17 ~ 3.12
  stack [S11]                      : actual  PUSH 1, POP 1, MULTIPOP min(|S|,k)
                                     amortized PUSH 2, POP 0, MULTIPOP 0
                                     -> total <= 2n -> 2 per op -> O(1)
```

### 4.2 Red-black properties
```
RB PROPERTIES                                               [D12-S6]
  1. Root is always BLACK.
  2. NIL is BLACK (so every real node has two children, some may be NIL).
  3. Black Children Rule: both children of a RED node are BLACK (no red-red).
  4. Black Height Rule: for every node v, every downward path v -> nil has the
     same number bh(v) of BLACK real (non-nil) nodes.
  Consequence: longest root-leaf path <= 2 x shortest  -> balanced   [D12-S2]

VALIDITY CHECK (use after every step of an exam answer)
  (1) root black?   (2) any red node with a red child?   (3) black counts equal on all paths?
```

### 4.3 Rotation
```
         |                                  |
        (x)      rotL(x) = Left Rotate      (y)
       /   \     (anticlockwise)  ------>  /   \
      A    (y)                           (x)    C
          /   \  <------  rotR(y) =     /   \
         B     C    Right Rotate       A     B
                    (clockwise)
  In-order before and after: A x B y C  -> BST property kept   [D12-S8]
  rotL(x): y moves up, x becomes y's left child, B moves from y's left to x's right.
  rotR   : the exact reverse (the slide labels it "Right Rotate (T, x)", see the warning at [D12-S8]).
```

### 4.4 Insertion — the cases
```
INSERT k                                         [D12-S9..S22, S14 pseudocode]
  BST-insert k as a RED leaf; x = k
  repeat:
    x is the root ...................................... colour x BLACK; stop
    parent p is BLACK .................................. stop (nothing broken)
    p RED and uncle u RED .............................. CASE 1 (change colour):
         p, u -> BLACK;  grandparent g -> RED;  x = g;  repeat
    p RED and uncle u BLACK (a NIL uncle counts as black):
      p is LEFT child of g,  x is RIGHT child of p (Left-Right) ... CASE 2:
         anticlockwise rotation at p  (rotL(p));  x = old p  -> now Left-Left
      p is LEFT child of g,  x is LEFT child of p  (Left-Left) .... CASE 3:
         clockwise rotation at g  (rotR(g));  exchange colours of g and p;  stop
      p is RIGHT child of g, x is LEFT child of p  (Right-Left) ... mirror CASE 2:
         clockwise rotation at p  (rotR(p));  x = old p  -> now Right-Right
      p is RIGHT child of g, x is RIGHT child of p (Right-Right) .. mirror CASE 3:
         anticlockwise rotation at g  (rotL(g));  exchange colours of g and p;  stop
  finally: root -> BLACK
  Cost: O(lg n); only Case 1 repeats (x moves 2 levels up); at most 2 rotations   [D12-S15]
```
- How to recognise the shape fast: if x, p and g form a **straight line** (LL or RR), you need **one** rotation at g (Case 3). If they form a **bend** (LR or RL), first rotate at p to straighten the line (Case 2), then do Case 3.
- After Case 3 the new top of that subtree is black with two red children.

### 4.5 Deletion — the cases
```
DELETE k                                                         [D13-S3..S8]
 STEP 1  BST delete.
   0 children: remove.   1 child: the child takes k's place.
   2 children: copy the in-order PREDECESSOR (class algorithm, D13-S6) or SUCCESSOR
               into k's node (that node KEEPS its colour), then remove that other node.
   m = the node physically removed (it has 0 or 1 child)
 STEP 2
   m RED ............................................ Case 1: just delete it             [T]
   m BLACK with a RED child ......................... Case 2: child replaces m, child -> BLACK [T]
   m BLACK, parent RED, sibling BLACK with BLACK kids "Or" rule: delete m, swap colours
                                                      of parent and sibling (= 3(3))     [T]
   otherwise m's place becomes DB (double black), then repeat:
     DB is the root ................................. 3(1): remove DB (just black)        [T]
     sibling RED (so parent BLACK) .................. 3(2): swap colours parent<->sibling;
                                                            rotate parent TOWARD DB; re-check
     sibling BLACK, both its kids BLACK ............. 3(3): remove DB; sibling -> RED;
                                                            parent RED   -> BLACK         [T]
                                                            parent BLACK -> DB (move up; re-check)
     sibling BLACK, far kid BLACK, near kid RED ..... 3(4): swap colours sibling<->near kid;
                                                            rotate sibling AWAY from DB; -> 3(5)
     sibling BLACK, far kid RED ..................... 3(5): swap colours parent<->sibling;
                                                            rotate parent TOWARD DB; remove DB;
                                                            far kid -> BLACK               [T]
   near kid = sibling's child on DB's side;  far kid = the other one.
   TOWARD DB: DB is a left child -> rotL(parent); DB is a right child -> rotR(parent).
```
- Order of checks: test 3(1), then 3(2), then 3(3), then 3(4), then 3(5), as on the slide. 3(3) needs *both* of the sibling's children black; 3(4) needs far black and near red; 3(5) needs only the far child red (the near child can be anything).
- ⚠️ Use the "Or" rule **only** when the sibling's two children are both black. If the sibling has a red child, go to the Case 3 rules (3(4) or 3(5)) [see the D13-S8 warning].
- If the two-child node's predecessor (or successor) is red, the whole deletion is just Case 1. That is why the successor and predecessor routes can need different amounts of work.

---

## 5. Worked examples

All RB traces below were produced and checked (✅) by a script that applies exactly the slide rules of §4. After every step it checks the four properties of D12-S6. Insertion traces show the tree after every repair step. Deletion traces show the tree after every case applied.

### 5.1 Amortized analysis examples

#### (a) k-th smallest, sort once [D11-S6, S7] ✅
- Model from the slide: the first query sorts (n log n), and each of the other n − 1 queries costs 1.
- Total = n log n + (n − 1) ≤ n log n + n, so the cost per query is ≤ log n + 1 = O(log n).

| n | log₂ n | Naive bound n·(n log n) | Sort-once total n log n + (n−1) | Per query | Slide bound log n + 1 |
|---|---|---|---|---|---|
| 8 | 3 | 192 | 24 + 7 = 31 | 3.875 | 4 |
| 16 | 4 | 1 024 | 64 + 15 = 79 | 4.9375 | 5 |
| 1024 | 10 | 10 485 760 | 10 240 + 1 023 = 11 263 | ≈ 11.0 | 11 |

#### (b) Doubling the space — the puppy table, re-worked [D11-S8–S10] ✅
- Rule from S8: if there is room, an add costs 1. If the facility is full, it costs 1 (buy) + N (move the old puppies) + 1 (add the new one).
- Start: 1 space, 0 puppies.
- Per add (rows for adds 11–15 and 19–31 are left out; each of those costs 1):

| Add # | N before | Spaces at start | Buy | Move | New | Total | Running total | Running average |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 | 1 | 0 | 0 | 1 | 1 | 1 | 1.000 |
| 2 | 1 | 1 | 1 | 1 | 1 | **3** | 4 | 2.000 |
| 3 | 2 | 2 | 1 | 2 | 1 | **4** | 8 | 2.667 |
| 4 | 3 | 4 | 0 | 0 | 1 | 1 | 9 | 2.250 |
| 5 | 4 | 4 | 1 | 4 | 1 | **6** | 15 | 3.000 |
| 6 | 5 | 8 | 0 | 0 | 1 | 1 | 16 | 2.667 |
| 7 | 6 | 8 | 0 | 0 | 1 | 1 | 17 | 2.429 |
| 8 | 7 | 8 | 0 | 0 | 1 | 1 | 18 | 2.250 |
| 9 | 8 | 8 | 1 | 8 | 1 | **10** | 28 | 3.111 |
| 10 | 9 | 16 | 0 | 0 | 1 | 1 | 29 | 2.900 |
| 16 | 15 | 16 | 0 | 0 | 1 | 1 | 35 | 2.188 |
| 17 | 16 | 16 | 1 | 16 | 1 | **18** | 53 | 3.118 |
| 18 | 17 | 32 | 0 | 0 | 1 | 1 | 54 | 3.000 |
| 32 | 31 | 32 | 0 | 0 | 1 | 1 | 68 | 2.125 |
| 33 | 32 | 32 | 1 | 32 | 1 | **34** | 102 | 3.091 |

- Segment totals, slide vs corrected:

| Segment (N before add) | 0 | 1 | 2–3 | 4–7 | 8–15 | 16–31 |
|---|---|---|---|---|---|---|
| Slide: total / average | 1 / 1 | 3 / 3 | 5 / 2.5 | 10 / 2.5 ⚠️ | 17 / 2.125 | 34 / 2.125 ⚠️ |
| Correct: total / average | 1 / 1 | 3 / 3 | 5 / 2.5 | **9 / 2.25** | 17 / 2.125 | **33 / 2.0625** |

- Running average after 1, 2, 4, 8, 16, 32 adds: 1, 2, 2.25, 2.25, 2.1875, 2.125.
- The highest running average is 53/17 ≈ 3.12, just after the 17th add; a check of 2 million adds found nothing higher.
- So: one add can cost O(N), but the average per add stays a small constant. This is the S10 "spread out the expensive cost uniformly".

#### (c) Stack PUSH / POP / MULTIPOP bookkeeping [D11-S11] ✅
- Costs from the slide: actual PUSH 1, POP 1, MULTIPOP(S,k) = min(items in S, k); amortized PUSH 2, POP 0, MULTIPOP 0.
- "Credit" = Σ amortized − Σ actual so far. The S4 rule needs it to stay ≥ 0.

| # | Operation | Stack size before | Actual | Amortized | Size after | Σ actual | Σ amortized | Credit |
|---|---|---|---|---|---|---|---|---|
| 1 | PUSH | 0 | 1 | 2 | 1 | 1 | 2 | 1 |
| 2 | PUSH | 1 | 1 | 2 | 2 | 2 | 4 | 2 |
| 3 | PUSH | 2 | 1 | 2 | 3 | 3 | 6 | 3 |
| 4 | POP | 3 | 1 | 0 | 2 | 4 | 6 | 2 |
| 5 | PUSH | 2 | 1 | 2 | 3 | 5 | 8 | 3 |
| 6 | MULTIPOP(S,2) | 3 | 2 | 0 | 1 | 7 | 8 | 1 |
| 7 | PUSH | 1 | 1 | 2 | 2 | 8 | 10 | 2 |
| 8 | MULTIPOP(S,5) | 2 | 2 | 0 | 0 | 10 | 10 | 0 |

- n = 8 operations: Σ actual = 10 ≤ Σ amortized = 10 ≤ 2n = 16, so the average is 10/8 = 1.25 ≤ 2 per operation.
- The credit is never negative, and in this table it always equals the number of items on the stack: every item still on the stack has one unit of prepaid credit.

### 5.2 RB property checks [D12-S6]

#### (a) bh of every node of the D12-S7 tree ✅
- Using the slide's wording: count the black real nodes on a path from v (v included) down to a nil.

| Node | 11 (B) | 2 (R) | 14 (B) | 1 (B) | 7 (B) | 5 (R) | 8 (R) | 15 (R) |
|---|---|---|---|---|---|---|---|---|
| bh(v) | 2 | 1 | 1 | 1 | 1 | 0 | 0 | 0 |

- 🔎 Look up in Track B: the textbook's counting convention for bh. These numbers follow the slide's wording.

#### (b) Which slide trees are valid? ✅

| Tree | Valid? | bh(root) | Note |
|---|---|---|---|
| D12-S7 | yes | 2 | |
| D12-S12 (4 just inserted) | no | — | rule 3: 4 and 5 are both red, so the fix-up is needed (§5.3) |
| D12-S23 | yes | 2 | |
| D12-S24 final | yes | 2 | |
| D13-S10 (built from 49, 28, …) | yes | 2 | |
| D13-S13 | **no** | — | ⚠️ rule 4 fails at 10 (see [D13-S13]) |
| D13-S16 | yes | 2 | |
| D13-S19 | yes | 2 | |

#### (c) Exercise D12-S26 (1): three colourings of the complete BST on 1…15 ✅
- The complete BST of height 3 on {1, …, 15}: root 8; then 4, 12; then 2, 6, 10, 14; then the odd keys 1, 3, …, 15 as leaves. Every leaf has two NIL children (not drawn).
- Three colourings, each satisfying all four rules:

```
bh = 2: levels B, R, B, R                 bh = 3: levels B, B, B, R
        ______8B_________                         ______8B_________
       /                 \                       /                 \
    __4R___         ____12R____               __4B___         ____12B____
   /       \       /           \             /       \       /           \
  2B_     6B_     10B_       _14B_          2B_     6B_     10B_       _14B_
 /   \   /   \   /    \     /     \        /   \   /   \   /    \     /     \
1R  3R  5R  7R  9R   11R   13R   15R      1R  3R  5R  7R  9R   11R   13R   15R

bh = 4: all black
        ______8B_________
       /                 \
    __4B___         ____12B____
   /       \       /           \
  2B_     6B_     10B_       _14B_
 /   \   /   \   /    \     /     \
1B  3B  5B  7B  9B   11B   13B   15B
```

- Why they work: the root is black; a red level always sits under a black level and above a black level or the NILs; every node at the same depth has the same colour, so all root-to-nil paths have the same number of black nodes.
- Another valid bh = 3 colouring: levels B, R, B, B.

#### (d) Exercise D12-S26 (2): red root made black ✅
- **Yes, it is still a red-black tree.** Check the four rules of D12-S6:
  1. The root is now black. ✔
  2. The NILs are unchanged. ✔
  3. Turning a node black cannot create a red node with a red child. ✔
  4. The root lies on *every* root-to-nil path, so every such path gains exactly one black node and they stay equal. For any other node v, the paths from v downward do not pass through the root, so bh(v) is unchanged. ✔
- Only bh(root) goes up by 1.

### 5.3 Insertion traces

#### (a) D12-S12/S13: insert z = 4 into the D12-S7 tree ✅ (fix-up not on the slide; worked with the slide rules)
- The tree is the S7 tree; z = 4 hangs under 5. This is the same pattern as D12-S24: Case 1, then Case 2, then Case 3.

- **Insert 4** — BST-insert as left child of 5 (red).
  - Parent 5 RED, uncle 8 RED → **Case 1 (recolour)**: 5 and 8 → BLACK, grandparent 7 → RED; new x = 7.
  - Parent 2 RED, uncle 14 BLACK, 7 is RIGHT child of 2, 2 is LEFT child of 11 → **Case 2 (Left-Right)**: anticlockwise (left) rotation at parent 2; parent 2 becomes new x.
  - 2 is LEFT child of 7, 7 is LEFT child of 11, uncle 14 BLACK → **Case 3 (Left-Left)**: clockwise (right) rotation at grandparent 11; exchange colours of 11 and 7.
```
(a) insert 4           →  (b) Case 1, x=7        →  (c) Case 2: rotL(2)
    ________11B_              ________11B_                    __11B_
   /            \            /            \                  /      \
  2R_____      14B_         2R_____      14B_           ____7R_    14B_
 /       \         \       /       \         \         /       \       \
1B      7B_       15R     1B      7R_       15R       2R___   8B      15R
       /   \                     /   \               /     \
      5R  8R                    5B  8B              1B    5B
     /                         /                         /
    4R                        4R                        4R

(d) Case 3: rotR(11)
    ____7B___
   /         \
  2R___     11R_
 /     \   /    \
1B    5B  8B   14B_
     /             \
    4R            15R
```

- Final: 7 is the black root; 2 and 11 are red; 1, 5, 8 and 14 are black; 4 and 15 are red. bh(root) = 2. ✅

#### (b) D12-S24: insert 4 into the D12-S23 tree ⭐
- The full drawn trace is under [D12-S24] in §2.
- Summary: Case 1 at 4 (5, 7 → black; 6 → red; x = 6) → Case 2 (Left-Right: rotL(3); x = 3) → Case 3 (Left-Left: rotR(9); 6 ↔ 9 colours). Final root 6 (black). ✅

#### (c) D12-S25: 41, 38, 31, 12, 19, 8 into an empty tree ✅

- **Insert 41** — BST-insert as root (red).
  - 41 is the root → colour it BLACK.
```
(a) insert 41  →  (b) root 41 -> black
41R               41B
```

- **Insert 38** — BST-insert as left child of 41 (red). Parent 41 is BLACK → no violation, done.
```
insert 38
  _41B
 /
38R
```

- **Insert 31** — BST-insert as left child of 38 (red).
  - 31 is LEFT child of 38, 38 is LEFT child of 41, uncle NIL BLACK → **Case 3 (Left-Left)**: clockwise (right) rotation at grandparent 41; exchange colours of 41 and 38.
```
(a) insert 31  →  (b) Case 3: rotR(41)
     _41B           _38B_
    /              /     \
  _38R            31R   41R
 /
31R
```

- **Insert 12** — BST-insert as left child of 31 (red).
  - Parent 31 RED, uncle 41 RED → **Case 1 (recolour)**: 31 and 41 → BLACK, grandparent 38 → RED; new x = 38.
  - 38 is the root → colour it BLACK.
```
(a) insert 12  →  (b) Case 1, x=38  →  (c) root 38 -> black
     _38B_             _38R_                _38B_
    /     \           /     \              /     \
  _31R   41R        _31B   41B           _31B   41B
 /                 /                    /
12R               12R                  12R
```

- **Insert 19** — BST-insert as right child of 12 (red).
  - Parent 12 RED, uncle NIL BLACK, 19 is RIGHT child of 12, 12 is LEFT child of 31 → **Case 2 (Left-Right)**: anticlockwise (left) rotation at parent 12; parent 12 becomes new x.
  - 12 is LEFT child of 19, 19 is LEFT child of 31, uncle NIL BLACK → **Case 3 (Left-Left)**: clockwise (right) rotation at grandparent 31; exchange colours of 31 and 19.
```
(a) insert 19    →  (b) Case 2: rotL(12)  →  (c) Case 3: rotR(31)
        _38B_               _38B_                 ____38B_
       /     \             /     \               /        \
  ____31B   41B          _31B   41B            _19B_     41B
 /                      /                     /     \
12R_                  _19R                   12R   31R
    \                /
   19R              12R
```

- **Insert 8** — BST-insert as left child of 12 (red).
  - Parent 12 RED, uncle 31 RED → **Case 1 (recolour)**: 12 and 31 → BLACK, grandparent 19 → RED; new x = 19.
  - Parent 38 is BLACK → no violation, done.
```
(a) insert 8       →  (b) Case 1, x=19
       ____38B_              ____38B_
      /        \            /        \
    _19B_     41B         _19R_     41B
   /     \               /     \
  12R   31R             12B   31B
 /                     /
8R                    8R
```

- **Final:** 38 (black) has children 19 (red) and 41 (black); 19 has children 12 (black) and 31 (black); 12 has a left child 8 (red). bh(root) = 2.
- Cases used: Left-Left (Case 3), Case 1 up to the root, Left-Right (Case 2 → Case 3), Case 1.

#### (d) D12-S25: 5, 10, 15, 25, 20, 30 into an empty tree ✅

- **Insert 5** — BST-insert as root (red).
  - 5 is the root → colour it BLACK.
```
(a) insert 5  →  (b) root 5 -> black
5R               5B
```

- **Insert 10** — BST-insert as right child of 5 (red). Parent 5 is BLACK → no violation, done.
```
insert 10
5B_
   \
  10R
```

- **Insert 15** — BST-insert as right child of 10 (red).
  - 15 is RIGHT child of 10, 10 is RIGHT child of 5, uncle NIL BLACK → **mirror Case 3 (Right-Right)**: anticlockwise (left) rotation at grandparent 5; exchange colours of 5 and 10.
```
(a) insert 15  →  (b) mirror Case 3: rotL(5)
5B_                 10B_
   \               /    \
  10R_            5R   15R
      \
     15R
```

- **Insert 25** — BST-insert as right child of 15 (red).
  - Parent 15 RED, uncle 5 RED → **Case 1 (recolour)**: 15 and 5 → BLACK, grandparent 10 → RED; new x = 10.
  - 10 is the root → colour it BLACK.
```
(a) insert 25  →  (b) Case 1, x=10  →  (c) root 10 -> black
  10B_              10R_                 10B_
 /    \            /    \               /    \
5R   15R_         5B   15B_            5B   15B_
         \                 \                    \
        25R               25R                  25R
```

- **Insert 20** — BST-insert as left child of 25 (red).
  - Parent 25 RED, uncle NIL BLACK, 20 is LEFT child of 25, 25 is RIGHT child of 15 → **mirror Case 2 (Right-Left)**: clockwise (right) rotation at parent 25; parent 25 becomes new x.
  - 25 is RIGHT child of 20, 20 is RIGHT child of 15, uncle NIL BLACK → **mirror Case 3 (Right-Right)**: anticlockwise (left) rotation at grandparent 15; exchange colours of 15 and 20.
```
(a) insert 20   →  (b) mirror Case 2: rotR(25)  →  (c) mirror Case 3: rotL(15)
  10B_               10B_                            10B____
 /    \             /    \                          /       \
5B   15B____       5B   15B_                       5B     _20B_
            \               \                            /     \
          _25R             20R_                         15R   25R
         /                     \
        20R                   25R
```

- **Insert 30** — BST-insert as right child of 25 (red).
  - Parent 25 RED, uncle 15 RED → **Case 1 (recolour)**: 25 and 15 → BLACK, grandparent 20 → RED; new x = 20.
  - Parent 10 is BLACK → no violation, done.
```
(a) insert 30      →  (b) Case 1, x=20
  10B____               10B____
 /       \             /       \
5B     _20B_          5B     _20R_
      /     \               /     \
     15R   25R_            15B   25B_
               \                     \
              30R                   30R
```

- **Final:** 10 (black) has children 5 (black) and 20 (red); 20 has children 15 (black) and 25 (black); 25 has a right child 30 (red). bh(root) = 2.
- Cases used: Right-Right (mirror Case 3), Case 1 up to the root, Right-Left (mirror Case 2 → mirror Case 3), Case 1.

#### (e) D13-S9: build the deletion tree from 49, 28, 58, 14, 30, 52, 67, 63, 75, 79 ✅

- **Insert 49** — BST-insert as root (red).
  - 49 is the root → colour it BLACK.
```
(a) insert 49  →  (b) root 49 -> black
49R               49B
```

- **Insert 28** — BST-insert as left child of 49 (red). Parent 49 is BLACK → no violation, done.
- **Insert 58** — BST-insert as right child of 49 (red). Parent 49 is BLACK → no violation, done.
```
insert 28  →  insert 58
  _49B          _49B_
 /             /     \
28R           28R   58R
```

- **Insert 14** — BST-insert as left child of 28 (red).
  - Parent 28 RED, uncle 58 RED → **Case 1 (recolour)**: 28 and 58 → BLACK, grandparent 49 → RED; new x = 49.
  - 49 is the root → colour it BLACK.
```
(a) insert 14  →  (b) Case 1, x=49  →  (c) root 49 -> black
     _49B_             _49R_                _49B_
    /     \           /     \              /     \
  _28R   58R        _28B   58B           _28B   58B
 /                 /                    /
14R               14R                  14R
```

- **Insert 30** — BST-insert as right child of 28 (red). Parent 28 is BLACK → no violation, done.
- **Insert 52** — BST-insert as left child of 58 (red). Parent 58 is BLACK → no violation, done.
- **Insert 67** — BST-insert as right child of 58 (red). Parent 58 is BLACK → no violation, done.
```
insert 30        →  insert 52           →  insert 67
     ____49B_            ____49B____            ____49B____
    /        \          /           \          /           \
  _28B_     58B       _28B_       _58B       _28B_       _58B_
 /     \             /     \     /          /     \     /     \
14R   30R           14R   30R   52R        14R   30R   52R   67R
```

- **Insert 63** — BST-insert as left child of 67 (red).
  - Parent 67 RED, uncle 52 RED → **Case 1 (recolour)**: 67 and 52 → BLACK, grandparent 58 → RED; new x = 58.
  - Parent 49 is BLACK → no violation, done.
```
(a) insert 63             →  (b) Case 1, x=58
     ____49B____                  ____49B____
    /           \                /           \
  _28B_       _58B____         _28B_       _58R____
 /     \     /        \       /     \     /        \
14R   30R   52R     _67R     14R   30R   52B     _67B
                   /                            /
                  63R                          63R
```

- **Insert 75** — BST-insert as right child of 67 (red). Parent 67 is BLACK → no violation, done.
```
insert 75
     ____49B____
    /           \
  _28B_       _58R____
 /     \     /        \
14R   30R   52B     _67B_
                   /     \
                  63R   75R
```

- **Insert 79** — BST-insert as right child of 75 (red).
  - Parent 75 RED, uncle 63 RED → **Case 1 (recolour)**: 75 and 63 → BLACK, grandparent 67 → RED; new x = 67.
  - 67 is RIGHT child of 58, 58 is RIGHT child of 49, uncle 28 BLACK → **mirror Case 3 (Right-Right)**: anticlockwise (left) rotation at grandparent 49; exchange colours of 49 and 58.
```
(a) insert 79                   →  (b) Case 1, x=67
     ____49B____                        ____49B____
    /           \                      /           \
  _28B_       _58R____               _28B_       _58R____
 /     \     /        \             /     \     /        \
14R   30R   52B     _67B_          14R   30R   52B     _67R_
                   /     \                            /     \
                  63R   75R_                         63B   75B_
                            \                                  \
                           79R                                79R

(c) mirror Case 3: rotL(49)
           ____58B____
          /           \
     ____49R_       _67R_
    /        \     /     \
  _28B_     52B   63B   75B_
 /     \                    \
14R   30R                  79R
```

- The final tree matches the professor's hand-drawn tree on D13-S10 exactly.

### 5.4 BST deletion practice on the D13-S7 tree ✅
- Using the class algorithm [D13-S6] with the in-order predecessor. Each deletion starts from the original S7 tree:
  - (a) **delete 10**: a leaf, simply removed [S3];
  - (b) **delete 54**: one child (59), which takes 54's place as 45's right child [S4];
  - (c) **delete 39**: two children. The predecessor is 36 (go left to 27, then right to 29, then right to 36). Copy 36 into the root, then remove the old 36 leaf [S5, S6];
  - (d) **delete 27**: two children. The predecessor is 21 (left to 18, then right to 21). Copy 21 up; the old 21 node has one child (19), which takes its place [S4].

```
(a) delete 10 (leaf)               (b) delete 54 (one child: 59)
         ______39___                          ______39___
        /           \                        /           \
   ____27___       45_                  ____27___       45_
  /         \     /   \                /         \     /   \
 18___     29_   40  54_            __18___     29_   40  59___
/     \   /   \         \          /       \   /   \           \
9    21  28  36        59___       9_     21  28  36          65
    /                       \        \   /                   /
   19                      65       10  19                  60
                          /
                         60
```

```
(c) delete 39 (two children -> 36)      (d) delete 27 (two children -> 21)
           ____36___                             ______39___
          /         \                           /           \
     ____27___     45_                       __21___       45_
    /         \   /   \                     /       \     /   \
 __18___     29  40  54_                 __18_     29_   40  54_
/       \   /           \               /     \   /   \         \
9_     21  28          59___            9_   19  28  36        59___
  \   /                     \             \                         \
 10  19                    65            10                        65
                          /                                       /
                         60                                      60
```

### 5.5 RB deletion — the three class exercises (full solutions) ⭐⭐
- Method: Step 1 BST delete using the **in-order predecessor**, as in the class algorithm [D13-S6]; then the Step 2 cases of D13-S8, checked in the slide's order.
- The **successor** version is given after each example, because D13-S5 allows either. Know which one you are using in the exam and say so.
- In the pictures, when a two-child node takes its predecessor's key, the key appears twice for a moment, as on D13-S5 step 3. The messages call the node that received the copy "k (was old key)".

#### Example A — D13-S9 to S12: delete 52, 28, 79, 75, 49, 30, 14
- Starting tree (built in §5.3 (e), drawn on D13-S10):

```
           ____58B____
          /           \
     ____49R_       _67R_
    /        \     /     \
  _28B_     52B   63B   75B_
 /     \                    \
14R   30R                  79R
```

- **Delete 52**
  - 52 is BLACK with RED parent 49, BUT sibling 28 has RED child(ren) [14, 30]: the 'Or' rule would make 28 red over a red child (breaks rule 3), so treat 52 as Double Black and use the Case 3 rules.
  - 52 is BLACK → it is replaced by a Double Black (DB) NIL.
  - DB (a right child of 49); sibling 28 BLACK, far child 14 RED → **Case 3(5)**: swap colours of parent 49 and sibling 28; rotate parent 49 toward DB (right/clockwise); remove DB; far child 14 → BLACK [terminal].
```
(a) 52 -> DB                   →  (b) Case 3(5): rotR(49)
           ___58B____                  _______58B____
          /          \                /              \
     ____49R_      _67R_            _28R____       _67R_
    /        \    /     \          /        \     /     \
  _28B_     DB   63B   75B_       14B     _49B   63B   75B_
 /     \                   \             /                 \
14R   30R                 79R           30R               79R
```

- **Delete 28**
  - 28 has two children → copy in-order predecessor 14 into the node (node keeps colour R); now delete the old 14 node.
  - The old 14 node is BLACK with RED parent 14 (was 28), BUT sibling 49 has RED child(ren) [30]: the 'Or' rule would make 49 red over a red child (breaks rule 3), so treat the old 14 node as Double Black and use the Case 3 rules.
  - The old 14 node is BLACK → it is replaced by a Double Black (DB) NIL.
  - DB (a left child of 14 (was 28)); sibling 49 BLACK, far child NIL BLACK, near child 30 RED → **Case 3(4)**: swap colours of sibling 49 and near child 30; rotate sibling 49 away from DB (right/clockwise); go to **Case 3(5)**.
  - DB (a left child of 14 (was 28)); sibling 30 BLACK, far child 49 RED → **Case 3(5)**: swap colours of parent 14 (was 28) and sibling 30; rotate parent 14 (was 28) toward DB (left/anticlockwise); remove DB; far child 49 → BLACK [terminal].
```
(a) copy 14 up               →  (b) 14 -> DB                →  (c) Case 3(4): rotR(49)
     _______58B____                 _______58B____                 _______58B____
    /              \               /              \               /              \
  _14R____       _67R_            14R____       _67R_            14R_          _67R_
 /        \     /     \          /       \     /     \          /    \        /     \
14B     _49B   63B   75B_       DB     _49B   63B   75B_       DB   30B_     63B   75B_
       /                 \            /                 \               \              \
      30R               79R          30R               79R             49R            79R

(d) Case 3(5): rotL(14)
     ____58B____
    /           \
  _30R_       _67R_
 /     \     /     \
14B   49B   63B   75B_
                      \
                     79R
```

- **Delete 79**
  - Node removed (79) is RED → **Case 1**: just delete it [terminal].
```
(a) Case 1
     ____58B____
    /           \
  _30R_       _67R_
 /     \     /     \
14B   49B   63B   75B
```

- **Delete 75**
  - 75 is BLACK with RED parent 67; sibling 63 is BLACK with two BLACK children → **Case 2 'Or' rule**: delete 75, swap colours of parent 67 and sibling 63 [terminal]  (same result as **Case 3(3)** with a red parent).
```
(a) 'Or' rule
     ____58B____
    /           \
  _30R_       _67B
 /     \     /
14B   49B   63R
```

- **Delete 49**
  - 49 is BLACK with RED parent 30; sibling 14 is BLACK with two BLACK children → **Case 2 'Or' rule**: delete 49, swap colours of parent 30 and sibling 14 [terminal]  (same result as **Case 3(3)** with a red parent).
```
(a) 'Or' rule
     _58B____
    /        \
  _30B     _67B
 /        /
14R      63R
```

- **Delete 30**
  - Node removed (30) is BLACK with RED child 14 → **Case 2**: replace it by 14 and colour 14 BLACK [terminal].
```
(a) Case 2
  _58B____
 /        \
14B     _67B
       /
      63R
```

- **Delete 14**
  - 14 is BLACK → it is replaced by a Double Black (DB) NIL.
  - DB (a left child of 58); sibling 67 BLACK, far child NIL BLACK, near child 63 RED → **Case 3(4)**: swap colours of sibling 67 and near child 63; rotate sibling 67 away from DB (right/clockwise); go to **Case 3(5)**.
  - DB (a left child of 58); sibling 63 BLACK, far child 67 RED → **Case 3(5)**: swap colours of parent 58 and sibling 63; rotate parent 58 toward DB (left/anticlockwise); remove DB; far child 67 → BLACK [terminal].
```
(a) 14 -> DB  →  (b) Case 3(4): rotR(67)  →  (c) Case 3(5): rotL(58)
  58B____          58B_                        _63B_
 /       \        /    \                      /     \
DB     _67B      DB   63B_                   58B   67B
      /                   \
     63R                 67R
```

- **Summary (predecessor):**

  | Delete | Node actually removed | Situation | Case(s) |
  |---|---|---|---|
  | 52 | 52, black leaf | parent 49 red, but sibling 28 has red children 14 and 30, so the "Or" rule is unsafe; DB is a right child and the far child 14 is red | 3(5) |
  | 28 | two children → 14 copied up; old 14, black leaf | parent red, but sibling 49 has a red child 30; DB is a left child: far child NIL (black), near child 30 red | 3(4) → 3(5) |
  | 79 | 79, red leaf | — | 1 |
  | 75 | 75, black leaf | parent 67 red, sibling 63 black with two NIL children | "Or" rule (= 3(3)) |
  | 49 | 49, black leaf | parent 30 red, sibling 14 black with two NIL children | "Or" rule (= 3(3)) |
  | 30 | 30, black with red child 14 | — | 2 |
  | 14 | 14, black leaf | parent 58 black; sibling 67 black: far child NIL, near child 63 red | 3(4) → 3(5) |

- **Final tree:** 63 (black) with children 58 (black) and 67 (black). ✅
- **With the successor instead:** only "delete 28" changes. Its successor 30 is a red leaf, so 30 is copied up and the old 30 is removed by Case 1. The tree after that step is the same as above (30 red over 14 and 49, both black), so every later step and the final tree are identical. ✅

#### Example B — D13-S13 to S15: delete 30, 45, 10, 12, 35
- Starting tree (⚠️ not a valid RB tree: rule 4 fails at 10, see [D13-S13]):

```
           _____________20B________________
          /                                \
        _11R_______             __________40B_
       /           \           /              \
    __10B     ____15B_       _30R____        45B
   /         /        \     /        \
  5R_       12B_     18B   28B     _35B_
 /   \          \                 /     \
2B  6B         13R               31R   38R
```

- **Delete 30**
  - 30 has two children → copy in-order predecessor 28 into the node (node keeps colour R); now delete the old 28 node.
  - The old 28 node is BLACK with RED parent 28 (was 30), BUT sibling 35 has RED child(ren) [31, 38]: the 'Or' rule would make 35 red over a red child (breaks rule 3), so treat the old 28 node as Double Black and use the Case 3 rules.
  - The old 28 node is BLACK → it is replaced by a Double Black (DB) NIL.
  - DB (a left child of 28 (was 30)); sibling 35 BLACK, far child 38 RED → **Case 3(5)**: swap colours of parent 28 (was 30) and sibling 35; rotate parent 28 (was 30) toward DB (left/anticlockwise); remove DB; far child 38 → BLACK [terminal].
  - ⚠️ The flaw inherited from the slide's tree is still there: rule 4 fails at 10 (below 10 the left paths have 1 black node, the right path has 0). Deleting 10 later repairs it.
```
(a) copy 28 up
           _____________20B________________
          /                                \
        _11R_______             __________40B_
       /           \           /              \
    __10B     ____15B_       _28R____        45B
   /         /        \     /        \
  5R_       12B_     18B   28B     _35B_
 /   \          \                 /     \
2B  6B         13R               31R   38R

(b) 28 -> DB                                     →  (c) Case 3(5): rotL(28)
           _____________20B_______________                     _____________20B_____________
          /                               \                   /                             \
        _11R_______            __________40B_               _11R_______                ____40B_
       /           \          /              \             /           \              /        \
    __10B     ____15B_       28R____        45B         __10B     ____15B_       ____35R_     45B
   /         /        \     /       \                  /         /        \     /        \
  5R_       12B_     18B   DB     _35B_               5R_       12B_     18B   28B_     38B
 /   \          \                /     \             /   \          \              \
2B  6B         13R              31R   38R           2B  6B         13R            31R
```

- **Delete 45**
  - 45 is BLACK → it is replaced by a Double Black (DB) NIL.
  - DB (a right child of 40); sibling 35 is RED (parent 40 BLACK) → **Case 3(2)**: swap colours of parent 40 and sibling 35; rotate parent 40 toward DB (right/clockwise); reapply cases.
  - DB (a right child of 40); sibling 38 BLACK with both children BLACK → **Case 3(3)**: remove DB, add extra black to parent 40 (RED → BLACK), make sibling 38 RED.
  - ⚠️ The flaw inherited from the slide's tree is still there: rule 4 fails at 10 (below 10 the left paths have 1 black node, the right path has 0). Deleting 10 later repairs it.
```
(a) 45 -> DB                                  →  (b) Case 3(2): rotR(40)
           _____________20B_____________                    _____________20B_______
          /                             \                  /                       \
        _11R_______                ____40B_              _11R_______          ____35B____
       /           \              /        \            /           \        /           \
    __10B     ____15B_       ____35R_     DB         __10B     ____15B_     28B_       _40R_
   /         /        \     /        \              /         /        \        \     /     \
  5R_       12B_     18B   28B_     38B            5R_       12B_     18B      31R   38B   DB
 /   \          \              \                  /   \          \
2B  6B         13R            31R                2B  6B         13R

(c) Case 3(3)
           _____________20B_______
          /                       \
        _11R_______          ____35B____
       /           \        /           \
    __10B     ____15B_     28B_       _40B
   /         /        \        \     /
  5R_       12B_     18B      31R   38R
 /   \          \
2B  6B         13R
```

- **Delete 10**
  - Node removed (10) is BLACK with RED child 5 → **Case 2**: replace it by 5 and colour 5 BLACK [terminal].
```
(a) Case 2
        _____________20B_______
       /                       \
    __11R_______          ____35B____
   /            \        /           \
  5B_      ____15B_     28B_       _40B
 /   \    /        \        \     /
2B  6B   12B_     18B      31R   38R
             \
            13R
```

- **Delete 12**
  - Node removed (12) is BLACK with RED child 13 → **Case 2**: replace it by 13 and colour 13 BLACK [terminal].
```
(a) Case 2
        __________20B_______
       /                    \
    __11R____          ____35B____
   /         \        /           \
  5B_      _15B_     28B_       _40B
 /   \    /     \        \     /
2B  6B   13B   18B      31R   38R
```

- **Delete 35**
  - 35 has two children → copy in-order predecessor 31 into the node (node keeps colour B); now delete the old 31 node.
  - Node removed (the old 31 node) is RED → **Case 1**: just delete it [terminal].
```
(a) copy 31 up                        →  (b) Case 1
        __________20B_______                     __________20B____
       /                    \                   /                 \
    __11R____          ____31B____           __11R____          _31B____
   /         \        /           \         /         \        /        \
  5B_      _15B_     28B_       _40B       5B_      _15B_     28B     _40B
 /   \    /     \        \     /          /   \    /     \           /
2B  6B   13B   18B      31R   38R        2B  6B   13B   18B         38R
```

- **Summary (predecessor):**

  | Delete | Node actually removed | Situation | Case(s) |
  |---|---|---|---|
  | 30 | two children → 28 copied up; old 28, black leaf | parent red, but sibling 35 has red children 31 and 38; DB is a left child, far child 38 red | 3(5) |
  | 45 | 45, black leaf | parent 40 black, sibling 35 red; after the rotation the new sibling 38 is black with NIL children and the parent 40 is red | 3(2) → 3(3) |
  | 10 | 10, black with red child 5 | — | 2 (also repairs the slide's flaw) |
  | 12 | 12, black with red child 13 | — | 2 |
  | 35 | two children → 31 copied up; old 31, red leaf | — | 1 |

- **Final tree (predecessor):** 20 (B); left: 11 (R) with 5 (B) [children 2 (B), 6 (B)] and 15 (B) [children 13 (B), 18 (B)]; right: 31 (B) with 28 (B) and 40 (B) [left child 38 (R)]. ✅ Valid, bh = 3.
- **With the successor instead:** the path differs a lot, and it is a good drill of the 3(2) → 3(4) → 3(5) chain:

- **Delete 30**
  - 30 has two children → copy in-order successor 31 into the node (node keeps colour R); now delete the old 31 node.
  - Node removed (the old 31 node) is RED → **Case 1**: just delete it [terminal].
  - ⚠️ The flaw inherited from the slide's tree is still there: rule 4 fails at 10 (below 10 the left paths have 1 black node, the right path has 0). Deleting 10 later repairs it.
```
(a) copy 31 up                                    →  (b) Case 1
           _____________20B________________                     _____________20B_____________
          /                                \                   /                             \
        _11R_______             __________40B_               _11R_______             _______40B_
       /           \           /              \             /           \           /           \
    __10B     ____15B_       _31R____        45B         __10B     ____15B_       _31R_        45B
   /         /        \     /        \                  /         /        \     /     \
  5R_       12B_     18B   28B     _35B_               5R_       12B_     18B   28B   35B_
 /   \          \                 /     \             /   \          \                    \
2B  6B         13R               31R   38R           2B  6B         13R                  38R
```

- **Delete 45**
  - 45 is BLACK → it is replaced by a Double Black (DB) NIL.
  - DB (a right child of 40); sibling 31 is RED (parent 40 BLACK) → **Case 3(2)**: swap colours of parent 40 and sibling 31; rotate parent 40 toward DB (right/clockwise); reapply cases.
  - DB (a right child of 40); sibling 35 BLACK, far child NIL BLACK, near child 38 RED → **Case 3(4)**: swap colours of sibling 35 and near child 38; rotate sibling 35 away from DB (left/anticlockwise); go to **Case 3(5)**.
  - DB (a right child of 40); sibling 38 BLACK, far child 35 RED → **Case 3(5)**: swap colours of parent 40 and sibling 38; rotate parent 40 toward DB (right/clockwise); remove DB; far child 35 → BLACK [terminal].
  - ⚠️ The flaw inherited from the slide's tree is still there: rule 4 fails at 10 (below 10 the left paths have 1 black node, the right path has 0). Deleting 10 later repairs it.
```
(a) 45 -> DB                                  →  (b) Case 3(2): rotR(40)
           _____________20B_____________                    _____________20B____
          /                             \                  /                    \
        _11R_______             _______40B_              _11R_______          _31B_______
       /           \           /           \            /           \        /           \
    __10B     ____15B_       _31R_        DB         __10B     ____15B_     28B     ____40R_
   /         /        \     /     \                 /         /        \           /        \
  5R_       12B_     18B   28B   35B_              5R_       12B_     18B         35B_     DB
 /   \          \                    \            /   \          \                    \
2B  6B         13R                  38R          2B  6B         13R                  38R

(c) Case 3(4): rotL(35)                       →  (d) Case 3(5): rotR(40)
           _____________20B____                             _____________20B____
          /                    \                           /                    \
        _11R_______          _31B_______                 _11R_______          _31B____
       /           \        /           \               /           \        /        \
    __10B     ____15B_     28B        _40R_          __10B     ____15B_     28B     _38R_
   /         /        \              /     \        /         /        \           /     \
  5R_       12B_     18B           _38B   DB       5R_       12B_     18B         35B   40B
 /   \          \                 /               /   \          \
2B  6B         13R               35R             2B  6B         13R
```

- **Delete 10**
  - Node removed (10) is BLACK with RED child 5 → **Case 2**: replace it by 5 and colour 5 BLACK [terminal].
```
(a) Case 2
        _____________20B____
       /                    \
    __11R_______          _31B____
   /            \        /        \
  5B_      ____15B_     28B     _38R_
 /   \    /        \           /     \
2B  6B   12B_     18B         35B   40B
             \
            13R
```

- **Delete 12**
  - Node removed (12) is BLACK with RED child 13 → **Case 2**: replace it by 13 and colour 13 BLACK [terminal].
```
(a) Case 2
        __________20B____
       /                 \
    __11R____          _31B____
   /         \        /        \
  5B_      _15B_     28B     _38R_
 /   \    /     \           /     \
2B  6B   13B   18B         35B   40B
```

- **Delete 35**
  - 35 is BLACK with RED parent 38; sibling 40 is BLACK with two BLACK children → **Case 2 'Or' rule**: delete 35, swap colours of parent 38 and sibling 40 [terminal]  (same result as **Case 3(3)** with a red parent).
```
(a) 'Or' rule
        __________20B____
       /                 \
    __11R____          _31B_
   /         \        /     \
  5B_      _15B_     28B   38B_
 /   \    /     \              \
2B  6B   13B   18B            40R
```

- Final tree (successor): the same as the predecessor version, except that the right subtree is 31 (B) with 28 (B) and 38 (B), and 38 has a right child 40 (R). ✅

#### Example C — D13-S16 to S18: delete 9, 3, 4, 10, 13, 2
- Starting tree (the final tree of D12-S24):

```
    ____6B___
   /         \
  3R___     9R_
 /     \   /   \
2B    5B  7B  10B_
     /            \
    4R           13R
```

- **Delete 9**
  - 9 has two children → copy in-order predecessor 7 into the node (node keeps colour R); now delete the old 7 node.
  - The old 7 node is BLACK with RED parent 7 (was 9), BUT sibling 10 has RED child(ren) [13]: the 'Or' rule would make 10 red over a red child (breaks rule 3), so treat the old 7 node as Double Black and use the Case 3 rules.
  - The old 7 node is BLACK → it is replaced by a Double Black (DB) NIL.
  - DB (a left child of 7 (was 9)); sibling 10 BLACK, far child 13 RED → **Case 3(5)**: swap colours of parent 7 (was 9) and sibling 10; rotate parent 7 (was 9) toward DB (left/anticlockwise); remove DB; far child 13 → BLACK [terminal].
```
(a) copy 7 up         →  (b) 7 -> DB           →  (c) Case 3(5): rotL(7)
    ____6B___                ____6B___                ____6B___
   /         \              /         \              /         \
  3R___     7R_            3R___     7R_            3R___     10R_
 /     \   /   \          /     \   /   \          /     \   /    \
2B    5B  7B  10B_       2B    5B  DB  10B_       2B    5B  7B   13B
     /            \           /            \           /
    4R           13R         4R           13R         4R
```

- **Delete 3**
  - 3 has two children → copy in-order predecessor 2 into the node (node keeps colour R); now delete the old 2 node.
  - The old 2 node is BLACK with RED parent 2 (was 3), BUT sibling 5 has RED child(ren) [4]: the 'Or' rule would make 5 red over a red child (breaks rule 3), so treat the old 2 node as Double Black and use the Case 3 rules.
  - The old 2 node is BLACK → it is replaced by a Double Black (DB) NIL.
  - DB (a left child of 2 (was 3)); sibling 5 BLACK, far child NIL BLACK, near child 4 RED → **Case 3(4)**: swap colours of sibling 5 and near child 4; rotate sibling 5 away from DB (right/clockwise); go to **Case 3(5)**.
  - DB (a left child of 2 (was 3)); sibling 4 BLACK, far child 5 RED → **Case 3(5)**: swap colours of parent 2 (was 3) and sibling 4; rotate parent 2 (was 3) toward DB (left/anticlockwise); remove DB; far child 5 → BLACK [terminal].
```
(a) copy 2 up       →  (b) 2 -> DB         →  (c) Case 3(4): rotR(5)  →  (d) Case 3(5): rotL(2)
    ____6B___              ____6B___              ____6B___                  __6B___
   /         \            /         \            /         \                /       \
  2R___     10R_         2R___     10R_         2R_       10R_             4R_     10R_
 /     \   /    \       /     \   /    \       /   \     /    \           /   \   /    \
2B    5B  7B   13B     DB    5B  7B   13B     DB  4B_   7B   13B         2B  5B  7B   13B
     /                      /                        \
    4R                     4R                       5R
```

- **Delete 4**
  - 4 has two children → copy in-order predecessor 2 into the node (node keeps colour R); now delete the old 2 node.
  - The old 2 node is BLACK with RED parent 2 (was 4); sibling 5 is BLACK with two BLACK children → **Case 2 'Or' rule**: delete the old 2 node, swap colours of parent 2 (was 4) and sibling 5 [terminal]  (same result as **Case 3(3)** with a red parent).
```
(a) copy 2 up     →  (b) 'Or' rule
    __6B___            __6B___
   /       \          /       \
  2R_     10R_       2B_     10R_
 /   \   /    \         \   /    \
2B  5B  7B   13B       5R  7B   13B
```

- **Delete 10**
  - 10 has two children → copy in-order predecessor 7 into the node (node keeps colour R); now delete the old 7 node.
  - The old 7 node is BLACK with RED parent 7 (was 10); sibling 13 is BLACK with two BLACK children → **Case 2 'Or' rule**: delete the old 7 node, swap colours of parent 7 (was 10) and sibling 13 [terminal]  (same result as **Case 3(3)** with a red parent).
```
(a) copy 7 up  →  (b) 'Or' rule
  __6B___           __6B_
 /       \         /     \
2B_     7R_       2B_   7B_
   \   /   \         \     \
  5R  7B  13B       5R    13R
```

- **Delete 13**
  - Node removed (13) is RED → **Case 1**: just delete it [terminal].
```
(a) Case 1
  __6B_
 /     \
2B_   7B
   \
  5R
```

- **Delete 2**
  - Node removed (2) is BLACK with RED child 5 → **Case 2**: replace it by 5 and colour 5 BLACK [terminal].
```
(a) Case 2
  6B_
 /   \
5B  7B
```

- **Summary (predecessor):**

  | Delete | Node actually removed | Situation | Case(s) |
  |---|---|---|---|
  | 9 | two children → 7 copied up; old 7, black leaf | parent red, but sibling 10 has a red child 13; DB is a left child, far child 13 red | 3(5) |
  | 3 | two children → 2 copied up; old 2, black leaf | parent red, but sibling 5 has a red child 4; DB is a left child: far child NIL (black), near child 4 red | 3(4) → 3(5) |
  | 4 | two children → 2 copied up; old 2, black leaf | parent red, sibling 5 black with NIL children | "Or" rule |
  | 10 | two children → 7 copied up; old 7, black leaf | parent red, sibling 13 black with NIL children | "Or" rule |
  | 13 | 13, red leaf | — | 1 |
  | 2 | 2, black with red child 5 | — | 2 |

- **Final tree:** 6 (black) with children 5 (black) and 7 (black). ✅
- **With the successor instead:** the final tree is the same, 6 (B) with 5 (B) and 7 (B), but the cases differ:

  | Delete | Successor route | Tree after the step |
  |---|---|---|
  | 9 | successor 10 copied up; the old 10 is black with red child 13 → Case 2 | same as the predecessor route: 6B (3R (2B, 5B (4R, –)), 10R (7B, 13B)) |
  | 3 | successor 4 (red leaf) → Case 1 | same as the predecessor route: 6B (4R (2B, 5B), 10R (7B, 13B)) |
  | 4 | successor 5 copied up; old 5 is a black leaf, parent red, sibling 2 black leaf → "Or" rule | 6B (5B (2R, –), 10R (7B, 13B)) |
  | 10 | successor 13 copied up; old 13 is a black leaf, parent red, sibling 7 black leaf → "Or" rule | 6B (5B (2R, –), 13B (7R, –)) |
  | 13 | 13 is black with red child 7 → Case 2 | 6B (5B (2R, –), 7B) |
  | 2 | red leaf → Case 1 | 6B (5B, 7B) |

### 5.6 NEW practice problems in the slides' style (answers verified ✅)
- These are new problems, but they use only the class rules. Try them on paper first, then check against the answers.

**Problems**
- **NEW-I1.** Insert into an empty RB tree: **5, 40, 10, 20, 35, 30**. Name the case at every step and draw the tree after each insertion.
- **NEW-I2.** Insert into an empty RB tree: **10, 20, 30, 40, 50, 60, 70, 80** (sorted input). Name the cases; what happens at the last insertion?
- **NEW-I3.** Insert into an empty RB tree: **40, 20, 60, 10, 30, 25, 35, 33**. Explain the last insertion in detail; it repeats the pattern of D12-S24.
- **NEW-D1.** Start from the RB tree of D13-S19 (drawn below). Delete **5, 15, 20, 18, 10** in this order, using the in-order predecessor for two-child nodes. Name the case(s) for each deletion.

```
       _______33B__________
      /                    \
    _15R____          ____47R____
   /        \        /           \
  10B     _20B     _38B_       _51B
 /       /        /     \     /
5R      18R      36R   39R   49R
```

- **NEW-D2.** Start from your answer to D12-S25 (41, 38, 31, 12, 19, 8), drawn below. Delete **12, 41, 19, 31, 38** in this order (in-order predecessor). Name the case(s) for each deletion.

```
       ____38B_
      /        \
    _19R_     41B
   /     \
  12B   31B
 /
8R
```

| Problem | What it drills |
|---|---|
| NEW-I1 | Right-Left (mirror Case 2 → mirror Case 3); Case 1 up to the root; Left-Right (Case 2 → Case 3); Case 1 that stops |
| NEW-I2 | Right-Right single rotations; Case 1 up to the root; Case 1 that stops; Case 1 followed by a Right-Right rotation higher up |
| NEW-I3 | Case 1 up to the root; Case 1 that stops; Case 1 followed by Left-Right + Left-Left higher up (the D12-S24 pattern) |
| NEW-D1 | Case 1; unsafe "Or" → 3(4) → 3(5); the "Or" rule; Case 2; 3(2) → 3(5) |
| NEW-D2 | Case 2; 3(2) → 3(3) with a red parent; 3(4) → 3(5); 3(3) with a black parent → DB moves up → 3(1); Case 1 |

**Answer NEW-I1 ✅**

- **Insert 5** — BST-insert as root (red).
  - 5 is the root → colour it BLACK.
```
(a) insert 5  →  (b) root 5 -> black
5R               5B
```

- **Insert 40** — BST-insert as right child of 5 (red). Parent 5 is BLACK → no violation, done.
```
insert 40
5B_
   \
  40R
```

- **Insert 10** — BST-insert as left child of 40 (red).
  - Parent 40 RED, uncle NIL BLACK, 10 is LEFT child of 40, 40 is RIGHT child of 5 → **mirror Case 2 (Right-Left)**: clockwise (right) rotation at parent 40; parent 40 becomes new x.
  - 40 is RIGHT child of 10, 10 is RIGHT child of 5, uncle NIL BLACK → **mirror Case 3 (Right-Right)**: anticlockwise (left) rotation at grandparent 5; exchange colours of 5 and 10.
```
(a) insert 10  →  (b) mirror Case 2: rotR(40)  →  (c) mirror Case 3: rotL(5)
5B____            5B_                               10B_
      \              \                             /    \
    _40R            10R_                          5R   40R
   /                    \
  10R                  40R
```

- **Insert 20** — BST-insert as left child of 40 (red).
  - Parent 40 RED, uncle 5 RED → **Case 1 (recolour)**: 40 and 5 → BLACK, grandparent 10 → RED; new x = 10.
  - 10 is the root → colour it BLACK.
```
(a) insert 20  →  (b) Case 1, x=10  →  (c) root 10 -> black
  10B____           10R____              10B____
 /       \         /       \            /       \
5R     _40R       5B     _40B          5B     _40B
      /                 /                    /
     20R               20R                  20R
```

- **Insert 35** — BST-insert as right child of 20 (red).
  - Parent 20 RED, uncle NIL BLACK, 35 is RIGHT child of 20, 20 is LEFT child of 40 → **Case 2 (Left-Right)**: anticlockwise (left) rotation at parent 20; parent 20 becomes new x.
  - 20 is LEFT child of 35, 35 is LEFT child of 40, uncle NIL BLACK → **Case 3 (Left-Left)**: clockwise (right) rotation at grandparent 40; exchange colours of 40 and 35.
```
(a) insert 35   →  (b) Case 2: rotL(20)  →  (c) Case 3: rotR(40)
  10B_______         10B_______               10B____
 /          \       /          \             /       \
5B     ____40B     5B        _40B           5B     _35B_
      /                     /                     /     \
     20R_                 _35R                   20R   40R
         \               /
        35R             20R
```

- **Insert 30** — BST-insert as right child of 20 (red).
  - Parent 20 RED, uncle 40 RED → **Case 1 (recolour)**: 20 and 40 → BLACK, grandparent 35 → RED; new x = 35.
  - Parent 10 is BLACK → no violation, done.
```
(a) insert 30      →  (b) Case 1, x=35
  10B_______            10B_______
 /          \          /          \
5B     ____35B_       5B     ____35R_
      /        \            /        \
     20R_     40R          20B_     40B
         \                     \
        30R                   30R
```

- **Final:** 10 (B) with children 5 (B) and 35 (R); 35 has children 20 (B) and 40 (B); 20 has a right child 30 (R). bh(root) = 2.

**Answer NEW-I2 ✅**

- **Insert 10** — BST-insert as root (red).
  - 10 is the root → colour it BLACK.
```
(a) insert 10  →  (b) root 10 -> black
10R               10B
```

- **Insert 20** — BST-insert as right child of 10 (red). Parent 10 is BLACK → no violation, done.
```
insert 20
10B_
    \
   20R
```

- **Insert 30** — BST-insert as right child of 20 (red).
  - 30 is RIGHT child of 20, 20 is RIGHT child of 10, uncle NIL BLACK → **mirror Case 3 (Right-Right)**: anticlockwise (left) rotation at grandparent 10; exchange colours of 10 and 20.
```
(a) insert 30  →  (b) mirror Case 3: rotL(10)
10B_                _20B_
    \              /     \
   20R_           10R   30R
       \
      30R
```

- **Insert 40** — BST-insert as right child of 30 (red).
  - Parent 30 RED, uncle 10 RED → **Case 1 (recolour)**: 30 and 10 → BLACK, grandparent 20 → RED; new x = 20.
  - 20 is the root → colour it BLACK.
```
(a) insert 40  →  (b) Case 1, x=20  →  (c) root 20 -> black
  _20B_             _20R_                _20B_
 /     \           /     \              /     \
10R   30R_        10B   30B_           10B   30B_
          \                 \                    \
         40R               40R                  40R
```

- **Insert 50** — BST-insert as right child of 40 (red).
  - 50 is RIGHT child of 40, 40 is RIGHT child of 30, uncle NIL BLACK → **mirror Case 3 (Right-Right)**: anticlockwise (left) rotation at grandparent 30; exchange colours of 30 and 40.
```
(a) insert 50    →  (b) mirror Case 3: rotL(30)
  _20B_               _20B____
 /     \             /        \
10B   30B_          10B     _40B_
          \                /     \
         40R_             30R   50R
             \
            50R
```

- **Insert 60** — BST-insert as right child of 50 (red).
  - Parent 50 RED, uncle 30 RED → **Case 1 (recolour)**: 50 and 30 → BLACK, grandparent 40 → RED; new x = 40.
  - Parent 20 is BLACK → no violation, done.
```
(a) insert 60       →  (b) Case 1, x=40
  _20B____               _20B____
 /        \             /        \
10B     _40B_          10B     _40R_
       /     \                /     \
      30R   50R_             30B   50B_
                \                      \
               60R                    60R
```

- **Insert 70** — BST-insert as right child of 60 (red).
  - 70 is RIGHT child of 60, 60 is RIGHT child of 50, uncle NIL BLACK → **mirror Case 3 (Right-Right)**: anticlockwise (left) rotation at grandparent 50; exchange colours of 50 and 60.
```
(a) insert 70          →  (b) mirror Case 3: rotL(50)
  _20B____                  _20B____
 /        \                /        \
10B     _40R_             10B     _40R____
       /     \                   /        \
      30B   50B_                30B     _60B_
                \                      /     \
               60R_                   50R   70R
                   \
                  70R
```

- **Insert 80** — BST-insert as right child of 70 (red).
  - Parent 70 RED, uncle 50 RED → **Case 1 (recolour)**: 70 and 50 → BLACK, grandparent 60 → RED; new x = 60.
  - 60 is RIGHT child of 40, 40 is RIGHT child of 20, uncle 10 BLACK → **mirror Case 3 (Right-Right)**: anticlockwise (left) rotation at grandparent 20; exchange colours of 20 and 40.
```
(a) insert 80             →  (b) Case 1, x=60          →  (c) mirror Case 3: rotL(20)
  _20B____                     _20B____                        ____40B____
 /        \                   /        \                      /           \
10B     _40R____             10B     _40R____               _20R_       _60R_
       /        \                   /        \             /     \     /     \
      30B     _60B_                30B     _60R_          10B   30B   50B   70B_
             /     \                      /     \                               \
            50R   70R_                   50B   70B_                            80R
                      \                            \
                     80R                          80R
```

- **Final:** 40 (B); 20 (R) with 10 (B) and 30 (B); 60 (R) with 50 (B) and 70 (B); 70 has a right child 80 (R). bh(root) = 2.
- Insert 80 is the interesting step. Case 1 pushes red up to 60, whose parent 40 is red; the uncle 10 is black and 60–40–20 is a straight Right-Right line, so the repair ends with a rotation at the **root** (rotL(20)).

**Answer NEW-I3 ✅**

- **Insert 40** — BST-insert as root (red).
  - 40 is the root → colour it BLACK.
```
(a) insert 40  →  (b) root 40 -> black
40R               40B
```

- **Insert 20** — BST-insert as left child of 40 (red). Parent 40 is BLACK → no violation, done.
- **Insert 60** — BST-insert as right child of 40 (red). Parent 40 is BLACK → no violation, done.
```
insert 20  →  insert 60
  _40B          _40B_
 /             /     \
20R           20R   60R
```

- **Insert 10** — BST-insert as left child of 20 (red).
  - Parent 20 RED, uncle 60 RED → **Case 1 (recolour)**: 20 and 60 → BLACK, grandparent 40 → RED; new x = 40.
  - 40 is the root → colour it BLACK.
```
(a) insert 10  →  (b) Case 1, x=40  →  (c) root 40 -> black
     _40B_             _40R_                _40B_
    /     \           /     \              /     \
  _20R   60R        _20B   60B           _20B   60B
 /                 /                    /
10R               10R                  10R
```

- **Insert 30** — BST-insert as right child of 20 (red). Parent 20 is BLACK → no violation, done.
```
insert 30
     ____40B_
    /        \
  _20B_     60B
 /     \
10R   30R
```

- **Insert 25** — BST-insert as left child of 30 (red).
  - Parent 30 RED, uncle 10 RED → **Case 1 (recolour)**: 30 and 10 → BLACK, grandparent 20 → RED; new x = 20.
  - Parent 40 is BLACK → no violation, done.
```
(a) insert 25       →  (b) Case 1, x=20
     _______40B_            _______40B_
    /           \          /           \
  _20B____     60B       _20R____     60B
 /        \             /        \
10R     _30R           10B     _30B
       /                      /
      25R                    25R
```

- **Insert 35** — BST-insert as right child of 30 (red). Parent 30 is BLACK → no violation, done.
```
insert 35
     __________40B_
    /              \
  _20R____        60B
 /        \
10B     _30B_
       /     \
      25R   35R
```

- **Insert 33** — BST-insert as left child of 35 (red).
  - Parent 35 RED, uncle 25 RED → **Case 1 (recolour)**: 35 and 25 → BLACK, grandparent 30 → RED; new x = 30.
  - Parent 20 RED, uncle 60 BLACK, 30 is RIGHT child of 20, 20 is LEFT child of 40 → **Case 2 (Left-Right)**: anticlockwise (left) rotation at parent 20; parent 20 becomes new x.
  - 20 is LEFT child of 30, 30 is LEFT child of 40, uncle 60 BLACK → **Case 3 (Left-Left)**: clockwise (right) rotation at grandparent 40; exchange colours of 40 and 30.
```
(a) insert 33             →  (b) Case 1, x=30          →  (c) Case 2: rotL(20)
     _____________40B_            _____________40B_                  _______40B_
    /                 \          /                 \                /           \
  _20R____           60B       _20R____           60B          ____30R____     60B
 /        \                   /        \                      /           \
10B     _30B____             10B     _30R____               _20R_       _35B
       /        \                   /        \             /     \     /
      25R     _35R                 25B     _35B           10B   25B   33R
             /                            /
            33R                          33R

(d) Case 3: rotR(40)
     ____30B_______
    /              \
  _20R_          _40R_
 /     \        /     \
10B   25B     _35B   60B
             /
            33R
```

- **Final:** 30 (B); 20 (R) with 10 (B) and 25 (B); 40 (R) with 35 (B) and 60 (B); 35 has a left child 33 (R). bh(root) = 2.
- Insert 33 follows exactly the D12-S24 pattern:
  - Case 1 at the bottom moves x up to 30;
  - 30–20–40 forms a Left-Right bend with a black uncle (60), so Case 2 rotates at 20;
  - Case 3 then rotates at 40 and swaps colours.

**Answer NEW-D1 ✅**

- **Delete 5**
  - Node removed (5) is RED → **Case 1**: just delete it [terminal].
```
(a) Case 1
     _______33B__________
    /                    \
  _15R____          ____47R____
 /        \        /           \
10B     _20B     _38B_       _51B
       /        /     \     /
      18R      36R   39R   49R
```

- **Delete 15**
  - 15 has two children → copy in-order predecessor 10 into the node (node keeps colour R); now delete the old 10 node.
  - The old 10 node is BLACK with RED parent 10 (was 15), BUT sibling 20 has RED child(ren) [18]: the 'Or' rule would make 20 red over a red child (breaks rule 3), so treat the old 10 node as Double Black and use the Case 3 rules.
  - The old 10 node is BLACK → it is replaced by a Double Black (DB) NIL.
  - DB (a left child of 10 (was 15)); sibling 20 BLACK, far child NIL BLACK, near child 18 RED → **Case 3(4)**: swap colours of sibling 20 and near child 18; rotate sibling 20 away from DB (right/clockwise); go to **Case 3(5)**.
  - DB (a left child of 10 (was 15)); sibling 18 BLACK, far child 20 RED → **Case 3(5)**: swap colours of parent 10 (was 15) and sibling 18; rotate parent 10 (was 15) toward DB (left/anticlockwise); remove DB; far child 20 → BLACK [terminal].
```
(a) copy 10 up                     →  (b) 10 -> DB
     _______33B__________                 _______33B__________
    /                    \               /                    \
  _10R____          ____47R____         10R____          ____47R____
 /        \        /           \       /       \        /           \
10B     _20B     _38B_       _51B     DB     _20B     _38B_       _51B
       /        /     \     /               /        /     \     /
      18R      36R   39R   49R             18R      36R   39R   49R

(c) Case 3(4): rotR(20)           →  (d) Case 3(5): rotL(10)
    _______33B__________                  ____33B__________
   /                    \                /                 \
  10R_             ____47R____         _18R_          ____47R____
 /    \           /           \       /     \        /           \
DB   18B_       _38B_       _51B     10B   20B     _38B_       _51B
         \     /     \     /                      /     \     /
        20R   36R   39R   49R                    36R   39R   49R
```

- **Delete 20**
  - 20 is BLACK with RED parent 18; sibling 10 is BLACK with two BLACK children → **Case 2 'Or' rule**: delete 20, swap colours of parent 18 and sibling 10 [terminal]  (same result as **Case 3(3)** with a red parent).
```
(a) 'Or' rule
     _33B__________
    /              \
  _18B        ____47R____
 /           /           \
10R        _38B_       _51B
          /     \     /
         36R   39R   49R
```

- **Delete 18**
  - Node removed (18) is BLACK with RED child 10 → **Case 2**: replace it by 10 and colour 10 BLACK [terminal].
```
(a) Case 2
  _33B__________
 /              \
10B        ____47R____
          /           \
        _38B_       _51B
       /     \     /
      36R   39R   49R
```

- **Delete 10**
  - 10 is BLACK → it is replaced by a Double Black (DB) NIL.
  - DB (a left child of 33); sibling 47 is RED (parent 33 BLACK) → **Case 3(2)**: swap colours of parent 33 and sibling 47; rotate parent 33 toward DB (left/anticlockwise); reapply cases.
  - DB (a left child of 33); sibling 38 BLACK, far child 39 RED → **Case 3(5)**: swap colours of parent 33 and sibling 38; rotate parent 33 toward DB (left/anticlockwise); remove DB; far child 39 → BLACK [terminal].
```
(a) 10 -> DB             →  (b) Case 3(2): rotL(33)  →  (c) Case 3(5): rotL(33)
  33B__________                 __________47B____               ____47B____
 /             \               /                 \             /           \
DB        ____47R____         33R____          _51B       ____38R_       _51B
         /           \       /       \        /          /        \     /
       _38B_       _51B     DB     _38B_     49R        33B_     39B   49R
      /     \     /               /     \                   \
     36R   39R   49R             36R   39R                 36R
```

- **Final:** 47 (B); 38 (R) with 33 (B) and 39 (B), where 33 has a right child 36 (R); 51 (B) with a left child 49 (R). bh(root) = 2.
- With the successor instead: "delete 15" copies up 18, a red leaf, so it is just Case 1. The tree after that step is the same, so all later steps and the final tree are identical.

**Answer NEW-D2 ✅**

- **Delete 12**
  - Node removed (12) is BLACK with RED child 8 → **Case 2**: replace it by 8 and colour 8 BLACK [terminal].
```
(a) Case 2
    ____38B_
   /        \
  19R_     41B
 /    \
8B   31B
```

- **Delete 41**
  - 41 is BLACK → it is replaced by a Double Black (DB) NIL.
  - DB (a right child of 38); sibling 19 is RED (parent 38 BLACK) → **Case 3(2)**: swap colours of parent 38 and sibling 19; rotate parent 38 toward DB (right/clockwise); reapply cases.
  - DB (a right child of 38); sibling 31 BLACK with both children BLACK → **Case 3(3)**: remove DB, add extra black to parent 38 (RED → BLACK), make sibling 31 RED.
```
(a) 41 -> DB   →  (b) Case 3(2): rotR(38)  →  (c) Case 3(3)
    ____38B_        19B____                     19B____
   /        \      /       \                   /       \
  19R_     DB     8B     _38R_                8B     _38B
 /    \                 /     \                     /
8B   31B               31B   DB                    31R
```

- **Delete 19**
  - 19 has two children → copy in-order predecessor 8 into the node (node keeps colour B); now delete the old 8 node.
  - The old 8 node is BLACK → it is replaced by a Double Black (DB) NIL.
  - DB (a left child of 8 (was 19)); sibling 38 BLACK, far child NIL BLACK, near child 31 RED → **Case 3(4)**: swap colours of sibling 38 and near child 31; rotate sibling 38 away from DB (right/clockwise); go to **Case 3(5)**.
  - DB (a left child of 8 (was 19)); sibling 31 BLACK, far child 38 RED → **Case 3(5)**: swap colours of parent 8 (was 19) and sibling 31; rotate parent 8 (was 19) toward DB (left/anticlockwise); remove DB; far child 38 → BLACK [terminal].
```
(a) copy 8 up  →  (b) 8 -> DB  →  (c) Case 3(4): rotR(38)  →  (d) Case 3(5): rotL(8)
  8B____            8B____          8B_                         31B_
 /      \          /      \        /   \                       /    \
8B    _38B        DB    _38B      DB  31B_                    8B   38B
     /                 /                  \
    31R               31R                38R
```

- **Delete 31**
  - 31 has two children → copy in-order predecessor 8 into the node (node keeps colour B); now delete the old 8 node.
  - The old 8 node is BLACK → it is replaced by a Double Black (DB) NIL.
  - DB (a left child of 8 (was 31)); sibling 38 BLACK with both children BLACK → **Case 3(3)**: remove DB, add extra black to parent 8 (was 31) (BLACK → DOUBLE BLACK), make sibling 38 RED.
  - DB(8) is the root → **Case 3(1)**: remove DB (root becomes single black) [terminal].
```
(a) copy 8 up  →  (b) 8 -> DB  →  (c) Case 3(3): DB up  →  (d) Case 3(1)
  8B_               8B_           8DB_                     8B_
 /   \             /   \              \                       \
8B  38B           DB  38B            38R                     38R
```

- **Delete 38**
  - Node removed (38) is RED → **Case 1**: just delete it [terminal].
```
(a) Case 1
8B
```

- **Final:** the single black node 8.
- With the successor instead:
  - "delete 19" copies up 31, a red leaf (Case 1); the tree is the same as above;
  - "delete 31" copies up 38; the old 38 is a black leaf whose sibling 8 is black with NIL children, so 3(3) pushes the DB to the root and 3(1) removes it. Tree: 38 (B) with a left child 8 (R);
  - "delete 38": 38 is black with a red child 8, so Case 2. The final tree is again the single black node 8.

---

## 6. Likely exam questions (built only from these slides)

**Amortized analysis**
1. (MCQ) Which statement about amortized analysis is true?
   - (a) It averages the running time over all possible inputs, using probabilities.
   - (b) It guarantees the average time per operation over a worst-case sequence of operations, with no probability involved.
   - (c) It gives the cost of the single most expensive operation.
   - (d) It can only be used for sorting algorithms.
2. Name the three techniques of amortized analysis and describe each in one line. Write the condition that any choice of amortized costs must satisfy. Name three data structures where amortized analysis is used.
3. `find_Kth_smallest` sorts the array only on the first call. For n = 16 queries on an array of 16 numbers, find the total cost and the amortized cost per query with the class model. Compare with the naive bound n·(n log n).
4. A facility starts with 1 space and doubles when full: an add costs 1 + N + 1 when the facility is full, otherwise 1. Give the cost of each of the first 8 adds and the average. Which adds are expensive, and why does the average stay small?
5. Stack sequence: PUSH, PUSH, PUSH, MULTIPOP(S,2), PUSH, POP, PUSH, MULTIPOP(S,4). Give the actual cost of each operation, the total actual cost, and the total amortized cost with the class amortized costs. Check that Σ amortized ≥ Σ actual and that the total is ≤ 2n.

**RB properties and rotations**

6. (MCQ) Which of these is NOT one of the RB-tree properties given in class?
   - (a) Root is always black.
   - (b) NIL is considered black.
   - (c) Children of each red node are black.
   - (d) The heights of the left and right subtrees of every node differ by at most 1.
7. Is the tree on D13-S13 a valid red-black tree? Justify with the four properties.
8. Compute bh(v) for every node of the D12-S7 tree, using the class definition. What is the black-height of the tree?
9. (MCQ) After Left-Rotate(T, x), where y = right[x] and B = left[y]:
   - (a) x becomes the left child of y, and B becomes the right child of x.
   - (b) y becomes the left child of x.
   - (c) B becomes the left child of y.
   - (d) the in-order sequence of the keys changes.
10. The root of a red-black tree is red. If we make it black, does the tree remain a red-black tree? Why?
11. Draw the complete BST of height 3 on {1, …, 15} and colour it in three ways so that the black-heights are 2, 3 and 4.

**Insertion**

12. After a red node is inserted, which two violations can occur, and which two things decide how to fix them?
13. Insert 41, 38, 31, 12, 19, 8 into an empty RB tree. Name the case at each step and draw the final tree.
14. Insert 4 into the D12-S23 tree. Name every case applied and draw the final tree.
15. Why does RB insertion take O(lg n) time? Which case can repeat, and what is the largest number of rotations?
16. (MCQ) According to the slides, which tree suits a workload with far more reads than writes: (a) RB tree, (b) AVL tree, (c) neither? Which suits frequent insertions and deletions?

**Deletion**

17. Delete 39 from the D13-S7 BST with the class algorithm. Which value replaces 39, and why?
18. In RB deletion, which cases are terminal? What is a Double Black, and when does it appear?
19. From the D13-S16 tree, delete 9 and then 3, using the in-order predecessor. Name the case(s) and draw the tree after each deletion.
20. From the D13-S10 tree, delete 52. Can the "Or" rule of Case 2 be used here? Show the correct result.

### Answers

1. **(b)** [D11-S2, S3]. Option (a) describes average-case analysis.
2. The three techniques and the condition [D11-S4, S5]:
   - **Aggregate:** find an upper bound T(n) on the total cost of n operations; the average is T(n)/n.
   - **Accounting:** give each operation its own amortized cost (its own time plus its influence on future operations).
   - **Potential:** like accounting, but overcharge early operations to compensate for undercharges later.
   - **Condition:** Σ amortized cost ≥ Σ actual cost ("preserve the sum").
   - **Used for:** hash tables, disjoint sets, splay trees.
3. log₂ 16 = 4 [D11-S7; §5.1 (a)]:
   - total = 16·4 + 15·1 = **79**;
   - per query = 79/16 ≈ **4.94** ≤ log n + 1 = 5, i.e. O(log n);
   - naive bound: 16·(16·4) = **1024**.
4. Costs: **1, 3, 4, 1, 6, 1, 1, 1**; total 18; average **2.25** [D11-S8–S10; §5.1 (b)].
   - The 2nd, 3rd and 5th adds are expensive: there the facility is full (N = 1, 2, 4), so they cost buy 1 + move N + add 1.
   - After each doubling, the following adds cost 1 until the facility is full again, so the expensive cost is spread out.
5. Actual costs: 1, 1, 1, **2**, 1, 1, 1, **2** → Σ actual = **10** [D11-S11].
   - Amortized: five PUSHes × 2 = **10**; POP and MULTIPOP are charged 0.
   - Checks: 10 ≥ 10 ✔ and 10 ≤ 2n = 16 ✔.
6. **(d)**. That is the AVL balance-factor condition [D12-S3, S6].
7. **No** [D12-S6; D13-S13].
   - Rules 1–3 hold.
   - Rule 4 fails at 10: 10 → 5 → 2 → nil has 2 black real nodes (10 and 2), but 10 → nil on the right has only 1. So bh(10) does not exist, and the paths from the root do not all have the same black count (3 vs 2).
8. bh: 11 → 2; 2 → 1; 14 → 1; 1 → 1; 7 → 1; 5 → 0; 8 → 0; 15 → 0. The black-height of the tree is bh(root) = **2** [D12-S6, S7; §5.2 (a)].
9. **(a)** [D12-S8]. In-order A x B y C is kept, so (d) is false.
10. **Yes** [D12-S26; §5.2 (d)].
    - Rule 1 now holds; rule 2 is unchanged; blackening a node cannot create a red-red pair (rule 3).
    - Every root-to-nil path gains exactly one black node (the root), so the counts stay equal (rule 4). Lower nodes keep their bh.
11. Root 8; then 4, 12; then 2, 6, 10, 14; leaves 1, 3, …, 15 [§5.2 (c)]:
    - levels B, R, B, R → bh = **2**;
    - levels B, B, B, R → bh = **3**;
    - all black → bh = **4**.
12. Violations [D12-S10, S11, S13]:
    - the new node is the **root** (rule 1);
    - the **parent** of the new node is **red** (rule 3).
    - The fix depends on the node's **location relative to its grandparent** and the **colour of the uncle** (the parent's sibling): red uncle → recolour; black uncle → rotations.
13. Steps [D12-S25; §5.3 (c)]:
    - 41: root → black.
    - 38: parent black, nothing to do.
    - 31: Left-Left (Case 3) → rotR(41), swap colours → 38 (B) over 31 (R) and 41 (R).
    - 12: Case 1 → 31, 41 black; 38 red → it is the root → black.
    - 19: Left-Right → Case 2 rotL(12), then Case 3 rotR(31), swap colours → 19 (B) over 12 (R) and 31 (R).
    - 8: Case 1 → 12, 31 black; 19 red; parent 38 is black → stop.
    - **Final:** 38 (B); 19 (R) with 12 (B) [left child 8 (R)] and 31 (B); 41 (B).
14. Steps [D12-S24]:
    - **Case 1:** 5, 7 → black; 6 → red; x = 6.
    - **Case 2:** 6 is a right child of 3, 3 is a left child of 9, and the uncle 10 is black → rotL(3); x = 3.
    - **Case 3:** rotR(9), swap the colours of 9 and 6.
    - **Final:** 6 (B); 3 (R) with 2 (B) and 5 (B) [left child 4 (R)]; 9 (R) with 7 (B) and 10 (B) [right child 13 (R)].
15. Reasons [D12-S15]:
    - each iteration of the loop is O(1);
    - the loop repeats only in **Case 1**, which moves z up **two levels**;
    - Cases 2 and 3 end the loop;
    - the tree has O(lg n) levels, so the total is O(lg n);
    - **at most 2 rotations** overall (Case 2 then Case 3). ⚠️ D12-S11 says "at most one rotation"; use S15's statement.
16. Read-heavy → **(b) AVL**. Frequent insertions and deletions → **RB tree** (fewer rotations) [D12-S3, S4].
17. 39 has two children, so the algorithm takes `findLargestNode` of its left subtree: 27 → 29 → **36** [D13-S5, S6; §5.4 (c)].
    - The root's value becomes 36, and the old 36 (a leaf) is deleted.
    - 36 is the largest key smaller than 39 (the in-order predecessor), so BST order is kept.
18. Terminal cases [D13-S8]:
    - always terminal: Case 1 (red node), Case 2 (black node with a red child), the "Or" rule, 3(1) (DB at the root) and 3(5);
    - 3(3) is terminal only when the parent was red;
    - 3(2) and 3(4) always lead to another case.
    - **Double Black:** when the node removed is black and has no red child, its place becomes a DB. Paths through it are one black short until Case 3 removes it.
19. Two deletions [D13-S16–S18; §5.5 Example C]:
    - **Delete 9.** Two children → predecessor 7 is copied up; the old 7 is a black leaf.
      - Its parent is red, but its sibling 10 has a red child (13), so the "Or" rule is not safe → DB.
      - DB is a left child and the far child 13 is red → **3(5)**: swap parent/sibling colours, rotL at the parent, remove DB, 13 → black.
      - Tree: 6 (B); 3 (R) with 2 (B) and 5 (B) [left child 4 (R)]; 10 (R) with 7 (B) and 13 (B).
    - **Delete 3.** Predecessor 2 is copied up; the old 2 is a black leaf; its sibling 5 has a red child (4) → DB.
      - Far child NIL (black), near child 4 red → **3(4)**: swap 5/4, rotR(5).
      - Then the far child 5 is red → **3(5)**: swap colours, rotL, remove DB, 5 → black.
      - Tree: 6 (B); 4 (R) with 2 (B) and 5 (B); 10 (R) with 7 (B) and 13 (B).
    - With the successor instead: delete 9 → the old 10 is black with a red child → Case 2; delete 3 → successor 4 is a red leaf → Case 1. The trees are the same.
20. **No, the "Or" rule cannot be used** [D13-S8–S12; §5.5 Example A].
    - 52 is a black leaf with a red parent (49), but its sibling 28 has two red children (14 and 30). Swapping parent and sibling colours would put red 28 above red 14 and 30, which breaks rule 3.
    - Correct route: 52's place becomes a DB (a right child). Sibling 28 is black and its far child 14 is red → **3(5)**:
      - swap 49/28 colours (49 → black, 28 → red);
      - rotR(49);
      - remove DB;
      - 14 → black.
    - **Result:** 58 (B); 28 (R) with 14 (B) and 49 (B) [left child 30 (R)]; 67 (R) with 63 (B) and 75 (B) [right child 79 (R)].

---

## 7. Self-check

- [ ] I can explain how amortized analysis differs from average-case analysis, and state the "preserve the sum" condition Σ amortized ≥ Σ actual [D11-S3, S4].
- [ ] I can describe the aggregate, accounting and potential methods, and say which class scenario fits which [D11-S4].
- [ ] I can compute the amortized cost of the sort-once k-th smallest problem and of PUSH/POP/MULTIPOP with a bookkeeping table [D11-S7, S11].
- [ ] I can rebuild the doubling-space (puppy) table and find its two arithmetic errors [D11-S8–S10].
- [ ] I can state the four RB properties, compute bh(v), and decide whether a drawn tree is a valid RB tree [D12-S6].
- [ ] I can perform left and right rotations and show that the in-order sequence A x B y C is kept [D12-S8].
- [ ] I can insert a key sequence into an RB tree, naming Case 1, 2, 3 or a mirror case at every step, and explain the O(lg n) cost and the at most 2 rotations [D12-S14–S22].
- [ ] I can delete a node from a BST with the in-order predecessor or successor, following the class algorithm [D13-S3–S6].
- [ ] I can delete keys from an RB tree with Cases 1 and 2, the "Or" rule and Cases 3(1)–3(5), and I know when the "Or" rule is unsafe [D13-S8].
- [ ] I can redo the D12-S24 insertion and the three class deletion exercises (D13-S9, S13, S16) without looking [§2, §5].
