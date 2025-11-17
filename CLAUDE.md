# CLAUDE.md - AI Assistant Guide for Rexton Tournaments

## Project Overview

**Rexton Tournaments** is a web platform for League of Legends tournament management, designed for the Rexton gaming community. The platform enables users to participate in tournaments with customizable maps, game modes, and rules. The project is being prepared for Riot Games approval.

**License**: Mozilla Public License 2.0 (MPL-2.0)

**Key Features**:
- Tournament creation and management by game masters
- User participation system
- Configurable game rules and modes
- Progressive Web App (PWA) support for offline use

## Repository Structure

```
rexton-tournaments/
├── packages/                    # Monorepo workspace packages
│   ├── server/                 # Backend server (@rexton/server)
│   │   └── package.json
│   ├── web/                    # Frontend web application (@rexton/web)
│   │   └── package.json        # React-based UI
│   └── shared/                 # Shared utilities and types (@rexton/shared)
│       └── package.json
├── scripts/                    # Build and development scripts
│   ├── build.ts               # Production build script
│   └── appInit.ts             # App initialization script
├── eslint.config.js           # ESLint configuration
├── tsconfig.base.json         # Base TypeScript configuration
├── bunfig.toml               # Bun runtime configuration
├── package.json              # Root package.json with workspaces
├── README.md                 # Project documentation
├── LICENSE.md                # MPL-2.0 license
└── .gitignore                # Git ignore patterns
```

## Technology Stack

### Runtime & Package Manager
- **Bun**: Primary runtime and package manager (not Node.js)
- Fast, modern JavaScript runtime with built-in bundler
- Native TypeScript support

### Languages
- **TypeScript 5.6.3+**: Strict type checking enabled
- **JavaScript (ESNext)**: Modern JS with ES modules

### Frontend
- **React 18.2.0**: UI framework
- **React DOM 18.2.0**: DOM rendering
- JSX with `react-jsx` transform

### Build System
- **Bun.build**: Native bundler for both client and server
- **TypeScript Compiler**: Type checking and declarations
- ESM (ES Modules) format for all outputs

### Code Quality
- **ESLint 9.17.0**: Linting with strict TypeScript rules
- **TypeScript ESLint**: Type-aware linting
- **Stylistic ESLint Plugin**: Code formatting rules

### Workspace Management
- Bun workspaces for monorepo structure
- Workspace protocol for internal dependencies (`workspace:*`)

## TypeScript Configuration

### Strict Mode Settings
The project uses **extremely strict TypeScript settings**:

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "strictFunctionTypes": true,
  "strictBindCallApply": true,
  "strictPropertyInitialization": true,
  "noImplicitThis": true,
  "useUnknownInCatchVariables": true,
  "alwaysStrict": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true,
  "exactOptionalPropertyTypes": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noPropertyAccessFromIndexSignature": true
}
```

### Path Aliases
```typescript
"@packages/*" → "src/packages/*"
"@packages/server/*" → "src/packages/server/*"
"@packages/shared/*" → "src/packages/shared/*"
"@packages/web/*" → "src/packages/web/*"
```

### Key Compiler Options
- **Target**: ESNext (latest JavaScript features)
- **Module**: ESNext with bundler resolution
- **JSX**: react-jsx (automatic JSX runtime)
- **isolatedModules**: false (allows cross-file optimizations)
- **allowImportingTsExtensions**: true (import .ts files directly)
- **verbatimModuleSyntax**: true (preserves import/export syntax)

## Code Conventions and Standards

### Naming Conventions (CRITICAL)

```typescript
// ✅ Interfaces MUST start with "I" prefix
interface IUser {
    name: string
}

// ✅ Type aliases use PascalCase
type UserRole = "admin" | "player" | "spectator"

// ✅ Variables use camelCase or UPPER_CASE (constants)
const userName = "player1"
const MAX_PLAYERS = 10
const _privateVar = "allowed" // Leading underscore allowed

// ❌ WRONG - Interface without "I" prefix will fail lint
interface User { } // ERROR
```

### Code Style Rules

```typescript
// ✅ Double quotes (not single quotes)
const message = "Hello world"

// ✅ No semicolons
const x = 5
const y = 10

// ✅ 4-space indentation
function example(): void {
    if (true) {
        console.log("indented")
    }
}

// ✅ 1TBS brace style
if (condition) {
    // code
} else {
    // code
}

// ✅ Arrow function parens always required
const fn = (x) => x * 2
const single = (x) => x // Even for single param

