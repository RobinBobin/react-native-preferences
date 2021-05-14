import Preference from "./Preference";

export default class Preferences {
  constructor(preferences) {
    this.__areLoaded = false;
    
    this.__namesNotToCheck = [
      "areLoaded",
      "get",
      "load",
      "__areLoaded",
      "__preferences"
    ];
    
    this.__preferences = new Map();
    
    for (preference of preferences) {
      if (!(preference instanceof Preference)) {
        throw new TypeError(`'${preference.name}' is not a Preference instance`);
      }
      
      this.__preferences.set(preference.name, preference);
    }
    
    return new Proxy(this, {
      get: (target, name) => target.__get(name),
      set: (target, name, value) => target.__set(name, value)
    });
  }
   
  get areLoaded() {
    return this.__areLoaded;
  }
  
  get(name) {
    if (!this.__areLoaded) {
      throw new Error(`Trying to get preference '${name}' before the preferences are loaded`);
    }
    
    const preference = this.__preferences.get(name);
    
    if (!preference) {
      throw new Error(`Preference '${name}' is not defined`);
    }
    
    return preference;
  }
  
  async load() {
    if (this.__areLoaded) {
      throw new Error("Preferences can be loaded only once");
    }
    
    try {
      for (preference of this.__preferences.values()) {
        await preference.load();
      }
    } catch (error) {
      throw error;
    }
    
    this.__areLoaded = true;
  }
  
  __get(name) {
    return this.__namesNotToCheck.indexOf(name) === -1 ? this.get(name) : this[name];
  }
  
  __set(name, value) {
    if (name.valueOf() !== "__areLoaded") {
      throw new Error(`Preferences.${name}: value can't be set`);
    }
    
    this[name] = value;
    
    return true;
  }
};
