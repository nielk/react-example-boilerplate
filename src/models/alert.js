// @flow

import { Record } from 'immutable'

export type AlertType = 'SUCCESS' | 'WARNING' | 'DANGER' | 'INFO'
export type AlertShape = {
  id: string,
  type: AlertType,
  name: string,
  message: string
}

export const Alert = Record({
  id: null,
  type: 'INFO',
  name: null,
  message: null
})
