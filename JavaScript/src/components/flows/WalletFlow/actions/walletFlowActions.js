import { caseConvert } from 'UtilityFunctions'
import {
  NAVIGATE_SCREEN_IN_FLOW_TYPE,
  NAVIGATE_FLOW_TYPE,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  SELECT_BANK_FOR_ACTION
} from './constants'

export const navigateFlowType = (flowType) => ({
  type: NAVIGATE_FLOW_TYPE,
  flowType
})

export const navigateScreenInFlowType = (flowType, route) => ({
  type: NAVIGATE_SCREEN_IN_FLOW_TYPE,
  flowType,
  route,
})

export const initializeComponent = (callback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const xfersApi = getState().walletStore.networkClient;

  const bankOptionAPI = new Promise((resolve, reject) => {
    xfersApi.getAvailableBanks().then(res => resolve(res.data));
  });

  const userDetailsAPI = new Promise((resolve, reject) => {
    xfersApi.getUserDetails().then(res => resolve(res.data));
  });

  const withdrawalLimitAPI = new Promise((resolve, reject) => {
    xfersApi.getWithdrawalLimits().then(res => resolve(res.data));
  });

  Promise
    .all([ bankOptionAPI, userDetailsAPI, withdrawalLimitAPI ])
    .then(([ bankOptions, userDetails, withdrawalLimit ]) => {
      const res = { bankOptions, userDetails, withdrawalLimit };
      dispatch({ type: INITIALIZATION_SUCCESS, res });
    });
}

export const selectBankForAction = (bankId) => ({
  type: SELECT_BANK_FOR_ACTION,
  bankId
})

export const confirmPayment = (successCallback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });

  const store = getState().walletStore;
  const xfersApi = store.networkClient;
  const { amount, currency, orderId } = store.params;

  successCallback();

  // xfersApi.confirmPayment({amount, currency, orderId})
  //   .then(res => {
  //     dispatch({ type: CONFIRM_PAYMENT_RESPONSE, res: res.data })
  //     if (successCallback) successCallback();
  //   })
  //   .catch(err => {
  //     dispatch({ type: CONFIRM_PAYMENT_RESPONSE, res: err.data })
  //   })
}
