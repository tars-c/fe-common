import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TableFilter from '@common/components/TableFilter'
import { defaultTableBorderStyle } from '@common/styles/table'
import { TABLE_HEADER_COLOR } from '@common/styles/variables'

const WrapTable = styled.table`
  width: 100%;
  ${defaultTableBorderStyle}
  border-collapse: collapse;
  text-align: center;
`
const WrapTableHead = styled.th`
  padding: 10px;
  ${defaultTableBorderStyle};

  &:hover {
    background-color: ${TABLE_HEADER_COLOR};
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
`
const WrapTableRow = styled.tr`
  ${defaultTableBorderStyle}
`
const WrapTableData = styled.td`
  ${defaultTableBorderStyle}
`

const Table = ({ categories, dataList, onClick, onFilterClick }) => {
  return (
    <WrapTable>
      <thead>
        <WrapTableRow onClick={onClick}>
          {categories.map((category, idx) => (
            <WrapTableHead key={`thead__${idx}`} id={category.tableCol || ''}>
              {category.value}
              {category.filter && (
                <TableFilter id={category.id} onClick={onFilterClick} />
              )}
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
  onFilterClick: PropTypes.func,
}
Table.defaultProps = {
  categories: [],
  dataList: [],
  onClick: () => {},
  onFilterClick: () => {},
}

export default Table
