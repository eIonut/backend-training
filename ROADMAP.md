# Backend Engineer Roadmap

A ladder of small labs that takes you from "full-stack, mostly frontend" to a backend engineer who can talk
confidently about databases, queues, events, security, production and system design in an interview, and has
built all of it once with their own hands.

> **Where am I?** This file is the map. Your status (what's done, what's next) lives in
> [PROGRESS.md](PROGRESS.md).

## Rules of the game

1. **One new idea per lab.** Each lab teaches one concept and reuses what earlier labs built.
2. **Feel the pain, then use the tool.** You write a tiny queue before BullMQ, and a slow query before an index.
   Every tool appears because the previous approach hit a wall.
3. **You write the code.** Lessons and tasks are in files. The chat is for questions and reviews.
4. **No question is too basic.** Unclear things are exactly the gaps worth closing, so ask.
5. **Real world first.** Every lab answers "why would a company care?" and ends with interview-style recap questions.

## How a lab works

```
  labs/<id>-<name>/
    README.md   Part 1: the lesson (plain words + diagrams)
                Part 2: small tasks, in order: context -> build -> check
    tasks/      stubs with TODOs; you write the code here
    checks/     automatic checks:  npm run check <id> [task]
    HINTS.md    layered hints, open one at a time
    RECAP.md    questions to answer in your own words
```

1. Read the lesson, then do the tasks in order. Run `npm run check <id> <task>` after each one.
2. Passing checks mark the task `done` in PROGRESS.md automatically.
3. Answer RECAP.md, then say **"review lab <id>"**. You get a senior-style PR review and the lab becomes `reviewed`.
4. The next lab is written after the review, so it can build on what the review showed.

Full workflow: [labs/README.md](labs/README.md). Linux tools are woven in as **side quests** (marked `$`), at the
moment a lab needs them. `*` = optional lab; skipping it breaks nothing.

## The thread: TicketHub

Every level ends with a **Build** lab that adds a feature to one portfolio project: **TicketHub**, a backend for
selling event tickets. It's a good interview story because it forces real problems:

```
  "two buyers, one seat"  -> atomic updates, transactions, row locks, Redis holds
  flash sale traffic      -> caching, rate limiting, horizontal scaling
  payments                -> webhooks, idempotency, retries
  confirmation emails     -> background jobs
  order -> payment -> email -> events with Kafka, outbox pattern
  "is it healthy?"        -> logs, metrics, traces, graceful shutdown
```

Language: plain **JavaScript** in L0–L1 (runtime concepts, nothing in the way), **TypeScript from L2 on**, run
directly by Node 24 (built-in type stripping, no build step).

---

## L0 - Setup & Linux basics

- **0.1** Toolbox: pinning Node, the process contract (argv, env, stdout/stderr, exit codes), the Docker playground
- **0.2** Shell survival kit: files, `find`, `grep`, pipes, redirection, permissions

## L1 - Node runtime

- **1.1** The event loop: what "async" and "blocking" really mean
  - `$` `ps`, `top`, `kill`: seeing and stopping your process
- **1.2** Promises & concurrency patterns: `all`, `allSettled`, `race`, limiting concurrency
- **1.3** Timeouts & cancellation: `AbortController`, `AbortSignal.timeout`
  - `$` `curl -v`, `curl -w` timing, `--max-time`
- **1.4** Streams & backpressure: big data in small pieces
  - `$` memory in `top`, `--max-old-space-size`, `ulimit` and `EMFILE`
- **1.5** `worker_threads`: CPU-heavy work without freezing the server
- **1.6** Process lifecycle: signals, exit codes, uncaught errors
  - `$` `kill -TERM` vs `kill -9`
- **1.7** Build: TicketHub event importer (stream a big CSV, hash/validate in workers)

## L2 - HTTP & Express (TypeScript starts)

- **2.1** TypeScript on Node: type stripping, `tsconfig`, strict mode
- **2.2** HTTP from scratch with `node:http`: methods, status codes, headers, bodies
  - `$` `curl -v` as your best friend
- **2.3** Express: what middleware actually is
  - `$` `lsof -i :3000`: "port already in use"
- **2.4** REST API design: resources, status codes, pagination, versioning, idempotency keys
- **2.5** Central error handling
  - `$` `tail -f`, `grep`, pipes: finding the one error in the logs
