import { readFileSync } from "fs";
import { join } from "path";
import { Options } from "./options";
import { EAP110 } from "./rebooters/EAP110";
import { LAPN300 } from "./rebooters/LAPN300";

interface Config {
  user: string,
  pass: string,
  devices: Options[]
}

const config: Config = JSON.parse(readFileSync(join(process.cwd(), 'config.json'), 'utf8'));

async function reboot() {
  for (const device of config.devices) {
    process.stdout.write(`${device.host} `);
    try {
      switch (device.type) {
        case undefined:
          process.stdout.write('Type not specified');
          break;
        case 'LAPN300':
          await LAPN300({ user: config.user, pass: config.pass, ...device });
          process.stdout.write('Rebooted');
          break;
        case 'EAP110':
          await EAP110({ user: config.user, pass: config.pass, ...device });
          process.stdout.write('Rebooted');
          break;
        default:
          process.stdout.write(`Type not suported: ${device.type}`);
          break;
      }
    } catch (error) {
      process.stdout.write(`ERROR ${error.message}`);
    }
    process.stdout.write(`\n`);
  }
  process.exit();
}

reboot();
