import Preference from './Preference'

export default class BooleanPreference extends Preference<boolean> {
  constructor(name: string, defaultValue: boolean = false) {
    super({ defaultValue, name, valueTypes: Boolean })
  }

  parse(value: string): boolean | null {
    return value === null ? null : value === true.toString()
  }
}
