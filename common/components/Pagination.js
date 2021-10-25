import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { PAGINATION_COLOR } from '@common/styles/variables'

const WrapPagination = styled.div`
  display: flex;
`
const WrapPaginationBtn = styled.a`
  display: block;
  margin: 15px 3px 0;
  padding: 10px;
  border: 1px solid ${PAGINATION_COLOR};
  background-color: ${({ selected }) => selected && `${PAGINATION_COLOR}`};
  color: ${({ selected }) => (selected ? 'white' : `${PAGINATION_COLOR}`)};
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: ${PAGINATION_COLOR};
    color: white;
  }
`

const Pagination = ({ seqArray, curr, onClick }) => {
  return (
    <WrapPagination onClick={onClick}>
      <WrapPaginationBtn name="prev">previous</WrapPaginationBtn>
      {seqArray.map((item) => (
        <WrapPaginationBtn
          id={item}
          name="num"
          selected={parseInt(item) === parseInt(curr)}
          key={`pagination__${item}`}
        >
          {item}
        </WrapPaginationBtn>
      ))}
      <WrapPaginationBtn name="next">next</WrapPaginationBtn>
    </WrapPagination>
  )
}

Pagination.propTypes = {
  range: PropTypes.array,
  curr: PropTypes.number,
  onClick: PropTypes.func,
}
Pagination.defaultProps = {
  seqArray: [1],
  curr: 1,
  onClick: () => {},
}
WrapPagination.displayName = 'div'
WrapPaginationBtn.displayName = 'a'

export default Pagination
