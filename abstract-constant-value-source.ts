import { AbstractValueSource, ValueSourceInterfacePassback } from './abstract-value-source';

export abstract class AbstractConstantValueSource<T, Arg> extends AbstractValueSource<T> {
  protected valueFromSubclass(): Promise<T> {
    return Promise.resolve(this.cachedValue);
  }

  setValueInSubclass(): undefined {
    return undefined;
  }

  constructor({
    interfacePassback,
    rawValue,
    valueTransform,
  }: {
    interfacePassback: ValueSourceInterfacePassback<T>;
    rawValue: Arg;
    valueTransform: (arg: Arg) => T;
  }) {
    super({ interfacePassback, value: valueTransform(rawValue), valid: true });
  }
}
