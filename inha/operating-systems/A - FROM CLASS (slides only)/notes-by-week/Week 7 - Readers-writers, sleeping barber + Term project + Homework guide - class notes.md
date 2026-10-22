# Week 7 — Classical synchronisation problems (+ term project spec + homework guide) (CLASS NOTES — from class materials only)

> Sources: Slide 14 [S14-p#], Term Project Details 1 [TP-p#], HW1 [HW1-p#], HW2 [HW2-p#].
> Cross-references to earlier class decks use the same form: [S09-p5] = Slide 9, page 5; [S01-p15] = Slide 1 (Course Organization), page 15. "(approx.)" marks a cross-deck page number I did not re-check.
>
> **Legend:** ⭐ = stressed in class or very likely examined · ⚠️ = typo, bug or inconsistency in the material · 🧮 = a trace I derived from the slide's own code and checked with a small simulator (it is *not* printed on the slides) · 🔎 = not in the class materials, look it up in Track B.
>
> **Trace-table conventions** (as taught in [S09-p5] and used in every S14 table):
> - A semaphore's value **never goes below 0**.
> - `wait` takes a flag, or the process sleeps beside the "hole".
> - `post` puts a flag back, *or* hands it straight to a sleeper; in that case the value **stays 0** and the sleeper wakes.
> - Each row shows the values **after** that step.

---

## 1. Big picture

- ⭐ **The readers–writers rule:** "Any number of readers, or exactly one writer — never both." Readers only look at shared data. A writer changes it. [S14-p3]
- **One lock for everybody is correct but wasteful.** Three 2-second readers finish at 6 s instead of 2 s, because readers wait for each other for nothing. [S14-p4, p5]
- ⭐ **The lightswitch:** "the first one in locks the door; the last one out unlocks it". Readers count themselves in a *shadow counter* (`readers`), guarded by `mutex`. [S14-p5]
- ⭐ **Correct is not the same as fair.** The lightswitch starves the writer: in 8 of 8 runs the cook never wrote (writes 0) and waited up to 10.0 s. Starvation is **not** deadlock: everybody else keeps moving. [S14-p7]
- ⭐ **The turnstile fix.** A waiting writer takes the gate (`turnstile`) and keeps it while it sleeps on `board`. Readers inside drain out, new readers queue at the gate, and the writer gets in within about one reading time (≤ 2.0 s). The price is a little less reading (14–18 reads instead of 24). [S14-p8]
- ⭐ **Move one line and re-ask "correct, fair, alive".**
  - Variant A (the cook opens the gate early) starves the cook again.
  - Variant B (the reader takes `mutex` before the gate) deadlocks: a circle W→R1→R2→W.
  - The test is always the circle, "who waits for whom". The safety habit is "never sleep holding the key". [S14-p5, p9, p10]
- **Categorical exclusion (one bathroom):** two lightswitches (customers, staff) over one `room`, plus a limit of 3 places. Take the **category first, the place second**. [S14-p11]
- ⭐ **The sleeping barber:**
  - The semaphores are `customers = 0` and `barber = 0` (messages), and `mutex = 1` (a key).
  - The shadow counter is `waiting`, with `CHAIRS = 2`.
  - Balking: a customer who finds both chairs taken leaves.
  - "Start value 0 is a message; start value 1 is a key." [S14-p12, p13]
- **Barber trace (6 customers, 2 chairs):** C4 leaves, and the haircuts go C1, C2, C3, C5, C6. k barbers run the same program, which makes a **pool**. Swapping the customer's `post(customers)` and `wait(barber)` gives **a deadlock on every run** (exit code 124 under `timeout`). [S14-p15, p16]
- **Context:**
  - **HW2 is due Sat 24 Oct 2026, 23:55 (UTC+5).** [HW2-p1]
  - The midterm (Week 8, 25 %) asks for hand-drawn process graphs, Gantt charts, descriptor/timing/trace tables. [HW1-p1, HW2-p1, S01-p7]
  - The term project is a job runner built from everything so far; Details 2 arrives after the midterm. [TP-p1]

---

## 2. Slide 14 — "Synchronisation II: Readers and Writers, the Barber, the Philosophers" (17 pages, dated 10/18/26)

### [S14-p1] Title slide
- SOC 3010 Operating Systems · "Synchronisation II" · subtitle **"Readers and Writers, the Barber, the Philosophers"** · instructor Jalolliddin Yusupov · j.yusupov@inha.uz.
- The subtitle names three classical problems, but this deck develops only the first two:
  - readers–writers: pp. 3–11;
  - the barber: pp. 12–16.
- The philosophers get only a one-line definition (p2). See the note after [S14-p17].

### [S14-p2] Three problems with names · Reading · Already yours
- **Three problems with names** (short definitions, quoted):
  - **Readers and writers:** "many processes may read shared data at once, but only one at a time may change it."
  - **The sleeping barber:** "a barber who sleeps when nobody waits, and customers who leave when the chairs are full."
  - **The dining philosophers:** "five people, five forks, and everybody needs two."
- **Reading** (as listed on the slide): Allen B. Downey, *The Little Book of Semaphores*, ch. 4–6 (free online) · Silberschatz §7.1 and §8.3 · OSTEP ch. 31–32.
- **Already yours:** `wait` and `post`, the trace table, the five jobs of a semaphore, `shared_mem.h`.
  - One new C call, **`sem_trywait`**, is described as "take a flag if there is one, never sleep". The slide says it "is explained where it appears".
  - Recall the five jobs from [S12-p3]: **lock** (start 1), **signal** (start 0), **limit** (start N), **rendezvous** (0 and 0), **bounded buffer / pass shelf** (N, 0 and 1).
- ⚠️ `sem_trywait` never actually appears on pp. 3–17 of this deck. Only its one-line meaning above is given. 🔎 Look up in Track B: exact behaviour and return value of `sem_trywait`.
- The right half is a joke tweet about an OS class spending three hours on why five philosophers sharing chopsticks starve. It has no technical content and only sets up the "philosophers" theme.

### [S14-p3] The Chalkboard: Readers and Writers
- **Picture:**
  - A green chalkboard MENU (PLOV 35 000 · LAGMAN 30 000 · SAMSA 8 000 · GREEN TEA 5 000).
  - Ten customers R1…R10 underneath: "ten customers read the menu at the same time". The green label says "readers: any number at once".
  - On the right, the cook **W**: "the cook, chalk in hand: he must wait until nobody is reading".
- **Reader and writer:**
  - A **reader** only *looks at* shared data (a customer reading the menu).
  - A **writer** *changes* it (the cook rewriting a price).
- **Why readers may share:** ten customers reading one board cannot hurt each other, because nothing changes while they read.
- **Why the writer must be alone:**
  - A customer who reads while the cook rewrites sees **half a price**: the first digit new, the rest old.
  - Two cooks at once write over each other. That is Week 4's **lost update**, in chalk [S08-p11–13 (approx.)].
- **The question of the day:** one lock for the board would keep the readers and the cook apart. Is that good enough, and is it fair?
- ⭐ Banner: **"Any number of readers, or exactly one writer — never both."**

### [S14-p4] Exercise: One Lock for the Board (on paper)
```
board = Semaphore(1)      /* one key for the board */

Writer (the cook):        Reader (a customer):
  wait(board)               wait(board)
  rewrite the menu          read the menu
  post(board)               post(board)
```
- **The rule to keep:** "Any number of readers, or exactly one writer — never both."
- **Exercise:**
  - (a) Is it **correct**: can a reader ever be at the board while the cook rewrites it?
  - (b) R1, R2, R3 arrive at the same moment, each reads for **2 s**, and the cook does not come. When has the last one finished?
  - (c) What did we lose?
- **Drawing on the slide ("draw it: who reads when?"):** a 0–6 s timeline.
  - **R1 holds the key** from 0 to 2 s.
  - R2 waits (dashed) from 0 to 2, then **R2 holds the key** from 2 to 4.
  - R3 waits from 0 to 4, then **R3 holds the key** from 4 to 6.
  - A red line at 6 s: "Total 6s (Finishes)".
- **Hint:** "Draw who holds the key, second by second."
- ⭐ Banner: **"First ask whether it is correct; then ask what it costs."**

### [S14-p5] ⭐ Answer: One Lock, Then the Lightswitch
- **One lock for the board, answered:**
  - (a) **Correct.** There is one key, so a reader is never at the board with the cook.
  - (b) **6 s, not 2.** R1 reads 0–2 s, R2 2–4 s, R3 4–6 s.
  - (c) The readers wait for each other **for nothing**, because reading changes nothing.
- ⭐ **Lightswitch** (Downey's name): "the first person into a room switches the light on, the last one out switches it off". Applied here, **the first reader in locks the board, and the last one out unlocks it.**

```
board   = Semaphore(1)   /* who owns the chalkboard */
mutex   = Semaphore(1)   /* guards the counter      */
readers = 0              /* shadow counter          */

Writer:                  Reader:
  wait(board)              wait(mutex)
  rewrite the menu         readers = readers + 1
  post(board)              if readers == 1: wait(board)   /* first in: lock the board */
                           post(mutex)
                           read the menu
                           wait(mutex)
                           readers = readers - 1
                           if readers == 0: post(board)   /* last out: unlock it */
                           post(mutex)
```
- ⭐ Banner: **"The first one in locks the door; the last one out unlocks it."**
- **Why `readers` is an ordinary integer:** "You may not read a semaphore". So the readers count themselves in a **shadow counter**, guarded by `mutex`. (Same rule as [S09-p5]: set the start value once, then only wait and post; never read the value to decide something.)
- **The writer did not change:** still `wait(board) … post(board)`.
- **How it works, step by step:**
  1. `mutex` protects only the counter. `board` is the key to the room.
  2. The first reader (the one who makes `readers` 1) takes `board` on behalf of all readers.
  3. Later readers only increment the counter and walk in. They never touch `board`.
  4. The last reader out (the one who makes `readers` 0) gives `board` back. Then the cook can take it.
- ⭐ **Is the first reader breaking the rule?** The rule is "Never sleep holding the key". Yet the first reader can sleep on `board` while holding `mutex`.
  - This is allowed here because whoever holds the board (the cook) **never asks for `mutex`**, so no circle of waiting can form.
  - "The rule is a safety habit; the real test is always the circle: who waits for whom."
  - 🧮 Example: the cook is writing when R1 arrives.
    1. R1 takes `mutex`, sets `readers = 1`, and sleeps on `board` while still holding `mutex`.
    2. R2 arrives and sleeps on `mutex`, queued behind R1.
    3. The cook finishes and does `post(board)`. R1 wakes and does `post(mutex)`, so R2 proceeds.
    4. Nobody waits for someone who waits for them, so there is no circle.

### [S14-p6] Homework: Trace the Chalkboard ("Exercise · fill in the table")
- **Three readers and the cook, in this order** (as on the slide; you fill in the empty cells):

| step | who | op | readers | board | mutex | sleeping |
|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 1 | 1 | — |
| 1 | R1 | enters | | | | |
| 2 | R2 | enters | | | | |
| 3 | W | wait(board) | | | | |
| 4 | R1 | leaves | | | | |
| 5 | R3 | enters | | | | |
| 6 | R2 | leaves | | | | |
| 7 | R3 | leaves | | | | |
| 8 | W | rewrites the menu | | | | |
| 9 | W | post(board) | | | | |

- **Definitions on the slide:**
  - **enters** = the reader's lines down to `read the menu`;
  - **leaves** = the lines after it;
  - each value column holds the value **after** the step.
- **The code on the slide** is the same as p5, with `/* enters */` and `/* leaves */` comments added. The declarations are `board = Semaphore(1)`, `mutex = Semaphore(1)` and `readers = 0`.
- **Questions:**
  - (a) At which step does W fall asleep, and how many readers are inside then?
  - (b) Who wakes W, and at which step?
  - (c) W asked for the board before R3 arrived. Who got in first?
- Banner: "One row per step: the values after it, and who is asleep."

<details>
<summary>🧮 Self-check key: derived by me from the slide's code, not printed in the deck. Try the table yourself first.</summary>

| step | who | op | readers | board | mutex | sleeping |
|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 1 | 1 | — |
| 1 | R1 | enters (first in → takes board) | 1 | 0 | 1 | — |
| 2 | R2 | enters (not first → no wait(board)) | 2 | 0 | 1 | — |
| 3 | W | wait(board) | 2 | 0 | 1 | **W** |
| 4 | R1 | leaves | 1 | 0 | 1 | W |
| 5 | R3 | enters (readers was 1 → walks straight in) | 2 | 0 | 1 | W |
| 6 | R2 | leaves | 1 | 0 | 1 | W |
| 7 | R3 | leaves (last out → post(board) hands the flag to W) | 0 | 0 | 1 | — (W wakes) |
| 8 | W | rewrites the menu | 0 | 0 | 1 | — |
| 9 | W | post(board) | 0 | 1 | 1 | — |

- (a) Step 3, with **2** readers inside (R1, R2).
- (b) **R3**, at step 7: the last one out posts `board`.
- (c) **R3 got in first** (step 5), although W had asked at step 3. New readers do not queue behind a waiting writer, which is the seed of the starvation on p7.

</details>

### [S14-p7] ⭐ Starvation, Measured
- ⭐ **Starvation** (definition, quoted): "A process that is **never chosen** although the program is correct and everybody else keeps moving." The slide adds that it is **not a deadlock**: the café is busy, and only the cook never gets the chalk.
- ⭐ Banner: **"Correct is not the same as fair."**
- **Meme** (three panels): "Explain Deadlock, and we'll hire you." / "Hire me, and I'll explain it to you." / "let's discuss the salary." It jokes that deadlock is two parties each waiting for the other first. Contrast that with starvation, where only one party waits.
- **"Six readers and one cook, for real":**
```
$ ./rw_readers
reads 24, writes 0, writer waited at most 10.0 s
$ ./rw_readers
reads 24, writes 0, writer waited at most 10.0 s
$ ./rw_readers
reads 24, writes 0, writer waited at most 10.0 s
```
- **Chart, "the idea: 2 s of reading each, a new reader every second"** (0–10 s):
  - Lane R1 reads 0–2, 2–4, 4–6, 6–8, 8–10.
  - Lane R2 reads 1–3, 3–5, 5–7, 7–9, 9–10.
  - Lane R3 reads 2–4, 4–6, 6–8, 8–10.
  - W is a red dashed line from 1 s to 10 s (asleep the whole time).
  - The "inside" count per second is **1, 2, 3, 3, 3, 3, 3, 3, 3, 3**, so it never returns to 0.
- **The arithmetic:**
  - The board is unlocked only when `readers` returns to 0.
  - If a new reader comes in before the last one leaves, it never does.
  - So the readers keep the board for ever, and W stays asleep on `board`.
- **Correct, and still unfair:** the lightswitch never lets the cook and a reader share the board. But in **8 of 8 runs** (3 shown) the cook **never** rewrote the menu (writes 0). He came out at 1 s and waited up to **10.0 s**, getting the board only after closing time (10 s).
- ⚠️ (not an error, just don't mix them up) The heading of the measured runs says **six** readers, while the "idea" chart draws three reader lanes (R1–R3). The chart is the idealised picture, and the numbers come from the real `./rw_readers` run. The chart's "10" axis label is clipped (cosmetic).
- 🧮 **Starvation as a step trace** (the slide's code, readers overlapping):

| step | who | op | readers | board | mutex | sleeping |
|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 1 | 1 | — |
| 1 | R1 | enters | 1 | 0 | 1 | — |
| 2 | W | wait(board) | 1 | 0 | 1 | W |
| 3 | R2 | enters | 2 | 0 | 1 | W |
| 4 | R1 | leaves | 1 | 0 | 1 | W |
| 5 | R3 | enters | 2 | 0 | 1 | W |
| 6 | R2 | leaves | 1 | 0 | 1 | W |
| 7 | R4 | enters | 2 | 0 | 1 | W |
| … | … | the same pattern for ever | never 0 | 0 | 1 | **W, for ever** |

### [S14-p8] ⭐ The Turnstile Fix
```
turnstile = Semaphore(1)     /* the gate at the door */
board     = Semaphore(1)
mutex     = Semaphore(1)
readers   = 0

Writer:                                 Reader:
  wait(turnstile)   /* close it */        wait(turnstile)   /* pass it */
  wait(board)                             post(turnstile)
  rewrite the menu                        wait(mutex)
  post(turnstile)   /* open it */         readers = readers + 1
  post(board)                             if readers == 1: wait(board)
                                          post(mutex)
                                          read the menu
                                          wait(mutex)
                                          readers = readers - 1
                                          if readers == 0: post(board)
                                          post(mutex)
```
- ⭐ **Turnstile** (definition, quoted): "A gate that everybody passes **one at a time**: a semaphore that starts at 1 and is posted straight after it is taken — `wait(turnstile); post(turnstile)`." The picture is a metro-style turnstile.
  - Same idea as [S12-p6]: `wait(gate); post(gate)` "lets exactly one through and re-opens the gate for the next — like a turnstile at a metro station."
- ⭐ **Why it works** (the slide's four steps):
  1. A waiting writer takes the turnstile and **keeps it** while it sleeps on `board`, so the gate is closed.
  2. Readers already inside drain out.
  3. New readers queue at the gate.
  4. The last one out posts `board`: the writer writes, then opens the gate.
- **What the gate costs:**

| | runs | reads | writes | longest wait of the cook |
|---|---|---|---|---|
| without the gate (lightswitch) | 8 | 24 | 0 | up to 10.0 s |
| with the turnstile | 8 | 14–18 | 2–3 | at most 2.0 s (about one reading time, 2 s) |

  The price is "a little less reading".
- **Real runs:**
```
$ ./rw_turnstile
reads 18, writes 3, writer waited at most 2.0 s
$ ./rw_turnstile
reads 14, writes 2, writer waited at most 2.0 s
$ ./rw_turnstile
reads 18, writes 3, writer waited at most 2.0 s
```
- 🧮 **The same arrivals as the starvation trace, now with the gate:**

| step | who | op | readers | turnstile | board | mutex | sleeping |
|---|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 1 | 1 | 1 | — |
| 1 | R1 | passes the gate, enters | 1 | 1 | 0 | 1 | — |
| 2 | W | wait(turnstile), wait(board) | 1 | **0** | 0 | 1 | W (on board) |
| 3 | R2 | arrives: wait(turnstile) | 1 | 0 | 0 | 1 | W, **R2 (on turnstile)** |
| 4 | R1 | leaves (last out → post(board) hands the flag to W) | 0 | 0 | 0 | 1 | R2 (W wakes) |
| 5 | W | rewrites the menu | 0 | 0 | 0 | 1 | R2 |
| 6 | W | post(turnstile) → flag handed to R2 | 0 | 0 | 0 | 1 | — (R2 wakes) |
| 7 | W | post(board) | 0 | 0 | 1 | 1 | — |
| 8 | R2 | post(turnstile), then enters as first reader | 1 | 1 | 0 | 1 | — |

  - The cook waits only until the readers already inside have drained, which is about one reading time.
- **Detail:** the writer posts `turnstile` *before* `board`.
  - 🧮 So a reader let through the gate can, for a moment, sleep on `board` while holding `mutex`. This is harmless for the same reason as p5: the writer never asks for `mutex`, so there is no circle.

### [S14-p9] Exercise: Does This One Starve? (for A and for B)
- Two changes to the turnstile version. In both variants `turnstile`, `board` and `mutex` start at 1 and `readers = 0`. The changed lines are red on the slide; here they are marked `<- changed`.

**Variant A, "the cook opens the gate early"**
```
Writer (A):                         Reader:  (unchanged, as on p8)
  wait(turnstile)                     wait(turnstile)
  post(turnstile)   <- changed        post(turnstile)
  wait(board)                         wait(mutex)
  rewrite the menu                    readers = readers + 1
  post(board)                         if readers == 1:
                                          wait(board)
                                      post(mutex)
                                      read the menu
                                      wait(mutex)
                                      readers = readers - 1
                                      if readers == 0:
                                          post(board)
                                      post(mutex)
```
**Variant B, "the reader takes the key first"**
```
Writer:  (unchanged, as on p8)      Reader (B):
  wait(turnstile)                     wait(mutex)       <- changed
  wait(board)                         wait(turnstile)   <- changed
  rewrite the menu                    post(turnstile)
  post(turnstile)                     readers = readers + 1
  post(board)                         if readers == 1:
                                          wait(board)
                                      post(mutex)
                                      read the menu
                                      wait(mutex)
                                      readers = readers - 1
                                      if readers == 0:
                                          post(board)
                                      post(mutex)
```
- **Exercise, for A and for B:**
  - (a) Still **correct**: never a reader at the board with the cook?
  - (b) Still **fair**, or can the cook wait for ever while readers come and go?
  - (c) Which process can sleep for ever, and on which semaphore?
- **Hint:** "For every `wait`, ask who holds the flag it needs — and what that holder is waiting for."
- ⭐ Banner: **"Move one line, and ask the three questions again: correct, fair, alive."**

### [S14-p10] ⭐ Answer: Does This One Starve?

| variant | correct? | fair? | who can sleep for ever |
|---|---|---|---|
| **A** — the gate opens before the cook gets the board | yes | **no**: the gate is open while the cook waits, so new readers keep coming in (starvation again) | the cook, on `board`, while the readers keep moving (**not a deadlock**) |
| **B** — the reader takes `mutex` before the gate | yes | "it does not matter: it can **stop**" | **everybody: a deadlock** |

- ⭐ **B, in four steps** (the slide's own table):

| step | who | op | readers | board | mutex | turnstile | sleeping |
|---|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 1 | 1 | 1 | — |
| 1 | R1 | enters, reads | 1 | 0 | 1 | 1 | — |
| 2 | W | wait(turnstile), wait(board) | 1 | 0 | 1 | 0 | W |
| 3 | R2 | wait(mutex), wait(turnstile) | 1 | 0 | 0 | 0 | W, R2 **(holding mutex)** |
| 4 | R1 | leaving: wait(mutex) | 1 | 0 | 0 | 0 | W, R2, R1, **everyone: nobody can move** |

- ⭐ **Who waits for whom in B:**
  - W sleeps on `board`, which R1 holds.
  - R1 sleeps on `mutex`, which R2 holds.
  - R2 sleeps on `turnstile`, which W holds.
  - That is a **circle**. R2 broke the rule **never sleep holding the key**.
- 🧮 **Variant A as a trace** (same arrivals as p7). The gate is open again before the cook sleeps, so it is the p7 starvation:

| step | who | op | readers | turnstile | board | sleeping |
|---|---|---|---|---|---|---|
| 1 | R1 | enters | 1 | 1 | 0 | — |
| 2 | W | wait(turnstile), post(turnstile), wait(board) | 1 | **1** (open!) | 0 | W |
| 3 | R2 | passes the gate, enters | 2 | 1 | 0 | W |
| 4 | R1 | leaves | 1 | 1 | 0 | W |
| 5 | R3 | passes the gate, enters | 2 | 1 | 0 | W |
| … | … | readers keep overlapping | never 0 | 1 | 0 | **W, for ever** |

- **The fixes, as taught:**
  - For A, keep the gate closed while sleeping on `board`. That is the p8 writer: `post(turnstile)` only after rewriting.
  - For B, pass the gate *before* taking `mutex`, as in the p8 reader. Never sleep holding the key unless the circle test shows that no circle can form (p5).
- **Where you meet it:**
  - A database: the readers are queries, and the writer is the statement that changes the table's shape.
  - A configuration file re-read while requests are served.
  - A cache with one process that refreshes it.
- ⭐ Banner: **"A lock says who may; fairness says who next."**

### [S14-p11] ⭐ Two Kinds of Customer, One Bathroom (categorical exclusion)
- ⭐ **Categorical exclusion** (definition): whole **categories** keep each other out. The café's one bathroom holds staff or customers, never both, and never more than three people.
```
room      = Semaphore(1)   /* the empty bathroom             */
limit     = Semaphore(3)   /* three places inside            */
mutexC    = Semaphore(1)   /* guards the customers' counter  */
customers = 0              /* shadow counter                 */

Customer:
  wait(mutexC)
  customers = customers + 1
  if customers == 1: wait(room)   /* first in: the room is ours */
  post(mutexC)
  wait(limit)                     /* one of the three places    */
  use the bathroom
  post(limit)
  wait(mutexC)
  customers = customers - 1
  if customers == 0: post(room)   /* last out: give it back     */
  post(mutexC)

Staff:                           (the slide shows only these four entry lines)
  wait(mutexS)
  staff = staff + 1
  if staff == 1: wait(room)
  post(mutexS)
```
- **Same bricks, composed:** two lightswitches, one per category, over the **same** `room`; inside it, a **limit of 3**. Staff run the mirror image, with `mutexS`, `staff`, and the same `room` and `limit`.
  - The `limit` is the "limit (multiplex)" job of a semaphore [S12-p4]: at most N inside at once.
- ⭐ **The order matters:** take the **category first, the place second**.
  - The other order lets a customer keep one of the three places while he sleeps on `room`. Staff who arrive then wait for places nobody is using.
  - "Holding one thing while waiting for another is how every deadlock starts."
- ⭐ Banner: **"Two lightswitches share one room; the limit counts the places inside."**
- ⚠️ The staff code is only the entry half, and the declaration box lists only the customers' names.
  - `mutexS = Semaphore(1)` and `staff = 0` are implied by "mirror image". They are not printed.
  - The rest of the staff code (wait(limit) … post(limit), then the leave half with `mutexS`/`staff`) is the mirror of the customer code.
- 🧮 **The wrong order, traced.** Everybody does `wait(limit)` *before* the lightswitch. S = staff, K = customers.

| step | who | op | room | limit | sleeping |
|---|---|---|---|---|---|
| 0 | | (start) | 1 | 3 | — |
| 1 | S1 | takes a place, first staff → takes room, inside | 0 | 2 | — |
| 2 | K1 | takes a place, first customer → wait(room) | 0 | 1 | K1 (on room, holding a place **and** mutexC) |
| 3 | K2 | takes a place → wait(mutexC) | 0 | 0 | K1, K2 (holding a place) |
| 4 | K3 | wait(limit) | 0 | 0 | K1, K2, K3 (on limit) |
| 5 | S2 | wait(limit) | 0 | 0 | K1, K2, K3, **S2 (on limit)** |

  - Only S1 is in the bathroom, yet S2, whose category owns the room, sleeps on `limit`. The two places are held by customers who are not even inside: "places nobody is using".
  - In the slide's order (category first), S2 simply walks in (`limit` goes 2 → 1) while the customers wait for `room`.

### [S14-p12] The Sleeping Barber
- **Picture, two panels:**
  - **NOBODY WAITS:** "the barber sleeps in his own chair" (B asleep, zzz) next to two empty waiting chairs.
  - **BUSY:** C1 is in the barber's chair with B cutting; C2 and C3 are in the "two waiting chairs: both taken"; by the door, **C4 finds both chairs taken and leaves** (red arrow).
- **The sleeping barber:** Dijkstra's problem, set in the café's corner, with **one barber, one barber's chair, two waiting chairs**. When nobody is waiting, the barber sleeps. A customer who comes in **wakes** him, or sits down and waits.
- ⭐ **Balking** (definition): "Giving up at the door instead of waiting: a customer who finds **both waiting chairs taken leaves** without a haircut."
- ⭐ **Three questions the program must answer:**
  1. Who wakes the barber?
  2. How does a customer know it is his turn?
  3. How do we count the waiting chairs, when a semaphore cannot be read?
- ⭐ Banner: **"Nobody can look inside a semaphore: the barber must be woken, the customer must be called."**

### [S14-p13] ⭐ The Barber in Pseudo-Code
```
customers = Semaphore(0)   /* "someone is waiting"         */
barber    = Semaphore(0)   /* "next!"                      */
mutex     = Semaphore(1)   /* guards waiting               */
waiting   = 0              /* shadow counter, CHAIRS = 2   */

Customer:                                  Barber:
  wait(mutex)                                loop {
  if waiting == CHAIRS:                        wait(customers)   /* sleep until someone comes */
      post(mutex); leave                       wait(mutex)
  waiting = waiting + 1                        waiting = waiting - 1
  post(mutex)                                  post(mutex)
  post(customers)   /* wake him */             post(barber)      /* "next!" */
  wait(barber)      /* wait for "next!" */     cut hair
  get a haircut                              }
```
- ⭐ **0 is a message, 1 is a key.**
  - `customers` and `barber` start at **0**. Each is a message that somebody **else** gives you.
  - `mutex` starts at **1**. It is a key you give back **yourself**.
- **The shadow counter:** you may not read `customers` to count the chairs. So the customers count themselves in `waiting`, an ordinary integer changed only under `mutex`.
- ⭐ **The three answers:**
  1. The customer wakes the barber with `post(customers)`.
  2. The barber calls him with `post(barber)`.
  3. `waiting` counts the chairs. A customer who finds it at `CHAIRS` gives the key back and leaves.
- ⭐ Banner: **"Start value 0 is a message; start value 1 is a key."**
- **Note on the counter:** the barber decrements `waiting` at "next!", so the man in the barber's chair is *not* counted. `waiting` counts only the two waiting chairs.

### [S14-p14] Homework: Six Customers, Two Chairs ("the order of events, as printed")
- **Table to fill**, with columns step · who · op · waiting · customers · barber · sleeping:
  - 0 (start): 0, 0, 0, —
  - 1 Barber `wait(customers)` · 2 C1 arrives · 3 Barber next! · 4 C2 arrives · 5 C3 arrives · 6 C4 arrives
  - 7 Barber `wait(customers), next!` · 8 C5 arrives · 9 Barber `wait(customers), next!` · 10 C6 arrives
  - 11 Barber `wait(customers), next!` · 12 Barber `wait(customers), next!` · 13 Barber `wait(customers)`
- **Definitions:**
  - **arrives** = the customer's lines down to `wait(barber)` (or to `leave`);
  - **next!** = the barber's four lines after `wait(customers)`;
  - C2, C3 and C4 arrive while C1 is in the chair.
- The code is the p13 code with `CHAIRS = 2`, `waiting = 0`, `mutex = Semaphore(1)`, `customers = Semaphore(0)`, `barber = Semaphore(0)`. A bracket marks the barber's four "next!" lines.
- **Questions:**
  - (a) Who leaves without a haircut?
  - (b) In which order are the haircuts given?
  - (c) Swap the customer's lines `post(customers)` and `wait(barber)`. What happens? "(next lecture …)"
- Banner: "One row per step: who sleeps, who is called, who leaves."
- ⚠️ (c) is labelled "next lecture", but its answer is already on p16 of this deck.

### [S14-p15] ⭐ Answer: Six Customers, and k Barbers
- **The slide's filled table:**

| step | who | op | waiting | customers | barber | sleeping |
|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 0 | 0 | — |
| 1 | Barber | wait(customers) | 0 | 0 | 0 | Barber |
| 2 | C1 | arrives | 1 | 0 | 0 | C1 · Barber wakes |
| 3 | Barber | next! | 0 | 0 | 0 | C1 wakes |
| 4 | C2 | arrives | 1 | 1 | 0 | C2 |
| 5 | C3 | arrives | 2 | 2 | 0 | C2, C3 |
| 6 | C4 | arrives | 2 | 2 | 0 | C2, C3 · **C4 leaves** |
| 7 | Barber | wait(customers), next! | 1 | 1 | 0 | C3 · C2 wakes |
| 8 | C5 | arrives | 2 | 2 | 0 | C3, C5 |
| 9 | Barber | wait(customers), next! | 1 | 1 | 0 | C5 · C3 wakes |
| 10 | C6 | arrives | 2 | 2 | 0 | C5, C6 |
| 11 | Barber | wait(customers), next! | 1 | 1 | 0 | C6 · C5 wakes |
| 12 | Barber | wait(customers), next! | 0 | 0 | 0 | C6 wakes |
| 13 | Barber | wait(customers) | 0 | 0 | 0 | Barber |

- ⭐ **Answers:**
  - (a) **C4** leaves.
  - (b) The haircuts go **C1, C2, C3, C5, C6**.
  - C4 found `waiting == 2` and left. Every `post(barber)` went straight to the customer asleep longest, so `barber` stays 0.
  - Why `customers` is 0 at step 2 but 1 at step 4: at step 2 the barber was asleep on `customers`, so C1's post was *handed* to him. At step 4 nobody was asleep on it, so the flag stays in the hole.
- **Real run:**
```
$ ./barber
 0 s  C1 sits (1 waiting)
 0 s  C1 gets a haircut
 1 s  C2 sits (1 waiting)
 2 s  C3 sits (2 waiting)
 3 s  C2 gets a haircut
 3 s  C4 sits (2 waiting)
 4 s  C5 leaves: no chair
 5 s  C6 leaves: no chair
 6 s  C3 gets a haircut
 9 s  C4 gets a haircut
```
- ⭐ **k barbers, same program:** run the barber's loop in **k** processes and change nothing. `post(barber)` now means "a barber is free". This is a **pool**: k workers taking jobs from one queue, like Week 5's team of operators ([S11-p11 (approx.)], the fixed team or pool of processes).
- ⭐ Banner: **"k barbers, same program: the pool is a barber shop."**
- ⚠️ **Two cautions:**
  1. The real run has its own timing: one arrival per second, and haircuts starting at 0, 3, 6, 9 s by the timestamps. So there C5 and C6 balk and C4 is served. This is a different schedule from the homework table, not a contradiction.
  2. Answer (b) assumes the semaphore wakes **the longest sleeper first**. In [S09-p5] the flag went to "Q or R": you could not know which.
     - **Who balks** (C4) does not depend on this, because only `waiting` decides it.
     - The **order** of haircuts among the waiting customers does depend on it.
     - 🔎 Look up in Track B: whether POSIX semaphores wake sleepers in FIFO order.

### [S14-p16] ⭐ Before the Next Lecture: the customer's two lines swapped
```
Customer (two lines swapped):            Barber:
  wait(mutex)                              loop {
  if waiting == CHAIRS:                      wait(customers)
      post(mutex); leave                     wait(mutex)
  waiting = waiting + 1                      waiting = waiting - 1
  post(mutex)                                post(mutex)
  wait(barber)       <- swapped (red)        post(barber)
  post(customers)    <- swapped (red)        cut hair
  get a haircut                            }
```
- **Think about it:** start values `customers = barber = 0`, `mutex = 1`, `waiting = 0`. One customer arrives. Who sleeps, on which semaphore, and who could ever wake them? "Bring a trace table of two rows."
- ⭐ **Who waits for whom:**
  - The customer waits for "next!" **before** telling the barber he is there.
  - The barber waits for a customer.
  - Each waits for a post that only the other can make, after his own `wait`. **"A deadlock, on every run."**
- **The swapped shop, run for real:**
```
$ timeout 5 ./barber_swapped; echo "exit code $?"
 0 s  C1 sits (1 waiting)
 1 s  C2 sits (2 waiting)
 2 s  C3 leaves: no chair
 3 s  C4 leaves: no chair
 4 s  C5 leaves: no chair
exit code 124
$ ./barber_swapped > out.txt &
$ sleep 7
$ ps -o pid,ppid,stat,comm
  PID  PPID STAT COMMAND
    1     0 Ss   bash
  129     1 S    barber_swapped
  131   129 S    barber_swapped
  132   129 S    barber_swapped
  133   129 S    barber_swapped
  138     1 R    ps
```
- ⭐ **`timeout` and 124:** `timeout 5 cmd` kills the command after 5 seconds. Exit code **124** means it *had to*: the shop would never have closed by itself. State **`S`** means asleep, using no CPU. (Every `barber_swapped` process is in S: a deadlock costs no CPU, which is unlike a busy loop.)
- ⭐ Banner: **"Trace it before you run it: the table tells you what the run will show."**
- 🧮 **The two-row trace** the slide asks for. The values are consistent with the slide's answer in words.

| step | who | op | waiting | customers | barber | sleeping |
|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 0 | 0 | — |
| 1 | Barber | wait(customers) | 0 | 0 | 0 | Barber (on customers) |
| 2 | C1 | arrives: …, wait(barber) | 1 | 0 | 0 | Barber (on customers), **C1 (on barber)**, nobody left to post either |

  - Every later customer either sits forever (C2: `waiting` 2) or balks, because `waiting` never goes down. That matches the real run: C1 and C2 sit, C3–C5 leave.
- **The fix, as taught:** the original order from p13, `post(customers)` *then* `wait(barber)`.

### [S14-p17] Questions?
- Closing slide (an architecture photo). No content.

### Note: the dining philosophers (named in the title and on p2, not developed here)
- This deck gives only the definition, "five people, five forks, and everybody needs two" [S14-p2].
- It contains no code, no trace and no fix for the philosophers.
- The syllabus puts them in **Week 7, Part 2** [S01-p15]: "the dining philosophers, why the naive solution deadlocks, the starvation scenario, resource allocation graphs; midterm workshop on process graphs, pipes and signals".
- The planned lab is "the dining philosophers made to deadlock and then fixed".
- 🔎 Look up in Track B: the naive dining-philosophers code, its deadlock, the standard fixes, and resource allocation graphs (until the next class deck arrives).

---

## 3. Term Project — Details 1 (v1.0), "the first half of the project" (9 pages)

### [TP-p1] Header box · §1 What you are building
- **Header box:**

| | |
|---|---|
| COVERS | Processes and signals · the shell and CPU scheduling · pipes and dup2 · FIFOs · message queues, shared memory and mutual exclusion · semaphores · sockets · concurrent servers · synchronisation |
| ISSUED | **October 14** |
| INSTRUCTOR / ASSISTANT | Yusupov Jalolliddin / Shoakbar Murodov |
| UPLOAD | One upload per team on eClass, **at the end of the semester**. The exact date comes with Details 2. |
| FAIR | **In the December exam weeks**, on your own laptops. The schedule comes with Details 2. |
| WEIGHT | **20 % of the course** |
| WORK | In your registered team of **5–6** |

- ⭐ **No intermediate deliveries and no checks** before the upload. You decide when the team starts and how fast it goes; everything is collected once and judged at the fair.
- **Term Project Details 2** arrives **after the midterm**. It brings the additions for the second half of the course, your team's *twist cards*, the grading and the dates.
- **What you are building:** a small **job runner**. A *job* is a shell command somebody wants executed on another computer, e.g. `sort big.txt`, `gcc -o game game.c`, `sleep 30`.
- **Three programs cooperate:**
  - **client:** a short command-line program. It submits a job, asks what happened to it, cancels it, or fetches its output.
  - **server:** one process, always running. It accepts clients, keeps the **queue** of jobs, and decides which job runs next and on which worker. That decision is your **scheduling policy**.
  - **worker:** a process on **another machine**. It connects to the server, receives a job, runs it as a child process, captures its output, enforces its time limit, and reports the exit status honestly.
- **Diagram:**
  - Several `client` boxes connect over a socket to the `server` ("queue + policy", laptop A).
  - The server connects over TCP to `worker` laptop B and `worker` laptop C. Each worker runs a dashed "job (child)".
  - Caption: "different physical machines at the fair".
- ⭐ "The whole course so far is in this picture": fork, exec, wait and signals, a scheduling policy, a pipe that captures a child's output, a queue under a semaphore, sockets, and a server for many clients.

### [TP-p2] The whole system in pseudo-code · §2 The rules that carry a zero · §3 Your team
```
Client:                          Server:
    connect to server                loop {
    send("submit", cmd, timeout)         c = accept()
    id = receive()                       serve c without
    print(id)                              blocking the others
    -- later --                          on submit: queue.add(job)
    send("status", id)                   when a worker is free:
    print(receive())                       job = policy.next(queue)
                                           send job to that worker
Worker:                                  on report: job.state = …
    connect to server                }
    loop {
        job = receive()
        pid = fork()
        child: exec(job.cmd),
               stdout → pipe
        parent: start timer,
          collect output,
          wait(pid) → status
        send report(id, status, output)
    }
```
- ⭐ **Rules that carry a zero:**
  - At the fair, the server and at least one worker run on **two different physical laptops**. **A one-laptop demo scores zero for the whole project.**
  - The delivered system runs on **Ubuntu Linux**. Server, worker and client are written in **C**; shell is allowed only for build glue and test scripts.
  - A component whose declared owner cannot explain it at the fair **scores zero for that member**. The team is not punished for one passenger, and the passenger is not carried by the team.
  - Work a student cannot explain or modify **live, at the fair**, is graded as absent.
  - Until the fair, **two virtual machines on one laptop are fine** for development. Bridged networking (two laptops seeing each other over Wi-Fi) "will be shown in class".
- **§3 Your team:** the system splits into **five components**, one owner each; a team of six declares the sixth. Anyone may touch the code, but the **owner** is the person the examiner questions and the one who must change that code live.

### [TP-p3] The component table · team rules · Git
| Component | What the owner personally delivers and is asked about (sample fair question) |
|---|---|
| **Protocol and client** | The wire format (message names, fields, framing, error replies) and the client program. *"A client dies half way through a submit. Where does your read loop handle that?"* |
| **Scheduler and policy** | The job queue, the chosen policy, the dispatch decision, and a trace that proves the policy behaves as claimed. *"Switch to priority now. What starves, and what stops it?"* |
| **Worker and limits** | fork, exec, wait, output capture, the timeout kill, honest exit status, no zombies. *"Which line turns a timeout kill into KILLED, not DONE 0?"* |
| **Durability and recovery** | In Phase 1: the job table and its states, cancel, and what happens when a worker says goodbye. Phase 2 adds the rest. *"I cancel a running job. Which processes notice, and how?"* |
| **Operations and report** | The Makefile, the repository and its history, the report. In a team of five, also the next row. *"Show me a fresh clone building, and where the trace in your report came from."* |
| **Testing and load** (6th component, teams of six) | The script that starts eight clients at once; a self-check script that runs the twelve rows of §5.4 unattended; the zombie and descriptor checks. *"Run the test that proves no descriptor leaks. Which check would have caught last week's bug?"* |

- ⭐ Write **the owner of every component and the team leader into `README.md` in the first commit**, next to your team number.
  - Nobody checks it before the end of the semester.
  - But the git history shows when you actually started, and that the work was not prepared one day before the deadline.
- ⭐ **The team leader is a role, not a component.**
  - The leader coordinates, runs the weekly meeting, merges the branches, keeps the report moving, *and* still owns a component.
  - There is no component called "management".
- **Team sizes:**
  - A team of 6 declares 6 components.
  - A team of 5 declares 5; the operations owner also takes testing and load.
  - A team **smaller than five still declares all five components**: members divide them, one member may own several, and each member answers for every component they own. "The project does not get smaller with the team."
- ⭐ **Job ids start with your team number:** team 12 issues `T12-1`, `T12-2`, …
- **"Git, if it is new to you":**
  - Code lives in a git repository on GitHub or GitLab (free accounts), and every member pushes their own commits.
  - Tutorials named on the page: git-scm.com/docs/gittutorial and learngitbranching.js.org.
  - Five commands are enough: `clone`, `add`, `commit`, `push`, `pull`.
  - "Commit small and often; your history is part of what we read."

### [TP-p4] §4 What the system must do · 4.2 The time limit · 4.3 The scheduling policy
| Operation | What happens |
|---|---|
| `submit` | The client sends a command, a **timeout in seconds** and, optionally, a priority. The server answers with a new job id. The job is **QUEUED**. |
| `status` | The server answers with the job's state: **QUEUED**, **RUNNING**, **DONE** with its exit code, **KILLED** with the reason, or **CANCELLED**. |
| `cancel` | A QUEUED job leaves the queue. A RUNNING job is killed by its worker. Either way the state becomes **CANCELLED**. A finished job cannot be cancelled. |
| `fetch` | Everything the job printed, standard output **and** standard error, in the order the job wrote them (send both into the same pipe). At least the first **64 KiB**; above your own limit, cut it off and state the limit in the report. **Only for finished jobs.** |

- ⭐ **A job runs under fork and exec, always through the shell:**
  - The child execs `/bin/sh` with `-c` and the command string, so that `exit 3`, pipes and quotes behave exactly as in a terminal.
  - **Do not split the command into words yourself.**
  - Output is captured through a pipe or a file on the worker, and kept where `fetch` can find it (on the server or on the worker: your design).
- ⭐ **"Exit status, honestly."** `waitpid` gives a status integer.
  - `WIFEXITED(st)` is true if the child called `exit`; then `WEXITSTATUS(st)` is its exit code (0 for success, 3 for `exit 3`).
  - `WIFSIGNALED(st)` is true if a signal killed it; then `WTERMSIG(st)` is the signal number (9 for SIGKILL).
  - A killed job is reported as **KILLED**, never as **DONE 0**. "Exit 137 is not success."
  - 🔎 Look up in Track B: why a shell shows 137 for a SIGKILLed child.
- **4.2 The time limit:**
  - Every job carries a client-chosen timeout. The worker starts a timer with the job; if the job is still running when it fires, the worker kills it, and the state becomes **KILLED TIMEOUT**.
  - The kill must take **everything the job started**: `sh -c "sleep 100"` is two processes, and killing only the shell leaves `sleep` alive.
- ⭐ **Process groups:**
  - In the child, right after `fork`, call `setpgid(0, 0)`. The job becomes its own process group, and everything it starts inherits the group.
  - Later `kill(-pid, SIGKILL)`, **with a minus sign**, kills the whole group. Use the same call for `cancel`.
  - For the timer, use `alarm()` or a helper process that sleeps and then kills: your choice.
- ⭐ **The worker must remember *why* it killed a job**, because `waitpid` cannot tell a timeout from a cancel from a kill by somebody else.
  - Timeout → **KILLED TIMEOUT**
  - cancel → **CANCELLED**
  - anything else → **KILLED SIGNAL** with the number
- **4.3 The scheduling policy:**
  - A worker runs at most **K jobs at once**. K is given on the worker's command line (default 1), and the worker tells the server its K **in its first message**.
  - The server keeps a count of free slots per worker. Whenever a worker has a free slot, the server picks the next QUEUED job: **that choice is the policy**.
  - **FIFO** (the oldest job first) is the minimum and where everyone starts. Beyond it, choose one of these, or design your own and name it in the report:
    - **Shortest job first:** the smallest timeout first, the timeout being your only estimate of length. *Long jobs starve; aging fixes that.*
    - **Priority with aging:** highest priority first. 9 is the highest; the default 0 is the lowest, so a job that says nothing never jumps the queue. A job that has waited long enough gains priority, so nobody waits forever.
  - Link to this week: starvation is exactly the S14-p7 idea, "never chosen although everybody else keeps moving".

### [TP-p5] MLFQ · 4.4 Many clients at once, and clean hygiene · 4.5 Transport · §5 contract
- **Multi-level feedback queue:**
  - Several queues, with demotion after a quantum.
  - It is **preemptive**, so the server must tell the worker to **pause** and **resume** a job, because only the worker can signal it (SIGSTOP and SIGCONT on the job's process group).
  - A paused job stays on its worker, frees its slot, and still reports RUNNING. The page calls this one "Hard".
- ⭐ The assistant's script **never tests the policy**. Your **report's trace** and the scheduler owner's questions at the fair do. "A team that stays with FIFO has nothing to say there and nothing to defend."
- The optional priority on `submit` is an integer **0–9**; FIFO and shortest job first ignore it.
- ⭐ **4.4 hygiene rules:**
  - **At least 8 clients at once.** A client that connects and says nothing for ten seconds must not stop another client from submitting. A server that forks per client, or keeps a pool, does this; the one-at-a-time server does not.
  - **Zero zombies.** Every child is reaped: either the SIGCHLD reaper with the `waitpid(-1, …, WNOHANG)` loop from Homework 1, or a `waitpid` on each job you know.
  - **Zero leaked file descriptors.** Close both pipe ends where they are not needed (the closing rule for pipes) and every connection you finish with. "We count open files before and after a hundred jobs; the number must not grow."
  - **Clean shutdown on SIGTERM.** Handle the signal; do not die from it.
    - The **server** prints a line, closes its listening socket and exits **within two seconds**; a new server on the same port starts immediately afterwards.
    - A **worker** kills its running jobs, reaps them, reports them as **KILLED SIGNAL 9**, and only then exits, also within two seconds.
    - If the server cannot be reached at that moment, the worker still kills, reaps and exits. The report is best effort, never a reason to hang.
    - A worker that vanishes *without* warning is Phase 2's subject.
- **"Counting open files":** `ls /proc/<pid>/fd | wc -l` lists a process's open descriptors and counts them. Run it on the server and the worker before and after a loop of a hundred `echo hi` jobs.
- ⭐ **4.5 Transport:**
  - Client to server: **TCP**. Server to worker: **TCP, and the worker connects to the server**. So the server needs no list of workers, and your laptops' firewalls stay closed.
  - The wire format is yours. Use **one line per message, ending in `\n`, read in a loop**, because "one write is not one read".
  - The exception is the answer to `fetch`. It has many lines and may end without a newline, so it needs **a length prefix or an end marker**.
  - `net.h` from Homework 2 may be used unchanged.
- ⭐ **§5 The command-line contract:**
  - The assistant checks the core behaviour with **one script, run on every team's repository**. So the contract is exact; the inside of your programs and your protocol are free.
  - "Deviating from it fails every check the script cannot reach."
  - §5.1 Building is marked "(we will cover the `make` soon)".

### [TP-p6] 5.1 Building · 5.2 Starting the programs
```
$ git clone <your repository> team12 && cd team12
$ make                     # in the root of the repository, produces three executables:
$ ls server worker client  # exactly these names, in the root
```
- ⭐ **Build rules:**
  - `make` must succeed on a fresh **Ubuntu 22.04 or 24.04** with **`build-essential` and nothing else**; `make clean` removes what it built.
  - Warnings are allowed; errors are not.
  - Suggested layout: `src/` for the three programs and their shared headers, `tests/` for your scripts, and `README.md` with the team number, the team leader and the owner of every declared component.
  - **Do not** create folders named `server`, `worker` or `client` in the root: the executables need those names, and `gcc -o server` fails if a folder called `server` is already there.
- **"make, if it is new to you":** `make` reads a file named `Makefile` in the current folder and runs the commands needed to build whatever is out of date. The smallest one that satisfies the contract:
```
all: server worker client
server: src/server.c
        gcc -Wall -o server src/server.c
worker: src/worker.c
        gcc -Wall -o worker src/worker.c
client: src/client.c
        gcc -Wall -o client src/client.c
clean:
        rm -f server worker client
```
  - The indented lines begin with a **tab**, not spaces, or make refuses the file.
  - Add `-pthread` where you use semaphores, and list every `.c` file a program is built from.
- **5.2 Starting the programs:**

| Command | Behaviour |
|---|---|
| `./server <port>` | Listens on TCP `<port>` on all interfaces. Prints `server: listening on port <port>`, then one line per event (client connected, job accepted, job sent, job finished). Runs until SIGTERM. |
| `./worker <server-host> <server-port> [K]` | Connects to the server and prints `worker: connected to <host>:<port>, K=<K>`. Runs up to K jobs at once (default 1). Several workers may connect. Reconnecting after a server restart is welcome, not required in Phase 1. |
| `./client <server-host> <server-port> <verb> …` | One request, one answer, exit. If it cannot connect, it prints `client: cannot connect to <host>:<port>` to standard error and exits with **3**. |

### [TP-p7] 5.3 The four client verbs, exactly · 5.4 What the script does (rows 1–7)
| Verb and arguments | Prints to standard output | Exit code |
|---|---|---|
| `submit "<command>" <timeout> [priority]` | The new job id alone on one line, e.g. `T12-7`. `<timeout>` is in whole seconds, at least 1. | 0 |
| `status <id>` | One line: `T12-7 QUEUED` · `T12-7 RUNNING` · `T12-7 DONE 0` (the exit code) · `T12-7 KILLED TIMEOUT` · `T12-7 KILLED SIGNAL 9` (the signal number) · `T12-7 CANCELLED` | 0 |
| `cancel <id>` | `T12-7 CANCELLED`. If the job had already finished: `T12-7 ALREADY FINISHED`. | 0 · 1 |
| `fetch <id>` | The job's captured output, byte for byte, nothing added. If the job has not finished: nothing on standard output, and `T12-7 NOT FINISHED` on standard error. | 0 · 1 |
| any verb with an id the server never issued | `T12-99 UNKNOWN` | 2 |

- ⭐ The script compares the **first line** of the client's standard output and the **exit code**. Extra lines after the first are harmless; extra words on the first line are not. "Within 2 s" below is generous: the script waits twice that.
- **5.4:** "Run this yourselves before you upload." The script runs **everything on one machine over `127.0.0.1`**; two machines are checked live at the fair. `$C` stands for `./client 127.0.0.1 5000`.

| # | Step | Expected |
|---|---|---|
| 1 | `make` ; `./server 5000 &` ; `./worker 127.0.0.1 5000 1 &` | Three executables; the two start lines are printed. |
| 2 | `$C submit "echo hello" 10` → id; 2 s later `$C status <id>` ; `$C fetch <id>` | An id; `<id> DONE 0`; `hello` |
| 3 | `$C submit "exit 3" 10` ; `$C submit "ls /nonexistent" 10` ; status and fetch of both | `DONE 3`; `DONE 2`, and the fetched output contains `No such file` |
| 4 | `$C submit "sleep 100" 2` ; 4 s later `$C status <id>` ; then `pgrep -xf "sleep 100"` | `KILLED TIMEOUT`; `pgrep` finds nothing |
| 5 | `$C submit "sleep 30" 60` ; 1 s later status; `$C cancel <id>` ; status; `pgrep -xf "sleep 30"` | `RUNNING`; `CANCELLED`; `CANCELLED`; nothing running |
| 6 | With K = 1: three `sleep 3` jobs submitted back to back; `pgrep -xfc "sleep 3"` every half second until all three are DONE | The count never exceeds 1; all three `DONE 0` within 12 s |
| 7 | Eight clients started in the same second, each `submit "sleep 2" 10` | Eight different ids within 2 s; all eight `DONE 0` within 25 s |

### [TP-p8] 5.4 rows 8–12 · §6 The report and the fair
| # | Step | Expected |
|---|---|---|
| 8 | `nc 127.0.0.1 5000` connects and types nothing; meanwhile `$C submit "echo x" 10` | The submit gets its id within 2 s |
| 9 | `$C status T12-99999` | `T12-99999 UNKNOWN`, exit code 2 |
| 10 | `ps -o pid,ppid,stat,comm --ppid <worker pid>` after all of the above | No process in state `Z` |
| 11 | `ls /proc/<pid>/fd \| wc -l` for server and worker, before and after 100 `echo hi` jobs | The same number before and after, for both |
| 12 | `$C submit "sleep 30" 60` ; 1 s later `kill -TERM <worker pid>` ; 2 s later `$C status <id>` and `pgrep -xf "sleep 30"` ; then `kill -TERM <server pid>` and `./server 5000` again at once | `KILLED SIGNAL 9`; nothing running; the worker has exited with no zombies; the server exits within 2 s and the new one starts without `Address already in use` |

- **The pgrep / nc box:**
  - `pgrep` finds running processes by name; `pgrep sleep` prints the pids of every running `sleep`.
  - `-x -f` matches the **whole command line exactly**. So `pgrep -xf "sleep 100"` finds the job but neither the shell that started it (its line is `sh -c sleep 100`) nor the script's own waits.
  - `-c` counts instead of listing.
  - **nc** (netcat) connects to a port and waits for you to type: "a perfect silent client". Both tools are on every Ubuntu.
- ⭐ "Each row is pass or fail. A row the script cannot run because the contract was not followed fails."
- ⭐ **§6:** grading will be explained in **Details 2**, together with the twist cards and the dates. Already certain:
  - the **twelve rows of §5.4 are checked by script**;
  - **the report is read**;
  - **at the fair you are asked about your own component**.
- **6.1 The report:**
  - **One PDF, four pages maximum**, uploaded with the code. The template comes with Details 2.
  - It asks for: the design with one diagram, the protocol, the policy with a trace that proves it, the Phase 2 additions, the five owners, and **one real failure** you had, with your own logs and what you changed.
  - "Written from what you built, not what you hoped to build."
- ⭐ **6.2 The fair (the oral defence):**
  - **Five minutes of demo** on your own laptops, with server and worker on two physical machines.
    - The examiner may interrupt with a request: kill a worker mid-job, start eight clients at once, change K while running.
    - "nothing prepared in advance counts".
  - **Five to ten minutes of questions**, at the code, to members the examiner chooses, on the components they own. **"The grade is what you can explain and change live."**
  - The schedule and the booking come with Details 2.

### [TP-p9] §7 Where to start · design rules · upload checklist
- **"No deadlines, only an order"**, the one the lectures taught. Every step is something you did once in a homework:
  1. **The protocol on one page.** Message names, fields, one line per message. The protocol owner drafts it and everyone says yes. Nothing else starts before this page exists.
  2. **Hello across two machines.** One message over TCP and one reply, with `net.h` from Homework 2.
  3. **Server skeleton.** Accept a client, parse one `submit`, answer an id, serve several clients at once.
  4. **Worker.** Connect, announce K, receive a command, fork and exec it with its output in a pipe, wait, report.
  5. **`status` and `fetch`.** One job now makes the whole round trip: "the vertical slice. Celebrate."
  6. ⭐ **The queue and the policy.** "K slots per worker is the *limit* pattern; the queue is the pass shelf." These are the limit [S12-p4] (and S14-p11's `limit = Semaphore(3)`) and the pass shelf [S12-p7].
  7. **Timeout and cancel.** Process groups, `alarm`, `kill(-pid, …)`.
  8. **Eight clients and hygiene.** The reaper, the closing discipline, the SIGTERM handler; then run §5.4 yourselves.
- ⭐ **Three design rules that will save you in November:**
  - All job records live in **one table** in the server, and **every state change goes through one function**. Nobody writes `job->state = …` anywhere else.
  - A job record can be written out as **one line of text** and read back. Make that function exist even if nothing uses it yet.
  - The worker starts a job through **one function**, `run_job()` or whatever you name it, and nothing else calls `fork`.
- ⭐ **Upload checklist:**
  1. One upload per team on eClass: the repository URL **and** a ZIP of the same commit.
  2. `make` in the root builds `server`, `worker`, `client` on a fresh Ubuntu.
  3. `README.md` names the team number, the team leader and the owner of every component, and has done **since the first commit**.
  4. §5.4 passes on your own machine, with the commands exactly as written.
  5. `report.pdf` is in the root, four pages or fewer, on the Details 2 template.
- ⚠️ (cosmetic) Section 4 has no "4.1" heading; the operations table under "4." plays that role.

### Term project — summary
- **Phases:**
  - **Phase 1** = this document (Details 1): what you can build today.
  - **Phase 2** = Details 2, after the midterm: the additions for the second half of the course, twist cards, the grading and the dates. Already announced for it: the rest of durability and recovery, and a worker that vanishes without warning.
- **Team size:** registered team of **5–6**.
  - 5 components (6 for a team of six), one owner each, plus a team leader *role*.
  - Smaller teams still declare all five components.
- **Deliverables:**
  - One eClass upload per team: repository URL + ZIP of the same commit.
  - `make` builds `server`, `worker`, `client` in the root.
  - `README.md` (team number, leader, owners) since the first commit.
  - `report.pdf` (≤ 4 pages, Details 2 template).
  - §5.4 passing.
- **Deadlines:**
  - Details 1 issued **Oct 14**.
  - Upload **at the end of the semester** (exact date in Details 2).
  - Fair in the **December exam weeks** (schedule and booking in Details 2).
  - **No intermediate deliveries or checks.**
- **Grading:**
  - **20 %** of the course [TP-p1; also S01-p7]. Details come with Details 2.
  - Certain so far: the 12 script rows (pass/fail each), the report is read, and each member is questioned on their own component.
  - **Zero rules:** one-laptop demo = 0 for the whole project; an owner who cannot explain their component = 0 for that member; work not explainable or modifiable live = absent.
- **Oral defence (the fair):**
  - 5 min of live demo on two physical machines, with possible interruptions (kill a worker mid-job, eight clients at once, change K).
  - Then 5–10 min of questions at the code, per component owner.
  - "The grade is what you can explain and change live."

---

## 4. Homework guide (maps only, NOT solutions)

> Why no answers: grading is by **sampled oral checks**. "Submitted work that the student cannot explain is graded as not done" [S01-p8]. This section says **what is asked, where it was taught, and what to hand in**, never the answers.

### 4.1 HW1: recap (assigned 18.09.2026 · due 30.09.2026, 23:55 UTC+5, already past)
- **Format:**
  - 100 points / 40 = **2.5 %**, individual.
  - One ZIP, `SOC3010_HW1_<StudentID>_<Surname>.zip`, containing `report.pdf` (answers, screenshots, photos of your handwriting) and `src/`.
  - Report written with the template and exported to PDF; answers numbered like the handout. [HW1-p1]
- **Compile with** `gcc -Wall -o progname progname.c`, and fix warnings: "they are almost always a real bug". [HW1-p2]

| Part (points) | What it asked | Taught in |
|---|---|---|
| **1 Try it on your machine [10]** | 1.1 `multi_signal.c`: Ctrl-C, `kill -TERM`, `kill -USR1`, `kill -9`. Did the handler run, did the program survive? · 1.2 `fork()` in a loop of **4**: how many processes, how many `done` · 1.3 the `execlp("ls","ls","-l",NULL)` example: why the line after it never runs; was a new process created? · 1.4 bash `is_big()` returning a status read with `$?`: why does `return 0` mean success? | Lecture 2–4 (≈ Slides 2–4, approx.) |
| **2 Process graphs, by hand [20]** | 2.1 `q21.c` (A, fork, B, fork, C, fork, D): draw, count processes and letters · 2.2 `q22.c` (P; child prints C and exits; parent Q, `wait`, R): list **every** legal output with reasons · 2.3 `q23.c` = 2.2 without `wait`: which ordering became possible, which edge disappeared; run 20×. The method: nodes = operations (write, fork, wait, exit), a horizontal line = one process's timeline, a vertical arrow = `fork()`, a dashed edge = `wait()`. | Lecture 3 (≈ Slide 3, approx.) |
| **3 The shell [30]** | 3A `user.sh`, `number.sh` (one `if` with a logical operator) · 3B `jobctl.sh`, 8 graded requirements: file tests 2, `valid_name()` returning a status 2, loop over names 2, array 2, arithmetic 2, background jobs + `jobs` 2, exit codes **0/127/126** 2, `trap` on SIGINT and EXIT 1 · 3C a job-control session by hand: Ctrl-C then `echo $?` (built from 128 + a signal number), Ctrl-Z, `jobs`, `bg`, `fg %2`, `ps -o pid,ppid,pgid,sid,stat,comm`, `kill -INT -<PGID>`, the `export` experiment, plus 4 questions | Lecture 4 (≈ Slide 4, approx.) |
| **4 Zombies [20]** | 4.1 `zombie.c` (4 children, the parent never waits, so `ps --ppid` shows 4 × Z) · 4.2 `reaper.c`: SIGCHLD via **sigaction** (4), the `while (waitpid(-1, NULL, WNOHANG) > 0)` loop + a count (3), a SIGINT flag handler (2), report the count (1) · 4.3 three questions (why the while loop; two reasons for sigaction over signal; what happens to the zombies when the parent exits) | Lecture 3 (≈ Slide 3, approx.) |
| **5 CPU scheduling, by hand [20]** | 5.1 SRTF preemptive (P1 0/8, P2 2/4, P3 4/1, P4 5/3; arrival/burst) with the remaining-time table · 5.2 preemptive priority, smaller number = higher (P1 0/7/3, P2 1/4/2, P3 3/2/1, P4 6/3/4) + who risks starvation and the fix's name · 5.3 RR q = 3 (P1 9, P2 4, P3 6, P4 2) + context switches for a 10 ms job with q = 12, 5, 1. Turnaround = completion − arrival; waiting = turnaround − burst. | Lecture 5 (≈ Slide 5, approx.) |

- ⭐ **Midterm relevance:** "Drawing by hand is how this becomes fast for you in the exam, and the midterm will ask for exactly these two skills" (process graphs, Gantt charts) [HW1-p1]. Part 2 is "the single most exam-relevant thing in this assignment" [HW1-p4]. Typed Gantt charts and typed process graphs scored zero.
- **It carries forward:**
  - The HW1 SIGCHLD reaper is required again in HW2 4.1 [HW2-p7] and in the term project [TP-p5].
  - SJF/priority starvation and aging come back in the term project's policy [TP-p4].
- ⚠️ (minor) The HW1 template's headings differ slightly from the PDF: it names 1.2 "Counting what fork() prints" and adds an extra prompt to 1.1, "Why did case 4 behave differently?". The PDF's numbering is the one graded.

### 4.2 HW2: the map (assigned 10.10.2026 · ⭐ due **Sat 24.10.2026, 23:55 (UTC+5)**)
- **Header** [HW2-p1]:
  - 100 points / 40 = **2.5 %** of the course; **individual**; one ZIP with source code.
- **Deliverable:**
```
SOC3010_HW2_<StudentID>_<Surname>.zip
├── report.pdf      ← answers, screenshots, photos
└── src/
    ├── ……
```
  - The source files the PDF explicitly asks for in `src/`: `pipeline3.c` (Part 3), `greet_server.c` and `greet_client.c` (4.1), and `server_pool3.c` (4.2).
- **Points per part:** Part 1 **25** · Part 2 **10** · Part 3 **15** · Part 4 **25** · Part 5 **10** · Part 6 **15** (= 100).
- ⭐ **Rules that cost marks** [HW2-p1]:
  - **Report:**
    - One PDF, written in Word or LibreOffice **using the template**, exported to PDF.
    - Number the answers exactly like the handout (1.1, 2.3, 5.4).
  - **Given files:**
    - `hw2-starter.zip` from eClass.
    - **Never edit `shared_mem.h` or `net.h`**; you include them.
    - Keep both headers in the same folder as your `.c` files.
  - **Platform:** work on your **Ubuntu VM**. macOS does not implement `sem_init`.
  - **Compiling:** `gcc -o name name.c`, then `./name`. Anything using a semaphore needs **`-pthread` at the end**: `gcc -o counter_sem2 counter_sem2.c -pthread`.
  - **Screenshots:**
    - Your own terminal on your own VM, with the **prompt visible** (`student@ubuntu:~$`).
    - The **command visible**.
    - **Readable**: no phone photos; use PrtSc or the Screenshot app.
    - "A screenshot with no prompt in it is worth zero marks."
    - Two-terminal tasks: both windows in one shot, or two side by side, labelled **"server"** and **"client"**.
  - **Handwriting:**
    - **Parts 2, 5 and 6 on paper**, with name and student ID on every sheet, photographed.
    - **Typed descriptor tables, typed timing tables and typed trace tables score zero.** "The midterm will ask for exactly these skills."
    - Exceptions written in the PDF: 2.2 may be "the photograph or just text", and the 4.2 table "may be typed".
- **Disclosure and AI rules:**
  - The **HW2 PDF itself has no AI clause** (I checked the full text). Its integrity rules are the screenshot and handwriting rules above.
  - The **HW2 template** starts with Student ID, Section (001–004), and this **Declaration**: "The code, the screenshots and the handwriting in this report are my own work. Every screenshot was taken on my own machine. I can explain and modify any part of this submission on request." It is followed by **"Signature (type your full name)"**.
  - **Course policy** [S01-p8]:
    - You may use AI tools for studying and as a coding assistant, but **any use must be disclosed in the submission**.
    - Grades are decided by what you can **explain and modify in person**, through **sampled oral checks** on home assignments.
    - Work you cannot explain is graded as not done.
    - "Late submissions will not be accepted".

#### Part 1: Try it on your machine (25 pts)
"run it, screenshot it, and explain in one to three sentences what the OS did" [HW2-p2]

| Item | What to do / hand in | Study first | Starter file(s) |
|---|---|---|---|
| **1.1** Read until 0 | Run `pipe_eof`. Screenshot + 2 sentences: what `read` returning 0 means, and which **two** `close`s (one per process) made it possible. | S06 p9–p10: EOF on a pipe, the Sacred Rule of Closing (approx.) · Lab 1 A2 | `pipe_eof.c` ⚠️ see below |
| **1.2** One forgotten close | Put the parent's `close(p[1])` (marked *THE line of Part 1.2*) inside `/* … */`, rebuild, run: three lines, then it hangs; stop with Ctrl-C. Screenshot of the hang + 2 sentences: which process sleeps, in which call, waiting for *whose* write end. | S06 p9–p10 (approx.) · Lab 1 A2 "Break the Sacred Rule of Closing" | `pipe_eof.c` |
| **1.3** The line that prints twice | Run `twice`; then remove the `/*` `*/` around the `setvbuf` line and run again. Both screenshots + 2 sentences: where was `"hello "` when `fork` ran? (The template also asks what `setvbuf(stdout, NULL, _IONBF, 0)` changed.) | S06 p6 "printf is buffered" (approx.) · the **setvbuf box on [HW2-p2]** | `twice.c` |
| **1.4** A pipe with a name | T1: `mkfifo /tmp/hw2fifo`, `ls -l /tmp/hw2fifo`, `cat /tmp/hw2fifo`; T2: `echo "hello from bash" > /tmp/hw2fifo`. Two-terminal screenshot + the first letter of the `ls -l` line and the file's size, and why. | S07 (FIFOs) | none (shell only) |
| **1.5** Who waits at the door | Three runs: (a) `rm -f /tmp/demo_fifo`, then `./reader` alone; (b) `./writer`, wait 5 s, then `./reader`; (c) `./reader` first, then `./writer`. One screenshot per run; (a) why the error; (b)(c) who waited, in which call, what woke it. | S07 p6–p7 (writer/reader, "open blocks") (approx.) | `writer.c`, `reader.c` |
| **1.6** The lost update | `counter_race2` ×3 and `counter_sem2` ×3, then `time ./counter_race2` and `time ./counter_sem2` (read the `real` line). One screenshot + 3 sentences: why the first three differ, why the last three are exactly 2000000, which is slower and why. | S08 p11–p14: lost update, race condition (approx.) · S09 (a semaphore used as a lock) | `counter_race2.c`, `counter_sem2.c`, `shared_mem.h` (`-pthread`) |
| **1.7** Taking turns | Run `pingpong` and `order_sem`. One screenshot + answers: in `pingpong` which semaphore starts at 1 and which at 0, and what would print if both started at 0; in `order_sem`, with `sleep(5)` instead of `sleep(1)`, can B come first, and why not? | S09 · S12-p3 (start values per job) · S14-p13 ("0 is a message, 1 is a key") | `pingpong.c`, `order_sem.c`, `shared_mem.h` |
| **1.8** Your first server | T1 `./echo_server`; T2 `./client localhost hello`, then `./client localhost "operating systems"`. Two-terminal screenshot + 1 sentence: which line the server prints when a client hangs up, and what its `read` returned. | S10 (sockets; `net.h` on p10, approx.) | `echo_server.c`, `client.c`, `net.h` |
| **1.9** Two errors, on purpose | (a) Stop the server, run `./client localhost hello`; (b) start `./echo_server` in two terminals. A screenshot of each error + 1 sentence each: what the OS told you, and why. | S10 p5–p6 (approx.) | `echo_server.c`, `client.c` |
| **1.10** Leave the machine *(optional)* | `hostname -I`. Option 1: a classmate on the same Wi-Fi runs `./client <your address> hello`. Option 2: use your own address instead of `localhost`. Screenshot with `hostname -I`, the server terminal and the client command; say which option. | S10 | `echo_server.c`, `client.c` |
| **1.11** One operator or many | T1 `./server_one`; T2, on one line: `./timed_client localhost A & ./timed_client localhost B & ./timed_client localhost C &`; repeat with `./server_fork`. Both screenshots + 2 sentences: explain the times (2, 4, 6) vs (2, 2, 2), and where the other two clients were while the first was served by `server_one`. | S11 (Design 1 vs a process per client, p2/p10, approx.) | `server_one.c`, `server_fork.c`, `timed_client.c` |

- ⚠️ **Starter-file trap (checked in both the zip and the unzipped folder).**
  - In `pipe_eof.c` the parent's `close(p[1])` (line 47, *THE line of Part 1.2*) **already ships commented out with `//`**.
  - As given, the program therefore behaves like the 1.2 version.
  - 1.1 expects a run where `read` returns 0. Make sure that line is **active** for 1.1, then disable it with `/* … */` for 1.2, as the PDF says.

#### Part 2: Pipes and descriptors, by hand (10 pts; paper + photo)
- **2.1 Count the ends.**
  - The given code: a child that does `dup2(p[1], 1)`, closes both ends and runs `execlp("ls"…)`; a parent that closes `p[1]`, reads until 0, then waits.
  - Draw the **descriptor tables (fd 0–4) of parent and child at three moments**:
    1. right after `fork`;
    2. after the child's `dup2` and its two `close`s;
    3. after the parent's `close(p[1])`.
  - Each box says *terminal / read end / write end / free*.
  - Hand in the photo + (a) at moment 3, how many descriptors in the whole system refer to the write end, and who holds them; (b) the two things that must happen before the parent's `read` returns 0.
- **2.2 Finish, sleep forever, or killed?**
  - Three short programs: (a) a pipe with a child writer and a parent read loop; (b) two pipes, `down` and `up`, with a request/reply exchange; (c) a FIFO "nobody else opens".
  - For each: *finishes / sleeps forever / killed by a signal*; name the process and the call where it stops, and what it prints first.
  - Hand in the photo **or just text**, one line per program.
- **Study:** S06 (pipe, `dup2`, EOF, blocking reads, the Sacred Rule of Closing; p9–p10, approx.) · S07 (FIFO `open` blocks) · Lab 1.
- **Starter:** none needed. `pipe_eof.c` is a runnable model of pipe + fork + close.

#### Part 3: Pipes and FIFOs in C (15 pts)
- **`pipeline3.c`:** write the shell line `ls /etc | grep conf | wc -l` in C.
  - Two pipes, three children, and a parent that behaves like the shell.
  - Expected usage: the shell line prints a number, and `./pipeline3` prints **the same number**, then `3 children finished`.
- **The 6 requirements** (paraphrased):
  1. Both pipes are created before the first `fork`.
  2. Each child redirects with `dup2`, then `execlp`:
     - child 1: stdout into pipe 1, becomes `ls /etc`;
     - child 2: stdin from pipe 1, stdout into pipe 2, becomes `grep conf`;
     - child 3: stdin from pipe 2, becomes `wc -l`.
  3. ⭐ **The Sacred Rule:** every child closes all **four** pipe descriptors after its `dup2`s, and the parent closes all four.
  4. The parent waits for all three children, then prints `3 children finished`.
  5. A screenshot with the shell line and `./pipeline3` printing the same number.
  6. Break it on purpose: comment out the parent's close of **pipe 2's write end**. Screenshot the hang, stop it with Ctrl-C, write two sentences (who sleeps in which call, waiting for whose descriptor), then **restore the line**.
- **Hand in:** `pipeline3.c` in `src/`, the screenshots of rows 5 and 6, and the two sentences of row 6.
- **Study:** S07 p9 "What is a pipeline?" (approx.) · S06 p10 Sacred Rule (approx.) · Lab 1 ("build your own pipeline in C").
- **Starter:** none. Write it yourself. Per [HW2-p2], put `setvbuf(stdout, NULL, _IONBF, 0);` as the first line of `main` in every program that calls `fork()`.

#### Part 4: Sockets in C (25 pts)
- **4.1 `greet_server.c` + `greet_client.c`**, "a call centre in which one call can carry many messages".
  - The sample output on [HW2-p6] fixes the exact text. The receptionist prints `receptionist <PID>: waiting on port 5000`. Each operator answers `client: hello <name>, I am operator <PID> (message <k>)` and finally logs `operator <PID>: client left after <k> messages`.
  - **The 7 requirements** (paraphrased):
    1. Client: `client_connect` once. For each name from `argv[2]` on: write the name + `"\n"`, `read_line` the answer, print it, `sleep(1)`. `close` at the end.
    2. Server: `server_listen(5000)` once; then forever `server_accept`, `fork`.
    3. The child closes `L`; the parent closes `c` right after the fork; the child `exit`s after serving.
    4. The child loops on `read_line` until it returns 0, answering every line with the format above.
    5. On hang-up the operator prints its "client left" line; the receptionist prints its PID once at the start.
    6. No zombies: Homework 1's SIGCHLD handler via `sigaction` + `SA_RESTART` + the `waitpid(-1, NULL, WNOHANG)` loop, "as in `server_fork.c`".
    7. Screenshots: three terminals with two clients at the same time; then `ps -o pid,ppid,stat,comm --ppid <receptionist PID>` after both finished, showing no `Z`.
  - **Hand in:** both files in `src/`, the row-7 screenshots, and two sentences: why each client sees a different operator number, but the same number for all of its own messages.
  - **Study:** S10 (`net.h` p10, the byte-stream exercise p13, approx.) · S11 (a process per client p10, zombies p7, approx.) · HW1 Part 4 (the reaper).
  - **Starter used:**
    - `net.h`: include it, don't edit it. Read its comments on `server_listen`, `server_accept`, `client_connect` and `read_line`.
    - `server_fork.c`: the model for sigaction, fork per client, and close L / close c.
    - `client.c`: the model for connect, write, `read_line`.
- **4.2 Timing the designs.**
  - Copy `server_pool.c` to `server_pool3.c` and set `POOL` to 3.
  - ⭐ **Before running anything**, fill the *predicted* column for five clients that each need 2 s.
  - Then, for each of `server_one`, `server_fork`, `server_pool`, `server_pool3`: start it, run `for n in A B C D E; do ./timed_client localhost $n & done`, screenshot, stop it.
  - Table columns: predicted reply times · measured reply times · server processes at the busiest moment.
  - **Hand in:** `server_pool3.c` in `src/`, the filled table (**may be typed**), the four screenshots, and two sentences: which client got which time changed from run to run; did the *set* of times change, and why?
  - **Points:** predicted 2, screenshots 2, processes column 1, sentences 1.
  - **Study:** S11 (Designs 1–3; the pool on p11, approx.) · S14-p15 ("k barbers, same program: the pool is a barber shop").
  - **Starter:** `server_one.c`, `server_fork.c`, `server_pool.c`, `timed_client.c`, `net.h`.

#### Part 5: Sockets and servers, by hand (10 pts; paper + photo)
- `serve(C)` is Slide 11's: `name = read(C)`, work, `write(C, "done " + name)`.
- **5.1 Six clients, three seconds each.**
  - A–F connect at the same moment, in that order; every request needs 3 s.
  - For **Design 1** (one at a time), **Design 2** (a process per client), **Design 3** (a pool of 2, and a pool of 4), fill each client's reply time, when everything is done, and how many server processes exist at the busiest moment.
- **5.2 Three more broken servers, P, Q, R.**
  - Each is the process-per-client server with one change:
    - P adds a `wait()` in the parent loop;
    - Q's child has no `close(C)`;
    - R's parent closes `L` instead of `C`.
  - Clients A, B, C each need 2 s. For each server: what do the clients see (reply times, or no reply), is it broken at all, and the one-line fix. Write 3–4 lines per server.
- **5.3 Who sleeps where?**
  - The setup: the one-at-a-time echo server; client A connects at t = 0 and sleeps 60 s ("lunch"); client B connects at t = 1, writes `hi\n` and reads.
  - (a) At t = 10 s, for each of the three processes: asleep or not, in which call, and what will wake it.
  - (b) When does B print `hi`?
  - (c) What changes with a process per client?
- **5.4 A stream of bytes.**
  - The client writes `"AB"`, `"CD\n"`, `"EF\n"`, then closes. Server (a) does one `read(C, buf, 100)`; server (b) does two `read_line`s.
  - (a) For each of `AB` · `ABCD\nEF\n` · `A` · `CD\n` · `ABC`, say possible or impossible, with a reason.
  - (b) What does server (b) print, and can it ever print anything else?
- **Study:** S11 (the server designs, `serve`) · S10 p13 "Exercise: A Socket Is a Stream of Bytes" (approx.) · `net.h`'s `read_line` comment · HW2 1.11 and 4.2, which you will have *measured*.

#### Part 6: Semaphores, by hand (15 pts; paper + photo)
- Trace tables in **Slide 9's form: `# · operation · S · sleeping · inside`**.
- The PDF restates the golf-hole model: the value is the number of flags in the hole; `wait` takes a flag or sleeps beside the hole; `post` puts a flag back or hands it to a sleeper.
- **6.1 Trace the value.**
  - S starts at **2**. Fill one row for each of the 10 given steps (P1–P5 doing `wait(S)`/`post(S)`).
  - Add one sentence: at step 5 you could not know who got the flag. Which later step told you?
- **6.2 Which outputs are possible?**
  - (a) **[3]** `s = 0, t = 0`. P1 prints A, `post(s)`, prints B, `post(t)`; P2 does `wait(s)`, prints C; P3 does `wait(t)`, prints D. List every output with a one-line reason, and say whether **ADBC** is possible.
  - (b) **[1]** One lock L, three processes each printing two letters between `lock`/`unlock`. How many different outputs? List them.
- **6.3 Fill the blanks.**
  - The output must always be **A B C D**. P1 has blanks around `print("A")` and before `print("D")`; P2 and P3 have blanks around `print("B")` and `print("C")`.
  - Fill the blanks with `wait(…)`/`post(…)`, **one semaphore per arrow**, and give every start value. Some blanks stay empty.
  - Add one sentence: a classmate used **one** semaphore for all three arrows. Give one output his program can produce that yours cannot.
- **6.4 From a drawing to a program.**
  - The graph has arrows **A→C, B→C, C→D, C→E**. Processes PA…PE print one letter each.
  - (a) The minimum number of semaphores and their start values. (b) The five processes in pseudo-code. (c) Every possible output.
- **6.5 Two keys.**
  - `S = 1, T = 1`. P1 does `wait(S); wait(T); print("X"); post(T); post(S)`. P2 does `wait(T); wait(S); print("Y"); post(S); post(T)`.
  - The PDF defines **deadlock** (Slide 6 used the word for two pipes): "a group of processes in which every one is asleep, waiting for a flag that only another sleeper in the group could post. Nobody ever wakes."
  - (a) A **four-step** trace table after which both sleep forever.
  - (b) A change to **one** process that makes this impossible, and why it works.
- **Study:**
  - S09: p5 the trace table, p6 the homework "Trace the Value", p8 the golf hole, p9 fill-the-blanks / "one semaphore per arrow"; all approx.
  - S12: the five jobs, signal and lock; precedence arrows.
  - S13: p7–p8 "ABCDE for Ever" (approx.).
  - S06: p9, the word *deadlock* (approx.).
  - **S14:** the *method* for 6.5. That means the circle test "who waits for whom" (p5, p10), the habit "never sleep holding the key" (p5, p10), and the format of p10's four-step table.
- **Starter:** none needed for the by-hand work. `pingpong.c` and `order_sem.c` are runnable examples of signal-style semaphores.

#### How Week 7 (S14) connects to HW2
- HW2 does **not** ask about readers–writers or the barber directly.
- What carries over:
  - the trace-table conventions (Part 6);
  - the deadlock "circle" reasoning (6.5);
  - "0 is a message, 1 is a key" (1.7, 6.3, 6.4);
  - "the pool is a barber shop" (4.2, 5.1).

---

## 5. Classical-problems cheat-table
The code is shown in compact form, with `;` separating lines; the exact code is in §2. "READ", "WRITE", "USE" and "CUT" stand for the critical work.

| Problem | Semaphores (start values) | Roles' code | Danger | Fix, as taught |
|---|---|---|---|---|
| **One lock for the board** [p4–p5] | `board = 1` | W: `wait(board); WRITE; post(board)` · R: `wait(board); READ; post(board)` | Correct, but readers are serialised: 3 × 2 s = **6 s instead of 2** | The lightswitch |
| ⭐ **Lightswitch readers–writers** [p5] | `board = 1`, `mutex = 1`, `readers = 0` (shadow counter) | W: unchanged · R: `wait(mutex); readers+1; if readers==1: wait(board); post(mutex); READ; wait(mutex); readers−1; if readers==0: post(board); post(mutex)` | ⭐ **Writer starvation**: `readers` never returns to 0 while readers overlap. Measured: 24 reads, **0 writes**, cook waits **10.0 s** (8/8 runs) | The turnstile |
| ⭐ **Turnstile fix** [p8] | `turnstile = 1`, `board = 1`, `mutex = 1`, `readers = 0` | W: `wait(turnstile); wait(board); WRITE; post(turnstile); post(board)` · R: `wait(turnstile); post(turnstile);` then the lightswitch reader | None (fair). The cost: **14–18 reads, 2–3 writes, wait ≤ 2.0 s** | — |
| **Variant A** [p9–p10] | as turnstile | W: `wait(turnstile); post(turnstile); wait(board); WRITE; post(board)` | **Starvation again**: the gate is open while the cook waits. The cook sleeps on `board` for ever, which is *not* a deadlock | Keep the gate closed until written (the p8 writer) |
| ⭐ **Variant B** [p9–p10] | as turnstile | R: `wait(mutex); wait(turnstile); post(turnstile); readers+1; if ==1: wait(board); post(mutex); READ; …` | ⭐ **Deadlock**. The circle: W sleeps on `board` (held by R1), R1 sleeps on `mutex` (held by R2), R2 sleeps on `turnstile` (held by W) | Pass the gate *before* `mutex` (the p8 reader). "Never sleep holding the key." Check the circle |
| ⭐ **Categorical exclusion (bathroom)** [p11] | `room = 1`, `limit = 3`, `mutexC = 1`, `customers = 0` (mirror: `mutexS`, `staff`, implied 1 / 0) | C: lightswitch on `room` with `mutexC`/`customers`; then `wait(limit); USE; post(limit)`; then the leave-lightswitch · S: the mirror image with `mutexS`/`staff`, same `room` and `limit` | Wrong order (`limit` before the category): a customer **holds a place while sleeping on `room`**, so staff wait for places nobody is using. "Holding one thing while waiting for another is how every deadlock starts" | **Category first, place second** |
| ⭐ **Sleeping barber** [p13] | `customers = 0`, `barber = 0`, `mutex = 1`, `waiting = 0`, `CHAIRS = 2` | C: `wait(mutex); if waiting==CHAIRS: post(mutex); leave; waiting+1; post(mutex); post(customers); wait(barber); haircut` · B: `loop { wait(customers); wait(mutex); waiting−1; post(mutex); post(barber); CUT }` | **Balking** by design (a full house means you leave). Haircut order assumes the longest sleeper wakes first | — |
| ⭐ **Barber, two lines swapped** [p16] | same | C: `…; post(mutex); wait(barber); post(customers); haircut` | ⭐ **Deadlock on every run**: each waits for a post only the other can make, after his own `wait`. `timeout 5` → exit **124**; all processes in state **S** | The original order: `post(customers)` then `wait(barber)` |
| **k barbers** [p15] | same | Run the barber loop in **k** processes; change nothing | — | `post(barber)` = "a barber is free". It is a **pool** (S11's fixed team) |
| **Dining philosophers** [p1–p2] | not given in this deck | not given | (Syllabus: "why the naive solution deadlocks, the starvation scenario") [S01-p15] | 🔎 Look up in Track B until the next class deck |

---

## 6. Likely exam questions (built only from these materials)

1. State the readers–writers rule in one line. Why may readers share the board, while a writer must be alone?
2. Everybody uses `board = Semaphore(1)`. R1, R2, R3 arrive together and each reads for 2 s.
   - (a) Is it correct?
   - (b) When does the last reader finish?
   - (c) What did we lose?
3. Write the lightswitch reader and writer with all start values. Mark the "first in" and "last out" lines.
4. Why is `readers` an ordinary integer and not a semaphore? What protects it?
5. In the lightswitch, the first reader may sleep on `board` while holding `mutex`. Why is that allowed here? What is "the real test"?
6. Define starvation. How is it different from deadlock? Use the café example.
7. Explain "the arithmetic" of writer starvation under the lightswitch, and quote the measured result.
8. What is a turnstile, in code? Where does the writer take and release it? Give the four steps of "why it works".
9. What does the turnstile cost? Compare the measured numbers without and with the gate.
10. Variant A: the writer does `wait(turnstile); post(turnstile)` *before* `wait(board)`.
    - Is it correct? Is it fair?
    - Who can sleep for ever, and on which semaphore?
    - Is it a deadlock?
11. Variant B: the reader does `wait(mutex)` *before* `wait(turnstile)`. Give the four-step trace that ends with everybody asleep, and name the circle.
12. **MCQ.** In Variant B, which rule did R2 break?
    - A) never read a semaphore
    - B) never sleep holding the key
    - C) one semaphore per arrow
    - D) the first one in locks, the last one out unlocks
13. Categorical exclusion (the bathroom):
    - List the semaphores and their start values.
    - What does `limit` do?
    - Why must you take "the category first, the place second"?
14. **MCQ.** In the sleeping barber, the start values of `customers`, `barber`, `mutex` are:
    - A) 1, 1, 1
    - B) 0, 0, 1
    - C) 0, 1, 0
    - D) 2, 0, 1
15. Give the barber program's three questions and their three answers.
16. Six customers, two chairs, in the order of S14-p14.
    - Who leaves without a haircut?
    - In what order are the haircuts given?
    - What value does `barber` keep throughout, and why?
17. The customer's `post(customers)` and `wait(barber)` are swapped.
    - Give the two-row trace.
    - Why is it a deadlock on *every* run?
    - What does exit code 124 from `timeout 5` mean, and what does state `S` mean?
18. How do you turn the barber program into k barbers? What does `post(barber)` mean then, and which earlier server design is it?
19. **MCQ.** "Start value 0 is a ___; start value 1 is a ___."
    - A) key; message
    - B) message; key
    - C) lock; limit
    - D) signal; barrier
