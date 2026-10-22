# Synchronization with Semaphores: Patterns, Precedence Graphs, Interleavings and Classical Problems (OS midterm outside notes)

How to read these notes. `wait` = `P` = `sem_wait` = `down`, and `signal` = `V` = `sem_post` = `up`. Unless stated otherwise, trace tables use the Dijkstra/Silberschatz/Downey convention: a negative value means that many threads are waiting, and the waiting threads are shown in brackets, e.g. `-2 [T1,T2]`. Code quoted from Downey uses his Python-like pseudocode.

**"Verified"** means I checked the claim exhaustively (every interleaving of atomic steps) with a small explicit-state model checker I wrote for this task (Python, ~300 lines). It has three semaphore modes: `set` (Dijkstra semantics, any waiter may be woken = weak semaphore), `fifo` (strong semaphore) and `weak` (POSIX-like barging). A "starvation" result means the checker found a reachable cycle, fair to every other thread, in which the victim is never even enabled. These checks cover small instances only (2–5 threads), so they are evidence, not proofs for every N. A C demo was compiled and run on this Mac (Darwin 27.0.0).

---

## 1. What is a semaphore? Dijkstra P/V, POSIX sem_wait/sem_post semantics, what the value means, binary vs counting, semaphores vs mutexes

### Takeaway
A semaphore is an integer you may only initialise (to any value), decrement-and-maybe-block (wait/P) or increment-and-maybe-wake (signal/V); you may not read it. Textbooks (Dijkstra, Silberschatz's implementation, Downey, OSTEP) let the value go negative, and then |value| is the number of blocked threads. POSIX/Linux (and Berkeley CS162's Pintos) never let it fall below zero, so be explicit about which convention a trace uses. A binary semaphore (initial value 1) can act as a lock, but unlike a mutex it has no owner: any thread can signal it, even one that never waited.

