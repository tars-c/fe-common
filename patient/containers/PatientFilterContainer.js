import React from 'react'
import PropTypes from 'prop-types'

const PatientFilterContainer = ({ list, type, value, onReset, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      {list.map((item, idx) => (
        <label htmlFor={`filter_${idx}`} key={`filterItem__${idx}`}>
          <input
            type={type}
            id={`filter_${idx}`}
            defaultValue={value[idx]}
            name="filter"
          />
          {item}
        </label>
      ))}
      <button onClick={onReset}>필터 해제</button>
      <button type="submit">필터 설정</button>
    </form>
  )
}

PatientFilterContainer.propTypes = {
  list: PropTypes.array,
  type: PropTypes.string,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
}
PatientFilterContainer.defaultProps = {
  list: [],
  type: '',
  onReset: () => {},
  onSubmit: () => {},
}

export default PatientFilterContainer
