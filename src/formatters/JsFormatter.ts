import { JsonFormatter } from "./JsonFormatter";

export class JsFormatter extends JsonFormatter {
  format(configs: Record<string, unknown>) {
    const jsonObj = super.format(configs);
    return "module.exports = ".concat(jsonObj);
  }

  formatFileName(fileName: string): string {
    return fileName;
  }
}
