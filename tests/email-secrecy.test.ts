import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const FORBIDDEN = "anmevel10@gmail.com";

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    if (
      name === "node_modules" ||
      name === ".next" ||
      name === ".git" ||
      name === "coverage"
    ) {
      continue;
    }
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?|css|md|json)$/.test(name) && name !== ".env.example") {
      // Allow .env.example documentation of the value; forbid client/src leaks
      if (full.includes(`${path.sep}src${path.sep}`)) out.push(full);
    }
  }
  return out;
}

describe("lead email secrecy", () => {
  it("does not embed the operator inbox in src/", () => {
    const root = path.resolve(__dirname, "..");
    const files = walk(path.join(root, "src"));
    const hits: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      if (text.includes(FORBIDDEN)) hits.push(file);
    }
    expect(hits).toEqual([]);
  });
});
