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
