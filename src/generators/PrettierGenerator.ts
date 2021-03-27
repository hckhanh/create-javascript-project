import { Action } from "../actions/Action";
import { AddDependenciesAction } from "../actions/AddDependenciesAction";
import { AddScriptsAction } from "../actions/AddScriptsAction";
import { CreateConfigsFileAction } from "../actions/CreateConfigsFileAction";
import { CreateIgnoreFileAction } from "../actions/CreateIgnoreFileAction";
import { prettierConfigs } from "../configs";
import { Formatter } from "../formatters/Formatter";
import { Packager } from "../packagers/Packager";
import { InquirerConfigs } from "../types";
import { Generator } from "./Generator";

export class PrettierGenerator extends Generator {
  generateConfigs(userConfigs: InquirerConfigs): [object, string[]] {
    return [prettierConfigs, ["prettier"]];
  }

  initActions(
    configs: object,
    packages: string[],
    userConfigs: InquirerConfigs,
    formatter: Formatter,
    packager: Packager,
  ): Action[] {
    return [
      new CreateConfigsFileAction(".prettierrc", configs, formatter),
      new CreateIgnoreFileAction(".prettierignore"),
      new AddScriptsAction(
        { format: "prettier --write .", "check:prettier": "prettier --check ." },
        userConfigs.scripts,
      ),
      new AddDependenciesAction(packages, packager),
    ];
  }
}
