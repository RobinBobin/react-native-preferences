import type { IPreferenceParams } from './types'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default abstract class Preference<T = unknown> {
  readonly name: string

  private readonly defaultValue: T
  private readonly valueTypes: string

  private __value: T = undefined as T

  constructor({ defaultValue, name, valueTypes }: IPreferenceParams<T>) {
    this.defaultValue = defaultValue
    this.name = name

    this.valueTypes = Array.isArray(valueTypes)
      ? `one of [${valueTypes.map(type => type.name).join(', ')}]`
      : `a(n) ${valueTypes.name}`
  }

  assertValidity(value: T): void {
    const valueConstructorName = value?.constructor.name ?? '<undefined>'

    if (this.valueTypes.indexOf(valueConstructorName) === -1) {
      throw new TypeError(
        `Preference '${this.name}': value must be ${this.valueTypes}, but ${valueConstructorName} ${value} was passed`
      )
    }
  }

  async load(): Promise<void> {
    const parsedValue = this.parse(await AsyncStorage.getItem(this.name))

    this.setValue(false, parsedValue ?? this.defaultValue)
  }

  abstract parse(value: string): T | null

  async save(): Promise<void> {
    await AsyncStorage.setItem(this.name, this.stringify())
  }

  stringify(): string {
    return this.__value?.toString() ?? 'null'
  }

  toString(): string {
    return `${this.constructor.name} '${this.name}' (${this.stringify()})`
  }

  get value(): T {
    return this.__value
  }

  set value(value) {
    this.setValue(true, value)
  }

  private setValue(shouldSave: boolean, value: T): void {
    this.assertValidity(value)

    this.__value = value

    if (shouldSave) {
      this.save()
    }
  }
}
