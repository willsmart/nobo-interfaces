export interface DelayedCaller_forTheWorld {
  enqueue(name: string, cleanupCallback: () => Promise<void>): void;
  cancel(_name: string): void;
  startTicking(): void;
}
