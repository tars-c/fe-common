const path = {
  patient: (query) => {
    let defaultPath = `/patient/list`

    if (query) {
      for (const [key, value] of Object.entries(query))
        defaultPath += `?${key}=${value}`
    }

    return defaultPath
  },
  race: () => `/race/list`,
  gender: () => `/gender/list`,
  ethnicity: () => `/ethnicity/list`,
  patientBrief: (id) => `/patient/brief/${id}`,
  patientCond: (id) => `/patient/detail/${id}/condition`,
  patientDrug: (id) => `/patient/detail/${id}/drug`,
  patientVisit: (id) => `/patient/detail/$${id}/visit`,
}

export default path
