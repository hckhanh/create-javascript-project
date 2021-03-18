import { encode } from "ini";
import { Formatter } from "./Formatter";

export class IniFormatter extends Formatter {
  format(configs: object) {
    return encode(configs);
  }

  formatFileName(fileName: string): string {
    return fileName;
  }
}
