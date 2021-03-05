import { runCommand } from "../process";
import { Packager } from "./Packager";

export class YarnPackager extends Packager {
  installDependencies(packages: string[]): Promise<number> {
    return runCommand("yarn", ["add", "--dev", ...packages]);
  }
}
