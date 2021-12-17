import type { Action } from "../actions/Action";
import { AddDependenciesAction } from "../actions/AddDependenciesAction";
import { AddScriptsAction } from "../actions/AddScriptsAction";
import { CreateConfigsFileAction } from "../actions/CreateConfigsFileAction";
import { CreateFileAction } from "../actions/CreateFileAction";
import { eslintBaseConfigs, ignoreFiles } from "../configs";
import type { Formatter } from "../formatters/Formatter";
import type { Packager } from "../packagers/Packager";
import type { InquirerConfigs } from "../types";
import { Generator } from "./Generator";

export class ESLintGenerator extends Generator {
  generateConfigs(userConfigs: InquirerConfigs): [object, string[]] {
    const configs: any = eslintBaseConfigs;
    const packages = ["eslint"];

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
      configs.rules = {
        ...configs.rules,
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
      };
      packages.push("eslint-plugin-react");
    }

    if (userConfigs.configurations.includes("flow")) {
      configs.extends.push("plugin:flowtype/recommended");
      configs.rules = {
        ...configs.rules,
        "flowtype/no-types-missing-file-annotation": "off",
      };
      packages.push("babel-eslint", "eslint-plugin-flowtype");
    } else if (userConfigs.typescript) {
      configs.extends.push("plugin:@typescript-eslint/recommended");
      configs.parser = "@typescript-eslint/parser";
      packages.push("typescript", "@typescript-eslint/eslint-plugin", "@typescript-eslint/parser");
    }

    if (userConfigs.module === "esm") {
      configs.parserOptions.sourceType = "module";
    }

    if (configs.extends.length === 1) {
      configs.extends = configs.extends.join("");
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
      new CreateFileAction(".eslintignore", ignoreFiles),
      new AddScriptsAction({ "check:eslint": "eslint ." }, userConfigs.scripts),
      new AddDependenciesAction(packages, packager),
    ];
  }
}
