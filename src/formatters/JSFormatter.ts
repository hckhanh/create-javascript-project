import { JSONFormatter } from "./JSONFormatter";

export class JSFormatter extends JSONFormatter {
  format(configs: object) {
    const jsonObj = super.format(configs);
    return "module.exports = ".concat(jsonObj);
  }

  formatFileName(fileName: string): string {
    return fileName;
  }
}
