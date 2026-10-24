# Hints · Lab 0.1

Open one at a time. Try again after each.

## T1 · Pin the Node version

<details><summary>Hint 1</summary>

The project root is the folder that contains `package.json`, `ROADMAP.md` and `PROGRESS.md`. The file name
starts with a dot, which makes it hidden: `ls` won't show it, but `ls -a` will.

</details>

<details><summary>Hint 2</summary>

You can create it from the terminal in one line: `echo 24 > .nvmrc`. Then `cat .nvmrc` shows what's inside.

</details>

<details><summary>Hint 3</summary>

If the check says you're running a different version: run `nvm use` in the project root (it reads `.nvmrc`).
If nvm says the version isn't installed, run `nvm install` first.

</details>

## T2 · The process contract

<details><summary>Hint 1 · reading the inputs</summary>

`process.argv[2]` is your first argument, or `undefined` if none was given. `process.env.NAME` is the env var, or
`undefined`. Log both while experimenting: `console.log(process.argv, process.env.NAME)`.

</details>

<details><summary>Hint 2 · precedence</summary>

Watch out for the difference between "no argument" (`undefined`) and "empty argument" (`""`). Both are falsy, so
`arg || process.env.NAME` treats them the same. Which operator treats only `undefined`/`null` as "missing"?

</details>

<details><summary>Hint 3 · failing correctly</summary>

`console.error(...)` writes to stderr. Set `process.exitCode = 1` and make sure the greeting line isn't reached
afterwards (return from a function, or use an `if/else`).

</details>

## T3 · Inside the playground

<details><summary>Hint 1</summary>

"Cannot connect to the Docker daemon"? OrbStack isn't running. Open the OrbStack app, wait a few seconds, retry.

</details>

<details><summary>Hint 2</summary>

Inside the container you start in `/work`, which is the project root. That's why the relative path
`labs/0.1-toolbox/tasks/playground.txt` works there. Check with `pwd`.

</details>

<details><summary>Hint 3</summary>

If the check says `whoami` is missing, you probably used `>` twice: the second one replaced the file. Run both
commands again, the second one with `>>`.

</details>
