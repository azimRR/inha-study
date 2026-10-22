# Hand-Drawn Traces Win the SOC3010 Midterm

The first half of SOC3010 rewards one skill above all others: drawing the right small picture of system state and explaining it aloud, and outside sources teach five such pictures more precisely than any slide deck can. The **process graph** gives, through its topological sorts, exactly the legal outputs of a fork program; the **three-table file-descriptor model** with reference counts decides every pipe EOF, every SIGPIPE and every leaked server connection; the **pending and blocked signal bitmasks** explain why signals merge and why a SIGCHLD handler must loop; the **Gantt chart** needs its tie-breaking conventions written on top; and the **semaphore trace table** needs a value column and a wait-queue column. OSTEP, the course textbook, explains fork, exec, wait, scheduling and semaphores well, but covers signals only briefly before telling readers to "read elsewhere" ([OSTEP ch. 5](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf)), so most of what the signal, IPC and classical-problem questions need comes from the CMU 15-213 slides, the man7.org Linux man pages, Kerrisk's IPC overview, Beej's guides and Downey's *Little Book of Semaphores*. The second skill is knowing where reputable sources disagree: on whether a semaphore value can go negative, on which job goes first when a Round Robin arrival lands at the instant a time slice ends (a choice that moves average turnaround from 10.6 to 11.6 on the same workload), on which priority number counts as high, and on how MLFQ queues are numbered, while exams assume Linux and macOS breaks several Linux rules. Because grades depend on explaining code orally, every drill should end with a spoken answer to "which processes exist at this line, and what does each copy hold?" With the midterm on 26–30 October, the seven days from Monday 19 to Sunday 25 October allow one topic per day, starting with process graphs, pipes and signals so that this week's workshop doubles as a rehearsal, and every answer should be checked with free simulators rather than single test runs.

## Fork puzzles are topological sorts plus buffer bookkeeping

`fork()` is called once and returns twice: **0 in the child and the child's PID in the parent, or −1 with no child created on failure** ([fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)). The child gets its own copy of memory, so a later `x++` in one process is invisible to the other, but every inherited descriptor refers to the **same open file description**, so both processes share the file offset ([fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)). Which process runs next is unpredictable ([TLPI ch. 24](https://man7.org/tlpi/download/TLPI-24-Process_Creation.pdf)). The notes include local tests compiled and run on macOS 27 with Apple clang, many of them saved in the notes folder's script directories; in those tests the parent printed first in 148 of 150 runs, which is exactly why a single run tells you nothing about which outputs are *possible*.

The technique that turns fork questions into marks comes from CMU 15-213, not OSTEP. Draw a **process graph** in which each vertex is a statement and each edge means "happens before", then list its topological sorts (orderings that keep every edge pointing forward), because "any topological sort of the graph corresponds to a feasible total ordering" ([CMU 15-213 L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf)). A `wait` adds one more edge, from the child's exit to the statement after the parent's `wait`, and that edge removes orderings.

### Worked example: enumerating CMU's fork2

```c
printf("L0\n"); fork(); printf("L1\n"); fork(); printf("Bye\n");
```

```
P    : L0 --fork--+-- L1 --fork--+-- Bye
                  |              +-- C2  : Bye
                  +-- C1  : L1 --fork--+-- Bye
                                       +-- C1.1: Bye
```

Four processes print seven lines under two constraints: L0 comes before both L1s, and each L1 comes before the two Byes in its own subtree. Identical labels look the same in the output, so only **three distinct outputs** remain: `L0 L1 L1 Bye Bye Bye Bye`, `L0 L1 Bye L1 Bye Bye Bye` and `L0 L1 Bye Bye L1 Bye Bye`. `L0 Bye L1 …` is impossible because every Bye follows some L1, and `L0 L1 Bye Bye Bye L1 …` is impossible because only two Byes depend on the first L1 ([CMU 15-213 L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf)). The same method handles `wait`. In the program below the child prints `1 4` and the parent prints `2`, waits, then prints `3 4`, so the only possible outputs are `1 2 4 3 4`, `1 4 2 3 4` and `2 1 4 3 4`. An exhaustive enumerator (`forkenum.py` in the notes folder) confirmed both output sets, and every observed run fell inside them.

```c
pid = fork();
if (pid == 0) printf("1\n");
else { printf("2\n"); wait(NULL); printf("3\n"); }
printf("4\n");
```

Counting follows from the graph. **n unconditional forks in sequence produce 2^n processes**, so three forks give 1 + 3 + 3 + 1 = 8. A `printf` inside the loop, as in `for (i = 0; i < n; i++) { fork(); printf("%d\n", i); }`, prints 2^(n+1) − 2 lines: 14 lines for n = 3, which can appear in 279 distinct orders, governed by the rule that in every prefix of the output the number of 1s is at most twice the number of 0s and the number of 2s at most twice the number of 1s. Short-circuit operators prune branches, as the table shows (each count was confirmed by running the code). In a three-iteration loop, `if (fork() == 0) break;` builds a **fan** (one parent with three children that share a PPID), while `if (fork() != 0) break;` builds a **chain**; both produce four processes.

| Code | Processes |
|---|---|
| `fork() \|\| fork()` | 3 |
| `fork() && fork() \|\| fork()` | 5 |
| `if (fork() \|\| fork()) fork()` | 5 |
| `if (fork() && fork()) fork()` | 4 |

### The stdio buffer, not the printf call, decides what prints

