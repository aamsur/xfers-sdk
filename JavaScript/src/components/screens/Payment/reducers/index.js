import { combineReducers } from 'redux'
import paymentReducer from './paymentReducer'

const rootReducer = combineReducers({
  payment: paymentReducer
});

export default rootReducer
