import React, { useState } from 'react'

import makeSeqArray from '@common/helpers/makeSeqArray'

const Pagination = () => {
  const [seqArray, setSeqArray] = useState(makeSeqArray(1, 10))

  return (
    <div>
      <a>previous</a>
      {seqArray.map((item) => (
        <a key={`pagination__${item}`}>{item}</a>
      ))}
      <a>next</a>
    </div>
  )
}
export default Pagination
