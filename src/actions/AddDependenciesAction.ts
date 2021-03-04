import { runCommand } from "../process";
import { Action } from "./Action";

export class AddDependenciesAction extends Action {
  constructor(cwd: string, private packages: string[]) {
    super(cwd);
  }

  async exec(): Promise<void> {
    await runCommand("yarn.cmd", ["add", "--dev", ...this.packages]);
  }
}