Counting `printf` calls instead of buffer copies is the classic lost mark. stdout is **line-buffered on a terminal and block-buffered when redirected to a file or pipe**, while stderr is unbuffered ([setbuf(3)](https://man7.org/linux/man-pages/man3/setbuf.3.html)); `exit()` flushes stdio buffers but `_exit()` does not ([exit(3)](https://man7.org/linux/man-pages/man3/exit.3.html); [_exit(2)](https://man7.org/linux/man-pages/man2/_exit.2.html)); exec replaces all of the process's memory, buffer included ([execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html)); and fork copies all of it, buffer included. In one sentence: **fork copies the buffer, exec destroys it, `_exit` discards it, and `exit` or returning from `main` flushes it**. The outputs below were measured locally on a terminal and through a pipe.

| Fragment | Terminal | Pipe or file | Reason |
|---|---|---|---|
| `printf("A"); fork();`, then both processes end normally | `A` twice | `A` twice | the unflushed "A" is copied into the child |
| `printf("hello\n"); fork();` | `hello` once | `hello` **twice** | with block buffering, "hello\n" is still unflushed at fork |
| `for (i=0;i<2;i++){ fork(); printf("-"); }` | 8 dashes | 8 dashes | four processes each flush "--" |
| the same loop with `"-\n"` | 6 lines | 8 lines | a newline flushes only on a terminal |
| `printf("X"); if (fork()==0) _exit(0); wait(NULL); printf("Y\n");` | `XY` | `XY` | `_exit` discards the child's copy; `exit(0)` would print `XXY` |
| `printf("A ");` then a child runs `execlp("echo","echo","B",(char*)NULL)` while the parent calls `wait` and `printf("D\n")` | `B`, then `A D` | same | exec destroyed the child's copy of "A " |

In real code the fixes are `fflush(stdout)` before `fork()` and `_exit()` rather than `exit()` in a child that does not exec, because `exit` in a child flushes the duplicated buffers and runs the parent's `atexit` handlers a second time ([vfork(2)](https://man7.org/linux/man-pages/man2/vfork.2.html); [TLPI ch. 24](https://man7.org/tlpi/download/TLPI-24-Process_Creation.pdf)).

### Exec keeps the process and replaces the program

"Exec keeps the process and replaces the program" is the phrase to say aloud. Everything the kernel holds about the process survives `execve`: the PID, PPID, process group and session ([credentials(7)](https://man7.org/linux/man-pages/man7/credentials.7.html)), open descriptors not marked close-on-exec, the signal mask and pending set, signals set to ignore (`SIG_IGN`), and a pending `alarm` ([execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html); [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html); [alarm(2)](https://man7.org/linux/man-pages/man2/alarm.2.html)). Everything in the program's own memory disappears: variables, heap, stdio buffers, `atexit` handlers and memory mappings. **Signal handlers are reset to the default action**, because a handler is an address in the old program's code and that code no longer exists, whereas `SIG_IGN` and `SIG_DFL` contain no address and survive ([execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html)). A successful exec never returns, so code after it runs only on failure and should report the error and call `_exit(127)`. The letters in the exec family name encode the interface ([exec(3)](https://man7.org/linux/man-pages/man3/exec.3.html)).

| Letter | Meaning |
|---|---|
| l | arguments as a list ending in `(char *) NULL` |
| v | arguments as an array |
| p | search `PATH` for the program |
| e | pass an explicit environment |

OSTEP explains why fork and exec are separate calls: the shell runs code in the child **between** them. For `wc p3.c > newfile.txt`, the child closes stdout and opens `newfile.txt` before exec, which works because a new descriptor takes the lowest free number (here 1, just freed) and open descriptors survive exec ([OSTEP ch. 5](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf)).

### Zombies are dead but unreaped; orphans have lost their parent

`wait(&s)` is exactly `waitpid(-1, &s, 0)`; with the `WNOHANG` flag, `waitpid` returns 0 immediately if children exist but none has finished; and the status macros (`WIFEXITED`, `WEXITSTATUS` and the rest) take the integer itself, not a pointer to it ([wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)). Only the low 8 bits of an exit code reach the parent, so `exit(300)` reads as **44** and `exit(-1)` as **255** ([_exit(2)](https://man7.org/linux/man-pages/man2/_exit.2.html); [POSIX.1-2024 §2.8.2](https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html#tag_19_08_02)). A **zombie** is a child that has terminated but has not yet been waited for ("reaped"); it holds a process-table slot until reaped ([wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)), and `ps` shows it as `<defunct>` ([CMU 15-213 L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf)). A zombie cannot be killed because it is already dead; the cure is a `wait` in the parent, or killing the parent so the zombie is adopted and reaped. An **orphan** is a child whose parent has died; it is re-parented to init (PID 1) or, on Linux, to the nearest ancestor marked as a "subreaper", which then reaps it ([wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html); [PR_SET_CHILD_SUBREAPER(2const)](https://man7.org/linux/man-pages/man2/PR_SET_CHILD_SUBREAPER.2const.html)). Setting SIGCHLD to `SIG_IGN` (or using the `SA_NOCLDWAIT` flag) prevents zombies entirely, after which `wait` blocks until every child ends and then fails with `ECHILD` ([wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)). PID 1 receives only the signals it has installed handlers for, which is why a simple program running as PID 1 in a container ignores SIGTERM and why Docker offers `--init` ([kill(2)](https://man7.org/linux/man-pages/man2/kill.2.html); [Docker run reference](https://docs.docker.com/reference/cli/docker/container/run/)).

### Practice: processes, fork and exec

| # | Question | Answer |
|---|---|---|
| 1 | How many processes exist after `fork(); fork(); fork();`? | 8 in total, 7 newly created |
| 2 | `for (i=0;i<4;i++){ fork(); printf("x\n"); }` on a terminal: how many lines and processes? | 30 lines (2 + 4 + 8 + 16) and 16 processes |
| 3 | Process counts for `fork() \|\| fork();`, `fork() && fork() \|\| fork();`, `if (fork() \|\| fork()) fork();` and `if (fork() && fork()) fork();` | 3, 5, 5 and 4 |
| 4 | All outputs of `printf("a\n"); if (fork()==0){ printf("b\n"); exit(0); } printf("c\n"); wait(NULL); printf("d\n");` What changes without the `wait`? | `a b c d` and `a c b d`; without `wait`, `a c d b` is also possible |
| 5 | `printf("start\n"); fork(); printf("end\n");` on a terminal versus `./prog > out.txt`? | Terminal: `start end end`. File: the block `start end` written twice |
| 6 | Which survive `execve`: the PID; a SIGINT handler; SIGINT set to SIG_IGN; the signal mask; an FD_CLOEXEC descriptor; an ordinary descriptor; unflushed printf data; a pending alarm; atexit handlers? | Yes; no (reset to default); yes; yes; no; yes; no (lost); yes; no |
| 7 | One child calls `exit(258)` and another `exit(-1)`. What do `WEXITSTATUS` and bash's `$?` show? | 2 and 2; 255 and 255 |
| 8 | Why are fork and exec separate system calls? | So the shell can run code in the child between them (redirect descriptors, build pipes, change process group) without modifying the program it runs |

Answers 1–7 were checked by running the code or by exhaustive enumeration; they follow [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html), [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html), [setbuf(3)](https://man7.org/linux/man-pages/man3/setbuf.3.html), [execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html) and [OSTEP ch. 5](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf).

## Signals are pending bits, so a SIGCHLD handler must loop

OSTEP introduces signals only briefly, with Ctrl-C sending SIGINT and Ctrl-Z sending SIGTSTP, and then tells readers to "read elsewhere" to learn about "signals and their many intricacies" ([OSTEP ch. 5](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf)), so this part of the midterm depends on outside material. The model to draw is CMU's: for each process the kernel keeps two bit vectors, **pending** (signals sent but not yet received) and **blocked** (the signal mask); sending a signal sets its pending bit, and on the process's next return to user mode the kernel computes `pending & ~blocked` and makes the process receive each set bit, lowest-numbered first in CMU's model ([CMU 15-213 L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)). Linux leaves the delivery order of several pending standard signals unspecified ([signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)). Because there is one bit per signal type, "**standard signals do not queue**": a signal sent several times while blocked is delivered once ([signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)), and, in CMU's words, "you can't use signals to count events" ([CMU 15-213 L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)). Local tests made this concrete. A child that sent SIGUSR1 to its parent five times produced handler counts of 1 in 286 of 300 runs, 2 in 13 and 3 in one, never 5, and blocking SIGINT, raising it three times and then unblocking it ran the handler exactly once. **SIGKILL and SIGSTOP can never be caught, blocked or ignored** ([signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)); SIGTSTP, which Ctrl-Z sends, can be.

Install handlers with `sigaction`, whose `sa_mask` field lists extra signals to block while the handler runs (the signal being handled is blocked automatically unless `SA_NODEFER` is set) and whose flags control restart and child behaviour ([sigaction(2)](https://man7.org/linux/man-pages/man2/sigaction.2.html)).

| Flag | Effect |
|---|---|
| `SA_RESTART` | restart slow system calls the handler interrupted |
| `SA_SIGINFO` | use a three-argument handler that receives `si_pid` and `si_status` |
| `SA_NOCLDSTOP` | no SIGCHLD when a child merely stops |
| `SA_NOCLDWAIT` | children do not become zombies |

Avoid `signal()` in portable code. The Linux `signal` system call gives System V semantics (the handler resets to the default after one use, and the signal is not blocked while it runs), but glibc's `signal()` wrapper calls `sigaction` with BSD semantics, including `SA_RESTART` ([signal(2)](https://man7.org/linux/man-pages/man2/signal.2.html)); macOS behaved like BSD in local tests. `sigprocmask` adds signals to the blocked set (`SIG_BLOCK`), removes them (`SIG_UNBLOCK`) or replaces the whole set (`SIG_SETMASK`), and can return the old mask ([sigprocmask(2)](https://man7.org/linux/man-pages/man2/sigprocmask.2.html)).

Two race conditions recur in exam code. Suppose a shell's SIGCHLD handler deletes a job from the job list: the child might exit and the handler run before the parent has even added that job, so CMU blocks SIGCHLD before `fork`, unblocks it in the child before `execve`, and restores the parent's mask only after `addjob` ([CMU 15-213 L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)). Separately, `while (!flag) pause();` loses a signal that arrives between the test and `pause` and then sleeps forever; `sigsuspend` fixes this by swapping in a new mask and sleeping as one atomic step ([sigsuspend(2)](https://man7.org/linux/man-pages/man2/sigsuspend.2.html)).

### Worked example: the SIGCHLD handler you should be able to explain line by line

```c
static volatile sig_atomic_t children_done = 0;     /* G5: a flag that is only assigned       */
static void sigchld_handler(int sig) {
    int saved_errno = errno;                         /* G2: save errno                          */
    while (waitpid(-1, NULL, WNOHANG) > 0)           /* reap EVERY finished child, never block  */
        children_done = 1;                           /* G1: no printf, malloc or exit in here   */
    errno = saved_errno;                             /* G2: restore errno                       */
}
/* install with sigaction: sa_mask empty (SIGCHLD itself is blocked automatically),
   sa_flags = SA_RESTART | SA_NOCLDSTOP */
```

The loop exists for two separate reasons, and an oral answer should state both. First, signals merge, so one SIGCHLD can stand for many dead children: in a local test with SIGCHLD blocked while 10 children exited, a handler that called `wait` once reaped **1 child and left 9 zombies**, while the loop reaped **all 10**. Second, other children may still be running, so `WNOHANG` makes `waitpid` return 0 instead of blocking inside the handler ([wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)). The other lines follow CMU's handler guidelines G0–G5: keep handlers simple, call only async-signal-safe functions, save and restore `errno`, and communicate through `volatile sig_atomic_t` flags ([CMU 15-213 L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)). An async-signal-safe function is one that is safe to call from inside a handler: `write`, `_exit`, `waitpid` and `kill` are; `printf`, `sprintf`, `malloc` and `exit` are not ([signal-safety(7)](https://man7.org/linux/man-pages/man7/signal-safety.7.html)). One fact has changed since the 2015 CMU slides: POSIX.1-2024 no longer requires `fork()` to be async-signal-safe and adds `_Fork()` instead ([POSIX.1-2024 _Fork](https://pubs.opengroup.org/onlinepubs/9799919799/functions/_Fork.html)).

Interrupted system calls follow fixed rules on Linux ([signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)). Local tests confirmed both sides of the table: a `read` on an empty pipe interrupted by SIGALRM returned −1 with `EINTR` without `SA_RESTART` and kept waiting until data arrived with it, while `sleep(10)` interrupted after about 3 s returned 7 even with `SA_RESTART`.

| Call | Without `SA_RESTART` | With `SA_RESTART` |
|---|---|---|
| blocked `read`/`write` on a terminal, pipe or socket; a FIFO `open` waiting for the other end; `wait`/`waitpid`; `sem_wait` | fails with `EINTR` | restarted |
| `pause`, `sigsuspend`, `select`, `poll`, `nanosleep` | fails with `EINTR` | **never restarted**: still fails with `EINTR` |
| `sleep` | returns the seconds left | returns the seconds left |

### The shell is fork, exec, wait and process groups

`$?` is the exit status as the shell reports it ([Bash manual §3.7.5](https://tiswww.case.edu/php/chet/bash/bashref.html#Exit-Status)), so 130 means Ctrl-C (SIGINT), 137 means `kill -9`, 139 a segmentation fault, 141 SIGPIPE and 143 SIGTERM; locally, `yes | head -1` left `PIPESTATUS` at `141 0`. A pipeline's status is that of its last command unless `pipefail` is set, and each member of a multi-command pipeline runs in its own subshell ([Bash §3.2.3](https://tiswww.case.edu/php/chet/bash/bashref.html#Pipelines)). A subshell is a forked copy of the shell, so `x=1; (x=2); echo $x` prints 1 ([Bash §3.7.3](https://tiswww.case.edu/php/chet/bash/bashref.html#Command-Execution-Environment)).

| `$?` | Meaning |
|---|---|
| 0 | success |
| 1 | general failure |
| 2 | misuse of a builtin |
| 126 | command found but not executable |
| 127 | command not found |
| 128 + n | killed by signal n |

Job control is built on process groups and sessions. The shell puts each pipeline in its own process group, and a terminal has at most one foreground group: only that group receives keyboard signals and may read from the terminal, and a background job that tries to read is sent SIGTTIN, which stops it ([credentials(7)](https://man7.org/linux/man-pages/man7/credentials.7.html)). Ctrl-C and Ctrl-Z send SIGINT and SIGTSTP to **every process in the foreground process group** ([CMU 15-213 L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)). The interactive shell survives Ctrl-C because it sits in a different process group; with job control on, it also ignores SIGTSTP, SIGTTIN and SIGTTOU and catches SIGINT itself ([Bash §3.7.6](https://tiswww.case.edu/php/chet/bash/bashref.html#Signals)). The table shows what each step sends when you type `sleep 100`, then Ctrl-Z, `bg` and `kill %1` ([Bash §7.1](https://tiswww.case.edu/php/chet/bash/bashref.html#Job-Control-Basics)).

| You type | Signal sent | To whom |
|---|---|---|
| Ctrl-Z | SIGTSTP | `sleep`'s process group, which stops |
| `bg` | SIGCONT | the same group, which resumes in the background |
| `kill %1` | SIGTERM | the job |

`trap` follows the same rule as exec: a signal ignored with `trap '' INT` stays ignored in the commands the shell runs, while a signal caught with `trap 'echo hi' INT` is reset to the default in children ([Bash §4.1](https://tiswww.case.edu/php/chet/bash/bashref.html#Bourne-Shell-Builtins)). Classic daemons fork twice. The first fork produces a child that is not a process-group leader, which `setsid()` requires; `setsid()` then starts a new session and detaches from the terminal; and the second fork ensures the daemon can never acquire a controlling terminal again and, once the intermediate parent exits, leaves it re-parented to init ([daemon(7)](https://man7.org/linux/man-pages/man7/daemon.7.html); [setsid(2)](https://man7.org/linux/man-pages/man2/setsid.2.html)). The mapping from shell syntax to system calls is worth memorizing as a table.

| Shell construct | What the shell does in system calls |
|---|---|
| `cmd &` | fork without waiting; `$!` is the child's PID |
| `wait` | `waitpid` |
| `$?` | `WEXITSTATUS`, or 128 + `WTERMSIG` |
| `( … )` | fork with no exec |
| `exec cmd` | exec with no fork |
| `cmd > f` | fork; in the child, open `f` and `dup2` it onto fd 1; exec |
| `a \| b` | pipe; fork twice; `dup2` the write end onto fd 1 in `a` and the read end onto fd 0 in `b`; close every pipe descriptor; exec |

### Practice: signals and the shell

| # | Question | Answer |
|---|---|---|
| 1 | SIGUSR1 is blocked, arrives three times, then is unblocked. How many times does the handler run? | Once, because only one instance is marked pending |
| 2 | A SIGCHLD handler calls `wait(NULL)` once and five children exit together. How many zombies can remain, and what is the fix? | Between 0 and 4; loop on `waitpid(-1, &st, WNOHANG) > 0` and save and restore `errno` |
| 3 | What is wrong with `int count; void h(int s){ printf("caught\n"); count++; }`? | `printf` is not async-signal-safe (use `write`); the shared variable should be a `volatile sig_atomic_t` flag that is only assigned; `errno` is not saved |
| 4 | A SIGALRM handler interrupts `read()` on an empty pipe. What happens without and with `SA_RESTART`? What does `sleep(10)` return if interrupted after 3 s? | −1 with `EINTR`; the read restarts and keeps waiting; 7 |
| 5 | What do `kill(0, SIGTERM)`, `kill(-1, SIGTERM)`, `kill(-1234, SIGTERM)` and `kill(pid, 0)` do? | Signal the caller's process group; every process the caller may signal except PID 1; process group 1234; nothing, only an existence and permission check |
| 6 | What do `$?` values 127, 126, 130, 137, 139, 141 and 143 mean? | Not found, not executable, SIGINT, SIGKILL, SIGSEGV, SIGPIPE, SIGTERM |
| 7 | `trap '' INT; ./job` versus `trap 'echo hi' INT; ./job`: does Ctrl-C kill `./job`? | No, because ignore is inherited; yes, because caught traps are reset in children |
| 8 | Why doesn't Ctrl-C kill the interactive shell while a foreground job runs? | Only the job's process group receives the keyboard signal, and the shell handles SIGINT itself anyway |

Answers follow [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html), [kill(2)](https://man7.org/linux/man-pages/man2/kill.2.html), [signal-safety(7)](https://man7.org/linux/man-pages/man7/signal-safety.7.html), [Bash §3.7.5](https://tiswww.case.edu/php/chet/bash/bashref.html#Exit-Status) and [Bash §4.1](https://tiswww.case.edu/php/chet/bash/bashref.html#Bourne-Shell-Builtins); answers 1, 2 and 4 were reproduced in local tests.

## Gantt charts are mechanical once the conventions are written down

OSTEP defines **turnaround = completion − arrival** and **response = first run − arrival** ([OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)); waiting time is the time spent in the ready queue ([OSC10 ch. 5 slides](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)), which for CPU-only jobs equals turnaround − burst. Two self-checks catch common arithmetic slips: under any non-preemptive policy response time equals waiting time, because a job waits once and then runs to completion, and averages divide by the number of jobs, not by the length of the schedule. Utilization counts idle gaps and context-switch time as not busy, so FCFS on X(0,3), Y(1,2), Z(9,2), which leaves the CPU idle from 5 to 9, gives 7/11 = 63.6% utilization and a throughput of 3/11 jobs per unit time. OSTEP states the central trade-off: SJF and STCF give the best turnaround but hurt response, while RR gives the best response at the cost of turnaround ([OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)). If an oral question asks how the OS takes the CPU back from a process that never makes a system call, the answer is the **timer interrupt**, which the kernel starts at boot; a purely cooperative OS has no recourse but a reboot ([OSTEP ch. 6](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf)).

Each policy has one fact examiners probe. **FCFS** suffers the **convoy effect**, short jobs stuck behind a long one: with A = 100, B = 10 and C = 10 arriving together, average turnaround is 110 under FCFS against 50 under SJF ([OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)). **SJF** is non-preemptive in OSTEP's definition and gives the best average turnaround only when every job arrives at once, whereas **STCF**, which Silberschatz calls **SRTF**, compares each newcomer's burst with the running job's **remaining** time, runs the shorter, and is optimal when arrival times differ ([OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf); [OSC10 ch. 5 slides](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)). **RR** runs each job for at most one quantum q per turn, so no job waits more than (n − 1)q, but its turnaround is "nearly pessimal", a very large quantum turns it into FCFS, and Silberschatz's rule of thumb is that 80% of CPU bursts should be shorter than q ([OSC10 ch. 5 slides](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx); [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)). **Priority** scheduling starves low-priority jobs unless **aging** raises their priority as they wait ([OSC10 ch. 5 slides](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)). Context-switch overhead in steady state is s/(q + s) for switch cost s: 9.1% at q = 10 ms and s = 1 ms, which OSTEP rounds to "roughly 10%", and under 1% at q = 100 ms ([OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)).

### Worked example: one workload under seven policies

This workload (W1) comes from the scheduling notes, and every chart below was reproduced with the notes' simulator. Priority 1 is the highest; AF and PF are the two Round Robin tie rules explained after the tables.

| Job | Arrival | Burst | Priority |
|---|---|---|---|
| A | 0 | 7 | 3 |
| B | 2 | 4 | 1 |
| C | 4 | 1 | 4 |
| D | 5 | 4 | 2 |
| E | 6 | 3 | 5 |

```
FCFS          | A  | B  | C  | D  | E  |
              0    7    11   12   16   19
SJF           | A  | C  | E  | B  | D  |                       (non-preemptive)
              0    7    8    11   15   19
SRTF / STCF   | A  | B  | C  | B  | E  | D  | A  |
              0    2    4    5    7    10   14   19
RR q=2 (AF)   | A  | B  | A  | C  | B  | D  | E  | A  | D  | E  | A  |
              0    2    4    6    7    9    11   13   15   17   18   19
RR q=2 (PF)   | A  | B  | A  | C  | D  | B  | E  | A  | D  | E  |      (A's first block is two quanta)
              0    4    6    8    9    11   13   15   16   18   19
Priority NP   | A  | B  | D  | C  | E  |
              0    7    11   15   16   19
Priority P    | A  | B  | D  | A  | C  | E  |
              0    2    6    10   15   16   19
```

| Policy | Avg turnaround | Avg waiting | Avg response |
|---|---|---|---|
| FCFS | 9.6 | 5.8 | 5.8 |
| SJF (non-preemptive) | 8.6 | 4.8 | 4.8 |
| SRTF / STCF | **7.6** | **3.8** | **1.2** |
| RR q = 2, arrival-first (AF) | 10.6 | 6.8 | 2.2 |
| RR q = 2, preempted-first (PF) | 11.6 | 7.8 | 3.4 |
| Priority, non-preemptive | 10.2 | 6.4 | 6.4 |
| Priority, preemptive | 9.8 | 6.0 | 4.4 |

The charts encode the traps. SJF and non-preemptive priority must run A first, because A is the only job present at t = 0. SRTF compares remaining times at each arrival: at t = 2, B's 4 beats A's remaining 5, so B preempts A; at t = 4, C's 1 beats B's remaining 2; and at t = 6, E's 3 does not beat B's remaining 1, so B continues. The per-job SRTF table shows how each column is computed.

| Job | Arrival | Burst | First run | Completion | TAT = CT − AT | WT = TAT − BT | RT = first − AT |
|---|---|---|---|---|---|---|---|
| A | 0 | 7 | 0 | 19 | 19 | 12 | 0 |
| B | 2 | 4 | 2 | 7 | 5 | 1 | 0 |
| C | 4 | 1 | 4 | 5 | 1 | 0 | 0 |
| D | 5 | 4 | 10 | 14 | 9 | 5 | 5 |
| E | 6 | 3 | 7 | 10 | 4 | 1 | 1 |

Round Robin is where conventions bite. At t = 2, 4 and 6 a job arrives at the exact moment the running job's quantum expires, and sources disagree about which of the two joins the queue first. **Arrival-first** puts the newcomer ahead of the preempted job, as GeeksforGeeks' code and the online Process Scheduling Solver do ([GeeksforGeeks](https://www.geeksforgeeks.org/operating-systems/round-robin-scheduling-with-different-arrival-times/); [solver rr.ts](https://raw.githubusercontent.com/boonsuen/process-scheduling-solver/HEAD/src/algorithms/rr.ts)); **preempted-first** puts the preempted job ahead, as OSTEP's `mlfq.py` simulator does when run with one queue ([mlfq.py source](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched-mlfq/mlfq.py)). With the same jobs and the same quantum, average turnaround moves from 10.6 to 11.6. The arrival-first queue trace is the format to reproduce on paper.

```
t= 0  dispatch A (7 left)                       queue []
t= 2  B arrives, A expires -> [B, A]            dispatch B, queue [A]
t= 4  C arrives, B expires -> [A, C, B]         dispatch A, queue [C, B]
t= 5  D arrives                                 queue [C, B, D]
t= 6  E arrives, A expires -> [C, B, D, E, A]   dispatch C
t= 7  C finishes after 1 unit (an early finisher frees the CPU at once); dispatch B (2 left)
t= 9  B finishes; dispatch D         t=11  D expires -> [E, A, D]; dispatch E
t=13  E expires -> [A, D, E]; dispatch A         t=15  A expires -> [D, E, A]
t=15..19  D finishes at 17, E at 18, A at 19
```

Running the same workload with other quanta teaches two more lessons: average response time rises with q, and **average turnaround does not move steadily in one direction as q grows** (12.6 at q = 3 but 9.4 at q = 4), matching Silberschatz's slide that turnaround "varies with the time quantum" ([OSC10 ch. 5 slides](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)). Once q reaches the longest burst (7), RR behaves exactly like FCFS.

| q | AF avg TAT | AF avg WT | AF avg RT | PF avg TAT | PF avg WT | PF avg RT |
|---|---|---|---|---|---|---|
| 1 | 11.2 | 7.4 | 1.2 | 11.4 | 7.6 | 2.0 |
| 2 | 10.6 | 6.8 | 2.2 | 11.6 | 7.8 | 3.4 |
| 3 | 12.6 | 8.8 | 3.6 | 12.2 | 8.4 | 3.8 |
| 4 | 9.4 | 5.6 | 4.6 | 9.8 | 6.0 | 5.2 |
| 5 | 10.2 | 6.4 | 4.6 | 9.8 | 6.0 | 5.0 |
| 6 | 11.2 | 7.4 | 5.0 | 10.8 | 7.0 | 5.2 |
| ≥ 7 | 9.6 | 5.8 | 5.8 | 9.6 | 5.8 | 5.8 |

### MLFQ: Rule 4 stops gaming, Rule 5 stops starvation

MLFQ (multi-level feedback queue) keeps several queues at different priorities, and OSTEP's final rules are that a higher-priority job runs before a lower one (Rule 1), equal priorities run round-robin with that queue's quantum (Rule 2), new jobs enter the top queue (Rule 3), a job that uses up its time allotment at a level moves down one queue **regardless of how many times it gave up the CPU** (Rule 4), and after a period S every job moves back to the top (Rule 5, the priority boost) ([OSTEP ch. 8](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf)). Rules 4 and 5 fix different problems. The older version of Rule 4 let a job keep its level if it gave up the CPU before its slice ended, so a program could run for 99% of the slice, issue an I/O request and stay at the top forever; the new Rule 4 closes that **gaming** hole, while Rule 5's boost prevents **starvation** of long jobs and re-evaluates jobs whose behaviour changes ([OSTEP ch. 8](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf)). Students often swap the two. CS537 answer keys mark as true that MLFQ "learns" about jobs, uses different slice lengths, uses round robin within a level and sometimes "forgets" through the boost, and mark as false the claim that it starves long jobs ([CS537 Spring 2018 key](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/18-spring-mid-answers.pdf)). Boost arithmetic from the OSTEP homework: if the top quantum is 10 ms and a long job must get at least 5% of the CPU, then 10/S ≥ 0.05, so **S ≤ 200 ms**.

```
3 queues: top quantum 2, middle 4, bottom 8; allotment = 1 quantum per level; no I/O
Jobs: A (arrives 0, runs 10), B (arrives 1, runs 4), C (arrives 5, runs 3)
Check: ./mlfq.py -n 3 -Q 2,4,8 -A 1,1,1 -l 0,10,0:1,4,0:5,3,0 -c

| A:top | B:top | A:mid | C:top | A:mid | B:mid | C:mid | A:bot |
0       2       4       5       7       10      12      13      17
```

A uses its top-queue quantum and drops to the middle queue, and B does the same. A starts its middle-queue quantum at 4, but C arrives at 5 in the top queue and preempts it (Rule 1). C uses its top quantum and drops, after which A resumes at the head of the middle queue with its 3 remaining ticks and drops to the bottom at 10. B finishes at 12, C at 13 and A at 17, for an average turnaround of **12.0** and an average response of 0.33, the same numbers `mlfq.py` prints. Adding a boost every 10 time units (`-B 10`) changes the finish times to A 17, B 14 and C 15, an average of **13.33**, because `mlfq.py` moves the bottom queue's jobs up first; moving the higher queues first instead gives 12.0. The boost exists for fairness, not to improve turnaround, and since OSTEP's rules leave open both the boost order and where a preempted job resumes, these are simulator conventions. Note also that `mlfq.py` labels the top queue with the highest number while Silberschatz calls the top queue Q0, so write "top" and "bottom".

For oral context only (the listed topics stop at MLFQ), OSTEP now calls CFS "one (older) Linux approach" and notes that a newer scheduler, EEVDF, became the default in Linux 6.6 ([OSTEP ch. 9](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf); [KernelNewbies 6.6](https://kernelnewbies.org/Linux_6.6)). Nice values run from −20 (most CPU) to +19, and each step changes a process's CPU weight by a factor of about 1.25 ([sched(7)](https://man7.org/linux/man-pages/man7/sched.7.html)).

### Practice: scheduling

| # | Question | Answer |
|---|---|---|
| 1 | A job arrives at 3, first runs at 7, completes at 15 and has a 6-unit burst. TAT, WT, RT? | 12, 6, 4 |
| 2 | P1(0,8), P2(1,4), P3(2,9), P4(3,5): average waiting time under non-preemptive SJF and under SRTF? | 7.75 (order P1, P2, P4, P3); 6.5 (P1 P2 P4 P1 P3 at 0, 1, 5, 10, 17, 26) |
| 3 | RR q = 2, arrivals 0, 1, 2, 3, bursts 5, 4, 2, 1: when does P3 finish? | 6 under arrival-first (average TAT 8.0, GfG's published answer); 8 under preempted-first (average TAT 8.5) |
| 4 | Priority, 1 = highest: P1(0, 5, pri 2), P2(1, 3, pri 1), P3(2, 1, pri 3). Give the preemptive chart and average TAT, then the non-preemptive average TAT | P1 0–1, P2 1–4, P1 4–8, P3 8–9, average 6; non-preemptive average 6.33 |
| 5 | All arrive at t = 0; smaller number = higher priority: P1 (burst 10, pri 3), P2 (1, 1), P3 (2, 4), P4 (1, 5), P5 (5, 2). Who finishes last, and what is the average WT? | P4 at 19; 8.2 |
| 6 | MLFQ with 2 queues, top quantum 1, bottom quantum 2, allotment 1; A(0,4) and B(0,3). Completion times? | B at 6, A at 7 (A B A B A at 0, 1, 2, 4, 6, 7) |
| 7 | Which policies could produce "A10, B10, C10 (C done), A10 (A done), B5 (B done)"? | Not FIFO, and not STCF (A runs to completion before the shorter B); RR, MLFQ and lottery could |
| 8 | Three 10-unit jobs at t = 0: average TAT under RR with q = 1 and with q = 10? | 29 and 20 |
| 9 | Why does MLFQ need Rule 5 if Rule 4 already exists? | Rule 4 only stops gaming; without a boost, a stream of interactive jobs starves long jobs, and a job that turns interactive is never moved back up |

Answers 3, 5, 7 and 8, and the SRTF half of answer 2, match published answers ([OSC10 ch. 5 slides](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx); [GeeksforGeeks](https://www.geeksforgeeks.org/operating-systems/round-robin-scheduling-with-different-arrival-times/); [CS537 Spring 2018 key](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/18-spring-mid-answers.pdf); [UIC notes](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/6_CPU_Scheduling.html)); the rest were computed with the notes' simulator and checked against `scheduler.py` and `mlfq.py`.

## Pipes hang while any process still holds a write end

### Pipes and dup2: count descriptors, not processes

A pipe is a one-way byte stream inside the kernel with no message boundaries: `pipefd[0]` is the read end, `pipefd[1]` the write end, a read on an empty pipe blocks, and a write to a full pipe blocks ([pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)). Two rules decide almost every exam question: **a reader sees EOF only when every descriptor for the write end, in every process, is closed**, and **a write after every read-end descriptor is closed raises SIGPIPE**, whose default action kills the writer, or fails with `EPIPE` if SIGPIPE is ignored ([pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html); [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)). Writes of at most PIPE_BUF bytes are atomic, meaning they never interleave with other writers' data; POSIX requires PIPE_BUF ≥ 512 and Linux uses 4096, and since Linux 2.6.11 the default capacity is 65,536 bytes, though the man page warns that "applications should not rely on a particular capacity" ([pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)).

The model behind these rules is CMU's three tables: a per-process **descriptor table** whose entries point into a system-wide **open-file table**, which holds the file offset and a reference count and in turn points into a **v-node table** describing the file itself ([CMU 15-213 F25 L18](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/18-system-io.pdf)). `fork` copies the descriptor table and raises the reference counts. `dup2(old, new)` copies entry `old` into entry `new`, closing `new` first, silently and atomically; it does nothing if `old == new`, leaves `new` open if `old` is invalid, and turns close-on-exec off on the copy ([dup(2)](https://man7.org/linux/man-pages/man2/dup.2.html)). Exec keeps every descriptor not marked close-on-exec ([execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html)). The xv6 book states the consequence that matters: if `wc` held a descriptor for the pipe's write end, "wc would never see end-of-file" ([xv6 book §1.3](https://pdos.csail.mit.edu/6.1810/2025/xv6/book-riscv-rev5.pdf)). And `pipe()` must be called before `fork()`, since calling it afterwards creates two unrelated pipes ([MIT 6.1810 2018 Quiz 1 solutions](https://pdos.csail.mit.edu/6.1810/2025/quiz/q18_1_sol.pdf)).

**Trace A: the parent writes, the child reads.** #R and #W count the descriptors for each end across all processes.

| Time | Event | Parent fds | Child fds | #R | #W |
|---|---|---|---|---|---|
| t0 | `pipe(p)` gives p[0] = 3, p[1] = 4 | 0 1 2 3=R 4=W | — | 1 | 1 |
| t1 | `fork()` | 0 1 2 3=R 4=W | 0 1 2 3=R 4=W | 2 | 2 |
| t2 | child `close(4)` | 3=R 4=W | 3=R | 2 | 1 |
| t3 | parent `close(3)` | 4=W | 3=R | 1 | 1 |
| t4 | parent `write(…)`, `close(4)` | — | 3=R | 1 | 0 |
| t5 | child reads the message; the next `read` returns 0 because #W = 0; the child exits and `wait` returns | | | | |

Each skipped step breaks something specific. Skip t2 and the child still holds a write end, so #W never reaches 0, its read blocks forever, and the parent's `wait` blocks with it. Skip the `close(4)` at t4 and the same hang occurs. Skip t3 and EOF still works, but if the child dies early the parent's own read end keeps #R at 1, so the parent never receives SIGPIPE.

**Trace B: building `ls | wc -l`.**

```
parent: pipe(p)                            parent: 0 1 2 3=R 4=W
fork child1 ("ls")                         child1: 0 1 2 3=R 4=W             (#R=2, #W=2)
  child1: dup2(4,1); close(3); close(4)    child1: 0=tty 1=W 2=tty  -> execlp("ls")
fork child2 ("wc -l")                      child2: 0 1 2 3=R 4=W
  child2: dup2(3,0); close(3); close(4)    child2: 0=R 1=tty 2=tty  -> execlp("wc")
parent: close(3); close(4)                 parent: 0 1 2
final: #R = 1 (wc's fd 0), #W = 1 (ls's fd 1); when ls exits, #W = 0 and wc prints its count
```

The general version for N stages keeps only the previous stage's read end open in the parent, so no child ever inherits a descriptor for an unrelated pipe; you should be able to explain it line by line.

```c
int prev = -1;                                   /* read end of the previous stage's pipe */
for (int i = 0; i < n; i++) {
    int p[2];
    if (i < n - 1) pipe(p);                      /* no pipe after the last stage */
    if (fork() == 0) {
        if (prev != -1) { dup2(prev, STDIN_FILENO); close(prev); }
        if (i < n - 1)  { close(p[0]); dup2(p[1], STDOUT_FILENO); close(p[1]); }
        execvp(cmd[i][0], cmd[i]); _exit(127);   /* reached only if exec failed */
    }
    if (prev != -1) close(prev);                 /* parent drops the old read end */
    if (i < n - 1) { close(p[1]); prev = p[0]; } /* and keeps only the new read end */
}
while (wait(NULL) > 0) ;                         /* reap every stage */
```

"Find the hang" questions almost always come down to one of four bugs, each of which hung in local tests until it was fixed.

| Bug | What is wrong | Symptom | Fix |
|---|---|---|---|
| A | The parent writes into `wc -l` but never closes `p[1]` before `waitpid` | `wc` never sees EOF, so `waitpid` never returns | `close(p[1])` before waiting |
| B | The reading child never closes its own copy of `p[1]` | The child is itself a writer, so after the data it blocks forever, and the parent's `wait` hangs with it | The reader closes `p[1]` before its read loop ([UIUC CS 341 IPC](https://cs341.cs.illinois.edu/coursebook/Ipc)) |
| C | `printf \| sort \| wc -l` with both pipes created first; each child closes only the descriptors it passed to `dup2` | `sort` and `wc` each still hold a write end of their own input, so neither sees EOF | Close all four pipe descriptors in every child, or use the loop above |
| D | The parent writes 1 MiB to `cat` before reading any of `cat`'s output | Both pipes fill (64 KiB each on Linux), and each process waits for the other; small inputs work fine | A separate writer process or thread, `poll()`, or a temporary file |

A program that works on small input but hangs on large input almost always has Bug D's full-pipe deadlock, whereas EOF bugs hang even on tiny input. To debug, ask who still holds a write end: on Linux, `ls -l /proc/PID/fd` shows pipes as `pipe:[inode]`, and two descriptors with the same inode are the same pipe ([proc_pid_fd(5)](https://man7.org/linux/man-pages/man5/proc_pid_fd.5.html)); on macOS, use `lsof -p PID`.

### FIFOs block in open, not only in read

A FIFO (named pipe) is a pipe with a filesystem name: data passes through the kernel and never touches the disk, and I/O follows exactly the pipe rules ([fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html); [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)). The difference is in opening, because **`open` blocks until the other end is also opened** ([fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html)).

| Open call | Result |
|---|---|
| `O_RDONLY` or `O_WRONLY` (blocking) | waits until another process opens the other end |
| `O_RDONLY \| O_NONBLOCK` | succeeds at once |
| `O_WRONLY \| O_NONBLOCK` with no reader | fails with **ENXIO** |
| `O_RDWR` | succeeds on Linux; POSIX leaves it undefined |

Two classic consequences follow. In an **open-order deadlock**, process A opens `f1` for reading and then `f2` for writing while process B opens `f2` for reading and then `f1` for writing, so each blocks forever in its first `open`; the fix is to open the FIFOs in the same order in both processes, or to use `O_NONBLOCK`. In a **spinning server**, the last client disconnects and `read` returns 0 (EOF) on every call, so the server loops uselessly; the fix is for the server to keep its own dummy write descriptor open on the FIFO, so a writer always exists. The FIFO's name persists until `unlink`, but unread data exists only while some process holds the FIFO open ([Kerrisk, LCA 2013](https://man7.org/conf/lca2013/IPC_Overview-LCA-2013-printable.pdf)). One source conflict is worth knowing: Beej says a nonblocking read with no data returns 0 bytes ([Beej's Guide to Unix IPC](https://beej.us/guide/bgipc/html/)), while `pipe(7)` says it fails with `EAGAIN` while a writer exists and returns 0 only when no writer remains, and a local macOS test agreed with `pipe(7)`.

### Message queues and shared memory outlive their creators

Message queues add message boundaries and an ordering rule. **POSIX queues deliver the highest priority first, and the oldest first within a priority**, and `mq_receive` fails with `EMSGSIZE` unless its buffer is at least `mq_msgsize` bytes ([mq_send(3)](https://man7.org/linux/man-pages/man3/mq_send.3.html); [mq_receive(3)](https://man7.org/linux/man-pages/man3/mq_receive.3.html)). **System V queues let the receiver select by message type** ([msgop(2)](https://man7.org/linux/man-pages/man2/msgop.2.html)). Both kinds persist in the kernel until explicitly removed ([mq_overview(7)](https://man7.org/linux/man-pages/man7/mq_overview.7.html); [Kerrisk, LCA 2013](https://man7.org/conf/lca2013/IPC_Overview-LCA-2013-printable.pdf)).

| | POSIX message queue | System V message queue |
|---|---|---|
| Create or open | `mq_open("/q", O_CREAT\|O_RDWR, 0600, &attr)` returns `mqd_t` | `msgget(key, IPC_CREAT\|0600)` returns an int ID |
| Send | `mq_send(q, buf, len, prio)` | `msgsnd(id, &m, size_of_mtext, 0)`; `mtype` must be > 0, and the size excludes it |
| Which message comes out | highest priority first, oldest first within a priority | depends on `msgtyp`: 0 gives the first message; > 0 the first of that type; < 0 the first message of the lowest type that is ≤ \|msgtyp\| |
| Nonblocking | `O_NONBLOCK` gives `EAGAIN` | `IPC_NOWAIT` gives `EAGAIN` on send and `ENOMSG` on receive |
| Delete | `mq_unlink`: the name goes now, the queue after the last close | `msgctl(IPC_RMID)`: immediate; blocked callers get `EIDRM` |
| Inspect | `/dev/mqueue`, after mounting it | `ipcs -q`, then `ipcrm -q id` |

Sources: [mq_overview(7)](https://man7.org/linux/man-pages/man7/mq_overview.7.html), [mq_send(3)](https://man7.org/linux/man-pages/man3/mq_send.3.html), [mq_receive(3)](https://man7.org/linux/man-pages/man3/mq_receive.3.html), [msgop(2)](https://man7.org/linux/man-pages/man2/msgop.2.html), [msgctl(2)](https://man7.org/linux/man-pages/man2/msgctl.2.html), [TLPI ch. 52](https://man7.org/tlpi/download/TLPI-52-POSIX_Message_Queues.pdf).

Shared memory is the fastest form of IPC and has **no synchronization at all**. POSIX shared memory is created with `shm_open`, sized with `ftruncate` (a new object has length 0), mapped with `mmap(…, MAP_SHARED, …)` and removed with `shm_unlink`; System V shared memory uses `shmget` and `shmat`, and `shmctl(IPC_RMID)` only marks the segment, which is destroyed after the last process detaches ([shm_overview(7)](https://man7.org/linux/man-pages/man7/shm_overview.7.html); [shmctl(2)](https://man7.org/linux/man-pages/man2/shmctl.2.html)). The classic bug is the lost update: OSTEP shows that `counter++` compiles to three instructions (load, add, store), so two processes can interleave them ([OSTEP ch. 26](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf)).

| Step | Process P1 | Process P2 | P1 register | P2 register | Shared `counter` |
|---|---|---|---|---|---|
| 0 | | | – | – | 50 |
| 1 | load counter | | 50 | – | 50 |
| 2 | add 1 | | 51 | – | 50 |
| — | *timer interrupt, switch* | | | | |
| 3 | | load counter | 51 | 50 | 50 |
| 4 | | add 1 | 51 | 51 | 50 |
| 5 | | store | 51 | 51 | 51 |
| — | *switch* | | | | |
| 6 | store | | 51 | 51 | **51, not 52** |

In local tests, two forked processes each did 1,000,000 unsynchronized increments; one run lost 415,375 updates and the next lost none, so a passing run proves nothing. If each of two processes runs `counter++` n ≥ 2 times starting from 0, the maximum final value is 2n and the **minimum is 2**: A loads 0 and stalls while B does n − 1 complete increments, A stores 1, B loads 1 and stalls while A finishes its remaining increments, and B stores 2. The fix is a semaphore initialized to 1 around the increment ([OSTEP ch. 31](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)), and for processes the semaphore must live inside the shared region ([sem_init(3)](https://man7.org/linux/man-pages/man3/sem_init.3.html)).

```c
struct shared { sem_t lock; long counter; };                 /* Linux; build with -pthread -lrt */
int fd = shm_open("/ctr", O_CREAT | O_RDWR, 0600);
ftruncate(fd, sizeof(struct shared));
struct shared *s = mmap(NULL, sizeof *s, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
sem_init(&s->lock, 1 /* shared between processes */, 1 /* binary semaphore = lock */);
/* in each process */  sem_wait(&s->lock);  s->counter++;  sem_post(&s->lock);
/* cleanup, once   */  sem_destroy(&s->lock); munmap(s, sizeof *s); shm_unlink("/ctr");
```

### Sockets are byte streams with a new descriptor per client

A server calls `socket`, sets `SO_REUSEADDR`, then `bind`, `listen` and `accept` in a loop; each `accept` returns a **new connected descriptor**, while the listening descriptor keeps listening ([accept(2)](https://man7.org/linux/man-pages/man2/accept.2.html); [CMU 15-213 F25 L20](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/20-netprog2.pdf)). The `listen` backlog, the queue of connections waiting to be accepted, is capped by `somaxconn`, whose default has been 4096 since Linux 5.4 ([listen(2)](https://man7.org/linux/man-pages/man2/listen.2.html)), so Beej's "about 20" and CMU's "128-ish" are outdated. TCP "does not preserve record boundaries" ([tcp(7)](https://man7.org/linux/man-pages/man7/tcp.7.html)): in a local test, three sends of 5, 5 and 2 bytes arrived as a single 12-byte `recv`. Every protocol therefore needs **framing**, a length prefix or a delimiter that marks where each message ends, plus loops that tolerate short reads and writes ([Beej's Guide to Network Programming](https://beej.us/guide/bgnet/html/); [CMU 15-213 F25 L18](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/18-system-io.pdf)). `recv` returning 0 means the peer closed the connection normally ([recv(2)](https://man7.org/linux/man-pages/man2/recv.2.html)), and writing to a departed peer raises SIGPIPE, which a server avoids by ignoring the signal or passing `MSG_NOSIGNAL` on each send ([send(2)](https://man7.org/linux/man-pages/man2/send.2.html)). Restarting a server has its own trap: the side that closes a connection first stays in TIME_WAIT for 2 × MSL, the maximum segment lifetime ([RFC 9293](https://www.rfc-editor.org/rfc/rfc9293)), which Linux fixes at 60 s ([Linux tcp.h](https://github.com/torvalds/linux/blob/master/include/net/tcp.h)). Servers usually close first, so a quick restart fails with `EADDRINUSE` unless `SO_REUSEADDR` was set **before** `bind` ([socket(7)](https://man7.org/linux/man-pages/man7/socket.7.html)).

| Design | How it works | Strength | Pitfalls |
|---|---|---|---|
| Iterative | accept, serve, close, one client at a time | simplest; no concurrency bugs | one slow client blocks the rest, who wait in the backlog |
| Process per client | `accept`, then `fork`; the child serves the client | real concurrency and isolation | one fork per connection; the parent must close `connfd`; zombies must be reaped; shared state needs IPC |
| Pre-forked pool | N workers forked up front, all looping on `accept` | no per-request fork delay; bounded resources | choosing the pool size; idle processes cost memory |
| `poll`/`select` event loop | one process handles whichever descriptor is ready | one address space; no locks needed on one CPU | complex state machines; any blocking call stalls every client; uses one core; `select` handles only fds below 1024 |

Sources: [CMU 15-213 F25 L21](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/21-concprog.pdf), [Apache prefork MPM](https://httpd.apache.org/docs/2.4/mod/prefork.html), [OSTEP ch. 33](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-events.pdf), [select(2)](https://man7.org/linux/man-pages/man2/select.2.html).

The fork-per-client server is the best single code sample for the oral exam, because it combines descriptor reference counts, zombie reaping and interrupted system calls. CMU's rules are that the parent must close `connfd`, since after `fork` its reference count is 2 and the connection closes only when the count reaches 0, and that the child should close `listenfd` ([CMU 15-213 F25 L21](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/21-concprog.pdf)). Installing the SIGCHLD handler with `SA_RESTART` lets an `accept` that the signal interrupted restart instead of failing with `EINTR` ([signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)).

```
listenfd = socket + bind + listen    PARENT: 3=listen                       refcnt(listen)=1
connfd = accept(3, ...)              PARENT: 3=listen 4=connA               refcnt(connA)=1
fork()                               PARENT: 3 4    CHILD: 3 4              refcnt(listen)=2, refcnt(connA)=2
child:  close(3)                     CHILD: 4                               refcnt(listen)=1
parent: close(4)                     PARENT: 3                              refcnt(connA)=1
child serves on 4, closes it, exits  refcnt(connA)=0: connection closed, client sees EOF
kernel -> parent: SIGCHLD            handler: while (waitpid(-1, NULL, WNOHANG) > 0) ;
BUG: parent forgets close(4)  ->  refcnt stays 1 after the child exits, the client never sees EOF,
                                  and one descriptor leaks per client until accept fails with EMFILE
```

### Practice: IPC

| # | Question | Answer |
|---|---|---|
| 1 | MIT 6.1810 (2025): `pipe(fds); fork(); write(fds[1],"x",1); close(fds[1]); n = read(fds[0], buf, 32); printf("%d\n", n);` Which output pairs are possible: `2 0`, `0 0`, `1 1`, `2 2`, `0 1`? | Only `2 0` and `1 1`. A process can read 0 only after both have written and closed, so the other must have read 2 |
| 2 | After `pipe(p); fork(); fork();` with no closes, how many descriptors refer to the write end? | 4, and all four must be closed before any reader sees EOF |
| 3 | A process writes 100 bytes into a pipe whose readers have all exited. What happens by default, and with SIGPIPE ignored? What does bash report? | Killed by SIGPIPE; `write` returns −1 with `EPIPE`; 141 |
| 4 | Several processes write records into one pipe with blocking writes. Can 3000-byte records interleave on Linux? 5000-byte records? 3000-byte records on macOS? | No (3000 ≤ 4096); yes; yes, because macOS PIPE_BUF measured 512 |
| 5 | What does `dup2(5,5)` do? `dup2(99,1)` with fd 99 closed? Is close-on-exec set on the new descriptor? | Returns 5 and does nothing; fails and leaves fd 1 open; no, it is off |
| 6 | A FIFO that nobody has opened: what do `open(O_WRONLY)`, `open(O_WRONLY\|O_NONBLOCK)` and `open(O_RDONLY\|O_NONBLOCK)` do? | Blocks until a reader opens; fails with ENXIO; succeeds at once |
| 7 | A POSIX queue receives m1 (priority 1), m2 (5), m3 (5), m4 (0) in that order. In what order does `mq_receive` return them? | m2, m3, m1, m4 |
| 8 | A System V queue holds A (type 3), B (1), C (2), D (1). On Linux, what do `msgrcv` calls with msgtyp 2, then −3, then 0, then 0 return? | C, B, A, D (macOS returns A for −3) |
| 9 | Two processes each run `counter++` 1000 times on shared memory, starting at 0. What are the maximum and minimum final values, and what is the fix? | 2000 and 2; a semaphore initialized to 1 around the increment, placed in shared memory or opened by name |
| 10 | A client sends "HELLO" then "WORLD"; the server calls `recv(c, buf, 100, 0)` once. What can it get? | Anything from 1 to 10 bytes; use a length prefix or delimiter, and loop |
| 11 | A restarted server's `bind` fails with `EADDRINUSE`. Why, for how long, and what is the fix? | TIME_WAIT after the server closed first, lasting 2 × MSL (60 s on Linux); set `SO_REUSEADDR` before `bind` |
| 12 | In a fork-per-client server, why loop on `waitpid(-1, NULL, WNOHANG)` in the SIGCHLD handler, and why can `accept` fail with `EINTR`? | Signals do not queue, and live children must not block the handler; the handler interrupted `accept`, so use `SA_RESTART` or retry |

Question 1 is MIT's 2025 quiz item ([MIT 6.1810 2025 Quiz 1 solutions](https://pdos.csail.mit.edu/6.1810/2025/quiz/q25-1-sol.pdf)); the other answers follow [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html), [dup(2)](https://man7.org/linux/man-pages/man2/dup.2.html), [fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html), [mq_send(3)](https://man7.org/linux/man-pages/man3/mq_send.3.html), [msgop(2)](https://man7.org/linux/man-pages/man2/msgop.2.html), [tcp(7)](https://man7.org/linux/man-pages/man7/tcp.7.html) and [CMU 15-213 F25 L21](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/21-concprog.pdf).

## Semaphore questions reduce to eight patterns and three bug families

Downey's definition is the cleanest: a semaphore is an integer you initialize to any value and afterwards may only **decrement** (`wait`, also called P), which blocks the caller if the value becomes negative, or **increment** (`signal`, also called V), which wakes one waiting thread if any exist; and **you may not read its value** ([Downey, LBoS §2.1](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)). Sources disagree on whether the value can go negative. In the textbook convention, used by Downey, Silberschatz's blocking implementation and OSTEP's statement of Dijkstra's invariant, **a negative value equals the number of blocked threads** ([OSTEP ch. 31](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf); [OSC10 ch. 6 slides](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch6.pptx)). In the POSIX convention the value "is never allowed to fall below zero" ([sem_overview(7)](https://man7.org/linux/man-pages/man7/sem_overview.7.html)), Linux's `sem_getvalue` reports 0 while threads wait ([sem_getvalue(3)](https://man7.org/linux/man-pages/man3/sem_getvalue.3.html)), and CMU and Berkeley CS162 also treat the value as non-negative ([CMU 15-213 F15 L25](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/25-sync-advanced.pdf); [CS162 Spring 2023 MT1 solutions](https://cs162.org/static/exams/sp23-mt1-solutions.pdf)). One helper script saved with the notes (`semsim.py`) describes "the course's semaphore model (Slide 9)" as non-negative, with a post handing its "flag" directly to a sleeping waiter. Check that slide, and in either case write two columns, value and waiting queue, which is unambiguous under both conventions.

| Step | Operation (S starts at 2) | Textbook value [queue] | Linux `sem_getvalue` |
|---|---|---|---|
| 1 | A waits | 1 | 1 |
| 2 | B waits | 0 | 0 |
| 3 | C waits | −1 [C] | 0, C blocked |
| 4 | D waits | −2 [C, D] | 0, C and D blocked |
| 5 | A signals | −1 [D], C wakes | 0, C wakes |
| 6 | B signals | 0, D wakes | 0, D wakes |

Three facts separate a semaphore from similar-looking tools. **A binary semaphore is not a mutex**: it has no owner, so any thread may signal it, and one extra signal raises it to 2 and lets two threads into the critical section ([CS162 Spring 2023 MT1 solutions](https://cs162.org/static/exams/sp23-mt1-solutions.pdf)). **Semaphores remember signals and condition variables do not**, so a semaphore can be signalled before anyone waits without the signal being lost ([CS162 Fall 2020 MT1 solutions](https://cs162.org/static/exams/fa20-mt1-solutions.pdf)). And **the initial value is "the number of resources you are willing to give away immediately after initialization"**, which means 1 for a lock and 0 for ordering ([OSTEP ch. 31](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)). Almost every classical solution is assembled from Downey's patterns.

| Pattern | Initial values | Core code | Guarantee | Classic bug |
|---|---|---|---|---|
| Signaling | `sem = 0` | A: `a1; sem.signal()`; B: `sem.wait(); b1` | a1 before b1 | initial value 1 removes the ordering |
| Rendezvous | `aArrived = bArrived = 0` | A: `aArrived.signal(); bArrived.wait()`; B mirrors it | a1 before b2, and b1 before a2 | if both threads wait first, every schedule deadlocks |
| Mutex | `mutex = 1` | `wait; critical section; signal` | at most one thread inside | an unpaired extra signal lets two in |
| Multiplex | `m = n` | same as mutex | at most n threads inside | a wrong n silently admits too many |
| Barrier | `count = 0, mutex = 1, barrier = 0` | `mutex{count++}; if count == n: barrier.signal(); barrier.wait(); barrier.signal()` | nobody passes until all n arrive | without the second `signal`, n − 1 threads hang; putting the wait/signal pair inside the mutex always deadlocks |
| Reusable barrier | `turnstile = 0, turnstile2 = 1` | two phases; the nth thread locks one turnstile before opening the other | no thread gets a lap ahead | reusing a one-phase barrier lets a fast thread lap the others |
| Lightswitch | `counter = 0`, plus its own `mutex = 1` | the first thread in waits on the room; the last one out signals it | the category holds the room while counter > 0 | without its own mutex, a reader and a writer can enter together |
| Turnstile | 1 (open) or 0 (locked) | `t.wait(); t.signal()` | lets threads through one at a time; holding it bars everyone | — |

Sources: [LBoS ch. 3–4](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf), [OSTEP ch. 31](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf). Three bug families recur everywhere: **waiting on a semaphore while holding a mutex**, which Downey calls "a common source of deadlocks" ([LBoS §3.6](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)); **testing shared state outside the mutex**; and **a wrong initial value**.

### Precedence graphs become one semaphore per edge

A precedence graph is a directed acyclic graph in which an edge A → B means A must finish before B starts ([GeeksforGeeks, precedence graph](https://www.geeksforgeeks.org/operating-systems/precedence-graph-in-operating-system/)), and Silberschatz's idiom for a single edge is `S1; signal(synch);` in one process and `wait(synch); S2;` in the other, with `synch = 0` ([OSC10 ch. 6 slides](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch6.pptx)). The mechanical recipe is one semaphore per edge, initialized to 0, with each statement waiting once on every incoming edge, running, then signalling every outgoing edge. Two optimizations shrink the answer: edges inside one process need no semaphore, because program order already enforces them, and one counting semaphore can replace a fan-out (signal it k times) or a join (wait on it k times). The valid execution orders are exactly the graph's topological orders.

```
// Graph: S1->S2, S1->S3, S2->S4, S4->S5, S4->S6, S3->S7, S5->S7, S6->S7
// (a) one semaphore per edge, all 0:  a:1->2 b:1->3 c:2->4 d:4->5 e:4->6 f:3->7 g:5->7 h:6->7
P1: S1; signal(a); signal(b);
P2: wait(a); S2; signal(c);
P3: wait(b); S3; signal(f);
P4: wait(c); S4; signal(d); signal(e);
P5: wait(d); S5; signal(g);
P6: wait(e); S6; signal(h);
P7: wait(f); wait(g); wait(h); S7;
// (b) three processes, three semaphores (x = y = j = 0): the chain S1 S2 S4 S5 S7 lives in PA
PA: S1; signal(x); S2; S4; signal(y); S5; wait(j); wait(j); S7;
PB: wait(x); S3; signal(j);
PC: wait(y); S6; signal(j);
```

Both programs produce exactly **10** orders with no deadlock. By hand: S1 is always first and S7 always last, S5 and S6 can follow S2 S4 in either order (2 ways), and S3 can sit in any of 5 slots among those four statements, giving 2 × 5 = 10. A run starting `S1 S3 S7` is impossible because S7 needs S5 and S6 first. The two classic errors are signalling a fan-out semaphore only once, so that one successor waits forever, and waiting on a join semaphore only once, so that S7 can run before its last predecessor. These counts were confirmed by exhaustive enumeration.

### Output enumeration reuses the fork method

Listing the possible outputs of a semaphore program works exactly like a fork puzzle. Break each thread into atomic actions, add happens-before edges (program order, plus the rule that the k-th completed wait on a semaphore with initial value v follows the (k − v)-th signal), and count the topological orders; any output that violates an edge is impossible, and any partial run that cannot be extended is a deadlock. Unsynchronized threads with n1, …, nk steps interleave in (n1 + … + nk)! / (n1! ⋯ nk!) ways, and Downey advises assuming that no update or write is atomic unless told otherwise ([LBoS §1.5](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)).

| Program (semaphores start at 0 unless stated) | Distinct outputs | Why |
|---|---|---|
| A: `a1; a2` ∥ B: `b1; b2`, no synchronization | 6 | C(4,2) |
| A: `a1; V(s); a2` ∥ B: `b1; P(s); b2` | 5 | `b1 b2 a1 a2` is impossible |
| Rendezvous | 4 | a1 < b2 and b1 < a2 |
| Two threads printing 3 lines each, no synchronization | 20 | C(6,3) |
| The same, with both bodies inside one mutex | 2 | all of one thread, then all of the other |
| Three threads: `print i; barrier; print i'` | 36 | 3! × 3! |
| P1: `A; V(S); P(T); B` ∥ P2: `P(S); C; V(T); D` | 2 | `A C B D` and `A C D B` |
| T1: `P(s); A` ∥ T2: `P(s); B` ∥ T3: `C; V(s); D` | 4 partial runs | one of T1 and T2 never finishes |

Berkeley's Fall 2019 midterm asked exactly this kind of question. Three threads (luffy, blackbeard, akainu) operate on three semaphores that all start at 1, and `main` exits right after creating them; the official answer is that A, B, L or nothing can print, but never two lines, because "loguetown is downed in every path, so only one can ever succeed" ([CS162 Fall 2019 MT1 solutions](https://cs162.org/static/exams/fa19-mt1-solutions.pdf)).

### Producer-consumer: counting semaphore first, mutex second

The bounded buffer uses `mutex = 1`, `items = 0` (Silberschatz's `full`) and `spaces = N` (Silberschatz's `empty`); the producer runs `wait(spaces); wait(mutex); add; signal(mutex); signal(items)`, and the consumer mirrors it with `wait(items); wait(mutex); remove; signal(mutex); signal(spaces)` ([OSC10 ch. 7 slides](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch7.pptx); [LBoS §4.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)). Downey's rule is to "check availability before getting the mutex" and release the mutex before signalling. Reversing the order in the consumer is his Deadlock #4, which takes four steps on an empty buffer.

| # | Thread | Executes | mutex | items | spaces |
|---|---|---|---|---|---|
| 0 | | initial state | 1 | 0 | 2 |
| 1 | Consumer | `mutex.wait()` | 0 | 0 | 2 |
| 2 | Consumer | `items.wait()` while holding the mutex | 0 | −1 [C] | 2 |
| 3 | Producer | `spaces.wait()` | 0 | −1 [C] | 1 |
| 4 | Producer | `mutex.wait()` | −1 [P] | −1 [C] | 1 |

The consumer waits for an item that only the producer can supply, and the producer waits for the mutex the consumer holds ([LBoS §4.1.3](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf); [OSTEP ch. 31](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)). Other changes fail differently: removing the mutex with two producers lets both write `buffer[fill]` before either increments `fill`, so one item is overwritten; `spaces = 0` deadlocks immediately; and `items = 1` lets a consumer read an empty slot. The invariant to state is that `items + spaces`, plus the number of threads between their first wait and their final signal, always equals N.

### Readers-writers: the lightswitch starves writers until a turnstile is added

Readers may share the room but a writer needs it alone, which Downey calls categorical mutual exclusion ([LBoS §4.3](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)). The reader-preference solution protects the room with `roomEmpty = 1` and makes readers use a lightswitch, so the first reader in locks `roomEmpty` and the last one out unlocks it. It cannot deadlock, but "it is possible for a writer to starve": as long as a new reader arrives before the last current reader leaves, the room never empties ([LBoS §4.3.3](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)). Silberschatz calls this the first readers-writers problem and writes it with `rw_mutex`, `mutex` and `read_count` ([OSC10 ch. 7 slides](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch7.pptx)).

```
# reader preference                       # no-starve fix: turnstile = Semaphore(1)
mutex.wait()                              # writer                       # reader
    readers += 1                          turnstile.wait()               turnstile.wait()
    if readers == 1: roomEmpty.wait()         roomEmpty.wait()           turnstile.signal()
mutex.signal()                                # write                    readSwitch.lock(roomEmpty)
# read                                    turnstile.signal()                 # read
mutex.wait()                              roomEmpty.signal()             readSwitch.unlock(roomEmpty)
    readers -= 1
    if readers == 0: roomEmpty.signal()
mutex.signal()
```

| Step | Event | readers | roomEmpty | Writer |
|---|---|---|---|---|
| 1 | R0 enters: 0 → 1; first in, so it takes `roomEmpty` | 1 | 0 | – |
| 2 | R1 enters: 1 → 2 | 2 | 0 | – |
| 3 | W calls `roomEmpty.wait()` and blocks | 2 | −1 [W] | blocked |
| 4 | R0 leaves: 2 → 1, not the last | 1 | −1 [W] | blocked |
| 5 | R0 re-enters: 1 → 2 | 2 | −1 [W] | blocked |
| 6 | R1 leaves: 2 → 1 | 1 | −1 [W] | blocked |
| 7 | R1 re-enters: 1 → 2; the state now equals step 3, so steps 4–7 repeat forever | 2 | −1 [W] | blocked |

The writer never even becomes runnable, so no assumption about scheduler fairness can save it. In the turnstile fix, a waiting writer holds the turnstile, so newly arriving readers queue behind it, and once the last reader leaves "the writer immediately enters its critical section" ([LBoS §4.3.4–4.3.5](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)). Writer priority, built from two lightswitches, simply moves the starvation to readers ([LBoS §4.3.6–4.3.7](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)). All of these guarantees assume strong (FIFO) semaphores, which wake waiters in arrival order; Downey states that with weak semaphores "it is very difficult to prevent starvation" ([LBoS §4.4](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)).

| Solution | Can writers starve? | Can readers starve? |
|---|---|---|
| Reader preference (lightswitch) | yes | no |
| No-starve (turnstile) | no, with FIFO semaphores | no, with FIFO semaphores |
| Writer priority (two lightswitches) | no | yes |

### Sleeping barber: a scoreboard plus two rendezvous

Dijkstra posed the sleeping-barber problem in 1965 ([Wikipedia: Sleeping barber problem](https://en.wikipedia.org/wiki/Sleeping_barber_problem)). Downey's solution keeps a `customers` count under a mutex, so that a customer leaves ("balks") when the count equals n, the shop's capacity including the barber's chair, and it then uses two rendezvous ([LBoS §5.2](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)).

```
n = 4; customers = 0; mutex = Semaphore(1)
customer = Semaphore(0); barber = Semaphore(0); customerDone = Semaphore(0); barberDone = Semaphore(0)

# customer                              # barber (loops forever)
mutex.wait()                            customer.wait()        # sleep until a customer arrives
    if customers == n:                  barber.signal()        # "I am ready for you"
        mutex.signal(); balk()          # cutHair()
    customers += 1                      customerDone.wait()
mutex.signal()                          barberDone.signal()
customer.signal()
barber.wait()
# getHairCut()
customerDone.signal()
barberDone.wait()
mutex.wait(); customers -= 1; mutex.signal()
```

Explain each semaphore by the event it stands for: `customer` means "a customer is waiting" and is what the barber sleeps on, `barber` means "the barber is ready", and the second rendezvous (`customerDone` and `barberDone`) guarantees the haircut is finished before the barber loops to the next customer. Run the same code with two barbers and it breaks: in a model-checked trace from the notes, one barber consumed another customer's `customerDone` signal and called the next customer while its own customer was still in the chair. The fix is to pass identities, with each customer putting its own semaphores in a FIFO list that barbers take from under the mutex, as in Downey's FIFO barbershop ([LBoS §5.3](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)).

### Dining philosophers: four Coffman conditions, four fixes

Five philosophers sit at a round table with one fork between each pair, and each takes one fork and then the other. If all five take their first fork at the same time, everyone waits forever. The trace uses Downey's numbering, in which philosopher i takes fork i + 1 first and then fork i.

| # | Philosopher | Executes | f0 | f1 | f2 | f3 | f4 |
|---|---|---|---|---|---|---|---|
| 0 | | initial | 1 | 1 | 1 | 1 | 1 |
| 1 | Ph0 | f1.wait() | 1 | 0 | 1 | 1 | 1 |
| 2 | Ph1 | f2.wait() | 1 | 0 | 0 | 1 | 1 |
| 3 | Ph1 | f1.wait() | 1 | −1 [Ph1] | 0 | 1 | 1 |
| 4 | Ph2 | f3.wait() | 1 | −1 [Ph1] | 0 | 0 | 1 |
| 5 | Ph2 | f2.wait() | 1 | −1 [Ph1] | −1 [Ph2] | 0 | 1 |
| 6 | Ph3 | f4.wait() | 1 | −1 [Ph1] | −1 [Ph2] | 0 | 0 |
| 7 | Ph3 | f3.wait() | 1 | −1 [Ph1] | −1 [Ph2] | −1 [Ph3] | 0 |
| 8 | Ph4 | f0.wait() | 0 | −1 [Ph1] | −1 [Ph2] | −1 [Ph3] | 0 |
| 9 | Ph0 | f0.wait() | −1 [Ph0] | −1 [Ph1] | −1 [Ph2] | −1 [Ph3] | 0 |
| 10 | Ph4 | f4.wait() | −1 [Ph0] | −1 [Ph1] | −1 [Ph2] | −1 [Ph3] | −1 [Ph4] |

The resource-allocation graph now contains the cycle Ph0 → f0 → Ph4 → f4 → Ph3 → f3 → Ph2 → f2 → Ph1 → f1 → Ph0, and when each resource has a single instance a cycle means deadlock ([OSC10 ch. 8 slides](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch8.pptx)). All four Coffman conditions hold: **mutual exclusion** (each fork has one holder), **hold and wait** (each philosopher holds one fork while waiting for another), **no preemption** (a fork cannot be taken away) and **circular wait** (the cycle above). Breaking any one of them prevents deadlock ([OSTEP ch. 32](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf); [Wikipedia: Deadlock](https://en.wikipedia.org/wiki/Deadlock_%28computer_science%29)).

| Fix | Mechanism | Condition broken |
|---|---|---|
| Footman | `footman = Semaphore(4)` waited on before the forks, so one fork is always free | circular wait ([LBoS §4.5](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf); Stallings' N − 1 rule per [Wikipedia](https://en.wikipedia.org/wiki/Dining_philosophers_problem)) |
| One left-handed philosopher, or lower-numbered fork first | philosopher 0 (or everyone) takes forks in a global order | circular wait ([OSTEP ch. 31](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf); resource hierarchy per [Wikipedia](https://en.wikipedia.org/wiki/Dining_philosophers_problem)) |
| Waiter | `waiter.wait(); take both forks; waiter.signal()` | no one can hold one fork while another philosopher is acquiring forks: both or none ([Wikipedia](https://en.wikipedia.org/wiki/Dining_philosophers_problem)) |
| Tanenbaum | a `state[]` array, one mutex and one semaphore per philosopher; `test(i)` lets i eat only if neither neighbour is eating | hold and wait: forks are taken both or none, under the mutex ([LBoS §4.5.5](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)) |

```
def get_fork(i):                           def test(i):     # neighbours: (i+4)%5 and (i+1)%5
    mutex.wait()                               if state[i] == 'hungry' and
    state[i] = 'hungry'                           state[(i+4)%5] != 'eating' and
    test(i)                                        state[(i+1)%5] != 'eating':
    mutex.signal()                                 state[i] = 'eating'
    sem[i].wait()                                  sem[i].signal()
def put_fork(i):
    mutex.wait(); state[i] = 'thinking'; test((i+1)%5); test((i+4)%5); mutex.signal()
```

Two subtleties earn extra credit. **Tanenbaum's solution is deadlock-free but not starvation-free**: it cannot deadlock because "no thread executes wait while holding mutex", but Gingras found a repeating pattern in which philosopher 0 is tested only while one of its neighbours is eating ([LBoS §4.5.6](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf)), and Silberschatz's monitor solution likewise has "no deadlock, but starvation is possible" ([OSC10 ch. 7 slides](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch7.pptx)). And when copying Downey's version, `test(i)` must use the neighbour definitions left(i) = (i + 4) % 5 and right(i) = (i + 1) % 5; reusing the fork helper `left(i) = i` makes `test` check the philosopher itself, after which two neighbours can eat together (found by model checking).

### Semaphores between processes

Processes can share a POSIX semaphore by name, with `sem_open("/name", O_CREAT, mode, value)`, which persists until `sem_unlink`, or as an unnamed `sem_init(&s, 1, value)` placed in shared memory such as an `mmap(MAP_SHARED)` region created before `fork` ([sem_overview(7)](https://man7.org/linux/man-pages/man7/sem_overview.7.html); [sem_init(3)](https://man7.org/linux/man-pages/man3/sem_init.3.html)). Two pitfalls are easy to explain aloud: `sem_init` with pshared = 1 on an ordinary global variable is wrong, because after `fork` each process has its own copy of that variable, and `sem_open` with `O_CREAT` silently **ignores the initial value** if a crashed earlier run left the semaphore behind, so unlink it first or use `O_EXCL` ([sem_open(3)](https://man7.org/linux/man-pages/man3/sem_open.3.html)). System V semaphores come in sets; a `semop` call applies an array of operations atomically, "as a complete unit, or not at all", supports `SEM_UNDO`, and new semaphores start with undefined values that must be set with `semctl` ([semop(2)](https://man7.org/linux/man-pages/man2/semop.2.html); [semget(2)](https://man7.org/linux/man-pages/man2/semget.2.html)). On macOS, `sem_init` returned −1 with `ENOSYS` in local tests while named semaphores worked, and a tested named-semaphore producer-consumer across `fork` is saved as `posix_sem_demo.c` in the notes folder.

### Practice: semaphores

| # | Question | Answer |
|---|---|---|
| 1 | Initial values for: a lock; "S2 must run after S1"; at most 3 threads in f(); a bounded buffer of 8 (mutex, items, spaces); a barrier turnstile; each fork; the footman; `roomEmpty`; the no-starve turnstile; the barber's `customer` and `barber` | 1; 0; 3; 1, 0, 8; 0; 1; 4; 1; 1; 0 and 0 |
| 2 | Fill in the blanks so that a1 < b2 and b1 < a2: `A: a1; __; __; a2` and `B: b1; __; __; b2` | A: `aArrived.signal(); bArrived.wait()`; B: `bArrived.signal(); aArrived.wait()`, both semaphores starting at 0. Waiting first in both threads deadlocks |
| 3 | `S = T = 0`; P1: `A; V(S); P(T); B`; P2: `P(S); C; V(T); D`. All outputs? | `A C B D` and `A C D B` |
| 4 | Does Downey's barrier without the second `barrier.signal()` always deadlock? | No. If all n increments happen before any thread tests `count`, all n see `count == n` and signal. On most schedules, though, only one thread passes |
| 5 | Why does placing `barrier.wait(); barrier.signal()` inside the mutex always deadlock? | The first thread blocks on `barrier` while holding the mutex, so `count` can never reach n |
| 6 | Bounded buffer: what goes wrong if (a) the consumer takes the mutex before `items`, (b) the mutex is removed with two producers, (c) `spaces = 0`, (d) `items = 1`? | (a) deadlock on an empty buffer; (b) an overwritten slot; (c) immediate deadlock; (d) a consumer reads an empty slot |
| 7 | Why does the lightswitch need its own mutex? | Without it, two readers can both increment before either tests. Both see 2, nobody locks `roomEmpty`, and a writer enters alongside a reader |
| 8 | Name the Coffman condition broken by the footman, the left-handed philosopher, the waiter and Tanenbaum's solution | Circular wait; circular wait; no partial holding (both forks or none); hold and wait |
| 9 | Is Tanenbaum's solution deadlock-free? Starvation-free? | Deadlock-free; not starvation-free (Gingras's cycle) |
| 10 | What breaks when Downey's one-barber code runs with two barbers? | A barber can consume another customer's `customerDone` and call the next customer while its own is still in the chair. Fix: pass per-customer semaphores through a FIFO queue |
| 11 | True or false: a semaphore initialized to 1 behaves exactly like a lock | False. It has no owner, so an extra signal makes the value 2 and admits two threads |
| 12 | Give two POSIX ways to make a parent print only after its child has run | A named semaphore created with value 0 before `fork` (the child posts, the parent waits, then `sem_unlink`); or `sem_init(s, 1, 0)` on a `sem_t` in `MAP_SHARED` memory, which works on Linux but not on macOS |

Answers follow [LBoS](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf), [OSTEP ch. 31](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf), [CS162 Spring 2023 MT1 solutions](https://cs162.org/static/exams/sp23-mt1-solutions.pdf) and [sem_overview(7)](https://man7.org/linux/man-pages/man7/sem_overview.7.html); answers 3–7 and 9–10 were confirmed by exhaustive model checking.

## A dozen conventions split the sources, and macOS splits from Linux

The fastest way to lose marks with a correct method is to apply a convention the grader does not share. These notes deliberately did not consult the class slides and no Inha past papers were available, so the safe practice is to write the convention you are using at the top of every computational answer.

| Question | One source | Another source | What to write |
|---|---|---|---|
| Can a semaphore's value be negative? | Yes; \|value\| = number of waiters ([LBoS](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf); [OSC10 ch. 6](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch6.pptx); [OSTEP ch. 31](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)) | No, never below 0 ([sem_overview(7)](https://man7.org/linux/man-pages/man7/sem_overview.7.html); [CMU L25](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/25-sync-advanced.pdf); [CS162 SP23](https://cs162.org/static/exams/sp23-mt1-solutions.pdf)) | value and queue columns; name the convention |
| RR: a job arrives at the instant a quantum expires | arrival-first ([GeeksforGeeks](https://www.geeksforgeeks.org/operating-systems/round-robin-scheduling-with-different-arrival-times/); [Process Scheduling Solver](https://raw.githubusercontent.com/boonsuen/process-scheduling-solver/HEAD/src/algorithms/rr.ts)) | preempted-first ([mlfq.py](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched-mlfq/mlfq.py)) | state it (10.6 versus 11.6 on W1) |
| Is a small priority number high? | yes ([OSC10 ch. 5](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx); Linux nice −20 = most CPU, [sched(7)](https://man7.org/linux/man-pages/man7/sched.7.html)) | "no agreed-upon convention" ([UIC notes](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/6_CPU_Scheduling.html)) | assume small = high unless told otherwise, and say so |
| MLFQ queue numbering | Q0 is the top ([OSC10 ch. 5](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)) | the highest number is the top ([OSTEP ch. 8](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf); `mlfq.py`) | write "top" and "bottom" |
| Response time | time of first run ([OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)) | time the first response is produced ([OSC10 ch. 5](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)) | first run, for by-hand problems |
| Is the very first dispatch charged as a context switch? | some say yes, some no; "both were OK by me" ([CS537 Spring 2009 key](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/09-spring-mid-answers.pdf)) | — | state it |
| What "SJF" means | non-preemptive; the preemptive version is STCF ([OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)) | preemptive SJF is called SRTF ([OSC10 ch. 5](https://www.os-book.com/OS10/slide-dir/PPTX-dir/ch5.pptx)) | write "non-preemptive SJF" or "SRTF" |
| MLFQ boost order, and where a preempted job resumes | `mlfq.py` moves the bottom queue up first; a preempted job keeps its place at the head of its queue ([mlfq.py](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched-mlfq/mlfq.py)) | OSTEP's rules leave both open | state them (13.33 versus 12.0 in the example) |
| Is `fork()` async-signal-safe? | yes ([CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf), 2015) | no longer required; `_Fork()` added ([POSIX.1-2024](https://pubs.opengroup.org/onlinepubs/9799919799/functions/_Fork.html)) | mention both |
| What `signal()` installs | System V semantics in the Linux system call ([signal(2)](https://man7.org/linux/man-pages/man2/signal.2.html)) | BSD semantics in glibc's wrapper ([signal(2)](https://man7.org/linux/man-pages/man2/signal.2.html)) and on macOS | use `sigaction` with explicit flags |
| Default `listen` backlog cap | "about 20" (Beej), "128-ish" (CMU) | 4096 since Linux 5.4 ([listen(2)](https://man7.org/linux/man-pages/man2/listen.2.html)) | cite listen(2) |
| Nonblocking FIFO read with a writer present | returns 0 bytes ([Beej IPC](https://beej.us/guide/bgipc/html/)) | fails with `EAGAIN` ([pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)) | use pipe(7) |
| What "Dijkstra's solution" to the philosophers means | the asymmetric fork order ([OSTEP ch. 31](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)) | the state-based solution "with changes by Tanenbaum" ([Wikipedia](https://en.wikipedia.org/wiki/Dining_philosophers_problem)) | describe the mechanism, not the name |
| Linux's scheduler | CFS (OSTEP's calculation model; Silberschatz slides) | EEVDF since Linux 6.6 ([OSTEP ch. 9](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf); [KernelNewbies 6.6](https://kernelnewbies.org/Linux_6.6)) | compute with OSTEP's CFS model; say EEVDF is current |

Exams assume Linux. The differences below come from local tests on macOS 27 unless a source is cited, and the first two rows carry the key lesson: signal **names** are portable, signal **numbers** are not.

| Item | Linux | macOS | Consequence |
|---|---|---|---|
| SIGUSR1 / SIGUSR2 | 10 / 12 ([signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)) | 30 / 31 | never hard-code signal numbers |
| SIGCHLD, SIGCONT, SIGSTOP, SIGTSTP, SIGBUS | 17, 18, 19, 20, 7 | 20, 19, 17, 18, 10 | 128 + n statuses differ: bash's `wait`, interrupted by a trapped SIGUSR1, returned 158 on macOS; Linux gives 138 |
| An orphan's new parent | init (1) or the nearest subreaper ([PR_SET_CHILD_SUBREAPER](https://man7.org/linux/man-pages/man2/PR_SET_CHILD_SUBREAPER.2const.html)) | launchd, PID 1 | answer "init or a subreaper" |
| PIPE_BUF | 4096 ([pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)) | 512 | atomic-write answers differ |
| POSIX message queues | available; link with `-lrt` ([mq_overview(7)](https://man7.org/linux/man-pages/man7/mq_overview.7.html)) | no `<mqueue.h>` | run queue code on Linux |
| Unnamed process-shared semaphores | `sem_init(s, 1, v)` works in shared memory ([sem_init(3)](https://man7.org/linux/man-pages/man3/sem_init.3.html)) | −1 with `ENOSYS` | use `sem_open` on a Mac |
| `msgrcv` with negative msgtyp | first message of the lowest type ≤ \|msgtyp\| ([Linux ipc/msg.c](https://github.com/torvalds/linux/blob/master/ipc/msg.c)) | first message with type ≤ \|msgtyp\| ([XNU sysv_msg.c](https://github.com/apple-oss-distributions/xnu/blob/main/bsd/kern/sysv_msg.c)) | answer with the Linux rule |
| `SO_PEERCRED` | available ([unix(7)](https://man7.org/linux/man-pages/man7/unix.7.html)) | absent; use `getpeereid()` | — |
| TIME_WAIT | 60 s ([tcp.h](https://github.com/torvalds/linux/blob/master/include/net/tcp.h)) | MSL reported as 15 s; 2 × MSL = 30 s is unverified | — |
| Inspecting descriptors | `/proc/PID/fd` | `lsof -p PID` | — |
| `execvpe` | glibc extension ([exec(3)](https://man7.org/linux/man-pages/man3/exec.3.html)) | absent (macOS has `execvP` instead) | stick to the six POSIX forms |
| Default shell | bash 5.x | bash 3.2.57, with zsh as the login shell; `echo hi \| read y` leaves `y` set in zsh but empty in bash | test shell answers in bash on Linux |

The traps that recur across all four topics are short enough to memorize as rule pairs.

| Trap | Rule that prevents it |
|---|---|
| Assuming the parent (or child) runs first | answer with every topological sort of the process graph |
| Counting `printf` calls | count buffer copies; look for a missing `\n` or redirected output before `fork` |
| `exit()` in a forked child or after a failed exec | use `_exit()`, so duplicated buffers and `atexit` handlers do not run twice |
| `WEXITSTATUS` without `WIFEXITED`, or passing `&status` | check `WIFEXITED` first; the macros take the int |
| One `wait` per SIGCHLD | loop on `waitpid(-1, …, WNOHANG)` |
| `printf`, `malloc` or `exit` inside a handler | only async-signal-safe calls; save `errno`; use `volatile sig_atomic_t` flags |
| Assuming `SA_RESTART` restarts everything | `pause`, `sigsuspend`, `select`, `poll`, `nanosleep` and `sleep` are never restarted |
| Leaving an unused pipe end open, including the reader's own write end | close every descriptor a process does not use, after every `dup2` |
| Expecting message boundaries from a pipe or TCP | frame messages, and loop on short reads and writes |
| Scheduling a job before it arrives | only jobs that have arrived are candidates (SJF on W1 runs A first) |
| Comparing SRTF against the original burst | compare against the running job's remaining time, and preempt only when strictly shorter |
| Leaving the CPU idle in RR | a job that finishes early frees the CPU at once; when a quantum expires with an empty queue, the same job continues |
| Swapping MLFQ's Rule 4 and Rule 5 | Rule 4 (accounting) stops gaming; Rule 5 (boost) stops starvation |
| Waiting on a semaphore while holding a mutex | take counting semaphores first and the mutex last; release the mutex before signalling |
| Claiming a solution cannot starve | only with strong (FIFO) semaphores, and never for reader preference or Tanenbaum |
| Forgetting `close(connfd)` in a fork server's parent | the client never sees EOF, and the server leaks descriptors until `EMFILE` |

Sources: [TLPI ch. 24](https://man7.org/tlpi/download/TLPI-24-Process_Creation.pdf), [CMU L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf), [setbuf(3)](https://man7.org/linux/man-pages/man3/setbuf.3.html), [vfork(2)](https://man7.org/linux/man-pages/man2/vfork.2.html), [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html), [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html), [signal-safety(7)](https://man7.org/linux/man-pages/man7/signal-safety.7.html), [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html), [tcp(7)](https://man7.org/linux/man-pages/man7/tcp.7.html), [OSTEP ch. 7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf), [OSTEP ch. 8](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf), [LBoS](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf), [CMU F25 L21](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/21-concprog.pdf).

## Seven days of drawing, verifying and explaining aloud

Study each topic with the same four moves. **Draw** the topic's picture by hand: a process graph, a descriptor table with reference counts, the pending and blocked bitmasks, a Gantt chart with its conventions written above it, or a semaphore table with value and queue columns. **Predict** the answer from the picture alone. **Verify** it with a tool that lists every possibility, never with a single run of real code, since one run cannot show what else could have happened. Then **explain** it aloud in about two minutes, because grades depend on oral explanation of code. A reliable narration covers which processes or threads exist at this line, what each copy holds (variables, descriptors and reference counts, the stdio buffer, the signal mask and pending bits, handlers, semaphore values and queues), and what would break if this line were deleted. That last part demonstrates real understanding, as in "without `close(p[1])` the write end's reference count stays at 1, so `wc` never sees EOF". Phrases worth having ready are "a copy of the address space, but shared open file descriptions", "the pending set is a bitmask, so signals merge", "exec keeps the process and replaces the program", "handled signals are reset by exec, ignored ones stay ignored", and "a zombie is dead but not yet reaped; an orphan's parent is dead". The plan starts with the workshop topics (process graphs, pipes and signals), so that this week's workshop works as a rehearsal.

| Day | Focus | Read (all free) | You are done when you can |
|---|---|---|---|
| Mon 19 Oct | fork, exec, wait, buffering, zombies and orphans | OSTEP ch. 5; CMU F15 L14; fork(2), execve(2), wait(2) | redraw the fork2 graph and the wait example from memory; solve 10 `generator.py` puzzles and check them with `-c`; reproduce the buffer table |
| Tue 20 Oct | signals, sigaction, masks, SIGCHLD, the shell and job control | CMU F15 L15; signal(7), sigaction(2), signal-safety(7); Bash manual §3.7 and §7 | write the SIGCHLD handler from memory and justify every line; decode the `$?` list; narrate Ctrl-Z, `bg`, `kill %1` |
| Wed 21 Oct | pipes, dup2, FIFOs, pipelines | pipe(7), dup(2), fifo(7); CMU F25 L18; UIUC CS 341 IPC; xv6 book ch. 1 | redraw Traces A and B and the N-stage loop; diagnose Bugs A–D; do the MIT pipe quiz questions |
| Thu 22 Oct | CPU scheduling by hand, MLFQ | OSTEP ch. 6–8; OSC10 ch. 5 slides; CS537 midterm keys | reproduce all seven W1 charts under both RR conventions; solve 5 fresh `scheduler.py` and `mlfq.py` problems |
| Fri 23 Oct | message queues, shared memory, sockets, concurrent servers | Kerrisk LCA 2013; mq_overview(7), msgop(2), shm_overview(7); Beej's network guide §5–7; CMU F25 L21 | answer queue-order questions; draw the counter race; draw Trace D and the server-design table |
| Sat 24 Oct | semaphore semantics, patterns, precedence graphs, output enumeration, producer-consumer | LBoS ch. 2–4.2; OSTEP ch. 31; Deadlock Empire "Semaphores" levels | rebuild the pattern table; convert the 7-node graph to code; count outputs; trace the producer-consumer deadlock |
| Sun 25 Oct | readers-writers, sleeping barber, dining philosophers; mock oral | LBoS §4.3, 4.5, 5.2–5.3; OSC10 ch. 7–8 slides; CS162 FA19 MT1 | trace writer starvation and the philosophers' deadlock; record two-minute explanations of five code samples |
| Exam week, before your slot | mixed timed sets and one mock oral a day | the practice tables above; the CS537, CS162 and MIT keys | finish each practice table cold, with conventions stated |

| Resource | Best for | Link |
|---|---|---|
| OSTEP ch. 5–8, 26 and 30–33 | the course's own model: process API, metrics, MLFQ, races, semaphores, deadlock conditions, event-driven servers | [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/) |
| CMU 15-213 slides (F15 L14, L15, L25; F25 L18, L20, L21) | process graphs, signals and handler guidelines, the three-table model, sockets, server designs | [L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf), [L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf), [F25 L21](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/21-concprog.pdf) |
| man7.org Linux man pages | the exact rules for every system call above | [man7.org](https://man7.org/linux/man-pages/) |
| TLPI free sample chapters 24 and 52 | process creation; POSIX versus System V message queues | [TLPI](https://man7.org/tlpi/) |
| Kerrisk, "An introduction to Linux IPC facilities" | a one-hour map of every IPC facility, with the persistence table | [LCA 2013 slides](https://man7.org/conf/lca2013/IPC_Overview-LCA-2013-printable.pdf) |
| Beej's guides | IPC examples; sockets, `sendall`, framing, `poll` | [IPC](https://beej.us/guide/bgipc/html/), [network](https://beej.us/guide/bgnet/html/) |
| Bash Reference Manual | exit status, job control, `trap` | [manual](https://tiswww.case.edu/php/chet/bash/bashref.html) |
| Silberschatz OSC 10e official slides, ch. 5–8 | classic P1…Pn scheduling problems; semaphore implementation; classical problems; deadlock | [slide index](https://www.os-book.com/OS10/slide-dir/index.html) |
| Downey, *The Little Book of Semaphores* | every pattern and classical problem, with hints and solutions | [PDF](https://greenteapress.com/semaphores/LittleBookOfSemaphores.pdf) |
| UW-Madison CS537 midterm keys | scheduling questions with official answers | [old exams](https://pages.cs.wisc.edu/~remzi/Classes/537/OldExams/) |
| Berkeley CS162 midterm 1 solutions | semaphore output and semantics questions | [FA19](https://cs162.org/static/exams/fa19-mt1-solutions.pdf), [SP23](https://cs162.org/static/exams/sp23-mt1-solutions.pdf) |
| MIT 6.1810 quizzes and the xv6 book | pipe questions with solutions; descriptors and redirection | [quizzes](https://pdos.csail.mit.edu/6.1810/2025/quiz.html), [xv6 book](https://pdos.csail.mit.edu/6.1810/2025/xv6/book-riscv-rev5.pdf) |
| UIUC CS 341 coursebook | pipe gotchas, FIFOs that hang, networking | [IPC](https://cs341.cs.illinois.edu/coursebook/Ipc), [Networking](https://cs341.cs.illinois.edu/coursebook/Networking) |

| Tool | Use it for | Caveat |
|---|---|---|
| OSTEP `generator.py` (cpu-api) | unlimited random fork/wait/exit programs; `-c` prints the answer | — ([README](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-api/README-generator.md)) |
| `forkenum.py` (notes folder) | every output of a fork/wait/print program, as topological sorts | programs are written as nested Python lists; runs on its own |
| `runmany.py` (notes folder) | running a compiled program many times, through a terminal or a pipe | frequencies show what is likely, not what is possible |
| OSTEP `scheduler.py` | FIFO, SJF and RR problems with `-c` answers | every job arrives at t = 0 ([README](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched/README.md)) |
| OSTEP `mlfq.py` | MLFQ traces; `-n 1` gives RR with arrival times | uses preempted-first ties; allotments count quanta ([README](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-sched-mlfq/README.md)) |
| Process Scheduling Solver | Gantt charts for FCFS, SJF, SRTF, RR and priority, with arrival times | uses arrival-first RR; smaller number = higher priority ([app](https://process-scheduling-solver.boonsuen.com/)) |
| `sched_verify.py` (scheduling notes, §12) | switching the RR tie rule, the switch cost and the priority direction | copy the code block out of the notes first |
| The Deadlock Empire | practising against adversarial interleavings; the "Semaphores" chapter | — ([site](https://deadlockempire.github.io/)) |
| OSTEP `threads-sema` homework | completing fork-join, rendezvous, barrier and reader-writer skeletons | compile with `-pthread` on Linux ([repo](https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/threads-sema)) |
| `posix_sem_demo.c` (notes folder) | a named-semaphore producer-consumer across `fork` | runs on macOS; unnamed `sem_init` does not |
| A Linux machine or VM | `/proc/PID/fd`, POSIX message queues, unnamed semaphores, Linux signal numbers | see the macOS table |
| `ipcs`, `ipcrm`, `ls /dev/shm /dev/mqueue` | finding leaked IPC objects | System V and POSIX objects persist in the kernel |

Two practical notes about the notes folder itself. The semaphore model files (`m_patterns.py`, `m_classic.py`, `m_dp.py`, `m_barber.py`, `m_extra.py`) import a model-checking engine that was not saved with them, so they do not run as they stand, and `semsim.py` contains only a small step-by-step simulator. Each of the four notes files also ends with 20 further practice questions with answers, which make a good second pass after the tables above.

## Conclusion

The four midterm topics are one idea in four forms: reasoning about the order of events over a small piece of state. Fork outputs, semaphore outputs and precedence graphs are all topological sorts of a happens-before graph; pipe EOF, SIGPIPE and the teardown of a fork server's connection all happen when a reference count reaches zero; and a pending signal behaves like a semaphore whose count stops at 1, which is exactly why signals cannot count dead children while semaphores can count buffer slots. A student who can draw the graph, the reference-count table, the bitmask and the value-plus-queue table can work out most answers instead of recalling them, and can keep working them out under oral follow-up questions, which a memorized answer cannot survive. The same view explains why running code is a poor guide to what is possible: on macOS the parent printed first 148 times out of 150, and a shared-memory race lost 415,375 updates in one run and none in the next, so only enumeration and simulation reveal the full set of outcomes.

The remaining risk is convention, not understanding. No Inha past papers or answer keys were available and the class slides were deliberately not consulted, so three items deserve a check against the slides, or a question to the instructor, before the exam: whether semaphore values may go negative in traces, which Round Robin tie rule applies, and which direction priority numbers run. Where the answer stays unclear, writing the convention above the working takes ten seconds and protects every number that follows.
