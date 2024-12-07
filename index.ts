import type { TPreferences } from './src/types'
import type { IUsePreferencesReturnType, TDestructor, TOnLoad } from './types'

import { isPromise } from 'radashi'
import { useEffect, useMemo, useState } from 'react'

import { Preferences } from './src/Preferences'

export function usePreferences<T extends TPreferences>(
  preferences: T,
  onLoad?: TOnLoad
): IUsePreferencesReturnType<T> {
  const preferencesWrapper = useMemo(
    () => new Preferences(preferences),
    [preferences]
  )
  const [areLoaded, setAreLoaded] = useState(false)

  useEffect(() => {
    let cleanUp: TDestructor

    async function init(): Promise<void> {
      await preferencesWrapper.load()

      if (onLoad) {
        const result = onLoad()

        cleanUp = isPromise(result) ? await result : result
      }

      setAreLoaded(true)
    }

    void init()

    const result: TDestructor = () => cleanUp?.()

    return result
  }, [onLoad, preferencesWrapper])

  return {
    areLoaded,
    preferences: preferencesWrapper as unknown as T
  }
}

export * from './src/BooleanPreference'
export * from './src/JsonPreference'
export * from './src/NumberPreference'
export * from './src/Preference'
export * from './src/StringPreference'
export * from './types'
