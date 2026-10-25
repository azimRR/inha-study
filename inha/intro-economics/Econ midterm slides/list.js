/* The professor's midterm slide list (from the student's notes, 24 Oct 2026). */
const WEEKS = {
  1: "Week 1 - What is economics", 2: "Week 2", 3: "Week 3 - Law of supply and demand",
  4: "Week 4 - The market strikes back", 5: "Week 5 - Elasticity",
  6: "Week 6 - Behind the supply curve", 7: "Week 7 - Perfect competition",
};
const LIST = [
  { id: "Q1-2", label: "Q1–Q2", week: 1, slides: [48, 49, 50, 51] },
  { id: "Q3", label: "Q3", week: 1, slides: [12] },
  { id: "Q4", label: "Q4", week: 1, slides: [33] },
  { id: "Q5-6", label: "Q5–Q6", week: 3, slides: [18, 19] },
  { id: "Q7", label: "Q7", week: 3, slides: [15] },
  { id: "Q8", label: "Q8", week: 1, slides: [25, 26, 27, 28] },
  { id: "Q9", label: "Q9", week: 5, slides: [12] },
  { id: "Q10", label: "Q10", week: 6, slides: [25] },
  { id: "Q11", label: "Q11", week: 7, slides: [3, 4] },
  { id: "Q12", label: "Q12", week: 7, slides: [17] },
  { id: "Q13", label: "Q13", week: 4, slides: [13] },
  { id: "Q14", label: "Q14", week: 4, slides: [20, 21, 22, 23, 25] },
  { id: "Q15", label: "Q15", week: 3, slides: [29, 30], note: "Your note says W5 S29–30, but week 5 has only 25 slides. Shown: week 3 slides 29–30. Check your note." },
  { id: "Q16", label: "Q16", week: 4, slides: [25, 29] },
  { id: "Q17", label: "Q17", week: 5, slides: [9] },
  { id: "Q18", label: "Q18", week: 5, slides: [11, 12] },
  { id: "Q19", label: "Q19", week: 6, slides: [4, 8] },
  { id: "Q21-22", label: "Q21–Q22", week: 6, slides: [24] },
  { id: "Q23", label: "Q23", week: 7, slides: [11] },
  { id: "Q24", label: "Q24", week: 7, slides: [15] },
  { id: "Q25", label: "Q25", week: 5, slides: [6], calc: true },
  { id: "Q26", label: "Q26", week: 5, slides: [5], calc: true },
  { id: "Q27", label: "Q27", week: 6, slides: [16], calc: true },
  { id: "Q28", label: "Q28", week: 3, slides: [21, 22, 6], calc: true },
  { id: "Q29-31", label: "Q29–Q31", week: 2, slides: [25], calc: true },
];
const IMG = (w, n) => encodeURI(`../A - FROM CLASS (slides only)/slide-images/${WEEKS[w]}/slide-${String(n).padStart(2, "0")}.png`);
const PDF = (w) => encodeURI(`../A - FROM CLASS (slides only)/slides-pdf/${WEEKS[w]}.pdf`);
const byId = (id) => (typeof EX !== "undefined" ? EX : []).find((e) => e.id === id);
/* one entry per professor slide, in list order (for "slides only" mode) */
const FLAT = LIST.flatMap((q) => q.slides.map((s, i) => ({ q, s, i })));
