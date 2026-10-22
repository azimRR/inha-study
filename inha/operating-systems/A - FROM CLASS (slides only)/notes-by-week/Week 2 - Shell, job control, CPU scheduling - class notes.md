# Week 2 — The shell & CPU scheduling (CLASS NOTES — from slides only)
> Sources: Slide 4 (The Shell and CPU Scheduling).pdf [S04-p#], Slide 5 (CPU Scheduling).pdf [S05-p#].
> Course: SOC3010-003 Operating Systems, Inha University in Tashkent, Prof. Yusupov Jalolliddin, Fall 2026. Slide dates: S04 9/13/2026, S05 9/15/2026.
> **Track A only.** Everything below comes from the two slide decks. Anything the slides don't explain gets a 🔎 pointer to Track B.
> Legend: ⭐ = the slide stresses it, or it is likely exam material · ⚠️ = typo or wrong number on the slide · 🔎 = not on the slides, so look it up in Track B · ✅ = checked by me (bash snippets run in bash 3.2 on macOS, scheduling numbers checked with a small simulator).

---

## 1. Big picture

- **A shell is an ordinary user-space program.** It loops: read a line → split it into words → `fork()` → the child calls `exec` → the parent calls `waitpid()` → the result is stored in `$?`. The slide's one-liner: "Everything a shell does is fork, exec, wait — and a variable named $?." [S04-p2]
- **`$?` tells you how the last command ended:** 0 = success, 1–125 = the program's own meaning, 126 = found but not executable, 127 = not found, 128+N = killed by signal N. [S04-p3]
- **The kernel organises processes around terminals:** process (PID) → process group (PGID) → session (SID, usually one controlling terminal). Job control (`&`, Ctrl+Z, `jobs`, `fg`, `bg`) is how you juggle several jobs on one terminal. Daemons have no controlling terminal at all. [S04-p5–p7]
- **Bash is also an interpreted, portable scripting language.** The slides cover the shebang, `$0 $1 $@`, variables and quoting, `export` and environment variables, `read`, `let` / `$(( ))`, `if` with `[ ]` tests, `&&` / `||`, `for` loops, arrays, functions and `trap`. [S04-p8–p24]
- **The scheduling problem:** while a process runs on the real CPU, the kernel is *not* running. The CPU comes back either **cooperatively** (the program calls `yield()` or another system call) or **preemptively** (the timer interrupt, then a context switch). [S05-p2]
- **The scheduler decides which runnable (R) process runs next, and for how long.** Batch jobs want *throughput*; interactive jobs want *latency* (under ~50 ms). "There is no fair; there is only a chosen victim." [S05-p3]
- **The metrics:** turnaround = T_completion − T_arrival; response = T_first run − T_arrival; waiting = time spent in the ready queue; plus fairness. **The Gantt chart is "the exam method".** [S05-p4]
- **The policies, in the order taught:** FIFO (convoy effect) → SJF (optimal average waiting time, but you must know the future) → SRTF (preemptive SJF) → Priority (starvation, fixed by aging) → RR (quantum q: better response, worse turnaround; q must be large compared with the context-switch cost) → MLFQ (guesses a job's length from its past). [S05-p5–p17]
- ⚠️ **Not on these slides:** the Linux scheduler and cgroups. I checked all 18 pages of S05 and all 25 of S04. 🔎 Look up in Track B: the Linux scheduler and cgroups. The slides also never use the name "STCF"; they call the preemptive version **SRTF** / "Preemptive SJF". 🔎 Look up in Track B: whether STCF and SRTF are the same thing.

---

## 2. Page-by-page notes

### Slide 4 — The Shell (and bash scripting)

### [S04-p1] Title — "The Shell and CPU Scheduling (TLPI Ch 34; OSTEP Ch 7, 8)"
- SOC 3010 Operating Systems; instructor Jalolliddin Yusupov; dated 9/13/2026.
- Readings named on the slide: **TLPI Ch 34; OSTEP Ch 7, 8**.
- Despite the title, every content page of this deck is about the shell and bash. The scheduling material is in Slide 5.

### [S04-p2] A Shell Is a Loop Around Four System Calls ⭐
- Banner: "A shell is a user-space program. Everything it does, you can do in C!"
- In your own C code you can create a process, replace its program, wait for it and "bury" it. The shell does exactly that for a living, thousands of times a day.
- What a shell lets you do: communicate with the O.S. **interactively** or **by means of a script**.
- Screenshot: GNU nano 7.2 editing `hello.sh` (status line "[ Wrote 2 lines ]"):
  ```bash
  #!/bin/bash
  echo "Hello, World!"
  ```
- **The REPL (read–eval–print loop), in pseudo-code** (verbatim from the slide):
  ```c
  while (1) {
      line = read_line("$ ");                  // 1. read
      argv = parse(line);                      // 2. split into words (S7)
      if (is_builtin(argv)) { run_here(argv); continue; }
      pid = fork();                            // 3. a copy of the shell
      if (pid == 0)
          execvp(argv[0], argv);               //    child: new brain
      waitpid(pid, &status, WUNTRACED);        // 4. parent: next of kin
      last_status = decode(status);            //    becomes $?
  }
  ```
- Reading the loop step by step:
  1. Print the prompt `$ ` and read a line.
  2. Split the line into words (`argv`).
  3. A **builtin** is run right here, inside the shell process with no fork, and the loop continues.
  4. Otherwise `fork()` makes **a copy of the shell**.
  5. The child calls `execvp`, which swaps in the new program ("new brain").
  6. The parent calls `waitpid` and waits for the child ("next of kin").
  7. The child's status is decoded and **becomes `$?`**.
- Side box: "`$?` — the shell variable holding the **last command's exit status**" (called "last week's death certificate").
- ⭐ Banner: **"Everything a shell does is fork, exec, wait — and a variable named $?."**
- 🔎 Look up in Track B: what the `WUNTRACED` flag does. The slide also doesn't list which "four system calls" the title means; the code shows `read_line`, `fork`, `execvp` and `waitpid`. The "(S7)" in the comment is an unexplained cross-reference.

### [S04-p3] `$?`: The Canonical Table, Exit Codes ⭐
- Section label: "The Shell - interactively".
- Terminal box (verbatim):
  ```
  true          → $? = 0
  false         → $? = 1
  ./nope        → $? = 127   (127: not found)
  ./x (no +x)   → $? = 126   (126: not executable)
  kill -9 sleep → $? = 137   (128+9)
  kill -TERM    → $? = 143   (128+15)
  SIGSEGV       → $? = 139   (128+11)
  ```
- ⭐ Table "**THE BLOOD TYPE OF A DEAD COMMAND**":

  | `$?` | Meaning (slide) |
  |---|---|
  | `0` | **Success.** The only value `if` treats as true. |
  | `1–125` | The program's own meaning (`grep`: 1 = no match, 2 = error). |
  | `126` | Found, but **not executable** (no `x` bit, or a directory). |
  | `127` | **Not found** — typo, or not on `PATH`. |
  | `128+N` | **Killed by signal N**: 130 Ctrl-C (2), 137 `kill -9`, 139 segfault (11), 143 `SIGTERM` (15). |

- How to decode a number above 128: subtract 128 to get the signal number. For example 137 − 128 = 9 (`kill -9`) and 130 − 128 = 2 (Ctrl-C).
- Signal numbers you can read off this slide: Ctrl-C = 2, `kill -9` = 9, segfault (SIGSEGV) = 11, SIGTERM = 15. S04-p8 adds that Ctrl+C is **SIGINT**.
- ✅ Verified locally: `true`→0, `false`→1, `./nope`→127, `./x` without +x→126 (a directory also gives 126), `kill -9` on `sleep`→137, `kill -TERM`→143, SIGSEGV→139, SIGINT→130, `grep` no match→1, `grep` error→2.
- The same banner as p2 appears again: "Everything a shell does is fork, exec, wait — and a variable named $?."

### [S04-p4] What is a subshell? ⭐
- Definition: "A **subshell** is a child copy of the current shell process. It inherits everything (variables, functions, options) but any changes it makes are **invisible** to the parent."
  ```bash
  # Parentheses create a subshell
  ( x=42; echo "inside: $x" )
  echo "outside: $x"   # x is unset here

  # Braces group in the CURRENT shell
  { x=42; echo "inside: $x"; }
  echo "outside: $x"   # x is 42 here
  ```
- ✅ Output: block 1 prints `inside: 42` then `outside: ` (empty). Block 2 prints `inside: 42` then `outside: 42`.
- Diagram: "Parent shell `$ ( pwd; ls)`" → arrow "Spawn a Subshell" → "Child Subshell".
- Rule to remember: **`( … )` runs in a child, so its changes are lost. `{ …; }` runs in the current shell, so its changes stay.** Copy the brace form exactly as on the slide: a space after `{` and a `;` before `}`.
- The same "child changes never reach the parent" idea comes back with `export` on p12.

### [S04-p5] Sessions & Process Groups ⭐
- Banner: **How the kernel organizes processes around terminals.**

  | Term | Slide definition |
  |---|---|
  | **Process** | A running program. Has a **PID**. |
  | **Process group** | A set of processes with a shared **PGID**. Signals can target the whole group. One member is the **group leader** (PGID == its PID). |
  | **Session** | A collection of process groups, with a shared **SID**. Usually tied to one **controlling terminal**. Leader is the **session leader**. |

- Command and output (verbatim):
  ```
  $ ps -eo pid,ppid,pgid,sid,tty,stat,comm
   PID  PPID  PGID   SID TT     STAT COMMAND
  1234  1200  1234  1234 pts/0  Ss   bash    ← session & group leader
  1500  1234  1500  1234 pts/0  S+   vim     ← own group, foreground
  1600  1234  1600  1234 pts/0  S    sleep   ← own group, background
  ```
  - `-e`: selects all processes. `-o`: custom output format with exactly the columns requested.
- Reading the table:
  - **bash**: PID = PGID = SID = 1234, so it leads both its group and the session. STAT `Ss`.
  - **vim**: its parent is bash (PPID 1234). It is in its own group (PGID 1500 = its PID) and the same session (1234). STAT `S+`; the slide labels it "foreground".
  - **sleep**: its parent is bash, it is in its own group (1600) and the same session. STAT `S` with no `+`, i.e. background.
  - All three use terminal `pts/0`, the session's controlling terminal.
  - The slide highlights the STAT codes `Ss` (session & group leader) and `S+` (foreground). The capital **S** is the "sleeping/waiting" state explained on [S05-p3].
- ⭐ **Signals to a group:** `kill -INT -1500` sends SIGINT to the **whole group** 1500 (note the minus sign).
- 🔎 Look up in Track B: the full list of `ps` STAT letters.

### [S04-p6] Job Control: Foreground, background, suspended ⭐
- Banner: **Juggling multiple processes on one terminal.**

  | State | Slide description | How you get there |
  |---|---|---|
  | **Foreground** | Owns the terminal. Reads input, receives Ctrl+C. | Started normally: `vim file` |
  | **Background** | Runs but does not own the terminal. Trying to read → **SIGTTIN** (stops it). | Started with `&`: `sleep 60 &` |
  | **Stopped** | Suspended by **Ctrl+Z (SIGTSTP)**. Frozen in memory. | Resume with `fg` or `bg`. |

- Transcript (verbatim):
  ```
  $ long-task
  ^Z                      # suspend
  [1]+  Stopped   long-task

  $ jobs                  # list jobs
  [1]-  Stopped   long-task
  [2]+  Running   sleep 60 &

  $ bg %1                 # resume #1 in background
  $ fg %2                 # bring #2 to foreground
  $ fg                    # most recent job (the + one)
  ```
- Walkthrough:
  1. `long-task` runs in the foreground. Ctrl+Z (shown as `^Z`) sends SIGTSTP, and job **[1]** becomes `Stopped`.
  2. The user then starts `sleep 60 &`, which becomes job **[2]**. This step is implied but not shown.
  3. `jobs` lists the jobs. `+` marks the **most recent** job (the one plain `fg` uses) and `-` marks the one before it.
  4. `bg %1` resumes job 1 **in the background**. `fg %2` brings job 2 to the **foreground**. `fg` alone takes the `+` job.
- `%n` means **job number n** (the `[n]` in `jobs`), not a PID.
- ⚠️ The transcript never shows the command that created job [2] (`sleep 60 &`, the example from the Background box).
- ✅ Checked locally: the newest background job gets `+` and the previous one gets `-`.
- Link to p5: vim and sleep each sit in their own process group; the foreground job is the one marked `+` in `ps` STAT.

### [S04-p7] Daemons: Long-running background services
- A daemon (slide bullets):
  - Has **no controlling terminal**
  - Runs in the background, usually started at boot
  - Is an **orphan** — its parent is `init` (PID 1)
  - Examples: `sshd`, `crond`, `nginx`, `systemd`
- **Daemonizing from the shell** (a systemd service), 3 steps:
  1. Open a terminal and create a new file:
     ```
     sudo nano /etc/systemd/system/telegram-bot.service
     ```
  2. Paste the following configuration:
     ```ini
     [Unit]
     Description=Telegram Bot

     [Service]
     ExecStart=/usr/local/bin/telegram-bot.sh
     ```
  3. Enable it so it starts automatically when the server reboots:
     ```
     sudo systemctl enable telegram-bot
     ```
- Definition: "**Systemd** is a system and service manager for Linux that initializes the operating system and manages background services after the kernel boots."
- Meme: "How developers running daemons on their computer sleep" (a monster under the bed, playing on "daemon").
- Contrast built from p5–p7: a *background job* still belongs to your terminal's session (sleep on `pts/0`), but a *daemon* has no controlling terminal at all.
- 🔎 Look up in Track B: whether `systemctl enable` needs an `[Install]` section (the slide's file has only `[Unit]` and `[Service]`), and how to start the service immediately.

### [S04-p8] The `trap` builtin
- Banner: **Register a command to run when the shell receives a signal.**
- Syntax shown: `trap 'WHAT TO DO'  WHEN TO DO IT`
  - **WHAT TO DO**: the cleanup commands (e.g., delete a file, kill a background process).
  - **WHEN TO DO IT**: the "signal" (e.g., `SIGINT` for Ctrl+C, or `EXIT` for when the script finishes).
- Example (the `positive#` is the terminal prompt in the screenshot):
  ```
  positive#  trap 'echo " 🔴 Caught Ctrl+C!"; ' SIGINT
   🔴 Caught Ctrl+C!
  ```
  Once the trap is set, pressing Ctrl+C runs the echo.
- ✅ Verified: with that trap, sending SIGINT printed ` 🔴 Caught Ctrl+C!` and the script **kept running**. `trap 'echo bye' EXIT` printed `bye` when the script ended.

### [S04-p9] What is a script? The first bash program ⭐
- Section: "Bash Script Programming: Putting it all together".
- A script is a text file of commands that the shell reads and executes.
- The **shebang** tells the kernel which interpreter to use.
- Run it as `./script.sh` after `chmod +x`, or as `bash script.sh`.
- `hello.sh` (verbatim):
  ```bash
  #!/usr/bin/env bash
  echo "hello from $0"
  echo "first arg: $1"
  echo "all args: $@"
  ```
  ```
  $ chmod 700 hello.sh
  $ ./hello.sh one two
  hello from ./hello.sh
  first arg: one
  all args: one two
  ```
- Diagram: `cp file1.txt file2.txt` → **`$0`** = `cp`, **`$1`** = `file1.txt`, **`$2`** = `file2.txt`, **`$@`** = all the arguments (`file1.txt file2.txt`).
- ⭐ Bottom banner: **"The shebang only matters when the file is executed directly. `bash hello.sh` ignores it."**
- ✅ Verified: `./hello.sh one two` gives exactly the three lines above. `bash hello.sh one two` prints `hello from hello.sh` on the first line, because `$0` is whatever name the script was started with.
- Cartoon: someone pushing a cart piled with tool logos asks "Is that all you need?". The person carrying one box labelled "bash scripts" answers "Yes."
- 🔎 Look up in Track B: what the digits in `chmod 700` mean. The demo uses `700`; the bullet says `chmod +x`.

### [S04-p10] Programming or Scripting?
- bash is both an excellent command-line shell **and a scripting language** in its own right. Scripts let you automate tasks that would otherwise take many typed commands.
- Diagram: source code (`Int I, char c, For, if`) → **COMPILER** → a binary file in one go; versus a **Script** → **INTERPRETER** → binary, with one arrow per line because each instruction is executed as it is read.
- Paraphrased comparison:

  | | Programming language (compiled) | Scripting language (interpreted) |
  |---|---|---|
  | How it runs | Source code is compiled into an executable | Not compiled; an interpreter reads the source and executes each instruction |
  | Power / speed | Generally a lot more powerful and a lot faster | Generally slower |
  | Portability | The executable is not easily ported to other OSes | **Main advantage:** the source file ports easily to any OS |
  | Examples on slide | — | **bash**, Perl, Lisp, Tcl |

### [S04-p11] The second bash program + "Variables and quoting — the minimum" ⭐
- Task: copy all files into a directory, then delete the directory with its contents. Typed interactively:
  ```
  $ mkdir trash
  $ cp * trash
  $ rm -rf trash
  $ mkdir trash
  ```
- Instead of typing that every time, write a shell program:
  ```
  $ cat trash.sh
  #!/bin/bash
  cp * trash
  rm -rf trash
  mkdir trash
  echo "Deleted all files!"
  ```
  The script starts with `cp`, not `mkdir`, so it relies on `trash` already existing (the interactive sequence ended with `mkdir trash`).
- **Variables and quoting — the minimum** (verbatim):
  ```bash
  name="Ana"
  count=3
  echo "$name has $count items"
  echo '$name is not expanded here'
  ```
  ✅ Output: `Ana has 3 items` and `$name is not expanded here`.
- ⭐ Rules (slide bullets):
  - No spaces around `=` in assignments. ✅ `name = "Ana"` fails with `bash: name: command not found`.
  - `"$var"` expands and keeps spaces together.
  - `'$var'` is literal — no expansion.
  - Always prefer `"$@"` for all arguments, and `"$var"` for variables.
- ⚠️ The slide's code uses curly "smart" quotes (`“Deleted all files!”`). In a real script, type plain `"`. ✅ Locally, `echo “Deleted all files!”` printed the curly quotes as part of the text. The same problem appears in the code on p13, p18 and p20–p24.

### [S04-p12] The export command + Environmental Variables ⭐
- `export` puts a variable into the **environment**, so it is accessible to **child processes**:
  ```
  $ x=hello
  $ bash          # Run a child shell.
  $ echo $x       # Nothing in x.
  $ exit          # Return to parent.
  $ export x
  $ bash
  $ echo $x
  hello           # It's there
  ```
- If the child modifies x, the parent's original value does not change. Verify it like this:
  ```
  $ x=ciao
  $ exit
  $ echo $x
  hello
  ```
- ✅ Verified: before `export` the child sees an empty x; after `export` it sees `hello`. The child's `x=ciao` leaves the parent's `hello` unchanged.
- There are two types of variables: **local variables** and **environmental variables**.
- Environmental variables are set by the system and can usually be listed with the **`env`** command. They hold special values, for instance:
  ```
  $ echo $SHELL
  /bin/bash
  $ echo $PATH
  /usr/X11R6/bin:/usr/local/bin:/bin:/usr/bi
  ```
- ⚠️ The `$PATH` output is cut off on the slide ("…:/usr/bi").
- Same principle as the subshell on p4: children get **copies**, and changes never flow back up.

### [S04-p13] Environmental Variables (HOME, PATH) + Read command
- **HOME**: the default argument (home directory) for `cd`.
- **PATH**: the search path for commands, a **colon-separated list of directories** that are searched when you type a command.
- Normally we type `$ ./command`. After `PATH=$PATH:.` the working directory is part of the search path, so we can just type `$ command`.
- ✅ Verified: without `.` in PATH, `mycmd` gives "command not found" while `./mycmd` works. After `PATH=$PATH:.`, plain `mycmd` works. That is why p22 can run `for1.sh arg1 arg2` without `./`.
- ⚠️ The bullet "If we type in `$ mkdir ~/bin`" is unfinished; the "Read command" box covers the rest. 🔎 Look up in Track B: what `~/bin` is for.
- **Read command**: lets you prompt for input and store it in a variable. Example (verbatim, straight quotes):
  ```bash
  #!/bin/bash
  echo -n "Enter name of file to delete: "
  read file
  echo "Type 'y' to remove it, 'n' to change your mind ... "
  rm -i $file
  echo "That was YOUR decision!"
  ```
- Slide's explanation: "Line 2 prompts for a string that is read in line 3. Line 4 uses the interactive remove (`rm -i`) to ask the user for confirmation."
- ⚠️ The line numbers are off by one. If the shebang is line 1 (which "line 2 prompts… line 3" requires), then `rm -i` is **line 5** and line 4 is the "Type 'y'…" echo.
- ✅ Run with input `victim.txt` then `n`: `rm -i` asked `remove victim.txt?`, the file was kept, and the script printed `That was YOUR decision!`.

### [S04-p14] Arithmetic Evaluation
- The **`let`** statement can be used to do mathematical functions:
  ```
  $ let X=10+2*7
  $ echo $X
  24
  $ let Y=X+2*4
  $ echo $Y
  32
  ```
- An arithmetic expression can be evaluated with **`$[expression]`** or **`$((expression))`**:
  ```
  $ echo "$((123+20))"
  143
  $ VALORE=$[123+20]
  $ echo "$[123*$VALORE]"
  17589
  ```
- ✅ All four outputs verified. 10 + 2·7 = 24 (multiplication first). Inside `let` you can write `X` without `$`, so Y = 24 + 8 = 32. 123 + 20 = 143, and 123 × 143 = 17589.

### [S04-p15] Conditional Statements
- Conditionals decide whether to perform an action by evaluating an expression. The most basic form:
  ```bash
  if [ expression ];
  then
      statements
  elif [ expression ];
  then
      statements
  else
      statements
  fi
  ```
- The `elif` (else if) and `else` sections are **optional**.
- ⭐ **Put spaces after `[` and before `]`, and around the operators and operands.**
- Link to p3: `if` treats only exit status `0` as true.

### [S04-p16] Expressions (1) — string comparisons
- An expression can be a **string comparison, numeric comparison, file operator or logical operator**, written as `[expression]`.

  | Operator | Meaning (slide) |
  |---|---|
  | `=` | compare if two strings are equal |
  | `!=` | compare if two strings are not equal |
  | `-n` | evaluate if string length is greater than zero |
  | `-z` | evaluate if string length is equal to zero |

- Examples (verbatim):
  ```
  [ s1 = s2 ]    (true if s1 same as s2, else false)
  [ s1 != s2 ]   (true if s1 not same as s2, else false)
  [ s1 ]         (true if s1 is not empty, else false)
  [ -n s1 ]      (true if s1 has a length greater then 0, else false)
  [ -z s2 ]      (true if s2 has a length of 0, otherwise false)
  ```
- ⚠️ Minor typo: "greater then" should be "greater than".

### [S04-p17] Expressions (2) — number comparisons

  | Operator | Meaning (slide) | Example |
  |---|---|---|
  | `-eq` | two numbers are equal | `[ n1 -eq n2 ]` |
  | `-ge` | one number is greater than or equal to another | `[ n1 -ge n2 ]` |
  | `-le` | less than or equal | `[ n1 -le n2 ]` |
  | `-ne` | two numbers are not equal | `[ n1 -ne n2 ]` |
  | `-gt` | greater than | `[ n1 -gt n2 ]` |
  | `-lt` | less than | `[ n1 -lt n2 ]` |

- ⚠️ The slide writes "then" for "than" again, and "n1greater" is missing a space.
- Watch out: strings use `=` and `!=` (p16), numbers use `-eq` / `-ne` / `-lt` / … (p17).

### [S04-p18] Homework: `user.sh` and `number.sh` ⭐
- Code (verbatim, straight quotes):
  ```bash
  $ cat user.sh
  #!/bin/bash
  echo -n "Enter your login name: "
  read name
  if [ "$name" = "$USER" ];
  then
      echo "Hello, $name. How are you today ?"
  else
      echo "You are not $USER, so who are you ?"
  fi
  ```
  ```bash
  $ cat number.sh
  #!/bin/bash
  echo -n "Enter a number 1 < x < 10: "
  read num
  if [ "$num" -lt 10 ]; then
      if [ "$num" -gt 1 ]; then
          echo "$num*$num=$(($num*$num))"
      else
          echo "Wrong insertion !"
      fi
  else
      echo "Wrong insertion !"
  fi
  ```
- What they do (✅ run locally):
  - `user.sh` compares the typed name with the environment variable `$USER` using the string test `=`. Typing your login name gives `Hello, <name>. How are you today ?`; any other name gives `You are not <USER>, so who are you ?`.
  - `number.sh` uses **nested ifs** and accepts only 1 < x < 10. Input 5 → `5*5=25`, 9 → `9*9=81`, 1 → `Wrong insertion !`, 10 → `Wrong insertion !`.
- ⚠️ The slide has curly quotes again. ✅ With curly quotes, `[ “$num” -lt 10 ]` fails with "integer expression expected", so type straight quotes.

### [S04-p19] Expressions (3) — file operators

  | Operator | Meaning (slide) | Example |
  |---|---|---|
  | `-d` | path given is a directory | `[ -d fname ]` |
  | `-f` | path given is a file | `[ -f fname ]` |
  | `-e` | file name exists | `[ -e fname ]` |
  | `-r` | read permission is set for file or directory | `[ -r fname ]` |
  | `-s` | file has a length greater than 0 | `[ -s fname ]` |
  | `-w` | write permission is set | `[ -w fname ]` |
  | `-x` | execute permission is set | `[ -x fname ]` |

- Link to p3: `-x` tests the same "x bit" whose absence produces exit code **126**.

### [S04-p20] Expressions (4) — logical operators ⭐

  | Operator | Meaning (slide) |
  |---|---|
  | `!` | negate (NOT) a logical expression |
  | `-a` | logically AND two logical expressions |
  | `-o` | logically OR two logical expressions |

- Example (verbatim, with straight quotes and a normal hyphen):
  ```bash
  #!/bin/bash
  echo -n "Enter a number 1 < x < 10:"
  read num
  if [ "$num" -gt 1 -a "$num" -lt 10 ];
  then
      echo "$num*$num=$(($num*$num))"
  else
      echo "Wrong insertion !"
  fi
  ```
  This single `if … -a …` replaces the two nested ifs of `number.sh` (p18). ✅ Same results: 5 → `5*5=25`; 1 and 10 → `Wrong insertion !`.
- Right-hand box (verbatim):
  ```bash
  # Run B only if A succeeded
  A && B

  # Run B only if A failed
  A || B

  # Classic: try, or fall back
  cd /srv/app || exit 1
  ```
  "Succeeded" means exit status 0 (p3). ✅ `cd /nonexistent || echo fallback` printed the cd error, then `fallback`.
- ⚠️ The slide prints the AND operator as **`–a`** with a long dash (en-dash). ✅ Typed that way, bash fails with `[: too many arguments` and prints `Wrong insertion !` even for 5. Use a normal hyphen: `-a`.

### [S04-p21] Iteration Statements (1) — `for`
- The **for** structure is used when looping through a range of variables:
  ```bash
  for var in list
  do
      statements
  done
  ```
- The statements run once **with var set to each value in the list**.
- Example (verbatim):
  ```bash
  #!/bin/bash
  let sum=0
  for num in 1 2 3 4 5
  do
      let "sum = $sum + $num"
  done
  echo $sum
  ```
  ✅ Output: `15` (= 1+2+3+4+5).

### [S04-p22] Iteration Statements (2) — list vs script arguments
- Loop over a fixed list (one line per second because of `sleep 1`):
  ```bash
  #!/bin/bash
  for x in paper pencil pen
  do
      echo "The value of variable x is: $x"
      sleep 1
  done
  ```
  ✅ Prints `The value of variable x is: paper`, then `pencil`, then `pen`.
- ⭐ **If the list part is left off, var is set to each parameter passed to the script (`$1`, `$2`, `$3`, …):**
  ```
  $ cat for1.sh
  #!/bin/bash
  for x
  do
      echo "The value of variable x is: $x"
      sleep 1
  done
  $ for1.sh arg1 arg2
  The value of variable x is: arg1
  The value of variable x is: arg2
  ```
- `for1.sh` is run without `./`, which only works when `.` is on PATH (p13). ✅ Verified with `PATH=$PATH:.`.

### [S04-p23] Using Arrays with Loops
- Two simple ways to create an array:
  ```bash
  pet[0]=dog
  pet[1]=cat
  pet[2]=fish
  pet=(dog cat fish)
  ```
- "We may have **up to 1024 elements**." To extract one value use `${arrayname[i]}`:
  ```
  $ echo ${pet[0]}
  dog
  ```
- To extract all the elements, use an asterisk: `echo ${arrayname[*]}`
- Combine arrays with a for loop:
  ```bash
  for x in ${arrayname[*]}
  do
      ...
  done
  ```
- ✅ `${pet[0]}` → `dog`; `${pet[*]}` → `dog cat fish`; the loop visits dog, cat, fish.
- ⚠️ About "up to 1024 elements": bash 3.2 here built a 5000-element array with no error. If an exam asks what the slide says, the answer is 1024. 🔎 Look up in Track B: the real bash array limit.

### [S04-p24] Functions
- Functions make scripts easier to maintain by breaking the program into smaller pieces. A function performs an action you define, and it can return a value if you wish.
  ```bash
  #!/bin/bash
  hello()
  {
  echo "You are in function hello()"
  }

  echo "Calling function hello()..."
  hello
  echo "You are now out of function hello()"
  ```
  ✅ Output:
  ```
  Calling function hello()...
  You are in function hello()
  You are now out of function hello()
  ```
- The function is called just by its name (the line `hello`). The slide explains that bash then looks up `hello()` in the script, finds it at the top, and runs its body. The definition comes *before* the call.
- 🔎 Look up in Track B: how a bash function "returns a value" (the slide mentions it but shows no example).

### [S04-p25] Questions?
- Closing slide, no content.

### Slide 5 — CPU Scheduling

> How to read the Gantt charts below: `| P1 | P2 |` means P1 holds the CPU, then P2. The numbers underneath are the times at each box edge. Box widths are only roughly to scale.

### [S05-p1] Title — CPU Scheduling
- SOC 3010 Operating Systems; instructor Jalolliddin Yusupov; dated 9/15/2026. Meme: "SCHEDULING? I LIKE SCHEDULING!!"

### [S05-p2] The Problem the Kernel Must Solve ⭐
- A process runs **on the real CPU, with the real registers**. That is why it is fast, and also why it is dangerous: **while it runs, the kernel is not running.**
- Banner: "So who gives the CPU back? Two answers in history:"

  | Approach | How the CPU comes back (paraphrased) |
  |---|---|
  | **Cooperative** | The program hands the CPU over itself, by calling `yield()` (a system call whose only job is "let someone else run") or any other system call. Windows 3.x and classic Mac OS worked this way. A single `while (1);` in any program froze the whole machine (the 1990s). |
  | **Preemptive** | The kernel **takes** the CPU away. Its tool is the **timer interrupt**: a hardware clock raises an interrupt every few milliseconds, the CPU stops the process, jumps into the kernel, and the kernel decides who runs next. |

- "Two names" box:
  - **Interrupt** — "a hardware signal that makes the CPU stop what it is doing and run a kernel routine (the *handler*)". The slide calls it the same idea as a signal handler, "one floor down" (compare `trap` on [S04-p8]).
  - **Preemption** — "taking the CPU from a process that did not ask to give it up." The process never notices: it later wakes up with its registers exactly as they were (**context switch**).
- Why `while (1);` froze cooperative machines: the loop never makes a system call, so it never gives the CPU back.
- 🔎 Look up in Track B: the slide says the CPU stops the process "mid-instruction". Check whether interrupts are really taken mid-instruction or between instructions.

### [S05-p3] What the Scheduler Decides, and for Whom ⭐
- Only **runnable** processes are on the scheduler's list: state **R** in `ps`. Sleeping processes are off it:
  - **S** — waiting for something *interruptible*: a pipe, a signal, a `sleep()`.
  - **D** — waiting in the kernel for a disk or network operation that **cannot be interrupted, not even by `kill -9`**.
  - (This is the same `S` you saw in the STAT column on [S04-p5].)
- The scheduler decides two things:
  - **Which** runnable process gets the CPU next.
  - **For how long** before the timer takes it back.
- **"Two customers who want opposite things":**

  | Customer | Examples | Wants | Doesn't care about |
  |---|---|---|---|
  | **Throughput** | compiler, video encode, database rebuild | jobs finished per hour | whether it waited 3 s to start |
  | **Latency** | your editor, a shell, a game | key press → screen reaction ideally **under ~50 ms** | how long it takes to finish (it never finishes) |

- ⭐ Banner: **"There is no fair; there is only a chosen victim."**
- "Why this is a fight" (paraphrased): every millisecond spent switching to the editor is a millisecond the encode did not get. No setting pleases both; you only choose whom to disappoint, and by how much.

### [S05-p4] The Metrics, and the Lies We Start With ⭐⭐
- **THREE NUMBERS PER JOB:**

  | Metric | Formula | Meaning (slide) |
  |---|---|---|
  | **Turnaround** | `T_completion − T_arrival` | How long from "job exists" to "job finished". *The batch customer's number.* |
  | **Response** | `T_first run − T_arrival` | How long until it did *anything*. *The interactive customer's number.* |
  | **Fairness** | — | Does everyone get a share? Is anyone waiting forever? |

- **Waiting time** — "amount of time a process has been waiting in the ready queue."
- ⭐⭐ **GANTT CHART (THE EXAM METHOD)**, "who holds the CPU, when":
  ```
  |   A    |  B  |    C     |
  0        3     5          9
  ```
  A time line with one box per stretch of CPU ownership. **Read completion times at the right edges and first-run times at the left edges.** The slide's answers: A turnaround 3, response 0 · B 5, 3 · C 9, 5.
- ✅ Worked check (all three arrive at t = 0, as the slide assumes):

  | Job | Burst | First run | Completion | Turnaround | Response | Waiting |
  |---|---|---|---|---|---|---|
  | A | 3 | 0 | 3 | 3 | 0 | 0 |
  | B | 2 | 3 | 5 | 5 | 3 | 3 |
  | C | 4 | 5 | 9 | 9 | 5 | 5 |
  | **avg** | | | | **17/3 ≈ 5.67** | **8/3 ≈ 2.67** | **8/3 ≈ 2.67** |

- **Four assumptions we will drop one by one** (slide list):
  1. Every job runs for the same time.
  2. All jobs arrive at the same moment.
  3. Once started, a job runs to completion — no I/O.
  4. The run time of each job is **known**.
  The slide calls all four unrealistic and says they make the first policy look fine.
- The slides never say which later page drops which assumption. Visible hints: p5–p6 use unequal job lengths (#1); p8 "add[s] the concepts of varying arrival times and preemption" (#2 and #3); p17 says "nobody knows a job's length in advance" (#4). I/O never comes up. 🔎 Look up in Track B: how I/O changes scheduling.

### [S05-p5] FIFO and the Convoy Effect — order P1, P2, P3 ⭐
- Definitions:
  - **CPU burst** — "A continuous period during which a process uses the CPU."
  - **Burst time** — "the total CPU time the process needs."
- Jobs (all arrive at t = 0, in the order P1, P2, P3):

  | Process | Burst Time |
  |---|---|
  | P1 | 24 |
  | P2 | 3 |
  | P3 | 3 |

- Gantt chart (slide):
  ```
  |              P1              | P2 | P3 |
  0                              24   27   30
  ```
- Waiting time: P1 = 0, P2 = 24, P3 = 27. **Average waiting time: (0 + 24 + 27)/3 = 17** ✅
- Extra, using the p4 formulas ✅: turnaround 24, 27, 30 → average **27**. Response equals waiting here (each job runs once and all arrive at 0) → average **17**.

### [S05-p6] FIFO and the Convoy Effect — order P2, P3, P1 ⭐
- Same jobs, arrival order **P2, P3, P1**:
  ```
  | P2 | P3 |              P1              |
  0    3    6                              30
  ```
- Waiting time: P1 = 6, P2 = 0, P3 = 3. **Average waiting time: (6 + 0 + 3)/3 = 3** ✅. "Much better than previous case."
- ⭐ **Convoy effect** — "short process behind long process", which hurts **average waiting time and response time**.
- Extra ✅: turnaround 30, 3, 6 → average **13** (versus 27). The jobs and the total time (30) are the same; only the order changed.

### [S05-p7] Shortest-Job-First (SJF) [non-preemptive] ⭐
- Associate with each process the length of its **next CPU burst**, and use these lengths to schedule the process with the shortest time.
- ⭐ **"SJF is optimal – gives minimum average waiting time for a given set of processes."**
  - The **difficulty** is knowing the length of the **next CPU request**.
  - Could ask the user.
- Jobs (as drawn: no arrival column, so all are there at t = 0):

  | Process | Burst Time |
  |---|---|
  | P1 | 6 |
  | P2 | 8 |
  | P3 | 7 |
  | P4 | 3 |

- Gantt chart (slide), shortest first: 3 → 6 → 7 → 8:
  ```
  | P4 |   P1   |    P3    |     P2     |
  0    3        9          16           24
  ```
- Waiting times: P1 3, P2 16, P3 9, P4 0. **Average = (3 + 16 + 9 + 0)/4 = 7** ✅
- Extra ✅: turnaround P1 9, P2 24, P3 16, P4 3 → average **13**.
- ⚠️ Title typo: "non-peemptive" should be "non-preemptive".
- ⚠️ **Hidden column:** the PDF's text layer has an "Arrival Time" column (P1 0.0, P2 2.0, P3 4.0, P4 5.0) that is **invisible on the slide**: the header and 0.0 / 2.0 are white, and 4.0 / 5.0 sit under the orange box. The drawn chart and the answer 7 only work if all four jobs are present at t = 0 (P4 could not run at 0 if it arrived at 5). If an exam gives these arrival times, non-preemptive SJF becomes (✅ computed):
  ```
  |   P1   | P4 |    P3    |     P2     |
  0        6    9          16           24
  ```
  Waiting 0, 14, 5, 1 → average **5**; turnaround 6, 22, 12, 4 → average **11**. At t = 0 only P1 exists, so it runs to the end; at t = 6 the shortest waiting job is P4 (3), then P3 (7), then P2 (8).

### [S05-p8] (SRTF) Shortest-remaining-time-first [preemptive] ⭐
- "Now we add the concepts of **varying arrival times** and **preemption** to the analysis."

  | Process | Arrival Time | Burst Time |
  |---|---|---|
  | P1 | 0 | 8 |
  | P2 | 1 | 4 |
  | P3 | 2 | 9 |
  | P4 | 3 | 5 |

- *Preemptive* SJF Gantt chart (slide):
  ```
  | P1 |   P2   |    P4    |      P1      |        P3        |
  0    1        5          10             17                 26
  ```
- Decision at each event (the rule is to run whoever has the **least remaining** time):
  - t = 0: only P1 (8) → P1 runs.
  - t = 1: P2 arrives (4) and P1 has 7 left → 4 < 7, so **P2 preempts P1**.
  - t = 2: P3 arrives (9) but P2 has 3 left → P2 keeps running. t = 3: P4 arrives (5) but P2 has 2 left → P2 keeps running.
  - t = 5: P2 finishes. Remaining: P1 7, P3 9, P4 5 → **P4**.
  - t = 10: P4 finishes. P1 7 vs P3 9 → **P1** (10–17). t = 17: **P3** (17–26).
- Slide: **Average waiting time = [(10−1)+(1−1)+(17−2)+(5−3)]/4 = 26/4 = 6.5 msec** ✅
  - P1: ran 0–1, then waited from 1 until 10 → 10 − 1 = 9. P2: 1 − 1 = 0. P3: 17 − 2 = 15. P4: 5 − 3 = 2.
- ⚠️ The slide prints "…+(17-2)+5-3)]/4"; the "(" before 5−3 is missing. The result 6.5 is correct.
- Extra ✅: completion P1 17, P2 5, P3 26, P4 10 → turnaround 17, 4, 24, 7 → average **13**. Response 0, 0, 15, 2 → average **4.25**.

### [S05-p9] (SRTF) Shortest-remaining-time-first [preemptive] — worked with a "remaining time" table ⭐

  | Process | Arrival Time | CPU Burst Time |
  |---|---|---|
  | P1 | 0 | 8 |
  | P2 | 4 | 10 |
  | P3 | 4 | 3 |
  | P4 | 10 | 4 |

- Gantt chart (slide). The dashed mark inside P1's second box at t = 10 is P4's arrival; it does **not** preempt P1.
  ```
  |    P1    |  P3  |     P1     |    P4    |          P2          |
  0          4      7      (10)  11         15                     25
  ```
- The slide's bookkeeping rows (time / arrived / remaining):

  | Time | 0 | 4 | 7 | 10 | 11 | 15 |
  |---|---|---|---|---|---|---|
  | Arrived | P1 | P2, P3 | — | P4 | — | — |
  | Remaining | P1(8) | P1(4), P2(10), P3(3) | P1(4), P2(10) | P1(1), P2(10), P4(4) | P2(10), P4(4) | P2(10) |
  | Runs | P1 | **P3** (3 < 4, preempts P1) | P1 (4 < 10) | P1 keeps running (1 < 4) | P4 (4 < 10) | P2 |

- Slide: **Average Turnaround Time** = sum of the turnaround times / number of processes = ((11−0) + (25−4) + (7−4) + (15−10))/4 = 40/4 = **10 ms** ✅
- Slide: **Average Waiting Time** = sum of the waiting times / number of processes = (3 + 11 + 0 + 1)/4 = 15/4 = **3.75 ms** ✅
  - Each WT = TAT − burst: 11−8 = 3, 21−10 = 11, 3−3 = 0, 5−4 = 1.
- Extra ✅: response 0, 11, 0, 1 → average **3**.

### [S05-p10] Priority Scheduling ⭐

  | Process | Burst Time | Priority |
  |---|---|---|
  | P1 | 10 | 3 |
  | P2 | 1 | 1 |
  | P3 | 2 | 4 |
  | P4 | 1 | 5 |
  | P5 | 5 | 2 |

- All five are present at t = 0. The chart shows the convention: **the smallest number runs first** (priority 1 goes first and 5 goes last).
- Gantt chart (slide):
  ```
  | P2 |   P5   |        P1        | P3 | P4 |
  0    1        6                  16   18   19
  ```
- **Average waiting time = 8.2 msec** ✅. Waiting: P1 6, P2 0, P3 16, P4 18, P5 1 → 41/5 = 8.2.
- ⭐ "**low priority can starve**" — "**aging fixes it**".
- Extra ✅: turnaround 16, 1, 18, 19, 6 → average **12**.
- 🔎 Look up in Track B: how aging works; the slide only names it.

### [S05-p11] (Example) Priority Scheduling [non-Preemptive]

  | Process | CPU Burst Time in ms | Priority |
  |---|---|---|
  | P1 | 6 | 2 |
  | P2 | 10 | 1 |
  | P3 | 4 | 3 |
  | P4 | 6 | 2 |

- Gantt chart (slide):
  ```
  |        P2        |    P1    |    P4    |  P3  |
  0                  10         16         22     26
  ```
- Tie: P1 and P4 both have priority 2, and **P1 goes first** because it is listed (arrived) first.
- Slide: **Average Turnaround Time** = (TAT_P1 + TAT_P2 + TAT_P3 + TAT_P4)/4 = (16 + 10 + 26 + 22)/4 = **18.5 ms** ✅ (74/4).
- Slide: **Average Waiting Time** = (WT_P1 + WT_P2 + WT_P3 + WT_P4)/4 = (10 + 0 + 22 + 16)/4 = "10.5 ms".
  - ⚠️ **WRONG NUMBER:** 10 + 0 + 22 + 16 = 48 and 48/4 = **12 ms**, not 10.5. The four waiting times are right; only the final division is wrong. ✅ Cross-check WT = TAT − burst: 16−6 = 10, 10−10 = 0, 26−4 = 22, 22−6 = 16 → 48 → 12 ms.

### [S05-p12] (Homework) Priority Scheduling [preemptive] ⭐

  | Process | Arrival Time | CPU Burst Time | Priority |
  |---|---|---|---|
  | P1 | 0 | 8 | 3 |
  | P2 | 4 | 10 | 2 |
  | P3 | 4 | 3 | 3 |
  | P4 | 10 | 4 | 1 |

- Gantt chart (given on the slide):
  ```
  |    P1    |       P2       |    P4    |    P2    |    P1    |   P3   |
  0          4                10         14         18         22       25
  ```
- The slide's bookkeeping rows, with the reason for each choice added:

  | Time | 0 | 4 | 10 | 14 | 18 | 22 |
  |---|---|---|---|---|---|---|
  | Arrived | P1 | P2, P3 | P4 | — | — | — |
  | Remaining | P1(8) | P1(4), P2(10), P3(3) | P1(4), P2(4), P3(3), P4(4) | P1(4), P2(4), P3(3) | P1(4), P3(3) | P3(3) |
  | Runs | P1 | **P2** (prio 2 beats 3, preempts P1) | **P4** (prio 1 preempts P2) | P2 (prio 2) | **P1** (prio-3 tie with P3; P1 arrived first) | P3 |

- The slide leaves both averages blank (homework). **Solution** (✅ verified by script):

  | Process | Arrival | Burst | Prio | Completion | TAT = C − A | WT = TAT − burst | Response |
  |---|---|---|---|---|---|---|---|
  | P1 | 0 | 8 | 3 | 22 | 22 | 14 | 0 |
  | P2 | 4 | 10 | 2 | 18 | 14 | 4 | 0 |
  | P3 | 4 | 3 | 3 | 25 | 21 | 18 | 18 |
  | P4 | 10 | 4 | 1 | 14 | 4 | 0 | 0 |

- **Average Turnaround Time = (22 + 14 + 21 + 4)/4 = 61/4 = 15.25 ms**
- **Average Waiting Time = (14 + 4 + 18 + 0)/4 = 36/4 = 9 ms** (average response = 18/4 = 4.5)
- Note how P3 (short, but priority 3) waits 18 units, which is the starvation tendency from p10 on a small scale.

### [S05-p13] Round Robin (RR) ⭐
- Each process gets a small unit of CPU time, the **time quantum q**, usually **10–100 milliseconds**. When it runs out, the process is **preempted and added to the end of the ready queue**.
- With **n** processes in the ready queue and quantum **q**, each process gets **1/n of the CPU time** in chunks of **at most q** time units at once. ⭐ **No process waits more than (n−1)q time units.**
- The **timer interrupts every quantum** to schedule the next process.
- Performance:
  - **q large ⇒ FIFO**
  - **q small ⇒ q must be large with respect to context switch, otherwise overhead is too high**
- Example (time quantum 4), all arrive at t = 0 in the order P1, P2, P3:

  | Process | Burst Time |
  |---|---|
  | P1 | 24 |
  | P2 | 3 |
  | P3 | 3 |

  ```
  | P1 | P2 | P3 | P1 | P1 | P1 | P1 | P1 |
  0    4    7    10   14   18   22   26   30
  ```
- P2 and P3 need only 3 < q, so they **finish early** (at 7 and 10). A slice can be shorter than q. After t = 10 only P1 is left, so it gets every quantum.
- ✅ (n−1)q check: n = 3 and q = 4, so nobody should wait more than 8. The longest wait here is P3's 7 (from 0 to 7).

### [S05-p14] Example of RR with Time Quantum = 4 ⭐
- Slide bullets:
  - "Typically, **higher average turnaround than SJF, but better *response***"
  - "q should be large compared to **context switch** time"
  - "q usually 10ms to 100ms, context switch < 10 usec" (usec = microseconds)
- Definition box: "A **context switch** is the kernel saving one process's registers and stack pointer into that process's kernel record, restoring the next one's, and jumping. The interrupted process does not know it happened."
- Same table and chart as p13. ✅ Computed metrics:

  | Job | Burst | First run | Completion | TAT | WT | Response |
  |---|---|---|---|---|---|---|
  | P1 | 24 | 0 | 30 | 30 | 6 | 0 |
  | P2 | 3 | 4 | 7 | 7 | 4 | 4 |
  | P3 | 3 | 7 | 10 | 10 | 7 | 7 |
  | **avg** | | | | **47/3 ≈ 15.67** | **17/3 ≈ 5.67** | **11/3 ≈ 3.67** |

- ✅ Same three jobs under each policy taught:

  | Policy | avg WT | avg TAT | avg response |
  |---|---|---|---|
  | FIFO, order P1,P2,P3 [p5] | 17 | 27 | 17 |
  | SJF = order P2,P3,P1 [p6/p7] | 3 | 13 | 3 |
  | RR q = 4 [p13] | 5.67 | 15.67 | 3.67 |

  RR's turnaround is higher than SJF's (15.67 vs 13), as the slide says. RR's response is far better than FIFO in arrival order (3.67 vs 17). In this tiny example SJF's average response (3) happens to be slightly lower; the slide says "*typically*". Practice Problem 3 in §5 shows RR beating SJF on response.
- Scale: q ≥ 10 ms against a switch of < 10 µs means one switch costs at most 0.1% of a quantum.

### [S05-p15] Time Quantum and Context Switch Time
- Figure: one process with **process time = 10**, cut into quantum-sized pieces:

  | quantum | timeline | context switches |
  |---|---|---|
  | 12 | one piece 0–10 | **0** |
  | 6 | 0–6, 6–10 | **1** |
  | 1 | ten pieces 0–1, 1–2, …, 9–10 | **9** |

- Pattern in the figure: pieces = 10/q rounded up, and switches = pieces − 1. **Smaller q → more context switches → more overhead** (p13: "otherwise overhead is too high").

### [S05-p16] Round Robin (RR) (Homework) ⭐

  | Process | CPU Burst Times in ms |
  |---|---|
  | P1 | 8 |
  | P2 | 10 |
  | P3 | 6 |
  | P4 | 4 |

- ⚠️ The quantum is **not written** on the slide. The 2-unit slices in the chart show **q = 2** (all jobs at t = 0, in the order P1–P4).
- Gantt chart (slide, "Timings"):
  ```
  | P1 | P2 | P3 | P4 | P1 | P2 | P3 | P4 | P1 | P2 | P3 | P1 | P2 | P2 |
  0    2    4    6    8    10   12   14   16   18   20   22   24   26   28
  ```
  Completed processes: **P4 at 16, P3 at 22, P1 at 24, P2 at 28.**
- Slide: **Average TAT** = (TAT_P1 + TAT_P2 + TAT_P3 + TAT_P4)/4 = (24 + 28 + 22 + 16)/4 = **22.5 ms** ✅
- Slide's waiting-time method: multiply the time quantum by the number of time slices the process spent waiting in the ready queue.
  - **Average WT** = (8·2 + 9·2 + 8·2 + 6·2)/4 = 62/4 = **15.5 ms** ✅
  - Slices waited: P1 8, P2 9, P3 8, P4 6. Cross-check with WT = TAT − burst: 24−8 = 16, 28−10 = 18, 22−6 = 16, 16−4 = 12 ✅.
  - ⚠️ Caution: the slice-counting shortcut works here only because every slice is a full 2 units (every burst is a multiple of q). When some slices are shorter than q (as on p13), use **WT = TAT − burst** instead.
- Extra ✅: response P1 0, P2 2, P3 4, P4 6 → average **3**. The (n−1)q bound holds: with 4 jobs each waits exactly 6 = 3·2 between turns; after P4 leaves, each waits 4 = 2·2.

### [S05-p17] MLFQ: Learning the Future from the Past ⭐
- "SJF is optimal and impossible: nobody knows a job's length in advance. The **multi-level feedback queue (MLFQ)** guesses it from the job's *past*."
- The slide's MLFQ floors:

  | Floor | Rule | Who goes here? |
  |---|---|---|
  | **Queue 0** (Top floor) | Time Quantum = **1** | Brand new processes |
  | **Queue 1** (Middle floor) | Time Quantum = **2** | Processes that didn't finish in Q0 |
  | **Queue 2** (Ground floor) | **FCFS (no limit)** | Processes that didn't finish in Q1 |

- Diagram: "High Priority" at the top and "Low Priority" at the bottom. Queue 1 → Queue 2 → Queue 3, with arrows showing an unfinished job dropping down one queue.
- ⚠️ The diagram numbers the queues **1–3** while the table numbers them **0–2**. They are the same three floors.
- ⭐ **Rules (slide bullets):**
  - **Key Rule:** "Always run the **highest queue first**. Only go to a lower queue when the higher one is **empty**."
  - If a process **finishes** within its time quantum → ✅ "Great! It's done."
  - If a process **doesn't finish** → ⬇️ it gets **demoted** (pushed down) to the next queue.
  - This is the **"feedback"**: the system learns that "this process needs more time, let's give it a bigger slice but lower priority."
- ⭐ Banner: **"MLFQ is shortest-job-first for people who cannot see the future — and every desktop OS is a tuned version of it."**
- What the slide's numbers imply: a job needing **1** unit finishes on the top floor; a job needing **2–3** units finishes on the middle floor (1 + 2 = 3); anything **longer than 3** reaches the ground floor.
- The slides have no worked MLFQ example; see Practice Problem 4 in §5.
- 🔎 Look up in Track B: what happens when a new job arrives while a lower-queue job is running (does it preempt?), and any further MLFQ rules (e.g., periodic priority boost) that are not on this slide.

### [S05-p18] Questions?
- Closing slide, no content.

> ⚠️ **Coverage note:** the Linux scheduler and cgroups do **not** appear anywhere in these 18 pages, even though they were listed as topics for this week. 🔎 Look up in Track B: the Linux scheduler and cgroups.

---

## 3. Definitions & key terms

### 3a. Shell & bash (Slide 4)

| Term | Definition (as on the slides, short quotes or paraphrase) | Ref |
|---|---|---|
| **Shell** | A user-space program for talking to the OS, interactively or through a script. Internally it is a loop of read → parse → fork → exec → wait. | S04-p2 |
| **REPL** | Read–eval–print loop: the shell's main loop (pseudo-code on the slide). | S04-p2 |
| **Builtin** | A command the shell runs itself, inside its own process with no fork (`run_here`). | S04-p2 |
| **`$?` (exit status)** | "the shell variable holding the last command's exit status". 0 = success, 1–125 = program's own meaning, 126 = not executable, 127 = not found, 128+N = killed by signal N. | S04-p2, p3 |
| **Subshell** | "a child copy of the current shell process"; it inherits variables, functions and options, but its changes are invisible to the parent. Created by `( … )`. | S04-p4 |
| **Process / PID** | A running program; has a PID. | S04-p5 |
| **Process group / PGID / group leader** | A set of processes with a shared PGID. Signals can target the whole group. The leader's PGID == its PID. | S04-p5 |
| **Session / SID / session leader** | A collection of process groups with a shared SID, usually tied to one **controlling terminal**. Its leader is the session leader. | S04-p5 |
| **Foreground job** | Owns the terminal, reads input, receives Ctrl+C. | S04-p6 |
| **Background job** | Runs but does not own the terminal (started with `&`). Reading the terminal → SIGTTIN, which stops it. | S04-p6 |
| **Stopped job** | Suspended by Ctrl+Z (SIGTSTP); frozen in memory; resumed with `fg` / `bg`. | S04-p6 |
| **`%n` (job spec)** | Job number n from `jobs` (e.g., `bg %1`, `fg %2`). `+` = most recent job, `-` = the previous one. | S04-p6 |
| **Signals named in S04** | SIGINT = Ctrl+C (2), `kill -9` (9), SIGSEGV = segfault (11), SIGTERM (15), SIGTSTP = Ctrl+Z, SIGTTIN = background read. | S04-p3, p5, p6, p8 |
| **Daemon** | A long-running background service: no controlling terminal, usually started at boot, an orphan whose parent is `init` (PID 1). Examples: `sshd`, `crond`, `nginx`, `systemd`. | S04-p7 |
| **systemd** | "a system and service manager for Linux that initializes the operating system and manages background services after the kernel boots". | S04-p7 |
| **`trap`** | A builtin that registers commands to run when the shell receives a signal (`SIGINT`) or when the script finishes (`EXIT`). | S04-p8 |
| **Script** | "a text file of commands that the shell reads and executes". | S04-p9 |
| **Shebang** | The first line (`#!/bin/bash`, `#!/usr/bin/env bash`) that tells the kernel which interpreter to use. It only matters when the file is executed directly. | S04-p9 |
| **`$0`, `$1`, `$2`, `$@`** | The command/script name, the 1st argument, the 2nd argument, all arguments. | S04-p9 |
| **Programming vs scripting language** | Compiled into an executable: faster and more powerful, but not easily ported. Interpreted one instruction at a time: slower, but the source ports easily. bash, Perl, Lisp and Tcl are scripting languages. | S04-p10 |
| **Local vs environmental variable** | Two types of variables. Environmental ones are set by the system, can be listed with `env`, and hold special values (`SHELL`, `PATH`, `HOME`). `export` turns a variable into an environmental one so child processes can see it. | S04-p12, p13 |
| **`PATH`** | "The search path for commands": a colon-separated list of directories searched when you type a command. | S04-p13 |
| **`HOME`** | "The default argument (home directory) for cd". | S04-p13 |
| **Expression `[ … ]`** | A string comparison, numeric comparison, file operator or logical operator inside `[ ]`, with spaces after `[` and before `]`. | S04-p15–p20 |
| **Array** | `pet=(dog cat fish)` or `pet[0]=dog`…; read one value with `${pet[i]}` and all of them with `${pet[*]}`. The slide says "up to 1024 elements". | S04-p23 |
| **Function** | A named block (`hello() { … }`) that breaks a script into smaller pieces; it is called by name. | S04-p24 |

### 3b. CPU scheduling (Slide 5)

| Term | Definition (as on the slides) | Ref |
|---|---|---|
| **Cooperative scheduling** | The program gives the CPU back itself via `yield()` or another system call (Windows 3.x, classic Mac OS). | S05-p2 |
| **Preemptive scheduling** | The kernel takes the CPU away using the **timer interrupt** (a hardware clock fires every few ms). | S05-p2 |
| **`yield()`** | "a system call whose only job is 'let someone else run'". | S05-p2 |
| **Interrupt** | "a hardware signal that makes the CPU stop what it is doing and run a kernel routine (the handler)", like a signal handler one floor down. | S05-p2 |
| **Preemption** | "taking the CPU from a process that did not ask to give it up". | S05-p2 |
| **Context switch** | "the kernel saving one process's registers and stack pointer into that process's kernel record, restoring the next one's, and jumping." The interrupted process doesn't know it happened. Costs < 10 µs. | S05-p2, p14 |
| **R / S / D states** | R = runnable (on the scheduler's list). S = waiting for something interruptible (pipe, signal, `sleep()`). D = waiting in the kernel for disk/network, uninterruptible even by `kill -9`. | S05-p3 |
| **Throughput** | Jobs finished per hour; what batch work (compiler, encode, DB rebuild) wants. | S05-p3 |
| **Latency** | Time from key press to screen reaction (ideally < ~50 ms); what interactive programs want. | S05-p3 |
| **Turnaround time** | `T_completion − T_arrival` (the batch customer's number). | S05-p4 |
| **Response time** | `T_first run − T_arrival` (the interactive customer's number). | S05-p4 |
| **Waiting time** | "amount of time a process has been waiting in the ready queue". | S05-p4 |
| **Fairness** | Does everyone get a share? Is anyone waiting forever? | S05-p4 |
| **Gantt chart** | A time line with one box per stretch of CPU ownership ("the exam method"). | S05-p4 |
| **CPU burst** | "A continuous period during which a process uses the CPU." | S05-p5 |
| **Burst time** | "the total CPU time the process needs." | S05-p5 |
| **FIFO** | Run jobs in arrival order, each to completion. (p17 writes **FCFS** for its bottom queue; the slides never expand that acronym. 🔎 Look up in Track B: FCFS vs FIFO.) | S05-p5, p6, p13, p17 |
| **Convoy effect** | "short process behind long process", which hurts average waiting and response time. | S05-p6 |
| **SJF** | Schedule the process with the shortest next CPU burst (non-preemptive). Optimal for average waiting time. | S05-p7 |
| **SRTF** | Shortest-remaining-time-first = "Preemptive SJF": a newly arrived job with less remaining time takes the CPU. | S05-p8, p9 |
| **Priority scheduling** | The highest priority runs first (in the slides' examples the **smallest number** is highest). Non-preemptive or preemptive. | S05-p10–p12 |
| **Starvation / aging** | "low priority can starve"; "aging fixes it". | S05-p10 |
| **Round Robin (RR)** | Each process runs at most one **time quantum q** (10–100 ms), then is preempted and added to the end of the ready queue. | S05-p13 |
| **Time quantum q** | The CPU slice in RR / MLFQ. q large ⇒ FIFO; q small ⇒ too much context-switch overhead. | S05-p13–p15 |
| **MLFQ** | Multi-level feedback queue: guesses a job's length from its past. The highest non-empty queue runs; a job that doesn't finish within its quantum is **demoted**. | S05-p17 |
| **Feedback / demotion** | "This process needs more time, let's give it a bigger slice but lower priority." | S05-p17 |

---

## 4. Formula sheet & algorithm cheat-table (as taught)

### 4.1 Formulas

```
Turnaround   TAT = T_completion − T_arrival                         [S05-p4]
Response     RT  = T_first_run  − T_arrival                         [S05-p4]
Waiting      WT  = time spent in the ready queue                    [S05-p4]
                 = TAT − burst      ← matches every slide answer (p9, p11, p16)
                 = add up the gaps   ← style of p8: (10−1)+(1−1)+(17−2)+(5−3)
Average X        = (X_P1 + X_P2 + … + X_Pn) / n                     [S05-p9, p11, p16]

Non-preemptive & all arrive at 0  →  RT = WT for every job (each job starts once)

RR: each job gets 1/n of the CPU in chunks ≤ q;  no job waits > (n−1)·q   [S05-p13]
RR slide shortcut: WT = q × (#slices spent waiting)  — ONLY if every slice is a full q   [S05-p16]
One job of length T, quantum q:  pieces = ⌈T/q⌉,  context switches = ⌈T/q⌉ − 1   [S05-p15 figure]

Exit code of a command killed by signal N:  $? = 128 + N              [S04-p3]
```

### 4.2 "The exam method": computing a schedule by hand (S05-p4 + how the slides work their examples)
1. Copy the job table (arrival, burst, priority).
2. Walk the time line from t = 0. At every **event** (an arrival, a completion, or a quantum running out in RR/MLFQ) choose who runs, using the policy's rule.
3. Draw the Gantt chart with **one box per stretch of CPU ownership**, and write every boundary time under the edges.
4. Read each job's **completion** at the **right edge** of its last box and its **first run** at the **left edge** of its first box.
5. Compute TAT = C − A, WT = TAT − burst, RT = first run − A, then average each column.
6. Cross-check WT another way (add up the gaps), as the slides do.
- Tie rule visible on the slides: **equal priority → the job that arrived (is listed) first** (p11: P1 before P4; p12 at t = 18: P1 before P3). The SRTF and RR examples never contain a tie. 🔎 Look up in Track B: tie rules for SRTF and for RR when an arrival and a preempted job reach the queue at the same moment.

### 4.3 Policy cheat-table

| Policy | Rule (as taught) | Preemptive? | Pros (from slides) | Cons / pitfalls (from slides) | Ref |
|---|---|---|---|---|---|
| **FIFO** | Run in arrival order; each job runs to completion | No | Looks fine under the 4 assumptions (p4); fine when short jobs happen to come first (p6: avg WT 3) | **Convoy effect**: a short process behind a long one hurts avg WT and response (p5: 17 vs p6: 3) | S05-p4–p6 |
| **SJF** | Pick the process with the **shortest next CPU burst**; it then runs to completion | No (title: "non-preemptive") | **Optimal: minimum average waiting time** for a given set of processes | You must know the length of the **next CPU request** ("could ask the user"); "optimal and impossible" | S05-p7, p17 |
| **SRTF** (preemptive SJF) | On every arrival, run the job with the **least remaining time**; a newcomer with less remaining time preempts | **Yes** | Handles varying arrival times; short late arrivals don't wait behind a long job | Still needs to know run times (same problem as SJF); long jobs get pushed back (P3 waits 15 on p8) | S05-p8, p9 |
| **Priority** | Highest priority runs first (smallest number in the examples) | Both versions taught: non-preemptive (p10, p11), preemptive (p12) | Important jobs go first | **Low priority can starve → aging fixes it** | S05-p10–p12 |
| **RR** | Run each job for at most **q**, then send it to the **end of the ready queue**; the timer interrupts every quantum | **Yes** | **Better response**; each job gets 1/n of the CPU; no wait over (n−1)q | **Typically higher avg turnaround than SJF**; q large ⇒ becomes FIFO; q small ⇒ context-switch overhead too high (q 10–100 ms ≫ switch < 10 µs) | S05-p13–p16 |
| **MLFQ** | Several queues; always run the **highest non-empty** queue; finish within the quantum → done, else **demoted** | Time-sliced on the upper floors (Q0 q=1, Q1 q=2); the ground floor is FCFS with no limit | Learns each job's length from its past ("SJF for people who cannot see the future"); short jobs finish high up | Long jobs sink to the lowest priority; arrival and preemption rules aren't given on the slide (🔎 Track B) | S05-p17 |

### 4.4 MLFQ rules (exactly as on S05-p17)
- Floors: **Q0 (top): q = 1, brand-new processes** → **Q1 (middle): q = 2, jobs that didn't finish in Q0** → **Q2 (ground): FCFS, no limit, jobs that didn't finish in Q1**.
- **Key Rule:** always run the highest queue first; only go to a lower queue when the higher one is empty.
- Finished within its quantum → done ✅. Didn't finish → demoted one floor ⬇️.
- "Feedback": a job that needs more time gets **a bigger slice but lower priority**.
- What the numbers imply: needing 1 unit → done in Q0; 2–3 units → done in Q1; > 3 units → reaches Q2.

### 4.5 Shell, job-control & bash command table (everything shown on Slide 4)

| Command / construct | What it does (per slides) | Ref |
|---|---|---|
| `$?` | Exit status of the last command | S04-p2, p3 |
| `true` / `false` | `$?` = 0 / 1 | S04-p3 |
| `./nope` / `./x` (no +x) | `$?` = 127 (not found) / 126 (not executable) | S04-p3 |
| `kill -9 <pid>` | Kill with signal 9 → `$?` = 137 | S04-p3 |
| `kill -TERM <pid>` | SIGTERM (15) → `$?` = 143 | S04-p3 |
| Ctrl-C / segfault | `$?` = 130 (signal 2) / 139 (signal 11) | S04-p3 |
| `grep` exit codes | 1 = no match, 2 = error | S04-p3 |
| `( cmds )` | Run in a **subshell** (child): changes are lost | S04-p4 |
| `{ cmds; }` | Group in the **current** shell: changes stay | S04-p4 |
| `ps -eo pid,ppid,pgid,sid,tty,stat,comm` | `-e` all processes; `-o` custom columns (PID, parent, group, session, terminal, state, command) | S04-p5 |
| `kill -INT -1500` | Send SIGINT to the **whole process group** 1500 (note the minus) | S04-p5 |
| `vim file` | Start a job in the **foreground** | S04-p6 |
| `cmd &` (e.g. `sleep 60 &`) | Start a job in the **background** | S04-p6 |
| Ctrl+C | Goes to the foreground job | S04-p6 |
| Ctrl+Z (`^Z`) | Suspend the foreground job (SIGTSTP) → `Stopped` | S04-p6 |
| `jobs` | List jobs: `[n]`, `+` (most recent), `-` (previous), state | S04-p6 |
| `bg %1` | Resume job 1 **in the background** | S04-p6 |
| `fg %2` | Bring job 2 to the **foreground** | S04-p6 |
| `fg` | Bring the most recent (`+`) job to the foreground | S04-p6 |
| (background read) | A background job that reads the terminal gets SIGTTIN and stops | S04-p6 |
| `sudo nano /etc/systemd/system/telegram-bot.service` | Create a systemd unit file (`[Unit] Description=…`, `[Service] ExecStart=…`) | S04-p7 |
| `sudo systemctl enable telegram-bot` | Start the service automatically at reboot | S04-p7 |
| `trap 'cmds' SIGINT` / `trap 'cmds' EXIT` | Run cmds on Ctrl+C / when the script finishes | S04-p8 |
| `#!/bin/bash`, `#!/usr/bin/env bash` | Shebang (choose the interpreter) | S04-p9 |
| `chmod 700 hello.sh` / `chmod +x` then `./hello.sh` | Make the script executable and run it directly | S04-p9 |
| `bash hello.sh` | Run with bash explicitly (the shebang is ignored) | S04-p9 |
| `$0` `$1` `$2` `$@` | Script name, arg 1, arg 2, all args | S04-p9 |
| `mkdir`, `cp * trash`, `rm -rf trash`, `cat file`, `echo` | Commands used in the trash.sh example | S04-p11 |
| `name="Ana"` | Assignment (no spaces around `=`) | S04-p11 |
| `"$var"` / `'$var'` | Expands (keeps spaces together) / literal, no expansion | S04-p11 |
| `export x` | Put x into the environment so children see it | S04-p12 |
| `bash` / `exit` | Start a child shell / return to the parent | S04-p12 |
| `env`, `$SHELL`, `$PATH`, `$HOME`, `$USER` | Environment variables (`USER` is used in user.sh) | S04-p12, p13, p18 |
| `PATH=$PATH:.` | Add the current directory to the search path, so `command` works without `./` | S04-p13 |
| `read var` / `echo -n "prompt"` | Read input into a variable / print a prompt | S04-p13 |
| `rm -i $file` | Interactive remove (asks for confirmation) | S04-p13 |
| `let X=10+2*7` | Arithmetic assignment | S04-p14 |
| `$((expr))`, `$[expr]` | Arithmetic expansion | S04-p14 |
| `if [ … ]; then … elif [ … ]; then … else … fi` | Conditional; `elif` and `else` optional | S04-p15 |
| `=` `!=` `-n` `-z` | String tests | S04-p16 |
| `-eq -ne -gt -ge -lt -le` | Numeric tests | S04-p17 |
| `-d -f -e -r -s -w -x` | File tests | S04-p19 |
| `!` `-a` `-o` | NOT / AND / OR inside `[ ]` | S04-p20 |
| `A && B` / `A \|\| B` | Run B only if A succeeded / failed | S04-p20 |
| `cd /srv/app \|\| exit 1` | "Classic: try, or fall back" | S04-p20 |
| `for var in list; do …; done` | Loop over a list | S04-p21, p22 |
| `for x; do …; done` | Loop over the script's arguments `$1 $2 …` | S04-p22 |
| `sleep 1` | Pause 1 second (inside the loop example) | S04-p22 |
| `pet=(dog cat fish)`, `pet[0]=dog` | Create an array | S04-p23 |
| `${pet[0]}`, `${arrayname[*]}` | One element / all elements | S04-p23 |
| `hello() { …; }` then `hello` | Define and call a function | S04-p24 |

---

## 5. Worked examples

### 5.1 Every slide example, re-computed and verified ✅
All numbers below come from my simulator (FIFO / SJF / SRTF / priority / RR / MLFQ, integer time steps) and agree with hand calculation. The per-job tables and step-by-step decisions are in §2 under each page.

| Ref | Policy | Jobs (arrival, burst[, prio]) | Gantt boundaries | Completion times | avg TAT | avg WT | avg RT | Slide says | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| S05-p4 | FIFO | A(0,3) B(0,2) C(0,4) | A 0–3, B 3–5, C 5–9 | A3 B5 C9 | 17/3 ≈ 5.67 | 8/3 ≈ 2.67 | 8/3 ≈ 2.67 | A 3/0 · B 5/3 · C 9/5 (TAT/resp) | ✅ |
| S05-p5 | FIFO, order P1,P2,P3 | P1(0,24) P2(0,3) P3(0,3) | P1 0–24, P2 24–27, P3 27–30 | 24, 27, 30 | 27 | **17** | 17 | WT 17 | ✅ |
| S05-p6 | FIFO, order P2,P3,P1 | same | P2 0–3, P3 3–6, P1 6–30 | P1 30, P2 3, P3 6 | 13 | **3** | 3 | WT 3 | ✅ |
| S05-p7 | SJF (non-preemptive), all at 0 | P1 6, P2 8, P3 7, P4 3 | P4 0–3, P1 3–9, P3 9–16, P2 16–24 | P1 9, P2 24, P3 16, P4 3 | 13 | **7** | 7 | WT 7 | ✅ (title typo) |
| S05-p7* | SJF with the *hidden* arrivals 0, 2, 4, 5 | P1(0,6) P2(2,8) P3(4,7) P4(5,3) | P1 0–6, P4 6–9, P3 9–16, P2 16–24 | 6, 24, 16, 9 | 11 | 5 | 5 | — (not visible) | computed |
| S05-p8 | SRTF | P1(0,8) P2(1,4) P3(2,9) P4(3,5) | P1 0–1, P2 1–5, P4 5–10, P1 10–17, P3 17–26 | 17, 5, 26, 10 | 13 | **6.5** | 4.25 | WT 6.5 | ✅ (missing "(") |
| S05-p9 | SRTF | P1(0,8) P2(4,10) P3(4,3) P4(10,4) | P1 0–4, P3 4–7, P1 7–11, P4 11–15, P2 15–25 | 11, 25, 7, 15 | **10** | **3.75** | 3 | TAT 10, WT 3.75 | ✅ |
| S05-p10 | Priority (non-preemptive), all at 0 | P1(10,3) P2(1,1) P3(2,4) P4(1,5) P5(5,2) | P2 0–1, P5 1–6, P1 6–16, P3 16–18, P4 18–19 | 16, 1, 18, 19, 6 | 12 | **8.2** | 8.2 | WT 8.2 | ✅ |
| S05-p11 | Priority (non-preemptive), all at 0 | P1(6,2) P2(10,1) P3(4,3) P4(6,2) | P2 0–10, P1 10–16, P4 16–22, P3 22–26 | 16, 10, 26, 22 | **18.5** | **12** | 12 | TAT 18.5 ✅ · WT "10.5" | ⚠️ **WT wrong: 48/4 = 12** |
| S05-p12 | Priority (preemptive), homework | P1(0,8,3) P2(4,10,2) P3(4,3,3) P4(10,4,1) | P1 0–4, P2 4–10, P4 10–14, P2 14–18, P1 18–22, P3 22–25 | 22, 18, 25, 14 | **15.25** | **9** | 4.5 | blank (homework) | solved |
| S05-p13/14 | RR q = 4 | P1 24, P2 3, P3 3 (all at 0) | P1 0–4, P2 4–7, P3 7–10, P1 10–14–18–22–26–30 | 30, 7, 10 | 47/3 ≈ 15.67 | 17/3 ≈ 5.67 | 11/3 ≈ 3.67 | (no averages on slide) | computed |
| S05-p15 | 1 job, T = 10 | q = 12 / 6 / 1 | 1 / 2 / 10 pieces | — | — | — | — | 0 / 1 / 9 switches | ✅ |
| S05-p16 | RR q = 2 (q implied), homework | P1 8, P2 10, P3 6, P4 4 (all at 0) | 14 slices of 2 (see §2) | 24, 28, 22, 16 | **22.5** | **15.5** | 3 | TAT 22.5, WT 15.5 | ✅ |

### 5.2 New practice problems (by hand, then checked by script)
Conventions are the slides' own: **smaller priority number = higher priority**; equal priority → the job that arrived first; RR jobs arriving at the same time queue in the listed order.

---

#### Practice Problem 1 — FIFO vs SJF (the convoy effect)
Four jobs all arrive at t = 0 in the order A, B, C, D, with bursts **A = 8, B = 4, C = 1, D = 3**.
(a) Schedule them with FIFO. (b) Schedule them with SJF. For each, give the Gantt chart and the average turnaround, waiting and response times.

**(a) FIFO**, run in arrival order:
```
|    A    |  B  | C |  D |
0         8     12  13   16
```

| Job | Burst | First run | Completion | TAT | WT | RT |
|---|---|---|---|---|---|---|
| A | 8 | 0 | 8 | 8 | 0 | 0 |
| B | 4 | 8 | 12 | 12 | 8 | 8 |
| C | 1 | 12 | 13 | 13 | 12 | 12 |
| D | 3 | 13 | 16 | 16 | 13 | 13 |
| **avg** | | | | **49/4 = 12.25** | **33/4 = 8.25** | **8.25** |

**(b) SJF**, shortest first: C(1) → D(3) → B(4) → A(8):
```
| C |  D |  B  |    A    |
0   1    4     8         16
```

| Job | Burst | First run | Completion | TAT | WT | RT |
|---|---|---|---|---|---|---|
| A | 8 | 8 | 16 | 16 | 8 | 8 |
| B | 4 | 4 | 8 | 8 | 4 | 4 |
| C | 1 | 0 | 1 | 1 | 0 | 0 |
| D | 3 | 1 | 4 | 4 | 1 | 1 |
| **avg** | | | | **29/4 = 7.25** | **13/4 = 3.25** | **3.25** |

**Takeaway:** the long job at the front of the FIFO queue is the **convoy effect** [S05-p6]. SJF drops average waiting from 8.25 to 3.25, as expected since "SJF is optimal" for average waiting time [S05-p7].

---

#### Practice Problem 2 — SJF (non-preemptive) vs SRTF (preemptive)

| Process | Arrival | Burst |
|---|---|---|
| P1 | 0 | 9 |
| P2 | 1 | 5 |
| P3 | 3 | 2 |
| P4 | 6 | 4 |

**(a) SJF, non-preemptive.** At t = 0 only P1 exists, so it runs to the end (0–9). At t = 9 the ready jobs are P2 (5), P3 (2) and P4 (4), so the order is P3, P4, P2.
```
|     P1     | P3 |  P4  |   P2   |
0            9    11     15       20
```

| Job | Arr | Burst | First run | Completion | TAT | WT | RT |
|---|---|---|---|---|---|---|---|
| P1 | 0 | 9 | 0 | 9 | 9 | 0 | 0 |
| P2 | 1 | 5 | 15 | 20 | 19 | 14 | 14 |
| P3 | 3 | 2 | 9 | 11 | 8 | 6 | 6 |
| P4 | 6 | 4 | 11 | 15 | 9 | 5 | 5 |
| **avg** | | | | | **45/4 = 11.25** | **25/4 = 6.25** | **6.25** |

**(b) SRTF.** Re-decide at every arrival and completion:
- t = 0: P1 (9) runs.
- t = 1: P2 arrives (5) and P1 has 8 left. 5 < 8, so **P2 preempts**.
- t = 3: P3 arrives (2) and P2 has 3 left. 2 < 3, so **P3 preempts**.
- t = 5: P3 is done. P1 has 8 left and P2 has 3, so **P2** runs.
- t = 6: P4 arrives (4) but P2 has only 2 left, so **P2 continues** (like P1 vs P4 at t = 10 on S05-p9).
- t = 8: P2 is done. P1 (8) vs P4 (4) → **P4**. t = 12: P4 is done → **P1** runs 12–20.
```
| P1 | P2 | P3 |  P2  |   P4   |       P1       |
0    1    3    5      8        12               20
```

| Job | Arr | Burst | First run | Completion | TAT | WT | RT |
|---|---|---|---|---|---|---|---|
| P1 | 0 | 9 | 0 | 20 | 20 | 11 | 0 |
| P2 | 1 | 5 | 1 | 8 | 7 | 2 | 0 |
| P3 | 3 | 2 | 3 | 5 | 2 | 0 | 0 |
| P4 | 6 | 4 | 8 | 12 | 6 | 2 | 2 |
| **avg** | | | | | **35/4 = 8.75** | **15/4 = 3.75** | **2/4 = 0.5** |

WT check by gaps: P1 waits 1→12 = 11; P2 waits 3→5 = 2; P4 waits 6→8 = 2; P3 never waits. ✅
**Takeaway:** preemption lets short late arrivals jump ahead. Average WT falls from 6.25 to 3.75 and average TAT from 11.25 to 8.75, while the long job P1 pays (its WT goes from 0 to 11).

---

#### Practice Problem 3 — Round Robin, q = 3 (bursts are *not* multiples of q)
All arrive at t = 0 in the order P1, P2, P3, P4 with bursts **P1 = 5, P2 = 8, P3 = 2, P4 = 6**, and **q = 3**.

Ready-queue trace:
- t = 0: queue [P1, P2, P3, P4]. **P1** runs 0–3 (2 left) and goes to the back: [P2, P3, P4, P1].
- t = 3: **P2** runs 3–6 (5 left): [P3, P4, P1, P2].
- t = 6: **P3** needs only 2, so it runs 6–8 and is **done** (a short slice).
- t = 8: **P4** runs 8–11 (3 left): [P1, P2, P4].
- t = 11: **P1** runs 11–13 and is **done**.
- t = 13: **P2** runs 13–16 (2 left): [P4, P2].
- t = 16: **P4** runs 16–19 and is **done**. t = 19: **P2** runs 19–21 and is **done**.
```
| P1 | P2 | P3 | P4 | P1 | P2 | P4 | P2 |
0    3    6    8    11   13   16   19   21
```

| Job | Burst | First run | Completion | TAT | WT = TAT − burst | RT |
|---|---|---|---|---|---|---|
| P1 | 5 | 0 | 13 | 13 | 8 | 0 |
| P2 | 8 | 3 | 21 | 21 | 13 | 3 |
| P3 | 2 | 6 | 8 | 8 | 6 | 6 |
| P4 | 6 | 8 | 19 | 19 | 13 | 8 |
| **avg** | | | | **61/4 = 15.25** | **40/4 = 10** | **17/4 = 4.25** |

- ⚠️ Here the slide's "q × slices waited" shortcut [S05-p16] **fails**. P1 waits through 3 slices (P2, P3, P4), so the shortcut gives 3 × 3 = 9, but P3's slice lasted only 2 units and the true wait is 8. Use **WT = TAT − burst**.
- (n−1)q check: n = 4 and q = 3, so no wait should exceed 9. The longest is P4's first wait, 0→8 = 8 ✅.
- Process switches: 7 (every box edge changes process).
- **Same jobs under the other policies (✅ simulated):**

  | Policy | avg TAT | avg WT | avg RT |
  |---|---|---|---|
  | FIFO (P1, P2, P3, P4) | 54/4 = 13.5 | 33/4 = 8.25 | 8.25 |
  | SJF (P3, P1, P4, P2) | 43/4 = 10.75 | 22/4 = 5.5 | 5.5 |
  | **RR q = 3** | **15.25** | **10** | **4.25** |

**Takeaway:** RR gives the **best response** (4.25) and the **worst turnaround** (15.25), which is exactly what S05-p14 says: "higher average turnaround than SJF, but better response".

---

#### Practice Problem 4 — MLFQ with the slide's three floors (Q0: q = 1 · Q1: q = 2 · Q2: FCFS)
All arrive at t = 0 in the order A, B, C, D, with bursts **A = 6, B = 1, C = 3, D = 2**. Using the S05-p17 rules, give the schedule, the queue each job finishes in, and the averages. Then compare with FIFO and SJF.

Trace (always run the highest non-empty queue; whoever doesn't finish in its quantum is demoted):
- **Q0 round (q = 1):** A 0–1 (5 left → Q1) · B 1–2 (**done in Q0** ✅) · C 2–3 (2 left → Q1) · D 3–4 (1 left → Q1).
- Q0 is now empty, so **Q1 runs (q = 2):** A 4–6 (3 left → Q2) · C 6–8 (**done in Q1** ✅) · D 8–9 (**done in Q1** ✅, used 1 of its 2).
- Q0 and Q1 are empty, so **Q2 runs (FCFS, no limit):** A 9–12 (**done in Q2**).
```
queue:  Q0   Q0   Q0   Q0   Q1     Q1     Q1   Q2
       | A  | B  | C  | D  |  A   |  C   | D  |   A   |
       0    1    2    3    4      6      8    9       12
```

| Job | Burst | First run | Completion | TAT | WT | RT | Finished in |
|---|---|---|---|---|---|---|---|
| A | 6 | 0 | 12 | 12 | 6 | 0 | Q2 |
| B | 1 | 1 | 2 | 2 | 1 | 1 | Q0 |
| C | 3 | 2 | 8 | 8 | 5 | 2 | Q1 |
| D | 2 | 3 | 9 | 9 | 7 | 3 | Q1 |
| **avg** | | | | **31/4 = 7.75** | **19/4 = 4.75** | **6/4 = 1.5** | |

**Comparison (✅ simulated):**

| Policy | avg TAT | avg WT | avg RT |
|---|---|---|---|
| FIFO (A, B, C, D) | 35/4 = 8.75 | 23/4 = 5.75 | 5.75 |
| SJF (knows the lengths: B, D, C, A) | 22/4 = 5.5 | 10/4 = 2.5 | 2.5 |
| **MLFQ** | **7.75** | **4.75** | **1.5** |

**Takeaway:** without knowing any job length, MLFQ beats FIFO on turnaround and has the best response. SJF, which "sees the future", still wins on turnaround. The long job A sank to the ground floor while the 1-unit job finished on the top floor, which is the p17 banner in action: "MLFQ is shortest-job-first for people who cannot see the future".
(The slide gives no rule for jobs arriving while a lower queue runs, so this problem keeps every arrival at t = 0. 🔎 Look up in Track B: MLFQ with staggered arrivals.)

---

#### Bonus Practice Problem 5 — Priority, non-preemptive vs preemptive (like the S05-p12 homework)

| Process | Arrival | Burst | Priority |
|---|---|---|---|
| P1 | 0 | 5 | 3 |
| P2 | 1 | 3 | 1 |
| P3 | 2 | 6 | 4 |
| P4 | 4 | 2 | 2 |

**(a) Non-preemptive.** P1 is alone at t = 0 and runs 0–5. At t = 5 the ready jobs are P2 (1), P4 (2) and P3 (4), so the order is P2 → P4 → P3.
```
|   P1   |  P2  | P4 |     P3     |
0        5      8    10           16
```
TAT: P1 5, P2 7, P3 14, P4 6 → **32/4 = 8**. WT: 0, 4, 8, 4 → **16/4 = 4** (RT = WT here).

**(b) Preemptive.** t = 0: P1 runs. t = 1: P2 (priority 1) **preempts** P1 (3). t = 2: P3 (4) arrives, but its priority is lower, so P2 keeps the CPU. t = 4: P2 is done and P4 (2) arrives; ready are P1 (3), P3 (4), P4 (2) → **P4**. t = 6: **P1** (3). t = 10: **P3**.
```
| P1 |  P2  | P4 |    P1    |     P3     |
0    1      4    6          10           16
```

| Job | Arr | Burst | Prio | First run | Completion | TAT | WT | RT |
|---|---|---|---|---|---|---|---|---|
| P1 | 0 | 5 | 3 | 0 | 10 | 10 | 5 | 0 |
| P2 | 1 | 3 | 1 | 1 | 4 | 3 | 0 | 0 |
| P3 | 2 | 6 | 4 | 10 | 16 | 14 | 8 | 8 |
| P4 | 4 | 2 | 2 | 4 | 6 | 2 | 0 | 0 |
| **avg** | | | | | | **29/4 = 7.25** | **13/4 = 3.25** | **8/4 = 2** |

**Takeaway:** the lowest-priority job P3 waits 8 units in both versions. That is the starvation risk from S05-p10, and aging is the slide's fix.

---

## 6. Likely exam questions (built only from these slides)

### Part A — CPU scheduling
1. **[Compute]** Jobs A = 10, B = 2, C = 4 all arrive at t = 0 in the order A, B, C. (a) Draw the FIFO Gantt chart and give the average waiting and turnaround times. (b) Do the same for SJF. (c) Name the effect that makes (a) worse.
2. **[Compute, SRTF]** P1 (arrival 0, burst 7), P2 (1, 3), P3 (2, 7), P4 (4, 1). Draw the SRTF Gantt chart and compute the average TAT, WT and response time.
3. **[Draw the RR schedule]** RR with q = 2; P1 = 5, P2 = 3, P3 = 1, all at t = 0 in that order. Draw the schedule and compute the average WT and the average response time.
4. **[Compute, preemptive priority]** Smaller number = higher priority. P1 (arrival 0, burst 4, prio 2), P2 (1, 2, 1), P3 (2, 3, 3), P4 (3, 2, 1). Gantt chart, average TAT and average WT.
5. **[MLFQ]** Using the slide's MLFQ (Q0 q = 1, Q1 q = 2, Q2 FCFS), jobs X = 1, Y = 2, Z = 4 all arrive at t = 0 in the order X, Y, Z. Give the schedule and the queue each job finishes in.
6. **[MCQ set]**
   (a) Which policy gives the minimum average waiting time for a given set of processes? FIFO / RR / SJF / Priority
   (b) In RR, a very large q makes it behave like: SJF / FIFO / Priority / MLFQ
   (c) Under priority scheduling, low-priority jobs may never run. The problem and its fix are: convoy effect / SJF · starvation / aging · context switch / larger q · preemption / cooperative scheduling
   (d) "Short process behind long process" is called: starvation · convoy effect · preemption · feedback
   (e) Which policy guarantees that no process waits more than (n−1)q? SJF · Priority · RR · FIFO
7. **[Short]** A single process needs 10 time units. How many context switches occur with q = 10, 5 and 3? Why must q be large compared with the context-switch time, and what typical numbers do the slides give?
8. **[Short]** Five processes are in an RR ready queue with q = 20 ms. What is the longest any process waits for its next turn, and what share of the CPU does each get?
9. **[Definitions]** Give the formulas for turnaround time and response time. Which "customer" cares about each? Which policy typically trades turnaround for response?
10. **[Short]** Cooperative vs preemptive scheduling: who gives the CPU back in each, and which hardware tool does the preemptive kernel use? Why did one `while (1);` freeze Windows 3.x? Define *preemption* and *context switch*.
11. **[Short]** What do the `ps` states R, S and D mean? Which ones does the scheduler consider? Which one can't even `kill -9` interrupt?

### Part B — Shell, job control & bash
12. **[Exit codes]** What is `$?` after: (a) `false` (b) `./nope` (no such file) (c) running a script with no x bit (d) a `sleep` killed with `kill -9` (e) a program stopped by Ctrl-C (f) a program killed by SIGTERM (g) a `grep` that finds no match? Which value does `if` treat as true?
13. **[Job control]** Explain `sleep 60 &`, Ctrl+Z, `jobs`, `bg %1`, `fg %2`, `fg` and `kill %1`. What do `+` and `-` mean in the `jobs` output? What happens when a background job tries to read the terminal?
14. **[Subshell]** What does this print?
    ```bash
    x=1
    ( x=42; echo "in: $x" )
    echo "out1: $x"
    { x=7; echo "in: $x"; }
    echo "out2: $x"
    ```
15. **[export]** Predict the two printed lines:
    ```
    $ y=blue
    $ bash
    $ echo "[$y]"
    $ exit
    $ export y
    $ bash
    $ y=red
    $ exit
    $ echo "[$y]"
    ```
16. **[Sessions]** In the S04-p5 `ps` output, which process is the session leader, which is in the foreground, and how can you tell? What does `kill -INT -1500` do, and why the minus sign?
17. **[Script args & shebang]** With `hello.sh` from S04-p9, what does `./hello.sh red green blue` print? What does the first line of `bash hello.sh x` say, and does the shebang matter in that case?
18. **[Predict the output]** (a) `name="Ana"; echo '$name' "$name"` (b) `let X=10+2*7; let Y=X+2*4; echo $Y` (c) `echo "$((2+3*4))"` (d) the S04-p21 loop with `for num in 2 4 6` (e) `[ -z "" ] && echo empty || echo nonempty` (f) `[ 5 -ge 5 -a 3 -lt 2 ] && echo yes || echo no` (g) `cd /nonexistent || echo "fallback"`
19. **[trap & daemons]** (a) Write a trap that prints `bye` when the script finishes. (b) Give three properties of a daemon and two examples. (c) Which two commands turn a script into a systemd service that starts at boot?

### Answers

**1.** [S05-p5–p7]
FIFO:
```
|     A     | B  |  C  |
0           10   12    16
```
WT A 0, B 10, C 12 → **22/3 ≈ 7.33**; TAT 10, 12, 16 → **38/3 ≈ 12.67**.
SJF:
```
| B  |  C  |     A     |
0    2     6           16
```
WT A 6, B 0, C 2 → **8/3 ≈ 2.67**; TAT A 16, B 2, C 6 → **24/3 = 8**.
(c) The **convoy effect**: short jobs stuck behind a long one.

**2.** [S05-p8, p9]
```
| P1 |  P2  | P4 |    P1    |      P3      |
0    1      4    5          11             18
```
t = 1: P2 (3) < P1 (6 left) → preempt. t = 2: P3 (7) doesn't beat P2 (2 left). t = 4: P4 (1) is shortest. t = 5: P1 (6) < P3 (7).
TAT 11, 3, 16, 1 → **31/4 = 7.75** · WT 4, 0, 9, 0 → **13/4 = 3.25** · RT 0, 0, 9, 0 → **9/4 = 2.25**.

**3.** [S05-p13, p16]
```
| P1 | P2 | P3 | P1 | P2 | P1 |
0    2    4    5    7    8    9
```
P3 uses only 1 of its 2 units. Completion P1 9, P2 8, P3 5 → TAT 9, 8, 5 (avg 22/3 ≈ 7.33). WT 4, 5, 4 → **13/3 ≈ 4.33**. RT 0, 2, 4 → **avg 2**.

**4.** [S05-p10, p12]
```
| P1 | P2 | P4 |  P1  |  P3  |
0    1    3    5      8      11
```
t = 1: P2 (prio 1) preempts P1 (prio 2). t = 2: P3 (prio 3) can't preempt. t = 3: P2 is done and P4 (prio 1) arrives → P4. Then P1 and finally P3.
TAT 8, 2, 9, 2 → **21/4 = 5.25** · WT 4, 0, 6, 0 → **10/4 = 2.5**.

**5.** [S05-p17]
```
queue: Q0   Q0   Q0   Q1   Q1     Q2
      | X  | Y  | Z  | Y  |  Z   | Z  |
      0    1    2    3    4      6    7
```
X finishes in **Q0** (needed 1). Y runs 1 unit in Q0 → demoted → finishes in **Q1**. Z runs 1 in Q0, 2 in Q1, then the last 1 in **Q2**. TAT 1, 4, 7 → avg 4.

**6.** (a) **SJF** ("optimal – gives minimum average waiting time") [S05-p7] · (b) **FIFO** ("q large ⇒ FIFO") [S05-p13] · (c) **starvation / aging** [S05-p10] · (d) **convoy effect** [S05-p6] · (e) **RR** [S05-p13].

**7.** [S05-p13–p15] For T = 10: q = 10 → 1 piece, **0** switches; q = 5 → 2 pieces, **1**; q = 3 → 4 pieces, **3** (pieces = ⌈10/q⌉, switches = pieces − 1, as in the p15 figure: q = 12/6/1 → 0/1/9). Every switch is overhead, so q must be large compared with the context switch, "otherwise overhead is too high". Typical numbers: **q = 10–100 ms, context switch < 10 µs**.

**8.** [S05-p13] At most **(n−1)q = 4 × 20 = 80 ms**. Each process gets **1/5 of the CPU**, in chunks of at most 20 ms.

**9.** [S05-p4, p14] **Turnaround = T_completion − T_arrival** (the batch / throughput customer). **Response = T_first run − T_arrival** (the interactive / latency customer). **RR** has "typically higher average turnaround than SJF, but better response".

**10.** [S05-p2, p14] *Cooperative*: the program gives the CPU back itself by calling `yield()` or another system call (Windows 3.x, classic Mac OS). *Preemptive*: the kernel takes it, using the **timer interrupt** that a hardware clock raises every few ms. `while (1);` never makes a system call, so a cooperative system never gets the CPU back. *Preemption* = "taking the CPU from a process that did not ask to give it up". *Context switch* = the kernel saves one process's registers and stack pointer into its kernel record, restores the next one's, and jumps; the interrupted process doesn't notice.

**11.** [S05-p3] **R** = runnable; only R processes are on the scheduler's list. **S** = waiting for something interruptible (pipe, signal, `sleep()`). **D** = waiting in the kernel for disk/network, which **cannot be interrupted, not even by `kill -9`**.

**12.** [S04-p3] (a) **1** (b) **127** (c) **126** (d) **137** = 128+9 (e) **130** = 128+2 (f) **143** = 128+15 (g) **1**. `if` treats only **0** as true.

**13.** [S04-p6, p3, p5] `sleep 60 &` starts a **background** job. Ctrl+Z **suspends** the foreground job (SIGTSTP): it is "Stopped", frozen in memory. `jobs` lists the jobs. `bg %1` resumes job 1 in the background. `fg %2` brings job 2 to the foreground. `fg` brings the most recent job. `+` = most recent job, `-` = the previous one. A background job that reads the terminal gets **SIGTTIN**, which stops it. `kill %1`: `%1` is job 1 (the same job spec as in `bg %1`), and `kill` sends it a signal. The slides only show `kill` with an explicit signal (`-9`, `-TERM`, `-INT`). 🔎 Look up in Track B: which signal plain `kill` sends.

**14.** [S04-p4] ✅ `in: 42` / `out1: 1` / `in: 7` / `out2: 7`. The parentheses run in a subshell, so the change is lost; the braces run in the current shell, so it stays.

**15.** [S04-p12] ✅ `[]` (x wasn't exported yet, so the child sees nothing), then `[blue]` (the child's `y=red` never reaches the parent).

**16.** [S04-p5] **bash (1234)** has PID = PGID = SID, so it is the session & group leader (STAT `Ss`). **vim (1500)** is in its own group and in the **foreground** (`S+`, the `+`). **sleep (1600)** is in its own group in the background (no `+`). All three share SID 1234 and terminal `pts/0`. `kill -INT -1500` sends **SIGINT to every process in process group 1500**; the minus sign marks a group, as the slide stresses ("note the minus sign").

**17.** [S04-p9] ✅ `hello from ./hello.sh` / `first arg: red` / `all args: red green blue`. `bash hello.sh x` prints `hello from hello.sh` first. The shebang is **ignored** there; it only matters when the file is executed directly.

**18.** [S04-p11, p14, p16, p17, p20, p21] ✅ (a) `$name Ana` (b) `32` (c) `14` (d) `12` (e) `empty` (f) `no` (5 ≥ 5 is true but 3 < 2 is false, and `-a` needs both) (g) a cd error message, then `fallback`.

**19.** [S04-p7, p8] (a) `trap 'echo bye' EXIT` ✅. (b) No controlling terminal; runs in the background, usually started at boot; an orphan whose parent is `init` (PID 1). Examples: `sshd`, `crond`, `nginx`, `systemd`. (c) `sudo nano /etc/systemd/system/<name>.service` (write `[Unit]` and `[Service] ExecStart=…`), then `sudo systemctl enable <name>`.

---

## 7. Self-check — "I can…"

- [ ] I can write the shell's REPL loop from memory (read → parse → builtin? → fork → exec in the child → waitpid in the parent → `$?`) and explain "fork, exec, wait — and a variable named $?". [S04-p2]
- [ ] I can decode any `$?` value: 0, 1–125, 126, 127, 128+N (and turn 130/137/139/143 back into signal numbers). [S04-p3]
- [ ] I can predict what `( … )` vs `{ …; }` and `export` do to a variable in the parent shell. [S04-p4, p12]
- [ ] I can read a `ps -eo pid,ppid,pgid,sid,tty,stat,comm` listing, find the session/group leader and the foreground job, and explain `kill -INT -1500`. [S04-p5]
- [ ] I can drive job control: `&`, Ctrl+Z, `jobs`, `bg %n`, `fg %n`, `fg`, and say what SIGTSTP and SIGTTIN do. I can list the properties of a daemon and the systemd steps. [S04-p6, p7]
- [ ] I can write and run a bash script using a shebang, `$0 $1 $@`, correct quoting, `read`, `let` / `$(( ))`, `if [ … ]` with string/number/file/logical tests, `&&` / `||`, `for` loops, arrays, functions and `trap`. [S04-p8–p24]
- [ ] I can explain cooperative vs preemptive scheduling, interrupt, preemption and context switch, and the R/S/D states. [S05-p2, p3, p14]
- [ ] I can define turnaround, response and waiting time (with formulas) and say which customer cares about each. [S05-p3, p4]
- [ ] I can draw a Gantt chart and compute every job's TAT/WT/RT and the averages for **FIFO, SJF, SRTF, priority (both versions), RR with any q, and the slide's 3-level MLFQ**, including the tricky moments (a newcomer that doesn't preempt, priority ties, short final RR slices). [S05-p4–p17, §5]
- [ ] I can say which policy minimises average waiting time (SJF), which suffers the convoy effect (FIFO), which can starve jobs and how that is fixed (priority / aging), what q does to RR (large → FIFO, small → overhead, wait ≤ (n−1)q), and why MLFQ is "SJF for people who cannot see the future". [S05-p6–p17]
