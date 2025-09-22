# Cypress + TypeScript Automation Kit

A lean, opinionated end‑to‑end testing starter built with **Cypress** + **TypeScript**, organized with a clear **Page Object Model (POM)**, test **tagging** via `@cypress/grep`, and **rich HTML reports** via `cypress-mochawesome-reporter`. It targets the sample **Sauce Demo** site to showcase real, working flows (login, inventory, cart, checkout) and a simple **healthcheck**.

> This README is tailored to your repo’s current structure and config.

---

## ✨ Highlights

- **TypeScript-first** setup with strict types (`cypress/tsconfig.json`)
- **POM structure**: `pages`, `navigation`, and `Website.ts` composition
- **Realistic specs**: `auth/login.cy.ts`, `checkout/checkout-flow.cy.ts`, `smoke/healthcheck.cy.ts`
- **Reusable utilities**: `TestHelpers` for steps, waits, and health checks
- **Tagging & selective runs** with `@cypress/grep` (`{ tags: [...] }` in `describe` and `it`)
- **Mochawesome HTML reports** + screenshots/videos artifacts
- **ESLint + Prettier** formatting/linting with sensible defaults
- **GitHub Actions workflow** for manual (dispatch) CI runs with inputs (browser, environment, grep)

---

## 📦 Project Structure

```
Automation_Scripts/
├─ cypress.config.ts
├─ eslint.config.js
├─ prettier.config.js
├─ package.json
└─ cypress/
   ├─ cypress.d.ts
   ├─ tsconfig.json
   ├─ Website.ts                 # Central access to POM groups
   ├─ fixtures/
   │  ├─ environment.ts          # Maps env keys → base URLs (qa/staging/prod)
   │  └─ user.ts                 # Test users
   ├─ navigation/                # UI components shared across pages
   │  ├─ MainSidebar.ts
   │  └─ Navbar.ts
   ├─ pages/                     # Page Objects
   │  ├─ HomePage.ts
   │  ├─ LoginPage.ts
   │  ├─ InventoryPage.ts
   │  ├─ CartPage.ts
   │  └─ CheckoutPage.ts
   ├─ support/
   │  ├─ TestHelpers.ts         # Custom utility helpers (steps, waits, checks)
   │  ├─ commands.ts             # Place custom Cypress.Commands here
   │  └─ e2e.ts                  # Global setup: reporter, steps, grep registration
   └─ e2e/                       # Test specs
      ├─ smoke/healthcheck.cy.ts
      ├─ auth/login.cy.ts
      └─ checkout/checkout-flow.cy.ts
```

---

## 🧰 Prerequisites

- **Node.js** ≥ 18.x (LTS recommended)
- **npm** ≥ 9.x

Check your versions:

```bash
node -v
npm -v
```

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Run the full headless suite (Electron by default):

```bash
npx cypress run
```

Open Cypress runner (interactive):

```bash
npx cypress open
```

Run a single spec:

```bash
npx cypress run --spec "cypress/e2e/auth/login.cy.ts"
```

---

## 🌎 Environments

`cypress/fixtures/environment.ts` maps **env keys** to base URLs:

- `qa` → `https://www.saucedemo.com`
- `staging` → `https://www.saucedemo.com`
- `prod` → `https://www.saucedemo.com`

> Note: All three environments currently point to the same link.  
> This setup is intentional to illustrate how to structure environment configuration, so it can easily be extended with unique URLs when needed.

Pass the target environment using `--env env=<qa|staging|prod>`:

```bash
npx cypress run --env env=staging
```

> The `HomePage.visit(env)` leverages the `env.getEnvironment()` method to resolve the correct base URL.

---

## 🏷️ Tagging & Filtering (via @cypress/grep)

Specs and tests include tags, e.g.:

```ts
describe('Log in - Functional', { tags: ['@auth'] }, () => { ... })
it('Smoke check', { tags: ['@healthCheck'] }, () => { ... })
```

Filter by tags at runtime:

```bash
# Run only @auth tests
npx cypress run --env grepTags=@auth

# Run @auth and @checkout
npx cypress run --env grepTags="@auth @checkout"
```

> `cypress/support/e2e.ts` registers `@cypress/grep` so tag filters work in both `open` and `run` modes.

---

## 🧪 Useful Commands

