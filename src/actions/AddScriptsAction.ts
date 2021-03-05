import { formatJson, readContentFromFile, withCurrentDir, writeContentToFile } from "../process";
import { Action } from "./Action";

export class AddScriptsAction extends Action {
  constructor(private scripts: object, private enable: boolean) {
    super();
  }

  async exec(): Promise<void> {
    if (!this.enable) {
      return;
    }

    const packageJsonPath = withCurrentDir("package.json");
    const packageJson = await readContentFromFile(packageJsonPath);
    const packageJsonObj = JSON.parse(packageJson);
    packageJsonObj.scripts = { ...packageJsonObj.scripts, ...this.scripts };
    await writeContentToFile(packageJsonPath, formatJson(packageJsonObj), "w");
  }
}
