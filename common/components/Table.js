import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const WrapTable = styled.table`
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
`
const WrapTableHead = styled.th`
  border: 1px solid black;
`
const WrapTableRow = styled.tr`
  border: 1px solid black;
`
const WrapTableData = styled.td`
  border: 1px solid black;
`

const Table = ({ categories, dataList }) => {
  return (
    <WrapTable>
      <thead>
        <WrapTableRow>
          {categories.map((category, idx) => (
            <WrapTableHead key={`thead__${idx}`}>
              {category.value}
            </WrapTableHead>
          ))}
        </WrapTableRow>
      </thead>
      <tbody>
        {dataList &&
          dataList.map((data, dIdx) => {
            return (
              <WrapTableRow key={`trow__${dIdx}`}>
                {categories.map((category, cIdx) => (
                  <WrapTableData key={`tdata__${cIdx}`}>
                    {data[category.id]}
                  </WrapTableData>
                ))}
              </WrapTableRow>
            )
          })}
      </tbody>
    </WrapTable>
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
