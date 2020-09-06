import { combineReducers } from 'redux'

import recommendReducer from './recommend'
import hotReducer from './hot'

const reducer = combineReducers({
    recommend: recommendReducer,
    hot: hotReducer
})

export default reducer;