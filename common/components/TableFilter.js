import React from 'react'
import PropTypes from 'prop-types'
import { FaFilter } from 'react-icons/fa'

const TableFilter = ({ onClick }) => {
  return <FaFilter onClick={onClick} />
}

TableFilter.propTypes = {
  onClick: PropTypes.func,
}

TableFilter.defaultProps = {
  onClick: () => {},
}

export default TableFilter
