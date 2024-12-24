import type { Preference } from './Preference'

interface IPreference {
  toString: () => string
}

type TPreferences = Record<string, Preference<IPreference>>
type TStringOrSymbol = string | symbol
type TThat = Record<TStringOrSymbol, unknown>

export type { IPreference, TPreferences, TStringOrSymbol, TThat }
