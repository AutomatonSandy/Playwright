import {Page} from "@playwright/test";
import { LandingPage } from "../page-objects/landingPage";
import { LoginPage } from "../page-objects/LoginPage";

export class PageObjectManager{
    private readonly page: Page;
    private readonly landingPage: LandingPage;
    private readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.landingPage = new LandingPage(this.page);
    this.loginPage = new LoginPage(this.page);

  }

  getLandingPage() {
    return this.landingPage;
  }

  getLoginPage() {
    return this.loginPage;
  }

}