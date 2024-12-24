import type { IPreference } from './types'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { isNullish, isString } from 'radashi'
import { verify } from 'simple-common-utils'

import { VALUE_FOR_NULL } from './constants'

export abstract class Preference<T extends IPreference> {
  private name?: string
  private __value: T | null = null

  constructor(private readonly defaultValue: T | null) {
    // Nothing to do
  }

  getOrDefault(): T {
    verify(
      !isNullish(this.defaultValue),
      "'getOrDefault()' can't be invoked if 'this.defaultValue' is nullish"
    )

    return this.value ?? this.defaultValue
  }

  async load(): Promise<void> {
    verify(isString(this.name), "Can't load without name")

    const rawValue = await AsyncStorage.getItem(this.name)

    this.value = isNullish(rawValue) ? this.defaultValue : this.parse(rawValue)
  }

  async save(): Promise<void> {
    verify(isString(this.name), "Can't save without name")

    await AsyncStorage.setItem(this.name, this.stringify())
  }

  setName(name: string): void {
    verify(name, "Can't set an empty name")
    verify(isNullish(this.name), '`setName()` can be invoked only once')

    this.name = name
  }

  toString(): string {
    return `${this.constructor.name} '${this.name}' (${this.stringify()})`
  }

  get value(): T | null {
    return this.__value
  }

  set value(value) {
    this.__value = value

    void this.save()
  }

  protected abstract _parse(value: string): T

  protected _stringify(): string {
    verify(!isNullish(this.value), "'this.value' can't be null here")

    return this.value.toString()
  }

  private parse(value: string): T | null {
    return value === VALUE_FOR_NULL ? null : this._parse(value)
  }

  private stringify(): string {
    return this.value === null ? VALUE_FOR_NULL : this._stringify()
  }
}
