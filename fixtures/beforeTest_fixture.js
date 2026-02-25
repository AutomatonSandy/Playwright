import{test as setup} from '@playwright/test';

export const test = setup.extend({
    page: async ({ page }, use) => {
        await page.goto("https://the-internet.herokuapp.com/");
        await use(page);
        await page.goto("https://the-internet.herokuapp.com/");
    }
});
export {expect} from '@playwright/test';