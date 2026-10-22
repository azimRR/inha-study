#!/usr/bin/env python3
"""
rb_verify.py -- verification script for the red-black tree midterm notes.

* RBTree  : a line-by-line port of the CLRS (3rd/4th ed.) pseudocode
            LEFT-ROTATE, RIGHT-ROTATE, RB-INSERT, RB-INSERT-FIXUP,
            RB-TRANSPLANT, RB-DELETE (successor version), RB-DELETE-FIXUP,
            with a shared black sentinel T.nil.
            Every fixup case is logged and the tree is drawn after each step.
* violations(): checks BST order, parent pointers and RB properties 1-5.
* AVL tree (insert/delete with LL/RR/LR/RL logging), CLRS B-tree insert
  (minimum degree t, pre-emptive split), Sedgewick/algs4 left-leaning RB put(),
  RB -> 2-3-4 collapse, DP for min/max nodes per black-height, stress tests.

Run:  python3 04_rb_verify.py         (prints every trace used in the notes + extra checks)
      python3 04_rb_verify.py --json  (machine-readable blocks)
"""
import random
import math
import itertools
from collections import Counter
from functools import lru_cache

RED, BLACK = 'R', 'B'


# ----------------------------------------------------------------------------
# CLRS red-black tree
# ----------------------------------------------------------------------------
class Node:
    __slots__ = ('key', 'color', 'left', 'right', 'p')

    def __init__(self, key, color, nil):
        self.key, self.color = key, color
        self.left = self.right = self.p = nil


