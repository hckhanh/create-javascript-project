import { Formatter } from "./Formatter";

export class JSONFormatter extends Formatter {
  format(configs: object) {
    return JSON.stringify(configs, null, 2);
  }

  formatFileName(fileName: string): string {
    return fileName;
  }
}
