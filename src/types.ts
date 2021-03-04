export type Yarn2Configs = { zeroInstalls?: boolean };

export type Framework = "react" | "none";

export type Module = "esm" | "commonjs";

export type Environment = "browser" | "node";

export type ConfigsFileFormat = "js" | "json" | "yml";

export type GeneratorType = "yarn2" | "eslint" | "prettier";

export type ESLintConfigs = {
  framework: Framework;
  module: Module;
  typescript?: boolean;
  environment: Environment[];
};

export type InquirerConfigs = {
  configurations: GeneratorType[];
  format: ConfigsFileFormat;
  scripts: boolean;
} & Yarn2Configs &
  ESLintConfigs;
