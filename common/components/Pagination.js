import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({ seqArray, onClick }) => {
  return (
    <div onClick={onClick}>
      <a>previous</a>
      {seqArray.map((item) => (
        <a key={`pagination__${item}`}>{item}</a>
      ))}
      <a>next</a>
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
