import React, { useEffect } from 'react'
import Link from 'next/link'

import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

const Patient = () => {
  const router = useRouter()
  const { id } = router.query

  const { patientCond, patientDrug, patientVisit } = useSelector(
    (state) => state.api,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    detailInfoFetch()
  }, [])

  const detailInfoFetch = () => {
    dispatch({ type: 'FETCH_DATA', fetchType: 'patientCond', id })
    dispatch({ type: 'FETCH_DATA', fetchType: 'patientDrug', id })
    dispatch({ type: 'FETCH_DATA', fetchType: 'patientVisit', id })
  }

  return (
    <div>
      <Link href="/">
        <a>전체 환자 목록</a>
      </Link>
    </div>
  )
}

export default Patient
