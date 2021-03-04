import * as configs from "../configs";
import { removeFile, runCommand, withCurrentDir, writeContentToFile } from "../process";
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
    await writeContentToFile(withCurrentDir("./.yarnrc.yml"), "nodeLinker: node-modules");

    // Add plugins
    await runCommand("yarn.cmd", ["plugin", "import", "typescript"]);
    await runCommand("yarn.cmd", ["plugin", "import", "interactive-tools"]);
    await runCommand("yarn.cmd", ["plugin", "import", "stage"]);
    await runCommand("yarn.cmd", ["plugin", "import", "version"]);

    // Remove old .yarnrc
    await removeFile(withCurrentDir("./.yarnrc"));

    // Configure .gitignore for yarn
    await writeContentToFile(
      withCurrentDir("./.gitignore"),
      this.userConfigs.zeroInstalls ? configs.zeroInstalls : configs.nonZeroInstalls,
    );

    // Install dependencies
    await runCommand("yarn.cmd");
  }
}
