import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ListPagination from '@common/components/ListPagination'
import Pagination from '@common/components/Pagination'
import Table from '@common/components/Table'
import makeSeqArray from '@common/helpers/makeSeqArray'
import PatinetFilterContainer from '@patient/containers/PatientFilterContainer'
import filterPatient from '@patient/helpers/filterPatient'
import {
  patientCategories,
  paginationOpts,
  PAGE_CNT,
  initListFetch,
} from '@patient/consts/patientTableConst'
import { setFilter } from '@patient/modules/store/filter'
import { setPage, setPageLength } from '@patient/modules/store/pagination'

const PatientTableContainer = () => {
  const { patient, race, gender, ethnicity } = useSelector((state) => state.api)
  const { page, length } = useSelector((state) => state.patient.pagination)
  const { filter } = useSelector((state) => state.patient.filter)

  const dispatch = useDispatch()

  const [orderDesc, setOrderDesc] = useState({
    desc: false,
    befOrderName: '',
  })
  const [range, setRange] = useState({ start: 1, end: 10 })

  const initFilterInfo = {
    id: '',
    list: null,
    type: '',
    value: null,
    onReset: () => {},
    onChange: () => {},
  }
  const [filterInfo, setFilterInfo] = useState(initFilterInfo)

  useEffect(() => {
    initFetch()
  }, [])

  const initFetch = () => {
    dispatch({
      type: 'FETCH_DATA',
      fetchType: 'patient',
      params: { page, length, ...filter },
    })
    initListFetch.forEach((list) => {
      dispatch({ type: 'FETCH_DATA', fetchType: list })
    })
  }

  // 리스트 페이지네이션 이벤트 핸들러
  const handleListChange = (e) => {
    const newLength = e.target.value

    try {
      dispatch({
        type: 'FETCH_DATA',
        fetchType: 'patient',
        params: { page: 1, length: newLength, ...filter },
      })
      dispatch(setPageLength(newLength))

      dispatch(setPage(1))
      setRange({ start: 1, end: 10 })
      setFilterInfo(initFilterInfo)
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

    if (name === 'prev') {
      // 앞 단계 페이지
      newPage = page - PAGE_CNT

      if (newPage <= 0) return

      setRange({
        start: parseInt((newPage - 1) / PAGE_CNT) * PAGE_CNT + 1,
        end: parseInt((newPage - 1) / PAGE_CNT) * PAGE_CNT + PAGE_CNT,
      })
    } else if (name === 'next') {
      // 뒤 단계 페이지
      newPage = page + PAGE_CNT

      if (newPage > limitPage) return

      setRange({
        start: parseInt((newPage - 1) / PAGE_CNT) * PAGE_CNT + 1,
        end: parseInt((newPage - 1) / PAGE_CNT) * PAGE_CNT + PAGE_CNT,
      })
    } else if (name === 'num') {
      // 번호 페이지
      newPage = parseInt(id)
    }

    try {
      dispatch({
        type: 'FETCH_DATA',
        fetchType: 'patient',
        params: { page: newPage, length, ...filter },
      })
      dispatch(setPage(newPage))
    } catch (e) {
      console.error(e)
    }
  }

  // 테이블 헤더 클릭 이벤트 핸들러 - 테이블 컬럼 정렬
  const handleTableHeadClick = (e) => {
    const { id } = e.target

    if (!id) return

    dispatch({
      type: 'FETCH_DATA',
      fetchType: 'patient',
      params: {
        page,
        length,
        order_column: id,
        order_desc: orderDesc.desc,
        ...filter,
      },
    })
    setOrderDesc({
      desc: id === orderDesc.befOrderName ? !orderDesc.desc : false,
      befOrderName: id,
    })
  }

  // 테이블 필터 클릭 이벤트 핸들러
  const handleFilterClick = (e) => {
    e.stopPropagation()
    const { id } = e.target.closest('SPAN')

    if (!id) return

    let newFilter = {
      ...filter,
    }

    // 필터 이벤트(초기화, 설정) -> 이후 API 데이터 리로드
    let newFilterInfo = {
      onReset: (e) => {
        e.preventDefault()

        newFilter[id] = null
        dispatch(setFilter({ id, value: null }))
        dispatch({
          type: 'FETCH_DATA',
          fetchType: 'patient',
          params: { page, length, ...newFilter },
        })
      },
      onChange: (e) => {
        dispatch(setFilter({ id, value: e.target.value }))

        newFilter[id] = e.target.value
        dispatch({
          type: 'FETCH_DATA',
          fetchType: 'patient',
          params: { page, length, ...newFilter },
        })
      },
    }

    // 필터 항목 설정
    if (id === 'gender') {
      newFilterInfo = {
        ...newFilterInfo,
        id,
        list: gender.genderList,
        type: 'radio',
        value: gender.genderList,
      }
    } else if (id === 'age') {
      newFilterInfo = {
        ...newFilterInfo,
        id,
        list: ['minAge', 'maxAge'],
        type: 'number',
        value: [filter.age_min, filter.age_max],
        onReset: (e) => {
          e.preventDefault()
          dispatch(setFilter(age_min, null))
          dispatch(setFilter(age_max, null))
        },
      }
    } else if (id === 'race') {
      newFilterInfo = {
        ...newFilterInfo,
        id,
        list: race.raceList,
        type: 'radio',
        value: race.raceList,
      }
    } else if (id === 'ethnicity') {
      newFilterInfo = {
        ...newFilterInfo,
        id,
        list: ethnicity.ethnicityList,
        type: 'radio',
        value: ethnicity.ethnicityList,
      }
    } else if (id === 'isDeath') {
      newFilterInfo = {
        ...newFilterInfo,
        id: 'death',
        list: ['Y', 'N'],
        type: 'radio',
        value: ['true', 'false'],
        onReset: (e) => {
          e.preventDefault()
          dispatch(setFilter({ id: 'death', value: null }))

          newFilter.death = null
          dispatch({
            type: 'FETCH_DATA',
            fetchType: 'patient',
            params: { page, length, ...newFilter },
          })
        },
        onChange: (e) => {
          dispatch(setFilter({ id: 'death', value: e.target.value }))

          newFilter.death = e.target.value
          dispatch({
            type: 'FETCH_DATA',
            fetchType: 'patient',
            params: { page, length, ...newFilter },
          })
        },
      }
    }
    setFilterInfo(newFilterInfo)
  }

  if (!patient || !patient.patient) return <div>로딩중...</div>

  return (
    <>
      <ListPagination opts={paginationOpts} onChange={handleListChange} />
      <Table
        categories={patientCategories}
        dataList={filterPatient(patient.patient.list)}
        onClick={handleTableHeadClick}
        onFilterClick={handleFilterClick}
      />
      <Pagination
        seqArray={makeSeqArray(range)}
        curr={page}
        onClick={handlePaginationClick}
      />
      {filterInfo.list && (
        <PatinetFilterContainer filter={filter} {...filterInfo} />
      )}
    </>
  )
}
export default PatientTableContainer
