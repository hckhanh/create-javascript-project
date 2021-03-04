import { prompt } from "inquirer";
import { GeneratorType, InquirerConfigs, Module } from "./types";

export async function collectAnswers(): Promise<InquirerConfigs> {
  return prompt<InquirerConfigs>([
    {
      type: "checkbox",
      name: "configurations",
      message: "Which configurations do you want to use?",
      choices: [
        { name: "Yarn 2 (Berry)", value: "yarn2" },
        { name: "ESLint", value: "eslint" },
        { name: "Prettier", value: "prettier" },
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
      validate: (input: Module, answers) => {
        return input === "commonjs" && answers?.framework === "react"
          ? "You cannot use React with commonjs"
          : true;
      },
    },
    {
      type: "confirm",
      name: "typescript",
      message: "Does your project use TypeScript?",
      when: (answers) => answers.module !== "commonjs",
      default: (answers: InquirerConfigs) => answers.framework === "react",
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
        if (answers.framework === "react") {
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
      message: "Do want to add test scripts to package.json?",
    },
  ]);
}
