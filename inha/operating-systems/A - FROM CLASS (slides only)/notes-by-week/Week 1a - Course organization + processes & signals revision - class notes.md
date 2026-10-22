# Week 1a — Course organization; processes & signals revision (CLASS NOTES — from slides only)
> Sources: Slide 1 Course Organization.pdf (27 p) [S01-p#], Slide 2 Processes and Signals, Completed.pdf (13 p) [S02-p#].
>
> **Track A only.** Every fact here comes from these two decks. The only additions are my own compile-and-run checks of the slides' code and commands, marked **verified** (macOS, Apple clang 21, bash 3.2).
> Legend: ⭐ professor emphasis (bold/red/highlighted, exam talk, questions to the class) · ⚠️ typo, bug or inconsistency · 🔎 not on these slides, so look it up in Track B.

---

## 1. Big picture

- **What the course is** [S01-p3]: it explains how a *modern* OS works from the point of view of the programs that run on it. It starts by finishing the process-and-signal *foundations* from *System Programming* (SOC 2040). Everything runs on Linux, and you observe, measure and implement each concept on your own machine. Topic order: Process/Thread → Inter-Process Communication → Concurrency (synchronisation) → Memory and File System.
- **Grading** ⭐ [S01-p7]: Attendance 10% · Weekly Quizzes (10 of them) 10% · Home Assignments (4) 10% · Term Project (1) 20% · **Midterm 25%** · **Final 25%**. Grades are **relative** (A+, A0, B+, B0, C+, C0, D+, D0, F).
- **Midterm** ⭐: Week 8, **26–30 Oct**, 25%. The schedule card says it "Covers processes, IPC, semaphores" [S02-p7]. Week 7 ends with a "**midterm workshop on process graphs, pipes and signals**" [S01-p15], and the Week 8 slide only says "It's midterm season. Enough said." [S01-p16]. The Week 1 lab practises predicting **on paper** the output of a generated fork/exec/signal program [S01-p9]. The slides do **not** give the exam format (length, paper or computer, allowed materials), so check eClass or ask the professor.
- **AI policy and oral checks** ⭐ [S01-p8]: you may use AI for studying and as a coding assistant, but you must **disclose every use in the submission**. Grades depend on what you can **explain and modify in person**: sampled oral checks on home assignments, plus an individual oral defence at the project demonstration. "Submitted work that the student cannot explain is graded as not done."
- **Hard rules** ⭐ [S01-p5, p8, p25, p26]: no phones in lectures. If you arrive more than 10 min late, your attendance is not registered. Laptops are for course work only. Late submissions are not accepted. Missing more than 25% of the hours without a valid reason gives a grade **F**. Any act of academic dishonesty gives **grade 0 for that part** of the course. The slide shows a similarity checker that ranks code against every other submission and known online sources, and renaming variables does not fool it.
- **Tools and books** [S01-p2, p6, p8]: Linux (Ubuntu). The required textbook is OSTEP (free at ostep.org). Recommended: Silberschatz, *Operating System Concepts* (10th ed.), and TLPI (*The Linux Programming Interface*). All interaction and submissions go through **eClass**. The labs also mention a "course simulator" [S01-p10, p20], and in-class recaps use **livepoll.io** [S02-p6].
- **This week's lecture** ⭐ [S01-p9] is "Processes and Signals, Completed" (OSTEP Ch 4–6). It has two halves:
  - **Review** of SOC 2040: process states, fork and process graphs, waitpid and the status macros, zombies and orphans, signals and handlers.
  - **"What was missing"**: the exec family, sigaction, signal masks, interrupted system calls, safe handlers, reaping children with SIGCHLD, the duties of process 1, and clean shutdown.
- **What Slide 2 actually covers** [S02]: the OS as a "beautiful interface" over ugly hardware; program vs process and the kernel's "two lies"; the 5-state process diagram; `fork()` (one call, two returns; what it copies; nondeterminism); `waitpid()` and its `pid` argument; signals as "doorbells"; and a signal-handler demo, `multi_signal.c`.
  - These two decks do **not** cover the status macros, zombies and orphans, drawn process graphs, exec, sigaction and the other "missing" items. Look for them in the other Week-1 decks ("Slide 3 (Process Signal) v2", "Slide 16 (Process)", "Slide 17 (Signals)"); otherwise 🔎 Track B.
- **Mindset shift** [S02-p5]: in SOC 2040 you were the *driver*, telling a black-box OS what to do. In SOC 3010 you become "the mechanic and the engineer" and learn *how* the OS does it.

---

## 2. Page-by-page notes

**▶ Slide 1 — Course Organization (27 pages)**

### [S01-p1] Title: SOC 3010 Operating Systems, Course Organization
- **Course:** SOC 3010 Operating Systems, INHA University in Tashkent.
- **Instructor:** Jalolliddin Yusupov, "Professor of SOCIE (Room A406)", j.yusupov@inha.uz.
- **Joke stats:** **Credits: 3** ("You'll earn these") · **Class hours: 3** ("Where the magic happens") · **Homework hours: ∞** ("Where the debugging happens").
- **Footer joke:** "Serious inquiries only. For panic attacks, please press Ctrl+Alt+Del".
- **Picture:** the Linux penguin (Tux) sitting on a circuit board, plus the INHA University in Tashkent logo.

### [S01-p2] Instructor: Yusupov Jalolliddin
- **Teaches:** SOC 3010 Operating Systems, SOC 2040 System Programming, SOC 4190 Blockchain Basics & Platforms.
- **Contact details:** email j.yusupov@inha.uz · Room A406/4 · interaction **through eClass**.
- **Office hours:** **Tuesday 13.00–14.00**; Thursday by appointment.
- **Interests:** hiking, espresso.
- **Photos:** the professor speaking at a lecture podium, and a mountain valley with a cable car.

### [S01-p3] Course Syllabus: Course Description
- **Paraphrase:** the course gives you what you need to understand how a **modern** OS works, *from the point of view of the programs that run on it*.
- ⭐ It begins by completing the process and signal **foundations** from **System Programming** (bold on the slide). It works on Linux throughout: every concept from the lecture is "observed, measured and implemented by the student on their own machine."
- **Diagram:** a wide arrow pointing right, like a timeline, with four circles. The labels alternate above and below:
  **Process, Thread** → **Inter-Process Communication** → **Concurrency (synchronisation)** → **Memory, and File System**. This is the order of the course.

### [S01-p4] Course Syllabus: Course Learning Objectives & Outcomes
- **Two objectives** (yellow boxes):
  1. "Understand basic concepts of operating system". This relates to Program Outcome **PO 2**.
  2. "Implementing a simple operating system". This relates to **PO 3**.
- **Orange banner:** "At the end of the course, students should have":

| Outcome | ABEEK definition (as on slide) |
|---|---|
| **PO2** | Analysis of experimental data: an ability to understand and analyze data, and plan and execute experiments |
| **PO3** | Problem formulation & solution: an ability to define, formulate and solve engineering problems |

(The slide does not spell out "ABEEK".)

### [S01-p5] Offline Class Rules: "TO BE FOLLOWED VERY STRICTLY" ⭐
1. **Professional Conduct & Etiquette**
   - Zero distractions: **no phones during lectures**.
   - Punctuality: attendance is **not registered if you arrive more than 10 minutes** after class starts.
2. **Technology Policy (Laptop Use):** course-related activity only.
3. ⭐ **Attendance & Exam Eligibility.** The slide gives no details; the attendance policy on [S01-p25] says more than 25% unexcused absence gives an F.
4. **Academic Integrity (Code & Assignments):** original work.
- **Picture:** a mock **"Similarity report"** for "Sorting Lab · 214 submissions", flagged ⚠ **94% match**. It compares two students' Python files side by side:

  Alex Chen, `sort.py`:
  ```python
  def bubble_sort(arr):
      n = len(arr)
      for i in range(n):
          for j in range(n-i-1):
              if arr[j] > arr[j+1]:
                  arr[j],arr[j+1] = arr[j+1],arr[j]
      return arr
  ```
  Jordan Blake, `solution.py`:
  ```python
  def sort_list(data):
      size = len(data)
      for x in range(size):
          for y in range(size-x-1):
              if data[y] > data[y+1]:
                  data[y],data[y+1] = data[y+1],data[y]
      return data
  ```
  - **Highlighting:** lines 1–2 are orange, meaning "Renamed variables". Lines 3–7 are red, meaning "Identical control flow".
  - **Footnote:** "Ranked against every other submission and known online sources."
  - **Message:** renaming functions and variables does not hide copying, because the control flow is identical.

### [S01-p6] Prerequisites, tools and textbooks (slide title: "Course Learning Objectives & Outcomes")
- ⚠️ The title is reused from p4; the content is actually prerequisites, tools and books.
- **Prerequisites:** **[MANDATORY]** C programming and data structures.
- **Recommended courses after this one:** computer security, embedded systems.
- **Course software/tool:** Linux (Ubuntu distribution).
- **Textbooks:**
  - **REQUIRED:** *Operating Systems: Three Easy Pieces* (**OSTEP**), Remzi H. et al., 2023 (v1.10), free at www.ostep.org.
  - **RECOMMENDED:** *Operating System Concepts*, 10th ed., Silberschatz (ISBN 978-1118063330). Each week lists both OSTEP and Silberschatz chapters, and you may read either.
  - **RECOMMENDED:** *The Linux Programming Interface: A Linux and UNIX System Programming Handbook* (ISBN 1593272200). ⚠️ Typo: it is abbreviated "**TPLI**" here but "**TLPI**" everywhere else (p10–p13, S02-p7).

### [S01-p7] Grading Policy ⭐
- **Methods of evaluation:** one midterm exam, one final exam, weekly quizzes, home assignments and a term project.

| Component | Weight |
|---|---|
| Attendance | 10% |
| Weekly Quizzes (10) | 10% |
| Home Assignment (4) | 10% |
| Term Project Work (1) | 20% |
| **Mid-Term Exam** | **25%** |
| **Final Exam** | **25%** |
| **Total** | **100%** |

- ⭐ **Orange banner:** "(Relative) GRADES AWARDED: A+, A0, B+, B0, C+, C0, D+, D0, F (FAIL)". Grades are relative.
- **Quick arithmetic:** the two exams give 50%; attendance, quizzes, homework and project give the other 50%.

### [S01-p8] Team Formation Instructions for Term Project ⭐
- Form teams with a team leader and members for the **Term Project (details will be provided)** (bold on the slide).
- "E-Class" is the submission and interaction platform; the slide gives only the word.
- Late submissions will not be accepted, and deadlines must be followed strictly.
- ⭐ **AI policy** (paraphrased):
  - You may use AI tools for studying and as a coding assistant.
  - Any use **must be disclosed in the submission**.
  - Grades are decided by what you can **explain and modify in person**: sampled **oral checks on home assignments**, and the **individual oral defence** at the project demonstration.
  - "Submitted work that the student cannot explain is graded as not done."

### [S01-p9] Week I: Processes and Signals, Completed (OSTEP Ch 4, 5, 6) ⭐ (this lecture)
- **Part 1, "Review and deepening of System Programming":**
  - process states
  - fork and **process graphs**
  - waitpid and the **status macros**
  - **zombies and orphans**
  - signals and handlers
- ⭐ **Part 2, "Continue with what was missing"** (bold on the slide):
  - the **exec family**, and why fork and exec are separate
  - **sigaction**
  - **signal masks**
  - **interrupted system calls**
  - writing a **safe signal handler**
  - **reaping children with SIGCHLD**
  - the **duties of process 1**
  - shutting a program down cleanly
- **Lab objective:**
  - ⭐ Predict **on paper** the output of a generated fork/exec/signal program, then run it and **explain every difference**. This is the "predict the output" skill.
  - Write a minimal shell that runs a command and reports its exit status.
- **Coverage note:** Slide 2 (below) shows only part of the review half: states, fork, waitpid and basic signals. The status macros, zombies and orphans, process-graph drawings and every Part 2 item are **not** in S01 or S02. Look in the other Week-1 decks, or 🔎 Track B.

### [S01-p10] Week II: The Shell and CPU Scheduling (TLPI Ch 34; OSTEP Ch 7, 8)
- **Shell topics:**
  - exit codes
  - quoting
  - subshells
  - sessions and process groups
  - job control
  - daemons
  - traps
  - **bash script programming** (bold on the slide)
- **Scheduling topics:**
  - how the OS regains the CPU
  - turnaround and response time
  - first-come-first-served, shortest job first, round robin, priorities
  - the multi-level feedback queue
  - the Linux scheduler and control-group CPU limits
- **Lab:**
  - Extend the shell with signal handling and job control, with **no zombie processes**.
  - Write a shell script that supervises a service.
  - Compute schedules **by hand** for a set of jobs, then verify them with the course simulator.
- **Links to Slide 2:**
  - waitpid's `pid < -1` case is tagged "(W2's job control)" [S02-p11].
  - "Who prints first is the scheduler's mood (W2)" [S02-p10].
  - Lie #1 is tagged "(scheduling, W2)" [S02-p8].

