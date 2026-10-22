# System Analysis (SOC3070-002): midterm kit (START HERE)

**Midterm:** week 8 (24–30 Oct 2026). Classes are Tue/Thu, so it's probably **Tue 27 or Thu 29 Oct**. It is worth **40%**. 2 quizzes are worth 10% in total. Late homework is not accepted.
**Announcements** come through the course **Telegram group**: https://t.me/+x9d1UZWKtw1hOTZi. The eclass board is empty, so check Telegram for the exam date, Quiz 2 and the "AI vs human requirement analysis" homework.
**Textbook:** Dennis, Wixom & Roth, *Systems Analysis and Design*, 8th ed.

## ⭐ How this professor examines (from Quiz 1, which is on Week 4 slides S2–S5)
Every version of Quiz 1 had the same two parts:
1. **"Depict graphically: <Waterfall / Parallel / Phased> development methodology"**. You draw the methodology diagram from Week 1 (W1b) from memory.
2. **A cash-flow problem: "Find ROI, BEP and NPV for a 3-year life at X%"** (method from Week 3):
   - development costs go in Year 0;
   - operational costs and benefits come every year;
   - ROI = (total benefits − total costs) / total costs;
   - BEP = the year the cumulative cash flow turns positive, plus the fraction of that year;
   - NPV = −dev cost + Σ net flow / (1 + r)ᵗ.

Practice these two skills first.

## The two tracks (kept separate on purpose)
| Folder | What's inside | Use it for |
|---|---|---|
| `A - FROM CLASS (slides only)/` | Only the professor's slides and quizzes (340 slides, weeks 1–6) | **What he tests** |
| `B - OUTSIDE (internet research)/` | Cited internet research | **Understanding**, the textbook's wording, extra practice |

### A: FROM CLASS
1. **`MIDTERM REVIEW (from slides only).md`** ← **main file**. It contains:
   - **§1** his question styles, with checklists for redrawing all 7 methodology diagrams and a worked ROI/BEP/NPV model answer
   - **§2** every question of his that appears on the slides (Quiz 1 V1–V4, review MCQs, small practices), answered
   - **§4–5** definitions and 23 lists/tables to memorize
   - **§6** 6 calculation drills (3 in Quiz 1 format, 2 CPM, 1 duration analysis)
   - **§7–8** a 27-question mock midterm (about 90 min) with a full answer key
   - **§9** slide traps and errors
   - **§10** the last-48-hours checklist
2. `notes-by-week/`: slide-by-slide notes, each file with about 20 practice questions:
   - W1 SDLC & methodologies
   - W2 Agile/Scrum/Kanban/DevOps
   - W3 Planning & feasibility (ROI/BEP/NPV)
   - **W4 Project management + QUIZ 1 (all 4 versions solved)**
   - W5a Staffing/CASE
   - W5b Requirements 1
   - W6 Requirements 2
3. `slides-pdf (original)/`: the professor's PDFs. `slide-images/` and `slide-text/` hold the raw material.

### B: OUTSIDE
`research_notes/System analysis midterm research/` has five files:
- 01 SDLC & methodologies
- 02 Agile/Scrum/Kanban/XP/DevOps
- 03 Planning, feasibility & project management (NPV/ROI, function points, PERT/CPM)
- 04 Requirements determination (including evidence on AI vs human requirement analysis)
- 05 UML use cases & activity diagrams (for week 7)

A final report goes in `reports/` once all five are finished.

## ⚠️ Know before the exam
- **Two slide arithmetic errors in Week 3:**
  - **S27:** the break-even should be **2.66 years**, not 2.68 (41,000 − 14,000 = 27,000, not 28,000). The 8th-edition textbook prints the same slip.
  - **S30:** Year-3 benefits should be **57,000**, not 55,000.
- **The textbook and the slides use pre-2020 Scrum terms** ("ScrumMaster", "Development Team"). Use the slides' wording in the exam.
- **Week 7 (UML use cases and activity diagrams) has no slides yet.** Use Track B file 05 for now, and add the slides when they're uploaded.
