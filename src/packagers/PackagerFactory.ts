import { detectYarnVersion } from "../checker";
import type { PackagerType } from "../types";
import { NpmPackager } from "./NpmPackager";
import type { Packager } from "./Packager";
import { Yarn2Packager } from "./Yarn2Packager";
import { YarnPackager } from "./YarnPackager";

export class PackagerFactory {
  private static factory: PackagerFactory = new PackagerFactory();

  // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance() {
    return this.factory;
  }

  async createPackager(type: PackagerType): Promise<Packager> {
    if (type === "yarn") {
      const yarnVersion = await detectYarnVersion();

      if (yarnVersion === "yarn2") {
        return new Yarn2Packager();
      }

      return new YarnPackager();
    }

    if (type === "npm") {
      return new NpmPackager();
    }

    throw new Error(`"${type}" packager not implemented.`);
  }
}
