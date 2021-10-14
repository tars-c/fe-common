import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'

import api from '@api/modules/store'
import { fetchDataSaga } from '@api/modules/saga/fetchData'

const rootReducer = combineReducers({
  api,
})

export function* rootSaga() {
  yield all([fetchDataSaga()])
}

export default rootReducer
