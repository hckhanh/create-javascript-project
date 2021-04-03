import { getFileStats, withCurrentDir, writeContentToFile } from "../process";
import { Action } from "./Action";

export class CreateFileAction extends Action {
  constructor(private fileName: string, private content: string, private tryUpdateOnly = false) {
    super();
  }

  async exec(): Promise<void> {
    const filePath = withCurrentDir(this.fileName);

    if (this.tryUpdateOnly) {
      const stats = await getFileStats(filePath);
      stats && stats.isFile() && (await writeContentToFile(filePath, this.content, "a"));
    } else {
      await writeContentToFile(filePath, this.content);
    }
  }
}
