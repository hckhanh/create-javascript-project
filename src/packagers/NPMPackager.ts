import { runCommand } from "../process";
import { Packager } from "./Packager";

export class NPMPackager extends Packager {
  installDependencies(packages: string[]): Promise<number> {
    return runCommand("npm.cmd", ["install", "--save-dev", ...packages]);
  }
}
