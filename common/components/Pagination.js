import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const WrapPagination = styled.div`
  display: flex;
`
const WrapPaginationBtn = styled.a`
  display: block;
  margin: 15px 3px 0;
  padding: 10px;
  border: 1px solid #33658a;
  background-color: ${({ selected }) => (selected ? '#33658a' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : '#33658a')};
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #33658a;
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

export default Pagination
