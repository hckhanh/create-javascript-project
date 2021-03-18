export type Yarn2Configs = { zeroInstalls?: boolean };

export type Framework = "react" | "none";

export type Module = "esm" | "commonjs";

export type Environment = "browser" | "node";

export type ConfigsFileFormat = "js" | "json" | "yml";

export type GeneratorType = "yarn2" | "eslint" | "prettier" | "flow" | "post";

export type PackagerType = "yarn" | "npm";

export type ESLintConfigs = {
  framework: Framework;
  module: Module;
  typescript?: boolean;
  environment: Environment[];
};

export type InquirerConfigs = {
  configurations: GeneratorType[];
  format: ConfigsFileFormat;
  packager: PackagerType;
  scripts: boolean;
} & Yarn2Configs &
  ESLintConfigs;
