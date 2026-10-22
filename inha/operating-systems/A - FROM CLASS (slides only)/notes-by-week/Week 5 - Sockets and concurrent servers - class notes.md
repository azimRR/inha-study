# Week 5 — Sockets & concurrent servers (CLASS NOTES — from slides only)

> **Sources:** Slide 10 "Sockets" **[S10-p#]** (17 pages, dated 10/4/2026) · Slide 11 "Concurrent Servers" **[S11-p#]** (16 pages, dated 10/6/2026) · the `example_socket` code: **[net.h] [echo_server.c] [server_one.c] [client.c]** (the extracted folder is byte-for-byte identical to `example_socket.zip`).
> **Also class material, used only where a slide names a program that is missing from `example_socket.zip`:** **[HW2-starter]** `server_fork.c`, `timed_client.c` and `server_pool.c` (in `assignments/HW2 - hw2-starter/`), and **[HW1 4.2]**, the "waitpid loop" that S11-p7 points to.
> **Track A only.** ⭐ = the slide's own emphasis (its yellow banner line) · ⚠️ = typo, bug or gotcha · 🔎 = not explained in class, so look it up in Track B.
> SOC3010-003 · Prof. Yusupov Jalolliddin · Midterm (25%) in week 8 (24–30 Oct 2026).

---

## 1. Big picture

- **A socket is one end of a two-way conversation between two processes.** The OS hands it to you as an ordinary file descriptor. In the slides' words: ⭐ "A socket is a pipe that can leave the machine — and works in both directions." [S10-p3, p4]
- **Addressing:** the IP address picks the machine and the port picks the process. The OS keeps a port → process table, and a port can have only one owner, so a second owner gets `Address already in use`. [S10-p5]
- **Only three new verbs.** The server calls `listen` then `accept`; the client calls `connect`. After that both sides just use `read`, `write` and `close`. Behind the three verbs the OS makes **five** system calls (`socket`, `bind`, `listen`, `accept`, `connect`) and keeps a **listen queue** of callers on hold. The server must start first, or the client gets `Connection refused`. [S10-p6, p9]
- **A server has two kinds of socket.** One **listening** socket `L` never carries conversation bytes. Every `accept` creates a new **connection** socket, which is a private line to one client. [S10-p8]
- **Who sleeps when:** `accept` sleeps until a caller arrives and `read` sleeps until data arrives. When the other side closes, or its process dies, `read` returns **0**. [S10-p7, S11-p15]
- **TCP is a reliable, in-order byte stream, but one `write` is not one message.** Both sides must agree on **framing**: end every message with `'\n'` (what `read_line` does) or start it with its length. [S10-p13, p14]
- **Unix domain sockets** use the same calls, but the address is a **file name** and the bytes never leave the machine. [S10-p15]
- ⭐ "A server is judged by what happens to the second client." Four designs are taught:
  1. one at a time;
  2. a process per client (`fork`; close the sockets you won't use; reap zombies with a SIGCHLD handler and `SA_RESTART`);
  3. a fixed pool of N processes (fork once; the OS wakes exactly one worker per caller);
  4. `select`/`poll` (one process, and the OS says which phone is ringing).

  [S11-p2…p13]
- **`fork` copies memory; it does not share it.** That is why the visitor counter shows "1, 1, 1". Shared data needs shared memory plus a semaphore, or a single-process design. [S11-p9, p10, p13]
- **There is no best design.** Choose by asking how many clients there are, how long each job takes, and what they must share. The helper `net.h` hides the boilerplate, including `SO_REUSEADDR`, which "lets you restart the server at once on the same port". [S11-p14, net.h]

---

## 2. Page-by-page notes

### SLIDE 10 — Sockets (17 pages)

### [S10-p1] Title slide
- "SOC 3010 Operating Systems", **IPC III: Sockets and Concurrent Servers**, instructor Jalolliddin Yusupov, dated 10/4/2026. The picture (Tux the penguin on a circuit board) is decorative.

### [S10-p2] Course Topics & Weekly Lecture Breakdown
- **Lecture topic:** "Sockets and Concurrent Servers (TLPI Ch 56-61)".
- **The topic list (verbatim items):**
  - the socket system calls, the listen queue, and message framing over a byte stream;
  - handling the death of a peer and the reuse of an address;
  - Unix domain sockets, peer credentials, and passing an open file between processes;
  - server architectures: one client at a time, a process per client, a pool of processes; select and poll.
- **Side text, paraphrased:** until now every pair of processes we connected lived on the same machine; today the pipe gets long enough to reach another computer.
- **Reading:** Silberschatz §3.8 (communication in client–server systems). Optional: TLPI ch. 56–60.
- **Where each listed topic is actually taught:**

  | Topic | Pages |
  |---|---|
  | socket calls | [S10-p6, p9, p10] |
  | listen queue | [S10-p9], [S11-p3] |
  | framing | [S10-p13, p14] |
  | death of a peer | `read` returns 0 [S10-p7]; the OS closes a dead process's sockets [S11-p15]; Server X's clients never see the end of the call [S11-p6] |
  | reuse of an address | `Address already in use` [S10-p5, p10, p13], plus the `SO_REUSEADDR` line in [net.h] |
  | Unix domain sockets | [S10-p15] |
  | server architectures | Slide 11 |

- ⚠️ The header says "WEEK IV", but this is the Week 5 deck (folder W5, dated 10/4/2026).
- ⚠️ The TLPI range is "Ch 56-61" in the topic box but "ch. 56–60" under Reading.
- ⚠️ "Peer credentials" and "passing an open file between processes" are listed, but **no page in Slide 10 or Slide 11 covers them**. 🔎 Look up in Track B: peer credentials and passing a file descriptor over a Unix domain socket.

### [S10-p3] The Last Branch of the IPC Tree
- **Comparison table:**

| mechanism | who can talk | where | what travels |
|---|---|---|---|
| pipe (W3) | a parent and its children | same machine | one way, bytes |
| FIFO (W3) | any process that knows the path | same machine | one way, bytes |
| message queue (W4) | any process that knows the name | same machine | whole messages |
| shared memory (W4) | processes that share it | same machine | no messages at all: the same bytes |
| **socket (today)** | **any process that knows the address** | **any machine in the world** | **two ways, bytes** |

- **A new job for the OS:** before sockets, the OS only moved data between two of its *own* processes. With a socket, **two operating systems cooperate**: yours hands the bytes to the network, and the other one delivers them to the right process.
- **Why it matters:** every web page, chat message, online game, database query and Telegram sticker you ever sent went through a socket.
- ⭐ "A socket is a pipe that can leave the machine — and works in both directions."

### [S10-p4] What Is a Socket?
- **Diagram:** two boxes.
  - Left, **YOUR LAPTOP**: a *client process* ("a browser, our client.c") holding a *socket* (a yellow phone icon), with an OPERATING SYSTEM bar underneath.
  - Right, **ANOTHER COMPUTER**: a *server process* ("a web server, our server.c") holding its own socket, also above an OPERATING SYSTEM bar.
  - Between the two sockets runs **"a connection"**: two orange arrows labelled "bytes in both directions", over "… the network …".
- **"Four names, all new today"** (short definitions, quoted):
  - **Socket** — "one end of a conversation between two processes." The OS creates it and gives it to you as a **file descriptor** (the "ticket number" of Week 3).
  - **Connection** — "two sockets joined together: a two-way stream of bytes."
  - **Server** — "the process that **waits** to be called."
  - **Client** — "the process that **calls**."
- **Think of a telephone:** the socket is the phone on your desk, the connection is the call, the server is a shop waiting by its phone, and the client is the customer who dials. Both sides can talk and listen on the same call; a pipe could only do one direction.
- ⭐ "A socket is a telephone the OS hands to your process."

### [S10-p5] The Address: Which Machine, Which Process?
- **IP address** = *which machine*, like the address of a building. Examples: `192.168.1.7`, `142.250.74.46`.
- **port** = *which process on that machine*, like the apartment number. It is "a number from 0 to 65535".
- **`localhost`** = a special name for *this same machine* (`127.0.0.1`). Client and server on one laptop is perfect for testing.
- **Well-known ports:**

| port | who usually lives there |
|---|---|
| 22 | remote login (ssh) |
| 80 / 443 | web servers (http / https) |
| 5432 | PostgreSQL database |
| **5000** | **our examples** (below 1024 only the administrator may use) |

- **The OS keeps the table port → process.** When bytes arrive for port 5000, the OS finds the process that owns port 5000 and wakes it up. **Two processes cannot own the same port**: the second one is told `Address already in use`.
- **Picture:** a doormat reading "THERE IS NO PLACE LIKE http://127.0.0.1", a joke that home is localhost.
- **One word: TCP.** This is the kind of connection we use: **reliable and in order**, with nothing lost and nothing swapped. *How* TCP manages that belongs to the Networks course.
- ⭐ "The IP address finds the machine; the port finds the process."
- ✅ **Verified on this Mac:** the unmodified class `./echo_server` printed `bind: Address already in use`, because `lsof` shows a system process (`ControlCenter`) already owns `*:5000`. This is the slide's rule happening live, and it happens even though `net.h` sets `SO_REUSEADDR` (see §5.8). 🔎 Look up in Track B: why macOS keeps port 5000 busy, and how to free it. All other tests below used port **5050**.

### [S10-p6] A Phone Call in Pseudo-Code
**Server — the shop:**
```
Server:
  L = listen(5000)        /* install a phone,
                             number 5000         */
  C = accept(L)           /* wait for a ring,
                             pick up             */
  name = read(C)          /* listen              */
  write(C, "hello " + name)
                          /* answer              */
  close(C)                /* hang up             */
```
**Client — the customer:**
```
Client:
  C = connect("shop-address", 5000)
                          /* dial                */

  write(C, "Ali")         /* talk                */
  reply = read(C)         /* listen              */
  print(reply)            /* hello Ali           */

  close(C)                /* hang up             */
```
- **Only three new verbs:** `listen`, `accept`, `connect`. After those it is `read`, `write`, `close`, the same calls you used on files, pipes and FIFOs. To your program a connection is just another file descriptor.
- **Who must start first? The server.** A client that dials a number where nobody is listening gets `Connection refused` at once.
- The meme ("When your websocket just won't connect…") is decorative.
- ⭐ "Server: listen, accept. Client: connect. Then both simply read and write."

### [S10-p7] Draw It: Who Sleeps When? ⭐ (sequence diagram)
**The diagram, redrawn in text.** Time goes down, each vertical line is one process, arrows are things travelling through the network, and ░ marks a process that is asleep.
```
 SERVER                                         CLIENT
 L = listen(5000)
 C = accept(L)
   ░ asleep    <──── "may I connect?" ─────── C = connect(server, 5000)
 accept returns C
 read(C)
   ░ asleep    <──── "Ali" ────────────────── write(C, "Ali")
                                              read(C)
 write(C, "hello Ali") ──── "hello Ali" ────>   ░ asleep, then woken
               <- - - - "goodbye" - - - - - - close(C)
 read(C) returns 0
 close(C)
```
- **Time goes down the page:** each vertical line is one process, an arrow is something travelling through the network, and a grey block means **the process is asleep**.
- **Two calls that sleep:**
  - `accept` sleeps until a client connects.
  - `read` sleeps until bytes arrive.

  The OS wakes the process. A sleeper uses **no CPU** (state `S` in `ps`), exactly like a reader on an empty pipe.
- **The end of a call:** when one side closes, the other side's `read` returns **0**. That is end of file, the same signal a pipe gives when all its writers are gone (Week 3).
- ⭐ "accept sleeps for a caller; read sleeps for data; a closed call reads as 0."
- ✅ Verified (§5.9): when a connected client was killed with `kill -9`, the echo server's `read` returned 0 and it printed `server: the client left`.

### [S10-p8] Two Kinds of Socket in a Server ⭐
**Diagram: the server process's descriptor table.**

| fd | entry | connected to |
|---|---|---|
| 0 | stdin | |
| 1 | stdout | |
| 2 | stderr | |
| 3 | **L listening socket** (highlighted) | "the reception phone, port 5000" |
| 4 | C call with client A | "private line to client A" |
| 5 | C call with client B | "private line to client B" |

```
L  = listen(5000)     /* descriptor 3 */
C1 = accept(L)        /* descriptor 4 */
C2 = accept(L)        /* descriptor 5 */
```
- **The listening socket** never carries a single byte of conversation. Its only job is to receive new calls, just as a shop has *one* public number.
- **The connection socket:** *every* `accept` returns a **new** descriptor, a private line to exactly **one** client. You talk on it, then `close` it. Two clients means two private lines, and their bytes can never mix.
- **"Lowest free number":** the OS hands out descriptors the same way as in Week 3. Since 0, 1 and 2 are taken, the first socket is 3.
- ⭐ "One listening socket; one new connection socket for every client."
- ✅ Verified (§5.9): a test using `server_listen` and two `server_accept` calls printed `L = 3, C1 = 4, C2 = 5`.

### [S10-p9] What the OS Really Does Behind the Three Verbs ⭐
| our verb | real system calls | what the OS does |
|---|---|---|
| `listen(5000)` | `socket()` | creates the phone (a new descriptor) |
| | `bind()` | writes "port 5000 → this process" into its table |
| | `listen()` | switches the phone on and starts a **waiting queue** for callers |
| `accept(L)` | `accept()` | takes the first caller out of the waiting queue and gives you a **new** descriptor for that call; **sleeps if the queue is empty** |
| `connect(host, 5000)` | `socket()` | creates the client's phone |
| | `connect()` | your OS and the server's OS exchange **three short messages** ("hello?" — "hello, I hear you" — "good"), and then the call exists |

- **The listen queue (callers on hold):** while your server is busy with one client, **the OS answers the phone for you** and keeps the new callers in a queue. They are *connected*, but nobody is talking to them yet.
- **"Do I have to memorise five calls?"** No. In this course the five calls and their structures are packed into the helper `net.h`, the same idea as `shared_mem.h`. You should be able to **recognise** the names when you meet them in real code.
- ⭐ "You say three verbs; the OS makes five system calls and keeps the queue."
- 🔎 Look up in Track B: the proper name of the three-message exchange (the slide only describes it in words).

### [S10-p10] net.h: Networking in Three Calls, Given to You
"NET.H — ON ECLASS; READ IT ONCE, NEVER MEMORISE IT"
```c
#include "net.h"

int server_listen(int port);                    /* returns L */
int server_accept(int L);                       /* returns c */
int client_connect(const char *host, int port);
                                                /* returns c */

int read_line(int c, char *buf, int size);
                         /* one whole line = one message */
```
- **Each call returns a file descriptor.** From then on you use `read(c, …)`, `write(c, …)` and `close(c)`; nothing is new.
- **How to use it:** put `net.h` in the same folder as your `.c` file, write `#include "net.h"`, and compile as always: `gcc -o server server.c`.
- **If something goes wrong,** the helpers print the reason and stop the program:
  - `bind: Address already in use` means another server already owns that port.
  - `connect: Connection refused` means no server is listening there.
- **Why a helper?** The real calls need three structures and about 25 lines of setup that are the same in every program on Earth. The *logic* is what we study.
- ⭐ "Three calls to get a descriptor; after that it is read, write, close."
- **What each helper wraps** (read off [net.h]; the full walk-through is in §5.1):

  | helper | real calls inside |
  |---|---|
  | `server_listen` | `socket` → `setsockopt(SO_REUSEADDR)` → `bind` → `listen(fd, 16)` |
  | `server_accept` | `accept` |
  | `client_connect` | `getaddrinfo` → `socket` → `connect` |
  | `read_line` | `read` one byte at a time until `'\n'` |

- ⚠️ A stray `<p>` appears before "gcc -o server server.c" (HTML left over in the slide text).
- ⚠️ Small imprecision: "each call returns a file descriptor" is true of the three calls, but `read_line` (in the same box) returns a **count**, which is 0 at end of file [net.h comment].

### [S10-p11] Example: The Echo Server
```c
/* echo_server.c — sends back whatever a client says. One client at a time. */
#include <stdio.h>
#include <unistd.h>
#include "net.h"

int main(void) {
    int L = server_listen(5000);            /* the reception phone */
    printf("server: waiting on port 5000\n");

    while (1) {
        int c = server_accept(L);           /* sleeps until a client calls */
        printf("server: a client connected\n");

        char buf[100];
        ssize_t n;
        while ((n = read(c, buf, sizeof buf)) > 0)   /* 0 = client hung up */
            write(c, buf, n);                        /* send it back        */

        printf("server: the client left\n");
        close(c);                           /* hang up this call */
    }
}
```
- **Read it top to bottom:** open port 5000, then forever take the next caller, send back everything they say, and hang up when they leave.
- **The inner loop:** `read` returns how many bytes arrived, and **0 means the client closed**. Until then, whatever comes in goes straight back out.
- **"Echo"** is the "Hello, World" of servers. It has no logic of its own, so everything you see is plumbing.
- Step-by-step explanation and a verified run are in §5.2.

### [S10-p12] Example: The Client
```c
/* client.c — sends one message to the server and prints the answer.
   Usage: ./client <host> <message>        e.g.  ./client localhost hello */
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include "net.h"

int main(int argc, char *argv[]) {
    if (argc != 3) { printf("usage: %s <host> <message>\n", argv[0]); return 1; }

    int c = client_connect(argv[1], 5000);      /* dial the number */

    write(c, argv[2], strlen(argv[2]));         /* say something   */
    write(c, "\n", 1);                          /* end of message  */

    char reply[100];
    read_line(c, reply, sizeof reply);          /* listen          */
    printf("client: the server said \"%s\"\n", reply);

    close(c);                                   /* hang up         */
    return 0;
}
```
- **Read it top to bottom:** dial `<host>` on port 5000, send the message and a newline, read one line back, print it, hang up.
- **`argv[1]`, `argv[2]`** are the words you type after the program name: `./client localhost hello` gives `argv[1] = "localhost"` and `argv[2] = "hello"`.
- **Why the `"\n"`?** It marks the **end of the message**, so `read_line` on the other side knows where to stop.
- ⚠️ The slide says "More on slide 16", but framing is explained on **page 14** ("Answer: Framing the messages"). Page 16 is the Homework.
- ⚠️ The slide font draws `!=` as `≠` (and, on Slide 11, `==` as a long `═`). In C you must type `!=` and `==`; the real `client.c` has `argc != 3`.

### [S10-p13] Example: The Client (running it) + Exercise: A Socket Is a Stream of Bytes
*Layout note: this page holds two slides' worth of content. The top half runs the example; the bottom half starts the framing exercise.*
- ⭐ "Start the server first; then anyone who knows the address and the port can call."

**Terminal 1 — the server:**
```
$ gcc -Wall -o echo_server echo_server.c
$ ./echo_server
server: waiting on port 5000
server: a client connected
server: the client left
server: a client connected
server: the client left
```
**Terminal 2 — the client:**
```
$ gcc -Wall -o client client.c
$ ./client localhost hello
client: the server said "hello"
$ ./client localhost "operating systems"
client: the server said "operating systems"
```
- **Now leave the machine:** on the same Wi-Fi, ask a classmate for their address (`hostname -I`) and run `./client 192.168.1.7 hello`. Their terminal prints "a client connected", and you have built the internet's smallest service.
- **Two errors you will meet today:**
  - `connect: Connection refused` means you started the client first.
  - `bind: Address already in use` means you started the server twice.
- ⚠️ `hostname -I` is not available on a Mac: I ran it and got `hostname: illegal option -- I`. 🔎 Look up in Track B: how to find your IP address on macOS.

**Exercise: A Socket Is a Stream of Bytes**
```
Client:
  C = connect(server, 5000)
  write(C, "HELLO")
  write(C, "WORLD")
  close(C)

Server:
  L = listen(5000)
  C = accept(L)
  n = read(C, buf, 100)
  print(buf)
```
- **"Which outputs are possible?"** (1) `HELLOWORLD` (2) `HELLO` (3) `HEL` (4) `WORLDHELLO`
- **Hint:** remember Week 3 — what did a pipe do with three writes of `AB`?
- The answer is on the next page.

### [S10-p14] Answer: Framing the messages ⭐
| output | verdict | reason (slide) |
|---|---|---|
| `HELLOWORLD` | **possible** | both writes arrived before the read |
| `HELLO` | **possible** | the read ran between the two writes |
| `HEL` | **possible** | the network may deliver a message in pieces |
| `WORLDHELLO` | **impossible** | TCP never changes the order |

- **Framing (marking where a message ends):** "the rule both sides follow to cut the stream back into messages." There are two classic rules:
  1. "every message ends with a special byte, usually `'\n'`";
  2. "every message starts with its length."
- **What we use is Rule 1.** The client sends `"hello\n"`, and `read_line()` from `net.h` keeps reading until it sees the `'\n'`. **One line = one message.**
- **In real life,** HTTP uses both rules: lines for the headers and a length for the body.
- **The lesson:** a socket remembers **the bytes and their order**, *not* your `write` calls. One write is **not** one message. That is exactly like a pipe, and unlike a message queue.
- ⭐ "One write is not one message: agree on where a message ends."
- ✅ Verified (§5.7): `HELLOWORLD` when the read came after both writes, and `HELLO` when the read ran between them. `HEL` did not show up on localhost, but the slide says it can happen over a real network.

### [S10-p15] Unix Domain Sockets: The Same Phone, Inside One Machine
- **Definition (slide):** a socket whose address is a **file name** instead of IP + port. It can reach processes on the **same machine** only.
```
Server:                       Client:
  L = listen("/tmp/shop")       C = connect("/tmp/shop")
  C = accept(L)                 write(C, ...)
  ...                           ...
```
```
$ ls -l /tmp/shop
srwxr-xr-x 1 root root 0 Oct  1 09:39 /tmp/shop
```
- The first letter is the file type: **`s` = socket**. (A FIFO showed `p` and a directory shows `d`.)
- **Diagram:**
  - A *Client process* and a *Server process* each contain a "Socket interface", with a dashed red arrow between the two interfaces.
  - Each interface goes down (labelled "Call" and "Return") to a "Socket" oval.
  - The two ovals meet at a green **"Socket file"** box sitting on the **Filesystem** bar, above **Kernel space**.
  - In words: both processes find each other through a socket file in the filesystem, and the data path stays inside the kernel.
- **Comparison table:**

| | |
|---|---|
| **same verbs** | listen, accept, connect, read, write, close |
| **no network** | the bytes never leave the OS: faster than localhost |
| **file permissions** | the OS decides who may call, exactly as for a file |
| **vs a FIFO** | two-way, and **every client gets its own private line**; in a FIFO all writers are mixed into one stream |

- **Who uses it:**
  - Docker (every `docker` command talks to `/run/docker.sock`);
  - PostgreSQL and MySQL for local clients;
  - your desktop (every window talks to the display server).
- ⭐ "Same calls; the address is a file name, and the call never leaves the machine."
- ⚠️ `net.h` only does TCP (`AF_INET`), so `listen("/tmp/shop")` here is pseudo-code and the class gave no C code for it. 🔎 Look up in Track B: the real C calls for a Unix domain socket.
- ✅ Verified (§5.11): `ls -l` on a live Unix socket file showed `srwxr-xr-x`, a FIFO showed `prw-r--r--`, and a directory showed `drwxr-xr-x`.

### [S10-p16] Homework
1. **Run it.** Compile `echo_server.c` and `client.c` (with `net.h`, on eClass) and run them in two terminals. Then connect to a classmate's server over Wi-Fi. Screenshot both terminals.
2. **Change it.** Make the server answer in **CAPITAL LETTERS** (`toupper` from `<ctype.h>`): the client sends `hello` and the server replies `HELLO`.
3. **On paper.** Two clients, A then B, each send one message to the echo server. Draw the time diagram (three vertical lines) and the server's descriptor table at the moment it is talking to B.
- **"Think about this before next lecture":** client A connects and then goes for lunch without sending anything. Client B connects one second later. What happens to B, and for how long? Slide 11 answers this on [S11-p2]; it is also Q8 in §6.
- ✅ Hints, verified (§5.9):
  - **Item 3:** while the echo server talks to B, `lsof` shows **fd 3 = L (LISTEN)** and **fd 4 = B's call**. A's descriptor 4 was closed after A left, and the lowest free number gets reused [S10-p8].
  - **The lunch question:** B's `connect` returned at once and B's connection showed as ESTABLISHED, but B's reply only came when A left (B waited about 4 s for a 5-second lunch).

### [S10-p17] Questions?
- Closing slide; the building photo is decorative.

---

### SLIDE 11 — Concurrent Servers (16 pages)

### [S11-p1] Title slide
- **IPC III: Concurrent Servers**, instructor Jalolliddin Yusupov, dated 10/6/2026. Decorative.

### [S11-p2] Many Clients at Once ⭐
**TODAY: A CALL CENTRE**

| | the operator picture | the server design |
|---|---|---|
| Design 1 | **one operator** | one client at a time |
| Design 2 | **a new operator for every call** | a process per client |
| Design 3 | **a fixed team** | a pool of processes |
| Design 4 | **one operator, many phones** | select / poll (the idea only) |

- **Last lecture's question, answered:** client A connects and says nothing. Client B is **put on hold by the OS** for as long as A's lunch lasts. "Today we fix that."
- ⭐ "A server is judged by what happens to the second client."

**Design 1: One Operator** (an iterative server) — the exercise:
```
Server:
  L = listen(5000)
  loop forever:
      C = accept(L)
      serve(C)            /* takes 2 seconds */
      close(C)

serve(C):
  name = read(C)
  work for 2 seconds
  write(C, "done " + name)
```
- Three clients, A, B and C, connect at the same moment (A a little first).
  - **(a)** After how many seconds does each one get its reply?
  - **(b)** While A is being served, where exactly are B and C?
  - **(c)** How busy is the CPU during these seconds?

### [S11-p3] Exercise: Answer — 2, 4, 6
```
$ ./server_one &
$ ./timed_client localhost A &
$ ./timed_client localhost B &
$ ./timed_client localhost C &
client A: got "done A" after 2 s
client B: got "done B" after 4 s
client C: got "done C" after 6 s
```
- **(a) 2, 4 and 6 seconds.** Each client waits for everybody in front of it. With 100 clients, the last one waits **200 seconds**.
- **(b) They are in the OS's listen queue.** B and C **are connected**: their `connect` returned at once, and they even sent their names. The OS is holding their calls; the server simply has not said `accept` yet.
- **(c) The CPU is idle.** The server is **asleep** almost the whole time, because our "work" is a `sleep`. (A real server would be waiting for a disk or a database.) The clients are waiting for nothing.
- (The same pseudo-code is repeated on the right of the slide.)
- ⭐ "One operator: every client pays for all the clients in front of it."
- The C version is [server_one.c] (§5.4). ⚠️ `timed_client` is **not** in `example_socket.zip`; it is in the [HW2-starter].
- ✅ Verified (§5.4): exactly 2, 4, 6 s; and 2, 4, 6, 8, 10 s with five clients.

### [S11-p4] Design 2: A New Process for Every Client
```
Server:
  L = listen(5000)
  loop forever:
      C = accept(L)
      if fork() == 0:     /* child  */
          close(L)
          serve(C)
          close(C)
          exit
      close(C)            /* parent */
```
- **The call centre:**
  - The receptionist (the **parent**) picks up, **hires a new operator** for this caller (`fork`), hands over the call, and is back at the reception phone immediately.
  - The operator (the **child**) serves one client and goes home (`exit`).
- **Why it works (Week 1):** `fork` copies the descriptor table, so the child **inherits the open call C**. Parent and child both hold it, for a moment.
- **Who makes them run at the same time?** The **OS scheduler** (Week 2). Three children are three processes, and on a 4-core laptop they really run in parallel. You wrote no scheduling code at all.
- ⭐ "The parent only accepts; every client gets its own child process."

### [S11-p5] Draw It: After fork, Who Holds What? ⭐
**Diagram: four descriptor tables, left to right.**

| moment | process | fd 0–2 | fd 3 (`L listening`) | fd 4 (`C the call`) |
|---|---|---|---|---|
| right after fork | parent | terminal | held | held |
| right after fork | child | terminal | held | held |
| after the closes | parent | terminal | **held** | ~~crossed out~~ |
| after the closes | child | terminal | ~~crossed out~~ | **held** |

- Under the first two tables: "both processes hold both sockets".
- A yellow arrow leads to the last two: "each keeps only what it uses".
- ⭐ "After fork: the parent closes the call, the child closes the listening socket."
- **The Sacred Rule of Closing, again.** From Week 3 (pipes): *every process closes every end it will not use, immediately after fork.* Here the parent closes **C** (the child is talking to that client) and the child closes **L** (it will never accept).
- **Why it is not just tidiness:**
  - A call ends only when **everyone** holding it has closed it.
  - If the parent keeps C, the client **never sees the end of the call**.
  - The parent's table also gains one descriptor per client until the OS refuses to give more.

  (This leads straight into Server X on the next page.)
- The same Design 2 pseudo-code is repeated on this slide.

### [S11-p6] Exercise: Three Broken Servers (part 1)
**Task:** for each server, name the bug, say **what you would see** (in the clients and in `ps`), and write the one-line fix.
```
SERVER X                    SERVER Y                    SERVER Z
loop forever:               loop forever:               loop forever:
  C = accept(L)               C = accept(L)               C = accept(L)
  if fork() == 0:             if fork() == 0:             if fork() == 0:
      close(L)                    serve(C)                    close(L)
      serve(C)                    close(C)                    serve(C)
      close(C)                    /* no exit */               close(C)
      exit                    close(C)                        exit
  /* nothing here */                                      close(C)
                                                        /* parent never
                                                           waits for children */
```
- Banner question: "Each server works for the first client. What goes wrong after 1000 clients?"

| bug | what you see | fix |
|---|---|---|
| **X — the P. never closes C** (P. = parent) | **Leaked descriptors.** Each client costs the parent one slot: 4, 5, 6 … Around the **1020th** client the OS says `Too many open files` and `accept` fails. Also, clients **never see the end of the call**. | `close(C)` in the parent |
| **Y — the Ch. never exits** (Ch. = child) | After serving, the child **falls back into the loop** and calls `accept` itself. Now the children are receptionists too, and each of them forks again. `ps` shows the number of servers **growing with every client**. | `exit` at the end of the child |

- Note on Y: the child also never closes `L`, which is why it *can* call `accept`.

### [S11-p7] Exercise: Three Broken Servers (part 2) ⭐
- (The three servers are repeated at the top of the slide.)

| bug | what you see | fix |
|---|---|---|
| **Z — nobody waits for the children** | **1000 zombies** (Week 1): finished children that nobody collected. `ps` shows `<defunct>`, state `Z`. | the **SIGCHLD handler with the waitpid loop** from Homework 1 |

- **Three weeks of this course in one loop:**
  - X is Week 3 (close what you do not use).
  - Y is Week 1 (what `fork` returns, and to whom).
  - Z is Week 1 again (reap your children).
- **Why servers make it worse:** a normal program with these bugs ends, and the OS cleans up. A server runs for **months**, so every small leak is multiplied by every client.
- ⭐ "In a server, every forgotten close, exit or wait is multiplied by the number of clients."
- **The "waitpid loop" as the class gives it.** [HW1 4.2] asks for "the loop form from Lecture 3: `while (waitpid(-1, NULL, WNOHANG) > 0) { ... }`", and the [HW2-starter] `server_fork.c` contains it:
```c
void reap(int sig) {                    /* Week 1: no zombies */
    (void)sig;
    while (waitpid(-1, NULL, WNOHANG) > 0) { }
}
```
- ✅ All three bugs reproduced (§5.5):
  - **X:** the parent kept fds 4, 5, 6, 7… open, and an EOF-reading client never saw the end of the call. With the limit lowered to 20 descriptors, client 17 got nothing and the server died with `accept: Too many open files`.
  - **Y:** the server process count went 1 → 2 → 3 → 4 → 5 over four clients.
  - **Z:** `ps` showed three children in state `Z` with name `<defunct>`.

### [S11-p8] In C: The Process-per-Client Server ⭐
```c
int main(void) {
    struct sigaction sa;
    sa.sa_handler = reap;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = SA_RESTART;
    sigaction(SIGCHLD, &sa, NULL);

    int L = server_listen(5000);
    while (1) {
        int c = server_accept(L);
        if (fork() == 0) {                  /* child: this client's own operator */
            close(L);                       /* the child never accepts           */
            serve(c);
            close(c);
            exit(0);
        }
        close(c);                           /* parent: the child has this call   */
    }
}
```
```
$ ./server_fork &
$ ./timed_client localhost A &
$ ./timed_client localhost B &
$ ./timed_client localhost C &
client A: got "done A" after 2 s
client B: got "done B" after 2 s
client C: got "done C" after 2 s
```
- **Line by line = the pseudo-code.** The first five lines install the **zombie collector**, and the loop is exactly as before.
- **`SA_RESTART` matters here.** When a child dies, the signal **interrupts the parent's sleeping `accept`**. `SA_RESTART` makes the OS start it again.
- ⚠️ `reap`, `serve` and the `#include`s (`<signal.h>`, `<sys/wait.h>`) are not on the slide. The full file is [HW2-starter] `server_fork.c` (§5.5), whose `main` is identical to this slide.
- ✅ Verified (§5.5):
  - Times were 2, 2, 2 s, and there were no zombies afterwards.
  - **Without `SA_RESTART`** (flags = 0), the first child's death made `accept` fail with `accept: Interrupted system call`. Because `server_accept` in `net.h` exits on any error, the whole server died and the next client got `Connection refused`.

### [S11-p9] Exercise: The Visitor Counter (question)
```
visitors = 0                /* a global variable */

Server:
  L = listen(5000)
  loop forever:
      C = accept(L)
      if fork() == 0:
          close(L)
          visitors = visitors + 1
          name = read(C)
          write(C, "hello " + name +
                   ", you are visitor " + visitors)
          close(C)
          exit
      close(C)
```
- Three clients connect **one after another**: Ali, then Vali, then Sami. **What does each client see?**
  - (1) visitor 1, 2, 3
  - (2) visitor 1, 1, 1
  - (3) visitor 0, 0, 0
  - (4) different on every run
```
$ ./client localhost Ali
client: the server said "hello Ali, you are visitor 1"
$ ./client localhost Vali
client: the server said "hello Vali, you are visitor 1"
$ ./client localhost Sami
client: the server said "hello Sami, you are visitor 1"
```
- **Answer: (2), everybody is visitor 1.** `fork` gives the child a **copy** of all memory (Week 1). The child adds 1 to **its own copy** and exits, so the parent's `visitors` is still 0 when the next child is born.

### [S11-p10] Exercise: The Visitor Counter (fixes)
- (The same pseudo-code is repeated.)
- **Fix A (one line):** count in the **parent**, before `fork`, by doing `visitors = visitors + 1` right after `accept`. Each child is then born with the correct number.
- **The price of Design 2:** a process per client means **private memory per client**. That is safe, because one client cannot damage another, but anything shared must be *asked for*.
- **Fix B (Week 4):** if the **children** must change shared data (a chat room, a score table), put it in **shared memory** (`shared_alloc`, before `fork`) and protect it with a **semaphore**, because now two children really can do `counter++` at the same time.
- ⭐ "Children do not share variables: fork copies, it does not connect."
- ✅ Verified (§5.10) with a test translation of this pseudo-code: the slide version printed 1, 1, 1, and Fix A printed 1, 2, 3.

### [S11-p11] Design 3: A Fixed Team (a Pool of Processes)
```
Server:
  L = listen(5000)
  repeat N times:                 /* hire the team ONCE */
      if fork() == 0:
          loop forever:
              C = accept(L)
              serve(C)
              close(C)
  wait for the children           /* parent does nothing else */
```
- **Diagram:** a yellow box "L, port 5000" with lines fanning out to **worker 1, worker 2 and worker 3**, each labelled "asleep in accept(L)".
- **How it works:** all N workers sleep in `accept` on the **same** listening socket, which they inherited. For each caller, **the OS wakes exactly one** of them, so no receptionist is needed.
- **Sounds familiar?** "At most N inside, the others wait" is last week's **counting semaphore that starts at N**.
- **Design 2 vs Design 3:**

| | |
|---|---|
| Design 2 | a `fork` for every client; 10,000 clients = 10,000 processes, so memory and the scheduler suffer |
| Design 3 | no `fork` per client; never more than N processes; but **client N+1 waits** |

- ⭐ "A pool trades a little waiting for a fixed, predictable cost."
- The C version is [HW2-starter] `server_pool.c`, with `#define POOL 2` and a parent that only does `while (wait(NULL) > 0) { }` (§5.6).

### [S11-p12] Exercise: Five Clients, Two Seconds Each
- Clients **A, B, C, D, E** connect at the same moment, in that order. Every request needs **2 seconds** of work. Fill in when each client gets its reply.
- The slide's table is **blank** (it is the exercise): rows Design 1 (one at a time), Design 2 (a process per client), Design 3 (a pool of 2) and Design 3 (a pool of 5); columns A, B, C, D, E, done, processes.
- **Questions:**
  - **(a)** Fill in the table (seconds).
  - **(b)** How many server processes exist at the busiest moment, in each row?
  - **(c)** Which design would you choose for 5 clients a day? For 50,000 at once?
```
$ ./server_pool &          # POOL = 2, then five clients
client A: got "done A" after 2 s
client B: got "done B" after 2 s
client C: got "done C" after 4 s
client D: got "done D" after 4 s
client E: got "done E" after 6 s
```
- ⭐ "More processes, less waiting — until the processes themselves become the problem."
- The filled-in table, derived from the slides' rules and **verified by running all four rows**, is Q15 in §6 and §5.4–5.6.

### [S11-p13] Design 4: One Operator, Many Phones (select / poll)
```
Server:
  L = listen(5000)
  calls = [ L ]                 /* every phone on my desk */
  loop forever:
      ready = poll(calls)       /* sleep until at least
                                   ONE phone rings      */
      for each phone in ready:
          if phone == L:
              add accept(L) to calls
          else:
              answer that client a little
```
- ⭐ "One process can serve many clients if the OS tells it which one is ready."
- **The new idea:** instead of sleeping on **one** descriptor, the process asks the OS to **"wake me when any of these has something for me."** `select` and `poll` are the two classic calls that do it.
- **Who works like this:** nginx, Redis, Node.js. They use a faster relative of `poll` called **epoll**, which the course comes back to in **Week 11**, once there are threads to compare it with.
- **Properties:**

| | |
|---|---|
| **no `fork` at all** | one process, thousands of clients |
| **memory is shared for free** | the visitor counter simply works, and no semaphore is needed, because only one thing runs at a time |
| **the danger** | one slow client job (our 2 seconds of work) **blocks everybody**, so the operator must only do short things |

- Only "the idea only" was taught [S11-p2]; there is no C code for `select`/`poll` in class. 🔎 Look up in Track B: the real `select()`/`poll()` C API (fd sets, `struct pollfd`).

### [S11-p14] Four Designs, Side by Side ⭐⭐ (the comparison table)
| design | processes | who waits | shared data? | cost | used by |
|---|---|---|---|---|---|
| **1 · one at a time** | 1 | each waits for all before it | trivially (one process) | simplest code | small tools, tests |
| **2 · process per client** | 1 + one per client | nobody waits | no — needs shared memory + semaphore | a `fork` per client; unlimited processes | PostgreSQL, sshd |
| **3 · pool of N** | 1 + N | client N+1 waits | no — same as 2 | fixed and predictable | Apache (prefork), PHP-FPM |
| **4 · select / poll** | 1 | nobody waits, if every step is short | yes, for free | harder to write; one slow step blocks all | nginx, Redis, Node.js |

- ⭐ "Choose by asking: how many clients, how long is each job, what must they share?"
- **There is no best design.** There is a **trade-off** between simplicity, waiting time, memory and safety between clients. An engineer chooses, and **an exam asks you to justify the choice**.
- **After the midterm:** Week 9 adds a **fifth design, a thread per client**. It is cheaper than a process and shares memory by default, so it needs every lock you learned in Week 4.

### [S11-p15] What the OS Did for You This Week ⭐ (summary)
| the OS … | so that … |
|---|---|
| gave you a **socket as a file descriptor** | `read`, `write`, `close` work on a network exactly as on a file or a pipe (Week 3) |
| kept the **port table** | every arriving byte was delivered to the one process that owns the port |
| kept the **listen queue** | the phone was answered while your server was busy, and the callers were held |
| **put processes to sleep and woke them** | in `accept` and `read` no CPU was wasted while waiting (Week 2: states) |
| **buffered** the bytes in both directions | a fast writer is made to wait for a slow reader, as with a full pipe (Week 3) |
| **copied the descriptor table in `fork`** | a child could inherit a live phone call (Week 1) |
| **scheduled** one process per client | they ran at the same time on your CPU cores (Week 2) |
| woke **exactly one** pool worker per caller | two workers never serve the same client |
| **cleaned up when a process died** | its sockets were closed, so the other side reads 0 instead of waiting forever |

- ⭐ "Your server is twenty lines because the operating system is twenty million."

### [S11-p16] Questions?
- Closing slide; decorative.

---

## 3. Definitions & key terms

| term | meaning as taught | ref |
|---|---|---|
| **Socket** | "one end of a conversation between two processes"; the OS gives it to you as a **file descriptor** | [S10-p4] |
| **Connection** | "two sockets joined together: a two-way stream of bytes" (the "call") | [S10-p4] |
| **Server** | "the process that waits to be called" (the shop by its phone) | [S10-p4] |
| **Client** | "the process that calls" (the customer who dials) | [S10-p4] |
| **File descriptor** | the "ticket number" (Week 3); the OS gives out the **lowest free number**, so the first socket is 3 | [S10-p4, p8] |
| **IP address** | which **machine** (the address of a building), e.g. `192.168.1.7` | [S10-p5] |
| **Port** | which **process** on that machine (the apartment number), 0–65535; below 1024 only the administrator may use it; the class uses 5000 | [S10-p5] |
| **localhost** | this same machine, `127.0.0.1`; perfect for testing | [S10-p5] |
| **Port table** | the OS's table of port → process; it delivers every arriving byte to the one owner | [S10-p5], [S11-p15] |
| **TCP** | the kind of connection we use: **reliable and in order** — nothing lost, nothing swapped | [S10-p5] |
| **Listening socket (`L`)** | "the reception phone"; never carries conversation, its only job is to receive new calls | [S10-p8] |
| **Connection socket (`C`)** | the **new** descriptor every `accept` returns: a private line to exactly one client | [S10-p8] |
| **Listen queue** (waiting queue) | callers on hold, kept by the OS while the server is busy; they are connected, but nobody is talking to them yet | [S10-p9], [S11-p3] |
| **Byte stream** | a socket remembers the bytes and their order, not your `write` calls | [S10-p14] |
| **Framing** | "the rule both sides follow to cut the stream back into messages": (1) end with a special byte, usually `'\n'`; (2) start with the length | [S10-p14] |
| **Echo server** | sends back whatever a client says; "the 'Hello, World' of servers" | [S10-p11] |
| **Unix domain socket** | a socket whose address is a **file name**; same machine only; shows as `s` in `ls -l` | [S10-p15] |
| **net.h** | the course helper that packs the five calls into `server_listen`, `server_accept`, `client_connect`, plus `read_line` | [S10-p9, p10] |
| **SO_REUSEADDR** | set by `setsockopt` inside `server_listen`; per its comment, it "lets you restart the server at once on the same port" (in the code only, not on a slide) | [net.h] |
| **INADDR_ANY** | per the comment, "any address of this machine" (the server's bind address) | [net.h] |
| **Design 1: one at a time** (iterative server) | one operator: accept → serve → close, and the next caller waits | [S11-p2, p3] |
| **Design 2: process per client** | the parent (receptionist) accepts and forks; the child (operator) serves one client and exits | [S11-p4] |
| **Sacred Rule of Closing** | every process closes every end it will not use, immediately after `fork` | [S11-p5] |
| **Zombie** | a finished child that nobody collected; `ps` shows `<defunct>`, state `Z` | [S11-p7] |
| **SIGCHLD handler / "zombie collector"** | a handler running the `waitpid` loop, installed with `sigaction` | [S11-p7, p8], [HW1 4.2] |
| **SA_RESTART** | the `sigaction` flag that makes the OS restart the parent's `accept` after SIGCHLD interrupts it | [S11-p8] |
| **Design 3: pool of processes** (pre-forked) | N workers forked **once**; all sleep in `accept` on the same `L`; the OS wakes exactly one per caller | [S11-p11] |
| **Design 4: select / poll** | one process asks the OS to "wake me when any of these has something for me" | [S11-p13] |
| **epoll** | a faster relative of `poll` (nginx, Redis, Node.js); covered in Week 11 | [S11-p13] |
| **Peer death** | when a process dies, the OS closes its sockets, so the other side **reads 0** instead of waiting forever | [S11-p15], [S10-p7] |

---

## 4. API & architecture tables as taught

### 4.1 ⭐ The call sequences
```
SERVER  (real system calls)                       CLIENT  (real system calls)
socket()      creates the phone (new fd, e.g. 3)
[setsockopt(SO_REUSEADDR) — inside net.h only]
bind()        "port 5000 -> this process"
listen()      phone on + waiting queue
loop:
  accept()    sleeps; returns NEW fd C  <─ 3 short messages ─  socket(); connect()
  read(C)     sleeps until bytes arrive <───── bytes ────────  write(C, ...)
  write(C)    ──────────────────────────────── bytes ──────>  read(C)   (sleeps until they arrive)
  read(C)==0  (client hung up)          <───── "goodbye" ────  close(C)
  close(C)
```

| level | server | client |
|---|---|---|
| slide verbs [S10-p6] | `listen` → `accept` → `read`/`write` → `close` | `connect` → `write`/`read` → `close` |
| real calls [S10-p9] | `socket` → `bind` → `listen` → `accept` → `read`/`write` → `close` | `socket` → `connect` → `write`/`read` → `close` |
| net.h helpers [S10-p10] | `server_listen(port)` → `server_accept(L)` → `read`/`write` → `close(c)` | `client_connect(host, port)` → `write`/`read_line` → `close(c)` |

### 4.2 ⭐ What each call does, returns and how it fails (as taught)
| call | what it does | returns | errors / gotchas taught |
|---|---|---|---|
| `socket()` | creates the phone [S10-p9] | a new descriptor, the lowest free number (3 first) [S10-p8] | net.h prints `socket: …` and exits on −1 |
| `bind()` | writes "port → this process" into the OS table [S10-p9] | (net.h checks for −1) | **`bind: Address already in use`**: another server already owns that port, or you started the server twice [S10-p5, p10, p13] |
| `listen()` | switches the phone on and starts the **waiting queue** [S10-p9] | (net.h checks for −1) | net.h passes `16`; the slides don't explain the number. 🔎 Track B: the listen *backlog* |
| `accept()` | takes the **first caller** out of the queue; **sleeps if the queue is empty** [S10-p7, p9] | a **new** descriptor for that one call (4, 5, …) [S10-p8] | `Too many open files` when descriptors leak, as in Server X [S11-p6]; interrupted by SIGCHLD unless `SA_RESTART` [S11-p8]; net.h's `server_accept` **exits on any error** |
| `connect()` | after `socket()`, the two OSes exchange 3 short messages, and then the call exists [S10-p9] | `client_connect` returns the descriptor | **`connect: Connection refused`**: no server is listening there, or you started the client first [S10-p6, p10, p13]; `client_connect: unknown host X` [net.h] |
| `read(C, buf, n)` | **sleeps until bytes arrive** [S10-p7] | how many bytes arrived; **0 = the other side closed** (end of file) [S10-p7, p11] | may return part of a message or several messages joined, so you need framing [S10-p14] |
| `write(C, …)` | sends bytes both ways on the same call [S10-p4] | — | one write ≠ one message [S10-p14]; a fast writer waits for a slow reader, as with a full pipe [S11-p15] |
| `close(C)` | hang up [S10-p6] | — | a call ends only when **everyone** holding it has closed it [S11-p5] |
| `read_line(c, buf, size)` | keeps reading until `'\n'` and removes it [S10-p14, net.h] | **0 at end of file**, otherwise positive [net.h] | one line = one message (framing rule 1) |

### 4.3 ⭐⭐ Server architectures compared
The first rows are the slide's table [S11-p14]. Rows marked *(derived)* follow from the cited slides, and the timing row comes from my verified runs (§5.4–5.6).

| | **1 · one at a time** (iterative) | **2 · process per client** (fork-per-client) | **3 · pool of N** (pre-forked) | **4 · select / poll** |
|---|---|---|---|---|
| shape | `accept` → `serve` → `close` [S11-p2] | `accept` → `fork`; child: `close(L)`, serve, `close(C)`, `exit`; parent: `close(C)` [S11-p4] | fork N workers **once**; each loops `accept` → serve → `close`; the parent only waits [S11-p11] | `poll(calls)`; if `L` is ready, `accept` and add the call; otherwise answer that client a little [S11-p13] |
| processes | 1 | 1 + one per client | 1 + N | 1 |
| who waits | each waits for all before it | nobody waits | client N+1 waits | nobody waits, *if every step is short* |
| shared data? | trivially (one process) | no — needs shared memory + semaphore | no — same as 2 | yes, for free |
| cost | simplest code | a `fork` per client; unlimited processes | fixed and predictable | harder to write; one slow step blocks all |
| used by | small tools, tests | PostgreSQL, sshd | Apache (prefork), PHP-FPM | nginx, Redis, Node.js |
| **pros** (from the slides) | simplest code [S11-p14] | nobody waits; one client cannot damage another; the OS scheduler runs children in parallel on the cores [S11-p4, p10] | never more than N processes, so the cost is predictable; no receptionist needed [S11-p11] | one process, thousands of clients; the counter "simply works" with no semaphore [S11-p13] |
| **cons** (from the slides) | every client pays for all in front of it (100 clients → the last waits 200 s); a silent client holds up everyone [S11-p2, p3] | 10,000 clients = 10,000 processes, so memory and the scheduler suffer; sharing must be asked for [S11-p10, p11] | client N+1 waits [S11-p11] | one slow job (our 2 s) blocks everybody; harder to write [S11-p13, p14] |
| **zombie handling** | *(derived)* never forks, so nothing to reap | **required:** a SIGCHLD handler with the `waitpid` loop, installed by `sigaction` with `SA_RESTART`; without it, Server Z's zombies [S11-p7, p8] | the parent's only job is "wait for the children" [S11-p11]; in C `while (wait(NULL) > 0) { }` [HW2-starter]; workers normally never exit | *(derived)* "no fork at all" [S11-p13], so no children |
| **closing rule** | `close(C)` after each client | parent closes `C`, child closes `L` [S11-p5] | each worker closes `C` after serving | — (not covered) |
| 5 clients × 2 s (verified) | 2, 4, 6, 8, 10 s | 2 s each | pool 2: 2, 2, 4, 4, 6 s · pool 5: 2 s each | (no class code to run) |

### 4.4 The three broken servers [S11-p6, p7]
| server | bug | what you see | one-line fix | week |
|---|---|---|---|---|
| **X** | the parent never closes `C` | leaked descriptors 4, 5, 6 …; `Too many open files` around the 1020th client, and `accept` fails; clients never see the end of the call | `close(C)` in the parent | Week 3 (close what you do not use) |
| **Y** | the child never exits (and keeps `L`) | the child falls back into the loop, `accept`s and forks; `ps` shows the number of servers growing with every client | `exit` at the end of the child | Week 1 (what `fork` returns, and to whom) |
| **Z** | nobody waits for the children | 1000 zombies: `<defunct>`, state `Z` in `ps` | SIGCHLD handler with the `waitpid` loop (Homework 1) | Week 1 (reap your children) |

### 4.5 Error messages → meaning
| message | meaning | ref |
|---|---|---|
| `bind: Address already in use` | another process already owns that port, e.g. you started the server twice | [S10-p5, p10, p13] |
| `connect: Connection refused` | nobody is listening there, e.g. you started the client first | [S10-p6, p10, p13] |
| `accept: Too many open files` | the descriptor table is full (Server X's leak) | [S11-p6] |
| `<defunct>`, state `Z` in `ps` | zombies: nobody waited for the children (Server Z) | [S11-p7] |
| `accept: Interrupted system call` | *seen only in my test*: SIGCHLD interrupted `accept` because `SA_RESTART` was missing | §5.5, testing [S11-p8] |
| `client_connect: unknown host X` | net.h could not turn the host name into an address | [net.h] |

---

## 5. Worked examples — the code explained, with verified runs

### 5.0 How the code was verified
- **Machine and compiler:** macOS on arm64, Apple clang 21, compiled with `cc -Wall -Wextra`.
  - The four `example_socket` files compile with **no warnings**.
  - [HW2-starter] `server_fork.c` and `server_pool.c` each give one harmless warning: `unused variable 'reply'`.
- ⚠️ **Port 5000 is taken on this Mac** (`lsof`: `ControlCenter … TCP *:5000 (LISTEN)`), so every unmodified class server stops with `bind: Address already in use`. All runs below therefore used **scratch copies where only the number 5000 was changed to 5050**; in class, the outputs would say 5000. Nothing else in the class code was changed, except in the deliberately broken variants (§5.5), each of which changes exactly the lines named.
- **Test helpers that are not class code:**
  - a "silent" client that connects and says nothing;
  - a program that prints descriptor numbers;
  - the HELLO/WORLD server and client pair;
  - a client that reads until end of file;
  - a C translation of the visitor-counter pseudo-code.

  Only their **results** appear here.
- Every server started was stopped afterwards: `pgrep` found none running, and nothing was listening on 5050.

### 5.1 `net.h` — the course's networking in three calls [net.h] (read it once; no need to memorise it)
```c
/* net.h — the course's networking in three calls.
   Read it once; you never need to memorise it.

   Server:  int L = server_listen(5000);     open a "reception phone" on port 5000
            int c = server_accept(L);        wait for a client; returns a NEW descriptor
   Client:  int c = client_connect("localhost", 5000);

   After that, c is an ordinary file descriptor: read(), write(), close().
   read_line() reads one whole line (one message) from it.                  */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <netdb.h>
#include <sys/socket.h>
#include <netinet/in.h>

/* Server side: create a socket, give it a port number, start listening. */
static inline int server_listen(int port) {
    int fd = socket(AF_INET, SOCK_STREAM, 0);
    if (fd == -1) { perror("socket"); exit(EXIT_FAILURE); }

    int yes = 1;       /* lets you restart the server at once on the same port */
    setsockopt(fd, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof yes);

    struct sockaddr_in addr;
    memset(&addr, 0, sizeof addr);
    addr.sin_family      = AF_INET;
    addr.sin_addr.s_addr = htonl(INADDR_ANY);     /* any address of this machine */
    addr.sin_port        = htons(port);
    if (bind(fd, (struct sockaddr *)&addr, sizeof addr) == -1) {
        perror("bind"); exit(EXIT_FAILURE);
    }
    if (listen(fd, 16) == -1) { perror("listen"); exit(EXIT_FAILURE); }
    return fd;
}

/* Server side: sleep until a client connects; return the connection. */
static inline int server_accept(int listen_fd) {
    int fd = accept(listen_fd, NULL, NULL);
    if (fd == -1) { perror("accept"); exit(EXIT_FAILURE); }
    return fd;
}

/* Client side: connect to host ("localhost", "192.168.1.7", ...) and port. */
static inline int client_connect(const char *host, int port) {
    char portstr[16];
    snprintf(portstr, sizeof portstr, "%d", port);

    struct addrinfo hints, *res;
    memset(&hints, 0, sizeof hints);
    hints.ai_family   = AF_INET;
    hints.ai_socktype = SOCK_STREAM;
    if (getaddrinfo(host, portstr, &hints, &res) != 0) {
        fprintf(stderr, "client_connect: unknown host %s\n", host);
        exit(EXIT_FAILURE);
    }
    int fd = socket(res->ai_family, res->ai_socktype, res->ai_protocol);
    if (fd == -1) { perror("socket"); exit(EXIT_FAILURE); }
    if (connect(fd, res->ai_addr, res->ai_addrlen) == -1) {
        perror("connect"); exit(EXIT_FAILURE);
    }
    freeaddrinfo(res);
    return fd;
}

/* Read one line (one message) into buf. The '\n' is removed.
   Returns 0 when the other side has closed (end of file), otherwise a positive number. */
static inline int read_line(int fd, char *buf, int size) {
    int n = 0;
    char ch;
    while (n < size - 1 && read(fd, &ch, 1) == 1) {
        if (ch == '\n') { buf[n] = '\0'; return n == 0 ? 1 : n; }
        buf[n++] = ch;
    }
    buf[n] = '\0';
    return n;
}
```
**`server_listen(port)`:** this is the slide's verb `listen(5000)`, which is three real calls [S10-p9].
1. `socket(...)` creates the phone and returns a new descriptor (3 in a fresh program).
2. `setsockopt(... SO_REUSEADDR ...)`: per its comment, it "lets you restart the server at once on the same port" (§5.8).
3. The `sockaddr_in` is filled with the family, `INADDR_ANY` ("any address of this machine") and the port.
4. `bind` writes "port → this process" into the OS table. If the port is owned, it prints `bind: Address already in use` and exits.
5. `listen(fd, 16)` switches the phone on and starts the waiting queue. The function returns `L`.

**`server_accept(L)`:** `accept` sleeps until a caller is in the queue, then returns a **new** descriptor for that one call. ⚠️ On *any* error it prints `accept: …` and **exits the whole server**. That is why a missing `SA_RESTART`, or Server X's descriptor leak, kills the server outright (§5.5).

**`client_connect(host, port)`:**
1. `getaddrinfo` turns `"localhost"` or `"192.168.1.7"` into an address. On failure it prints `client_connect: unknown host …` and exits (verified with `./client nosuchhost.invalid hello`).
2. `socket` then `connect` make the call. If nobody is listening, it prints `connect: Connection refused` and exits.

**`read_line(fd, buf, size)`:** this is framing rule 1 [S10-p14].
- It reads **one byte at a time** until it sees `'\n'`, which it replaces with `'\0'`.
- It returns the length. An empty line returns 1, so that **0 can only mean end of file**.
- It also stops when `read` doesn't return 1 (end of file) or when the buffer is full.
- ⚠️ A line longer than `size − 1` bytes is cut, and the rest stays in the stream for the next call (read from the loop condition `n < size - 1`).

**The three structures the slide mentions** [S10-p10] are visible in the code: `struct sockaddr_in`, `struct addrinfo` (`hints` and `*res`) and the cast to `struct sockaddr *`.

🔎 Not explained in class, so look these up in Track B: `AF_INET`/`SOCK_STREAM`, `htonl`/`htons`, `getaddrinfo`, the `16` passed to `listen`, and the two `NULL`s in `accept`.

### 5.2 `echo_server.c` step by step [echo_server.c], [S10-p11]
1. `int L = server_listen(5000);` opens the reception phone (`L` = 3) and prints `server: waiting on port 5000`.
2. `while (1)`: the server runs forever.
3. `int c = server_accept(L);` **sleeps** until a client calls, then gets a new descriptor (4) and prints `server: a client connected`.
4. `while ((n = read(c, buf, sizeof buf)) > 0) write(c, buf, n);` keeps reading up to 100 bytes and sends back exactly the `n` bytes that arrived. `read` sleeps while the client is quiet and returns **0 when the client hangs up**, which ends the loop.
5. It prints `server: the client left` and calls `close(c)`. Descriptor 4 is free again, so the next client also gets 4.
- **It is one client at a time:** while it sits in the inner `read` for one client, the next caller waits in the listen queue.

**Verified run** (Terminal 1, port 5050; the client runs are in §5.3):
```
server: waiting on port 5050
server: a client connected
server: the client left
server: a client connected
server: the client left
```

### 5.3 `client.c` step by step [client.c], [S10-p12]
1. If `argc != 3`, it prints the usage line and returns 1.
2. `client_connect(argv[1], 5000)` dials, and the result is descriptor `c`.
3. `write(c, argv[2], strlen(argv[2]));` sends the message, then `write(c, "\n", 1);` marks the **end of the message** (framing).
4. `read_line(c, reply, sizeof reply);` sleeps until one whole line comes back.
5. It prints `client: the server said "…"`, then `close(c)` hangs up, which makes the server's `read` return 0.

**Verified runs:**
```
$ ./client localhost hello
client: the server said "hello"
$ ./client localhost "operating systems"
client: the server said "operating systems"
$ ./client localhost
usage: ./client <host> <message>
$ ./client localhost hello          # with NO server running
connect: Connection refused
$ ./client nosuchhost.invalid hello
client_connect: unknown host nosuchhost.invalid
```
- ⚠️ `client.c` ignores `read_line`'s return value. If the server dies before answering, the client prints `client: the server said ""` (seen in the Server X test, §5.5). It cannot tell an empty answer from a hang-up.

### 5.4 Design 1 — `server_one.c` [server_one.c], [S11-p2, p3]
```c
/* server_one.c — one client at a time; every request takes 2 seconds of work */
#include <stdio.h>
#include <unistd.h>
#include "net.h"

void serve(int c) {                     /* talk to ONE client */
    char name[100], reply[120];
    read_line(c, name, sizeof name);
    sleep(2);                           /* 2 seconds of "work" */
    snprintf(reply, sizeof reply, "done %s\n", name);
    write(c, reply, strlen(reply));
}

int main(void) {
    int L = server_listen(5000);
    while (1) {
        int c = server_accept(L);
        serve(c);                       /* nobody else is served meanwhile */
        close(c);
    }
}
```
- `serve` is the pseudo-code `serve(C)`: read the name (one line), "work" for 2 seconds (a `sleep`, so the CPU is idle), then answer `done <name>\n`. The `\n` is the framing.
- `main` is the one-operator loop. While `serve(c)` runs, **nobody else is served**, and other callers wait in the OS's listen queue.

**The timing client** ([HW2-starter] `timed_client.c`, the program on S11-p3/p8/p12) is `client.c` plus a stopwatch. Its own comment says the clock lines need no memorising.
```c
/* timed_client.c — like client.c, but also prints how long it waited. */
#include <stdio.h>
#include <string.h>
#include <time.h>
#include <unistd.h>
#include "net.h"

int main(int argc, char *argv[]) {
    if (argc != 3) { printf("usage: %s <host> <name>\n", argv[0]); return 1; }
    struct timespec t0, t1;
    clock_gettime(CLOCK_MONOTONIC, &t0); // no need to memorize! just some helper function

    int c = client_connect(argv[1], 5000);
    write(c, argv[2], strlen(argv[2]));
    write(c, "\n", 1);
    char reply[100];
    read_line(c, reply, sizeof reply);

    clock_gettime(CLOCK_MONOTONIC, &t1);// no need to memorize! just some helper function
    double s = (t1.tv_sec - t0.tv_sec) + (t1.tv_nsec - t0.tv_nsec) / 1e9;
    printf("client %s: got \"%s\" after %.0f s\n", argv[2], reply, s);
    close(c);
    return 0;
}
```
**Verified runs** (clients started together, in order; process count taken 1 s in):
```
server_one, A B C          →  A 2 s, B 4 s, C 6 s                  (1 server process)
server_one, A B C D E      →  A 2 s, B 4 s, C 6 s, D 8 s, E 10 s   (1 server process)
```
This matches S11-p3 exactly: "each client waits for everybody in front of it".
- ✅ The W5 `server_one` **survives** a client that hangs up before the 2-second reply: tested twice, and the next client was served normally. 🔎 Look up in Track B: what can happen when a server *writes* to a peer that has already closed (SIGPIPE / EPIPE). That case is not taught on these slides.

### 5.5 Design 2 — `server_fork.c` and the three broken servers [HW2-starter], [S11-p4…p8]
```c
/* server_fork.c — one new process per client */
#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>
#include <sys/wait.h>
#include "net.h"

void serve(int c) {                     /* talk to ONE client */
    char name[100], reply[120];
    read_line(c, name, sizeof name);
    sleep(2);                           /* 2 seconds of "work" */

    write(c, "done ", 5);
    write(c, name, strlen(name));
    write(c, "\n", 1);
}

void reap(int sig) {                    /* Week 1: no zombies */
    (void)sig;
    while (waitpid(-1, NULL, WNOHANG) > 0) { }
}

int main(void) {
    struct sigaction sa;
    sa.sa_handler = reap;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = SA_RESTART;
    sigaction(SIGCHLD, &sa, NULL);

    int L = server_listen(5000);
    while (1) {
        int c = server_accept(L);
        if (fork() == 0) {              /* child: this client's own operator */
            close(L);                   /* the child never accepts          */
            serve(c);
            close(c);
            exit(0);
        }
        close(c);                       /* parent: the child has this call  */
    }
}
```
- **`reap`** is the zombie collector, the "waitpid loop" from [HW1 4.2]. It keeps collecting finished children until there are none left.
- **The first five lines of `main`** install `reap` for SIGCHLD with `SA_RESTART` [S11-p8].
- **The loop:**
  - The parent accepts and forks.
  - The child closes `L` (it never accepts), serves, closes `c` and **exits**.
  - The parent closes `c` right away (the child has this call) and goes back to `accept` [S11-p5].
- **`serve` sends its reply in three `write` calls** (`"done "`, the name, `"\n"`). The client still gets one line, because `read_line` reads until `'\n'`. That is the framing lesson of S10-p14 in action. In my tests the 9 bytes arrived in **one** `read` once, and as **5 + 4 bytes** another time: the grouping is up to the stream.

**Verified runs:**
```
server_fork, A B C          →  2 s, 2 s, 2 s          (4 server processes 1 s in = 1 + 3)
server_fork, A B C D E      →  2 s each               (6 server processes 1 s in = 1 + 5)
after the clients finish    →  no children left — no zombies
EOF-reading client          →  reply, then read returned 0 (end of the call) after 2 s
```

**The broken variants.** Each is `server_fork.c` with only the named lines changed.

| variant | change | verified result |
|---|---|---|
| **Server Z** | deleted the 5 `sigaction` lines | after 3 clients, `ps -o pid,ppid,stat,comm` listed three children: `Z    <defunct>` (×3) |
| **no `SA_RESTART`** | `sa.sa_flags = 0;` | client 1 served, then the server printed **`accept: Interrupted system call`** and died; client 2 got `connect: Connection refused` |
| **Server X** | deleted the parent's `close(c);` | EOF client: got the reply, but **no end of call** after 6 s. `lsof` on the parent after 4 clients: `fd 4u, 5u, 6u, 7u … (CLOSE_WAIT)`. With `ulimit -n 20`, **16 clients** were served; client 17 printed `client: the server said ""` and the server died with **`accept: Too many open files`** |
| **Server Y** | deleted the child's `close(L);` and `exit(0);` | `server_Y` processes: 1 → 2 → 3 → 4 → 5 after clients 1–4 |

- Why "around the 1020th client": with a limit of 20 descriptors, 0–3 are taken (stdin, stdout, stderr and `L`), so 20 − 4 = **16** calls fit. That is the same arithmetic as the slide's "around the 1020th client". 🔎 Look up in Track B: the default per-process open-file limit on Linux and macOS.
- 🔎 Look up in Track B: the `CLOSE_WAIT` state shown by `lsof` (not taught; it is just what the leaked calls look like).

### 5.6 Design 3 — `server_pool.c` [HW2-starter], [S11-p11, p12]
```c
/* server_pool.c — a fixed team of POOL processes, created once */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include "net.h"

#define POOL 2

void serve(int c) {
    char name[100], reply[120];
    read_line(c, name, sizeof name);
    sleep(2);
    write(c, "done ", 5);
    write(c, name, strlen(name));
    write(c, "\n", 1);
}

int main(void) {
    int L = server_listen(5000);
    for (int i = 0; i < POOL; i++) {
        if (fork() == 0) {              /* each worker runs the same loop */
            while (1) {
                int c = server_accept(L);   /* the OS gives each caller to ONE worker */
                serve(c);
                close(c);
            }
        }
    }
    while (wait(NULL) > 0) { }          /* the parent only waits */
    return 0;
}
```
- **The parent forks `POOL` workers once.** Every worker inherited `L` and sleeps in `server_accept(L)`.
- **For each caller the OS wakes exactly one worker** [S11-p11, p15], which serves it and goes back to `accept`.
- **The parent does nothing but `wait`.** This is the pool's "wait for the children".

**Verified runs:**
```
server_pool (POOL 2), A B C D E   →  A 2 s, B 2 s, C 4 s, D 4 s, E 6 s   (3 processes = 1 + 2)
POOL changed to 5,   A B C D E    →  2 s each                            (6 processes = 1 + 5)
```
The first line matches the S11-p12 terminal exactly.

### 5.7 Framing — the HELLO/WORLD exercise [S10-p13, p14]
A test pair matching the slide's pseudo-code: the client does `write HELLO`, `write WORLD`, `close`, and the server does a single `read(C, buf, 100)` and prints it.
```
case 1: the server waits 1 s before its read     → read returned 10 → "HELLOWORLD"
case 2: the read runs at once, 1 s between writes → read returned 5  → "HELLO"
```
- Both are "possible" answers. `HEL` did not occur on localhost, but the slide says the network *may* deliver a message in pieces. `WORLDHELLO` can never happen.
- See also §5.5: the same three `write`s arrived as one 9-byte read once, and as 5 + 4 bytes another time.

### 5.8 ⭐ `SO_REUSEADDR` — restarting on the same port [net.h], [S10-p5, p13]
| experiment | result |
|---|---|
| class `net.h`: serve one client, kill the server, restart **at once** | ✅ restarted immediately and served the next client |
| copy of `net.h` **without** the `setsockopt(... SO_REUSEADDR ...)` line, same steps | ❌ `bind: Address already in use` on the immediate restart; bind only worked again **about 31 s** after the kill (on this Mac) |
| start `echo_server` while another `echo_server` is running (both have `SO_REUSEADDR`) | ❌ `bind: Address already in use` (the second one, as S10-p13 says) |
| the unmodified class server on port 5000 (a system process owns `*:5000`) | ❌ `bind: Address already in use` |

- **Takeaway as taught:** `SO_REUSEADDR` exists so you can "restart the server at once on the same port" [net.h comment]. It does **not** let two living processes own the same port [S10-p5].
- Right after the kill, `netstat` still listed the old connection on port 5050 in a state called `TIME_WAIT`. 🔎 Look up in Track B: why a just-closed port stays busy (TIME_WAIT), and why SO_REUSEADDR gets around it.

### 5.9 Sleeping, the listen queue, descriptor numbers, and peer death [S10-p7, p8, p9, p16], [S11-p15]
- **Descriptor numbers:** `server_listen` + `server_accept` + `server_accept` printed `L = 3, C1 = 4, C2 = 5`, as on S10-p8.
- **Peer death:** a client connected to `echo_server` was killed with `kill -9`. The server's log went from `server: a client connected` to `server: the client left`. The OS closed the dead process's socket, and the server's `read` returned 0 [S11-p15].
- **The lunch question:**
  - Setup: client A connects to `echo_server` and says nothing for 5 s; client B (`timed_client`) connects 1 s later.
  - `netstat` showed both connections as `ESTABLISHED`, so B was connected and its message already sent, yet it was not served.
  - Result: `client B: got "B" after 4 s`, i.e. only when A hung up. B was **on hold in the listen queue for as long as A's lunch lasted** [S11-p2, p3].
- **Homework item 3** (descriptor table while talking to B): `lsof` showed `fd 3 *:5050 (LISTEN)` and `fd 4 … (ESTABLISHED)`, so B reused descriptor **4** after A's call was closed.

### 5.10 The visitor counter [S11-p9, p10]
A C translation of the slide's pseudo-code (`server_fork` structure; the global `visitors` is incremented in the child), driven by the class `client`:
```
$ ./client localhost Ali    →  client: the server said "hello Ali, you are visitor 1"
$ ./client localhost Vali   →  client: the server said "hello Vali, you are visitor 1"
$ ./client localhost Sami   →  client: the server said "hello Sami, you are visitor 1"
Fix A (count in the parent right after accept):  visitor 1, visitor 2, visitor 3
```

### 5.11 Unix domain socket file type [S10-p15]
A live Unix domain socket file, a FIFO and a directory side by side under `ls -l`:
```
srwxr-xr-x  shop      ← socket (s)
prw-r--r--  myfifo    ← FIFO (p)
drwxr-xr-x  mydir     ← directory (d)
```

---

## 6. Likely exam questions (built only from these slides)

1. **(Order the calls)** Put a TCP server's real system calls in order: `accept`, `bind`, `close`, `listen`, `read/write`, `socket`. Then order the client's: `close`, `connect`, `socket`, `write/read`. Which of these are hidden behind the slides' verbs `listen(5000)` and `connect(host, 5000)`?
2. **(accept)** What does `accept` return? What does it do when no client is waiting? In a freshly started server, which descriptor numbers do `L`, the first call and the second call get, and why?
3. **(Two kinds of socket)** Which socket in a server carries the conversation bytes? What is the listening socket's only job? Can the bytes of two clients ever mix? Why?
4. **(Errors)** A student sees `connect: Connection refused`. Another sees `bind: Address already in use`. Give the meaning and one cause of each, as taught.
5. **(Who sleeps when)** Name the two calls that sleep in the echo example and what wakes each one. How much CPU does a sleeper use, and what does `ps` show? What does `read` return when the other side closes, or its process dies?
6. **(MCQ — byte stream)** The client does `write(C,"HELLO")`, `write(C,"WORLD")`, `close(C)`. The server does one `n = read(C, buf, 100)` and prints `buf`. Which outputs are possible? (1) `HELLOWORLD` (2) `HELLO` (3) `HEL` (4) `WORLDHELLO`
7. **(Framing)** Define framing. Give the two classic framing rules. Which one does `net.h` use, and why does `client.c` send `"\n"` after the message? Which rule(s) does HTTP use?
8. **(The listen queue)** With the echo server running, client A connects and goes for lunch without sending anything; client B connects one second later. What happens to B, where exactly is B, and for how long? Which designs fix this?
9. **(Design 1)** Three clients A, B, C connect at the same moment to the one-at-a-time server, and each request needs 2 s of work. When does each get its reply? While A is served, where are B and C? How busy is the CPU? With 100 clients, how long does the last one wait?
10. **(Closing after fork)** In the process-per-client server, why must the parent `close(C)` and the child `close(L)` right after `fork`? What goes wrong if the parent never closes `C`: what do clients see, what happens to the parent's descriptor table, and which error appears around the 1020th client?
11. **(Server Y)** The child serves and closes `C` but has no `exit`. What happens after the first client? What does `ps` show over time? What is the one-line fix, and which week's idea does it test?
12. **(SIGCHLD handling)** Why does a fork-per-client server need a SIGCHLD handler? What does `ps` show without it? Write the handler's loop as given in class. Why is `SA_RESTART` set?
13. **(MCQ — visitor counter)** A global `visitors = 0` is incremented in the child after `fork`. Ali, Vali and Sami connect one after another. What do they see? (1) 1, 2, 3 (2) 1, 1, 1 (3) 0, 0, 0 (4) different on every run. Explain, and give Fix A and Fix B.
14. **(Pool)** How does a pool of N processes hand each caller to a worker without a receptionist? Which Week 4 tool does "at most N inside, the others wait" match? Compare Design 3 with Design 2 in processes, waiting and cost.
15. **(Five clients, two seconds each)** A, B, C, D, E connect at the same moment, in that order, and each needs 2 s. Fill in the reply times, the "done" time and the number of server processes at the busiest moment for Design 1, Design 2, a pool of 2 and a pool of 5.
16. **(When to use select/poll)** What is the new idea behind Design 4? What do you get for free, what is the danger, and when is it a good choice? Name programs that work this way.
17. **(Justify a design)** Which design would you choose for 5 clients a day, and which for 50,000 clients at once? Justify both using the comparison table.
18. **(MCQ — Unix domain sockets)** Which statement is **not** true as taught? (a) Its address is a file name instead of IP + port. (b) The bytes never leave the OS, so it is faster than localhost. (c) All writers are mixed into one stream. (d) The OS decides who may call using file permissions.
19. **(Address reuse)** What does the `setsockopt(fd, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof yes)` line in `server_listen` do, according to its comment? Does it allow two servers to listen on the same port at the same time?
20. **(MCQ — what the OS did)** Thanks to which OS job does the other side read 0, instead of waiting forever, when a server child crashes in the middle of a call? (a) it kept the listen queue (b) it cleaned up when a process died (c) it buffered the bytes in both directions (d) it copied the descriptor table in `fork`

### Answers
1. **Server:** `socket` → `bind` → `listen` → `accept` → `read`/`write` → `close` (in `net.h`, `setsockopt(SO_REUSEADDR)` sits between `socket` and `bind`). **Client:** `socket` → `connect` → `write`/`read` → `close`. The verb `listen(5000)` = `socket` + `bind` + `listen`, and `connect(host, 5000)` = `socket` + `connect`. "You say three verbs; the OS makes five system calls and keeps the queue." [S10-p6, p9, net.h]
2. It returns a **new descriptor**, a private line to exactly one client. It takes the first caller out of the waiting queue and **sleeps if the queue is empty** (using no CPU). Since 0, 1 and 2 are taken, `L` = **3**, the first call = **4** and the second = **5** ("lowest free number"). [S10-p7, p8, p9] (verified, §5.9)
3. The **connection socket** carries the bytes. The listening socket never carries a byte of conversation; it only receives new calls (the shop's one public number). The bytes can never mix, because each `accept` creates a **separate private line**, so two clients have two lines. [S10-p8]
4. **`Connection refused`:** no server is listening at that address and port; you started the client first. **`Address already in use`:** another process already owns that port; you started the server twice. Two processes cannot own the same port. [S10-p5, p6, p10, p13] (Both were verified, §5.3 and §5.8.)
5. **`accept`** sleeps until a client connects, and **`read`** sleeps until bytes arrive; the OS wakes them. A sleeper uses **no CPU** (state `S` in `ps`), like a reader on an empty pipe. When the other side closes, `read` returns **0**, i.e. end of file (like a pipe whose writers are all gone). If a process dies, the OS closes its sockets, so the other side reads 0 instead of waiting forever. [S10-p7, S11-p15] (verified with `kill -9`, §5.9)
6. **(1), (2) and (3) are possible; (4) is impossible.**
   - `HELLOWORLD`: both writes arrived before the read.
   - `HELLO`: the read ran between the writes.
   - `HEL`: the network may deliver pieces.
   - `WORLDHELLO`: TCP never changes the order.

   [S10-p14] ((1) and (2) were reproduced, §5.7.)
7. **Framing** is "the rule both sides follow to cut the stream back into messages". The two rules are: (1) end every message with a special byte, usually `'\n'`; (2) start every message with its length. `net.h` uses **rule 1**: `read_line` reads until `'\n'`, so one line = one message. That is why the client writes `"\n"`, which marks the end of the message. **HTTP uses both** (lines for the headers, a length for the body). [S10-p12, p14, net.h]
8. B's `connect` **returns at once**: B is connected and can even send its message. But B sits **in the OS's listen queue**, because the echo server is busy sleeping in `read` on A. B is put **on hold for as long as A's lunch lasts**, i.e. until A finishes and hangs up. Designs 2–4 fix it: a child per client, a pool (unless all N workers are busy), or `poll` (nobody waits if every step is short). [S10-p9, p16; S11-p2, p3, p14] (Verified: B waited about 4 s for a 5-second lunch, §5.9.)
9. The replies come after **2, 4 and 6 s**. B and C are **in the OS's listen queue**: connected, names already sent, not yet accepted. The **CPU is idle**, because the server is asleep (its "work" is a `sleep`) and the clients wait for nothing. With 100 clients the last waits **200 s**. "Every client pays for all the clients in front of it." [S11-p3] (verified, §5.4)
10. This is the **Sacred Rule of Closing** (Week 3): every process closes every end it will not use, immediately after `fork`. The parent closes `C` because the child talks to that client; the child closes `L` because it never accepts. A call ends only when **everyone** holding it has closed it. If the parent keeps `C` (**Server X**):
    - the client **never sees the end of the call**;
    - the parent leaks one descriptor per client (4, 5, 6 …);
    - around the **1020th** client the OS says `Too many open files` and `accept` fails.

    The fix is `close(C)` in the parent. [S11-p5, p6] (Verified: with a limit of 20 descriptors, client 17 failed, §5.5.)
11. **Server Y:** after serving, the child **falls back into the loop and calls `accept` itself**, because it never closed `L`. The children become receptionists and each forks again, so `ps` shows the **number of servers growing with every client**. The fix is **`exit` at the end of the child**. It tests Week 1: what `fork` returns, and to whom. [S11-p6, p7] (Verified 1 → 5 processes, §5.5.)
12. A server creates a child per client and runs for months. Finished children that nobody collects become **zombies**: `ps` shows `<defunct>`, state `Z`, and you get 1000 of them (**Server Z**). The fix is a **SIGCHLD handler with the waitpid loop**, `while (waitpid(-1, NULL, WNOHANG) > 0) { }`, installed with `sigaction` (`sa_handler = reap`, `sigemptyset(&sa.sa_mask)`, `sa_flags = SA_RESTART`). **`SA_RESTART`** is needed because when a child dies, the signal interrupts the parent's sleeping `accept`, and `SA_RESTART` makes the OS start it again. [S11-p7, p8; HW1 4.2] (Verified: without it the server died with `accept: Interrupted system call`, §5.5.)
13. **(2): everybody is visitor 1.** `fork` gives the child a **copy** of all memory; the child adds 1 to its own copy and exits, so the parent's `visitors` is still 0 when the next child is born. **Fix A:** count in the **parent**, right after `accept` and before `fork`, which gives 1, 2, 3. **Fix B:** if the children must change shared data, put it in **shared memory** (`shared_alloc` before `fork`) and protect it with a **semaphore**. "Children do not share variables: fork copies, it does not connect." [S11-p9, p10] (verified, §5.10)
14. All N workers inherited `L` and **sleep in `accept` on the same listening socket**; for each caller **the OS wakes exactly one**, so no receptionist is needed. "At most N inside, the others wait" is a **counting semaphore that starts at N** (Week 4).

    | | Design 2 | Design 3 |
    |---|---|---|
    | processes | 1 + one per client (10,000 clients = 10,000 processes) | at most **1 + N** |
    | waiting | nobody waits | **client N+1 waits** |
    | cost | memory and the scheduler suffer | **fixed and predictable** |

    [S11-p11, p14, p15]
15. The filled table, derived from [S11-p3, p11, p14] and **verified by running each row** (§5.4–5.6):

    | design | A | B | C | D | E | done | processes at the busiest moment |
    |---|---|---|---|---|---|---|---|
    | 1: one at a time | 2 | 4 | 6 | 8 | 10 | 10 s | 1 |
    | 2: process per client | 2 | 2 | 2 | 2 | 2 | 2 s | 6 (1 + 5) |
    | 3: pool of 2 | 2 | 2 | 4 | 4 | 6 | 6 s | 3 (1 + 2) |
    | 3: pool of 5 | 2 | 2 | 2 | 2 | 2 | 2 s | 6 (1 + 5) |

    "More processes, less waiting — until the processes themselves become the problem." [S11-p12]
16. Instead of sleeping on **one** descriptor, the process asks the OS: "wake me when any of these has something for me" (`select`/`poll`).
    - **For free:** no `fork` at all, so one process serves thousands of clients; memory is shared for free, so the visitor counter just works with no semaphore, because only one thing runs at a time.
    - **The danger:** one slow job (our 2 s of work) **blocks everybody**, so the operator must only do short things. It is also harder to write.
    - **Good choice:** many clients, each needing only short steps.
    - **Users:** nginx, Redis, Node.js (with `epoll`, covered in Week 11).

    [S11-p13, p14]
17. The slide asks you to *justify* the choice ("there is no best design"), so no single official answer is printed. A justification built from [S11-p14]:
    - **5 clients a day → Design 1.** It has the simplest code ("small tools, tests"), and with so few clients almost nobody is ever in front of you.
    - **50,000 at once:**
      - Design 1 is out, because each client waits for all before it.
      - Design 2 means 50,000 processes ("memory and the scheduler suffer").
      - A pool keeps the cost fixed, but client N+1 waits.
      - **Design 4** (one process, thousands of clients) is the fit **if every step is short**.

    Ask the slide's three questions: how many clients, how long is each job, what must they share? [S11-p12, p14]
18. **(c)**. That describes a **FIFO**. A Unix domain socket is two-way, and **every client gets its own private line**. [S10-p15]
19. Per its comment, it "lets you restart the server at once on the same port". It does **not** let two living servers own one port: starting `echo_server` twice still gives `bind: Address already in use` [S10-p13], because two processes cannot own the same port [S10-p5]. (Verified: with the line, an immediate restart works; without it, the restart failed for about 31 s, §5.8.)
20. **(b)**. The OS **cleaned up when a process died**: it closed the process's sockets, so the other side reads 0 instead of waiting forever. [S11-p15]

---

## 7. Self-check

- [ ] I can write the server sequence (`socket` → `bind` → `listen` → `accept` → `read`/`write` → `close`) and the client sequence (`socket` → `connect` → `write`/`read` → `close`), and map them to the slides' three verbs and to `net.h`'s `server_listen` / `server_accept` / `client_connect`.
- [ ] I can say what `accept` returns (a **new** descriptor), when it sleeps, and predict the descriptor numbers (3 for `L`, then 4, 5, …).
- [ ] I can explain the listening socket vs the connection socket, and draw a server's descriptor table, including after `fork` (who closes what).
- [ ] I can draw the "who sleeps when" time diagram, ending with `read` returning 0, and explain what happens when a peer dies.
- [ ] I can explain the listen queue and answer the "client A goes to lunch" question: where B is, and for how long.
- [ ] I can say which HELLO/WORLD outputs are possible and why, and explain framing (the `'\n'` rule vs the length rule, and how `read_line` does it).
- [ ] I can read `Connection refused` and `Address already in use`, and say what the `SO_REUSEADDR` line in `net.h` is for and what it does not do.
- [ ] I can compare Unix domain sockets with TCP sockets and with FIFOs.
- [ ] I can diagnose Servers X, Y and Z (bug, symptom, one-line fix), write the `reap` loop, and explain why `SA_RESTART` is needed.
- [ ] I can fill the five-clients table for all four rows, rebuild the S11-p14 comparison table from memory, and justify a design choice.
