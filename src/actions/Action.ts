export abstract class Action {
  constructor(protected cwd: string) {}

  abstract exec(): Promise<void>;
}
