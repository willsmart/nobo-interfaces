import { anything } from './any';

export type Type<T> = {
  example: T;
  name: string;
  abbrev: string;
  from(_: anything): { value?: T };
};
