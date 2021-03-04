import * as path from "path";
import { readContentFromFile, writeContentToFile } from "../process";
import { Action } from "./Action";

export class AddScriptsAction extends Action {
  constructor(cwd: string, private scripts: object) {
    super(cwd);
  }

  async exec(): Promise<void> {
    const packageJsonPath = path.join(this.cwd, "package.json");
    const packageJson = await readContentFromFile(packageJsonPath);
    const packageJsonObj = JSON.parse(packageJson);
    packageJsonObj.scripts = { ...packageJsonObj.scripts, ...this.scripts };
    await writeContentToFile(packageJsonPath, JSON.stringify(packageJsonObj, null, 2), "w");
  }
}
