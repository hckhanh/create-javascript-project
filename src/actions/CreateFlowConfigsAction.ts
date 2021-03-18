import { runCommand } from "../process";
import { Action } from "./Action";

export class CreateFlowConfigsAction extends Action {
  async exec(): Promise<void> {
    // Fetch all types
    await runCommand("yarn", ["flow-typed", "install"]);
  }
}
