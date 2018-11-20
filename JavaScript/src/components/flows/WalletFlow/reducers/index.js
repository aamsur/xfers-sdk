import { combineReducers } from 'redux'
import walletReducer from './walletReducer'

const rootReducer = combineReducers({
  walletStore: walletReducer
});

export default rootReducer
