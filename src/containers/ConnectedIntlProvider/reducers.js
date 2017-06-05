// @flow

import type { Action } from 'models/action'
import type { IntlStateShape, IntlStateRecord } from 'containers/ConnectedIntlProvider'
import { Map } from 'immutable'

import { defineRecord } from 'lib/records'
import {
  CHANGE_LANGUAGE_SUCCESS
} from './action-types'

type LanguagePayload = {
  languageCode: string,
  messages: Map<string, string>
}

export const IntlState = defineRecord('IntlState', ({
  languageCode: '',
  messages: new Map(),
  status: new Map({
    pending: true
  })
}: IntlStateShape))

export default function reducer(state: IntlStateRecord = IntlState(), { type, payload }: Action<*>) {
  switch (type) {

    case CHANGE_LANGUAGE_SUCCESS: {
      if (!payload) return state

      const language: LanguagePayload = payload

      return state.merge({
        languageCode: language.languageCode,
        messages: language.messages,
        status: new Map({
          pending: false
        })
      })
    }

    default:
      return state
  }
}
