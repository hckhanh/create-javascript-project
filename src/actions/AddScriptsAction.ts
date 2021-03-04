import { readContentFromFile, withCurrentDir, writeContentToFile } from "../process";
import { Action } from "./Action";

export class AddScriptsAction extends Action {
  constructor(private scripts: object) {
    super();
  }

  async exec(): Promise<void> {
    const packageJsonPath = withCurrentDir("package.json");
    const packageJson = await readContentFromFile(packageJsonPath);
    const packageJsonObj = JSON.parse(packageJson);
    packageJsonObj.scripts = { ...packageJsonObj.scripts, ...this.scripts };
    await writeContentToFile(packageJsonPath, JSON.stringify(packageJsonObj, null, 2), "w");
  }
}
