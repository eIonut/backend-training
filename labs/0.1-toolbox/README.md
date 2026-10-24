# Lab 0.1 · Toolbox

> One idea: **every backend program is a process with a contract**: it takes input (arguments, environment
> variables), produces output (stdout, stderr), and reports how it ended (exit code). Everything you'll run in this
> course (APIs, workers, containers, CI jobs) follows that contract.

---

# Part 1 · The lesson

## 1. Pinning the Node version

On the frontend you probably had "it works on my machine" bugs. On the backend they are worse: your code runs on
your laptop, in CI, in a Docker image and on production servers. If those run different Node versions, a feature
that works locally (say, a new `fetch` option) crashes in production.

Teams solve this by **pinning** the version in the repo:

```
  .nvmrc          ->  "24"        read by nvm (your laptop):  nvm use
  package.json    ->  "engines"   read by npm: warns on the wrong version
  Dockerfile      ->  FROM node:24  (you'll write one in L12)
  CI config       ->  node-version-file: .nvmrc
```

One file (`.nvmrc`) and every tool points at it. You already have **nvm** installed. `nvm use` reads `.nvmrc` from
the current folder and switches to that version.

Why Node **24**? It's the current LTS ("long-term support") line. Companies run LTS versions in production because
they get security fixes for ~3 years. Odd versions (23, 25) are short-lived and never go to production.

## 2. The process contract

When you run `node app.js`, the operating system starts a **process**. It has three ways to receive input and three
ways to give output:

```
                 arguments  (process.argv)      "node app.js --port 3000"
   INPUT  --->   environment (process.env)      PORT=3000 node app.js
                 stdin       (process.stdin)    echo hi | node app.js

                 stdout  (console.log)          normal output, the "result"
   OUTPUT <---   stderr  (console.error)        errors, warnings, diagnostics
                 exit code (process.exitCode)   0 = success, anything else = failure
```

### Arguments: `process.argv`

`process.argv` is an array of strings. The first two are always the path to `node` and the path to your script, so
*your* arguments start at index 2:

```js
// node greet.js Ana --loud
process.argv // ['/path/to/node', '/path/to/greet.js', 'Ana', '--loud']
```

### Environment variables: `process.env`

Every process inherits a set of `KEY=value` strings from whoever started it. This is how **configuration** reaches
backend apps everywhere: Docker, Kubernetes, Heroku, GitHub Actions all set env vars.

```bash
NAME=Ionut node greet.js     # sets NAME only for this one command
```

```js
process.env.NAME   // 'Ionut'  (always a string, or undefined if not set)
```

### Config precedence

Real tools let you configure the same thing in several places, and they follow a common rule: **the most specific
source wins.**

```
  command-line argument   >   environment variable   >   built-in default
  (this one run)              (this machine/deploy)       (the code)
```

So `PORT=3000 node app.js --port 4000` listens on 4000.

### stdout vs stderr

Both show up in your terminal, but they are **two separate streams**. Programs that read your output (pipes, log
collectors, scripts) treat them differently:

- **stdout** is the actual output. `node report.js > report.txt` saves only stdout.
- **stderr** is for humans and logs: errors, progress, warnings. It still shows on screen even when stdout is
  redirected.

`console.log` writes to stdout, `console.error` to stderr.

### Exit codes

When a process ends, it returns a number: **0 means success**, anything else means failure (usually 1). You never
see it unless you ask:

```bash
node app.js; echo $?      # $? is the exit code of the last command
```

Exit codes matter more on the backend than anything you print:

