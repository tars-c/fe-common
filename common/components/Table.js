import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { defaultTableBorderStyle } from '@common/styles/table'

const WrapTable = styled.table`
  width: 100%;
  ${defaultTableBorderStyle}
  border-collapse: collapse;
  text-align: center;
`
const WrapTableHead = styled.th`
  ${defaultTableBorderStyle}
`
const WrapTableRow = styled.tr`
  ${defaultTableBorderStyle}
`
const WrapTableData = styled.td`
  ${defaultTableBorderStyle}
`

const Table = ({ categories, dataList, onClick }) => {
  return (
    <WrapTable>
      <thead>
        <WrapTableRow onClick={onClick}>
          {categories.map((category, idx) => (
            <WrapTableHead key={`thead__${idx}`} id={category.tableCol || ''}>
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
  onClick: PropTypes.func,
}
Table.defaultProps = {
  categories: [],
  dataList: [],
  onClick: () => {},
}

export default Table
