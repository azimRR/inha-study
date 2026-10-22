# Supply and Demand; Consumer and Producer Surplus — outside (internet) exam notes for Krugman & Wells "Essentials of Economics" ch. 3 + surplus material

> Course: NTS3040 Introduction to Economics, Inha University in Tashkent, Fall 2026. Midterm window 24–30 Oct 2026 (notes compiled Mon 19 Oct 2026).
> Sourcing: external, free sources only (OpenStax, Marginal Revolution University, Khan Academy, National Academies, World Bank, IMF, EIA, news outlets). No pirated textbook copies were used or linked.
> How to read: **Cited Findings** = facts with a source link. **Inferences** = my explanations, Krugman-terminology mapping, worked examples (illustrative numbers; all arithmetic re-checked with Python/SymPy), exam traps and practice items. **Gaps** = what I could not verify.

---

## 1. Demand: law of demand, demand schedule vs demand curve, quantity demanded vs demand, individual vs market demand (horizontal summation)

### Takeaway
"Demand" is the whole price–quantity relationship (the schedule or the curve); "quantity demanded" is a single point on it. The law of demand says the curve slopes downward (dQd/dP < 0). Market demand is the **horizontal** sum of individual demands: add the quantities at each price, never the prices. It can have kinks where a buyer drops out.

