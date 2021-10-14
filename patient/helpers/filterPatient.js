const filterPatient = (patientList) => {
  return patientList.map((patient) => {
    return {
      ...patient,
      isDeath: patient.isDeath ? 'Y' : 'N',
    }
  })
}

export default filterPatient
