import { type BuildOutput, type BuildConfig } from "bun"
import { randomUUID } from "node:crypto"
import { readdir } from "node:fs/promises"

const sharedBuildConfig: BuildConfig = {
    entrypoints: ["packages/shared/src/index.ts"],
    outdir: "./packages/shared/dist",
    target: "bun",
    splitting: true,
    format: "esm",
    minify: true,
}

const clientBuildConfig: BuildConfig = {
    entrypoints: ["packages/web/src/public/index.html"],
    outdir: "./packages/web/dist",
    target: "bun",
    experimentalCss: true,
    experimentalHtml: true,
    splitting: true,
    format: "esm",
    minify: true,
    external: ["@rexton/shared"],
}

const serverBuildConfig: BuildConfig = {
    entrypoints: ["packages/server/src/app.ts"],
    outdir: "./packages/server/dist",
    target: "bun",
    splitting: true,
    format: "esm",
    minify: true,
    external: ["@"],
}
const sharedBuild = await Bun.build(sharedBuildConfig)
const clientBuild = await Bun.build(clientBuildConfig)
const serverBuild = await Bun.build(serverBuildConfig)