### Cited Findings
- Demand is "the amount of some good or service consumers are willing and able to purchase at each price"; quantity demanded is "the total number of units that consumers would purchase at that price" — [OpenStax 3.1](https://openstax.org/books/principles-economics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services)
- Law of demand: the "inverse relationship between price and quantity demanded"; a demand schedule is "a table that shows the quantity demanded at each price"; a demand curve shows "the relationship between price and quantity demanded on a graph" — [OpenStax 3.1](https://openstax.org/books/principles-economics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services)
- The key distinction, verbatim: "In economic terminology, demand is not the same as quantity demanded. When economists talk about demand, they mean the relationship between a range of prices and the quantities demanded at those prices, as illustrated by a demand curve or a demand schedule. When economists talk about quantity demanded, they mean only a certain point on the demand curve, or one quantity on the demand schedule. In short, demand refers to the curve and quantity demanded refers to a (specific) point on the curve." — [OpenStax 3.1](https://openstax.org/books/principles-economics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services)
- Example demand schedule (U.S. gasoline, millions of gallons): $1.00 → 800; $1.20 → 700; $1.40 → 600; $1.60 → 550; $1.80 → 500; $2.00 → 460; $2.20 → 420. Quantity demanded falls as price rises, which is the law of demand in table form — [OpenStax 3.1](https://openstax.org/books/principles-economics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services)
- Ceteris paribus: "The assumption behind a demand curve or a supply curve is that no relevant economic factors, other than the product's price, are changing." — [OpenStax 3.2](https://openstax.org/books/principles-economics-3e/pages/3-2-shifts-in-demand-and-supply-for-goods-and-services)
- Textbook placement: in *Essentials of Economics* (6th ed., ©2023; the publisher page lists Paul Krugman and Robin Wells), Part 2 contains "Supply and Demand", then "Price Controls and Quotas: Meddling with Markets", then "Elasticity and Taxation" — [Macmillan Learning](https://www.macmillanlearning.com/college/us/product/Essentials-of-Economics/p/1319330134). Earlier editions list Krugman, Wells **and Graddy** (e.g., 3rd ed., 2013, Worth Publishers) — [Google Books](https://books.google.com/books/about/Essentials_of_Economics.html?id=GsTZCQAAQBAJ)

### Inferences

#### 1.1 Krugman vocabulary to use in written answers
| Term | Meaning | Say it like this |
|---|---|---|
| Demand schedule | Table: quantity buyers want at each price | "The demand schedule shows 7 cups demanded at 20k so'm." |
| Demand curve | The schedule drawn on a graph (P on the vertical axis, Q on the horizontal) | — |
| Quantity demanded | The amount at **one** specific price (a point) | "The higher price reduced the *quantity demanded*." |
| Law of demand | Higher price → lower quantity demanded, other things equal | — |
| Shift of the demand curve (change in demand) | A different quantity demanded at **every** price | "Higher incomes *increased demand* (the curve shifted right)." |
| Movement along the demand curve | Change in quantity demanded caused only by the good's **own** price | — |
| Individual vs market demand curve | One consumer vs the horizontal sum over all consumers | — |
| Competitive market | Many buyers and sellers of the same good; none can influence the price. This is the setting the model assumes. | Concert tickets and hotel rooms on concert nights only approximate it. |

#### 1.2 Why demand slopes down (intuition + calculus)
- Intuition: as the price rises, some buyers switch to substitutes and others drop out because their willingness to pay (WTP) is below the price. Each point on a demand curve therefore gives the WTP of the *marginal* buyer, which is the link to consumer surplus in Section 6.
- Calculus: the law of demand means dQd/dP < 0. For a linear Qd = a − bP (b > 0), dQd/dP = −b.

#### 1.3 Worked example: individual vs market demand (horizontal summation)
Two students buy coffee near campus (prices in thousand so'm per cup):

| Price | Aziza q_A | Bekzod q_B | Market Q = q_A + q_B |
|---|---|---|---|
| 10 | 8 | 5 | 13 |
| 15 | 6 | 4 | 10 |
| 20 | 4 | 3 | 7 |
| 25 | 2 | 2 | 4 |
| 30 | 0 | 1 | 1 |
| 35 | 0 | 0 | 0 |

- Equations: q_A = 12 − 0.4P for P ≤ 30 (zero above 30); q_B = 7 − 0.2P for P ≤ 35 (zero above 35).
- Market demand, built piece by piece:
  - Q = 19 − 0.6P for P ≤ 30 (both buy)
  - Q = 7 − 0.2P for 30 < P ≤ 35 (only Bekzod buys)
  - Q = 0 for P ≥ 35
- The curve has a **kink** at P = 30 (Q = 1), where Aziza drops out.
- Recipe: (1) write each demand with Q as a function of P; (2) add the quantities at the same P; (3) check each piece's price range so that no quantity is negative.
- The wrong method is to add the inverse demands P = 30 − 2.5q_A and P = 35 − 5q_B to get "P = 65 − 7.5q". That is *vertical* summation: it adds two people's WTP for the same unit. It is used for public goods in a later chapter, never for market demand of a private good.
- Calculus view: Q(P) = Σ q_i(P), so dQ/dP = Σ dq_i/dP = −0.4 − 0.2 = −0.6 while both buy, and −0.2 once only Bekzod buys.
- "Number of consumers" shifter: with 100 identical Azizas, Q = 1,200 − 40P. Quantity is 100 times larger at every price, so the curve lies further right. More consumers means a rightward shift of market demand.

#### 1.4 Traps in this block
- Writing "demand fell because the price rose". Correct: "quantity demanded fell".
- Calling one row of a schedule "the demand".
- Summing vertically, or letting an individual's quantity go negative (missing the kink).
- Axis confusion: the math writes Qd = f(P), but the graph puts P on the vertical axis. For areas (Section 6) convert to inverse demand P = f(Q).

### Gaps
- Krugman's own chapter-3 numbers (his schedule tables, "Economics in Action" boxes and figure numbering) could not be checked against a legitimate open source; use the class textbook/slides for those. One PDF found while searching turned out to be a copy of a Krugman textbook chapter on a university server. It was deliberately not used or linked.

---

## 2. Demand shifters in Krugman's framing (related goods, income, tastes, expectations, number of consumers) and movement along vs shift (the #1 exam trap)

### Takeaway
Only a change in the good's **own price** moves you along its demand curve. Anything else that changes how much buyers want at every price shifts the whole curve: prices of related goods (substitutes/complements), income (normal/inferior goods), tastes, expectations, and the number of consumers. Most multiple-choice traps are sentences that say "demand" where they should say "quantity demanded", or the reverse.

### Cited Findings
- OpenStax's demand shifters: tastes/preferences, the composition or size of the population, income, prices of related goods (substitutes and complements), and expectations about future prices. For example, an aging population raises demand for nursing homes — [OpenStax 3.2](https://openstax.org/books/principles-economics-3e/pages/3-2-shifts-in-demand-and-supply-for-goods-and-services)
- Definitions — [OpenStax 3.2](https://openstax.org/books/principles-economics-3e/pages/3-2-shifts-in-demand-and-supply-for-goods-and-services):
  - normal good: "A product whose demand rises when income rises, and vice versa"
  - inferior good: "A product whose demand falls when income rises"
  - substitute: "A good or service that we can use in place of another"
  - complements: goods we often use together "because consumption of one good tends to enhance consumption of the other"
- Movement vs shift, verbatim:
  - "A change in the price of a good or service causes a movement along a specific demand curve, and it typically leads to some change in the quantity demanded, but it does not shift the demand curve."
  - "A shift in demand happens when a change in some economic factor (other than price) causes a different quantity to be demanded at every price."
  - Source: [OpenStax 3.2](https://openstax.org/books/principles-economics-3e/pages/3-2-shifts-in-demand-and-supply-for-goods-and-services)
- Numeric shift example (car market): at a price of $20,000, a rise in income raises quantity demanded from 18 million to 20 million cars (D0 → D1, a rightward shift). A fall in income lowers it to 14.4 million (D0 → D2, a leftward shift) — [OpenStax 3.2](https://openstax.org/books/principles-economics-3e/pages/3-2-shifts-in-demand-and-supply-for-goods-and-services)
- Expectations: anticipating future price increases encourages buying now — [OpenStax 3.2](https://openstax.org/books/principles-economics-3e/pages/3-2-shifts-in-demand-and-supply-for-goods-and-services)
- "A shift in one curve never causes a shift in the other curve. Rather, a shift in one curve causes a movement along the second curve." — [OpenStax 3.3](https://openstax.org/books/principles-economics-3e/pages/3-3-changes-in-equilibrium-price-and-quantity-the-four-step-process)
- Real substitution in action (2026): when Busan lodging prices spiked for BTS's concerts, fans reportedly booked rooms in Ulsan and commuted by KTX train. Headline: "400,000 Won Per Night for a Motel? BTS Fans Flock to Ulsan by KTX Amid Price Gouging for Accommodations" — [Asia Business Daily, 29 May 2026](https://www.asiae.co.kr/en/article/2026052915430199698) (headline only; the page could not be loaded)

### Inferences

#### 2.1 Krugman's five demand shifters (as listed in the course brief), with direction
| Shifter | Change | Effect on demand for good X | Example |
|---|---|---|---|
| Price of a **substitute** | ↑ | Shifts right | Tea price ↑ → demand for coffee ↑ |
| Price of a **complement** | ↑ | Shifts left | Gasoline price ↑ → demand for big SUVs ↓ |
| Income, **normal** good | ↑ | Shifts right | Restaurant meals, flights |
| Income, **inferior** good | ↑ | Shifts left | Instant noodles or second-hand clothes for many students |
| Tastes | Toward X | Shifts right | Health study praising coffee; K-pop fandom boosts demand for concert-city hotel nights |
| Expectations (future price) | Buyers expect a higher price later | Demand now shifts right | Buy before an announced import-duty rise |
| Expectations (future income) | Expect higher income | Demand now for normal goods shifts right | Final-year students with job offers |
| Number of consumers | ↑ | Shifts right | New campus intake raises demand for nearby flats; more tourists raise demand for hotel rooms |

- Normal vs inferior describes how a given consumer responds to income. It is **not** about quality, and the same good can be normal at low incomes and inferior at high incomes.
- Mapping to OpenStax: its "composition/size of population" corresponds to Krugman's "number of consumers"; the other four line up directly. Neither list includes the good's own price, because that causes a movement, not a shift.

#### 2.2 Quick-fire classification drill: shift or movement? Which curve, which direction?
1. Coffee price rises (coffee market) → **movement** along demand; quantity demanded ↓.
2. Tea price rises (coffee market) → coffee **demand shifts right** (substitute).
3. Sugar price rises (coffee market; complement) → coffee **demand shifts left**.
4. Price of coffee beans rises (café-latte market) → **supply** of lattes shifts left. This is an input price, *not* a demand shifter.
5. Incomes rise (restaurant meals, normal) → demand right.
6. Incomes rise (instant noodles, inferior) → demand **left**.
7. Doctors report coffee is healthy → demand right (tastes).
8. Buyers expect coffee prices to jump next month → demand **today** right.
9. 5,000 new students arrive in a district → demand for nearby apartments right (number of consumers).
10. Frost destroys much of Brazil's coffee crop (coffee market) → **supply** left. Consumers buying less is a movement along demand.
11. Better roasting machines → supply right.
12. Subsidy paid to coffee producers → supply right. A tax on coffee sellers → supply left.
13. Tea price rises (tea market) → **movement** along tea demand.
14. Gasoline price rises: in the gasoline-car market demand shifts left (complement); in the electric-car market demand shifts right (substitute for gasoline cars).
15. Wheat price rises; farmers could grow wheat **or** cotton on the same land (cotton market) → cotton **supply** left (substitute in production; see Section 3).
16. Beef price rises (leather market) → leather **supply** right (joint products / complements in production).
17. Sellers expect higher prices next month (coffee market today) → **supply** today left (they hold stock back).
18. BTS announce Busan concert dates (Busan hotel rooms on those nights) → demand right. When Busan room prices then soar, demand for Ulsan rooms shifts right (they are a substitute).
19. Concert ticket price raised (concert market) → **movement** along demand. Seat supply is fixed, so the supply curve is vertical.
20. "Coffee prices rose, so consumers demanded less coffee" → correct phrasing is "quantity demanded fell" (movement).

#### 2.3 The #1 trap: movement along vs shift
- **Two-step test.**
  1. Is the thing that changed the good's **own price**? If yes, it is a movement along a curve. If no, a curve shifts. Then decide *which* curve: does the change affect buyers' willingness to buy (demand) or sellers' costs and willingness to sell (supply)?
  2. Wording: use "quantity demanded / quantity supplied" for movements, and "demand / supply" (or "increase/decrease in demand") for shifts.
- **Never chain-react curves.** "Demand rose, so price rose, so supply rose" is wrong. Correct: "demand rose, so price rose, so **quantity supplied** rose (a movement along the supply curve)." A shift in one curve causes a movement along the other ([OpenStax 3.3](https://openstax.org/books/principles-economics-3e/pages/3-3-changes-in-equilibrium-price-and-quantity-the-four-step-process)).
- **Do not read data as a curve.** If price and quantity both rose last year, that does not disprove the law of demand. Observed points are equilibria produced by shifting curves (for example, demand rose).

### Gaps
- Krugman's own illustrative examples for each shifter (and his "Pitfalls" boxes) were not verifiable from a legitimate open source. The classifications above follow the standard model and agree with OpenStax.

---

## 3. Supply: supply schedule/curve, shifters (input prices, related goods in production, technology, expectations, number of producers), individual vs market supply

### Takeaway
"Supply" is the whole price–quantity supplied relationship; "quantity supplied" is one point on it. The law of supply says the curve slopes upward (dQs/dP > 0). Krugman's five supply shifters are input prices, prices of related goods or services, technology, expectations and the number of producers. OpenStax adds weather/natural conditions and government policies (taxes, subsidies, regulations), which act through costs. Market supply is the horizontal sum of individual supplies.

### Cited Findings
- Supply is "the amount of some good or service a producer is willing to produce and/or bring to market at each price"; the law of supply is the "positive relationship between price and quantity supplied—that a higher price leads to a higher quantity supplied"; quantity supplied is "one quantity on the supply schedule" — [OpenStax 3.1](https://openstax.org/books/principles-economics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services)
- Example supply schedule (U.S. gasoline, millions of gallons): $1.00 → 500; $1.20 → 550; $1.40 → 600; $1.60 → 640; $1.80 → 680; $2.00 → 700; $2.20 → 720 — [OpenStax 3.1](https://openstax.org/books/principles-economics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services)
- OpenStax's supply shifters: input costs (materials, labor, machinery), natural conditions/weather, technology, and government policies (taxes, regulations, subsidies). Example: a messenger company facing falling gasoline prices can deliver at lower cost, so supply increases at every price — [OpenStax 3.2](https://openstax.org/books/principles-economics-3e/pages/3-2-shifts-in-demand-and-supply-for-goods-and-services)
- "A higher or lower price never shifts the supply curve ... Instead, a price change leads to a movement along a given supply curve." — [OpenStax 3.3](https://openstax.org/books/principles-economics-3e/pages/3-3-changes-in-equilibrium-price-and-quantity-the-four-step-process)
- Input prices dominate gasoline: in 2025 crude oil was 51.4% of the U.S. retail gasoline price (51.7% on average over 2016–2025). Refining costs and profits were 15.9%, distribution and marketing 17.4%, and federal plus state taxes 14.3% — [U.S. EIA](https://www.eia.gov/energyexplained/gasoline/factors-affecting-gasoline-prices.php)
- Cotton as an input: after the global cotton price rose 131% from January 2010 to January 2011, U.S. retailers warned of price increases of "5 percent, 10 percent, or higher" on cotton goods such as blue jeans, towels and sheets — [Philadelphia Inquirer, 18 Feb 2011](https://www.inquirer.com/philly/news/nation_world/20110218_Cotton_crisis_sends_prices_soaring.html)
- Weather as a supply shifter:
  - Good salmon-fishing weather shifts supply right; the equilibrium price falls from $3.25 to $2.50 per pound and quantity rises from 250,000 to 550,000 — [OpenStax 3.3](https://openstax.org/books/principles-economics-3e/pages/3-3-changes-in-equilibrium-price-and-quantity-the-four-step-process)
  - Favorable weather in Côte d'Ivoire and Ghana (about 60% of world cocoa output) underlies a forecast that cocoa prices will "plunge more than 50 percent in 2026" — [World Bank blog, 7 Jul 2026](https://blogs.worldbank.org/en/opendata/beverage-prices-retreat-as-supplies-recover)

### Inferences

#### 3.1 Krugman's five supply shifters, with direction
| Shifter | Change | Supply of good X | Example |
|---|---|---|---|
| Input prices | ↑ | Shifts left | Cotton ↑ → supply of jeans ↓; crude ↑ → supply of gasoline ↓; wages ↑ |
| Price of a **substitute in production** | ↑ | Shifts left | Wheat price ↑ → farmers switch land from cotton, so cotton supply ↓ |
| Price of a **complement in production** (joint product) | ↑ | Shifts right | Beef ↑ → more cattle slaughtered → leather supply ↑ |
| Technology | Improves | Shifts right | Better seeds, irrigation, automation |
| Expectations (sellers) | Expect a higher price later | Supply now shifts **left** (store and sell later) | Farmers holding cotton or grain stocks |
| Number of producers | ↑ | Shifts right | New cafés open; new textile clusters |
| (OpenStax extras) weather, taxes, subsidies, regulation | Bad weather, tax, regulation ↑ / subsidy ↑ | Left / right | Drought, excise tax / producer subsidy |

- The hardest supply shifter is "related goods" in **production**, not consumption. The words "substitute" and "complement" mean something different on the supply side. Always ask: is this about what *buyers* use together or instead (demand), or what *producers* can make with the same resources (supply)?
- Buyer and seller expectations work in opposite directions. Expected higher future prices raise *demand now* and lower *supply now*, and both push today's price up.

#### 3.2 Worked example: individual vs market supply (horizontal summation)
Two cotton farms. Farm A: q_A = 2P − 10, which is positive only for P ≥ 5. Farm B: q_B = 3P − 30, positive only for P ≥ 10.

| Price | q_A | q_B | Market Q |
|---|---|---|---|
| 5 | 0 | 0 | 0 |
| 10 | 10 | 0 | 10 |
| 15 | 20 | 15 | 35 |
| 20 | 30 | 30 | 60 |

- Market supply:
  - Q = 0 for P < 5
  - Q = 2P − 10 for 5 ≤ P < 10
  - Q = 5P − 40 for P ≥ 10
- There is a kink at P = 10, where Farm B starts producing.
- Number of producers: with 50 identical A-type farms, Q = 100P − 500. Quantity supplied is larger at every price, so supply shifts right.

#### 3.3 Traps in this block
- "Supply rose because the price rose." Correct: quantity supplied rose.
- Treating an input-price change as a demand shifter. It shifts supply of the downstream good. In the input's own market it is that good's own price (a movement).
- Forgetting that a tax on sellers shifts supply, not demand. Who bears the tax is Chapter 5 material.
- Saying "technology lowered the price, so demand rose." Correct: quantity demanded rose.

### Gaps
- No credible source located for Uzbekistan-specific producer behavior (e.g., farmers' crop switching after 2020). The wheat-vs-cotton example is a standard illustration, not sourced Uzbek data.

---

## 4. Equilibrium, shortage and surplus, how price returns to equilibrium, why one market price, and what happens if government holds price away from equilibrium

### Takeaway
The equilibrium (market-clearing) price is where Qd = Qs. Above it there is a surplus (excess supply) that pushes the price down; below it there is a shortage (excess demand) that pushes the price up. When the government holds the price below equilibrium (a binding ceiling) you get a persistent shortage, non-price rationing and black markets. Holding it above equilibrium (a binding floor) gives a persistent surplus. Uzbekistan's pre-September-2017 official exchange rate is a clear local case of a binding ceiling.

### Cited Findings
- Equilibrium is the "point where the supply curve and the demand curve cross"; the equilibrium price is "the only price where the plans of consumers and the plans of producers agree" — [OpenStax 3.1](https://openstax.org/books/principles-economics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services)
- Gasoline example — [OpenStax 3.1](https://openstax.org/books/principles-economics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services):
  - Equilibrium is $1.40 per gallon and 600 million gallons.
  - At $1.80, quantity supplied exceeds quantity demanded (a surplus). "Some producers and sellers will want to cut prices, because it is better to sell at a lower price than not to sell at all. Once some sellers start cutting prices, others will follow to avoid losing sales."
  - At $1.20, quantity demanded exceeds quantity supplied (a shortage). Sellers "recognize that they have an opportunity to make higher profits by selling what gasoline they have at a higher price. As a result, the price rises toward the equilibrium level."
- Price controls — [OpenStax 3.4](https://openstax.org/books/principles-economics-3e/pages/3-4-price-ceilings-and-price-floors):
  - A price ceiling is "a legal maximum price"; a price floor is "the lowest price that one can legally pay".
  - Under a binding ceiling "the quantity demanded exceeds the quantity supplied, so there is a shortage".
  - Rent-control example: demand shifts right but rent stays capped at $500, so quantity demanded rises to 19,000 while quantity supplied stays at 15,000 units. Landlords "tend to spend less on maintenance".
  - The EU spends about €58 billion a year on farm price supports, buying up the surplus that a floor creates.
- Price controls lower total surplus. In OpenStax's examples a ceiling and a floor each reduce the quantity traded and create deadweight loss, while transferring surplus between the two sides — [OpenStax 3.5](https://openstax.org/books/principles-economics-3e/pages/3-5-demand-supply-and-efficiency)
- **Uzbekistan's foreign-exchange (FX) market, 2017 — IMF.** "The authorities liberalized the foreign exchange (FX) market in September 2017; the official exchange rate depreciated by 50 percent." Before liberalization the black-market rate was more than 100 percent above the official rate. Afterward inflation picked up, "reflecting FX and price liberalization pass-through" — [IMF Article IV concluding statement, 14 Mar 2018](https://www.imf.org/en/news/articles/2018/03/14/ms031418-uzbekistan-staff-concluding-statement-of-the-2018-article-iv-mission)
- **Uzbekistan's FX market, 2017 — exact rates (search-result excerpts; the pages could not be loaded for full verification).**
  - On 5 September 2017 the Central Bank set the rate at 8,100 so'm per US$, versus the former 4,210. By mid-September the reform had "eliminated the gap between the overvalued official rate and the black market rate" — [U.S. State Dept 2018 Investment Climate Statement](https://2017-2021.state.gov/reports/2018-investment-climate-statements/uzbekistan)
  - In February 2017 the legal rates were 3,357 (commercial) and 3,414 (exchange booth) so'm per US$, against a black-market rate of 6,900 — [U.S. State Dept 2017 Investment Climate Statement](https://2021-2025.state.gov/reports/2017-investment-climate-statements/uzbekistan)
  - By September the black-market rate was about 7,700 — [RFE/RL](https://www.rferl.org/a/uzbekistan-black-marketers-brace-for-currency-reform/28716290.html); see also [RFE/RL: "Uzbekistan To Liberalize Currency Regulations Starting September 5"](https://www.rferl.org/a/uzbekistan-currency-sum-dollar-convertible-liberalization-exchange/28714017.html)
- **Seller-set price below market-clearing (concerts).** In the September 2024 Oasis UK sale, fans who expected to pay the £148.50 face value for standing tickets ended up paying £355.20 for "in demand" tickets, after "thousands of fans waited long hours in virtual queues". The UK Competition and Markets Authority (CMA) opened a probe into possible "unfair commercial practices" — [Al Jazeera, 5 Sep 2024](https://www.aljazeera.com/news/2024/9/5/uk-launches-probe-into-ticketmaster-over-oasis-shows)
- **Price gouging and enforcement (BTS concerts, Busan).**
  - Busan announced joint inspections of lodging after about 70 complaints came in through a "Price Gouging QR Report" system. President Lee Jae-myung called the price surge "malicious exploitation that disrupts the entire market order" — [Seoul Economic Daily, 20 Jan 2026](https://en.sedaily.com/society/2026/01/20/busan-hotel-prices-surge-10-fold-ahead-of-bts-concert)
  - Some businesses allegedly canceled existing reservations to resell rooms at higher prices — [Korea Times, 27 May 2026](https://www.koreatimes.co.kr/entertainment/k-pop/20260527/bts-criticizes-alleged-busan-hotel-price-gouging-ahead-of-concerts)

### Inferences

#### 4.1 Worked example: solving Qd = Qs, then shortage/surplus
Qd = 100 − 2P and Qs = 4P − 20.
- Set them equal: 100 − 2P = 4P − 20, so 120 = 6P, giving **P\* = 20** and **Q\* = 60**. Check: Qd = 100 − 40 = 60 and Qs = 80 − 20 = 60.
- At P = 25: Qd = 50 and Qs = 80, a **surplus of 30**. Sellers cut prices and the price falls toward 20.
- At P = 15: Qd = 70 and Qs = 40, a **shortage of 30**. Buyers bid up and sellers raise prices toward 20.

General linear case: Qd = a − bP and Qs = c + dP (with b, d > 0).
- **P\* = (a − c)/(b + d)** and **Q\* = (ad + bc)/(b + d)**.
- Excess demand ED(P) = Qd − Qs = (a − c) − (b + d)P. It is positive below P\* (shortage) and negative above P\* (surplus).
- The price moves in the direction of excess demand. Optional dynamic version: dP/dt = k·ED(P) with k > 0, which converges to P\*.

Comparative statics (the "light calculus" version):
- ∂P\*/∂a = 1/(b + d) > 0 and ∂Q\*/∂a = d/(b + d) > 0: more demand raises both price and quantity.
- ∂P\*/∂c = −1/(b + d) < 0 and ∂Q\*/∂c = b/(b + d) > 0: more supply lowers price and raises quantity.
- These are verified symbolically. With a = 100, b = 2, c = −20, d = 4 they give P\* = 20 and Q\* = 60.

#### 4.2 Why one market price
- In a competitive market for an identical good with easy comparison, a seller asking more than others loses customers, and a buyer offering less than others finds no seller. Trades therefore converge on a single price.
- Two prices for the *same* good survive only when something blocks this arbitrage: transport or search costs, missing information, or a legal control.
- Uzbekistan before September 2017 had an official dollar price and a higher black-market dollar price at the same time, because the law blocked the arbitrage.

#### 4.3 Government holding the price away from equilibrium: Uzbekistan's 2017 FX reform, worked through
- Treat the US dollar as a good whose price is quoted in so'm.
- The official price of about 4,210 so'm was far below the market-clearing price, which the black-market rate of roughly 7,700–8,000 approximates. That makes it a **binding price ceiling** on dollars.
- At the official price Qd(USD) > Qs(USD), so there was a **shortage** of dollars. Dollars were rationed by permission, queues and connections, and a black market traded at the higher price.
- On 5 Sep 2017 the price was set at 8,100, roughly the market-clearing level, and the shortage and the black-market premium disappeared.
- Arithmetic: the so'm price of a dollar rose by 8,100/4,210 − 1 ≈ 92%. Equivalently, the so'm lost 1 − 4,210/8,100 ≈ 48% of its dollar value, consistent with the IMF's "depreciated by 50 percent".
- The same logic applied to Busan hotel rooms: if authorities had capped concert-night rates at normal-weekend levels, quantity demanded would have far exceeded the fixed number of rooms. Rooms would then go to the fastest or best-connected buyers. Canceling an existing booking to resell it is the typical symptom of a contracted price sitting below the market price.

#### 4.4 Traps in this block
- **"Surplus" has two meanings.** A *surplus* (excess supply, Qs > Qd) is completely different from *producer surplus* or *consumer surplus* (welfare measures). Read the question carefully.
- A shortage is not the same as scarcity. A shortage exists only at a price below equilibrium.
- A ceiling is binding only if it is set **below** the equilibrium price; a floor only if set **above**.
- Size of a shortage = Qd − Qs at the controlled price (a horizontal gap). Under a ceiling the quantity actually traded equals Qs, the "short side" of the market.
- Equilibrium is about the plans of buyers and sellers matching. It does not mean "everyone who wants the good gets it": buyers with WTP below P\* do not buy.

### Gaps
- The State Department pages carrying the 4,210 → 8,100 figures returned errors when fetched, so those numbers rest on search-result excerpts. The IMF statement independently confirms the ~50% depreciation and the large pre-reform black-market premium.
- The size of the premium varied over time. Feb-2017 figures imply about 105% (6,900 vs 3,357), while Sep-2017 figures imply about 83–90% (7,700–8,000 vs 4,210). The IMF's ">100 percent" therefore fits the earlier period better.

---

## 5. Shifts: single-curve and simultaneous shifts, the four ambiguous cases, "size of shift" reasoning, and real-market examples

### Takeaway
When one curve shifts, both P and Q are determined. When both curves shift, one is determined and the other is ambiguous:
- **Same-direction** shifts (D↑ S↑ or D↓ S↓) pin down **quantity**; **price** is ambiguous.
- **Opposite-direction** shifts (D↑ S↓ or D↓ S↑) pin down **price**; **quantity** is ambiguous.

The ambiguous variable moves the way the larger shift pulls it. For linear curves, compare **horizontal** shift sizes when price is ambiguous, and **vertical** shift sizes when quantity is ambiguous.

### Cited Findings
- OpenStax's four-step process, verbatim — [OpenStax 3.3](https://openstax.org/books/principles-economics-3e/pages/3-3-changes-in-equilibrium-price-and-quantity-the-four-step-process):
  1. "Draw a demand and supply model before the economic change took place."
  2. "Decide whether the economic change you are analyzing affects demand or supply."
  3. "Decide whether the effect on demand or supply causes the curve to shift to the right or to the left."
  4. "Identify the new equilibrium and then compare the original equilibrium price and quantity to the new equilibrium price and quantity."
- OpenStax worked cases — [OpenStax 3.3](https://openstax.org/books/principles-economics-3e/pages/3-3-changes-in-equilibrium-price-and-quantity-the-four-step-process):
  - Salmon: good weather shifts supply right; price $3.25 → $2.50, quantity 250,000 → 550,000.
  - Print news: readers shift to digital sources, demand falls, and both price and quantity decline.
  - Postal services: higher worker pay shifts supply left while the move to digital communication shifts demand left. Quantity falls for sure. Verbatim: "When both curves shift, typically we can determine the overall effect on price or on quantity, but not on both. In this case, we determined the overall effect on the equilibrium quantity, but not on the equilibrium price."
- **Coffee (supply shock, then supply recovery).**
  - Arabica hit record highs in February 2025: "Arabica Coffee Prices Surge Past $4.30" — [Trading Economics](https://tradingeconomics.com/commodity/coffee/news/495564); "Arabica Coffee Soars to a Record High as Drought Decimates Brazil's Coffee Crop" — [Nasdaq](https://www.nasdaq.com/articles/arabica-coffee-soars-record-high-drought-decimates-brazils-coffee-crop) (headlines)
  - The World Bank reports arabica soared "more than 40 percent" in 2025 and is "expected to fall 14 percent" in 2026. In Q2 2026 it "slipped nearly 7 percent (q/q)—now sitting 17 percent below their level a year ago". Robusta is projected to decline 18% in 2026.
  - The World Bank attributes the easing to "stronger global supply prospects and the removal of U.S. tariffs on Brazilian imports earlier in the year". Production is "projected at 177.5 million bags during the 2025–26 season, a nearly 2 percent increase".
  - Risk to supply: persistent heavy rains in Brazil, "source of more than one‑third of the world's coffee", could trigger disease outbreaks.
  - Source for the last three bullets: [World Bank blog (Baffes & Temaj), 7 Jul 2026](https://blogs.worldbank.org/en/opendata/beverage-prices-retreat-as-supplies-recover)
- **Cocoa.** Prices are "still more than 50 percent lower than a year ago" and forecast to "plunge more than 50 percent in 2026" on favorable West African weather — [World Bank blog](https://blogs.worldbank.org/en/opendata/beverage-prices-retreat-as-supplies-recover)
- **Cotton 2010–11.**
  - The global cotton price rose 131% from January 2010 to January 2011 and stood 169% above the 2008–09 average. ICE futures went from $1.72 to $2.04/lb in early February 2011.
  - An expert quoted in the article: "We had big floods in Pakistan, and we had poor crops coming out of China."
  - Retailers warned of higher prices for jeans, towels and sheets.
  - Source for these three bullets: [Philadelphia Inquirer, 18 Feb 2011](https://www.inquirer.com/philly/news/nation_world/20110218_Cotton_crisis_sends_prices_soaring.html)
  - Peak: an all-time high of about $2.11/lb on 7 Mar 2011 according to a data aggregator ([Macrotrends](https://www.macrotrends.net/2533/cotton-prices-historical-chart-data), search excerpt). Other reports quote ~$2.19 intraday, so the exact peak differs by measure.
- **BTS "ARIRANG" world tour, Busan, 12–13 June 2026.**
  - A Korea Consumer Agency survey found lodging rates up to 7.5-fold higher for the concert week than the surrounding weeks. BTS's RM said, "There is so much news regarding accommodations. It does not feel good" — [Korea Times, 27 May 2026](https://www.koreatimes.co.kr/entertainment/k-pop/20260527/bts-criticizes-alleged-busan-hotel-price-gouging-ahead-of-concerts)
  - Individual listings: 68,000 → 769,000 won (11.3×) in Dongnae-gu; a Gijang-gun lodging went from a 98,000-won weekday rate to 500,000+ won; luxury hotel rates more than doubled — [Seoul Economic Daily, 20 Jan 2026](https://en.sedaily.com/society/2026/01/20/busan-hotel-prices-surge-10-fold-ahead-of-bts-concert)
  - Follow-up headline: "Busan Probes Hotels Over Alleged Price Gouging Ahead of BTS Concert" — [Seoul Economic Daily, 3 Jun 2026](https://en.sedaily.com/society/2026/06/03/busan-probes-hotels-over-alleged-price-gouging-ahead-of-bts)
  - Spillover headline: fans "Flock to Ulsan by KTX Amid Price Gouging" — [Asia Business Daily](https://www.asiae.co.kr/en/article/2026052915430199698)
- **Oasis 2024 (UK).** Face value was £148.50, but many fans paid £355.20 for "in demand" standing tickets — [Al Jazeera](https://www.aljazeera.com/news/2024/9/5/uk-launches-probe-into-ticketmaster-over-oasis-shows). The CMA later said it found no evidence that prices were adjusted in real time (i.e., no algorithmic dynamic pricing). Trade press reports Ticketmaster released standing tickets at a lower price and then the remainder at a much higher price, and sold "platinum" seats at about 2.5× equivalent standard seats — [Music Business Worldwide](https://www.musicbusinessworldwide.com/ticketmaster-didnt-use-dynamic-pricing-for-oasis-concerts-will-change-how-it-sells-tickets-in-uk-watchdog-says/); [Arts Professional](https://www.artsprofessional.co.uk/news/oasis-concerts-watchdog-says-no-evidence-ticketmaster-used-dynamic-pricing); [Music Week](https://www.musicweek.com/live/read/no-evidence-of-dynamic-pricing-for-oasis-stadium-concerts-cma-s-verdict-on-ticketmaster/091663) (headlines/excerpts; full pages not loadable)
- **Gasoline seasonality.** "Gasoline demand usually increases in the summer, which generally results in higher prices." — [U.S. EIA](https://www.eia.gov/energyexplained/gasoline/factors-affecting-gasoline-prices.php)
- **Uzbekistan cotton reform.**
  - A decree of 6 March 2020 ended the cotton state-order system. From 2020, quotas for the production and sale of cotton were cancelled, "leaving farmers who rent land from the state free to cultivate alternative and more lucrative crops" — [RFE/RL](https://www.rferl.org/a/uzbek-president-orders-abolition-of-state-cotton-quotas/30475066.html) (search excerpt)
  - Kun.uz's summary of the decree (headline: "State order for cotton has been abolished") describes the new pricing: "each year until December 1, the expected price indices for next year's crop will be announced, and quarterly adjustments will be made to this price based on the volatility of market prices". It also mentions plans to liquidate Uzpaxtasanoat JSC — [Kun.uz, 6 Mar 2020](https://kun.uz/en/news/2020/03/06/presidential-decree-state-order-for-cotton-has-been-abolished)
  - Under cluster arrangements, contract farmers can sell raw cotton only to their cluster's organizer — [World Bank, "Cotton Pricing After 2020 Cotton Sector Reform"](https://documents1.worldbank.org/curated/en/181091635743908598/pdf/Policy-Dialogue-on-Agriculture-Modernization-in-Uzbekistan-Cotton-Pricing-After-2020-Cotton-Sector-Reform.pdf) (search excerpt)

### Inferences

#### 5.1 The eight cases (memorize this table)
| # | Demand | Supply | Price | Quantity |
|---|---|---|---|---|
| 1 | ↑ (right) | — | ↑ | ↑ |
| 2 | ↓ (left) | — | ↓ | ↓ |
| 3 | — | ↑ (right) | ↓ | ↑ |
| 4 | — | ↓ (left) | ↑ | ↓ |
| 5 | ↑ | ↑ | **?** | ↑ |
| 6 | ↓ | ↓ | **?** | ↓ |
| 7 | ↑ | ↓ | ↑ | **?** |
| 8 | ↓ | ↑ | ↓ | **?** |

Memory hook: **"Same direction → Quantity is sure; Opposite directions → Price is sure."**

#### 5.2 "Size of shift" reasoning: graph rule and algebra rule
- **Exam-safe wording for case 5:** "Quantity definitely rises. Price rises if the increase in demand is larger than the increase in supply, falls if the supply increase is larger, and stays the same if they are equal." Mirror this wording for cases 6–8.
- **Algebra (light calculus).** Shift demand by Δa (the horizontal shift at any price) and supply by Δc. From Section 4.1:
  - ΔP\* = (Δa − Δc)/(b + d)
  - ΔQ\* = (d·Δa + b·Δc)/(b + d)
- Two exact corollaries for linear curves (both verified):
  1. If both curves shift **right by the same horizontal amount**, the price is unchanged and quantity rises by exactly that amount.
  2. If demand shifts **up** and supply shifts **up** (i.e., supply shifts left) by the same **vertical** amount v, quantity is unchanged and the price rises by exactly v.
- So for "price ambiguous" cases compare horizontal shifts, and for "quantity ambiguous" cases compare vertical shifts. If you only compare horizontal sizes in the opposite-direction case, the curves' slopes also matter.
- **Verified numbers.** Base market Qd = 100 − 2P, Qs = 4P − 20, with P\* = 20 and Q\* = 60.

| Change | New P\* | New Q\* | Lesson |
|---|---|---|---|
| D right by 30 (a = 130) | 25 | 80 | Case 1 |
| S left by 30 (c = −50) | 25 | 50 | Case 4 |
| D right 30, S right 30 (c = 10) | 20 | 90 | Equal horizontal shifts → P unchanged |
| D right 30, S right 60 (c = 40) | 15 | 100 | Supply shift larger → P falls |
| D right 30, S right 15 (c = −5) | 22.5 | 85 | Demand shift larger → P rises |
| D right 30, S left 30 (c = −50) | 30 | 70 | Equal *horizontal* opposite shifts, yet Q rises: demand's vertical shift is 15, supply's only 7.5, because supply is flatter |
| D up 5, S up 5 (a = 110, c = −40) | 25 | 60 | Equal *vertical* shifts → Q unchanged, P up by 5 |

#### 5.3 Real-market case studies analysed in Krugman's language
1. **BTS concert nights in Busan (June 2026).**
   - Demand for Busan rooms on two specific nights shifted far right (tastes plus a surge in the number of consumers).
   - Short-run supply of rooms is nearly fixed (almost vertical), so the shift showed up mostly as a **price** rise: up to 7.5× in the consumer-agency survey, 11.3× for one listing. The quantity of rooms rented could not rise much.
   - Related markets: Ulsan rooms (a substitute) saw a demand increase, and KTX trips (a complement to staying outside Busan) rose too.
   - Policy: anti-gouging inspections. A binding cap would have produced a shortage (Section 4.3).
2. **Oasis tickets (2024).**
   - Ticket supply for a stadium date is vertical (fixed seats).
   - Face value of £148.50 sat below the market-clearing price, so there was massive excess demand, visible as virtual queues, plus a resale incentive.
   - Releasing later standing tickets at £355.20 (2.39×) moved the price toward market-clearing. That transfers consumer surplus to the seller; the quantity of seats does not change.
   - Per the CMA, this was a tiered release, not real-time dynamic pricing.
3. **Coffee (2024–2026).**
   - 2024–25: Brazilian drought shifted supply left, so price rose (record above $4.30/lb in February 2025).
   - 2026: harvest recovery plus removal of U.S. tariffs on Brazilian coffee (cheaper to supply the U.S. market) shifted supply right, so price fell (World Bank forecast −14% for arabica in 2026).
   - Exam twist: if demand also grew while supply recovered (case 5), quantity rises for sure and price is ambiguous.
4. **Cocoa (2026).** Good West African weather shifted supply right, so prices are forecast to fall more than 50%. This is case 3.
5. **Cotton 2010–11 (relevant to Uzbekistan as a cotton producer).**
   - Floods in Pakistan and a poor Chinese crop shifted supply left, and the price rose 131% in a year (case 4).
   - Downstream, cotton is an **input**, so the supply of jeans, towels and sheets shifted left and retail prices rose.
   - If world textile demand was also recovering from the 2008–09 recession (plausible but not verified here), this becomes case 7: price up for sure, quantity ambiguous.
6. **Gasoline.**
   - The summer driving season shifts demand right, so prices rise (case 1).
   - Crude oil is about half the retail price, so a crude-price spike shifts gasoline supply left (case 4). Both together is case 7.
7. **Uzbekistan cotton reform (2020).**
   - The state order combined a quantity quota with an administratively set procurement price.
   - Abolishing it lets the farm-gate price follow world-market indices. Farmers can also respond to **prices of related goods in production**: if fruit, vegetables or wheat pay more, cotton supply shifts left.
   - Exam angle: removing a binding control lets price and quantity move to the market equilibrium.

#### 5.4 Traps in this block
- Declaring both P and Q in a two-shift question. One of them must be "ambiguous / depends on relative size".
- Writing "no change" for the ambiguous variable. Correct: "indeterminate without knowing the relative sizes".
- Turning the new price into a further shift ("price rose, so supply rose"). It is a movement.
- Mixing up which variable is ambiguous. Use the memory hook.
- Fixed-capacity markets (stadium seats, hotel rooms on one night): a demand shift changes price, not quantity.

### Gaps
- Krugman's own textbook case boxes (some editions use cotton and ticket examples) were not verified from legitimate sources.
- No credible data were found on Uzbekistan's current world cotton-export rank or on domestic textile price effects.
- A search excerpt claimed Vietnam's coffee output fell 20% in the 2024–25 shock; it was not verified and is left out above.
- The date of the CMA's final Oasis findings was not verified.

---

## 6. Consumer surplus, producer surplus, total surplus: triangle areas, changes when price changes, efficiency of the competitive equilibrium

### Takeaway
- Consumer surplus (CS) = WTP − price paid, which is the area under demand and above the price.
- Producer surplus (PS) = price received − cost (the seller's minimum acceptable price), which is the area above supply and below the price.
- Total surplus (TS) = CS + PS = (total WTP of the buyers who buy) − (total cost of the sellers who sell).

With linear curves these are triangles (½ × base × height); in general they are integrals. The competitive equilibrium **maximizes total surplus**, and any other quantity creates deadweight loss. A price change transfers surplus between buyers and sellers (a rectangle) and adds or removes trades (a triangle).

### Cited Findings
- Definitions — [OpenStax 3.5](https://openstax.org/books/principles-economics-3e/pages/3-5-demand-supply-and-efficiency):
  - consumer surplus: "The amount that individuals would have been willing to pay, minus the amount that they actually paid"
  - producer surplus: "the price the producer actually received minus the price the producer would have been willing to accept"
  - social surplus: "The sum of consumer surplus and producer surplus, also referred to as economic surplus or total surplus"
  - deadweight loss: "The loss in social surplus that occurs when the economy produces at an inefficient quantity"
  - efficiency: "When it is impossible to improve the situation of one party without imposing a cost on another"
- "Social surplus is larger at equilibrium quantity and price than it would be at any other quantity." OpenStax's tablet example has equilibrium at $80 and 28 million units — [OpenStax 3.5](https://openstax.org/books/principles-economics-3e/pages/3-5-demand-supply-and-efficiency)
- Price controls in OpenStax's figures — [OpenStax 3.5](https://openstax.org/books/principles-economics-3e/pages/3-5-demand-supply-and-efficiency):
  - A ceiling of $400 (equilibrium $600) cuts quantity to 15,000 units, transfers area V from producers to consumers, and creates deadweight loss U + W.
  - A floor of $12 (equilibrium $8) cuts quantity to 1,400, transfers area H to producers, and creates deadweight loss J + K.
- Consumer surplus is "the consumer's gain from exchange". Total consumer surplus is the sum over all buyers and, on a graph, "the area beneath demand curve and above the price" — [Marginal Revolution University](https://mru.org/courses/principles-economics-microeconomics/consumer-surplus) (per search excerpt)
- Calculus formulas, with (Q, P) the equilibrium — [UNL Applied Calculus §4.5](https://mathbooks.unl.edu/AppliedCalculus/sec-4-5-consumer-producer-surplus.html):
  - CS = ∫₀^Q (D(x) − P) dx = ∫₀^Q D(x) dx − QP
  - PS = ∫₀^Q (P − S(x)) dx = QP − ∫₀^Q S(x) dx
  - Worked example: S(x) = 250 + 5x and D(x) = 1000 − 10x give Q = 50, P = 500, CS = 12,500 and PS = 6,250.
- Where the surplus material sits for Krugman courses:
  - The *Essentials* table of contents has no stand-alone surplus chapter (Part 2 = Supply and Demand; Price Controls and Quotas; Elasticity and Taxation) — [Macmillan Learning](https://www.macmillanlearning.com/college/us/product/Essentials-of-Economics/p/1319330134)
  - In Krugman & Wells' full *Economics*, "Consumer and Producer Surplus" is its own chapter, placed before "Price Controls and Quotas" — [Macmillan Learning, Economics 7e](https://www.macmillanlearning.com/college/us/product/Economics/p/1319415903) (per search excerpt)

### Inferences

#### 6.1 Krugman-style vocabulary
willingness to pay; individual consumer surplus; total consumer surplus; cost (the seller's lowest acceptable price); individual and total producer surplus; total surplus; gains from trade; efficiency; deadweight loss.

#### 6.2 Worked example A: a discrete used-textbook market (own numbers, in thousand so'm)
Buyers' WTP: Dilnoza 60, Jasur 48, Kamola 35, Rustam 25, Shahzod 12.
Sellers' costs (minimum acceptable price): Timur 8, Malika 18, Otabek 28, Nigora 40, Sardor 52.

| Price | Qd (number with WTP ≥ P) | Qs (number with cost ≤ P) |
|---|---|---|
| 20 | 4 | 2 → shortage |
| 28–35 | 3 | 3 → equilibrium |
| 36 | 2 | 3 → surplus |

At P = 30:
- CS = (60−30) + (48−30) + (35−30) = 30 + 18 + 5 = **53**
- PS = (30−8) + (30−18) + (30−28) = 22 + 12 + 2 = **36**
- TS = **89** = (60+48+35) − (8+18+28)
- Any price between 28 and 35 gives the same TS; the price only splits it.

Efficiency checks (each one lowers TS):
1. Give Kamola's book to Rustam instead: −10. The good must go to the buyers who value it most.
2. Let Nigora (cost 40) sell instead of Otabek (28): −12. Sales must come from the lowest-cost sellers.
3. Add a fourth trade (Rustam buys from Nigora): 25 − 40 = −15. There must be no trade where cost exceeds value.
4. Remove the Kamola–Otabek trade: −7. Every mutually beneficial trade must happen.

Price ceiling at 20:
- Qs = 2 and Qd = 4, so there is a shortage of 2.
- If the two books go to Dilnoza and Jasur: CS = 68, PS = 14, TS = 82, so deadweight loss = 7.
- If they go (by queue or lottery) to Kamola and Rustam: CS = 20, TS = 34, an extra loss from **inefficient allocation among consumers**. Note that CS can be *higher* for some buyers under a ceiling while total surplus falls.

#### 6.3 Worked example B: linear curves (triangles, plus the same thing with integrals)
Qd = 100 − 2P, Qs = 4P − 20, so P\* = 20 and Q\* = 60.
- Choke price (Qd = 0): P = 50. Minimum supply price (Qs = 0): P = 5.
- CS = ½ × 60 × (50 − 20) = **900**. Integral check: ∫₂₀⁵⁰ (100 − 2P) dP = [100P − P²]₂₀⁵⁰ = 2500 − 1600 = 900. In Q-form: ∫₀⁶⁰ (50 − Q/2 − 20) dQ = 900.
- PS = ½ × 60 × (20 − 5) = **450**. Integral check: ∫₅²⁰ (4P − 20) dP = 450. In Q-form: ∫₀⁶⁰ (20 − 5 − Q/4) dQ = 450.
- TS = **1,350**.

```
 P
 50 +\
    |  \            D: P = 50 - Q/2
    |CS  \
 20 +------*-------------  P* = 20
    |PS  /
    |  /            S: P = 5 + Q/4
  5 +/
    +------+---------------- Q
           60 = Q*
```

#### 6.4 Worked example C: how surplus changes when the price changes
- Price falls from 30 to 20 on the demand curve above. CS goes from ½·40·20 = 400 to 900, so **ΔCS = +500**. That splits into:
  - a **rectangle** of 40 × 10 = 400: the 40 existing buyers each pay 10 less;
  - a **triangle** of ½ × 20 × 10 = 100: the 20 new buyers drawn in.
- Price rises from 20 to 25 on the supply curve above. PS goes from 450 to 800, so **ΔPS = +350**. That is a rectangle of 60 × 5 = 300 for existing sellers plus a triangle of ½ × 20 × 5 = 50 for new sellers.
- When a *curve shifts*, recompute CS and PS at the new equilibrium; do not just move the price line.

#### 6.5 Worked example D: nonlinear demand (calculus)
Inverse demand P = 100 − Q²; inverse supply P = 4 + 10Q.
- Equilibrium: 100 − Q² = 4 + 10Q, so Q² + 10Q − 96 = 0, giving **Q\* = 6** and **P\* = 64**.
- CS = ∫₀⁶ (100 − Q² − 64) dQ = [36Q − Q³/3]₀⁶ = 216 − 72 = **144**.
- PS = ∫₀⁶ (64 − 4 − 10Q) dQ = [60Q − 5Q²]₀⁶ = **180**.
- TS = **324**.

#### 6.6 Why the competitive equilibrium is efficient (calculus proof + intuition)
- Define TS(Q) = ∫₀^Q [P_d(q) − P_s(q)] dq, where the demand curve measures marginal benefit/WTP and the supply curve measures marginal cost.
- Then TS′(Q) = P_d(Q) − P_s(Q), which is zero exactly where the curves cross (Q\*). Also TS″(Q) = P_d′ − P_s′ < 0, so Q\* is a **maximum**.
- Intuition: for Q < Q\*, the next unit is worth more to a buyer than it costs a seller, so gains are missed (deadweight loss). For Q > Q\*, units cost more than they are worth.
- In words, the equilibrium (i) gives the good to the buyers with the highest WTP, (ii) has it produced by the lowest-cost sellers, and (iii) leaves no mutually beneficial trade undone. Example A demonstrates all three.
- Caveats: efficiency is not fairness or equity. Market failures (externalities, market power, information problems) break the result; these come in later chapters.

#### 6.7 Traps in this block
- The CS triangle's height is (choke price − market price), **not** the market price.
- If supply starts above zero, the PS height is (P − P_min), not P.
- The base is the quantity **actually traded**. Under a ceiling, use Qs, and read WTP off the demand curve, not the ceiling line.
- "Surplus" (excess supply) vs "producer surplus" again.
- A higher price always lowers CS and raises PS for given curves. TS changes only if the quantity traded changes.
- The equilibrium maximizes **total** surplus, not CS or PS separately.
- Units: if Q is in millions and P in so'm, surplus is in millions of so'm.

### Gaps
- I could not verify from a legitimate source whether *Essentials* introduces consumer/producer surplus in Ch. 4 (price controls) or Ch. 5 (elasticity and taxation). Check the course syllabus or the textbook table of contents.
- The MRU definition comes from a search excerpt of the MRU page; the video itself was not viewed.

---

## 7. Supply-and-demand analysis of illegal goods: enforcement against sellers vs against buyers

### Takeaway
- **Enforcement against sellers** raises their costs (risk, lost shipments), so supply shifts left: price ↑ and quantity ↓. Total spending can *rise* if demand is inelastic.
- **Enforcement against buyers** (penalties), and also treatment or prevention, shifts demand left: price ↓, quantity ↓, and spending falls.
- **Both together:** quantity falls for sure; price is ambiguous (case 6).

A higher street price signals tougher supply conditions. It is not the policy goal in itself.

### Cited Findings
- Supply-side enforcement raises unit costs, so "suppliers require a higher price to bring any given quantity of drugs to the market". "A supply-side intervention on the model of the 'war on drugs' should produce higher drug prices", with P₂ > P₁ and Q₂ < Q₁ — [National Research Council (2010), *Understanding the Demand for Illegal Drugs*, ch. 2 "Markets for Drugs"](https://www.nationalacademies.org/read/12976/chapter/4)
- The size of the effect depends on demand elasticity. With steep (inelastic) demand, the price rises a lot and quantity falls little; with flat (elastic) demand, the reverse. The report warns against "confusing the indicator—the market price—with the policy objective (reducing drug use)" — [NRC 2010](https://www.nationalacademies.org/read/12976/chapter/4)
- Demand-side policies "shift the demand curve down (left)", lowering both price and quantity. Such interventions are "especially attractive because they induce favorable price and quantity effects, while supply-side interventions generate only favorable quantity effects", which matters for drug spending and criminal incomes — [NRC 2010](https://www.nationalacademies.org/read/12976/chapter/4)
- Evidence that illegal-good demand responds to price: one study found "a participation elasticity of –0.46 for marijuana use" — [NRC 2010](https://www.nationalacademies.org/read/12976/chapter/4)

### Inferences

#### 7.1 Worked example (verified)
Black market: Qd = 100 − 2P and Qs = 4P − 20. Initially P = 20, Q = 60, and spending = 1,200.

| Policy | Curve change | New P | New Q | Spending P×Q |
|---|---|---|---|---|
| Crack down on sellers | Qs = 4P − 50 (left 30) | 25 | 50 | **1,250 (↑)** |
| Penalize buyers | Qd = 70 − 2P (left 30) | 15 | 40 | 600 (↓) |
| Both | Both shift left 30 | 20 | 30 | 600 |

- Spending rises under the seller crackdown because demand is inelastic over that range: the arc elasticity between (60, 20) and (50, 25) is −9/11 ≈ −0.82. That links to Chapter 5's total-revenue rule.
- In the "both" row the equal horizontal shifts leave the price unchanged, exactly as corollary 1 in Section 5.2 predicts.

#### 7.2 Exam answer template
"Enforcement against sellers raises the cost of supplying, so the supply curve shifts left. The equilibrium price rises and the equilibrium quantity falls. Enforcement against buyers lowers their willingness to pay, so the demand curve shifts left. Price and quantity both fall. Using both policies, quantity falls unambiguously, while the price change depends on which shift is larger."

#### 7.3 Traps in this block
- Claiming that a crackdown on sellers *lowers* the street price. It raises it.
- Judging success by price instead of quantity (the NRC's "indicator vs objective" warning).
- Forgetting that dealers' revenue can rise under supply-side enforcement when demand is inelastic.

### Gaps
- A search excerpt suggested that some purchase-level studies find a *negative* relationship between dealer enforcement and price, explained by arrest-avoidance behavior. That paper was not verified, so this real-world complication is unconfirmed.
- Becker, Murphy & Grossman's "The Market for Illegal Goods: The Case of Drugs" (JPE 2006) is the classic academic treatment but was not fetched in this session.

---

## 8. Practice questions with answers (20: multiple choice, graph scenarios, numeric)

### Takeaway
The questions below reproduce the most testable patterns: movement vs shift, shifter classification, the eight shift cases, solving Qd = Qs, horizontal summation, CS/PS triangles and integrals, surplus changes, a price ceiling, illegal goods, and an Uzbekistan FX application. All numeric answers were re-computed in Python/SymPy.

### Cited Findings
- The question formats follow the open-textbook method: the four-step shift analysis and its ambiguity rule ([OpenStax 3.3](https://openstax.org/books/principles-economics-3e/pages/3-3-changes-in-equilibrium-price-and-quantity-the-four-step-process)), schedule-based equilibrium ([OpenStax 3.1](https://openstax.org/books/principles-economics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services)), and integral surplus formulas ([UNL Applied Calculus §4.5](https://mathbooks.unl.edu/AppliedCalculus/sec-4-5-consumer-producer-surplus.html)).
- A .edu set of practice problem solutions on consumer and producer surplus exists at Syracuse University — [Syracuse practice solutions](https://dcpopp.expressions.syr.edu/wp-content/uploads/897practice1_sln.pdf) (per search excerpt; not opened).

### Inferences

#### Multiple choice
**Q1.** The price of cotton T-shirts falls 20%. In the T-shirt market:
(a) demand increases (b) quantity demanded increases (c) supply increases (d) the demand curve shifts right.
**Answer: (b).** A change in the good's own price causes a movement along the demand curve.

**Q2.** Tea and coffee are substitutes. A poor tea harvest raises the price of tea. In the coffee market:
(a) demand shifts left, P↓ Q↓ (b) demand shifts right, P↑ Q↑ (c) supply shifts left, P↑ Q↓ (d) only quantity demanded rises.
**Answer: (b).**

**Q3.** Gasoline and large SUVs are complements. A big rise in gasoline prices, in the SUV market:
**Answer:** demand shifts left, so P↓ and Q↓.

**Q4.** Many students graduate into well-paid jobs, and instant noodles are an inferior good for them. Effect on the noodle market?
**Answer:** demand shifts left, so P↓ and Q↓. It is a demand change, not a change in quantity demanded.

**Q5.** Tashkent car buyers learn that import duties will rise next month. In today's car market:
(a) demand shifts right (b) demand shifts left (c) supply shifts right (d) nothing until next month.
**Answer: (a)**, so P↑ and Q↑ today. Extension: if dealers also hold stock back to sell later at higher prices, supply today shifts left, P rises further, and Q becomes ambiguous (case 7).

**Q6.** Farmers can grow wheat or cotton on the same land, and the price of wheat rises. The supply of cotton:
**Answer:** shifts **left** (substitute in production), so cotton P↑ and Q↓.

**Q7.** The price of beef rises. In the leather market:
**Answer:** supply shifts **right** (joint product), so leather P↓ and Q↑.

**Q8.** Which statement is correct?
(a) "When demand rises, price rises, which increases supply."
(b) "When demand rises, price rises, which increases the quantity supplied."
(c) "When supply falls, price rises, which reduces demand."
(d) "A fall in price shifts the demand curve right."
**Answer: (b).** A shift in one curve causes a movement along the other.

#### Graph scenarios (sketch each)
**Q9.** New technology cuts the cost of making solar panels, and at the same time households get an installation subsidy. P and Q?
**Answer:** supply shifts right and demand shifts right. **Q↑ for sure; P is ambiguous.** P falls if the supply shift is bigger and rises if the demand shift is bigger (case 5).

**Q10.** A drought cuts Brazil's coffee harvest, and at the same time a study finds coffee is good for the heart.
**Answer:** supply shifts left and demand shifts right. **P↑ for sure; Q is ambiguous** (case 7).

**Q11.** A stadium has 50,000 seats for a K-pop concert. Face value is 150,000 won, and at that price 90,000 fans want tickets.
- (a) Shortage? **40,000.**
- (b) Supply is vertical at 50,000. If the group's popularity rises further, the market-clearing price **rises** and the quantity **stays 50,000**.
- (c) Why does resale exceed face value? Face value is **below** the market-clearing price, and resellers capture part of the gap.
- (d) Is allocation by queue or lottery efficient? Generally no. Tickets may go to fans with lower WTP than others who miss out, which is inefficient allocation among consumers.

**Q12.** The four-step method applied to Busan hotel rooms on a BTS concert night when room supply is fixed.
**Answer:** Step 1, draw D and a vertical S. Step 2, demand is affected (tastes and number of consumers). Step 3, demand shifts right. Step 4, the price rises a lot and the quantity of rooms is unchanged. The real data matched this: rates up to 7.5× normal.

#### Numeric
**Q13.** Qd = 120 − 3P and Qs = 2P − 10.
- (a) P\*, Q\*? **P\* = 26, Q\* = 42.**
- (b) At P = 20? Qd = 60 and Qs = 30, a **shortage of 30**.
- (c) CS, PS, TS? The choke price is 40, so CS = ½·42·14 = **294**. The minimum supply price is 5, so PS = ½·42·21 = **441**. TS = **735**.

**Q14.** There are 100 identical consumers, each with q = 12 − 2P, and 50 identical firms, each with q = 4P − 4 (for P ≥ 1).
- Market demand: Q = 1,200 − 200P. Market supply: Q = 200P − 200.
- Equilibrium: **P\* = 3.5, Q\* = 500.** Each consumer buys 5 and each firm sells 10.

**Q15.** Inverse demand is P = 60 − Q, and the price falls from 40 to 30. Change in CS?
**Answer:** CS goes from ½·20·20 = 200 to ½·30·30 = 450, so **ΔCS = +250**. That is 200 (rectangle: 20 existing buyers save 10 each) + 50 (triangle: 10 new buyers).

**Q16.** Four buyers have WTP of 50, 40, 30 and 20.
- At a price of 25, three buy and CS = 25 + 15 + 5 = **45**.
- At a price of 35, two buy and CS = 15 + 5 = **20**.

**Q17 (calculus).** Inverse demand P = 100 − Q² and inverse supply P = 4 + 10Q.
**Answer:** Q\* = 6 and P\* = 64. CS = ∫₀⁶(36 − Q²)dQ = **144**; PS = ∫₀⁶(60 − 10Q)dQ = **180**; TS = **324**.

**Q18 (calculus, comparative statics).** Qd = a − 2P and Qs = −20 + 4P. Find dP\*/da and dQ\*/da, then the new equilibrium when a rises from 100 to 130.
**Answer:** P\* = (a + 20)/6, so dP\*/da = **1/6**. Q\* = (2a − 20)/3, so dQ\*/da = **2/3**. At a = 130: **P\* = 25, Q\* = 80**.

**Q19 (stretch: price ceiling, a Chapter 4 link).** In Q13's market a price ceiling is set at P = 20.
- Quantity traded = Qs = **30**; shortage = **30**.
- With efficient rationing, CS = ∫₀³⁰(40 − Q/3 − 20)dQ = **450** and PS = ∫₀³⁰(20 − 5 − Q/2)dQ = **225**.
- TS = 675, so the **deadweight loss is 60**. Check: ½ × (42 − 30) × (30 − 20) = 60.
- Consumers as a group can gain (294 → 450) even though total surplus falls.

**Q20 (illegal goods + Uzbekistan application).**
- (a) Black market Qd = 100 − 2P, Qs = 4P − 20. A crackdown on sellers makes Qs = 4P − 50.
  **Answer:** P = 25 and Q = 50. Spending rises from 1,200 to 1,250 because demand is inelastic over this range. If buyers are penalized instead (Qd = 70 − 2P): P = 15, Q = 40.
- (b) Before September 2017, Uzbekistan held the official price of a dollar near 4,210 so'm while the black-market price was about 7,700–8,000. Name the control and its consequences.
  **Answer:** a **binding price ceiling** on dollars. The result was a shortage of dollars at the official price, rationing and conversion delays, and a black market. Setting the rate at 8,100 on 5 Sep 2017 removed the shortage and the black-market gap. The so'm price of a dollar rose ≈92%, which is the so'm losing ≈48% of its value (the IMF says "depreciated by 50 percent").

#### Master trap catalogue (check before every answer)
1. Demand vs quantity demanded, and supply vs quantity supplied.
2. A good's own price never shifts its own curve.
3. A shift in one curve causes a movement along the other, never a shift of the other.
4. Inferior good plus higher income means demand shifts **left**.
5. Substitute/complement in **consumption** shift demand; in **production** they shift supply.
6. Buyer expectations of a higher future price raise demand now; seller expectations of a higher future price cut supply now.
7. Taxes or regulation on sellers shift supply left; subsidies to sellers shift it right.
8. In two-shift questions exactly one of P or Q is ambiguous. Same direction means quantity is certain; opposite directions mean price is certain.
9. Market demand and supply are **horizontal** sums. Watch the kinks and never allow negative quantities.
10. "Surplus" (excess supply) is not "producer surplus".
11. A ceiling binds only below equilibrium and a floor only above. Quantity traded is the short side.
12. CS height = choke price − P; PS height = P − minimum supply price; the base is the quantity actually traded.
13. A price change with fixed curves transfers surplus (rectangle) and adds or removes trades (triangle).
14. The equilibrium maximizes **total** surplus. Efficiency is not fairness.
15. With fixed capacity (seats, rooms) a demand shift changes only the price.
16. Seller crackdowns raise the price of illegal goods, and spending may rise if demand is inelastic.
17. Observed P and Q pairs are equilibria, not points on a single demand curve.

### Gaps
- None of these questions comes from the INHA instructor, so the actual midterm's format and weighting are unknown. Use the course slides and past quizzes to calibrate.
- The Syracuse practice solutions were located by search but not opened, so their exact coverage is unverified.

---

## 9. Best free resources (legitimate, no pirated textbooks)

### Takeaway
For a one-week sprint: **OpenStax Ch. 3** covers the theory with free end-of-chapter problems, **MRU videos** give 5-minute intuition, **Khan Academy** gives drill practice, and **UNL Applied Calculus §4.5** covers the integral version of CS/PS. Add the World Bank, EIA and news items above for real-world examples.

### Cited Findings
- **OpenStax *Principles of Economics 3e*, Chapter 3 (free online):**
  - [3.1 Demand, supply, equilibrium](https://openstax.org/books/principles-economics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services) — definitions, gasoline schedule, shortage/surplus adjustment
  - [3.2 Shifts](https://openstax.org/books/principles-economics-3e/pages/3-2-shifts-in-demand-and-supply-for-goods-and-services) — shifters, normal/inferior, substitutes/complements
  - [3.3 Four-step process](https://openstax.org/books/principles-economics-3e/pages/3-3-changes-in-equilibrium-price-and-quantity-the-four-step-process) — single and simultaneous shifts
  - [3.4 Price ceilings and floors](https://openstax.org/books/principles-economics-3e/pages/3-4-price-ceilings-and-price-floors)
  - [3.5 Demand, supply, and efficiency](https://openstax.org/books/principles-economics-3e/pages/3-5-demand-supply-and-efficiency) — CS, PS, social surplus, deadweight loss
- **Marginal Revolution University (Principles of Microeconomics):**
  - videos on [consumer surplus](https://mru.org/courses/principles-economics-microeconomics/consumer-surplus) and on [equilibrium and the producer/consumer surplus graph](https://mru.org/courses/principles-economics-microeconomics/equilibrium-supply-demand)
  - a [video-mapped syllabus](https://mru.org/teacher-resources/principles-microeconomics-syllabus)
  - Videos are "bite-size" (about 5 minutes) and free for non-commercial use (per search excerpts).
- **Khan Academy Microeconomics:** Unit 2 "Supply, demand, and market equilibrium" and Unit 4 "Consumer and producer surplus, market interventions, and international trade" — [Khan Academy Microeconomics](https://en.khanacademy.org/science/microeconomics); also [AP Microeconomics](https://www.khanacademy.org/economics-finance-domain/ap-microeconomics) (unit names per search excerpt)
- **Calculus version of surplus:** [UNL Applied Calculus §4.5 Consumer and Producer Surplus](https://mathbooks.unl.edu/AppliedCalculus/sec-4-5-consumer-producer-surplus.html)
- **Illegal-goods application:** [National Academies, *Understanding the Demand for Illegal Drugs*, ch. 2](https://www.nationalacademies.org/read/12976/chapter/4) (free to read online)
- **Live real-world supply-shock data:** [World Bank commodity blog on coffee and cocoa](https://blogs.worldbank.org/en/opendata/beverage-prices-retreat-as-supplies-recover); [EIA: factors affecting gasoline prices](https://www.eia.gov/energyexplained/gasoline/factors-affecting-gasoline-prices.php)

### Inferences

#### 9.1 A 5-day plan (Mon 19 – Fri 23 Oct, in case the midterm falls on Sat 24 Oct)
- **Day 1:** OpenStax 3.1–3.2 plus Sections 1–3 here. Do the 20-item classification drill (Section 2.2) twice, aloud, using the movement/shift wording.
- **Day 2:** OpenStax 3.3 plus Section 5. Draw all 8 cases from memory, then do Q9–Q12. Explain one real case (BTS hotels or coffee) in four steps.
- **Day 3:** Section 4 plus OpenStax 3.4. Solve Qd = Qs for 5 made-up linear pairs and compute the shortage or surplus at an off-equilibrium price. Work through the Uzbekistan FX ceiling story.
- **Day 4:** Section 6, OpenStax 3.5 and the MRU consumer-surplus video. Do Q13–Q19 by hand, then check with the integral formulas.
- **Day 5:** Section 7, then a timed run of all 20 questions. Re-read the master trap catalogue and compare with the class slides' notation (Krugman's labels for curves, points and shifters).

### Gaps
- The suggested MIT OpenCourseWare 14.01 course page (URL tried: ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2018/) returned 404 in this session, so no verified MIT OCW link is given.
- Krugman/Macmillan student resources (e.g., Achieve) need a paid login and were not used.
- Scribd/Studocu "practice midterm" uploads came up in searches. They are user-uploaded, of uncertain legality and accuracy, and were deliberately not recommended.
