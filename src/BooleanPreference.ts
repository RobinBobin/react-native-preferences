import { Preference } from './Preference'

export class BooleanPreference extends Preference<boolean> {
  constructor(defaultValue: boolean | null = false) {
    super(defaultValue)
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  override _parse(value: string): boolean {
    return value === true.toString()
  }
}
