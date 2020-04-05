import { anyValue } from './any';
import { HandlePromise, PromiseHandlerOwner_asSeenByIts_promiseHandlers } from './promise-handler';
import { DelayedCaller_forTheWorld } from './delayed_caller';

// TODO document

export interface GeneralSingleton_forTheWorld {
  createDelayedCaller: ({ delayMs, sliceMs }: { delayMs: number; sliceMs: number }) => DelayedCaller_forTheWorld;

  mapValues<T extends { [k: string]: I; [Symbol.iterator]: Iterator<anyValue, any, undefined> }, I, O>(
    object: T,
    fn: (i: I) => O
  ): { [k: string]: O };

  isPromise(v: anyValue): boolean;

  handlePromise: HandlePromise;

  promiseOwner: PromiseHandlerOwner_asSeenByIts_promiseHandlers;
}

export declare var generalSingleton: GeneralSingleton_forTheWorld;
