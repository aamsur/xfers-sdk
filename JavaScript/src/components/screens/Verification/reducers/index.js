import { combineReducers } from 'redux'
import personalVerificationReducer from './personalVerificationReducer'

const rootReducer = combineReducers({
  personalVerification: personalVerificationReducer
});

export default rootReducer