20. **True or false?**
    - (i) A program in which a process starves is incorrect.
    - (ii) Moving from one lock to the lightswitch changed the writer's code.
    - (iii) With the turnstile, the cook waited at most about one reading time in the measured runs.
    - (iv) Deadlocked processes keep using CPU while they wait.
    - (v) In the term project, "K slots per worker" is the limit pattern.

### Answers
1. "Any number of readers, or exactly one writer — never both."
   - Readers only look, so nothing changes while they read.
   - A reader during a write sees "half a price".
   - Two writers at once give the lost update, in chalk. [S14-p3]
2. (a) Correct: one key, never a reader with the cook. (b) **6 s** (R1 0–2, R2 2–4, R3 4–6), not 2. (c) The readers wait for each other for nothing, since reading changes nothing. [S14-p4, p5]
3. The start values are `board = 1`, `mutex = 1`, `readers = 0`.
   - The writer is `wait(board); rewrite; post(board)`.
   - The reader code is in §2 [S14-p5].
   - "First in" is `if readers == 1: wait(board)`; "last out" is `if readers == 0: post(board)`.
4. "You may not read a semaphore". So the readers count themselves in a **shadow counter**, guarded by `mutex`. [S14-p5; S09-p5]
5. The holder of `board` (the cook) never asks for `mutex`, so no circle of waiting can form. "Never sleep holding the key" is a safety habit; the real test is always the circle, *who waits for whom*. [S14-p5]
6. Starvation is "a process that is never chosen although the program is correct and everybody else keeps moving".
   - It is not a deadlock: the café is busy, and only the cook never gets the chalk.
   - In a deadlock, by contrast, "nobody can move". [S14-p7, p10]
