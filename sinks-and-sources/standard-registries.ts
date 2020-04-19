// TODO document

import { SourceName, SourceRegistry_forTheWorld } from './sinks-and-sources';
import { anyValue } from '../general/any';

export type StringName = SourceName<string>;
export type OptStringName = SourceName<string | undefined>;
export type NumberName = SourceName<number>;
export type OptNumberName = SourceName<number | undefined>;
export type HTMLElementName = SourceName<HTMLElement>;

export interface StandardSourceRegistries_forTheWorld {
  optStrings: SourceRegistry_forTheWorld<string | undefined>;
  strings: SourceRegistry_forTheWorld<string>;
  optNumbers: SourceRegistry_forTheWorld<number | undefined>;
  numbers: SourceRegistry_forTheWorld<number>;
  htmlElements: SourceRegistry_forTheWorld<HTMLElement>;
  all: SourceRegistry_forTheWorld<anyValue>;
}

export declare var standardSourceRegistries: StandardSourceRegistries_forTheWorld;
export default standardSourceRegistries;
