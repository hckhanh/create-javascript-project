import { Action } from "../actions/Action";
import { Formatter } from "../formatters/Formatter";
import { Packager } from "../packagers/Packager";
import { InquirerConfigs } from "../types";

export abstract class Generator {
  actions: Action[];

  constructor(userConfigs: InquirerConfigs, formatter: Formatter, packager: Packager) {
    const [configs, packages] = this.generateConfigs(userConfigs);
    this.actions = this.initActions(configs, packages, userConfigs, formatter, packager);
  }

  abstract generateConfigs(userConfigs: InquirerConfigs): [object | string, string[]];

  abstract initActions(
    configs: object | string,
    packages: string[],
    userConfigs: InquirerConfigs,
    formatter: Formatter,
    packager: Packager,
  ): Action[];

  async run() {
    for (const action of this.actions) {
      await action.exec();
    }
  }
}
