# Progress

The single source of truth for where you are. The map is [ROADMAP.md](ROADMAP.md).

**Statuses:** `todo` → `in progress` → `done` → `reviewed`

| Status | Meaning | Set by |
|---|---|---|
| `todo` | not started | — |
| `in progress` | started, or checks currently failing | `npm run check` (on failure) or Claude |
| `done` | all checks pass | `npm run check` (on success) or Claude, for labs without checks |
| `reviewed` | reviewed in chat, feedback addressed | Claude, after "review lab <id>" |

A lab's row follows its tasks: `done` when every task is `done`, `in progress` once any task has started.
Task rows (`L0.1-T1`, ...) are added when a lab is written.

## Current position

- **Now:** L0.1 Toolbox, task T1 (not started)
- **Next step:** read `labs/0.1-toolbox/README.md`, then do T1
- **Open questions:** none

## Session log

| Date | What happened | Next |
|---|---|---|
| 2026-10-24 | New roadmap (L0–L13) created; progress tracking, check runner and labs 0.1 + 0.2 written | Start L0.1 |

---

## L0 - Setup & Linux basics

| ID | Item | Status | Notes |
|---|---|---|---|
| L0.1 | Toolbox | done | |
| L0.1-T1 | Pin the Node version | done | |
| L0.1-T2 | The process contract (`hello.js`) | done | |
| L0.1-T3 | Inside the playground | done | |
| L0.2 | Shell survival kit | todo | |
| L0.2-T1 | Find the log files | todo | |
| L0.2-T2 | Count the real errors | todo | |
| L0.2-T3 | Top 3 busiest endpoints | todo | |
| L0.2-T4 | Split stdout and stderr | todo | |
| L0.2-T5 | Permissions | todo | |

## L1 - Node runtime

| ID | Item | Status | Notes |
|---|---|---|---|
| L1.1 | Event loop & blocking | todo | |
| L1.2 | Promises & concurrency patterns | todo | |
| L1.3 | Timeouts & cancellation | todo | |
| L1.4 | Streams & backpressure | todo | |
| L1.5 | worker_threads | todo | |
| L1.6 | Process lifecycle | todo | |
| L1.7 | Build: TicketHub event importer | todo | |

## L2 - HTTP & Express

| ID | Item | Status | Notes |
|---|---|---|---|
| L2.1 | TypeScript on Node | todo | |
| L2.2 | HTTP from scratch | todo | |
| L2.3 | Express middleware | todo | |
| L2.4 | REST API design | todo | |
| L2.5 | Central error handling | todo | |
| L2.6 | Validation with zod | todo | |
| L2.7 | Config & environments | todo | |
| L2.8 | Layers: routes → services → repositories | todo | |
| L2.9 | Build: TicketHub API v1 | todo | |

## L3 - Testing

| ID | Item | Status | Notes |
|---|---|---|---|
| L3.1 | Unit tests with node:test | todo | |
| L3.2 | Test doubles | todo | |
| L3.3 | API tests with supertest | todo | |
| L3.4 | Build: TicketHub test suite | todo | |

## L4 - MongoDB

| ID | Item | Status | Notes |
|---|---|---|---|
| L4.1 | CRUD with the native driver | todo | |
| L4.2 | Querying | todo | |
| L4.3 | Mongoose | todo | |
| L4.4 | Indexes | todo | |
| L4.5 | Reading explain() | todo | |
| L4.6 | Embed vs reference | todo | |
| L4.7 | Aggregation pipeline | todo | |
| L4.8 | Pagination | todo | |
| L4.9 | Atomic updates | todo | |
| L4.10 | Transactions | todo | |
| L4.11 | Change streams | todo | |
| L4.12 | Integration tests (Testcontainers) | todo | |
| L4.13 | Build: TicketHub on MongoDB | todo | |

## L5 - PostgreSQL & SQL

