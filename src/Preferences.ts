import type { TPreferences } from './types'

import { NamedPreference } from './NamedPreference'

type TStringOrSymbol = string | symbol
type TThat = Record<TStringOrSymbol, unknown>

const directlyGettable = ['areLoaded', 'load', 'preferences', '__areLoaded']
const directlySettable = ['__areLoaded']

export class Preferences {
  private __areLoaded: boolean
  private readonly preferences: Map<string, NamedPreference> = new Map()

  constructor(preferences: TPreferences) {
    this.__areLoaded = false

    Object.entries(preferences).forEach(([name, preference]) => {
      this.preferences.set(name, new NamedPreference(name, preference))
    })

    return new Proxy(this, {
      get: (target, name) => target.__get(name),
      // eslint-disable-next-line max-params
      set: (target, name, value) => target.__set(name, value)
    })
  }

  get areLoaded(): boolean {
    return this.__areLoaded
  }

  get(name: string): NamedPreference {
    if (!this.__areLoaded) {
      throw new Error(`Trying to get preference '${name}' before the preferences are loaded`)
    }

    const preference = this.preferences.get(name)

    if (!preference) {
      throw new Error(`Preference '${name}' is not defined`)
    }

    return preference
  }

  async load(): Promise<void> {
    if (this.__areLoaded) {
      throw new Error('Preferences can be loaded only once')
    }

    await Promise.all(Array.from(this.preferences.values()).map(preference => preference.load()))

    this.__areLoaded = true
  }

  private __get(name: TStringOrSymbol): unknown {
    return typeof name === 'symbol' || directlyGettable.includes(name)
      ? this.__that()[name]
      : this.get(name)
  }

  private __set(name: TStringOrSymbol, value: unknown): boolean {
    const stringifiedName = name.valueOf().toString()

    if (!directlySettable.includes(stringifiedName)) {
      throw new Error(`Preferences.${stringifiedName}: value can't be set`)
    }

    this.__that()[name] = value

    return true
  }

  private __that(): TThat {
    return this as TThat
  }
}