class RBTree:
    def __init__(self):
        nil = Node.__new__(Node)
        nil.key, nil.color = 'NIL', BLACK
        nil.left = nil.right = nil.p = nil
        self.nil = nil
        self.root = nil
        self.rotations = 0
        self.steps = None      # list of (text, picture-lines) while tracing
        self.cases = None      # list of case labels while tracing

    # -- tracing helpers -----------------------------------------------------
    def _step(self, text, z=None, db=None, draw=True):
        if self.steps is not None:
            self.steps.append((text, render(self, z=z, db=db) if draw else []))

    def _case(self, label):
        if self.cases is not None:
            self.cases.append(label)

    @staticmethod
    def k(n):
        return 'NIL' if n.key == 'NIL' else str(n.key)

    # -- basic BST helpers ---------------------------------------------------
    def search(self, key):                       # ITERATIVE-TREE-SEARCH
        x = self.root
        while x is not self.nil and key != x.key:
            x = x.left if key < x.key else x.right
        return x

    def minimum(self, x):                        # TREE-MINIMUM
        while x.left is not self.nil:
            x = x.left
        return x

    # -- rotations (CLRS 13.2) -----------------------------------------------
    def left_rotate(self, x):
        y = x.right                     # set y
        x.right = y.left                # turn y's left subtree into x's right subtree
        if y.left is not self.nil:
            y.left.p = x
        y.p = x.p                       # link x's parent to y
        if x.p is self.nil:
            self.root = y
        elif x is x.p.left:
            x.p.left = y
        else:
            x.p.right = y
        y.left = x                      # put x on y's left
        x.p = y
        self.rotations += 1

    def right_rotate(self, x):          # mirror image of left_rotate
        y = x.left
        x.left = y.right
        if y.right is not self.nil:
            y.right.p = x
        y.p = x.p
        if x.p is self.nil:
            self.root = y
        elif x is x.p.right:
            x.p.right = y
        else:
            x.p.left = y
        y.right = x
        x.p = y
        self.rotations += 1

    # -- insertion (CLRS 13.3) -----------------------------------------------
    def insert(self, key):
        nil = self.nil
        z = Node(key, RED, nil)
        y, x = nil, self.root
        while x is not nil:
            y = x
            x = x.left if z.key < x.key else x.right
        z.p = y
        if y is nil:
            self.root = z
        elif z.key < y.key:
            y.left = z
        else:
            y.right = z
        z.left = z.right = nil
        z.color = RED
        r0 = self.rotations
        if y is nil:
            self._step(f"BST-insert {key}: tree was empty, so z = {key} is the (red) root.", z=z)
        else:
            self._step(f"BST-insert {key} as a RED leaf, {'left' if z is y.left else 'right'} child of {y.key}{y.color} (z = {key}).", z=z)
        self.insert_fixup(z)
        return self.rotations - r0

    def insert_fixup(self, z):
        k = self.k
        if z.p.color == BLACK and z.p is not self.nil:
            self._step(f"Parent {z.p.key} is BLACK -> no violation, no fixup needed.", draw=False)
        while z.p.color == RED:
            p, g = z.p, z.p.p
            if p is g.left:
                y = g.right                                   # uncle
                if y.color == RED:                            # case 1
                    p.color = BLACK
                    y.color = BLACK
                    g.color = RED
                    z = g
                    self._case('I-1')
                    self._step(f"Case 1: parent {p.key} and uncle {y.key} are both RED -> recolor "
                               f"{p.key}->B, {y.key}->B, {g.key}->R; z moves up to {g.key}.", z=z)
                else:
                    if z is p.right:                          # case 2
                        zk = z.key
                        z = p
                        self.left_rotate(z)
                        self._case('I-2')
                        self._step(f"Case 2 (triangle): uncle {k(y)} is BLACK and z = {zk} is the RIGHT child of "
                                   f"LEFT child {p.key} -> z = {p.key}; LEFT-ROTATE({p.key}). Now a line -> Case 3.", z=z)
                        p = z.p
                    p.color = BLACK                           # case 3
                    g.color = RED
                    self.right_rotate(g)
                    self._case('I-3')
                    self._step(f"Case 3 (line): uncle {k(y)} is BLACK and z = {z.key} is the LEFT child of LEFT child "
                               f"{p.key} -> {p.key}->B, {g.key}->R; RIGHT-ROTATE({g.key}). Done.", z=z)
            else:                                             # mirror image
                y = g.left
                if y.color == RED:                            # case 1'
                    p.color = BLACK
                    y.color = BLACK
                    g.color = RED
                    z = g
                    self._case("I-1'")
                    self._step(f"Case 1' (mirror): parent {p.key} and uncle {y.key} are both RED -> recolor "
                               f"{p.key}->B, {y.key}->B, {g.key}->R; z moves up to {g.key}.", z=z)
                else:
                    if z is p.left:                           # case 2'
                        zk = z.key
                        z = p
                        self.right_rotate(z)
                        self._case("I-2'")
                        self._step(f"Case 2' (mirror triangle): uncle {k(y)} is BLACK and z = {zk} is the LEFT child of "
                                   f"RIGHT child {p.key} -> z = {p.key}; RIGHT-ROTATE({p.key}). Now a line -> Case 3'.", z=z)
                        p = z.p
                    p.color = BLACK                           # case 3'
                    g.color = RED
                    self.left_rotate(g)
                    self._case("I-3'")
                    self._step(f"Case 3' (mirror line): uncle {k(y)} is BLACK and z = {z.key} is the RIGHT child of RIGHT "
                               f"child {p.key} -> {p.key}->B, {g.key}->R; LEFT-ROTATE({g.key}). Done.", z=z)
        if self.root.color == RED:
            self.root.color = BLACK
            self._step(f"Last line of RB-INSERT-FIXUP: root {self.root.key} is RED -> color it BLACK.")
        elif self.cases and self.cases[-1] in ('I-1', "I-1'"):
            self._step(f"z = {z.key}: its parent {z.p.key} is BLACK -> loop ends (root already BLACK).", draw=False)
        self.root.color = BLACK

    # -- deletion (CLRS 13.4) ------------------------------------------------
    def transplant(self, u, v):                       # RB-TRANSPLANT
        if u.p is self.nil:
            self.root = v
        elif u is u.p.left:
            u.p.left = v
        else:
            u.p.right = v
        v.p = u.p                                     # unconditional, even if v is T.nil

    def delete(self, key):
        nil, k = self.nil, self.k
        z = self.search(key)
        if z is nil:
            raise KeyError(key)
        r0 = self.rotations
        zside = None if z.p is nil else ('L' if z is z.p.left else 'R')
        y = z
        y_orig = y.color
        if z.left is nil:
            x = z.right
            xside = zside
            self.transplant(z, z.right)
            how = (f"Delete {key}{z.color}: it has no left child -> RB-TRANSPLANT({key}, its right child "
                   f"{k(x)}); x = {k(x)}")
        elif z.right is nil:
            x = z.left
            xside = zside
            self.transplant(z, z.left)
            how = (f"Delete {key}{z.color}: it has no right child -> RB-TRANSPLANT({key}, its left child "
                   f"{k(x)}); x = {k(x)}")
        else:
            y = self.minimum(z.right)
            y_orig = y.color
            x = y.right
            if y.p is z:
                x.p = y
                xside = 'R'
                note = f"y = {y.key} is z's right child, so x.p = {y.key}"
            else:
                xside = 'L'
                self.transplant(y, y.right)
                y.right = z.right
                y.right.p = y
                note = f"y = {y.key} is deeper, so RB-TRANSPLANT({y.key}, {k(x)}) first"
            self.transplant(z, y)
            y.left = z.left
            y.left.p = y
            y.color = z.color
            how = (f"Delete {key}{z.color}: two children -> successor y = {y.key} (original color {y_orig}); "
                   f"x = y.right = {k(x)}; {note}; y moves into {key}'s spot and takes its color {z.color}")
        if y_orig == BLACK and self.root is nil:
            self._step(f"{how}. The tree is now empty (x = T.nil is the root, so RB-DELETE-FIXUP does nothing).")
        elif y_orig == BLACK:
            if x is nil and x.p is not nil:
                # CLRS tests "x == x.p.left"; when x is T.nil this works because x's sibling is never T.nil
                assert (x.p.left is x) == (xside == 'L'), "sentinel side ambiguity"
                db = ('nil', x.p, xside)
            elif x is nil:
                db = None
            else:
                db = ('node', x)
            what = "removed" if y is z else "moved"
            self._step(f"{how}. The {what} node's original color was BLACK -> x gets an extra black "
                       f"({'red-and-black' if x.color == RED else 'doubly black'}); call RB-DELETE-FIXUP(x = {k(x)}).",
                       db=db)
            self.delete_fixup(x)
        else:
            what = "removed" if y is z else "moved"
            self._step(f"{how}. The {what} node's original color was RED -> no property can break; no fixup.")
        return self.rotations - r0

    def _db(self, x, side):
        if x is self.nil:
            return ('nil', x.p, side)
        return ('node', x)

    def delete_fixup(self, x):
        nil, k = self.nil, self.k
        while x is not self.root and x.color == BLACK:
            if x is x.p.left:
                w = x.p.right
                xp = x.p
                if w.color == RED:                                        # case 1
                    wk = w.key
                    w.color = BLACK
                    xp.color = RED
                    self.left_rotate(xp)
                    w = xp.right
                    self._case('D-1')
                    self._step(f"Case 1: sibling w = {wk} is RED -> {wk}->B, parent {xp.key}->R; "
                               f"LEFT-ROTATE({xp.key}); new sibling w = {k(w)} (black) -> continue with case 2/3/4.",
                               db=self._db(x, 'L'))
                if w.left.color == BLACK and w.right.color == BLACK:     # case 2
                    w.color = RED
                    x = xp
                    self._case('D-2')
                    if x is self.root:
                        tail = f"x = {x.key} is the root -> loop stops."
                    elif x.color == RED:
                        tail = f"x = {x.key} is RED (red-and-black) -> loop stops; color it BLACK."
                    else:
                        tail = f"x = {x.key} is BLACK -> still doubly black, repeat at the higher level."
                    self._step(f"Case 2: sibling w = {w.key} is BLACK with two BLACK children -> {w.key}->R; "
                               f"the extra black moves up to the parent. {tail}", db=self._db(x, 'L'))
                else:
                    if w.right.color == BLACK:                            # case 3
                        wl = w.left
                        wl.color = BLACK
                        w.color = RED
                        self.right_rotate(w)
                        self._case('D-3')
                        self._step(f"Case 3: sibling w = {w.key} is BLACK, its NEAR child {wl.key} is RED and FAR child "
                                   f"{k(w.right)} is BLACK -> {wl.key}->B, {w.key}->R; RIGHT-ROTATE({w.key}); "
                                   f"new sibling w = {wl.key} -> Case 4.", db=self._db(x, 'L'))
                        w = xp.right
                    wr = w.right                                          # case 4
                    w.color = xp.color
                    xp.color = BLACK
                    wr.color = BLACK
                    self.left_rotate(xp)
                    x = self.root
                    self._case('D-4')
                    self._step(f"Case 4: sibling w = {w.key} is BLACK and its FAR child {wr.key} is RED -> "
                               f"{w.key} takes parent's color ({w.color}), {xp.key}->B, {wr.key}->B; "
                               f"LEFT-ROTATE({xp.key}); x = root. Done.")
            else:                                                         # mirror image
                w = x.p.left
                xp = x.p
                if w.color == RED:                                        # case 1'
                    wk = w.key
                    w.color = BLACK
                    xp.color = RED
                    self.right_rotate(xp)
                    w = xp.left
                    self._case("D-1'")
                    self._step(f"Case 1' (mirror): sibling w = {wk} is RED -> {wk}->B, parent {xp.key}->R; "
                               f"RIGHT-ROTATE({xp.key}); new sibling w = {k(w)} (black) -> continue with case 2'/3'/4'.",
                               db=self._db(x, 'R'))
                if w.right.color == BLACK and w.left.color == BLACK:     # case 2'
                    w.color = RED
                    x = xp
                    self._case("D-2'")
                    if x is self.root:
                        tail = f"x = {x.key} is the root -> loop stops."
                    elif x.color == RED:
                        tail = f"x = {x.key} is RED (red-and-black) -> loop stops; color it BLACK."
                    else:
                        tail = f"x = {x.key} is BLACK -> still doubly black, repeat at the higher level."
                    self._step(f"Case 2' (mirror): sibling w = {w.key} is BLACK with two BLACK children -> {w.key}->R; "
                               f"the extra black moves up to the parent. {tail}", db=self._db(x, 'R'))
                else:
                    if w.left.color == BLACK:                             # case 3'
                        wr = w.right
                        wr.color = BLACK
                        w.color = RED
                        self.left_rotate(w)
                        self._case("D-3'")
                        self._step(f"Case 3' (mirror): sibling w = {w.key} is BLACK, its NEAR child {wr.key} is RED and "
                                   f"FAR child {k(w.left)} is BLACK -> {wr.key}->B, {w.key}->R; LEFT-ROTATE({w.key}); "
                                   f"new sibling w = {wr.key} -> Case 4'.", db=self._db(x, 'R'))
                        w = xp.left
                    wl = w.left                                           # case 4'
                    w.color = xp.color
                    xp.color = BLACK
                    wl.color = BLACK
                    self.right_rotate(xp)
                    x = self.root
                    self._case("D-4'")
                    self._step(f"Case 4' (mirror): sibling w = {w.key} is BLACK and its FAR child {wl.key} is RED -> "
                               f"{w.key} takes parent's color ({w.color}), {xp.key}->B, {wl.key}->B; "
                               f"RIGHT-ROTATE({xp.key}); x = root. Done.")
        if x is not nil and x.color == RED:
            x.color = BLACK
            self._step(f"Last line of RB-DELETE-FIXUP: x = {x.key} is RED -> color it BLACK.")
        elif x is self.root and x is not nil and self.cases and self.cases[-1] in ('D-2', "D-2'"):
            self._step(f"x = {x.key} is the root: the extra black is simply dropped "
                       f"(every root-to-leaf path lost one black, so bh(root) fell by 1).")
        x.color = BLACK


