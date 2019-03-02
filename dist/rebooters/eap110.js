"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Puppeteer = require("puppeteer");
async function EAP110(options) {
    try {
        const browser = await Puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto('http://' + options.host);
        await page.waitForSelector('input#login-username', { visible: true });
        await page.type('input#login-username', options.user);
        await page.type('input.password-text', options.pass);
        await page.click('button#login-btn');
        await page.waitForSelector('a[name="system-tools"]', { visible: true });
        await page.click('a[name="system-tools"]');
        await page.waitForSelector('a[name="reboot"]', { visible: true });
        await page.waitFor(500);
        await page.click('a[name="reboot"]');
        await page.waitForSelector('button#reboot', { visible: true });
        await page.click('button#reboot');
        await page.waitForSelector('#reboot_alert_cnt button.btn-msg-ok', { visible: true });
        await page.click('#reboot_alert_cnt button.btn-msg-ok');
        await browser.close();
    }
    catch (error) {
        throw error;
    }
}
exports.EAP110 = EAP110;
