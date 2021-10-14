import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MyTable = styled.table`
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
`
const TableHead = styled.th`
  border: 1px solid black;
`
const TableRow = styled.tr`
  border: 1px solid black;
`
const TableData = styled.td`
  border: 1px solid black;
`

const Table = ({ categories, dataList }) => {
  return (
    <MyTable>
      <thead>
        <TableRow>
          {categories.map((category, idx) => (
            <TableHead key={`thead__${idx}`}>{category.value}</TableHead>
          ))}
        </TableRow>
      </thead>
      <tbody>
        {dataList &&
          dataList.map((data, dIdx) => {
            return (
              <TableRow key={`trow__${dIdx}`}>
                {categories.map((category, cIdx) => (
                  <TableData key={`tdata__${cIdx}`}>
                    {data[category.id]}
                  </TableData>
                ))}
              </TableRow>
            )
          })}
      </tbody>
    </MyTable>
  )
}

Table.propTypes = {
  categories: PropTypes.array,
  dataList: PropTypes.array,
}
Table.defaultProps = {
  categories: [],
  dataList: [],
}

export default Table
