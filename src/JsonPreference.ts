import type { JsonObject } from 'type-fest'

import { Preference } from './Preference'

export class JsonPreference<T extends JsonObject> extends Preference<T> {
  constructor(defaultValue: T = {} as T) {
    super(defaultValue)
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  override parse(value: string): T {
    return JSON.parse(value) as T
  }

  override stringify(): string {
    return JSON.stringify(this.value)
  }
}
