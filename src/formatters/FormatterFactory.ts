import { ConfigsFileFormat } from "../types";
import { Formatter } from "./Formatter";
import { JSFormatter } from "./JSFormatter";
import { JSONFormatter } from "./JSONFormatter";
import { YAMLFormatter } from "./YAMLFormatter";

export class FormatterFactory {
  private static factory: FormatterFactory = new FormatterFactory();

  private constructor() {}

  public static getInstance() {
    return this.factory;
  }

  createFormatter(type: ConfigsFileFormat): Formatter {
    if (type === "js") {
      return new JSFormatter();
    }

    if (type === "json") {
      return new JSONFormatter();
    }

    if (type === "yml") {
      return new YAMLFormatter();
    }

    throw new Error(`"${type}" formatter not implemented.`);
  }
}
