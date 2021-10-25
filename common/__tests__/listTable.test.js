import React from 'react'
import _ from 'lodash'
import { render } from '@testing-library/react'

import ListTable from '@common/components/ListTable'

const COL = 3
let dataList = _.range(12)

describe(`나열형 테이블 컴포넌트 테스트`, () => {
  test(`데이터에 대한 렌더링 테스트`, () => {
    const { container } = render(<ListTable col={COL} listData={dataList} />)

    // 테이블 열 체크
    expect(
      container.querySelector(`tbody tr`).querySelectorAll(`td`),
    ).toHaveLength(COL)

    // 테이블 데이터 체크
    expect(container.querySelectorAll(`tbody td`)).toHaveLength(dataList.length)
  })
})
