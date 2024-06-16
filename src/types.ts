interface IValueType {
  name: string
}

export interface IPreferenceParams<T> {
  defaultValue: T
  name: string
  valueTypes: IValueType | IValueType[]
}
