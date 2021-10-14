import { useState } from 'react'

import makeSeqArray from '@common/helpers/makeSeqArray'

const Pagination = () => {
  const [seqArray, setSeqArray] = useState(makeSeqArray(1, 10))

  return (
    <div>
      <div>previous</div>
      {seqArray.map((item) => (
        <div key={`pagination__${item}`}>{item}</div>
      ))}
      <div>next</div>
    </div>
  )
}
export default Pagination
