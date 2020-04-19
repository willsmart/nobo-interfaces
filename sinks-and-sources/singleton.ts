import { SourceGenerator_forTheWorld, SourceRegistry_forTheWorld } from './sinks-and-sources';
import SourceCleaningPolicy_forTheWorld from '../sinks-and-sources/cleaning-policy';
import { HandlePromise } from '../general/promise-handler';

// TODO document

export interface SinksAndSourcesSingleton_forTheWorld {
  createSourceRegistry<T>({
    sourceGenerator,
    SourceCleaningPolicy,
  }: {
    sourceGenerator: SourceGenerator_forTheWorld<T>;
    SourceCleaningPolicy: SourceCleaningPolicy_forTheWorld;
  }): SourceRegistry_forTheWorld<T>;

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

export declare var sinksAndSourcesSingleton: SinksAndSourcesSingleton_forTheWorld;
