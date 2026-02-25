import{test as setup} from '@playwright/test';

export const test = setup.extend({
    page: async ({ page }, use) => {
        await page.goto("https://the-internet.herokuapp.com/");
        console.log("Before test");
        await use(page);
        console.log("After test");
        await page.goto("https://the-internet.herokuapp.com/");
    }
});
export {expect} from '@playwright/test';