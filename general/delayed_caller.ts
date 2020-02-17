export interface DelayedCaller_publicInterface {
  enqueue(name: string, cleanupCallback: () => Promise<void>): void;
  cancel(_name: string): void;
  startTicking(): void;
}
