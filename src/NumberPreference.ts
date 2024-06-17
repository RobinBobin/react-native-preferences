import { Preference } from './Preference'

export class NumberPreference extends Preference<number> {
  constructor(defaultValue: number = 0) {
    super(defaultValue, Number)
  }

  parse(value: string): number | null {
    return value === null ? null : Number(value)
  }
}
