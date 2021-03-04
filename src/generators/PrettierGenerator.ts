import { Action } from "../actions/Action";
import { AddDependenciesAction } from "../actions/AddDependenciesAction";
import { AddScriptsAction } from "../actions/AddScriptsAction";
import { CreateConfigsFileAction } from "../actions/CreateConfigsFileAction";
import { CreateIgnoreFileAction } from "../actions/CreateIgnoreFileAction";
import { Formatter } from "../formatters/Formatter";
import { currentWorkingDir } from "../process";
import { InquirerConfigs } from "../types";
import { Generator } from "./Generator";

export class PrettierGenerator extends Generator {
  generateConfigs(userConfigs: InquirerConfigs): [object, string[]] {
    return [
      {
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        trailingComma: "all",
      },
      ["prettier"],
    ];
  }

  initActions(
    configs: object,
    packages: string[],
    userConfigs: InquirerConfigs,
    formatter: Formatter,
  ): Action[] {
    return [
      new CreateConfigsFileAction(".prettierrc", configs, formatter),
      new CreateIgnoreFileAction(".prettierignore"),
      new AddScriptsAction({
        format: "prettier --write .",
        "check:prettier": "prettier --check .",
      }),
      new AddDependenciesAction(packages),
    ];
  }
}
