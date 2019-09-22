import { SourceRegistry_sinkInterface } from "./sinks-and-sources";
import { CodeSnippet } from "../code-snippet";

// TODO document

export interface CodeSnippetSingleton_publicInterface {
  codeSnippetSourceRegistry(): SourceRegistry_sinkInterface<CodeSnippet>;
}

export declare var codeSnippetSingleton: CodeSnippetSingleton_publicInterface;
