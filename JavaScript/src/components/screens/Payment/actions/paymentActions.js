import { caseConvert } from 'UtilityFunctions'
import {
  NAVIGATE,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  CONFIRM_PAYMENT_RESPONSE
} from './constants'

export const navigate = (route) => ({
  type: NAVIGATE,
  route
})

export const initializeComponent = (navigationCallback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const store = getState().payment;
  const xfersApi = store.networkClient;

  const userDetailsAPI = new Promise((resolve, reject) => {
    xfersApi.getUserDetails().then(res => resolve(res.data));
  });

  Promise
    .all([ userDetailsAPI ])
    .then(([ userDetails ]) => {
      const res = { userDetails };
      dispatch({ type: INITIALIZATION_SUCCESS, res });

      if (navigationCallback) {
        if (!userDetails.kyc_verified) {
          navigationCallback('kyc')
        }
        else if (userDetails.available_balance > store.amount) {
          navigationCallback('payment')
        }
        else {
          navigationCallback('topup')
        }
      }
    });
}

export const confirmPayment = (successCallback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });

  const store = getState().payment;
  const xfersApi = store.networkClient;
  const { amount, currency, orderId } = store;

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
