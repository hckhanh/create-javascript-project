import { InquirerConfigs } from "../types";
import { NpmPackager } from "./NpmPackager";
import { Packager } from "./Packager";
import { Yarn2Packager } from "./Yarn2Packager";
import { YarnPackager } from "./YarnPackager";

export class PackagerFactory {
  private static factory: PackagerFactory = new PackagerFactory();

  // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance() {
    return this.factory;
  }

  createPackager(configs: InquirerConfigs): Packager {
    if (configs.configurations.includes("yarn2")) {
      return new Yarn2Packager();
    }

    if (configs.packager === "yarn") {
      return new YarnPackager();
    }

    if (configs.packager === "npm") {
      return new NpmPackager();
    }

    throw new Error(`"${configs.packager}" packager not implemented.`);
  }
}
