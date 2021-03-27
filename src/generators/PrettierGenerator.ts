import { Action } from "../actions/Action";
import { AddDependenciesAction } from "../actions/AddDependenciesAction";
import { AddScriptsAction } from "../actions/AddScriptsAction";
import { CreateConfigsFileAction } from "../actions/CreateConfigsFileAction";
import { CreateFileAction } from "../actions/CreateFileAction";
import { ignoreFiles, prettierConfigs, prettierGitAttributeConfigs } from "../configs";
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
      new CreateFileAction(".gitattributes", prettierGitAttributeConfigs),
      new CreateFileAction(".prettierignore", ignoreFiles),
      new AddScriptsAction(
        { format: "prettier --write .", "check:prettier": "prettier --check ." },
        userConfigs.scripts,
      ),
      new AddDependenciesAction(packages, packager),
    ];
  }
}
