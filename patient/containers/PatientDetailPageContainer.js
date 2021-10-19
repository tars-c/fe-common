import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import Table from '@common/components/Table'
import PatientVisitContainer from '@patient/containers/PatientVisitContainer'
import { pVisitCategory } from '@patient/consts/patientDetailConst'

const WrapPageTitle = styled.h1`
  font-size: 2rem;
`

const PatientDetailpageContainer = ({ id }) => {
  const { patientCond, patientDrug, patientVisit } = useSelector(
    (state) => state.api,
  )
  const dispatch = useDispatch()
  const [visitID, setVisitID] = useState()

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

  const handleItemClick = (e) => {
    const trow = e.target.closest('TR')

    if (trow) {
      const { id } = e.target.closest('TR')
      if (id) setVisitID(id)
    }
  }

  return (
    <>
      <WrapPageTitle>{id} 환자 방문 기록</WrapPageTitle>
      {patientVisit?.visitList && (
        <Table
          categories={pVisitCategory}
          dataList={patientVisit.visitList}
          itemId="visitID"
          detailId={visitID}
          onItemClick={handleItemClick}
        >
          {visitID && (
            <PatientVisitContainer
              conditionList={patientCond.conditionList.filter(
                (item) => item.visitID == visitID,
              )}
              drugList={patientDrug.drugList.filter(
                (item) => item.visitID == visitID,
              )}
              visitID={visitID}
            />
          )}
        </Table>
      )}
    </>
  )
}

PatientDetailpageContainer.propTypes = {
  id: PropTypes.string,
}
PatientDetailpageContainer.defaultProps = {
  id: '',
}

export default PatientDetailpageContainer
