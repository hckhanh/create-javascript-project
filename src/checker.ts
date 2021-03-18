import { getFileStats, readCurrentDir, withCurrentDir } from "./process";

export async function checkPackageJson() {
  const stats = await getFileStats(withCurrentDir("package.json"));
  if (!stats) {
    throw new Error("package.json is not found. Must be run in existing project directory.");
  }
}

export async function detectYarnVersion(): Promise<"yarn" | "yarn2"> {
  const dirents = await readCurrentDir();
  const yarnConfigs = dirents.find((dirent) => dirent.name === ".yarn");
  return yarnConfigs && yarnConfigs.isDirectory() ? "yarn2" : "yarn";
}
