import { Formatter } from "../formatters/Formatter";
import { withCurrentDir, writeContentToFile } from "../process";
import { Action } from "./Action";

export class CreateConfigsFileAction extends Action {
  constructor(
    private fileName: string,
    private configs: object | string,
    private formatter: Formatter,
  ) {
    super();
  }

  async exec() {
    if (typeof this.configs === "object") {
      const fileName = this.formatter.formatFileName(this.fileName);
      await writeContentToFile(
        withCurrentDir(`./${fileName}`),
        this.formatter.format(this.configs),
      );
    } else {
      await writeContentToFile(withCurrentDir(`./${this.fileName}`), this.configs);
    }
  }
}
