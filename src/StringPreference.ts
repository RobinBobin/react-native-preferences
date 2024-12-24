import { Preference } from './Preference'

export class StringPreference extends Preference<string> {
  constructor(defaultValue: string | null = '') {
    super(defaultValue)
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  override _parse(value: string): string {
    return value
  }
}
