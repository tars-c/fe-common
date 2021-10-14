import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({ seqArray, onClick }) => {
  return (
    <div onClick={onClick}>
      <a name="prev">previous</a>
      {seqArray.map((item) => (
        <a id={item} name="num" key={`pagination__${item}`}>
          {item}
        </a>
      ))}
      <a name="next">next</a>
    </div>
  )
}

Pagination.propTypes = {
  range: PropTypes.array,
  onClick: PropTypes.func,
}
Pagination.defaultProps = {
  seqArray: [1],
  onClick: () => {},
}

export default Pagination
