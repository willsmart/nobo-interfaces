// TODO document

import { ValueName, ValueRegistry_forTheWorld } from './sinks-and-sources';
import { anyValue } from '../general/any';

export type StringName = ValueName<string>;
export type OptStringName = ValueName<string | undefined>;
export type NumberName = ValueName<number>;
export type OptNumberName = ValueName<number | undefined>;
export type HTMLElementName = ValueName<HTMLElement>;

export interface StandardSourceRegistries_forTheWorld {
  optStrings: ValueRegistry_forTheWorld<string | undefined>;
  strings: ValueRegistry_forTheWorld<string>;
  optNumbers: ValueRegistry_forTheWorld<number | undefined>;
  numbers: ValueRegistry_forTheWorld<number>;
  htmlElements: ValueRegistry_forTheWorld<HTMLElement>;
  all: ValueRegistry_forTheWorld<anyValue>;
}

export declare var standardSourceRegistries: StandardSourceRegistries_forTheWorld;
export default standardSourceRegistries;
