# Week 1b — Processes & signals: fork, exec, wait, zombies, signals, sigaction (CLASS NOTES — from slides only)

> Sources: Slide 16 (Process).pdf [S16-p#], Slide 17 (Signals).pdf [S17-p#], Slide 3 (Process Signal) v2.pdf [S03-p#].

> **Track A (class material only).** Every fact here comes from these three decks. Where the slides leave a gap you will see **🔎 Look up in Track B**, meaning check the outside-research notes.
> **Legend:**
> - ⭐ = core exam material;
> - ⭐⭐ = the slide itself flags it (HOMEWORK, "Exam Skill") or it appears in two decks;
> - ⚠️ = typo, bug or inconsistency on the slide;
> - ✅ = I compiled and ran it.
>
> **How the programs were checked:** Apple clang 21 on macOS (arm64), October 2026.
> - The fork programs were run 100–400 times each in a pseudo-terminal, so output behaves as it does in a terminal window, and the distinct outputs were counted.
> - "All possible outputs" lists were also generated mechanically, as every topological order of the process graph.
> - Signal numbers for STOP, TSTP and CHLD differ on a Mac (17, 18, 20). **In the exam use the slides' Linux x86-64 numbers** [S03-p16].
>
> **The decks:**
> - S16: SOC 2040 *System Programming*, "Processes", dated 5/7/2026.
> - S17: SOC 2040, "Signals", dated 5/16/26.
> - S03: SOC 3010 *Operating Systems* (this course), "Process Control and Signals", dated 9/8/2026.
>
> S03 repeats two S17 slides word for word ([S03-p14] = [S17-p7], [S03-p15] ≈ [S17-p4]), so treat those as high-yield.

---

## 1. Big picture

- **Process vs. program.** A **process** is an instance of a running program: the *program* is a file on disk, and the *process* is what the kernel loads into memory and runs. The kernel gives each process two illusions [S16-p3, p4]:
  - a CPU of its own (**logical control flow**, achieved by **context switching**);
  - memory of its own (**private address space**, achieved by **virtual memory**).
- **fork()** clones the calling process [S16-p6, p7; S03-p2].
  - It is called **once** but **returns twice**: `0` in the child, the **child's PID** in the parent, `-1` on error.
  - Both processes continue from the instruction right after `fork()`.
  - The scheduler decides which one runs first.
- **Process graphs** predict output on paper: horizontal line = one process's timeline, vertical arrow = `fork()`, nodes = `printf`/`fork`/`wait`/`exit` [S16-p8; S03-p4].
  - **Golden Rule:** every topological ordering of the graph is a legal output.
  - **Exam skill:** list **all** possible outputs, not just one.
- **Reaping, zombies, orphans** [S16-p13–p17; S03-p3, p7, p8].
  - `wait()`/`waitpid()` let a parent **reap** a dead child, i.e. collect its exit status (its "death certificate").
  - An exited but un-reaped child is a **zombie**.
  - A child whose parent died first is an **orphan**; it is adopted by **PID 1 (init)**.
  - `wait()` buys **one** ordering constraint, between you and **one** child, and **nothing** between the children.
- **exec** is a family, not one function: `execl`, `execlp`, `execle`, `execv`, `execvp`, `execvpe` [S03-p9–p12].
  - It **replaces** the program inside the current process ("new brain, same hands").
  - It creates no process and keeps the PID.
  - It **never returns on success**.
  - The classic pattern is fork, then exec in the child.
- **Signals** [S17-p3; S03-p16].
  - A signal is a (usually software) **interrupt that announces an asynchronous event** to a process.
  - There is a fixed list of signals, all named `SIG…`. Examples: `SIGINT` = Ctrl-C, `SIGCHLD` = "your child died", `SIGKILL` = `kill -9`.
  - Each signal has a default action: Terminate, Core Dump, Stop, or Ignore.
- **Signal handlers** [S17-p4, p7; S03-p13–p15].
  - A program **installs** a handler with `signal()` (old) or `sigaction()` (modern).
  - When signal *k* is **caught**, `handler(k)` runs. When it **returns**, control goes back to the interrupted instruction.
  - `SIG_IGN` means ignore the signal; `SIG_DFL` means restore the default action.
- **SIGCHLD** is sent to a parent whenever a child exits or stops [S17-p2, p3; S03-p17].
  - Its default action is **Ignore**.
  - Signals are **unqueued**, so a SIGCHLD handler must reap with `while (waitpid(-1, NULL, WNOHANG) > 0)`, not with `if`.
- **sigaction()** gives precise control over signal handling [S03-p18, p19].
  - `sa_handler` = the handler; `sa_mask` = signals **blocked during the handler** (the "mask"); `sa_flags` = options such as `SA_RESTART`.
  - A handler should do **only safe work: write, `_exit`, or set a flag**.
  - "signal() is for reading old code; sigaction() is for writing new code."

---

## 2. Page-by-page notes

> **Deck 1 of 3 — W1-S16 · SOC 2040 "Exceptional Control Flow (Chapter 8): PROCESSES" · 18 pages**

### [S16-p1] Title — Exceptional Control Flow (Chapter 8): Processes
- Course: SOC 2040 System Programming.
- Topic: "Exceptional Control Flow (Chapter 8) — PROCESSES".
- Instructor: Jalolliddin Yusupov, Professor of Computer Science & Eng. Credits/hours per week: 3/3. Dated 5/7/2026.
- Visuals: circuit-board photo, INHA University in Tashkent logo. No technical content.

### [S16-p2] Lecture Outline
- Four topics, in order: **System Calls → Processes → fork() → Zombies ahead**.

### [S16-p3] System Calls — process = running instance; logical control flow ⭐
- "Each x86-64 system call has a unique ID number." The examples table:

| # | Name | Description |
|---|---|---|
| 0 | `read` | Read file |
| 1 | `write` | Write file |
| 2 | `open` | Open file |
| 3 | `close` | Close file |
| 4 | `stat` | Get info about file |
| 57 | `fork` | Create process |
| 59 | `execve` | Execute a program |
| 60 | `exit` | Terminate process |
| 62 | `kill` | Send signal to process |

- **"≠" banner:** a process is **not** a "program" and **not** a "processor"; it is the *running instance*.
- **Definition:** "A process is an instance of a running program."
  - A *program* is a file on disk. A *process* is what comes to life when the kernel loads that program into memory and starts executing it.
  - One program can give many processes. Example: two terminal windows, both running bash.
- The kernel makes each process believe **two things that aren't literally true**. Illusion #1 (blue card) is **Logical control flow**: *"I have the CPU all to myself."*
  - It is achieved through **context switching**: the kernel rapidly swaps which process runs on the CPU, saving and restoring register state each time.
- **Definition, context switching:** the CPU stops running one task, saves its state (its *context*), and loads the saved state of another task. This is what allows multitasking.
- ⚠️ Don't mix these up: the `1` in `write(1, "A\n", 2)` on [S03-p5] is **not** this syscall ID. 🔎 Look up in Track B: file descriptors 0/1/2.

### [S16-p4] System Calls — private address space ⭐
- Same "≠" banner and process definition as p3.
- Illusion #2 (green card) is **Private address space**: *"I have memory all to myself."*
  - It is achieved through **virtual memory**. Each process sees addresses `0x0…0xFFF…`, but the hardware maps them to different physical frames.
- **Definition, virtual memory:** an abstraction layer that makes every running process believe it has its own private, contiguous block of RAM.
- **Diagram:**
  - A pink **Memory** box holds several processes side by side ("…" means more of them).
  - Each process has its own **Stack / Heap / Data / Code** and a **Saved registers** area.
  - One process, drawn with a dotted outline, has an arrow from its saved registers to the yellow **CPU → Registers** box. That is the process running right now.
  - The others wait with their registers saved. A context switch changes whose registers are loaded into the CPU.

### [S16-p5] Process State
- **State diagram, 5 states.** Transitions:
  - `new → ready` (admitted)
  - `ready → running` (scheduler dispatch)
  - `running → ready` (interrupt)
  - `running → waiting` (I/O or event wait)
  - `waiting → ready` (I/O or event completion)
  - `running → terminated` (exit)
- **Annotations on the diagram:**
  - **new**: "the process has just been created", by **fork()**.
  - **ready**: it sits in the ready queue, waiting for its turn.
  - **ready/running**: the process is either **executing**, or **waiting** to be executed and will eventually be **scheduled** (chosen to execute) by the kernel.
  - **terminated**: the process is **stopped permanently** by one of three causes:
    1. receiving a signal;
    2. returning from the main routine;
    3. calling the exit function.
- **Inset photo**, captioned "OS internals books are wild…". It shows a book's table of contents:
  - 9.4 Process Primitives;
  - 9.4.1 Having Children;
  - 9.4.2 Watching Your Children Die;
  - 9.4.3 Running New Programs;
  - 9.4.4 A Bit of History: vfork();
  - 9.4.5 Killing Yourself;
  - 9.4.6 Killing Others;
  - 9.4.7 Dumping Core;
  - 9.5 Simple Children.
  - *Memory hook (my mapping onto this week):* having children = fork, watching them die = wait, running new programs = exec, killing yourself = exit, killing others = signals.
- ⭐ The same three ways to die come back in [S03-p8].

### [S16-p6] Creating Processes — PIDs and fork() ⭐⭐
- **Every process has a PID**, a unique positive integer ID assigned by the kernel. Two syscalls query it:
  - `pid_t getpid(void)` returns your own PID.
  - `pid_t getppid(void)` returns your parent's PID.
- `pid_t` is defined in `<sys/types.h>`; on Linux it is just an `int`.
- **fork() = clone the current process.** A parent creates a child by calling `fork()`.
  - The child gets an **identical but separate copy** of the parent's **address space** (a handwritten note adds "(data, stack)") and of its **open file descriptors**.
  - The child gets a **different PID**.
- ⭐ **Key insight:** "`fork()` is called *once* but returns *twice* — once in each process. The return value tells you which one you are."
- **Diagram:**
  - Parent (pid 12) runs `pid=fork()` and its `pid` variable becomes `14`.
  - A red arrow points to Child (pid 14), labelled "Exact copy of parent". In the child, `pid` is `0`.
- **Closing question:** the parent and the child are separate processes that run **concurrently**. *Which one runs first?* Process graphs answer this: either order can happen ([S16-p8], [S03-p7]).

### [S16-p7] Creating Processes — fork() return values; "Always check the return value" ⭐⭐
- **Return-value table:**

| Where | `fork()` returns |
|---|---|
| In the **child** | `0` |
| In the **parent** | the **child's PID (>0)** |
| On **error** | `-1` |

- If `fork()` returns −1, the child was **not** created; the global **`errno`** variable tells you why.
- This is a **hard rule for *all* system calls** (except those returning void): **"Always check the return value."**
- **Diagram:** `parent (pid 1000)` calls `pid = fork()` and the timeline splits in two:
  - **parent continues**: still Process ID 1000; fork returned 1001, so `pid = 1001`.
  - **child starts**: Process ID 1001; fork returned 0, so `pid = 0`.
- **Code (exact):**
```c
#include <stdio.h>   // For printf()
#include <unistd.h>  // For fork(), getpid(), and getppid()
int main() {
    pid_t pid = fork();
    if (pid < 0) {
        printf("SOME ERROR\n");
        return 1; // Replacing exit(1) to remove need for stdlib.h
    }
    if (pid == 0) {
        printf("child:  my pid = %d, parent = %d\n", getpid(), getppid());
    } else {
        printf("parent: my pid = %d, child = %d\n", getpid(), pid);
    }
    return 0;
}
```
- The slide's compile command (orange box): `gcc fork_example.c -o fork_example`
- **Step by step:**
  1. `fork()` splits the program into two processes.
  2. `pid < 0` means there is no child; this is the error path.
  3. In the child, `pid == 0`. It prints its own PID (`getpid()`) and its parent's PID (`getppid()`).
  4. In the parent, `pid` holds the child's PID, so it prints both.
  5. Both processes reach `return 0`.
- ✅ The numbers match crosswise: the child's "parent =" equals the parent's "my pid", and the parent's "child =" equals the child's "my pid". See §5 E1.

### [S16-p8] Process Graph ⭐⭐
- **Code (exact):**
```c
#include <stdio.h>   // For printf()
#include <unistd.h>  // For fork(), getpid(), and getppid()
#include <stdlib.h>
int main()
{
    pid_t pid;
    int x = 1;
    pid = fork();
    if (pid == 0)   /* Child */
    {
        printf("child : x=%d\n", ++x);
        exit(0);
    }
    /* Parent */
    printf("parent: x=%d\n", --x);
    exit(0);
}
```
- **Definition box:** "Sketch the process graph, where each **horizontal arrow** corresponds to a **process** that executes instructions from left to right, and each **vertical arrow** corresponds to the execution of a **fork** function."
- **The slide's graph:**
  - Parent (bottom line): `main ●──(x==1)──● fork ──● printf ──● exit`, with that printf labelled `parent: x=0`.
  - From the fork node a vertical line rises to the Child line: `● printf ──● exit`, with that printf labelled `child: x=2`.
- **Picture:** a screen showing one glowing line splitting into many branches. It is a visual metaphor for a timeline that branches at every fork.
- **Why x differs:** each process has its **own copy** of `x` (= 1 at fork time).
  - The child does `++x`, giving 2.
  - The parent does `--x` on *its* copy, giving 0.
  - Neither sees the other's change. This is [S03-p2] Rule 2, "the photocopy".
- Both `exit(0)` calls mean neither process runs the other's code.
- ✅ Both output orders occurred (§5 E2).

### [S16-p9] Modeling fork with Process Graphs — "Examples of fork programs and their process graphs" ⭐⭐
- **Program (exact):**
```c
int main() {
    fork();
    fork();
    printf("hello\n");
    exit(0);
}
```
- **Orange label:** "Prints four output lines".
- **The graph:**
  - **Parent** (bottom line): `main → fork → fork → printf → exit`.
  - **child1** (vertical from the parent's 1st fork): `fork → printf → exit`.
  - **child3** (vertical from child1's fork): `printf → exit`.
  - **child2** (vertical from the parent's 2nd fork): `printf → exit`.
  - Every printf is labelled "hello".
- **Boxes** list what each process still has to run after it is born:
  - `PARENT: fork(); fork(); printf("hello\n"); exit(0);`
  - `CHILD1: fork(); printf("hello\n"); exit(0);`
  - `CHILD2: printf("hello\n"); exit(0);`
  - `CHILD3: printf("hello\n"); exit(0);`
- **HOMEWORK (exact):**
```c
int main() {
    fork();
    fork();
    fork();
    printf("hello\n");
    exit(0);
}
```
- ✅ Answer: 8 processes, 8 "hello" lines (§5 E4).
- The snippets show no `#include`s. To compile, I added `<stdio.h>`, `<stdlib.h>` and `<unistd.h>`.

### [S16-p10] fork Example: Nested forks in parent ⭐⭐
- **Code (exact):**
```c
int main(){
    printf("L0\n");
    if (fork() != 0)
    {
        printf("L1\n");
        if (fork() != 0)
        {
            printf("L2\n");
        }
    }
    printf("Bye\n");
}
```
- **The slide's graph:**
  - Bottom line: `main → printf(L0) → fork → printf(Bye)`.
  - A vertical goes up to the middle line: `printf(L1) → fork → printf(Bye)`.
  - Another vertical goes up to the top line: `printf(L2) → printf(Bye)`.
- **The slide's boxes:**
  - **PARENT**: `printf("L0\n"); fork() printf("Bye\n");`
  - **CHILD1**: `printf("L1\n"); fork() printf("Bye\n");`
  - **CHILD2**: `printf("L2\n"); printf("Bye\n");`
- ⚠️ **The box labels don't match the code.**
  - `fork() != 0` is true in the **parent**, because the parent receives the child's PID.
  - So the **original process** prints `L0, L1, L2, Bye`.
  - The child made by the 1st fork prints only `Bye`, and so does the child made by the 2nd fork.
  - The slide's boxes assign the roles the other way round. The **graph shape and the set of possible outputs are unaffected**; only the names are swapped. In the exam, label the roles the way the code says.
- 3 processes, 6 lines, **5 possible outputs**. All 5 appeared in real runs (§5 E5).

### [S16-p11] HOMEWORK: Nested forks in parent ⭐⭐
- **Task:** draw the process graph showing parent and child processes from creation to termination, and give all the outputs of the parent and child processes.
- **Code (exact, including the slide's indentation):**
```c
int main(){
    printf("HI");
    if (fork() == 0 )
        printf("SYSTEMS PROGRAMMING");
               if (fork() != 0)
                    printf("GOOD LUCK");
    printf("BYE \n");
}
```
- **The slide's answer graph**, with pink name tags:
  - **main**: `printf → fork → fork → printf "GOOD LUCK" → printf "BYE" → exit`
  - **child1** (from main's 1st fork): `printf "SYSTEMS PROGRAMMING" → fork → printf "GOOD LUCK" → printf "BYE" → exit`
  - **child3** (from child1's fork): `printf "BYE" → exit`
  - **child2** (from main's 2nd fork): `printf "BYE" → exit`
- ⚠️ The graph labels main's first printf **"ONLINE EDUCATION"**, but the code prints **"HI"**; the label is probably left over from an older version. Use "HI".
- ⚠️ **The indentation is a trap.** There are no braces, so `if (fork() == 0)` controls **only** `printf("SYSTEMS PROGRAMMING");`.
  - The second `if (fork() != 0)` therefore runs in **both** main and child1, giving 4 processes.
  - `clang -Wall` gave **no** warning. Read the code by its braces, not by its indentation.
- ⚠️ A real run prints "HI" at the start of **all 4** output lines. The reason is in §5 E6.

### [S16-p12] Section divider — "REAPING CHILD PROCESSES"
- Photo of a road sign reading "CAUTION! ZOMBIES! AHEAD!!!". This is the outline item "Zombies ahead" from [S16-p2].

### [S16-p13] Zombies & waitpid() — "Reaping terminated children — why, how, and what can go wrong" ⭐⭐
- **Zombie processes:**
  - When a child terminates, the kernel does **not** delete it immediately.
  - It keeps the **exit status** and other bookkeeping until the **parent** collects (**"reaps"**) it.
  - Until then the dead process is a **zombie**, "half alive, half dead", still using **a PID and a slot in the process table**.
- **Lifecycle diagram:** `running` → (`exit()`) → `zombie` → (parent calls wait) → `reaped ✓`.
- **What if the parent never reaps?**
  - If the parent dies first, the **orphaned** child is adopted by **`init` (pid 1)**, which reaps it automatically.
  - So explicit reaping only matters for **long-running processes** like shells and servers.
- **waitpid():**
  - Headers: `#include <sys/types.h>` and `#include <sys/wait.h>`.
  - Prototype: `pid_t waitpid(pid_t pid, int *statusp, int options);`
  - The parent reaps a child by calling `waitpid()`. It **suspends the caller** until a child in the **wait set** terminates (or has already terminated).
- **Return values (red boxes):**

| Return | Meaning |
|---|---|
| `> 0` | PID of the reaped child |
| `0` | No child terminated yet |
| `-1` | Error (check `errno`) |

- The `0` return only happens with the **WNOHANG** option from [S16-p14]. With options `0`, waitpid blocks instead of returning 0. ✅ WNOHANG on a still-running child returned 0.

### [S16-p14] Which children? — wait set and options ⭐⭐
- **The wait set (1st argument).** The `pid` argument controls which children you are waiting for:

| PID value | Wait set |
|---|---|
| `> 0` | Just the single child whose PID equals `pid` |
| `-1` | Any child (equivalent to `wait()`) |

- **The options (3rd argument):**
  - **`0` (default):** block until a child in the wait set terminates.
  - **`WNOHANG`:** return immediately with 0 if no child has terminated yet. Useful for doing work while waiting.
  - **`WUNTRACED`:** also return for children that have been **stopped**, not just terminated. Example: `pid_t ret = waitpid(pid, &st, WUNTRACED);`
  - **`WNOHANG | WUNTRACED`:** non-blocking, and also reports stopped children. Returns 0 if nothing has happened yet.
- These constants are defined in `<sys/wait.h>`: **WNOHANG = 1, WUNTRACED = 2**. ✅ My Mac printed exactly `WNOHANG=1 WUNTRACED=2`.

### [S16-p15] Status macros (2nd argument) and "When waitpid() fails" ⭐⭐
- If `statusp` is non-NULL, `waitpid` writes encoded status information into `*statusp`. Decode it with these macros from `<sys/wait.h>`:

| Macro | What it tells you |
|---|---|
| `WIFEXITED(s)` | True if the child exited normally (via `exit()` or `return`) |
| `WEXITSTATUS(s)` | The exit code (0–255). **Only valid if `WIFEXITED` is true** |
| `WIFSIGNALED(s)` | True if the child was killed by an uncaught signal |

- **Code (exact):**
```c
int status;
pid_t child = waitpid(pid, &status, 0);

if (WIFEXITED(status)){
    printf("child %d exited with code %d\n", child, WEXITSTATUS(status));
}
else if (WIFSIGNALED(status)){
    printf("child %d killed by signal\n", child);
}
```
- **When waitpid() fails** (returns −1):
  - **`ECHILD`:** the calling process has no children to wait for.
  - **`EINTR`:** the call was interrupted by a signal before a child terminated.
  - To check these, `#include <errno.h>` and inspect `errno` after waitpid returns −1.
- ✅ Results:
  - `exit(7)` gave "exited with code 7";
  - `kill -9` gave "killed by signal";
  - a call with no children left returned −1 with `ECHILD`;
  - an interrupted call without SA_RESTART returned −1 with `EINTR`.
  - Details are in §5 E7 and E18.

### [S16-p16] See the zombie lifecycle ⭐
- **In `ps` output you'll see:**
  - **`Z` in the `STAT` column**, the process-state code for zombie;
  - **`[defunct]`** next to the command name.
- **"Watch a child become a zombie, then get reaped"** — terminal trace of `$ ./zombie_demo`:
  1. `[parent 8875] forked child 8876`
  2. `[child 8876] running... doing work`
  3. `[child 8876] calling exit(0)`
  4. **`[kernel] child 8876 is now a ZOMBIE`**
  5. `[parent 8875] calling waitpid(8876, &status, 0)`
  6. `[parent 8875] ...blocked, waiting...`
  7. `[parent 8875] waitpid returned 8876`
  8. `[parent 8875] WIFEXITED → true, WEXITSTATUS → 0`
  9. **`[kernel] zombie 8876 fully removed ✓`**
- ✅ My re-creation (the slide shows only the output, not the source) printed `Z` and `<defunct>` in `ps` before `waitpid`. Afterwards the PID had vanished from `ps` (§5 E7).

### [S16-p17] Infographic — "ZOMBIE Processes in Linux"
- **What is a zombie process?** A "dead" process that has completed execution but **still has an entry in the process table**.
- **How it happens:** (1) the child process finishes execution, then (2) the parent process fails to clean up. A gravestone reads "R.I.P."
- **ZOMBIE PROCESS = "Defunct" or "Z":**
  - it **remains in the process table**;
  - it **holds on to the exit status**.
- Pictured process table: `PID 1234 Zombie`, `PID 5678 Running`. Footer: **"Needs to be 'Reaped' by the Parent!"**
- ⚠️ Typo on the image: "thas completed" should be "that has completed".

### [S16-p18] Questions?
- Closing slide, no content.

---

> **Deck 2 of 3 — W1-S17 · SOC 2040 "Exceptional Control Flow: Signals (Chapter 8 – Section 8.5, 8.6)" · 10 pages**

### [S17-p1] Title — Exceptional Control Flow: Signals (Chapter 8, Sections 8.5–8.6)
- SOC 2040 System Programming; dated 5/16/26; same instructor; credits/hours 3/3. No technical content.

### [S17-p2] Problem: Foreground job vs Background job ⭐
- **Foreground job:** the shell calls `waitpid` and **blocks** until the child terminates, then moves on to the next command.
- **Background job** (trailing `&`): the shell **skips** `waitpid` and immediately loops back to read the next command line.
- ✓ **What works:** the shell correctly waits for and reaps foreground jobs via `waitpid`.
- ⚠ **Critical flaw:** background children are **never reaped**, because the shell never calls `waitpid` on them. They would end up as zombies ([S16-p13]).
- **Terminal screenshot:**
  - `ps aux` rows show `sleep 500` (STAT `S`) and the `ps aux` command itself (`R+`).
  - Then `jobs` prints `[1]+  Running   sleep 500 &`, a background job that is still alive.
- This sets up the next slide's question: how can the shell learn that a background child has died?

### [S17-p3] Solution: Exceptional Control Flow (ECF) ⭐⭐
- **① Kernel notification.** When a background process finishes, the **kernel interrupts** the shell's regular execution to deliver a notification ("your child died."). This is **exceptional control flow**.
- **② Signals.** In Unix/Linux this alert mechanism is called a **signal**: the kernel sends **`SIGCHLD`** to the parent whenever a child **terminates or stops**.
  - **But the default action for `SIGCHLD` is to ignore it.** The parent must install a handler to react, as in [S03-p17].
- **Definition box:**
  - "A signal is a kind of (usually **software**) **interrupt**, used to announce **asynchronous** events to a process."
  - The list of possible signals is limited, and **we do not invent our own** ("There might be 64 signals, for instance").
  - The name of a Linux signal begins with **"SIG"**.
- **Orange box:** **SIGINT** is generated when a user presses **Control-C**, and it will **terminate** the program from the terminal.
- **Meme:** a man looks calm ("Using Control C to copy"), then shocked ("You are in the console"). In a terminal, Ctrl-C does not copy; it sends SIGINT.
- **Footer:**
  - Run **`kill -l`** to see all available signals.
  - The `kill` command is used to **send ("execute") signals** from the terminal, and also to list them.
- The PDF's text layer also has a definition that is **not visible** on the rendered page, probably hidden behind the meme. An **asynchronous event** is a task that is started but does **not block** the main program thread, which keeps running other code while the task runs in the background.
- ✅ On my Mac, `kill -l` listed 31 names (`HUP INT QUIT … USR1 USR2`). "64" is the slide's Linux example.

### [S17-p4] Installing Signal Handlers & Concurrency ⭐⭐ (repeated as [S03-p15])
- **How handlers are invoked:**
  1. When a process **catches signal *k***, the handler installed for *k* is called with a **single `int` argument set to *k***.
  2. This lets **one function handle multiple signal types**: branch on the argument to tell them apart (see [S17-p5]).
  3. **SIGINT example:** the shell sends SIGINT when the user types Ctrl-C.
     - **Default action: terminate the process.**
     - A custom handler can catch the signal, print a message, then exit cleanly.
- **Example `sigint.c` (exact; the slide shows no `#include`s):**
```c
void handler(int sig) {
  printf("Caught SIGINT!\n");
  exit(0);
}

int main() {
  signal(SIGINT, handler);
  pause(); /* wait for signal */
  exit(0);
}
```
- **Key terminology** (mnemonic: **I-C-H-R**):
  - **I — Installing the handler:** passing a function address to `signal()` to change the default action.
  - **C — Catching the signal:** the *invocation* of the handler when the signal arrives.
  - **H — Handling the signal:** the *execution* of the handler body.
  - **R — Return:** when the handler executes its `return`, control passes back to the **interrupted instruction in main**. On some systems, interrupted system calls return with an error instead (compare `EINTR`, [S16-p15]).
- **Terminal:** `$ kill -2 12274` prints `Caught SIGINT!`. Signal number **2 = SIGINT**.
- **Walk-through:**
  1. `signal(SIGINT, handler)` **installs** the handler.
  2. `pause()` suspends the program until a signal arrives.
  3. `kill -2` delivers SIGINT, so the handler runs and prints its message.
  4. The handler's `exit(0)` ends the program. The `exit(0)` after `pause()` is never reached.
- ✅ Verified (§5 E13).
- ⚠️ **Handler safety.** [S03-p18] later says a handler should do "safe work only: write, _exit, or set a flag". This demo handler calls `printf()` and `exit()`. That is fine for a classroom demo, but it is not "safe work" by the later rule. 🔎 Look up in Track B: why printf/exit are unsafe inside handlers.

### [S17-p5] (TRY THIS OUT) Installing Signal Handlers — `multi_signal.c` ⭐
- **Code (exact):**
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
- **What it shows:**
  - One handler serves three signals through `switch(sig)`, which is point 2 of [S17-p4].
  - `pause()` sits in an endless loop: the process sleeps, a signal arrives, the handler runs, `pause()` returns, and the loop sleeps again.
- It prints its own PID so that you can send signals from another terminal, e.g. `kill -TERM <pid>` or `kill -USR1 <pid>`.
- ⚠️ **Gotcha:** SIGINT **and** SIGTERM are both caught, and the handler never exits.
  - So **neither Ctrl-C nor a plain `kill` stops this program**.
  - Use `kill -9 <pid>` (SIGKILL), which is the escape hatch [S17-p8] hints at with `'kill -9 PID'`.
- ✅ Verified: each signal printed its line, a second SIGINT was caught again, and only SIGKILL ended the program (§5 E14).

### [S17-p6] How to send a signal (Version 1) — "01 / 04" — `alarm.c` ⭐
- **ALARM.C — HANDLER (exact):**
```c
void handler(int sig)
{
  static int beeps = 0;
  printf("BEEP\n");
  if (++beeps < 5)
    alarm(1); /* reschedule */
  else {
    printf("BOOM!\n");
    exit(0);
  }
}
```
- **ALARM.C — MAIN (exact):**
```c
int main()
{
  signal(SIGALRM, handler);
  alarm(1);
  while (1) { ; }
  exit(0);
}
```
- **OUTPUT shown on the slide:** `$ ./alarm`, then `BEEP` five times, then `BOOM!`.
- 📌 **Note on the slide:**
  - The handler is invoked **asynchronously** by each SIGALRM, interrupting the infinite `while(1)` in main.
  - When the handler returns, control passes back to main **at the exact instruction where it was interrupted**.
- **How it works:**
  1. `alarm(1)` means "deliver SIGALRM to me in 1 second". This is one way to *send* a signal: you ask for one to be sent to yourself.
  2. `static int beeps` keeps its value between handler calls.
  3. Calls 1–4 reschedule the alarm.
  4. In call 5, `++beeps` becomes 5, which is not `< 5`, so the handler prints "BOOM!" and exits.
  - Total time: about 5 seconds.
- ✅ Verified: 5 × BEEP, then BOOM!, in about 5 s (§5 E15).

### [S17-p7] How to send a signal (Version 2) — "02 / 04" — The `signal()` Function ⭐⭐ (repeated as [S03-p14])
- **Function signature (exact):**
```c
#include <signal.h>
typedef void (*sighandler_t)(int);
   sighandler_t    signal(int signum, sighandler_t handler);
```
- **Returns:** a pointer to the previous handler if OK; **`SIG_ERR` on error ("does not set errno")**.
- `sighandler_t` means "pointer to a function that takes an `int` and returns `void`". That is exactly the shape of every handler on these slides: `void handler(int sig)`.
- **Three ways to change a signal's action:**

| Handler value | Effect | Slide's example / comment |
|---|---|---|
| `SIG_IGN` | Signals of type *signum* are **ignored**. | `// Tell the OS to IGNORE SIGINT (Ctrl+C)` → `signal(SIGINT, SIG_IGN);` |
| `SIG_DFL` | The action **reverts to the default** for *signum*. | `// Now that we handled it once, let's restore the DEFAULT behavior.` / `// The next time the user presses Ctrl+C, the program will just die.` |
| `&my_handler` | Address of a **user-defined signal handler**, called whenever the process receives *signum*. | — |

- ⚠️ **Title vs content.** The page is titled "How to *send* a signal (Version 2)", but its content is about **installing** handlers. Sending is done with `kill` or `alarm`.
- ⚠️ **Missing steps.** The "02 / 04" counter implies 4 steps, but steps 03 and 04 are not in this deck.
- ⚠️ **errno inconsistency.** This slide says `signal()` "does not set errno". Yet the very next program ([S17-p8]) prints `strerror(errno)` after a failed `signal()`, so by this slide's own rule that message may be meaningless.
- ✅ All three handler values are exercised in Practice **P4** (§5).

### [S17-p8] Signal Handling Examples — `sig2handle.c` ⭐
- **Code (exact; left column, then right column):**
```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <errno.h>
#include <string.h>
// Error handling function
void unix_error(char *msg) {
    fprintf(stderr, "%s: %s\n", msg,
strerror(errno));
    exit(1);
}
// Handler for SIGINT (Ctrl+C)
void handler1(int sig) {
    if (sig == SIGINT)
        printf("Caught SIGINT (Ctrl+C)\n");
}
// Handler for SIGQUIT (Ctrl+\)
void handler2(int sig) {
    if (sig == SIGQUIT)
        printf("Caught SIGQUIT (Ctrl+\\)\n");
}
int main() {
    // Install the SIGINT handler
    printf("Installing SIGINT handler...\n");
    if (signal(SIGINT, handler1) == SIG_ERR) {
        unix_error("signal error for SIGINT");
    }
    // Install the SIGQUIT handler
    printf("Installing SIGQUIT handler...\n");
    if (signal(SIGQUIT, handler2) == SIG_ERR) {
        unix_error("signal error for SIGQUIT");
    }
    printf("MAIN PROCESS NOW WAITING FOR signals...\n");
    printf(" Ctrl+C (SIGINT) or Ctrl+\\ (SIGQUIT)\n");
    printf("Ctrl+Z to suspend or 'kill -9 PID' \n\n");
    // Wait for signals indefinitely
    while (1) {
        pause();  // Suspends until a signal arrives
    }
    exit(0);
}
```
- **Red box:** `SIGQUIT → Ctrl \` · `SIGINT → Ctrl c` · `SIGSTP → Ctrl z`
- ⚠️ **"SIGSTP" is a typo for `SIGTSTP`**, which [S03-p16] spells correctly. ✅ `SIGSTP` does not even compile: "use of undeclared identifier".
- **bash box:** `gcc -o sig2handle sig2handle.c`, then `./sig2handle`.
- **What it shows:**
  - The return value of `signal()` is **checked against `SIG_ERR`**, which is the "always check the return value" rule of [S16-p7] applied to `signal()`.
  - `unix_error()` is a small helper that prints the message and `strerror(errno)` to stderr, then exits with code 1.
  - There are two handlers, one per signal, and each double-checks `sig`.
  - `pause()` runs in a loop.
- The printed hint says Ctrl+Z **suspends** the program (it does not end it) and `kill -9 PID` ends it.
  - Because SIGINT and SIGQUIT are caught, Ctrl-C and Ctrl-\ no longer stop it.
  - SIGTERM is **not** caught here, so a plain `kill PID` also ends it. ✅ "killed by signal 15 (SIGTERM)". Compare `multi_signal.c`, which catches SIGTERM too.
- ✅ Verified (§5 E16):
  - the program printed `Caught SIGINT (Ctrl+C)` and `Caught SIGQUIT (Ctrl+\)`;
  - SIGKILL ended it;
  - `kill -STOP` put it into `ps` state **`T`** (stopped).

### [S17-p9] Questions?
- A closing slide, but one more page follows it.

### [S17-p10] Linux Process Hierarchy (appendix after "Questions?")
- **Tree diagram:**
  - A dotted node **`[0]`** sits at the top, with **`init [1]`** (green) below it.
  - init's children are a dotted **"Daemon e.g. httpd"**, a **"Login shell"**, and "…" for more.
  - The Login shell has two **Child** nodes. One Child has two **Grandchild** nodes.
  - Every process has a parent, and everything descends from **init (PID 1)**.
  - 🔎 Look up in Track B: what `[0]` is and what a daemon is; the slide does not explain either.
- **Meme (two Lion King frames):** "Every time you send **SIGKILL** to a process, you cause this to happen."
  - A villain labelled SIGKILL attacks "Process" while a cub labelled "Threads" watches.
  - Caption: **"Be nice. Send SIGTERM instead."**
  - Takeaway: `SIGKILL` (`kill -9`) kills the process with no mercy, and its threads go down with it. `SIGTERM` (plain `kill`) is the polite *termination request*. 🔎 Look up in Track B: threads.
- **Note box:** you can view the hierarchy with the Linux **`pstree`** command.
- ⚠️ The title is cut off by the image ("Linux Process Hierar…").

---

> **Deck 3 of 3 — W1-S03 · SOC 3010 "Operating System Mechanics: Process Control and Signals" (v2) · 20 pages**

### [S03-p1] Title — Operating System Mechanics: Process Control and Signals
- SOC 3010 Operating Systems; instructor Jalolliddin Yusupov; dated 9/8/2026.
- Visuals: the Tux penguin over a circuit board. No technical content.

### [S03-p2] Process Management — the core idea of fork() and "The Three Rules" ⭐⭐
- **The core idea of fork():** it creates a new process that is a **copy of the parent**.
- Both processes continue execution from the **exact same instruction immediately following the `fork()` call**.
  - The child does **not** start from the top of `main()`.
  - Its **Program Counter is copied from the parent** at the moment of the fork.
- **Reading a Fork Program: The Three Rules**
  - **Rule 1 — The Starting Line.** The child starts executing *at the return of* `fork()`, not at `main()`.
  - **Rule 2 — The Photocopy.** The child gets a complete *copy* of the parent's memory: variables, open file descriptors, and the instruction pointer. **Changes in one do not affect the other.**
  - **Rule 3 — The Dual Path.** Any code after `fork()` runs in *both* processes, unless you branch on the return value.
- **Applying the rules to earlier examples:**
  - Rule 1 means a statement that runs *before* the fork runs once, in the parent only.
  - Rule 2 explains why [S16-p8] prints x=2 in the child but x=0 in the parent.
  - Rule 3 explains why the second `if` in [S16-p11] runs in two processes.

### [S03-p3] wait() & waitpid(): Reaping Child Processes ⭐⭐
- **What are they?** **System calls** that let a parent process **pause (or poll)** and retrieve the **exit status** of a **terminated (or stopped)** child process.
  - This is how a parent "**collects the death certificate**" and prevents the child from becoming a **zombie**.
- **Yellow definition boxes:**
  - **System call** = "a special function a program uses to ask the operating system to do something it can't do on its own — like waiting for another process to finish".
  - **Zombie** = "a process that has finished running, but its parent hasn't collected its exit status yet".
- **Prototypes (exact):**
```c
#include <sys/wait.h>

pid_t wait(int *status);
pid_t waitpid(pid_t pid, int *status, int options);
```
- **`wait()`** blocks until **any** child terminates, then returns **that child's PID**.
- **`waitpid()`** lets you:
  - wait for a **specific child** (the `pid` argument);
  - **return immediately** if no child has exited (`WNOHANG`);
  - also report children that have been **stopped** (`WUNTRACED`).
- **Remember (red text on the slide):**
  - If a parent never calls `wait`, its terminated children **remain zombies until the parent exits**. They are then **adopted by PID 1**.
  - A well-behaved parent always reaps its children.
- **"Pause (or poll)" means two styles:**
  - *pause* = block inside `wait()` or `waitpid(…, 0)`;
  - *poll* = call `waitpid(…, WNOHANG)`, which never blocks, and check again later.

### [S03-p4] Process Graphs: The Method ⭐⭐ ("Exam Skill")
- **The Notation:**
  - **Nodes:** key operations (`printf`, `fork`, `wait`, `exit`).
  - **Horizontal Lines:** a single process's timeline.
  - **Vertical Arrows:** a `fork()` call.
  - **Dashed Edges:** a `wait()` call, forcing an order.
- **The Golden Rule:** "Every topological ordering of the graph is a legal output."
  - A *topological ordering* is any sequence that respects every arrow: a node may appear only after every node that has an arrow pointing into it.
- **Exam Skill:** "You must *list all* possible outputs, not just guess one."
- **Example diagram** (this is Program A's graph from [S03-p5]):
  - **P1** runs A → (fork) → B → (fork) → C.
  - **P2** branches off at the first fork and runs B → C.
  - **P3** and **P4** branch off at the second fork and each run C.
- ⚠️ **Notation inconsistency.** The legend says *dashed = wait()* and *vertical = fork()*. Yet this diagram draws the **fork** branches as **dashed** verticals, and Program A contains no `wait()` at all. Read the dashed verticals here as forks.
- **My exam method, built only from these rules:**
  1. Draw one horizontal line per process, with a vertical at every fork.
  2. Write down the constraints:
     - "X before Y on the same line";
     - "a child's first event comes after its fork";
     - "after a wait, the parent's next event comes after that child's exit".
  3. List every interleaving that respects all the constraints.

### [S03-p5] Program A: Two Forks, Straight Line ⭐⭐
- **Code (exact, as shown in the box):**
```c
// fork_graph_a.c
write(1, "A\n", 2);
fork();
write(1, "B\n", 2);
fork();
write(1, "C\n", 2);
```
- **The graph** is the same as on [S03-p4]:
  - P1 prints A, B, C;
  - P2 prints B, C;
  - P3 prints C;
  - P4 prints C.
- **The Analysis (slide):**
  - **Total processes: 4.**
  - **Output counts:** A prints once, B prints twice, C prints four times. **Total lines: 7.**
- `write(1, "A\n", 2)` writes 2 bytes, "A" and a newline, to the screen. 🔎 Look up in Track B: what descriptor 1 is, and why `write()` is used here instead of `printf()`.
- ✅ All **3** possible outputs were observed (§5 E8).

### [S03-p6] Program B: Fork in a Loop ⭐⭐
- **The Setup:** a loop that runs `fork()` three times.
```c
for (int i = 0; i < 3; i++) {
    fork();
}
```
- **Console-style box.** This is an explanation, not program output; the program prints nothing.
  - `--- Iteration i = 0 ---` P0 forks → created P1. **Active processes: 2 (2^1)**.
  - `--- Iteration i = 1 ---` P0 forks → created P2; P1 forks → created P3. **Active processes: 4 (2^2)**.
  - `--- Iteration i = 2 ---` P0 → P4; P1 → P5; P2 → P6; P3 → P7. **Active processes: 8 (2^3)**.
- **The graph** has columns I = 0, 1, 2. In each column **every line that exists forks**:
  - I = 0: P0 creates P1.
  - I = 1: P0 creates P2; P1 creates P3.
  - I = 2: P0 creates P4; P1 creates P5; P2 creates P6; P3 creates P7.
- **Pattern:**
  - Each pass through the loop **doubles** the process count, so *n* passes give **2ⁿ processes**, 2ⁿ − 1 of them newly created.
  - A child created at iteration *i* continues the loop from *i* + 1. That is Rule 1: it starts at the return of fork, which is *inside* the loop.
- ✅ Checked by adding one print line: 8 processes. The parent links match the slide (P0 has 3 children, P1 has 2, P2 and P3 have 1 each) (§5 E9).

### [S03-p7] Program C: wait() Buys Order ⭐⭐
- **Intro:** two runnable processes print in whatever order the scheduler likes. `wait()` takes that choice away from the scheduler, but read carefully **whose** order you bought.
- **EXAMPLE 1 — ONE CHILD, ONE WAIT (exact):**
```c
if (fork() == 0) {
    printf("child:  I run first, always\n");
    exit(0);
}
wait(NULL);             // the constraint
printf("parent: I run second, always\n");
```
  - **Output box:** `$ ./fork_graph_c 1   (three runs)` → `child:  I run first, always` / `parent: I run second, always`, "identical every single run".
  - The parent is **blocked inside `wait()`** until the child dies. Only one legal order is left, so the scheduler has nothing to decide.
  - **"One name, in case it is new":**
    - In `wait(NULL)`, the argument is where the child's exit status would be written.
    - Passing `NULL` says "I only want the ordering, not the status".
    - The child ends with `exit(0)`, one of the three ways a process dies ([S03-p8]).
- **EXAMPLE 2 — TWO CHILDREN, ONE WAIT (exact):**
```c
for (int i = 0; i < 2; i++)
    if ((kid[i] = fork()) == 0) {
        if (i == 0) sleep(1);   // the first-born dawdles
        printf("child (number %d)\n", i);
        exit(0);
    }
first = wait(NULL);     // which one comes back?
```
  - **Output box** (`$ ./fork_graph_c 2`):
```
child (number 1)
parent: forked 0 first, reaped child number 1 first
child (number 0)
```
  - **"The habit that is not a guarantee":**
    - Delete that `sleep` and the first-born wins **20 runs out of 20**, which is how a bug like this survives your testing.
    - **`wait()` returns whoever finishes, not whoever was created.**
    - Want a particular child? Name it: **`waitpid(kid[0], &st, 0)`**.
- **Big takeaway (bottom right):** "wait() buys **one** ordering constraint per call — between you and **one** child. It buys **nothing between the children**."
- ⚠️ The Example 2 snippet omits two things, so I added both to run it:
  - the declarations of `kid[]` and `first`;
  - the `printf` that produces the "parent: …" line (the slide shows only its output).
- ✅ Verified:
  - **With** `sleep(1)`, 20 of 20 runs gave exactly the slide's output.
  - **Without** the sleep, on my Mac the first-born was reaped first in only **15 of 20** runs. Over 300 runs **all 6 possible outputs** appeared (§5 E10).
  - This makes the slide's point even more strongly: never rely on the habit.

### [S03-p8] How a Process Dies: Three Ways ⭐⭐
- **The three ways:**
  1. `return` from `main` (= `exit`).
  2. `exit(n)`.
  3. **Killed by a signal.**
- "The exit status (0–255) is a **death certificate**; the kernel keeps it until **next of kin** collects it."
- **Definition box, Next of Kin** ['nekst ōv 'kin]: the closest living relative of a deceased person, such as that person's spouse, siblings, or parents.
  - In process terms, the parent is the next of kin, and `wait`/`waitpid` is how it collects the certificate.
- **Zombies:** "A child that has exited but whose parent has not `wait`ed is a **zombie**." A cartoon shows a zombie and an orphan.
- **Orphans:** "Parent dies first → the child is **adopted** by PID 1."
- **Orange banner:** **PID 1** = the very first user-space process started by the Linux kernel during system boot.
- **Zombie vs orphan:** the difference is who dies first.
  - **Zombie:** the *child* died and the parent hasn't reaped it.
  - **Orphan:** the *parent* died first.
- ✅ Orphan check: after the parent exited, the child's `getppid()` changed from the parent's PID to **1** (§5 E11).

### [S03-p9] Section divider — "exec: New Brain, Same Hands"
- Once a new process is created with `fork()`, it can choose to run something *entirely different*. That is where `exec()` comes in.
- **The metaphor:** a new **program** (the brain) runs in the same **process** (the hands), with the same PID and the same open files.

### [S03-p10] exec: The Missing Verb — exec() Family System Calls ⭐⭐
- **Definition:** `exec()` is a system call that **replaces the current process with a new program**. It does **not** create a new process; it **transforms the existing one**.
- **Diagram:**
  - PARENT → **fork** → the PARENT continues;
  - the CHILD → **exec** → continues as a different program.
- **Bullets:**
  - **Replaces** the program image: **code, data, heap, stack**.
  - **Keeps** the **PID, PPID, open files, cwd**.
  - **On success it never returns.** The line after it is the **failure path**.
- **Family ring:** `exec()` sits in the middle, with arrows to **`execl`, `execlp`, `execle`, `execv`, `execvp`, `execvpe`**.
- "**There is no function literally named `exec()` in C.**"
- ✅ Verified (§5 E12):
  - the PID before and after exec was identical;
  - with a nonexistent program name, exec **returned** and the next line ran.

### [S03-p11] execlp example ⭐⭐
- **Code (exact):**
```c
#include <stdio.h>
#include <unistd.h> // Required for exec family functions
int main() {
    printf("1. I am the original C program. My PID is %d\n", getpid());
    printf("2. I am about to replace myself with the 'ls -l' command...\n");
    // The exec call
    // 1st arg: "ls"      -> The program to find in the PATH
    // 2nd arg: "ls"      -> argv[0] (The name of the program as it sees itself)
    // 3rd arg: "-l"      -> argv[1] (The first argument to pass to the program)
    // 4th arg: NULL      -> REQUIRED: Marks the end of the argument list
    execlp("ls", "ls", "-l", NULL);
    // We only reach this point if execlp FAILED (e.g., program not found)
    return 1;
}
```
- **Diagram:** PARENT → fork → PARENT continues; CHILD → exec → `execlp("ls", "ls", "-l", NULL);`
- **Why "ls" appears twice:**
  - the 1st `"ls"` is the name to **search for in PATH**;
  - the 2nd `"ls"` is `argv[0]`, the name the program sees for itself.
- ⚠️ The picture shows the fork-then-exec pattern, but **this program never calls `fork()`**. The original process itself turns into `ls`, keeping its PID.
- ✅ Verified on a terminal: lines "1." and "2." appeared, then the `ls -l` listing. The exit status was 0, which came from `ls`; `return 1` never ran.
- ⚠️ **Surprise when the output is redirected to a file:** lines 1 and 2 **vanished**. They were still in the program's memory when exec replaced its code, data, heap and stack (p10). 🔎 Look up in Track B: stdio buffering with exec/fork (§5 E12).

### [S03-p12] execv (Vector / Array) and execl (List, Exact Path) ⭐⭐
- **execv (exact):**
```c
// 1. Build the arguments as an array (vector)
// MUST end with NULL
char *my_args[] = {"echo", "Hello", "from", "execv!", NULL};
// 2. Call execv (requires EXACT path, no 'p')
execv("/bin/echo", my_args);
```
- **execl (exact):**
```c
// Call execl:
// 1st arg: exact path to the binary
// 2nd arg: argv[0] (name of the program)
// 3rd arg: argv[1] (the format string for date)
// 4th arg: NULL terminator
execl("/bin/date", "date", "+%T", NULL);
```
- **Naming rules (bullets on the slide):**
  - **l (list):** arguments passed as a list: `execl`, `execlp`, `execle`.
  - **v (vector):** arguments passed as an array: `execv`, `execvp`, `execvpe`.
  - **p (PATH):** search `PATH` for the program: `execlp`, `execvp`.
- **Consequences:**
  - Without a `p`, you must give the **exact path** (`/bin/echo`, `/bin/date`).
  - Both the list and the array **must end with `NULL`**.
  - `argv[0]` is the program's own name.
- ⚠️ The letter **e** (in `execle` and `execvpe`) is never explained, and `execvpe` contains a "p" but is not listed under p. 🔎 Look up in Track B: what the `e` variants take.
- ✅ Verified (§5 E12):
  - `execv` printed `Hello from execv!`;
  - `execl` printed the current time as HH:MM:SS, e.g. `17:19:50`.

### [S03-p13] Section divider — "SIGNALS, PROPERLY"
- **Flow diagram:** `process → instruction 1 → instruction 2 →` a diamond where a **signal** (lightning bolt) arrives `→ signal handler →` back to `instruction 3 →` end (●).
- So a signal **detours** the normal flow into the handler, and execution then **resumes** where it left off.
- This is the "Return" step of [S17-p4] and the exceptional control flow of [S17-p3].

### [S03-p14] Signals, Properly — The signal() Function ("02 / 04") ⭐⭐
- **Identical to [S17-p7]:**
  - the signature `sighandler_t signal(int signum, sighandler_t handler);` with `typedef void (*sighandler_t)(int);`;
  - it returns the previous handler, or `SIG_ERR` on error ("does not set errno");
  - the same `SIG_IGN` / `SIG_DFL` / `&my_handler` table with the same comments.
- It appears in both decks, so expect it on the exam.

### [S03-p15] Signals, Properly — Installing Signal Handlers ⭐⭐
- **Identical to [S17-p4]**, minus "& Concurrency" in the title. It contains:
  - the 3 "how handlers are invoked" points;
  - the `sigint.c` example;
  - the Installing / Catching / Handling / Return terminology;
  - the `kill -2 12274` → `Caught SIGINT!` screenshot.
- It appears in both decks, so expect it on the exam.

### [S03-p16] Signal Types: Catchable vs Uncatchable — "Common Signals (Linux x86-64)" ⭐⭐
- **The table, copied with its blank column:**

| Signal | # | Default | Typical Source |
|---|---|---|---|
| `SIGINT` | 2 | *(blank on slide)* | Ctrl-C (terminal) |
| `SIGQUIT` | 3 | *(blank)* | Ctrl-\ |
| `SIGKILL` | 9 | *(blank)* | `kill -9` |
| `SIGSEGV` | 11 | *(blank)* | Invalid memory access |
| `SIGTERM` | 15 | *(blank)* | `kill` (default) |
| `SIGSTOP` | 19 | *(blank)* | `kill -STOP` |
| `SIGTSTP` | 20 | *(blank)* | Ctrl-Z |
| `SIGCHLD` | 17 | *(blank)* | Child stopped/exited |

- **Legend of the default actions:**
  - **Terminate** = turning off the computer. Done.
  - **Core Dump** = turning off the computer, but first taking a photo of the screen for debugging.
  - **Stop** = pressing the pause button. You can press play again later.
- ⚠️ The **"Default" column is empty** on the slide. And although the title promises "Catchable vs Uncatchable", **no column says which signals cannot be caught**.
- **What other slides do say:**
  - SIGINT → terminate ([S17-p3, p4]).
  - SIGCHLD → **Ignore**, and it is catchable ([S17-p3], [S03-p17]).
  - SIGTSTP (Ctrl-Z) → "suspend", i.e. Stop ([S17-p8]).
  - SIGKILL kills the process ([S17-p10]).
  - SIGTERM is a "termination request" ([S17-p5]).
- 🔎 Look up in Track B: the default actions of SIGQUIT, SIGSEGV, SIGTERM and SIGSTOP, and which signals can never be caught or ignored.
- "**kill (default)**" means a plain `kill PID` sends **SIGTERM (15)**.
- ✅ On my Mac, SIGSTOP/SIGTSTP/SIGCHLD are 17/18/20. **Learn the slide's Linux numbers: 19/20/17.**

### [S03-p17] SIGCHLD: The Child Status Signal ⭐⭐
- **What is it?** The system sends `SIGCHLD` to a parent process whenever one of its children **exits or stops**. It is the system's way of saying "One of your children needs attention — come collect its status."
  - **Signal number:** 17 (on Linux x86-64).
  - **Default action:** **Ignore**.
  - **Catchable?** Yes.
  - **Generated by:** the system, automatically.
- **Sketch:** inside a dashed "server" box, a parent process receives **SIGCHLD** arrows from child 1, child 2, …, child 128. Outside the box, a stick figure says "bye!", a child leaving.
- **Code (exact, as printed):**
```c
void handle_sigchld(int sig) {
    /*
     * WHY A 'while' LOOP INSTEAD OF AN 'if' STATEMENT?
     * Standard POSIX signals are UNQUEUED. If 5 child processes die at the exact same
     * instant, the kernel might deliver only ONE SIGCHLD signal.
     * Using a 'while' loop forces waitpid() to run repeatedly in a loop until EVERY
     * finished child is cleaned up, preventing leftover "zombie" processes.
     */
    while (waitpid(-1, NULL, WNOHANG) > 0) {
        /*
         *   -1  (Target PID): "Wait for ANY child process" belonging to this parent.
         *   NULL  (Status Pointer): Ignore the child's exit status code.
         *   WNOHANG  (Options Flag: "Wait NO HANG") :Return immediately without blocking/freezing execution.
         * -------------------------------------------------------------
         ////// Child successfully reaped
    }
}
```
- **Line by line:**
  - `-1`: wait for **any** child of this parent.
  - `NULL`: ignore the exit status.
  - `WNOHANG`: don't block.
  - `> 0`: a child was reaped, so loop and try again.
  - The loop stops when `waitpid` returns 0 (children exist but none has finished) or −1 (no children left).
- **Why `while` and not `if`** (the slide's comment):
  - Standard POSIX signals are **UNQUEUED**.
  - If 5 children die at the same instant, the kernel might deliver **only one** SIGCHLD.
  - The `while` loop keeps calling `waitpid()` until **every** finished child has been cleaned up, so no zombies are left behind.
- This is the fix for the "background children are never reaped" flaw of [S17-p2]: install this handler for SIGCHLD, and the shell or server reaps each child as it dies.
- ⚠️ **Bug: the inner comment is never closed.** The `/*` inside the loop has no `*/`, so it swallows the closing braces.
  - ✅ Compiling it as printed gives `error: unterminated /* comment`.
  - Fix: add `*/` after the dashed line.
- ✅ **Experiment** (§5 E17), with 5 children dying at the same moment:
  - the `while` version left **0 zombies** in 20 of 20 runs;
  - an `if` version left **1–4 zombies** in 17 of 20 runs.

### [S03-p18] sigaction(): The Modern Way to Handle Signals ⭐⭐
- **What is it?** A system call that lets you **precisely** control how a signal is handled. It **replaces the older, unreliable `signal()`** function.
- **The Problem with signal():**
  - **Not portable:** behavior varies between Unix versions (BSD vs System V).
  - **Handler reset:** on some systems, the handler resets to default after one delivery.
  - **No control over syscall restart:** you can't decide whether interrupted calls should resume.
  - **Race condition:** a signal can arrive before the handler is fully installed.
- **Code (exact):**
```c
void handle_sigint(int sig) {
    // safe work only: write, _exit, or set a flag
    got_sigint = 1;
}
int main() {
    struct sigaction sa;
    sa.sa_handler = handle_sigint;
    sigemptyset(&sa.sa_mask);      // no extra signals blocked during handler
    sa.sa_flags = SA_RESTART;      // automatically restart interrupted syscalls
    if (sigaction(SIGINT, &sa, NULL) == -1) {
        exit(1);
    }
    // ... rest of program
}
```
- **Quote box:** "**`signal()` is for reading old code; `sigaction()` is for writing new code.**"
- **Line by line:**
  1. `struct sigaction sa;` creates the settings record.
  2. `sa.sa_handler = handle_sigint;` chooses the handler.
  3. `sigemptyset(&sa.sa_mask);` empties the mask, so **no extra signals are blocked** while the handler runs.
  4. `sa.sa_flags = SA_RESTART;` makes interrupted system calls **restart automatically**.
  5. `sigaction(SIGINT, &sa, NULL)` installs the settings; `NULL` means "don't save the old ones".
  6. It returns −1 on failure, so the result is checked: the "always check" rule again.
- ⭐ **Handler safety rule (from the code comment):** "**safe work only: write, _exit, or set a flag**".
  - This handler only sets a flag; `main` checks the flag later.
  - 🔎 Look up in Track B: async-signal-safe functions, and why `_exit` rather than `exit`.
- ⚠️ `got_sigint` is used but **never declared** on the slide. It must be a global variable, visible to both the handler and `main`. 🔎 Look up in Track B: the recommended type for such a flag.
- ✅ **Experiment** (§5 E18), a parent blocked in `waitpid` receives SIGINT:
  - With **`SA_RESTART`**, it kept waiting and returned the child's PID.
  - With **`sa_flags = 0`**, `waitpid` returned −1 with **EINTR**, matching [S16-p15].
  - On my Mac, `signal()` did **not** reset after one delivery: the 2nd SIGINT was caught again (§5 E14). That is the "behavior varies" problem: you cannot rely on either behavior.

### [S03-p19] sigaction(): prototype and struct sigaction ⭐⭐
- **Prototype (exact):**
```c
#include <signal.h>

int sigaction(int signum, const struct sigaction *act, struct sigaction *oldact);
```
- The call "uses the **struct sigaction** type to specify which signal handler to run and other options for how the signal should be handled."
- **The struct (exact):**
```c
struct sigaction {
    void     (*sa_handler)(int);      // handler function or SIG_DFL/SIG_IGN
    void     (*sa_sigaction)(int, siginfo_t *, void *); // alternative handler
    sigset_t   sa_mask;               // signals to block during handler
    int        sa_flags;              // options (SA_RESTART, SA_SIGINFO, etc.)
    void     (*sa_restorer)(void);    // obsolete, not used
};
```
- **Flags:**

| Flag | Meaning |
|---|---|
| `SA_RESTART` | Automatically restart interrupted system calls (like `read`, `write`) |
| `SA_SIGINFO` | Use the `sa_sigaction` handler, which receives extra info about the signal |

- **Reading the prototype:**
  - `signum` = which signal;
  - `act` = the new settings;
  - `oldact` = where the old settings are saved (`NULL` if you don't care).
- **Masks in one line:** `sa_mask` is the set of signals **blocked while the handler runs**. `sigemptyset` makes that set empty. 🔎 Look up in Track B: sigaddset/sigprocmask, if masks are asked about in more depth.

### [S03-p20] Questions?
- Closing slide.

---

## 3. Definitions & key terms

| Term | Definition as taught (short quote or paraphrase) | Ref |
|---|---|---|
| **Program** | A file on disk. | [S16-p3] |
| **Process** | "An instance of a running program". What comes to life when the kernel loads a program into memory and runs it. Not a program, not a processor. | [S16-p3, p4] |
| **System call** | "A special function a program uses to ask the operating system to do something it can't do on its own". Each x86-64 syscall has a unique ID number (fork = 57, execve = 59, exit = 60, kill = 62). | [S03-p3; S16-p3] |
| **Logical control flow** | The illusion "I have the CPU all to myself". | [S16-p3] |
| **Context switching** | The CPU stops one task, saves its state (context), and loads another task's saved state, which allows multitasking. | [S16-p3] |
| **Private address space** | The illusion "I have memory all to myself". | [S16-p4] |
| **Virtual memory** | An abstraction layer that makes each process believe it has its own private, contiguous block of RAM. Each process sees `0x0…0xFFF…`, and the hardware maps those addresses to different physical frames. | [S16-p4] |
| **Process states** | **new** (just created by fork) → **ready** (in the ready queue) → **running** (scheduled) ⇄ **waiting** (I/O or event) → **terminated**. | [S16-p5] |
| **Scheduled** | Chosen by the kernel to execute. | [S16-p5] |
| **PID / `pid_t`** | A unique positive integer ID assigned by the kernel. `pid_t` comes from `<sys/types.h>` and is an `int` on Linux. | [S16-p6] |
| **fork()** | "Clone the current process". Called once, returns twice (0 in the child, the child's PID in the parent, −1 on error). | [S16-p6, p7] |
| **Concurrent** | Parent and child are separate processes running at the same time; which runs first is not fixed. | [S16-p6] |
| **The Three Rules** | (1) Starting Line: the child starts at fork's return. (2) Photocopy: a separate copy of memory. (3) Dual Path: code after fork runs in both. | [S03-p2] |
| **Process graph** | Horizontal line/arrow = a process's timeline. Vertical arrow = fork. Nodes = printf, fork, wait, exit. Dashed edge = wait (forces an order). | [S16-p8; S03-p4] |
| **Golden Rule** | Every topological ordering of the process graph is a legal output. | [S03-p4] |
| **Exam Skill** | List *all* possible outputs; don't guess one. | [S03-p4] |
| **Reap** | The parent collects a terminated child's exit status, so the kernel can remove the child. | [S16-p13] |
| **Zombie** | A terminated child whose parent hasn't collected its exit status yet. It still uses a PID and a process-table slot. `ps` shows it as `Z` / `[defunct]`. | [S16-p13, p16, p17; S03-p3, p8] |
| **Orphan** | A child whose parent dies first. It is adopted by PID 1 (`init`), which reaps it automatically. | [S16-p13; S03-p8] |
| **PID 1 (init)** | The very first user-space process the Linux kernel starts during boot. It is the root of the process tree. | [S03-p8; S17-p10] |
| **Wait set** | The children `waitpid` will wait for: `pid > 0` means that one child, `-1` means any child. | [S16-p14] |
| **Exit status** | A value from 0 to 255; the "death certificate" the kernel keeps until the next of kin (the parent) collects it. | [S03-p8; S16-p15] |
| **Next of kin** | The closest living relative of a deceased person. Here it means the parent. | [S03-p8] |
| **Stopped child** | A child that is paused rather than dead. `waitpid` reports it only with `WUNTRACED`. | [S16-p14; S03-p3] |
| **exec** | Replaces the current process's program (code, data, heap, stack) with a new one. Keeps the PID, PPID, open files and cwd. Never returns on success. "New brain, same hands." | [S03-p9, p10] |
| **argv[0]** | "The name of the program as it sees itself". It is the 2nd argument of `execl`/`execlp`. | [S03-p11, p12] |
| **PATH search** | The **p** variants (`execlp`, `execvp`) look up the program in PATH. Without p you must give the exact path. | [S03-p12] |
| **Foreground job** | The shell `waitpid`s for it, blocking until it ends. | [S17-p2] |
| **Background job** | Started with a trailing `&`. The shell skips `waitpid`, so the child is never reaped (the flaw). | [S17-p2] |
| **Exceptional control flow (ECF)** | The kernel interrupts a process's normal execution to deliver a notification, e.g. "your child died". | [S17-p3] |
| **Signal** | "A kind of (usually software) interrupt, used to announce asynchronous events to a process". The list is limited (e.g. 64 on Linux); names start with "SIG". | [S17-p3] |
| **Asynchronous event** | A task that is started but does not block the main program from continuing. (In the PDF's text layer but not visible on the rendered page.) | [S17-p3] |
| **Signal handler** | A function `void handler(int sig)` that runs when the signal arrives. It gets the signal number *k* as its argument. | [S17-p4] |
| **Installing / Catching / Handling / Return** | **Installing:** pass the handler's address to `signal()`. **Catching:** the handler is invoked. **Handling:** the handler body executes. **Return:** control goes back to the interrupted instruction. | [S17-p4; S03-p15] |
| **Default action** | What happens without a handler. **Terminate** = "turning off the computer". **Core Dump** = the same, plus "a photo of the screen for debugging". **Stop** = the "pause button". **Ignore** (e.g. SIGCHLD). | [S03-p16; S17-p3] |
| **SIG_IGN / SIG_DFL** | Handler values meaning "ignore this signal" and "go back to the default action". | [S17-p7; S03-p14] |
| **SIGCHLD** | Sent by the system to a parent when a child exits or stops. Number 17 (Linux x86-64), default Ignore, catchable. | [S17-p3; S03-p17] |
| **Unqueued signals** | Several identical signals that arrive together may be delivered as just one. That is why a SIGCHLD handler loops. | [S03-p17] |
| **sigaction()** | The modern system call for *precise* control of signal handling. It replaces the "older, unreliable" `signal()`. | [S03-p18, p19] |
| **Signal mask (`sa_mask`)** | The signals blocked while the handler runs. `sigemptyset(&sa.sa_mask)` means none extra are blocked. | [S03-p18, p19] |
| **SA_RESTART** | Flag: automatically restart system calls that were interrupted (like `read`, `write`). | [S03-p19] |
| **SA_SIGINFO** | Flag: use the `sa_sigaction` handler, which gets extra info about the signal. | [S03-p19] |
| **"Safe work" in a handler** | Only `write`, `_exit`, or setting a flag. | [S03-p18] |
| **kill (command)** | Sends signals from the terminal (`kill -2 PID`, `kill -9 PID`, `kill -TERM PID`). `kill -l` lists them. A plain `kill` sends SIGTERM. | [S17-p3, p4; S03-p16] |
| **pstree** | A Linux command that shows the process hierarchy. | [S17-p10] |
| **Daemon** | Shown in the hierarchy as a child of init ("Daemon e.g. httpd"); the slides don't define it. 🔎 Look up in Track B. | [S17-p10] |

---

## 4. System calls, macros & signal facts (as taught)

### 4.1 Process-control calls

| Call (header as on slides) | What it does | Return values | Gotchas the slides mention |
|---|---|---|---|
| `pid_t fork(void)` · `<unistd.h>` [S16-p6, p7; S03-p2] | Clones the caller. The child gets an identical but **separate** copy of the address space (data, stack) and the open file descriptors, plus a **new PID**. | Child: **`0`**. Parent: **child's PID (>0)**. Error: **`-1`**, with `errno` saying why. | Called once, returns twice. Both continue **right after** `fork` (the child's PC is copied; it does not restart `main`). Changes in one process don't affect the other. Code after `fork` runs in both unless you branch. Which runs first is the scheduler's choice. **Always check the return value.** |
| `pid_t getpid(void)` [S16-p6] | Returns your own PID. | PID | `pid_t` is an `int` on Linux (`<sys/types.h>`). |
| `pid_t getppid(void)` [S16-p6] | Returns your parent's PID. | Parent's PID | ✅ After the parent dies, it returns 1 (the orphan is adopted by PID 1, [S03-p8]). |
| `exit(n)` / `return` from `main` [S03-p8; S16-p5] | Terminates the process. The kernel keeps the exit status (0–255) until the process is reaped. | Does not return. | `return` from main = `exit`. The 3rd way to die is being killed by a signal. |
| `pid_t wait(int *status)` · `<sys/wait.h>` [S03-p3, p7] | Blocks until **any** child terminates. | That child's PID. | Returns **whoever finishes**, not whoever was created. `wait(NULL)` = "I only want the ordering". **One** ordering constraint per call, and none between the children. |
| `pid_t waitpid(pid_t pid, int *statusp, int options)` · `<sys/types.h>`, `<sys/wait.h>` [S16-p13–p15; S03-p3] | Suspends the caller until a child in the **wait set** terminates (or already has). | **`>0`**: PID of the reaped child. **`0`**: no child terminated yet (only with `WNOHANG`). **`-1`**: error; check `errno` for `ECHILD`/`EINTR`. | `pid = -1` is the same as `wait()`. Decode the status with the macros in 4.2. `WEXITSTATUS` is valid only if `WIFEXITED` is true. |
| exec family · `<unistd.h>` [S03-p10–p12] | **Replaces** the program image (code, data, heap, stack). Creates **no** new process. | **Never returns on success.** If it does return, it failed (✅ the next line ran). | Keeps PID, PPID, open files, cwd. The argument list or array **must end with `NULL`**. `argv[0]` is the program's own name. No `p` means you need the exact path. There is no function literally named `exec()`. |
| `kill` (syscall #62; also a shell command) [S16-p3; S17-p3, p4; S03-p16] | "Send signal to process". | — | `kill -l` lists the signals. `kill -2 PID` sends SIGINT, `kill -9` SIGKILL, `kill -STOP` SIGSTOP, and a plain `kill` sends **SIGTERM**. 🔎 Look up in Track B: the C signature `kill(pid, sig)`. |

### 4.2 waitpid() details [S16-p13–p15; S03-p3]

| 1st arg `pid` | Wait set |
|---|---|
| `> 0` | Only the child whose PID equals `pid` |
| `-1` | Any child (equivalent to `wait()`) |

| 3rd arg `options` | Behaviour |
|---|---|
| `0` (default) | Block until a child in the wait set terminates |
| `WNOHANG` (= 1) | Return immediately with **0** if no child has terminated yet ("useful for doing work while waiting") |
| `WUNTRACED` (= 2) | Also return for children that have been **stopped** |
| `WNOHANG \| WUNTRACED` | Non-blocking and also reports stopped children; returns 0 if nothing has happened yet |

| 2nd arg: status macros (`<sys/wait.h>`) | Tells you |
|---|---|
| `WIFEXITED(s)` | True if the child exited normally (`exit()` or `return`) |
| `WEXITSTATUS(s)` | The exit code, 0–255 (**only valid if `WIFEXITED` is true**) |
| `WIFSIGNALED(s)` | True if the child was killed by an uncaught signal |

| `errno` after a −1 return (`#include <errno.h>`) | Meaning |
|---|---|
| `ECHILD` | The caller has no children to wait for (✅ seen) |
| `EINTR` | The call was interrupted by a signal before a child terminated (✅ seen when SA_RESTART was off) |

### 4.3 exec family naming [S03-p10–p12]

| Letter | Meaning | Members (from the slide) | Slide example |
|---|---|---|---|
| **l** (list) | Arguments are passed one by one, ending with `NULL` | `execl`, `execlp`, `execle` | `execl("/bin/date", "date", "+%T", NULL);` |
| **v** (vector) | Arguments are passed as an array, whose last element is `NULL` | `execv`, `execvp`, `execvpe` | `execv("/bin/echo", my_args);` |
| **p** (PATH) | Search `PATH` for the program; otherwise you need the exact path | `execlp`, `execvp` | `execlp("ls", "ls", "-l", NULL);` |
| **e** | Not explained on the slides. 🔎 Look up in Track B | `execle`, `execvpe` | — |

### 4.4 Signal functions

| Function | What it does | Returns | Gotchas from the slides |
|---|---|---|---|
| `sighandler_t signal(int signum, sighandler_t handler)` · `<signal.h>` · with `typedef void (*sighandler_t)(int);` [S17-p7; S03-p14] | Changes the action for `signum` to `SIG_IGN`, `SIG_DFL` or `&my_handler`. | The previous handler if OK; **`SIG_ERR`** on error ("does not set errno"). | Check it against `SIG_ERR` [S17-p8]. Problems listed on [S03-p18]: not portable (BSD vs System V), may reset to default after one delivery, no control over syscall restart, race before the handler is fully installed. |
| `pause()` [S17-p4, p5, p8] | "Suspends until a signal arrives". | — | Usually written as `while (1) { pause(); }` so the program waits for signal after signal. |
| `alarm(n)` [S17-p6] | Asks for a **SIGALRM** to be delivered after `n` seconds. | — | Calling `alarm(1)` inside the handler **reschedules** it, which gives the BEEP loop. |
| `int sigaction(int signum, const struct sigaction *act, struct sigaction *oldact)` · `<signal.h>` [S03-p18, p19] | Installs the handler, mask and flags for `signum`. `oldact` receives the old settings (`NULL` = don't care). | **`-1`** on failure (the slide checks `== -1`). | "signal() is for reading old code; sigaction() is for writing new code." |
| `sigemptyset(&sa.sa_mask)` [S03-p18] | Empties the mask, so no extra signals are blocked during the handler. | — | Set this up before calling `sigaction`. |

| `signal()` handler value [S17-p7] | Effect |
|---|---|
| `SIG_IGN` | Signals of type *signum* are **ignored** (e.g. `signal(SIGINT, SIG_IGN);`, which stops Ctrl+C from working) |
| `SIG_DFL` | The action **reverts to the default** ("the next time the user presses Ctrl+C, the program will just die") |
| `&my_handler` | The user-defined handler is called whenever the process receives *signum* |

| `struct sigaction` field [S03-p19] | Purpose |
|---|---|
| `void (*sa_handler)(int)` | Handler function, or `SIG_DFL` / `SIG_IGN` |
| `void (*sa_sigaction)(int, siginfo_t *, void *)` | Alternative handler (used with `SA_SIGINFO`) |
| `sigset_t sa_mask` | **Signals to block during the handler** (the mask) |
| `int sa_flags` | Options: `SA_RESTART` (restart interrupted syscalls like `read`/`write`), `SA_SIGINFO` (use `sa_sigaction`, which gets extra info), etc. |
| `void (*sa_restorer)(void)` | Obsolete, not used |

### 4.5 Signals as taught (Linux x86-64 numbers from [S03-p16])

| Signal | # | Typical source | Default action (only where a slide states it) | Notes from the slides |
|---|---|---|---|---|
| `SIGINT` | 2 | Ctrl-C (terminal), `kill -2` | **Terminate** [S17-p3, p4] | Caught by `sigint.c`, `multi_signal.c`, `sig2handle.c` |
| `SIGQUIT` | 3 | Ctrl-\ | not stated 🔎 | Caught in `sig2handle.c` |
| `SIGKILL` | 9 | `kill -9` | Kills the process and its threads (meme, [S17-p10]) | The way out when INT/QUIT/TERM are caught [S17-p5, p8]. Uncatchable? 🔎 Look up in Track B |
| `SIGSEGV` | 11 | Invalid memory access | not stated 🔎 | — |
| `SIGTERM` | 15 | `kill` (default) | "termination request" [S17-p5] | "Be nice. Send SIGTERM instead." [S17-p10] |
| `SIGSTOP` | 19 | `kill -STOP` | not stated (legend: Stop = "pause button") 🔎 | ✅ `ps` showed state `T` after `kill -STOP` |
| `SIGTSTP` | 20 | Ctrl-Z | **suspend**, i.e. Stop [S17-p8] | Misspelled "SIGSTP" on [S17-p8] ⚠️ |
| `SIGCHLD` | 17 | Child stopped or exited | **Ignore** [S17-p3; S03-p17] | Catchable; "generated by the system, automatically"; **unqueued**, so use a `while` loop |
| `SIGALRM` | — (not in the table) | `alarm(n)` | — | [S17-p6] |
| `SIGUSR1` | — (not in the table) | "user-defined 1", e.g. `kill -USR1 PID` | — | [S17-p5] |

> ✅ On macOS, STOP = 17, TSTP = 18 and CHLD = 20; INT/QUIT/KILL/SEGV/TERM match the table. **For the exam, use the slide's numbers.**

### 4.6 Other facts as tables

| Handler step [S17-p4] | Meaning |
|---|---|
| **I**nstalling | Pass the function address to `signal()` (or `sigaction()`) to change the default action |
| **C**atching | The handler is *invoked* when the signal arrives; it receives the signal number |
| **H**andling | The handler body executes |
| **R**eturn | Control goes back to the interrupted instruction in `main`. On some systems an interrupted system call returns an error instead (`EINTR`, unless `SA_RESTART`) |

| How a process ends [S03-p8; S16-p5] | |
|---|---|
| 1 | `return` from `main` (= `exit`) |
| 2 | `exit(n)`; the status 0–255 is the "death certificate" |
| 3 | Killed by a signal (then `WIFSIGNALED` is true for the parent) |

| Problem with `signal()` [S03-p18] | What `sigaction` offers (per [S03-p18, p19]) |
|---|---|
| Not portable (BSD vs System V) | Precise, explicit control over each setting 🔎 Look up in Track B: why it is portable |
| Handler reset after one delivery on some systems | The handler is given explicitly in the struct (🔎 Look up in Track B: guarantee details) |
| No control over syscall restart | **`SA_RESTART`** flag |
| Race: a signal can arrive before the handler is fully installed | 🔎 Look up in Track B |

### 4.7 Gotchas checklist (all from the slides)
1. **Always check return values:** `fork()` → −1 [S16-p7]; `signal()` → `SIG_ERR` [S17-p8]; `sigaction()` → −1 [S03-p18]; `waitpid()` → −1 plus `errno` [S16-p15].
2. Code after `fork()` runs in **both** processes unless you branch on the return value (Rule 3) [S03-p2].
3. Without braces, an `if` controls only the **next statement**, whatever the indentation suggests [S16-p11].
4. `wait()` orders **you vs one child**, never child vs child [S03-p7].
5. A SIGCHLD handler needs **`while`**, not `if`, because signals are unqueued [S03-p17].
6. `exec` **never returns** on success. Any code after it is the failure path [S03-p10, p11].
7. exec argument lists **must end with `NULL`** [S03-p11, p12].
8. Read `WEXITSTATUS` only if `WIFEXITED` is true [S16-p15].
9. A handler should do **only safe work**: `write`, `_exit`, or set a flag [S03-p18].
10. If a program catches SIGINT, SIGQUIT and SIGTERM, Ctrl-C and plain `kill` no longer stop it. Use `kill -9` [S17-p5, p8].
11. Zombies hold a PID and a process-table slot until they are reaped. Explicit reaping matters for long-running parents (shells, servers) [S16-p13].
12. Use the **Linux** signal numbers from [S03-p16] in the exam.

---

## 5. Worked examples

> **How to read each example:**
> - **Graph:** one horizontal line per process, `└─` = fork, `┄` = a wait dependency.
> - **Processes** = total processes alive in the program (the original included).
> - **All possible outputs:** every topological order of the graph [S03-p4]. These lists were also produced mechanically from the graph.
> - **✅ Verified:** real runs in a pseudo-terminal on macOS, with counts of how often each output appeared.
> - Frequencies only show the habits of *my* machine. Every listed output is legal, and the exam wants **all** of them.
>
> ⚠️ **One running tip.** If you run the `printf` programs with output piped or redirected (`./a.out | cat`, `> file`), you may see **duplicated lines** (E5, E6) or **missing lines** (E12). This is a buffering effect that the slides don't cover; 🔎 Look up in Track B: stdio buffering with fork/exec. In a normal terminal window you get the outputs shown here. The `write()` programs (Program A) are not affected.

### E1 — [S16-p7] `fork_example.c` (code in §2)
```
parent (P) ●──fork──●──printf("parent: my pid = P, child = C")──● return 0
                │
child  (C)      └──●──printf("child:  my pid = C, parent = P")──● return 0
```
- **Processes:** 2 (1 created). **Lines:** 2.
- **All possible outputs:**
  1. `parent: my pid = P, child = C` then `child:  my pid = C, parent = P`
  2. `child:  my pid = C, parent = P` then `parent: my pid = P, child = C`
  3. **Orphan twist:** the parent's line, then `child:  my pid = C, parent = 1`.
     - This happens if the parent has already returned when the child calls `getppid()`.
     - The child is then an orphan, adopted by PID 1 [S03-p8].
- ✅ **300 runs:** parent's line first 286×, child's first 14×. **`parent = 1` appeared 11×**, so the orphan case is real.
```
parent: my pid = 60871, child = 60872
child:  my pid = 60872, parent = 60871
```

### E2 — [S16-p8] Process graph with `x` (code in §2)
```
                     child : x=2
                ┌──────●──────────●            Child   (pid == 0 → ++x on ITS copy → 2)
                │    printf      exit
  x==1          │
 ●──────────────●──────●──────────●            Parent  (pid > 0 → --x on ITS copy → 0)
main          fork   printf      exit
                     parent: x=0
```
- **Processes:** 2. **Lines:** 2.
- **All possible outputs:**
  - (a) `parent: x=0` / `child : x=2`
  - (b) `child : x=2` / `parent: x=0`
- **Impossible:** any line showing `x=1`. Each process changes its own copy *before* printing (Rule 2).
- ✅ **300 runs:** (a) 287×, (b) 13×.

### E3 — [S16-p9] `fork(); fork(); printf("hello\n");`
```
child3                    ┌──● printf "hello" ──● exit       (made by child1's fork)
                          │
child1          ┌──● fork─┴──● printf "hello" ──● exit       (made by parent's 1st fork)
                │
child2          │       ┌──● printf "hello" ──● exit         (made by parent's 2nd fork)
                │       │
parent  ● main──● fork──● fork──● printf "hello" ──● exit
```
- **Processes:** 4 (3 created). **Lines:** 4, all "hello".
- **All possible outputs:** only **1** distinct text, `hello` × 4, because identical lines can't be told apart.
- ✅ 150/150 runs gave exactly 4 × `hello`.

### E4 — [S16-p9] HOMEWORK: three forks, then `printf("hello\n")`
Who creates whom (F1, F2, F3 are the three `fork()` lines):
```
parent ──F1──► c1 ──F2──► c3 ──F3──► c7
  │             └──F3──► c5
  ├──F2──► c2 ──F3──► c6
  └──F3──► c4
```
- **Processes:** 2³ = **8** (7 created). **Output:** **8 × `hello`**, 1 distinct text.
- **Children per process:** parent 3; c1 2; c2 1; c3 1; c4–c7 0.
- **Rule:** *n* forks in a straight line (nothing branches on the return value) give 2ⁿ processes, and each one prints once.
- ✅ 150/150 runs gave exactly 8 × `hello`.

### E5 — [S16-p10] Nested forks in parent (code in §2)
The graph is drawn with the **code's** roles (see the ⚠️ in §2):
```
P  (original)    ●──L0──● fork#1 ──L1──● fork#2 ──L2──Bye──●
                          │                  │
C1 (fork#1 → 0)           └──Bye──●          │
                                             │
C2 (fork#2 → 0)                              └──Bye──●
```
- **Constraints:**
  - `L0 < L1 < L2 < Bye(P)`
  - `L0 < Bye(C1)`
  - `L1 < Bye(C2)`
- **Processes:** 3. **Lines:** 6 (L0, L1, L2, Bye × 3).
- **All 5 possible outputs:**

| # | Output (top → bottom) | Seen in 400 runs |
|---|---|---|
| 1 | L0 · L1 · Bye · L2 · Bye · Bye | 313 |
| 2 | L0 · L1 · Bye · Bye · L2 · Bye | 32 |
| 3 | L0 · Bye · L1 · L2 · Bye · Bye | 25 |
| 4 | L0 · L1 · L2 · Bye · Bye · Bye | 23 |
| 5 | L0 · Bye · L1 · Bye · L2 · Bye | 7 |

- **Counting trick:**
  1. L0 is always first.
  2. Only C1's Bye can come before L1, so there are 0 or 1 Byes there.
  3. After L2 there must be at least 1 Bye (P's own).
  4. With 0 Byes before L1 the split is (0,3), (1,2) or (2,1) Byes before/after L2; with 1 Bye before L1 it is (0,2) or (1,1). So **3 + 2 = 5**.
- **Impossible:**
  - `L0 Bye Bye L1 …`, because only one Bye may come before L1;
  - any output that **ends** with L2, because the parent prints Bye after L2.
- ✅ All 5 outputs appeared (400 runs). When piped, L0 appeared 3× (see the running tip).

### E6 — [S16-p11] HOMEWORK: HI / SYSTEMS PROGRAMMING / GOOD LUCK / BYE (code in §2)
```
main     ●──"HI"──● F1 ──────────────────────────────● F2 ──"GOOD LUCK"──"BYE"──● exit
                    │                                   │
child2              │                                   └──"BYE"──● exit
                    │
child1              └──"SYSTEMS PROGRAMMING"──● F2' ──"GOOD LUCK"──"BYE"──● exit
                                                │
child3                                          └──"BYE"──● exit
```
- **Processes:** 4 (3 created). Child2 and child3 only print BYE, because their `fork()` returned 0, so `!= 0` is false.
- **Per-process outputs (what the homework asks for):**

| Process | Prints |
|---|---|
| main | HI, GOOD LUCK, BYE |
| child1 | SYSTEMS PROGRAMMING, GOOD LUCK, BYE |
| child2 | BYE |
| child3 | BYE |

- **Totals, paper model** (each `printf` counted when it is called): HI × 1, SYSTEMS PROGRAMMING × 1, GOOD LUCK × 2, BYE × 4, i.e. 8 printf calls.
- **Constraints:**
  - HI comes first.
  - SP < GL(child1) < BYE(child1).
  - SP < BYE(child3).
  - GL(main) < BYE(main).
  - BYE(child2) can be anywhere after HI.
  - This gives **28 legal orders** (listed below).

<details><summary>All 28 orders (paper model; SP = SYSTEMS PROGRAMMING, GL = GOOD LUCK)</summary>

```
HI BYE GL BYE SP BYE GL BYE      HI GL BYE SP BYE GL BYE BYE
HI BYE GL BYE SP GL BYE BYE      HI GL BYE SP GL BYE BYE BYE
HI BYE GL SP BYE BYE GL BYE      HI GL SP BYE BYE BYE GL BYE
HI BYE GL SP BYE GL BYE BYE      HI GL SP BYE BYE GL BYE BYE
HI BYE GL SP GL BYE BYE BYE      HI GL SP BYE GL BYE BYE BYE
HI BYE SP BYE GL BYE GL BYE      HI GL SP GL BYE BYE BYE BYE
HI BYE SP BYE GL GL BYE BYE      HI SP BYE BYE GL BYE GL BYE
HI BYE SP GL BYE BYE GL BYE      HI SP BYE BYE GL GL BYE BYE
HI BYE SP GL BYE GL BYE BYE      HI SP BYE GL BYE BYE GL BYE
HI BYE SP GL GL BYE BYE BYE      HI SP BYE GL BYE GL BYE BYE
HI GL BYE BYE SP BYE GL BYE      HI SP BYE GL GL BYE BYE BYE
HI GL BYE BYE SP GL BYE BYE      HI SP GL BYE BYE BYE GL BYE
HI GL BYE SP BYE BYE GL BYE      HI SP GL BYE BYE GL BYE BYE
                                 HI SP GL BYE GL BYE BYE BYE
                                 HI SP GL GL BYE BYE BYE BYE
```
</details>

- ✅ **A real run in a terminal looks different.** Each process's text comes out as **one line** when it prints `"BYE \n"`, and **every line starts with "HI"**:
```
HIGOOD LUCKBYE                         ← main
HIBYE                                  ← child2
HISYSTEMS PROGRAMMINGGOOD LUCKBYE      ← child1
HISYSTEMS PROGRAMMINGBYE               ← child3
```
  - These 4 lines may appear in any order: 4! = 24 possible orders, and 22 different ones showed up in 300 runs.
  - **Why HI appears 4×:** "HI" has no `\n`, so it was still sitting in the process's memory when each `fork()` photocopied that memory (Rule 2, [S03-p2]). "SYSTEMS PROGRAMMING" was copied into child3 the same way.
  - 🔎 Look up in Track B: stdio buffering and fork.
- **For the exam:** give the paper answer (the slide's graph plus the per-process table). Mention the real-run effect only if you are asked what actually prints.

### E7 — [S16-p13–p17] waitpid, status macros, zombie lifecycle
- **My harness** wraps the exact [S16-p15] snippet. Cases:
  - a child that calls `exit(7)`;
  - a child that is killed with SIGKILL;
  - `WNOHANG` while a child is still running;
  - `waitpid(-1, …)` when no children are left.
- ✅ **Output (terminal):**
```
child 83324 exited with code 7
child 83325 killed by signal
waitpid(c, &st, WNOHANG) while child runs -> 0
waitpid(c, &st, 0) blocks, then -> c's PID
waitpid(-1, NULL, 0) with no children -> -1, errno=ECHILD (No child processes)
WNOHANG=1 WUNTRACED=2
```
- **Zombie lifecycle.** This is my re-creation of [S16-p16]'s `zombie_demo`; the slide shows only its output.
  - **Graph:** the parent runs `fork → sleep(1) → ps → waitpid ┄ (waits for the child's exit) → print`. The child runs `print → print → exit(0)`, and is a **zombie** from its `exit` until the parent's `waitpid`.
  - ✅ **Output:**
```
[parent 83561] forked child 83567
[child 83567] running... doing work
[child 83567] calling exit(0)
--- ps BEFORE waitpid ---
  PID  PPID STAT COMM
83567 83561 Z    <defunct>
[parent 83561] calling waitpid(83567, &status, 0)
[parent 83561] waitpid returned 83567
[parent 83561] WIFEXITED -> true, WEXITSTATUS -> 0
--- ps AFTER waitpid ---
  PID  PPID STAT COMM
```
  - **Before** `waitpid`: STAT `Z` and `<defunct>`, as [S16-p16] says.
  - **After** `waitpid`: the PID is gone from `ps`, i.e. "zombie fully removed".

### E8 — [S03-p5] Program A (`write`, two forks)
```
P1  ●──A──● fork ──B──● fork ──C──●
            │            │
P3          │            └──C──●              (P1's 2nd child)
            │
P2          └──B──● fork ──C──●               (P1's 1st child)
                    │
P4                  └──C──●                   (P2's child)
```
- **Constraints:**
  - `A < B(P1) < C(P1)` and `B(P1) < C(P3)`
  - `A < B(P2) < C(P2)` and `B(P2) < C(P4)`
- **Processes:** 4. **Lines:** 7 (A × 1, B × 2, C × 4), matching the slide's analysis.
- **All 3 possible outputs:**

| # | Output | Seen in 400 runs |
|---|---|---|
| 1 | A B B C C C C | 386 |
| 2 | A B C B C C C | 13 |
| 3 | A B C C B C C | 1 |

- **Why only 3:** each B "unlocks" at most 2 C's (its own and its new child's). So at most 2 C's can come before the second B, and `A B C C C B C` is **impossible**.
- ✅ All 3 appeared. Piped through `cat` the output was the same, with no duplicates, because `write` is used instead of `printf`.

### E9 — [S03-p6] Program B (fork in a loop, 3 iterations)
```
P0 ──i=0──► P1 ──i=1──► P3 ──i=2──► P7
 │           └──i=2──► P5
 ├──i=1──► P2 ──i=2──► P6
 └──i=2──► P4
```
- **Processes:** 2³ = **8** (7 created). **Output:** none, since the program prints nothing.
- **Children per process:** P0 3, P1 2, P2 1, P3 1, P4–P7 0.
- **General rule:** a process born at iteration *i* forks *n* − 1 − *i* more times.
- ✅ I added one `printf` at the end to check this.
  - It printed 8 lines, and the parent/child links matched the tree above.
  - One line said `(parent 1)`: its parent had already exited, so it was an orphan [S03-p8].

### E10 — [S03-p7] Program C: `wait()` buys order
**Example 1 — one child, one wait:**
```
parent  ●──fork──────────────────────────────────────● wait(NULL) ──"parent: I run second, always"──●
               │                                        ┆
child          └──"child:  I run first, always"──● exit(0) ┄┄┘
```
- **Processes:** 2. **Exactly 1 possible output:** child line, then parent line.
- ✅ 200/200 runs gave that order.

**Example 2 — two children, one wait:**
```
parent   ●──fork(kid[0])──fork(kid[1])──● wait(NULL) ┄┄ returns when EITHER child has exited ──"parent: … reaped child number X first"──●
               │               │
child 0        └──sleep(1)──"child (number 0)"──● exit
                               │
child 1                        └──"child (number 1)"──● exit
```
- **Processes:** 3. **Lines:** 3.
- **Rule:** X is whichever child *exited* first, and that child's line must already have been printed.
- **All 6 possible outputs:**

| # | Output (c0 = "child (number 0)", P1/P0 = parent reaped child 1 / child 0) | With `sleep(1)` (20 runs) | `sleep` deleted (300 runs) |
|---|---|---|---|
| 1 | c1 · **P1** · c0 ← the slide's output | **20** | 1 |
| 2 | c1 · c0 · P1 | 0 | 9 |
| 3 | c0 · c1 · P1 | 0 | 15 |
| 4 | c0 · **P0** · c1 | 0 | 130 |
| 5 | c0 · c1 · P0 | 0 | 144 |
| 6 | c1 · c0 · P0 | 0 | 1 |

- **Rows 3 and 6:** print order ≠ exit order. The child that printed first is not necessarily the one `wait()` returned.
- **Slide vs my Mac:** the slide says the first-born wins "20 runs out of 20" without the sleep. On my Mac it won **15 of the first 20**, which proves the slide's point: "the habit is not a guarantee".
- **Fix:** name the child, `waitpid(kid[0], &st, 0)`.
- The parent waits **once**. The other child may outlive it, become an **orphan**, and be reaped by PID 1 [S16-p13].

### E11 — [S03-p8] Orphan check (my test program)
- The parent exits without waiting; the child sleeps 1 s and then asks for its parent's PID again.
- ✅ **Output:**
```
[parent 84218] exiting without waiting
[child] my parent is 84218
[child] parent died; my parent is now 1
```
- On a Mac, PID 1 is `launchd`; on Linux, as the slides say, it is `init`.

### E12 — [S03-p10–p12] exec family
- **Typical graph:**
```
parent ●──fork─────────────────────● waitpid ┄┄──●
             │                         ┆
child        └──● exec("ls") ═══ now running ls (same PID) ──● exit ┘
```
- ✅ **`execlp_example` (code in §2), in a terminal:**
```
1. I am the original C program. My PID is 5682
2. I am about to replace myself with the 'ls -l' command...
total 0
-rw-r--r--@ 1 azim  wheel  0 Oct 19 17:19 a.txt
-rw-r--r--@ 1 azim  wheel  0 Oct 19 17:19 b.txt
exit status: 0                 ← from ls; "return 1" never ran
```
  - With output **redirected to a file**, lines 1 and 2 were **missing**, and only the `ls` lines were saved (see the running tip).
- ✅ **`execv("/bin/echo", my_args)`** printed `Hello from execv!`.
- ✅ **`execl("/bin/date", "date", "+%T", NULL)`** printed the time as HH:MM:SS, e.g. `17:19:50`.
- ✅ **Failure path** (my test: `execlp` of a program that doesn't exist):
```
before exec, PID 5699
exec FAILED and returned (errno: No such file or directory) - this line is the failure path
exit status: 1
```
- ✅ **The PID is kept** (my test: the child prints its PID, then execs a shell that prints its own PID):
```
child before exec: PID 5707
after exec (now running sh): PID 5707
parent: child 5707 finished
```

### E13 — [S17-p4 = S03-p15] `sigint.c` (one handler, one signal)
- **Signal "graph"** (one process; the ⚡ marks the moment the signal arrives):
```
main     ●──signal(SIGINT, handler)──● pause() . . . sleeping . . .
                                              ⚡ SIGINT  (Ctrl-C, or kill -2 PID)
handler                                        └──printf "Caught SIGINT!"──exit(0) ●  → program ends
                                                  (main's exit(0) after pause() is never reached)
```
- **Processes:** 1.
- **Output:** exactly one line, `Caught SIGINT!`. The exit code is **0**, coming from the handler's `exit(0)`.
- **Without the handler**, SIGINT's default action is to **terminate** [S17-p4].
- ✅ **Transcript:**
```
   >>> [driver] sent SIGINT
Caught SIGINT!
   >>> [driver] program exited with code 0
```

### E14 — [S17-p5] `multi_signal.c` (one handler, three signals)
- **Processes:** 1.
- **Output:**
  - The 2 intro lines and a blank line.
  - Then, **per signal received**, a blank line followed by `Caught …`, because each message starts with `\n`.
- **It never ends on its own.** SIGINT and SIGTERM are caught, so only an uncaught signal such as `kill -9` stops it.
- ✅ **Transcript** (my driver sends INT, TERM, USR1, INT, then KILL):
```
Process 85216 waiting for signals...
Try: Ctrl+C (SIGINT) or kill -TERM 85216 (SIGTERM)

   >>> [driver] sent SIGINT

Caught SIGINT (Ctrl+C)
   >>> [driver] sent SIGTERM

Caught SIGTERM (termination request)
   >>> [driver] sent SIGUSR1

Caught SIGUSR1 (user-defined 1)
   >>> [driver] sent SIGINT

Caught SIGINT (Ctrl+C)
   >>> [driver] sent SIGKILL
   >>> [driver] program was killed by signal 9 (SIGKILL)
```
- The **second** SIGINT was caught again: on this Mac, `signal()` did **not** reset to the default after one delivery. [S03-p18] warns that this varies between systems.

### E15 — [S17-p6] `alarm.c`
- **Trace:**

| Time (s) | Handler call | Prints | `++beeps` | `< 5`? | Then |
|---|---|---|---|---|---|
| 1 | 1st | BEEP | 1 | yes | `alarm(1)` |
| 2 | 2nd | BEEP | 2 | yes | `alarm(1)` |
| 3 | 3rd | BEEP | 3 | yes | `alarm(1)` |
| 4 | 4th | BEEP | 4 | yes | `alarm(1)` |
| 5 | 5th | BEEP | 5 | **no** | `BOOM!`, `exit(0)` |

- **Output:** `BEEP` × 5, then `BOOM!`. It takes about **5 s**.
- Between alarms, `main` spins in `while (1) { ; }`. Each SIGALRM interrupts that loop, and when the handler returns, control goes back to exactly where the loop was interrupted.
- ✅ The output matched the slide: 5 × BEEP, BOOM!, about 5 s.

### E16 — [S17-p8] `sig2handle.c`
- ✅ **Transcript** (INT, QUIT, INT, then `kill -9`):
```
Installing SIGINT handler...
Installing SIGQUIT handler...
MAIN PROCESS NOW WAITING FOR signals...
 Ctrl+C (SIGINT) or Ctrl+\ (SIGQUIT)
Ctrl+Z to suspend or 'kill -9 PID' 

   >>> [driver] sent SIGINT
Caught SIGINT (Ctrl+C)
   >>> [driver] sent SIGQUIT
Caught SIGQUIT (Ctrl+\)
   >>> [driver] sent SIGINT
Caught SIGINT (Ctrl+C)
   >>> [driver] sent SIGKILL
   >>> [driver] program was killed by signal 9 (SIGKILL)
```
- ✅ **Process states** while it ran in the background:
  - `ps` STAT was `S` (sleeping in `pause`);
  - after `kill -STOP` it was **`T`** (stopped, the "pause button" of [S03-p16]);
  - a handled `kill -INT` left it alive;
  - `kill -9` removed it.

### E17 — [S03-p17] SIGCHLD handler: `while` vs `if`
- ✅ **Compiled exactly as printed:**
  - `error: unterminated /* comment`, pointing at the inner `/*`;
  - the file then fails to parse, because the comment swallowed the closing braces.
  - Fix: add `*/` after the dashed line.
- ✅ **Experiment** (fixed comment): 5 children wait for a common "starting gun" and then exit **at the same instant**. The parent has a SIGCHLD handler installed; after 1 s it counts the reaped children and the zombies still in `ps`.

| Handler | Runs | Zombies left over |
|---|---|---|
| `while (waitpid(-1, NULL, WNOHANG) > 0)` (slide) | 20 | **0 in all 20 runs** |
| `if (waitpid(-1, NULL, WNOHANG) > 0)` | 20 | 0 in 3 runs; 1 in 4; 2 in 9; 3 in 2; 4 in 2 |

- **Interpretation:** this proves the slide's claim. Signals are **unqueued**, so 5 deaths can arrive as fewer SIGCHLDs. An `if` reaps only **one** child per signal, and the rest stay zombies.

### E18 — [S03-p18, p19] `sigaction` + `SA_RESTART` (and `EINTR` from [S16-p15])
- **Setup.** The slide's code, plus:
  - a declared global flag;
  - a child that lives 2 s;
  - the parent blocked in `waitpid` when SIGINT arrives at 0.6 s.
- ✅ **With `sa.sa_flags = SA_RESTART`** (as on the slide):
```
parent: blocked in waitpid (sa_flags=SA_RESTART)...
   >>> [driver] sent SIGINT
waitpid returned the child's PID 8268 (got_sigint=1) -> the call was restarted
```
- ✅ **With `sa.sa_flags = 0`:**
```
parent: blocked in waitpid (sa_flags=0)...
   >>> [driver] sent SIGINT
waitpid returned -1, errno=EINTR  -> interrupted by the signal (got_sigint=1)
```
- **Lessons:**
  - The handler ran in both cases (the flag was set).
  - `SA_RESTART` decides whether the interrupted system call **resumes** or **fails with `EINTR`**. This is exactly the "no control over syscall restart" problem of `signal()` [S03-p18].
  - It is also the "Return" note of [S17-p4]: "On some systems, interrupted system calls return with an error instead."

---

### Practice programs (new, written in the professor's style). Predict on paper first, then check the answers.

> These four programs use only what the slides teach: `fork`, `wait`/`waitpid`, `exit`, the status macros, `execv`, `signal`, `SIG_IGN`/`SIG_DFL`, and sending a signal with `kill`. All answers were ✅ verified.

#### P1 — "Whose order did you buy?" (fork, photocopy, one wait)
```c
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
int main() {
    int x = 1;
    printf("P%d\n", x);
    if (fork() == 0) {
        x = x * 2;
        printf("Q%d\n", x);
        if (fork() == 0) {
            x = x * 3;
            printf("R%d\n", x);
        }
    } else {
        wait(NULL);
    }
    printf("S%d\n", x);
    return 0;
}
```
**Questions:**
- (a) How many processes are there?
- (b) Draw the process graph.
- (c) What is `x` in each process?
- (d) List **all** possible outputs.

**Answer:**
```
main    ●──"P1"──● fork ─────────────────────────────────● wait(NULL) ┄┄──"S1"──●
                   │                                        ┆  (waits for its OWN child C1 only)
C1                 └──x=2──"Q2"──● fork ──"S2"──● exit ┄┄┄┄┘
                                   │
C2 (grandchild)                    └──x=6──"R6"──"S6"──● exit
```
- **(a)** **3 processes:** main, its child C1, and the grandchild C2. **6 lines.**
- **(c)** x is 1 in main, 2 in C1 and 6 in C2. Each process has its own copy (Rule 2).
- **Constraints:**
  - `P1 < Q2 < S2 < S1`; the last link comes from main's `wait`, which waits for C1's exit.
  - `Q2 < R6 < S6`.
- **(d) All 6 outputs:**

| # | Output | Seen in 400 runs |
|---|---|---|
| 1 | P1 Q2 S2 R6 S6 S1 | 382 |
| 2 | P1 Q2 S2 S1 R6 S6 | 11 |
| 3 | P1 Q2 R6 S6 S2 S1 | 6 |
| 4 | P1 Q2 S2 R6 S1 S6 | 1 |
| 5 | P1 Q2 R6 S2 S1 S6 | 0 (legal, just not seen) |
| 6 | P1 Q2 R6 S2 S6 S1 | 0 (legal, just not seen) |

- **Trap:** `wait(NULL)` in main waits only for **C1**, not for the grandchild C2.
  - So S1 can come **before** R6 or S6 [S03-p7: "between you and one child"].
  - C2 may even outlive main, becoming an orphan [S03-p8].

#### P2 — "Fan of children, wait for all"
```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
int main() {
    for (int i = 0; i < 3; i++) {
        if (fork() == 0) {
            printf("child %d\n", i);
            exit(0);
        }
    }
    while (wait(NULL) > 0)
        ;
    printf("parent done\n");
    return 0;
}
```
**Questions:**
- (a) How many processes are there, and how many lines?
- (b) List all possible outputs.
- (c) When does the `while` loop end?

**Answer:**
```
parent  ●──fork(i=0)──fork(i=1)──fork(i=2)──● wait ┄● wait ┄● wait ┄● wait→ -1 ──"parent done"──●
               │          │          │
child 0        └─"child 0"─● exit    │
child 1                   └─"child 1"─● exit
child 2                              └─"child 2"─● exit
```
- **(a)** **4 processes**, because each child calls `exit(0)` and never reaches another `fork`. **4 lines.**
- **(c)** `wait` returns a child's PID three times. The 4th call returns −1, because there are no children left (`ECHILD`, [S16-p15]). So `"parent done"` is **always last**.
- **(b)** The three child lines can come in **any** order, giving 3! = **6 outputs**:

| # | Output | Seen in 400 runs |
|---|---|---|
| 1 | child 0 · child 1 · child 2 · parent done | 398 |
| 2 | child 0 · child 2 · child 1 · parent done | 1 |
| 3 | child 1 · child 0 · child 2 · parent done | 1 |
| 4 | child 1 · child 2 · child 0 · parent done | 0 (legal) |
| 5 | child 2 · child 0 · child 1 · parent done | 0 (legal) |
| 6 | child 2 · child 1 · child 0 · parent done | 0 (legal) |

- **Lesson:** the waits order the parent **after** the children, and never order the children among themselves [S03-p7]. "child 0 first" 398 times out of 400 is the "habit that is not a guarantee".
- **Follow-up:** what if the child had **no** `exit(0)`?
  - The children keep looping and forking, like Program B, so there are 2³ = **8 processes**.
  - Output: "child 0" × 1, "child 1" × 2, "child 2" × 4, and **"parent done" × 8** (every process reaches the end). That is **15 lines**.
  - ✅ Verified (3 runs, each 1/2/4/8).

#### P3 — "New brain, same hands" (fork + execv + waitpid + status macros)
```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
int main() {
    printf("A\n");
    pid_t pid = fork();
    if (pid == 0) {
        char *args[] = {"echo", "B", NULL};
        execv("/bin/echo", args);
        printf("C\n");
        exit(1);
    }
    int status;
    waitpid(pid, &status, 0);
    if (WIFEXITED(status))
        printf("D %d\n", WEXITSTATUS(status));
    return 0;
}
```
**Questions:**
- (a) What is printed? Is any other order possible?
- (b) What is printed if the path is mistyped as `"/bin/ech"`?

**Answer:**
```
parent  ●──"A"──● fork ──────────────────────────● waitpid(pid) ┄┄──"D 0"──●
                  │                                 ┆
child             └──● execv("/bin/echo") ══ now it IS echo: prints "B" ──● exit(0) ┘
                       ("C" is never reached)
```
- **(a)** **2 processes.** Output (only one order is possible): `A` · `B` · `D 0`.
  - `A` is printed before the fork.
  - The parent prints D only after `waitpid` returns, which is after echo has finished.
  - Exec **never returns on success**, so `C` is never printed.
  - echo ends normally with code 0, so `WIFEXITED` is true and `WEXITSTATUS` is 0.
- **(b)** Output: `A` · `C` · `D 1`.
  - exec **fails and returns**, so the failure path runs: it prints `C` and calls `exit(1)`.
  - The parent then sees exit code 1.
- ✅ Both versions verified, with exactly these outputs.

#### P4 — "Ignore, catch twice, then die" (SIG_IGN, a handler, SIG_DFL)
```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
int count = 0;
void handler(int sig) {
    count++;
    printf("caught %d\n", count);
    if (count == 2)
        signal(SIGINT, SIG_DFL);
}
int main() {
    signal(SIGINT, SIG_IGN);
    kill(getpid(), SIGINT);
    printf("ignored\n");
    signal(SIGINT, handler);
    kill(getpid(), SIGINT);
    kill(getpid(), SIGINT);
    printf("still alive\n");
    kill(getpid(), SIGINT);
    printf("last line\n");
    return 0;
}
```
`kill(pid, sig)` is the C form of the `kill -sig pid` command; `kill` is system call 62, "Send signal to process" [S16-p3]. 🔎 Look up in Track B: its exact signature.

**Questions:**
- (a) What is printed?
- (b) How does the process end?

**Answer:**
- **(a)** **1 process.** Output:
```
ignored
caught 1
caught 2
still alive
```
- **(b)** Step by step:
  1. `SIG_IGN` makes the 1st SIGINT do nothing.
  2. The handler is installed.
  3. The 2nd SIGINT prints `caught 1`.
  4. The 3rd SIGINT prints `caught 2`, and the handler restores `SIG_DFL` (this is the slide's comment, "Now that we handled it once, let's restore the DEFAULT behavior").
  5. `still alive` is printed.
  6. The 4th SIGINT takes the **default action: terminate** [S17-p4].
  - So **`last line` is never printed**. The process was killed by signal 2, so a parent's `WIFSIGNALED` would be true [S16-p15].
- ✅ **Verified on a terminal:** exactly these 4 lines, then death by SIGINT (the shell reported status 130).
  - The handler ran *before* `kill()` returned each time, because the process signals itself. 🔎 Look up in Track B: why self-signals are delivered immediately.
- ⚠️ **Style note:** this handler calls `printf`, which is not "safe work" by [S03-p18]. The professor's demo handlers do the same thing, so expect this style on paper; real code would only set a flag.

---

## 6. Likely exam questions (only from these slides)

> These are written in the style of the week-7 workshop: "predict on paper". Try each one before reading the answers below. Every program variant here was ✅ run.

**Q1 — Output prediction.** For the nested-forks program on [S16-p10], answer:
- (a) How many processes exist?
- (b) How many lines are printed?
- (c) List **all** possible outputs.
- (d) Which process prints `L2`?

**Q2 — Process counting.** Answer for this program:
```c
int main() {
    for (int i = 0; i < 4; i++)
        fork();
    printf("hi\n");
}
```
- How many processes exist in total?
- How many are *created* by fork?
- How many `hi` lines are printed?

**Q3 — Process counting.** For the HOMEWORK program on [S16-p9] (three `fork()` calls, then `printf("hello\n")`):
- How many `hello` lines are printed?
- How many children does the **original** process create directly?

**Q4 — Legal or not?** For Program A on [S03-p5] (`A`, fork, `B`, fork, `C`, all with `write`), which of these outputs are legal?
- (i) `A B B C C C C`
- (ii) `A B C C C B C`
- (iii) `A C B B C C C`
- (iv) `A B C B C C C`

**Q5 — Photocopy and dual path.** Take [S16-p8] and **delete the child's `exit(0)`**.
- What lines can now be printed?
- List all possible orders.

**Q6 — wait() ordering.** In Example 1 of [S03-p7]:
- Why is there only one possible output?
- How many outputs would be possible if `wait(NULL)` were deleted?

**Q7 — wait() between children.** In Example 2 of [S03-p7], with the `sleep(1)` deleted:
- Can the parent print "reaped child number 1 first"?
- What single change guarantees that the parent waits for child 0?

**Q8 — Zombie scenario.** A parent forks a child. The child calls `exit(0)` immediately, and the parent then loops forever without ever calling `wait`.
- (a) What is the child now?
- (b) How does it look in `ps`?
- (c) What does it still occupy?
- (d) When does it finally disappear?

**Q9 — Orphan scenario.** A parent exits while its child is still sleeping.
- What does the child's `getppid()` return afterwards?
- Who reaps the child when it ends?
- Which kind of program **must** reap explicitly?

**Q10 — MCQ.** Which call returns **immediately with 0** if the specified child is still running?
- A) `waitpid(pid, &st, 0)`
- B) `waitpid(pid, &st, WNOHANG)`
- C) `waitpid(pid, &st, WUNTRACED)`
- D) `wait(&st)`

Also give the numeric values of `WNOHANG` and `WUNTRACED`.

**Q11 — Status macros.**
- A child calls `exit(3)` and the parent does `waitpid(pid, &status, 0)`. What do `WIFEXITED(status)`, `WEXITSTATUS(status)` and `WIFSIGNALED(status)` give?
- What changes if the child was instead killed with `kill -9`?

**Q12 — Errors.** `waitpid` returned −1.
- What do `ECHILD` and `EINTR` mean?
- How do you check which one happened?

**Q13 — exec behaviour.** Answer for this program:
```c
int main() {
    printf("one\n");
    execl("/bin/echo", "echo", "two", NULL);
    printf("three\n");
    return 0;
}
```
- (a) What appears in a terminal?
- (b) Does `echo` run with a new PID?
- (c) What appears if the path is mistyped as `"/bin/ehco"`?

**Q14 — MCQ (exec).** Which statement is **FALSE**?
- A) exec replaces the code, data, heap and stack.
- B) exec keeps the PID, PPID, open files and cwd.
- C) exec creates a new child process to run the program.
- D) On success exec never returns.

Then answer:
- Which variant takes an **array** *and* searches **PATH**?
- Why must the argument list end with `NULL`?

**Q15 — Signal timing.** For `alarm.c` on [S17-p6]:
- What does it print, and how long does it take?
- What changes if `if (++beeps < 5)` is replaced by `if (beeps++ < 5)`?

**Q16 — signal().** Answer the following:
- What do `signal(SIGINT, SIG_IGN)` and `signal(SIGINT, SIG_DFL)` do?
- What does `signal()` return on success and on error?
- According to the slide, does it set `errno`?
- What inconsistency appears on [S17-p8]?

**Q17 — Handler safety.**
- (a) What work is "safe" inside a handler according to [S03-p18]?
- (b) Name a slide handler that breaks this rule.
- (c) List the four problems with `signal()`.
- (d) Which `sigaction` setting fixes the "no control over syscall restart" problem?

**Q18 — SIGCHLD.**
- Why does `handle_sigchld` use `while` instead of `if`?
- Explain the arguments `-1`, `NULL` and `WNOHANG`.
- Give SIGCHLD's number and default action.
- How does this fix the shell flaw shown on [S17-p2]?

**Q19 — Signals table (matching).** For each of `SIGINT`, `SIGQUIT`, `SIGKILL`, `SIGSEGV`, `SIGTERM`, `SIGSTOP`, `SIGTSTP` and `SIGCHLD`, give its number and its typical source.
- Which signal does a plain `kill PID` send?
- Which key combination sends `SIGQUIT`?

**Q20 — sigaction.** Explain each line of the setup on [S03-p18]:
- `sa.sa_handler = …`
- `sigemptyset(&sa.sa_mask)`
- `sa.sa_flags = SA_RESTART`
- `if (sigaction(SIGINT, &sa, NULL) == -1)`

Also: what are `SA_SIGINFO` and `sa_restorer` for?

### Answers

**A1** [S16-p10; S03-p4; §5 E5]
- (a) **3 processes:** the original plus 2 children.
- (b) **6 lines:** L0, L1, L2, and Bye × 3.
- (c) **5 outputs:**
  1. `L0 L1 Bye L2 Bye Bye`
  2. `L0 L1 Bye Bye L2 Bye`
  3. `L0 Bye L1 L2 Bye Bye`
  4. `L0 L1 L2 Bye Bye Bye`
  5. `L0 Bye L1 Bye L2 Bye`
- (d) The **original (parent)** process prints L2, because `fork() != 0` is true only in the parent. ⚠️ The slide's box labels have this backwards.

**A2** [S03-p6]
- Each pass of the loop doubles the number of processes, so 4 passes give 2⁴ = **16 processes**.
- **15** of them are created by fork.
- Every process prints once: **16 × `hi`**.

**A3** [S16-p9; §5 E4]
- **8 × `hello`** (2³ processes, each printing once).
- The original process creates **3** children directly, one at each fork.

**A4** [S03-p4, p5; §5 E8]
- **(i) and (iv) are legal.**
- (ii) is illegal: three C's before the second B is impossible, because each B unlocks only 2 C's.
- (iii) is illegal: no C can appear before a B.
- (The third legal output is `A B C C B C C`.)

**A5** [S16-p8; S03-p2 Rules 2–3]
- The child prints `child : x=2`. Without `exit(0)` it then falls through to the parent's code and prints `parent: x=1` (its own x goes from 2 to 1).
- The real parent prints `parent: x=0`.
- **3 lines, 3 possible orders** (child's two lines always in that order):
  1. `parent: x=0` · `child : x=2` · `parent: x=1`
  2. `child : x=2` · `parent: x=1` · `parent: x=0`
  3. `child : x=2` · `parent: x=0` · `parent: x=1`
- ✅ All 3 appeared in 300 runs.

**A6** [S03-p7]
- With `wait(NULL)`, the parent is **blocked in wait until the child exits**. So "child…" must come before "parent…", leaving exactly 1 legal order.
- Without the wait, both orders are legal: **2 outputs**.

**A7** [S03-p7; §5 E10]
- **Yes.** `wait()` "returns whoever finishes, not whoever was created". ✅ It happened 5 times in 20 runs on my Mac.
- The change: use **`waitpid(kid[0], &st, 0)`** to name child 0.

**A8** [S16-p13, p16, p17; S03-p3, p8]
- (a) A **zombie**.
- (b) `ps` shows **`Z` in STAT** and **`[defunct]`** next to the command.
- (c) It still occupies **a PID and a process-table slot**, and it holds on to its exit status.
- (d) It stays until the parent exits. Then it is adopted by **PID 1**, which reaps it automatically.

**A9** [S16-p13; S03-p8; §5 E11]
- `getppid()` returns **1**: the child is an orphan, adopted by init (PID 1). ✅ Verified.
- **init reaps it** automatically.
- Explicit reaping matters for **long-running processes** like **shells and servers**.

**A10** [S16-p14]
- **B.**
- `WNOHANG = 1`, `WUNTRACED = 2`, both defined in `<sys/wait.h>`.

**A11** [S16-p15]
- After `exit(3)`:
  - `WIFEXITED` = **true**;
  - `WEXITSTATUS` = **3**;
  - `WIFSIGNALED` = **false**.
- After `kill -9`:
  - `WIFEXITED` = false;
  - `WIFSIGNALED` = **true** ("killed by an uncaught signal");
  - `WEXITSTATUS` must not be used, because it is only valid when `WIFEXITED` is true.
- ✅ Verified (§5 E7).

**A12** [S16-p15]
- **ECHILD:** the caller has no children to wait for.
- **EINTR:** the call was interrupted by a signal before a child terminated.
- To check: `#include <errno.h>` and inspect `errno` after the −1 return. ✅ Both seen (§5 E7, E18).

**A13** [S03-p10, p12]
- (a) `one`, then `two`. `three` is never printed, because exec never returns on success.
- (b) **No.** exec keeps the PID: the same process now runs echo.
- (c) `one`, then `three`. exec failed and returned, so the next line ran (the "failure path").
- ✅ Verified.

**A14** [S03-p10, p11, p12]
- **C is false.** exec "does *not* create a new process; it transforms the existing one".
- **execvp** takes an array (v) and searches PATH (p).
- `NULL` is required because it "marks the end of the argument list".

**A15** [S17-p6; §5 E15]
- `BEEP` × 5, then `BOOM!`, taking about **5 s** (one SIGALRM per second).
- With `beeps++ < 5`, the comparison uses the *old* value, so call 6 is the first to fail. Output: `BEEP` × **6**, then `BOOM!`, in about **6 s**. ✅ Verified.

**A16** [S17-p7, p8; S03-p14]
- `SIG_IGN`: **ignore** SIGINT, so Ctrl-C does nothing.
- `SIG_DFL`: **restore the default** action, so the next Ctrl-C kills the program.
- Return value: the **previous handler** on success; **`SIG_ERR`** on error.
- The slide says signal() **"does not set errno"**.
- Inconsistency: [S17-p8] still prints `strerror(errno)` after `signal()` fails.

**A17** [S03-p18; S17-p4, p5, p8]
- (a) Safe work: **`write`, `_exit`, or setting a flag**.
- (b) `sigint.c`, `multi_signal.c`, `sig2handle.c` and `alarm.c` all call `printf`; `sigint.c` and `alarm.c` also call `exit`.
- (c) The four problems:
  - not portable (BSD vs System V);
  - the handler may reset to default after one delivery;
  - no control over syscall restart;
  - a race: a signal can arrive before the handler is fully installed.
- (d) **`sa.sa_flags = SA_RESTART`** (✅ §5 E18).

**A18** [S03-p17; S17-p2, p3; §5 E17]
- **Why `while`:** POSIX signals are **unqueued**. 5 children dying at once may produce only 1 SIGCHLD, so you must loop until no finished child is left.
- **The arguments:**
  - `-1` = any child;
  - `NULL` = ignore the exit status;
  - `WNOHANG` = return immediately without blocking.
- **Number and default:** 17 (Linux x86-64), default action **Ignore**.
- **The shell flaw:** background jobs are never `waitpid`ed. A SIGCHLD handler lets the kernel's "your child died" notification trigger the reaping.

**A19** [S03-p16; S17-p8]
- `SIGINT` 2 — Ctrl-C
- `SIGQUIT` 3 — Ctrl-\
- `SIGKILL` 9 — `kill -9`
- `SIGSEGV` 11 — invalid memory access
- `SIGTERM` 15 — `kill` (default)
- `SIGSTOP` 19 — `kill -STOP`
- `SIGTSTP` 20 — Ctrl-Z
- `SIGCHLD` 17 — child stopped or exited
- A plain `kill PID` sends **SIGTERM**. Ctrl-\ sends **SIGQUIT**. (⚠️ [S17-p8] misspells SIGTSTP as "SIGSTP".)

**A20** [S03-p18, p19]
- `sa_handler` chooses the handler function (or `SIG_DFL`/`SIG_IGN`).
- `sigemptyset(&sa.sa_mask)` empties the mask: **no extra signals are blocked during the handler**.
- `SA_RESTART` makes interrupted system calls such as `read`/`write` **restart automatically**.
- `sigaction(SIGINT, &sa, NULL)` installs the settings for SIGINT. `NULL` means the old settings are not saved, and a −1 return means failure, which is handled with `exit(1)`.
- `SA_SIGINFO` makes the kernel use the `sa_sigaction` handler, which receives extra info about the signal.
- `sa_restorer` is "obsolete, not used".

---

## 7. Self-check

- [ ] **I can** explain **program vs process**, and the two illusions the kernel gives every process: logical control flow (via context switching) and a private address space (via virtual memory) [S16-p3, p4].
- [ ] **I can** state fork()'s **three return values** and **The Three Rules** (Starting Line, Photocopy, Dual Path), and use them to explain why [S16-p8] prints x=2 in the child and x=0 in the parent [S16-p6–p8; S03-p2].
- [ ] **I can** draw a **process graph** for a short fork program (horizontal = process, vertical = fork, dashed = wait) and list **all** of its topological orders. Examples: the **5** outputs of [S16-p10], the **3** of Program A, the **6** of Program C Example 2 [S03-p4–p7].
- [ ] **I can** count processes for straight-line forks and for fork-in-a-loop (**2ⁿ**), and say who creates whom [S16-p9; S03-p6].
- [ ] **I can** explain what `wait()` adds to a graph and why it orders "me vs **one** child" but **never** child vs child. I can also use `waitpid(kid[0], &st, 0)` to wait for a specific child [S03-p3, p7].
- [ ] **I can** define **zombie** and **orphan**: who died first, what a zombie still holds (a PID and a process-table slot), how `ps` shows it (`Z`, `[defunct]`), and who reaps an orphan (PID 1) [S16-p13, p16, p17; S03-p8].
- [ ] **I can** use `waitpid`'s three arguments (`pid` > 0 or −1; options `0`, `WNOHANG` = 1, `WUNTRACED` = 2), decode the status with `WIFEXITED`/`WEXITSTATUS`/`WIFSIGNALED`, and explain `ECHILD` and `EINTR` [S16-p13–p15].
- [ ] **I can** explain **exec** (it replaces code/data/heap/stack, keeps PID/PPID/open files/cwd, and never returns on success), decode the **l / v / p** naming, and write correct `execlp`, `execv` and `execl` calls with `argv[0]` and the `NULL` terminator [S03-p9–p12].
- [ ] **I can** define a **signal**, give the 8 table signals with their **Linux numbers and sources**, say what `SIG_IGN`/`SIG_DFL`/`&handler` do, describe **Installing → Catching → Handling → Return**, and trace `alarm.c` second by second [S17-p3–p8; S03-p13–p16].
- [ ] **I can** explain **SIGCHLD** (17, default Ignore) and why its handler needs a `while` loop (unqueued signals). I can also give the 4 problems with `signal()`, the `struct sigaction` fields (`sa_handler`, `sa_mask`, `sa_flags`), what `SA_RESTART`/`SA_SIGINFO` do, and the "**safe work only: write, _exit, or set a flag**" rule [S03-p17–p19].
