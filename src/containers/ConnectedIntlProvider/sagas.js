import { put, takeEvery } from 'redux-saga/effects'

import loadLanguage from '../../i18n'
import {
  INIT_REQUEST,
  CHANGE_LANGUAGE_REQUEST
} from './action-types'
import {
  changeLanguageSuccess,
  changeLanguageFailure
} from './actions'

function* changeLanguage(action) {
  try {
    const languageCode = action.payload
    const language = yield loadLanguage(languageCode)

    yield put(changeLanguageSuccess(language))
  } catch (error) {
    yield put(changeLanguageFailure(error))
  }
}

function* initLanguage() {
  try {
    // Define user's language from navigator
    const navigatorLanguageCode = (navigator.languages && navigator.languages[0]) ||
                                  navigator.language ||
                                  navigator.userLanguage

    // Split locales with a region code
    const navigatorWithoutRegionCode = navigatorLanguageCode.toLowerCase().split(/[_-]+/)[0]

    // Use language from local storage, fallback to navigator language
    const languageCode = navigatorWithoutRegionCode

    const language = yield loadLanguage(languageCode)

    yield put(changeLanguageSuccess(language))
  } catch (error) {
    yield put(changeLanguageFailure(error))
  }
}

function* watchInitLanguage() {
  yield takeEvery(INIT_REQUEST, initLanguage)
}

function* watchChangeLanguage() {
  yield takeEvery(CHANGE_LANGUAGE_REQUEST, changeLanguage)
}

export { watchInitLanguage, watchChangeLanguage }
