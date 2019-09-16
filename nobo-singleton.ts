// TODO document

export interface DelayedCaller_publicInterface {
  enqueue(name: string, cleanupCallback: () => Promise<void>): void;
  cancel(_name: string): void;
  startTicking(): void;
}

export interface NoboSingleton_publicInterface {
  createDelayedCaller: ({ delayMs, sliceMs }: { delayMs: number; sliceMs: number }) => DelayedCaller_publicInterface;
  mapValues: <T extends { [k: string]: I; [Symbol.iterator]: any }, I, O>(
    object: T,
    fn: (i: I) => O
  ) => { [k: string]: O };
}

export declare var noboSingleton: NoboSingleton_publicInterface;
