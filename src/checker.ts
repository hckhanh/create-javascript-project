import * as fs from "fs/promises";
import * as path from "path";

function checkPackageJson() {}

function checkExistFile(files: string[], regex: RegExp) {
  return files.find((value) => regex.test(value));
}

const yarn2Regex = /.yarn|.yarnrc.yml/;
const eslintRegex = /\.eslintrc\.?/;
const prettierRegex = /\.prettierrc\.?/;

function checkExistConfigurations() {}
