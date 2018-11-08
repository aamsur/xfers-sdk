import {
  NAVIGATE,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  INIT_NEW_BANK_ACCOUNT,
  UPDATE_BANK_ACCOUNT_DETAILS,
  UPDATE_SEARCH_FILTER,
  SUBMIT_NEW_BANK_ACCOUNT_RESPONSE,
  DELETE_BANK_ACCOUNT_RESPONSE,
  SELECT_BANK_FOR_ACTION
} from 'ManageBankFlow/actions/constants'

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [NAVIGATE]: (state, {route}) => ({ ...state, route }),
  [SEND_HTTP_REQUEST]: (state, action) => ({ ...state, dataLoading: true }),
  [INITIALIZATION_SUCCESS]: (state, {res}) => {
    const { bankOptions, userBanks } = res;
    return { ...state, bankOptions, userBanks, dataLoading: false }
  },
  [INIT_NEW_BANK_ACCOUNT]: (state, action) => {
    let newBankAccountDetails = {
      bank: '',
      accountNo: '',
      accountNoCheck: '',
      accountHolderName: '',
      bankStatementFile: undefined,
    }
    return { ...state, newBankAccountDetails };
  },
  [UPDATE_BANK_ACCOUNT_DETAILS]: (state, { formType, formData }) => {
    let newBankAccountDetails = { ...state['newBankAccountDetails'], [formType]: formData };
    return { ...state, newBankAccountDetails, error: '' }
  },
  [UPDATE_SEARCH_FILTER]: (state, {filter}) => ({ ...state, filter }),
  [SUBMIT_NEW_BANK_ACCOUNT_RESPONSE]: (state, {res}) => {
    if (res.error) {
      return { ...state, dataLoading: false, error: res.error}
    } else {
      let newList = state.userBanks.slice();
      newList.push(res[0]);
      return { ...state, dataLoading: false, userBanks: newList }
    }
  },
  [DELETE_BANK_ACCOUNT_RESPONSE]: (state, {res}) => {
    return { ...state, dataLoading: false, userBanks: res}
  },
  [SELECT_BANK_FOR_ACTION]: (state, {bankId}) => {
    return { ...state, selectedBankId: bankId }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const manageBankFlowReducer = (state = {}, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default manageBankFlowReducer
