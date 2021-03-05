import { dump } from "js-yaml";
import { Formatter } from "./Formatter";

export class YAMLFormatter extends Formatter {
  format(configs: object) {
    return dump(configs);
  }

  formatFileName(fileName: string): string {
    return `${fileName}.yml`;
  }
}
