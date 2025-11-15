#!/usr/bin/env bun
import { $ } from "bun"

/**
 *
 * @function required
 * @description Ensures that a value is not undefined or null.
 * @param value: T | undefined | null
 * @param name: string
 * @returns T
 */
function required<T>(value: T | undefined | null, name: string): T {
	if (value === undefined || value === null) {
		console.error(`Error: ${name} is required`)
		process.exit(1)
	}
	return value
}

/**
 *
 * @function createFeature
 * @description Creates a new feature branch from the specified branch.
 * @param name
 * @param branch @default development
 * @returns void
 */
async function createFeature(name: string, branch = "development") {
	await $`git checkout ${branch}`
	await $`git pull origin ${branch}`
	await $`git checkout -b feature/${name}`
	console.log(`✓ Created feature/${name} from ${branch}`)
}

/**
 * @function finish
 * @description finishes a feature branch and merges it into the target branch.
 * @param name
 * @param targetBranch
 * @default targetBranch - development
 * @returns void
 */
async function finish(name: string, target = "development") {
	const currentBranch = (await $`git branch --show-current`.text()).trim()
	await $`git checkout ${target}`
	await $`git pull origin ${target}`
	await $`git merge ${currentBranch} --no-ff`
	await $`git push origin ${target}`
	await $`git branch -d ${currentBranch}`
	console.log(`✓ Merged ${currentBranch} into ${target}`)
}

/**
 * @function sync
 * @description syncs the current branch with the remote branch.
 * @returns void
 */
async function sync() {
	const currentBranch = await $`git branch --show-current`.text()
	const branch = currentBranch.trim()
	await $`git fetch origin`
	await $`git rebase origin/${branch}`
	console.log(`✓ Synced ${branch}`)
}

/**
 * @function createPR
 * @description Creates a pull request for the current branch to the target branch
 * @param target
 * @default target - development
 * @returns void
 */
async function createPR(target = "development") {
	const currentBranch = (await $`git branch --show-current`.text()).trim()

	await $`git push -u origin ${currentBranch}`

	const remote = (await $`git config --get remote.origin.url`.text()).trim()
	const repo = remote.replace(/^.*[:/]([^/]+\/[^/]+?)(\.git)?$/, "$1")

	const prUrl = `https://github.com/${repo}/compare/${target}...${currentBranch}?expand=1`

	console.log(`✓ Pushed ${currentBranch}`)
	console.log(`\nCreate PR: ${prUrl}`)

	$.throws(false)
	await $`xdg-open ${prUrl}`.quiet()
	$.throws(true)
}

/**
 * @function commit
 * @description Stages changes and commits with the provided message
 * @param message
 * @param path - File or directory path to commit (defaults to all files)
 * @returns void
 */
async function commit(message: string, path = ".") {
	await $`git add ${path}`
	await $`git commit -m ${message}`
	console.log(
		`✓ Committed ${path === "." ? "all changes" : path}: ${message}`
	)
}

const args = Bun.argv.slice(2) //parses args from command line
const cmd = required(args[0], "command") //ensures command is provided
const branchName = required(args[1], "branch name") //ensures branch name is provided
const targetBranch = args[2] ?? "development"
$.throws(true)

switch (cmd) {
	case "new":
		await createFeature(branchName, targetBranch)
		break
	case "finish":
		await finish(branchName, targetBranch)
		break
	case "sync":
		await sync()
		break
	case "pr":
		await createPR(targetBranch)
		break
	case "commit":
		const commitMessage = required(args[1], "commit message")
		const commitPath = args[2] ?? "."
		await commit(commitMessage, commitPath)
		break
	default:
		console.log(
			"Usage: bun scripts/branch.ts [new|finish|sync|pr|commit] [name] [target]"
		)
}
