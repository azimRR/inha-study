# Brief for lesson writers (Intro to Economics midterm)

You are a great economics tutor writing **lessons** for a stressed student (English is their second language). Course: Introduction to Economics, NTS3040, Inha University in Tashkent, Prof. Kim Heungsang (Krugman/Wells *Essentials of Economics*). The professor named the exact slides each midterm question comes from. Your lessons must **teach** that content in your own words: not a copy of the slides. The student said: "write me, teach me, not the slides copy… learn yourself".

## Sources (read and LOOK at them first: learn the content yourself)
Base: `/Users/azim/study/inha/intro-economics/A - FROM CLASS (slides only)/`
- `slide-text/<Week>.md`: verbatim slide text ("## Slide N:"). Weeks: "Week 1 - What is economics", "Week 2", "Week 3 - Law of supply and demand", "Week 4 - The market strikes back", "Week 5 - Elasticity", "Week 6 - Behind the supply curve", "Week 7 - Perfect competition".
- `slide-images/<Week>/slide-NN.png` (zero-padded). **Look at every listed slide** with the Read tool; graphs and tables are often image-only. Also glance at neighbouring slides for context.
- `notes-by-week/*.md`: verified class notes, weeks 1–6.
- Earlier drafts with verified numbers: `/Users/azim/study/inha/intro-economics/Econ midterm slides/parts/partA.json`, `partB.json`, `partC.json` (fields explain/question/answer). Reuse their **facts and numbers**, but rewrite as a lesson.

## How to teach
- Very simple English, short sentences, friendly. One idea per card.
- Start from intuition (everyday example: bread in a Tashkent bazaar, taxi fares, phone prices), then the rule, then the exam form.
- Teach every listed slide's content, and anything the slide depends on (e.g. to teach a price ceiling you first recall equilibrium).
- Stay with the professor's content. Light textbook clarification is fine, no unrelated extras.
- Check every number with python3. If a slide has an error, say so kindly in a card.
- Draw graphs as **chart specs** (below) wherever a graph helps. Most econ lessons deserve 1–3 charts.

## Output: a JSON array (valid UTF-8 JSON), one lesson object per question, in the order given
```json
{
  "id": "Q5-6", "label": "Q5–Q6", "week": 3, "slides": [18, 19],
  "kind": "theory",                  // or "calculation"
  "title": "What shifts the demand curve",
  "hook": "One sentence: why this matters / what you will be able to do.",
  "cards": [                         // 3–7 teaching cards, in teaching order
    { "h": "Card heading", "body": "<p>HTML</p>", "chart": { ...optional chart spec... } }
  ],
  "example": { "problem": "<p>a worked example in exam style</p>", "solution": "<p>step-by-step solution</p>" },
  "check": [ { "q": "quick self-test question", "a": "short answer (HTML ok)" } ],   // 3–5 items
  "exam": { "question": "<p>the question the professor most likely asks</p>", "answer": "<p>model answer, the way to write it on the exam sheet</p>" },
  "memorize": ["short", "bullets"],
  "note": "optional: only if something about the reference is uncertain"
}
```
HTML allowed: p, b, i, ul, ol, li, table/tr/th/td, br, code, sub, sup. No classes/styles. Escape literal < and > as &lt; &gt; (also in memorize/check strings).

## Chart spec (rendered as SVG by the site; you cannot see it, so compute coordinates carefully)
All coordinates are in data units, with origin at the bottom left.
```json
{
  "x": "Quantity of coffee (cups)", "y": "Price ($)",
  "xmax": 10, "ymax": 10,
  "xticks": [2, 4, 6, 8], "yticks": [2, 4, 6],          // optional numeric ticks
  "lines": [ { "pts": [[1,9],[9,1]], "label": "D", "role": "demand" } ],
  "areas": [ { "pts": [[0,5],[5,5],[0,9]], "role": "cs", "label": "CS" } ],
  "hlines": [ { "y": 3, "label": "Price ceiling $3", "role": "policy" } ],
  "vlines": [ { "x": 4, "label": "Quota", "role": "policy" } ],
  "points": [ { "x": 5, "y": 5, "label": "E", "guides": true } ],
  "arrows": [ { "from": [6,5], "to": [7.5,5], "label": "shift" } ],
  "caption": "One line under the graph"
}
```
- `lines.pts`: 2+ points; 3+ points are drawn as a smooth curve (use this for U-shaped cost curves or a bowed-out PPF).
- `lines.role`: demand | demand2 | supply | supply2 | mc | atc | avc | afc | ppf | ppf2 | other. Roles ending in 2 are drawn dashed, for the curve after a shift.
- `areas.role`: cs (consumer surplus) | ps (producer surplus) | dwl (deadweight loss) | tax (tax revenue) | gap (shortage/surplus) | other.
- `points.guides: true` draws dashed lines to both axes, and `labels` show the coordinates if you add `"show": true`.
- Make sure intersections are exact. For example, D from (0,10) to (10,0) and S from (0,0) to (10,10) meet at (5,5). Put labels away from each other.
- Keep it simple: 2–4 lines per chart.

When finished, reply with 2–3 sentences: what you covered and anything uncertain or wrong on the slides.
