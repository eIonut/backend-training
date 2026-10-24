import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lines, read, runTask } from './helpers.mjs';

test('count-errors.sh prints the number of ERROR-level lines', () => {
  const log = lines(read('data/logs/app.log'));
  const expected = log.filter((l) => l.split(' ')[1] === 'ERROR').length;
  const naive = log.filter((l) => l.includes('ERROR')).length;
  const { stdout, status } = runTask('count-errors.sh');
  const actual = stdout.trim();

  assert.equal(status, 0, 'The script exited with an error. Run it in the playground and read the message.');
  assert.notEqual(actual, '', 'The script printed nothing.');
  assert.match(actual, /^\d+$/, `The script should print only a number, but printed: "${actual}". (Hint: wc -l prints the file name too, unless it reads from a pipe or stdin.)`);
  assert.notEqual(Number(actual), naive, 'That counts every line that mentions ERROR anywhere, including inside messages. Match the level column only.');
  assert.equal(Number(actual), expected, 'Not the right count. Look at which lines your pattern matches (drop the count and print them).');
});
