import { anyValue } from "./any";
import { SourceGenerator, ValueSourceRegistry_publicInterface } from "./sinks-and-sources";
import ValueSourceCleaningPolicy_publicInterface from "./source-cleaning-policies";
import { HandlePromise, PromiseHandlerOwner_promiseHandlerInterface } from "./promise-handler";

// TODO document

export interface DelayedCaller_publicInterface {
  enqueue(name: string, cleanupCallback: () => Promise<void>): void;
  cancel(_name: string): void;
  startTicking(): void;
}

export interface NoboSingleton_publicInterface {
  createValueSourceRegistry<T>({
    sourceGenerator,
    valueSourceCleaningPolicy,
  }: {
    sourceGenerator: SourceGenerator<T>;
    valueSourceCleaningPolicy: ValueSourceCleaningPolicy_publicInterface;
  }): ValueSourceRegistry_publicInterface<T>;
  createDelayedCaller: ({ delayMs, sliceMs }: { delayMs: number; sliceMs: number }) => DelayedCaller_publicInterface;
  mapValues<T extends { [k: string]: I; [Symbol.iterator]: Iterator<anyValue, any, undefined> }, I, O>(
    object: T,
    fn: (i: I) => O
  ): { [k: string]: O };
  isPromise(v: anyValue): boolean;
  handlePromise: HandlePromise;
  promiseOwner: PromiseHandlerOwner_promiseHandlerInterface;
}

export declare var noboSingleton: NoboSingleton_publicInterface;
