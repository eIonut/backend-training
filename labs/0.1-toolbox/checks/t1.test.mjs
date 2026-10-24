import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from '../../../scripts/lib/progress.mjs';

const nvmrc = join(ROOT, '.nvmrc');

test('.nvmrc exists in the project root', () => {
  assert.ok(existsSync(nvmrc), 'No .nvmrc in the project root yet (the folder with package.json and ROADMAP.md).');
});

test('.nvmrc pins Node 24', { skip: !existsSync(nvmrc) && 'create .nvmrc first' }, () => {
  const content = readFileSync(nvmrc, 'utf8').trim();
  assert.match(content, /^v?24(\.\d+){0,2}$/, `.nvmrc contains "${content}". It should contain only the major version, 24.`);
});

test('the Node you are running is 24', () => {
  const major = process.versions.node.split('.')[0];
  assert.equal(major, '24', `You're running Node ${process.version}. Run \`nvm use\` in the project root first.`);
});
