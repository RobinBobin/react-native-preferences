import {
  useEffect,
  useState
} from "react";
// import ArrayPreference from "./js/ArrayPreference";
// import JSONPreference from "./js/JSONPreference"
import NumberPreference from "./js/NumberPreference";
import Preference from "./js/Preference";
import Preferences from "./js/Preferences";
import StringPreference from "./js/StringPreference";

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
