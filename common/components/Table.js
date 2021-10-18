import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TableFilter from '@common/components/TableFilter'
import { defaultTableBorderStyle } from '@common/styles/table'
import { TABLE_HEADER_COLOR, TABLE_ITEM_COLOR } from '@common/styles/variables'

const WrapTable = styled.table`
  width: 100%;
  ${defaultTableBorderStyle}
  border-collapse: collapse;
  text-align: center;
`
const WrapTableHead = styled.th`
  ${defaultTableBorderStyle};
  padding: 10px;

  &:hover {
    background-color: ${TABLE_HEADER_COLOR};
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
`
const WrapTableRow = styled.tr`
  ${defaultTableBorderStyle}

  &:hover:not(.table_header) {
    background-color: ${TABLE_ITEM_COLOR};
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
`
const WrapTableData = styled.td`
  ${defaultTableBorderStyle}
  padding: 5px 0;
`

const Table = ({
  categories,
  dataList,
  itemId,
  detailId,
  onHeaderClick,
  onFilterClick,
  onItemClick,
  children,
}) => {
  return (
    <WrapTable>
      <thead>
        <WrapTableRow onClick={onHeaderClick} className="table_header">
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
      <tbody onClick={onItemClick}>
        {dataList &&
          dataList.map((data, dIdx) => {
            return (
              <React.Fragment key={dIdx}>
                <WrapTableRow key={`trow__${dIdx}`} id={data[itemId]}>
                  {categories.map((category, cIdx) => (
                    <WrapTableData key={`tdata__${cIdx}`}>
                      {data[category.id]}
                    </WrapTableData>
                  ))}
                </WrapTableRow>
                {itemId && data[itemId] == detailId && children}
              </React.Fragment>
            )
          })}
      </tbody>
    </WrapTable>
  )
}

Table.propTypes = {
  categories: PropTypes.array,
  dataList: PropTypes.array,
  itemId: PropTypes.string,
  onHeaderClick: PropTypes.func,
  onFilterClick: PropTypes.func,
  onItemClick: PropTypes.func,
}
Table.defaultProps = {
  categories: [],
  dataList: [],
  itemId: '',
  onHeaderClick: () => {},
  onFilterClick: () => {},
  onItemClick: () => {},
}

export default Table
