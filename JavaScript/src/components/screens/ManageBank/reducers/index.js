import { combineReducers } from 'redux'
import manageBankReducer from './manageBankReducer'

const rootReducer = combineReducers({
  manageBank: manageBankReducer
});

export default rootReducer
