import {
  SEND_HTTP_REQUEST,
  INIT_WITHDRAWAL_FORM,
  UPDATE_WITHDRAWAL_DETAILS,
  FETCH_FEE_BREAKDOWN_SUCCESS,
  FETCH_FEE_BREAKDOWN_ERROR,
  SUBMIT_WITHDRAWAL_SUCCEESS,
  SUBMIT_WITHDRAWAL_ERROR,
} from './constants'
import { toCurrency } from 'UtilityFunctions'

export const initWithdrawalForm = ({ type: INIT_WITHDRAWAL_FORM })

export const fetchWithdrawalLimits = () => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const { networkClient: xfersApi } = getState().walletStore;

  xfersApi.getWithdrawalLimits().then(res => {
    dispatch({ type: FETCH_WITHDRAWAL_LIMITS_SUCCESS, res: res.data });
  })
}

export const fetchFeeBreakdown = (callback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const { newWithdrawalRequest, userWithdrawalStatus, networkClient: xfersApi } = getState().walletStore;

  const { withdrawalAmount } = newWithdrawalRequest;
  const { dailyRemaining, monthlyRemaining } = userWithdrawalStatus;

  if (dailyRemaining < withdrawalAmount) {
    dispatch({ type: FETCH_FEE_BREAKDOWN_ERROR, res: `You remaining daily limit is ${toCurrency(dailyRemaining)}, please enter an amount within the limit.` });
  }
  else if (monthlyRemaining < withdrawalAmount) {
    dispatch({ type: FETCH_FEE_BREAKDOWN_ERROR, res: `You remaining monthly limit is ${toCurrency(monthlyRemaining)}, please enter an amount within the limit.` });
  }
  else {
    xfersApi.getWithdrawalFeesBreakdown(withdrawalAmount).then(res => {
      dispatch({ type: FETCH_FEE_BREAKDOWN_SUCCESS, res: res.data });
      if (callback) callback();
    })
    .catch(err => {
      dispatch({ type: FETCH_FEE_BREAKDOWN_ERROR, res: err.data })
    });
  }

  // if (walletId == 1 && withdrawalAmount > 50000) {
  //   limitExceeded = true;
  // } else if (walletId == 2 &&
  //   (dailyRemaining < withdrawalAmount) ||
  //   (monthlyRemaining < withdrawalAmount)
  // ) {
  //   limitExceeded = true;
  // }
}

export const submitWithdrawalRequest = (callback) => (dispatch, getState) => {
  dispatch({ type: SEND_HTTP_REQUEST });
  const { newWithdrawalRequest, networkClient: xfersApi } = getState().walletStore;

  const express = newWithdrawalRequest.withdrawalProcessingType == "express" ? true : false;
  xfersApi.createWithdrawalRequest({
    bankId: newWithdrawalRequest.withdrawalBankId,
    amount: newWithdrawalRequest.withdrawalAmount,
    express
  }).then(res => {
    dispatch({ type: SUBMIT_WITHDRAWAL_SUCCEESS, res: res.data });
    if (callback) callback();
  })
  .catch(err => {
    dispatch({ type: SUBMIT_WITHDRAWAL_ERROR, res: err.data })
  });
}

export const updateWithdrawalDetails = (type, data) => ({
  type: UPDATE_WITHDRAWAL_DETAILS,
  formType: type,
  formData: data,
})
