import { Formatter } from "../formatters/Formatter";
import { GeneratorType, InquirerConfigs } from "../types";
import { ESLintGenerator } from "./ESLintGenerator";
import { Generator } from "./Generator";
import { PrettierGenerator } from "./PrettierGenerator";
import { Yarn2Generator } from "./Yarn2Generator";

export class GeneratorFactory {
  private static factory: GeneratorFactory = new GeneratorFactory();

  private constructor() {}

  public static getInstance() {
    return this.factory;
  }

  createGenerator(
    type: GeneratorType,
    cwd: string,
    userConfigs: InquirerConfigs,
    formatter: Formatter,
  ): Generator {
    if (type === "eslint") {
      return new ESLintGenerator(cwd, userConfigs, formatter);
    }

    if (type === "prettier") {
      return new PrettierGenerator(cwd, userConfigs, formatter);
    }

    if (type === "yarn2") {
      return new Yarn2Generator(cwd, userConfigs, formatter);
    }

    throw new Error("This generator type not implemented.");
  }
}
