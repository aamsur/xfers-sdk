import {
  NAVIGATE,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  CONFIRM_PAYMENT_RESPONSE,
} from 'PaymentFlow/actions/constants'


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
      kycVerified: userDetails.kyc_verified,
      accountLocked: userDetails.account_locked,
      multiBankAccountLocked: userDetails.multi_bank_account_detected,
      userBanks: userDetails.bank_accounts,
      dataLoading: false,
    }
  },
  [CONFIRM_PAYMENT_RESPONSE]: (state, {res}) => {
    // TODO: Receive updates on available balance
    return { ...state }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const paymentFlowReducer = (state = {}, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default paymentFlowReducer
