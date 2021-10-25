import getData from '../helpers/getData'

const getDataMock = jest.fn(getData)

describe('API 데이터 체크', () => {
  test('환자 데이터 속성 체크', async () => {
    const { patient } = await getDataMock(`/patient/list`)
    const patientProp = [
      'age',
      'birthDatetime',
      'ethnicity',
      'gender',
      'isDeath',
      'personID',
      'race',
    ]

    patient.list.forEach((data) => {
      patientProp.forEach((prop) => expect(data).toHaveProperty(prop))
    })
  })
  test('민족 리스트 value 체크', async () => {
    const { ethnicityList } = await getDataMock(`/ethnicity/list`)
    const ethnicityArr = ['nonhispanic', 'hispanic']

    expect(ethnicityList).toStrictEqual(ethnicityArr)
  })
  test('성별 리스트 value 체크', async () => {
    const { genderList } = await getDataMock(`/gender/list`)
    const genderArr = ['M', 'F']

    expect(genderList).toStrictEqual(genderArr)
  })
  test('인종 리스트 value 체크', async () => {
    const { raceList } = await getDataMock(`/race/list`)
    const raceArr = ['other', 'native', 'black', 'white', 'asian']

    expect(raceList).toStrictEqual(raceArr)
  })
})
