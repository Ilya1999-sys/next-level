import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "data", "figma", "tokens.json");
const outPath = path.join(root, "tokens", "figma.css");

function flatten(obj, prefix = []) {
  const result = [];
  for (const [key, value] of Object.entries(obj ?? {})) {
    const nextPrefix = [...prefix, key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      result.push(...flatten(value, nextPrefix));
    } else {
      result.push([nextPrefix.join("-"), value]);
    }
  }
  return result;
}

const raw = await readFile(sourcePath, "utf8");
const parsed = JSON.parse(raw);
const tokenEntries = flatten(parsed.tokens ?? {});

const cssLines = [
  ":root {",
  "  /* Generated from data/figma/tokens.json */",
  ...tokenEntries.map(([name, value]) => `  --figma-${name}: ${String(value)};`),
  "}",
  "",
];

await writeFile(outPath, cssLines.join("\n"), "utf8");
console.log(`Synced ${tokenEntries.length} tokens to ${outPath}`);
