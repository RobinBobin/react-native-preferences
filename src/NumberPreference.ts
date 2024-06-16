import Preference from './Preference'

export default class NumberPreference extends Preference<number> {
  constructor(name: string, defaultValue: number = 0) {
    super({ defaultValue, name, valueTypes: Number })
  }

  parse(value: string): number | null {
    return value === null ? null : Number(value)
  }
}
