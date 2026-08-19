# Playwright E2E Test Suite

![Playwright Tests](https://github.com/RitvikShetty17/Playwright-Ecommerce-Suite/actions/workflows/playwright.yml/badge.svg)

An end-to-end automated test suite for a demo e-commerce application, built with Playwright and TypeScript using the Page Object Model architecture. Tests run automatically on every push via GitHub Actions CI across Chromium, Firefox, and WebKit.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Playwright | Browser automation and test execution |
| TypeScript | Type-safe test and page object code |
| GitHub Actions | CI/CD — runs tests on every push |
| Page Object Model | Test architecture pattern |
| Node.js | Runtime environment |

---

## Project Structure


---

## Test Coverage

| Module | Tests | Browsers | Total Runs |
|--------|-------|----------|------------|
| Authentication | 3 | 3 | 9 |
| Products | 2 | 3 | 6 |
| Cart | 3 | 3 | 9 |
| Checkout | 2 | 3 | 6 |
| **Total** | **10** | **3** | **30** |

Full traceability matrix: [docs/test-coverage.md](docs/test-coverage.md)

---

## Test Layers

Tests are tagged and can be run independently:

```bash
# Run smoke tests only — critical path, fast feedback
npx playwright test --grep "@smoke"

# Run sanity tests only — targeted validation
npx playwright test --grep "@sanity"

# Run regression tests only — full coverage
npx playwright test --grep "@regression"

# Run full suite across all browsers
npx playwright test
```

| Layer | Purpose | Count |
|-------|---------|-------|
| `@smoke` | Core flows — runs on every deploy | 4 tests |
| `@sanity` | Validation checks — runs after bug fixes | 3 tests |
| `@regression` | Full coverage — runs nightly | 3 tests |

---

## How to Run Locally

**Prerequisites:** Node.js v18 or higher

```bash
# Clone the repo
git clone https://github.com/RitvikShetty17/Playwright-Ecommerce-Suite.git
cd Playwright-Ecommerce-Suite

# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install

# Run the full test suite
npx playwright test

# View the HTML report
npx playwright show-report
```

---

## CI/CD Pipeline

Tests run automatically on every push to `main` via GitHub Actions:

1. Spins up a fresh Ubuntu Linux environment
2. Installs Node.js and dependencies
3. Installs Playwright browsers with system dependencies
4. Runs smoke tests first for fast feedback
5. Runs the full suite across all 3 browsers
6. Uploads the HTML report as a downloadable artifact

View all CI runs: [Actions Tab](https://github.com/RitvikShetty17/Playwright-Ecommerce-Suite/actions)

---

## Architecture — Page Object Model

Every page of the application has a dedicated class in `/pages`. Tests import and compose these classes rather than interacting with selectors directly.


Benefits:
- Single source of truth for every selector
- UI changes require updates in one place only
- Tests read like plain English business requirements
- Reusable across multiple test files

---

## What I Learned Building This

- **async/await in JavaScript** — why every Playwright action must be awaited and what breaks without it
- **Page Object Model pattern** — separating test logic from page interaction logic for maintainability at scale
- **GitHub Actions CI/CD** — writing YAML workflows that run tests automatically on every push
- **Playwright fixtures** — eliminating repeated setup code by creating reusable pre-authenticated sessions
- **Cross-browser testing** — configuring and running the same test suite across Chromium, Firefox, and WebKit
- **Test layer strategy** — tagging and running smoke, sanity, and regression tests independently based on context

