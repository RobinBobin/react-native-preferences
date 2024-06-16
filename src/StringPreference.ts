import Preference from './Preference'

export default class StringPreference extends Preference<string> {
  constructor(name: string, defaultValue: string = '') {
    super({ defaultValue, name, valueTypes: String })
  }

  parse(value: string): string | null {
    return value
  }
}
