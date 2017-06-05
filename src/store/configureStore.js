import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import DevTools from 'components/DevTools'
import createReducer from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(preloadedState = {}, history) {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ]

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  if (__DEV__) {
    enhancers.push(DevTools.instrument())
  }

  const composedEnhancers = compose(...enhancers)


  const store = createStore(
    createReducer(),
    preloadedState,
    composedEnhancers
  )

  // Extensions
  store.runSaga = sagaMiddleware.run(rootSaga)
  store.asyncReducers = {}

  // http://mxs.is/googmo
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      import('../reducers').then((reducerModule) => {
        const createReducers = reducerModule.default
        const nextReducers = createReducers(store.asyncReducers)

        store.replaceReducer(nextReducers)
      })
    })
  }

  return store
}
