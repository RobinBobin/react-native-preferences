import Preference from './Preference'

export default class JsonPreference extends Preference<Record<string, unknown>> {
  constructor(name: string, defaultValue: Record<string, unknown> = {}) {
    super({ defaultValue, name, valueTypes: Object })
  }

  parse(value: string): Record<string, unknown> {
    return JSON.parse(value)
  }

  stringify(): string {
    return JSON.stringify(this.value)
  }
}
