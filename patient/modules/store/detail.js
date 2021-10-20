export const SET_DETAIL = '@detail/SET_DETAIL'

const initialState = {
  detail: {
    conditionList: [],
    visitCount: 0,
  },
}

const detail = (state = initialState, action) => {
  const { type, detail } = action

  switch (type) {
    case SET_DETAIL:
      return {
        detail,
      }
    default:
      return state
  }
}

export default detail
