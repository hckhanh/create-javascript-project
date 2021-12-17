import type { Action } from "../actions/Action";
import { CreateFileAction } from "../actions/CreateFileAction";
import { postIgnoreFiles } from "../configs";
import type { Formatter } from "../formatters/Formatter";
import type { Packager } from "../packagers/Packager";
import type { InquirerConfigs } from "../types";
import { Generator } from "./Generator";

export class PostGenerator extends Generator {
  generateConfigs(userConfigs: InquirerConfigs): [object, string[]] {
    return [{}, []];
  }

  initActions(
    configs: object,
    packages: string[],
    userConfigs: InquirerConfigs,
    formatter: Formatter,
    packager: Packager,
  ): Action[] {
    return [new CreateFileAction(".gitignore", postIgnoreFiles)];
  }
}
