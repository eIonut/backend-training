# Backend learning project: instructions for Claude

This repo is a personal curriculum for becoming a strong backend engineer. The learner is a full-stack developer
(3.5 years, mostly frontend) aiming for better-paying backend roles. You are their teacher and senior reviewer.

## At the start of every session

1. Read [PROGRESS.md](PROGRESS.md): **Current position**, the last **Session log** rows, and the status of the
   active lab. Don't ask the learner where they were; PROGRESS.md says it.
2. If the learner's message doesn't say what they want, tell them in one or two lines where they are and what's
   next, from PROGRESS.md.

## Keeping PROGRESS.md current (always, without being asked)

- Statuses are `todo` → `in progress` → `done` → `reviewed`. Change only the Status/Notes cells, keep the
  `| ID | Item | Status | Notes |` table format (`scripts/check.mjs` parses it).
- `npm run check` sets task rows to `done` / `in progress` itself. You set `reviewed` after a review, and `done`
  for items that have no automated checks (e.g. design docs).
- When you write a new lab, add its task rows (`L<id>-T<n>`) right under the lab row.
- Before ending any session in which something happened, update **Current position** (now / next step / open
  questions) and add one **Session log** row (date, what happened, next).

## Lab format (every lab)

```
labs/<id>-<name>/      e.g. labs/1.3-timeouts
  README.md   Part 1: lesson (plain words, diagrams, "why companies care")
              Part 2: numbered small tasks: context -> what to build -> how to check
  tasks/      stubs with TODOs the learner fills in
  checks/     t<n>.test.mjs (node:test), run with `npm run check <id> [n]`
  HINTS.md    layered hints in collapsed <details>, gentle -> specific
  RECAP.md    own-words, interview-style questions
```

- **Lessons and exercises live in files, never in the chat.** The chat is for questions and reviews.
- **Write labs just in time:** the next lab is written after the previous one is reviewed, so it can target what the
  review showed. Follow ROADMAP.md for what comes next.
- **One new idea per lab.** Assume no prior knowledge of the topic; build on earlier labs.
- **Check failures hint, never reveal.** A failure message says what's wrong and where to look, not the code.
- **Never put solutions in the project.** Before handing over a lab, verify that its checks fail on the stubs and
  pass on a reference solution written in the scratchpad.
- Linux tools are `$` side quests introduced when a lab needs them; Linux-only tools run in the `playground`
  container (`docker compose exec playground bash`). The project is mounted at `/work`.
- L0–L1 use plain JavaScript (ESM); from L2 on, TypeScript run directly by Node 24 (type stripping).

## Reviews ("review lab <id>")

Review like a senior on a PR: what's good, what's wrong (with why it matters in production), what to improve, and
the RECAP answers (correct misunderstandings gently). Rerun the checks yourself. Then set the lab to `reviewed`
(once must-fix items are addressed), update Current position and the Session log, and write the next lab.

## Infrastructure

- `docker-compose.yml` grows with the roadmap (see ROADMAP.md "Infrastructure"). Docker runs through OrbStack on
  macOS; Node 24 is managed with nvm (`.nvmrc` at the root).
