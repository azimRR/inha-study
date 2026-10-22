# Midterm review — Operating System (from class slides only)
> Track A note: 302 pages, weeks 1–7, plus Lab 1 and the term-project spec.

> SOC3010-003 · Inha University in Tashkent · Prof. Yusupov Jalolliddin · Fall 2026 · OSTEP. Built Mon 19 Oct 2026 from the eight Week 1–7 class-notes files, the syllabus, the HW1/HW2 handouts and the class code. **Class material only**: no web, no outside facts. 🔎 marks stay pointers to Track B.
> Refs: [S16-p10] = Slide 16, page 10 · [Lab1-p11] = Lab 1, page 11 · [TP-p4] = Term Project Details 1 · [HW2-p1] = HW2 handout. Marks: ⭐ professor emphasis · ⚠️ slide error or trap · 🔎 look up in Track B · ✅ checked by script (scripts listed in §8).

---

## 0. Exam facts

| | |
|---|---|
| **When** | **Week 8, 26–30 Oct 2026** [S02-p7]. Lectures are Mon/Wed, so most likely **Mon 26 or Wed 28 Oct** (syllabus note). Day, time, room and length are on **no slide**, so check eClass. ⚠️ The W4–W7 notes headers say "24–30 Oct"; the slide card says 26–30 (24–25 Oct is the HW2-deadline weekend). |
| **Weight** | **25 %**. Final 25 % (week 15, 21–25 Dec), term project 20 %, quizzes 10 %, homework 10 %, attendance 10 %. Grades are **relative** (A+ … F) [S01-p7, S02-p7]. |
| **Coverage (slide)** | ⭐ "**Covers processes, IPC, semaphores**" [S02-p7]. Week 7 Part 2 holds the ⭐ "**midterm workshop on process graphs, pipes and signals**" [S01-p15]. It had not happened by 19 Oct, and no workshop slides are in the kit. |
| **What the homework handouts promise** | HW1: "the midterm will ask for exactly these two skills": **process graphs and Gantt charts**, drawn **by hand** (typed ones scored zero) [HW1-p1]. HW2: "Typed descriptor tables, typed timing tables and typed trace tables score zero. **The midterm will ask for exactly these skills.**" [HW2-p1]. So scheduling (Week 2) is in scope, even though the S02-p7 card does not name it. |
| **Format** | Not on the slides (paper or computer, allowed materials, length): check eClass. Lab 1: "The midterm doesn't assume you did it" [Lab1-p1]. |

**Rules from the slides**
- **Attendance.** More than 25 % of hours absent without a valid reason gives an **F** [S01-p25]. Arriving more than 10 min late means attendance is not registered [S01-p5]. No phones in lectures [S01-p5].
- **Integrity.** Any act of dishonesty in a quiz, homework, exam, term paper or project gives **grade 0 for that part** [S01-p26]. The listed acts include "illegitimate use of materials in any form during a quiz or exam" and copying another student's answers. Code is similarity-checked, and renamed variables don't hide identical control flow [S01-p5].
- **AI disclosure.** AI is allowed for studying and as a coding assistant, but **every use must be disclosed** in the submission [S01-p8].
- **Oral checks.** Grades depend on what you can **explain and modify in person**: sampled oral checks on homework, and an individual oral defence at the project fair. ⭐ "Submitted work that the student cannot explain is graded as not done." Late work is not accepted [S01-p8].
- **Right now.** **HW2 is due Sat 24 Oct, 23:55 (UTC+5).** It is individual and worth 2.5 %, and Parts 2, 5 and 6 are handwritten [HW2-p1]. This review **does not solve HW2**: slide items that coincide with HW2 are kept hint-only in §2.

