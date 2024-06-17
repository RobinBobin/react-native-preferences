import AsyncStorage from '@react-native-async-storage/async-storage'

import { Preference } from './Preference'

export class NamedPreference {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public readonly name: string,
    private readonly preference: Preference<unknown>
  ) {}

  assertValidity(value: unknown): void {
    this.preference.assertValidity(value)
  }

  async load(): Promise<void> {
    this.preference.value = this.parse(await AsyncStorage.getItem(this.name))
  }

  parse(value: string | null): unknown | null {
    return this.preference.parse(value)
  }

  async save(): Promise<void> {
    await AsyncStorage.setItem(this.name, this.preference.stringify())
  }

  stringify(): string {
    return this.preference.stringify()
  }

  toString(): string {
    return `${Preference.constructor.name} '${this.name}' (${this.preference.stringify()})`
  }

  get value(): unknown {
    return this.preference.value
  }

  set value(value) {
    this.preference.value = value

    this.save()
  }
}
