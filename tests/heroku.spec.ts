import { test, expect } from "../fixtures/beforeTest_fixture";
import { LandingPage } from "../page-objects/landingPage";
import { LoginPage } from "../page-objects/LoginPage";


test ("Verify we have landed on correct page", async({page}) =>{
 await expect(page).toHaveTitle("The Internet")
})

test("Verify the number of links on the page", async({page}) =>{
    const landingPage = new LandingPage(page)
    await landingPage.getAllLinksInAList();
})

test ("Verify if you are able to click on A/B testing", async({page}) =>{
   const landingPage = new LandingPage(page)
   await landingPage.clickABTestingOnHerokuApp();
})

test(" Click on the login form link and fill in the login process", async({page})=>{
    const landingPage = new LandingPage(page)
    const loginPage = new LoginPage(page);

    await landingPage.clickFormAuthenticationLink_OnHerokuApp();
    await loginPage.fillInLoginFlow('tomsmith','SuperSecretPassword!');
    await loginPage.validateWeAreOnSecureAreaPage();

})