### [S01-p11] Week III: IPC, Pipes and FIFOs (TLPI Ch 44)
- **Background:** why processes cannot see each other's memory; message passing vs shared memory.
- **Pipes:**
  - creation
  - **inheritance across fork**
  - closing unused ends
  - blocking and end-of-file rules
  - atomic writes
  - the SIGPIPE signal
  - redirection with dup2
- **Named pipes (FIFOs):** a simple client-server built on them, and the multi-stage pipeline.
- **Lab:**
  - Add multi-stage pipelines and redirection to the shell, with no leaked file descriptors.
  - Find and repair the fault in a supplied program that **hangs on a pipe**.
- **Link:** fork's shared fd table is the thing "W3's pipes depend on" [S02-p10].

### [S01-p12] Week IV: IPC, Message Queues, Shared Memory and Semaphores (TLPI Ch 45–54)
- **Message queues:** POSIX and System V interfaces, message priorities, and the persistence of System V objects.
- **Shared memory:** creating and mapping a shared region.
- **Semaphores:** the **lost-update problem** is demonstrated, and the **first semaphore** is introduced as the lock that protects shared memory between processes.
- **Clean-up:** removing IPC objects.
- **Lab:**
  - Make a shared-memory counter correct with a semaphore and prove it under load.
  - Build a message-queue logger with priorities.

### [S01-p13] Week V: Sockets and Concurrent Servers (TLPI Ch 56–61)
- **Sockets:** the socket system calls, the listen queue, and message framing over a byte stream.
- **Robustness:** handling a peer's death, and reusing an address.
- **Unix domain sockets:** peer credentials, and passing an open file between processes.
- **Server architectures:** one client at a time, a process per client, or a pool of processes; select and poll.
- **Lab:** write a multi-client chat server with one process per client, sharing the room state through shared memory and a semaphore.

### [S01-p14] Week VI: Synchronisation with Semaphores (OSTEP Ch 31; Downey Ch 1–4)
- **Part 1, semaphore patterns with processes and shared memory:**
  - mutual exclusion
  - multiplex
  - signalling
  - barrier
  - ordering problems and **precedence graphs**
- **Part 2, a workshop on paper:**
  - invariants and **trace tables**
  - filling in the missing waits and signals
  - **enumerating the possible interleavings**
  - the catalogue of classic semaphore bugs
- **Lab:**
  - Implement the bounded buffer in shared memory with semaphores: no message lost or duplicated, and no busy waiting.
  - Write a precedence-graph program from a generated graph.
  - Trace a generated semaphore program by hand, then run it.
- 🔎 The slide does not explain who "Downey" is. Look it up in Track B.

### [S01-p15] Week VII: Synchronisation with Semaphores and the Classical Problems (OSTEP Ch 31)
- **Part 1:**
  - the lightswitch pattern
  - the readers-and-writers problem, with **writer starvation** measured and fixed with a **turnstile**
  - categorical mutual exclusion
  - the sleeping barber, with one barber and with several
