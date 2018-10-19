import { caseConvert } from 'UtilityFunctions'
import Xfers from 'xfersWrapper.js'
import {
  NAVIGATE,
  OPEN_MODAL,
  CLOSE_MODAL,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  INIT_NEW_BANK_ACCOUNT,
  UPDATE_BANK_ACCOUNT_DETAILS,
  UPDATE_SEARCH_FILTER,
  SUBMIT_NEW_BANK_ACCOUNT_RESPONSE,
} from './constants'

// TO-DO: To be removed from this location.
const xfers = new Xfers("YTB7iBVauTzJ8zyk6cJ3ooTKUGJMQ-SYDPxFNFTDs4E");

export const navigate = (route) => ({
  type: NAVIGATE,
  route
})

export const openModal = () => ({
  type: OPEN_MODAL
})

export const closeModal = () => ({
  type: CLOSE_MODAL
})

export const initializeComponent = () => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });

  const bankOptionAPI = new Promise((resolve, reject) => {
    xfers.getAvailableBanks().then(res => resolve(res.data));
  });

  const userBanksAPI = new Promise((resolve, reject) => {
    xfers.getUserBanks().then(res => resolve(res.data));
  });

  Promise
    .all([ bankOptionAPI, userBanksAPI ])
    .then(([ bankOptions, userBanks ]) => {
      const res = { bankOptions, userBanks };
      dispatch({ type: INITIALIZATION_SUCCESS, res });
    });
}

export const submitNewBankAccountDetails = (successCallback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });

  const { newBankAccountDetails } = getState().manageBank;

  xfers.addBankAccount(
    caseConvert.toSnake(newBankAccountDetails,
      {'bankStatementFile': 'bank_account_proof', 'fileData': 'fileData', 'fileName': 'fileName'})
  ).then(res => {
    dispatch({ type: SUBMIT_NEW_BANK_ACCOUNT_RESPONSE, res: res.data })
    if (successCallback) successCallback();
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

// export const setErrorMsg = (msg)  => ({
//   type: SET_ERROR_MSG,
//   msg
// })
//
// export const clearErrorMsg = () => ({
//   type: CLEAR_ERROR_MSG
// })

// export const submitNewBankAccountDetails = () => (dispatch) => {
//   dispatch({ type: SEND_HTTP_REQUEST });
//   SInfo.getItem('xfersApiToken', {}).then(token => {
//     if (token) {
//       fetchWithErrorHandling({
//         endPointUrl: BANK_ACCOUNT_END_POINT,
//         fetchOptions: getOptions({
//           method: 'POST',
//           body: JSON.stringify(caseConvert.toSnake({accountNo, bank, accountHolderName, bankStatementFile},
//             {'bankStatementFile': 'bank_account_proof', 'fileData': 'fileData', 'fileName': 'fileName'})),
//         }, token),
//         onSuccess: (res) => {
//           dispatch(clearErrorMsg());
//           dispatch({type: SUBMIT_NEW_BANK_ACCOUNT_RESPONSE});
//         },
//         onError: (res) => {
//           // This is specific for duplicate bank accounts error
//           if (res.error.includes('is already taken.')) {
//             let duplicateAccountError = accountNo + 'has already been taken by another user and cannot be added to this user.'
//             dispatch(setErrorMsg(duplicateAccountError));
//           } else {
//             dispatch(setErrorMsg(res.error));
//           }
//           dispatch({
//             type: SUBMIT_NEW_BANK_ACCOUNT_RESPONSE,
//           });
//         },
//       });
//     } else {
//       // ... Do something about users who don't have tokens
//     }
//   });
// }
