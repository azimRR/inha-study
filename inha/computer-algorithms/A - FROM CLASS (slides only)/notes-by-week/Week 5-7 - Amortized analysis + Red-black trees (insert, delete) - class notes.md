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
