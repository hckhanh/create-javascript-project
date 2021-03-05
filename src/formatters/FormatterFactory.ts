import { ConfigsFileFormat } from "../types";
import { Formatter } from "./Formatter";
import { JsFormatter } from "./JsFormatter";
import { JsonFormatter } from "./JsonFormatter";
import { YamlFormatter } from "./YamlFormatter";

export class FormatterFactory {
  private static factory: FormatterFactory = new FormatterFactory();

  // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance() {
    return this.factory;
  }

  createFormatter(type: ConfigsFileFormat): Formatter {
    if (type === "js") {
      return new JsFormatter();
    }

    if (type === "json") {
      return new JsonFormatter();
    }

    if (type === "yml") {
      return new YamlFormatter();
    }

    throw new Error(`"${type}" formatter not implemented.`);
  }
}
