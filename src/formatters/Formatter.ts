export abstract class Formatter {
  abstract format(configs: object): string;

  abstract formatFileName(fileName: string): string;
}
