import { caseConvert } from 'UtilityFunctions'
import {
  NAVIGATE,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  UPDATE_TOP_UP_DETAILS,
  SUBMIT_TOP_UP_REQUEST_RESPONSE,
  ADD_USER_BANK,
  SELECT_BANK_FOR_ACTION
} from './constants'

export const navigate = (route) => ({
  type: NAVIGATE,
  route
})

export const updateTopUpDetails = (type, data) => ({
  type: UPDATE_TOP_UP_DETAILS,
  formType: type,
  formData: data,
})

export const selectBankForAction = (bankId) => ({
  type: SELECT_BANK_FOR_ACTION,
  bankId
})


export const initializeComponent = (callback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const xfersApi = getState().walletFlow.networkClient;

  const userDetailsAPI = new Promise((resolve, reject) => {
    xfersApi.getUserDetails().then(res => resolve(res.data));
  });

  Promise
    .all([ userDetailsAPI ])
    .then(([ userDetails ]) => {
      const res = { userDetails };
      dispatch({ type: INITIALIZATION_SUCCESS, res });
      if (callback) callback();
    });
}

export const addUserBank = (bank) => ({
  type: ADD_USER_BANK,
  bank
})

export const submitNewTopUpRequest = (successCallback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const xfersApi = getState().walletFlow.networkClient;

  successCallback()

  // xfersApi.createTopUpRequest()
  //   .then(res => {
  //     dispatch({ type: SUBMIT_TOP_UP_REQUEST_RESPONSE, res: res.data });
  //     if (successCallback) successCallback();
  //   })
  //   .catch(err => {
  //     dispatch({ type: SUBMIT_TOP_UP_REQUEST_RESPONSE, res: err.data });
  //   })
}

export const confirmPayment = (successCallback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });

  const store = getState().walletFlow;
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