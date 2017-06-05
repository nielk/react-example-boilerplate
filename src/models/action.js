// @flow

export type ActionType = string
export type Action<T> = {
  type: ActionType,
  payload?: T
}
