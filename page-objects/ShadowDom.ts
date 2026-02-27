import { Page,expect } from "@playwright/test";


export class ShadowDomPage{
    private shadowDomLink:string = "https://the-internet.herokuapp.com/shadowdom";
    readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }

    async validateShadowDomPage(){
        await expect(this.page).toHaveURL(this.shadowDomLink);
    }
    
    async getShadowDomText(){
        const shadowDomText = await this.page.locator('my-paragraph').first().textContent();
        console.log("The text in the shadow dom is "+shadowDomText);
    }   

}