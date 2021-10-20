import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const WrapListPagination = styled.select`
  width: 100%;
  height: 30px;
  font-size: 1.2rem;
`

const ListPagination = ({ opts, onChange }) => {
  return (
    <WrapListPagination onChange={onChange}>
      {opts.map((opt, idx) => (
        <option key={`listPagination__${idx}`} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </WrapListPagination>
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
