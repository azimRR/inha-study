# Beyond Perfect Competition: Monopoly, Oligopoly and Monopolistic Competition (Krugman, Wells & Graddy, *Essentials of Economics*), plus a one-page primer on "Macroeconomics: The Big Picture"

> Outside (internet) research notes for **NTS3040 Introduction to Economics**, Inha University in Tashkent, Fall 2026. Textbook: Krugman, Wells & Graddy, *Essentials of Economics* (Worth/Macmillan). Compiled **2026-10-19** for the midterm in the week of **24–30 Oct 2026**.
> **External sources only.** No textbook copies were used or linked. The only Krugman material consulted is the publisher's own free *Preface and Table of Contents* preview (4th ed.), the publisher's 6th-edition product page, and two search-result snippets from the publisher's own module pages.
> **Every worked example, graph-in-words and practice answer is my own construction.** Each is labelled "own calculation", and every number was checked with a Python/SymPy script.
> **Krugman vocabulary is used throughout:** *market power, barrier to entry, natural monopoly, increasing returns to scale, network externality, technological superiority, government-created barrier, patent, copyright, single-price monopolist, quantity effect / price effect, optimal output rule (MR = MC), price regulation, price discrimination, perfect price discrimination, oligopoly, duopoly, imperfect competition, interdependence, collusion, cartel, noncooperative behavior, game theory, payoff matrix, prisoners' dilemma, dominant strategy, Nash (noncooperative) equilibrium, strategic behavior, tit for tat, tacit collusion, price war, antitrust policy, product differentiation, price leadership, nonprice competition, monopolistic competition, zero-profit equilibrium, excess capacity, brand name.*
> **Scope:** another researcher covers perfect competition, externalities and public goods. This file has only a one-paragraph bridge from perfect competition.
> **Layout:** each section has a Takeaway, Cited Findings (sourced facts), Inferences (my worked examples and exam logic) and Gaps. Sources I could only see as search-result snippets, not open, are marked "(search snippet)".

---

## 1. Which chapter is this in your edition? Types of market structure, comparison table, and the bridge from perfect competition

### Takeaway
Krugman sorts markets on two questions. How many producers are there (one, few or many)? Are the goods identical or differentiated? That gives four structures: perfect competition, monopolistic competition, oligopoly and monopoly. They differ in entry barriers, in whether the firm is a price taker or a price maker, in long-run profit, and in efficiency.

**Edition alert:** from the 4th edition onward (4e, 5e, 6e ©2023), *Essentials* splits this material into **Ch. 8 *Monopoly*** (now including price discrimination) and **Ch. 9 *Oligopoly and Monopolistic Competition*** (now including game theory). Older editions had one combined chapter, "Monopoly, Oligopoly, and Monopolistic Competition". If the course's "Ch. 7–8" uses current numbering, **monopoly (including price discrimination) is the core midterm content**. Oligopoly and monopolistic competition are second priority unless the professor confirms they are included.