# ----------------------------------------------------------------------------
# building, checking, measuring
# ----------------------------------------------------------------------------
def build(spec):
    """spec: '11B' or (label, left, right); None = NIL. Builds an RBTree with exactly those colors."""
    t = RBTree()

    def mk(s, parent):
        if s is None:
            return t.nil
        if isinstance(s, str):
            s = (s, None, None)
        lab, l, r = s
        n = Node(int(lab[:-1]), lab[-1], t.nil)
        n.p = parent
        n.left = mk(l, n)
        n.right = mk(r, n)
        return n
    t.root = mk(spec, t.nil)
    return t


def violations(t):
    v = []
    nil = t.nil
    if nil.color != BLACK:
        v.append("Property 3: T.nil is not black")
    if t.root is not nil and t.root.color != BLACK:
        v.append(f"Property 2: root {t.root.key} is RED")
    if t.root is not nil and t.root.p is not nil:
        v.append("root.p is not T.nil")

    def rec(n, lo, hi):
        if n is nil:
            return 1                       # count the NIL leaf itself
        if n.color not in (RED, BLACK):
            v.append(f"Property 1: node {n.key} has no valid color")
        if (lo is not None and n.key <= lo) or (hi is not None and n.key >= hi):
            v.append(f"BST order violated at {n.key}")
        for c in (n.left, n.right):
            if c is not nil and c.p is not n:
                v.append(f"parent pointer wrong at {c.key}")
        if n.color == RED:
            for c in (n.left, n.right):
                if c.color == RED:
                    v.append(f"Property 4: red node {n.key} has red child {c.key}")
        bl = rec(n.left, lo, n.key)
        br = rec(n.right, n.key, hi)
        if bl != br:
            v.append(f"Property 5: at node {n.key}, paths down the left side see {bl} black node(s) "
                     f"(NIL included) but paths down the right side see {br}")
        return max(bl, br) + (1 if n.color == BLACK else 0)
    rec(t.root, None, None)
    return v


def bh(t, n):
    """CLRS black-height: # black nodes on a path from n (not counting n) down to a NIL leaf (counting it)."""
    c = 0
    x = n
    while x is not t.nil:
        x = x.left
        if x.color == BLACK:
            c += 1
    return c


def height(t, n=None):
    """edges on the longest path from n down to a NIL leaf (CLRS counts leaves = NIL)."""
    if n is None:
        n = t.root
    if n is t.nil:
        return 0
    return 1 + max(height(t, n.left), height(t, n.right))


def size(t, n=None):
    if n is None:
        n = t.root
    if n is t.nil:
        return 0
    return 1 + size(t, n.left) + size(t, n.right)


def inorder(t):
    out, st, x = [], [], t.root
    while st or x is not t.nil:
        while x is not t.nil:
            st.append(x)
            x = x.left
        x = st.pop()
        out.append(x.key)
        x = x.right
    return out


def all_bh(t):
    res = []

    def rec(n):
        if n is t.nil:
            return
        rec(n.left)
        res.append((n.key, n.color, bh(t, n)))
        rec(n.right)
    rec(t.root)
    return res


# ----------------------------------------------------------------------------
# ASCII drawing (top-down)
# ----------------------------------------------------------------------------
def render(t, z=None, db=None):
    nil = t.nil

    def label(n):
        s = f"{n.key}-{n.color}" if isinstance(n.key, str) else f"{n.key}{n.color}"
        if db and db[0] == 'node' and db[1] is n:
            s = f"{n.key}({'BB' if n.color == BLACK else 'RB'})"
        if z is n:
            s += '*'
        return s

    def kids(n):
        l = n.left if n.left is not nil else None
        r = n.right if n.right is not nil else None
        if db and db[0] == 'nil' and db[1] is n:
            if db[2] == 'L':
                l = 'DBNIL'
            else:
                r = 'DBNIL'
        return l, r
    return draw(t.root if t.root is not nil else None, label, kids)


def draw(root, label, kids):
    if root is None:
        return ['(empty tree)']

    def aux(n):
        if n == 'DBNIL':
            s = 'NIL(BB)'
            return [s], len(s), 1, len(s) // 2
        l, r = kids(n)
        s = label(n)
        u = len(s)
        if l is None and r is None:
            return [s], u, 1, u // 2
        if r is None:
            lines, nl, p, x = aux(l)
            first = (x + 1) * ' ' + (nl - x - 1) * '_' + s
            second = x * ' ' + '/' + (nl - x - 1 + u) * ' '
            shifted = [ln + u * ' ' for ln in lines]
            return [first, second] + shifted, nl + u, p + 2, nl + u // 2
        if l is None:
            lines, nr, p, x = aux(r)
            first = s + x * '_' + (nr - x) * ' '
            second = (u + x) * ' ' + '\\' + (nr - x - 1) * ' '
            shifted = [u * ' ' + ln for ln in lines]
            return [first, second] + shifted, nr + u, p + 2, u // 2
        left, nl, p, x = aux(l)
        right, nr, q, y = aux(r)
        first = (x + 1) * ' ' + (nl - x - 1) * '_' + s + y * '_' + (nr - y) * ' '
        second = x * ' ' + '/' + (nl - x - 1 + u + y) * ' ' + '\\' + (nr - y - 1) * ' '
        if p < q:
            left += [nl * ' '] * (q - p)
        elif q < p:
            right += [nr * ' '] * (p - q)
        lines = [first, second] + [a + u * ' ' + b for a, b in zip(left, right)]
        return lines, nl + nr + u, max(p, q) + 2, nl + u // 2
    return [ln.rstrip() for ln in aux(root)[0]]


