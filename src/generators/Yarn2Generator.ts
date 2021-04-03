import { Action } from "../actions/Action";
import { CreateFileAction } from "../actions/CreateFileAction";
import { CreateYarn2ConfigsAction } from "../actions/CreateYarn2ConfigsAction";
import { ignoreYarn2 } from "../configs";
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
    return [
      new CreateYarn2ConfigsAction(userConfigs),
      new CreateFileAction(".eslintignore", ignoreYarn2, true),
      new CreateFileAction(".prettierignore", ignoreYarn2, true),
    ];
  }
}
