import { Preference } from './Preference'

export class BooleanPreference extends Preference<boolean> {
  constructor(defaultValue: boolean = false) {
    super(defaultValue, Boolean)
  }

  parse(value: string): boolean | null {
    return value === null ? null : value === true.toString()
  }
}
