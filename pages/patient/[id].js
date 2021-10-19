import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { BiArrowBack } from 'react-icons/bi'

import PatientDetailpageContainer from '@patient/containers/PatientDetailPageContainer'
import { LINK_HOVER_COLOR } from '@common/styles/variables'

const WrapLink = styled.a`
  display: inline-flex;
  margin: 10px;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${LINK_HOVER_COLOR};
    cursor: pointer;
  }
`

const WrapDetailPage = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 15% 0;
`

const Patient = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Link href="/">
        <WrapLink>
          <BiArrowBack />
          전체 환자 목록
        </WrapLink>
      </Link>
      {id && (
        <WrapDetailPage>
          <PatientDetailpageContainer id={id} />
        </WrapDetailPage>
      )}
    </>
  )
}

export default Patient
