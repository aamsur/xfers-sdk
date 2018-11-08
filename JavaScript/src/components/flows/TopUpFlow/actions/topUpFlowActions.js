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


export const initializeComponent = (navigationCallback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const xfersApi = getState().topUpFlow.networkClient;

  const userBanksAPI = new Promise((resolve, reject) => {
    xfersApi.getUserBanks().then(res => resolve(res.data));
  });

  Promise
    .all([ userBanksAPI ])
    .then(([ userBanks ]) => {
      const res = { userBanks };
      dispatch({ type: INITIALIZATION_SUCCESS, res });

      if (navigationCallback) {
        if (!userBanks.length) {
          navigationCallback('bank')
        }
        else {
          navigationCallback('topUpForm')
        }
      }
    });
}

export const addUserBank = (bank) => ({
  type: ADD_USER_BANK,
  bank
})

export const submitNewTopUpRequest = (successCallback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const xfersApi = getState().topUpFlow.networkClient;

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
