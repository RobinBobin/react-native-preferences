import {
  useEffect,
  useState
} from "react";
import BooleanPreference from "./src/BooleanPreference";
import JsonPreference from "./src/JsonPreference"
import NumberPreference from "./src/NumberPreference";
import Preference from "./src/Preference";
import Preferences from "./src/Preferences";
import StringPreference from "./src/StringPreference";

export {
  BooleanPreference,
  JsonPreference,
  NumberPreference,
  Preference,
  Preferences,
  StringPreference
};

export function usePreferences(preferences, onLoad, onUnload) {
  const [prefs] = useState(() => new Preferences(preferences));
  
  useEffect(() => {
    prefs.load().then(onLoad);
    
    return onUnload;
  }, [prefs]);
  
  return prefs;
};
