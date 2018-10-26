import { combineReducers } from 'redux'
import authenticationFlowReducer from './authenticationFlowReducer'

const rootReducer = combineReducers({
  authenticationFlow: authenticationFlowReducer
});

export default rootReducer
