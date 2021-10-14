import React from 'react'
import styled from 'styled-components'

import PatientTableContainer from '@patient/containers/PatientTableContainer'

const TableLayout = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 10% 0;
`

function Home() {
  return (
    <TableLayout>
      <PatientTableContainer />
    </TableLayout>
  )
}

export default Home
