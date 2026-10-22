# Production and Costs: "Behind the Supply Curve: Inputs and Costs" (Krugman & Wells, *Essentials of Economics*), exam-oriented outside notes for the NTS3040 midterm

*Researched 2026-10-19 for the midterm in the week of 24–30 Oct 2026. These notes use outside (internet) sources only and no textbook copies. The researcher calculated every value labelled "computed" and checked it with a Python script. Some numbers come from Krugman's own examples (George & Martha's wheat farm, Selena's Gourmet Salsas). Where those could only be confirmed through search-engine excerpts of the publisher's pages, the notes say so. Check them against your copy of the book.*

---

## 1. Production function, fixed vs variable inputs, short run vs long run, TP/MP/AP, and diminishing returns (worked wheat table)

### Takeaway
A production function links inputs to output. In the short run at least one input (land or capital) is fixed, so each extra unit of the variable input (labor) eventually adds less output than the one before. That is diminishing returns to an input. In calculus terms, f′(L) > 0 but f″(L) < 0. Krugman's wheat numbers (0, 19, 36, 51, 64, 75, 84, 91, 96) fit **Q = 20L − L²** exactly. Marginal product therefore falls by 2 bushels per worker (19, 17, …, 5), while total output keeps rising.

### Cited Findings
- **Chapter location.** In the 6th edition (©2023) of *Essentials of Economics*, Part 3 "The Production Decision" contains Ch. 6 "Behind the Supply Curve: Inputs and Costs" and Ch. 7 "Perfect Competition and the Supply Curve". — [Macmillan Learning, Essentials of Economics 6e](https://store.macmillanlearning.com/us/product/Essentials-of-Economics/p/1319330134). (Editions co-authored with Kathryn Graddy may number chapters differently.)
- **Krugman's example.** George and Martha's farm produces wheat from land and labor. Land is fixed at 10 acres and the number of workers varies. The textbook shows a total product curve (panel a) and a marginal product of labor curve (panel b). — [Macmillan publisher module "Value of the Marginal Product" (search-indexed excerpt; the host was unreachable during research)](http://digfir-published.macmillanusa.com/krugmanwellsmodulesmicro3eupdate/krugmanwellsmodulesmicro3eupdate_ch19_7.html)
- **Production function:** "a mathematical expression or equation that explains the engineering relationship between inputs and outputs." — [OpenStax 3e §7.2](https://openstax.org/books/principles-economics-3e/pages/7-2-production-in-the-short-run)
- **Fixed inputs** "can't easily be increased or decreased in a short period of time". **Variable inputs** "can easily be increased or decreased in a short period of time." — [OpenStax §7.2](https://openstax.org/books/principles-economics-3e/pages/7-2-production-in-the-short-run)
- **Short run:** "the period of time during which at least some factors of production are fixed." **Long run:** "the period of time during which all factors are variable." — [OpenStax §7.2](https://openstax.org/books/principles-economics-3e/pages/7-2-production-in-the-short-run)
- **Total product:** "the amount of output produced with a given amount of labor and a fixed amount of capital." **Marginal product:** "the additional output of one more worker", which is the change in total product divided by the change in labor. — [OpenStax §7.2](https://openstax.org/books/principles-economics-3e/pages/7-2-production-in-the-short-run)
- **Law of diminishing marginal product:** "as we add workers, the marginal product increases at first, but sooner or later additional workers will have decreasing marginal product." OpenStax's lumberjack table: 1 worker → 4 trees, 2 → 10, 3 → 12, 4 → 13, 5 → 13, giving MP = 4, 6, 2, 1, 0. Note that MP rises before it falls. — [OpenStax §7.2](https://openstax.org/books/principles-economics-3e/pages/7-2-production-in-the-short-run)
- **Why it happens (mechanism).** In the barber-shop example with a fixed shop, "the advantage of each additional barber is less, since the specialization of labor can only go so far." — [OpenStax §7.3](https://openstax.org/books/principles-economics-3e/pages/7-3-costs-in-the-short-run)
- **Calculus form.** MPL = ∂Y/∂L, the first derivative of the production function. Diminishing returns means "as units of one input are added (with all other inputs held constant) a point will be reached where the resulting additions to output will begin to decrease". That is a negative second derivative. — [Wikipedia: Marginal product of labor](https://en.wikipedia.org/wiki/Marginal_product_of_labor)
- **Average product.** APL = Q/L. "At the point the APL reaches its maximum value APL equals the MPL." When MPL > APL, APL rises; when MPL < APL, APL falls. — [Wikipedia: Marginal product of labor](https://en.wikipedia.org/wiki/Marginal_product_of_labor)
- **Real-world illustration (Brooks's law).** Fred Brooks wrote in *The Mythical Man-Month* (1975): "Adding manpower to a late software project makes it later." His reasons were ramp-up time for new staff, communication overhead that grows with team size, and limited divisibility of tasks ("nine women can't make a baby in one month"). Brooks himself called the law an "outrageous oversimplification." — [Wikipedia: Brooks's law](https://en.wikipedia.org/wiki/Brooks%27s_law)

### Inferences
#### Intuition: why diminishing returns happen
- The fixed input is shared. Ten acres split among 1, 2, 3 … workers means each new worker has less land to work with, and eventually workers get in each other's way. Each additional worker therefore adds less wheat than the one before.
- This is **not** because later workers are less skilled. All workers are identical in the model, and the decline comes entirely from **holding the other input fixed**. Write "holding the quantity of land (the fixed input) constant" in exam answers.
- Early on, MP can *rise* because of specialization (OpenStax's lumberjacks and barbers). Diminishing returns describes what happens *eventually* (see Section 4).

#### Worked table: George & Martha's wheat farm (labor and output from the assignment brief; MPL and APL computed)

| Workers L | Wheat Q (bushels) | MPL = ΔQ/ΔL | APL = Q/L |
|---|---|---|---|
| 0 | 0 | — | — |
| 1 | 19 | 19 | 19 |
| 2 | 36 | 17 | 18 |
| 3 | 51 | 15 | 17 |
| 4 | 64 | 13 | 16 |
| 5 | 75 | 11 | 15 |
| 6 | 84 | 9 | 14 |
| 7 | 91 | 7 | 13 |
| 8 | 96 | 5 | 12 |

How to read the table:
- MPL falls with every worker (19 → 17 → … → 5), so diminishing returns apply from the 2nd worker onward.
- Total product **still rises** (to 96) because MPL is still positive.
- Because MPL < APL from the 2nd worker on, APL falls too (19 → 12).

#### Calculus view (the professor's f′ > 0, f″ < 0)
- **Computed check:** f(L) = 20L − L² reproduces every number (f(1) = 19, f(2) = 36, …, f(8) = 96).
- f′(L) = 20 − 2L > 0 for L < 10, so labor is productive. f″(L) = −2 < 0, so there are **diminishing returns at every L**.
- The table's MPL between L−1 and L equals 21 − 2L, which is f′(L − ½). This holds exactly because f is quadratic, which is why MP is plotted at the midpoints between worker counts.
- APL = f(L)/L = 20 − L. In general, d(APL)/dL = (f′·L − f)/L² = (MPL − APL)/L, so AP rises when MP > AP, falls when MP < AP, and peaks where MP = AP.
- Output is maximized where f′(L) = 0, at L = 10 and Q = 100. An 11th worker would have *negative* MP, like OpenStax's 7th barber (see Section 4).

#### Graphs in words
- **Total product curve:** starts at the origin and rises, getting flatter as it goes (concave). Its slope at any point is MP.
- **MP curve:** slopes downward. In the wheat example it is a straight line falling 2 bushels per worker.
- **AP curve:** in this example it sits above MP and falls. In the general case with early specialization, MP rises first, crosses AP at AP's maximum, then falls below it.

#### Exam traps
1. Diminishing returns ≠ total output falling. TP keeps rising as long as MP > 0.
2. Diminishing returns ≠ negative MP. Negative MP is the extreme case (OpenStax's 7th barber).
3. Diminishing returns is a **short-run** concept: one input varies and the others are fixed. It is not the same as diseconomies of scale, which is a **long-run** concept where all inputs vary (see Section 5).
4. The short run and long run are defined by **whether any input is fixed**, not by a number of months.
5. "MP of the 3rd worker" means TP(3) − TP(2). TP(3)/3 is AP, not MP.

### Gaps
- Krugman's own wording could not be read from a legitimate free source. The publisher's module pages (digfir-published.macmillanusa.com) did not resolve, and unauthorized copies were avoided. The wheat output numbers come from the assignment brief; only the context (10 acres, TP/MP figures) was confirmed, via a search excerpt.
- It is not verified whether *Essentials* covers average product explicitly. The AP material here comes from standard theory as given on Wikipedia.

---

## 2. Costs: explicit vs implicit, accounting vs economic profit, FC/VC/TC, deriving the total cost curve, and MC = wage ÷ MPL

### Takeaway
Economic profit = TR − (explicit + implicit costs), so it is always ≤ accounting profit (TR − explicit costs). In the short run, TC = FC + VC, with VC = wage × workers. Each extra worker adds less output, so the TC curve plotted against output gets steeper. The cost of one more unit of output is **MC = w ÷ MPL**.

### Cited Findings
- **Explicit costs** are "out-of-pocket costs, that is, actual payments", such as wages or office rent. **Implicit costs** are "the opportunity cost of using resources that the firm already owns". — [OpenStax §7.1](https://openstax.org/books/principles-economics-3e/pages/7-1-explicit-and-implicit-costs-and-accounting-and-economic-profit)
- **Accounting profit** = "total revenue minus explicit costs". **Economic profit** = "total revenue minus total cost, including both explicit and implicit costs". — [OpenStax §7.1](https://openstax.org/books/principles-economics-3e/pages/7-1-explicit-and-implicit-costs-and-accounting-and-economic-profit)
- Khan Academy's unit gives the same definitions: economic profit = total revenues minus explicit plus implicit costs, and accounting profit = total revenues minus explicit costs, including depreciation. — [Khan Academy: Explicit and implicit costs and accounting and economic profit](https://www.khanacademy.org/economics-finance-domain/microeconomics/firm-economic-profit/modal/a/explicit-and-implicit-costs-and-accounting-and-economic-profit-cnx)
- **Worked example (Eryn).** Eryn considers leaving a corporate law job that pays $125,000 to run her own practice. Expected revenue is $200,000. Explicit costs are office rent $50,000 plus a law clerk $35,000, a total of $85,000. The implicit cost is the forgone salary of $125,000. Accounting profit is **$115,000**; economic profit is **−$10,000**. — [OpenStax §7.1](https://openstax.org/books/principles-economics-3e/pages/7-1-explicit-and-implicit-costs-and-accounting-and-economic-profit)
- **OpenStax self-check.** Revenue is $1,000,000; labor $600,000; capital $150,000; materials $200,000. Accounting profit is **$50,000**. The factory sits on firm-owned land that could be rented for $30,000, so economic profit is **$20,000**. — [OpenStax Ch. 7 self-check](https://openstax.org/books/principles-economics-3e/pages/7-self-check-questions); [OpenStax answer key](https://openstax.org/books/principles-economics-3e/pages/chapter-7)
- **Cost identities.** TC = FC + VC. Fixed costs are incurred before any output is produced; variable costs are incurred in the act of producing and rise or fall with output. Barber-shop data: FC $160 and $80 per barber, so TC = $240, 320, 400, 480, 560, 640, 720 for 1–7 barbers. — [OpenStax §7.3](https://openstax.org/books/principles-economics-3e/pages/7-3-costs-in-the-short-run)
- **From inputs to costs.** Short-run total cost STC = P_K·K + P_L·L. "Marginal cost equals w/MPL". SRAVC = wL/Q. — [Wikipedia: Cost curve](https://en.wikipedia.org/wiki/Cost_curve)
- **Derivation.** MC = ΔVC/ΔQ and VC = wL, so MC = w/MPL. "Rising MPL correlates with falling marginal costs, and vice versa." — [Wikipedia: Marginal product of labor](https://en.wikipedia.org/wiki/Marginal_product_of_labor)

### Inferences
#### Worked example A: Eryn (OpenStax numbers, laid out exam-style)

| Item | Amount |
|---|---|
| Total revenue | $200,000 |
| − Explicit costs (rent $50,000 + clerk $35,000) | −$85,000 |
| **= Accounting profit** | **$115,000** |
| − Implicit cost (forgone salary) | −$125,000 |
| **= Economic profit** | **−$10,000** (she is better off staying employed) |

#### Worked example B (hypothetical, computed): a café in Tashkent
Dilnoza's café has revenue of $120,000 a year. She pays $70,000 for rent, ingredients and staff. She gave up a $30,000 salary, and she put $50,000 of her own savings into the café that could otherwise earn 10% ($5,000 a year).
- Accounting profit = 120,000 − 70,000 = **$50,000**.
- Implicit costs = 30,000 + 5,000 = $35,000.
- Economic profit = 50,000 − 35,000 = **$15,000** > 0. Keeping the café beats her next-best alternative.

#### Worked example C: from the wheat production function to the cost table (computed)
*Assumption: fixed cost (land) = $400 and wage = $200 per worker. These match the researcher's recollection of Krugman's table but could not be verified online (see Gaps). The method is the same for any numbers.*

| L | Q (bushels) | MPL | VC = $200·L | TC = $400 + VC | MC per bushel = $200 ÷ MPL |
|---|---|---|---|---|---|
| 0 | 0 | — | $0 | $400 | — |
| 1 | 19 | 19 | $200 | $600 | $10.53 |
| 2 | 36 | 17 | $400 | $800 | $11.76 |
| 3 | 51 | 15 | $600 | $1,000 | $13.33 |
| 4 | 64 | 13 | $800 | $1,200 | $15.38 |
| 5 | 75 | 11 | $1,000 | $1,400 | $18.18 |
| 6 | 84 | 9 | $1,200 | $1,600 | $22.22 |
| 7 | 91 | 7 | $1,400 | $1,800 | $28.57 |
| 8 | 96 | 5 | $1,600 | $2,000 | $40.00 |

**How the total cost curve is derived:**
1. Plot TC against **bushels (Q), not workers**.
2. The curve starts at $400 when Q = 0. The vertical intercept equals FC.
3. Each step adds $200 (one more worker) but fewer bushels (19, 17, 15, …). The TC curve therefore gets **steeper** as output rises, and its slope is MC.
4. The TC curve is the "mirror image" of the concave TP curve: diminishing returns in production show up as increasing marginal cost.

#### Why MC = w ÷ MPL (discrete and calculus)
- **Discrete.** The 5th worker costs $200 and adds 11 bushels, so each of those 11 bushels costs 200/11 = **$18.18**. MC is measured per unit of **output**, not per worker.
- **Calculus.** Q = f(L), so VC = w·L(Q). MC = dVC/dQ = w·(dL/dQ) = w / f′(L) = w/MPL.
- Differentiating again gives dMC/dQ = −w·f″(L)/[f′(L)]³. This is positive whenever f′ > 0 and f″ < 0, so **diminishing returns (f″ < 0) imply an upward-sloping MC curve**.
- **Wheat example, continuous version.** L(Q) = 10 − √(100 − Q), so MC(Q) = 100/√(100 − Q). At L = 5 (Q = 75), MC = 200/f′(5) = 200/10 = $20. That lies between the table's $18.18 and $22.22.

#### Exam traps
1. MC is per unit of output. Writing "$200" as the MC of the 5th worker is wrong; the MC of the bushels that worker produces is $200 ÷ 11.
2. TC at Q = 0 equals FC, not zero.
3. Implicit costs are subtracted to get *economic* profit, never added to accounting profit, so economic profit ≤ accounting profit.
4. Interest the owner could have earned on her own money, and the salary she gave up, are implicit costs. They are real costs even though no cash changes hands.
5. Zero economic profit is not "no profit". With positive implicit costs it still means positive accounting profit, because the owner is earning exactly her opportunity cost.

### Gaps
- Krugman's exact fixed-cost and wage values for the wheat farm (assumed $400 and $200 here) could not be verified from an accessible source.
- It is unconfirmed whether *Essentials* covers explicit/implicit costs and accounting/economic profit in Ch. 6 or Ch. 7 (Perfect Competition). The TOC fetched did not list sections. It is also unverified whether the course uses the term "normal profit".

---

## 3. Average costs (ATC, AVC, AFC); why ATC is U-shaped (spreading effect vs diminishing returns effect); minimum-cost output; why MC cuts ATC and AVC at their minimum points

### Takeaway
ATC = AFC + AVC. AFC always falls as fixed cost is spread over more units (the **spreading effect**). AVC eventually rises because more and more variable input is needed per extra unit (the **diminishing returns effect**). ATC is therefore U-shaped, and its bottom is the **minimum-cost output**, where MC = ATC. The calculus proof is one line: d(ATC)/dQ = (MC − ATC)/Q. ATC falls while MC < ATC, rises while MC > ATC, and is at its minimum where MC = ATC. The same holds for AVC.

### Cited Findings
- **Formulas:** ATC = TC/Q, AVC = VC/Q, MC = ΔTC/ΔQ. — [OpenStax §7.3](https://openstax.org/books/principles-economics-3e/pages/7-3-costs-in-the-short-run). AFC = FC/Q. — [ReviewEcon](https://www.reviewecon.com/what-do-i-need-to-know-about-cost-curves)
- **AFC and the ATC–AVC gap.** "Average fixed costs continually decrease as output increases." The vertical distance between ATC and AVC always equals AFC. — [ReviewEcon cost-curve guide](https://www.reviewecon.com/what-do-i-need-to-know-about-cost-curves)
- **Why U-shaped.** Average cost is typically U-shaped "because fixed costs are all incurred before any production takes place and marginal costs are typically increasing." — [Wikipedia: Average cost](https://en.wikipedia.org/wiki/Average_cost)
- **Krugman's two effects, as discussed on Q&A sites.** The spreading effect: with a fixed-cost component, average fixed cost declines as more is produced. The diminishing returns effect: the marginal cost of each additional unit rises because of diminishing returns. The diminishing returns effect dominates when MC lies above ATC. — [Study.com Q&A on spreading vs diminishing returns effect (search excerpt)](https://homework.study.com/explanation/at-what-level-of-output-does-the-diminishing-returns-effect-begin-to-dominate-the-spreading-effect-explain.html)
- **MC–AC relationships.** When average cost is declining, MC < AC. When average cost is rising, MC > AC. When average cost is at a minimum (or maximum), MC = AC. — [Wikipedia: Average cost](https://en.wikipedia.org/wiki/Average_cost)
- "The marginal cost curve intersects both the average variable cost curve and (short-run) average total cost curve at their minimum points." — [Wikipedia: Cost curve](https://en.wikipedia.org/wiki/Cost_curve); same rule in [ReviewEcon](https://www.reviewecon.com/what-do-i-need-to-know-about-cost-curves)
- **Intuition (grade analogy).** "If the score on the most recent quiz you take is lower than your average score on previous quizzes, then the marginal quiz pulls down your average." Similarly, if MC is below average cost, "producing one more additional unit will reduce average costs overall". — [OpenStax §7.3](https://openstax.org/books/principles-economics-3e/pages/7-3-costs-in-the-short-run)
- **Krugman's Selena's Gourmet Salsas example.** Fixed cost is **$108 per day**, the daily rental of food-preparation equipment. The **minimum-cost output is three cases**. At the minimum-cost output, ATC equals MC. The MC curve slopes upward, reflecting diminishing returns to the variable input, and it crosses the ATC curve from below at ATC's lowest point. — [Macmillan, Krugman's Economics for AP, Module 55 "Firm Costs" (publisher page, search-indexed excerpt; host unreachable during research)](http://digfir-published.macmillanusa.com/krugmanapecon2e/krugmanapecon2e_ch55_3.html). Homework sites use the same example with salsa produced in full cases. — [Chegg question stem](https://www.chegg.com/homework-help/questions-and-answers/4-consider-following-costs-selena-s-gourmet-salsa-assume-salsa-produced-cases-full-cases-n-q74862140)
- **A rising MC does not mean a rising AC.** Average cost increases only when MC is greater than AC, so MC can be increasing and still be below AC (AC falling). — [MIT 14.01 Fall 2018 PS3 solutions (OCW mirror; search excerpt)](https://ocw.iti.hr/courses/economics/14-01-principles-of-microeconomics-fall-2018/problem-sets/MIT14_01F18_pset3sol.pdf)

### Inferences
#### Worked table: Selena's Gourmet Salsas (FC = $108 confirmed; VC = 12Q² reconstructed, computed)
VC = 12Q² is the researcher's reconstruction. It reproduces both data points confirmed by search excerpts: a minimum-cost output of 3 cases, and ATC = $120 at 9 cases (Section 5). Verify the VC column against your book.

| Q (cases) | FC | VC | TC | MC (of that case) | AFC | AVC | ATC |
|---|---|---|---|---|---|---|---|
| 0 | 108 | 0 | 108 | — | — | — | — |
| 1 | 108 | 12 | 120 | 12 | 108.00 | 12 | 120.00 |
| 2 | 108 | 48 | 156 | 36 | 54.00 | 24 | 78.00 |
| **3** | 108 | 108 | 216 | 60 | 36.00 | 36 | **72.00 (min)** |
| 4 | 108 | 192 | 300 | 84 | 27.00 | 48 | 75.00 |
| 5 | 108 | 300 | 408 | 108 | 21.60 | 60 | 81.60 |
| 6 | 108 | 432 | 540 | 132 | 18.00 | 72 | 90.00 |
| 7 | 108 | 588 | 696 | 156 | 15.43 | 84 | 99.43 |
| 8 | 108 | 768 | 876 | 180 | 13.50 | 96 | 109.50 |
| 9 | 108 | 972 | 1,080 | 204 | 12.00 | 108 | 120.00 |
| 10 | 108 | 1,200 | 1,308 | 228 | 10.80 | 120 | 130.80 |

- **Reading the table.** The 3rd case costs $60, which is below ATC(2) = $78, so ATC falls to $72. The 4th case costs $84, above $72, so ATC rises to $75. The minimum-cost output is therefore **3 cases**.
- **Plotting tip.** Put each MC value halfway between the two outputs it connects. For example, $60 goes at 2.5 cases, because the continuous MC = 24Q gives 24 × 2.5 = 60. The MC line then passes exactly through the bottom of ATC at (3, $72).

#### Spreading effect vs diminishing returns effect, in numbers (computed from the table)

| Move | Change in AFC (spreading effect) | Change in AVC (diminishing returns effect) | Net change in ATC | Which wins? |
|---|---|---|---|---|
| 1 → 2 | −54.00 | +12 | −42.00 | Spreading |
| 2 → 3 | −18.00 | +12 | −6.00 | Spreading |
| 3 → 4 | −9.00 | +12 | +3.00 | Diminishing returns |
| 4 → 5 | −5.40 | +12 | +6.60 | Diminishing returns |

Model exam sentence: "At low output the spreading effect dominates, because AFC falls a lot, so ATC falls. At high output the spreading effect gets smaller while the diminishing returns effect keeps pushing AVC up, so ATC rises. The bottom of the U, where the two effects balance, is the minimum-cost output."

#### Calculus proof that MC = ATC at minimum ATC (works for any cost function)
1. ATC(Q) = TC(Q)/Q.
2. By the quotient rule, d(ATC)/dQ = [Q·TC′(Q) − TC(Q)]/Q² = **(MC − ATC)/Q**.
3. Since Q > 0, the sign of the slope of ATC is the sign of (MC − ATC):
   - MC < ATC means ATC is falling.
   - MC > ATC means ATC is rising.
   - At an interior minimum, d(ATC)/dQ = 0, which means **MC = ATC**.
4. Just left of the minimum MC < ATC, and just right of it MC > ATC, so **MC cuts ATC from below**.
5. The same steps with VC give d(AVC)/dQ = (MC − AVC)/Q, so MC also passes through the minimum of AVC.
6. FC is a constant, so MC = dTC/dQ = dVC/dQ. **Fixed cost never affects MC.**

The same proof, split into Krugman's two effects:
- ATC = FC/Q + AVC(Q), so d(ATC)/dQ = **−FC/Q²** (spreading effect, always negative) **+ dAVC/dQ** (diminishing returns effect, positive once AVC rises).
- Selena: d(ATC)/dQ = −108/Q² + 12 = 0 gives Q² = 9, so **Q = 3**. Then ATC(3) = 36 + 36 = $72, MC(3) = 24·3 = $72, and the second derivative 216/Q³ > 0 confirms a minimum.

#### Why min AVC comes at a lower output than min ATC
- ATC = AVC + AFC, and AFC is still falling at the bottom of AVC. ATC therefore keeps falling a little after AVC has turned up.
- Rising MC hits the AVC minimum first and the ATC minimum second. The full order is: MC minimum → AVC minimum → ATC minimum (see Sections 4 and 7).

#### Graph in words: the standard short-run cost diagram
- **AFC:** a continuously falling, flattening curve that approaches zero but never reaches it.
- **AVC:** a U-shaped curve that sits lower.
- **ATC:** a U-shaped curve above AVC. The vertical gap between them is AFC, so it narrows as Q grows, but the curves never touch.
- **MC:** cuts through the lowest point of AVC first and then the lowest point of ATC. It is upward-sloping in the Selena case and swoosh-shaped in the realistic case (Section 4).

#### Exam traps
1. "MC is rising, so ATC is rising" is false. Only MC > ATC makes ATC rise.
2. AFC is never U-shaped. The ATC–AVC gap shrinks but never closes.
3. In a table, MC belongs *between* rows. Find the ATC minimum where MC switches from below ATC to above it.
4. The minimum-cost output is not automatically the profit-maximizing output. The firm produces where P = MC (Section 6).
5. A change in FC (rent, a lump-sum fee) shifts AFC and ATC only. MC and AVC do not move (Section 6).

### Gaps
- Krugman's exact wording of the three MC–ATC principles and his formal definitions of the spreading effect and diminishing returns effect could not be quoted from an accessible legitimate source. The definitions above come from secondary Q&A and standard references and agree with them.
- The Selena VC column is reconstructed (see note above).

---

## 4. Does MC always slope upward? Specialization gains, MC first falling then rising (the "swoosh")

### Takeaway
No. With very few workers, adding one allows specialization, so MPL rises and MC = w/MPL **falls**. Once those gains are used up, diminishing returns set in, MPL falls, and MC **rises**. The result is the "swoosh" (Nike-logo) shape. AVC and ATC are then both U-shaped, and MC passes through both minima.

### Cited Findings
- **OpenStax barber shop.** Adding a second barber "reduces the level of disruption from jumping back and forth between tasks, and allows a greater division of labor and specialization". Output goes 16 → 40 → 60 → 72 → 80 → 84 haircuts for 1–6 barbers and **falls to 82 with the 7th**. Reported MC is $3.33, $4.00, $6.67, $10.00 and $20.00 for barbers 2–6. — [OpenStax §7.3](https://openstax.org/books/principles-economics-3e/pages/7-3-costs-in-the-short-run)
- "Marginal cost is relatively high at small quantities of output; then as production increases, marginal cost declines, reaches a minimum value, then rises." The reason given is that "the marginal product of labor initially rises, reaches a maximum value and then continuously falls." — [Wikipedia: Cost curve](https://en.wikipedia.org/wiki/Cost_curve)
- **Common student mistake:** "Assuming MC always slopes upward (it's downward-sloping at low quantities due to increasing marginal returns)." — [ReviewEcon](https://www.reviewecon.com/what-do-i-need-to-know-about-cost-curves)
- **Krugman's wording (secondary summary).** A study summary of Krugman's *Microeconomics* (Canadian 3e) describes the MC curve as "swoosh shaped". It says increased specialization "initially leads to lower marginal cost" and that diminishing returns "set in once the benefits from specialization are exhausted and marginal cost rises". It also describes AVC as "more U shaped rather than upward sloping". — [Sailabus summary of Krugman, Microeconomics Canadian 3e](https://www.sailabus.com/en/summaries/microeconomics-canadian-edition-3rd-edition-krugman/cost-marginal-curve/)
- **Evidence that specialization raises productivity (Adam Smith's pin factory).** Ten workers dividing pin-making into "about eighteen distinct operations" could make "upwards of forty-eight thousand pins in a day", which is 4,800 per person. Working separately, "they certainly could not each of them have made twenty, perhaps not one pin in a day." Smith gives three reasons: increased dexterity, time saved from not switching tasks, and machinery. — [Smith, *Wealth of Nations* I.1, Econlib](https://www.econlib.org/library/Smith/smWN.html?chapter_num=4#book-reader)

### Inferences
#### Worked table: OpenStax barber shop with every cost column (L, Q, FC = $160 and wage = $80 from OpenStax; other columns computed)

| Barbers | Haircuts Q | MPL | APL | VC | TC | MC per haircut = 80/MPL | AFC | AVC | ATC |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 16 | 16 | 16.0 | 80 | 240 | 5.00 | 10.00 | 5.00 | 15.00 |
| 2 | 40 | **24** | 20.0 | 160 | 320 | **3.33 (min MC)** | 4.00 | 4.00 | 8.00 |
| 3 | 60 | 20 | 20.0 | 240 | 400 | 4.00 | 2.67 | **4.00 (min AVC)** | 6.67 |
| 4 | 72 | 12 | 18.0 | 320 | 480 | 6.67 | 2.22 | 4.44 | **6.67 (min ATC)** |
| 5 | 80 | 8 | 16.0 | 400 | 560 | 10.00 | 2.00 | 5.00 | 7.00 |
| 6 | 84 | 4 | 14.0 | 480 | 640 | 20.00 | 1.90 | 5.71 | 7.62 |
| 7 | 82 | −2 | 11.7 | 560 | 720 | n/a (output falls: never hire) | 1.95 | 6.83 | 8.78 |

*Note: the 1st barber's MC is $80 ÷ 16 = $5.00. A fetched summary of the OpenStax table showed $15.00 here, which is the ATC; recompute it yourself.*

What the table shows:
- **The swoosh:** MC goes $5.00 → $3.33 (falling, specialization) → $4.00 → $6.67 → $10.00 → $20.00 (rising, diminishing returns).
- **Order of minima:** MC is lowest around the 2nd barber's output. AVC is lowest at $4.00 between 40 and 60 haircuts. ATC is lowest at $6.67 between 60 and 72 haircuts. MC for the step from 60 to 72 is $6.67, which equals ATC there: MC = ATC at the minimum.

#### Mirror-image rules (derived from MC = w/MPL and AVC = w/APL)
- **Minimum MC ↔ maximum MPL.** When MPL peaks, each unit of output needs the least labor.
- **Minimum AVC ↔ maximum APL.** AVC = wL/Q = w/APL, as in [Wikipedia: Cost curve](https://en.wikipedia.org/wiki/Cost_curve).
- **"MC cuts AVC at its minimum" ↔ "MPL cuts APL at its maximum".** The cost curves are the production curves turned upside down.

#### What to write if asked "Does the MC curve always slope upward?"
"No. At low output, adding workers allows specialization (increasing returns to the variable input), so MPL rises and MC = w/MPL falls. Once the gains from specialization are exhausted, diminishing returns set in and MC rises. A realistic MC curve is therefore swoosh-shaped. AVC and ATC are U-shaped, and MC crosses each at its minimum."

#### Exam traps
1. Krugman's basic Selena table has an always-rising MC, while his "more realistic" curves have a swoosh. Know both, and answer from whatever data the question gives.
2. The downward part of MC is about increasing returns to the *variable input* in the short run. It is not economies of scale, which is a long-run concept.
3. With a swoosh MC, the ordering of minima is MC first, then AVC, then ATC.

### Gaps
- Krugman's own "more realistic cost curves" figure and text could not be quoted directly. The "swoosh" wording rests on a secondary summary of a related Krugman edition, plus a Q&A site seen only in search results.

---

## 5. Long run: LRATC as the envelope of short-run ATC curves; economies of scale, diseconomies of scale, constant returns to scale (causes and real examples)

### Takeaway
In the long run the firm can choose its fixed cost (plant size, equipment). It picks the one that minimizes ATC for the output it expects to produce. The **LRATC** curve is the lower envelope of all the short-run ATC curves and touches each at a single point.
- Where LRATC falls there are **economies of scale** (Krugman also says "increasing returns to scale").
- Where it is flat there are **constant returns to scale**.
- Where it rises there are **diseconomies of scale** ("decreasing returns to scale").

Economies of scale come from specialization, large indivisible set-up costs, and network externalities. Diseconomies come from coordination and communication problems in very large organizations.

### Cited Findings
- **Definitions.** Economies of scale: "as the quantity of output goes up, the cost per unit goes down". Constant returns to scale: the flat part of LRAC, where "average cost of production does not change much as scale rises or falls". Diseconomies of scale: "as the level of output and the scale rises, average costs rise as well", often because of management complexity. — [OpenStax §7.5](https://openstax.org/books/principles-economics-3e/pages/7-5-costs-in-the-long-run)
- **LRAC as an envelope.** LRAC shows "the least expensive average cost curve for any level of output". It is built as an envelope of short-run average cost curves, each with a different fixed cost. — [OpenStax §7.5](https://openstax.org/books/principles-economics-3e/pages/7-5-costs-in-the-long-run)
- **Tangency.** "At the point of tangency LRATC = SATC. At all other levels of production SATC > LRATC." — [Wikipedia: Cost curve](https://en.wikipedia.org/wiki/Cost_curve)
- **Short-run cost is never lower than long-run cost.** MIT T/F answer: "The short run average cost is always at least as large as the long run average cost" is **True**, because "the short-run cost is always attainable in the long run, but the firm has more degrees of freedom to minimize costs in the long run." — [MIT 14.01 Fall 2023 PS2 solutions](https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2023/mit14_01_f23_pset2sol.pdf)
- **OpenStax numerical example (alarm-clock factories).** Small factory: 1,000 clocks at $12 each. Medium: 2,000 at $8. Large: 5,000 at $4. This shows economies of scale. — [OpenStax §7.5](https://openstax.org/books/principles-economics-3e/pages/7-5-costs-in-the-long-run)
- **Engineering source of scale economies.** In the chemical industry, doubling the cost of pipe material lets a firm process four times the volume (the "six-tenths rule"). — [OpenStax §7.5](https://openstax.org/books/principles-economics-3e/pages/7-5-costs-in-the-long-run)
- **Retail examples.** Warehouse stores such as Costco and Walmart, and Amazon's warehouse model using automation, are given as economies-of-scale examples. Where LRAC reaches its minimum, relative to market demand, shapes how many firms an industry can support. — [OpenStax §7.5](https://openstax.org/books/principles-economics-3e/pages/7-5-costs-in-the-long-run)
- **Network effects (business source).** "The more users … creating content … the more valuable that platform is for every other user" (Facebook, TikTok: direct network effects). "The more drivers there are on Uber, the more valuable the platform is to any given passenger" (indirect network effects). Diseconomies of scale occur "when inefficiencies, such as communication breakdowns, coordination issues, or management complexity, cause the average cost per unit to rise." — [HBS Online, "Economies of Scale: Definition, Types, and Strategies" (2024, updated 2026)](https://online.hbs.edu/blog/post/economies-of-scale)
- **Specialization:** Smith's pin factory produced 48,000 pins a day with 10 specialized workers, versus fewer than 20 each (perhaps not one) working alone. — [Econlib, *Wealth of Nations* I.1](https://www.econlib.org/library/Smith/smWN.html?chapter_num=4#book-reader)
- **Coordination costs:** Brooks's law. Communication overhead grows as a team grows, and some tasks cannot be divided. — [Wikipedia: Brooks's law](https://en.wikipedia.org/wiki/Brooks%27s_law)
- **LRATC shapes.** LRATC slopes down with economies of scale, is flat with constant returns, and slopes up with diseconomies of scale. — [ReviewEcon](https://www.reviewecon.com/what-do-i-need-to-know-about-cost-curves). Average cost is "most commonly" U-shaped in the long run. — [Wikipedia: Average cost](https://en.wikipedia.org/wiki/Average_cost)
- **Krugman's long-run Selena exercises.** Homework sites carry Selena problems that ask students to choose among ATC₃, ATC₆ and ATC₉ (short-run ATC curves for different equipment levels) and that use "increasing returns to scale" over output ranges. — [Chegg stem: ATC6/ATC3/ATC9](https://www.chegg.com/homework-help/questions-and-answers/selena-s-gourmet-salsas-plans-produce-six-cases-salsa-choose-atc6-atc3-atc9-production-lev-q205796792); [Chegg stem: increasing returns over output ranges](https://www.chegg.com/homework-help/questions-and-answers/output-levels-ranging-seven-cases-day-selena-s-gourmet-salsas-experiencing-increasing-retu-q184877211)

### Inferences
#### Worked example: Selena's choice of plant size (computed; the high-fixed-cost option is reconstructed)
Search excerpts of Krugman's AP module (not opened, because the only copy found appears to be an unauthorized posting) report two things:
- Selena can **double fixed cost to $216** (more equipment), which lowers variable cost.
- At **9 cases, ATC is $120 with FC $108 but $78 with FC $216**, and the low-FC option is cheaper only at **4 or fewer cases per day**.

A high-FC variable cost of VC = 6Q² reproduces all of these numbers. **Verify against your book.**

| Q | ATC, small plant (FC $108, VC = 12Q²) | ATC, big plant (FC $216, VC = 6Q²) | Cheaper choice |
|---|---|---|---|
| 1 | 120.00 | 222.00 | small |
| 2 | 78.00 | 120.00 | small |
| 3 | **72.00** | 90.00 | small |
| 4 | 75.00 | 78.00 | small |
| 5 | 81.60 | 73.20 | big |
| 6 | 90.00 | **72.00** | big |
| 7 | 99.43 | 72.86 | big |
| 8 | 109.50 | 75.00 | big |
| 9 | 120.00 | 78.00 | big |
| 10 | 130.80 | 81.60 | big |

What to take from the table:
- **Choosing the plant.** Up to 4 cases a day, choose the $108 set-up; for 5 or more, choose $216. If these were the only two choices, LRATC would be the **lower** number in each row. That is the envelope idea.
- **Returns to scale here.** Both plants reach the same minimum ATC of **$72**, at 3 and 6 cases respectively. Doubling the scale did not lower the best achievable average cost, which is **constant returns to scale** over that range. Economies of scale would show up as a *lower* minimum ATC for the bigger plant.
- **Calculus check.** For TC = F + aQ², min ATC is at Q = √(F/a) and equals 2√(F·a). Small plant: √(108/12) = 3 and 2√1,296 = 72. Big plant: √(216/6) = 6 and 2√1,296 = 72.

#### The short-run → long-run story in words (how the textbook graph works)
1. Selena has equipment chosen for 6 cases a day, so she is on ATC₆ at its tangency with LRATC.
2. Demand rises and she now produces 9 cases. In the **short run** she can't change the equipment, so she moves **along ATC₆** to a point **above** LRATC: her cost is higher than it needs to be.
3. In the **long run** she buys the equipment that suits 9 cases and moves down to ATC₉, which touches LRATC at 9 cases.
4. This is why short-run ATC ≥ LRATC everywhere and the two are equal only at the tangency (MIT T/F; Wikipedia).

**Geometry point (derived):** where LRATC is falling, the short-run ATC curve touches it on its own *falling* part, to the left of the SRATC minimum. LRATC is therefore **not** simply "the line joining the minimum points" of the SRATC curves, except over a flat (constant-returns) range.

#### Causes of economies and diseconomies, matched with real examples

| Krugman category (as listed in the course brief) | Why average cost falls or rises | Real, cited example |
|---|---|---|
| Increased **specialization** in large operations | Workers and machines do narrow tasks better | Smith's pin factory (48,000 vs < 20 pins per worker-group) ([Econlib](https://www.econlib.org/library/Smith/smWN.html?chapter_num=4#book-reader)) |
| **Large initial set-up cost / indivisible inputs** | A plant or machine comes in a minimum size; spreading it over more output lowers average cost | "Six-tenths rule" for chemical plants; warehouse retail and automation (Costco, Walmart, Amazon) ([OpenStax §7.5](https://openstax.org/books/principles-economics-3e/pages/7-5-costs-in-the-long-run)) |
| **Network externalities** | The good becomes more valuable as more people use it, so big firms gain an edge | Facebook and TikTok (direct), Uber (indirect) ([HBS Online](https://online.hbs.edu/blog/post/economies-of-scale)) |
| **Diseconomies:** coordination and communication problems | Management layers, communication breakdowns, complexity | HBS definition; Brooks's law in software teams ([HBS Online](https://online.hbs.edu/blog/post/economies-of-scale); [Wikipedia](https://en.wikipedia.org/wiki/Brooks%27s_law)) |

A quick count shows why coordination costs grow fast: n people have n(n−1)/2 possible pairs, so 5 people make 10 pairs, 10 make 45 and 20 make 190.

#### Don't mix these up

| Concept | Time horizon | What varies | Shows up as |
|---|---|---|---|
| Diminishing returns to an input | Short run | One input; others fixed | Rising MC and AVC; upward part of the short-run U |
| Increasing returns to the variable input (specialization) | Short run | One input | Downward part of the MC swoosh |
| Economies / diseconomies of scale | Long run | All inputs (scale) | Falling / rising LRATC |

#### Exam traps
1. "The firm has diseconomies of scale because MC is rising" is wrong. Rising short-run MC reflects diminishing returns. Scale economies are read off LRATC.
2. The LRATC curve is an envelope (tangency points), not "the curve through the SRATC minima".
3. In the short run, a firm whose output changes permanently is on the wrong SRATC curve and has higher costs. It reaches LRATC only after adjusting its fixed inputs.

### Gaps
- Krugman's own list of causes could not be verified from the text. The usual list is increased specialization, large initial set-up costs and network externalities, against problems of coordination and communication. The table follows the course brief.
- The VC column for Selena's high-fixed-cost option is reconstructed.
- No quantified, citable real-world LRATC estimates (for example, actual cost-per-unit data by plant size) were found within the research budget. The OpenStax alarm-clock numbers are illustrative, not empirical.

---

## 6. Common exam problems: fill-in cost tables, identifying curves on a graph, sunk costs, and a preview of profit maximization (P = MC; shut down below minimum AVC)

### Takeaway
Most midterm cost questions are mechanical:
- fill in TC, VC, FC, MC, AFC, AVC and ATC from partial information using about ten identities;
- read the minima off the table;
- identify curves by their shapes and crossing points;
- ignore sunk costs;
- apply the preview rules: produce where P = MC, shut down if P < minimum AVC, and break even at P = minimum ATC.

### Cited Findings
- **Profit maximization.** "Produce at the quantity of output where P = MR = MC." The **break-even point** is where MC crosses AC, and zero profit is earned there. The **shutdown point** is "the intersection of the average variable cost curve and the marginal cost curve". "If price < minimum average variable cost, then firm shuts down." — [OpenStax §8.2](https://openstax.org/books/principles-economics-3e/pages/8-2-how-perfectly-competitive-firms-make-output-decisions)
- **Why fixed costs don't matter for shutting down.** "Shutting down can reduce variable costs to zero, but in the short run, the firm has already paid for fixed costs." OpenStax's yoga-center example has fixed costs of $10,000 and variable costs of $15,000. — [OpenStax §8.2](https://openstax.org/books/principles-economics-3e/pages/8-2-how-perfectly-competitive-firms-make-output-decisions)
- **Sunk costs.** "Fixed costs are often sunk costs that a firm cannot recoup. In thinking about what to do next, typically you should ignore sunk costs." — [OpenStax §7.3](https://openstax.org/books/principles-economics-3e/pages/7-3-costs-in-the-short-run)
- **Curve shifts.** Variable-cost changes (per-unit taxes, wages, materials) shift ATC, AVC and MC. Fixed-cost changes (lump-sum taxes, rent, insurance) shift only ATC. Common mistakes include mixing these shifts up, forgetting that AFC always declines, placing the shutdown point at minimum ATC instead of minimum AVC, and assuming MC always slopes upward. — [ReviewEcon](https://www.reviewecon.com/what-do-i-need-to-know-about-cost-curves)
- **Price-takers choose quantity, not price.** "In a competitive market, firms maximize profits by choosing the price that equals their marginal cost" is **False**. Firms "take it as given" and "maximize profits by adjusting output so that the market price equals their marginal cost." — [MIT 14.01 Fall 2023 PS2 solutions](https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2023/mit14_01_f23_pset2sol.pdf)
- **OpenStax WipeOut Ski answers.** At P = $25 and Q = 5, the firm loses $5 in total and $1 per unit (ATC $26 > P), and the 5th unit's MC of $30 exceeds price, so output should be reduced. — [OpenStax answer key Ch. 7](https://openstax.org/books/principles-economics-3e/pages/chapter-7)

### Inferences
#### What to prioritise for this midterm (researcher's judgement, highest-yield first)
1. Filling in a cost table, plus the MC–ATC/AVC relationships. This appears on almost every intro exam.
2. Explaining the U-shaped ATC with the **spreading effect** and **diminishing returns effect**, and the **minimum-cost output**.
3. Marginal product tables and diminishing returns, including MC = w/MPL.
4. Explicit vs implicit costs, and accounting vs economic profit.
5. LRATC as an envelope; economies, constant returns and diseconomies of scale with causes.
6. The swoosh MC.
7. The calculus proof that MC = ATC at minimum ATC, plus f′ > 0 and f″ < 0 (the professor's additions).

#### Identity toolkit (memorize)
- **FC:** FC = TC at Q = 0, and FC is the same at every Q.
- **VC and TC:** VC = TC − FC (VC = 0 at Q = 0), and TC = FC + VC.
- **MC:** MC(Q) = TC(Q) − TC(Q−1) = VC(Q) − VC(Q−1). Going the other way, TC(Q) = TC(Q−1) + MC(Q).
- **Averages:** AFC = FC/Q, AVC = VC/Q, ATC = TC/Q = AFC + AVC.
- **Back out totals from averages:** VC = AVC × Q, TC = ATC × Q, FC = AFC × Q.
- **Labor-based versions:** MC = w/MPL, AVC = w/APL, and VC = w·L for a single variable input.

#### Step-by-step method for any cost table
1. Find **FC** first: TC at Q = 0, or AFC × Q from any row. Copy it down the whole column.
2. Fill **VC** and **TC** using TC = FC + VC, and using MC to step from one row to the next.
3. Compute **MC** as a difference between rows. If the table is in workers, MC = w ÷ MPL.
4. Compute AFC, AVC and ATC by dividing by Q. Never divide by L, except when computing APL.
5. **Check your work:**
   - ATC − AVC = AFC in every row.
   - ATC falls when MC is below it and rises when MC is above it.
   - Minimum AVC comes at a lower Q than minimum ATC.
   - MC passes through both minima.

#### Identifying curves on an unlabeled graph
- **Always falling, flattening and never U-shaped:** AFC.
- **Two U-shaped curves that get closer together as Q rises:** the upper one is **ATC** and the lower one is **AVC**. The gap between them is AFC.
- **The curve that passes through both minima:** MC. It usually has a swoosh shape and the lowest minimum of all.
- **Total curves** (TC above VC by a constant FC, with the same slope at every Q): the vertical intercept of TC is FC.

#### Sunk costs: worked example (hypothetical)
A firm paid a non-refundable $5,000 licence for the year. This month it can earn revenue of $8,000 with variable costs of $6,000.
- **Produce.** Revenue minus VC is +$2,000, which cuts the loss. The $5,000 is gone whether it produces or not, so it is irrelevant to the decision.
- If revenue were only $5,500, producing would lose $500 more than shutting down: **shut down**.

#### Profit-maximization preview (Ch. 7 material, likely to appear as one or two questions)

| Price compared with costs | Short-run decision | Result |
|---|---|---|
| P > min ATC | Produce where P = MC | Positive economic profit |
| P = min ATC | Produce at the minimum-cost output | Zero economic profit (break-even) |
| min AVC < P < min ATC | Keep producing where P = MC | Loss, but smaller than FC |
| P < min AVC | Shut down (Q = 0) | Loss = FC |

In tables, produce every unit whose MC ≤ P and stop before the first unit whose MC > P. Then compare that profit with −FC, the result of shutting down. OpenStax calls these the *break-even point* and *shutdown point*. Krugman's next chapter probably calls them the *break-even price* and *shut-down price* (unverified).

#### Master list of exam traps
1. MC is ΔTC/ΔQ per unit of **output**, not per worker.
2. A rent or other FC change moves AFC and ATC only. MC, AVC and the profit-maximizing Q are unchanged in the short run.
3. A wage change moves MC, AVC and ATC.
4. Shut down below minimum **AVC**, not minimum ATC.
5. Minimum-cost output (bottom of ATC) is not the same as the profit-maximizing output (P = MC).
6. A rising MC can still be below ATC, in which case ATC is falling.
7. Diminishing returns (short run) is not the same as diseconomies of scale (long run).
8. Accounting profit > 0 does not mean economic profit > 0. Subtract implicit costs.
9. Sunk costs are ignored in forward-looking decisions.
10. MC values sit between rows. Watch for "the 3rd unit" (the move from 2 to 3) versus "at Q = 3".

### Gaps
- No Inha University past papers or NTS3040-specific practice materials were found. Exam formats here are inferred from OpenStax, MIT OCW and AP-review sources.
- The University of Wisconsin ECON 101 practice question answer files found by search (users.ssc.wisc.edu, Kelly) could not be opened: the server refused the connection.
- Krugman's exact terms for the Ch. 7 break-even and shut-down rules were not verified.

---

## 7. Practice questions (20) with answers, including two complete cost-table problems, plus the best free resources

### Takeaway
The 20 questions below cover everything in Sections 1–6. Q6 and Q7 are complete cost-table problems. Q8 is OpenStax's own cost-table exercise, and its answers are confirmed by OpenStax's answer key. Every answer was checked with a script. For extra practice, OpenStax Ch. 7 (with its answer key), the Khan Academy and MRU videos, and MIT OCW 14.01 solutions are all free and legitimate.

### Cited Findings
#### Questions taken from cited sources
- **OpenStax self-check questions.** Q3 below is OpenStax 7.1/7.2 (accounting and economic profit). Q8 is OpenStax 7.3/7.4 (WipeOut Ski: fixed costs $30; variable costs $0, 10, 25, 45, 70, 100, 135 for Q = 0–6; then price $25 at 5 units). — [OpenStax Ch. 7 self-check](https://openstax.org/books/principles-economics-3e/pages/7-self-check-questions); answers in the [OpenStax answer key](https://openstax.org/books/principles-economics-3e/pages/chapter-7)
- **OpenStax painters question.** "If two painters can paint 200 square feet of wall in an hour, and three painters can paint 275 square feet, what is the marginal product of the third painter?" Answer: 75 square feet. — [OpenStax self-check](https://openstax.org/books/principles-economics-3e/pages/7-self-check-questions); [answer key](https://openstax.org/books/principles-economics-3e/pages/chapter-7)
- **MIT true/false items** used in Q11 and Q14 (SRAC ≥ LRAC; P = MC with price taken as given). — [MIT 14.01 F23 PS2 solutions](https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2023/mit14_01_f23_pset2sol.pdf); [MIT 14.01 F18 PS3 solutions (mirror)](https://ocw.iti.hr/courses/economics/14-01-principles-of-microeconomics-fall-2018/problem-sets/MIT14_01F18_pset3sol.pdf)
- **MIT short-run cost example** used in Q10: F(L, K) = L^(1/3)K^(1/3) with w = 1, r = 3 and K̄ = 1 gives c(q) = 3 + q³, MC = 3q², AVC = q². The supply curve is p = 3q², and the firm "always chooses to produce at any price". — [MIT 14.01 F23 PS2 solutions](https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2023/mit14_01_f23_pset2sol.pdf)

#### Best free resources (all legal and free)
- **OpenStax *Principles of Economics 3e*, Ch. 7.** This is the closest free match to Krugman's chapter. Use it for definitions, the barber and alarm-clock examples, the self-check questions and the answer key.
  - Sections: [§7.1](https://openstax.org/books/principles-economics-3e/pages/7-1-explicit-and-implicit-costs-and-accounting-and-economic-profit), [§7.2](https://openstax.org/books/principles-economics-3e/pages/7-2-production-in-the-short-run), [§7.3](https://openstax.org/books/principles-economics-3e/pages/7-3-costs-in-the-short-run), [§7.5](https://openstax.org/books/principles-economics-3e/pages/7-5-costs-in-the-long-run)
  - [Key concepts summary](https://openstax.org/books/principles-economics-3e/pages/7-key-concepts-and-summary), [Self-check questions](https://openstax.org/books/principles-economics-3e/pages/7-self-check-questions), [Answer key](https://openstax.org/books/principles-economics-3e/pages/chapter-7)
  - Preview of the next chapter: [§8.2 profit maximization and shutdown](https://openstax.org/books/principles-economics-3e/pages/8-2-how-perfectly-competitive-firms-make-output-decisions)
- **Khan Academy.** The Microeconomics unit "Production decisions and economic profit" covers explicit/implicit costs, types of profit and entry/exit. — [Explicit & implicit costs article](https://www.khanacademy.org/economics-finance-domain/microeconomics/firm-economic-profit/modal/a/explicit-and-implicit-costs-and-accounting-and-economic-profit-cnx). Useful videos:
  - [Graphs of MC, AVC and ATC](https://www.khanacademy.org/economics-finance-domain/microeconomics/firm-economic-profit/average-costs-margin-rev/v/graphs-of-mc-avc-and-atc)
  - [Marginal cost, average variable cost, and average total cost](https://en.khanacademy.org/economics-finance-domain/ap-microeconomics/production-cost-and-the-perfect-competition-model-temporary/short-run-production-costs/v/marginal-cost-average-variable-cost-and-average-total-cost)
  - [Economic profit vs accounting profit](https://www.khanacademy.org/economics-finance-domain/ap-microeconomics/production-cost-and-the-perfect-competition-model-temporary/types-of-profit/v/economic-profit-vs-accounting-profit)
  - The AP unit [Production, cost, and the perfect competition model](https://www.khanacademy.org/economics-finance-domain/ap-microeconomics/ap-firm-economic-profit)
- **Marginal Revolution University (Alex Tabarrok).** "Maximizing Profit and the Average Cost Curve" covers average cost, minimizing losses, entry and exit, zero profits and sunk costs. — [MRU lesson](https://learn.mru.org/lessons/profit-maximization-average-cost). Week 7 of the [MRU video-mapped syllabus](https://mru.org/teacher-resources/principles-microeconomics-syllabus) lists the related competitive-firm videos.
- **MIT OpenCourseWare 14.01.** These are calculus-based and more advanced than *Essentials*, so use them for the calculus parts only.
  - [F23 PS2 solutions](https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2023/mit14_01_f23_pset2sol.pdf) (T/F on SR vs LR cost, short-run MC and AVC)
  - [F23 midterm](https://www.ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2023/mit14_01_f23_midterm.pdf) (search listing says it asks for short-run MC and average cost; not opened)
  - [14.01SC F2011 PS4 solutions](https://ocw.mit.edu/courses/14-01sc-principles-of-microeconomics-fall-2011/4cc2789ee90481d45cd1a12efe189b86_MIT14_01SCF11_soln04.pdf) (marginal products, returns to scale, deriving TC/AC/MC)
- **ReviewEcon cost-curve guide.** A one-page summary of rules, shifts and common mistakes, written for AP/IB students. — [ReviewEcon](https://www.reviewecon.com/what-do-i-need-to-know-about-cost-curves)
- **Quick formula references.** [Wikipedia: Cost curve](https://en.wikipedia.org/wiki/Cost_curve), [Average cost](https://en.wikipedia.org/wiki/Average_cost), [Marginal product of labor](https://en.wikipedia.org/wiki/Marginal_product_of_labor)

### Inferences
#### Practice questions
*Numbers are hypothetical unless a source is named.*

**Q1. Production table.** A car wash with one washing bay can wash these numbers of cars per hour with 0–6 workers: 0, 8, 20, 30, 36, 39, 39.
(a) Compute MPL and APL.
(b) When do diminishing returns set in?
(c) Where is APL at its maximum, and what is MPL there?
(d) The wage is $12 an hour. Find the MC per car for each worker's output.
(e) Should the 6th worker be hired?

**Q2. Calculus production.** Q = f(L) = 20L − L² (this fits Krugman's wheat data).
(a) Find MPL.
(b) Show diminishing returns.
(c) At what L is TP maximized?
(d) Find APL and show that it is falling.
(e) With w = $200, what is MC per bushel at L = 5?

**Q3. Profit (OpenStax).** Revenue is $1,000,000. The firm spent $600,000 on labor, $150,000 on capital and $200,000 on materials, and it owns land that it could rent out for $30,000. Find accounting profit and economic profit.

**Q4. Profit (Tashkent café).** Revenue is $120,000; explicit costs are $70,000; the owner gave up a $30,000 salary; and $50,000 of her savings could earn 10%. Find accounting profit and economic profit. Should she stay in business?

**Q5. MC = w/MPL.** The wage is $60 a day. Hiring the 4th worker raises output from 50 to 65 units, and the 5th raises it to 75. Find the MC per unit of output for each worker. What happens to MC as MPL falls?

**Q6. Complete cost-table problem #1 (Tashkent non bakery, hypothetical).** The oven rental (FC) is $60 a day and each worker is paid $40 a day. With 0–6 workers the bakery makes 0, 10, 25, 35, 42, 47 and 50 loaves.
(a) Fill in MPL, VC, TC, MC (= w/MPL), AFC, AVC and ATC.
(b) Where are there increasing returns to labor, and where do diminishing returns set in?
(c) Where is MC lowest, and why there?
(d) Find minimum AVC and the minimum-cost output.
(e) Show that MC crosses ATC at its minimum.
(f) Loaves sell for $6. How many workers and loaves, and what profit?
(g) What if loaves sell for $3?
(h) Rent rises to $90. Which curves shift, and what happens to the answer in (f)?

**Q7. Complete cost-table problem #2 (fill in from partial information).** Complete the table, then answer the questions below it.

| Q | FC | VC | TC | MC | AFC | AVC | ATC |
|---|---|---|---|---|---|---|---|
| 0 | | | 50 | — | — | — | — |
| 1 | | 30 | | | | | |
| 2 | | | | 20 | | | |
| 3 | | | 116 | | | | |
| 4 | | | | | | 21.50 | |
| 5 | | | | | | | 33.20 |
| 6 | | | | 50 | | | |

(b) Find the outputs at which MC, AVC and ATC are at their minimums.
(c) Find the shut-down price and the break-even price.
(d) What does the firm do at P = $30?
(e) What does the firm do at P = $25 and at P = $20?
(f) Is there any range of increasing returns to the variable input?

**Q8. OpenStax WipeOut Ski Company.** FC = $30, and VC = $0, 10, 25, 45, 70, 100, 135 for Q = 0–6.
(a) Fill in TC, AVC, ATC and MC.
(b) The firm sells 5 units at P = $25. What is its profit or loss?
(c) How can you tell at a glance, using average cost?
(d) Is the 5th unit adding to profit?
(e) What output is best at P = $25?

**Q9. Calculus (Selena-type).** TC = 108 + 12Q².
(a) Find MC, AVC, AFC and ATC.
(b) Find the minimum-cost output and minimum ATC.
(c) Verify MC = ATC there.
(d) Write d(ATC)/dQ as "spreading effect + diminishing returns effect".

**Q10. Calculus (MIT example).** c(q) = 3 + q³.
(a) Find FC, VC, MC, AVC and ATC.
(b) Find the output that minimizes ATC and the value there.
(c) Why does this firm produce at any positive price?

**Q11. True/False.** "Whenever MC is rising, ATC must be rising." Explain.

**Q12. True/False.** "The AFC curve is U-shaped because of diminishing returns."

**Q13. True/False.** "An increase in the firm's monthly rent shifts the MC curve up and reduces its profit-maximizing output in the short run."

**Q14. True/False.** "At every output level, short-run ATC ≥ long-run ATC."

**Q15. Short answer.** Explain why the ATC curve is U-shaped, using Krugman's terms and Selena's numbers for the moves from 2 to 3 cases and from 3 to 4 cases.

**Q16. Sunk cost.** A firm has paid a $5,000 non-refundable annual licence. This month's revenue would be $8,000 and variable cost $6,000. Should it produce? What if revenue were $5,500?

**Q17. Price and decisions (using Q7's firm).** What does the firm do at P = $40? State its quantity and profit.

**Q18. Long run (Selena).** Selena expects to sell 9 cases a day permanently. Should she choose FC = $108 or $216? For which output range is $108 better? What happens in the short run if her output jumps from 6 to 9 cases?

**Q19. Scale (OpenStax alarm clocks).** Costs are $12 per clock at 1,000 clocks, $8 at 2,000 and $4 at 5,000.
(a) Which region of LRATC is this?
(b) Give two causes.
(c) At 50,000 clocks the cost rises to $6. What is this, and why might it happen?
(d) How is this different from diminishing returns?

**Q20. Graph identification.** A graph shows four unlabeled curves. One falls continuously. Three are U-shaped or swoosh-shaped, with minimums at Q = 3, Q = 4 and Q = 5. The two U-curves with minimums at Q = 4 and Q = 5 get closer together as Q rises, and the swoosh curve passes through both of their minimums.
(a) Label all four curves.
(b) Which curves shift when the wage rises?
(c) Which curves shift when rent rises?

#### Answer key (all computed and checked)

**A1. Car wash.**
(a)

| Workers | Cars | MPL | APL |
|---|---|---|---|
| 1 | 8 | 8 | 8.0 |
| 2 | 20 | 12 | 10.0 |
| 3 | 30 | 10 | 10.0 |
| 4 | 36 | 6 | 9.0 |
| 5 | 39 | 3 | 7.8 |
| 6 | 39 | 0 | 6.5 |

(b) Diminishing returns set in with the **3rd** worker, when MPL falls from 12 to 10. The 2nd worker showed increasing returns (8 → 12).
(c) APL peaks at 10, at 2–3 workers. There the 3rd worker's MPL = 10 = APL.
(d) MC per car = 12/MPL: $1.50, $1.00, $1.20, $2.00, $4.00, then **infinite** for the 6th worker (MPL = 0).
(e) No. The 6th worker adds no output.

**A2. Calculus production.**
(a) MPL = 20 − 2L.
(b) f″ = −2 < 0.
(c) TP is maximized at L = 10, where Q = 100.
(d) APL = 20 − L, with slope −1 < 0 (MPL < APL for every L > 0).
(e) MC = 200/(20 − 10) = **$20 per bushel**. The discrete table brackets this between $18.18 and $22.22.

**A3. OpenStax profit.** Accounting profit = 1,000,000 − 950,000 = **$50,000**. Economic profit = 50,000 − 30,000 = **$20,000**. This matches the OpenStax answer key.

**A4. Café.** Accounting profit = **$50,000**. Implicit costs = 30,000 + 5,000 = $35,000. Economic profit = **$15,000**. She should stay: she beats her best alternative by $15,000.

**A5. MC = w/MPL.** The 4th worker's MPL is 15, so MC = 60/15 = **$4.00**. The 5th worker's MPL is 10, so MC = **$6.00**. MC rises as MPL falls.

**A6. Bakery (complete problem #1).**
(a)

| L | Q | MPL | VC | TC | MC | AFC | AVC | ATC |
|---|---|---|---|---|---|---|---|---|
| 0 | 0 | — | 0 | 60 | — | — | — | — |
| 1 | 10 | 10 | 40 | 100 | 4.00 | 6.00 | 4.00 | 10.00 |
| 2 | 25 | 15 | 80 | 140 | 2.67 | 2.40 | **3.20** | 5.60 |
| 3 | 35 | 10 | 120 | 180 | 4.00 | 1.71 | 3.43 | **5.14** |
| 4 | 42 | 7 | 160 | 220 | 5.71 | 1.43 | 3.81 | 5.24 |
| 5 | 47 | 5 | 200 | 260 | 8.00 | 1.28 | 4.26 | 5.53 |
| 6 | 50 | 3 | 240 | 300 | 13.33 | 1.20 | 4.80 | 6.00 |

(b) There are increasing returns with the 2nd worker (MPL 10 → 15). Diminishing returns set in from the 3rd worker (15 → 10 → 7 → 5 → 3).
(c) MC is lowest at **$2.67**, for loaves 11–25 (the 2nd worker's output), because MPL is at its maximum there.
(d) Minimum AVC is **$3.20 at 25 loaves**. The minimum-cost output is **35 loaves**, with ATC = $5.14.
(e) The MC of loaves 26–35 is $4.00, below ATC(25) = $5.60, so ATC falls to $5.14. The MC of loaves 36–42 is $5.71, above $5.14, so ATC rises to $5.24.
(f) At P = $6, hire workers while MC ≤ 6. The 4th worker's loaves cost $5.71, so hire; the 5th worker's cost $8, so don't. The answer is **4 workers and 42 loaves**, with profit = 6 × 42 − 220 = **$32**. For comparison, profit is $30 at 35 loaves and $22 at 47 loaves.
(g) At P = $3, price is below minimum AVC ($3.20), so **shut down**. The loss is FC = $60. Producing 25 loaves would lose $65.
(h) AFC and ATC shift up by 30/Q. MC and AVC do not change, so the bakery still hires 4 workers and makes 42 loaves at P = $6. Profit falls to $2.

**A7. Fill-in table (complete problem #2).**
(a)

| Q | FC | VC | TC | MC | AFC | AVC | ATC |
|---|---|---|---|---|---|---|---|
| 0 | 50 | 0 | 50 | — | — | — | — |
| 1 | 50 | 30 | 80 | 30 | 50.00 | 30.00 | 80.00 |
| 2 | 50 | 50 | 100 | 20 | 25.00 | 25.00 | 50.00 |
| 3 | 50 | 66 | 116 | 16 | 16.67 | 22.00 | 38.67 |
| 4 | 50 | 86 | 136 | 20 | 12.50 | **21.50** | 34.00 |
| 5 | 50 | 116 | 166 | 30 | 10.00 | 23.20 | **33.20** |
| 6 | 50 | 166 | 216 | 50 | 8.33 | 27.67 | 36.00 |

Method:
- FC = TC(0) = 50.
- VC(2) = 30 + 20 = 50.
- VC(3) = 116 − 50 = 66.
- VC(4) = 21.50 × 4 = 86.
- TC(5) = 33.20 × 5 = 166.
- VC(6) = 116 + 50 = 166.
- The MCs are the differences between consecutive VC values.

(b) MC is lowest at Q = 3 ($16). AVC is lowest at Q = 4 ($21.50). ATC is lowest at Q = 5 ($33.20). The order MC → AVC → ATC is as expected.
(c) The shut-down price is minimum AVC = **$21.50**. The break-even price is minimum ATC = **$33.20**.
(d) At P = $30, the 5th unit's MC = $30 = P, so the firm is indifferent between Q = 4 and Q = 5. Both lose **$16**, and the textbook convention is to produce 5. Shutting down would lose $50, so it **keeps producing**.
(e) At P = $25, produce Q = 4 (the 4th unit's MC is 20 ≤ 25; the 5th unit's is 30 > 25). Profit = 100 − 136 = **−$36**, which beats −$50, so it operates. At P = $20, price is below $21.50, so it **shuts down**. Producing 4 units would lose $56, worse than −$50.
(f) Yes. MC falls for units 1–3 (30 → 20 → 16), which is the swoosh caused by early specialization.

**A8. WipeOut Ski (OpenStax).**
(a)

| Q | TC | AVC | ATC | MC |
|---|---|---|---|---|
| 1 | 40 | 10.00 | 40.00 | 10 |
| 2 | 55 | 12.50 | 27.50 | 15 |
| 3 | 75 | 15.00 | 25.00 | 20 |
| 4 | 100 | 17.50 | 25.00 | 25 |
| 5 | 130 | 20.00 | 26.00 | 30 |
| 6 | 165 | 22.50 | 27.50 | 35 |

(b) Revenue is 125 and TC is 130, so the firm **loses $5**.
(c) ATC ($26) > P ($25), so it loses **$1 per unit**.
(d) No. The 5th unit's MC ($30) is greater than P ($25), so output should be cut.

These three answers match the OpenStax answer key.

(e) Q = 3 or 4 is best. Profit is **$0** there, because P equals minimum ATC ($25), the break-even point. The shut-down price is minimum AVC = $10.

**A9. Selena-type calculus.**
(a) MC = 24Q, AVC = 12Q, AFC = 108/Q, ATC = 108/Q + 12Q.
(b) Setting d(ATC)/dQ = −108/Q² + 12 = 0 gives **Q = 3** and **ATC = $72**.
(c) MC(3) = 72 = ATC.
(d) The spreading-effect term is −108/Q² and the diminishing-returns term is +12. They exactly offset at Q = 3.

**A10. MIT example.**
(a) FC = 3, VC = q³, MC = 3q², AVC = q², ATC = 3/q + q².
(b) Setting d(ATC)/dq = −3/q² + 2q = 0 gives q³ = 1.5, so **q ≈ 1.145** and **ATC = MC ≈ $3.93**.
(c) AVC = q² rises from zero and MC = 3q² > AVC for every q > 0. Minimum AVC is therefore about $0, so any positive price covers AVC. MIT's solution says the firm "always chooses to produce at any price".

**A11. False.** MC can rise while it is still *below* ATC, and then ATC is still falling. ATC rises only when MC > ATC (MIT F18 PS3 solutions). In Selena's table, the 2nd case's MC of $36 is higher than the 1st case's $12, yet ATC falls from $120 to $78.

**A12. False.** AFC = FC/Q falls at every output; this is the spreading effect. Diminishing returns affect AVC and MC, not AFC.

**A13. False.** Rent is a fixed cost, and MC = dVC/dQ does not include FC. Only AFC and ATC shift up. The P = MC output is unchanged in the short run; profit simply falls by the extra rent.

**A14. True.** Any short-run input combination is still available in the long run, so long-run cost can't be higher. The two are equal only at the tangency point (MIT F23 PS2; Wikipedia: Cost curve).

**A15. Short answer.** From 2 to 3 cases, the spreading effect lowers AFC by 18 (54 → 36) while the diminishing returns effect raises AVC by 12 (24 → 36), so ATC falls by 6 (78 → 72). From 3 to 4 cases, AFC falls only 9 while AVC still rises 12, so ATC rises by 3 (72 → 75). The bottom of the U, at 3 cases, is the minimum-cost output, where MC = ATC = $72.

**A16. Sunk cost.** With revenue of $8,000, **produce**: revenue minus VC is +$2,000, so the loss shrinks from $5,000 to $3,000. With revenue of $5,500, **shut down**: producing makes the loss $5,500 instead of $5,000. The licence is sunk in both cases and doesn't affect the choice.

**A17. Q7's firm at P = $40.** The 5th unit's MC (30) is ≤ 40 and the 6th unit's MC (50) is > 40, so the firm produces **Q = 5**. Profit = 200 − 166 = **$34**. For comparison, profit is $24 at Q = 4 and $24 at Q = 6.

**A18. Selena's plant size.**
- At 9 cases, ATC is $120 with FC = $108 and $78 with FC = $216, so she should choose **$216**.
- $108 is better at **4 or fewer** cases a day.
- If output jumps from 6 to 9 in the short run, she moves along her current short-run ATC curve, above LRATC. She lowers costs only after re-optimizing her equipment in the long run.

**A19. Alarm clocks.**
(a) Average cost falls as output rises: the **economies of scale** (increasing returns to scale) region of LRATC.
(b) Possible causes are specialization, indivisible or large set-up equipment spread over more output (the six-tenths rule), and network effects for platform goods.
(c) A rise to $6 at 50,000 clocks shows **diseconomies of scale**, caused by coordination, communication and management complexity.
(d) Diminishing returns is a short-run idea, where one input varies and the others are fixed. Scale (dis)economies are long-run, where all inputs vary.

**A20. Graph identification.**
(a) The continuously falling curve is **AFC**. The swoosh with its minimum at Q = 3 is **MC**. The U with its minimum at Q = 4 is **AVC**. The U with its minimum at Q = 5 is **ATC**. The shrinking gap between ATC and AVC equals AFC.
(b) A wage rise shifts **MC, AVC and ATC** up.
(c) A rent rise shifts **AFC and ATC** only.

#### A short plan for the days before the midterm (researcher's suggestion)
- **Day 1:** Sections 1–2, then Q1–Q5.
- **Day 2:** Section 3, then Q9, Q11, Q12 and Q15. Practise the one-line calculus proof (MC − ATC)/Q until you can write it from memory.
- **Day 3:** The cost tables, Q6–Q8, timed at about 12 minutes each. Re-derive them without looking at the answers.
- **Day 4:** Sections 4–5, then Q13, Q14 and Q16–Q20.
- **Day 5:** Watch Khan's "Graphs of MC, AVC and ATC" and MRU's "Maximizing Profit and the Average Cost Curve". Then redo any question you got wrong.

### Gaps
- No Krugman end-of-chapter problems are reproduced here, to avoid copying the textbook. Use the problems at the end of your own textbook chapter as well.
- The Selena VC columns and the wheat FC and wage used in some answers are reconstructions or assumptions (see Sections 2, 3 and 5). The methods and answers are internally consistent, but the textbook's tables may use different numbers.
- No practice exams with answer keys specific to Inha University were found.
