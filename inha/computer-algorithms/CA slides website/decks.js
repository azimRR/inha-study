/* CA midterm slides — all deck content.
   Source: Track A only (professor's 13 decks, A1, A2 + his sample solution),
   condensed from "A - FROM CLASS (slides only)/MIDTERM REVIEW (from slides only).md". */

const PDF_DIR = "../A - FROM CLASS (slides only)/slides-pdf (rendered)/";
const pdf = (name) => encodeURI(PDF_DIR + name + ".pdf");

/* Draw a red-black tree from "6B(3R(2B,5B(4R,-)),9R(7B,10B(-,13R)))". "-" = empty child. */
function tree(spec, caption) {
  let i = 0;
  function parse() {
    if (spec[i] === "-") { i++; return null; }
    let m = /^(\d+)([RB])/.exec(spec.slice(i));
    i += m[0].length;
    const n = { v: m[1], c: m[2], l: null, r: null };
    if (spec[i] === "(") {
      i++; n.l = parse();
      if (spec[i] === ",") { i++; n.r = parse(); }
      i++; // ")"
    }
    return n;
  }
  const root = parse();
  let x = 0, maxD = 0;
  (function place(n, d) {
    if (!n) return;
    place(n.l, d + 1);
    n.x = x++; n.d = d; maxD = Math.max(maxD, d);
    place(n.r, d + 1);
  })(root, 0);
  const W = 52, H = 62, R = 18, pad = 26;
  const w = Math.max(x * W + pad * 2 - (W - 2 * R), 120), h = maxD * H + pad * 2 + (caption ? 24 : 0);
  const px = (n) => pad + R + n.x * W, py = (n) => pad + n.d * H;
  let edges = "", nodes = "";
  (function draw(n) {
    if (!n) return;
    for (const ch of [n.l, n.r]) if (ch) {
      edges += `<line class="edge" x1="${px(n)}" y1="${py(n)}" x2="${px(ch)}" y2="${py(ch)}"/>`;
      draw(ch);
    }
    nodes += `<circle class="${n.c === "R" ? "nr" : "nb"}" cx="${px(n)}" cy="${py(n)}" r="${R}"/>` +
      `<text x="${px(n)}" y="${py(n) + 5}" text-anchor="middle">${n.v}</text>`;
  })(root);
  const cap = caption ? `<text class="cap" x="${w / 2}" y="${h - 8}" text-anchor="middle">${caption}</text>` : "";
  return `<div class="tree"><svg viewBox="0 0 ${w} ${h}" width="${w}" role="img" aria-label="red-black tree ${spec}">${edges}${nodes}${cap}</svg></div>`;
}

const box = (kind, html) => `<div class="box ${kind}">${html}</div>`;
const simple = (h) => box("simple", h);
const tip = (h) => box("tip", h);
const trap = (h) => box("trap", h);
const why = (h) => box("why", h);
const ans = (label, h) => `<details class="ans"><summary>${label}</summary><div>${h}</div></details>`;
const tbl = (h) => `<div class="scroll"><table>${h}</table></div>`;

