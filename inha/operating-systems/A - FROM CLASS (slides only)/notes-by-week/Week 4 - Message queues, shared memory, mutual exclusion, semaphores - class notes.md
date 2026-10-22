# Week 4 — Message queues, shared memory, mutual exclusion & semaphores (CLASS NOTES — from slides only)
> Sources: Slide 8 [S08-p#], Slide 9 [S09-p#], shared_mem.h.
>
> SOC3010-003 Operating Systems · Inha University in Tashkent · Prof. Yusupov Jalolliddin · Fall 2026 · **Track A (class material only)**.
> Slide 8 "IPC II — Message Queues, Shared Memory and Mutual Exclusion" is dated 9/27/2026 (20 pages). Slide 9 "IPC II — Semaphores" is dated 9/29/2026 (14 pages). Class header file: `code-samples/W4/shared_mem.h`.
> Midterm: week 8 (24–30 Oct 2026), worth 25%.
>
> Legend: ⭐ = professor emphasis (yellow banner, "the one rule", bold or repeated idea) · ⚠️ = typo, bug or confusing bit on the slide · 🔎 = not on the slides, so look it up in Track B · ✅ = I compiled, ran or simulated it myself.

---

## 1. Big picture

- **A pipe carries bytes, but a message queue carries messages.** One send equals one whole receive, and the sender attaches a priority. The highest priority comes out first, and equal priorities come out in the order they were sent. [S08-p3, p4, p7]
- **POSIX** is the standard (IEEE 1003.1) that makes a Unix program portable. Message queues, semaphores and shared memory were added to it in 1993. Windows is not POSIX. [S08-p5]
- **POSIX queue vs System V queue.** POSIX uses a `/name` and System V uses an integer key. In POSIX the sender decides the order (priority); in System V the receiver decides (type). Both keep their data after every process exits. Neither works with `|`, `cat` or `echo >`, and neither has an EOF. [S08-p8]
- **Shared memory.** The kernel maps the same physical RAM into two processes, so nothing is copied. The price is that the kernel no longer helps: no message boundaries, no waiting for data, and no protection against two writers. In this course you get it with one call, `shared_alloc()`, which must be called **before `fork()`**. [S08-p9, p10, p11]
- **The lost update.** Two processes each run `(*counter)++` one million times and get about 1 million instead of 2 million. This happens because `counter++` is really three steps, LOAD–ADD–STORE, and the other process can squeeze in between them. [S08-p12, p13]
- **Race condition → critical section → mutual exclusion.** A correct lock must give four things: one at a time, progress, no one waits forever, and no wasted CPU. A home-made flag fails because it has the same race as the counter, and it also burns CPU while waiting. [S08-p14, p15, p16]
- **The mutex.** `lock` takes the lock or SLEEPs until it is free. `unlock` frees it and wakes one sleeper. If every process follows lock → touch → unlock, the counter is correct. [S08-p17, p18]
- **The semaphore (Dijkstra's tool)** is a never-negative integer with two atomic operations. `wait` (P) takes one or sleeps. `post` (V) gives one back, or hands it straight to a sleeper. You trace it on paper with a four-column table. [S09-p4, p5]
- **The start value decides the job:** **1** makes a lock (a binary semaphore, i.e. a mutex), **N** makes a limit ("at most 3 at a time"), and **0** makes a signal or ordering ("A before B", ping-pong). [S09-p3, p7, p8, p13]
- **In C there are four calls:** `sem_init(&s->lock, 1, 1)` (once, before fork, with pshared = 1), `sem_wait`, `sem_post` and `sem_destroy`. The `sem_t` lives in shared memory next to the data it guards. Compile with `-pthread` and run on Linux, because macOS's `sem_init` fails. Cleanup shown on the slides: `mq_close`/`mq_unlink` for queues and `sem_destroy` for the semaphore. [S09-p11, p12, p13, S08-p6]

---

## 2. Page-by-page notes

**SLIDE 8 (W4-S08): Message Queues, Shared Memory and Mutual Exclusion, 9/27/2026, 20 pages**

### [S08-p1] Title: IPC II, Message Queues, Shared Memory and Mutual Exclusion
- Title slide: "SOC 3010 Operating Systems", "IPC II", subtitle "Message Queues, Shared Memory and Mutual Exclusion", INSTRUCTOR: Jalolliddin Yusupov, dated 9/27/2026, j.yusupov@inha.uz.
- Picture: the Linux penguin on a circuit board. It is decoration only.
- "IPC II" means this is the second IPC lecture. The map on p2 shows that pipes and FIFOs were covered in W3.

### [S08-p2] Week IV: Course Topics & Weekly Lecture Breakdown
- **Lecture topic:** IPC, covering Message Queues, Shared Memory and Semaphores (TLPI Ch 45–54).
- **Topic list (paraphrased):**
  - message queues through the POSIX and System V interfaces, message priorities, and the persistence of System V objects;
  - shared memory: creating and mapping a shared region;
  - the lost-update problem demonstrated, and the first semaphore used as the lock that protects shared memory between processes;
  - **cleaning up IPC objects**.
- **Lab objective:** make a shared-memory counter correct with a semaphore and prove it under load, and build a message-queue logger with priorities.
- **"Where we are going" has three parts:**
  1. *Two more ways to talk:* the message queue ("a mailbox") and shared memory ("a shared fridge"). What they are, when to use them, and what they cost.
  2. *The lost update:* two processes each add 1 a million times and the answer is wrong. What we need is mutual exclusion, a **mutex**.
  3. *Semaphores:* Dijkstra's tool, how to trace it on paper, and three ways to use it: **a lock, a limit, a signal**.
- **Diagram (the IPC family tree).** An "IPC" box branches into four groups:

  | BYTE STREAMS | MESSAGES | SHARED STATE | NOTIFICATION |
  |---|---|---|---|
  | pipe · W3 ✓ | **POSIX message queue — TODAY** | **shared memory — TODAY** | signal · W1 ✓ |
  | FIFO · W3 ✓ | System V queue: "one slide, for comparison" (dashed box) | **semaphore — TODAY (first look) · W6–W7** | |
  | socket · W5 | | | |

- **Reading:** TLPI ch. 51–54 (POSIX IPC, message queues, semaphores, shared memory); Silberschatz §3.5 and §6.6; man pages `mq_overview(7)`, `shm_overview(7)` and `sem_overview(7)`.
- ⭐ The map shows where the weight is. The POSIX queue, shared memory and semaphores are "TODAY". System V gets only one comparison slide. Semaphores come back in W6–W7.
- Note: the lecture topic cites TLPI Ch 45–54, but the reading list says ch. 51–54.

### [S08-p3] The Problem: A Pipe Does Not Know Where a Message Ends
- **What the writer did:**
```c
write(fd[1], "AB", 2);
write(fd[1], "AB", 2);
write(fd[1], "AB", 2);
```
- **What the reader may get:**
```c
n = read(fd[0], buf, 100);    /* n == 6 */
/* buf: "ABABAB" - one read, three writes glued */
```
- A pipe is a **byte stream** (W3). It keeps the bytes in order and nothing else, so it remembers the bytes but not the fact that there were three separate `write` calls.
- **So with a pipe you must invent:**
  - **a separator** (every message ends with `'\n'`), or
  - **a length in front** ("the next 17 bytes are one message"), and
  - **urgency**, which pipes do not have at all: an alarm waits behind 60 KiB of old news.
- **PIPE: atomic write.** *Atomic write*: "a write that arrives in one piece, never mixed with another writer's bytes." A pipe promises this only for writes of at most **PIPE_BUF = 4096 bytes** on Linux (the value depends on the OS). Larger writes from two processes can interleave.
- **What we want instead:** "One send = one receive, whole or not at all — and a way to say URGENT."
- ⭐ Banner: **"A pipe carries bytes. A message queue carries messages."**
- ⚠️ The slide's wording "(depending) on OS Linux" is garbled. Read it as "the value depends on the OS; on Linux it is 4096".

### [S08-p4] A Message Queue Is a Mailbox the Kernel Keeps
- **Diagram.** Two boxes, "sender A" and "sender B", have arrows into a black box labelled **KERNEL · queue "/soc3010"**. Inside are three envelopes from left to right: **prio 9 "server on fire"** (darkest yellow), **prio 5 "disk almost full"** and **prio 1 "hello"** (palest). An arrow leads out to one "receiver". The caption says each envelope is one whole message, and the most urgent is always handed out first.
- **"Three names, all new today" (definitions):**
  - **Message queue**: "a list of messages kept inside the kernel, with a name, that processes put messages into and take messages out of."
  - **Message**: "one block of bytes sent by one call; it is always received **whole**, by one call."
  - **Priority**: "a number the **sender** attaches; bigger = more urgent; the queue hands out the highest first."
- **What you get for free:**
  - **Boundaries:** no separators, no length fields.
  - **Priorities:** "the alarm jumps the line".
  - **A (POSIX) name:** as with a FIFO, unrelated processes can meet at it.
  - **Many senders, one receiver:** each message stays whole.
- ⭐ Banner: **"One send, one receive — the kernel counts the envelopes for you."**

### [S08-p5] What Is POSIX?
- **POSIX** = **P**ortable **O**perating **S**ystem **I**nterface (the **X** is for Unix). A **standard** is a written promise of which system calls exist, what their names and arguments are, and how they behave.
- **Diagram, read left to right:**
  - **Left, "1980s: MANY UNIXES":** AT&T System V, BSD, SunOS, HP-UX, AIX… The red caption says each had its own calls, so a program had to be rewritten for each one.
  - **Middle, yellow box "POSIX · IEEE 1003.1":** in **1988** one agreed set of calls; in **1993** message queues, semaphores and shared memory were added.
  - **Right, "ONE PROGRAM RUNS ON":** Linux, macOS, FreeBSD, Android… The green caption reads "write it once, compile it anywhere".
- **"You have used POSIX since Week 1":** `fork`, `exec`, `wait`, `kill`, `sigaction`, `pipe`, `dup2`, `open`, `read`, `write` and `mkfifo` are all POSIX. So is the shell language of Week 2, along with commands like `ls`, `cat` and `grep`. That is why the same C file works on Linux and on a Mac.
- Windows is **not** POSIX, which is why these programs need Linux, a Mac, or WSL (Linux inside Windows). **"A standard is a promise, not a guarantee."** There is a live example in this very week: macOS does not implement `sem_init` [S09-p11].
- ⭐ Banner: **"POSIX is the contract that makes a Unix program portable."**

### [S08-p6] In Code: A Pipe With Envelopes
- **Table, exact:**

  | step | pipe / FIFO | POSIX message queue | the only difference |
  |---|---|---|---|
  | create / open | `mkfifo` + `open` | `mq_open("/soc3010", …)` | the name starts with `/`; its size (how many messages, how big) is **fixed at creation** |
  | send | `write` | `mq_send` | + a **priority** number |
  | receive | `read` | `mq_receive` | always **one whole message**, most urgent first |
  | close / remove | `close` / `unlink` | `mq_close` / `mq_unlink` | the queue **and its messages** survive until removed |

- **"What it looks like when it runs" (terminal):**
```text
$ ./mq_sender          # sends priorities 1, 5, 9, 5 - then exits
$ ./mq_receiver        # started later
receiver: got "server on fire" (priority 9, 15 bytes)
receiver: got "disk almost full" (priority 5, 17 bytes)
receiver: got "CPU too hot" (priority 5, 12 bytes)
receiver: got "hello" (priority 1, 6 bytes)
```
- **What to take away:**
  - The sender had **exited** before the receiver started, yet the messages waited in the kernel. That is persistence.
  - **9** came out first, the two **5**s came out in the order they were sent, and **1** came out last.
- **What I read from the output:**
  - The send order must have been hello (1), disk almost full (5), server on fire (9), CPU too hot (5). That follows from "1, 5, 9, 5" plus the fact that the 5s came out in send order.
  - Each byte count is one more than the visible characters ("hello" has 5 letters and 6 bytes). 🔎 Look up in Track B: why a C string message carries one extra byte.
- ⭐ **"You will not write this in this course."** Know what a message queue is, that it exists, and when to choose it. **No coding.** For the exam, expect concepts and ordering puzzles, not `mq_*` code.
- ⭐ Banner: **"Same idea as a pipe — plus envelopes, plus urgency."**
- The `mq_sender`/`mq_receiver` source is not on the slides. 🔎 Look up in Track B: the full argument lists and return values of `mq_open`, `mq_send`, `mq_receive`, `mq_close` and `mq_unlink`.

### [S08-p7] Try It on Paper: Who Comes Out Next?
- **"The rule, in two lines":**
  1. "`mq_receive` takes a message with the **highest** priority waiting."
  2. "Among equal priorities, the one that was **sent first** comes out first (first in, first out)."
- **Exercise.** Process A sends, in this order: (1) `"backup done"` with priority 0, (2) `"login failed"` with priority 3, (3) `"out of memory"` with priority 7, and (4) `"login failed again"` with priority 3. Process B then calls `mq_receive` **twice**. A then sends `"disk dead"` with priority **7**. B keeps receiving until the queue is empty.
- **Answer (on the slide):** out of memory (7) → login failed (3) → **disk dead (7)** → login failed again (3) → backup done (0).
- The slide's comment: "disk dead" arrived *after* B's second receive, but it still overtakes the two older, less urgent messages. The full step-by-step walk-through is in §5.6.
- **Where this is used for real:**
  - a logger that must print **errors before chatter**;
  - a job queue where paying customers go first.
- ⭐ The priority belongs to the **sender**, because the sender is the one who knows how urgent the message is.

### [S08-p8] The Older Cousin: System V Message Queues vs POSIX
- **System V** is the AT&T Unix of 1983. It had message queues long before POSIX, Linux still ships them, and old software still uses them. Unlike POSIX, it uses an **integer key** instead of a `/name`, and programs agree on the number.
- **Big comparison table (exact, column order as in the image):**

  | question | pipe | FIFO | POSIX queue | System V queue |
  |---|---|---|---|---|
  | who can use it? | parent + children only | anyone with the path | anyone with the /name | anyone with the key |
  | what travels? | bytes | bytes | **whole messages** | **whole messages** |
  | who decides the order? | nobody: FIFO | nobody: FIFO | the **sender** (priority) | the **receiver** (type) |
  | works with \|, cat, echo >? | **yes** | **yes** | no | no |
  | data survives when everybody exits? | no | no (only the name) | **yes** | **yes** |
  | end-of-data signal? | EOF | EOF | none | none |

- ⭐ **Choose a queue when:**
  - you send **records** (a log line, a job, a command);
  - several senders share one receiver;
  - some messages are **more urgent** than others.
- ⚠️ In the title, the words "System V Message Queues" are drawn with a **strike-through line**. It looks like an editing leftover, and the slide is still the System V vs POSIX comparison.
- ⚠️ The PDF's text layer lists the table columns in reverse order (System V first). Trust the image order above.
- No System V call names appear on the slides. 🔎 Look up in Track B: the System V queue calls, how the receiver uses "type" to choose, and why System V objects persist.

### [S08-p9] Shared Memory: A Door in the Wall, Opened on Purpose
- **Diagram 1, "PIPE OR QUEUE: THE DATA IS COPIED TWICE":** process A →(copy 1)→ **kernel buffer** (black box) →(copy 2)→ process B.
- **Diagram 2, "SHARED MEMORY: NO COPY AT ALL":**
  - process A ("its own addresses", yellow tag `0xffff9554..`) and process B ("its own addresses", tag `0xffff94d6..`) each have a line down to one yellow box, **"one piece of physical RAM"**;
  - the text between them reads: shared memory is "a region of memory that several processes can read and write directly, as if it were their own."
- **Remember the wall.** Each process has its own address space, so a pointer from one process means nothing in the other.
- Shared memory asks the kernel to **map the same physical memory into both address spaces**: at **different addresses**, but the **same bytes**.
- ⭐ Banner: **"Pipes and queues copy your data; shared memory hands out a second key to the same room."**
- 🔎 Look up in Track B: whether parent and child see the region at the same address when it is created before `fork()`. The diagram's two different addresses show the general case.

### [S08-p10] Getting Shared Memory: One Call, Given to You
- In faint grey in the background is a heading, "SHARED_MEM.H — ON ECLASS; READ IT ONCE, NEVER MEMORISE IT", above the `shared_alloc` code. That code is the same as the class file shown at the end of this page.
- Overlaid in big black text (paraphrased): a ready-made library comes with the starter code, and your job is to integrate it and call its functions as specified.
- **"HOW YOU USE IT — THIS IS ALL YOU WRITE":**
```c
#include "shared_mem.h"

long *counter = shared_alloc(sizeof(long));
*counter = 0;
fork();        /* parent and child now share *counter */
```
- ⭐ **The one rule: call `shared_alloc` *before* `fork()`.**
  - The child inherits the memory, so from then on a change by one process is **seen by the other**.
  - That is unlike every variable you have used so far, because `fork` *copied* those.
- ⭐ Banner: **"One call before fork, and two processes share the same bytes."**
- **The class header file `shared_mem.h` (exact):**
```c
/* shared_mem.h — the course's shared memory in ONE call.
   Read it once; you never need to memorise it.
   Call shared_alloc() BEFORE fork(): parent and children then see the same bytes. */
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>

static void *shared_alloc(size_t size) {
    void *p = mmap(NULL, size, PROT_READ | PROT_WRITE,
                   MAP_SHARED | MAP_ANONYMOUS, -1, 0);
    if (p == MAP_FAILED) { perror("mmap"); exit(EXIT_FAILURE); }
    return p;
}
```
- **Step by step:**
  - `shared_alloc(size)` asks for `size` bytes using **one call, `mmap(...)`**. This is the "mmap" that S08-p11 says the kernel steps out after.
  - The flag names say what they do: `PROT_READ | PROT_WRITE` means the region can be read **and** written, and `MAP_SHARED` means it is shared.
  - If `mmap` returns `MAP_FAILED`, the function prints the error with `perror("mmap")` and ends the whole program with `exit(EXIT_FAILURE)`, so callers never see a bad pointer.
  - Otherwise it **returns a `void *`** to the shared bytes. You store it in a typed pointer, such as `long *counter` or `struct shared *s`.
- The header's own comment says you never need to memorise it, and the slide says "read it once, never memorise it". 🔎 Look up in Track B: what each `mmap` argument means (`NULL`, `MAP_ANONYMOUS`, `-1`, `0`) and how to unmap the region.

### [S08-p11] The Price: Nobody Is Watching
- With a pipe or a queue, the kernel stood in the middle of every transfer. With shared memory, **after `mmap` the kernel steps out**, and everything it used to do for you becomes your job.
- **Table (exact):**

  | the kernel did this for pipes and queues | with shared memory |
  |---|---|
  | kept message boundaries | no — it is a block of bytes; you decide the layout |
  | made the reader **wait** until data was there | no — the reader sees whatever is there **now**, finished or half-written |
  | handed each message to **one** receiver | no — everybody sees everything |
  | kept two writers from **mixing** their data | **no** — two processes can change the same byte at the same time |

- ⭐ Banner: **"Shared memory is fast because the kernel steps out — also when you fight."**
- **The shared fridge (paraphrased).** Two flatmates share one fridge with no rules. Both see one egg left, both plan an omelette, and both go to take it. It is fast and convenient, but one of them is going to be wrong. **The next slide runs exactly this experiment, a million times.**

### [S08-p12] The Experiment: Two Processes, One Counter
- **Code, exactly as printed on the slide:**
```c
/* counter_race2.c — two processes, one shared counter, NO lock */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include "shared_mem.h“
//some library industry offers us
#define N 1000000
int main(void) {
    long *counter = shared_alloc(sizeof(long));
    /* seen by parent AND child */
    *counter = 0;
    pid_t pid = fork();
    for (int i = 0; i < N; i++)
         /* BOTH processes run this loop */
        (*counter)++;
    if (pid == 0) exit(0);             /* child: done */
    wait(NULL);                        /* parent: wait for the child */
    printf("expected %d, got %ld\n", 2 * N, *counter);
    return 0;
}
```
- **"What it does" box:**
  - one `long` in shared memory, set to 0;
  - `fork()`, after which two processes see the **same** counter;
  - each adds 1, N times;
  - the parent waits for the child and prints.
- **Terminal shown on the slide:**
```text
$ ./counter_race2
expected 2000000, got 1025956
$ ./counter_race2
expected 2000000, got 1073573
```
- ⭐ **What the machine showed:**
  - About **half** of the additions disappeared.
  - Nobody crashed and nothing printed an error.
  - The result is **nondeterministic**: it differs from run to run.
- **Line by line:**
  1. `shared_alloc(sizeof(long))` happens **before** `fork()`, following the one rule. The counter lives in shared memory.
  2. `fork()` creates the child. Both processes continue from the same point and both run the `for` loop.
  3. The child returns from the loop and calls `exit(0)` because `pid == 0`. The parent skips that line, calls `wait(NULL)` until the child is done, and then prints `2 * N` (expected 2 000 000) next to the real value.
  4. The loop body `(*counter)++` is the **critical section**, and nothing protects it.
- ⚠️ **Typo:** `#include "shared_mem.h“` ends with a curly quote `“`. Typed as shown it **does not compile**. ✅ I tried it, and clang reported "missing terminating '"' character" plus follow-on errors. Use a straight `"`.
- ⚠️ The PDF text layer shows `#define N 10` and a stray `00000`, but the image clearly reads `#define N 1000000` (one million).
- ✅ I ran it on a Mac as well; the results are in §5.8.

### [S08-p13] The Autopsy: `counter++` Is Three Steps
- For the CPU, `(*counter)++` is not one action. It is three:
```text
1. LOAD   the value from memory into a register
2. ADD    1 to the register
3. STORE  the register back to memory
```
- ⭐ The scheduler (W2) may stop a process **between any two steps**, and on a multi-core machine the two processes really run **at the same time**.
- **Table, "ONE UNLUCKY INTERLEAVING (COUNTER STARTS AT 41)":**

  | parent | child | in memory |
  |---|---|---|
  | LOAD 41 | | 41 |
  | *(row hidden under the yellow banner; must be:)* | *LOAD 41* | *41* |
  | ADD → 42 | ADD → 42 | 41 |
  | STORE 42 | | 42 |
  | | STORE 42 | **42 — not 43** (in red) |

- ⭐ Banner: **"Read, add, write back — and someone else can squeeze in between."**
- **Right side:**
  - a tweet by "I Am Devloper": "Knock knock / Race condition / Who's there?" The punchline arrives before the question, so the joke itself is told by a race;
  - below it: **"But it is one line of C!" `(*counter)++`. Lines of C are not what the CPU runs.** ⭐
- ⚠️ **The yellow banner covers one row of the table.** I zoomed in and nothing shows through. From the rows around it, the hidden row must be the **child's LOAD 41** with memory still at 41. The child's next step is ADD → 42, which is only possible if it loaded 41. The full annotated version is in §5.1.

### [S08-p14] Race Condition
- ⭐ **Definition (exact):** "A **race condition** is an undesirable situation that occurs when a system's behavior depends on the sequence or timing of uncontrollable events, such as the execution order of multiple **threads** or **processes**."
- **Why they are dangerous (paraphrased):**
  - They are among the most frustrating bugs because they are **intermittent and difficult to reproduce**. The slide jokes that the teacher spends hours proving the point.
  - A program can pass every test in development and still fail **randomly** under heavy production traffic.
  - Besides **data corruption** and crashes, they are severe **security vulnerabilities**. Attackers exploit the tiny "race window" between a security check and its execution to bypass authentication or escalate privileges.
- **Diagram, "Mechanisms to solve Race Conditions" (orange header, a top-down chain):**
  1. Hardware Primitives
  2. Spinlock
  3. **Mutex / Semaphore** (boxed: this week's topic)
  4. Condition Variable
  5. Monitor / Language-Level Abstractions
- 🔎 Look up in Track B: definitions of *spinlock*, *condition variable* and *monitor*. These are named only, not explained.

### [S08-p15] MUtual EXclusion (section divider)
- The title is written "**MU**tual **EX**clusion", and the capitals spell **MUTEX**.
- ⭐ **Definition (exact):** "**Mutual exclusion** — the guarantee that while one process is inside its critical section, **no other process** can be inside it."

### [S08-p16] What We Need: Mutual Exclusion
- ⭐ **Critical section**: "the lines of code that touch the **shared data**". Here that is the one line `(*counter)++`. Only one process may be inside (locked) at a time.
- ⭐ **"A CORRECT LOCKING MECHANISM MUST GIVE US":**

  | # | property | meaning |
  |---|---|---|
  | 1 | **one at a time** | never two processes in the critical section together |
  | 2 | **progress** | if nobody is inside, somebody who wants to enter gets in |
  | 3 | **no one waits forever** | every process that waits gets its turn eventually |
  | 4 | **no wasted CPU** | a waiting process **sleeps** (state S); it does not spin in a loop checking |

- ⭐ Banner: **"A lock you build from ordinary variables has the same race as the thing it protects."**
- **"Why not a simple flag?"**
```c
while (*busy == 1) ;   /* wait  */
*busy = 1;             /* I'm in */
(*counter)++;
*busy = 0;
```
  - Checking the flag and setting it are **two steps again**. Both processes can see 0, both set 1, and both go in.
  - The flag has the same race as the counter, **and** it burns CPU while waiting.
  - So it breaks property 1, and its `while` loop breaks property 4. The interleaving table is in §5.2.
- **"So we need help from outside":** something that **tests-and-takes in one indivisible step** and can **put a process to sleep**. The OS, with the CPU's help, can offer that.

### [S08-p17] The Mutex: A Lock Around the Critical Section
- A **mutex** (short for **mut**ual **ex**clusion lock) provides two basic operations:
```c
lock(m);        /* if free: take it and go on   */
                /* if taken: SLEEP until free   */
counter++;      /* critical section             */
unlock(m);      /* free it; wake one sleeper    */
```
- ⭐ Every process that touches the counter follows the same rule: **lock, touch, unlock**. Then one process's LOAD–ADD–STORE can no longer be cut in half by the other.
- **Table (exact):**

  | parent | child | counter |
  |---|---|---|
  | lock ✓ | | 41 |
  | LOAD 41 | lock → **sleeps** | 41 |
  | STORE 42 | (sleeping) | 42 |
  | unlock | wakes, lock ✓ | 42 |
  | | LOAD 42, STORE 43 | **43 ✓** (green) |

- **"One word, in case it is new": Atomic** means "indivisible: it happens completely or not at all, and nobody sees it half-done." `lock` checks-and-takes **atomically**, which is the thing our home-made flag could not do.
- **Pictures:**
  - a two-panel bouncer meme: "**Mutex lock**" (the bouncer blocks the door), then "**You may enter**" / "**Mutex unlock**" (he steps aside);
  - an empty golf hole and a golf flag standing in its hole. These preview Slide 9's picture language: flag present = free, hole empty = taken.
- ⚠️ The slide writes "LOAD(atomic)–ADD–STORE". The "(atomic)" is in an odd place. What the lock protects is the **whole** LOAD–ADD–STORE group, which the other process can no longer cut in half.
- Note: to save space, the table skips the parent's ADD row and packs the child's steps into "LOAD 42, STORE 43".

### [S08-p18] Example: The Mutex
- **Code (left):**
```text
Process P1:          Process P2:
    lock(L)              lock(L)
    print("A")           print("C")
    print("B")           print("D")
    unlock(L)            unlock(L)      <- struck through with a red line on the slide
```
- **"Which of the following outputs are possible?"** The options are `A B C D`, `C D A B`, `A C B D` and `C A D B`. Yellow arrows point at **A B C D** and **C D A B**, the two possible outputs. S09-p7 confirms this: "S = 1: only A B C D and C D A B".
  - **Why:** whoever locks first prints **both** of its letters before the other can enter, so A–B and C–D can never be split.
- **The red strike-through on P2's `unlock(L)`** is a "what if P2 forgets to unlock?" variant. Its answer is not on the slide; the worked answer is in §5.4.
- **"Next: What if we have two locks?"**
```text
Process P1:              Process P2:
    lock(L1)                 lock(L2)
    lock(L2)                 lock(L1)
    print("P1 done")         print("P2 done")
    unlock(L2)               unlock(L1)
    unlock(L1)               unlock(L2)
```
  - The answer is not on the slide; the worked answer is in §5.4. In short, it can print both lines, or it can get stuck forever with nothing printed.

### [S08-p19] Homework
- **1. "How many different outputs are possible?"** Three processes all use the **same** lock `L`:
```text
Process P1:      Process P2:      Process P3:
lock(L)          lock(L)          lock(L)
print("A")       print("C")       print("E")
print("B")       print("D")       print("F")
unlock(L)        unlock(L)        unlock(L)
```
- **2. "Can the output be ACBD?"** Here the two processes use **different** locks:
```text
Process P1:      Process P2:
lock(L1)         lock(L2)
print("A")       print("C")
print("B")       print("D")
unlock(L1)       unlock(L2)
```
- Answers are not on the slide. My worked answers, checked with a simulator, are in §5.5. In short: **6** outputs, and **yes**.

### [S08-p20] Questions?
- Closing slide with a photo of a glass building. It has no content.

---

**SLIDE 9 (W4-S09): Semaphores, 9/29/2026, 14 pages**

### [S09-p1] Title: IPC II, Semaphores
- Title slide: "SOC 3010 Operating Systems", "IPC II", subtitle "Semaphores", INSTRUCTOR: Jalolliddin Yusupov, dated 9/29/2026.
- Pictures:
  - the Linux penguin on a circuit board;
  - a photo of an old-style **railway signal mast** beside railway tracks, with a signal box in the background.
- 🔎 Look up in Track B: why the tool is named after railway signals. The slide only shows the photo.

### [S09-p2] Week IV: Course Topics & Weekly Lecture Breakdown (repeat)
- Same page as S08-p2: lecture topic, topic list including "cleaning up IPC objects", lab objective, the IPC family-tree diagram and the reading list.
- **The only change:** the semaphore line now reads "how to trace it on paper, and three ways to use it — a lock, a limit, a signal". The words "Dijkstra's tool" have been dropped.
- ⭐ **"Three ways to use it: a lock, a limit, a signal"** is the skeleton of this whole deck:
  - **lock**: start value 1 [S09-p7];
  - **limit**: start value N [S09-p3 #1, S09-p4 "S=3"];
  - **signal / order**: start value 0 [S09-p8, p9, p10, p13].

### [S09-p3] Three Things a Lock Cannot Say
- **Top row (pictures):**
  - **Left:** a golf flag standing in its hole, labelled `unlock(L)`. Text: "**free**: you can access the critical section".
  - **Right:** an empty golf hole labelled `lock(L)`. Text: "**taken**: flag is missing, you need to wait".
  - **Centre:** "**mutex** — Mutual EXclusion" and a "VS" logo.
- ⭐ Orange banners: **"A mutex lock has only two states: free or taken"** versus **"Real programs need more"**.
- **Three problems a lock cannot solve:**
  1. **"At most 3 at a time."** A server lets 3 clients use the database at once, not 1, and the 4th must wait until one leaves. **A lock can count only to 1.**
     - Code under it: P1 runs `lock(L)`, `print("A")`, `print("B")`, `unlock(L)`.
     - P2 runs `lock(L)`, `print("C")`, `print("D")`, `unlock(L)`.
     - "Process P3" runs `lock(L)`, `print("C")`, `print("D")`, `unlock(L)`.
  2. **"B only after A."** The child may read the file only **after** the parent has written it. That is not about sharing, it is about **order**. With a lock, whoever comes first wins, so the wrong one may go first.
     - Code: P1 (`A`, `B`) and P2 (`C`, `D`), both using `lock(L)` / `unlock(L)`.
  3. **"Take turns."** PING, PONG, PING, PONG… forever, never two PINGs in a row. A lock guarantees **one at a time**, not **whose turn** it is.
```text
// Shared variable
Lock L = new Lock()
Process P1:                Process P2:
while (true) {             while (true) {
    lock(L)                    lock(L)
    print("ping")              print("pong")
    unlock(L)                  unlock(L)
}                          }
```
- **"What all three need?"** The answer is on the next page: a counter that can make a process sleep. That is the semaphore.
- ⚠️ **Copy-paste slip in problem 1:** the "3" in "Process P3" is visibly pasted over a "2" (I zoomed in), and P3 prints `"C"`/`"D"`, exactly like P2. It was probably meant to print other letters, such as E/F on S08-p19.

### [S09-p4] The Semaphore
- ⭐ **Definition:** "A **counter** that processes can decrease and increase **atomically**, and that makes a process **sleep** when there is nothing left to take. That counter is the **semaphore**."
- ⭐ **Formal version (boxed):** "A **semaphore** S is an integer that is **never negative**, with exactly two (atomic) operations:"
```text
S=3
wait(S):   if S > 0:   S = S - 1
           else:       sleep until S > 0,
                       then S = S - 1

post(S):   S = S + 1
           if someone sleeps on S:
                       wake ONE of them
```
- ⭐ **"Synonymous terms" (tree diagram):**
  - **mutex** → `lock/unlock` = `acquire/release`;
  - **Semaphore** → `wait/post` = `P/V` = `wait/signal`.
  - So **P = wait** and **V = post = signal**.
- **"How to read the drawing":**
  - The **value** is the number of flags in the "hole".
  - **wait** takes a flag. If the hole is empty, the process **sleeps** beside it.
  - **post** puts a flag back, or hands it **directly to a sleeper**, who wakes up.
- **Pictures:** one red flag in one hole (the mutex), "VS", then three flags (red, blue, yellow) in one hole. That second picture is the semaphore with S = 3: up to three processes can be inside at once.
- 🔎 Look up in Track B: what the letters P and V stand for. The slide only lists them as synonyms.

### [S09-p5] The Trace Table
- **S STARTS AT 1 · THREE PROCESSES P, Q, R (exact):**

  | # | operation | S | sleeping | inside |
  |---|---|---|---|---|
  | 0 | (start) | 1 | — | — |
  | 1 | P: wait(S) | 0 | — | P |
  | 2 | Q: wait(S) | 0 | **Q** | P |
  | 3 | R: wait(S) | 0 | **Q, R** | P |
  | 4 | P: post(S) | 0 (flag goes to Q or R) | R | Q |
  | 5 | Q: post(S) | 0 (flag went to R) | — | R |
  | 6 | R: post(S) | 1 | — | — |

- **"Four columns, one row per step":**
  - the operation;
  - the **value** after it;
  - who is **sleeping**;
  - who is **inside**, meaning it has passed `wait` and not yet posted.
- ⭐ **Two rules in the grey box (paraphrased):**
  - The value can **never go below 0**, because you cannot take a flag that is not there.
  - A sleeper costs **no CPU**. It is not checking the hole in a loop; the OS wakes it. It shows as state S in `ps`.
- ⭐ **"The only things you may do":**
  - Set the start value **once**.
  - After that, use only `wait` and `post`.
  - You may **not** read the value to decide something, because it can change the moment after you read it.
- **How to read row 4.** P's post would bring S up to 1, but Q and R are sleeping, so the flag is handed straight to one of them and S stays 0. The slide says it could go to Q or R. The "inside" column shows that Q got it in this trace, and row 5 then hands Q's flag to R.

### [S09-p6] Homework: Trace the Value
- **Header:** "S STARTS AT 2 · THREE PROCESSES P1, P2, P3".
- **Operations to fill in** (the S, sleeping and inside columns are blank on the slide):
  1. P1: wait(S)
  2. P2: wait(S)
  3. P3: wait(S)
  4. P1: post(S)
  5. P4: wait(S)
  6. P2: post(S)
  7. P3: post(S)
  8. P4: post(S)
- ⚠️ The header says **three** processes, but the table uses **four**: P4 appears in rows 5 and 8.
- The solved table is in §5.7. The final value is S = 2 again.

### [S09-p7] S = 1: Start at 1, Your Semaphore Is a Mutex
- **"LAST LECTURE" vs "TODAY — S STARTS AT 1":**
```text
LAST LECTURE                         TODAY — S STARTS AT 1
Process P1:      Process P2:         Process P1:      Process P2:
  lock(L)          lock(L)             wait(S)          wait(S)
  print("A")       print("C")          print("A")       print("C")
  print("B")       print("D")          print("B")       print("D")
  unlock(L)        unlock(L)           post(S)          post(S)
```
- ⭐ **"The same program."**
  - One flag in the hole is one key: wait takes the key, post gives it back.
  - A semaphore that **starts at 1** and is used as `wait … post` **by the same process** *is* a mutex.
  - Its value is only ever 0 or 1, which makes it a **binary semaphore**.
- ⭐ Banner: **"Same code, different start value, different program."**
- **Exercise 1, "Change the Start Value": answer three times, for (a) S = 1, (b) S = 2 and (c) S = 0.** Answers on the slide:

  | start | possible outputs |
  |---|---|
  | **S = 1** | only **A B C D** and **C D A B** |
  | **S = 2** | **all four**, and also A C D B, C A B D |
  | **S = 0** | **none**: nothing is printed |

- **What this means:**
  - **S = 2:** both processes can be inside together. Every order that keeps A before B and C before D is possible. "All four" means the four options from S08-p18 (ABCD, CDAB, ACBD, CADB), plus ACDB and CABD, so **6 outputs in total**. ✅ My simulator agrees.
  - **S = 0:** both `wait`s find the hole empty and both processes sleep. Nobody ever posts, so nothing is printed.

### [S09-p8] Start at 0: "A Must Happen Before B"
```text
S = 0                          /* nothing happened yet */

Process P1:                    Process P2:
  print("A")                     wait(S)
  post(S)                        print("B")
```
- **Diagram:** a yellow circle **A**, a line to an orange box **`S = 0`**, and an arrow to a circle **B**. The captions read "A: post(S) after" and "B: wait(S) before".
- **"Why it works" (paraphrased):**
  - The hole starts **empty**. If P2 comes first, its wait finds no flags and it **sleeps**.
  - The only flag ever created is the one P1 puts in **after** printing A.
  - So B can never come before A, whatever the scheduler does.
- ⭐ **"Why not just `sleep(1)` before B?"** Because on a busy machine A may take 2 seconds. **`sleep` guesses; a semaphore knows.**
- Note the difference from the mutex: here the `post` and the `wait` are in **different** processes. This is the "signal" use, whereas in S09-p7 the same process did wait … post.

### [S09-p9] Try It on Paper: Force the Order A, B, C
- **Task:** three processes, and the output must **always** be **A B C**, whatever the scheduler does. Fill in the blanks with `wait(…)` or `post(…)` and choose the starting values.
```text
semaphores:  s1 = ___     s2 = ___

P_A:            P_B:            P_C:
  ________        ________        ________
  print("A")      print("B")      print("C")
  ________        ________        ________
```
- "Some blanks stay empty. Use as few semaphores as possible."
- **Answer (shown in grey on the slide):**
```text
s1 = 0     s2 = 0

P_A:            P_B:            P_C:
                  wait(s1)        wait(s2)
  print("A")      print("B")      print("C")
  post(s1)        post(s2)
```
- **The idea:** one semaphore per "must come before" link, all starting at 0. A gives B a signal through s1, and B gives C a signal through s2. That is 2 semaphores for 2 links. ✅ My simulator finds that only "ABC" is possible.

### [S09-p10] From a Drawing to a Program
- **Diagram (a diamond):** **A** is at the top (yellow) with arrows to **B** (left) and **C** (right). Both B and C have arrows down to **D**. Caption: "An arrow X → Y means: **X must be printed before Y**."
- Four processes print one letter each: PA prints A, PB prints B, PC prints C and PD prints D.
  - **(a)** How many semaphores? What start values?
  - **(b)** Write the four processes.
  - **(c)** List every output that is possible.
- ⭐ **Hint:** "A process with two arrows coming **in** waits twice."
- **(a), on the slide:** one semaphore per arrow, all starting at **0**: `sAB`, `sAC`, `sBD` and `sCD`.
- **(b), on the slide:**
```text
Process PA:        Process PB:        Process PC:        Process PD:
  print("A")         wait(sAB)          wait(sAC)          wait(sBD)
  post(sAB)          print("B")         print("C")         wait(sCD)
  post(sAC)          post(sBD)          post(sCD)          print("D")
```
- **(c) is not answered on the slide.** My answer, from the arrow rule: A must come first and D must come last, while B and C have no arrow between them, so they can come in either order. That gives **A B C D** and **A C B D**. ✅ My simulator finds exactly these two.

### [S09-p11] In C: Four Calls
- **Prototypes (exact):**
```c
#include <semaphore.h>
int sem_init   (sem_t *s, int pshared, unsigned int value);  /* once, before fork                  */
int sem_wait   (sem_t *s);        /* P: take one, or sleep until you can   */
int sem_post   (sem_t *s);        /* V: give one back, wake one sleeper    */
int sem_destroy(sem_t *s);        /* at the end                            */
```
- **"Two new words":**
  - **`sem_t`**: "the semaphore type". You never look inside it; you only pass its **address** to the four calls.
  - **`pshared`**: "shared between processes?" **1 = yes** (always, in this course). Books often write 0, which means **threads only**.
- **"WHERE THE SEMAPHORE LIVES":**
```c
struct shared {
    sem_t lock;      /* the "hole" ...          */
    long  counter;   /* ... and number of flags */
};
struct shared *s = shared_alloc(sizeof(struct shared));
sem_init(&s->lock, 1, 1);
```
- ⭐ The semaphore sits **in shared memory, next to the data it guards**, so both processes use the same one.
- ⭐ **"Run it on Linux":** macOS does not implement `sem_init` (it fails). Use your Ubuntu machine or a VM, and compile with `-pthread`.
- ⭐ Banner: **"Four calls: init once, wait before, post after, destroy at the end."**
- ⚠️ The comment on `long counter;` says "... and number of flags", which is **misleading**. The number of flags is the semaphore's own value, hidden inside `sem_t`. `counter` is the *protected data*. The next page corrects the comment to "... and what it protects".
- Note: the image shows `&s→lock` because the font draws `->` as an arrow. Type `->`.

### [S09-p12] The Counter, With a Semaphore
- **Code (exact):**
```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <semaphore.h>
#include "shared_mem.h"
#define N 1000000
struct shared {
    sem_t lock;  /* the padlock ...            */
    long  counter; /* ... and what it protects   */
};
int main(void) {
    struct shared *s = shared_alloc(sizeof(struct shared));
    s->counter = 0;
    sem_init(&s->lock, 1, 1); /* 1: shared by processes, 1: open */
    pid_t pid = fork();
    for (int i = 0; i < N; i++) {
        sem_wait(&s->lock); /* take the key, or sleep         */
        s->counter++;   /* critical section               */
        sem_post(&s->lock); /* give the key back              */
    }
    if (pid == 0) exit(0);
    wait(NULL);
    printf("expected %d, got %ld\n", 2 * N, s->counter);
    sem_destroy(&s->lock);
    return 0;
}
```
- **Compile command (orange box):** `gcc -o sem sem.c -pthread`
- ⭐ The big yellow arrow says you need the **`-pthread`** flag because **POSIX semaphores are part of the POSIX Threads library (libpthread)**.
- **What changed compared with counter_race2.c (S08-p12):**
  1. A `struct shared` puts the padlock (`sem_t lock`) **next to** the `counter`, and both are in shared memory from one `shared_alloc`.
  2. `sem_init(&s->lock, 1, 1)` runs **before `fork()`**. The first 1 means shared by processes; the second 1 means the start value, "open", which makes it a binary semaphore.
  3. The critical section `s->counter++` is wrapped in `sem_wait` (take the key, or sleep) and `sem_post` (give the key back).
  4. After `wait(NULL)` the parent prints and then calls `sem_destroy` ("destroy at the end").
- **Expected result:** the slide shows no run output. By the mutex argument on S08-p17, it should print exactly **expected 2000000, got 2000000**.
- ⚠️ **Hidden trap:** the code never checks what `sem_init` returns.
  - ✅ On my Mac it compiled with deprecation warnings and **ran without any error**, but printed **wrong** counts (about 1.6 million).
  - The cause is that `sem_init` failed, so `sem_wait`/`sem_post` locked nothing. See §5.8.
  - This is the "Run it on Linux" warning from S09-p11 in action.

### [S09-p13] The Counter, With a Semaphore (ping-pong hint)
- The same code as p12, except that the `sem_init(&s->lock, 1, 1);` line has no comment. A table-tennis picture is at the top right.
- **Two boxed overlays:**
```c
struct shared { sem_t ping; sem_t pong; };     /* red box */

sem_init(&s->ping, 1, 1);                      /* orange box */
sem_init(&s->pong, 1, 0);
```
- **Meaning:** this is the solution sketch for **"Take turns"** (S09-p3 #3). It uses **two** semaphores:
  - `ping` starts at **1**, so the ping process may go first;
  - `pong` starts at **0**, so the pong process must wait for a signal.
- **Completing the hint.** The loop below is **not on the slide**; I built it from the slide's wait/post rules and the start values above:
```text
ping process:                 pong process:
while (true) {                while (true) {
    wait(ping)                    wait(pong)
    print("ping")                 print("pong")
    post(pong)                    post(ping)
}                             }
```
  - ✅ My simulator always gives ping, pong, ping, pong…, never two pings in a row.
- ⚠️ The overlay changes the struct, but the code underneath still uses `s->lock` and `s->counter`, which would no longer exist. As printed it is not one complete program. Read the boxes as a hint.

### [S09-p14] Questions?
- Closing slide with a photo of a glass building. It has no content.

---

## 3. Definitions & key terms

| Term | As taught | Ref |
|---|---|---|
| **Byte stream** | A pipe is a byte stream: bytes in order and nothing else. It remembers the bytes, not the separate `write` calls. | S08-p3 |
| **Atomic write** | "a write that arrives in one piece, never mixed with another writer's bytes." A pipe promises it only up to PIPE_BUF. | S08-p3 |
| **PIPE_BUF** | The largest pipe write that is still atomic: **4096 bytes** on Linux (depends on the OS). Bigger writes from two processes can interleave. | S08-p3 |
| **Message queue** | "a list of messages kept inside the kernel, with a name, that processes put messages into and take messages out of." | S08-p4 |
| **Message** | "one block of bytes sent by one call; it is always received whole, by one call." | S08-p4 |
| **Priority** | "a number the sender attaches; bigger = more urgent; the queue hands out the highest first." Equal priorities come out first in, first out. | S08-p4, p7 |
| **POSIX** | Portable Operating System Interface (the X is for Unix), IEEE 1003.1. "The contract that makes a Unix program portable." | S08-p5 |
| **Standard** | A written promise of which system calls exist, their names and arguments, and how they behave. "A promise, not a guarantee." | S08-p5 |
| **System V** | "the AT&T Unix of 1983". Its message queues use an **integer key** instead of a /name, and the **receiver** picks the order (by type). | S08-p8 |
| **Persistence** | The data survives when everybody exits: yes for POSIX and System V queues, only the name for a FIFO, no for a pipe. "The queue and its messages survive until removed." | S08-p2, p6, p8 |
| **Shared memory** | "a region of memory that several processes can read and write directly, as if it were their own." The kernel maps the same physical RAM into both address spaces. | S08-p9 |
| **Address space ("the wall")** | Each process has its own, so a pointer from one means nothing in the other. | S08-p9 |
| **`shared_alloc`** | The course's one-call shared memory, from `shared_mem.h`. Call it **before `fork()`**. | S08-p10 |
| **Lost update** | Two processes increment the same shared counter and one increment overwrites the other's, so the total is too small (expected 2 000 000, got about 1 000 000). | S08-p2, p12, p13 |
| **Nondeterministic** | The result differs from run to run, with no crash and no error message. | S08-p12 |
| **Interleaving** | The order in which the scheduler mixes the steps of two processes, as in "one unlucky interleaving". | S08-p13 |
| **Race condition** | "an undesirable situation that occurs when a system's behavior depends on the sequence or timing of uncontrollable events, such as the execution order of multiple threads or processes." | S08-p14 |
| **Race window** | The tiny gap between a security check and its execution, which attackers exploit. | S08-p14 |
| **Critical section** | "the lines of code that touch the shared data". Only one process may be inside at a time. | S08-p16 |
| **Mutual exclusion** | "the guarantee that while one process is inside its critical section, no other process can be inside it." | S08-p15 |
| **Mutex** | Short for **mut**ual **ex**clusion lock. It has two operations, `lock`/`unlock` (also called acquire/release), and two states, **free** or **taken**. | S08-p17, S09-p3, p4 |
| **Atomic** | "indivisible: it happens completely or not at all, and nobody sees it half-done." | S08-p17 |
| **Test-and-take** | Checking and taking in **one indivisible step**. `lock` does this; a home-made flag cannot. | S08-p16, p17 |
| **Sleep (state S)** | A waiting process sleeps instead of spinning in a loop. It costs no CPU, and the OS wakes it. | S08-p16, S09-p5 |
| **Semaphore** | "A counter that processes can decrease and increase atomically, and that makes a process sleep when there is nothing left to take." Formally, "an integer that is never negative, with exactly two (atomic) operations." It is **Dijkstra's tool**. | S09-p4, S08-p2 |
| **wait (P)** | If S > 0, then S = S − 1. Otherwise sleep until S > 0, then S = S − 1. "Take one, or sleep until you can." | S09-p4, p11 |
| **post (V, signal)** | S = S + 1, and if someone sleeps on S, wake ONE of them. "Give one back, wake one sleeper." | S09-p4, p11 |
| **Binary semaphore** | Starts at 1 and is used as wait … post by the same process. Its value is only ever 0 or 1, so it **is a mutex**. | S09-p7 |
| **"inside" / "sleeping"** | Trace-table columns. *inside* means the process has passed `wait` and not yet posted. *sleeping* means it is waiting beside the empty hole. | S09-p5 |
| **`sem_t`** | "the semaphore type". You never look inside it; you only pass its address. | S09-p11 |
| **`pshared`** | "shared between processes?" **1 = yes** (always, in this course); 0 means threads only. | S09-p11 |
| **`-pthread` / libpthread** | The compile flag you need because POSIX semaphores are part of the POSIX Threads library. | S09-p12 |
| **Lock / limit / signal** | The three ways to use a semaphore, with start values 1, N and 0. | S08-p2, S09-p2 |

---

## 4. API & rules tables as taught

### 4.1 POSIX vs System V message queues
| Aspect | POSIX message queue | System V message queue | Ref |
|---|---|---|---|
| Origin | the POSIX standard (IEEE 1003.1); queues added in **1993** | the AT&T Unix of **1983**, with queues "long before POSIX"; Linux still ships them and old software still uses them | S08-p5, p8 |
| How processes find it | a **name** starting with `/` (e.g. `"/soc3010"`): "anyone with the /name" | an **integer key** that programs agree on: "anyone with the key" | S08-p6, p8 |
| What travels | whole messages | whole messages | S08-p8 |
| Who decides the order | the **sender** (priority: highest first, ties in send order) | the **receiver** (type) | S08-p7, p8 |
| Works with `\|`, `cat`, `echo >`? | no | no | S08-p8 |
| Data survives when everybody exits? | **yes**, until removed | **yes** ("persistence of System V objects") | S08-p2, p6, p8 |
| End-of-data signal | none (no EOF) | none (no EOF) | S08-p8 |
| Size | fixed at creation (how many messages, how big) | not stated | S08-p6 |
| Calls on the slides | `mq_open`, `mq_send`, `mq_receive`, `mq_close`, `mq_unlink` | none shown 🔎 | S08-p6 |
| Course weight | "TODAY". Know *what*, *that* and *when*; no coding | "one slide, for comparison" | S08-p2, p6 |

For comparison, a pipe is limited to parent + children, carries bytes, keeps them in FIFO order, works with `|`, `cat` and `echo >`, does not survive, and ends with EOF. A FIFO is the same, except that anyone with the path can use it and only its name survives. [S08-p8]

### 4.2 Message-queue calls as shown (no coding required)
| Call | Job | pipe/FIFO equivalent | Arguments shown | Returns (as shown) | Rule |
|---|---|---|---|---|---|
| `mq_open("/soc3010", …)` | create / open | `mkfifo` + `open` | the name; everything else elided as "…" | not shown | the name starts with `/`; the size is fixed at creation |
| `mq_send` | send | `write` | not shown, beyond "+ a priority number" | not shown | the **sender** attaches the priority |
| `mq_receive` | receive | `read` | not shown | one **whole** message (the demo prints its text, priority and byte count) | highest priority first; ties go to whichever was sent first |
| `mq_close` / `mq_unlink` | close / remove | `close` / `unlink` | not shown | not shown | the queue **and its messages** survive until removed |

🔎 Look up in Track B: the exact signatures and return values of the `mq_*` calls.

### 4.3 Shared-memory calls (class header + slide code)
| Call | Arguments | Returns | Rule / notes | Ref |
|---|---|---|---|---|
| `shared_alloc(size)` | `size_t size`: how many bytes, e.g. `sizeof(long)` or `sizeof(struct shared)` | a `void *` to the shared bytes. On failure it prints `mmap: …` and **exits the program** (`EXIT_FAILURE`), so it never returns a bad pointer | ⭐ **call it BEFORE `fork()`** | S08-p10, shared_mem.h |
| `mmap(NULL, size, PROT_READ \| PROT_WRITE, MAP_SHARED \| MAP_ANONYMOUS, -1, 0)` | exactly as in the header | a pointer, or `MAP_FAILED` on error | after `mmap`, "the kernel steps out" 🔎 (argument meanings) | shared_mem.h, S08-p11 |
| `fork()` | none | `pid_t pid`; the slide code treats `pid == 0` as the child | parent and child both run the loop that follows | S08-p12 |
| `wait(NULL)` | `NULL` | not used | "parent: wait for the child" | S08-p12 |
| `exit(0)` | `0` | none | "child: done" | S08-p12 |

### 4.4 Semaphore calls in C
| Call | Arguments | Returns | When / meaning | Ref |
|---|---|---|---|---|
| `int sem_init(sem_t *s, int pshared, unsigned int value)` | `s` is the address of a `sem_t` **in shared memory** (`&s->lock`). `pshared` = **1** for shared between processes (0 means threads only). `value` is the **start value**: 1 for open (a mutex), 0 for a signal, N for a limit | an `int`, whose meaning the slides do not explain. On macOS it returned **−1** ("Function not implemented") ✅ | **once, before fork** | S09-p11, p12 |
| `int sem_wait(sem_t *s)` | the semaphore's address | `int` | **P**: "take one, or sleep until you can". Goes **before** the critical section | S09-p11 |
| `int sem_post(sem_t *s)` | the semaphore's address | `int` | **V**: "give one back, wake one sleeper". Goes **after** the critical section | S09-p11 |
| `int sem_destroy(sem_t *s)` | the semaphore's address | `int` | **at the end**. In the slide it comes after `wait(NULL)` and `printf` | S09-p11, p12 |

- Header: `#include <semaphore.h>`. Build with **`gcc -o sem sem.c -pthread`**, because POSIX semaphores live in libpthread. Run it **on Linux**, because macOS's `sem_init` fails. [S09-p11, p12]
- ⭐ "Four calls: init once, wait before, post after, destroy at the end." [S09-p11]
- 🔎 Look up in Track B: what the `int` return values of the `sem_*` calls mean, and how to check them.

### 4.5 Semaphore semantics (the "flags in the hole" model)
| Operation | Synonyms | When value > 0 | When value = 0 | Sleepers |
|---|---|---|---|---|
| `wait(S)` | **P**; for a mutex, `lock` / acquire | S = S − 1, then go **inside** | **sleep** until S > 0, then S = S − 1 | it joins the sleepers (costs no CPU, state S) |
| `post(S)` | **V**, **signal**; for a mutex, `unlock` / release | S = S + 1 | S = S + 1 | if someone sleeps on S, wake **ONE** of them. The flag goes straight to the sleeper, so S "stays" the same in the trace table |

⭐ **Rules** [S09-p4, p5]:
- S is never negative.
- Set the start value **once**.
- After that, use only `wait` and `post`.
- **Never read the value to decide something.**
- A sleeper costs no CPU.

### 4.6 Start value → behaviour
| Start value | Use | Who calls wait / post | Examples on the slides | Ref |
|---|---|---|---|---|
| **1** | **lock** (binary semaphore = mutex) | the **same** process does `wait … post` around its critical section | the counter: `sem_init(&s->lock, 1, 1)`; the P1/P2 A-B / C-D program | S09-p7, p12 |
| **N** (e.g. 3) | **limit**: at most N inside at once | the same process does `wait … post` | "At most 3 at a time" (database clients); the S = 3 drawing | S09-p3, p4 |
| **0** | **signal / order**: X must happen before Y | **different** processes: X posts *after* its work, Y waits *before* its work | A before B; force A, B, C; the diamond; `pong` starts at 0 in ping-pong | S09-p8, p9, p10, p13 |

**The same program with different start values** (P1: wait, A, B, post; P2: wait, C, D, post) [S09-p7]:
- **S = 1:** only `ABCD` and `CDAB`.
- **S = 2:** all six orders that keep A before B and C before D.
- **S = 0:** nothing is printed.

### 4.7 The mutex and what a correct lock must give
- `lock(m)`: if free, take it and go on; if taken, **SLEEP** until free. `unlock(m)`: free it and wake one sleeper. [S08-p17]
- The usage rule for every process that touches the shared data is **lock, touch, unlock**. [S08-p17]
- A correct locking mechanism must give four things: **1 · one at a time**, **2 · progress**, **3 · no one waits forever**, **4 · no wasted CPU** (sleep, don't spin). [S08-p16]
- A lock built from ordinary variables (the `busy` flag) fails 1 and 4. [S08-p16]
- A mutex cannot say "at most 3", "B only after A" or "take turns"; a semaphore can. [S09-p3]

### 4.8 Cleaning up IPC objects: what the slides actually show
| Object | Cleanup shown | What the slides say happens otherwise | Ref |
|---|---|---|---|
| pipe | `close` | the data does **not** survive when everybody exits | S08-p6, p8 |
| FIFO | `close` / `unlink` | "no (only the name)": the **name** stays | S08-p6, p8 |
| POSIX message queue | `mq_close` / `mq_unlink` | "the queue **and its messages** survive until removed"; messages wait in the kernel even after the sender exits | S08-p6, p8 |
| System V message queue | **not shown** 🔎 | data survives when everybody exits ("persistence of System V objects") | S08-p2, p8 |
| semaphore (`sem_t` in shared memory) | `sem_destroy(&s->lock)`, "destroy at the end" | not stated | S09-p11, p12 |
| shared memory from `shared_alloc` | **not shown** 🔎 | not stated | S08-p10 |

- ⚠️ The week's topic list promises "Cleaning up IPC objects" [S08-p2, S09-p2], but these slides contain **no shell commands** for listing or removing IPC objects.
- 🔎 Look up in Track B: how to list and remove leftover IPC objects from the shell (search terms: `ipcs`, `ipcrm`, `/dev/mqueue`) and how to release a mapped region (`munmap`).

### 4.9 Rules & warnings checklist (as taught)
- ⭐ Call `shared_alloc` **before** `fork()`. [S08-p10]
- ⭐ Call `sem_init` **once, before fork**, with `pshared = 1`. The `sem_t` lives **in shared memory next to the data**. [S09-p11]
- ⭐ Every process that touches shared data must **lock, touch, unlock**. [S08-p17]
- ⭐ After init, use only `wait`/`post`, and never read the value to decide. [S09-p5]
- Compile semaphore code with **`-pthread`**. [S09-p12]
- Run semaphore code on **Linux** (Ubuntu or a VM), because macOS does not implement `sem_init`. [S09-p11]
- A pipe write is atomic only up to **PIPE_BUF** (4096 bytes on Linux). [S08-p3]
- Message queues: know them, but **no coding** in this course. [S08-p6]
- Windows is not POSIX, so use Linux, a Mac or WSL. [S08-p5]

---

## 5. Worked examples

### 5.1 The lost update, step by step (S08-p13, with the hidden row restored)
**Setup.** The counter starts at **41**. Parent and child each run `(*counter)++` once, which is really LOAD → ADD → STORE. I added register columns to show what each process holds privately.

| step | parent | child | parent's register | child's register | counter in memory |
|---|---|---|---|---|---|
| 1 | LOAD 41 | | 41 | – | 41 |
| 2 | | LOAD 41 *(the row hidden under the banner)* | 41 | 41 | 41 |
| 3 | ADD → 42 | ADD → 42 | 42 | 42 | 41 |
| 4 | STORE 42 | | 42 | 42 | **42** |
| 5 | | STORE 42 | 42 | 42 | **42 — not 43** |

- **Why it is wrong.** Both processes LOADed 41 before either one STOREd, so each computed 42 in its own register. The second STORE writes 42 over 42. Two increments ran, but memory went up by only **one**, so one update is **lost**.
- **The general pattern (from this table).** If one process's LOAD…STORE window overlaps the other's, one of the two updates is lost.
- Repeat this a million times on a multi-core machine and you get the S08-p12 result: "about half of the additions disappeared".
- ⭐ "Read, add, write back — and someone else can squeeze in between."

### 5.2 Why the home-made flag fails (S08-p16)
This interleaving follows the slide's own sentence: "Both processes can see 0, both set 1, both go in." The flag `*busy` starts at 0.

| step | P1 | P2 | `*busy` | inside the critical section |
|---|---|---|---|---|
| 1 | `while (*busy == 1) ;` reads 0, so it stops waiting | | 0 | — |
| 2 | | `while (*busy == 1) ;` reads 0, so it stops waiting | 0 | — |
| 3 | `*busy = 1;` | | 1 | P1 |
| 4 | | `*busy = 1;` | 1 | **P1 and P2 ✗** |
| 5 | `(*counter)++` | `(*counter)++` | 1 | both are inside, so the lost update from 5.1 is back |

- **Failure 1 (property 1, one at a time).** The check and the set are two separate steps, so they can be split exactly like LOAD and STORE.
- **Failure 2 (property 4, no wasted CPU).** While `*busy == 1`, the waiting process runs the empty `while` loop over and over, which "burns CPU while waiting" instead of sleeping.
- **The fix the slides give:** a lock that tests-and-takes in one indivisible step and can put a process to sleep. The OS, with the CPU's help, provides it. [S08-p16, p17]

### 5.3 The mutex fixes it (S08-p17, annotated)
| step | parent | child | counter | what happened |
|---|---|---|---|---|
| 1 | lock ✓ | | 41 | the lock was free, so the parent takes it |
| 2 | LOAD 41 | lock → **sleeps** | 41 | the lock is taken, so the child SLEEPs and uses no CPU |
| 3 | *(ADD → 42, not shown on the slide)* | (sleeping) | 41 | |
| 4 | STORE 42 | (sleeping) | 42 | |
| 5 | unlock | **wakes**, lock ✓ | 42 | `unlock` frees the lock and wakes one sleeper |
| 6 | | LOAD 42, *(ADD → 43)*, STORE 43 | **43 ✓** | the child can only LOAD **after** the parent's STORE |

**Side by side: the race version and the semaphore version.**

| | counter_race2.c [S08-p12] | sem.c [S09-p12] |
|---|---|---|
| shared data | `long *counter = shared_alloc(sizeof(long));` | `struct shared { sem_t lock; long counter; };` and `s = shared_alloc(sizeof(struct shared));` |
| before `fork()` | `*counter = 0;` | `s->counter = 0;` and `sem_init(&s->lock, 1, 1);` |
| loop body (×N, in both processes) | `(*counter)++;` | `sem_wait(&s->lock); s->counter++; sem_post(&s->lock);` |
| end | `wait(NULL); printf(...)` | `wait(NULL); printf(...); sem_destroy(&s->lock);` |
| compile | as usual | `gcc -o sem sem.c -pthread` |
| result | about 1 000 000 instead of 2 000 000, different every run | exactly 2 000 000 on Linux, by the slides' argument. The slide shows no output, and I could not test Linux here (see 5.8) |

### 5.4 Two extras on S08-p18 (answers not on the slide; derived from the lock rules and ✅ simulated)
**(a) The red strike-through: P2 forgets `unlock(L)`.**
- **If P1 runs first:** P1 locks, prints A and B, and unlocks. P2 then locks, prints C and D, and keeps the lock. The output is **ABCD**, which is harmless here because nobody needs the lock afterwards.
- **If P2 runs first:** P2 locks and prints C and D, but never unlocks. P1's `lock(L)` finds the lock taken, so P1 sleeps until it is free, which is **forever**. The output is just **CD**, and P1 never finishes.
- So **CDAB is no longer possible**. This breaks property 3, "no one waits forever" [S08-p16].

**(b) "What if we have two locks?"** P1 takes L1 then L2; P2 takes L2 then L1.
- **Lucky schedules:** one process does everything first, and the output is "P1 done, P2 done" or "P2 done, P1 done".
- **Unlucky schedule:**

| step | P1 | P2 | L1 | L2 |
|---|---|---|---|---|
| 1 | `lock(L1)` ✓ | | taken (P1) | free |
| 2 | | `lock(L2)` ✓ | taken (P1) | taken (P2) |
| 3 | `lock(L2)` finds it taken, so **sleeps** | | taken (P1) | taken (P2) |
| 4 | | `lock(L1)` finds it taken, so **sleeps** | taken (P1) | taken (P2) |

- Each process sleeps until a lock is freed, but the only process that could free it is the other one, and that one is also asleep. **Nothing is printed, and both sleep forever.**
- 🔎 Look up in Track B: the name and theory of this situation (deadlock). It is not named on these slides.

### 5.5 Homework answers (S08-p19, mine; ✅ checked by simulation)
**1. Three processes with the same lock L.**
- Each process prints its two letters while it holds L, so **AB, CD and EF stay together as blocks**. Only the order of the three blocks can change.
- That gives 3 × 2 × 1 = **6 outputs**: ABCDEF, ABEFCD, CDABEF, CDEFAB, EFABCD, EFCDAB.

**2. Can the output be ACBD, when P1 uses L1 and P2 uses L2?**
- **Yes.** The locks are different, so P1 holding L1 never stops P2 from taking L2. The two processes act as if there were no lock between them.
- One schedule: P1 `lock(L1)`, prints **A**; P2 `lock(L2)`, prints **C**; P1 prints **B**; P2 prints **D**.
- In fact all 6 orders that keep A before B and C before D are possible: ABCD, ACBD, ACDB, CABD, CADB, CDAB.
- **The lesson:** a lock only keeps out processes that use **the same** lock. That is why the slide's rule is "every process that touches the counter follows the same rule" [S08-p17].

### 5.6 Message-queue exercise, step by step (S08-p7)
| event | still waiting in the queue afterwards (priority) | B receives |
|---|---|---|
| A sends 4 messages | backup done (0), login failed (3), out of memory (7), login failed again (3) | — |
| B: receive #1 | backup done (0), login failed (3), login failed again (3) | **out of memory (7)**, the highest |
| B: receive #2 | backup done (0), login failed again (3) | **login failed (3)**: tie at 3, and it was sent first |
| A sends "disk dead" (7) | backup done (0), login failed again (3), disk dead (7) | — |
| B: receive #3 | backup done (0), login failed again (3) | **disk dead (7)**: the newest, but the most urgent |
| B: receive #4 | backup done (0) | **login failed again (3)** |
| B: receive #5 | (empty) | **backup done (0)** |

- The final order matches the slide: out of memory, login failed, disk dead, login failed again, backup done.
- The S08-p6 demo works the same way. Sent: hello (1), disk almost full (5), server on fire (9), CPU too hot (5). Received: 9, then the two 5s in send order, then 1.

### 5.7 Semaphore traces
**S09-p5, explained.**
- S starts at 1. P's wait takes the only flag, so S = 0 and P is inside. Q's and R's waits find the hole empty, so both sleep.
- P's post hands its flag straight to a sleeper (Q), so S stays 0. Q's post hands the flag to R, and S stays 0. R's post finds no sleeper, so S returns to **1**.
- At most one process was ever inside, because a semaphore that starts at 1 is a mutex.

**S09-p6 homework, solved.** S starts at 2. ✅ My simulator used the slide's rules, including handing the flag straight to a sleeper.

| # | operation | S | sleeping | inside |
|---|---|---|---|---|
| 0 | (start) | 2 | — | — |
| 1 | P1: wait(S) | 1 | — | P1 |
| 2 | P2: wait(S) | 0 | — | P1, P2 |
| 3 | P3: wait(S) | 0 | P3 | P1, P2 |
| 4 | P1: post(S) | 0 (flag went to P3) | — | P2, P3 |
| 5 | P4: wait(S) | 0 | P4 | P2, P3 |
| 6 | P2: post(S) | 0 (flag went to P4) | — | P3, P4 |
| 7 | P3: post(S) | 1 | — | P4 |
| 8 | P4: post(S) | 2 | — | — |

- **Checks.** There are never more than 2 processes inside, since a start of 2 is "a limit of 2". The final value equals the start value because every wait was matched by a post. The value never went below 0.

**S09-p7 with S = 2: one schedule that prints A C D B.**
1. P1 `wait` (S = 1) and P2 `wait` (S = 0). **Both are now inside.**
2. P1 prints **A**.
3. P2 prints **C** and **D**, then posts.
4. P1 prints **B**, then posts.
- With two flags, the "lock" lets both processes in at once.

### 5.8 What I verified by running the code (✅ = actually run on this Mac: Apple clang 21, arm64, macOS 27)
**`counter_race2.c` [S08-p12]**
- **Copied exactly as printed,** it fails to compile because of the curly quote in `#include "shared_mem.h“`. The error is "missing terminating '"' character".
- **With a straight quote,** it compiles and runs. The six runs printed:
  1. expected 2000000, got **2000000**
  2. got 1415206
  3. got 1056449
  4. got 1046118
  5. got 1055427
  6. got 1047318
- In 20 more runs every result fell between **1 041 752 and 1 092 522**.
- So the slide's "about half disappeared" and "nondeterministic" are confirmed. Even the lucky correct run on the first try shows why race conditions are "intermittent and difficult to reproduce" [S08-p14].
- **The same code with N = 10** printed `expected 20, got 20` six times out of six. With a tiny test, the bug never showed up. That matches the slide's warning that a program can pass its tests and fail randomly under load [S08-p14].

**`sem.c` [S09-p12]**
- The slide's exact command, `gcc -o sem sem.c -pthread`, compiled it with 2 warnings: "'sem_init' is deprecated" and "'sem_destroy' is deprecated".
- Three runs printed `expected 2000000, got 1603513`, then `1613745`, then `1617422`. These are **wrong**, and there was **no error message**.
- A small check program printed what each call returns on macOS:
  - `sem_init` → **−1**, "Function not implemented";
  - `sem_wait` → −1 and `sem_post` → −1, both returning immediately ("Bad file descriptor"), so they lock nothing;
  - `sem_destroy` → −1.
- This confirms the slide's warning on S09-p11, and shows the danger is **silent**.
- ❌ **Not verified:** the correct "got 2000000" on Linux. This Mac has no Linux VM or Docker, and the slide shows no output for this program either.

**Message queues [S08-p6]**
- There is no source code on the slides, and `<mqueue.h>` does not exist on this Mac (`fatal error: 'mqueue.h' file not found`). Not run.

**Paper exercises ✅ (re-checked with a brute-force simulator using the slides' wait/post and LOAD/ADD/STORE rules).** Every one matched:
- S08-p7 (queue order)
- S08-p18 (only ABCD and CDAB)
- S09-p5 (trace)
- S09-p7 (S = 1 gives 2 outputs, S = 2 gives 6, S = 0 gives none)
- S09-p8 (only AB)
- S09-p9 (only ABC)
- S09-p10 (ABCD and ACBD)
- ping-pong always alternates

### 5.9 Practice questions (new, built only on the slides' rules), with answers
**Practice 1: trace this interleaving.**
The shared counter starts at **5**. Parent and child each run `(*counter)++` **once**, which is LOAD, ADD, STORE. The scheduler runs the six steps in this order: parent LOAD → child LOAD → child ADD → child STORE → parent ADD → parent STORE.
- (a) Fill in a table like S08-p13 (parent | child | in memory).
- (b) What is the final value?
- (c) Whose update was lost?
- (d) Give an order of the six steps that produces the correct result.
- (e) What changes if both processes wrap the increment in `lock`/`unlock`?

> **Answer.**
>
> (a)
>
> | parent | child | in memory |
> |---|---|---|
> | LOAD 5 | | 5 |
> | | LOAD 5 | 5 |
> | | ADD → 6 | 5 |
> | | STORE 6 | 6 |
> | ADD → 6 | | 6 |
> | STORE 6 | | **6 — not 7** |
>
> (b) **6**.
>
> (c) The **child's** update was lost. The parent loaded 5 *before* the child stored, so its register held a stale value. Its late STORE writes 6 over the child's 6, and the net effect is one increment instead of two.
>
> (d) Any order in which one process STOREs before the other LOADs works. For example, parent LOAD 5, ADD → 6, STORE 6, then child LOAD 6, ADD → 7, STORE 7, giving **7**.
>
> (e) The second process's `lock` would sleep until the first one unlocks, so it can only LOAD **after** the other's STORE. The result is always **7** [S08-p17].

**Practice 2: what is the final counter value range?**
Take counter_race2.c with `#define N 2`, so each process does `(*counter)++` **twice**. The counter starts at 0 and there is **no lock**. Each `++` is LOAD/ADD/STORE, and the scheduler may switch between any two steps.
- (a) What is the largest possible final value?
- (b) What is the smallest? Show a schedule.
- (c) List every possible final value.
- (d) What does this mean for the slide's N = 1 000 000?

> **Answer.**
>
> (a) **4**, when the LOAD…STORE windows never overlap (e.g. the parent does both increments, then the child does both).
>
> (b) **2**:
>
> | # | parent | child | memory |
> |---|---|---|---|
> | 1 | LOAD 0 | | 0 |
> | 2 | | LOAD 0, ADD → 1, STORE 1 *(child's 1st ++ done)* | 1 |
> | 3 | ADD → 1, STORE 1 *(parent's 1st ++ done, using the stale 0)* | | 1 |
> | 4 | | LOAD 1 *(child's 2nd ++ starts)* | 1 |
> | 5 | LOAD 1, ADD → 2, STORE 2 *(parent's 2nd ++ done)* | | 2 |
> | 6 | | ADD → 2, STORE 2 *(using the stale 1)* | **2** |
>
> Four increments ran, and the counter ended at 2.
>
> (c) **{2, 3, 4}**. ✅ I enumerated all 924 possible interleavings of the 12 steps, and only 2, 3 and 4 occur. For comparison, N = 1 gives {1, 2} and N = 3 gives {2, 3, 4, 5, 6}.
>
> (d) The 2 000 000 is the **maximum, not a promise**. The same trick from (b) works for any N ≥ 2: one process loads 0, the other does N−1 increments, the first stores 1, the other loads 1, the first finishes its N−1, and the other stores 2. So in principle any value from 2 up to 2 000 000 can be printed. Real machines print something in between: the slide got about 1.03–1.07 million, and my Mac got 1.04–1.42 million and once 2 000 000 (see 5.8).

**Practice 3: the start value decides the result.**
Take sem.c (S09-p12) with `#define N 2`, but change the init line to `sem_init(&s->lock, 1, X);`.
- (a) What are the possible final values, and what is printed, for X = 1?
- (b) For X = 2?
- (c) For X = 0?
- (d) A classmate runs the **unchanged** sem.c on a Mac and gets `expected 2000000, got 1603513`. Why, and what should they do?

> **Answer.**
>
> (a) Only **4**, so it prints `expected 4, got 4`. There is one flag, so whoever is inside finishes LOAD-ADD-STORE before the other can take the flag. That is a binary semaphore, i.e. a mutex [S09-p7].
>
> (b) **{2, 3, 4}**, the same as no lock at all. With two flags both processes can be inside at once, so updates can be lost again. This is the same reason S = 2 lets the letters interleave on S09-p7. ✅ simulated.
>
> (c) **Nothing is printed and the program never ends.** Both processes sleep in their first `sem_wait` and nobody ever posts, so the parent never reaches `wait(NULL)` or `printf`. This is the counter version of "S = 0 → none — nothing is printed" [S09-p7]. ✅ simulated.
>
> (d) macOS **does not implement `sem_init`; it fails** [S09-p11]. The program does not check the failure, so `sem_wait`/`sem_post` protect nothing and the lost update returns. Run it on **Linux** (an Ubuntu machine or VM), compiled with `-pthread`. ✅ Reproduced on this Mac (see 5.8).

---

## 6. Likely exam questions (built only from these slides)

1. **(Explain)** `counter_race2.c` prints `expected 2000000, got 1025956`. Explain why the counter is wrong, and why no error message appears.
2. **(Trace)** The shared counter is 41. The steps run in this order: parent LOAD, child LOAD, parent ADD, child ADD, parent STORE, child STORE. Give the value in memory after each step and the final value.
3. **(Define)** Define *race condition*, *critical section* and *mutual exclusion*. Which line of `counter_race2.c` is the critical section?
4. **(List)** Name the four things a correct locking mechanism must give, with one line each.
5. **(Explain)** Why does `while (*busy == 1) ; *busy = 1; (*counter)++; *busy = 0;` fail as a lock? Give **both** problems, and say what the OS offers instead.
6. **(MCQ)** P1 runs `lock(L); print("A"); print("B"); unlock(L)` and P2 runs `lock(L); print("C"); print("D"); unlock(L)`. Which output is possible? (a) A C B D (b) C A D B (c) C D A B (d) A C D B
7. **(Short + table)** (a) What start value makes a semaphore work as a mutex? What is such a semaphore called, and which values can it take? (b) The program in Q6 is rewritten with `wait(S)`/`post(S)`. List the possible outputs for S = 1, S = 2 and S = 0.
8. **(Write)** P1 prints A and P2 prints B. Using **one** semaphore, make sure B is always printed after A. Give the start value and the code. Why is `sleep(1)` before B not good enough?
9. **(Trace)** S starts at 1. The operations are X: wait, Y: wait, X: post, Z: wait, Y: post, Z: post. Fill in the S / sleeping / inside table.
10. **(MCQ)** In P/V notation, **P** corresponds to: (a) post (b) wait (c) sem_destroy (d) sem_init
11. **(Short)** After a semaphore is initialised, what are the only things you may do with it? Why may you not read its value to decide something?
12. **(Compare)** Give three differences and two similarities between POSIX and System V message queues.
13. **(MCQ)** Which of these keep their data after every process using them has exited? (a) pipe and FIFO (b) FIFO only (c) POSIX queue and System V queue (d) none of them
14. **(Order)** Process X sends "cache warm" (priority 1), "db slow" (4), "db down" (9) and "db slow again" (4). Process Y calls `mq_receive` once. X then sends "fire alarm" (9). Y receives until the queue is empty. In what order does Y get the messages?
15. **(Short)** Why must `shared_alloc` be called **before** `fork()`? How is this different from an ordinary variable after `fork`?
16. **(MCQ)** Which statement about shared memory is **FALSE**? (a) The data is not copied through a kernel buffer. (b) The kernel keeps message boundaries for you. (c) Two processes can change the same byte at the same time. (d) The reader sees whatever is there now, finished or half-written.
17. **(Code)** In `sem_init(&s->lock, 1, 1)`, what does each argument mean? Where must the `sem_t` live? Why do you compile with `-pthread`, and what happens if you run the program on macOS?
18. **(Design)** Which start value implements "at most 3 clients use the database at a time"? For "PING, PONG, PING, PONG… never two PINGs in a row", which semaphores and start values does the slide give?
19. **(Trace)** P1 does `lock(L1); lock(L2); print("P1 done"); unlock(L2); unlock(L1)` and P2 does `lock(L2); lock(L1); print("P2 done"); unlock(L1); unlock(L2)`. What can happen? Show the bad schedule.
20. **(Explain)** A writer calls `write(fd[1], "AB", 2)` three times, and the reader's `read(fd[0], buf, 100)` returns 6 bytes, "ABABAB". Why? What would you have to invent with a pipe, and what does a message queue give you instead?

### Answers
1. `(*counter)++` is really three steps: LOAD, ADD and STORE. The scheduler can stop a process between any two steps, and on a multi-core machine both processes run at once. When both LOAD the same value, one STORE overwrites the other, and that update is lost. Nothing crashes and no error is printed because every step is legal; the result is simply nondeterministic. About half of the updates disappeared on the slide's machine. [S08-p12, p13]
2. After each step the memory holds 41, 41, 41, 41, 42, 42. The final value is **42, not 43**: one update is lost. [S08-p13; §5.1]
3. A *race condition* is behaviour that depends on the uncontrollable order or timing of threads or processes. A *critical section* is the lines that touch the shared data. *Mutual exclusion* means that while one process is inside its critical section, no other can be. In `counter_race2.c` the critical section is `(*counter)++`. [S08-p14, p15, p16]
4. (1) **One at a time**: never two inside. (2) **Progress**: if nobody is inside, someone who wants in gets in. (3) **No one waits forever**: every waiter eventually gets a turn. (4) **No wasted CPU**: a waiter sleeps (state S) instead of spinning. [S08-p16]
5. Checking the flag and setting it are **two steps**, so both processes can see 0, both set 1, and both go in. That is the same race as the counter. The `while` loop also **burns CPU** while waiting. The OS, with the CPU's help, offers a lock that **tests-and-takes in one indivisible step** and can **put a process to sleep**. [S08-p16, p17; §5.2]
6. **(c) C D A B.** The lock keeps A–B and C–D together, so only ABCD and CDAB are possible. [S08-p18, S09-p7]
7. (a) The start value is **1**. Used as wait … post by the same process, it **is** a mutex, called a **binary semaphore**, and its value is only ever 0 or 1. (b) **S = 1:** only ABCD and CDAB. **S = 2:** all six orders that keep A before B and C before D ("all four", plus ACDB and CABD). **S = 0:** none, because nothing is printed. [S09-p7]
8. Start S at **0**. P1 runs `print("A"); post(S);` and P2 runs `wait(S); print("B");`. The only flag is created after A is printed, so B can never come first. `sleep(1)` only *guesses*: on a busy machine A may take 2 seconds, whereas a semaphore *knows*. [S09-p8]
9. The table:

   | # | op | S | sleeping | inside |
   |---|---|---|---|---|
   | 0 | start | 1 | — | — |
   | 1 | X: wait | 0 | — | X |
   | 2 | Y: wait | 0 | Y | X |
   | 3 | X: post | 0 (flag went to Y) | — | Y |
   | 4 | Z: wait | 0 | Z | Y |
   | 5 | Y: post | 0 (flag went to Z) | — | Z |
   | 6 | Z: post | 1 | — | — |

   [S09-p4, p5 rules]
10. **(b) wait.** The synonyms are wait/post = P/V = wait/signal. [S09-p4, p11]
11. Set the start value **once**; after that use only `wait` and `post`. The value can change the moment after you read it, so a decision based on it is already out of date. [S09-p5]
12. **Differences:** POSIX uses a `/name` while System V uses an integer key. In POSIX the sender decides the order (priority); in System V the receiver decides (type). POSIX dates from 1993, while System V is from 1983 ("long before POSIX"). **Similarities:** both carry whole messages; both keep their data after everybody exits; neither works with `|`, `cat` or `echo >`; neither has an EOF. [S08-p5, p8]
13. **(c).** The FIFO keeps only its name, and a pipe keeps nothing. [S08-p8, p6]
14. db down (9), **fire alarm (9)**, db slow (4), db slow again (4), cache warm (1). The rule is highest priority first and ties in send order, and a later urgent message still overtakes older, less urgent ones. [S08-p7]
15. The child **inherits** the memory that exists when `fork()` runs, so after that a change by one process is seen by the other. Ordinary variables are **copied** by `fork`, so changes stay private. "One call before fork, and two processes share the same bytes." [S08-p10]
16. **(b).** With shared memory the kernel steps out after `mmap`. There are no boundaries: it is a block of bytes and you decide the layout. [S08-p9, p11]
17. `&s->lock` is the address of the `sem_t`. The first `1` is **pshared**, meaning shared between processes (0 would mean threads only). The second `1` is the **start value**, "open", which makes it a binary semaphore or mutex. The `sem_t` must live **in shared memory next to the data it guards**, allocated with `shared_alloc` before `fork`. Compile with `-pthread` because POSIX semaphores are part of libpthread. macOS does not implement `sem_init`, so it fails; run on Linux. In my test it silently printed a wrong count. [S09-p11, p12; §5.8]
18. **Start at 3** (the "limit" use). Each client does wait … post, and the 4th client's wait finds no flags and sleeps until someone leaves. For ping-pong, use **two semaphores, `ping` = 1 and `pong` = 0**. The ping side does wait(ping), print, post(pong); the pong side does wait(pong), print, post(ping). The loop is completed from the slide's rules. [S09-p3, p4, p13]
19. Either "P1 done" is printed then "P2 done", or the reverse. **Or** the bad schedule happens: P1 takes L1, P2 takes L2, then P1 sleeps waiting for L2 and P2 sleeps waiting for L1. Neither can ever be woken, so nothing is printed and both sleep forever. [S08-p18 "Next: two locks"; §5.4]
20. A pipe is a **byte stream**: it keeps the bytes in order but not the boundaries between `write` calls, so one read gets all three writes glued together. With a pipe you would have to invent a **separator** ('\n') or a **length in front**, and you still have **no urgency**. A message queue gives one send = one whole receive, plus priorities ("the kernel counts the envelopes for you"). [S08-p3, p4]

---

## 7. Self-check

- [ ] I can explain why a pipe cannot tell where a message ends, and list what a message queue gives for free: boundaries, priorities, a name, and many senders to one receiver.
- [ ] I can predict the order in which `mq_receive` returns messages: highest priority first, ties in send order, and late urgent messages overtaking older ones.
- [ ] I can fill in the pipe / FIFO / POSIX / System V table from memory, especially *who decides the order* and *what survives when everybody exits*.
- [ ] I can explain what shared memory is, why it is fast (no copies), what the kernel no longer does for me, and **the one rule**: `shared_alloc` before `fork()`.
- [ ] I can draw the LOAD–ADD–STORE interleaving table that turns 41 into 42 instead of 43, and explain why `counter_race2.c` prints about half.
- [ ] I can define race condition, critical section, mutual exclusion and atomic, and list the four properties of a correct lock.
- [ ] I can explain why a busy-flag lock fails (two steps, and it burns CPU) and what a mutex does instead (test-and-take atomically, and sleep).
- [ ] I can trace any wait/post sequence in the four-column table (S, sleeping, inside), including a flag handed straight to a sleeper.
- [ ] I can choose the start value for a **lock (1)**, a **limit (N)** and a **signal/order (0)**, and write wait/post code for "A before B", "A, B, C", the diamond and ping-pong.
- [ ] I can explain every line of `sem.c`: `sem_init(&s->lock, 1, 1)` before fork, `sem_wait`/`sem_post` around `s->counter++`, `sem_destroy` at the end, why `-pthread` is needed, and why it must run on Linux.
