import { runCommand } from "../process";
import { Packager } from "./Packager";

export class Yarn2Packager extends Packager {
  installDependencies(packages: string[]): Promise<number> {
    return runCommand("yarn", ["add", "--prefer-dev", ...packages]);
  }
}
