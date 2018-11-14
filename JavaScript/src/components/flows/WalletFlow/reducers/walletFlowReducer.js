import {
  NAVIGATE,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  UPDATE_TOP_UP_DETAILS,
  SUBMIT_TOP_UP_REQUEST_RESPONSE,
  ADD_USER_BANK,
  SELECT_BANK_FOR_ACTION,
  CONFIRM_PAYMENT_RESPONSE
} from 'WalletFlow/actions/constants'


// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [NAVIGATE]: (state, {route}) => ({ ...state, route }),
  [SEND_HTTP_REQUEST]: (state, action) => ({ ...state, dataLoading: true }),
  [INITIALIZATION_SUCCESS]: (state, {res}) => {
    const { userDetails } = res;
    return {
      ...state,
      walletName: userDetails.wallet_name + ' Wallet',
      availableBalance: userDetails.available_balance,
      gauthEnabled: userDetails.gauth_enabled,
      bitcoinUser: userDetails.bitcoin_user,
      vipBetaUser: userDetails.vip_beta_user,
      acceptedTnc: userDetails.accepted_tnc,
      kycNeeded: userDetails.kyc_needed,
      kycVerified: userDetails.kyc_verified,
      accountLocked: userDetails.account_locked,
      multiBankAccountLocked: userDetails.multi_bank_account_detected,
      userBanks: userDetails.bank_accounts,
      dataLoading: false,
    }
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
  },
  [CONFIRM_PAYMENT_RESPONSE]: (state, {res}) => {
    // TODO: Receive updates on available balance
    return { ...state }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const walletFlowReducer = (state = {}, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default walletFlowReducer
