import { PackagerType } from "../types";
import { NpmPackager } from "./NpmPackager";
import { Packager } from "./Packager";
import { YarnPackager } from "./YarnPackager";

export class PackagerFactory {
  private static factory: PackagerFactory = new PackagerFactory();

  // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance() {
    return this.factory;
  }

  createPackager(type: PackagerType): Packager {
    if (type === "yarn") {
      return new YarnPackager();
    }

    if (type === "npm") {
      return new NpmPackager();
    }

    throw new Error(`"${type}" packager not implemented.`);
  }
}
