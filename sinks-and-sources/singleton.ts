import { ValueGenerator, ValueRegistry_forTheWorld } from './sinks-and-sources';
import SourceCleaningPolicy_forTheWorld from '../values/cleaning-policy';
import { HandlePromise } from '../general/promise-handler';

// TODO document

export interface ValuesSingleton_forTheWorld {
  createValueRegistry<T>({
    sourceGenerator,
    SourceCleaningPolicy,
  }: {
    sourceGenerator: ValueGenerator<T>;
    SourceCleaningPolicy: SourceCleaningPolicy_forTheWorld;
  }): ValueRegistry_forTheWorld<T>;

  createSourceCleaningPolicy({
    handlePromise,
    delayMs,
    sliceMs,
  }: {
    handlePromise: HandlePromise;
    delayMs: number;
    sliceMs: number;
  }): SourceCleaningPolicy_forTheWorld;
}

export declare var valuesSingleton: ValuesSingleton_forTheWorld;
