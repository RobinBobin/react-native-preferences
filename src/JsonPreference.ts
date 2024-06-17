import { Preference } from './Preference'

export class JsonPreference<T extends object> extends Preference<T> {
  constructor(defaultValue: T = {} as T) {
    super(defaultValue, Object)
  }

  parse(value: string): T {
    return JSON.parse(value)
  }

  stringify(): string {
    return JSON.stringify(this.value)
  }
}
