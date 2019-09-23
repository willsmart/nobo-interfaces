import { anyValue } from './any';

// TODO document

export interface Constructable<T> {
  from(v: anyValue): T | undefined;
}

export type Caster<T> = (v: anyValue) => T;

export interface TypeHelper<T extends anyValue> {
  castFrom(v: anyValue): T;
  describes(v: anyValue): v is T;
  getDefaultValue(): T;
}
