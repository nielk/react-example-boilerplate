import { fork } from 'redux-saga/effects'
import { watchInitLanguage, watchChangeLanguage } from 'containers/ConnectedIntlProvider'

export default function* root() {
  yield [
    fork(watchInitLanguage),
    fork(watchChangeLanguage)
  ]
}
