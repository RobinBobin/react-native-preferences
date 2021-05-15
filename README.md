A persistent unencrypted storage for application preferences.

1. <a name="cinstallation"></a>[Installation](#installation)
2. <a name="cusage"></a>[Usage](#usage)
3. <a name="cversionhistory"></a>[Version history](#versionhistory)

### <a name="installation"></a>[Installation](#cinstallation)

	npm i @robinbobin/react-native-preferences
	npm i @react-native-async-storage/async-storage@^1.14.1

My package depends on [`@react-native-async-storage/async-storage`](https://www.npmjs.com/package/@react-native-async-storage/async-storage/v/1.14.1), and that package needs linking as it contains native code. If it's specified as a dependency of `@robinbobin/react-native-preferences` it won't be added to an app's `package.json` as a dependency and won't be linked. Hence the need for manual installation.

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
		});
		
		const preferences = usePreferences([
			new StringPreference("pref", "for you")
		], onLoad);
		...
	}

<br>

1. <a name="cpreferences"></a>[Preferences](#preferences)
2. <a name="cpreference"></a>[Preference](#preference)
3. <a name="cnumberpreference"></a>[NumberPreference](#numberpreference)
4. <a name="cstringpreference"><a>[StringPreference](#stringpreference)

#### <a name="preferences"></a>[Preferences](#cpreferences)

<br><br>
> Written with [StackEdit](https://stackedit.io/).
