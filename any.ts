export type anyPrimitive = number | string | boolean | symbol | null | undefined;
export type anyValue = object | anyPrimitive;
export type anyObject_T<T> = { [key: string]: T };
export type anyObject = anyObject_T<anyValue>;
