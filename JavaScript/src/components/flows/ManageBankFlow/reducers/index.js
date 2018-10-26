import { combineReducers } from 'redux'
import manageBankFlowReducer from './manageBankFlowReducer'

const rootReducer = combineReducers({
  manageBankFlow: manageBankFlowReducer
});

export default rootReducer
