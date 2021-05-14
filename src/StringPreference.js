import Preference from "./Preference";

export default class StringPreference extends Preference {
  constructor(name, defaultValue) {
    super(name, defaultValue, String);
  }
  
  _parse(value) {
    return value;
  }
};
