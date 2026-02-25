import {expect, Locator, Page} from "@playwright/test"
import { LoginPage } from "./LoginPage";


export class LandingPage{
    readonly abTestLink:string = "A/B Testing"
    readonly formAuthentication:string ="Form Authentication";
    readonly abTestExpectedUrl:string="https://the-internet.herokuapp.com/abtest"
    readonly allLinksList:Locator[] =[]

    readonly page:Page;
    constructor( page: Page){
       this.page=page
    }
    
  async clickABTestingOnHerokuApp(){
   await this.page.getByText(this.abTestLink).click();
   await expect(this.page).toHaveURL(this.abTestExpectedUrl)
   console.log("we navigated to required page");
  }

   
  async clickFormAuthenticationLink_OnHerokuApp(){
    await this.page.getByText(this.formAuthentication).click();
     var loginPage = new LoginPage(this.page);
     loginPage.validateWeAreOnLoginFormPage();
  }

  async getAllLinksInAList(){
    var locators = await this.page.locator('a:visible');
    var linkCount = await locators.count();
    for(let i=0; i<linkCount; i++){
       this.allLinksList.push(locators.nth(i));
       console.log(await this.allLinksList[i].textContent())
    }
    console.log(" The number of links on the page is "+linkCount);  


  }


}
