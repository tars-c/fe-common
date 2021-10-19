import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { defaultTableBorderStyle } from '@common/styles/table'

const WrapListTable = styled.table`
  ${defaultTableBorderStyle}
  width: 100%;
  margin: 5px 0;
  border-collapse: collapse;
  text-align: center;
`
const WrapListTableRow = styled.tr`
  ${defaultTableBorderStyle}
`

const WrapListTableData = styled.td`
  ${defaultTableBorderStyle}
  width: ${({ col }) => `${100 / col}%`};
  padding: 5px 3px;
`

const ListTable = ({ col, listData }) => {
  let splitLists = []

  while (listData.length > 0) {
    splitLists.push(listData.splice(0, Math.min(listData.length, col)))
  }

  return (
    <WrapListTable>
      <thead />
      <tbody>
        {splitLists.map((list, sIdx) => (
          <WrapListTableRow key={`list__${sIdx}`}>
            {list.map((data, dIdx) => (
              <WrapListTableData key={`listItem__${dIdx}`} col={col}>
                {data}
              </WrapListTableData>
            ))}
          </WrapListTableRow>
        ))}
      </tbody>
    </WrapListTable>
  )
}

ListTable.propTypes = {
  col: PropTypes.number,
  listData: PropTypes.array,
}

ListTable.defaultProps = {
  col: 1,
  listData: [],
}

export default ListTable
