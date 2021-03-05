export abstract class Packager {
  abstract installDependencies(packages: string[]): Promise<number>;
}
