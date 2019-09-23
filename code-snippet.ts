// TODO document

import { anyValue } from './any';

export interface CodeSnippetCallInstance {
  retryAfterPromise(promise: Promise<void>, name: string): void;
  registerSideEffect(perform: CodeSnippetSideEffect, name?: string): void;
}

export interface CodeSnippetArg {
  value: anyValue;
  valueGetter?: (callInstance: CodeSnippetCallInstance) => anyValue;
  defaultValueForKeyPath: (keyPath: string) => anyValue;
}

export type CodeSnippetSideEffect = { run: () => Promise<void> | undefined; name?: string };
export type CodeSnippetCallSuccess<T> = { result: T; sideEffects: CodeSnippetSideEffect[] };
export type CodeSnippetCallResult<T> = {
  retryingAfterPromises?: string[];
  promise: Promise<CodeSnippetCallSuccess<T>>;
};
