import React from 'react'
import styled from 'styled-components'

import PatientTableContainer from '@patient/containers/PatientTableContainer'

const WrapTableLayout = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 15% 0;
`

function Home() {
  return (
    <WrapTableLayout>
      <PatientTableContainer />
    </WrapTableLayout>
  )
}

export default Home
