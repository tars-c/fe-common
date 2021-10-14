import React from 'react'
import PropTypes from 'prop-types'

const ListPagination = ({ opts, onChange }) => {
  return (
    <select onChange={onChange}>
      {opts.map((opt, idx) => (
        <option key={`listPagination__${idx}`} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  )
}

ListPagination.propTypes = {
  opts: PropTypes.array,
  onChange: PropTypes.func,
}

ListPagination.defaultProps = {
  opts: [],
  onChange: () => {},
}

export default ListPagination
