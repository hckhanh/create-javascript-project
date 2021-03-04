import * as path from "path";
import * as configs from "../configs";
import { currentWorkingDir, removeFile, runCommand, writeContentToFile } from "../process";
import { InquirerConfigs } from "../types";
import { Action } from "./Action";

export class CreateYarn2ConfigsAction extends Action {
  constructor(private userConfigs: InquirerConfigs) {
    super();
  }

  async exec(): Promise<void> {
    // Lock Yarn 2 version
    await runCommand("yarn.cmd", ["set", "version", "berry"]);

    // Set nodeLinker mode to "node-modules"
    await writeContentToFile(
      path.join(currentWorkingDir, "./.yarnrc.yml"),
      "nodeLinker: node-modules",
    );

    // Add plugins
    await runCommand("yarn.cmd", ["plugin", "import", "typescript"]);
    await runCommand("yarn.cmd", ["plugin", "import", "interactive-tools"]);
    await runCommand("yarn.cmd", ["plugin", "import", "stage"]);
    await runCommand("yarn.cmd", ["plugin", "import", "version"]);

    // Remove old .yarnrc
    await removeFile(path.join(currentWorkingDir, "./.yarnrc"));

    // Configure .gitignore for yarn
    await writeContentToFile(
      path.join(currentWorkingDir, "./.gitignore"),
      this.userConfigs.zeroInstalls ? configs.zeroInstalls : configs.nonZeroInstalls,
    );

    // Install dependencies
    await runCommand("yarn.cmd");
  }
}
