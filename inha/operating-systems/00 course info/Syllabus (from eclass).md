# Operating System — SOC3010-003 (Fall 2026)
Prof. Yusupov Jalolliddin (j.yusupov@inha.uz) · Mon/Wed, A-203 / B-209 · lectures only; all practical work runs on your own Ubuntu machine or VM.
Source: eclass syllabus (course id 2605), copied 2026-10-19.

## Grading
| Midterm | Final | Term project (ETC) | Quizzes (weekly, online) | Assignments (4 HWs) | Attendance |
|---|---|---|---|---|---|
| **25%** | **25%** | **20%** | 10% | 10% | 10% |

- **Late policy:** deadlines are hard at the LMS close and nothing is accepted after it. You can resubmit as many times as you like before the deadline.
- **AI policy:** you may use AI for studying and as a coding assistant. **Disclose every use in one line** (which tool, for what). **Grades come from what you can explain and modify in person**, through sampled oral checks on homework and an individual oral defence at the project fair. Work you cannot explain is graded as not done.

## ⏰ Right now (19 Oct)
- **HW2 (2.5%) is due Sat 24 Oct, 23:55, and shows "No attempt".** The assignment is comprehensive; you only need every part for maximum points. The starter code is in `A/assignments/HW2 - hw2-starter/`.
- **Quiz 4 "FOUR ROOMS — Synchronisation 1"** (week 7, 2%) is a completion-code game page.
- **Midterm** is in week 8 (24–30 Oct); classes are Mon/Wed, so probably **Mon 26 or Wed 28**. Week 7 includes a "**midterm workshop on process graphs, pipes and signals**".

## Textbooks
- **OSTEP**: *Operating Systems: Three Easy Pieces*, Arpaci-Dusseau, 2023. Free online at ostep.org.
- Silberschatz, Galvin & Gagne, *Operating System Concepts* (Wiley 2018).
- Reference: Kerrisk, *The Linux Programming Interface* (No Starch 2010).

## Weeks 1–7 (midterm scope)
| Wk | Theme | Content | Practice / tests listed |
|---|---|---|---|
| 1 | Processes and signals, completed | Process states, fork and process graphs, waitpid and status macros, zombies and orphans, signals and handlers; the exec family (why fork and exec are separate); sigaction, signal masks, interrupted system calls, safe handlers, reaping with SIGCHLD; the duties of process 1; clean shutdown | Predict the output of a fork/exec/signal program on paper; minimal shell |
| 2 | Shell and CPU scheduling | Exit codes, quoting, subshells, sessions/process groups, job control, daemons, traps, bash. Scheduling: how the OS regains the CPU; turnaround and response time; FCFS, SJF, RR, priorities; MLFQ; the Linux scheduler; cgroup CPU limits | **Compute schedules by hand** |
| 3 | IPC: pipes and FIFOs | Message passing vs shared memory; pipes (inheritance across fork, closing unused ends, blocking/EOF rules, atomic writes, SIGPIPE); dup2 redirection; FIFOs; client-server; multi-stage pipeline | **Find the fault in a program that hangs on a pipe** |
| 4 | Message queues, shared memory, semaphores | POSIX vs System V queues, priorities, persistence; shared memory; **the lost-update problem**; a semaphore as the lock; cleaning up IPC objects | Shared counter made correct with a semaphore |
| 5 | Sockets and concurrent servers | Socket calls, listen queue, message framing; peer death, address reuse; Unix domain sockets; architectures (iterative, process per client, pre-forked pool); select/poll | Multi-client chat server |
| 6 | Synchronisation with semaphores | Patterns: mutual exclusion, multiplex, signalling, barrier; ordering problems and **precedence graphs**; paper workshop with **invariants and trace tables**, missing waits/signals, **enumerating interleavings**, the classic semaphore bugs | Bounded buffer; trace a semaphore program by hand |
| 7 | Classical problems | **Lightswitch; readers-writers** (writer starvation, the **turnstile** fix); categorical mutual exclusion; **sleeping barber** (one and several barbers); **dining philosophers** (deadlock, starvation, resource-allocation graphs); **midterm workshop on process graphs, pipes and signals** | |
| **8** | **MIDTERM** | | |
| 9–14 | (final) | Threads and locks; condition variables and RW locks; deadlock and event-based concurrency; memory (paging, TLB, swapping, allocation, the OOM killer); files and file systems | |

## From the professor's own slides (Slide 1 Course Organization / Slide 2)
- **Midterm: week 8, 26–30 Oct. "Covers processes, IPC, semaphores"** [S02-p7]. Week 7 has the midterm workshop on process graphs, pipes and signals [S01-p15].
- **Attendance:** more than 25% unexcused absence = **F**. Arriving more than 10 minutes late = attendance not registered.
- **Integrity:** any dishonesty = grade 0 for that part of the course. AI use must be disclosed. Grades depend on oral checks.
- **Final:** week 15 (S02-p7 says 21–25 Dec), followed by the Project Fair.
- ⚠️ **Run all OS code on the Ubuntu VM, not macOS.** On macOS, `sem_init` is not implemented: it returns -1, the program runs, and it silently gives wrong results. POSIX message queues (`<mqueue.h>`) don't exist on macOS, and signal numbers differ (use signal names).
