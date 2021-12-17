import type { Action } from "../actions/Action";
import { AddDependenciesAction } from "../actions/AddDependenciesAction";
import { AddScriptsAction } from "../actions/AddScriptsAction";
import { CreateConfigsFileAction } from "../actions/CreateConfigsFileAction";
import { CreateFileAction } from "../actions/CreateFileAction";
import { ignoreFiles, prettierConfigs, prettierGitAttributeConfigs } from "../configs";
import type { Formatter } from "../formatters/Formatter";
import type { Packager } from "../packagers/Packager";
import type { InquirerConfigs } from "../types";
import { Generator } from "./Generator";

export class PrettierGenerator extends Generator {
  generateConfigs(_userConfigs: InquirerConfigs): [Record<string, unknown>, string[]] {
    return [prettierConfigs, ["prettier"]];
  }

  initActions(
    configs: Record<string, unknown>,
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
