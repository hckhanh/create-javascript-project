import { Formatter } from "./Formatter";
import * as yaml from "js-yaml";

export class YAMLFormatter extends Formatter {
  format(configs: object) {
    return yaml.dump(configs);
  }

  formatFileName(fileName: string): string {
    return `${fileName}.yml`;
  }
}
