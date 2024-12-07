import AsyncStorage from '@react-native-async-storage/async-storage'
import { isNullish, isString } from 'radashi'
import { verify } from 'simple-common-utils'

export abstract class Preference<T> {
  private name?: string
  private __value: T | null = null

  constructor(private readonly defaultValue: T) {
    // Nothing to do
  }

  getOrDefault(): T {
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

  protected abstract parse(value: string): T

  protected stringify(): string {
    return this.__value?.toString() ?? 'null'
  }
}
