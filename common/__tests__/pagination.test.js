import React from 'react'
import { shallow } from 'enzyme'

import Pagination from '@common/components/Pagination'
import makeSeqArray from '@common/helpers/makeSeqArray'
import { render, fireEvent } from '@testing-library/react'

const PAGE_CNT = 10
const randomStart = parseInt(Math.random() * 10) + 1
const randomEnd = randomStart + PAGE_CNT - 1

let seqArr

describe(`페이지네이션 테스트`, () => {
  beforeAll(() => {
    seqArr = makeSeqArray({
      start: randomStart,
      end: randomEnd,
    })
  })

  test(`렌더링 요소 테스트`, () => {
    const wrapper = shallow(<Pagination seqArray={seqArr} />)

    expect(wrapper.find('a').first().props().name).toBe('prev')
    expect(wrapper.find('a').last().props().name).toBe('next')
    expect(wrapper.find('a')).toHaveLength(PAGE_CNT + 2)
  })

  test(`페이지네이션 범위 체크 및 선택여부 테스트`, () => {
    const firstSelect = shallow(
      <Pagination seqArray={seqArr} curr={randomStart} />,
    )
    const lastSelect = shallow(
      <Pagination seqArray={seqArr} curr={randomEnd} />,
    )

    // 가장 앞에 있는 버튼이 선택된 경우
    firstSelect.find('a').forEach((node) => {
      if (node.props().id === randomStart)
        expect(node.props().selected).toBeTruthy()
      else expect(node.props().selected).toBeFalsy()
    })

    // 가장 마지막에 있는 버튼이 선택된 경우
    lastSelect.find('a').forEach((node) => {
      if (node.props().id === randomEnd)
        expect(node.props().selected).toBeTruthy()
      else expect(node.props().selected).toBeFalsy()
    })
  })

  test(`클릭 이벤트 테스트`, () => {
    const mockClick = jest.fn()
    const { container } = render(
      <Pagination seqArray={seqArr} onClick={mockClick} />,
    )
    const btns = container.querySelectorAll('a')

    btns.forEach((btn) => {
      fireEvent.click(btn)
      expect(mockClick).toHaveBeenCalled()
    })
  })
})
