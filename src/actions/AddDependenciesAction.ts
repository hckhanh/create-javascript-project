import { runCommand } from "../process";
import { Action } from "./Action";

export class AddDependenciesAction extends Action {
  constructor(private packages: string[]) {
    super();
  }

  async exec(): Promise<void> {
    await runCommand("yarn.cmd", ["add", "--dev", ...this.packages]);
  }
}
