import type { Preference } from './Preference'

type TPreferences = Record<string, Preference<unknown>>
type TStringOrSymbol = string | symbol
type TThat = Record<TStringOrSymbol, unknown>

export type { TPreferences, TStringOrSymbol, TThat }
