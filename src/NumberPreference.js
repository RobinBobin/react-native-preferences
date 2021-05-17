import Preference from "./Preference";

export default class NumberPreference extends Preference {
  constructor(name, defaultValue = 0) {
    super(name, defaultValue, Number);
  }
  
  parse(value) {
    return value === null ? null : +value;
  }
}
