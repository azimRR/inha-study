# Operating System (SOC3010-003): midterm kit (START HERE)

## ⏰ Dates
| When | What |
|---|---|
| **Sat 24 Oct, 23:55** (hard LMS close) | **HW2** (2.5%), individual. ⚠️ **Parts 2, 5 and 6 must be HANDWRITTEN**; typed tables score 0. Submit one ZIP named `SOC3010_HW2_<StudentID>_<Surname>.zip` containing `report.pdf` and `src/`. The starter code is in `A/assignments/HW2 - hw2-starter/` |
| Week 7 | Quiz 4 "FOUR ROOMS" (a completion-code game, 2%) and the **midterm workshop on process graphs, pipes and signals**. Attend it! |
| **26–30 Oct** (classes Mon/Wed) | **MIDTERM, 25%**. Per the professor's slide it **"covers processes, IPC, semaphores"** |

**Rules that matter:**
- AI use must be disclosed in one line.
- **Grades come from oral checks**: work you can't explain counts as not done.
- More than 25% unexcused absence = F. Arriving more than 10 min late = absent.

⚠️ **Run all code on the Ubuntu VM, not macOS.** On a Mac:
- `sem_init` silently fails, so semaphore programs give wrong answers;
- there are no POSIX message queues;
- signal numbers differ;
- port 5000 is taken by ControlCenter.

## The two tracks (kept separate on purpose)
| Folder | Contents |
|---|---|
| `A - FROM CLASS (slides only)/` | Only the professor's slides, lab, project spec, homework and code: **302 pages**, with every slide program compiled and run |
| `B - OUTSIDE (internet research)/` | Cited research: OSTEP, man pages, Little Book of Semaphores, and so on, with verified examples and tools |

### A: FROM CLASS
1. **`MIDTERM REVIEW (from slides only).md`** ← **main file** ✅. It contains:
   - **§1** the professor's 6 exam skills, as step-by-step recipes: fork graphs, Gantt charts, fd tables, semaphore traces, the classical problems, servers
   - **§2** every slide exercise (97 of them), answered, with HW2 items kept to hints only
   - **§5** cheat sheets
   - **§6** the traps and slide errors
   - **§7** a **90-minute mock midterm** (21 questions)
   - **§8** the answer key, with every answer script-verified
   - **§9** the last-48-hours checklist
2. `notes-by-week/`: 8 slide-by-slide files, each with about 20 practice questions and answers:
   - W1a course rules and revision
   - W1b fork/exec/wait/signals
   - W2 shell and **CPU scheduling**
   - W3 **pipes, dup2, FIFOs** and Lab 1
   - W4 message queues, shared memory and semaphores
   - W5 sockets and servers
   - W6 **semaphore patterns**
   - W7 **readers-writers and barber**, plus the term project and the HW guide (no solutions)
3. `slides-pdf (original)/`, `labs-and-project/`, `assignments/` and `code-samples/`: the original materials.

### B: OUTSIDE
- `research_notes/Operating systems midterm research/`:
  - `01` processes, signals and the shell, with **38 runnable fork/signal programs and `forkenum.py`**, which lists every possible output order
  - `02` CPU scheduling, with a **simulator** checked against 55 published answers
  - `03` IPC and sockets
  - `04` semaphores, with a **model checker**
- **`reports/Operating systems midterm research.md`**: the combined research report. ✅ Done.

## ⚠️ Exam traps found in the slides
- **S05-p11:** the average waiting time is **12 ms**, not 10.5 as printed.
- **S16-p10:** the PARENT/CHILD labels in the process graph are swapped relative to the code.
- **Round-robin tie rule:** when a new arrival and a preempted job meet at a quantum boundary, sources disagree on which goes first. **State your assumption on the exam.**
- **Semaphore values:** some sources let the value go negative to count the waiters; POSIX never does. Follow the slides' convention.
- **Typing slide code:** several snippets won't compile as printed (curly quotes, `–a` with a long dash, comments that aren't closed). Type `->`, `<=` and `==` where the slide font shows `→`, `≤` and `═`.
