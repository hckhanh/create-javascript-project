import { formatJson } from "../process";
import { Formatter } from "./Formatter";

export class JsonFormatter extends Formatter {
  format(configs: object) {
    return formatJson(configs);
  }

  formatFileName(fileName: string): string {
    return fileName;
  }
}
