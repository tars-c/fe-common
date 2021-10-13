export default {
  patientList: (params) => {
    let defaultPath = `/api/patient/list`

    for (const [key, value] of Object.entries(params))
      defaultPath += `?${key}=${value}`

    return defaultPath
  },
  raceList: `/api/race/list`,
  genderList: `/api/gender/list`,
  ethnicityList: `/api/ethnicity/list`,
  patientBrief: (id) => `/api/patient/brief/${id}`,
  patientCond: (id) => `/api/patient/detail/${id}/condition`,
  patientDrug: (id) => `/api/patient/detail/${id}/drug`,
  patientVisit: (id) => `/api/patient/detail/$${id}/visit`,
}
