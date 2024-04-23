import { $ } from "bun";
Bun.build({
  entrypoints: [
    "../index.ts",
    "../packages/client/index.ts",
    "../packages/server/index.ts",
    "../packages/public/index.ts",
    "../packages/db/index.ts",
  ],
  minify: true,
  outdir: "../dist",
  splitting: true,
  target: "bun",
  format: "esm",
}).then(async () => {
  await $`bun run ../dist/index.ts`;
});
