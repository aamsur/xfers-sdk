import { caseConvert } from 'UtilityFunctions'
import {
  SEND_HTTP_REQUEST,
  SELECT_BANK_FOR_ACTION,
  INIT_NEW_BANK_ACCOUNT,
  UPDATE_BANK_ACCOUNT_DETAILS,
  UPDATE_SEARCH_FILTER,
  SUBMIT_NEW_BANK_ACCOUNT_RESPONSE,
  DELETE_BANK_ACCOUNT_RESPONSE
} from './constants'

export const submitNewBankAccountDetails = (successCallback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const { newBankAccountDetails, networkClient: xfersApi } = getState().walletStore;

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

export const deleteBankAccount = (bankId, successCallback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const { networkClient: xfersApi } = getState().walletStore;

  xfersApi.deleteBankAccount(bankId).then(res => {
    dispatch({ type: DELETE_BANK_ACCOUNT_RESPONSE, res: res.data })
    if (successCallback) successCallback();
  })
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

export const selectBankForAction = (bankId) => ({
  type: SELECT_BANK_FOR_ACTION,
  bankId
})
