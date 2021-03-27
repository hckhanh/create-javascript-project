import { withCurrentDir, writeContentToFile } from "../process";
import { Action } from "./Action";

export class CreateFileAction extends Action {
  constructor(private fileName: string, private content: string) {
    super();
  }

  async exec(): Promise<void> {
    await writeContentToFile(withCurrentDir(this.fileName), this.content);
  }
}
