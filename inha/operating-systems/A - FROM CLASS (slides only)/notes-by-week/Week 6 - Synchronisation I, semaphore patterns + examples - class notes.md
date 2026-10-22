# Week 6 — Synchronisation I: semaphore patterns & examples (CLASS NOTES — from slides only)

> Sources: Slide 12 [S12-p#] "Synchronisation I — Semaphore Patterns" (15 pages, dated 10/11/26), Slide 13 [S13-p#] "Synchronisation I — Examples on Paper" (17 pages, dated 10/13/2026), class code samples in `code-samples/W6/` (`code_samples.zip` → `sem_shm.h`, `shared_mem.h`, `shelf.c`, `stools.c`; `code samples (Slide 13).zip` → `pingpong.c`, `pingpong_both1.c`, `shared_mem.h`, `shelf_deadlock.c`, `stools.c`).
>
> **Track A only.** Everything here comes from those slides and that code. Where the slides stop, there is a one-line 🔎 pointer to Track B.
>
> Legend: ⭐ = the slide's own emphasis (yellow take-away bars, "rules that never change") · ⚠️ = typo, bug or trap · ✅ = checked by me, either by running every interleaving through a small model of the slides' own `wait`/`post` rules, or by compiling the class code.
>
> Course: SOC 3010 Operating Systems (SOC3010-003), Inha University in Tashkent, instructor Jalolliddin Yusupov. Midterm in week 8 (24–30 Oct 2026). The syllabus describes week 6 as a **paper workshop**: invariants and trace tables, filling in missing waits/signals, listing the possible interleavings, the catalogue of classic semaphore bugs, and precedence graphs. Every one of those has a section below.

---

## 1. Big picture

- **What synchronisation is.** Synchronisation means the rules that decide *who may do what, and when* while several processes share something. Its aim, in the slide's words: "make the answer independent of the interleaving" [S12-p2].
- **Mechanism vs pattern.** The OS gives the *mechanism*: an atomic counter, sleep, and wake exactly one. You give the *pattern*: which process waits, which one posts, and in what order. The pattern is the subject of this week [S12-p2]. ⭐ "The OS keeps the counter honest; using it in the right order is your job." [S13-p15]
- **The semaphore.** It is a counter that is changed atomically, with exactly two operations. `wait` takes a flag, or sleeps when there is none. `post` gives a flag back, or wakes **one** sleeper [S12-p3].
- ⭐ **"The start value is the meaning"** [S12-p3, S13-p2]. Start at 1 for a **lock**, 0 for a **signal**, N for a **limit** (multiplex), 0 and 0 for a **rendezvous**, and N, 0, 1 for a **bounded buffer** (the "trio"). The **barrier** uses mutex 1 plus gate 0 plus a shadow counter [S12-p6, S13-p2].
- ⭐ **Two rules that never change** [S13-p2]:
  1. Set the start value once, then only wait and post. Never read the value.
  2. On the shelf, wait for a place first, then for the key.
- **The café is the running picture** [S12-p2]: three stools (limit), two friends leaving together (rendezvous), a tour group (barrier), and the pass shelf between kitchen and dining room (bounded buffer).
- **Paper tools for the exam:**
  - The **trace table**: one row per `wait`/`post`, each value written *after* the step, and sleepers named [S13-p2].
  - **"List every output"**: the key keeps lines apart, and the signal puts them in order [S13-p10].
  - **Arrows** (X → Y: X must be printed before Y). Use one semaphore per arrow: wait on every arrow coming in, post on every arrow going out. In a cycle, exactly one flag exists at the start, and it says who goes first [S13-p7, S13-p8, S13-p6].
- **Bugs are single lines** [S12-p12, S13-p13]: the wrong wait order (deadlock), a forgotten post, a post twice, a long sleep inside the critical section, dying with the key, or reading the value. "One wrong line is enough: read every wait and every post."
- **In C:** the semaphores live in shared memory made *before* `fork()` and use `sem_init(&s, 1, value)`. Here 1 means "shared by processes". The slide's shelf runs 100000 plates, all in order [S12-p13, S12-p14]. ⚠️ This code does **not** run correctly on macOS: `sem_init` is not implemented there. Use the course's Linux container [sem_shm.h; ✅ tested].

---

## 2. Page-by-page notes

## Slide 12 — "Synchronisation I: Semaphore Patterns" (15 pages)

### [S12-p1] Title page
- SOC 3010 Operating Systems · **Synchronisation I · Semaphore Patterns** · Instructor: Jalolliddin Yusupov · j.yusupov@inha.uz · dated 10/11/26.
- No content beyond the title (Tux on a circuit board).

### [S12-p2] What Is Synchronisation?
- **Definition (yellow box):** "Synchronisation is the set of rules that decide **who may do what, and when**, when several processes share something." With such rules, the program's result stops depending on whatever order the scheduler happens to pick.
- **What the OS gives, what you give:**
  - The OS supplies the **mechanism**: an atomic counter, sleep, and "wake exactly one".
  - You supply the **pattern**: which process waits, which posts, and in what order. *The pattern is this week's subject.*
  - ⭐ "**Synchronisation** = make the answer independent of the interleaving."
- **Link to Week 4.** Week 4 gave you one counter with two operations. This week the same counter learns **five jobs**, "enough to run a whole café".
- **Picture "THE CAFÉ OF THE WEEK"** (four drawings):
  1. Three people on three bar stools at a counter: *three stools: a limit*.
  2. Two friends P1 and P2 at a table with two cups: *two friends: a rendezvous*.
  3. Three people standing in front of a row of vertical bars (a gate): *a tour group: a barrier*.
  4. A shelf with four dashed slots, two holding plates: *the pass shelf: a bounded buffer*.
- **Meme:** a sailor waving semaphore flags, captioned "Only two hours into my semaphore course and I'm already flagging…" (a pun on semaphore flags).
- **Reading box** (as listed on the slide): Allen B. Downey, *The Little Book of Semaphores* ch. 1–4 (free online) · Silberschatz §6.6 · OSTEP ch. 31. These notes do not use them. 🔎 Look up in Track B: those readings.
- **"Already yours, from Week 4":** `wait` and `post`, the golf flags, the trace table, `shared_mem.h`, and `sem_init(&s, 1, value)`. "Nothing else is needed this week."

### [S12-p3] What a Semaphore Is ⭐
- **Definition:** a **counter** that processes can decrease and increase **atomically**, and that makes a process **sleep** when there is nothing left to take. "That counter is the **semaphore**."
- **Golf-flag picture.** There are three putting greens with holes:
  - S = 3: three flags (red, blue, yellow) in the hole.
  - S = 1: one red flag.
  - S = 0: no flag, and "P4 zzz", meaning P4 is asleep waiting for a flag.
  - So the value = the number of flags in the hole.
- **"EXACTLY TWO (ATOMIC) OPERATIONS"** (exact code):
```
S = Semaphore(3)

wait(S):  if S > 0:  S = S - 1
          else:      sleep until S > 0,
                     then S = S - 1

post(S):  S = S + 1
          if someone sleeps on S:
              wake ONE of them
```
- ⭐ Yellow bar: **"Set the start value once; after that, only wait and post — never read the value."**
- **Table of jobs** (exact list items):

| start value | the job | in the café | taught |
|---|---|---|---|
| **1** | **a lock**: one process inside at a time | one key to the toilet | Week 4 |
| **0** | **a signal**: "A must happen before B" | "call me when the coffee is ready" | Week 4 |
| **N** | **a limit**: at most N inside at once | three stools at the counter | **today** |
| **0 and 0** | **a rendezvous** (French: *a meeting point*): two processes wait for each other | two friends agree to leave together | **today** |
| **N, 0 and 1** | **a bounded buffer**: a shelf with room for N things between two kinds of process (*bounded*: it has an end, it is not infinite) | the pass shelf between the kitchen and the waiters | **today** |

- **"Two operations, every time"**: `wait` and `post` never change. What changes is the **start value**, and **which** process waits and which one posts.
- ⭐ Yellow bar: **"The start value is the meaning."**
- Note: the barrier [S12-p6] is the extra "job" of the week. It isn't one start value; it is built from a lock (1), a closed gate (0) and an ordinary counter.

### [S12-p4] Pattern 1: The Limit (Multiplex)
- **Picture "THE COUNTER: THREE STOOLS".** C1, C2 and C3 sit on the three stools. A dashed box labelled "THE DOOR" holds C4 and C5, asleep (zzz). Caption: `stools = 0 · inside: C1, C2, C3 · asleep by the door: C4, C5`.
- **Code** (exact):
```
stools = Semaphore(3)   /* 3 free stools */

Customer:
  wait(stools)    /* sit down, or sleep
                     by the door        */
  eat
  post(stools)    /* free the stool     */
```
- **Multiplex**: "the book's name for a limit (Downey)". Several processes may be inside at the same time, but **never more than N**.
- **"A lock is a limit of 1."** `Semaphore(1)` is exactly this pattern with one stool.
- **Who gets the free stool?** The OS decides: `post` hands the stool straight to **one** sleeper. You cannot choose which one, and a correct program never needs to.
- **"The two lines are a pair."** Every customer who passes `wait` must reach `post`. If one `post` goes missing, the café has one stool fewer, for ever.
- ⭐ Yellow bar: **"Start at N: at most N inside at once; the others sleep by the door."**

### [S12-p5] Pattern 2: The Rendezvous
- **Timeline diagram.** There are two columns: *P1 · FRIEND 1* and *P2 · FRIEND 2*.
  - P1 does `drink1`, then `post(doneP1)`, then `wait(doneP2)`. A shaded bar marks it **"asleep"**.
  - P2 is "still drinking" (shaded bar), then does `post(doneP2)` and `wait(doneP1)`.
  - An **orange arrow** runs from P1's `post(doneP1)` down to P2's `wait(doneP1)`. A **green arrow** runs from P2's `post(doneP2)` back to sleeping P1 and wakes it.
  - An orange dashed line across both columns is labelled **"the meeting point: nobody passes it alone"**. Below the line come `leave1` and `leave2`.
- **Box "Two semaphores, both start at 0".** There is one flag per friend: each friend posts **their own** flag and waits for **the other's**. The orange arrow is `doneP1`; the green one is `doneP2`.
- **Code** (exact):
```
doneP1 = Semaphore(0)        doneP2 = Semaphore(0)

Process P1:                  Process P2:
  print("drink1")              print("drink2")
  post(doneP1)                 post(doneP2)
  wait(doneP2)                 wait(doneP1)
  print("leave1")              print("leave2")
```
- **Rendezvous** (French: *a meeting point*). Two processes wait for each other at one place in their code: **neither passes it until both have arrived**. In the café, both must finish their coffee before either one leaves.
- **Why it works:**
  - `post(doneP1)` announces "I have finished my coffee".
  - `wait(doneP2)` means "I do not leave before you have finished yours".
  - Each friend **announces first, then waits**.
- **Meme:** a Persian cat going "Plus? Plu? Pluz?!", captioned "My English-speaking brain trying to remember French pronunciation rules". It is a joke on *rendezvous*.
- ✅ Every interleaving checked: exactly 4 outputs are possible. They are drink1/drink2 in either order, then leave1/leave2 in either order. A leave line never comes before both drink lines, and the program never deadlocks.

### [S12-p6] Pattern 3: The Barrier (non-reusable)
- **Picture.**
  - A box shows the shadow counter `arrived = 3`.
  - Tourists T1, T2 and T3 are asleep (zzz) in front of a gate drawn as vertical bars, labelled `gate = 0`.
  - T4 is marked **"arrives last"** (orange arrow).
  - A green **"leave"** arrow points out on the far side of the gate.
- **Code** (exact):
```
N       = 4              /* the group         */
arrived = 0              /* shadow counter    */
mutex   = Semaphore(1)   /* guards arrived    */
gate    = Semaphore(0)   /* closed            */

Tourist:
  wait(mutex)
  arrived = arrived + 1
  if arrived == N:       /* the last one      */
     post(gate)          /* opens the gate    */
  post(mutex)
  wait(gate)             /* pass ...          */
  post(gate)             /* ... and let the
                            next one in       */
  leave
```
- **Barrier**: "N processes wait at one point until all N have arrived — then all of them go on." The tour group: nobody leaves the café until the whole group is there.
- **Shadow counter.** `arrived` is an **ordinary integer** that counts what you are not allowed to read from a semaphore. It is shared data, so `mutex` guards it like any other shared data.
- **"Wait, then post at once."** `wait(gate); post(gate)` lets exactly one process through and re-opens the gate for the next, like a **turnstile** at a metro station.
- ⭐ Yellow bar: **"You may not read a semaphore — so keep your own count, under a lock."**
- ⚠️ The slide font draws `==` as one long "═" sign (a font ligature). Type `==`.
- ✅ Every interleaving checked for N = 2, 3, 4:
  - Nobody ever leaves before all N have arrived, and there is no deadlock.
  - **Every run ends with `gate = 1`, `mutex = 1`, `arrived = N`.** The gate is left open and the counter is never reset, which fits the title's "(non-reusable)".
  - 🔎 Look up in Track B: how a *reusable* barrier is built. It is not on these slides.

### [S12-p7] Pattern 4: The Pass Shelf — Producers and Consumers
- **Picture.**
  - KITCHEN (two cooks) → **put** → the pass shelf, "N = 4 places". Slot 0 holds plate ①, slot 1 holds plate ②, and slots 2–3 are empty.
  - → **take** → DINING ROOM (two waiters).
  - A green arrow **"out: oldest plate"** points at slot 0. An orange arrow **"in: next free"** points at slot 2.
- **"Three things must never happen"** (list items, exact):
  1. "A plate put on a **full** shelf: it lands on top of another plate, and that one is lost."
  2. "A waiter taking from an **empty** shelf: he serves nothing."
  3. "Two waiters taking the **same** plate: one table gets it twice, another never — Week 4's lost update, with plates."
- **Three names:**
  - **Producer**: a process that makes things (the cook).
  - **Consumer**: a process that uses them (the waiter).
  - **Bounded buffer**: the place between them. *Bounded* means it has N slots, not infinitely many.
- **You have used one already:**
  - A **pipe** (Week 3) is a 64 KiB shelf of bytes. The writer sleeps when it is full and the reader when it is empty, and the OS does this for you.
  - The **listen queue** (Week 5) is a shelf of waiting callers.

### [S12-p8] Attempt 1: One Semaphore
- **Code** (exact):
```
N      = 2               /* places on the shelf */
plates = Semaphore(0)    /* plates on the shelf */

Cook:                         Waiter:
  loop {                        loop {
    cook a plate                  wait(plates)
    put it in the next place      take the oldest plate
    post(plates)                  serve it
  }                             }
```
- Orange bar: **"Counting plates is not enough: somebody must count the free places too."**
- **Exercise · what goes wrong?**
  - **(a)** The shelf has N = 2 places, the cook is fast and the waiter is slow. Follow plates 1, 2 and 3: where does plate 3 go, and what happens to plate 1?
  - **(b)** Now **two waiters** share the shelf. Find an order of steps in which one plate is served twice.
- **Hint:** `plates` counts the plates that are waiting. Who counts the **free places**? And who stops two waiters from reading the same place?
- **"Which of the three must-nevers?"** Your answers to (a) and (b) should each break one of them: a plate lost on a full shelf, an empty shelf, or the same plate twice.
- The answer is on [S12-p9] (top box). Worked step by step in §5 W1.

### [S12-p9] Attempt 2: Count Places and Plates
- **Answer box "What went wrong with one semaphore":**
  - **(a)** Nothing stops the cook. Plate 3 goes into place 0, on top of plate 1, which nobody has served yet, so a plate is lost.
  - **(b)** Two waiters read the same place before either moves on, so one plate is served twice.
- **Code** (exact):
```
N     = 2
empty = Semaphore(N)    /* free places */
full  = Semaphore(0)    /* plates      */

Cook:                    Waiter:
  loop {                   loop {
    cook a plate             wait(full)
    wait(empty)              take a plate
    put the plate            post(empty)
    post(full)               serve it
  }                        }
```
- **Two counters, one shelf.** `empty` counts free places, and the cook waits on it. `full` counts plates, and the waiter waits on it. Each process posts the *other's* semaphore.
- ⭐ Yellow bar (the invariant): **"empty + full = N, whenever nobody is in the middle of a step."**
- **Exercise · trace it: one cook, one waiter.** Table columns: step / who / operation / empty / full / sleeping. Row 0 is (start) with 2, 0, —. Then:
  1. Cook wait(empty)
  2. Cook post(full)
  3. Cook wait(empty)
  4. Cook post(full)
  5. Cook wait(empty)
  6. Waiter wait(full)
  7. Waiter post(empty)
  8. Cook post(full)
  9. Waiter wait(full)
  10. Waiter post(empty)
- The questions:
  - **(a)** Fill in *empty*, *full* and *sleeping* after every step.
  - **(b)** In which rows is `empty + full` not 2? Who is in the middle of a step there?
- Answer on [S12-p10].

### [S12-p10] Attempt 3: Add the Key (the Trio) ⭐
- **Left: "ANSWER — ATTEMPT 2, TRACED (N = 2)"** (exact):

| step | who | operation | empty | full | sleeping |
|---|---|---|---|---|---|
| 0 | | (start) | 2 | 0 | — |
| 1 | Cook | wait(empty) | 1 | 0 | — |
| 2 | Cook | post(full) | 1 | 1 | — |
| 3 | Cook | wait(empty) | 0 | 1 | — |
| 4 | Cook | post(full) | 0 | 2 | — |
| 5 | Cook | wait(empty) | 0 | 2 | Cook |
| 6 | Waiter | wait(full) | 0 | 1 | Cook |
| 7 | Waiter | post(empty) | 0 | 1 | **Cook wakes** |
| 8 | Cook | post(full) | 0 | 2 | — |
| 9 | Waiter | wait(full) | 0 | 1 | — |
| 10 | Waiter | post(empty) | 1 | 1 | — |

- **(b)** Rows **1, 3, 6, 7, 9**. In each, somebody holds a place or a plate that is not counted yet, because they are *in the middle of a step*.
- ✅ My simulator of the slide rules produces the same table, cell for cell. Look at row 7: the post goes to a sleeper, so `empty` **stays 0**, and the cook wakes already holding that place (the trace-table rule on [S13-p2]).
- **"The order of the lines."** **Wait** for a place first, **then** take the key. **Post** in the mirror order: give the key back, then announce the plate.
- ⭐ Yellow bar: **"Wait for a place first, then for the key; post in the mirror order."**
- **"THE FINAL VERSION: THREE SEMAPHORES"** (exact):
```
empty = Semaphore(N)   /* free places */
full  = Semaphore(0)   /* plates      */
mutex = Semaphore(1)   /* the key     */

Cook:                   Waiter:
  loop {                  loop {
    cook a plate            wait(full)
    wait(empty)             wait(mutex)
    wait(mutex)             take a plate
    put the plate           post(mutex)
    post(mutex)             post(empty)
    post(full)              serve it
  }                       }
```
- **Why a key?** Two cooks can both read the same `in` and put two plates into one place, which is Week 4's lost update. `mutex` makes **put** and **take** happen one at a time.
- ✅ Every interleaving checked (with real slots and the `in`/`out` indices):
  - Attempt 2 (no key) with **one** cook and **one** waiter never loses or duplicates a plate.
  - With **two cooks** it loses plates, and with **two waiters** it serves a plate twice. That is exactly why the key is added.

### [S12-p11] Exercise: Many Cooks, Many Waiters
- **Exercise · one key or two?** The café grows to **3 cooks** and **2 waiters** sharing one shelf, all running the trio.
  - **(a)** Is one `mutex` still enough?
  - **(b)** Could the cooks and the waiters have **separate** keys? Would that be correct, and why would anyone want it?
```
cookKey   = Semaphore(1)   /* guards in  */
waiterKey = Semaphore(1)   /* guards out */
```
- The right side repeats the trio code from p10.
- **ANSWER (a): "Yes, one key is enough".** Every touch of the shelf (`in`, `out` and the places) happens under the one key, whoever you are. More cooks only means a longer queue at the key.
- **ANSWER (b): "Two keys: also correct, and faster".** Cooks touch only `in` and waiters only `out`, and `empty`/`full` already keep them on different places. With `cookKey` and `waiterKey`, a cook and a waiter can work at the same moment.
- Memes: "Kitchen staff" (a pirate crew) and "Waiters and cashiers".
- ✅ Every interleaving checked with 2 cooks × 2 plates, 2 waiters × 2 plates, N = 2. Both the one-key trio and the two-key version serve every plate exactly once, with none lost and no deadlock.

### [S12-p12] The Classic Mistakes ⭐ (the "catalogue of classic semaphore bugs")
| mistake | what you see | fix |
|---|---|---|
| **wrong wait order**: wait(mutex) before wait(empty) | runs for a while, then the whole café is asleep (a deadlock) | wait for a place first, then for the key |
| **a forgotten post** on an error path (an early return between wait and post) | one bad order, and then one by one everybody sleeps | every way out of the critical section posts |
| **post twice** for one wait | the limit grows: four customers on three stools | exactly one post per wait |
| **a long sleep** inside the critical section | everyone queues at the key; the program is correct and slow | a lock protects data, not time: work outside it |
| **a process exits or is killed** while holding the key | everyone who needs the key sleeps for ever | no cure inside the program: never die holding it |
| **reading the value** to decide ("if S > 0 then …") | works in every test, fails under load | only wait and post; if you need a number, count it yourself under a lock |

- **"The OS lesson in this table."** When a process dies, the OS closes its files and frees its memory, but it does **not** put the flag back, and nobody else will either.
- ⭐ Yellow bar: **"When a process dies holding the key, the key dies with it."**
- Where these come back: wrong wait order → [S13-p11, S13-p12]. One wrong line per shelf → [S13-p13, S13-p14]. Shadow counter instead of reading the value → [S12-p6].

### [S12-p13] In C: The Shelf in Shared Memory (part 1: declarations + `main`)
```c
/* shelf_min.c — the smallest correct shelf: one cook, one waiter, 8 slots */
#include <unistd.h>
#include <sys/wait.h>
#include <semaphore.h>
#include "shared_mem.h"                   /* also brings stdio.h and stdlib.h */
#define N 8                               /* the shelf has room for 8 plates */
#define PLATES 100000                     /* plates cooked tonight            */
struct shelf { sem_t empty, full, mutex; int in, out; int slot[N]; } *s;

int main(void) {
    s = shared_alloc(sizeof(struct shelf));          /* before fork: both see it */
    sem_init(&s->empty, 1, N);        /* 1 = shared by processes; N free slots */
    sem_init(&s->full,  1, 0);        /* no plate yet                          */
    sem_init(&s->mutex, 1, 1);        /* the key is on its hook                */
    if (fork() == 0) { cook(); exit(0); }            /* the cook   */
    if (fork() == 0) { waiter(); exit(0); }          /* the waiter */
    wait(NULL); wait(NULL); return 0;  /* the café closes when both are done */
}
```
- ⭐ Yellow bar: **"The semaphores live in shared memory, next to the shelf they guard."**
- **Ring box:** `in = (in + 1) % N`, so after slot N−1 comes slot 0, like the hours on a clock. `%` is the remainder: 8 % 8 = 0.
- **Terminal:** `$ time ./shelf_min` → `served 100000 plates, 100000 in order` and `real 0m0.210s`.
- How `main` reads, line by line, using only the slide's comments:
  1. Allocate the shelf in shared memory *before* `fork`, so both children see the same one.
  2. Initialise the three semaphores with pshared = 1 and start values N / 0 / 1.
  3. Fork the cook and fork the waiter.
  4. The parent waits for both children.
- ⚠️ **Ligatures in the slide font:** `→` is `->`, the long `═` is `==`, `≤` (on p14) is `<=`. Type the ASCII forms.
- ⚠️ **Order of the code across two pages.** `main()` (p13) calls `cook()` and `waiter()`, which only appear on p14. If you type them in page order into one file, today's C compiler refuses: I got "call to undeclared function 'cook'" (✅ tested). Put `cook()` and `waiter()` **above** `main()`. `shelf_min.c` itself is **not** in the zip; I rebuilt it from p13–p14 and it compiles in that order.

### [S12-p14] In C: The Shelf in Shared Memory (part 2: `cook` and `waiter`)
```c
void cook(void) {                            /* puts plates 1 ... PLATES */
    for (int p = 1; p <= PLATES; p++) {
        sem_wait(&s->empty);                 /* wait for a free slot       */
        sem_wait(&s->mutex);                 /* take the key               */
        s->slot[s->in] = p;                  /* put the plate              */
        s->in = (s->in + 1) % N;             /* ring: after slot N-1 comes 0 */
        sem_post(&s->mutex);                 /* give the key back          */
        sem_post(&s->full);                  /* one more plate is waiting  */
    }
}
void waiter(void) {                          /* takes PLATES plates */
    int inorder = 0;                         /* plates that came in their turn */
    for (int i = 1; i <= PLATES; i++) {
        sem_wait(&s->full);                  /* wait for a plate           */
        sem_wait(&s->mutex);                 /* take the key               */
        int p = s->slot[s->out];             /* take the plate             */
        s->out = (s->out + 1) % N;           /* ring: after slot N-1 comes 0 */
        sem_post(&s->mutex);                 /* give the key back          */
        sem_post(&s->empty);                 /* one more free slot         */
        if (p == i) inorder++;               /* the i-th plate is plate i  */
    }
    printf("served %d plates, %d in order\n", PLATES, inorder);
}
```
- **"Line by line = the trio."** `sem_wait` is `wait`, `sem_post` is `post`, and `&s->empty` is the semaphore `empty` inside the shared shelf. Same order, same three semaphores as p10.
- **`s->`**: the shelf lives in shared memory and `s` points to it. So the cook and the waiter use **the same** `in`, `out` and slots.
- **"In order."**
  - The cook puts plates 1, 2, 3, … in order.
  - The waiter checks every plate it takes: the *i*-th plate taken must be plate *i*, i.e. its number = the count taken so far + 1.
  - With one cook and one waiter, getting *100000 in order* is the proof: no plate was lost and none was taken twice.

### [S12-p15] Questions?
- Closing slide (photo of a glass building). No content.

---

## Slide 13 — "Synchronisation I: Examples on Paper" (17 pages)

### [S13-p1] Title page
- SOC 3010 Operating Systems · **Synchronisation I · Examples on Paper** · Instructor: Jalolliddin Yusupov · dated 10/13/2026.
- The whole deck is the "paper workshop": trace tables, filling in blanks, every possible output, and spotting the wrong line.

### [S13-p2] Four Patterns, One Table ⭐
| pattern | start values | who waits | who posts | in the café |
|---|---|---|---|---|
| **limit** | `stools = N` | every customer, before sitting | the same customer, when leaving | three stools at the counter |
| **rendezvous** | `doneP1 = 0`, `doneP2 = 0` | each friend, for the other's flag | each friend, his own flag — first | two friends leave together |
| **barrier** | `mutex = 1`, `gate = 0`, `arrived = 0` (shadow counter) | everybody, at the gate | the last to arrive opens it; each one who passes re-opens it | the tour group |
| **shelf** | `empty = N`, `full = 0`, `mutex = 1` | the cook on `empty`, the waiter on `full`, both on `mutex` | the cook posts `full`, the waiter posts `empty` | the pass shelf |

- **"The trace table, in four lines"** (the rules you must use on paper):
  1. One row per `wait` or `post`.
  2. Each value column holds the value **after** the step.
  3. A `wait` on 0: write the name under *sleeping*.
  4. A `post` to a sleeper: **the value stays, the sleeper wakes**.
- ⭐ **"Two rules that never change"**: set the start value once, then only wait and post, and never read the value. On the shelf: wait for a place first, then for the key.
- ⭐ Yellow bar: **"The start value is the meaning."**

### [S13-p3] Exercise: Five Customers, Three Stools
- **Exercise · on paper** (exact code):
```
S = Semaphore(3)        /* three stools */

Customer C1 ... C5:
  wait(S)               /* sit down     */
  eat
  post(S)               /* free a stool */
```
- **Blank table** with columns # / operation / S after / sleeping / inside. Row 0 is (start) 3 — —. Rows 1–10:
  1. C1: wait(S)
  2. C2: wait(S)
  3. C3: wait(S)
  4. C4: wait(S)
  5. C1: post(S)
  6. C5: wait(S)
  7. C3: post(S)
  8. C2: post(S)
  9. C4: post(S)
  10. C5: post(S)
- **(a)** The ten steps happen in the order printed. Fill in *S after*, *sleeping* and *inside* for every row. *Inside* means past its `wait` and not yet at its `post`.
- **(b)** Could a fourth customer ever be seated while three are eating? Point to the row that proves it.
- **(c)** After row 10, S is back where it started. Why **must** it be?
- ⭐ Yellow bar: **"One row per wait or post: a sleeper changes nothing until somebody posts."**

### [S13-p4] Answer: Five Customers, Three Stools
| # | operation | S after | sleeping | inside |
|---|---|---|---|---|
| 0 | (start) | 3 | — | — |
| 1 | C1: wait(S) | 2 | — | C1 |
| 2 | C2: wait(S) | 1 | — | C1, C2 |
| 3 | C3: wait(S) | 0 | — | C1, C2, C3 |
| 4 | C4: wait(S) | 0 | **C4** | C1, C2, C3 |
| 5 | C1: post(S) | 0 (flag goes to C4) | — | C2, C3, C4 |
| 6 | C5: wait(S) | 0 | **C5** | C2, C3, C4 |
| 7 | C3: post(S) | 0 (flag goes to C5) | — | C2, C4, C5 |
| 8 | C2: post(S) | 1 | — | C4, C5 |
| 9 | C4: post(S) | 2 | — | C5 |
| 10 | C5: post(S) | 3 | — | — |

- **(b) Never four · (c) back to 3.**
  - *Inside* never holds more than three names, because the fourth `wait` (rows 4 and 6) finds S = 0 and sleeps.
  - Every `wait` was matched by one `post`. Flags are never made or destroyed, only moved.
- **"You have already seen a limit":** Week 5's **pool of 2** (at most two clients served at once), and the **listen queue** (at most a fixed number of callers on hold).
- **Terminal** `$ time ./stools` prints, in this order:
  - C1 sits, C2 sits, C3 sits
  - C3 leaves, C2 leaves
  - C4 sits, C5 sits
  - C1 leaves, C4 leaves, C5 leaves
  - `real 0m2.006s`
- ⭐ Yellow bar: **"A limit is a lock with more than one key."**
- Why about 2 s: in `stools.c` each customer eats for `sleep(1)`. Three eat during the first second and two during the next.
- ✅ My simulator gives exactly this table. Across all interleavings of five customers, at most 3 are ever inside, and **S + (number inside) = 3 in every state**. That is "flags are only moved", written as an equation.

### [S13-p5] Ping-Pong for Ever
- Week 4 ended with two semaphores in shared memory, `ping` starting at 1 and `pong` at 0. The whole program (exact):
```
ping = Semaphore(1)
pong = Semaphore(0)

Process P1:              Process P2:
  loop {                   loop {
    wait(ping)               wait(pong)
    print("PING")            print("PONG")
    post(pong)               post(ping)
  }                        }
```
- **Diagram (a two-node cycle).**
  - Circle **P1 "prints PING"** (note: "ping starts at 1") and circle **P2 "prints PONG"** (note: "pong starts at 0").
  - Orange arrow P1 → P2, labelled `post(pong): your turn`.
  - Green arrow P2 → P1, labelled `post(ping): your turn`.
- **"A before B, in a circle."** P1's PING is the "A" that P2 waits for, and P2's PONG is the "A" that P1 waits for. Each `post` hands the turn to the other.
- **Exercise · change only the start values:**
  - **(a)** `ping = 1`, `pong = 0`: what is printed?
  - **(b)** **Both start at 1.** What can be printed now? Can PING appear twice in a row? Three times?
  - **(c)** **Both start at 0.** What happens?
- **Hint:** count the flags. How many exist at the start, in which hole, and who can take each one?
- ⭐ Yellow bar: **"Same code, different start values, different program."**
- ⚠️ An orange tag in the top-right corner reads **"rendezvous happens once"**, and the slide doesn't explain it. It most likely contrasts this page with the rendezvous of [S12-p5], which meets only once, whereas ping-pong hands the turn back and forth for ever. Also, the page header says "Synchronisation I: *Patterns*" on p5–p6 instead of "*Examples*" like the rest of this deck. That is cosmetic.

### [S13-p6] Answer: Who Goes First?
- **(a) 1 and 0:** `PING PONG PING PONG …` for ever. Strict turns, PING first.
- **(b) 1 and 1:**
  - The order is **no longer forced**: each process can run ahead by one.
  - In every pair of lines there is one PING and one PONG, in either order. So `PING PONG PONG PING PING PONG` is possible.
  - Two PINGs in a row: **yes**. Three: **never**.
- **(c) 0 and 0:** **Nothing** is printed. Both sleep in their first `wait`, so this is a deadlock again.
- **Why never three PINGs?** Each PING uses up a `ping` flag, and only a PONG gives one back. Starting with one spare flag, you can be at most one line ahead.
- **"Reading the commands":**
  - `head -6` shows the first 6 lines.
  - `uniq -c` counts equal lines that come one after another, and `wc -l` counts what is left.
  - `awk '$1>1'` keeps the counts above 1, so **0** means two equal lines never come in a row.
  - `awk '$1>2'` keeps the counts above 2, so **0** means three equal lines never come in a row.
  - The output goes to a file first. If you pipe into `| head` instead, the writer is killed in the middle of its turn and the other process sleeps for ever.
- **Terminal "PING = 1, PONG = 0":**
```
$ ./pingpong > out.txt
$ head -6 out.txt
PING
    PONG
PING
    PONG
PING
    PONG
$ uniq -c out.txt | awk '$1>1' | wc -l
0
```
- **Terminal "BOTH START AT 1"** (label "(b) Both start at 1."):
```
$ ./pingpong_both1 > out.txt
$ uniq -c out.txt | awk '$1>2' | wc -l
0
$ uniq -c out.txt | head -6
      1     PONG
      2 PING
      2     PONG
      2 PING
      2     PONG
      1 PING
```
  The 2s are drawn in red: pairs of equal lines do happen, but never three. Notice that this real run **starts with PONG**.
- ⭐ Yellow bar: **"In a cycle, exactly one semaphore starts at 1 — it says who goes first."**
- ✅ I enumerated the first 12 lines of every possible run:
  - (a) Exactly one output: PING PONG PING PONG …
  - (b) 64 = 2⁶ different outputs. Each pair (lines 1–2, 3–4, …) is independently PING PONG or PONG PING. The longest run of equal lines is 2, and PONG can come first.
  - (c) Both sleep, and nothing is printed.
- 🔎 Look up in Track B: *why* the writer gets killed when `head` exits early. The slide gives only the effect.

### [S13-p7] Exercise: ABCDE for Ever (more arrows now)
- **Exercise · fill in the blanks** (exact skeleton):
```
semaphores and start values: ______________________

Process P1:      Process P2:      Process P3:
  loop {           loop {           loop {
    ________         ________         ________
    print("A")       print("B")       print("C")
    ________         ________         ________
    ________         ________       }
    print("D")       print("E")
    ________         ________
  }                }
```
- **Task:** put a `wait(…)` or a `post(…)` in the blanks (some stay empty) and choose the start values, so that the output is **ABCDEABCDEABCDE… for ever**, whatever the scheduler does.
- **Precedence diagram.**
  - Five circles in a row: **A (P1) → B (P2) → C (P3) → D (P1) → E (P2)**, with orange arrows between neighbours.
  - A green arrow runs from E back to A: **"the cycle closes: E → A"**.
  - Legend: **"an arrow X → Y means: X must be printed before Y"**.
  - Colours: P1's letters (A, D) are yellow, P2's (B, E) blue, and P3's (C) green.
- **"The rules":** **one semaphore per arrow**, nothing else. Before printing, a process waits on every arrow coming **in**. After printing, it posts on every arrow going **out**. State every start value.
- **Hint:** count the arrows, because that is how many semaphores you need. In a cycle, somebody has to be allowed to start: how many flags exist at the beginning?
- ⭐ Yellow bar: **"In a cycle, the start values are the whole puzzle."**
- ⚠️ "(some stay empty)" does not match the slide's own answer on p8. That answer fills **all ten** blanks (4 in P1, 4 in P2, 2 in P3), so treat the remark as a decoy.

### [S13-p8] Exercise: ABCDE for Ever (answer) ⭐
- **Diagram with names.** The arrows are now labelled **sAB, sBC, sCD, sDE**, and the green return arrow **sEA**. Caption: "the cycle closes: E → A · sEA starts at 1: A goes first".
- **"Why nothing else can be printed."** Each letter's only flag is posted by the letter before it, so the order is forced. Exactly one flag exists at the start (in `sEA`), and it says that A goes first.
- **Code** (exact):
```
sAB = sBC = sCD = sDE = Semaphore(0)
sEA = Semaphore(1)                 /* A goes first */

Process P1:      Process P2:      Process P3:
  loop {           loop {           loop {
    wait(sEA)        wait(sAB)        wait(sBC)
    print("A")       print("B")       print("C")
    post(sAB)        post(sBC)        post(sCD)
    wait(sCD)        wait(sDE)      }
    print("D")       print("E")
    post(sDE)        post(sEA)
  }                }
```
- **Can two arrows share one semaphore?** (slide's table):

| arrows | verdict | reason (paraphrased) |
|---|---|---|
| A→B and D→E | **may share** | Both go from P1 to P2. P2 needs them in this order, and the second flag is posted only after the first was taken. That leaves **4 semaphores**. |
| A→B and B→C | **never** | Different receivers: P3 can take the flag meant for P2 and print **A C D**, and then everybody sleeps. |
| C→D and E→A | **prove it first** | Same receiver (P1) but different senders, and a flag does not say who posted it. Here the order saves you, but that needs a proof. |

- ⭐ Yellow bar: **"A semaphore per arrow always works; fewer is an optimisation you must prove."**
- ⚠️ Small typo: "Here the order saves you-that needs a proof" should have a dash ("you — that").
- ✅ Every interleaving checked:
  - The 5-semaphore version only ever prints ABCDE ABCDE …, with no deadlock.
  - Both "may share" and "prove it first" hold up.
  - The "never" merge really prints A C D and then all three processes sleep.
  - The derivation, trace and proof are in §5 W6.

### [S13-p9] Exercise: Every Possible Output
- **Code** (exact):
```
mutex = Semaphore(1)
s     = Semaphore(0)

Process P1:        Process P2:        Process P3:
  wait(mutex)        wait(mutex)        wait(s)
  print("A")         print("C")         print("D")
  print("B")         post(mutex)
  post(mutex)        post(s)
```
- ⭐ Yellow bar: **"Find what cannot happen first; what is left is what can."**
- **Exercise · list every output:**
  - **(a)** Four letters can be printed in 24 orders. Which of them can this program print? List **all** of them.
  - **(b)** For two orders that are **impossible**, give the reason in one line each.
- **Hint:** ask two questions. Which lines can never run at the same time as which? Which letter has to wait for a flag, and who posts it, and when?
- **"The rules of the game":** the scheduler may run the three processes in any order and switch after any line. Each print prints one letter. The program always finishes.
- An empty "YOUR ANSWER" table: output / possible? / why (one line).

### [S13-p10] Answer: Exactly Four Outputs ⭐
| output | how it happens |
|---|---|
| `A B C D` | P1 takes the key first and prints A B. Then P2 prints C and posts `s`, which lets P3 print D. |
| `C A B D` | P2 takes the key first and prints C. Then P1 prints A B before P3 gets its turn. |
| `C A D B` | P2 goes first, then P3's D slips in **between** A and B. P3 never takes the key, so the key cannot stop it. |
| `C D A B` | P2 goes first, and P3 prints D before P1 even starts. |

- "4 of the 24 orders of A, B, C, D are possible — checked by trying every interleaving."
- **"Why the other 20 are impossible":**
  - **Rule 1 — nothing between A and B except D.** P1 holds the key from A to B, so C (also under the key) cannot come between them. `A C B D` is impossible.
  - **Rule 2 — D after C.** D needs the flag in `s`, and P2 posts it only after printing C. So `D C A B`, `A B D C` and every order with D before C are impossible.
- **"The method":** there are two kinds of semaphore and two kinds of rule. The **key** (start 1) keeps lines apart, and the **signal** (start 0) puts one line after another. Write both rules down, then list what survives.
- **"The trap":** D **can** fall between A and B (`C A D B`). P3 never takes the key, so the key cannot keep it out. A lock keeps out only those who also use it.
- ⭐ Yellow bar: **"A key keeps lines apart; a signal puts them in order."**
- ✅ Enumerated: exactly {ABCD, CABD, CADB, CDAB}, with no deadlock. The program code repeats on the right of the slide in one-line form, e.g. `P1: wait(mutex); print A; print B; post(mutex)`.

### [S13-p11] Exercise: Swap Two Lines
- **"THE COOK'S TWO WAITS ARE SWAPPED"** (the two red lines are marked):
```
Cook:                       Waiter:
  loop {                      loop {
    cook a plate                wait(full)
    wait(mutex)    <- red       wait(mutex)
    wait(empty)    <- red       take a plate
    put the plate               post(mutex)
    post(mutex)                 post(empty)
    post(full)                  serve it
  }                           }
```
- **"The shelf at the start":** N = **1**, and it already holds a plate: `empty = 0`, `full = 1`, `mutex = 1`.
- **Exercise · stop the café for ever:**
  - **(a)** Find an order of steps after which **nobody can ever move again**. Write it as a trace table with columns step / who / operation / empty / full / mutex / sleeping. Row 0 is (start) 0 1 1 —, and rows 1–5 are blank.
  - **(b)** In one sentence: what did the cook do wrong?
- **"In pairs, five minutes":** the classic-mistakes table names this bug. Prove it by finding the order of steps, then compare with your neighbour.

### [S13-p12] Answer: The Deadlocked Shelf ⭐
| step | who | operation | empty | full | mutex | sleeping |
|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 1 | 1 | — |
| 1 | Cook | wait(mutex) | 0 | 1 | 0 | — |
| 2 | Cook | wait(empty) | 0 | 1 | 0 | Cook **(holding the key)** |
| 3 | Waiter | wait(full) | 0 | 0 | 0 | Cook |
| 4 | Waiter | wait(mutex) | 0 | 0 | 0 | Cook, Waiter — **everyone: nobody can move** |

- Only 4 steps are needed, though the exercise left 5 rows.
- **"Who waits for whom":**
  - The cook waits for `empty`, which only the waiter posts, after taking a plate **under the key**.
  - The waiter waits for the **key**, which only the cook can give back.
  - That is a circle of waiting.
- **"(b) What the cook did wrong":** he went to sleep **holding the key**. Had the waiter moved first, the café would have survived. That is why such bugs pass tests.
- **"The OS did nothing wrong":** both asked to sleep, and the OS let them, so `TIME 00:00:00` and no CPU used.
- **Terminal:**
```
$ timeout 5 ./shelf_deadlock 1000; echo "exit code $?"
exit code 124
$ ./shelf_deadlock 1000 &
$ sleep 3; ps -o pid,stat,time,comm
  PID STAT     TIME COMMAND
    1 Ss   00:00:00 bash
  175 S    00:00:00 shelf_deadlock
  177 S    00:00:00 shelf_deadlock
  178 S    00:00:00 shelf_deadlock
  181 R    00:00:00 ps
```
- **Reading it** (with the class code `shelf_deadlock.c`):
  - The three `shelf_deadlock` processes are the parent (blocked in `wait(NULL)`), the cook and the waiter.
  - All are in state `S` (sleeping) with 0 CPU time.
  - `timeout` had to end the program, giving exit code **124** [S13-p15].
- ⭐ Yellow bar: **"Never go to sleep while holding the key."**
- ✅ Every interleaving from this start: the deadlock is reachable (cook asleep on `empty`, waiter on `mutex`). With the two waits in the correct order, from the same start, no deadlock exists.

### [S13-p13] Exercise: Three Broken Shelves
- **Every café:** N = **4**, one cook, one waiter, `empty = Semaphore(N)`, `full = Semaphore(0)`, `mutex = Semaphore(1)`, except where shown.
- **THE COOK — X, Y AND Z** (the same correct cook in all three):
```
Cook:
loop {
  wait(empty)
  wait(mutex)
  put plate k
  print("cooked", k)
  post(mutex)
  post(full)
}
```
- **SHELF X — WAITER:**
```
Waiter:
loop {
  wait(full)
  wait(mutex)
  take plate k
  print("served", k)
  post(mutex)
  /* nothing here */
}
```
- **SHELF Y — WAITER:**
```
Waiter:
loop {
  wait(empty)
  wait(mutex)
  take plate k
  print("served", k)
  post(mutex)
  post(empty)
}
```
- **SHELF Z — START VALUES:**
```
empty = Semaphore(N)
full  = Semaphore(0)
mutex = Semaphore(0)

/* the cook and the waiter are both correct */
```
- Orange bar: **"Each shelf has one wrong line. What do you see on the screen?"** For each shelf, say **what is printed** and **who ends up asleep** (and on which semaphore), and write the **one-line fix**.
- **"Read it like the trace table":** each cook step uses one free place (`empty`) and makes one plate (`full`), and each waiter step should do the opposite. Ask who gives back what, and who can never start.
- ⭐ Yellow bar: **"One wrong line is enough: read every wait and every post."**

### [S13-p14] Answer: Three Broken Shelves ⭐
- ⭐ Yellow bar: **"Each semaphore has one job: count places, count plates, or guard the shelf."**

| bug | what you see | fix |
|---|---|---|
| **X** — the waiter never posts `empty` | `cooked 1` … `cooked 4` and `served 1` … `served 4`, then **silence**. The cook used up the 4 free places and nobody gave one back: he sleeps on `empty`, the waiter on `full`. | `post(empty)` after taking the plate |
| **Y** — the waiter waits on `empty`, not `full` | **served** lines for plates that were never cooked (an empty place, or a plate served twice), and real plates lost. The waiter's wait and post on `empty` cancel out, so after 4 plates the cook still runs out of places: then both sleep on `empty`. | `wait(full)` |
| **Z** — `mutex` starts at 0 | **Nothing at all.** The cook passes `wait(empty)` and sleeps on the key; the waiter sleeps on `full`. Asleep from the first second. | `mutex = Semaphore(1)` |

- **"One semaphore, one job":** `empty` counts places, `full` counts plates, and `mutex` is the key. Each bug gives one of them the wrong job, or no job at all.
- **"Same disease as the servers of Week 5":** each program works for a moment, so a quick test can pass. Only reading every `wait` and `post`, or doing a trace table, finds the wrong line.
- ✅ Every interleaving checked with N = 4:
  - **X** always ends with the cook asleep on `empty` and the waiter on `full`. Every run prints exactly cooked 1–4 and served 1–4, in 14 possible line orders.
  - **Y** always ends with **both asleep on `empty`** after exactly 4 cooked plates. "Served" lines for never-cooked places and for already-served plates both occur. At the end, 1–4 real plates are still unserved on the shelf, which is what "real plates lost" means.
  - **Z** prints nothing; the cook ends asleep on `mutex` and the waiter on `full`.

### [S13-p15] What the OS Did for You This Week
| the OS … | so that … |
|---|---|
| put a waiting process to **sleep** | a cook waiting for a free place costs no CPU (state `S` in `ps`) |
| woke **exactly one** sleeper on each `post` | one free stool, one customer — never two |
| made `wait` and `post` **atomic** | two `wait`s can never both take the last flag |
| kept the semaphores in **shared memory** | the cook and the waiter see one counter, not two copies (made before `fork`) |
| let a deadlocked café sleep | nothing to run, nothing burning; `timeout` had to end it (124) |
| did **nothing** when a holder died | the flag is gone for ever; everyone else who needs it sleeps |
| runs its own bounded buffers with the same idea | the **pipe** (the writer sleeps when it is full) and the **listen queue** (callers on hold) |

- ⭐ Yellow bar: **"The OS keeps the counter honest; using it in the right order is your job."**

### [S13-p16] Patterns in the Wild
| who | what | the job |
|---|---|---|
| **nginx** | `accept_mutex`: a lock in front of `accept`, so the worker processes of its pool take new callers in turn — Week 5's design 3, made orderly | a lock |
| **PostgreSQL** | one semaphore for every server process, in its shared memory (`sem_init(…, 1, …)`, our four calls); a process that must wait for a busy lock sleeps on it | a signal |
| **PostgreSQL** `max_connections` | at most `max_connections` clients (100 by default); when every slot is taken, the next one is refused at once ("sorry, too many clients already") — a **trywait, not a wait** | a limit |
| **Python** | `multiprocessing.Semaphore(3)`: the limit, for processes, in one line | a limit |
| **the pipe** | the OS's own shelf: 64 KiB of bytes, the writer sleeps when it is full, the reader when it is empty | a bounded buffer |

- **"No new API here":** every line uses a job you can now trace on paper. When you read a real server's code, look for the start values first.
- ⭐ Yellow bar: **"Real servers are built from the same five jobs."**
- "Our four calls" are the four semaphore calls the class code uses: `sem_init`, `sem_wait`, `sem_post`, `sem_destroy`.
- 🔎 Look up in Track B: "trywait". The slide only says it refuses at once instead of sleeping.

### [S13-p17] Questions?
- Closing slide. No content.

---

### [CODE] Class code samples (W6)
**Two zips, five programs, two headers.** `shared_mem.h` and `stools.c` are byte-identical in both zips.

- **`shared_mem.h`** is "the course's shared memory in ONE call":
  - `shared_alloc(size)` = `mmap(NULL, size, PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANONYMOUS, -1, 0)`, ending the program with `perror("mmap")` if it fails.
  - Call it **before** `fork()`: the parent and the children then see the same bytes.
  - It includes `stdio.h`, `stdlib.h` and `sys/mman.h`, which is why [S12-p13] says it "also brings stdio.h and stdlib.h".
- **`sem_shm.h`** is "the Week 6 and Week 7 toolkit: semaphores that work BETWEEN PROCESSES":
  - **pshared.** Textbooks print `sem_init(&s, 0, 1)`, where 0 is *pshared*. That lock locks nothing between processes: pshared 0 means "threads of one process only", and after `fork()` each child gets its own private copy. The course uses `sem_init(s, 1, value)`, with pshared 1 and the semaphore in memory that `fork()` shares instead of copying.
  - **Build:** `gcc -Wall -Wextra -std=gnu11 -o prog prog.c -lrt -pthread`.
  - ⚠️ **Linux only.** "macOS does not implement unnamed POSIX semaphores (sem_init fails with ENOSYS), so all of Weeks 6 and 7 runs in the course container."
  - **Helpers:**
    - `die(msg)`: one-line fatal error.
    - `unbuffer()`: a forked child inherits a *copy* of the stdout buffer, which duplicates buffered lines and hides interleaving.
    - `nap_ms(ms)`: uses `nanosleep`, because the course does not use `usleep`, which POSIX removed in 2008. Short naps widen a race window so that a bug becomes visible.
    - `shm_alloc`, `sem_new(value)`.
    - `sem_wait_r`: `sem_wait` is **not** restarted by SA_RESTART, so a stray signal makes it return −1/EINTR, "which looks exactly like a broken program. Always use this."
    - `sem_post_c`, `reap_all()`.
  - **Its own barrier** (`barrier_t`, `barrier_new(n)`, `barrier_wait`) is built from "a mutex, a counter and a turnstile":
    1. Under the mutex: `count++` and `last = (count == n)`; then post the mutex.
    2. **If last, post the turnstile *n* times.**
    3. Then everybody, the last one included, does one `wait(turnstile)`.
  - This differs from [S12-p6], which uses `wait(gate); post(gate)`. ✅ Checked for n = 3: everybody passes, no one passes early, and it ends with the turnstile back at 0 (the [S12-p6] version ends with `gate = 1`). 🔎 Look up in Track B: whether that makes it reusable. Not covered on the slides.
- **`stools.c`**: five customers, three stools ([S13-p3], [S13-p4]).
  - `setvbuf(stdout, NULL, _IOLBF, 0)` makes stdout line-buffered, so one printed line = one write and lines never tear.
  - `stools = shared_alloc(sizeof(sem_t))`; `sem_init(stools, 1, 3)`.
  - Each of the 5 children: `sem_wait(stools)` → `printf("C%d sits\n")` → `sleep(1)` (eat) → `printf("C%d leaves\n")` → `sem_post(stools)` → `exit(0)`.
  - The parent does `wait(NULL)` ×5, then `sem_destroy`.
- **`pingpong.c`** ([S13-p5], [S13-p6]):
  - `struct shared { sem_t ping; sem_t pong; }` in shared memory, with `sem_init(&s->ping, 1, 1)` (child may go first) and `sem_init(&s->pong, 1, 0)` (parent must wait).
  - The **child** is P1 and prints `PING`. The **parent** is P2 and prints `"    PONG"`, **indented**, which is why PONG is indented in the slide's terminal.
  - `ROUNDS 1000`, so 2000 lines.
- **`pingpong_both1.c`**: the same program with `sem_init(&s->pong, 1, 1); /* BUG: parent may go first too */`.
- **`shelf.c`**: the general shelf ("a bounded buffer").
  - Usage: `./shelf NPLATES [COOKS WAITERS]` (defaults 100000, 1, 1), with N = 8.
  - Cook *k* gets plate numbers `k*n/cooks + 1 … (k+1)*n/cooks`, and each waiter serves its share.
  - The shared array `seen[p]` counts how often plate *p* was served. The program prints `cooked %d, served %d, lost %d, duplicated %d` (served 0 times = lost; 2+ = duplicated).
  - The cook and waiter bodies are exactly the trio of [S12-p14]. This is the C version of the [S12-p11] "many cooks, many waiters" question.
- **`shelf_deadlock.c`**: `shelf.c` with the cook's two waits swapped and **N = 1**:
  - `sem_wait(&s->mutex); /* BUG: take the key first ... */`
  - `sem_wait(&s->empty); /* ... then sleep holding it */`
  - It starts from an empty shelf (`empty = 1`, `full = 0`). After the cook's first plate, if the waiter has not moved yet, the state is exactly the [S13-p11] start (`empty 0, full 1, mutex 1`). It is run as on [S13-p12]: `timeout 5 ./shelf_deadlock 1000`. ✅ The deadlock is reachable from the code's start too.
- ⚠️ **`shelf_min.c`** (the program shown on [S12-p13] and [S12-p14]) is **not** in either zip; `shelf.c` is its bigger relative.
- ⚠️ **Tested on this Mac (Apple clang 21).**
  - All five programs compile, with only "'sem_init' is deprecated" warnings.
  - At run time, `sem_init` returns −1 with errno 78, "Function not implemented", and `sem_wait` then fails at once (EBADF).
  - The class programs do not check those return values (only the `sem_shm.h` helpers do), so **on macOS they run with no synchronisation at all**:
    - `stools` printed C1…C5 "sits" all at once, so five customers on three stools.
    - `pingpong` printed PONG 29 times in a row.
    - `shelf 100000 3 2` printed `cooked 100000, served 36140, lost 54368, duplicated 9492`.
    - The rebuilt `shelf_min` printed `29 in order`.
  - → Run Week 6 code only in the course's Linux container. No container runtime is installed here, so I could not reproduce the Linux runs. The semaphore logic was checked with the paper model instead (the ✅ marks).

---

## 3. Definitions & key terms

| term | meaning (as taught) | ref |
|---|---|---|
| **Synchronisation** | The set of rules that decide who may do what, and when, when several processes share something. Goal: the answer doesn't depend on the interleaving. | [S12-p2] |
| **Interleaving** | The order the scheduler happens to pick. "The scheduler may run the three processes in any order and switch after any line." | [S12-p2, S13-p9] |
| **Mechanism / pattern** | The OS gives the mechanism (atomic counter, sleep, wake exactly one). You give the pattern (who waits, who posts, in what order). | [S12-p2] |
| **Semaphore** | A counter that processes decrease and increase atomically, and that makes a process sleep when there is nothing left to take. | [S12-p3] |
| **`wait(S)`** | If S > 0, then S = S − 1; otherwise sleep until S > 0, then S = S − 1. C: `sem_wait(&s)`. | [S12-p3, S12-p14] |
| **`post(S)`** | S = S + 1; if someone sleeps on S, wake **one** of them. C: `sem_post(&s)`. On paper, a post to a sleeper leaves the value unchanged and the sleeper wakes. The OS hands the flag "straight to one sleeper", and you cannot choose which. | [S12-p3, S12-p4, S13-p2] |
| **Atomic** | Wait and post each happen as one step, so "two waits can never both take the last flag". | [S12-p3, S13-p15] |
| **Flag** | One unit of a semaphore's value (golf flags in a hole). "Flags are never made or destroyed, only moved." | [S12-p3, S13-p4] |
| **Start value** | Set once; "the start value is the meaning". Never read the value afterwards. | [S12-p3, S13-p2] |
| **Sleeping** | Blocked in a `wait`. Costs no CPU and shows as state `S` in `ps`. | [S13-p12, S13-p15] |
| **Lock / key / `mutex`** | Start value 1: one process inside at a time ("one key to the toilet"). "A lock is a limit of 1." "A lock protects data, not time." "A lock keeps out only those who also use it." | [S12-p3, S12-p4, S12-p12, S13-p10] |
| **Critical section** | The code between taking the key and giving it back. "Every way out of the critical section posts." | [S12-p12] |
| **Signal** | Start value 0: "A must happen before B" ("call me when the coffee is ready"). It "puts one line after another". | [S12-p3, S13-p10] |
| **Limit / multiplex** | Start value N: at most N inside at once (three stools). "Multiplex" is Downey's name for it. "A limit is a lock with more than one key." | [S12-p4, S13-p4] |
| **Rendezvous** | French: *a meeting point*. Two processes wait for each other, and neither passes until both have arrived. Two semaphores, both starting at 0. | [S12-p5] |
| **Barrier** | N processes wait at one point until all N have arrived, then all go on (the tour group). The slide's version is **non-reusable**. | [S12-p6] |
| **Shadow counter** | An ordinary integer (`arrived`) that counts what you may not read from a semaphore. It is shared, so it is guarded by `mutex`. | [S12-p6] |
| **Turnstile** | `wait(gate); post(gate)`: lets exactly one through and re-opens the gate for the next. | [S12-p6] |
| **Bounded buffer** | A shelf with room for N things between two kinds of process. *Bounded* = it has an end (N slots). | [S12-p3, S12-p7] |
| **Producer / consumer** | The process that makes things (the cook) / the one that uses them (the waiter). | [S12-p7] |
| **Pass shelf, slot, `in`, `out`** | The café's bounded buffer: `in` = the next free slot, `out` = the oldest plate. | [S12-p7] |
| **Ring** | `in = (in + 1) % N`: after slot N−1 comes slot 0, like the hours on a clock. | [S12-p13] |
| **The trio** | `empty = N`, `full = 0`, `mutex = 1`: count places, count plates, guard the shelf. | [S12-p10, S13-p14] |
| **Lost update (Week 4)** | Two processes read the same value and one update is lost. On the shelf: two cooks read the same `in`, or two waiters take the same plate. | [S12-p7, S12-p10] |
| **Deadlock** | Everybody asleep and nobody can ever move: "the whole café is asleep", "a circle of waiting". | [S12-p12, S13-p12] |
| **Trace table** | One row per `wait`/`post`; values written *after* the step; a wait on 0 → name under *sleeping*; a post to a sleeper → the value stays, the sleeper wakes. | [S13-p2] |
| **Inside** | Past its `wait`, not yet at its `post`. | [S13-p3] |
| **In the middle of a step** | Holding a place or a plate that is not counted yet (e.g. the cook between `wait(empty)` and `post(full)`). | [S12-p10] |
| **Invariant** | The syllabus word. The slides state invariants without naming them, e.g. "empty + full = N, whenever nobody is in the middle of a step"; "inside never holds more than three names". | [S12-p9, S13-p4] |
| **Arrow X → Y** (precedence graph) | "X must be printed before Y". Rule: one semaphore per arrow; wait on every arrow in, post on every arrow out. | [S13-p7] |
| **Cycle** | Arrows that lead back (E → A). "In a cycle, exactly one semaphore starts at 1 — it says who goes first." | [S13-p6, S13-p8] |
| **pshared** | The middle argument of `sem_init`: 1 = shared by processes, so the semaphore must live in shared memory created before `fork`. 0 = threads of one process only. | [S12-p13, sem_shm.h] |
| **`shared_alloc`** | The course's shared memory in one call (`mmap` with the flags `MAP_SHARED` and `MAP_ANONYMOUS`), called before `fork`. | [shared_mem.h, S12-p13] |
| **`timeout` / 124** | `timeout 5 ./prog` stops a program after 5 s; exit code 124 means it had to. | [S13-p12, S13-p15] |
| **trywait** | What PostgreSQL's `max_connections` does: refuse at once instead of sleeping. 🔎 Look up in Track B: details. | [S13-p16] |
| **`accept_mutex`** | nginx's lock in front of `accept`, so the pool's workers take new callers in turn. | [S13-p16] |

---

## 4. Pattern catalogue as taught

### 4.1 One table

| # | pattern | semaphores & start values | code skeleton (as taught) | invariant | classic bug |
|---|---|---|---|---|---|
| 1 | **Lock** (mutual exclusion) | `mutex = 1` | `wait(mutex)` · critical section · `post(mutex)` | mutex + (number inside) = 1, so at most one inside ✅ | forgotten post on an error path; dying while holding the key; long sleep inside [S12-p12]; `mutex` starting at 0 → asleep from the first second (shelf Z) [S13-p14] |
| 2 | **Signal** ("A before B") | `s = 0` | A side: `… A …; post(s)` · B side: `wait(s); … B …` | B never happens before A | reading the value instead of waiting [S12-p12]; waiting on the wrong semaphore (shelf Y) [S13-p14] |
| 3 | **Limit / multiplex** | `stools = N` | `wait(stools)` · eat · `post(stools)` | stools + (number inside) = N, so inside ≤ N ✅ | post twice → "four customers on three stools"; a missing post → "a stool fewer, for ever" [S12-p12, S12-p4] |
| 4 | **Rendezvous** | `doneP1 = 0`, `doneP2 = 0` | Pᵢ: `post(own flag)` then `wait(other's flag)` | nobody passes the meeting point until both have arrived | not listed on the slides; ✅ checked: if **both** friends wait before posting, both sleep for ever |
| 5 | **Barrier** (non-reusable) | `N`, `arrived = 0` (int), `mutex = 1`, `gate = 0` | `wait(mutex)`; `arrived = arrived + 1`; `if arrived == N: post(gate)`; `post(mutex)`; `wait(gate)`; `post(gate)` | gate + (tourists passing) = 1 once arrived = N, 0 before; nobody passes early ✅ | reading the semaphore instead of keeping a shadow count [S12-p6, S12-p12]; ✅ no `post(gate)` after `wait(gate)` → only one tourist leaves |
| 6 | **Bounded buffer** (the trio) | `empty = N`, `full = 0`, `mutex = 1` | cook: `wait(empty); wait(mutex); put; post(mutex); post(full)` · waiter: `wait(full); wait(mutex); take; post(mutex); post(empty)` | empty + full = N whenever nobody is in the middle of a step [S12-p9]; mutex + holders = 1 ✅ | wrong wait order → deadlock [S12-p12, S13-p11, S13-p12]; one wrong line X/Y/Z [S13-p14] |
| 7 | **Turn-taking cycle** (ping-pong) | `ping = 1`, `pong = 0` | P1: `wait(ping); PING; post(pong)` · P2: `wait(pong); PONG; post(ping)` | ping + pong + (process holding the turn) = 1 → strict turns ✅ | wrong start values: 1/1 → can run one ahead; 0/0 → deadlock [S13-p6] |
| 8 | **Precedence arrows** (ordering) | one semaphore per arrow; all 0, except exactly one = 1 in a cycle | before a print, `wait` on every arrow in; after it, `post` on every arrow out | in the ABCDE cycle: (sum of all five semaphores) + (holders) = 1 ✅ | sharing one semaphore between arrows with different receivers (A→B & B→C) → "A C D", then everybody sleeps [S13-p8] |

### 4.2 Pattern cards (problem · semaphores · code · invariant · one trace)

Trace tables follow the rules of [S13-p2]: one row per step, values **after** the step, sleepers named, and a post to a sleeper keeps the value. Prints and plain assignments get their own row when they matter. Every table below was produced by my simulator of those rules (✅).

#### Card 1 — Lock (mutual exclusion) · start value 1
- **Problem:** shared data (`in`, `out`, the slots, `arrived`) must be touched by one process at a time. Otherwise you get Week 4's lost update, e.g. two cooks putting two plates into one place [S12-p10]. Café: "one key to the toilet" [S12-p3].
- **Semaphores:** `mutex = Semaphore(1)`, "the key is on its hook" [S12-p13].
- **Code as taught** (the key lines of the trio [S12-p10] and the barrier [S12-p6]):
```
mutex = Semaphore(1)      /* the key */

  wait(mutex)             /* take the key      */
  ... put the plate / take a plate / arrived = arrived + 1 ...
  post(mutex)             /* give the key back */
```
- **Invariant:** mutex + (processes between their `wait(mutex)` and `post(mutex)`) = 1, so at most one is inside ✅.
- **Rules from the slides:** every way out of the critical section posts; a lock protects data, not time (work outside it); never die holding it [S12-p12]; never go to sleep while holding the key [S13-p12].
- **Trace** (two processes, each `wait(mutex); print; post(mutex)`):

| step | who | operation | mutex | inside | sleeping | output |
|---|---|---|---|---|---|---|
| 0 | | (start) | 1 | — | — | — |
| 1 | P1 | wait(mutex) | 0 | P1 | — | — |
| 2 | P2 | wait(mutex) | 0 | P1 | P2 | — |
| 3 | P1 | print("1") | 0 | P1 | P2 | 1 |
| 4 | P1 | post(mutex) | **0** (key handed to P2) | P2 | — | 1 |
| 5 | P2 | print("2") | 0 | P2 | — | 12 |
| 6 | P2 | post(mutex) | 1 | — | — | 12 |

#### Card 2 — Signal ("A must happen before B") · start value 0
- **Problem:** one line must come after another, e.g. D only after C [S13-p9]. Café: "call me when the coffee is ready" [S12-p3].
- **Semaphores:** `s = Semaphore(0)`.
- **Code as taught** (the signal part of [S13-p9]):
```
s = Semaphore(0)

Process P2:              Process P3:
  ...                      wait(s)
  print("C")               print("D")
  ...
  post(s)
```
- **Invariant:** D is never printed before C. The only flag in `s` is made by P2's `post`, which comes after C ✅.
- **Trace A** (the waiter arrives first and sleeps):

| step | who | operation | s | sleeping | output |
|---|---|---|---|---|---|
| 0 | | (start) | 0 | — | — |
| 1 | P3 | wait(s) | 0 | P3 | — |
| 2 | P2 | print("C") | 0 | P3 | C |
| 3 | P2 | post(s) | **0** (flag goes to P3) | — | C |
| 4 | P3 | print("D") | 0 | — | CD |

- **Trace B** (the poster comes first, so the flag waits in the hole):

| step | who | operation | s | sleeping | output |
|---|---|---|---|---|---|
| 0 | | (start) | 0 | — | — |
| 1 | P2 | print("C") | 0 | — | C |
| 2 | P2 | post(s) | 1 | — | C |
| 3 | P3 | wait(s) | 0 | — | C |
| 4 | P3 | print("D") | 0 | — | CD |

#### Card 3 — Limit / multiplex · start value N
- **Problem:** several may be inside at once, but **never more than N** (three stools at the counter) [S12-p4].
- **Semaphores:** `stools = Semaphore(3)`.
- **Code as taught** [S12-p4]:
```
stools = Semaphore(3)   /* 3 free stools */

Customer:
  wait(stools)    /* sit down, or sleep by the door */
  eat
  post(stools)    /* free the stool */
```
- **Invariant:** stools + (customers inside) = 3, in every state ✅ (flags are only moved [S13-p4]). So inside ≤ 3.
- **Trace:** the real `./stools` run printed on [S13-p4] (C1, C2, C3 sit; C3, C2 leave; C4, C5 sit; C1, C4, C5 leave). This is one schedule consistent with that output, assuming all five reached `wait` early and the OS picked C4 first:

| step | who | operation | stools | inside | sleeping |
|---|---|---|---|---|---|
| 0 | | (start) | 3 | — | — |
| 1 | C1 | wait(stools) | 2 | C1 | — |
| 2 | C2 | wait(stools) | 1 | C1, C2 | — |
| 3 | C3 | wait(stools) | 0 | C1, C2, C3 | — |
| 4 | C4 | wait(stools) | 0 | C1, C2, C3 | C4 |
| 5 | C5 | wait(stools) | 0 | C1, C2, C3 | C4, C5 |
| 6 | C3 | post(stools) | 0 (flag goes to C4) | C1, C2, C4 | C5 |
| 7 | C2 | post(stools) | 0 (flag goes to C5) | C1, C4, C5 | — |
| 8 | C1 | post(stools) | 1 | C4, C5 | — |
| 9 | C4 | post(stools) | 2 | C5 | — |
| 10 | C5 | post(stools) | 3 | — | — |

  The slide's own exercise trace (a different order) is on [S13-p4] in §2.

#### Card 4 — Rendezvous · start values 0 and 0
- **Problem:** two processes must wait for each other at one point: "neither passes it until both have arrived" (two friends leave together) [S12-p5].
- **Semaphores:** `doneP1 = Semaphore(0)`, `doneP2 = Semaphore(0)`, one flag per friend.
- **Code as taught** [S12-p5]:
```
doneP1 = Semaphore(0)        doneP2 = Semaphore(0)

Process P1:                  Process P2:
  print("drink1")              print("drink2")
  post(doneP1)                 post(doneP2)
  wait(doneP2)                 wait(doneP1)
  print("leave1")              print("leave2")
```
- **Invariant:** no "leave" line before both "drink" lines. Each `done` semaphore holds at most 1 flag ✅. Exactly 4 outputs are possible: d1 d2 l1 l2, d1 d2 l2 l1, d2 d1 l1 l2, d2 d1 l2 l1 ✅.
- **Trace** (the slide's diagram: P1 finishes first and sleeps, and P2's post wakes it):

| step | who | operation | doneP1 | doneP2 | sleeping | output |
|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 0 | — | — |
| 1 | P1 | print("drink1") | 0 | 0 | — | drink1 |
| 2 | P1 | post(doneP1) | 1 | 0 | — | drink1 |
| 3 | P1 | wait(doneP2) | 1 | 0 | P1 | drink1 |
| 4 | P2 | print("drink2") | 1 | 0 | P1 | drink1 drink2 |
| 5 | P2 | post(doneP2) | 1 | **0** (flag goes to P1) | — | drink1 drink2 |
| 6 | P2 | wait(doneP1) | 0 | 0 | — | drink1 drink2 |
| 7 | P2 | print("leave2") | 0 | 0 | — | … leave2 |
| 8 | P1 | print("leave1") | 0 | 0 | — | … leave2 leave1 |

#### Card 5 — Barrier (non-reusable) · mutex 1, gate 0, shadow counter
- **Problem:** N processes wait at one point until all N have arrived, then all go on (the tour group) [S12-p6].
- **Semaphores & data:** `N = 4`, `arrived = 0` (ordinary int, the shadow counter), `mutex = Semaphore(1)` (guards `arrived`), `gate = Semaphore(0)` (closed).
- **Code as taught:** see [S12-p6] in §2. The turnstile is `wait(gate); post(gate)`.
- **Invariants** ✅ (N = 3, 4):
  - Nobody passes `wait(gate)` before `arrived == N`.
  - The gate holds at most 1 flag.
  - gate + (tourists between their `wait(gate)` and `post(gate)`) = 0 before the last arrival and 1 after it. In words: one flag circulates through the turnstile.
  - The end state is always `gate = 1`, `mutex = 1`, `arrived = N`.
- **Trace** (N = 4, the slide's picture: T1–T3 asleep at the gate, T4 arrives last):

| step | who | operation | mutex | gate | arrived | sleeping | output |
|---|---|---|---|---|---|---|---|
| 0 | | (start) | 1 | 0 | 0 | — | — |
| 1 | T1 | wait(mutex) | 0 | 0 | 0 | — | — |
| 2 | T1 | arrived = arrived + 1 | 0 | 0 | 1 | — | — |
| 3 | T1 | if arrived == N: post(gate) (no) | 0 | 0 | 1 | — | — |
| 4 | T1 | post(mutex) | 1 | 0 | 1 | — | — |
| 5 | T1 | wait(gate) | 1 | 0 | 1 | T1 | — |
| 6–10 | T2 | same five steps | 1 | 0 | 2 | T1, T2 | — |
| 11–15 | T3 | same five steps | 1 | 0 | 3 | T1, T2, T3 | — |
| 16 | T4 | wait(mutex) | 0 | 0 | 3 | T1, T2, T3 | — |
| 17 | T4 | arrived = arrived + 1 | 0 | 0 | 4 | T1, T2, T3 | — |
| 18 | T4 | if arrived == N: **post(gate)** | 0 | **0** (flag goes to T1) | 4 | T2, T3 | — |
| 19 | T4 | post(mutex) | 1 | 0 | 4 | T2, T3 | — |
| 20 | T4 | wait(gate) | 1 | 0 | 4 | T2, T3, T4 | — |
| 21 | T1 | post(gate) | 1 | 0 (flag goes to T2) | 4 | T3, T4 | — |
| 22 | T1 | leave | 1 | 0 | 4 | T3, T4 | L |
| 23 | T2 | post(gate) | 1 | 0 (flag goes to T3) | 4 | T4 | L |
| 24 | T2 | leave | 1 | 0 | 4 | T4 | LL |
| 25 | T3 | post(gate) | 1 | 0 (flag goes to T4) | 4 | — | LL |
| 26 | T3 | leave | 1 | 0 | 4 | — | LLL |
| 27 | T4 | post(gate) | 1 | **1** (nobody left to wake) | 4 | — | LLL |
| 28 | T4 | leave | 1 | 1 | 4 | — | LLLL |

  Rows 6–15 compress the same five steps for T2 and T3. Row 27 shows why the barrier can't be used a second time as written: the gate is left open (1) and `arrived` stays at 4 (see the ⚠️/🔎 on [S12-p6]).

#### Card 6 — Bounded buffer (the trio) · N, 0, 1
- **Problem:** cooks (producers) put plates on a shelf with N places, and waiters (consumers) take them. The three must-nevers: no plate on a full shelf, no taking from an empty shelf, no plate taken twice [S12-p7].
- **Semaphores:** `empty = Semaphore(N)` (free places), `full = Semaphore(0)` (plates), `mutex = Semaphore(1)` (the key) [S12-p10].
- **Code as taught:** the final version on [S12-p10] (in §2); the C version is on [S12-p14].
- **Invariants:**
  - "empty + full = N, whenever nobody is in the middle of a step" [S12-p9]. In every state, empty + full + (processes in the middle of a step) = N ✅.
  - mutex + (process holding the key) = 1 ✅.
- **Order rule:** wait for a place first, then for the key; post in the mirror order [S12-p10].
- **Trace** (N = 2, one cook, one waiter; one row per wait/post, so put and take are not shown):

| step | who | operation | empty | full | mutex | empty+full | key held by | sleeping |
|---|---|---|---|---|---|---|---|---|
| 0 | | (start) | 2 | 0 | 1 | 2 | — | — |
| 1 | Waiter | wait(full) | 2 | 0 | 1 | 2 | — | Waiter |
| 2 | Cook | wait(empty) | 1 | 0 | 1 | 1 | — | Waiter |
| 3 | Cook | wait(mutex) | 1 | 0 | 0 | 1 | Cook | Waiter |
| 4 | Cook | post(mutex) | 1 | 0 | 1 | 1 | — | Waiter |
| 5 | Cook | post(full) | 1 | **0** (plate goes to the waiter) | 1 | 1 | — | — |
| 6 | Waiter | wait(mutex) | 1 | 0 | 0 | 1 | Waiter | — |
| 7 | Cook | wait(empty) | 0 | 0 | 0 | 0 | Waiter | — |
| 8 | Cook | wait(mutex) | 0 | 0 | 0 | 0 | Waiter | Cook |
| 9 | Waiter | post(mutex) | 0 | 0 | **0** (key goes to the cook) | 0 | Cook | — |
| 10 | Waiter | post(empty) | 1 | 0 | 0 | 1 | Cook | — |
| 11 | Cook | post(mutex) | 1 | 0 | 1 | 1 | — | — |
| 12 | Cook | post(full) | 1 | 1 | 1 | 2 | — | — |

  In row 8 the cook sleeps on the key while **not** holding anything the waiter needs, so the waiter can finish and wake it. Compare [S13-p12], where the cook sleeps *holding* the key.

#### Card 7 — Turn-taking cycle (ping-pong) · 1 and 0
- **Problem:** two processes take strict turns for ever: "A before B, in a circle" [S13-p5].
- **Semaphores:** `ping = Semaphore(1)` (P1 goes first), `pong = Semaphore(0)`.
- **Code as taught:** [S13-p5] (in §2).
- **Invariant:** ping + pong + (the process between its wait and its post) = 1 in every state ✅. Exactly one flag (the turn) exists. With both at 1, the sum is 2, so a process can be one line ahead [S13-p6].
- **Trace** (1/0; P2 tries first and sleeps):

| step | who | operation | ping | pong | sleeping | output |
|---|---|---|---|---|---|---|
| 0 | | (start) | 1 | 0 | — | — |
| 1 | P2 | wait(pong) | 1 | 0 | P2 | — |
| 2 | P1 | wait(ping) | 0 | 0 | P2 | — |
| 3 | P1 | print("PING") | 0 | 0 | P2 | PING |
| 4 | P1 | post(pong) | 0 | **0** (turn goes to P2) | — | PING |
| 5 | P2 | print("PONG") | 0 | 0 | — | PING PONG |
| 6 | P2 | post(ping) | 1 | 0 | — | PING PONG |
| 7 | P1 | wait(ping) | 0 | 0 | — | PING PONG |

#### Card 8 — Precedence arrows (ordering) · one semaphore per arrow
- **Problem:** given arrows "X → Y: X must be printed before Y", make every scheduler produce only allowed outputs [S13-p7].
- **Recipe** ("The rules" + "Hint", [S13-p7]):
  1. Count the arrows. That is the number of semaphores; name each after its arrow (sAB for A → B).
  2. For each letter: `wait` on every arrow coming **in**, then print, then `post` on every arrow going **out**.
  3. Start values: 0 everywhere, except in a cycle, where **exactly one** semaphore starts at 1. Put it on the arrow into the letter that goes first ("it says who goes first", [S13-p6]).
  4. Fewer semaphores (sharing) is "an optimisation you must prove" [S13-p8].
- **Invariant** (ABCDE): sAB + sBC + sCD + sDE + sEA + (processes between a wait and their next post) = 1 in every state ✅. One flag travels round the cycle.
- **Trace:** one full round is in §5 W6.

---

## 5. Worked examples & trace tables

**Method (from the slides).**
- **Trace table rules:** one row per `wait`/`post`; values *after* the step; a wait on 0 → name under *sleeping*; a post to a sleeper → the value stays and the sleeper wakes [S13-p2].
- **Listing outputs:** write the key rule (lines kept apart) and the signal rule (one line after another), then list what survives [S13-p10]. "Find what cannot happen first; what is left is what can." [S13-p9]
- **Arrow pictures:** one semaphore per arrow; wait on arrows in, post on arrows out; in a cycle exactly one flag at the start [S13-p7, S13-p8].

### W1 — Attempt 1, one semaphore: what goes wrong? [S12-p8 → answer S12-p9]
**(a) N = 2, a fast cook, a slow waiter.** Putting a plate = write it into slot `in`, then `in = (in + 1) % N`.

| step | who | action | plates | slot 0 | slot 1 | in |
|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | — | — | 0 |
| 1 | Cook | put plate 1 in place 0 | 0 | 1 | — | 1 |
| 2 | Cook | post(plates) | 1 | 1 | — | 1 |
| 3 | Cook | put plate 2 in place 1 | 1 | 1 | 2 | 0 (ring) |
| 4 | Cook | post(plates) | 2 | 1 | 2 | 0 |
| 5 | Cook | put plate 3 in place 0 | 2 | **3** (on top of plate 1) | 2 | 1 |
| 6 | Cook | post(plates) | 3 | 3 | 2 | 1 |

- Plate 3 lands in place 0, on top of plate 1, which nobody served, so **plate 1 is lost**. That is must-never #1 [S12-p9].
- Note `plates = 3` on a 2-place shelf: nothing counts the **free places**.
- ✅ If the run continues, the waiter later also takes plate 3 a second time from place 0. The model shows both a lost plate and a duplicate.

**(b) Two waiters.** The shelf holds plate 1 in place 0 and plate 2 in place 1, with `plates = 2` and `out = 0`. Taking a plate = read slot `out`, then `out = out + 1`.

| step | who | action | plates | out | what they hold |
|---|---|---|---|---|---|
| 1 | W1 | wait(plates) | 1 | 0 | — |
| 2 | W2 | wait(plates) | 0 | 0 | — |
| 3 | W1 | read place `out` = 0 → plate 1 | 0 | 0 | W1: plate 1 |
| 4 | W2 | read place `out` = 0 → plate 1 | 0 | 0 | W2: plate 1 |
| 5 | W1 | out = 0 + 1 | 0 | 1 | |
| 6 | W2 | out = 0 + 1 | 0 | 1 | |

- Both serve plate 1, so **one plate is served twice**. That is must-never #3, Week 4's lost update with plates [S12-p7, S12-p9]. Plate 2 is still sitting there.
- **What's missing:**
  - Someone must count the free places (→ `empty`, [S12-p9]).
  - Someone must stop two waiters reading the same place (→ the key `mutex`, [S12-p10]).
- ✅ Model check, with real slots: lost plate and duplicate in (a), duplicate in (b).

### W2 — Attempt 2, traced (one cook, one waiter, N = 2) [S12-p9 → answer S12-p10]
- The full table is on [S12-p10] in §2. Row by row:
  - Rows 1–4: the cook takes a place (empty 2→1), announces a plate (full 0→1), and repeats (empty 0, full 2).
  - Row 5: `wait(empty)` on 0, so the **cook sleeps** (the shelf is full).
  - Row 6: the waiter takes a plate (full 2→1).
  - Row 7: the waiter's `post(empty)` finds a sleeper. **empty stays 0** and the cook wakes, already holding that place.
  - Row 8: the cook announces the plate (full 1→2).
  - Rows 9–10: the waiter takes one (full 1) and gives back a place (empty 1).
- **(b)** empty + full ≠ 2 in rows **1, 3, 6, 7, 9**:

| row | sum | who is in the middle of a step |
|---|---|---|
| 1 | 1 | the cook: has a place, plate not yet announced |
| 3 | 1 | the cook: same |
| 6 | 1 | the waiter: took a plate, has not given the place back |
| 7 | 1 | the cook: was handed the place by the waiter's post, plate not announced |
| 9 | 1 | the waiter: same as row 6 |

- So the invariant holds exactly "whenever nobody is in the middle of a step" [S12-p9]. ✅ In every reachable state: empty + full + (processes in the middle of a step) = N.

### W3 — Many cooks, many waiters: one key or two? [S12-p11]
- **(a) One key is enough.** Every touch of `in`, `out` and the places is under the same key, whoever you are. More cooks only lengthen the queue at the key.
- **(b) Two keys are correct and faster.**
  - Cooks only touch `in` and waiters only `out`.
  - `empty`/`full` already keep cooks and waiters on different places.
  - So `cookKey` guards `in` and `waiterKey` guards `out`, and a cook and a waiter can work at the same moment.
- ✅ Both versions checked over all interleavings (2 cooks × 2 plates, 2 waiters × 2 plates, N = 2): every plate served exactly once, no deadlock. Without any key, two cooks lose a plate and two waiters duplicate one.

### W4 — Five customers, three stools [S13-p3 → answer S13-p4]
- **How to fill the table:**
  - For each `wait`: if S > 0, write S − 1 and add the name to *inside*; if S = 0, S stays 0 and the name goes under *sleeping*.
  - For each `post`: if somebody sleeps, S stays the same and the sleeper moves to *inside* (rows 5 and 7: "flag goes to C4/C5"); otherwise S + 1.
- The answer table is on [S13-p4] in §2. ✅ It matches my simulator.
- **(b)** Never four. Rows 4 and 6 prove it: the fourth `wait` finds S = 0 and sleeps.
- **(c)** It must be back at 3, because flags are only moved, never made or destroyed. Every `wait` was matched by one `post`. In every row, S + (number inside) = 3 ✅, and at the end nobody is inside, so S = 3.
- The real run (`./stools`, 2.006 s) is traced in §4 Card 3.

### W5 — Ping-pong for ever: change only the start values [S13-p5 → answer S13-p6]
**As a precedence picture** (the diagram on [S13-p5]):

| arrow | meaning | semaphore | posted by → waited by | start |
|---|---|---|---|---|
| PING → PONG | "your turn, P2" | `pong` | P1 → P2 | 0 |
| PONG → PING | "your turn, P1" | `ping` | P2 → P1 | **1** (PING goes first) |

The two arrows form a cycle, so exactly one of them starts at 1 [S13-p6].

**(a) ping = 1, pong = 0** → `PING PONG PING PONG …`, strict turns, PING first. Trace: §4 Card 7.

**(b) ping = 1, pong = 1** → two flags exist, so a process can run one line ahead. This trace starts with PONG and then has two PINGs in a row:

| step | who | operation | ping | pong | sleeping | output |
|---|---|---|---|---|---|---|
| 0 | | (start) | 1 | 1 | — | — |
| 1 | P2 | wait(pong) | 1 | 0 | — | — |
| 2 | P2 | print("PONG") | 1 | 0 | — | PONG |
| 3 | P2 | post(ping) | 2 | 0 | — | PONG |
| 4 | P1 | wait(ping) | 1 | 0 | — | PONG |
| 5 | P1 | print("PING") | 1 | 0 | — | PONG PING |
| 6 | P1 | post(pong) | 1 | 1 | — | PONG PING |
| 7 | P1 | wait(ping) | 0 | 1 | — | PONG PING |
| 8 | P1 | print("PING") | 0 | 1 | — | PONG PING PING |
| 9 | P1 | post(pong) | 0 | 2 | — | PONG PING PING |
| 10 | P1 | wait(ping) | 0 | 2 | **P1** | PONG PING PING |

- Row 10: P1 has no `ping` flag left, so a third PING is impossible until P2 prints PONG.
- **Counting the flags** (the slide's hint):
  - Each PING uses a `ping` flag, and only a PONG gives one back. With 1 spare flag, #PING ≤ #PONG + 1, and likewise #PONG ≤ #PING + 1.
  - So the counts never differ by more than 1. Three PINGs in a row would need a difference of 2: **never** [S13-p6].
  - After every 2 lines the counts are equal, so each pair of lines is one PING plus one PONG [S13-p6].
  - ✅ 64 = 2⁶ different 12-line outputs, the longest run is 2, and each pair is "PING PONG" or "PONG PING".

**(c) ping = 0, pong = 0** → no flag anywhere:

| step | who | operation | ping | pong | sleeping | output |
|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 0 | — | — |
| 1 | P1 | wait(ping) | 0 | 0 | P1 | — |
| 2 | P2 | wait(pong) | 0 | 0 | P1, P2 | — |

Nothing is printed, both sleep for ever: a deadlock [S13-p6]. ⭐ Same code, different start values, different program.

### W6 — ABCDE for ever: derive the code from the precedence graph [S13-p7 → answer S13-p8]
**Step 1: count the arrows.** A→B, B→C, C→D, D→E, and the closing E→A: **5 arrows → 5 semaphores**, named after their arrows.

**Step 2: map each arrow to a semaphore and each letter to its waits and posts.**

| letter | process | arrow(s) in → `wait` before print | arrow(s) out → `post` after print |
|---|---|---|---|
| A | P1 | E→A → `wait(sEA)` | A→B → `post(sAB)` |
| B | P2 | A→B → `wait(sAB)` | B→C → `post(sBC)` |
| C | P3 | B→C → `wait(sBC)` | C→D → `post(sCD)` |
| D | P1 | C→D → `wait(sCD)` | D→E → `post(sDE)` |
| E | P2 | D→E → `wait(sDE)` | E→A → `post(sEA)` |

**Step 3: write each process in its own program order** (P1 prints A then D, P2 prints B then E, P3 prints C). The result is exactly the code on [S13-p8] (in §2). All ten blanks are used.

**Step 4: start values.** It's a cycle, so exactly one flag must exist at the start. A goes first, so the flag sits on the arrow *into* A: `sEA = 1`. All others are 0 [S13-p8].

**Step 5: why nothing else can be printed.** Each letter's only flag is posted by the letter before it [S13-p8]. ✅ Invariant: the five semaphores + (process holding the flag) = 1 in every state, and only ABCDEABCDE… is ever printed.

**One full round** (✅ simulator):

| step | who | operation | sAB | sBC | sCD | sDE | sEA | output |
|---|---|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 0 | 0 | 0 | 1 | — |
| 1 | P1 | wait(sEA) | 0 | 0 | 0 | 0 | 0 | — |
| 2 | P1 | print("A") | 0 | 0 | 0 | 0 | 0 | A |
| 3 | P1 | post(sAB) | 1 | 0 | 0 | 0 | 0 | A |
| 4 | P2 | wait(sAB) | 0 | 0 | 0 | 0 | 0 | A |
| 5 | P2 | print("B") | 0 | 0 | 0 | 0 | 0 | AB |
| 6 | P2 | post(sBC) | 0 | 1 | 0 | 0 | 0 | AB |
| 7 | P3 | wait(sBC) | 0 | 0 | 0 | 0 | 0 | AB |
| 8 | P3 | print("C") | 0 | 0 | 0 | 0 | 0 | ABC |
| 9 | P3 | post(sCD) | 0 | 0 | 1 | 0 | 0 | ABC |
| 10 | P1 | wait(sCD) | 0 | 0 | 0 | 0 | 0 | ABC |
| 11 | P1 | print("D") | 0 | 0 | 0 | 0 | 0 | ABCD |
| 12 | P1 | post(sDE) | 0 | 0 | 0 | 1 | 0 | ABCD |
| 13 | P2 | wait(sDE) | 0 | 0 | 0 | 0 | 0 | ABCD |
| 14 | P2 | print("E") | 0 | 0 | 0 | 0 | 0 | ABCDE |
| 15 | P2 | post(sEA) | 0 | 0 | 0 | 0 | 1 | ABCDE |

**Step 6: can arrows share a semaphore?** [S13-p8]
- **A→B and D→E: may share** (call it `X`). P1 does `post(X)` after A and after D, and P2 does `wait(X)` before B and before E.
  - Both arrows go P1 → P2, and P2 needs them in this order.
  - The second `post(X)` (after D) can only happen after C, and C needs B. So P2 has *already taken* the first flag.
  - At most one `X` flag exists at a time, so P2 always gets the right one. That makes 4 semaphores. ✅
- **A→B and B→C: never** (call it `X`). Different receivers (P2 and P3), so P3 can steal the flag meant for P2:

| step | who | operation | X | sCD | sDE | sEA | sleeping | output |
|---|---|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 0 | 0 | 1 | — | — |
| 1 | P1 | wait(sEA) | 0 | 0 | 0 | 0 | — | — |
| 2 | P1 | print("A") | 0 | 0 | 0 | 0 | — | A |
| 3 | P1 | post(X) | 1 | 0 | 0 | 0 | — | A |
| 4 | **P3** | wait(X) ← steals P2's flag | 0 | 0 | 0 | 0 | — | A |
| 5 | P3 | print("C") | 0 | 0 | 0 | 0 | — | AC |
| 6 | P3 | post(sCD) | 0 | 1 | 0 | 0 | — | AC |
| 7 | P1 | wait(sCD) | 0 | 0 | 0 | 0 | — | AC |
| 8 | P1 | print("D") | 0 | 0 | 0 | 0 | — | ACD |
| 9 | P1 | post(sDE) | 0 | 0 | 1 | 0 | — | ACD |
| 10 | P1 | wait(sEA) | 0 | 0 | 1 | 0 | P1 | ACD |
| 11 | P2 | wait(X) | 0 | 0 | 1 | 0 | P1, P2 | ACD |
| 12 | P3 | wait(X) | 0 | 0 | 1 | 0 | P1, P2, P3 | ACD |

  Output "A C D", then everybody sleeps, exactly as the slide says. The flag in `sDE` is stranded because P2 is stuck *before* B. ✅ This is the only kind of failure; it can also happen in a later round (e.g. ABCDE A C D).
- **C→D and E→A: prove it first** (call it `Y`, start 1). Same receiver P1, different senders P3 and P2. **Proof sketch:**
  1. At the start, `Y` holds the single flag of the cycle. P1 takes it and prints A.
  2. P1's next `wait(Y)` (before D) can only be answered by P3's post after C. P2's post comes after E, which needs D, which hasn't happened yet.
  3. P1's following `wait(Y)` (before the next A) can only be answered by P2's post after E. P3 can't post again before the next B, which needs the next A.
  4. So there is never more than one `Y` flag, and it always comes from the right sender. "Here the order saves you." ✅ All interleavings correct, no deadlock.
- ⭐ "A semaphore per arrow always works; fewer is an optimisation you must prove."
- ✅ **Extra start-value checks** (same code):
  - `sEA = 0`: nothing printed, all three asleep (no flag in the cycle).
  - `sEA = 2`: wrong outputs such as `ABCDA…` (A twice before E). ⭐ "In a cycle, the start values are the whole puzzle."

### W6b — The other arrow pictures on the slides, as edges → semaphores
| example | arrow (X must happen before Y) | semaphore | start | why that start value |
|---|---|---|---|---|
| Rendezvous [S12-p5] | drink1 → leave2 (orange arrow) | `doneP1` | 0 | no cycle: nobody starts with a flag |
| | drink2 → leave1 (green arrow) | `doneP2` | 0 | same |
| Ping-pong [S13-p5] | PING → PONG | `pong` | 0 | cycle: exactly one flag … |
| | PONG → PING | `ping` | 1 | … on the arrow into the line that goes first |
| Every possible output [S13-p9] | C → D | `s` | 0 | P2 posts after C; P3 waits before D |
| | (A–B kept apart from C) | `mutex` | 1 | the key is **not** an arrow: it keeps lines apart and orders nothing [S13-p10] |

### W7 — Every possible output [S13-p9 → answer S13-p10]
- **Write the rules down:**
  - **Program order:** A before B (both in P1).
  - **Rule 1 (key):** nothing between A and B except D. P1 holds the key from A to B, C also needs the key, and P3 (D) never takes it.
  - **Rule 2 (signal):** D after C, because `s` is posted only after C.
- **What survives: exactly 4.**

| output | how it happens [S13-p10] |
|---|---|
| A B C D | P1 takes the key first, then P2 prints C and posts `s`, and P3 prints D |
| C A B D | P2 first, then P1 prints A B before P3 runs |
| C A D B | P2 first; P3's D slips in **between** A and B (the trap) |
| C D A B | P2 first; P3 prints D before P1 starts |

- **The 20 impossible orders, grouped:**
  - 12 have D before C (Rule 2), e.g. `D C A B`, `A B D C`.
  - 6 have B before A (program order).
  - 2 have C between A and B (Rule 1): `A C B D`, `A C D B`.
  - 12 + 6 + 2 = 20 ✅.
- **Trace of the trap `C A D B`** (✅ simulator):

| step | who | operation | mutex | s | sleeping | output |
|---|---|---|---|---|---|---|
| 0 | | (start) | 1 | 0 | — | — |
| 1 | P2 | wait(mutex) | 0 | 0 | — | — |
| 2 | P2 | print("C") | 0 | 0 | — | C |
| 3 | P2 | post(mutex) | 1 | 0 | — | C |
| 4 | P1 | wait(mutex) | 0 | 0 | — | C |
| 5 | P1 | print("A") | 0 | 0 | — | CA |
| 6 | P2 | post(s) | 0 | 1 | — | CA |
| 7 | P3 | wait(s) | 0 | 0 | — | CA |
| 8 | P3 | print("D") | 0 | 0 | — | CAD |
| 9 | P1 | print("B") | 0 | 0 | — | CADB |
| 10 | P1 | post(mutex) | 1 | 0 | — | CADB |

  P1 holds the key in rows 4–10, but P3 never asks for it. "A lock keeps out only those who also use it." ⭐ "A key keeps lines apart; a signal puts them in order."

### W8 — Swap two lines: the deadlocked shelf [S13-p11 → answer S13-p12]
- Start: N = 1, the shelf already holds a plate: `empty = 0`, `full = 1`, `mutex = 1`. The cook does `wait(mutex)` **before** `wait(empty)`.
- The 4-row answer table is on [S13-p12] in §2. The key moment is row 2: the cook goes to sleep on `empty` **while holding the key**.
- **Who waits for whom:** the cook waits for `empty`, which only the waiter can post after taking the plate under the key. The waiter waits for the key, which only the sleeping cook can give back. A circle → deadlock.
- **(b) In one sentence:** the cook went to sleep holding the key; the fix is to wait for a place first, then for the key [S12-p12].
- **Why tests can pass:** if the waiter moves first (takes the plate and posts `empty`), the cook's `wait(empty)` succeeds and the café survives [S13-p12].
- **The code version** (`shelf_deadlock.c`) starts with an empty 1-place shelf. After the cook's first plate, if the waiter has not moved yet, it is in exactly this state, and the bad order gets a chance on every one of the 1000 plates. In the slide's Linux run it hung: `timeout` → exit code 124, and `ps` showed 3 processes in state `S` with 0 CPU [S13-p12].
- ✅ All interleavings: deadlock reachable (cook on `empty`, waiter on `mutex`); with the waits in the right order, none.

### W9 — Three broken shelves [S13-p13 → answer S13-p14]
Ask, as the slide says: each cook step uses one free place and makes one plate. Does each waiter step do the opposite? Who gives back what, and who can never start?

- **X — the waiter never posts `empty`.**
  - The cook gets the 4 places once: `cooked 1` … `cooked 4` (empty 4→0, full 0→4).
  - The waiter takes the 4 plates: `served 1` … `served 4` (full 4→0), but gives no place back.
  - Next, the cook's `wait(empty)` sleeps and the waiter's `wait(full)` sleeps: **silence**.
  - Fix: `post(empty)` after taking the plate.
  - ✅ Always exactly these 8 lines (14 possible orders), ending with the cook on `empty` and the waiter on `full`.
- **Y — the waiter waits on `empty`, not `full`.** One possible run (✅ simulator):
  1. The waiter goes first: `wait(empty)` 4→3, takes slot 0 (nothing cooked there yet) and prints a "served" line for a never-cooked plate, then `post(empty)` 3→4.
  2. The cook does 4 rounds: `cooked 1` … `cooked 4`, and empty reaches 0.
  3. The waiter's `wait(empty)` sleeps, and the cook's next `wait(empty)` sleeps too: **both on `empty`**.
  4. Plates 1–4 are never served, which is the slide's "real plates lost".
  - In other runs the waiter serves an already-served plate (a duplicate).
  - The waiter's wait and post on `empty` cancel out, so the cook still runs out of places after 4 plates [S13-p14].
  - Fix: `wait(full)`.
- **Z — `mutex` starts at 0.**
  - The cook passes `wait(empty)` (4→3) and sleeps on `mutex`. The waiter sleeps on `full` (still 0).
  - **Nothing at all is printed**, asleep from the first second.
  - Fix: `mutex = Semaphore(1)`.
- ⭐ "Each semaphore has one job: count places, count plates, or guard the shelf." Each bug gives one semaphore the wrong job, or none.

---

### Practice tasks (new, in the workshop style of [S13]): answers follow each task
These are **new** exercises built only from this week's patterns and rules. Try each on paper before reading the answer. Every answer was checked by enumerating all interleavings (✅).

#### Practice 1 — Fill in the missing waits and posts: "Opening time"
```
door   = Semaphore(__)
stools = Semaphore(__)

Cook:                    Customer C1 … C4:
  print("open")            ________
  ________                 ________
                           ________
                           print("Ck eats")
                           ________
```
Requirements:
1. No customer eats before "open" is printed.
2. At most **2** customers eat at the same time.
3. Every customer eats in the end, whatever the scheduler does.
4. The cook posts on `door` **only once**.

Fill the blanks and the two start values. Then say what goes wrong if a customer forgets the second line.

**Answer**
```
door   = Semaphore(0)     /* closed: a signal, "open before eat"   */
stools = Semaphore(2)     /* a limit: two stools                   */

Cook:                    Customer C1 … C4:
  print("open")            wait(door)       /* pass ...                 */
  post(door)               post(door)       /* ... and let the next in  */
                           wait(stools)     /* sit down, or sleep        */
                           print("Ck eats")
                           post(stools)     /* free the stool            */
```
- **Why it works:**
  - `door` starts at 0, so it is a **signal**: nobody passes `wait(door)` before the cook's post, which comes after "open" [S12-p3].
  - The cook posts only once, so each customer must pass the flag on with **"wait, then post at once"**, the turnstile of [S12-p6].
  - `stools = 2` is the **limit** of [S12-p4].
- **One trace** (✅ simulator; C1 and C2 arrive before the door opens):

| step | who | operation | door | stools | sleeping | output |
|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 2 | — | — |
| 1 | C1 | wait(door) | 0 | 2 | C1 | — |
| 2 | C2 | wait(door) | 0 | 2 | C1, C2 | — |
| 3 | Cook | print("open") | 0 | 2 | C1, C2 | open |
| 4 | Cook | post(door) | 0 (flag goes to C1) | 2 | C2 | open |
| 5 | C1 | post(door) | 0 (flag goes to C2) | 2 | — | open |
| 6 | C1 | wait(stools) | 0 | 1 | — | open |
| 7 | C1 | print("C1 eats") | 0 | 1 | — | open C1 |
| 8 | C2 | post(door) | 1 | 1 | — | open C1 |
| 9 | C2 | wait(stools) | 1 | 0 | — | open C1 |
| 10 | C3 | wait(door) | 0 | 0 | — | open C1 |
| 11 | C3 | post(door) | 1 | 0 | — | open C1 |
| 12 | C3 | wait(stools) | 1 | 0 | C3 | open C1 |
| 13 | C1 | post(stools) | 1 | 0 (stool goes to C3) | — | open C1 |
| 14 | C3 | print("C3 eats") | 1 | 0 | — | open C1 C3 |
| 15 | C2 | print("C2 eats") | 1 | 0 | — | open C1 C3 C2 |
| 16 | C2 | post(stools) | 1 | 1 | — | open C1 C3 C2 |
| 17 | C4 | wait(door) | 0 | 1 | — | open C1 C3 C2 |
| 18 | C4 | post(door) | 1 | 1 | — | open C1 C3 C2 |
| 19 | C4 | wait(stools) | 1 | 0 | — | open C1 C3 C2 |
| 20 | C3 | post(stools) | 1 | 1 | — | open C1 C3 C2 |
| 21 | C4 | print("C4 eats") | 1 | 1 | — | open C1 C3 C2 C4 |
| 22 | C4 | post(stools) | 1 | 2 | — | open C1 C3 C2 C4 |

- **Invariants:**
  - stools + (customers eating) = 2, so never 3 eating ✅.
  - `door` holds at most 1 flag, and it ends at 1, the same "gate left open" end state as [S12-p6].
- **If a customer forgets `post(door)`:** only the first customer through the door gets in. The other three sleep on `door` for ever ✅. This is the "forgotten post" row of [S12-p12].
- **Other checks:**
  - `stools = 3` breaks requirement 2: three can eat at once ✅.
  - If the cook posted `door` four times, the program would also be correct ✅, but that breaks requirement 4.

#### Practice 2 — Trace this program and give every possible output
```
mutex = Semaphore(1)
s     = Semaphore(0)

Process P1:          Process P2:          Process P3:
  wait(mutex)          wait(s)              wait(mutex)
  print("X")           print("Z")           print("W")
  post(s)                                   post(mutex)
  print("Y")
  post(mutex)
```
- **(a)** Of the 24 orders of W, X, Y, Z, list every one this program can print.
- **(b)** Give a one-line reason for two impossible orders.
- **(c)** Write the trace table for `X Z Y W`.

**Answer**
- **The rules** (the [S13-p10] method):
  - **Program order:** X before Y.
  - **Key rule:** W is not between X and Y. P1 holds the key from X to Y, and P3 needs the key for W.
  - **Signal rule:** Z after X, because `s` is posted right after X.
  - The **trap:** Z *may* fall between X and Y, because P2 never takes the key.
- **(a) Exactly 5 outputs** ✅: `W X Y Z`, `W X Z Y`, `X Y W Z`, `X Y Z W`, `X Z Y W`.
- **(b)** For example:
  - `X W Y Z` is impossible: W would need the key while P1 holds it from X to Y.
  - `Z X Y W` is impossible: Z needs the flag in `s`, which is posted only after X.
  - (Also `Y X W Z`: Y can't come before X in P1.)
- **(c) Trace of `X Z Y W`** (✅ simulator):

| step | who | operation | mutex | s | sleeping | output |
|---|---|---|---|---|---|---|
| 0 | | (start) | 1 | 0 | — | — |
| 1 | P1 | wait(mutex) | 0 | 0 | — | — |
| 2 | P1 | print("X") | 0 | 0 | — | X |
| 3 | P1 | post(s) | 0 | 1 | — | X |
| 4 | P2 | wait(s) | 0 | 0 | — | X |
| 5 | P2 | print("Z") | 0 | 0 | — | XZ |
| 6 | P1 | print("Y") | 0 | 0 | — | XZY |
| 7 | P1 | post(mutex) | 1 | 0 | — | XZY |
| 8 | P3 | wait(mutex) | 0 | 0 | — | XZY |
| 9 | P3 | print("W") | 0 | 0 | — | XZYW |
| 10 | P3 | post(mutex) | 1 | 0 | — | XZYW |

#### Practice 3 — Spot the bug: three broken cafés (one mistake each)
**Café L** (limit, 5 customers):
```
stools = Semaphore(3)

Customer C1 … C5:
  wait(stools)
  eat
  post(stools)
  post(stools)
```
**Café R** (rendezvous):
```
doneP1 = Semaphore(0)          doneP2 = Semaphore(0)

Process P1:                    Process P2:
  print("drink1")                print("drink2")
  wait(doneP2)                   wait(doneP1)
  post(doneP1)                   post(doneP2)
  print("leave1")                print("leave2")
```
**Café B** (barrier, N = 4, `arrived = 0`, `mutex = Semaphore(1)`, `gate = Semaphore(0)`):
```
Tourist:
  wait(mutex)
  arrived = arrived + 1
  if arrived == N:
     post(gate)
  post(mutex)
  wait(gate)
  leave
```
For each café: what do you see, who ends up asleep (on which semaphore), the one-line fix, and the matching row of the classic-mistakes table [S12-p12].

**Answer**

| café | what you see | asleep at the end | fix | classic mistake |
|---|---|---|---|---|
| **L** | E.g. C1–C3 sit and C1 leaves with two posts: `stools` now holds 2 flags while C2 and C3 are still inside, so C4 and C5 sit too: **four customers on three stools** ✅ (the maximum inside is 4). The program still finishes, with `stools` ending at 8 (3 + 5 extra flags) ✅. | nobody | exactly one `post(stools)` per `wait(stools)` | "post twice for one wait" |
| **R** | `drink1` and `drink2` are printed, then **nothing**. Each friend waits for the other's flag before posting his own. | P1 on `doneP2`, P2 on `doneP1` (a circle of waiting) ✅ | announce first, then wait: `post` before `wait` [S12-p5] | no row of its own: it breaks the rendezvous rule "each one announces first, then waits" [S12-p5]. Like the "wrong wait order" row, it ends with everyone asleep |
| **B** | The last arrival's `post(gate)` lets **exactly one** tourist through, and nobody re-opens the gate: one `leave`, then silence ✅. | the other three tourists, on `gate` | add `post(gate)` right after `wait(gate)` ("wait, then post at once", [S12-p6]) | "a forgotten post": one by one everybody sleeps |

- ✅ Check on R: swapping the two lines in **only one** friend is still correct, because the other friend's flag arrives anyway. The café only dies when **both** wait first. So this bug can hide when only one side has it.
- Café B, the tail of one run (rows 15–21, ✅ simulator; rows 1–14 are as in §4 Card 5):

| step | who | operation | mutex | gate | arrived | sleeping | output |
|---|---|---|---|---|---|---|---|
| 15 | T3 | wait(gate) | 1 | 0 | 3 | T1, T2, T3 | — |
| 16 | T4 | wait(mutex) | 0 | 0 | 3 | T1, T2, T3 | — |
| 17 | T4 | arrived = arrived + 1 | 0 | 0 | 4 | T1, T2, T3 | — |
| 18 | T4 | if arrived == N: post(gate) | 0 | 0 (flag goes to T1) | 4 | T2, T3 | — |
| 19 | T4 | post(mutex) | 1 | 0 | 4 | T2, T3 | — |
| 20 | T4 | wait(gate) | 1 | 0 | 4 | T2, T3, T4 | — |
| 21 | T1 | leave | 1 | 0 | 4 | T2, T3, T4 | L |

#### Practice 4 — Derive the code from a precedence graph
**The graph, in words.** Four processes each print one letter, for ever: P1 prints A, P2 prints B, P3 prints C, P4 prints D. Arrows ("X → Y: X before Y"):
- **A → B, A → C** (A fans out to B and C),
- **B → D, C → D** (D waits for both),
- **D → A** (the cycle closes).

Picture A on the left, B above and C below in the middle, D on the right, and a long arrow from D back to A.
- **(a)** How many semaphores? Name them and give every start value.
- **(b)** Write the code.
- **(c)** What can be printed in the first round?
- **(d)** Could **B → D** and **C → D** share one semaphore?
- **(e)** Could **A → B** and **A → C** share one semaphore?
- **(f)** What happens if the semaphore on D → A starts at 0? At 2?

**Answer**
- **(a)** 5 arrows → **5 semaphores**: `sAB = sAC = sBD = sCD = Semaphore(0)` and `sDA = Semaphore(1)`. It is a cycle, so exactly one flag is needed, and it goes on the arrow into A, because A goes first.
- **(b)** Wait on every arrow in, print, post on every arrow out [S13-p7]:
```
sAB = sAC = sBD = sCD = Semaphore(0)
sDA = Semaphore(1)                     /* A goes first */

P1: loop { wait(sDA);  print("A");  post(sAB); post(sAC) }
P2: loop { wait(sAB);  print("B");  post(sBD) }
P3: loop { wait(sAC);  print("C");  post(sCD) }
P4: loop { wait(sBD);  wait(sCD);  print("D");  post(sDA) }
```
- **(c)** `A B C D` or `A C B D`. There is no arrow between B and C, so either can come first. Every later round is again A, then B and C in either order, then D. ✅ 8 different 12-letter outputs = 2 choices in each of 3 rounds.
- **One round** (✅ simulator; P4 arrives early and sleeps):

| step | who | operation | sAB | sAC | sBD | sCD | sDA | sleeping | output |
|---|---|---|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 0 | 0 | 0 | 1 | — | — |
| 1 | P4 | wait(sBD) | 0 | 0 | 0 | 0 | 1 | P4 | — |
| 2 | P1 | wait(sDA) | 0 | 0 | 0 | 0 | 0 | P4 | — |
| 3 | P1 | print("A") | 0 | 0 | 0 | 0 | 0 | P4 | A |
| 4 | P1 | post(sAB) | 1 | 0 | 0 | 0 | 0 | P4 | A |
| 5 | P1 | post(sAC) | 1 | 1 | 0 | 0 | 0 | P4 | A |
| 6 | P3 | wait(sAC) | 1 | 0 | 0 | 0 | 0 | P4 | A |
| 7 | P3 | print("C") | 1 | 0 | 0 | 0 | 0 | P4 | AC |
| 8 | P3 | post(sCD) | 1 | 0 | 0 | 1 | 0 | P4 | AC |
| 9 | P2 | wait(sAB) | 0 | 0 | 0 | 1 | 0 | P4 | AC |
| 10 | P2 | print("B") | 0 | 0 | 0 | 1 | 0 | P4 | ACB |
| 11 | P2 | post(sBD) | 0 | 0 | 0 (flag goes to P4) | 1 | 0 | — | ACB |
| 12 | P4 | wait(sCD) | 0 | 0 | 0 | 0 | 0 | — | ACB |
| 13 | P4 | print("D") | 0 | 0 | 0 | 0 | 0 | — | ACBD |
| 14 | P4 | post(sDA) | 0 | 0 | 0 | 0 | 1 | — | ACBD |

- **(d) Yes, with a proof** (the "same receiver" case of [S13-p8]). Use one `sD = Semaphore(0)`: P2 and P3 each `post(sD)`, and P4 does `wait(sD); wait(sD)`.
  - P4 needs both flags anyway and doesn't care which arrives first.
  - P2 and P3 can each post only once per round, since their next post needs the next A, which needs D first.
  - So exactly two flags arrive per round, one from each. ✅ Same outputs, no deadlock.
- **(e) No** (the "different receivers: never" case of [S13-p8]). With one `sA` that P1 posts twice, **P2 can take both flags**. You get `A B B`, then P3 waits on `sA`, P4 waits on `sCD` for ever, and P1 waits on `sDA`: everybody sleeps. ✅ The model finds `A B B` and `A C C`, each followed by deadlock.
- **(f)**
  - `sDA = 0`: there is no flag in the cycle, so nothing is printed and all four sleep (like ping-pong 0/0 [S13-p6]) ✅.
  - `sDA = 2`: there are two flags, so A can be printed twice before D, e.g. `A A B B C C D …` ✅, which is wrong. ⭐ "In a cycle, exactly one semaphore starts at 1 — it says who goes first."

---

## 6. Likely exam questions (built only from these slides)

**Q1 (MCQ: start values).** Match each start value to its job.
- Start values: (i) 1, (ii) 0, (iii) N, (iv) 0 and 0, (v) N, 0 and 1.
- Jobs: limit, rendezvous, lock, bounded buffer, signal.

**Q2 (MCQ: semantics).** `S` is 0 and two processes are asleep on `S`. A third process calls `post(S)`. Right after the post:
- (a) S = 1 and both sleepers wake
- (b) S stays 0 and exactly one sleeper wakes, already past its `wait`
- (c) S = 1 and nobody wakes until someone reads S
- (d) the posting process goes to sleep

**Q3 (MCQ: the two rules).** Which line breaks one of the "two rules that never change"?
- (a) `if S > 0: wait(S)`
- (b) `S = Semaphore(3)` at the start
- (c) `wait(empty)` followed by `wait(mutex)`
- (d) `post(mutex)` followed by `post(full)`

**Q4 (fill in the waits/posts: the trio).** Fill in the three start values and the eight blanks:
```
empty = Semaphore(__)    full = Semaphore(__)    mutex = Semaphore(__)

Cook:                     Waiter:
  loop {                    loop {
    cook a plate              ________
    ________                  ________
    ________                  take a plate
    put the plate             ________
    ________                  ________
    ________                  serve it
  }                         }
```

**Q5 (start values).** Give every start value:
- (a) the rendezvous for two friends;
- (b) the barrier for a tour group of 5, including the shadow counter;
- (c) a café with 4 stools;
- (d) the pass shelf with 6 places.

**Q6 (trace table).** `S = Semaphore(2)`. Four customers each run `wait(S); eat; post(S)`. The steps happen in this order: C1 wait, C2 wait, C3 wait, C4 wait, C1 post, C2 post, C3 post, C4 post. Fill in *S after*, *sleeping* and *inside*.

**Q7 (invariant).** On the pass shelf with N = 2 you see `empty = 0` and `full = 1` after some step. What can you conclude, and why?

**Q8 (possible outputs).** List every possible output:
```
mutex = Semaphore(1)
s     = Semaphore(0)

P1: wait(mutex); print("A"); post(mutex)
P2: wait(mutex); print("B"); print("C"); post(mutex); post(s)
P3: wait(s); print("D")
```

**Q9 (possible outputs: ping-pong).** Ping-pong with **both** semaphores starting at 1. Which of these can be the first four lines?
- (i) PING PONG PONG PING
- (ii) PONG PING PING PONG
- (iii) PING PING PONG PONG
- (iv) PING PING PING PONG

**Q10 (deadlock or not?).** For each change, say "deadlock possible" or "no deadlock", and give a one-line reason.
- (a) The trio with the cook's waits swapped: `wait(mutex)` before `wait(empty)`.
- (b) The trio with the waiter's two posts swapped: `post(empty)` before `post(mutex)`.
- (c) Ping-pong with `ping = 0`, `pong = 0`.
- (d) The trio with `mutex = Semaphore(0)`.

**Q11 (barrier correctness).** The barrier of [S12-p6] with N = 3.
- (a) What are `gate`, `mutex` and `arrived` after all three have left?
- (b) Who calls `post(gate)` first, and how many `post(gate)` calls happen in total?
- (c) Why can't the tourists decide "am I last?" by reading the value of a semaphore?

**Q12 (barrier: spot the bug).** A student types the test as `if arrived > N:` instead of `if arrived == N:`. Everything else is as on [S12-p6], with N = 4. What happens, and who sleeps on what?

**Q13 (spot the bug: limit).** A customer does `wait(stools)`, then finds the soup cold and returns at once **without** `post(stools)`. `stools` starts at 3. What happens to the café if this happens three times? Name the classic mistake and its fix.

**Q14 (classic mistakes: matching).** Match each symptom to a mistake.
- Symptoms:
  1. runs for a while, then the whole café is asleep
  2. works in every test, fails under load
  3. everyone queues at the key; correct and slow
  4. after a crash, everyone who needs the key sleeps for ever
  5. four customers on three stools
- Mistakes:
  - (a) post twice for one wait
  - (b) a long sleep inside the critical section
  - (c) wrong wait order
  - (d) reading the value to decide
  - (e) a process killed while holding the key

**Q15 (precedence graph: ABCDE).**
- (a) How many semaphores does "one per arrow" give, and what are their start values?
- (b) Which pair of arrows may share one semaphore, and why?
- (c) Why can A→B and B→C never share?
- (d) What is printed if `sEA` starts at 0?

**Q16 (derive code from a graph).** A one-shot program: P1 prints X, P2 prints Y, P3 prints Z. Arrows: X → Y, Y → Z, X → Z.
- (a) Write the code with one semaphore per arrow and give the start values.
- (b) Can you drop the semaphore for X → Z? Justify.

**Q17 (broken shelf variant).** Same café as [S13-p13] (N = 4, one cook, one waiter). This time the waiter is correct, but the **cook** forgets `post(full)`. What is printed, who ends up asleep on what, and what is the one-line fix?

**Q18 (C and the OS).**
- (a) Why must `shared_alloc` be called before `fork()`?
- (b) In `sem_init(&s->mutex, 1, 1)`, what does each `1` mean?
- (c) After a deadlock, `ps` shows the processes in state `S` with `TIME 00:00:00`. What does that tell you?
- (d) `timeout 5 ./shelf_deadlock 1000; echo $?` prints 124. What does 124 mean?

**Q19 (MCQ: the trap).** In [S13-p9], why can D be printed between A and B?
- (a) P1 gives the key back between A and B
- (b) P3 never takes the key, and a lock keeps out only those who also use it
- (c) `s` starts at 1
- (d) the scheduler is broken

**Q20 (MCQ: what the OS did).** Which of these did the OS **not** do for you this week?
- (a) put a waiting process to sleep so that it costs no CPU
- (b) wake exactly one sleeper on each post
- (c) put the flag back when a process died holding the key
- (d) keep the semaphores in shared memory made before `fork`

### Answers

- **A1.**
  - 1 = lock; 0 = signal; N = limit; 0 and 0 = rendezvous; N, 0 and 1 = bounded buffer [S12-p3].
  - The barrier (mutex 1, gate 0, plus a shadow counter) is the extra pattern [S12-p6, S13-p2].
- **A2. (b).** `post` gives the flag to one sleeper, and the OS picks which one; on paper "the value stays, the sleeper wakes" [S12-p3, S12-p4, S13-p2].
- **A3. (a).** It reads the value: "never read the value" [S13-p2], and "if S > 0 then …" is the classic mistake that "works in every test, fails under load" [S12-p12].
  - (c) is the correct wait order, and (d) is the taught mirror order [S12-p10].
- **A4.** `empty = N`, `full = 0`, `mutex = 1` [S12-p10].
  - Cook: `wait(empty)`, `wait(mutex)`, put the plate, `post(mutex)`, `post(full)`.
  - Waiter: `wait(full)`, `wait(mutex)`, take a plate, `post(mutex)`, `post(empty)`.
  - Rule: "Wait for a place first, then for the key; post in the mirror order."
- **A5.** [S13-p2]
  - (a) `doneP1 = 0`, `doneP2 = 0`.
  - (b) `N = 5`, `arrived = 0` (an ordinary int), `mutex = 1`, `gate = 0`.
  - (c) `stools = 4`.
  - (d) `empty = 6`, `full = 0`, `mutex = 1`.
- **A6.** ✅ simulator. Method of [S13-p2], [S13-p4]. The OS may give the flag in row 5 to C4 instead; then C3 and C4 swap places in rows 5–6.

| # | operation | S after | sleeping | inside |
|---|---|---|---|---|
| 0 | (start) | 2 | — | — |
| 1 | C1: wait(S) | 1 | — | C1 |
| 2 | C2: wait(S) | 0 | — | C1, C2 |
| 3 | C3: wait(S) | 0 | C3 | C1, C2 |
| 4 | C4: wait(S) | 0 | C3, C4 | C1, C2 |
| 5 | C1: post(S) | 0 (flag goes to C3) | C4 | C2, C3 |
| 6 | C2: post(S) | 0 (flag goes to C4) | — | C3, C4 |
| 7 | C3: post(S) | 1 | — | C4 |
| 8 | C4: post(S) | 2 | — | — |

- **A7.** empty + full = 1 ≠ N = 2, so **somebody is in the middle of a step** [S12-p9, S12-p10]. Either a cook holds a place whose plate isn't announced yet (between `wait(empty)` and `post(full)`), or a waiter holds a plate whose place isn't given back yet (between `wait(full)` and `post(empty)`). The invariant only promises the sum when nobody is mid-step.
- **A8.** Exactly **3** ✅: `A B C D`, `B C A D`, `B C D A`.
  - B and C sit together under the key, so A (also under the key) can't come between them.
  - D comes after C (the signal).
  - A can come last, because P1 may simply run late.
  - Method: [S13-p10].
- **A9.** [S13-p6]
  - (i) Yes.
  - (ii) Yes: PONG can go first, and two PINGs in a row are allowed.
  - (iii) No: every pair of lines (1–2, 3–4) holds one PING and one PONG, so PING PING can't be lines 1–2.
  - (iv) No: three PINGs in a row are never possible, since one spare flag lets you be at most one line ahead.
- **A10.**
  - (a) **Deadlock possible.** The cook sleeps on `empty` while holding the key, and the waiter sleeps on `mutex` [S13-p11, S13-p12, S12-p12].
  - (b) **No deadlock** ✅. A `post` never sleeps (definition on [S12-p3]), so swapping two posts cannot create a circle of waiting. The slide still teaches the mirror order [S12-p10].
  - (c) **Deadlock at once.** Nothing is printed; both sleep in their first `wait` [S13-p6].
  - (d) **Everyone asleep from the first second.** The cook sleeps on `mutex` and the waiter on `full`; nothing is printed [S13-p14].
- **A11.**
  - (a) `gate = 1`, `mutex = 1`, `arrived = 3` ✅. The gate is left open and the count never resets, which fits "(non-reusable)" [S12-p6].
  - (b) The **last to arrive** posts first, inside `if arrived == N`. In total there are N + 1 = **4** `post(gate)` calls: 1 by the last arrival plus 1 per tourist in the turnstile. With 3 `wait(gate)` calls, the gate ends at 4 − 3 = 1 ✅.
  - (c) "You may not read a semaphore — so keep your own count, under a lock" [S12-p6]. Reading the value is the classic mistake that "works in every test, fails under load" [S12-p12].
- **A12.** `arrived` never goes above N, so the test is never true and **nobody ever opens the gate**. All 4 tourists sleep on `gate` for ever and nobody leaves ✅. It works like a forgotten post: the only post that creates the gate's flag never happens [S12-p6, S12-p12].
- **A13.** Each early return keeps a stool for ever: "One missing post and the café has a stool fewer, for ever" [S12-p4]. After three of them `stools` is 0 for good, so every later customer sleeps by the door ("one by one everybody sleeps").
  - Mistake: **a forgotten post on an error path**.
  - Fix: **every way out of the critical section posts** [S12-p12].
- **A14.** 1 → (c), 2 → (d), 3 → (b), 4 → (e), 5 → (a) [S12-p12].
- **A15.**
  - (a) 5 semaphores: `sAB = sBC = sCD = sDE = 0`, `sEA = 1` (A goes first) [S13-p8].
  - (b) **A→B and D→E.** Both go from P1 to P2, P2 needs them in that order, and the second is posted only after the first was taken. That leaves 4 semaphores [S13-p8].
  - (c) They have different receivers: P3 can take the flag meant for P2, print **A C D**, and then everybody sleeps [S13-p8].
  - (d) **Nothing.** There is no flag in the cycle, so all three sleep at their first `wait` ✅ (as in ping-pong 0/0, [S13-p6]).
- **A16.**
  - (a) `sXY = sYZ = sXZ = Semaphore(0)`. There is no cycle, so all start at 0. Output is always `X Y Z` ✅.
    ```
    P1: print("X"); post(sXY); post(sXZ)
    P2: wait(sXY); print("Y"); post(sYZ)
    P3: wait(sYZ); wait(sXZ); print("Z")
    ```
  - (b) **Yes.** Z already waits for Y, and Y waits for X, so "X before Z" holds through Y. Without `sXZ` the output is still only `X Y Z` ✅. This is a proven optimisation: "a semaphore per arrow always works; fewer is an optimisation you must prove" [S13-p8].
- **A17.**
  - The cook prints `cooked 1` … `cooked 4`, then silence. The waiter never prints anything, because it sleeps on `full` from the start (no one posts `full`). After 4 plates the cook sleeps on `empty` ✅.
  - Fix: `post(full)` after `post(mutex)`.
  - "Each semaphore has one job": here `full` has none [S13-p14].
- **A18.**
  - (a) So that the parent and the children see the **same** bytes (the shelf and its semaphores), not copies: "before fork: both see it" [S12-p13, shared_mem.h]. "The cook and the waiter see one counter, not two copies (made before fork)" [S13-p15].
  - (b) The middle `1` means **shared by processes** (pshared). The last `1` is the **start value**: "the key is on its hook" [S12-p13, sem_shm.h].
  - (c) They are **asleep** and use no CPU. The OS did nothing wrong; both asked to sleep [S13-p12, S13-p15].
  - (d) `timeout` had to end the program: it did not finish in 5 seconds (deadlocked) [S13-p12, S13-p15].
- **A19. (b).** "P3 never takes the key, so the key cannot keep it out. A lock keeps out only those who also use it." [S13-p10]
- **A20. (c).** "Did nothing when a holder died: the flag is gone for ever" [S13-p15]. When a process dies the OS closes its files and frees its memory, but it does not put the flag back [S12-p12].

---

## 7. Self-check

- [ ] I can write `wait(S)` and `post(S)` exactly as on [S12-p3], and say what `post` does when someone is asleep: one sleeper wakes and the value stays.
- [ ] I can give the start values of the lock, signal, limit, rendezvous, barrier and shelf from memory, and explain "the start value is the meaning" [S12-p3, S13-p2].
- [ ] I can fill in a trace table with the four rules of [S13-p2] (one row per step, value after the step, names under *sleeping*, a post to a sleeper keeps the value), and reproduce [S13-p4] and [S12-p10].
- [ ] I can write the trio from blanks in the right order: place first, then key, then post in the mirror order. I can show with a 4-row trace why swapping the cook's waits deadlocks [S12-p10, S13-p12].
- [ ] I can state the invariant empty + full = N, point to the rows where it fails, and say who is "in the middle of a step" [S12-p9, S12-p10].
- [ ] I can list every possible output of a small key-plus-signal program by writing the rules first, and explain the trap: "a lock keeps out only those who also use it" [S13-p10].
- [ ] I can derive code from a precedence graph: one semaphore per arrow, wait on arrows in, post on arrows out, exactly one flag in a cycle. I can argue whether two arrows may share a semaphore (same sender and receiver in order / different receivers / prove it first) [S13-p7, S13-p8].
- [ ] I can explain the barrier: shadow counter under `mutex`, the last arrival opens the gate, the turnstile `wait(gate); post(gate)`. I can say why the semaphore's value may not be read, and what the end state shows (gate = 1) [S12-p6].
- [ ] I can match each classic mistake to its symptom and fix, and find the one wrong line in the broken shelves X, Y and Z [S12-p12, S13-p14].
- [ ] I can explain the C details:
  - `shared_alloc` before `fork`
  - `sem_init(&s, 1, value)`
  - the ring `(in + 1) % N`
  - `timeout` 124 and `ps` state `S`
  - why Week 6 code must run in the Linux course container, not on macOS [S12-p13, S12-p14, S13-p12, S13-p15, sem_shm.h]
