import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Preference {
  constructor(name, defaultValue, valueTypes) {
    this.__defaultValue = defaultValue;
    this.__name = name;
    this.__value = undefined;
    
    if (valueTypes !== undefined) {
      this.__valueTypes = Array.isArray(valueTypes) ? `one of [${valueTypes.map(type => type.name).join(", ")}]` : `a(n) ${valueTypes.name}`;
    }
  }
  
  assertValidity(value) {
    if (this.__valueTypes === undefined) {
      throw new Error("No valid value types were specified");
    }
    
    if (this.__valueTypes.indexOf(value?.constructor.name) === -1) {
      throw new TypeError(`Preference '${this.__name}': value must be ${this.__valueTypes}, but ${value?.constructor.name} ${value} was passed`);
    }
  }
  
  async load() {
    try {
      this.__value = this.parse(await AsyncStorage.getItem(this.__name));
      
      if (this.__value === null) {
        this.value = this.__defaultValue;
      }
    } catch (error) {
      throw error;
    }
  }
  
  get name() {
    return this.__name;
  }
  
  save() {
    AsyncStorage.setItem(this.__name, this.stringify()).catch(error => {
      throw error;
    });
  }
  
  stringify() {
    return this.__value?.toString();
  }
  
  toString() {
    return `${this.constructor.name} '${this.__name}' (${this.stringify()})`;
  }
  
  get value() {
    return this.__value;
  }
  
  set value(value) {
    this.assertValidity(value);
    this._setValue(value);
  }
  
  _setValue(value) {
    this.__value = value;
    
    this.save();
  }
};
