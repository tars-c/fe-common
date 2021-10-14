import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Table from '@common/components/Table'
import filterPatient from '@patient/helpers/filterPatient'
import { patientCategories } from '@patient/consts/patientTableConst'

const PatientTableContainer = () => {
  const {
    patient: { patient },
  } = useSelector((state) => state.api)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'FETCH_DATA', fetchType: 'patient' })
  }, [])

  if (!patient) return <div>로딩중...</div>

  return (
    <Table
      categories={patientCategories}
      dataList={filterPatient(patient.list)}
    ></Table>
  )
}
export default PatientTableContainer
