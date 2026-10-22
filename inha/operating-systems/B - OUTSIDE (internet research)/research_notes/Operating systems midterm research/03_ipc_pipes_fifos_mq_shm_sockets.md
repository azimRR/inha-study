# Unix IPC and Network Sockets for the OS Midterm (SOC3010-003): pipes, dup2, FIFOs, message queues, shared memory, sockets, concurrent servers

> **Scope and provenance.** These are outside notes for SOC3010-003 (Inha University in Tashkent, Fall 2026), compiled on 2026-10-19 for the week-8 midterm (24–30 Oct 2026). They are kept separate from the class slides, and no class material was used.
> - **Primary sources:** Linux man-pages **6.19 (dated 2026-07-10)** on man7.org, RFC 9293, and Linux and XNU kernel source.
> - **Free secondary sources:** OSTEP, CMU 15-213 (Fall 2025 slides), MIT 6.1810 (xv6 book and quiz archive), the UIUC CS 341 coursebook, Kerrisk's free slides and TLPI sample chapters, and Beej's guides.
> - **No pirated textbooks** are linked.
>
> **[Local test]** means I compiled and ran a small C program on **macOS** (Darwin 27.0.0, Apple clang) on 2026-10-19. Linux-specific numbers come from the man pages or kernel source, not from the Mac: PIPE_BUF = 4096, the message-queue limits, and the 60 s TIME_WAIT. Exams normally assume **Linux** semantics. Section 6 lists the places where macOS behaves differently.

---

## 1. Pipes: pipe(), fork inheritance, closing unused ends, blocking/EOF/SIGPIPE, PIPE_BUF, capacity, dup2 pipelines, fd-table traces, debugging hangs

### Takeaway
A pipe is a one-way byte-stream buffer inside the kernel.
- **`read()`** blocks while the pipe is empty. It returns 0 (EOF) only when **every write-end descriptor in every process** is closed.
- **`write()`** blocks while the pipe is full. It raises SIGPIPE (or fails with EPIPE if the signal is ignored) once **every read-end descriptor** is closed.
- Because `fork()` and `dup2()` copy descriptors, every process must close each pipe fd it does not use. One forgotten write end means EOF never arrives, and the program hangs.
- Writes of up to PIPE_BUF bytes are atomic. PIPE_BUF is 4096 on Linux, at least 512 under POSIX, and 512 on macOS.
- Linux's default capacity is 64 KiB, but correct programs must never depend on any particular capacity.

### Cited Findings

