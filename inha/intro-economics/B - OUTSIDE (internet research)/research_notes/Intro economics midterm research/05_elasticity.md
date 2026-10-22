# Elasticity: outside research notes for Krugman, Wells & Graddy, *Essentials of Economics*, Ch. 5 (NTS3040, Inha University in Tashkent, midterm 24–30 Oct 2026)

*Compiled 2026-10-19 from external sources only: OpenStax (CC BY), .edu course materials, peer-reviewed research, and government or agency data. No textbook copies were used. Search results surfaced unauthorized full-text PDFs of Krugman; these were deliberately excluded. A script re-checked every number in the worked examples and answers. Notation: **E_d** is the price elasticity of demand as a positive number (absolute value), following the Krugman/OpenStax convention, and **E_s** is the price elasticity of supply.*

---

## 1. Price elasticity of demand: definition, why the minus sign is dropped, simple % change vs. the midpoint method

### Takeaway
E_d = (% change in quantity demanded) ÷ (% change in price), reported as a positive number. Simple percentage changes give different answers depending on the starting point: the $0.90 → $1.10 example gives 0.82 going up and 1.22 going down. The midpoint method uses the *average* price and quantity as the base, so both directions give the same answer, 1.00 (unit-elastic).

### Cited Findings
- **Definition.** Price elasticity of demand is "the percentage change in the quantity demanded of a good or service divided by the percentage change in the price." — [OpenStax Principles of Economics 3e, §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
- **Why the minus sign is dropped.**
  - Price elasticities of demand are always negative, because price and quantity move in opposite directions. Still, "by convention, we always talk about price elasticities of demand as positive numbers… we take the absolute value." — [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
  - A university handout states the same convention: "Due to the inverse relationship between price and quantity demanded, economists often refer to price elasticity of demand as a positive value (i.e., in absolute value terms)." — [UW–Madison Econ 101 (Fall 2012) elasticity handout with solutions](https://home.uchicago.edu/~kanit/kanitk/Teaching_(UW-Madison)/Entries/2013/1/21_ECON_101__Principles_of_Microeconomics(Fall_2012)_files/handout7_with_solutions.pdf)
- **Midpoint formula.**
  - % change in quantity = (Q2 − Q1) / [(Q2 + Q1)/2] × 100.
  - % change in price = (P2 − P1) / [(P2 + P1)/2] × 100.
  - Source: [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
  - An equivalent compact "arc elasticity" form is E_d = [(P1 + P2)/(Q1 + Q2)] × (ΔQ/ΔP). It uses average prices and quantities to fix the asymmetry problem. — [Wikipedia: Price elasticity of demand](https://en.wikipedia.org/wiki/Price_elasticity_of_demand)
- **Why use the midpoint method.** "The advantage of the Midpoint Method is that one obtains the same elasticity between two price points whether there is a price increase or decrease." — [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
- **OpenStax worked example on one straight-line demand curve** — [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
  - **Point B ($70, 2,800) → point A ($60, 3,000):** %ΔQ = 200/2,900 = 6.9%; %ΔP = −10/65 = −15.4%; elasticity = **0.45 (inelastic)**.
  - **Point G ($120, 1,800) → point H ($130, 1,600):** %ΔQ = −200/1,700 = −11.76%; %ΔP = 10/125 = 8.0%; elasticity = **1.47 (elastic)**.
- **UW–Madison worked example: the method changes the answer.** Demand is P = −1.5Q + 60 and price rises from $15 to $30, so Q falls from 30 to 20. — [UW–Madison handout](https://home.uchicago.edu/~kanit/kanitk/Teaching_(UW-Madison)/Entries/2013/1/21_ECON_101__Principles_of_Microeconomics(Fall_2012)_files/handout7_with_solutions.pdf)
  - The "standard percentage change formula", using initial values as the base, gives E_d = 1/3.
  - The midpoint method gives E_d = 3/5 = 0.6.
- **Free video.** Marginal Revolution University's "Calculating the Elasticity of Demand" (Alex Tabarrok) teaches the midpoint formula and applies elasticity to the war on drugs. — [MRU lesson](https://learn.mru.org/lessons/calculate-elasticity-demand-formula); description from a search summary of the [older MRU page](https://mru.org/courses/principles-economics-microeconomics/calculate-elasticity-demand-formula)

#### Worked example: price $0.90 → $1.10, quantity 1,100 → 900 (my own arithmetic, using the OpenStax formula above)

| Method (base used) | %ΔP | %ΔQ | E_d | Looks… |
|---|---|---|---|---|
| Simple %, A → B (base $0.90; 1,100) | +0.20/0.90 = **+22.2%** | −200/1,100 = **−18.2%** | 18.2/22.2 = **0.82** | inelastic |
| Simple %, B → A (base $1.10; 900) | −0.20/1.10 = **−18.2%** | +200/900 = **+22.2%** | 22.2/18.2 = **1.22** | elastic |
| **Midpoint** (base $1.00; 1,000) | 0.20/1.00 = **20%** | 200/1,000 = **20%** | **1.00** | **unit-elastic** |

- **Revenue check.** $0.90 × 1,100 = $990 and $1.10 × 900 = $990. Total revenue doesn't change, which is exactly what unit elasticity predicts (see §4). Only the midpoint answer agrees with the revenue test.
- **Same price change, different responses** (midpoint base Q = 1,000):
  - Q 1,050 → 950 is a 10% fall, so E_d = 0.5 (inelastic).
  - Q 1,200 → 800 is a 40% fall, so E_d = 2.0 (elastic).
  - These are the three standard textbook cases. Check them against the toll-bridge figure in your own copy of the chapter.

### Inferences
- **Intuition.** The same $0.20 change is 22% of $0.90 but only 18% of $1.10, so simple percentages depend on the base. The midpoint method always uses the *same* base, the averages ($1.00 and 1,000), whichever direction you move.
  - The midpoint answer always lies between the two simple-% answers.
- **Why we use elasticity at all.** Elasticity is unit-free (a percent divided by a percent). That lets you compare how sensitive buyers are to gasoline prices versus eggs, or dollars versus soums. Slope depends on the units, so it can't do this.
- **Exam traps**
  1. Put quantity on top: %ΔQ ÷ %ΔP. Writing it the other way up is the most common error.
  2. Use the midpoint method unless the question says "use the initial value" or "point elasticity".
  3. Drop the minus sign only for *price* elasticity of demand. The sign is the whole point of cross-price and income elasticity (§5).
  4. "Price rose by 2 percentage points" is not the same as "price rose 2%".
  5. A question that gives two points and asks "is demand elastic?" is designed so that a simple-% answer can mislead. Practice Q3 has one (simple % gives exactly 1.00, the midpoint gives 1.22).
- The textbook presents the midpoint method as standard, and the prompt's $0.90/$1.10 example is the classic illustration. Expect at least one midpoint calculation on the midterm.

### Gaps
- I couldn't verify the textbook's toll-bridge figure (unit-elastic, inelastic and elastic panels) from a legitimate public copy:
  - The publisher's asset host (digfir-published.macmillanusa.com) did not resolve, and archive.org fetching was blocked.
  - The only full-text reproductions found were school-hosted or unauthorized copies, which I didn't use.
  - All toll-bridge numbers above are computed from the figures in the prompt.

---

## 2. Classification and graphs ("Elasticity menagerie"); elasticity vs. slope

### Takeaway
There are five demand cases:

| Case | E_d | Demand curve |
|---|---|---|
| Perfectly inelastic | 0 | vertical |
| Inelastic | between 0 and 1 | |
| Unit-elastic | exactly 1 | |
| Elastic | greater than 1 | |
| Perfectly elastic | ∞ | horizontal |

On a straight-line demand curve the **slope is constant but elasticity is not**. Demand is elastic on the upper (high-price) half, unit-elastic at the midpoint and inelastic on the lower half.

### Cited Findings
- **OpenStax categories** — [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
  - Elastic: elasticity > 1, "high responsiveness".
  - Inelastic: elasticity < 1, "low responsiveness".
  - Unitary: elasticity = 1, "proportional responsiveness".
- **Krugman's summary table.** *Essentials of Economics* 4e, ch. 5, Table 5-3, is titled **"An Elasticity Menagerie."**
  - **Price elasticity of demand:**
    - 0: perfectly inelastic (vertical demand curve).
    - Between 0 and 1: inelastic (a price rise increases total revenue).
    - Exactly 1: unit-elastic (price changes have no effect on total revenue).
    - Greater than 1 and less than ∞: elastic (a price rise reduces total revenue).
    - ∞: perfectly elastic (any price rise makes quantity demanded fall to 0; horizontal demand curve).
  - **Cross-price elasticity:** negative means complements; positive means substitutes.
  - **Income elasticity:** negative means an inferior good.
  - Source: [publisher asset page, Macmillan Krugman/Wells *Essentials* 4e, ch. 5, Table 5-3](http://digfir-published.macmillanusa.com/krugmanwellsessentials4e/asset/ch5/tables/table_5_3.html). The page is offline now, so the row content comes from the search-engine index.
- **The extreme (polar) cases** — [OpenStax §5.2](https://openstax.org/books/principles-economics-3e/pages/5-2-polar-cases-of-elasticity-and-constant-elasticity)
  - Infinite or perfect elasticity is "the extreme case where either the quantity demanded (Qd) or supplied (Qs) changes by an infinite amount in response to any change in price at all". The curve is horizontal.
  - Zero elasticity or perfect inelasticity is the case where "a percentage change in price, no matter how large, results in zero change in quantity". The curve is vertical.
  - OpenStax's illustrative demand examples:
    - Near perfectly inelastic: life-saving drugs and gasoline ("necessities with no close substitutes").
    - Near perfectly elastic: Caribbean cruises and sports vehicles (luxuries, large budget share, many substitutes).
- **Constant unit elasticity.** A price change of 1% always gives a quantity change of 1%. — [OpenStax §5.2](https://openstax.org/books/principles-economics-3e/pages/5-2-polar-cases-of-elasticity-and-constant-elasticity)
  - Such a **demand** curve is *curved*.
  - Such a **supply** curve is *a straight line through the origin*.
- **Elasticity changes along a straight line.**
  - "Price elasticity of demand changes at different points along a straight-line demand curve", while the slope stays constant. — [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
  - "The price elasticity is not constant even along a linear demand curve, but rather varies along the curve." — [Wikipedia](https://en.wikipedia.org/wiki/Price_elasticity_of_demand)
  - On OpenStax's own straight line, the arc elasticities rise with price — [OpenStax Ch. 5 answer key](https://openstax.org/books/principles-economics-3e/pages/chapter-5):

    | Arc | Elasticity | Category |
    |---|---|---|
    | B→C | 0.56 | inelastic |
    | D→E | 0.83 | inelastic |
    | G→H | 1.47 | elastic |

- **Point-elasticity shortcut for a linear demand curve.** E_d = (1/|slope|) × (P/Q), where slope = ΔP/ΔQ. The unit-elastic point is the midpoint of a linear demand curve that meets both axes. — [UW–Madison handout](https://home.uchicago.edu/~kanit/kanitk/Teaching_(UW-Madison)/Entries/2013/1/21_ECON_101__Principles_of_Microeconomics(Fall_2012)_files/handout7_with_solutions.pdf)

#### Worked example: slope constant, elasticity changing (my arithmetic)
The OpenStax points A ($60, 3,000), B ($70, 2,800), G ($120, 1,800) and H ($130, 1,600) all lie on **Q = 4,200 − 20P**. The slope is constant: −20 units per $1. Point elasticity is E_d = 20P/Q.

| Price | Point elasticity | Category |
|---|---|---|
| $60 | 0.40 | inelastic |
| $70 | 0.50 | inelastic |
| **$105** (midpoint: P-intercept $210, Q-intercept 4,200) | **1.00** | **unit-elastic** |
| $120 | 1.33 | elastic |
| $130 | 1.63 | elastic |

Total revenue peaks at the unit-elastic point: $105 × 2,100 = $220,500.

### Inferences
- **Graph-reading rules**
  - A vertical demand curve means E_d = 0, and a horizontal one means E_d = ∞. Don't mix them up: "flat = elastic".
  - Saying "flatter = more elastic" is only valid when you compare two curves **at the same point** (same P and Q).
  - On one straight line, the top half is elastic, the midpoint is unit-elastic and the bottom half is inelastic.
- **The calculus behind it** (my derivation). For Q = a − bP, E_d = bP/(a − bP). This rises from 0 at P = 0 to ∞ at the price intercept a/b, and equals 1 at P = a/(2b).
- **A demand curve that is unit-elastic everywhere is a rectangular hyperbola** (P × Q = constant), because total revenue never changes along it. This matches OpenStax's "curved" constant-unit-elasticity demand curve.
- **Supply-line trick** (my derivation from the OpenStax result that a straight supply line through the origin has E_s = 1).
  - For Q = kP, (dQ/dP)(P/Q) = 1.
  - A straight supply line that starts on the **price axis** (positive P-intercept) is elastic (> 1).
  - One that starts on the **quantity axis** is inelastic (< 1).
- **Exam trap: the polar cases are idealizations.** OpenStax uses gasoline to illustrate perfectly inelastic demand, but measured short-run gasoline elasticity is about 0.09, not 0 (§3).

### Gaps
- The search-index view of Krugman's menagerie table cut off after the "inferior good" row. The remaining rows weren't visible:
  - income elasticity 0–1 (income-inelastic) and > 1 (income-elastic);
  - the price-elasticity-of-supply rows.
- They are almost certainly in the table; confirm them in your copy.

---

## 3. Determinants of price elasticity of demand, with credible empirical estimates

### Takeaway
Demand is **more elastic** when:
- close substitutes exist (and when the market is defined narrowly, e.g. one brand rather than all soft drinks);
- the good is a luxury rather than a necessity;
- it takes a large share of the budget;
- buyers have more time to adjust.

The evidence matches. Gasoline demand is about 0.09 in the short run and 0.31 in the long run, eggs about 0.27, a single soft-drink brand about 4, but soft drinks as a category below 1.

### Cited Findings
#### The determinants
- MRU's "Elasticity of Demand" video lists the determinants as:
  - availability of substitutes;
  - time horizon;
  - how broadly the good is classified;
  - necessity vs. luxury;
  - size of the purchase relative to the budget.
  - Sources: [EconEdLink MRU series](https://econedlink.org/resources/elasticity-of-demand-and-supply-video-series-and-quiz/) (search summary); [MRU lesson](https://learn.mru.org/lessons/elasticity-demand-definition)
- "Elasticities are often lower in the short run than in the long run." — [OpenStax §5.3](https://openstax.org/books/principles-economics-3e/pages/5-3-elasticity-and-pricing)
  - Short run: you can carpool or turn the thermostat down.
  - Long run: you can buy a more fuel-efficient car or more energy-efficient appliances.

#### OpenStax Table 5.2, "selected elasticities" (absolute values) — [OpenStax §5.3](https://openstax.org/books/principles-economics-3e/pages/5-3-elasticity-and-pricing)

| Good | E_d | Good | E_d |
|---|---|---|---|
| Housing | 0.12 | Transatlantic air travel (business) | 0.62 |
| Transatlantic air travel (economy) | 0.12 | Kitchen and household appliances | 0.63 |
| Rail transit (rush hour) | 0.15 | Chicken | 0.64 |
| Electricity | 0.20 | Cable TV (basic rural) | 0.69 |
| Taxi cabs | 0.22 | Soft drinks | 0.70 |
| Gasoline | 0.35 | Beer | 0.80 |
| Transatlantic air travel (first class) | 0.40 | New vehicle | 0.87 |
| Wine | 0.55 | Rail transit (off-peak) | 1.00 |
| Beef | 0.59 | Computer | 1.44 |
| | | Cable TV (basic urban) | 1.51 |
| | | Cable TV (premium) | 1.77 |
| | | **Restaurant meals** | **2.27** |

OpenStax's translation of two rows:
- A 10% rise in the price of restaurant meals cuts quantity by 22.7%.
- A 10% rise in housing prices cuts quantity by only 1.2%.

#### Food: meta-analysis of 160 US studies — [Andreyeva, Long & Brownell (2010), *American Journal of Public Health*](https://pmc.ncbi.nlm.nih.gov/articles/PMC2804646/)
- Mean absolute price elasticities:

  | Food | E_d | Food | E_d |
  |---|---|---|---|
  | **Food away from home (restaurant meals)** | **0.81** (95% CI 0.56–1.07) | Milk | 0.59 |
  | Soft drinks | 0.79 | Vegetables | 0.58 |
  | Juice | 0.76 | Fish | 0.50 |
  | Beef | 0.75 | Fats/oils | 0.48 |
  | Pork | 0.72 | Cheese | 0.44 |
  | Fruit | 0.70 | Sweets/sugars | 0.34 |
  | Poultry | 0.68 | **Eggs** | **0.27** (95% CI 0.08–0.45) |
  | Dairy | 0.65 | | |
  | Cereals | 0.60 | | |

- A 10% rise in soft-drink prices should cut consumption by 8–10%.

#### Gasoline: time horizon (the cleanest example)
- **Havranek, Irsova & Janda (2012), *Energy Economics* 34(1):201–207.**
  - After correcting for publication bias, the elasticity is **−0.09 in the short run** (95% CI −0.12 to −0.07) and **−0.31 in the long run** (95% CI −0.38 to −0.25).
  - The uncorrected averages are −0.23 (short run) and −0.69 (long run).
  - Sources: [RePEc](https://ideas.repec.org/a/eee/eneeco/v34y2012i1p201-207.html); [paper PDF](https://meta-analysis.cz/gasoline_price/gas_price.pdf)
- **Earlier meta-analyses**, as reported by Havranek et al. — [PDF](https://meta-analysis.cz/gasoline_price/gas_price.pdf)
  - Espey (1998): mean −0.26 (short run) and −0.58 (long run).
  - Brons et al. (2008): mean −0.34 and −0.84.
- **Hughes, Knittel & Sperling (2008).** US short-run elasticity was **−0.034 to −0.077 in 2001–2006**, against **−0.21 to −0.34 in 1975–1980**. Short-run gasoline demand has become even *more* inelastic. — [NBER w12530](https://www.nber.org/papers/w12530)

#### Air travel: substitutes and how the market is defined
- **IATA/InterVISTAS.** Price elasticity depends on how wide the market is:

  | Market level | Price elasticity |
  |---|---|
  | Single route | −1.4 |
  | National | −0.8 |
  | Several countries | −0.6 |

  - Short-haul elasticities are about 1.1× these.
  - Intra-Europe (short-haul): −2.0 at route level, −1.2 national.
  - Sources: [IATA report page](https://www.iata.org/en/iata-repository/publications/economic-reports/estimating-air-travel-demand-elasticities---by-intervistas/); [IATA briefing PDF](https://www.travelready.org/PDF%20Files/Travel%20-%20IATA%20-%20Air%20Travel%20Demand.pdf)
- **Gillen, Morrison & Stewart**, as summarized in the IATA briefing. — [IATA briefing PDF](https://www.travelready.org/PDF%20Files/Travel%20-%20IATA%20-%20Air%20Travel%20Demand.pdf)
  - The overall range is −0.1 to −1.7.
  - Long-haul international **business −0.3** vs. long-haul international **leisure −1.0**.
- **Oum, Zhang & Zhang (1993)**, cited in the same briefing. One airline's demand is **−1.24 to −2.34**, against −0.6 to −1.6 for a whole route or market. Rival airlines are close substitutes.

#### Brand vs. category (narrow vs. broad market)
- **Single brands.** Coca-Cola −3.8 and Mountain Dew −4.4. — [Wikipedia: PED, selected estimates](https://en.wikipedia.org/wiki/Price_elasticity_of_demand)
  - A brand-level study estimated −3.795 for Coca-Cola Regular and −3.938 for Pepsi Regular. — [ResearchGate: Coca-Cola/PepsiCo strategic pricing study](https://www.researchgate.net/publication/4765383_An_Econometric_Analysis_of_Brand-Level_Strategic_Pricing_Between_Coca-Cola_Company_and_PepsiCo) (search summary)
- **Soft drinks as a category.** 0.79 in [Andreyeva et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC2804646/) and 0.70 in [OpenStax](https://openstax.org/books/principles-economics-3e/pages/5-3-elasticity-and-pricing).
- **Conflict.** A WSU lecture shows Coke 1.74 and Pepsi 1.55 (no study named on the slide). Brand-level estimates differ a lot across studies. — [WSU EconS 305, Lecture 7](https://s3.wp.wsu.edu/uploads/sites/1736/2017/09/305Lecture-7.pdf)

#### Addictive goods
- **Cigarettes**
  - OpenStax: demand among regular smokers is about 0.3, so a 10% price rise gives about a 3% fall. — [OpenStax §5.3](https://openstax.org/books/principles-economics-3e/pages/5-3-elasticity-and-pricing)
  - Wikipedia's list: US −0.3 to −0.6 in general, and −0.6 to −0.7 for youth. — [Wikipedia](https://en.wikipedia.org/wiki/Price_elasticity_of_demand)
  - NCI/WHO Monograph 21: high-income countries mostly −0.2 to −0.6, clustering around −0.4. Low- and middle-income countries −0.2 to −0.8, around −0.5. Young people respond more. — [Monograph 21](https://cancercontrol.cancer.gov/sites/default/files/2020-06/m21_complete.pdf) (search summary)
- **Alcohol**
  - **Wagenaar, Salois & Komro (2009, 112 studies):** beer −0.46, wine −0.69, spirits −0.80.
  - **Gallet (2007):** median short run −0.52 vs. long run −0.82.
  - Both are reported in the [Xu & Chaloupka review (PMC3860576)](https://pmc.ncbi.nlm.nih.gov/articles/PMC3860576/).

#### Small budget share, and durables over time
- **College course table**, citing the Mackinac Center. — [Fort Lewis College course page](http://faculty.fortlewis.edu/walker_d/demand_elasticity.htm)
  - Small budget share: salt, matches and toothpicks about 0.1.
  - Short run vs. long run:

    | Good | Short run | Long run |
    |---|---|---|
    | Gasoline | 0.2 | 0.7 |
    | Residential natural gas | 0.1 | 0.5 |
    | Airline travel | 0.1 | 2.4 |
    | **Automobiles** | **1.2–1.5** | **0.2** |

  - Other entries: foreign travel (long run) 4.0; restaurant meals 2.3; Chevrolet automobiles 4.0; fresh tomatoes 4.6; coffee 0.25; physician services 0.6; movies 0.9.
- **Coffee** — [OpenStax §5.3 "Clear It Up"](https://openstax.org/books/principles-economics-3e/pages/5-3-elasticity-and-pricing)
  - Demand elasticity is "only about 0.3".
  - World coffee prices were 50¢/lb in 1993, "four times as high, at $2 per pound" in 1995, and $1.00 in 1997.

### Inferences
- **How each determinant shows up in the numbers**

  | Determinant | Evidence |
  |---|---|
  | Substitutes and market definition | One brand (about 4) or one airline route (−1.4) is much more elastic than the whole category (soft drinks 0.7–0.8) or the whole market (−0.6). |
  | Necessity vs. luxury | Eggs (0.27), housing (0.12) and electricity (0.20) vs. restaurant meals (2.27 in OpenStax) and foreign travel (about 4). |
  | Budget share | Salt and matches (0.1) vs. cars and foreign travel. |
  | Time | Gasoline 0.09 → 0.31; alcohol 0.52 → 0.82. |

- **Durable-goods exception (a good trap).** The Fort Lewis table shows cars as *more* elastic in the short run (1.2–1.5) than in the long run (0.2). After a price rise, buyers can postpone replacing a car for a while, but eventually they must replace it. The rule "more time = more elastic" holds cleanly for non-durables like gasoline.
- **Estimates vary widely by study.** Restaurant meals come out at 2.27 (OpenStax) or 2.3 (Fort Lewis table) but only 0.81 in the Andreyeva meta-analysis. Airline business vs. leisure ordering also differs between OpenStax and Gillen et al. For the exam, know the *ranking and the reason*. Memorize exact decimals only if the professor's slides use them.
- **Real-world "why" (my reasoning).**
  - Addictive goods (cigarettes, alcohol) are inelastic, so they make reliable tax bases (§7).
  - Young smokers are more price-sensitive, because they have less income and are less addicted. So tobacco taxes work best at preventing new smokers.

### Gaps
- **Krugman's own estimates table.** A search summary reported eggs 0.10, restaurant meals 2.30 and foreign travel 4.10. I couldn't open a page showing the full table or its original data source, so I am not reproducing it. Use the textbook's table if your professor cites those numbers.
- **Espey's (1998) medians and ranges** weren't on any page I could fetch; only her means (−0.26 and −0.58) were confirmed.
- **Cigarette numbers** from Monograph 21 and IARC Handbook 14 come from search summaries, not the fetched PDFs.

---

## 4. Total revenue test: rectangles, calculus, and real examples

### Takeaway
Total revenue (TR) = P × Q.

| Demand | Price rise | Price cut |
|---|---|---|
| Inelastic | TR rises | TR falls |
| Elastic | TR falls | TR rises |
| Unit-elastic | TR unchanged | TR unchanged |

A price rise *adds* a "price-effect" rectangle and *removes* a "quantity-effect" rectangle; elasticity tells you which is bigger. In calculus, dR/dP = Q(1 − E_d).

### Cited Findings
- **OpenStax revenue rule** — [OpenStax §5.3](https://openstax.org/books/principles-economics-3e/pages/5-3-elasticity-and-pricing)
  - **Elastic:** "A given % rise in P will be more than offset by a larger % fall in Q so that total revenue (P × Q) falls."
  - **Unitary:** "…exactly offset by an equal % fall in Q so that total revenue (P × Q) is unchanged."
  - **Inelastic:** "…a smaller % fall in Q so that total revenue (P × Q) rises."
- **Approximation, revenue maximum and marginal revenue** — [Wikipedia](https://en.wikipedia.org/wiki/Price_elasticity_of_demand)
  - "The percentage change in total revenue is approximately equal to the percentage change in quantity demanded plus the percentage change in price."
  - Revenue is maximized at unit elasticity.
  - Marginal revenue is R′ = P(1 + 1/E), where E is the signed (negative) elasticity. MR is positive where demand is elastic, zero at unit elasticity and negative where it is inelastic.
- **UW–Madison bicycle example** (P = 60 − 1.5Q). At the unit-elastic midpoint, P = $30 and Q = 20, so maximum TR = **$600**. — [UW–Madison handout](https://home.uchicago.edu/~kanit/kanitk/Teaching_(UW-Madison)/Entries/2013/1/21_ECON_101__Principles_of_Microeconomics(Fall_2012)_files/handout7_with_solutions.pdf)
  - At P = $15, E_d = 1/3 (inelastic), so a price rise increases TR.
  - At Q = 10 (P = $45), E_d = 3 (elastic), so a price rise decreases TR.
  - *Note:* the handout has a typo here. The line reads "(1/1.5) × (45/10) = 1/3", but the correct value, which the handout then uses, is 3.
- **Khan Academy** teaches the same rule: maximum total revenue is reached where the elasticity of demand equals 1. — [Khan Academy: More on total revenue and elasticity (video)](https://en.khanacademy.org/economics-finance-domain/microeconomics/elasticity-tutorial/price-elasticity-tutorial/v/more-on-total-revenue-and-elasticity) (search summary)
- **Business example: Netflix 2011.** The price rose **60%** and Netflix lost **810,000** of **24.6 million** subscribers. OpenStax computes the elasticity at about **−0.05**, very inelastic. The company itself had predicted losing about 600,000. — [OpenStax §5.4](https://openstax.org/books/principles-economics-3e/pages/5-4-elasticity-in-areas-other-than-price)
- **Commodity example: coffee.** Demand elasticity is about 0.3, and world prices swung from 50¢/lb (1993) to $2 (1995) to $1 (1997). — [OpenStax §5.3](https://openstax.org/books/principles-economics-3e/pages/5-3-elasticity-and-pricing)
- **Policy example: the war on drugs.** MRU's "Calculating the Elasticity of Demand" applies elasticity to drug prohibition. — [MRU](https://mru.org/courses/principles-economics-microeconomics/calculate-elasticity-demand-formula) (search summary)
- **Brand example: a temporary sale.** With Coke's E_d = 1.74, a 10% price cut should raise Coke's quantity by about 17.4%. That is elastic, so revenue rises. The WSU lecture also suggests firms use such numbers to allocate supermarket shelf space. — [WSU EconS 305, Lecture 7](https://s3.wp.wsu.edu/uploads/sites/1736/2017/09/305Lecture-7.pdf)
- **Tax example: Philadelphia soda tax** (Seiler, Tuchman & Yao 2021). — [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3302335); [UCLA Anderson Review](https://anderson-review.ucla.edu/soda-tax/)
  - Prices rose **34%**.
  - Sales *inside the city* fell **46%**.
  - Cross-border shopping offset part of that, so total sales fell **22%**.

#### Worked example: the rectangles (my arithmetic). Price $0.90 → $1.10.
For a price rise:
- **Price effect** = ΔP × new Q. It is a gain, because every unit still sold now earns more.
- **Quantity effect** = ΔQ × old P. It is a loss, from the units no longer sold.

| Case | Price effect (+$0.20 × new Q) | Quantity effect (old $0.90 × lost units) | Net ΔTR | TR before → after |
|---|---|---|---|---|
| Unit-elastic (1,100 → 900) | +$180 | −$180 | **$0** | $990 → $990 |
| Inelastic, E_d = 0.5 (1,050 → 950) | +$190 | −$90 | **+$100** | $945 → $1,045 |
| Elastic, E_d = 2 (1,200 → 800) | +$160 | −$360 | **−$200** | $1,080 → $880 |

#### Worked example: the calculus view, R = P·Q(P) (my derivation; it matches the Wikipedia MR formula)
- **General result**
  - dR/dP = Q + P·(dQ/dP) = Q·[1 + (dQ/dP)(P/Q)] = **Q·(1 − E_d)**.
  - If E_d < 1, dR/dP > 0, so raising the price raises revenue.
  - If E_d > 1, dR/dP < 0, so cutting the price raises revenue.
  - If E_d = 1, dR/dP = 0, so revenue is at its maximum.
- **UW bicycles, Q = 40 − (2/3)P**
  - R = 40P − (2/3)P².
  - dR/dP = 40 − (4/3)P = 0, so P* = **$30**, Q* = 20 and R* = **$600**. This matches the handout's answer.
- **Netflix arithmetic**
  - New revenue factor ≈ 1.60 × (1 − 0.033) ≈ 1.55, so revenue rose by about 55%.
  - The midpoint method gives E_d ≈ 0.07 instead of 0.05. Either way it is far below 1.

### Inferences
- **Intuition.** When demand is inelastic, buyers keep buying, so the "price effect" gain dominates. When demand is elastic, buyers walk away, so the "quantity effect" loss dominates. The *direction* of the price change matters: with inelastic demand, a price **cut** lowers revenue.
- **Applications to explain on an exam** (these are implications of the TR test, not cited studies):
  - A good harvest can *lower* farm revenue, because food demand is inelastic.
  - Raising transit fares or cigarette taxes raises revenue, because demand is inelastic.
  - Drug enforcement that raises street prices can *increase* total spending on drugs, because demand is inelastic.
- **Calculus-level trap.** Revenue maximization (E_d = 1) is not profit maximization. A profit-maximizing monopolist sets MR = MC > 0. Since MR = P(1 − 1/E_d), MR > 0 requires E_d > 1, so a monopolist always prices on the **elastic** part of demand. (This follows from the Wikipedia MR formula and may come up if the professor likes calculus.)
- **Exam trap: elasticity is measured *along* one demand curve.** If demand *shifts*, the TR test doesn't apply directly.

### Gaps
- Krugman's labels "price effect" and "quantity effect" for the two rectangles are the textbook's standard terms as far as I know, but I couldn't verify the wording from a legitimate copy. Check the class slides.
- No credible source found that quantifies the "bumper harvest lowers farm revenue" example; it is presented as a textbook-logic implication only.

---

## 5. Cross-price elasticity and income elasticity

### Takeaway
**Keep the sign.**
- **Cross-price elasticity:** positive means substitutes (Coke/Pepsi about +0.5 to +0.6); negative means complements (doughnuts and coffee).
- **Income elasticity:**

  | Value | Type of good | Example |
  |---|---|---|
  | Negative | Inferior | |
  | Between 0 and 1 | Normal, income-inelastic ("necessity") | Food: 0.5–0.8 |
  | Greater than 1 | Normal, income-elastic ("luxury") | Air travel: 1.3–2.0 |

### Cited Findings
- **Definitions and examples** — [OpenStax §5.4](https://openstax.org/books/principles-economics-3e/pages/5-4-elasticity-in-areas-other-than-price)
  - **Income elasticity** is "the percentage change in quantity demanded divided by the percentage change in income". A positive value means a normal good and a negative value means an inferior good.
  - **Cross-price elasticity** is "the percentage change in the quantity of good A that is demanded as a result of a percentage change in the price of good B".
  - **Substitutes** (positive): coffee and tea; plane and train tickets.
  - **Complements** (negative): bread and peanut butter; coffee and sugar.
- **WSU slides** — [WSU EconS 305, Lecture 7](https://s3.wp.wsu.edu/uploads/sites/1736/2017/09/305Lecture-7.pdf)
  - Cross-price elasticity: ε_t = (Δq/Δp_t)(p_t/q). If ε_t > 0, the other good is a substitute (Coke and Pepsi; coffee and tea). If ε_t < 0, it is a complement (peanut butter and jelly; hot dogs and buns).
  - The slides also give a gasoline-and-motels example of complements.
  - Estimated Coke/Pepsi elasticities (the slide does not name the study):

    | | Coke | Pepsi |
    |---|---|---|
    | Own price | 1.74 | 1.55 |
    | Income | 0.58 | 1.38 |
    | Cross-price | 0.52 | 0.64 |

    - The 0.52 means a 1% rise in Pepsi's price raises Coke sales by 0.52%.
    - The 0.64 means a 1% rise in Coke's price raises Pepsi sales by 0.64%.
    - A 10% Coke sale would cut Pepsi's quantity by about 6.4%.
- **UW–Madison exercises** — [UW–Madison handout](https://home.uchicago.edu/~kanit/kanitk/Teaching_(UW-Madison)/Entries/2013/1/21_ECON_101__Principles_of_Microeconomics(Fall_2012)_files/handout7_with_solutions.pdf)
  - The cross-price elasticity of doughnuts with respect to coffee is −1.5. So a 10% rise in coffee prices cuts the quantity of doughnuts demanded by **15%**, and the two are **complements**.
  - Doughnuts have an income elasticity of 1.2, so they are a normal good. In a recession, demand for doughnuts shifts left.
- **OpenStax self-check questions** — [questions](https://openstax.org/books/principles-economics-3e/pages/5-self-check-questions); [answer key](https://openstax.org/books/principles-economics-3e/pages/chapter-5)
  - Q8: income rises from $25,000 to $38,000 while bread purchases fall from 30 to 22 loaves a year. Bread is an **inferior** good.
  - Q9: the price of oranges falls 3% and the apple–orange cross elasticity is 0.4. The question asks for the effect on apples.
- **Food and income (Engel's law)** — [USDA ERS, *Amber Waves* (Muhammad & Meade, 1 Sep 2011)](https://ers.usda.gov/amber-waves/2011/september/low-income-countries/)
  - Income elasticities for food average **0.78** in low-income countries vs. **0.50** in high-income countries.
  - For cereals and for oils/fats, they average above 0.5 in low-income countries and under 0.1 in high-income countries.
  - The article ties this to Engel's law: as income rises, the share of income spent on food falls.
- **Air travel is income-elastic** — [IATA briefing](https://www.travelready.org/PDF%20Files/Travel%20-%20IATA%20-%20Air%20Travel%20Demand.pdf)

  | Economy | Route level | National level |
  |---|---|---|
  | Developed | 1.5 | 1.3 |
  | United States | 1.8 | 1.6 |
  | Developing | 2.0 | 1.8 |

  - Very long-haul routes go up to 2.7.
- **Alcohol** (bias-corrected; from a search summary only). Income elasticity is about 0.50 for beer and 1.00 for wine and spirits. — [Nelson (2013), PubMed](https://pubmed.ncbi.nlm.nih.gov/23883547/)

#### Worked examples (my arithmetic, midpoint method)
- **Inferior good (OpenStax Q8).**
  - %ΔQ = (22 − 30)/26 = −30.8%.
  - %ΔIncome = 13,000/31,500 = +41.3%.
  - e_I = **−0.75**, so bread is inferior.
- **Income-elastic good.**
  - Income rises from $40,000 to $50,000: +22.2%.
  - Restaurant meals rise from 8 to 12 a month: +40%.
  - e_I = **1.8**, a normal, income-elastic ("luxury") good.
- **Cross-price (OpenStax Q9).**
  - 0.4 × (−3%) = **−1.2%** for apples.
  - Cheaper oranges pull buyers away from apples, so they are substitutes.
- **Cross-price from data.**
  - Coffee rises from $2.00 to $2.50: +22.2%.
  - Tea rises from 100 to 120 units: +18.2%.
  - e_XY = **+0.82**, so coffee and tea are substitutes.

### Inferences
- **Signs carry the information.** Unlike own-price elasticity, you must **not** drop the sign. A cross-price elasticity of −1.5 means complements, and +1.5 means close substitutes.
- **Size matters too.**
  - A cross-price elasticity near 0 means the goods are unrelated.
  - Income elasticity between 0 and 1 is still a **normal** good. A common exam error is to call an income-inelastic good "inferior".
- **Engel's law in practice.** Food's income elasticity is below 1 (0.5–0.8). As a developing economy like Uzbekistan grows richer, the *share* of household budgets spent on food should fall, even though food spending rises in soum terms. This is an implication of the USDA findings, not a measured Uzbekistan estimate.
- **Business uses.**
  - Income elasticity helps forecast demand in booms and recessions: airlines and restaurants are hit hard, staples less so.
  - Cross-price elasticity measures how close a rival is, which matters for pricing and for merger analysis.

### Gaps
- **The Coke/Pepsi slide doesn't name its study.** It conflicts with the brand-level estimates (about −3.8 to −3.9) in §3. I found no peer-reviewed cross-price number that I could fetch and confirm directly.
- **No credible numeric estimate of an inferior good's income elasticity** was found. The examples are textbook exercises.
- **USDA ERS figures not confirmed on the fetched page:**
  - country-specific elasticities: Democratic Republic of Congo 0.85, Armenia 0.71;
  - the "63¢ vs. 6¢ of each extra $1 spent on food" comparison.

---

## 6. Price elasticity of supply: definition, determinants, perfectly elastic and inelastic supply

### Takeaway
E_s = %ΔQs ÷ %ΔP, and it is always ≥ 0. Supply is more elastic when **inputs are easy to get** and when **more time** has passed. A fixed resource (radio spectrum, land in a prime location) has perfectly inelastic, vertical supply. A good anyone can produce at constant cost (pizza) has nearly perfectly elastic, horizontal supply.

### Cited Findings
- **Definition.** The price elasticity of supply is "the percentage change in quantity *supplied* divided by the percentage change in price." — [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
- **OpenStax worked example** — [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
  - Apartment rent rises from $650 to $700 a month, and the quantity supplied rises from 10,000 to 13,000.
  - %ΔQ = 3,000/11,500 = 26.1%; %ΔP = 50/675 = 7.4%.
  - E_s = **3.53 (elastic)**. Unrounded it is 3.52; OpenStax rounds the percentages first.
- **More OpenStax practice, with the answer key.** — [OpenStax answer key](https://openstax.org/books/principles-economics-3e/pages/chapter-5)

  | Supply arc | E_s | Category |
  |---|---|---|
  | J→K | 2.83 | elastic |
  | L→M | 1.0 | unitary |
  | N→P | 0.64 | inelastic |

- **Polar cases** — [OpenStax §5.2](https://openstax.org/books/principles-economics-3e/pages/5-2-polar-cases-of-elasticity-and-constant-elasticity)
  - Perfectly elastic supply examples: pizza, bread, books and pencils, goods whose inputs are readily available and whose production is easy to expand.
  - Perfectly inelastic supply examples: diamond rings, and housing in prime New York City locations, where input supply is limited.
  - A unit-elastic supply curve is a straight line through the origin.
- **Krugman's two extreme examples**, as summarized in student notes — [secondary: course notes (GitBook)](http://micro.shawnzhong.com/2.5%20-%20income,%20cross-price%20&%20supply%20elasticities) (search summary)
  - **Cell-phone frequencies** (radio spectrum) are perfectly inelastic: the government owns a fixed quantity, so supply is vertical and E_s = 0.
  - **Pizza** is perfectly elastic: at about $12 many producers could open pizza parlors, and the ingredients (flour, tomatoes, cheese) are plentiful.
- **Time.** "Elasticities are often lower in the short run than in the long run." — [OpenStax §5.3](https://openstax.org/books/principles-economics-3e/pages/5-3-elasticity-and-pricing)
- **Real-world estimate: housing supply** — [Saiz (2010), "The Geographic Determinants of Housing Supply," *QJE* 125(3):1253–1296](https://doi.org/10.1162/qjec.2010.125.3.1253) (read from the paper's text)
  - Population-weighted average metro housing-supply elasticity: **1.75**. The unweighted average is 2.5.
  - **Least elastic:** Miami 0.60, Los Angeles 0.63, Fort Lauderdale 0.65, San Francisco 0.66, San Diego 0.67, Oakland 0.70, New York 0.76, Boston 0.86.
  - **Most elastic:** Atlanta 2.55, Houston 2.30, Austin 3.00, Indianapolis 4.00, Fort Wayne 5.36, Wichita 5.45.
  - Supply elasticities are "well characterized as functions of both physical and regulatory constraints". Steep terrain and water limit developable land.
- **Free videos** on supply elasticity — MRU lessons:
  - ["Elasticity of Supply" (midpoint formula)](https://learn.mru.org/lessons/elasticity-supply-midpoint-formula)
  - ["Elasticity of Supply: Why Housing is Unaffordable"](https://learn.mru.org/lessons/elasticity-supply-why-housing-unaffordable)
  - ["Elasticity of Supply: Do Gun Buybacks Work?"](https://learn.mru.org/lessons/elasticity-supply-do-gun-buybacks-work)
- **Formula.** ε_S = (Δq_S/Δp)(p/q_S), where Δq_S/Δp is the slope of the supply function. It is interpreted the same way as demand elasticity. — [WSU EconS 305, Lecture 7](https://s3.wp.wsu.edu/uploads/sites/1736/2017/09/305Lecture-7.pdf)

#### Worked example (my arithmetic). Wheat price rises from $5 to $6 (midpoint +18.2%).
- **Short run:** Qs rises from 1,000 to 1,100 (+9.5%), so E_s = **0.52 (inelastic)**. Fields are already planted.
- **Long run:** Qs rises from 1,000 to 1,500 (+40%), so E_s = **2.2 (elastic)**. Farmers have time to switch land and add machinery.

### Inferences
- **Determinants in Krugman's framing**
  - **Availability of inputs:** if inputs can be bought or redirected easily at the going price, supply is elastic (pizza). If an input is fixed, supply is inelastic (spectrum, land in Manhattan or Miami).
  - **Time:** supply becomes more elastic as producers adjust capacity.
- **Saiz's housing results show the "inputs" determinant at work.** Geography and zoning make land scarce in coastal cities, so supply is inelastic there. When demand rises, prices rise more and new construction rises less. This is the theme of MRU's "Why Housing is Unaffordable".
- **Link to §7.** Perfectly inelastic supply means sellers bear a tax completely. This is the classic argument for land taxes.
- **Exam traps**
  1. Supply elasticity has no minus sign to drop; it is positive.
  2. "Perfectly elastic supply" is a horizontal line at the cost-covering price.
  3. Don't confuse a vertical supply curve (fixed quantity) with a vertical *demand* curve (buyers ignore price).

### Gaps
- The Krugman "cell-phone frequencies / pizza at $12" examples were confirmed only through a secondary student summary, not from the textbook or publisher. Verify the wording against your copy.

---

## 7. Elasticity and tax incidence: the burden falls on the less elastic side

### Takeaway
Whoever is *less able to change their quantity* (the less elastic side) pays most of a tax. It doesn't matter who legally hands the money to the government.

Consumers' share ≈ E_s/(E_s + E_d); producers' share ≈ E_d/(E_s + E_d).

The evidence supports this, with some nuances:
- **Cigarettes:** about 85% of a tax shows up in consumer prices on average, but only about 51% near lower-tax borders, where demand is more elastic.
- **Gasoline:** taxes are roughly fully passed through, except when supply is constrained.
- **Payroll taxes:** workers bear them, because labor supply is inelastic.
- **Over-shifting:** some studies of alcohol and cigarettes find prices rising by *more* than the tax, which happens in imperfectly competitive markets.

### Cited Findings
- **The rule.** "If demand is more inelastic than supply, consumers bear most of the tax burden, and if supply is more inelastic than demand, sellers bear most of the tax burden." — [OpenStax §5.3](https://openstax.org/books/principles-economics-3e/pages/5-3-elasticity-and-pricing)
  - Cigarette demand is about 0.3, so "governments mainly pass along these taxes to consumers in the form of higher prices".
- **Formulas and the legal-payer point** — [Wikipedia: Tax incidence](https://en.wikipedia.org/wiki/Tax_incidence)
  - Share passed to buyers = PES/(PES − PED); share borne by sellers = −PED/(PES − PED), where PED is negative.
  - "The steeper the demand curve and the flatter the supply curve, the more the consumers will bear the tax."
  - "It does not matter whether the tax is levied on consumers or producers": statutory incidence is not economic incidence.
  - Social Security payroll tax: "Workers bear most of the burden of the tax, because the employer passes it on in the form of lower wages."
- **Payroll tax evidence from Chile** (Gruber 1997, *Journal of Labor Economics*). The average payroll tax rate in the sample fell from about 30% to 5% over six years. The cut was **fully shifted to workers' wages, with no effect on employment**. — [NBER/IDEAS record](https://ideas.repec.org/p/nbr/nberwo/5053.html) (abstract via search summary)
- **Who gains from cost changes.** When supply shifts right because of cost savings: if demand is inelastic, the result is "substantially lower prices"; if demand is elastic, "only slightly lower prices". — [OpenStax §5.3](https://openstax.org/books/principles-economics-3e/pages/5-3-elasticity-and-pricing)
- **Cigarettes: Harding, Leibtag & Lovenheim** (*AEJ: Economic Policy* 2012; working-paper figures) — [AEA abstract](https://www.aeaweb.org/articles?id=10.1257%2Fpol.4.4.169); [working paper](https://www.bus.umich.edu/conferencefiles/mtaxi/lovenheim_rev.pdf)
  - A 1¢ tax increase raises prices by **0.85¢** on average, so consumers bear most of the tax.
  - Right at the border with a lower-tax state, the pass-through is only **0.51¢**. It rises with distance from that border, because cross-border buying makes demand more elastic near it.
  - Earlier studies they cite:
    - Hanson & Sullivan (2009), Wisconsin's $1 tax: 1.13–1.18¢ per 1¢ (over-shifting).
    - DeCicca et al.: about 1.
    - Chiou & Muehlegger: 0.92.
- **Gasoline**
  - **Indiana and Illinois sales-tax suspension, 2000** (Doyle & Samphantharak 2008). **70%** of the suspension reached consumers as lower prices, and **80–100%** of the reinstatement as higher prices. — [RePEc](https://ideas.repec.org/a/eee/pubeco/v92y2008i3-4p869-884.html)
  - **US state fuel taxes** (Marion & Muehlegger 2011). They are fully passed through to consumers on average, but less so when supply is constrained (supply less elastic). — [EconPapers](https://econpapers.repec.org/RePEc:eee:pubeco:v:95:y:2011:i:9:p:1202-1212)
- **Alcohol: Alaska, 1 Oct 2002** (Kenkel 2005). — [ResearchGate record](https://www.researchgate.net/publication/4719884_Are_Alcohol_Tax_Hikes_Fully_Passed_Through_to_Prices_Evidence_from_Alaska) (figures via a citing source); [Xu & Chaloupka review](https://pmc.ncbi.nlm.nih.gov/articles/PMC3860576/)
  - Excise taxes per gallon rose: beer $0.35 → $1.07, wine $0.85 → $2.50, spirits $5.60 → about $12.80.
  - Prices rose by more than the tax: **0.9–2.1×** the tax for six beer brands and **1.7–2.1×** for six liquor brands.
  - The Xu & Chaloupka review puts the ratio at **1.2–4.2**, depending on the beverage and where it was sold.
- **Soda: Philadelphia tax.** Shops passed on **97%** of it. Cross-border shopping cut the fall in city sales from 46% to a net 22%. — [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3302335)
- **Free lessons**
  - MRU's "Who Pays the Tax?" uses the Affordable Care Act health-insurance mandate. — [MRU lesson](https://learn.mru.org/lessons/tax-burden-elasticity-affordable-care-act-health-insurance-mandate)
  - Khan Academy article "Elasticity and tax revenue". — [Khan Academy](https://www.khanacademy.org/economics-finance-domain/microeconomics/elasticity-tutorial/price-elasticity-tutorial/a/elasticity-and-tax-incidence)

#### Worked example (my arithmetic): Qd = 100 − 2P, Qs = 3P − 50, $5 per-unit tax on sellers
- **Before the tax:** P = $30, Q = 40.
- **After the tax:** buyers pay **$33**, sellers keep **$28**, and Q = **34**.
- **Burden:** consumers pay **$3 (60%)** and producers **$2 (40%)**. The result is identical if the tax is levied on buyers instead.
- **Revenue and deadweight loss:** tax revenue = $5 × 34 = **$170**; deadweight loss = ½ × $5 × 6 = **$15**.
- **Formula check:** at the original equilibrium, E_d = 2 × 30/40 = 1.5 and E_s = 3 × 30/40 = 2.25. Consumers' share = 2.25/(2.25 + 1.5) = **0.60**. ✓
- **Quick shares to memorize:**
  - E_d = 0.5, E_s = 1.5: consumers bear 75%.
  - E_d = 0.4, E_s = 2 (cigarette-like): consumers bear about 83%.

### Inferences
- **Intuition.** A tax is a wedge between the price buyers pay and the price sellers keep. The side that can't "run away" by buying or selling less gets stuck with more of the wedge.
  - Smokers are addicted, so their demand is inelastic and they pay.
  - Workers can't easily stop working, so their labor supply is inelastic and they bear payroll taxes.
  - Near a state border, smokers *can* run away by buying in the other state, so pass-through falls.
- **Over-shifting doesn't contradict the theory.** Pass-through above 100% (alcohol in Alaska; Wisconsin cigarettes) happens with market power (oligopoly or monopoly pricing). The Krugman competitive model predicts pass-through between 0% and 100%, and that model is the one to use on the exam.
- **Tax design.**
  - Taxing goods with inelastic demand or supply raises more revenue with a smaller deadweight loss, because quantity barely changes.
  - That is why gasoline, tobacco and alcohol are popular excise bases.
  - The flip side: these taxes fall mostly on consumers, and often regressively.
- **Exam traps**
  1. "Who writes the check" is irrelevant to the burden.
  2. Elasticities are compared at the pre-tax equilibrium.
  3. Perfectly inelastic demand means buyers pay 100% and there is no deadweight loss; perfectly inelastic supply means sellers pay 100%.

### Gaps
- **Kenkel (2005) own abstract** wasn't reached; the Alaska multipliers come from citing sources.
- **Marion & Muehlegger's** specific coefficients weren't verified.
- **Harding et al. published figures** may differ slightly from the working-paper figures used here.

---

## 8. The Laffer curve: concept, evidence on the revenue-maximizing rate, the debate, and the link to the elasticity of taxable income

### Takeaway
Tax revenue = rate × base. Raising the rate brings in more per unit of the base, but the base shrinks as people work, earn or report less. Revenue is therefore zero at 0% and (near) zero at 100%, and peaks somewhere in between.

The *existence* of a peak is uncontroversial. The debate is about *where it is*:
- Mainstream estimates put revenue-maximizing income-tax rates around **60–85%**, depending on how elastic taxable income is.
- Current US rates are below that.
- Tax cuts therefore pay for only part of their cost:
  - 1–22% in CBO's 2005 dynamic score;
  - about 17% for labor-tax cuts and about 50% for capital-tax cuts in Mankiw–Weinzierl's growth model.

### Cited Findings
#### Concept and history
- **The 1974 dinner.**
  - In 1974 Arthur Laffer noted during a business dinner that "there are always two tax rates that yield the same revenues" (citing Wanniski 1978). — [Trabandt & Uhlig, NBER w15343](https://www.nber.org/papers/w15343)
  - The dinner, with journalist Jude Wanniski, Dick Cheney and Donald Rumsfeld, produced the famous napkin sketch. Wanniski later donated the napkin to the Smithsonian's National Museum of American History. — [NMAH "Great napkins of history"](https://americanhistory.si.edu/explore/stories/great-napkins-history-laffer-and-zandmans-sketches-breakthrough-ideas); [object record](https://americanhistory.si.edu/collections/object/nmah_1439217) (both pages blocked fetching, so this is from a search summary)
- **Laffer's own account.** Laffer wrote that the curve "was not invented by me". He quotes Ibn Khaldun: "at the beginning of the dynasty, taxation yields a large revenue from small assessments. At the end of the dynasty, taxation yields a small revenue from large assessments." He also cites Keynes, and distinguishes the "arithmetic effect" from the "economic effect" of a tax change. — [Heritage report No. 1765 (2004)](https://www.heritage.org/taxes/report/the-laffer-curve-past-present-and-future) (search summary; page blocked)

#### Academic estimates of the revenue-maximizing rate
- **Trabandt & Uhlig (2011, *Journal of Monetary Economics*)** — [NBER PDF](https://www.nber.org/system/files/working_papers/w15343/w15343.pdf); [EconPapers](https://econpapers.repec.org/RePEc:eee:moneco:v:58:y:2011:i:4:p:305-327)
  - Revenue-maximizing ("peak") rates vs. actual rates at the time:

    | | Peak labor tax | Peak capital tax | Actual labor tax | Actual capital tax |
    |---|---|---|---|---|
    | US | 63% | 63% | 28% | 36% |
    | EU-14 | 62% | 48% | 41% | 33% |

  - The US could raise up to **30%** more revenue from labor taxes and **6%** more from capital taxes. The EU-14 could raise only 8% and 1%.
  - Share of a tax cut that pays for itself: US **32%** (labor) and **51%** (capital); EU-14 54% and 79%.
  - The consumption-tax Laffer curve has no peak.
  - "Maximizing tax revenues is quite different from maximizing welfare."
- **Diamond & Saez (2011, *Journal of Economic Perspectives*)** — [PDF](https://eml.berkeley.edu/~saez/diamond-saezJEP11opttax.pdf)
  - The revenue-maximizing top rate is **τ\* = 1/(1 + a·e)**.
    - The Pareto parameter a is "around 1.5".
    - e = 0.25 is "a mid-range estimate from the empirical literature".
    - This gives τ\* = 1/(1 + 1.5 × 0.25) ≈ **73%**, against the then-current combined top US rate of 42.5%.
  - The 42.5% rate "would be optimal only if the elasticity e were extremely high, equal to 0.9".
  - Using Gruber–Saez estimates:
    - e = 0.57 (current tax base) gives about 54%.
    - e = 0.17 (broad base, no deductions) gives about 80%.
  - The avoidance part of e "is not an immutable parameter and can be reduced through base broadening and tax enforcement."
- **Saez, Slemrod & Giertz (2012, *Journal of Economic Literature*)** — [PDF](https://eml.berkeley.edu/~saez/saez-slemrod-giertzJEL12.pdf)
  - "While there are no truly convincing estimates of the long-run elasticity, the best available estimates range from **0.12 to 0.40**."
  - "Even at the top of this range the U.S. marginal top rate is far from the top of the Laffer curve."
  - With a = 1.5 and e = 0.25, τ\* = 72.7%.
  - With a single flat rate, "the tax-revenue-maximizing rate becomes the well-known expression τ\* = 1/(1 + e)".
- **The high-elasticity side of the debate** — [Saez, Slemrod & Giertz](https://eml.berkeley.edu/~saez/saez-slemrod-giertzJEL12.pdf)
  - Early studies of the 1981 and especially 1986 tax cuts, such as Feldstein (1995), found elasticities "large enough to suggest… the United States might be on the wrong side of the Laffer curve". Goolsbee (2000a) found a similarly large one.
  - Later research found "considerably lower estimates".
  - Estimates for the top 1% from changes in income shares: 1.36 (1986–88), 0.60 (1981–84) and 0.45 (1992–93).
  - Top earners mostly change the *timing* of income and use *avoidance*, with "no compelling evidence… of real economic responses".
  - Giertz: ETIs of 0.2, 0.5 and 1.0 wipe out 12%, 31% and 62% of the revenue a rate increase would raise with no behavioral change.

#### Official and policy evidence
- **Dynamic scoring of a tax cut: how much it pays for itself**
  - **CBO (Dec 2005).** For a 10% cut in all individual income-tax rates, growth effects "offset between 1 percent and 22 percent of the revenue loss". — [CBO report](https://www.cbo.gov/sites/default/files/109th-congress-2005-2006/reports/12-01-10percenttaxcut.pdf) (search snippet; PDF blocked)
  - CRFB describes the same study differently: "at best… offset one-quarter of the ten-year cost" and "at worst… increase the cost slightly (by 3 percent)". — [CRFB](https://www.crfb.org/papers/tax-cuts-dont-pay-themselves)
  - **Mankiw & Weinzierl (2006).** "In the long run, about 17 percent of a cut in labor taxes is recouped." For "standard parameter values, half of a capital tax cut is self-financing." — [NBER w11000](https://www.nber.org/papers/w11000)
- **CBO (April 2018) on the 2017 Tax Cuts and Jobs Act** — [FactCheck.org summary of CBO](https://www.factcheck.org/2018/08/cbo-didnt-say-tax-cuts-were-virtually-paid-for)
  - The Act adds nearly **$1.9 trillion** to deficits over 2018–2028.
  - Faster growth offsets **$461 billion (about 20%)** of the cost. Without that offset, the deficit increase would exceed $2.3 trillion.
- **Economists' poll** (Chicago Booth IGM, now Clark Center, 26 June 2012) — [Clark Center](https://kentclarkcenter.org/surveys/laffer-curve/)
  - The statement: "A cut in federal income tax rates in the US right now would raise taxable income enough so that the annual total tax revenue would be higher within five years than without the tax cut."
  - The listed votes: **0 Agree**, 13 Disagree, 15 Strongly Disagree, 3 Uncertain, 2 No Opinion, from 33 respondents on a 40-member panel.
- **Kansas experiment** — [KCUR](https://www.kcur.org/government/2017-06-07/brownback-tax-cut-era-ends-with-kansas-legislatures-veto-override)
  - The 2012 law exempted the owners of more than 300,000 small businesses from state income tax on pass-through income.
  - By 2017 the state faced a projected **$900 million** two-year budget gap.
  - On 6 June 2017 the legislature overrode Governor Brownback's veto (Senate 27–13, House 88–31) and passed a **$1.2 billion** two-year tax increase.

#### Calculus link
- Revenue-maximizing flat rate: **t\* = 1/(1 + e)**. — [Saez, Slemrod & Giertz](https://eml.berkeley.edu/~saez/saez-slemrod-giertzJEL12.pdf)
- Here e is "the elasticity e of earnings with respect to the net-of-tax rate 1−τ". — [Diamond & Saez](https://eml.berkeley.edu/~saez/diamond-saezJEP11opttax.pdf)

#### Worked derivations (my algebra; the result matches Saez, Slemrod & Giertz)
1. **General form.**
   - R(t) = t·Y(t), so dR/dt = Y + t·Y′(t) = Y·[1 − ε_Y,t], where ε_Y,t = −(dY/dt)(t/Y) is the base's elasticity with respect to the *tax rate*.
   - **Revenue peaks where ε_Y,t = 1.** This is the same "unit-elastic" logic as the total revenue test in §4: the tax rate plays the role of the price, and the tax base plays the role of the quantity.
2. **Constant-elasticity base.**
   - With Y(t) = Y₀(1 − t)^e, dR/dt = Y₀(1 − t)^(e−1)·[(1 − t) − e·t] = 0, so **t\* = 1/(1 + e)**.
   - e = 0.25 gives **80%**; e = 0.5 gives **66.7%**; e = 1 gives **50%**.
   - Top-bracket version: 1/(1 + 1.5e). The Saez–Slemrod–Giertz range e = 0.12 to 0.40 gives τ\* ≈ **85% to 63%**.
3. **Linear base** (a typical professor example).
   - With Y(t) = 1,000(1 − t), R = 1,000t − 1,000t², and dR/dt = 1,000 − 2,000t = 0, so **t\* = 50%** and R\* = 250.
   - R(0.2) = R(0.8) = 160: "two tax rates that yield the same revenues".
4. **Excise-tax version** (Krugman-style market diagram).
   - With demand P = 100 − Q, supply P = Q and a per-unit tax T, the quantity traded is Q = (100 − T)/2 and revenue is R = T(100 − T)/2.

     | Tax per unit T | Revenue R |
     |---|---|
     | 20 | 800 |
     | 40 | 1,200 |
     | **50** | **1,250 (peak)** |
     | 60 | 1,200 |
     | 80 | 800 |

### Inferences
- **The connection to this chapter.**
  - The Laffer curve is the total-revenue test applied to taxes.
  - A tax on an inelastic base (cigarettes, land, gasoline in the short run) is on the rising side of the curve over a wide range of rates.
  - A tax on an elastic base (easily shifted income, goods with cross-border substitutes) peaks at lower rates.
  - This is why the **elasticity of taxable income (ETI)** is the key number in the debate.
- **How to argue it on an exam**
  1. **Theory:** a peak must exist, because revenue is 0 at t = 0 and roughly 0 at t = 100%.
  2. **Evidence:** ETI is probably 0.12–0.40, so revenue-maximizing top rates are about 63–85%. Most estimates (Trabandt–Uhlig, Diamond–Saez, Saez–Slemrod–Giertz) place current US income-tax rates **below** the peak.
  3. **So cuts lose revenue on net:** CBO estimates of 1–22% (2005) and about 20% for the TCJA (2018), and 17–50% self-financing in Mankiw–Weinzierl.
  4. **Not a single number:** the peak depends on the tax base, avoidance opportunities and enforcement.
  5. **Revenue-maximizing ≠ optimal:** Trabandt & Uhlig's warning about welfare.
- **Exam trap.** "Cutting taxes always raises revenue" is false. Cutting taxes raises revenue *only* if the rate starts above t\*, in the "prohibitive range".

### Gaps
- **CBO 2005.** I couldn't fetch the primary PDF. The "1–22% offset" (CBO snippet) and CRFB's "up to one-quarter / at worst +3% cost" descriptions differ, probably because they refer to different models or horizons.
- **TCJA breakdown.** Secondary sources split the $1.9 trillion differently (primary deficit vs. debt service vs. macro feedback); the CBO original appendix was blocked.
- **Clark Center percentage.** Wikipedia and other summaries say "none agreed, 71% disagreed". Counting the listed votes gives 28/33 ≈ 85% of respondents, or 28/40 = 70% of the panel. The 71% may be confidence-weighted. Unresolved.
- **The napkin.**
  - The Smithsonian pages couldn't be read directly.
  - A secondary report ([Quartz](https://qz.com/895785/laffer-curve-everything-trump-and-republicans-get-wrong-about-trickle-down-economics-and-reaganomics), via a search summary) says Laffer believes the museum's napkin was recreated later. Unverified.
- **Not verified:**
  - Kansas top-rate details (6.45% → 4.9%, etc.);
  - Feldstein's exact 1995 elasticity numbers;
  - specific Reagan-era and 1920s (Mellon) episodes beyond what Saez–Slemrod–Giertz state.
- **Whether Krugman/Wells/Graddy cover the Laffer curve.** I couldn't confirm that *Essentials* ch. 5 discusses it explicitly. The professor's calculus framing, R = t·Y(t), is covered above either way.

---

## 9. All elasticity formulas on one page (with the calculus view)

### Takeaway
Memorize the table below. The two most useful calculus results are **dR/dP = Q(1 − E_d)**, so revenue peaks where E_d = 1, and **t\* = 1/(1 + e)** for the Laffer curve. Both say the same thing: revenue peaks where the relevant base is "unit-elastic".

### Cited Findings

| Measure | Formula | Sign and classification | Source |
|---|---|---|---|
| Price elasticity of demand (midpoint) | E_d = [ΔQ/avg Q] ÷ [ΔP/avg P], reported as a positive number | 0 perfectly inelastic; 0–1 inelastic; 1 unit-elastic; > 1 elastic; ∞ perfectly elastic | [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply); [Krugman menagerie (publisher page)](http://digfir-published.macmillanusa.com/krugmanwellsessentials4e/asset/ch5/tables/table_5_3.html) |
| Arc elasticity (compact form) | [(P1 + P2)/(Q1 + Q2)] × ΔQ/ΔP | same as above | [Wikipedia](https://en.wikipedia.org/wiki/Price_elasticity_of_demand) |
| Point elasticity | (dQ/dP) × (P/Q) | same as above | [Wikipedia](https://en.wikipedia.org/wiki/Price_elasticity_of_demand) |
| Linear-demand shortcut | (1/slope) × (P/Q), slope = ΔP/ΔQ in absolute value; E_d = 1 at the midpoint | elastic above the midpoint, inelastic below | [UW–Madison handout](https://home.uchicago.edu/~kanit/kanitk/Teaching_(UW-Madison)/Entries/2013/1/21_ECON_101__Principles_of_Microeconomics(Fall_2012)_files/handout7_with_solutions.pdf) |
| Total revenue | TR = P × Q; %ΔTR ≈ %ΔP + %ΔQ | maximized at E_d = 1 | [Wikipedia](https://en.wikipedia.org/wiki/Price_elasticity_of_demand) |
| Marginal revenue | MR = P(1 + 1/E), E signed; = P(1 − 1/E_d) | MR > 0 means elastic | [Wikipedia](https://en.wikipedia.org/wiki/Price_elasticity_of_demand) |
| Income elasticity | %ΔQ ÷ %ΔIncome | < 0 inferior; 0–1 normal, income-inelastic; > 1 income-elastic | [OpenStax §5.4](https://openstax.org/books/principles-economics-3e/pages/5-4-elasticity-in-areas-other-than-price) |
| Cross-price elasticity | %ΔQ_A ÷ %ΔP_B | > 0 substitutes; < 0 complements; ≈ 0 unrelated | [OpenStax §5.4](https://openstax.org/books/principles-economics-3e/pages/5-4-elasticity-in-areas-other-than-price) |
| Price elasticity of supply | %ΔQs ÷ %ΔP | 0 vertical; ∞ horizontal; a line through the origin = 1 | [OpenStax §5.1](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply), [§5.2](https://openstax.org/books/principles-economics-3e/pages/5-2-polar-cases-of-elasticity-and-constant-elasticity) |
| Tax incidence | Buyers' share = E_s/(E_s + E_d); sellers' share = E_d/(E_s + E_d) | the less elastic side pays more | [Wikipedia: Tax incidence](https://en.wikipedia.org/wiki/Tax_incidence) |
| Labor-supply elasticity | %Δhours ÷ %Δwage | high for teens, low for prime-age adults | [OpenStax §5.4](https://openstax.org/books/principles-economics-3e/pages/5-4-elasticity-in-areas-other-than-price) |
| Savings elasticity | %Δsavings ÷ %Δinterest rate | fairly inelastic in the short run | [OpenStax §5.4](https://openstax.org/books/principles-economics-3e/pages/5-4-elasticity-in-areas-other-than-price) |
| Laffer peak (flat tax) | t\* = 1/(1 + e), e = elasticity of the base w.r.t. the net-of-tax rate (1 − t) | e = 0.25 → 80% | [Saez–Slemrod–Giertz](https://eml.berkeley.edu/~saez/saez-slemrod-giertzJEL12.pdf); [Diamond–Saez](https://eml.berkeley.edu/~saez/diamond-saezJEP11opttax.pdf) |
| Laffer peak (top bracket) | τ\* = 1/(1 + a·e), a ≈ 1.5 | e = 0.25 → about 73% | [Diamond–Saez](https://eml.berkeley.edu/~saez/diamond-saezJEP11opttax.pdf) |

- OpenStax's general template for any elasticity: "what is the percentage change in [outcome] derived from a given percentage change in [input]?" — [OpenStax §5.4](https://openstax.org/books/principles-economics-3e/pages/5-4-elasticity-in-areas-other-than-price)

### Inferences
These derivations are my own algebra and are consistent with the cited formulas.
- **Revenue and price.** With R = P·Q(P), dR/dP = Q(1 − E_d).
- **Linear demand Q = a − bP**
  - E_d = bP/(a − bP).
  - Revenue peaks at P = a/(2b), where Q = a/2, which is the midpoint of the line.
- **Constant-elasticity demand Q = kP^(−ε)**
  - The elasticity is the same at every price.
  - R = kP^(1−ε): it rises with P if ε < 1, falls if ε > 1, and is constant if ε = 1 (a rectangular hyperbola).
- **Tax revenue.**
  - With R(t) = t·Y(t), dR/dt = Y(1 − ε_Y,t), which peaks where the base's elasticity with respect to t equals 1.
  - Using the net-of-tax elasticity e: ε_Y,t = e·t/(1 − t), so the peak is at t\* = 1/(1 + e).
- **Small per-unit tax.**
  - dP_buyers/dT = E_s/(E_s + E_d) and dP_sellers/dT = −E_d/(E_s + E_d).
  - For linear curves Qd = a − dP and Qs = c + sP, buyers' share = s/(s + d) exactly.

### Gaps
- None material. The derivations are standard algebra, and a script checked them numerically (for example, a grid search confirms the revenue peaks at t\* = 0.800, 0.667 and 0.500 for e = 0.25, 0.5 and 1).

---

## 10. Practice questions (20) with answers: multiple choice, numeric and graph

### Takeaway
These 20 questions cover the most testable skills, in priority order:
1. midpoint calculations;
2. classification and the total revenue test;
3. cross-price and income signs;
4. supply elasticity and time;
5. tax incidence;
6. the Laffer curve with calculus.

Several are adapted from OpenStax self-check questions and a UW–Madison handout, as cited. The rest are my own, and a script verified all the answers.

### Cited Findings
Source basis for the adapted questions:
- Q10, Q11(b) and Q12(c) adapt OpenStax self-check Q6, Q8 and Q9. — [OpenStax self-check](https://openstax.org/books/principles-economics-3e/pages/5-self-check-questions); [answer key](https://openstax.org/books/principles-economics-3e/pages/chapter-5)
- Q12(b) adapts the UW–Madison doughnut/coffee exercise. — [UW–Madison handout](https://home.uchicago.edu/~kanit/kanitk/Teaching_(UW-Madison)/Entries/2013/1/21_ECON_101__Principles_of_Microeconomics(Fall_2012)_files/handout7_with_solutions.pdf)
- Q8, Q9, Q16 and Q18 use the evidence cited in §§3, 4, 7 and 8:
  - [Havranek et al.](https://ideas.repec.org/a/eee/eneeco/v34y2012i1p201-207.html)
  - [OpenStax Netflix](https://openstax.org/books/principles-economics-3e/pages/5-4-elasticity-in-areas-other-than-price)
  - [Harding et al.](https://www.aeaweb.org/articles?id=10.1257%2Fpol.4.4.169)
  - [Diamond & Saez](https://eml.berkeley.edu/~saez/diamond-saezJEP11opttax.pdf)

#### Questions
**Q1 (multiple choice).** The price of a good rises 10% and quantity demanded falls 5%. The price elasticity of demand, using the textbook convention, is:
- A) −0.5
- B) 0.5
- C) 2
- D) 5

**Q2 (multiple choice).** Economists prefer the midpoint method because it:
- A) always gives a larger elasticity
- B) gives the same elasticity whether price rises or falls between two points
- C) makes the elasticity equal to the slope
- D) removes the need for percentages

**Q3 (numeric).** Price rises from $10 to $12 and quantity falls from 50 to 40.
- (a) Compute E_d with simple % changes from the first point.
- (b) Compute it with simple % changes from the second point.
- (c) Compute it with the midpoint method.
- (d) Classify demand and check your answer with total revenue.

**Q4 (numeric).** Price rises from $4 to $6 and quantity falls from 120 to 100. Find the midpoint E_d, classify demand, and say what happens to TR.

**Q5 (multiple choice).** For the demand curve Q = 4,200 − 20P, which statement is true?
- A) Elasticity is 1 everywhere
- B) Demand is elastic at P = $60
- C) Demand is elastic above P = $105 and inelastic below it
- D) The slope gets steeper as price rises

**Q6 (numeric, calculus).** Demand is Q = 200 − 4P.
- (a) Find the point elasticity at P = 10, 25 and 40.
- (b) Using dR/dP, find the revenue-maximizing price.
- (c) Find the maximum TR.
- (d) At P = 40, should the firm raise or cut its price to raise revenue?

**Q7 (multiple choice).** Which has the most elastic demand?
- A) insulin
- B) table salt
- C) one particular brand of bottled water
- D) gasoline in the week after a price spike

**Q8 (multiple choice).** A meta-analysis finds gasoline demand elasticities of about 0.09 in the short run and 0.31 in the long run. A permanent 10% rise in the gasoline price cuts quantity by about:
- A) 0.9% in the short run and 3.1% in the long run
- B) 9% and 31%
- C) 3.1% and 0.9%
- D) 0% in both

**Q9 (numeric).** In 2011 Netflix raised prices 60% and lost 810,000 of its 24.6 million subscribers. Estimate E_d. Was demand elastic or inelastic? Did revenue rise or fall, and by about how much?

**Q10 (multiple choice / short answer).** A drug company wants to maximize revenue. What should it do to price if E_d is (a) 1.4, (b) 0.6, (c) 1.0?

**Q11 (numeric).**
- (a) Income rises from $40,000 to $50,000, and restaurant meals rise from 8 to 12 a month. Compute the income elasticity (midpoint) and classify the good.
- (b) Income rises from $25,000 to $38,000, and bread falls from 30 to 22 loaves a year. Compute and classify.

**Q12 (numeric).**
- (a) Coffee rises from $2.00 to $2.50 and tea purchases rise from 100 to 120. Compute the cross-price elasticity (midpoint) and the relationship.
- (b) The cross-price elasticity of doughnuts with respect to the coffee price is −1.5. Coffee rises 10%. What happens to doughnuts, and what is the relationship?
- (c) Oranges fall 3% in price, and the cross elasticity of apples with respect to the orange price is 0.4. What happens to apples?

**Q13 (numeric).** The wheat price rises from $5 to $6. In the short run quantity supplied rises from 1,000 to 1,100; in the long run it rises from 1,000 to 1,500. Compute E_s for each and explain the difference.

**Q14 (multiple choice).** Which is the best example of perfectly inelastic supply?
- A) pizza
- B) radio-spectrum licences or a fixed plot of downtown land
- C) pencils
- D) T-shirts

**Q15 (numeric).** Qd = 100 − 2P and Qs = 3P − 50. The government imposes a $5 per-unit tax on sellers.
- (a) Find the pre-tax equilibrium.
- (b) Find the price buyers pay, the price sellers keep, and the new quantity.
- (c) Find each side's burden.
- (d) Find the tax revenue and the deadweight loss.
- (e) Verify the burden with the elasticity formula.

**Q16 (short answer).** Cigarette demand is about 0.3–0.4. A $1/pack tax is collected from manufacturers.
- (a) Who bears most of it?
- (b) What does evidence show about pass-through, and why is it lower near state borders?

**Q17 (numeric, calculus).** The tax base is Y(t) = 1,000(1 − t).
- (a) Write R(t) and find t\* and R\*.
- (b) Show that two different rates give revenue of 160.
- (c) Starting from t = 0.7, does a cut to 0.6 raise or lower revenue? What about a cut from 0.3 to 0.2?

**Q18 (numeric, calculus).** Y(t) = Y₀(1 − t)^e.
- (a) Derive t\* = 1/(1 + e).
- (b) Compute t\* for e = 0.25, 0.5 and 1.
- (c) Compute the Diamond–Saez top rate with a = 1.5 and e = 0.25, and interpret it.

**Q19 (graph).** Draw a straight-line demand curve from P = $50 on the price axis to Q = 100 on the quantity axis.
- (a) Label the elastic, unit-elastic and inelastic regions.
- (b) Find the revenue-maximizing point and the maximum TR.
- (c) Sketch TR against Q.

**Q20 (graph).** Draw a per-unit tax with (a) perfectly inelastic demand and (b) perfectly elastic demand. In each case, who bears the tax, and is there a deadweight loss? (c) What happens if *supply* is perfectly inelastic?

#### Answers
- **A1:** **B.** 5%/10% = 0.5 (inelastic). The minus sign is dropped by convention.
- **A2:** **B** (OpenStax's stated advantage).
- **A3**
  - (a) %ΔQ = −10/50 = −20% and %ΔP = +2/10 = +20%, so E_d = **1.00**.
  - (b) %ΔQ = +10/40 = +25% and %ΔP = −2/12 = −16.7%, so E_d = **1.50**.
  - (c) %ΔQ = 10/45 = 22.2% and %ΔP = 2/11 = 18.2%, so E_d = **1.22, elastic**.
  - (d) TR falls from $500 to $480, which agrees with "elastic". The simple-% answer in (a), "unit-elastic", would have wrongly predicted no change.
- **A4:** %ΔQ = 20/110 = 18.2% and %ΔP = 2/5 = 40%, so E_d = **0.45 (inelastic)**. TR **rises** from $480 to $600.
- **A5:** **C.** The midpoint of a line with P-intercept $210 and Q-intercept 4,200 is P = $105. At $60, E_d = 0.40.
- **A6**
  - (a) E_d = 4P/Q gives **0.25** at P = 10 (Q = 160), **1** at P = 25 (Q = 100) and **4** at P = 40 (Q = 40).
  - (b) R = 200P − 4P², so dR/dP = 200 − 8P = 0 and **P\* = 25**.
  - (c) **TR = 2,500.**
  - (d) Demand is elastic at P = 40 (dR/dP = −120 < 0), so **cut** the price.
- **A7:** **C.** A single brand has many close substitutes.
- **A8:** **A.** The short run is far more inelastic than the long run, because people need time to change cars, commutes and homes.
- **A9:**
  - %ΔQ ≈ −0.81/24.6 = −3.3% and %ΔP = +60%, so E_d ≈ **0.05**. The midpoint method gives about 0.07. Demand is **highly inelastic**.
  - Revenue ≈ 1.60 × 0.967 ≈ 1.55 times the old level, a rise of about **55%**.
- **A10**
  - (a) E_d = 1.4 is elastic: **lower** the price.
  - (b) E_d = 0.6 is inelastic: **raise** the price.
  - (c) E_d = 1.0 is unit-elastic: **keep** the price, since revenue is already at its maximum.
- **A11**
  - (a) 40% ÷ 22.2% = **+1.8**: a normal, income-elastic ("luxury") good.
  - (b) −30.8% ÷ 41.3% = **−0.75**: an **inferior** good.
- **A12**
  - (a) 18.2% ÷ 22.2% = **+0.82**: **substitutes**.
  - (b) −1.5 × 10% = **−15%** for doughnuts: **complements**.
  - (c) 0.4 × (−3%) = **−1.2%** for apples: substitutes.
- **A13:** The midpoint %ΔP = 1/5.5 = 18.2%.
  - Short run: 100/1,050 = 9.5%, so E_s = **0.52 (inelastic)**.
  - Long run: 500/1,250 = 40%, so E_s = **2.2 (elastic)**.
  - With more time, farmers can plant more land and add equipment, so inputs become available.
- **A14:** **B.**
- **A15**
  - (a) 100 − 2P = 3P − 50, so **P = $30, Q = 40**.
  - (b) The supply curve shifts to Qs = 3(P − 5) − 50, so buyers pay **$33**, sellers keep **$28**, and **Q = 34**.
  - (c) Consumers pay **$3 (60%)** and producers **$2 (40%)**.
  - (d) Revenue = $5 × 34 = **$170**; deadweight loss = ½ × 5 × 6 = **$15**.
  - (e) E_d = 1.5 and E_s = 2.25, so the buyers' share = 2.25/3.75 = **0.60** ✓. The answer is the same if buyers pay the tax.
- **A16**
  - (a) **Consumers**, because demand is inelastic relative to supply.
  - (b) On average about **0.85¢ of each 1¢** of tax shows up in prices (Harding et al.). Near lower-tax borders it is only about **0.51¢**, because smokers can buy across the border, which makes local demand more elastic. Some studies find **more than 100%** pass-through (Hanson & Sullivan: 1.13–1.18), which is a market-power effect.
- **A17**
  - (a) R = 1,000t − 1,000t², so dR/dt = 1,000 − 2,000t = 0. That gives **t\* = 0.5** and **R\* = 250**.
  - (b) **R(0.2) = R(0.8) = 160**.
  - (c) Cutting from 0.7 to 0.6 **raises** R from 210 to 240 (the prohibitive range). Cutting from 0.3 to 0.2 **lowers** R from 210 to 160 (the normal range).
- **A18**
  - (a) R = tY₀(1 − t)^e, so dR/dt = Y₀(1 − t)^(e−1)[(1 − t) − e·t] = 0, which gives **t\* = 1/(1 + e)**.
  - (b) **80%, 66.7% and 50%.**
  - (c) 1/(1 + 1.5 × 0.25) = **72.7%**. The more responsive the base (higher e), the lower the revenue-maximizing rate. With the evidence range e = 0.12–0.40, the top-bracket rate is about **63–85%**.
- **A19**
  - Demand is Q = 100 − 2P.
  - (a) Unit-elastic at the **midpoint, Q = 50 and P = $25**. **Elastic** above it (at P = 40, E_d = 4) and **inelastic** below it (at P = 10, E_d = 0.25).
  - (b) **Maximum TR = $1,250** at the midpoint.
  - (c) TR plotted against Q is an inverted U: zero at Q = 0 and at Q = 100, with its peak at Q = 50.
- **A20**
  - (a) With a vertical demand curve, the buyers' price rises by the full tax. **Consumers bear 100%**, Q is unchanged and there is **no deadweight loss**.
  - (b) With a horizontal demand curve, the buyers' price is unchanged and the sellers' net price falls by the full tax. **Producers bear 100%**, and Q falls.
  - (c) With vertical (perfectly inelastic) supply, **sellers bear 100%**. This is the land-tax case.

### Inferences
- **Most testable for a Krugman-based intro midterm**, in my judgment:
  1. the midpoint calculation and the A→B vs. B→A trap;
  2. classification plus the total revenue test (including "elasticity ≠ slope");
  3. the signs of cross-price and income elasticity;
  4. incidence with the "less elastic side pays" rule;
  5. one calculus question: dR/dP, or the Laffer t\*.
- **Ten-second checklist before submitting any elasticity answer**
  1. Quantity on top?
  2. Midpoint method?
  3. Sign handled correctly (dropped only for own price)?
  4. Classified (elastic, inelastic or unit)?
  5. Revenue-test consistent?

### Gaps
- No actual past Inha/NTS3040 exams were publicly available. The question mix is modelled on OpenStax and US Econ 101 materials.

---

## 11. Best free resources (legitimate and free)

### Takeaway
For one week of revision:
- **OpenStax ch. 5** (free, legal, mirrors Krugman's topics, with self-check questions and an answer key);
- **MRU's elasticity lessons**, each with a quiz;
- **Khan Academy's elasticity unit** for drills;
- the **UW–Madison handout** for midpoint, point-elasticity and revenue-maximization practice.

For deeper reading on the Laffer debate, Diamond & Saez (2011) is the most readable primary source.

### Cited Findings
- **OpenStax *Principles of Economics* 3e, Ch. 5 (CC BY)**
  - [§5.1 Price elasticity of demand and supply](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
  - [§5.2 Polar cases](https://openstax.org/books/principles-economics-3e/pages/5-2-polar-cases-of-elasticity-and-constant-elasticity)
  - [§5.3 Elasticity and pricing (TR, tax incidence)](https://openstax.org/books/principles-economics-3e/pages/5-3-elasticity-and-pricing)
  - [§5.4 Income, cross-price, labor and savings elasticities](https://openstax.org/books/principles-economics-3e/pages/5-4-elasticity-in-areas-other-than-price)
  - [Self-check questions](https://openstax.org/books/principles-economics-3e/pages/5-self-check-questions) and the [answer key](https://openstax.org/books/principles-economics-3e/pages/chapter-5): nine questions covering demand and supply arcs, constant elasticity, pricing decisions, income and cross-price elasticity.
- **Marginal Revolution University** — [course page](https://learn.mru.org/courses/principles-of-microeconomics)
  - Lessons:
    - [Elasticity of Demand](https://learn.mru.org/lessons/elasticity-demand-definition)
    - [Calculating the Elasticity of Demand](https://learn.mru.org/lessons/calculate-elasticity-demand-formula)
    - [Office Hours: Elasticity of Demand](https://learn.mru.org/lessons/office-hours-elasticity-demand)
    - [Elasticity of Supply](https://learn.mru.org/lessons/elasticity-supply-midpoint-formula)
    - [Why Housing is Unaffordable](https://learn.mru.org/lessons/elasticity-supply-why-housing-unaffordable)
    - [Do Gun Buybacks Work?](https://learn.mru.org/lessons/elasticity-supply-do-gun-buybacks-work)
    - [Who Pays the Tax?](https://learn.mru.org/lessons/tax-burden-elasticity-affordable-care-act-health-insurance-mandate)
  - Interactives: [Elasticity](https://learn.mru.org/interactives/elasticity) and [Graphing Elasticity](https://learn.mru.org/interactives/graphing-elasticity).
  - There is a matching quiz for each lesson, for example the [Elasticity of Demand quiz](https://learn.mru.org/quizzes/elasticity-of-demand) and the [Who Pays the Tax? quiz](https://learn.mru.org/quizzes/who-pays-the-tax).
  - The [MRU teacher unit plan](https://pages.mru.org/lesson-plans/price-elasticity-unit/) opens with an EpiPen price question, a good intuition check.
- **Khan Academy, Microeconomics: Elasticity unit**
  - [Unit page](https://www.khanacademy.org/economics-finance-domain/microeconomics/elasticity-tutorial)
  - [Practice: price elasticity of demand and its determinants](https://en.khanacademy.org/economics-finance-domain/microeconomics/elasticity-tutorial/price-elasticity-tutorial/e/price-elasticity-of-demand)
  - [Video: More on total revenue and elasticity](https://en.khanacademy.org/economics-finance-domain/microeconomics/elasticity-tutorial/price-elasticity-tutorial/v/more-on-total-revenue-and-elasticity)
  - [Article: Elasticity and tax revenue / incidence](https://www.khanacademy.org/economics-finance-domain/microeconomics/elasticity-tutorial/price-elasticity-tutorial/a/elasticity-and-tax-incidence)
  - [Article: Elasticity in the long run and short run](https://www.khanacademy.org/economics-finance-domain/microeconomics/elasticity-tutorial/price-elasticity-tutorial/a/elasticity-in-the-long-run-and-short-run)
  - The unit covers the midpoint method, perfect elasticity and inelasticity, constant unit elasticity, and total revenue (search summary).
- **University problem sets with solutions (.edu)**
  - The UW–Madison Econ 101 (Fall 2012) elasticity handout has fully worked solutions on simple % vs. midpoint vs. point elasticity, the revenue maximum, and cross and income elasticity. — [PDF](https://home.uchicago.edu/~kanit/kanitk/Teaching_(UW-Madison)/Entries/2013/1/21_ECON_101__Principles_of_Microeconomics(Fall_2012)_files/handout7_with_solutions.pdf)
  - More UW–Madison Econ 101 answer keys and a midterm surfaced in search; their server refused my connection, so the contents are unchecked:
    - [HW3 answers, Spring 2017](https://users.ssc.wisc.edu/~ekelly/econ101/answerstohomework3spring2017.pdf)
    - [HW3 answers, Fall 2008](https://users.ssc.wisc.edu/~ekelly/econ101/answerstohomework3fall2008.pdf)
    - [Midterm 2, Fall 2010](https://users.ssc.wisc.edu/~ekelly/econ101/midterm2morningfall2010.pdf)
    - [HW3 answers, Fall 2012](https://home.uchicago.edu/~kanit/kanitk/Teaching_(UW-Madison)/Entries/2013/1/21_ECON_101__Principles_of_Microeconomics(Fall_2012)_files/answerstohomework3_fall2012.pdf)
  - The WSU EconS 305 Lecture 7 slides cover cross-price and supply elasticity, with the Coke/Pepsi application. — [PDF](https://s3.wp.wsu.edu/uploads/sites/1736/2017/09/305Lecture-7.pdf)
- **Readable primary research for "real-world" answers**
  - [Andreyeva et al. 2010 food elasticities (open access)](https://pmc.ncbi.nlm.nih.gov/articles/PMC2804646/)
  - [Havranek et al. gasoline meta-analysis](https://meta-analysis.cz/gasoline_price/gas_price.pdf)
  - [Diamond & Saez 2011 (JEP)](https://eml.berkeley.edu/~saez/diamond-saezJEP11opttax.pdf)
  - [Saez, Slemrod & Giertz 2012 (JEL)](https://eml.berkeley.edu/~saez/saez-slemrod-giertzJEL12.pdf)
  - [Clark Center Laffer poll](https://kentclarkcenter.org/surveys/laffer-curve/)

### Inferences
- **Suggested plan for 19–24 Oct**
  - **Day 1:** OpenStax §5.1–5.2 and the MRU "Elasticity of Demand" and "Calculating" lessons, then practice Q1–Q5.
  - **Day 2:** total revenue: OpenStax §5.3, Khan's TR videos and Q6–Q10.
  - **Day 3:** income, cross-price and supply: OpenStax §5.4, the MRU supply lessons and Q11–Q14.
  - **Day 4:** incidence and Laffer: MRU "Who Pays the Tax?", Q15–Q20, and §8 of these notes.
  - **Day 5:** redo the UW handout and the OpenStax self-check questions without looking at the answers.
- **Not a substitute for the class material.** Krugman's terminology ("Elasticity menagerie", "price effect vs. quantity effect") and the professor's calculus framing should be checked against the class slides, which are kept separately.

### Gaps
- **Krugman's official free student resources** (the publisher's "digfir" asset pages for *Essentials* 4e) appear to be offline: the DNS lookup failed. No working official Krugman student site was found.
- **Unauthorized full-text copies** of Krugman surfaced in search and were intentionally not used or linked.
