import type { EffectCallback } from 'react'
import type { TPreferences } from './src/types'

import { useEffect, useMemo, useState } from 'react'

import { Preferences } from './src/Preferences'

export { BooleanPreference } from './src/BooleanPreference'
export { JsonPreference } from './src/JsonPreference'
export { NumberPreference } from './src/NumberPreference'
export { Preference } from './src/Preference'
export { StringPreference } from './src/StringPreference'

interface IUsePreferencesReturnType<T extends TPreferences> {
  areLoaded: boolean
  preferences: T
}

type TDestructor = ReturnType<EffectCallback>
type TOnLoadReturnType = TDestructor | Promise<TDestructor>

const isPromise = <T>(result: T | Promise<T>): result is Promise<T> => {
  return result?.constructor === Promise
}

export function usePreferences<T extends TPreferences>(
  preferences: T,
  onLoad?: () => TOnLoadReturnType
): IUsePreferencesReturnType<T> {
  const prefs = useMemo(() => new Preferences(preferences), [])
  const [areLoaded, setAreLoaded] = useState(false)

  useEffect(() => {
    let cleanUp: TDestructor

    async function init(): Promise<void> {
      await prefs.load()

      setAreLoaded(true)

      if (onLoad) {
        const result = onLoad()

        cleanUp = isPromise(result) ? await result : result
      }
    }

    init()

    return () => cleanUp?.()
  }, [prefs])

  return {
    areLoaded,
    preferences: prefs as unknown as T
  }
}
