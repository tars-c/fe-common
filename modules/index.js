import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'

import api from '@api/modules/store'
import patient from '@patient/modules/store'
import { fetchDataSaga } from '@api/modules/saga/fetchData'
import { fetchDetailSaga } from '@patient/modules/saga/fetchDetail'

const rootReducer = combineReducers({
  api,
  patient,
})

export function* rootSaga() {
  yield all([fetchDataSaga(), fetchDetailSaga()])
}

export default rootReducer
