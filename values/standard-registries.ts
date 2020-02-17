// TODO document

import { ValueName, ValueRegistry_publicInterface } from './refs-and-values';
import { anyValue } from '../general/any';

export type StringName = ValueName<string>;
export type OptStringName = ValueName<string | undefined>;
export type NumberName = ValueName<number>;
export type OptNumberName = ValueName<number | undefined>;
export type HTMLElementName = ValueName<HTMLElement>;

export interface StandardSourceRegistries_publicInterface {
  optStrings: ValueRegistry_publicInterface<string | undefined>;
  strings: ValueRegistry_publicInterface<string>;
  optNumbers: ValueRegistry_publicInterface<number | undefined>;
  numbers: ValueRegistry_publicInterface<number>;
  htmlElements: ValueRegistry_publicInterface<HTMLElement>;
  all: ValueRegistry_publicInterface<anyValue>;
}

export declare var standardSourceRegistries: StandardSourceRegistries_publicInterface;
export default standardSourceRegistries;
