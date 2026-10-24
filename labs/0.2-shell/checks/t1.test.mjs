import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lines, runTask, walk } from './helpers.mjs';

test('find-logs.sh lists every .log file under data/, sorted', () => {
  const expected = walk('data').filter((p) => p.endsWith('.log')).sort();
  const { stdout, status } = runTask('find-logs.sh');
  const actual = lines(stdout).map((l) => l.replace(/^\.\//, ''));

  assert.equal(status, 0, 'The script exited with an error. Run it in the playground and read the message.');
  assert.ok(actual.length > 0, 'The script printed nothing. Which command searches for files by name?');
  assert.ok(!actual.some((p) => p.endsWith('.bak') || p.endsWith('.txt')), 'Some printed files do not end in .log. Check your name pattern.');
  assert.equal(actual.length, expected.length, `Expected ${expected.length} files, got ${actual.length}. Are you searching all subfolders of data/?`);
  assert.deepEqual(actual, expected, 'Right files, but not in sorted order (or paths not relative to the lab folder, like data/logs/app.log).');
});
