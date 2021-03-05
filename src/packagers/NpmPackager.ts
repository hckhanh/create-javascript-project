import { runCommand } from "../process";
import { Packager } from "./Packager";

export class NpmPackager extends Packager {
  installDependencies(packages: string[]): Promise<number> {
    return runCommand("npm", ["install", "--save-dev", ...packages]);
  }
}
