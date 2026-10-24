# How to work through a lab

```
  read README.md (lesson)
        |
        v
  do task 1 in tasks/  --->  npm run check <id> 1  ---fail--->  read the message, open HINTS.md
        |                         |                                       |
        |                        pass                                     +---> try again
        v                         v
  next task ...            PROGRESS.md row -> done
        |
        v
  answer RECAP.md  --->  in chat: "review lab <id>"  --->  PROGRESS.md -> reviewed, next lab gets written
```

## Commands

Run everything from the project root (`~/Personal/practice-project`).

```bash
npm run check 0.1        # all checks of lab 0.1
npm run check 0.1 2      # only task 2 of lab 0.1
npm run status           # print the Current position from PROGRESS.md
```

`npm run check` updates [PROGRESS.md](../PROGRESS.md) for you:

| Result | Task row becomes |
|---|---|
| checks pass | `done` |
| checks fail | `in progress` |
| task already `reviewed` | stays `reviewed` |

## When you're stuck

1. Read the failure message: it says what's wrong and where to look.
2. Open the next hint in `HINTS.md`, one at a time. Each one is more specific than the last.
3. Ask in chat. No question is too basic. Mention the lab and task (e.g. "0.2 T3: why does `uniq` miss some?").

## Asking for a review

When all checks pass and RECAP.md is answered, say **"review lab <id>"**. You'll get a PR-style review: what's
good, what would hurt in production, and what to change. The lab becomes `reviewed` once the must-fix points are
done, and the next lab is written.

## Starting a new chat

You don't need to explain where you were. Claude reads PROGRESS.md at the start of every session. Just say
"let's continue" or ask your question.
