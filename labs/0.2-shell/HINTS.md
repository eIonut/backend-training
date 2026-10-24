# Hints · Lab 0.2

Open one at a time. Try again after each.

## T1 · Find the log files

<details><summary>Hint 1</summary>

`find` searches folders recursively by default. Start with `find data` and look at everything it prints. Then
narrow it down.

</details>

<details><summary>Hint 2</summary>

`-type f` keeps only files, and `-name '<pattern>'` filters by name, where `*` means "anything". Which pattern
matches names that **end** in `.log`?

</details>

<details><summary>Hint 3</summary>

The output of `find` isn't guaranteed to be in any order. Pipe it into the tool that orders lines.

</details>

## T2 · Count the real errors

<details><summary>Hint 1</summary>

First print the matching lines instead of counting them, so you can see what your pattern catches. Only add the
counting at the end.

</details>

<details><summary>Hint 2</summary>

Two ways to match "column 2 is ERROR":
- **grep with an anchor:** start of line `^`, then the timestamp (no spaces in it: `[^ ]+`), then ` ERROR `.
  You need `grep -E` for `+`.
- **awk:** `awk '<condition>'` prints the lines where the condition is true, and `$2` is column 2.

</details>

<details><summary>Hint 3</summary>

To print only a number: `grep -c` counts on its own. With awk, pipe into `wc -l`. `wc -l` reading from a pipe
prints just the number (`wc -l file` would print the file name too).

</details>

## T3 · Top 3 busiest endpoints

<details><summary>Hint 1</summary>

Split the sample line on spaces and number the pieces: `203.0.113.5`=1, `-`=2, `-`=3, `[24/Oct/2026:10:00:00`=4,
... Which number is `/health`? Print just that column with `awk '{print $N}'` and look at the output.

</details>

<details><summary>Hint 2</summary>

Once you have one path per line, the recipe from the lesson does the rest: sort, count neighbours, sort by count,
keep the top.

</details>

<details><summary>Hint 3</summary>

`sort -rn` sorts numerically (`-n`), biggest first (`-r`). Without `-n`, "96" sorts after "121" because text is
compared character by character, and "9" > "1".

</details>

## T4 · Split stdout and stderr

<details><summary>Hint 1</summary>

Try it by hand first, in the playground: `bash data/noisy.sh 2> /dev/null` shows only stdout, and
`bash data/noisy.sh > /dev/null` shows only stderr. Now redirect each to a file instead of `/dev/null`.

</details>

<details><summary>Hint 2</summary>

For the combined file: redirect stdout to the file, then point stream 2 at wherever stream 1 is going. Order
matters, and the lesson shows the right one.

</details>

<details><summary>Hint 3</summary>

For the number: `wc -l < out/stderr.txt` reads the file through stdin, so `wc` prints only the count.

</details>

## T5 · Permissions

<details><summary>Hint 1</summary>

The shebang the lesson uses is `#!/usr/bin/env bash`. It must be line 1, above the comments. Then `echo` prints
text.

</details>

<details><summary>Hint 2</summary>

`chmod +x tasks/deploy.sh` makes it executable. "Permission denied" when running `./tasks/deploy.sh` means the
execute bit is missing.

</details>

<details><summary>Hint 3</summary>

For `secret.env`: owner read (4) + write (2) = 6; group = 0; others = 0. You can create the file with
`echo 'API_KEY=not-a-real-key' > tasks/secret.env`.

</details>
