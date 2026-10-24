import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { LAB, lines, read, runTask } from './helpers.mjs';

test('split-output.sh separates and combines the streams', () => {
  const noisy = spawnSync('bash', ['data/noisy.sh'], { cwd: LAB, encoding: 'utf8' });
  rmSync(join(LAB, 'out'), { recursive: true, force: true }); // start clean, so the script must create out/

  const { stdout, status } = runTask('split-output.sh');
  assert.equal(status, 0, 'The script exited with an error. Run it in the playground and read the message.');
  assert.ok(existsSync(join(LAB, 'out')), 'The out/ folder was not created.');

  for (const file of ['stdout.txt', 'stderr.txt', 'all.txt']) {
    assert.ok(existsSync(join(LAB, 'out', file)), `out/${file} is missing.`);
  }
  assert.equal(read('out/stdout.txt'), noisy.stdout, 'out/stdout.txt should contain only the "ok:" lines (stdout).');
  assert.equal(read('out/stderr.txt'), noisy.stderr, 'out/stderr.txt should contain only the "warn:" lines (stderr, stream 2).');

  const all = lines(read('out/all.txt'));
  const both = [...lines(noisy.stdout), ...lines(noisy.stderr)];
  assert.equal(all.length, both.length, 'out/all.txt should have both streams. Check the order of your redirections.');
  assert.deepEqual([...all].sort(), [...both].sort(), 'out/all.txt should contain exactly the stdout and stderr lines.');

  assert.equal(stdout.trim(), String(lines(noisy.stderr).length), `The script should print only the number of warning lines. It printed: "${stdout.trim()}".`);
});
