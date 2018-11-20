import {
  SEND_HTTP_REQUEST,
  UPDATE_TOP_UP_DETAILS,
  SUBMIT_TOP_UP_REQUEST_RESPONSE
} from './constants'

export const updateTopUpDetails = (type, data) => ({
  type: UPDATE_TOP_UP_DETAILS,
  formType: type,
  formData: data,
})

export const submitNewTopUpRequest = (successCallback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const { newTopUpRequest, networkClient: xfersApi } = getState().walletStore;
  const { topUpAmount, bank } = newTopUpRequest;

  xfersApi.createTopUpRequest({ amount: topUpAmount, bank_id: bank })
    .then(res => {
      dispatch({ type: SUBMIT_TOP_UP_REQUEST_RESPONSE, res: res.data });
      if (successCallback) successCallback();
    })
    .catch(err => {
      dispatch({ type: SUBMIT_TOP_UP_REQUEST_RESPONSE, res: err.data });
    })
}
