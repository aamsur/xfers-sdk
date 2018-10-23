import { combineReducers } from 'redux'
import withdrawalReducer from './withdrawalReducer'

const rootReducer = combineReducers({
  withdrawal: withdrawalReducer
});

export default rootReducer
