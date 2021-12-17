import type { Action } from "../actions/Action";
import type { Formatter } from "../formatters/Formatter";
import type { Packager } from "../packagers/Packager";
import type { InquirerConfigs } from "../types";

export abstract class Generator {
  actions: Action[];

  constructor(userConfigs: InquirerConfigs, formatter: Formatter, packager: Packager) {
    const [configs, packages] = this.generateConfigs(userConfigs);
    this.actions = this.initActions(configs, packages, userConfigs, formatter, packager);
  }

  abstract generateConfigs(userConfigs: InquirerConfigs): [Record<string, unknown>, string[]];

  abstract initActions(
    configs: Record<string, unknown>,
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
