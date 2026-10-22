# Math & Graph Toolkit for Intro Microeconomics (NTS3040 — Krugman & Wells *Essentials of Economics* + light calculus)

*Prepared 2026-10-19 for the 24–30 Oct 2026 midterm. Only external (internet) sources were used, with no textbook copies. Any worked example or practice answer that is not attributed to a source was derived by the researcher and checked symbolically with sympy 1.14. Notation: Qd/Qs = quantity demanded/supplied; P = price; e = price elasticity of demand as a signed (negative) number; |e| = the positive value that Krugman and OpenStax report; TC/VC/FC = total/variable/fixed cost; MC, ATC, AVC, AFC = marginal, average total, average variable and average fixed cost; MPL/APL = marginal/average product of labor.*

---

## 1. Linear demand and supply: equilibrium, inverse demand, shifts, shortage/surplus, consumer and producer surplus

### Takeaway
Set Qd = Qs and solve. For Qd = a − bP and Qs = c + dP, the equilibrium is P* = (a − c)/(b + d) and Q* = (ad + bc)/(b + d). Always plug P* back into *both* equations as a check. To draw the curves (price goes on the vertical axis), rewrite them in P-form. Shortage or surplus at a given price is the gap Qd − Qs. Consumer and producer surplus are right-triangle areas: ½ × Q* × (choke price − P*), and ½ × Q* × (P* − supply's price intercept).

### Cited Findings
- A straight line is written y = b + mx. b is the vertical intercept ("if x = 0, then the b term will reveal where the line intercepts, or crosses, the y-axis"). m is the slope, "rise over run … the change in the vertical axis divided by the change in the horizontal axis". In y = 9 + 3x, each 1-unit rise in x raises y by 3, so the slope is 3. A positive slope means the variables move together, a negative slope means they move in opposite directions, and a zero slope (a flat line) means there is no relationship. — [OpenStax, *Principles of Economics 3e*, Appendix A](https://openstax.org/books/principles-economics-3e/pages/a-the-use-of-mathematics-in-principles-of-economics)
- OpenStax's algebra example uses Qd = 16 − 2P and Qs = 2 + 5P. Setting Qd = Qs gives 16 − 2P = 2 + 5P → 14 = 7P → **P = $2**, and Q = 16 − 2(2) = 2 + 5(2) = **12**. — [OpenStax Appendix A](https://openstax.org/books/principles-economics-3e/pages/a-the-use-of-mathematics-in-principles-of-economics)
- "Since P is on the vertical axis, it is easiest if you solve each equation for P." The same curves then become P = 8 − 0.5Qd (vertical intercept 8, slope −0.5) and P = −0.4 + 0.2Qs (vertical intercept −0.4, slope 0.2). — [OpenStax Appendix A](https://openstax.org/books/principles-economics-3e/pages/a-the-use-of-mathematics-in-principles-of-economics)
- Syracuse lecture recipe: graph first, then "set supply equal to demand to find the equilibrium quantity," then "plug this quantity into either the supply or demand curve to find the equilibrium price." Worked case: demand P = 100 − 2Q and supply P = 0.5Q give 100 − 2Q = 0.5Q → 100 = 2.5Q → Q = 40, so P = 100 − 2(40) = 0.5(40) = $20. "Making sure you get the same answer using either equation is a good way to check your work." — [Syracuse University PAI 897, Lecture 4 "More on Supply and Demand"](https://dcpopp.expressions.syr.edu/wp-content/uploads/PAI897_lect4.pdf)
- Consumer surplus is "the area under the demand curve and above the market price." Producer surplus is "the area above the supply curve and below the market price." "The area of a triangle is 0.5 x base x height." In the example, CS = 0.5(40)(100 − 20) = **$1,600** and PS = 0.5(40)(20) = **$400**. — [Syracuse PAI 897, Lecture 4](https://dcpopp.expressions.syr.edu/wp-content/uploads/PAI897_lect4.pdf)
- A $40 price floor (above the $20 equilibrium) creates "excess supply", and demand sets the quantity traded: 40 = 100 − 2Q → Q = 30.
  - CS falls to 0.5(30)(60) = $900.
  - PS becomes a rectangle (40 − 15)(30) = $750 plus a triangle 0.5(30)(15) = $225, for $975 in total.
  - Total surplus falls from $2,000 to $1,875, so the **deadweight loss is $125** = 0.5(25)(10).
  - — [Syracuse PAI 897, Lecture 4](https://dcpopp.expressions.syr.edu/wp-content/uploads/PAI897_lect4.pdf)
- Deadweight loss is "the potential consumer or producer surplus that is not captured because potentially beneficial trades do not occur," and it "is greater when there is elastic supply and demand." — [Syracuse PAI 897, Lecture 4](https://dcpopp.expressions.syr.edu/wp-content/uploads/PAI897_lect4.pdf)
- Relevant chapters in Krugman & Wells *Essentials of Economics* (6th ed., ©2023):
  - Ch. 2 Appendix: "Graphs in Economics"
  - Ch. 3: "Supply and Demand"
  - Ch. 4: "Price Controls and Quotas: Meddling with Markets"
  - Ch. 5: "Elasticity and Taxation"
  - Ch. 6: "Behind the Supply Curve: Inputs and Costs"
  - Ch. 7: "Perfect Competition and the Supply Curve"
  - — [Macmillan Learning product page](https://www.macmillanlearning.com/college/us/product/Essentials-of-Economics/p/1319330134)

### Inferences
*(Derived by the researcher from the cited methods. All numbers verified with sympy.)*

#### Intuition
- The demand equation answers "how much do buyers want at each price?" The supply equation answers the same question for sellers. Equilibrium is the one price where the two answers agree, so algebraically it is just two equations in two unknowns.
- **Q-form** (Qd = a − bP) is the easiest form to *solve*. **P-form** (P = a/b − Q/b) is the form you *draw*, because economists put price on the vertical axis.
- Demand and supply shifters (income, prices of related goods, tastes, input prices, technology, number of buyers or sellers) live in the intercepts a and c. Price lives in the slope term.
  - A change in P is a *movement along* a curve.
  - A change in a or c is a *shift of* the curve.
  - This is the standard "change in quantity demanded" vs. "change in demand" distinction (Krugman's exact wording was not re-verified, see Gaps).

#### General recipe for Qd = a − bP, Qs = c + dP (b, d > 0)
1. **Equilibrium:** a − bP = c + dP ⇒ **P\* = (a − c)/(b + d)**, and **Q\* = a − bP\* = (ad + bc)/(b + d)**.
2. **Inverse demand:** P = a/b − (1/b)·Qd.
   - The price-axis intercept a/b is the "choke price", where Qd = 0.
   - The quantity-axis intercept is a.
   - The drawn slope is **−1/b**, not −b.
3. **Inverse supply:** P = −c/d + (1/d)·Qs. If c < 0, the price intercept −c/d > 0 is the lowest price at which anything is supplied.
4. **Excess demand at any price P̄:** Qd − Qs = (a − c) − (b + d)·P̄.
   - Positive ⇒ **shortage** (P̄ < P\*, e.g. a binding price ceiling).
   - Negative ⇒ **surplus / excess supply** (P̄ > P\*, e.g. a binding price floor).
   - The quantity actually traded is the smaller of Qd and Qs (the "short side" of the market).
5. **Shifts:**
   - If the demand intercept rises by Δa: ΔP\* = Δa/(b + d) > 0 and ΔQ\* = d·Δa/(b + d) > 0.
   - If the supply intercept rises by Δc: ΔP\* = −Δc/(b + d) < 0 and ΔQ\* = b·Δc/(b + d) > 0.
   - The flatter (more price-responsive) the *other* curve, the more of a shift shows up in quantity rather than price.
6. **Surplus triangles** (valid when supply's price intercept is ≥ 0, i.e. c ≤ 0):
   - CS = ½·Q\*·(a/b − P\*) = **Q\*²/(2b)**
   - PS = ½·Q\*·(P\* + c/d) = **Q\*²/(2d)**
   - Total surplus TS = CS + PS.
   - The Q\*²/(2b) and Q\*²/(2d) shortcuts were verified symbolically.

#### Worked example (verified): Qd = 120 − 4P, Qs = −30 + 6P
- **(a) Equilibrium:** 120 − 4P = −30 + 6P ⇒ 150 = 10P ⇒ **P\* = 15**. Then Q\* = 120 − 4(15) = **60**. Check: Qs = −30 + 6(15) = 60 ✓.
- **(b) Inverse forms:**
  - Demand: P = 30 − 0.25Q (choke price $30).
  - Supply: P = 5 + Q/6 (nothing is supplied below $5).
- **(c) Surplus:**
  - CS = ½ × 60 × (30 − 15) = **450**.
  - PS = ½ × 60 × (15 − 5) = **300**.
  - TS = 750.
  - Shortcut check: 60²/(2·4) = 450 and 60²/(2·6) = 300.
- **(d) Price ceiling at $10:**
  - Qd = 80 and Qs = 30, so there is a **shortage of 50**, and only 30 units are traded.
  - At Q = 30 buyers value the last unit at 30 − 0.25(30) = $22.50, but it costs sellers only $10. So DWL = ½ × (60 − 30) × (22.50 − 10) = **187.5**.
  - Check: CS = 487.5 (if the 30 units go to the buyers who value them most) and PS = 75. TS = 562.5 = 750 − 187.5 ✓.
- **(e) Price floor at $20:** Qd = 40 and Qs = 90, so there is a **surplus (excess supply) of 50**.
- **(f) Demand increase** to Qd = 150 − 4P:
  - 150 − 4P = −30 + 6P ⇒ **P\* = 18, Q\* = 78**.
  - Formula check: ΔP\* = 30/(4 + 6) = 3 ✓ and ΔQ\* = 6·30/10 = 18 ✓.
- **(g) Link to §3:**
  - At the original equilibrium, the point elasticity of demand = (−4)(15/60) = **−1** (unit-elastic), because $15 is exactly halfway to the $30 choke price.
  - The supply elasticity there = 6(15/60) = 1.5.

#### Practice problems (answers verified)
1. Qd = 60 − 2P and Qs = 3P − 15.
   (a) Find P\* and Q\*. (b) Write the inverse demand and inverse supply curves. (c) What happens at P = 12? (d) Compute CS and PS. (e) Rising input costs change supply to Qs = 3P − 30. What is the new equilibrium?
   - **Solution:**
     - (a) 75 = 5P ⇒ P\* = 15, Q\* = 30.
     - (b) Demand: P = 30 − 0.5Q. Supply: P = 5 + Q/3.
     - (c) Qd = 36 and Qs = 21 ⇒ a shortage of 15.
     - (d) CS = ½(30)(30 − 15) = 225. PS = ½(30)(15 − 5) = 150.
     - (e) 60 − 2P = 3P − 30 ⇒ P = 18, Q = 24. Price rises and quantity falls, as expected from a supply decrease.
2. (OpenStax data) Qd = 16 − 2P and Qs = 2 + 5P. Find the equilibrium, the inverse demand curve, and CS.
   - **Solution:** P\* = 2 and Q\* = 12. Inverse demand: P = 8 − 0.5Q. CS = ½(12)(8 − 2) = **36**.
   - **Trap:** here supply has Qs = 2 > 0 at P = 0, so its price intercept is −0.4. Measured down to P = 0, the producer-surplus area is a *trapezoid* = ½·P\*·(Q\* + c) = ½·2·14 = **14**. The naïve triangle ½(12)(2 + 0.4) = 14.4 is wrong. Exams usually avoid this case; if it appears, state your assumption.
3. Use the general formulas with a = 200, b = 5, c = 20, d = 4. Then let demand rise by Δa = 18.
   - **Solution:**
     - P\* = 180/9 = **20**. Q\* = (800 + 100)/9 = **100**. Check: 200 − 100 = 20 + 80 = 100.
     - After the shift: ΔP\* = 18/9 = 2 and ΔQ\* = 4·18/9 = 8, so P = 22 and Q = 108.
4. (Syracuse data, P-form) Demand P = 100 − 2Q, supply P = 0.5Q, and a $40 price floor. Find the equilibrium, CS, PS and DWL.
   - **Solution:**
     - Before the floor: Q\* = 40, P\* = 20, CS = 1,600, PS = 400.
     - With the floor: Q = 30, CS = 900, PS = 975, DWL = 125 (see Cited Findings).

#### Graph-skills checklist
- **Slope between two points** = Δ(vertical variable)/Δ(horizontal variable) = ΔP/ΔQ. On P = 100 − 2Q, going from (Q, P) = (40, 20) to (30, 40) gives (40 − 20)/(30 − 40) = −2.
- **Parallel shift vs. rotation:** a parallel shift changes only the intercept; a rotation changes the slope.
- **Areas:**
  - Triangle = ½ × base × height (CS, PS, DWL).
  - Rectangle = base × height (tax revenue, sellers' gain from a price floor).

### Gaps
- No legitimate copy of Krugman's Ch. 3–4 or the "Graphs in Economics" appendix was available. So I could not confirm:
  - whether the course's own problems use Q-form or P-form;
  - Krugman's exact wording for the shift vs. movement distinction.
- Macmillan's page lists Paul Krugman and Robin Wells as authors of the 6th edition (©2023). The course lists Krugman, Wells & Graddy, which suggests a different edition, so chapter numbers may differ from the map above.
- MIT OCW 14.01 problem sets were not consulted (limited search budget). The practice problems here are either researcher-built or taken from OpenStax and Syracuse.
- The trapezoid producer-surplus case (supply with a positive quantity intercept) is the researcher's own derivation; none of the fetched sources discusses it.

---

## 2. Derivative basics: power rule, sign of f′, tangent slope, first- and second-order conditions

### Takeaway
Nearly every intro-econ function is a polynomial or a power, so the power rule (d/dx xⁿ = n·xⁿ⁻¹) plus the sum and constant-multiple rules is almost all the calculus you need. The derivative is the slope of the tangent line, which economists call "marginal". f′ > 0 means the function is increasing and f′ < 0 means it is decreasing. An interior optimum needs f′(x) = 0; then f″ < 0 confirms a maximum and f″ > 0 a minimum. Profit maximization reduces to MR = MC, and the minimum of average cost reduces to MC = ATC.

### Cited Findings
- **Basic rules:**
  - Constant rule: "If f(x) = c then f′(x) = 0."
  - Power rule: "If f(x) = xⁿ then f′(x) = n xⁿ⁻¹ … n is any number." In words: "bringing the original exponent down in front and multiplying and then subtracting one from the original exponent." The exponent must be a number and the base must be the variable.
  - Sum/difference rule: (f ± g)′ = f′ ± g′.
  - Constant-multiple rule: (cf)′ = c·f′.
  - — [Paul's Online Notes, Differentiation Formulas](https://tutorial.math.lamar.edu/Classes/CalcI/DiffFormulas.aspx)
- "If f′(x) > 0 for every x on some interval I, then f(x) is increasing on the interval." If f′(x) < 0 it is decreasing, and if f′(x) = 0 it is constant. — [Paul's Online Notes, The Shape of a Graph, Part I](https://tutorial.math.lamar.edu/Classes/CalcI/ShapeofGraphPtI.aspx)
- **Second Derivative Test:** suppose f′(c) = 0 and f″ is continuous near c.
  - f″(c) < 0 ⇒ relative maximum.
  - f″(c) > 0 ⇒ relative minimum.
  - f″(c) = 0 ⇒ "can be a relative maximum, relative minimum or neither." For example x⁴, −x⁴ and x³ all have f′(0) = f″(0) = 0.
  - — [Paul's Online Notes, The Shape of a Graph, Part II](https://tutorial.math.lamar.edu/Classes/CalcI/ShapeofGraphPtII.aspx)
- The marginal cost function is C′(x). For C(x) = 500 + 350x − 0.09x², the exact cost of the 301st widget is C(301) − C(300) = $295.91, while C′(300) = $296.00. "C′(n) is the approximate cost of producing the (n+1)st item and NOT the nth item." — [Paul's Online Notes, Business Applications](https://tutorial.math.lamar.edu/Classes/CalcI/BusinessApps.aspx)
- **Apartment example:** profit P(x) = −8x² + 3200x − 80,000 for 0 ≤ x ≤ 250 apartments. P′(x) = −16x + 3200 = 0 ⇒ x = 200. Comparing P(0) = −80,000, P(200) = 240,000 and P(250) = 220,000 shows that renting 200 apartments, not all 250, maximizes profit. — [Paul's Business Applications](https://tutorial.math.lamar.edu/Classes/CalcI/BusinessApps.aspx)
- **Widget-cost example:** C(x) = 250,000 + 0.08x + 200,000,000/x. C′ = 0.08 − 200,000,000/x² = 0 ⇒ x = 50,000. C″ = 400,000,000/x³ > 0 for x > 0, so this is the absolute minimum. — [Paul's Business Applications](https://tutorial.math.lamar.edu/Classes/CalcI/BusinessApps.aspx)
- **Revenue and profit:**
  - Revenue R(x) = x·p(x), where p(x) is the demand (price) function.
  - Profit P(x) = R(x) − C(x).
  - Marginal revenue is R′(x) and marginal profit is P′(x).
  - Setting P′(x) = R′(x) − C′(x) = 0 gives R′(x) = C′(x), i.e. "the marginal cost equals the marginal revenue". This is a maximum if R″(x) < C″(x).
  - Paul warns not to confuse the demand function p(x) with the profit function P(x).
  - — [Paul's Business Applications](https://tutorial.math.lamar.edu/Classes/CalcI/BusinessApps.aspx)
- **Marginal-values example:** C(x) = 75,000 + 100x − 0.03x² + 0.000004x³ and p(x) = 200 − 0.005x.
  - At x = 2,500: C′ = 25, R′ = 175, P′ = 150.
  - At x = 7,500: C′ = 325, R′ = 125, P′ = −200, so the 7,501st widget loses about $200 of profit.
  - — [Paul's Business Applications](https://tutorial.math.lamar.edu/Classes/CalcI/BusinessApps.aspx)
- Economists' jargon: "f′ > 0 means growth or boom, f′ < 0 means decline or recession … the derivative of something is the 'marginal' of it." — [Knill, Harvard Math 1a, Unit 31 "Calculus and Economics"](https://people.math.harvard.edu/~knill/teaching/math1a2021/handouts/lecture31.pdf)

### Inferences
#### Intuition
- f′(x₀) is the slope of the line that just touches the curve at x₀: the rise per one-unit run if you zoom in far enough.
- In economics, "marginal X" is the derivative of total X: MC = dTC/dQ, MR = dTR/dQ, MPL = dQ/dL.
- At the top of a hill the tangent is flat (f′ = 0) and the curve bends down (f″ < 0). At the bottom of a valley it is flat and bends up (f″ > 0). The first-order condition (FOC) finds the flat spots; the second-order condition (SOC) tells a hill from a valley.

#### Rules toolkit
| Function | Derivative |
|---|---|
| c (constant) | 0 |
| xⁿ | n·xⁿ⁻¹ |
| √x = x^(1/2) | 1/(2√x) |
| 1/x = x⁻¹ | −1/x² |
| k·f(x) | k·f′(x) |
| f(x) ± g(x) | f′(x) ± g′(x) |
| f(x)·g(x) (e.g. R = P·Q(P)) | f′g + fg′ (product rule) |
| f(x)/x (any "average") | [x·f′(x) − f(x)]/x² (quotient rule) |

#### Worked example: tangent line to y = 2x² − 8x + 9 at x = 3 (verified)
1. Derivative, using the power rule term by term: y′ = 4x − 8.
2. Slope at x = 3: y′(3) = 12 − 8 = **4**. Since 4 > 0, the function is increasing at x = 3.
3. Point on the curve: y(3) = 18 − 24 + 9 = 3, so the point is (3, 3).
4. Tangent line (point–slope form): y − 3 = 4(x − 3) ⇒ **y = 4x − 9**.
5. Bonus: y′ = 0 at x = 2, and y″ = 4 > 0, so there is a **minimum at (2, 1)**. The function decreases for x < 2 and increases for x > 2.

#### Worked economic examples (verified)
- **Profit maximization:**
  - Inverse demand P = 100 − Q ⇒ TR = 100Q − Q². With TC = 200 + 20Q + Q², profit is π = −2Q² + 80Q − 200.
  - FOC: π′ = −4Q + 80 = 0 ⇒ **Q\* = 20**. SOC: π″ = −4 < 0 ⇒ maximum.
  - Check: MR = 100 − 2Q = 60 and MC = 20 + 2Q = 60, so MR = MC.
  - P = 80 and π = 1,600 − 1,000 = **600**.
  - For a price-taking firm (Ch. 7, perfect competition), P is fixed, so MR = P and the same FOC becomes P = MC.
- **Revenue maximization:**
  - P = 60 − 3Q ⇒ R = 60Q − 3Q².
  - MR = 60 − 6Q = 0 ⇒ Q = 10, P = 30, R = **300**. R″ = −6 < 0 confirms a maximum.
- **Minimum average cost:**
  - TC = 100 + 4Q + Q² ⇒ ATC = 100/Q + 4 + Q.
  - ATC′ = −100/Q² + 1 = 0 ⇒ **Q = 10**. ATC″ = 200/Q³ > 0, so this is a minimum.
  - ATC(10) = 24, and MC = 4 + 2Q = 24 at Q = 10, so **MC = ATC** at the minimum (see §4).

#### Practice problems (answers verified)
1. Differentiate (a) f(x) = 5x⁴ − 3x² + 7x − 2 and (b) g(x) = 4√x + 6/x.
   - **Solution:** (a) 20x³ − 6x + 7. (b) 2/√x − 6/x².
2. Find the tangent line to y = x³ − 3x at x = 2.
   - **Solution:** y′ = 3x² − 3 = 9 at x = 2, and y(2) = 2, so **y = 9x − 16**.
3. Find and classify the critical points of f(x) = x³ − 6x² + 9x + 1.
   - **Solution:** f′ = 3(x − 1)(x − 3), so x = 1 or x = 3. With f″ = 6x − 12:
     - f″(1) = −6 ⇒ **local max**, f(1) = 5.
     - f″(3) = 6 ⇒ **local min**, f(3) = 1.
4. (Problem from Knill's homework, 31.3; solution by the researcher) Production is Q(L) = 5000L³ − 3L⁵. Find the L that maximizes production.
   - **Solution:** Q′ = 15000L² − 15L⁴ = 15L²(1000 − L²) = 0 ⇒ **L = √1000 = 10√10 ≈ 31.6**. Q″(31.6) ≈ −948,683 < 0, so this is a maximum.
   - Problem source: [Knill Unit 31](https://people.math.harvard.edu/~knill/teaching/math1a2021/handouts/lecture31.pdf).
5. For C(x) = 500 + 350x − 0.09x², explain why C′(300) is "the approximate cost of the 301st unit".
   - **Solution:** C′(300) = 350 − 0.18(300) = 296, which is close to C(301) − C(300) = 295.91 (Paul's example). A derivative evaluated at n measures the cost of the *next* unit.

### Gaps
- Khan Academy pages were not fetched (they rely heavily on JavaScript). Paul's Online Notes were used for the derivative rules instead.
- Krugman's appendix terminology for the slope of a nonlinear curve (believed to be an "arc method" for the average slope between two points and a "point method" for the tangent slope) and for maximum/minimum points could not be checked against a legitimate copy. Mathematically, they correspond to [f(x₂) − f(x₁)]/(x₂ − x₁) and f′(x₀) respectively.
- **Source-quality note:** Knill's Unit 31 opening example contains a sign error: it differentiates C(x) = 10x − 0.01x² as "10 + 0.02x". Only the "strawberry theorem" proof (§4) and homework 31.3 from that handout are used here.

---

## 3. Point price elasticity with derivatives; elasticity along a linear demand curve; revenue

### Takeaway
Point elasticity e = (dQ/dP)·(P/Q) multiplies a constant slope by a changing ratio P/Q. Along Qd = a − bP, the magnitude |e| = bP/(a − bP) therefore rises from 0 at the quantity intercept to ∞ at the choke price, and equals 1 exactly at the midpoint P = a/(2b). Because R = P·Q(P) gives **dR/dP = Q(1 + e) = Q(1 − |e|)**:
- raising the price raises revenue when demand is inelastic;
- raising the price lowers revenue when demand is elastic;
- revenue peaks where |e| = 1.

### Cited Findings
- **Definition and sign:** "The price elasticity of demand is the percentage change in the quantity demanded … divided by the percentage change in the price." It is negative mathematically but "usually reported as its absolute value, without a negative sign … By convention, we always talk about price elasticities of demand as positive numbers." — [OpenStax 3e §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
- **Midpoint method:** % change in quantity = (Q₂ − Q₁)/[(Q₂ + Q₁)/2] × 100, and likewise for price. "The advantage of the Midpoint Method is that one obtains the same elasticity between two price points whether there is a price increase or decrease … because the formula uses the same base (average quantity and average price) for both cases." — [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
- On one straight-line demand curve, elasticity differs by location: "price elasticity of demand changes at different points along a straight-line demand curve." — [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
  - Between P = $70 → $60 (Q 2,800 → 3,000): 6.9%/15.4% ≈ **0.45** (inelastic).
  - Between $120 → $130 (Q 1,800 → 1,600): 11.76%/8.0% ≈ **1.47** (elastic).
- "It is a common mistake to confuse the slope of either the supply or demand curve with its elasticity." The reason: at high prices, a given quantity change is a large percentage of a small Q while a price change is a small percentage of a large P, so elasticity is high. At low prices the reverse holds. — [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
- **Point elasticity:** E_d = (dQ_d/dP)·(P/Q_d). — [Wikipedia, Price elasticity of demand](https://en.wikipedia.org/wiki/Price_elasticity_of_demand)
  - "Contrary to common misconception, the price elasticity is not constant even along a linear demand curve." Demand is elastic above the midpoint, unit-elastic at the midpoint and inelastic below it.
  - Marginal revenue: R′ = P(1 + 1/E_d). "Total revenue is maximized at the combination of price and quantity demanded where the elasticity of demand is unitary."
  - Arc formula: E = [(P₁ + P₂)/(Q₁ + Q₂)]·ΔQ/ΔP. It becomes a worse approximation the more curved the demand curve is.
  - Reporting "an elasticity of 2" for a formal value of −2 is a common source of student confusion.
- **Calculus derivation (MATH 104 notes):** R(p) = p·q(p) ⇒ R′(p) = q(p) + p·dq/dp = q(p)[1 + (p/q)(dq/dp)]. Since q > 0, the sign of R′ depends on whether |ε| is above or below 1. — [MATH 104 elasticity notes (M. Mac Lean), hosted on a UC Riverside course page](https://math.ucr.edu/~joselg/teachingS13/elasticity.pdf)
  - |ε| > 1 (elastic): lower the price to raise revenue.
  - |ε| < 1 (inelastic): raise the price.
  - |ε| = 1: "the optimal price which … maximizes revenue."
  - The notes warn: "You should be careful in all circumstances to check which definition is being used" (signed or absolute value).
- **Worked examples from the same notes:** — [MATH 104 notes](https://math.ucr.edu/~joselg/teachingS13/elasticity.pdf)
  - **Example 1:** q = 500 − 10p ⇒ ε = p(−10)/(500 − 10p) = p/(p − 50). At p = $30, **ε = −1.5** (elastic, so lower the price). A 4.5% price rise cuts quantity by 1.5 × 4.5% = 6.75%.
  - **Example 2:** q = 400 − 2p² ⇒ ε = −4p²/(400 − 2p²). Setting ε = −1 gives 6p² = 400, so **p = √(200/3) ≈ $8.16**.
  - **Example 3:** q = 1000 − 10√p. At p = $100, **ε = −1/18** (inelastic), so the seller should raise the price.

### Inferences
#### Intuition: price effect vs. quantity effect
- dR/dP = Q + P·(dQ/dP) has two parts:
  - **Q** is the gain from charging more on every unit still sold (the "price effect").
  - **P·dQ/dP** is the revenue lost on units no longer sold (the "quantity effect", which is negative).
- With elastic demand the quantity effect dominates; with inelastic demand the price effect dominates. (Krugman's own use of these two labels was not re-verified, see Gaps.)

#### Full derivation: dR/dP = Q(1 − |e|), so revenue is maximized at |e| = 1
1. R(P) = P·Q(P).
2. Product rule: dR/dP = Q + P·dQ/dP.
3. Factor out Q: dR/dP = Q[1 + (P/Q)(dQ/dP)] = **Q(1 + e)**. This identity was verified symbolically.
4. Demand slopes down, so e < 0 and e = −|e|. Hence **dR/dP = Q(1 − |e|)**.
5. Q > 0, so the sign of dR/dP is set by |e|:
   - |e| > 1 ⇒ dR/dP < 0: a price rise lowers revenue.
   - |e| < 1 ⇒ dR/dP > 0: a price rise raises revenue.
   - |e| = 1 ⇒ dR/dP = 0: the top of the revenue hill.
6. **Quantity version:** R(Q) = P(Q)·Q ⇒ MR = P + Q·dP/dQ = **P(1 + 1/e) = P(1 − 1/|e|)**.
   - MR > 0 when demand is elastic, MR = 0 at unit elasticity, and MR < 0 when inelastic.
   - For a linear inverse demand P = A − BQ, **MR = A − 2BQ**: same intercept, twice the slope. MR = 0 at Q = A/(2B), the midpoint.

#### Why elasticity changes along a linear demand curve
- For Qd = a − bP: |e| = bP/(a − bP) = **P/(a/b − P)**. That is the distance from P down to 0, divided by the distance from P up to the choke price.
- So |e| = 0 at P = 0; |e| < 1 below the midpoint; **|e| = 1 at P = a/(2b)** (where Q = a/2); |e| > 1 above the midpoint; and |e| → ∞ as P → a/b. The slope (−b) never changes; only the ratio P/Q does.
- **Special shapes:**
  - A vertical demand curve (dQ/dP = 0) has e = 0: perfectly inelastic.
  - A horizontal demand curve has |e| → ∞: perfectly elastic.
  - A constant-elasticity curve Q = A·P^(−k) has e = −k at every price.
- On a straight line, the midpoint-method (arc) elasticity between two prices exactly equals the point elasticity at the midpoint of that arc (verified symbolically).

#### Worked example (verified): Qd = 100 − 2P (choke price $50, midpoint $25)
| P | Q | e = −2P/Q | \|e\| | Region | R = P·Q | dR/dP = 100 − 4P | Q(1 − \|e\|) |
|---|---|---|---|---|---|---|---|
| 10 | 80 | −0.25 | 0.25 | inelastic | 800 | +60 | 80 × 0.75 = +60 |
| 25 | 50 | −1 | 1 | unit-elastic | **1,250 (max)** | 0 | 0 |
| 40 | 20 | −4 | 4 | elastic | 800 | −60 | 20 × (−3) = −60 |

- R(P) = 100P − 2P² ⇒ R′ = 100 − 4P = 0 ⇒ P = 25, Q = 50, R = 1,250. R″ = −4 < 0, so this is a maximum. The two formulas for dR/dP agree at every price.
- **Reading it:** at P = 10, a price rise raises revenue (inelastic). At P = 40, a price cut raises revenue (elastic).

#### Practice problems (answers verified)
1. q = 500 − 10p (from the MATH 104 notes). (a) Find e(p). (b) Classify demand at p = 30. (c) Find the revenue-maximizing price and the maximum revenue.
   - **Solution:**
     - (a) e = p/(p − 50).
     - (b) e(30) = −1.5 ⇒ elastic.
     - (c) |e| = 1 ⇒ p = 50 − p ⇒ **p = $25**, q = 250, R = 6,250. Compare R(30) = 6,000: cutting the price raised revenue, consistent with elastic demand at $30.
2. Inverse demand is P = 30 − 0.25Q. Find the point elasticity at Q = 60.
   - **Solution:** P = 15. dQ/dP = 1/(dP/dQ) = 1/(−0.25) = −4, so e = −4 × 15/60 = **−1** (unit-elastic). Check: MR = 30 − 0.5Q = 0 at Q = 60.
   - **Trap:** plugging in dP/dQ = −0.25 instead of dQ/dP gives −0.0625, which is wrong.
3. Demand is Qd = 100 − 2P, and the price rises from $20 to $30 (Q falls from 60 to 40). Compute the elasticity (a) using the initial values as the base, (b) for the reverse move $30 → $20, (c) with the midpoint method, and (d) as a point elasticity at P = 25.
   - **Solution:**
     - (a) (20/60)/(10/20) = 0.67.
     - (b) (20/40)/(10/30) = 1.5.
     - (c) (20/50)/(10/25) = **1.0**.
     - (d) 2 × 25/50 = **1.0**.
   - **Lesson:** the base matters. Use the midpoint method for two-point questions.
4. q = 400 − 2p² (MATH 104 Example 2). Find the revenue-maximizing price two ways.
   - **Solution:**
     - Elasticity route: −4p²/(400 − 2p²) = −1 ⇒ 6p² = 400 ⇒ p ≈ $8.16.
     - Direct route: R = 400p − 2p³, so R′ = 400 − 6p² = 0 gives the same p.
     - Either way, q ≈ 266.7 and R ≈ $2,177.
5. Q = 1000·P⁻². Show that e = −2 at every price. What does a price rise do to revenue?
   - **Solution:** dQ/dP = −2000P⁻³, so e = −2000P⁻³·P/(1000P⁻²) = −2. Revenue R = 1000/P always falls when P rises: demand is elastic everywhere, so there is no interior revenue maximum.

### Gaps
- Krugman's exact phrasing was not re-verified against a legitimate copy: whether *Essentials* calls the ratio method the "midpoint method", and whether it uses the labels "price effect" and "quantity effect" for the two revenue terms.
- OpenStax §5.2 (polar cases) and §5.3 were not fetched. The special-shape statements above (vertical, horizontal, constant elasticity) are derived from the formula rather than quoted.

---

## 4. Marginal–average relationships (MC vs. ATC/AVC; MP vs. AP)

### Takeaway
**d(TC/Q)/dQ = (MC − ATC)/Q.** So average cost falls while marginal cost is below it, rises while marginal cost is above it, and is flat (at its minimum) exactly where MC = ATC. The same algebra gives MC = AVC at AVC's minimum, and MP = AP at AP's maximum. It is the "class average" logic: a new score below the average pulls it down, and a new score above pulls it up.

### Cited Findings
- **Cost definitions:**
  - TC = FC + VC.
  - MC = ΔTC/ΔQ, "the cost of producing one more unit of output".
  - ATC = TC/Q and AVC = VC/Q.
  - — [OpenStax 3e §7.3](https://openstax.org/books/principles-economics-3e/pages/7-3-costs-in-the-short-run)
- "If the marginal cost of production is below the average cost for producing previous units … then producing one more additional unit will reduce average costs overall—and the ATC curve will be downward-sloping in this zone. Conversely, if the marginal cost … is above the average cost … the ATC curve must be upward-sloping in this zone." — [OpenStax §7.3](https://openstax.org/books/principles-economics-3e/pages/7-3-costs-in-the-short-run)
- OpenStax's analogy: "If the score on the most recent quiz you take is lower than your average score on previous quizzes, then the marginal quiz pulls down your average. If your score on the most recent quiz is higher than the average on previous quizzes, the marginal quiz pulls up your average." — [OpenStax §7.3](https://openstax.org/books/principles-economics-3e/pages/7-3-costs-in-the-short-run)
- **OpenStax barber-shop table** (FC $160; each barber costs $80): — [OpenStax §7.3](https://openstax.org/books/principles-economics-3e/pages/7-3-costs-in-the-short-run)
  - ATC = $6.67 at both 60 and 72 haircuts, and MC from 60 → 72 haircuts is $80/12 = $6.67. MC meets ATC at the bottom of the ATC curve.
  - AVC = $4.00 at both 40 and 60 haircuts, where MC (40 → 60) = $80/20 = $4.00.
  - Beyond 72 haircuts, MC = $10 and $20 while ATC rises to $7.00 and $7.62.
- **Calculus proof (Paul's Online Notes):** C̄(x) = C(x)/x ⇒ C̄′(x) = [x·C′(x) − C(x)]/x². Setting C̄′ = 0 gives x·C′(x) − C(x) = 0 ⇒ C′(x) = C(x)/x = C̄(x). So "for a typical average cost function we will get the minimum average cost when the marginal cost is equal to the average cost," with the caution that "not all average cost functions will look like this." — [Paul's Business Applications](https://tutorial.math.lamar.edu/Classes/CalcI/BusinessApps.aspx)
- **"Strawberry theorem" (Knill):** let F be the total, f = F′ the marginal, and g = F/x the average. Then g′ = (F/x)′ = F′/x − F/x² = (1/x)(f − g), so g′(x) = 0 if and only if f = g. Because total costs are typically concave up, these points are usually minima of average cost. Knill illustrates it with strawberries of changing size placed one by one on a scale that reports average weight. — [Knill, Harvard Math 1a, Unit 31](https://people.math.harvard.edu/~knill/teaching/math1a2021/handouts/lecture31.pdf)
- **Production side:** MPL = ΔQ/ΔL and APL = Q/L. "When marginal product is above average product, average product is rising. When marginal product is below average product, average product is falling." So MP crosses AP at AP's maximum. The text uses a grade-point-average analogy. — [*Principles of Microeconomics* §8.1 (Saylor), via Lumen/SUNY](https://courses.lumenlearning.com/suny-microeconomics/chapter/production-choices-and-costs/)

### Inferences
#### One-line proofs (verified symbolically)
- **ATC:** d(ATC)/dQ = d(TC/Q)/dQ = (Q·MC − TC)/Q² = **(MC − ATC)/Q**. Since Q > 0:
  - MC < ATC ⇒ ATC is falling.
  - MC > ATC ⇒ ATC is rising.
  - MC = ATC ⇒ ATC′ = 0: the bottom of the U-shaped ATC curve (the output Krugman calls "minimum-cost output", see Gaps).
- **AVC:** VC′ = TC′ = MC, because fixed cost has a zero derivative. So d(AVC)/dQ = **(MC − AVC)/Q**, and MC crosses AVC at AVC's minimum.
- **Order of the minima:** ATC = AVC + AFC, and AFC = FC/Q is always falling. At AVC's minimum, MC = AVC < ATC, so ATC is still falling there. Hence ATC bottoms out at a *larger* Q than AVC. When MC is U-shaped, MC's own minimum comes before both.
- **AP vs. MP:** d(AP)/dL = d(Q/L)/dL = **(MP − AP)/L**. AP rises while MP > AP, peaks where MP = AP, and falls afterwards.

#### Class-average intuition (with numbers)
- 20 students average 70, so the total is 1,400.
  - A 21st student scoring 50 (marginal below average) drops the average to 1,450/21 ≈ **69.05**.
  - One scoring 91 (marginal above average) raises it to 1,491/21 = **71**.
  - One scoring exactly 70 leaves it at **70**.
- The average stops changing only when the marginal score equals the average, which is exactly the MC = ATC condition.
- **Trap:** the average can be *rising* while the marginal is *falling*, as long as the marginal is still above the average.

#### Worked example (verified): TC = 100 + 20Q − 6Q² + Q³
- **Pieces:**
  - FC = 100 and VC = 20Q − 6Q² + Q³.
  - MC = 20 − 12Q + 3Q².
  - AVC = 20 − 6Q + Q².
  - ATC = 100/Q + 20 − 6Q + Q².
- **MC minimum:** MC′ = −12 + 6Q = 0 ⇒ Q = 2, MC = 8. Diminishing returns set in here.
- **AVC minimum:** AVC′ = −6 + 2Q = 0 ⇒ Q = 3, AVC = 11. Check: MC(3) = 20 − 36 + 27 = 11 = AVC ✓.
- **ATC minimum:** ATC′ = −100/Q² − 6 + 2Q = 0 ⇒ Q = 5 (check: −4 − 6 + 10 = 0).
  - ATC(5) = 20 + 20 − 30 + 25 = 35, and MC(5) = 20 − 60 + 75 = 35 = ATC ✓.
  - ATC″(5) = 200/125 + 2 = 3.6 > 0, so it is a minimum.

| Q | TC | MC | AVC | ATC |
|---|---|---|---|---|
| 1 | 115 | 11 | 15 | 115.00 |
| 2 | 124 | **8 (min)** | 12 | 62.00 |
| 3 | 133 | 11 | **11 (min)** | 44.33 |
| 4 | 148 | 20 | 12 | 37.00 |
| 5 | 175 | 35 | 15 | **35.00 (min)** |
| 6 | 220 | 56 | 20 | 36.67 |
| 7 | 289 | 83 | 27 | 41.29 |

- **Reading the table:**
  - MC < AVC for Q < 3, so AVC is falling; MC > AVC after that, so AVC is rising.
  - MC < ATC for Q < 5 and MC > ATC after.
  - The minima come in order: MC (Q = 2), then AVC (Q = 3), then ATC (Q = 5).

#### Production-side example (verified): Q = 6L² − L³
- MPL = 12L − 3L² and APL = 6L − L².
- MPL peaks at L = 2 (MPL = 12). This is where diminishing marginal returns begin.
- APL peaks at **L = 3, where MPL = APL = 9** ✓.
- Total product peaks at L = 4, where MPL = 0 and Q = 32. Beyond that, MPL < 0.

#### Practice problems (answers verified)
1. Prove that MC = AVC at the minimum of AVC.
   - **Solution:** d(VC/Q)/dQ = (Q·VC′ − VC)/Q² = (MC − AVC)/Q. Setting this to 0 gives MC = AVC.
2. TC = 100 + 4Q + Q². Find the minimum-cost output and the minimum ATC, and verify that MC = ATC there.
   - **Solution:** Q = 10, ATC = 24, MC = 24.
3. With TC = 100 + 20Q − 6Q² + Q³, is ATC rising or falling at Q = 4? Use only MC and ATC.
   - **Solution:** MC(4) = 20 < ATC(4) = 37 ⇒ ATC is falling (it keeps falling until Q = 5). Note that MC itself is already rising at Q = 4.
4. Using the OpenStax barber data (Q = 60 → 72 haircuts, TC $400 → $480), explain why 72 haircuts is approximately the minimum-ATC output.
   - **Solution:** MC over that step = 80/12 = $6.67 = ATC(72) = 480/72. Beyond 72, MC = $10 > ATC, so ATC rises (to $7.00 at 80 haircuts).
5. For Q = 6L² − L³, is APL rising at L = 2.5?
   - **Solution:** MPL = 30 − 18.75 = 11.25 > APL = 15 − 6.25 = 8.75 ⇒ yes, APL is still rising.

### Gaps
- Two Krugman items come from familiarity with the textbook and were not re-verified against a legitimate copy:
  - his explanation of the U-shaped ATC curve (the "spreading effect" of fixed cost vs. the "diminishing returns effect" on variable cost);
  - the term "minimum-cost output".
- The fetch tool reported the OpenStax barber table's first-row MC as $15.00, which does not equal ΔTC/ΔQ = (240 − 160)/16 = $5.00. I could not tell whether this is an error in the source or in the extraction, so only the rows from 40 haircuts onward are used here.

---

## 5. Diminishing returns as f′(L) > 0 and f″(L) < 0

### Takeaway
Diminishing returns to an input means each extra unit of the input (with other inputs held fixed) still adds output, but less than the previous unit added. In calculus: **MPL = f′(L) > 0 and dMPL/dL = f″(L) < 0**, so the total product curve rises at a decreasing rate (it is concave). √L, 10L − L² (for L < 5), and Cobb–Douglas with a labor exponent below 1 all have this property. Through **MC = w/MPL**, diminishing returns are the reason short-run marginal cost slopes upward.

### Cited Findings
- The law of diminishing returns is "the decrease in marginal (incremental) output of a production process as the amount of a single factor of production is incrementally increased, holding all other factors of production equal." Diminishing returns occur when "marginal product is positive, and marginal product is decreasing." This differs from negative returns, where additional input actually reduces total output. — [Wikipedia, Diminishing returns](https://en.wikipedia.org/wiki/Diminishing_returns)
- OpenStax's short-run example (fixed capital): output with 1 to 5 workers is 4, 10, 12, 13 and 13 units, so the marginal products are 4, 6, 2, 1 and 0. MP rises at first, "but sooner or later additional workers will have decreasing marginal product … This is called the Law of Diminishing Marginal Product." It is a short-run phenomenon caused by fixed capital. — [OpenStax 3e §7.2](https://openstax.org/books/principles-economics-3e/pages/7-2-production-in-the-short-run)
- "The marginal product of any variable factor of production will eventually decline, assuming the quantities of other factors of production are unchanged." — [*Principles of Microeconomics* §8.1 (Saylor), via Lumen](https://courses.lumenlearning.com/suny-microeconomics/chapter/production-choices-and-costs/)
- "The marginal cost curve is generally upward-sloping, because diminishing marginal returns implies that additional units are more costly to produce." In the barber example, successive barbers add 16, 24, 20 and 12 haircuts. — [OpenStax §7.3](https://openstax.org/books/principles-economics-3e/pages/7-3-costs-in-the-short-run)

### Inferences
#### The calculus test
- **f′(L) > 0** (more labor still raises output) **and f″(L) < 0** (each increase is smaller than the last) ⇔ diminishing marginal returns.
- If f″ > 0 over some range, that range has *increasing* marginal returns. This is typical with very few workers, because of specialization.
- If f′ < 0, returns are *negative*.

#### Examples (verified)
- **Q = √L:**
  - MPL = 1/(2√L) > 0 and f″ = −1/(4L^(3/2)) < 0 for all L > 0.
  - MPL at L = 4, 16 and 64 is 0.25, 0.125 and 0.0625: quadrupling labor halves MPL.
  - APL = 1/√L = 2·MPL > MPL, so APL is always falling (consistent with §4).
- **Q = 10L − L²:**
  - MPL = 10 − 2L and f″ = −2 < 0 everywhere, so returns diminish from the first worker.
  - MPL > 0 only for L < 5. Total product peaks at L = 5 (Q = 25).
  - For L > 5, MPL < 0: negative returns ("too many cooks").
- **Cobb–Douglas Q = A·K^α·L^β:**
  - MPL = βA·K^α·L^(β−1) > 0, and dMPL/dL = β(β − 1)A·K^α·L^(β−2), which is < 0 if and only if **β < 1**.
  - Example: Q = 4K^0.5·L^0.5 with K fixed at 16 gives Q = 16√L and MPL = 8/√L. MPL = 4 at L = 4 and 2 at L = 16.
  - If capital rises to K = 25, MPL at L = 4 rises to 5. More of the fixed input shifts the MPL curve up, since dMPL/dK = αβA·K^(α−1)·L^(β−1) > 0.
- **S-shaped Q = 6L² − L³:**
  - f″ = 12 − 6L is > 0 for L < 2 (increasing returns) and < 0 for L > 2 (diminishing returns).
  - The inflection point L = 2 is where MPL peaks.

#### Link to costs (verified)
- Suppose labor is the only variable input, at wage w. Then VC = w·L, so:
  - **MC = dVC/dQ = w·(dL/dQ) = w/MPL**;
  - **AVC = wL/Q = w/APL**.
- Falling MPL ⇒ rising MC. Rising APL ⇒ falling AVC. The cost curves are mirror images of the product curves.
- **Example:** Q = 16√L with w = 32 ⇒ L = (Q/16)², VC = Q²/8, and MC = Q/4 = w/MPL, which rises with Q.

#### Practice problems (answers verified)
1. Show that Q = 20L^0.5 has diminishing returns.
   - **Solution:** MPL = 10L^(−0.5) > 0 and dMPL/dL = −5L^(−1.5) < 0.
2. For Q = 10L − L², at what L does total product peak? What is MPL at L = 2 and at L = 6?
   - **Solution:** total product peaks at L = 5. MPL(2) = 6 and MPL(6) = −2 (negative returns).
3. For Q = 4K^0.5·L^0.5 with K = 16 and w = 32, derive MC(Q).
   - **Solution:** MC = Q/4.
4. Is Q = L² subject to diminishing returns?
   - **Solution:** No. MPL = 2L is rising (f″ = 2 > 0), so this has increasing marginal returns.
5. Q = K^0.5·L^0.5: doubling both inputs doubles output. Does it still have diminishing returns to labor?
   - **Solution:** Yes. Diminishing returns to one input (holding the others fixed) is a different concept from returns to scale (scaling all inputs together). β = 0.5 < 1 gives diminishing returns to labor, while α + β = 1 gives constant returns to scale.

### Gaps
- No fetched source states the condition in calculus notation (f′ > 0, f″ < 0). Wikipedia states it verbally: marginal product is positive and decreasing. The Cobb–Douglas derivations are the researcher's own.
- I did not verify whether Krugman's *Essentials* uses the phrase "diminishing returns to an input" (OpenStax uses "diminishing marginal productivity/product").

---

## 6. The Laffer curve as R = t·Y(t)

### Takeaway
Tax revenue R(t) = t·Y(t) is zero at t = 0 (no tax rate) and at t = 1 (no taxable activity left). So if the tax base shrinks as the rate rises, there is an interior revenue-maximizing rate.
- With Y(t) = Y₀(1 − t): R = Y₀(t − t²), and R′ = Y₀(1 − 2t) = 0 ⇒ **t\* = 50%**. R″ = −2Y₀ < 0, and R\* = Y₀/4.
- More generally, Y = Y₀(1 − t)^e gives **t\* = 1/(1 + e)**.
- Revenue peaks where the tax base's elasticity with respect to the rate equals 1. This is the same logic as revenue peaking at unit price elasticity in §3.

### Cited Findings
- The Laffer curve relates tax rates to government tax revenue. Because "no tax revenue is raised at the extreme tax rates of 0% and 100%," a revenue-maximizing rate exists somewhere in between. — [Wikipedia, Laffer curve](https://en.wikipedia.org/wiki/Laffer_curve)
- Flat-tax model with constant elasticity e of the tax base: R = t·B₀·(1 − t)^e, with revenue-maximizing rate **t\* = 1/(1 + e)**. For top incomes, t\* = 1/(1 + a·e), where a is the Pareto parameter. — [Wikipedia, Laffer curve](https://en.wikipedia.org/wiki/Laffer_curve)
- Estimates of the revenue-maximizing rate vary widely: — [Wikipedia, Laffer curve](https://en.wikipedia.org/wiki/Laffer_curve)
  - ≈65% (Pecorino 1995);
  - 70% (Stuart 1981, Sweden);
  - ≈70% (Trabandt & Uhlig 2011, who place the U.S. and Europe on the left side of the curve);
  - 32.67%–35.21% (Hsing 1996, U.S. data for 1959–1991).
- Arthur Laffer popularized the idea at a 1974 meeting with Ford-administration officials (sketched "on a napkin"). Jude Wanniski coined the name. Precursors include Ibn Khaldun and Adam Smith. The curve's shape is "uncertain and disputed", it may be "skewed or lop-sided", and the peak "can only be estimated". — [Wikipedia, Laffer curve](https://en.wikipedia.org/wiki/Laffer_curve)

### Inferences
#### Derivation (verified)
1. R(t) = t·Y(t) = Y₀·t·(1 − t) = Y₀(t − t²).
2. FOC: R′(t) = Y₀(1 − 2t) = 0 ⇒ **t\* = 1/2**.
3. SOC: R″(t) = −2Y₀ < 0, so this is a maximum. R\* = Y₀·(1/2)·(1/2) = **Y₀/4**.
4. **Elasticity form:** R′(t) = Y + t·Y′(t) = Y[1 + (t/Y)(dY/dt)] = Y(1 + η).
   - Here η = (dY/dt)(t/Y) < 0 is the elasticity of the tax base with respect to the tax rate.
   - Raising t raises revenue if and only if |η| < 1.
   - For Y = Y₀(1 − t), η = −t/(1 − t), and |η| = 1 ⇔ t = 1/2.
   - This has exactly the same structure as dR/dP = Q(1 − |e|) in §3.
5. **General base** Y = Y₀(1 − t)^e: R′ = Y₀(1 − t)^(e−1)·[(1 − t) − e·t] = 0 ⇒ **t\* = 1/(1 + e)**, matching the Wikipedia formula. Setting e = 1 recovers 50%.

#### Numbers, with Y₀ = 1,000
- R(0.3) = R(0.7) = **210**: two different rates raise the same revenue. This is the core Laffer point.
- R′(0.3) = +400: on the left side, a rate rise raises revenue.
- R′(0.7) = −400: on the right ("prohibitive") side, a rate cut raises revenue.
- The peak is R(0.5) = 250.

#### Micro version: excise-tax revenue in a linear market (verified)
This ties the Laffer idea to Krugman Ch. 5 "Elasticity and Taxation".
- Use the §1 market, Qd = 120 − 4P and Qs = −30 + 6P, with a per-unit tax T collected from sellers.
  - Buyers pay Pd = 15 + 0.6T; sellers receive Ps = Pd − T.
  - Quantity traded: Q(T) = 60 − 2.4T.
- Revenue R(T) = T·(60 − 2.4T). R′ = 60 − 4.8T = 0 ⇒ **T\* = 12.5**.
  - At T\*: Q = 30, R = **375**, buyers pay $22.50 and sellers receive $10.00.
  - DWL = ½ × 12.5 × 30 = 187.5.
- Revenue is zero at T = 0 and again at T = 25 (where quantity reaches zero): a Laffer curve in miniature. In this linear market, the revenue-maximizing tax halves the quantity traded.

#### Practice problems (answers verified)
1. Y(t) = 1,000(1 − t). Find t\* and R\*, and compare revenue at 30% and 70%.
   - **Solution:** t\* = 0.5 and R\* = 250. Revenue is 210 at both 30% and 70%.
2. Y(t) = Y₀(1 − t)². Find t\*.
   - **Solution:** R′ = Y₀(1 − t)(1 − 3t) = 0 ⇒ **t\* = 1/3** (the other root, t = 1, gives R = 0). R\* = 4Y₀/27 ≈ 0.148·Y₀. Check against t\* = 1/(1 + e) with e = 2.
3. Y(t) = Y₀(1 − t²). Find t\*.
   - **Solution:** R = Y₀(t − t³), so R′ = Y₀(1 − 3t²) = 0 ⇒ **t\* = 1/√3 ≈ 57.7%**. R″ = −6t·Y₀ < 0 confirms a maximum.
4. In the excise example, does a tax of T = 20 raise more or less revenue than T = 5?
   - **Solution:** R(5) = 5 × 48 = 240 and R(20) = 20 × 12 = 240, which are **identical** (the curve is symmetric around T\* = 12.5).
   - But the deadweight loss is ½·T·2.4T = 1.2T²: only **30** at T = 5 versus **480** at T = 20.

### Gaps
- No fetched source presents the exact teaching model Y(t) = Y₀(1 − t). It is the e = 1 special case of Wikipedia's (1 − t)^e model, and its derivation here is the researcher's own.
- I could not check whether NTS3040 covers the Laffer curve in Krugman's terms. It is mainly a macro/public-finance topic and does not appear in the micro chapter titles listed above.

---

## 7. Common math mistakes on intro-econ exams

### Takeaway
The recurring point-losers are:
- sign / absolute-value confusion in elasticity;
- the wrong base for percentage changes;
- treating slope as if it were elasticity;
- mixing up Q-form and P-form equations (price goes on the vertical axis);
- solving a first-order condition without checking the second-order condition or plugging the answer back in;
- confusing "marginal" with "average", and "a surplus" (excess supply) with consumer/producer surplus.

### Cited Findings
- **Elasticity sign:**
  - Price elasticity of demand is negative mathematically but is reported as an absolute value by convention. — [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
  - Calling a −2 elasticity "an elasticity of 2" is a common source of student confusion. — [Wikipedia, Price elasticity of demand](https://en.wikipedia.org/wiki/Price_elasticity_of_demand)
  - "Be careful in all circumstances to check which definition is being used." — [MATH 104 notes](https://math.ucr.edu/~joselg/teachingS13/elasticity.pdf)
- **Percent-change base:**
  - The same $2 raise is 20% of $10 but only 16.7% of $12: "The same change over times yields a smaller growth rate." — [OpenStax Appendix A](https://openstax.org/books/principles-economics-3e/pages/a-the-use-of-mathematics-in-principles-of-economics)
  - The midpoint method gives the same elasticity "whether there is a price increase or decrease" because it uses the same (average) base. — [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
- **Slope vs. elasticity:**
  - "It is a common mistake to confuse the slope of either the supply or demand curve with its elasticity." — [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
  - "Contrary to common misconception, the price elasticity is not constant even along a linear demand curve." — [Wikipedia, Price elasticity of demand](https://en.wikipedia.org/wiki/Price_elasticity_of_demand)
- **Axes:** "Since P is on the vertical axis, it is easiest if you solve each equation for P." So Qd = 16 − 2P is drawn as P = 8 − 0.5Qd. — [OpenStax Appendix A](https://openstax.org/books/principles-economics-3e/pages/a-the-use-of-mathematics-in-principles-of-economics)
- **Plug-back check:** "Making sure you get the same answer using either equation is a good way to check your work." — [Syracuse PAI 897, Lecture 4](https://dcpopp.expressions.syr.edu/wp-content/uploads/PAI897_lect4.pdf)
- **Marginal timing, notation and endpoints:** — [Paul's Business Applications](https://tutorial.math.lamar.edu/Classes/CalcI/BusinessApps.aspx)
  - "C′(n) is the approximate cost of producing the (n+1)st item and NOT the nth item."
  - Don't confuse the demand function p(x) with the profit function P(x).
  - Don't assume the maximum is at an endpoint or at full capacity; compare the critical points with the endpoints.
- **Second-order check:** f″(c) = 0 is inconclusive (x⁴, −x⁴ and x³ are all examples). — [Paul's Shape of a Graph, Part II](https://tutorial.math.lamar.edu/Classes/CalcI/ShapeofGraphPtII.aspx)
- **MC = AC caveat:** MC = AC at the minimum holds for "typical" average cost functions, but "not all average cost functions will look like this." — [Paul's Business Applications](https://tutorial.math.lamar.edu/Classes/CalcI/BusinessApps.aspx)

### Inferences
#### Mistake → fix checklist (all numeric examples verified)
| # | Mistake | Example of the error | Fix |
|---|---|---|---|
| 1 | Classifying elasticity by its sign | "e = −1.5, and −1.5 < 1, so demand is inelastic" | Classify using \|e\|: \|−1.5\| > 1 ⇒ **elastic**. Say whether you are reporting e or \|e\|. |
| 2 | Wrong percent-change base | For Qd = 100 − 2P: $20 → $30 counted as a 50% rise, but $30 → $20 as a 33% fall, giving two elasticities (0.67 and 1.5) | Use the midpoint method for two-point questions (gives 1.0). Use (dQ/dP)(P/Q) for "at a point" questions. |
| 3 | Treating slope as elasticity | "Qd = 100 − 2P has elasticity 2 everywhere" | The slope is constant, but \|e\| = 2P/Q varies: 0.25 at P = 10, 1 at P = 25, 4 at P = 40. |
| 4 | Using dP/dQ instead of dQ/dP | From P = 30 − 0.25Q at Q = 60: e = −0.25 × 15/60 = −0.0625 | dQ/dP = 1/(dP/dQ) = −4 ⇒ e = −1. |
| 5 | Axes reversed | Drawing Qd = 16 − 2P with vertical intercept 16 and slope −2 | Invert first: P = 8 − 0.5Q (vertical intercept 8, slope −0.5). The *quantity*-axis intercept is 16. |
| 6 | Misreading intercepts | Reading Qs = −30 + 6P as "price starts at −30" | In Q-form the intercept is a *quantity*. The price intercept is −c/d = 30/6 = $5. |
| 7 | Wrong triangle height | CS = ½ × 40 × 20 = 400 for P = 100 − 2Q, P\* = 20 (using P\* itself as the height) | Height = choke price − P\* = 100 − 20 = 80 ⇒ CS = ½ × 40 × 80 = 1,600. |
| 8 | Wrong triangle base or missing ½ | Using the curve's quantity intercept (50) as the base | The base is the equilibrium (or actually traded) quantity. Under a price control, use the traded quantity = min(Qd, Qs). |
| 9 | Mixing up shortage and surplus | Calling Qs > Qd a "shortage" | Price above equilibrium ⇒ **surplus** (excess supply). Price below ⇒ **shortage** (excess demand). Don't confuse "a surplus" with consumer/producer surplus, which are welfare areas. |
| 10 | FOC without SOC | For f = x³ − 6x² + 9x + 1, calling the critical point x = 1 "the minimum" | f″(1) = −6 < 0, so x = 1 is a local **max**. The min is at x = 3. |
| 11 | Taking the wrong root of P = MC | With TC = 100 + 20Q − 6Q² + Q³ and P = 20, MC = P gives Q = 0 or Q = 4 | π″ = −MC′: at Q = 0, π″ = 12 > 0 (profit minimum); at Q = 4, π″ = −12 < 0 (maximum). Choose the root where MC is rising. Here π(4) = −68, which beats shutting down (−100) because P = 20 > min AVC = 11. |
| 12 | Confusing marginal with average | "MC is rising, so ATC must be rising" | ATC rises only when MC > ATC. At Q = 4 in the example above, MC = 20 and is rising, but ATC = 37 is still falling. |
| 13 | Confusing a shift with a movement along the curve | Treating a price change as a shift of demand | A price change is a movement along the curve. A change in a or c (income, tastes, input costs) is a shift. |
| 14 | Ignoring units | Comparing slopes across goods measured in different units | Elasticity is unit-free; slope is not. |
| 15 | Forgetting the product rule | Writing dR/dP = dQ/dP for R = P·Q(P) | dR/dP = Q + P·dQ/dP. |

### Gaps
- No fetched source compiles empirical data on which intro-econ exam errors are most frequent. The checklist combines warnings stated in the cited sources (rows 1–3, 5, 10, 12 and part of 15) with the researcher's judgment (rows 4, 6–9, 11, 13–14).
- I did not check Krugman-specific notation conventions, such as whether *Essentials* writes demand equations in Q-form or P-form in its end-of-chapter problems.
