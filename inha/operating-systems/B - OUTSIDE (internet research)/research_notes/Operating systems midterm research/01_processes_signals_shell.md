# Unix/Linux Processes, Signals and the Shell — exam-oriented outside notes (SOC3010 midterm, Fall 2026)

How these notes were produced (read once): every man-page quote below was checked against the raw text of the man7.org pages (man-pages 6.19 tarball), not against an automated summary. The CMU 15-213 slides (Fall 2015, public), the OSTEP chapter 5 PDF, the free TLPI chapter 24 sample, the Bash 5.3 Reference Manual and POSIX.1-2024 were read the same way. Every "predict the output" program in section 8 was compiled with Apple clang 21.0.0 on macOS 27.0.1 (arm64) and run many times. Runs used both a pseudo-terminal (`script -q /dev/null ./prog`, so stdout is line-buffered as in a real terminal) and a pipe (`./prog | cat`, fully buffered). The set of "all possible outputs" was computed by a small exhaustive enumerator that lists every topological sort of the process graph. Every observed run was checked to fall inside that set. Linux-only behaviour (subreapers, PID namespaces) could not be run locally and is cited from the man pages.

---

## 1. fork(): what is copied vs shared, return values, process graphs, counting processes, and the printf-without-newline duplication trap

### Takeaway
`fork()` is "called once, returns twice". It returns 0 in the child, the child's PID in the parent, and -1 on failure (no child is created). The child gets a *copy* of the parent's memory: copy-on-write pages, including the user-space stdio buffer. It also gets *copies of file descriptors that point to the same open file descriptions*, so the file offset is shared. Output-ordering questions are answered by drawing the process graph and listing its topological sorts. Duplicated output comes from duplicated stdio buffers, not from duplicated `printf` calls.

### Cited Findings

