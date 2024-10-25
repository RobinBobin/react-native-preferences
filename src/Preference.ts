interface IValidType {
  name: string
}

export abstract class Preference<T> {
  private __value: T

  constructor(
    private readonly defaultValue: T,
    protected readonly validTypes: IValidType | IValidType[]
  ) {
    this.__value = null as T
  }

  assertValidity(value: T | null): void {
    const isValidType = (Array.isArray(this.validTypes) ? this.validTypes : [this.validTypes]).some(
      // eslint-disable-next-line valid-typeof
      validType => validType.name.toLowerCase() === typeof value
    )

    if (!isValidType) {
      throw new TypeError()
    }

    // const valueConstructorName = value?.constructor.name ?? '<undefined>'

    // if (this.valueTypes.indexOf(valueConstructorName) === -1) {
    //   throw new TypeError(
    //     `Preference '${this.name}': value must be ${this.valueTypes}, but ${valueConstructorName} ${value} was passed`
    //   )
    // }
  }

  abstract parse(value: string | null): T | null

  stringify(): string {
    return this.__value?.toString() ?? 'null'
  }

  get value(): T {
    return this.__value
  }

  set value(value) {
    const valueToSet = value ?? this.defaultValue

    this.assertValidity(valueToSet)

    this.__value = valueToSet
  }
}
