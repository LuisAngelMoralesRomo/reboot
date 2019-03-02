import * as Puppeteer from "puppeteer";
import { Options } from "../options";

export async function LAPN300(options: Options): Promise<void> {
  try {
    const browser: Puppeteer.Browser = await Puppeteer.launch({ args: ['--no-sandbox'] });
    const page: Puppeteer.Page = await browser.newPage();
    await page.goto('http://' + options.host);
    await page.type('input.login_nm', options.user);
    await page.type('input.login_pw', options.pass);
    await page.click('input.login_bt');
    await page.waitForNavigation();
    await page.goto('http://' + options.host + '/Reboot.htm');
    await page.click('input#DeviceReboot_1');
    await page.click('input[name="save"]');
    await browser.close();
  } catch (error) {
    throw error;
  }
}
