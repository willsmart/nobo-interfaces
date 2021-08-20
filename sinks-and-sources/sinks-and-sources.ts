// Generator <-- world
export interface SourceGenerator_forTheWorld<T> {
  has: (source: SourceName<T>) => boolean;
  create: (_: {
    source: SourceName<T>;
    owner: ValueSourceOwner_asSeenByIts_sources<T>;
  }) => ValueSource_asSeenByIts_owner<T>;
}
// CollectiveGenerator <-- world
export interface CollectiveSourceGenerator_forTheWorld<T> extends SourceGenerator_forTheWorld<T> {
  readonly generators: { [key: string]: SourceGenerator_forTheWorld<T> };
}

// Registry <-- world
export interface SourceRegistry_forTheWorld<T> {
  has(source: SourceName<T>): boolean;
  attachSink(_: { source: SourceName<T>; sink: ValueSink_asSeenByIts_source<T> }): Promise<void> | undefined;
}

// Sink <-> Source
export interface ValueSource_asSeenByIts_sinks<T> {
  detach(): Promise<void> | undefined;
  setValue(v: T): Promise<void> | undefined;
  validate(): Promise<void> | undefined;
}
export interface ValueSink_asSeenByIts_source<T> {
  readonly key: SinkKey;
  didAttachSource?(_: { source: ValueSource_asSeenByIts_sinks<T>; key: SinkKey }): Promise<void>;
  sourceHasNewValue?(_: { value: T; key: SinkKey }): void;
  sourceHasInvalidatedValue?(key: SinkKey): void;
}

// Source <-> Owner
export interface ValueSourceOwner_asSeenByIts_sources<T> {
  didDetachLastSink?(): Promise<void> | undefined;
}

export interface ValueSource_asSeenByIts_owner<T> {
  attachSink(sink: ValueSink_asSeenByIts_source<T>): Promise<void>;
  prepareToBeDestroyed(): void;
}

// AbstractSource <-> Subclass
export interface AbstractValueSource_asSeenByIts_subclass<T> {
  subclassValueWasInvalidated(): void;
  subclassHasNewValue(v: T): void;
}
export interface ValueSource_asSeenByIts_abstractBase<T> {
  validateInSubclass(): void;
  setValuesInSubclass(v: T[]): Promise<void> | undefined;
}

// misc
export interface SourceName<_T> extends String {}
export type SinkKey = string | undefined;

export type AbstractValue_constructorArgs<T> = {
  interfaceExchange: { source?: ValueSource_asSeenByIts_owner<T>; owner: ValueSourceOwner_asSeenByIts_sources<T> };
  value: T;
  valid: boolean;
};
