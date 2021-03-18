import { ignoreFiles } from "../configs";
import { withCurrentDir, writeContentToFile } from "../process";
import { Action } from "./Action";

export class CreateIgnoreFileAction extends Action {
  constructor(private fileName: string, private content = ignoreFiles) {
    super();
  }

  async exec(): Promise<void> {
    await writeContentToFile(withCurrentDir(this.fileName), this.content);
  }
}
