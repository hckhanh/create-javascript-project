import { Formatter } from "../formatters/Formatter";
import { Packager } from "../packagers/Packager";
import { GeneratorType, InquirerConfigs } from "../types";
import { ESLintGenerator } from "./ESLintGenerator";
import { FlowGenerator } from "./FlowGenerator";
import { Generator } from "./Generator";
import { PrettierGenerator } from "./PrettierGenerator";
import { Yarn2Generator } from "./Yarn2Generator";

export class GeneratorFactory {
  private static factory: GeneratorFactory = new GeneratorFactory();

  // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance() {
    return this.factory;
  }

  createGenerator(
    type: GeneratorType,
    userConfigs: InquirerConfigs,
    formatter: Formatter,
    packager: Packager,
  ): Generator {
    if (type === "eslint") {
      return new ESLintGenerator(userConfigs, formatter, packager);
    }

    if (type === "prettier") {
      return new PrettierGenerator(userConfigs, formatter, packager);
    }

    if (type === "yarn2") {
      return new Yarn2Generator(userConfigs, formatter, packager);
    }

    if (type === "flow") {
      return new FlowGenerator(userConfigs, formatter, packager);
    }

    throw new Error(`"${type}" generator not implemented.`);
  }
}
