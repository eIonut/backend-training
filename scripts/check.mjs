// Runs a lab's checks and records the result in PROGRESS.md.
//
//   npm run check <lab> [task]     e.g.  npm run check 0.1   |   npm run check 0.1 2

import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, setTaskStatus, syncLabStatus } from './lib/progress.mjs';

const [lab, task] = process.argv.slice(2);
const labsDir = join(ROOT, 'labs');
const reporter = pathToFileURL(join(ROOT, 'scripts', 'lib', 'reporter.mjs')).href;

const labDirs = readdirSync(labsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

if (!lab) {
  console.log('Usage: npm run check <lab> [task]   e.g. npm run check 0.1 2\n');
  console.log('Labs:', labDirs.join(', ') || '(none yet)');
  process.exit(1);
}

const labDir = labDirs.find((name) => name.startsWith(`${lab}-`));
if (!labDir) {
  console.error(`No lab "${lab}". Available: ${labDirs.join(', ')}`);
  process.exit(1);
}

const checksDir = join(labsDir, labDir, 'checks');
const checks = (existsSync(checksDir) ? readdirSync(checksDir) : [])
  .map((file) => ({ file, match: file.match(/^t(\d+)\.test\.(mjs|ts)$/) }))
  .filter(({ match }) => match && (!task || match[1] === task))
  .map(({ file, match }) => ({ file: join(checksDir, file), n: Number(match[1]) }))
  .sort((a, b) => a.n - b.n);

if (checks.length === 0) {
  console.error(task ? `Lab ${lab} has no task ${task}.` : `Lab ${lab} has no checks.`);
  process.exit(1);
}

const results = [];
for (const { file, n } of checks) {
  console.log(`\n━━━ Lab ${lab} · Task ${n} ━━━`);
  const run = spawnSync(process.execPath, ['--test', `--test-reporter=${reporter}`, file], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  results.push({ n, passed: run.status === 0 });
}

const changes = [];
for (const { n, passed } of results) {
  const id = `L${lab}-T${n}`;
  const status = setTaskStatus(id, passed ? 'done' : 'in progress');
  changes.push(`  ${passed ? '✔' : '✘'} ${id.padEnd(10)} ${status ?? '(no row in PROGRESS.md)'}`);
}
const labStatus = syncLabStatus(`L${lab}`);

console.log('\n━━━ Summary ━━━');
console.log(changes.join('\n'));
if (labStatus) console.log(`  Lab L${lab}: ${labStatus}`);
console.log('  PROGRESS.md updated.');

process.exit(results.every((r) => r.passed) ? 0 : 1);
