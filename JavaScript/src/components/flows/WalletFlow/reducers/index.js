import { combineReducers } from 'redux'
import topUpFlowReducer from './topUpFlowReducer'

const rootReducer = combineReducers({
  topUpFlow: topUpFlowReducer
});

export default rootReducer
