import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import * as fs from "fs/promises";
import { Stats } from "node:fs";
import * as path from "path";

export const currentDir = process.cwd();

export function withCurrentDir(...paths: string[]) {
  return path.join(currentDir, ...paths);
}

export function promisifyChildProcess(
  childProcess: ChildProcessWithoutNullStreams,
): Promise<number> {
  return new Promise((resolve, reject) => {
    let error: Error;
    const errorChunks: string[] = [];

    childProcess.once("error", (data) => {
      error = data;
    });

    childProcess.stderr.on("data", (data) => {
      errorChunks.push(data);
    });

    childProcess.once("close", (code) => {
      if (code === 0) {
        resolve(code);
      } else if (error) {
        reject(new Error(error.message));
      } else {
        reject(errorChunks.join("\n"));
      }
    });
  });
}

export function runCommand(command: string, args?: string[]): Promise<number> {
  const result = spawn(command, args);
  return promisifyChildProcess(result);
}

export async function getFileStats(file: string): Promise<Stats | undefined> {
  try {
    return await fs.stat(file);
  } catch {
    return undefined;
  }
}

export async function writeContentToFile(file: string, content: string, flag = "a+") {
  const stats = await getFileStats(file);

  if (stats) {
    if (stats.isDirectory()) {
      throw new Error(`Cannot write content to ${file}`);
    }

    await fs.writeFile(file, `\n${content.trim()}\n`, { flag });
  } else {
    await fs.writeFile(file, `${content.trim()}\n`, { flag });
  }
}

export async function readContentFromFile(file: string): Promise<string> {
  const buffer = await fs.readFile(file, { flag: "r" });
  return buffer.toString();
}

export async function removeFile(file: string) {
  await fs.rm(file, { force: true });
}

export function formatJson(obj: object): string {
  return JSON.stringify(obj, null, 2);
}
