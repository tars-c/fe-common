import { combineReducers } from 'redux'

import api from '@api/modules/store'
import { fetchDataSaga } from '@api/modules/saga/fetchData'
import { all } from 'redux-saga/effects'

const rootReducer = combineReducers({
  api,
})

export function* rootSaga() {
  yield all([fetchDataSaga])
}

export default rootReducer
