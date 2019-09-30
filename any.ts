export type anyValue = object | number | string | boolean | symbol | null | undefined;
export type anyObject_T<T> = { [key: string]: T };
export type anyObject = anyObject_T<anyValue>;
