import { call, put, takeEvery } from 'redux-saga/effects'

import getData from '@api/helpers/getData'
import path from '@api/modules/data/path'
import { SET_DETAIL } from '@patient/modules/store/detail'

export function* fetchDetail(action) {
  try {
    const { fetchType, pid } = action
    const detail = yield call(getData(path[fetchType](pid)))

    yield put({ type: SET_DETAIL, detail })
  } catch (e) {
    console.error(error)
  }
}

export function* fetchDetailSaga() {
  yield takeEvery('FETCH_DETAIL', fetchDetail)
}