# ----------------------------------------------------------------------------
# trace formatting
# ----------------------------------------------------------------------------
CASE_NAMES = {
    'I-1': 'Case 1', 'I-2': 'Case 2', 'I-3': 'Case 3',
    "I-1'": "Case 1'", "I-2'": "Case 2'", "I-3'": "Case 3'",
    'D-1': 'Case 1', 'D-2': 'Case 2', 'D-3': 'Case 3', 'D-4': 'Case 4',
    "D-1'": "Case 1'", "D-2'": "Case 2'", "D-3'": "Case 3'", "D-4'": "Case 4'",
}


def run_ops(t, ops, verbose=True):
    """ops: list like [('ins', 10), ('del', 20)]. Returns markdown text."""
    md = []
    for op, key in ops:
        t.steps, t.cases = [], []
        rot = t.insert(key) if op == 'ins' else t.delete(key)
        v = violations(t)
        assert not v, (op, key, v)
        cases = ', '.join(CASE_NAMES[c] for c in t.cases) or 'none'
        word = 'Insert' if op == 'ins' else 'Delete'
        md.append(f"**{word} {key}** -- fixup cases: {cases}; rotations: {rot}; "
                  f"after: n = {size(t)}, bh(root) = {bh(t, t.root)}, RB properties OK.")
        md.append("```")
        if verbose:
            for i, (text, pic) in enumerate(t.steps):
                md.append(f"({chr(97 + i)}) {text}")
                md.extend('    ' + ln for ln in pic)
        else:
            md.append("result:")
            md.extend('    ' + ln for ln in render(t))
        md.append("```")
        md.append("")
        t.steps = t.cases = None
    return '\n'.join(md)


def pic(t):
    return '\n'.join(render(t))


def maximum(t, x):
    while x.right is not t.nil:
        x = x.right
    return x


def delete_with_predecessor(t, key):
    """RB-DELETE but replacing a two-child node by its PREDECESSOR (max of left subtree), as the USFCA
    visualizer does; the fixup is the unchanged CLRS RB-DELETE-FIXUP. Illustration only."""
    nil = t.nil
    z = t.search(key)
    if z.left is nil or z.right is nil:
        return t.delete(key)
    y = maximum(t, z.left)
    y_orig = y.color
    x = y.left
    if y.p is z:
        x.p = y
    else:
        t.transplant(y, y.left)
        y.left = z.left
        y.left.p = y
    t.transplant(z, y)
    y.right = z.right
    y.right.p = y
    y.color = z.color
    if y_orig == BLACK:
        t.delete_fixup(x)


def btree_to_rb(bt):
    """2-3-4 tree (CLRS B-tree, t = 2) -> RB tree: 2-node -> black node; 3-node [a b] -> black b with red
    LEFT child a; 4-node [a b c] -> black b with red children a and c."""
    t = RBTree()

    def conv(n, parent):
        ks, cs = n.keys, n.c
        def sub(i):
            return conv(cs[i], None) if cs else t.nil
        if len(ks) == 1:
            b = Node(ks[0], BLACK, t.nil); b.left, b.right = sub(0), sub(1)
        elif len(ks) == 2:
            b = Node(ks[1], BLACK, t.nil); a = Node(ks[0], RED, t.nil)
            a.left, a.right = sub(0), sub(1); b.left, b.right = a, sub(2)
        else:
            b = Node(ks[1], BLACK, t.nil); a = Node(ks[0], RED, t.nil); c = Node(ks[2], RED, t.nil)
            a.left, a.right, c.left, c.right = sub(0), sub(1), sub(2), sub(3)
            b.left, b.right = a, c
        return b
    t.root = conv(bt.root, None)

    def fix(n, p):
        if n is t.nil:
            return
        n.p = p
        fix(n.left, n); fix(n.right, n)
    fix(t.root, t.nil)
    return t


# ----------------------------------------------------------------------------
# AVL tree (for comparison)
# ----------------------------------------------------------------------------
class AVLNode:
    __slots__ = ('key', 'left', 'right', 'h')

    def __init__(self, key):
        self.key, self.left, self.right, self.h = key, None, None, 0


def ah(n):
    return n.h if n else -1


def bf(n):                          # balance factor = height(left) - height(right)
    return ah(n.left) - ah(n.right)


def upd(n):
    n.h = 1 + max(ah(n.left), ah(n.right))


def a_rot_right(y):
    x = y.left
    y.left = x.right
    x.right = y
    upd(y)
    upd(x)
    return x


def a_rot_left(x):
    y = x.right
    x.right = y.left
    y.left = x
    upd(x)
    upd(y)
    return y


def a_rebalance(n, log):
    upd(n)
    b = bf(n)
    if b > 1:
        if bf(n.left) >= 0:
            log.append(('LL', n.key, 'single RIGHT rotation at ' + str(n.key)))
            return a_rot_right(n)
        log.append(('LR', n.key, f'LEFT rotation at {n.left.key}, then RIGHT rotation at {n.key}'))
        n.left = a_rot_left(n.left)
        return a_rot_right(n)
    if b < -1:
        if bf(n.right) <= 0:
            log.append(('RR', n.key, 'single LEFT rotation at ' + str(n.key)))
            return a_rot_left(n)
        log.append(('RL', n.key, f'RIGHT rotation at {n.right.key}, then LEFT rotation at {n.key}'))
        n.right = a_rot_right(n.right)
        return a_rot_left(n)
    return n


def avl_insert(n, key, log):
    if n is None:
        return AVLNode(key)
    if key < n.key:
        n.left = avl_insert(n.left, key, log)
    else:
        n.right = avl_insert(n.right, key, log)
    return a_rebalance(n, log)


def avl_delete(n, key, log):
    if n is None:
        raise KeyError(key)
    if key < n.key:
        n.left = avl_delete(n.left, key, log)
    elif key > n.key:
        n.right = avl_delete(n.right, key, log)
    else:
        if n.left is None:
            return n.right
        if n.right is None:
            return n.left
        s = n.right
        while s.left:
            s = s.left
        n.key = s.key                         # copy successor key (CLRS-style successor)
        n.right = avl_delete(n.right, s.key, log)
    return a_rebalance(n, log)


def avl_ok(n):
    if n is None:
        return True, -1
    okl, hl = avl_ok(n.left)
    okr, hr = avl_ok(n.right)
    return okl and okr and abs(hl - hr) <= 1 and n.h == 1 + max(hl, hr), 1 + max(hl, hr)


def avl_pic(root):
    return draw(root, lambda n: f"{n.key}", lambda n: (n.left, n.right))


