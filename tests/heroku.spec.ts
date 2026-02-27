import { test, expect } from "../fixtures/beforeTest_fixture";
import { PageObjectManager} from "../utility/PageObjectManager";


test ("Verify we have landed on correct page", async({page}) =>{
 var pageManager = new PageObjectManager(page);
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
    await pageManager.getLoginPage().validateWeAreOnLoginFormPage();
    await pageManager.getLoginPage().fillInLoginFlow('tomsmith','SuperSecretPassword!');
    await pageManager.getLoginPage().validateWeAreOnSecureAreaPage();

})

test(" Click on the shadow dom link and get the text in the shadow dom", async({page})=>{
    var pageManager = new PageObjectManager(page);
    await pageManager.getLandingPage().clickShadowDomLink();
    await pageManager.getShadowDomPage().validateShadowDomPage();
    await pageManager.getShadowDomPage().getShadowDomText();
})