7. The board is unlocked only when `readers` returns to 0. If a new reader comes in before the last one leaves, it never returns to 0, and W stays asleep on `board`.
   - Measured in 8 of 8 runs: **reads 24, writes 0, the writer waited up to 10.0 s**. He came at 1 s and got the board only after closing time (10 s). [S14-p7]
8. A gate everybody passes one at a time: `turnstile = Semaphore(1)`, used as `wait(turnstile); post(turnstile)`. The writer closes it (`wait(turnstile)`) before `wait(board)`, and opens it (`post(turnstile)`) after rewriting. Why it works:
   1. The waiting writer keeps the gate while it sleeps on `board`.
   2. The readers inside drain out.
   3. New readers queue at the gate.
   4. The last one out posts `board`; the writer writes, then opens the gate. [S14-p8]
9. Without the gate: 24 reads, 0 writes, a wait of up to 10.0 s. With it: **14–18 reads, 2–3 writes, at most 2.0 s** (about one reading time). The price is a little less reading. [S14-p8]
10. It is correct, but **not fair**: the gate is open while the cook waits, so new readers keep coming in.
    - The **cook can sleep for ever on `board`** while the readers keep moving.
    - That is starvation, **not a deadlock**. [S14-p10]
11. The trace (each row shows readers / board / mutex / turnstile after the step):

    | step | who | op | readers / board / mutex / turnstile | sleeping |
    |---|---|---|---|---|
    | 1 | R1 | enters, reads | 1 / 0 / 1 / 1 | — |
    | 2 | W | `wait(turnstile)`, `wait(board)` | 1 / 0 / 1 / 0 | W |
    | 3 | R2 | `wait(mutex)`, `wait(turnstile)` | 1 / 0 / 0 / 0 | W, R2 (holding mutex) |
    | 4 | R1 | leaving: `wait(mutex)` | 1 / 0 / 0 / 0 | everyone |

    The circle: W waits on `board` (R1 holds it); R1 waits on `mutex` (R2 holds it); R2 waits on `turnstile` (W holds it). [S14-p10]
