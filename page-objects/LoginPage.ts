import { expect, Page} from "@playwright/test";

export class LoginPage{

    readonly page:Page;
    readonly validationUrl:string ="https://the-internet.herokuapp.com/login";
    readonly secureArea:string = "https://the-internet.herokuapp.com/secure";
   

    constructor (page:Page){
      this.page = page;
    }

    async fillInLoginFlow(userid:string, password:string){
      await this.page.getByLabel("Username").fill(userid);
      await this.page.getByLabel("Password").fill(password);
      await this.page.getByText("Login").last().click();
    }

    async validateWeAreOnLoginFormPage(){
        await expect (this.page).toHaveURL(this.validationUrl);
    }

    async validateWeAreOnSecureAreaPage(){
        await expect(this.page).toHaveURL(this.secureArea)
    }
}