Open a specific browser:

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
```

Run with screenshots/videos enabled (configured in `cypress.config.ts`):

```bash
npx cypress run --config video=true
```

Run a subset of specs by glob:

```bash
npx cypress run --spec "cypress/e2e/**/checkout*.cy.ts"
```

---

## 📊 Reports & Artifacts

This kit uses **cypress-mochawesome-reporter**.

- Reporter is configured in `cypress.config.ts` and registered in `cypress/support/e2e.ts`.
- After a run, you’ll find HTML reports and supporting assets under:
  - `cypress/reports/html/`
  - Screenshots: `cypress/screenshots/**`
  - Videos: `cypress/videos/**` (if `video: true`)

Open the generated HTML report in your browser to review steps and failures.

> Steps emitted via `TestHelpers.defineTheStep('...')` become human-friendly nodes in reports when paired with `cypress-plugin-steps`.

---

## 🧱 Page Object Model (POM)

The kit splits UI logic into **Inputs**, **Buttons**, **Views** within each Page Object, keeping selectors and actions tidy. `Website.ts` exposes accessors so tests read fluently:

```ts
Website.pages.login.visit(env)
Website.pages.login.loginUser(username, password)
Website.navigation.navBar.checkCartBadgeNumber(1)
```

This composition keeps tests expressive, low-noise, and resilient to UI changes.

---

## 🧹 Lint & Format

Lint:

```bash
npm run lint
```

Format (write changes):

```bash
npm run format
```

Format (check only):

```bash
npm run format:check
```

Prettier and ESLint are configured to align (e.g., `printWidth: 120`, single quotes, no semi-colons).

---

## ⚙️ Configuration Notes

Key points from `cypress.config.ts`:

- **Retries**: `runMode: 2`, `openMode: 0`
- **Reporter**: `cypress-mochawesome-reporter` with inline assets and charts
- **Viewport**: `1920 x 1080`
- **Videos**: `false` by default (enable with `--config video=true`)
- **Screenshots on failure**: enabled for `cypress run`
- **Support file**: `cypress/support/e2e.ts`

> If you add environment-specific base URLs or toggles, prefer `Cypress.env('key')` and centralize lookups in `fixtures/environment.ts`.

---

## 🏗️ CI: GitHub Actions (manual dispatch)

A workflow is included under `.github/workflows/main.yml` called **“E2E Regression”**. It supports **manual dispatch** with inputs:

- **browser**: `electron` | `chrome` | `firefox`
- **environment**: `qa` | `staging` | `prod`
- **grep**: (optional) pass tags like `@auth @checkout`

Example manual run (conceptually equivalent to):

```bash
npm ci
npm run headlessMode -- --browser chrome --env env=staging,grepTags="@auth"
```

Artifacts uploaded after each run include reports, screenshots, and videos.

---

## 🔧 Extending the Suite

- **Add a new page**: create `cypress/pages/YourPage.ts`, expose it via `Website.ts`.
- **Create reusable flows**: add helpers to `TestHelpers.ts` or extract into domain-specific services.
- **Add data**: place static fixtures in `cypress/fixtures/`.
- **Custom commands**: add to `cypress/support/commands.ts` and extend types in `cypress/cypress.d.ts` if needed.
- **Selectors**: prefer `data-test` attributes when available for stability.

---

## 🧭 Common Run Recipes

**Smoke only:**

```bash
npx cypress run --env grepTags=@healthCheck --browser electron
```

**Auth & Checkout in Chrome against staging:**

```bash
npx cypress run --browser chrome --env env=staging,grepTags="@auth @checkout"
```

**Debug a single test interactively:**

```bash
npx cypress open
# select spec in UI
```

---

## 🛡️ Troubleshooting

- **No tests run with grep**: ensure tags are present in `describe/it` options and you passed `--env grepTags=...`.
- **Base URL wrong**: verify `--env env=<qa|staging|prod>` and mappings in `fixtures/environment.ts`.
- **Types not found**: check `cypress/tsconfig.json` includes `"types": ["cypress", "node", "cypress-plugin-steps", "@cypress/grep"]`.
- **Reports missing**: confirm the reporter is set in `cypress.config.ts` and that `import 'cypress-mochawesome-reporter/register'` exists in `support/e2e.ts`.