- **Part 2:**
  - the dining philosophers: why the naive solution deadlocks, and the starvation scenario
  - resource allocation graphs
  - ⭐ **"midterm workshop on process graphs, pipes and signals"**. This is the in-class midterm preparation. My inference, not stated on the slide: the three topics it names are probably what the midterm tests.
- **Lab:**
  - readers-writers under two policies, with a starvation measurement and the turnstile fix
  - the sleeping barber with several barbers
  - the dining philosophers made to deadlock, then fixed
- ⚠️ Trivial: the slide ends with "signals.." (a double full stop).

### [S01-p16] Week VIII: (midterm week) ⭐
- There is no lecture topic and no lab. The slide only says **"It's midterm season. Enough said."**
- **Picture:** a SpongeBob meme. SpongeBob smiles calmly in front, while several screaming, panicking SpongeBobs fill the background.
- The dates and weight are on [S02-p7]: **26–30 Oct, 25%**.

### [S01-p17] Week IX: Threads and Locks (OSTEP Ch 26, 27, 28)
- **Threads:** what threads share and what they keep private; the POSIX thread interface; threads as implemented on Linux.
- **Races:** uncontrolled scheduling and the race condition at the instruction level; critical sections and atomicity.
- **Lab:** find, explain and repair the data races planted in a supplied program, while keeping the corrected program fast.

### [S01-p18] Week X: Condition Variables, Read-Write Locks and the Two Idioms (OSTEP Ch 30, 31)
- **Condition variables:** waiting for a condition, why the wait must be **inside a loop**, and signalling one waiter or all of them.
- **Bounded buffer:** derived again with threads, then compared with the semaphore solution from Week 6.
- **Lab:**
  - Replace busy waiting in a thread pool with condition variables.
  - Implement readers-writers with read-write locks and compare it with the semaphore version.

### [S01-p19] Week XI: Concurrency Bugs, Deadlock and Event-Based Concurrency (OSTEP Ch 32, 33)
- On this slide the whole lecture-topic box is bold; that is only formatting.
- **Bugs and deadlock:**
  - concurrency bugs that are not deadlocks
  - the **four conditions for deadlock** and the resource allocation graph
  - livelock, starvation and priority inversion
- **Event-based concurrency:** the event loop and its state machines, and when threads are the wrong tool.
- **Lab:**
  - Diagnose a deadlocked program from its **core dump** and repair it.
  - Rebuild the chat server on an event loop and compare it with the process-per-client version.

### [S01-p20] Week XII: Memory, Address Spaces, Paging and the TLB (OSTEP Ch 13–15, 18–20)
- **Address spaces:** the address space and the illusion it provides; the memory interface and common memory errors; address translation.
- **Paging:** pages and frames; the page table and its entries.
- **Linux:** the address space of a Linux process, memory mapping, and the page fault and its kinds.
- **Lab:**
  - Translate addresses by hand for a given page table, then verify with the course simulator.
  - Write a program that provokes each kind of page fault on demand and reports the measurements.
- **Links to Slide 2:**
  - Lie #2, "Private address space", is tagged "(paging, W12)" [S02-p8].
  - fork's copy-on-write: "the bill arrives in W12" [S02-p10].

### [S01-p21] Week XIII: Memory, Swapping, Allocation and the Out-of-Memory Killer (OSTEP Ch 17, 21, 22)
- **Swapping:** memory beyond the physical; swap space and the page fault that reaches the disk.
- **Free-space management:**
  - splitting, coalescing and the fitting strategies
  - the buddy allocator
  - what the C library allocator really does
- **Out of memory:** memory overcommit, and how the kernel chooses a process to kill.
- **Lab:**
  - Simulate the replacement policies by hand on a given reference string.
  - Implement a small memory allocator and test it.
  - Cause an out-of-memory kill inside a memory-limited group and explain the kernel's choice.
- **Link:** "The kernel maintains this lie until food runs out (W13)" [S02-p8].

### [S01-p22] Week XIV: Files, Directories and File System Implementation (OSTEP Ch 39, 40)
- **Files:** files, directories and the file interface; the **inode**, and why a file name is not the file.
- **Links:** hard links, symbolic links, and what deleting a file really does.
- **File-system layout:** superblock, bitmaps, inode table, data region. Files are indexed with indirect blocks or with extents.
- **Lab:**
  - Answer forensic questions about a supplied file-system image (inode numbers, link counts, file sizes).
  - Recover a deleted file that a running process still holds open.

### [S01-p23] Week XV: FINAL EXAM ⭐
- The slide shows only an orange box: "FINAL EXAM".
- [S02-p7] gives the final as **21–25 Dec**, weight "25% + 20%" (final plus project).

### [S01-p24] Week XVI: Makeup assessment
- The slide shows only an orange box: "MAKUP ASSESMENT". ⚠️ Typo for "Makeup Assessment".
- ⚠️ This conflicts with [S02-p7], which labels W15–16 together as "Final Exam & Project Fair" and says nothing about a makeup.

### [S01-p25] Attendance Policy and Academic Dishonesty Policy ⭐
- **Attendance policy:**
  1. All students should attend all classes.
  2. If you are absent without a valid reason for **more than 25%** of the assigned hours, you get a **Grade "F"**. ⚠️ The closing quotation mark after F is missing on the slide.
- **Academic dishonesty policy** (paraphrased; bold words are as on the slide):
  - To grade **fairly** the work students present **as their own**, there must be trust between instructor and student.
  - Violations usually involve **efforts to deceive instructors**. They breach the **trust relationship between instructor** and student, and undermine the university's core values.
  - So the university treats dishonesty **as serious violations** and runs rigorous investigations.