**Return values / basic model**
- "On success, the PID of the child process is returned in the parent, and 0 is returned in the child. On failure, -1 is returned in the parent, no child process is created, and errno is set to indicate the error." — [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)
- "fork() creates a new process by duplicating the calling process." "The child process and the parent process run in separate memory spaces. At the time of fork() both memory spaces have the same content. Memory writes, file mappings (mmap(2)), and unmappings (munmap(2)) performed by one of the processes do not affect the other." — [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)
- CMU summary bullets: "Call once, return twice"; "Concurrent execution — Can't predict execution order of parent and child"; "Duplicate but separate address space — x has a value of 1 when fork returns in parent and child; Subsequent changes to x are independent"; "Shared open files — stdout is the same in both parent and child". — [CMU 15-213 F15 Lecture 14 (Processes)](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf)
- OSTEP: the child "doesn't start running at main() ... rather, it just comes into life as if it had called fork() itself". The child "now has its own copy of the address space (i.e., its own private memory), its own registers, its own PC". OSTEP also notes that the output of p1.c "is not **deterministic**" because the CPU scheduler decides which process runs. — [OSTEP ch. 5 "Interlude: Process API"](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf)
- Copy-on-write: "Under Linux, fork() is implemented using copy-on-write pages, so the only penalty that it incurs is the time and memory required to duplicate the parent's page tables, and to create a unique task structure for the child." — [fork(2) NOTES](https://man7.org/linux/man-pages/man2/fork.2.html)
- ERRORS: `EAGAIN` when a process or thread limit is hit (RLIMIT_NPROC, `/proc/sys/kernel/threads-max`, `/proc/sys/kernel/pid_max`, cgroup `pids.max`). `ENOMEM` when memory is tight, or when creating a child in a PID namespace whose init has terminated. — [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)

**What differs in the child (exam list; the POSIX items)**
- "The child process is an exact duplicate of the parent process except for the following points:"
  - its own unique PID, which "does not match the ID of any existing process group (setpgid(2)) or session";
  - PPID = parent's PID;
  - no memory locks;
  - resource usage and CPU time counters reset to zero;
  - "The child's set of pending signals is initially empty";
  - no semaphore adjustments;
  - no process-associated record locks (fcntl) — "(On the other hand, it does inherit fcntl(2) open file description locks and flock(2) locks from its parent.)";
  - "The child does not inherit timers from its parent (setitimer(2), alarm(2), timer_create(2))";
  - no outstanding async I/O. — [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)
- Linux-specific differences: the `PR_SET_PDEATHSIG` setting is reset; "The termination signal of the child is always SIGCHLD"; `MADV_DONTFORK` mappings are not inherited; `MADV_WIPEONFORK` ranges are zeroed. — [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)
- Threads: "The child process is created with a single thread—the one that called fork()." "After a fork() in a multithreaded program, the child can safely call only async-signal-safe functions (see signal-safety(7)) until such time as it calls execve(2)." — [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)

**What is shared (the file-descriptor rule)**
- "The child inherits copies of the parent's set of open file descriptors. Each file descriptor in the child refers to the same open file description (see open(2)) as the corresponding file descriptor in the parent. This means that the two file descriptors share open file status flags, file offset, and signal-driven I/O attributes". — [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)
- TLPI repeats the rule: the open file description holds the current file offset and the open file status flags, so "these attributes of an open file are shared between the parent and child". — [TLPI ch. 24 §24.2.1 (free sample)](https://man7.org/tlpi/download/TLPI-24-Process_Creation.pdf)
- New in POSIX.1-2024: "The child process shall have its own copy of the parent's file descriptors, except for those whose FD_CLOFORK flag is set". — [POSIX.1-2024 fork()/_Fork()](https://pubs.opengroup.org/onlinepubs/9799919799/functions/_Fork.html)
- Also inherited, from other pages:
  - signal dispositions and the signal mask ("A child created via fork(2) inherits a copy of its parent's signal dispositions"; "inherits a copy of its parent's signal mask") — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html);
  - session ID and process group ID — [credentials(7)](https://man7.org/linux/man-pages/man7/credentials.7.html).
  - Alarms are "not inherited by children created via fork(2)" — [alarm(2)](https://man7.org/linux/man-pages/man2/alarm.2.html).

**Who runs first?**
- "After a fork(), it is indeterminate which process—the parent or the child—next has access to the CPU. (On a multiprocessor system, they may both simultaneously get access to a CPU.)" Linux 2.6 had run the child first. "since Linux 2.6.32, it is once more the parent that is, by default, run first after a fork()", and the default can be changed via `/proc/sys/kernel/sched_child_runs_first`. — [TLPI ch. 24 §24.4 (2010)](https://man7.org/tlpi/download/TLPI-24-Process_Creation.pdf)
- Local observation (macOS 27): in 150 terminal runs of the CMU `fork.c` example, the parent's line came first 148 times. The child's line came first 2 times. So both orders really happen. — verified locally; semantics per [CMU L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf)

**Process graphs (the exam technique)**
- "A process graph is a useful tool for capturing the partial ordering of statements in a concurrent program: Each vertex is the execution of a statement; a -> b means a happens before b; Edges can be labeled with current value of variables; printf vertices can be labeled with output; Each graph begins with a vertex with no inedges. Any topological sort of the graph corresponds to a feasible total ordering. Total ordering of vertices where all edges point from left to right". — [CMU 15-213 F15 L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf)
- CMU's own feasible/infeasible pairs, all reproduced by the enumerator in section 8:
  - fork2: feasible `L0 L1 Bye Bye L1 Bye Bye`; infeasible `L0 Bye L1 Bye L1 Bye Bye`;
  - fork4: feasible `L0 L1 Bye Bye L2 Bye`; infeasible `L0 Bye L1 Bye Bye L2`;
  - fork5: feasible `L0 Bye L1 L2 Bye Bye`; infeasible `L0 Bye L1 Bye Bye L2`;
  - fork9 (wait): feasible `HC HP CT Bye`; infeasible `HP CT Bye HC`. — [CMU L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf)
- The `wait` edge: "Parent reaps a child by calling the wait function ... Suspends current process until one of its children terminates". In the graph this adds an edge from the child's `exit` to the vertex after the parent's `wait`. — [CMU L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf)

**Counting processes (verified)**
- `n` unconditional `fork()` calls in sequence or in a loop, with no `exit`/`break` in between, give 2^n processes in total (2^n - 1 newly created). The tree is a binomial tree: for n=3 there are 1+3+3+1 = 8 processes and 8 copies of a final `printf`. Verified locally (8 "hi" lines in every run) and by the enumerator (processes=8). The process tree is shown in section 8, WP5. — fork semantics per [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)
- With a `printf` inside the loop (`for(i<n){fork(); printf(i);}`) there are still 2^n processes but 2 + 4 + ... + 2^n = 2^(n+1) - 2 lines. For n=3 that is 14 lines: two 0s, four 1s, eight 2s. Verified locally and by the enumerator (279 distinct orderings for n=3).

**The stdio-buffer duplication trap**
- Buffering modes: "The three types of buffering available are unbuffered, block buffered, and line buffered ... Normally, all files are block buffered. If a stream refers to a terminal (as stdout normally does), it is line buffered. The standard error stream stderr is always unbuffered by default." — [setbuf(3)](https://man7.org/linux/man-pages/man3/setbuf.3.html)
- "The stream stdout is line-buffered when it points to a terminal. Partial lines will not appear until fflush(3) or exit(3) is called, or a newline is printed." — [stdout(3)](https://man7.org/linux/man-pages/man3/stdout.3.html)
- `exit()`: "All open stdio(3) streams are flushed and closed." — [exit(3)](https://man7.org/linux/man-pages/man3/exit.3.html). `_exit()`: "Open stdio(3) streams are not flushed." — [_exit(2)](https://man7.org/linux/man-pages/man2/_exit.2.html)
- vfork(2) warns that a child calling `exit(3)` would have "the effect of calling exit handlers established by the parent process and flushing the parent's stdio(3) buffers". — [vfork(2)](https://man7.org/linux/man-pages/man2/vfork.2.html). TLPI: "If the exec() call fails, the child process should terminate using _exit()." — [TLPI ch. 24](https://man7.org/tlpi/download/TLPI-24-Process_Creation.pdf)
- Verified locally (details in section 8, WP12):
  - `printf("A"); fork(); ...` prints `A` twice.
  - `printf("hello\n"); fork();` prints `hello` once on a terminal but **twice** when piped or redirected to a file.
  - `for(i<2){fork(); printf("-");}` prints **8** dashes, not 6. With `"-\n"` it prints 6 on a terminal and 8 into a pipe.

### Inferences
- One sentence explains every buffering puzzle. The stdio buffer is ordinary user memory: **fork copies it, exec destroys it, `_exit` discards it, `exit`/return-from-main flushes it**, and a newline flushes it only when stdout is a terminal. When explaining in person, say which buffer copy each process holds at the moment of `fork`.
- Writes through *file descriptors* are never duplicated by fork (there is no user buffer). Writes through *stdio* can be. This is why the CMU slides use `write` (via SIO) in handlers and why `fflush(stdout)` before `fork()` is a common fix.
- For "all possible outputs" questions:
  1. Draw one horizontal line per process.
  2. Add fork edges, plus wait edges (child exit → after the parent's wait).
  3. List the topological sorts.
  4. Collapse sorts that print identical strings. Identical labels (e.g., four "Bye") make the number of distinct output strings much smaller than the number of interleavings.

### Gaps
- TLPI's "parent runs first since 2.6.32" statement dates from 2010. I did not verify the default on current (6.x) kernels, and it should never be relied on anyway.
- CMU's current-semester (F23) slides redirect to a CMU login, so the public Fall 2015 versions were used. Their content matches the CS:APP 3e lectures.

---

## 2. exec family: l/v/p/e variants; what survives exec; why fork and exec are separate

### Takeaway
`exec*` replaces the *program* (code, data, heap, stack, and therefore the stdio buffers) inside the *same process*. The PID, parent, open fds (unless close-on-exec), signal mask, pending signals, ignored dispositions and alarm survive. Caught-signal handlers are reset to the default. A successful exec never returns, so code after it runs only on failure. fork and exec are separate so the shell can rearrange fds (redirection, pipes) in the child between the two calls.

### Cited Findings
- "execve() executes the program referred to by path. This causes the program that is currently being run by the calling process to be replaced with a new program, with newly initialized stack, heap, and (initialized and uninitialized) data segments." — [execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html)
- "execve() does not return on success, and the text, initialized data, uninitialized data (bss), and stack of the calling process are overwritten according to the contents of the newly loaded program." RETURN VALUE: "On success, execve() does not return, on error -1 is returned, and errno is set to indicate the error." — [execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html)
- argv/envp: "By convention, the first of these strings (i.e., argv[0]) should contain the filename associated with the file being executed. The argv array must be terminated by a null pointer." "The envp array must be terminated by a null pointer." — [execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html)
- **Not preserved** ("All process attributes are preserved during an execve(), except the following"; POSIX items):
  - "The dispositions of any signals that are being caught are reset to the default";
  - the alternate signal stack;
  - memory mappings;
  - attached System V shared memory;
  - POSIX shared memory regions;
  - POSIX message queue descriptors;
  - named semaphores;
  - POSIX timers;
  - open directory streams;
  - memory locks;
  - "Exit handlers are not preserved (atexit(3), on_exit(3))";
  - the floating-point environment.

  Linux-specific items: the dumpable flag, KEEPCAPS, PDEATHSIG (for set-UID programs), the process name (`comm`), SECBIT_KEEP_CAPS, the termination signal (reset to SIGCHLD), and the fd table is unshared. — [execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html)
- Threads: "All threads other than the calling thread are destroyed during an execve()." — [execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html)
- Ignored signals: "POSIX.1 specifies that the dispositions of any signals that are ignored or set to the default are left unchanged. POSIX.1 specifies one exception: if SIGCHLD is being ignored, then an implementation may leave the disposition unchanged or reset it to the default; Linux does the former." — [execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html). Also: "During an execve(2), the dispositions of handled signals are reset to the default; the dispositions of ignored signals are left unchanged." — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
- File descriptors: "By default, file descriptors remain open across an execve(). File descriptors that are marked close-on-exec are closed; see the description of FD_CLOEXEC in fcntl(2)." — [execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html)
- Identity preserved: "A process's PID is preserved across an execve(2)." "A process's PPID is preserved across an execve(2)." "A process's session ID and process group ID are preserved across an execve(2)." — [credentials(7)](https://man7.org/linux/man-pages/man7/credentials.7.html)
- The signal mask "is preserved across execve(2)"; "the pending signal set is preserved across an execve(2)". — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html). Alarms "are preserved across execve(2)". — [alarm(2)](https://man7.org/linux/man-pages/man2/alarm.2.html)
- CMU's one-line version: execve "Overwrites code, data, and stack — Retains PID, open files and signal context"; "Called once and never returns — …except if there is an error". — [CMU L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf). Note: "signal context" means the mask and pending set; *handlers* are reset, per [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html).
- **Naming of the variants**: "The exec() family of functions replaces the current process image with a new process image ... layered on top of execve(2)." The letters mean:
  - **l** (`execl`, `execlp`, `execle`): arguments as a list arg0, arg1, …, which "must be terminated by a null pointer, and, since these are variadic functions, this pointer must be cast (char *) NULL";
  - **v** (`execv`, `execvp`, `execvpe`): arguments as an array;
  - **e** (`execle`, `execvpe`): the caller supplies `envp`, otherwise "take the environment ... from the external variable environ";
  - **p** (`execlp`, `execvp`, `execvpe`): "duplicate the actions of the shell in searching for an executable file if the specified filename does not contain a slash (/) character" using PATH. EACCES makes the search continue; on ENOEXEC the file is run with `/bin/sh`.

  "The exec() functions return only if an error has occurred. The return value is -1". `execvpe()` needs `_GNU_SOURCE` (a glibc extension). — [exec(3)](https://man7.org/linux/man-pages/man3/exec.3.html)
- macOS difference (verified locally): the macOS SDK `<unistd.h>` declares `execvP` but **not** `execvpe`. The six POSIX forms exist on both systems. OSTEP's list of Linux variants is "execl(), execlp(), execle(), execv(), execvp(), and execvpe()". — [OSTEP ch. 5 footnote 3](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf)
- Errors to recognise: ENOENT (path or interpreter missing), EACCES (no execute/search permission or noexec mount), ENOEXEC (unrecognised format), E2BIG (argument+environment too large). — [execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html)
- **Why fork and exec are separate**: "the separation of fork() and exec() is essential in building a UNIX shell, because it lets the shell run code after the call to fork() but before the call to exec(); this code can alter the environment of the about-to-be-run program, and thus enables a variety of interesting features to be readily built." For `wc p3.c > newfile.txt`: "when the child is created, before calling exec(), the shell (specifically, the code executed in the child process) closes standard output and opens the file newfile.txt". This works because "UNIX systems start looking for free file descriptors at zero" and "open file descriptors are kept open across the exec() call". "UNIX pipes are implemented in a similar way, but with the pipe() system call." — [OSTEP ch. 5 §5.4 and Figure 5.4 p4.c](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf)
- The critique: OSTEP points to Baumann et al., "A fork() in the road" (HotOS '19), which "details some problems with fork(), and advocates for other, simpler process creation APIs such as spawn()". — [OSTEP ch. 5 §5.7](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf)
- `system(3)` is fork+exec+wait in one call. It "behaves as if it used fork(2) to create a child process that executed the shell command specified in command using execl(3) as follows: execl("/bin/sh", "sh", "-c", command, (char *) NULL);". "During execution of the command, SIGCHLD will be blocked, and SIGINT and SIGQUIT will be ignored, in the process that calls system()". "If a shell could not be executed in the child process, then the return value is as though the child shell terminated by calling _exit(3) with the status 127." — [system(3)](https://man7.org/linux/man-pages/man3/system.3.html)
- `vfork()`: "the calling thread is suspended until the child terminates ... or it makes a call to execve(2). Until that point, the child shares all memory with its parent, including the stack." — [vfork(2)](https://man7.org/linux/man-pages/man2/vfork.2.html)

### Inferences
- Exam phrasing: **exec keeps the process, replaces the program.** Kernel-side state attached to the process (PID, PPID, PGID/SID, fd table, mask, pending set, ignored dispositions, alarm) stays. Everything that lives in user memory or points into it (variables, heap, stdio buffers, handler addresses, atexit list) is gone. Handlers *must* be reset because the handler's code address no longer exists after exec. SIG_IGN and SIG_DFL contain no address, so they can survive.
- Because code after `exec` runs only if exec failed, always follow it with an error message and `_exit(127)` (or similar). Use `_exit`, not `exit`, in a forked child, so the parent's copied stdio buffers are not flushed twice.
- The verified traps (section 8, WP13) are worth memorising. `printf("A ")` with no newline before exec is lost. A `SIG_IGN` set by the parent is still in effect in the exec'd program; a handler is not.

### Gaps
- None material. `posix_spawn(3)` exists as a combined fork+exec alternative on both Linux and macOS, but its details were not studied for these notes.

---

## 3. wait/waitpid; status macros; zombies vs orphans; reparenting to init or a subreaper

### Takeaway
`wait(&s)` is `waitpid(-1, &s, 0)`. `waitpid` selects children by PID/group and can poll with `WNOHANG`, which returns 0 if children exist but none has changed state. Decode the status with `WIFEXITED`/`WEXITSTATUS` (low 8 bits only) and `WIFSIGNALED`/`WTERMSIG`. A **zombie** is a dead child not yet waited for. An **orphan** is a child whose parent died. Orphans are re-parented to init (PID 1) or the nearest subreaper, which reaps them.

### Cited Findings
- "A state change is considered to be: the child terminated; the child was stopped by a signal; or the child was resumed by a signal. In the case of a terminated child, performing a wait allows the system to release the resources associated with the child; if a wait is not performed, then the terminated child remains in a "zombie" state". — [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)
- "If a child has already changed state, then these calls return immediately. Otherwise, they block until either a child changes state or a signal handler interrupts the call (assuming that system calls are not automatically restarted using the SA_RESTART flag of sigaction(2))." — [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)
- "The call wait(&wstatus) is equivalent to: waitpid(-1, &wstatus, 0);" — [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)
- `pid` argument:
  - `< -1`: any child whose process group ID equals |pid|;
  - `-1`: any child;
  - `0`: any child whose process group ID equals the caller's (at call time);
  - `> 0`: that specific child. — [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)
- Options:
  - "WNOHANG return immediately if no child has exited";
  - "WUNTRACED also return if a child has stopped (but not traced via ptrace(2))";
  - "WCONTINUED (since Linux 2.6.10) also return if a stopped child has been resumed by delivery of SIGCONT". — [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)
- Macros (they "take the integer itself as an argument, not a pointer to it"):
  - `WIFEXITED` — "true if the child terminated normally, that is, by calling exit(3) or _exit(2), or by returning from main()";
  - `WEXITSTATUS` — "the least significant 8 bits of the status argument" (use only if WIFEXITED);
  - `WIFSIGNALED` / `WTERMSIG`;
  - `WCOREDUMP` (POSIX.1-2024);
  - `WIFSTOPPED` / `WSTOPSIG` (only with WUNTRACED or tracing);
  - `WIFCONTINUED`. — [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)
- Return values: wait returns the PID of the terminated child, or -1. waitpid returns the PID, or "if WNOHANG was specified and one or more child(ren) specified by pid exist, but have not yet changed state, then 0 is returned", or -1 on failure. Errors:
  - "ECHILD (for wait()) The calling process does not have any unwaited-for children";
  - for waitpid, ECHILD when the pid "does not exist or is not a child of the calling process. (This can happen for one's own child if the action for SIGCHLD is set to SIG_IGN.)";
  - "EINTR WNOHANG was not set and an unblocked signal or a SIGCHLD was caught". — [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)
- Exit status width: "The value status & 0xFF is returned to the parent process as the process's exit status". — [_exit(2)](https://man7.org/linux/man-pages/man2/_exit.2.html). POSIX: the shell's value "is equal to the result of performing a modulo 256 operation on the value passed to _Exit(), _exit(), or exit() or returned from main()". — [POSIX.1-2024 §2.8.2](https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html#tag_19_08_02)
- **Zombies**: "A child that terminates, but has not been waited for becomes a "zombie". The kernel maintains a minimal set of information about the zombie process (PID, termination status, resource usage information) in order to allow the parent to later perform a wait to obtain information about the child. As long as a zombie is not removed from the system via a wait, it will consume a slot in the kernel process table, and if this table fills, it will not be possible to create further processes." — [wait(2) NOTES](https://man7.org/linux/man-pages/man2/wait.2.html)
- **Orphans**: "If a parent process terminates, then its "zombie" children (if any) are adopted by init(1), (or by the nearest "subreaper" process as defined through the use of the prctl(2) PR_SET_CHILD_SUBREAPER operation); init(1) automatically performs a wait to remove the zombies." — [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html). Also, on `_exit`: "Any children of the process are inherited by init(1) (or by the nearest "subreaper" process ...). The process's parent is sent a SIGCHLD signal." — [_exit(2)](https://man7.org/linux/man-pages/man2/_exit.2.html)
- **Subreaper** (Linux 3.4+): "A subreaper fulfills the role of init(1) for its descendant processes. When a process becomes orphaned (i.e., its immediate parent terminates), then that process will be reparented to the nearest still living ancestor subreaper. Subsequently, calls to getppid(2) in the orphaned process will now return the PID of the subreaper process". The attribute "is not inherited by children created by fork(2) and clone(2). The setting is preserved across execve(2)." "Some init(1) frameworks (e.g., systemd(1)) employ a subreaper process for similar reasons." — [PR_SET_CHILD_SUBREAPER(2const)](https://man7.org/linux/man-pages/man2/PR_SET_CHILD_SUBREAPER.2const.html)
- The three exit cases: if the parent set SA_NOCLDWAIT or SIGCHLD=SIG_IGN, "the status is discarded and the child dies immediately". If the parent was waiting, "it is notified of the exit status and the child dies immediately". "Otherwise, the child becomes a "zombie" process". — [exit(3)](https://man7.org/linux/man-pages/man3/exit.3.html)
- SIGCHLD=SIG_IGN: "if the disposition of SIGCHLD is set to SIG_IGN or the SA_NOCLDWAIT flag is set for SIGCHLD ... then children that terminate do not become zombies and a call to wait() or waitpid() will block until all children have terminated, and then fail with errno set to ECHILD." "Note that even though the default disposition of SIGCHLD is "ignore", explicitly setting the disposition to SIG_IGN results in different treatment of zombie process children." — [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html). Portability: "the only completely portable method of ensuring that terminated children do not become zombies is to catch the SIGCHLD signal and perform a wait(2) or similar." — [sigaction(2) HISTORY](https://man7.org/linux/man-pages/man2/sigaction.2.html)
- CMU: "Reaping — Performed by parent on terminated child (using wait or waitpid); Parent is given exit status information; Kernel then deletes zombie child process." "If any parent terminates without reaping a child, then the orphaned child will be reaped by init process (pid == 1). So, only need explicit reaping in long-running processes, e.g., shells and servers". "ps shows child process as "defunct" (i.e., a zombie)". "If multiple children completed, [wait] will take in arbitrary order". — [CMU L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf)
- A zombie still counts as an existing process for `kill`: ESRCH notes "that an existing process might be a zombie, a process that has terminated execution, but has not yet been wait(2)ed for." — [kill(2)](https://man7.org/linux/man-pages/man2/kill.2.html)
- Verified locally on macOS (section 8, WP11 and WP18):
  - `exit(300)` → WEXITSTATUS 44; `exit(-1)` → 255; `return 7` → 7.
  - kill -9 → WTERMSIG 9; SIGTERM → 15; NULL dereference → 11.
  - `wait()` with no children → -1 (ECHILD).
  - A zombie shows as `STAT Z`, `COMM <defunct>`.
  - An orphan's `getppid()` changes from its parent's PID to **1** (launchd is PID 1 on macOS).
  - With `signal(SIGCHLD, SIG_IGN)` no zombie appears and `wait()` returns -1/ECHILD.

### Inferences
- Definitions to state crisply:
  - *zombie* = terminated + not yet reaped (an exit status is waiting in the process table);
  - *orphan* = parent has terminated (the child may still be running);
  - an *orphaned zombie* is reaped automatically by init or the subreaper.
- A zombie cannot be "killed": it has already terminated. The fix is to make its parent `wait()`, or to kill the parent so the zombie is re-parented and reaped. This matches CMU's demonstration, where killing the parent made the `<defunct>` entry disappear.
- `WEXITSTATUS` sees only 8 bits, so `exit(256)` looks like success. Use `exit(0)`/`exit(1)` or `EXIT_SUCCESS`/`EXIT_FAILURE`.
- Linux vs macOS: on a Linux desktop an orphan's new parent may be a *subreaper* (e.g., a `systemd --user` instance) rather than PID 1. On macOS it was PID 1 (launchd) in the local test. Exams usually expect "init (PID 1)", so mention subreapers as the precise Linux answer.

### Gaps
- Launchd's reaping behaviour is documented only by observation here; no Apple primary source was fetched.

---

## 4. Signals I: default actions, handlers via signal vs sigaction (SA_RESTART, SA_SIGINFO), masks (sigprocmask), pending vs blocked; kill, raise, alarm, pause

### Takeaway
Every signal has a disposition: default (Term/Ign/Core/Stop/Cont), ignore, or catch. The kernel keeps per-process *pending* and *blocked* bit vectors. A signal is delivered when it is pending and not blocked, at the next kernel→user transition. Use `sigaction` (explicit `sa_mask` and `sa_flags`), not `signal`. SIGKILL and SIGSTOP can never be caught, blocked or ignored.

### Cited Findings
- Terms (CMU): "A destination process receives a signal when it is forced by the kernel to react in some way to the delivery of the signal". "A signal is pending if sent but not yet received — There can be at most one pending signal of any particular type — Important: Signals are not queued". "A process can block the receipt of certain signals — Blocked signals can be delivered, but will not be received until the signal is unblocked". "A pending signal is received at most once". The kernel keeps "pending and blocked bit vectors in the context of each process ... blocked ... Can be set and cleared by using the sigprocmask function — Also referred to as the signal mask." — [CMU 15-213 F15 Lecture 15 (Signals)](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)
- Receiving: on returning to process p, the "Kernel computes pnb = pending & ~blocked". If it is 0, control passes to the next instruction. Otherwise the kernel will "Choose least nonzero bit k in pnb and force process p to receive signal k", repeating for all nonzero k. — [CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf). Linux wording: "Whenever there is a transition from kernel-mode to user-mode execution (e.g., on return from a system call or scheduling of a thread onto the CPU), the kernel checks whether there is a pending unblocked signal for which the process has established a signal handler." — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html). Note: "If multiple standard signals are pending for a process, the order in which the signals are delivered is unspecified." — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
- Default actions: "Term Default action is to terminate the process. Ign ... ignore the signal. Core ... terminate the process and dump core. Stop ... stop the process. Cont ... continue the process if it is currently stopped." "The signals SIGKILL and SIGSTOP cannot be caught, blocked, or ignored." — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
- Table (action; Linux x86/ARM number; **macOS number, verified with `kill -l`**):

  | Signal | Action | Comment (signal(7)) | Linux x86/ARM | macOS |
  |---|---|---|---|---|
  | SIGHUP | Term | Hangup detected on controlling terminal or death of controlling process | 1 | 1 |
  | SIGINT | Term | Interrupt from keyboard (Ctrl-C) | 2 | 2 |
  | SIGQUIT | Core | Quit from keyboard | 3 | 3 |
  | SIGILL | Core | Illegal Instruction | 4 | 4 |
  | SIGABRT | Core | Abort signal from abort(3) | 6 | 6 |
  | SIGFPE | Core | Erroneous arithmetic operation | 8 | 8 |
  | SIGKILL | Term | Kill signal (uncatchable) | 9 | 9 |
  | SIGSEGV | Core | Invalid memory reference | 11 | 11 |
  | SIGPIPE | Term | Broken pipe: write to pipe with no readers | 13 | 13 |
  | SIGALRM | Term | Timer signal from alarm(2) | 14 | 14 |
  | SIGTERM | Term | Termination signal (default of `kill`) | 15 | 15 |
  | SIGUSR1 / SIGUSR2 | Term | User-defined | 10 / 12 | **30 / 31** |
  | SIGCHLD | Ign | Child stopped, terminated, or continued | 17 | **20** |
  | SIGCONT | Cont | Continue if stopped | 18 | **19** |
  | SIGSTOP | Stop | Stop process (uncatchable) | 19 | **17** |
  | SIGTSTP | Stop | Stop typed at terminal (Ctrl-Z) | 20 | **18** |
  | SIGTTIN / SIGTTOU | Stop | Terminal input/output for background process | 21 / 22 | 21 / 22 |
  | SIGBUS | Core | Bus error | 7 | **10** |

  — actions and comments: [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html); Linux numbers: [signal(7) numbering table](https://man7.org/linux/man-pages/man7/signal.7.html); macOS numbers: local `kill -l` on macOS 27.0.1.
- Dispositions and inheritance: "A child created via fork(2) inherits a copy of its parent's signal dispositions. During an execve(2), the dispositions of handled signals are reset to the default; the dispositions of ignored signals are left unchanged." "The signal disposition is a per-process attribute". — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
- Mask and pending: "A signal may be blocked, which means that it will not be delivered until it is later unblocked. Between the time when it is generated and when it is delivered a signal is said to be pending." "Each thread in a process has an independent signal mask". Fork: the child "inherits a copy of its parent's signal mask; the signal mask is preserved across execve(2)" and "initially has an empty pending signal set; the pending signal set is preserved across an execve(2)." — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
- **What the kernel does to run a handler** (useful for "explain the code" oral questions):
  1. "The signal is removed from the set of pending signals".
  2. Context (PC, registers, current mask) is saved in a frame on the stack.
  3. "Any signals specified in act->sa_mask ... are added to the thread's signal mask. The signal being delivered is also added to the signal mask, unless SA_NODEFER was specified".
  4. The handler runs and returns into a "signal trampoline" that calls sigreturn(2), which restores the saved state, including the old mask.

  "From the kernel's point of view, execution of the signal handler code is exactly the same as the execution of any other user-space code." — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
- `sigaction`: `struct sigaction { void (*sa_handler)(int); void (*sa_sigaction)(int, siginfo_t *, void *); sigset_t sa_mask; int sa_flags; ... }`. sa_mask "specifies a mask of signals which should be blocked ... during execution of the signal handler. In addition, the signal which triggered the handler will be blocked, unless the SA_NODEFER flag is used." — [sigaction(2)](https://man7.org/linux/man-pages/man2/sigaction.2.html)
- Flags (verbatim essentials):
  - **SA_RESTART** "Provide behavior compatible with BSD signal semantics by making certain system calls restartable across signals";
  - **SA_SIGINFO** "The signal handler takes three arguments, not one. In this case, sa_sigaction should be set instead of sa_handler";
  - **SA_NOCLDSTOP** "If signum is SIGCHLD, do not receive notification when child processes stop ... or resume";
  - **SA_NOCLDWAIT** "If signum is SIGCHLD, do not transform children into zombies when they terminate";
  - **SA_NODEFER** "Do not add the signal to the thread's signal mask while the handler is executing";
  - **SA_RESETHAND** "Restore the signal action to the default upon entry to the signal handler";
  - **SA_ONSTACK** run the handler on the sigaltstack. — [sigaction(2)](https://man7.org/linux/man-pages/man2/sigaction.2.html)
- SA_SIGINFO for SIGCHLD: "SIGCHLD fills in si_pid, si_uid, si_status, si_utime, and si_stime, providing information about the child." — [sigaction(2)](https://man7.org/linux/man-pages/man2/sigaction.2.html). Verified locally: a child that did `_exit(42)` produced `si_pid` = the child's PID and `si_status=42`.
- Undefined behaviour: "According to POSIX, the behavior of a process is undefined after it ignores a SIGFPE, SIGILL, or SIGSEGV signal that was not generated by kill(2) or raise(3)." "It is not possible to block SIGKILL or SIGSTOP (by specifying them in sa_mask). Attempts to do so are silently ignored." — [sigaction(2)](https://man7.org/linux/man-pages/man2/sigaction.2.html)
- **signal() vs sigaction()**: "WARNING: the behavior of signal() varies across UNIX versions ... Avoid its use: use sigaction(2) instead." "The only portable use of signal() is to set a signal's disposition to SIG_DFL or SIG_IGN."
  - Original UNIX / System V semantics are equivalent to `sa_flags = SA_RESETHAND | SA_NODEFER`: the handler is reset to default, and the same signal is not blocked while the handler runs.
  - BSD semantics are equivalent to `sa_flags = SA_RESTART`.
  - On Linux, "The kernel's signal() system call provides System V semantics", but "in glibc 2 and later, the signal() wrapper function does not invoke the kernel system call. Instead, it calls sigaction(2) using flags that supply BSD semantics" (when `_DEFAULT_SOURCE`/`_BSD_SOURCE` is defined, the default). — [signal(2)](https://man7.org/linux/man-pages/man2/signal.2.html)
- Verified locally: macOS `signal()` also gives BSD semantics. After `signal(SIGUSR1,h)` and two `raise(SIGUSR1)` calls, the handler ran twice, was still installed, and `SA_RESTART` was set.
- CMU's portable wrapper (installs with an empty `sa_mask` plus `SA_RESTART`): `action.sa_handler = handler; sigemptyset(&action.sa_mask); /* Block sigs of type being handled */ action.sa_flags = SA_RESTART; /* Restart syscalls if possible */`. It exists because "Some older systems restore action to default after catching signal; Some interrupted system calls can return with errno == EINTR; Some systems don't block signals of the type being handled". — [CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)
- **sigprocmask**:
  - "SIG_BLOCK The set of blocked signals is the union of the current set and the set argument." "SIG_UNBLOCK The signals in set are removed from the current set of blocked signals." "SIG_SETMASK The set of blocked signals is set to the argument set."
  - "If oldset is non-NULL, the previous value of the signal mask is stored in oldset."
  - "It is not possible to block SIGKILL or SIGSTOP. Attempts to do so are silently ignored."
  - "If SIGBUS, SIGFPE, SIGILL, or SIGSEGV are generated while they are blocked, the result is undefined".
  - "The use of sigprocmask() is unspecified in a multithreaded process; see pthread_sigmask(3)." — [sigprocmask(2)](https://man7.org/linux/man-pages/man2/sigprocmask.2.html)
- CMU idiom: `Sigprocmask(SIG_BLOCK, &mask, &prev_mask); … /* Code region that will not be interrupted by SIGINT */ … Sigprocmask(SIG_SETMASK, &prev_mask, NULL);`. Implicit blocking: "Kernel blocks any pending signals of type currently being handled. E.g., A SIGINT handler can't be interrupted by another SIGINT". — [CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)
- **kill(2)**:
  - "If pid is positive, then signal sig is sent to the process with the ID specified by pid. If pid equals 0, then sig is sent to every process in the process group of the calling process. If pid equals -1, then sig is sent to every process for which the calling process has permission to send signals, except for process 1 (init) ... If pid is less than -1, then sig is sent to every process in the process group whose ID is -pid."
  - "If sig is 0, then no signal is sent, but existence and permission checks are still performed".
  - Permission: privileged (CAP_KILL), or "the real or effective user ID of the sending process must equal the real or saved set-user-ID of the target process. In the case of SIGCONT, it suffices when the sending and receiving processes belong to the same session."
  - "on Linux the call kill(-1,sig) does not signal the calling process." — [kill(2)](https://man7.org/linux/man-pages/man2/kill.2.html)
- Process-group kill from the shell: `/bin/kill -9 -24817` means "Send SIGKILL to every process in process group 24817". — [CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)
- **raise(3)**: "In a single-threaded program it is equivalent to kill(getpid(), sig);" and "If the signal causes a handler to be called, raise() will return only after the signal handler has returned." — [raise(3)](https://man7.org/linux/man-pages/man3/raise.3.html)
- **alarm(2)**: "arranges for a SIGALRM signal to be delivered to the calling process in seconds seconds. If seconds is zero, any pending alarm is canceled. In any event any previously set alarm() is canceled." It "returns the number of seconds remaining until any previously scheduled alarm was due to be delivered, or zero". "sleep(3) may be implemented using SIGALRM; mixing calls to alarm() and sleep(3) is a bad idea." — [alarm(2)](https://man7.org/linux/man-pages/man2/alarm.2.html). Verified locally: `alarm(5); sleep(1); alarm(0)` returned 4.
- **pause(2)**: "causes the calling process (or thread) to sleep until a signal is delivered that either terminates the process or causes the invocation of a signal-catching function." It "returns only when a signal was caught and the signal-catching function returned. In this case, pause() returns -1, and errno is set to EINTR." — [pause(2)](https://man7.org/linux/man-pages/man2/pause.2.html). Verified locally: it returned -1 with errno EINTR.
- **sigsuspend(2)**: "temporarily replaces the signal mask of the calling thread with the mask given by mask and then suspends the thread until delivery of a signal whose action is to invoke a signal handler or to terminate a process." It "always returns -1, with errno set to indicate the error (normally, EINTR)." — [sigsuspend(2)](https://man7.org/linux/man-pages/man2/sigsuspend.2.html)
- Synchronous alternatives: `sigwaitinfo(2)`, `sigtimedwait(2)`, `sigwait(3)` and `signalfd(2)` "synchronously accept the signal" instead of using a handler. — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
- Keyboard: "Typing ctrl-c (ctrl-z) causes the kernel to send a SIGINT (SIGTSTP) to every job in the foreground process group." — [CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf). OSTEP: "control-c sends a SIGINT (interrupt) to the process (normally terminating it) and control-z sends a SIGTSTP (stop) signal thus pausing the process in mid-execution (you can resume it later with a command, e.g., the fg built-in command found in many shells)". OSTEP then defers details: "Read elsewhere [SR05] to learn more about signals and their many intricacies." — [OSTEP ch. 5 §5.5](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf)

### Inferences
- Model to say aloud: **sending sets a bit; receiving happens later**. It happens on the next return to user mode, and only if the bit is set *and* not masked. Because it is a bit and not a counter, two identical signals that arrive before the first is received look like one.
- Always write portable handler installation with `sigaction` and explicit flags. Answer "what does `signal()` do on Linux?" with "glibc gives BSD semantics (SA_RESTART, handler stays installed), but the kernel syscall is System V". macOS (BSD) behaved the same way in the local test.
- **Use signal names, never numbers, in code and answers.** USR1/USR2/CHLD/CONT/STOP/TSTP/BUS differ between Linux and macOS, and so do the `128+n` shell statuses for them.
- OSTEP itself says signals are covered "elsewhere", so the CMU slides and the man pages are the natural outside references for this part of the midterm.

### Gaps
- Real-time signals (SIGRTMIN…), which *are* queued, were out of scope. Only their existence matters for the contrast with "standard signals do not queue".

---

## 5. Signals II: signals are not queued (lost SIGCHLD, the `while (waitpid(-1, …, WNOHANG) > 0)` loop), interrupted system calls (EINTR), async-signal safety and safe handler patterns

### Takeaway
Standard signals collapse: N identical signals sent while one is pending give one delivery. A SIGCHLD handler must therefore reap **all** finished children in a loop. Use `WNOHANG` so it never blocks on still-running ones. A blocked slow system call is either restarted (SA_RESTART and an eligible call) or fails with `EINTR`. Some calls are *never* restarted. Handlers may only call async-signal-safe functions (`write`, `_exit`, `waitpid`, `kill` … but not `printf`, `malloc`, `exit`), must save and restore `errno`, and should communicate through `volatile sig_atomic_t` flags.

### Cited Findings
- "Standard signals do not queue. If multiple instances of a standard signal are generated while that signal is blocked, then only one instance of the signal is marked as pending (and the signal will be delivered just once when it is unblocked)." — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
- CMU: "If a process has a pending signal of type k, then subsequent signals of type k that are sent to that process are discarded". "Pending signals are not queued — For each signal type, one bit indicates whether or not signal is pending… thus at most one pending signal of any particular type. You can't use signals to count events, such as children terminating." — [CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)
- CMU's buggy handler (`if ((pid = wait(NULL)) < 0) …` reaps one child per signal) reaped only 2 of N children in their run. The corrected `child_handler2` loops: `while ((pid = wait(NULL)) > 0) { ccount--; Sio_puts("Handler reaped child "); … } if (errno != ECHILD) Sio_error("wait error"); errno = olderrno;`. — [CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)
- Why `WNOHANG` in the loop: waitpid with WNOHANG returns 0 "if ... one or more child(ren) specified by pid exist, but have not yet changed state". So the loop `while ((pid = waitpid(-1, &status, WNOHANG)) > 0)` reaps every child that has *already* finished, then stops instead of blocking inside the handler. — [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)
- Verified locally (section 8, WP16):
  - SIGCHLD blocked while 10 children exit, then unblocked: the handler ran **once**. The one-reap handler reaped **1 and left 9 zombies**; the WNOHANG loop reaped all 10.
  - Without blocking, the one-reap handler left 2–3 zombies in 2 of 8 runs.
  - A child sending SIGUSR1 five times to its parent gave counter values 1 (286 runs), 2 (13), 3 (1) over 300 runs, never 5.
  - Blocking SIGINT, `raise`-ing it 3 times, then unblocking ran the handler exactly once, before `sigprocmask` returned.
- Race fix (CMU "Synchronizing Flows to Avoid Races"): a shell whose SIGCHLD handler calls `deletejob` can run `deletejob(pid)` *before* the parent's `addjob(pid)` if the child exits quickly. The fix is to block SIGCHLD before `fork`, unblock it in the child before `execve`, and in the parent block all signals around `addjob` and then restore the previous mask. — [CMU L15 procmask1.c/procmask2.c](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)
- Waiting for a signal: `while (!pid) pause(); /* Race! */` and `while (!pid) sleep(1); /* Too slow! */`. "Solution: sigsuspend". It is "Equivalent to atomic (uninterruptable) version of: sigprocmask(SIG_BLOCK, &mask, &prev); pause(); sigprocmask(SIG_SETMASK, &prev, NULL);". Usage: `while (!pid) Sigsuspend(&prev);`. — [CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf). Linux: "Normally, sigsuspend() is used in conjunction with sigprocmask(2) in order to prevent delivery of a signal during the execution of a critical code section." — [sigsuspend(2)](https://man7.org/linux/man-pages/man2/sigsuspend.2.html)
- **EINTR rules (Linux)**: "If a signal handler is invoked while a system call or library function call is blocked, then either: the call is automatically restarted after the signal handler returns; or the call fails with the error EINTR." — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
  - Restarted only if SA_RESTART was used:
    - read/readv/write/writev/ioctl on "slow" devices ("a terminal, pipe, or socket"; "a (local) disk is not a slow device");
    - blocking `open` (e.g., FIFO);
    - "wait(2), wait3(2), wait4(2), waitid(2), and waitpid(2)";
    - socket calls without timeouts;
    - flock/F_SETLKW;
    - mq_*;
    - futex FUTEX_WAIT;
    - sem_wait. — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
  - **Never restarted, always EINTR**:
    - "Interfaces used to wait for signals: pause(2), sigsuspend(2), sigtimedwait(2), and sigwaitinfo(2)";
    - "epoll_wait(2), epoll_pwait(2), poll(2), ppoll(2), select(2), and pselect(2)";
    - System V IPC msgrcv/msgsnd/semop/semtimedop;
    - "clock_nanosleep(2), nanosleep(2), and usleep(3)";
    - socket calls with SO_RCVTIMEO/SO_SNDTIMEO.

    "The sleep(3) function is also never restarted if interrupted by a handler, but gives a success return: the number of seconds remaining to sleep." — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
  - A slow-device read that had "already transferred some data by the time it is interrupted ... will return a success status (normally, the number of bytes transferred)". — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
- Verified locally (WP17):
  - `read()` on an empty pipe interrupted by a SIGALRM handler **without** SA_RESTART → `-1, errno=EINTR` at 1 s;
  - **with** SA_RESTART → the read restarted and returned 1 byte when data arrived at 2 s;
  - `sleep(10)` interrupted at about 3 s returned **7**, even with SA_RESTART.
- **Async-signal safety**: "An async-signal-safe function is one that can be safely called from within a signal handler. Many functions are not async-signal-safe. In particular, nonreentrant functions are generally unsafe to call from a signal handler." The stdio example: if the main program is inside `printf` with the buffer half-updated and a handler also calls `printf`, "then the second call to printf(3) will operate on inconsistent data, with unpredictable results." — [signal-safety(7)](https://man7.org/linux/man-pages/man7/signal-safety.7.html)
- The two choices: "(a) Ensure that (1) the signal handler calls only async-signal-safe functions, and (2) the signal handler itself is reentrant with respect to global variables in the main program. (b) Block signal delivery in the main program when calling functions that are unsafe or operating on global data that is also accessed by the signal handler." "Generally, the second choice is difficult in programs of any complexity, so the first choice is taken." — [signal-safety(7)](https://man7.org/linux/man-pages/man7/signal-safety.7.html)
- Safe functions students use (present in the current table): `_exit`, `_Exit`, `abort`, `alarm`, `chdir`, `close`, `dup`, `dup2`, `execve`, `execl`/`execle`/`execv` (added in POSIX.1-2008), `getpid`, `getppid`, `kill`, `open`, `pause`, `pipe`, `raise`, `read`, `setpgid`, `setsid`, `sigaction`, `sigaddset`, `sigemptyset`, `sigfillset`, `signal`, `sigprocmask`, `sigsuspend`, `sleep`, `strlen` (POSIX.1-2008 TC2), `tcsetpgrp`, `wait`, `waitpid`, `write`, and `_Fork`. — [signal-safety(7)](https://man7.org/linux/man-pages/man7/signal-safety.7.html)
- **Not** async-signal-safe: `printf`, `sprintf`, `malloc`, `exit`. CMU: "Popular functions that are not on the list: printf, sprintf, malloc, exit — Unfortunate fact: write is the only async-signal-safe output function". — [CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf); also checked against the [signal-safety(7)](https://man7.org/linux/man-pages/man7/signal-safety.7.html) table, where none of them appear.
- **fork() is no longer on the list.** POSIX.1-2024 (Issue 8) applied Austin Group defects "adding the _Fork() function and removing the requirement for fork() to be async-signal-safe" — [POSIX.1-2024 fork()/_Fork()](https://pubs.opengroup.org/onlinepubs/9799919799/functions/_Fork.html). The current man7.org table lists `_Fork(3)` and not `fork(2)` (checked by grep of the raw page) — [signal-safety(7)](https://man7.org/linux/man-pages/man7/signal-safety.7.html). The POSIX.1-2024 table starts "_Exit() _Fork() _exit() abort() …" — [POSIX.1-2024 §2.4.3 Signal Actions](https://pubs.opengroup.org/onlinepubs/9799919799/functions/V2_chap02.html#tag_16_04_03). Older material (CMU 2015: "Posix guarantees 117 functions to be async-signal-safe") predates this change.
- errno: "Fetching and setting the value of errno is async-signal-safe provided that the signal handler saves errno on entry and restores its value before returning." — [signal-safety(7)](https://man7.org/linux/man-pages/man7/signal-safety.7.html). The POSIX shared-data rule: behaviour is undefined if "The signal handler refers to any object other than errno with static or thread storage duration that is not a lock-free atomic object, and not a non-modifiable object ..., other than by assigning a value to an object declared as volatile sig_atomic_t". — [POSIX.1-2024 §2.4.3](https://pubs.opengroup.org/onlinepubs/9799919799/functions/V2_chap02.html#tag_16_04_03)
- glibc deviation: "Before glibc 2.24, execl(3) and execle(3) employed realloc(3) internally and were consequently not async-signal-safe." — [signal-safety(7)](https://man7.org/linux/man-pages/man7/signal-safety.7.html)
- **CMU safe-handler guidelines (verbatim)**:
  - "G0: Keep your handlers as simple as possible — e.g., Set a global flag and return";
  - "G1: Call only async-signal-safe functions in your handlers — printf, sprintf, malloc, and exit are not safe!";
  - "G2: Save and restore errno on entry and exit — So that other handlers don't overwrite your value of errno";
  - "G3: Protect accesses to shared data structures by temporarily blocking all signals";
  - "G4: Declare global variables as volatile — To prevent compiler from storing them in a register";
  - "G5: Declare global flags as volatile sig_atomic_t — flag: variable that is only read or written (e.g. flag = 1, not flag++)".

  CMU's SIO helpers are `sio_puts`, `sio_putl`, `sio_error`. — [CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)

A safe SIGCHLD handler that combines the cited rules (pattern verified in `w16b_sigchld_blocked.c`):

```c
static volatile sig_atomic_t children_done = 0;   /* G5 */
static void sigchld_handler(int sig) {
    (void)sig;
    int saved_errno = errno;                       /* G2 */
    pid_t pid;
    int status;
    while ((pid = waitpid(-1, &status, WNOHANG)) > 0)   /* reap ALL finished children; never block */
        children_done = 1;                         /* only a flag write, no printf (G1) */
    errno = saved_errno;                           /* G2 */
}
/* install with sigaction: sa_mask = {} (SIGCHLD itself auto-blocked), sa_flags = SA_RESTART | SA_NOCLDSTOP */
```

### Inferences
- The two independent reasons for the loop are worth saying out loud. (1) Signals don't queue, so one SIGCHLD may stand for many dead children: loop. (2) Other children may still be running, so a blocking `wait` inside the handler would freeze the program: WNOHANG.
- `counter++` on a `volatile sig_atomic_t` (used in my demo) is a read-modify-write. CMU's G5 restricts flags to plain reads and writes, so in an exam answer prefer `flag = 1` and do any counting in the main program.
- With SA_RESTART, `wait`/`read` restart, but `pause`, `sigsuspend`, `select`/`poll`, `nanosleep` and `sleep` do not. Robust code loops on `EINTR` anyway: `while ((n = read(...)) < 0 && errno == EINTR);`.
- The current answer to "is fork async-signal-safe?" is: not required since POSIX.1-2024 (use `_Fork`). Older slides say yes. In an oral exam, mention both.

### Gaps
- I did not test signal behaviour on a Linux machine. The EINTR lists above are Linux-specific per signal(7) ("The details vary across UNIX systems"). macOS matched for `read` on a pipe and for `sleep`.

---

## 6. The shell: exit codes (0, 1, 126, 127, 128+n), quoting, subshells, process groups and sessions, foreground/background job control, daemons, `trap`

### Takeaway
`$?` is the 8-bit wait status as the shell sees it:
- 0 = success; nonzero = failure; 2 = misuse of a builtin;
- 126 = found but not executable; 127 = not found;
- 128+n = killed by signal n.

Each pipeline is a *job* placed in its own process group (with job control on). The terminal has one foreground process group, which receives Ctrl-C/Ctrl-Z and may read the terminal; background reads cause SIGTTIN. Subshells (`( )`, `$( )`, `&`, pipeline members) are forked copies, so their variable changes do not come back. `trap` installs shell-level handlers: caught traps are reset in children, but `trap ''` (ignore) is inherited, exactly mirroring execve's rules.

### Cited Findings

**Exit status**
- "Exit statuses fall between 0 and 255, though, as explained below, the shell may use values above 125 specially." "a command which exits with a zero exit status has succeeded." "When a command terminates on a fatal signal whose number is N, Bash uses the value 128+N as the exit status. If a command is not found, the child process created to execute it returns a status of 127. If a command is found but is not executable, the return status is 126. If a command fails because of an error during expansion or redirection, the exit status is greater than zero." "All builtins return an exit status of 2 to indicate incorrect usage". "The exit status of the last command is available in the special parameter $?". "Bash itself returns the exit status of the last command executed, unless a syntax error occurs". — [Bash Reference Manual 5.3 §3.7.5 Exit Status](https://tiswww.case.edu/php/chet/bash/bashref.html#Exit-Status)
- POSIX: "If the command is not found, the exit status shall be 127. Otherwise, if the command name is found, but it is not an executable utility, the exit status shall be 126. Otherwise, if the command terminated due to the receipt of a signal, the shell shall assign it an exit status greater than 128. The exit status shall identify, in an implementation-defined manner, which signal terminated the command. Note that shell implementations are permitted to assign an exit status greater than 255 if a command terminates due to a signal." — [POSIX.1-2024 §2.8.2](https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html#tag_19_08_02)
- Verified locally in macOS `/bin/bash` 3.2.57:
  - `true`→0, `false`→1, `ls /nonexistent`→1;
  - unknown command→127; non-executable file→126;
  - `exit 300`→44, `exit 258`→2, `exit -1`→255;
  - SIGTERM'd job→143 (`kill -l 143` → TERM), SIGKILL→137, self-SIGINT→130;
  - failed `cd`→1, builtin bad option→2;
  - `yes | head -1` → `PIPESTATUS` = `141 0` (141 = 128+13 SIGPIPE).
- Pipelines and lists: "The exit status of a pipeline is the exit status of the last command in the pipeline, unless the pipefail option is enabled". With pipefail it is "the value of the last (rightmost) command to exit with a non-zero status, or zero if all commands exit successfully". `!` negates the status. "Each command in a multi-command pipeline, where pipes are created, is executed in its own subshell, which is a separate process". `command1 && command2` runs command2 "if, and only if, command1 returns an exit status of zero"; `||` runs it on non-zero. An `&` command runs "asynchronously in a subshell ... the return status is 0". "When job control is not active ... the standard input for asynchronous commands, in the absence of any explicit redirections, is redirected from /dev/null." — [Bash §3.2.3 Pipelines](https://tiswww.case.edu/php/chet/bash/bashref.html#Pipelines), [§3.2.4 Lists](https://tiswww.case.edu/php/chet/bash/bashref.html#Lists). Verified: `false | true` → 0; with `set -o pipefail` → 1; `! true` → 1.

**Quoting and subshells**
- "Enclosing characters in single quotes (') preserves the literal value of each character within the quotes. A single quote may not occur between single quotes, even when preceded by a backslash." Double quotes preserve everything "with the exception of '$', '`', '\', and, when history expansion is enabled, '!'". "A non-quoted backslash '\' is the Bash escape character." — [Bash §3.1.2 Quoting](https://tiswww.case.edu/php/chet/bash/bashref.html#Quoting). Verified: with `v='a   b'`, `printf '<%s>' $v` → `<a><b>` (word splitting), `"$v"` → `<a   b>`, `'$v'` → `<$v>`.
- "A subshell is a copy of the shell process. Command substitution, commands grouped with parentheses, and asynchronous commands are invoked in a subshell environment that is a duplicate of the shell environment, except that traps caught by the shell are reset to the values that the shell inherited from its parent at invocation." "Changes made to the subshell environment cannot affect the shell's execution environment." — [Bash §3.7.3 Command Execution Environment](https://tiswww.case.edu/php/chet/bash/bashref.html#Command-Execution-Environment)
- "($$) Expands to the process ID of the shell. In a subshell, it expands to the process ID of the invoking shell, not the subshell." "($!) Expands to the process ID of the job most recently placed into the background". — [Bash §3.4.2 Special Parameters](https://tiswww.case.edu/php/chet/bash/bashref.html#Special-Parameters)
- Verified:
  - `x=1; (x=2); echo $x` → 1, but `{ x=3; }` → 3;
  - `$(echo $$)` printed the main shell's PID, while a child started inside the subshell reported a *different* parent PID (the subshell's real PID);
  - `echo hi | read y; echo "[$y]"` → `[]` in bash (read ran in a pipeline subshell) but `[hi]` in **zsh**, the macOS default shell.

**Process groups, sessions, controlling terminal**
- "Sessions and process groups are abstractions devised to support shell job control. A process group (sometimes called a "job") is a collection of processes that share the same process group ID; the shell creates a new process group for the process(es) used to execute single command or pipeline (e.g., the two processes created to execute the command "ls | wc" are placed in the same process group)." "The process whose process ID is the same as its process group ID is the process group leader for that group." "A session is a collection of processes that share the same session ID ... sessions and process groups form a strict two-level hierarchy of processes." "A new session is created when a process calls setsid(2) ... The creator of the session is called the session leader." "All of the processes in a session share a controlling terminal ... established when the session leader first opens a terminal". "At most one of the jobs in a session may be the foreground job ... Only the foreground job may read from the terminal; when a process in the background attempts to read from the terminal, its process group is sent a SIGTTIN signal, which suspends the job. If the TOSTOP flag has been set for the terminal ..., then only the foreground job may write to the terminal; writes from background jobs cause a SIGTTOU signal ... When terminal keys that generate a signal (such as the interrupt key, normally control-C) are pressed, the signal is sent to the processes in the foreground job." — [credentials(7)](https://man7.org/linux/man-pages/man7/credentials.7.html)
- setpgid:
  - "If pid is zero, then the process ID of the calling process is used. If pgid is zero, then the PGID of the process specified by pid is made the same as its process ID."
  - Moving between groups requires both "be part of the same session".
  - Errors: EACCES if the child "had already performed an execve(2)"; EPERM for a different session or for changing a session leader's PGID.
  - "A child created via fork(2) inherits its parent's process group ID. The PGID is preserved across an execve(2)."
  - "The setpgid() and getpgrp() calls are used by programs such as bash(1) to create process groups in order to implement shell job control." — [setpgid(2)](https://man7.org/linux/man-pages/man2/setpgid.2.html)
- Orphaned process groups: "If the termination of a process causes a process group to become orphaned, and if any member of the newly orphaned process group is stopped, then a SIGHUP signal followed by a SIGCONT signal will be sent to each process in the newly orphaned process group." — [setpgid(2)](https://man7.org/linux/man-pages/man2/setpgid.2.html)
- setsid:
  - "creates a new session if the calling process is not a process group leader. The calling process is the leader of the new session ... also becomes the process group leader of a new process group ... Initially, the new session has no controlling terminal."
  - "EPERM ... setsid() fails if the calling process is already a process group leader." "In order to be sure that setsid() will succeed, call fork(2) and have the parent _exit(3), while the child (which by definition can't be a process group leader) calls setsid()."
  - "If a process that is a session leader terminates, then a SIGHUP signal is sent to each process in the foreground process group of the controlling terminal." — [setsid(2)](https://man7.org/linux/man-pages/man2/setsid.2.html)
- tcsetpgrp: "makes the process group with process group ID pgrp the foreground process group on the terminal". "If tcsetpgrp() is called by a member of a background process group in its session, and the calling process is not blocking or ignoring SIGTTOU, a SIGTTOU signal is sent to all members of this background process group." — [tcsetpgrp(3)](https://man7.org/linux/man-pages/man3/tcsetpgrp.3.html)
- CMU picture: shell pid=10/pgid=10; foreground job pgid=20 (children 21, 22 share pgid 20); background jobs pgid=32 and pgid=40. "Every process belongs to exactly one process group". In its `ps` STAT output, `T` = stopped, `s` = session leader, `+` = foreground process group. — [CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)

**Job control (Bash)**
- "Job control refers to the ability to selectively stop (suspend) the execution of processes and continue (resume) their execution at a later point." "The shell associates a job with each pipeline." On `&` it prints e.g. `[1] 25647`, meaning "this job is job number 1 and that the process ID of the last process in the pipeline associated with this job is 25647." "Members of the foreground process group (processes whose process group ID is equal to the current terminal process group ID) receive keyboard-generated signals such as SIGINT." Background processes "are immune to keyboard-generated signals". "The system sends a SIGTTIN (SIGTTOU) signal to background processes which attempt to read from (write to when tostop is in effect) the terminal". "Typing the suspend character (typically '^Z', Control-Z) while a process is running stops that process and returns control to Bash." "^Y" is the delayed suspend. — [Bash §7.1 Job Control Basics](https://tiswww.case.edu/php/chet/bash/bashref.html#Job-Control-Basics)
- Job specs: `%n`, `%ce` (prefix), `%?ce` (substring), `%%`/`%+`/`%` (current), `%-` (previous). "'%1' is a synonym for 'fg %1' ... '%1 &' resumes job 1 in the background, equivalent to 'bg %1'." "Bash executes any trap on SIGCHLD for each child process that terminates." Exiting with stopped jobs prints a warning; "If the user immediately attempts to exit again ... Bash does not print another warning, and terminates any stopped jobs." — [Bash §7.1](https://tiswww.case.edu/php/chet/bash/bashref.html#Job-Control-Basics)
- Builtins:
  - `bg` "Resume each suspended job jobspec in the background, as if it had been started with '&'";
  - `fg` "Resume the job jobspec in the foreground and make it the current job";
  - `jobs [-lnprs]`;
  - `kill` sends SIGTERM by default; "kill -l exit_status" prints the signal name ("kill assumes that process exit statuses are greater than 128");
  - `wait` returns 127 if the id is not a child, and ">128" if interrupted by a signal;
  - `disown [-h]` removes a job from the table, or marks it so it does not get SIGHUP;
  - `suspend`. — [Bash §7.2 Job Control Builtins](https://tiswww.case.edu/php/chet/bash/bashref.html#Job-Control-Builtins)
- Shell signal behaviour:
  - "When Bash is interactive, in the absence of any traps, it ignores SIGTERM (so that 'kill 0' does not kill an interactive shell), and catches and handles SIGINT (so that the wait builtin is interruptible)." "In all cases, Bash ignores SIGQUIT. If job control is in effect, Bash ignores SIGTTIN, SIGTTOU, and SIGTSTP."
  - "Non-builtin commands Bash executes have signal handlers set to the values inherited by the shell from its parent, unless trap sets them to be ignored, in which case the child process will ignore them as well. When job control is not in effect, asynchronous commands ignore SIGINT and SIGQUIT in addition to these inherited handlers."
  - "The shell exits by default upon receipt of a SIGHUP. Before exiting, an interactive shell resends the SIGHUP to all jobs, running or stopped. The shell sends SIGCONT to stopped jobs to ensure that they receive the SIGHUP".
  - "If Bash is waiting for a command to complete and receives a signal for which a trap has been set, it will not execute the trap until the command completes. If Bash is waiting for an asynchronous command via the wait builtin ..., the wait builtin will return immediately with an exit status greater than 128".
  - "When job control is enabled, and Bash is waiting for a foreground command to complete, the shell does not receive keyboard-generated signals, because it is not in the same process group as the terminal." — [Bash §3.7.6 Signals](https://tiswww.case.edu/php/chet/bash/bashref.html#Signals)
- Verified locally (non-interactive bash 3.2):
  - *Without* job control, a background pipeline's processes had the **shell's** PGID.
  - After `set -m`, the pipeline `sleep 3 | sleep 3 &` got its **own** PGID, equal to the PID of its first process.
  - `kill -STOP %1` put *both* pipeline members in state `T`, `kill -CONT %1` returned them to `S`, and `kill %1` removed them.
  - `wait` interrupted by a trapped SIGUSR1 returned **158** on macOS (128+30). Linux would give 138, since SIGUSR1 is 10 there.

**trap, exit, exec builtins**
- `trap [-lpP] [action] [sigspec ...]`:
  - "If action is absent (and there is a single sigspec) or equal to '-', each specified sigspec's disposition is reset to the value it had when the shell was started. If action is the null string, then the signal specified by each sigspec is ignored by the shell and commands it invokes."
  - "If a sigspec is 0 or EXIT, action is executed when the shell exits."
  - DEBUG runs before every simple command; RETURN runs after a function or sourced script; ERR runs on a non-zero status, except in `while`/`until` tests, `if` tests, non-final `&&`/`||` members, non-last pipeline members, or `!`.
  - "signals ignored upon entry to a non-interactive shell cannot be trapped or reset." "Trapped signals that are not being ignored are reset to their original values in a subshell or subshell environment when one is created." — [Bash §4.1 Bourne Shell Builtins (trap)](https://tiswww.case.edu/php/chet/bash/bashref.html#Bourne-Shell-Builtins)
- `exit [n]`: "Exit the shell, returning a status of n to the shell's parent ... Any trap on EXIT is executed before the shell terminates." `exec [command]`: "If command is supplied, it replaces the shell without creating a new process." "If command is not specified, redirections may be used to affect the current shell environment." — [Bash §4.1](https://tiswww.case.edu/php/chet/bash/bashref.html#Bourne-Shell-Builtins)
- Verified locally:
  - `trap '' INT` then a child that does `kill -INT $$` → the child **survived** (status 0);
  - `trap 'echo parent caught' INT` then the same child → the child was killed by SIGINT (status **130**);
  - an `EXIT` trap ran on `exit 3` and the status stayed 3;
  - SIGTERM was sent at about 1 s while `sleep 2` ran in the foreground. The trap's `echo got TERM; exit 143` ran, the command after `sleep` never ran, and the status was 143. This is consistent with the manual's rule that a trap waits for the foreground command to finish; the exact firing time was not measured.

**Daemons**
- SysV daemon recipe (15 steps). The process-related core:
  1. Close all fds except 0, 1, 2.
  2. Reset all signal handlers to default.
  3. Reset the signal mask with sigprocmask.
  4. Sanitise the environment.
  5. fork().
  6. "In the child, call setsid() to detach from any terminal and create an independent session."
  7. "In the child, call fork() again, to ensure that the daemon can never re-acquire a terminal again."
  8. "Call exit() in the first child, so that only the second child (the actual daemon process) stays around. This ensures that the daemon process is re-parented to init/PID 1, as all daemons should be."
  9. Connect /dev/null to stdin/stdout/stderr.
  10. umask(0).
  11. chdir("/").
  12. Write a PID file.
  13. Drop privileges.
  14. Notify the original process.
  15. The original process exits.

  "The BSD daemon() function should not be used, as it implements only a subset of these steps." — [daemon(7)](https://man7.org/linux/man-pages/man7/daemon.7.html)
- New-style daemons (systemd): "none of the initialization steps recommended for SysV daemons need to be implemented". Recommended behaviour: "If SIGTERM is received, shut down the daemon and exit cleanly"; "If SIGHUP is received, reload the configuration files". — [daemon(7)](https://man7.org/linux/man-pages/man7/daemon.7.html)

### Inferences
- Decode `$?` fast:
  - 0 OK; 1 general failure; 2 builtin misuse;
  - 126 found but not executable; 127 not found;
  - 130 Ctrl-C (SIGINT); 137 kill -9 (and Linux OOM kills); 139 segfault; 141 SIGPIPE; 143 SIGTERM.
  - Statuses ≥256 wrap modulo 256.
- Why each job gets its own process group: Ctrl-C/Ctrl-Z go to the *foreground process group*. The shell must not be in that group, or it would be interrupted too. That is also why the interactive shell itself ignores SIGTSTP/SIGTTIN/SIGTTOU.
- Why daemons double-fork:
  - `setsid` needs a non-group-leader, which the first fork guarantees;
  - the second fork makes the daemon a non-session-leader, so opening a tty can't make it the controlling terminal;
  - the exiting intermediate parent leaves the daemon re-parented to init.
- Trap inheritance mirrors execve exactly: ignore (`trap ''`) survives into children; catch (`trap 'cmd'`) is reset to default. A caught action is shell code that cannot exist inside the child program.
- Shell vs C mapping for the oral exam:
  - `cmd &` = fork without wait;
  - `wait` = waitpid;
  - `$!` = the PID returned by fork;
  - `$?` = WEXITSTATUS, or 128+WTERMSIG;
  - `( … )` = fork with no exec;
  - `exec cmd` = exec with no fork;
  - `cmd > f` = fork, open/dup2 in the child, then exec.

### Gaps
- gnu.org was unreachable from my environment (connection refused/timeouts). The Bash 5.3 manual was read from the bash maintainer's copy at case.edu instead; the content is the same manual.
- macOS ships bash 3.2.57 (verified), so some Bash 5.x features described in the manual may be missing locally. Test bash-specific behaviour on the course's Linux machines.
- Real interactive Ctrl-Z/`fg` could not be exercised in my non-interactive sandbox. Job-control behaviour was simulated with `set -m`, `kill -STOP`/`-CONT` and `ps`, and is otherwise cited from the manuals.

---

## 7. What process 1 (init/systemd) does: reaping, and the special signal semantics for PID 1

### Takeaway
PID 1 is the ancestor of last resort. Orphans (and orphaned zombies) are re-parented to it, unless a subreaper is closer, and it reaps them. The kernel protects it: only signals for which PID 1 has *installed a handler* can be sent to it, so default-action signals like SIGTERM/SIGINT do nothing unless init chose to handle them. In a container, your program may *be* PID 1, which is why `--init`/tini exists.

### Cited Findings
- "The only signals that can be sent to process ID 1, the init process, are those for which init has explicitly installed signal handlers. This is done to assure the system is not brought down accidentally." — [kill(2) NOTES](https://man7.org/linux/man-pages/man2/kill.2.html). Also `kill(-1, sig)` goes to every permitted process "except for process 1 (init)". — [kill(2)](https://man7.org/linux/man-pages/man2/kill.2.html)
- PID namespaces:
  - "The first process created in a new namespace ... has the PID 1, and is the "init" process for the namespace."
  - "When a child process becomes orphaned, it is reparented to the "init" process in the PID namespace of its parent (unless one of the nearer ancestors of the parent employed the prctl(2) PR_SET_CHILD_SUBREAPER command ...)."
  - "If the "init" process of a PID namespace terminates, the kernel terminates all of the processes in the namespace via a SIGKILL signal."
  - "Only signals for which the "init" process has established a signal handler can be sent to the "init" process by other members of the PID namespace. This restriction applies even to privileged processes, and prevents other members of the PID namespace from accidentally killing the "init" process."
  - "SIGKILL or SIGSTOP are treated exceptionally: these signals are forcibly delivered when sent from an ancestor PID namespace. Neither of these signals can be caught by the "init" process." — [pid_namespaces(7)](https://man7.org/linux/man-pages/man7/pid_namespaces.7.html)
- fork fails with ENOMEM on "An attempt was made to create a child process in a PID namespace whose "init" process has terminated." — [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)
- Reaping: orphaned zombies "are adopted by init(1) ... init(1) automatically performs a wait to remove the zombies." — [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html). CMU: "the orphaned child will be reaped by init process (pid == 1)". — [CMU L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf)
- systemd as PID 1: "When run as first process on boot (as PID 1), it acts as init system that brings up and maintains userspace services." Its documented signal meanings are chosen handlers, consistent with the kill(2) rule:
  - SIGTERM → "serializes its state, reexecutes itself and deserializes the saved state again" (≈ `systemctl daemon-reexec`);
  - SIGINT → starts `ctrl-alt-del.target`, and "If this signal is received more than 7 times per 2s, an immediate reboot is triggered";
  - SIGWINCH → `kbrequest.target`;
  - SIGPWR → `sigpwr.target`;
  - SIGUSR1 → reconnect to D-Bus;
  - SIGUSR2 → log state;
  - SIGHUP → "Reloads the complete daemon configuration" (≈ `systemctl daemon-reload`). — [systemd(1)](https://man7.org/linux/man-pages/man1/systemd.1.html)
- Containers: "A process running as PID 1 inside a container is treated specially by Linux: it ignores any signal with the default action. So, the process doesn't terminate on SIGINT or SIGTERM unless it's coded to do so." "You can use the --init flag to indicate that an init process should be used as the PID 1 in the container. Specifying an init process ensures the usual responsibilities of an init system, such as reaping zombie processes, are performed inside the created container." The default init "is backed by tini". — [Docker docs: docker container run](https://docs.docker.com/reference/cli/docker/container/run/)
- macOS (verified locally): `ps -p 1` shows `/sbin/launchd`, and an orphaned child's `getppid()` became 1.

### Inferences
- The three exam points about PID 1: (1) it adopts orphans and reaps them, so zombies cannot accumulate forever unless their *living* parent never waits; (2) it only receives signals it explicitly handles, which is why `kill -9 1` does nothing from inside its namespace and why a naive containerised program ignores `docker stop`'s SIGTERM; (3) its death kills the namespace (container), or the whole machine for the root namespace.
- If you write a program that may run as PID 1, install SIGTERM/SIGINT handlers and reap children in a SIGCHLD loop (section 5), or run it under a tiny init (`--init`/tini).

### Gaps
- What the kernel does when the *root-namespace* init exits (in practice a kernel panic) was not covered by any fetched source, so it is not asserted here.
- launchd's signal policy on macOS was not researched.

---

## 8. Fully worked "predict the output" problems (CMU-style), each with process graph, process count and ALL possible orderings — all compiled and run

### Takeaway
Nineteen worked problems follow. Each lists all possible outputs (computed exhaustively as topological sorts of the process graph) and the number of processes, and each was run on macOS: every observed output fell inside the predicted set. Exam lessons: orderings come from the graph, counts come from fork structure, `wait` edges remove orderings, and stdio buffers (not `printf` calls) decide what text appears and how many times.

### Cited Findings
Method and semantics sources: process graphs and topological sorts — [CMU L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf); fork/wait/exit semantics — [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html), [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html), [exit(3)](https://man7.org/linux/man-pages/man3/exit.3.html); buffering — [setbuf(3)](https://man7.org/linux/man-pages/man3/setbuf.3.html). "Observed" counts come from local runs on macOS 27.0.1 with Apple clang 21.0.0. Graph notation: each row is one process, `--fork--+` branches to a new row, `<` means "must come before". Outputs are shown one line per word.

#### WP1 — fork with a variable (CMU fork.c)
```c
int main(void) {
    int x = 1;
    pid_t pid = fork();
    if (pid == 0) { printf("child : x=%d\n", ++x); exit(0); }
    printf("parent: x=%d\n", --x);
    exit(0);
}
```
```
P  : x=1 --fork--+-- printf "parent: x=0" -- exit
                 +-- C1: printf "child : x=2" -- exit
```
- Processes: 2 (1 created).
- All outputs (2):
  - (a) `parent: x=0`, `child : x=2`
  - (b) `child : x=2`, `parent: x=0`
- Why: separate address spaces, and both copies start from x==1. Never `x=1` or `x=3`.
- Observed: (a) 148×, (b) 2× in 150 tty runs.

#### WP2 — two consecutive forks (CMU fork2)
```c
printf("L0\n"); fork(); printf("L1\n"); fork(); printf("Bye\n");
```
```
P    : L0 --fork--+-- L1 --fork--+-- Bye
                  |              +-- C2  : Bye
                  +-- C1  : L1 --fork--+-- Bye
                                       +-- C1.1: Bye
```
- Processes: 4. Lines: 7.
- Partial order: L0 < both L1; each L1 < the two Byes in its own subtree.
- All distinct outputs (3):
  1. `L0 L1 L1 Bye Bye Bye Bye`
  2. `L0 L1 Bye L1 Bye Bye Bye`
  3. `L0 L1 Bye Bye L1 Bye Bye`
- Infeasible: `L0 Bye L1 …` (a Bye before any L1) and `L0 L1 Bye Bye Bye L1 …` (only two Byes depend on the first L1).
- Observed: #1 146×, #2 4× (150 runs).

#### WP3 — nested forks in the parent (CMU fork4)
```c
printf("L0\n");
if (fork() != 0) { printf("L1\n"); if (fork() != 0) { printf("L2\n"); } }
printf("Bye\n");
```
```
P    : L0 --fork--+-- L1 --fork--+-- L2 -- Bye
                  |              +-- C2: Bye
                  +-- C1: Bye
```
- Processes: 3. Constraints: L0 < C1:Bye; L0 < L1 < C2:Bye; L1 < L2 < P:Bye.
- All outputs (5):
  1. `L0 Bye L1 Bye L2 Bye`
  2. `L0 Bye L1 L2 Bye Bye`
  3. `L0 L1 Bye Bye L2 Bye`
  4. `L0 L1 Bye L2 Bye Bye`
  5. `L0 L1 L2 Bye Bye Bye`
- Infeasible (CMU): `L0 Bye L1 Bye Bye L2`, because L2 must precede the parent's final Bye.
- Observed: 4 of the 5 orderings, with #4 most common (129/150).

#### WP4 — nested forks in the children (CMU fork5)
```c
printf("L0\n");
if (fork() == 0) { printf("L1\n"); if (fork() == 0) { printf("L2\n"); } }
printf("Bye\n");
```
```
P    : L0 --fork--+-- Bye
                  +-- C1: L1 --fork--+-- Bye
                                     +-- C1.1: L2 -- Bye
```
- Processes: 3. All outputs (5): the **same five strings as WP3**. The graphs are isomorphic: a chain L0 < L1 < L2 < Bye with one extra Bye hanging after L0 and one after L1.
- Infeasible (CMU): `L0 Bye L1 Bye Bye L2`.
- Observed: 3 of the 5.

#### WP5 — forks in loops (counting)
(a)
```c
for (int i = 0; i < 3; i++) fork();
printf("hi\n");
```
```
P --+-- fork@i=0 -> C1 --+-- fork@i=1 -> C1.1 ---- fork@i=2 -> C1.1.1
    |                    +-- fork@i=2 -> C1.2
    +-- fork@i=1 -> C2 ---- fork@i=2 -> C2.1
    +-- fork@i=2 -> C3
```
- Processes: 2^3 = 8 (a binomial tree: 1+3+3+1). Output: `hi` × 8, only 1 distinct string. Observed: 8 lines every run.

(b)
```c
for (int i = 0; i < n; i++) { fork(); printf("%d\n", i); }
```
- Processes: 2^n. Lines: 2^(n+1) - 2. Each process that prints `i` forks once more, and both copies print `i+1`, so every printed `i` "enables" exactly two printed `i+1`.
- n=2 (4 processes, 6 lines). All outputs (3):
  1. `0 0 1 1 1 1`
  2. `0 1 0 1 1 1`
  3. `0 1 1 0 1 1`
- n=3 (8 processes, 14 lines: two 0s, four 1s, eight 2s). **279** distinct orderings out of the 45,045 ways to arrange those 14 symbols. Exact rule (checked by computer against all 45,045 arrangements): **at every prefix, #1s ≤ 2·#0s and #2s ≤ 2·#1s**. So the first line is always 0.
- Feasible example: `0 1 2 0 1 1 1 2 2 2 2 2 2 2`. P prints 0, then 1, then one of the 2s from P's subtree appears before C1 prints its 0.
- Infeasible example: `0 1 2 2 2 0 1 1 1 2 2 2 2 2`. Three 2s appear after only one 1, but each printed 1 enables exactly two 2s.
- Observed (60 runs): 6 distinct orderings, all inside the 279.

(c) fan vs chain
```c
for (i = 0; i < 3; i++) if (fork() == 0) break;   /* FAN: children leave the loop  */
for (i = 0; i < 3; i++) if (fork() != 0) break;   /* CHAIN: parents leave the loop */
```
- Both give 4 processes. The fan is one parent with 3 children (all children report the same PPID). The chain is P→C1→C2→C3, each process the parent of the next.
- Verified: in the fan, all three children had PPID = the original PID. In the chain, each PPID was the previous process.

#### WP6 — short-circuit operators (classic counting traps)
(a)
```c
fork() && fork() || fork();  printf("x\n");
```
`&&` binds tighter: `(A && B) || C`.
```
P    : A=fork -+- A>0: B=fork -+- B>0: (A&&B) true, C skipped .......... "x"
               |               +-- C2: B==0: false -> C=fork -+- "x"
               |                                              +-- C2.1: "x"
               +-- C1: A==0: && short-circuits -> C=fork -+- "x"
                                                          +-- C1.1: "x"
```
- **5 processes**, 5 × `x`. Verified.

(b)
```c
if (fork() || fork()) fork();  printf("1\n");
```
```
P    : A=fork -+- A>0: || true -> fork -+- "1"
               |                        +-- C3: "1"
               +-- C1: A==0 -> B=fork -+- B>0: true -> fork -+- "1"
                                       |                     +-- C4: "1"
                                       +-- C2: B==0: false ........ "1"
```
- **5 processes**. Verified.
- Related (verified): `fork() || fork();` → 3 processes; `if (fork() && fork()) fork();` → 4 processes.

#### WP7 — wait removes orderings (CMU fork9 and a variant)
```c
if (fork() == 0) { printf("HC\n"); exit(0); }
else { printf("HP\n"); wait(&s); printf("CT\n"); }
printf("Bye\n");
```
```
P  : --fork--+-- HP -- wait ------ CT -- Bye
             |          ^ (child exit -> wait returns)
             +-- C1: HC -- exit
```
- Outputs (2): `HC HP CT Bye`, `HP HC CT Bye`. Infeasible: `HP CT Bye HC`.

Variant E3:
```c
pid = fork();
if (pid == 0) { printf("1\n"); }
else { printf("2\n"); wait(NULL); printf("3\n"); }
printf("4\n");
```
- The child prints `1 4` and exits. The parent prints `2`, waits, then `3 4`.
- Outputs (3):
  1. `1 2 4 3 4`
  2. `1 4 2 3 4`
  3. `2 1 4 3 4`
- Observed: all 3 (72/7/1 in 80 runs).

#### WP8 — the same tree with and without waits
```c
printf("A\n");
if (fork() == 0) {
    printf("B\n");
    if (fork() == 0) printf("C\n");
    else wait(NULL);                 /* remove for E2 */
} else wait(NULL);                   /* remove for E2 */
printf("D\n");
```
```
P   : A --fork--+-- (wait) ----------------------- D
                +-- C1: B --fork--+-- (wait) ------ D
                                  +-- C1.1: C -- D
```
- 3 processes.
- E1 (with waits): exactly 1 output, `A B C D D D`.
- E2 (no waits): 5 outputs:
  1. `A B C D D D`
  2. `A B D C D D`
  3. `A B D D C D`
  4. `A D B C D D`
  5. `A D B D C D`
- The last line is always a D, because C is followed by D in the same process.
- Observed: E1 1/1; E2 3 of the 5.

#### WP9 — chain with a counter and waits
```c
int x = 0;
for (int i = 0; i < 3; i++) {
    if (fork() == 0) x++;           /* child keeps looping */
    else { wait(NULL); break; }     /* parent waits, then stops */
}
printf("%d\n", x);
```
```
P(x=0) --fork--> C1(x=1) --fork--> C2(x=2) --fork--> C3(x=3)
 wait <--exit--   wait <--exit--    wait <--exit--    print 3
 print 0          print 1           print 2
```
- 4 processes. The only output is `3 2 1 0`. The deepest process prints first because each parent waits. Verified in tty and pipe runs.

#### WP10 — wait() vs waitpid() reaping order (CMU fork10/fork11 style)
```c
for (i = 0; i < 3; i++) if ((pid[i] = fork()) == 0) exit(100 + i);
for (i = 2; i >= 0; i--) { w = wait(&st);               /* version A */
                           /* w = waitpid(pid[i], &st, 0);  version B */
                           printf("reaped #%d status %d\n", index_of(w), WEXITSTATUS(st)); }
```
- 4 processes.
- Version A (`wait`): any of the **3! = 6** orders. CMU: "If multiple children completed, will take in arbitrary order". Observed 2 different orders in 6 runs.
- Version B (`waitpid` in reverse): always `#2 102, #1 101, #0 100`. Verified.

#### WP11 — decoding statuses (and an accidental buffering duplicate)
Children do `exit(300)`, `exit(-1)` and `return 7`; one is SIGKILLed, one is SIGTERMed, one dereferences NULL. Then the parent calls `wait` with no children left.
- Output on a terminal:
  - `exit(300)` → WEXITSTATUS **44**; `exit(-1)` → **255**; `return 7` → **7**;
  - SIGKILL → WTERMSIG **9**; SIGTERM → **15**; NULL dereference → **11**;
  - `wait()` with no children → **-1**.
- The same binary with stdout **piped** printed the `exit(300)` line **3 times** and the `exit(-1)` line **twice**. The parent's unflushed buffer was copied into later children, and those that ended with `exit()`/`return` flushed their copy. Children killed by signals or ending in `_exit` flushed nothing. This is the WP12 trap appearing by accident in real code.

#### WP12 — stdio buffering traps
(a)
```c
printf("A"); if (fork()==0){ printf("B\n"); return 0; } wait(NULL); printf("C\n");
```
- Output: `AB`, then `AC` (tty and pipe). Both processes hold the un-newlined `A`.

(b)
```c
printf("hello\n"); if (fork()==0){ printf("child\n"); return 0; } wait(NULL); printf("parent\n");
```
- tty: `hello child parent`. Pipe/file: `hello child hello parent`. On a pipe `"hello\n"` is still in the block buffer at fork time.

(c)
```c
printf("X"); if (fork()==0) _exit(0); wait(NULL); printf("Y\n");
```
- Output: `XY`. Replace `_exit(0)` with `exit(0)` and the output is `XXY`: the child's copy of "X" is flushed too.

(d)
```c
for (i=0;i<2;i++){ fork(); printf("-"); }
```
- **8** dashes on both tty and pipe: 4 processes, and each final buffer holds "--". With `"-\n"`: **6** on a tty and **8** on a pipe.

#### WP13 — exec traps
(a)
```c
printf("A ");
if (fork() == 0) { execlp("echo", "echo", "B", (char *)NULL); printf("C\n"); return 1; }
wait(NULL); printf("D\n");
```
- Output: `B`, then `A D`.
- The child's buffered "A " is destroyed by exec, and C never prints because exec succeeded. The parent's own "A " comes out with "D".
- 2 processes; `echo` runs inside the child process with the same PID.

(b) Dispositions across exec. The parent sets `signal(SIGINT, SIG_IGN)` and then fork+exec `sh -c 'kill -INT $$; echo survived SIGINT'`.
- With `SIG_IGN`: prints `survived SIGINT`, and the child exits 0.
- With a handler instead: the child is killed by signal 2. The handler was reset to SIG_DFL by exec.

#### WP14 — shared file offset across fork
```c
int fd = open("shared.txt", O_WRONLY|O_CREAT|O_TRUNC, 0644);
if (fork()==0){ write(fd,"child\n",6); _exit(0); }
wait(NULL); write(fd,"parent\n",7);
```
- `shared.txt` = `child\nparent\n`: one open file description, so the offset is shared.
- If each process `open()`s *after* the fork, there are two descriptions with two offsets, both starting at 0. The parent's later write overwrote the child's, and the file became `PARENT\n`.

#### WP15 — pipes: EOF needs every write end closed; writing to no readers raises SIGPIPE
```c
int fd[2]; pipe(fd);
if (fork()==0){ close(fd[0]); write(fd[1],"hello\n",6); _exit(0); }
close(fd[1]);                                   /* forget this line -> parent never sees EOF */
while ((n = read(fd[0], buf, sizeof buf)) > 0) total += n;
```
- With the close: `parent read 6 bytes, then EOF`.
- Without it: hangs forever (killed by a 2 s alarm in the test → status 142 = 128+14).
- `yes | head -1` → `yes` dies of SIGPIPE, `PIPESTATUS[0]` = 141.
- Rule (pipe(7)): "If all file descriptors referring to the read end of a pipe have been closed, then a write(2) will cause a SIGPIPE signal to be generated for the calling process. If the calling process is ignoring this signal, then write(2) fails with the error EPIPE. An application that uses pipe(2) and fork(2) should use suitable close(2) calls to close unnecessary duplicate file descriptors; this ensures that end-of-file and SIGPIPE/EPIPE are delivered when appropriate." — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)

#### WP16 — signals are not queued (three demonstrations)
(a) The handler does `counter++`. The child sends `kill(getppid(), SIGUSR1)` 5 times and exits; the parent waits and prints `counter`.
- Possible: **1..5**. Never 0: at least one SIGUSR1 is pending before the child exits and is delivered before `wait` returns to user code.
- Observed over 300 runs: 1 (286), 2 (13), 3 (1).

(b) Block SIGINT; `raise(SIGINT)` × 3; check `sigpending`; unblock.
- Output: `pending? 1  hits so far = 0`, then `hits after unblock = 1`. Always exactly one.

(c) Block SIGCHLD, fork 10 children that `_exit(0)`, sleep, then unblock.
- One-reap handler: `handler calls=1 reaped=1 zombies left=9`.
- `while (waitpid(-1,NULL,WNOHANG) > 0)` handler: `calls=1 reaped=10 zombies left=0`.
- Deterministic.

#### WP17 — EINTR, SA_RESTART, sleep, pause, alarm
- `read()` on an empty pipe; SIGALRM at 1 s; data at 2 s.
  - No SA_RESTART: `[SIGALRM handler]`, then `read returned -1, errno=Interrupted system call`.
  - SA_RESTART: `[SIGALRM handler]`, then `read returned 1 byte ('x')`.
- `alarm(3); sleep(10)` → `sleep` returns **7** even with SA_RESTART. `pause()` → -1/EINTR after the handler. `alarm(5); sleep(1); alarm(0)` → **4**.

#### WP18 — zombie and orphan, observed
- Zombie: the child `_exit`s, and the parent sleeps 1 s and runs `ps`: `STAT Z`, `COMM <defunct>`. After `waitpid` the row is gone.
- Orphan: the child prints its PPID (the parent's PID), the parent exits without waiting, and the child prints PPID again: **1** on macOS (launchd). Linux gives 1 or a subreaper's PID.
- `signal(SIGCHLD, SIG_IGN)`: no zombie row, and `wait()` → -1 `No child processes`.

#### WP19 — process groups and job control from a shell
- Running `w20_pgid` from a non-interactive shell: the parent *and* the child show the **shell's** PGID (no job control). After `setpgid(0,0)` the child's PGID equals its own PID.
- `set -m`: each background pipeline gets its own PGID = the PID of its first member. `kill -STOP %1` → both members `T`; `kill -CONT %1` → `S`; `kill %1` → gone. All of this is consistent with [setpgid(2)](https://man7.org/linux/man-pages/man2/setpgid.2.html) and [Bash §7.1](https://tiswww.case.edu/php/chet/bash/bashref.html#Job-Control-Basics).

### Inferences
- Exam recipe for any fork puzzle:
  1. Number the `fork` calls and draw one row per process, carrying each process's variable values.
  2. Mark every `printf` vertex with its exact text.
  3. Add wait edges.
  4. Count processes by counting rows (2^k for k unconditional forks; short-circuit operators prune branches).
  5. List the topological sorts, collapsing identical strings.
  6. **Before answering**, ask: is any `printf` missing a `\n` before a `fork`? Is stdout possibly redirected? Is there an `exec` or an `_exit`?
- When explaining code in person (the course grades on this), narrate it as "who exists at this line, and what does each copy hold (variables, fds, stdio buffer, mask, handlers)?" That is exactly the information in the process graph.
- Real machines strongly favour one ordering (parent-first on macOS here). A single test run proves nothing about *possible* orderings, which is why exam answers must come from the graph.

### Gaps
- WebSearch was unavailable (session budget exhausted), so I could not pull additional official .edu answer keys beyond the CMU slides. The extra puzzles are my own variants, verified by both exhaustive enumeration and execution.
- Runs were on macOS only. Ordering frequencies will differ on Linux, but the feasible sets do not depend on the OS.

---

## 9. Practice questions with answers (20)

### Takeaway
These twenty questions target the most-tested points. Every numeric answer was checked by running code (macOS) or by exhaustive enumeration, and the semantic answers cite the governing man page or manual.

### Cited Findings
1. **Q:** How many processes exist after `fork(); fork(); fork();` (including the original)? **A:** 8 (7 new). Each fork doubles the existing processes ([fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)). Verified (8 lines).
2. **Q:** `for (i=0;i<4;i++){ fork(); printf("x\n"); }` — how many lines on a terminal? How many processes? **A:** 2+4+8+16 = 30 lines; 16 processes. The formula 2^(n+1) - 2 was checked for n=3 (14 lines).
3. **Q:** How many processes for `fork() || fork();`? For `fork() && fork() || fork();`? For `if (fork() || fork()) fork();`? For `if (fork() && fork()) fork();`? **A:** 3, 5, 5, 4 (all verified by running). Short-circuiting means a returned 0 (child) or nonzero (parent) decides whether the next fork runs.
4. **Q:** List all outputs of: `printf("a\n"); if (fork()==0){ printf("b\n"); exit(0);} printf("c\n"); wait(NULL); printf("d\n");` **A:** `a b c d` and `a c b d` (2). Without the `wait`: also `a c d b` (3). Enumerated; wait semantics per [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html).
5. **Q:** For CMU fork2 (`L0; fork; L1; fork; Bye`), is `L0 L1 Bye Bye Bye L1 Bye` possible? **A:** No. Only two Byes depend on the first L1. The 3 feasible strings are in WP2 ([CMU L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf)).
6. **Q:** What does `printf("hi"); fork(); printf("\n");` print? **A:** `hi` twice (two lines). The buffer holding "hi" is copied by fork ([stdout(3)](https://man7.org/linux/man-pages/man3/stdout.3.html)).
7. **Q:** A program does `printf("start\n"); fork(); printf("end\n");`. What appears on a terminal vs in `out.txt` after `./prog > out.txt`? **A:** Terminal: `start end end`. File: `start end` written **twice** (two blocks, either order). Files are block-buffered, so "start\n" is still unflushed at fork time ([setbuf(3)](https://man7.org/linux/man-pages/man3/setbuf.3.html)). Verified (WP12b).
8. **Q:** `for (i=0;i<2;i++){ fork(); printf("-"); }` — how many dashes? **A:** 8, not 6 (verified). With `"-\n"` on a terminal: 6.
9. **Q:** A child calls `exit(258)`. What do `WEXITSTATUS` and bash's `$?` show? And for `exit(-1)`? **A:** 2 and 2; 255 and 255. Only the low 8 bits are kept ([wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html), [POSIX §2.8.2](https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html#tag_19_08_02)). Verified.
10. **Q:** Bash reports `$?` = 127, 126, 130, 137, 139, 141, 143. Meaning of each? **A:** 127 not found; 126 found but not executable; 130 SIGINT (Ctrl-C); 137 SIGKILL; 139 SIGSEGV; 141 SIGPIPE; 143 SIGTERM, i.e. 128+n ([Bash §3.7.5](https://tiswww.case.edu/php/chet/bash/bashref.html#Exit-Status)). Verified for 126, 127, 130, 137, 141, 143. The numbers for SIGUSR1, SIGCHLD and similar differ on macOS.
11. **Q:** Which survive `execve`? **A:**
    - (a) PID — yes;
    - (b) a SIGINT *handler* — **no**, reset to default;
    - (c) SIGINT = SIG_IGN — yes;
    - (d) the blocked-signal mask — yes;
    - (e) an fd with FD_CLOEXEC — no;
    - (f) an ordinary fd — yes;
    - (g) unflushed printf data — **no** (lost);
    - (h) a pending alarm — yes;
    - (i) atexit handlers — no;
    - (j) environment — yes via `environ` unless an `e` variant passes a new envp.

    Sources: [execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html), [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html), [alarm(2)](https://man7.org/linux/man-pages/man2/alarm.2.html), [exec(3)](https://man7.org/linux/man-pages/man3/exec.3.html).
12. **Q:** Why are fork and exec separate system calls? **A:** So the shell can run code in the child after fork and before exec: redirect fds (close/open or dup2), build pipes, change the environment or process group. The program being run needs no changes ([OSTEP ch. 5 §5.4](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf)).
13. **Q:** A SIGCHLD handler calls `wait(NULL)` once. Five children exit at about the same time. How many zombies can remain, and what is the fix? **A:** 0 to 4 can remain: signals coalesce, and at least one child gets reaped. Fix: `while ((pid = waitpid(-1, &st, WNOHANG)) > 0) …` and save/restore errno ([signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html), [CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)). Verified: with SIGCHLD blocked, 9 of 10 children stayed zombies.
14. **Q:** Is this handler correct: `int count; void h(int s){ printf("caught\n"); count++; }`? **A:** No.
    - `printf` is not async-signal-safe; use `write`.
    - Shared globals should be `volatile sig_atomic_t`, ideally only assigned (`flag = 1`).
    - errno should be saved and restored.

    Sources: [signal-safety(7)](https://man7.org/linux/man-pages/man7/signal-safety.7.html), CMU G0–G5 ([CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)).
15. **Q:** SIGUSR1 is blocked, arrives 3 times, then is unblocked. How many handler runs? **A:** 1. "only one instance of the signal is marked as pending" ([signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)). Verified (WP16b).
16. **Q:** A SIGALRM handler interrupts `read()` on a pipe. Result without and with SA_RESTART? What does `sleep(10)` return if interrupted after 3 s? **A:** -1/EINTR; restarted and keeps blocking; 7. `sleep` is never restarted ([signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)). Verified.
17. **Q:** Can you catch, block or ignore SIGKILL? SIGSTOP? SIGTSTP? **A:** SIGKILL and SIGSTOP: none of the three ([signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)). SIGTSTP (Ctrl-Z) **can** be caught or ignored; job-control shells ignore it ([Bash §3.7.6](https://tiswww.case.edu/php/chet/bash/bashref.html#Signals)).
18. **Q:** What do `kill(0,SIGTERM)`, `kill(-1,SIGTERM)`, `kill(-1234,SIGTERM)` and `kill(pid,0)` do? **A:** Signal the caller's process group; signal every process the caller may signal except PID 1 (and, on Linux, not the caller itself); signal process group 1234; send nothing, just check existence and permission ([kill(2)](https://man7.org/linux/man-pages/man2/kill.2.html)).
19. **Q:** Zombie vs orphan? Who reaps an orphaned zombie? How do you spot a zombie? **A:** A zombie has terminated and not been waited for. An orphan's parent has died. Orphans are re-parented to init (PID 1) or the nearest subreaper, which reaps them. `ps` shows `Z` / `<defunct>` ([wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html), [PR_SET_CHILD_SUBREAPER](https://man7.org/linux/man-pages/man2/PR_SET_CHILD_SUBREAPER.2const.html), [CMU L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf)). Verified on macOS.
20. **Q:** You run `sleep 100`, press Ctrl-Z, type `bg`, then `kill %1`. Which signals go to whom? Why doesn't Ctrl-C kill the shell? Why does a classic daemon fork twice? **A:**
    - Ctrl-Z: the terminal driver sends SIGTSTP to the foreground process group (sleep's job), which stops.
    - `bg`: SIGCONT to the job's group, which now runs in the background.
    - `kill %1`: SIGTERM to the job; bash then reports it as terminated.
    - The interactive shell is in a different process group from the foreground job, and also handles SIGINT itself ([Bash §7.1](https://tiswww.case.edu/php/chet/bash/bashref.html#Job-Control-Basics), [§3.7.6](https://tiswww.case.edu/php/chet/bash/bashref.html#Signals), [credentials(7)](https://man7.org/linux/man-pages/man7/credentials.7.html)).
    - Daemon: the first fork ensures `setsid()` succeeds (a non-leader may call it); `setsid()` detaches from the terminal; the second fork ensures the daemon can never reacquire a terminal and is re-parented to init ([daemon(7)](https://man7.org/linux/man-pages/man7/daemon.7.html), [setsid(2)](https://man7.org/linux/man-pages/man2/setsid.2.html)).

Bonus (shell):
- `x=0; echo 5 | read x; echo $x` prints `0` in bash but `5` in zsh (verified). Pipeline members run in subshells in bash ([Bash §3.2.3](https://tiswww.case.edu/php/chet/bash/bashref.html#Pipelines)).
- `trap '' INT; ./job` → Ctrl-C cannot kill `./job`, because ignore is inherited. `trap 'echo hi' INT; ./job` → `./job` dies on Ctrl-C, because caught traps are reset in children ([Bash §4.1 trap](https://tiswww.case.edu/php/chet/bash/bashref.html#Bourne-Shell-Builtins)). Verified with `kill -INT`.

### Inferences
- For the oral part, practise answering Q4, Q7, Q11 and Q13 *while drawing*: (1) the process graph, (2) each process's copy of the buffer/fd table, (3) the pending/blocked bits. These three pictures cover nearly every question type in the "process graphs, pipes and signals" workshop scope.

### Gaps
- No official answer key from the course itself was available or used; these are outside-practice questions.

---

## 10. Common traps (checklist) and the best free resources

### Takeaway
Most lost marks come from the same dozen traps (below). The best free material is OSTEP ch. 5 plus its fork simulators, the public CMU 15-213 process/signal slides, the man7.org man pages, the free TLPI ch. 24, and the Bash manual.

### Cited Findings
**Trap checklist (each verified or cited above)**
1. Assuming parent-first or child-first order. It is indeterminate ([TLPI ch. 24](https://man7.org/tlpi/download/TLPI-24-Process_Creation.pdf)). Answer with the set of all topological sorts ([CMU L14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf)).
2. Counting `printf` calls instead of buffer copies: `printf` without `\n`, or stdout redirected, before `fork` ([setbuf(3)](https://man7.org/linux/man-pages/man3/setbuf.3.html), [stdout(3)](https://man7.org/linux/man-pages/man3/stdout.3.html)). Verified in WP12.
3. Expecting output written before `exec` to appear. Buffered data is destroyed by exec. Use `fflush` or `\n` on a tty ([execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html)). WP13.
4. Using `exit()` instead of `_exit()` in a forked child or after a failed exec: it flushes duplicated buffers and runs the parent's atexit handlers ([vfork(2)](https://man7.org/linux/man-pages/man2/vfork.2.html), [TLPI ch. 24](https://man7.org/tlpi/download/TLPI-24-Process_Creation.pdf)).
5. Thinking a variable change in the child affects the parent. Memory is separate; fds point to shared open file descriptions with a shared offset ([fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)).
6. Forgetting to close unused pipe ends: the reader never sees EOF ([pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)). WP15.
7. Expecting `exit(256)` or `exit(-1)` to show up as 256 or -1. Only the low 8 bits survive ([wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)).
8. Calling `WEXITSTATUS` without checking `WIFEXITED`, or passing `&status` to the macros. They take the int itself ([wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)).
9. One `wait` per SIGCHLD. Signals don't queue: loop with `WNOHANG` ([signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html), [CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)).
10. Using signals to count events (WP16a). `printf`/`malloc`/`exit` in handlers; not saving errno; flags that are not `volatile sig_atomic_t` ([signal-safety(7)](https://man7.org/linux/man-pages/man7/signal-safety.7.html)).
11. Race: the child can finish before the parent records its PID. Block SIGCHLD before `fork` ([CMU L15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)). `while(!flag) pause();` is racy; use `sigsuspend` ([sigsuspend(2)](https://man7.org/linux/man-pages/man2/sigsuspend.2.html)).
12. Assuming SA_RESTART restarts everything. `pause`, `sigsuspend`, `select`/`poll`, `nanosleep` and `sleep` are never restarted ([signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)).
13. Using `signal()` to install handlers in portable code. Use `sigaction` ([signal(2)](https://man7.org/linux/man-pages/man2/signal.2.html)).
14. Hard-coding signal numbers. They differ between Linux and macOS ([signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html); local `kill -l`).
15. Expecting a handler to survive exec (it doesn't), or SIG_IGN to be cleared by exec (it isn't) ([signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)). Same for bash `trap` ([Bash §4.1](https://tiswww.case.edu/php/chet/bash/bashref.html#Bourne-Shell-Builtins)).
16. Shell: expecting `cmd | read var` or `( var=… )` to change the current shell's variables in bash ([Bash §3.7.3](https://tiswww.case.edu/php/chet/bash/bashref.html#Command-Execution-Environment)). Expecting a pipeline's status to reflect the first command without `pipefail` ([Bash §3.2.3](https://tiswww.case.edu/php/chet/bash/bashref.html#Pipelines)).
17. PID 1 / containers: a program running as PID 1 ignores default-action signals such as SIGTERM ([pid_namespaces(7)](https://man7.org/linux/man-pages/man7/pid_namespaces.7.html), [Docker docs](https://docs.docker.com/reference/cli/docker/container/run/)).

**Best free (legal) resources**
- **OSTEP ch. 5 "Interlude: Process API"** (the course textbook): p1–p4.c, fork/wait/exec/redirection, and the homework questions (e.g., "Write a program that opens a file ... and then calls fork() ... What happens when they are writing to the file concurrently", "closes standard output ... What happens if the child calls printf()", and "creates two children, and connects the standard output of one to the standard input of the other, using the pipe() system call"). — [OSTEP ch. 5 PDF](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf)
- **OSTEP homework simulators**: `fork.py` (process trees; `-c` shows answers; `-R` explores orphan reparenting) and `generator.py`, which "creates real C programs that use fork(), wait(), and exit()". Example: `./generator.py -n 1 -s 0` gives a random program, and `-c` prints the timeline answer. Effectively an unlimited fork-puzzle generator. — [ostep-homework/cpu-api README-generator.md](https://github.com/remzi-arpacidusseau/ostep-homework/blob/master/cpu-api/README-generator.md); questions listed in [OSTEP ch. 5 Homework (Simulation)](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf)
- **CMU 15-213 lecture slides (public F15 copies)**: processes, fork puzzles with feasible/infeasible outputs, zombies — [Lecture 14](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/14-ecf-procs.pdf); signals, process groups, safe-handler guidelines G0–G5, the SIGCHLD loop, races, sigsuspend — [Lecture 15](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f15/www/lectures/15-ecf-signals.pdf)
- **Linux man pages (man7.org)**: [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html), [execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html), [exec(3)](https://man7.org/linux/man-pages/man3/exec.3.html), [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html), [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html), [sigaction(2)](https://man7.org/linux/man-pages/man2/sigaction.2.html), [signal-safety(7)](https://man7.org/linux/man-pages/man7/signal-safety.7.html), [credentials(7)](https://man7.org/linux/man-pages/man7/credentials.7.html), [setpgid(2)](https://man7.org/linux/man-pages/man2/setpgid.2.html), [setsid(2)](https://man7.org/linux/man-pages/man2/setsid.2.html), [daemon(7)](https://man7.org/linux/man-pages/man7/daemon.7.html), [pid_namespaces(7)](https://man7.org/linux/man-pages/man7/pid_namespaces.7.html).
- **The Linux Programming Interface (Kerrisk)**: the author's site offers free sample chapters, including "Chapter 24: Process Creation" (fork, file sharing, vfork, race conditions after fork). — [TLPI page](https://man7.org/tlpi/), [Ch. 24 PDF](https://man7.org/tlpi/download/TLPI-24-Process_Creation.pdf)
- **Bash Reference Manual (5.3)**: Exit Status, Signals, Job Control, trap. — [case.edu copy](https://tiswww.case.edu/php/chet/bash/bashref.html)
- **POSIX.1-2024 (Open Group, free online)**: shell exit-status rules §2.8.2 — [link](https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html#tag_19_08_02); signal concepts and the async-signal-safe table §2.4.3 — [link](https://pubs.opengroup.org/onlinepubs/9799919799/functions/V2_chap02.html#tag_16_04_03).
- **Docker run reference**: PID 1 behaviour and `--init` — [link](https://docs.docker.com/reference/cli/docker/container/run/)

### Inferences
- Suggested 5-day plan before the 24–30 Oct midterm:
  - Day 1: OSTEP ch. 5 plus WP1–WP6.
  - Day 2: wait/zombies (WP7–WP11) plus `generator.py` drills.
  - Day 3: buffering and exec (WP12–WP15), plus OSTEP homework Q7–Q8 (pipes).
  - Day 4: CMU L15 signals plus WP16–WP17, and write the safe SIGCHLD handler from memory.
  - Day 5: shell/job control (section 6) plus the 20 practice questions out loud.
- Bring-to-the-oral-exam phrases:
  - "copy of the address space, shared open file descriptions";
  - "the pending set is a bitmask, so signals coalesce";
  - "exec keeps the process, replaces the program";
  - "handled dispositions reset, ignored ones persist";
  - "zombie = dead but unreaped; orphan = parent dead, adopted by init or a subreaper".

### Gaps
- I could not verify whether CMU's or other universities' *exam archives with answer keys* are publicly reachable (WebSearch budget exhausted; current CMU course pages need a login). Searching for "15-213 exam fork processes solutions" and "CS 162 / CS 537 midterm processes signals solutions" would be a follow-up.
- Automated page summaries were wrong twice during this research: one claimed `fork(2)` is still in the signal-safety(7) table, another misquoted OSTEP's Lampson's-law tip. Every quote in these notes was re-checked against the raw downloaded text. Treat any third-party summary of these pages with care.
