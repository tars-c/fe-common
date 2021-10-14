import { call, put, takeEvery } from 'redux-saga/effects'

import getData from '@api/helpers/getData'
import path from '@api/modules/data/path'
import { SET_DATA } from '@api/modules/store'

// redux-saga를 통한 비동기 처리로 API 데이터 Fetch하는 액션 함수
function* fetchData(action) {
  const { fetchType, id, params } = action

  try {
    // 데이터 Fetch
    const data = yield call(getData, path[fetchType](id || params))

    // 데이터를 스토어에 저장
    yield put({
      type: SET_DATA,
      id: fetchType,
      data,
    })
  } catch (error) {
    console.log(error)
  }
}

export function* fetchDataSaga() {
  yield takeEvery('FETCH_DATA', fetchData)
}
