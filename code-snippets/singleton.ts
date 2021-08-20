import { ValueRegistry_asSeenByIts_refs, Value_asSeenByIts_refs } from '../values/sinks-and-sources';
import { CodeSnippet_forTheWorld } from './code-snippet';

// TODO document

export interface CodeSnippetSingleton_forTheWorld {
  codeSnippetValueRegistry(): ValueRegistry_asSeenByIts_refs<Value_asSeenByIts_refs<CodeSnippet_forTheWorld<string>>>;
}

export declare var codeSnippetSingleton: CodeSnippetSingleton_forTheWorld;
