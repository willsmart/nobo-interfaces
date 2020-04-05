import { anyValue } from './any';

export type Caster<T> = (v: anyValue) => T;
