import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MyPagination = styled.div`
  display: flex;
`
const PaginationBtn = styled.a`
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
    <MyPagination onClick={onClick}>
      <PaginationBtn name="prev">previous</PaginationBtn>
      {seqArray.map((item) => (
        <PaginationBtn
          id={item}
          name="num"
          selected={parseInt(item) === parseInt(curr)}
          key={`pagination__${item}`}
        >
          {item}
        </PaginationBtn>
      ))}
      <PaginationBtn name="next">next</PaginationBtn>
    </MyPagination>
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