def is_avl_shaped(t):
    def rec(n):
        if n is t.nil:
            return True, -1
        a, hl = rec(n.left)
        b, hr = rec(n.right)
        return a and b and abs(hl - hr) <= 1, 1 + max(hl, hr)
    return rec(t.root)[0]


# ----------------------------------------------------------------------------
# CLRS B-tree insertion (minimum degree t, pre-emptive split on the way down)
# ----------------------------------------------------------------------------
class BNode:
    def __init__(self, leaf):
        self.keys, self.c, self.leaf = [], [], leaf


class BTree:
    def __init__(self, t):
        self.t = t
        self.root = BNode(True)

    def split_child(self, x, i, log):
        t = self.t
        y = x.c[i]
        z = BNode(y.leaf)
        med = y.keys[t - 1]
        z.keys = y.keys[t:]
        y.keys = y.keys[:t - 1]
        if not y.leaf:
            z.c = y.c[t:]
            y.c = y.c[:t]
        x.c.insert(i + 1, z)
        x.keys.insert(i, med)
        log.append(f"split full node -> median {med} moves up; halves [{' '.join(map(str, y.keys))}] and [{' '.join(map(str, z.keys))}]")

    def insert(self, k, log):
        r = self.root
        if len(r.keys) == 2 * self.t - 1:
            s = BNode(False)
            s.c = [r]
            self.root = s
            log.append("root is full -> make a new empty root (height grows by 1)")
            self.split_child(s, 0, log)
            self.insert_nonfull(s, k, log)
        else:
            self.insert_nonfull(r, k, log)

    def insert_nonfull(self, x, k, log):
        if x.leaf:
            i = 0
            while i < len(x.keys) and x.keys[i] < k:
                i += 1
            x.keys.insert(i, k)
            return
        i = 0
        while i < len(x.keys) and x.keys[i] < k:
            i += 1
        if len(x.c[i].keys) == 2 * self.t - 1:
            self.split_child(x, i, log)
            if k > x.keys[i]:
                i += 1
        self.insert_nonfull(x.c[i], k, log)

    def levels(self):
        out, lvl = [], [self.root]
        while lvl:
            out.append('  '.join('[' + ' '.join(map(str, n.keys)) + ']' for n in lvl))
            lvl = [c for n in lvl for c in n.c]
        return out

    def check(self):
        t = self.t
        depths = set()

        def rec(n, d, lo, hi, is_root):
            assert n.keys == sorted(n.keys)
            if not is_root:
                assert t - 1 <= len(n.keys) <= 2 * t - 1, n.keys
            else:
                assert len(n.keys) <= 2 * t - 1
            for k in n.keys:
                assert (lo is None or k > lo) and (hi is None or k < hi)
            if n.leaf:
                depths.add(d)
            else:
                assert len(n.c) == len(n.keys) + 1
                bounds = [lo] + n.keys + [hi]
                for i, c in enumerate(n.c):
                    rec(c, d + 1, bounds[i], bounds[i + 1], False)
        rec(self.root, 0, None, None, True)
        assert len(depths) == 1
        return depths.pop()


# ----------------------------------------------------------------------------
# Sedgewick / algs4 left-leaning red-black BST (2-3 version), put() only
# ----------------------------------------------------------------------------
class LNode:
    __slots__ = ('key', 'left', 'right', 'red')

    def __init__(self, key):
        self.key, self.left, self.right, self.red = key, None, None, True


def l_red(n):
    return n is not None and n.red


def l_rotl(h):
    x = h.right
    h.right = x.left
    x.left = h
    x.red = h.red
    h.red = True
    return x


def l_rotr(h):
    x = h.left
    h.left = x.right
    x.right = h
    x.red = h.red
    h.red = True
    return x


def l_flip(h):
    h.red = not h.red
    h.left.red = not h.left.red
    h.right.red = not h.right.red


def llrb_put(h, key):
    if h is None:
        return LNode(key)
    if key < h.key:
        h.left = llrb_put(h.left, key)
    elif key > h.key:
        h.right = llrb_put(h.right, key)
    if l_red(h.right) and not l_red(h.left):
        h = l_rotl(h)
    if l_red(h.left) and l_red(h.left.left):
        h = l_rotr(h)
    if l_red(h.left) and l_red(h.right):
        l_flip(h)
    return h


def llrb_insert_all(keys):
    root = None
    for k in keys:
        root = llrb_put(root, k)
        root.red = False
    return root


def llrb_pic(root):
    return draw(root, lambda n: f"{n.key}{'R' if n.red else 'B'}", lambda n: (n.left, n.right))


# ----------------------------------------------------------------------------
# RB -> 2-3-4 tree (merge each red node into its black parent)
# ----------------------------------------------------------------------------
def rb_to_234(t):
    nil = t.nil

    def node(n):                     # n is black
        keys, kids = [], []
        for side in ('L', None, 'R'):
            if side is None:
                keys.append(n.key)
                continue
            c = n.left if side == 'L' else n.right
            if c is not nil and c.color == RED:
                keys.append(c.key)
                kids.extend([c.left, c.right])
            else:
                kids.append(c)
        keys.sort()
        return keys, kids

    out, lvl = [], [t.root]
    while lvl and any(n is not nil for n in lvl):
        row, nxt = [], []
        for n in lvl:
            if n is nil:
                continue
            keys, kids = node(n)
            row.append('[' + ' '.join(map(str, keys)) + ']')
            nxt.extend(kids)
        out.append('  '.join(row))
        lvl = nxt
    return out


# ----------------------------------------------------------------------------
# DP: min / max internal nodes for a given black-height (CLRS convention)
# ----------------------------------------------------------------------------
@lru_cache(None)
def nodes_range(b, color):
    """(min, max) internal nodes of a subtree whose root is an internal node of the given
    color and CLRS black-height b (black nodes below it on a path, NIL included)."""
    opts = []                         # possible (min,max) for ONE child
    if b == 1:
        opts.append((0, 0))           # NIL child
    if b - 1 >= 1:
        opts.append(nodes_range(b - 1, BLACK))
    if color == BLACK and b >= 1:
        opts.append(nodes_range(b, RED))
    if not opts:
        return None
    lo = min(o[0] for o in opts)
    hi = max(o[1] for o in opts)
    return (1 + 2 * lo, 1 + 2 * hi)


# ----------------------------------------------------------------------------
# stress test
# ----------------------------------------------------------------------------
def stress(seed=1, ops=30000, keyspace=600):
    rnd = random.Random(seed)
    t = RBTree()
    present = set()
    ins_rot, del_rot = Counter(), Counter()
    ins_c1_max = del_c2_max = 0
    worst_ratio = 0.0
    for _ in range(ops):
        k = rnd.randrange(keyspace)
        t.cases = []
        if k in present:
            r = t.delete(k)
            present.remove(k)
            del_rot[r] += 1
            del_c2_max = max(del_c2_max, sum(1 for c in t.cases if c.startswith('D-2')))
        else:
            r = t.insert(k)
            present.add(k)
            ins_rot[r] += 1
            ins_c1_max = max(ins_c1_max, sum(1 for c in t.cases if c.startswith('I-1')))
        t.cases = None
        assert not violations(t)
        assert inorder(t) == sorted(present)
        n = len(present)
        if n:
            hgt = height(t)
            assert hgt <= 2 * math.log2(n + 1) + 1e-9, (hgt, n)
            worst_ratio = max(worst_ratio, hgt / math.log2(n + 1))
    return ins_rot, del_rot, ins_c1_max, del_c2_max, worst_ratio