- **2.6** Input validation with zod
  - `$` `jq`: slicing JSON responses
- **2.7** Config & environments: `.env`, fail fast on bad config
- **2.8** Layers: routes -> services -> repositories
- **2.9** Build: TicketHub API v1 (in-memory storage)

## L3 - Testing

- **3.1** Unit tests with `node:test`
- **3.2** Test doubles: fakes, stubs, mocks, fake timers
- **3.3** API tests with supertest
- **3.4** Build: a test suite for TicketHub (+ coverage)

## L4 - MongoDB

- **4.1** First contact: documents, collections, CRUD with the native driver
  - `$` Docker daily: `docker exec`, `docker logs -f`, `mongosh` inside the container
- **4.2** Querying: filters, operators, projections, sorting
- **4.3** Mongoose: what an ODM gives you (and hides from you)
- **4.4** Indexes: feel 1M documents being slow, then fix it
  - `$` `autocannon`: measure before and after
- **4.5** Reading `explain()`: what Mongo actually did
- **4.6** Document design: embed vs reference
- **4.7** Aggregation pipeline: reports and grouping
- **4.8** Pagination: `skip/limit` vs cursor-based
- **4.9** Atomic updates: `$inc`, conditional updates, "two buyers, one seat"
- **4.10** Transactions: when one document isn't enough
- **4.11** Change streams: listening to the database
- **4.12** Integration tests against a real Mongo (Testcontainers)
- **4.13** Build: TicketHub on MongoDB

## L5 - PostgreSQL & SQL

- **5.1** First contact: tables, types, constraints
  - `$` `psql` inside the container
- **5.2** Relationships & joins
- **5.3** Indexes & `EXPLAIN ANALYZE`
- **5.4** Transactions & isolation levels: what can go wrong concurrently
- **5.5** Row locks: `SELECT ... FOR UPDATE`, `SKIP LOCKED`
- **5.6** Migrations: changing a schema without breaking production
- **5.7** Query builders & ORMs (Drizzle), and when to drop to raw SQL
- **5.8** Mongo vs Postgres: choosing for real requirements
- **5.9** Build: TicketHub bookings & seats in Postgres

## L6 - Redis

- **6.1** What Redis is: strings, hashes, lists, sets, sorted sets
  - `$` `redis-cli`, `MONITOR`
- **6.2** Caching in front of the database (cache-aside)
  - `$` `autocannon`: prove the cache helps
- **6.3** TTL, invalidation and cache stampedes
- **6.4** Rate limiting: fixed vs sliding window
- **6.5** Pub/Sub, and why messages can get lost
- **6.6** Distributed locks (and their limits)
- **6.7** Build: seat holds with TTL + cached event pages

## L7 - Auth & security

- **7.1** Password hashing (argon2): why not SHA-256
- **7.2** Sessions & cookies (stored in Redis)
- **7.3** JWT access + refresh tokens: rotation and revocation
- **7.4** Authorization: roles and ownership
- **7.5** OAuth 2.0 / OpenID Connect: "Log in with GitHub"
- **7.6** Web security: injection, OWASP top issues, CORS, `helmet`, handling secrets
- **7.7** Build: TicketHub accounts, organizers and buyers

## L8 - Background jobs

- **8.1** Why not do everything inside the request?
- **8.2** A tiny in-memory queue, by hand
- **8.3** Retries, backoff and jitter
- **8.4** BullMQ on Redis: what the real tool adds
  - `$` `tmux`: API + worker + logs side by side
- **8.5** Idempotency: making "run twice" safe
- **8.6** Scheduled & repeatable jobs
  - `$` `cron`: the classic way
- **8.7** Build: ticket PDFs & confirmation emails (Mailpit as a fake inbox)

## L9 - Talking to other systems

- **9.1** Calling external APIs safely: timeouts, retries, which errors to retry
  - `$` `dig`, `nc`, `/etc/hosts`: "can I even reach that host?"
- **9.2** Circuit breakers & fallbacks
- **9.3** Sending webhooks: HMAC signing, retries, delivery log
- **9.4** Receiving webhooks: verify, dedupe, ack fast
- **9.5** Build: a fake payment provider + payment webhooks for TicketHub

## L10 - Kafka

