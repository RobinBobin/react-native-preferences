A persistent unencrypted storage for application preferences.

1. <a name="cinstallation"></a>[Installation](#installation)
2. <a name="cusage"></a>[Usage](#usage)
3. <a name="cversionhistory"></a>[Version history](#versionhistory)

### <a name="installation"></a>[Installation](#cinstallation)

	npm i @robinbobin/react-native-preferences
	npm i @react-native-async-storage/async-storage@^1.14.1

My package uses [`@react-native-async-storage/async-storage`](https://www.npmjs.com/package/@react-native-async-storage/async-storage/v/1.14.1) to manage preference values, and that package needs linking. If it's specified as a dependency of `@robinbobin/react-native-preferences` it's not added to an app's `package.json` as a dependency and is not linked. Hence the need for manual installation.

### <a name="usage"></a>[Usage](#cusage)

Example:

	import {
		StringPreference,
		usePreferences
	} from  "@robinbobin/react-native-preferences";
	
	function  App() {
		...
		const onLoad = useCallback(() => {
			console.log(preferences.pref.name, preferences.pref.value);
			preferences.pref.value = "peakaboo";
			console.log(preferences.pref.name, preferences.pref.value);
		}, []);
		
		const preferences = usePreferences([
			new StringPreference("pref", "for you")
		], onLoad);
		...
	}

<br>

1. <a name="cpreferences"></a>[Preferences](#preferences)
2. <a name="cpreference"></a>[Preference](#preference)
3. <a name="cjsonpreference"></a>[JsonPreference](#jsonpreference)
4. <a name="cnumberpreference"></a>[NumberPreference](#numberpreference)
5. <a name="cstringpreference"><a>[StringPreference](#stringpreference)
6. <a name="cusepreferences"></a>[usePreferences()](#usepreferences)

#### <a name="preferences"></a>[Preferences](#cpreferences)

An instance of this class stores all the preferences. See [`usePreferences()`](#usepreferences).

- [areLoaded](#preferences)

	A boolean property, returning `true` if the properties have been loaded and `false` otherwise.

- <a name="preferencesget"></a>[get()](#preferences)

	Gets a preference by name. Throws an `Error` instance if the preferences haven't been loaded yet or if there's no preference with that name.

	Generally it's easier to use the `preferences.preferenceName` syntax for the same purpose. This function can be used to access preferences with reserved names (names of properties / methods of this class and names starting with an underscore).

- [load()](#preferences)

	Loads the preferences. This function is invoked internally by [`usePreferences()`](#usepreferences).

#### <a name="preference"></a>[Preference](#cpreference)

This class serves as the base class for the classes that manage preference values ([`NumberPreference`](#numberpreference), [`StringPreference`](#stringpreference), etc). It shouldn't be instantiated directly.

- [constructor()](#preference)

	Takes 3 parameters:
	- `name` &ndash; The name of the preference. See also [`Preferences.get()`](#preferencesget).
	- `defaultValue` &ndash; A default value for the preference, used **only** on load if no value has been stored before.
	- `valueTypes` &ndash; Valid value types. Can be `undefined`, one type or an array of types.

- <a name="preferenceassertvalidity"></a>[assertValidity()](#preference)

	Checks the validity of the passed value. If the value is deemed invalid, a `TypeError` is thrown.

- [name](#preference)

	A string property, returning this preference name.

- [parse()](#preference)

	Returns a value this preference can manage, being passed a string. The following must stand true:
	- The parameter must be a valid string representation of the value.
	- If the parameter is `null` this function must return `null`.

- <a name="preferencesave"></a>[save()](#preference)

	Stores the preference value in a persistent storage. This method is invoked internally by the [`value` setter](#preferencevalue), but has to be called manually for "compound" preferences like [`JsonPreference`](#jsonpreference).

- [stringify()](#preference)

	Returns a string representation of the preference value.

- [toString()](#preference)

	Returns a human-readable representation of this preference.

- <a name="preferencevalue"></a>[value](#preference)

	A getter / setter for the preference value. When setting a value, its validity is checked with [`assertValidity()`](#preferenceassertvalidity).

#### <a name="jsonpreference"></a>[JsonPreference](#cjsonpreference)

A class to manage object values (`{}`). The default value is an empty object, if not specified. Please, don't forget to call [`save()`](#preferencesave) when changing the object:

	preferences.json.value.delay = 10;
	preferences.json.save();

#### <a name="numberpreference"></a>[NumberPreference](#cnumberpreference)

A class to manage number values. The default value is zero, if not specified.

#### <a name="stringpreference"></a>[StringPreference](#cstringpreference)

A class to manage string values. The default value is an empty string, if not specified.

#### <a name="usePreferences"></a>[usePreferences()](#cusepreferences)

This function does the following:
1. Creates an instance of [`Preferences`](#preferences), initializing it with the passed in `preferences`.
2. Loads the preferences.
3. Returns the created instance.

The return value of this function needn't be specified as a dependency of `React.useCallback()`, etc.

This function takes 3 parameters:

- `preferences` &ndash; an array of preferences (instances of classes derived from [`Preference`](#preference)).
- `onLoad` &ndash; a callback that is invoked when the preferences are loaded.
- `onUnload` &ndash; (optional) a callback that is invoked on unmount. 

### <a name="versionhistory"></a>[Version history](#cversionhistory)

Version number|Changes
-|-
v1.2.0|1. [`usePreferences()`](#usepreferences): `onUnload` added.<br>2. Default values for [`JsonPreference`](#jsonpreference), [`NumberPreference`](#numberpreference) and [`StringPreference`](#stringpreference).
v1.1.0|1. [`JsonPreference`](#jsonpreference) added.<br>2. [`Preference.save()`](#preferencesave) added.
v1.0.3|Initial release.

<br><br>
> Written with [StackEdit](https://stackedit.io/).
