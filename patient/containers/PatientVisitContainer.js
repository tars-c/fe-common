import React from 'react'
import PropTypes from 'prop-types'

import Table from '@common/components/Table'
import {
  pCondCategory,
  pDrugCategory,
} from '@patient/consts/patientDetailConst'

const PatientVisitContainer = ({ conditionList, drugList }) => {
  return (
    <tr>
      <td colSpan="100%">
        <h2>진단 정보</h2>
        <Table categories={pCondCategory} dataList={conditionList} />
        <h2>의약품 처방</h2>
        <Table categories={pDrugCategory} dataList={drugList} />
      </td>
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
