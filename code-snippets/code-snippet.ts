import { anyValue } from '../general/any';

// TODO document

export interface CodeSnippet_publicInterface<T> {}

export interface CodeSnippetCallInstance {
  retryAfterPromise(promise: Promise<void>, name: string): void;
  registerSideEffect(perform: CodeSnippetSideEffect, name?: string): void;
}

export interface CodeSnippetArg<T extends anyValue> {
  value: T;
  valueGetter?: (callInstance: CodeSnippetCallInstance) => T;
  defaultValueForKeyPath: (keyPath: string) => T;
}

export type CodeSnippetSideEffect = { run: () => Promise<void> | undefined; name?: string };
export type CodeSnippetCallSuccess<T> = { result: T; sideEffects: CodeSnippetSideEffect[] };
export type CodeSnippetCallResult<T> = {
  retryingAfterPromises?: string[];
  promise: Promise<CodeSnippetCallSuccess<T>>;
};
