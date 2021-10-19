import React from 'react'
import PropTypes from 'prop-types'

const ListTable = ({ col, listData }) => {
  let splitLists = []

  while (listData.length > 0) {
    splitLists.push(listData.splice(0, Math.min(listData.length, col)))
  }

  return (
    <table>
      <thead />
      <tbody>
        {splitLists.map((list, sIdx) => (
          <tr key={`list__${sIdx}`}>
            {list.map((data, dIdx) => (
              <td key={`listItem__${dIdx}`}>{data}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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
