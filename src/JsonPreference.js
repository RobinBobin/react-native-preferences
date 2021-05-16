import Preference from "./Preference";

export default class JsonPreference extends Preference {
  constructor(name, defaultValue) {
    super(name, defaultValue, Object);
  }
  
  parse(value) {
    return JSON.parse(value);
  }
  
  stringify() {
    return JSON.stringify(this.value);
  }
}
