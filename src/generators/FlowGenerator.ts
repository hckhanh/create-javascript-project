import { Action } from "../actions/Action";
import { AddDependenciesAction } from "../actions/AddDependenciesAction";
import { AddScriptsAction } from "../actions/AddScriptsAction";
import { CreateConfigsFileAction } from "../actions/CreateConfigsFileAction";
import { flowConfigs } from "../configs";
import { Formatter } from "../formatters/Formatter";
import { Packager } from "../packagers/Packager";
import { InquirerConfigs } from "../types";
import { Generator } from "./Generator";

export class FlowGenerator extends Generator {
  generateConfigs(userConfigs: InquirerConfigs): [object | string, string[]] {
    return [flowConfigs, ["flow-bin"]];
  }

  initActions(
    configs: string,
    packages: string[],
    userConfigs: InquirerConfigs,
    formatter: Formatter,
    packager: Packager,
  ): Action[] {
    return [
      new CreateConfigsFileAction(".flowconfig", configs, formatter),
      new AddScriptsAction({ "check:flow": "flow" }, userConfigs.scripts),
      new AddDependenciesAction(packages, packager),
    ];
  }
}