def avl_stress(seed=2, ops=30000, keyspace=600):
    rnd = random.Random(seed)
    root, present = None, set()
    ins_ev, del_ev = Counter(), Counter()
    for _ in range(ops):
        k = rnd.randrange(keyspace)
        log = []
        if k in present:
            root = avl_delete(root, k, log)
            present.remove(k)
            del_ev[sum(2 if e[0] in ('LR', 'RL') else 1 for e in log)] += 1
        else:
            root = avl_insert(root, k, log)
            present.add(k)
            ins_ev[sum(2 if e[0] in ('LR', 'RL') else 1 for e in log)] += 1
        ok, _ = avl_ok(root)
        assert ok
    return ins_ev, del_ev


# ----------------------------------------------------------------------------
# all traces used in the notes
# ----------------------------------------------------------------------------
def build_blocks():
    B = {}


    def fresh(keys):
        t = RBTree()
        for k in keys:
            t.insert(k)
        return t


    def start(t):
        assert not violations(t), violations(t)
        return "Start tree (valid RB tree, bh(root) = %d):\n```\n%s\n```\n" % (bh(t, t.root), pic(t))


    T1 = [10, 20, 30, 15, 25, 5, 1]

    # ---------------- rotations ----------------
    t = build(('20B', ('10B', '5B', ('15B', '12B', '17B')), '30B'))
    before = pic(t)
    ino1 = inorder(t)
    t.left_rotate(t.search(10))
    after = pic(t)
    ino2 = inorder(t)
    t.right_rotate(t.search(15))
    back = pic(t)
    B['ROT_DEMO'] = ("```\nBefore (x = 10, y = x.right = 15, beta = y.left = 12):\n%s\nin-order: %s\n\n"
                     "After LEFT-ROTATE(T, 10):\n%s\nin-order: %s   (unchanged)\n\n"
                     "After RIGHT-ROTATE(T, 15) (undoes it):\n%s\n```" % (before, ino1, after, ino2, back))

    # ---------------- insertion ----------------
    t = RBTree()
    B['INS_T1'] = run_ops(t, [('ins', k) for k in T1])
    B['T1_FINAL'] = "```\n%s\n```" % pic(t)
    B['T1_BH'] = ', '.join(f"{k}{c}: bh={h}" for k, c, h in all_bh(t))

    cat = []
    for seq, title in (([30, 20, 10], "LL shape (line on the left) -> Case 3"),
                       ([30, 10, 20], "LR shape (triangle) -> Case 2 then Case 3"),
                       ([10, 20, 30], "RR shape (line on the right) -> Case 3' (mirror)"),
                       ([10, 30, 20], "RL shape (mirror triangle) -> Case 2' then Case 3'"),
                       ([10, 5, 20, 25], "uncle red on the right side -> Case 1' (mirror)")):
        tt = fresh(seq[:-1])
        cat.append(f"*Insert {seq[-1]} after {', '.join(map(str, seq[:-1]))}: {title}*\n")
        cat.append(run_ops(tt, [('ins', seq[-1])]))
    B['INS_CAT'] = '\n'.join(cat)

    t = build(('11B', ('2R', '1B', ('7B', '5R', '8R')), ('14B', None, '15R')))
    B['INS_FIG134'] = start(t) + "\n" + run_ops(t, [('ins', 4)])
    t = build(('7B', '3B', ('18R', ('10B', '8R', '11R'), ('22B', None, '26R'))))
    B['INS_MIT'] = start(t) + "\n" + run_ops(t, [('ins', 15)])

    # ---------------- deletion ----------------
    t = fresh(T1)
    B['DEL_T1'] = start(t) + "\n" + run_ops(t, [('del', k) for k in [20, 15, 30, 1, 5]])

    dcat = []
    for spec, key, title in (
            (('10B', '5B', ('30R', '20B', '40B')), 5, "Case 1 (red sibling) -> Case 2 with a RED parent (stops at once)"),
            (('20B', ('10B', '5B', '15B'), ('30B', '25B', '35B')), 5, "Case 2 twice: the extra black climbs to the root (all-black tree)"),
            (('10B', ('5B', None, '7R'), '20B'), 20, "Case 3' -> Case 4' (mirror: x is a RIGHT child)"),
            (('20B', ('10R', '5B', ('15B', None, '17R')), ('30B', '25R', '35R')), 5, "Case 4 with a RED parent (w inherits RED)"),
            (('20B', ('10B', '5R', None), '30B'), 5, "deleting a RED leaf: no fixup"),
            (('20B', ('10B', '5R', None), '30B'), 10, "deleting a BLACK node with one RED child: x is red-and-black -> just recolor"),
            (('20B', ('10B', '5B', ('15B', None, '17R')), ('30B', '25B', '35B')), 10,
             "two children, successor y IS z.right (the 'x.p = y' line); x red"),
            (('20B', ('10B', '5B', '15B'), ('30B', '25B', '35B')), 20,
             "two children, successor deeper and BLACK: x = NIL at y's old spot; Case 2 then Case 2'"),
    ):
        tt = build(spec)
        dcat.append(f"*{title}*\n")
        dcat.append(start(tt))
        dcat.append(run_ops(tt, [('del', key)]))
    B['DEL_CAT'] = '\n'.join(dcat)

    # ---------------- comparison: AVL / B-tree / 2-3-4 / LLRB ----------------
    root = None
    lines = []
    for k in T1:
        log = []
        root = avl_insert(root, k, log)
        lines.append(f"insert {k}: " + ('; '.join(f"{e[0]} imbalance at {e[1]} -> {e[2]}" for e in log) or 'no rotation'))
    B['AVL_T1'] = "```\n" + '\n'.join(lines) + "\nfinal AVL tree (keys only):\n" + '\n'.join(avl_pic(root)) + "\n```"

    bt = BTree(2)
    lines = []
    for k in T1:
        log = []
        bt.insert(k, log)
        bt.check()
        lines.append(f"insert {k}: " + ('; '.join(log) if log else 'no split') + "   ->  " + ' / '.join(bt.levels()))
    t = fresh(T1)
    B['BTREE_T1'] = ("```\n" + '\n'.join(lines) + "\n\nCLRS RB tree after the same inserts, red nodes merged into black parents:\n"
                     + ' / '.join(rb_to_234(t)) + "\n```")

    keys = [4, 8, 5, 10, 11, 7, 12, 1, 9, 6, 3, 2]
    root = None
    for k in keys:
        root = avl_insert(root, k, [])
    pre = '\n'.join(avl_pic(root))
    log = []
    root = avl_delete(root, 11, log)
    assert avl_ok(root)[0]
    B['AVL_DEL_MULTI'] = ("```\nAVL tree built by inserting %s:\n%s\n\ndelete 11 (two children -> successor 12 copied up, then 12's node removed):\n%s\n\nresult:\n%s\n```"
                          % (', '.join(map(str, keys)), pre,
                             '\n'.join(f"  rebalance #{i+1}: {e[0]} at {e[1]} -> {e[2]}" for i, e in enumerate(log)),
                             '\n'.join(avl_pic(root))))

    ins_rot, del_rot, c1max, c2max, ratio = stress(1, 30000, 600)
    a_ins, a_del = avl_stress(2, 30000, 600)
    B['STRESS'] = ("```\nCLRS RB tree, 30,000 random inserts/deletes (keys 0..599), RB properties + BST order checked after EVERY op:\n"
                   f"  rotations per insert : {dict(sorted(ins_rot.items()))}   (max {max(ins_rot)})\n"
                   f"  rotations per delete : {dict(sorted(del_rot.items()))}   (max {max(del_rot)})\n"
                   f"  most Case-1 recolorings in one insert: {c1max};  most Case-2 steps in one delete: {c2max}\n"
                   f"  worst observed height / lg(n+1): {ratio:.3f}  (theory: <= 2)\n"
                   "AVL tree, same workload (a double rotation counted as 2 single rotations):\n"
                   f"  rotations per insert : {dict(sorted(a_ins.items()))}   (max {max(a_ins)})\n"
                   f"  rotations per delete : {dict(sorted(a_del.items()))}   (max {max(a_del)})\n```")

    llrb = []
    for seq in ([10, 20], [1, 2, 3], [1, 2, 3, 4, 5], list(range(1, 11))):
        a = render(fresh(seq))
        b = llrb_pic(llrb_insert_all(seq))
        w = max(max(len(s) for s in a) + 6, len('CLRS (2-3-4 style)') + 4)
        rows = max(len(a), len(b))
        a += [''] * (rows - len(a))
        b += [''] * (rows - len(b))
        llrb.append(f"insert {', '.join(map(str, seq))}:\n" + f"{'CLRS (2-3-4 style)':<{w}}Sedgewick LLRB (algs4, 2-3 style)\n"
                    + '\n'.join(f"{x:<{w}}{y}" for x, y in zip(a, b)))
    B['LLRB_VS_CLRS'] = "```\n" + '\n\n'.join(llrb) + "\n```"

    # ---------------- practice problems ----------------
    t = RBTree()
    B['P1'] = run_ops(t, [('ins', k) for k in [41, 38, 31, 12, 19, 8]])
    B['P2'] = run_ops(t, [('del', k) for k in [8, 12, 19, 31, 38, 41]])

    t = RBTree()
    B['P3'] = run_ops(t, [('ins', k) for k in range(1, 11)], verbose=False)
    B['P3_FINAL'] = f"bh(root) = {bh(t, t.root)}, height = {height(t) - 1} edges ({height(t)} levels); 2-3-4 view: " + ' / '.join(rb_to_234(t))

    t = fresh(T1)
    B['P4'] = run_ops(t, [('del', 10)])
    t = build(('10B', '5B', ('30R', ('20B', '15R', None), '40B')))
    B['P5'] = start(t) + "\n" + run_ops(t, [('del', 5)])
    t = build(('10B', '5B', ('30R', ('20B', None, '25R'), '40B')))
    B['P6'] = start(t) + "\n" + run_ops(t, [('del', 5)])

    cands = [
        ('a', ('10R', '5B', '20B')),
        ('b', ('10B', ('5R', '3R', None), '20B')),
        ('c', ('10B', ('5B', '3B', None), '20B')),
        ('d', ('10B', ('5R', '3B', '7B'), ('20R', '15B', '25B'))),
        ('e', ('10B', '5B', ('20R', '15B', ('25B', None, '30R')))),
        ('f', ('10B', ('5B', '3R', '7R'), ('20B', None, '30B'))),
    ]
    qs, ans = [], []
    for name, spec in cands:
        tt = build(spec)
        qs.append(f"({name})\n" + pic(tt))
        v = violations(tt)
        ans.append(f"({name}) " + ("VALID red-black tree (bh(root) = %d)" % bh(tt, tt.root) if not v else 'INVALID: ' + '; '.join(v))
                   + f"; AVL-balanced shape: {'yes' if is_avl_shaped(tt) else 'NO'}")
    B['P7_Q'] = "```\n" + '\n\n'.join(qs) + "\n```"
    B['P7_A'] = "```\n" + '\n'.join(ans) + "\n```"

    t = build(('7B', ('2R', '1B', ('5B', '4R', None)), ('11R', '8B', ('14B', None, '15R'))))
    assert not violations(t)
    B['P8_Q'] = "```\n" + pic(t) + "\n```"
    B['P8_A'] = ', '.join(f"{k}{c}: {h}" for k, c, h in all_bh(t))

    rows = ["| k = bh(root) | min internal nodes (all black, perfect) | formula 2^k - 1 | max internal nodes (alternating B/R levels, complete) | formula 4^k - 1 = 2^(2k) - 1 |",
            "|---|---|---|---|---|"]
    for k in range(1, 6):
        lo, hi = nodes_range(k, BLACK)
        assert lo == 2 ** k - 1 and hi == 4 ** k - 1
        rows.append(f"| {k} | {lo} | {2**k - 1} | {hi} | {4**k - 1} |")
    B['P9_TABLE'] = '\n'.join(rows)

    n = 10 ** 6
    B['P10'] = "\n".join([
        f"- lg(n+1) = {math.log2(n + 1):.3f}; a perfectly balanced BST would have height about lg n = {math.log2(n):.2f}.",
        f"- RB tree: h <= 2 lg(n+1) = {2 * math.log2(n + 1):.2f}, so **h <= {math.floor(2 * math.log2(n + 1))}**.",
        f"- AVL tree: h < 1.4405 lg(n+2) - 0.3277 = {1.4405 * math.log2(n + 2) - 0.3277:.2f}, so **h <= {math.floor(1.4405 * math.log2(n + 2) - 0.3277)}**.",
        f"- B-tree with t = 100: h <= log_100((n+1)/2) = {math.log((n + 1) / 2, 100):.3f}, so **h <= {math.floor(math.log((n + 1) / 2, 100))}** (at most 3 node or disk reads per search).",
        f"- Full B-tree of height 2 with 1000 keys per node (1001 children): 1000 * (1 + 1001 + 1001^2) = **{1000 * (1 + 1001 + 1001 ** 2):,} keys**."])

    t3 = fresh([3, 2])
    a = pic(t3)
    t3.insert(1)
    b = pic(t3)
    t3.delete(1)
    c = pic(t3)
    B['P13'] = f"```\nafter inserting 3, 2:\n{a}\n\nafter inserting 1:\n{b}\n\nafter deleting 1:\n{c}\n```"

    root = None
    lines = []
    for k in range(1, 11):
        log = []
        root = avl_insert(root, k, log)
        lines.append(f"insert {k}: " + ('; '.join(f"{e[0]} at {e[1]} ({e[2]})" for e in log) or 'no rotation'))
    t = fresh(range(1, 11))
    B['P14'] = ("```\nAVL:\n" + '\n'.join(lines) + "\nfinal AVL tree:\n" + '\n'.join(avl_pic(root))
                + f"\nAVL height = {ah(root)} edges\n\nCLRS RB tree for the same keys:\n" + pic(t)
                + f"\nRB height = {height(t) - 1} edges\n```")

    letters = list("FSQKCLHTVWMRNPABXYDZE")
    bt = BTree(2)
    lines = []
    for k in letters:
        log = []
        bt.insert(k, log)
        bt.check()
        if log:
            lines.append(f"insert {k}: " + '; '.join(log) + "   ->  " + ' / '.join(bt.levels()))
    B['P15'] = ("```\n" + '\n'.join(lines) + "\n\nfinal B-tree (t = 2), by level:\n" + '\n'.join(bt.levels())
                + f"\nheight = {bt.check()}\n```")

    t = fresh(T1)
    B['P16'] = ' / '.join(rb_to_234(t))


    # P16 reverse direction, P17 LLRB small, predecessor-variant trap
    letters = list("FSQKCLHTVWMRNPABXYDZE")
    bt = BTree(2)
    for k in letters:
        bt.insert(k, [])
    rbt = btree_to_rb(bt)
    v = violations(rbt)
    assert not v, v
    B['P16_REV'] = "```\n" + pic(rbt) + f"\n```\nChecked: valid RB tree, bh(root) = {bh(rbt, rbt.root)} = (2-3-4 height {bt.check()}) + 1."

    a = render(fresh([1, 2, 3, 4, 5]))
    b = llrb_pic(llrb_insert_all([1, 2, 3, 4, 5]))
    w = max(max(len(s) for s in a) + 6, len('CLRS (2-3-4 style)') + 4)
    rows = max(len(a), len(b))
    a += [''] * (rows - len(a)); b += [''] * (rows - len(b))
    B['P17'] = "```\n" + f"{'CLRS RB-INSERT':<{w}}algs4 LLRB put()\n" + '\n'.join(f"{x:<{w}}{y}" for x, y in zip(a, b)) + "\n```"

    t_s = fresh(T1); t_s.delete(20)
    t_p = fresh(T1); delete_with_predecessor(t_p, 20)
    assert not violations(t_s) and not violations(t_p)
    a = render(t_s); b = render(t_p)
    w = max(len(s) for s in a) + 8
    rows = max(len(a), len(b))
    a += [''] * (rows - len(a)); b += [''] * (rows - len(b))
    B['PRED_TRAP'] = ("```\n" + f"{'CLRS (successor 25)':<{w}}predecessor 15 + same fixup\n"
                      + '\n'.join(f"{x:<{w}}{y}" for x, y in zip(a, b)) + "\n```")


    return B


