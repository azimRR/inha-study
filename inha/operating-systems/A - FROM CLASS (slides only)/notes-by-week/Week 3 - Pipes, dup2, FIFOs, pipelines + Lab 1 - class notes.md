# Week 3 — IPC: pipes, dup2, FIFOs, pipelines (+ Lab 1) (CLASS NOTES — from slides only)

> Sources: Slide 6 [S06-p#] "Inter-Process Communication — Pipes and dup2" (v2, 21 Sep 2026, 18 pages) · Slide 7 [S07-p#] "Inter-Process Communication — FIFO and pipeline" (22 Sep 2026, 10 pages) · Lab 1 [Lab1-p#] "Pipes, dup2 and FIFOs" (18 pages). Instructor: Jalolliddin Yusupov, SOC 3010.
>
> Markers: ⭐ = stressed on the slide / likely exam material · ⚠️ = typo, bug or trap in the material · 🔎 = not explained in class → look it up in Track B · ★ = the lab's own difficulty stars, kept as printed.
>
> **"Verified"** means I typed the program exactly as printed, compiled it with `cc -Wall` (Apple clang 21, macOS arm64) and ran it on 19 Oct 2026. The lab is written for an Ubuntu VM. Every behavior below matched what the slides and lab predict. Numbers that depend on the machine (directory listings, `/etc/passwd`) are marked "my Mac". Where a slide shows only a fragment, I added the minimum scaffolding needed to run it and I say so.

---

## 1. Big picture

- **Processes cannot see each other's memory.** The same pointer value means different bytes in different processes, so they need **IPC**: a way to exchange data that goes through the kernel. This week covers the two *byte-stream* kinds: the **pipe** and the **FIFO** [S06-p3].
- **A file descriptor is a ticket number.** It is a small integer that indexes your process's private **descriptor table**. Behind each ticket sits the kernel's **open file description** (which object, how it was opened, current offset). Tickets 0/1/2 = stdin/stdout/stderr [S06-p5].
- **`pipe(fd)`** creates a nameless, fixed-size, one-way kernel buffer (64 KiB on Linux) with two tickets: **`fd[0]` = read end, `fd[1]` = write end** ("0 is where you read, 1 is where you write") [S06-p8].
- **`fork()` copies the descriptor table, not the pipe.** After a fork there are 2 readers and 2 writers on 1 tube. **Sacred Rule of Closing:** every process closes every end it won't use, immediately after fork [S06-p9, p10].
- **Three pipe rules decide everything.** `read` returns **0 (EOF)** only when *every* write end is closed. A `write` into a full pipe **blocks**. A `write` with no reader left gets **SIGPIPE**, which kills the writer (`$?` = 141) or, if caught, makes `write` return -1/EPIPE [S06-p6, p11; Lab A3, A4].
- **`dup2(src, dst)`** makes `dst` a second ticket for `src`'s open file description, closing `dst` first. **`exec` keeps the descriptor table.** Together, dup2 → close both originals → exec is how the shell builds `ls | wc` without either program knowing [S06-p13–p17].
- **FIFO = pipe + a name in the filesystem**, so *unrelated* processes can meet. `mkfifo` only creates the name. **`open()` is the handshake**: a reader's open blocks until a writer arrives, and vice versa [S07-p3–p5].
- **Pipeline** = all commands run concurrently, each one's stdout wired to the next one's stdin, with bytes flowing left → right. No program knows it is in a pipeline [S07-p9; Lab Part B, C2, C4].
- **Hangs are silent** ("Nothing crashes. Nothing logs."). The lab trains you to find the leftover write end, the wrong order of calls, or the full pipe [Lab A2, B1, C1, C6, D2, D6]. That is exactly the midterm task "find and repair the fault in a supplied program that hangs on a pipe".
- **`printf` talks to a buffer; `write` talks to the kernel.** Buffering combined with fork or pipes causes duplicated or stuck output [S06-p6; Lab A5, C6].

---

## 2. Page-by-page notes

## Slide 6 — Inter-Process Communication: Pipes and dup2 (v2)

### [S06-p1] Title slide
- "SOC 3010 Operating Systems — Inter-Process Communication: Pipes and dup2". Instructor Jalolliddin Yusupov, 9/21/2026. Picture: Tux (the Linux penguin) on a circuit board. No technical content.

### [S06-p2] WEEK III — Course Topics & Weekly Lecture Breakdown
- Lecture topic: **Inter-Process Communication — Pipes and FIFOs (TLPI Ch 44)**.
- The week's topic list (list items, verbatim):
  - "Why processes cannot see each other's memory; message passing and shared memory."
  - "Pipes: creation, inheritance across fork, closing unused ends, blocking and end-of-file rules, atomic writes, the SIGPIPE signal; redirection with dup2."
  - "Named pipes (FIFOs) and a simple client-server built on them; the multi-stage pipeline."
- Box "The promise on the syllabus": quotes the same list from the course-organisation deck, then says "All of it is here."
- Box "Reading":
  - TLPI ch. 44 (*The Linux Programming Interface*, which the slide calls the course's system-programming reference).
  - Silberschatz §3.4–3.7.
  - Manual pages `pipe(2)`, `pipe(7)`, `fifo(7)`, `dup2(2)`, `mkfifo(3)`.
- ⭐ This topic list is the week's exam checklist. Every item maps to a page below.
- ⚠️ "atomic writes" is promised here (and again on S07-p2), but no slide or lab page explains it. 🔎 Look up in Track B: "atomic writes" on pipes.

### [S06-p3] The Problem: Two Private Address Spaces
- Diagram (described): two boxes, **PROCESS 4711** and **PROCESS 4712**, separated by a brick column labelled **"THE KERNEL'S WALL"**. A red ✗ blocks the arrow trying to cross it.
  - Inside 4711: `char *msg = "hi";` and `msg == 0xaaaa1c40`, captioned "a number meaningful only here".
  - Inside 4712: `0xaaaa1c40 = ?`, captioned "unmapped, or somebody else's data entirely".
- Box "Why the wall cannot simply be lowered" (paraphrase):
  - Each process has its own **virtual address space**. The hardware translates every pointer through a map that belongs to that process alone (the machinery comes in W12–W13).
  - So the same number `0xaaaa1c40` in two processes reaches two unrelated bytes.
  - Passing a pointer to another process is not a bug you can patch: there is nothing on the other side for it to point at.
- "A **byte stream** carries bytes in order and nothing else." ⭐ (You need this for Lab D5.)
- Box "One name, in case it is new": **IPC — inter-process communication** = "any kernel-mediated way for two processes with separate address spaces to exchange data."
- IPC family tree (diagram as a table):

| BYTE STREAMS | MESSAGES | SHARED STATE | NOTIFICATION |
|---|---|---|---|
| **pipe · W3** (highlighted) | POSIX msg queue · W4 | shared memory · W4 | signal · W1 (marked "done") |
| **FIFO · W3** (highlighted) | System V queue · W4 | semaphore · W4, W6–W7 | |
| socket · W5 | | | |

- So this week covers the two highlighted byte-stream mechanisms. Signals (Week 1) come back as SIGPIPE.

### [S06-p4] Message passing — and Why Not Just Use a File
- Opening sentence (paraphrase): the OS's first job is to keep processes apart. That immediately creates its second job: "giving them a safe way to cooperate anyway."
- Diagram "MODEL 1 · MESSAGE PASSING": process A → **kernel buffer** ("bytes queued here") → process B. Caption: "two copies, one queue, nobody touches anybody's memory". A's bytes are copied into the kernel's queue and copied out to B.
- Box "Why not a shared file?": "You can, and it is wrong on four counts:"
  1. **No notification.** Nothing wakes you when data lands, so you must keep re-reading and asking.
  2. **No boundaries.** A file is just bytes; where one message ends is your problem.
  3. **Racing offsets.** Two writers with two independent file positions overwrite each other. Two writers who *share* one position do "something stranger still".
- ⚠️ The slide says "four counts" but lists only three.
- Link: Lab D5 asks whether pipes fix count 2. They don't [Lab1-p18].

### [S06-p5] A File Descriptor Is a Ticket Number ⭐
- Diagram (described), from left to right:
  - **YOUR PROCESS**: its *descriptor table* with rows `0 stdin`, `1 stdout`, `2 stderr`, `3 a file you opened` (highlighted), `4 free` (dashed). Caption: "one table per process; the numbers are private to it". A keyboard and a monitor sit next to rows 0–2.
  - **KERNEL**: an *open file descriptions* box holding "which object / how it was opened" and "and the offset", labelled "the bookmark" and "you never touch it directly".
  - **Objects**: "the terminal", "a file on disk", and a dashed "a pipe (in ten minutes)".
  - Lines run 0, 1, 2 → bookmark → the terminal, and 3 → another bookmark → the file on disk.

| fd (ticket) | name | kernel side (open file description) | object |
|---|---|---|---|
| 0 | stdin | bookmark | the terminal |
| 1 | stdout | bookmark | the terminal |
| 2 | stderr | bookmark | the terminal |
| 3 | a file you opened | its own bookmark (which object, how opened, offset) | a file on disk |
| 4 | free | — | — |

- "Three names, all new today":
  - **File descriptor**: "a small whole number your process uses as a ticket for something it has open." Each process has its own file descriptor table, managed by the OS.
  - **Descriptor table**: "your process's private list of tickets, indexed 0, 1, 2, 3 …" Every process has its own.
  - **Open file description**: "the kernel's bookmark behind a ticket: *which* object, *how* you opened it, and *where in it* you are."
- "0, 1 and 2 are already yours": every process is born holding three tickets. **Standard input (0)** is where it reads, **standard output (1)** where it writes, and **standard error (2)** where it complains.
- ⭐ "Ticket" vs "bookmark" is the vocabulary Lab D3 asks you to use.

### [S06-p6] `write()` and `read()`: the Two Calls This Week Runs On ⭐
- This code panel is only in the image; the raw text missed it. Heading: "TWO SYSTEM CALLS, TWO COUNTS".
```c
/* hand n bytes to whatever ticket 1 points at, NOW */
ssize_t w = write(1, "hi\n", 3);    /* w == 3 */

/* wait for up to 64 bytes from ticket 0 */
char buf[64];
ssize_t r = read(0, buf, sizeof buf);
/* r > 0  : that many bytes arrived              */
/* r == 0 : END OF FILE - no more will come      */
/* r == -1: an error; look at errno              */
```
- Box "Two names, in case they are new":
  - **`ssize_t`**: "a signed size: a count, or -1 for failure."
  - **`errno`**: "C's per-call error variable: when a call returns -1, errno says why."
  - **End of file (EOF)**: `read` returning **0**, meaning *no more data will ever arrive*. At a terminal you send it yourself with **Ctrl-D**. The slide calls this zero "the single most important number in the next fifty slides." ⭐⭐
- Right-hand box (paraphrase):
  - `printf` is a buffered, formatting wrapper around `write`. It turns the format string and arguments into raw bytes in a **user-space buffer** instead of sending them to the kernel immediately.
  - It returns an `int` counting the characters formatted, not bytes written.
  - Because it defers the real write until a flush is triggered, a crash can lose buffered `printf` output that `write` would already have committed to the OS.
- Yellow banner: "**`printf` talks to a buffer; `write` talks to the kernel.**" ⭐ (This is the key to Lab A5 and C6.)
- Seen while verifying: one of my test children did `printf(...)` and then `_exit(0)` with stdout = a pipe, and the line vanished (the buffer was never flushed). That is exactly the loss this slide warns about.

### [S06-p7] What is a PIPE?
- "A pipe is a fundamental mechanism for **Inter-Process Communication (IPC)** in Unix-like operating systems."
- "Imagine it's a one-way water pipe connecting two points." (Picture: Super-Mario green pipes.)
  - "One process **writes** data to one end."
  - "Another process **reads** that data from the other end."
  - "It's a **unidirectional** (one-way) communication channel."
  - "The data flows in a First-In, First-Out (FIFO) manner."
- Two diagrams (described): Parent `write()` → *write_end* → tube → *read_end* → `read()` Child, "(or)" the mirror image with the child writing and the parent reading. Either direction works, but each pipe goes one way only.
- "A pipe can be created using the system call **pipe**":
```c
#include <unistd.h>
int pipe (int fileDescr[2]);
```

### [S06-p8] `pipe(int fd[2])`: One Call, Two Ends ⭐
```c
int fd[2];                      /* fd[0] = read end, fd[1] = write end */
if (pipe(fd) == -1) {           /* one syscall, two file descriptors   */
    perror("pipe");
    return EXIT_FAILURE;
}
```
- Diagram (described): one **Process** box. `write()` goes into `p[1]`, the bytes travel around the tube, and they come out of `p[0]` into `read()`. A single process can talk to itself through a pipe (Lab A3 does exactly this).
- Box "The mnemonic that saves you an hour" ⭐⭐:
  - "0 is stdin-like, so it is where you read."
  - "1 is stdout-like, so it is where you write."
  - A **pipe** is "a nameless, fixed-size buffer inside the kernel with two descriptors on it: fd[0] the read end, fd[1] the write end."
- **Pipe capacity** = the buffer's size: **65536 bytes (64 KiB)** on Linux since kernel 2.6.11; before that, one page. ⭐ Lab A3 measures it and Lab D2 depends on it.
- A pipe "is like a file" because the kernel represents each end with a file descriptor, so `read()`, `write()` and `close()` work on it just as on an open file.
- Verified: Lab A3 stops at exactly 65536 bytes (on my Mac too).

### [S06-p9] Now Add `fork()`, and Count the Ends ⭐⭐
- Header line: "[fork clones the parent's file descriptor table not the pipe]".
- Diagram (described):
  - "parent prcoess" box with `fd[0]` and `fd[1]`, captioned "holds BOTH ends — reader and writer at once".
  - "child process" box with `fd[0]` and `fd[1]`, captioned "an exact copy of the parent's descriptor table".
  - All four arrows point at ONE `pipe` box inside "Kernel". Labels: "one buffer, four descriptors"; "2 readers · 2 writers · 1 tube".
- fd table right after `pipe(fd); fork();` (fd 2 = tty throughout):

| process | fd 0 | fd 1 | fd 3 | fd 4 |
|---|---|---|---|---|
| parent | tty | tty | R | W |
| child (exact copy) | tty | tty | R | W |

  → one pipe with **two** read ends (R) and **two** write ends (W).
- "And that is the danger" (paraphrase):
  - With four open ends, the kernel sees two writers and two readers and cannot tell which ones you meant.
  - In particular it will **not declare the stream finished while *any* write end is still open, including one held by the very process that is trying to read.**
  - "Nothing crashes. Nothing logs. The program simply stops (deadlock), forever." ⭐⭐
- "The standard [Correct] flow of operation is:"
  - "A process creates a pipe; then it performs a fork"
  - "The child processes inherit the file descriptors"
  - "One of the two processes (e.g. father) writes in the pipe while the other (e.g. child) reads from the pipe"
  - "The unused descriptor can/**MUST** be closed"
- ⚠️ Typo in the diagram: "parent prcoess".
- Verified side question (§6 Q16): calling `pipe()` *after* `fork()` gives each process its own private pipe, and they cannot talk.

### [S06-p10] The Sacred Rule of Closing ⭐⭐⭐
- The rule (orange banner): "**every process closes every pipe end it will not use, immediately after fork.** Not tidiness — correctness".
- The code is only in the image. In class the professor hand-scribbled over the child's error check: `if (`, `== -1) {` and the line `perror("close"); _exit(EXIT_FAILURE);` are crossed out. That simplifies the child's part to a plain `close(fd[1]);` (a stray `}` is left over). Printed version:
```c
if (pid == 0) {                                  /* child: the reader */
    if (close(fd[1]) == -1) {                    /* <- close unused WRITE end */
        perror("close"); _exit(EXIT_FAILURE);
    }
…  the child's read loop, lines 23-31  …
/* parent: the writer */
if (close(fd[0]) == -1) { perror("close"); return EXIT_FAILURE; }   /* <- close unused READ end */
const char *msg = "message from parent to child\n";
if (write(fd[1], msg, strlen(msg)) == -1) { perror("write"); return EXIT_FAILURE; }
if (close(fd[1]) == -1) { perror("close"); return EXIT_FAILURE; }   /* triggers child EOF */
```
- Here the roles are the reverse of p11: the **parent writes** and the **child reads**.
- Box "The two crime-scene tags" (paraphrase):
  - The child closes `fd[1]` because it will never write.
  - The parent closes `fd[0]` because it will never read.
  - The **last** close, the parent's own `fd[1]`, is what finally tells the child the conversation is over: the child's `read` returns 0.
- ⚠️ "the child's read loop, lines 23-31" is not shown (it belongs to a longer program). It has the same shape as the loop in `reader.c` [S07-p7] and Lab A2.
- Verified (with a read loop added): the child prints the message and then sees EOF. If I delete the parent's last `close(fd[1])` and the parent waits for the child, the program hangs forever.

### [S06-p11] Example ⭐
```c
#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>a
#include <string.h>
int main(){
        int p[2];          char buf[80]="Hello";         pid_t pid;
char buf2[80];
         pipe(p);
        if ((pid=fork()) == 0)  {
                                       /* in child process */
                close(p[0]);           /*close unused read */
                write(p[1],buf,strlen(buf)+1);
                        /*write it out, including
                        /*null byte */
                exit(0);
        }
                                        /*in parent process*/
        close(p[1]);         /*close unused write side of pipe */
        read(p[0],buf2,sizeof(buf2));     /*read the pipe*/
        printf("Child process said: %s\n", buf2);
                                       /*display the result */
        exit(0);
}
```
- Step by step:
  1. `pipe(p)` gives fd 3 (R) and fd 4 (W).
  2. `fork()`.
  3. The child closes its read end and writes `strlen("Hello")+1` = 6 bytes. The `+1` sends the `'\0'` so the parent can print the buffer with `%s`. The child exits.
  4. The parent closes its write end, `read`s up to 80 bytes, and prints them.
- Three callout boxes (short quotes):
  - "`write()` **blocks/sleeps** until the reader drains some data when pipe Is full" ⭐
  - "When a process tries to write to a pipe whose **read end is already closed**, the kernel sends **SIGPIPE** to the writer." ⭐
  - "**EOF (end of file) on a pipe** — read() returns **0**, meaning 'no more data will ever arrive'. It is not an error and not a byte; it is a verdict." ⭐⭐
- (Small picture: a copper pipe labelled "Pipe".)
- ⚠️ `#include <stdlib.h>a` has a stray `a`. Verified: the compiler only warns ("extra tokens at end of #include directive") and still builds.
- ⚠️ The comment `/*write it out, including` followed by `/*null byte */` opens a comment inside a comment. It only produces a warning ("'/*' within block comment") and is harmless.
- ⚠️ "pipe Is full": stray capital "I".
- The parent never calls `wait()`. Lab A1 is the "cleaned up" version that adds `wait(NULL)`.
- Verified output: `Child process said: Hello`. (fd tables in §5.1.)

### [S06-p12] TWO DIRECTIONS = TWO PIPES
- "one pipe is half-duplex: data flows one way only". So a two-way conversation needs two pipes.
- Code fragment. The declarations of `pipe1`, `pipe2`, `m1`, `m2`, `m_store` and the `fork()` call are **not** on the slide:
```c
// If this is the child process
  else if (p == 0) {
    // Close the write end of the first pipe
    close(pipe1[1]);
    // Close the read end of the second pipe
    close(pipe2[0]);
    // Write the message "gfg" to the second pipe
    write(pipe2[1], m1, sizeof(m1));
    // Read a message from the first pipe
    read(pipe1[0], m_store, sizeof(m_store));
    // Print the received message
    printf("Child reads %s \n", m_store);
    // Close the read end of the first pipe
    close(pipe1[0]);
    // Close the write end of the second pipe
    close(pipe2[1]);
  }
  // If this is the parent process
  else {
    // Close the write end of the second pipe
    close(pipe2[1]);
    // Close the read end of the first pipe
    close(pipe1[0]);
    // Write the message "GKG" to the first pipe
    write(pipe1[1], m2, sizeof(m2));
    // Read a message from the second pipe
    read(pipe2[0], m_store, sizeof(m_store));
    // Print the received message
    printf("Parent reads %s \n", m_store);
    // Close the read end of the second pipe
    close(pipe2[0]);
    // Close the write end of the first pipe
    close(pipe1[1]);
  }
```
- Diagram (described):
  - **Pipe 1**: the parent's *Write* arrow goes in on the left and the child's *Read* arrow comes out on the right. The parent's read and the child's write are crossed out (✗).
  - **Pipe 2**: the child writes in on the right and the parent reads out on the left. The parent's write and the child's read are crossed out.
  - So **Pipe 1 = parent → child** and **Pipe 2 = child → parent**.
- ⚠️ Here `p` is the **pid** returned by `fork()`, not a pipe array (on p11, `p` *was* the pipe). Don't mix them up in an exam trace.
- Why it doesn't deadlock: each side **writes first, then reads**. Lab A6 asks what happens if one side reads first (deadlock).
- Verified, after adding `char m1[]="gfg", m2[]="GKG", m_store[20]`: prints `Child reads GKG` and `Parent reads gfg` (order may vary). fd tables in §5.2.

### [S06-p13] Shell Support Pipes
- Picture: a cat with labels **head** ("Shows the beginning of a file"), **tail** ("Shows the end of a file") and **cat** ("Displays the contents of a file"). A strip below shows head = Beginning, cat = All Content, tail = End.
- Right column, "And then you discover…":
  - `cat file.txt` shows the entire content of the file.
  - "But wait, there's more!" `cat file.txt | grep "Linux"`: cat reads file.txt, the `|` (pipe) takes the output from the left, and grep searches for "Linux" in that output.
  - `cat file.txt | less` lets you view the content page by page ("So neat!!").
- The shell creates a pipe, forks both processes, and "somehow" wires the pipe into their standard input and output.
- The puzzle ⭐: "If `cat` writes to `fds[1]`, how does `grep` know to read from `fds[0]` instead of the terminal? `grep` doesn't know about your pipe's file descriptors!" The answer is `dup2` (next pages).

### [S06-p14] dup2 — Rewiring File Descriptors
- Problem: the previous parent–child program had to read and write the *new* descriptors made for the pipe by hand.
- Diagram (described; the "Magic portal" is the pipe; the portal picture is credited CC):
  - **First child**: STDIN → Terminal, **STDOUT → a "Magic portal"** (orange arrow), STDERR → Terminal.
  - **Second child**: **STDIN ← the "Magic portal"** (orange arrow), STDOUT → Terminal, STDERR → Terminal.
- "**Ultimate goal:** invisibly connect pipe to STDOUT/STDIN without the programs knowing." Whatever the writer process prints "to the terminal" should land in the pipe, and whatever the reader process reads from its STDIN should come from the pipe.
- Code (image only):
```c
// Child process
if (fork() == 0) {
    close(p[0]);
    dup2(p[1], 1); // stdout is now the pipe
    printf("Hello from child\n"); // goes into the pipe
    exit(0);
}
```
- This child keeps `p[1]` open after the `dup2`. That is harmless only because it exits right away, and exit closes everything. The p17 version closes both originals.
- Verified (with a parent added to read the pipe): the parent pulled 17 bytes, `Hello from child\n`, out of the pipe, and nothing from the child appeared on the terminal.

### [S06-p15] dup2 — Redirecting Process I/O (before) ⭐⭐
- "dup2 copies over file descriptor information from one file descriptor number (srcfd) to another (dstfd)."
```c
int dup2(int srcfd, int dstfd);
e.g. dup2(3, 1);
// duplicates from 3 -> 1; FD 1 now also refers to what 3 is referring to.
```
- The two rules:
  - "Both will now refer to the same thing (e.g. if you read from one, it will advance the position of the other)."
  - "If dstfd is already open, it is closed before being used."
- Diagram (the state **before** the `dup2`): STDIN (0), STDOUT (1) and STDERR (2) all point to the terminal icon. "Pipe read end" (3) points to the pipe's *read* side, and "Pipe write end" (4) to its *write* side.
- Code on the slide:
```c
int fds[2];
pipe(fds);

printf("This prints to the terminal\n");

dup2(fds[1], STDOUT_FILENO); // equivalent here to dup2(4, 1)
printf("This is sent to the pipe!\n");
```

### [S06-p16] dup2 — Redirecting Process I/O (after)
- Same text and code as p15; it is the next animation step. The diagram now shows the **after** state: the STDOUT (1) arrow has been bent away from the terminal to the pipe's **write** end. fd 4 still points there too, and 0 and 2 still go to the terminal.

| moment | fd 0 | fd 1 | fd 2 | fd 3 | fd 4 |
|---|---|---|---|---|---|
| after `pipe(fds)` | tty | tty | tty | R | W |
| after `dup2(fds[1], STDOUT_FILENO)` (= `dup2(4,1)`) | tty | **W** | tty | R | W |

- fd 1's old connection (the terminal) was closed first (rule 2). fd 4 is **not** closed by `dup2`: two tickets now share one bookmark.
- Verified: `fds[0]=3` and `fds[1]=4`, exactly as drawn. On a terminal only "This prints to the terminal" appears; the second line sits in the pipe.
- ⚠️ Trap (verified): run it as `./prog | cat` and **neither** line appears. When stdout is a pipe, `printf` is fully buffered [Lab A5]. Line 1 is therefore still in `printf`'s buffer when fd 1 is rewired, and at exit the whole buffer is written into the *new* fd 1, which is our own pipe.

### [S06-p17] exec Keeps the Descriptors — That Is the Whole Trick ⭐⭐⭐
- "**execve** throws away the program image — code, heap, stack, everything — and keeps the descriptor table".
- Diagram: **BEFORE execve**: program = our C code; fds = `0, 1→pipe, 2`; memory = ours. → **AFTER execve**: program = `/usr/bin/ls`; fds = `0, 1→pipe, 2`; memory = **wiped**.
- Yellow box: "Descriptors are inherited by default; anything you do not want the next program to hold, you must mark or close."
- Green box, "Why you care, in the homework and the project": "A descriptor leaked into a long-lived child is a write end you cannot close — and therefore an EOF that never arrives, in a process you were not even debugging." (Practice Bug 1 in §5.15 is this exact scenario.)
- Code:
```c
// In the child for the `ls`:
dup2(p[1], 1);
// 1. Rewire stdout to the pipe
close(p[0]);
close(p[1]);
// 2. Close unused ends
execlp("ls", "ls", NULL);
// 3. Replace memory with `ls`
```
- The pattern ⭐⭐: **dup2 → close both originals → exec**. The slide's closing paragraph, paraphrased:
  - dup2 secretly rewires the child's stdout to the pipe.
  - Closing the leftover ends guarantees a proper EOF.
  - exec then replaces the child with `ls`.
  - Because exec preserves the descriptor table, `ls` just writes to "stdout" and unknowingly fills the pipe instead of the terminal.
- 🔎 Look up in Track B: how to "mark" a descriptor so the next program does not inherit it. The slide says "mark or close" but only shows closing.
- The full runnable version is Lab A7 (verified, §5.4).

### [S06-p18] Questions?
- Closing slide (photo of a glass building). No content.

---

## Slide 7 — Inter-Process Communication: FIFO and pipeline

### [S07-p1] Title slide
- "Inter-Process Communication: FIFO and pipeline", instructor Jalolliddin Yusupov, 9/22/2026. No technical content.

### [S07-p2] WEEK III breakdown + THE LIMITATION
- Same lecture-topic box and topic list as [S06-p2]. This time the line "Named pipes (FIFOs) and a simple client-server built on them; the multi-stage pipeline." is highlighted: that is today's part.
- "THE LIMITATION": "An anonymous pipe reaches another process **only** through `fork` inheritance. So it needs a **common ancestor**."
- Diagram (described): "your editor — started 09:02" - - ✗ (wall) - - "the database — started yesterday". Caption: "no common ancestor → no inherited pipe".
- Box "Two strangers, no plumbing" (paraphrase):
  - Neither process forked the other, so neither inherited the other's descriptors. Anonymous pipes are "a **family privilege**".
  - The fix: put the pipe's "front door" in the one namespace every process on the machine can already see, **the filesystem**.

### [S07-p3] Give the Pipe a Name (Named Pipe) ⭐
- "Same pipe semantics you already know — but now the pipe has a **name in the filesystem**, so unrelated processes can meet at it."
- Bullets (verbatim):
  - "**FIFO** = First In, First Out → the historical name for 'named pipe'"
  - "It is a **file** — but a special one: type `p` (pipe), not a regular file"
  - "You open it with `open()`, just like any file"
  - "Once open, you `read()` / `write()` it — **identical semantics to `pipe()`**"
  - "Any process with the path and the right permissions can use it — **related or not**"
  - "Works across terminals, users, scripts, and languages"
- ONE-LINE SUMMARY ⭐⭐: "**FIFO = pipe + a name.** Everything you learned about pipes still applies after the `open()`." So all the pipe rules carry over to FIFOs: EOF, blocking writes and SIGPIPE.

### [S07-p4] Give the Pipe a Name — the C API and the shell
- The C API:
```c
#include <sys/stat.h>

int mkfifo(const char *pathname, mode_t mode);
// returns 0 on success, -1 on error (errno = EEXIST if it already exists)
```
- The shell:
```
$ mkfifo /tmp/myfifo
$ mkfifo -m 0600 /tmp/myfifo        # explicit permissions
$ ls -l /tmp/myfifo
  prw-r--r-- 1 alice alice 0 Nov 12 10:04 /tmp/myfifo
  ^
  └── 'p' means pipe (a directory 'd', a regular file '-')
```
- "**Size is always 0.** No data is ever stored on disk" ⭐ (Lab D9e).
- ⚠️ The two `mkfifo` lines are alternatives, not a sequence. Verified: running the second right after the first fails with `mkfifo: /tmp/myfifo: File exists` (the EEXIST case). Run on its own, `-m 0600` gives `prw-------`.
- Verified: `ls -l` shows type `p` and size 0. Even with 10 unread bytes sitting in the FIFO, its size stayed 0.

### [S07-p5] The heart of it: `open()` semantics ⭐⭐⭐
- "This is the **only genuinely new idea** compared to pipe(). Everything else is the same."

| Call | Blocks? | What happens |
|---|---|---|
| `open(path, O_RDONLY)` | **Yes** | Waits until some process opens the FIFO for writing |
| `open(path, O_WRONLY)` | **Yes** | Waits until some process opens the FIFO for reading |
| `open(path, O_RDONLY \| O_NONBLOCK)` | No | Returns immediately, even with no writer present |
| `open(path, O_WRONLY \| O_NONBLOCK)` | No | Returns `-1` with `errno = ENXIO` if no reader |
| `open(path, O_RDWR)` | No | Linux allows it, but it is **non-portable** and you will **never see EOF** — avoid it |

- REMEMBER: "`open()` **is the handshake.** Both sides must arrive before data can flow."
- CRUCIAL POINT (paraphrase): "`mkfifo()` only **creates the name**." It does not open the FIFO, does not create a connection and does not transfer any data. Opening is a separate step, "and that step is where everything interesting happens."
- Verified every row (on my Mac):
  - A plain `O_RDONLY` open sat blocked until killed.
  - `O_RDONLY|O_NONBLOCK` returned fd 3 at once.
  - `O_WRONLY|O_NONBLOCK` with no reader returned -1 with `ENXIO`.
  - `O_RDWR` returned at once, but a later `read` on the empty FIFO never returned (no EOF, ever).
  - Calling `mkfifo` on an existing name returned -1 with `EEXIST`.

### [S07-p6] Example: the writer/client
```c
/* writer.c — creates the FIFO and sends one message */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/stat.h>

#define FIFO_PATH "/tmp/demo_fifo"

int main(void){
    if (mkfifo(FIFO_PATH, 0666) == -1 && errno != EEXIST) {
        perror("mkfifo");
        exit(EXIT_FAILURE);
    }
    printf("writer: waiting for a reader (open blocks)...\n");
    int fd = open(FIFO_PATH, O_WRONLY);      /* < blocks here */
    if (fd == -1) { perror("open"); exit(EXIT_FAILURE); }
    printf("writer: reader arrived, sending\n");
    char *msg = "hello over FIFO\n";
    if (write(fd, msg, strlen(msg)) == -1) perror("write");
    close(fd);
    return 0;
}
```
- Callout `errno ≠ EEXIST`: "A FIFO that is already there is fine; any *other* failure is not." Without this test, a restart "dies on its own leftover well": the FIFO from the previous run still exists, so `mkfifo` fails.
- Callout: "The **perror() function** is a built-in C standard library function used to print a human-readable error message to the standard error stream (**stderr**)."
- Step by step:
  1. `mkfifo` (fine if the FIFO already exists).
  2. Print a waiting message.
  3. `open(..., O_WRONLY)` **blocks here** until a reader opens the FIFO.
  4. Write one message.
  5. `close(fd)`: this is the reader's EOF.
- ⚠️ The callout speaks of "a restart of the server", but the program that calls `mkfifo` is writer.c, which this deck titles the "client" (reader.c is the "server"). The lesson holds for whichever program creates the FIFO.

### [S07-p7] Example: the reader/server ⭐
```c
/* reader.c — receives everything until the writer closes */
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#define FIFO_PATH "/tmp/demo_fifo"
int main(void)
{
    printf("reader: waiting for a writer (open blocks)...\n");
    int fd = open(FIFO_PATH, O_RDONLY);      /* < blocks here */
    if (fd == -1) { perror("open"); exit(EXIT_FAILURE); }
    printf("reader: writer arrived\n");
    char buf[256];
    ssize_t n;
    while ((n = read(fd, buf, sizeof buf)) > 0)
        write(STDOUT_FILENO, buf, n);
     /*n==0>all writers closed (EOF)*/
    printf("reader: EOF, done\n");
    close(fd);
    //unlink(PATH); to remove the FIFO
    return 0;
}
```
- Box "Pure shell, no C at all": terminal 1 runs `$ cat /tmp/myfifo`; terminal 2 runs `$ echo "hello from bash" > /tmp/myfifo`.
- Step by step:
  1. `open(O_RDONLY)` blocks until a writer arrives.
  2. The loop reads up to 256 bytes at a time and copies them to the screen with `write(STDOUT_FILENO, …)`.
  3. When `read` returns 0 ("all writers closed (EOF)"), the loop ends; the program prints "done" and closes.
- ⭐ `while ((n = read(fd, buf, sizeof buf)) > 0)` is THE read-until-EOF loop; Lab A2, A7, C5 and D2 all reuse it.
- ⚠️ The comment `/*n==0>all writers closed (EOF)*/` means "n == 0 → all writers closed (EOF)". [Lab1-p9] prints it cleanly as `/* n == 0 -> all writers closed (EOF) */`.
- ⚠️ `//unlink(PATH); to remove the FIFO`: uncommented as written it **does not compile** (verified: "use of undeclared identifier 'PATH'"). It must be `unlink(FIFO_PATH);`. (`unlink` removes the name, like `rm` [Lab C5].)
- reader.c never calls `mkfifo`. If the FIFO does not exist yet, its `open` fails instead of blocking (Lab A8, order 3).
- Verified: writer-first and reader-first both deliver "hello over FIFO" and then EOF. The pure-shell version prints "hello from bash". Timelines are in §5.9.

### [S07-p8] Homework + Summary ⭐
- Homework: "Write two completely unrelated programs that exchange 5 messages over a FIFO, alternating turns. (Hint: you need two FIFOs, or a strict protocol.)"
  - Hints from class material only, not a solution:
    - Use one FIFO per direction, because a pipe is one-way [S06-p12].
    - Watch the open order: two programs that both open "the FIFO I read" first deadlock inside `open` [Lab D6].
    - A reader sees EOF when the other side closes [S07-p7].
    - Lab C5 points out that this homework (two programs taking turns) is "a different problem" from many writers → one reader.
- "Summary" (hand-drawn):

| | Kitchen Pipe (Ordinary Pipe) | City Water Main (Named Pipe / FIFO) |
|---|---|---|
| picture | Parent Process → Pipe → Child Process | Process A (Writer) → Named Pipe `'/tmp/myfifo'` (drawn with a file icon) → Process B (Reader) |
| who can use it | "Parent-Child Relationship Only" | "Unrelated Processes (Any Can Use)" |
| lifetime | "Exists Only While Running (In Memory)" | "Persists in File System Until Deleted" |

### [S07-p9] What is a pipeline? ⭐⭐
- "You know `pipe()`. You know FIFOs. Now: how does the shell turn `cmd1 | cmd2 | cmd3` into a chain of cooperating processes?" Example box: `ls -l | grep ".c" | sort | wc -l`.
- Bullets (verbatim):
  - "Run all commands **concurrently**, as separate processes."
  - "Connect stdout of each to stdin of the next."
  - "Data flows left → right, as a **stream of bytes**."
  - "No temporary files, no buffering of the whole output, no coordination code."
  - "Each program just reads stdin and writes stdout — it does not know it is in a pipeline."
- Diagram:
```
 ┌──────┐  stdout   ┌──────┐  stdout   ┌──────┐
 │ cmd1 │ ────────▶ │ cmd2 │ ────────▶ │ cmd3 │ ──▶ terminal
 └──────┘   pipe    └──────┘   pipe    └──────┘
 process 1          process 2          process 3
```
- How to build it in C: Lab Part B (2 stages), C2 (3 stages), C4 (any length).

### [S07-p10] Questions?
- Closing slide. No content.

---

## Lab 1 — Pipes, dup2 and FIFOs (try-at-home)

### Lab task map: what each task drills

| Task (lab ★) | Pages | What you do | Slide content it drills | Verified result (my Mac) |
|---|---|---|---|---|
| A1 Hello, pipe ★ | p1–2 | Child writes a string, parent reads it | S06-p11 example "cleaned up"; S06-p5 fd numbers | fds 3/4; `parent read 22 bytes` |
| A2 Break the Sacred Rule of Closing ★ | p2–3 | Comment out the parent's `close(p[1])` | S06-p9/p10 Sacred Rule; EOF (S06-p6, p11); read loop (S07-p7) | step 1: 3 messages + EOF; step 2: **hangs forever** |
| A3 How big is a pipe? ★ | p3–4 | One process writes 1 byte at a time, never reads | S06-p8 capacity; S06-p11 "write blocks when full" | last line **65536**, then stuck in `write` |
| A4 / A4b SIGPIPE ★★ | p4–5 | Write after closing the read end; then catch SIGPIPE | S06-p11 SIGPIPE; Week 1 `sigaction` | a4: `$?` = **141**; a4b: `write returned -1`, `Broken pipe` |
| A5 The line that prints twice ★★ | p5–6 | `printf` before `fork`, output to terminal vs pipe | S06-p6 buffer vs kernel | once on terminal, **twice** through `\| cat` |
| A6 Two directions = two pipes ★ | p6 | Question/answer over two pipes; then read first | S06-p12; S06-p9 "deadlock" | ⚠️ printed code doesn't compile (`}.`); fixed works; read-first **deadlocks** |
| A7 The child becomes ls ★★ | p7 | dup2 → close → exec; parent counts what ls wrote | S06-p17 | same as `ls -l / \| wc -lc`; `lss` → 0/0 + perror on screen |
| A8 FIFOs, two terminals ★ | p8–9 | Shell FIFO; writer/reader started in 4 orders | S07-p4 to p7 | all four orders as predicted |
| B1 `ls -l \| wc -l` in C | p9–11 | Two children + a shell-like parent; delete each close | S06-p13 to p17; S07-p9 | same number as the shell; deleting #4 or #6 **hangs** |
| B2 / B3 the shell's `>` and `<` | p11–12 | `open` + `dup2` onto fd 1 / fd 0 + exec | S06-p15 dup2; S06-p17 exec | same as the shell |
| C1 Feed a sorter ★★ | p13 | Parent writes, child becomes `sort -n` | mirror image of A7 | sorted output; close after `waitpid` → **hang** |
| C2 Three stages ★★ | p13 | `cat \| grep \| wc` with 2 pipes and 3 children | S07-p9 | matches shell; 5 of the 16 closes hang if forgotten |
| C3 Capture any command ★★ | p14 | `execvp(argv[1], &argv[1])` + count bytes/lines | A7 generalised | matches shell; `nosuchprogram` → 0/0, no hang |
| C4 A pipeline of any length ★★★ | p14 | `prev_read` loop over stages separated by `+` | S07-p9 | matches shell |
| C5 FIFO log server ★★ | p15 | Many writers → one reader; reopen on EOF; Ctrl+C cleanup | S07-p5 to p7; Week 1 `sigaction` | reproduces the lab's transcript |
| C6 Boss level ★★★★ | p15–16 | Talk to `tr` over two pipes | A5 buffering, A3 capacity, Sacred Rule | step 1 hang · 2 ok · 3 hang · 4 ok (800000 bytes) |
| D1–D9 Pen and paper | p16–18 | Tables, traces, true/false | everything above | answers below; D2–D7 verified |

### [Lab1-p1] Cover, rules, A1 (start)
- Header: WEEK 3 · Operating Systems · Inha University in Tashkent. "**Lab 1 — Pipes, dup2 and FIFOs**", subtitled "Try-at-home lab. Run it, break it, fix it, then build your own pipeline in C." (Fall 2026)
  - COVERS: Slide 6 (*Pipes and dup2*) and Slide 7 (*FIFO and Pipeline*).
  - STATUS: self-study practice, nothing to submit, and "**The midterm doesn't assume you did it.**"
  - YOU NEED: your Ubuntu VM, a terminal and `gcc`; some tasks need **two terminal windows** side by side.
- Box "Use only what the lectures gave you":
  - Everything uses only `pipe`, `fork`, `close`, `read`, `write`, `dup2`, `execlp`, `wait`/`waitpid`, `sigaction`, `mkfifo`, `open` and `perror`. Any extra names are explained in grey boxes where they first appear.
  - **Compile** every program with `gcc -Wall -o name name.c` and run it with `./name`. `-Wall` turns on all the warnings: "read them, they are usually right."
- **Part A — Try this at home.** For every program: type or paste it, compile, run, look at the output, then answer the blue QUESTION box. "Do not skip the 'break it' steps — they are the point."
- **A1. Hello, pipe ★**: "the parent/child program from the lecture, cleaned up" [S06-p11]. The child writes, the parent reads. Full code (continues on p2):
```c
/* a1_hello_pipe.c — the parent/child pipe from the lecture */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main(void)
{
    int p[2];
    char buf[80] = "Hello from your child";
    char buf2[80];
    if (pipe(p) == -1) { perror("pipe"); exit(EXIT_FAILURE); }
    pid_t pid = fork();
    if (pid == 0) {                         /* child: the writer */
        close(p[0]);                        /* close the unused read end */
        write(p[1], buf, strlen(buf) + 1);  /* +1 sends the '\0' too */
        close(p[1]);
        exit(0);
    }
    /* parent: the reader */
    printf("parent: read end = fd %d, write end = fd %d\n", p[0], p[1]);
    close(p[1]);                            /* close the unused write end */
    ssize_t n = read(p[0], buf2, sizeof(buf2)); //int is often “okay” too instead of ssize_t
    printf("parent read %zd bytes: \"%s\"\n", n, buf2);
    close(p[0]);
    wait(NULL);
    return 0;
}
```

### [Lab1-p2] A1 (end), A2 (start)
- Grey box:
  - `%zd` is the `printf` format for an `ssize_t` (the "signed size" type that `read` and `write` return).
  - `wait(NULL)`: the parent reaps the child, exactly as in Week 1.
- Run: `$ gcc -Wall -o a1 a1_hello_pipe.c` then `$ ./a1`.
- What changed from S06-p11:
  - an error check on `pipe`;
  - the child closes `p[1]` after writing;
  - the parent prints the fd numbers, closes `p[0]` and reaps the child with `wait(NULL)`.
- Verified output (21 characters + `'\0'` = 22 bytes):
```
parent: read end = fd 3, write end = fd 4
parent read 22 bytes: "Hello from your child"
```
- **A2. Break the Sacred Rule of Closing ★**: the child sends **three** messages, one per second, and the parent reads **in a loop until EOF** (the loop from `reader.c` on Slide 7). Full code (continues on p3):
```c
/* a2_forgot_close.c — the child sends three messages; the parent reads until EOF */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
    int p[2];
    pipe(p);

    if (fork() == 0) {                       /* child: writer */
        close(p[0]);
        char *msgs[3] = { "one\n", "two\n", "three\n" };
        for (int i = 0; i < 3; i++) {
            write(p[1], msgs[i], strlen(msgs[i]));
            sleep(1);
        }
        close(p[1]);
        exit(0);
    }
    /* parent: reader */
    close(p[1]);          /* <-- STEP 2: put // in front of this line and run again */

    char buf[64];
    ssize_t n;
    while ((n = read(p[0], buf, sizeof buf - 1)) > 0) {
        buf[n] = '\0';                   /* make it a C string */
        printf("parent got %zd bytes: %s", n, buf);
    }
    printf("parent: read returned %zd -> EOF, done\n", n);
    wait(NULL);
    return 0;
}
```

### [Lab1-p3] A2 (end), A3 (start)
- Grey box:
  - `sleep(1)` pauses the calling process for one second.
  - `buf[n] = '\0'`: `read` gives you bytes, not a C string. We add the terminating zero ourselves so `printf("%s")` knows where to stop, and we read at most `sizeof buf - 1` bytes so there is room for it.
- **Step 1.** Compile and run: you should see three messages and then the EOF line.
- **Step 2.** Put `//` in front of the line marked `STEP 2` (the parent's `close(p[1])`), compile, run again, wait 10 seconds, then press Ctrl+C.
- QUESTION: In step 2 the child has finished and exited. So who is still holding a write end of the pipe? Why does the kernel refuse to give the parent EOF? Why is there no error message (nothing crashes, nothing is logged)?
- ✅ **Answer (verified):**
  - The **parent itself** still holds a write end: its own copy of `p[1]` (fd 4), inherited at creation and never closed.
  - The kernel declares EOF only when **every** write end is closed, and the reader's own write end counts [S06-p9].
  - Nothing is wrong from the kernel's point of view: a reader waiting on a pipe that still has a writer is perfectly legal. So the parent simply sleeps inside `read()`: "Nothing crashes. Nothing logs." [S06-p9].
  - My runs: step 1 printed one/two/three at 0.3/1.3/2.3 s and `parent: read returned 0 -> EOF, done` at 3.3 s. Step 2 printed the same three lines and then stayed silent until I killed it at 10 s.
- Meme (imgflip): a man waiting alone, captioned "READO WAITING FOR EOF" / "WHILE IT HOLDS THE WRITE END ITSELF". ⚠️ "READO" presumably means "READ()".
- **A3. How big is a pipe? ★**: one process, no `fork`. It creates a pipe and writes into it one byte at a time, and **nobody ever reads**. Full code (continues on p4):
```c
/* a3_capacity.c — fill a pipe that nobody reads and see where write() stops */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(void)
{
    int p[2];
    pipe(p);
    /* We keep BOTH ends open and never read. One process, no fork. */
    char c = 'x';
    long total = 0;
    while (1) {
        write(p[1], &c, 1);
        total++;
        if (total % 4096 == 0)
            fprintf(stderr, "written so far: %ld bytes\n", total);
    }
    return 0;  /* never reached */
}
```

### [Lab1-p4] A3 (end), A4 (start)
- Grey box: `fprintf(stderr, …)` is `printf` aimed at standard error (fd 2). It is used here because **stderr is not buffered**: each line appears the moment it is printed, even if the program then gets stuck.
- Run `$ ./a3`, watch the numbers, then press Ctrl+C.
- QUESTION: What is the last number printed? Compare it with the number on the slide *pipe(int fd[2]): One Call, Two Ends*. The program has not crashed and has not exited, so where exactly is it, and what is it waiting for? Could anything ever wake it up?
- ✅ **Answer (verified):**
  - The last line is `written so far: 65536 bytes`. That equals the 64 KiB pipe capacity on [S06-p8] (my Mac gave the same number).
  - The program is asleep **inside `write()`**: a write into a full pipe blocks until a reader drains some data [S06-p11].
  - Nothing can ever wake it. The only process holding the read end is the program itself, and it is stuck in `write`: a one-process deadlock. Only a signal (Ctrl+C) ends it.
- **A4. SIGPIPE — writing to nobody ★★**: the read end is closed *before* the write, so nobody can ever read these bytes.
```c
/* a4_sigpipe.c — write into a pipe whose read end is already closed */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(void)
{
    int p[2];
    pipe(p);
    close(p[0]);                       /* nobody can ever read now */

    write(STDOUT_FILENO, "about to write...\n", 18);
    write(p[1], "hi", 2);              /* the kernel sends SIGPIPE here */
    write(STDOUT_FILENO, "write finished\n", 15);   /* do we ever see this? */
    return 0;
}
```
- Run `$ ./a4` then `$ echo $?`.
- Grey box "**Exit status 128 + N.**" When a process is **killed by a signal**, the shell reports its exit status as 128 plus the signal's number. Run `kill -l` to see the numbers: `SIGPIPE` is signal 13. The box asks: "Why it doesn't return 0?"
  - ✅ Because the process never reaches `return 0`: SIGPIPE kills it during the second `write`, so the shell reports 128 + 13 = **141** (verified; `kill -l` lists PIPE as number 13).
- "Now catch the signal with `sigaction` — the Week 1 way:" a4b starts here (code on p5).

### [Lab1-p5] A4b, A5 (start)
```c
#include <stdio.h> /* a4b_sigpipe_handler.c — same, but we catch SIGPIPE with sigaction (Week 1) */
#include <stdlib.h>
#include <string.h>
#include <signal.h>
#include <unistd.h>

void on_pipe(int sig)
{
    char msg[] = "handler: caught SIGPIPE, nobody is reading!\n";
    write(STDERR_FILENO, msg, strlen(msg));
}

int main(void)
{
    struct sigaction sa = {0}; // just easier way to start
    sa.sa_handler = on_pipe;
    sigaction(SIGPIPE, &sa, NULL);

    int p[2];
    pipe(p);
    close(p[0]);

    ssize_t n = write(p[1], "hi", 2);
    printf("write returned %zd\n", n);
    if (n == -1) perror("write");
    return 0;
}
```
- Grey box "`errno = EPIPE`": if `SIGPIPE` does not kill the process, `write` returns `-1` and sets `errno` to `EPIPE`. `perror` turns that into the words *Broken pipe*.
- QUESTION: In a4, which line is the last one you see, and what does `echo $?` print? In a4b the program survives: what does `write` return? You are writing a web server whose client just closed the browser tab. Do you want the default `SIGPIPE` behaviour or the handler? Why?
- ✅ **Answer (verified):**
  - **a4:** the last line you see is `about to write...`. `write finished` never appears, and `echo $?` prints **141**.
  - **a4b:** the handler prints `handler: caught SIGPIPE, nobody is reading!` (on stderr), then `write returned -1`, then `perror` prints `write: Broken pipe`. Exit status 0.
  - **Web server:** you want **the handler**. With the default action, one client closing its tab would kill the whole server process. With the handler, `write` just returns -1/EPIPE, so the server can drop that one client and keep serving the others.
- **A5. The line that prints twice ★★**: "Remember from Slides: *printf is buffered; write goes to the kernel.* Here is where that bites."
```c
/* a5_printf_twice.c — printf's buffer is copied by fork() */
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
    printf("before fork\n");      /* goes into printf's buffer ... or does it? */
    pid_t pid = fork();
    if (pid == 0) {
        printf("I am the child\n");
        return 0;
    }
    wait(NULL);
    printf("I am the parent\n");
    return 0;
}
```

### [Lab1-p6] A5 (end), A6
- Run `$ ./a5` (output to the terminal) and `$ ./a5 | cat` (output into a pipe).
- Grey box "**How printf decides when to flush.**"
  - When stdout is a **terminal**, printf sends its buffer to the kernel at every `'\n'` (**line buffered**).
  - When stdout is a **pipe or a file**, it waits until the buffer (several KB) is full or the program exits (**fully buffered**). ⭐
- QUESTION: How many times does `before fork` appear in each run? Explain the second run using the words *buffer*, *fork copies* and *exit*. How would you fix the program so it prints once in both cases? (Two fixes are possible with what you know.)
- ✅ **Answer (verified):**
  - **Once** on the terminal, **twice** through `| cat` (`before fork`, `I am the child`, `before fork`, `I am the parent`).
  - Why: with stdout a pipe, `"before fork\n"` is still sitting in printf's **buffer** (user-space memory) when `fork` runs. **fork copies** the whole process, buffer included. At **exit**, child and parent each flush their own copy, so the line is printed twice. On a terminal the buffer was already flushed at the `'\n'`, so nothing was left to copy.
  - Fix 1: `write(1, "before fork\n", 12);` instead of `printf`. `write` talks to the kernel immediately, so nothing is left in a buffer [S06-p6]. Verified: prints once.
  - Fix 2: `fprintf(stderr, "before fork\n");`. stderr is not buffered [A3 grey box]. Verified: prints once, though it now goes to the screen on fd 2 instead of through the pipe.
  - Also works (verified): `fflush(stdout);` right after the `printf`. 🔎 Look up in Track B: `fflush`. The slides only say "until a flush is triggered".
- **A6. Two directions = two pipes ★**: the parent asks a question on one pipe and the child answers on the other.
```c
/* a6_two_pipes.c — two directions need two pipes */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    int down[2];   /* parent -> child */
    int up[2];     /* child  -> parent */    pipe(down);       pipe(up);

    if (fork() == 0) {                          /* child */
        close(down[1]);                         /* child only reads "down" */
        close(up[0]);                           /* child only writes "up"  */
        char q[64];
        ssize_t n = read(down[0], q, sizeof q - 1);
        q[n] = '\0';
        printf("child : got question \"%s\"\n", q);
        char *a = "42";
        write(up[1], a, strlen(a));
        close(down[0]);
        close(up[1]);
        exit(0);
    }. /* parent */
    close(down[0]);         close(up[1]);
    char *q = "meaning of life?";
    write(down[1], q, strlen(q));
    char a[64];
    ssize_t n = read(up[0], a, sizeof a - 1);
    a[n] = '\0';
    printf("parent: got answer   \"%s\"\n", a);
    close(down[1]);
    close(up[0]);
    wait(NULL);
    return 0;
}
```
- ⚠️ **Bug in the printed code:** `}. /* parent */` has a stray period. Verified: `gcc`/`cc` stops with "error: expected expression", so remove the `.`. With it fixed, the output is `child : got question "meaning of life?"` then `parent: got answer   "42"`.
- QUESTION: Change the **parent** so that it `read`s from `up[0]` *before* it writes the question. Run it. What happens, and why? Then give it a name: it is the word from the *fork* slide.
- ✅ **Answer (verified):** the program **hangs**.
  - The parent sleeps in `read(up[0])` waiting for the answer, while the child sleeps in `read(down[0])` waiting for the question.
  - Each waits for the other to write first, so nobody ever writes.
  - Name: **deadlock** [S06-p9].

### [Lab1-p7] A7. The child becomes ls — and never knows ★★
- "The dup2 → close → exec pattern from the slide *exec Keeps the Descriptors*, now with the parent on the other end, counting what `ls` wrote."
```c
/* a7_ls_to_parent.c — the child becomes ls, the parent reads what ls printed */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
    int p[2];
    pipe(p);

    if (fork() == 0) {                 /* child: will become ls */
        dup2(p[1], 1);                 /* 1. stdout now goes into the pipe */
        close(p[0]);                   /* 2. close both original ends      */
        close(p[1]);
        execlp("ls", "ls", "-l", "/", NULL);   /* 3. become ls */
        perror("execlp");              /* only reached if exec failed */
        exit(1);
    }

    /* parent: reads everything ls wrote, counts bytes and lines */
    close(p[1]);
    char buf[256];
    ssize_t n;
    long bytes = 0, lines = 0;
    while ((n = read(p[0], buf, sizeof buf)) > 0) {
        bytes += n;
        for (int i = 0; i < n; i++)
            if (buf[i] == '\n') lines++;
    }
    close(p[0]);
    wait(NULL);
    printf("ls wrote %ld bytes in %ld lines, and never knew it was talking to a pipe\n",
           bytes, lines);
    return 0;
}
```
- Run `$ ./a7` and compare with `$ ls -l / | wc -lc` ("the shell's answer"). Grey box: `wc -lc` counts **l**ines and **c**haracters (bytes) of its input.
- QUESTION: Do your numbers match the shell's? Now change `"ls"` in `execlp` to `"lss"` (a program that does not exist). What does the parent report, and where does the `perror` message appear: in the pipe or on your screen? Why?
- ✅ **Answer (verified):**
  - **They match.** My Mac: `ls wrote 963 bytes in 18 lines…` and `ls -l / | wc -lc` → `18 963`. Your Ubuntu numbers will differ, but the two must agree.
  - With `"lss"` the parent reports `ls wrote 0 bytes in 0 lines…`, and `execlp: No such file or directory` appears **on the screen**, not in the pipe.
  - Why: the child only rewired **fd 1**. `perror` writes to **stderr (fd 2)** [S07-p6 callout], which is still the terminal.
  - It does not hang: the failed child runs `exit(1)`, which closes its last write end (fd 1), and the parent gets EOF.

### [Lab1-p8] A8. FIFOs — two terminals, two strangers ★
- **Step 1 — pure shell, no C.** Open two terminals:
```
# terminal 1                          # terminal 2
$ mkfifo /tmp/myfifo
$ ls -l /tmp/myfifo
$ cat /tmp/myfifo                     $ echo "hello from bash" > /tmp/myfifo
```
- Grey box: `> file` in the shell sends a command's standard output into `file` instead of the screen. (Part B shows how the shell does this with `open` + `dup2`.)
- Verified: `ls -l` shows `prw-r--r-- … 0 … /tmp/myfifo`. `cat` waits (blocked in its `open` for reading) until `echo` opens the FIFO for writing, then prints `hello from bash` and finishes.
- **Step 2 — the programs from Slide 7.** `writer.c` is printed again, identical to [S07-p6] except for the comment (`/* <- blocks here */`) and the header comment "(from Slide 7)".

### [Lab1-p9] A8 (end), Part B intro
- `reader.c` is printed again, identical to [S07-p7] except that the comment is cleaned up to `/* n == 0 -> all writers closed (EOF) */` and the `//unlink(PATH)` line is dropped.
- "Try these orders, and write down what you see in each terminal":
  1. Start `./writer` first, wait 5 s, then start `./reader`.
  2. Start `./reader` first, wait 5 s, then `./writer`.
  3. Run `rm /tmp/demo_fifo`, then start `./reader` first. Why is this different from order 2?
  4. Start `./reader`, then in the other terminal: `echo one > /tmp/demo_fifo`. Does the reader stop after the first message?
- ✅ **Answers (verified, timelines in §5.9):**
  1. The writer prints `writer: waiting for a reader (open blocks)...` and **blocks in `open(O_WRONLY)`**. When the reader starts, both opens return together: `reader: writer arrived` / `writer: reader arrived, sending` / `hello over FIFO` / `reader: EOF, done`.
  2. The reader **blocks in `open(O_RDONLY)`** until the writer starts, then the same lines appear.
  3. The reader prints `open: No such file or directory` at once and exits. The name is gone, and **reader.c never calls `mkfifo`** (only writer.c does). In order 2 the FIFO already existed, so `open` could block and wait. (CRUCIAL POINT [S07-p5]: `mkfifo` creates the name, and `open` needs that name to exist.)
  4. **Yes, it stops:** `reader: writer arrived` / `one` / `reader: EOF, done`. When the shell running `echo` closes its end, no writers remain, so `read` returns 0. (Lab C5 fixes this for a server.)
- QUESTION: Which call does each program block in, and what exactly unblocks it? Check your answer against the `open()` table on the slides. What does `ls -l` show as the size of the FIFO while data is flowing?
- ✅ **Answer:**
  - The writer blocks in `open(…, O_WRONLY)` until some process opens the FIFO for reading.
  - The reader blocks in `open(…, O_RDONLY)` until some process opens it for writing, and afterwards in `read()` until data arrives or every writer has closed (EOF) [S07-p5, p7].
  - The size is **0**: no data is ever stored on disk [S07-p4]. Verified: the size stayed 0 with unread bytes inside.
- **Part B — The missing half: `ls -l | wc -l` in C.** In the lecture we built only the **writer** side of a pipeline (a child that rewires stdout and becomes `ls`). A real pipeline also needs the **reader** side (a second child that rewires its **stdin** and becomes `wc`) and a parent that behaves like the shell.
- Recipe (highlighted) ⭐⭐: "**one pipe · two forks · each child dup2s its end and closes both originals · the parent closes both ends · two waitpids.**"

### [Lab1-p10] B1 — `ls -l | wc -l` written by hand ⭐⭐⭐
```c
/* b1_ls_wc.c — the shell's  ls -l | wc -l  written by hand */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main(void)
{
    int p[2];
    if (pipe(p) == -1) { perror("pipe"); exit(EXIT_FAILURE); }

    /* ---------- child 1: the WRITER side, becomes ls -l ---------- */
    pid_t left = fork();
    if (left == 0) {
        dup2(p[1], 1);            /* stdout (1) -> write end of the pipe */
        close(p[0]);              /* close #1: ls never reads the pipe   */
        close(p[1]);              /* close #2: fd 1 already points there */
        execlp("ls", "ls", "-l", NULL);
        perror("execlp ls");      /* only reached if exec failed */
        exit(1);
    }

    /* ---------- child 2: the READER side, becomes wc -l ---------- */
    pid_t right = fork();
    if (right == 0) {
        dup2(p[0], 0);            /* stdin (0) -> read end of the pipe   */
        close(p[0]);              /* close #3: fd 0 already points there */
        close(p[1]);              /* close #4: THE important one — if wc
                                     holds a write end, wc never sees EOF */
        execlp("wc", "wc", "-l", NULL);
        perror("execlp wc");
        exit(1);
    }

    /* ---------- parent: the shell. It uses NEITHER end. ---------- */
    close(p[0]);                  /* close #5 */
    close(p[1]);                  /* close #6: without it, wc waits forever */

    waitpid(left, NULL, 0);       /* reap both children — no zombies */
    waitpid(right, NULL, 0);
    printf("parent: both children finished\n");
    return 0;
}
```
- Run `$ ./b1` and `$ ls -l | wc -l` ("must print the same number"). Verified: both printed the same count (51 in my test folder), followed by `parent: both children finished`.
- "What happens to the descriptor tables": read the table on p11 one row at a time. `tty` = your terminal; `R`/`W` = the read/write ends of the pipe; a dash = closed.

### [Lab1-p11] The descriptor-table walkthrough, "Break it on purpose", B2 (start)
- The lab's own fd table ⭐⭐⭐ (fd 2 = tty throughout; bold = changed by `dup2`):

| Moment | fd 0 | fd 1 | fd 3 | fd 4 |
|---|---|---|---|---|
| Parent, right after `pipe(p)` | tty | tty | R | W |
| Both children, right after `fork` (exact copies) | tty | tty | R | W |
| Child 1 after `dup2(p[1],1)` | tty | **W** | R | W |
| Child 1 after its two closes → becomes `ls` | tty | **W** | – | – |
| Child 2 after `dup2(p[0],0)` | **R** | tty | R | W |
| Child 2 after its two closes → becomes `wc` | **R** | tty | – | – |
| Parent after its two closes | tty | tty | – | – |

- "Now count the **write ends** left in the whole system": exactly one, `ls`'s fd 1. When `ls` finishes and exits, that last write end closes and `wc`'s next `read` returns 0. That is how `wc` knows it may print its answer. ⭐
- "**Break it on purpose**": for each of the six `close` calls (#1–#6), first predict what happens if you delete only that line, then test it. The lab's table has empty columns for "Your prediction (works / hangs)" and "What really happened". Filled in from my runs (each variant had 3 s to finish):

| Delete only… | What really happened (verified) | Why |
|---|---|---|
| close #1 — `ls` child's read end | works | read ends never affect EOF |
| close #2 — `ls` child's original write end | works | `ls` holds two write ends, but both close when `ls` exits |
| close #3 — `wc` child's original read end | works | read end |
| close #4 — `wc` child's write end | **HANGS** | `wc` holds a write end itself, so its `read` never returns 0; the parent waits in `waitpid(right)` forever |
| close #5 — parent's read end | works | read end |
| close #6 — parent's write end | **HANGS** | the parent holds a write end while it waits in `waitpid` for `wc`; `wc` waits for an EOF that needs the parent's close → circular wait |

- QUESTION: Some deletions hang and some do not. Find the **one rule** that tells them apart. (Hint: which of the three processes is the one waiting for EOF, and which ends does EOF depend on?)
- ✅ **Answer:** `wc` is the only process waiting for EOF, and EOF depends **only on write ends** [S06-p9]. A missing close hangs the program **exactly when it leaves a write end open in a process that stays alive while `wc` waits**: `wc` itself (#4) or the parent, which is waiting for `wc` (#6). Missing read-end closes (#1, #3, #5) never matter. `ls`'s extra write end (#2) disappears when `ls` exits.
- **B2. The shell's `>` and `<` are the same trick.** You have used `echo … > /tmp/myfifo`. For `>`, the shell opens the file and `dup2`s it onto fd 1, then execs the command. The lab adds: "I will also teach this in class in detail". ⭐ So expect it in class and possibly on the exam.

### [Lab1-p12] B2 and B3 code, the shell-redirection table
```c
/* b2_redirect_out.c — the shell's  ls -l > listing.txt  written by hand */
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
    pid_t pid = fork();
    if (pid == 0) {
        int fd = open("listing.txt",O_WRONLY|O_CREAT|O_TRUNC, 0644); // you don’t have to memorize this
        if (fd == -1) { perror("open"); exit(1); }
        dup2(fd, 1);              /* stdout -> the file */
        close(fd);                /* fd 1 is enough */
        execlp("ls", "ls", "-l", NULL);
        perror("execlp");
        exit(1);
    }
    wait(NULL);
    printf("parent: done — now run  cat listing.txt\n");
    return 0;
}
```
- Grey box: `O_WRONLY | O_CREAT | O_TRUNC, 0644` means open for writing, **create** the file if it does not exist, and **truncate** (empty) it if it does. The `|` is C's bitwise OR, which combines flags. `0644` is the permission of a newly created file: the owner may read and write, everyone else may only read.
- "And `<` is the same idea on fd 0":
```c
/* b3_redirect_in.c — the shell's  wc -l < /etc/passwd  written by hand */
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
    pid_t pid = fork();
    if (pid == 0) {
        int fd = open("/etc/passwd", O_RDONLY);
        if (fd == -1) { perror("open"); exit(1); }
        dup2(fd, 0);              /* stdin <- the file */
        close(fd);
        execlp("wc", "wc", "-l", NULL);
        perror("execlp");
        exit(1);
    }
    wait(NULL);
    return 0;
}
```
- The summary table ⭐⭐⭐ (memorise it):

| You type in the shell | What the shell does in the child before `exec` |
|---|---|
| `cmd > file` | `fd = open(file, O_WRONLY\|O_CREAT\|O_TRUNC, 0644); dup2(fd, 1); close(fd);` |
| `cmd < file` | `fd = open(file, O_RDONLY); dup2(fd, 0); close(fd);` |
| `a \| b` | `pipe(p)`; in `a`: `dup2(p[1], 1)`; in `b`: `dup2(p[0], 0)`; everyone closes both originals |

- Verified:
  - B2 wrote the `ls -l` listing into `listing.txt` with permissions `-rw-r--r--` (0644). `listing.txt` lists *itself* with size 0, because the file is created before `ls` runs; the shell's own `ls -l > listing2.txt` behaves the same way.
  - B3 printed 142, the same as `wc -l < /etc/passwd` (my Mac).

### [Lab1-p13] Part C — Your turn: C1, C2
- "No code given now — only the goal, the expected output, and hints." Every task can be solved with Parts A and B; test each program against the real shell command. (My verified solution sketches are in §5.12–§5.13.)
- **C1. Feed a sorter ★★**: write `c1.c`.
  - The **parent** writes five lines into a pipe: `42`, `7`, `1000`, `-3`, `15`. The **child** becomes `sort -n` with its stdin coming from the pipe.
  - This time the parent is the writer and the exec'd child is the reader: "the mirror image of A7".
  - Grey box: `sort -n` reads all lines from stdin, then prints them sorted as **n**umbers. It cannot print anything until it has seen EOF, because it has to know it has the last line.
  - Expected output: `-3`, `7`, `15`, `42`, `1000` (one per line).
- QUESTION: Which `close` in the **parent** is the one that makes `sort` start printing? What happens if you put it after `waitpid` instead of before?
- ✅ **Answer (verified):**
  - The parent's `close(p[1])` right after it writes the five lines. It is the last write end, so `sort`'s `read` returns 0 and `sort` can print. The child must also have closed its own copy of `p[1]` before exec.
  - After `waitpid` instead: **deadlock**. The parent waits for `sort` to exit, `sort` waits for EOF, and EOF needs the parent's close.
- **C2. Three stages ★★**: write `c2.c` that does exactly what `$ cat /etc/passwd | grep sh | wc -l` does.
  - Grey box: `grep sh` keeps only the lines that contain `sh`. `/etc/passwd` is the list of user accounts; each line ends with the user's login shell.
  - "You need **two pipes** and **three children**." The middle child (`grep`) uses **both**: stdin from the first pipe, stdout into the second.
  - "Create both pipes before the first `fork`." Then every child inherits **four** pipe descriptors and must close all four after its `dup2`s.
  - "The parent closes all four and waits for all three children."
- QUESTION: Count the `close` calls in your program. Which ones, if forgotten, would make it hang? Which process would be stuck?
- ✅ **Answer (verified by deleting each close in turn):**
  - **16** closes: 4 in each of the 3 children, plus 4 in the parent.
  - Exactly **5** of them hang if forgotten:
    - the **write end of pipe a** kept by `grep`, by `wc`, or by the parent. `grep` never sees EOF and is stuck in `read`; `wc` is then stuck reading pipe b; the parent is stuck in `waitpid`.
    - the **write end of pipe b** kept by `wc` or by the parent. `wc` is stuck in `read` and the parent in `waitpid`.
  - The other 11 are harmless: read ends, or write ends held by `cat` and `grep`, which exit on their own and so close them.

### [Lab1-p14] C3, C4
- **C3. Capture any command ★★**: write `capture.c`. It runs whatever command you give it on the command line, catches everything that command prints, and reports:
```
$ ./capture ls -l /
[capture] 'ls' printed 20 lines, 941 bytes
$ ./capture echo hello world
[capture] 'echo' printed 1 lines, 12 bytes
```
- Grey box:
  - `execvp(file, argv)` is `execlp` with the arguments in an **array** instead of a list, useful when you don't know at compile time how many there are. The array must end with `NULL`.
  - Your own `argv` already ends with `NULL`, so `execvp(argv[1], &argv[1])` runs "everything after the program name".
  - `argc` is how many words were typed, including `./capture` itself.
- QUESTION: What should your program print for `./capture nosuchprogram`? Make sure it does not hang.
- ✅ **Answer (verified with my sketch):** the `perror` text (`execvp: No such file or directory`) on the screen, then `[capture] 'nosuchprogram' printed 0 lines, 0 bytes`.
  - It doesn't hang because the parent closes its own write end before its read loop, and the child `exit`s after the failed exec, which closes the child's copy.
  - My Mac's `ls -l /` gave 18 lines / 963 bytes, equal to the shell's `wc -lc`. The lab's 20/941 is its Ubuntu VM.
- **C4. A pipeline of any length ★★★**: write `pipeline.c`, using `+` on the command line where the shell would use `|`:
```
$ ./pipeline ls -l /usr/bin + grep zip + wc -l
$ ls -l /usr/bin | grep zip | wc -l        # same number
$ ./pipeline cat /etc/passwd + grep sh + sort + head -2
$ ./pipeline echo just one stage
```
- Grey box: `strcmp(a, b)` (from `<string.h>`) returns 0 when two strings are equal. `head -2` prints only the first 2 lines of its input.
- Hints ("read only when stuck"):
  1. Walk through `argv`. Every time you meet `"+"`, replace it with `NULL` and remember that the next word starts a new stage. Each stage is then a ready-made, `NULL`-terminated array for `execvp`, with no copying needed.
  2. Do **not** create all the pipes first. Use one loop over the stages and keep a variable `prev_read`: the read end of the pipe made in the previous turn (`-1` for the first stage).
  3. Child for stage *s*: if `prev_read != -1`, dup2 it to 0. If it is not the last stage, dup2 the new pipe's write end to 1. Close everything you dup2'd from.
  4. The parent, after each `fork`, closes `prev_read` and the new write end, and keeps the new read end as the next `prev_read`. Store every pid and wait for all of them at the end.
- QUESTION: With this design, how many pipe descriptors does the parent hold open at any moment, no matter how long the pipeline is? Why does that matter for a pipeline of 1000 stages?
- ✅ **Answer:**
  - At most **3** (`prev_read` plus the two ends of the newly made pipe, just around the fork), and just **1** (the next `prev_read`) after its closes. That is a constant, whatever the length.
  - If all pipes were created first, 1000 stages would need 999 pipes = 1998 descriptors in the parent. Every child would inherit all of them and would have to close every one, and a single forgotten write end means a hang (Sacred Rule).
  - 🔎 Look up in Track B: the per-process limit on open descriptors.
  - Verified with my sketch: all three test lines match the shell (19 = 19 for the `zip` count on my Mac).

### [Lab1-p15] C5, C6 (start)
- **C5. A FIFO log server for many strangers ★★**: write `logger.c`, a server that creates `/tmp/soc3010_log` and prints every line any process writes into it, labelled with a client number. The clients are plain shell commands in other terminals:
```
# terminal 2                                   # terminal 1 (logger)
$ echo "disk almost full" > /tmp/soc3010_log     [client 1] disk almost full
                                                  logger: client 1 left
$ echo "backup done" > /tmp/soc3010_log          [client 2] backup done
                                                  logger: client 2 left
```
  1. Start from `reader.c` (Slide 7). Run it with `FIFO_PATH` changed and one `echo`. It stops after the first client. **Why?**
  2. Fix it so the server keeps serving client after client. (What should happen when `read` returns 0?)
  3. When you stop the server with Ctrl+C, the FIFO stays in `/tmp`. Install a `SIGINT` handler with `sigaction` that removes it and exits.
- Grey box: `unlink(path)` (from `<unistd.h>`) removes a name from the filesystem, which is what `rm` does; it was the comment at the end of `reader.c`. `_exit(0)` ends the process immediately; it is the version that is safe to call inside a signal handler.
- Note on the page: "This is many writers → one reader. Your FIFO homework is two programs taking turns — a different problem."
- ✅ **Answers (verified, §5.13):**
  1. When the `echo`'s shell closes its end, the FIFO has no writer left, so `read` returns 0 (EOF) and the loop ends.
  2. Treat `read` returning 0 as "this client left": print `logger: client N left`, `close` the fd, then `open` the FIFO again. That `open` blocks until the next client arrives. Count the clients.
  3. `sigaction(SIGINT, …)` with a handler that calls `unlink(FIFO_PATH); _exit(0);`.
- **C6. Boss level: a conversation with another program ★★★★**: your program sends text to `tr a-z A-Z` and reads the upper-cased text **back**. `tr` reads stdin and writes stdout, so you need **two pipes**: one into its stdin, one out of its stdout.
  - Grey box: `tr a-z A-Z` **tr**anslates characters; every lowercase letter it reads is written back in uppercase. Try `echo hello | tr a-z A-Z`.
  - **Step 1.** "Here is the obvious design. Run it. It hangs. Explain exactly why — *which process is blocked in which call*. (Hint: A5.)"
```c
/* c6_naive.c — the obvious design, which hangs */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
    int to_tr[2], from_tr[2];
    pipe(to_tr);
    pipe(from_tr);

    if (fork() == 0) {
        dup2(to_tr[0], 0);
        dup2(from_tr[1], 1);
        close(to_tr[0]); close(to_tr[1]);
        close(from_tr[0]); close(from_tr[1]);
        execlp("tr", "tr", "a-z", "A-Z", NULL);
        perror("execlp"); exit(1);
    }
    close(to_tr[0]);
    close(from_tr[1]);

    char *line = "hello\n";
    write(to_tr[1], line, strlen(line));     /* send one line ...             */
    char buf[64];
    ssize_t n = read(from_tr[0], buf, sizeof buf - 1);   /* ... wait for the answer */
    buf[n] = '\0';
    printf("answer: %s", buf);
    close(to_tr[1]);
    close(from_tr[0]);
    wait(NULL);
    return 0;
}
```

### [Lab1-p16] C6 (end), Part D intro, D1
- The rest of `c6_naive.c` is shown above.
- **Step 2.** Fix it for one short line, still with one child.
- **Step 3.** Now send the line **20 000 times** (≈ 800 KB). Your step-2 fix hangs again. Draw both pipes, mark which one is full, and say who is waiting for whom.
- **Step 4.** Fix it for any input size. You may use one extra `fork`. Print the first line you get back and the total number of bytes:
```
$ ./upper 20000
HELLO FROM THE OPERATING SYSTEMS COURSE
parent: got 800000 bytes back
```
- ⚠️ Step 1 sends `"hello\n"` (6 bytes; 20 000 × 6 = 120 KB). The "≈ 800 KB" and the step-4 output imply a 40-byte line, `"hello from the operating systems course\n"` (20 000 × 40 = 800 000). I used the 40-byte line for steps 3–4.
- ✅ **C6 answers (all verified):**
  - **Step 1, why it hangs:**
    - The **parent** is blocked in `read(from_tr[0])` waiting for the answer.
    - `tr` did receive `hello\n`, but its stdout is a pipe, so its output is **fully buffered** [A5]. `HELLO\n` sits in `tr`'s buffer while `tr` is blocked in `read` on its stdin, waiting for more input or EOF.
    - EOF never comes, because the parent still holds `to_tr[1]` (it closes it only *after* its read). Each process waits for the other.
  - **Step 2:** move `close(to_tr[1]);` to right after the `write`, before the `read`. `tr` sees EOF, flushes `HELLO\n` and exits, and the parent prints `answer: HELLO`.
  - **Step 3:** the step-2 design writes all 800 KB before reading anything.
    - `tr` converts data and writes it into `from_tr` until **`from_tr` is full** (64 KiB). Then `tr` blocks in `write`.
    - Since `tr` has stopped reading, **`to_tr` fills up** too (64 KiB), and the parent blocks in `write`.
    - The parent waits for `tr` to drain `to_tr`; `tr` waits for the parent to drain `from_tr`: a deadlock with **both pipes full**.
    - My runs: the step-2 design still worked at 68 000 bytes (two pipes plus `tr`'s buffer hold that much) but hung at 800 000.
  - **Step 4:** use the extra `fork` as a **feeder** child. It writes all the lines into `to_tr[1]` and closes it; the parent only reads `from_tr[0]` until EOF.
    - Every process must close the ends it doesn't use, especially the parent's copy of `to_tr[1]`. Verified: forgetting that one close hangs again.
    - My sketch (§5.13) prints exactly the lab's expected two lines.
- **Part D — Think it through (pen and paper).** "Answer without running the code first. Then run it and check yourself."
- **D1. Draw the tables ★★**: for your C2 program (`cat | grep | wc`), draw the descriptor table of all **four** processes at the moment just before each child calls `execlp` (and the parent's after its closes). Use the Part B style with columns fd 0, fd 1, fd 3, 4, 5, 6. How many **write ends** of pipe `a` exist in the system at that moment? Of pipe `b`?
- ✅ **Answer.** With `pipe(a)` → fd 3 = aR, fd 4 = aW and `pipe(b)` → fd 5 = bR, fd 6 = bW:

| Process (just before `execlp`) | fd 0 | fd 1 | fd 3 | fd 4 | fd 5 | fd 6 |
|---|---|---|---|---|---|---|
| child `cat` | tty | **aW** | – | – | – | – |
| child `grep` | **aR** | **bW** | – | – | – | – |
| child `wc` | **bR** | tty | – | – | – | – |
| parent (after its 4 closes) | tty | tty | – | – | – | – |

  - Write ends of pipe a: **1** (`cat`'s fd 1). Of pipe b: **1** (`grep`'s fd 1).
  - If the parent has not done its closes yet, add one more write end of each pipe (the parent's fd 4 and fd 6).

### [Lab1-p17] D2, D3, D4
- **D2. "Let it finish, then I'll read" ★★★**
```c
/* d2_wait_first.c — the parent waits for the child BEFORE reading */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
    int p[2];
    pipe(p);
    pid_t pid = fork();
    if (pid == 0) {
        dup2(p[1], 1);
        close(p[0]); close(p[1]);
        execlp("seq", "seq", "1", "100000", NULL);   /* about 590 KB of output */
        perror("execlp"); exit(1);
    }
    close(p[1]);
    waitpid(pid, NULL, 0);          /* "let it finish first, then I read" */
    char buf[4096];
    ssize_t n;
    long total = 0;
    while ((n = read(p[0], buf, sizeof buf)) > 0) total += n;
    printf("read %ld bytes\n", total);
    return 0;
}
```
- Grey box: `seq 1 100000` prints the numbers 1 to 100 000, one per line, about 590 000 bytes.
- Questions: (a) This program hangs forever: explain why in two sentences. (b) Would it still hang with `seq 1 1000` (about 3 900 bytes)? (c) Roughly, what is the largest output for which this design works? (d) Fix it by moving one line.
- ✅ **Answers (verified):**
  - **(a)** The parent sits in `waitpid` until `seq` exits. But `seq` can't exit: after 64 KiB the pipe is full and `seq` is blocked in `write` until someone drains it, and the only reader is the parent, which is waiting for `seq`.
  - **(b)** No. 3 893 bytes fit in the pipe, so `seq` finishes, `waitpid` returns, and the parent reads everything (`read 3893 bytes`).
  - **(c)** About the **pipe capacity, 64 KiB = 65 536 bytes** [S06-p8]. Measured: 63 894 bytes worked and 66 894 bytes hung.
  - **(d)** Move `waitpid(pid, NULL, 0);` to **after** the read loop: read until EOF first, then reap. Fixed run: `read 588895 bytes`.
- **D3. Did I just close stdout? ★★**: `dup2(p[1], 1);    close(p[1]);     printf("where does this go?\n");`. After `close(p[1])`, is the pipe's write end closed for this process? Where does the `printf` text go? Answer using the words *ticket number* and *open file description*.
- ✅ **Answer (verified):**
  - **No.** `close(p[1])` throws away **ticket number** 4 only. Ticket 1 still points at the same **open file description**, the pipe's write end, because `dup2` made 1 a second ticket for it [S06-p5, p15].
  - So the write end is still open through fd 1, and the `printf` text goes **into the pipe**, not to the terminal. My test read back 20 bytes, `where does this go?\n`, from `p[0]`.
- **D4. Wrong order ★★**
```c
if (fork() == 0) {
    execlp("ls", "ls", NULL);
    dup2(p[1], 1);
    close(p[0]); close(p[1]);
}
```
- Questions: Where does `ls`'s output go? Will the `dup2` line ever run? If a parent is reading `p[0]` until EOF, will it ever finish?
- ✅ **Answer (verified):**
  - `ls`'s output goes to the **terminal**, because fd 1 was never rewired.
  - The `dup2` line **never runs**: a successful exec wipes our code and replaces it with `ls` [S06-p17]. Those lines only run if exec *fails*.
  - The parent: `ls` inherited both pipe ends (exec keeps descriptors) and holds them while it runs. When `ls` exits they close. If the parent closed its own `p[1]`, it then gets EOF and finishes with **0 bytes**; my run printed `parent: got EOF after 0 bytes`. If the parent still held `p[1]`, it would never finish.

### [Lab1-p18] D5–D9
- **D5. Messages without edges ★★**: a child does three `write` calls very fast, with no `sleep`: `"one"`, `"two"`, `"three"` (no newlines, no `'\0'`). The parent then does a single `read(p[0], buf, 64)`. List two different things the parent might receive. Which statement on the slides (*Why not a shared file?*) does this remind you of, and do pipes solve that problem?
- ✅ **Answer:**
  - The parent may get e.g. `"onetwothree"` (all 11 bytes), `"one"` (only the first write had arrived), or `"onetwo"`.
  - It is count 2, "**No boundaries**" [S06-p4]. Pipes do **not** solve it: a pipe is a byte stream that "carries bytes in order and nothing else" [S06-p3].
  - Verified: 21 runs exactly as written all gave `"onetwothree"`, and so did 12 more where the parent was already waiting in `read`. With a 1 ms pause between the writes, the single read returned just `"one"` (10 of 10 runs).
- **D6. Two FIFOs, one bad order ★★★**: programs X and Y talk over two FIFOs, X → Y on `/tmp/f1` and Y → X on `/tmp/f2`. Each program first opens the FIFO it **reads**, then the one it **writes**:
```c
/* X */                                   /* Y */
int in  = open("/tmp/f2", O_RDONLY);     int in  = open("/tmp/f1", O_RDONLY);
int out = open("/tmp/f1", O_WRONLY);     int out = open("/tmp/f2", O_WRONLY);
```
- Both FIFOs already exist. What happens when you start X and Y? Name the call each one is stuck in, using the `open()` table from Slide 7. Then fix it by changing **one** program only.
- ✅ **Answer (verified):**
  - Both hang forever in their **first** `open(…, O_RDONLY)`. X waits for a writer on `/tmp/f2`, Y waits for a writer on `/tmp/f1`, and neither ever reaches its `O_WRONLY` open [S07-p5, row 1].
  - Fix: swap the two lines in **one** program, e.g. Y opens `/tmp/f2` for writing first. That open pairs with X's read-open of f2; then X's write-open of f1 pairs with Y's read-open of f1. Verified: both opens succeed.
- **D7. Where do the bytes go? ★★**: in A7 a student forgets **only** the `dup2(p[1], 1)` line in the child. What appears on the screen? What does the parent report? Does the program finish?
- ✅ **Answer (verified):**
  - The `ls -l /` listing appears **on the screen**, because fd 1 is still the terminal.
  - The parent reports `ls wrote 0 bytes in 0 lines…`.
  - It **finishes**: the child closed both pipe ends before exec and the parent closed `p[1]`, so no write end is left and the parent gets EOF.
- **D8. Count ★**: for the shell command `a | b | c | d`, how many processes does the shell fork? How many times does it call `pipe()`? How many descriptors does `pipe()` create in total? How many `waitpid` calls should the shell make?
- ✅ **Answer:** **4** forks (one per command), **3** `pipe()` calls (one per `|`), **6** descriptors (2 per pipe), **4** `waitpid`s (one per child).
- **D9. True or false, and one sentence why ★**
- ✅ **Answers:**

| | Statement | T/F | Why |
|---|---|---|---|
| a | `read` on a pipe returns 0 when the pipe is empty right now. | **F** | 0 means EOF, i.e. no write end open anywhere. An empty pipe with a writer still open makes `read` block [S06-p6, p9]. |
| b | After `fork`, the pipe has two buffers, one for the parent and one for the child. | **F** | fork clones the descriptor table, not the pipe: one buffer, four descriptors [S06-p9]. |
| c | `exec` closes all open file descriptors. | **F** | exec keeps the descriptor table; that is "the whole trick" [S06-p17]. |
| d | `dup2(3, 1)` closes fd 3. | **F** | It closes fd 1 (if open) and makes 1 refer to what 3 refers to; fd 3 stays open, which is why B1 closes it itself (close #2) [S06-p15]. |
| e | Data written to a FIFO is stored in the file on disk until someone reads it. | **F** | Size is always 0; no data is ever stored on disk [S07-p4] (verified). |
| f | `write` into a full pipe returns an error. | **F** | It blocks/sleeps until the reader drains some data [S06-p11; A3]. |
| g | In `ls \| wc`, if the `ls` child forgets to close its copy of the read end, the pipeline still works. | **T** | Read ends don't affect EOF (B1 close #1, verified). |
| h | If nobody handles it, `SIGPIPE` kills the process. | **T** | Default action; the shell shows 128 + 13 = 141 [A4] (verified). |
| i | `open(fifo, O_RDONLY)` returns immediately if the FIFO is empty. | **F** | It blocks until some process opens the FIFO for writing, empty or not [S07-p5] (verified). |

---

## 3. Definitions & key terms

| Term | Meaning, as taught | Ref |
|---|---|---|
| **IPC** (inter-process communication) | "any kernel-mediated way for two processes with separate address spaces to exchange data" | S06-p3 |
| **Byte stream** | carries bytes in order and nothing else: no message boundaries | S06-p3, S07-p9 |
| **Message passing (Model 1)** | process A → kernel buffer (bytes queued) → process B; "two copies, one queue, nobody touches anybody's memory" | S06-p4 |
| **File descriptor** | a small whole number (a "ticket") your process uses for something it has open | S06-p5 |
| **Descriptor table** | your process's private list of tickets, indexed 0, 1, 2, 3 …; one per process | S06-p5 |
| **Open file description** | the kernel's "bookmark" behind a ticket: which object, how it was opened, where in it you are (offset) | S06-p5 |
| **stdin / stdout / stderr** | tickets **0 / 1 / 2** every process is born with: where it reads / writes / complains. In code: `STDIN_FILENO`, `STDOUT_FILENO`, `STDERR_FILENO` | S06-p5, p15; Lab A4 |
| **tty** | shorthand for "your terminal" in the lab's fd tables | Lab1-p10 |
| **`ssize_t`** | a signed size: a count, or -1 for failure (what `read`/`write` return); printed with `%zd` | S06-p6; Lab A1 |
| **`errno`** | C's per-call error variable; when a call returns -1, errno says why | S06-p6 |
| **`perror`** | prints a human-readable error message to stderr | S07-p6 |
| **EOF on a pipe** | `read` returns **0**: "no more data will ever arrive". Not an error, not a byte, "a verdict". At a terminal you type Ctrl-D | S06-p6, p11 |
| **printf vs write** | printf formats into a user-space buffer and writes later; write hands bytes to the kernel now | S06-p6 |
| **Line / fully buffered** | stdout to a terminal: flushed at every `'\n'`; to a pipe or file: flushed when the buffer (several KB) is full or at exit; stderr: not buffered | Lab A5, A3 |
| **Pipe** | a nameless, fixed-size buffer inside the kernel with two descriptors: `fd[0]` read end, `fd[1]` write end; one-way, FIFO order | S06-p7, p8 |
| **Unidirectional / half-duplex** | data flows one way only, so two directions need two pipes | S06-p7, p12 |
| **Pipe capacity** | 65 536 bytes (64 KiB) on Linux since 2.6.11 (earlier: one page) | S06-p8 |
| **Anonymous pipe** | made by `pipe()`; reachable only by `fork` inheritance, so it needs a common ancestor ("a family privilege") | S07-p2 |
| **Deadlock** | processes waiting on each other forever; "Nothing crashes. Nothing logs." | S06-p9; Lab A6 |
| **Sacred Rule of Closing** | every process closes every pipe end it will not use, immediately after fork. Not tidiness: correctness | S06-p10 |
| **SIGPIPE** | signal (number 13) the kernel sends to a process that writes to a pipe whose read end is closed; by default it kills the writer | S06-p11; Lab A4 |
| **EPIPE / "Broken pipe"** | what `write` returns (-1, errno = EPIPE) if SIGPIPE does not kill the process | Lab A4b |
| **Exit status 128 + N** | the shell's `$?` for a process killed by signal N (SIGPIPE → 141) | Lab A4 |
| **`dup2(srcfd, dstfd)`** | copies descriptor info from srcfd to dstfd: dstfd now refers to what srcfd refers to (same bookmark); dstfd is closed first if open | S06-p15 |
| **Redirection** | `>` = open file + dup2 onto fd 1; `<` = open file + dup2 onto fd 0 (in the child, before exec) | Lab B2, B3 |
| **`execve` / `execlp` / `execvp`** | replace the program image (code, heap, stack); **keep the descriptor table**. `execvp` = arguments in a NULL-terminated array | S06-p17; Lab C3 |
| **`wait(NULL)` / `waitpid(pid, NULL, 0)`** | the parent reaps a child ("no zombies") | Lab A1, B1 |
| **FIFO / named pipe** | "pipe + a name": a special file of type `p` in the filesystem; same semantics as `pipe()` after `open()`; any process with the path and permissions can use it | S07-p3 |
| **`mkfifo(path, mode)`** | creates the FIFO's *name* only (0 on success, -1 on error; errno = EEXIST if it exists). Shell: `mkfifo [-m 0600] path` | S07-p4, p5 |
| **`open()` handshake** | on a FIFO, `O_RDONLY` waits for a writer and `O_WRONLY` waits for a reader; "both sides must arrive before data can flow" | S07-p5 |
| **`O_NONBLOCK`, `ENXIO`** | non-blocking open: a reader returns at once; a writer with no reader gets -1, errno = ENXIO | S07-p5 |
| **`O_RDWR` on a FIFO** | doesn't block, but non-portable and you never see EOF: avoid it | S07-p5 |
| **`O_WRONLY\|O_CREAT\|O_TRUNC, 0644`** | open for writing, create if missing, empty if present; new-file permission rw-r--r-- | Lab B2 |
| **`unlink(path)`** | removes a name from the filesystem (what `rm` does) | S07-p7; Lab C5 |
| **`_exit(0)`** | ends the process immediately; the version safe inside a signal handler | Lab C5 |
| **Pipeline** | commands run concurrently, stdout of each connected to stdin of the next; bytes flow left → right; no temp files; programs don't know | S07-p9 |
| **`prev_read`** | in an N-stage pipeline loop, the read end of the previous stage's pipe (-1 for the first) | Lab C4 |

---

## 4. Rules & system calls as taught

### 4.1 `pipe()` [S06-p7, p8]
```c
#include <unistd.h>
int pipe(int fd[2]);      /* 0 on success, -1 on error -> perror("pipe") */
/* fd[0] = READ end  ("0 is stdin-like")
   fd[1] = WRITE end ("1 is stdout-like") */
```
- In every class example the two ends come out as **fd 3 (read) and fd 4 (write)**, right after 0/1/2: the S06-p15 diagram, A1's printout, and my runs. 🔎 Look up in Track B: the rule for which number a new descriptor gets.
- The buffer is one-way, FIFO-ordered, and holds 64 KiB.

### 4.2 `fork()` + pipes [S06-p9, p10]
- fork copies the **descriptor table**, not the pipe: 1 buffer, 4 descriptors, 2 readers + 2 writers.
- The correct flow: `pipe()` → `fork()` → each process **closes the ends it won't use, immediately** → one writes, the other reads → the writer's final `close` gives the reader EOF.
- Create the pipe **before** the fork. A pipe made after the fork exists in one process only (verified, §6 Q16).

### 4.3 The pipe I/O rules: blocking, EOF and SIGPIPE ⭐⭐⭐

| Situation | Result | Ref (verified in) |
|---|---|---|
| `read`, pipe has data | returns >0: as many bytes as are there, up to the count asked. **No message boundaries** | S06-p6; D5 |
| `read`, pipe empty, **some write end still open** (anywhere, even in the reader itself) | **blocks** (sleeps) until data arrives or the last write end closes | S06-p9; A2 step 2 |
| `read`, pipe empty, **all write ends closed** | returns **0 = EOF** | S06-p6, p11; A2 step 1 |
| `read` fails | returns -1, look at `errno` | S06-p6 |
| `write`, room in the pipe | returns the count written | S06-p6 |
| `write`, **pipe full** (64 KiB unread) | **blocks** until a reader drains some data | S06-p11; A3, D2 |
| `write`, **all read ends closed**, SIGPIPE not handled | process **killed by SIGPIPE**; `$?` = 128 + 13 = **141** | S06-p11; A4 |
| `write`, all read ends closed, SIGPIPE caught | handler runs; `write` returns **-1, errno = EPIPE** ("Broken pipe") | A4b |
| `close` the last write end | every blocked reader wakes up with EOF | S06-p10 |
| "atomic writes" | listed on the topic slides but never explained. 🔎 Look up in Track B | S06-p2 |

### 4.4 SIGPIPE: default vs handler [Lab A4, A4b]
- Default action: the writer is killed silently (only `$?` = 141 tells you).
- Catch it with the Week 1 `sigaction` code. Then `write` returns -1/EPIPE and the program keeps running, which is what a server wants when one client disappears.
```c
struct sigaction sa = {0};
sa.sa_handler = on_pipe;
sigaction(SIGPIPE, &sa, NULL);
```

### 4.5 `dup2` [S06-p15, p16]
```c
int dup2(int srcfd, int dstfd);   /* "dstfd now ALSO refers to what srcfd refers to" */
dup2(p[1], 1);   /* stdout -> pipe write end   (writer side)  */
dup2(p[0], 0);   /* stdin  <- pipe read end    (reader side)  */
dup2(fd, 1);     /* stdout -> file  (cmd > file)               */
dup2(fd, 0);     /* stdin  <- file  (cmd < file)               */
```
- If `dstfd` is already open, it is **closed first**. Its old connection (usually the terminal) is gone.
- **`srcfd` stays open**, so you must close it yourself. Otherwise you are holding an extra write end, which is Lab B1 close #2/#4.
- Both tickets share one bookmark, so reading through one advances the other.
- Argument order is (source, destination): "make **dst** point where **src** points". Swapping them is a classic silent bug (Practice 2, §5.15).

### 4.6 exec keeps descriptors, and the dup2 → close → exec pattern [S06-p17] ⭐⭐⭐
- `execve`/`execlp` wipe code, heap and stack but **keep the descriptor table**. Anything you don't want the next program to hold, you must close (or "mark"; 🔎 Track B).
- The pattern in each child:

```c
/* writer child for "a | b" */          /* reader child for "a | b" */
dup2(p[1], 1);                           dup2(p[0], 0);
close(p[0]);                             close(p[0]);
close(p[1]);                             close(p[1]);     /* THE important one */
execlp("a", "a", NULL);                  execlp("b", "b", NULL);
perror("execlp"); exit(1);               perror("execlp"); exit(1);
/* parent (the shell): close(p[0]); close(p[1]); waitpid(left,...); waitpid(right,...); */
```
- Lines after a successful `exec` never run. `perror` + `exit` after it only run if exec failed [D4, A7].
- Shell redirections [Lab1-p12]:

| Shell | In the child, before exec |
|---|---|
| `cmd > file` | `fd = open(file, O_WRONLY\|O_CREAT\|O_TRUNC, 0644); dup2(fd, 1); close(fd);` |
| `cmd < file` | `fd = open(file, O_RDONLY); dup2(fd, 0); close(fd);` |
| `a \| b` | `pipe(p)`; in a: `dup2(p[1], 1)`; in b: `dup2(p[0], 0)`; everyone closes both originals |

### 4.7 Building pipelines [S07-p9; Lab B1, C2, C4]
- **2 stages** (the recipe): one pipe · two forks · each child dup2s its end and closes both originals · the parent closes both ends · two waitpids.
- **N stages, all pipes first** (C2 style): create all N−1 pipes before the first fork. Every child inherits *all* of them and must close *all* of them after its dup2s; the parent closes all and waits for all N.
- **N stages, `prev_read` loop** (C4 hints): for each stage, make a new pipe unless it is the last, then fork. The child dup2s `prev_read` → 0 (if not first) and new write end → 1 (if not last), then closes what it dup2'd from. The parent closes `prev_read` and the new write end and keeps the new read end as `prev_read`. The parent then holds ≤ 3 pipe descriptors at any moment.
- Counting for `c1 | c2 | … | cN`: **N** forks, **N−1** `pipe()` calls, **2(N−1)** descriptors, **N** `waitpid`s [D8].

### 4.8 FIFOs: `mkfifo` and `open` [S07-p3 to p7]
```c
#include <sys/stat.h>
int mkfifo(const char *pathname, mode_t mode);   /* 0 ok; -1 error; errno == EEXIST if it exists */
if (mkfifo(FIFO_PATH, 0666) == -1 && errno != EEXIST) { perror("mkfifo"); exit(EXIT_FAILURE); }
```
- `mkfifo` only **creates the name**: no open, no connection, no data. Shell: `mkfifo /tmp/myfifo`, `mkfifo -m 0600 /tmp/myfifo`. `ls -l` shows type `p` and **size 0** always.
- `open()` semantics on a FIFO ("the only genuinely new idea"):

| Call | Blocks? | What happens |
|---|---|---|
| `open(path, O_RDONLY)` | Yes | waits until some process opens the FIFO for writing |
| `open(path, O_WRONLY)` | Yes | waits until some process opens the FIFO for reading |
| `open(path, O_RDONLY \| O_NONBLOCK)` | No | returns immediately, even with no writer |
| `open(path, O_WRONLY \| O_NONBLOCK)` | No | returns -1, errno = ENXIO if no reader |
| `open(path, O_RDWR)` | No | Linux allows it; non-portable; never see EOF: avoid |

- After `open`, everything is ordinary pipe behaviour (§4.3): EOF when all writers close, blocking when full, SIGPIPE with no readers.
- Remove the name with `unlink(FIFO_PATH)` (like `rm`). Otherwise it "persists in file system until deleted".

### 4.9 Ordinary pipe vs FIFO [S07-p2, p8]

| | Ordinary (anonymous) pipe | FIFO (named pipe) |
|---|---|---|
| created by | `pipe(fd)` | `mkfifo(path, mode)`, then `open(path, …)` |
| who can use it | processes related by fork (common ancestor) | any process with the path and permissions, "related or not" |
| lives | only while running (in memory) | the name persists in the filesystem until deleted |
| data on disk | — | none (size always 0) |
| read/write rules | §4.3 | same, after `open` |

### 4.10 printf buffering rules [S06-p6; Lab A3, A5]
- `printf` → user buffer; `write` → kernel now.
- stdout to a terminal is **line buffered** (flushed at `'\n'`). stdout to a pipe or file is **fully buffered** (flushed when full or at exit). stderr is **not buffered**.
- Consequences:
  - A buffer that is not empty at `fork` is copied, so the output is printed twice [A5].
  - Output can sit in another program's buffer while you wait for it [C6 step 1].
  - `printf` before a `dup2` can end up in the new destination [S06-p16 trap].
  - A crash or `_exit` can lose it [S06-p6].

### 4.11 ⭐⭐⭐ "Why does this program hang?" checklist (built only from the slides and lab)
A hang is silent ("Nothing crashes. Nothing logs." [S06-p9]). Work through these steps:
1. **Find who is blocked, and in which call:** `read`, `write`, `open` (FIFO) or `waitpid`.
2. **Blocked in `read`, waiting for EOF?** List every process alive *right now* and every ticket each one holds to that pipe's **write end**. Include:
   - the parent;
   - the reader itself;
   - siblings and helpers, which inherit at fork;
   - exec'd programs, which keep what they inherited;
   - extra tickets made by `dup2` (fd 1 and the original fd 4 are two tickets).

   **Any one** of them keeps EOF away.
3. **Blocked in `waitpid`?** Ask what that child is waiting for. Usually it is an EOF that needs a `close` you placed *after* the `waitpid`, or space in a pipe that only the waiting parent would drain.
4. **Blocked in `write`?** The pipe is full (64 KiB). Is the process that should read it itself blocked, perhaps in `waitpid`, in its own `write`, or because it is the same process?
5. **Is the data even in the pipe yet?** A writer whose stdout is a pipe is fully buffered and flushes only when the buffer is full or at exit, so a filter like `tr` holds its answer until it gets EOF.
6. **Two-way conversation?** Someone must write first, and with big data a single process can't both feed and drain.
7. **FIFO stuck in `open`?** `open` is a handshake: will the other side ever open with the *opposite* mode? Are two programs opening two FIFOs in crossed order?
8. **FIFO never ends?** It was opened `O_RDWR`, so the process is its own writer and never sees EOF.

| # | Symptom | Cause | Fix | Seen in |
|---|---|---|---|---|
| H1 | reader never gets EOF after the writer exits | the reader kept its own copy of the write end | close it right after fork (before exec) | A2 step 2; B1 #4; C2 |
| H2 | `wc`/`sort` never prints; parent stuck in `waitpid` | the parent (the "shell") kept a write end | parent closes both ends **before** waiting | B1 #6; C1; C2 |
| H3 | EOF arrives only much later | write end leaked into a long-lived child/helper (exec keeps descriptors) | close unused ends in **every** child | S06-p17 green box; Practice 1 |
| H4 | the right `close` exists but sits after a blocking call | close after `waitpid` / after `read` | move the close before the blocking call | C1 Q; C6 steps 1–2 |
| H5 | small output works, big output hangs | `waitpid` before reading; the pipe fills at 64 KiB | read to EOF first, then `waitpid` | D2 |
| H6 | two-way exchange hangs at once | both sides `read` first | one side writes first | A6 Q |
| H7 | two-way exchange with lots of data hangs | both pipes full; each side blocked in `write` | split writer and reader (extra fork) | C6 steps 3–4 |
| H8 | answer from a filter never arrives | its output is fully buffered; it waits for EOF | give it EOF: close your write end | C6 step 1 |
| H9 | two FIFO programs stuck at start-up | crossed `open` order on two FIFOs | swap the opens in one program | D6 |
| H10 | FIFO program stuck at start-up | the other side never opened the FIFO | start the other side (or use `O_NONBLOCK`) | S07-p5; A8 |
| H11 | FIFO reader never finishes | opened with `O_RDWR` | open `O_RDONLY` | S07-p5; Practice 3 |
| H12 | one process with a pipe freezes | it filled its own pipe; nobody reads | (design error) | A3 |

Silent failures that are **not** hangs:

| # | Symptom | Cause | Seen in |
|---|---|---|---|
| S1 | writer vanishes, `$?` = 141 | wrote with no read end left → SIGPIPE | A4; §6 Q16 |
| S2 | output shows up on the screen instead of in the pipe | `dup2` missing, wrong order (after exec), or arguments swapped | D4, D7, Practice 2 |
| S3 | "0 bytes" plus an error on screen | exec failed; perror went to stderr (fd 2) | A7 `lss`; C3 |
| S4 | a line printed twice | printf buffer copied by fork | A5 |
| S5 | server quits after the first client | `read` returned 0 when the client closed | A8 order 4; C5 |

---

## 5. Worked examples — fd tables + verified behavior

Notation, as in the lab: `tty` = terminal, `R`/`W` = read/write end of the pipe, `–` = closed, **bold** = just changed. fd 2 is `tty` unless shown. All outputs below are real runs on my Mac (Apple clang, `cc -Wall`). The page notes in §2 hold the full code.

### 5.1 S06-p11 "Hello" example, and Lab A1 (child writes, parent reads)

| Moment | Process | fd 0 | fd 1 | fd 3 | fd 4 |
|---|---|---|---|---|---|
| after `pipe(p)` | parent | tty | tty | R | W |
| right after `fork()` | parent | tty | tty | R | W |
| right after `fork()` | child | tty | tty | R | W |
| after `close(p[0])` | child (writer) | tty | tty | **–** | W |
| after `close(p[1])` | parent (reader) | tty | tty | R | **–** |

- Write ends left in the system: just the child's fd 4. When the child exits, any further `read` by the parent returns 0.
```
$ cc -Wall -o s06_p11 s06_p11_example.c
warning: extra tokens at end of #include directive      <- the "<stdlib.h>a" typo
warning: '/*' within block comment                      <- the nested comment
$ ./s06_p11
Child process said: Hello
```
- Lab A1 is the same table, plus the child's `close(p[1])` after writing, the parent's `close(p[0])` and `wait(NULL)`:
```
parent: read end = fd 3, write end = fd 4
parent read 22 bytes: "Hello from your child"
```

### 5.2 S06-p12 Two directions = two pipes
`pipe(pipe1)` gives fd 3/4 and `pipe(pipe2)` gives fd 5/6. (The declarations are my scaffolding; the slide shows only the if/else body.)

| Moment | Process | fd 3 (pipe1 R) | fd 4 (pipe1 W) | fd 5 (pipe2 R) | fd 6 (pipe2 W) |
|---|---|---|---|---|---|
| after both `pipe()` + `fork()` | both | R | W | R | W |
| after its two closes | child | R | **–** | **–** | W |
| after its two closes | parent | **–** | W | R | **–** |

- Pipe1 now has exactly one writer (the parent) and one reader (the child); pipe2 is the reverse. Each side writes, then reads, so nobody waits forever.
```
Child reads GKG
Parent reads gfg
```

### 5.3 S06-p15/16 dup2 inside one process

| Moment | fd 0 | fd 1 | fd 2 | fd 3 | fd 4 |
|---|---|---|---|---|---|
| after `pipe(fds)` | tty | tty | tty | R | W |
| after `dup2(fds[1], STDOUT_FILENO)` | tty | **W** | tty | R | W |

```
$ ./s06_p15                 # stdout is the terminal (line buffered)
This prints to the terminal            <- the second line went into the pipe
$ ./s06_p15 | cat           # stdout is a pipe (fully buffered)
                                        <- NOTHING: both lines were still buffered at the dup2, flushed into our own pipe at exit
```

### 5.4 S06-p14, S06-p17 and Lab A7: the child becomes `ls`

| Moment | Process | fd 0 | fd 1 | fd 3 | fd 4 |
|---|---|---|---|---|---|
| after `pipe(p)` + `fork()` | child | tty | tty | R | W |
| after `dup2(p[1], 1)` | child | tty | **W** | R | W |
| after `close(p[0]); close(p[1]);` | child | tty | W | **–** | **–** |
| after `execlp("ls", …)` | **ls** (same table, new program) | tty | W | – | – |
| after `close(p[1])` | parent | tty | tty | R | **–** |

- Exactly one write end exists in the whole system: `ls`'s fd 1. When `ls` exits, the parent's loop gets `read` = 0.
```
$ ./a7
ls wrote 963 bytes in 18 lines, and never knew it was talking to a pipe
$ ls -l / | wc -lc
      18     963                         <- same (my Mac; Ubuntu numbers differ)
$ ./a7lss                                # "ls" changed to "lss"
execlp: No such file or directory        <- on the SCREEN: perror writes to fd 2, which was never redirected
ls wrote 0 bytes in 0 lines, and never knew it was talking to a pipe
$ ./d7                                   # D7: dup2 line forgotten
total 11
drwxrwxr-x  29 root  admin   928 Oct 17 07:27 Applications
...                                      <- listing goes to the terminal
ls wrote 0 bytes in 0 lines, and never knew it was talking to a pipe
```
- S06-p14 snippet (child `dup2`s and `printf`s, my parent reads): `parent pulled 17 bytes out of the pipe: Hello from child`.

### 5.5 Lab A2: the forgotten close, as a timeline

| Process | fd 3 | fd 4 |
|---|---|---|
| child (writer) after `close(p[0])` | – | W |
| parent, **step 1** (after `close(p[1])`) | R | – |
| parent, **step 2** (`close` commented out) | R | **W ← the leftover write end** |

```
step 1                                        step 2 (close(p[1]) commented out)
[0.30s] parent got 4 bytes: one               [0.34s] parent got 4 bytes: one
[1.30s] parent got 4 bytes: two               [1.34s] parent got 4 bytes: two
[2.30s] parent got 6 bytes: three             [2.34s] parent got 6 bytes: three
[3.31s] parent: read returned 0 -> EOF, done  ...silence... still blocked in read() at 10 s -> killed
```
- In step 2 the child has already exited at ~3.3 s, but the parent's own fd 4 keeps a writer alive. Its `read` can never return 0.

### 5.6 Lab A3, A4, A4b: one process, one pipe

| Program | fd 3 | fd 4 | Readers / writers | What happens |
|---|---|---|---|---|
| A3 | R | W | 1 / 1, but nobody calls `read` | `write` blocks once 65 536 bytes are inside |
| A4, A4b | **–** (closed first) | W | **0** / 1 | the first `write` → SIGPIPE |

```
$ ./a3                                   $ ./a4
...                                      about to write...
written so far: 61440 bytes              $ echo $?
written so far: 65536 bytes              141          <- 128 + 13 (kill -l: 13 = PIPE)
(stuck in write() forever -> Ctrl+C)
                                         $ ./a4b
                                         handler: caught SIGPIPE, nobody is reading!   (stderr)
                                         write returned -1
                                         write: Broken pipe                            (perror)
```

### 5.7 Lab A5: printf + fork + the shell's pipe
- When you type `./a5 | cat`, the **shell** makes the pipe: `a5`'s fd 1 = W, `cat`'s fd 0 = R.
- Then the buffer goes through these steps:
  1. `printf("before fork\n")` leaves the line in a5's user buffer (stdout is a pipe, so it is fully buffered).
  2. `fork` copies the buffer.
  3. The child appends `I am the child` and flushes at `return 0`.
  4. The parent appends `I am the parent` and flushes at its `return 0`.
```
$ ./a5                 $ ./a5 | cat           $ ./a5_fix1 | cat   (write(1, ...) instead)
before fork            before fork            before fork
I am the child         I am the child         I am the child
I am the parent        before fork            I am the parent
                       I am the parent
```

### 5.8 Lab A6: question and answer over two pipes
`down` gives fd 3/4 and `up` gives fd 5/6:

| Process (after its closes) | fd 3 down R | fd 4 down W | fd 5 up R | fd 6 up W |
|---|---|---|---|---|
| child | R | – | – | W |
| parent | – | W | R | – |

```
$ gcc -Wall -o a6 a6_two_pipes.c        # exactly as printed
a6_two_pipes.c:22:6: error: expected expression
   22 |     }. /* parent */
$ ./a6                                  # after deleting the stray '.'
child : got question "meaning of life?"
parent: got answer   "42"
$ ./a6_readfirst                        # parent reads up[0] BEFORE writing
(hangs: parent in read(up[0]), child in read(down[0]) -> deadlock)
```

### 5.9 FIFOs: S07 writer/reader and Lab A8
- "fd tables": after its `open` returns, the **writer** has fd 3 = W (the FIFO) and the **reader** has fd 3 = R. They are two unrelated processes holding the two ends of one kernel pipe, found by name. Before that, each sits inside `open`.
- Order 1 (writer first) and order 2 (reader first), with real timestamps:
```
ORDER 1                                             ORDER 2
[0.35s] writer| writer: waiting for a reader...     [0.01s] reader| reader: waiting for a writer...
        (writer blocked in open(O_WRONLY))                  (reader blocked in open(O_RDONLY))
[2.16s] shell | prw-r--r-- ... 0 ... /tmp/demo_fifo [2.17s] writer| writer: waiting for a reader...
[2.65s] reader| reader: waiting for a writer...     [2.17s] writer| writer: reader arrived, sending
[2.65s] reader| reader: writer arrived              [2.17s] reader| reader: writer arrived
[2.65s] writer| writer: reader arrived, sending     [2.17s] reader| hello over FIFO
[2.65s] reader| hello over FIFO                     [2.17s] reader| reader: EOF, done
[2.65s] reader| reader: EOF, done
```
- Order 3 and order 4:
```
ORDER 3 (rm /tmp/demo_fifo, then reader)            ORDER 4 (reader, then: echo one > /tmp/demo_fifo)
[0.16s] reader| reader: waiting for a writer...     [0.17s] reader| reader: waiting for a writer...
[0.16s] reader| open: No such file or directory     [1.33s] reader| reader: writer arrived
        (exits at once: no name, and reader.c       [1.33s] reader| one
         never calls mkfifo)                        [1.33s] reader| reader: EOF, done   <- stops after 1 message
```
- Pure shell [S07-p7, A8 step 1]: `cat /tmp/myfifo` waited 1.2 s until `echo "hello from bash" > /tmp/myfifo` ran, then printed `hello from bash` and ended.

### 5.10 Lab B1: `ls -l | wc -l`
- The full table is the lab's own (§2, [Lab1-p11]). Run: `./b1` → `51` + `parent: both children finished`; `ls -l | wc -l` → `51`.
- Who is stuck where when a close is deleted (verified):

| Deleted | Extra write end left in… | Stuck processes |
|---|---|---|
| #4 | `wc` itself (its fd 4) | `wc` in `read(0)` forever; parent in `waitpid(right)` |
| #6 | the parent (its fd 4) | `wc` in `read(0)`; parent in `waitpid(right)`. `ls` has already exited |
| #1, #2, #3, #5 | none that outlives `ls` | nobody: works |

### 5.11 Lab B2 and B3: `>` and `<`

| B2 child (`ls -l > listing.txt`) | fd 0 | fd 1 | fd 3 |
|---|---|---|---|
| after `open("listing.txt", …)` | tty | tty | file |
| after `dup2(fd, 1)` | tty | **file** | file |
| after `close(fd)` → exec `ls` | tty | file | – |

| B3 child (`wc -l < /etc/passwd`) | fd 0 | fd 1 | fd 3 |
|---|---|---|---|
| after `open("/etc/passwd", O_RDONLY)` | tty | tty | file |
| after `dup2(fd, 0)` | **file** | tty | file |
| after `close(fd)` → exec `wc` | file | tty | – |

```
$ ./b2 ; cat listing.txt                           $ ./b3
parent: done — now run  cat listing.txt                 142
total 72                                           $ wc -l < /etc/passwd
-rw-r--r--@ 1 azim  wheel   0 ... a                     142
...
-rw-r--r--@ 1 azim  wheel   0 ... listing.txt   <- created (O_CREAT, 0644) BEFORE ls ran, so it lists itself, size 0
```

### 5.12 Lab C1 and C2: solution sketches (written for these notes, using only Lab Parts A–B; verified)

<details><summary><b>C1 — c1.c (parent writes, child = sort -n)</b></summary>

```c
/* c1.c — parent writes five lines, child becomes sort -n (my solution sketch) */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void)
{
    int p[2];
    if (pipe(p) == -1) { perror("pipe"); exit(1); }
    pid_t pid = fork();
    if (pid == 0) {                       /* child: the READER, becomes sort -n */
        dup2(p[0], 0);
        close(p[0]); close(p[1]);         /* must not keep a write end */
        execlp("sort", "sort", "-n", NULL);
        perror("execlp"); exit(1);
    }
    close(p[0]);                          /* parent: the WRITER */
    char *lines = "42\n7\n1000\n-3\n15\n";
    write(p[1], lines, strlen(lines));
    close(p[1]);                          /* <- THE close: sort gets EOF and starts printing */
    waitpid(pid, NULL, 0);
    return 0;
}
```
</details>

| Moment | Process | fd 0 | fd 3 | fd 4 |
|---|---|---|---|---|
| after dup2 + closes → exec `sort -n` | child | **R** | – | – |
| after `close(p[0])` | parent | tty | – | W |
| after the parent's last `close(p[1])` | parent | tty | – | **–** ← zero writers left → sort's `read` = 0 |

```
$ ./c1                      $ ./c1_close_after_waitpid
-3                          (hangs: parent in waitpid, sort in read waiting for EOF)
7
15
42
1000
```

<details><summary><b>C2 — c2.c (cat /etc/passwd | grep sh | wc -l)</b></summary>

```c
/* c2.c — cat /etc/passwd | grep sh | wc -l  (my solution sketch) */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void)
{
    int a[2], b[2];                       /* a: cat -> grep,  b: grep -> wc */
    pipe(a); pipe(b);                     /* both pipes BEFORE the first fork */
    pid_t c1 = fork();
    if (c1 == 0) {                        /* cat: stdout -> a */
        dup2(a[1], 1);
        close(a[0]); close(a[1]); close(b[0]); close(b[1]);
        execlp("cat", "cat", "/etc/passwd", NULL); perror("execlp cat"); exit(1);
    }
    pid_t c2 = fork();
    if (c2 == 0) {                        /* grep: stdin <- a, stdout -> b */
        dup2(a[0], 0); dup2(b[1], 1);
        close(a[0]); close(a[1]); close(b[0]); close(b[1]);
        execlp("grep", "grep", "sh", NULL); perror("execlp grep"); exit(1);
    }
    pid_t c3 = fork();
    if (c3 == 0) {                        /* wc: stdin <- b */
        dup2(b[0], 0);
        close(a[0]); close(a[1]); close(b[0]); close(b[1]);
        execlp("wc", "wc", "-l", NULL); perror("execlp wc"); exit(1);
    }
    close(a[0]); close(a[1]); close(b[0]); close(b[1]);
    waitpid(c1, NULL, 0); waitpid(c2, NULL, 0); waitpid(c3, NULL, 0);
    return 0;
}
```
</details>

- `./c2` → `4`, and `cat /etc/passwd | grep sh | wc -l` → `4` (my Mac). The fd tables just before exec are the D1 answer [Lab1-p16].
- Deleting each of the 16 closes in turn (each variant given 2 s):

| Close deleted (process: end) | Result | Close deleted | Result |
|---|---|---|---|
| cat: a[0] | ok | wc: a[0] | ok |
| cat: a[1] (write a) | ok, cat exits anyway | wc: **a[1]** (write a) | **HANG** |
| cat: b[0] | ok | wc: b[0] | ok |
| cat: b[1] (write b) | ok, cat exits anyway | wc: **b[1]** (write b) | **HANG** |
| grep: a[0] | ok | parent: a[0] | ok |
| grep: **a[1]** (write a) | **HANG** | parent: **a[1]** (write a) | **HANG** |
| grep: b[0] | ok | parent: b[0] | ok |
| grep: b[1] (write b) | ok, grep exits anyway | parent: **b[1]** (write b) | **HANG** |

### 5.13 Lab C3–C6: solution sketches (mine; verified)

<details><summary><b>C3 — capture.c</b></summary>

```c
/* capture.c — run any command, catch its stdout, count lines/bytes (my solution sketch) */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
int main(int argc, char **argv)
{
    if (argc < 2) { fprintf(stderr, "usage: %s cmd [args...]\n", argv[0]); return 1; }
    int p[2]; pipe(p);
    pid_t pid = fork();
    if (pid == 0) {
        dup2(p[1], 1); close(p[0]); close(p[1]);
        execvp(argv[1], &argv[1]);          /* "everything after the program name" */
        perror("execvp"); exit(127);        /* stderr is still the terminal */
    }
    close(p[1]);                            /* or the read loop never sees EOF */
    char buf[4096]; ssize_t n; long bytes = 0, lines = 0;
    while ((n = read(p[0], buf, sizeof buf)) > 0) {
        bytes += n;
        for (int i = 0; i < n; i++) if (buf[i] == '\n') lines++;
    }
    close(p[0]);
    waitpid(pid, NULL, 0);
    printf("[capture] '%s' printed %ld lines, %ld bytes\n", argv[1], lines, bytes);
    return 0;
}
```
</details>

```
$ ./capture ls -l /                  -> [capture] 'ls' printed 18 lines, 963 bytes     (ls -l / | wc -lc -> 18 963)
$ ./capture echo hello world         -> [capture] 'echo' printed 1 lines, 12 bytes    (same as the lab)
$ ./capture nosuchprogram            -> execvp: No such file or directory  (screen)
                                        [capture] 'nosuchprogram' printed 0 lines, 0 bytes   (no hang)
```

<details><summary><b>C4 — pipeline.c (following the lab's four hints)</b></summary>

```c
/* pipeline.c — ./pipeline cmd1 args + cmd2 args + ... (my solution sketch, following the lab's 4 hints) */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
int main(int argc, char **argv)
{
    char **stage[256]; int nst = 0;
    stage[nst++] = &argv[1];
    for (int i = 1; i < argc; i++)                 /* hint 1: "+" -> NULL */
        if (strcmp(argv[i], "+") == 0) { argv[i] = NULL; stage[nst++] = &argv[i + 1]; }
    pid_t pids[256];
    int prev_read = -1;                            /* hint 2 */
    for (int s = 0; s < nst; s++) {
        int last = (s == nst - 1), p[2];
        if (!last) pipe(p);
        pids[s] = fork();
        if (pids[s] == 0) {                        /* hint 3 */
            if (prev_read != -1) { dup2(prev_read, 0); close(prev_read); }
            if (!last) { dup2(p[1], 1); close(p[1]); close(p[0]); }
            execvp(stage[s][0], stage[s]);
            perror("execvp"); exit(127);
        }
        if (prev_read != -1) close(prev_read);     /* hint 4 */
        if (!last) { close(p[1]); prev_read = p[0]; }
    }
    for (int s = 0; s < nst; s++) waitpid(pids[s], NULL, 0);
    return 0;
}
```
</details>

```
$ ./pipeline ls -l /usr/bin + grep zip + wc -l      -> 19     (shell: ls -l /usr/bin | grep zip | wc -l -> 19, my Mac)
$ ./pipeline cat /etc/passwd + grep sh + sort + head -2   -> the same 2 lines as the shell pipeline
$ ./pipeline echo just one stage                    -> just one stage
```
- Parent's pipe descriptors per loop turn: `prev_read` (1) + new `p[0]`, `p[1]` (2) = **3** at most, and back to **1** after its two closes.

<details><summary><b>C5 — logger.c (many writers → one reader)</b></summary>

```c
/* logger.c — FIFO log server for many strangers (my solution sketch) */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <fcntl.h>
#include <signal.h>
#include <unistd.h>
#include <sys/stat.h>
#define FIFO_PATH "/tmp/soc3010_log"
void on_int(int sig)
{
    unlink(FIFO_PATH);                 /* step 3: remove the name, like rm */
    _exit(0);                          /* safe inside a handler */
}
int main(void)
{
    struct sigaction sa = {0};
    sa.sa_handler = on_int;
    sigaction(SIGINT, &sa, NULL);
    if (mkfifo(FIFO_PATH, 0666) == -1 && errno != EEXIST) { perror("mkfifo"); exit(1); }
    for (int client = 1; ; client++) {           /* step 2: serve client after client */
        int fd = open(FIFO_PATH, O_RDONLY);      /* blocks until the next writer arrives */
        if (fd == -1) { perror("open"); exit(1); }
        char buf[256]; ssize_t n; int first = 1;
        while ((n = read(fd, buf, sizeof buf - 1)) > 0) {
            buf[n] = '\0';                       /* A2's trick: make it a C string */
            if (first) { printf("[client %d] ", client); first = 0; }
            printf("%s", buf);                   /* printf only: no printf/write mixing */
        }
        printf("logger: client %d left\n", client);   /* read returned 0: this writer closed */
        close(fd);                                     /* then loop: open again and wait */
    }
}
```
</details>

```
[0.67s] logger| [client 1] disk almost full        <- after: echo "disk almost full" > /tmp/soc3010_log
[0.67s] logger| logger: client 1 left
[1.33s] logger| [client 2] backup done             <- after: echo "backup done" > /tmp/soc3010_log
[1.33s] logger| logger: client 2 left
[2.01s] logger| <exited, status 0>                 <- after SIGINT (what Ctrl+C sends)
[2.68s] shell | ls: /tmp/soc3010_log: No such file or directory   <- the handler unlinked it
```
- Design note: I print with `printf` only. Mixing `printf("[client 1] ")` (buffered) with `write()` (immediate) would print the pieces out of order, which is the S06-p6 banner again.

- **C6: the `tr` conversation.**
  - Step 1, naive design (the parent still holds `to_tr[1]`):
```
 parent ──write "hello\n"──▶ [ to_tr ] ──▶ tr (stdin)        tr: has "HELLO\n" in its OUTPUT BUFFER (stdout is a pipe -> fully
 parent ◀──read (blocked)─── [from_tr] ◀── tr (stdout)            buffered) and is blocked in read(0) waiting for more input / EOF
 parent holds to_tr[1] open -> tr never gets EOF -> never flushes -> parent's read never returns      => HANG (verified)
```
  - Step 2: `close(to_tr[1])` right after the `write` gives `answer: HELLO` (verified).
  - Step 3, the step-2 design with 20 000 lines of 40 bytes:
```
 parent ──write (BLOCKED)──▶ [ to_tr  FULL 64 KiB ] ──▶ tr (not reading: it is stuck in write)
 parent (never reads yet)    [ from_tr FULL 64 KiB ] ◀── tr ──write (BLOCKED)
 parent waits for tr to drain to_tr; tr waits for parent to drain from_tr          => HANG (verified)
```
  - Step-2 design by input size (my runs): 40 000 bytes ok · 64 000 ok · 68 000 ok · **800 000 hung**.

<details><summary><b>C6 step 4 — upper.c (one extra fork = a feeder)</b></summary>

```c
/* upper.c — C6 step 4: a feeder child writes, the parent only reads (my solution sketch) */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
int main(int argc, char **argv)
{
    int times = argc > 1 ? atoi(argv[1]) : 1;
    int to_tr[2], from_tr[2];
    pipe(to_tr); pipe(from_tr);
    pid_t tr = fork();
    if (tr == 0) {                                   /* child 1: becomes tr */
        dup2(to_tr[0], 0); dup2(from_tr[1], 1);
        close(to_tr[0]); close(to_tr[1]); close(from_tr[0]); close(from_tr[1]);
        execlp("tr", "tr", "a-z", "A-Z", NULL);
        perror("execlp"); exit(1);
    }
    pid_t feeder = fork();
    if (feeder == 0) {                               /* child 2: the extra fork, only writes */
        close(to_tr[0]); close(from_tr[0]); close(from_tr[1]);
        char *line = "hello from the operating systems course\n";
        for (int i = 0; i < times; i++) write(to_tr[1], line, strlen(line));
        close(to_tr[1]);                             /* tr's EOF */
        exit(0);
    }
    close(to_tr[0]); close(to_tr[1]);                /* parent must NOT keep a write end to tr */
    close(from_tr[1]);                               /* ...nor a write end of its own input */
    char buf[4096]; ssize_t n; long total = 0; int printed = 0;
    while ((n = read(from_tr[0], buf, sizeof buf)) > 0) {
        for (int i = 0; i < n && !printed; i++)          /* A7-style scan for the first '\n' */
            if (buf[i] == '\n') { write(STDOUT_FILENO, buf, i + 1); printed = 1; }
        total += n;
    }
    close(from_tr[0]);
    waitpid(tr, NULL, 0); waitpid(feeder, NULL, 0);
    printf("parent: got %ld bytes back\n", total);
    return 0;
}
```
</details>

```
$ ./upper 20000
HELLO FROM THE OPERATING SYSTEMS COURSE
parent: got 800000 bytes back                 <- exactly the lab's expected output
(variant where the parent forgets close(to_tr[1]): HANGS: tr never gets EOF)
```

### 5.14 Lab D2–D7 traces (verified)
- **D2** (`waitpid` before reading). The child's table is the A7 table, with `seq` instead of `ls`.

| `seq 1 N` output size | result |
|---|---|
| 3 893 bytes (N = 1000) | `read 3893 bytes` |
| 60 894 bytes | ok |
| 63 894 bytes | ok |
| 66 894 bytes | **HANG** (seq blocked in `write`, parent in `waitpid`) |
| 588 895 bytes (N = 100 000, as printed) | **HANG** |
| 588 895 bytes with `waitpid` moved after the loop | `read 588895 bytes` |

  → the limit sits between 63 894 and 66 894 bytes, i.e. the **65 536-byte** pipe capacity.
- **D3** (`dup2(p[1],1); close(p[1]); printf(...)`):

| Moment | fd 1 | fd 3 | fd 4 |
|---|---|---|---|
| after `pipe` | tty | R | W |
| after `dup2(p[1], 1)` | **W** | R | W |
| after `close(p[1])` | W ← still a write end! | R | **–** |

  My scaffold read back `20 bytes: where does this go?` from `p[0]`.
- **D4** (exec before dup2): `ls`'s listing appeared on the terminal. The `dup2` line never ran. With the parent's own `p[1]` closed, the parent got `EOF after 0 bytes` once `ls` exited.
- **D5**: 21/21 runs exactly as described → `"onetwothree"` (11 bytes). With 1 ms between the writes → `"one"` (3 bytes). Same code, different chunks: no message edges.
- **D6**:
```
[0.30s] X | X: opening /tmp/f2 for reading...        <- blocked in open(O_RDONLY): no writer on f2
[0.48s] Y | Y: opening /tmp/f1 for reading...        <- blocked in open(O_RDONLY): no writer on f1
[2.63s] X, Y | still blocked -> killed
Fix (Y opens f2 for WRITING first):  X: both open (in=3 out=4)   Y': both open (in=4 out=3)
```
- **D7**: see §5.4 (`./d7`).

### 5.15 ⭐ Find-the-bug practice programs (new; built only from class material; all verified)
Each program compiles cleanly with `-Wall`. Run it in your head first, then open the answer.

#### Practice 1 — "Why does the count take 20 seconds?"
```c
/* bug1_helper.c — count three lines with wc -l ... why does the answer take 20 s? */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void)
{
    int p[2];
    pipe(p);
    pid_t counter = fork();
    if (counter == 0) {                       /* child 1: becomes wc -l */
        dup2(p[0], 0);
        close(p[0]); close(p[1]);
        execlp("wc", "wc", "-l", NULL);
        perror("execlp"); exit(1);
    }
    pid_t helper = fork();
    if (helper == 0) {                        /* child 2: a long-lived helper */
        sleep(20);                            /* pretend to do 20 s of other work */
        exit(0);
    }
    close(p[0]);
    write(p[1], "a\nb\nc\n", 6);
    close(p[1]);
    waitpid(counter, NULL, 0);
    printf("parent: counter finished\n");
    waitpid(helper, NULL, 0);
    return 0;
}
```
Symptom: nothing for 20 seconds, then `3` and `parent: counter finished`.

<details><summary>Answer</summary>

- The **helper** was forked while the parent still had both pipe ends, so it inherited `p[0]` and **`p[1]`** and never closed them. This is the S06-p17 warning: "a descriptor leaked into a long-lived child is a write end you cannot close — and therefore an EOF that never arrives".
- fd tables while the parent waits:

| Process | fd 0 | fd 3 | fd 4 |
|---|---|---|---|
| counter (`wc`) | R | – | – |
| helper (sleeping) | tty | R | **W ← leaked write end** |
| parent (after its closes) | tty | – | – |

- `wc` gets EOF only when the helper exits and its fd 4 closes, 20 s later. If the helper looped forever, the program would hang forever.
- **Fix:** in the helper, first line: `close(p[0]); close(p[1]);` (Sacred Rule: every process, immediately after fork).
- Verified: buggy `3` appeared at **20.33 s**; fixed `3` appeared at **0.35 s**.
</details>

#### Practice 2 — "Why do I see the listing AND a 0?"
```c
/* bug2_swapped.c — meant to be  ls | wc -l  ... why do I see the listing AND a 0? */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void)
{
    int p[2];
    pipe(p);
    pid_t left = fork();
    if (left == 0) {                          /* becomes ls */
        dup2(1, p[1]);
        close(p[0]); close(p[1]);
        execlp("ls", "ls", NULL);
        perror("execlp ls"); exit(1);
    }
    pid_t right = fork();
    if (right == 0) {                         /* becomes wc -l */
        dup2(p[0], 0);
        close(p[0]); close(p[1]);
        execlp("wc", "wc", "-l", NULL);
        perror("execlp wc"); exit(1);
    }
    close(p[0]); close(p[1]);
    waitpid(left, NULL, 0);
    waitpid(right, NULL, 0);
    return 0;
}
```
Symptom: the directory listing appears on the screen, plus a line `0`. No hang.

<details><summary>Answer</summary>

- `dup2(1, p[1])` has the arguments **swapped**. It means "make fd 4 refer to what fd 1 refers to (the terminal)". Since fd 4 was open, it is **closed first** [S06-p15], so the `ls` child just threw away its pipe write end. Then `close(p[1])` closes the terminal copy, and fd 1 is still the terminal.

| `ls` child | fd 1 | fd 3 | fd 4 |
|---|---|---|---|
| after `pipe` + `fork` | tty | R | W |
| after `dup2(1, 4)` (swapped) | tty | R | **tty** (pipe W closed!) |
| after both closes → exec `ls` | tty | – | – |

- Write ends of the pipe left anywhere: **zero**. So `wc`'s first `read` returns 0 at once and it prints `0`, while `ls` writes to the terminal.
- **Fix:** `dup2(p[1], 1);` (source = the pipe end, destination = stdout).
- Verified: buggy → `0` + the listing; fixed → `4`, the same as `ls | wc -l` in that folder.
</details>

#### Practice 3 — "open() blocks, so I used O_RDWR"
```c
/* bug3_reader.c — "open() blocks, so I used O_RDWR" ... why does it never print done? */
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#define FIFO_PATH "/tmp/demo_fifo"
int main(void)
{
    int fd = open(FIFO_PATH, O_RDWR);         /* "so open does not block" */
    if (fd == -1) { perror("open"); exit(EXIT_FAILURE); }
    char buf[256];
    ssize_t n;
    while ((n = read(fd, buf, sizeof buf)) > 0)
        write(STDOUT_FILENO, buf, n);
    printf("reader: EOF, done\n");
    close(fd);
    return 0;
}
```
Symptom (with `mkfifo /tmp/demo_fifo` done, then `echo hello > /tmp/demo_fifo` from another terminal): it prints `hello`, then hangs forever.

<details><summary>Answer</summary>

- Opening a FIFO with `O_RDWR` makes **this process a writer too**. After `echo` closes its end, one write end is still open (the reader's own), so `read` never returns 0. The S07-p5 table says it directly: `O_RDWR` → "you will **never see EOF** — avoid it". It is the FIFO version of A2 step 2.
- **Fix:** `open(FIFO_PATH, O_RDONLY)`. Blocking in `open` is not a bug; it is the handshake ("both sides must arrive before data can flow").
- Verified: buggy → `hello`, then still blocked at 4 s. Fixed → `hello` and `reader: EOF, done` immediately after the echo.
</details>

---

## 6. Likely exam questions (only from these materials)

**Q1 (hang, short answer).** A parent reads a pipe with `while ((n = read(p[0], buf, sizeof buf - 1)) > 0) …` but never calls `close(p[1])`. The child writes three messages, closes its write end and exits. What exactly does the parent do next? Why is there no error message?

**Q2 (trace).** For the S06-p11 example, draw the descriptor table (fd 0, 1, 3, 4) of the parent and the child (a) right after `fork()` and (b) after each process's `close`. How many write ends of the pipe exist after (b)?

**Q3 (write the code).** Given `int p[2]; pipe(p);`, write the lines each child needs between its `fork()` and its `execlp` for `ls | wc -l`, then the parent's lines after both forks.

**Q4 (MCQ).** After `int fd[2]; pipe(fd);`, which is true?
(a) `fd[0]` is the write end (b) `fd[1]` is the write end (c) both ends can be read and written (d) `fd[0]` and `fd[1]` are the same descriptor

**Q5 (MCQ).** `read()` on a pipe returns 0. This means:
(a) the pipe is empty right now (b) an error occurred, check `errno` (c) every write end of the pipe is closed, so no more data will ever arrive (d) the writer sent a `'\0'` byte

**Q6 (MCQ).** A process with no SIGPIPE handler writes into a pipe whose read ends are all closed. Then:
(a) `write` blocks forever (b) `write` returns 0 (c) the process is killed by SIGPIPE and the shell shows `$?` = 141 (d) the bytes are kept until a reader appears

**Q7 (dup2).** With `fds = {3, 4}` after `pipe(fds)`, the program runs `dup2(fds[1], STDOUT_FILENO);`. Draw fds 0–4 before and after. Which descriptor did `dup2` close? Is fd 4 still open?

**Q8 (T/F + why).** "`exec` closes all open file descriptors, so a pipe end inherited by a child disappears when the child calls `execlp`."

**Q9 (FIFO).** `reader.c` [S07-p7] is started before `writer.c`. In which call is the reader blocked, and what unblocks it? What happens instead if `/tmp/demo_fifo` does not exist yet?

**Q10 (MCQ).** `open("/tmp/f", O_WRONLY | O_NONBLOCK)` when no process has the FIFO open for reading:
(a) blocks until a reader arrives (b) returns -1 with `errno = ENXIO` (c) returns a valid fd (d) creates the FIFO

**Q11 (FIFO).** While data is flowing through `/tmp/myfifo`, what size does `ls -l` show, and why?

**Q12 (buffering).** Why does `./a5 | cat` print "before fork" twice when `./a5` prints it once? Give one fix that uses only what was taught.

**Q13 (find the bug).** A parent forks a child that runs `execlp("cat", "cat", "big.log", NULL)` (≈ 200 KB) with stdout dup2'd into a pipe. The parent closes `p[1]`, calls `waitpid(pid, NULL, 0)`, and only then reads the pipe until EOF. What happens? Would a 40 KB file work? Fix it.

**Q14 (count).** For the shell command `a | b | c`: how many `fork`s, how many `pipe()` calls, how many descriptors created by `pipe()`, and how many `waitpid`s?

**Q15 (FIFO open order).** Program A runs `open("/tmp/req", O_WRONLY)` then `open("/tmp/resp", O_RDONLY)`. Program B runs `open("/tmp/req", O_RDONLY)` then `open("/tmp/resp", O_WRONLY)`. Both FIFOs exist. Do they get past their opens? What happens if B's two lines are swapped (B opens `/tmp/resp` for writing first)?

**Q16 (predict).** What does this print, and what does `echo $?` show?
```c
int p[2];
pid_t pid = fork();
pipe(p);                     /* AFTER fork */
if (pid == 0) {              /* child: reader */
    close(p[1]);
    char buf[64]; ssize_t n = read(p[0], buf, sizeof buf - 1);
    printf("child: read returned %zd\n", n);
    exit(0);
}
close(p[0]);                 /* parent: writer */
write(p[1], "hello", 5);
printf("parent: write done\n");
wait(NULL);
return 0;
```

**Q17 (write the code).** Write what the shell does in the child, before exec, for `sort < data.txt` and for `ls > out.txt`.

**Q18 (rule).** In Lab B1 (`ls -l | wc -l`), deleting which of the six `close` calls (#1–#6) makes the program hang? State the one rule.

**Q19 (recall).** Give the reasons S06-p4 lists for not using a shared file for IPC. Do pipes solve the "no boundaries" problem?

**Q20 (compare).** Ordinary pipe vs FIFO: who can use each, how long does each live, and what is the only genuinely new idea a FIFO adds?

### Answers

**A1.** The parent prints the three messages and then **blocks in `read()` forever**. The child is gone, but the parent's own `p[1]` is still a write end, and the kernel won't declare EOF while *any* write end is open, "including one held by the process that is trying to read". No error appears because nothing is wrong from the kernel's view: the parent is just asleep in `read` ("Nothing crashes. Nothing logs."). [S06-p9; Lab A2, verified]

**A2.**

| | fd 0 | fd 1 | fd 3 | fd 4 |
|---|---|---|---|---|
| (a) parent after fork | tty | tty | R | W |
| (a) child after fork | tty | tty | R | W |
| (b) child after `close(p[0])` | tty | tty | – | W |
| (b) parent after `close(p[1])` | tty | tty | R | – |

Exactly **one** write end remains: the child's fd 4. [S06-p9, p11; §5.1]

**A3.**
```c
/* child 1: ls (writer side) */
dup2(p[1], 1); close(p[0]); close(p[1]); execlp("ls", "ls", NULL); perror("execlp"); exit(1);
/* child 2: wc -l (reader side) */
dup2(p[0], 0); close(p[0]); close(p[1]); execlp("wc", "wc", "-l", NULL); perror("execlp"); exit(1);
/* parent (the shell) */
close(p[0]); close(p[1]); waitpid(left, NULL, 0); waitpid(right, NULL, 0);
```
The `close(p[1])` in the `wc` child and in the parent are the ones that matter for EOF. [S06-p17; Lab B1]

**A4.** **(b)**. `fd[0]` is the read end and `fd[1]` the write end ("1 is stdout-like, so it is where you write"). [S06-p8]

**A5.** **(c)**. It's EOF, "a verdict", not an error and not a byte. An empty pipe with a writer still open makes `read` *block* instead. [S06-p6, p11; Lab D9a]

**A6.** **(c)**. The kernel sends SIGPIPE, whose default action kills the writer; `$?` = 128 + 13 = 141. With a handler, `write` would return -1/EPIPE. [S06-p11; Lab A4, A4b, verified]

**A7.**

| | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| before | tty | tty | tty | R | W |
| after | tty | **W** | tty | R | W |

`dup2` closed **fd 1's old connection (the terminal)**, because dstfd was open. fd 4 is **still open**; fd 1 and fd 4 now share one open file description. [S06-p15, p16, verified fds 3/4]

**A8.** **False.** `execve` throws away code, heap and stack but **keeps the descriptor table**. That is "the whole trick", and it is why a leaked write end survives into the new program. [S06-p17]

**A9.** It is blocked in **`open(FIFO_PATH, O_RDONLY)`**, which waits until some process opens the FIFO for writing (the writer's `open(..., O_WRONLY)`). If the FIFO does not exist, `open` **fails at once**: `open: No such file or directory`. Only writer.c calls `mkfifo`. [S07-p5, p7; Lab A8 orders 2–3, verified]

**A10.** **(b)**: returns -1 with `errno = ENXIO`. [S07-p5, verified]

**A11.** **0**. "Size is always 0. No data is ever stored on disk": the bytes live in the kernel's pipe buffer, not in the file. [S07-p4, verified with unread bytes inside]

**A12.** With stdout a pipe, printf is fully buffered, so "before fork\n" is still in the user-space buffer when `fork` copies the process. Child and parent each flush their copy at exit. On a terminal it was flushed at the `'\n'` before the fork. Fixes: use `write(1, "before fork\n", 12)` (write talks to the kernel), or print it to stderr (not buffered). [S06-p6; Lab A5, A3, verified]

**A13.** It **hangs**. After 64 KiB the pipe is full, so `cat` blocks in `write`, waiting for a reader. The only reader is the parent, which is waiting in `waitpid` for `cat` to exit. A 40 KB file **works**, because it fits in the 65 536-byte pipe. Fix: move `waitpid` **after** the read-until-EOF loop. [S06-p8, p11; Lab D2, verified with seq: 63 894 B ok, 66 894 B hang]

**A14.** **3** forks, **2** `pipe()` calls, **4** descriptors, **3** `waitpid`s. [Lab D8 pattern; S07-p9]

**A15.** **Yes, they get past their opens.** A's `open(req, O_WRONLY)` waits for a reader and B's `open(req, O_RDONLY)` waits for a writer, so the two pair up and both return. Then A's `open(resp, O_RDONLY)` pairs with B's `open(resp, O_WRONLY)`. If B's lines are swapped, B blocks in `open(resp, O_WRONLY)` waiting for a reader of resp, while A blocks in `open(req, O_WRONLY)` waiting for a reader of req. Each reader-open is the other program's *second* line, so neither is ever reached: **deadlock**. [S07-p5; Lab D6 pattern; both cases verified]

**A16.** It prints `child: read returned 0` and nothing else, and `echo $?` shows **141**.
- Each process created **its own** pipe after the fork.
- The child closed the only write end of *its* pipe, so it gets EOF immediately.
- The parent closed the only read end of *its* pipe, so its `write` gets **SIGPIPE** and the parent dies before printing.
- Lesson: create the pipe **before** `fork` [S06-p9 correct flow; S06-p11 SIGPIPE; verified].

**A17.**
```c
/* sort < data.txt */                         /* ls > out.txt */
int fd = open("data.txt", O_RDONLY);          int fd = open("out.txt", O_WRONLY|O_CREAT|O_TRUNC, 0644);
dup2(fd, 0);                                  dup2(fd, 1);
close(fd);                                    close(fd);
execlp("sort", "sort", NULL);                 execlp("ls", "ls", NULL);
```
[Lab B2, B3, table on Lab1-p12]

**A18.** **#4** (the `wc` child's write end) and **#6** (the parent's write end). The rule: `wc` is the only process waiting for EOF, and EOF depends only on **write** ends. A missing close hangs exactly when it leaves a write end open in a process that stays alive while `wc` waits: `wc` itself, or the parent waiting for `wc`. Read ends never matter, and `ls`'s extra write end dies with `ls`. [Lab1-p11, verified]

**A19.** (1) **No notification**: nothing wakes you when data lands. (2) **No boundaries**: where one message ends is your problem. (3) **Racing offsets**: writers overwrite each other. The slide says "four counts" but lists three. Pipes do **not** solve "no boundaries": a pipe is a byte stream, so three quick writes can arrive in one read as `"onetwothree"`. [S06-p3, p4; Lab D5, verified]

**A20.** An ordinary pipe can only be used by related processes (fork inheritance, a common ancestor) and exists only while they run (in memory). A FIFO can be used by unrelated processes ("any can use") and persists in the filesystem until deleted (`unlink`/`rm`). The only new idea is **`open()` semantics**: open is a handshake that blocks until both sides arrive; after that, everything is the same as `pipe()`. [S07-p2, p3, p5, p8]

---

## 7. Self-check

- [ ] I can explain why a pointer can't be handed to another process, and define IPC and "byte stream". [S06-p3]
- [ ] I can explain file descriptor vs descriptor table vs open file description ("ticket" vs "bookmark"), and what 0, 1 and 2 are. [S06-p5]
- [ ] I can say from memory which end of `pipe(fd)` is read and which is write, and give the Linux pipe capacity (65 536 bytes). [S06-p8]
- [ ] I can draw the fd table of parent and child after `pipe` + `fork`, after the closes, after `dup2`, and after `exec`. [S06-p9, p15–p17; Lab1-p11]
- [ ] I can state the pipe rules: EOF only when all write ends are closed; `write` blocks when full; `write` with no reader → SIGPIPE (`$?` 141) or -1/EPIPE if caught. [S06-p6, p11; Lab A3, A4]
- [ ] I can write the dup2 → close → exec code for both sides of `a | b`, and the shell's `>` and `<` in C. [S06-p17; Lab B1, B2, B3]
- [ ] Given a hanging program, I can find the leftover write end (or the wrong order, or the full pipe) and say which process is stuck in which call. [§4.11; Lab A2, B1, C1, C2, C6, D2]
- [ ] I can explain why `printf` output can appear twice, too late or never around `fork`, `dup2` and pipes, and fix it with `write`. [S06-p6; Lab A5, C6]
- [ ] I can create a FIFO in C (`mkfifo` + EEXIST check) and in the shell, and predict from the `open()` table which open blocks and what unblocks it. [S07-p4, p5; Lab A8, D6]
- [ ] I can describe how the shell builds an N-stage pipeline (prev_read loop) and count its forks, pipes, descriptors and waitpids. [S07-p9; Lab C4, D8]
