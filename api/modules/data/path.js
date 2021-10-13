const path = {
  patientList: (params) => {
    let defaultPath = `/patient/list`

    for (const [key, value] of Object.entries(params))
      defaultPath += `?${key}=${value}`

    return defaultPath
  },
  raceList: () => `/race/list`,
  genderList: () => `/gender/list`,
  ethnicityList: () => `/ethnicity/list`,
  patientBrief: (id) => `/patient/brief/${id}`,
  patientCond: (id) => `/patient/detail/${id}/condition`,
  patientDrug: (id) => `/patient/detail/${id}/drug`,
  patientVisit: (id) => `/patient/detail/$${id}/visit`,
}

export default path
