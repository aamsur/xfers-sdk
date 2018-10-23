import {
  NAVIGATE,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  UPDATE_TOP_UP_DETAILS,
} from 'Payment/actions/constants'


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
      availableBalance: userDetails.available_balance,
      gauthEnabled: userDetails.gauth_enabled,
      bitcoinUser: userDetails.bitcoin_user,
      vipBetaUser: userDetails.vip_beta_user,
      acceptedTnc: userDetails.accepted_tnc,
      kycVerified: userDetails.kyc_verified,
      accountLocked: userDetails.account_locked,
      multiBankAccountLocked: userDetails.multi_bank_account_detected,
      userBanks: userDetails.bank_accounts,
      dataLoading: false,
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------

const paymentReducer = (state = {}, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default paymentReducer
