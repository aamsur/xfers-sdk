import { combineReducers } from 'redux'
import verificationFlowReducer from './verificationFlowReducer'

const rootReducer = combineReducers({
  verificationFlow: verificationFlowReducer
});

export default rootReducer
