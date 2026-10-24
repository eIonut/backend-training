import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const file = join(import.meta.dirname, '..', 'tasks', 'playground.txt');

test('playground.txt exists', () => {
  assert.ok(existsSync(file), 'No tasks/playground.txt yet. Create it from INSIDE the container (README T3, step 4).');
});

const missing = !existsSync(file) && 'create playground.txt first';

test('it was written on the Ubuntu playground', { skip: missing }, () => {
  const content = readFileSync(file, 'utf8');
  assert.match(content, /^ID=ubuntu$/m, 'The file should contain the output of `cat /etc/os-release` from the container.');
  assert.match(content, /^VERSION_ID="24\.04"$/m, 'Expected Ubuntu 24.04. Did you run the command inside the playground?');
});

test('whoami was appended, not overwritten', { skip: missing }, () => {
  const content = readFileSync(file, 'utf8');
  assert.match(content, /^root$/m, 'The output of `whoami` is missing. Append it with >> (a single > replaces the file).');
});
