import { combineReducers } from 'redux'
import walletFlowReducer from './walletFlowReducer'

const rootReducer = combineReducers({
  walletFlow: walletFlowReducer
});

export default rootReducer
