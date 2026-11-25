// The One-Line Excuse Championship — one line, one excuse, no setup.
//
// The program prints the excuse to stdout and writes it, byte for byte
// and with no trailing newline, to $MAKEFUN_OUTPUT_DIR/entry.txt, where
// the sealed scorer reads it. Node stdlib only, no network, same output
// on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I backed up your file somewhere so secure even I can't get to it anymore.";

const MAX_CHARS = 140;

// The gate: 1 to 140 characters, not only whitespace, one line.
function checkGate(text: string): number {
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters, gate allows 1-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  return chars;
}

function main(): void {
  checkGate(ENTRY);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  process.stdout.write(ENTRY + "\n");
}

main();
