import { anything } from './any';

// TODO document

export type HandlePromise = (promise: PromiseOrPromiseGenerator) => Promise<void>;

export type PromiseOrPromiseGenerator =
  | Promise<anything>
  | ((handlePromise: HandlePromise) => PromiseOrPromiseGenerator | undefined);

export interface PromiseHandler_publicInterface {
  requestClearPromises(): Promise<void>;
  handle(promise: PromiseOrPromiseGenerator): Promise<void>;
  clearPromises(): Promise<void>;
}

export interface PromiseHandlerOwner_promiseHandlerInterface {
  clearPromises(clearPromises: () => Promise<void>, handler: PromiseHandler_publicInterface): Promise<void>;
}
