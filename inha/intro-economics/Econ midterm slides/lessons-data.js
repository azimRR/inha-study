/* merged from lessons/L*.json */
const LESSONS = [
 {
  "id": "Q1-2",
  "label": "Q1–Q2",
  "week": 1,
  "slides": [
   48,
   49,
   50,
   51
  ],
  "kind": "theory",
  "title": "Equilibrium, efficiency vs equity, and when government should step in",
  "hook": "These 4 slides are interaction principles 2–5. After this lesson you can define equilibrium, efficiency and equity, and say the 3 cases when markets fail.",
  "cards": [
   {
    "h": "Where these slides sit",
    "body": "<p>The course has <b>12 principles</b>: 4 on individual choice + <b>5 on interaction</b> + 3 on the whole economy.</p><p>\"Interaction\" means: my choice meets your choice. I buy, you sell. The 5 interaction principles (slide 33) are:</p><ol><li>There are gains from trade.</li><li><b>Markets move toward equilibrium.</b> (slide 48)</li><li><b>Resources should be used as efficiently as possible to achieve society's goals.</b> (slide 49)</li><li><b>Markets usually lead to efficiency.</b> (slide 50)</li><li><b>When markets don't achieve efficiency, government intervention can improve society's welfare.</b> (slide 51)</li></ol><p>Your two questions come from numbers 2–5. One slide = one principle.</p>"
   },
   {
    "h": "Equilibrium: nobody wants to move (slide 48)",
    "body": "<p>Picture a supermarket with 6 checkout lines. One line is very short. What do people do? They move to it. Now that line gets longer and the others get shorter.</p><p>Soon all lines are about the same. Now nobody gains by switching. Everybody stays. This is <b>equilibrium</b>.</p><p><b>Slide definition:</b> an economic situation is in equilibrium when <b>no individual would be better off doing something different</b>.</p><p>The key idea is \"move toward\". Nobody plans it. Each person just looks after himself, and the system settles by itself.</p>"
   },
   {
    "h": "The same idea in a market (picture)",
    "body": "<p>Bread at a Tashkent bazaar. If the price is too high, bakers bring more bread than people want. Bread is left over, so bakers cut the price.</p><p>If the price is too low, people want more bread than there is. Bread runs out, so sellers raise the price.</p><p>The price stops moving only where buyers want exactly what sellers bring: point <b>E</b>. There, no buyer and no seller would be better off doing something different. (You learn this graph fully in week 3.)</p>",
    "chart": {
     "x": "Bread (hundreds of loaves per day)",
     "y": "Price (thousand so'm)",
     "xmax": 12,
     "ymax": 11,
     "xticks": [
      2,
      5,
      8
     ],
     "yticks": [
      2,
      5,
      8
     ],
     "lines": [
      {
       "pts": [
        [
         0.5,
         9.5
        ],
        [
         9.5,
         0.5
        ]
       ],
       "label": "D",
       "role": "demand"
      },
      {
       "pts": [
        [
         0.5,
         0.5
        ],
        [
         9.5,
         9.5
        ]
       ],
       "label": "S",
       "role": "supply"
      }
     ],
     "hlines": [
      {
       "y": 8,
       "label": "Too high: surplus",
       "role": "other"
      },
      {
       "y": 2,
       "label": "Too low: shortage",
       "role": "other"
      }
     ],
     "points": [
      {
       "x": 5,
       "y": 5,
       "label": "E",
       "guides": true
      },
      {
       "x": 2,
       "y": 8
      },
      {
       "x": 8,
       "y": 8
      },
      {
       "x": 8,
       "y": 2
      },
      {
       "x": 2,
       "y": 2
      }
     ],
     "arrows": [
      {
       "from": [
        5,
        7.6
       ],
       "to": [
        5,
        5.6
       ],
       "label": "price falls"
      },
      {
       "from": [
        5,
        2.4
       ],
       "to": [
        5,
        4.4
       ],
       "label": "price rises"
      }
     ],
     "caption": "At 8: buyers want 2, sellers bring 8, so 6 are left over and the price falls. At 2: buyers want 8, sellers bring 2, so 6 are missing and the price rises. It stops at E (price 5, quantity 5)."
    }
   },
   {
    "h": "Efficiency vs equity (slide 49)",
    "body": "<p><b>Efficient:</b> an economy is efficient if it <b>takes all opportunities to make some people better off without making other people worse off</b>.</p><p>Simple test: is there still a free win? On a bus, a seat is empty and an old man is standing. If he sits, he gains and nobody loses. While that seat stays empty, the situation is <b>not efficient</b>. A chance is wasted.</p><p><b>Equity:</b> everyone gets his or her <b>fair share</b>.</p><p>Problem: people disagree about what is \"fair\". Equal pieces for all? More for people who work harder? More for poor people? So <b>equity isn't as well-defined a concept as efficiency</b>. Efficiency has a clear test. Fairness is an opinion.</p><p>The slide title says resources should be used efficiently <b>to achieve society's goals</b>. Society decides its goals (equity is often one of them). Efficiency means not wasting resources on the way there.</p>",
    "chart": {
     "x": "Cotton (thousand tons)",
     "y": "Bread (thousand tons)",
     "xmax": 12,
     "ymax": 12,
     "xticks": [
      2,
      4,
      6,
      8,
      10
     ],
     "yticks": [
      2,
      4,
      6,
      8,
      10
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         10
        ],
        [
         4,
         9.17
        ],
        [
         6,
         8
        ],
        [
         8,
         6
        ],
        [
         9.17,
         4
        ],
        [
         10,
         0
        ]
       ],
       "label": "PPF",
       "role": "ppf"
      }
     ],
     "points": [
      {
       "x": 4,
       "y": 5,
       "label": "A: inside = waste"
      },
      {
       "x": 6,
       "y": 8,
       "label": "B: on the line = efficient"
      }
     ],
     "arrows": [
      {
       "from": [
        4,
        5.4
       ],
       "to": [
        4,
        8.9
       ]
      }
     ],
     "caption": "At A some workers or land are idle. We can get more bread with no less cotton (arrow), so someone gains and nobody loses: A is not efficient. On the curve (like B) you can only get more of one thing by giving up the other."
    }
   },
   {
    "h": "Markets usually lead to efficiency (slide 50)",
    "body": "<p>Why do markets usually avoid waste? Because of <b>incentives</b>.</p><ul><li>A baker wants profit, so he makes bread that people will pay for.</li><li>A buyer wants a good deal, so he buys when the bread is worth the price to him.</li></ul><p>If a trade would help both sides, someone will usually find it and do it. Nobody needs to order them.</p><p>Slide wording to learn: the incentives built into a market economy already ensure that resources are usually put <b>to good use</b>, that <b>opportunities</b> to make people better off <b>are not wasted</b>.</p><p>Note the word <b>usually</b>. Not always. That leads to the next slide.</p>"
   },
   {
    "h": "When markets fail, government can help (slide 51)",
    "body": "<p>Slide 51 gives <b>3 cases</b> where the market does not reach efficiency:</p><table><tr><th>Case</th><th>Meaning</th><th>Example</th></tr><tr><td>1. Side effects</td><td>Individual actions have <i>side effects</i> that the market does not count properly.</td><td>A factory smokes up the air of the neighbours. The neighbours are not part of the deal, so nobody pays them. (Textbook word: externality.)</td></tr><tr><td>2. One party blocks trades</td><td>One party prevents mutually beneficial trades to capture a greater share of resources for itself.</td><td><b>Monopoly</b>: the only seller sets a high price, so some good trades never happen.</td></tr><tr><td>3. Goods unsuited for markets</td><td>Some goods, by their very nature, are unsuited for efficient management by markets.</td><td><b>Drugs</b> (the slide's example).</td></tr></table><p>In these cases, <b>government intervention can improve society's welfare</b>. Note \"can\": it is possible, not automatic.</p>"
   }
  ],
  "example": {
   "problem": "<p>At a bazaar, two bread stalls stand side by side. Stall X sells a loaf for 5,000 so'm and Stall Y for 3,000 so'm. Same bread. (a) Is this an equilibrium? What will happen? (b) A city has empty flats while families live on the street, and the owners would happily rent them out at a price the families could pay. Is this efficient?</p>",
   "solution": "<p><b>(a)</b> No. Buyers at X would be better off buying at Y. So the situation is not an equilibrium (someone would be better off doing something different). Buyers move to Y. Y sells out and can raise its price. X loses buyers and must cut its price. The prices move toward each other until no buyer gains by switching. That is equilibrium.</p><p><b>(b)</b> Not efficient. Renting the flat makes the family better off and the owner better off, and nobody is worse off. This chance is not taken, so the economy is not efficient. If the market cannot fix it, government intervention can improve welfare.</p>"
  },
  "check": [
   {
    "q": "Define equilibrium in one sentence.",
    "a": "A situation where no individual would be better off doing something different."
   },
   {
    "q": "What is the picture on slide 48, and why?",
    "a": "Supermarket checkout lines. People switch to shorter lines until all lines are about equal; then nobody gains by switching = equilibrium."
   },
   {
    "q": "Why is equity less well-defined than efficiency?",
    "a": "Because people disagree about what is \"fair\". Efficiency has a clear test (no free win left untaken)."
   },
   {
    "q": "What makes markets usually efficient?",
    "a": "The <b>incentives</b> built into a market economy: resources go to good use and opportunities are not wasted."
   },
   {
    "q": "Name the 3 cases on slide 51 and their examples.",
    "a": "Side effects (e.g. pollution); one party blocks good trades (monopoly); goods unsuited for markets (drugs)."
   }
  ],
  "exam": {
   "question": "<p><b>Q1.</b> What does \"markets move toward equilibrium\" mean? Define equilibrium and explain it with the supermarket checkout example.</p><p><b>Q2.</b> Define efficiency and equity. Why is equity less well-defined? Markets usually lead to efficiency; when they do not, how can government help? Give the three cases.</p>",
   "answer": "<p><b>Q1.</b> An economic situation is in <b>equilibrium</b> when no individual would be better off doing something different. Markets move toward equilibrium by themselves. Example: in a supermarket, if one checkout line is shorter, shoppers switch to it. That line grows and the others shrink, until all lines are about the same length. Then no shopper can gain by switching, so nobody changes. This is equilibrium.</p><p><b>Q2.</b></p><ul><li><b>Efficiency:</b> an economy is efficient if it takes all opportunities to make some people better off without making other people worse off. Resources should be used as efficiently as possible to achieve society's goals.</li><li><b>Equity:</b> everyone gets his or her fair share. People disagree about what is \"fair\", so equity isn't as well-defined a concept as efficiency.</li><li><b>Markets usually lead to efficiency:</b> the incentives built into a market economy ensure that resources are usually put to good use and opportunities to make people better off are not wasted.</li><li><b>When markets don't achieve efficiency, government intervention can improve society's welfare.</b> This happens when: (1) individual actions have side effects the market does not take into account properly (e.g. pollution); (2) one party prevents mutually beneficial trades to capture a greater share of resources for itself (e.g. monopoly); (3) some goods, by their very nature, are unsuited for efficient management by markets (e.g. drugs).</li></ul>"
  },
  "memorize": [
   "Equilibrium = no individual would be better off doing something different (checkout lines)",
   "Efficient = takes ALL chances to make some better off without making others worse off",
   "Equity = fair share; less well-defined, because people disagree about \"fair\"",
   "Markets usually efficient because of incentives: resources to good use, chances not wasted",
   "Market fails → government CAN improve welfare: side effects, monopoly, drugs"
  ],
  "note": "The professor said slides 48–51 give two questions but not how they are split. Most likely Q1 = equilibrium (48) and Q2 = efficiency/equity and government (49–51); the lesson covers all four either way."
 },
 {
  "id": "Q3",
  "label": "Q3",
  "week": 1,
  "slides": [
   12
  ],
  "kind": "theory",
  "title": "The questions economics asks",
  "hook": "Slide 12 lists the big questions of economics. After this lesson you can list all five groups and say what joins them.",
  "cards": [
   {
    "h": "First: what economics is (slide 11, just before)",
    "body": "<p>Economics is a <b>social science</b>. It studies the <b>production, distribution and consumption</b> of goods and services.</p><p>It looks at how <b>individuals, businesses, governments and nations</b> make choices about how to use resources. It assumes people act <b>rationally</b> (they try to do what is best for them).</p><p>Slide 12 then says economics is a <b>scientific study on the economy</b>, and lists the questions it tries to answer.</p>"
   },
   {
    "h": "Think of one bakery in Tashkent",
    "body": "<p>A family opens a bakery near Chorsu bazaar. Look at all the questions they face:</p><ul><li>How many workers do we hire? (<b>jobs</b>)</li><li>Bread or cakes? How many loaves? A tandir oven by hand or a machine? (<b>production</b>)</li><li>Who gets the bread, and how much each? (<b>distribution</b>)</li><li>And each customer asks: bread or rice today? How much? (<b>consumption</b>)</li></ul><p>Now make it a whole country. Why is one country rich and another poor? That is the fifth question. Every one of these is an economics question.</p>"
   },
   {
    "h": "The 5 groups of questions (slide 12)",
    "body": "<table><tr><th>Group</th><th>The questions on the slide</th></tr><tr><td><b>Jobs</b></td><td>Who creates jobs? What kinds of jobs? How many jobs are created?</td></tr><tr><td><b>Production</b></td><td>What to produce? How much? How to produce?</td></tr><tr><td><b>Distribution</b></td><td>Who gets, how much?</td></tr><tr><td><b>Consumption</b></td><td>Consume what? How much?</td></tr><tr><td><b>Rich vs poor countries</b></td><td>Why are some countries richer and other countries poor?</td></tr></table><p>Memory trick: <b>J-P-D-C + rich/poor</b>. Production has <b>3</b> questions (what, how much, how). Distribution, consumption: <b>2</b> each.</p>"
   },
   {
    "h": "The key line: common principles",
    "body": "<p>The last line is in red on the slide: <b>\"All these questions are based on a set of common principles.\"</b></p><p>So economics is not a list of separate topics. The same few ideas answer all of them. In this course these are the <b>12 economic principles</b> (slide 15):</p><ul><li><b>4</b> on individual choice (e.g. resources are scarce; the real cost is what you give up)</li><li><b>5</b> on interaction (e.g. there are gains from trade)</li><li><b>3</b> on economy-wide interactions (e.g. one person's spending is another person's income)</li></ul><p>4 + 5 + 3 = 12.</p>"
   }
  ],
  "example": {
   "problem": "<p>Put each question into the right group from slide 12: (a) Should Uzbekistan grow more cotton or more wheat? (b) Will a new car factory in Andijan create 2,000 jobs? (c) Why is Korea richer than many other countries? (d) Should a family spend its money on a new phone or on food? (e) Who gets the new flats that the city builds?</p>",
   "solution": "<p>(a) <b>Production</b>: what to produce. (b) <b>Jobs</b>: how many jobs are created. (c) <b>Rich vs poor countries</b>. (d) <b>Consumption</b>: consume what. (e) <b>Distribution</b>: who gets.</p>"
  },
  "check": [
   {
    "q": "What are the 3 production questions?",
    "a": "What to produce? How much? How to produce?"
   },
   {
    "q": "What are the distribution questions?",
    "a": "Who gets, how much?"
   },
   {
    "q": "What do all the questions have in common?",
    "a": "They are all based on a set of <b>common principles</b> (the 12 principles: 4 + 5 + 3)."
   },
   {
    "q": "Which question is about whole countries?",
    "a": "Why are some countries richer and other countries poor?"
   }
  ],
  "exam": {
   "question": "<p>Economics is a scientific study of the economy. What questions does economics try to answer? List them and say what they have in common.</p>",
   "answer": "<p>Economics is the scientific study of the economy. It asks questions about:</p><ol><li><b>Jobs:</b> who creates jobs, what kinds of jobs, and how many jobs are created.</li><li><b>Production:</b> what to produce, how much to produce, and how to produce it.</li><li><b>Distribution:</b> who gets the goods and how much each gets.</li><li><b>Consumption:</b> what to consume and how much.</li><li><b>Rich and poor countries:</b> why some countries are richer and other countries are poor.</li></ol><p>All these questions are based on a set of <b>common principles</b>: the 12 economic principles (4 on individual choice, 5 on interaction, 3 on economy-wide interactions).</p>"
  },
  "memorize": [
   "Economics = scientific study on the economy",
   "5 groups: Jobs, Production, Distribution, Consumption, rich vs poor countries",
   "Production: what? how much? how?",
   "Distribution: who gets, how much? Consumption: what? how much?",
   "All based on common principles (12 = 4 + 5 + 3)"
  ]
 },
 {
  "id": "Q4",
  "label": "Q4",
  "week": 1,
  "slides": [
   33
  ],
  "kind": "theory",
  "title": "The five principles of interaction",
  "hook": "Slide 33 is a list of 5 principles. After this lesson you can write all five in order and explain each in one or two lines.",
  "cards": [
   {
    "h": "Why \"interaction\"?",
    "body": "<p>Slide 14: the most basic idea in economics is that <b>individuals make choices</b>. But in modern society, my choice is shaped by other people's choices. <b>Our choices interact.</b></p><p>When you buy a phone, a seller sells it, a factory made it, workers were paid. The 5 principles on slide 33 explain what happens when many people's choices meet.</p><p>The full plan of the 12 principles: <b>I.</b> 4 on individual choice → <b>II. 5 on interaction</b> → <b>III.</b> 3 on economy-wide interactions.</p>"
   },
   {
    "h": "The list on slide 33",
    "body": "<p>Title of the table: <i>Principles That Underlie the Interaction of Individual Choices</i>.</p><ol><li><b>There are gains from trade.</b></li><li><b>Markets move toward equilibrium.</b></li><li><b>Resources should be used as efficiently as possible to achieve society's goals.</b></li><li><b>Markets usually lead to efficiency.</b></li><li><b>When markets don't achieve efficiency, government intervention can improve society's welfare.</b></li></ol><p>Memory story: people <b>trade</b> (1) → the market <b>settles</b> (2) → we want <b>no waste</b> (3) → markets <b>usually</b> give no waste (4) → if not, the <b>government</b> can help (5).</p>"
   },
   {
    "h": "Principle 1: gains from trade",
    "body": "<p>People get <b>more of what they want</b> by trading than by trying to make everything themselves (being self-sufficient). Why? <b>Specialization</b>: each person does the task he or she is good at.</p><p>Small example (my numbers). In one day Ali can bake 10 loaves or sew 5 shirts. Bobur can bake 4 loaves or sew 4 shirts.</p><table><tr><th></th><th>Bread</th><th>Shirts</th></tr><tr><td>Each spends half a day on each good (no trade)</td><td>5 + 2 = 7</td><td>2.5 + 2 = 4.5</td></tr><tr><td>Bobur only sews; Ali bakes 0.8 day, sews 0.2 day</td><td>8 + 0 = 8</td><td>1 + 4 = 5</td></tr></table><p>Same people, same day, but <b>more of both goods</b>. Then they trade, and both can end up better off. That is the gain from trade. (Bobur sews because a shirt costs him only 1 loaf, but costs Ali 2 loaves: comparative advantage, slide 44.)</p>"
   },
   {
    "h": "Principles 2 and 3: equilibrium and efficiency",
    "body": "<p><b>2. Markets move toward equilibrium.</b> Equilibrium = <b>no individual would be better off doing something different</b>. Example: supermarket checkout lines. People switch to the short line until all lines are equal, then nobody switches.</p><p><b>3. Resources should be used as efficiently as possible to achieve society's goals.</b> An economy is <b>efficient</b> if it takes all opportunities to make some people better off without making other people worse off. <b>Equity</b> (everyone gets a fair share) is different, and less well-defined, because people disagree about what is \"fair\".</p>"
   },
   {
    "h": "Principles 4 and 5: markets and government",
    "body": "<p><b>4. Markets usually lead to efficiency.</b> The <b>incentives</b> in a market economy (profit for sellers, good deals for buyers) usually put resources to good use, so chances to make people better off are not wasted.</p><p><b>5. When markets don't achieve efficiency, government intervention can improve society's welfare.</b> Three cases (slide 51):</p><ul><li>actions have <b>side effects</b> the market does not count (e.g. pollution);</li><li>one party blocks good trades to grab more for itself (<b>monopoly</b>);</li><li>some goods by nature are unsuited for markets (<b>drugs</b>).</li></ul>"
   }
  ],
  "example": {
   "problem": "<p>Which interaction principle does each story show? (a) A taxi app shows one driver charging much more than others; riders choose the cheaper drivers until prices are similar. (b) A chemical plant pours waste into a river and fishermen downstream lose their catch; the government sets a rule. (c) A farmer grows only melons and buys his clothes and phone instead of making them. (d) A field lies empty while people nearby want to farm it and the owner would gladly rent it.</p>",
   "solution": "<p>(a) <b>2. Markets move toward equilibrium</b>: people switch until nobody gains from switching. (b) <b>5. Government intervention can improve welfare</b>: a side effect the market did not count. (c) <b>1. Gains from trade</b>: he specializes and trades. (d) <b>3. Efficiency</b>: a chance to make people better off without hurting anyone is wasted, so it is not efficient. (If the market usually fixes this by renting it out, that is principle 4.)</p>"
  },
  "check": [
   {
    "q": "How many principles are on individual choice, interaction and the economy as a whole?",
    "a": "4 + 5 + 3 = 12."
   },
   {
    "q": "Say the 5 interaction principles in order.",
    "a": "Gains from trade; markets move toward equilibrium; use resources as efficiently as possible to achieve society's goals; markets usually lead to efficiency; when they don't, government intervention can improve society's welfare."
   },
   {
    "q": "Where do gains from trade come from?",
    "a": "Specialization: each person does the task he or she is good at."
   },
   {
    "q": "Which word in principle 4 is important, and why?",
    "a": "\"Usually\". Markets are not always efficient, which is why principle 5 exists."
   }
  ],
  "exam": {
   "question": "<p>List the five principles that underlie the interaction of individual choices, and briefly explain each one.</p>",
   "answer": "<ol><li><b>There are gains from trade.</b> Through trade, people get more of what they want than if they tried to be self-sufficient. The increase in output comes from specialization: each person does the task he or she is good at.</li><li><b>Markets move toward equilibrium.</b> A situation is in equilibrium when no individual would be better off doing something different (e.g. supermarket checkout lines become about equal).</li><li><b>Resources should be used as efficiently as possible to achieve society's goals.</b> An economy is efficient if it takes all opportunities to make some people better off without making others worse off. (Equity = everyone gets a fair share; it is less well-defined, because people disagree about what is fair.)</li><li><b>Markets usually lead to efficiency.</b> The incentives built into a market economy usually put resources to good use, so opportunities to make people better off are not wasted.</li><li><b>When markets don't achieve efficiency, government intervention can improve society's welfare.</b> E.g. side effects not counted by the market (pollution), monopoly, and goods unsuited for markets (drugs).</li></ol>"
  },
  "memorize": [
   "12 principles = 4 individual choice + 5 interaction + 3 economy-wide",
   "1 Gains from trade (specialization)",
   "2 Markets move toward equilibrium",
   "3 Use resources as efficiently as possible to achieve society's goals",
   "4 Markets usually lead to efficiency",
   "5 If markets fail, government intervention can improve society's welfare"
  ],
  "note": "Slide 33 is only the heading plus the 5-item list, so the exam probably asks you to list and explain the five. The explanations come from slides 34–51."
 },
 {
  "id": "Q8",
  "label": "Q8",
  "week": 1,
  "slides": [
   25,
   26,
   27,
   28
  ],
  "kind": "theory",
  "title": "Opportunity cost: there is no such thing as a free lunch",
  "hook": "After this lesson you can define opportunity cost, explain the \"free lunch\" saying, and find the opportunity cost in any choice, even one that costs no money.",
  "cards": [
   {
    "h": "Why we must choose",
    "body": "<p>Just before these slides (slides 23–24): a <b>resource</b> is anything used for production, like labor, land, capital and also <b>time</b>. All resources are <b>scarce</b> because they are finite (limited).</p><p>You have 24 hours a day and limited money. So you cannot have everything. You must <b>choose</b>. And every choice has a cost.</p>"
   },
   {
    "h": "\"No such thing as a free lunch\" (slide 25)",
    "body": "<p>The saying is linked to the American economist <b>Milton Friedman</b>. It describes <b>opportunity cost</b>.</p><p>A friend invites you to a \"free\" plov lunch. You pay no money. But the lunch takes 2 hours. In those 2 hours you could study for the midterm or work. So the lunch is <b>not really free</b>.</p><p>Slide rule: <b>every choice has at least one alternative that we passed up.</b></p>"
   },
   {
    "h": "Choosing = giving up (slide 26)",
    "body": "<p>The picture: a boy at a drinks machine with his hands on his head. He has money for one drink. If he picks cola, he gives up the juice.</p><p>Slide rule: <b>choosing one thing means we're giving up an alternative.</b></p><p>Every \"yes\" to one thing is a \"no\" to something else.</p>"
   },
   {
    "h": "Time always costs something (slide 27)",
    "body": "<p><b>Every activity has the opportunity cost of time.</b></p><ul><li>This includes activities with <b>no monetary cost</b>. The picture is a hiker in the mountains: hiking is free, but it uses your whole day.</li><li>It also includes the activity of <b>searching for alternatives</b>, like looking for a new job. Searching takes time, and that time could be used for something else.</li></ul><p>So \"it costs no money\" never means \"it costs nothing\".</p>"
   },
   {
    "h": "The definition (slide 28)",
    "body": "<p><b>Opportunity cost = the value of the next-best alternative</b> (what you give up).</p><p>For any decision, ask yourself two questions:</p><ul><li>How much do I value this?</li><li>What am I giving up now to have it?</li></ul><p>Opportunity cost is often expressed in <b>market prices</b> (money), e.g. \"the hike cost me $40 of lost wages\".</p><p><b>Careful:</b> count only the <b>next-best</b> option, the one you would really have done. Do not add up all the options you did not choose.</p><p>(Small typo on the slide: \"is often is expressed\" should read \"is often expressed\". Same meaning.)</p>"
   },
   {
    "h": "See it on a graph",
    "body": "<p>Saturday: you have 5 free hours. Your next-best option is a job that pays <b>$8 an hour</b>. Every hour you hike is an hour you do not work.</p><p>So each hour of hiking costs <b>$8</b>. Hike 2 hours: you still work 3 hours and earn 3 × $8 = $24 instead of $40. Hike all 5 hours: the opportunity cost is 5 × $8 = <b>$40</b>.</p>",
    "chart": {
     "x": "Hours hiking on Saturday",
     "y": "Money earned ($)",
     "xmax": 7,
     "ymax": 50,
     "xticks": [
      1,
      2,
      3,
      4,
      5
     ],
     "yticks": [
      8,
      16,
      24,
      32,
      40
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         40
        ],
        [
         5,
         0
        ]
       ],
       "role": "ppf"
      }
     ],
     "points": [
      {
       "x": 0,
       "y": 40,
       "label": "All work: $40"
      },
      {
       "x": 2,
       "y": 24,
       "label": "2 h hiking, $24",
       "guides": true
      },
      {
       "x": 5,
       "y": 0,
       "label": "All hiking: $0"
      }
     ],
     "caption": "5 free hours, a job that pays $8 an hour. Every hour of hiking moves you down the line by $8. That $8 is the opportunity cost of one hour of hiking."
    }
   }
  ],
  "example": {
   "problem": "<p>Dilnoza has a free Saturday. Her options: (a) go to a free concert in the park, (b) work 6 hours in a café for 50,000 so'm an hour, (c) sleep. If she did not go to the concert, she would work. What is the opportunity cost of the concert? Is the concert free?</p>",
   "solution": "<p><b>Step 1.</b> Find the next-best alternative: working in the café (she says she would work, not sleep).</p><p><b>Step 2.</b> Find its value: 6 × 50,000 = <b>300,000 so'm</b>.</p><p><b>Step 3.</b> Opportunity cost of the concert = 300,000 so'm (the wages she gives up). We do <b>not</b> add the value of sleeping, because she can only use the day once and sleep is not her next-best choice.</p><p><b>Step 4.</b> The ticket costs no money, but the concert is <b>not free</b>. It has the opportunity cost of time. \"There is no such thing as a free lunch.\"</p>"
  },
  "check": [
   {
    "q": "Define opportunity cost.",
    "a": "The value of the next-best alternative you give up when you choose."
   },
   {
    "q": "Who is linked to the saying \"There is no such thing as a free lunch\", and what does it describe?",
    "a": "Milton Friedman; it describes opportunity cost (every choice has at least one alternative we passed up)."
   },
   {
    "q": "Does an activity with no monetary cost have an opportunity cost?",
    "a": "Yes. Every activity has the opportunity cost of time."
   },
   {
    "q": "What two questions does slide 28 tell you to ask?",
    "a": "How much do I value this? What am I giving up now to have it?"
   },
   {
    "q": "You can study, work ($30) or watch a film. Work is your next-best choice. What is the opportunity cost of studying?",
    "a": "$30 (only the next-best option, not work + film)."
   }
  ],
  "exam": {
   "question": "<p>What is opportunity cost? Explain the saying \"There is no such thing as a free lunch\". Why does even an activity with no monetary cost have an opportunity cost? Give an example.</p>",
   "answer": "<p><b>Opportunity cost</b> is the value of the <b>next-best alternative</b> that we give up when we make a choice. For any decision we should ask: How much do I value this? What am I giving up now to have it? Opportunity cost is often expressed in market prices.</p><p>\"There is no such thing as a free lunch\" (associated with Milton Friedman) describes opportunity cost: every choice has at least one alternative that we passed up. Choosing one thing means giving up an alternative.</p><p>Every activity has the <b>opportunity cost of time</b>. This includes activities with no monetary cost, and also the activity of searching for alternatives, like a new job.</p><p><b>Example:</b> going hiking costs no money. But if my next-best choice is working 5 hours at $8 an hour, the opportunity cost of the hike is 5 × $8 = $40 of lost wages.</p>"
  },
  "memorize": [
   "Opportunity cost = value of the NEXT-BEST alternative",
   "\"No such thing as a free lunch\" – Milton Friedman – every choice passes up an alternative",
   "Choosing one thing = giving up an alternative",
   "Every activity has the opportunity cost of TIME (even free ones, even job searching)",
   "Ask: How much do I value this? What am I giving up now to have it?",
   "Often expressed in market prices"
  ]
 },
 {
  "id": "Q29-31",
  "label": "Q29–Q31",
  "week": 2,
  "slides": [
   25
  ],
  "kind": "calculation",
  "title": "PPF, opportunity cost and comparative advantage: US and Brazil",
  "hook": "With two PPF equations you can build the opportunity-cost table, find who should make what, and prove that trade makes both countries richer: three exam questions from one slide.",
  "cards": [
   {
    "h": "1. What a PPF shows",
    "body": "<p>Think of a baker in a Tashkent bazaar. In one day she can bake <b>only bread</b>, <b>only samsa</b>, or a mix. If she bakes more samsa, she must bake less bread. That is a <b>trade-off</b>.</p><p>The <b>production possibility frontier (PPF)</b> draws this. It shows the <b>maximum</b> of one good you can make for each amount of the other good. The slides say a PPF shows two things: (1) <b>trade-offs</b> and (2) <b>opportunity cost</b>.</p><ul><li><b>On</b> the line: possible and efficient (nothing wasted).</li><li><b>Inside</b>: possible, but not efficient (you could make more).</li><li><b>Outside</b>: not possible with your own resources.</li></ul><p>The graph is the US PPF from slide 25: sugar on the x axis, parts on the y axis.</p>",
    "chart": {
     "x": "Sugar",
     "y": "Parts",
     "xmax": 24,
     "ymax": 6,
     "xticks": [
      4,
      8,
      12,
      16,
      20
     ],
     "yticks": [
      1,
      2,
      3,
      4,
      5
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         5
        ],
        [
         20,
         0
        ]
       ],
       "label": "US PPF",
       "role": "ppf"
      }
     ],
     "points": [
      {
       "x": 16,
       "y": 1,
       "label": "On: (16, 1)",
       "guides": true
      },
      {
       "x": 8,
       "y": 1,
       "label": "Inside: (8, 1)"
      },
      {
       "x": 16,
       "y": 3,
       "label": "Outside: (16, 3)"
      }
     ],
     "caption": "US PPF x/20 + y/5 = 1. On the line = efficient, inside = waste, outside = impossible alone."
    }
   },
   {
    "h": "2. Reading the PPF equation x/a + y/b = 1",
    "body": "<p>The professor writes each PPF as an equation. Here <b>x = sugar</b> and <b>y = parts</b>.</p><ul><li><b>a</b> = the most sugar you can make (put y = 0, then x = a).</li><li><b>b</b> = the most parts you can make (put x = 0, then y = b).</li></ul><table><tr><th></th><th>Equation</th><th>Max sugar</th><th>Max parts</th></tr><tr><td>US</td><td>x/20 + y/5 = 1</td><td>20</td><td>5</td></tr><tr><td>Brazil</td><td>x/40 + y/4 = 1</td><td>40</td><td>4</td></tr></table><p><b>Point test:</b> put the point into x/a + y/b.</p><ul><li>= 1 → on the PPF</li><li>&lt; 1 → inside</li><li>&gt; 1 → outside (impossible alone)</li></ul><p>Example (US): (16, 1) → 16/20 + 1/5 = 0.8 + 0.2 = 1, so it is on the line. (16, 3) → 0.8 + 0.6 = 1.4 &gt; 1, so the US cannot reach it alone.</p>"
   },
   {
    "h": "3. Opportunity cost from a straight PPF (Step 1)",
    "body": "<p>Opportunity cost = what you <b>give up</b> to get one more unit.</p><p>The US can make 20 sugar <b>or</b> 5 parts. So 5 parts \"cost\" 20 sugar:</p><ul><li>1 part costs 20 ÷ 5 = <b>4 sugar</b>.</li><li>1 sugar costs 5 ÷ 20 = <b>1/4 part</b>.</li></ul><p>Brazil can make 40 sugar <b>or</b> 4 parts:</p><ul><li>1 part costs 40 ÷ 4 = <b>10 sugar</b>.</li><li>1 sugar costs 4 ÷ 40 = <b>1/10 part</b>.</li></ul><p><b>Easy rule:</b> cost of 1 unit of a good = (max of the <i>other</i> good) ÷ (max of <i>this</i> good). The two numbers for one country are always <b>upside-down</b> of each other (4 and 1/4).</p><table><tr><th></th><th>US opportunity cost</th><th>Brazil opportunity cost</th></tr><tr><td>One sugar</td><td>1/4 part</td><td>1/10 part</td></tr><tr><td>One part</td><td>4 sugar</td><td>10 sugar</td></tr></table><p>A straight PPF means the cost stays the same all along the line (constant opportunity cost). Brazil's line is flatter: sugar is cheap there.</p>",
    "chart": {
     "x": "Sugar",
     "y": "Parts",
     "xmax": 44,
     "ymax": 6,
     "xticks": [
      10,
      20,
      30,
      40
     ],
     "yticks": [
      1,
      2,
      3,
      4,
      5
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         5
        ],
        [
         20,
         0
        ]
       ],
       "label": "US: x/20 + y/5 = 1",
       "role": "ppf"
      },
      {
       "pts": [
        [
         0,
         4
        ],
        [
         40,
         0
        ]
       ],
       "label": "Brazil: x/40 + y/4 = 1",
       "role": "ppf2"
      }
     ],
     "caption": "Steep US line: 1 sugar costs 1/4 part. Flat Brazil line: 1 sugar costs only 1/10 part."
    }
   },
   {
    "h": "4. Comparative vs absolute advantage (Step 2)",
    "body": "<p><b>Comparative advantage</b> = you have the <b>lower opportunity cost</b> (slide 12). <b>Absolute advantage</b> = you can simply make <b>more</b> of it. They are not the same thing.</p><p>Compare across countries, one row at a time:</p><ul><li>Sugar: Brazil 1/10 &lt; US 1/4 → <b>Brazil</b> has the comparative advantage in sugar.</li><li>Parts: US 4 &lt; Brazil 10 → the <b>US</b> has the comparative advantage in parts.</li></ul><p>Absolute advantage here: Brazil in sugar (40 &gt; 20), US in parts (5 &gt; 4).</p><p><b>Specialize:</b> the US makes only parts (5), Brazil makes only sugar (40). Together: <b>40 sugar + 5 parts</b>.</p><p><i>Careful:</i> do not compare a country with itself (US 1/4 vs 4). Always compare the US number with the Brazil number in the same row.</p>"
   },
   {
    "h": "5. Is the deal possible? (Step 3, part 1)",
    "body": "<p>The deal: the US gives <b>2 parts</b>, Brazil gives <b>16 sugar</b>.</p><p><b>Rule:</b> a country accepts if it gets <b>at least</b> (amount it gives) × (its own opportunity cost). That is what the goods would cost to make at home.</p><ul><li>US gives 2 parts. 1 part costs the US 4 sugar → it needs at least 2 × 4 = <b>8 sugar</b>. It gets 16. Yes.</li><li>Brazil gives 16 sugar. 1 sugar costs Brazil 1/10 part → it needs at least 16 × (4/40) = <b>1.6 parts</b>. It gets 2. Yes.</li></ul><p>Price of the deal: 16 sugar ÷ 2 parts = <b>8 sugar per part</b>. It is between 4 (US cost) and 10 (Brazil cost), so both win. Any price between 4 and 10 sugar per part works.</p><p><b>Small slide error:</b> slide 24 writes \"2 × (20/4) = 10 sugar\". From the slide's own table, 1 part = 20/5 = 4 sugar, so it should be 2 × (20/5) = <b>8</b>. The conclusion is the same: 16 is more than enough.</p>"
   },
   {
    "h": "6. Both are better off (Step 3, part 2)",
    "body": "<p>Before trade the US makes and eats (16 sugar, 1 part), a point <b>on</b> its PPF.</p><table><tr><th></th><th>Makes</th><th>Gives</th><th>Gets</th><th>Eats after trade</th><th>Point test</th></tr><tr><td>US</td><td>5 parts</td><td>2 parts</td><td>16 sugar</td><td>16 sugar, 3 parts</td><td>16/20 + 3/5 = 1.4 &gt; 1</td></tr><tr><td>Brazil</td><td>40 sugar</td><td>16 sugar</td><td>2 parts</td><td>24 sugar, 2 parts</td><td>24/40 + 2/4 = 1.1 &gt; 1</td></tr></table><p>Both after-trade points are <b>outside</b> their own PPF. Alone they could never get there. So both are better off.</p><ul><li>US: same 16 sugar, but 3 parts instead of 1 (<b>+2 parts</b>).</li><li>Brazil: with 2 parts, alone it could have only 40 × (1 − 2/4) = 20 sugar. With trade it has 24 (<b>+4 sugar</b>).</li></ul><p>Check: 16 + 24 = 40 sugar and 3 + 2 = 5 parts. Exactly what was produced.</p><p>Note: the slide writes the US point as (16, 3) (sugar, parts) but the Brazil point as (2, 24) (parts, sugar). Both mean the same bundles as in the table.</p>",
    "chart": {
     "x": "Sugar",
     "y": "Parts",
     "xmax": 24,
     "ymax": 6,
     "xticks": [
      4,
      8,
      12,
      16,
      20
     ],
     "yticks": [
      1,
      2,
      3,
      4,
      5
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         5
        ],
        [
         20,
         0
        ]
       ],
       "label": "US PPF",
       "role": "ppf"
      }
     ],
     "points": [
      {
       "x": 16,
       "y": 1,
       "label": "Before trade (16, 1)",
       "guides": true
      },
      {
       "x": 16,
       "y": 3,
       "label": "After trade (16, 3)",
       "guides": true
      }
     ],
     "arrows": [
      {
       "from": [
        16.6,
        1.3
       ],
       "to": [
        16.6,
        2.7
       ],
       "label": "+2 parts"
      }
     ],
     "caption": "This is the dot outside the US line on slide 25: the US eats more than it could make alone."
    }
   },
   {
    "h": "7. The red \"combined\" line x/40 + y/5 = 1",
    "body": "<p>The third graph on slide 25 puts both PPFs together and adds a <b>red line</b> from <b>5 parts</b> (the US maximum) to <b>40 sugar</b> (the Brazil maximum). Its equation is x/40 + y/5 = 1.</p><p>What it means: it is the line of the <b>deal</b>. Its steepness is 40 sugar for 5 parts = <b>8 sugar per part</b>, the same price as 16 sugar for 2 parts.</p><p>Both after-trade points sit exactly on it:</p><ul><li>US (16, 3): 16/40 + 3/5 = 0.4 + 0.6 = 1</li><li>Brazil (24, 2): 24/40 + 2/5 = 0.6 + 0.4 = 1</li></ul><p>The red line lies <b>above</b> both green lines (except at the ends). So with trade each country can eat bundles beyond its own PPF.</p>",
    "chart": {
     "x": "Sugar",
     "y": "Parts",
     "xmax": 44,
     "ymax": 6,
     "xticks": [
      10,
      20,
      30,
      40
     ],
     "yticks": [
      1,
      2,
      3,
      4,
      5
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         5
        ],
        [
         20,
         0
        ]
       ],
       "label": "US PPF",
       "role": "ppf"
      },
      {
       "pts": [
        [
         0,
         4
        ],
        [
         40,
         0
        ]
       ],
       "label": "Brazil PPF",
       "role": "ppf2"
      },
      {
       "pts": [
        [
         0,
         5
        ],
        [
         40,
         0
        ]
       ],
       "label": "Red line x/40 + y/5 = 1",
       "role": "other"
      }
     ],
     "points": [
      {
       "x": 16,
       "y": 3,
       "label": "US after (16, 3)"
      },
      {
       "x": 24,
       "y": 2,
       "label": "Brazil after (24, 2)"
      }
     ],
     "caption": "Both after-trade bundles lie on the red line (price 8 sugar per part), outside their own PPFs."
    }
   }
  ],
  "example": {
   "problem": "<p>(Class example, slides 13–14.) Tom can catch 40 fish <b>or</b> gather 30 coconuts. Hank can catch 10 fish <b>or</b> gather 20 coconuts. Without trade Tom eats (28 fish, 9 coconuts) and Hank eats (6 fish, 8 coconuts). With trade Tom catches only fish (40), Hank gathers only coconuts (20), and Tom gives 10 fish for 10 coconuts.</p><p>(1) Make the opportunity-cost table. (2) Who has the comparative advantage in what? (3) Is the deal possible, and are both better off?</p>",
   "solution": "<p><b>Step 1.</b></p><table><tr><th></th><th>Tom</th><th>Hank</th></tr><tr><td>One fish</td><td>30/40 = 3/4 coconut</td><td>20/10 = 2 coconuts</td></tr><tr><td>One coconut</td><td>40/30 = 4/3 fish</td><td>10/20 = 1/2 fish</td></tr></table><p><b>Step 2.</b> Fish: Tom 3/4 &lt; Hank 2 → Tom has the comparative advantage in fish. Coconuts: Hank 1/2 &lt; Tom 4/3 → Hank in coconuts. (Tom has the absolute advantage in both, but that does not matter.)</p><p><b>Step 3 (1).</b> Tom gives 10 fish, needs at least 10 × 3/4 = 7.5 coconuts, gets 10 → yes. Hank gives 10 coconuts, needs at least 10 × 1/2 = 5 fish, gets 10 → yes. The deal is possible.</p><p><b>Step 3 (2).</b> Tom eats (30 fish, 10 coconuts) instead of (28, 9): +2 fish, +1 coconut. Hank eats (10 fish, 10 coconuts) instead of (6, 8): +4 fish, +2 coconuts. Point test: Tom 30/40 + 10/30 = 13/12 &gt; 1, Hank 10/10 + 10/20 = 1.5 &gt; 1. Both are outside their PPFs → both better off.</p><p>(On slide 13 Hank's cost of a fish is written \"(2) fish\"; it means 2 <b>coconuts</b>.)</p>"
  },
  "check": [
   {
    "q": "A country's PPF is x/30 + y/6 = 1 (x = sugar, y = parts). What is the opportunity cost of 1 part?",
    "a": "30 ÷ 6 = <b>5 sugar</b> (and 1 sugar costs 1/5 part)."
   },
   {
    "q": "Is the bundle (10 sugar, 4 parts) possible for the US (x/20 + y/5 = 1)?",
    "a": "10/20 + 4/5 = 0.5 + 0.8 = 1.3 &gt; 1 → <b>no</b>, it is outside the PPF."
   },
   {
    "q": "Which country has the comparative advantage in parts, and why?",
    "a": "The <b>US</b>: 1 part costs it 4 sugar, but costs Brazil 10 sugar. Lower opportunity cost."
   },
   {
    "q": "Would the US accept 6 sugar for 2 parts?",
    "a": "<b>No.</b> 2 parts cost the US 2 × 4 = 8 sugar to make at home, and 6 &lt; 8."
   },
   {
    "q": "What is the price on the red combined line?",
    "a": "40 sugar / 5 parts = <b>8 sugar per part</b>, the same as 16 sugar for 2 parts."
   }
  ],
  "exam": {
   "question": "<p>US PPF: x/20 + y/5 = 1. Brazil PPF: x/40 + y/4 = 1 (x = sugar, y = parts).</p><p><b>Q29.</b> Make the opportunity-cost table for both countries.</p><p><b>Q30.</b> Who has the comparative advantage in each good? What should each country produce, and how much in total?</p><p><b>Q31.</b> Without trade the US consumes 16 sugar and 1 part. With trade the US gives 2 parts and receives 16 sugar. Is this trade possible? Are both countries better off?</p>",
   "answer": "<p><b>Q29.</b> US: max 20 sugar or 5 parts. Brazil: max 40 sugar or 4 parts.</p><table><tr><th></th><th>US</th><th>Brazil</th></tr><tr><td>One sugar</td><td>5/20 = 1/4 part</td><td>4/40 = 1/10 part</td></tr><tr><td>One part</td><td>20/5 = 4 sugar</td><td>40/4 = 10 sugar</td></tr></table><p><b>Q30.</b> Sugar: Brazil 1/10 &lt; US 1/4 → Brazil has the comparative advantage in sugar. Parts: US 4 &lt; Brazil 10 → the US has the comparative advantage in parts. The US produces only parts (5), Brazil only sugar (40). Total: 40 sugar and 5 parts.</p><p><b>Q31.</b> (1) US gives 2 parts; it needs at least 2 × 4 = 8 sugar and receives 16 → acceptable. Brazil gives 16 sugar; it needs at least 16 × 1/10 = 1.6 parts and receives 2 → acceptable. The price, 8 sugar per part, lies between 4 and 10, so the trade is possible.</p><p>(2) After trade the US has 16 sugar and 5 − 2 = 3 parts: 16/20 + 3/5 = 1.4 &gt; 1. Brazil has 40 − 16 = 24 sugar and 2 parts: 24/40 + 2/4 = 1.1 &gt; 1. Both bundles are outside their own PPFs, so neither country could reach them without trade. Both are better off (the US gains 2 parts with the same sugar). Both bundles lie on the line x/40 + y/5 = 1.</p>"
  },
  "memorize": [
   "x/a + y/b = 1: a = max x (sugar), b = max y (parts)",
   "Point test: = 1 on, &lt; 1 inside, &gt; 1 outside (impossible alone)",
   "Cost of 1 unit = max of OTHER good ÷ max of THIS good",
   "US: 1 part = 4 sugar, 1 sugar = 1/4 part. Brazil: 1 part = 10 sugar, 1 sugar = 1/10 part",
   "Comparative advantage = lower opportunity cost: US parts, Brazil sugar",
   "Accept if received ≥ amount given × own opportunity cost (US 8 sugar, Brazil 1.6 parts)",
   "After trade: US (16 sugar, 3 parts), Brazil (24 sugar, 2 parts), both outside own PPF",
   "Red line x/40 + y/5 = 1 = deal price 8 sugar per part (slide's \"20/4 = 10\" should be 20/5 → 8)"
  ]
 },
 {
  "id": "Q5-6",
  "label": "Q5–Q6",
  "week": 3,
  "slides": [
   18,
   19
  ],
  "kind": "theory",
  "title": "What shifts the demand curve (Table 3-1)",
  "hook": "Slides 18–19 are one big table of the events that move the whole demand curve. Learn the 7 rows and you can answer any \"what happens to demand?\" question.",
  "cards": [
   {
    "h": "1. Shift of the curve vs movement along it",
    "body": "<p>Watermelon in a Tashkent bazaar. If the <b>price of watermelon</b> falls, people buy more. They <b>move along</b> the same demand curve (A → B).</p><p>But on a very hot day people buy more watermelon <b>at every price</b>. Now the whole curve <b>shifts</b> (A → C). Something <i>other</i> than the own price changed.</p><p>The professor's question: <b>\"Other things being equal or not?\"</b></p><ul><li>Equal (only the own price changed) → movement along the curve.</li><li>Not equal (weather, a doctor's new advice, tastes, ...) → shift of the curve.</li></ul>",
    "chart": {
     "x": "Quantity of watermelons",
     "y": "Price",
     "xmax": 14,
     "ymax": 11,
     "lines": [
      {
       "pts": [
        [
         0,
         10
        ],
        [
         10,
         0
        ]
       ],
       "label": "D1",
       "role": "demand"
      },
      {
       "pts": [
        [
         3,
         10
        ],
        [
         13,
         0
        ]
       ],
       "label": "D2",
       "role": "demand2"
      }
     ],
     "points": [
      {
       "x": 4,
       "y": 6,
       "label": "A"
      },
      {
       "x": 6,
       "y": 4,
       "label": "B"
      },
      {
       "x": 7,
       "y": 6,
       "label": "C"
      }
     ],
     "caption": "A → B: own price fell (movement along D1). A → C: same price, more bought (shift to D2)."
    }
   },
   {
    "h": "2. Right = increase, left = decrease",
    "body": "<p>Every cell of Table 3-1 has a tiny graph with an arrow.</p><ul><li><b>Demand increases</b> → the curve shifts <b>right</b> (D1 → D2). People want more at every price.</li><li><b>Demand decreases</b> → the curve shifts <b>left</b>. People want less at every price.</li></ul><p>The left column of the table is \"demand increases\", the right column is the opposite event, \"demand decreases\". So you only need to learn one side; the other is the mirror.</p>",
    "chart": {
     "x": "Quantity",
     "y": "Price",
     "xmax": 12,
     "ymax": 10,
     "lines": [
      {
       "pts": [
        [
         0,
         8
        ],
        [
         8,
         0
        ]
       ],
       "label": "D1",
       "role": "demand"
      },
      {
       "pts": [
        [
         3,
         8
        ],
        [
         11,
         0
        ]
       ],
       "label": "D2",
       "role": "demand2"
      }
     ],
     "arrows": [
      {
       "from": [
        4.4,
        4
       ],
       "to": [
        6.6,
        4
       ],
       "label": "increase"
      }
     ],
     "caption": "Increase in demand: the whole curve moves right (left column of Table 3-1)."
    }
   },
   {
    "h": "3. Slide 18: substitutes and complements",
    "body": "<p><b>Substitutes</b> = used <i>instead of</i> each other (coffee and tea).</p><ul><li>Price of the substitute <b>rises</b> → demand for the original good <b>increases</b> (right).</li><li>Price of the substitute <b>falls</b> → demand <b>decreases</b> (left).</li></ul><p>Tea gets expensive → people switch to coffee. <b>Same direction.</b></p><p><b>Complements</b> = used <i>together</i> (coffee and sugar).</p><ul><li>Price of the complement <b>falls</b> → demand for the original good <b>increases</b>.</li><li>Price of the complement <b>rises</b> → demand <b>decreases</b>.</li></ul><p>Sugar gets expensive → people drink less sweet coffee. <b>Opposite direction.</b></p><p>In the slide 14 formula style: substitutes ∂Q<sub>y</sub>/∂P<sub>x</sub> &gt; 0, complements ∂Q<sub>y</sub>/∂P<sub>x</sub> &lt; 0.</p>"
   },
   {
    "h": "4. Slide 18 (last row) and slide 19 (first row): income",
    "body": "<ul><li><b>Normal good</b>: income <b>rises</b> → demand <b>increases</b>; income falls → demand decreases.</li><li><b>Inferior good</b>: income <b>falls</b> → demand <b>increases</b>; income rises → demand decreases.</li></ul><p>Example: after a pay rise you take more taxis (normal good) and fewer crowded buses (inferior good for you).</p><p>Notice the slide puts the inferior row on slide 19 starting with \"When income <b>falls</b>\" in the increase column. Read the trigger carefully.</p>",
    "chart": {
     "x": "Quantity",
     "y": "Price",
     "xmax": 12,
     "ymax": 10,
     "lines": [
      {
       "pts": [
        [
         3,
         8
        ],
        [
         11,
         0
        ]
       ],
       "label": "D1",
       "role": "demand"
      },
      {
       "pts": [
        [
         0,
         8
        ],
        [
         8,
         0
        ]
       ],
       "label": "D2",
       "role": "demand2"
      }
     ],
     "arrows": [
      {
       "from": [
        6.6,
        4
       ],
       "to": [
        4.4,
        4
       ],
       "label": "decrease"
      }
     ],
     "caption": "Decrease in demand: e.g. income rises for an inferior good, or a complement gets dearer."
    }
   },
   {
    "h": "5. Slide 19: tastes, expectations, number of consumers",
    "body": "<ul><li><b>Tastes</b>: tastes change <b>in favor of</b> the good → demand increases. Tastes change <b>against</b> it → demand decreases. (A doctor says green tea is healthy → demand for green tea up.)</li><li><b>Expected future price</b>: price expected to <b>rise</b> in the future → demand <b>today</b> increases. Expected to <b>fall</b> → demand today decreases. (You hear phones will cost more next month → you buy one today.)</li><li><b>Number of consumers</b>: more consumers → <b>market</b> demand increases; fewer → decreases. (More students move to Tashkent → more demand for rented flats.)</li></ul><p>Heads-up: slide 13 says there are <b>four</b> principal shifters (related-goods prices, income, tastes, expectations). Table 3-1 adds a fifth, the number of consumers, which changes <i>market</i> demand.</p>"
   }
  ],
  "example": {
   "problem": "<p>For each event, say what happens to the demand for <b>coffee</b> and which way the demand curve shifts. (a) The price of tea rises. (b) The price of sugar rises. (c) People expect coffee prices to jump next month. (d) The price of coffee falls.</p>",
   "solution": "<ol><li>Tea is a <b>substitute</b>. Its price rises → people switch to coffee → demand for coffee <b>increases</b>, curve shifts <b>right</b>.</li><li>Sugar is a <b>complement</b>. Its price rises → less coffee wanted → demand <b>decreases</b>, shifts <b>left</b>.</li><li>Price expected to <b>rise</b> → people buy today → demand today <b>increases</b>, shifts <b>right</b>.</li><li>Trap! This is coffee's <b>own</b> price. The curve does <b>not</b> shift: it is a <b>movement along</b> the demand curve (quantity demanded rises).</li></ol>"
  },
  "check": [
   {
    "q": "The price of a complement falls. What happens to demand for the original good?",
    "a": "It <b>increases</b> (shift right)."
   },
   {
    "q": "Income rises. What happens to demand for an inferior good?",
    "a": "It <b>decreases</b> (shift left)."
   },
   {
    "q": "The price of a good is expected to fall next month. Demand today?",
    "a": "<b>Decreases</b> today (people wait), shift left."
   },
   {
    "q": "Is \"the price of the good itself rises\" in Table 3-1?",
    "a": "<b>No.</b> That is a movement along the curve, not a shift."
   }
  ],
  "exam": {
   "question": "<p><b>Q5.</b> Explain how the demand curve for a good shifts when (a) the price of a substitute rises or falls, (b) the price of a complement rises or falls, (c) income rises or falls for a normal good.</p><p><b>Q6.</b> Explain how it shifts when (a) income rises or falls for an inferior good, (b) tastes change, (c) the price is expected to rise or fall in the future, (d) the number of consumers rises or falls.</p>",
   "answer": "<p>An increase in demand shifts the curve <b>right</b> (D1 → D2); a decrease shifts it <b>left</b>. These are changes in things other than the good's own price.</p><p><b>Q5.</b></p><ul><li>Substitute (coffee and tea): its price rises → demand for the good increases (right); falls → decreases (left).</li><li>Complement (coffee and sugar): its price falls → demand increases (right); rises → decreases (left).</li><li>Normal good: income rises → demand increases (right); income falls → decreases (left).</li></ul><p><b>Q6.</b></p><ul><li>Inferior good: income falls → demand increases (right); income rises → decreases (left).</li><li>Tastes change in favor of the good → demand increases; against it → decreases.</li><li>Price expected to rise in the future → demand today increases; expected to fall → demand today decreases.</li><li>Number of consumers rises → market demand increases; falls → market demand decreases.</li></ul>"
  },
  "memorize": [
   "Increase in demand = shift RIGHT; decrease = shift LEFT",
   "Own price change = movement ALONG the curve, not a shift",
   "Substitute price ↑ → demand ↑ (same direction)",
   "Complement price ↑ → demand ↓ (opposite direction)",
   "Income ↑: normal good D ↑, inferior good D ↓",
   "Tastes for the good → D ↑; price expected to rise later → D ↑ today",
   "More consumers → market demand ↑"
  ]
 },
 {
  "id": "Q7",
  "label": "Q7",
  "week": 3,
  "slides": [
   15
  ],
  "kind": "theory",
  "title": "Normal goods and inferior goods",
  "hook": "Slide 15 gives two definitions about income. You will be able to define both, give examples and draw the shift.",
  "cards": [
   {
    "h": "1. Income is a demand shifter",
    "body": "<p>When your income changes, the price of the good has not changed. But you want a different amount <b>at every price</b>. So income <b>shifts</b> the demand curve (it is not a movement along it).</p><p>The question is only: <b>which way?</b> That depends on the kind of good.</p>"
   },
   {
    "h": "2. Normal good",
    "body": "<p>Slide 15: \"When a rise in income <b>increases</b> the demand for a good, the normal case, we say that the good is a <b>normal good</b>.\"</p><p>Most goods are normal. You get a better job → you eat out more, buy more clothes, take more taxis.</p><ul><li>Income ↑ → demand ↑ → curve shifts <b>right</b>.</li><li>Income ↓ → demand ↓ → curve shifts <b>left</b>.</li></ul>",
    "chart": {
     "x": "Quantity of restaurant meals",
     "y": "Price",
     "xmax": 12,
     "ymax": 10,
     "lines": [
      {
       "pts": [
        [
         0,
         8
        ],
        [
         8,
         0
        ]
       ],
       "label": "D1",
       "role": "demand"
      },
      {
       "pts": [
        [
         3,
         8
        ],
        [
         11,
         0
        ]
       ],
       "label": "D2",
       "role": "demand2"
      }
     ],
     "arrows": [
      {
       "from": [
        4.4,
        4
       ],
       "to": [
        6.6,
        4
       ],
       "label": "increase"
      }
     ],
     "caption": "Normal good (restaurant meals): income rises → demand shifts right."
    }
   },
   {
    "h": "3. Inferior good",
    "body": "<p>Slide 15: \"When a rise in income <b>decreases</b> the demand for a good, it is an <b>inferior good</b>.\"</p><p>A student eats instant noodles and rides the crowded bus. After getting a good job, he buys <b>fewer</b> noodles and takes <b>fewer</b> bus rides. For him these are inferior goods.</p><ul><li>Income ↑ → demand ↓ → curve shifts <b>left</b>.</li><li>Income ↓ → demand ↑ → curve shifts <b>right</b>.</li></ul>",
    "chart": {
     "x": "Quantity of instant noodles",
     "y": "Price",
     "xmax": 12,
     "ymax": 10,
     "lines": [
      {
       "pts": [
        [
         3,
         8
        ],
        [
         11,
         0
        ]
       ],
       "label": "D1",
       "role": "demand"
      },
      {
       "pts": [
        [
         0,
         8
        ],
        [
         8,
         0
        ]
       ],
       "label": "D2",
       "role": "demand2"
      }
     ],
     "arrows": [
      {
       "from": [
        6.6,
        4
       ],
       "to": [
        4.4,
        4
       ],
       "label": "decrease"
      }
     ],
     "caption": "Inferior good (instant noodles): income rises → demand shifts left."
    }
   },
   {
    "h": "4. Common mistakes",
    "body": "<ul><li>\"Inferior\" does <b>not</b> mean bad quality or broken. It only means people buy <b>less</b> of it when they get richer.</li><li>It is defined by the <b>direction</b> of the change, not by the price. A cheap good can be normal, too.</li><li>Do not mix it up with substitutes/complements: those are about <b>another good's price</b>. Normal/inferior is about <b>income</b>.</li></ul><p>Link to week 5: the income elasticity of demand is <b>positive</b> for a normal good and <b>negative</b> for an inferior good.</p>"
   }
  ],
  "example": {
   "problem": "<p>Aziz's salary rises from 5 to 8 million sum per month. He now buys more meat and goes to the cinema more often, but he buys less cheap margarine and uses the marshrutka less. Classify each good and say how each demand curve shifts.</p>",
   "solution": "<ul><li>Meat: income ↑, demand ↑ → <b>normal good</b>, curve shifts <b>right</b>.</li><li>Cinema: income ↑, demand ↑ → <b>normal good</b>, shifts <b>right</b>.</li><li>Cheap margarine: income ↑, demand ↓ → <b>inferior good</b>, shifts <b>left</b>.</li><li>Marshrutka rides: income ↑, demand ↓ → <b>inferior good</b>, shifts <b>left</b>.</li></ul>"
  },
  "check": [
   {
    "q": "Define a normal good.",
    "a": "A good whose demand <b>increases</b> when income rises (the normal case)."
   },
   {
    "q": "Income falls. Which way does the demand curve for an inferior good shift?",
    "a": "<b>Right</b> (demand increases)."
   },
   {
    "q": "Does \"inferior\" mean low quality?",
    "a": "<b>No.</b> It only means demand falls when income rises."
   }
  ],
  "exam": {
   "question": "<p>Define a normal good and an inferior good. Give an example of each, and explain how each demand curve shifts when income rises.</p>",
   "answer": "<p>A change in income shifts the demand curve.</p><ul><li>A <b>normal good</b> is a good for which a rise in income <b>increases</b> demand; this is the normal case. Example: restaurant meals. When income rises, its demand curve shifts to the <b>right</b>.</li><li>An <b>inferior good</b> is a good for which a rise in income <b>decreases</b> demand. Example: instant noodles or bus rides. When income rises, its demand curve shifts to the <b>left</b>.</li></ul><p>When income falls, the opposite happens: demand for a normal good decreases (left) and demand for an inferior good increases (right).</p>"
  },
  "memorize": [
   "Normal good: income ↑ → demand ↑ (the normal case)",
   "Inferior good: income ↑ → demand ↓",
   "Income ↑: normal D shifts right, inferior D shifts left",
   "Inferior ≠ bad quality: people just buy less when richer",
   "Income elasticity: + normal, − inferior (week 5)"
  ]
 },
 {
  "id": "Q15",
  "label": "Q15",
  "week": 3,
  "slides": [
   29,
   30
  ],
  "kind": "theory",
  "title": "What shifts the supply curve (Table 3-2)",
  "hook": "Slides 29–30 are Table 3-2: five kinds of events that move the whole supply curve. You will be able to say which way supply moves and why.",
  "cards": [
   {
    "h": "1. A shift of supply",
    "body": "<p>A <b>shift</b> of the supply curve means: at <b>every price</b>, sellers now want to sell a different amount.</p><ul><li>Supply <b>increases</b> → curve shifts <b>right</b> (S1 → S2).</li><li>Supply <b>decreases</b> → curve shifts <b>left</b>.</li></ul><p>A change in the good's <b>own price</b> is only a movement <b>along</b> the supply curve.</p><p>Simple idea: anything that makes producing the good <b>cheaper or more attractive</b> shifts supply right. Anything that makes it <b>costlier or less attractive</b> shifts it left.</p>",
    "chart": {
     "x": "Quantity",
     "y": "Price",
     "xmax": 12,
     "ymax": 10,
     "lines": [
      {
       "pts": [
        [
         0,
         1
        ],
        [
         7,
         9
        ]
       ],
       "role": "supply",
       "label": "S1"
      },
      {
       "pts": [
        [
         3,
         1
        ],
        [
         10,
         9
        ]
       ],
       "role": "supply2",
       "label": "S2"
      }
     ],
     "arrows": [
      {
       "from": [
        3.8,
        5
       ],
       "to": [
        6.2,
        5
       ],
       "label": "increase"
      }
     ],
     "caption": "Supply increases: more offered at every price (left column of Table 3-2)."
    }
   },
   {
    "h": "2. Input prices",
    "body": "<p>An <b>input</b> is a good used to produce another good (slide 28). Flour is an input for bread.</p><ul><li>Input price <b>falls</b> → making bread is cheaper → supply of bread <b>increases</b> (right).</li><li>Input price <b>rises</b> → supply <b>decreases</b> (left).</li></ul><p>Example: the price of flour in Tashkent goes up → bakeries bake less bread at each price.</p>",
    "chart": {
     "x": "Quantity of bread",
     "y": "Price",
     "xmax": 12,
     "ymax": 10,
     "lines": [
      {
       "pts": [
        [
         3,
         1
        ],
        [
         10,
         9
        ]
       ],
       "label": "S1",
       "role": "supply"
      },
      {
       "pts": [
        [
         0,
         1
        ],
        [
         7,
         9
        ]
       ],
       "label": "S2",
       "role": "supply2"
      }
     ],
     "arrows": [
      {
       "from": [
        6.2,
        5
       ],
       "to": [
        3.8,
        5
       ],
       "label": "decrease"
      }
     ],
     "caption": "Supply decreases: e.g. an input (flour) becomes more expensive."
    }
   },
   {
    "h": "3. Prices of related goods in production",
    "body": "<p><b>Substitutes in production</b> = goods made with the <i>same</i> resources, so you choose one or the other. A farmer can grow wheat <b>or</b> cotton on his field.</p><ul><li>Price of the substitute in production <b>rises</b> → supply of the original good <b>decreases</b>. (Cotton price up → more cotton, less wheat.)</li><li>Its price <b>falls</b> → supply of the original good <b>increases</b>.</li></ul><p><b>Complements in production</b> = goods made <i>together</i>. One sheep gives both meat and wool.</p><ul><li>Price of the complement in production <b>rises</b> → supply of the original good <b>increases</b>. (Meat price up → more sheep → more wool.)</li><li>Its price <b>falls</b> → supply <b>decreases</b>.</li></ul><p>Note: the complement-in-production row appears on <b>both</b> slide 29 and slide 30. It is the same row twice.</p>"
   },
   {
    "h": "4. Technology, expectations, number of producers",
    "body": "<ul><li><b>Technology</b>: better technology lowers the cost of production → supply <b>increases</b> (right). If the best technology is no longer available → supply <b>decreases</b>.</li><li><b>Expectations</b>: price expected to <b>fall</b> in the future → sell now → supply <b>increases today</b>. Price expected to <b>rise</b> → hold goods back → supply <b>decreases today</b>.</li><li><b>Number of producers</b>: more producers → <b>market</b> supply increases; fewer → decreases.</li></ul><p>Careful: expectations work the <b>opposite</b> way for sellers and buyers. If the price is expected to rise, buyers buy more today (demand ↑) but sellers sell less today (supply ↓).</p><p>Small slide note: slide 27 says shifts come mainly from \"<b>three</b> factors\" but then lists <b>five</b>. Learn all five, as in Table 3-2.</p>"
   }
  ],
  "example": {
   "problem": "<p>What happens to the supply of <b>wheat</b> in each case? (a) Fertilizer becomes cheaper. (b) The price of cotton (grown on the same land) rises. (c) A new seed gives more wheat per field. (d) Farmers expect wheat prices to rise next season. (e) The price of wheat rises.</p>",
   "solution": "<ol><li>Fertilizer is an <b>input</b>; cheaper input → supply <b>increases</b> (right).</li><li>Cotton is a <b>substitute in production</b>; its price rises → wheat supply <b>decreases</b> (left).</li><li>Better <b>technology</b> → supply <b>increases</b> (right).</li><li>Price expected to <b>rise</b> → farmers hold wheat back → supply today <b>decreases</b> (left).</li><li>Trap! Own price → <b>movement along</b> the supply curve (quantity supplied rises), no shift.</li></ol>"
  },
  "check": [
   {
    "q": "The price of an input rises. Supply?",
    "a": "<b>Decreases</b> (shift left)."
   },
   {
    "q": "Beef price rises. What happens to the supply of leather?",
    "a": "Leather is a complement in production → supply of leather <b>increases</b>."
   },
   {
    "q": "Sellers expect the price to fall next month. Supply today?",
    "a": "<b>Increases</b> today (they sell now)."
   },
   {
    "q": "Name the five supply shifters.",
    "a": "Input prices, prices of related goods (in production), technology, expectations, number of producers."
   }
  ],
  "exam": {
   "question": "<p>List the factors that shift the supply curve (Table 3-2). For each, say when supply increases and when it decreases.</p>",
   "answer": "<p>A change in a factor other than the good's own price shifts the supply curve: right = supply increases, left = supply decreases.</p><ol><li><b>Input prices</b>: input price falls → supply increases; rises → decreases.</li><li><b>Prices of related goods in production</b>: substitute in production's price falls → supply increases, rises → decreases. Complement in production's price rises → supply increases, falls → decreases.</li><li><b>Technology</b>: technology improves → supply increases; best technology no longer available → decreases.</li><li><b>Expectations</b>: price expected to fall in the future → supply increases today; expected to rise → supply decreases today.</li><li><b>Number of producers</b>: more producers → market supply increases; fewer → decreases.</li></ol>"
  },
  "memorize": [
   "Shift right = supply ↑; left = supply ↓; own price = movement along",
   "Input price ↓ → supply ↑",
   "Substitute-in-production price ↑ → supply ↓",
   "Complement-in-production price ↑ → supply ↑",
   "Better technology → supply ↑",
   "Price expected to RISE later → supply ↓ TODAY",
   "More producers → market supply ↑"
  ],
  "note": "Your note says W5 S29–30, but week 5 has only 25 slides, so this lesson uses week 3 slides 29–30. Tell me if it should be another week."
 },
 {
  "id": "Q28",
  "label": "Q28",
  "week": 3,
  "slides": [
   21,
   22,
   6
  ],
  "kind": "calculation",
  "title": "Ticket market: schedules, equilibrium, surplus/shortage and a supply shift",
  "hook": "With the demand and supply schedules for tickets you can find the equilibrium, measure a surplus or shortage, and show what a supply decrease does.",
  "cards": [
   {
    "h": "1. Demand schedule → demand curve (slide 6)",
    "body": "<p>A <b>demand schedule</b> is a table: at each price, how many tickets people want to buy. Draw each row as a point and join them → the <b>demand curve</b>.</p><table><tr><th>Price</th><th>$350</th><th>$300</th><th>$250</th><th>$200</th><th>$150</th><th>$100</th></tr><tr><td>Qd</td><td>5,000</td><td>6,000</td><td>8,000</td><td>11,000</td><td>15,000</td><td>20,000</td></tr></table><p>As the price rises, the quantity demanded falls: the <b>law of demand</b>. So the curve slopes <b>down</b>.</p><p>The professor's red warning: <b>\"In economics, the Y axis is always for the Price, and X axis is the quantity.\"</b></p>",
    "chart": {
     "x": "Quantity of tickets (thousands)",
     "y": "Price of ticket ($)",
     "xmax": 22,
     "ymax": 400,
     "xticks": [
      5,
      10,
      15,
      20
     ],
     "yticks": [
      100,
      150,
      200,
      250,
      300,
      350
     ],
     "lines": [
      {
       "pts": [
        [
         5,
         350
        ],
        [
         6,
         300
        ],
        [
         8,
         250
        ],
        [
         11,
         200
        ],
        [
         15,
         150
        ],
        [
         20,
         100
        ]
       ],
       "label": "D",
       "role": "demand"
      }
     ],
     "points": [
      {
       "x": 5,
       "y": 350
      },
      {
       "x": 6,
       "y": 300
      },
      {
       "x": 8,
       "y": 250
      },
      {
       "x": 11,
       "y": 200
      },
      {
       "x": 15,
       "y": 150
      },
      {
       "x": 20,
       "y": 100
      }
     ],
     "caption": "Figure 3-1: price on the Y axis, quantity on the X axis. Higher price → fewer tickets wanted."
    }
   },
   {
    "h": "2. Supply schedule → supply curve (slide 21)",
    "body": "<p>A <b>supply schedule</b> shows how many tickets sellers want to sell at each price (Figure 3-5).</p><table><tr><th>Price</th><th>$350</th><th>$300</th><th>$250</th><th>$200</th><th>$150</th><th>$100</th></tr><tr><td>Qs</td><td>8,800</td><td>8,500</td><td>8,000</td><td>7,000</td><td>5,000</td><td>2,000</td></tr></table><p>A higher price → sellers offer <b>more</b>. So the supply curve slopes <b>up</b>.</p><p><b>Equilibrium</b> = the price where quantity demanded = quantity supplied. Look for the row where the two numbers match: at <b>$250</b>, Qd = 8,000 and Qs = 8,000. So the equilibrium is <b>$250 and 8,000 tickets</b> (point E, as on slide 32).</p>",
    "chart": {
     "x": "Quantity of tickets (thousands)",
     "y": "Price of ticket ($)",
     "xmax": 22,
     "ymax": 400,
     "xticks": [
      5,
      10,
      15,
      20
     ],
     "yticks": [
      100,
      150,
      200,
      250,
      300,
      350
     ],
     "lines": [
      {
       "pts": [
        [
         5,
         350
        ],
        [
         6,
         300
        ],
        [
         8,
         250
        ],
        [
         11,
         200
        ],
        [
         15,
         150
        ],
        [
         20,
         100
        ]
       ],
       "label": "D",
       "role": "demand"
      },
      {
       "pts": [
        [
         2,
         100
        ],
        [
         5,
         150
        ],
        [
         7,
         200
        ],
        [
         8,
         250
        ],
        [
         8.5,
         300
        ],
        [
         8.8,
         350
        ]
       ],
       "label": "S",
       "role": "supply"
      }
     ],
     "points": [
      {
       "x": 8,
       "y": 250,
       "label": "E ($250, 8,000)",
       "guides": true
      }
     ],
     "caption": "Demand (slide 6) and supply (slide 21) cross at E: $250 and 8,000 tickets."
    }
   },
   {
    "h": "3. Surplus and shortage",
    "body": "<p>At any other price the two quantities do not match.</p><table><tr><th>Price</th><th>Qd</th><th>Qs</th><th>Qs − Qd</th><th>Result</th></tr><tr><td>$350</td><td>5,000</td><td>8,800</td><td>+3,800</td><td>surplus</td></tr><tr><td>$300</td><td>6,000</td><td>8,500</td><td>+2,500</td><td>surplus</td></tr><tr><td>$250</td><td>8,000</td><td>8,000</td><td>0</td><td><b>equilibrium</b></td></tr><tr><td>$200</td><td>11,000</td><td>7,000</td><td>−4,000</td><td>shortage</td></tr><tr><td>$150</td><td>15,000</td><td>5,000</td><td>−10,000</td><td>shortage</td></tr><tr><td>$100</td><td>20,000</td><td>2,000</td><td>−18,000</td><td>shortage</td></tr></table><ul><li><b>Surplus</b> (Qs &gt; Qd): price above equilibrium. Unsold tickets → sellers cut the price → price <b>falls</b>.</li><li><b>Shortage</b> (Qd &gt; Qs): price below equilibrium. People can't get tickets → price <b>rises</b>.</li></ul><p>The professor's note (slide 35): if a government policy keeps a surplus → \"<b>buyers market</b>\"; keeps a shortage → \"<b>sellers market</b>\".</p>",
    "chart": {
     "x": "Quantity of tickets (thousands)",
     "y": "Price of ticket ($)",
     "xmax": 22,
     "ymax": 400,
     "xticks": [
      5,
      10,
      15,
      20
     ],
     "yticks": [
      100,
      150,
      200,
      250,
      300,
      350
     ],
     "lines": [
      {
       "pts": [
        [
         5,
         350
        ],
        [
         6,
         300
        ],
        [
         8,
         250
        ],
        [
         11,
         200
        ],
        [
         15,
         150
        ],
        [
         20,
         100
        ]
       ],
       "label": "D",
       "role": "demand"
      },
      {
       "pts": [
        [
         2,
         100
        ],
        [
         5,
         150
        ],
        [
         7,
         200
        ],
        [
         8,
         250
        ],
        [
         8.5,
         300
        ],
        [
         8.8,
         350
        ]
       ],
       "label": "S",
       "role": "supply"
      }
     ],
     "areas": [
      {
       "pts": [
        [
         5,
         345
        ],
        [
         8.8,
         345
        ],
        [
         8.8,
         355
        ],
        [
         5,
         355
        ]
       ],
       "role": "gap",
       "label": "Surplus 3,800"
      },
      {
       "pts": [
        [
         5,
         145
        ],
        [
         15,
         145
        ],
        [
         15,
         155
        ],
        [
         5,
         155
        ]
       ],
       "role": "gap",
       "label": "Shortage 10,000"
      }
     ],
     "points": [
      {
       "x": 8,
       "y": 250,
       "label": "E"
      }
     ],
     "caption": "At $350: Qs 8,800 − Qd 5,000 = surplus 3,800. At $150: Qd 15,000 − Qs 5,000 = shortage 10,000."
    }
   },
   {
    "h": "4. A decrease in supply (slide 22)",
    "body": "<p>Figure 3-6: after the announcement of Gretzky's retirement, sellers offer <b>1,000 fewer tickets at every price</b>.</p><table><tr><th>Price</th><th>Before (S1)</th><th>After (S2)</th><th>Change</th></tr><tr><td>$350</td><td>9,800</td><td>8,800</td><td>−1,000</td></tr><tr><td>$300</td><td>9,500</td><td>8,500</td><td>−1,000</td></tr><tr><td>$250</td><td>9,000</td><td>8,000</td><td>−1,000</td></tr><tr><td>$200</td><td>8,000</td><td>7,000</td><td>−1,000</td></tr><tr><td>$150</td><td>6,000</td><td>5,000</td><td>−1,000</td></tr><tr><td>$100</td><td>3,000</td><td>2,000</td><td>−1,000</td></tr></table><p>Less at <b>every</b> price → the whole curve shifts <b>left</b> (S1 → S2). The \"after\" column is exactly the slide 21 schedule.</p><p>Effect on the market: with S1, at $250 there is a surplus of 1,000 and at $200 a shortage of 3,000, so the old equilibrium is between $200 and $250 (a straight-line estimate: about $237.50 and 8,750 tickets). With S2 it is $250 and 8,000. A decrease in supply → <b>price up, quantity down</b>.</p>",
    "chart": {
     "x": "Quantity of tickets (thousands)",
     "y": "Price of ticket ($)",
     "xmax": 22,
     "ymax": 400,
     "xticks": [
      5,
      10,
      15,
      20
     ],
     "yticks": [
      100,
      150,
      200,
      250,
      300,
      350
     ],
     "lines": [
      {
       "pts": [
        [
         5,
         350
        ],
        [
         6,
         300
        ],
        [
         8,
         250
        ],
        [
         11,
         200
        ],
        [
         15,
         150
        ],
        [
         20,
         100
        ]
       ],
       "label": "D",
       "role": "demand"
      },
      {
       "pts": [
        [
         3,
         100
        ],
        [
         6,
         150
        ],
        [
         8,
         200
        ],
        [
         9,
         250
        ],
        [
         9.5,
         300
        ],
        [
         9.8,
         350
        ]
       ],
       "label": "S1 (before)",
       "role": "supply"
      },
      {
       "pts": [
        [
         2,
         100
        ],
        [
         5,
         150
        ],
        [
         7,
         200
        ],
        [
         8,
         250
        ],
        [
         8.5,
         300
        ],
        [
         8.8,
         350
        ]
       ],
       "label": "S2 (after)",
       "role": "supply2"
      }
     ],
     "points": [
      {
       "x": 8.75,
       "y": 237.5,
       "label": "E1 ≈ ($237.50, 8,750)"
      },
      {
       "x": 8,
       "y": 250,
       "label": "E2 ($250, 8,000)",
       "guides": true
      }
     ],
     "arrows": [
      {
       "from": [
        5.9,
        150
       ],
       "to": [
        5.1,
        150
       ],
       "label": "−1,000 at every price"
      }
     ],
     "caption": "Supply falls by 1,000 at each price: S shifts left, price rises, quantity falls."
    }
   },
   {
    "h": "5. Shift or movement?",
    "body": "<ul><li>(250, 9,000) → (250, 8,000): the price is the <b>same</b>, the quantity changed → a <b>shift</b> of the supply curve.</li><li>(250, 8,000) → (200, 7,000) on S2: the quantity changed <b>because the price changed</b> → a <b>movement along</b> the supply curve.</li></ul><p>Quick test: same price, new quantity = shift. New price = movement along.</p>"
   }
  ],
  "example": {
   "problem": "<p>Use the ticket schedules. (a) Before the announcement (S1), is there a surplus or a shortage at $300? How big? (b) After the announcement (S2), what is the shortage at $200? (c) Between which two prices is the old (S1) equilibrium?</p>",
   "solution": "<ol><li>At $300: Qs (S1) = 9,500, Qd = 6,000 → Qs &gt; Qd → <b>surplus of 3,500</b>.</li><li>At $200: Qd = 11,000, Qs (S2) = 7,000 → <b>shortage of 4,000</b>.</li><li>With S1: at $250 Qs 9,000 &gt; Qd 8,000 (surplus 1,000); at $200 Qs 8,000 &lt; Qd 11,000 (shortage 3,000). The sign flips, so the equilibrium is <b>between $200 and $250</b> (about $237.50 and 8,750 tickets).</li></ol>"
  },
  "check": [
   {
    "q": "Which axis is price?",
    "a": "The <b>Y</b> axis. Quantity is on the X axis."
   },
   {
    "q": "Equilibrium with S2 (Figure 3-5)?",
    "a": "<b>$250</b> and <b>8,000</b> tickets (Qd = Qs)."
   },
   {
    "q": "At $350 with S2: surplus or shortage, how much?",
    "a": "Surplus: 8,800 − 5,000 = <b>3,800</b>. Price will fall."
   },
   {
    "q": "At $150 with S2?",
    "a": "Shortage: 15,000 − 5,000 = <b>10,000</b>. Price will rise."
   },
   {
    "q": "Supply falls by 1,000 at every price. Which way does S move, and what happens to P and Q?",
    "a": "S shifts <b>left</b>; equilibrium price <b>rises</b>, quantity <b>falls</b>."
   }
  ],
  "exam": {
   "question": "<p>Use the demand schedule for tickets (Figure 3-1) and the supply schedules (Figures 3-5 and 3-6).</p><ol><li>Find the equilibrium price and quantity with the supply schedule of Figure 3-5.</li><li>Find the surplus or shortage at $350 and at $150.</li><li>By how much does supply decrease in Figure 3-6? Which way does the curve shift? What happens to the equilibrium price and quantity?</li></ol>",
   "answer": "<p><b>1.</b> At $250, Qd = 8,000 and Qs = 8,000. Equilibrium price = <b>$250</b>, quantity = <b>8,000 tickets</b>.</p><p><b>2.</b> At $350: Qs − Qd = 8,800 − 5,000 = <b>surplus of 3,800</b>, so the price falls. At $150: Qd − Qs = 15,000 − 5,000 = <b>shortage of 10,000</b>, so the price rises.</p><p><b>3.</b> At every price, after − before = −1,000. Supply decreases by <b>1,000 tickets at each price</b>, so the supply curve <b>shifts left</b> (S1 → S2). With S1 the equilibrium was between $200 and $250 (surplus 1,000 at $250, shortage 3,000 at $200); with S2 it is $250 and 8,000. So a decrease in supply <b>raises the equilibrium price and lowers the equilibrium quantity</b>.</p><p>(Draw it with price on the Y axis and quantity on the X axis.)</p>"
  },
  "memorize": [
   "Y axis = price, X axis = quantity. Always.",
   "Equilibrium: Qd = Qs → $250, 8,000 tickets",
   "$350: surplus 3,800 (price falls). $150: shortage 10,000 (price rises)",
   "Fig 3-6: −1,000 at every price → supply shifts LEFT",
   "Supply decrease → price up, quantity down",
   "Same price, new quantity = shift; new price = movement along",
   "Surplus kept by policy → buyers market; shortage kept → sellers market"
  ]
 },
 {
  "id": "Q13",
  "label": "Q13",
  "week": 4,
  "slides": [
   13
  ],
  "kind": "calculation",
  "title": "Price ceiling: rent control and the housing shortage",
  "hook": "After this lesson you can read Figure 4-7, find the shortage of 400,000 apartments, and explain why a price ceiling makes the market inefficient.",
  "cards": [
   {
    "h": "Start from equilibrium",
    "body": "<p>Think about flats near a university in Tashkent. If rent is high, many owners want to rent out a flat, but fewer students want one. If rent is low, it is the opposite.</p><p>With no government rule, rent moves until the two numbers are equal. That point is <b>equilibrium (E)</b>.</p><p>Slide 12 gives the apartment market (Figure 4-6). Look at three rows of its table:</p><table><tr><th>Monthly rent</th><th>Quantity demanded</th><th>Quantity supplied</th></tr><tr><td>$1,200</td><td>1.8 million</td><td>2.2 million</td></tr><tr><td><b>$1,000</b></td><td><b>2.0 million</b></td><td><b>2.0 million</b></td></tr><tr><td>$800</td><td>2.2 million</td><td>1.8 million</td></tr></table><p>At $1,000 both sides want 2.0 million. So <b>E = $1,000 and 2.0 million apartments</b>. Pattern: every $100 less rent gives +0.1 million demanded and −0.1 million supplied.</p>"
   },
   {
    "h": "What is a price ceiling?",
    "body": "<p>A <b>price ceiling</b> is a <b>maximum</b> price that sellers are allowed to charge. The government sets it <b>below</b> the equilibrium price.</p><p>Example from class: <b>rent control</b>. A landlord cannot charge a tenant more than a certain amount.</p><p>Simple picture: the market price of a flat is $1,000, but the law says \"no more than $800\". The ceiling is like a lid on the price: the price cannot go up through it.</p><p>Small but important point: a ceiling <b>above</b> $1,000 (say $1,200) changes nothing, because the market price is already lower. Only a ceiling below equilibrium <b>binds</b> (has an effect).</p>"
   },
   {
    "h": "Slide 13: what happens at $800",
    "body": "<p>The government sets the ceiling at <b>$800</b>. Two things happen at the same time:</p><ul><li><b>Landlords offer fewer flats.</b> Move down the supply curve to point <b>A</b>: quantity supplied = <b>1.8 million</b>.</li><li><b>More people want flats.</b> Move down the demand curve to point <b>B</b>: quantity demanded = <b>2.2 million</b>.</li></ul><p><b>Shortage = Qd − Qs = 2.2 − 1.8 = 0.4 million = 400,000 apartments.</b></p><p>These are 400,000 people who want an apartment at the legal rent of $800 but cannot get one.</p><p>The shortage is <b>persistent</b> (it does not go away). Normally a shortage pushes the price up until it disappears. Here the law stops the price from rising, so the shortage stays.</p>",
    "chart": {
     "x": "Quantity of apartments (millions)",
     "y": "Monthly rent ($)",
     "xmax": 2.8,
     "ymax": 1600,
     "xticks": [
      1.6,
      1.8,
      2.0,
      2.2,
      2.4
     ],
     "yticks": [
      600,
      800,
      1000,
      1200,
      1400
     ],
     "lines": [
      {
       "pts": [
        [
         1.4,
         1600
        ],
        [
         2.6,
         400
        ]
       ],
       "label": "D",
       "role": "demand"
      },
      {
       "pts": [
        [
         1.4,
         400
        ],
        [
         2.6,
         1600
        ]
       ],
       "label": "S",
       "role": "supply"
      }
     ],
     "hlines": [
      {
       "y": 800,
       "label": "Price ceiling $800",
       "role": "policy"
      }
     ],
     "points": [
      {
       "x": 2.0,
       "y": 1000,
       "label": "E"
      },
      {
       "x": 1.8,
       "y": 800,
       "label": "A"
      },
      {
       "x": 2.2,
       "y": 800,
       "label": "B"
      }
     ],
     "arrows": [
      {
       "from": [
        1.8,
        690
       ],
       "to": [
        2.2,
        690
       ],
       "label": "shortage 0.4m"
      }
     ],
     "caption": "Figure 4-7 numbers: at the $800 ceiling, Qs = 1.8m (A) and Qd = 2.2m (B), so the shortage is 400,000."
    }
   },
   {
    "h": "Fewer flats are rented: the deadweight loss",
    "body": "<p>How many flats are really rented at $800? Not 2.2 million. You cannot rent a flat that nobody offers. So only <b>1.8 million</b> are rented (the smaller number, here supply).</p><p>So the quantity falls from 2.0 million to 1.8 million. For those 200,000 flats, some renters would happily pay more than the landlord needs. Both sides could gain, but the trade does not happen. This lost gain is the <b>deadweight loss (DWL)</b>.</p><p>Size, using the table: the demand price of 1.8 million flats is <b>$1,200</b> (point C). The triangle has corners C ($1,200), A ($800) and E ($1,000):</p><p><b>DWL = ½ × (1,200 − 800) × (2.0 − 1.8) million = ½ × 400 × 200,000 = $40 million per month.</b></p><p>(The slide does not print this number. We get it from the table.)</p>",
    "chart": {
     "x": "Quantity of apartments (millions)",
     "y": "Monthly rent ($)",
     "xmax": 2.8,
     "ymax": 1600,
     "xticks": [
      1.6,
      1.8,
      2.0,
      2.2,
      2.4
     ],
     "yticks": [
      600,
      800,
      1000,
      1200,
      1400
     ],
     "lines": [
      {
       "pts": [
        [
         1.4,
         1600
        ],
        [
         2.6,
         400
        ]
       ],
       "label": "D",
       "role": "demand"
      },
      {
       "pts": [
        [
         1.4,
         400
        ],
        [
         2.6,
         1600
        ]
       ],
       "label": "S",
       "role": "supply"
      }
     ],
     "hlines": [
      {
       "y": 800,
       "label": "Ceiling $800",
       "role": "policy"
      }
     ],
     "areas": [
      {
       "pts": [
        [
         1.8,
         1200
        ],
        [
         1.8,
         800
        ],
        [
         2.0,
         1000
        ]
       ],
       "role": "dwl",
       "label": "DWL"
      }
     ],
     "points": [
      {
       "x": 1.8,
       "y": 1200,
       "label": "C"
      },
      {
       "x": 1.8,
       "y": 800,
       "label": "A"
      },
      {
       "x": 2.0,
       "y": 1000,
       "label": "E"
      }
     ],
     "caption": "Only 1.8m flats are rented. The lost trades between 1.8m and 2.0m form the DWL triangle: ½ × $400 × 0.2m = $40m a month."
    }
   },
   {
    "h": "Winners and losers (the professor's slide 14 picture)",
    "body": "<p>The professor's own graph shows welfare after rent control. Welfare = consumer surplus + producer surplus.</p><ul><li><b>Consumer surplus (orange)</b>: tenants who get a flat now pay Pc instead of Pe. They <b>gain</b> the strip between Pc and Pe. But some tenants lose their flat.</li><li><b>Producer surplus (blue)</b>: landlords get less money per flat and rent fewer flats. Only a small triangle is left.</li><li><b>Deadweight loss (yellow)</b>: the triangle from Qc to Qe. Nobody gets it.</li></ul><p>With the slide 13 numbers: the strip = (1,000 − 800) × 1.8 million = $360 million a month moves from landlords to tenants. Tenants gain 360 − 20 = $340m, landlords lose 360 + 20 = $380m, society loses $40m (the DWL).</p><p>Note: slide 14 says \"market clearing quantity moves from Qe to Qc\". The market does <b>not</b> clear at Pc (there is a shortage). Read Qc as \"the quantity actually rented\".</p>",
    "chart": {
     "x": "Quantity",
     "y": "Price",
     "xmax": 10,
     "ymax": 11,
     "lines": [
      {
       "pts": [
        [
         0,
         10
        ],
        [
         10,
         0
        ]
       ],
       "label": "D",
       "role": "demand"
      },
      {
       "pts": [
        [
         0,
         2
        ],
        [
         8,
         10
        ]
       ],
       "label": "S",
       "role": "supply"
      }
     ],
     "areas": [
      {
       "pts": [
        [
         0,
         10
        ],
        [
         2,
         8
        ],
        [
         2,
         4
        ],
        [
         0,
         4
        ]
       ],
       "role": "cs",
       "label": "CS"
      },
      {
       "pts": [
        [
         0,
         2
        ],
        [
         2,
         4
        ],
        [
         0,
         4
        ]
       ],
       "role": "ps",
       "label": "PS"
      },
      {
       "pts": [
        [
         2,
         8
        ],
        [
         2,
         4
        ],
        [
         4,
         6
        ]
       ],
       "role": "dwl",
       "label": "DWL"
      }
     ],
     "hlines": [
      {
       "y": 4,
       "label": "Rent control Pc",
       "role": "policy"
      }
     ],
     "points": [
      {
       "x": 4,
       "y": 6,
       "label": "E (Pe, Qe)",
       "guides": true
      },
      {
       "x": 2,
       "y": 4,
       "label": "Qc",
       "guides": true
      }
     ],
     "caption": "Like slide 14: quantity falls from Qe to Qc. CS gains the Pc–Pe strip, PS shrinks, the yellow triangle is lost."
    }
   },
   {
    "h": "Why a ceiling is inefficient: four problems",
    "body": "<p><b>Inefficient</b> means there are missed chances: someone could be better off without making anyone worse off. The shortage causes four problems:</p><ol><li><b>Inefficient allocation to consumers</b>: a person who badly needs a flat (and would pay a lot) may not get one, while a person who cares little gets one.</li><li><b>Wasted resources</b>: people spend much time and money searching for a flat.</li><li><b>Inefficiently low quality</b>: landlords have no reason to repair flats, because people take them anyway.</li><li><b>Black markets</b>: a landlord asks for extra money \"under the table\" in addition to the legal rent.</li></ol><p>Why do ceilings exist then? The people who get cheap flats benefit, and they can be organised and politically strong.</p>"
   }
  ],
  "example": {
   "problem": "<p>Use the apartment table (equilibrium $1,000, 2.0 million). The city sets a price ceiling of <b>$900</b>. Find quantity supplied, quantity demanded, the shortage, the number of flats actually rented and the deadweight loss.</p>",
   "solution": "<p><b>Step 1.</b> $900 is below $1,000, so the ceiling binds.</p><p><b>Step 2.</b> Table row $900: Qd = 2.1 million, Qs = 1.9 million.</p><p><b>Step 3.</b> Shortage = 2.1 − 1.9 = <b>0.2 million = 200,000 apartments</b>.</p><p><b>Step 4.</b> Flats rented = the smaller number = <b>1.9 million</b>.</p><p><b>Step 5.</b> Demand price of 1.9 million = $1,100 (table row $1,100: Qd = 1.9). DWL = ½ × (1,100 − 900) × (2.0 − 1.9) million = ½ × 200 × 100,000 = <b>$10 million per month</b>.</p><p>A ceiling closer to equilibrium makes a smaller shortage and a smaller loss.</p>"
  },
  "check": [
   {
    "q": "At the $800 ceiling, which point is on the supply curve: A or B? What quantity?",
    "a": "A, on the supply curve: 1.8 million (quantity supplied)."
   },
   {
    "q": "Why does the shortage of 400,000 not disappear over time?",
    "a": "Because the law does not let the rent rise to $1,000. Without the ceiling, the shortage would push the price up."
   },
   {
    "q": "The government sets a ceiling of $1,200. What happens?",
    "a": "Nothing. The ceiling is above equilibrium ($1,000), so it does not bind. The market stays at $1,000 and 2.0 million."
   },
   {
    "q": "How many apartments are actually rented at $800?",
    "a": "1.8 million: the smaller of Qd (2.2m) and Qs (1.8m)."
   },
   {
    "q": "Name the four inefficiencies of a price ceiling.",
    "a": "Inefficient allocation to consumers, wasted resources, inefficiently low quality, black markets."
   }
  ],
  "exam": {
   "question": "<p>In the apartment market, equilibrium is a rent of $1,000 per month and 2 million apartments. The government imposes a price ceiling of $800. Using the graph, find the quantity supplied, the quantity demanded and the shortage, and explain why the price ceiling causes inefficiency.</p>",
   "answer": "<p><b>Definition:</b> a price ceiling is a maximum price sellers may charge, set below the equilibrium price (e.g. rent control).</p><p><b>Graph:</b> D and S cross at E ($1,000, 2.0m). Draw a horizontal line at $800. It cuts S at A (1.8m) and D at B (2.2m).</p><ul><li>Quantity supplied = 1.8 million (A)</li><li>Quantity demanded = 2.2 million (B)</li><li>Shortage = 2.2 − 1.8 = <b>0.4 million = 400,000 apartments</b>: people who want a flat at $800 but cannot get one</li></ul><p><b>Persistent:</b> the rent is not allowed to rise, so the shortage stays.</p><p><b>Inefficiency:</b> only 1.8 million flats are rented instead of 2.0 million, so mutually beneficial rentals are lost (deadweight loss = ½ × $400 × 0.2m = $40m per month). Also: inefficient allocation to consumers, wasted resources (time spent searching), inefficiently low quality, and black markets.</p>"
  },
  "memorize": [
   "Price ceiling = maximum price, set BELOW equilibrium (rent control)",
   "E = $1,000, 2.0m; ceiling $800 → Qs = 1.8m (A), Qd = 2.2m (B)",
   "Shortage = Qd − Qs = 0.4m = 400,000, persistent",
   "Rented = 1.8m (short side); DWL = ½ × 400 × 0.2m = $40m/month",
   "4 problems: allocation to consumers, wasted resources, low quality, black markets"
  ]
 },
 {
  "id": "Q14",
  "label": "Q14",
  "week": 4,
  "slides": [
   20,
   21,
   22,
   23,
   25
  ],
  "kind": "theory",
  "title": "Price floors: butter, minimum wage and deadweight loss",
  "hook": "After this lesson you can draw a price floor, show who wins and who loses, compute the $150,000 deadweight loss in the butter market, list the four reasons a floor is inefficient, and say what a quota is.",
  "cards": [
   {
    "h": "What is a price floor?",
    "body": "<p>A <b>price floor</b> is a <b>minimum</b> price that buyers must pay. The government sets it <b>above</b> the equilibrium price. It is the mirror of a ceiling.</p><p>Main example: the <b>minimum wage</b>, a legal floor on the price of labour. Careful with roles: here <b>firms are the buyers</b> (of labour) and <b>workers are the sellers</b>.</p><p>Class example: <b>butter</b> (slide 19). Without a floor, E = <b>$1.00 per pound, 10 million pounds</b>. Some table rows:</p><table><tr><th>Price</th><th>Qd (million lb)</th><th>Qs (million lb)</th></tr><tr><td>$1.20</td><td>9.0</td><td>12.0</td></tr><tr><td><b>$1.00</b></td><td><b>10.0</b></td><td><b>10.0</b></td></tr><tr><td>$0.90</td><td>10.5</td><td>9.0</td></tr></table>"
   },
   {
    "h": "Slide 20: the butter floor at $1.20",
    "body": "<p>The government says: butter must cost at least <b>$1.20</b>.</p><ul><li>Buyers want less: quantity demanded = <b>9 million</b> (point A).</li><li>Sellers want to sell more: quantity supplied = <b>12 million</b> (point C).</li></ul><p>Only <b>9 million</b> is sold, because you cannot sell butter that nobody buys. So the quantity falls from 10 to 9 million. That is why the figure is called \"A price floor causes inefficiently low quantity\".</p><p>The rest is a <b>persistent surplus</b> = 12 − 9 = <b>3 million pounds</b> of unsold butter.</p>",
    "chart": {
     "x": "Quantity of butter (millions of pounds)",
     "y": "Price of butter ($ per pound)",
     "xmax": 15,
     "ymax": 1.6,
     "xticks": [
      6,
      8,
      9,
      10,
      12,
      14
     ],
     "yticks": [
      0.6,
      0.8,
      1.0,
      1.2,
      1.4
     ],
     "lines": [
      {
       "pts": [
        [
         7,
         1.6
        ],
        [
         15,
         0
        ]
       ],
       "label": "D",
       "role": "demand"
      },
      {
       "pts": [
        [
         5,
         0.5
        ],
        [
         15,
         1.5
        ]
       ],
       "label": "S",
       "role": "supply"
      }
     ],
     "hlines": [
      {
       "y": 1.2,
       "label": "Floor $1.20",
       "role": "policy"
      }
     ],
     "areas": [
      {
       "pts": [
        [
         9,
         1.2
        ],
        [
         9,
         0.9
        ],
        [
         10,
         1.0
        ]
       ],
       "role": "dwl",
       "label": "DWL"
      }
     ],
     "points": [
      {
       "x": 9,
       "y": 1.2,
       "label": "A"
      },
      {
       "x": 9,
       "y": 0.9,
       "label": "B"
      },
      {
       "x": 10,
       "y": 1.0,
       "label": "E"
      },
      {
       "x": 12,
       "y": 1.2,
       "label": "C"
      }
     ],
     "arrows": [
      {
       "from": [
        9,
        1.4
       ],
       "to": [
        12,
        1.4
       ],
       "label": "surplus 3m lb"
      }
     ],
     "caption": "Figure 4-12 numbers: at $1.20, Qd = 9m (A) and Qs = 12m (C). B = (9m, $0.90) on S. DWL triangle A–B–E."
    }
   },
   {
    "h": "The deadweight loss triangle",
    "body": "<p>Between 9 and 10 million pounds, buyers value butter at more than $1.00 and sellers can make it for less than $1.00. Both would gain from trading, but at $1.20 buyers will not buy it. These lost trades are the <b>deadweight loss</b>.</p><p>The triangle (yellow on slide 20) has corners:</p><ul><li>A = (9m, $1.20) on the demand curve</li><li>B = (9m, $0.90) on the supply curve (the supply price of 9m)</li><li>E = (10m, $1.00)</li></ul><p><b>DWL = ½ × (1.20 − 0.90) × (10 − 9) million = ½ × 0.30 × 1,000,000 = $150,000.</b></p><p>(The slide shows the triangle but not the number. We compute it from the table.)</p>"
   },
   {
    "h": "Slide 21: who wins, who loses",
    "body": "<p>The professor's own graph. Quantity falls from Qe to <b>Qf</b> (Qf = quantity demanded at Pf).</p><table><tr><th></th><th>Before (Pe, Qe)</th><th>After floor (Pf, Qf)</th></tr><tr><td>Consumer surplus (orange)</td><td>big triangle above Pe</td><td>only the small triangle above Pf. Loses the Pe–Pf strip and the part Qf→Qe</td></tr><tr><td>Producer surplus (blue)</td><td>triangle below Pe</td><td><b>gains</b> the Pe–Pf strip (taken from consumers), loses the part Qf→Qe</td></tr><tr><td>Deadweight loss (yellow)</td><td>none</td><td>triangle Qf→Qe</td></tr></table><p>Butter numbers: the strip = (1.20 − 1.00) × 9m = $1.8 million moves from buyers to sellers. CS falls by $1.9m, PS rises by $1.75m, society loses $150,000.</p><p>Note: slide 21 says \"market clearing quantity reduces from Qe to Qf\". At Pf the market does <b>not</b> clear (there is a surplus). Read Qf as \"the quantity actually bought\".</p>",
    "chart": {
     "x": "Quantity",
     "y": "Price",
     "xmax": 10,
     "ymax": 11,
     "lines": [
      {
       "pts": [
        [
         0,
         10
        ],
        [
         10,
         0
        ]
       ],
       "label": "D",
       "role": "demand"
      },
      {
       "pts": [
        [
         0,
         2
        ],
        [
         8,
         10
        ]
       ],
       "label": "S",
       "role": "supply"
      }
     ],
     "areas": [
      {
       "pts": [
        [
         0,
         10
        ],
        [
         2,
         8
        ],
        [
         0,
         8
        ]
       ],
       "role": "cs",
       "label": "CS"
      },
      {
       "pts": [
        [
         0,
         8
        ],
        [
         2,
         8
        ],
        [
         2,
         4
        ],
        [
         0,
         2
        ]
       ],
       "role": "ps",
       "label": "PS"
      },
      {
       "pts": [
        [
         2,
         8
        ],
        [
         2,
         4
        ],
        [
         4,
         6
        ]
       ],
       "role": "dwl",
       "label": "DWL"
      }
     ],
     "hlines": [
      {
       "y": 8,
       "label": "Price floor Pf",
       "role": "policy"
      }
     ],
     "points": [
      {
       "x": 4,
       "y": 6,
       "label": "E (Pe, Qe)",
       "guides": true
      },
      {
       "x": 2,
       "y": 8,
       "label": "Qf",
       "guides": true
      }
     ],
     "caption": "Like slide 21: CS shrinks to the small top triangle, PS gains the Pe–Pf strip, the yellow triangle is lost."
    }
   },
   {
    "h": "Slides 22–23: why a floor is inefficient",
    "body": "<p>A floor causes four problems. They mirror the four ceiling problems:</p><table><tr><th>Price floor</th><th>Price ceiling (mirror)</th></tr><tr><td><b>1. Inefficient allocation of sales among sellers</b>: the sellers who could sell at the lowest price are not always the ones who manage to sell.</td><td>Inefficient allocation to consumers</td></tr><tr><td><b>2. Wasted resources</b>: the government buys the unwanted surplus. It is destroyed (pure waste) or goes \"out of condition\" in storage and is thrown away.</td><td>Wasted resources (searching)</td></tr><tr><td><b>3. Inefficiently high quality</b>: sellers offer high quality at a high price, but buyers would prefer lower quality at a lower price. It is a <b>buyer's market</b>: buyers choose the sellers they like.</td><td>Inefficiently low quality</td></tr><tr><td><b>4. Illegal activity</b>: e.g. a firm pays less than the minimum wage and bribes the inspector.</td><td>Black markets</td></tr></table><p>Small slide slip: slide 22 says \"government purchases unwanted surpluses\"; it means \"government purchases <b>of</b> unwanted surpluses\".</p>"
   },
   {
    "h": "Slide 25: a quota controls quantity, not price",
    "body": "<p>The last slide in this question moves to a new tool.</p><ul><li>A <b>quantity control</b>, or <b>quota</b>, is an <b>upper limit</b> on the quantity of a good that can be bought or sold.</li><li>The total amount that can be legally traded is the <b>quota limit</b>.</li><li>A <b>license</b> gives its owner the right to supply the good (e.g. taxi licenses).</li></ul><p>Compare: a <b>price floor</b> fixes the <b>price</b>, and the quantity falls as a result. A <b>quota</b> fixes the <b>quantity</b> directly. Both cut the quantity below Qe, so both create a deadweight-loss triangle. (Quotas in detail: lesson Q16.)</p>"
   }
  ],
  "example": {
   "problem": "<p>Butter market (equilibrium $1.00, 10 million pounds). The government sets a price floor of <b>$1.40</b>. Using the table, find the quantity sold, the surplus and the deadweight loss.</p>",
   "solution": "<p><b>Step 1.</b> $1.40 &gt; $1.00, so the floor binds.</p><p><b>Step 2.</b> Table row $1.40: Qd = 8.0 million, Qs = 14.0 million.</p><p><b>Step 3.</b> Quantity sold = the smaller number = <b>8 million pounds</b>.</p><p><b>Step 4.</b> Surplus = 14 − 8 = <b>6 million pounds</b>.</p><p><b>Step 5.</b> Supply price of 8 million = $0.80 (table row $0.80: Qs = 8.0). DWL = ½ × (1.40 − 0.80) × (10 − 8) million = ½ × 0.60 × 2,000,000 = <b>$600,000</b>.</p><p>A higher floor means a bigger surplus and a bigger loss.</p>"
  },
  "check": [
   {
    "q": "The government sets a butter floor of $0.80. What happens?",
    "a": "Nothing. $0.80 is below equilibrium ($1.00), so the floor does not bind."
   },
   {
    "q": "At the $1.20 floor, how much butter is sold, and why?",
    "a": "9 million pounds. Buyers only want 9m at $1.20; sellers cannot sell what nobody buys."
   },
   {
    "q": "Which surplus gains the rectangle between Pe and Pf?",
    "a": "Producer surplus. It is taken from consumers."
   },
   {
    "q": "What does \"inefficiently high quality\" mean?",
    "a": "Sellers compete with high quality at a high price, but buyers would prefer cheaper, lower quality. It is a buyer's market."
   },
   {
    "q": "Price floor vs quota: what does each one fix?",
    "a": "A floor fixes the price (minimum). A quota fixes the quantity (upper limit)."
   }
  ],
  "exam": {
   "question": "<p>Explain the effects of a price floor using a graph: what happens to quantity, consumer surplus, producer surplus and deadweight loss? Give the reasons why a price floor causes inefficiency. What is a quota and a license?</p>",
   "answer": "<p><b>1. Definition:</b> a price floor is a minimum price buyers must pay, set above the equilibrium price (e.g. minimum wage).</p><p><b>2. Graph:</b> D and S cross at Pe, Qe. Draw a horizontal line at Pf above Pe. At Pf buyers demand only Qf &lt; Qe, so the quantity sold falls to Qf. Sellers want to sell more than Qf → persistent surplus.</p><ul><li>Consumer surplus falls to the small triangle above Pf.</li><li>Producer surplus gains the rectangle (Pf − Pe) × Qf from consumers, but loses the area between Qf and Qe.</li><li>Deadweight loss = the triangle between D and S from Qf to Qe (lost mutually beneficial trades).</li></ul><p><b>Butter:</b> Pe = $1.00, Qe = 10m; floor $1.20 → Qd = 9m, Qs = 12m, surplus 3m lb; DWL = ½ × (1.20 − 0.90) × 1m = <b>$150,000</b>.</p><p><b>3. Why inefficient:</b> (1) inefficient allocation of sales among sellers; (2) wasted resources (surplus bought, destroyed or spoiled); (3) inefficiently high quality (buyer's market); (4) illegal activity (bribery, paying below the minimum wage).</p><p><b>4. Quota:</b> an upper limit on the quantity of a good that can be bought or sold; the legal total is the quota limit. A <b>license</b> gives its owner the right to supply the good.</p>"
  },
  "memorize": [
   "Price floor = minimum price, set ABOVE equilibrium (minimum wage: firms buy, workers sell)",
   "Butter: E = $1.00, 10m; floor $1.20 → Qd 9m, Qs 12m, surplus 3m",
   "DWL = ½ × (1.20 − 0.90) × 1m = $150,000",
   "Floor: CS shrinks, PS gains Pe–Pf strip, yellow DWL triangle Qf→Qe",
   "4 problems: allocation of sales among sellers, wasted resources, high quality, illegal activity",
   "Quota = upper limit on quantity; quota limit = legal total; license = right to supply"
  ],
  "note": "Slide 25 (quota definitions) is grouped with the price-floor slides in this question, so the lesson ends with a short floor-vs-quota comparison. The full quota lesson is Q16."
 },
 {
  "id": "Q16",
  "label": "Q16",
  "week": 4,
  "slides": [
   25,
   29
  ],
  "kind": "calculation",
  "title": "Quotas and licenses: the wedge and the quota rent",
  "hook": "After this lesson you can define a quota and a license, find the demand price and supply price at the quota, and compute the quota rent ($2 per ride, $16 million) in the taxi example.",
  "cards": [
   {
    "h": "Slide 25: what is a quota?",
    "body": "<p>Imagine a city says: \"Only license holders may drive a taxi, and we give out a fixed number of licenses.\" Now the number of rides cannot grow, even if people want more.</p><ul><li>A <b>quantity control</b>, or <b>quota</b>, is an <b>upper limit</b> on the quantity of a good that can be bought or sold.</li><li>The total amount that can be legally traded is the <b>quota limit</b>.</li><li>A <b>license</b> gives its owner the right to supply the good.</li></ul><p>Class example: taxi rides. Without control, E = <b>$5.00 per ride, 10 million rides per year</b>. The city sets a quota of <b>8 million rides</b>.</p><p>A quota above 10 million would change nothing (it does not bind).</p>"
   },
   {
    "h": "One quantity, two prices",
    "body": "<p>To understand slide 29 you need two words (from slide 27):</p><ul><li><b>Demand price</b> of a quantity = the price at which buyers would want exactly that quantity.</li><li><b>Supply price</b> of a quantity = the price at which sellers would supply exactly that quantity.</li></ul><p>Read the taxi table \"sideways\": start from the quantity, find the price.</p><table><tr><th>Fare</th><th>Qd (million rides)</th><th>Qs (million rides)</th></tr><tr><td>$6.00</td><td><b>8</b></td><td>12</td></tr><tr><td>$5.00</td><td>10</td><td>10</td></tr><tr><td>$4.00</td><td>12</td><td><b>8</b></td></tr></table><p>For 8 million rides: <b>demand price = $6.00</b> (riders want 8m at $6), <b>supply price = $4.00</b> (drivers offer 8m at $4).</p>"
   },
   {
    "h": "Slide 29: the wedge",
    "body": "<p>With only 8 million rides, taxis are scarce, so riders pay the demand price: <b>$6</b> (point A). But drivers would happily give 8 million rides for only <b>$4</b> (point B).</p><p>The quota pushes a <b>wedge</b> between the two prices: <b>the price buyers pay is higher than the price sellers need</b>.</p><p>Wedge = demand price − supply price = 6 − 4 = <b>$2 per ride</b>.</p>",
    "chart": {
     "x": "Quantity of rides (millions per year)",
     "y": "Fare per ride ($)",
     "xmax": 21,
     "ymax": 11,
     "xticks": [
      4,
      8,
      10,
      12,
      16,
      20
     ],
     "yticks": [
      2,
      4,
      5,
      6,
      8,
      10
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         10
        ],
        [
         20,
         0
        ]
       ],
       "label": "D",
       "role": "demand"
      },
      {
       "pts": [
        [
         0,
         0
        ],
        [
         20,
         10
        ]
       ],
       "label": "S",
       "role": "supply"
      }
     ],
     "vlines": [
      {
       "x": 8,
       "label": "Quota 8m",
       "role": "policy"
      }
     ],
     "points": [
      {
       "x": 8,
       "y": 6,
       "label": "A",
       "guides": true
      },
      {
       "x": 8,
       "y": 4,
       "label": "B",
       "guides": true
      },
      {
       "x": 10,
       "y": 5,
       "label": "E"
      }
     ],
     "arrows": [
      {
       "from": [
        4,
        4
       ],
       "to": [
        4,
        6
       ],
       "label": "wedge $2"
      }
     ],
     "caption": "Figure 4-14 numbers: at the 8m quota, demand price = $6 (A), supply price = $4 (B). The wedge is $2."
    }
   },
   {
    "h": "Who gets the $2? The quota rent",
    "body": "<p>The difference between the demand price and the supply price at the quota limit is the <b>quota rent</b>. It is the money the <b>license holder</b> earns just because they own the right to sell.</p><p>If licenses can be traded or rented out, the quota rent is the <b>market price of the license</b>.</p><p>The professor's taxi story (slide 30): I own the only license but cannot drive today, so I rent my taxi to a driver. The driver collects $6 and needs to keep at least $4.</p><table><tr><th>Rent I ask</th><th>Driver keeps</th><th>Result</th></tr><tr><td>$1.00</td><td>$5.00</td><td>possible, but another driver offers $1.50</td></tr><tr><td><b>$2.00</b></td><td><b>$4.00</b></td><td><b>exactly enough: both happy</b></td></tr><tr><td>$2.50</td><td>$3.50</td><td>impossible: less than $4, nobody rents</td></tr></table><p>Drivers compete the rent up to $2, and it cannot go higher. So <b>quota rent = $6 − $4 = $2 per ride</b>. Total = $2 × 8 million = <b>$16 million per year</b>.</p>"
   },
   {
    "h": "The full picture: rent and deadweight loss",
    "body": "<p>Now put everything on one graph (like the professor's slide 32):</p><ul><li><b>Quota rent</b> (green rectangle): height $2, width 8m = <b>$16 million</b>. It goes to license holders. Part of it came from riders (above $5) and part from drivers (below $5).</li><li><b>Deadweight loss</b> (yellow triangle A–B–E): 2 million rides that both sides wanted are lost. DWL = ½ × (6 − 4) × (10 − 8) million = <b>$2 million</b>.</li><li>Consumer surplus and producer surplus both shrink (each falls by $9m).</li></ul><p>Costs of quotas (slide 31): missed mutually beneficial trades (\"there are drivers to provide rides and riders willing to pay for it\") and illegal activity (unlicensed cars pick up riders).</p>",
    "chart": {
     "x": "Quantity of rides (millions per year)",
     "y": "Fare per ride ($)",
     "xmax": 21,
     "ymax": 11,
     "xticks": [
      8,
      10,
      20
     ],
     "yticks": [
      4,
      5,
      6,
      10
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         10
        ],
        [
         20,
         0
        ]
       ],
       "label": "D",
       "role": "demand"
      },
      {
       "pts": [
        [
         0,
         0
        ],
        [
         20,
         10
        ]
       ],
       "label": "S",
       "role": "supply"
      }
     ],
     "vlines": [
      {
       "x": 8,
       "label": "Quota",
       "role": "policy"
      }
     ],
     "areas": [
      {
       "pts": [
        [
         0,
         10
        ],
        [
         8,
         6
        ],
        [
         0,
         6
        ]
       ],
       "role": "cs",
       "label": "CS"
      },
      {
       "pts": [
        [
         0,
         6
        ],
        [
         8,
         6
        ],
        [
         8,
         4
        ],
        [
         0,
         4
        ]
       ],
       "role": "tax",
       "label": "Quota rent $16m"
      },
      {
       "pts": [
        [
         0,
         0
        ],
        [
         8,
         4
        ],
        [
         0,
         4
        ]
       ],
       "role": "ps",
       "label": "PS"
      },
      {
       "pts": [
        [
         8,
         6
        ],
        [
         8,
         4
        ],
        [
         10,
         5
        ]
       ],
       "role": "dwl",
       "label": "DWL"
      }
     ],
     "points": [
      {
       "x": 8,
       "y": 6,
       "label": "A"
      },
      {
       "x": 8,
       "y": 4,
       "label": "B"
      },
      {
       "x": 10,
       "y": 5,
       "label": "E"
      }
     ],
     "caption": "Quota rent = $2 × 8m = $16m a year (to license holders). DWL = ½ × $2 × 2m = $2m a year."
    }
   }
  ],
  "example": {
   "problem": "<p>Same taxi market (equilibrium $5, 10 million rides). The city sets the quota at <b>9 million rides</b>. Find the demand price, the supply price, the quota rent per ride and in total, and the deadweight loss.</p>",
   "solution": "<p><b>Step 1.</b> 9m &lt; 10m, so the quota binds.</p><p><b>Step 2.</b> Read the table sideways: Qd = 9 at <b>$5.50</b> → demand price = $5.50. Qs = 9 at <b>$4.50</b> → supply price = $4.50.</p><p><b>Step 3.</b> Quota rent per ride = 5.50 − 4.50 = <b>$1.00</b>.</p><p><b>Step 4.</b> Total quota rent = $1 × 9 million = <b>$9 million per year</b>.</p><p><b>Step 5.</b> DWL = ½ × (5.50 − 4.50) × (10 − 9) million = <b>$0.5 million</b>.</p><p>A tighter quota (8m) gives a bigger wedge ($2) and a bigger loss ($2m).</p>"
  },
  "check": [
   {
    "q": "What is the quota limit?",
    "a": "The total amount of the good that can be legally bought or sold."
   },
   {
    "q": "At a quota of 8 million rides, what are the demand price and the supply price?",
    "a": "Demand price $6.00, supply price $4.00."
   },
   {
    "q": "Why can the license owner not charge $2.50 rent per ride?",
    "a": "The driver would keep only $6 − $2.50 = $3.50, less than the $4 he needs, so nobody would rent."
   },
   {
    "q": "Licenses are traded. What is a license worth per ride?",
    "a": "The quota rent: $2 per ride."
   },
   {
    "q": "The city sets a quota of 12 million rides. What happens?",
    "a": "Nothing. 12m is above the equilibrium 10m, so the quota does not bind: no wedge, no rent."
   }
  ],
  "exam": {
   "question": "<p>Define a quota (quantity control) and a license. In the taxi market, equilibrium is 10 million rides at $5. The city limits rides to 8 million. At 8 million rides the demand price is $6 and the supply price is $4. Find the quota rent per ride and in total, explain who receives it, and find the deadweight loss.</p>",
   "answer": "<p><b>Definitions:</b> a quantity control, or quota, is an upper limit on the quantity of a good that can be bought or sold; the total amount that can be legally transacted is the quota limit. A license gives its owner the right to supply the good.</p><p><b>Wedge:</b> the quota drives a wedge between the demand price and the supply price: buyers pay more than sellers receive (need).</p><ul><li>Demand price at 8m = $6; supply price at 8m = $4</li><li><b>Quota rent per ride</b> = 6 − 4 = <b>$2</b></li><li><b>Total quota rent</b> = $2 × 8 million = <b>$16 million</b> per year</li></ul><p><b>Who gets it:</b> the license holders, from owning the right to sell. When licenses are traded, the quota rent equals the license's market price. (A driver who rents a license pays $2, keeps $6 − $2 = $4, exactly his supply price.)</p><p><b>Deadweight loss:</b> 2 million mutually beneficial rides are lost: ½ × ($6 − $4) × (10 − 8) million = <b>$2 million</b>.</p>"
  },
  "memorize": [
   "Quota = upper limit on quantity; quota limit = legal total; license = right to supply",
   "Demand price = price at which buyers want that quantity; supply price = price at which sellers supply it",
   "Wedge: demand price &gt; supply price at the quota",
   "Quota rent = demand price − supply price = license price (if traded)",
   "Taxi: $6 − $4 = $2/ride; × 8m = $16m; DWL = ½ × 2 × 2m = $2m"
  ],
  "note": "Slide 29 is text only. The numbers ($6, $4, 8 million rides) come from Figure 4-14 on slide 28 and the professor's taxi story on slide 30."
 },
 {
  "id": "Q9",
  "label": "Q9",
  "week": 5,
  "slides": [
   12
  ],
  "kind": "theory",
  "title": "What a price rise does to total revenue: dR/dP = Q(1 − e)",
  "hook": "After this lesson you can look at one number, the elasticity e, and say if a price rise makes the seller richer or poorer.",
  "cards": [
   {
    "h": "Total revenue = price × quantity",
    "body": "<p>You sell bread at the bazaar: 100 loaves at 4,000 som each. Your <b>total revenue</b> is R = P × Q = 4,000 × 100 = 400,000 som.</p><p>On a demand graph, revenue is a <b>rectangle</b>: height = price, width = quantity. Slide 10 shows a bridge toll: $0.90 × 1,100 crossings = <b>$990</b>.</p>"
   },
   {
    "h": "A price rise pulls revenue two ways",
    "body": "<p>When the seller raises the price, two things happen at the same time:</p><ul><li><b>Price effect</b> (area C): every unit you still sell brings more money. Revenue goes <b>up</b>.</li><li><b>Quantity effect</b> (area A): buyers buy fewer units. Revenue goes <b>down</b>.</li></ul><p>With the slide 10 numbers, C = $0.20 × 900 = $180 and A = $0.90 × 200 = $180. They cancel, so revenue stays $990. Which effect wins in general? <b>Elasticity decides.</b></p>",
    "chart": {
     "x": "Quantity of crossings (per day)",
     "y": "Price of crossing ($)",
     "xmax": 1400,
     "ymax": 1.5,
     "xticks": [
      900,
      1100
     ],
     "yticks": [
      0.9,
      1.1
     ],
     "lines": [
      {
       "pts": [
        [
         700,
         1.414
        ],
        [
         800,
         1.238
        ],
        [
         900,
         1.1
        ],
        [
         1000,
         0.99
        ],
        [
         1100,
         0.9
        ],
        [
         1250,
         0.792
        ],
        [
         1400,
         0.707
        ]
       ],
       "label": "D",
       "role": "demand"
      }
     ],
     "areas": [
      {
       "pts": [
        [
         0,
         0
        ],
        [
         900,
         0
        ],
        [
         900,
         0.9
        ],
        [
         0,
         0.9
        ]
       ],
       "role": "other",
       "label": "B: kept $810"
      },
      {
       "pts": [
        [
         0,
         0.9
        ],
        [
         900,
         0.9
        ],
        [
         900,
         1.1
        ],
        [
         0,
         1.1
        ]
       ],
       "role": "cs",
       "label": "C: +$180"
      },
      {
       "pts": [
        [
         900,
         0
        ],
        [
         1100,
         0
        ],
        [
         1100,
         0.9
        ],
        [
         900,
         0.9
        ]
       ],
       "role": "dwl",
       "label": "A: −$180"
      }
     ],
     "points": [
      {
       "x": 900,
       "y": 1.1,
       "label": "after"
      },
      {
       "x": 1100,
       "y": 0.9,
       "label": "before"
      }
     ],
     "caption": "Price $0.90 → $1.10. Gain C (price effect) = $180, loss A (quantity effect) = $180. Revenue stays $990."
    }
   },
   {
    "h": "The formula on slide 12",
    "body": "<p><b>dR/dP = Q(1 − e)</b></p><ul><li>dR/dP means: \"if the price goes up a little, how much does revenue change?\"</li><li>Q = quantity sold. It is always <b>positive</b>.</li><li>e = price elasticity of demand (a positive number).</li></ul><p>Because Q &gt; 0, the <b>sign</b> of dR/dP is the sign of <b>(1 − e)</b>. So only e decides if revenue goes up or down. (Where the formula comes from is lesson Q18.)</p>"
   },
   {
    "h": "The three cases",
    "body": "<table><tr><th>e</th><th>1 − e</th><th>dR/dP</th><th>Seller raises price → revenue</th></tr><tr><td>e &lt; 1 (inelastic)</td><td>&gt; 0</td><td>&gt; 0</td><td><b>increases</b>, even though Q decreases</td></tr><tr><td>e = 1 (unit-elastic)</td><td>= 0</td><td>= 0</td><td><b>does not change</b>; revenue is at its maximum (or minimum)</td></tr><tr><td>e &gt; 1 (elastic)</td><td>&lt; 0</td><td>&lt; 0</td><td><b>decreases</b>: \"demand decreases too much\"</td></tr></table><p>Simple picture: inelastic buyers stay, so the price effect wins. Elastic buyers run away, so the quantity effect wins.</p>"
   },
   {
    "h": "Where is each case on a demand line?",
    "body": "<p>On a straight demand line, elasticity is <b>not the same</b> everywhere. High prices (top part): elastic. Low prices (bottom part): inelastic. In the middle: e = 1, and revenue is the biggest there.</p><p>Table 5-1 examples: <b>eggs e = 0.1</b>, inelastic, so an egg seller earns more by raising the price. <b>Foreign travel e = 4.1</b>, elastic, so a travel company earns more by <b>cutting</b> the price.</p>",
    "chart": {
     "x": "Quantity Q",
     "y": "Price P",
     "xmax": 100,
     "ymax": 50,
     "xticks": [
      20,
      50,
      80
     ],
     "yticks": [
      10,
      25,
      40
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         50
        ],
        [
         100,
         0
        ]
       ],
       "label": "D: Q = 100 − 2P",
       "role": "demand"
      }
     ],
     "points": [
      {
       "x": 20,
       "y": 40,
       "label": "e = 4 (elastic): raise P → R falls",
       "guides": true
      },
      {
       "x": 50,
       "y": 25,
       "label": "e = 1: R is maximum",
       "guides": true
      },
      {
       "x": 80,
       "y": 10,
       "label": "e = 0.25 (inelastic): raise P → R rises",
       "guides": true
      }
     ],
     "caption": "On a straight demand line: top part elastic, bottom part inelastic, middle e = 1."
    }
   }
  ],
  "example": {
   "problem": "<p>Use dR/dP = Q(1 − e).</p><p>(a) An egg seller sells Q = 1,000 eggs a day; e = 0.1.<br>(b) An airline sells Q = 500 tickets a day; e = 2.4.</p><p>For each one, find the sign of dR/dP. Should the seller raise the price to earn more revenue?</p>",
   "solution": "<p><b>(a)</b> dR/dP = 1,000 × (1 − 0.1) = 1,000 × 0.9 = <b>900 &gt; 0</b>. Demand is inelastic (e &lt; 1). A higher price raises revenue, so <b>yes, raise the price</b>.</p><p><b>(b)</b> dR/dP = 500 × (1 − 2.4) = 500 × (−1.4) = <b>−700 &lt; 0</b>. Demand is elastic (e &gt; 1). A higher price lowers revenue, because buyers leave. So <b>no</b>. To earn more, the airline should <b>lower</b> the price.</p>"
  },
  "check": [
   {
    "q": "e = 0.3. What is the sign of dR/dP? What happens to revenue if the price goes up?",
    "a": "1 − 0.3 = 0.7 &gt; 0, so dR/dP &gt; 0. Revenue goes <b>up</b>."
   },
   {
    "q": "e = 1. The seller raises the price a little. What happens to revenue?",
    "a": "Nothing: dR/dP = 0. Revenue is at its maximum (or minimum)."
   },
   {
    "q": "Why can revenue fall when the price goes up?",
    "a": "Because Q falls too much: the quantity effect (lost units) is bigger than the price effect (higher price per unit). This happens when e &gt; 1."
   },
   {
    "q": "Foreign travel has e = 4.1. To earn more, raise or cut the price?",
    "a": "Cut the price. Elastic demand: a lower price raises revenue."
   }
  ],
  "exam": {
   "question": "<p>Explain the meaning of dR/dP = Q(1 − e). What happens to the seller's total revenue when he raises the price, if demand is (1) inelastic, (2) unit-elastic, (3) elastic?</p>",
   "answer": "<p>R = P × Q is total revenue and e is the price elasticity of demand. dR/dP = Q(1 − e) shows how revenue changes when the price rises. Since Q &gt; 0, the sign of dR/dP is the sign of (1 − e).</p><ol><li><b>Inelastic (e &lt; 1):</b> 1 − e &gt; 0, so dR/dP &gt; 0. As price goes up, total revenue increases, even though the quantity demanded decreases. The seller's revenue increases if he raises the price.</li><li><b>Unit-elastic (e = 1):</b> dR/dP = 0. Although the price changes, total revenue does not change. At e = 1 total revenue is at its maximum (or minimum).</li><li><b>Elastic (e &gt; 1):</b> 1 − e &lt; 0, so dR/dP &lt; 0. As price goes up, total revenue decreases, because the quantity demanded decreases too much.</li></ol>"
  },
  "memorize": [
   "R = P × Q; dR/dP = Q(1 − e)",
   "Q &gt; 0, so the sign of dR/dP = the sign of (1 − e)",
   "e &lt; 1 (inelastic): raise price → revenue UP",
   "e = 1: revenue unchanged; revenue is max (or min)",
   "e &gt; 1 (elastic): raise price → revenue DOWN (Q falls too much)"
  ]
 },
 {
  "id": "Q17",
  "label": "Q17",
  "week": 5,
  "slides": [
   9
  ],
  "kind": "theory",
  "title": "Four things that make demand elastic or inelastic",
  "hook": "After this lesson you can look at any good and explain why buyers react strongly or weakly to its price.",
  "cards": [
   {
    "h": "Quick recall: what elasticity measures",
    "body": "<p>Price elasticity of demand: e = (% change in quantity demanded) ÷ (% change in price).</p><ul><li><b>e &gt; 1, elastic:</b> buyers react a lot. The demand curve looks <b>flat</b>.</li><li><b>e &lt; 1, inelastic:</b> buyers react a little. The demand curve looks <b>steep</b>.</li></ul><p>Slide 9 asks: <i>why</i> is demand elastic for some goods and inelastic for others? It names four factors.</p>",
    "chart": {
     "x": "Quantity",
     "y": "Price",
     "xmax": 10,
     "ymax": 10,
     "xticks": [
      2.5,
      4.8
     ],
     "yticks": [
      5,
      6
     ],
     "lines": [
      {
       "pts": [
        [
         4,
         10
        ],
        [
         6,
         0
        ]
       ],
       "label": "steep D: inelastic",
       "role": "demand"
      },
      {
       "pts": [
        [
         0,
         7
        ],
        [
         10,
         3
        ]
       ],
       "label": "flat D: elastic",
       "role": "demand"
      }
     ],
     "points": [
      {
       "x": 5,
       "y": 5,
       "label": "start",
       "guides": true
      },
      {
       "x": 4.8,
       "y": 6,
       "label": "Q = 4.8",
       "guides": true
      },
      {
       "x": 2.5,
       "y": 6,
       "label": "Q = 2.5",
       "guides": true
      }
     ],
     "caption": "Same price rise (5 → 6, +20%). Steep curve: Q falls only 4%. Flat curve: Q falls 50%."
    }
   },
   {
    "h": "Factor 1: are close substitutes available?",
    "body": "<p>At the bazaar, ten stalls sell the same bread. If one stall raises its price, you just walk to the next stall. Many close substitutes → buyers switch easily → <b>more elastic</b>.</p><p>Insulin for a diabetic person has no substitute. Even if the price goes up, they must buy it → <b>inelastic</b>.</p><p>Rule: <b>more close substitutes → more elastic</b>.</p>"
   },
   {
    "h": "Factor 2: necessity or luxury?",
    "body": "<p>A <b>necessity</b> is something you need every day. You keep buying it when the price rises → <b>inelastic</b>. Eggs: e = 0.1 (Table 5-1).</p><p>A <b>luxury</b> is something you can live without. When it gets expensive, you skip it → <b>elastic</b>. Foreign travel: e = 4.1.</p>"
   },
   {
    "h": "Factor 3: time",
    "body": "<p>Gasoline price goes up. Next week you still drive to work: you have no other way yet. After a few years you can buy a smaller car, move closer, or use the metro.</p><p>Rule: <b>the longer the time after a price change, the more elastic</b> demand becomes. Buyers need time to find substitutes. (This is the chapter opener on slide 2: \"Drive we must\", gasoline e = 0.5 in the short run.)</p>",
    "chart": {
     "x": "Quantity of gasoline",
     "y": "Price of gasoline",
     "xmax": 10,
     "ymax": 10,
     "xticks": [
      3,
      5
     ],
     "yticks": [
      5,
      7
     ],
     "lines": [
      {
       "pts": [
        [
         4.5,
         10
        ],
        [
         5.5,
         0
        ]
       ],
       "label": "short run (steep)",
       "role": "demand"
      },
      {
       "pts": [
        [
         2,
         8
        ],
        [
         8,
         2
        ]
       ],
       "label": "long run (flatter)",
       "role": "demand2"
      }
     ],
     "points": [
      {
       "x": 5,
       "y": 5,
       "label": "start",
       "guides": true
      },
      {
       "x": 4.8,
       "y": 7,
       "label": "next week"
      },
      {
       "x": 3,
       "y": 7,
       "label": "after years",
       "guides": true
      }
     ],
     "caption": "Price rises 5 → 7. Next week people buy almost the same. After some years they buy much less."
    }
   },
   {
    "h": "Factor 4: share of the consumer's budget",
    "body": "<p>Salt costs very little. If its price rises 20%, you hardly notice → <b>inelastic</b>.</p><p>Rent or a car takes a big part of your income. A 20% rise hurts a lot, so you look hard for a cheaper option → <b>more elastic</b>. Housing: e = 1.2.</p><p>Rule: <b>bigger share of income spent on the good → more elastic</b>. Slide 13 asks the same thing: \"Is the share of the income spent on the good high?\"</p>"
   },
   {
    "h": "Putting it together: Table 5-1",
    "body": "<table><tr><th>Good</th><th>e</th><th>Why</th></tr><tr><td>Eggs</td><td>0.1</td><td>necessity, small budget share</td></tr><tr><td>Gasoline</td><td>0.5</td><td>few substitutes in the short run</td></tr><tr><td>Housing</td><td>1.2</td><td>big budget share</td></tr><tr><td>Restaurant meals</td><td>2.3</td><td>luxury; you can cook at home (substitute)</td></tr><tr><td>Foreign travel</td><td>4.1</td><td>luxury, big budget share, many substitutes (travel at home)</td></tr></table><p>Note: slide 9 only <b>names</b> the four factors. The directions above are the standard textbook (Krugman) logic.</p>"
   }
  ],
  "example": {
   "problem": "<p>For each good, say if demand is likely elastic or inelastic, and name the factor that explains it:</p><ol><li>Insulin</li><li>One brand of cola (e.g. Pepsi)</li><li>A new car</li><li>Gasoline: one week after a price rise vs five years after</li></ol>",
   "solution": "<ol><li><b>Inelastic.</b> No close substitutes, and it is a necessity.</li><li><b>Elastic.</b> Many close substitutes (Coca-Cola, other brands). If Pepsi gets expensive, people switch.</li><li><b>Elastic.</b> Large share of the budget, and it is more of a luxury; people can wait or buy a used car.</li><li><b>Inelastic after one week, more elastic after five years.</b> Factor: time. Over time people buy smaller cars or use public transport.</li></ol>"
  },
  "check": [
   {
    "q": "Name the four factors on slide 9.",
    "a": "Close substitutes; necessity or luxury; time; proportion (share) of the consumer's budget."
   },
   {
    "q": "More substitutes → more or less elastic?",
    "a": "More elastic."
   },
   {
    "q": "Is demand more elastic in the short run or the long run?",
    "a": "The long run. Buyers have time to adjust and find substitutes."
   },
   {
    "q": "Salt vs housing: which has more elastic demand, and why?",
    "a": "Housing. It takes a big share of the budget, so buyers react strongly to its price."
   }
  ],
  "exam": {
   "question": "<p>What factors determine the price elasticity of demand? Explain each one with an example.</p>",
   "answer": "<ol><li><b>Availability of close substitutes:</b> when close substitutes are available, consumers switch easily when the price rises, so demand is more elastic (one brand of cola). Without substitutes demand is inelastic (insulin).</li><li><b>Necessity or luxury:</b> demand for a necessity is inelastic because people buy it anyway (eggs, e = 0.1). Demand for a luxury is elastic because people can do without it (foreign travel, e = 4.1).</li><li><b>Time:</b> demand becomes more elastic the longer the time after the price change, because consumers can adjust (gasoline: small change next week, bigger change after years).</li><li><b>Proportion of the consumer's budget:</b> if the good takes a large share of income, consumers react strongly, so demand is more elastic (housing, e = 1.2). A small share gives inelastic demand (salt).</li></ol>"
  },
  "memorize": [
   "4 factors: substitutes, necessity/luxury, time, budget share",
   "More close substitutes → more elastic",
   "Necessity → inelastic; luxury → elastic",
   "Longer time → more elastic",
   "Bigger share of budget → more elastic",
   "Eggs 0.1 (inelastic) … foreign travel 4.1 (elastic)"
  ],
  "note": "Slide 9 lists only the names of the factors. The direction of each factor comes from the textbook, not from the slide text."
 },
 {
  "id": "Q18",
  "label": "Q18",
  "week": 5,
  "slides": [
   11,
   12
  ],
  "kind": "theory",
  "title": "Deriving dR/dP = Q(1 − e), step by step",
  "hook": "After this lesson you can rebuild the professor's revenue formula from R = P × Q in five lines, and explain what it means.",
  "cards": [
   {
    "h": "Why price appears twice in revenue",
    "body": "<p>Revenue is R = P × Q. But Q is not fixed: when P goes up, buyers buy less. So Q <b>depends on</b> P. We write it as Q(P):</p><p><b>R = P × Q(P)</b></p><p>So price affects revenue in two ways: directly (P), and through quantity (Q(P)). This is the same \"price effect vs quantity effect\" you saw as rectangles on slide 10.</p>"
   },
   {
    "h": "Step 1: differentiate (product rule)",
    "body": "<p>Product rule: the derivative of (first × second) = (derivative of first) × second + first × (derivative of second).</p><p>Here first = P (its derivative is 1) and second = Q(P) (its derivative is dQ/dP):</p><p><b>dR/dP = Q + (dQ/dP)·P</b>, where dQ/dP &lt; 0</p><ul><li><b>Q</b>: price effect. Each unit sold pays a bit more. Positive.</li><li><b>(dQ/dP)·P</b>: quantity effect. Fewer units are sold. Negative, because dQ/dP &lt; 0 (demand slopes down).</li></ul>"
   },
   {
    "h": "Step 2: divide by Q",
    "body": "<p>Divide every term by Q:</p><p><b>(dR/dP)·(1/Q) = 1 + (dQ/dP)·(P/Q)</b></p><p>Why? Because the last term now has exactly the shape of an elasticity. Look at the next card.</p>"
   },
   {
    "h": "Step 3: find the elasticity inside",
    "body": "<p>Elasticity = % change in Q ÷ % change in P:</p><p>e = |(dQ/Q) / (dP/P)| = |(dQ/dP)·(P/Q)|</p><p>We use the absolute value, so e is positive. But dQ/dP is negative, so the term itself is negative:</p><p><b>(dQ/dP)·(P/Q) = −e</b></p><p>Kind warning: slide 11 writes the last part as |dQ/dP / P/Q| (divided). It should be <b>multiplied</b>: dividing by (dP/P) is the same as multiplying by (P/dP). The next line of the slide uses the correct product.</p>"
   },
   {
    "h": "Step 4: finish, and read the result",
    "body": "<p>Put −e into Step 2:</p><p>(dR/dP)·(1/Q) = 1 − e</p><p>Multiply both sides by Q:</p><p><b>dR/dP = Q(1 − e)</b></p><p>Slide 12 reads it. Q &gt; 0, so only (1 − e) decides the sign:</p><ul><li>e &lt; 1 → dR/dP &gt; 0 → raise price, revenue <b>rises</b>.</li><li>e = 1 → dR/dP = 0 → revenue does not change; it is at its <b>maximum (or minimum)</b>.</li><li>e &gt; 1 → dR/dP &lt; 0 → raise price, revenue <b>falls</b> (demand decreases too much).</li></ul>"
   },
   {
    "h": "See it on a graph: the revenue hill",
    "body": "<p>Take demand Q = 100 − 2P. Then R = P(100 − 2P) = 100P − 2P². Draw R against P: it is a hill.</p><ul><li>Left side (low price, e &lt; 1): raising the price moves you <b>up</b> the hill.</li><li>Top (P = 25, e = 1): dR/dP = 0, revenue is maximum, R = 1,250.</li><li>Right side (high price, e &gt; 1): raising the price moves you <b>down</b>.</li></ul>",
    "chart": {
     "x": "Price P",
     "y": "Total revenue R = P × Q",
     "xmax": 52,
     "ymax": 1400,
     "xticks": [
      10,
      25,
      40
     ],
     "yticks": [
      800,
      1250
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         0
        ],
        [
         5,
         450
        ],
        [
         10,
         800
        ],
        [
         15,
         1050
        ],
        [
         20,
         1200
        ],
        [
         25,
         1250
        ],
        [
         30,
         1200
        ],
        [
         35,
         1050
        ],
        [
         40,
         800
        ],
        [
         45,
         450
        ],
        [
         50,
         0
        ]
       ],
       "label": "R(P)",
       "role": "other"
      }
     ],
     "points": [
      {
       "x": 25,
       "y": 1250,
       "label": "top: e = 1, dR/dP = 0",
       "guides": true,
       "show": true
      },
      {
       "x": 10,
       "y": 800,
       "label": "e = 0.25: going up"
      },
      {
       "x": 40,
       "y": 800,
       "label": "e = 4: going down"
      }
     ],
     "caption": "Demand Q = 100 − 2P, so R = 100P − 2P². Revenue climbs while e is below 1, peaks at e = 1, falls when e is above 1."
    }
   }
  ],
  "example": {
   "problem": "<p>Demand is Q = 100 − 2P (so dQ/dP = −2). For P = 10, 25 and 40, find Q, the elasticity e = |dQ/dP|·P/Q, and dR/dP = Q(1 − e). Check with the direct derivative of R = 100P − 2P². What should the seller do at each price?</p>",
   "solution": "<p>e = 2 × P / Q. Direct derivative: dR/dP = 100 − 4P.</p><table><tr><th>P</th><th>Q</th><th>e</th><th>Q(1 − e)</th><th>100 − 4P</th><th>R</th></tr><tr><td>10</td><td>80</td><td>20/80 = 0.25</td><td>80 × 0.75 = 60</td><td>60</td><td>800</td></tr><tr><td>25</td><td>50</td><td>50/50 = 1</td><td>50 × 0 = 0</td><td>0</td><td>1,250</td></tr><tr><td>40</td><td>20</td><td>80/20 = 4</td><td>20 × (−3) = −60</td><td>−60</td><td>800</td></tr></table><ul><li>P = 10: inelastic, dR/dP &gt; 0 → <b>raise</b> the price.</li><li>P = 25: unit-elastic, dR/dP = 0 → revenue is already <b>maximum</b> (1,250).</li><li>P = 40: elastic, dR/dP &lt; 0 → <b>lower</b> the price.</li></ul><p>Both methods give the same numbers, so the formula works.</p>"
  },
  "check": [
   {
    "q": "In dR/dP = Q + (dQ/dP)·P, what does the term Q mean?",
    "a": "The price effect: each of the Q units sold now pays a bit more, so revenue rises by Q."
   },
   {
    "q": "Why is (dQ/dP)·(P/Q) equal to −e, not +e?",
    "a": "Because dQ/dP &lt; 0 (demand slopes down), while e is defined as an absolute value (positive)."
   },
   {
    "q": "Demand Q = 60 − 3P. At P = 10, find Q, e and the sign of dR/dP.",
    "a": "Q = 30, e = 3 × 10 / 30 = 1, so dR/dP = 30 × 0 = 0. Revenue is at its maximum: R = 10 × 30 = 300."
   },
   {
    "q": "What is wrong in slide 11's line e = |dQ/dP / P/Q|?",
    "a": "It should be multiplication: e = |(dQ/dP)·(P/Q)|."
   }
  ],
  "exam": {
   "question": "<p>Revenue is R = P × Q, where Q depends on P. Show that dR/dP = Q(1 − e), where e is the price elasticity of demand, and explain what it means for a seller who raises the price.</p>",
   "answer": "<p>R = P · Q(P)</p><p>dR/dP = Q + (dQ/dP)·P, where dQ/dP &lt; 0 (product rule)</p><p>Divide by Q: (dR/dP)·(1/Q) = 1 + (dQ/dP)·(P/Q)</p><p>Since e = |(dQ/Q)/(dP/P)| = |(dQ/dP)·(P/Q)| and dQ/dP &lt; 0, we have (dQ/dP)·(P/Q) = −e.</p><p>So (dR/dP)·(1/Q) = 1 − e, and <b>dR/dP = Q(1 − e)</b>.</p><p>Q &gt; 0, so the sign depends on 1 − e: (1) if e &lt; 1 (inelastic), dR/dP &gt; 0 and revenue rises when price rises, even though Q falls; (2) if e = 1, dR/dP = 0, revenue does not change and is at its maximum or minimum; (3) if e &gt; 1 (elastic), dR/dP &lt; 0 and revenue falls when price rises, because demand decreases too much.</p>"
  },
  "memorize": [
   "R = P · Q(P)",
   "dR/dP = Q + P·(dQ/dP), dQ/dP &lt; 0",
   "Divide by Q; (dQ/dP)(P/Q) = −e",
   "dR/dP = Q(1 − e)",
   "e &lt; 1: R ↑ with P; e = 1: R max; e &gt; 1: R ↓",
   "Slide 11 typo: e = |(dQ/dP) × (P/Q)|, not divided"
  ]
 },
 {
  "id": "Q25",
  "label": "Q25",
  "week": 5,
  "slides": [
   6
  ],
  "kind": "calculation",
  "title": "The midpoint method for elasticity",
  "hook": "After this lesson you can compute an elasticity that gives the same answer whether the price goes up or down.",
  "cards": [
   {
    "h": "The problem it fixes",
    "body": "<p>The simple method (slide 4) divides each change by the <b>starting</b> value. On slide 5, the same two points gave e = <b>0.82</b> going A → B, but e = <b>1.22</b> going B → A. One looks inelastic, the other elastic. That is confusing.</p><p>We want <b>one</b> answer for two points. The midpoint method gives it.</p>"
   },
   {
    "h": "The idea: divide by the average",
    "body": "<p>Bread goes from 4,000 to 6,000 som. Simple method: +2,000/4,000 = <b>+50%</b>. Going back from 6,000 to 4,000: 2,000/6,000 = <b>33%</b>. Two answers!</p><p>Midpoint method: use the <b>average</b> of the two prices, (4,000 + 6,000)/2 = 5,000. Change = 2,000/5,000 = <b>40%</b>, in both directions.</p><p>Slide 6, formula (5-4):</p><p><b>% change in X = (Change in X ÷ Average value of X) × 100</b></p>"
   },
   {
    "h": "The full formula (5-5) as a recipe",
    "body": "<p>Price elasticity of demand = [ (Q<sub>2</sub> − Q<sub>1</sub>) ÷ ((Q<sub>1</sub> + Q<sub>2</sub>)/2) ] ÷ [ (P<sub>2</sub> − P<sub>1</sub>) ÷ ((P<sub>1</sub> + P<sub>2</sub>)/2) ]</p><ol><li>Average quantity = (Q<sub>1</sub> + Q<sub>2</sub>)/2.</li><li>% change in Q = change in Q ÷ average Q × 100.</li><li>Average price = (P<sub>1</sub> + P<sub>2</sub>)/2.</li><li>% change in P = change in P ÷ average P × 100.</li><li>e = % change in Q ÷ % change in P. Drop the minus sign (absolute value).</li></ol>"
   },
   {
    "h": "Solve the slide's numbers",
    "body": "<p>A: P = $0.90, Q = 1,100. B: P = $1.10, Q = 900.</p><ol><li>Average Q = (1,100 + 900)/2 = <b>1,000</b>.</li><li>% change in Q = 200 / 1,000 × 100 = <b>20%</b>.</li><li>Average P = (0.90 + 1.10)/2 = <b>$1.00</b>.</li><li>% change in P = 0.20 / 1.00 × 100 = <b>20%</b>.</li><li>e = 20% / 20% = <b>1.00</b>.</li></ol><p>Going B → A uses the <b>same averages</b> (1,000 and $1.00), so again e = 1.00. Demand is <b>unit-elastic</b>.</p><p>Revenue check: 0.90 × 1,100 = $990 and 1.10 × 900 = $990. No change, exactly as unit-elastic demand predicts.</p>",
    "chart": {
     "x": "Quantity Q",
     "y": "Price P ($)",
     "xmax": 1400,
     "ymax": 1.5,
     "xticks": [
      900,
      1000,
      1100
     ],
     "yticks": [
      0.9,
      1.0,
      1.1
     ],
     "lines": [
      {
       "pts": [
        [
         700,
         1.3
        ],
        [
         1400,
         0.6
        ]
       ],
       "label": "D",
       "role": "demand"
      }
     ],
     "points": [
      {
       "x": 900,
       "y": 1.1,
       "label": "B"
      },
      {
       "x": 1000,
       "y": 1.0,
       "label": "M = midpoint (1,000; $1.00)",
       "guides": true
      },
      {
       "x": 1100,
       "y": 0.9,
       "label": "A"
      }
     ],
     "caption": "The midpoint M sits exactly halfway between A and B. We divide every change by M's values."
    }
   },
   {
    "h": "Read the answer",
    "body": "<ul><li>e &gt; 1: elastic (price up → revenue down)</li><li>e = 1: unit-elastic (revenue unchanged)</li><li>e &lt; 1: inelastic (price up → revenue up)</li></ul><p>Exam tip: write every step (two averages, two % changes, the ratio). Round at the end, not in the middle.</p>"
   }
  ],
  "example": {
   "problem": "<p><b>Practice.</b> A taxi company raises the fare from 10,000 som to 14,000 som. Rides per day fall from 260 to 220.</p><p>(a) Find the price elasticity of demand with the midpoint method. (b) Is demand elastic or inelastic? (c) Check with total revenue. (d) Bonus: what does the simple method give in each direction?</p>",
   "solution": "<p><b>(a)</b></p><ol><li>Average Q = (260 + 220)/2 = 240. Change in Q = 40. % change in Q = 40/240 × 100 = <b>16.67%</b>.</li><li>Average P = (10,000 + 14,000)/2 = 12,000. Change in P = 4,000. % change in P = 4,000/12,000 × 100 = <b>33.33%</b>.</li><li>e = 16.67 / 33.33 = <b>0.5</b>.</li></ol><p><b>(b)</b> e = 0.5 &lt; 1, so demand is <b>inelastic</b>.</p><p><b>(c)</b> Before: 10,000 × 260 = 2,600,000 som. After: 14,000 × 220 = 3,080,000 som. Revenue <b>rises</b> when the price rises, which matches inelastic demand.</p><p><b>(d)</b> Simple, going up: (40/260) ÷ (4,000/10,000) = 15.38% ÷ 40% = 0.38. Simple, going down: (40/220) ÷ (4,000/14,000) = 18.18% ÷ 28.57% = 0.64. Two different numbers; the midpoint method gives one: 0.5.</p>"
  },
  "check": [
   {
    "q": "What is the average of $0.90 and $1.10?",
    "a": "$1.00"
   },
   {
    "q": "Why does the midpoint method give the same answer in both directions?",
    "a": "The average of the two values is the same whichever point you start from."
   },
   {
    "q": "Price 8 → 12, quantity 30 → 24. Midpoint elasticity?",
    "a": "% change in Q = 6/27 × 100 = 22.2%. % change in P = 4/10 × 100 = 40%. e = 22.2/40 ≈ 0.56, inelastic."
   },
   {
    "q": "Midpoint e = 1.6. Classify it. What happens to revenue if the price rises?",
    "a": "Elastic (e &gt; 1). Revenue falls."
   }
  ],
  "exam": {
   "question": "<p>Using the midpoint method, calculate the price elasticity of demand between A (P = $0.90, Q = 1,100) and B (P = $1.10, Q = 900). Show that the answer is the same from A to B and from B to A, and classify demand.</p>",
   "answer": "<p>Midpoint formula: e = [(Q<sub>2</sub> − Q<sub>1</sub>)/((Q<sub>1</sub> + Q<sub>2</sub>)/2)] ÷ [(P<sub>2</sub> − P<sub>1</sub>)/((P<sub>1</sub> + P<sub>2</sub>)/2)].</p><p>Average Q = (1,100 + 900)/2 = 1,000; % change in Q = 200/1,000 × 100 = 20%.</p><p>Average P = (0.90 + 1.10)/2 = 1.00; % change in P = 0.20/1.00 × 100 = 20%.</p><p>e = 20% / 20% = <b>1.00</b>.</p><p>From B to A the averages are the same (1,000 and $1.00), so e = 1.00 again. Demand is <b>unit-elastic</b>. (Total revenue: $990 at A and $990 at B, unchanged.) The midpoint method removes the direction problem of the simple method (0.82 vs 1.22).</p>"
  },
  "memorize": [
   "% change = change ÷ AVERAGE × 100",
   "e = [ΔQ ÷ avg Q] ÷ [ΔP ÷ avg P]",
   "Slide numbers: 200/1,000 = 20%, 0.20/1.00 = 20% → e = 1.00",
   "Same answer A → B and B → A",
   "e = 1 → revenue unchanged ($990 = $990)"
  ]
 },
 {
  "id": "Q26",
  "label": "Q26",
  "week": 5,
  "slides": [
   5
  ],
  "kind": "calculation",
  "title": "Why the simple % method gives two different elasticities",
  "hook": "After this lesson you can compute elasticity with the simple formula in both directions and explain why the two answers differ.",
  "cards": [
   {
    "h": "The simple formula (slide 4)",
    "body": "<p>Elasticity = how strongly buyers react to price.</p><ul><li>% change in Q = (change in Q ÷ <b>initial</b> Q) × 100</li><li>% change in P = (change in P ÷ <b>initial</b> P) × 100</li><li>e = % change in Q ÷ % change in P</li></ul><p>We ignore the minus sign (absolute value). Key word: <b>initial</b>. You divide by the value where you <b>start</b>.</p>"
   },
   {
    "h": "The slide's data",
    "body": "<table><tr><th></th><th>Price</th><th>Quantity</th></tr><tr><td>Situation A</td><td>$0.90</td><td>1,100</td></tr><tr><td>Situation B</td><td>$1.10</td><td>900</td></tr></table><p>Change in price = 0.20. Change in quantity = 200. These two changes are the same in both directions. Only the starting point changes.</p><p>(The table on the slide is printed a bit messy: \"Situation A\" slipped into the header row. The graph confirms A = $0.90 with 1,100 and B = $1.10 with 900.)</p>",
    "chart": {
     "x": "Quantity Q",
     "y": "Price P ($)",
     "xmax": 1400,
     "ymax": 1.5,
     "xticks": [
      900,
      1100
     ],
     "yticks": [
      0.9,
      1.1
     ],
     "lines": [
      {
       "pts": [
        [
         700,
         1.414
        ],
        [
         800,
         1.238
        ],
        [
         900,
         1.1
        ],
        [
         1000,
         0.99
        ],
        [
         1100,
         0.9
        ],
        [
         1250,
         0.792
        ],
        [
         1400,
         0.707
        ]
       ],
       "label": "D",
       "role": "demand"
      }
     ],
     "points": [
      {
       "x": 900,
       "y": 1.1,
       "label": "B",
       "guides": true
      },
      {
       "x": 1100,
       "y": 0.9,
       "label": "A",
       "guides": true
      }
     ],
     "arrows": [
      {
       "from": [
        1130,
        1.02
       ],
       "to": [
        960,
        1.17
       ],
       "label": "A → B: price up"
      }
     ],
     "caption": "Slide 5: A = ($0.90, 1,100), B = ($1.10, 900). Same two points, but the simple method gives 0.82 or 1.22."
    }
   },
   {
    "h": "Go A → B (price rises)",
    "body": "<p>Start at A, so divide by A's values (0.90 and 1,100):</p><ol><li>% change in P = 0.20 / 0.90 × 100 = <b>22.22%</b></li><li>% change in Q = 200 / 1,100 × 100 = <b>18.18%</b></li><li>e = 18.18 / 22.22 = <b>0.82</b></li></ol><p>0.82 &lt; 1 → looks <b>inelastic</b>.</p>"
   },
   {
    "h": "Go B → A (price falls)",
    "body": "<p>Start at B, so divide by B's values (1.10 and 900):</p><ol><li>% change in P = 0.20 / 1.10 × 100 = <b>18.18%</b></li><li>% change in Q = 200 / 900 × 100 = <b>22.22%</b></li><li>e = 22.22 / 18.18 = <b>1.22</b></li></ol><p>1.22 &gt; 1 → looks <b>elastic</b>.</p>"
   },
   {
    "h": "Why two answers, and why it matters",
    "body": "<p>Same two points, same demand curve, but two answers (exactly 9/11 = 0.82 and 11/9 = 1.22). The reason: the simple method divides by the <b>starting</b> value, and the starting value depends on the direction.</p><p>It matters because the <b>classification flips</b>: inelastic one way, elastic the other way. The fix is the <b>midpoint method</b> (slide 6): divide by the averages (1,000 and $1.00) → 20% / 20% = <b>1.00</b> both ways.</p><p>Kind warning about slide typos: it writes \"(= 18.1 / 22.22)\"; exactly it is 18.18 / 22.22. And \"(= 22.2 / 1.2)\" should be <b>22.22 / 18.18</b> (22.2 / 1.2 would be 18.5). The final answers 0.82 and 1.22 are correct.</p>"
   }
  ],
  "example": {
   "problem": "<p><b>Practice.</b> At the bazaar, a melon seller raises the price from 10,000 som (A) to 15,000 som (B). Sales fall from 100 to 60 melons a day.</p><p>(a) Simple method, A → B. (b) Simple method, B → A. (c) Midpoint method. (d) Which answer agrees with what happens to revenue?</p>",
   "solution": "<p>Change in P = 5,000. Change in Q = 40.</p><p><b>(a) A → B</b> (divide by 10,000 and 100): % change in P = 5,000/10,000 × 100 = 50%. % change in Q = 40/100 × 100 = 40%. e = 40/50 = <b>0.8</b> (looks inelastic).</p><p><b>(b) B → A</b> (divide by 15,000 and 60): % change in P = 5,000/15,000 × 100 = 33.33%. % change in Q = 40/60 × 100 = 66.67%. e = 66.67/33.33 = <b>2.0</b> (looks elastic).</p><p><b>(c) Midpoint</b>: average P = 12,500, average Q = 80. % change in P = 5,000/12,500 × 100 = 40%. % change in Q = 40/80 × 100 = 50%. e = 50/40 = <b>1.25</b> (elastic), same in both directions.</p><p><b>(d)</b> Revenue at A = 10,000 × 100 = 1,000,000 som. At B = 15,000 × 60 = 900,000 som. The price rose and revenue <b>fell</b>, so demand is elastic. The midpoint answer (1.25) agrees. The simple A → B answer (0.8) gives the wrong picture.</p>"
  },
  "check": [
   {
    "q": "Going A → B with the simple method, whose values do you divide by?",
    "a": "A's values (the starting point): 0.90 and 1,100."
   },
   {
    "q": "Compute 200 / 900 × 100.",
    "a": "22.22%"
   },
   {
    "q": "Is 0.82 elastic or inelastic? And 1.22?",
    "a": "0.82 &lt; 1: inelastic. 1.22 &gt; 1: elastic."
   },
   {
    "q": "How do we get one answer for both directions?",
    "a": "Use the midpoint method: divide by the averages. Here 20% / 20% = 1.00."
   }
  ],
  "exam": {
   "question": "<p>The price rises from $0.90 (A, quantity demanded 1,100) to $1.10 (B, quantity demanded 900). Using the simple percent-change formula, compute the price elasticity of demand from A to B and from B to A. Why are the answers different? How can this problem be solved?</p>",
   "answer": "<p><b>A → B</b> (divide by A's values): % change in P = 0.2/0.9 × 100 = 22.22%; % change in Q = 200/1,100 × 100 = 18.18%; e = 18.18/22.22 = <b>0.82</b> (inelastic).</p><p><b>B → A</b> (divide by B's values): % change in P = 0.2/1.10 × 100 = 18.18%; % change in Q = 200/900 × 100 = 22.22%; e = 22.22/18.18 = <b>1.22</b> (elastic).</p><p><b>Why different:</b> the simple method divides the change by the initial value, and the initial value depends on the direction of the move. So the same two points give two elasticities, even two different classifications.</p><p><b>Solution:</b> use the midpoint method, dividing by the average values: % change in Q = 200/1,000 = 20%, % change in P = 0.20/1.00 = 20%, e = <b>1.00</b> in both directions (unit-elastic).</p>"
  },
  "memorize": [
   "Simple method: divide by the STARTING value",
   "A → B: 18.18% / 22.22% = 0.82 (inelastic)",
   "B → A: 22.22% / 18.18% = 1.22 (elastic)",
   "Cause: different base in each direction",
   "Fix: midpoint method → 20% / 20% = 1.00",
   "Slide typos: 18.1 → 18.18; 22.2/1.2 → 22.22/18.18"
  ]
 },
 {
  "id": "Q19",
  "label": "Q19",
  "week": 6,
  "slides": [
   4,
   8
  ],
  "kind": "theory",
  "title": "Short run, long run and diminishing returns",
  "hook": "This is the root of every cost curve: once you see why each new worker adds less, rising marginal cost will make sense by itself.",
  "cards": [
   {
    "h": "Inputs: fixed and variable",
    "body": "<p>Think of a small plov café in Tashkent. To make plov it uses <b>inputs</b>: a kitchen with one big kazan, and cooks.</p><ul><li>The <b>production function</b> is the link between how many inputs the café uses and how much output (plates of plov) it makes.</li><li>A <b>fixed input</b> cannot be changed right now (the kitchen, the kazan).</li><li>A <b>variable input</b> can be changed (the number of cooks it hires today).</li></ul>"
   },
   {
    "h": "Short run vs long run (slide 4)",
    "body": "<p>These two words are <b>not</b> about a number of months. They are about inputs.</p><table><tr><th></th><th>Definition</th><th>Café example</th></tr><tr><td><b>Short run</b></td><td>The time period in which <b>at least one</b> input is fixed.</td><td>Tomorrow it can hire one more cook, but it cannot build a bigger kitchen.</td></tr><tr><td><b>Long run</b></td><td>The time period in which <b>all</b> inputs can be varied.</td><td>In two years it can change the cooks <i>and</i> move to a bigger kitchen.</td></tr></table><p>Key words to write on the exam: short run = \"at least one input is fixed\"; long run = \"all inputs can be varied\".</p>"
   },
   {
    "h": "The total product curve (slide 4)",
    "body": "<p>The <b>total product curve</b> shows how the quantity of output depends on the quantity of the <b>variable</b> input, for a <b>given quantity of the fixed input</b>.</p><p>Class example: George and Martha farm 10 acres of land (fixed). They choose how many workers to hire (variable). Output: 0, 19, 36, 51, 64, 75, 84, 91, 96 bushels of wheat for 0 to 8 workers.</p><p>The curve goes <b>up</b> (more workers, more wheat) but gets <b>flatter</b>.</p>",
    "chart": {
     "x": "Quantity of labor (workers)",
     "y": "Quantity of wheat (bushels)",
     "xmax": 8.6,
     "ymax": 110,
     "xticks": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
     ],
     "yticks": [
      20,
      40,
      60,
      80,
      100
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         0
        ],
        [
         1,
         19
        ],
        [
         2,
         36
        ],
        [
         3,
         51
        ],
        [
         4,
         64
        ],
        [
         5,
         75
        ],
        [
         6,
         84
        ],
        [
         7,
         91
        ],
        [
         8,
         96
        ]
       ],
       "label": "TP",
       "role": "other"
      }
     ],
     "arrows": [
      {
       "from": [
        1,
        19
       ],
       "to": [
        2,
        19
       ]
      },
      {
       "from": [
        2,
        19
       ],
       "to": [
        2,
        36
       ]
      },
      {
       "from": [
        6,
        84
       ],
       "to": [
        7,
        84
       ]
      },
      {
       "from": [
        7,
        84
       ],
       "to": [
        7,
        91
       ]
      }
     ],
     "points": [
      {
       "x": 2,
       "y": 19,
       "label": "2nd worker: +17"
      },
      {
       "x": 7,
       "y": 84,
       "label": "+7"
      }
     ],
     "caption": "George and Martha's farm (Week 6 slide 5): total product rises, but each step up gets smaller (+17 for the 2nd worker, only +7 for the 7th)."
    }
   },
   {
    "h": "Marginal product: what one more worker adds",
    "body": "<p>The <b>marginal product of labor</b> is the extra output from one more worker:</p><p><b>MPL = ΔQ / ΔL</b> (change in output ÷ change in labor).</p><table><tr><th>Worker</th><th>1st</th><th>2nd</th><th>3rd</th><th>4th</th><th>5th</th><th>6th</th><th>7th</th><th>8th</th></tr><tr><td>MPL (bushels)</td><td>19</td><td>17</td><td>15</td><td>13</td><td>11</td><td>9</td><td>7</td><td>5</td></tr></table><p>Example: 3rd worker: 51 − 36 = 15. Small slide note: the table on slide 5 writes \"MPL = Q/L\". The Δ signs are missing. It should be ΔQ/ΔL (Q/L would be a different number: 64/4 = 16, but the 4th worker adds only 13).</p>",
    "chart": {
     "x": "Quantity of labor (workers)",
     "y": "Marginal product of labor (bushels)",
     "xmax": 8.6,
     "ymax": 24,
     "xticks": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
     ],
     "yticks": [
      5,
      10,
      15,
      20
     ],
     "lines": [
      {
       "pts": [
        [
         0.5,
         19
        ],
        [
         7.5,
         5
        ]
       ],
       "label": "MPL",
       "role": "other"
      }
     ],
     "points": [
      {
       "x": 1.5,
       "y": 17,
       "label": "2nd worker: 17"
      },
      {
       "x": 6.5,
       "y": 7,
       "label": "7th worker: 7"
      }
     ],
     "caption": "MPL = 19, 17, 15, 13, 11, 9, 7, 5. It slopes down: that is diminishing returns. (Each MPL sits between two worker numbers, like on the slide.)"
    }
   },
   {
    "h": "Diminishing returns (slide 8)",
    "body": "<p>Look at the MPL numbers: 19, 17, 15 … 5. Each new worker still helps, but <b>less</b> than the one before.</p><p><b>Diminishing returns to an input</b>: when you increase one input and hold all other inputs fixed, the marginal product of that input goes down.</p><p>The professor's short version: <b>\"Diminishing returns = Marginal product is decreasing.\"</b></p><p><b>Why?</b> The land is fixed. More workers share the same 10 acres. Two cooks at one kazan help a lot; the eighth cook mostly waits for space.</p>"
   },
   {
    "h": "The professor's math: f′(L) &gt; 0 but f″(L) &lt; 0",
    "body": "<p>Write the production function as <b>Q = f(L)</b> (output depends on labor L).</p><ul><li><b>Q = f(L) is an increasing function of L</b>: more workers, more output.</li><li><b>Q′ = f′(L) &gt; 0</b>: f′(L) is the slope of TP = marginal product. Positive slope means every extra worker still <b>adds</b> output, so TP goes up.</li><li><b>Q″ = f″(L) &lt; 0</b>: the slope itself is getting smaller. Marginal product is falling, so TP gets <b>flatter</b>. This is diminishing returns.</li></ul><p>My own check: the farm numbers fit Q = 20L − L² exactly (e.g. L = 3: 60 − 9 = 51). Then f′(L) = 20 − 2L, positive for 0–8 workers, and f″(L) = −2 &lt; 0.</p><p>Slide 7 adds: while MP &gt; 0, TP rises; when MP = 0, TP is at its top; when MP &lt; 0, TP falls.</p>",
    "chart": {
     "x": "Quantity of labor (workers)",
     "y": "Total product (bushels)",
     "xmax": 14,
     "ymax": 120,
     "xticks": [
      2,
      4,
      6,
      8,
      10,
      12
     ],
     "yticks": [
      20,
      40,
      60,
      80,
      100
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         0
        ],
        [
         1,
         19
        ],
        [
         2,
         36
        ],
        [
         3,
         51
        ],
        [
         4,
         64
        ],
        [
         5,
         75
        ],
        [
         6,
         84
        ],
        [
         7,
         91
        ],
        [
         8,
         96
        ],
        [
         9,
         99
        ],
        [
         10,
         100
        ],
        [
         11,
         99
        ],
        [
         12,
         96
        ],
        [
         13,
         91
        ]
       ],
       "label": "TP",
       "role": "other"
      }
     ],
     "vlines": [
      {
       "x": 8,
       "label": "slide data ends",
       "role": "other"
      }
     ],
     "points": [
      {
       "x": 4,
       "y": 64,
       "label": "MP positive: TP rising"
      },
      {
       "x": 10,
       "y": 100,
       "label": "MP = 0: top",
       "guides": true
      }
     ],
     "caption": "Like slide 7: if the farm kept hiring, TP would reach a top (MP = 0) and then fall (MP negative). The farm numbers fit Q = 20L − L²; points after 8 workers are only an illustration."
    }
   }
  ],
  "example": {
   "problem": "<p>A bakery has <b>one oven</b>. Bakers 0, 1, 2, 3, 4, 5 make 0, 30, 50, 65, 75, 80 loaves per day. (a) Is this the short run or the long run? (b) Find the marginal product of each baker. (c) Are there diminishing returns? Explain with f′(L) and f″(L).</p>",
   "solution": "<ol><li><b>(a)</b> Short run: the oven is a fixed input (at least one input is fixed). Bakers are the variable input.</li><li><b>(b)</b> MP = ΔQ/ΔL: 30 − 0 = <b>30</b>; 50 − 30 = <b>20</b>; 65 − 50 = <b>15</b>; 75 − 65 = <b>10</b>; 80 − 75 = <b>5</b>.</li><li><b>(c)</b> Yes. MP falls: 30 &gt; 20 &gt; 15 &gt; 10 &gt; 5. Every MP is still positive, so total output rises: f′(L) &gt; 0. But MP keeps falling: f″(L) &lt; 0. The bakers share one oven, so each new baker adds less.</li></ol>"
  },
  "check": [
   {
    "q": "A taxi company can hire more drivers this week but cannot buy new cars until next year. Short run or long run?",
    "a": "Short run: at least one input (cars) is fixed."
   },
   {
    "q": "Output goes 0, 19, 36, 51. What is the marginal product of the 3rd worker?",
    "a": "51 − 36 = 15 bushels."
   },
   {
    "q": "Diminishing returns means total product falls. True or false?",
    "a": "False. Diminishing returns means <b>marginal</b> product falls. Total product can still rise (f′(L) &gt; 0), just more slowly (f″(L) &lt; 0)."
   },
   {
    "q": "On the total product curve, what is on each axis, and what stays constant?",
    "a": "X axis: the variable input (labor). Y axis: output. The fixed input (land) is held constant."
   },
   {
    "q": "If marginal product becomes 0, what happens to total product?",
    "a": "Total product does not change: TP is at its top (slide 7)."
   }
  ],
  "exam": {
   "question": "<p>(a) Define the short run and the long run. (b) What does the total product curve show? (c) What are diminishing returns to an input? Explain using the production function Q = f(L), f′(L) and f″(L).</p>",
   "answer": "<p><b>(a)</b> The <b>long run</b> is the time period in which all inputs can be varied. The <b>short run</b> is the time period in which at least one input is fixed (for example, the farm's land).</p><p><b>(b)</b> The <b>total product curve</b> shows how the quantity of output depends on the quantity of the variable input (labor), for a given quantity of the fixed input. It slopes up and becomes flatter.</p><p><b>(c)</b> There are <b>diminishing returns to an input</b> when an increase in that input, holding all other inputs fixed, leads to a decline in its marginal product. Diminishing returns = marginal product is decreasing.</p><p>With Q = f(L): Q is an increasing function of L, so Q′ = f′(L) &gt; 0 (each extra worker still adds output). But Q″ = f″(L) &lt; 0: marginal product falls as L rises, so the TP curve rises but gets flatter.</p><p>Example: on George and Martha's farm MPL = 19, 17, 15, 13, 11, 9, 7, 5 bushels: always positive, but falling, because more workers share the same fixed land.</p>"
  },
  "memorize": [
   "Short run: at least ONE input fixed. Long run: ALL inputs can be varied.",
   "Total product curve: output vs variable input, fixed input held constant.",
   "MPL = ΔQ/ΔL. Farm: 19, 17, 15, 13, 11, 9, 7, 5.",
   "Diminishing returns = marginal product is decreasing.",
   "Q = f(L): f′(L) &gt; 0 (TP rises), f″(L) &lt; 0 (TP gets flatter).",
   "MP &gt; 0 → TP up; MP = 0 → TP top; MP &lt; 0 → TP down."
  ]
 },
 {
  "id": "Q10",
  "label": "Q10",
  "week": 6,
  "slides": [
   25
  ],
  "kind": "theory",
  "title": "Minimum-cost output: where MC cuts ATC",
  "hook": "After this lesson you can find the cheapest output per unit and explain, with a graph, why the MC curve must pass through the bottom of the ATC curve.",
  "cards": [
   {
    "h": "Quick recall: MC and ATC",
    "body": "<p>Two numbers a firm watches:</p><ul><li><b>Marginal cost</b> MC = ΔTC/ΔQ: the extra cost of making <b>one more</b> unit.</li><li><b>Average total cost</b> ATC = TC/Q: the cost <b>per unit</b>, on average.</li></ul><p>Ben's Boots (Week 6 tables): 2 pairs cost TC = $156, so ATC = 156/2 = $78. Making the 3rd pair adds $60 (TC goes 156 → 216), so MC of the 3rd pair = $60.</p><p>Because of diminishing returns (lesson Q19), MC keeps rising: $12, $36, $60, $84 …</p>"
   },
   {
    "h": "Minimum-cost output (slide 25)",
    "body": "<p>The <b>minimum-cost output</b> is the quantity of output at which average total cost is lowest: the <b>bottom of the U-shaped ATC curve</b>.</p><table><tr><th>Pairs</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr><tr><td>ATC ($)</td><td>120</td><td>78</td><td><b>72</b></td><td>75</td><td>81.60</td></tr></table><p>ATC falls, reaches its lowest value, then rises. For Ben's Boots the minimum-cost output is <b>3 pairs</b>, with ATC = <b>$72</b> (point M).</p>"
   },
   {
    "h": "The average rule (the professor's example)",
    "body": "<p>Your class has an average height of 175 cm. A new student walks in.</p><ul><li>New student is <b>taller</b> than 175 → the average goes <b>up</b>.</li><li>New student is <b>shorter</b> than 175 → the average goes <b>down</b>.</li><li>New student is exactly 175 → the average stays the same.</li></ul><p>Slide 28: <b>\"For the average to be bigger, the new comer has to be greater than the average.\"</b></p><p>For costs: the <b>newcomer is MC</b> (the cost of the next unit) and the <b>average is ATC</b>.</p>"
   },
   {
    "h": "Reading Figure 7-9",
    "body": "<p>The slide's graph has a U-shaped ATC and a rising MC.</p><ul><li><b>Left side, A1 → A2:</b> the MC of the next unit (point MC<sub>L</sub>) is <b>below</b> ATC. So ATC <b>falls</b>. Slide: \"If marginal cost is below average total cost, average total cost is falling.\"</li><li><b>Right side, B1 → B2:</b> the MC of the next unit (point MC<sub>H</sub>) is <b>above</b> ATC. So ATC <b>rises</b>. Slide: \"If marginal cost is above average total cost, average total cost is rising.\"</li></ul><p>The graph below uses Ben's real numbers: 2nd pair MC = $36 &lt; ATC, so ATC falls 120 → 78. 6th pair MC = $132 &gt; ATC, so ATC rises 81.60 → 90.</p>",
    "chart": {
     "x": "Quantity of boots (pairs)",
     "y": "Cost of pair ($)",
     "xmax": 7.2,
     "ymax": 180,
     "xticks": [
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ],
     "yticks": [
      40,
      80,
      120,
      160
     ],
     "lines": [
      {
       "pts": [
        [
         1,
         120.0
        ],
        [
         1.25,
         101.4
        ],
        [
         1.5,
         90.0
        ],
        [
         1.75,
         82.71
        ],
        [
         2,
         78.0
        ],
        [
         2.5,
         73.2
        ],
        [
         3,
         72.0
        ],
        [
         3.5,
         72.86
        ],
        [
         4,
         75.0
        ],
        [
         5,
         81.6
        ],
        [
         6,
         90.0
        ],
        [
         7,
         99.43
        ]
       ],
       "label": "ATC",
       "role": "atc"
      },
      {
       "pts": [
        [
         0,
         0
        ],
        [
         7,
         168
        ]
       ],
       "label": "MC",
       "role": "mc"
      }
     ],
     "points": [
      {
       "x": 1,
       "y": 120,
       "label": "A1"
      },
      {
       "x": 2,
       "y": 78,
       "label": "A2"
      },
      {
       "x": 1.5,
       "y": 36,
       "label": "MC_L"
      },
      {
       "x": 3,
       "y": 72,
       "label": "M",
       "guides": true,
       "show": true
      },
      {
       "x": 5,
       "y": 81.6,
       "label": "B1"
      },
      {
       "x": 6,
       "y": 90,
       "label": "B2"
      },
      {
       "x": 5.5,
       "y": 132,
       "label": "MC_H"
      }
     ],
     "caption": "Figure 7-9 with Ben's Boots numbers. A1 to A2: MC of the 2nd pair ($36) is below ATC, so ATC falls. B1 to B2: MC of the 6th pair ($132) is above ATC, so ATC rises. MC crosses ATC at M (3 pairs, $72)."
    }
   },
   {
    "h": "So MC must cross ATC at M",
    "body": "<p>Put the two sides together:</p><ul><li>Left of M: MC &lt; ATC → ATC is falling.</li><li>Right of M: MC &gt; ATC → ATC is rising.</li><li>ATC stops falling and starts rising exactly where <b>MC = ATC</b>. That turning point is the bottom, M.</li></ul><p>Check with Ben's Boots:</p><ul><li>3rd pair: MC $60 &lt; ATC $78 → ATC falls to (156 + 60)/3 = <b>$72</b>.</li><li>4th pair: MC $84 &gt; ATC $72 → ATC rises to (216 + 84)/4 = <b>$75</b>.</li><li>At 3 pairs, MC is halfway between $60 and $84 = $72 = ATC. On the slide's graph the MC line passes exactly through M.</li></ul>"
   }
  ],
  "example": {
   "problem": "<p>A firm's total cost for Q = 0, 1, 2, 3, 4, 5 is $50, 70, 84, 102, 128, 165. (a) Find MC and ATC. (b) Find the minimum-cost output. (c) Use the MC–ATC rule to show it is the minimum.</p>",
   "solution": "<ol><li><b>MC = ΔTC/ΔQ:</b> 70 − 50 = 20; 84 − 70 = 14; 102 − 84 = 18; 128 − 102 = 26; 165 − 128 = 37.</li><li><b>ATC = TC/Q:</b> 70/1 = 70; 84/2 = 42; 102/3 = 34; 128/4 = <b>32</b>; 165/5 = 33.</li><li>Lowest ATC = $32, so the <b>minimum-cost output is 4 units</b>.</li><li>Rule check: 4th unit: MC $26 &lt; ATC(3) $34 → ATC falls (to 32). 5th unit: MC $37 &gt; ATC(4) $32 → ATC rises (to 33). ATC turns around at 4 units, where MC crosses ATC.</li></ol>"
  },
  "check": [
   {
    "q": "Define minimum-cost output.",
    "a": "The quantity of output at which average total cost is lowest: the bottom of the U-shaped ATC curve."
   },
   {
    "q": "MC = $50 and ATC = $60. If the firm makes one more unit, what happens to ATC?",
    "a": "ATC falls, because the new unit costs less than the average."
   },
   {
    "q": "MC = $90 and ATC = $70. What happens to ATC?",
    "a": "ATC rises (MC is above ATC)."
   },
   {
    "q": "Where does the MC curve cross the ATC curve?",
    "a": "At the minimum point of ATC (point M), the minimum-cost output."
   },
   {
    "q": "Ben's Boots: what is the minimum-cost output and the ATC there?",
    "a": "3 pairs, ATC = $72."
   }
  ],
  "exam": {
   "question": "<p>What is the minimum-cost output? Explain why the marginal cost curve must cross the average total cost curve at the minimum point of ATC. Use a graph.</p>",
   "answer": "<p><b>Definition:</b> The minimum-cost output is the quantity of output at which average total cost is lowest — the bottom of the U-shaped ATC curve (point M).</p><p><b>Why MC crosses ATC at M:</b></p><ul><li>If MC &lt; ATC, one more unit adds a cost below the average, so ATC falls (movement A1 → A2).</li><li>If MC &gt; ATC, one more unit adds a cost above the average, so ATC rises (movement B1 → B2).</li><li>So ATC falls while MC is below it and rises while MC is above it. It turns around exactly where MC = ATC. That is the minimum of ATC, point M.</li></ul><p><b>Example (Ben's Boots):</b> 3rd pair MC = $60 &lt; ATC $78, so ATC falls to $72. 4th pair MC = $84 &gt; ATC $72, so ATC rises to $75. Minimum ATC = $72 at 3 pairs.</p><p><b>Graph:</b> U-shaped ATC; rising MC that cuts ATC at its lowest point M. Mark A1 → A2 on the falling part (MC below) and B1 → B2 on the rising part (MC above).</p>"
  },
  "memorize": [
   "Minimum-cost output = Q where ATC is lowest = bottom of the U.",
   "MC &lt; ATC → ATC falls. MC &gt; ATC → ATC rises.",
   "MC = ATC → ATC at its minimum (point M).",
   "\"For the average to be bigger, the new comer has to be greater than the average.\"",
   "Ben's Boots: 3 pairs, ATC = $72."
  ]
 },
 {
  "id": "Q21-22",
  "label": "Q21–Q22",
  "week": 6,
  "slides": [
   24
  ],
  "kind": "theory",
  "title": "The family of cost curves (Figure 7-8)",
  "hook": "One graph, four curves: learn what each curve looks like, why ATC is a U, and why MC passes through its bottom.",
  "cards": [
   {
    "h": "Four curves on one graph",
    "body": "<p>Slide 24 (Figure 7-8) draws all of Ben's Boots' per-unit costs together. X axis: pairs of boots (0–10). Y axis: cost of a pair ($).</p><table><tr><th>Curve</th><th>Formula</th><th>Ben's numbers</th><th>Shape</th></tr><tr><td><b>MC</b></td><td>ΔTC/ΔQ</td><td>12, 36, 60 … 228</td><td>straight line up</td></tr><tr><td><b>AFC</b></td><td>FC/Q</td><td>108, 54, 36, 27 … 10.80</td><td>always falling</td></tr><tr><td><b>AVC</b></td><td>VC/Q</td><td>12, 24, 36, 48 … 120</td><td>rising line</td></tr><tr><td><b>ATC</b></td><td>TC/Q = AFC + AVC</td><td>120, 78, <b>72</b>, 75 … 130.80</td><td>U-shape</td></tr></table>",
    "chart": {
     "x": "Quantity of boots (pairs)",
     "y": "Cost of pair ($)",
     "xmax": 10.4,
     "ymax": 250,
     "xticks": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
     ],
     "yticks": [
      50,
      100,
      150,
      200,
      250
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         0
        ],
        [
         10,
         240
        ]
       ],
       "label": "MC",
       "role": "mc"
      },
      {
       "pts": [
        [
         1,
         120.0
        ],
        [
         1.25,
         101.4
        ],
        [
         1.5,
         90.0
        ],
        [
         1.75,
         82.71
        ],
        [
         2,
         78.0
        ],
        [
         2.5,
         73.2
        ],
        [
         3,
         72.0
        ],
        [
         3.5,
         72.86
        ],
        [
         4,
         75.0
        ],
        [
         5,
         81.6
        ],
        [
         6,
         90.0
        ],
        [
         7,
         99.43
        ],
        [
         8,
         109.5
        ],
        [
         9,
         120.0
        ],
        [
         10,
         130.8
        ]
       ],
       "label": "ATC",
       "role": "atc"
      },
      {
       "pts": [
        [
         0,
         0
        ],
        [
         10,
         120
        ]
       ],
       "label": "AVC",
       "role": "avc"
      },
      {
       "pts": [
        [
         1,
         108.0
        ],
        [
         1.25,
         86.4
        ],
        [
         1.5,
         72.0
        ],
        [
         1.75,
         61.71
        ],
        [
         2,
         54.0
        ],
        [
         2.5,
         43.2
        ],
        [
         3,
         36.0
        ],
        [
         3.5,
         30.86
        ],
        [
         4,
         27.0
        ],
        [
         5,
         21.6
        ],
        [
         6,
         18.0
        ],
        [
         7,
         15.43
        ],
        [
         8,
         13.5
        ],
        [
         9,
         12.0
        ],
        [
         10,
         10.8
        ]
       ],
       "label": "AFC",
       "role": "afc"
      }
     ],
     "points": [
      {
       "x": 3,
       "y": 72,
       "label": "M",
       "guides": true,
       "show": true
      }
     ],
     "caption": "Figure 7-8, drawn through the real table values: MC rises in a straight line, AFC always falls, AVC rises, ATC is a U. MC crosses ATC at its bottom M (3 pairs, $72)."
    }
   },
   {
    "h": "MC goes up: increasing marginal cost",
    "body": "<p>Each extra pair costs <b>$24 more</b> than the one before: 12, 36, 60, 84 … That is <b>increasing marginal cost</b>.</p><p>Why? Diminishing returns (lesson Q19). Ben's workshop is fixed. Each extra worker adds fewer boots, so each extra pair needs more labor money.</p><p>On the slide the MC dots sit <b>between</b> the whole numbers (at 0.5, 1.5, 2.5 …), because MC is the change from one quantity to the next.</p>"
   },
   {
    "h": "AFC falls, AVC rises",
    "body": "<ul><li><b>AFC = 108/Q</b>. The $108 fixed cost is shared by more and more pairs: 108 → 54 → 36 → 27 … It never stops falling. This is the <b>spreading effect</b>.</li><li><b>AVC = VC/Q</b>: 12 → 24 → 36 → 48 … It rises, because more output needs more and more variable input per extra unit. This is the <b>diminishing returns effect</b>.</li></ul><p>ATC is their sum: <b>ATC = AFC + AVC</b> (divide TC = FC + VC by Q). Example at 3 pairs: 36 + 36 = 72. (Fun fact: at 3 pairs AFC and AVC are equal, both $36.)</p>"
   },
   {
    "h": "Why ATC is a U: a tug of war (slide 23)",
    "body": "<p>When output grows, two effects pull ATC in opposite directions:</p><table><tr><th>Move</th><th>AFC change (spreading)</th><th>AVC change (dim. returns)</th><th>ATC</th><th>Winner</th></tr><tr><td>1 → 2</td><td>−54</td><td>+12</td><td>120 → 78</td><td>spreading</td></tr><tr><td>2 → 3</td><td>−18</td><td>+12</td><td>78 → 72</td><td>spreading</td></tr><tr><td>3 → 4</td><td>−9</td><td>+12</td><td>72 → 75</td><td>dim. returns</td></tr><tr><td>4 → 5</td><td>−5.40</td><td>+12</td><td>75 → 81.60</td><td>dim. returns</td></tr></table><p>At low output the spreading effect is big, so ATC falls. Later AFC hardly falls any more, the diminishing returns effect wins, and ATC rises. Fall, then rise = <b>U-shape</b>.</p>"
   },
   {
    "h": "MC cuts ATC at its bottom (point M)",
    "body": "<p>Use the average rule: a newcomer below the average pulls it down, a newcomer above pulls it up. MC is the newcomer, ATC is the average.</p><ul><li>3rd pair: MC $60 &lt; ATC(2) $78 → ATC falls to $72.</li><li>4th pair: MC $84 &gt; ATC(3) $72 → ATC rises to $75.</li></ul><p>So MC crosses ATC at the bottom of the U: <b>M = 3 pairs, $72</b>, the <b>minimum-cost output</b>.</p><p>The same rule works for AVC: MC = AVC at the lowest AVC. At Ben's, MC of the 1st pair ($12) equals AVC at 1 pair ($12), and after that MC is always above AVC, so AVC only rises. (In the smooth graph, MC = 24Q and AVC = 12Q both start at 0, so they meet at AVC's lowest point.)</p>"
   },
   {
    "h": "The professor's proof (slide 27)",
    "body": "<p>For ATC to be at its minimum, its slope dATC/dQ must be 0.</p><p>dATC/dQ = d(TC/Q)/dQ = (MC·Q − TC)/Q² = <b>(1/Q)(MC − ATC)</b></p><p>Because 1/Q &gt; 0, the slope of ATC has the same sign as (MC − ATC):</p><ul><li>MC &lt; ATC → slope &lt; 0 → ATC falling.</li><li>MC = ATC → slope = 0 → ATC at its <b>minimum</b>.</li><li>MC &gt; ATC → slope &gt; 0 → ATC rising.</li></ul><p>Replace TC with VC and you get the same result for AVC (slide 28: \"You can prove as (1)\").</p>"
   }
  ],
  "example": {
   "problem": "<p>Ben's Boots makes 6 pairs: FC = $108, VC = $432. The 7th pair has MC = $156. (a) Find AFC, AVC and ATC at 6 pairs. (b) If Ben makes the 7th pair, will ATC rise or fall? Find the new ATC.</p>",
   "solution": "<ol><li>AFC = 108/6 = <b>$18</b>.</li><li>AVC = 432/6 = <b>$72</b>.</li><li>ATC = AFC + AVC = 18 + 72 = <b>$90</b> (check: TC = 540, 540/6 = 90).</li><li>MC of the 7th pair ($156) is <b>above</b> ATC ($90), so ATC <b>rises</b>.</li><li>New ATC = (540 + 156)/7 = 696/7 = <b>$99.43</b>. It rose, as the rule says.</li></ol>"
  },
  "check": [
   {
    "q": "Which cost curve always slopes down?",
    "a": "AFC (= FC/Q), because the same fixed cost is shared by more units."
   },
   {
    "q": "Name the two effects that make ATC U-shaped.",
    "a": "The spreading effect (AFC falls) and the diminishing returns effect (AVC rises)."
   },
   {
    "q": "At Ben's Boots, AFC = 27 and AVC = 48 at 4 pairs. What is ATC?",
    "a": "27 + 48 = $75."
   },
   {
    "q": "Write the professor's formula for the slope of ATC.",
    "a": "dATC/dQ = (1/Q)(MC − ATC)."
   },
   {
    "q": "Which two average curves does MC cross at their minimum points?",
    "a": "ATC and AVC."
   }
  ],
  "exam": {
   "question": "<p><b>Q21.</b> Look at Figure 7-8 for Ben's Boots. Name the four cost curves and describe their shapes. Why is the ATC curve U-shaped?</p><p><b>Q22.</b> Why does the MC curve cross the ATC curve at its lowest point M? What is the minimum-cost output for Ben's Boots and the ATC there?</p>",
   "answer": "<p><b>Q21.</b> The four curves are:</p><ul><li><b>MC</b> (marginal cost): slopes upward (increasing marginal cost, caused by diminishing returns to the variable input).</li><li><b>AFC</b> (= FC/Q): always falling, because the $108 fixed cost is divided by more pairs.</li><li><b>AVC</b> (= VC/Q): rising.</li><li><b>ATC</b> (= TC/Q = AFC + AVC): U-shaped.</li></ul><p>ATC is U-shaped because more output has two opposite effects. <b>Spreading effect:</b> more units share the fixed cost, so AFC falls. <b>Diminishing returns effect:</b> each extra unit needs more variable input, so AVC rises. At low output the spreading effect dominates and ATC falls (120 → 78 → 72). At high output the diminishing returns effect dominates and ATC rises (72 → 75 → 81.60 …).</p><p><b>Q22.</b> An average falls when the new unit is below it and rises when the new unit is above it. If MC &lt; ATC, ATC falls; if MC &gt; ATC, ATC rises; so ATC is lowest where MC = ATC. Proof: dATC/dQ = (1/Q)(MC − ATC), which is 0 only when MC = ATC.</p><p>Ben's Boots: 3rd pair MC = $60 &lt; ATC $78 → ATC falls to $72; 4th pair MC = $84 &gt; ATC $72 → ATC rises to $75. <b>Minimum-cost output = 3 pairs, minimum ATC = $72</b> (point M).</p>"
  },
  "memorize": [
   "MC: straight line up. AFC: always down. AVC: up. ATC: U.",
   "ATC = AFC + AVC.",
   "Spreading effect (AFC ↓) vs diminishing returns effect (AVC ↑).",
   "MC crosses ATC and AVC at their minimum points.",
   "dATC/dQ = (1/Q)(MC − ATC).",
   "Ben's Boots: M = 3 pairs, $72."
  ]
 },
 {
  "id": "Q27",
  "label": "Q27",
  "week": 6,
  "slides": [
   16
  ],
  "kind": "calculation",
  "title": "Ben's Boots: calculate TC, MC, ATC, AVC, AFC",
  "hook": "A sure-points calculation: fill a cost table step by step, with no mistakes.",
  "cards": [
   {
    "h": "The recipe: five formulas",
    "body": "<ol><li><b>TC = FC + VC</b> (total cost)</li><li><b>MC = ΔTC/ΔQ</b> (marginal cost: change in TC from one row to the next)</li><li><b>ATC = TC/Q</b> (average total cost)</li><li><b>AFC = FC/Q</b> (average fixed cost)</li><li><b>AVC = VC/Q</b> (average variable cost)</li></ol><p>Ben's Boots: <b>FC = $108</b> at every quantity, even at Q = 0 (he pays the workshop rent even if he makes nothing). VC = $0, 12, 48, 108, 192, 300, 432, 588, 768, 972, 1,200 for 0 to 10 pairs.</p>"
   },
   {
    "h": "Step 1: TC = FC + VC",
    "body": "<p>Add $108 to every VC number:</p><p>Q = 0: 108 + 0 = <b>108</b>. Q = 1: 108 + 12 = <b>120</b>. Q = 2: 108 + 48 = <b>156</b>. Q = 3: 108 + 108 = <b>216</b> … Q = 10: 108 + 1,200 = <b>1,308</b>.</p><p>On a graph, TC is the VC curve lifted up by $108. The gap between them is always FC.</p>",
    "chart": {
     "x": "Quantity of boots (pairs)",
     "y": "Cost ($)",
     "xmax": 10.4,
     "ymax": 1400,
     "xticks": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
     ],
     "yticks": [
      200,
      400,
      600,
      800,
      1000,
      1200,
      1400
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         108
        ],
        [
         1,
         120
        ],
        [
         2,
         156
        ],
        [
         3,
         216
        ],
        [
         4,
         300
        ],
        [
         5,
         408
        ],
        [
         6,
         540
        ],
        [
         7,
         696
        ],
        [
         8,
         876
        ],
        [
         9,
         1080
        ],
        [
         10,
         1308
        ]
       ],
       "label": "TC",
       "role": "other"
      },
      {
       "pts": [
        [
         0,
         0
        ],
        [
         1,
         12
        ],
        [
         2,
         48
        ],
        [
         3,
         108
        ],
        [
         4,
         192
        ],
        [
         5,
         300
        ],
        [
         6,
         432
        ],
        [
         7,
         588
        ],
        [
         8,
         768
        ],
        [
         9,
         972
        ],
        [
         10,
         1200
        ]
       ],
       "label": "VC",
       "role": "avc"
      }
     ],
     "hlines": [
      {
       "y": 108,
       "label": "FC = $108",
       "role": "other"
      }
     ],
     "points": [
      {
       "x": 0,
       "y": 108,
       "label": "TC starts at $108"
      }
     ],
     "caption": "TC = FC + VC. TC is VC lifted up by $108 at every quantity. Both get steeper: each extra pair costs more (increasing marginal cost)."
    }
   },
   {
    "h": "Step 2: MC = ΔTC/ΔQ",
    "body": "<p>Subtract each TC from the next one (ΔQ = 1 pair each time):</p><p>120 − 108 = <b>12</b>; 156 − 120 = <b>36</b>; 216 − 156 = <b>60</b>; 300 − 216 = <b>84</b>; 408 − 300 = <b>108</b>; then 132, 156, 180, 204, <b>228</b>.</p><ul><li>On slide 16 the MC numbers sit <b>between</b> rows (zig-zag lines). MC belongs to the move from one row to the next. There is no MC \"at\" Q = 0.</li><li>Shortcut: FC never changes, so ΔTC = ΔVC. Example: 48 − 12 = 36, the same as 156 − 120.</li><li>MC rises by $24 each time: <b>increasing marginal cost</b> (slide 17).</li></ul>"
   },
   {
    "h": "Step 3: the averages",
    "body": "<p>Divide by Q (start at Q = 1; you cannot divide by 0):</p><ul><li>ATC = TC/Q: 120/1 = 120; 156/2 = 78; 216/3 = <b>72</b>; 300/4 = 75; 408/5 = 81.60 …</li><li>AFC = 108/Q: 108; 54; 36; 27; 21.60 …</li><li>AVC = VC/Q: 12; 24; 36; 48; 60 …</li></ul><p><b>Check every row:</b> AFC + AVC must equal ATC (e.g. 54 + 24 = 78). At Q = 7: 696/7 = 99.428… → round to <b>99.43</b>; 108/7 = 15.43.</p>"
   },
   {
    "h": "Step 4: read the answer + common traps",
    "body": "<ul><li>Lowest ATC = $72 at 3 pairs → <b>minimum-cost output = 3 pairs</b>.</li><li>Check with MC: 3rd pair MC $60 &lt; ATC(2) $78, so ATC falls; 4th pair MC $84 &gt; ATC(3) $72, so ATC rises.</li></ul><p><b>Traps:</b></p><ul><li>Forgetting FC at Q = 0: TC(0) = $108, not $0.</li><li>Writing MC = TC/Q. No! TC/Q is ATC. MC is the <b>change</b> in TC.</li><li>Dividing AFC by the wrong FC: FC stays $108 in every row.</li><li>Rounding too early. Keep 2 decimals at the end.</li></ul>"
   }
  ],
  "example": {
   "problem": "<p>Practice firm (same pattern, new numbers). FC = $80. VC for Q = 0, 1, 2, 3, 4, 5, 6 is $0, 5, 20, 45, 80, 125, 180. Find TC, MC, ATC, AFC, AVC and the minimum-cost output.</p>",
   "solution": "<table><tr><th>Q</th><th>VC</th><th>TC</th><th>MC</th><th>ATC</th><th>AFC</th><th>AVC</th></tr><tr><td>0</td><td>0</td><td>80</td><td>—</td><td>—</td><td>—</td><td>—</td></tr><tr><td>1</td><td>5</td><td>85</td><td>5</td><td>85.00</td><td>80.00</td><td>5.00</td></tr><tr><td>2</td><td>20</td><td>100</td><td>15</td><td>50.00</td><td>40.00</td><td>10.00</td></tr><tr><td>3</td><td>45</td><td>125</td><td>25</td><td>41.67</td><td>26.67</td><td>15.00</td></tr><tr><td>4</td><td>80</td><td>160</td><td>35</td><td><b>40.00</b></td><td>20.00</td><td>20.00</td></tr><tr><td>5</td><td>125</td><td>205</td><td>45</td><td>41.00</td><td>16.00</td><td>25.00</td></tr><tr><td>6</td><td>180</td><td>260</td><td>55</td><td>43.33</td><td>13.33</td><td>30.00</td></tr></table><p>Minimum-cost output = <b>4 units</b> (ATC = $40). Check: 4th unit MC $35 &lt; ATC(3) $41.67 → ATC falls; 5th unit MC $45 &gt; ATC(4) $40 → ATC rises. MC rises by $10 each time: increasing marginal cost.</p>"
  },
  "check": [
   {
    "q": "What is TC at Q = 0 for Ben's Boots?",
    "a": "$108 (= FC; VC is 0)."
   },
   {
    "q": "TC(4) = 300 and TC(5) = 408. What is the MC of the 5th pair?",
    "a": "408 − 300 = $108."
   },
   {
    "q": "Find ATC, AFC and AVC at 5 pairs (TC = 408, VC = 300).",
    "a": "ATC = 81.60, AFC = 21.60, AVC = 60.00 (21.60 + 60 = 81.60 ✓)."
   },
   {
    "q": "Why can you also compute MC from the VC column?",
    "a": "FC does not change, so ΔTC = ΔVC."
   },
   {
    "q": "Does Ben's Boots have increasing marginal cost? How do you know?",
    "a": "Yes: each pair costs more than the one before (12 &lt; 36 &lt; 60 &lt; … &lt; 228), +$24 each time."
   }
  ],
  "exam": {
   "question": "<p>Ben's Boots has a fixed cost of $108. Its variable cost for 0, 1, 2, …, 10 pairs is $0, 12, 48, 108, 192, 300, 432, 588, 768, 972, 1,200. (a) Complete the total cost and marginal cost columns. (b) Does Ben's Boots have increasing marginal cost? (c) Find ATC, AFC and AVC, and the minimum-cost output.</p>",
   "answer": "<p><b>(a) TC = FC + VC and MC = ΔTC/ΔQ</b></p><table><tr><th>Q (pairs)</th><th>FC</th><th>VC</th><th>TC = FC + VC</th><th>MC = ΔTC/ΔQ</th></tr><tr><td>0</td><td>108</td><td>0</td><td>108 + 0 = 108</td><td>—</td></tr><tr><td>1</td><td>108</td><td>12</td><td>108 + 12 = 120</td><td>120 − 108 = 12</td></tr><tr><td>2</td><td>108</td><td>48</td><td>108 + 48 = 156</td><td>156 − 120 = 36</td></tr><tr><td>3</td><td>108</td><td>108</td><td>108 + 108 = 216</td><td>216 − 156 = 60</td></tr><tr><td>4</td><td>108</td><td>192</td><td>108 + 192 = 300</td><td>300 − 216 = 84</td></tr><tr><td>5</td><td>108</td><td>300</td><td>108 + 300 = 408</td><td>408 − 300 = 108</td></tr><tr><td>6</td><td>108</td><td>432</td><td>108 + 432 = 540</td><td>540 − 408 = 132</td></tr><tr><td>7</td><td>108</td><td>588</td><td>108 + 588 = 696</td><td>696 − 540 = 156</td></tr><tr><td>8</td><td>108</td><td>768</td><td>108 + 768 = 876</td><td>876 − 696 = 180</td></tr><tr><td>9</td><td>108</td><td>972</td><td>108 + 972 = 1,080</td><td>1,080 − 876 = 204</td></tr><tr><td>10</td><td>108</td><td>1,200</td><td>108 + 1,200 = 1,308</td><td>1,308 − 1,080 = 228</td></tr></table><p><b>(b)</b> Yes. Each additional pair costs more than the previous one: 12 &lt; 36 &lt; 60 &lt; … &lt; 228 (MC rises by $24 per pair). This is increasing marginal cost, caused by diminishing returns to the variable input, so the MC curve slopes upward.</p><p><b>(c) Averages</b></p><table><tr><th>Q</th><th>ATC = TC/Q</th><th>AFC = FC/Q</th><th>AVC = VC/Q</th></tr><tr><td>1</td><td>120/1 = 120.00</td><td>108/1 = 108.00</td><td>12/1 = 12.00</td></tr><tr><td>2</td><td>156/2 = 78.00</td><td>108/2 = 54.00</td><td>48/2 = 24.00</td></tr><tr><td>3</td><td>216/3 = <b>72.00</b></td><td>108/3 = 36.00</td><td>108/3 = 36.00</td></tr><tr><td>4</td><td>300/4 = 75.00</td><td>108/4 = 27.00</td><td>192/4 = 48.00</td></tr><tr><td>5</td><td>408/5 = 81.60</td><td>108/5 = 21.60</td><td>300/5 = 60.00</td></tr><tr><td>6</td><td>540/6 = 90.00</td><td>108/6 = 18.00</td><td>432/6 = 72.00</td></tr><tr><td>7</td><td>696/7 = 99.43</td><td>108/7 = 15.43</td><td>588/7 = 84.00</td></tr><tr><td>8</td><td>876/8 = 109.50</td><td>108/8 = 13.50</td><td>768/8 = 96.00</td></tr><tr><td>9</td><td>1,080/9 = 120.00</td><td>108/9 = 12.00</td><td>972/9 = 108.00</td></tr><tr><td>10</td><td>1,308/10 = 130.80</td><td>108/10 = 10.80</td><td>1,200/10 = 120.00</td></tr></table><p>The <b>minimum-cost output is 3 pairs</b> (ATC = $72). Check: the 3rd pair's MC ($60) is below ATC at 2 pairs ($78), so ATC falls; the 4th pair's MC ($84) is above ATC at 3 pairs ($72), so ATC rises.</p>"
  },
  "memorize": [
   "TC = FC + VC; FC = $108 in every row, even Q = 0.",
   "MC = ΔTC/ΔQ = ΔVC/ΔQ (written between rows).",
   "MC: 12, 36, 60, 84, 108, 132, 156, 180, 204, 228 (+24 each).",
   "ATC = TC/Q, AFC = FC/Q, AVC = VC/Q; check AFC + AVC = ATC.",
   "Min ATC = $72 at 3 pairs (minimum-cost output)."
  ]
 },
 {
  "id": "Q11",
  "label": "Q11",
  "week": 7,
  "slides": [
   3,
   4
  ],
  "kind": "theory",
  "title": "Perfect competition: everyone is a price-taker",
  "hook": "After this lesson you can define a perfectly competitive market, a price-taking producer and consumer, and explain the two conditions (plus free entry and exit) that make a market perfectly competitive.",
  "cards": [
   {
    "h": "Start at the bazaar",
    "body": "<p>Imagine the tomato row at Chorsu bazaar. There are 100 sellers. All the tomatoes look the same.</p><p>One seller, Dilnoza, wants to ask a higher price. What happens? Buyers just walk to the next table. So she cannot choose her price. She <b>takes</b> the price that everybody else is charging.</p><p>The same is true for you as a buyer. If you buy 2 kg or 5 kg, the price of tomatoes does not move. You are too small.</p><p>This is the main idea of Week 7: in perfect competition, <b>nobody alone can change the price</b>.</p>"
   },
   {
    "h": "So who sets the price? The whole market",
    "body": "<p>Slide 3 says: the price is set by <b>industry demand</b> and <b>industry supply</b>. That is the normal supply-and-demand picture from Week 3, but for <b>all</b> buyers and <b>all</b> sellers together.</p><p>In the textbook tomato example (slide 18), all the farms together and all the buyers together give a market price of <b>$18</b> per bushel, with 500 bushels sold.</p>",
    "chart": {
     "x": "Quantity of tomatoes, whole market (bushels)",
     "y": "Price ($ per bushel)",
     "xmax": 750,
     "ymax": 28,
     "xticks": [
      100,
      200,
      300,
      400,
      600,
      700
     ],
     "yticks": [
      6,
      10,
      14,
      22,
      26
     ],
     "lines": [
      {
       "pts": [
        [
         300,
         10
        ],
        [
         650,
         24
        ]
       ],
       "label": "Industry S",
       "role": "supply"
      },
      {
       "pts": [
        [
         150,
         20.8
        ],
        [
         700,
         16.4
        ]
       ],
       "label": "D",
       "role": "demand"
      }
     ],
     "points": [
      {
       "x": 500,
       "y": 18,
       "label": "E",
       "guides": true,
       "show": true
      }
     ],
     "caption": "Industry demand and industry supply meet at E: the market price is $18. Every farm and every buyer must accept it."
    }
   },
   {
    "h": "The definitions on slide 3",
    "body": "<ul><li><b>Price-taking producer</b>: a producer whose actions have <b>no effect</b> on the market price of the good it sells.</li><li><b>Price-taking consumer</b>: a consumer whose actions have <b>no effect</b> on the market price of the good he or she buys.</li><li><b>Perfectly competitive market</b>: a market where <b>all</b> participants, both consumers and producers, are price-takers.</li><li><b>Perfectly competitive industry</b>: an industry where the <b>producers</b> are price-takers.</li></ul><p>Small difference to remember: <i>market</i> = buyers and sellers. <i>Industry</i> = only the producers.</p>"
   },
   {
    "h": "What one price-taking firm sees",
    "body": "<p>For one farm, the market price is just a fixed number. It can sell 1 bushel or 7 bushels, and each bushel brings <b>$18</b>.</p><ul><li>Ask more than $18: buyers go to other farms, it sells nothing.</li><li>Ask less than $18: no reason, it can already sell all it wants at $18.</li></ul><p>So the firm's demand is a <b>flat (horizontal) line</b> at the market price. Each extra bushel adds exactly $18 to revenue, so <b>marginal revenue = price</b> (MR = P). You will use this line in all the next lessons.</p>",
    "chart": {
     "x": "Quantity of ONE farm (bushels)",
     "y": "Price ($ per bushel)",
     "xmax": 8,
     "ymax": 28,
     "ymin": 0,
     "xticks": [
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ],
     "yticks": [
      6,
      12,
      18,
      24
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         18
        ],
        [
         7.95,
         18
        ]
       ],
       "label": "Farm's demand: P = MR = $18",
       "role": "demand"
      }
     ],
     "points": [
      {
       "x": 1.5,
       "y": 18,
       "label": "sell 1.5"
      },
      {
       "x": 3.5,
       "y": 18,
       "label": "sell 3.5"
      }
     ],
     "caption": "A price-taker can sell any amount at the market price, so its demand line is flat: P = MR."
    }
   },
   {
    "h": "Condition 1: no producer has a large market share",
    "body": "<p><b>Market share</b> = the fraction of the total industry output that one producer makes.</p><p>Market share = (firm's output) &divide; (total industry output)</p><p>Example: 100 tomato farms make 500 bushels in total. One farm makes 5 bushels. Its share = 5 &divide; 500 = <b>1%</b>. If it doubles or stops production, the market hardly notices. So it cannot move the price.</p><p>Compare: if one company made 60% of all output, it could cut its output, create a shortage, and push the price up. That company is <b>not</b> a price-taker.</p>"
   },
   {
    "h": "Condition 2: a standardized product (a commodity)",
    "body": "<p>A good is a <b>standardized product</b>, also called a <b>commodity</b>, when consumers see the products of different producers as <b>the same good</b>.</p><p>Examples: wheat, tomatoes, raw cotton, potatoes. Wheat from farm A = wheat from farm B. So if farm A asks more, buyers switch at once.</p><p>Not standardized: iPhone vs Samsung, Coca-Cola vs Pepsi, Nike shoes. People think these are different, so a brand can charge more and still keep some buyers. Then the firm is not a price-taker.</p><p>You need <b>both</b> conditions: many small producers <b>and</b> the same product.</p>"
   },
   {
    "h": "Plus: free entry and exit",
    "body": "<p>There is <b>free entry and exit</b> when new producers can easily come into an industry, and existing producers can easily leave it.</p><p>Example: anyone can rent land and start growing tomatoes; a farmer who loses money can stop next season.</p><p>Slide 4 lists it separately from the two necessary conditions. In the textbook it is not strictly necessary, but most perfectly competitive industries have it. It becomes very important in the <b>long run</b>: profits pull new firms in, losses push firms out (later slides 19&ndash;24).</p>"
   }
  ],
  "example": {
   "problem": "<p>A region has 400 wheat farms. Together they grow 80,000 tons of wheat. Farm A grows 200 tons.</p><ol><li>What is Farm A's market share?</li><li>Is Farm A a price-taker? Why?</li><li>In the smartphone industry, Company X sells 30% of all phones. Is this industry perfectly competitive?</li></ol>",
   "solution": "<ol><li>Market share = 200 &divide; 80,000 = 0.0025 = <b>0.25%</b>.</li><li><b>Yes.</b> Its share is tiny (condition 1) and wheat is a standardized product (condition 2). If Farm A changes its output, or asks a higher price, the market price does not change; buyers simply buy identical wheat from other farms.</li><li><b>No.</b> Company X has a large market share (30%), and phones are not standardized: buyers see brands as different goods. So Company X can affect the price; it is not a price-taker.</li></ol>"
  },
  "check": [
   {
    "q": "Define a price-taking consumer.",
    "a": "A consumer whose actions have no effect on the market price of the good he or she buys."
   },
   {
    "q": "What is the formula for market share?",
    "a": "Firm's output &divide; total industry output."
   },
   {
    "q": "Why does a standardized product make a producer a price-taker?",
    "a": "Buyers see all producers' goods as the same, so if one producer asks a higher price, buyers just buy from another producer."
   },
   {
    "q": "In a perfectly competitive market, who sets the price?",
    "a": "No single person. The price is set by industry demand and industry supply together."
   },
   {
    "q": "Is free entry and exit one of the two necessary conditions on slide 4?",
    "a": "No. It is listed separately. It is a usual feature of perfectly competitive industries, important in the long run."
   }
  ],
  "exam": {
   "question": "<p>What is a perfectly competitive market? Define a price-taking producer and a price-taking consumer. State the two necessary conditions for perfect competition, and explain free entry and exit.</p>",
   "answer": "<p>A <b>perfectly competitive market</b> is a market in which all participants, both consumers and producers, are <b>price-takers</b>. The price is determined by industry demand and industry supply. An industry where producers are price-takers is a <b>perfectly competitive industry</b>.</p><p>A <b>price-taking producer</b> is a producer whose actions have no effect on the market price of the good it sells. A <b>price-taking consumer</b> is a consumer whose actions have no effect on the market price of the good he or she buys.</p><p><b>Two necessary conditions:</b></p><ol><li><b>No producer has a large market share.</b> Market share is the fraction of total industry output produced by one producer. When every share is small, no producer can change the price by changing its output.</li><li><b>The good is a standardized product (commodity):</b> consumers regard the products of different producers as the same good. So a producer who raises its price loses its buyers to other producers.</li></ol><p><b>Free entry and exit:</b> new producers can easily enter the industry and existing producers can easily leave it. It is typical of perfectly competitive industries (for example, wheat or tomato farming).</p>"
  },
  "memorize": [
   "Perfectly competitive market: ALL buyers and sellers are price-takers",
   "Price-taker: own actions have no effect on the market price",
   "Price comes from industry demand + industry supply",
   "Condition 1: no large market share (share = own output &divide; industry output)",
   "Condition 2: standardized product = commodity (all producers' goods seen as the same)",
   "Free entry and exit: easy to come in or leave (listed separately)",
   "Firm sees a flat line: P = MR"
  ]
 },
 {
  "id": "Q23",
  "label": "Q23",
  "week": 7,
  "slides": [
   11
  ],
  "kind": "calculation",
  "title": "Keep operating with a loss? The shut-down rule (P vs AVC)",
  "hook": "You will be able to use the slide 11 table to decide when a firm should keep producing even while it loses money, and to show why the rule becomes P &gt; AVC.",
  "cards": [
   {
    "h": "A story: the samsa shop",
    "body": "<p>You run a samsa shop. You signed a rent contract: <b>1000 per month</b>. You must pay it even if the shop is closed. That is a <b>fixed cost (FC)</b>.</p><p>Meat, flour, gas and your helper's wage are paid only when you work. That is <b>variable cost (VC)</b>. If you close, VC = 0.</p><p>This month, sales will not cover all costs. Should you close the shop? Many people say \"yes, I am losing money\". Economics says: <b>not always</b>.</p>"
   },
   {
    "h": "Two choices, two losses",
    "body": "<ul><li><b>Shut down:</b> no sales (TR = 0), no VC, but you still pay FC. Profit = <b>&minus;FC</b>.</li><li><b>Operate:</b> profit = TR &minus; VC &minus; FC.</li></ul><p>Choose the option with the <b>smaller loss</b>. Operating is better when</p><p><code>TR &minus; VC &minus; FC &gt; &minus;FC</code>, which means <code>TR &gt; VC</code>.</p><p>In words: keep working if your revenue pays <b>all of the variable cost</b>. Any extra money helps pay the rent.</p>"
   },
   {
    "h": "The slide 11 table, explained",
    "body": "<p>FC = 1000 in every case. I added three columns to show the logic.</p><table><tr><th>Case</th><th>VC</th><th>TC</th><th>TR</th><th>Profit if operate</th><th>Profit if shut down</th><th>TR &minus; VC</th><th>Operate?</th></tr><tr><td>a</td><td>2000</td><td>3000</td><td>5000</td><td>+2000</td><td>&minus;1000</td><td>3000</td><td>Yes</td></tr><tr><td>b</td><td>3000</td><td>4000</td><td>4000</td><td>0</td><td>&minus;1000</td><td>1000</td><td>Yes</td></tr><tr><td>c</td><td>4000</td><td>5000</td><td>4500</td><td>&minus;500</td><td>&minus;1000</td><td>500</td><td>Yes</td></tr><tr><td>d</td><td>5000</td><td>6000</td><td>5000</td><td>&minus;1000</td><td>&minus;1000</td><td>0</td><td>Maybe</td></tr><tr><td>e</td><td>6000</td><td>7000</td><td>5500</td><td>&minus;1500</td><td>&minus;1000</td><td>&minus;500</td><td>No</td></tr></table><p>Look at the column TR &minus; VC: <b>positive &rarr; operate</b>, <b>zero &rarr; maybe (indifferent)</b>, <b>negative &rarr; shut down</b>.</p>"
   },
   {
    "h": "Case c in plain words",
    "body": "<p>Revenue is 4500. It pays all the variable cost (4000). The 500 left over pays <b>part of the rent</b>.</p><ul><li>Operate: you lose 1000 &minus; 500 = <b>500</b>.</li><li>Shut down: you lose the full rent, <b>1000</b>.</li></ul><p>Losing 500 is better than losing 1000, so you keep operating. That is exactly the slide's message: <i>\"If you shut down, you will lose more money because of the fixed cost.\"</i></p><p>Case d: revenue only just pays VC, you lose 1000 either way, so \"maybe\". Case e: revenue (5500) does not even pay VC (6000); each day open makes the loss bigger, so close.</p>"
   },
   {
    "h": "From TR &gt; VC to P &gt; AVC",
    "body": "<p>The slide writes the operating condition as: <code>&minus;(TR &minus; VC &minus; FC) &lt; FC</code>. The left side is the <b>loss</b> from operating. So it says: \"operate while your loss is smaller than FC\".</p><ol><li>Remove the brackets: <code>&minus;TR + VC + FC &lt; FC</code></li><li>Cancel FC: <code>VC &lt; TR</code></li><li>Use TR = P &times; Q and VC = AVC &times; Q: <code>AVC &times; Q &lt; P &times; Q</code></li><li>Divide by Q: <b><code>P &gt; AVC</code></b></li></ol><p><b>Rule (short run):</b> P &gt; AVC &rarr; operate (even with a loss). P = AVC &rarr; indifferent. P &lt; AVC &rarr; shut down. The lowest point of AVC is called the <b>shut-down price</b>.</p><p>This is a <b>short-run</b> rule, because FC exists only in the short run. In the long run the contract ends, nothing is fixed, and a firm that keeps losing money leaves the industry (next lesson).</p>"
   },
   {
    "h": "On the graph: a loss the firm accepts",
    "body": "<p>The textbook tomato farm (FC = $14). Its shut-down price is $10, its break-even price is $14. Suppose the price is <b>$12</b>.</p><ul><li>Best output: P = MC &rarr; 3.5 bushels. TR = 12 &times; 3.5 = $42.</li><li>ATC = $14.14, so TC = $49.50. <b>Loss = $7.50</b> (red box).</li><li>AVC = $10.14 &lt; P = $12, so revenue pays all VC ($35.50) and $6.50 of the $14 FC.</li><li>Shut down instead: lose the whole FC = $14. So <b>operate</b>: $7.50 &lt; $14.</li></ul>",
    "chart": {
     "x": "Quantity of tomatoes (bushels)",
     "y": "Price, cost ($ per bushel)",
     "xmax": 8,
     "ymax": 26,
     "xticks": [
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ],
     "yticks": [
      4,
      8,
      18,
      22
     ],
     "areas": [
      {
       "pts": [
        [
         0,
         12
        ],
        [
         3.5,
         12
        ],
        [
         3.5,
         14.143
        ],
        [
         0,
         14.143
        ]
       ],
       "role": "dwl",
       "label": "Loss = $7.50"
      }
     ],
     "hlines": [
      {
       "y": 12,
       "label": "P = MR = $12",
       "role": "policy"
      }
     ],
     "lines": [
      {
       "pts": [
        [
         1,
         8
        ],
        [
         1.5,
         5
        ],
        [
         2,
         6
        ],
        [
         2.5,
         8
        ],
        [
         3,
         10
        ],
        [
         4,
         14
        ],
        [
         5,
         18
        ],
        [
         6,
         22
        ],
        [
         6.6,
         24.4
        ]
       ],
       "label": "MC",
       "role": "mc"
      },
      {
       "pts": [
        [
         6.0,
         15.333
        ],
        [
         5.5,
         14.818
        ],
        [
         5,
         14.4
        ],
        [
         4.5,
         14.111
        ],
        [
         4,
         14.0
        ],
        [
         3.5,
         14.143
        ],
        [
         3,
         14.667
        ],
        [
         2.5,
         15.8
        ],
        [
         2.2,
         16.945
        ],
        [
         2.0,
         18.0
        ],
        [
         1.7,
         20.224
        ]
       ],
       "label": "ATC",
       "role": "atc"
      },
      {
       "pts": [
        [
         1.8,
         11.6
        ],
        [
         2.0,
         11.0
        ],
        [
         2.5,
         10.2
        ],
        [
         3,
         10.0
        ],
        [
         3.5,
         10.143
        ],
        [
         4,
         10.5
        ],
        [
         4.5,
         11.0
        ],
        [
         5,
         11.6
        ],
        [
         5.5,
         12.273
        ],
        [
         5.8,
         12.703
        ]
       ],
       "label": "AVC",
       "role": "avc"
      }
     ],
     "points": [
      {
       "x": 3.5,
       "y": 12,
       "guides": true,
       "show": true
      },
      {
       "x": 3.5,
       "y": 14.143,
       "guides": true,
       "show": true
      }
     ],
     "caption": "P = $12 is below min ATC ($14) but above min AVC ($10): the farm loses $7.50, less than the $14 FC it would lose by closing."
    }
   },
   {
    "h": "One picture of the whole rule",
    "body": "<p>For each price, compare the two losses of the tomato farm (always producing where P = MC):</p><table><tr><th>Price</th><th>$6</th><th>$8</th><th>$10</th><th>$12</th><th>$14</th></tr><tr><td>Loss if operate</td><td>24</td><td>19.5</td><td>14</td><td>7.5</td><td>0</td></tr><tr><td>Loss if shut down</td><td>14</td><td>14</td><td>14</td><td>14</td><td>14</td></tr></table><p>The lines cross at <b>P = $10 = minimum AVC</b>. Below $10: shut down. Above $10: operate.</p>",
    "chart": {
     "x": "Market price P ($)",
     "y": "Loss of the farm ($)",
     "xmax": 17,
     "ymax": 26,
     "xticks": [
      2,
      4,
      6,
      8,
      12,
      14,
      16
     ],
     "yticks": [
      5,
      10,
      14,
      20
     ],
     "hlines": [
      {
       "y": 14,
       "label": "If you shut down (= FC)",
       "role": "policy"
      }
     ],
     "vlines": [
      {
       "x": 10,
       "label": "Shut-down $10",
       "role": "policy"
      }
     ],
     "lines": [
      {
       "pts": [
        [
         14,
         0
        ],
        [
         13,
         3.875
        ],
        [
         12,
         7.5
        ],
        [
         11,
         10.875
        ],
        [
         10,
         14
        ],
        [
         9,
         16.875
        ],
        [
         8,
         19.5
        ],
        [
         7,
         21.875
        ],
        [
         6,
         24
        ]
       ],
       "label": "If you operate",
       "role": "other"
      }
     ],
     "points": [
      {
       "x": 10,
       "y": 14
      },
      {
       "x": 12,
       "y": 7.5,
       "label": "P=12: lose 7.5"
      },
      {
       "x": 14,
       "y": 0,
       "label": "Break-even"
      }
     ],
     "caption": "Left of $10, operating loses more than FC, so shut down. Right of $10, operating loses less, so keep producing."
    }
   }
  ],
  "example": {
   "problem": "<p>A small shop has fixed cost FC = 600 per month. At its best output, Q = 100 units, its variable cost is VC = 2000. The market price is P = 23.</p><ol><li>Find TR, TC and profit. Should the shop operate or shut down in the short run?</li><li>Show the same answer with the rule P &gt; AVC.</li><li>The price falls to P = 18 (output and VC stay the same). Now what?</li></ol>",
   "solution": "<ol><li>TR = 23 &times; 100 = 2300. TC = 600 + 2000 = 2600. Profit = 2300 &minus; 2600 = <b>&minus;300</b>. If it shuts down, profit = &minus;FC = <b>&minus;600</b>. &minus;300 is better, so <b>operate</b>.</li><li>AVC = VC &divide; Q = 2000 &divide; 100 = 20. P = 23 &gt; AVC = 20 &rarr; operate. (TR &minus; VC = 300 &gt; 0, and this 300 pays half of the rent.)</li><li>TR = 1800 &lt; VC = 2000. Operating: profit = 1800 &minus; 2600 = &minus;800. Shut down: &minus;600. P = 18 &lt; AVC = 20 &rarr; <b>shut down</b>. This is like case e on the slide.</li></ol>"
  },
  "check": [
   {
    "q": "If a firm shuts down in the short run, how much does it lose?",
    "a": "Exactly its fixed cost (FC), because FC must be paid anyway."
   },
   {
    "q": "Case e: why should the firm shut down?",
    "a": "TR (5500) &lt; VC (6000). Operating loses 1500, shutting down loses only 1000."
   },
   {
    "q": "Case d says \"Maybe\". Why?",
    "a": "TR = VC = 5000, so the loss is 1000 whether it operates or not: the firm is indifferent."
   },
   {
    "q": "P = 12, AVC = 10.14, ATC = 14.14. Profit or loss? Operate?",
    "a": "P &lt; ATC, so a loss. But P &gt; AVC, so operate in the short run."
   },
   {
    "q": "What is the shut-down price?",
    "a": "The minimum of the AVC curve. Below it, the firm shuts down in the short run."
   }
  ],
  "exam": {
   "question": "<p>Look at the table on slide 11 (cases a&ndash;e, FC = 1000). In case c the firm makes a loss. Should it keep operating? Explain why, say what the firm should do in cases d and e, and show how the business operating condition becomes P &gt; AVC.</p>",
   "answer": "<p><b>Yes, in case c the firm should keep operating.</b> If it shuts down, it still pays the fixed cost of 1000, so it loses 1000. If it operates, profit = TR &minus; TC = 4500 &minus; 5000 = &minus;500. Losing 500 is better than losing 1000. Revenue (4500) covers all the variable cost (4000), and the remaining 500 covers part of the fixed cost.</p><p>Case d: TR = VC = 5000, so the loss is 1000 whether it operates or not: the firm is indifferent (\"maybe\"). Case e: TR = 5500 &lt; VC = 6000; operating loses 1500, more than the 1000 lost by shutting down, so it should <b>shut down</b>. (Cases a and b: profit 2000 and 0, so operate.)</p><p><b>Operating condition:</b> operate while the loss from operating is smaller than FC:<br>&minus;(TR &minus; VC &minus; FC) &lt; FC &rArr; VC &lt; TR.<br>Since TR = P &times; Q and VC = AVC &times; Q: AVC &times; Q &lt; P &times; Q &rArr; <b>P &gt; AVC</b>.</p><p>So in the short run a firm keeps producing as long as the price is above average variable cost, even if it makes a loss. The minimum of AVC is the shut-down price.</p>"
  },
  "memorize": [
   "Shut down &rarr; still pay FC &rarr; loss = FC",
   "Operate if loss &lt; FC &hArr; TR &gt; VC",
   "Divide by Q: P &gt; AVC &rarr; operate (short run)",
   "Case c: lose 500 open vs 1000 closed &rarr; operate",
   "Case d: TR = VC &rarr; maybe; case e: TR &lt; VC &rarr; shut down",
   "Shut-down price = minimum AVC"
  ]
 },
 {
  "id": "Q24",
  "label": "Q24",
  "week": 7,
  "slides": [
   15
  ],
  "kind": "theory",
  "title": "Break-even price (min ATC) and shut-down price (min AVC): Table 7-4",
  "hook": "You will be able to reproduce Table 7-4: compare the price with min ATC and min AVC, and say what a perfectly competitive firm does in the short run and in the long run.",
  "cards": [
   {
    "h": "Two different questions",
    "body": "<p>A firm owner asks two questions, on two time scales:</p><ol><li><b>Short run: \"Should I produce today?\"</b> The fixed cost must be paid anyway. Only the variable cost matters. &rarr; Compare P with <b>minimum AVC</b>.</li><li><b>Long run: \"Should I stay in this industry?\"</b> In the long run nothing is fixed (contracts end, machines can be sold). The firm must cover <b>all</b> its costs. &rarr; Compare P with <b>minimum ATC</b>.</li></ol><p>Table 7-4 is just these two comparisons. Top half = profitability (long run). Bottom half = production (short run).</p>"
   },
   {
    "h": "Where the two key prices are",
    "body": "<p>The MC curve cuts both U-shaped curves at their <b>lowest points</b>.</p><ul><li><b>Break-even price = minimum ATC.</b> At this price, profit = 0. Tomato farm: <b>$14</b> (at 4 bushels).</li><li><b>Shut-down price = minimum AVC.</b> Below it, the firm stops producing. Tomato farm: <b>$10</b> (at 3 bushels).</li></ul><p>The shut-down price is always <b>lower</b>, because ATC = AVC + AFC, so ATC lies above AVC.</p>",
    "chart": {
     "x": "Quantity of tomatoes (bushels)",
     "y": "Price, cost ($ per bushel)",
     "xmax": 8,
     "ymax": 26,
     "xticks": [
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ],
     "yticks": [
      6,
      10,
      14,
      18,
      22
     ],
     "hlines": [
      {
       "y": 14,
       "label": "Break-even $14",
       "role": "policy"
      },
      {
       "y": 10,
       "label": "Shut-down $10",
       "role": "policy"
      }
     ],
     "lines": [
      {
       "pts": [
        [
         1,
         8
        ],
        [
         1.5,
         5
        ],
        [
         2,
         6
        ],
        [
         2.5,
         8
        ],
        [
         3,
         10
        ],
        [
         4,
         14
        ],
        [
         5,
         18
        ],
        [
         6,
         22
        ],
        [
         6.6,
         24.4
        ]
       ],
       "label": "MC",
       "role": "mc"
      },
      {
       "pts": [
        [
         6.0,
         15.333
        ],
        [
         5.5,
         14.818
        ],
        [
         5,
         14.4
        ],
        [
         4.5,
         14.111
        ],
        [
         4,
         14.0
        ],
        [
         3.5,
         14.143
        ],
        [
         3,
         14.667
        ],
        [
         2.5,
         15.8
        ],
        [
         2.2,
         16.945
        ],
        [
         2.0,
         18.0
        ],
        [
         1.7,
         20.224
        ]
       ],
       "label": "ATC",
       "role": "atc"
      },
      {
       "pts": [
        [
         1.5,
         13.0
        ],
        [
         2.0,
         11.0
        ],
        [
         2.5,
         10.2
        ],
        [
         3,
         10.0
        ],
        [
         3.5,
         10.143
        ],
        [
         4,
         10.5
        ],
        [
         4.5,
         11.0
        ],
        [
         5,
         11.6
        ],
        [
         5.5,
         12.273
        ]
       ],
       "label": "AVC",
       "role": "avc"
      }
     ],
     "points": [
      {
       "x": 4,
       "y": 14
      },
      {
       "x": 3,
       "y": 10
      }
     ],
     "caption": "MC crosses ATC at its minimum ($14 = break-even price) and AVC at its minimum ($10 = shut-down price)."
    }
   },
   {
    "h": "Top half: the profitability condition (P vs min ATC)",
    "body": "<table><tr><th>Price</th><th>Result</th></tr><tr><td>P &gt; min ATC</td><td>Firm <b>profitable</b>. <b>Entry</b> into the industry in the long run.</td></tr><tr><td>P = min ATC</td><td>Firm <b>breaks even</b>. <b>No entry or exit</b> in the long run.</td></tr><tr><td>P &lt; min ATC</td><td>Firm <b>unprofitable</b>. <b>Exit</b> from the industry in the long run.</td></tr></table><p>Why entry and exit? Remember free entry and exit: profit attracts new firms; losses make firms leave. (Profit here means <b>economic</b> profit, so \"break even\" means the owner earns just a normal return.)</p>"
   },
   {
    "h": "Bottom half: the production condition (P vs min AVC)",
    "body": "<table><tr><th>Price</th><th>Result</th></tr><tr><td>P &gt; min AVC</td><td>Firm <b>produces</b> in the short run. If P &lt; min ATC: covers all variable cost and <b>some but not all</b> fixed cost. If P &gt; min ATC: covers all variable and fixed cost.</td></tr><tr><td>P = min AVC</td><td>Firm is <b>indifferent</b> between producing or not. Just covers variable cost.</td></tr><tr><td>P &lt; min AVC</td><td>Firm <b>shuts down</b> in the short run. Does not cover variable cost.</td></tr></table><p>This is the slide 11 rule (P &gt; AVC) written with the lowest point of AVC.</p>"
   },
   {
    "h": "Three price zones, with the tomato farm",
    "body": "<p>The farm always chooses output where P = MC. FC = $14.</p><table><tr><th>Price</th><th>Output</th><th>Profit</th><th>Short run</th><th>Long run</th></tr><tr><td>$18</td><td>5</td><td>+$18</td><td>produce</td><td>new firms enter</td></tr><tr><td>$14 (= min ATC)</td><td>4</td><td>$0</td><td>produce</td><td>no entry, no exit</td></tr><tr><td>$12</td><td>3.5</td><td>&minus;$7.50</td><td>produce (loss &lt; FC)</td><td>exit</td></tr><tr><td>$10 (= min AVC)</td><td>3</td><td>&minus;$14</td><td>indifferent (loss = FC)</td><td>exit</td></tr><tr><td>$8</td><td>0</td><td>&minus;$14</td><td>shut down</td><td>exit</td></tr></table><p>The middle zone is the tricky one: <b>between $10 and $14</b> the firm makes a loss but still produces in the short run, then leaves in the long run. (At $8, producing 2.5 bushels would lose $19.50, more than the $14 FC, so it closes.)</p>"
   },
   {
    "h": "Result: the firm's short-run supply curve",
    "body": "<p>Put the rules together (slides 12&ndash;13):</p><ul><li>If it produces, the firm chooses Q where <b>P = MC</b>. So the MC curve tells how much it supplies at each price.</li><li>But below the shut-down price it produces <b>nothing</b>.</li></ul><p>So the <b>short-run individual supply curve = the part of the MC curve above minimum AVC</b>.</p><p>Small correction: slide 12 writes \"Ps: minimum average cost\". It should be minimum average <b>variable</b> cost (the shut-down price), as slide 13 says: \"P &gt; AVC\".</p>",
    "chart": {
     "x": "Quantity of tomatoes (bushels)",
     "y": "Price ($ per bushel)",
     "xmax": 8,
     "ymax": 26,
     "xticks": [
      1,
      2,
      3,
      4,
      5,
      6,
      7
     ],
     "yticks": [
      6,
      14,
      18,
      22
     ],
     "hlines": [
      {
       "y": 10,
       "label": "Shut-down price $10",
       "role": "policy"
      }
     ],
     "lines": [
      {
       "pts": [
        [
         3,
         10
        ],
        [
         2.5,
         8
        ],
        [
         2,
         6
        ],
        [
         1.5,
         5
        ],
        [
         1,
         8
        ]
       ],
       "label": "MC",
       "role": "mc"
      },
      {
       "pts": [
        [
         1.6,
         12.45
        ],
        [
         2.0,
         11.0
        ],
        [
         2.5,
         10.2
        ],
        [
         3,
         10.0
        ],
        [
         3.5,
         10.143
        ],
        [
         4,
         10.5
        ],
        [
         4.5,
         11.0
        ],
        [
         5,
         11.6
        ],
        [
         5.5,
         12.273
        ]
       ],
       "label": "AVC",
       "role": "avc"
      },
      {
       "pts": [
        [
         3,
         10
        ],
        [
         6.5,
         24
        ]
       ],
       "label": "Firm's S",
       "role": "supply"
      }
     ],
     "points": [
      {
       "x": 3,
       "y": 10
      }
     ],
     "caption": "Supply = MC above the shut-down point (3 bushels, $10). Below $10 the farm supplies zero."
    }
   }
  ],
  "example": {
   "problem": "<p>A perfectly competitive firm has minimum AVC = $20 and minimum ATC = $30. For each market price, say (i) profit, break even or loss, (ii) produce or shut down in the short run, (iii) entry, exit or nothing in the long run.</p><p>(a) P = $35 &nbsp; (b) P = $30 &nbsp; (c) P = $25 &nbsp; (d) P = $15</p>",
   "solution": "<ul><li>(a) $35 &gt; min ATC: <b>profit</b>; produce; new firms <b>enter</b> in the long run.</li><li>(b) $30 = min ATC: <b>break even</b> (zero economic profit); produce; <b>no entry or exit</b>.</li><li>(c) $25: below min ATC ($30) but above min AVC ($20): <b>loss</b>, but still <b>produce</b> in the short run (covers all VC and part of FC); <b>exit</b> in the long run.</li><li>(d) $15 &lt; min AVC: cannot even cover VC, so <b>shut down</b> now (loss = FC); <b>exit</b> in the long run.</li></ul>"
  },
  "check": [
   {
    "q": "Break-even price = the minimum of which curve?",
    "a": "Average total cost (ATC)."
   },
   {
    "q": "Shut-down price = the minimum of which curve?",
    "a": "Average variable cost (AVC)."
   },
   {
    "q": "Which comparison decides entry and exit in the long run?",
    "a": "P compared with min ATC (the profitability condition)."
   },
   {
    "q": "min AVC &lt; P &lt; min ATC. What happens?",
    "a": "Loss, but the firm produces in the short run (covers VC and part of FC); in the long run it exits."
   },
   {
    "q": "What is the firm's short-run supply curve?",
    "a": "The part of its MC curve above minimum AVC (the shut-down price)."
   }
  ],
  "exam": {
   "question": "<p>Summarize the perfectly competitive firm's profitability and production conditions (Table 7-4). What are the break-even price and the shut-down price? What does the firm do in the short run and in the long run when P is greater than, equal to, or less than each of them?</p>",
   "answer": "<p>The <b>break-even price</b> is the firm's <b>minimum average total cost</b>: at this price economic profit is zero. The <b>shut-down price</b> is its <b>minimum average variable cost</b>.</p><p><b>Profitability condition (P vs min ATC), long run:</b></p><ul><li>P &gt; min ATC: the firm is profitable; new firms enter the industry in the long run.</li><li>P = min ATC: the firm breaks even; no entry into or exit from the industry.</li><li>P &lt; min ATC: the firm is unprofitable; firms exit the industry in the long run.</li></ul><p><b>Production condition (P vs min AVC), short run:</b></p><ul><li>P &gt; min AVC: the firm produces. If P &lt; min ATC, it covers its variable cost and some but not all of its fixed cost; if P &gt; min ATC, it covers all variable and fixed cost.</li><li>P = min AVC: the firm is indifferent between producing and not; it just covers variable cost.</li><li>P &lt; min AVC: the firm shuts down in the short run; it does not cover variable cost.</li></ul><p><b>Reason:</b> in the short run fixed cost must be paid anyway, so the firm only needs P &gt; AVC to produce. In the long run all costs can be avoided, so it stays only if P covers ATC. Therefore the firm's short-run supply curve is its MC curve above minimum AVC.</p>"
  },
  "memorize": [
   "Break-even price = min ATC &rarr; profit or loss &rarr; entry/exit (LONG run)",
   "Shut-down price = min AVC &rarr; produce or not (SHORT run)",
   "MC cuts ATC and AVC at their minimums",
   "P &gt; min ATC: profit, entry. P = min ATC: zero profit, no entry/exit. P &lt; min ATC: exit",
   "min AVC &lt; P &lt; min ATC: loss but produce now, exit later",
   "P &lt; min AVC: shut down (loss = FC)",
   "SR supply = MC above min AVC"
  ]
 },
 {
  "id": "Q12",
  "label": "Q12",
  "week": 7,
  "slides": [
   17
  ],
  "kind": "theory",
  "title": "Short-run industry supply curve and short-run market equilibrium",
  "hook": "You will be able to define the short-run industry supply curve and short-run market equilibrium, build industry supply by adding firms' quantities, and explain the tomato example (Figure 7-5).",
  "cards": [
   {
    "h": "From one farm to the whole industry",
    "body": "<p>Last lesson: each firm's supply curve is its MC curve above minimum AVC. Now we want the supply of <b>all</b> firms together.</p><p>The <b>industry supply curve</b> shows the relationship between the price of a good and the <b>total output of the industry</b> (slide 16).</p><p>How to build it: pick a price, ask every firm \"how much do you sell at this price?\", and <b>add the quantities</b>: Q = q<sub>1</sub> + q<sub>2</sub> + &hellip; + q<sub>k</sub>. Repeat for other prices.</p><p>We add <b>sideways</b> (quantities), never prices. This is called horizontal summation.</p>",
    "chart": {
     "x": "Quantity",
     "y": "Price ($)",
     "xmax": 12,
     "ymax": 24,
     "xticks": [
      2,
      4,
      8,
      10
     ],
     "yticks": [
      4,
      8,
      12,
      20
     ],
     "hlines": [
      {
       "y": 16,
       "label": "P = $16",
       "role": "policy"
      }
     ],
     "lines": [
      {
       "pts": [
        [
         0,
         4
        ],
        [
         5,
         24
        ]
       ],
       "label": "Firm B",
       "role": "supply2"
      },
      {
       "pts": [
        [
         0,
         4
        ],
        [
         10,
         24
        ]
       ],
       "label": "Firm A",
       "role": "supply2"
      },
      {
       "pts": [
        [
         0,
         4
        ],
        [
         11.9,
         19.867
        ]
       ],
       "label": "Industry = A + B",
       "role": "supply"
      }
     ],
     "points": [
      {
       "x": 3,
       "y": 16,
       "guides": true,
       "show": true
      },
      {
       "x": 6,
       "y": 16,
       "guides": true,
       "show": true
      },
      {
       "x": 9,
       "y": 16,
       "guides": true,
       "show": true
      }
     ],
     "caption": "At P = $16, firm B sells 3 and firm A sells 6, so the industry sells 3 + 6 = 9."
    }
   },
   {
    "h": "The definition on slide 17",
    "body": "<p>The <b>short-run industry supply curve</b> shows how the quantity supplied by an industry depends on the market price, <b>given a fixed number of producers</b>.</p><p>\"Short run\" = there is no time for new firms to build farms, or for old firms to sell everything and leave. So the number of producers is fixed.</p><p>It <b>slopes upward</b>: when the price rises, every firm moves up its own MC curve and produces more, so the total rises.</p>"
   },
   {
    "h": "The tomato example (slide 18, Figure 7-5)",
    "body": "<p>There are <b>100 identical farms</b>. Each farm is the farm from the last lessons: shut-down price $10, and it supplies where P = MC.</p><table><tr><th>Price</th><th>One farm supplies</th><th>Industry (&times; 100)</th></tr><tr><td>below $10</td><td>0</td><td>0</td></tr><tr><td>$10</td><td>3</td><td>300</td></tr><tr><td>$14</td><td>4</td><td>400</td></tr><tr><td>$18</td><td>5</td><td>500</td></tr><tr><td>$22</td><td>6</td><td>600</td></tr></table><p>So the industry curve starts at (300 bushels, $10). Below $10, no farm wants to produce, so the industry supplies nothing.</p>"
   },
   {
    "h": "Short-run market equilibrium",
    "body": "<p>There is a <b>short-run market equilibrium</b> when the quantity supplied equals the quantity demanded, <b>taking the number of producers as given</b>.</p><p>In Figure 7-5 the short-run industry supply curve meets demand at E<sub>MKT</sub>: price <b>$18</b>, quantity <b>500 bushels</b>. Each of the 100 farms sells 5 bushels.</p>",
    "chart": {
     "x": "Quantity of tomatoes (bushels)",
     "y": "Price, cost of bushel ($)",
     "xmax": 750,
     "ymax": 28,
     "xticks": [
      100,
      200,
      400,
      600,
      700
     ],
     "yticks": [
      6,
      14,
      22,
      26
     ],
     "lines": [
      {
       "pts": [
        [
         300,
         10
        ],
        [
         650,
         24
        ]
       ],
       "label": "S",
       "role": "supply"
      },
      {
       "pts": [
        [
         150,
         20.8
        ],
        [
         700,
         16.4
        ]
       ],
       "label": "D",
       "role": "demand"
      }
     ],
     "points": [
      {
       "x": 500,
       "y": 18,
       "label": "E",
       "guides": true,
       "show": true
      },
      {
       "x": 300,
       "y": 10,
       "guides": true,
       "show": true
      }
     ],
     "caption": "Figure 7-5 (demand drawn approximately): supply starts at the shut-down price $10 (300 bushels) and meets demand at $18, 500 bushels."
    }
   },
   {
    "h": "Why it is only \"short run\"",
    "body": "<p>At $18 each farm earns a profit: (18 &minus; 14.40) &times; 5 = <b>$18</b> (slide 9). Profit attracts new farms. But along the short-run curve the number of farms is fixed, so this cannot happen yet.</p><p>In the long run (slides 19&ndash;22) new farms enter, the supply curve shifts right, and the price falls until it reaches the break-even price, $14 (zero profit). That is the <b>long-run</b> equilibrium.</p><p>Exam key words: short run = <b>fixed number of producers</b>; long run = <b>entry and exit allowed</b>.</p>"
   }
  ],
  "example": {
   "problem": "<p>An industry has 100 identical firms. One firm supplies 0 units if P &lt; $10, and 3, 4, 5, 6 units at P = $10, $14, $18, $22. Market demand is: $10 &rarr; 900, $14 &rarr; 700, $18 &rarr; 500, $22 &rarr; 300 units.</p><ol><li>Build the short-run industry supply schedule.</li><li>Find the short-run market equilibrium.</li><li>What is assumed about the number of firms?</li></ol>",
   "solution": "<ol><li>Multiply each firm's quantity by 100: $10 &rarr; 300, $14 &rarr; 400, $18 &rarr; 500, $22 &rarr; 600 (and 0 below $10).</li><li>Compare: at $14, Qd = 700 &gt; Qs = 400 (shortage, price rises). At $22, Qs = 600 &gt; Qd = 300 (surplus, price falls). At <b>$18, Qs = Qd = 500</b>. Equilibrium: P = $18, Q = 500; each firm sells 5.</li><li>The number of firms is <b>fixed at 100</b>. That is what makes it a short-run supply curve and a short-run equilibrium.</li></ol>"
  },
  "check": [
   {
    "q": "What is held fixed along the short-run industry supply curve?",
    "a": "The number of producers."
   },
   {
    "q": "Do we add prices or quantities to get industry supply?",
    "a": "Quantities: at each price, Q = q<sub>1</sub> + q<sub>2</sub> + &hellip; + q<sub>k</sub> (horizontal summation)."
   },
   {
    "q": "In Figure 7-5, why is there no supply below $10?",
    "a": "$10 is the shut-down price (min AVC). Below it, every farm shuts down."
   },
   {
    "q": "Define short-run market equilibrium.",
    "a": "Quantity supplied = quantity demanded, taking the number of producers as given."
   },
   {
    "q": "At E<sub>MKT</sub> ($18) farms earn profit. Is this a long-run equilibrium?",
    "a": "No. Profit attracts entry; supply shifts right and the price falls toward the break-even price ($14)."
   }
  ],
  "exam": {
   "question": "<p>What is the short-run industry supply curve? What is a short-run market equilibrium? Explain how the industry supply curve is related to the supply curves of individual firms.</p>",
   "answer": "<p>The <b>short-run industry supply curve</b> shows how the quantity supplied by an industry depends on the market price, given a <b>fixed number of producers</b>.</p><p>It is built from the individual supply curves: each firm supplies along its MC curve above minimum AVC, and at each price the quantities of all firms are added: Q = q<sub>1</sub> + q<sub>2</sub> + &hellip; + q<sub>k</sub>. As the price rises, each firm produces more, so the industry curve slopes upward. Below the shut-down price no firm produces.</p><p>A <b>short-run market equilibrium</b> exists when the quantity supplied equals the quantity demanded, taking the number of producers as given.</p><p><b>Example (Figure 7-5):</b> 100 tomato farms; below the shut-down price of $10 no farm produces. The short-run industry supply curve meets demand at $18 and 500 bushels (5 bushels per farm). It is \"short run\" because the number of producers cannot change; in the long run firms can enter or exit.</p>"
  },
  "memorize": [
   "SR industry supply: industry Q vs price, FIXED number of producers",
   "Built by adding firms' quantities at each price (horizontal sum)",
   "Each firm: MC above min AVC; below shut-down price, 0",
   "SR market equilibrium: Qs = Qd, number of producers given",
   "Fig 7-5: 100 farms, shut-down $10 (300 bushels), equilibrium $18 and 500 bushels",
   "Long run: entry/exit, price goes to break-even ($14)"
  ]
 }
];
