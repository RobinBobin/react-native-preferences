import type { Preference } from './Preference'
import type { IPreference, TPreferences, TStringOrSymbol, TThat } from './types'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { isSymbol } from 'radashi'
import { verify } from 'simple-common-utils'

const directlyGettable = ['areLoaded', 'delete', 'get', 'load', 'preferences']
const directlySettable = ['areLoaded']

export class Preferences {
  private areLoaded = false
  private readonly preferences = new Map<string, Preference<IPreference>>()

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  constructor(preferences: TPreferences) {
    for (const [name, preference] of Object.entries(preferences)) {
      preference.setName(name)

      this.preferences.set(name, preference)
    }

    // eslint-disable-next-line no-constructor-return
    return new Proxy(this, {
      get: (target, name): unknown => target.__get(name),
      set: (target, name, value): boolean => target.__set(name, value)
    })
  }

  get(name: string): Preference<IPreference> {
    verify(
      this.areLoaded,
      `Trying to get preference '${name}' before the preferences are loaded`
    )

    const preference = this.preferences.get(name)

    verify(preference, `Preference '${name}' is not defined`)

    return preference
  }

  delete(name: string): Promise<void> {
    this.get(name)

    return AsyncStorage.removeItem(name)
  }

  async load(): Promise<void> {
    verify(!this.areLoaded, 'Preferences can be loaded only once')

    await Promise.all(
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      Array.from(this.preferences.values()).map(preference => preference.load())
    )

    this.areLoaded = true
  }

  private __get(name: TStringOrSymbol): unknown {
    return isSymbol(name) || directlyGettable.includes(name) ?
        this.__that()[name]
      : this.get(name)
  }

  private __set(name: TStringOrSymbol, value: unknown): boolean {
    const stringifiedName = name.valueOf().toString()

    verify(
      directlySettable.includes(stringifiedName),
      `Preferences.${stringifiedName}: value can't be set`
    )

    this.__that()[name] = value

    return true
  }

  private __that(): TThat {
    return this as TThat
  }
}
