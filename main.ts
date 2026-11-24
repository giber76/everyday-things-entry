// everyday-things entry (Node 22, standard library only): writes a
// two-line explanation of a traffic jam to /output/entry.txt. The gate
// takes UTF-8 text of 1 to 400 characters, exactly two lines, and the
// blind judge compares entries two at a time against its brief.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Line 1 — the analogy: a traffic jam is a school hallway at the last
// bell. Every 10-year-old has lived that exact crush: hundreds of kids,
// one door, nobody moving fast. It is concrete (a hallway, a door, kids
// you can see and bump into) and surprising (cars are not the picture —
// schoolchildren are), and it explains the mechanism, not just the
// feeling: too many things trying to use too little space at once.
//
// Line 2 — the honest accounting: it names what the hallway maps (too
// many cars fighting for too little road, so everyone crawls) and what
// it leaves out (cars cannot slip sideways through gaps the way kids
// can, and no teacher stands there waving anyone through). No praise
// for the analogy, just its edges.
const ENTRY =
  'A traffic jam is a school hallway at the last bell, with a thousand kids all trying to squeeze through one door at the same time.\n' +
  'The hallway shows how too many cars fighting for too little road at once makes everyone crawl, but it leaves out that cars can\'t slip sideways through gaps the way kids can, and no teacher stands at the door waving anyone through.';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

// Validation guard: the gate takes 1-400 UTF-8 characters, exactly two
// non-blank lines, each one sentence. Count characters (code points)
// and UTF-8 bytes and refuse to write anything outside that range, so
// a bad edit fails loudly here instead of shipping a disqualified entry.
const charCount = [...ENTRY].length;
const byteCount = new TextEncoder().encode(ENTRY).length;
const lines = ENTRY.split('\n');
if (
  charCount < 1 ||
  charCount > 400 ||
  byteCount > 400 ||
  lines.length !== 2 ||
  lines.some((line) => line.trim().length === 0) ||
  ENTRY.trim() !== ENTRY
) {
  throw new Error(
    `invalid entry: ${charCount} chars, ${byteCount} bytes, ${lines.length} lines (must be 1-400 chars, exactly 2 lines)`,
  );
}
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');