const DECKS = [
/* =========================================================== 0 */
{
  id: "plan", n: "★", week: "Start here", title: "What to prepare for the exam",
  blurb: "Exam facts, how Prof. Seth asks and grades, the priority list and a 3-day plan.",
  pdfs: [],
  slides: [
    { t: "CA Midterm: the game plan", h: `
      <p class="lead">Computer Algorithm (SOC3030-003), Prof. Seth Ashish. These slides explain every midterm topic in simple words, using only what was on his slides and assignments.</p>
      <div class="cols">
        ${why(`<p><b>Midterm = 25%</b> of your grade.<br>Week 8 (Oct 24–30). Covers <b>weeks 1–7 = all 13 decks</b>.</p>`)}
        ${trap(`<p>Day, room and allowed aids are <b>not announced</b> in the material. Class days are Tue/Wed, so probably <b>Tue 27 or Wed 28 Oct</b>. Check eclass / ask classmates.</p>`)}
      </div>` },
    { t: "How he writes questions", h: `
      <div class="big">He takes one slide and gives you a small new input. That's it.</div>
      ${tbl(`<tr><th>Question type</th><th>Seen in</th><th>Comes from</th></tr>
        <tr><td>Find O and Ω, show <b>c and n₀</b></td><td>A1 Q1</td><td>Deck 03 drills</td></tr>
        <tr><td>Is this bound correct or incorrect? (o, Ω)</td><td>A1 Q2</td><td>Deck 03</td></tr>
        <tr><td>Master theorem with <b>[a, b, k, p] / Case / Ans</b> boxes</td><td>A1 Q3</td><td>Deck 05, copied word for word</td></tr>
        <tr><td>Recursion tree</td><td>A1 Q4</td><td>Deck 04 examples</td></tr>
        <tr><td>Build Max Heap (table, columns 0–5)</td><td>A2 Q1</td><td>Deck 09</td></tr>
        <tr><td>Quicksort: first PARTITION only</td><td>A2 Q2</td><td>Deck 07</td></tr>
        <tr><td>Merge sort: show all steps</td><td>A2 Q3</td><td>Deck 08</td></tr>`)}
      ${tip(`No coding, no designing algorithms. Just <b>apply the method neatly</b>.`)}` },
    { t: "How he grades", h: `
      <div class="cols">
        <ol class="steps">
          <li><b>Show the working.</b> "O(n³)" alone gets almost nothing. Give c and n₀.</li>
          <li><b>Fill every box</b>: a, b, k, p, Case, Ans.</li>
          <li><b>One row per step</b> in heap / partition / merge tables, with i, j, L, R written in the margin.</li>
          <li><b>Rewrite the whole array</b> after every change.</li>
          <li>Partial credit moves in <b>0.25 steps</b>. Never leave a question blank: the setup row alone earns marks.</li>
        </ol>
        ${why(`<p>In A1 you got <b>4.25/5</b>. The lost marks were on the recursion tree for <b>T(n) = 2T(n−1) + 1</b> (height is n−1, and you must include the leaf level → 2ⁿ − 1).</p>`)}
      </div>` },
    { t: "What to prepare, in priority order", h: `
      ${tbl(`<tr><th>#</th><th>Topic</th><th>Why</th><th>Deck</th></tr>
        <tr><td>1</td><td><b>Master theorem</b>: all 14 examples on his slide</td><td>He copied 2 of them into A1</td><td>05</td></tr>
        <tr><td>2</td><td><b>O / Ω / Θ with c and n₀</b></td><td>Every assignment so far</td><td>03</td></tr>
        <tr><td>3</td><td><b>Recursion trees</b> (including 2T(n−1)+1)</td><td>Where you lost marks</td><td>04</td></tr>
        <tr><td>4</td><td><b>Heap, PARTITION, merge</b> tables</td><td>A2 (you missed it, practise now)</td><td>07–09</td></tr>
        <tr><td>5</td><td><b>Red-black trees</b>: insert + delete</td><td>Syllabus: "practice on RB tree operations"</td><td>12–13</td></tr>
        <tr><td>6</td><td><b>Amortized analysis</b> scenarios</td><td>Syllabus: "problem scenarios"</td><td>11</td></tr>
        <tr><td>7</td><td>Insertion, bucket, radix sort; definitions; tables</td><td>Short questions</td><td>01–02, 06, 10</td></tr>`)}` },
    { t: "3-day plan (Sat → Mon)", h: `
      <div class="cols">
        <div class="box"><h3>Day 1 · Sat 24</h3><ul class="dots"><li>Asymptotic notation (c, n₀)</li><li>Recursive code → recurrence</li><li>Recursion trees</li><li><b>Master theorem, all 14</b></li></ul></div>
        <div class="box"><h3>Day 2 · Sun 25</h3><ul class="dots"><li>Insertion sort trace</li><li>PARTITION trace</li><li>Merge sort grid</li><li>Build-Max-Heap + extract</li><li>Bucket + radix</li></ul></div>
        <div class="box"><h3>Day 3 · Mon 26</h3><ul class="dots"><li>RB insert cases</li><li>RB delete cases</li><li>Amortized (3 scenarios)</li><li>Definitions + tables</li><li><b>Do the mock quiz</b></li></ul></div>
      </div>
      ${tip(`Do every trace <b>by hand on paper</b>. The exam is on paper and speed matters.`)}` },
    { t: "Formulas to have in your head", h: `
      <div class="cols">
        <div class="stack">
          <span class="formula">O: f(n) ≤ c·g(n) for all n ≥ n₀</span>
          <span class="formula">Ω: f(n) ≥ c·g(n) for all n ≥ n₀</span>
          <span class="formula">T(n) = aT(n/b) + nᵏ logᵖ n</span>
          <span class="formula">1+2+…+n = n(n+1)/2</span>
          <span class="formula">1+2+4+…+2ᵏ = 2ᵏ⁺¹ − 1</span>
        </div>
        <div class="stack">
          <span class="formula">Heap (0-based): L=2i+1, R=2i+2</span>
          <span class="formula">Build loop: i = ⌊n/2⌋−1 down to 0</span>
          <span class="formula">PARTITION: x=A[r], i=p−1, test A[j] ≤ x</span>
          <span class="formula">Merge sort: q = ⌊(p+r)/2⌋</span>
          <span class="formula">Insertion worst: n(n−1)/2</span>
        </div>
      </div>` },
    { t: "Checklist: tick when you can do it on paper", h: `<div id="checklist"></div>` },
  ]
},
/* =========================================================== 1 */
{
  id: "basics", n: "01", week: "Week 1", title: "Algorithm basics + ADT",
  blurb: "5 properties, design techniques, worst case W(n), loop invariants, ADTs and specifications.",
  pdfs: [["01 Fundamentals", "01 - Fundamentals of Computer Algorithms"], ["02 ADT", "02 - ADT and its specification"]],
  slides: [
    { t: "What is an algorithm?", h: `
      <p class="big">"A detailed step-by-step method for solving a problem by using a computer."</p>
      ${simple(`<p>A recipe the computer can follow, that always finishes, and that gives the right answer.</p>`)}
      <h3>5 properties (remember F-U-D-I-F)</h3>
      <div class="cols">
        <ol class="steps"><li><b>F</b>initeness: it stops</li><li><b>U</b>nambiguous: every step has one meaning</li><li><b>D</b>efiniteness of sequence: the order of steps is clear</li><li><b>I</b>nput/Output defined</li><li><b>F</b>easibility: each step can actually be done</li></ol>
      </div>` },
    { t: "7 design techniques + the problem-solving template", h: `
      <div class="cols">
        <div class="box"><h3>Techniques</h3><ul class="dots"><li>Divide &amp; Conquer (merge sort, quicksort)</li><li>Greedy Method</li><li>Branch &amp; Bound</li><li>Backtracking</li><li>Dynamic Programming</li><li>Brute Force</li><li>Randomized</li></ul></div>
        <div class="box"><h3>Template</h3><p>Problem → Strategy → Algorithm (Input, Output, Steps) → <b>Analysis</b> (time &amp; space, optimality, correctness) → Implementation → Verification</p></div>
      </div>` },
    { t: "Worst-case complexity W(n)", h: `
      <span class="formula">W(n) = max { t(I) | I ∈ Dₙ }</span>
      ${simple(`<p>Look at <b>every</b> input of size n. Count the basic operations for each. W(n) is the <b>biggest</b> count. The <b>basic operation</b> is the step that matters most (e.g. comparing the key with an array entry).</p>`)}
      ${tbl(`<tr><th>Algorithm</th><th>W(n)</th><th>When</th></tr>
        <tr><td>Sequential search</td><td><b>n</b></td><td>key is last or not there</td></tr>
        <tr><td>Binary search (sorted array)</td><td><b>⌈lg(n+1)⌉</b></td><td>"optimal"</td></tr>
        <tr><td>findMax (hidden slide)</td><td><b>n − 1</b></td><td>every input</td></tr>`)}` },
    { t: "Correctness and the loop invariant", h: `
      ${simple(`<p>Correct = if the input follows the rules (<b>preconditions</b>), the output is right (<b>postconditions</b>) when it stops.</p>`)}
      <p>A <b>loop invariant</b> is a true statement about the loop. You prove 3 things:</p>
      <ol class="steps">
        <li><b>Initialization</b>: true before the first iteration.</li>
        <li><b>Maintenance</b>: if true before one iteration, still true before the next.</li>
        <li><b>Termination</b>: when the loop stops, the invariant gives you the answer.</li>
      </ol>
      <div class="cols">
        ${box("", `<b>get_max:</b> "max is the maximum value in a[0..i−1]"`)}
        ${box("", `<b>linear search:</b> "if x is in A, it is in A[i:n]". Finish with the contrapositive (if A then B ≡ if not B then not A).`)}
      </div>` },
    { t: "Space and optimality", h: `
      <div class="cols">
        <div class="box"><h3>Space = fixed + variable</h3><p><b>Fixed part</b>: does not depend on problem size (code, constants).<br><b>Variable part</b>: grows with the input.<br>"Generally we do time and space trade-off."</p></div>
        <div class="box"><h3>Optimal (hidden slide)</h3><p>No algorithm in the class does fewer operations in the worst case. Means <b>best possible</b>, not just "best known".</p><p>How to show: find W_A(n), prove a lower bound for every algorithm in the class, check they are equal.</p></div>
      </div>` },
    { t: "ADT vs data structure", h: `
      ${simple(`<p><b>ADT</b> = <b>what</b> it does (data + operations). <b>Data structure</b> = <b>how</b> it is built (arrays, pointers, linked nodes).</p><p>Example: "Stack" is an ADT. "Stack built with an array" is a data structure.</p>`)}
      <p><b>Specification of an operation</b> = 3 parts:</p>
      <ol class="steps"><li><b>Calling prototype</b>: name, parameters + types, return value + type</li><li><b>Preconditions</b>: assumed true when called</li><li><b>Postconditions</b>: true when it returns</li></ol>
      <p>Kinds of operations: <b>constructor</b> (creates object) · <b>access function</b> (returns info, no change) · <b>manipulation procedure</b> (changes, returns nothing).</p>` },
    { t: "The ADTs on his slides", h: `
      ${tbl(`<tr><th>ADT</th><th>Rule</th></tr>
        <tr><td>Stack</td><td>insert and delete at the <b>top</b>: <b>LIFO</b></td></tr>
        <tr><td>Queue</td><td>insert at rear, delete at front: <b>FIFO</b></td></tr>
        <tr><td>Priority queue</td><td>by priority, not arrival; only the most important element can be seen/removed</td></tr>
        <tr><td>Union-Find</td><td>Union merges two sets; Find returns the set's <b>leader</b></td></tr>
        <tr><td>Dictionary</td><td>identifier + info, no order</td></tr>
        <tr><td>List</td><td>cons (constructor), first / rest (access, pre: list ≠ nil), nil</td></tr>`)}
      ${why(`Binary tree: at most <b>2ᵈ</b> nodes at depth d; height h → at most <b>2ʰ⁺¹ − 1</b> nodes; n nodes → height ≥ <b>⌈lg(n+1)⌉ − 1</b>.`)}` },
    { t: "Math toolkit (deck 01)", h: `
      <div class="cols">
        <div class="box"><h3>Logs</h3><ul class="dots"><li>log_b x = L ⇔ bᴸ = x</li><li>log(xy) = log x + log y</li><li>log xᵃ = a·log x</li><li>x^(log y) = y^(log x)</li><li><b>change of base</b>: log_c x = log_b x / log_b c</li></ul></div>
        <div class="box"><h3>Series</h3><ul class="dots"><li>Σ i = n(n+1)/2</li><li>Σ i² = (2n³+3n²+n)/6</li><li>Σ_{i=0..k} 2ⁱ = 2ᵏ⁺¹ − 1</li><li>Σ i·2ⁱ = (k−1)2ᵏ⁺¹ + 2</li></ul></div>
      </div>
      <p>Floor ⌊x⌋ = largest integer ≤ x (⌊−2.7⌋ = −3). Ceiling ⌈x⌉ = smallest integer ≥ x (⌈2.1⌉ = 3). n-element set has 2ⁿ subsets.</p>` },
  ]
},
/* =========================================================== 2 */
{
  id: "asym", n: "03", week: "Week 2", title: "Asymptotic notation: O, Ω, Θ",
  blurb: "Find c and n₀ step by step, correct vs incorrect bounds, o and ω, step counting.",
  pdfs: [["03 Asymptotic notations", "03 - Asymptotic notations"]],
  slides: [
    { t: "The big idea", h: `
      <p class="big">For big n, only the fastest-growing term matters.</p>
      ${simple(`<p>8n³ + 6n + 8 → for n = 1000, 8n³ is 8,000,000,000 and 6n + 8 is 6008. The small terms don't matter. So we say it grows like <b>n³</b>.</p>`)}
      <p>Rule: keep the <b>highest-order term</b>, drop its coefficient. An exponential (2ⁿ) beats every polynomial.</p>` },
    { t: "The three definitions", h: `
      ${tbl(`<tr><th></th><th>Definition (there exist c, n₀ &gt; 0, for all n ≥ n₀)</th><th>Meaning</th></tr>
        <tr><td><b>O(g)</b></td><td>0 ≤ f(n) ≤ c·g(n)</td><td>upper bound: f is <b>at most</b> g</td></tr>
        <tr><td><b>Ω(g)</b></td><td>0 ≤ c·g(n) ≤ f(n)</td><td>lower bound: f is <b>at least</b> g</td></tr>
        <tr><td><b>Θ(g)</b></td><td>c₁·g(n) ≤ f(n) ≤ c₂·g(n)</td><td>tight: f is <b>exactly</b> g's order</td></tr>`)}
      ${simple(`<p>After some point n₀, f stays under (O) or over (Ω) a stretched copy c·g of g. Θ = both. <b>f = Θ(g) iff f = O(g) and f = Ω(g).</b></p>`)}
      <p>"Running time is O(f)" = about the <b>worst</b> case. "Running time is Ω(f)" = about the <b>best</b> case.</p>` },
    { t: "Recipe: find c and n₀", h: `
      <ol class="steps">
        <li>Pick g(n) = the leading term without its coefficient.</li>
        <li><b>For O</b>: take c a bit <b>bigger</b> than the leading coefficient. Find the first n where it works (small table). Say why it keeps working.</li>
        <li><b>For Ω</b>: take c = the leading coefficient, drop the positive small terms. Usually n₀ = 1.</li>
        <li>Write the answer: <b>O(g), c = __, n₀ = __</b>.</li>
      </ol>
      ${tip(`Any correct pair (c, n₀) is accepted. Lazy shortcut for O: c = sum of all coefficients, n₀ = 1.`)}` },
    { t: "Worked: f(n) = 8n³ + 6n + 8 (A1 Q1)", h: `
      <div class="cols">
        <div class="box"><h3>O-notation</h3>
          <p>Try c = 9: 8n³+6n+8 ≤ 9n³ ⇔ 6n+8 ≤ n³</p>
          ${tbl(`<tr><th>n</th><th>6n+8</th><th>n³</th><th></th></tr><tr><td>1</td><td>14</td><td>1</td><td class="no">✗</td></tr><tr><td>2</td><td>20</td><td>8</td><td class="no">✗</td></tr><tr><td>3</td><td>26</td><td>27</td><td class="ok">✓</td></tr>`)}
          <p>n³ grows faster, so true for all n ≥ 3.<br><b>O(n³), c = 9, n₀ = 3</b></p></div>
        <div class="box"><h3>Ω-notation</h3>
          <p>8n³ ≤ 8n³ + 6n + 8 for all n ≥ 1 (we only added positive stuff).</p>
          <p><b>Ω(n³), c = 8, n₀ = 1</b></p>
          <p>Both hold → <b>Θ(n³)</b>.</p></div>
      </div>` },
    { t: "Negative terms", h: `
      <div class="cols">
        ${box("", `<h3>For O: just drop it</h3><p>5n² − 2n ≤ 5n²<br>→ O(n²), c = 5, n₀ = 1</p>`)}
        ${box("", `<h3>For Ω: "pay" for it</h3><p>2n ≤ 2n² for n ≥ 1, so<br>5n² − 2n ≥ 5n² − 2n² = 3n²<br>→ Ω(n²), c = 3, n₀ = 1</p>`)}
      </div>
      ${trap(`For Ω you can <b>not</b> just drop a negative term. It makes f smaller.`)}
      ${why(`Class example: 10n² − 3n = Θ(n²) with c₁ = 9, c₂ = 11, n₀ = 3.`)}` },
    { t: "With 2ⁿ: f(n) = n² + 2ⁿ (A1 Q1)", h: `
      <p>g(n) = 2ⁿ (exponential wins). Try c = 2: n² + 2ⁿ ≤ 2·2ⁿ ⇔ <b>n² ≤ 2ⁿ</b></p>
      ${tbl(`<tr><th>n</th><td>1</td><td>2</td><td class="hl">3</td><td>4</td><td>5</td></tr><tr><th>n²</th><td>1</td><td>4</td><td class="hl">9</td><td>16</td><td>25</td></tr><tr><th>2ⁿ</th><td>2</td><td>4</td><td class="hl">8</td><td>16</td><td>32</td></tr><tr><th>ok?</th><td class="ok">✓</td><td class="ok">✓</td><td class="no">✗</td><td class="ok">✓</td><td class="ok">✓</td></tr>`)}
      <p><b>O(2ⁿ), c = 2, n₀ = 4</b> · <b>Ω(2ⁿ), c = 1, n₀ = 1</b></p>
      ${trap(`n₀ must work for <b>every</b> n after it. n = 1 works but n = 3 fails, so n₀ = 1 is <b>wrong</b>. Always check the values before your n₀.`)}` },
    { t: "o, ω and \"is this bound correct?\"", h: `
      ${simple(`<p>Think of f and g like two numbers a and b:</p>`)}
      ${tbl(`<tr><th>Θ</th><th>O</th><th>Ω</th><th>o (small oh)</th><th>ω (small omega)</th></tr><tr><td>a = b</td><td>a ≤ b</td><td>a ≥ b</td><td><b>a &lt; b</b> strictly</td><td><b>a &gt; b</b> strictly</td></tr>`)}
      <p><b>Example (A1 Q2 style):</b> f = 10n³ + 2n² + 3, g = n³ → same order (a = b).</p>
      <ul class="dots"><li>f = o(g)? <span class="no">INCORRECT</span>: o needs strictly lower order.</li><li>f = Ω(g)? <span class="ok">CORRECT</span>: 10n³+2n²+3 ≥ 10n³, c = 10, n₀ = 1.</li></ul>
      ${tip(`To prove a bound is wrong (e.g. 27n² + 16n + 25 ≠ O(n)): divide by g(n). You get 27n + … ≤ c, which fails once n &gt; c/27. Contradiction.`)}` },
    { t: "Counting steps (model of computation)", h: `
      <p>Model = processor + memory. Count steps so T(n) describes the <b>algorithm, not the machine</b>.</p>
      ${tbl(`<tr><th>Statement</th><th>Steps (slide)</th></tr><tr><td>simple statement</td><td>1</td></tr><tr><td>A = B + C*D − F</td><td>3</td></tr><tr><td>A[I] = B[I] + C[I]</td><td>4</td></tr><tr><td>C = A[I,J]</td><td>4 (1 mult + 2 add + 1 fetch)</td></tr>`)}
      ${simple(`Adding two arrays of size n ≈ 4n steps + loop control → <b>linear</b>, O(n).`)}` },
  ]
},
/* =========================================================== 3 */
{
  id: "recur", n: "04", week: "Week 2", title: "Recursive code + recursion trees",
  blurb: "Turn demo(n) code into a recurrence, back substitution, recursion trees and the answers to memorize.",
  pdfs: [["04 Recursive running times", "04 - Analyzing Running Times of recursive Programs"]],
  slides: [
    { t: "Code → recurrence", h: `
      <span class="formula">T(n) = (number of calls) × T(smaller size) + (work in this call)</span>
      ${tbl(`<tr><th>demo(n) does…</th><th>Recurrence</th><th>Answer</th></tr>
        <tr><td>loop i++ to n; demo(n−1)</td><td>T(n−1) + n</td><td>O(n²)</td></tr>
        <tr><td>loop i=i*2 to n; demo(n−1)</td><td>T(n−1) + log n</td><td>O(n log n)</td></tr>
        <tr><td>print; demo(n−1) twice</td><td>2T(n−1) + 1</td><td>O(2ⁿ)</td></tr>
        <tr><td>print; demo(n/2)</td><td>T(n/2) + 1</td><td>O(log n)</td></tr>
        <tr><td>loop to n; demo(n/2)</td><td>T(n/2) + n</td><td>O(n)</td></tr>
        <tr><td>loop to n; demo(n/2) twice</td><td>2T(n/2) + n</td><td>O(n log n)</td></tr>`)}
      ${trap(`In slides S7–S8 only <code>print</code> is inside the for loop. The recursive calls run once, <b>after</b> the loop.`)}` },
    { t: "Loops: n vs log n", h: `
      <div class="cols">
        ${box("", `<pre>for(i=1; i&lt;=n; i++)</pre><p>runs <b>n</b> times</p>`)}
        ${box("", `<pre>for(i=1; i&lt;=n; i=i*2)</pre><p>runs <b>⌊log₂ n⌋ + 1 ≈ log n</b> times (1, 2, 4, 8, … doubles to n)</p>`)}
      </div>
      ${simple(`Doubling (or halving) means log n. Adding 1 each time means n.`)}` },
    { t: "Back substitution", h: `
      <p>Example: T(n) = 2T(n/2) + c, T(1) = c</p>
<pre>T(n) = c + 2T(n/2)
     = c + 2c + 4T(n/4)
     = c + 2c + 4c + 8T(n/8)
     = c(1 + 2 + … + 2^(k−1)) + 2^k·T(n/2^k)
stop when 2^k = n:
     = c(n − 1) + n·c = c(2n − 1)   →  <b>O(n)</b></pre>
      ${simple(`Keep expanding until you see the pattern, then jump to the end where the size hits 1.`)}` },
    { t: "Recursion tree: recipe", h: `
      <ol class="steps">
        <li>Root = the work done outside the recursive calls, f(n).</li>
        <li>Each call is a child with the smaller size.</li>
        <li><b>Level cost</b> = (nodes on the level) × (work per node). Write level 0, 1, 2, …, i, and the leaves.</li>
        <li><b>Height</b>: n/bⁱ = 1 → log_b n levels. For n−1: about <b>n</b> levels.</li>
        <li><b>Add all levels, INCLUDING the leaves</b>. Use the series formulas.</li>
      </ol>
      ${tbl(`<tr><th>Level costs</th><th>Example</th><th>Most work at</th><th>Answer</th></tr>
        <tr><td>shrink</td><td>2T(n/2) + cn²</td><td>root</td><td>n²</td></tr>
        <tr><td>all equal</td><td>2T(n/2) + cn</td><td>every level</td><td>n log n</td></tr>
        <tr><td>grow</td><td>2T(n/2) + c</td><td>leaves</td><td>n</td></tr>`)}` },
    { t: "A1 Q4(i): T(n) = 2T(n/2) + n", h: `
<pre>level 0:   n                         total n
level 1:   n/2   n/2                 total n
level 2:   n/4 ×4                    total n
  …
level i:   2^i nodes × n/2^i         total n
leaves:    n nodes × T(1)=1          total n</pre>
      <p>log n levels of cost n + leaf level n → <b>T(n) = n log n + n = Θ(n log n)</b></p>
      ${why(`Check: T(8) = 8 + 8 + 8 + 8 = 32. Cross-check with Master: a=2, b=2, k=1 → Case 2(a) → Θ(n log n).`)}` },
    { t: "A1 Q4(ii): T(n) = 2T(n−1) + 1   ← you lost marks here", h: `
<pre>level 0:   1 node                    total 1
level 1:   2 nodes                   total 2
level 2:   4 nodes                   total 4
  …
level i:   2^i nodes                 total 2^i
last (n−1): 2^(n−1) leaves           total 2^(n−1)</pre>
      <p>T(n) = 1 + 2 + 4 + … + 2ⁿ⁻¹ = <b>2ⁿ − 1 = Θ(2ⁿ)</b></p>
      ${trap(`Height is <b>n − 1</b> (n levels), not log n, because the size goes down by 1, not by half. And <b>don't forget the leaf level</b>.`)}
      ${why(`Check: T(4) = 1 + 2 + 4 + 8 = 15 = 2⁴ − 1.`)}` },
    { t: "Answers to memorize", h: `
      ${tbl(`<tr><th>Decreasing</th><th>Answer</th><th>Dividing</th><th>Answer</th></tr>
        <tr><td>T(n−1) + 1</td><td>O(n)</td><td>T(n/2) + 1</td><td>O(log n)</td></tr>
        <tr><td>T(n−1) + n</td><td>O(n²)</td><td>T(n/2) + n</td><td>O(n)</td></tr>
        <tr><td>T(n−1) + n²</td><td>O(n³)</td><td>2T(n/2) + n</td><td>O(n log n)</td></tr>
        <tr><td>T(n−1) + log n</td><td>O(n log n)</td><td>2T(n/2) + c</td><td>O(n)</td></tr>
        <tr><td>2T(n−1) + 1</td><td>O(2ⁿ)</td><td>2T(n/2) + n²</td><td>n²</td></tr>
        <tr><td>3T(n−1) + 1</td><td>O(3ⁿ)</td><td></td><td></td></tr>
        <tr><td>2T(n−1) + n</td><td>O(n·2ⁿ)</td><td></td><td></td></tr>`)}
      ${tip(`Decreasing rule: <b>a = 1 → n·f(n)</b>. <b>a &gt; 1 → f(n)·a^(n/b)</b>.`)}` },
  ]
},
/* =========================================================== 4 */
{
  id: "master", n: "05", week: "Week 2", title: "Master theorem (all 14 examples)",
  blurb: "The [a, b, k, p] box, the cases, the decreasing form and every example from his slide with answers.",
  pdfs: [["05 Master theorem", "05 - Master's_Theorem"]],
  slides: [
    { t: "The form", h: `
      <span class="formula">T(n) = a·T(n/b) + Θ(nᵏ · logᵖ n)</span>
      ${simple(`<p><b>a</b> = how many recursive calls · <b>b</b> = how much the size shrinks · <b>k</b> = power of n in the extra work · <b>p</b> = power of log in the extra work.</p>`)}
      <p>Conditions: <b>a ≥ 1, b &gt; 1, k ≥ 0</b>, a and b constants, and the extra work must be <b>positive</b>. If not → write <b>"Not applicable"</b>.</p>` },
    { t: "Reading k and p", h: `
      ${tbl(`<tr><th>f(n)</th><td>1</td><td>log n</td><td>n</td><td>n log n</td><td>n / log n</td><td>n / log² n</td><td>n²</td><td>n² log n</td><td>√n</td></tr>
        <tr><th>k</th><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>2</td><td>2</td><td>½</td></tr>
        <tr><th>p</th><td>0</td><td>1</td><td>0</td><td>1</td><td class="hl">−1</td><td class="hl">−2</td><td>0</td><td>1</td><td>0</td></tr>`)}
      ${trap(`Dividing by log makes p <b>negative</b>: 1/log n = log⁻¹ n. And n log n has p = <b>1</b>, not 0.`)}` },
    { t: "The cases: compare a with bᵏ", h: `
      ${tbl(`<tr><th>Case</th><th>Condition</th><th>Answer</th></tr>
        <tr><td><b>1</b></td><td>a &gt; bᵏ</td><td>Θ(n^(log_b a))  (ignore p)</td></tr>
        <tr><td><b>2(a)</b></td><td>a = bᵏ, p &gt; −1</td><td>Θ(nᵏ · log^(p+1) n)</td></tr>
        <tr><td><b>2(b)</b></td><td>a = bᵏ, p = −1</td><td>Θ(nᵏ · log log n)</td></tr>
        <tr><td><b>2(c)</b></td><td>a = bᵏ, p &lt; −1</td><td>Θ(nᵏ)</td></tr>
        <tr><td><b>3(a)</b></td><td>a &lt; bᵏ, p ≥ 0</td><td>Θ(nᵏ · logᵖ n)</td></tr>
        <tr><td><b>3(b)</b></td><td>a &lt; bᵏ, p &lt; 0</td><td>Θ(nᵏ)</td></tr>`)}
      ${simple(`<p>a &gt; bᵏ: the calls win (leaves). a = bᵏ: tie, add one log. a &lt; bᵏ: the extra work wins (root).</p>`)}` },
    { t: "Fill the box like this (A1 Q3)", h: `
<pre>T(n) = 4T(n/2) + n²     [a = 4, b = 2, k = 2, p = 0]
bᵏ = 2² = 4 = a,  p = 0 > −1   →  Case = 2(a)
Ans = Θ(n² · log¹ n) = <b>Θ(n² log n)</b>

T(n) = 2T(n/2) + n log n [a = 2, b = 2, k = 1, p = 1]
bᵏ = 2 = a,  p = 1 > −1        →  Case = 2(a)
Ans = Θ(n · log² n) = <b>Θ(n log² n)</b></pre>
      ${tip(`Write the case <b>with its condition</b> ("2(a): a = bᵏ, p &gt; −1"). These two are examples #1 and #5 from his slide.`)}
      <p>log values: log₂4 = 2, log₄8 = 1.5, log₃9 = 2, log₄14 ≈ 1.904 (change of base).</p>` },
    { t: "Examples 1–7 (try first, then reveal)", h: `
      ${tbl(`<tr><th>#</th><th>Recurrence</th><th>[a,b,k,p]</th></tr>
        <tr><td>1</td><td>4T(n/2) + n²</td><td>[4,2,2,0]</td></tr>
        <tr><td>2</td><td>T(n/2) + n²</td><td>[1,2,2,0]</td></tr>
        <tr><td>3</td><td>2ⁿT(n/2) + nⁿ</td><td>—</td></tr>
        <tr><td>4</td><td>14T(n/4) + n</td><td>[14,4,1,0]</td></tr>
        <tr><td>5</td><td>2T(n/2) + n log n</td><td>[2,2,1,1]</td></tr>
        <tr><td>6</td><td>2T(n/2) + n/log n</td><td>[2,2,1,−1]</td></tr>
        <tr><td>7</td><td>2T(n/4) + n^0.51</td><td>[2,4,0.51,0]</td></tr>`)}
      ${ans("Show answers 1–7", tbl(`<tr><th>#</th><th>Case</th><th>Ans</th></tr>
        <tr><td>1</td><td>2(a)</td><td>Θ(n² log n)</td></tr>
        <tr><td>2</td><td>3(a): 1 &lt; 4</td><td>Θ(n²)</td></tr>
        <tr><td>3</td><td>—</td><td>Not applicable (a = 2ⁿ is not a constant)</td></tr>
        <tr><td>4</td><td>1: 14 &gt; 4</td><td>Θ(n^log₄14) ≈ Θ(n^1.904)</td></tr>
        <tr><td>5</td><td>2(a)</td><td>Θ(n log² n)</td></tr>
        <tr><td>6</td><td>2(b): p = −1</td><td>Θ(n log log n)</td></tr>
        <tr><td>7</td><td>3(a): 2 &lt; 4^0.51 ≈ 2.028</td><td>Θ(n^0.51)</td></tr>`))}` },
    { t: "Examples 8–14 (try first, then reveal)", h: `
      ${tbl(`<tr><th>#</th><th>Recurrence</th><th>[a,b,k,p]</th></tr>
        <tr><td>8</td><td>0.5T(n/2) + 1/n</td><td>[0.5,2,−1,0]</td></tr>
        <tr><td>9</td><td>6T(n/3) + n² log n</td><td>[6,3,2,1]</td></tr>
        <tr><td>10</td><td>64T(n/8) − n² log n</td><td>[64,8,2,1]</td></tr>
        <tr><td>11</td><td>7T(n/3) + n²</td><td>[7,3,2,0]</td></tr>
        <tr><td>12</td><td>4T(n/2) + log n</td><td>[4,2,0,1]</td></tr>
        <tr><td>13</td><td>√2·T(n/2) + n² log n</td><td>[√2,2,2,1]</td></tr>
        <tr><td>14</td><td>2T(n/2) + √n</td><td>[2,2,½,0]</td></tr>`)}
      ${ans("Show answers 8–14", tbl(`<tr><th>#</th><th>Case</th><th>Ans</th></tr>
        <tr><td>8</td><td>—</td><td><b>Not applicable</b>: a = 0.5 &lt; 1 and k = −1 &lt; 0</td></tr>
        <tr><td>9</td><td>3(a): 6 &lt; 9</td><td>Θ(n² log n)</td></tr>
        <tr><td>10</td><td>—</td><td><b>Not applicable</b>: extra work is negative</td></tr>
        <tr><td>11</td><td>3(a): 7 &lt; 9</td><td>Θ(n²)</td></tr>
        <tr><td>12</td><td>1: 4 &gt; 2⁰ = 1</td><td>Θ(n²)</td></tr>
        <tr><td>13</td><td>3(a): 1.414 &lt; 4</td><td>Θ(n² log n)</td></tr>
        <tr><td>14</td><td>1: 2 &gt; √2</td><td>Θ(n)</td></tr>`))}
      ${trap(`#8 and #10 are <b>not</b> marked "Not applicable" on his slide, but they are. #10 looks like 2(a) because 64 = 8², but the minus sign kills it.`)}` },
    { t: "Decreasing form: T(n) = aT(n − b) + f(n)", h: `
      <p>Conditions: a ≥ 1, <b>b ≥ 1</b>, f(n) = O(nᵏ)</p>
      ${tbl(`<tr><th>Case</th><th>Condition</th><th>Answer</th></tr>
        <tr><td>1</td><td>a = 1</td><td>O(n · f(n)) = O(nᵏ⁺¹)</td></tr>
        <tr><td>2</td><td>a &gt; 1</td><td>O(f(n) · a^(n/b))</td></tr>`)}
      <ul class="dots"><li>T(n−1) + n → a = 1 → O(n²)</li><li>T(n−1) + log n → O(n log n)</li><li>2T(n−1) + 1 → a = 2 → O(2ⁿ)</li><li>2T(n−1) + log n → O(log n · 2ⁿ)</li></ul>` },
    { t: "Master theorem traps", h: `
      <div class="stack">
        ${trap(`<b>Case 1 ignores p.</b> 8T(n/4) + n log n: 8 &gt; 4 → Θ(n^1.5), no log added.`)}
        ${trap(`<b>2(a) answer uses p + 1.</b> 9T(n/3) + n² log² n → Θ(n² log³ n).`)}
        ${trap(`<b>3(a) keeps the log.</b> 3T(n/4) + n log n → Θ(n log n).`)}
        ${trap(`<b>Near ties:</b> compute bᵏ. 4^0.51 ≈ 2.028 &gt; 2 → Case 3, not Case 2.`)}
        ${why(`Case 3(b) on his slide gives Θ(nᵏ) but that is really only an upper bound. Write the class answer anyway.`)}
      </div>` },
  ]
},
/* =========================================================== 5 */
{
  id: "quick", n: "06–07", week: "Week 3", title: "Insertion sort + Quicksort",
  blurb: "Insertion sort passes and counts, the PARTITION trace in his table format, best/worst cases.",
  pdfs: [["06 Insertion sort", "06 - Insertion Sort-IUT"], ["07 Quicksort", "07 - quicksort"]],
  slides: [
    { t: "Insertion sort: the idea", h: `
      ${simple(`<p>Like sorting cards in your hand. Take the next card (the <b>key</b>), slide the bigger cards one place right, drop the key in the gap.</p>`)}
<pre><span class="k">for</span> j = 2 <span class="k">to</span> A.length
    key = A[j]
    i = j − 1
    <span class="k">while</span> (i > 0 and A[i] > key)
        A[i+1] = A[i]      <span class="c">// shift right</span>
        i = i − 1
    A[i+1] = key           <span class="c">// insert</span></pre>` },
    { t: "Trace: 7, −5, 2, 16, 4 (his slide)", h: `
      ${tbl(`<tr><th>j</th><th>key</th><th>What happens</th><th>Array after</th></tr>
        <tr><td>2</td><td>−5</td><td>7 &gt; −5 shift; left end</td><td>−5 7 2 16 4</td></tr>
        <tr><td>3</td><td>2</td><td>7 &gt; 2 shift; −5 ≤ 2 stop</td><td>−5 2 7 16 4</td></tr>
        <tr><td>4</td><td>16</td><td>7 ≤ 16 stop</td><td>−5 2 7 16 4</td></tr>
        <tr><td>5</td><td>4</td><td>16 &gt; 4 shift; 7 &gt; 4 shift; 2 ≤ 4 stop</td><td class="hl">−5 2 4 7 16</td></tr>`)}
      <p><b>7 comparisons, 4 shifts.</b> (Stopping at the left end makes no comparison.)</p>` },
    { t: "Insertion sort: facts", h: `
      <div class="cols">
        ${box("", `<h3>Best: Ω(n)</h3><p>already sorted: n−1 comparisons, 0 shifts</p>`)}
        ${box("", `<h3>Worst: O(n²)</h3><p>reversed: 1+2+…+(n−1) = <b>n(n−1)/2</b></p>`)}
      </div>
      <p>Labels: comparison-based, internal, <b>stable</b>, adaptive, in-place.</p>
      <p>Binary search cuts comparisons, doubly linked list cuts movements, but both are still O(n²).</p>` },
    { t: "Quicksort: the idea", h: `
      ${simple(`<p>Pick a <b>pivot</b> (his rule: the <b>last</b> element). Move everything ≤ pivot to the left, everything bigger to the right. Put the pivot between them. Now the pivot is in its final place. Repeat on both sides.</p>`)}
<pre>QUICKSORT(A, p, r)              PARTITION(A, p, r)
  <span class="k">if</span> p &lt; r                        x = A[r]          <span class="c">// pivot = last</span>
    q = PARTITION(A, p, r)          i = p − 1
    QUICKSORT(A, p, q−1)            <span class="k">for</span> j = p <span class="k">to</span> r−1
    QUICKSORT(A, q+1, r)              <span class="k">if</span> A[j] &lt;= x
                                        i = i + 1
                                        exchange A[i] ↔ A[j]
                                    exchange A[i+1] ↔ A[r]
                                    <span class="k">return</span> i+1</pre>` },
    { t: "PARTITION trace (your A2 sheet): 18 7 12 15 22 10", h: `
      ${tbl(`<tr><th>Row</th><th>Margin</th><th class="c">1</th><th class="c">2</th><th class="c">3</th><th class="c">4</th><th class="c">5</th><th class="c">6</th><th>Action</th></tr>
        <tr><td>start</td><td>p=1, r=6, x=10, i=0</td><td class="c">18</td><td class="c">7</td><td class="c">12</td><td class="c">15</td><td class="c">22</td><td class="c">10</td><td></td></tr>
        <tr><td>j=1</td><td>18 ≤ 10? no</td><td colspan="6"></td><td>i = 0</td></tr>
        <tr><td>j=2</td><td>7 ≤ 10? <b>yes</b></td><td class="c sw">7</td><td class="c sw">18</td><td class="c">12</td><td class="c">15</td><td class="c">22</td><td class="c">10</td><td>i=1, A[1]↔A[2]</td></tr>
        <tr><td>j=3,4,5</td><td>12, 15, 22 &gt; 10</td><td colspan="6"></td><td>i = 1</td></tr>
        <tr><td>end</td><td>A[i+1]=A[2] ↔ A[6]</td><td class="c">7</td><td class="c sw">10</td><td class="c">12</td><td class="c">15</td><td class="c">22</td><td class="c sw">18</td><td><b>q = 2</b></td></tr>`)}
      ${simple(`Left of 10: {7} all ≤ 10. Right: {12, 15, 22, 18} all &gt; 10. Pivot 10 is in its final place.`)}` },
    { t: "PARTITION traps (his own sample got these wrong)", h: `
      <div class="stack">
        ${trap(`On a sheet numbered 1…n, <b>i starts at p − 1 = 0</b> and j starts at 1. (On a 0…n−1 sheet: i = −1, j = 0.)`)}
        ${trap(`The test is <b>A[j] ≤ x</b>, not &lt;. It matters when a number equals the pivot.`)}
        ${trap(`The final swap is <b>A[i+1] ↔ A[r]</b>, not A[i]. Return q = i + 1.`)}
        ${tip(`If the question says "first PARTITION only", stop after one partition. Write margin values (p, r, x, i, j) for marks.`)}
      </div>` },
    { t: "Quicksort performance", h: `
      ${tbl(`<tr><th>Situation</th><th>Recurrence</th><th>Result</th></tr>
        <tr><td><b>Worst</b>: split n−1 : 0 (already <b>sorted</b> input)</td><td>T(n−1) + Θ(n)</td><td><b>Θ(n²)</b></td></tr>
        <tr><td><b>Best</b>: split in halves</td><td>2T(n/2) + Θ(n)</td><td><b>Θ(n log n)</b></td></tr>
        <tr><td>fixed ratio split (e.g. n/4 : 3n/4)</td><td>T(n/4) + T(3n/4) + O(n)</td><td>Θ(n log n)</td></tr>
        <tr><td>median as pivot (found in O(n))</td><td>2T(n/2) + O(n)</td><td>O(n log n)</td></tr>
        <tr><td>space</td><td></td><td>O(log n) balanced, O(n) unbalanced</td></tr>`)}
      ${why(`Sorted 1…n and reversed n…1 take the <b>same</b> time (T1 = T2), both worst case. Sorted input is <b>worst</b> for quicksort but <b>best</b> for insertion sort.`)}
      <p>Variants: <b>randomized</b> (swap a random element into A[r] first), <b>median-of-3</b>.</p>` },
  ]
},
/* =========================================================== 6 */
{
  id: "merge", n: "08", week: "Week 4", title: "Merge sort",
  blurb: "Split at q = ⌊(p+r)/2⌋, merge step by step, the grid format, cost and space.",
  pdfs: [["08 Merge sort", "08 - merge sort"]],
  slides: [
    { t: "Merge sort: the idea", h: `
      ${simple(`<p><b>Cut</b> the array in half again and again until every piece has 1 element. Then <b>merge</b> pieces back together in sorted order.</p>`)}
<pre>MERGESORT(A, p, r)
  <span class="k">if</span> p &lt; r
    q = ⌊(p + r) / 2⌋
    MERGESORT(A, p, q)
    MERGESORT(A, q+1, r)
    MERGE(A, p, q, r)</pre>
      ${trap(`Odd size: the <b>left</b> half gets the extra element. p = 1, r = 7 → q = 4 → 4 + 3.`)}` },
    { t: "MERGE: how two sorted lists join", h: `
      <ol class="steps"><li>Look at the front of both lists.</li><li>Take the <b>smaller</b> one. Tie → take from the <b>left</b> (test is L[i] ≤ R[j]), which keeps it <b>stable</b>.</li><li>When one list is empty, copy the rest of the other.</li></ol>
      <p>Example: L = [12, 17, 19], R = [5, 10, 20]</p>
      ${tbl(`<tr><th>compare</th><td>12 vs 5</td><td>12 vs 10</td><td>12 vs 20</td><td>17 vs 20</td><td>19 vs 20</td><td>R left</td></tr><tr><th>take</th><td>5</td><td>10</td><td>12</td><td>17</td><td>19</td><td>20</td></tr>`)}
      <p>Merging n₁ + n₂ items needs at most <b>n₁ + n₂ − 1</b> comparisons (here 5).</p>` },
    { t: "Full trace (your A2 sheet): 19 17 12 5 20 10", h: `
<pre>index:      1    2    3   |   4    5    6
start:     19   17   12   |   5   20   10        p=1, r=6, q=3
divide:   [19   17] [12]  |  [5   20] [10]       q=2 · q=5
divide:   [19] [17]       |  [5] [20]            q=1 · q=4
merge:    [17   19]       |  [5   20]
merge:    [12   17   19]  |  [5   10   20]
merge:    [ 5   10   12       17   19   20]      final merge</pre>
      ${tip(`Write q in the margin at every split. One row per level going down, one row per merge going up. Box/shade the final row.`)}` },
    { t: "Cost and space", h: `
      <span class="formula">T(n) = 2T(n/2) + O(n) → Θ(n log n)</span>
      <p>Master: a = 2, b = 2, k = 1, p = 0 → Case 2(a).</p>
      <div class="cols">
        ${box("", `<h3>Always n log n</h3><p>"No worst scenario, works the same for ascending or descending order" → <b>non-adaptive</b>.</p>`)}
        ${box("", `<h3>Space O(n)</h3><p>stack O(log n) + merge array O(n) → <b>out-place</b>. The only out-place comparison sort. Stable, external.</p>`)}
      </div>` },
    { t: "Cost recipe: merge cost per level × number of levels", h: `
      ${tbl(`<tr><th>Situation</th><th>Merge cost per level</th><th>Levels</th><th>Total</th></tr>
        <tr><td>n elements</td><td>O(n)</td><td>log n</td><td><b>O(n log n)</b></td></tr>
        <tr><td>log n sorted lists of size n/log n</td><td>O(n)</td><td>log log n</td><td><b>O(n log log n)</b></td></tr>
        <tr><td>n strings of length n</td><td>O(n²)</td><td>log n</td><td><b>O(n² log n)</b></td></tr>
        <tr><td>stop at pieces of size k</td><td>O(n)</td><td>log(n/k)</td><td><b>O(n log(n/k))</b></td></tr>`)}` },
  ]
},
/* =========================================================== 7 */
{
  id: "heap", n: "09", week: "Week 4", title: "Heap sort",
  blurb: "Heap rules, 0-based index formulas, MAX-HEAPIFY, Build-Max-Heap table, extract-max, heapsort.",
  pdfs: [["09 Heap sort", "09 - Heap sort"]],
  slides: [
    { t: "What is a heap?", h: `
      <div class="cols">
        <div class="stack">
          <p><b>Full</b> tree: every node has 0 or 2 children.<br><b>Complete</b> tree: all levels full except the last, filled left to right.<br><b>Perfect</b>: full and complete.</p>
          ${simple(`<p>A <b>max-heap</b> is a complete binary tree where <b>every parent ≥ its children</b>. So the biggest number is always at the top (index 0).</p>`)}
        </div>
        ${box("", `<p>Stored in an array, level by level:</p><pre>        30
      /    \\
    19      11
   /  \\    /
  12  15  7

[30, 19, 11, 12, 15, 7]</pre>`)}
      </div>` },
    { t: "Index formulas (his tables are 0-based!)", h: `
      ${tbl(`<tr><th></th><th>0-based (tables, A2)</th><th>1-based (pseudocode)</th></tr>
        <tr><td>Left child</td><td><b>2i + 1</b></td><td>2i</td></tr>
        <tr><td>Right child</td><td><b>2i + 2</b></td><td>2i + 1</td></tr>
        <tr><td>Parent</td><td><b>⌈i/2⌉ − 1</b></td><td>⌊i/2⌋</td></tr>
        <tr><td>Leaves</td><td><b>⌊n/2⌋ … n−1</b></td><td>⌊n/2⌋+1 … n</td></tr>
        <tr><td>Build loop</td><td><b>i = ⌊n/2⌋−1 down to 0</b></td><td>⌊n/2⌋ down to 1</td></tr>`)}
      ${tip(`If a child index ≥ heap size, mark it <b>(X)</b> in the margin ("R = 6 (X)").`)}` },
    { t: "MAX-HEAPIFY: sink a small number down", h: `
<pre>MAX-HEAPIFY(A, i)
  l = 2i+1 ;  r = 2i+2                     <span class="c">// 0-based</span>
  largest = i
  <span class="k">if</span> l &lt; size and A[l] > A[largest]: largest = l
  <span class="k">if</span> r &lt; size and A[r] > A[largest]: largest = r
  <span class="k">if</span> largest ≠ i
      exchange A[i] ↔ A[largest]
      MAX-HEAPIFY(A, largest)              <span class="c">// continue where it moved</span></pre>
      ${simple(`Compare the node with its children. If a child is bigger, swap with the <b>biggest</b> child, then keep going from the place the number moved to. Stop when it's bigger than both kids or has no kids. Cost O(log n).`)}` },
    { t: "Build-Max-Heap (your A2 sheet): 11 19 7 12 15 30", h: `
      <p>n = 6 → loop i = ⌊6/2⌋ − 1 = <b>2 down to 0</b>.</p>
      ${tbl(`<tr><th>Row</th><th>Margin</th><th class="c">0</th><th class="c">1</th><th class="c">2</th><th class="c">3</th><th class="c">4</th><th class="c">5</th><th>Note</th></tr>
        <tr><td>start</td><td>For i → 2 to 0</td><td class="c">11</td><td class="c">19</td><td class="c">7</td><td class="c">12</td><td class="c">15</td><td class="c">30</td><td></td></tr>
        <tr><td>i=2</td><td>L=5, R=6(X)</td><td class="c">11</td><td class="c">19</td><td class="c sw">30</td><td class="c">12</td><td class="c">15</td><td class="c sw">7</td><td>7 &lt; 30 swap; heapify(5): L=11(X) exit</td></tr>
        <tr><td>i=1</td><td>L=3, R=4</td><td class="c">11</td><td class="c">19</td><td class="c">30</td><td class="c">12</td><td class="c">15</td><td class="c">7</td><td>19 ≥ 12, 15 → exit</td></tr>
        <tr><td>i=0</td><td>L=1, R=2</td><td class="c sw">30</td><td class="c">19</td><td class="c sw">11</td><td class="c">12</td><td class="c">15</td><td class="c">7</td><td>swap with R; heapify(2): L=5, 11 ≥ 7 exit</td></tr>
        <tr><td><b>heap</b></td><td></td><td class="c hl">30</td><td class="c hl">19</td><td class="c hl">11</td><td class="c hl">12</td><td class="c hl">15</td><td class="c hl">7</td><td></td></tr>`)}
      ${trap(`After a swap, the recursive call goes to the <b>child's index</b> (where the number moved), still in the same loop iteration.`)}` },
    { t: "Extract-max", h: `
      <ol class="steps"><li>max = A[0]</li><li>Move the <b>last</b> element to A[0]</li><li>heap size − 1</li><li>MAX-HEAPIFY(A, 0)</li><li>return max</li></ol>
      <p>Example: [7, 3, 6, 1, 2, 5, 4] → returns <b>7</b>. Put 4 on top: [4, 3, 6, 1, 2, 5] → 4 &lt; 6 swap → [6, 3, 4, 1, 2, 5] → 4 &lt; 5 swap → <b>[6, 3, 5, 1, 2, 4]</b>.</p>
      ${tip(`Cost O(log n). Underflow error if the heap is empty.`)}` },
    { t: "Heap sort", h: `
<pre>HEAPSORT(A)
  BUILD-MAX-HEAP(A)
  <span class="k">for</span> i = n−1 <span class="k">down to</span> 1
      exchange A[0] ↔ A[i]       <span class="c">// park the max at the end</span>
      heap size = heap size − 1
      MAX-HEAPIFY(A, 0)</pre>
      ${simple(`Biggest goes to the back each time, so a <b>max-heap gives ascending order</b>.`)}
      <p>His example: 12 7 8 23 3 21 → heap [23, 12, 21, 7, 3, 8] → <b>3 7 8 12 21 23</b>.</p>` },
    { t: "Heap costs and traps", h: `
      ${tbl(`<tr><th>Operation</th><th>Cost</th></tr><tr><td>MAX-HEAPIFY</td><td>O(log n)</td></tr><tr><td>EXTRACT-MAX</td><td>O(log n)</td></tr><tr><td>BUILD-MAX-HEAP</td><td><b>O(n)</b> (not n log n!)</td></tr><tr><td>HEAPSORT</td><td>O(n log n), extra space O(1), <b>unstable</b></td></tr>`)}
      ${trap(`One MAX-HEAPIFY(A, 0) on a random array does <b>not</b> make a heap. [6, 2, 7, 1, 3, 5, 4] stays broken (7 under 6). That's why BUILD goes bottom-up.`)}` },
  ]
},
/* =========================================================== 8 */
{
  id: "bucket", n: "10", week: "Week 5", title: "Bucket sort + Radix sort",
  blurb: "Sorting without comparisons, radix passes with stability, words, and the big comparison tables.",
  pdfs: [["10 Bucket & radix", "10 - bucket n radix sort"]],
  slides: [
    { t: "Bucket sort: the idea", h: `
      ${simple(`<p>Values are 0 … m−1. Make one bucket per value. Drop each number in its bucket (just count). Read the buckets in order. <b>No comparisons at all.</b></p>`)}
      <p>His example: 4 2 1 2 0 3 2 1 4 0 2 3 0, m = 5</p>
      ${tbl(`<tr><th>bucket</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>count</th><td>3</td><td>2</td><td>4</td><td>2</td><td>2</td></tr>`)}
      <p>Output: <b>0 0 0 1 1 2 2 2 2 3 3 4 4</b></p>` },
    { t: "Bucket sort: cost", h: `
      <span class="formula">O(m) + O(n) + O(n) = O(n + m)</span>
      <div class="cols">
        ${box("", `<p>m small → basically <b>O(n)</b>.</p>`)}
        ${box("", `<p>m &gt;&gt;&gt; n (e.g. max 999999 → 1 million buckets) → <b>O(m)</b>. Too slow. That's why radix sort exists.</p>`)}
      </div>
      <p>Sorting plain values → bucket = <b>counter</b>. Sorting records by key → bucket = <b>queue</b> (keeps arrival order = stable).</p>
      <p>Floats 0.0–0.9: bucket = first digit after the point; keep each bucket sorted.</p>` },
    { t: "Radix sort: steps", h: `
      <ol class="steps">
        <li><b>p</b> = number of digits of the <b>biggest</b> number = number of passes.</li>
        <li>10 buckets (0–9).</li>
        <li>Pass 1 = <b>rightmost</b> digit (ones), then tens, then hundreds. Short numbers get leading zeros (2 = 002).</li>
        <li>Each pass: drop numbers into buckets <b>in list order</b>, then collect buckets 0 → 9 in the order placed (<b>stable</b>).</li>
      </ol>
      ${why(`Max 999999 → 10 buckets and 6 passes. Cost O(p·n) = O(n) for fixed p.`)}` },
    { t: "Radix example: 170 45 75 90 802 24 2 66", h: `
      ${tbl(`<tr><th>Pass</th><th>Buckets (in order placed)</th><th>List after</th></tr>
        <tr><td>1 ones</td><td>0: 170, 90 · 2: 802, 2 · 4: 24 · 5: 45, 75 · 6: 66</td><td>170 90 802 2 24 45 75 66</td></tr>
        <tr><td>2 tens</td><td>0: 802, 2 · 2: 24 · 4: 45 · 6: 66 · 7: 170, 75 · 9: 90</td><td>802 2 24 45 66 170 75 90</td></tr>
        <tr><td>3 hundreds</td><td>0: 2, 24, 45, 66, 75, 90 · 1: 170 · 8: 802</td><td class="hl">2 24 45 66 75 90 170 802</td></tr>`)}
      ${trap(`Stability matters: in pass 3, bucket 0 gets 2, 24, 45, 66, 75, 90 in the order from pass 2. If you mix that order, the answer is wrong.`)}` },
    { t: "Radix on words", h: `
      <ul class="dots"><li>27 buckets (a–z + blank)</li><li>read characters <b>right → left</b></li><li>pad short words with blanks <b>at the end</b></li><li>the <b>blank bucket comes last</b></li><li>passes = longest word length</li></ul>
      <p>His example: dart, fear, do, car → <b>car, dart, do, fear</b></p>
      ${why(`Bucket and radix are O(n) only because the input is restricted. Comparison sorts need at least n log n (a lower bound, so really Ω).`)}` },
    { t: "Comparison table (D10-S3): learn it", h: `
      ${tbl(`<tr><th>Sort</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th></tr>
        <tr><td>Quick</td><td>n log n</td><td>n log n</td><td><b>n²</b></td><td>O(n) / O(log n)</td></tr>
        <tr><td>Merge</td><td>n log n</td><td>n log n</td><td>n log n</td><td>O(n)</td></tr>
        <tr><td>Heap</td><td>n log n</td><td>n log n</td><td>n log n</td><td>O(1)</td></tr>
        <tr><td>Bubble</td><td>n</td><td>n²</td><td>n²</td><td>O(1)</td></tr>
        <tr><td>Insertion</td><td>n</td><td>n²</td><td>n²</td><td>O(1)</td></tr>
        <tr><td>Selection</td><td>n²</td><td>n²</td><td>n²</td><td>O(1)</td></tr>
        <tr><td>Bucket</td><td>n+k</td><td>n+k</td><td>n²</td><td>O(nk)</td></tr>
        <tr><td>Radix</td><td>nk</td><td>nk</td><td>nk</td><td>O(n+k)</td></tr>`)}` },
    { t: "Classification (D06-S3): learn it", h: `
      ${tbl(`<tr><th>Category</th><th>Sorts</th></tr>
        <tr><td>Comparison based</td><td>insertion, merge, bubble, quick</td></tr>
        <tr><td>Non-comparison</td><td>bucket, radix, counting</td></tr>
        <tr><td>Internal / External</td><td>bubble, insertion / quick, merge</td></tr>
        <tr><td><b>Stable</b></td><td><b>merge, insertion, bubble</b></td></tr>
        <tr><td><b>Unstable</b></td><td><b>quick, heap, selection</b></td></tr>
        <tr><td>Adaptive</td><td>bubble, insertion, quick</td></tr>
        <tr><td>Non-adaptive</td><td>selection, merge, heap</td></tr>
        <tr><td>Out-place</td><td>merge (only comparison one) + all non-comparison sorts</td></tr>`)}
      ${simple(`<b>Stable</b> = equal items keep their original order. <b>Adaptive</b> = faster if the data is already (partly) sorted.`)}` },
  ]
},
/* =========================================================== 9 */
{
  id: "amort", n: "11", week: "Week 5", title: "Amortized analysis",
  blurb: "Average cost over a worst-case sequence, the 3 techniques and the 3 class scenarios.",
  pdfs: [["11 Amortized analysis", "11 - Amortized Analysis"]],
  slides: [
    { t: "What is amortized analysis?", h: `
      ${simple(`<p>Some operations are expensive, but they happen rarely. So we look at a whole <b>sequence</b> of operations and divide the total cost by the number of operations. The average per operation is small.</p><p>Like paying for a gym once a year: one big payment, but per day it's cheap.</p>`)}
      <div class="cols">
        ${box("", `<h3>Amortized</h3><p>average over a <b>worst-case sequence</b>. <b>No probability.</b> It's a guarantee.</p>`)}
        ${box("", `<h3>Average case</h3><p>average over all possible inputs, <b>with probability</b>.</p>`)}
      </div>` },
    { t: "3 techniques", h: `
      ${tbl(`<tr><th>Technique</th><th>Idea</th></tr>
        <tr><td><b>Aggregate</b></td><td>total cost T(n) of n operations, then <b>T(n)/n</b></td></tr>
        <tr><td><b>Accounting</b></td><td>give each operation type its own amortized cost (own time + prepay for future operations)</td></tr>
        <tr><td><b>Potential</b></td><td>like accounting, but overcharge early operations to pay for later ones</td></tr>`)}
      <span class="formula">Σ amortized cost ≥ Σ actual cost   ("preserve the sum")</span>
      <p>Used in: hash tables, disjoint sets, splay trees.</p>` },
    { t: "Scenario 1: k-th smallest, sort once", h: `
<pre>find_Kth_smallest(A, n, k):
   <span class="k">if</span> not sorted: Sort(A, n)     <span class="c">// n log n, only the 1st time</span>
   <span class="k">return</span> A[k]                     <span class="c">// 1</span></pre>
      <p>n queries: naive worst = n × n log n. Amortized:</p>
      <span class="formula">total = n log n + (n − 1) ≤ n log n + n  →  per query ≤ log n + 1 = O(log n)</span>
      ${why(`n = 8: (8·3 + 7)/8 = 31/8 = 3.875. n = 32: (160 + 31)/32 ≈ 5.97.`)}` },
    { t: "Scenario 2: doubling space (\"puppies\")", h: `
      <p>Room left → add costs <b>1</b>. Full → buy double space (1) + move N old ones (N) + add (1).</p>
      ${tbl(`<tr><th>Add #</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr><tr><th>Cost</th><td>1</td><td class="hl">3</td><td class="hl">4</td><td>1</td><td class="hl">6</td><td>1</td><td>1</td><td>1</td><td class="hl">10</td></tr>`)}
      <p>Total after 8 adds = 18 → average 2.25. The average stays a <b>small constant</b> (around 2–3), so each add is <b>O(1) amortized</b> even though one add can cost O(N).</p>
      ${trap(`His table has two wrong totals: 10 should be <b>9</b> (avg 2.25) and 34 should be <b>33</b> (avg 2.0625). The conclusion is the same.`)}` },
    { t: "Scenario 3: stack PUSH / POP / MULTIPOP", h: `
      ${tbl(`<tr><th>Op</th><th>Actual</th><th>Amortized</th></tr><tr><td>PUSH</td><td>1</td><td><b>2</b></td></tr><tr><td>POP</td><td>1</td><td><b>0</b></td></tr><tr><td>MULTIPOP(S, k)</td><td>min(|S|, k)</td><td><b>0</b></td></tr>`)}
      ${simple(`Each PUSH pays 2: 1 for itself, 1 saved as "credit" for when that item gets popped later. You can't pop more than you pushed, so the credit never goes negative.`)}
      <p>Total ≤ 2n → <b>O(1) per operation</b>.</p>` },
    { t: "Stack bookkeeping table (how to write it)", h: `
      <p>PUSH, PUSH, PUSH, POP, MULTIPOP(S,5), PUSH</p>
      ${tbl(`<tr><th>#</th><th>Op</th><th>Size before</th><th>Actual</th><th>Amort.</th><th>Σ actual</th><th>Σ amort.</th><th>Credit</th></tr>
        <tr><td>1</td><td>PUSH</td><td>0</td><td>1</td><td>2</td><td>1</td><td>2</td><td>1</td></tr>
        <tr><td>2</td><td>PUSH</td><td>1</td><td>1</td><td>2</td><td>2</td><td>4</td><td>2</td></tr>
        <tr><td>3</td><td>PUSH</td><td>2</td><td>1</td><td>2</td><td>3</td><td>6</td><td>3</td></tr>
        <tr><td>4</td><td>POP</td><td>3</td><td>1</td><td>0</td><td>4</td><td>6</td><td>2</td></tr>
        <tr><td>5</td><td>MULTIPOP(5)</td><td>2</td><td>min(2,5)=2</td><td>0</td><td>6</td><td>6</td><td>0</td></tr>
        <tr><td>6</td><td>PUSH</td><td>0</td><td>1</td><td>2</td><td>7</td><td>8</td><td>1</td></tr>`)}
      ${tip(`Conclude: "Σ actual = 7 ≤ Σ amortized = 8 ≤ 2n = 12 ⇒ O(1) per operation". Credit = items on the stack.`)}` },
  ]
},
/* =========================================================== 10 */
{
  id: "rbins", n: "12", week: "Week 6", title: "Red-black trees: insertion",
  blurb: "4 properties, black height, rotations, insertion Cases 1–3 with mirrors, his worked example.",
  pdfs: [["12 Red-black trees", "12 - RED BLACK TREES"]],
  slides: [
    { t: "What is a red-black tree?", h: `
      ${simple(`<p>A binary search tree that <b>balances itself</b>. Every node is red or black. The colour rules make sure the longest path is at most <b>twice</b> the shortest, so search/insert/delete are <b>O(log n)</b>.</p>`)}
      ${tree("6B(3R(2B,5B(4R,-)),9R(7B,10B(-,13R)))", "a valid RB tree (dark = black, red = red)")}` },
    { t: "The 4 rules", h: `
      <ol class="steps">
        <li><b>Root</b> is black.</li>
        <li><b>NIL</b> (empty child) counts as black.</li>
        <li>A <b>red</b> node's children are <b>black</b> (no red-red).</li>
        <li>Every path from a node down to a NIL has the <b>same number of black nodes</b> = black height bh.</li>
      </ol>
      ${trap(`"NIL counts as black" matters a lot: an empty uncle is a <b>black</b> uncle.`)}` },
    { t: "Rotations", h: `
<pre>      x                         y
     / \\     left rotate(x)    / \\
    A   y    ───────────►      x   C
       / \\   ◄───────────     / \\
      B   C  right rotate(y)  A   B</pre>
      ${simple(`Left rotation at x: x's right child y moves up, x becomes y's left child, and y's old left subtree B moves to x's right. In-order order <b>A x B y C</b> stays the same, so it's still a BST.`)}` },
    { t: "Insertion: the card", h: `
      <p>Insert like a normal BST, colour the new node <b>RED</b>. Call it x. Then repeat:</p>
      ${tbl(`<tr><th>Situation</th><th>Do</th></tr>
        <tr><td>x is the root</td><td>colour it black, stop</td></tr>
        <tr><td>parent is black</td><td>stop, all good</td></tr>
        <tr><td>parent red, <b>uncle red</b></td><td><b>Case 1</b>: parent + uncle → black, grandparent → red, x = grandparent, repeat</td></tr>
        <tr><td>parent red, uncle black, <b>bent</b> (Left-Right)</td><td><b>Case 2</b>: rotate at parent (left), x = old parent → now straight</td></tr>
        <tr><td>parent red, uncle black, <b>straight</b> (Left-Left)</td><td><b>Case 3</b>: rotate at grandparent (right), swap colours of parent and grandparent, stop</td></tr>`)}
      ${tip(`Right side = mirror (swap left ↔ right). <b>Red uncle → recolour. Black uncle → rotate.</b> At most 2 rotations per insert, cost O(log n).`)}` },
    { t: "Quick example: insert 10, 20, 30", h: `
      <div class="cols">
        <div>${tree("10B(-,20R)", "10 root → black; 20 red, parent black → ok")}</div>
        <div>${tree("10B(-,20R(-,30R))", "30: parent 20 red, uncle NIL black, straight")}</div>
        <div>${tree("20B(10R,30R)", "mirror Case 3: rotate left at 10, swap colours")}</div>
      </div>` },
    { t: "His example (D12-S24): insert 4", h: `
      ${tree("9B(3R(2B,6B(5R(4R,-),7R)),10B(-,13R))", "insert 4: parent 5 red, uncle 7 red")}
      <ol class="steps">
        <li><b>Case 1</b>: 5, 7 → black, 6 → red. x = 6.</li>
        <li>6's parent 3 is red, uncle 10 is black, bent (3 is left, 6 is right) → <b>Case 2</b>: rotate left at 3. x = 3.</li>
        <li>Now straight → <b>Case 3</b>: rotate right at 9, swap colours of 9 and 6.</li>
      </ol>` },
    { t: "Result of D12-S24", h: `
      ${tree("6B(3R(2B,5B(4R,-)),9R(7B,10B(-,13R)))", "final tree")}
      ${tip(`Write <b>one line per step</b>: "parent 5 RED, uncle 7 RED → Case 1: recolour, x = 6", then draw the tree with R/B on every node. Finally check: root black? any red-red? equal black counts?`)}` },
    { t: "AVL vs RB vs B-tree", h: `
      ${tbl(`<tr><th></th><th>AVL</th><th>Red-black</th><th>B-tree</th></tr>
        <tr><td>Type</td><td>self-balancing BST</td><td>self-balancing BST</td><td>multi-way tree</td></tr>
        <tr><td>Children</td><td>≤ 2</td><td>≤ 2</td><td>many</td></tr>
        <tr><td>Balance</td><td><b>strict</b>: balance factor −1, 0, 1</td><td>looser, by colours</td><td>min degree t (disk block size)</td></tr>
        <tr><td>Rotations</td><td>more</td><td>fewer (recolour first)</td><td>—</td></tr>
        <tr><td>Best for</td><td><b>read-heavy</b> (fast search)</td><td><b>many inserts/deletes</b></td><td><b>disk storage</b></td></tr>`)}
      ${why(`One line answer: read-heavy → AVL; frequent insert/delete → RB; disk blocks → B-tree.`)}` },
  ]
},
/* =========================================================== 11 */
{
  id: "rbdel", n: "13", week: "Week 7", title: "Red-black trees: deletion",
  blurb: "BST delete with the predecessor, the rule sheet, double black cases 3(1)–3(5), the \"Or\" caveat.",
  pdfs: [["13 RB tree deletion", "13 - RB Tree Deletion"]],
  slides: [
    { t: "Step 1: normal BST delete", h: `
      <ul class="dots">
        <li><b>Leaf</b>: just remove it.</li>
        <li><b>One child</b>: replace the node with its child.</li>
        <li><b>Two children</b>: copy in the <b>in-order predecessor</b> (go left once, then right as far as possible). The node keeps its colour. Then delete the predecessor's old node.</li>
      </ul>
      ${trap(`His class algorithm uses the <b>predecessor</b> (the textbook uses the successor). Say which one you use.`)}
      ${simple(`After step 1, ask: what colour was the node <b>physically removed</b> (call it m)? That decides everything.`)}` },
    { t: "Step 2: the easy cases", h: `
      ${tbl(`<tr><th>Situation</th><th>Do</th></tr>
        <tr><td>m is <b>RED</b></td><td><b>Case 1</b>: just delete. Done.</td></tr>
        <tr><td>m BLACK with a <b>RED child</b></td><td><b>Case 2</b>: replace m with the child, colour it black. Done.</td></tr>
        <tr><td>m BLACK, <b>red parent</b>, sibling's kids both black</td><td><b>"Or" rule</b>: swap colours of parent and sibling. Done.</td></tr>
        <tr><td>otherwise</td><td>m's spot becomes <b>DB (double black)</b> → Case 3</td></tr>`)}
      ${trap(`"Or" rule only works if <b>both</b> of the sibling's children are black. If the sibling has a red child, use Case 3(4)/3(5) instead.`)}` },
    { t: "Double black (DB): simple meaning", h: `
      ${simple(`<p>We removed a black node, so one path now has <b>one black too few</b>. We pretend the empty spot is "double black" (carries an extra black) and push that extra black somewhere it can be absorbed: a red node, or the root.</p>`)}
      <p><b>near kid</b> = the sibling's child on DB's side. <b>far kid</b> = the other one.</p>
      <p><b>Toward DB</b>: DB is a left child → rotate left at parent. DB is a right child → rotate right.</p>` },
    { t: "Case 3: the double black cases", h: `
      ${tbl(`<tr><th>Case</th><th>When</th><th>Do</th></tr>
        <tr><td>3(1)</td><td>DB is the root</td><td>remove DB. Done.</td></tr>
        <tr><td>3(2)</td><td>sibling <b>RED</b></td><td>swap colours parent ↔ sibling, rotate parent <b>toward</b> DB, check again</td></tr>
        <tr><td>3(3)</td><td>sibling black, <b>both its kids black</b></td><td>remove DB, sibling → red. Parent red → black (done). Parent black → parent becomes DB (go up)</td></tr>
        <tr><td>3(4)</td><td>sibling black, far kid black, <b>near kid red</b></td><td>swap colours sibling ↔ near kid, rotate sibling <b>away</b> from DB → go to 3(5)</td></tr>
        <tr><td>3(5)</td><td>sibling black, <b>far kid red</b></td><td>swap colours parent ↔ sibling, rotate parent <b>toward</b> DB, remove DB, far kid → black. Done.</td></tr>`)}
      ${trap(`His rule sheet says "apply case 6" after 3(4). There is no case 6: it means <b>3(5)</b>.`)}` },
    { t: "His Example C, start tree", h: `
      ${tree("6B(3R(2B,5B(4R,-)),9R(7B,10B(-,13R)))", "delete 9, 3, 4, 10, 13, 2 (predecessor)")}
      <ul class="dots">
        <li><b>Delete 9</b>: two kids → copy predecessor 7 up. Old 7 is a black leaf with red parent, but sibling 10 has a red kid 13 → "Or" is unsafe → DB. Far kid 13 red → <b>3(5)</b>.</li>
        <li><b>Delete 3</b>: copy predecessor 2 up. Old 2 is a black leaf; sibling 5 has red near kid 4 → <b>3(4) → 3(5)</b>.</li>
        <li>Delete 4: "Or" rule. Delete 10: "Or" rule. Delete 13: Case 1. Delete 2: Case 2.</li>
      </ul>
      <p>Final tree: <b>6B with children 5B and 7B</b>.</p>` },
    { t: "Worked: delete 9 step by step", h: `
      <div class="cols">
        <div>${tree("6B(3R(2B,5B(4R,-)),7R(-,10B(-,13R)))", "copy 7 up (keeps red); old 7 gone → DB on the left")}</div>
        <div>${tree("6B(3R(2B,5B(4R,-)),10R(7B,13B))", "3(5): swap 7↔10 colours, rotate left at 7, 13 → black")}</div>
      </div>
      ${tip(`Write: "9 has two children → copy predecessor 7 up; old 7 black leaf, sibling 10 has red far child 13 → Case 3(5)", then draw.`)}` },
    { t: "Deletion traps", h: `
      <div class="stack">
        ${trap(`Two different "Case 2"s: <b>insert</b> Case 2 = rotate at parent (bent shape). <b>Delete</b> Case 2 = black node with a red child. Name the deck.`)}
        ${trap(`A sibling with NIL children has "both children black".`)}
        ${trap(`D13-S13 starting tree is <b>not a valid RB tree</b> (black heights differ). Say so if asked.`)}
        ${tip(`For each deletion write: (1) predecessor copy if needed, (2) one line per case with the colours that justify it, (3) the tree after each case, (4) "terminal" where it stops.`)}
      </div>` },
  ]
},
/* =========================================================== 12 */
{
  id: "traps", n: "⚠", week: "All weeks", title: "Traps + mistakes on his slides",
  blurb: "Where students lose marks, and the slide errors you should know about before the exam.",
  pdfs: [],
  slides: [
    { t: "Top traps (lose marks fast)", h: `
      <ol class="steps">
        <li>n₀ must work for <b>every</b> n ≥ n₀ (n² ≤ 2ⁿ fails at n = 3).</li>
        <li>Read p from <b>every</b> log: n log n → p = 1, n/log n → p = −1.</li>
        <li>Decreasing recursion tree: <b>n levels</b> + include the <b>leaf level</b>.</li>
        <li>PARTITION: pivot = <b>last</b>, test <b>≤</b>, final swap at <b>i + 1</b>.</li>
        <li>Heaps are <b>0-based</b>: L = 2i+1, R = 2i+2; recurse at the child's index.</li>
        <li>Radix: leading zeros; collect each bucket in the order placed.</li>
        <li>NIL counts as black (NIL uncle = rotation case, not Case 1).</li>
        <li>"0(n)" in decks 04–05 is big-O.</li>
      </ol>` },
    { t: "Slide errors that change an answer", h: `
      ${tbl(`<tr><th>Where</th><th>Slide says</th><th>Correct</th></tr>
        <tr><td>D05 #8</td><td>[0.5, 2, −1, 0], not marked N/A</td><td>Not applicable (a &lt; 1, k &lt; 0)</td></tr>
        <tr><td>D05 #10</td><td>[64, 8, 2, 1], not marked N/A</td><td>Not applicable (negative)</td></tr>
        <tr><td>D05 case 3(b)</td><td>Θ(nᵏ)</td><td>really an upper bound; write class answer</td></tr>
        <tr><td>D13-S8 "Or" rule</td><td>always works</td><td>only if sibling's kids both black</td></tr>
        <tr><td>D13-S8</td><td>"apply case 6"</td><td>case 3(5)</td></tr>
        <tr><td>D11-S9 puppies</td><td>totals 10 and 34</td><td>9 and 33</td></tr>
        <tr><td>D12-S11</td><td>"at most one rotation"</td><td>at most 2 rotations</td></tr>
        <tr><td>D10-S20 radix</td><td>"… 88 9 99"</td><td>"… 88 99 9" (stable order)</td></tr>
        <tr><td>D09-S3</td><td>heap delete-min O(1)</td><td>extract is O(log n)</td></tr>`)}` },
    { t: "Slips in his A2 sample solution", h: `
      ${tbl(`<tr><th>Where</th><th>Sample writes</th><th>Correct</th></tr>
        <tr><td>Heap, i = 1 row</td><td>"i = 3 exit"</td><td>i = 4 (where the value moved)</td></tr>
        <tr><td>PARTITION start</td><td>"J = 0, I = −1"</td><td>on a 1…n sheet: i = 0, j from 1</td></tr>
        <tr><td>PARTITION final swap</td><td>labelled "i"</td><td>i + 1</td></tr>
        <tr><td>PARTITION test</td><td>A[j] &lt; x</td><td>A[j] ≤ x</td></tr>`)}
      ${why(`His arrays and final answers are all correct. Only the labels slipped. Copy his <b>layout</b>, with the right labels.`)}` },
  ]
},
/* =========================================================== 13 */
{
  id: "mock", n: "✎", week: "Practice", title: "Mock quiz with answers",
  blurb: "Questions in his style. Solve on paper first, then tap to reveal the answer.",
  pdfs: [],
  slides: [
    { t: "Q1 · Find O and Ω with c and n₀", h: `
      <p class="big">f(n) = 6n³ − 4n + 5</p>
      ${ans("Show answer", `<p><b>O</b>: 6n³ − 4n + 5 ≤ 6n³ ⇔ 5 ≤ 4n. n = 1 ✗, n = 2 ✓ → <b>O(n³), c = 6, n₀ = 2</b></p><p><b>Ω</b>: pay for −4n: 4n ≤ 4n³, so f ≥ 2n³ → <b>Ω(n³), c = 2, n₀ = 1</b> (c = 5 also works). So Θ(n³).</p>`)}` },
    { t: "Q2 · Find O and Ω with c and n₀", h: `
      <p class="big">f(n) = 2ⁿ + 5n²</p>
      ${ans("Show answer", `<p><b>O</b>: c = 2 needs 5n² ≤ 2ⁿ. False for n = 1…8, true from n = 9 (405 ≤ 512) → <b>O(2ⁿ), c = 2, n₀ = 9</b>. (Or c = 6, n₀ = 4.)</p><p><b>Ω</b>: 2ⁿ ≤ 2ⁿ + 5n² → <b>Ω(2ⁿ), c = 1, n₀ = 1</b>.</p>`)}` },
    { t: "Q3 · Correct or incorrect?", h: `
      <p>f(n) = 2n⁴ + 3n, g(n) = n³</p><ul class="dots"><li>Is f = o(g)?</li><li>Is f = Ω(g)?</li></ul>
      ${ans("Show answer", `<p>f has order n⁴ &gt; n³ ("a &gt; b").</p><p>o(g): <b>INCORRECT</b> (o needs lower order; actually f = ω(g)).</p><p>Ω(g): <b>CORRECT</b>: 2n⁴ + 3n ≥ 2n³, c = 2, n₀ = 1.</p>`)}` },
    { t: "Q4 · Master theorem boxes", h: `
      <ol class="steps"><li>T(n) = 8T(n/4) + n log n</li><li>T(n) = 9T(n/3) + n² log² n</li><li>T(n) = 8T(n/2) + n³ / log n</li><li>T(n) = 3T(n/4) + n log n</li></ol>
      ${ans("Show answers", tbl(`<tr><th></th><th>[a,b,k,p]</th><th>Case</th><th>Ans</th></tr>
        <tr><td>a</td><td>[8,4,1,1]</td><td>1 (8 &gt; 4)</td><td>Θ(n^1.5)</td></tr>
        <tr><td>b</td><td>[9,3,2,2]</td><td>2(a)</td><td>Θ(n² log³ n)</td></tr>
        <tr><td>c</td><td>[8,2,3,−1]</td><td>2(b)</td><td>Θ(n³ log log n)</td></tr>
        <tr><td>d</td><td>[3,4,1,1]</td><td>3(a) (3 &lt; 4)</td><td>Θ(n log n)</td></tr>`))}` },
    { t: "Q5 · Recursion tree", h: `
      <p class="big">T(n) = 4T(n/2) + n, T(1) = 1</p>
      ${ans("Show answer", `<pre>level 0: n          level 1: 4·n/2 = 2n     level 2: 16·n/4 = 4n
level i: 2^i·n      leaves: 4^(log n) = n² nodes × 1 = n²</pre><p>Sum = n(1 + 2 + … + 2^(log n − 1)) + n² = n(n − 1) + n² = <b>2n² − n = Θ(n²)</b>. Leaves dominate. Master: 4 &gt; 2 → Case 1 → Θ(n²) ✓</p>`)}` },
    { t: "Q6 · First PARTITION", h: `
      ${tbl(`<tr><th class="c">1</th><th class="c">2</th><th class="c">3</th><th class="c">4</th><th class="c">5</th><th class="c">6</th><th class="c">7</th></tr><tr><td class="c">13</td><td class="c">6</td><td class="c">21</td><td class="c">9</td><td class="c">15</td><td class="c">4</td><td class="c">9</td></tr>`)}
      ${ans("Show answer", tbl(`<tr><th>Row</th><th>Test</th><th>Array</th><th>i</th></tr>
        <tr><td>start</td><td>x = 9, i = 0</td><td>13 6 21 9 15 4 9</td><td>0</td></tr>
        <tr><td>j=1</td><td>13 ≤ 9 no</td><td></td><td>0</td></tr>
        <tr><td>j=2</td><td>6 ≤ 9 yes, A[1]↔A[2]</td><td>6 13 21 9 15 4 9</td><td>1</td></tr>
        <tr><td>j=3</td><td>21 no</td><td></td><td>1</td></tr>
        <tr><td>j=4</td><td>9 ≤ 9 <b>yes</b>, A[2]↔A[4]</td><td>6 9 21 13 15 4 9</td><td>2</td></tr>
        <tr><td>j=5</td><td>15 no</td><td></td><td>2</td></tr>
        <tr><td>j=6</td><td>4 yes, A[3]↔A[6]</td><td>6 9 4 13 15 21 9</td><td>3</td></tr>
        <tr><td>end</td><td>A[4]↔A[7]</td><td class="hl">6 9 4 9 15 21 13</td><td>q = 4</td></tr>`))}` },
    { t: "Q7 · Merge sort", h: `
      <p class="big">26 11 39 4 18 31 7</p>
      ${ans("Show answer", `<pre>start:   26 11 39  4 | 18 31  7      q=4
divide: [26 11][39 4] | [18 31][7]    q=2 · q=6
divide: [26][11][39][4] | [18][31]    q=1, q=3 · q=5
merge:  [11 26][4 39] | [18 31]
merge:  [4 11 26 39]  | [7 18 31]
merge:  [4 7 11 18 26 31 39]          final merge: 6 comparisons</pre>`)}` },
    { t: "Q8 · Build Max Heap", h: `
      ${tbl(`<tr><th class="c">0</th><th class="c">1</th><th class="c">2</th><th class="c">3</th><th class="c">4</th><th class="c">5</th><th class="c">6</th><th class="c">7</th></tr><tr><td class="c">6</td><td class="c">14</td><td class="c">3</td><td class="c">25</td><td class="c">9</td><td class="c">17</td><td class="c">1</td><td class="c">20</td></tr>`)}
      ${ans("Show answer", `<p>Loop i = 3 → 0.</p><ul class="dots"><li>i=3: 25 vs child 20 → 25 is bigger → exit</li><li>i=2: 3 vs 17, 1 → swap with 17 → [6,14,17,25,9,3,1,20]</li><li>i=1: 14 vs 25, 9 → swap → [6,25,17,14,9,3,1,20]; heapify(3): 14 vs 20 → swap → [6,25,17,20,9,3,1,14]</li><li>i=0: 6 vs 25, 17 → swap → heapify(1): 6 vs 20, 9 → swap → heapify(3): 6 vs 14 → swap</li></ul><p>Heap: <b>[25, 20, 17, 14, 9, 3, 1, 6]</b></p>`)}` },
    { t: "Q9 · RB insert", h: `
      <p>Insert into an empty RB tree: <b>15, 85, 25, 65, 80, 30, 60, 40</b>. Name the case at each step.</p>
      ${ans("Show answer", `<ul class="dots"><li>15 root → black. 85: parent black, ok.</li><li>25: bent Right-Left, uncle NIL → mirror Case 2 → mirror Case 3 (root 25).</li><li>65: uncle 15 red → Case 1, root 25 → black.</li><li>80: bent Left-Right → Case 2 → Case 3.</li><li>30: uncle 85 red → Case 1 (stops, parent 25 black).</li><li>60: bent → Case 2 → Case 3.</li><li>40: Case 1 → mirror Case 2 → mirror Case 3 (rotation at root).</li></ul>${tree("60B(25R(15B,30B(-,40R)),80R(65B,85B))", "final tree")}`)}` },
    { t: "Q10 · Short questions", h: `
      <ol class="steps"><li>Which list has only <b>unstable</b> sorts? (A) merge, insertion, bubble (B) quick, heap, selection (C) quick, merge, heap</li><li>0-based heap, n = 11: children of 4? parent of 7? first i in BUILD?</li><li>Name the 3 amortized techniques.</li><li>Specification of an operation = which 3 parts?</li></ol>
      ${ans("Show answers", `<ol class="steps"><li>(B)</li><li>children 9, 10 · parent ⌈7/2⌉−1 = 3 · first i = ⌊11/2⌋−1 = 4</li><li>aggregate, accounting, potential</li><li>calling prototype, preconditions, postconditions</li></ol>`)}` },
    { t: "Done? Next steps", h: `
      <p class="big">You've got this. Now practise on paper.</p>
      <ul class="dots"><li>Full 13-question mock + full answer key: <code>A - FROM CLASS (slides only)/MIDTERM REVIEW (from slides only).md</code> §7–§8</li><li>Worked A1/A2: <code>assignments/Assignments 1-2 - worked study guide</code></li><li>Professor's PDFs: open them from the home page</li></ul>` },
  ]
},
];

const CHECKLIST = [
  "Write O, Ω, Θ definitions and find c and n₀ (polynomial and 2ⁿ + polynomial)",
  "Handle negative terms: drop for O, pay for it for Ω",
  "Decide o / Ω / Θ / ω claims and disprove a wrong bound",
  "Turn demo(n) code into a recurrence",
  "Fill [a, b, k, p] / Case / Ans, including the 3 'not applicable' ones",
  "Use the decreasing form: a = 1 → n·f(n), a > 1 → f(n)·a^(n/b)",
  "Draw a recursion tree with the leaf level (2T(n−1)+1 = 2ⁿ − 1)",
  "Trace insertion sort, count comparisons and shifts",
  "Trace the first PARTITION in his table",
  "Quicksort best/worst recurrences and which input is worst",
  "Merge sort grid with q at every split",
  "Build-Max-Heap 0-based table with (X) and exits",
  "Extract-max and heapsort iterations; heap costs",
  "Bucket sort and radix passes (numbers and words)",
  "Classification table and complexity table from memory",
  "Amortized: 3 techniques + 3 scenarios + stack table",
  "4 RB properties, bh, rotations, validity check",
  "RB insert with Case 1 / 2 / 3 and mirrors",
  "RB delete with predecessor, Case 1, 2, Or rule, 3(1)–3(5)",
  "Week 1 definitions + AVL vs RB vs B-tree",
];

function renderChecklist(el) {
  if (!el) return;
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem("ca-check") || "{}"); } catch (e) {}
  el.innerHTML = `<div class="checklist">` + CHECKLIST.map((c, i) =>
    `<label class="check"><input type="checkbox" id="chk${i}" ${saved[i] ? "checked" : ""}><span>${c}</span></label>`).join("") +
    `</div><p class="check-count"></p>`;
  const count = () => {
    const n = el.querySelectorAll("input:checked").length;
    el.querySelector(".check-count").textContent = `${n} / ${CHECKLIST.length} ready`;
  };
  el.addEventListener("change", (e) => {
    const i = e.target.id.slice(3);
    saved[i] = e.target.checked;
    try { localStorage.setItem("ca-check", JSON.stringify(saved)); } catch (err) {}
    count();
  });
  count();
}
