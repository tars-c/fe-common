import { call, put } from 'redux-saga/effects'

import getData from '@api/helpers/getData'
import path from '@api/modules/data/path'

const SET_DATA = '@api/SET_DATA'

// redux-saga를 통한 비동기 처리로 API 데이터 Fetch하는 액션 함수
export function* fetchDataSaga(id, params = null) {
  try {
    // 데이터 Fetch
    const data = yield call(getData(path[id](params)))

    // 데이터를 스토어에 저장
    yield put({
      type: SET_DATA,
      id,
      data,
    })
  } catch (error) {
    console.log(error)
  }
}
