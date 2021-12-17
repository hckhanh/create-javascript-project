import type { Packager } from "../packagers/Packager";
import { Action } from "./Action";

export class AddDependenciesAction extends Action {
  constructor(private packages: string[], private packager: Packager) {
    super();
  }

  async exec(): Promise<void> {
    await this.packager.installDependencies(this.packages);
  }
}
