import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Table from '@common/components/Table'
import {
  pCondCategory,
  pDrugCategory,
} from '@patient/consts/patientDetailConst'

const WrapTitle = styled.h2`
  margin: 15px 0;
`
const WrapVisitContent = styled.td`
  padding: 0 20px 20px;
`

const PatientVisitContainer = ({ conditionList, drugList }) => {
  return (
    <tr>
      <WrapVisitContent colSpan="100%">
        <WrapTitle>진단 정보</WrapTitle>
        {conditionList.length > 0 ? (
          <Table categories={pCondCategory} dataList={conditionList} />
        ) : (
          '없음'
        )}

        <WrapTitle>의약품 처방</WrapTitle>
        {drugList.length > 0 ? (
          <Table categories={pDrugCategory} dataList={drugList} />
        ) : (
          '없음'
        )}
      </WrapVisitContent>
    </tr>
  )
}

PatientVisitContainer.propTypes = {
  conditionList: PropTypes.array,
  drugList: PropTypes.array,
}

PatientVisitContainer.defaultProps = {
  conditionList: [],
  drugList: [],
}

export default PatientVisitContainer
