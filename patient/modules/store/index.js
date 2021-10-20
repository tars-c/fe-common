import { combineReducers } from 'redux'

import pagination from '@patient/modules/store/pagination'
import filter from '@patient/modules/store/filter'

const patient = combineReducers({ pagination, filter })

export default patient
