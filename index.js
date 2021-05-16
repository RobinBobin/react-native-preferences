import {
  useEffect,
  useState
} from "react";
// import ArrayPreference from "./src/ArrayPreference";
// import JSONPreference from "./src/JSONPreference"
import NumberPreference from "./src/NumberPreference";
import Preference from "./src/Preference";
import Preferences from "./src/Preferences";
import StringPreference from "./src/StringPreference";

export {
  // ArrayPreference,
  // JSONPreference,
  NumberPreference,
  Preference,
  Preferences,
  StringPreference
};

export function usePreferences(preferences, onLoad) {
  const [prefs] = useState(() => new Preferences(preferences));
  
  useEffect(() => prefs.load().then(onLoad), [prefs]);
  
  return prefs;
};
