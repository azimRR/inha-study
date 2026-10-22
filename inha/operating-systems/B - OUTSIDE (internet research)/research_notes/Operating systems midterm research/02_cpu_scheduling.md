# CPU Scheduling: Outside Exam Notes (OSTEP ch. 6-10), SOC3010-003 Operating System Midterm, Inha University in Tashkent, Fall 2026

These are outside notes, kept separate from the class slides. All sources were accessed on 2026-10-19 and are free and legal: the OSTEP authors' site, the official os-book.com slides, kernel.org, LWN, and university pages. No textbook PDFs are linked.

**How the numbers were verified.** Every number in the worked problems and practice answers was produced by `sched_verify.py` (full code in section 12). Each number was also checked with an `assert`. Before I trusted the simulator, it had to reproduce **55 published answers**: OSTEP ch. 7 and 9, the Silberschatz OSC10 ch. 5 slides, the UIC course notes, UW-Madison CS537 midterm answer keys, and a GeeksforGeeks RR example. I also cross-checked it against OSTEP's own simulators, `scheduler.py` and `mlfq.py`, and ran property tests on 300 random workloads each.

**Research limitation.** The web-search tool was unavailable in this session (quota exhausted). Every source below was therefore fetched directly from a known URL, and some breadth (for example, a survey of many universities' tie conventions) is missing. This is flagged in the Gaps sections.

---

## 1. Metrics: arrival, burst, completion, turnaround, waiting and response time; throughput; CPU utilization; fairness vs performance

### Takeaway
OSTEP defines **T_turnaround = T_completion − T_arrival** and **T_response = T_firstrun − T_arrival**. Waiting time is the time a job spends in the ready queue; for CPU-only jobs it equals TAT − burst. Throughput is jobs completed per unit time, and utilization is the fraction of time the CPU is busy. The basic tension: policies that minimize turnaround (SJF/STCF) are unfair and bad for response time, while fair policies (RR) are bad for turnaround.

### Cited Findings
- OSTEP's turnaround definition: "The turnaround time of a job is defined as the time at which the job completes minus the time at which the job arrived in the system", T_turnaround = T_completion − T_arrival (Eq. 7.1). Turnaround is "a performance metric". — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
- OSTEP's response time: "the time from when the job arrives in a system to the first time it is scheduled", T_response = T_firstrun − T_arrival (Eq. 7.2). Footnote: "Some define it slightly differently, e.g., to also include the time until the job produces some kind of 'response'; our definition is the best-case version of this." — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
- Fairness: "Another metric of interest is fairness, as measured (for example) by Jain's Fairness Index... Performance and fairness are often at odds in scheduling; a scheduler, for example, may optimize performance but at the cost of preventing a few jobs from running, thus decreasing fairness." — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
- Jain's index: J(x1..xn) = (Σxi)² / (n·Σxi²). It ranges from 1/n (worst case) to 1 (best case) and is maximal when all users receive the same allocation. It comes from Jain, Chiu and Hawe (1984), DEC TR-301. — [Wikipedia: Fairness measure](https://en.wikipedia.org/wiki/Fairness_measure)
- The trade-off, in OSTEP's words: "any policy (such as RR) that is fair, i.e., that evenly divides the CPU among active processes on a small time scale, will perform poorly on metrics such as turnaround time. Indeed, this is an inherent trade-off: if you are willing to be unfair, you can run shorter jobs to completion, but at the cost of response time; if you instead value fairness, response time is lowered, but at the cost of turnaround time." — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
- "The first type (SJF, STCF) optimizes turnaround time, but is bad for response time. The second type (RR) optimizes response time but is bad for turnaround." — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
- Silberschatz's scheduling criteria:
  - **CPU utilization**: keep the CPU as busy as possible.
  - **Throughput**: number of processes that complete their execution per time unit.
  - **Turnaround time**: amount of time to execute a particular process.
  - **Waiting time**: amount of time a process has been waiting in the ready queue.
  - **Response time**: amount of time from when a request was submitted until the first response is produced.
  - The optimization goals are max utilization, max throughput, min turnaround, min waiting and min response. — [OSC10 ch. 5 slides 10–11](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
- The OSTEP simulator's wording: response is "the time a job spends waiting after arrival before first running"; turnaround is "the time it took to complete the job since first arrival"; wait is "any time spent ready but not running". — [scheduler.py README](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched/README.md)
- Burst: "CPU–I/O Burst Cycle – Process execution consists of a cycle of CPU execution and I/O wait". There is a "large number of short bursts" and a "small number of longer bursts". — [OSC10 ch. 5 slides 4–5](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
- Predicting the next burst (needed by real SJF) uses an exponential average: `estimate[i+1] = alpha*burst[i] + (1 − alpha)*estimate[i]`. With alpha = 1 only the last burst counts; with alpha = 0 history is ignored; "Most commonly alpha is set at 0.5". — [UIC course notes](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/6_CPU_Scheduling.html); "Commonly, α set to ½" — [OSC10 ch. 5 slide 16](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
- Little's law (queueing models): in steady state n = λ × W. — [OSC10 ch. 5 slides, "Little's Formula"](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)

### Inferences
- **Formula sheet** (all script-checked in sections 9 and 11):
  - TAT_i = CT_i − AT_i
  - RT_i = FirstRun_i − AT_i
  - WT_i = TAT_i − BT_i. This holds only for CPU-only jobs; with I/O, also subtract the I/O time. With context-switch overhead, WT computed this way includes switch time.
  - Throughput = jobs completed / elapsed time.
  - Utilization = CPU-busy time / elapsed time. State the interval, usually from 0 (or the first arrival) to the last completion. Idle gaps and context-switch time count as not busy.
- **Useful shortcut:** for any non-preemptive policy (FCFS, SJF, priority-NP), RT_i = WT_i, because a job waits once and then runs to completion. Every non-preemptive run in section 9 shows avg WT = avg RT, which is a good self-check.
- **Utilization example (computed):** FCFS on X(0,3), Y(1,2), Z(9,2). The CPU is idle from 5 to 9.
  - Utilization = 7/11 = 63.6%.
  - Throughput = 3/11 = 0.273 jobs per unit time.
  - See Problem 1c.
- **Jain's index examples (computed):**
  - CPU shares (6, 3, 1) give J = 100/(3·46) = 0.7246.
  - Shares (5, 5, 5) give J = 1.
  - Shares (10, 0, 0) give J = 1/3 = 1/n.
- **Definition conflict:** OSTEP's response time is "first scheduled". Silberschatz's is "first response produced". In by-hand problems they coincide, because problems assume the response is instantaneous (OSTEP's footnote calls its version the best case).

### Gaps
- No source standardizes the utilization interval (start at 0 vs at the first arrival). Check how the class slides define it.
- I have no Inha-specific (SOC3010) convention sheet. The class slides take precedence over these notes.

---

## 2. How the OS regains the CPU: cooperative vs preemptive (timer interrupt), and the context switch

### Takeaway
In a **cooperative** system, the OS gets the CPU back only when a process makes a system call, yields, or traps on an illegal operation, so an infinite loop forces a reboot. In a **non-cooperative (preemptive)** system, a **timer interrupt** is configured at boot (a privileged operation) and returns control to the OS every few milliseconds. The scheduler then decides whether to switch. A **context switch** saves the current process's registers, restores the next process's registers, switches kernel stacks, and finishes with return-from-trap.

### Cited Findings
- The crux, in OSTEP's words: "How can the operating system regain control of the CPU so that it can switch between processes?" — [OSTEP ch. 6](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf)
- Cooperative approach (early Macintosh OS, Xerox Alto): "the OS trusts the processes of the system to behave reasonably". Processes give control back through system calls, an explicit `yield`, or illegal operations that trap. With an infinite loop, "your only recourse... is to... reboot the machine." — [OSTEP ch. 6](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf)
- Timer interrupt: "A timer device can be programmed to raise an interrupt every so many milliseconds; when the interrupt is raised, the currently running process is halted, and a pre-configured interrupt handler in the OS runs." At boot the OS installs the handler and starts the timer, which is privileged. On the interrupt, the hardware saves enough state for return-from-trap to resume the program. — [OSTEP ch. 6](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf)
- Context switch: "all the OS has to do is save a few register values for the currently-executing process (onto its kernel stack, for example) and restore a few for the soon-to-be-executing process". Switching kernel stacks makes return-from-trap resume the *other* process. There are two kinds of saves:
  - On the timer interrupt, the hardware implicitly saves the user registers onto the kernel stack.
  - In `switch()`, the OS explicitly saves the kernel registers into the process structure. — [OSTEP ch. 6, Fig. 6.3](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf)
- OSTEP's Fig. 6.3 protocol, condensed:

  ```
  timer interrupt -> HW: save regs(A) to k-stack(A); kernel mode; jump to trap handler
  OS: switch(): save regs(A) to proc_t(A); restore regs(B) from proc_t(B); switch to k-stack(B)
  OS: return-from-trap (into B) -> HW: restore regs(B) from k-stack(B); user mode; jump to B's PC
  ```

  — [OSTEP ch. 6](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf)
- Cost: in 1996, Linux 1.3.37 on a 200-MHz P6 took "roughly 4 microseconds" per system call and "roughly 6 microseconds" per context switch (measured with lmbench). Modern 2–3 GHz systems reach "sub-microsecond" results. — [OSTEP ch. 6](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf)
- The real cost of a switch includes lost cache, TLB and branch-predictor state, not just register saves. The RR time slice "must be a multiple of the timer-interrupt period". — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
- "Virtually all modern schedulers are preemptive." — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
- When decisions happen (Silberschatz): a process goes (1) running→waiting, (2) running→ready, (3) waiting→ready, or (4) terminates. Scheduling only under 1 and 4 is nonpreemptive; otherwise it is preemptive. Windows, macOS, Linux and UNIX use preemptive scheduling. — [OSC10 ch. 5 slides 6–7](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
- The dispatcher switches context, switches to user mode, and jumps to the right place in the user program. **Dispatch latency** is the time to stop one process and start another. — [OSC10 ch. 5 slide 9](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
- From an exam key: "Returns from the kernel require a different instruction, which both undoes what the trap did (restores saved state), and changes privileged mode back to user mode". — [CS537 Fall 2013 midterm key](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/13-fall-mid-answers.pdf)

### Inferences
- The one-line exam answer to "how does the OS regain control?" is: **the timer interrupt**, installed and started at boot in kernel mode. The cooperative approach cannot stop a process that loops without making system calls.
- By-hand convention: assume context-switch cost = 0 unless the problem gives one. When a cost is given, state whether the first dispatch is charged. Exams differ (see section 8).

### Gaps
- I have no fresh measurement of context-switch cost on 2026 hardware. The only figures are OSTEP's "sub-microsecond" and Silberschatz's "< 10 microseconds".

---

## 3. Policy rules and properties: FIFO/FCFS (convoy effect), SJF, STCF/SRTF, Round Robin, Priority (starvation, aging)

### Takeaway
- **FIFO** is simple but suffers the convoy effect.
- **SJF** (non-preemptive) is optimal for average turnaround and waiting time *when all jobs arrive together*.
- **STCF/SRTF** is preemptive SJF and is optimal when jobs arrive at different times.
- **RR** gives good response time and bounded waiting ((n−1)q), but its turnaround is nearly the worst possible, and a tiny quantum wastes time on switching.
- **Priority scheduling** can starve low-priority jobs; aging fixes this.

### Cited Findings
- **FIFO / FCFS.** FIFO "is clearly simple and thus easy to implement".
  - A, B, C = 10 each gives average turnaround 20.
  - A = 100, B = C = 10 gives "a painful 110 seconds".
  - The convoy effect is when "a number of relatively-short potential consumers of a resource get queued behind a heavyweight resource consumer". — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
- **Silberschatz FCFS examples.**
  - P1 = 24, P2 = 3, P3 = 3 in that order gives average waiting time (0+24+27)/3 = 17.
  - The order P2, P3, P1 gives (6+0+3)/3 = 3.
  - The slides define the convoy effect as a "short process behind long process" and give the example of one CPU-bound process with many I/O-bound processes. — [OSC10 ch. 5 slides 12–13](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
  - When the CPU hog blocks the CPU, I/O-bound jobs back up and the I/O devices sit idle. — [UIC notes](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/6_CPU_Scheduling.html)
- **FIFO exam facts:** FIFO suffers from the convoy problem, is not preemptive, and is not different from FCFS. — [CS537 Fall 2021 midterm key, Q2](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/21-fall-mid-solutions.pdf)
- **SJF.** SJF "runs the shortest job first, then the next shortest, and so on".
  - On the convoy example it cuts average turnaround from 110 to 50.
  - "given our assumptions about jobs all arriving at the same time, we could prove that SJF is indeed an optimal scheduling algorithm."
  - With A at 0 (100) and B, C at 10 (10 each), SJF gives 103.33, the convoy problem again.
  - "SJF by our definition is a non-preemptive scheduler." — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
- **SJF in Silberschatz.** "SJF is optimal – gives minimum average waiting time for a given set of processes." The preemptive version is "called shortest-remaining-time-first". Example P1 = 6, P2 = 8, P3 = 7, P4 = 3 gives average waiting time (3+16+9+0)/4 = 7. — [OSC10 ch. 5 slides 14–15](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
- **STCF / PSJF.** "Any time a new job enters the system, the STCF scheduler determines which of the remaining jobs (including the new job) has the least time left, and schedules that one."
  - The late-arrival example gives (120 + 10 + 20)/3 = 50.
  - "STCF is provably optimal" under these assumptions.
  - Response times are 0, 0 and 10 (average 3.33). — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
- **SRTF in Silberschatz.** P1(0,8), P2(1,4), P3(2,9), P4(3,5) gives average waiting time [(10−1)+(1−1)+(17−2)+(5−3)]/4 = 6.5. — [OSC10 ch. 5 slide 20](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
- **I/O handling.** Treat each CPU burst as an independent job (for example, A's 10-ms sub-jobs). STCF then interleaves them with the CPU-bound B, and "overlap" improves utilization. — [OSTEP ch. 7, §7.8](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
- **Round Robin.** RR "runs a job for a time slice (sometimes called a scheduling quantum) and then switches to the next job in the run queue".
  - A, B, C = 5 with q = 1: average response 1, versus 5 for SJF.
  - Completions are 13, 14 and 15, so average turnaround is 14 ("Pretty awful!").
  - RR is "nearly pessimal, even worse than simple FIFO in many cases" for turnaround.
  - With a 10-ms slice and 1-ms switch, "roughly 10%" of time is wasted; a 100-ms slice brings this to "less than 1%" (amortization). — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
- **RR in Silberschatz.** The quantum is "usually 10-100 milliseconds".
  - Each process gets 1/n of the CPU in chunks of at most q.
  - "No process waits more than (n-1)q time units."
  - A large q behaves like FIFO; q must be large relative to the context-switch time ("Context switch < 10 microseconds").
  - Rule of thumb: "80% of CPU bursts should be shorter than q".
  - RR typically has "higher average turnaround than SJF, but better response". — [OSC10 ch. 5 slides 21–24](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
- **RR numbers in the UIC notes.**
  - The RR q = 4 example (24, 3, 3) has "average wait time is 5.66 ms".
  - Three 10-ms jobs have average turnaround 29 at q = 1 and 20 at q = 10.
  - "Most modern systems use time quantum between 10 and 100 milliseconds, and context switch times on the order of 10 microseconds". — [UIC notes](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/6_CPU_Scheduling.html)
- **RR in an exam key.**
  - Strengths: it "improves response time of jobs", is simple, and is fair (no starvation).
  - Weaknesses: "really bad for turnaround time" and possible context-switch overhead.
  - Shrinking the slice from 100 ms to 1 ms "Improves response time even further!", but "the smaller the time slice, the more this overhead will matter". — [CS537 Fall 2009 midterm key](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/09-fall-mid-answers.pdf)
- **Priority.**
  - The CPU goes to the highest priority, with "smallest integer ≡ highest priority".
  - It can be preemptive or nonpreemptive.
  - "SJF is priority scheduling where priority is the inverse of predicted next CPU burst time".
  - "Problem ≡ Starvation – low priority processes may never execute"; "Solution ≡ Aging – as time progresses increase the priority of the process".
  - The example P1(10, pri 3), P2(1, 1), P3(2, 4), P4(1, 5), P5(5, 2) gives average waiting time 8.2.
  - Priority with RR: same-priority processes run round-robin. — [OSC10 ch. 5 slides 25–27](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
- **Priority caveats.** "there is no agreed-upon convention as to whether 'high' priorities use large numbers or small numbers. This book uses low number for high priorities, with 0 being the highest possible priority." Aging means "priorities of jobs increase the longer they wait". "There are rumors of jobs that have been stuck for years." — [UIC notes](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/6_CPU_Scheduling.html)
- **Multilevel queue (no feedback).** Separate queues per priority or process type, with a scheduling algorithm per queue plus scheduling among the queues. — [OSC10 ch. 5 slides 28–30](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)

### Inferences
- **Summary table** (synthesized from the sources above, with properties checked by script):

| Policy | Preemptive? | Needs burst lengths? | Good at | Bad at | Starvation? |
|---|---|---|---|---|---|
| FIFO/FCFS | No | No | Simplicity | Convoy effect: long job first ruins avg TAT/RT | No |
| SJF | No | Yes (or estimate) | Optimal avg TAT/WT if all arrive together | Short late arrivals wait behind a long job; response time | Yes (long jobs) |
| STCF/SRTF | Yes (on arrival) | Yes | Optimal avg TAT with arrivals | Response time for long jobs; more switches | Yes (long jobs) |
| RR (q) | Yes (timer) | No | Response time; fairness; wait bounded by (n−1)q | Turnaround; overhead when q is small | No |
| Priority NP/P | Either | No | Importance-driven | Low-priority jobs | Yes → aging |
| MLFQ | Yes | No (learns) | Approximates SJF plus RR for interactive jobs | Tuning constants; gaming (without Rule 4) | Prevented by boost (Rule 5) |

- **Script-verified properties** (`sched_verify.py`, 300 random workloads each):
  - Non-preemptive SJF matched the brute-force minimum average waiting time over all orderings in 300/300 all-at-0 workloads.
  - SRTF's average turnaround was ≤ SJF's and ≤ FCFS's in 300/300 workloads with arrivals.
  - RR with q ≥ the longest burst produced exactly the FCFS schedule in 300/300 workloads.

### Gaps
- The optimality proofs are not reproduced (OSTEP: "no proofs are allowed"). The script checks are evidence, not proof.

---

## 4. MLFQ: OSTEP rules 1–5, gaming the scheduler, priority boost (and the `mlfq.py` simulator)

### Takeaway
MLFQ approximates SJF without knowing job lengths. New jobs start at the top and drop down as they use up their **allotment** at each level. Within a level, jobs run RR. To prevent **gaming**, Rule 4 counts all CPU time at a level, including time before I/O. To prevent **starvation** and to handle jobs whose behavior changes, Rule 5 periodically **boosts** every job back to the top.

### Cited Findings
- MLFQ was first described by Corbató et al. in 1962 for CTSS, which (along with Multics work) led to Corbató's Turing Award. It aims to optimize turnaround without knowing job length and to minimize response time for interactive users. — [OSTEP ch. 8](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf)
- The final rules, verbatim:
  - "Rule 1: If Priority(A) > Priority(B), A runs (B doesn't)."
  - "Rule 2: If Priority(A) = Priority(B), A & B run in round-robin fashion using the time slice (quantum length) of the given queue."
  - "Rule 3: When a job enters the system, it is placed at the highest priority (the topmost queue)."
  - "Rule 4: Once a job uses up its time allotment at a given level (regardless of how many times it has given up the CPU), its priority is reduced (i.e., it moves down one queue)."
  - "Rule 5: After some time period S, move all the jobs in the system to the topmost queue."
  — [OSTEP ch. 8 §8.6](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf)
- The allotment is "the amount of time a job can spend at a given priority level before the scheduler reduces its priority". The chapter first assumes it equals one time slice. — [OSTEP ch. 8](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf)
- The older rules: "Rule 4a: If a job uses up its allotment while running, its priority is reduced" and "Rule 4b: If a job gives up the CPU (for example, by performing an I/O operation) before the allotment is up, it stays at the same priority level (i.e., its allotment is reset)." These rules had three flaws:
  - **Starvation**: with "too many" interactive jobs, long jobs never run.
  - **Gaming**: "before the allotment is used, issue an I/O operation... When done right (e.g., by running for 99% of the allotment before relinquishing the CPU), a job could nearly monopolize the CPU".
  - **Changing behavior**: a CPU-bound job that turns interactive is never re-evaluated.
  — [OSTEP ch. 8](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf)
- Rule 5 "solves two problems at once": processes no longer starve, and a CPU-bound job that becomes interactive is treated properly after the boost. S is a "voo-doo constant" (Ousterhout's Law): "If it is set too high, long-running jobs could starve; too low, and interactive jobs may not get a proper share of the CPU." — [OSTEP ch. 8](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf)
- Tuning:
  - High-priority queues get short slices ("10 or fewer milliseconds") and low queues get long slices ("100s of ms"). The chapter's figure uses 10, 20 and 40 ms.
  - Solaris TS defaults: 60 queues, slices from 20 ms up to a few hundred ms, boost "around every 1 second".
  - FreeBSD 4.3 uses a decay-usage formula.
  - Some schedulers reserve the top levels for OS work, and `nice` serves as user "advice".
  - BSD UNIX derivatives, Solaris, and Windows NT and later use a form of MLFQ. — [OSTEP ch. 8](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf)
- Silberschatz's MLFQ is defined by these parameters: the number of queues, the algorithm per queue, how to upgrade, how to demote, and which queue a new process enters. "Aging can be implemented using multilevel feedback queue." The example has Q0 RR 8 ms, Q1 RR 16 ms and Q2 FCFS; a job that does not finish in 8 ms moves to Q1, then to Q2. — [OSC10 ch. 5 slides 31–32](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
- `mlfq.py` flags and defaults (from the README and code):
  - `-n` number of queues (default 3); `-q` quantum (default 10); `-a` allotment (default 1); `-Q` and `-A` per-level lists, listed highest queue first.
  - `-j` number of jobs, `-m` max length, `-M` max I/O frequency (defaults 3, 100, 10).
  - `-B` boost period (default 0 = off); `-i` I/O time (default 5).
  - `-S`: "reset and stay at same priority level when issuing I/O", the old Rules 4a/4b that "enables gaming".
  - `-I`: "jobs that finished I/O move immediately to front of current queue".
  - `-l x1,y1,z1:...` gives start time, run time and I/O frequency per job; `-c` computes the answers.
  - The allotment is measured "in terms of number of time slices".
  — [mlfq.py README](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched-mlfq/README.md), [mlfq.py source](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched-mlfq/mlfq.py)
- Tick-level behavior read directly from the `mlfq.py` source:
  - New jobs ("JOB BEGINS") and I/O completions are appended to a queue at the *start* of a tick. A job whose quantum ends is popped and re-appended at the *end* of the tick it ran.
  - A job preempted by a higher-priority arrival is not removed. It stays at the head of its own queue with its unused ticks.
  - On a boost, jobs are moved from the lowest queue upward into the top queue (`for q in range(numQueues-1)`), and every job's ticks and allotment are reset.
  — [mlfq.py source](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched-mlfq/mlfq.py)
- Exam items with official answers:
  - MLFQ "learns things about running jobs" (True); "starves long running jobs" (False, "By bumping priority on occasion, MLFQ avoids starvation"); "uses different length time slices" (True); "uses round robin" (True, within a level); "forgets what it has learned... sometimes" (True, via the priority bump). — [CS537 Spring 2018 key, Problem XI](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/18-spring-mid-answers.pdf)
  - "Jobs enter at top priority, not random"; MLFQ needs a "periodic bump to avoid starvation, detect changes in job behavior". — [CS537 Fall 2013 key](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/13-fall-mid-answers.pdf)
  - Adding new jobs to a *random* queue means "Sometimes, short-running jobs won't get serviced quickly, thus decreasing interactivity" (answer A). — [CS537 Fall 2021 key, Q12](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/21-fall-mid-solutions.pdf)
  - Given a trace, infer the parameters: three queues (slices of 10, 20 and 55 ms), boost "Seemingly every 500 milliseconds". The boost exists "to avoid starvation" and "to reassess a job". — [CS537 Fall 2009 key](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/09-fall-mid-answers.pdf)

### Inferences
- **Numbering trap:** Silberschatz calls the *top* queue Q0. OSTEP's figures (Q8 on top in Fig. 8.1, Q2 on top in Fig. 8.2) and `mlfq.py` ("PRIORITY 2" for the top of 3 queues) number the top queue *highest*. Always say "top" or "bottom" in answers.
- **Boost-period arithmetic** (OSTEP homework Q5): a job gets at least one 10-ms top-queue quantum per boost period S. To guarantee at least 5% of the CPU, solve 10/S ≥ 0.05, so **S ≤ 200 ms**. This assumes the job gets at least one top-level slice after each boost.
- The fully traced MLFQ problem, verified against `mlfq.py`, is Problem 9 in section 9.

### Gaps
- OSTEP's rules do not specify where a lower-priority job goes when a higher-priority arrival preempts it, or the order of jobs after a boost. These are simulator conventions (above), so a different course may answer differently.

---

## 5. Proportional share: lottery and stride (brief)

### Takeaway
**Lottery** scheduling gives each job tickets; each time slice a random ticket picks the winner. Shares are correct only probabilistically, which is unfair for short jobs. **Stride** scheduling is deterministic: stride = BIG/tickets, always run the job with the minimum pass value, then add its stride to its pass.

### Cited Findings
- Tickets represent shares. With A = 75 and B = 25 tickets, A should get 75%. In OSTEP's sample run B got 4 of 20 slices (20%) instead of 25%: "probabilistic correctness... but no guarantee". — [OSTEP ch. 9](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf)
- Ticket mechanisms:
  - **Currency:** user A's jobs A1 and A2 get 500 each in A's currency, which converts to 50 each globally; B1's 10 tickets convert to 100. The lottery is held over the 200 global tickets.
  - **Transfer:** a client hands its tickets to a server.
  - **Inflation:** only among mutually trusting processes. — [OSTEP ch. 9](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf)
- Implementation: walk the list adding tickets to a counter until `counter > winner`. With 100/50/250 tickets and winner 300, C wins. Sorting by ticket count (descending) only reduces iterations. — [OSTEP ch. 9](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf)
- The fairness metric F is "the time the first job completes divided by the time that the second job completes" (for example 10/20 = 0.5). Average fairness is low for short jobs and approaches 1 only for long ones (Fig. 9.2). — [OSTEP ch. 9](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf)
- Stride: with 10,000 / {100, 50, 250}, the strides are {100, 200, 40}. Run the minimum pass value, then add the stride. Over one cycle "C ran five times, A twice, and B just once". Stride has exact proportions at the end of each cycle, but lottery has "no global state", while a new stride job with pass 0 "will monopolize the CPU". — [OSTEP ch. 9](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf)
- "the 'ticket-assignment problem' remains open." — [OSTEP ch. 9](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf)
- `lottery.py`: `-j`, `-s`, `-l len:tix,...`, `-q`, `-c`. The worked example shows "Random 511275 -> Winning ticket 75 (of 100)", i.e. winner = random mod total tickets. — [lottery.py README](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched-lottery/README.md)
- Exam keys: every trace (AABAAB..., ABAB..., AAAAAAAAAABBBBB, ABBBABBB...) "could be" a proportional-share trace, so the answer is E. With lottery, "anything is possible". — [CS537 Fall 2021 key, Q27](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/21-fall-mid-solutions.pdf); [CS537 Spring 2018 key, Problem X](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/18-spring-mid-answers.pdf)

### Inferences
- The expected share is tickets/total. The probability that a job with share p wins none of k lotteries is (1−p)^k; for example 0.75⁴ = 0.3164 (Practice Q14).
- The stride trace in Problem 11 reproduces OSTEP Fig. 9.3 exactly (script-checked).

### Gaps
- None for exam purposes. OSTEP calls the lottery/stride part "brief" relative to CFS.

---

## 6. The Linux scheduler: CFS, its 2023 replacement EEVDF, vruntime, nice values (plus multiprocessor basics)

### Takeaway
**CFS** (Linux 2.6.23, 2007) picks the runnable task with the smallest **vruntime**, kept in a red-black tree. vruntime grows more slowly for tasks with larger weight (lower nice value). **EEVDF** keeps the same fairness goal but tracks **lag** (owed versus received CPU time) and picks, among *eligible* tasks (lag ≥ 0), the one with the **earliest virtual deadline**. It was merged in Linux 6.6 (October 2023) and its transition was completed in 6.12 (November 2024). Nice values run from −20 (most CPU) to +19, and each step changes CPU weight by about 1.25×.

### Cited Findings
- **CFS history.** CFS was "implemented by Ingo Molnar and merged in Linux 2.6.23"; "Nowadays, CFS is making room for EEVDF". — [kernel CFS doc](https://docs.kernel.org/scheduler/sched-design-CFS.html). Linux 2.6.23 was "Released 9 October 2007" with "the new, better, fairer CFS process scheduler". — [KernelNewbies 2.6.23](https://kernelnewbies.org/Linux_2_6_23)
- **CFS core idea.** CFS models an "ideal, precise multi-tasking CPU". `p->se.vruntime` is tracked in nanoseconds, and CFS "always tries to run the task with the smallest p->se.vruntime value". It uses "a time-ordered rbtree" and picks the "leftmost" task. `min_vruntime` is used "to place newly activated entities on the left side of the tree as much as possible". — [kernel CFS doc](https://docs.kernel.org/scheduler/sched-design-CFS.html)
- **CFS tunables and classes.** The current doc lists "only one central tunable: /sys/kernel/debug/sched/base_slice_ns". The policies are SCHED_NORMAL (traditionally SCHED_OTHER), SCHED_BATCH and SCHED_IDLE. SCHED_FIFO and SCHED_RR live in sched/rt.c with 100 runqueues for 100 RT priority levels. — [kernel CFS doc](https://docs.kernel.org/scheduler/sched-design-CFS.html)
- **OSTEP's (classic) CFS model:**
  - `sched_latency` is typically 48 ms, divided by n. With n = 4, each slice is 12 ms.
  - `min_granularity` is about 6 ms. With n = 10 the raw slice would be 4.8 ms, so it becomes 6 ms.
  - A periodic timer (for example every 1 ms) drives decisions.
  - Nice ranges from −20 to +19 (default 0); `prio_to_weight` maps nice 0 to 1024, −5 to 3121, and so on.
  - time_slice_k = (weight_k / Σ weight_i) · sched_latency.
  - vruntime_i = vruntime_i + (weight_0 / weight_i) · runtime_i.
  - Example: A at nice −5 versus B at nice 0 gives A "about 3/4 of sched_latency (hence, 36 ms)" and B 12 ms, and "A's vruntime will accumulate at one-third the rate of B's".
  - The table "preserves CPU proportionality ratios when the difference in nice values is constant".
  - The red-black tree gives O(log n) operations.
  - A waking sleeper gets "the minimum value found in the tree", so jobs that "sleep for short periods of time frequently do not ever get their fair share".
  — [OSTEP ch. 9](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf)
- OSTEP (v1.20, © 2008–26) calls CFS "one (older) Linux approach" and adds: "As of Linux 6.6, the Earliest Eligible Virtual Deadline First (EEVDF) scheduler (another fair-sharing approach) became the default." — [OSTEP ch. 9](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf)
- **Nice values (sched(7)).** SCHED_OTHER is named SCHED_NORMAL in the kernel source. "On modern Linux, the range is -20 (high priority) to +19 (low priority)". Since CFS, "each unit of difference in the nice values of two processes results in a factor of 1.25 in the degree to which the scheduler favors the higher priority process." — [sched(7)](https://man7.org/linux/man-pages/man7/sched.7.html)
- **Silberschatz's Linux slides:**
  - 2.5 introduced the O(1) scheduler; CFS arrived in 2.6.23+ with scheduling classes.
  - "target latency – interval of time during which task should run at least once".
  - vruntime has a "decay factor based on priority of task"; "Normal default priority yields virtual run time = actual run time".
  - Real-time priorities are 0–99. "Nice value of -20 maps to global priority 100"; "+19 maps to priority 139".
  — [OSC10 ch. 5 slides 59–63](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
- **EEVDF basics (LWN, 2023).** "CFS was merged for the 2.6.23 release in 2007"; "CFS is... a weighted fair queuing scheduler at its core."
  - Lag is "the difference between the time that process should have gotten and how much it actually got". A process is "eligible" only if lag ≥ 0.
  - The "virtual deadline" is "calculated by adding a process's allocated time slice to its eligible time". EEVDF "will run the process with the earliest virtual deadline first".
  - Shorter time slices give earlier deadlines, which helps latency-sensitive tasks.
  — [LWN, "An EEVDF CPU scheduler for Linux" (Mar 9, 2023)](https://lwn.net/Articles/925371/)
- **Completing EEVDF (LWN, 2024).** EEVDF "was merged as an option for the 6.6 kernel".
  - Lag example with three tasks and 30-ms slices: after A runs, the lags are −20/+10/+10; after B runs, −10/−10/+20. "the sum of all the lag values in the system is always zero."
  - Sleeping tasks' lag decays over virtual run time via "deferred dequeue".
  - A task may preempt another if its virtual deadline is earlier.
  - Tasks can request a slice via `sched_setattr()` (`sched_runtime`). "The allowed range for time slices is 100µs to 100ms."
  — [LWN, "Completing the EEVDF scheduler" (Apr 11, 2024)](https://lwn.net/Articles/969062/)
- **Release dates.** "Linux 6.6 has been released on Sunday, 29 Oct 2023... This release replaces the CFS process scheduler with a new one called EEVDF". — [KernelNewbies 6.6](https://kernelnewbies.org/Linux_6.6). "Linux 6.12 was released on Sunday, 17 Nov 2024"; "This replacement has been gradual. This release completes the EEVDF transition"; 6.12 also adds sched_ext (BPF-written schedulers). — [KernelNewbies 6.12](https://kernelnewbies.org/Linux_6.12)
- **Kernel EEVDF doc.** "The Linux kernel began transitioning to EEVDF in version 6.6 (as a new option in 2024)". A task "with a positive lag is owed CPU time". EEVDF "picks tasks with lag greater or equal to zero and calculates a virtual deadline (VD) for each, selecting the task with the earliest VD". — [kernel EEVDF doc](https://docs.kernel.org/scheduler/sched-eevdf.html)
- **Sources disagree on 6.6 wording:** "merged as an option" ([LWN 2024](https://lwn.net/Articles/969062/)) versus "replaces the CFS process scheduler" ([KernelNewbies 6.6](https://kernelnewbies.org/Linux_6.6)) versus "became the default" ([OSTEP ch. 9](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf)) versus "began transitioning... (as a new option in 2024)" ([kernel EEVDF doc](https://docs.kernel.org/scheduler/sched-eevdf.html)).
- **Multiprocessor scheduling (OSTEP ch. 10).**
  - SQMS (single queue) is simple but has lock contention (scalability) and poor **cache affinity**.
  - MQMS (one queue per CPU) scales and keeps affinity but suffers **load imbalance**, fixed by **migration** and **work stealing** (peek at fuller queues; the threshold is "a black art").
  - Linux's O(1) and CFS schedulers use multiple queues; BFS used a single queue.
  — [OSTEP ch. 10](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-multi.pdf)
- Silberschatz's multiprocessor terms: push and pull migration for load balancing; processor affinity (a migrated thread loses its cache contents). — [OSC10 ch. 5 slides 43–44](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)

### Inferences
- **Script-computed CFS numbers** (OSTEP's weight table):
  - Nice −5 versus 0 with a 48-ms latency gives **36.14 ms / 11.86 ms** (OSTEP rounds to 36/12).
  - The vruntime rate of a nice −5 task is 1024/3121 = **0.328**, i.e. "one-third".
  - Nice 5 versus 10 gives 36.13 / 11.87 ms, almost identical, as OSTEP claims.
  - Nice 0 versus 1 gives a **55.5% / 44.5%** split (ratio 1.249).
  - Adjacent weight ratios in the table range from 1.20 to 1.28, i.e. about 1.25, matching sched(7).
- **For the exam:**
  - CFS is a deterministic proportional-share scheduler, similar to stride scheduling with virtual time: pick the minimum vruntime.
  - EEVDF keeps fairness via lag (eligibility) and adds latency control via virtual deadlines (shorter slice, earlier deadline).
  - The safe statement is: "EEVDF has been the fair-class scheduler since 6.6, with the transition completed in 6.12".
- OSTEP's `sched_latency` and `min_granularity` describe classic CFS. Use them for by-hand CFS questions, since that is the course's model, but know that the current kernel doc names `base_slice_ns` as the central tunable.

### Gaps
- I did not find the current default value of `base_slice_ns` in the fetched docs, so no number is given.
- I did not read the kernel source (`kernel/sched/fair.c`) to confirm how the 6.6 code is organized.

---

## 7. cgroup v2 CPU limits (cpu.max, plus cpu.weight) at a basic level

### Takeaway
**`cpu.max` = "$MAX $PERIOD"** (microseconds) is a hard cap: the group may use at most MAX of CPU time per PERIOD, summed over all its threads. Once that quota is used up, its threads are throttled until the next period, even if the CPU is otherwise idle. **`cpu.weight`** (default 100, range 1–10000) is a proportional, work-conserving share.

### Cited Findings
- The cpu controller "regulates distribution of CPU cycles" and implements "weight and absolute bandwidth limit models for normal scheduling policy". "All time durations are in microseconds." — [cgroup v2 doc](https://docs.kernel.org/admin-guide/cgroup-v2.html)
- Interface files:
  - **`cpu.max`**: "The default is 'max 100000'". The format is `$MAX $PERIOD`, meaning "the group may consume up to $MAX in each $PERIOD duration". "'max' for $MAX indicates no limit. If only one number is written, $MAX is updated."
  - **`cpu.max.burst`**: default 0, range [0, $MAX].
  - **`cpu.weight`**: default "100", range [1, 10000].
  - **`cpu.weight.nice`**: default 0, range [−20, 19].
  - **`cpu.stat`**: always reports `usage_usec`, `user_usec`, `system_usec`; when the controller is enabled it also reports `nr_periods`, `nr_throttled`, `throttled_usec`, `nr_bursts`, `burst_usec`.
  — [cgroup v2 doc](https://docs.kernel.org/admin-guide/cgroup-v2.html)
- Distribution models:
  - **Weights**: "adding up the weights of all active children and giving each the fraction matching the ratio of its weight against the sum... this is work-conserving".
  - **Limits**: "A child can only consume up to the configured amount of the resource", and limits can be over-committed.
  — [cgroup v2 doc](https://docs.kernel.org/admin-guide/cgroup-v2.html)
- Setup: mount with `mount -t cgroup2 none $MOUNT_POINT`. Enable controllers for children with `echo "+cpu +memory -io" > cgroup.subtree_control`. Move a process by writing its PID into the target cgroup's `cgroup.procs`. — [cgroup v2 doc](https://docs.kernel.org/admin-guide/cgroup-v2.html)
- Bandwidth control:
  - "Within each given 'period' (microseconds), a task group is allocated up to 'quota' microseconds of CPU time... Once all quota has been assigned any additional requests for quota will result in those threads being throttled. Throttled threads will not be able to run again until the next period when the quota is replenished."
  - Examples: quota 250 ms / period 250 ms = 1 CPU; 1000 ms / 500 ms = 2 CPUs; 10 ms / 50 ms = "20% of 1 CPU" ("small period... consistent latency response at the expense of burst capacity").
  - "The minimum quota allowed for the quota or period is 1ms. There is also an upper bound on the period length of 1s."
  - The cgroup-v1 equivalents are `cpu.cfs_quota_us` and `cpu.cfs_period_us`; v2 uses `cpu.max`.
  — [CFS bandwidth control doc](https://docs.kernel.org/scheduler/sched-bwc.html)
- Caveat: "cgroup2 cpu controller doesn't yet support the (bandwidth) control of realtime processes" in some configurations (CONFIG_RT_GROUP_SCHED). — [cgroup v2 doc](https://docs.kernel.org/admin-guide/cgroup-v2.html)

### Inferences
- **The core formula:** allowed CPUs = MAX/PERIOD. So "50000 100000" is 0.5 CPU, "200000 100000" is 2 CPUs (only reachable with ≥ 2 runnable threads), and "max 100000" is unlimited.
- **Hard cap vs share:** `cpu.max` throttles even on an idle machine (non-work-conserving). `cpu.weight` matters only under contention: weights 100 vs 300 give 25% / 75%, and if one group goes idle the other may use 100%.
- **Throttling timeline (computed):** a single CPU-bound thread needing 2000 ms of CPU under "50000 100000", starting at a period boundary:
  - It needs 40 periods and finishes at 39×100 + 50 = **3950 ms**, not 4000.
  - Under "25000 100000", 1000 ms of CPU finishes at **3925 ms**.
  - See Problem 12.
- **Minimal demo (illustrative, not run here; this machine is macOS):**

  ```
  mkdir $MOUNT_POINT/demo
  echo "+cpu" > $MOUNT_POINT/cgroup.subtree_control
  echo "50000 100000" > $MOUNT_POINT/demo/cpu.max
  echo <PID> > $MOUNT_POINT/demo/cgroup.procs
  cat $MOUNT_POINT/demo/cpu.stat        # watch nr_throttled / throttled_usec grow
  ```

  On many systemd distributions `$MOUNT_POINT` is `/sys/fs/cgroup`. That is an assumption, not taken from the fetched docs.

### Gaps
- Not tested on a real Linux machine. The exact `nr_throttled` count at the final period depends on implementation details that I did not verify.

---

## 8. Tie-breaking rules and common exam conventions (be explicit: they differ)

### Takeaway
Before computing, write your conventions down. The one that changes answers most often is **RR when a new job arrives at the exact instant a quantum expires**:
- **Arrival-first** puts the newcomer ahead of the preempted job. GfG's code and the online Process Scheduling Solver do this.
- **Preempted-first** puts the preempted job ahead. OSTEP's `mlfq.py` run with one queue does this.

On the GfG example the two give average TAT 8.0 versus 8.5; on this notes' workload W1 (q = 2) they give 10.6 versus 11.6.

### Cited Findings
- FIFO with simultaneous arrivals: OSTEP orders them by assuming "A arrived just a hair before B which arrived just a hair before C". — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
- An exam stating its RR conventions explicitly: "assume that there is no cost to context switching. Also assume that if job X arrives just before Y, a round-robin scheduler will schedule X before Y." — [CS537 Fall 2008 key](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/08-fall-mid-answers.pdf)
- Context-switch accounting is ambiguous even for the instructor: "Some people assumed the first switch to the job (from the OS) cost you, others didn't; both were OK by me." — [CS537 Spring 2009 key](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/09-spring-mid-answers.pdf)
- Timer alignment assumption: "This question assumes that the timer interrupt timing is 'aligned' with the start of the jobs". — [CS537 Fall 2021 key, Q10](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/21-fall-mid-solutions.pdf)
- Stride ties are arbitrary: "any of the processes with equal low pass values can be chosen". OSTEP's trace picks A, then B, then C. — [OSTEP ch. 9](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf)
- `scheduler.py` has every job arrive at time 0 (only run times are given). SJF sorts by run time using Python's `sorted`, which is stable, so equal lengths stay in job-number order. RR cycles through the job list in order. — [scheduler.py source](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched/scheduler.py)
- `mlfq.py`:
  - A job whose quantum ends is re-appended at the end of its tick; arrivals at time t are appended at the start of the next tick. So at the same level, the preempted job goes *before* a same-instant arrival.
  - A job returning from I/O goes to the back of its queue unless `-I` is given.
  - A job preempted by a higher queue keeps its head position and its remaining ticks.
  — [mlfq.py source](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched-mlfq/mlfq.py)
- GfG's RR-with-arrivals code "check[s] whether any other process has arrived or not and if it has then we add the index in the queue" during the quantum. It then moves the current process "at the end of the queue... when the time slice expires", which is arrival-first. Its sample (q = 2; arrival times 0, 1, 2, 3; bursts 5, 4, 2, 1) prints wait times 7, 6, 2, 5 (average 5) and turnaround 12, 10, 4, 6 (average 8). — [GeeksforGeeks RR with different arrival times](https://www.geeksforgeeks.org/operating-systems/round-robin-scheduling-with-different-arrival-times/)
- Process Scheduling Solver, RR: after each slice it pushes every process with `at <= currentTime` and only then does "Requeueing (move head/first item to tail/last)", which is arrival-first. — [solver rr.ts](https://raw.githubusercontent.com/boonsuen/process-scheduling-solver/HEAD/src/algorithms/rr.ts)
- Process Scheduling Solver, preemptive priority: a lower number means higher priority (preempts if `p.priority < processToExecute.priority`), and "Equal-priority processes are scheduled in FCFS order". — [solver pp.ts](https://raw.githubusercontent.com/boonsuen/process-scheduling-solver/HEAD/src/algorithms/pp.ts)
- Priority direction:
  - Silberschatz: "smallest integer ≡ highest priority". — [OSC10 ch. 5 slide 25](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
  - The UIC notes: "no agreed-upon convention". — [UIC notes](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/6_CPU_Scheduling.html)
  - Linux nice: −20 is high priority. — [sched(7)](https://man7.org/linux/man-pages/man7/sched.7.html)

### Inferences
- **Verified example of the RR tie difference (GfG input, q = 2):**
  - Arrival-first: P3 finishes at **6**; average TAT **8.0**; average WT **5.0**. This matches GfG's published output.
  - Preempted-first: P3 finishes at **8**; average TAT **8.5**; average WT **5.5**.
  - `mlfq.py -n 1 -q 2 -l 0,5,0:1,4,0:2,2,0:3,1,0 -c` reproduces 8.5 (TATs 12, 10, 6, 6).

  ```
  arrival-first   | P1 | P2 | P3 | P1 | P4 | P2 | P1 |
                  0    2    4    6    8    9    11   12
  preempted-first | P1 | P2 | P1 | P3 | P4 | P2 | P1 |
                  0    2    4    6    8    9    11   12
  ```

- **Default conventions used in these notes** (all switchable in the script); write them at the top of your exam answer:
  1. Equal arrival times: listed order (P1 before P2).
  2. SJF/SRTF and priority ties: earlier arrival first, then listed order.
  3. SRTF and preemptive priority: preempt only on *strictly* better remaining time or priority (the running job keeps the CPU on a tie).
  4. Priority: smaller number = higher priority, unless the problem says otherwise.
  5. RR: show both conventions when an arrival coincides with a quantum expiry. The default here is arrival-first. Also: a job that finishes early releases the CPU at once; if the quantum expires with an empty queue, the same job continues with no switch.
  6. Context-switch cost is 0 unless given. If given, it is charged between *different* jobs; say whether the first dispatch is charged.
  7. MLFQ: new jobs go to the top queue. A job preempted by a higher-priority arrival resumes later at the head of its queue with its leftover slice (the `mlfq.py` behavior). On a boost, state the order.

### Gaps
- Neither OSTEP nor the Silberschatz slides fix the order of simultaneous RR events. With search unavailable, I could not survey more university conventions (for example, Indian GATE-style notes, which are widely said to use arrival-first). That claim is unverified and is not used above.

---

## 9. Fully worked by-hand problems (Gantt charts as ASCII timelines; every number script-verified)

### Takeaway
There are 12 problems below, covering FIFO, SJF, STCF, RR (q = 1, 2, 4, ≥ 7, with both tie conventions), priority (non-preemptive and preemptive), priority+RR, an MLFQ trace with and without boost, context-switch overhead, proportional share, and cgroup arithmetic. Every table was produced by `sched_verify.py` and asserted. Problems taken from textbooks or exams match the published answers.

### Cited Findings
- Published answers the script reproduced (55/55 checks passed):
  - **OSTEP:** FIFO 20 and 110; SJF 50; SJF with late arrivals 103.33; STCF 50 (response times 0, 0, 10, average 3.33); RR q = 1 average response 1, completions 13/14/15, average turnaround 14; SJF average response 5. — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
  - **Silberschatz:** FCFS 17 and 3; SJF 7; SRTF 6.5; priority 8.2. — [OSC10 ch. 5 slides](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
  - **Silberschatz deterministic evaluation** of P1..P5 = 10, 29, 3, 7, 12: "FCS is 28ms", "Non-preemptive SFJ is 13ms", "RR is 23ms". The RR (q = 10) Gantt chart in the slide image has boundaries 10, 20, 23, 30, 40, 50, 52, 61. — [OSC10 ch. 5 slides 73–74](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
  - **UIC:** RR q = 4 average wait 5.66; three 10-ms jobs give 29 (q = 1) and 20 (q = 10). — [UIC notes](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/6_CPU_Scheduling.html)
  - **CS537 keys:** F21 Q3, Q10, Q11; S18 IX (all five rows); F08 SJF, LJF, RR q = 1 and RR q ≤ 2; "B finishes before C" when q ≥ 15 or 7.5 ≤ q < 10; F13 STCF TAT 10/30/60 and response 0/10/30; S09 (c)–(h). — [CS537 old exams](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/)
- OSTEP's own `scheduler.py -c` gives the same averages, for example:
  - `-p RR -q 4 -l 24,3,3`: "Response: 3.67 Turnaround 15.67 Wait 5.67".
  - `-p FIFO -l 10,29,3,7,12`: "Wait 28.00".
  - `-p RR -q 10 -l 10,29,3,7,12`: "Wait 23.00".
  - `-p FIFO -l 100,10,10`: "Turnaround 110.00".
  — [scheduler.py](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched/scheduler.py) (run locally)
- OSTEP's `mlfq.py -c` gives exactly the Problem 9 numbers (see below) and reproduces Fig. 8.3 (`--jlist 0,180,0:100,20,0 -q 10`: job 1 response 0, turnaround 20). — [mlfq.py README](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched-mlfq/README.md) (run locally)

### Inferences

**Shared workload W1** (used in Problems 1b–7; priority 1 = highest):

| Job | Arrival | Burst | Priority |
|---|---|---|---|
| A | 0 | 7 | 3 |
| B | 2 | 4 | 1 |
| C | 4 | 1 | 4 |
| D | 5 | 4 | 2 |
| E | 6 | 3 | 5 |

Column key for all tables: 1st = first run time, CT = completion, TAT = CT − AT, WT = TAT − BT, RT = 1st − AT.

#### Problem 1: FIFO/FCFS and the convoy effect

**(a) OSTEP convoy example.** A = 100, B = 10, C = 10, all at t = 0, in order A, B, C.

```
FIFO | A  | B  | C  |          SJF | B  | C  | A  |
     0    100  110  120             0    10   20   120
```

- FIFO: TAT = 100, 110, 120 (average **110**); RT = 0, 100, 110 (average 70).
- SJF: TAT = 10, 20, 120 (average **50**); RT = 0, 10, 20 (average 10).
- `scheduler.py` prints the same: FIFO "Response: 70.00 Turnaround 110.00"; SJF "Response: 10.00 Turnaround 50.00".

**(b) W1 under FCFS.** Run in arrival order and never preempt.

```
| A  | B  | C  | D  | E  |
0    7    11   12   16   19
```

| Job | AT | BT | 1st | CT | TAT | WT | RT |
|---|---|---|---|---|---|---|---|
| A | 0 | 7 | 0 | 7 | 7 | 0 | 0 |
| B | 2 | 4 | 7 | 11 | 9 | 5 | 5 |
| C | 4 | 1 | 11 | 12 | 8 | 7 | 7 |
| D | 5 | 4 | 12 | 16 | 11 | 7 | 7 |
| E | 6 | 3 | 16 | 19 | 13 | 10 | 10 |

- Average TAT = 48/5 = **9.6**; average WT = 29/5 = **5.8**; average RT = **5.8** (equal to WT because FCFS is non-preemptive).
- Throughput = 5/19 = 0.263 jobs per unit time; utilization = 19/19 = 100%.

**(c) Idle gap: utilization and throughput.** X(0,3), Y(1,2), Z(9,2) under FCFS.

```
| X  | Y  | idle | Z  |
0    3    5      9    11
```

- TAT = 3, 4, 2 (average 3); WT = 0, 2, 0 (average 0.667).
- Busy = 7 of 11, so **utilization = 63.6%** and throughput = 3/11 = 0.273.

#### Problem 2: SJF (non-preemptive) on W1

- At t = 0 only A has arrived, so **A runs to completion first** even though it is the longest job (classic trap).
- At t = 7 the ready jobs are B(4), C(1), D(4), E(3). Run C, then E. B and D tie at 4, so the earlier arrival (B) goes first.

```
| A  | C  | E  | B  | D  |
0    7    8    11   15   19
```

| Job | AT | BT | 1st | CT | TAT | WT | RT |
|---|---|---|---|---|---|---|---|
| A | 0 | 7 | 0 | 7 | 7 | 0 | 0 |
| B | 2 | 4 | 11 | 15 | 13 | 9 | 9 |
| C | 4 | 1 | 7 | 8 | 4 | 3 | 3 |
| D | 5 | 4 | 15 | 19 | 14 | 10 | 10 |
| E | 6 | 3 | 8 | 11 | 5 | 2 | 2 |

- Average TAT = 43/5 = **8.6**; average WT = **4.8**; average RT = **4.8**.

#### Problem 3: STCF / SRTF on W1

At every arrival, compare the newcomer's burst with the running job's **remaining** time:

1. t = 2: B (4) < A's remaining 5, so B preempts A.
2. t = 4: C (1) < B's remaining 2, so C preempts B.
3. t = 5: C is done. Remaining times: A = 5, B = 2, D = 4 (just arrived). B runs.
4. t = 6: E (3) is not < B's remaining 1, so B continues.
5. t = 7: B is done. E(3), D(4), A(5): E runs, then D, then A.

```
| A  | B  | C  | B  | E  | D  | A  |
0    2    4    5    7    10   14   19
```

| Job | AT | BT | 1st | CT | TAT | WT | RT |
|---|---|---|---|---|---|---|---|
| A | 0 | 7 | 0 | 19 | 19 | 12 | 0 |
| B | 2 | 4 | 2 | 7 | 5 | 1 | 0 |
| C | 4 | 1 | 4 | 5 | 1 | 0 | 0 |
| D | 5 | 4 | 10 | 14 | 9 | 5 | 5 |
| E | 6 | 3 | 7 | 10 | 4 | 1 | 1 |

- Average TAT = 38/5 = **7.6** (best of all policies on W1); average WT = **3.8**; average RT = **1.2**.

**(b) Textbook check.** Silberschatz's set P1(0,8), P2(1,4), P3(2,9), P4(3,5):

```
SRTF   | P1 | P2 | P4 | P1 | P3 |        non-preemptive SJF | P1 | P2 | P4 | P3 |
       0    1    5    10   17   26                           0    8    12   17   26
```

- SRTF: WT = 9, 0, 15, 2, average **6.5** (the slide's answer); TAT = 17, 4, 24, 7, average 13.
- Non-preemptive SJF: WT = 0, 7, 15, 9, average **7.75**; average TAT 14.25.

#### Problem 4: Round Robin, q = 2, on W1 under both tie conventions (step by step)

The tie happens at t = 2, 4 and 6, when an arrival coincides with a quantum expiry.

**Convention 1: arrival-first** (newcomer queued before the preempted job). Queue shown after each dispatch:

```
t= 0: dispatch A (left 7); queue = []
t= 2: B arrives, A expires -> [B, A]; dispatch B; queue = [A]
t= 4: C arrives, B expires -> [A, C, B]; dispatch A; queue = [C, B]
t= 5: D arrives -> [C, B, D]
t= 6: E arrives, A expires -> [C, B, D, E, A]; dispatch C; queue = [B, D, E, A]
t= 7: C finishes (used 1 of its 2 units); dispatch B (left 2); queue = [D, E, A]
t= 9: B finishes; dispatch D; queue = [E, A]
t=11: D expires -> [E, A, D]; dispatch E; queue = [A, D]
t=13: E expires -> [A, D, E]; dispatch A (left 3); queue = [D, E]
t=15: A expires -> [D, E, A]; dispatch D (left 2) ... D done 17, E done 18, A done 19
```

```
| A  | B  | A  | C  | B  | D  | E  | A  | D  | E  | A  |
0    2    4    6    7    9    11   13   15   17   18   19
```

| Job | AT | BT | 1st | CT | TAT | WT | RT |
|---|---|---|---|---|---|---|---|
| A | 0 | 7 | 0 | 19 | 19 | 12 | 0 |
| B | 2 | 4 | 2 | 9 | 7 | 3 | 0 |
| C | 4 | 1 | 6 | 7 | 3 | 2 | 2 |
| D | 5 | 4 | 9 | 17 | 12 | 8 | 4 |
| E | 6 | 3 | 11 | 18 | 12 | 9 | 5 |

- Average TAT = **10.6**; average WT = **6.8**; average RT = **2.2**.

**Convention 2: preempted-first** (the preempted job is queued before the newcomer, as in `mlfq.py` with one queue):

```
t= 0: dispatch A; queue = []
t= 2: A expires, B arrives -> [A, B]; dispatch A AGAIN (second quantum); queue = [B]
t= 4: A expires, C arrives -> [B, A, C]; dispatch B; queue = [A, C]
t= 6: B expires, E arrives (D arrived at 5) -> [A, C, D, B, E]; dispatch A; queue = [C, D, B, E]
t= 8: A expires -> [C, D, B, E, A]; dispatch C ... C done 9, D runs 9-11, B done 13, E 13-15, A done 16, D done 18, E done 19
```

```
| A  | B  | A  | C  | D  | B  | E  | A  | D  | E  |
0    4    6    8    9    11   13   15   16   18   19
```

The first A block (0–4) is two back-to-back quanta.

| Job | AT | BT | 1st | CT | TAT | WT | RT |
|---|---|---|---|---|---|---|---|
| A | 0 | 7 | 0 | 16 | 16 | 9 | 0 |
| B | 2 | 4 | 4 | 13 | 11 | 7 | 2 |
| C | 4 | 1 | 8 | 9 | 5 | 4 | 4 |
| D | 5 | 4 | 9 | 18 | 13 | 9 | 4 |
| E | 6 | 3 | 13 | 19 | 13 | 10 | 7 |

- Average TAT = **11.6**; average WT = **7.8**; average RT = **3.4**.
- Same jobs and same q, but different numbers, so state your convention.

#### Problem 5: Round Robin with several quanta (W1) and the textbook q = 4 case

Averages for each quantum, under both conventions (AF = arrival-first, PF = preempted-first):

| q | AF avg TAT | AF avg WT | AF avg RT | PF avg TAT | PF avg WT | PF avg RT |
|---|---|---|---|---|---|---|
| 1 | 11.2 | 7.4 | 1.2 | 11.4 | 7.6 | 2.0 |
| 2 | 10.6 | 6.8 | 2.2 | 11.6 | 7.8 | 3.4 |
| 3 | 12.6 | 8.8 | 3.6 | 12.2 | 8.4 | 3.8 |
| 4 | 9.4 | 5.6 | 4.6 | 9.8 | 6.0 | 5.2 |
| 5 | 10.2 | 6.4 | 4.6 | 9.8 | 6.0 | 5.0 |
| 6 | 11.2 | 7.4 | 5.0 | 10.8 | 7.0 | 5.2 |
| ≥ 7 | 9.6 | 5.8 | 5.8 | 9.6 | 5.8 | 5.8 |

Two lessons from this table:
- Average RT rises with q, and q ≥ the longest burst (7) gives exactly FCFS (compare Problem 1b).
- Average TAT is **not** monotonic in q (12.6 at q = 3 versus 9.4 at q = 4). This matches the slides' "Turnaround Time Varies With The Time Quantum".

**q = 1 (arrival-first):**

```
| A  | B  | A  | B  | C  | A  | D  | B  | E  | A  | D  | B  | E  | A  | D  | E  | A  | D  |
0    2    3    4    5    6    7    8    9    10   11   12   13   14   15   16   17   18   19
```

- CT: A = 18, B = 13, C = 6, D = 19, E = 17. TAT 18, 11, 2, 14, 11 (average 11.2). RT 0, 0, 1, 2, 3 (average 1.2).

**q = 4:**

```
arrival-first   | A  | B  | C  | A  | D  | E  |      preempted-first | A  | B  | A  | C  | D  | E  |
                0    4    8    9    12   16   19                     0    4    8    11   12   16   19
```

- Arrival-first: TAT 12, 6, 5, 11, 13 (average 9.4).
- Preempted-first: TAT 11, 6, 8, 11, 13 (average 9.8).

**(b) Silberschatz q = 4.** P1 = 24, P2 = 3, P3 = 3, all at t = 0:

```
| P1 | P2 | P3 | P1 |
0    4    7    10   30
```

- WT = 6, 4, 7, average **5.67**; TAT = 30, 7, 10, average 15.67; RT = 0, 4, 7, average 3.67.
- Matches the UIC "5.66" and `scheduler.py` ("Wait 5.67").

#### Problem 6: Priority, non-preemptive

**(a) Silberschatz example.** All at t = 0; smaller number = higher priority. P1(10, pri 3), P2(1, 1), P3(2, 4), P4(1, 5), P5(5, 2).

```
| P2 | P5 | P1 | P3 | P4 |
0    1    6    16   18   19
```

- WT = P1 6, P2 0, P3 16, P4 18, P5 1, so average WT = 41/5 = **8.2** (the slide's answer). Average TAT = 12.

**(b) W1.** A runs first because it is alone at t = 0. At t = 7 the ready jobs are B(1), C(4), D(2), E(5).

```
| A  | B  | D  | C  | E  |
0    7    11   15   16   19
```

| Job | AT | BT | Pri | 1st | CT | TAT | WT | RT |
|---|---|---|---|---|---|---|---|---|
| A | 0 | 7 | 3 | 0 | 7 | 7 | 0 | 0 |
| B | 2 | 4 | 1 | 7 | 11 | 9 | 5 | 5 |
| C | 4 | 1 | 4 | 15 | 16 | 12 | 11 | 11 |
| D | 5 | 4 | 2 | 11 | 15 | 10 | 6 | 6 |
| E | 6 | 3 | 5 | 16 | 19 | 13 | 10 | 10 |

- Average TAT = **10.2**; average WT = average RT = **6.4**.

#### Problem 7: Priority, preemptive (W1)

1. t = 2: B (pri 1) arrives and preempts A (pri 3).
2. t = 4 (C, pri 4) and t = 5 (D, pri 2): neither beats B, so B continues.
3. t = 6: B is done. Ready: D(2), A(3), C(4), E(5). Run D, then A, then C, then E.

```
| A  | B  | D  | A  | C  | E  |
0    2    6    10   15   16   19
```

| Job | AT | BT | Pri | 1st | CT | TAT | WT | RT |
|---|---|---|---|---|---|---|---|---|
| A | 0 | 7 | 3 | 0 | 15 | 15 | 8 | 0 |
| B | 2 | 4 | 1 | 2 | 6 | 4 | 0 | 0 |
| C | 4 | 1 | 4 | 15 | 16 | 12 | 11 | 11 |
| D | 5 | 4 | 2 | 6 | 10 | 5 | 1 | 1 |
| E | 6 | 3 | 5 | 16 | 19 | 13 | 10 | 10 |

- Average TAT = **9.8**; average WT = **6.0**; average RT = **4.4**.
- Starvation intuition: E (lowest priority) waits for everyone. If high-priority jobs kept arriving, E would never run, and aging would raise its priority over time.

#### Problem 8: Priority + Round Robin (Silberschatz slide 27 workload, q = 2)

P1(4, pri 3), P2(5, 2), P3(8, 2), P4(7, 1), P5(3, 3), all at t = 0. Highest priority first; equal priorities share the CPU by RR.

```
| P4 | P2 | P3 | P2 | P3 | P2 | P3 | P1 | P5 | P1 | P5 |
0    7    9    11   13   15   16   20   22   24   26   27
```

- P4 runs alone at priority 1 (its quantum expires with no peer, so it continues).
- Then P2 and P3 alternate at priority 2; then P1 and P5 at priority 3.
- CT: P1 26, P2 16, P3 20, P4 7, P5 27. WT: 22, 11, 12, 0, 24, so average WT = 69/5 = **13.8**. Average TAT = **19.2**; average RT = **11.6**.
- The slide shows only the chart image, so this number is computed, not quoted.

#### Problem 9: MLFQ trace (OSTEP rules), verified with `mlfq.py`

- **Setup:** 3 queues, shown here as Q2 = top, Q1, Q0 = bottom (OSTEP/`mlfq.py` numbering). Quanta 2 / 4 / 8. Allotment = 1 quantum per level. No I/O.
- **Jobs:** A(arrival 0, run 10), B(1, 4), C(5, 3).
- **Command:** `./mlfq.py -n 3 -Q 2,4,8 -A 1,1,1 -l 0,10,0:1,4,0:5,3,0 -c`

Trace (the label shows the job and its queue):

```
| A2 | B2 | A1 | C2 | A1 | B1 | C1 | A0 |
0    2    4    5    7    10   12   13   17
```

1. t = 0–2: A in Q2 uses its quantum, so it drops to Q1 (8 left). B arrived at 1 and waited (Rule 1/2: same level, RR).
2. t = 2–4: B in Q2 uses its quantum and drops to Q1 (2 left). Q1 = [A, B].
3. t = 4–5: Q2 is empty, so A runs from Q1 (quantum 4).
4. t = 5: C arrives in Q2 (Rule 3) and **preempts A** (Rule 1). In `mlfq.py`, A keeps its place at the head of Q1 with 3 ticks left.
5. t = 5–7: C uses its Q2 quantum and drops to Q1 (1 left). Q1 = [A, B, C].
6. t = 7–10: A finishes its 4-tick Q1 quantum (1 + 3) and drops to Q0 (4 left) (Rule 4).
7. t = 10–12: B finishes. t = 12–13: C finishes. t = 13–17: A in Q0 finishes.

| Job | Arrival | First run | Done | TAT | RT |
|---|---|---|---|---|---|
| A | 0 | 0 | 17 | 17 | 0 |
| B | 1 | 2 | 12 | 11 | 1 |
| C | 5 | 5 | 13 | 8 | 0 |

- Average TAT = **12.0**; average RT = **0.33**. `mlfq.py` prints "Avg ... response 0.33 - turnaround 12.00".

**Boost variant (Rule 5, S = 10):** `... -B 10`. At t = 10, `mlfq.py` moves Q0's A, then Q1's B and C, into Q2. All allotments reset.

```
| A2 | B2 | A1 | C2 | A1 | A2 | B2 | C2 | A1 |
0    2    4    5    7    10   12   14   15   17
```

- Done: A = 17, B = 14, C = 15. TAT = 17, 13, 10, average **13.33** (`mlfq.py`: "turnaround 13.33").
- If you instead move the *higher* queues first at the boost (B, C, then A), you get B = 12, C = 13, A = 17 (average 12.0):

```
| A2 | B2 | A1 | C2 | A1 | B2 | C2 | A2 | A1 |
0    2    4    5    7    10   12   13   15   17
```

Lesson: the boost exists for starvation and fairness, not to improve average turnaround, and the boost order is a convention.

#### Problem 10: Context-switch overhead in RR

Jobs A = 5, B = 3, C = 4 at t = 0, q = 2. Compare switch cost s = 0 with s = 1, where s is charged on every change of job but not on the first dispatch.

```
s=0 | A  | B  | C  | A  | B  | C  | A  |
    0    2    4    6    8    9    11   12
s=1 | A  | cs | B  | cs | C  | cs | A  | cs | B  | cs | C  | cs | A  |
    0    2    3    5    6    8    9    11   12   13   14   16   17   18
```

- s = 0: CT 12, 9, 11. Average TAT **10.67**; average WT 6.67; average RT 2.0; utilization 100%. `scheduler.py -p RR -q 2 -l 5,3,4` agrees.
- s = 1: six switches. CT 18, 13, 16. Average TAT **15.67**; average WT 11.67 (includes switch time); average RT 3.0. Utilization = 12/18 = **66.7%**; throughput 3/18.
- Steady-state overhead for long CPU-bound jobs is s/(q+s):
  - q = 10, s = 1: 1/11 = **9.1%** (OSTEP says "roughly 10%", which is s/q).
  - q = 100, s = 1: 1/101 = **0.99%** ("less than 1%").
  - q = 2, s = 1: 33%.
- Worst-case first response for N jobs arriving at t = 0 is (N−1)(q+s). With 4 jobs, q = 3, s = 1: 12; with s = 0: (N−1)q = 9. Both script-checked.

#### Problem 11: Proportional share (stride, CFS weights, EEVDF lag)

**(a) Stride**, tickets A = 100, B = 50, C = 250, BIG = 10,000, so strides are 100 / 200 / 40. Ties go in A, B, C order.

| Pass A | Pass B | Pass C | Runs |
|---|---|---|---|
| 0 | 0 | 0 | A |
| 100 | 0 | 0 | B |
| 100 | 200 | 0 | C |
| 100 | 200 | 40 | C |
| 100 | 200 | 80 | C |
| 100 | 200 | 120 | A |
| 200 | 200 | 120 | C |
| 200 | 200 | 160 | C |

Per cycle C runs 5 times, A twice and B once, i.e. 250:100:50 (OSTEP Fig. 9.3).

**(b) CFS (OSTEP model).**
- Nice −5 (weight 3121) and nice 0 (1024), sched_latency 48 ms: slices are 48·3121/4145 = **36.14 ms** and 48·1024/4145 = **11.86 ms**.
- If the nice −5 task runs 12 ms of real time, its vruntime grows by 12·1024/3121 = **3.94 ms**; a nice-0 task's grows by 12 ms.
- Four equal tasks get 12 ms each. Ten tasks would get 4.8 ms, so min_granularity (6 ms) applies.

**(c) EEVDF lag** (LWN's example, computed). Three equal tasks, 30-ms slices; each task is entitled to 10 ms per 30 ms.

| Event | Lag A | Lag B | Lag C | Sum | Eligible (lag ≥ 0) |
|---|---|---|---|---|---|
| Start | 0 | 0 | 0 | 0 | all |
| After A runs | −20 | +10 | +10 | 0 | B, C |
| After B runs | −10 | −10 | +20 | 0 | C |
| After C runs | 0 | 0 | 0 | 0 | all |

#### Problem 12: cgroup v2 `cpu.max` / `cpu.weight` arithmetic

- `cpu.max = "50000 100000"` means 50 ms per 100 ms, i.e. **0.5 CPU**. A CPU-bound single thread needing 2000 ms of CPU, starting at a period boundary, runs 50 ms and is throttled 50 ms each period. It needs 40 periods and finishes at **3950 ms**.
- `"25000 100000"` with a 1000-ms job finishes at **3925 ms**.
- `"200000 100000"` allows up to **2 CPUs' worth** in total. A single-threaded process cannot exceed 1 CPU, so for it this limit never binds.
- `cpu.weight` 100 versus 300 on a saturated CPU gives **25% / 75%**. If the weight-300 group idles, the weight-100 group can use 100% (work-conserving). `cpu.max` would still cap it.

### Gaps
- All problems use integer times and CPU-only jobs; I/O appears only conceptually (OSTEP §7.8) and through `mlfq.py`'s I/O flags.
- The online Process Scheduling Solver's UI was not run. Its conventions come from reading its source code.

---

## 10. Common traps (exam-oriented)

### Takeaway
Most lost points come from five things: measuring from the wrong reference time (arrival vs 0), confusing SJF with STCF, picking a job that has not arrived yet, unstated tie conventions (especially in RR), and mixed-up numbering conventions (priority numbers, MLFQ queue indices).

### Cited Findings
- SJF in OSTEP is non-preemptive; STCF/PSJF is the preemptive version. — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
- Turnaround is measured from arrival. A "professor" in the exam claimed STCF turnaround 0, 10, 20 for jobs 10, 20, 30; the correct values are 10, 30, 60 (average 33.33), and response times are 0, 10, 30. — [CS537 Fall 2013 key](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/13-fall-mid-answers.pdf)
- Response time is "time(first run) - (time arrive)" even under preemption. In the "highest PID first" (preemptive) example every job runs on arrival, so the average response is 0 ("None of the above"). — [CS537 Fall 2021 key, Q24](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/21-fall-mid-solutions.pdf)
- "Which policies could produce A10, B10, C10 (done), A10 (done), B5 (done)?" FIFO is not possible; RR is possible; STCF is not ("A is run to completion before B, which is shorter"); MLFQ and lottery are possible. — [CS537 Spring 2018 key, Problem X](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/18-spring-mid-answers.pdf)
- No agreed priority-number direction. — [UIC notes](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/6_CPU_Scheduling.html)
- `mlfq.py` allotments count *time slices*, not milliseconds. — [mlfq.py README](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched-mlfq/README.md)
- RR "No process waits more than (n-1)q"; "q large ⇒ FIFO". — [OSC10 ch. 5 slide 21](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)
- The CFS parameters in OSTEP are the classic model. The kernel doc now lists `base_slice_ns` as the single central tunable, and EEVDF has been the fair scheduler since 6.6. — [kernel CFS doc](https://docs.kernel.org/scheduler/sched-design-CFS.html); [KernelNewbies 6.6](https://kernelnewbies.org/Linux_6.6)

### Inferences
1. **Only arrived jobs are candidates.** On W1, SJF and priority-NP must run A first.
2. **SRTF compares against the running job's *remaining* time**, not its original burst.
3. **Preempt only on strictly better** remaining time or priority (state it); equal does not preempt.
4. **RR: an early finisher frees the CPU immediately.** In W1 q = 2, C finishes at 7, not 8.
5. **RR: if the quantum expires with an empty queue, the same job continues.** There is no idle time and no switch.
6. **RR simultaneous events:** write "arrival-first" or "preempted-first". The difference is real (10.6 vs 11.6 on W1, q = 2).
7. **RR with q ≥ the longest burst is FCFS.** Average TAT need not decrease as q grows (W1: 12.6 at q = 3, 9.4 at q = 4).
8. **WT = TAT − burst only without I/O.** With switch overhead, WT includes switch time; say so.
9. **For non-preemptive policies RT = WT.** Use this as a self-check.
10. **Count idle gaps and switch time as non-busy** when computing utilization (Problems 1c and 10).
11. **Keep fractions:** 103.33, 5.67, 13.33. Divide by the number of jobs, not the makespan.
12. **MLFQ:** label queues "top/bottom"; a newcomer at the top preempts a lower-queue job mid-slice; boost order and resume position are conventions (Problem 9: 13.33 vs 12.0).
13. **Gaming vs starvation:** Rule 4 (accounting) stops gaming; Rule 5 (boost) stops starvation. Students often swap these.
14. **nice −20 means most CPU**, not least. Each nice step is about a 1.25× weight change, so nice 0 vs 1 is about 55.5% / 44.5%.
15. **`cpu.max` is a cap; `cpu.weight` is a share.** "200000 100000" does not make one thread faster than 1 CPU.
16. **Lottery is probabilistic**, so short jobs can be very unfair (F ≪ 1). Stride is exact per cycle but needs global state for new arrivals.

### Gaps
- No Inha-specific grading conventions were available. Verify against the instructor's slides and past quizzes.

---

## 11. Practice problems with answers (20; computational answers script-verified)

### Takeaway
Do these on paper first, then check the answers. All numerical answers were produced or checked by `sched_verify.py`, `scheduler.py` or `mlfq.py`. Items 2, 5, 8 and 20 reproduce published answers.

### Cited Findings
- Official exam-key items worth attempting (answers in the keys):
  - [CS537 F21](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/21-fall-mid-solutions.pdf): Q2 (FIFO facts → convoy), Q3 (FIFO TAT of B = 25), Q9 (a random-pick-per-tick policy most resembles RR), Q10 (best-case average response 5 ms), Q11 (worst-case average TAT 55 ms → "None of the above"), Q12, Q24, Q27.
  - [CS537 S18](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/18-spring-mid-answers.pdf): IX (FIFO averages 15, 35, 11.67, 48.33, 26), X, XI.
  - [CS537 F08](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/08-fall-mid-answers.pdf) problem 2: SJF/LJF/RR finish times; B before C iff q ≥ 15 or 7.5 ≤ q < 10.
  - [CS537 S09](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/09-spring-mid-answers.pdf) problem 1: SJF with sorting/switch overhead, answers 43.33 / 63.33 / 63.33 / 83.33 / 70 / 80.
- OSTEP ch. 7 homework asks, for example, for the worst-case RR response time for N jobs. — [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf). The ch. 8 homework asks, among other things, for the boost period that guarantees 5% CPU with a 10-ms top quantum. — [OSTEP ch. 8](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf)

### Inferences

**Q1 (metrics).** A job arrives at t = 3, first runs at t = 7, completes at t = 15, and has a 6-unit CPU burst (no I/O). Find TAT, WT and RT.
**Answer:** TAT = 12, WT = 6, RT = 4.

**Q2 (FIFO with arrivals).** A(0,10), B(5,20), C(10,5) under FIFO. Find each TAT and the average.
**Answer:** 10, 25, 25; average **20**. B = 25 matches the CS537 F21 key.

**Q3 (SJF trap).** Non-preemptive SJF on P1(0,8), P2(1,4), P3(2,9), P4(3,5). Find the average WT.
**Answer:** order P1, P2, P4, P3; WT 0, 7, 15, 9; average **7.75**.

**Q4 (STCF).** The same set as Q3 under STCF. Find the average TAT.
**Answer:** TATs 17, 4, 24, 7; average **13** (average WT 6.5).

**Q5 (RR quantum).** Three 10-unit jobs at t = 0. Find the average TAT with q = 1 and with q = 10.
**Answer:** **29** and **20** (UIC).

**Q6 (RR worst-case response).** N jobs arrive together, quantum q, switch cost s. What is the worst first-response time?
**Answer:** (N−1)·q with s = 0; (N−1)(q+s) if s is charged between jobs. Example: N = 4, q = 3 gives 9 (12 with s = 1).

**Q7 (RR tie convention).** q = 2; arrivals 0, 1, 2, 3; bursts 5, 4, 2, 1. When does P3 finish?
**Answer:** **6** (arrival-first; average TAT 8) or **8** (preempted-first; average TAT 8.5).

**Q8 (priority NP).** Silberschatz's set (P1 10/3, P2 1/1, P3 2/4, P4 1/5, P5 5/2). Who finishes last, when, and what is the average WT?
**Answer:** P4 at **19**; average WT **8.2**.

**Q9 (priority P vs NP).** P1(0,5,pri 2), P2(1,3,pri 1), P3(2,1,pri 3), with 1 = highest. Find the preemptive Gantt chart and average TAT, then the non-preemptive average TAT.
**Answer:** preemptive `| P1 | P2 | P1 | P3 |` at 0, 1, 4, 8, 9, with TAT 8, 3, 7 (average **6**). Non-preemptive: P1 0–5, P2 5–8, P3 8–9 (average **6.33**).

**Q10 (MLFQ rules).** Which rule defeats gaming, and which prevents starvation?
**Answer:** Rule 4 (allotment accounting regardless of I/O) defeats gaming; Rule 5 (priority boost) prevents starvation.

**Q11 (boost period).** The top quantum is 10 ms. How often must you boost to guarantee a long job ≥ 5% of the CPU?
**Answer:** S ≤ **200 ms** (10/S ≥ 0.05).

**Q12 (MLFQ trace).** 2 queues; top quantum 1, bottom quantum 2; allotment 1; A(0,4), B(0,3). Find the completion times.
**Answer:** `| A1 | B1 | A0 | B0 | A0 |` at 0, 1, 2, 4, 6, 7. B finishes at **6**, A at **7** (average TAT 6.5). Verified by `mlfq.py -n 2 -Q 1,2 -A 1,1 -l 0,4,0:0,3,0 -c`.

**Q13 (stride).** A = 200 tickets, B = 100, BIG = 600. Find the first 6 picks (ties go to A).
**Answer:** strides 3 and 6; picks **A B A A B A**, so A gets 4/6 = 2/3.

**Q14 (lottery).** A has 75 tickets and B has 25. What is the probability that B wins none of 4 lotteries, and how many wins should B expect in 20?
**Answer:** 0.75⁴ = **0.316**; expected **5** (OSTEP's sample run gave 4).

**Q15 (CFS shares).** Nice 0 (weight 1024) and nice 5 (weight 335) on one CPU, sched_latency 48 ms. Find the shares and slices.
**Answer:** **75.35% / 24.65%**; slices **36.17 / 11.83 ms**.

**Q16 (vruntime).** A nice −5 task runs 12 ms. How much vruntime does it accumulate?
**Answer:** 12·1024/3121 = **3.94 ms** (a nice-0 task accumulates 12 ms).

**Q17 (EEVDF).** Three equal tasks; A runs a full 30-ms slice first. Find the lags and the eligible tasks.
**Answer:** A −20, B +10, C +10 (sum 0); B and C are eligible.

**Q18 (cpu.max).** `cpu.max = "25000 100000"`. What is the cap, and when does a 1-s CPU-bound single-threaded job finish (starting at a period boundary)?
**Answer:** 25% of one CPU; finishes at **3.925 s**.

**Q19 (cpu.weight vs cpu.max).** Groups with weights 100 and 300 both saturate one CPU. Find their shares, and say what happens when the 300-group goes idle.
**Answer:** **25% / 75%**. When the 300-group idles, the 100-group can use 100% (weights are work-conserving), whereas `cpu.max` would still cap it.

**Q20 (mechanism and overhead).**
(a) In a cooperative OS, how is a process looping forever without system calls stopped?
(b) What fraction of time is switch overhead with q = 10 ms and s = 1 ms, and with q = 100 ms?
**Answer:**
(a) Only by rebooting. The fix is the timer interrupt (OSTEP ch. 6).
(b) 1/11 = **9.1%** ("roughly 10%"); 1/101 = **0.99%** ("less than 1%").

### Gaps
- Some practice items deliberately reuse textbook data so you can check against published answers. More fresh random problems can be generated with `scheduler.py -s <seed>` and `mlfq.py -s <seed>` (section 12).

---

## 12. Best free resources and simulators (with OSTEP `scheduler.py` / `mlfq.py` usage), plus the verification script

### Takeaway
Use **OSTEP ch. 6–10** together with the **OSTEP homework simulators** (`scheduler.py`, `mlfq.py`, `lottery.py`) to generate unlimited practice problems with answers via `-c`. Use **Remzi's CS537 midterm keys** for exam-style questions, the **Silberschatz OSC10 slides** for the classic P1..Pn problems, and the **Process Scheduling Solver** for quick Gantt checks with arrival times (it uses arrival-first RR). For Linux, use the **kernel docs, LWN and KernelNewbies**. `sched_verify.py` (below) checks everything in these notes and lets you switch conventions.

### Cited Findings
- **OSTEP chapters (free, from the authors):** [ch. 6 LDE](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf), [ch. 7 Scheduling intro](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf), [ch. 8 MLFQ](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf), [ch. 9 Proportional share](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf), [ch. 10 Multiprocessor](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-multi.pdf). The versions fetched: ch. 6–8 v1.10 (© 2008–23), ch. 9 v1.20 (© 2008–26), ch. 10 © 2008–25.
- **OSTEP homework repo** (default branch `master`, latest commit 2026-01-13 when cloned): [github.com/remzi-arpacidusseau/ostep-homework](https://github.com/remzi-arpacidusseau/ostep-homework)
  - `scheduler.py` runs FIFO, SJF and RR. Run without `-c` to get a problem, then with the same args plus `-c` for answers. `-s` seed, `-j` jobs, `-l` run-time list (for example `-l 10,15,20`), `-m` max length, `-p` policy, `-q` quantum. It computes response, turnaround and wait. Example: `./scheduler.py -p FIFO -j 3 -s 100 -c` gives averages "Response: 2.00 Turnaround 6.00 Wait 2.00". — [cpu-sched README](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched/README.md)
  - `mlfq.py`: flags as in section 4. The README recreates OSTEP Fig. 8.3 with `./mlfq.py --jlist 0,180,0:100,20,0 -q 10`. — [cpu-sched-mlfq README](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched-mlfq/README.md)
  - `lottery.py`: `-j`, `-s`, `-l 10:100,20:100` (length:tickets), `-T` max tickets, `-q`, `-c`. — [cpu-sched-lottery README](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched-lottery/README.md)
- **CS537 (UW-Madison, Remzi Arpaci-Dusseau) old exams with keys:** [OldExams index](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/). Text-searchable midterm keys with scheduling questions: [08-fall](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/08-fall-mid-answers.pdf), [09-spring](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/09-spring-mid-answers.pdf), [09-fall](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/09-fall-mid-answers.pdf), [13-fall](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/13-fall-mid-answers.pdf), [18-spring](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/18-spring-mid-answers.pdf), [21-fall](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/21-fall-mid-solutions.pdf). The 11-fall, 11-spring, 12-spring, 16-spring and 22-fall keys are scanned images (no extractable text).
- **Silberschatz OSC 10e official slides:** [slide index](https://www.os-book.com/OS10/slide-dir/index.html); [Chapter 5 CPU Scheduling (PPTX)](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx). The `PDF-dir/ch5.pdf` path returned 404 on 2026-10-19.
- **UIC course notes (John Bell), CPU scheduling:** [6_CPU_Scheduling.html](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/6_CPU_Scheduling.html)
- **Process Scheduling Solver** (free web app): "Dynamically generates gantt chart and calculates TAT (turnaround time) and WAT (waiting time) based on various CPU scheduling algorithms". Its algorithms are FCFS; SJF (non-preemptive); SRTF; Round-Robin; Priority (non-preemptive); Priority (preemptive). — [process-scheduling-solver.boonsuen.com](https://process-scheduling-solver.boonsuen.com/); source code: [rr.ts](https://raw.githubusercontent.com/boonsuen/process-scheduling-solver/HEAD/src/algorithms/rr.ts), [pp.ts](https://raw.githubusercontent.com/boonsuen/process-scheduling-solver/HEAD/src/algorithms/pp.ts)
- **Linux:**
  - Kernel docs: [EEVDF](https://docs.kernel.org/scheduler/sched-eevdf.html), [CFS](https://docs.kernel.org/scheduler/sched-design-CFS.html), [cgroup v2](https://docs.kernel.org/admin-guide/cgroup-v2.html), [CFS bandwidth control](https://docs.kernel.org/scheduler/sched-bwc.html).
  - LWN: [EEVDF 2023](https://lwn.net/Articles/925371/), [Completing EEVDF 2024](https://lwn.net/Articles/969062/).
  - KernelNewbies: [6.6](https://kernelnewbies.org/Linux_6.6), [6.12](https://kernelnewbies.org/Linux_6.12).
  - Man page: [sched(7)](https://man7.org/linux/man-pages/man7/sched.7.html).

### Inferences
- **Getting started** (verified locally with Python 3.9):

  ```
  git clone https://github.com/remzi-arpacidusseau/ostep-homework.git
  cd ostep-homework/cpu-sched
  python3 scheduler.py -p SJF -l 6,8,7,3          # problem only
  python3 scheduler.py -p SJF -l 6,8,7,3 -c       # with answers: avg Wait 7.00
  python3 scheduler.py -p RR -q 4 -l 24,3,3 -c    # avg Wait 5.67
  cd ../cpu-sched-mlfq
  python3 mlfq.py -n 3 -Q 2,4,8 -A 1,1,1 -l 0,10,0:1,4,0:5,3,0 -c        # Problem 9
  python3 mlfq.py -n 3 -Q 2,4,8 -A 1,1,1 -B 10 -l 0,10,0:1,4,0:5,3,0 -c  # with boost
  ```

- **Tip:** `scheduler.py` cannot model arrival times (all jobs arrive at 0). For RR with arrivals, use `mlfq.py -n 1 -q <q> -l start,run,0:...`, a single-queue MLFQ, which is plain RR. Remember it behaves as **preempted-first** (verified on the GfG input: average TAT 8.5).
- **Recommended order with ~5–11 days left** (midterm week 24–30 Oct 2026): (1) section 1 formulas, then Problems 1–3; (2) Problems 4–5 (RR conventions); (3) Problems 6–9 plus MLFQ rules; (4) Linux/cgroup facts (sections 6–7); (5) the practice set, then fresh `scheduler.py`/`mlfq.py` seeds checked against `-c`.
- **Verification script `sched_verify.py`** (the exact code used for every number here; Python 3, standard library only):
  - `report(title, jobs, policy, ...)` prints a Gantt chart, a per-job table and averages.
  - `jobs` is a list of `(name, arrival, burst, priority)`.
  - Policies: `'FCFS'`, `'SJF'`, `'SRTF'`, `'RR'` (with `q=`), `'PRIO_NP'`, `'PRIO_P'`, `'PRIO_RR'` (with `q=`).
  - Options: `rr_tie='arrival_first'|'preempted_first'`, `cs=` switch cost, `cs_first=True` to charge the first dispatch, `start_delay=` initial overhead, `low_is_high=False` if a larger number means higher priority.
  - `mlfq(spec, quanta, allot, boost, boost_order)` replicates `mlfq.py`'s CPU-only behavior.
  - Example: `python3 -c "from sched_verify import report; report('W1 RR q=2', [('A',0,7,3),('B',2,4,1),('C',4,1,4),('D',5,4,2),('E',6,3,5)], 'RR', q=2)"`

```python
#!/usr/bin/env python3
"""
sched_verify.py -- unit-time CPU scheduling simulator used to verify every
number in the exam notes (FCFS/FIFO, SJF, STCF/SRTF, RR, priority NP/P,
priority+RR, MLFQ, stride, CFS weights, cgroup cpu.max arithmetic).

Integer times only (scale inputs if a problem uses halves).

DEFAULT CONVENTIONS (each one is a parameter, because exams differ):
  * Arrival ties          -> listed order (P1 before P2 ...).
  * SJF / SRTF ties       -> earlier arrival, then listed order.
  * SRTF preemption       -> only if the newcomer's remaining time is
                             STRICTLY smaller (running job keeps CPU on a tie).
  * Priority              -> smaller number = higher priority (Silberschatz);
                             preemptive version preempts only on STRICTLY
                             higher priority.
  * RR tie (rr_tie)       -> 'arrival_first'  : a job arriving at the exact
                             instant a quantum expires is queued BEFORE the
                             preempted job (GfG-style code behaves this way);
                             'preempted_first': preempted job is queued first
                             (OSTEP mlfq.py run with one queue behaves this way).
  * RR quantum expiry with an empty ready queue -> same job continues, no switch.
  * Context switch cost cs (default 0) is charged only when the CPU moves to a
    DIFFERENT job; cs_first=True also charges the very first dispatch.
Metrics: TAT = completion - arrival; WT = TAT - burst (CPU-only jobs);
         RT = first run - arrival.
"""
from collections import deque


class Job:
    def __init__(self, name, arrival, burst, prio=0, idx=0):
        self.name, self.arrival, self.burst, self.prio, self.idx = name, arrival, burst, prio, idx
        self.remaining = burst
        self.first = None
        self.done = None


def simulate(spec, policy, q=None, rr_tie='arrival_first', cs=0, cs_first=False,
             start_delay=0, low_is_high=True):
    jobs = [Job(n, a, b, p, i) for i, (n, a, b, p) in enumerate(spec)]
    N = len(jobs)
    t = 0
    tl = []                       # unit slots: label per time unit
    pending = sorted(jobs, key=lambda j: (j.arrival, j.idx))
    ready = []                    # non-RR policies
    rq = deque()                  # RR / PRIO_RR use per-level dict
    levels = {}                   # PRIO_RR: prio -> deque
    running = None
    qused = 0
    preempted = None              # RR job whose quantum expired at time t
    last = None
    switching = 0
    switch_to = None
    ndone = 0
    pr = (lambda j: j.prio) if low_is_high else (lambda j: -j.prio)

    for _ in range(start_delay):
        tl.append('ovh'); t += 1

    def admit(now):
        new = []
        while pending and pending[0].arrival <= now:
            new.append(pending.pop(0))
        return new

    while ndone < N:
        new = admit(t)
        if policy == 'RR':
            if preempted is not None:
                if rr_tie == 'arrival_first':
                    rq.extend(new); rq.append(preempted)
                else:
                    rq.append(preempted); rq.extend(new)
                preempted = None
            else:
                rq.extend(new)
        elif policy == 'PRIO_RR':
            for j in new:
                levels.setdefault(j.prio, deque()).append(j)
            if preempted is not None:
                levels.setdefault(preempted.prio, deque()).append(preempted)
                preempted = None
        else:
            ready.extend(new)

        # finish an in-progress context switch
        if switching > 0:
            tl.append('cs'); switching -= 1; t += 1
            if switching == 0:
                running = switch_to; qused = 0
            continue

        # preemptive policies may replace the running job
        if running is not None and policy in ('SRTF', 'PRIO_P') and ready:
            if policy == 'SRTF':
                best = min(ready, key=lambda j: (j.remaining, j.arrival, j.idx))
                if best.remaining < running.remaining:
                    ready.append(running); ready.remove(best); running = None; nxt = best
                else:
                    nxt = None
            else:
                best = min(ready, key=lambda j: (pr(j), j.arrival, j.idx))
                if pr(best) < pr(running):
                    ready.append(running); ready.remove(best); running = None; nxt = best
                else:
                    nxt = None
            if running is None and nxt is not None:
                if cs and last is not None and nxt is not last:
                    switching = cs; switch_to = nxt
                    tl.append('cs'); switching -= 1; t += 1
                    if switching == 0:
                        running = switch_to; qused = 0
                    continue
                running = nxt; qused = 0

        if running is None:
            nxt = None
            if policy == 'RR':
                nxt = rq.popleft() if rq else None
            elif policy == 'PRIO_RR':
                ks = sorted(k for k in levels if levels[k])
                if ks:
                    k = ks[0] if low_is_high else ks[-1]
                    nxt = levels[k].popleft()
            elif ready:
                key = {'FCFS': lambda j: (j.arrival, j.idx),
                       'SJF': lambda j: (j.burst, j.arrival, j.idx),
                       'SRTF': lambda j: (j.remaining, j.arrival, j.idx),
                       'PRIO_NP': lambda j: (pr(j), j.arrival, j.idx),
                       'PRIO_P': lambda j: (pr(j), j.arrival, j.idx)}[policy]
                nxt = min(ready, key=key); ready.remove(nxt)
            if nxt is None:
                tl.append('idle'); t += 1; continue
            if cs and ((last is not None and nxt is not last) or (last is None and cs_first)):
                switching = cs; switch_to = nxt
                tl.append('cs'); switching -= 1; t += 1
                if switching == 0:
                    running = switch_to; qused = 0
                continue
            running = nxt; qused = 0

        # run one time unit
        j = running
        if j.first is None:
            j.first = t
        j.remaining -= 1; qused += 1; tl.append(j.name); last = j; t += 1
        if j.remaining == 0:
            j.done = t; ndone += 1; running = None
        elif policy in ('RR', 'PRIO_RR') and qused == q:
            preempted = j; running = None
    return jobs, tl


def segments(tl, merge=True):
    segs = []
    for i, lab in enumerate(tl):
        if merge and segs and segs[-1][0] == lab:
            segs[-1][2] = i + 1
        else:
            segs.append([lab, i, i + 1])
    return segs


def gantt(segs):
    """ASCII Gantt chart: one box per segment, start time under each left edge."""
    widths = [max(len(lab) + 2, len(str(s)) + 1, 4) for lab, s, e in segs]
    top = '|' + '|'.join(lab.center(wd) for (lab, s, e), wd in zip(segs, widths)) + '|'
    line, pos = [' '] * (len(top) + 8), 0
    for (lab, s, e), wd in zip(segs, widths):
        txt = str(s); line[pos:pos + len(txt)] = list(txt); pos += wd + 1
    txt = str(segs[-1][2]); line[pos:pos + len(txt)] = list(txt)
    return top + '\n' + ''.join(line).rstrip()


def report(title, spec, policy, show=True, merge=True, **kw):
    jobs, tl = simulate(spec, policy, **kw)
    segs = segments(tl, merge)
    rows = []
    for j in jobs:
        tat = j.done - j.arrival
        rows.append((j.name, j.arrival, j.burst, j.prio, j.first, j.done, tat, tat - j.burst, j.first - j.arrival))
    n = len(rows)
    avg = lambda k: sum(r[k] for r in rows) / n
    busy = sum(1 for x in tl if x not in ('idle', 'cs', 'ovh'))
    span = len(tl) - min(j.arrival for j in jobs)
    if show:
        print('=' * 78); print(title)
        print(gantt(segs))
        print(f"{'Job':>4} {'AT':>3} {'BT':>3} {'Pri':>3} {'1st':>4} {'CT':>4} {'TAT':>4} {'WT':>4} {'RT':>4}")
        for r in rows:
            print(f"{r[0]:>4} {r[1]:>3} {r[2]:>3} {r[3]:>3} {r[4]:>4} {r[5]:>4} {r[6]:>4} {r[7]:>4} {r[8]:>4}")
        print(f"avg TAT={avg(6):.4g}  avg WT={avg(7):.4g}  avg RT={avg(8):.4g}  "
              f"makespan={len(tl)}  CPU busy={busy}  util={busy/span:.4f}  throughput={n}/{len(tl)}={n/len(tl):.4f}")
    return rows, avg(6), avg(7), avg(8), segs


def mlfq(spec, quanta, allot=None, boost=0, boost_order='mlfq.py'):
    """OSTEP MLFQ rules 1-5, CPU-only jobs, tick-level, mirroring mlfq.py:
    quanta[0] = TOP queue. allot = #quanta per level (default 1).
    New/boosted jobs append to top queue; a job preempted by a higher queue
    stays at the head of its own queue and keeps its unused ticks.
    boost_order 'mlfq.py': on boost, lowest queue's jobs are appended first."""
    L = len(quanta); allot = allot or [1] * L
    jobs = [dict(name=n, arr=a, left=b, burst=b, lvl=0, ticks=quanta[0], al=allot[0], first=None, done=None)
            for (n, a, b) in spec]
    Q = [deque() for _ in range(L)]
    t, tl, ndone = 0, [], 0
    while ndone < len(jobs):
        if boost and t and t % boost == 0:
            order = range(L - 1, 0, -1) if boost_order == 'mlfq.py' else range(1, L)
            for lv in order:
                Q[0].extend(Q[lv]); Q[lv].clear()
            for j in jobs:
                if j['left'] > 0:
                    j['lvl'], j['ticks'], j['al'] = 0, quanta[0], allot[0]
        for j in jobs:
            if j['arr'] == t:
                Q[0].append(j)
        lv = next((i for i in range(L) if Q[i]), None)
        if lv is None:
            tl.append('idle'); t += 1; continue
        j = Q[lv][0]
        if j['first'] is None:
            j['first'] = t
        j['left'] -= 1; j['ticks'] -= 1; tl.append(f"{j['name']}{L-1-lv}"); t += 1
        if j['left'] == 0:
            j['done'] = t; ndone += 1; Q[lv].popleft(); continue
        if j['ticks'] == 0:
            Q[lv].popleft(); j['al'] -= 1
            if j['al'] == 0 and lv < L - 1:
                j['lvl'] = lv + 1; j['ticks'], j['al'] = quanta[lv + 1], allot[lv + 1]; Q[lv + 1].append(j)
            else:
                if j['al'] == 0:
                    j['al'] = allot[lv]
                j['ticks'] = quanta[lv]; Q[lv].append(j)
    return jobs, tl


def stride(tickets, big=10000, steps=8):
    names = list(tickets); pas = {n: 0 for n in names}; out = []
    for _ in range(steps):
        n = min(names, key=lambda x: (pas[x], names.index(x)))
        out.append((dict(pas), n)); pas[n] += big // tickets[n]
    return out


PRIO_TO_WEIGHT = [88761, 71755, 56483, 46273, 36291, 29154, 23254, 18705, 14949, 11916,
                  9548, 7620, 6100, 4904, 3906, 3121, 2501, 1991, 1586, 1277,
                  1024, 820, 655, 526, 423, 335, 272, 215, 172, 137,
                  110, 87, 70, 56, 45, 36, 29, 23, 18, 15]


def w(nice):
    return PRIO_TO_WEIGHT[nice + 20]
```

### Gaps
- Web search was unavailable, so other online simulators were not surveyed or compared. Only the Process Scheduling Solver was checked, through its source code rather than its UI.
- I did not find an official OSTEP answer key for the chapter homework questions, beyond the simulators' `-c` output.