- **10.1** Why a log? Kafka vs Redis pub/sub vs job queues
- **10.2** Topics, producers, consumers
  - `$` Kafka CLI tools inside the container + Kafka web UI
- **10.3** Partitions and keys: how ordering works
- **10.4** Consumer groups: scaling consumers
- **10.5** Offsets: what happens when a consumer crashes
- **10.6** Failures: retry topics and dead-letter topics
- **10.7** Outbox pattern: database + Kafka safely (uses 4.11)
- **10.8** Build: order -> payment -> email, services talking only through events

## L11 - Real-time

- **11.1** Server-Sent Events
- **11.2** WebSockets
- **11.3** Scaling real-time across many instances (Redis)
- **11.4** Build: TicketHub live seat map

## L12 - Production readiness

- **12.1** Structured logging & request IDs (`AsyncLocalStorage`)
  - `$` `jq` on JSON logs
- **12.2** Graceful shutdown
  - `$` `SIGTERM` vs `SIGKILL`, the OOM killer
- **12.3** Health & readiness checks
- **12.4** Metrics with Prometheus & Grafana
- **12.5** Tracing with OpenTelemetry
- **12.6** A good Dockerfile for Node: multi-stage, non-root, small
- **12.7** Nginx as a reverse proxy & load balancer
- **12.8** Using every CPU core: `cluster` & PM2
- **12.9** Node as a Linux service
  - `$` `systemd`, `journalctl`
- **12.10** CI with GitHub Actions: lint, test, build an image
- **12.11*** Deploy to a VPS
  - `$` `ssh`, `ssh -L` tunnels, firewall basics
- **12.12*** Deep debugging: `--inspect`, heap snapshots, CPU profiles
  - `$` `strace`

## L13 - Architecture & system design

- **13.1** Layered vs hexagonal: which way dependencies point
- **13.2** Modular monolith vs microservices: the real cost of splitting
- **13.3** CQRS: separate write and read models (built from Kafka events)
- **13.4** System design method: requirements, estimates, bottlenecks, trade-offs
- **13.5** Design: a rate limiter
- **13.6** Design: a URL shortener
- **13.7** Design: a notification system
- **13.8** Design: TicketHub at 100x (a flash sale)

The design labs (13.4–13.8) are written documents, reviewed like a real design-doc review.

---

## How the pieces connect

```
  The server freezes on heavy work ------------> worker_threads (1.5), then jobs (L8)
  Mongo is slow on 1M documents ---------------> indexes (4.4), explain() (4.5)
  Two buyers get the same seat ----------------> atomic updates (4.9), row locks (5.5), holds (6.7)
  Hot reads hammer the database ---------------> Redis cache (6.2)
  Redis pub/sub loses messages ----------------> Kafka keeps a log (10.1)
  The hand-made queue dies on restart ---------> BullMQ on Redis (8.4)
  "Save to DB AND publish event" fails halfway -> outbox + change streams (10.7)
  A slow external API hangs everything --------> timeouts (1.3) + circuit breakers (9.2)
  "It's slow in production, why?" -------------> logs, metrics, traces (L12)
```

## Infrastructure

One `docker-compose.yml` that grows over time. Only Node and Docker are installed on the Mac.

```
  now:       ubuntu "playground" (Linux tools, the project mounted at /work)
  L4:        + mongo (single-node replica set, needed for transactions/change streams)
  L5:        + postgres
  L6:        + redis
  L8:        + mailpit (fake email inbox)
  L10:       + kafka (KRaft mode, no Zookeeper) + Kafka web UI
  L12:       + prometheus + grafana + nginx
```

```
  your Mac  --docker compose exec-->  [ ubuntu playground ]
                                              |
                                      same Docker network
                  [ mongo ] [ postgres ] [ redis ] [ kafka ] [ ... ]
```

## Rough pace (evenings, ~1 lab per evening)

| Levels | Focus | Time |
|---|---|---|
| L0–L2 | foundations | ~3 weeks |
| L3–L5 | testing & data | ~5 weeks |
| L6–L9 | Redis, auth, jobs, integrations | ~5 weeks |
| L10–L11 | events & real-time | ~3 weeks |
| L12–L13 | production & design | ~4 weeks |

Slower is fine. Understanding beats speed.