**"Run on Ubuntu, not macOS"** (from the notes' verified runs on a Mac)

| On macOS | What happens | Do instead |
|---|---|---|
| `sem_init` (unnamed POSIX semaphores) | It returns −1, "Function not implemented". The class programs don't check it, so they **run silently with no locking**: `sem.c` printed ≈ 1.6 M instead of 2 000 000, `stools` seated 5 customers on 3 stools, and `shelf` lost 54 368 plates [S09-p11; sem_shm.h] | Ubuntu VM or the course container. Compile with `-pthread` |
| `<mqueue.h>` | "file not found": no POSIX message queues | Ubuntu (MQ coding isn't required anyway [S08-p6]) |
| Signal numbers | On the Mac STOP = 17, TSTP = 18, CHLD = 20, USR1 = 30 | **In the exam use the slide's Linux numbers** [S03-p16]. In commands use names (`kill -TERM`) |
| Port 5000 | A system process (ControlCenter) owns it, so you get `bind: Address already in use`, even with `SO_REUSEADDR` | Ubuntu, or another port (the notes used 5050) |
| `hostname -I` | `illegal option -- I` | Ubuntu |
| Ctrl-\ | The shell prints `Quit: 3`, and no core file appears (`ulimit -c` is 0) | The wording may differ on Ubuntu |
| `printf` + fork/exec with output piped or redirected | Lines are duplicated or vanish (the buffer is copied by fork, or wiped by exec) | Run fork demos in a terminal; the paper model is the terminal. 🔎 Track B: stdio buffering |
| pipes, FIFOs, fork, exec, sockets | Same behaviour (verified on the Mac) | — |

---

## 1. ⭐ The professor's exam skills, with step-by-step recipes as taught

### 1(a) Predict fork/exec/wait output: the process-graph method [S16-p8, S03-p2, S03-p4, S03-p7]

**Notation** [S03-p4]:
- nodes = `printf` / `fork` / `wait` / `exit`;
- a **horizontal line** = one process's timeline;
- a **vertical arrow** = a `fork()`;
- a **dashed edge** = a `wait()`, which forces an order.

⭐ **Golden Rule:** "Every topological ordering of the graph is a legal output." ⭐ **Exam Skill:** "You must *list all* possible outputs, not just guess one."

**The Three Rules** [S03-p2]:
1. **Starting Line**: the child starts at the return of `fork()`, not at `main()`.
2. **Photocopy**: the child gets a separate copy of the memory (variables, fds, PC), so changes in one process don't affect the other.
3. **Dual Path**: code after `fork()` runs in both processes unless you branch on the return value. `fork()` returns `0` in the child, the child's PID in the parent, and −1 on error [S16-p7].

**Recipe**
1. **Read the braces, not the indentation.** An `if` without `{}` controls one statement only [S16-p11 ⚠️ trap].
2. **Walk each process** and name it (P, C1, C2…). At every fork, copy the current variable values into the child. A child born in loop iteration *i* continues from *i* + 1 [S03-p6].
3. **Draw** one horizontal line per process, with a vertical arrow at every fork. Label each print node with the exact text and the values *that* process holds.
4. **Count.**
   - processes = 1 + the number of forks executed; *n* forks that nothing branches on give **2ⁿ** processes [S16-p9, S03-p6];
   - lines = the sum over all processes.
5. **Write the constraints.**
   - Events on one line happen left to right.
   - A child's first node comes after its fork node.
   - After `wait(NULL)` or `waitpid(pid, …)`, the parent's next node comes after **that child's exit**.
   - ⭐ `wait` buys **one** ordering constraint, between you and **one** child, and **nothing between the children**. It returns **whoever finishes, not whoever was created**. To wait for a particular child, name it: `waitpid(kid[0], &st, 0)` [S03-p7].
6. **Enumerate.** Fix the forced prefix, then interleave the free chains. Identical texts collapse (4 × `hello` = 1 distinct output [S16-p9]). Count first, then list. Check with "what cannot happen", e.g. a line that must come last.
7. **exec** replaces code, data, heap and stack; it keeps the PID, PPID, open files and cwd. It **never returns on success**: the line after it is the failure path [S03-p10].
   - `execl`/`execlp`/`execle` take a list; `execv`/`execvp`/`execvpe` take an array; `p` = search PATH, otherwise give the exact path.
   - The list or array ends with `NULL`, and argument 2 is `argv[0]` [S03-p11, p12].
8. **Exit status and reaping.**
   - `WIFEXITED(s)` → `WEXITSTATUS(s)` (0–255, valid only if `WIFEXITED`); `WIFSIGNALED(s)` [S16-p15].
   - Exited but not reaped = **zombie** (`ps`: `Z`, `<defunct>`).
   - Parent died first = **orphan**, adopted and reaped by **PID 1** [S16-p13, S03-p8].

**Worked example [S16-p10]** (`L0`; `if (fork() != 0) { L1; if (fork() != 0) L2; }`; `Bye`). ✅ 3 processes, 6 lines, **5 outputs**:
```
P  (original) ●─L0─● fork1 ─L1─● fork2 ─L2─Bye─●
                     │              │
C1 (fork1 → 0)       └─Bye─●        │
C2 (fork2 → 0)                      └─Bye─●
1 L0 L1 Bye L2 Bye Bye   2 L0 L1 Bye Bye L2 Bye   3 L0 Bye L1 L2 Bye Bye   4 L0 L1 L2 Bye Bye Bye   5 L0 Bye L1 Bye L2 Bye
```
**Counting trick:** only C1's Bye can precede L1 (0 or 1 of them), and at least one Bye (P's own) must follow L2, so there are 3 + 2 = 5 outputs. ⚠️ The slide's box labels are swapped: `fork() != 0` is true in the **parent**, so the *original* process prints L0, L1, L2 and Bye.

**Signals inside a program** (the workshop topic) [S17-p4, S17-p7, S03-p13–p18, S02-p10]
1. **Track each signal's disposition over time**: a handler, `SIG_IGN` (ignore) or `SIG_DFL` (default), or the `sigaction` settings.
2. **When a signal arrives**: **I**nstall → **C**atch (the handler is called with the signal number) → **H**andle → **R**eturn to the interrupted instruction [S17-p4]. A handler that calls `exit` ends the program there.
3. **Default actions the slides state**:
   - SIGINT: terminate [S17-p4];
   - SIGCHLD: **ignore** [S17-p3, S03-p17];
   - SIGTSTP (Ctrl-Z): suspend [S17-p8];
   - SIGQUIT (Ctrl-\): "with a core dump" [S02-p11];
   - SIGKILL (`kill -9`): kills [S17-p10];
   - a plain `kill` sends SIGTERM, a "termination request" [S03-p16].
   - Anything else: 🔎 Track B.
4. **After `fork`**: handlers are **inherited**, and the **pending-signal set is cleared** in the child [S02-p10].
5. **Interrupted calls**: a blocked system call interrupted by a caught signal returns −1/`EINTR`, unless the handler was installed with **`SA_RESTART`** [S16-p15, S03-p18, p19].
6. **The shell's view**: a process killed by signal N shows `$? = 128 + N`. So 130 = Ctrl-C, 137 = `kill -9`, 139 = segfault, 143 = SIGTERM, 141 = SIGPIPE [S04-p3, Lab A4].
7. **Handler rules**: do "safe work only: write, `_exit`, or set a flag" [S03-p18]. A SIGCHLD reaper loops `while (waitpid(-1, NULL, WNOHANG) > 0)`, because signals are **unqueued** [S03-p17].

### 1(b) CPU scheduling by hand: "THE EXAM METHOD" (Gantt chart) [S05-p4]
```
TAT = T_completion − T_arrival     RT = T_first run − T_arrival     WT = time in the ready queue = TAT − burst
average X = (X_P1 + … + X_Pn) / n        non-preemptive and all arrive at t = 0  ⇒  RT = WT
RR: n jobs each get 1/n of the CPU in slices ≤ q; nobody waits more than (n−1)·q            [S05-p13]
RR shortcut WT = q × (slices waited) — ONLY if every slice is a full q                        [S05-p16] ⚠️
one job of length T, quantum q: ⌈T/q⌉ pieces, ⌈T/q⌉ − 1 context switches                     [S05-p15]
```
**Recipe**
1. Copy the job table (arrival, burst, priority).
2. Walk the time line from 0. At every **event** (an arrival, a completion, a quantum ending), apply the policy's rule.
3. Draw the Gantt chart: one box per stretch of CPU ownership, with the time under every edge.
4. Read each job's **completion at the right edge** of its last box, and its **first run at the left edge** of its first box.
5. Fill a table with C, TAT, WT and RT, then average each column.
6. Cross-check WT by adding up each job's gaps (the S05-p8 style).

| Policy | Who runs at an event | Preemptive? | Ref |
|---|---|---|---|
| FCFS / FIFO | earliest arrival; runs to completion | no | S05-p5, p6 |
| SJF | shortest burst among the ready jobs; runs to completion | no | S05-p7 |
| SRTF ("preemptive SJF") | least **remaining** time. A newcomer preempts only if it is strictly shorter (S05-p9, t = 10: P4 needs 4 and P1 has 1 left, so no preemption) | yes | S05-p8, p9 |
| Priority | smallest number = highest priority. Equal priority → the job that arrived (is listed) first (S05-p11: P1 before P4; S05-p12, t = 18: P1 before P3) | non-preemptive and preemptive versions | S05-p10–p12 |
| RR | the head of the ready queue runs ≤ q, then goes to the **back**. A job that needs less than q leaves early | yes | S05-p13–p16 |
| MLFQ | always run the highest non-empty queue: Q0 q = 1 (new jobs), Q1 q = 2, Q2 FCFS. A job that doesn't finish in its quantum is **demoted** | yes (upper floors) | S05-p17 |

- **MLFQ consequence:** a job needing 1 unit finishes in Q0; 2–3 units, in Q1; more than 3, it reaches Q2. 🔎 Track B: arrivals while a lower queue runs, and priority boosts (not on the slide).
- **What to quote about each policy:**
  - FIFO suffers the **convoy effect**: average WT 17 vs 3 for the same jobs [S05-p5, p6].
  - SJF is "optimal – gives minimum average waiting time", but you must know the future [S05-p7].
  - Priority: "low priority can starve", and "aging fixes it" [S05-p10].
  - RR has "typically higher average turnaround than SJF, but better *response*". A large q makes it FIFO; a small q gives too much overhead (q = 10–100 ms, a context switch < 10 µs) [S05-p13, p14].
  - ⭐ "MLFQ is shortest-job-first for people who cannot see the future" [S05-p17].
- **Worked example [S05-p9] SRTF**, jobs (arrival, burst) = P1 (0, 8), P2 (4, 10), P3 (4, 3), P4 (10, 4). ✅ Gantt: P1 0–4 · **P3** 4–7 (3 < 4, so it preempts) · P1 7–11 (P4 arrives at 10, but 4 > 1) · P4 11–15 · P2 15–25. TAT 11, 21, 3, 5 → **10**. WT 3, 11, 0, 1 → **3.75**.
- ⚠️ **Watch:** S05-p11's average WT is **12**, not the printed 10.5. S05-p7 has a hidden arrival column. S05-p16 never prints its quantum (it is 2). See §6.

### 1(c) Pipe / fd-table tracing [S06, S07, Lab 1]

**Vocabulary** [S06-p5]:
- a **file descriptor** is a "**ticket**": a small integer in the process's own descriptor table;
- the **open file description** is the kernel's "**bookmark**": which object, how it was opened, and the offset;
- 0, 1, 2 = stdin, stdout, stderr;
- new descriptors get the **lowest free number** (3, 4, …) [S10-p8, and every W3 run].

⭐ **The Sacred Rule of Closing** [S06-p10]: "every process closes every pipe end it will not use, immediately after fork. Not tidiness — correctness".

| Situation | Result |
|---|---|
| `pipe(fd)` | `fd[0]` = read end, `fd[1]` = write end ("0 is stdin-like, so it is where you read"); a 64 KiB kernel buffer [S06-p8] |
| `fork()` | copies the **descriptor table, not the pipe**: 1 buffer, 2 readers, 2 writers [S06-p9] |
| `read`, pipe empty, a write end still open **anywhere** (even in the reader) | **blocks**. ⭐ "Nothing crashes. Nothing logs." [S06-p9] |
| `read`, every write end closed | returns **0 = EOF**: "not an error and not a byte; it is a verdict" [S06-p11] |
| `write` into a full pipe | blocks until a reader drains it (Lab A3 stops at 65 536 B) [S06-p11] |
| `write` with no read end left | **SIGPIPE** kills the writer (`$?` = 141); if caught, `write` returns −1/EPIPE, "Broken pipe" [S06-p11; Lab A4] |
| `dup2(src, dst)` | dst is closed first if open; then dst is a second ticket for src's bookmark. **src stays open** [S06-p15] |
| `exec…` | keeps the descriptor table: "That Is the Whole Trick" [S06-p17] |
| `pipe()` called after `fork()` | two private pipes that cannot talk to each other (W3 notes Q16 ✅) |

**fd-table drawing recipe** (the lab's style [Lab1-p11])
- Columns: fd 0 | 1 | 2 | 3 | 4 | ….
- One row per (process, moment): after `pipe`, after `fork` (copy the row), after each `open`/`dup2`/`close`, and just before `exec`.
- Write `tty`, `R`, `W`, a file name, or `–`.
- Then **count the write ends of each pipe in the whole system**.

**dup2 redirection recipe**: in the child, before exec [S06-p17; Lab B1–B3]

| You type | The child does |
|---|---|
| `cmd > file` | `fd = open(file, O_WRONLY\|O_CREAT\|O_TRUNC, 0644); dup2(fd, 1); close(fd);` |
| `cmd < file` | `fd = open(file, O_RDONLY); dup2(fd, 0); close(fd);` |
| `a \| b` | `pipe(p)`; in a: `dup2(p[1], 1)`; in b: `dup2(p[0], 0)`; **everyone** (a, b and the parent) closes both originals; the parent then `waitpid`s both |

- **The pattern** is **dup2 → close both originals → exec**, followed by `perror` + `exit(1)` for the failure path.
- **Counting** for `c1 | … | cN`: N forks, N − 1 `pipe()` calls, 2(N − 1) descriptors, N `waitpid`s [Lab D8].

**Worked example: the lab's own B1 table** for `ls -l | wc -l` [Lab1-p11]:

| Moment | fd 0 | fd 1 | fd 3 | fd 4 |
|---|---|---|---|---|
| parent after `pipe(p)` | tty | tty | R | W |
| both children right after `fork` | tty | tty | R | W |
| child 1 after `dup2(p[1],1)` and its 2 closes → `ls` | tty | **W** | – | – |
| child 2 after `dup2(p[0],0)` and its 2 closes → `wc` | **R** | tty | – | – |
| parent after its 2 closes | tty | tty | – | – |

- **How it ends:** one write end is left (`ls`'s fd 1). When `ls` exits, `wc` reads 0 and prints its count.
- **Delete one close:** only **#4** (wc's `close(p[1])`) and **#6** (the parent's `close(p[1])`) make it hang ✅.
- ⭐ **The one rule:** a missing close hangs the program exactly when it leaves a **write end** open in a process that stays alive while the reader waits. Read ends never matter.

⭐ **Hang checklist**: "find and repair the fault in a supplied program that hangs on a pipe" [S01-p11; W3 notes §4.11]
1. **Who** is blocked, and in **which call**: `read`, `write`, FIFO `open`, or `waitpid`?
2. **Blocked in `read`, waiting for EOF?** List **every** live process's tickets to that pipe's **write end**. Any single one blocks EOF [S06-p9, p17]. Check:
   - the parent;
   - the reader itself;
   - siblings and helpers (they inherit at fork);
   - exec'd programs (they keep their fds);
   - extra tickets made by `dup2`.
3. **Blocked in `waitpid`?** Ask what that child waits for. Usually it is either:
   - an EOF whose `close` sits *after* the `waitpid` (Lab C1), or
   - room in a pipe that only the waiting parent would drain (Lab D2: works below 64 KiB, hangs above).
4. **Blocked in `write`?** The pipe is full. Is its reader blocked too?
5. **Is the data even in the pipe?** A filter whose stdout is a pipe is fully buffered: it flushes only at EOF or exit (Lab C6, `tr`).
6. **Two-way conversation?** Somebody must write first (Lab A6). With big data, one process can't both feed and drain (Lab C6 step 3).
7. **FIFO stuck in `open`?** `open` is a handshake: will the other side ever open with the *opposite* mode? Two FIFOs opened in crossed order deadlock (Lab D6) [S07-p5].
8. **FIFO reader never ends?** It opened with `O_RDWR`, so it is its own writer and never sees EOF [S07-p5].

### 1(d) Semaphores: trace tables, missing waits/posts, every output, precedence graphs [S09, S12, S13]
```
wait(S):  if S > 0: S = S − 1              post(S):  S = S + 1
          else: sleep until S > 0,                   if someone sleeps on S:
                then S = S − 1                           wake ONE of them            [S09-p4, S12-p3]
```
- **The basic rules:**
  - The value is **never negative**, and `wait` and `post` are **atomic**.
  - Synonyms: wait = P, post = V = signal; the mutex calls lock/unlock = acquire/release [S09-p4].
  - ⭐ "**Set the start value once; after that, only wait and post — never read the value.**" [S12-p3]
- ⭐ "**The start value is the meaning**" [S12-p3, S13-p2], and ⭐ "Start value 0 is a message; start value 1 is a key" [S14-p13]:

| Start value | Job | Who waits / who posts | Café picture |
|---|---|---|---|
| 1 | **lock** (binary semaphore = mutex) | the **same** process: wait … post around its critical section | one key to the toilet |
| 0 | **signal** ("A before B") | B waits before its line, A posts after its line (**different** processes) | "call me when the coffee is ready" |
| N | **limit** (multiplex) | each customer: wait … post | three stools |
| 0 and 0 | **rendezvous** | each posts **its own** flag first, then waits for the other's | two friends leave together |
| N, 0, 1 | **bounded buffer** (`empty`, `full`, `mutex`) | the cook waits on `empty`, the waiter on `full`, both on `mutex` | the pass shelf |
| 1 and 0, plus an int | **barrier** (`mutex`, `gate`, shadow counter `arrived`) | the last arrival posts `gate`; everyone passes the turnstile `wait(gate); post(gate)` | the tour group |

**Trace-table rules** ⭐ [S13-p2]
1. One row per `wait` or `post`.
2. Each value column holds the value **after** the step.
3. A `wait` on 0: write the name under *sleeping*.
4. A `post` to a sleeper: **the value stays, the sleeper wakes**. You cannot choose which sleeper [S09-p5, S12-p4].
- *Inside* means the process is past its `wait` and not yet at its `post` [S13-p3].
- **Worked example [S13-p4]**, five customers and `S = 3` (the slide's own answer, ✅). After the rows C1 wait, C2 wait, C3 wait, C4 wait, C1 post, C5 wait, C3 post, C2 post, C4 post, C5 post, S is: **2, 1, 0, 0 (C4 sleeps), 0 (flag → C4), 0 (C5 sleeps), 0 (flag → C5), 1, 2, 3**.
  - Never four inside, because the 4th `wait` (rows 4 and 6) finds 0.
  - S ends back at 3, because flags are only moved, never made.

**Fill in the missing waits/posts = precedence graph → semaphores** [S09-p9, S09-p10, S13-p7, S13-p8]
1. Draw every arrow "X → Y: X must be printed before Y".
2. Use **one semaphore per arrow**, named after it (sAB), starting at **0**. In a **cycle**, exactly **one** semaphore starts at 1: the one on the arrow into the letter that goes first. ⭐ "In a cycle, exactly one semaphore starts at 1 — it says who goes first" [S13-p6].
3. Before a print, `wait` on **every arrow coming in** ("A process with two arrows coming in waits twice" [S09-p10]). After it, `post` on **every arrow going out**.
4. Fewer semaphores is ⭐ "an optimisation you must prove" [S13-p8]:
   - same sender and receiver, used in order → **may share**;
   - **different receivers → never** (one process steals the other's flag; S13-p8 prints "A C D", then everybody sleeps ✅);
   - same receiver, different senders → **prove it first**.
5. Keeping two processes apart is not an arrow: use a key (start 1), waited and posted by the **same** process.

**List every possible output** [S13-p9, p10]. ⭐ "Find what cannot happen first; what is left is what can."
1. Keep the program order inside each process.
2. **Key rule:** lines printed while holding the key can't be split by another process's lines that need **the same** key.
3. **Signal rule:** the line after a `wait(s)` comes after whatever precedes the matching `post(s)`.
4. ⚠️ **The trap:** a process that never takes the key can slip **between** the key-holder's lines. ⭐ "A lock keeps out only those who also use it" (S13-p10's `C A D B`).
5. List the survivors, and give a one-line reason for each impossible order.
- **Worked example [S13-p9]:** exactly **A B C D, C A B D, C A D B, C D A B** ✅. "A key keeps lines apart; a signal puts them in order."

⭐ **The trio rule** [S12-p10]: "**Wait for a place first, then for the key; post in the mirror order.**"
```
Cook:   wait(empty); wait(mutex); put a plate;  post(mutex); post(full)
Waiter: wait(full);  wait(mutex); take a plate; post(mutex); post(empty)
```
- **Invariant:** empty + full = N, "whenever nobody is in the middle of a step" [S12-p9].
- **Swap the cook's two waits** and you get the 4-row deadlock of [S13-p12]: the cook sleeps on `empty` **holding the key**, and the waiter sleeps on `mutex`. ⭐ "Never go to sleep while holding the key."

**The classic mistakes** [S12-p12]

| Mistake | What you see | Fix |
|---|---|---|
| wrong wait order (`mutex` before `empty`) | runs for a while, then the whole café is asleep (deadlock) | place first, then key |
| a forgotten `post` on an error path | one by one, everybody sleeps | every way out of the critical section posts |
| `post` twice for one `wait` | the limit grows: "four customers on three stools" | exactly one post per wait |
| a long sleep inside the critical section | correct, but slow: everyone queues at the key | "a lock protects data, not time" |
| dying while holding the key | everyone who needs it sleeps for ever: "the key dies with it" | never die holding it |
| reading the value ("if S > 0 …") | works in every test, fails under load | only wait/post; count yourself, under a lock |

- **Deadlock vs starvation:** draw "who waits for whom". A **circle** of sleepers is a deadlock [S13-p12, S14-p10]. ⭐ "A process that is never chosen although the program is correct and everybody else keeps moving" is starvation [S14-p7].
- **In C** [S09-p11, p12, S12-p13]:
  - `sem_init(&s->x, 1, value)` once, **before `fork`**, with the `sem_t` in shared memory (`shared_alloc`) next to the data it guards;
  - `sem_wait` before the critical section, `sem_post` after, `sem_destroy` at the end;
  - compile with `-pthread`, and run on Linux.

### 1(e) Classical problems [S14]

⭐ "**Any number of readers, or exactly one writer — never both.**" [S14-p3]

| Version | Semaphores (start) | Verdict, as measured on the slides | Ref |
|---|---|---|---|
| One lock | `board` 1 | correct, but 3 readers × 2 s finish at **6 s instead of 2**: readers wait for each other for nothing | S14-p4, p5 |
| ⭐ Lightswitch | `board` 1, `mutex` 1, `readers` = 0 (shadow counter) | correct, and readers share. **Writer starvation**: 24 reads, **0 writes**, the writer waited 10.0 s (8 of 8 runs). ⭐ "Correct is not the same as fair." | S14-p5, p7 |
| ⭐ Turnstile | `turnstile` 1 + the above | fair: 14–18 reads, 2–3 writes, the writer waits ≤ 2.0 s ("a little less reading") | S14-p8 |
| Variant A (writer `post(turnstile)` *before* `wait(board)`) | — | correct, **not fair**: the cook starves on `board`. That is **not** a deadlock | S14-p10 |
| Variant B (reader `wait(mutex)` *before* the gate) | — | **deadlock**: W sleeps on `board` (R1 has it), R1 on `mutex` (R2 has it), R2 on `turnstile` (W has it) | S14-p10 |
```
Lightswitch reader:  wait(mutex); readers++; if readers == 1: wait(board);  post(mutex)    /* first in locks the door */
                     read the menu
                     wait(mutex); readers--; if readers == 0: post(board);  post(mutex)    /* last out unlocks it   */
Writer:              wait(board); rewrite; post(board)              (unchanged)
Turnstile: writer = wait(turnstile); wait(board); rewrite; post(turnstile); post(board)
           reader = wait(turnstile); post(turnstile); then the lightswitch reader
```
- **Why the turnstile works:**
  1. A waiting writer takes the gate and keeps it while it sleeps on `board`.
  2. The readers already inside drain out.
  3. New readers queue at the gate.
  4. The last one out posts `board`; the writer writes, then opens the gate [S14-p8].
- ⭐ "Move one line, and ask the three questions again: **correct, fair, alive**" [S14-p9].
- ⭐ "The rule is a safety habit; the real test is always the circle: who waits for whom" [S14-p5]. The first reader may sleep on `board` while holding `mutex`, because the cook never asks for `mutex`.
- **Categorical exclusion (one bathroom)** [S14-p11]:
  - Semaphores: `room` 1, `limit` 3, `mutexC` 1, `customers` 0, plus the staff mirror `mutexS`/`staff` (implied).
  - Shape: two lightswitches over **one** `room`, plus a limit of 3 inside.
  - ⭐ **Category first, place second.** In the other order, a customer holds a place while sleeping on `room`, and staff wait for places nobody uses. "Holding one thing while waiting for another is how every deadlock starts."

⭐ **The sleeping barber** [S14-p12, p13]: `customers` = 0, `barber` = 0 (messages), `mutex` = 1 (a key), `waiting` = 0 (shadow counter), `CHAIRS` = 2.
```
Customer: wait(mutex)                                     Barber: loop {
          if waiting == CHAIRS: post(mutex); leave                  wait(customers)   /* sleep until someone comes */
          waiting = waiting + 1                                     wait(mutex); waiting = waiting − 1; post(mutex)
          post(mutex)                                               post(barber)      /* "next!" */
          post(customers)   /* wake him */                          cut hair
          wait(barber)      /* wait for "next!" */                }
          get a haircut
```
- **The three questions and their answers:**
  - Who wakes the barber? The customer, with `post(customers)`.
  - How does the customer know it is his turn? The barber calls `post(barber)`.
  - How do you count chairs? With `waiting`, changed only under `mutex`, because a semaphore can't be read.
- **Balking:** a customer who finds the chairs full gives up at the door.
- **S14-p15 answer** (6 customers, 2 chairs): **C4** leaves, and the haircuts go **C1, C2, C3, C5, C6**. This assumes the longest sleeper is woken first; in [S09-p5] you could not know which sleeper wakes.
- **Swap** the customer's `post(customers)` and `wait(barber)`, and you get "a deadlock, on every run": `timeout 5` gives exit **124**, and every process sits in state `S` [S14-p16].
- **k barbers:** run the same program k times. It becomes a **pool**, and ⭐ "the pool is a barber shop" [S14-p15].
- **Dining philosophers:** the slides give only "five people, five forks, and everybody needs two" [S14-p2]. The naive deadlock, starvation and resource-allocation graphs are Week 7 Part 2 [S01-p15]. 🔎 Look up in Track B until the class deck exists.

### 1(f) Sockets and servers: call order and the 4-design table [S10, S11]
```
SERVER: socket() → [setsockopt(SO_REUSEADDR), inside net.h] → bind() → listen() → loop { accept() → read/write … → close(C) }
CLIENT: socket() → connect() → write/read … → close()
slide verbs  listen(5000) = socket+bind+listen · accept(L) · connect(host,5000) = socket+connect      [S10-p6, p9]
net.h        server_listen(port) → L · server_accept(L) → C · client_connect(host, port) → C · read_line(c, buf, size)   [S10-p10]
```
- **`accept` and `read`:**
  - `accept` takes the first caller from the **listen queue**; it **sleeps** if the queue is empty, and returns a **new** fd (L = 3, C1 = 4, C2 = 5 [S10-p8]).
  - `read` sleeps until bytes arrive. It returns **0 when the other side closed, or died**: the OS closes a dead process's sockets [S10-p7, S11-p15].
- **Byte stream and framing:** TCP is reliable and in order, but ⭐ "**One write is not one message**". You need framing: end every message with `'\n'` (what `read_line` does) or put its length in front [S10-p14].
- **Error messages:**
  - `connect: Connection refused` → nobody is listening (you started the client first);
  - `bind: Address already in use` → that port already has an owner (you started the server twice) [S10-p5, p13].
- **Unix domain socket:** the address is a file name (`s` in `ls -l`), on the same machine only, and every client gets its own private line [S10-p15].

| Design [S11-p14] | Processes | Who waits | Shared data? | Cost | Used by | Zombies / closing |
|---|---|---|---|---|---|---|
| 1 · one at a time | 1 | each client waits for all before it | trivially | simplest code | small tools, tests | no children; `close(C)` after each client |
| 2 · process per client | 1 + one per client | nobody | no: needs shared memory + semaphore | a `fork` per client; unlimited processes | PostgreSQL, sshd | parent `close(C)`, child `close(L)` [S11-p5]; SIGCHLD reaper with `SA_RESTART` [S11-p8] |
| 3 · pool of N | 1 + N | client N+1 | no (same as 2) | fixed, predictable | Apache prefork, PHP-FPM | the OS wakes **exactly one** worker per caller; the parent only waits [S11-p11] |
| 4 · select / poll | 1 | nobody, *if every step is short* | yes, for free | harder to write; one slow step blocks all | nginx, Redis, Node.js | no fork at all [S11-p13] |

- **Timing recipe** ("reply after" = finish − connect):
  - Design 1: every client waits for everyone in front of it.
  - Design 2: each client gets just its own work time.
  - Pool of N: clients are served in waves of N.
  - Clients not being served sit **connected** in the OS listen queue [S11-p3].
- ⭐ "A server is judged by what happens to the second client" [S11-p2]. ⭐ "Choose by asking: how many clients, how long is each job, what must they share?" [S11-p14]

---

## 2. Every exercise or homework-style question that appears on the slides

Answers are as worked in the notes, and ✅ means re-checked by script for this review. **Hint only** = graded homework, or an item that coincides with **open HW2** (due 24 Oct): do those yourself.

### Week 1: processes and signals

| Ref | Exercise | Answer |
|---|---|---|
| S02-p10 | "Run it twenty times; collect the orders" | The parent/child order changes from run to run: "Nondeterminism is the Default". A line after `fork()` with no branch prints twice (once if fork fails) |
| S02-p12 = S17-p5 | TRY THIS OUT: `multi_signal.c` | It prints the PID line, the hint line and a blank line. Each Ctrl-C prints `Caught SIGINT (Ctrl+C)` and it keeps waiting. `kill -TERM` and `kill -USR1` are caught too, so its own hint does **not** stop it. Ctrl-Z stops it (`fg` resumes). Ctrl-\ (no handler) or `kill -9` ends it ✅ |
| S16-p7 | `fork_example.c` | 2 lines, either order; the PIDs match crosswise. The child may print `parent = 1` if the parent has already returned (orphan) ✅ |
| S16-p8 | sketch the graph (`x = 1`; child `++x`, parent `--x`) | `parent: x=0` and `child : x=2`, in either order; never `x=1` (Photocopy) ✅ |
| S16-p9 | `fork(); fork(); printf("hello")` | 4 processes, 4 × hello, so 1 distinct output ✅ |
| S16-p9 HOMEWORK | three forks, then `hello` | 2³ = **8** processes, 8 × hello; the original creates 3 children directly ✅ |
| S16-p10 | nested forks in parent | 3 processes, 6 lines, **5** outputs (§1a) ✅. ⚠️ The box labels are swapped |
| S16-p11 HOMEWORK | HI / SYSTEMS PROGRAMMING / GOOD LUCK / BYE: graph + every output | The braces trap gives **4** processes. main prints HI, GL, BYE; child1 SP, GL, BYE; child2 BYE; child3 BYE. That is 8 printf calls: HI×1, SP×1, GL×2, BYE×4. Constraints: HI first; SP < GL(c1) < BYE(c1); SP < BYE(c3); GL(main) < BYE(main). Result: **28** legal orders (paper model) ✅. In a real run every line starts with "HI" (the unflushed buffer is copied by fork; 🔎 Track B). ⚠️ The slide's graph labels the first printf "ONLINE EDUCATION" |
| S03-p5 | Program A (`write` A; fork; B; fork; C) | 4 processes; A×1, B×2, C×4 = 7 lines; **3** outputs: `A B B C C C C` · `A B C B C C C` · `A B C C B C C` ✅. Impossible: three C's before the second B |
| S03-p6 | Program B (fork in a loop, 3 times) | 2³ = **8** processes (7 created). P0 has 3 children, P1 2, P2 1, P3 1. A child born at iteration i forks n − 1 − i more times ✅ |
| S03-p7 Ex 1 | one child, one `wait` | exactly 1 output: the child's line, then the parent's ✅ |
| S03-p7 Ex 2 | two children, one `wait` | `wait` returns whoever **finishes**. With `sleep(1)` you get the slide's output; without it, all **6** orders occur, including print order ≠ exit order ✅. Fix: `waitpid(kid[0], &st, 0)` |
| S17-p4 = S03-p15 | `sigint.c` | One line, `Caught SIGINT!`, then exit code 0 from the handler's `exit(0)`. The `exit(0)` after `pause()` is never reached ✅ |
| S17-p6 | `alarm.c` | BEEP × 5, then BOOM!, in about 5 s ✅ (with `beeps++ < 5`: 6 BEEPs, ≈ 6 s) |
| S17-p8 | `sig2handle.c` | `Caught SIGINT` / `Caught SIGQUIT`. Ctrl-Z suspends it (`ps` state `T`). `kill -9` ends it, and so does a plain `kill` (SIGTERM is not caught) ✅. ⚠️ `SIGSTP` is a typo |
| S03-p17 | why `while`, not `if`, in the SIGCHLD handler | Signals are **unqueued**: 5 deaths may arrive as 1 SIGCHLD. ✅ With `while`, 0 zombies in 20 of 20 runs; with `if`, 1–4 zombies were left in 17 of 20 |
| S03-p18/p19 | what `SA_RESTART` changes | A parent blocked in `waitpid` receives SIGINT. With `SA_RESTART` the call restarts and returns the PID; with `sa_flags = 0` it returns −1/EINTR ✅ |

### Week 2: shell and scheduling

| Ref | Exercise | Answer |
|---|---|---|
| S04-p3 | the `$?` table | `true` 0 · `false` 1 · `./nope` **127** · no x bit **126** · `kill -9` **137** · `kill -TERM` **143** · segfault **139** · Ctrl-C **130**. `grep`: 1 = no match, 2 = error. `if` treats only 0 as true ✅ |
| S04-p4 | `( x=42 )` vs `{ x=42; }` | parentheses: `inside: 42` / `outside: ` (empty). Braces: `inside: 42` / `outside: 42` ✅ |
| S04-p12 | the `export` experiment | Before `export` the child sees nothing; after it, `hello`. The child's `x=ciao` never reaches the parent ✅ |
| S04-p14 | `let`, `$(( ))`, `$[ ]` | 24, 32, 143, 17589 ✅ |
| S04-p18 Homework | `user.sh`, `number.sh` | user.sh greets you if the name equals `$USER`; otherwise "You are not …". number.sh accepts only 1 < x < 10: 5 → `5*5=25`, 9 → `9*9=81`, 1 or 10 → `Wrong insertion !` ✅. ⚠️ The slide's curly quotes break it |
| S04-p20 | one `if` with `-a` | Same results as the nested ifs. ⚠️ Typed with the slide's en-dash `–a`, it fails with `[: too many arguments` ✅ |
| S04-p21–p24 | loops, arrays, functions | the sum of 1..5 = 15; `${pet[0]}` → dog; `${pet[*]}` → dog cat fish; the function demo prints its 3 lines in order ✅ |

| Ref | Policy and data (arrival, burst[, prio]) | Gantt | Answer (all ✅ re-simulated) |
|---|---|---|---|
| S05-p4 | FIFO: A 3, B 2, C 4 (all at 0) | A 0–3, B 3–5, C 5–9 | TAT 3/5/9, RT 0/3/5 (avg TAT 17/3, avg WT 8/3) |
| S05-p5 / p6 | FIFO: 24, 3, 3 | P1 first → P2, P3 first | avg WT **17** vs **3**: the convoy effect |
| S05-p7 | SJF: 6, 8, 7, 3 (all at 0) | P4 0–3, P1 3–9, P3 9–16, P2 16–24 | avg WT **7**. (⚠️ With the hidden arrivals 0/2/4/5: P1 0–6, P4 6–9, P3 9–16, P2 16–24, avg WT 5) |
| S05-p8 | SRTF: (0,8) (1,4) (2,9) (3,5) | P1 0–1, P2 1–5, P4 5–10, P1 10–17, P3 17–26 | avg WT **6.5**, avg TAT 13 |
| S05-p9 | SRTF: (0,8) (4,10) (4,3) (10,4) | P1 0–4, P3 4–7, P1 7–11, P4 11–15, P2 15–25 | avg TAT **10**, avg WT **3.75** |
| S05-p10 | priority: bursts 10/1/2/1/5, prios 3/1/4/5/2 | P2 0–1, P5 1–6, P1 6–16, P3 16–18, P4 18–19 | avg WT **8.2** |
| S05-p11 | priority (np): 6/10/4/6, prios 2/1/3/2 | P2 0–10, P1 10–16, P4 16–22, P3 22–26 | avg TAT **18.5**; avg WT = 48/4 = **12**. ⚠️ The slide prints 10.5 |
| S05-p12 Homework | priority (preemptive): (0,8,3) (4,10,2) (4,3,3) (10,4,1) | P1 0–4, P2 4–10, P4 10–14, P2 14–18, P1 18–22, P3 22–25 (given) | avg TAT 61/4 = **15.25**; avg WT 36/4 = **9** (notes' solution) |
| S05-p13/p14 | RR q = 4: 24, 3, 3 | P1 0–4, P2 4–7, P3 7–10, P1 10–30 | avg TAT 47/3 ≈ 15.67, WT 17/3 ≈ 5.67, RT 11/3 ≈ 3.67 |
| S05-p15 | one job of 10, q = 12 / 6 / 1 | — | **0 / 1 / 9** context switches |
| S05-p16 Homework | RR (q = 2, implied): 8, 10, 6, 4 | 14 slices of 2 | P4 done at 16, P3 at 22, P1 at 24, P2 at 28 → avg TAT **22.5**, avg WT **15.5** (slide) |
| S05-p17 | MLFQ | (no worked example) | 1 unit → done in Q0; 2–3 → in Q1; more than 3 → reaches Q2 |

### Week 3: pipes, dup2, FIFOs, Lab 1

| Ref | Exercise | Answer |
|---|---|---|
| S06-p11 | Example | `Child process said: Hello`: the child writes 6 bytes including `'\0'` ✅. ⚠️ `<stdlib.h>a` and the nested comment only produce warnings |
| S06-p12 | two pipes | `Child reads GKG` and `Parent reads gfg`, in any order. No deadlock, because each side writes first ✅ |
| S06-p15/p16 | `dup2(fds[1], STDOUT_FILENO)` | fd 1 → W, and fd 4 is still W (two tickets, one bookmark). On a terminal only "This prints to the terminal" appears; through `\| cat`, **neither** line does ✅ |
| S07-p8 Homework | two unrelated programs exchange 5 messages over a FIFO, taking turns | **Hint only.** Use one FIFO per direction [S06-p12]. Mind the open order: two programs that both first open "the FIFO I read" deadlock [Lab D6]. A reader sees EOF when the other side closes [S07-p7] |
| Lab A1 | hello pipe | `read end = fd 3, write end = fd 4`; `parent read 22 bytes` ✅ |
| Lab A2 | break the Sacred Rule | Step 1: three messages, then EOF. Step 2: the three messages, then it **hangs**. The parent itself still holds `p[1]`, and EOF needs **every** write end closed. Nothing crashes, nothing is logged ✅ |
| Lab A3 | pipe capacity | The last line is `written so far: 65536 bytes`. It sleeps inside `write` and nothing can wake it ✅ |
| Lab A4 / A4b | SIGPIPE | a4: the last line is `about to write...`, and `$?` = **141** (128 + 13). a4b: the handler line, `write returned -1`, `write: Broken pipe`. A web server wants the handler ✅ |
| Lab A5 | the line that prints twice | Once on a terminal, twice through `\| cat`: fork copies the buffer, and both processes flush it at exit. Fix with `write(1, …)` or stderr ✅ |
| Lab A6 | two pipes; then the parent reads first | ⚠️ `}.` doesn't compile; fixed, it prints the question and `"42"`. Reading first: both sleep in `read`, a **deadlock** ✅ |
| Lab A7 | the child becomes `ls` | The counts equal `ls -l / \| wc -lc`. With `lss`: `0 bytes in 0 lines`, and the `perror` text appears on the **screen** (only fd 1 was redirected); no hang ✅. **Hint only** for its fd table at three moments: that is **HW2 2.1**, so use §1(c) |
| Lab A8 | FIFO start orders | Writer first: blocks in `open(O_WRONLY)`. Reader first: blocks in `open(O_RDONLY)`. After `rm`: the reader fails at once, because only writer.c calls `mkfifo`. With `echo one >` the reader prints `one` and stops (EOF). Size is always 0 ✅ |
| Lab B1 | `ls -l \| wc -l` | the table in §1(c); deleting close #4 or #6 hangs ✅ |
| Lab B2 / B3 | `>` and `<` in C | same as the shell; `listing.txt` lists itself with size 0 ✅ |
| Lab C1 | feed `sort -n` | The parent's `close(p[1])` right after writing lets `sort` start. Put it after `waitpid` and you get a deadlock ✅ |
| Lab C2 | `cat \| grep \| wc` | **Hint only** (it is HW2 Part 3's design). Create both pipes before the first fork, and every process closes all four ends. A forgotten close hangs only if it is a **write end held by a process that outlives the reader** |
| Lab C3 | capture any command | `nosuchprogram` → the `perror` text on screen, then `printed 0 lines, 0 bytes`; no hang ✅ |
| Lab C4 | a pipeline of any length | The parent holds ≤ 3 pipe fds at once (1 after its closes), whatever the length; "all pipes first" would need 1998 fds for 1000 stages ✅ |
| Lab C5 | FIFO log server | It stops after the first client because `read` returns 0. Fix: reopen on EOF. A SIGINT handler does `unlink(FIFO_PATH); _exit(0);` ✅ |
| Lab C6 | talk to `tr` over two pipes | **Step 1 hangs:** the parent waits in `read`, and `tr` holds HELLO in its buffer, waiting for an EOF the parent never gives. **Step 2:** close `to_tr[1]` right after the write. **Step 3 (800 KB):** both pipes fill → deadlock. **Step 4:** an extra feeder fork writes, and the parent only reads ✅ |
| Lab D1 | fd tables for C2 | Just before exec: cat 1 = aW; grep 0 = aR, 1 = bW; wc 0 = bR; the parent has closed all four. One write end per pipe (two more if the parent hasn't closed yet) |
| Lab D2 | `waitpid` before reading | It hangs: `seq` blocks in `write` at 64 KiB while the parent waits for it. `seq 1 1000` (3 893 B) works; the limit is ≈ 65 536 B. Fix: read to EOF, then `waitpid` ✅ |
| Lab D3 | `dup2(p[1],1); close(p[1]); printf` | The write end is **still open** through ticket 1 (same open file description), so the text goes into the pipe ✅ |
| Lab D4 | `execlp` before `dup2` | The output goes to the terminal, and the `dup2` line never runs. A reader that closed its own `p[1]` gets EOF after 0 bytes ✅ |
| Lab D5 | three quick writes, one read | e.g. `onetwothree`, `one` or `onetwo`: "no boundaries", and pipes don't solve it ✅ |
| Lab D6 | two FIFOs, each program opens the one it reads first | Both are stuck in their first `open(O_RDONLY)`. Fix: swap the two opens in **one** program ✅ |
| Lab D7 | A7 without the `dup2` | The listing goes to the screen, the parent reports 0/0, and it finishes ✅ |
| Lab D8 | `a \| b \| c \| d` | 4 forks, 3 `pipe()` calls, 6 fds, 4 `waitpid`s |
| Lab D9 | true or false | a F · b F · c F · d F (it closes fd 1, not 3) · e F · f F · g T · h T · i F |

### Week 4: message queues, shared memory, mutual exclusion, semaphores

| Ref | Exercise | Answer |
|---|---|---|
| S08-p7 | who comes out next? | out of memory (7) → login failed (3) → **disk dead (7)** → login failed again (3) → backup done (0) ✅. Highest priority first; ties in send order |
| S08-p13 | one unlucky interleaving from 41 | Memory ends at **42, not 43**. The row hidden under the banner is the child's `LOAD 41` |
| S08-p16 | "Why not a simple flag?" | Checking and setting are two steps (both see 0, both go in), and the `while` loop burns CPU. That breaks "one at a time" and "no wasted CPU" |
| S08-p18 | which outputs are possible? | Only **A B C D** and **C D A B** ✅. With P2's red-struck `unlock` missing: if P2 runs first you get `C D`, and P1 sleeps for ever ✅. **"Next: two locks?" → hint only (= HW2 6.5):** for each `lock`, ask who holds the lock it needs and what that holder is waiting for |
| S08-p19 HW 1 | 3 processes, one lock: how many outputs? | **Hint only (= HW2 6.2(b)):** the lock keeps each process's two letters together as one block |
| S08-p19 HW 2 | different locks L1/L2: can the output be ACBD? | **Yes.** Different locks don't keep each other out; all 6 orders with A < B and C < D occur ✅ |
| S09-p6 Homework | S = 2: P1, P2, P3 wait; P1 posts; P4 waits; P2, P3, P4 post | S after each step: 1, 0, 0 (P3 sleeps), 0 (→ P3), 0 (P4 sleeps), 0 (→ P4), 1, 2. Never more than 2 inside; it ends at 2 ✅. ⚠️ The header says "three processes" |
| S09-p7 | the same program with S = 1 / 2 / 0 | S = 1: ABCD, CDAB. S = 2: all 6 orders (ABCD ACBD ACDB CABD CADB CDAB). S = 0: nothing is printed ✅ |
| S09-p8 | A must happen before B | S = 0. P1: `print A; post(S)`. P2: `wait(S); print B`. Only AB ✅. ⭐ "`sleep` guesses; a semaphore knows" |
| S09-p9 | force the order A, B, C | s1 = s2 = 0. PA: `A; post(s1)`. PB: `wait(s1); B; post(s2)`. PC: `wait(s2); C`. Only ABC ✅ |
| S09-p10 | the diamond A→B, A→C, B→D, C→D | (a) 4 semaphores sAB, sAC, sBD, sCD, all 0. (b) PA: `A; post sAB; post sAC`. PB: `wait sAB; B; post sBD`. PC: `wait sAC; C; post sCD`. PD: `wait sBD; wait sCD; D`. (c) **ABCD, ACBD** ✅ |
| S09-p13 | the ping-pong hint | ping = 1, pong = 0. Ping side: `wait(ping); PING; post(pong)`. Pong side: `wait(pong); PONG; post(ping)`. Strict turns ✅ |

### Week 5: sockets and concurrent servers

| Ref | Exercise | Answer |
|---|---|---|
| S10-p13/p14 | HELLO, WORLD, one `read` | `HELLOWORLD`, `HELLO` and `HEL` are possible (the network may split a write); **`WORLDHELLO` is impossible** (TCP keeps order) ✅ |
| S10-p16 Homework | run it; make an uppercase server; time diagram + fd table for 2 clients; the "lunch" question | Items 1–2: do them yourself. Item 3 (hint, from the notes): while talking to B, fd 3 = L and fd 4 = B's call (A's 4 was closed and reused). Lunch: B's `connect` returns at once, but B is **put on hold by the OS** in the listen queue for as long as A's lunch lasts [S11-p2] |
| S11-p2/p3 | one operator; A, B, C × 2 s | Replies after **2, 4, 6 s**. B and C wait **in the listen queue**, connected, with their names already sent. The **CPU is idle**. With 100 clients the last one waits 200 s ✅ |
| S11-p6/p7 | three broken servers | **X** (the parent never closes C): leaked fds 4, 5, 6…, `Too many open files` around the 1020th client, and clients never see the end of the call. Fix: `close(C)` in the parent. **Y** (the child never exits): children accept and fork too, so the server count grows. Fix: `exit` at the end of the child. **Z** (nobody waits): 1000 zombies `<defunct>`/`Z`. Fix: a SIGCHLD handler with the waitpid loop ✅ |
| S11-p9/p10 | the visitor counter | **(2): visitor 1, 1, 1**, because fork copies. Fix A: count in the parent after `accept`, before `fork` → 1, 2, 3. Fix B: shared memory + a semaphore ✅ |
| S11-p12 | five clients × 2 s: designs 1, 2, pool 2, pool 5 | **Hint only for the table** (it is HW2 4.2's "predicted" column). The slide itself prints pool 2 = A 2, B 2, C 4, D 4, E 6 s; use the timing recipe in §1(f). (c) 5 clients a day → Design 1 (simplest); 50 000 at once → Design 4, if every step is short, since Design 2 means 50 000 processes and a pool makes client N+1 wait [S11-p14] |

### Week 6: semaphore patterns and the paper workshop

| Ref | Exercise | Answer |
|---|---|---|
| S12-p8 | Attempt 1, one semaphore | (a) Plate 3 lands on top of plate 1, so a plate is lost (nothing counts free places). (b) Two waiters read the same place, so one plate is served twice ✅ |
| S12-p9 → p10 | trace Attempt 2 (N = 2) | empty/full after rows 1–10: 1/0, 1/1, 0/1, 0/2, 0/2 (cook sleeps), 0/1, 0/1 (the cook wakes holding the place), 0/2, 0/1, 1/1. The sum is ≠ 2 in rows **1, 3, 6, 7, 9**, where someone is mid-step ✅ |
| S12-p11 | 3 cooks, 2 waiters: one key or two? | (a) One key is enough. (b) `cookKey` + `waiterKey` is also correct, and faster ✅ |
| S13-p3 → p4 | five customers, three stools | the table in §1(d) ✅ |
| S13-p5 → p6 | ping-pong with other start values | 1/0: strict PING PONG. 1/1: every pair of lines is PING PONG or PONG PING, so two in a row are possible but never three (64 different 12-line outputs ✅). 0/0: nothing; both asleep |
| S13-p7 → p8 | ABCDE for ever | 5 semaphores: sEA = 1, the others 0. P1: `wait sEA; A; post sAB; wait sCD; D; post sDE`. P2: `wait sAB; B; post sBC; wait sDE; E; post sEA`. P3: `wait sBC; C; post sCD` ✅. Sharing: A→B with D→E may share; A→B with B→C **never** (prints A C D, then everyone sleeps ✅); C→D with E→A: prove it first |
| S13-p9 → p10 | every possible output | **ABCD, CABD, CADB, CDAB** (4 of the 24 orders) ✅ |
| S13-p11 → p12 | swap the cook's two waits (N = 1, shelf full) | Cook `wait(mutex)` (mutex 0) → Cook `wait(empty)` sleeps **holding the key** → Waiter `wait(full)` (full 0) → Waiter `wait(mutex)` sleeps. Nobody can move ✅ |
| S13-p13 → p14 | three broken shelves (N = 4) | **X** (the waiter never posts `empty`): cooked 1–4, served 1–4, then silence; the cook sleeps on `empty`, the waiter on `full`. Fix: `post(empty)`. **Y** (the waiter waits on `empty`): "served" lines for uncooked or already-served plates, real plates lost, both end on `empty`. Fix: `wait(full)`. **Z** (`mutex` = 0): nothing at all is printed. Fix: `mutex = Semaphore(1)` ✅ |

### Week 7: readers–writers and the barber

| Ref | Exercise | Answer |
|---|---|---|
| S14-p4 → p5 | one lock for the board | Correct; the 3 readers finish at 6 s, not 2; the readers wait for each other for nothing |
| S14-p6 Homework | the chalkboard trace (R1, R2 enter; W waits; R1 leaves; R3 enters; R2, R3 leave; W writes and posts) | readers after each step: 1, 2, 2, 1, 2, 1, 0, 0, 0. `board` is 0 from step 1 until W's post. **W sleeps at step 3**, with 2 readers inside. **R3 wakes W at step 7**, as the last one out. **R3 got in first**, although W asked earlier: that is the seed of starvation ✅ (notes' self-check key) |
| S14-p9 → p10 | Variants A and B | A: correct, not fair; the cook starves on `board` (not a deadlock). B: **deadlock**, in four steps: R1 reads; W takes the turnstile and sleeps on board; R2 takes mutex and sleeps on the turnstile; R1, leaving, sleeps on mutex |
| S14-p14 → p15 Homework | barber: 6 customers, 2 chairs | (a) **C4** leaves. (b) The haircuts go **C1, C2, C3, C5, C6**, assuming the longest sleeper is woken first. `barber` stays 0 throughout. (c) see p16 |
| S14-p16 | the customer's two lines swapped | The barber sleeps on `customers`, and C1 sleeps on `barber` before posting `customers`. Each waits for a post only the other can make: a deadlock on every run. `timeout 5` gives exit **124**, and all processes are in state `S` |

### Graded homework: referenced, not solved
- **HW1** (closed 30 Sep). Parts 2 (process graphs) and 5 (Gantt charts) are "the single most exam-relevant thing in this assignment" [HW1-p4]. Use the methods in §1(a) and §1(b). It is not solved here, because oral checks sample homework.
- **HW2** (open, due **Sat 24 Oct 23:55**). Parts: 1.x run and explain · 2.1 fd tables at three moments · 2.2 finish / sleep / killed · 3 `pipeline3.c` · 4.1 the greet server · 4.2 the timing table · 5.1–5.4 servers by hand · 6.1–6.5 semaphores by hand. The methods are in §1(c), (d) and (f). **No HW2 answers appear in this file.** Slide items that coincide with HW2 are kept hint-only above: S08-p18 two locks ↔ 6.5 · S08-p19 HW 1 ↔ 6.2(b) · the Lab A7 table ↔ 2.1 · Lab C2 ↔ Part 3 · the S11-p12 table ↔ 4.2.

---

## 3. Week map table

| Wk | Class decks (pages) | Topics | Exam skill it trains | Must-know pages | Notes file |
|---|---|---|---|---|---|
| 1 | S01 Course organization (27) · S02 Processes & signals, completed (13) · S03 Process control & signals v2 (20) · S16 Processes (18, SOC 2040) · S17 Signals (10, SOC 2040) | course rules; program vs process, the two lies; 5-state diagram; fork and process graphs; wait/waitpid and status macros; zombies, orphans, PID 1; the exec family; signals, handlers, `signal()` vs `sigaction()`, SIGCHLD reaper | process graphs, "list all outputs", signal traces | S03-p2, p4–p8, p10–p12, p16–p19 · S16-p6–p16 · S17-p3–p8 · S02-p7–p11 | Week 1a, Week 1b |
| 2 | S04 The shell (25) · S05 CPU scheduling (18) | the shell as fork–exec–wait + `$?`; exit codes; subshell, export; sessions, process groups, job control; daemons; `trap`; bash scripting · cooperative vs preemptive; metrics; FIFO, SJF, SRTF, priority, RR, MLFQ | Gantt charts by hand; `$?` decoding; job control | S04-p2–p7 · S05-p2–p17 | Week 2 |
| 3 | S06 Pipes & dup2 (18) · S07 FIFO & pipeline (10) · Lab 1 (18) | IPC; fd tables; pipe rules (EOF, full, SIGPIPE); the Sacred Rule; dup2; exec keeps fds; FIFOs and `open()`; pipelines; Lab Parts A–D | fd tables; find the hang; redirection in C | S06-p5–p17 · S07-p3–p9 · Lab1-p2–p18 | Week 3 |
| 4 | S08 Message queues, shared memory, mutual exclusion (20) · S09 Semaphores (14) | POSIX vs System V queues; shared memory (`shared_alloc`); the lost update; race condition, critical section, mutex; the semaphore and its trace table; lock / limit / signal; the four C calls | interleaving tables; semaphore traces; queue order | S08-p3–p19 · S09-p3–p13 | Week 4 |
| 5 | S10 Sockets (17) · S11 Concurrent servers (16) | socket calls, the listen queue, framing, peer death, address reuse, Unix domain sockets · designs 1–4, the broken servers X/Y/Z, the visitor counter | timing tables; server fd tables; justify a design | S10-p4–p15 · S11-p2–p15 | Week 5 |
| 6 | S12 Semaphore patterns (15) · S13 Examples on paper (17) · TP Details 1 (9) | five jobs + the barrier; the bounded buffer (trio); the classic mistakes; the paper workshop (trace tables, blanks, every output, broken shelves); the C shelf | trace tables; fill in waits/posts; list every output; precedence graphs | S12-p3–p14 · S13-p2–p16 | Week 6 (TP in the Week 7 file) |
| 7 | S14 Readers–writers, the barber (17) | lightswitch; starvation measured; turnstile; variants A/B; categorical exclusion; the sleeping barber. **Part 2** (dining philosophers, resource-allocation graphs, **midterm workshop**): no slides yet | "correct, fair, alive"; the circle test; barber tables | S14-p3–p16 | Week 7 |
| 8 | — | **MIDTERM, 26–30 Oct, 25 %**. "It's midterm season. Enough said." | — | S02-p7, S01-p16 | — |

- **Page count:** 27 + 13 + 20 + 18 + 10 + 25 + 18 + 18 + 10 + 18 + 20 + 14 + 17 + 16 + 15 + 17 + 9 + 17 = **302**.
- **Listed for weeks 1–7 but NOT on any slide:**
  - the Linux scheduler and cgroups (W2);
  - peer credentials and passing an open file (W5);
  - shell commands to list and remove IPC objects (W4);
  - the real `select`/`poll` API (W5);
  - the dining philosophers' code, deadlock and resource-allocation graphs (W7 Part 2).
  - 🔎 Look up in Track B. Treat them as out of the class material until a slide appears.

---

## 4. Definitions you must know
Each is a one-line paraphrase or short quote, with its slide.

**Processes and signals**

| Term | Meaning as taught | Ref |
|---|---|---|
| Program / process | A program is a file ("inert, cold, waiting"). A process is "an instance of a running program": registers, an address space, open files, a PID, pending signals | S02-p8, S16-p3 |
| The two lies | **Logical control flow** ("I have the CPU to myself", via context switching) and **private address space** ("memory to myself", via virtual memory) | S02-p8, S16-p3/p4 |
| Context switch | The kernel saves one process's registers and stack pointer into its kernel record, restores the next one's, and jumps. The interrupted process doesn't notice | S05-p14 |
| Process states | new → ready → running ⇄ waiting → terminated. Arrows: admitted, scheduler dispatch, interrupt, I/O or event wait, I/O or event completion, exit | S02-p9, S16-p5 |
| `fork()` | Clones the caller. "Called once, returns twice": 0 in the child, the child's PID in the parent, −1 on error | S16-p6, p7 |
| Process graph | Horizontal line = a process; vertical arrow = fork; dashed edge = wait. Golden Rule: every topological order is a legal output | S03-p4 |
| Reap | The parent collects a terminated child's exit status ("the death certificate") | S16-p13, S03-p8 |
| Zombie | "a process that has finished running, but its parent hasn't collected its exit status yet". It still holds a PID and a process-table slot; `ps` shows `Z` / `<defunct>` | S03-p3, S16-p13, p16 |
| Orphan | A child whose parent died first. It is adopted by PID 1, which reaps it | S03-p8, S16-p13 |
| PID 1 (init) | "the very first user-space process started by the Linux kernel during system boot" | S03-p8 |
| Wait set | The children `waitpid` waits for: `pid > 0` = that child; `-1` = any; `0` = my group; `< -1` = group \|pid\| | S16-p14, S02-p11 |
| exec | "replaces the current process with a new program": new brain, same hands. Keeps PID, PPID, open files and cwd; never returns on success | S03-p9, p10 |
| Signal | "a kind of (usually software) interrupt, used to announce asynchronous events to a process". "A doorbell: asynchronous, one integer, no payload" | S17-p3, S02-p11 |
| Installing / Catching / Handling / Return | Pass the handler to `signal()`/`sigaction()` → the handler is invoked → its body runs → control returns to the interrupted instruction | S17-p4 |
| `SIG_IGN` / `SIG_DFL` | ignore the signal / restore its default action | S17-p7 |
| SIGCHLD | Sent to the parent when a child exits or stops. Number 17 on Linux, default **ignore**, catchable | S03-p17 |
| Unqueued signals | Several identical signals arriving together may be delivered once, so a reaper must loop | S03-p17 |
| `sigaction` / `sa_mask` / `SA_RESTART` | The modern way to install a handler. `sa_mask` = signals blocked during the handler. `SA_RESTART` = interrupted calls restart instead of failing with `EINTR` | S03-p18, p19 |

**Shell and scheduling**

| Term | Meaning as taught | Ref |
|---|---|---|
| Shell / builtin | A user-space loop: read → parse → fork → exec in the child → waitpid in the parent → `$?`. A builtin runs inside the shell, with no fork | S04-p2 |
| `$?` | The last command's exit status: 0 success, 1–125 the program's own meaning, 126 not executable, 127 not found, 128 + N killed by signal N | S04-p3 |
| Subshell | "a child copy of the current shell process"; its changes are invisible to the parent. `( … )` makes one; `{ …; }` doesn't | S04-p4 |
| Process group / session | A group shares a PGID, and signals can target the whole group (`kill -INT -1500`). A session is a set of groups with one controlling terminal | S04-p5 |
| Foreground / background / stopped job | Owns the terminal and gets Ctrl-C / started with `&` (reading the terminal → SIGTTIN) / suspended by Ctrl-Z (SIGTSTP), resumed with `fg` or `bg` | S04-p6 |
| Daemon | No controlling terminal; runs in the background, usually from boot; an orphan whose parent is `init` | S04-p7 |
| Cooperative / preemptive | The program gives the CPU back (`yield()`, another syscall) / the kernel takes it, using the **timer interrupt** | S05-p2 |
| Preemption | "taking the CPU from a process that did not ask to give it up" | S05-p2 |
| R / S / D | runnable (the scheduler's list) / sleeping, interruptible / waiting in the kernel, uninterruptible even by `kill -9` | S05-p3 |
| Turnaround / response / waiting | C − A / first run − A / time spent in the ready queue | S05-p4 |
| CPU burst, burst time | "A continuous period during which a process uses the CPU" / "the total CPU time the process needs" | S05-p5 |
| Convoy effect | "short process behind long process" | S05-p6 |
| Starvation and aging (scheduling) | "low priority can starve"; "aging fixes it" | S05-p10 |
| Time quantum q | The RR or MLFQ slice. Large q ⇒ FIFO; small q ⇒ context-switch overhead | S05-p13 |
| MLFQ | "guesses [a job's length] from the job's *past*": run the highest queue; a job that doesn't finish its quantum is demoted | S05-p17 |

**IPC: pipes, FIFOs, queues, shared memory**

| Term | Meaning as taught | Ref |
|---|---|---|
| IPC | "any kernel-mediated way for two processes with separate address spaces to exchange data" | S06-p3 |
| Byte stream | "carries bytes in order and nothing else": no message boundaries | S06-p3, S10-p14 |
| File descriptor / descriptor table / open file description | a "ticket" (small integer) / a process's private list of tickets / the kernel's "bookmark" (which object, how opened, offset) | S06-p5 |
| EOF | `read` returns 0: "no more data will ever arrive" (on a terminal you send it with Ctrl-D) | S06-p6, p11 |
| Pipe | "a nameless, fixed-size buffer inside the kernel with two descriptors on it". One-way, FIFO order, 65 536 B on Linux | S06-p7, p8 |
| Sacred Rule of Closing | every process closes every pipe end it will not use, immediately after fork | S06-p10 |
| SIGPIPE / EPIPE | Sent (number 13) to a writer whose pipe has no reader; kills it (`$?` 141). If caught, `write` returns −1/EPIPE | S06-p11, Lab A4 |
| `dup2(src, dst)` | copies descriptor info: dst now refers to what src refers to; dst is closed first if it was open | S06-p15 |
| FIFO (named pipe) | "FIFO = pipe + a name": a file of type `p`, size always 0; `open()` is the handshake | S07-p3–p5 |
| Pipeline | commands run concurrently, each one's stdout connected to the next one's stdin; no program knows it is in a pipeline | S07-p9 |
| Atomic write / PIPE_BUF | "a write that arrives in one piece, never mixed with another writer's bytes". Guaranteed only up to 4096 B on Linux | S08-p3 |
| Message queue / message / priority | a named list of messages inside the kernel / "one block of bytes sent by one call; … received whole" / a number the **sender** attaches, highest first | S08-p4 |
| POSIX / System V | IEEE 1003.1, "the contract that makes a Unix program portable" (queues added 1993) / the AT&T Unix of 1983: an integer key, and the **receiver** picks the order by type | S08-p5, p8 |
| Persistence | Queue data survives when everybody exits (POSIX and System V); a FIFO keeps only its name; a pipe keeps nothing | S08-p8 |
| Shared memory | "a region of memory that several processes can read and write directly, as if it were their own". `shared_alloc` must be called **before** `fork` | S08-p9, p10 |
| Deadlock | Processes waiting on each other for ever ("Nothing crashes. Nothing logs."). HW2's definition: every one asleep, "waiting for a flag that only another sleeper in the group could post" | S06-p9, HW2 6.5 |

**Synchronisation**

| Term | Meaning as taught | Ref |
|---|---|---|
| Lost update | two increments, one result: LOAD–ADD–STORE windows overlap, and one STORE overwrites the other | S08-p12, p13 |
| Race condition | behaviour that "depends on the sequence or timing of uncontrollable events, such as the execution order of multiple threads or processes" | S08-p14 |
| Critical section | "the lines of code that touch the shared data" | S08-p16 |
| Mutual exclusion | "the guarantee that while one process is inside its critical section, no other process can be inside it" | S08-p15 |
| A correct lock gives | one at a time · progress · no one waits forever · no wasted CPU (waiters sleep) | S08-p16 |
| Mutex / atomic | a lock with `lock` (take, or sleep) and `unlock` (free, wake one) / "indivisible: it happens completely or not at all" | S08-p17 |
| Semaphore | "A counter that processes can decrease and increase atomically, and that makes a process sleep when there is nothing left to take"; never negative; `wait` = P, `post` = V | S09-p4 |
| Binary semaphore | starts at 1, used as wait … post by the same process, so its value is only 0 or 1: a mutex | S09-p7 |
| `sem_t` / pshared | the semaphore type (pass its address) / `sem_init`'s middle argument: 1 = shared between processes (always, in this course) | S09-p11 |
| Synchronisation | "the set of rules that decide who may do what, and when, when several processes share something": make the answer independent of the interleaving | S12-p2 |
| Limit (multiplex) / rendezvous / barrier | at most N inside / two processes wait for each other, and neither passes until both arrive / N processes wait until all N have arrived | S12-p4–p6 |
| Shadow counter / turnstile | an ordinary integer counting what you may not read from a semaphore, kept under a lock / `wait(t); post(t)`: lets one through and re-opens for the next | S12-p6, S14-p8 |
| Bounded buffer / producer / consumer | a shelf with N slots between the cook (producer) and the waiter (consumer) | S12-p7 |
| Invariant | e.g. "empty + full = N, whenever nobody is in the middle of a step" (the slides state invariants without using the word) | S12-p9 |
| Starvation (synchronisation) | "A process that is never chosen although the program is correct and everybody else keeps moving". **Not** a deadlock | S14-p7 |
| Lightswitch | "the first one in locks the door; the last one out unlocks it" | S14-p5 |
| Categorical exclusion | whole categories keep each other out (staff or customers in the bathroom, never both, at most 3) | S14-p11 |
| Balking | "Giving up at the door instead of waiting" | S14-p12 |

**Sockets and servers**

| Term | Meaning as taught | Ref |
|---|---|---|
| Socket / connection | "one end of a conversation between two processes", given as a file descriptor / "two sockets joined together: a two-way stream of bytes" | S10-p4 |
| Server / client | "the process that waits to be called" / "the process that calls" | S10-p4 |
| IP address / port / localhost / TCP | which machine / which process (0–65535; below 1024 admin only) / this machine, 127.0.0.1 / reliable and in order | S10-p5 |
| Listening socket / connection socket | `L` only receives new calls / every `accept` returns a **new** private line to one client | S10-p8 |
| Listen queue | callers on hold: connected, but not yet accepted | S10-p9, S11-p3 |
| Framing | "the rule both sides follow to cut the stream back into messages": end with `'\n'`, or start with the length | S10-p14 |
| Unix domain socket | the address is a file name; same machine only; faster than localhost | S10-p15 |
| Designs 1–4 | one at a time / a process per client / a pool of N / select-poll | S11-p2, p14 |

---

## 5. API & rules cheat sheets

### 5.1 Process calls and status macros [S16-p6–p15, S03-p3–p12, S02-p11]

| Call | Returns | Rules |
|---|---|---|
| `pid_t fork(void)` | child: **0** · parent: the **child's PID** · error: **−1** (`errno` says why) | "Always check the return value." Both continue after the fork; the child gets a copy of the memory and the fds; the order is the scheduler's choice |
| `getpid()` / `getppid()` | my PID / my parent's PID | after the parent dies, `getppid()` returns **1** (orphan) |
| `exit(n)` / `return n` from `main` | — | the status (0–255) is kept until the parent reaps it. The three ways to die: return, `exit(n)`, killed by a signal [S03-p8] |
| `pid_t wait(int *st)` | PID of **any** child that finished | `wait(&st)` ≡ `waitpid(-1, &st, 0)`. `wait(NULL)` = "I only want the ordering" |
| `pid_t waitpid(pid_t pid, int *st, int options)` | **> 0** PID reaped · **0** nothing finished yet (only with `WNOHANG`) · **−1** error | `pid`: > 0 that child · −1 any · 0 my group · < −1 group \|pid\|. Options: `0` block · `WNOHANG` (= 1) return 0 at once · `WUNTRACED` (= 2) also report stopped children |
| status macros | `WIFEXITED(s)` normal exit? → `WEXITSTATUS(s)` the code (only if `WIFEXITED`) · `WIFSIGNALED(s)` killed by an uncaught signal | (The TP spec adds `WTERMSIG(s)` = the signal number [TP-p4]) |
| `errno` after −1 | `ECHILD`: no children left · `EINTR`: interrupted by a signal | `#include <errno.h>` |
| exec family | **never returns on success**; returns (−1) on failure | **l** list (`execl`, `execlp`, `execle`) · **v** array (`execv`, `execvp`, `execvpe`) · **p** search PATH (`execlp`, `execvp`); without p, the exact path · list/array ends with **`NULL`** · `argv[0]` = the program's own name · **e**: not explained 🔎 |

Examples [S03-p11, p12]: `execlp("ls", "ls", "-l", NULL);` · `execl("/bin/date", "date", "+%T", NULL);` · `char *a[] = {"echo", "Hello", "from", "execv!", NULL}; execv("/bin/echo", a);`

### 5.2 Signals (Linux x86-64 numbers [S03-p16]; default actions only where a slide states them)

| Signal | # | Typical source | Default / notes |
|---|---|---|---|
| SIGINT | 2 | Ctrl-C, `kill -2` | **terminate** [S17-p3, p4]; `$?` 130 |
| SIGQUIT | 3 | Ctrl-\ | "with a core dump" [S02-p11] |
| SIGKILL | 9 | `kill -9` | kills the process, threads included [S17-p10]; `$?` 137; the way out when INT/TERM are caught. Uncatchable? 🔎 |
| SIGSEGV | 11 | invalid memory access | `$?` 139 [S04-p3]; default 🔎 |
| SIGPIPE | 13 | write to a pipe with no reader | **kills the writer**, `$?` 141; if caught, `write` returns −1/EPIPE [S06-p11, Lab A4] |
| SIGTERM | 15 | a plain `kill` | "termination request"; `$?` 143; "Be nice. Send SIGTERM instead." [S17-p5, p10] |
| SIGCHLD | 17 | a child stopped or exited | **ignore**; catchable; unqueued, so reap with a `while` loop [S03-p17] |
| SIGSTOP | 19 | `kill -STOP` | Stop = the "pause button" (`ps` state `T`) 🔎 |
| SIGTSTP | 20 | Ctrl-Z | suspend (stopped; resume with `fg`/`bg`) [S17-p8, S04-p6] |
| SIGALRM | — | `alarm(n)` | used in `alarm.c` [S17-p6] |
| SIGUSR1 | — | `kill -USR1 pid` | "user-defined 1" [S02-p12] |
| SIGTTIN | — | a background job reads the terminal | stops it [S04-p6] |

```c
sighandler_t signal(int signum, sighandler_t handler);   /* handler: SIG_IGN, SIG_DFL or &my_handler      [S17-p7]
                                                            returns the previous handler, or SIG_ERR ("does not set errno") */
int sigaction(int signum, const struct sigaction *act, struct sigaction *oldact);   /* −1 on failure     [S03-p19] */
struct sigaction sa; sa.sa_handler = h; sigemptyset(&sa.sa_mask); sa.sa_flags = SA_RESTART; sigaction(SIGINT, &sa, NULL);
pause();            /* sleep until a signal arrives */          alarm(n);   /* SIGALRM to me in n seconds */
```
- **The 4 problems with `signal()`** [S03-p18]:
  - it is not portable (BSD vs System V);
  - the handler may reset to the default after one delivery;
  - there is no control over restarting interrupted calls;
  - a signal can race the installation of the handler.
  - ⭐ "signal() is for reading old code; sigaction() is for writing new code."
- **`struct sigaction` fields:** `sa_handler` · `sa_sigaction` (used with `SA_SIGINFO`) · `sa_mask` (blocked during the handler) · `sa_flags` (`SA_RESTART`, `SA_SIGINFO`) · `sa_restorer` (obsolete).
- **Handler:** "safe work only: write, `_exit`, or set a flag" (the flag must be a global; `got_sigint` is undeclared on the slide).

### 5.3 Shell and job control [S04]

| Item | Rule |
|---|---|
| `$?` | 0 success (the only "true" for `if`) · 1–125 the program's own meaning (`grep`: 1 = no match, 2 = error) · 126 found but not executable · 127 not found · **128 + N** killed by signal N |
| `( … )` vs `{ …; }` | a subshell (changes lost) vs the current shell (changes stay); keep the space after `{` and the `;` before `}` |
| `export x` | children get a **copy**; a child's change never reaches the parent |
| `ps -eo pid,ppid,pgid,sid,tty,stat,comm` | `Ss` = session and group leader · `+` = foreground group · `kill -INT -1500` signals **group** 1500 (note the minus) |
| Job control | `cmd &` background · Ctrl-Z stop (SIGTSTP) · `jobs` lists them (`+` = most recent, `-` = previous) · `bg %1` · `fg %2` · `fg` = the `+` job. `%n` is a **job** number, not a PID |
| `trap 'cmds' SIGINT` / `trap 'cmds' EXIT` | run cmds on Ctrl-C / when the script ends |
| Script | shebang `#!/bin/bash`, which `bash script.sh` ignores · `$0` `$1` `$@` · `chmod +x` (or `700`) · `PATH=$PATH:.` |
| Quoting | `name="Ana"` (no spaces around `=`) · `"$var"` expands · `'$var'` is literal · prefer `"$@"` |
| Arithmetic | `let X=10+2*7` · `$((…))` · `$[…]` |
| Tests `[ … ]` (spaces inside!) | strings `= != -n -z` · numbers `-eq -ne -gt -ge -lt -le` · files `-d -f -e -r -s -w -x` · logic `! -a -o` · `A && B` (B only if A succeeded) · `A \|\| B` (B only if A failed) |
| Loops, arrays, functions | `for x in list; do …; done` · `for x` loops over the arguments · `pet=(dog cat fish)`, `${pet[0]}`, `${pet[*]}` · `hello() { …; }`, then call `hello` |
| Daemon (systemd) | create `/etc/systemd/system/<name>.service` with `[Unit] Description=` and `[Service] ExecStart=`, then `sudo systemctl enable <name>` |

### 5.4 Scheduling formulas (the full method is in §1(b))
```
TAT = C − A        RT = first run − A        WT = TAT − burst        avg = sum / n
RR wait bound (n−1)q · q × slices only if all slices are full · T/q: ⌈T/q⌉ pieces, ⌈T/q⌉−1 switches
q = 10–100 ms ≫ context switch < 10 µs        q large ⇒ FIFO        small q ⇒ overhead
```
- FIFO: convoy effect. SJF: minimum average WT, but needs the future.
- SRTF: preemptive SJF; long jobs get pushed back.
- Priority: smallest number first; starvation → aging.
- RR: better response, higher TAT than SJF.
- MLFQ: Q0 q = 1 → Q1 q = 2 → Q2 FCFS; demote on an unfinished quantum.

### 5.5 Pipes and FIFOs [S06, S07, Lab 1]
```c
int pipe(int fd[2]);                                  /* fd[0] read, fd[1] write; 0 ok, −1 error; 65 536 B buffer */
int dup2(int srcfd, int dstfd);                       /* dst closed first; dst → src's bookmark; src stays open    */
int mkfifo(const char *path, mode_t mode);            /* creates the NAME only; −1 + EEXIST if it already exists  */
if (mkfifo(FIFO_PATH, 0666) == -1 && errno != EEXIST) { perror("mkfifo"); exit(EXIT_FAILURE); }
while ((n = read(fd, buf, sizeof buf)) > 0) write(STDOUT_FILENO, buf, n);   /* THE read-until-EOF loop [S07-p7] */
unlink(FIFO_PATH);                                    /* remove the name (like rm)                                */
```
⭐ **FIFO `open()` semantics, "the only genuinely new idea"** [S07-p5]:

| Call | Blocks? | What happens |
|---|---|---|
| `open(path, O_RDONLY)` | **yes** | waits until some process opens the FIFO for writing |
| `open(path, O_WRONLY)` | **yes** | waits until some process opens the FIFO for reading |
| `open(path, O_RDONLY \| O_NONBLOCK)` | no | returns at once, even with no writer |
| `open(path, O_WRONLY \| O_NONBLOCK)` | no | **−1, `errno = ENXIO`** if there is no reader |
| `open(path, O_RDWR)` | no | Linux allows it, but it is non-portable and you **never see EOF**: avoid it |

- ⭐ "`open()` **is the handshake.** Both sides must arrive before data can flow." `mkfifo` only creates the name.
- After `open`, all the pipe rules apply (EOF, blocking when full, SIGPIPE).
- `ls -l` shows type `p` and **size 0**: "No data is ever stored on disk".

| | Ordinary pipe | FIFO |
|---|---|---|
| Created by | `pipe(fd)` | `mkfifo(path, mode)` + `open` |
| Who can use it | parent and children: needs fork inheritance, "a family privilege" | any process with the path and permission, "related or not" |
| Lifetime | only while running (in memory) | the name persists in the filesystem until deleted |
| Shell | `a \| b` | `mkfifo /tmp/f`; `cat /tmp/f` + `echo hi > /tmp/f` |

- **Buffering** [S06-p6; Lab A3, A5]:
  - "`printf` talks to a buffer; `write` talks to the kernel."
  - stdout to a terminal is **line-buffered**; stdout to a pipe or file is **fully buffered**; stderr is **unbuffered**.
  - A non-empty buffer at `fork` is printed twice.
  - A filter writing into a pipe holds its output until EOF.
- **Atomic writes:** only for writes ≤ **PIPE_BUF = 4096 B** on Linux; bigger writes from two writers can interleave [S08-p3].

### 5.6 Message queues and shared memory [S08]

| Question | pipe | FIFO | POSIX queue | System V queue |
|---|---|---|---|---|
| who can use it? | parent + children only | anyone with the path | anyone with the `/name` | anyone with the **key** |
| what travels? | bytes | bytes | **whole messages** | **whole messages** |
| who decides the order? | nobody (FIFO) | nobody (FIFO) | the **sender** (priority) | the **receiver** (type) |
| works with `\|`, `cat`, `echo >`? | yes | yes | no | no |
| data survives when everybody exits? | no | no (only the name) | **yes** | **yes** |
| end-of-data signal? | EOF | EOF | none | none |

- **POSIX queue calls:** `mq_open("/soc3010", …)` creates/opens (the size is fixed at creation) · `mq_send` sends with a **priority** · `mq_receive` gets **one whole message, the highest priority first, and among equal priorities the first sent** · `mq_close` / `mq_unlink`; the queue **and its messages** survive until removed. ⭐ "You will not write this in this course": know what it is and when to choose it [S08-p6, p7].
- **Shared memory:**
  - `#include "shared_mem.h"`; `long *c = shared_alloc(sizeof(long));` ⭐ **before `fork()`**. It wraps `mmap(…, MAP_SHARED | MAP_ANONYMOUS, …)` and exits on failure [S08-p10].
  - "The kernel steps out": there are no boundaries, no waiting for data, no single receiver, and **no protection from two writers** [S08-p11].
- **The lost update:** `counter_race2.c` printed `expected 2000000, got 1025956`. `counter++` is **LOAD, ADD, STORE**, and "someone else can squeeze in between" [S08-p12, p13].

### 5.7 Semaphore calls [S09-p11, p12, S12-p13]
```c
#include <semaphore.h>
int sem_init(sem_t *s, int pshared, unsigned value);  /* ONCE, before fork; pshared = 1 (between processes)    */
int sem_wait(sem_t *s);                               /* P: take one, or sleep until you can                   */
int sem_post(sem_t *s);                               /* V: give one back, wake one sleeper                    */
int sem_destroy(sem_t *s);                            /* at the end                                             */
struct shared { sem_t lock; long counter; };          /* the sem_t lives in shared memory next to its data     */
struct shared *s = shared_alloc(sizeof(struct shared)); sem_init(&s->lock, 1, 1);
/* gcc -o sem sem.c -pthread      (sem_shm.h builds with: -lrt -pthread)      Linux only: macOS sem_init fails */
```
- ⭐ "Four calls: init once, wait before, post after, destroy at the end." pshared = 0 means "threads only", which **locks nothing between processes** after a fork [sem_shm.h].
- **Start values** (§1(d)): lock 1 · signal 0 · limit N · rendezvous 0/0 · buffer N/0/1 · barrier 1/0 + shadow counter · ping-pong 1/0.

### 5.8 Sockets [S10, S11, net.h]

| Real call | net.h helper | What it does |
|---|---|---|
| `socket()` | inside `server_listen` / `client_connect` | creates the "phone": a new fd, the lowest free number |
| `setsockopt(SO_REUSEADDR)` | inside `server_listen` | "lets you restart the server at once on the same port". It does **not** let two live servers share a port |
| `bind()` | inside `server_listen` | "port 5000 → this process" in the OS's port table |
| `listen()` | inside `server_listen` (`listen(fd, 16)`) | switches the phone on and starts the **waiting queue** |
| `accept()` | `server_accept(L)` | takes the first caller; **sleeps** if none; returns a **new** fd. net.h **exits on any error** |
| `connect()` | `client_connect(host, port)` | the two OSes exchange three short messages, and then the call exists |
| `read` / `write` / `close` | `read_line(c, buf, size)` | `read` sleeps for data and returns 0 when the other side closed. `read_line` reads to `'\n'`, removes it, and returns 0 only at EOF |

| Message | Meaning |
|---|---|
| `connect: Connection refused` | nobody is listening there: start the server first |
| `bind: Address already in use` | another process owns the port: you started the server twice (on macOS, also port 5000 itself) |
| `accept: Too many open files` | the descriptor table is full: Server X's leak |
| `accept: Interrupted system call` | SIGCHLD interrupted `accept` without `SA_RESTART` (seen in the notes' test) |
| `ps`: `Z` / `<defunct>` | zombies: Server Z, nobody waits |

---

## 6. Traps & slide errors (consolidated from all 8 notes files)

### 6.1 Wrong numbers, swapped labels, hidden or missing pieces

| Slide | Problem | What to use |
|---|---|---|
| ⚠️ **S05-p11** | Average WT printed as **10.5** | (10 + 0 + 22 + 16)/4 = 48/4 = **12 ms** ✅ (image re-checked; WT = TAT − burst agrees). Its TAT 18.5 is right |
| ⚠️ **S16-p10** | Box labels **swapped**: "PARENT" next to `L0, fork, Bye`, "CHILD2" next to `L2, Bye` | `fork() != 0` is true in the **parent**, so the original process prints L0, L1, L2, Bye; each child prints only Bye (image re-checked). Graph shape and the 5 outputs are unaffected |
| S16-p11 | The graph labels the first printf "ONLINE EDUCATION" | The code prints "HI" |
| S05-p7 | An "Arrival Time" column (0, 2, 4, 5) is hidden (white text / under a box); title says "non-peemptive" | The slide's answer (WT 7) assumes all jobs arrive at 0. With the arrivals, WT = 5 ✅ |
| S05-p8 | "…+(17-2)+5-3)]/4" is missing a "(" | 6.5 is correct |
| S05-p16 | The quantum is not printed | The 2-unit slices mean **q = 2** |
| S05-p17 | The diagram numbers the queues 1–3; the table numbers them 0–2 | Same three floors |
| S03-p4 | The legend says dashed = `wait()`, but the fork branches are drawn dashed (Program A has no wait) | Read those dashed verticals as forks |
| S03-p16 | The "Default" column is empty; the title promises "catchable vs uncatchable" but no column says it | Defaults only where other slides state them (§5.2); the rest 🔎 |
| S17-p7 = S03-p14 | Titled "How to *send* a signal (Version 2)" but shows *installing* handlers; the "02 / 04" counter has no 03 / 04 | Sending = `kill`, `alarm` |
| S17-p7 vs S17-p8 | `signal()` "does not set errno", yet the next program prints `strerror(errno)` after it fails | Check `SIG_ERR`; the errno text may be meaningless |
| S02-p11 | The definition says "a **specific** child"; the table also allows "any child" | Use the table: >0 / −1 / 0 / < −1 |
| S03-p11 | The picture shows fork + exec, but the code never forks | The process itself becomes `ls`, same PID |
| S03-p12 | The letter **e** is never explained; `execvpe` has a p but isn't listed under p | 🔎 Track B for `e` |
| S06-p4 | "Wrong on four counts" lists three | Three: no notification, no boundaries, racing offsets |
| S06-p2, S07-p2 | "Atomic writes" promised, never explained in W3 | Explained on S08-p3: ≤ PIPE_BUF = 4096 B on Linux |
| S06-p10 | "the child's read loop, lines 23-31" is not shown | Same shape as `reader.c`'s loop [S07-p7] |
| S07-p6 | Callout talks about "a restart of the server", but `mkfifo` is in writer.c (the "client") | The lesson holds for whichever program creates the FIFO |
| S08-p3 | "(depending) on OS Linux" is garbled | PIPE_BUF depends on the OS; it is 4096 on Linux |
| S08-p8 | Title partly struck through; the PDF text layer lists the columns in reverse order | Trust the image (§5.6 table) |
| S08-p12 | The text layer shows `#define N 10` + a stray `00000` | The image says `N 1000000` |
| S08-p13 | The yellow banner hides one row of the interleaving table | The hidden row is the child's `LOAD 41` |
| S08-p17 | "LOAD(atomic)–ADD–STORE" | The lock protects the whole LOAD–ADD–STORE group |
| S09-p3 | "Process P3" is pasted over "P2" and prints C/D like P2 | Copy-paste slip (meant other letters) |
| S09-p6 | Header says **three** processes; the table uses **four** (P4) | Four processes |
| S09-p11 | Comment on `long counter;` says "… and number of flags" | Misleading: the flags live inside `sem_t`; S09-p12 corrects it to "what it protects" |
| S10-p2 | Header "WEEK IV" in the Week 5 deck; TLPI "Ch 56-61" vs "ch. 56–60"; "peer credentials / passing an open file" listed but never taught | 🔎 Track B for those two topics |
| S10-p10 | "Each call returns a file descriptor" also covers `read_line`, which returns a count (0 = EOF); a stray `<p>` | — |
| S10-p12 | "More on slide 16" | Framing is on **p14**; p16 is the homework |
| S12-p6 | The barrier ends with `gate = 1`, `arrived = N` | It is **non-reusable** as written ✅ (🔎 reusable barrier) |
| S13-p5 | An unexplained tag "rendezvous happens once"; header reads "Patterns" | Likely: the rendezvous meets once, ping-pong for ever |
| S13-p7 | "(some stay empty)" | The answer on p8 fills **all ten** blanks: a decoy |
| S14-p2 | `sem_trywait` is announced ("explained where it appears") | It never appears in S14. 🔎 Track B |
| S14-p7 | The heading says **six** readers; the chart draws three lanes | The chart is the idealised picture; the numbers are from the real run |
| S14-p11 | Only the entry half of the staff code; `mutexS`, `staff` not declared | They are the mirror image of the customer's (1 and 0) |
| S14-p14 | Part (c) says "next lecture" | Answered on p16 of the same deck |
| S14-p15 | The haircut order assumes the longest sleeper wakes first; the real-run transcript shows different balkers (C5, C6) | Different timing, not a contradiction; S09-p5 says you can't know which sleeper wakes |
| S01-p24 vs S02-p7 | W16 "MAKUP ASSESMENT" vs "W15–16 Final Exam & Project Fair" | Ask; also "TPLI" for TLPI on S01-p6 |
| S04-p13 | "Line 4 uses rm -i": `rm -i` is line 5; the `mkdir ~/bin` bullet is unfinished | — |
| S04-p12 / p23 / p6 / p7 | `$PATH` output cut off · "up to 1024 elements" (bash took 5000; exam answer: 1024) · the command that created job [2] is never shown · the systemd unit has no `[Install]` section 🔎 | — |
| Lab1-p16 (C6) | Step 1 sends `"hello\n"` (6 B), but "≈ 800 KB" implies a 40-byte line | Use the 40-byte line for steps 3–4 |
| HW2 starter `pipe_eof.c` | The parent's `close(p[1])` (THE line of 1.2) **ships commented out** | Make it active for 1.1, then disable it for 1.2 |

### 6.2 Code that won't compile, or isn't a complete program, as printed

| Where | What breaks | Fix |
|---|---|---|
| **S03-p17** `handle_sigchld` | The inner `/*` is never closed: "unterminated /* comment" | Add `*/` after the dashed line |
| **S17-p8** red box | `SIGSTP`: "use of undeclared identifier" | `SIGTSTP` |
| **S08-p12** `counter_race2.c` | `#include "shared_mem.h“` with a curly closing quote: "missing terminating '"' character" | A straight `"` |
| **Lab A6** | `}. /* parent */`: "expected expression" | Delete the `.` |
| **S07-p7** `reader.c` | `//unlink(PATH);`, if uncommented: `PATH` undeclared | `unlink(FIFO_PATH);` |
| **S12-p13/p14** `shelf_min.c` | `main()` (p13) calls `cook()`/`waiter()` defined on p14: "call to undeclared function 'cook'" | Put `cook`/`waiter` above `main`. (The file isn't in the zip; `shelf.c` is) |
| S09-p13 | The ping/pong overlay changes the struct, but the code below still uses `s->lock`/`s->counter` | Read the boxes as a hint |
| S03-p18 | `got_sigint` is never declared | A global variable |
| S03-p7 Ex 2 | `kid[]`, `first` and the parent's `printf` are missing | Add them |
| S06-p12 / S16-p9 / S17-p4 / S11-p8 | Fragments: declarations, `fork`, `#include`s, `reap()`/`serve()` not shown | `server_fork.c` in the HW2 starter is S11-p8 complete |
| S10-p15 | `listen("/tmp/shop")` | Pseudo-code: `net.h` is TCP only |
| S06-p11 | `#include <stdlib.h>a` and a `/*` inside a comment | It **compiles** (warnings only) |
| S09-p12 `sem.c`, all W6 class code | Compiles, but on macOS `sem_init` fails silently | Linux only |

### 6.3 Curly quotes, long dashes and font ligatures in slide code
- **Curly quotes**: S04-p11, p13, p18, p20–p24 and S08-p12.
  - `echo “Deleted all files!”` prints the quotes as text.
  - `[ “$num” -lt 10 ]` gives "integer expression expected".
  - **Type straight `"`.**
- **Long dash**: S04-p20 prints the AND operator as `–a` (an en-dash). It fails with `[: too many arguments`, so even 5 prints "Wrong insertion !". **Type `-a`.**
- **Slide-font ligatures**:
  - `!=` drawn as `≠` (S10-p12);
  - `==` as a long `═` (S11, S12-p6, S12-p13);
  - `->` as `→` (S09-p11, S12-p13);
  - `<=` as `≤` (S12-p14).
  - Always type the ASCII form.

### 6.4 macOS vs Linux (details in §0)
- **`sem_init`** fails silently on macOS ("Function not implemented"), so the semaphore programs run with no locking.
- **`<mqueue.h>`** is missing on macOS.
- **Signal numbers** differ: macOS STOP/TSTP/CHLD/USR1 = 17/18/20/30; Linux STOP 19, TSTP 20, CHLD 17 [S03-p16].
- **Port 5000** is owned by ControlCenter on macOS, so `bind: Address already in use` appears even with `SO_REUSEADDR`.
- **Small differences:**
  - `hostname -I` is not available;
  - Ctrl-\ prints `Quit: 3` and no core file is written;
  - on the Mac, `signal()` did not reset after one delivery (S03-p18: "behavior varies");
  - the notes ran bash 3.2.
- **Output piped or redirected**: `printf` duplicates lines across fork and loses them across exec.

### 6.5 Exam traps (concepts)
- **fork, wait, exec**
  - An `if` without braces controls one statement [S16-p11].
  - Code after fork runs in both processes [S03-p2].
  - The **child's** copy of `x` changes, never the parent's.
  - `wait` orders you vs **one** child, never child vs child; it returns whoever *finishes*.
  - The grandchild is not waited for: output can come after the parent's "last" line.
  - Exec never returns on success; the line after it is the failure path.
  - The pending-signal set is **cleared** in the child, while handlers are **inherited** [S02-p10].
- **Pipes, dup2, FIFOs**
  - EOF needs **every** write end closed, including the reader's own.
  - `dup2(3, 1)` closes fd **1**, not 3.
  - `close(p[1])` after `dup2(p[1], 1)` leaves the write end open through fd 1 [Lab D3].
  - `exec` keeps the fds.
  - A pipe created after fork is two pipes.
  - `waitpid` before reading hangs above 64 KiB.
  - A FIFO `open` blocks, and `O_RDWR` never sees EOF.
  - One `read` may glue writes together (no boundaries).
  - `perror` goes to fd 2, which is not redirected.
- **Scheduling**
  - Response ≠ waiting when a job runs more than once.
  - The q × slices shortcut fails when a slice is short [S05-p16].
  - A newcomer with **more** remaining time does not preempt.
  - Priority: **smaller number = higher**.
  - MLFQ demotes a job only if it doesn't finish its quantum.
- **Semaphores**
  - Never read the value; a post to a sleeper leaves the value at 0.
  - S = 2 is not a lock; S = 0 prints nothing.
  - "A lock keeps out only those who also use it."
  - Place first, then key; post in the mirror order.
  - One semaphore per arrow; different receivers never share.
  - In a cycle, exactly one flag at the start.
- **Classical problems**
  - Starvation ≠ deadlock: the café is busy, only the cook waits.
  - Variant A is unfair; Variant B deadlocks.
  - In the bathroom: category first, place second.
  - The barber's `waiting` counts the customer until "next!".
  - Swapped lines in the barber deadlock on every run.
  - "0 is a message; 1 is a key."
- **Sockets**
  - The server starts first.
  - One write ≠ one message.
  - Callers on hold are already **connected** (in the listen queue).
  - The parent must `close(C)` and the child `close(L)`.
  - Children don't share variables: the visitor counter shows 1, 1, 1.
  - `SO_REUSEADDR` does not let two live servers share a port.
  - Without `SA_RESTART`, a child's death kills a `net.h` server (EINTR in `accept`).

### 6.6 Contradictions found between the notes files
1. **Midterm dates.**
   - Week 1a (from the S02-p7 card) and the syllabus's slide quote say **26–30 Oct**.
   - Week 4, 5, 6 and 7 note headers and the syllabus "Right now" box say **24–30 Oct**.
   - → Use the slide: 26–30 Oct.
2. **What a plain `kill` sends.** Week 2 (answer 13) says "the slides only show kill with an explicit signal… 🔎". Week 1b quotes [S03-p16]: "`kill` (default)" = **SIGTERM 15**. → The slide answers it.
3. **SIGQUIT's default.** Week 1b's signal table says "not stated 🔎". Week 1a quotes [S02-p11]: Ctrl-\ → SIGQUIT "**with a core dump**".
4. **FCFS.** Week 2 says "the slides never expand FCFS". Week 1a quotes [S01-p10]: "**first-come-first-served**".
5. **Atomic writes.** Week 3 says no slide explains them (🔎). Week 4 quotes [S08-p3]: the definition, plus **PIPE_BUF = 4096** on Linux.
6. **Descriptor numbering.** Week 3 sends "which number a new descriptor gets" to Track B. Week 5 quotes [S10-p8]: "**lowest free number**".
7. **Deadlock.** Week 4 says it is "not named on these slides 🔎". Week 3 shows [S06-p9] "(deadlock)" and Lab A6 "Name: deadlock", and HW2 6.5 defines it.
8. **"Downey".** Week 1a: "the slide does not explain who 'Downey' is 🔎". Week 6 [S12-p2]: Allen B. Downey, *The Little Book of Semaphores*.
9. **Week-1 topics.** Week 1a sends status macros, zombies/orphans, process-graph notation, exec and sigaction to Track B (it covered only S01/S02). Week 1b teaches all of them from S03/S16/S17. → Use 1b.
10. **Is scheduling on the midterm?** Week 1a: "the card does not say whether W2 is included". Week 7 cites [HW1-p1]: the midterm "will ask for exactly these two skills" (process graphs **and Gantt charts**). → Yes.
11. **Which sleeper a post wakes.** Week 4 [S09-p5]: "Q or R", you can't know. Week 7 [S14-p15]: the haircut order assumes the **longest sleeper** wakes first; the Week 7 notes flag it, and Week 6 A6 lets the OS choose. Not a real contradiction; state your assumption when the order matters.
12. **When "limit" was taught.** Week 6 [S12-p3] lists the limit as taught "today" (W6). Week 4 [S09-p2–p4] already introduced "a lock, a limit, a signal" with S = 3. This inconsistency is on the slides; both notes report it faithfully.
13. **stdio buffering.** Week 1b and Week 3 send it (and `fflush`) to Track B. But class code uses `setvbuf`: `stools.c`, `sem_shm.h`'s `unbuffer()`, and HW2-p2's setvbuf box (Week 6 and 7 notes). The mechanism is still 🔎; the fix is class material.

---

## 7. Mock midterm (practice), about 90 minutes

> **Practice only.** The data is new; the task types are the slides', the workshop's and the homework's. Work **on paper, by hand**: typed tables score zero in HW2, and the midterm "will ask for exactly these skills".
> **Conventions** (the slides' own):
> - output goes to a terminal, so each `printf("…\n")` is one line;
> - Linux signal numbers;
> - a smaller priority number = higher priority; ties → the job listed (arrived) first;
> - RR jobs arriving together queue in listed order;
> - semaphore traces follow [S13-p2].
>
> No HW1/HW2 data is reused. Answers are in §8.

| Part | Questions | Minutes |
|---|---|---|
| A · Processes (fork / wait / exec) | Q1–Q3 | 22 |
| B · CPU scheduling | Q4–Q5 | 18 |
| C · Pipes and descriptors | Q6–Q7 | 15 |
| D · Semaphores | Q8–Q9 | 14 |
| E · Classical problem | Q10 | 9 |
| F · Sockets and servers | Q11 | 6 |
| G · Short items | M1–M10 | 6 |
| **Total** | **11 problems + 10 short items = 21** | **90** |

### Part A: Processes (22 min)

**Q1 (7 min). Straight-line forks.**
```c
int main(void) {
    printf("X\n");
    if (fork() == 0)
        printf("Y\n");
    fork();
    printf("Z\n");
    return 0;
}
```
- (a) Draw the process graph and name each process.
- (b) How many processes are there, and how many lines?
- (c) List **every** possible output.
- (d) Is `X Z Z Z Y Z` possible? Give a one-line reason.

**Q2 (7 min). Whose order did `waitpid` buy?**
```c
int main(void) {
    printf("A\n");
    pid_t c = fork();
    if (c == 0) {
        printf("B\n");
        if (fork() == 0) {
            printf("C\n");
            exit(0);
        }
        printf("D\n");
        exit(3);
    }
    int st;
    waitpid(c, &st, 0);
    printf("E%d\n", WEXITSTATUS(st));
    return 0;
}
```
- (a) Draw the graph, including the wait edge.
- (b) How many processes are there?
- (c) List every possible output.
- (d) Can the output be `A B C E3 D`?
- (e) The process that prints `C` may print after `E3`. Who reaps it, and what is it before that, if (i) its parent is still alive when it exits, (ii) its parent has already exited?

**Q3 (8 min). A loop, `exec`, and the failure path.**
```c
int main(void) {
    int k = 0;
    for (int i = 0; i < 2; i++) {
        if (fork() == 0) {
            k++;
            if (i == 1)
                execlp("echo", "echo", "E", NULL);
            printf("k=%d\n", k);
        }
    }
    printf("end k=%d\n", k);
    return 0;
}
```
- (a) How many processes exist in total? Draw the graph and mark where exec happens.
- (b) What does each process print? How many lines are there in total?
- (c) Legal or not? One line each:
  - (i) `k=1 E end k=1 E end k=0`
  - (ii) `E E k=1 end k=1 end k=0`
  - (iii) `end k=1 k=1 E E end k=0`
  - (iv) `end k=0 E k=1 E end k=1`
- (d) Someone mistypes `"echo"` as `"ehco"` in both places. Now what does each process print, and how many lines are there? Does the number of processes change?

### Part B: CPU scheduling (18 min)

**Q4 (9 min). Round Robin.** Five jobs arrive at t = 0 in the order P1…P5, with bursts **P1 = 7, P2 = 4, P3 = 9, P4 = 2, P5 = 5**, and **q = 3**.
- (a) Draw the Gantt chart.
- (b) Give each job's completion, TAT, WT and RT, and the three averages.
- (c) Give the average response time for the same jobs under FCFS and under SJF. Which policy wins on response, and which on turnaround?
- (d) Check the (n − 1)q rule. Does the slide's "q × slices waited" shortcut give P1's WT?
- (e) A single 7 ms job: how many context switches occur with q = 2, 3 and 8?

**Q5 (9 min). SRTF.**

| Process | P1 | P2 | P3 | P4 | P5 |
|---|---|---|---|---|---|
| Arrival | 0 | 1 | 2 | 4 | 7 |
| Burst | 6 | 3 | 8 | 2 | 3 |

- (a) Draw the SRTF Gantt chart, deciding at every arrival and completion.
- (b) Give the average TAT, WT and RT.
- (c) At which arrival does the newcomer **not** preempt, and why?
- (d) Schedule the same jobs with non-preemptive SJF (ties → the earlier arrival): Gantt chart and average WT. What did preemption buy, and who paid for it?

### Part C: Pipes and descriptors (15 min)

**Q6 (7 min). Trace the tables.** This is the shell's `sort < names.txt | uniq -c > counts.txt`, written by hand. fds 0–2 are the terminal, and every `open` succeeds.
```c
int p[2];
pipe(p);
pid_t a = fork();
if (a == 0) {                                   /* child A */
    int in = open("names.txt", O_RDONLY);
    dup2(in, 0);
    dup2(p[1], 1);
    close(in); close(p[0]); close(p[1]);
    execlp("sort", "sort", NULL);
    perror("execlp sort"); exit(1);
}
pid_t b = fork();
if (b == 0) {                                   /* child B */
    int out = open("counts.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    dup2(p[0], 0);
    dup2(out, 1);
    close(out); close(p[0]); close(p[1]);
    execlp("uniq", "uniq", "-c", NULL);
    perror("execlp uniq"); exit(1);
}
close(p[0]); close(p[1]);                       /* parent */
waitpid(a, NULL, 0); waitpid(b, NULL, 0);
```
- (a) Which numbers do `pipe` and the two `open` calls return?
- (b) Draw fd 0–5 of A and of B just before exec, and of the parent after its closes.
- (c) After all the closes, how many write ends of the pipe exist, and who holds them?
- (d) There are 8 `close` calls. Deleting which one alone makes the program hang? Who sleeps where?
- (e) If `uniq` were misspelt, where would the `perror` message appear, and why?

**Q7 (8 min). Find the hang.** The parent should print how many bytes `ls | sort -r` produces. Instead it prints nothing and never ends.
```c
int p[2], q[2];
pipe(p);                    /* ls   -> sort   */
pipe(q);                    /* sort -> parent */
if (fork() == 0) {          /* child 1: ls */
    dup2(p[1], 1);
    close(p[0]); close(p[1]);
    execlp("ls", "ls", NULL);
    perror("execlp ls"); exit(1);
}
if (fork() == 0) {          /* child 2: sort -r */
    dup2(p[0], 0);
    dup2(q[1], 1);
    close(p[0]); close(q[0]); close(q[1]);
    execlp("sort", "sort", "-r", NULL);
    perror("execlp sort"); exit(1);
}
close(p[0]); close(p[1]); close(q[1]);      /* parent */
char buf[4096]; ssize_t n; long total = 0;
while ((n = read(q[0], buf, sizeof buf)) > 0)
    total += n;
printf("sort -r produced %ld bytes\n", total);
wait(NULL); wait(NULL);
```
- (a) Which processes are asleep, in which call, waiting for what? Name the descriptor (process and number) that keeps them asleep.
- (b) Child 1 also never closes `q[0]` and `q[1]`. Is that a second hang? Why or why not?
- (c) Give the one-line fix.
- (d) After the fix, a classmate moves `wait(NULL); wait(NULL);` above the read loop. Does it still work for `ls`'s small output? What if stage 1 printed 200 KB?

### Part D: Semaphores (14 min)

**Q8 (7 min). Fill in the waits and posts.** The required output, for ever and whatever the scheduler does, is `X Y X Z X Y X Z X Y X Z …`.
```
semaphores and start values: ______________________________

Process P1:          Process P2:          Process P3:
  loop {               loop {               loop {
    ________             ________             ________
    print("X")           print("Y")           print("Z")
    ________             ________             ________
    ________           }                    }
    print("X")
    ________
  }
```
- (a) Draw the precedence arrows. How many semaphores (one per arrow), with which start values?
- (b) Fill in every blank.
- (c) What is printed if the semaphore that should start at 1 starts at 0? And at 2?
- (d) May the semaphores of X→Y and X→Z share one semaphore? And those of Y→X and Z→X? Justify each with the slide's sharing rules.

**Q9 (7 min). Every possible output.**
```
mutex = Semaphore(1)       s = Semaphore(0)

Process P1:          Process P2:          Process P3:
  wait(mutex)          wait(mutex)          wait(s)
  print("A")           print("C")           print("E")
  print("B")           post(s)
  post(mutex)          print("D")
                       post(mutex)
```
- (a) Of the 120 orders of A–E, list every one this program can print.
- (b) Give one-line reasons why `A C B D E` and `E C D A B` are impossible.
- (c) Write the trace table (mutex, s, sleeping, output) for `C D A E B`. Which slide sentence does it illustrate?

### Part E: Classical problem (9 min)

**Q10. The barber with one waiting chair, and one readers–writers change.**
Use the barber of [S14-p13] with **CHAIRS = 1**. Start with `customers = 0`, `barber = 0`, `mutex = 1`, `waiting = 0`. As on [S14-p14], "arrives" = the customer's lines down to `wait(barber)` (or to `leave`), and "next!" = the barber's four lines after `wait(customers)`. The events, in order:
1. Barber `wait(customers)`
2. C1 arrives
3. C2 arrives
4. Barber next!
5. C3 arrives
6. C4 arrives
7. Barber `wait(customers)`, next!
8. C5 arrives
9. Barber `wait(customers)`, next!
10. Barber `wait(customers)`

- (a) Fill in the table: step · who · waiting · customers · barber · mutex · sleeping.
- (b) Who leaves without a haircut, and in which order are the haircuts given? Why does C2 leave although the barber is already awake at step 3?
- (c) A programmer forgets `post(mutex)` in the leave branch, writing `if waiting == CHAIRS: leave`. Replay steps 1–5: who sleeps on what? Which classic mistake is this, and which slide sentence describes it?
- (d) Readers–writers, turnstile version [S14-p8], but the reader passes the gate **after** the entry part of the lightswitch: `wait(mutex); readers++; if readers == 1: wait(board); post(mutex); wait(turnstile); post(turnstile); read …`.
  - Is it correct? Is it fair? Is it alive?
  - If it can stop, give the shortest trace and the circle of waiting.

### Part F: Sockets and servers (6 min)

**Q11.** As on [S11-p2], `serve(C)` reads the name, works for 2 s, then answers. The clients connect at: A t = 0, B t = 0 (just after A), C t = 1, D t = 2, E t = 5.
- (a) Give the server's real system calls in order, and mark the two that sleep.
- (b) For Design 1, Design 2 and a pool of 2, give:
  - when each client gets its reply (in seconds after it connected);
  - when everything is done;
  - how many server processes exist at the busiest moment.
- (c) In Design 2, a programmer keeps the visitor counter in shared memory (`shared_alloc` before the loop), and each child does `visitors = visitors + 1` with **no semaphore**. Can two clients be told the same visitor number? Which week's problem is this, and what is the fix?
- (d) In a chat server every message is short, and all clients must see one shared message counter. Which design does the S11-p14 table suggest, and why?

### Part G: Short items (6 min)

- **M1.** A child has called `exit(0)`. Its parent is alive and never calls `wait`. The child is: (a) an orphan (b) a zombie (c) a daemon (d) stopped. What does `ps` show?
- **M2.** Why does a SIGCHLD handler loop with `while (waitpid(-1, NULL, WNOHANG) > 0)` rather than an `if`? Give SIGCHLD's Linux number and its default action.
- **M3.** After a command, the shell's `$?` is 143. What happened? And if it is 141?
- **M4.** Under the MLFQ of [S05-p17], a job alone in the system needs 5 units. It finishes in: (a) Q0 (b) Q1 (c) Q2, which it reaches after 3 units (d) Q2, which it reaches after 1 unit.
- **M5.** After `dup2(fd[1], 1); close(fd[1]);`, the process's write end of the pipe is: (a) closed (b) still open, through fd 1 (c) open through fd 1 and fd 4 (d) invalid.
- **M6.** `open("/tmp/f", O_RDONLY)` is called on an existing FIFO that no process has open for writing. It: (a) returns at once (b) blocks until some process opens it for writing (c) returns −1 with `ENXIO` (d) creates the FIFO.
- **M7.** Process A sends to a POSIX queue, in this order: "x" (priority 2), "y" (5), "z" (2), "w" (5). B then calls `mq_receive` three times. What does B get?
- **M8.** In `sem_init(&s->lock, 1, 1)`, what does each `1` mean? What happens to this program on macOS?
- **M9.** A freshly started server calls `server_listen(5000)` and then `server_accept` twice. Which descriptor numbers do L, C1 and C2 get, and which of them carry conversation bytes?
- **M10.** In the turnstile readers–writers, the writer is changed to `wait(turnstile); post(turnstile); wait(board); …` (Variant A). Is it correct, fair, alive? Is it a deadlock?

---

## 8. Answer key

> **Every answer below was checked by script** (✅); the scripts are listed at the end of this section.
> - **Fork outputs:** every interleaving of the process graph was enumerated, and the real C programs were also run 150× in a pseudo-terminal.
> - **Schedules:** a simulator that first reproduces all 13 slide examples.
> - **Semaphores:** every interleaving under the slides' own `wait`/`post` rules.
> - **Pipes:** real processes with timeouts, plus a descriptor-table model.
> - **Servers:** a timing model that reproduces S11-p3 and S11-p12.

### Part A

**Q1** ✅ (3 distinct outputs; 4 processes)
```
P   ●─X─● fork1 ─────────────● fork2 ─Z─●
           │                    │
C2         │                    └─Z─●                 (P's 2nd fork)
C1         └─Y─● fork2 ─Z─●                           (fork1 → 0; the if controls ONLY printf("Y"))
                  │
C3                └─Z─●                               (C1's 2nd fork)
```
- (b) **4 processes** (P, C1, C2, C3) and **6 lines** (X, Y, Z × 4). The `if` has no braces, so the second `fork()` runs in both P and C1 [S16-p11 trap].
- (c) **X Y Z Z Z Z · X Z Y Z Z Z · X Z Z Y Z Z.**
- (d) **No.** Y comes before C1's own Z and before C3's Z (C3 is forked after Y), so at most two Z's (P's and C2's) can precede Y. It works like Program A's "each B unlocks its C's" [S03-p5].

**Q2** ✅ (3 outputs; 3 processes)
```
P   ●─A─● fork ───────────────────────● waitpid(c) ┄┄─"E3"─●
          │                              ┆  (waits for C1's exit only)
C1        └─B─● fork ─D─● exit(3) ┄┄┄┄┄┄┄┘
                 │
C2               └─C─● exit(0)                (nobody waits for C2)
```
- (b) **3 processes.**
- (c) **A B C D E3 · A B D C E3 · A B D E3 C.** The constraints are A < B < D < exit(C1) < E3 and B < C; C is free relative to D and E3.
- (d) **No.** `E3` needs C1's exit, which comes after D.
- (e) `WEXITSTATUS(st)` = 3, because C1 called `exit(3)`.
  - (i) If C2 exits while C1 is still alive, C2 is a **zombie** (C1 never waits). It stays one until C1 exits, then it is adopted by **PID 1**, which reaps it: "If a parent never calls wait, its terminated children remain zombies until the parent exits. They are then adopted by PID 1" [S03-p3].
  - (ii) If C1 has already exited, C2 is an **orphan** adopted by PID 1, which reaps it [S03-p8].
  - `waitpid(c)` bought one ordering, P vs C1, and nothing about the grandchild [S03-p7].

**Q3** ✅ (4 processes; 5 lines; 25 distinct legal orders)
```
P   ●─k=0─● fork(i=0) ────────────────● fork(i=1) ──────"end k=0"─●
              │                           │
C2            │                           └─k=1─● execlp echo ══ "E" ─●
C1            └─k=1─"k=1"─● fork(i=1) ─"end k=1"─●
                             │
C3                           └─k=2─● execlp echo ══ "E" ─●
```
- (a) **4 processes.** C1 = P's child at i = 0; C2 = P's child at i = 1; C3 = C1's child at i = 1. C2 and C3 exec `echo`.
- (b) The prints:
  - P: `end k=0`;
  - C1: `k=1`, `end k=1`;
  - C2: `E`;
  - C3: `E`.
  - **5 lines.** The exec'ing children never print `k=` or `end`: exec never returns on success [S03-p10].
- (c) Legal or not:
  - (i) **legal**;
  - (ii) **illegal**: C3's `E` needs C1's second fork, which comes after C1 prints `k=1`, so at most one `E` (C2's) can precede `k=1`;
  - (iii) **illegal**: C1 prints `k=1` before `end k=1`;
  - (iv) **legal**.
- (d) The exec **fails and returns**, so the failure path runs [S03-p10]:
  - C2 prints `k=1` and `end k=1`;
  - C3 prints `k=2` and `end k=2`;
  - P prints `end k=0`; C1 prints `k=1` and `end k=1`.
  - So **7 lines** (k=1 × 2, k=2, end k=0, end k=1 × 2, end k=2), and **still 4 processes**: at i = 1 the loop ends right after. ✅ All 140 orders have exactly these 7 lines.

### Part B

**Q4: RR, q = 3** ✅
```
| P1 | P2 | P3 | P4 | P5 | P1 |P2| P3 | P5 |P1| P3 |
0    3    6    9    11   14   17 18   21   23 24   27
```

| Job | Burst | First run | Completion | TAT | WT = TAT − burst | RT |
|---|---|---|---|---|---|---|
| P1 | 7 | 0 | 24 | 24 | 17 | 0 |
| P2 | 4 | 3 | 18 | 18 | 14 | 3 |
| P3 | 9 | 6 | 27 | 27 | 18 | 6 |
| P4 | 2 | 9 | 11 | 11 | 9 | 9 |
| P5 | 5 | 11 | 23 | 23 | 18 | 11 |
| **avg** | | | | **103/5 = 20.6** | **76/5 = 15.2** | **29/5 = 5.8** |

- (a) **The tricky moments:** P4 needs only 2, so it leaves at 11 with a short slice. P2's last slice is 1 unit (17–18), P5's is 2 (21–23) and P1's is 1 (23–24).
- (c) **Against FCFS and SJF:**
  - FCFS (P1…P5): average RT **12**, average TAT 17.4.
  - SJF (P4, P2, P5, P1, P3): average RT **37/5 = 7.4**, average TAT **12.8**.
  - RR wins on **response** (5.8), and SJF wins on **turnaround** (12.8): "higher average turnaround than SJF, but better response" [S05-p14].
- (d) **The wait bound:** (n − 1)q = 4 × 3 = **12**. The longest wait between turns is **11** (P1 from 3 to 14, P2 from 6 to 17), so it holds.
  - **The shortcut:** P1 waited through 7 slices, and 7 × 3 = 21 ≠ its true WT of **17**. Some slices it waited through were shorter than q (P4's 2, P2's 1, P5's 2).
  - So use **WT = TAT − burst** [S05-p16 ⚠️].
- (e) ⌈7/q⌉ pieces and ⌈7/q⌉ − 1 switches: q = 2 → **3**, q = 3 → **2**, q = 8 → **0** [S05-p15].

**Q5: SRTF** ✅ (no ties)
```
| P1 |   P2   |  P4  | P1 |   P5   |     P1     |        P3        |
0    1        4      6    7        10           14                 22
```
- **Decisions at each event:**
  - t = 0: only P1 (6).
  - t = 1: P2 (3) < P1 (5 left), so it **preempts**.
  - t = 2: P3 (8) > P2 (2 left), so **no preemption**.
  - t = 4: P2 is done and P4 (2) arrives; ready are P1 5, P3 8, P4 2 → P4 runs.
  - t = 6: P1 (5) beats P3 (8).
  - t = 7: P5 (3) < P1 (4 left), so it **preempts**.
  - t = 10: P1 (4) runs, then P3 from 14.

| Job | Arr | Burst | First run | C | TAT | WT | RT |
|---|---|---|---|---|---|---|---|
| P1 | 0 | 6 | 0 | 14 | 14 | 8 | 0 |
| P2 | 1 | 3 | 1 | 4 | 3 | 0 | 0 |
| P3 | 2 | 8 | 14 | 22 | 20 | 12 | 12 |
| P4 | 4 | 2 | 4 | 6 | 2 | 0 | 0 |
| P5 | 7 | 3 | 7 | 10 | 3 | 0 | 0 |
| **avg** | | | | | **42/5 = 8.4** | **20/5 = 4** | **12/5 = 2.4** |

- (c) **P3 at t = 2:** it needs 8, but P2 has only 2 left. A newcomer preempts only if it is strictly shorter (like P4 vs P1 on [S05-p9]).
- (d) **Non-preemptive SJF:** `P1 0–6 | P4 6–8 | P2 8–11 | P5 11–14 | P3 14–22`.
  - At t = 8, P2 and P5 both need 3; P2 arrived first, so it goes first.
  - WT 0, 7, 12, 2, 4 → **25/5 = 5**; TAT **47/5 = 9.4**.
  - **What preemption bought:** average WT fell from 5 to 4 and TAT from 9.4 to 8.4. The short late arrivals (P2, P4, P5) jump ahead, and **P1 pays**: its WT rose from 0 to 8. The long job P3 waits 12 either way.

### Part C

**Q6** ✅ (model + real run: fds 3, 4 and 5/5; output identical to the shell's `sort < names.txt | uniq -c > counts.txt`)
- (a) `pipe` → **3 and 4**, the lowest free numbers [S10-p8]. A's `open` → **5**; B's `open` → **5** as well, because each child has its own table and 0–4 are taken.
- (b) The tables:

| Process / moment | fd 0 | fd 1 | fd 2 | fd 3 | fd 4 | fd 5 |
|---|---|---|---|---|---|---|
| A after `open` | tty | tty | tty | R | W | names.txt |
| A after `dup2(in,0)` and `dup2(p[1],1)` | **names.txt** | **W** | tty | R | W | names.txt |
| A after its 3 closes → **sort** | names.txt | W | tty | – | – | – |
| B after `open` | tty | tty | tty | R | W | counts.txt |
| B after `dup2(p[0],0)` and `dup2(out,1)` | **R** | **counts.txt** | tty | R | W | counts.txt |
| B after its 3 closes → **uniq -c** | R | counts.txt | tty | – | – | – |
| parent after its 2 closes | tty | tty | tty | – | – | – |

- (c) **One**: A's fd 1 (sort's stdout). When `sort` exits, `uniq`'s `read` returns 0, so it writes its counts and exits.
- (d) Only **B's `close(p[1])`** or **the parent's `close(p[1])`** hangs the program ✅ (each of the 8 deletions was tried on real processes):
  - Missing in B: `uniq` holds a write end itself, so it sleeps in `read(0)` for ever, and the parent sleeps in `waitpid(b)`.
  - Missing in the parent: the parent holds a write end while it waits in `waitpid(b)`, and `uniq` waits for an EOF that needs the parent's close. That is a circle.
  - The other six are harmless. Read ends never matter; A's extra write end dies with `sort`; and `close(in)` / `close(out)` only leave an extra file ticket [Lab1-p11 rule].
- (e) **On the terminal.** `perror` writes to fd 2, which was never redirected [Lab A7].

**Q7** ✅ (as printed it hangs; with the fix it prints the same byte count as `ls | sort -r | wc -c`)
- Descriptors: p = 3/4, q = 5/6.
- **sort's table:** 0 = pR, 1 = qW, and **4 = pW, never closed**.
- **ls's table:** 1 = pW, plus 5 = qR and 6 = qW.
- (a) **`sort` sleeps in `read(0)`** on pipe p. It never gets EOF, because **it holds a write end of p itself**: its own **fd 4** (`p[1]`), inherited at fork and kept through exec [S06-p9, p17].
  - **The parent sleeps in `read(q[0])`.** `sort` holds q's write end (its fd 1) and can't print anything before EOF ("cannot print anything until it has seen EOF" [Lab C1]).
  - `ls` has already exited; it is a zombie until the parent's `wait`.
- (b) **No.** `ls` exits on its own, which closes its fds 5 and 6. A leftover write end matters only when its holder stays alive while the reader waits [Lab1-p11, C2].
- (c) **Add `close(p[1]);` in child 2** before `execlp`, so the child closes all four ends.
- (d) **Small output: still works.** Everything fits in pipe q, so `sort` finishes and both `wait`s return.
  - **With 200 KB: it hangs.** `sort` fills q (64 KiB) and blocks in `write`, while the parent sits in `wait` and never reads [Lab D2].
  - ✅ 3 893 B worked; 168 894 B hung.

### Part D

**Q8** ✅ (all 12-letter runs enumerated)
- (a) **4 arrows in a cycle:** X(1st)→Y, Y→X(2nd), X(2nd)→Z, Z→X(1st). That means **4 semaphores**: `sXY = sYX = sXZ = 0` and **`sZX = 1`**, because the first X goes first and a cycle needs exactly one flag [S13-p6, p8].
- (b) The code:
```
P1: loop { wait(sZX); print("X"); post(sXY); wait(sYX); print("X"); post(sXZ) }
P2: loop { wait(sXY); print("Y"); post(sYX) }
P3: loop { wait(sXZ); print("Z"); post(sZX) }
```
  Only `X Y X Z X Y X Z …` can be printed, and there is no deadlock ✅.
- (c) **`sZX = 0`:** nothing is printed; all three sleep at their first `wait`. **`sZX = 2`:** two flags circulate, so wrong orders appear, e.g. `X Y X X Y X Z …` ✅. ⭐ "In a cycle, the start values are the whole puzzle."
- (d) Sharing:
  - **X→Y with X→Z: never.** They have different receivers. P3 can steal the flag meant for P2 (`X Z`, then everybody sleeps), or P2 can steal the one meant for P3 (`X Y X Y`, then everybody sleeps) ✅ [S13-p8 "never"].
  - **Y→X with Z→X: allowed, but prove it first.** Same receiver (P1), different senders. With one `back = 1`: when P1 waits before its 2nd X, only P2 can post (P3 still waits for the X→Z flag); before the next 1st X, only P3 can post (P2 waits for the next X→Y). So there is never more than one flag, and it always comes from the right sender ✅ (3 semaphores).

**Q9** ✅ (6 of 120)
- (a) **A B C D E · A B C E D · C D A B E · C D A E B · C D E A B · C E D A B.**
  - Rules: A < B and C < D (program order).
  - **The key:** A–B can't be split by C or D, and C–D can't be split by A or B.
  - **The signal:** E comes after C.
  - **The trap:** P3 never takes the key, so E can land between C and D, or between A and B.
- (b) `A C B D E`: C needs the key, which P1 holds from A to B. `E C D A B`: E needs the flag in `s`, which is posted only after C.
- (c) The trace table:

| # | who | operation | mutex | s | sleeping | output |
|---|---|---|---|---|---|---|
| 0 | | (start) | 1 | 0 | — | |
| 1 | P2 | wait(mutex) | 0 | 0 | — | |
| 2 | P2 | print("C") | 0 | 0 | — | C |
| 3 | P2 | post(s) | 0 | 1 | — | C |
| 4 | P2 | print("D") | 0 | 1 | — | C D |
| 5 | P2 | post(mutex) | 1 | 1 | — | C D |
| 6 | P1 | wait(mutex) | 0 | 1 | — | C D |
| 7 | P1 | print("A") | 0 | 1 | — | C D A |
| 8 | P3 | wait(s) | 0 | 0 | — | C D A |
| 9 | P3 | print("E") | 0 | 0 | — | C D A E |
| 10 | P1 | print("B") | 0 | 0 | — | C D A E B |
| 11 | P1 | post(mutex) | 1 | 0 | — | C D A E B |

  E lands inside P1's critical section: ⭐ "A lock keeps out only those who also use it" [S13-p10].

### Part E

**Q10** ✅ (traced with the slide rules; FIFO wake isn't needed, since at most one customer ever sleeps on `barber`)
- (a) The table:

| step | who | operation | waiting | customers | barber | mutex | sleeping |
|---|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 0 | 0 | 1 | — |
| 1 | Barber | wait(customers) | 0 | 0 | 0 | 1 | Barber |
| 2 | C1 | arrives | 1 | 0 | 0 | 1 | C1 · Barber wakes |
| 3 | C2 | arrives | 1 | 0 | 0 | 1 | C1 · **C2 leaves** |
| 4 | Barber | next! | 0 | 0 | 0 | 1 | — · C1 wakes |
| 5 | C3 | arrives | 1 | 1 | 0 | 1 | C3 |
| 6 | C4 | arrives | 1 | 1 | 0 | 1 | C3 · **C4 leaves** |
| 7 | Barber | wait(customers), next! | 0 | 0 | 0 | 1 | — · C3 wakes |
| 8 | C5 | arrives | 1 | 1 | 0 | 1 | C5 |
| 9 | Barber | wait(customers), next! | 0 | 0 | 0 | 1 | — · C5 wakes |
| 10 | Barber | wait(customers) | 0 | 0 | 0 | 1 | Barber |

- (b) **C2 and C4 leave;** the haircuts go **C1, C3, C5**.
  - **Why C2 leaves:** C1 is still counted in `waiting` until the barber's "next!" decrements it (step 4). At step 3, `waiting == CHAIRS` (1 == 1), even though the barber is awake.
  - **Why `customers` differs:** at step 2 it stays 0, because C1's post was handed to the sleeping barber. At step 5 nobody sleeps on `customers`, so the flag stays in the hole (1) [S14-p15 explains the same pattern].
- (c) **The forgotten `post(mutex)`:**
  - Step 3: C2 leaves **holding the key** (mutex 0).
  - Step 4: the barber's `wait(mutex)` sleeps, with `waiting` still 1.
  - Step 5: C3 sleeps on `mutex`.
  - C1 sleeps on `barber` for ever, and every later customer sleeps on `mutex` ✅.
  - **The classic mistake** is "a forgotten post on an error path"; the fix is "every way out of the critical section posts". ⭐ "When a process dies holding the key, the key dies with it" [S12-p12].
- (d) **Correct: yes.** `board` still keeps the writer away from readers ✅ (all interleavings with W + 2 readers). **Fair or alive: no.** It can **stop**, in 3 steps:

| step | who | operation | readers | turnstile | board | mutex | sleeping |
|---|---|---|---|---|---|---|---|
| 0 | | (start) | 0 | 1 | 1 | 1 | — |
| 1 | R1 | `wait(mutex); readers=1; first → wait(board); post(mutex)` | 1 | 1 | 0 | 1 | — |
| 2 | W | `wait(turnstile); wait(board)` | 1 | 0 | 0 | 1 | W (board) |
| 3 | R1 | `wait(turnstile)` | 1 | 0 | 0 | 1 | W, R1 (turnstile) |

  - **The circle:** W waits for `board`, which only the last reader out (R1) can post; R1 waits for `turnstile`, which W holds.
  - R1 is "holding one thing while waiting for another" [S14-p11]: it took the board and counted itself in **before** passing the gate. Every later reader also sleeps at the gate.
  - **Fix:** pass the gate first, as on S14-p8. Variant B [S14-p10] fails the same circle test ✅.

### Part F

**Q11** ✅ (timing model; it reproduces S11-p3 and S11-p12 exactly)
- (a) `socket` → `bind` → `listen` → **`accept` (sleeps)** → **`read` (sleeps)** / `write` → `close`. With net.h, `setsockopt(SO_REUSEADDR)` sits between `socket` and `bind` [S10-p9, net.h].
- (b) Reply times (seconds after each client connected):

| Design | A | B | C | D | E | All done | Processes at busiest |
|---|---|---|---|---|---|---|---|
| 1 · one at a time | 2 | 4 | 5 | 6 | 5 | 10 s | 1 |
| 2 · process per client | 2 | 2 | 2 | 2 | 2 | 7 s | 4 (1 + A, B, C at t = 1) |
| 3 · pool of 2 | 2 | 2 | 3 | 2 | 2 | 7 s | 3 (1 + 2) |

  - **Design 1:** A 0–2, B 2–4, C 4–6 (connected at 1, so 5 s), D 6–8 (6 s), E 8–10 (5 s). Waiting clients sit **connected** in the listen queue.
  - **Pool of 2:** A and B hold both workers from 0 to 2. C (queued since 1) and D start at 2 → 3 s and 2 s. E starts at 5 → 2 s.
- (c) **Yes, two clients can get the same number.** `visitors = visitors + 1` is LOAD–ADD–STORE, and two children really run at the same time, so this is the **Week 4 lost update** [S08-p13]. **Fix B** [S11-p10]: guard the increment (and the read of the number) with a semaphore (start 1) in shared memory. **Fix A**: count in the parent before `fork`.
- (d) **Design 4 (select/poll).** It is one process, so the counter is shared "for free" with no semaphore ("only one thing runs at a time"), and short messages avoid its danger, that one slow step blocks everybody [S11-p13, p14]. Design 2 would need shared memory + a semaphore.

### Part G
- **M1** **(b) a zombie**; `ps` shows `Z` / `<defunct>` [S16-p16, S03-p3].
- **M2** Signals are **unqueued**: several children dying together may produce one SIGCHLD, so the loop reaps every finished child. SIGCHLD is **17**, default **ignore** [S03-p17].
- **M3** **143** = 128 + 15: killed by **SIGTERM** (a plain `kill`). **141** = 128 + 13: killed by **SIGPIPE**, i.e. it wrote to a pipe that nobody reads [S04-p3, Lab A4].
- **M4** **(c)**: 1 unit in Q0, 2 in Q1, then the last 2 in Q2 ✅.
- **M5** **(b)**: ticket 1 still points at the write end's bookmark [Lab D3, S06-p15].
- **M6** **(b)**: `open` is the handshake. (−1/`ENXIO` is the `O_WRONLY | O_NONBLOCK` case) [S07-p5].
- **M7** **y (5), w (5), x (2)**: highest priority first, ties in send order; `z` stays in the queue ✅ [S08-p7].
- **M8** The first `1` = **pshared**, shared between processes. The second `1` = the **start value**, "open", which makes it a mutex. On macOS `sem_init` fails ("not implemented"); the program doesn't check, so it runs **without locking** and prints wrong counts [S09-p11, p12].
- **M9** **L = 3, C1 = 4, C2 = 5** (the lowest free numbers). Only **C1 and C2** carry conversation bytes; L only receives new calls [S10-p8].
- **M10** **Correct, but not fair.** The gate is open while the cook waits, so readers keep entering and the cook can starve on `board`. Everyone else keeps moving, so it is **starvation, not deadlock** [S14-p10].

### How the answers were verified
Scratch folder: `/private/tmp/claude-501/-Users-azim-study/468fccec-2f2b-4caa-a9e8-8864ad43a510/scratchpad/os_review_agent/`

| Script | What it checks | Validated first on |
|---|---|---|
| `forkenum.py` | every interleaving of a fork/wait/exec program (= every topological order of its graph) | S16-p8 (2), S16-p10 (5), S16-p11 (28), S03-p5 (3), S03-p7 Ex 1 (1), the notes' practice P1 (6) |
| `c/runpty.py` + `c/f1.c`–`f3.c` | real runs, 150 each, in a pseudo-terminal; every observed output lies inside the enumerated set | — |
| `sched.py`, `mock_sched.py` | FCFS, SJF, SRTF, priority (both kinds), RR and MLFQ, with tie detection | all 13 S05 examples (incl. S05-p11 = 12) and the notes' MLFQ practice |
| `semsim.py`, `mock_sem.py`, `mock_classic.py` | every interleaving under the slides' wait/post rules; deadlock detection; trace tables | S09-p7 (2/6/0), S09-p8, S09-p9, S09-p10, S12-p5 (4), S13-p6 (1/64/0), S13-p8, S13-p9 (4), S13-p12; the traces of S09-p6, S12-p10, S13-p4, S14-p6 |
| `fdmodel.py`, `c/q6.c`, `c/q7.c` | descriptor tables; real processes with each `close` deleted, under a timeout | the Lab B1 rule |
| `servers.py` | reply times for designs 1–3 | S11-p3 (2/4/6), S11-p12 (all four rows) |
| `verify_all.py` → `verification_log.txt` | every mock answer above: **48 / 48 PASS** | — |

---

## 9. Last-48-hours checklist

**Plan**
- **Day −2:** §1(a)–(c), then the mock Parts A–C on paper, timed.
- **Day −1:** §1(d)–(f), Parts D–G, and §6 (traps).
- **Exam morning:** this list only.
- For every item you can't do from memory, re-read the slide in brackets.

- [ ] **I can** draw the process graph of a short fork program (horizontal = process, vertical = fork, dashed = wait), count its processes (2ⁿ for straight forks) and lines, and **list every** output using the Golden Rule [S03-p4, S16-p9].
- [ ] **I can** apply the Three Rules (Starting Line, Photocopy, Dual Path), spot the brace trap, and say what each process prints with *its own* copy of the variables [S03-p2, S16-p8, p11].
- [ ] **I can** explain what `wait`/`waitpid` order (you vs **one** child; `wait` returns whoever finishes), decode the status with `WIFEXITED`/`WEXITSTATUS`/`WIFSIGNALED`, and explain `ECHILD`/`EINTR`, `WNOHANG = 1` and `WUNTRACED = 2` [S03-p7, S16-p13–p15].
- [ ] **I can** define zombie vs orphan, say what `ps` shows (`Z`, `<defunct>`) and who reaps an orphan (PID 1) [S16-p13, S03-p3, p8].
- [ ] **I can** explain exec (it replaces code, data, heap and stack, keeps the PID and fds, and never returns on success), the l/v/p naming, and the failure-path line [S03-p10–p12].
- [ ] **I can** trace a signal program [S17-p4–p8, S03-p13–p19, S02-p10]:
  - dispositions (handler / `SIG_IGN` / `SIG_DFL`) and the I-C-H-R steps;
  - default actions and the Linux numbers (2, 3, 9, 11, 15, 17, 19, 20);
  - what a forked child inherits;
  - `SA_RESTART` vs `EINTR`;
  - the SIGCHLD `while` loop.
- [ ] **I can** decode `$?` (0 / 1 / 126 / 127 / 128 + N: 130, 137, 139, 141, 143), and explain `( )` vs `{ }`, `export`, process groups, `kill -INT -PGID` and job control (`&`, Ctrl-Z, `jobs`, `bg`, `fg`, `%n`) [S04-p3–p7].
- [ ] **I can** draw a Gantt chart and compute TAT, WT and RT for FCFS, SJF, SRTF, priority (both kinds), RR (any q, including short slices) and the slide's 3-level MLFQ. I can also quote the convoy effect, starvation and aging, and RR's response-vs-turnaround trade-off, and I know S05-p11 really averages **12** [S05-p4–p17].
- [ ] **I can** draw fd tables after `pipe`, `fork`, `open`, `dup2`, `close` and `exec` with the lowest-free-number rule, and count the write ends of each pipe [S06-p5–p17, S10-p8, Lab1-p11].
- [ ] **I can** state the pipe rules and the Sacred Rule from memory [S06-p9–p11]:
  - EOF only when every write end is closed, including the reader's own;
  - a write into a full pipe blocks;
  - writing with no reader → SIGPIPE (141) or −1/EPIPE.
- [ ] **I can** write dup2 → close → exec for `>`, `<` and `a | b`, and count forks, `pipe()` calls, fds and `waitpid`s for an N-stage pipeline [S06-p17, Lab B1–B3, D8].
- [ ] **I can** take a hanging pipe program and say who is blocked in which call and why (a leftover write end, a close placed after `waitpid`, a full pipe, a buffered filter, crossed FIFO opens), then fix it with one line [§1(c), Lab A2, B1, C1, D2, D6].
- [ ] **I can** use the FIFO `open()` table (handshake, `O_NONBLOCK`/`ENXIO`, `O_RDWR` never sees EOF), and compare pipe / FIFO / POSIX / System V queues: who orders, what survives, EOF [S07-p5, S08-p7, p8].
- [ ] **I can** show the lost update in a LOAD/ADD/STORE table, list the four properties of a correct lock, and explain why a busy flag fails while a mutex works [S08-p12–p17].
- [ ] **I can** trace any `wait`/`post` sequence in the S13-p2 table form (a post to a sleeper keeps the value), and choose start values: lock 1, signal 0, limit N, rendezvous 0/0, buffer N/0/1, barrier with a shadow counter, ping-pong 1/0 [S12-p3, S13-p2, p4].
- [ ] **I can** turn a precedence graph into semaphores (one per arrow, exactly one flag in a cycle), argue when two arrows may share one, and list every output of a key + signal program, including the "a lock keeps out only those who also use it" trap [S09-p9, p10, S13-p7–p10].
- [ ] **I can** write the trio from memory (place first, then key; post in the mirror order), show the swapped-waits deadlock in 4 rows, and match the six classic mistakes to their symptoms and fixes [S12-p10, p12, S13-p12, p14].
- [ ] **I can** write the lightswitch and the turnstile, explain starvation (24 reads, 0 writes, 10.0 s) vs deadlock, judge a moved line with "correct, fair, alive" and the circle test, and explain "category first, place second" [S14-p5–p11].
- [ ] **I can** write the sleeping barber, answer its three questions, fill a barber trace (who balks, the haircut order, why `waiting` still counts the customer until "next!"), and explain the swapped-lines deadlock (exit 124, state `S`) [S14-p12–p16].
- [ ] **I can** handle sockets and servers [S10-p5–p15, S11-p2–p14]:
  - the call order, and which calls sleep;
  - L vs C descriptors (3, 4, 5) and framing;
  - `Connection refused` / `Address already in use`;
  - reply times for designs 1–3;
  - fixing Servers X/Y/Z and the visitor counter;
  - justifying a design with the S11-p14 table.

> Before the exam: check eClass for the exact day, time and room. Do HW2 yourself (due Sat 24 Oct 23:55): it is oral-checked, and this file deliberately leaves it unsolved. If you type any slide code, re-read §6.2–§6.3 first.
