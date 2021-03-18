import { Action } from "../actions/Action";
import { AddDependenciesAction } from "../actions/AddDependenciesAction";
import { AddScriptsAction } from "../actions/AddScriptsAction";
import { CreateConfigsFileAction } from "../actions/CreateConfigsFileAction";
import { CreateFlowConfigsAction } from "../actions/CreateFlowConfigsAction";
import { flowConfigs } from "../configs";
import { Formatter } from "../formatters/Formatter";
import { IniFormatter } from "../formatters/IniFormatter";
import { Packager } from "../packagers/Packager";
import { InquirerConfigs } from "../types";
import { Generator } from "./Generator";

export class FlowGenerator extends Generator {
  generateConfigs(userConfigs: InquirerConfigs): [object, string[]] {
    const configs: any = { ...flowConfigs };
    const packages = ["flow-bin", "flow-typed"];

    if (userConfigs.framework === "react") {
      packages.push("@babel/plugin-transform-react-jsx");
      configs.options["react.runtime"] = "automatic";
    }

    return [configs, packages];
  }

  initActions(
    configs: object,
    packages: string[],
    userConfigs: InquirerConfigs,
    formatter: Formatter,
    packager: Packager,
  ): Action[] {
    return [
      new CreateConfigsFileAction(".flowconfig", configs, new IniFormatter()),
      new AddScriptsAction({ "check:flow": "flow" }, userConfigs.scripts),
      new AddDependenciesAction(packages, packager),
      new CreateFlowConfigsAction(),
    ];
  }
}
