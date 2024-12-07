import { Preference } from './Preference'

export class BooleanPreference extends Preference<boolean> {
  constructor(defaultValue = false) {
    super(defaultValue)
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  override parse(value: string): boolean {
    return value === true.toString()
  }
}
