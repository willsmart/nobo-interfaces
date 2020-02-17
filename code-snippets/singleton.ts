import { ValueRegistry_refInterface, Value_refInterface } from '../values/refs-and-values';
import { CodeSnippet_publicInterface } from './code-snippet';

// TODO document

export interface CodeSnippetSingleton_publicInterface {
  codeSnippetValueRegistry(): ValueRegistry_refInterface<Value_refInterface<CodeSnippet_publicInterface<string>>>;
}

export declare var codeSnippetSingleton: CodeSnippetSingleton_publicInterface;
