import { runCommand } from "../process";
import { Packager } from "./Packager";

export class NPMPackager extends Packager {
  installDependencies(packages: string[]): Promise<number> {
    return runCommand("npm", ["install", "--save-dev", ...packages]);
  }
}
