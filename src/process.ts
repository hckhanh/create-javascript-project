import { ChildProcessWithoutNullStreams } from "child_process";
import { spawn } from "cross-spawn";
import { readFile, rm, stat, writeFile } from "fs/promises";
import { Stats } from "node:fs";
import { join } from "path";

export const currentDir = process.cwd();

export function withCurrentDir(...paths: string[]) {
  return join(currentDir, ...paths);
}

export function promisifyChildProcess(
  childProcess: ChildProcessWithoutNullStreams,
): Promise<number> {
  return new Promise((resolve, reject) => {
    const errorChunks: string[] = [];
    let lastOutput: string;

    childProcess.once("error", (error) => {
      reject(error);
    });

    childProcess.stdout.once("error", (error) => {
      reject(error);
    });

    childProcess.stderr.on("data", (data) => {
      errorChunks.push(data);
    });

    // Fix problem with stdout stream
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    childProcess.stdout.on("data", (data) => {
      lastOutput = data.toString();
    });

    childProcess.once("close", (code) => {
      if (code === 0) {
        resolve(code);
      } else if (errorChunks.length === 0) {
        reject(new Error(lastOutput));
      } else {
        reject(new Error(errorChunks.join("\n")));
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
    return await stat(file);
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

    await writeFile(file, `\n${content.trim()}\n`, { flag });
  } else {
    await writeFile(file, `${content.trim()}\n`, { flag });
  }
}

export async function readContentFromFile(file: string): Promise<string> {
  const buffer = await readFile(file, { flag: "r" });
  return buffer.toString();
}

export async function removeFile(file: string) {
  await rm(file, { force: true });
}

export function formatJson(obj: object): string {
  return JSON.stringify(obj, null, 2);
}
