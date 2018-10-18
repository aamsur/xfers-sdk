import {
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  UPDATE_BANK_ACCOUNT_DETAILS,
  UPDATE_SEARCH_FILTER,
  SUBMIT_NEW_BANK_ACCOUNT_RESPONSE
} from 'ManageBank/actions/constants'

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SEND_HTTP_REQUEST]: (state, action) => ({ ...state, dataLoading: true }),
  [INITIALIZATION_SUCCESS]: (state, {res}) => {
    const { bankOptions } = res;
    return { ...state, bankOptions, dataLoading: false }
  },
  [UPDATE_BANK_ACCOUNT_DETAILS]: (state, { formType, formData }) => {
    let newBankAccountDetails = { ...state['newBankAccountDetails'], [formType]: formData };
    return { ...state, newBankAccountDetails }
  },
  [UPDATE_SEARCH_FILTER]: (state, {filter}) => ({ ...state, filter }),
  [SUBMIT_NEW_BANK_ACCOUNT_RESPONSE]: (state, {res}) => {
    return { ...state, dataLoading: false }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const manageBankReducer = (state = {}, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default manageBankReducer
