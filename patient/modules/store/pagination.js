export const SET_PAGE_NUM = '@pagination/SET_PAGE_NUM'
export const SET_PAGE_LENGTH = '@pagination/SET_PAGE_LENGTH'

// 페이지 번호 설정
export const setPage = (page) => ({ type: SET_PAGE_NUM, page })

// 페이지 길이 설정
export const setPageLength = (length) => ({ type: SET_PAGE_LENGTH, length })

const initialState = {
  page: 1,
  length: 10,
}

// 페이지네이션 관련 정보를 저장하는 스토어
const pagination = (state = initialState, action) => {
  const { type, page, length } = action

  switch (type) {
    case SET_PAGE_NUM:
      return {
        ...state,
        page,
      }
    case SET_PAGE_LENGTH:
      return {
        ...state,
        length,
      }
    default:
      return state
  }
}
export default pagination
