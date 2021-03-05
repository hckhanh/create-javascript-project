export abstract class Action {
  abstract exec(): Promise<void>;
}
