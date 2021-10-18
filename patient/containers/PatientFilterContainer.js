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
        <label htmlFor={`filter_${idx}`} key={`${id[idx]}Filter__${idx}`}>
          <input
            type={type}
            id={id[idx]}
            defaultValue={value[idx]}
            name="filter"
            onChange={onChange}
            checked={value[idx] === filter[id[idx]]}
          />
          {item}
        </label>
      ))}
      <button onClick={onReset}>필터 해제</button>
    </form>
  )
}

PatientFilterContainer.propTypes = {
  filter: PropTypes.object,
  id: PropTypes.array,
  list: PropTypes.array,
  type: PropTypes.string,
  value: PropTypes.array,
  onReset: PropTypes.func,
  onChange: PropTypes.func,
}
PatientFilterContainer.defaultProps = {
  filter: {},
  id: [],
  list: [],
  type: '',
  value: [],
  onReset: () => {},
  onChange: () => {},
}

export default PatientFilterContainer
