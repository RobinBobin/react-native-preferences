import type { EffectCallback } from 'react'
import type { TPreferences } from './src/types'

type TDestructor = ReturnType<EffectCallback>
type TOnLoadReturnType = TDestructor | Promise<TDestructor>
type TOnLoad = () => TOnLoadReturnType

interface IUsePreferencesReturnType<T extends TPreferences> {
  areLoaded: boolean
  preferences: T
}

export type {
  IUsePreferencesReturnType,
  TDestructor,
  TOnLoad,
  TOnLoadReturnType
}