12. **B.** R2 slept on `turnstile` while holding `mutex`. [S14-p10]
13. The semaphores:
    - `room = 1` (the empty bathroom), `limit = 3` (three places inside), `mutexC = 1`, `customers = 0`.
    - The staff mirror uses `mutexS` and `staff`.
    - So there are two lightswitches over the same `room`, and `limit` keeps at most three people inside (the limit pattern [S12-p4]).

    Why category first: the other order lets a customer **hold one of the three places while sleeping on `room`**, so staff who arrive wait for places nobody is using. "Holding one thing while waiting for another is how every deadlock starts." [S14-p11]
14. **B** (0, 0, 1). `customers` and `barber` are messages; `mutex` is a key. [S14-p13]
15. The three questions and answers [S14-p12, p13]:
    1. Who wakes the barber? The customer, with `post(customers)`.
    2. How does a customer know it is his turn? The barber calls him with `post(barber)` ("next!").
    3. How do we count chairs when a semaphore cannot be read? With `waiting`, a shadow counter changed only under `mutex`. At `CHAIRS` the customer gives the key back and leaves.
16. **C4** leaves (it found `waiting == 2`). The haircuts go **C1, C2, C3, C5, C6**. `barber` stays **0** because every `post(barber)` went straight to the customer asleep longest. [S14-p15]
17. Row 1: the Barber does `wait(customers)` and sleeps. Row 2: C1 arrives, sets `waiting` to 1, and sleeps on `wait(barber)` before posting `customers`.
    - Each waits for a post that only the other can make, after his own `wait`. So it is "a deadlock, on every run".
    - `timeout 5` kills the command after 5 s; exit code **124** means it *had to*, because the shop would never have closed by itself.
    - **S** = asleep, using no CPU. [S14-p16]
