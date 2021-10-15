import React from 'react'
import PropTypes from 'prop-types'
import { FaFilter } from 'react-icons/fa'

const TableFilter = ({ id, onClick }) => {
  return (
    <span id={id} onClick={onClick}>
      <FaFilter />
    </span>
  )
}

TableFilter.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
}

TableFilter.defaultProps = {
  id: '',
  onClick: () => {},
}

export default TableFilter
