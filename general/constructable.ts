import { anyValue } from './any';

export interface Constructable<T> {
  from(v: anyValue): T | undefined;
}
