import { Preference } from './Preference'

export class NumberPreference extends Preference<number> {
  constructor(defaultValue = 0) {
    super(defaultValue)
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  override parse(value: string): number {
    return Number(value)
  }
}
