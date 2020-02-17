/**
 * Nobo is ruled by "Values", which are just base level variable values, like say
 * the string "foo" or the number 1.5
 *
 * A "Value" is an object that owns the value. It is able to produce the value on request
 * and is in charge of ensuring that value changes don't go unnoticed
 *
 * A "ValueRef" is an object that needs to read the value. Anything that could need to know the exact
 * value of the "Value" is a "ValueRef".
 *
 * Each "Value" in any one process has one "Value", which may have any number of "ValueRefs"
 *
 * A core concept is that a value cannot change without all refs being made aware that there was a change
 *
 *  and being able to obtain the new value.
 * An example would be a database cell value would be associated with a "Value". A DOM text node that
 * displays is would be associated with a "ValueRef"
 */

// The value interface presented to attached refs or anyone who has a reference to the value
//  (note that only attached refs and registries and the like should have a reference to a value object)
export interface Value_refInterface<T> {
  readonly value: Promise<T>; // Async call to get the canonical value
  setValue(v: T): Promise<T>; // Request that the value be changed
  //                             The promise will succeed when the value has been changed
  //                             (note that the actual value may end up slightly different to the one given)
  //                             The promise will reject when we know the value will not change
  //                             If two change requests are made, the last one wins.
}

// The value interface presented to the value registry or whatever object created the value
export enum Value_stateForOwner {
  hasNoRefs = 0,
  hasRefs,
}

export interface Value_ownerInterface<T> {
  addRef(ref: ValueRef_valueInterface<T>): ValueRef_valueInterface<T>; //       Add a ref
  removeRef(ref: ValueRef_valueInterface<T>): Value_stateForOwner; // Remove a ref.
  //                                                          Return state info after the ref was removed
  cleanup(): Promise<void>; //                                Release all resources held by this value
  //                                                          as it is about to be freed by its owner
  refInterface(): Value_refInterface<T>;
}

// the value interface presented to subclasses
export interface Value_subclassInterface<T> {
  subclassValueWasInvalidated(): Promise<void>; //      Called when the value becomes invalid
  subclassHasNewValue(v: T): Promise<T>; //             Called when the value gets a new value
  valueFromSubclass(): Promise<T> | undefined; //                   Called to get the canonical value of the value from the subclass. Undefined indicates it is unchanged
  setValuesInSubclass(v: T[]): Promise<T> | undefined; //           Called to request that the value be changed
}

// The ref interface presented to the value
export interface ValueRef_valueInterface<T> {
  handleNewValue(_: { value: T; key: string | undefined }): Promise<void> | undefined; //  Called when the referenced value changes
  handleInvalidatedValue?(_: { key: string | undefined }): Promise<void> | undefined; //  Called by the value when it becomes invalid
}

// The registry interface presented to refs
export interface ValueRegistry_refInterface<T> {}

export type ValueRef_sourceLink<T> = {
  valueRegistry: ValueRegistry_refInterface<T>; //  The registry for the value that this ref gets its value from
  valueName: string; //                        The name for the value that this ref gets its value from
};

// The ref interface presented to registries
export interface ValueRef_registryInterface<T> extends ValueRef_valueInterface<T> {}

export interface ValueName<_T> extends String {}

export type ValueGenerator<T> = (name: ValueName<T>) => Value_ownerInterface<T>;

// The registry interface presented to the world
export interface ValueRegistry_publicInterface<T> {
  has(name: ValueName<T>): boolean;
  attach(_: { value: ValueName<T>; ref: ValueRef_registryInterface<T> }): ValueRef_registryInterface<T>;
}
