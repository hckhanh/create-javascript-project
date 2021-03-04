import * as path from "path";
import { Formatter } from "../formatters/Formatter";
import { currentWorkingDir, writeContentToFile } from "../process";
import { Action } from "./Action";

export class CreateConfigsFileAction extends Action {
  constructor(private fileName: string, private configs: object, private formatter: Formatter) {
    super();
  }

  async exec() {
    const fileName = this.formatter.formatFileName(this.fileName);
    await writeContentToFile(
      path.join(currentWorkingDir, `./${fileName}`),
      this.formatter.format(this.configs),
    );
  }
}