- **CI** marks a build red when a step exits non-zero (that's how `npm test` fails a pipeline).
- **Docker / Kubernetes** restart a container whose process exits with an error.
- **Shell scripts** use them to decide what to do next: `npm test && npm run deploy`.

In Node, set `process.exitCode = 1` and let the program finish, or call `process.exit(1)` to stop immediately.
Prefer `exitCode`: `exit()` can cut off output that hasn't been written yet.

## 3. Docker in five minutes: the playground

Production servers almost always run **Linux**. Your Mac runs macOS, which looks similar but differs in many small
ways: tools have different flags, some don't exist (`ss`, `strace`, `systemd`). So this course gives you a real
Linux box: a Docker container called **playground**.

```
  image       a frozen template, e.g. "ubuntu:24.04" (like a class)
  container   a running instance of an image (like an object): it has processes, files, a hostname
  compose     a file (docker-compose.yml) describing which containers to run and how
  bind mount  a folder shared between your Mac and the container
```

Look at [docker-compose.yml](../../docker-compose.yml): the playground mounts the whole project at `/work`. A
file you edit on your Mac is instantly visible inside Linux, and the other way round.

```bash
docker compose up -d playground       # start it in the background (-d = detached)
docker compose exec playground bash   # open a shell INSIDE it (type `exit` to leave)
docker compose ps                     # what's running?
docker compose stop playground        # stop it (it keeps its state)
```

Docker on your Mac runs through **OrbStack**. Start the OrbStack app first, or every `docker` command will say
it can't connect.

## Why companies care

- "Works on my machine" outages from version drift are real and expensive. Pinning is a five-minute habit.
- Every deployment platform configures apps through **env vars** and judges them by **exit codes**. A worker that
  fails but exits 0 is a silent outage: nobody restarts it, nobody gets alerted.
- Interviewers ask "how does your app get its config?" and "how does Kubernetes know your app crashed?". You'll
  have built the answer.

---

# Part 2 · Tasks

Run checks from the project root. Each passing check marks the task `done` in PROGRESS.md.

## T1 · Pin the Node version

**Context:** the project should declare which Node it needs, so every machine uses the same one.

**Build:**
1. Create a file named `.nvmrc` in the **project root** containing just the major version: `24`.
2. Run `nvm use` in the project root. It should say it's using v24.x.
3. Run `node -v` to confirm.

**Check:** `npm run check 0.1 1`

## T2 · The process contract

**Context:** you'll write a tiny CLI that follows the contract: input from arguments and env, output on the right
stream, a meaningful exit code.

**Build:** complete [tasks/hello.js](tasks/hello.js):

| How it's run | stdout | stderr | exit code |
|---|---|---|---|
| `node hello.js` | `Hello, backend!` | nothing | 0 |
| `NAME=Ionut node hello.js` | `Hello, Ionut!` | nothing | 0 |
| `NAME=Ionut node hello.js Ana` | `Hello, Ana!` | nothing | 0 |
| `node hello.js ""` | nothing | an error message (your wording) | 1 |

**Predict first:** before running it, guess what `node hello.js ""; echo $?` prints with your finished code.

**Try it yourself** (from the project root):

```bash
node labs/0.1-toolbox/tasks/hello.js Ana
NAME=Ionut node labs/0.1-toolbox/tasks/hello.js
node labs/0.1-toolbox/tasks/hello.js "" ; echo "exit code: $?"
node labs/0.1-toolbox/tasks/hello.js "" 2>/dev/null   # hides stderr: what's left?
```

**Check:** `npm run check 0.1 2`

## T3 · Inside the playground

**Context:** get comfortable stepping into Linux and seeing the shared folder work.

**Build:**
1. Start OrbStack, then start the playground: `docker compose up -d playground`.
2. Open a shell in it: `docker compose exec playground bash`. Your prompt changes: you're now on Linux.
3. Look around: `pwd`, `ls`, `hostname`, `cat /etc/os-release`, `whoami`.
4. Still inside the container, save the output of two commands into a file that your Mac can see:

   ```bash
   cat /etc/os-release > labs/0.1-toolbox/tasks/playground.txt
   whoami >> labs/0.1-toolbox/tasks/playground.txt
   ```

   (`>` writes a file, `>>` appends to it. You'll study these properly in lab 0.2.)
5. Type `exit`, then open `labs/0.1-toolbox/tasks/playground.txt` in your editor on the Mac.

**Notice:** `whoami` says `root`. Inside a container you're the all-powerful root user by default. Remember that
for L12, where you'll make containers run as a normal user for security.

**Check:** `npm run check 0.1 3`

---

Done? Answer [RECAP.md](RECAP.md), then say **"review lab 0.1"** in the chat.
