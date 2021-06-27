import Preference from "./Preference";

export default class BooleanPreference extends Preference {
  constructor(name, defaultValue = false) {
    super(name, defaultValue, Boolean);
  }
  
  parse(value) {
    return value === null ? null : value === true.toString();
  }
}