// ✅ Max line length: 100 characters (excluding strings, templates, comments)
const long = "This can be longer than 100 chars"
```

### TypeScript Best Practices

```typescript
// ✅ Explicit function return types required
function calculate(x: number): number {
    return x * 2
}

// ✅ Explicit member accessibility
class Tournament {
    public name: string
    private id: string
    protected createdAt: Date

    public constructor(name: string) {
        this.name = name
    }

    public start(): void { }
    private validate(): boolean { }
}

// ✅ No "any" type allowed
const data: unknown = fetchData() // Use unknown instead

// ✅ Use optional chaining
const name = user?.profile?.name

// ✅ Use nullish coalescing
const port = config.port ?? 3000

// ✅ Prefer readonly where possible
class Config {
    public readonly maxPlayers = 10
}

// ✅ Use includes() instead of indexOf()
if (array.includes(item)) { }

// ✅ Use startsWith/endsWith for strings
if (str.startsWith("http")) { }

// ❌ No require() imports (use ES modules only)
import { something } from "./module" // ✅
const something = require("./module") // ❌

// ❌ No unnecessary type assertions
const x = value as string // Only when absolutely necessary

// ❌ No throwing non-Error objects
throw new Error("message") // ✅
throw "string" // ❌

// ❌ No floating promises (always await or handle)
await asyncFunction() // ✅
void asyncFunction() // ✅ if intentionally not awaited
asyncFunction() // ❌
```

### Class Member Ordering

```typescript
class Example {
    // 1. Public static fields
    public static readonly VERSION = "1.0.0"

    // 2. Protected static fields
    protected static config = {}

    // 3. Private static fields
    private static instance: Example

    // 4. Public instance fields
    public name: string

    // 5. Protected instance fields
    protected id: number

    // 6. Private instance fields
    private secret: string

    // 7. Constructor
    public constructor() { }

    // 8. Public methods
    public start(): void { }

    // 9. Protected methods
    protected validate(): boolean { }

    // 10. Private methods
    private cleanup(): void { }
}
```

## Build System

### Build Scripts

#### Production Build
```bash
bun run pack
```
- Builds all three packages: shared → web → server
- Outputs to `packages/{package}/dist`
- Minified ESM bundles
- Code splitting enabled

#### Package-Specific Builds

```bash
# Shared package (types and utilities)
cd packages/shared
bun run build  # Uses tsc for type declarations

# Web package (React frontend)
cd packages/web
bun run build  # Bundles from src/public/index.html

# Server package (Backend API)
cd packages/server
bun run build  # Bundles from src/app.ts
```

### Build Configuration Details

**Shared Package**:
- Entry: `packages/shared/src/index.ts`
- Output: `packages/shared/dist`
- Target: Bun
- Format: ESM with splitting

**Web Package**:
- Entry: `packages/web/src/public/index.html`
- Output: `packages/web/dist`
- Target: Bun
- Features: Experimental CSS and HTML support
- External: `@rexton/shared`

**Server Package**:
- Entry: `packages/server/src/app.ts`
- Output: `packages/server/dist`
- Target: Bun
- External: `@rexton/shared`

## Development Workflow

### Initial Setup

```bash
# Install dependencies (using Bun, not npm)
bun install

# Clean everything and reinstall
bun run rxt:clean:all
```

### Development Commands

```bash
# Start development mode (currently references scripts/dev.ts - not yet created)
bun run dev

# Run tests (currently references scripts/test.ts - not yet created)
bun run test

# Lint code
bun run lint

# Clean operations
bun run rxt:clean:dist        # Remove dist folders
bun run rxt:clean:node_modules # Remove node_modules and lockfile
bun run rxt:clean:all         # Clean and reinstall everything
```

### Package Development

```bash
# Server development (with hot reload)
cd packages/server
bun run dev  # Runs with --watch flag

# Web development
cd packages/web
bun run dev

# Shared package development (watch mode)
cd packages/shared
bun run dev  # tsc --watch
```

### Type Checking

```bash
# Web package type checking (no emit)
cd packages/web
bun run typecheck
```

## Git Workflow

### Branch Strategy
- Development happens on feature branches prefixed with `claude/`
- Branch naming: `claude/claude-md-{session-id}`
- Main branch: (to be determined - currently no main branch set)

### Commit Guidelines

Based on recent commit history, the project uses conventional commits:

```
feat: description of new feature
fix: description of bug fix
chore: routine task
docs: documentation updates
```

### Common Git Operations

```bash
# Check current branch
git branch --show-current

# View status
git status

# Stage and commit
git add .
git commit -m "feat: your message"

