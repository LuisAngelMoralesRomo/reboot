"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const EAP110_1 = require("./rebooters/EAP110");
const LAPN300_1 = require("./rebooters/LAPN300");
const config = JSON.parse(fs_1.readFileSync(path_1.join(process.cwd(), 'config.json'), 'utf8'));
async function reboot() {
    for (const device of config.devices) {
        process.stdout.write(`${device.host} `);
        try {
            switch (device.type) {
                case undefined:
                    process.stdout.write('Type not specified');
                    break;
                case 'LAPN300':
                    await LAPN300_1.LAPN300({ user: config.user, pass: config.pass, ...device });
                    process.stdout.write('Rebooted');
                    break;
                case 'EAP110':
                    await EAP110_1.EAP110({ user: config.user, pass: config.pass, ...device });
                    process.stdout.write('Rebooted');
                    break;
                default:
                    process.stdout.write(`Type not suported: ${device.type}`);
                    break;
            }
        }
        catch (error) {
            process.stdout.write(`ERROR ${error.message}`);
        }
        process.stdout.write(`\n`);
    }
    process.exit();
}
reboot();
