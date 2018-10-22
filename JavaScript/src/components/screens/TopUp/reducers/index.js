import { combineReducers } from 'redux'
import topUpReducer from './topUpReducer'

const rootReducer = combineReducers({
  topUp: topUpReducer
});

export default rootReducer
