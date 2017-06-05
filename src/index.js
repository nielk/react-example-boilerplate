import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import { AppContainer as AppContainerHMR } from 'react-hot-loader'

import DevTools from 'components/DevTools'
import ConnectedIntlProvider from 'containers/ConnectedIntlProvider'

import configureStore from './store/configureStore'
import routes from './routes'
import Conf from './services/conf'

import './themes/main.scss'

const store = configureStore({}, hashHistory)
const history = syncHistoryWithStore(hashHistory, store)

const bootApp = () => {
  render(
    <AppContainerHMR>
      <Provider store={store}>
        <ConnectedIntlProvider>
          <div>
            <Router history={history} routes={routes} />
            {__DEV__ ? <DevTools /> : null}
          </div>
        </ConnectedIntlProvider>
      </Provider>
    </AppContainerHMR>,
    document.querySelector('#root')
  )
}

// App entry point
Conf.load()
  .then(bootApp)
