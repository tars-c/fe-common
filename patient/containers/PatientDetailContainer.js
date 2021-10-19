import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'

import { BiLinkExternal } from 'react-icons/bi'

import ListTable from '@common/components/ListTable'

const WrapDetailTitle = styled.h2`
  margin: 15px 0;
`
const WrapDetailInfo = styled.tr`
  text-align: center;
`
const WrapTableContent = styled.div`
  padding: 0 20px;
`
const WrapDetailPageLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  &:hover {
    color: #3388aa;
    cursor: pointer;
  }
`

const PatientDetailContainer = ({ pid, detail }) => {
  return (
    <WrapDetailInfo onClick={(e) => e.stopPropagation()}>
      <td colSpan="100%">
        <WrapDetailTitle>
          방문 횟수 : <span>{detail.visitCount}</span>
        </WrapDetailTitle>
        <WrapDetailTitle>진단 정보</WrapDetailTitle>
        <WrapTableContent>
          <ListTable col={5} listData={detail.conditionList} />
        </WrapTableContent>
        <Link href={`/patient/${pid}`}>
          <WrapDetailPageLink>
            <BiLinkExternal />
            상세 페이지 바로가기
          </WrapDetailPageLink>
        </Link>
      </td>
    </WrapDetailInfo>
  )
}

PatientDetailContainer.propTypes = {
  pid: PropTypes.string,
  detail: PropTypes.object,
}

PatientDetailContainer.defaultProps = {
  pid: '',
  detail: {},
}

export default PatientDetailContainer
