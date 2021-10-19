import React from 'react'
import PropTypes from 'prop-types'

import ListTable from '@common/components/ListTable'

const PatientVisitContainer = ({ conditionList, drugList, visitID }) => {
  return (
    <tr>
      <td colSpan="100%">
        <h2>진단 정보</h2>
        <ListTable
          col={5}
          listData={conditionList.filter((item) => item.visitID === visitID)}
        />
        <h2>의약품 처방</h2>
        <ListTable
          col={5}
          listData={drugList.filter((item) => item.visitID === visitID)}
        />
      </td>
    </tr>
  )
}

PatientVisitContainer.propTypes = {
  conditionList: PropTypes.array,
  drugList: PropTypes.array,
  visitID: PropTypes.string,
}

PatientVisitContainer.defaultProps = {
  conditionList: [],
  drugList: [],
  visitID: '',
}

export default PatientVisitContainer
