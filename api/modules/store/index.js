import produce from 'immer'

export const SET_DATA = '@api/SET_DATA'

// Fetch한 API 데이터를 스토어에서 관리
const initialState = {
  patient: {},
  race: {},
  gender: {},
  ethnicityList: {},
  patientBrief: {},
  patientCond: {},
  patientDrug: {},
  patientVisit: {},
}

const api = (state = initialState, action) => {
  const { type, id, data } = action

  switch (type) {
    case SET_DATA:
      return produce(state, (draft) => {
        draft[id] = data
      })
    default:
      return state
  }
}

export default api
