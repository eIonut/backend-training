// Runs a shell command inside a fresh Ubuntu playground container (the project is mounted at /work).
// Used by checks for tasks that must run on Linux.

import { spawnSync } from 'node:child_process';
import { relative } from 'node:path';
import { ROOT } from './progress.mjs';

export const toContainerPath = (hostPath) => `/work/${relative(ROOT, hostPath)}`;

export function playground(command, { cwd = ROOT } = {}) {
  const run = spawnSync(
    'docker',
    ['compose', 'run', '--rm', '-T', '--quiet-pull', '-w', toContainerPath(cwd), 'playground', 'bash', '-c', command],
    { cwd: ROOT, encoding: 'utf8' },
  );

  if (run.error?.code === 'ENOENT') {
    throw new Error('The `docker` command was not found. Install OrbStack (or Docker Desktop) first.');
  }
  if (/connect to the docker API|Cannot connect to the Docker daemon|docker daemon is not running/i.test(run.stderr)) {
    throw new Error('Docker is not running. Start OrbStack, wait a few seconds, then run the check again.');
  }
  return run;
}
