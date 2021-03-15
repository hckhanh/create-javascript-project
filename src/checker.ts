import { getFileStats, withCurrentDir } from "./process";

export async function checkPackageJson() {
  const stats = await getFileStats(withCurrentDir("package.json"));
  if (!stats) {
    throw new Error("package.json is not found. Must be run in existing project directory.");
  }
}
