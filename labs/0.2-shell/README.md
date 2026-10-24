# Lab 0.2 · Shell survival kit

> One idea: **on Linux, almost everything is text, and small tools that each do one thing can be chained with
> pipes to answer big questions.** It's 3 a.m., production is broken, you have SSH access and a 2 GB log file. No
> IDE, no dashboard. These tools are how you find out what happened.

Everything in this lab runs **inside the playground** (real Linux). Open it with:

```bash
docker compose up -d playground
docker compose exec playground bash
cd labs/0.2-shell          # you start in /work (the project root), so this is the lab folder
```

---

# Part 1 · The lesson

## 1. Where am I? Paths and moving around

```bash
pwd               # print working directory: where am I?
ls                # list files here
ls -la            # long format (-l) including hidden files (-a)
cd data/logs      # go into a folder (relative path: from where I am now)
cd ..             # one level up
cd /work          # absolute path: starts at the root "/"
cd -              # back to where I just was
```

- **Absolute path:** starts with `/`, the same from anywhere: `/work/labs/0.2-shell/data`.
- **Relative path:** starts from the current folder: `data/logs/app.log`. `.` means "here", `..` means "parent".
- **Tab completion:** type `cd da` + `Tab`. Use it constantly; it prevents typos.

## 2. Looking at files

```bash
cat file          # print the whole file (fine for small files)
less file         # scroll a big file: arrows/space to move, /word to search, q to quit
head -n 5 file    # first 5 lines
tail -n 5 file    # last 5 lines
tail -f file      # follow: keep printing new lines as they are written (Ctrl+C to stop)
wc -l file        # count lines
```

`tail -f` on a live log is one of the most used commands in backend work: you watch requests arrive while you
reproduce a bug.

## 3. Finding files: `find`

```bash
find data                    # everything under data/, recursively
find data -type f            # only files (-type d = only directories)
find data -name '*.log'      # by name pattern (quote it!)
find . -name '*.js' -mtime -1   # .js files modified in the last day
```

Quote patterns like `'*.log'`. Without quotes, the shell expands `*` itself before `find` ever sees it.

## 4. Searching inside files: `grep`

```bash
grep 'timeout' app.log        # lines containing "timeout"
grep -i 'timeout' app.log     # case-insensitive
grep -c 'timeout' app.log     # count matching lines instead of printing them
grep -v 'INFO' app.log        # invert: lines NOT containing INFO
grep -r 'TODO' labs/          # search recursively in a folder
grep -E 'timeout|refused' app.log   # -E: extended regex, here "either word"
```

**Important:** grep matches *text anywhere in the line*. If a user searched for "ERROR codes", `grep ERROR` finds
that line too. To match a **field** (like the log level in column 2), anchor your pattern: `^` means "start of
line", and `[^ ]+` means "one or more characters that are not a space". Or use `awk` (below), which understands
columns.

## 5. Pipes: chaining small tools

The `|` (pipe) sends the **stdout** of one command into the **stdin** of the next:

```bash
cat app.log | grep ERROR | wc -l
```

```
  cat app.log  --stdout-->  grep ERROR  --stdout-->  wc -l  --> 20
```

Tools that work great in pipes:

```bash
sort              # sort lines alphabetically   (sort -n: numerically, -r: reverse)
uniq -c           # collapse REPEATED NEIGHBOUR lines, prefixing each with its count
head -n 3         # keep the first 3 lines
cut -d' ' -f2     # split each line on spaces (-d' '), keep field 2
awk '{print $2}'  # print column 2 (columns split on whitespace)
awk '$2 == "ERROR"'   # print only lines whose column 2 is exactly ERROR
```

`uniq` only merges lines that are **next to each other**, which is why you almost always `sort` before `uniq`. The
classic "what's most common?" recipe is:

```bash
... | sort | uniq -c | sort -rn | head
```

## 6. Redirection: where output goes

Remember stdout and stderr from lab 0.1? The shell lets you send each one somewhere:

```bash
cmd > out.txt        # stdout into a file (replaces it)
cmd >> out.txt       # stdout appended to a file
cmd 2> err.txt       # stderr (stream number 2) into a file
cmd > all.txt 2>&1   # stdout into all.txt, THEN stderr to wherever stdout goes now
cmd 2> /dev/null     # throw stderr away (/dev/null swallows everything)
wc -l < file         # stdin from a file (wc then prints just the number, no file name)
```

Stream numbers: **0 = stdin, 1 = stdout, 2 = stderr.** `2>&1` reads as "send 2 to wherever 1 is going". Order
matters: `> all.txt 2>&1` works; `2>&1 > all.txt` doesn't do what you'd expect.

## 7. Shell scripts

A script is just commands in a file. Run it with `bash script.sh`. To run it directly as `./script.sh`, it needs:

1. A **shebang** as the very first line, telling Linux which program runs the file:
   `#!/usr/bin/env bash`
2. The **execute permission** (next section).

Inside a script, a bare `$1` is the first argument, `$(command)` inserts a command's output, and lines starting
with `#` are comments.

## 8. Permissions

