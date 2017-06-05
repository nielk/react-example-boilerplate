import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { ConnectedIntlProviderReducer } from 'containers/ConnectedIntlProvider'
import { AppContainerReducer } from 'containers/AppContainer'

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    intl: ConnectedIntlProviderReducer,
    appContainer: AppContainerReducer
    ...asyncReducers
  })
}
