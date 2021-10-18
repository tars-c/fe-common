import produce from 'immer'

export const SET_FILTER = '@filter/SET_FILTER'

// 필터 설정
export const setFilter = ({ id, value }) => ({ type: SET_FILTER, id, value })

const initialState = {
  filter: {
    gender: null,
    race: null,
    ethnicity: null,
    age_min: null,
    age_max: null,
    death: null,
  },
}

// 테이블 필터 정보를 저장하는 스토어
const filter = (state = initialState, action) => {
  const { type, id, value } = action

  switch (type) {
    case SET_FILTER:
      return produce(state, (draft) => {
        draft.filter[id] = value
      })
    default:
      return state
  }
}
export default filter