```bash
ls -l deploy.sh
-rw-r--r--  1 root root  62 Oct 24 10:00 deploy.sh
 └┬┘└┬┘└┬┘
 owner group others        r = read, w = write, x = execute
```

Each group of three is a number: **r=4, w=2, x=1**, added up.

| Number | Letters | Meaning |
|---|---|---|
| 7 | `rwx` | read, write, execute |
| 6 | `rw-` | read, write |
| 5 | `r-x` | read, execute |
| 4 | `r--` | read only |
| 0 | `---` | nothing |

```bash
chmod 755 script.sh   # owner rwx, everyone else r-x: a typical executable
chmod 644 notes.txt   # owner rw, everyone else r: a typical file
chmod 600 .env        # owner rw, nobody else anything: secrets
chmod +x script.sh    # just add execute for everyone
```

Why `600` for secrets: on a shared server, any other user (or a compromised process running as another user)
could read a `644` file full of API keys. SSH refuses to use a private key that others can read.

## Why companies care

- On-call engineers answer "how many errors in the last hour, and which endpoint?" with exactly these pipes,
  in seconds, on servers that have no fancy tooling.
- Counting `grep ERROR` instead of real ERROR lines is how dashboards and alerts lie. Precise matching is a habit.
- Deploy scripts, Dockerfiles and CI steps are full of `>`, `2>&1`, `chmod` and shebangs. You'll write all of these
  in L12.

---

# Part 2 · Tasks

Each task is a small script in [tasks/](tasks/). Run your scripts **inside the playground, from the lab folder**:

```bash
cd /work/labs/0.2-shell
bash tasks/find-logs.sh
```

Run checks **on your Mac**, from the project root (Docker must be running; the check starts its own playground
container): `npm run check 0.2 <task>`.

## T1 · Find the log files

**Context:** a new service's logs are scattered in `data/`. List them before digging in.

**Build:** [tasks/find-logs.sh](tasks/find-logs.sh) prints the path of **every file ending in `.log`** under
`data/`, one per line, **sorted**. Paths are relative to the lab folder, like `data/logs/app.log`.

Careful: `app.log.bak` and `README.txt` are not `.log` files.

**Check:** `npm run check 0.2 1`

## T2 · Count the real errors

**Context:** your manager asks: "how many errors did the app log?". `grep -c ERROR` gives a number, but it's wrong.

**Build:** [tasks/count-errors.sh](tasks/count-errors.sh) prints **only a number**: how many lines in
`data/logs/app.log` have the log level `ERROR`. The level is the **second column**:

```
2026-10-24T09:00:00Z ERROR [orders] payment provider timeout after 5000ms
└──── column 1 ────┘ └ 2 ┘ └ the rest is the message, which may contain any text ┘
```

**Predict first:** run `grep ERROR data/logs/app.log | grep -v ' ERROR \['`. What are those lines, and why does a
plain `grep -c ERROR` count them?

**Check:** `npm run check 0.2 2`

## T3 · Top 3 busiest endpoints

**Context:** traffic spiked. Which endpoints are getting hit the most? `data/logs/access.log` is in the standard
Nginx format:

```
203.0.113.5 - - [24/Oct/2026:10:00:00 +0000] "GET /health HTTP/1.1" 200 2304 "-" "kube-probe/1.30"
```

**Build:** [tasks/top-paths.sh](tasks/top-paths.sh) prints the **3 most requested paths**, most requested first,
each line as `<count> <path>`:

```
123 /some/path
...
```

(Leading spaces from `uniq -c` are fine; the check ignores extra whitespace.)

**Hint for counting columns:** split the sample line above on spaces and count which field the path is in.

**Check:** `npm run check 0.2 3`

## T4 · Split stdout and stderr

**Context:** `data/noisy.sh` simulates an app starting up. It prints results to stdout and warnings to stderr.
You want them in separate files (and also one combined file) to send to a teammate.

**Build:** [tasks/split-output.sh](tasks/split-output.sh) must:

1. create the folder `out/` if it doesn't exist (`mkdir -p` doesn't complain if it already exists)
2. run `bash data/noisy.sh` with **stdout** into `out/stdout.txt` and **stderr** into `out/stderr.txt`
3. run it again with **both** streams into `out/all.txt`
4. print **only a number**: how many warning lines `out/stderr.txt` has

**Check:** `npm run check 0.2 4`

## T5 · Permissions

**Context:** a deploy script must be executable; a file with secrets must be readable by its owner only.

**Build:**

1. Finish [tasks/deploy.sh](tasks/deploy.sh): add a shebang as the very first line and make it print
   `deploying TicketHub`.
2. Make it executable, then run it the "direct" way: `./tasks/deploy.sh`.
3. Create `tasks/secret.env` containing one line, `API_KEY=not-a-real-key`.
4. Give `secret.env` permissions so that only the owner can read and write it, and nobody can do anything else.
5. Verify with `ls -l tasks/`.

**Check:** `npm run check 0.2 5`

---

Done? Answer [RECAP.md](RECAP.md), then say **"review lab 0.2"** in the chat.
