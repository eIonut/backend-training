// Reads and updates the status tables in PROGRESS.md.
// Rows look like:  | L0.1-T2 | The process contract | todo | notes |

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const ROOT = join(import.meta.dirname, '..', '..');
const PROGRESS = join(ROOT, 'PROGRESS.md');

const read = () => readFileSync(PROGRESS, 'utf8').split('\n');
const write = (lines) => writeFileSync(PROGRESS, lines.join('\n'));

const rowId = (line) => line.match(/^\|\s*(L[\d.]+(?:-T\d+)?)\s*\|/)?.[1];

function setCell(line, status) {
  const cells = line.split('|');
  cells[3] = ` ${status} `;
  return cells.join('|');
}

const getCell = (line) => line.split('|')[3]?.trim();

// Sets a task's status, except that `reviewed` is never downgraded. Returns the final status, or null if no row.
export function setTaskStatus(id, status) {
  const lines = read();
  const i = lines.findIndex((line) => rowId(line) === id);
  if (i === -1) return null;
  if (getCell(lines[i]) === 'reviewed') return 'reviewed';
  lines[i] = setCell(lines[i], status);
  write(lines);
  return status;
}

// A lab follows its tasks: done when all are done/reviewed, in progress once any has started.
export function syncLabStatus(labId) {
  const lines = read();
  const labIndex = lines.findIndex((line) => rowId(line) === labId);
  if (labIndex === -1) return null;

  const current = getCell(lines[labIndex]);
  const tasks = lines.filter((line) => rowId(line)?.startsWith(`${labId}-T`)).map(getCell);
  if (current === 'reviewed' || tasks.length === 0) return current;

  const finished = (s) => s === 'done' || s === 'reviewed';
  const next = tasks.every(finished) ? 'done' : tasks.some((s) => s !== 'todo') ? 'in progress' : 'todo';
  lines[labIndex] = setCell(lines[labIndex], next);
  write(lines);
  return next;
}

export function currentPosition() {
  const text = read().join('\n');
  return text.match(/## Current position\n([\s\S]*?)\n## /)?.[1].trim() ?? '(no "Current position" section)';
}