### [S01-p26] Acts of Academic Dishonesty (include, but not limited to)
- the **illegitimate** use of materials in any form during a quiz or exam
- **copying** answers from another student's quiz or exam paper
- **plagiarizing** (submitting someone else's work as your own ideas), or falsifying materials or information in any individually graded assignment
- submitting the **same work** to more than one course without consent from each course's instructor
- copying material from a web page and submitting it as **one's own work**
- **quoting extensively** from a document without proper references to the source
- ⭐ **Red text:** if you are found doing any of these in a quiz, home assignment, exam, term paper or term project, you get **grade 0 in that part of the course**.

### [S01-p27] Questions?
- Closing slide: "Questions?" next to a black-and-white photo of a modern glass building. It is an open invitation to ask questions and has no content.

---

**▶ Slide 2 — Processes and Signals, Completed (13 pages)**

### [S02-p1] Title: Processes and Signals, Completed
- SOC 3010 Operating Systems; instructor Jalolliddin Yusupov. It uses the same Tux-on-a-circuit-board design as S01-p1.
- The title is exactly the Week I lecture topic on [S01-p9].

### [S02-p2] What is an Operating System?
- **Diagram:** a layered stack, from top to bottom:
  1. **Application programs**
  2. a row of *pretty* pictures (a crowned queen, a castle, a peacock, a flower), labelled "← **Beautiful interface**"
  3. **Operating system**
  4. a row of *ugly* pictures (grotesque faces, a snarling animal, a screaming man, a toad), labelled "← **Ugly interface**"
  5. **Hardware** (grey)
- **Meaning:** the hardware offers an ugly interface. The OS sits on top of it and gives applications a beautiful one.
- **Disclaimer on the slide:** "this slide and the following three are freely inspired from" a UMass lecture (`lass.cs.umass.edu/~shenoy/courses/spring10/lectures/Lec01.pdf`).
- **Hidden text:** the PDF's text layer also contains bullets that the picture **covers**, so they were not visible when projected. I checked with a PDF tool that the picture is drawn on top of them. In paraphrase:
  - The OS provides an interface between the user (application) and the hardware.
  - It creates "virtual" views (sort of "illusions"). Each application can think it has the **entire hardware** to itself, not shared with anybody. For example, an application thinks it is the only one sending and receiving data on the network interface.
  - It **"slices" resources** among requesters: a CPU among many apps, network bandwidth among many senders, and so on.
  - These ideas come back as the "two lies" on [S02-p8].

### [S02-p3] Why do we need to study Operating Systems?
- **Abstraction:** to understand how the OS gives users the illusion of *infinite* memory, CPUs, resources, network, and so on.
- **Better application and system design:** to design your application based on how the OS works. For example: use one OS primitive instead of another, or use OS functions instead of re-implementing them in your app.
  - Applications delegate many functions to the OS by calling kernel-level primitives, the **"system calls"**. The slide links to the man7.org syscalls list.
  - To create apps that **use your computers more effectively**. *Example:* sending to the network one byte at a time is much less efficient than sending the entire buffer at once. ⚠️ Slide typo: "less efficient **that** sending" should be "than".
- **Learn widely-used mechanisms:** OS-course concepts such as concurrency, synchronization and deadlocks are heavily used in **applications**. They are a "must" for programmers and often need explicit support from the OS.

### [S02-p4] Why many operating systems?
- **Different objectives:**
  - be user-friendly
  - be compact (embedded devices, such as a fridge)
  - be robust (critical devices, such as cars)
  - be real-time
  - be open, or create lock-in for users (e.g., Microsoft, Apple)
  - etc.
- **Logos shown:** Home Assistant, Apple, Linux (Tux), Windows, Raspbian (Raspberry Pi and Debian logos), TrueNAS, iOS, Android, Ubuntu, QNX. The slide does not say which OS serves which objective.

### [S02-p5] SOC 2040 System Programming vs SOC 3010 Operating Systems
| SOC 2040 – System Programming (what you did) | SOC 3010 – Operating Systems (what you will do) |
|---|---|
| learned how to be a **power user** of the system: "in the driver's seat" | "We are **opening up that black box**": no longer just the driver |
| how to write C code; make system calls; tell the OS what to do | "you are the **mechanic and the engineer**" |
| treated the OS like a **black box**: a helpful assistant that granted your requests for memory, file access, or network connections | you won't just ask the OS to do things anymore; you figure out exactly ***how*** it does them |
| | how it **prevents programs from crashing into each other**; how it **manages limited hardware resources** behind the scenes |

### [S02-p6] Time for a Quick Recap! ⭐ (questions to the class)
- "Before we move forward, let's review what we remember from the last lectures."
- **Steps:**
  1. Grab your phone or open a new browser tab.
  2. Go to **livepoll.io**, or scan the QR code on the screen.
  3. Answer a few quick questions that test your knowledge of the previous course material.
- **Note:** "This activity is highly encouraged, but not compulsory."
- **Observation:** phones are banned in lectures [S01-p5], but this activity explicitly asks you to use one.

### [S02-p7] SOC 3010 Topic Flow ⭐ (exam dates and midterm scope)
- **Layout:** 12 cards in a grid. Each card has a week tag, a title (sometimes with a badge), keywords, reference tags and a note.
- **Highlighting:** the W1 card is highlighted with a light-blue fill and a "HISTORY" badge. The exam cards (W8, W15–16) have red borders and red badges.

| Week | Title (badge) | Keywords | Refs / tags | Note on the card |
|---|---|---|---|---|
| W1 | Processes & signals (**HISTORY**) | exec · sigaction · review | System Programming; OSTEP 4–6 | ⏮ "Review from SOC 2040 — fork, exec, signal handlers done properly." |
| W2 | The shell & scheduling | bash · job control · MLFQ, CFS | TLPI 34; OSTEP 7–8 | (none) |
| W3–4 | IPC (combined) | Pipes · FIFOs · MQ · shm · semaphores | TLPI 44–54; dup2 plumbing; POSIX-first | "Pipes → message queues → shared memory — the padlock." |
| W5 | Sockets & servers | fd passing · fork · select | TLPI 56–61 | (none) |
| W6–7 | Semaphore patterns (combined) | multiplex · signalling · buffer · R/W · barber · philosophers | OSTEP 31; Downey; Coffman | Classical synchronisation problems with semaphores. |
| ⭐ **W8** | **Midterm (EXAM)** | **26–30 Oct** | **25%** | **"Covers processes, IPC, semaphores."** |
| W9 | Threads & locks | races · TAS/CAS · futex | OSTEP 26–28 | (none) |
| W10 | Condvars & rwlocks | the two idioms · pools | OSTEP 30–31 | ↔ Semaphore trio → condition-variable idiom (drawn). |
| W11 | Deadlock & events | Coffman · lock order · epoll | OSTEP 32–33 | select/poll → epoll event loop. |
| W12–13 | Memory I & II (combined) | paging · TLB · page faults · replacement · malloc · OOM | OSTEP 13–22 | Virtual memory illusion → pressure → the OOM Killer. |
| W14 | Files & FS | inodes · links · access paths | OSTEP 39–40 | fd → open-file → inode triple completed. |
| W15–16 | Final Exam & Project Fair (**FINAL**) | 21–25 Dec · review · container from scratch | 25% + 20%; OSTEP 42 + supp. | ⭐ (star is on the card) "Grand review: build a container from scratch." "W15 originally 'fsync & containers' → replaced with Final Exam." |

- ⭐ **Midterm scope (from the card):** "processes, IPC, semaphores". That maps to W1 (processes and signals), W3–4 (IPC), and the semaphores of W4 and W6–7.
  - The card does not say whether W2 (shell and scheduling) is included. Confirm with the professor.
  - The Week 7 midterm workshop is on "process graphs, pipes and signals" [S01-p15].
- ⚠️ **Inconsistency:** [S01-p23–p24] say W15 is the Final Exam and W16 a makeup assessment. This card says W15–16 is "Final Exam & Project Fair".

### [S02-p8] Program vs. process (section header: "The process, again but deeper")
- ⭐ **Definitions** (the key words are green on the slide):
  - A **program** is a file: "inert, cold, waiting."
  - A **process** is the file *running*. It has **registers, an address space, open files, a PID**, and a "criminal" record: the **signals pending**.
- **Example:** "two bash windows → one program, two processes." The slide's quote: "The same recipe, baked twice — different kitchens, different chefs."
- The grey line "CPU illusion · memory illusion" leads to an orange banner ⭐ **"The Two Lies the Kernel Tells"**:
  - **Lie #1, Logical control flow** (scheduling, W2): every process believes it has the CPU all to itself. The kernel juggles, swaps and preempts, and the process never notices.
  - **Lie #2, Private address space** (paging, W12): every process believes it owns all of memory. In reality it gets "a carefully stage-managed set of pages."
- **Closing quote:** "Every process is told it's an only child. The kernel maintains this lie until food runs out (W13)." Week 13 covers swapping and the Out-of-Memory killer [S01-p21].

### [S02-p9] Process States ⭐
**State diagram** with five oval states: **new, ready, running, waiting, terminated**.

| From → To | Arrow label on slide |
|---|---|
| new → ready | admitted |
| ready → running | scheduler dispatch |
| running → ready | interrupt |
| running → waiting | I/O or event wait |
| waiting → ready | I/O or event completion |
| running → terminated | exit |

**Annotations on the slide:**
- next to **new**: "The process has just been created - **fork()**" (fork() is bold).
- next to **ready**: "It sits in the ready queue waiting for its turn".
- next to **terminated**, the three ways to get there:
  1. receiving a signal
  2. returning from the main routine
  3. calling the exit function
- at the bottom right, under running and waiting: a process is either **executing**, or **waiting** to be executed and will eventually be scheduled ("i.e., chosen to execute") by the kernel. Both words are bold.

**Reading the diagram:**
- Only **running** has arrows to **waiting** and **terminated**.
- A **waiting** process cannot jump straight to **running**. It goes back to **ready** (I/O or event completion), then must be dispatched again.
- The ready ⇄ running loop (scheduler dispatch, then interrupt) is Lie #1 at work [S02-p8].
- **Not every signal terminates.** In [S02-p12] the handled signals do not; in my verified run, the unhandled `Ctrl-\` did (see §5).
- The diagram has **no "stopped" state**. Yet waitpid's definition [S02-p11] mentions a child "stopping", and in my run Ctrl-Z (SIGTSTP) stopped `multi_signal`. 🔎 Track B: where "stopped" fits in the state model.

### [S02-p10] fork(): one call, two returns ⭐
**`fork()` returns:**

| Return value | Where you get it |
|---|---|
| `0` | in the child |
| the child's PID | in the parent |
| `-1` | no child created; `errno` says why |

- ⭐ **Quote:** *"Always check −1 — the one branch students never write is the one production hits."*
- ⭐ Orange banner **"What fork() Actually Copies":**
  - **fd table**: same open files, *shared offsets* ("W3's pipes depend on this")
  - **signal dispositions**: handlers are **inherited**
  - **memory image**: *copy-on-write*. Page tables are copied; pages are shared read-only until someone writes ("the bill arrives in W12")
  - **pending-signal set**: **cleared in the child**. ⚠️ Exam trap: although the heading says "copies", this one is *not* passed on.
- ⭐ **"Nondeterminism is the Default"**: parent and child are two runnable processes.
- ⭐ **Boxed:** "Who prints first is the scheduler's mood (W2). Run it twenty times; collect the orders."
  - The slide shows no program for "it". The lab's generated fork programs [S01-p9] are where you practise this.

### [S02-p11] waitpid(pid, &status, options) ⭐
- **Definition:** `waitpid()` suspends the calling process until a specific child changes its state (for example, terminating or stopping), ⭐ **or a signal is received**.
  - The last part is bold and underlined, and a big yellow arrow points from it down to the signals part of the slide.
  - ⚠️ Wording: the definition says "a **specific** child", but the table below also allows "any child". The slide also has a grammar slip: "or a signal received" is missing "is".
- **The `pid` argument:**

| `pid` value | Waits for |
|---|---|
| `pid > 0` | that specific child |
| `pid = -1` | any child |
| `pid = 0` | any child in my process group |
| `pid < -1` | any child in group \|pid\| (W2's job control) |

- **Shortcut:** `wait(&st)` ≡ `waitpid(-1, &st, 0)`.
- **Not on the slide:**
  - how to decode `status`, i.e. the "status macros" listed for Week 1 on [S01-p9];
  - what `options` values exist besides `0`;
  - what waitpid returns when a signal ends the wait (compare "interrupted system calls" on [S01-p9]).
  - 🔎 Track B: waitpid status macros, options, and interrupted calls.
- ⭐ **"A Signal Is a Doorbell"**: "asynchronous, one integer, no payload."
- **Boxed keyboard shortcuts:**

| Keys | Signal sent |
|---|---|
| `Ctrl-C` | SIGINT |
| `Ctrl-\` | SIGQUIT (with a core dump) |
| `Ctrl-Z` | SIGTSTP |

- **`kill -l`:** "the kernel and other processes ring it". So signals are sent by the kernel or by other processes. Running `kill -l` lists the signal names and numbers; it is **verified** in §5.
- ⭐ **Quote:** *"Signals are doorbells, not conversations — you cannot send a filename through SIGUSR1."* A signal tells you only *which* signal arrived, with no data attached.

### [S02-p12] (TRY THIS OUT) Installing Signal Handlers ⭐
- The section header reads "Signal". ⚠️ The footer reads **SOC 2040**, so this slide is reused from System Programming, which fits the "review" label.
- **Code**, exactly as on the slide:

```c
// multi_signal.c
#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>
void handler(int sig) {
    switch(sig) {
        case SIGINT:
            printf("\nCaught SIGINT (Ctrl+C)\n");
            break;
        case SIGTERM:
            printf("\nCaught SIGTERM (termination request)\n");
            break;
        case SIGUSR1:
            printf("\nCaught SIGUSR1 (user-defined 1)\n");
            break;
    }
}
int main() {
    printf("Process %d waiting for signals...\n", getpid());
    printf("Try: Ctrl+C (SIGINT) or kill -TERM %d (SIGTERM)\n\n", getpid());
    signal(SIGINT, handler);
    signal(SIGTERM, handler);
    signal(SIGUSR1, handler);
    while(1) {
        pause();  // Wait for signals
    }
    return 0;
}
```

- **What it does:**
  1. Prints its PID and a hint.
  2. Installs **one** handler function for three signals (SIGINT, SIGTERM, SIGUSR1) with `signal(sig, handler)`.
  3. Loops forever on `pause()` ("Wait for signals").
  4. The handler's `switch` picks the message for whichever signal arrived.
  - The full trace and a verified run are in §5.
- **Notes:**
  - `return 0;` is never reached because of `while(1)`. The program ends only through a signal it does **not** handle, such as `Ctrl-\`, which sends SIGQUIT.
  - The program's own hint, `kill -TERM <pid>`, does **not** stop it, because SIGTERM is caught.
  - `#include <stdlib.h>` is unused, but harmless: it compiles cleanly with `-Wall -Wextra` (verified).
  - Week 1 promises **sigaction** and "**writing a safe signal handler**" as new material [S01-p9]. This SOC 2040 demo uses `signal()` and calls `printf` inside the handler. 🔎 Track B: why sigaction is preferred over signal(), and whether printf is safe inside a handler.

### [S02-p13] Questions?
- Closing slide, with the same building photo as S01-p27. It is an open invitation to ask questions and has no content.

---

## 3. Definitions & key terms

| Term | Meaning as taught | Source |
|---|---|---|
| Operating system | The layer between application programs and hardware. It turns the hardware's "ugly interface" into a "beautiful interface", creates "virtual" views (illusions), and "slices" resources among requesters | [S02-p2] (picture + hidden text layer) |
| Abstraction | Giving users the illusion of infinite memory, CPUs, resources, network | [S02-p3] |
| System call | A kernel-level primitive that applications call to delegate work to the OS | [S02-p3] |
| Program | A file: "inert, cold, waiting" | [S02-p8] |
| Process | The program file *running*: registers, an address space, open files, a PID, and pending signals (its "criminal record") | [S02-p8] |
| PID | The process's ID. A process has one; fork returns the child's PID to the parent | [S02-p8, p10] |
| Logical control flow (Lie #1) | Every process believes it has the CPU to itself while the kernel juggles, swaps and preempts (scheduling, W2) | [S02-p8] |
| Private address space (Lie #2) | Every process believes it owns all of memory; really it is "a carefully stage-managed set of pages" (paging, W12) | [S02-p8] |
| new | State of a process that "has just been created", by `fork()` | [S02-p9] |
| ready / ready queue | The process "sits in the ready queue waiting for its turn" | [S02-p9] |
| running | The process is executing. It leaves by interrupt, I/O or event wait, or exit | [S02-p9] |
| waiting | Entered on "I/O or event wait"; left on "I/O or event completion" (back to ready) | [S02-p9] |
| terminated | Reached by "exit". Causes: receiving a signal, returning from main, calling exit | [S02-p9] |
| Scheduler dispatch | The ready → running transition: being "scheduled (i.e., chosen to execute) by the kernel" | [S02-p9] |
| `fork()` | Creates a child process: "one call, two returns" (0 in the child, the child's PID in the parent, −1 on failure) | [S02-p10] |
| `errno` | Says why `fork()` failed when it returned −1 | [S02-p10] |
| fd table | The open files. The child gets the same open files with **shared offsets** (W3 pipes rely on this) | [S02-p10] |
| Signal dispositions | The process's signal-handler settings; the child **inherits** them | [S02-p10] |
| Copy-on-write | fork copies page tables, and pages stay shared read-only until someone writes (cost explained in W12) | [S02-p10] |
| Pending-signal set | The process's record of pending signals; it is **cleared in the child** | [S02-p8, p10] |
| Nondeterminism | Parent and child are both runnable, so which prints first is "the scheduler's mood" | [S02-p10] |
| `waitpid(pid, &status, options)` | Suspends the caller until a child changes state (terminates or stops) or a signal is received | [S02-p11] |
| `wait(&st)` | The same as `waitpid(-1, &st, 0)` | [S02-p11] |
| Process group | Used by waitpid: `pid = 0` means my group, `pid < -1` means the group with ID equal to the absolute value of pid (W2 job control) | [S02-p11] |
| Signal | A "doorbell": asynchronous, one integer, no payload. Rung by the kernel and other processes | [S02-p11] |
| SIGINT / SIGQUIT / SIGTSTP | Sent by Ctrl-C / `Ctrl-\` (with a core dump) / Ctrl-Z | [S02-p11] |
| SIGTERM / SIGUSR1 | "termination request" / "user-defined 1" (labels from the demo's messages) | [S02-p12] |
| Signal handler | A function installed with `signal(SIGxxx, handler)` that runs when that signal arrives; it receives the signal number `sig` | [S02-p12] |
| `pause()` | "Wait for signals" (comment in the demo) | [S02-p12] |
| ABEEK PO2 / PO3 | Program outcomes: analysis of experimental data / problem formulation & solution | [S01-p4] |
| OSTEP / TLPI | The required textbook / the recommended Linux Programming Interface handbook | [S01-p6] |
| Relative grading | Letter grades A+ … F are awarded relative to the class | [S01-p7] |
| Oral check / oral defence | In-person checks that decide grades: sampled for home assignments, individual at the project demo | [S01-p8] |

---

## 4. Rules, system calls & macros as taught

### 4.1 Course rules at a glance
| Rule | What the slides say | Source |
|---|---|---|
| Weights | Attendance 10, Quizzes (10) 10, Homework (4) 10, Project 20, **Midterm 25**, **Final 25** | [S01-p7] |
| Grading | Relative: A+, A0, B+, B0, C+, C0, D+, D0, F | [S01-p7] |
| Midterm | Week 8, **26–30 Oct**, 25%, "Covers processes, IPC, semaphores"; prep workshop in W7 on "process graphs, pipes and signals" | [S02-p7], [S01-p15, p16] |
| Final | Week 15 [S01-p23]; 21–25 Dec with "25% + 20%" (final + project fair) [S02-p7] | [S01-p23], [S02-p7] |
| AI | Allowed for study and coding help; **disclose every use**; graded by what you can **explain and modify in person**; work you can't explain = **not done** | [S01-p8] |
| Deadlines | Late submissions not accepted; follow deadlines strictly; submit via E-Class | [S01-p8] |
| Punctuality | More than 10 min late means attendance is not registered | [S01-p5] |
| Absence | More than 25% of hours without a valid reason gives **F** | [S01-p25] |
| Phones / laptops | No phones during lectures (the live-poll recap is the exception); laptops for course work only | [S01-p5], [S02-p6] |
| Integrity | Six listed acts of dishonesty; a caught act gives **grade 0 for that part**; code is similarity-checked | [S01-p5, p26] |

### 4.2 Process states (the diagram's rules)
- **Five states:** new, ready, running, waiting, terminated [S02-p9].
- **Six transitions:**
  - new → ready (admitted)
  - ready → running (scheduler dispatch)
  - running → ready (interrupt)
  - running → waiting (I/O or event wait)
  - waiting → ready (I/O or event completion)
  - running → terminated (exit)
- **Three causes of termination:** (1) receiving a signal, (2) returning from the main routine, (3) calling the exit function.
- A newly forked process starts in **new**. A waiting process must pass through **ready** before it runs again.

### 4.3 `fork()` as taught [S02-p10]
- **One call, two returns:** `0` in the child; the **child's PID** in the parent; `-1` if no child was created (`errno` says why). **Always check −1.**
- **What the child gets:**
  - the **same open files** with **shared offsets** (fd table)
  - the parent's **signal handlers** (dispositions inherited)
  - the memory image as **copy-on-write**
  - an **empty pending-signal set**, because it is cleared in the child
- **Nondeterminism is the default:** after fork there are two runnable processes, and the scheduler (W2) decides who prints first. Run it many times and the order can change.

### 4.4 `waitpid()` / `wait()` as taught [S02-p11]
- `waitpid(pid, &status, options)` suspends the caller until a child changes state (terminates or stops) **or a signal is received**.
- **`pid` cases:** `> 0` that child · `-1` any child · `0` any child in my process group · `< -1` any child in the process group whose ID is the absolute value of `pid`.
- `wait(&st)` ≡ `waitpid(-1, &st, 0)`.
- **Status macros:** **not shown on these slides.** [S01-p9] lists "waitpid and the status macros" as Week-1 review. 🔎 Look up in Track B: the status macros (how to tell from `status` how a child ended or stopped).

### 4.5 Signal basics as taught
- **What a signal is:** a doorbell, "asynchronous, one integer, no payload". You cannot send data, such as a filename, through SIGUSR1 [S02-p11].
- **Who sends signals:**
  - the kernel and other processes ("ring it") [S02-p11]
  - the keyboard: Ctrl-C → SIGINT, `Ctrl-\` → SIGQUIT (with a core dump), Ctrl-Z → SIGTSTP [S02-p11]
  - a command: `kill -TERM <pid>` (the hint printed by the demo) [S02-p12]
- **Where signals live:** a process carries its **pending signals** [S02-p8]. A forked child **inherits handlers** but starts with **no pending signals** [S02-p10].
- **Installing a handler:** `signal(SIGINT, handler);`. One handler can serve several signals by `switch`ing on its `int sig` argument; `pause()` waits for the next signal [S02-p12].
- **After a handler:** the handler runs and returns, and the program carries on. In the demo it loops back into `pause()`, so caught signals do **not** end it (verified, §5).
- **Ending by signal:** "receiving a signal" is one way to reach *terminated* [S02-p9]. In the demo, only signals **without** a handler changed its state: `Ctrl-\` (SIGQUIT) terminated it, and Ctrl-Z (SIGTSTP) only stopped it (verified, §5).

### 4.6 Named for Week 1 but NOT taught on these two decks
| Item | Where it is named | What to do |
|---|---|---|
| waitpid **status macros** | [S01-p9] | 🔎 Track B (or the other Week-1 decks) |
| **zombies and orphans** | [S01-p9]; "no zombie processes" in the W2 lab [S01-p10] | 🔎 Track B: definition of each and how they arise |
| **process graphs** (how to draw them) | [S01-p9], midterm workshop [S01-p15] | 🔎 Track B / Week-1 lab: the notation |
| exec family; why fork and exec are separate | [S01-p9], W1 card [S02-p7] | 🔎 Track B |
| sigaction; signal masks; interrupted system calls | [S01-p9], W1 card [S02-p7] | 🔎 Track B |
| writing a safe signal handler; reaping children with SIGCHLD | [S01-p9] | 🔎 Track B |
| duties of process 1; shutting a program down cleanly | [S01-p9] | 🔎 Track B |
| waitpid `options` values (other than 0) | [S02-p11] (parameter only) | 🔎 Track B |

---

## 5. Worked examples

> These two decks contain **one** program, `multi_signal.c` [S02-p12], and two commands, `kill -l` [S02-p11] and the demo's own `kill -TERM <pid>` hint. There is **no fork program** on these slides. So §5.3 and §5.4 are walk-throughs of the slides' *rules*, not of code.

### 5.1 `multi_signal.c` [S02-p12], step by step (verified)

**What each part does:**
1. **`handler(int sig)`** receives the signal's number. That number is the only thing a signal carries: "one integer, no payload" [S02-p11]. The `switch` picks one of three messages. It has no `default` case, but only these three signals are routed to the handler anyway.
2. **`main` prints two lines.** Both contain the PID from `getpid()`. The second ends with `\n\n`, which leaves a blank line.
3. **Three `signal()` calls** install the **same** handler for SIGINT, SIGTERM and SIGUSR1.
4. **`while(1) { pause(); }`** waits for a signal. When one arrives, its handler runs, `pause()` returns, and the loop calls `pause()` again. `return 0;` is never reached.

**Expected first output** (the PID differs on every run):
```text
Process 70818 waiting for signals...
Try: Ctrl+C (SIGINT) or kill -TERM 70818 (SIGTERM)

```

**What happens for each action** (verified on macOS, in this order):

| # | You do | Signal | Handler installed? | Terminal shows | Program afterwards |
|---|---|---|---|---|---|
| 1 | press Ctrl+C | SIGINT | yes | `^C`, then `Caught SIGINT (Ctrl+C)` | keeps waiting |
| 2 | `kill -TERM <pid>` (the program's own hint) | SIGTERM | yes | `Caught SIGTERM (termination request)` | **keeps waiting**: the hint does *not* stop it |
| 3 | `kill -USR1 <pid>` (same pattern as the hint) | SIGUSR1 | yes | `Caught SIGUSR1 (user-defined 1)` | keeps waiting |
| 4 | press Ctrl+C again | SIGINT | yes, still installed | `^C`, then `Caught SIGINT (Ctrl+C)` | keeps waiting |
| 5 | press Ctrl-Z | SIGTSTP | **no** | `^Z`, then bash prints `[1]+  Stopped  ./multi_signal` | **stopped**; `fg` resumes it |
| 6 | press `Ctrl-\` | SIGQUIT | **no** | `^\`, then bash prints `Quit: 3` | **terminated** |

- **Count check:** Ctrl+C pressed three times, then `Ctrl-\`, gives exactly three `Caught SIGINT (Ctrl+C)` lines, and then the program ends.
- **Why each message starts with `\n`:** pressing Ctrl+C makes the terminal echo `^C` on the current line (rows 1 and 4). The leading newline puts "Caught …" on a fresh line.
- **Why `Quit: 3`:** on this Mac's `kill -l` list (§5.2), SIGQUIT is number 3.

**Timeline.** This is a single process with no `fork()`, so its process graph is just one line:
```text
multi_signal (one process, PID = P)
│ printf "Process P waiting for signals..."
│ printf "Try: Ctrl+C (SIGINT) or kill -TERM P (SIGTERM)"  + blank line
│ signal(SIGINT, handler); signal(SIGTERM, handler); signal(SIGUSR1, handler)
▼
┌──► pause()            ← sleeps until a signal arrives
│       │  SIGINT / SIGTERM / SIGUSR1 arrives
│       ▼
│    handler(sig): prints the matching "Caught ..." line, returns
│       │  pause() returns
└───────┘  while(1) → pause() again
        │  SIGQUIT arrives (Ctrl-\): no handler installed
        ▼
    terminated            ← cause (1) "receiving a signal" [S02-p9]
```

**State view.** This is my application of the [S02-p9] diagram to this program, not something the slide states:
- The shell starts the program: **new → ready → running** (prints, installs handlers).
- `pause()` is an event wait: **running → waiting**.
- A signal is the event: **waiting → ready → running**, and the handler runs.
- The loop repeats until an unhandled SIGQUIT ends it: **→ terminated**.
- Ctrl-Z's "Stopped" does not appear in the 5-state diagram. 🔎 Track B.

**Verified run** (macOS, bash 3.2 inside a pseudo-terminal, so the keys behave like real keystrokes):
```text
$ ./multi_signal
Process 70818 waiting for signals...
Try: Ctrl+C (SIGINT) or kill -TERM 70818 (SIGTERM)

^C
Caught SIGINT (Ctrl+C)
^Z
[1]+  Stopped                 ./multi_signal
$ fg
./multi_signal
^C
Caught SIGINT (Ctrl+C)
^\Quit: 3
$ exit
```
In a second run I sent SIGTERM and SIGUSR1 from another process, which is what `kill -TERM <pid>` and `kill -USR1 <pid>` do. The program printed `Caught SIGTERM (termination request)` and `Caught SIGUSR1 (user-defined 1)` and kept running.

**Verification notes:**
- **Compile:** `cc -Wall -Wextra -o multi_signal multi_signal.c` gives no warnings.
- **macOS vs Linux:**
  - On macOS the handler stayed installed after its first use (row 4). The course uses Ubuntu, so re-run it there to confirm.
  - The shell's message for `Ctrl-\` (`Quit: 3`) may be worded differently on Ubuntu.
- **Core dump:** the slide says SIGQUIT comes "with a core dump". On this Mac no core file was written, because core files are switched off here (`ulimit -c` is 0). 🔎 Track B: when a core file is actually written.
- ⚠️ **Gotcha (verified):** when I redirected the program's output to a file, the file stayed **empty (0 bytes)** after three caught signals, and was still empty after SIGQUIT ended the program. Run the demo in a terminal, as the slide intends. 🔎 Track B: stdio output buffering.

### 5.2 `kill -l` [S02-p11] (verified on macOS)
```bash
kill -l
```
Output on this Mac (bash 3.2):
```text
 1) SIGHUP	 2) SIGINT	 3) SIGQUIT	 4) SIGILL
 5) SIGTRAP	 6) SIGABRT	 7) SIGEMT	 8) SIGFPE
 9) SIGKILL	10) SIGBUS	11) SIGSEGV	12) SIGSYS
