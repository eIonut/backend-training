#!/usr/bin/env bash
# Prints results to stdout and warnings to stderr, interleaved. Don't edit; your script runs this.
echo "ok: loaded 3 events"
echo "warn: config file missing, using defaults" >&2
echo "ok: connected to database"
echo "ok: cache warmed"
echo "warn: slow disk (120ms)" >&2
echo "ok: listening on port 3000"
echo "warn: running as root" >&2
echo "ok: ready"
