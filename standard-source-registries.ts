// TODO document

import { SourceName, ValueSourceRegistry_publicInterface } from "./sinks-and-sources";
import { anyValue } from "./any";

export type StringName = SourceName<string>;
export type OptStringName = SourceName<string | undefined>;
export type NumberName = SourceName<number>;
export type OptNumberName = SourceName<number | undefined>;
export type HTMLElementName = SourceName<HTMLElement>;

export interface StandardSourceRegistries_publicInterface {
  optStrings: ValueSourceRegistry_publicInterface<string | undefined>;
  strings: ValueSourceRegistry_publicInterface<string>;
  optNumbers: ValueSourceRegistry_publicInterface<number | undefined>;
  numbers: ValueSourceRegistry_publicInterface<number>;
  htmlElements: ValueSourceRegistry_publicInterface<HTMLElement>;
  all: ValueSourceRegistry_publicInterface<anyValue>;
}

export declare var standardSourceRegistries: StandardSourceRegistries_publicInterface;
export default standardSourceRegistries;
