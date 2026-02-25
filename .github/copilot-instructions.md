# Copilot Instructions for Playwright Test Suite

## Project Overview

This is a Playwright E2E test automation project targeting the [Internet Herokuapp](https://the-internet.herokuapp.com/) application. It follows the **Page Object Model (POM)** pattern for maintainability and reusability.

## Architecture & Component Structure

### Page Objects (`page-objects/` directory)

Page objects encapsulate locators and interactions for specific pages:

- **LandingPage.ts**: Handles interactions on the main Herokuapp page (links, navigation)
- **LoginPage.ts**: Manages login form interactions and validation

**Key Pattern**: Page objects are instantiated within test files or other page objects, with the `Page` object passed via constructor:

```typescript
export class LandingPage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }
  async clickABTestingOnHerokuApp() { /* ... */ }
}
```

### Test Files (`tests/` directory)

- **heroku.spec.ts**: Active test suite using LandingPage and LoginPage objects
- **example.spec.ts**: Placeholder tests (all skipped)

Tests use `beforeEach` to navigate to the base URL, then instantiate page objects:

```typescript
test.beforeEach(async({page}) => {
  await page.goto("https://the-internet.herokuapp.com/")
})
```

## Development Workflows

### Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/heroku.spec.ts

# Run with UI mode for debugging
npx playwright test --ui

# View HTML report after test run
npx playwright show-report
```

### Browser Configuration

The project is configured to run tests across **three browser engines** (chromium, firefox, webkit). Each browser spawns as **maximized window** (`viewport: null`). Adjust in [playwright.config.ts](playwright.config.ts#L29-L32).

### CI/CD Behavior

- Retries: 2 on CI, 0 locally (see [playwright.config.ts](playwright.config.ts#L19))
- Workers: 1 on CI (sequential), multiple locally (parallel)
- Forbids `test.only` on CI to prevent incomplete test runs

## Key Conventions & Patterns

### Locator Selection

Prioritize **semantic locators** over raw selectors:

- `getByText()` - for visible text (e.g., links, buttons)
- `getByLabel()` - for form inputs with labels
- `getByRole()` - for accessible elements by ARIA role

**Example from LandingPage**:

```typescript
await this.page.getByText(this.abTestLink).click();  // Semantic
await this.page.getByLabel("Username").fill(userid);  // Label-based
```

### Page Object Methods

- Methods are **async** and **descriptive**: `clickABTestingOnHerokuApp()`, `fillInLoginFlow()`
- Use **string constants** for locator text: `readonly abTestLink: string = "A/B Testing"`
- Return nothing from action methods; include assertions for validation within the method
- Methods can instantiate other page objects for multi-page workflows:

```typescript
async clickFormAuthenticationLink_OnHerokuApp() {
  await this.page.getByText(this.formAuthentication).click();
  var loginPage = new LoginPage(this.page);
  loginPage.validateWeAreOnLoginFormPage();
}
```

### Assertions

Use **Playwright's `expect()` API** for validations:

- URL/navigation: `expect(page).toHaveURL(expectedUrl)`
- Visibility: `expect(element).toBeVisible()`
- Content: `expect(element).toHaveText(expectedText)`

Assertions are typically called **within page object methods** rather than in test code.

## Adding New Tests

1. Create a page object in `page-objects/` if testing a new page
2. Define locators as readonly class properties
3. Add async methods for user interactions and validations
4. Import the page object in test file and instantiate with `page` parameter
5. Call methods to perform test flows

**Example**:

```typescript
test("My new test", async({page}) => {
  await page.goto("https://the-internet.herokuapp.com/");
  const landingPage = new LandingPage(page);
  await landingPage.clickABTestingOnHerokuApp();
})
```

## External Dependencies

- `@playwright/test` (v1.58.2): Test runner and assertions
- `@types/node`: Type definitions for Node.js APIs

No web server is configured—tests target the live Herokuapp application. Uncomment [webServer](playwright.config.ts#L85-L89) if a local dev server is needed.

## Important Files Reference

- [playwright.config.ts](playwright.config.ts): Browser engines, retries, reporters, viewport settings
- [package.json](package.json): Dependencies and test scripts
- [page-objects/landingPage.ts](page-objects/landingPage.ts): Main landing page interactions
- [page-objects/LoginPage.ts](page-objects/LoginPage.ts): Login form and secure area validation
- [tests/heroku.spec.ts](tests/heroku.spec.ts): Primary test scenarios