def extra_checks():
    """Re-check the side claims made in the notes."""
    out = []
    # 1) every node count between 2^k-1 and 4^k-1 is achievable for black-height k
    @lru_cache(None)
    def sizes(b, color):
        child = set()
        if b == 1:
            child.add(0)
        if b - 1 >= 1:
            child |= sizes(b - 1, BLACK)
        if color == BLACK and b >= 1:
            child |= sizes(b, RED)
        return frozenset(1 + x + y for x in child for y in child)
    for k in range(1, 5):
        s = sorted(sizes(k, BLACK))
        out.append(f"bh={k}: achievable n = {s[0]}..{s[-1]}, contiguous: {s == list(range(s[0], s[-1] + 1))}")
    for n in (7, 14, 20):
        out.append(f"n={n}: possible bh(root) = {[k for k in range(1, 8) if n in sizes(k, BLACK)]}")
    # 2) black-height of the tree grows exactly when the last line of RB-INSERT-FIXUP recolors a red root
    rnd = random.Random(3)
    t = RBTree()
    ok = True
    for _ in range(3000):
        key = rnd.randrange(10 ** 6)
        if t.search(key) is not t.nil:
            continue
        before = bh(t, t.root)
        t.steps, t.cases = [], []
        t.insert(key)
        fired = any('RED -> color it BLACK' in s[0] and 'root' in s[0] for s in t.steps)
        ok &= ((bh(t, t.root) != before) == fired)
        t.steps = t.cases = None
    out.append(f"bh grows exactly when the final root recolor fires (3000 random inserts): {ok}")
    # 3) pre-emptive split example: insert D into [F Q T] / [C] [H K L] [S] [V W]
    bt = BTree(2)
    for k in "FSQKCLHTVW":
        bt.insert(k, [])
    s0 = ' / '.join(bt.levels())
    bt.insert('D', [])
    out.append(f"CLRS B-tree t=2: {s0}  --insert D-->  {' / '.join(bt.levels())}")
    # 4) how trace D's deletion order was chosen: maximize distinct fixup cases
    keys = [10, 20, 30, 15, 25, 5, 1]

    def distinct_cases(seq):
        t = RBTree()
        for k in keys:
            t.insert(k)
        seen = set()
        for k in seq:
            t.cases = []
            t.delete(k)
            seen |= set(t.cases)
            t.cases = None
        return len(seen)
    best = max(distinct_cases(seq) for L in (3, 4, 5) for seq in itertools.permutations(sorted(keys), L))
    chosen = (20, 15, 30, 1, 5)
    out.append(f"max distinct fixup cases over all deletion orders of <= 5 keys: {best}; "
               f"trace D order {chosen} reaches {distinct_cases(chosen)}")
    return out


