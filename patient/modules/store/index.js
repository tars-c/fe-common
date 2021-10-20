import { combineReducers } from 'redux'

import detail from '@patient/modules/store/detail'
import pagination from '@patient/modules/store/pagination'
import filter from '@patient/modules/store/filter'

const patient = combineReducers({ pagination, filter, detail })

export default patient
