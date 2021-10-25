import path from '../modules/data/path'

describe('API 접근 경로', () => {
  const query = {
    page: 10,
    length: 20,
    order_column: 'person_id',
    order_desc: false,
    gender: undefined,
    race: null,
    ethnicity: '',
  }

  test('환자 리스트 API URL 경로 쿼리문 생성 및 null, undefined 공백 필터링 (false x)', () => {
    expect(path.patient(query)).toBe(
      `/patient/list?page=10&length=20&order_column=person_id&order_desc=false`,
    )
  })
})
