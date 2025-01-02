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
    minify: true
}

const serverBuildConfig: BuildConfig = {
    entrypoints: ["src/server/app.ts"],
    outdir: "./dist",
    target: "bun",
    splitting: true,
    format: "esm",
    minify: true,
}

const clientBuild: BuildOutput = await Bun.build(clientBuildConfig)
const serverBuild: BuildOutput = await Bun.build(serverBuildConfig)
const readDirectory = await readdir(".", { encoding: "utf8", recursive: true, withFileTypes: true })
const readDirectoryProperties = readDirectory.map(e => ({
    name: e.name,
    parentPath: e.parentPath,
    isFile: e.isFile(),
    isDirectory: e.isDirectory()
}))
Bun.write(Bun.stdout, `
    ${process.cwd()}
    ${JSON.stringify(readDirectoryProperties, null, 4)}

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