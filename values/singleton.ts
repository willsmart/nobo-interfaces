import { ValueGenerator, ValueRegistry_publicInterface } from '../values/refs-and-values';
import ValueCleaningPolicy_publicInterface from '../values/cleaning-policy';
import { HandlePromise } from '../general/promise-handler';

// TODO document

export interface ValuesSingleton_publicInterface {
  createValueRegistry<T>({
    sourceGenerator,
    valueCleaningPolicy,
  }: {
    sourceGenerator: ValueGenerator<T>;
    valueCleaningPolicy: ValueCleaningPolicy_publicInterface;
  }): ValueRegistry_publicInterface<T>;

  createValueCleaningPolicy({
    handlePromise,
    delayMs,
    sliceMs,
  }: {
    handlePromise: HandlePromise;
    delayMs: number;
    sliceMs: number;
  }): ValueCleaningPolicy_publicInterface;
}

export declare var valuesSingleton: ValuesSingleton_publicInterface;
