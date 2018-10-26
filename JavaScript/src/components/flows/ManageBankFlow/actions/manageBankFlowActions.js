import { caseConvert } from 'UtilityFunctions'

import {
  NAVIGATE,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  INIT_NEW_BANK_ACCOUNT,
  UPDATE_BANK_ACCOUNT_DETAILS,
  UPDATE_SEARCH_FILTER,
  SUBMIT_NEW_BANK_ACCOUNT_RESPONSE,
} from './constants'

export const navigate = (route) => ({
  type: NAVIGATE,
  route
})

export const initializeComponent = (callback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const store = getState().manageBankFlow;
  const xfersApi = store.networkClient;

  const bankOptionAPI = new Promise((resolve, reject) => {
    xfersApi.getAvailableBanks().then(res => resolve(res.data));
  });

  const userBanksAPI = new Promise((resolve, reject) => {
    xfersApi.getUserBanks().then(res => resolve(res.data));
  });

  Promise
    .all([ bankOptionAPI, userBanksAPI ])
    .then(([ bankOptions, userBanks ]) => {
      const res = { bankOptions, userBanks };
      dispatch({ type: INITIALIZATION_SUCCESS, res });

      if (callback) callback();
    });
}

export const submitNewBankAccountDetails = (successCallback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });

  const { newBankAccountDetails, networkClient: xfersApi } = getState().manageBankFlow;

  xfersApi.addBankAccount(
    caseConvert.toSnake(newBankAccountDetails,
      {'bankStatementFile': 'bank_account_proof', 'fileData': 'fileData', 'fileName': 'fileName'})
  ).then(res => {
    dispatch({ type: SUBMIT_NEW_BANK_ACCOUNT_RESPONSE, res: res.data })
    if (successCallback) successCallback(res.data[0]);
  })
  .catch(err => {
    dispatch({ type: SUBMIT_NEW_BANK_ACCOUNT_RESPONSE, res: err.data })
  });
}

export const updateBankAccountDetails = (type, data) => ({
  type: UPDATE_BANK_ACCOUNT_DETAILS,
  formType: type,
  formData: data,
})

export const updateSearchFilter = (filter) => ({
  type: UPDATE_SEARCH_FILTER,
  filter
})

export const initNewBankAccount = () => ({
  type: INIT_NEW_BANK_ACCOUNT,
})
