# Brief: practice questions for the SA study page

Lessons already exist in `/Users/azim/study/inha/system-analysis/SA lessons/lessons/S1.json … S7.json` (one JSON array per week; each lesson has id, title, cards, example, check, exam). Read the lessons you are given first: they hold the verified facts and numbers. Slide text is in `/Users/azim/study/inha/system-analysis/A - FROM CLASS (slides only)/slide-text/`, and `MIDTERM REVIEW (from slides only).md` in that folder lists the professor's own questions (§2) and traps (§9).

Your job: for **each lesson** you are given, write **4–6 practice questions** in Prof. Dragunov's exam style, so the student can practise beyond the lesson's own self-test. The page numbers them 1.1, 1.2, 1.3 …

## His question styles (from Quiz 1 and his review slides): mix them
- **"Depict graphically: …"**: draw a methodology / Scrum cycle / Gantt / network / use-case or activity diagram. The answer gives the diagram (Mermaid) and the key labels to include.
- **Calculation**: ROI / BEP / NPV (cash-flow table), critical path (forward pass, duration, which tasks can slip), duration analysis, communication lines. Always **new numbers**, full working, **checked with python3**.
- **MCQ**: 4 options (A–D), with one correct answer and a one-line reason.
- **Short answer / define / list / compare** (e.g. "List the 5 elements of a system request", "Compare BPA, BPI and BPR").
- **Apply to a scenario**: a small realistic case (a café app, university registration), e.g. "which methodology / which requirements technique, and why?".
- **Classify**: functional vs non-functional, tangible vs intangible, and so on.

Don't repeat the lesson's existing check/exam questions word for word; write new ones.

## Format
- Simple English. Answers written the way a top student writes them on the exam sheet: short and complete.
- HTML in q/a: p, b, i, ul, ol, li, table/tr/th/td, br, sub, sup. Escape literal < and > as &lt; &gt;.
- No slide numbers or slide references in questions or answers.
- Diagrams: put Mermaid code in an optional `"diagram"` field of the question (shown under the answer). Use the same Mermaid rules as `BRIEF.md` in this folder (quote labels with special characters; flowchart / gantt only; 4–15 nodes). Mentally check the syntax.

## Output: valid UTF-8 JSON array, written to the file you are given
```json
[
  { "lesson": "W3-3",
    "questions": [
      { "type": "calculation", "q": "<p>…</p>", "a": "<p>…</p>" },
      { "type": "drawing", "q": "<p>Depict graphically: …</p>", "a": "<p>key points…</p>", "diagram": "flowchart LR\n …" },
      { "type": "mcq", "q": "<p>… A) … B) … C) … D) …</p>", "a": "<p><b>C</b>, because …</p>" }
    ] }
]
```
`type` is one of: drawing, calculation, mcq, short, scenario, classify.
When finished, reply in 2 sentences: what you wrote and anything uncertain.
