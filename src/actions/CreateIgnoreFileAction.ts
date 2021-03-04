import * as path from "path";
import { ignoreFiles } from "../configs";
import { currentWorkingDir, writeContentToFile } from "../process";
import { Action } from "./Action";

export class CreateIgnoreFileAction extends Action {
  constructor(private fileName: string) {
    super();
  }

  async exec(): Promise<void> {
    await writeContentToFile(path.join(currentWorkingDir, this.fileName), ignoreFiles);
  }
}
