import type Preference from './Preference'

const namesNotToCheck = ['areLoaded', 'get', 'load', 'preferences', '__areLoaded']

export default class Preferences {
  private __areLoaded: boolean
  private readonly preferences: Map<string, Preference> = new Map()

  constructor(preferences: Preference[]) {
    this.__areLoaded = false

    for (const preference of preferences) {
      this.preferences.set(preference.name, preference)
    }

    return new Proxy(this, {
      get: (target, name) => target.__get(name),
      // eslint-disable-next-line max-params
      set: (target, name, value) => target.__set(name, value)
    })
  }

  get areLoaded(): boolean {
    return this.__areLoaded
  }

  get(name: string): Preference {
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

  private __get(name: string | symbol): unknown {
    return typeof name === 'symbol' || namesNotToCheck.includes(name) ? this[name] : this.get(name)
  }

  private __set(name: string | symbol, value: unknown): boolean {
    if (name.valueOf() !== '__areLoaded') {
      throw new Error(`Preferences.${String(name)}: value can't be set`)
    }

    this[name] = value

    return true
  }
}