18. Run the barber's loop in **k** processes and change nothing. `post(barber)` now means "a barber is free". This is a **pool** (k workers taking jobs from one queue), Week 5's team of operators. "The pool is a barber shop." [S14-p15; S11 (approx.)]
19. **B.** "Start value 0 is a message; start value 1 is a key." [S14-p13]
20. The true/false answers:
    - (i) **False**: starvation happens in a *correct* program [S14-p7].
    - (ii) **False**: "The writer did not change" [S14-p5].
    - (iii) **True**: at most 2.0 s, about one reading time [S14-p8].
    - (iv) **False**: state S, asleep, using no CPU [S14-p16].
    - (v) **True**: "K slots per worker is the *limit* pattern" [TP-p9].

---

## 7. Self-check: "I can…"
- [ ] …state the readers–writers rule and explain "half a price" and the "lost update, in chalk". [p3]
- [ ] …write the **lightswitch** from memory with its start values, and point to the first-in and last-out lines. [p5]
- [ ] …fill the **S14-p6 chalkboard trace** with the course conventions (values never below 0, a post handed to a sleeper), and say who wakes W and when. [p6, S09-p5]
- [ ] …define **starvation vs deadlock** and explain p7's arithmetic and its numbers (24 reads, 0 writes, 10.0 s). [p7]
- [ ] …write the **turnstile** version, explain its four steps, and quote its cost (14–18 reads, 2–3 writes, ≤ 2.0 s). [p8]
- [ ] …judge any moved line with **"correct, fair, alive"**, and draw Variant B's four-step deadlock and its circle. [p9, p10]
- [ ] …write **categorical exclusion** (two lightswitches + `limit`) and explain why the category comes first. [p11]
- [ ] …write the **sleeping barber** from memory (start values, both roles) and answer its three questions. [p12, p13]
- [ ] …fill the **six-customers table**, explaining why C4 balks and why `barber` stays 0, and explain the **swapped-lines deadlock** (exit 124, state S). [p15, p16]
- [ ] …list **HW2's deliverables** and screenshot/handwriting rules, and the term project's **zero rules**, verbs, exit codes and what the fair tests. [HW2-p1, TP-p2, TP-p7, TP-p8]