13) SIGPIPE	14) SIGALRM	15) SIGTERM	16) SIGURG
17) SIGSTOP	18) SIGTSTP	19) SIGCONT	20) SIGCHLD
21) SIGTTIN	22) SIGTTOU	23) SIGIO	24) SIGXCPU
25) SIGXFSZ	26) SIGVTALRM	27) SIGPROF	28) SIGWINCH
29) SIGINFO	30) SIGUSR1	31) SIGUSR2
```
- It lists every "doorbell" by **number and name**. A signal really is "one integer" [S02-p11].
- **macOS vs Linux:** the numbering of several signals differs on Linux. For example, this Mac lists SIGUSR1 as 30, and Ubuntu will not match every number. Run `kill -l` on your Ubuntu machine, and in commands prefer signal **names** (`kill -TERM`, `kill -USR1`), as the demo's hint does.

### 5.3 "fork(): one call, two returns" [S02-p10] (rule walk-through; no code on the slides)
```text
            parent (PID = P) calls fork() ONCE
                         │
          ┌──────────────┴───────────────┐
  fork() returns C (child's PID)    fork() returns 0
  → parent continues                → child (PID = C) continues
          │                                │
          └── both are runnable: who prints first = "the scheduler's mood" (W2)
  If fork() fails: no child exists; the parent alone gets −1 and errno says why.
```
- **States** [S02-p9]: the child "has just been created - fork()". It goes **new → (admitted) ready → (scheduler dispatch) running**.
- **What the child starts with** [S02-p10]: the same fd table with shared offsets, the same signal handlers, copy-on-write memory, and an **empty** pending-signal set.
- **Applying it to `multi_signal.c`:** suppose a `fork()` were added right after the three `signal()` calls.
  - Sent SIGUSR1, the child would also print `Caught SIGUSR1 (user-defined 1)`, because handlers are inherited.
  - A signal pending in the parent at fork time would **not** be pending in the child, because the pending set is cleared.
- **"Run it twenty times; collect the orders":** expect the parent-first vs child-first order to change between runs ("Nondeterminism is the Default").
- **Counting prints:** one `fork()` gives one call but two returns. Any statement after it, with no check of the return value, runs **twice**: once in the parent and once in the child. The exception is when fork fails (returns −1); then only the parent runs it.
- **Process graphs:** [S01-p9] and [S01-p15] name "process graphs", but neither deck draws one. 🔎 Track B / the Week-1 lab: the official notation.

### 5.4 Decoding `waitpid` calls with the [S02-p11] table
| Call | Waits for | Rule used |
|---|---|---|
| `waitpid(1234, &st, 0)` | the child whose PID is 1234 | `pid > 0` |
| `waitpid(-1, &st, 0)` | any child; same as `wait(&st)` | `pid = -1` |
| `waitpid(0, &st, 0)` | any child in the caller's own process group | `pid = 0` |
| `waitpid(-1234, &st, 0)` | any child in process group 1234 | `pid < -1`, so use the absolute value |

- In every case the caller is suspended until that child **changes state** (terminates or stops) **or a signal is received**.
- 🔎 Track B: what waitpid returns when a signal ends the wait ("interrupted system calls", [S01-p9]), and how to read `st` (status macros).

---

## 6. Likely exam questions (from these slides only)

1. **(MCQ)** In the **child**, `fork()` returns:
   (a) the child's PID (b) 0 (c) −1 (d) the parent's PID
2. **(Short)** `fork()` returned −1. What does that mean, where do you find the reason, and what does the slide warn about this branch?
3. **(MCQ)** Which of these does the child **not** get from the parent? (a) the fd table with shared offsets (b) the signal dispositions (handlers) (c) the pending-signal set (d) the memory image (copy-on-write)
4. **(How many times?)** A program calls `fork()` once, does not check the return value, and then prints `hi`. How many times is `hi` printed? Is the order of the parent's and child's lines fixed? What changes if fork fails?
5. **(Draw)** Draw the process-state diagram: all **5 states** and all **6 labelled arrows**. Add where `fork()` fits.
6. **(Short)** A process is in **waiting** and its I/O completes. Can it go straight to **running**? Name the arrows it follows.
7. **(List)** Give the three ways a process reaches **terminated**, according to the slide.
8. **(Short)** What does `waitpid(pid, &status, options)` do? Name the **two** kinds of event that end the wait.
9. **(Fill the table)** What does `waitpid` wait for when `pid > 0`, `pid = -1`, `pid = 0`, and `pid < -1`?
10. **(MCQ)** `wait(&st)` is equivalent to:
    (a) `waitpid(0, &st, 0)` (b) `waitpid(-1, &st, 0)` (c) `waitpid(getpid(), &st, 0)` (d) `waitpid(1, &st, 0)`
11. **(Match)** Match Ctrl-C, `Ctrl-\` and Ctrl-Z to their signals. Which one comes "with a core dump"?
12. **(Explain)** "A signal is a doorbell." Give its three properties. Who rings the doorbell? Why can't you send a filename through SIGUSR1?
13. **(Predict the output)** For `multi_signal.c`: what are the first lines printed? The user then presses Ctrl+C three times. What appears, and is the program still running?
14. **(Predict)** Following the program's own hint, the user runs `kill -TERM <pid>`. Does the program end? Which keystroke from [S02-p11] *would* end it, and why? What does Ctrl-Z do to it?
15. **(Combine two slides)** Suppose `multi_signal.c` called `fork()` right after its three `signal()` calls. If the **child** is sent SIGUSR1, what does it print? Would a signal that was pending in the parent at fork time also be pending in the child?
16. **(Define)** Program vs process: define each. "Two bash windows" means how many programs and how many processes? List what a process has, per the slide.
17. **(Explain)** Name the two lies the kernel tells, what each one means, and which week explains each.
18. **(Course rules)** What is the midterm's weight and date range, and what does [S02-p7] say it covers? Under the AI policy, what must you do when you use AI, and what happens to submitted work you cannot explain?

### Answers
1. **(b) 0.** The parent gets the child's PID, and −1 means failure. [S02-p10]
2. **No child was created; `errno` says why.** The slide warns: "Always check −1 — the one branch students never write is the one production hits." [S02-p10]
3. **(c), the pending-signal set.** It is *cleared in the child*. The others are passed on: (a) the same open files with shared offsets, (b) handlers inherited, (d) copy-on-write memory. [S02-p10]
4. **Twice.** It is one call with two returns, so both parent and child continue past `fork()` and both print. **The order is not fixed**: "Nondeterminism is the Default", and who prints first is the scheduler's mood. If fork fails (−1), there is no child, so `hi` prints **once**. [S02-p10]
5. **The arrows:**
   - new → ready (admitted)
   - ready → running (scheduler dispatch)
   - running → ready (interrupt)
   - running → waiting (I/O or event wait)
   - waiting → ready (I/O or event completion)
   - running → terminated (exit)

   `fork()` creates the process in **new**. [S02-p9]
6. **No.** It goes waiting → ready (I/O or event completion), then ready → running (scheduler dispatch). There is no waiting → running arrow. [S02-p9]
7. **(1)** receiving a signal, **(2)** returning from the main routine, **(3)** calling the exit function. [S02-p9]
8. **It suspends the calling process** until a child changes its state (terminates or stops), **or** a signal is received. [S02-p11]
9. **The four cases:**
   - `> 0`: that specific child
   - `-1`: any child
   - `0`: any child in my process group
   - `< -1`: any child in the process group whose ID is the absolute value of pid (W2's job control)

   [S02-p11]
10. **(b) `waitpid(-1, &st, 0)`.** [S02-p11]
11. **Ctrl-C → SIGINT; `Ctrl-\` → SIGQUIT** (this one comes "with a core dump"); **Ctrl-Z → SIGTSTP.** [S02-p11]
12. **"Asynchronous, one integer, no payload."** The kernel and other processes ring it. A signal carries only its number, with no data: "doorbells, not conversations". [S02-p11]
13. **First output:** `Process <PID> waiting for signals...`, then `Try: Ctrl+C (SIGINT) or kill -TERM <PID> (SIGTERM)`, then a blank line.
    - Each Ctrl+C shows `^C` and then `Caught SIGINT (Ctrl+C)` on its own line, so that line appears **3 times**.
    - It is **still running**: the handler returns, and the loop calls `pause()` again. (Verified, §5.1.) [S02-p12]
14. **No.** SIGTERM is caught, so it prints `Caught SIGTERM (termination request)` and keeps waiting.
    - **`Ctrl-\` (SIGQUIT) ends it**, because the program installs no handler for SIGQUIT; bash printed `Quit: 3`.
    - **Ctrl-Z (SIGTSTP)** only *stops* it, and `fg` resumes it. (Verified, §5.1.) [S02-p11, p12]
15. **It prints `Caught SIGUSR1 (user-defined 1)`**, because signal dispositions (handlers) are inherited. **No**, the pending signal would not carry over: the pending-signal set is cleared in the child. [S02-p10, p12]
16. **Program:** a file, "inert, cold, waiting". **Process:** the file *running*, with registers, an address space, open files, a PID and pending signals. Two bash windows are **one program, two processes**. [S02-p8]
17. **The two lies:**
    - **Lie #1, logical control flow:** each process thinks it has the CPU to itself (scheduling, **W2**).
    - **Lie #2, private address space:** each process thinks it owns all memory, but really gets "a carefully stage-managed set of pages" (paging, **W12**). The lie lasts "until food runs out (**W13**)".

    [S02-p8]
18. **Midterm:** **25%**, Week 8, **26–30 Oct**, "Covers processes, IPC, semaphores." **AI:** you must **disclose** every use, and work you cannot explain is **graded as not done** (sampled oral checks, plus an oral defence at the project demo). [S01-p7], [S02-p7], [S01-p8]

---

## 7. Self-check

- I can explain **program vs process** and the kernel's **two lies**, and name the weeks that explain each (W2, W12, W13). [S02-p8]
- I can draw the **5-state diagram** with all six labelled arrows, and list the three causes of termination. [S02-p9]
- I can state **fork()'s return values** (0, the child's PID, −1 plus errno), say where each appears, and explain why you always check −1. [S02-p10]
- I can list what a forked child **inherits** (fd table with shared offsets, handlers, copy-on-write memory) and what it **does not** (pending signals). [S02-p10]
- I can explain why output order after fork is **nondeterministic**, and count how often a line after `fork()` prints. [S02-p10]
- I can decode any `waitpid` **pid** argument, say what ends the wait, and explain why `wait(&st)` = `waitpid(-1, &st, 0)`. [S02-p11]
- I can describe a signal as a **doorbell** (asynchronous, one integer, no payload) and map Ctrl-C, `Ctrl-\` and Ctrl-Z to their signals. [S02-p11]
- I can walk through **`multi_signal.c`** and predict its output for any sequence of Ctrl+C, `kill -TERM`, `kill -USR1`, Ctrl-Z and `Ctrl-\`. [S02-p12]
- I can recite the **course rules**: weights, relative grading, midterm date and scope, AI disclosure and oral checks, the attendance F rule, and the grade-0 integrity rule. [S01-p5, p7, p8, p25, p26; S02-p7]
- I know which Week-1 topics (status macros, zombies and orphans, process graphs, exec, sigaction, masks, SIGCHLD and so on) are **not** in these two decks, and where to look for them. [S01-p9]
