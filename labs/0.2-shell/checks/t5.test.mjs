import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { LAB, read } from './helpers.mjs';
import { playground } from '../../../scripts/lib/playground.mjs';

const mode = (file) => (statSync(join(LAB, 'tasks', file)).mode & 0o777).toString(8);

test('deploy.sh has a shebang', () => {
  assert.match(read('tasks/deploy.sh').split('\n')[0], /^#!\S/, 'The very first line of deploy.sh must be a shebang (#! followed by the program to run).');
});

test('deploy.sh is executable by its owner', () => {
  assert.ok((statSync(join(LAB, 'tasks', 'deploy.sh')).mode & 0o100) !== 0, `deploy.sh has permissions ${mode('deploy.sh')}: the owner can't execute it.`);
});

test('./tasks/deploy.sh runs directly on Linux', () => {
  const { stdout, stderr, status } = playground('./tasks/deploy.sh', { cwd: LAB });
  assert.equal(status, 0, `Running ./tasks/deploy.sh failed: ${stderr.trim().split('\n').pop()}`);
  assert.equal(stdout.trim(), 'deploying TicketHub', 'deploy.sh should print exactly: deploying TicketHub');
});

test('secret.env exists and is owner-only (rw for the owner, nothing for anyone else)', () => {
  assert.ok(existsSync(join(LAB, 'tasks', 'secret.env')), 'tasks/secret.env does not exist yet.');
  assert.match(read('tasks/secret.env'), /^API_KEY=.+/m, 'secret.env should contain a line like API_KEY=not-a-real-key');
  assert.equal(mode('secret.env'), '600', `secret.env has permissions ${mode('secret.env')}. Owner: read+write. Group and others: nothing.`);
});
