export abstract class Action {
  constructor() {}

  abstract exec(): Promise<void>;
}
