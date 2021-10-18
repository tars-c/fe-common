import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FaFilter } from 'react-icons/fa'

const WrapFilter = styled.span`
  display: inline-block;
  margin: 0 0 0 3px;
  cursor: pointer;

  &:hover {
    transform: scale(1.2, 1.2);
    transition: all 0.3s ease-in-out;
  }
`

const TableFilter = ({ id, onClick }) => {
  return (
    <WrapFilter id={id} onClick={onClick}>
      <FaFilter />
    </WrapFilter>
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
