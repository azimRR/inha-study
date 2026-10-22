# W6-TermProject — raw text (verbatim from the professor's PDF)
Source: W6 - Term Project - Details 1 v1.0.pdf · 9 pages

---

## Page 1

SOC 3010 OPERATING SYSTEMS - TERM PROJECT | Details 1 (v1)
Operating Systems • Inha University in Tashkent • Fall 2026 — the ﬁrst half of the project
There are no intermediate deliveries and no checks before the upload: you decide when your team starts and
how fast it goes. Everything is collected once, at the end of the semester, and judged at the fair. Term Project
Details 2 arrives after the midterm with the additions for the second half of the course, your team's twist cards, the
grading and the dates; this document is what you can build today.
Every team builds the same thing: a small job runner. A job is a shell command somebody wants executed on
another computer — sort big.txt, gcc -o game game.c, sleep 30. Three programs cooperate:

the client — a short command-line program: it submits
a job, asks what happened to it, cancels it, or fetches its
output;

the server — one process, always running: it accepts
clients, keeps the queue of jobs, and decides which job
runs next and on which worker. That decision is your
scheduling policy;

the worker — a process on another machine:
it connects to the server, receives a job, runs it as a child process, captures its output, enforces its time
limit, and reports the exit status honestly.
Clients talk to the server over a socket; the server talks to workers over TCP, because workers live on other laptops.
The whole course so far is in this picture: fork, exec, wait and signals, a scheduling policy, a pipe that captures a
child's output, a queue under a semaphore, sockets and a server for many clients.

---

## Page 2

SOC 3010 OPERATING SYSTEMS - TERM PROJECT | Details 1 (v1)
In pseudo-code, the whole system is this; the rest of this document is detail.
At the fair, the server and at least one worker run on two diƯerent physical laptops. A one-laptop demo
scores zero for the whole project.

The delivered system runs on Ubuntu Linux. Server, worker and client are written in C; shell is allowed only
for build glue and test scripts.

A component whose declared owner cannot explain it at the fair scores zero for that member. The team is
not punished for one passenger, and the passenger is not carried by the team.

Work a student cannot explain or modify live, at the fair, is graded as absent.

Until the fair, two virtual machines on one laptop are ﬁne for development. Bridged networking, which
lets two laptops see each other over Wi-Fi, will be shown in class.
The system splits into ﬁve components, one owner each; a team of six declares the sixth component in the table.
Anyone may touch the code, but the owner is the person the examiner questions about it at the fair and the one
who must change that code live.
Client:
    connect to server
    send("submit", cmd, timeout)
    id = receive()
    print(id)
    -- later --
    send("status", id)
    print(receive())
Server:
    loop {
        c = accept()
        serve c without
          blocking the others
        on submit: queue.add(job)
        when a worker is free:
          job = policy.next(queue)
          send job to that worker
        on report: job.state = …
    }
Worker:
    connect to server
    loop {
        job = receive()
        pid = fork()
        child: exec(job.cmd),
               stdout → pipe
        parent: start timer,
          collect output,
          wait(pid) → status
        send report(id, status, output)
    }

---

## Page 3

SOC 3010 OPERATING SYSTEMS - TERM PROJECT | Details 1 (v1)
Component
What the owner personally delivers, and is asked about
Protocol and client
The wire format (message names, ﬁelds, framing, error replies), the client
program. "A client dies half way through a submit. Where does your read loop
handle that?"
Scheduler and policy
The job queue, the chosen policy, the dispatch decision, a trace that proves
the policy behaves as claimed. "Switch to priority now. What starves, and
what stops it?"
Worker and limits
The worker: fork, exec, wait, output capture, the timeout kill, honest exit
status, no zombies. "Which line turns a timeout kill into KILLED, not DONE
0?"
Durability and recovery
In Phase 1: the job table and its states, cancel, what happens when a worker
says goodbye. Phase 2 adds the rest. "I cancel a running job. Which
processes notice, and how?"
Operations and report
The Makeﬁle, the repository and its history, the report. In a team of ﬁve, also
everything in the next row. "Show me a fresh clone building, and where the
trace in your report came from."
Testing and load (the sixth
component, teams of six)
The script that starts eight clients at once, a self-check script that runs the
twelve rows of §5.4 unattended, the zombie and descriptor checks. "Run the
test that proves no descriptor leaks. Which check would have caught last
week's bug?"

Write the owner of every component and the team leader into README.md in the ﬁrst commit of your
repository, next to your team number. Nobody checks it before the end of the semester, but your git history
shows when you actually started, and that the work was not prepared one day before the deadline.

The team leader is a role, not a component. Every team names one: the leader coordinates, runs the
weekly meeting, merges the branches and keeps the report moving, and still owns one of the components
like everyone else. There is no component called "management".

A team of six declares six components. A team of ﬁve declares ﬁve, the operations owner taking testing and
load as well. A team that is smaller than ﬁve, for whatever reason, still declares all ﬁve components:
the members divide them among themselves, a member may own more than one, and each member
answers the questions on every component they own at the fair. That is the team's own responsibility; the
project does not get smaller with the team.