| ID | Item | Status | Notes |
|---|---|---|---|
| L5.1 | Tables, types, constraints | todo | |
| L5.2 | Relationships & joins | todo | |
| L5.3 | Indexes & EXPLAIN ANALYZE | todo | |
| L5.4 | Transactions & isolation levels | todo | |
| L5.5 | Row locks | todo | |
| L5.6 | Migrations | todo | |
| L5.7 | Query builders & ORMs | todo | |
| L5.8 | Mongo vs Postgres | todo | |
| L5.9 | Build: bookings & seats in Postgres | todo | |

## L6 - Redis

| ID | Item | Status | Notes |
|---|---|---|---|
| L6.1 | Data structures | todo | |
| L6.2 | Cache-aside | todo | |
| L6.3 | TTL, invalidation, stampedes | todo | |
| L6.4 | Rate limiting | todo | |
| L6.5 | Pub/Sub | todo | |
| L6.6 | Distributed locks | todo | |
| L6.7 | Build: seat holds + cached pages | todo | |

## L7 - Auth & security

| ID | Item | Status | Notes |
|---|---|---|---|
| L7.1 | Password hashing | todo | |
| L7.2 | Sessions & cookies | todo | |
| L7.3 | JWT access + refresh tokens | todo | |
| L7.4 | Authorization | todo | |
| L7.5 | OAuth 2.0 / OIDC | todo | |
| L7.6 | Web security | todo | |
| L7.7 | Build: accounts & roles | todo | |

## L8 - Background jobs

| ID | Item | Status | Notes |
|---|---|---|---|
| L8.1 | Why not in the request | todo | |
| L8.2 | A tiny queue by hand | todo | |
| L8.3 | Retries, backoff, jitter | todo | |
| L8.4 | BullMQ | todo | |
| L8.5 | Idempotency | todo | |
| L8.6 | Scheduled jobs | todo | |
| L8.7 | Build: ticket PDFs & emails | todo | |

## L9 - Talking to other systems

| ID | Item | Status | Notes |
|---|---|---|---|
| L9.1 | Calling external APIs safely | todo | |
| L9.2 | Circuit breakers | todo | |
| L9.3 | Sending webhooks | todo | |
| L9.4 | Receiving webhooks | todo | |
| L9.5 | Build: fake payment provider | todo | |

## L10 - Kafka

| ID | Item | Status | Notes |
|---|---|---|---|
| L10.1 | Why a log? | todo | |
| L10.2 | Topics, producers, consumers | todo | |
| L10.3 | Partitions & keys | todo | |
| L10.4 | Consumer groups | todo | |
| L10.5 | Offsets & crashes | todo | |
| L10.6 | Retry & dead-letter topics | todo | |
| L10.7 | Outbox pattern | todo | |
| L10.8 | Build: event-driven order flow | todo | |

## L11 - Real-time

| ID | Item | Status | Notes |
|---|---|---|---|
| L11.1 | Server-Sent Events | todo | |
| L11.2 | WebSockets | todo | |
| L11.3 | Scaling real-time | todo | |
| L11.4 | Build: live seat map | todo | |

## L12 - Production readiness

| ID | Item | Status | Notes |
|---|---|---|---|
| L12.1 | Structured logging & request IDs | todo | |
| L12.2 | Graceful shutdown | todo | |
| L12.3 | Health & readiness checks | todo | |
| L12.4 | Metrics (Prometheus & Grafana) | todo | |
| L12.5 | Tracing (OpenTelemetry) | todo | |
| L12.6 | Dockerfile for Node | todo | |
| L12.7 | Nginx reverse proxy | todo | |
| L12.8 | cluster & PM2 | todo | |
| L12.9 | Node as a Linux service | todo | |
| L12.10 | CI with GitHub Actions | todo | |
| L12.11 | Deploy to a VPS (optional) | todo | |
| L12.12 | Deep debugging (optional) | todo | |

## L13 - Architecture & system design

| ID | Item | Status | Notes |
|---|---|---|---|
| L13.1 | Layered vs hexagonal | todo | |
| L13.2 | Modular monolith vs microservices | todo | |
| L13.3 | CQRS | todo | |
| L13.4 | System design method | todo | |
| L13.5 | Design: rate limiter | todo | |
| L13.6 | Design: URL shortener | todo | |
| L13.7 | Design: notification system | todo | |
| L13.8 | Design: TicketHub at 100x | todo | |
