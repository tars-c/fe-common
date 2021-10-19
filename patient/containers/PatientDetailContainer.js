import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { BiLinkExternal } from 'react-icons/bi'

const WrapDetailInfo = styled.tr`
  text-align: center;
`
const WrapDetailList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`
const WrapDetailPageLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #3388aa;
    cursor: pointer;
  }
`

const PatientDetailContainer = ({ detail }) => {
  return (
    <WrapDetailInfo onClick={(e) => e.stopPropagation()}>
      <td colSpan="100%">
        <h2>
          방문 횟수 : <span>{detail.visitCount}</span>
        </h2>
        <h2>진단 정보</h2>
        <WrapDetailPageLink>
          <BiLinkExternal />
          상세 페이지 바로가기
        </WrapDetailPageLink>
      </td>
    </WrapDetailInfo>
  )
}

PatientDetailContainer.propTypes = {
  detail: PropTypes.object,
}

PatientDetailContainer.defaultProps = {
  detail: {},
}

export default PatientDetailContainer
