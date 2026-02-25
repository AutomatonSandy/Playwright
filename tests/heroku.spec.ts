import { test, expect } from "../fixtures/beforeTest_fixture";
import { PageObjectManager} from "../utility/PageObjectManager";


test ("Verify we have landed on correct page", async({page}) =>{
 var pageManager = new PageObjectManager(page);
//  await expect((pageManager.getLandingPage())).toHaveTitle("The Internet");
//  await expect (page).toHaveTitle("The Internet");
  await expect (pageManager.getLandingPage().page.title()).resolves.toMatch("The Internet");

})

test("Verify the number of links on the page", async({page}) =>{
    var pageManager = new PageObjectManager(page);
    await pageManager.getLandingPage().getAllLinksInAList();
})

test ("Verify if you are able to click on A/B testing", async({page}) =>{
    var pageManager = new PageObjectManager(page);
   await pageManager.getLandingPage().clickABTestingOnHerokuApp();
})

test(" Click on the login form link and fill in the login process", async({page})=>{
    var pageManager = new PageObjectManager(page);
    await pageManager.getLandingPage().clickFormAuthenticationLink_OnHerokuApp();
    await pageManager.getLoginPage().fillInLoginFlow('tomsmith','SuperSecretPassword!');
    await pageManager.getLoginPage().validateWeAreOnSecureAreaPage();

})