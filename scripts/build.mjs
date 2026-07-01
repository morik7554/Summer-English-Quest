import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

const entries = [
  "index.html",
  "style.css",
  "script.js",
  "assets",
];

for (const entry of entries) {
  await cp(join(root, entry), join(dist, entry), { recursive: true });
}

await mkdir(join(dist, "pdf"), { recursive: true });
await cp(join(root, "pdf", "irregular-verbs.pdf"), join(dist, "pdf", "irregular-verbs.pdf"));
await cp(join(root, "pdf", "basic-sentences.pdf"), join(dist, "pdf", "basic-sentences.pdf"));

console.log("Build complete: dist");
