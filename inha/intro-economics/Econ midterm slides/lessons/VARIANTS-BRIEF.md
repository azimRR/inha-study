# Brief: practice-question variants (Intro to Economics midterm)

The professor told the class which slides each midterm question (Q1–Q31) comes from. A lesson for each question already exists in `/Users/azim/study/inha/intro-economics/Econ midterm slides/lessons/L1.json … L6.json`: read the lesson(s) you are given first. They contain the verified facts and numbers. Slide text is in `/Users/azim/study/inha/intro-economics/A - FROM CLASS (slides only)/slide-text/` and images in `slide-images/`, if you need them.

Your job: for **each question number** you are given, write **3 practice variants**: three different ways the professor could ask that question, so the student is ready whatever the wording. The student labels them 1.1, 1.2, 1.3.

## Rules
- Each variant must be answerable from what that question's slides teach. Vary the angle: define/explain · compare/list · apply to a small scenario · draw-and-explain a graph · true/false-with-reason · short calculation with new numbers.
- **Calculation questions (Q25–Q31):** all 3 variants are calculations with **new numbers**, in the same style as the slide. Give full step-by-step solutions. **Check every number with python3.**
- **Grouped questions** (e.g. "Q1–Q2", "Q21–Q22", "Q29–Q31") come as separate numbers: write 3 variants for EACH number (Q1 and Q2, …). Split the slides' content sensibly between them (e.g. Q1 = equilibrium, Q2 = efficiency/equity/government), and say in the output which part each covers.
- Answers: written the way a top student would write them on the exam sheet. Short and clear (3–8 lines for theory; full working for calculations). Simple English.
- No slide numbers in the questions or answers (the student does not want slide references).
- HTML allowed in q/a: p, b, i, ul, ol, li, table/tr/th/td, br, sub, sup. Escape literal < and > as &lt; &gt;.

## Output: valid UTF-8 JSON array, written to the file you are given
```json
[
  { "q": "Q1", "focus": "Equilibrium (what it is, why markets move toward it)",
    "variants": [
      { "q": "<p>question text</p>", "a": "<p>model answer</p>" },
      { "q": "…", "a": "…" },
      { "q": "…", "a": "…" }
    ] }
]
```
Order: by question number as given. When finished, reply in 2 sentences: what you wrote and anything uncertain.
