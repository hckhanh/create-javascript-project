import { nonZeroInstalls, zeroInstalls } from "../configs";
import { removeFile, runCommand, withCurrentDir, writeContentToFile } from "../process";
import { InquirerConfigs } from "../types";
import { Action } from "./Action";

export class CreateYarn2ConfigsAction extends Action {
  constructor(private userConfigs: InquirerConfigs) {
    super();
  }

  async exec(): Promise<void> {
    // Lock Yarn 2 version
    await runCommand("yarn", ["set", "version", "berry"]);

    // Set nodeLinker mode to "node-modules"
    await writeContentToFile(withCurrentDir("./.yarnrc.yml"), "nodeLinker: node-modules");

    // Add plugins
    this.userConfigs.typescript && (await runCommand("yarn", ["plugin", "import", "typescript"]));
    await runCommand("yarn", ["plugin", "import", "interactive-tools"]);
    await runCommand("yarn", ["plugin", "import", "stage"]);
    await runCommand("yarn", ["plugin", "import", "version"]);

    // Remove old .yarnrc
    await removeFile(withCurrentDir("./.yarnrc"));

    // Configure .gitignore for yarn
    await writeContentToFile(
      withCurrentDir("./.gitignore"),
      this.userConfigs.zeroInstalls ? zeroInstalls : nonZeroInstalls,
    );

    // Install dependencies
    await runCommand("yarn");
  }
}
