import { Action } from "../actions/Action";
import { CreateYarn2ConfigsAction } from "../actions/CreateYarn2ConfigsAction";
import { Formatter } from "../formatters/Formatter";
import { InquirerConfigs } from "../types";
import { Generator } from "./Generator";

export class Yarn2Generator extends Generator {
  generateConfigs(userConfigs: InquirerConfigs): [object, string[]] {
    return [{}, []];
  }

  initActions(
    configs: object,
    packages: string[],
    userConfigs: InquirerConfigs,
    formatter: Formatter,
  ): Action[] {
    return [new CreateYarn2ConfigsAction(this.cwd, userConfigs)];
  }
}
