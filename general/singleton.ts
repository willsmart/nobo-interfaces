import { anyValue } from './any';
import { HandlePromise, PromiseHandlerOwner_promiseHandlerInterface } from './promise-handler';
import { DelayedCaller_publicInterface } from './delayed_caller';

// TODO document

export interface GeneralSingleton_publicInterface {
  createDelayedCaller: ({ delayMs, sliceMs }: { delayMs: number; sliceMs: number }) => DelayedCaller_publicInterface;

  mapValues<T extends { [k: string]: I; [Symbol.iterator]: Iterator<anyValue, any, undefined> }, I, O>(
    object: T,
    fn: (i: I) => O
  ): { [k: string]: O };

  isPromise(v: anyValue): boolean;

  handlePromise: HandlePromise;

  promiseOwner: PromiseHandlerOwner_promiseHandlerInterface;
}

export declare var generalSingleton: GeneralSingleton_publicInterface;
