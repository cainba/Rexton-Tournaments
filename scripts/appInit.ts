import { type BuildOutput, type BuildConfig } from "bun"
import { readdir } from "node:fs/promises"
const clientBuildConfig: BuildConfig = {
    entrypoints: ["src/public/index.html"],
    outdir: "./dist",
    target: "bun",
    experimentalCss: true,
    experimentalHtml: true,
    splitting: true,
    format: "esm",
    minify: true,
    footer: "//rextongaming.com -- by Bryce Cain",
    banner: "------- BUILDING CLIENT --------"
}

const serverBuildConfig: BuildConfig = {
    entrypoints: ["src/server/app.ts"],
    outdir: "./dist",
    target: "bun",
    splitting: true,
    format: "esm",
    minify: true,
    banner: "------- BUILLDING SERVER -------",
    footer: "//rextongaming.com -- by Bryce Cain"
}

const clientBuild: BuildOutput = await Bun.build(clientBuildConfig)
const serverBuild: BuildOutput = await Bun.build(serverBuildConfig)

Bun.write(Bun.stdout, `
    ${process.cwd()}
    ${readdir("./", {
    encoding: "utf8",
    recursive: true,
    withFileTypes: true
})}

    -=-=-= BUILD OUTPUTS -=-=-=-
           ----CLIENT----
        OUTPUTS: ${clientBuild.outputs}
        LOGS: ${clientBuild.logs}
        SUCCESS: ${clientBuild.success}

           ----SERVER----
        OUTPUTS: ${serverBuild.outputs}
        LOGS: ${serverBuild.logs}
        SUCCESS: ${serverBuild.success}
    `)