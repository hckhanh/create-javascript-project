import { encode } from "ini";
import { Formatter } from "./Formatter";

export class IniFormatter extends Formatter {
  format(configs: object) {
    const iniConfigs = encode(configs);
    return iniConfigs.replace(/\.\*=true/g, ".*");
  }

  formatFileName(fileName: string): string {
    return fileName;
  }
}
