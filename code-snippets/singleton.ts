import { ValueSource_asSeenByIts_sinks, SourceRegistry_forTheWorld } from '../sinks-and-sources/sinks-and-sources';
import { CodeSnippet_forTheWorld } from './code-snippet';

// TODO document

export interface CodeSnippetSingleton_forTheWorld {
  codeSnippetValueRegistry(): SourceRegistry_forTheWorld<
    ValueSource_asSeenByIts_sinks<CodeSnippet_forTheWorld<string>>
  >;
}

export declare var codeSnippetSingleton: CodeSnippetSingleton_forTheWorld;
