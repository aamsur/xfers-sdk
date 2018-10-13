import Xfers from 'xfersWrapper.js'
import {
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  UPDATE_BANK_ACCOUNT_DETAILS,
  UPDATE_SEARCH_FILTER
} from './constants'

// TO-DO: To be removed from this location.
const xfers = new Xfers("YTB7iBVauTzJ8zyk6cJ3ooTKUGJMQ-SYDPxFNFTDs4E");


export const initializeComponent = () => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });

  const bankOptionAPI = new Promise((resolve, reject) => {
    xfers.getAvailableBanks().then(res => resolve(res.data));
  });

  Promise
    .all([ bankOptionAPI ])
    .then(([ bankOptions ]) => {
      const res = { bankOptions };
      dispatch({ type: INITIALIZATION_SUCCESS, res });
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

export const setErrorMsg = (msg)  => ({
  type: SET_ERROR_MSG,
  msg
})

export const clearErrorMsg = () => ({
  type: CLEAR_ERROR_MSG
})
