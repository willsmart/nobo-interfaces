import { anything } from './any';

// TODO document

export type HandlePromise = (promise: PromiseOrPromiseGenerator) => Promise<void>;

export type PromiseOrPromiseGenerator =
  | Promise<anything>
  | ((handlePromise: HandlePromise) => PromiseOrPromiseGenerator | undefined);

export interface PromiseHandler_forTheWorld {
  requestClearPromises(): Promise<void>;
  handle(promise: PromiseOrPromiseGenerator): Promise<void>;
  clearPromises(): Promise<void>;
}

export interface PromiseHandlerOwner_asSeenByIts_promiseHandlers {
  clearPromises(clearPromises: () => Promise<void>, handler: PromiseHandler_forTheWorld): Promise<void>;
}