Every job id your server issues starts with your team number: team 12 issues T12-1, T12-2, …

---

## Page 4

SOC 3010 OPERATING SYSTEMS - TERM PROJECT | Details 1 (v1)
A job runs under fork and exec on a worker, always through the shell: the child execs /bin/sh with -c and the
command string, so that exit 3, pipes and quotes behave exactly as they do in a terminal. Do not split the
command into words yourself. Output is captured through a pipe or a ﬁle on the worker and kept where fetch can
ﬁnd it, on the server or on the worker: your design.
Every job carries a timeout chosen by the client. The worker starts a timer with the job; if the job is still running
when it ﬁres, the worker kills it and the state becomes KILLED TIMEOUT. The kill must take everything the job
started: sh -c "sleep 100" is two processes, and killing only the shell leaves sleep alive.
The worker must remember why it killed a job, because waitpid cannot tell a timeout from a cancel from a kill by
somebody else.
Timeout → KILLED TIMEOUT; cancel → CANCELLED; anything else → KILLED SIGNAL with the number.
A worker runs at most K jobs at once (K is given on the worker's command line, default 1) and tells the server its K
in its ﬁrst message; the server keeps a count of free slots per worker. Whenever a worker has a free slot, the server
picks the next QUEUED job: that choice is the policy. FIFO, the oldest job ﬁrst, is the minimum and where
everyone starts. Beyond it, choose one of these or design your own, and name it in the report:

Shortest job ﬁrst — the job with the smallest timeout ﬁrst, the timeout being your only estimate of length.
Long jobs starve; aging ﬁxes that.

Priority with aging — highest priority ﬁrst. 9 is the highest; the default 0 is the lowest, so a job that says
nothing never jumps the queue. A job that has waited long enough gains priority, so nobody waits forever.

---

## Page 5

SOC 3010 OPERATING SYSTEMS - TERM PROJECT | Details 1 (v1)

Multi-level feedback queue — several queues, demotion after a quantum. Preemptive, so the server must
tell the worker to pause and resume a job, because only the worker can signal it (SIGSTOP and SIGCONT
on the job's process group); a paused job stays on its worker, frees its slot, and still reports RUNNING.
Hard.
The assistant's script never tests the policy; your report's trace and the scheduler owner's questions at the fair do.
A team that stays with FIFO has nothing to say there and nothing to defend. The optional priority on submit is an
integer 0–9; FIFO and shortest job ﬁrst ignore it.

The server serves at least 8 clients at once. A client that connects and says nothing for ten seconds must
not stop another client from submitting. A server that forks per client, or keeps a pool, does this; the one-
at-a-time server does not.

Zero zombies. Every child is reaped: the SIGCHLD reaper with the waitpid(-1, …, WNOHANG) loop
from Homework 1, or a waitpid on each job you know.

Zero leaked ﬁle descriptors. Close both pipe ends where they are not needed (the closing rule for pipes)
and every connection you ﬁnish with. We count open ﬁles before and after a hundred jobs; the number
must not grow.

Clean shutdown on SIGTERM. Handle the signal; do not die from it. The server prints a line, closes its
listening socket and exits within two seconds; a new server on the same port starts immediately
afterwards. A worker on SIGTERM kills its running jobs, reaps them, reports them as KILLED SIGNAL 9, and
only then exits, also within two seconds. If the server cannot be reached at that moment, the worker still
kills, reaps and exits; the report is best eƯort, never a reason to hang. A worker that vanishes without
warning is Phase 2's subject.
Client to server: TCP. Server to worker: TCP, and the worker connects to the server, so the server needs no list of
workers and your laptops' ﬁrewalls stay closed. The wire format is yours. One line per message, ending in \n, read
in a loop, because one write is not one read. The one exception is the answer to fetch: it has many lines and
may end without a newline, so it needs a length preﬁx or an end marker. net.h from Homework 2 may be used
unchanged.
The assistant checks the core behaviour with one script, run on every team's repository, which is only possible if
every team's programs are started and driven the same way. The contract below is therefore exact; the inside of
your programs and your protocol are free. Deviating from it fails every check the script cannot reach.
 (we will cover the make soon)

---

## Page 6

SOC 3010 OPERATING SYSTEMS - TERM PROJECT | Details 1 (v1)

---

## Page 7

SOC 3010 OPERATING SYSTEMS - TERM PROJECT | Details 1 (v1)
The script compares the ﬁrst line of the client's standard output and the exit code: extra lines after the ﬁrst are
harmless, extra words on the ﬁrst line are not. "Within 2 s" below is generous; the script waits twice that.

---

## Page 8

SOC 3010 OPERATING SYSTEMS - TERM PROJECT | Details 1 (v1)
Each row is pass or fail. A row the script cannot run because the contract was not followed fails.

---

## Page 9

SOC 3010 OPERATING SYSTEMS - TERM PROJECT | Details 1 (v1)