# Push to feature branch
git push -u origin claude/your-branch-name
```

## Project Status

### Currently Implemented
- ✅ Monorepo structure with Bun workspaces
- ✅ TypeScript configuration with strict mode
- ✅ ESLint with comprehensive rules
- ✅ Build scripts for all packages
- ✅ Package structure (server, web, shared)
- ✅ React setup for web package

### Not Yet Implemented
- ⚠️ `scripts/dev.ts` (referenced in package.json but missing)
- ⚠️ `scripts/test.ts` (referenced in package.json but missing)
- ⚠️ Source code in `packages/*/src` directories (empty packages)
- ⚠️ Database setup
- ⚠️ API endpoints
- ⚠️ Authentication system
- ⚠️ Tournament logic

## Important Notes for AI Assistants

### Critical Rules

1. **Use Bun, NOT npm/yarn/pnpm**
   ```bash
   bun install  # ✅
   npm install  # ❌
   ```

2. **Follow Strict TypeScript Rules**
   - All interfaces MUST start with `I`
   - Always provide explicit return types
   - Never use `any` type
   - Use `unknown` for unknown types

3. **Code Style is Enforced**
   - Double quotes only
   - No semicolons
   - 4-space indentation
   - Max 100 character lines (code only)

4. **Monorepo Dependencies**
   - Use `workspace:*` for internal package dependencies
   - Shared package must be built before server/web can use it

5. **File Organization**
   - Source code goes in `packages/{package}/src/`
   - Built output goes in `packages/{package}/dist/`
   - Scripts go in root `scripts/` directory

### When Adding New Code

1. **Always run linter** before committing:
   ```bash
   bun run lint
   ```

2. **Respect the monorepo structure**:
   - Server code → `packages/server/src/`
   - Web code → `packages/web/src/`
   - Shared utilities → `packages/shared/src/`

3. **Use path aliases**:
   ```typescript
   import { something } from "@packages/shared/utils"
   ```

4. **Follow naming conventions** or ESLint will fail

5. **All new functions need explicit return types**

### Common Pitfalls to Avoid

❌ **Don't**:
- Use npm/yarn/pnpm commands
- Use single quotes
- Add semicolons
- Use 2-space indentation
- Create interfaces without `I` prefix
- Use `any` type
- Use `require()` imports
- Skip return type annotations
- Violate 100-char limit (for code)

✅ **Do**:
- Use Bun for all operations
- Use double quotes
- Omit semicolons
- Use 4-space indentation
- Prefix interfaces with `I`
- Use `unknown` or specific types
- Use ES module imports
- Provide explicit return types
- Keep code lines under 100 chars

### Testing New Features

Currently, the test infrastructure is not set up (`scripts/test.ts` is missing). When implementing tests:

1. Create `scripts/test.ts`
2. Configure test runner (likely Bun's built-in test runner)
3. Add tests in each package as needed
4. Follow the same strict TypeScript rules

### Security Considerations

- The app is open source but implements security measures
- Environment variables go in `.env` files (gitignored)
- Never commit sensitive data
- Project is being prepared for Riot Games API approval

## Package Dependency Graph

```
┌─────────────────┐
│  @rexton/web    │
│   (Frontend)    │
└────────┬────────┘
         │
         │ depends on
         ↓
┌─────────────────┐     ┌──────────────────┐
│ @rexton/server  │────→│ @rexton/shared   │
│   (Backend)     │     │ (Shared Utils)   │
└─────────────────┘     └──────────────────┘
```

Build order: `shared` → `web` & `server`

## Quick Reference Commands

```bash
# Fresh start
bun run rxt:clean:all

# Development
bun run dev                    # Full app dev mode
cd packages/server && bun run dev   # Server only
cd packages/web && bun run dev      # Web only

# Building
bun run pack                   # Build all packages
cd packages/{name} && bun run build # Build specific package

# Code Quality
bun run lint                   # Run ESLint
cd packages/web && bun run typecheck # Type check web package

# Cleanup
bun run rxt:clean:dist              # Remove build artifacts
bun run rxt:clean:node_modules      # Remove dependencies
```

## Resources

- **Discord**: https://discord.gg/YjMM3qFwr7
- **WakaTime**: Project ID e3fce851-d054-4ce1-b82d-d55e4dee15df
- **License**: Mozilla Public License 2.0

## Questions or Issues?

1. Check this CLAUDE.md first
2. Review ESLint configuration in `eslint.config.js`
3. Check TypeScript config in `tsconfig.base.json`
4. Join the Discord for community support
5. Review recent commits for patterns: `git log --oneline -10`

---

**Last Updated**: 2025-11-17
**Project Status**: Early development (infrastructure setup complete, core features pending)
