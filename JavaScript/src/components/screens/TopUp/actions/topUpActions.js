import { caseConvert } from 'UtilityFunctions'
import {
  NAVIGATE,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  UPDATE_TOP_UP_DETAILS
} from './constants'

export const navigate = (route) => ({
  type: NAVIGATE,
  route
})

export const initializeComponent = (successCallback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const xfersApi = getState().topUp.network;

  const userBanksAPI = new Promise((resolve, reject) => {
    xfersApi.getUserBanks().then(res => resolve(res.data));
  });

  Promise
    .all([ userBanksAPI ])
    .then(([ userBanks ]) => {
      const res = { userBanks };
      dispatch({ type: INITIALIZATION_SUCCESS, res });
      if (successCallback) successCallback();
    });
}

export const updateTopUpDetails = (type, data) => ({
  type: UPDATE_TOP_UP_DETAILS,
  formType: type,
  formData: data,
})

// export const submitNewBankAccountDetails = (successCallback) => (dispatch, getState) => {
//   dispatch({ type: SEND_HTTP_REQUEST });
//
//   const { newBankAccountDetails } = getState().manageBank;
//
//   xfers.addBankAccount(
//     caseConvert.toSnake(newBankAccountDetails,
//       {'bankStatementFile': 'bank_account_proof', 'fileData': 'fileData', 'fileName': 'fileName'})
//   ).then(res => {
//     dispatch({ type: SUBMIT_NEW_BANK_ACCOUNT_RESPONSE, res: res.data })
//     if (successCallback) successCallback();
//   })
//   .catch(err => {
//     dispatch({ type: SUBMIT_NEW_BANK_ACCOUNT_RESPONSE, res: err.data })
//   });
// }
//
// export const updateBankAccountDetails = (type, data) => ({
//   type: UPDATE_BANK_ACCOUNT_DETAILS,
//   formType: type,
//   formData: data,
// })

// export const initNewBankAccount = () => ({
//   type: INIT_NEW_BANK_ACCOUNT,
// })

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
