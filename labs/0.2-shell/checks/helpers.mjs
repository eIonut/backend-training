import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { playground } from '../../../scripts/lib/playground.mjs';

export const LAB = join(import.meta.dirname, '..');
export const read = (path) => readFileSync(join(LAB, path), 'utf8');
export const lines = (text) => text.split('\n').map((l) => l.trim()).filter(Boolean);

// Runs one of your task scripts on Linux, from the lab folder.
export const runTask = (script) => playground(`bash tasks/${script}`, { cwd: LAB });

export function walk(dir) {
  return readdirSync(join(LAB, dir), { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

export const rel = (path) => relative(LAB, path);
