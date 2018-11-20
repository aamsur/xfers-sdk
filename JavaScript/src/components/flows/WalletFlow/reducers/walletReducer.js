import {
  NAVIGATE_FLOW_TYPE,
  NAVIGATE_SCREEN_IN_FLOW_TYPE,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  UPDATE_TOP_UP_DETAILS,
  SUBMIT_TOP_UP_REQUEST_RESPONSE,
  SELECT_BANK_FOR_ACTION,
  CONFIRM_PAYMENT_RESPONSE,



  INIT_NEW_BANK_ACCOUNT,
  UPDATE_BANK_ACCOUNT_DETAILS,
  UPDATE_SEARCH_FILTER,
  SUBMIT_NEW_BANK_ACCOUNT_RESPONSE,
  DELETE_BANK_ACCOUNT_RESPONSE,

  INIT_WITHDRAWAL_FORM,
  UPDATE_WITHDRAWAL_DETAILS,
  FETCH_WITHDRAWAL_LIMITS_SUCCESS,
  FETCH_FEE_BREAKDOWN_SUCCESS,
  FETCH_FEE_BREAKDOWN_ERROR,
  SUBMIT_WITHDRAWAL_SUCCEESS,
  SUBMIT_WITHDRAWAL_ERROR,

} from 'WalletFlow/actions/constants'


// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {

  [SEND_HTTP_REQUEST]: (state, action) => ({ ...state, dataLoading: true }),

  [NAVIGATE_FLOW_TYPE]: (state, {flowType}) => ({ ...state, flowType }),

  [NAVIGATE_SCREEN_IN_FLOW_TYPE]: (state, {flowType, route}) => {
    switch (flowType) {
      case 'bank':
        return { ...state, flowType, bankRoute: route };
        break;
      case 'withdrawal':
        return { ...state, flowType, withdrawalRoute: route };
        break;
      case 'topup':
        return { ...state, flowType, topupRoute: route };
        break;
      case 'payment':
        return { ...state, flowType, paymentRoute: route };
        break;
      default:
        return { ...state, flowType: '', bankRoute: '', withdrawalRoute: '', topupRoute: '', paymentRoute: '' };
    }
  },

  [INITIALIZATION_SUCCESS]: (state, {res}) => {
    const { bankOptions, userDetails, withdrawalLimit } = res;

    const userWithdrawalStatus = {
      dailyLimit: withdrawalLimit.daily_limit,
      monthlyLimit: withdrawalLimit.monthly_limit,
      dailyRemaining: withdrawalLimit.daily_limit_remaining,
      monthlyRemaining: withdrawalLimit.monthly_limit_remaining,
      dailyProgressBar: parseInt(100 - ((withdrawalLimit.daily_limit_remaining / withdrawalLimit.daily_limit) * 100)),
      monthlyProgressBar: parseInt(100 - ((withdrawalLimit.monthly_limit_remaining / withdrawalLimit.monthly_limit) * 100)),
    }

    const userTopUpStatus = {
      topUpLimit: userDetails.top_up_limit,
      remaining: '',
      resetTiming: '',
    }

    return {
      ...state,
      bankOptions,
      userWithdrawalStatus,
      userTopUpStatus,
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
      initialized: true,
      dataLoading: false,
    }
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


  // WITHDRAWAL, WITHDRAWAL, WITHDRAWAL, WITHDRAWAL, WITHDRAWAL, WITHDRAWAL, WITHDRAWAL, WITHDRAWAL


  [INIT_WITHDRAWAL_FORM]: (state, action) => ({
    ...state,
    newWithdrawalRequest: {
      withdrawalAmount: 0,
      withdrawalBankId: '',
      withdrawalProcessingType: '',
      requestBreakdownList: [],
      finalWithdrawalAmount: 0,
    }
  }),

  [UPDATE_WITHDRAWAL_DETAILS]: (state, { formType, formData }) => {
    let newWithdrawalRequest = { ...state['newWithdrawalRequest'], [formType]: formData };
    return { ...state, newWithdrawalRequest, error: '' }
  },

  [FETCH_FEE_BREAKDOWN_SUCCESS]: (state, {res}) => {


    // if (walletId == 1) {
    //   return toCurrency(processingType == "express" ? withdrawalAmount - 5 : withdrawalAmount);
    // } else if (walletId == 2) {
    //   return toCurrency(withdrawalAmount - requestBreakdownList.reduce((a, c) => {return a + c.fees}, 0));
    // }

    const totalFees = res.fees_breakdown.reduce((a, c) => {return a + c.fees}, 0)
    const finalWithdrawalAmount = state.newWithdrawalRequest.withdrawalAmount - totalFees;
    const newWithdrawalRequest = {
      ...state['newWithdrawalRequest'],
      finalWithdrawalAmount,
      requestBreakdownList: res.fees_breakdown,
    }
    return { ...state, newWithdrawalRequest, dataLoading: false }
  },

  [FETCH_FEE_BREAKDOWN_ERROR]: (state, {res}) => ({...state, dataLoading: false, error: res.error}),

  [SUBMIT_WITHDRAWAL_SUCCEESS]: (state, {res}) => ({...state, dataLoading: false, availableBalance: res.available_balance}),

  [SUBMIT_WITHDRAWAL_ERROR]: (state, {res}) => ({...state, dataLoading: false, error: res.error}),


  [UPDATE_TOP_UP_DETAILS]: (state, { formType, formData }) => {
    let newTopUpRequest = { ...state['newTopUpRequest'], [formType]: formData };
    return { ...state, newTopUpRequest, error: '' }
  },
  [SUBMIT_TOP_UP_REQUEST_RESPONSE]: (state, {res}) => {
    // TODO: Retrieve transfer-in information
    return { ...state }
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

const walletReducer = (state = {}, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default walletReducer
