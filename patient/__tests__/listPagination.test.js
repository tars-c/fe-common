import React from 'react'
import { shallow } from 'enzyme'

import ListPagination from '@common/components/ListPagination'
import { paginationOpts } from '@patient/consts/patientTableConst'

describe('환자 테이블의 <ListPagination />', () => {
  it('스냅샷 테스트', () => {
    const wrapper = shallow(
      <ListPagination opts={paginationOpts} onChange={() => {}} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
