import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Preference {
  constructor(name, defaultValue, valueTypes) {
    this.__defaultValue = defaultValue;
    this.__name = name;
    this.__value = undefined;
    this.__valueTypes = Array.isArray(valueTypes) ? `one of [${valueTypes.map(type => type.name).join(", ")}]` : `a ${valueTypes.name}`;
  }
  
  async load() {
    try {
      this.__value = this._parse(await AsyncStorage.getItem(this.__name));
      
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
  
  toString() {
    return `${this.constructor.name} '${this.__name}' (${this._stringify()})`;
  }
  
  get value() {
    return this.__value;
  }
  
  set value(value) {
    this._assertValidity(value);
    
    this.__value = value;
    
    AsyncStorage.setItem(this.__name, this._stringify()).catch(error => {
      throw error;
    });
  }
  
  _assertValidity(value) {
    if (this.__valueTypes.indexOf(value?.constructor.name) === -1) {
      throw new TypeError(`Preference '${this.__name}': value must be ${this.__valueTypes}, but ${value?.constructor.name} ${value} was passed`);
    }
  }
  
  _stringify() {
    return this.__value.toString();
  }
};
