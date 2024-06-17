import { Preference } from './Preference'

export class StringPreference extends Preference<string> {
  constructor(defaultValue: string = '') {
    super(defaultValue, String)
  }

  parse(value: string): string | null {
    return value
  }
}