#### 1.1 Core semantics (memorize these)
- `pipe(pipefd)` returns two descriptors: `pipefd[0]` is the **read end** and `pipefd[1]` is the **write end**. "Data written to the write end of the pipe is buffered by the kernel until it is read from the read end." — [pipe(2)](https://man7.org/linux/man-pages/man2/pipe.2.html)
- Pipes are unidirectional. "On some systems (but not Linux), pipes are bidirectional … POSIX.1 requires only unidirectional pipes." — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
- A pipe is a **byte stream**: "there is no concept of message boundaries." — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
- **Blocking:** reading an empty pipe blocks until data is available. Writing to a full pipe blocks "until sufficient data has been read from the pipe to allow the write to complete." — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
- **EOF rule:** "If all file descriptors referring to the write end of a pipe have been closed, then an attempt to read(2) from the pipe will see end-of-file (read(2) will return 0)." — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
- **SIGPIPE rule:** "If all file descriptors referring to the read end of a pipe have been closed, then a write(2) will cause a SIGPIPE signal to be generated for the calling process. If the calling process is ignoring this signal, then write(2) fails with the error EPIPE." — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
  - SIGPIPE's default action is **Term**: "Broken pipe: write to pipe with no readers." — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
  - The EPIPE return value "is seen only if the program catches, blocks or ignores this signal." — [write(2)](https://man7.org/linux/man-pages/man2/write.2.html)
- **The man page's own rule:** "An application that uses pipe(2) and fork(2) should use suitable close(2) calls to close unnecessary duplicate file descriptors; this ensures that end-of-file and SIGPIPE/EPIPE are delivered when appropriate." — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
- **Why closing matters:** "The fact that read blocks until it is impossible for new data to arrive is one reason that it's important for the child to close the write end of the pipe before executing wc … if one of wc's file descriptors referred to the write end of the pipe, wc would never see end-of-file." — [xv6 book §1.3 (MIT 6.1810, rev5)](https://pdos.csail.mit.edu/6.1810/2025/xv6/book-riscv-rev5.pdf)
- **Nonblocking mode** (O_NONBLOCK, set with `fcntl(F_SETFL)`): "If any process has the pipe open for writing, reads fail with EAGAIN; otherwise—with no potential writers—reads succeed and return empty." — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
- `lseek()` cannot be applied to a pipe. — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
- **Short reads are normal.** read(2) may return fewer bytes than requested, for example "because we are reading from a pipe", and a return of 0 means end of file. — [read(2)](https://man7.org/linux/man-pages/man2/read.2.html)
- **poll() on pipes:**
  - POLLHUP "merely indicates that the peer closed its end … Subsequent reads … will return 0 (end of file) only after all outstanding data in the channel has been consumed."
  - POLLERR "is also set for a file descriptor referring to the write end of a pipe when the read end has been closed."
  - — [poll(2)](https://man7.org/linux/man-pages/man2/poll.2.html)
- **Signals during blocking I/O:** a blocked read or write on a pipe or socket (a "slow" device) is restarted if the handler was installed with SA_RESTART; otherwise it fails with EINTR. If some data had already moved, the call returns the partial byte count instead. — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
- **[Local test]** results:
  - Writing to a pipe with no readers killed the writer with **signal 13 (SIGPIPE)**.
  - With `signal(SIGPIPE, SIG_IGN)`, the same write returned **-1 with errno EPIPE**.
  - `read()` on an empty pipe with no writers returned **0**.
  - In bash, `yes | head -n1` printed `PIPESTATUS: 141 0`. The 141 is 128 + 13: `yes` was killed by SIGPIPE once `head` exited.

#### 1.2 Capacity and PIPE_BUF atomicity
- **Linux capacity history** — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html):
  - Before Linux 2.6.11: the system page size.
  - Since 2.6.11: **16 pages (65,536 bytes with 4 KiB pages)**.
  - Since 2.6.35: queryable and settable with `fcntl(F_GETPIPE_SZ / F_SETPIPE_SZ)`.
  - Since 4.5: can be lower than 16 pages once the `pipe-user-pages-soft` limit is exceeded.
  - The man page adds: "Applications should not rely on a particular capacity: an application should be designed so that a reading process consumes data as soon as it is available, so that a writing process does not remain blocked."
- **F_SETPIPE_SZ details** — [F_GETPIPE_SZ(2const)](https://man7.org/linux/man-pages/man2/F_GETPIPE_SZ.2const.html):
  - An unprivileged process may set any size between the page size and `/proc/sys/fs/pipe-max-size`.
  - The kernel may round the size up.
  - It fails with EBUSY if the new size is smaller than the data currently stored.
- `ioctl(fd, FIONREAD, &n)` returns the number of unread bytes. It is nonstandard but widely available. — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
- "The maximum size of the buffer is system-dependent; typical values from 4KiB up to 128KiB though they can be changed." — [UIUC CS 341 coursebook, IPC](https://cs341.cs.illinois.edu/coursebook/Ipc)
- **PIPE_BUF:** "POSIX.1 says that writes of less than PIPE_BUF bytes must be atomic … POSIX.1 requires PIPE_BUF to be at least 512 bytes. (On Linux, PIPE_BUF is 4096 bytes.)" The exact four cases are below. — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)

| Write of n bytes | n ≤ PIPE_BUF | n > PIPE_BUF |
|---|---|---|
| **Blocking** (O_NONBLOCK off) | All n bytes are written **atomically**. The call may block until there is room for all n. | **Not atomic**: the data may be interleaved with other writers' data. The call blocks until all n bytes are written. |
| **O_NONBLOCK on** | If there is room, all n bytes are written immediately; otherwise the call fails with **EAGAIN**. | If the pipe is full: EAGAIN. Otherwise 1..n bytes are written (a **partial write**), possibly interleaved. |

- **[Local test, macOS]** results:
  - PIPE_BUF = **512**, both from `<limits.h>` and from `fpathconf(_PC_PIPE_BUF)`.
  - Nonblocking 1-byte writes filled the pipe at **65,536 bytes**, after which write failed with EAGAIN.
  - A single nonblocking 1 MiB write returned **65,536**, a partial write.

#### 1.3 What fork(), dup() and dup2() copy versus share (the three-table model)
- **fork():** "The child inherits copies of the parent's set of open file descriptors. Each file descriptor in the child refers to the same open file description … This means that the two file descriptors share open file status flags, file offset…" — [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html). The same point is made in [TLPI §24.2.1 (free sample chapter)](https://man7.org/tlpi/download/TLPI-24-Process_Creation.pdf).
- **The three tables:**
  - CMU's model is a per-process **descriptor table**, which points into a system-wide **open file table** (holding the file position and `refcnt`), which points into a **v-node table**.
  - "A child process inherits its parent's open files … situation unchanged by exec functions (use fcntl to change)." — [CMU 15-213 F25, lecture 18 "System-Level I/O"](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/18-system-io.pdf)
  - OSTEP §39.6, "Shared File Table Entries: fork() And dup()", explains the same reference counting. — [OSTEP ch. 39](https://pages.cs.wisc.edu/~remzi/OSTEP/file-intro.pdf)
- **exec keeps descriptors:** "By default, file descriptors remain open across an execve(). File descriptors that are marked close-on-exec are closed." — [execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html). `pipe2(fds, O_CLOEXEC)` sets close-on-exec on both new fds. — [pipe(2)](https://man7.org/linux/man-pages/man2/pipe.2.html)
- **dup(oldfd)** — [dup(2)](https://man7.org/linux/man-pages/man2/dup.2.html):
  - It returns the **lowest-numbered unused** fd.
  - The new fd refers to the same open file description, so it shares the offset and status flags.
  - The close-on-exec flag is **not** shared; it is off on the copy.
- **dup2(oldfd, newfd)** — [dup(2)](https://man7.org/linux/man-pages/man2/dup.2.html):
  - newfd now refers to oldfd's open file description.
  - If newfd was already open, it is **closed silently first**, and the close-and-reuse step is **atomic**. Doing `close()` followed by `dup()` instead "would be subject to race conditions."
  - If oldfd is invalid, the call fails and newfd is **not** closed.
  - If oldfd == newfd, dup2 does nothing and returns newfd.
- **Picturing dup2:** `dup2(oldfd,newfd)` "Copies (per-process) descriptor table entry oldfd to entry newfd". CMU illustrates this with `dup2(4,1)`, after which stdout points at what fd 4 points at. — [CMU lecture 18](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/18-system-io.pdf)
- **Beej's older idiom** is `close(1); dup(pfds[1]);`. It works because dup() takes the lowest free fd, which is 1 after the close. Use dup2 instead. — [Beej's Guide to Unix IPC §5.3](https://beej.us/guide/bgipc/html/)

```
 Per-process fd tables         Open file table (kernel, shared)        Pipe object
 PARENT                        +------------------------------+       +--------------+
   0 -> tty                    | OFD_R  (read end)   refcnt   |------>|  byte queue  |
   1 -> tty                    +------------------------------+       |  64 KiB on   |
   2 -> tty                    | OFD_W  (write end)  refcnt   |------>|  Linux       |
   3 -> OFD_R                  +------------------------------+       +--------------+
   4 -> OFD_W
 CHILD (after fork: copies of the SAME pointers, so both refcnts go 1 -> 2)
   3 -> OFD_R      4 -> OFD_W

 Reader sees EOF        <=>  refcnt(OFD_W) == 0   (count every fd, in every process)
 Writer gets SIGPIPE    <=>  refcnt(OFD_R) == 0
```

#### 1.4 Worked fd-table traces (exam style). Traces B and C were checked by printing real fd tables [Local test].
In the traces below, R means the pipe's read end and W its write end. "#R" and "#W" are the total number of descriptors that point at each end, across all processes.

**Trace A: parent writes, child reads** (the pattern of the [pipe(2) EXAMPLES](https://man7.org/linux/man-pages/man2/pipe.2.html) program)
```
code: pipe(p);  // p[0]=3 (R), p[1]=4 (W)
      if (fork()==0) { close(p[1]); while (read(p[0],&c,1)>0) putchar(c); _exit(0); }
      close(p[0]); write(p[1], msg, len); close(p[1]); wait(NULL);

time  event                          PARENT fds        CHILD fds     #R  #W
t0    pipe()                         0 1 2 3=R 4=W     -             1   1
t1    fork()                         0 1 2 3=R 4=W     0 1 2 3=R 4=W 2   2
t2    child close(4)                 3=R 4=W           3=R           2   1
t3    parent close(3)                4=W               3=R           1   1
t4    parent write(); close(4)       -                 3=R           1   0
t5    child read() -> msg bytes, next read() -> 0 (EOF because #W==0) -> child exits; wait() returns
```
- If **t2** is skipped, the child is its own writer. #W stays at 1, so the child's read blocks forever and the parent's `wait()` blocks forever. This is Bug B below.
- If the `close(4)` in **t4** is skipped, the same hang happens. This is Bug A.
- If **t3** is skipped, EOF still works. However, if the child dies early, the parent gets no SIGPIPE, because a read end (its own) still exists. Once the pipe fills, the parent's write blocks forever.

**Trace B: `ls | wc -l` built by the parent** ([Local test] output shown in brackets)
```
parent: pipe(p)                     -> parent: 0 1 2 3=R 4=W                         [3=pipe(r) 4=pipe(w)]
fork child1 ("ls")                  -> child1 gets copies: 0 1 2 3=R 4=W             (#R=2, #W=2)
  child1: dup2(4,1); close(3); close(4)  -> child1: 0=tty 1=W 2=tty  -> execlp("ls")   [0=chr 1=pipe(w) 2=file]
fork child2 ("wc -l")               -> child2 gets copies: 0 1 2 3=R 4=W  (if the parent has not closed yet)
  child2: dup2(3,0); close(3); close(4)  -> child2: 0=R 1=tty 2=tty  -> execlp("wc")   [0=pipe(r) 1=file 2=file]
parent: close(3); close(4)          -> parent: 0 1 2                                 [0=chr 1=file 2=file]
final:  #R = 1 (wc's fd 0), #W = 1 (ls's fd 1). When ls exits, #W = 0, so wc gets EOF and prints the count.
```
**[Local test]** The run printed the dumps shown in brackets and then `17`, the number of entries in `/` on the test Mac.

**Trace C: N-stage pipeline with the "previous read end" loop** (no fd leaks for any N). This was tested with the four-stage pipeline `printf | sort | uniq | wc -l`.
```c
int prev = -1;                                   /* read end of the previous stage's pipe */
for (int i = 0; i < n; i++) {
    int p[2];
    if (i < n - 1) pipe(p);                      /* no pipe after the last stage */
    if (fork() == 0) {
        if (prev != -1) { dup2(prev, STDIN_FILENO); close(prev); }
        if (i < n - 1)  { close(p[0]); dup2(p[1], STDOUT_FILENO); close(p[1]); }
        execvp(cmd[i][0], cmd[i]); _exit(127);
    }
    if (prev != -1) close(prev);                 /* parent no longer needs the old read end */
    if (i < n - 1) { close(p[1]); prev = p[0]; } /* keep only the new read end */
}
while (wait(NULL) > 0) ;                         /* reap every stage */
```
```
[Local test] fd dumps:
parent after fork 0 : 0 1 2 3=pipe0(r)          child 0 (printf): 0=chr      1=pipe0(w)  2
parent after fork 1 : 0 1 2 4=pipe1(r)          child 1 (sort)  : 0=pipe0(r) 1=pipe1(w)  2
parent after fork 2 : 0 1 2 3=pipe2(r)          child 2 (uniq)  : 0=pipe1(r) 1=pipe2(w)  2
parent after fork 3 : 0 1 2                     child 3 (wc)    : 0=pipe2(r) 1=file      2   -> prints 3
```
The parent never holds more than one old read end plus one new pipe. Every child execs with only fds 0, 1 and 2, and pipe fd numbers get reused (3, then 4, then 3). Trace D, for the fork-per-client server, is in §5.

#### 1.5 "Find the hang": four buggy programs and their fixes
**[Local test]** Each buggy version **hung**; a 2–3 s watchdog in the program killed its process group. Each fixed version completed.

**Bug A: the writer never closes its write end** (the child runs `wc -l`)
```c
int p[2]; pipe(p);
pid_t pid = fork();
if (pid == 0) { dup2(p[0], 0); close(p[0]); close(p[1]); execlp("wc", "wc", "-l", (char*)NULL); _exit(127); }
close(p[0]);
dprintf(p[1], "a\nb\nc\n");
/* BUG: missing close(p[1]);  ->  wc never sees EOF, and waitpid() never returns */
waitpid(pid, NULL, 0);
```
- **Fix:** call `close(p[1])` before `waitpid()`. The fixed run printed `3`.
- This is exactly the [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html) EOF rule.

**Bug B: the reader also holds a write end.** UIUC presents this as "Pipe Gotchas: a complete example that doesn't work!" — [UIUC CS 341 IPC](https://cs341.cs.illinois.edu/coursebook/Ipc)
```c
int p[2]; pipe(p);
if (fork() == 0) {                       /* child = reader */
    /* BUG: missing close(p[1]); the child is itself a potential writer */
    char buf[64]; ssize_t n;
    while ((n = read(p[0], buf, sizeof buf)) > 0) fwrite(buf, 1, n, stdout);
    _exit(0);                            /* never reached */
}
close(p[0]); write(p[1], "hello", 5); close(p[1]);
wait(NULL);                              /* deadlock: the parent waits for a child that waits for EOF */
```
- **Fix:** the reader must `close(p[1])` before its read loop.
- UIUC: the child "never leaves the while loop! When there are no characters left to read it simply blocks and waits for more unless All the writers close their ends." — [UIUC CS 341 IPC](https://cs341.cs.illinois.edu/coursebook/Ipc)

**Bug C: a three-stage pipeline where each child closes only the fds it used with dup2**
```c
int p1[2], p2[2]; pipe(p1); pipe(p2);           /* p1 = {3,4}, p2 = {5,6} */
if (fork()==0) { dup2(p1[1],1); close(p1[1]);                         execlp("printf","printf","b\\na\\nc\\n",NULL); }
if (fork()==0) { dup2(p1[0],0); dup2(p2[1],1); close(p1[0]); close(p2[1]); execlp("sort","sort",NULL); }
if (fork()==0) { dup2(p2[0],0); close(p2[0]);                         execlp("wc","wc","-l",NULL); }
close(p1[0]); close(p1[1]); close(p2[0]); close(p2[1]);              /* the parent is correct... */
while (wait(NULL) > 0) ;                                              /* ...but this still hangs */
```
**[Local test]** Real fd dumps from the buggy run:
```
stage1 printf : 0=chr     1=p1(w)  2  3=p1(r) 5=p2(r) 6=p2(w)
stage2 sort   : 0=p1(r)   1=p2(w)  2  4=p1(w)!! 5=p2(r)          <- sort holds the WRITE end of its own input
stage3 wc     : 0=p2(r)   1=file   2  3=p1(r) 4=p1(w) 6=p2(w)!!  <- wc holds the WRITE end of its own input
```
- `sort` never sees EOF on p1, because both it and `wc` hold `p1[1]`. So `sort` never finishes.
- `wc` holds `p2[1]` itself, so it would never see EOF either.
- **Fix:** in every child, after the dup2 calls, close **all four** pipe fds. Better still, use Trace C's loop, which never lets unrelated pipe fds reach a child.
- The fixed run showed each stage with only fds 0, 1 and 2, and printed `3`.

**Bug D: capacity deadlock on a two-way conversation.** The parent writes 1 MiB into `cat` before reading any of `cat`'s output.
```c
int to[2], from[2]; pipe(to); pipe(from);
if (fork()==0) { dup2(to[0],0); dup2(from[1],1); close(to[0]); close(to[1]); close(from[0]); close(from[1]);
                 execlp("cat","cat",NULL); }
close(to[0]); close(from[1]);
write_all(to[1], buf, 1<<20);   /* BUG: blocks forever: cat is blocked writing into a full 'from' pipe */
close(to[1]);
while ((n = read(from[0], rb, sizeof rb)) > 0) ...   /* never reached */
```
- **Why it hangs:** the `from` pipe fills (64 KiB on Linux), so `cat` blocks in write. `cat` then stops reading, so the `to` pipe fills and the parent blocks too. This is a circular wait.
- **Fixes:** write from a separate process or thread (tested: the fixed run read back 1,048,576 bytes), or interleave reading and writing with `poll()`, or use a temporary file.
- [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html) design rule: "a reading process consumes data as soon as it is available, so that a writing process does not remain blocked."

#### 1.6 Debugging checklist: "Why does my pipe program hang?"
1. **List every process's open fds at the moment of the hang.**
   - On Linux, `ls -l /proc/PID/fd` shows pipes as `type:[inode]` links, such as `pipe:[12345]`. Two fds with the same inode are the same pipe. — [proc_pid_fd(5)](https://man7.org/linux/man-pages/man5/proc_pid_fd.5.html)
   - On macOS, use `lsof -p PID`.
   - Ask: **who still holds a write end?**
2. **Is a reader also a writer?** A child that reads must `close(p[1])` (Bug B). — [UIUC IPC](https://cs341.cs.illinois.edu/coursebook/Ipc)
3. **Did the parent (the "shell") close both ends** after forking all of its children? — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
4. **Did every child close all pipe fds after dup2**, including fds belonging to other stages' pipes (Bug C)? Remember that `exec` does not close them for you. — [execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html)
5. **Is someone calling wait()/waitpid() before draining a pipe,** or writing everything before reading (Bug D)? The program then hangs only when the output is bigger than the pipe's capacity, which is why it "works with small input". — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
6. **Is the reader waiting for EOF from a writer that never exits?** Long-lived writers need message framing (a delimiter or length prefix), because a pipe is a byte stream. — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
7. **Is the data still in a stdio buffer?**
   - "Normally, all files are block buffered. If a stream refers to a terminal (as stdout normally does), it is line buffered." — [setvbuf(3)](https://man7.org/linux/man-pages/man3/setvbuf.3.html)
   - So `printf` into a pipe can sit in the writer's memory until `fflush`, `fclose` or exit, and the reader waits.
8. **FIFO case:** is the process blocked inside `open()` because the other end was never opened? — [fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html)
9. **Was the blocked call interrupted?** Look for EINTR handling around read, write, open and wait. — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
10. **Do spawned helpers inherit pipe ends?** Use `pipe2(O_CLOEXEC)` or close the fds before exec. — [pipe(2)](https://man7.org/linux/man-pages/man2/pipe.2.html)

### Inferences
- **Exam heuristic: "count the write ends".**
  - After `pipe(); fork(); fork();` with no closes, there are 4 processes, so the write end's open file description has 4 references. The reader sees EOF only when all 4 are closed.
  - Draw a table with one column per process (as in Traces A–C) and update #R and #W after every `fork`, `dup2` and `close`.
- **`pipe()` must come before `fork()`** if both processes are to share the pipe. Calling it after the fork creates two unrelated pipes. The MIT 2018 quiz answer in §6 says the same.
- **The "works on small inputs, hangs on big ones" symptom almost always means a capacity deadlock** (Bug D, or waiting before reading), not an EOF bug. EOF bugs hang even on tiny input.
- **Portability of atomic writes:** code that relies on 4 KiB atomic writes is not portable. On macOS PIPE_BUF is 512 [Local test], so 1 KiB records from several writers may interleave there.
- **fork() also copies unflushed stdio buffers.** In my own test programs, lines printed by the parent *before* a `fork()` appeared **twice**, because the child inherited the unflushed buffer when stdout was a pipe. This matches UIUC's explanation: "When fork() is executed the entire process memory is duplicated including the buffer." — [UIUC CS 341, Processes](https://cs341.cs.illinois.edu/coursebook/Processes). Call `fflush(stdout)` before `fork()`.

### Gaps
- I did not run anything on a Linux machine. All Linux numbers come from man-pages 6.19 and kernel source, and the Mac figures are labeled as such.
- The macOS pipe capacity of 65,536 bytes was measured with one workload. Apple's sizing policy (for example, whether pipes start smaller and grow) was not documented in any source I fetched.
- Practical tools such as `strace -f` and `lsof` are recommended from general practice. I did not find an authoritative free tutorial on them to cite.
- TLPI's full "Pipes and FIFOs" chapter is **not** one of the free sample chapters. Only the Preface and chapters 4, 24 and 52 are free at [man7.org/tlpi](https://man7.org/tlpi/), so it was not used.

---

## 2. FIFOs (named pipes): mkfifo, open-blocking semantics, O_NONBLOCK, a FIFO client/server, persistence and cleanup

### Takeaway
A FIFO is a pipe with a filesystem name.
- `mkfifo()` creates a special file (`p` in `ls -l`), but the data passes through the kernel and never touches the disk. I/O follows exactly the pipe rules.
- `open()` blocks until the other end is also opened. With O_NONBLOCK:
  - a read-only open succeeds immediately;
  - a write-only open fails with **ENXIO** if no reader exists.
- The **name** persists until `unlink()`. The kernel **pipe object and any unread data** exist only while some process has the FIFO open.

### Cited Findings
- **What a FIFO is:**
  - "The kernel passes all data internally without writing it to the filesystem. Thus, the FIFO special file has no contents on the filesystem; the filesystem entry merely serves as a reference point."
  - "The kernel maintains exactly one pipe object for each FIFO special file that is opened by at least one process."
  - — [fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html)
- **Opening:** "The FIFO must be opened on both ends (reading and writing) before data can be passed. Normally, opening the FIFO blocks until the other end is opened also." — [fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html)
- **Opening with O_NONBLOCK:** "opening for read-only succeeds even if no one has opened on the write side yet and opening for write-only fails with ENXIO (no such device or address) unless the other end has already been opened." — [fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html)
- **Opening with O_RDWR:** "Under Linux, opening a FIFO for read and write will succeed both in blocking and nonblocking mode. POSIX leaves this behavior undefined." The man page warns that a process using both ends to talk to itself must avoid deadlocks. — [fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html)
- **SIGPIPE** is sent to a process that writes to a FIFO "that is not opened for read on the other side". FIFOs show as file type `p` in `ls -l`. — [fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html)
- **mkfifo(3):** a FIFO "has to be open at both ends simultaneously before you can proceed to do any input or output operations on it. Opening a FIFO for reading normally blocks until some other process opens the same FIFO for writing, and vice versa." — [mkfifo(3)](https://man7.org/linux/man-pages/man3/mkfifo.3.html)
- **Same I/O semantics as pipes:** "The only difference between pipes and FIFOs is the manner in which they are created and opened … I/O on pipes and FIFOs has exactly the same semantics." So EOF, SIGPIPE and the PIPE_BUF atomicity rules all apply. — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
- **A blocked open can be interrupted.** A blocking `open()` of a FIFO is one of the calls restarted under SA_RESTART; otherwise it fails with EINTR. — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
- **Naming and persistence** (Kerrisk's tables):
  - FIFO: name = **pathname**; handle = **file descriptor**; persistence = **process**.
  - Anonymous pipe: no name; handle = fd; persistence = process.
  - — [Kerrisk, "An introduction to Linux IPC facilities", LCA 2013, slides 100 and 105](https://man7.org/conf/lca2013/IPC_Overview-LCA-2013-printable.pdf)
- **Beej's speak/tick example:**
  - "the open() call will block until some other process opens the other end of the pipe for reading."
  - Killing the reader produces "Broken Pipe": "when all readers for a FIFO close and the writer is still open, the writer will receive the signal SIGPIPE the next time it tries to write()."
  - — [Beej's Guide to Unix IPC, §6](https://beej.us/guide/bgipc/html/)
- **UIUC "Hanging Named Pipes":** `echo Hello > fifo` hangs until `cat fifo` runs, because "echo calls open(.., O_WRONLY) but that blocks until cat calls open(.., O_RDONLY)." — [UIUC CS 341 IPC](https://cs341.cs.illinois.edu/coursebook/Ipc)
- **Conflict between sources:**
  - Beej §6.3 says a reader opened with `O_NDELAY` gets "0 bytes read if there is no data in the pipe". — [Beej IPC](https://beej.us/guide/bgipc/html/)
  - The Linux man page says that **with a writer present, a nonblocking read fails with EAGAIN**, and returns empty only when there are no writers. — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
  - My macOS test agrees with the man page. Treat Beej's sentence as describing historical O_NDELAY behavior.
- **[Local test, macOS] FIFO behavior table:**

| # | Operation on a fresh FIFO | Result |
|---|---|---|
| 1 | `open(O_WRONLY \| O_NONBLOCK)` with no reader | -1, ENXIO (macOS prints "Device not configured") |
| 2 | `open(O_RDONLY \| O_NONBLOCK)` with no writer | succeeds |
| 3 | nonblocking `read()` with no writer | 0 (EOF) |
| 4 | `open(O_WRONLY \| O_NONBLOCK)` once a reader exists | succeeds |
| 5 | nonblocking `read()`, writer present, pipe empty | -1, EAGAIN |
| 6 | read after the writer writes "hi" | 2 bytes |
| 7 | read after the last writer closes | 0 (EOF) |
| 8 | `open(O_RDWR)` | succeeds on macOS too (undefined by POSIX) |
| 9 | blocking `open(O_RDONLY)` while a writer opens 1 s later | waited 1.01 s |
| 10 | `stat()` | `S_ISFIFO` = 1, size 0; `ls -l` shows `prw-r--r--` |

#### FIFO client/server design (built from the semantics above)
```
SERVER                                          CLIENT (pid P)
mkfifo("/tmp/srv.fifo", 0622)                   mkfifo("/tmp/cli.P.fifo", 0600)        <- create the reply FIFO FIRST
rfd = open(srv, O_RDONLY)  (blocks for client)  sfd = open("/tmp/srv.fifo", O_WRONLY)
dfd = open(srv, O_WRONLY)  // dummy writer:     write(sfd, &req, sizeof req)            <- fixed-size request <= PIPE_BUF
                           // read() never      cfd = open("/tmp/cli.P.fifo", O_RDONLY) (blocks until the server opens it)
                           // returns EOF       read(cfd, &resp, ...); close; unlink("/tmp/cli.P.fifo")
signal(SIGPIPE, SIG_IGN)   // client may vanish
loop: read(rfd, &req, sizeof req)
      cfd = open("/tmp/cli.<req.pid>.fifo", O_WRONLY); write(cfd, &resp, ...); close(cfd)
on exit / SIGINT: unlink("/tmp/srv.fifo")
```
Each piece of this design rests on a cited rule:
- **Requests are atomic.** Requests of at most PIPE_BUF bytes from many clients are each written as one piece, so they never interleave. — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
- **Why the dummy writer is needed.** Without it, the server's `read()` returns 0 every time the last client closes. That happens because "with no potential writers" reads return empty. The server would then busy-loop or exit. — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
- **Why O_RDWR is not used for this.** Opening with O_RDWR also works on Linux but is not portable. — [fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html)
- **Why SIGPIPE is ignored.** If a client dies before reading its reply, a write would otherwise kill the server with SIGPIPE. — [fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html)

### Inferences
- **The classic FIFO open deadlock.**
  - Process A opens `f1` for reading and then `f2` for writing. Process B opens `f2` for reading and then `f1` for writing.
  - Each blocks in its first `open()`, waiting for a counterpart that the other process will never reach.
  - Fix: open the FIFOs in the **same order** in both processes, or open one of them with O_NONBLOCK.
  - This follows directly from the "open blocks until the other end is opened" rule in [fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html).
- **Cleanup is about names, not data.**
  - A crashed server leaves a stale `/tmp/srv.fifo` name behind.
  - On restart, `mkfifo` fails with EEXIST. Either `unlink()` first or accept EEXIST.
  - No data survives, because the pipe object has process persistence (Kerrisk's table).
- **A server must reply only to the client that asked.**
  - Per-client reply FIFOs avoid the problem of several clients racing to read one shared reply FIFO.
  - A shared reply FIFO would be a byte stream with no owner per message.

### Gaps
- I did not find a free, authoritative write-up of the well-known-FIFO client/server pattern. TLPI covers it in a chapter that is not free. The design above is my synthesis from the cited man-page rules.
- I did not test on Linux whether `mkfifo` names on tmpfs versus disk filesystems behave differently. The man pages say the data never touches the filesystem in either case.

---

## 3. Message queues and shared memory: POSIX vs System V, persistence, ipcs/ipcrm, shm APIs, the lost-update race and the semaphore fix

### Takeaway
**POSIX message queues** (`mq_open/mq_send/mq_receive/mq_unlink`):
- deliver the **highest priority first**, oldest first within a priority;
- are named `/name` and reference-counted;
- persist in the kernel until `mq_unlink`;
- are file descriptors on Linux, so they can be polled.

**System V message queues** (`msgget/msgsnd/msgrcv/msgctl`):
- **select messages by type**: 0 = first message; >0 = first of that type; <0 = lowest type ≤ |t|;
- are identified by a key and an integer ID;
- persist until `IPC_RMID`, `ipcrm`, or reboot, and are removed **immediately** even while in use.

**Shared memory** is the fastest IPC but has **no built-in synchronization**. `counter++` is a load/add/store sequence that loses updates under concurrency. Protect it with a semaphore initialized to 1.

### Cited Findings

#### 3.1 POSIX message queues (Linux)
- **API:**
  - `mq_open` returns an `mqd_t`. Names have the form `/somename`, up to NAME_MAX (255) characters.
  - The other calls are `mq_send`, `mq_receive`, `mq_close`, `mq_unlink`, `mq_getattr` and `mq_setattr`.
  - `mq_notify` gives asynchronous notification when a message arrives on an empty queue.
  - — [mq_overview(7)](https://man7.org/linux/man-pages/man7/mq_overview.7.html)
- **fork:** "After a fork(2), a child inherits copies of its parent's message queue descriptors … Corresponding message queue descriptors in the two processes share the flags (mq_flags)." — [mq_overview(7)](https://man7.org/linux/man-pages/man7/mq_overview.7.html); [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)
- **Priorities:** "messages are always delivered to the receiving process highest priority first."
  - The range is 0 to `sysconf(_SC_MQ_PRIO_MAX)-1`.
  - **On Linux `_SC_MQ_PRIO_MAX` = 32768.** POSIX requires only 0–31.
  - — [mq_overview(7)](https://man7.org/linux/man-pages/man7/mq_overview.7.html)
- **mq_send()** — [mq_send(3)](https://man7.org/linux/man-pages/man3/mq_send.3.html):
  - `msg_len` must be ≤ `mq_msgsize`, and zero-length messages are allowed.
  - "Messages are placed on the queue in decreasing order of priority, with newer messages of the same priority being placed after older messages."
  - On a full queue (`mq_maxmsg` messages), the call **blocks**; with O_NONBLOCK it fails with **EAGAIN**.
- **mq_receive()** — [mq_receive(3)](https://man7.org/linux/man-pages/man3/mq_receive.3.html):
  - It "removes the oldest message with the highest priority".
  - The buffer length **must be ≥ `mq_msgsize`**, otherwise the call fails with **EMSGSIZE**.
  - On an empty queue it **blocks**; with O_NONBLOCK it fails with **EAGAIN**.
- **Attributes:** `struct mq_attr { mq_flags, mq_maxmsg, mq_msgsize, mq_curmsgs }`. Only `mq_maxmsg` and `mq_msgsize` are used by `mq_open`. — [mq_open(3)](https://man7.org/linux/man-pages/man3/mq_open.3.html)
- **mq_unlink():** "The message queue name is removed immediately. The queue itself is destroyed once any other processes that have the queue open close their descriptors." — [mq_unlink(3)](https://man7.org/linux/man-pages/man3/mq_unlink.3.html)
- **Persistence and linking:** "POSIX message queues have kernel persistence: if not removed by mq_unlink(3), a message queue will exist until the system is shut down." Programs are compiled with `cc … -lrt`. — [mq_overview(7)](https://man7.org/linux/man-pages/man7/mq_overview.7.html)
- **Linux defaults and limits** — [mq_overview(7)](https://man7.org/linux/man-pages/man7/mq_overview.7.html):
  - `/proc/sys/fs/mqueue/msg_max` = 10 and `msgsize_max` = 8192 bytes.
  - `queues_max` = 256.
  - `msg_default` = 10 and `msgsize_default` = 8192 (since Linux 3.5).
- **Viewing queues:** the queues can be listed after `mount -t mqueue none /dev/mqueue`. Each file shows a line like `QSIZE:129 NOTIFY:2 SIGNO:0 NOTIFY_PID:8260`. — [mq_overview(7)](https://man7.org/linux/man-pages/man7/mq_overview.7.html)
- **POSIX vs System V (TLPI §52.9)** — [TLPI ch. 52 (free sample chapter)](https://man7.org/tlpi/download/TLPI-52-POSIX_Message_Queues.pdf):
  - POSIX advantages: a simpler interface "more consistent with the traditional UNIX file model"; objects are **reference counted**; `mq_notify`; and "On Linux … POSIX message queues can be monitored using poll(), select(), and epoll. System V message queues don't provide this feature."
  - POSIX disadvantages: it is less portable, and "The facility to select System V messages by type provides slightly greater flexibility than the strict priority ordering of POSIX messages."
- **Kerrisk on fds:** "On Linux, POSIX MQ descriptors are file descriptors … One good reason to avoid System V message queues." — [Kerrisk LCA 2013, slide 101](https://man7.org/conf/lca2013/IPC_Overview-LCA-2013-printable.pdf)
- **[Local test]** macOS has **no `<mqueue.h>`**: compiling `#include <mqueue.h>` fails with "file not found". Study POSIX MQs from the Linux man pages and run them on Linux, as the brief noted.

#### 3.2 System V message queues
- **msgget(key, flags):**
  - `IPC_PRIVATE` always creates a new queue.
  - `IPC_CREAT` creates a queue if none exists for the key.
  - `IPC_CREAT|IPC_EXCL` fails with **EEXIST** if one already exists, like `O_CREAT|O_EXCL`.
  - — [msgget(2)](https://man7.org/linux/man-pages/man2/msgget.2.html)
- **Message layout:** `struct msgbuf { long mtype; /* must be > 0 */ char mtext[]; }`. **`msgsz` counts only `mtext`, not `mtype`.** — [msgop(2)](https://man7.org/linux/man-pages/man2/msgop.2.html)
- **msgsnd():**
  - When `msg_qbytes` is full, it blocks; with `IPC_NOWAIT` it fails with **EAGAIN**.
  - A blocked call fails with **EIDRM** if the queue is removed.
  - — [msgop(2)](https://man7.org/linux/man-pages/man2/msgop.2.html)
- **msgrcv(id, &m, msgsz, msgtyp, flags) selection rules** — [msgop(2)](https://man7.org/linux/man-pages/man2/msgop.2.html):
  - `msgtyp == 0`: the first message in the queue.
  - `msgtyp > 0`: the first message of exactly that type. With `MSG_EXCEPT`, the first message *not* of that type.
  - `msgtyp < 0`: "the first message in the queue with the lowest type less than or equal to the absolute value of msgtyp."
  - With `IPC_NOWAIT` and no matching message, it fails with **ENOMSG**.
  - If the message is longer than `msgsz`, it fails with **E2BIG** and the message stays queued, unless `MSG_NOERROR` is set, in which case the text is truncated.
- **msgctl(IPC_RMID):** "Immediately remove the message queue, awakening all waiting reader and writer processes (with an error return and errno set to EIDRM)." — [msgctl(2)](https://man7.org/linux/man-pages/man2/msgctl.2.html)
- **Persistence:** System V objects persist after their creators exit. "when you create a message queue, it doesn't go away until you destroy it … All the processes that have ever used it can quit, but the queue will still exist … use the ipcs command … destroy them with the ipcrm command." — [Beej's Guide to Unix IPC §9](https://beej.us/guide/bgipc/html/). Kerrisk's table gives **kernel** persistence for all System V objects. — [Kerrisk LCA 2013, slide 105](https://man7.org/conf/lca2013/IPC_Overview-LCA-2013-printable.pdf)
- **ipcs and ipcrm:**
  - `ipcs` "shows information on System V inter-process communication facilities", meaning shared memory, message queues and semaphore arrays. — [ipcs(1)](https://man7.org/linux/man-pages/man1/ipcs.1.html)
  - `ipcrm` "removes POSIX and System V" IPC objects. "Deletion of a message queue or semaphore object is immediate … A shared memory object is only removed after all currently attached processes have detached." Recent util-linux versions add `--posix-shmem name`, `--posix-mqueue name` and `-a [shm|pshm|msg|pmsg|sem|psem]`. — [ipcrm(1)](https://man7.org/linux/man-pages/man1/ipcrm.1.html)
- **[Local test, macOS]** The queue received messages A(3), B(1), C(2), D(1), in that order.
  - `msgrcv(msgtyp=2)` returned **C(2)**.
  - `msgrcv(msgtyp=-3)` returned **A(3) on macOS**.
  - `msgtyp=0` then returned the oldest remaining message, then the next.
  - On an empty queue, `IPC_NOWAIT` gave **ENOMSG**.
  - `ipcs -q` listed the queue, and it disappeared immediately after `msgctl(IPC_RMID)`.
- **macOS deviates from Linux on negative msgtyp.**
  - **Linux** returns **B(1)**. Its `find_msg()` keeps lowering the bound (`*msgtyp = msg->m_type - 1`) so that it finds the *lowest* type. — [Linux ipc/msg.c](https://github.com/torvalds/linux/blob/master/ipc/msg.c)
  - **XNU (macOS)** takes the *first* message satisfying `msghdr->msg_type <= -msgtyp`. — [XNU bsd/kern/sysv_msg.c](https://github.com/apple-oss-distributions/xnu/blob/main/bsd/kern/sysv_msg.c)
  - **Answer exam questions with the Linux rule: B(1).**

#### 3.3 Comparison tables
**Names, handles and persistence** (Kerrisk, LCA 2013, slides 100 and 105 — [PDF](https://man7.org/conf/lca2013/IPC_Overview-LCA-2013-printable.pdf))

| Facility | Name used to identify it | Handle in programs | Persistence |
|---|---|---|---|
| Pipe | no name | file descriptor | process |
| FIFO | pathname | file descriptor | process |
| UNIX domain socket | pathname | file descriptor | process |
| Internet domain socket | IP address + port | file descriptor | process |
| System V message queue / semaphore / shared memory | System V IPC key | System V IPC identifier | kernel |
| POSIX message queue | POSIX IPC pathname | `mqd_t` | kernel |
| POSIX named semaphore | POSIX IPC pathname | `sem_t *` | kernel |
| POSIX unnamed semaphore | no name | `sem_t *` | depends |
| POSIX shared memory | POSIX IPC pathname | file descriptor | kernel |
| Anonymous mapping / memory-mapped file | none / pathname | none / fd | process / file system |

**Message queue APIs** (sources: [mq_overview(7)](https://man7.org/linux/man-pages/man7/mq_overview.7.html), [mq_send(3)](https://man7.org/linux/man-pages/man3/mq_send.3.html), [mq_receive(3)](https://man7.org/linux/man-pages/man3/mq_receive.3.html), [msgop(2)](https://man7.org/linux/man-pages/man2/msgop.2.html), [msgctl(2)](https://man7.org/linux/man-pages/man2/msgctl.2.html), [TLPI ch. 52](https://man7.org/tlpi/download/TLPI-52-POSIX_Message_Queues.pdf))

| | POSIX MQ | System V MQ |
|---|---|---|
| Create / open | `mq_open("/q", O_CREAT\|O_RDWR, 0600, &attr)` returns `mqd_t` | `msgget(key, IPC_CREAT\|0600)` returns an int ID |
| Send | `mq_send(q, buf, len, prio)` | `msgsnd(id, &m, len_of_mtext, 0)` |
| Receive | `mq_receive(q, buf, len >= mq_msgsize, &prio)` | `msgrcv(id, &m, maxlen, msgtyp, 0)` |
| Which message comes out | highest priority, FIFO within a priority | chosen by type: 0 / >0 / <0 rule |
| Nonblocking | `O_NONBLOCK` gives EAGAIN | `IPC_NOWAIT` gives EAGAIN (send) or ENOMSG (receive) |
| Readiness | `mq_notify`; poll/select/epoll on Linux | none |
| Delete | `mq_unlink` (name now; queue after the last close) | `msgctl(IPC_RMID)`: **immediate**, blocked callers get EIDRM |
| Inspect | `ls /dev/mqueue` (after mounting) | `ipcs -q`; remove with `ipcrm -q id` |

**Shared memory APIs** (sources: [shm_overview(7)](https://man7.org/linux/man-pages/man7/shm_overview.7.html), [shmget(2)](https://man7.org/linux/man-pages/man2/shmget.2.html), [shmop(2)](https://man7.org/linux/man-pages/man2/shmop.2.html), [shmctl(2)](https://man7.org/linux/man-pages/man2/shmctl.2.html), [mmap(2)](https://man7.org/linux/man-pages/man2/mmap.2.html))

| | POSIX shared memory | System V shared memory |
|---|---|---|
| Create | `fd = shm_open("/name", O_CREAT\|O_RDWR, 0600)`, then `ftruncate(fd, size)` (a new object has length 0) | `id = shmget(key, size, IPC_CREAT\|0600)`; size is rounded up to a page; contents start at zero |
| Map / attach | `p = mmap(NULL, size, PROT_READ\|PROT_WRITE, MAP_SHARED, fd, 0)` | `p = shmat(id, NULL, 0)` |
| Unmap / detach | `munmap(p, size)`; `close(fd)` | `shmdt(p)` |
| Delete | `shm_unlink("/name")` | `shmctl(id, IPC_RMID, NULL)`: marked for destruction, destroyed after the **last detach** (`shm_nattch == 0`) |
| Lifetime | kernel: "until the system is shut down, or until all processes have unmapped the object and it has been deleted with shm_unlink" | kernel |
| fork / exec / exit | mappings are inherited across fork | inherited across fork; detached on `execve` and on `_exit` |
| Where it shows up | tmpfs under `/dev/shm` | `ipcs -m` |
| Synchronization | none: "processes must synchronize their access … using, for example, POSIX semaphores" | none |

- **MAP_SHARED:** "Updates to the mapping are visible to other processes mapping the same region." `MAP_ANONYMOUS` gives zero-filled memory with no file behind it. Shared anonymous memory created **before** `fork()` is the simplest way for a parent and its children to share memory. — [mmap(2)](https://man7.org/linux/man-pages/man2/mmap.2.html)
- **POSIX vs System V shared memory:** "POSIX shared memory provides a simpler, and better designed interface; on the other hand POSIX shared memory is somewhat less widely available." Link with `-lrt`. — [shm_overview(7)](https://man7.org/linux/man-pages/man7/shm_overview.7.html)

#### 3.4 The lost-update race on a shared counter
- OSTEP compiles `counter = counter + 1` into three instructions:
  - `mov 0x8049a1c,%eax` (load)
  - `add $0x1,%eax` (add)
  - `mov %eax,0x8049a1c` (store)
- In OSTEP's Figure 26.7, the counter starts at 50, two threads each increment it once, and the result is **51** instead of 52. — [OSTEP ch. 26](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf)
- The same chapter's two-thread run printed `counter = 19345221` where 20,000,000 was expected. — [OSTEP ch. 26](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf)
- OSTEP's definitions — [OSTEP ch. 26](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf):
  - **Race condition:** the result depends on timing.
  - **Indeterminate:** the output can differ from run to run.
  - **Critical section:** code that accesses a shared resource.
  - **Mutual exclusion:** the property we want, that only one thread runs the critical section at a time.

The table below is the same interleaving for **two processes sharing `counter` in shared memory** (structure following OSTEP Fig. 26.7):

| Step | Process P1 | Process P2 | P1 register | P2 register | `counter` in shared memory |
|---|---|---|---|---|---|
| 0 | | | – | – | 50 |
| 1 | load counter into reg | | 50 | – | 50 |
| 2 | reg = reg + 1 | | 51 | – | 50 |
| — | *context switch (timer interrupt)* | | | | |
| 3 | | load counter into reg | 51 | 50 | 50 |
| 4 | | reg = reg + 1 | 51 | 51 | 50 |
| 5 | | store reg into counter | 51 | 51 | **51** |
| — | *context switch* | | | | |
| 6 | store reg into counter | | 51 | 51 | **51** (should be 52: P2's update is lost) |

- **[Local test, macOS]** setup: the counter lived in `shm_open` + `ftruncate` + `mmap(MAP_SHARED)` memory, shared by 2 forked processes.
  - **Without synchronization**, 1,000,000 increments each gave **1,584,625 (lost 415,375)** in one run and **2,000,000 (lost 0)** in the next. The race is real but nondeterministic, so one passing run proves nothing.
  - Five runs of 5,000,000 increments each lost between **4,256,711 and 4,521,925** updates, roughly 43–45%.
  - **With a named semaphore** around the increment, 200,000 increments each gave 400,000/400,000 every time.
- **The fix is a binary semaphore used as a lock.**
  - OSTEP Fig. 31.3: `sem_init(&m, 0, X); sem_wait(&m); /* critical section */ sem_post(&m);`. "what should X be? … the initial value should be 1." — [OSTEP ch. 31](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)
- **POSIX semaphore options** — [sem_overview(7)](https://man7.org/linux/man-pages/man7/sem_overview.7.html):
  - **Named:** `sem_open("/name", O_CREAT, mode, 1)`, then `sem_close` and `sem_unlink`. These have **kernel persistence**.
  - **Unnamed:** `sem_init(&s, pshared, 1)`. For process sharing, the semaphore must live in shared memory.
  - Compile with `cc … -pthread`.
- **sem_init with pshared:** "If pshared is nonzero, then the semaphore is shared between processes, and should be located in a region of shared memory (see shm_open(3), mmap(2), and shmget(2)). (Since a child created by fork(2) inherits its parent's memory mappings, it can also access the semaphore.)" — [sem_init(3)](https://man7.org/linux/man-pages/man3/sem_init.3.html)
- **[Local test, macOS]** `sem_init(&s, 1, 1)` returned **-1 with ENOSYS** ("Function not implemented"), and the SDK marks it deprecated. On a Mac use `sem_open` (it works), or test the unnamed-semaphore version on Linux.

```c
/* Correct shared counter (Linux): unnamed process-shared semaphore placed IN the shared region */
struct shared { sem_t lock; long counter; };
int fd = shm_open("/ctr", O_CREAT | O_RDWR, 0600);
ftruncate(fd, sizeof(struct shared));
struct shared *s = mmap(NULL, sizeof *s, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
sem_init(&s->lock, 1 /* pshared */, 1 /* binary semaphore = lock */);
/* in each process: */  sem_wait(&s->lock);  s->counter++;  sem_post(&s->lock);
/* cleanup (once):  */  sem_destroy(&s->lock); munmap(s, sizeof *s); shm_unlink("/ctr");
/* build: cc prog.c -pthread -lrt */
```

### Inferences
- **Exam answer for "two processes each do `counter++` n times (n ≥ 2), counter starts at 0":**
  - **Maximum = 2n.**
  - **Minimum = 2**, by this interleaving:
    - A loads 0.
    - B completes n−1 increments.
    - A stores 1.
    - B loads 1.
    - A completes its remaining n−1 increments.
    - B stores 2.
  - The result can never be 1. A process's final load cannot see 0 after that process's own earlier stores, all of which are ≥ 1.
  - This derivation is mine; it follows from OSTEP's load/add/store model.
- **Choosing a queue type.** Use POSIX queues when you want priorities, a file-like API, or poll() integration on Linux. Use System V queues when you need to select by type (for example, one queue multiplexing replies to many clients by using `mtype = client pid`) or need the widest portability. This follows from TLPI §52.9 and msgop(2).
- **"Kernel persistence" means leaks survive crashes.** Every IPC program should have a cleanup path (`mq_unlink`, `shm_unlink`, `sem_unlink`, `IPC_RMID`). Before submitting a lab, run `ipcs` and `ls /dev/shm /dev/mqueue` to catch leftovers.
- **An unlinked object is not gone yet.** After `shm_unlink` or `shmctl(IPC_RMID)`, processes that still have the object mapped or attached keep using it. Deletion finishes only when the last reference goes. Recognizing this "it's unlinked but still works" behavior is a common exam point.

### Gaps
- The man pages still say to link with `-lrt`. glibc 2.34's NEWS confirms that libpthread, libdl, libutil and libanl were merged into libc. — [glibc NEWS](https://sourceware.org/git/?p=glibc.git;a=blob_plain;f=NEWS;hb=HEAD). I did **not** find a statement in that NEWS file that librt was merged too. Keep `-lrt` in your build commands; it is harmless.
- I could not run POSIX message queues on the Mac. All POSIX MQ behavior here is from the Linux man pages and TLPI ch. 52, not tested.
- Kerrisk's slide gives "depends" for unnamed POSIX semaphores without explaining it. My reading is that persistence follows the memory the semaphore lives in.

---

## 4. Sockets: socket/bind/listen/accept/connect, backlog, TCP byte stream and framing, partial I/O, SO_REUSEADDR and TIME_WAIT, peer death, Unix domain sockets, SO_PEERCRED, SCM_RIGHTS

### Takeaway
**Call sequence:**
- Server: `socket → setsockopt(SO_REUSEADDR) → bind → listen(backlog) → accept()` in a loop. Each `accept` returns a **new connected fd**, and the listening fd keeps listening.
- Client: `socket → connect`.

**TCP is a byte stream.** One `send` is not one `recv`, so you must **frame** messages (with a length prefix or a delimiter) and **loop on partial reads and writes**.

**Signs that the peer is gone:**
- `recv() == 0` means an orderly close.
- Writes to a dead peer raise SIGPIPE/EPIPE.
- Restarting a server quickly needs SO_REUSEADDR because of **TIME_WAIT**.

**Unix domain sockets** use the same API on one host with pathname addresses, plus credential checks (SO_PEERCRED) and descriptor passing (SCM_RIGHTS).

### Cited Findings

#### 4.1 The call sequence and the backlog
- **Server steps** — [listen(2)](https://man7.org/linux/man-pages/man2/listen.2.html):
  1. `socket(2)`
  2. `bind(2)` to a local address
  3. `listen()`: "A willingness to accept incoming connections and a queue limit for incoming connections"
  4. `accept(2)`
- **accept() semantics:**
  - `accept()` "extracts the first connection request on the queue of pending connections for the listening socket … creates a new connected socket, and returns a new file descriptor … The original socket sockfd is unaffected."
  - `addrlen` is a value-result argument.
  - **EMFILE** means "The per-process limit on the number of open file descriptors has been reached."
  - — [accept(2)](https://man7.org/linux/man-pages/man2/accept.2.html)
- **Listening vs connected descriptors (CMU):**
  - The listening descriptor is "End point for client connection requests. Created once and exists for lifetime of the server."
  - The connected descriptor is "End point of the connection … A new descriptor is created each time the server accepts."
  - — [CMU 15-213 F25, lecture 20 "Network Programming II"](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/20-netprog2.pdf)
- **Backlog (Linux)** — [listen(2)](https://man7.org/linux/man-pages/man2/listen.2.html):
  - Since 2.2, the backlog is "the queue length for completely established sockets waiting to be accepted". Incomplete (SYN) connections are limited separately by `tcp_max_syn_backlog`.
  - When the queue is full, the client "may receive an error with an indication of ECONNREFUSED or … the request may be ignored so that a later reattempt at connection succeeds."
  - The value is silently capped at `/proc/sys/net/core/somaxconn`, whose default is **4096 since Linux 5.4 and 128 before that**.
- **The backlog lets clients connect before accept() (CMU):**
  - A second client connecting to a busy iterative server finds that its **`connect` returns** even though the server has not accepted it yet ("TCP listen backlog").
  - Its write also returns, because the kernel buffers the data.
  - It then **blocks in read**.
  - — [CMU 15-213 F25, lecture 21 "Concurrent Programming"](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/21-concprog.pdf)
- **Conflicting backlog figures:**
  - Beej says "Most systems silently limit this number to about 20; you can probably get away with setting it to 5 or 10." — [Beej's Guide to Network Programming §5.5](https://beej.us/guide/bgnet/html/)
  - CMU says "128-ish by default". — [CMU lecture 20](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/20-netprog2.pdf)
  - **Both are outdated for Linux**, where `somaxconn` defaults to 4096 since 5.4, per listen(2).

#### 4.2 TCP is a byte stream: framing and partial I/O
- TCP "provides a reliable, stream-oriented, full-duplex connection … TCP does not preserve record boundaries." — [tcp(7)](https://man7.org/linux/man-pages/man7/tcp.7.html)
- **Partial writes:** "a successful write() may transfer fewer than count bytes … because a blocked write() to a socket, pipe, or similar was interrupted by a signal handler after it had transferred some … the caller can make another write() call to transfer the remaining bytes." — [write(2)](https://man7.org/linux/man-pages/man2/write.2.html)
- **Short counts (CMU):** short counts happen when "Reading and writing network sockets, pipes, etc." They never happen when reading disk files (except at EOF) or writing disk files. "Best practice is to always allow for short counts." — [CMU lecture 18](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/18-system-io.pdf)
- **Beej on partial sends and framing** — [Beej's Guide to Network Programming §5.7, §7.4, §7.6](https://beej.us/guide/bgnet/html/):
  - "send() returns the number of bytes actually sent out—this might be less than the number you told it to send!" Hence his `sendall()` loop.
  - His framing scheme starts each packet with "len (1 byte, unsigned)—The total length of the packet".
  - On the receiving side: "you should assume that you might receive a partial packet … call recv() over and over again until the packet is completely received."
- **Delimiting (UIUC):** "Applications that are communicating over TCP need to find a unique way of telling each other that this request or response is over. HTTP delimits the header through two carriage returns and uses either a length field or one keeps listening until the connection closes." — [UIUC CS 341, Networking](https://cs341.cs.illinois.edu/coursebook/Networking)
- **[Local test, macOS loopback]:**
  - Three `send()` calls of 5, 5 and 2 bytes arrived as **one 12-byte `recv()`**: `"helloworld!!"`.
  - 4 MiB sent with one blocking `send()` (which returned 4,194,304) arrived through **34 `recv()` calls**, ranging from 2,912 to 418,208 bytes each. The final `recv()` returned 0 when the client closed.

```c
/* The two loops every socket/pipe program needs (same idea as CMU's RIO and Beej's sendall) */
ssize_t writen(int fd, const void *buf, size_t n) {
    const char *p = buf; size_t left = n;
    while (left > 0) {
        ssize_t w = write(fd, p, left);
        if (w < 0) { if (errno == EINTR) continue; return -1; }  /* EPIPE etc. */
        left -= (size_t)w; p += w;
    }
    return (ssize_t)n;
}
ssize_t readn(int fd, void *buf, size_t n) {          /* returns < n only at EOF */
    char *p = buf; size_t left = n;
    while (left > 0) {
        ssize_t r = read(fd, p, left);
        if (r < 0) { if (errno == EINTR) continue; return -1; }
        if (r == 0) break;                            /* peer closed */
        left -= (size_t)r; p += r;
    }
    return (ssize_t)(n - left);
}
/* Length-prefixed framing: 4-byte length in network byte order, then the payload */
uint32_t len = htonl(msglen);  writen(fd, &len, 4);  writen(fd, msg, msglen);
readn(fd, &len, 4);  len = ntohl(len);  /* check len <= buffer size! */  readn(fd, buf, len);
```

#### 4.3 SO_REUSEADDR and TIME_WAIT
- **SO_REUSEADDR** "Indicates that the rules used in validating addresses supplied in a bind(2) call should allow reuse of local addresses. For AF_INET sockets this means that a socket may bind, except when there is an active listening socket bound to the address." — [socket(7)](https://man7.org/linux/man-pages/man7/socket.7.html)
- **TIME-WAIT (RFC 9293):** it "represents waiting for enough time to pass to be sure the remote TCP peer received the acknowledgment of its connection termination request and to avoid new connections being impacted by delayed segments from previous connections."
  - "When a connection is closed actively, it MUST linger in the TIME-WAIT state for a time 2xMSL."
  - "For this specification the MSL is taken to be 2 minutes."
  - — [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293)
- **Linux timers:**
  - Linux hard-codes `#define TCP_TIMEWAIT_LEN (60*HZ)`, which is **60 s**. — [Linux include/net/tcp.h](https://github.com/torvalds/linux/blob/master/include/net/tcp.h)
  - `tcp_fin_timeout` (default 60) is a **different** timer: "how many seconds to wait for a final FIN packet before the socket is forcibly closed".
  - `tcp_tw_reuse` "should not be changed without advice/request of technical experts."
  - — [tcp(7)](https://man7.org/linux/man-pages/man7/tcp.7.html)
- **Beej and UIUC on the symptom:**
  - "you try to rerun a server and bind() fails, claiming 'Address already in use.' … a little bit of a socket that was connected is still hanging around in the kernel." The fix is `setsockopt(listener, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof yes)`. — [Beej §5.3](https://beej.us/guide/bgnet/html/)
  - "specify SO_REUSEADDR before binding to the port." — [UIUC Networking](https://cs341.cs.illinois.edu/coursebook/Networking)
- **[Local test, macOS]:**
  - Setup: the server accepted a client, **closed first** (an active close, so the server side went into TIME_WAIT), and was then restarted on the same port.
  - Re-binding **without** SO_REUSEADDR failed with **EADDRINUSE**; **with** it, the bind succeeded.
  - macOS reports `net.inet.tcp.msl: 15000` (ms).

#### 4.4 Detecting peer death
- "When a stream socket peer has performed an orderly shutdown, the return value will be 0 (the traditional 'end-of-file' return)." — [recv(2)](https://man7.org/linux/man-pages/man2/recv.2.html)
- **MSG_NOSIGNAL:** "Don't generate a SIGPIPE signal if the peer on a stream-oriented socket has closed the connection. The EPIPE error is still returned." Unlike ignoring SIGPIPE, which affects the whole process, this is per call. — [send(2)](https://man7.org/linux/man-pages/man2/send.2.html)
- tcp(7) error meanings — [tcp(7)](https://man7.org/linux/man-pages/man7/tcp.7.html):
  - **EPIPE:** "The other end closed the socket unexpectedly or a read is executed on a shut down socket."
  - **ETIMEDOUT** is returned when retransmissions go unacknowledged.
- **poll() flags:**
  - `POLLRDHUP` (Linux): "Stream socket peer closed connection, or shut down writing half of connection."
  - `POLLHUP`: the peer closed. Remaining data can still be read before EOF.
  - — [poll(2)](https://man7.org/linux/man-pages/man2/poll.2.html)
- **[Local test, macOS]** The client connected and immediately exited.
  - The server's `recv()` returned **0**.
  - The **first** `send()` returned 1: the local kernel accepted the data and the peer answered with RST.
  - The **second** `send()` killed the server with **SIGPIPE (signal 13)** under the default disposition, or returned **-1/EPIPE** when SIGPIPE was ignored.
  - The current macOS SDK defines `MSG_NOSIGNAL` and also the BSD socket option `SO_NOSIGPIPE`.

#### 4.5 Unix domain sockets, SO_PEERCRED, SCM_RIGHTS (concept level)
- **Socket types:** `SOCK_STREAM`; `SOCK_DGRAM`, which "preserves message boundaries (as on most UNIX implementations, UNIX domain datagram sockets are always reliable and don't reorder datagrams)"; and `SOCK_SEQPACKET`, which is connection-oriented and preserves boundaries. — [unix(7)](https://man7.org/linux/man-pages/man7/unix.7.html)
- **Address kinds** — [unix(7)](https://man7.org/linux/man-pages/man7/unix.7.html):
  - **pathname**: bound to a filesystem path;
  - **unnamed**: never bound; `socketpair()` creates two of these;
  - **abstract** (Linux only): `sun_path[0] == '\0'`.
- **Cleanup:** "Binding to a socket with a filename creates a socket in the filesystem that must be deleted by the caller when it is no longer needed (using unlink(2))." — [unix(7)](https://man7.org/linux/man-pages/man7/unix.7.html)
- **socketpair()** "creates an unnamed pair of connected sockets"; "The two sockets are indistinguishable." It works like a **bidirectional pipe** for related processes. — [socketpair(2)](https://man7.org/linux/man-pages/man2/socketpair.2.html)
- **SO_PEERCRED** "returns the credentials of the peer process connected to this socket" as a `struct ucred` (pid, uid, gid), as they were "at the time of the call to connect(2), listen(2), or socketpair(2)". It needs `_GNU_SOURCE`. Servers use it to check **who** is connecting without passwords. — [unix(7)](https://man7.org/linux/man-pages/man7/unix.7.html)
- **SCM_RIGHTS** "Send or receive a set of open file descriptors from another process."
  - "what is being passed is a reference to an open file description … in the receiving process it is likely that a different file descriptor number will be used. Semantically, this operation is equivalent to duplicating (dup(2)) a file descriptor into the file descriptor table of another process." — [unix(7)](https://man7.org/linux/man-pages/man7/unix.7.html)
  - The descriptors are sent as ancillary data with `sendmsg`, built using the `CMSG_*` macros. — [cmsg(3)](https://man7.org/linux/man-pages/man3/cmsg.3.html)
- **Kerrisk's table:** a UNIX domain socket has a pathname name, an fd handle, and process persistence. — [Kerrisk LCA 2013](https://man7.org/conf/lca2013/IPC_Overview-LCA-2013-printable.pdf)
- **[Local test, macOS]** `SO_PEERCRED` is **not defined** on macOS. The BSD alternatives `LOCAL_PEERCRED` and `getpeereid()` exist; `getpeereid()` on a socketpair returned the same uid (501).

### Inferences
- **The framing decision is the core of any TCP protocol answer:**
  - **Delimiter** (for example, newline-terminated chat lines): simple, but you must buffer partial lines and escape the delimiter in data.
  - **Length prefix**: robust for binary data. Always bound-check the length you receive.
  - A `recv` into a fixed buffer, treated as "one message", is the canonical wrong answer.
- **Restarting a server.** The side that closes first gets TIME_WAIT. Servers usually close first, so they hit EADDRINUSE on restart. Clients use fresh ephemeral ports and rarely notice.
- **A server must survive dying clients.** A server that writes to clients must ignore SIGPIPE (or use MSG_NOSIGNAL) and treat EPIPE, ECONNRESET and `read() == 0` as "remove this client". Otherwise one client quitting kills the whole server. This matters directly for the syllabus's chat server.
- **SCM_RIGHTS is the socket analogue of fork-inheritance.** It gives an *unrelated* process a reference to an already-open file, pipe or socket. The fd *number* is meaningless across processes; only the open file description is shared.

### Gaps
- **ECONNRESET:** I found no man7 tcp(7) text explaining when it is returned, compared with EPIPE. Which one you see after a peer reset depends on whether you read or write and on timing. On macOS I observed EPIPE on the second write.
- **SO_REUSEADDR semantics differ between Linux and BSD** for wildcard and specific-address combinations. Only the basic TIME_WAIT case was tested, and only on macOS.

---

## 5. Concurrent server designs: iterative, process-per-client, pre-forked pool, select/poll multiplexing (and their trade-offs)

### Takeaway
- **Iterative:** handles one client at a time. It is simplest, but one slow client blocks everyone.
- **Process-per-client** (`fork` after `accept`):
  - Each client gets an isolated process.
  - The parent **must** `close(connfd)` and the child should `close(listenfd)`.
  - Zombies must be reaped with a SIGCHLD handler that loops `waitpid(-1, NULL, WNOHANG)`, because signals do not queue.
  - Every connection pays a fork.
- **Pre-forked pool:** N workers created up front all `accept()` on the shared listening socket. There is no fork latency, and concurrency is bounded.
- **select/poll event loop:** one process watches many fds and handles whichever is ready. It needs no locks or extra processes, but the code is harder, any blocking call stalls everyone, and it uses one core.

### Cited Findings
- **Iterative servers (CMU):** "Iterative servers process one request at a time." The "Fundamental Flaw" is that client 2 is stuck behind client 1, with its connect already completed via the listen backlog. — [CMU lecture 21](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/21-concprog.pdf)
- **Process-based server rules (CMU):**
  - "Both parent & child have copies of listenfd and connfd. Parent must close connfd. Child should close listenfd."
  - "Listening server process must reap zombie children to avoid fatal memory leak."
  - "Parent process must close its copy of connfd. Kernel keeps reference count for each socket/open file. After fork, refcnt(connfd) = 2. Connection will not be closed until refcnt(connfd) = 0."
  - CMU's echo server comments its parent's close as "Parent closes connected socket (important!)".
  - — [CMU lecture 21](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/21-concprog.pdf)
- **Zombies:**
  - "A child that terminates, but has not been waited for becomes a 'zombie'… it will consume a slot in the kernel process table, and if this table fills, it will not be possible to create further processes."
  - Orphaned zombies are adopted and reaped by init.
  - Setting SIGCHLD to `SIG_IGN`, or using `SA_NOCLDWAIT`, prevents zombies (POSIX.1-2001).
  - — [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html); [sigaction(2)](https://man7.org/linux/man-pages/man2/sigaction.2.html)
- **Signals don't queue:** "Standard signals do not queue. If multiple instances of a standard signal are generated while that signal is blocked, then only one instance of the signal is marked as pending." — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html). CMU: "Important: Signals are not queued." — [CMU lecture 17 "ECF: Signals"](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/17-ecf.pdf). This is why the handler loops: `while (waitpid(-1, NULL, WNOHANG) > 0) continue; // reap all children`. — [CMU lecture 21](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/21-concprog.pdf)
- **Handler rules (CMU):**
  - "G1: Call only async-signal-safe functions in your handlers (printf, sprintf, malloc, and exit are not safe!)."
  - "G2: Save and restore errno on entry and exit."
  - — [CMU lecture 17](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/17-ecf.pdf)
- **accept() and EINTR:** `accept()` is restarted after a handler only if the handler was installed with `SA_RESTART`; otherwise it fails with EINTR. — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html); [sigaction(2)](https://man7.org/linux/man-pages/man2/sigaction.2.html)
- **Beej:** his server's `sigaction()` call "is responsible for reaping zombie processes that appear as the fork()ed child processes exit." — [Beej §6.1](https://beej.us/guide/bgnet/html/)
- **Pre-forked pool (Apache prefork MPM)** — [Apache httpd 2.4, prefork](https://httpd.apache.org/docs/2.4/mod/prefork.html):
  - "Implements a non-threaded, pre-forking web server."
  - "A single control process is responsible for launching child processes which listen for connections and serve them when they arrive."
  - It "always tries to maintain several spare or idle server processes, which stand ready to serve incoming requests. In this way, clients do not need to wait for a new child processes to be forked."
  - It is "the best MPM for isolating each request, so that a problem with a single request will not affect any other."
- **select():**
  - "can monitor only file descriptors numbers that are less than FD_SETSIZE (1024)… All modern applications should instead use poll(2) or epoll(7)."
  - "Upon return, each of the file descriptor sets is modified in place … if using select() within a loop, the sets must be reinitialized before each call."
  - It "may report a socket file descriptor as 'ready for reading', while nevertheless a subsequent read blocks … it may be safer to use O_NONBLOCK."
  - — [select(2)](https://man7.org/linux/man-pages/man2/select.2.html)
- **poll():** it takes an array of `struct pollfd { int fd; short events; short revents; }`, and "If this field is negative, then the corresponding events field is ignored." — [poll(2)](https://man7.org/linux/man-pages/man2/poll.2.html)
- **OSTEP ch. 33 on event-based servers** — [OSTEP ch. 33](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-events.pdf):
  - With one CPU, "No Locks Needed".
  - "A Problem: Blocking System Calls": one blocking call stalls the whole server.
  - "State Management": code becomes harder to write than thread-based code.
  - Multiple CPUs bring back locking, and page faults cause implicit blocking.
- **CMU's pros and cons lists, verbatim** — [CMU lecture 21](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/21-concprog.pdf):
  - **Process-based**
    - Pros: "Handle multiple connections concurrently"; "Clean sharing model: descriptors (no), file tables (yes), global variables (no)"; "Simple and straightforward".
    - Cons: "Additional overhead for process control"; "Nontrivial to share data between processes".
  - **Event-based**
    - Pros: "One logical control flow and address space"; "Can single-step with a debugger"; "No process or thread control overhead"; "Design of choice for high-performance Web servers and search engines, e.g., Node.js, nginx, Tornado".
    - Cons: "Significantly more complex to code"; "Hard to provide fine-grained concurrency, e.g., how to deal with partial HTTP request headers"; "Cannot take advantage of multi-core".
  - **Thread-based** (for comparison)
    - Pros: "Easy to share data structures"; "more efficient than processes".
    - Cons: "Unintentional sharing can introduce subtle and hard-to-reproduce errors".

**Trace D: fd table of a fork-per-client server** (follows CMU's slides)
```
listenfd = socket+bind+listen        PARENT: 3=listen                          refcnt(listen)=1
connfd = accept(3,...)               PARENT: 3=listen 4=connA                  refcnt(connA)=1
fork()                               PARENT: 3 4     CHILD: 3 4                refcnt(listen)=2, refcnt(connA)=2
child:  close(3)                     CHILD: 4                                  refcnt(listen)=1
parent: close(4)                     PARENT: 3                                 refcnt(connA)=1
child: serve(4); close(4); exit      refcnt(connA)=0 -> connection really closed (client sees EOF)
kernel -> parent: SIGCHLD;  handler: while (waitpid(-1, NULL, WNOHANG) > 0) ;   (zombie reaped)
BUG: parent forgets close(4) -> refcnt(connA) stays 1 after the child exits -> client never sees EOF,
     the parent leaks one fd per client, and accept() eventually fails with EMFILE.
```

**Process-per-client skeleton** (combining the cited rules):
```c
static void reap(int sig) {                     /* only async-signal-safe calls in here */
    int saved = errno;                          /* CMU G2: save/restore errno */
    while (waitpid(-1, NULL, WNOHANG) > 0) ;    /* signals don't queue: reap ALL finished children */
    errno = saved;
}
int main(void) {
    struct sigaction sa; memset(&sa, 0, sizeof sa);
    sa.sa_handler = reap; sigemptyset(&sa.sa_mask);
    sa.sa_flags = SA_RESTART;                   /* blocked accept() restarts instead of failing with EINTR */
    sigaction(SIGCHLD, &sa, NULL);
    int listenfd = make_listener(port);         /* socket + SO_REUSEADDR + bind + listen */
    for (;;) {
        int connfd = accept(listenfd, NULL, NULL);
        if (connfd < 0) { if (errno == EINTR) continue; perror("accept"); continue; }
        if (fork() == 0) {                      /* child */
            close(listenfd);                    /* child never accepts */
            serve(connfd); close(connfd); _exit(0);
        }
        close(connfd);                          /* parent: MUST close (refcnt) */
    }
}
```
**Pre-forked pool skeleton:** `listenfd = make_listener(); for (i = 0; i < N; i++) if (fork() == 0) for (;;) { c = accept(listenfd, …); serve(c); close(c); }`. The parent then loops on `wait()` and forks a replacement for any worker that dies.

**Multi-client chat server with poll().** **[Local test]** This code ran on macOS with three Python clients:
- B and C each received "hello from A\n";
- after C disconnected, A received "B still here\n";
- the server logged every join and leave.
```c
signal(SIGPIPE, SIG_IGN);                        /* a departed client must not kill the server */
int ls = make_listener(port);                    /* SO_REUSEADDR + bind + listen */
struct pollfd fds[MAXC + 1]; int n = 1;
fds[0].fd = ls; fds[0].events = POLLIN;
for (;;) {
    if (poll(fds, n, -1) < 0) { if (errno == EINTR) continue; break; }
    if (fds[0].revents & POLLIN) {               /* listening socket readable => accept won't block */
        int c = accept(ls, NULL, NULL);
        if (c >= 0 && n <= MAXC) { fds[n].fd = c; fds[n].events = POLLIN; fds[n].revents = 0; n++; }
        else if (c >= 0) close(c);
    }
    for (int i = 1; i < n; i++) {
        if (!(fds[i].revents & (POLLIN | POLLHUP | POLLERR))) continue;
        char buf[512]; ssize_t r = read(fds[i].fd, buf, sizeof buf);
        if (r <= 0) {                            /* 0 = client left (EOF), <0 = error */
            close(fds[i].fd); fds[i] = fds[n - 1]; n--; i--; continue;
        }
        for (int j = 1; j < n; j++)              /* broadcast to every other client */
            if (j != i) writen(fds[j].fd, buf, r);   /* loop handles partial writes */
    }
}
```

**Comparison table** (sources: [CMU lecture 21](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/21-concprog.pdf), [Apache prefork](https://httpd.apache.org/docs/2.4/mod/prefork.html), [OSTEP ch. 33](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-events.pdf), [select(2)](https://man7.org/linux/man-pages/man2/select.2.html), [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html))

| Design | How it works | Pros | Cons / pitfalls | Exam keywords |
|---|---|---|---|---|
| **Iterative** | `accept → serve → close`, one client at a time | Simplest; no concurrency bugs | One slow or idle client blocks all others; later clients wait in the backlog | listen backlog, "fundamental flaw" |
| **Process per client** | `accept`, `fork`; child serves; parent `close(connfd)` | Real concurrency; strong isolation (separate address spaces); simple code | `fork` cost per connection; sharing state needs IPC; must reap zombies; fd hygiene; EINTR | refcnt, SIGCHLD, `waitpid(-1, …, WNOHANG)` loop, `SA_RESTART` |
| **Pre-forked pool** | N workers forked at start, each loops on `accept(listenfd)`; parent replaces dead workers | No per-request fork latency; bounded resource use; per-request isolation (Apache) | Pool sizing (too few means queueing; too many wastes memory); idle processes cost memory | spare servers, worker pool |
| **select/poll event loop** | One process, one loop over ready fds; nonblocking I/O; per-client buffers | No process or thread overhead; one address space so sharing is easy; no locks on 1 CPU; debuggable | Complex state machines; any blocking call or page fault stalls all clients; one core; `select` limited to fds < 1024, and sets must be rebuilt each loop | `FD_SET`/`FD_ISSET`, `POLLIN`/`POLLHUP`, O_NONBLOCK |
| (Thread per client) | `pthread_create` per connection | Cheap sharing; lighter than processes | Data races on shared state; hard-to-reproduce bugs | mutex, semaphore |

### Inferences
- **For a chat server, poll() is the natural fit.** Every client's message must reach every other client, so the shared state is the client list. A fork-per-client design would then need IPC between children, such as pipes or shared memory plus semaphores.
- **Weak point of the poll() chat server above:** a blocking `write` to one slow client can stall the whole loop. That is OSTEP's "blocking system calls" problem. Production servers use O_NONBLOCK sockets with per-client output queues and `POLLOUT`.
- **In a pre-forked pool, each connection goes to exactly one worker.** `accept()` "extracts the first connection request on the queue", so one connection cannot be handed out twice. Load-balancing fairness among the blocked workers is up to the kernel.

### Gaps
- I did not find a free authoritative source on the "thundering herd" problem when many pre-forked workers block in `accept()`, nor on modern kernel mitigations such as `SO_REUSEPORT` and `EPOLLEXCLUSIVE`. These are omitted beyond a mention.
- epoll is mentioned only because select(2) recommends it. It is likely beyond an undergraduate midterm, so no epoll details were researched.

---

## 6. Practice questions with answers, common traps, and the best free resources

### Takeaway
Exam questions on this topic test a small set of rules again and again:
1. EOF arrives only when **all** write ends are closed, and SIGPIPE when **all** read ends are closed.
2. fork, dup2 and exec copy descriptors, so draw fd tables with reference counts.
3. Writes up to PIPE_BUF are atomic.
4. Pipes and TCP have no message boundaries, and short counts happen.
5. FIFO `open` blocks until both ends are open.
6. POSIX MQ priority order vs System V type selection, and kernel persistence plus cleanup.
7. `counter++` races, fixed with a semaphore initialized to 1.
8. Server fd hygiene, zombie reaping, and the trade-offs between server designs.

Practicing the 20 questions below with fd-table drawings covers all of these.

### Cited Findings

#### 6.1 Practice questions with answers (Linux semantics unless stated)

**Q1 (MIT 6.1810 Fall 2025, Quiz 1, Q1).** The program is: `pipe(fds); fork(); write(fds[1],"x",1); close(fds[1]); n = read(fds[0], buf, 32); printf("%d\n", n);`. Both processes print a number. Which output pairs are possible: A. `2 0`, B. `0 0`, C. `1 1`, D. `2 2`, E. `0 1`?
**Answer: A and C.**
- Only two bytes are ever written, so D is impossible.
- B is impossible because if one process read nothing, the other must have read at least one byte.
- E is impossible because "a process can't read zero bytes from a pipe until all write FDs to the pipe have been closed; this can only happen after both processes write to the pipe; if one process read 0, the other must read 2."
- — [MIT 6.1810 2025 Quiz 1 solutions](https://pdos.csail.mit.edu/6.1810/2025/quiz/q25-1-sol.pdf)

**Q2 (MIT 6.1810 2018, Quiz 1, Q1).** A reader process closes `fds[1]` and prints characters until `read` returns 0. A second process closes `fds[0]` and forks 4 writers. Each writer writes one unique character ('a', 'b', 'c', 'd': `c` starts at 'a' and is incremented after each fork) and exits; the second process waits for them all and then exits.
- (a) Where must `pipe(fds)` go? **Answer:** immediately in `main`, **before** `fork()`.
- (b) What code goes in the writer loop? **Answer:** `pid = fork(); if (pid == 0) { writer(fds, c); exit(); }`.
- (c) Which outputs are possible among `abcd`, `cbad`, `aabd`, `abc`? **Answer:** `abcd` and `cbad` are possible.
  - `aabd` is impossible because each character is written exactly once.
  - `abc` is impossible because EOF requires every write end to be closed, which happens only after all 4 writers and their parent have exited.
  - The official text reads "All, except aab and abc"; "aab" is evidently a typo for "aabd".
- — [MIT 6.1810 2018 Quiz 1 solutions](https://pdos.csail.mit.edu/6.1810/2025/quiz/q18_1_sol.pdf)

**Q3.** After `pipe(p); fork(); fork();` with no `close()` calls, how many descriptors refer to the write end, and what must happen before a reader sees EOF?
**Answer:** There are 4 processes, each with its own copy, so 4 descriptors (refcnt = 4) point at the same write-end open file description. All 4 must be closed, including any copy held by the reader itself. — [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html); [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)

**Q4.** A process writes 100 bytes into a pipe whose readers have all exited. What happens (a) by default, and (b) after `signal(SIGPIPE, SIG_IGN)`? What exit status does bash show in case (a)?
**Answer:**
- (a) SIGPIPE is delivered, and its default action terminates the process.
- (b) `write` returns -1 with errno EPIPE.
- Bash shows 141 (128 + 13); see the [Local test] in §1.1.
- — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html); [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)

**Q5.** Several processes write records into one pipe at the same time with blocking writes. On Linux, can 3000-byte records interleave? What about 5000-byte records? What about 3000-byte records on macOS?
**Answer:**
- Linux, 3000 bytes: **no**, because 3000 ≤ PIPE_BUF = 4096, so each write is atomic.
- Linux, 5000 bytes: **yes**, because 5000 > PIPE_BUF, so the write is non-atomic and may interleave.
- macOS, 3000 bytes: **yes**, because PIPE_BUF there is 512 [Local test].
- — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)

**Q6.** What does `dup2(5, 5)` do? What about `dup2(99, 1)` when fd 99 is not open? After `dup2(fd, 1)`, is close-on-exec set on fd 1?
**Answer:**
- `dup2(5, 5)` does nothing and returns 5 (if 5 is valid).
- `dup2(99, 1)` fails, and **fd 1 is not closed**.
- If newfd was already open, dup2 closes it silently before reusing it. The new descriptor does not share the close-on-exec flag: "The close-on-exec flag (FD_CLOEXEC; see fcntl(2)) for the duplicate descriptor is off."
- — [dup(2)](https://man7.org/linux/man-pages/man2/dup.2.html)

**Q7.** `pipe(p)` returns 3 and 4. A child runs `dup2(p[1], 1); close(p[0]); close(p[1]); execlp("ls", …)`. Draw the child's fd table before exec. Which process must close what for `wc` in the other child to get EOF?
**Answer:**
- The child's table is `0=tty, 1=pipe write end, 2=tty`.
- The parent must close 3 and 4, and the `wc` child must close 4 (and 3 after its own `dup2(3, 0)`).
- EOF arrives when `ls` exits. See Trace B in §1.4.
- — [dup(2)](https://man7.org/linux/man-pages/man2/dup.2.html); [CMU lecture 18](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/18-system-io.pdf)

**Q8 (find the hang).** A parent writes "Hi Child!" into a pipe and calls `wait(NULL)`. The child loops `while (read(fd[0], &c, 1) > 0) putchar(c);` and never closes anything. Why does it hang? Give two fixes.
**Answer:**
- The child still holds `fd[1]`, so a writer always exists and its `read` blocks forever after the 9 bytes. The parent then waits forever for the child.
- Fix 1: the child calls `close(fd[1])` before the loop, **and** the parent calls `close(fd[1])` after writing.
- Fix 2: use an end-of-message marker, as UIUC suggests.
- — [UIUC CS 341 IPC "Pipe Gotchas"](https://cs341.cs.illinois.edu/coursebook/Ipc)

**Q9 (find the hang).** In `printf | sort | wc -l`, both pipes are created before any fork, each child closes only the fds it passed to `dup2`, and the parent closes all four. Which processes hang, and why?
**Answer:**
- `sort` hangs because it, and `wc`, still hold `p1[1]`, so `sort` never sees EOF.
- `wc` hangs because it holds `p2[1]` itself.
- Fix: every child closes **all** pipe fds after `dup2`, or use the prev-fd loop. See Bug C and Trace C, checked with a [Local test].
- — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)

**Q10.** A parent sends 1 MiB to `cat` through one pipe and then reads `cat`'s output from a second pipe. It hangs with large inputs but works with small ones. Why? Give two fixes.
**Answer:**
- Both pipes fill (64 KiB each on Linux): `cat` blocks writing output, and the parent blocks writing input. This is a circular wait.
- Fixes: use a separate writer process or thread, use `poll()` to interleave reading and writing, or use a temporary file.
- — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)

**Q11.** Process A calls `open("f", O_WRONLY)` on a FIFO that nobody has opened. What happens? What happens with `O_WRONLY|O_NONBLOCK`? What about a reader using `O_RDONLY|O_NONBLOCK`?
**Answer:**
- Plain `O_WRONLY`: A blocks until a reader opens.
- `O_WRONLY|O_NONBLOCK`: fails with **ENXIO**.
- `O_RDONLY|O_NONBLOCK`: succeeds immediately.
- — [fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html)

**Q12.** A FIFO server's `read()` returns 0 as soon as the only client disconnects, and the server then spins in a loop. Why, and what is the fix?
**Answer:**
- With no writers left, a read returns EOF (0). That is the pipe EOF rule.
- Fix: the server also opens its own FIFO for writing and keeps that descriptor (a dummy writer), so a writer always exists. Opening with O_RDWR also works on Linux but POSIX leaves it undefined.
- — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html); [fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html)

**Q13.** Messages are sent to a POSIX MQ in this order: m1 (priority 1), m2 (priority 5), m3 (priority 5), m4 (priority 0). In what order does `mq_receive` return them?
**Answer:** **m2, m3, m1, m4.** Higher priority comes first, and within the same priority older messages come first. — [mq_send(3)](https://man7.org/linux/man-pages/man3/mq_send.3.html); [mq_receive(3)](https://man7.org/linux/man-pages/man3/mq_receive.3.html)

**Q14.** A System V queue holds, in order, A(type 3), B(type 1), C(type 2), D(type 1). On Linux, what do these successive calls return: `msgrcv` with msgtyp 2, then −3, then 0, then 0?
**Answer:**
- msgtyp 2 returns **C**.
- msgtyp −3 returns **B**: the lowest type ≤ 3 is 1, and B is the first message of type 1.
- msgtyp 0 returns **A**, and the next msgtyp 0 returns **D**.
- (On macOS the −3 call returns A, which deviates from Linux; see §3.2.)
- — [msgop(2)](https://man7.org/linux/man-pages/man2/msgop.2.html)

**Q15.** A program that created a System V message queue and a POSIX shared memory object crashes. Do the objects still exist? How do you find and remove them? What happens if you call `shmctl(IPC_RMID)` while another process is still attached?
**Answer:**
- Yes, both have kernel persistence.
- System V: list with `ipcs -q` and remove with `ipcrm -q <id>`, or call `msgctl(id, IPC_RMID, NULL)`.
- POSIX: list with `ls /dev/shm`, then call `shm_unlink("/name")` or use `ipcrm --posix-shmem name` (newer util-linux).
- With a process still attached, a System V segment is only **marked** for destruction and is destroyed when the last process detaches.
- — [Kerrisk LCA 2013](https://man7.org/conf/lca2013/IPC_Overview-LCA-2013-printable.pdf); [ipcrm(1)](https://man7.org/linux/man-pages/man1/ipcrm.1.html); [shm_overview(7)](https://man7.org/linux/man-pages/man7/shm_overview.7.html); [shmctl(2)](https://man7.org/linux/man-pages/man2/shmctl.2.html)

**Q16.** Two processes share `long counter = 0` in shared memory, and each runs `counter++` 1000 times. (a) Show an interleaving that loses an update. (b) What are the maximum and minimum possible final values? (c) Fix it.
**Answer:**
- (a) Use the load/add/store table in §3.4.
- (b) The maximum is 2000. The minimum is **2**; the interleaving is in §3.4 Inferences.
- (c) Put a semaphore **initialized to 1** around `counter++` with `sem_wait`/`sem_post`. For processes, use a named semaphore or a `sem_init(pshared=1)` semaphore placed inside the shared region.
- — [OSTEP ch. 26](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf); [OSTEP ch. 31](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf); [sem_init(3)](https://man7.org/linux/man-pages/man3/sem_init.3.html)

**Q17.** A client calls `send(s,"HELLO",5,0); send(s,"WORLD",5,0);` and the server calls `recv(c, buf, 100, 0)` once. What can the server get? How should the protocol be designed?
**Answer:**
- Anything from 1 to 10 bytes, for example "HEL", "HELLO" or "HELLOWORLD". TCP does not preserve record boundaries; my [Local test] coalesced three sends into one recv.
- Design: use a length-prefix header or a delimiter, plus `readn`/`writen` loops.
- — [tcp(7)](https://man7.org/linux/man-pages/man7/tcp.7.html); [Beej §7.6](https://beej.us/guide/bgnet/html/)

**Q18.** You restart your server and `bind()` fails with EADDRINUSE. Why does this happen, how long does it last, and what is the fix?
**Answer:**
- The server closed its connections actively, so they sit in **TIME_WAIT** for 2×MSL. That is 60 s on Linux (`TCP_TIMEWAIT_LEN`); RFC 9293 nominally gives 2 × 2 min.
- Fix: set `SO_REUSEADDR` **before** `bind()`.
- — [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293); [Linux tcp.h](https://github.com/torvalds/linux/blob/master/include/net/tcp.h); [socket(7)](https://man7.org/linux/man-pages/man7/socket.7.html)

**Q19.** In a fork-per-client server: (a) What breaks if the parent never calls `close(connfd)`? (b) Why use `while (waitpid(-1, NULL, WNOHANG) > 0)` in the SIGCHLD handler instead of one `wait()`? (c) Why does `accept()` sometimes fail with EINTR?
**Answer:**
- (a) `refcnt(connfd)` never reaches 0, so the client never sees EOF. The parent also leaks one fd per client until `accept` fails with EMFILE.
- (b) Signals do not queue, so one SIGCHLD may stand for several dead children. `WNOHANG` keeps the handler from blocking on children that are still alive.
- (c) The SIGCHLD handler interrupted the blocked `accept`. Install the handler with `SA_RESTART` or retry on EINTR.
- — [CMU lecture 21](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/21-concprog.pdf); [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html); [accept(2)](https://man7.org/linux/man-pages/man2/accept.2.html)

**Q20.** Compare `select()` and `poll()`. Also: in a select-based chat server, one client sends half a line and stops, and your handler calls a blocking "read until newline" function. What happens?
**Answer:**
- `select`: fd numbers must be < 1024 (`FD_SETSIZE`), and the sets are modified in place, so they must be rebuilt every iteration.
- `poll`: an array of `struct pollfd` with separate `events` and `revents`, and no `FD_SETSIZE` limit.
- The half-line scenario stalls the **entire server** inside one handler. Read only what is available, keep a buffer per client, and use O_NONBLOCK.
- — [select(2)](https://man7.org/linux/man-pages/man2/select.2.html); [poll(2)](https://man7.org/linux/man-pages/man2/poll.2.html); [OSTEP ch. 33](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-events.pdf)

**Bonus.** What does `SCM_RIGHTS` transfer, and will the receiver get the same fd number?
**Answer:** It transfers a reference to the **open file description**, which works like a `dup()` into another process's fd table. The receiver will likely get a **different** fd number. — [unix(7)](https://man7.org/linux/man-pages/man7/unix.7.html)

#### 6.2 Common traps (each one has cost students marks or caused hung labs)
1. **Not closing unused pipe ends**, including the reader's own write end. — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html); [xv6 book](https://pdos.csail.mit.edu/6.1810/2025/xv6/book-riscv-rev5.pdf)
2. **Expecting message boundaries** from pipes or TCP. — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html); [tcp(7)](https://man7.org/linux/man-pages/man7/tcp.7.html)
3. **Ignoring short counts.** Always loop on `read`/`write`/`send`/`recv`. — [read(2)](https://man7.org/linux/man-pages/man2/read.2.html); [write(2)](https://man7.org/linux/man-pages/man2/write.2.html); [CMU lecture 18](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/18-system-io.pdf)
4. **Treating `read()`/`recv()` returning 0 as "no data yet".** It means EOF or peer closed; remove the client. — [recv(2)](https://man7.org/linux/man-pages/man2/recv.2.html)
5. **Calling `wait()` before draining the child's output pipe** (capacity deadlock). — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)
6. **Assuming PIPE_BUF = 4096 everywhere.** POSIX guarantees only 512, and macOS uses 512. — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html); [Local test]
7. **Forgetting `fflush` before `fork()`**, which duplicates output, or before waiting on a reader, which leaves data stuck in a block-buffered stream. — [UIUC Processes](https://cs341.cs.illinois.edu/coursebook/Processes); [setvbuf(3)](https://man7.org/linux/man-pages/man3/setvbuf.3.html)
8. **Calling `printf` or `malloc` in signal handlers**, or not saving `errno` there. — [CMU lecture 17](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/17-ecf.pdf)
9. **Calling `wait()` only once per SIGCHLD.** Loop with `WNOHANG`. — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
10. **Not handling EINTR from `accept`/`read`/`open`/`wait`.** — [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
11. **Parent not closing `connfd`** in a fork server. — [CMU lecture 21](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/21-concprog.pdf)
12. **Server killed by SIGPIPE when a client leaves.** Ignore SIGPIPE or use MSG_NOSIGNAL. — [send(2)](https://man7.org/linux/man-pages/man2/send.2.html)
13. **Setting `SO_REUSEADDR` after `bind`** (too late) or forgetting it. — [UIUC Networking](https://cs341.cs.illinois.edu/coursebook/Networking)
14. **Reusing `fd_set`s without rebuilding them**, or using `select` with fds ≥ 1024. — [select(2)](https://man7.org/linux/man-pages/man2/select.2.html)
15. **Message queue sizing mistakes:**
    - an `mq_receive` buffer smaller than `mq_msgsize` fails with EMSGSIZE;
    - System V `msgsz` must exclude `mtype`, and `mtype` must be > 0.
    - — [mq_receive(3)](https://man7.org/linux/man-pages/man3/mq_receive.3.html); [msgop(2)](https://man7.org/linux/man-pages/man2/msgop.2.html)
16. **Leaking System V and POSIX IPC objects.** They have kernel persistence; check with `ipcs` and `/dev/shm`. — [Beej IPC §9](https://beej.us/guide/bgipc/html/); [ipcrm(1)](https://man7.org/linux/man-pages/man1/ipcrm.1.html)
17. **Placing a process-shared semaphore in private memory**, such as a global variable before `fork()` without `MAP_SHARED`. — [sem_init(3)](https://man7.org/linux/man-pages/man3/sem_init.3.html)
18. **Forgetting `-pthread`/`-lrt`.** — [sem_overview(7)](https://man7.org/linux/man-pages/man7/sem_overview.7.html); [mq_overview(7)](https://man7.org/linux/man-pages/man7/mq_overview.7.html)
19. **Not unlinking a Unix-socket path**, so the next `bind` fails. — [unix(7)](https://man7.org/linux/man-pages/man7/unix.7.html)
20. **Trusting old docs on `O_NDELAY`** (Beej) over current pipe(7) EAGAIN semantics. — [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)

**Linux (what the exam assumes) vs macOS (if you code on a Mac)**

| Item | Linux | macOS (my [Local test] unless noted) |
|---|---|---|
| PIPE_BUF | 4096 ([pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)) | 512 |
| Default pipe capacity | 65,536 ([pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html)) | 65,536 measured |
| POSIX message queues | Yes, `-lrt` ([mq_overview(7)](https://man7.org/linux/man-pages/man7/mq_overview.7.html)) | **Not available** (no `<mqueue.h>`) |
| `sem_init(pshared=1)` | Works in shared memory ([sem_init(3)](https://man7.org/linux/man-pages/man3/sem_init.3.html)) | **-1/ENOSYS**; use `sem_open` |
| `msgrcv` with negative msgtyp | Lowest type ≤ \|t\| ([msgop(2)](https://man7.org/linux/man-pages/man2/msgop.2.html)) | **First** message with type ≤ \|t\| ([XNU source](https://github.com/apple-oss-distributions/xnu/blob/main/bsd/kern/sysv_msg.c)) |
| `SO_PEERCRED` | Yes ([unix(7)](https://man7.org/linux/man-pages/man7/unix.7.html)) | No; use `getpeereid()` / `LOCAL_PEERCRED` |
| TIME_WAIT | 60 s ([tcp.h](https://github.com/torvalds/linux/blob/master/include/net/tcp.h)) | MSL is 15 s (`sysctl`); TIME_WAIT is presumably 2×MSL = 30 s (not verified) |
| Inspecting fds | `/proc/PID/fd` ([proc_pid_fd(5)](https://man7.org/linux/man-pages/man5/proc_pid_fd.5.html)) | `lsof -p PID` |
| FIFO `O_RDWR` | Succeeds (Linux-specific, [fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html)) | Also succeeded |

#### 6.3 Best free resources (all legal and free; no pirated textbooks)
1. **Linux man pages** at man7.org. They are the primary source for every rule above. Read the DESCRIPTION and NOTES sections of:
   - [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html), [pipe(2)](https://man7.org/linux/man-pages/man2/pipe.2.html), [dup(2)](https://man7.org/linux/man-pages/man2/dup.2.html), [fifo(7)](https://man7.org/linux/man-pages/man7/fifo.7.html)
   - [mq_overview(7)](https://man7.org/linux/man-pages/man7/mq_overview.7.html), [sysvipc(7)](https://man7.org/linux/man-pages/man7/sysvipc.7.html), [shm_overview(7)](https://man7.org/linux/man-pages/man7/shm_overview.7.html), [sem_overview(7)](https://man7.org/linux/man-pages/man7/sem_overview.7.html)
   - [socket(7)](https://man7.org/linux/man-pages/man7/socket.7.html), [tcp(7)](https://man7.org/linux/man-pages/man7/tcp.7.html), [unix(7)](https://man7.org/linux/man-pages/man7/unix.7.html), [select(2)](https://man7.org/linux/man-pages/man2/select.2.html), [poll(2)](https://man7.org/linux/man-pages/man2/poll.2.html)
   - [listen(2)](https://man7.org/linux/man-pages/man2/listen.2.html), [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html), [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)
2. **Michael Kerrisk's free material:**
   - ["An introduction to Linux IPC facilities" (LCA 2013 slides)](https://man7.org/conf/lca2013/IPC_Overview-LCA-2013-printable.pdf), the best one-hour overview, with the comparison tables used in §3.3.
   - TLPI free sample chapters: [ch. 24 Process Creation](https://man7.org/tlpi/download/TLPI-24-Process_Creation.pdf), [ch. 52 POSIX Message Queues](https://man7.org/tlpi/download/TLPI-52-POSIX_Message_Queues.pdf) and [ch. 4 File I/O](https://man7.org/tlpi/download/TLPI-04-File_IO_The_Universal_IO_Model.pdf), listed at [man7.org/tlpi](https://man7.org/tlpi/).
   - More talks at [man7.org/conf](https://man7.org/conf/), including a FOSDEM 2016 puzzle on the UNIX domain sockets API.
3. **Beej's guides** (free HTML and PDF):
   - [Beej's Guide to Unix IPC](https://beej.us/guide/bgipc/html/) (v1.5.6): pipes, FIFOs, POSIX and System V queues, semaphores, shared memory, mmap, Unix sockets.
   - [Beej's Guide to Network Programming](https://beej.us/guide/bgnet/html/) (v3.3.3): the socket call sequence, `sendall`, framing, `poll`/`select`, and the chat server example.
   - Caveat: Beej's backlog "about 20" claim and the O_NDELAY read claim are outdated (see §2 and §4.1).
4. **OSTEP** (free PDFs at [ostep.org / pages.cs.wisc.edu/~remzi/OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/)):
   - [ch. 5 Process API](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf): fork, exec, redirection, `pipe()`
   - [ch. 26 Concurrency and Threads](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf): the counter race trace
   - [ch. 31 Semaphores](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)
   - [ch. 33 Event-based Concurrency](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-events.pdf): select/poll
   - [ch. 39 Files and Directories](https://pages.cs.wisc.edu/~remzi/OSTEP/file-intro.pdf), §39.6: fork/dup sharing
5. **CMU 15-213 (Fall 2025 slides, free)** — [schedule](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/schedule.html):
   - [16 Processes](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/16-processes.pdf)
   - [17 ECF: Signals](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/17-ecf.pdf)
   - [18 System-Level I/O](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/18-system-io.pdf)
   - [19 File Systems / Network Programming I](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/19-fs_netprog1.pdf)
   - [20 Network Programming II](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/20-netprog2.pdf)
   - [21 Concurrent Programming](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f25/www/lectures/21-concprog.pdf)
   - The current-term (Fall 2026) schedule had only posted slides up to lecture 14 as of today, so use the F25 archive.
6. **MIT 6.1810:**
   - [xv6 book (rev5)](https://pdos.csail.mit.edu/6.1810/2025/xv6/book-riscv-rev5.pdf), ch. 1 on file descriptors, pipes and I/O redirection.
   - [Past quizzes with solutions](https://pdos.csail.mit.edu/6.1810/2025/quiz.html). Quiz 1 of 2025 and 2018 contain the pipe questions used in Q1 and Q2. Other questions are about xv6 internals and go beyond this course.
7. **UIUC CS 341 coursebook** (free):
   - [IPC](https://cs341.cs.illinois.edu/coursebook/Ipc): "Pipe Gotchas", pipes and dup, "Hanging Named Pipes".
   - [Networking](https://cs341.cs.illinois.edu/coursebook/Networking): delimiting requests, SO_REUSEADDR.
   - [Processes](https://cs341.cs.illinois.edu/coursebook/Processes): fork and stdio buffers.
8. **Standards and documentation:**
   - [RFC 9293 (TCP)](https://www.rfc-editor.org/rfc/rfc9293), for TIME-WAIT and MSL.
   - [Apache prefork MPM docs](https://httpd.apache.org/docs/2.4/mod/prefork.html), a real-world pre-forked pool.

### Inferences
- **Suggested study order for one week:**
  1. Day 1: pipe(7), fifo(7), and §1 traces A–C. Redraw them from memory.
  2. Day 2: Bugs A–D. Predict each hang before reading the fix.
  3. Day 3: Kerrisk's slides and the §3 tables. Learn the persistence and cleanup commands.
  4. Day 4: OSTEP ch. 26 and 31, and the counter table and semaphore code.
  5. Day 5: Beej's network guide (§5–7) and CMU lecture 21.
  6. Day 6: write the poll() chat server from memory and do Q1–Q20.
  7. Day 7: review the traps.
- **If the exam's "find and repair the hang" item matches the syllabus wording,** it will almost certainly be Bug A, B or C (an unclosed write end), or Bug D (a capacity deadlock). Checklist §1.6 items 1–5 resolve all four.

### Gaps
- I could not run new web searches during this session: the session's search budget was exhausted. University exam material was therefore gathered by fetching known .edu URLs directly (MIT, CMU, UIUC, Wisconsin).
  - I did **not** locate free practice exams from Stanford CS110 or Berkeley CS162, which are commonly cited for pipe/dup2 questions. They may exist but were not verified.
- No sources specific to Inha University's course were consulted, by design, since these are outside notes.
