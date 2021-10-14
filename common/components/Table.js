import React from 'react'
import PropTypes from 'prop-types'

const Table = ({ categories, dataList }) => {
  return (
    <table>
      <thead>
        <tr>
          {categories.map((category, idx) => (
            <th key={`thead__${idx}`}>{category.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataList &&
          dataList.map((data, dIdx) => {
            return (
              <tr key={`trow__${dIdx}`}>
                {categories.map((category, cIdx) => (
                  <td key={`tdata__${cIdx}`}>{data[category.id]}</td>
                ))}
              </tr>
            )
          })}
      </tbody>
    </table>
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
