import { JsonFormatter } from "./JsonFormatter";

export class JsFormatter extends JsonFormatter {
  format(configs: object) {
    const jsonObj = super.format(configs);
    return "module.exports = ".concat(jsonObj);
  }

  formatFileName(fileName: string): string {
    return fileName;
  }
}