### Cited Findings
- **Downey's definition.** A semaphore is like an integer with three differences: (1) after initialising it to any integer, "the only operations you are allowed to perform are increment … and decrement …. You cannot read the current value of the semaphore"; (2) "When a thread decrements the semaphore, if the result is negative, the thread blocks itself"; (3) "When a thread increments the semaphore, if there are other threads waiting, one of the waiting threads gets unblocked." — [Downey, LBoS v2.2.2 §2.1](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Consequences** (Downey): you cannot know before a wait whether it will block; after a signal wakes a thread, both continue concurrently in an unknown order; a signal may unblock zero or one thread. — [LBoS §2.1](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **What the value means.** "If the value is positive, then it represents the number of threads that can decrement without blocking. If it is negative, then it represents the number of threads that have blocked and are waiting. If the value is zero, it means there are no threads waiting, but if a thread tries to decrement, it will block." — [LBoS §2.1](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Names.** increment/decrement, signal/wait, and V/P, "the original names proposed by Dijkstra". Downey uses signal/wait. — [LBoS §2.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Etymology.** OSTEP: P from "passering" (pass), later "prolaag" (probeer + verlaag, "try to decrease"); V from "vrijgave" (release), later "verhoog" (increase). — [OSTEP ch. 31 fn. 1](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf). Wikipedia: V = verhogen; P has been explained as proberen, passeren or pakken. Dijkstra's earliest paper gives passering/vrijgave; Linux and ALGOL 68 call them down/up. — [Wikipedia: Semaphore (programming)](https://en.wikipedia.org/wiki/Semaphore_(programming))
- **OSTEP's definition** (Fig. 31.2): `sem_wait`: "decrement the value of semaphore s by one; wait if value of semaphore s is negative". `sem_post`: "increment the value of semaphore s by one; if there are one or more threads waiting, wake one". It adds that "the value of the semaphore, when negative, is equal to the number of waiting threads [D68b]". — [OSTEP §31.1](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)
- **OSTEP on real implementations.** Its Zemaphore (built from a lock and a condition variable) does not keep the negative-value invariant: "the value will never be lower than zero. This behavior is easier to implement and matches the current Linux implementation." — [OSTEP §31.8](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)
- **POSIX semantics.** "A semaphore is an integer whose value is never allowed to fall below zero … If the value of a semaphore is currently zero, then a sem_wait(3) operation will block until the value becomes greater than zero." — [man7 sem_overview(7)](https://man7.org/linux/man-pages/man7/sem_overview.7.html)
- **sem_wait.** It "decrements (locks) the semaphore …. If the semaphore's value is greater than zero, then the decrement proceeds, and the function returns, immediately. If the semaphore currently has the value zero, then the call blocks until either it becomes possible to perform the decrement … or a signal handler interrupts the call." `sem_trywait` fails with EAGAIN instead of blocking; `sem_timedwait` fails with ETIMEDOUT; an interrupted call fails with EINTR. — [man7 sem_wait(3)](https://man7.org/linux/man-pages/man3/sem_wait.3.html)
- **sem_post.** It "increments (unlocks) the semaphore …. If the semaphore's value consequently becomes greater than zero, then another process or thread blocked in a sem_wait(3) call will be woken up". It fails with EOVERFLOW if the value would exceed SEM_VALUE_MAX. — [man7 sem_post(3)](https://man7.org/linux/man-pages/man3/sem_post.3.html)
- **sem_getvalue.** When threads are blocked, "POSIX.1 permits two possibilities …: either 0 is returned; or a negative number whose absolute value is the count of the number of processes and threads currently blocked …. Linux adopts the former behavior." — [man7 sem_getvalue(3)](https://man7.org/linux/man-pages/man3/sem_getvalue.3.html)
- **Silberschatz slides.** A semaphore "can only be accessed via two indivisible (atomic) operations wait() and signal()", originally P() and V(). The busy-waiting definition is `wait(S){ while (S <= 0) ; // busy wait  S--; }` and `signal(S){ S++; }`. "Counting semaphore – integer value can range over an unrestricted domain"; "Binary semaphore – integer value can range only between 0 and 1 … Same as a mutex lock". The no-busy-waiting implementation is `wait: S->value--; if (S->value < 0) { add this process to S->list; block(); }` and `signal: S->value++; if (S->value <= 0) { remove a process P from S->list; wakeup(P); }`. — [Silberschatz OSC10 slides ch. 6 (slides 34–40)](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch6.pptx)
- **UIC course notes** (based on Silberschatz). With the blocking implementation "the value of the semaphore can actually become negative, in which case its magnitude is the number of processes waiting …. This is a result of decrementing the counter before checking its value." wait/signal must be atomic: interrupts are disabled on uniprocessors, and spinlocks are used on multiprocessors. — [UIC CS385 notes, Synchronization](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/5_Synchronization.html)
- **CMU 15-213 (Bryant & O'Hallaron) slides.** A semaphore is a "non-negative global integer synchronization variable". P(s) decrements if s is nonzero, otherwise it suspends until a V restarts it. V(s) increments and "restart[s] exactly one" blocked thread, which "then completes its P operation by decrementing s". "Semaphore invariant: (s >= 0)". — [CMU 15-213 F15 lecture 25](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/25-sync-advanced.pdf)
- **Convention conflict.** Berkeley CS162 answer keys say "Semaphores cannot have a negative value (must be initialized to a value ≥ 0)" and "The pure semaphore interface does not allow querying for the current value" ([CS162 SP23 MT1 sol. 2h](https://cs162.org/static/exams/sp23-mt1-solutions.pdf)). They also say "sema_down blocks if the value would become negative" ([CS162 FA22 MT1 sol.](https://cs162.org/static/exams/fa22-mt1-solutions.pdf)). Downey, Silberschatz's implementation and OSTEP's Dijkstra invariant all allow negative values (citations above).
- **Binary semaphore = lock.** "Because locks only have two states (held and not held), we sometimes call a semaphore used as a lock a binary semaphore." Its initial value must be 1. — [OSTEP §31.2](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)
- **Initial-value heuristic** (credited to Perry Kivolowitz): set it to "the number of resources you are willing to give away immediately after initialization": 1 for a lock, 0 for ordering. — [OSTEP §31.3](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)
- **A counting semaphore counts, it doesn't identify.** "When used to control access to a pool of resources, a semaphore tracks only how many resources are free. It does not keep track of which of the resources are free." — [Wikipedia: Semaphore](https://en.wikipedia.org/wiki/Semaphore_(programming))
- **Semaphore vs mutex** (Wikipedia). "Only the task that locked the mutex is supposed to unlock it." This ownership is what enables priority inheritance against priority inversion, deletion safety, release on termination, recursive (reentrant) locking, and an error on "accidental release" by a non-owner. — [Wikipedia: Semaphore (programming)](https://en.wikipedia.org/wiki/Semaphore_(programming))
- **CS162: semaphore(1) ≠ lock.** A semaphore lets a thread "execute an 'up' at any time, including when the mutex is not taken …. As a result, the semaphore could [become] 2, allowing two threads to enter a critical section at once." — [CS162 SP23 MT1 sol. 1b](https://cs162.org/static/exams/sp23-mt1-solutions.pdf)
- **CS162: no ownership, no ordering.** "Semaphores, unlike locks, do not have a concept of ownership … we cannot enforce some strict ordering with a single semaphore. With a single semaphore initialized to 2, we can only [en]sure that some resource … has up to two concurrent usages." — [CS162 SP21 MT1 sol.](https://cs162.org/static/exams/sp21-mt1-solutions.pdf)
- **Semaphores remember signals; condition variables don't.** "Semaphores are commutative (you can sema_down() before sema_up()), while condition variables are not (you cannot cond_signal() before cond_wait())." — [CS162 FA20 MT1 sol.](https://cs162.org/static/exams/fa20-mt1-solutions.pdf)
- **Priority inversion.** It is a "scheduling problem when lower-priority process holds a lock needed by higher-priority process", "solved via priority-inheritance protocol". — [Silberschatz slides ch. 6, slide 58](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch6.pptx)
- **Weak vs strong semaphores.** Property 3: if threads are waiting when a thread signals, one of them must be woken. Property 4: the number of threads woken ahead of a waiting thread is bounded (e.g. a FIFO queue). "A semaphore that has Property 4 is sometimes called a strong semaphore; one that has only Property 3 is called a weak semaphore." Dijkstra conjectured that a starvation-free mutex is impossible with weak semaphores; J.M. Morris refuted this in 1979 (for a finite number of threads). — [LBoS §4.4](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)

### Inferences
- **Converting between conventions** (follows from the definitions): Dijkstra value = POSIX value − (number of threads currently blocked on it). In both conventions, value = initial + (#signals) − (#waits executed). Dijkstra counts a blocked wait as executed; POSIX counts only completed waits.
- **Worked value trace** (exam drill). S = 2; the operations are A wait, B wait, C wait, D wait, A signal, B signal.
  - Textbook values: 1, 0, −1 [C], −2 [C,D], −1 (C woken under FIFO), 0 (D woken).
  - Linux `sem_getvalue` would report 1, 0, 0, 0, 0, 0.
- **Binary semaphore vs mutex in one line each.**
  - Same: both are 0/1 and both give mutual exclusion if every thread does wait→CS→signal.
  - Different: a semaphore has no owner (any thread may signal; an extra signal permanently breaks exclusion). It also has no priority inheritance, no recursion, and no error on a wrong unlock.
  - What a mutex cannot do: a semaphore can signal *across* threads, which is exactly what ordering/signalling patterns need.
- **Which convention to use in the exam.** If the course follows Silberschatz's no-busy-waiting implementation, write negative values plus the waiting list. If it follows POSIX/CS162, the value stays ≥ 0 and you list the blocked threads separately. Writing both columns (value and waiting queue) is unambiguous either way.

### Gaps
- I did not read Dijkstra's original manuscripts (EWD) directly; the history comes from OSTEP, Downey and Wikipedia.
- I don't know which convention the Inha course slides use; by instruction, the slides were not consulted.

---

## 2. The basic patterns (Downey): signaling, rendezvous, mutex, multiplex, barrier, turnstile, reusable barrier, queue, lightswitch — exact solutions, invariants, traces, bugs

### Takeaway
Almost every classical solution is assembled from about eight idioms:
- **signaling** — one semaphore = 0;
- **rendezvous** — two semaphores = 0, signal *then* wait;
- **mutex** — 1;
- **multiplex** — n;
- **barrier** — counter + mutex + turnstile = 0;
- **turnstile** — `wait(); signal()`;
- **two-phase / preloaded reusable barrier**;
- **queue**;
- **lightswitch** — the first one in locks, the last one out unlocks.

The two recurring bugs are waiting while holding a mutex (deadlock) and testing shared state outside the mutex (races).

### Cited Findings
**Signaling** ([LBoS §3.1](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)). `sem = Semaphore(0)`; this "guarantees that Thread A has completed a1 before Thread B begins b1". Downey suggests naming the semaphore after the event, e.g. `a1Done`.
```
Thread A                 Thread B
statement a1             sem.wait()
sem.signal()             statement b1
```
Silberschatz gives the same idiom: "Create a semaphore 'synch' initialized to 0. P1: S1; signal(synch); P2: wait(synch); S2;" — [ch. 6 slide 36](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch6.pptx)

**Rendezvous** ([LBoS §3.3](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)). The goal is "a1 happens before b2 and b1 happens before a2". `aArrived = Semaphore(0)`, `bArrived = Semaphore(0)`:
```
Thread A                 Thread B
statement a1             statement b1
aArrived.signal()        bArrived.signal()
bArrived.wait()          aArrived.wait()
statement a2             statement b2
```
- The variant in which A waits first (`bArrived.wait(); aArrived.signal()`) "also works, although it is probably less efficient, since it might have to switch between A and B one time more than necessary."
- **Deadlock #1**: both threads wait first → "neither thread can proceed, and never will".

**Mutex** ([LBoS §3.4](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)). `mutex = Semaphore(1)`; `mutex.wait(); count = count + 1; mutex.signal()`. This is a symmetric solution, and it "can handle any number of concurrent threads without modification".

**Multiplex** ([LBoS §3.5](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)). `multiplex = Semaphore(n)`; `multiplex.wait(); critical section; multiplex.signal()`. "At any time, the value of the semaphore represents the number of additional threads that may enter"; "the value of the semaphore (negated) represents the number of threads in queue." OSTEP calls the same idea **thread throttling** ("a form of admission control") — [OSTEP §31.7](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)

**Barrier** ([LBoS §3.6](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)). Requirement: "no thread executes critical point until after all threads have executed rendezvous." Variables: `n` = the number of threads, `count = 0`, `mutex = Semaphore(1)`, `barrier = Semaphore(0)`.
- **Non-solution** (Deadlock #2): `mutex.wait(); count = count + 1; mutex.signal(); if count == n: barrier.signal(); barrier.wait(); critical point`. With n = 5 and 4 waiting, the value is −4; the 5th signal lets one thread through (−3), "But then no one signals the semaphore again".
- **Solution**: add `barrier.signal()` right after `barrier.wait()`. "This pattern, a wait and a signal in rapid succession … it's called a **turnstile**, because it allows one thread to pass at a time, and it can be locked to bar all threads." "In its initial state (zero), the turnstile is locked. The nth thread unlocks it and then all n threads go through."
```
rendezvous
mutex.wait()
    count = count + 1
mutex.signal()
if count == n: barrier.signal()
barrier.wait()
barrier.signal()
critical point
```
- **Deadlock #3**: putting the turnstile inside the mutex. "the first thread enters the mutex and then blocks when it reaches the turnstile. Since the mutex is locked, no other threads can enter … a common source of deadlocks: blocking on a semaphore while holding a mutex."

**Reusable barrier** ([LBoS §3.7](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)).
- Non-solution #1 tests `count` outside the mutex: two threads can both see `count==n` and both signal; at the second test several can wait → deadlock.
- Non-solution #2 moves the tests inside the mutex, but "allows a precocious thread to pass through the second mutex, then loop around and pass through the first mutex and the turnstile, effectively getting ahead of the other threads by a lap."
- **Two-phase solution**: `turnstile = Semaphore(0)`, `turnstile2 = Semaphore(1)`, `mutex = Semaphore(1)`:
```
# rendezvous
mutex.wait()
    count += 1
    if count == n:
        turnstile2.wait()      # lock the second
        turnstile.signal()     # unlock the first
mutex.signal()
turnstile.wait()               # first turnstile
turnstile.signal()
# critical point
mutex.wait()
    count -= 1
    if count == 0:
        turnstile.wait()       # lock the first
        turnstile2.signal()    # unlock the second
mutex.signal()
turnstile2.wait()              # second turnstile
turnstile2.signal()
```
- Downey's informal proof claims: "1. Only the nth thread can lock or unlock the turnstiles. 2. Before a thread can unlock the first turnstile, it has to close the second, and vice versa; therefore it is impossible for one thread to get ahead of the others by more than one turnstile."
- **Preloaded turnstile** (both turnstiles start at 0): the nth thread calls `turnstile.signal(n)` (n signals, not necessarily atomic). Each thread then only does `turnstile.wait()`, and phase 2 is the same with `turnstile2.signal(n)`. The `Barrier` class wraps this as `phase1()`, `phase2()` and `wait()`.

**Queue** ([LBoS §3.8](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)). `leaderQueue = followerQueue = Semaphore(0)`. Leaders run `followerQueue.signal(); leaderQueue.wait(); dance()`, and followers do the reverse. The **exclusive queue** adds `leaders = followers = 0`, `mutex`, and `rendezvous = Semaphore(0)`. "When a semaphore is used as a queue, I find it useful to read 'wait' as 'wait for this queue' and signal as 'let someone from this queue go.'"

**Lightswitch** ([LBoS §4.3.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)). "the first person into a room turns on the light (locks the mutex) and the last one out turns it off":
```
class Lightswitch:
    def __init__(self):
        self.counter = 0
        self.mutex = Semaphore(1)
    def lock(self, semaphore):
        self.mutex.wait()
            self.counter += 1
            if self.counter == 1:
                semaphore.wait()
        self.mutex.signal()
    def unlock(self, semaphore):
        self.mutex.wait()
            self.counter -= 1
            if self.counter == 0:
                semaphore.signal()
        self.mutex.signal()
```
"If the semaphore is locked, the calling thread blocks on semaphore and all subsequent threads block on self.mutex … unlock has no effect until every thread that called lock also calls unlock."

### Inferences
**Invariants** to write in an exam:

| Pattern | Semaphores (initial) | Invariant |
|---|---|---|
| Signaling | sem = 0 | a1 happens-before b1; sem never > (#signals − #waits) |
| Rendezvous | aArrived = bArrived = 0 | a1 < b2 and b1 < a2; each value ∈ {−1, 0, 1} |
| Mutex | mutex = 1 | #threads in CS ≤ 1; mutex = 1 − (#in CS) − (#waiting) |
| Multiplex | m = n | #in CS ≤ n; m = n − (#in CS) − (#waiting) |
| Barrier | mutex = 1, barrier = 0, count = 0 | nobody past `barrier.wait()` until count = n; count = #arrived |
| Two-phase barrier | turnstile = 0, turnstile2 = 1 | at most one of the two turnstiles is open; no thread is a lap ahead |
| Lightswitch | its own mutex = 1, counter = 0 | counter = #threads of the category between lock and unlock; once the first locker succeeds, the category holds the controlled semaphore while counter > 0 |

**Verified results** (model checker):
- **Signaling**: exactly 5 possible outputs: `a1 a2 b1 b2`, `a1 b1 a2 b2`, `a1 b1 b2 a2`, `b1 a1 a2 b2`, `b1 a1 b2 a2`. Without the semaphore there would be 6; the impossible one is `b1 b2 a1 a2`, because b2 cannot precede a1.
- **Rendezvous**: exactly 4 outputs (`a1 b1 a2 b2`, `a1 b1 b2 a2`, `b1 a1 a2 b2`, `b1 a1 b2 a2`), and the "A waits first" variant gives the same 4. The deadlock variant deadlocks on **every** schedule (0 complete runs).

Deadlock #1 trace (verified):

| # | Thread | Executes | aArrived | bArrived |
|---|---|---|---|---|
| 0 | | (initial) | 0 | 0 |
| 1 | A | a1 | 0 | 0 |
| 2 | A | bArrived.wait() | 0 | −1 [A] |
| 3 | B | b1 | 0 | −1 [A] |
| 4 | B | aArrived.wait() | −1 [B] | −1 [A] |

- **Mutex / lost update** (verified). Two threads doing `temp = count; count = temp + 1` end with `count ∈ {1, 2}`; with the mutex the result is always 2. Trace: T0 reads 0, T1 reads 0, T0 writes 1, T1 writes 1 → one increment lost.
- **Downey's 100 threads × 100 increments puzzle** ([LBoS §1.5.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)). The maximum is 10,000. The checker gives a minimum of **2** for every configuration with ≥ 2 threads and ≥ 2 iterations that I could explore: 2×2 → {2..4}, 2×3 → {2..6}, 3×2 → {2..6}, 2×4 → {2..8}. With 1 iteration the minimum is 1.
  - Intuition for 2: thread A reads 0 and stalls while all the others finish; A writes 1. Thread B then reads that 1 and stalls; A finishes its iterations; B writes 2 last.
- **Downey §1.5.1 concurrent writes** (A: `x=5; print x`; B: `x=7`). The reachable (printed, final) pairs are (5,5), (5,7) and (7,7). "Output 7, final 5" is impossible: printing 7 requires B's write between A's two statements, and then nothing writes 5 afterwards.
- **Multiplex** (verified): initialised to 2 with 4 threads, never more than 2 inside. Initialised to 3 when the requirement is "≤ 2", violations appear → a **wrong-initial-value bug** that produces no deadlock and stays silent.
- **Barrier non-solution** (n = 3, verified). It *can* deadlock, but it does **not always** deadlock, which answers Downey's puzzle "Does this code always create a deadlock?". If all three increments happen before any thread reads `count`, all three see `count == n` and each signals once. Deadlock trace (condensed from the verified 20-step trace):

| # | Thread | Executes | mutex | barrier | count |
|---|---|---|---|---|---|
| 0 | | (initial) | 1 | 0 | 0 |
| 1–5 | T0 | rendezvous; mutex.wait(); count=1; mutex.signal(); `if count==n` → false | 1 | 0 | 1 |
| 6 | T0 | barrier.wait() | 1 | −1 [T0] | 1 |
| 7–11 | T1 | same; count=2; test false | 1 | −1 [T0] | 2 |
| 12 | T1 | barrier.wait() | 1 | −2 [T0,T1] | 2 |
| 13–17 | T2 | same; count=3; test **true** | 1 | −2 [T0,T1] | 3 |
| 18 | T2 | barrier.signal() → T0 woken | 1 | −1 [T1] | 3 |
| 19 | T0 | critical point | 1 | −1 [T1] | 3 |
| 20 | T2 | barrier.wait() | 1 | −2 [T1,T2] | 3 |

  T1 and T2 are stuck forever. At step-level granularity, about 80% of schedules (217,297,080 of 272,953,968) complete and about 20% deadlock. This is why testing can miss the bug; the exact percentage depends on how finely steps are modelled.
- **Barrier with turnstile** (verified n = 3): no deadlock and no early critical point. The final value of `barrier` can be 1, 2 or 3. This answers Downey's question "Is there any way the barrier might be signaled more than once?" with **yes**: `count` is read outside the mutex, so several threads can see `count == n`. That is harmless for a one-shot barrier but is the reason the barrier cannot simply be reused.
- **Deadlock #3** (turnstile inside the mutex): 0 complete runs out of 1,710 schedules (n = 3), so it **always** deadlocks:

| # | Thread | Executes | mutex | barrier | count |
|---|---|---|---|---|---|
| 1–4 | T0 | rendezvous; mutex.wait(); count=1; test false | 0 | 0 | 1 |
| 5 | T0 | barrier.wait() (still holding mutex) | 0 | −1 [T0] | 1 |
| 6–7 | T1 | rendezvous; mutex.wait() | −1 [T1] | −1 [T0] | 1 |
| 8–9 | T2 | rendezvous; mutex.wait() | −2 [T1,T2] | −1 [T0] | 1 |

- **Reusable barrier non-solution #2** (n = 2, 2 laps): a violation is found. Condensed from the verified 27-step trace:
  1. T0 arrives (count = 1) and blocks on the turnstile.
  2. T1 arrives (count = 2) and signals the turnstile while holding the mutex.
  3. T0 passes and does lap-0 critical point (legal). It decrements count to 1 (≠ 0, so the turnstile is **not** relocked).
  4. T0 loops: rendezvous of lap 1, count = 2 = n → signals the turnstile again (value 2).
  5. T0 passes the turnstile and executes the **lap-1 critical point while T1 has not yet arrived at lap 1** → this is the precocious thread.
- **Two-phase and preloaded barriers**: no deadlock and no lap-ahead violation for (n, laps) ∈ {(2,2), (2,3), (3,2)}. Non-solution #2 also deadlocks with (2,3) and (3,2).

### Gaps
- LBoS v2.2.2 has a placeholder section "3.2 Sync.py — TODO". Section numbers therefore differ by one from older editions (Rendezvous is 3.3, Mutex 3.4, Multiplex 3.5, Barrier 3.6, Reusable barrier 3.7, Queue 3.8).
- I did not separately verify the exclusive-queue solution.

---

## 3. Ordering with precedence graphs: turning statement dependencies into semaphore code

### Takeaway
A precedence graph is a DAG whose edge A→B means "A must finish before B starts".
- **Mechanical recipe:** one semaphore per edge, initialised to 0; each statement waits once on every incoming edge, runs, then signals every outgoing edge.
- **Optimisations:**
  - Put a chain inside one process (program order is free).
  - Use a counting semaphore for a fan-out (signal it k times).
  - Use a counting semaphore for a join (wait on it k times).
- **Count check:** the valid execution orders are exactly the topological orders (linear extensions) of the graph.

### Cited Findings
- **Definition.** "Precedence Graph is a directed acyclic graph which is used to show the execution level of several processes … Nodes of graph correspond to individual statements of program code. Edge between two nodes represents the execution order. A directed edge from node A to node B shows that statement A executes first and then Statement B executes." — [GeeksforGeeks, Precedence Graph in OS](https://www.geeksforgeeks.org/operating-systems/precedence-graph-in-operating-system/)
- **GfG data-dependency example.** `S1: a = x + y; S2: b = z + 1; S3: c = a − b; S4: w = c + 1` → S3 needs S1 and S2; S4 needs S3; S1 and S2 can run concurrently. Its second example: "S2 and S3 can be executed after S1 completes. S4 … after S2 … S5 and S6 … after S4 … S7 … after S5, S6 and S3 complete." GfG's own solution is an image, so I could not extract it. — [GeeksforGeeks](https://www.geeksforgeeks.org/operating-systems/precedence-graph-in-operating-system/)
- **Base idiom for one edge:** `synch = 0; P1: S1; signal(synch); P2: wait(synch); S2;` — [Silberschatz ch. 6 slide 36](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch6.pptx); [UIC notes §5.6.1](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/5_Synchronization.html); this is Downey's signaling pattern — [LBoS §3.1](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Happens-before reasoning.** Downey's lunch example derives `b3 > b2 > a4 > a3` from program order plus a message. He defines "Two events are concurrent if we cannot tell by looking at the program which will happen first." — [LBoS §1.3](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)

### Inferences
**Worked example 1: the diamond S1→S2, S1→S3, {S2,S3}→S4.** All three versions below are verified to produce exactly the 2 valid orders `S1 S2 S3 S4` and `S1 S3 S2 S4`, with no deadlock.
```
// (a) one semaphore per edge (4 edges), one process per statement
semaphore a = 0, b = 0, c = 0, d = 0;   // a:S1→S2  b:S1→S3  c:S2→S4  d:S3→S4
P1: S1; signal(a); signal(b);
P2: wait(a); S2; signal(c);
P3: wait(b); S3; signal(d);
P4: wait(c); wait(d); S4;

// (b) two counting semaphores: fan-out and join
semaphore s1done = 0, join = 0;
P1: S1; signal(s1done); signal(s1done);      // one permit per successor
P2: wait(s1done); S2; signal(join);
P3: wait(s1done); S3; signal(join);
P4: wait(join); wait(join); S4;              // wait once per predecessor

// (c) two processes: the chain S1→S2→S4 lives in one process
semaphore x = 0, y = 0;
PA: S1; signal(x); S2; wait(y); S4;
PB: wait(x); S3; signal(y);
```
Two bugs were verified on version (b):
- S1 signals `s1done` only once → one of S2/S3 waits forever (deadlock after printing `S1 S2` or `S1 S3`).
- S4 waits on `join` only once → the illegal orders `S1 S2 S4 S3` and `S1 S3 S4 S2` become possible (a precedence violation).

**Worked example 2: GfG's 7-node graph.** The edges are S1→S2, S1→S3, S2→S4, S4→S5, S4→S6, S3→S7, S5→S7 and S6→S7.
```
// one process per statement, 8 edge semaphores, all = 0
// a:1→2 b:1→3 c:2→4 d:4→5 e:4→6 f:3→7 g:5→7 h:6→7
P1: S1; signal(a); signal(b);
P2: wait(a); S2; signal(c);
P3: wait(b); S3; signal(f);
P4: wait(c); S4; signal(d); signal(e);
P5: wait(d); S5; signal(g);
P6: wait(e); S6; signal(h);
P7: wait(f); wait(g); wait(h); S7;

// 3 processes, 3 semaphores (x = y = j = 0)
PA: S1; signal(x); S2; S4; signal(y); S5; wait(j); wait(j); S7;
PB: wait(x); S3; signal(j);
PC: wait(y); S6; signal(j);
```
- **Verified:** both programs produce exactly the **10** linear extensions, with no deadlock.
- Counting by hand: S1 comes first and S7 last; S2 S4 then S5/S6 in either order gives 2 ways; S3 can be inserted into any of 5 slots among those 4 → 2 × 5 = 10.
- **Impossible prefixes:** `S1 S3 S7 …` (S7 needs S5 and S6) and `S1 S2 S4 S5 S7 …` (S7 needs S6 and S3).

**Worked example 3: the "N" graph a→c, b→c, b→d.** Its 5 valid orders are `a b c d`, `a b d c`, `b a c d`, `b a d c` and `b d a c` (verified for the edge-semaphore program).
- Background knowledge, not from a fetched source: a partial order containing this N shape is not series-parallel. Nested `parbegin/parend` (cobegin/coend) blocks alone therefore cannot express it, whereas semaphores can encode any DAG.

**Exam recipe and checks:**
1. Every edge gets exactly one `signal` (after the source statement) and one `wait` (before the target).
2. A counting semaphore shared by k successors must be signalled k times, and only those k processes may wait on it.
3. A join semaphore must be waited on exactly (number of predecessors) times.
4. Edges within one process need no semaphore.
5. To go the other way (program → graph), draw program-order edges inside each process, plus an edge from each `signal(s)` statement to the statement after the matching `wait(s)`.

### Gaps
- I found no .edu source for precedence-graph-to-semaphore exercises: the session's web-search budget was exhausted, so I relied on known URLs. Course-specific notation (fork/join, parbegin) is unknown.
- The series-parallel/N-free claim is from my background knowledge (Valdes, Tarjan & Lawler 1982) and was not verified against a fetched source.

---

## 4. Enumerating the possible outputs of semaphore programs: counting interleavings, impossible outputs

### Takeaway
1. List each thread's atomic actions.
2. Add happens-before edges: program order, plus "the k-th wait to complete on a semaphore with initial value v must follow the (k−v)-th signal".
3. The possible outputs are the topological orders of the result. Unsynchronised threads with m and n steps interleave in C(m+n, m) ways.
4. Any output that violates an edge is impossible. Any prefix that cannot be extended is a deadlock.

### Cited Findings
- Non-determinism: "During any given run of this program, the output might be 'yes no' or 'no yes'"; bugs that depend on the schedule "are almost impossible to find by testing". — [LBoS §1.4](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- "Answering questions like these is an important part of concurrent programming: What paths are possible and what are the possible effects? Can we prove that a given (desirable) effect is necessary or that an (undesirable) effect is impossible?" — [LBoS §1.5.1](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- An update is a read followed by a write, and the path `a1 < b1 < b2 < a2` loses an increment. Downey recommends the "conservative assumption that all updates and all writes are not atomic". — [LBoS §1.5.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Exam example: CS162 Fall 2019 MT1 Q(i).** Three threads; all semaphores start at 1; `main` calls `exit(0)` right after creating the threads.
  - luffy: `down(loguetown); up(marineford); down(skypeia); print L`
  - blackbeard: `down(skypeia); up(skypeia); down(loguetown); print B`
  - akainu: `down(marineford); down(loguetown); up(skypeia); print A`
  - Official answer: A, B, L and "(nothing is printed)" are all possible, and no run prints more than one line: "loguetown is downed in every path, so only one can ever succeed. The other two will always hang." I read the check marks from a rendered page image, because the PDF text extraction misplaces them. — [CS162 FA19 MT1 solutions](https://cs162.org/static/exams/fa19-mt1-solutions.pdf)
- **Exam example: OSTEP Fig. 31.6.** A parent waits for its child with `sem_init(&s, 0, X)`; X must be 0. Both orders are traced (child runs first or parent waits first). — [OSTEP §31.3](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)

### Inferences
All counts below were verified with the model checker; they count distinct outputs, not low-level schedules.

| Program (all semaphores 0 unless stated) | # outputs | Notes / impossible outputs |
|---|---|---|
| A: `a1; a2` ∥ B: `b1; b2` (no sync) | 6 | C(4,2) = 6 |
| Signaling: A: `a1; V(s); a2` ∥ B: `b1; P(s); b2` | 5 | impossible: `b1 b2 a1 a2` |
| Rendezvous (§2) | 4 | a1 must precede b2 and b1 must precede a2 |
| A: 3 prints ∥ B: 3 prints (no sync) | 20 | C(6,3) |
| same + rendezvous after the 1st print | 12 | first two outputs are {a1, b1} in either order, then C(4,2) = 6 |
| same, signal after a2, wait before b2 | 10 | b2 needs a2 |
| both bodies inside one mutex | 2 | `a1 a2 a3 b1 b2 b3` or `b1 b2 b3 a1 a2 a3` |
| 3 threads: `print i; barrier; print i'` | 36 | 3! × 3!: every "before" print precedes every "after" print |
| P1: `A; V(S); P(T); B` ∥ P2: `P(S); C; V(T); D` | 2 | `A C B D`, `A C D B` |
| `a=1,b=0,c=0`: T1: `P(a);X;V(b)` T2: `P(b);Y;V(c)` T3: `P(c);Z;V(a)` | 1 | `X Y Z` |
| ping-pong `a=1,b=0`: T1: `P(a);1;V(b);P(a);2;V(b)` T2: `P(b);3;V(a);P(b);4;V(a)` | 1 | `1 3 2 4` |
| `s=0`: T1: `P(s);A` T2: `P(s);B` T3: `C;V(s);D` | 4 partial | `C A D`, `C D A`, `C B D`, `C D B`; one of T1/T2 **never finishes** |
| CS162 FA19 "One Piece" (all = 1) | 3 single-line runs | every run prints exactly one of A, B, L; there are 0 complete runs (two threads always hang) |
| `x=0`: T1: `x=x+1` ∥ T2: `x=x*2` (load + store each) | final x ∈ {0, 1, 2} | with signaling T1→T2: always 2 |
| `m=1`: T1: `P(m); x=x+1; V(m); print x` ∥ T2: `P(m); x=x*2; V(m); print x` | 6 print sequences | prints outside the CS can see the other thread's update: T1:1 T2:1 (final 1), T1:1 T2:2, T1:2 T2:2, T2:0 T1:1, T2:1 T1:1, T2:2 T1:2 |

- **General formula** (combinatorics): unsynchronised threads with n1, …, nk atomic steps have (n1+…+nk)! / (n1!·…·nk!) interleavings. For example, 3 threads × 2 steps → 6!/(2!·2!·2!) = 90.
- **One Piece trace printing A** (verified):

| # | Thread | Executes | loguetown | marineford | skypeia |
|---|---|---|---|---|---|
| 0 | | (initial) | 1 | 1 | 1 |
| 1 | blackbeard | down(skypeia) | 1 | 1 | 0 |
| 2 | blackbeard | up(skypeia) | 1 | 1 | 1 |
| 3 | akainu | down(marineford) | 1 | 0 | 1 |
| 4 | akainu | down(loguetown) | 0 | 0 | 1 |
| 5 | luffy | down(loguetown) | −1 [luffy] | 0 | 1 |
| 6 | blackbeard | down(loguetown) | −2 [luffy,blackbeard] | 0 | 1 |
| 7 | akainu | up(skypeia) | −2 [luffy,blackbeard] | 0 | 2 |
| 8 | akainu | print A | −2 [luffy,blackbeard] | 0 | 2 |

- **Exam trap:** "schedules" (every distinct sequence of atomic steps, including the waits and signals) are far more numerous than distinct outputs. For example, the 5-output signaling program has 16 step-level schedules. Answer the question that is actually asked.

### Gaps
- Other universities' "list all outputs" questions (beyond CS162) could not be searched for; see §12 for the practice sources I could access.

---

## 5. Producer–consumer with a bounded buffer

### Takeaway
The solution uses `mutex = 1`, `items/full = 0` and `spaces/empty = N`.
- **Producer:** `wait(spaces); wait(mutex); add; signal(mutex); signal(items)`.
- **Consumer:** `wait(items); wait(mutex); remove; signal(mutex); signal(spaces)`.

Always wait on the counting semaphore **before** taking the mutex: reversing that order is the textbook deadlock. Removing the mutex lets two producers overwrite each other's slot.

### Cited Findings
- **Downey's constraints:** exclusive access to the buffer while adding or removing; a consumer arriving at an empty buffer blocks. With a finite buffer, a producer arriving at a full buffer blocks. — [LBoS §4.1–4.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Infinite buffer (Downey):** `mutex = Semaphore(1); items = Semaphore(0)`. "When items is positive, it indicates the number of items in the buffer. When it is negative, it indicates the number of consumer threads in queue."
  - Improved producer: `event = waitForEvent(); mutex.wait(); buffer.add(event); mutex.signal(); items.signal()`.
  - Consumer: `items.wait(); mutex.wait(); event = buffer.get(); mutex.signal(); event.process()`.
  - Moving `items.signal()` outside the mutex avoids waking a consumer that would immediately block on the mutex. — [LBoS §4.1.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Deadlock #4** (consumer `mutex.wait(); items.wait(); …`): "Imagine that the buffer is empty. A consumer arrives, gets the mutex, and then blocks on items. When the producer arrives, it blocks on mutex and the system comes to a grinding halt … any time you wait for a semaphore while holding a mutex, there is a danger of deadlock." — [LBoS §4.1.3](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Finite buffer (Downey):** `mutex = Semaphore(1); items = Semaphore(0); spaces = Semaphore(buffer.size())`. "In order to avoid deadlock, producers and consumers check availability before getting the mutex. For best performance, they release the mutex before signaling." You cannot write `if items >= bufferSize: block()`, because a semaphore's value cannot be read. — [LBoS §4.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
```
# consumer                     # producer
items.wait()                   event = waitForEvent()
mutex.wait()                   spaces.wait()
    event = buffer.get()       mutex.wait()
mutex.signal()                     buffer.add(event)
spaces.signal()                mutex.signal()
event.process()                items.signal()
```
- **Silberschatz:** "n buffers … mutex initialized to the value 1 … full initialized to the value 0 … empty initialized to the value n". Producer: `wait(empty); wait(mutex); …add…; signal(mutex); signal(full)`. Consumer: `wait(full); wait(mutex); …remove…; signal(mutex); signal(empty)`. — [Silberschatz ch. 7 slides 4–6](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch7.pptx)
- **OSTEP's build-up:**
  1. empty/full alone works for MAX = 1.
  2. With MAX > 1 and several producers there is a race in `put()`: two producers both write `buffer[fill]` before `fill` is incremented ("the old data there is overwritten").
  3. Putting the lock *outside* the empty/full waits (Fig. 31.11) deadlocks: "The consumer holds the mutex and is waiting for the someone to signal full. The producer could signal full but is waiting for the mutex."
  4. The fix (Fig. 31.12): "reduce the scope of the lock". — [OSTEP §31.4](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)
- **CS:APP `sbuf` package:** `P(&sp->slots); P(&sp->mutex); insert; V(&sp->mutex); V(&sp->items)` and the mirror image for removal. It "Requires a mutex and two counting semaphores". — [CMU 15-213 F15 lecture 25](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/25-sync-advanced.pdf)

### Inferences
- **Invariants** (algebra from the definitions):
  - items + spaces + (#producers between `spaces.wait` and `items.signal`) + (#consumers between `items.wait` and `spaces.signal`) = N, always.
  - In a quiescent state, items = #full slots and spaces = #empty slots.
  - 0 ≤ #full ≤ N, and at most one thread is in buffer code (the mutex).
- **Verified:** no deadlock, no lost or duplicated item and no read of an empty slot for (N, producers, consumers, items each) = (2,2,2,1), (2,1,1,4), (1,2,2,1) and (2,2,2,2).
- **Normal trace with a full buffer** (N = 2, one producer making x0, x1, x2, one consumer; condensed from a verified 39-step FIFO trace):

| # | Thread | Executes | mutex | items | spaces | buffer |
|---|---|---|---|---|---|---|
| 0 | | (initial) | 1 | 0 | 2 | [ _ , _ ] |
| 1–7 | P | produce x0; spaces.wait; mutex.wait; add; fill=1; mutex.signal; items.signal | 1 | 1 | 1 | [x0, _ ] |
| 8–14 | P | produce x1; same | 1 | 2 | 0 | [x0, x1] |
| 15–16 | P | produce x2; **spaces.wait → blocks** (buffer full) | 1 | 2 | −1 [P] | [x0, x1] |
| 17–21 | C | items.wait; mutex.wait; get x0; use=1; mutex.signal | 1 | 1 | −1 [P] | [ _ , x1] |
| 22 | C | spaces.signal → wakes P | 1 | 1 | 0 | [ _ , x1] |
| 23–27 | P | mutex.wait; add x2 into slot 0; mutex.signal; items.signal | 1 | 2 | 0 | [x2, x1] |
| 28–39 | C | consumes x1, then x2 | 1 | 0 | 2 | [ _ , _ ] |

- **Bug: mutex taken before items/spaces** (OSTEP Fig. 31.11 or Downey's Deadlock #4). The verified shortest deadlock:

| # | Thread | Executes | mutex | items | spaces |
|---|---|---|---|---|---|
| 0 | | (initial) | 1 | 0 | 2 |
| 1 | P0 | item = produce() | 1 | 0 | 2 |
| 2 | C0 | mutex.wait() | 0 | 0 | 2 |
| 3 | P0 | mutex.wait() (OSTEP Fig. 31.11 order; in Downey's variant, where only the consumer is wrong, P0 first does spaces.wait() and spaces becomes 1) | −1 [P0] | 0 | 2 |
| 4 | C0 | items.wait() — holds mutex while waiting | −1 [P0] | −1 [C0] | 2 |

- **Bug: no mutex with two producers** (verified overwrite):
  1. P0: spaces.wait, then `buffer[fill]=x0` (slot 0).
  2. P1: spaces.wait, then `buffer[fill]=y0` → still slot 0, because P0 has not yet executed `fill=(fill+1)%N`.
  3. x0 is lost, and later a consumer reads an empty slot.
- **Bug: wrong initial values** (verified): `spaces = 0` → deadlock (nobody can ever produce). `items = 1` → a consumer reads an empty slot.

### Gaps
- None significant. Multi-slot "get/put" index arithmetic is modelled as in OSTEP Fig. 31.9 (`buffer[fill]`, `fill = (fill+1) % MAX`).

---

## 6. Readers–writers: lightswitch, reader preference, writer starvation step by step, turnstile (no-starve) fix, writer priority

### Takeaway
Readers share; a writer needs the whole room ("categorical mutual exclusion").
- **Reader preference** (lightswitch on `roomEmpty`) is safe and deadlock-free, but a writer can starve while overlapping readers keep the light on.
- **Turnstile fix:** both readers and writers pass a turnstile; a waiting writer holds it, so new readers queue behind it.
- **Writer priority** (two lightswitches) starves readers instead.

All of this assumes strong (FIFO) semaphores. With weak semaphores, every variant can starve someone.

### Cited Findings
- **Constraints:** "1. Any number of readers can be in the critical section simultaneously. 2. Writers must have exclusive access to the critical section." "The exclusion pattern here might be called **categorical mutual exclusion**. A thread in the critical section does not necessarily exclude other threads, but the presence of one category in the critical section excludes other categories." — [LBoS §4.3](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Reader-preference solution:** `int readers = 0; mutex = Semaphore(1); roomEmpty = Semaphore(1)`. Writers run `roomEmpty.wait(); critical section; roomEmpty.signal()`. Readers:
```
mutex.wait()
    readers += 1
    if readers == 1:
        roomEmpty.wait()        # first in locks
mutex.signal()
# critical section for readers
mutex.wait()
    readers -= 1
    if readers == 0:
        roomEmpty.signal()      # last out unlocks
mutex.signal()
```
  Downey's claims to prove: "Only one reader can queue waiting for roomEmpty, but several writers might be queued"; "When a reader signals roomEmpty the room must be empty." With the Lightswitch class this becomes `readLightswitch.lock(roomEmpty); # critical section; readLightswitch.unlock(roomEmpty)`. — [LBoS §4.3.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Starvation:** "deadlock is not possible, but … it is possible for a writer to starve. If a writer arrives while there are readers in the critical section, it might wait in queue forever while readers come and go. As long as a new reader arrives before the last of the current readers departs, there will always be at least one reader in the room." — [LBoS §4.3.3](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **No-starve (turnstile) solution:** `readSwitch = Lightswitch(); roomEmpty = Semaphore(1); turnstile = Semaphore(1)`. "turnstile is a turnstile for readers and a mutex for writers."
```
# writer                          # reader
turnstile.wait()                  turnstile.wait()
    roomEmpty.wait()              turnstile.signal()
    # critical section for writers
turnstile.signal()                readSwitch.lock(roomEmpty)
roomEmpty.signal()                    # critical section for readers
                                  readSwitch.unlock(roomEmpty)
```
  "When the last reader leaves, it signals roomEmpty, unblocking the waiting writer. The writer immediately enters its critical section, since none of the waiting readers can pass the turnstile." It "guarantees that at least one writer gets to proceed, but it is still possible for a reader to enter while there are writers queued." — [LBoS §4.3.4–4.3.5](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Writer-priority solution:** `readSwitch = Lightswitch(); writeSwitch = Lightswitch(); noReaders = Semaphore(1); noWriters = Semaphore(1)`.
```
# reader                              # writer
noReaders.wait()                      writeSwitch.lock(noReaders)
    readSwitch.lock(noWriters)            noWriters.wait()
noReaders.signal()                            # critical section for writers
# critical section for readers            noWriters.signal()
readSwitch.unlock(noWriters)          writeSwitch.unlock(noReaders)
```
  "many writers can pass through the critical section without ever signaling noReaders. Only when the last writer exits can the readers enter … now it is possible for readers to starve." — [LBoS §4.3.6–4.3.7](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Silberschatz naming:** `rw_mutex = 1`, `mutex = 1`, `read_count = 0`, with the same reader code. This is the "First reader-writer" problem, in which "a writer process never writes" can happen. The "Second" problem: "Once a writer is ready to write, no 'newly arrived reader' is allowed to read. Both the first and second may result in starvation." — [Silberschatz ch. 7 slides 8–11](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch7.pptx)
- **OSTEP version:** `rwlock_t { sem_t lock; sem_t writelock; int readers; }`; "the first reader … also acquires the write lock … the last one to exit … calls sem_post() on 'writelock'"; "it would be relatively easy for readers to starve writers". Hill's Law ("Big and dumb is better"): reader-writer locks often add overhead. — [OSTEP §31.5](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)
- **CS:APP variants:** first readers-writers (favors readers): "A reader that arrives after a waiting writer gets priority over the writer". Second (favors writers): "A reader that arrives after a writer must wait, even if the writer is also waiting". "Starvation … is possible in both cases". — [CMU 15-213 F15 lecture 25](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/25-sync-advanced.pdf)
- **Wikipedia names:** first (readers-preference), second (writers-preference) and third (no thread starves; "the operation of obtaining a lock … will always terminate in a bounded amount of time"). — [Wikipedia: Readers–writers problem](https://en.wikipedia.org/wiki/Readers%E2%80%93writers_problem)
- **Strong semaphores assumed:** "with weak semaphores, it is very difficult to prevent starvation …. In the rest of this book, when we discuss starvation, we will assume strong semaphores." — [LBoS §4.4.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)

### Inferences
- **Safety (verified)** for reader preference, no-starve and writer priority with one-shot threads (R, W) = (2,1), (2,2), (3,1), and with 2 readers + 1 writer all looping forever: no deadlock, and the invariant `nW ≤ 1 ∧ (nW = 0 ∨ nR = 0)` always holds.
- **Lightswitch without its mutex → broken** (verified). The test and the increment are separate, so both readers can skip `roomEmpty.wait()`:

| # | Thread | Executes | roomEmpty | counter | readers in | writers in |
|---|---|---|---|---|---|---|
| 0 | | (initial) | 1 | 0 | 0 | 0 |
| 1 | R0 | counter += 1 | 1 | 1 | 0 | 0 |
| 2 | R1 | counter += 1 | 1 | 2 | 0 | 0 |
| 3 | R0 | `if counter == 1` → false, skips roomEmpty.wait() | 1 | 2 | 0 | 0 |
| 4 | R0 | enters CS | 1 | 2 | 1 | 0 |
| 5 | W0 | roomEmpty.wait() → succeeds | 0 | 2 | 1 | 0 |
| 6 | W0 | enters CS → **reader and writer together** | 0 | 2 | 1 | 1 |

- **Wrong initial value** (verified): `roomEmpty = 0` deadlocks the first reader and every writer.
- **Writer starvation, step by step** (reader preference). The checker found a fair repeating cycle even with FIFO semaphores; this is a condensed version:

| Step | Event | counter | roomEmpty | W |
|---|---|---|---|---|
| 1 | R0 `lock`: counter 0→1, first in → roomEmpty.wait() | 1 | 0 | – |
| 2 | R1 `lock`: counter 1→2 (not first, no wait) | 2 | 0 | – |
| 3 | W: roomEmpty.wait() → blocks | 2 | −1 [W] | blocked |
| 4 | R0 reads, `unlock`: counter 2→1 (not last, no signal) | 1 | −1 [W] | blocked |
| 5 | R0 loops, `lock`: counter 1→2 | 2 | −1 [W] | blocked |
| 6 | R1 reads, `unlock`: counter 2→1 | 1 | −1 [W] | blocked |
| 7 | R1 loops, `lock`: counter 1→2 → same state as after step 3; repeat 4–7 forever | 2 | −1 [W] | blocked |

  W is never even *enabled* (roomEmpty never gets signalled), so no fairness assumption about the scheduler can save it.
- **Who can be starved forever while the other category keeps entering** (verified with fair cycles):

| Solution | Writer starves? (FIFO) | Reader starves? (FIFO) | With weak semaphores |
|---|---|---|---|
| Reader preference (lightswitch) | **yes** | no | both can |
| No-starve (turnstile) | no | no | both can (e.g. W stuck in the turnstile's queue while readers win every wake-up) |
| Writer priority (two lightswitches) | no | **yes** | both can |

- **Reader starvation under writer priority** (condensed verified cycle):
  1. W0's `writeSwitch.lock` takes noReaders, and R0 blocks on `noReaders.wait()`.
  2. Writers then alternate on noWriters: W0 writes while W1 increments writeSwitch to 2 and queues on noWriters.
  3. W0 leaves (counter 2→1, not last) and re-locks (counter 1→2).
  4. The writeSwitch counter never returns to 0, so noReaders is never released.

### Gaps
- I did not verify Wikipedia's own pseudocode for the second and third problems (I used Downey's).
- Whether the course calls these "first/second/third" or "reader/writer preference" is unknown.

---

## 7. Sleeping barber (one and several barbers) and categorical mutual exclusion (unisex bathroom)

### Takeaway
- **One barber:** a scoreboard (`customers` under a mutex) plus two rendezvous (`customer`/`barber` to start, `customerDone`/`barberDone` to finish) gives a deadlock-free solution.
- **Several barbers:** the counting part still works, but the anonymous "done" handshake can be consumed by the **wrong** barber. Pass identities instead: a FIFO queue of per-customer semaphores.
- **Unisex bathroom:** categorical mutual exclusion with two lightswitches on `empty` plus two multiplexes. It needs a turnstile, and strong semaphores, to stop one sex starving the other.

### Cited Findings
- **History:** "The problem was originally proposed in 1965 by computer science pioneer Edsger Dijkstra, who used it to make the point that general semaphores are often superfluous." The setup is one barber, one barber chair and n waiting chairs; "A multiple sleeping barbers problem has the additional complexity of coordinating several barbers among the waiting customers." — [Wikipedia: Sleeping barber problem](https://en.wikipedia.org/wiki/Sleeping_barber_problem)
- **Wikipedia's pseudocode:** `barberReady = 0; accessWRSeats = 1; custReady = 0; numberOfFreeWRSeats = N`.
  - Barber: `wait(custReady); wait(accessWRSeats); numberOfFreeWRSeats += 1; signal(barberReady); signal(accessWRSeats); # cut hair`.
  - Customer: `wait(accessWRSeats); if numberOfFreeWRSeats > 0: numberOfFreeWRSeats -= 1; signal(custReady); signal(accessWRSeats); wait(barberReady) # have hair cut; else: signal(accessWRSeats) # leave`.
  - "deadlock free, but may lead to starvation of a customer … can be solved with a first-in first-out (FIFO) queue". — [Wikipedia](https://en.wikipedia.org/wiki/Sleeping_barber_problem)
- **Downey's barbershop:** `n = 4; customers = 0; mutex = Semaphore(1); customer = Semaphore(0); barber = Semaphore(0); customerDone = Semaphore(0); barberDone = Semaphore(0)`, where "n is the total number of customers that can be in the shop: three in the waiting room and one in the chair":
```
# customer                          # barber
mutex.wait()                        customer.wait()
    if customers == n:              barber.signal()
        mutex.signal()              # cutHair()
        balk()                      customerDone.wait()
    customers += 1                  barberDone.signal()
mutex.signal()
customer.signal()
barber.wait()
# getHairCut()
customerDone.signal()
barberDone.wait()
mutex.wait()
    customers -= 1
mutex.signal()
```
  "This solution combines a scoreboard and two rendezvouses"; `customer.wait()` means "wait for a customer, not customers wait here"; "The second rendezvous … ensures that the hair cut is done before the barber loops around to let the next customer into the critical section." — [LBoS §5.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **FIFO barbershop:** each customer creates `self.sem = Semaphore(0)` and appends it to `queue` under the mutex; the barber does `customer.wait(); mutex.wait(); sem = queue.pop(0); mutex.signal(); sem.signal(); …`, so "customers are served in the order they pass the turnstile". — [LBoS §5.3](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Hilzer's barbershop** (3 chairs, 3 barbers, a 4-person sofa, standing room, fire limit of 20, one cash register): Downey's solution uses `sofa = Semaphore(4)`, two queues of per-customer semaphores, and `payment`/`receipt`. He admits: "This solution is considerably more complex than I expected", and "there can never be more than three customers on the sofa, so the multiplex is unnecessary"; a third thread type ("usher") would be needed. — [LBoS §5.4](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Unisex bathroom:** "There cannot be men and women in the bathroom at the same time. There should never be more than three employees … in the bathroom." Variables: `empty = Semaphore(1); maleSwitch = Lightswitch(); femaleSwitch = Lightswitch(); maleMultiplex = Semaphore(3); femaleMultiplex = Semaphore(3)`. Female code: `femaleSwitch.lock(empty); femaleMultiplex.wait(); # bathroom code; femaleMultiplex.signal(); femaleSwitch.unlock(empty)`. — [LBoS §6.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **No-starve unisex bathroom:** "A long line of women can arrive and enter while there is a man waiting, and vice versa." The fix is `turnstile.wait(); maleSwitch.lock(empty); turnstile.signal(); maleMultiplex.wait(); # bathroom code; maleMultiplex.signal(); maleSwitch.unlock(empty)`. "If there are women in the room when a male arrives, the male will block inside the turnstile, which will bar all later arrivals." The cost is that often "only 1-2 threads in the bathroom at a time". The baboon-crossing problem (§6.4) has the same structure. — [LBoS §6.3–6.4](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)

### Inferences
- **Single barber verified** (Downey's code, barber looping): no deadlock; never more than n customers; at most one customer in `getHairCut`, and only while the barber is in its cut section. Tested with (n, customers) = (2,3), (1,3), (3,4); the outcomes are all served or some balk. **Trace** (n = 2, three customers, one balks; condensed from a verified 42-step FIFO run):
  1. C0 enters (customers = 1), signals `customer` and blocks on `barber` (−1 [C0]).
  2. C1 enters (customers = 2) and blocks too (−2 [C0,C1]).
  3. C2 finds `customers == n` → releases the mutex and balks.
  4. The barber passes `customer.wait()` and signals `barber` → C0 wakes.
  5. C0 gets the haircut, signals `customerDone` and waits on `barberDone`.
  6. The barber finishes `cutHair`, consumes `customerDone`, signals `barberDone`.
  7. C0 decrements customers and leaves; the barber loops and serves C1 the same way, then sleeps on `customer.wait()`.
- **Wikipedia's version** (verified with N = 1, 2 seats, 1 and 2 barbers): deadlock-free, and the free-seat count stays in [0, N]. It has no "haircut finished" handshake, so it only counts readiness.
- **Downey's code run with two barbers is wrong** (verified). Pairing a customer with the barber whose `barber.signal()` released it, a barber can finish and call the next customer while its own customer is still in the chair (condensed from a verified 30-step trace):
  1. C0, C1, C2 all enter and signal `customer`; C0 and C1 block on `barber`.
  2. B0 calls → C0 seated (C0↔B0). C0 finishes and signals `customerDone` (= 1).
  3. B1 calls → C1 seated (C1↔B1).
  4. B1's `customerDone.wait()` consumes **C0's** signal; B1 signals `barberDone`.
  5. B1 loops and calls the next customer **while C1 is still being cut**.
- **Fix for k barbers** (my generalisation of Downey's FIFO barbershop; verified with 2 barbers for (capacity 3, 3 customers) and (capacity 2, 4 customers)): no deadlock, no barber leaves before its own customer finishes, and every haircut overlaps exactly its own barber:
```
n = capacity; customers = 0; mutex = Semaphore(1); customer = Semaphore(0); queue = []
# customer
self.call = Semaphore(0); self.custDone = Semaphore(0); self.barberDone = Semaphore(0)
mutex.wait()
    if customers == n:
        mutex.signal(); balk()
    customers += 1
    queue.append(self)
mutex.signal()
customer.signal()
self.call.wait()            # wait until A barber calls ME
# getHairCut()
self.custDone.signal()
self.barberDone.wait()
mutex.wait(); customers -= 1; mutex.signal()
# each of the k barbers
while True:
    customer.wait()
    mutex.wait(); c = queue.pop(0); mutex.signal()
    c.call.signal()
    # cutHair()
    c.custDone.wait()       # handshake on THIS customer's semaphores
    c.barberDone.signal()
```
- **Invariants:** 0 ≤ customers ≤ n; `customer` = number of customers who have entered but not yet been called; number in barber chairs ≤ k.
- **Unisex bathroom verified** (2 women + 2 men, multiplex 1 or 2, with and without the turnstile): never both sexes inside together, never more than the cap, no deadlock.
- **Unisex starvation:** with women looping, a waiting man can be blocked forever in the basic solution (even with FIFO semaphores). With the turnstile he cannot, but only with FIFO semaphores; with weak semaphores he can still lose every wake-up at the turnstile. This matches Downey's strong-semaphore assumption.

### Gaps
- **Hilzer's solution was not model-checked** (too large). Its v2.2.2 text has visible inconsistencies:
  - the hint mentions a `mutex2` that is not declared;
  - the barber signals `barber`, but no customer waits on it.

  Treat it as optional reading.
- I could not search for a canonical published multi-barber semaphore solution. The k-barber code above is my construction, checked only for small instances.

---

## 8. Dining philosophers: the naive deadlock (trace), the Coffman conditions, resource-allocation graphs, fixes (asymmetric, N−1 multiplex, waiter), Tanenbaum's solution and starvation

### Takeaway
"Pick up right, then left" deadlocks when all five each hold one fork. This is a cycle in the resource-allocation graph, and all four Coffman conditions hold.
- **Break circular wait:** one left-handed philosopher (or lower-numbered fork first), or admit at most N−1 diners through a multiplex ("footman").
- **Break hold-and-wait:** a waiter/arbitrator lock, or Tanenbaum's state-based solution.

Tanenbaum's solution is deadlock-free but **not** starvation-free.

### Cited Findings
- **History and constraints.** "It was originally formulated in 1965 by Edsger Dijkstra as a student exam exercise, presented in terms of computers competing for access to tape drive peripherals … Soon after, Tony Hoare gave the problem its present name." — [Wikipedia: Dining philosophers](https://en.wikipedia.org/wiki/Dining_philosophers_problem). Downey's constraints: one philosopher per fork at a time; no deadlock; no starvation; more than one philosopher may eat at once. — [LBoS §4.5](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Downey's code.** `forks = [Semaphore(1) for i in range(5)]`, with `def left(i): return i` and `def right(i): return (i + 1) % 5`.
  - Non-solution: `fork[right(i)].wait(); fork[left(i)].wait()` → "Deadlock #5. The problem is that the table is round …. each philosopher can pick up a fork and then wait forever for the other fork."
  - Solution #1: a multiplex `footman = Semaphore(4)` waited on before the forks and signalled after: "If there are only four philosophers at the table, then in the worst case each one picks up a fork. Even then, there is a fork left on the table" — and it "also guarantees that no philosopher starves" (with a strong footman semaphore).
  - Solution #2: "if there is at least one leftie and at least one rightie, then deadlock is not possible" (proof by contradiction: if one deadlocked philosopher is a leftie, they all are). — [LBoS §4.5.1–4.5.4](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
  - Downey's prose says "Philosopher i has fork i on the right and fork i + 1 on the left", while his code defines `left(i) = i` and `right(i) = i+1`. The labels are inconsistent, but the logic does not depend on them.
- **OSTEP's naive and fixed code.** Naive: `sem_wait(&forks[left(p)]); sem_wait(&forks[right(p)]);`. Fix: `if (p == 4) { sem_wait(&forks[right(p)]); sem_wait(&forks[left(p)]); } else { left then right }`. "Because the last philosopher tries to grab right before left … the cycle of waiting is broken", and "this is how Dijkstra himself solved the problem." — [OSTEP §31.6](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)
- **Silberschatz's naive version:** `wait(chopstick[i]); wait(chopStick[(i + 1) % 5]); /* eat */ signal(chopstick[i]); signal(chopstick[(i + 1) % 5]);` — "What is the problem with this algorithm?" Its monitor solution (pickup/putdown/test on THINKING/HUNGRY/EATING): "No deadlock, but starvation is possible". — [Silberschatz ch. 7 slides 12–16](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch7.pptx)
- **Coffman conditions** (Wikipedia): "(1) Mutual exclusion …; (2) Hold and wait or resource holding …; (3) No preemption …; (4) Circular wait …. These four conditions are known as the Coffman conditions from their first description in a 1971 article by Edward G. Coffman, Jr." They are "sufficient to produce a deadlock on single-instance resource systems" but "only indicate the possibility of deadlock on systems having multiple instances". — [Wikipedia: Deadlock](https://en.wikipedia.org/wiki/Deadlock_(computer_science))
- **Coffman conditions** (OSTEP): mutual exclusion, hold-and-wait, no preemption, circular wait; "If any of these four conditions are not met, deadlock cannot occur." The most practical prevention is a total (or partial) lock ordering. — [OSTEP ch. 32](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf)
- **Coffman conditions** (Silberschatz): the same four. "Deadlock can arise if four conditions hold simultaneously." Prevention for circular wait: "Impose a total ordering of all resource types, and require that each thread requests resources in an increasing order of enumeration". "Invalidating the circular wait condition is most common." — [Silberschatz ch. 8 slides 6, 13–15](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch8.pptx)
- **Resource-allocation graph.** "request edge – directed edge Ti → Rj; assignment edge – directed edge Rj → Ti." "If graph contains no cycles ⇒ no deadlock. If graph contains a cycle ⇒ if only one instance per resource type, then deadlock; if several instances per resource type, possibility of deadlock." — [Silberschatz ch. 8 slides 7–11](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch8.pptx)
- **Fixes on Wikipedia:**
  - **Resource hierarchy** "negates circular waiting": each philosopher picks up the lower-numbered fork first. It "is not always practical" when the needed resources are not known in advance, and "is not fair".
  - **Arbitrator/waiter:** "a philosopher can only pick up both forks or none … The waiter can be implemented as a mutex". It "can result in reduced parallelism".
  - **Limiting diners:** "A solution presented by William Stallings is to allow a maximum of n-1 philosophers to sit down at any time … This negates circular wait".
  - **"Dijkstra's solution"** (the state-based one, "with changes by Andrew S. Tanenbaum") "negates resource holding".
  - **Chandy/Misra (1984):** a distributed solution with clean and dirty forks. — [Wikipedia: Dining philosophers](https://en.wikipedia.org/wiki/Dining_philosophers_problem)
- **Conflict:** OSTEP calls the asymmetric (ordered) fix "how Dijkstra himself solved the problem", whereas Wikipedia labels the state-based mutex + per-philosopher-semaphore solution "Dijkstra's solution". Both are cited above.
- **Tanenbaum's solution (Downey):** `state = ['thinking'] * 5; sem = [Semaphore(0) for i in range(5)]; mutex = Semaphore(1)`.
```
def get_fork(i):                      def test(i):
    mutex.wait()                          if state[i] == 'hungry' and
    state[i] = 'hungry'                   state[left(i)] != 'eating' and
    test(i)                               state[right(i)] != 'eating':
    mutex.signal()                            state[i] = 'eating'
    sem[i].wait()                             sem[i].signal()
def put_fork(i):
    mutex.wait()
    state[i] = 'thinking'
    test(right(i))
    test(left(i))
    mutex.signal()
```
  "No deadlock is possible, because the only semaphore that is accessed by more than one philosopher is mutex, and no thread executes wait while holding mutex." But "Gingras demonstrated that there are repeating patterns that allow a thread to wait forever" — the "Starving Tanenbaums". — [LBoS §4.5.5–4.5.6](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)

### Inferences
- **Naive deadlock, verified** with Downey's order (right fork = i+1 first, then left fork = i):

| # | Thread | Executes | fork0 | fork1 | fork2 | fork3 | fork4 |
|---|---|---|---|---|---|---|---|
| 0 | | (initial) | 1 | 1 | 1 | 1 | 1 |
| 1 | Ph0 | fork1.wait() | 1 | 0 | 1 | 1 | 1 |
| 2 | Ph1 | fork2.wait() | 1 | 0 | 0 | 1 | 1 |
| 3 | Ph1 | fork1.wait() | 1 | −1 [Ph1] | 0 | 1 | 1 |
| 4 | Ph2 | fork3.wait() | 1 | −1 [Ph1] | 0 | 0 | 1 |
| 5 | Ph2 | fork2.wait() | 1 | −1 [Ph1] | −1 [Ph2] | 0 | 1 |
| 6 | Ph3 | fork4.wait() | 1 | −1 [Ph1] | −1 [Ph2] | 0 | 0 |
| 7 | Ph3 | fork3.wait() | 1 | −1 [Ph1] | −1 [Ph2] | −1 [Ph3] | 0 |
| 8 | Ph4 | fork0.wait() | 0 | −1 [Ph1] | −1 [Ph2] | −1 [Ph3] | 0 |
| 9 | Ph0 | fork0.wait() | −1 [Ph0] | −1 [Ph1] | −1 [Ph2] | −1 [Ph3] | 0 |
| 10 | Ph4 | fork4.wait() | −1 [Ph0] | −1 [Ph1] | −1 [Ph2] | −1 [Ph3] | −1 [Ph4] |

- **Resource-allocation graph of that state.** Ph0 → fork0 → Ph4 → fork4 → Ph3 → fork3 → Ph2 → fork2 → Ph1 → fork1 → Ph0 (request edges P→f, assignment edges f→P). This is a cycle, and every fork has a single instance → deadlock.
- **The four Coffman conditions in the deadlocked state:**
  - mutual exclusion — a fork semaphore starts at 1;
  - hold-and-wait — each holds one fork and waits for another;
  - no preemption — nobody can take a fork away;
  - circular wait — the cycle above.
- **Which condition each fix breaks** (one meal each, verified no deadlock and never two neighbours eating):
  - **footman** (multiplex N−1 = 4) → circular wait can never close;
  - **asymmetric** (Ph0 is a leftie) and **ordered** (lower fork first) → circular wait;
  - **waiter** (`waiter.wait(); fork.wait(); fork.wait(); waiter.signal()`) → nobody can hold one fork while another philosopher acquires forks, so no cycle;
  - **Tanenbaum** → hold-and-wait (forks are taken "both or none" under the mutex).

  Code for the asymmetric fix:
```
def get_forks(i):
    if i == 0:                         # the one leftie
        fork[left(i)].wait(); fork[right(i)].wait()
    else:                              # righties
        fork[right(i)].wait(); fork[left(i)].wait()
```
- **Starvation** (fair cycles in which philosopher 0 is never enabled, everyone else looping):
  - none for footman, asymmetric or waiter with FIFO semaphores;
  - the waiter version starves with weak semaphores;
  - **Tanenbaum starves even with FIFO semaphores** (Gingras). The verified cycle repeats these states (index = philosopher, T/H/E):

| Step | Event | state[0..4] |
|---|---|---|
| start | Ph1, Ph3 eat; Ph0, Ph2, Ph4 hungry | H E H E H |
| 1 | Ph3 puts down → test(4): neighbours 3 (T), 0 (H) → Ph4 eats; test(2): neighbour 1 eating → no | H E H T E |
| 2 | Ph1 puts down → test(2) → Ph2 eats; test(0): neighbour 4 eating → **no** | H T E T E |
| 3 | Ph1 hungry again → test(1): neighbour 2 eating → waits | H H E T E |
| 4 | Ph2 puts down → test(3): Ph3 thinking → no; test(1): neighbours 0 (H), 2 (T) → Ph1 eats | H E T T E |
| 5 | Ph3 hungry → neighbour 4 eating → waits | H E T H E |
| 6 | Ph4 puts down → test(0): neighbour 1 eating → **no**; test(3) → Ph3 eats | H E T E T |
| 7 | Ph4 hungry → waits (neighbour 3 eating) | H E T E H |
| 8 | Ph2 hungry → waits → back to start | H E H E H |

  Ph0 is tested exactly when one of its neighbours is still eating, so `sem[0]` is never signalled.
- **Trap when copying Downey's Tanenbaum code** (verified). If `left(i)` keeps the fork-helper meaning `left(i) = i`, then `test(i)` checks the philosopher itself instead of the left neighbour. Ph0 and Ph1 can then eat at the same time (5,890 violating states found). Use the neighbour definitions left(i) = (i + 4) % 5 and right(i) = (i + 1) % 5, as Tanenbaum and Wikipedia do.

### Gaps
- Chandy/Misra and the monitor solution are summarised only from the sources, not model-checked.
- The Coffman 1971 paper itself was not fetched (it is cited via Wikipedia and OSTEP).

---

## 9. POSIX semaphores between processes (sem_open, named semaphores, sem_init with pshared = 1 in shared memory) vs System V semaphores

### Takeaway
There are two ways to share a POSIX semaphore between processes:
1. **Named:** `sem_open("/name", O_CREAT, mode, value)`; any process using the same name gets the same semaphore. It persists until `sem_unlink`.
2. **Unnamed:** `sem_init(&s, 1, value)` with `s` placed in shared memory (an `mmap(MAP_SHARED)` region inherited across `fork`, `shm_open`, or `shmget`).

**On macOS, unnamed semaphores do not work:** `sem_init` is deprecated and returns −1 with ENOSYS (verified on this Mac), so use named semaphores there. System V semaphores (`semget`/`semop`/`semctl`) are older and come in *sets*. They support atomic multi-semaphore operations and SEM_UNDO, but must be initialised explicitly.

### Cited Findings
- **Two forms (POSIX).**
  - Named: a name of the form `/somename`, up to NAME_MAX−4 (251) characters. "Two processes can operate on the same named semaphore by passing the same name to sem_open(3)". `sem_close` closes it, and "When all processes have finished using the semaphore, it can be removed from the system using sem_unlink(3)."
  - Unnamed: "placed in a region of memory that is shared between multiple threads … or processes …. A process-shared semaphore must be placed in a shared memory region (e.g., a System V shared memory segment created using shmget(2), or a POSIX shared memory object built created using shm_open(3))." It must be initialised with `sem_init` and should be destroyed with `sem_destroy`.
  - "POSIX named semaphores have kernel persistence: if not removed by sem_unlink(3), a semaphore will exist until the system is shut down."
  - "Programs using the POSIX semaphores API must be compiled with cc -pthread".
  - "On Linux, named semaphores are created in a virtual filesystem, normally mounted under /dev/shm, with names of the form sem.somename." — [man7 sem_overview(7)](https://man7.org/linux/man-pages/man7/sem_overview.7.html)
- **`sem_init(sem_t *sem, int pshared, unsigned int value)`.**
  - "If pshared has the value 0, then the semaphore is shared between the threads of a process … If pshared is nonzero, then the semaphore is shared between processes, and should be located in a region of shared memory (see shm_open(3), mmap(2), and shmget(2)). (Since a child created by fork(2) inherits its parent's memory mappings, it can also access the semaphore.)"
  - "Initializing a semaphore that has already been initialized results in undefined behavior."
  - Errors: EINVAL (value exceeds SEM_VALUE_MAX); ENOSYS ("pshared is nonzero, but the system does not support process-shared semaphores"). — [man7 sem_init(3)](https://man7.org/linux/man-pages/man3/sem_init.3.html)
- **`sem_open(name, oflag, mode, value)`.**
  - With O_CREAT the semaphore is created if absent; O_CREAT|O_EXCL fails with EEXIST if it already exists.
  - "If O_CREAT is specified, and a semaphore with the given name already exists, then mode and value are ignored."
  - On error it returns SEM_FAILED. — [man7 sem_open(3)](https://man7.org/linux/man-pages/man3/sem_open.3.html)
- **Silberschatz slide:** "POSIX provides two versions – named and unnamed. Named semaphores can be used by unrelated processes, unnamed cannot." — [ch. 7 slide 23](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch7.pptx)
- **OSTEP:** the examples use `sem_init(&s, 0, 1)`, where a second argument of 0 means "shared between threads in the same process"; process sharing "require[s] a different value". Its homework says: "On Linux, you will be using native semaphores; on a Mac (where there is no semaphore support), you'll have to first build an implementation (using locks and condition variables …)." — [OSTEP §31.1 and Homework](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)
- **System V vs POSIX.** "System V semaphores (semget(2), semop(2), etc.) are an older semaphore API. POSIX semaphores provide a simpler, and better designed interface than System V semaphores; on the other hand POSIX semaphores are less widely available (especially on older systems) than System V semaphores." — [man7 sem_overview(7)](https://man7.org/linux/man-pages/man7/sem_overview.7.html)
- **System V sets.** "System V semaphores are allocated in groups called sets; each semaphore in a set is a counting semaphore." The calls are `semget` (create or obtain a set), `semop` (perform operations) and `semctl` ("various control operations on a set, including deletion"). — [man7 sysvipc(7)](https://man7.org/linux/man-pages/man7/sysvipc.7.html)
- **`semget`.**
  - It creates a set of `nsems` semaphores for a key (IPC_PRIVATE or a key from `ftok`); IPC_CREAT|IPC_EXCL fails with EEXIST.
  - "The values of the semaphores in a newly created set are indeterminate … a portable application cannot rely on this: it should explicitly initialize the semaphores …. Initialization can be done using semctl(2) SETVAL or SETALL …. checking for a nonzero sem_otime … can be used to avoid races." — [man7 semget(2)](https://man7.org/linux/man-pages/man2/semget.2.html)
- **`semop`.**
  - Each `struct sembuf {sem_num, sem_op, sem_flg}` applies to one semaphore of the set, and "The set of operations contained in sops is performed in array order, and atomically, that is, the operations are performed either as a complete unit, or not at all."
  - `sem_op > 0` adds to semval and never waits. `sem_op == 0` is "wait-for-zero". `sem_op < 0` proceeds if semval ≥ |sem_op|; otherwise it sleeps unless IPC_NOWAIT is set, in which case it fails with EAGAIN.
  - "If an operation specifies SEM_UNDO, it will be automatically undone when the process terminates."
  - Per-semaphore fields: semval, semzcnt, semncnt, sempid. — [man7 semop(2)](https://man7.org/linux/man-pages/man2/semop.2.html)

### Inferences
- **Verified on this Mac** (Darwin 27.0.0, Apple clang):
  - `sem_init` compiles with a "deprecated" warning and returns `-1 errno=Function not implemented` both for pshared = 0 and for pshared = 1 in a `MAP_SHARED` mapping.
  - Named semaphores work: a parent-producer / child-consumer bounded buffer over an anonymous `MAP_SHARED` mapping passed 20 items correctly (sum 210 = expected).
  - OSTEP's "no semaphore support" on a Mac is therefore imprecise: named POSIX semaphores work, unnamed ones do not.
- **Tested program** (named semaphores + shared memory across `fork`; compile with `cc -Wall -o demo demo.c`, adding `-pthread` on Linux):
```c
#include <semaphore.h>
#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/wait.h>
#define N 4
#define ITEMS 20
struct shared { int buf[N]; int fill, use; };
int main(void) {
    sem_unlink("/pc_mutex"); sem_unlink("/pc_items"); sem_unlink("/pc_spaces"); /* drop stale copies */
    sem_t *mutex  = sem_open("/pc_mutex",  O_CREAT | O_EXCL, 0600, 1);
    sem_t *items  = sem_open("/pc_items",  O_CREAT | O_EXCL, 0600, 0);
    sem_t *spaces = sem_open("/pc_spaces", O_CREAT | O_EXCL, 0600, N);
    if (mutex == SEM_FAILED || items == SEM_FAILED || spaces == SEM_FAILED) { perror("sem_open"); return 1; }
    struct shared *sh = mmap(NULL, sizeof *sh, PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANON, -1, 0);
    sh->fill = sh->use = 0;
    fflush(stdout);                       /* don't duplicate buffered output in the child */
    pid_t pid = fork();
    if (pid == 0) {                       /* child = consumer */
        long sum = 0;
        for (int i = 0; i < ITEMS; i++) {
            sem_wait(items); sem_wait(mutex);
            sum += sh->buf[sh->use]; sh->use = (sh->use + 1) % N;
            sem_post(mutex); sem_post(spaces);
        }
        printf("consumer: sum = %ld\n", sum); fflush(stdout); _exit(0);
    }
    for (int i = 1; i <= ITEMS; i++) {    /* parent = producer */
        sem_wait(spaces); sem_wait(mutex);
        sh->buf[sh->fill] = i; sh->fill = (sh->fill + 1) % N;
        sem_post(mutex); sem_post(items);
    }
    waitpid(pid, NULL, 0);
    sem_close(mutex); sem_close(items); sem_close(spaces);
    sem_unlink("/pc_mutex"); sem_unlink("/pc_items"); sem_unlink("/pc_spaces");
    return 0;
}
```
- **Unnamed, process-shared variant for Linux** (written from the man pages; **not run here** because macOS lacks it):
```c
sem_t *s = mmap(NULL, sizeof(sem_t), PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANONYMOUS, -1, 0);
sem_init(s, 1, 0);          /* pshared = 1: shared between processes; initial value 0 = signaling */
if (fork() == 0) { /* child work */ sem_post(s); _exit(0); }
sem_wait(s);                /* parent continues only after the child posted */
sem_destroy(s);
```
- **System V sketch** (from the semget/semop pages; not run). It shows that creation and initialisation are separate steps:
```c
int id = semget(IPC_PRIVATE, 1, IPC_CREAT | 0600);   /* or a key from ftok() */
/* semctl(id, 0, SETVAL, ...) to set the initial value -- REQUIRED, values are indeterminate */
struct sembuf P = {0, -1, SEM_UNDO}, V = {0, +1, SEM_UNDO};
semop(id, &P, 1);  /* critical section */  semop(id, &V, 1);
/* semctl(id, 0, IPC_RMID) removes the set */
```
- **Practical pitfalls** (from the man-page semantics):
  1. **Stale named semaphores:** `sem_open(name, O_CREAT, …, value)` silently ignores `value` if a crashed earlier run left the semaphore behind. This is a "wrong initial value" bug, so `sem_unlink` first or use `O_EXCL`.
  2. **Wrong placement:** `sem_init(pshared = 1)` on an ordinary variable is wrong, because after `fork` each process has its own copy.
  3. **stdio and fork:** when stdout is a pipe, a child that ends with `_exit` loses buffered output unless it calls `fflush`. This happened in my first test run.
- **SysV advantage for dining philosophers:** atomic all-or-nothing `semop` on two fork semaphores in one call means no philosopher ever holds one fork while waiting for the other, which removes hold-and-wait. This inference rests on the "complete unit, or not at all" wording; I did not test it.

### Gaps
- I did not run anything on Linux (`sem_init` pshared = 1, System V). `semctl(2)` was not fetched, so the exact `union semun` declaration rules on Linux are unconfirmed here; check man7 `semctl(2)`.
- Whether the course labs use Linux, WSL or macOS is unknown.

---

## 10. Catalogue of classic semaphore bugs and the paper-workshop drills (invariants and trace tables, filling in missing waits/signals, enumerating interleavings)

### Takeaway
Most exam bugs fall into six families:
1. **Deadlock** — waits in the wrong order, waiting while holding a mutex, circular waits.
2. **Starvation** — category preference, weak semaphores, Tanenbaum.
3. **Lost wakeup** — sleep/wakeup or condition variables without state.
4. **Busy waiting / non-atomic test-and-decrement.**
5. **Wrong initial value.**
6. **Unpaired or extra wait/signal.**

The paper drills are mechanical: build the happens-before graph, run a trace table that checks the invariant on every row, and count linear extensions.

### Cited Findings
- **Silberschatz's "Problems with Semaphores":** "signal(mutex) …. wait(mutex)"; "wait(mutex) … wait(mutex)"; "Omitting of wait (mutex) and/or signal (mutex)". — [Silberschatz ch. 6 slide 41](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch6.pptx)
- **Opposite-order deadlock:** S and Q both start at 1; P0 runs `wait(S); wait(Q)` and P1 runs `wait(Q); wait(S)` → "P0 and P1 are deadlocked". Starvation is "indefinite blocking. A process may never be removed from the semaphore queue in which it is suspended." — [Silberschatz ch. 6 slides 57–58](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch6.pptx)
- **Wikipedia's misuse list:** "requesting a resource and forgetting to release it; releasing a resource that was never requested; holding a resource for a long time without needing it; using a resource without requesting it first (or after releasing it)". Even with correct use, "multi-resource deadlock may still occur … as illustrated by the dining philosophers problem." — [Wikipedia: Semaphore](https://en.wikipedia.org/wiki/Semaphore_(programming))
- **Busy waiting:** the mutex-lock solution "requires busy waiting. This lock therefore called a spinlock"; the first semaphore definition spins in `while (S <= 0);`. — [Silberschatz ch. 6 slides 32, 34](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch6.pptx). "The big problem with semaphores as described above is the busy loop in the wait call, which consumes CPU cycles without doing any useful work." — [UIC notes §5.6.2](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/5_Synchronization.html)
- **Lost wakeup with condition variables** (OSTEP):
  - Fig. 30.4, no state variable: "the child will signal, but there is no thread asleep on the condition. When the parent runs, it will simply call wait and be stuck; no thread will ever wake it."
  - Fig. 30.5, no lock: "just before it calls wait to go to sleep, the parent is interrupted, and the child runs. The child changes the state variable done to 1 and signals, but no thread is waiting … When the parent runs again, it sleeps forever". — [OSTEP ch. 30](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf)
- **The sleeping-barber race** is the same kind: "the barber sleeps while a customer waits for the barber". — [Wikipedia: Sleeping barber](https://en.wikipedia.org/wiki/Sleeping_barber_problem)
- **Semaphores avoid lost wakeups** because the count records the signal ("commutative"). — [CS162 FA20 MT1 sol.](https://cs162.org/static/exams/fa20-mt1-solutions.pdf)
- **"blocking on a semaphore while holding a mutex"** is "a common source of deadlocks" — [LBoS §3.6.5](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf). "any time you wait for a semaphore while holding a mutex, there is a danger of deadlock. When you are checking a solution … you should check for this kind of deadlock." — [LBoS §4.1.3](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)
- **Real-world bug study** (Lu et al., quoted in OSTEP): 105 bugs, 74 non-deadlock and 31 deadlock. "A large fraction (97%) of non-deadlock bugs … are either atomicity or order violations." An order violation is "The desired order between two (groups of) memory accesses is flipped". trylock-based avoidance can cause **livelock**. — [OSTEP ch. 32](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf)
- **Proof style:** "The only alternative is to examine the code carefully and 'prove' that it is correct …. assert, and then demonstrate, a number of intermediate-level claims". — [LBoS §3.7.5](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)

### Inferences
**Bug catalogue** (every "trace" entry was verified with the model checker; the minimal traces are in §2, §5, §6, §8 and below):

| # | Bug | Minimal example | Symptom | Fix |
|---|---|---|---|---|
| 1 | Wrong order of waits (mutex before counting semaphore) | consumer `wait(mutex); wait(items)` | deadlock when the buffer is empty (4-step trace, §5) | wait on items/spaces first; take the mutex last, release it first |
| 2 | Opposite acquisition order | P0: `wait(S); wait(Q)` ∥ P1: `wait(Q); wait(S)` | deadlock (trace below); 4 of the 12 step-level schedules deadlock | global lock order |
| 3 | Waiting while holding a mutex | turnstile inside the mutex (§2) | always deadlocks | release the mutex before blocking |
| 4 | Wrong initial value | mutex = 0; signaling sem = 1; multiplex = 3 for "≤ 2"; spaces = 0; items = 1; roomEmpty = 0 | deadlock / order violated / limit exceeded / reading an empty slot | initial value = permits available at start |
| 5 | Missing signal | barrier without the turnstile signal; precedence fan-out signalled once | n−1 threads hang | every wait needs a matching signal on every path (including `balk()` exits) |
| 6 | Extra or unpaired signal | `signal(mutex) … wait(mutex)`; any spare `up` | value 2 → two threads in the CS | pair each signal with an earlier wait in the same thread (ownership discipline) |
| 7 | Missing wait / test outside the mutex | lightswitch without its mutex; join waited once | reader + writer together; S4 before S3 | test-and-update under the mutex; wait once per predecessor |
| 8 | Busy waiting / non-atomic P | `while (S <= 0); S--;` as two steps | wasted CPU; mutual-exclusion violation (trace below) | atomic P/V, blocking implementation |
| 9 | Lost wakeup | `if (count == 0) sleep();` racing a `wakeup()` | both processes asleep forever (trace below) | semaphores (they count), or a CV with a state variable + lock + while loop |
| 10 | Starvation | reader preference; writer priority; Tanenbaum; weak semaphores | one thread waits forever while others progress | turnstile; strong (FIFO) semaphores; footman/asymmetric philosophers |
| 11 | Reusing a one-shot barrier | non-solution #2 | a thread a lap ahead | two-phase or preloaded turnstiles |
| 12 | Crossed handshakes with several servers | Downey's barbershop with 2 barbers | a barber abandons its customer | per-client semaphores passed through a queue |
| 13 | Reading the semaphore value | `if items >= size: block()` | not allowed ([LBoS §4.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)); `sem_getvalue` is only a snapshot | use a second semaphore (spaces) |

**Bug 2 trace** (opposite order):

| # | Thread | Executes | S | Q |
|---|---|---|---|---|
| 0 | | (initial) | 1 | 1 |
| 1 | P0 | wait(S) | 0 | 1 |
| 2 | P1 | wait(Q) | 0 | 0 |
| 3 | P0 | wait(Q) | 0 | −1 [P0] |
| 4 | P1 | wait(S) | −1 [P1] | −1 [P0] |

**Bug 8 trace** (busy-wait P with test and decrement as separate steps; S starts at 1):

| # | Thread | Executes | S | in CS |
|---|---|---|---|---|
| 1 | T0 | `while (S <= 0)` → falls through | 1 | 0 |
| 2 | T1 | `while (S <= 0)` → falls through | 1 | 0 |
| 3 | T0 | S-- | 0 | 0 |
| 4 | T0 | enter CS | 0 | 1 |
| 5 | T1 | S-- | −1 | 1 |
| 6 | T1 | enter CS → **two in the CS** | −1 | 2 |

**Bug 9 trace** (Tanenbaum-style sleep/wakeup producer–consumer, N = 1):

| # | Thread | Executes | count | P asleep | C asleep | lost wakeups |
|---|---|---|---|---|---|---|
| 0 | | (initial) | 0 | no | no | 0 |
| 1 | Producer | `if (count == N)` → false | 0 | no | no | 0 |
| 2 | Consumer | `if (count == 0)` → **true** (about to sleep) | 0 | no | no | 0 |
| 3 | Producer | insert_item(); count = count + 1 | 1 | no | no | 0 |
| 4 | Producer | `if (count == 1)` → true | 1 | no | no | 0 |
| 5 | Producer | wakeup(consumer) → consumer not asleep yet → **lost** | 1 | no | no | 1 |
| 6 | Producer | `if (count == N)` → true (full) | 1 | no | no | 1 |
| 7 | Producer | sleep() | 1 | yes | no | 1 |
| 8 | Consumer | sleep() | 1 | yes | yes | 1 |

**Drill A — trace tables and invariants** (procedure):
1. Columns: step, thread, statement, one column per semaphore (value + waiting queue), shared variables, and an "invariant OK?" column.
2. On `wait`: decrement; if the result is negative, put the thread in that semaphore's queue (it stops).
3. On `signal`: increment; if the result is ≤ 0, move one waiter to ready (the head of the queue if FIFO). The woken thread does **not** re-execute its wait.
4. After each row, check the invariant, e.g. `nW ≤ 1 ∧ (nW = 0 ∨ nR = 0)` or `items + spaces + in-flight = N`.
5. If every unfinished thread is in some queue → deadlock. A repeating row-pattern in which some thread stays queued → starvation.

**Drill B — filling in missing waits/signals** (procedure):
1. Classify each requirement: "X before Y" → `signal` after X, `wait` before Y, initial 0. "At most one" → mutex 1. "At most n" → multiplex n. "Count of resources" → counting semaphore = initial stock. "First in / last out" → lightswitch. "Let one at a time through / block everyone" → turnstile.
2. Inside a thread, order the waits as **counting/condition semaphores first, mutex last**; release in reverse and signal after the mutex ("check availability before getting the mutex … release the mutex before signaling", [LBoS §4.2.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)).
3. Check every path, including early exits such as `balk()`, for releasing the mutex.
4. Look for hold-and-wait cycles across threads.

  **Typical blanks with answers:**
  - Rendezvous: `__.signal(); __.wait()` → `aArrived.signal(); bArrived.wait()`.
  - Barrier: `if count == n: ____; ____; ____` → `barrier.signal(); barrier.wait(); barrier.signal()`.
  - No-starve writer: `____; roomEmpty.wait(); CS; ____; roomEmpty.signal()` → `turnstile.wait()` … `turnstile.signal()`.
  - Footman: `____; fork[r].wait(); fork[l].wait(); eat; fork[r].signal(); fork[l].signal(); ____` → `footman.wait()` (initial 4) … `footman.signal()`.

**Drill C — enumerating interleavings** (procedure):
1. Break each thread into atomic actions; split `x = x + 1` into a load and a store if the question says so.
2. Draw happens-before edges (program order; signal → the wait it satisfies).
3. Count topological orders: multinomial formula for independent threads, case analysis otherwise.
4. An output is impossible iff it violates an edge. A prefix with no extension is a deadlock.

  Worked answers are in §4.

### Gaps
- My lost-wakeup model follows the classic sleep/wakeup producer–consumer as commonly taught. The current Wikipedia producer–consumer article no longer contains that "inadequate implementation" section, and Tanenbaum's book is not free, so no free primary source for the exact Tanenbaum code was fetched.

---

## 11. Practice questions (20) with answers

### Takeaway
These twenty questions cover the course's week 6–7 list: values and initial values, fill-in-the-blank code, interleaving enumeration, the bug catalogue, the four classical problems, precedence graphs and POSIX between processes. Every computational answer was verified with the model checker; conceptual answers cite sources.

### Cited Findings
- Q6 is CS162 Fall 2019 MT1 Q(i) — [CS162 FA19 MT1 solutions](https://cs162.org/static/exams/fa19-mt1-solutions.pdf).
- Q20(b) follows CS162 SP23 MT1 1b — [CS162 SP23](https://cs162.org/static/exams/sp23-mt1-solutions.pdf).
- Q9–Q11 follow Downey's barrier puzzles — [LBoS §3.6–3.7](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf).
- Q14–Q17 follow LBoS §4.3, §5.2–5.3 and §6.2–6.3.
- Q18–Q19 follow LBoS §4.5, [Wikipedia: Dining philosophers](https://en.wikipedia.org/wiki/Dining_philosophers_problem) and [Silberschatz ch. 8](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch8.pptx).
- The CS162 note "Semaphores, unlike locks, do not have a concept of ownership … we cannot enforce some strict ordering with a single semaphore" supports Q2(c) — [CS162 SP21](https://cs162.org/static/exams/sp21-mt1-solutions.pdf).

### Inferences
**Q1 (values).** S = 2. Operations in order: A wait, B wait, C wait, D wait, A signal, B signal. Give S and the blocked set after each step (textbook convention), and what Linux `sem_getvalue` would show.
*Answer:*
- Textbook: 1; 0; −1 [C]; −2 [C,D]; −1 [D] (C woken, FIFO); 0 (D woken).
- Linux: 1, 0, 0, 0, 0, 0.

**Q2 (initial values).** Give the initial value of each:
(a) a lock;
(b) "S2 must run after S1" in another thread;
(c) at most 3 threads inside f();
(d) a bounded buffer of 8: mutex, items/full, spaces/empty;
(e) a barrier turnstile;
(f) philosophers' forks; the footman;
(g) readers–writers `roomEmpty`; the no-starve `turnstile`;
(h) the barber's `customer` and `barber`.
*Answer:* (a) 1; (b) 0; (c) 3; (d) 1, 0, 8; (e) 0; (f) 1 each, 4; (g) 1, 1; (h) 0, 0.

**Q3 (fill in).** Make a1 < b2 and b1 < a2 without over-constraining: `A: a1; __; __; a2   B: b1; __; __; b2`.
*Answer:* `aArrived = bArrived = 0`; `A: aArrived.signal(); bArrived.wait()`; `B: bArrived.signal(); aArrived.wait()`. If both threads wait first → deadlock.

**Q4 (enumerate).** `s = 0`; `A: print a1; s.signal(); print a2`, `B: print b1; s.wait(); print b2`. List all outputs; which unsynchronised output becomes impossible?
*Answer:* `a1 a2 b1 b2`, `a1 b1 a2 b2`, `a1 b1 b2 a2`, `b1 a1 a2 b2`, `b1 a1 b2 a2` (5). Impossible: `b1 b2 a1 a2`.

**Q5 (enumerate).** `S = T = 0`; `P1: A; V(S); P(T); B`, `P2: P(S); C; V(T); D`. All outputs?
*Answer:* `A C B D` and `A C D B` only. C must follow A, and B must follow C.

**Q6 (CS162 FA19).** The luffy/blackbeard/akainu program (all semaphores 1; main calls `exit(0)` after creating the threads). Which lines can print? Can two lines print?
*Answer:*
- A, B, L and "nothing" are all possible ("nothing" because `exit(0)` can run first).
- Never two lines: every path downs `loguetown`, so the other two threads hang.
- Example run printing A: blackbeard down/up `skypeia`; akainu downs `marineford` and `loguetown`; luffy and blackbeard block on `loguetown`; akainu ups `skypeia` and prints A.

**Q7 (counting).** How many distinct outputs?
(a) two threads with three prints each, no sync;
(b) the same with a rendezvous after each first print;
(c) both bodies inside one mutex;
(d) A signals after a2, B waits before b2;
(e) 3 threads `print i; barrier; print i'`.
*Answer:* (a) 20; (b) 12; (c) 2; (d) 10; (e) 36.

**Q8 (races).** `x = 0`; T1: `x = x + 1`; T2: `x = x * 2` (each a load and a store). Final values? With `s = 0`, T1 ends with `V(s)` and T2 starts with `P(s)`?
*Answer:* {0, 1, 2}; with the semaphore, always 2.

**Q9 (barrier non-solution).** Downey's barrier without the turnstile signal: does it always deadlock? Fix it. After the fix, can the barrier semaphore end above 0?
*Answer:*
- It does not always deadlock: if all n increments happen before anyone tests `count`, all n see `count == n` and signal → everyone passes. Usually it deadlocks: the single signal frees one thread.
- Fix: add `barrier.signal()` after `barrier.wait()` (a turnstile).
- Yes, the final value can be 1..n, because `count` is read outside the mutex.

**Q10 (Deadlock #3).** Why does putting `barrier.wait(); barrier.signal()` inside `mutex` always deadlock (n ≥ 2)?
*Answer:* The first arriver blocks on `barrier` while holding `mutex`. No one else can increment `count`, so `count == n` never becomes true (§2 trace).

**Q11 (reusable barrier).** Why does non-solution #2 fail? What do the two turnstiles' initial values (0 and 1) mean?
*Answer:*
- Failure: a precocious thread decrements `count` to n−1 (so the turnstile stays open), loops, re-increments `count` to n, re-signals, and runs the next critical point before the others have arrived (§2 trace).
- Initial values: turnstile = 0 (locked) and turnstile2 = 1 (open). The nth arriver locks the second turnstile before opening the first; the last leaver locks the first before opening the second.

**Q12 (precedence graph).** S1→S2, S1→S3, S2→S4, S4→S5, S4→S6, S3→S7, S5→S7, S6→S7. Write semaphore code. How many valid orders? Is a run starting `S1 S3 S7` possible?
*Answer:* The 8-semaphore or 3-process code in §3. There are 10 orders. `S1 S3 S7` is impossible: S7 needs S5 and S6.

**Q13 (producer–consumer bugs).** For each change, say what goes wrong:
(a) consumer `wait(mutex)` before `wait(items)`;
(b) delete the mutex with two producers;
(c) `spaces = 0`;
(d) `items = 1`.
*Answer:* (a) deadlock when the buffer is empty: the consumer holds the mutex while blocked, and the producer blocks on the mutex. (b) Both producers write `buffer[fill]` before `fill++` → an item is overwritten. (c) Deadlock: no producer can ever add. (d) A consumer removes from an empty slot.

**Q14 (readers–writers).** Show writer starvation in the lightswitch solution. Give the turnstile fix. In the writer-priority solution, who can starve?
*Answer:*
- Starvation: two readers overlap so the lightswitch counter never reaches 0, and `roomEmpty` is never signalled (7-step cycle, §6).
- Fix: the writer runs `turnstile.wait(); roomEmpty.wait(); CS; turnstile.signal(); roomEmpty.signal()`; readers run `turnstile.wait(); turnstile.signal()` before the lightswitch.
- Writer priority starves **readers**: writers keep the `writeSwitch` counter above 0, so `noReaders` stays locked. The no-starve guarantee assumes strong (FIFO) semaphores.

**Q15 (lightswitch).** Why does `Lightswitch` need its own mutex?
*Answer:* Without it, two readers can both increment before either tests. Both then see `counter == 2`, neither waits on `roomEmpty`, and a writer enters alongside a reader (6-step trace, §6).

**Q16 (categorical mutual exclusion).** Write the unisex bathroom (≤ 3 inside, never mixed). What starves? How is it fixed, and what must you assume?
*Answer:*
- Code: `femaleSwitch.lock(empty); femaleMultiplex.wait(); …; femaleMultiplex.signal(); femaleSwitch.unlock(empty)`, and symmetrically for men; `empty = 1`, multiplexes = 3.
- Starvation: a stream of women can starve a waiting man.
- Fix: put `turnstile.wait(); switch.lock(empty); turnstile.signal()` around the lock step. It works only with FIFO (strong) semaphores; with weak semaphores the man can still lose every wake-up (verified).

**Q17 (sleeping barber).** In Downey's solution, what does each semaphore do? What do `customerDone`/`barberDone` add? What breaks with two barbers?
*Answer:*
- `mutex` protects the `customers` scoreboard (balk when it equals n).
- `customer` = "a customer is waiting" (the barber sleeps on it); `barber` = "the barber is ready for you".
- The second rendezvous ensures the haircut finishes before the barber loops.
- With two barbers, a barber can consume another customer's `customerDone` and call the next customer while its own customer is still in the chair (verified). Fix: per-customer semaphores passed through a FIFO queue (§7).

**Q18 (dining philosophers).** Trace the naive deadlock, draw the RAG cycle, and name the Coffman condition each fix breaks: footman(4), one leftie, ordered forks, waiter.
*Answer:*
- Trace: 10 steps (§8).
- Cycle: Ph0→fork0→Ph4→fork4→Ph3→fork3→Ph2→fork2→Ph1→fork1→Ph0.
- All four conditions hold.
- Fixes: footman → circular wait (Stallings' N−1, per Wikipedia); leftie and ordering → circular wait (resource hierarchy); waiter → only one philosopher acquiring at a time, so no partial-holding cycle (Wikipedia: "both forks or none").

**Q19 (Tanenbaum).** Is Tanenbaum's solution deadlock-free? Starvation-free? What goes wrong if `left(i) = i`?
*Answer:*
- Deadlock-free: yes — the only shared semaphore is `mutex`, and nobody waits while holding it.
- Starvation-free: no — Gingras's 8-step cycle keeps one of Ph0's neighbours eating at every test(0) (§8).
- With `left(i) = i`, test() checks the philosopher itself instead of a neighbour, so adjacent philosophers eat together (verified).

**Q20 (POSIX and concepts).**
(a) Synchronise a parent and child process so the parent prints only after the child: give two POSIX ways.
(b) True or false: "a semaphore initialised to 1 behaves exactly like a lock."
*Answer:*
- (a1) Named: `sem_open("/x", O_CREAT|O_EXCL, 0600, 0)` before `fork`; the child calls `sem_post` and the parent `sem_wait`; then `sem_unlink`.
- (a2) Unnamed: put a `sem_t` in `mmap(MAP_SHARED|MAP_ANONYMOUS)` memory and call `sem_init(s, 1, 0)` before `fork`. This works on Linux; on macOS `sem_init` returns ENOSYS (verified).
- (b) False: no ownership. An extra `signal` raises the value to 2 and lets two threads in, and there is no priority inheritance or error on a wrong unlock.

### Gaps
- None for the answers themselves. The question style may not match the Inha instructor's format, since past Inha exams were not available.

---

## 12. Best free resources (legal, no pirated textbooks)

### Takeaway
1. **Downey's *Little Book of Semaphores*** (free, CC BY-NC-SA) is the primary drill book: patterns plus a hint and a solution for every classical problem.
2. **OSTEP ch. 30–32** for semantics and bugs.
3. **Silberschatz's official slides** for the course-style notation.
4. **man7** for POSIX/System V.
5. **Berkeley CS162 midterm solutions** for exam-style semaphore questions with answer keys.
6. **The Deadlock Empire** game for interleaving intuition.

### Cited Findings
- **Allen B. Downey, *The Little Book of Semaphores*, v2.2.2** (free PDF). It is licensed under "Creative Commons Attribution-NonCommercial-ShareAlike 4.0" and covers chapters 3–6 used here: patterns, classical problems, barbershops, unisex bathroom/baboons. — [PDF](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf); [book page](https://greenteapress.com/wp/semaphores/); [source/code repository](https://github.com/AllenDowney/LittleBookOfSemaphores), whose top-level folders include `book`, `code` and `web`.
- **OSTEP** (Arpaci-Dusseau, free):
  - [ch. 31 Semaphores](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf) — definition, traces, bounded buffer, reader-writer lock, philosophers, throttling, Zemaphores;
  - [ch. 32 Common Concurrency Problems](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf) — the Lu et al. bug study and the deadlock conditions;
  - [ch. 30 Condition Variables](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf) — lost wakeups;
  - [book index](https://pages.cs.wisc.edu/~remzi/OSTEP/).
- **OSTEP semaphore homework:** skeleton C files to complete (fork-join, rendezvous, barrier, reader-writer, reader-writer-nostarve, mutex-nostarve), compiled with `gcc -o foo foo.c -Wall -pthread`. — [ostep-homework/threads-sema](https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/threads-sema); question list in [OSTEP ch. 31 Homework](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)
- **Silberschatz, Galvin, Gagne OSC 10e official slides** (free from the authors' site): [ch. 6 Synchronization Tools](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch6.pptx), [ch. 7 Synchronization Examples](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch7.pptx), [ch. 8 Deadlocks](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch8.pptx); [index](https://www.os-book.com/OS10/slide-dir/index.html). The old `PDF-dir/ch6.pdf` link returns 404; the PPTX files work.
- **Practice exams with answer keys — Berkeley CS162 midterm 1 solutions** (Pintos convention: semaphores never negative). Each fetched solution set contains semaphore questions:
  - [FA19](https://cs162.org/static/exams/fa19-mt1-solutions.pdf) — "One Piece" output question;
  - [SP19](https://cs162.org/static/exams/sp19-mt1-solutions.pdf) — implement semaphores with monitors and vice versa;
  - [SP20](https://cs162.org/static/exams/sp20-mt1-solutions.pdf) — semaphore true/false;
  - [FA20](https://cs162.org/static/exams/fa20-mt1-solutions.pdf) — semaphores vs CVs; implement a semaphore with interrupts;
  - [SP21](https://cs162.org/static/exams/sp21-mt1-solutions.pdf) — semaphore(2) use cases;
  - [FA21](https://cs162.org/static/exams/fa21-mt1-solutions.pdf) — make a queue thread-safe "using the two provided semaphores only";
  - [FA22](https://cs162.org/static/exams/fa22-mt1-solutions.pdf) — implement a semaphore with test-and-set;
  - [SP23](https://cs162.org/static/exams/sp23-mt1-solutions.pdf) — semaphore vs lock.
- **CMU 15-213 "Synchronization: Advanced"** (Bryant & O'Hallaron): the `sbuf` bounded buffer with P/V, readers-writers variants, a prethreaded server. — [slides](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/25-sync-advanced.pdf)
- **UIC course notes** (J. Bell) on Silberschatz's synchronization chapter: semaphore usage and implementation, deadlock and starvation, priority inversion, classic problems. — [5_Synchronization](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/5_Synchronization.html), [7_Deadlocks](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/7_Deadlocks.html)
- **The Deadlock Empire** (Petr Hudeček & Michal Pokorný, HackCambridge 2016). Its campaign includes the chapters "Unsynchronized Code", "Locks", "Semaphores" (levels S1-simple, S2-producerConsumer, S3-producerConsumer), "Condition Variables" and "The Final Stretch". — [deadlockempire.github.io](https://deadlockempire.github.io/) (level list in its `js/content/campaign.js`)
- **man7.org:** [sem_overview(7)](https://man7.org/linux/man-pages/man7/sem_overview.7.html), [sem_init(3)](https://man7.org/linux/man-pages/man3/sem_init.3.html), [sem_open(3)](https://man7.org/linux/man-pages/man3/sem_open.3.html), [sem_wait(3)](https://man7.org/linux/man-pages/man3/sem_wait.3.html), [sem_post(3)](https://man7.org/linux/man-pages/man3/sem_post.3.html), [sem_getvalue(3)](https://man7.org/linux/man-pages/man3/sem_getvalue.3.html), [semget(2)](https://man7.org/linux/man-pages/man2/semget.2.html), [semop(2)](https://man7.org/linux/man-pages/man2/semop.2.html), [sysvipc(7)](https://man7.org/linux/man-pages/man7/sysvipc.7.html).
- **Wikipedia overviews:** [Semaphore](https://en.wikipedia.org/wiki/Semaphore_(programming)), [Dining philosophers](https://en.wikipedia.org/wiki/Dining_philosophers_problem), [Sleeping barber](https://en.wikipedia.org/wiki/Sleeping_barber_problem), [Readers–writers](https://en.wikipedia.org/wiki/Readers%E2%80%93writers_problem), [Deadlock](https://en.wikipedia.org/wiki/Deadlock_(computer_science)), [Cigarette smokers](https://en.wikipedia.org/wiki/Cigarette_smokers_problem).
- **GeeksforGeeks**, precedence graph definition and examples: [Precedence Graph in OS](https://www.geeksforgeeks.org/operating-systems/precedence-graph-in-operating-system/).

### Inferences
**Suggested 5-day plan for 19–23 Oct 2026, before the week-8 midterm:**
- **Day 1:** LBoS ch. 2–3 (do each puzzle before reading the hint), plus §1–2 of these notes.
- **Day 2:** precedence graphs and interleaving counting (§3–4), plus Deadlock Empire's "Semaphores" levels.
- **Day 3:** producer–consumer and readers–writers (LBoS §4.1–4.3; OSTEP §31.4–31.5), with trace tables done by hand.
- **Day 4:** barber, unisex bathroom, dining philosophers (LBoS §4.5, §5.2–5.3, §6.2–6.3; Silberschatz ch. 7–8 slides).
- **Day 5:** the 20 questions in §11 timed, the CS162 FA19/SP21/SP23 semaphore questions, and the POSIX demo on your own machine.

**Exam technique:** for any "is this correct?" question, check three things in order: (1) the invariant (safety), (2) whether anyone waits while holding a mutex, or waits in a cycle (deadlock), (3) whether there is a repeating schedule in which someone never gets signalled (starvation).

### Gaps
- The session's web-search quota was exhausted after a few queries, so resources were gathered only from URLs I already knew and could fetch directly.
- I found no Inha-specific or Central Asian university materials.
- Other universities' semaphore exam keys (e.g. UW, Cornell, CMU 15-410) were not checked. The Princeton/Cornell slide URLs I tried returned 404.
