import { combineReducers } from 'redux'
import paymentFlowReducer from './paymentFlowReducer'

const rootReducer = combineReducers({
  paymentFlow: paymentFlowReducer
});

export default rootReducer
