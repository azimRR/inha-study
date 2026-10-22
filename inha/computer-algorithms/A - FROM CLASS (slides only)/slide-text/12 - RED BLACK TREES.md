# 12 - RED BLACK TREES — raw slide text (verbatim from class slides)
Source file: 12 -RED BLACK TREES.pptx · 27 slides · images: slide-images/12 - RED BLACK TREES/

---

## Slide 1: RED BLACK TREES RB-Trees

RED BLACK TREES
RB-Trees

---

## Slide 2: Slide 2

Red Black Tree is a type of self balancing binary search tree

•It is invented in 1972 by Rudolf Bayer who called it “symmetric binary B-Trees”

•Each node of this tree has an extra attribute ‘color’ which can be RED or BLACK

•Coloring of nodes ensures that longest path from root to a leaf is no longer then twice the length of a shortest path which means the tree is balanced

---

## Slide 3: Slide 3

Parameter
AVL Tree
R-B tree

Balance Factor
AVL trees are more strictly balanced compared to RB trees.
In AVL trees, the balance factor (the height difference between the left and right subtrees) of every node is restricted to be at most 1, ensuring a height-balanced tree.

RB trees have less strict balance requirements.
They ensure that the tree remains approximately balanced by coloring the nodes (red or black) and enforcing several properties.

Insertion and Deletion

Insertions and deletions in AVL trees typically require more rotations, which can make them slower for these operations.

Balancing an AVL tree can take multiple rotations in some cases.

RB trees require fewer rotations during insertion and deletion, making them more efficient for dynamic datasets where elements are frequently added or removed.

RB trees are considered more practical for use in databases and file systems where there are many insertions and deletions.

AVL Vs RB Tree

---

## Slide 4: Slide 4

Parameter
AVL Tree
R-B tree

Performance Considerations
AVL trees are well-suited for scenarios where read operations significantly outnumber write operations, as their read performance is generally better due to their stricter balance criteria.

RB trees are preferred when the dataset is more dynamic, and there are frequent insertions and deletions. Their performance is often better in situations with a mix of read and write operations, and they are commonly used in real-time systems.

Code Complexity

AVL trees tend to have more complex code for maintaining balance, which can lead to larger codebases and potentially more room for bugs.

RB trees are usually easier to implement, maintain, and debug due to their simpler balance maintenance.

AVL Vs RB Tree

---

## Slide 5: Slide 5

AVL Vs RB Vs B-Tree

---

## Slide 6: Properties of RB Tree

Properties of RB Tree

1.Root is always black

2.Nil is considered to be black which means that every non-Nil node has two children

3.Black Children Rule: children of each red node are black

4.Black Height Rule: For each node v, there exist an integer bh(v) such that each downward path from v to a nil has exactly bh(v) black real(ie non nill) nodes.

---

## Slide 7: Ex- RB Tree

Ex- RB Tree

---

## Slide 8: Rotations 

Rotations

A C
B
C
A B

The rotations do not break BST- property
The order (AxByC is preserved)

x

y

x

Left Rotate (T, x)

Right Rotate (T, x)

y

---

## Slide 9: Insertion 

Insertion

---

## Slide 10: The type of discrepancy is determined by the location of the node with respect to its grand parent, and the colorof the sibling of the parent

The type of discrepancy is determined by

➔the location of the node with respect to its grand parent, and

➔ the color of the sibling of the parent

---

## Slide 11: 1. where the parent sibling (uncle) is red: fixed by changing color2 where the parent sibling (uncle) is black : fixed by rotations

1. where the parent sibling (uncle) is red :
fixed by changing color

2 where the parent sibling (uncle) is black :
fixed by rotations

(note: at most one rotation is sufficient for fixing the problem)

Discrepancies

---

## Slide 12: Slide 12

(no text — image/graph only, see image)

---

## Slide 13: Slide 13

(no text — image/graph only, see image)

---

## Slide 14: Slide 14

(no text — image/graph only, see image)

---

## Slide 15: Slide 15

(no text — image/graph only, see image)

---

## Slide 16: Slide 16

1) Perform standard BST insertion and make the color of newly inserted nodes as RED.
2) If x is root, change color of x as BLACK
3) Do following if color of x’s parent is not BLACK or x is not root.
a) If x’s uncle is RED (case1)
(i) Change color of parent and uncle as BLACK.
(ii) color of grand parent as RED.
(iii) Change x = x’s grandparent, repeat steps 2 and 3 for new x.

Understanding Insertion
Let x be the newly inserted node.

---

## Slide 17: Slide 17

i) Left Left Case (p is left child of g and x is left child of p)

ii) Left Right Case (p is left child of g and x is right child of p)

iii) Right Right Case (Mirror case i)

iv) Right Left Case (Mirror case ii)

b) If x’s uncle is BLACK,
then there can be four configurations for x, x’s parent (p) and x’s grandparent (g)

---

## Slide 18: Inserting a new node

Inserting a new node

1.Change Color of Grand Parent of New Node
2.Change Color of Parent and Uncle of New Node
3.Grandparent will be marked as New Node

Strategy to resolve :
CHANGE COLOR

---

## Slide 19: Slide 19

Strategy to resolve :
ROTATION

✓Anti Clockwise Rotation at Parent Node

✓Make Parent as New Node

---

## Slide 20: Slide 20

Strategy to resolve :
ROTATION

Anti Clockwise Rotation at Parent Node
Make Parent as New Node

---

## Slide 21: Case 3 

Case 3

Strategy to resolve :
ROTATION & COLOR CHANGE

✓Clockwise Rotation at GrandParent Node

✓Exchange Color of GrandParent and Parent

---

## Slide 22: Case 3 

Case 3

BLACK

RED

---

## Slide 23: Example 

Example

---

## Slide 24: Slide 24

Insert 4

Case-1

Anti Clockwise Rotation at Parent Node
Make Parent as New Node

Change Color of Grand Parent of New Node
Change Color of Parent and Uncle of New Node
Grandparent will be marked as New Node

Case-2

x

Case-3

x

Clockwise Rotation at GrandParent Node
Exchange Color of GrandParent and Parent

---

## Slide 25: Slide 25

Insert following nodes in an empty RB Tree

•41, 38,31, 12, 19, 8

•5, 10, 15, 25, 20, 30

---

## Slide 26: Slide 26

Exercises
-1 Draw the complete binary search tree of height 3 on the keys {1, 2, . . . , 15}. Add the NIL leaves and color the nodes in three different ways such that the black-heights of the resulting red-black trees are 2, 3, and 4.

-2 Suppose that the root of a red-black tree is red. If we make it black, does the tree remain a red-black tree?

---

## Slide 27: Video Lecture of the topic can be found at

Red Black Tree and Insertion
https://www.youtube.com/watch?v=H0MutN9u-Ik

Understanding RB Tree Deletion cases with an Example
https://youtu.be/1qEjtfR0gIo

How To Perform Search & Insert Operation In Binary Search Tree (BST)
https://www.youtube.com/watch?v=smE0gHcd5Gg

Video Lecture of the topic can be found at
