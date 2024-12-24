import type { EffectCallback } from 'react'
import type { Preferences } from './src/Preferences'
import type { TPreferences } from './src/types'

type TDestructor = ReturnType<EffectCallback>
type TOnLoadReturnType = TDestructor | Promise<TDestructor>
type TOnLoad = () => TOnLoadReturnType

interface IUsePreferencesReturnType<T extends TPreferences> {
  areLoaded: boolean
  preferences: T
  preferencesWrapper: Preferences
}

export type {
  IUsePreferencesReturnType,
  TDestructor,
  TOnLoad,
  TOnLoadReturnType
}
