import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lines, read, runTask } from './helpers.mjs';

test('top-paths.sh prints the 3 most requested paths with counts', () => {
  const counts = {};
  for (const l of lines(read('data/logs/access.log'))) {
    const path = l.split(' ')[6];
    counts[path] = (counts[path] ?? 0) + 1;
  }
  const expected = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([p, n]) => `${n} ${p}`);

  const { stdout, status } = runTask('top-paths.sh');
  const actual = lines(stdout).map((l) => l.split(/\s+/).join(' '));

  assert.equal(status, 0, 'The script exited with an error. Run it in the playground and read the message.');
  assert.ok(actual.length > 0, 'The script printed nothing.');
  assert.ok(actual.every((l) => /^\d+ \/\S*$/.test(l)), `Each line should look like "<count> <path>". Got: ${JSON.stringify(actual.slice(0, 3))}. Are you extracting the right column?`);
  assert.equal(actual.length, 3, `Expected exactly 3 lines, got ${actual.length}.`);
  assert.deepEqual(actual, expected, 'Wrong counts or order. Remember: uniq only merges neighbouring lines, and sorting counts needs a numeric sort.');
});