ORDER = ['ROT_DEMO', 'INS_T1', 'T1_FINAL', 'T1_BH', 'INS_FIG134', 'INS_MIT', 'INS_CAT', 'STRESS', 'DEL_T1', 'DEL_CAT',
         'AVL_T1', 'AVL_DEL_MULTI', 'BTREE_T1', 'LLRB_VS_CLRS', 'PRED_TRAP', 'P1', 'P2', 'P3', 'P3_FINAL', 'P4', 'P5',
         'P6', 'P7_Q', 'P7_A', 'P8_Q', 'P8_A', 'P9_TABLE', 'P10', 'P13', 'P14', 'P15', 'P16', 'P16_REV', 'P17']

# ---- try your own sequences here -------------------------------------------
MY_INSERTS = [10, 20, 30, 15, 25, 5, 1]
MY_DELETES = [20, 15, 30, 1, 5]


def main():
    import sys
    B = build_blocks()
    if '--json' in sys.argv:
        import json
        print(json.dumps(B, indent=1))
        return
    for name in ORDER:
        print(f"\n======== {name} ========")
        print(B[name])
    print("\n======== extra checks ========")
    print('\n'.join(extra_checks()))
    print("\n======== your own sequence (edit MY_INSERTS / MY_DELETES) ========")
    t = RBTree()
    print(run_ops(t, [('ins', k) for k in MY_INSERTS] + [('del', k) for k in MY_DELETES]))


if __name__ == '__main__':
    main()
