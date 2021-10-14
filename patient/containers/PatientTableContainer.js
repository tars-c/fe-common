import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ListPagination from '@common/components/ListPagination'
import Pagination from '@common/components/Pagination'
import Table from '@common/components/Table'
import filterPatient from '@patient/helpers/filterPatient'
import {
  patientCategories,
  paginationOpts,
} from '@patient/consts/patientTableConst'
import { setPageLength } from '@patient/modules/store/pagination'
import makeSeqArray from '@common/helpers/makeSeqArray'

const PatientTableContainer = () => {
  const {
    patient: { patient, totalLength },
  } = useSelector((state) => state.api)
  const { page, length } = useSelector((state) => state.patient.pagination)

  const dispatch = useDispatch()

  const [range, setRange] = useState({ start: 1, end: 1 })

  useEffect(() => {
    dispatch({
      type: 'FETCH_DATA',
      fetchType: 'patient',
      params: { page, length },
    })
    setRange({
      start: 1,
      end: Math.ceil(totalLength / length) < 10 ? totalLength / length : 10,
    })
  }, [])

  // 리스트 페이지네이션 이벤트 핸들러
  const handleListChange = (e) => {
    const newLength = e.target.value

    dispatch({
      type: 'FETCH_DATA',
      fetchType: 'patient',
      params: { page, length: newLength },
    })
    dispatch(setPageLength(newLength))
  }

  if (!patient) return <div>로딩중...</div>

  return (
    <>
      <ListPagination opts={paginationOpts} onChange={handleListChange} />
      <Table
        categories={patientCategories}
        dataList={filterPatient(patient.list)}
      />
      <Pagination seqArray={makeSeqArray(range)} />
    </>
  )
}
export default PatientTableContainer
