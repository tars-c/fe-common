import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ListPagination from '@common/components/ListPagination'
import Pagination from '@common/components/Pagination'
import Table from '@common/components/Table'
import makeSeqArray from '@common/helpers/makeSeqArray'
import filterPatient from '@patient/helpers/filterPatient'
import {
  patientCategories,
  paginationOpts,
  PAGE_CNT,
} from '@patient/consts/patientTableConst'
import { setPage, setPageLength } from '@patient/modules/store/pagination'

const PatientTableContainer = () => {
  const {
    patient: { patient },
  } = useSelector((state) => state.api)
  const { page, length } = useSelector((state) => state.patient.pagination)

  const dispatch = useDispatch()

  const [range, setRange] = useState({ start: 1, end: 10 })

  useEffect(() => {
    dispatch({
      type: 'FETCH_DATA',
      fetchType: 'patient',
      params: { page, length },
    })
  }, [])

  // 리스트 페이지네이션 이벤트 핸들러
  const handleListChange = (e) => {
    const newLength = e.target.value

    try {
      dispatch({
        type: 'FETCH_DATA',
        fetchType: 'patient',
        params: { page, length: newLength },
      })
      dispatch(setPageLength(newLength))
    } catch (e) {
      console.error(e)
    }
  }

  // 페이지네이션 클릭 이벤트 핸들러
  const handlePaginationClick = (e) => {
    const { name, id } = e.target
    const { totalLength } = patient

    if (!name) return

    const limitPage = Math.ceil(Number(totalLength) / Number(length))
    let newPage

    // 앞 단계 페이지
    if (name === 'prev') {
      newPage = page - PAGE_CNT

      if (newPage <= 0) return

      setRange({
        start: parseInt((newPage - 1) / PAGE_CNT) * PAGE_CNT + 1,
        end: parseInt((newPage - 1) / PAGE_CNT) * PAGE_CNT + PAGE_CNT,
      })
    }
    // 뒤 단계 페이지
    else if (name === 'next') {
      newPage = page + PAGE_CNT

      if (newPage > limitPage) return

      setRange({
        start: parseInt((newPage - 1) / PAGE_CNT) * PAGE_CNT + 1,
        end: parseInt((newPage - 1) / PAGE_CNT) * PAGE_CNT + PAGE_CNT,
      })
    }
    // 번호 페이지
    else if (name === 'num') newPage = parseInt(id)

    try {
      dispatch({
        type: 'FETCH_DATA',
        fetchType: 'patient',
        params: { page: newPage, length },
      })
      dispatch(setPage(newPage))
    } catch (e) {
      console.error(e)
    }
  }

  if (!patient) return <div>로딩중...</div>

  return (
    <section>
      <ListPagination opts={paginationOpts} onChange={handleListChange} />
      <Table
        categories={patientCategories}
        dataList={filterPatient(patient.list)}
      />
      <Pagination
        seqArray={makeSeqArray(range)}
        onClick={handlePaginationClick}
      />
    </section>
  )
}
export default PatientTableContainer
