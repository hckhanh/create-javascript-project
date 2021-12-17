export abstract class Formatter {
  abstract format(configs: Record<string, unknown>): string;

  abstract formatFileName(fileName: string): string;
}
