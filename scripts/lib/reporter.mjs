// A quiet node:test reporter for labs: one line per check, the hint on failure, and what your code produced.
// It never prints the expected value, so a failure can't give the answer away.

import { inspect } from 'node:util';

const short = (value) => inspect(value, { breakLength: Infinity, maxStringLength: 200, maxArrayLength: 10 });

export default async function* reporter(source) {
  for await (const { type, data } of source) {
    if (data?.nesting !== 0) continue;

    if (type === 'test:pass' && data.skip) {
      yield `  - ${data.name}  (skipped: ${data.skip})\n`;
    } else if (type === 'test:pass') {
      yield `  ✔ ${data.name}\n`;
    } else if (type === 'test:fail') {
      const error = data.details.error.cause ?? data.details.error;
      yield `  ✘ ${data.name}\n`;
      yield `      → ${String(error.message).split('\n')[0]}\n`;
      if ('actual' in error && error.code === 'ERR_ASSERTION' && typeof error.actual !== 'boolean') {
        yield `        your code produced: ${short(error.actual)}\n`;
      }
    }
  }
}