---

## 8. Dates & deliverables summary

| When | What | Source |
|---|---|---|
| 18.09.2026 → **30.09.2026, 23:55 (UTC+5)** | HW1 assigned → due (**past**) | [HW1-p1] |
| 10.10.2026 | HW2 assigned | [HW2-p1] |
| Oct 14 | Term Project Details 1 issued | [TP-p1] |
| 18.10.2026 | This lecture (S14 slides dated 10/18/26) | [S14-p1] |
| Next class (Week 7, Part 2) | Dining philosophers, why the naive solution deadlocks, the starvation scenario, resource allocation graphs; **midterm workshop on process graphs, pipes and signals** | [S01-p15] |
| ⭐ **Sat 24.10.2026, 23:55 (UTC+5)** | **HW2 due**: `SOC3010_HW2_<StudentID>_<Surname>.zip` = `report.pdf` + `src/` (`pipeline3.c`, `greet_server.c`, `greet_client.c`, `server_pool3.c`). Late submissions are not accepted | [HW2-p1, p5–p7; S01-p8] |
| ⭐ **Week 8 (24–30 Oct 2026)** | **Midterm, 25 %**. The slides say only "It's midterm season. Enough said."; the date range comes from the course brief | [S01-p7, S01-p16] |
| After the midterm | **Term Project Details 2**: Phase 2 additions, twist cards, grading, dates, report template, fair schedule and booking | [TP-p1, TP-p8] |
| End of the semester (exact date in Details 2) | **TP upload**: one per team on eClass, the repo URL **and** a ZIP of the same commit | [TP-p1, TP-p9] |
| December exam weeks | **TP fair**: 5 min demo on two physical laptops, then 5–10 min of questions per component owner | [TP-p1, TP-p8] |

