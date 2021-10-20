import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'

import createSagaMiddleware from '@redux-saga/core'
import rootReducer, { rootSaga } from '@modules/index'

// saga 미들웨어 연결
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
