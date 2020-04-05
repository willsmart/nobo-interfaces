type RefAndKey<T> = {
  ref: ValueRef<T>;
  key: string | undefined;
};

interface PrivateData<T> {
  valueGetterPromise?: Promise<T>;
  valueSetterPromise?: Promise<T>;
  cachedValue: T;
  valid: Boolean;
  refs: Set<RefAndKey<T>>;
  newValueQueue: T[];
}

export type Value_abstract_constructorArgPassback<T> = {
  owner?: Value_asSeenByIts_owners<T>;
};

export abstract class Value_abstract<T> implements Value_asSeenByIts_refs<T> {
  constructor({ interfacePassback, value, valid }: Value_abstract_constructorArgs<T>) {
    this.privateData = {
      cachedValue: value,
      valid,
      refs: new Set(),
      newValueQueue: [],
    };
    interfacePassback.owner = {
      addRef: this.addRef.bind(this),
      removeRef: this.removeRef.bind(this),
      cleanup: this.cleanup.bind(this),
      refInterface: () => this,
    };
    const _asSeenByIts_verifyThatThisImplementsTheSubclasss: Value_asSeenByIts_subclasss<T> = {
      valueFromSubclass: this.valueFromSubclass,
      subclassValueWasInvalidated: this.subclassValueWasInvalidated,
      subclassHasNewValue: this.subclassHasNewValue,
      setValuesInSubclass: this.setValuesInSubclass,
    };
  }

  // Value_asSeenByIts_refs
  // The interface presented to attached refs or anyone who has a reference to the value
  setValue(v: T): Promise<T> {
    const vsrc = this,
      { privateData } = vsrc;

    privateData.newValueQueue.push(v);
    if (privateData.valueSetterPromise) return privateData.valueSetterPromise;

    const newValues = privateData.newValueQueue;
    privateData.newValueQueue = [];

    const promise = vsrc.setValuesInSubclass(newValues);
    if (!promise) return Promise.resolve(privateData.cachedValue);

    return (privateData.valueSetterPromise = promise.then(async v => {
      do {
        while (privateData.newValueQueue.length) {
          const newValues = privateData.newValueQueue;
          privateData.newValueQueue = [];

          const promise = vsrc.setValuesInSubclass(newValues);
          if (promise) v = await promise;
        }

        await vsrc.subclassHasNewValue(v);
      } while (privateData.newValueQueue.length);
      privateData.valueSetterPromise = undefined;
      return v;
    }));
  }

  get value(): Promise<T> {
    const {
      privateData: { valid, cachedValue },
    } = this;

    if (valid) return Promise.resolve(cachedValue);
    return this.valueFromValue;
  }

  // Value_asSeenByIts_owners
  // The interface presented to the value registry or whatever object created the value
  private addRef(ref: ValueRef<T>, key?: string): ValueRef<T> {
    const {
      privateData: { valid, cachedValue: value, refs },
    } = this;

    refs.add({ ref, key });

    if (!valid && ref.handleInvalidatedValue) ref.handleInvalidatedValue({ key });
    else ref.handleNewValue({ value, key });

    return ref;
  }

  private removeRef(ref: ValueRef<T>, key?: string): Value_stateForOwner {
    const {
        privateData: { valid, refs },
      } = this,
      pair = { ref, key };

    if (refs.has(pair) && valid && ref.handleInvalidatedValue) ref.handleInvalidatedValue({ key });
    refs.delete(pair);

    return refs.size ? Value_stateForOwner.hasRefs : Value_stateForOwner.hasNoRefs;
  }

  private async cleanup(): Promise<void> {
    const { privateData } = this;
    privateData.valid = false;
    await this.notifyRefs();
    privateData.refs.clear();
  }

  // Value_asSeenByIts_subclasss
  // the interface presented to subclasses
  protected abstract valueFromSubclass(): Promise<T> | undefined;
  protected abstract setValuesInSubclass(v: T[]): Promise<T> | undefined;
  protected subclassValueWasInvalidated(): Promise<void> {
    this.privateData.valid = false;
    return this.notifyRefs();
  }
  protected subclassHasNewValue(v: T): Promise<T> {
    const { privateData } = this;
    privateData.cachedValue = v;
    privateData.valid = true;
    return this.notifyRefs().then(() => privateData.cachedValue);
  }

  // Private
  private privateData: PrivateData<T>;

  // Get the value from the value
  private get valueFromValue(): Promise<T> {
    const { privateData } = this;
    if (privateData.valueGetterPromise) return privateData.valueGetterPromise;

    const promise = this.valueFromSubclass();
    if (!promise) return Promise.resolve(privateData.cachedValue);

    return (privateData.valueGetterPromise = promise.then(async v => {
      await this.subclassHasNewValue(v);
      privateData.valueGetterPromise = undefined;
      return v;
    }));
  }

  // Notify the refs that the value has changed
  private async notifyRefs(): Promise<void> {
    const {
      privateData: { valid, refs, cachedValue },
    } = this;
    const promises = Array<Promise<void> | undefined>();
    if (valid) {
      const value = cachedValue;
      refs.forEach(({ ref, key }) => {
        promises.push(ref.handleNewValue({ key, value }));
      });
    } else {
      refs.forEach(({ ref, key }) => {
        if (ref.handleInvalidatedValue) promises.push(ref.handleInvalidatedValue({ key }));
      });
    }
    await Promise.all(promises);
  }
}