- **Course weights** [S01-p7]:
  - Attendance 10 %
  - Weekly quizzes (10) 10 %
  - Home assignments (4) 10 %; each HW is 100 points / 40 = 2.5 %
  - **Term project 20 %**
  - **Midterm 25 %**
  - Final 25 %
- **HW2 deliverable checklist:**
  - Use the template, with Student ID, section, the **Declaration** and a typed-name signature.
  - Number the answers like the handout.
  - Every screenshot shows the prompt and the command, readable, with "server"/"client" labels where relevant.
  - Parts 2, 5 and 6 are handwritten photos, with name and ID on every sheet.
  - Disclose any AI use [S01-p8].
  - Compile on the Ubuntu VM, with `-pthread` for semaphores.
  - Leave `net.h` and `shared_mem.h` unedited.
  - Fix the `pipe_eof.c` line before running 1.1.
- **Term project deliverable checklist** [TP-p9]:
  - The repo URL plus a ZIP of the same commit.
  - `make` builds `server`, `worker` and `client` in the root, on a fresh Ubuntu 22.04/24.04 with `build-essential`.
  - `README.md` (team number, leader, component owners) since the **first commit**.
  - §5.4 passes on your own machine.
  - `report.pdf` in the root, ≤ 4 pages, on the Details 2 template.
