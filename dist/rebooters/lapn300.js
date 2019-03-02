"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Puppeteer = require("puppeteer");
async function LAPN300(options) {
    try {
        const browser = await Puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto('http://' + options.host);
        await page.type('input.login_nm', options.user);
        await page.type('input.login_pw', options.pass);
        await page.click('input.login_bt');
        await page.waitForNavigation();
        await page.goto('http://' + options.host + '/Reboot.htm');
        await page.click('input#DeviceReboot_1');
        await page.click('input[name="save"]');
        await browser.close();
    }
    catch (error) {
        throw error;
    }
}
exports.LAPN300 = LAPN300;
