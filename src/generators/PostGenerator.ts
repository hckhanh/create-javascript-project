import { Action } from "../actions/Action";
import { CreateIgnoreFileAction } from "../actions/CreateIgnoreFileAction";
import { postIgnoreFiles } from "../configs";
import { Formatter } from "../formatters/Formatter";
import { Packager } from "../packagers/Packager";
import { InquirerConfigs } from "../types";
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
    return [new CreateIgnoreFileAction(".gitignore", postIgnoreFiles)];
  }
}
