import { prompt } from "inquirer";
import type { GeneratorType, InquirerConfigs } from "./types";

export async function collectAnswers(): Promise<InquirerConfigs> {
  const answers = await prompt<InquirerConfigs>([
    {
      type: "checkbox",
      name: "configurations",
      message: "Which configurations do you want to use?",
      choices: [
        { name: "ESLint", value: "eslint" },
        { name: "Prettier", value: "prettier" },
        { name: "Flow", value: "flow" },
        { name: "Yarn 2 (Berry)", value: "yarn2" },
        { name: "Post-script", value: "post" },
      ],
      default: ["eslint", "prettier", "yarn2", "post"],
      validate: (input: GeneratorType[]) => {
        return input.length === 0 ? "At least one configuration need to be selected" : true;
      },
    },
    {
      type: "list",
      name: "format",
      message: "What format do you want your configurations to be in?",
      choices: [
        { name: "JSON", value: "json" },
        { name: "JavaScript", value: "js" },
        { name: "YAML", value: "yml" },
      ],
    },
    {
      type: "confirm",
      name: "zeroInstalls",
      message: "Does your project use Zero-Installs (Yarn 2)?",
      when: (answers) => answers.configurations.includes("yarn2"),
    },
    {
      type: "input",
      name: "defaultBranch",
      message: "What is default branch (git) of this project?",
      when: (answers) => answers.configurations.includes("yarn2"),
      default: "master",
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
      type: "confirm",
      name: "typescript",
      message: "Does your project use TypeScript?",
      when: (answers) => !answers.configurations.includes("flow"),
    },
    {
      type: "list",
      name: "module",
      message: "What type of module does your project use?",
      choices: [
        { name: "JavaScript modules (import/export)", value: "esm" },
        { name: "CommonJS (require/exports)", value: "commonjs" },
      ],
      when: (answers) =>
        !answers.configurations.includes("flow") &&
        !answers.typescript &&
        answers.framework === "none",
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
      message: "Do want to add commands (scripts) of above configurations to package.json?",
    },
    {
      type: "list",
      name: "packager",
      message: "Which package manager does your project use?",
      choices: [
        { name: "Yarn", value: "yarn" },
        { name: "NPM", value: "npm" },
      ],
      default: "yarn",
      when: (answers) => !answers.configurations.includes("yarn2"),
    },
  ]);

  return answers;
}
