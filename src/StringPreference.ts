import { Preference } from './Preference'

export class StringPreference extends Preference<string> {
  constructor(defaultValue = '') {
    super(defaultValue)
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  override parse(value: string): string {
    return value
  }
}
