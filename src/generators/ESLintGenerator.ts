import { Action } from "../actions/Action";
import { AddDependenciesAction } from "../actions/AddDependenciesAction";
import { AddScriptsAction } from "../actions/AddScriptsAction";
import { CreateConfigsFileAction } from "../actions/CreateConfigsFileAction";
import { CreateIgnoreFileAction } from "../actions/CreateIgnoreFileAction";
import { eslintBaseConfigs } from "../configs";
import { Formatter } from "../formatters/Formatter";
import { Packager } from "../packagers/Packager";
import { InquirerConfigs } from "../types";
import { Generator } from "./Generator";

export class ESLintGenerator extends Generator {
  generateConfigs(userConfigs: InquirerConfigs): [object, string[]] {
    const configs: any = eslintBaseConfigs;
    const packages = [];

    if (userConfigs.environment.includes("browser")) {
      configs.env.browser = true;
    }

    if (userConfigs.environment.includes("node")) {
      configs.env.node = true;
    }

    if (userConfigs.module === "commonjs") {
      configs.env.commonjs = true;
    }

    if (userConfigs.module === "commonjs") {
      configs.env.commonjs = true;
    }

    if (userConfigs.framework === "react") {
      configs.extends.push("plugin:react/recommended");
      configs.parserOptions.ecmaFeatures = { jsx: true };
      configs.plugins.push("react");
      configs.rules = {
        ...configs.rules,
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
      };
      packages.push("eslint-plugin-react");
    }

    if (userConfigs.typescript) {
      configs.extends.push("plugin:@typescript-eslint/recommended");
      configs.parser = "@typescript-eslint/parser";
      configs.plugins.push("@typescript-eslint");
      packages.push("@typescript-eslint/eslint-plugin", "@typescript-eslint/parser");
    }

    if (userConfigs.module === "esm") {
      configs.parserOptions.sourceType = "module";
    }

    if (configs.extends.length === 1) {
      configs.extends = configs.extends.join("");
    }

    if (configs.plugins.length === 0) {
      delete configs.plugins;
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
      new CreateConfigsFileAction(".eslintrc", configs, formatter),
      new CreateIgnoreFileAction(".eslintignore"),
      new AddScriptsAction({ "check:eslint": "eslint ." }),
      new AddDependenciesAction(packages, packager),
    ];
  }
}
