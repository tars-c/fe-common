import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Table from '@common/components/Table'
import { pVisitCategory } from '@patient/consts/patientDetailConst'

const PatientDetailpageContainer = ({ id }) => {
  const { patientCond, patientDrug, patientVisit } = useSelector(
    (state) => state.api,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    detailInfoFetch()
  }, [])

  const detailInfoFetch = () => {
    if (id) {
      dispatch({ type: 'FETCH_DATA', fetchType: 'patientCond', id })
      dispatch({ type: 'FETCH_DATA', fetchType: 'patientDrug', id })
      dispatch({ type: 'FETCH_DATA', fetchType: 'patientVisit', id })
    }
  }

  return (
    <>
      <h1>{id} 환자 방문 기록</h1>
      {patientVisit?.visitList && (
        <Table categories={pVisitCategory} dataList={patientVisit.visitList} />
      )}
    </>
  )
}
export default PatientDetailpageContainer
