import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Table from '@common/components/Table'
import filterPatient from '@common/helpers/filterPatient'
import { patientCategories } from '@common/consts/patientTableConst'

const PatientTableContainer = () => {
  const {
    patient: {
      patient: { list },
    },
  } = useSelector((state) => state.api)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'FETCH_DATA', fetchType: 'patient' })
  }, [])

  return (
    <Table
      categories={patientCategories}
      dataList={filterPatient(list)}
    ></Table>
  )
}
export default PatientTableContainer
