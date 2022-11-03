import playwright from 'playwright';
import { Sequelize } from 'sequelize';
import db from '../../../db/connect';

class PlaywrightService {
  sequelize: Sequelize;

  constructor() {
    this.sequelize = db;
  }

  async downloadDeclarationPage(
    username: string,
    password: string,
    url: string
  ): Promise<any> {
    (async () => {
      const browser = await playwright.chromium.launch({
        headless: false,
      });
      const page = await browser.newPage();
      await page.goto(url);
      await page.waitForNavigation();
      await page.click('.login');
      await page.waitForNavigation();
      await page.fill('input[placeholder="User ID"]', `${username}`);
      await page.fill('input[placeholder="Password"]', `${password}`);
      await page.click('button[data-pgr-id="buttonSubmitLogin"]');

      await browser.close();
    })();
  }
}

const playwrightService = new PlaywrightService();

export default playwrightService;
