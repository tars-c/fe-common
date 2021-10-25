import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Table from '@common/components/Table'

const categories = [
  { id: 'id', value: '환자 ID', tableCol: 'id', filter: true },
  { id: 'age', value: '나이', tableCol: 'age', filter: true },
  { id: 'gender', value: '성별', tableCol: 'gender', filter: true },
  { id: 'isDeath', value: '사망여부', tableCol: 'isDeath', filter: true },
]
const dataList = [
  { id: 1, age: 10, gender: 'F', isDeath: 'N' },
  { id: 2, age: 20, gender: 'M', isDeath: 'N' },
  { id: 3, age: 30, gender: 'F', isDeath: 'Y' },
  { id: 4, age: 40, gender: 'M', isDeath: 'N' },
]

describe(`테이블 컴포넌트 테스트`, () => {
  const mockHeaderClick = jest.fn()
  const mockFilterClick = jest.fn()
  const mockItemClick = jest.fn()
  let wrapper

  beforeEach(() => {
    wrapper = render(
      <Table
        categories={categories}
        dataList={dataList}
        onHeaderClick={mockHeaderClick}
        onFilterClick={mockFilterClick}
        onItemClick={mockItemClick}
      />,
    )
  })

  test(`데이터에 대한 렌더링 테스트`, () => {
    const { container } = wrapper
    expect(container.querySelectorAll('thead th')).toHaveLength(
      categories.length,
    )
    expect(container.querySelectorAll('tbody tr')).toHaveLength(dataList.length)

    expect(wrapper).toMatchSnapshot()
  })

  test(`이벤트 테스트`, () => {
    const { container } = wrapper

    // 테이블 헤더 클릭 이벤트
    const cols = container.querySelectorAll('thead th')
    expect(cols.length).toBeGreaterThan(0)

    cols.forEach((col) => {
      fireEvent.click(col)
      expect(mockHeaderClick).toHaveBeenCalled()
    })

    // 테이블 데이터 행 클릭 이벤트
    const rows = container.querySelectorAll('tbody tr')

    rows.forEach((row) => {
      fireEvent.click(row)
      expect(mockItemClick).toHaveBeenCalled()
    })

    // 테이블 데이터 클릭 이벤트
    const tableData = container.querySelectorAll('tbody td')

    tableData.forEach((tData) => {
      fireEvent.click(tData)
      expect(mockItemClick).toHaveBeenCalled()
    })

    // 필터 클릭 이벤트
    const tableFilter = container.querySelectorAll(
      'thead th > span[name="filter"]',
    )

    tableFilter.forEach((tFilter) => {
      fireEvent.click(tFilter)
      expect(mockFilterClick).toHaveBeenCalled()
    })
  })
})
