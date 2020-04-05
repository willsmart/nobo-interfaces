import { anyValue } from './any';

export interface TypeHelper<T extends anyValue> {
  castFrom(v: anyValue): T;
  describes(v: anyValue): v is T;
  getDefaultValue(): T;
}
