import { caseConvert } from 'UtilityFunctions'
import {
  NAVIGATE,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
} from './constants'

export const navigate = (route) => ({
  type: NAVIGATE,
  route
})


export const initializeComponent = (callback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const xfersApi = getState().verificationFlow.networkClient;

  if (callback) callback();
  // const userBanksAPI = new Promise((resolve, reject) => {
  //   xfersApi.getUserBanks().then(res => resolve(res.data));
  // });
  //
  // Promise
  //   .all([ userBanksAPI ])
  //   .then(([ userBanks ]) => {
  //     const res = { userBanks };
  //     dispatch({ type: INITIALIZATION_SUCCESS, res });
  //
  //     if (navigationCallback) {
  //       if (!userBanks.length) {
  //         navigationCallback('bank')
  //       }
  //       else {
  //         navigationCallback('topUpForm')
  //       }
  //     }
  //   });
}