### Cited Findings
**Edition and chapter structure (publisher sources)**
- 6th edition (©2023) table of contents: Part 4 "Beyond Perfect Competition" = **Ch. 8 Monopoly; Ch. 9 Oligopoly and Monopolistic Competition**. Ch. 7 is "Perfect Competition and the Supply Curve", Ch. 10 "Externalities and Public Goods", and Ch. 12 "Macroeconomics: The Big Picture". — [Macmillan Learning, *Essentials of Economics* 6e](https://www.macmillanlearning.com/ed/uk/product/Essentials-of-Economics--6th-edition/p/1319498574)
- 4th-edition preface (front matter ©2016): "New coverage of price discrimination and game theory, and a newly separate Chapter 8 on monopoly. In response to feedback from users, we've carved out a separate chapter on monopoly and added coverage of price discrimination to it. We also added a full section on game theory to Chapter 9, on oligopoly and monopolistic competition." The same preface lists "2 Major New Sections: Price Discrimination in Chapter 8, Monopoly; Game Theory in Chapter 9, Oligopoly and Monopolistic Competition". — [Macmillan, *Essentials of Economics* 4e, Preface and TOC (publisher sample PDF)](https://prod-cat-files.macmillan.cloud/CMS/SampleChapters/NDP000DKG/1416_Krugman%20Essentials%20of%20Economics%204e%20-%20Preface%20and%20TOC.pdf)
- 4e detailed contents of **Ch. 8 *Monopoly*** (p. 231):
  - Opening story: "Everybody Must Get Stones".
  - *Types of Market Structure*.
  - *The Meaning of Monopoly*: Monopoly: Our First Departure from Perfect Competition; What Monopolists Do; Why Do Monopolies Exist?
  - Economics in Action (EiA): "Newly Emerging Markets: A Diamond Monopolist's Best Friend".
  - *How a Monopolist Maximizes Profit*: The Monopolist's Demand Curve and Marginal Revenue; The Monopolist's Profit-Maximizing Output and Price; Monopoly versus Perfect Competition; Monopoly: The General Picture.
  - EiA: "Shocked by the High Price of Electricity".
  - *Monopoly and Public Policy*: Welfare Effects of Monopoly; Preventing Monopoly; Dealing with Natural Monopoly.
  - EiA: "Why Is Your Broadband So Slow? And Why Does It Cost So Much?"
  - *Price Discrimination*: The Logic of Price Discrimination; Perfect Price Discrimination.
  - EiA: "Sales, Factory Outlets, and Ghost Cities".
  - Solved Problem: "Painkiller Pricing".

  — [Macmillan 4e TOC](https://prod-cat-files.macmillan.cloud/CMS/SampleChapters/NDP000DKG/1416_Krugman%20Essentials%20of%20Economics%204e%20-%20Preface%20and%20TOC.pdf)
- 4e detailed contents of **Ch. 9 *Oligopoly and Monopolistic Competition*** (p. 262):
  - Opening story: "Caught in the Act".
  - *The Meaning of Oligopoly*: Understanding Oligopoly; Oligopoly in Practice.
  - EiA: "Bitter Chocolate?"
  - *Games Oligopolists Play*: The Prisoners' Dilemma; Repeated Interaction and Tacit Collusion.
  - EiA: "The Rise and Fall and Rise of OPEC".
  - *The Meaning of Monopolistic Competition*: Large Numbers; Free Entry and Exit in the Long Run; Differentiated Products.
  - EiA: "Any Color, So Long as It's Black".
  - Solved Problem: "The Ups (and Downs) of Oil Prices".
  - Part 4 Business Cases: "Amazon and Hachette Go to War"; "Virgin Atlantic Blows the Whistle . . . or Blows It?"

  — [Macmillan 4e TOC](https://prod-cat-files.macmillan.cloud/CMS/SampleChapters/NDP000DKG/1416_Krugman%20Essentials%20of%20Economics%204e%20-%20Preface%20and%20TOC.pdf)

**Defining the structures (OpenStax)**
- "Oligopoly arises when a small number of large firms have all or most of the sales in an industry." — [OpenStax 10.2](https://openstax.org/books/principles-economics-3e/pages/10-2-oligopoly)
- "Monopolistic competition involves many firms competing against each other, but selling products that are distinctive in some way." — [OpenStax 10.1](https://openstax.org/books/principles-economics-3e/pages/10-1-monopolistic-competition)
- "A perfectly competitive firm acts as a price taker", whereas "a monopoly perceives the demand curve that it faces to be the same as the market demand curve, which for most goods is downward-sloping." — [OpenStax 9.2](https://openstax.org/books/principles-economics-3e/pages/9-2-how-a-profit-maximizing-monopoly-chooses-output-and-price)
- Barriers to entry are "legal, technological, or market forces that discourage or prevent potential competitors from entering a market". — [OpenStax 9.1](https://openstax.org/books/principles-economics-3e/pages/9-1-how-monopolies-form-barriers-to-entry)
- Monopoly vs perfect competition: under perfect competition firms produce where "P = MC", which is allocatively efficient; "in the case of monopoly, price is always greater than marginal cost". — [OpenStax 9.2](https://openstax.org/books/principles-economics-3e/pages/9-2-how-a-profit-maximizing-monopoly-chooses-output-and-price)
- In the long run under monopolistic competition, entry continues until "the firm's perceived demand curve touches the average cost curve. When price is equal to average cost, economic profits are zero." — [OpenStax 10.1](https://openstax.org/books/principles-economics-3e/pages/10-1-monopolistic-competition)

### Inferences
#### Bridge from perfect competition (one paragraph)
In Ch. 7 the firm is a **price taker**. It faces a horizontal demand curve at the market price, so **P = MR**, and the optimal output rule MR = MC becomes **P = MC**. Free entry and exit push long-run economic profit to zero and price to **minimum ATC**, which is efficient.

This chapter changes one assumption. The firm now faces a **downward-sloping demand curve**, so it has **market power**. To sell one more unit it must cut the price on all units, so **MR < P**. The rule is still **MR = MC**, because that rule holds for every firm. But now **P > MR = MC**, so P > MC: some units that consumers value above their cost are never produced, and that lost surplus is the **deadweight loss**.

Whether profit survives in the long run depends on **barriers to entry**:
- **None** in monopolistic competition: profit goes to zero.
- **High** in monopoly: profit can persist.
- **Significant but not total** in oligopoly: the outcome depends on strategic behaviour.

#### Krugman's classification: a decision tree (my rendering of the "Types of Market Structure" logic)
1. **How many producers?** One → **monopoly**. Few → **oligopoly** (goods may be identical, like crude oil, or differentiated, like cars and colas). Many → go to question 2.
2. **Are the goods differentiated?** No → **perfect competition**. Yes → **monopolistic competition**.
3. **Entry conditions** decide long-run profit. With free entry and exit (perfect and monopolistic competition), long-run economic profit is 0. With barriers (oligopoly, monopoly), profit can persist.

#### Comparison table (exam-ready; own synthesis consistent with the sources above)
| Feature | Perfect competition | Monopolistic competition | Oligopoly | Monopoly |
|---|---|---|---|---|
| Number of firms | Many | Many | Few (2 = duopoly) | One |
| Product | Identical (standardized) | Differentiated (style/type, location, quality) | Identical or differentiated | Unique, no close substitutes |
| Entry barriers | None (free entry/exit) | None in the long run | Significant | Very high (blocked) |
| Price taker or maker? | Taker | Maker (limited power) | Maker, but **interdependent** | Maker |
| Demand curve facing the firm | Horizontal at market P | Downward-sloping, fairly elastic | Downward-sloping; depends on rivals' reactions | The market demand curve |
| MR vs P | MR = P | MR < P | MR < P | MR < P |
| Output/price rule | P = MC | MR = MC, P read off firm's demand | Collusion → acts like a monopoly; noncooperation → between monopoly and competition | MR = MC, P read off demand |
| Short-run profit | +, 0 or − | +, 0 or − | Usually + | Usually + (can be −) |
| Long-run economic profit | 0 | 0 (entry/exit; D tangent to ATC) | Can stay + | Can stay + |
| Allocative efficiency (P = MC?) | Yes | No (P > MC) | No (usually P > MC) | No (P > MC → DWL) |
| Productive efficiency (min ATC?) | Yes, long run | No: **excess capacity** | Not necessarily | Not necessarily |
| Key exam tool | Supply–demand, P = MC | D–ATC tangency picture | **Payoff matrix**, Nash equilibrium | D, MR, MC, ATC picture; DWL triangle |
| Nonprice competition | None | Advertising, brands | Advertising, brands (nonprice competition) | Some |
| Typical examples | Wheat; identical produce at a bazaar | Restaurants, cafés, salons, clothing | Oil exporters (OPEC+), airlines, mobile networks, colas | Local water/power grid, patented drug |

#### What "price maker" means on the graph
- A price taker chooses only Q, because P is given.
- A price maker chooses a **point on its demand curve**. Picking Q also fixes P (or the reverse).
- This is why the monopolist's two-step method is: (1) find Q where MR = MC; (2) go **up to the demand curve** to read P.

### Gaps
- I could not open the 3rd or 5th edition tables of contents directly. The 4e preface's statement that monopoly was "carved out" as a separate chapter implies earlier editions combined monopoly, oligopoly and monopolistic competition in one chapter. A search summary also claimed the 5e uses the same split as 4e and 6e. Check the edition you own.
- The course schedule's label "Ch. 7–8 (The Market Structure: From Perfect Competition to Monopoly)" is the professor's own wording. Whether Ch. 9 (oligopoly and monopolistic competition) is on the midterm could not be verified from outside sources.

---

## 2. Why monopolies exist: Krugman's five sources of monopoly power, with real cases

### Takeaway
A monopoly's profit lasts only if a **barrier to entry** keeps rivals out. Krugman lists five sources:
1. Control of a scarce resource or input.
2. **Increasing returns to scale**, which create a **natural monopoly**.
3. **Technological superiority**.
4. **Network externalities**.
5. **Government-created barriers**: patents, copyrights, licences, exclusive rights.

Most of these barriers erode over time. New technology arrives, patents expire, and generic entry pushes prices down sharply.

### Cited Findings
**Definitions and the standard list of barriers**
- A natural monopoly occurs "when economies of scale are large relative to the quantity demanded in the market". OpenStax's examples are water and electric companies. — [OpenStax 9.1](https://openstax.org/books/principles-economics-3e/pages/9-1-how-monopolies-form-barriers-to-entry)
- OpenStax's Table 9.1 lists five barriers to entry:
  1. Natural monopoly (water, electric companies).
  2. Control of a physical resource (DeBeers diamonds).
  3. Legal monopoly (U.S. Postal Service, past airline/trucking regulation).
  4. Patent, trademark, copyright (new drugs, software).
  5. Intimidating potential competitors (predatory pricing, brand names).

  — [OpenStax 9.1](https://openstax.org/books/principles-economics-3e/pages/9-1-how-monopolies-form-barriers-to-entry)

**Control of a scarce resource**
- In the 1930s ALCOA controlled "most of the supply of bauxite". OpenStax says DeBeers controls the "majority of global diamond production" (this is OpenStax's characterization; see Gaps). — [OpenStax 9.1](https://openstax.org/books/principles-economics-3e/pages/9-1-how-monopolies-form-barriers-to-entry)

**Government-created barriers**
- A patent is "the exclusive legal right to make, use, or sell the invention for a limited time", lasting **20 years** in the U.S.
- A copyright protects "original works of authorship" for "the life of the author plus 70 years".
- A trademark is "an identifying symbol or name for a particular good" and is renewable indefinitely while in active use.

  — [OpenStax 9.1](https://openstax.org/books/principles-economics-3e/pages/9-1-how-monopolies-form-barriers-to-entry)

**Technology can end a monopoly**
- AT&T provided phone service for most of the twentieth century and lost its monopoly as microwave and satellite technology advanced. — [OpenStax 9.1](https://openstax.org/books/principles-economics-3e/pages/9-1-how-monopolies-form-barriers-to-entry)

**Network externality: the Microsoft case**
- In *U.S. v. Microsoft*, the court's findings of fact describe an "**applications barrier to entry**". Windows had an abundance of applications, which created a "chicken-and-egg problem": a new operating system could not attract developers without users, nor users without applications.
- The findings also say Microsoft's low pricing would "intensify the positive network effects that add to the impenetrability of the applications barrier to entry".

  — [DoJ, U.S. v. Microsoft: Court's Findings of Fact](https://www.justice.gov/atr/us-v-microsoft-courts-findings-fact) (quotes from search snippet)

**Size of a modern dominant firm**
- Google: the U.S. court found in August 2024 that "Google is a monopolist, and it has acted as one to maintain its monopoly". The DoJ notes that "Google accounted for approximately 90 percent of all search queries in the United States". — [DoJ press release, 2 Sep 2025](https://www.justice.gov/opa/pr/department-justice-wins-significant-remedies-against-google)

**Patent expiry and generic entry (FDA)**
- An FDA analysis (December 2019) of drugs whose first generic entered in 2015–2017 compared generic prices with the brand price before generic entry:
  - With **one** generic producer, the generic average manufacturer price (AMP) was **39% lower**.
  - With **six or more** generic competitors, prices were **more than 95% lower**.

  — [FDA, Generic Competition and Drug Prices](https://www.fda.gov/about-fda/center-drug-evaluation-and-research-cder/generic-competition-and-drug-prices); [FDA report PDF](https://www.fda.gov/media/133509/download) (the percentages come from the search summary of the report; the FDA landing page I opened confirms the December 2019 analysis but does not show the figures)

**Uzbekistan: government-created barriers in practice (IMF)**
- The IMF's April 2026 Article IV statement recommends:
  - "Privatize profitable SOEs in competitive sectors; liquidate non‑viable SOEs with support for affected workers".
  - Strengthening market regulation by activating sector regulators and **eliminating exclusive rights in key sectors**.

  — [IMF, Uzbekistan 2026 Article IV concluding statement (13 Apr 2026)](https://www.imf.org/en/news/articles/2026/04/13/mcs041326-uzbekistan)

### Inferences
#### Krugman's five sources: mechanism, example, and how each barrier erodes (own synthesis)
| Source (Krugman term) | Why rivals can't enter | Example (source in Cited Findings) | How it erodes |
|---|---|---|---|
| **Control of a scarce resource or input** | The incumbent owns the key input | ALCOA's bauxite (1930s); De Beers diamonds. Krugman's opening story "Everybody Must Get Stones" and the EiA "A Diamond Monopolist's Best Friend" point to diamonds | New deposits found; synthetic substitutes |
| **Increasing returns to scale → natural monopoly** | ATC falls over the whole relevant output range, so one firm supplies the market more cheaply than two | Water pipes, electricity/gas distribution grids | New technology changes the cost curve (AT&T: microwave and satellite) |
| **Technological superiority** | A better product or a cheaper process | A firm whose technology rivals cannot yet copy (Krugman's general category; no current sourced example here) | Usually **temporary**: rivals catch up |
| **Network externality** | A good becomes more valuable the more people use it, so the biggest network wins | Windows' "applications barrier to entry"; social networks | Platform shifts (e.g., to mobile or new apps) |
| **Government-created barrier** | The law forbids entry | Patents (20 years), copyrights (life + 70), licences, legal monopolies (U.S. Postal Service), exclusive rights | Expiry (then generic entry cuts prices 39% to more than 95%); deregulation and privatization |

#### Why governments create monopolies on purpose (exam paragraph)
Patents and copyrights trade a **temporary deadweight loss** for **innovation incentives**. Without patent protection, a firm that spends heavily on R&D for a new drug could be copied immediately, and price would fall to MC with no reward for the R&D. The patent lets the inventor charge P > MC for 20 years. The FDA numbers show what happens when the patent expires: price collapses toward cost as generics enter. This is the monopoly → competition movement along the market-structure spectrum.

#### Exam trap: monopoly is defined by "no close substitutes"
Whether a firm is a monopolist depends on how the market is defined. A U.S. court in 2025 ruled that Meta was **not** a monopolist once TikTok and YouTube were included in the market (Section 5). Always ask: *the only seller of what, to whom?*

### Gaps
- OpenStax's statement that DeBeers controls the "majority" of world diamond production is dated. I did not find a reliable current figure for De Beers' market share.
- I found no well-sourced, current example of a monopoly based purely on **technological superiority** that a court or regulator has described as such. The category is illustrated conceptually only.
- I did not open the FDA PDF itself (see the note above).

---

## 3. The monopolist's demand curve, why MR < P (quantity effect vs price effect), the MR = MC rule, and reading price off the demand curve, with the calculus

### Takeaway
A monopolist faces the **market demand curve**. To sell one more unit it must lower the price on **all** units, so marginal revenue has two parts:
- the **quantity effect** (+P on the extra unit);
- the **price effect** (the price cut × all the units it was already selling).

Because the price effect is negative, **MR < P** at every Q > 0. With linear demand P = a − bQ, MR = a − 2bQ: same intercept, twice as steep.

Profit is maximized where **MR = MC**, and the price is then read **off the demand curve** at that quantity. In calculus, MR = dTR/dQ and the first-order condition is dπ/dQ = MR − MC = 0. Because MR = P(1 − 1/|E|), a monopolist with MC > 0 always produces on the **elastic** part of demand.

### Cited Findings
- "When a monopolist increases sales by one unit, it gains some marginal revenue from selling that extra unit, but also loses some marginal revenue because it must now sell every other unit at a lower price." — [OpenStax 9.2](https://openstax.org/books/principles-economics-3e/pages/9-2-how-a-profit-maximizing-monopoly-chooses-output-and-price)
- "A profit-maximizing monopoly should follow the rule of producing up to the quantity where marginal revenue is equal to marginal cost—that is, MR = MC." The monopolist then "will charge what the market is willing to pay. A dotted line drawn straight up from the profit-maximizing quantity to the demand curve shows the profit-maximizing price." — [OpenStax 9.2](https://openstax.org/books/principles-economics-3e/pages/9-2-how-a-profit-maximizing-monopoly-chooses-output-and-price)
- OpenStax's HealthPill table: at Q = 5, price $800, total revenue $4,000, MR $400 = MC $400, average cost $330, total profit $2,350. This is the profit-maximizing output. — [OpenStax 9.2](https://openstax.org/books/principles-economics-3e/pages/9-2-how-a-profit-maximizing-monopoly-chooses-output-and-price)
- **Krugman's own terms (publisher's AP module):**
  - Raising output has a **quantity effect**: one more unit is sold, which adds its price to revenue (e.g., +$500 for a diamond).
  - It also has a **price effect**: "If De Beers must reduce the price on all diamonds from $550 to $500, it loses 9 × $50 = $450 in revenue."
  - "Due to the price effect of an increase in output, the marginal revenue curve of a firm with market power always lies below its demand curve."
  - The quantity effect dominates at low output; the price effect dominates at high output.

  — [Krugman & Wells, AP Economics, Module 61 "The Monopolist's Demand Curve and Marginal Revenue" (publisher site)](http://digfir-published.macmillanusa.com/krugmanapecon2e/krugmanapecon2e_ch61_2.html) (search snippet; the page would not load for me)
- MRU's Monopoly unit includes "Maximizing Profit under Monopoly" and "The Monopoly Markup". The second video's URL indicates it covers the elasticity-based markup. — [MRU video-mapped syllabus](https://mru.org/teacher-resources/principles-microeconomics-syllabus)

### Inferences
#### Demand/revenue table: watch the two effects (own calculation; demand P = 100 − 2Q, quantity in steps of 5)
| Q | P | TR = P×Q | Quantity effect (+5 units × new P) | Price effect (price cut × old Q) | ΔTR | MR per unit (ΔTR/5) |
|---|---|---|---|---|---|---|
| 0 | 100 | 0 | – | – | – | – |
| 5 | 90 | 450 | +450 | 0 | +450 | 90 |
| 10 | 80 | 800 | +400 | −50 | +350 | 70 |
| 15 | 70 | 1,050 | +350 | −100 | +250 | 50 |
| 20 | 60 | 1,200 | +300 | −150 | +150 | 30 |
| 25 | 50 | 1,250 | +250 | −200 | +50 | 10 |
| 30 | 40 | 1,200 | +200 | −250 | −50 | −10 |
| 35 | 30 | 1,050 | +150 | −300 | −150 | −30 |
| 40 | 20 | 800 | +100 | −350 | −250 | −50 |
| 45 | 10 | 450 | +50 | −400 | −350 | −70 |
| 50 | 0 | 0 | 0 | −450 | −450 | −90 |

How to read it:
1. **MR < P in every row.** For example, between Q = 15 and 20 the price is 60, but MR is only 30.
2. **TR peaks at Q = 25.** That is where MR = 0, which is the unit-elastic midpoint of a linear demand curve.
3. **Beyond Q = 25, MR < 0.** The price effect outweighs the quantity effect, so selling more *reduces* revenue. That is the inelastic part of demand.
4. The interval-average MRs (90, 70, 50, …) equal the continuous MR = 100 − 4Q evaluated at each interval's midpoint (Q = 2.5, 7.5, …).

**Check with Krugman's diamond numbers** (demand falling $50 per diamond): TR at 9 diamonds is 9 × 550 = 4,950 and at 10 diamonds is 10 × 500 = 5,000. So MR of the 10th diamond = +50 = quantity effect (+500) + price effect (−450). (Own calculation; the input numbers come from the snippet above.)

#### The calculus version (the professor's "light calculus")
- **Total revenue:** TR(Q) = P(Q)·Q.
- **Marginal revenue (product rule):** MR(Q) = dTR/dQ = **P(Q)** + **Q·P′(Q)**.
  - The first term is the **quantity effect** (the price of the extra unit).
  - The second term is the **price effect**. It is negative because P′(Q) < 0.
- **Linear demand P = a − bQ:** TR = aQ − bQ², so **MR = a − 2bQ**.
  - MR has the same vertical intercept as demand and twice the slope.
  - MR hits zero at Q = a/(2b), half of demand's horizontal intercept a/b.
- **Elasticity form:** MR = P(1 + 1/E) = **P(1 − 1/|E|)**, where E = (dQ/dP)(P/Q) < 0.
  - Elastic demand (|E| > 1) → MR > 0.
  - Unit-elastic demand (|E| = 1) → MR = 0, and TR is at its maximum.
  - Inelastic demand (|E| < 1) → MR < 0.
- **Profit maximization:** π(Q) = TR(Q) − TC(Q).
  - First-order condition (FOC): **π′(Q) = MR(Q) − MC(Q) = 0**, so **MR = MC**.
  - Second-order condition (SOC): **π″(Q) = MR′(Q) − MC′(Q) < 0**. MC must cut MR from below. With linear demand and constant MC, π″ = −2b < 0, so the point is a maximum.
- **Markup rule (Lerner index):** from MR = MC, P(1 − 1/|E|) = MC, so **(P − MC)/P = 1/|E|**.
  - If MC > 0, then MR > 0, so **|E| > 1**: a profit-maximizing monopolist never operates on the inelastic part of demand.
  - If it were on the inelastic part, cutting output would *raise* TR and *lower* TC, so profit would rise.

#### Two-step recipe and graph in words (Figure 1; own construction, same numbers as Example A in Section 4)
**Axes:** price/cost ($) on the vertical axis, quantity on the horizontal axis.

**The curves:**
- **D (= average revenue):** a straight line from (0, 100) to (50, 0).
- **MR:** a straight line from (0, 100) to (25, 0), continuing below the axis. Same intercept, twice as steep.
- **MC = ATC:** a horizontal line at $20 (constant marginal cost, no fixed cost).

**Step 1: choose quantity.** MR crosses MC where 100 − 4Q = 20, so **Q_M = 20**.

**Step 2: read price off demand, not off MR or MC.** Go straight up from Q = 20 to D: **P_M = 100 − 2(20) = $60**. At Q_M, the vertical gap between D and MR (60 vs 20) is the gap between price and marginal cost: the monopoly markup.

**Areas:**
- **Profit rectangle:** (P_M − ATC) × Q_M = (60 − 20) × 20 = **800**. Corners: (0, 20), (20, 20), (20, 60), (0, 60).
- **Consumer surplus triangle:** under D and above P = 60, from Q = 0 to 20. Corners: (0, 100), (0, 60), (20, 60). Area **400**.
- **Deadweight loss triangle:** between D and MC, from Q = 20 to the competitive Q = 40. Corners: (20, 60), (20, 20), (40, 20). Area **400**.

### Gaps
- The Krugman diamond and quantity/price-effect statements come from a search snippet of the publisher's AP module page, which would not load. The numbers are consistent: they imply demand P = 1,000 − 50Q. Treat them as illustrative and check them against your own textbook.

---

## 4. Monopoly vs perfect competition: higher price, lower output, deadweight loss (fully worked example with calculus)

### Takeaway
Compared with a perfectly competitive industry with the same costs, a monopolist **produces less and charges more**. Part of the consumer surplus that consumers lose becomes **monopoly profit**. That part is a transfer. The rest is a **deadweight loss**: units worth more to buyers than they cost to make but never produced.

With linear demand and constant MC:
- The monopolist produces **half** the competitive output.
- Its price is the **average of the demand intercept and MC**.
- **DWL = monopoly CS = ½ × monopoly profit.**

### Cited Findings
- Under perfect competition firms produce where "P = MC", which is allocatively efficient. By contrast, "in the case of monopoly, price is always greater than marginal cost", so "consumers do not benefit from a monopoly because it will sell a lower quantity in the market, at a higher price." — [OpenStax 9.2](https://openstax.org/books/principles-economics-3e/pages/9-2-how-a-profit-maximizing-monopoly-chooses-output-and-price)
- Dynamic inefficiency: "a monopoly that does not need to fear competition can just produce the same old products in the same old way." — [OpenStax 9.2](https://openstax.org/books/principles-economics-3e/pages/9-2-how-a-profit-maximizing-monopoly-chooses-output-and-price)
- A Cornell ECON 101 answer key makes the same point:
  - A monopolist maximizes profit where MR = MC (here at Q = 20, MR = MC = $7) and charges the demand-curve price ($11).
  - It cannot charge a price such as $10 at that quantity "because that point doesn't lie on the demand curve".
  - In another item, a monopoly sets P = $9 where MR = MC = $5 at Q = 2, contrasted with the competitive outcome where price equals marginal cost.

  — [Cornell Econ 101, Answer Key Practice Exam 2](https://courses.cit.cornell.edu/econ101-dl/answer-key-practice-2.html) (my summary of the page)
- MRU's "The Costs and Benefits of Monopoly" video; its URL indicates a pharmaceutical-company example. — [MRU syllabus](https://mru.org/teacher-resources/principles-microeconomics-syllabus); [video](http://mruniversity.com/courses/principles-economics-microeconomics/costs-benefits-monopoly-pharmaceutical-companies)

### Inferences
#### Worked Example A (own calculation): P = 100 − 2Q, MC = ATC = $20, no fixed cost
**Step 1: revenue functions**
- TR = PQ = 100Q − 2Q².
- MR = dTR/dQ = 100 − 4Q.

**Step 2: monopoly quantity (MR = MC)**
- 100 − 4Q = 20, so **Q_M = 20**.
- SOC: d²π/dQ² = −4 < 0, so this is a maximum.

**Step 3: monopoly price (read off demand)**
- P_M = 100 − 2(20) = **$60**.

**Step 4: profit**
- π = (P − ATC) × Q = (60 − 20) × 20 = **$800**.

**Step 5: the perfectly competitive benchmark** (industry supply = MC at $20)
- P_C = MC = 20, so 20 = 100 − 2Q and **Q_C = 40**.

**Step 6: welfare comparison**

| | Perfect competition (P = MC) | Monopoly (MR = MC) | Change |
|---|---|---|---|
| Quantity | 40 | 20 | −20 (half) |
| Price | $20 | $60 | +$40 |
| Consumer surplus | ½ × 40 × (100 − 20) = **1,600** | ½ × 20 × (100 − 60) = **400** | −1,200 |
| Producer surplus / profit | 0 | **800** | +800 (transfer from consumers) |
| Total surplus | 1,600 | 1,200 | **−400 = DWL** |

**Reading the table:**
- Consumers lose 1,200. Of that, **800 goes to the monopolist** (the rectangle between P_C and P_M over the first 20 units). That is a redistribution, not a loss to society.
- The remaining **400 is the DWL** (the triangle between D and MC from Q = 20 to 40).
- DWL by formula: ½ × (Q_C − Q_M) × (P_M − MC) = ½ × 20 × 40 = **400**.

**Step 7: elasticity and markup checks**
- At (20, 60), E = (dQ/dP)(P/Q) = (−½)(60/20) = **−1.5**, which is elastic, as theory requires.
- Lerner index = (60 − 20)/60 = **2/3 = 1/|E|**.
- Quantity effect at Q = 20 is P = 60; price effect is Q·P′(Q) = 20 × (−2) = −40; so MR = 20 = MC.

**Step 8: the fixed-cost trap**
- Add a fixed cost of 300: TC = 300 + 20Q.
- Profit falls to **500**, but Q_M = 20 and P_M = 60 **do not change**. A fixed cost does not appear in MC or MR.
- Only if profit would turn negative in the long run would the firm reconsider whether to stay in the market at all.

#### General formulas for linear demand P = a − bQ and constant MC = c (own derivation; verified with a = 100, b = 2, c = 20)
| Item | Formula | Example A |
|---|---|---|
| Monopoly quantity | Q_M = (a − c)/(2b) | 20 |
| Monopoly price | P_M = (a + c)/2 | 60 |
| Competitive quantity | Q_C = (a − c)/b = 2Q_M | 40 |
| Monopoly profit | (a − c)²/(4b) | 800 |
| Monopoly CS | (a − c)²/(8b) | 400 |
| DWL | (a − c)²/(8b) | 400 |
| Competitive CS (= max total surplus) | (a − c)²/(2b) | 1,600 |

Use these formulas to check your answer; on the exam, show the MR = MC steps.

#### "Monopoly: The General Picture" (with a U-shaped ATC)
- The rule is the same: Q_M from MR = MC, P_M from demand.
- **Profit = (P_M − ATC at Q_M) × Q_M.** Use ATC at Q_M, not MC.
- A monopolist is **not guaranteed a profit**. If the demand curve lies below ATC at every quantity, it makes a loss. It keeps producing in the short run only if P ≥ AVC, and in the long run it would leave.
- A monopolist's profit can persist in the long run **only because of barriers to entry**. In perfect competition, entry would remove it.

#### Graph in words: monopoly vs competition (Figure 1 again, labelled for welfare)
- Label the area above P_M = 60 and under D (from 0 to 20) as **A**: monopoly consumer surplus = 400.
- Label the rectangle between 20 and 60 from Q = 0 to 20 as **B**: monopoly profit = 800. This area was consumer surplus under competition.
- Label the triangle between D and MC from Q = 20 to 40 as **C**: deadweight loss = 400.
- Under competition: CS = A + B + C = 1,600 and PS = 0.
- Under monopoly: CS = A, profit = B, and **C disappears**.

### Gaps
- Krugman's own numerical monopoly example (De Beers) could not be checked against the textbook. Everything above is my own construction.
- Empirical estimates of the economy-wide DWL from monopoly were not researched. They are not testable at this level.

---

## 5. Monopoly and public policy: preventing monopoly (antitrust), dealing with natural monopoly (public ownership, price regulation), and real cases

### Takeaway
Krugman's policy logic:
- **Prevent** monopoly where competition is possible, using antitrust policy: block mergers, stop exclusionary conduct, break up firms.
- **Live with** natural monopoly, because one firm is cheapest, but control it in one of two ways:
  - **public ownership**; or
  - **price regulation**, usually a ceiling where **P = ATC**. This raises output and cuts DWL without forcing losses.

Setting **P = MC** would be fully efficient, but it forces a natural monopoly to make losses (its ATC is above MC), so it would need a subsidy.

Recent cases show antitrust in action:
- U.S. v. Google: search remedies 2025; ad-tech remedies September 2026.
- The EU's €2.95 bn ad-tech fine (2025).
- FTC v. Meta: lost in 2025 because the market was defined to include TikTok and YouTube.

### Cited Findings
**Natural monopoly regulation (OpenStax 11.3)**
- OpenStax's figure compares four regulatory choices:
  - Unregulated: MR = MC, Q = 4, P = 9.3, with profits.
  - Splitting the firm, which gives "higher average costs".
  - Marginal-cost pricing: "output of 8 and charge the price of 3.5". But the "price is below the average cost of production, which is 5.7, so...the firm will be suffering losses". This needs an "ongoing public subsidy".
  - Average-cost pricing: "output of 6 and a price of 6.5", where the firm covers its costs.

  — [OpenStax 11.3](https://openstax.org/books/principles-economics-3e/pages/11-3-regulating-natural-monopolies)
- Cost-plus regulation gives producers "less reason to be concerned with high costs—because they can just pass them along". Price-cap regulation "will not work if the price regulators set the price cap unrealistically low". — [OpenStax 11.3](https://openstax.org/books/principles-economics-3e/pages/11-3-regulating-natural-monopolies)
- Legal monopolies, where the government blocks competition, are often regulated utilities. — [OpenStax 9.1](https://openstax.org/books/principles-economics-3e/pages/9-1-how-monopolies-form-barriers-to-entry)

**U.S. v. Google: search (liability 2024, remedies 2025, appeals 2026)**
- The court found in August 2024 that Google monopolized general search in violation of Section 2 of the Sherman Act.
- Remedies announced by the DoJ on 2 Sep 2025:
  - Google "will be barred from entering or maintaining exclusive contracts relating to the distribution of Google Search, Chrome, Google Assistant, and the Gemini app".
  - It must "make certain search index and user-interaction data available to certain competitors".
  - It must "offer certain competitors search and search text ads syndication services".

  — [DoJ, 2 Sep 2025](https://www.justice.gov/opa/pr/department-justice-wins-significant-remedies-against-google)
- Judge Mehta declined to order divestiture of Chrome or Android. — [Courthouse News](https://www.courthousenews.com/federal-judge-passes-on-major-breakup-of-google-internet-search/); [Hughes Hubbard](https://www.hugheshubbard.com/news-insights/insights/court-issues-remedies-ruling-in-united-states-v-google-search-case) (search snippets)
- Appeals:
  - Final judgment was entered in December 2025, and Google appealed in January 2026. — [CNBC, 16 Jan 2026](https://www.cnbc.com/2026/01/16/google-files-to-appeal-search-monopoly-case.html); [Alphabet Form 10-Q (Q2 2026)](https://www.sec.gov/Archives/edgar/data/0001652044/000165204426000071/goog-20260630.htm) (search snippets)
  - The DoJ and states cross-appealed in February 2026, seeking stronger remedies. — [Search Engine Land](https://searchengineland.com/doj-states-appeal-google-search-antitrust-remedies-ruling-468230); [Courthouse News](https://www.courthousenews.com/doj-urges-dc-circuit-to-beef-up-remedies-in-google-monopoly-ruling/) (search snippets)

**U.S. v. Google: ad tech (remedies 16 Sep 2026)**
- The Eastern District of Virginia ordered "significant behavioral relief, including requiring close integration between Google's products and products offered by rivals, including the open-source solutions offered by Prebid".
- Other remedies: data export rights for publishers; a rule that AdWords may not bid preferentially into AdX; and a monitor for six years.
- The court held that "remedies can include conditions on products beyond the monopolized product markets."

  — [DoJ, 16 Sep 2026](https://www.justice.gov/opa/pr/department-justice-again-wins-substantial-relief-against-google)

**EU: Google ad tech (5 Sep 2025)**
- The European Commission fined Google **€2.95 billion** for abusing a dominant position in advertising technology by favouring its own exchange, AdX.
- It ordered Google to end the self-preferencing and indicated that structural remedies (divestiture) may be needed.

  — [Euronews, 5 Sep 2025](https://euronews.com/my-europe/2025/09/05/eu-commission-hits-google-with-hefty-295-billion-fine); [Axios](https://www.axios.com/2025/09/05/google-eu-fine-ad-tech-antitrust) (search snippets)

**FTC v. Meta: market definition decides the case (18 Nov 2025)**
- Judge Boasberg ruled that "Meta holds no monopoly in the relevant market".
- He rejected the FTC's narrow "personal social networking" market (Facebook, Instagram, Snapchat, MeWe) because **TikTok and YouTube** are significant rivals.
- The FTC has appealed.

  — [CNN, 18 Nov 2025](https://www.cnn.com/2025/11/18/tech/meta-antitrust-suit-decision-not-monopoly); [Skadden](https://www.skadden.com/insights/publications/2025/11/ftc-loses-retroactive-merger-challenge); [Gulf News](https://gulfnews.com/technology/monopoly-case-us-regulator-appeals-metas-court-victory-1.500415249) (search snippets; CNN blocked direct access)

**Uzbekistan's competition law**
- The Law "On Competition" No. 850 was adopted **3 July 2023** and entered into force **4 October 2023**.
- It lowers the market-share threshold for a **dominant position** to **more than 40%** (from 50%).
- Firms with last-year revenue below **30,000 BCV (about 9.9 billion soums)** are not considered dominant.

  — [GRATA International summary](https://gratanet.com/news/uzbekistan-adopts-new-competition-law)
- The competition authority is the **Committee for the Development of Competition and Protection of Consumer Rights**. — [Uzvagontamir summary of the Committee's 2023 activities](https://uzvagontamir.uz/en/2024/12/10/activities-of-the-committee-for-the-development-of-competition-and-protection-of-consumer-rights-for-2023/) (title seen in search results)

### Inferences
#### Worked Example B (own calculation): regulating a natural monopoly
**Setup**
- Demand: P = 100 − Q.
- Costs: TC = 700 + 20Q, so **MC = 20** (constant) and **ATC = 20 + 700/Q**.
- ATC falls over the whole range: a big fixed cost is spread over more units. One firm is cheapest, so this is a **natural monopoly**.

| Regime | Rule | Q | P | ATC at Q | Profit | DWL |
|---|---|---|---|---|---|---|
| Unregulated monopoly | MR = MC: 100 − 2Q = 20 | **40** | **60** | 37.50 | (60 − 37.5) × 40 = **+900** | ½ × 40 × 40 = **800** |
| Price regulation at **P = ATC** (usual Krugman/OpenStax answer) | 100 − Q = 20 + 700/Q, so Q² − 80Q + 700 = 0, so Q = 70 (the larger root) | **70** | **30** | 30 | **0** (normal profit) | ½ × 10 × 10 = **50** |
| Marginal-cost pricing | P = MC = 20 | **80** | **20** | 28.75 | **−700** (= the fixed cost; needs a subsidy) | **0** |

**Checks**
- Maximum total surplus net of the fixed cost: ½ × 80 × 80 − 700 = **2,500**.
- Unregulated: CS (800) + profit (900) = 1,700 = 2,500 − DWL 800.
- ATC pricing: CS (2,450) + 0 = 2,450 = 2,500 − DWL 50.

**Why splitting this firm in two is a bad idea**
- Two firms each producing 35 units would each have ATC = 20 + 700/35 = **$40**, above the regulated $30.
- Producing 70 units costs 2,100 for one firm but 2,800 for two: the fixed cost is duplicated.
- This is OpenStax's "higher average costs" point.

**Graph in words (Figure 2)**
- D runs from (0, 100) to (100, 0). MR runs from (0, 100) to (50, 0).
- MC is flat at 20. ATC is a downward-sloping curve that approaches 20 from above.
- ATC crosses D twice, at (10, 90) and at **(70, 30)**.
- Unregulated point: MR = MC at Q = 40, price 60 read off D.
- Regulators impose a **price ceiling of $30** at the right-hand crossing. The firm's demand becomes flat at 30 up to Q = 70, so the firm produces 70.
- The remaining DWL is the small triangle between D and MC from Q = 70 to 80.

#### Policy menu (own synthesis of the Krugman Ch. 8 headings plus OpenStax 11.3)
| Problem | Tool | Pros | Cons / exam caveat |
|---|---|---|---|
| Monopoly that **could** be competitive | **Antitrust**: block mergers, ban exclusive deals, break up firms | Restores competition: Q up, P down | Slow; outcome depends on market definition (Meta) |
| **Natural monopoly** | **Public ownership** (state utility) | Can price at or near MC or ATC | Weak cost discipline; political pricing |
| **Natural monopoly** | **Price regulation** at P = ATC (cost-plus or price cap) | Q up, P down, DWL much smaller, no subsidy | Cost-plus → no reason to cut costs; price cap set too low → losses or quality cuts |
| **Natural monopoly** | P = MC with subsidy | Efficient Q | Loss = fixed cost; taxpayers pay |
| Any monopoly | Do nothing | Avoids regulatory failure; innovation rents (patents) | Keeps the DWL |

#### Why it matters in Uzbekistan
Uzbekistan's 2023 competition law moved the dominance threshold to more than 40% market share. The IMF recommends removing exclusive rights and activating sector regulators (Section 2). In Krugman's terms, both are attacks on **government-created barriers** and attempts to regulate **natural monopolies** properly.

### Gaps
- Several case facts (Chrome divestiture refused, appeal dates, EU fine details, Meta quotes) come from search snippets because the news sites blocked direct access. The DoJ press releases (Sep 2025 and Sep 2026) were read directly.
- I did not open the official text of Uzbekistan's law on lex.uz. The 40% threshold and the 30,000 BCV figure come from a law-firm summary.
- I did not find a reliable source for current regulated utility tariffs in Uzbekistan to use as a local natural-monopoly example.

---

## 6. Price discrimination: perfect and imperfect, conditions, airline tickets, student discounts, and the welfare effects

### Takeaway
A **single-price monopolist** charges everyone the same price. A **price-discriminating** monopolist charges different prices to different buyers for the same good, where the difference is not due to cost. It works only if three conditions hold:
1. The firm has **market power**.
2. It can **sort buyers by willingness to pay** (or price elasticity).
3. It can **stop resale**.

The less elastic group (business travellers, non-students) pays more.

Under **perfect price discrimination** each buyer pays exactly their willingness to pay. Then MR = P (no price effect), output is the **efficient (competitive) quantity**, DWL = 0, and **consumer surplus = 0**: the firm captures all surplus.

Real-world price discrimination is imperfect. Firms use:
- advance-purchase rules, Saturday-night stays, and solo-vs-pair fares;
- student IDs (Spotify Student at $6.99 vs Individual at $12.99 in the U.S.);
- volume discounts;
- increasingly, personal data ("surveillance pricing").

### Cited Findings
**Krugman's own example and techniques**
- Krugman's price-discrimination example: an airline flying between **Bismarck and Ft. Lauderdale** carries business travellers willing to pay **$550** and students willing to pay **$150**.
- Disguises (a business traveller claiming to be a student) make perfect price discrimination impossible in practice.
- Firms move toward it with **advance purchase restrictions** and **volume discounts**.

  — [Krugman & Wells, *Microeconomics in Modules* 3e update, "Perfect Price Discrimination" (publisher site)](http://digfir-published.macmillanusa.com/krugmanwellsmodulesmicro3eupdate/krugmanwellsmodulesmicro3eupdate_ch13_19.html) (search snippet)

**Solo vs paired airline fares (2025)**
- An *Economist* report (July 2025) found that U.S. airlines charged **solo travellers** higher per-person round-trip fares than two people travelling together, **only for weekday returns**. With Saturday returns there was no difference.
- The explanation: solo travellers are "more likely than someone flying in a group of two or more people to be a business traveler", and business travellers have "lower price elasticity of demand".

  — [Hubbard & O'Brien, "Why do U.S. airlines charge solo travelers higher ticket prices?" (24 Jul 2025)](https://hubbardobrieneconomics.com/2025/07/24/solved-problem-why-do-u-s-airlines-charge-solo-travelers-higher-ticket-prices/)

**Student discounts (Spotify, U.S., Oct 2026)**
- Spotify Premium (U.S.) prices: Individual **$12.99/month**, **Student $6.99/month**, Duo $18.99, Family $21.99.
- The Student plan requires being at "an eligible accredited higher education institution" and verification.

  — [Spotify Premium (US)](https://www.spotify.com/us/premium/) (page accessed 19 Oct 2026; prices vary by country)

**Surveillance pricing (FTC, 2025)**
- The FTC's study (17 Jan 2025) found that "details like a person's precise location or browser history can be frequently used to target individual consumers with different prices".
- Behaviours from "mouse movements on a webpage to the type of products that consumers leave unpurchased in an online shopping cart" are tracked.
- Six intermediaries (Mastercard, Accenture, PROS, Bloomreach, Revionics, McKinsey) worked with "at least 250 clients".
- The FTC's example: "a consumer who is profiled as a new parent may intentionally be shown higher priced baby thermometers".

  — [FTC press release, 17 Jan 2025](https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-surveillance-pricing-study-indicates-wide-range-personal-data-used-set-individualized-consumer)

**Delta and AI pricing (2025)**
- Senators Gallego, Warner and Blumenthal warned that Delta's planned AI pricing could mean fares rising "up to each individual consumer's personal 'pain point'".
- Delta had said it would use AI revenue-management technology (with Fetcherr) across 20% of its domestic network by the end of 2025.
- Delta replied: "There is no fare product Delta has ever used, is testing or plans to use that targets customers with individualized prices based on personal data."

  — [NBC News](https://www.nbcnews.com/business/travel/delta-air-lines-assures-us-lawmakers-will-not-personalize-fares-using-rcna222579); [Yahoo Finance/Reuters](https://finance.yahoo.com/news/us-senators-raise-alarm-delta-213141457.html) (quotes from search snippets)

**Teaching resources**
- MRU's Price Discrimination unit includes "Introduction to Price Discrimination" (its URL indicates airline examples and arbitrage), "The Social Welfare of Price Discrimination", "Tying" and "Bundling". — [MRU syllabus](https://mru.org/teacher-resources/principles-microeconomics-syllabus)

### Inferences
#### Conditions checklist, and how real firms meet each one (own synthesis)
| Condition | Why it is needed | Airline | Student discount |
|---|---|---|---|
| **Market power** | A price taker can't set different prices | Few carriers on a route | Differentiated product (Spotify's catalogue and app) |
| **Sort buyers by WTP or elasticity** | Each group must get its own price | Advance purchase, Saturday-night stay, solo vs pair, refundable fares | Student ID or verification (the less elastic, non-student group pays full price) |
| **Prevent resale (arbitrage)** | Otherwise low-price buyers resell to high-price buyers | Name on the ticket | Personal account, re-verification |

#### Worked Example C1 (own calculation; Krugman-style, my numbers): one flight, two groups
**Setup**
- 100 business travellers are each willing to pay $500.
- 150 students are each willing to pay $150.
- Marginal cost is $100 per passenger. Ignore capacity limits.

| Pricing strategy | Who flies | Profit |
|---|---|---|
| Single price $500 | 100 business | 100 × (500 − 100) = **40,000** |
| Single price $150 | all 250 | 250 × (150 − 100) = **12,500** |
| **Price discrimination**: $500 for business, $150 for students | all 250 | 40,000 + 150 × 50 = **47,500** |

**Reading the results**
- A single-price monopolist chooses $500, and the students do not fly. That loses 150 × (150 − 100) = **7,500** of potential surplus: a deadweight loss.
- With discrimination, output rises from 100 to 250 and the DWL disappears.
- Here this is also perfect price discrimination: each group pays exactly its WTP, so CS = 0.

#### Worked Example C2 (own calculation; calculus, third-degree price discrimination)
**Setup**
- Business market: P₁ = 200 − Q₁.
- Student market: P₂ = 80 − Q₂.
- MC = 20.

**Rule:** set **MR in each market = MC**.

| Market | MR = MC | Q | P | Elasticity at the optimum | Profit |
|---|---|---|---|---|---|
| Business | 200 − 2Q₁ = 20 | 90 | **110** | −110/90 = **−1.22** (less elastic) | 90 × 90 = 8,100 |
| Students | 80 − 2Q₂ = 20 | 30 | **50** | −50/30 = **−1.67** (more elastic) | 30 × 30 = 900 |
| Total | | 120 | | | **9,000** |

**Comparison with a single price**
- With one price, the best choice is **P = 110**, serving only business travellers: Q = 90, profit = 8,100. Students are priced out.
- Discrimination raises profit by 900 and output by 30. The lower price goes to the **more elastic** group.
- This is the same logic as the markup rule (P − MC)/P = 1/|E| applied market by market.

#### Worked Example C3 (own calculation): perfect price discrimination with Example A's demand (P = 100 − 2Q, MC = 20)
- The firm sells every unit at that buyer's WTP. Selling one more unit no longer lowers the price on earlier units, so the **price effect vanishes and MR = P** (the demand curve).
- MR = MC therefore becomes P = MC, so **Q = 40**, the competitive quantity.
- Profit = whole triangle under D above MC = ½ × 40 × 80 = **1,600**. **CS = 0. DWL = 0.**
- Compared with single-price monopoly (Q = 20, profit 800, CS 400, DWL 400): output doubles, DWL vanishes, and consumers lose all their surplus.
- So perfect price discrimination is **efficient but not equitable**.

**Graph in words (Figure 3):** the same D and MC as Figure 1. The firm moves down the demand curve, charging each buyer their reservation price, until D meets MC at Q = 40. The **entire area between D and MC** (from 0 to 40) is profit. There is no CS triangle and no DWL triangle.

#### Welfare summary (exam answer)
- **Perfect price discrimination:** efficient output; all surplus goes to the producer.
- **Imperfect price discrimination:** ambiguous.
  - It **raises welfare** when it lets the firm serve groups that a single price would exclude (students in C1 and C2).
  - It can **lower welfare** when it only reallocates a fixed output between groups (see Practice Q12's optional note).
- Krugman's "Sales, Factory Outlets, and Ghost Cities" EiA title suggests everyday versions: sales and outlets sort price-sensitive shoppers from others (an inference from the title; content not seen).

#### Dynamic pricing vs personalized pricing (2025–26 debate)
- Prices that change with **time or demand** (yield management) are not the same thing as prices set from **your personal data**. The second is a move toward **first-degree** discrimination.
- Delta's denial explicitly draws this line.
- The FTC study documents data-driven individual targeting by pricing intermediaries.

### Gaps
- Krugman's own airline example appears in my notes only through a search snippet of the publisher's module page. I did not verify the group sizes or marginal cost Krugman uses, so my example uses its own numbers.
- The *Economist* solo-traveller report was read through a textbook author's blog summary, not the original article. Which airlines and fares were involved was not given.
- Delta quotes come from search snippets of NBC/Reuters coverage. A Fortune report (24 Aug 2026) says the FTC moved to require retailers to disclose personalized pricing; I saw only its headline and did not verify it ([Fortune](https://fortune.com/2026/08/24/ftc-retailers-personalized-pricing-consumer-surveillance/)).
- Spotify prices are U.S. prices. Uzbekistan prices or availability were not checked.

---

## 7. Oligopoly: interdependence, collusion and cartels (OPEC), the prisoners' dilemma, Nash equilibrium and dominant strategies, tit for tat and tacit collusion, price wars, why cartels break down, antitrust

### Takeaway
In an oligopoly, each firm's profit depends on its rivals' choices (**interdependence**), so the analysis uses **game theory**. Firms jointly do best by **colluding** to act like a monopolist, through a **cartel** or **tacit collusion**. But each firm individually gains by cheating, by producing more or undercutting the price. This is a **prisoners' dilemma**:
- cheating is a **dominant strategy**;
- the **Nash equilibrium** is (cheat, cheat);
- both firms then earn less than under collusion.

Repetition (tit for tat) can sustain **tacit collusion**. It breaks down when:
- there are many members or their costs and capacities differ (UAE's exit from OPEC/OPEC+ on 1 May 2026; Kazakhstan's persistent over-quota output);
- demand shocks hit (the March 2020 Saudi–Russia price war);
- antitrust and leniency programmes reward the first confessor (Virgin Atlantic in the BA fuel-surcharge case).

### Cited Findings
**Definitions and examples (OpenStax)**
- "When firms act together in this way to reduce output and keep prices high, it is called collusion." "A group of firms that have a formal agreement to collude to produce the monopoly output and sell at the monopoly price is called a cartel." — [OpenStax 10.2](https://openstax.org/books/principles-economics-3e/pages/10-2-oligopoly)
- OPEC: "Certain international organizations, like the nations that are members of the Organization of Petroleum Exporting Countries (OPEC), have signed international agreements to act like a monopoly, hold down output, and keep prices high." Such agreements "fall in a gray area of international law" and "are not legally enforceable". — [OpenStax 10.2](https://openstax.org/books/principles-economics-3e/pages/10-2-oligopoly)
- Collusion is illegal: "In the United States, as well as many other countries, it is illegal for firms to collude since collusion is anti-competitive behavior, which is a violation of antitrust law." — [OpenStax 10.2](https://openstax.org/books/principles-economics-3e/pages/10-2-oligopoly)

**Cartel cases (OpenStax)**
- **Lysine:** a "$600 million-a-year" industry. ADM and "several other large European and Japanese firms" colluded, and "the price of lysine doubled while the cartel was in effect". ADM "pled guilty in 1996 and paid a fine of $100 million". Executives were "sentenced to 24–30 months in prison".
- **French detergents:** Colgate-Palmolive, Henkel and Procter & Gamble were "fined a total of €361 million ($484 million)".

  — [OpenStax 10.2](https://openstax.org/books/principles-economics-3e/pages/10-2-oligopoly)

**Prisoners' dilemma: OpenStax's two matrices**

*Prisoners (years in jail):*
- Both silent: 2 years each.
- One confesses, the other stays silent: 1 year for the confessor, 8 for the other.
- Both confess: 5 years each.
- "To confess is called the dominant strategy. It is the strategy an individual (or firm) will pursue regardless of the other individual's (or firm's) decision."

*Firms (profits):*
- Both hold down output: $1,000 each.
- One increases output: $1,500 for it, $200 for the other.
- Both increase output: $400 each.

— [OpenStax 10.2](https://openstax.org/books/principles-economics-3e/pages/10-2-oligopoly)

**Game theory (Stanford Encyclopedia of Philosophy)**
- "whatever the other does, each is better off confessing than remaining silent. But the outcome obtained when both confess is worse for each than the outcome they would have obtained had both remained silent." Mutual defection is "the game's only strict Nash equilibrium".
- Nash equilibrium: an outcome where "neither player could improve its position by unilaterally changing its move".
- With a known, **finite** number of rounds, backward induction leads to defection in every round. With **indefinite** repetition, cooperative equilibria become possible.
- **Tit for Tat**, submitted by Anatol Rapoport, won Robert Axelrod's computer tournaments. Its properties are summarized as "nice, retaliatory, forgiving, clear".

  — [SEP, "Prisoner's Dilemma"](https://plato.stanford.edu/entries/prisoner-dilemma/)

**Krugman's structure for this material**
- Krugman's Ch. 9 sections are *The Prisoners' Dilemma* and *Repeated Interaction and Tacit Collusion*, followed by the EiA "The Rise and Fall and Rise of OPEC". The Part 4 business case is "Virgin Atlantic Blows the Whistle . . . or Blows It?" — [Macmillan 4e TOC](https://prod-cat-files.macmillan.cloud/CMS/SampleChapters/NDP000DKG/1416_Krugman%20Essentials%20of%20Economics%204e%20-%20Preface%20and%20TOC.pdf)

**OPEC/OPEC+ in 2026**
- **UAE exit:** the UAE announced on **28 April 2026** that it would leave OPEC and OPEC+, effective **1 May 2026**, after membership since 1967.
  - Its capacity is "approximately 4.8 million barrels per day".
  - Analysts cite tension between maximizing output and respecting quotas, and friction with Saudi Arabia.
  - Earlier exits (Indonesia, Qatar, Ecuador, Angola, Gabon) were "mainly due to disagreements over output quotas".
  - Al Jazeera puts OPEC at about 30% and OPEC+ at about 41% of global oil supply.

  — [Al Jazeera, 28 Apr 2026](https://www.aljazeera.com/news/2026/4/28/what-are-opec-and-opec-and-why-has-the-uae-quit); see also [WAM (UAE state news agency)](https://www.wam.ae/en/article/bzxzuh7-uae-announces-decision-exit-opec-opec+) (search snippet)
- **Quotas after the exit:**
  - Seven core OPEC+ members (Saudi Arabia, Russia, Iraq, Kuwait, Kazakhstan, Algeria, Oman) kept output unchanged for **October 2026**. They had completed the phased rollback of the **1.65 million b/d** cuts agreed in 2023.
  - An ongoing Iran war is disrupting flows through the Strait of Hormuz. Analyst Jorge Leon: "OPEC+ currently has very limited power over the physical oil market".

  — [Energy Connects, Sep 2026](https://www.energyconnects.com/news/oil/2026/september/opecplus-keeps-output-policy-unchanged-for-october)
  - The group also kept **November 2026** targets steady. — [CNBC, 4 Oct 2026](https://www.cnbc.com/2026/10/04/opec-agrees-to-keep-november-oil-output-targets-steady.html); [Bloomberg](https://www.bloomberg.com/news/articles/2026-10-04/opec-has-deal-outline-for-steady-november-quotas-delegates-say) (headlines/search snippets)

**Kazakhstan: over-quota production**
- Kazakhstan exceeded its OPEC+ quota by about **332,000 b/d in March 2025**. — [Caspian Post citing S&P Global](https://caspianpost.com/kazakhstan/kazakhstan-exceeds-opec-quota-by-332-000-bpd-in-march-says-s-p) (search snippet)
- Kazakhstan said its output levels are decided "by national interest, not OPEC+". — [Reuters exclusive via MarketScreener](https://www.marketscreener.com/news/latest/Exclusive-Kazakhstan-says-oil-output-levels-decided-by-national-interest-not-OPEC-49689027/) (headline)

**The 2020 Saudi–Russia price war**
- Timeline:
  - **5 Mar 2020:** OPEC agreed an extra **1.5 million b/d** cut and asked Russia to join.
  - **6 Mar:** Russia refused, and prices fell 10%.
  - **8 Mar:** Saudi Arabia announced discounts of **$6–8 per barrel**.
  - **10 Mar:** Saudi Arabia said it would raise output from **9.7 to 12.3 million b/d**.
  - **20 Apr:** the May WTI futures price went **below zero**.
  - **April 2020:** OPEC+ agreed a cut of roughly **10 million b/d**, ending the war.
- The paper frames the episode as a fight to defend market share, including against U.S. shale producers.

  — [PMC, "The Russia–Saudi Arabia oil price war during the COVID-19 pandemic"](https://pmc.ncbi.nlm.nih.gov/articles/PMC8652835/)
- Oil fell about 24% on 9 March 2020, the worst day since 1991. — [CNBC, 8–9 Mar 2020](https://www.cnbc.com/2020/03/08/oil-plummets-30percent-as-opec-deal-failure-sparks-price-war-fears.html); [S&P Global](https://www.spglobal.com/en/research-insights/market-insights/oil-prices-plunge-in-response-to-the-collapse-of-the-opec-alliance) (headlines/snippets)

**Leniency: the BA fuel-surcharge cartel**
- British Airways and Korean Air each agreed to plead guilty and pay **$300 million** criminal fines (**$600 million** total) for fixing passenger and cargo prices. — [DoJ, 1 Aug 2007](https://www.justice.gov/archive/opa/pr/2007/August/07_at_569.html) (title/snippet)
- BA was also fined by the UK Office of Fair Trading, for a total of about **$546 million**.
  - BA and Virgin Atlantic colluded on fuel surcharges from **August 2004 to January 2006**. Surcharges rose from about £5 to about £60 per long-haul round trip.
  - Virgin, which reported the cartel, escaped a fine under the **leniency** policy.

  — [CBS News](https://www.cbsnews.com/news/british-airways-fined-546m-for-collusion/); [Al Jazeera, 1 Aug 2007](https://www.aljazeera.com/news/2007/8/1/ba-hit-with-largest-ever-fine) (snippets)

**Measuring concentration (HHI)**
- The 2023 U.S. Merger Guidelines treat markets with an **HHI above 1,800** as **highly concentrated** (down from 2,500).
- A merger is presumed illegal if the post-merger HHI exceeds 1,800 and the HHI rises by more than 100. It is also presumed illegal if it creates a firm with more than 30% share and a rise of more than 100.

  — [Hall Render](https://hallrender.com/2023/12/27/ftc-and-doj-release-finalized-merger-guidelines/); [Paul, Weiss](https://www.paulweiss.com/insights/client-memos/doj-and-ftc-issue-final-2023-merger-guidelines) (search snippets)

**Khan Academy coverage**
- Khan Academy's AP Microeconomics oligopoly unit covers "Oligopolies, duopolies, collusion, and cartels", "Prisoners' dilemma and Nash equilibrium", "Why parties to cartels cheat" and "Game theory of cheating firms", with practice exercises. — [Khan Academy](https://www.khanacademy.org/economics-finance-domain/ap-microeconomics/imperfect-competition/oligopoly-and-game-theory/v/game-theory-of-cheating-firms)

### Inferences
#### Krugman vocabulary (my paraphrases; check the glossary in your edition)
- **Oligopoly:** an industry with only a few sellers. **Duopoly:** two sellers.
- **Imperfect competition:** firms are not price takers, but no single firm is a monopolist.
- **Interdependence:** each firm's profit depends on the others' actions.
- **Collusion:** firms cooperate to raise their joint profits. **Cartel:** a formal agreement to restrict output.
- **Noncooperative behavior:** each firm ignores the effect of its actions on rivals' profits.
- **Payoff matrix:** shows each player's payoff for every combination of strategies.
- **Dominant strategy:** a player's best action whatever the other does.
- **Nash (noncooperative) equilibrium:** each player's action is the best response to the others' actions.
- **Strategic behavior:** choosing actions to influence rivals' future actions.
- **Tit for tat:** cooperate in the first round, then copy the rival's previous move.
- **Tacit collusion:** restraint without a formal agreement.
- **Price war:** tacit collusion collapses and prices fall, possibly toward the competitive level.
- **Antitrust policy:** government efforts to stop oligopolies behaving like monopolies.
- **Price leadership:** one firm sets its price and the others follow.
- **Nonprice competition:** competing through advertising and product features instead of price.

#### Worked Example D (own calculation): a duopoly derived from demand
**Setup:** market demand **P = 130 − Q**, two identical firms, **MC = 10**, no fixed cost.

**Three benchmarks**

| Outcome | Rule | Total Q | P | Profit per firm |
|---|---|---|---|---|
| Competitive | P = MC | 120 | 10 | 0 |
| **Collusion / cartel** (joint monopoly) | MR = 130 − 2Q = 10 | 60 (30 each) | 70 | **1,800** (joint 3,600) |
| **Noncooperative** (both produce 40) | each best-responds | 80 | 50 | **1,600** |

**The cheating temptation**
- Suppose A produces 40 while B sticks to 30.
- Then Q = 70 and P = 60.
- A earns 50 × 40 = **2,000**; B earns 50 × 30 = **1,500**.

**Payoff matrix** (A's profit first, then B's)

| | **B produces 30 (comply)** | **B produces 40 (cheat)** |
|---|---|---|
| **A produces 30 (comply)** | 1,800 ; 1,800 | 1,500 ; 2,000 |
| **A produces 40 (cheat)** | 2,000 ; 1,500 | **1,600 ; 1,600** |

**Solving the game (underline method)**
1. **A's best response.**
   - If B complies: 2,000 (cheat) > 1,800 (comply).
   - If B cheats: 1,600 (cheat) > 1,500 (comply).
   - Cheating is A's **dominant strategy**. B's is the same by symmetry.
2. **Nash equilibrium:** (40, 40), with 1,600 each. Neither firm can gain by changing alone: switching to 30 gives 1,500 < 1,600.
3. **Collusive outcome:** (30, 30), with 1,800 each. It is better for **both firms**, but it is **not** an equilibrium, because each firm wants to deviate.
4. **This is the prisoners' dilemma.** Individually rational choices produce a collectively worse result for the firms.
5. **Consumers benefit when collusion fails.** The price falls from 70 to 50.
6. **Oligopoly lies between monopoly and competition.** The equilibrium price (50) is between the monopoly price (70) and the competitive price (10).
7. **Optional, beyond Krugman.** (40, 40) is exactly the Cournot equilibrium: each firm's best response to a rival's 40 is (120 − 40)/2 = 40. If the 2×2 restriction were removed, the best response to a rival's 30 would be 45 units, giving a profit of 2,025.

#### Repeated interaction and tit for tat (own calculation with Example D's numbers)
- Cheating once yields **+200** (2,000 instead of 1,800).
- Under tit for tat the rival cheats next period. If both end up at (40, 40), each firm loses **200 every period** after that (1,600 instead of 1,800).
- A **one-time gain** against a **permanent loss** means firms that expect to interact indefinitely and care about the future rationally keep to **tacit collusion**.
- **Optional formal condition (grim trigger):** cooperation is sustainable if 1,800/(1 − δ) ≥ 2,000 + δ·1,600/(1 − δ), which simplifies to **δ ≥ 0.5**, where δ is the per-period discount factor.
- With a known final period, backward induction unravels cooperation (SEP).

#### Why cartels break down (exam list, mapped to cases)
| Reason | Mechanism | Case |
|---|---|---|
| **Incentive to cheat** | At the cartel price, each member's own MR exceeds MC, so it wants more output | Kazakhstan over quota by about 332,000 b/d (March 2025) |
| **Different capacities and costs** | Members with big spare capacity resent quotas | UAE (about 4.8 million b/d capacity) left OPEC/OPEC+ on 1 May 2026 |
| **Demand shocks** | Disagreement over who cuts; a fight for market share | March 2020: Russia refused cuts, then Saudi discounts and a price war |
| **Entry by outsiders** | Non-members grab share at high prices | U.S. shale in the 2020 episode (PMC) |
| **Hard to detect cheating** | Secret discounts; tit for tat needs observable moves | General; easier to collude where prices are public |
| **Antitrust plus leniency** | The first to confess avoids the fine, a prisoners' dilemma imposed by the state | Virgin Atlantic reported the cartel; BA paid about $546 million in total fines |
| **Physical shocks** | Quotas stop binding when supply is physically constrained | The 2026 Iran war and Hormuz disruption ("very limited power" for OPEC+) |

#### Factors that make tacit collusion more likely (exam list; my synthesis)
- Few firms.
- Similar costs.
- Repeated, frequent interaction.
- Prices that are easy to observe.
- Stable demand.
- High entry barriers.
- Weak antitrust enforcement.

The opposite of each makes collusion less likely.

#### HHI mini-example (own calculation; only if your professor covers concentration measures)
- Shares 40%, 30%, 20%, 10%: HHI = 40² + 30² + 20² + 10² = 1,600 + 900 + 400 + 100 = **3,000**. That is highly concentrated (above 1,800).
- If the 20% and 10% firms merge, the shares become 40, 30, 30: HHI = **3,400**, a change of **+400** (= 2 × 20 × 10).
- That exceeds the 100-point change threshold, so under the 2023 Guidelines the merger is presumptively illegal.

#### Note on the kinked demand curve
OpenStax discusses a kinked demand curve. I did not find it in the Krugman *Essentials* headings. Treat it as optional unless your professor teaches it.

### Gaps
- Several 2026 OPEC+ facts (November decision) and the BA/Virgin details come from headlines or search snippets, because CNBC and others blocked direct access. The September 2026 decision and the UAE exit were read directly (Energy Connects; Al Jazeera).
- Another search snippet put Kazakhstan's March 2025 output at about 1.79 million b/d against a target near 1.468 million (a gap of about 322,000 b/d, not 332,000). The difference may reflect compensation-adjusted targets. I report only the S&P figure.
- Axelrod's tournament years and entry counts are not given in the SEP excerpt I saw, so they are omitted.
- I did not verify the content of Krugman's "Bitter Chocolate?" or "Caught in the Act" stories. Only their titles are known.
- Whether the 2023 U.S. Merger Guidelines remain in force unchanged in late 2026 was not checked.

---

## 8. Monopolistic competition: differentiation, short-run profit or loss, long-run zero profit (tangency), excess capacity, advertising and brand names, the efficiency debate

### Takeaway
Monopolistic competition has three features:
- **many** firms;
- **differentiated** products (by style or type, location, or quality);
- **free entry and exit** in the long run.

In the **short run** a firm acts like a small monopolist (MR = MC; profit if P > ATC, loss if P < ATC). **Entry** (or exit) then shifts each firm's demand curve left (or right) until it is **tangent to ATC**. At that point:
- **P = ATC**, so economic profit is zero;
- but **P > MC**, and output is **below the minimum-ATC quantity** (**excess capacity**).

It is "inefficient" compared with perfect competition, but consumers get **variety**. That trade-off is the efficiency debate. Advertising and brand names can either inform consumers (signals of quality) or just create market power. Rival campaigns may "neutralise one another".

### Cited Findings
**Krugman's structure**
- Krugman's section *The Meaning of Monopolistic Competition* has the subsections "Large Numbers", "Free Entry and Exit in the Long Run" and "Differentiated Products". The EiA is "Any Color, So Long as It's Black". — [Macmillan 4e TOC](https://prod-cat-files.macmillan.cloud/CMS/SampleChapters/NDP000DKG/1416_Krugman%20Essentials%20of%20Economics%204e%20-%20Preface%20and%20TOC.pdf)

**Differentiation (OpenStax)**
- Products differentiated in these ways are "differentiated products". OpenStax lists four ways:
  1. **Physical aspects:** "unbreakable bottle, nonstick surface, freezer-to-microwave, non-shrink, extra spicy".
  2. **Location:** "a gas station located at a heavily traveled intersection can probably sell more gas".
  3. **Intangible aspects:** "guarantee of satisfaction or money back, a reputation for high quality, services like free delivery".
  4. **Perceptions:** "many people could not tell the difference in taste between common varieties of ketchup or mayonnaise if they were blindfolded but...they have strong preferences for certain brands".

  — [OpenStax 10.1](https://openstax.org/books/principles-economics-3e/pages/10-1-monopolistic-competition)

**Pricing, entry and the long run (OpenStax)**
- "The monopolistically competitive firm decides on its profit-maximizing quantity and price in much the same way as a monopolist." The worked example (Authentic Chinese Pizza) gives Q = 40, P = $16, TR = $640, TC = $580, profit = **$60**. — [OpenStax 10.1](https://openstax.org/books/principles-economics-3e/pages/10-1-monopolistic-competition)
- Entry "shifts the demand curve that a monopolistically competitive firm faces" to the left. "As long as the firm is earning positive economic profits, new competitors will continue to enter." Equilibrium is "where the firm's perceived demand curve touches the average cost curve. When price is equal to average cost, economic profits are zero." — [OpenStax 10.1](https://openstax.org/books/principles-economics-3e/pages/10-1-monopolistic-competition)

**Efficiency (OpenStax)**
- "When P > MC, which is the outcome in a monopolistically competitive market, the benefits to society of providing additional quantity...exceed the marginal costs to society."
- Firms "end up with a price that lies on the downward-sloping portion of the average cost curve, not at the very bottom of the AC curve."
- On variety: "Most people would prefer to live in an economy with many kinds of clothes, foods, and car styles".

  — [OpenStax 10.1](https://openstax.org/books/principles-economics-3e/pages/10-1-monopolistic-competition)

**Advertising (OpenStax)**
- "The U.S. economy spent about $180.12 billion on advertising in 2014."
- "Advertising is all about explaining to people...that the products of one firm are differentiated from another firm's products."
- Pigou observed that advertising by competing firms may "simply neutralise one another".

  — [OpenStax 10.1](https://openstax.org/books/principles-economics-3e/pages/10-1-monopolistic-competition)
- Tradeoffs: monopolistic competition "provides powerful incentives for innovation", but firms "do not produce at the lowest point on their average cost curves". — [OpenStax 10.2](https://openstax.org/books/principles-economics-3e/pages/10-2-oligopoly)

### Inferences
#### Krugman's three forms of differentiation, mapped to OpenStax's four (own synthesis; Krugman wording from memory, check your text)
| Krugman form | Meaning | OpenStax category | Tashkent-style examples (illustrative) |
|---|---|---|---|
| **Style or type** | Different versions of the "same" good | Physical aspects, perceptions | Plov vs lagman cafés; clothing brands |
| **Location** | Convenience: being near the buyer | Location | The café next to campus; a petrol station at a busy junction |
| **Quality** | Better ingredients, service, reliability | Intangible aspects (guarantees, reputation) | Premium vs budget barbershops |

#### Worked Example E (own calculation): from short-run profit to long-run zero profit
**Costs (same in both runs):**
- TC = 100 + Q², so **MC = dTC/dQ = 2Q** and **ATC = 100/Q + Q**.
- Minimum ATC: d(ATC)/dQ = −100/Q² + 1 = 0, so **Q = 10** and **ATC_min = 20**. This is the efficient scale.

**Short run.** The firm's demand is **P = 56 − 3Q**, so MR = 56 − 6Q.
- MR = MC: 56 − 6Q = 2Q, so **Q = 7** and **P = 56 − 21 = $35**.
- ATC(7) = 100/7 + 7 ≈ 21.29.
- **Profit** = TR − TC = 245 − (100 + 49) = **+96**. This attracts entry.

**Long run.** Entry takes customers and shifts the firm's demand left to **P = 40 − 3Q**, so MR = 40 − 6Q.
- MR = MC: 40 − 6Q = 2Q, so **Q = 5** and **P = $25**.
- ATC(5) = 100/5 + 5 = **25 = P**, so **profit = 0**. This is the zero-profit equilibrium.
- **Tangency check (calculus):** the slope of ATC at Q = 5 is −100/25 + 1 = **−3**, the same as the slope of demand (−3). The demand curve just touches ATC.
- **Markup:** MC(5) = 10, so P − MC = **15**. This means P > MC, which is allocative inefficiency.
- **Excess capacity:** the firm produces 5, but minimum ATC is at 10, so **excess capacity = 5 units**. ATC is 25 instead of 20.
- **Perfect-competition comparison:** a perfectly competitive firm in long-run equilibrium would produce 10 at P = MC = ATC_min = 20.

**Loss case (exit).** If demand were P = 30 − 3Q:
- Q = 3.75, P = 18.75, ATC ≈ 30.42, so the **loss ≈ 43.75**.
- Firms exit, and survivors' demand shifts right until tangency is restored.

#### Graphs in words
**Figure 4 (short run, profit):**
- A downward-sloping firm demand D_SR with its MR below it; U-shaped ATC; an upward-sloping MC through the minimum of ATC.
- Q = 7 where MR crosses MC. Price 35 is read off D_SR.
- The profit rectangle has height (35 − 21.29) and width 7.
- (Loss version: D lies below ATC at the MR = MC quantity, and the rectangle is a loss.)

**Figure 5 (long run, zero profit):**
- D_LR has shifted left and just **touches** ATC at Q = 5, P = 25, on the **downward-sloping part** of ATC, left of its minimum (Q = 10, ATC = 20).
- MR crosses MC (= 10) at the same Q = 5.
- Mark three gaps: **P − MC** (the markup); **ATC − ATC_min** (the higher cost); and **10 − 5** (excess capacity).
- There is no profit rectangle.

**Figure 6 (comparison):** next to Figure 5, draw a perfectly competitive firm whose horizontal demand curve touches ATC at its minimum (Q = 10, P = 20).

#### Efficiency debate: two columns for your answer
| "Inefficient" | "But..." |
|---|---|
| P > MC: a DWL, because units worth more than MC go unproduced | The small DWL per firm is the price of **variety** that consumers value |
| Excess capacity: ATC above its minimum | Consumers pay for convenience (location) and choice (style) |
| Advertising can be wasteful (competing campaigns "neutralise one another") | Advertising **informs** (prices, new products) and can **signal quality**; brand names give **quality assurance** |
| Brands create market power (perceived differences, like blindfolded ketchup tests) | Firms with reputations at stake have an incentive to keep quality high |

#### Monopolistic competition vs monopoly (common confusion)
- **Same short-run rule:** MR = MC, with P read off the firm's demand curve.
- **Different long run:** free entry drives profit to zero in monopolistic competition; a monopolist is protected by barriers.

### Gaps
- Krugman's own wording for the three forms of differentiation, and for the "competition among sellers / value in diversity" points, could not be checked against the textbook. They are my paraphrase of the standard text.
- I did not find a recent (2024–26) authoritative figure for total advertising spending to update OpenStax's 2014 number.

---

## 9. Common exam traps (with the correct move)

### Takeaway
Most lost marks come from five errors:
1. Setting P = MC for a monopolist.
2. Reading price off MR or MC instead of demand.
3. Drawing MR wrongly.
4. Shading the wrong areas (transfer vs DWL; ATC vs MC for profit).
5. Treating the collusive outcome as the Nash equilibrium.

### Cited Findings
- The monopolist "will charge what the market is willing to pay". The price is found by going "straight up from the profit-maximizing quantity to the demand curve". — [OpenStax 9.2](https://openstax.org/books/principles-economics-3e/pages/9-2-how-a-profit-maximizing-monopoly-chooses-output-and-price)
- In the Cornell answer key, the monopolist's price is $11 on the demand curve at Q = 20 where MR = MC = $7. A price of $10 is wrong "because that point doesn't lie on the demand curve". — [Cornell Econ 101 answer key](https://courses.cit.cornell.edu/econ101-dl/answer-key-practice-2.html)
- Dominant strategy and Nash definitions are as cited in Section 7. — [OpenStax 10.2](https://openstax.org/books/principles-economics-3e/pages/10-2-oligopoly); [SEP](https://plato.stanford.edu/entries/prisoner-dilemma/)
- In monopolistic competition, the long-run price lies "on the downward-sloping portion of the average cost curve, not at the very bottom". — [OpenStax 10.1](https://openstax.org/books/principles-economics-3e/pages/10-1-monopolistic-competition)

### Inferences
#### The traps (most common first)
1. **"Monopolist sets P = MC."** Wrong. It sets **MR = MC** to choose Q, then reads **P from the demand curve**. P = MC is the *competitive* or *efficient* benchmark used to measure the DWL.
2. **Reading price off MR or MC.** At Q_M, MR = MC = 20 but P = 60 (Example A). Always go **up to D**.
3. **Treating MR and demand as the same thing.** MR = P only for a price taker, or under **perfect price discrimination**. For linear demand, MR = a − 2bQ: same intercept, twice the slope, and it hits zero at **half** of demand's horizontal intercept. (The "twice the slope" shortcut works only for straight-line demand.)
4. **Misidentifying the DWL.** The DWL is the triangle **between D and MC, from Q_M to Q_C**. It is not:
   - the profit rectangle (a **transfer** from consumers);
   - the area under MR;
   - the triangle between MR and D.
5. **Profit rectangle uses ATC, not MC:** π = (P_M − ATC(Q_M)) × Q_M. MC and ATC coincide only when MC is constant and there is no fixed cost.
6. **Fixed costs change Q_M.** They don't. They change profit only (Example A: FC = 300 cuts profit from 800 to 500, while Q stays 20 and P stays 60).
7. **"Monopolists always make profits."** No. If D lies below ATC everywhere, a monopolist loses money.
8. **"Monopolists charge the highest possible price."** No. They pick the profit-maximizing **point on demand**. A higher price means fewer sales and lower profit.
9. **Producing where demand is inelastic.** Impossible with MC > 0, because MR < 0 there (Section 3).
10. **Nash equilibrium vs collusive outcome.** In a prisoners' dilemma the NE is (cheat, cheat). The jointly best cell (cooperate, cooperate) is **not** an equilibrium. A dominant-strategy equilibrium is always a NE, but a NE does not need dominant strategies (Practice Q15).
11. **Reading the payoff matrix the wrong way round.** Convention: (row player's payoff ; column player's payoff). Find best responses column by column for the row player and row by row for the column player, then underline them. A cell with both payoffs underlined is a NE.
12. **Monopolistic competition long run drawn at minimum ATC.** Wrong. The tangency is **left of** the minimum (excess capacity). P = ATC but P > MC.
13. **Zero economic profit means the firm earns nothing.** No. It means **normal profit**: the opportunity cost of capital is covered.
14. **Price discrimination = any price difference.** No. Cost-based differences (e.g., delivery costs) are not discrimination. Discrimination needs market power, sorting, and no resale.
15. **"Perfect price discrimination is bad for efficiency."** Wrong. It is **efficient** (Q = Q_C, DWL = 0), but CS = 0.
16. **Natural monopoly regulated at P = MC "fixes everything".** Wrong. The firm makes a loss equal to its fixed cost and needs a subsidy. The usual Krugman/OpenStax answer is P = ATC.

#### Formula sheet (linear demand P = a − bQ, constant MC = c)
| Item | Formula |
|---|---|
| Revenue | TR = aQ − bQ² |
| Marginal revenue | MR = a − 2bQ |
| Quantity and price | Q_M = (a − c)/2b; P_M = (a + c)/2; Q_C = (a − c)/b |
| Profit | π = (a − c)²/4b; with fixed cost FC, subtract FC |
| Consumer surplus and DWL | CS_M = DWL = (a − c)²/8b |
| Elasticity | E = −(1/b)(P/Q) |
| MR via elasticity | MR = P(1 − 1/\|E\|) |
| Lerner index | (P − MC)/P = 1/\|E\| |
| Profit maximum | FOC: MR = MC; SOC: π″ < 0 |
| Third-degree price discrimination | MR₁ = MR₂ = MC |
| Perfect price discrimination | P = MC at the last unit; π = total surplus |
| Natural monopoly regulation | Ceiling at P = ATC (larger root of D = ATC) |
| Monopolistic competition, long run | MR = MC and P = ATC (tangency) |

### Gaps
- This list reflects common principles-level errors. I did not find the professor's past papers, so it cannot be ranked against the actual exam.

---

## 10. Primer (one page): "Macroeconomics: The Big Picture" (Krugman *Essentials*, Ch. 12 in 4e–6e)

### Takeaway
**Microeconomics** studies how individual households and firms make choices and how markets set prices; this file's material is micro. **Macroeconomics** studies the economy as a whole: total output, overall employment, the general price level, and long-run growth. The whole can behave differently from the sum of its parts.

Krugman's chapter introduces five big ideas:
1. The **business cycle**: recessions and expansions, with peaks and troughs.
2. **Unemployment**.
3. **Inflation and deflation**.
4. **Long-run economic growth**.
5. **International imbalances**.

It also discusses how macro policy (monetary and fiscal) can "tame" the cycle.

### Cited Findings
- Krugman Ch. 12 contents (4e). Opening story: "The Pain in Spain".
  - *The Nature of Macroeconomics*: Macroeconomic Questions; Macroeconomics: The Whole Is Greater Than the Sum of Its Parts; Macroeconomics: Theory and Policy. EiA: "Fending Off Depression".
  - *The Business Cycle*: Charting the Business Cycle; The Pain of Recession; Taming the Business Cycle. EiA: "Comparing Recessions".
  - *Long-Run Economic Growth*. EiA: "A Tale of Two Countries".
  - *Inflation and Deflation*: The Causes of Inflation and Deflation; The Pain of Inflation and Deflation. EiA: "A Fast (Food) Measure of Inflation".
  - *International Imbalances*. EiA: "Spain's Costly Surplus".

  — [Macmillan 4e TOC](https://prod-cat-files.macmillan.cloud/CMS/SampleChapters/NDP000DKG/1416_Krugman%20Essentials%20of%20Economics%204e%20-%20Preface%20and%20TOC.pdf)
- **Recession and expansion (NBER):** "A recession involves a significant decline in economic activity that is spread across the economy and lasts more than a few months." "Expansions are the periods between a trough and a peak." The peak is "the last month of the expansion" and the trough "the last month of the recession". The criteria are depth, diffusion and duration. The most recent U.S. peak was **February 2020** and the trough **April 2020**. — [NBER Business Cycle Dating](https://www.nber.org/research/business-cycle-dating)
- **Unemployment (BLS):** "People who are jobless, looking for a job, and available for work are unemployed." That means no job in the reference week, at least one active search effort in the prior **4 weeks**, and available for work. "The labor force is made up of the employed and the unemployed." The unemployment rate is "the number of unemployed people as a percentage of the labor force". — [BLS](https://www.bls.gov/cps/cps_htgm.htm)
- **Uzbekistan in numbers (IMF, 13 Apr 2026):**
  - Real GDP grew **7.7%** in 2025.
  - "Headline CPI inflation declined to 7.3 percent year-on-year (y/y) at end-2025". The Central Bank targets **5%**, projected to be reached in 2027.
  - The policy rate has been **14%** since March 2025.
  - Unemployment fell to **4.8%**.
  - Growth is projected at **6.8%** in 2026.

  — [IMF Article IV statement](https://www.imf.org/en/news/articles/2026/04/13/mcs041326-uzbekistan)

### Inferences
#### One-page orientation (own synthesis)
| Concept | One-line meaning | What to remember for later chapters |
|---|---|---|
| Micro vs macro | Individual markets vs the whole economy | Macro: "the whole is greater than the sum of its parts". For example, if everyone tries to save more at once, total spending can fall (the paradox-of-thrift idea; background, not checked against the text) |
| Business cycle | Short-run ups and downs of output around its trend | **Recession** = peak to trough; **expansion** = trough to peak; dated by the NBER in the U.S. |
| Pain of recession | Output falls, jobs are lost, unemployment rises, incomes fall | Main reason for **stabilization policy** |
| Taming the cycle | **Monetary policy** (central bank, interest rates and money) and **fiscal policy** (government spending and taxes) | "Theory and Policy" is where the debate starts: does the economy fix itself, or should government act? (Keynes's case for action; background) |
| Unemployment | Unemployed = jobless, searching (last 4 weeks), available; rate = unemployed/labor force | People who stopped searching are not counted, so the rate can understate weakness |
| Inflation / deflation | A rising / falling overall price level | **Disinflation** (inflation falling, e.g., 7.3% toward 5% in Uzbekistan) is **not** deflation |
| Long-run growth | A sustained rise in output per person | This is what raises living standards over decades, not the business cycle |
| International imbalances | Trade or current-account surpluses and deficits | Spain is the chapter's example (opening story and EiA) |

#### Three quick self-checks
1. Inflation falls from 7.3% to 5%. Is that deflation? **No.** Prices still rise, just more slowly. That is disinflation.
2. A student stopped looking for work six weeks ago. Is she unemployed? **No.** She is not in the labor force under the BLS definition.
3. Does a recession require two consecutive quarters of falling GDP? **Not under the NBER definition.** The NBER uses depth, diffusion and duration across many indicators, and the 2020 recession lasted only two months (Feb–Apr).

### Gaps
- Krugman's exact chapter definitions (e.g., his glossary wording for "business cycle" and "recession") were not accessible. Use the textbook's wording on the exam.
- Uzbekistan's own business-cycle dating and labour-force definitions (from the national statistics agency) were not researched. A national-media summary reported 4.9% unemployment for 2025 against the IMF's 4.8% ([Tashkent Times](https://tashkenttimes.uz/economy/16827-uzbekistan-s-gdp-grew-by-7-7-in-2025), search snippet). The difference is probably a matter of definition or timing.

---

## 11. Practice questions with answers (20 items: MCQ, numeric, graph, payoff matrix)

### Takeaway
Twenty exam-style items covering:
- market structures and sources of monopoly (Q1–Q2);
- MR and the monopoly solution, including calculus (Q3–Q9);
- natural-monopoly regulation (Q10);
- price discrimination (Q11–Q13);
- game theory and cartels (Q14–Q17);
- monopolistic competition (Q18–Q19);
- a final trap round (Q20).

All numbers are my own and were checked by script. For more practice, use the external banks listed below.

### Cited Findings
- OpenStax Ch. 9 and 10 have end-of-chapter Self-Check, Review, Critical Thinking and Problems sets with answers to the Self-Check questions. — [OpenStax 9.2](https://openstax.org/books/principles-economics-3e/pages/9-2-how-a-profit-maximizing-monopoly-chooses-output-and-price); [OpenStax 10.2](https://openstax.org/books/principles-economics-3e/pages/10-2-oligopoly)
- Khan Academy has practice exercises on Nash equilibrium, dominant strategies and cartels. — [Khan Academy game theory practice](https://www.khanacademy.org/e/game-theory)
- The Cornell ECON 101 practice exam answer key covers monopoly and natural monopoly, with explanations. — [Cornell](https://courses.cit.cornell.edu/econ101-dl/answer-key-practice-2.html)

### Inferences (questions written by me; answers verified by script)

**Q1 (MCQ).** Many firms, differentiated products, free entry and exit in the long run describes:
(a) perfect competition (b) monopoly (c) oligopoly (d) monopolistic competition
**Answer: (d).**

**Q2 (matching).** Match each case to Krugman's source of monopoly power:
- (i) A city's water-pipe network
- (ii) A patented drug
- (iii) An operating system that everyone uses because all apps run on it
- (iv) A firm owning almost all deposits of a mineral

**Answer:**
- (i) increasing returns to scale / natural monopoly
- (ii) government-created barrier
- (iii) network externality
- (iv) control of a scarce resource or input

**Q3 (MCQ).** For a single-price monopolist with downward-sloping demand, at any Q > 0:
(a) MR = P (b) MR > P (c) MR < P (d) MR = ATC
**Answer: (c).** To sell one more unit it must lower the price on all units (the price effect).

**Q4 (numeric: the two effects).** A monopolist sells 10 units at $50. To sell an 11th it must cut the price to $48 on all units. Find the quantity effect, the price effect, and the MR of the 11th unit.
**Answer:**
- Quantity effect = +$48.
- Price effect = −$2 × 10 = −$20.
- **MR = $28.** Check: TR rises from 500 to 528.

**Q5 (numeric, calculus).** Demand P = 120 − 2Q; TC = 200 + 20Q. Find Q*, P* and profit, and check the second-order condition.
**Answer:**
- MR = dTR/dQ = 120 − 4Q.
- MR = MC: 120 − 4Q = 20, so **Q* = 25**.
- **P* = 70.**
- **Profit** = 70 × 25 − (200 + 20 × 25) = 1,750 − 700 = **1,050**.
- SOC: π″ = −4 < 0, so this is a maximum.
- The fixed cost of 200 does not affect Q* or P*.

**Q6 (numeric: welfare).** For Q5's market, find monopoly consumer surplus, the competitive quantity (P = MC), and the DWL.
**Answer:**
- CS = ½ × 25 × (120 − 70) = **625**.
- Q_C: 20 = 120 − 2Q, so **Q_C = 50**.
- **DWL** = ½ × (50 − 25) × (70 − 20) = **625**.

**Q7 (graph in words).** On a monopoly diagram with constant MC (= ATC), let:
- A = the triangle under D above P_M from 0 to Q_M;
- B = the rectangle between P_M and MC from 0 to Q_M;
- C = the triangle between D and MC from Q_M to Q_C.

(a) What are CS, profit and DWL under monopoly? (b) What is CS under perfect competition? (c) Which area is a transfer and which is a loss?
**Answer:**
- (a) CS = A, profit = B, DWL = C.
- (b) A + B + C.
- (c) B is a transfer from consumers to the monopolist; C is lost to society.

**Q8 (MCQ).** A profit-maximizing monopolist with MC > 0 never produces where demand is inelastic because there:
(a) MR > P (b) MR < 0 (c) ATC is rising (d) the price effect is zero
**Answer: (b).** With MR < 0, cutting output raises revenue and lowers cost.

**Q9 (numeric: markup rule).** At a monopolist's optimum, the price elasticity of demand is −4 and MC = $30. Find P and the Lerner index.
**Answer:**
- MR = P(1 − 1/4) = 0.75P = 30, so **P = $40**.
- Lerner = (40 − 30)/40 = **0.25 = 1/|E|**.

**Q10 (numeric: natural monopoly).** Demand P = 120 − Q; TC = 900 + 20Q. Find Q and P (a) unregulated; (b) with price regulation at P = ATC; (c) with P = MC, including the profit or loss.
**Answer:**

| Regime | Q | P | ATC | Profit | DWL |
|---|---|---|---|---|---|
| (a) Unregulated: MR = 120 − 2Q = 20 | 50 | 70 | 38 | **+1,600** | 1,250 |
| (b) P = ATC: 120 − Q = 20 + 900/Q, so Q² − 100Q + 900 = 0, so Q = 90 (the larger root) | 90 | 30 | 30 | **0** | 50 |
| (c) P = MC | 100 | 20 | 29 | **−900** (= the fixed cost; needs a subsidy) | 0 |

**Q11 (numeric: airline price discrimination).** 60 business travellers will pay $400 each; 200 students will pay $120 each; MC = $80 per seat. Compare profit at a single price of $400, a single price of $120, and with discrimination.
**Answer:**
- Single price $400: 60 × 320 = **19,200**.
- Single price $120: 260 × 40 = **10,400**.
- Discrimination: 19,200 + 200 × 40 = **27,200**.
- Output rises from 60 to 260, which also removes the DWL from excluding the students.

**Q12 (numeric, calculus: third-degree price discrimination).** Market 1: P₁ = 100 − Q₁. Market 2: P₂ = 60 − 2Q₂. MC = 20. Find each price, and explain which group pays more.
**Answer:**
- Market 1: MR₁ = 100 − 2Q₁ = 20, so **Q₁ = 40, P₁ = 60** (E = −1.5).
- Market 2: MR₂ = 60 − 4Q₂ = 20, so **Q₂ = 10, P₂ = 40** (E = −2.0).
- Market 1 pays more because its demand is **less elastic**.
- Profit = 1,600 + 200 = **1,800**.
- (Optional: with a single price, P = 160/3 ≈ 53.33, Q = 50, profit ≈ 1,666.67. Total output is the same 50, so here discrimination raises profit without raising output.)

**Q13 (true/false: perfect price discrimination).** With Example A's demand P = 100 − 2Q and MC = 20:
- (i) Q = 40.
- (ii) CS = 400.
- (iii) DWL = 0.
- (iv) Profit = 1,600.

**Answer:**
- (i) True.
- (ii) **False**: CS = 0.
- (iii) True.
- (iv) True: the firm captures the whole triangle.

**Q14 (payoff matrix: an advertising prisoners' dilemma).** Two cola firms decide whether to advertise. Payoffs in $m (row ; column):
- both advertise: (4 ; 4);
- neither advertises: (6 ; 6);
- one advertises: it gets 8 and the other gets 2.

Find the dominant strategies, the Nash equilibrium, and the collusive outcome.
**Answer:**
- **Advertise** is dominant for each firm: 4 > 2 if the rival advertises, and 8 > 6 if it doesn't.
- **NE = (advertise, advertise)**, with (4 ; 4).
- The collusive outcome is (don't, don't), with (6 ; 6). It is better for both but not stable. This is a prisoners' dilemma, which explains heavy "neutralising" advertising.

**Q15 (payoff matrix: only one firm has a dominant strategy).** Firms A (rows) and B (columns) choose a High (H) or Low (L) price. Payoffs (A ; B):
- (H, H) = (10 ; 8)
- (H, L) = (4 ; 9)
- (L, H) = (7 ; 3)
- (L, L) = (6 ; 5)

Find any dominant strategies and the Nash equilibrium.
**Answer:**
- **B:** L is dominant (9 > 8 against H; 5 > 3 against L).
- **A** has no dominant strategy: H is best against H (10 > 7), L is best against L (6 > 4).
- Since B plays L, A plays L. **The unique NE is (L, L) = (6 ; 5).**
- Check every other cell: someone wants to deviate.

**Q16 (repeated game).** In Worked Example D, cheating earns 2,000 instead of 1,800 once, after which a tit-for-tat rival retaliates and both earn 1,600 per period. Why might firms tacitly collude, and when would collusion fail?
**Answer:**
- The gain is **+200 once**; the loss is **−200 every later period**. If the game is repeated indefinitely and the future matters enough, cooperation pays. (With grim-trigger punishment, the condition is δ ≥ 0.5.)
- Collusion fails when:
  - the game has a known end (backward induction);
  - cheating is hard to detect;
  - there are many firms;
  - demand is volatile;
  - antitrust or leniency rules reward defection.

**Q17 (short answer: cartels).** Using OPEC+, give three reasons cartels are unstable.
**Answer (any three, with evidence):**
1. Each member gains from producing above quota: Kazakhstan was about 332,000 b/d over quota (March 2025).
2. Members with large capacity resent quotas: the UAE (about 4.8 million b/d capacity) left OPEC/OPEC+ on 1 May 2026.
3. Demand shocks trigger fights over market share: in March 2020 Russia refused cuts, Saudi Arabia cut prices by $6–8 and announced 12.3 million b/d, and oil fell about 24% in a day.
4. Outsiders (U.S. shale) expand when prices are high.
5. Cartel agreements are not legally enforceable.

**Q18 (MCQ: monopolistic competition, long run).** Which statement is **false**?
(a) P = ATC (b) P > MC (c) output is below the minimum-ATC output (d) P = minimum ATC
**Answer: (d).** The tangency is on the downward-sloping part of ATC, so there is excess capacity.

**Q19 (numeric: monopolistic competition, short run → long run).** A firm has TC = 64 + Q², so MC = 2Q and ATC = 64/Q + Q.
- (a) Short-run demand is P = 48 − 3Q. Find Q, P and profit.
- (b) Entry shifts demand to P = 32 − 3Q. Find the long-run Q, P and profit, then the efficient scale, excess capacity and markup.

**Answer:**
- (a) MR = 48 − 6Q = 2Q, so **Q = 6, P = 30**. ATC = 64/6 + 6 ≈ 16.67. **Profit** = 180 − (64 + 36) = **80**, so entry follows.
- (b) MR = 32 − 6Q = 2Q, so **Q = 4, P = 20**. ATC(4) = 16 + 4 = 20, so **profit = 0**. Tangency check: the ATC slope at Q = 4 is −64/16 + 1 = −3, equal to the demand slope.
  - Minimum ATC is at **Q = 8** (ATC = 16), so **excess capacity = 4 units**.
  - Markup: P − MC = 20 − 8 = **12**.

**Q20 (trap round: true or false).**
- (i) A monopolist maximizes profit where P = MC.
- (ii) Monopoly profit = (P − MC) × Q whenever ATC is U-shaped.
- (iii) A monopolist can make a loss.
- (iv) The Nash equilibrium of a prisoners' dilemma is the outcome that maximizes the players' joint payoff.
- (v) Under perfect price discrimination there is no deadweight loss.
- (vi) Zero economic profit in monopolistic competition means owners earn nothing.

**Answer:**
- (i) F: MR = MC.
- (ii) F: use ATC at Q_M.
- (iii) T.
- (iv) F: the NE is mutual defection.
- (v) T.
- (vi) F: they earn normal profit.

### Gaps
- No past NTS3040 papers were available, so the question style is modelled on standard principles exams (OpenStax, Cornell, Khan Academy), not the professor's format.

---

## 12. Best free resources (legal; no textbook copies)

### Takeaway
For this chapter:
- **Reading:** OpenStax Ch. 9–11 (free, CC-licensed).
- **Short explanation videos:** MRU, for monopoly pricing and price discrimination.
- **Game-theory practice:** Khan Academy's AP Micro Unit 4.
- **Lecture depth with calculus:** MIT OCW 14.01 (Gruber) lectures 11–14.
- **Exam-format practice:** Cornell's ECON 101 answer keys.

Primary pages for real cases are listed in Sections 5–7. Avoid unofficial PDF copies of Krugman, which circulate online and are pirated.

### Cited Findings
- **OpenStax *Principles of Economics* 3e:**
  - Ch. 9: [9.1 Barriers to entry](https://openstax.org/books/principles-economics-3e/pages/9-1-how-monopolies-form-barriers-to-entry); [9.2 Monopoly output and price](https://openstax.org/books/principles-economics-3e/pages/9-2-how-a-profit-maximizing-monopoly-chooses-output-and-price).
  - Ch. 10: [10.1 Monopolistic competition](https://openstax.org/books/principles-economics-3e/pages/10-1-monopolistic-competition); [10.2 Oligopoly](https://openstax.org/books/principles-economics-3e/pages/10-2-oligopoly).
  - Ch. 11: [11.3 Regulating natural monopolies](https://openstax.org/books/principles-economics-3e/pages/11-3-regulating-natural-monopolies).
- **Marginal Revolution University** (Week 9 Monopoly, Week 10 Price Discrimination, Week 11 Oligopoly):
  - Monopoly: "Maximizing Profit under Monopoly"; "The Monopoly Markup"; "The Costs and Benefits of Monopoly".
  - Price discrimination: "Introduction to Price Discrimination"; "The Social Welfare of Price Discrimination"; "Tying"; "Bundling".
  - Oligopoly: a "Prisoner's Dilemma" video.

  — [MRU video-mapped syllabus](https://mru.org/teacher-resources/principles-microeconomics-syllabus); e.g., [Maximizing Profit under Monopoly](http://mruniversity.com/courses/principles-economics-microeconomics/monopoly-profit-maximization-price-aids-medication); [Introduction to Price Discrimination](http://mruniversity.com/courses/principles-economics-microeconomics/price-discrimination-examples-airlines-arbitrage); [Prisoner's Dilemma](https://youtu.be/t9Lo2fgxWHw)
- **Khan Academy, AP Microeconomics Unit 4 "Imperfect competition"**: monopoly (MR, profit, DWL), price discrimination, monopolistic competition, and oligopoly/game theory (Nash equilibrium, why cartels cheat), with practice. — [Khan Academy AP Micro](https://www.khanacademy.org/economics-finance-domain/ap-microeconomics); [Game theory of cheating firms](https://www.khanacademy.org/economics-finance-domain/ap-microeconomics/imperfect-competition/oligopoly-and-game-theory/v/game-theory-of-cheating-firms)
- **MIT OCW 14.01** *Principles of Microeconomics* (Fall 2018, Jonathan Gruber): Lecture 11 "Monopoly I", Lecture 12 "Monopoly II", Lecture 13 "Oligopoly", Lecture 14 "Oligopoly II". — [MIT OCW 14.01 (2018)](https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2018/); also [Internet Archive mirror of the OCW videos](https://archive.org/details/MIT14.01F18) (lecture titles from search results; the OCW page redirected repeatedly when fetched)
- **University practice material with answers:**
  - [Cornell Econ 101 answer key, practice exam 2](https://courses.cit.cornell.edu/econ101-dl/answer-key-practice-2.html) (monopoly, natural monopoly).
  - [Cornell Econ 101 final (S03)](https://courses.cit.cornell.edu/econ1110jpw/sample%20exams/e3_101_s03.pdf) (includes oligopoly).
  - [UW–Madison Econ 101 final review sheet](https://users.ssc.wisc.edu/~ekelly/econ101/finalreviewsheetfall2006.doc) (monopoly, price discrimination, oligopoly definitions).

  — (search results; I opened only the Cornell answer key)
- **Game theory reference:** [Stanford Encyclopedia of Philosophy, "Prisoner's Dilemma"](https://plato.stanford.edu/entries/prisoner-dilemma/) (Nash equilibrium, repeated games, tit for tat). Advanced, but authoritative.
- **Publisher (legal) previews of Krugman:** the [6e product page](https://www.macmillanlearning.com/ed/uk/product/Essentials-of-Economics--6th-edition/p/1319498574) and the [4e Preface and TOC sample](https://prod-cat-files.macmillan.cloud/CMS/SampleChapters/NDP000DKG/1416_Krugman%20Essentials%20of%20Economics%204e%20-%20Preface%20and%20TOC.pdf).

### Inferences
#### What is most likely to be tested (my ranking for a Ch. 7–8 midterm)
1. **The monopoly diagram:** MR = MC → Q, demand → P; shade profit, CS, DWL; compare with perfect competition. Almost certain.
2. **The MR < P logic** (quantity vs price effect), the demand/revenue table, and the calculus MR = dTR/dQ. Very likely, given the professor's calculus.
3. **Sources of monopoly power**: the five Krugman sources with examples. Likely as MCQ or short answer.
4. **Price discrimination**: conditions, airline and student examples, perfect price discrimination welfare. Likely in 4e–6e (Ch. 8 now includes it).
5. **Natural monopoly regulation** (P = ATC vs P = MC). Moderately likely.
6. **Oligopoly payoff matrix and monopolistic competition long run.** Likely only if your edition's Ch. 8 is the combined chapter, or if the professor includes Ch. 9.

#### Suggested schedule (Mon 19 – Fri 23 Oct 2026)
- **Mon:** Sections 1–3. Redraw Figure 1 from memory; do Q3–Q5 and Q8–Q9.
- **Tue:** Section 4 and Q6–Q7. Watch MRU "Maximizing Profit under Monopoly" and "The Monopoly Markup".
- **Wed:** Sections 5–6 and Q10–Q13. Watch MRU's price discrimination videos.
- **Thu:** Sections 7–8 and Q14–Q19 (if Ch. 9 is examinable). Do the Khan Academy game-theory practice.
- **Fri:** Section 9 traps and the Q20 trap round. Read the macro primer (Section 10) once. Re-do any question you missed.

### Gaps
- I did not check whether Inha's library offers the Krugman e-book or Achieve/LaunchPad access. The student should use those official channels instead of unofficial PDFs.
- MRU's syllabus lists no monopolistic-competition video. I did not find a dedicated free video on Krugman's tangency diagram from a source I would vouch for. Use OpenStax 10.1 for that diagram.
