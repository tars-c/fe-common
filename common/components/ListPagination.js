import React from 'react'

const ListPagination = ({ opts }) => {
  return (
    <select>
      {opts.map((opt, idx) => (
        <option key={`listPagination__${idx}`} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  )
}
export default ListPagination
