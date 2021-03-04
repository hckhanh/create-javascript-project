import * as path from "path";
import { Formatter } from "../formatters/Formatter";
import { writeContentToFile } from "../process";
import { Action } from "./Action";

export class CreateConfigsFileAction extends Action {
  constructor(
    cwd: string,
    private fileName: string,
    private configs: object,
    private formatter: Formatter,
  ) {
    super(cwd);
  }

  async exec() {
    const fileName = this.formatter.formatFileName(this.fileName);
    await writeContentToFile(
      path.join(this.cwd, `./${fileName}`),
      this.formatter.format(this.configs),
    );
  }
}
