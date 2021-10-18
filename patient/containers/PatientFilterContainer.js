import React from 'react'
import PropTypes from 'prop-types'

const PatientFilterContainer = ({
  filter,
  id,
  list,
  type,
  value,
  onReset,
  onChange,
}) => {
  return (
    <form>
      {list.map((item, idx) => (
        <label htmlFor={`filter_${idx}`} key={`${id}Filter__${idx}`}>
          <input
            type={type}
            id={`filter_${idx}`}
            defaultValue={value[idx]}
            name="filter"
            onChange={onChange}
            checked={value[idx] === filter[id]}
          />
          {item}
        </label>
      ))}
      <button onClick={onReset}>필터 해제</button>
    </form>
  )
}

PatientFilterContainer.propTypes = {
  filter: PropTypes.array,
  id: PropTypes.string,
  list: PropTypes.array,
  type: PropTypes.string,
  value: PropTypes.array,
  onReset: PropTypes.func,
  onChange: PropTypes.func,
}
PatientFilterContainer.defaultProps = {
  filter: [],
  id: '',
  list: [],
  type: '',
  value: [],
  onReset: () => {},
  onChange: () => {},
}

export default PatientFilterContainer
