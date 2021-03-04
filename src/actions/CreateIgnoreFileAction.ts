import * as path from "path";
import { ignoreFiles } from "../configs";
import { writeContentToFile } from "../process";
import { Action } from "./Action";

export class CreateIgnoreFileAction extends Action {
  constructor(cwd: string, private fileName: string) {
    super(cwd);
  }

  async exec(): Promise<void> {
    await writeContentToFile(path.join(this.cwd, this.fileName), ignoreFiles);
  }
}
