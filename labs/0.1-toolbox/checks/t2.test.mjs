import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const script = join(import.meta.dirname, '..', 'tasks', 'hello.js');

function run(args = [], env = {}) {
  const { NAME, ...rest } = process.env; // start without NAME, so only the test decides it
  const result = spawnSync(process.execPath, [script, ...args], { env: { ...rest, ...env }, encoding: 'utf8' });
  return { stdout: result.stdout, stderr: result.stderr, code: result.status };
}

test('no argument, no NAME: greets "backend"', () => {
  const { stdout, code } = run();
  assert.equal(stdout, 'Hello, backend!\n', 'With nothing given, the default name should be used.');
  assert.equal(code, 0, 'A successful run should exit with code 0.');
});

test('NAME env var is used when there is no argument', () => {
  const { stdout } = run([], { NAME: 'Ionut' });
  assert.equal(stdout, 'Hello, Ionut!\n', 'With NAME=Ionut set, read it from process.env.');
});

test('an argument beats the NAME env var', () => {
  const { stdout } = run(['Ana'], { NAME: 'Ionut' });
  assert.equal(stdout, 'Hello, Ana!\n', 'The argument is more specific than the env var, so it should win.');
});

test('an empty argument is an error: stderr + exit code 1', () => {
  const { stdout, stderr, code } = run(['']);
  assert.equal(stdout, '', 'On error, nothing should go to stdout (it is for results only).');
  assert.notEqual(stderr.trim(), '', 'Explain the problem on stderr, not stdout.');
  assert.equal(code, 1, 'An error should end with exit code 1.');
});

test('an empty argument is an error even when NAME is set', () => {
  const { code } = run([''], { NAME: 'Ionut' });
  assert.equal(code, 1, 'An argument was given (even if empty), so it should not fall back to NAME.');
});
