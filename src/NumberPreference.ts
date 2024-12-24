import { Preference } from './Preference'

export class NumberPreference extends Preference<number> {
  constructor(defaultValue: number | null = 0) {
    super(defaultValue)
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  override _parse(value: string): number {
    return Number(value)
  }
}
