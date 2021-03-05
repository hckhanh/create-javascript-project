import { PackagerType } from "../types";
import { NPMPackager } from "./NPMPackager";
import { Packager } from "./Packager";
import { YarnPackager } from "./YarnPackager";

export class PackagerFactory {
  private static factory: PackagerFactory = new PackagerFactory();

  private constructor() {}

  public static getInstance() {
    return this.factory;
  }

  createPackager(type: PackagerType): Packager {
    if (type === "yarn") {
      return new YarnPackager();
    }

    if (type === "npm") {
      return new NPMPackager();
    }

    throw new Error(`"${type}" packager not implemented.`);
  }
}
