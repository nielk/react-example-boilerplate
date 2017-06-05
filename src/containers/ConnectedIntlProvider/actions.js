// @flow

import type { Action } from 'models/action'
import type { Language } from 'models/language'

import {
  INIT_REQUEST,
  CHANGE_LANGUAGE_REQUEST,
  CHANGE_LANGUAGE_SUCCESS,
  CHANGE_LANGUAGE_FAILURE
} from 'containers/ConnectedIntlProvider/action-types'

export function initLanguage(): Action<null> {
  return {
    type: INIT_REQUEST
  }
}

export function changeLanguage(languageCode: string): Action<string> {
  return {
    type: CHANGE_LANGUAGE_REQUEST,
    payload: languageCode
  }
}

export function changeLanguageSuccess(language: Language): Action<Language> {
  return {
    type: CHANGE_LANGUAGE_SUCCESS,
    payload: language
  }
}

export function changeLanguageFailure(error: *): Action<*> {
  return {
    type: CHANGE_LANGUAGE_FAILURE,
    payload: error
  }
}
