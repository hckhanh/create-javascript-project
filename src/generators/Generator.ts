import { Action } from "../actions/Action";
import { Formatter } from "../formatters/Formatter";
import { InquirerConfigs } from "../types";

export abstract class Generator {
  actions: Action[];

  constructor(userConfigs: InquirerConfigs, formatter: Formatter) {
    const [configs, packages] = this.generateConfigs(userConfigs);
    this.actions = this.initActions(configs, packages, userConfigs, formatter);
  }

  abstract generateConfigs(userConfigs: InquirerConfigs): [object, string[]];

  abstract initActions(
    configs: object,
    packages: string[],
    userConfigs: InquirerConfigs,
    formatter: Formatter,
  ): Action[];

  async run() {
    for (const action of this.actions) {
      await action.exec();
    }
  }
}
