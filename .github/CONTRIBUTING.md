# League Tournament Platform Development Guide

>[!NOTE] Branch Structure and Naming Conventions
Our branch structure follows a tournament-like progression, where code advances through different stages before reaching production, just like teams progress through tournament rounds.

* Main Branches 👇
  * main - `Production code`
  * staging - `Pre-production testing`
  * development - `Active development`

## Feature Development Process

>[!IMPORTANT] When starting on anything, always branch from development

```bash
git checkout development
git pull origin development
# then create your feature branch
git checkout -b feature/[interest]-[small descriptor]
```

Example:

```bash
feature/tournament/allow-spectating
feature/auth/riot-api
feature/riot/rito-pls
```

## Development and Commits

Commit messages should be clear and descriptive:

```bash
git commit -m "feat(tournament): implement bracket generation algorithm"
git commit -m "test(tournament): add test cases for bracket seeding"
```

Commit types:

* feat: New features
* fix: Bug fixes
* refactor: Code restructuring
* test: Adding tests
* docs: Documentation updates
* style: Formatting changes
* perf: Performance improvements

## Step 3: Preparing for Staging

When your feature is ready for testing:

Create a pull request to staging

Title format: `[Feature]` Area: `Description`
<br/> Example: [Feature] Tournament: Bracket Generation System
<br/> PR description template:

```md
Changes
- Implemented bracket generation algorithm
- Added seeding logic for teams
- Created tournament progression tracking

## Testing Instructions
1. Create a new tournament
2. Register 8 teams
3. Verify bracket generation

## Screenshots
[If applicable]

## Checklist
- [ ] Tests added
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design verified
```

## Step 4: Moving to Production

After successful staging testing:

Create a PR from staging to main

`Title format: [Release] v1.x.x`

Include a full changelog of features

> [!IMPORTANT] Emergency Hotfix Process
When a critical issue needs immediate attention in production create a hotfix branch from main

```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue-description
```

## Implement the fix with minimal changes
Add thorough tests specific to the issue
Create two PRs:

`hotfix/critical-issue-description → main (immediate deployment)`
`hotfix/critical-issue-description → development (keep development updated)`

## Hotfix PR requires:

1. At least one senior developer review
2. All tests passing
3. No new features
4. Documentation of the issue and fix

Version Tagging
After merging to main, tag the release:

```bash
For regular releases
git tag -a v1.2.3 -m "Release version 1.2.3"
```

## For hotfixes

`git tag -a v1.2.4-hotfix -m "Hotfix: Critical issue description"`
