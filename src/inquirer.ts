import { prompt } from "inquirer";
import { GeneratorType, InquirerConfigs } from "./types";

export async function collectAnswers(): Promise<InquirerConfigs> {
  const answers = await prompt<InquirerConfigs>([
    {
      type: "checkbox",
      name: "configurations",
      message: "Which configurations do you want to use?",
      choices: [
        { name: "Yarn 2 (Berry)", value: "yarn2" },
        { name: "ESLint", value: "eslint" },
        { name: "Prettier", value: "prettier" },
        { name: "Flow", value: "flow" },
      ],
      default: ["yarn2", "eslint", "prettier"],
      validate: (input: GeneratorType[]) => {
        return input.length === 0 ? "At least one configuration need to be selected" : true;
      },
    },
    {
      type: "list",
      name: "format",
      message: "What format do you want your configurations to be in?",
      choices: [
        { name: "JavaScript", value: "js" },
        { name: "JSON", value: "json" },
        { name: "YAML", value: "yml" },
      ],
    },
    {
      type: "confirm",
      name: "zeroInstalls",
      message: "Does your project use Zero-Installs (Yarn 2)?",
      when: (answers) => answers.configurations.includes("yarn2"),
      default: false,
    },
    {
      type: "list",
      name: "framework",
      message: "Which framework does your project use?",
      choices: [
        { name: "React", value: "react" },
        { name: "None", value: "none" },
      ],
    },
    {
      type: "list",
      name: "module",
      message: "What type of modules does your project use?",
      choices: [
        { name: "JavaScript modules (import/export)", value: "esm" },
        { name: "CommonJS (require/exports)", value: "commonjs" },
      ],
      when: (answers) => !answers.configurations.includes("flow") && answers.framework === "none",
    },
    {
      type: "confirm",
      name: "typescript",
      message: "Does your project use TypeScript?",
      when: (answers) => !answers.configurations.includes("flow") && answers.module !== "commonjs",
      default: (answers: InquirerConfigs) => answers.framework !== "none",
    },
    {
      type: "checkbox",
      name: "environment",
      message: "Where does your code run?",
      choices: [
        { name: "Browser", value: "browser" },
        { name: "Node", value: "node" },
      ],
      default: (answers: InquirerConfigs) => {
        if (answers.framework !== "none") {
          return ["browser"];
        }

        if (answers.module === "commonjs") {
          return ["node"];
        }
      },
    },
    {
      type: "confirm",
      name: "scripts",
      message: "Do want to add commands (scripts) of configurations to package.json?",
    },
    {
      type: "list",
      name: "packager",
      message: "Which package manager does your project use?",
      choices: [
        { name: "Yarn", value: "yarn" },
        { name: "NPM", value: "npm" },
      ],
      when: (answers) => !answers.configurations.includes("yarn2"),
    },
  ]);

  if (answers.configurations.includes("yarn2")) {
    answers.packager = "yarn";
  }

  return answers;
}
