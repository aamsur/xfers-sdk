import {
  NAVIGATE,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  UPDATE_TOP_UP_DETAILS,
  SUBMIT_TOP_UP_REQUEST_RESPONSE,
  ADD_USER_BANK,
  SELECT_BANK_FOR_ACTION
} from 'TopUpFlow/actions/constants'


// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [NAVIGATE]: (state, {route}) => ({ ...state, route }),
  [SEND_HTTP_REQUEST]: (state, action) => ({ ...state, dataLoading: true }),
  [INITIALIZATION_SUCCESS]: (state, {res}) => {
    const { userBanks } = res;
    return { ...state,  userBanks, dataLoading: false }
  },
  [UPDATE_TOP_UP_DETAILS]: (state, { formType, formData }) => {
    let newTopUpRequest = { ...state['newTopUpRequest'], [formType]: formData };
    return { ...state, newTopUpRequest, error: '' }
  },
  [SUBMIT_TOP_UP_REQUEST_RESPONSE]: (state, {res}) => {
    // TODO: Retrieve transfer-in information
    return { ...state }
  },
  [ADD_USER_BANK]: (state, {bank}) => {
    let newList = state.userBanks.slice();
    newList.push(bank);
    return { ...state, userBanks: newList }
  },
  [SELECT_BANK_FOR_ACTION]: (state, {bankId}) => {
    return { ...state, selectedBankId: bankId }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const topUpFlowReducer = (state = {}, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default topUpFlowReducer
