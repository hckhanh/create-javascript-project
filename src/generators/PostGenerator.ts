import type { Action } from "../actions/Action";
import { CreateFileAction } from "../actions/CreateFileAction";
import { postIgnoreFiles } from "../configs";
import type { Formatter } from "../formatters/Formatter";
import type { Packager } from "../packagers/Packager";
import type { InquirerConfigs } from "../types";
import { Generator } from "./Generator";

export class PostGenerator extends Generator {
  generateConfigs(_userConfigs: InquirerConfigs): [Record<string, unknown>, string[]] {
    return [{}, []];
  }

  initActions(
    _configs: Record<string, unknown>,
    _packages: string[],
    _userConfigs: InquirerConfigs,
    _formatter: Formatter,
    _packager: Packager,
  ): Action[] {
    return [new CreateFileAction(".gitignore", postIgnoreFiles)];
  }
}
