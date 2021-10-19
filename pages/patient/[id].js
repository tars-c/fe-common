import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiArrowBack } from 'react-icons/bi'
import PatientDetailpageContainer from '@patient/containers/PatientDetailPageContainer'

const Patient = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Link href="/">
        <div>
          <BiArrowBack />
          <a>전체 환자 목록</a>
        </div>
      </Link>
      {id && <PatientDetailpageContainer id={id} />}
    </>
  )
}

export default Patient
