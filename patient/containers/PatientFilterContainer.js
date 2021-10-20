import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const WrapFilterForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 0;
  font-size: 1.2rem;
`
const WrapFilterInput = styled.input`
  margin: 5px 5px 5px 0;
`
const WrapButton = styled.button`
  margin: 5px 0 0 0;
  padding: 5px 20px;
  background-color: white;
  border: 1px solid #ff865e;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff865e;
    transition: all 0.3s ease-in-out;
  }
`

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
    <WrapFilterForm>
      {list.map((item, idx) => (
        <label htmlFor={id[idx]} key={`${id[idx]}Filter__${idx}`}>
          <WrapFilterInput
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
      <WrapButton onClick={onReset}>필터 해제</WrapButton>
    </WrapFilterForm>
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
