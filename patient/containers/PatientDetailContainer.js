import React from 'react'
import PropTypes from 'prop-types'

const PatientDetailContainer = ({ detail }) => {
  return (
    <tr onClick={(e) => e.stopPropagation()}>
      <td>
        <h2>
          방문 횟수 : <span>{detail.visitCount}</span>
        </h2>
        <h2>진단 정보</h2>
        <ul>
          {detail.conditionList.map((d, idx) => (
            <li key={`detailCondition__${idx}`}>{d}</li>
          ))}
        </ul>
        <div>상세 페이지 바로가기</div>
      </td>
    </tr>
  )
}

PatientDetailContainer.propTypes = {
  detail: PropTypes.object,
}

PatientDetailContainer.defaultProps = {
  detail: {},
}

export default PatientDetailContainer
