# Computer Algorithm (SOC3030-003): midterm kit (START HERE)

**Midterm:** week 8 (24–30 Oct 2026; classes are Tue/Wed). It is worth **25%** and covers **weeks 1–7**. Assignments are worth **30%** in total (handwritten, uploaded as scans), Quiz 10%, Attendance 5%, Discussion 5%.

⚠️ **Assignment #2 (sorting) was never submitted** (it was due 9 Oct). Ask Prof. Seth whether a late submission is possible. Assignment #1 scored 4.25/5.

## ⭐ How this professor examines (from his assignments)
- **He lifts questions straight from his slides.** Assignment 1 Q3a and Q3b are examples #1 and #5 from his Master-theorem slide. Learn **all 14 Master-theorem examples on D05-S6**; they are all solved in the assignments guide.
- **He grades the working**:
  - c and n₀ for O and Ω;
  - the filled [a, b, k, p] / Case / Answer boxes for the Master theorem;
  - **one row per loop iteration** for heap/partition/merge traces, with the index values in the margin.

  Marks move in 0.25 steps, so partial credit counts.
- **His conventions:**
  - quicksort uses **Lomuto partition** (pivot = last element, `A[j] ≤ x`);
  - heap tables are **0-based** (`left = 2i+1`, `right = 2i+2`), even though his pseudocode is 1-based.

## The two tracks (kept separate on purpose)
| Folder | Contents |
|---|---|
| `A - FROM CLASS (slides only)/` | Only the professor's slides (261, including speaker notes and hidden slides), his assignments and his sample solution |
| `B - OUTSIDE (internet research)/` | Cited research (MIT 6.006/6.046, Erickson, Princeton, …), with verification scripts |

### A: FROM CLASS
1. **`MIDTERM REVIEW (from slides only).md`** ← **main file** ✅. It contains:
   - §1 his answer format
   - §2 13 step-by-step recipes
   - §4 the formula sheet
   - §5 **all 14 Master-theorem examples**
   - §6 the traps and slide errors, including the full list of hidden slides
   - §7 a **90-minute mock midterm** (13 questions)
   - §8 a full answer key, generated with the class conventions
   - §9 the last-48-hours checklist
2. **`assignments/Assignments 1-2 - worked study guide (class material).md`**. Read this early. It contains:
   - his question style;
   - full A1 solutions;
   - A2 solved with **both** the sample's numbers and **your sheet's** numbers;
   - all 14 Master-theorem examples;
   - 8 new practice questions.
3. `notes-by-week/`, slide-by-slide, every trace verified by running his pseudocode:
   - W1 fundamentals and ADT
   - W2–3 asymptotics, recursive running times and the **Master theorem**
   - W3–4 insertion sort, quicksort and merge sort
   - W4–5 heap, bucket and radix sort
   - W5–7 amortized analysis and **red-black trees**
4. `slides-pdf (rendered)/` and `slides-pptx (original)/`: the actual slides.

### B: OUTSIDE
- `research_notes/Algorithms midterm research/`:
  - `01` asymptotics and recurrences
  - `02` sorting, with trace scripts
  - `03` amortized analysis and ADTs
  - `04` red-black/AVL/B-trees, with **`04_rb_verify.py`**. Edit `MY_INSERTS`/`MY_DELETES` to trace any sequence.
- **`reports/Algorithms midterm research.md`**: the combined research report. ✅ Done.

## ⚠️ Exam traps found in the slides
- **Master theorem case 3(b)** (a < bᵏ, p < 0 ⇒ Θ(nᵏ)) is wrong as a Θ; the true answer is Θ(nᵏ·logᵖ n). GeeksforGeeks has the same error. Give the class answer, and note that nᵏ is only an upper bound.
- **D05-S6 examples #8 and #10:** the Master theorem doesn't apply to them (a < 1 or k < 0; a negative driving function).
- **D01-S7:** the binary-search code is missing braces, so it doesn't compile as typed.
- **Hidden slides (🙈):** D01-S26–S29 and D02-S5 are hidden in the original deck and may not have been shown in class.
- **Red-black deletion:** the **professor's class algorithm replaces a deleted two-child node with its in-order PREDECESSOR**. The USFCA visualizer does the same; the textbook (CLRS) uses the successor. D13-S5 allows either, but answer with the predecessor unless told otherwise. Left-leaning RB material (Princeton/Sedgewick) gives different trees, so ignore it.
- **D13-S8, deletion Case 2:** the "Or" shortcut (swap the parent's and sibling's colours) only works when **both of the sibling's children are black**. Otherwise use Case 3(5); deleting 52 in the class exercise is an example. The rule-sheet line "Apply case 6" should read "Apply case 3(5)".
- **D13-S13:** the starting tree is not a valid RB tree (the black-heights are unequal).
- **D11-S9 (the puppy amortized table):** two totals are wrong: 10 should be 9, and 34 should be 33.
- **D12-S16:** "parent is not BLACK **or** x is not root" should be "**and**".
