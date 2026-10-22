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
