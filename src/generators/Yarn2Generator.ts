import type { Action } from "../actions/Action";
import { CreateFileAction } from "../actions/CreateFileAction";
import { CreateYarn2ConfigsAction } from "../actions/CreateYarn2ConfigsAction";
import { ignoreYarn2 } from "../configs";
import type { Formatter } from "../formatters/Formatter";
import type { InquirerConfigs } from "../types";
import { Generator } from "./Generator";

export class Yarn2Generator extends Generator {
  generateConfigs(_userConfigs: InquirerConfigs): [Record<string, unknown>, string[]] {
    return [{}, []];
  }

  initActions(
    _configs: Record<string, unknown>,
    _packages: string[],
    userConfigs: InquirerConfigs,
    _formatter: Formatter,
  ): Action[] {
    return [
      new CreateYarn2ConfigsAction(userConfigs),
      new CreateFileAction(".eslintignore", ignoreYarn2, true),
      new CreateFileAction(".prettierignore", ignoreYarn2, true),
    ];
  }
}
