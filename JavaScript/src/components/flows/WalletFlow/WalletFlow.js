import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import Wallet from 'Wallet'
import {
  navigateFlowType,
  navigateScreenInFlowType,
  initializeComponent,
  updateTopUpDetails,
  submitNewTopUpRequest,
  selectBankForAction,
  confirmPayment,


  updateBankAccountDetails,
  updateSearchFilter,
  initNewBankAccount,
  submitNewBankAccountDetails,
  deleteBankAccount,

  updateWithdrawalDetails,
  initWithdrawalForm,
  fetchWithdrawalLimits,
  fetchFeeBreakdown,
  submitWithdrawalRequest

} from 'WalletFlow/actions'
import { getFilteredBankOptions, getSelectedBankDetails, sortUserBanksOnVerification } from 'WalletFlow/selectors'

function mapStateToProps({walletStore}, props) {
  const filteredBankOptions = getFilteredBankOptions(walletStore);
  const selectedBankDetails = getSelectedBankDetails(walletStore);
  const { verifiedBanks, nonVerifiedBanks } = sortUserBanksOnVerification(walletStore);
  return {
    ...walletStore,
    filteredBankOptions,
    selectedBankDetails,
    verifiedBanks,
    nonVerifiedBanks,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(initializeComponent()),

    navigateFlowType: (flowType) => dispatch(navigateFlowType(flowType)),

    navigateInBankFlow: (screen) => dispatch(navigateScreenInFlowType('bank', screen)),

    navigateInWithdrawalFlow: (screen) => dispatch(navigateScreenInFlowType('withdrawal', screen)),

    navigateInTopupFlow: (screen) => dispatch(navigateScreenInFlowType('topup', screen)),

    navigateInPaymentFlow: (screen) => dispatch(navigateScreenInFlowType('payment', screen)),

    selectBankForAction: (bankId) => dispatch(selectBankForAction(bankId)),

    // MANAGE BANK ACTIONS

    updateSearchFilter: (v) => dispatch(updateSearchFilter(v)),

    updateBankAccountDetails: (k, v) => dispatch(updateBankAccountDetails(k, v)),

    submitNewBankAccountDetails: (successCallback) => dispatch(submitNewBankAccountDetails(successCallback)),

    initNewBankAccount: () => dispatch(initNewBankAccount()),

    deleteBank: (bankId, successCallback) => dispatch(deleteBankAccount(bankId, successCallback)),

    // WITHDRAWAL ACTIONS

    updateWithdrawalDetails: (k, v) => dispatch(updateWithdrawalDetails(k, v)),

    fetchFeeBreakdown: (successCallback) => dispatch(fetchFeeBreakdown(successCallback)),

    submitWithdrawalRequest: (successCallback) => dispatch(submitWithdrawalRequest(successCallback)),

    // TOP-UP & PAYMENT ACTIONS

    updateTopUpDetails: (k, v) => dispatch(updateTopUpDetails(k, v)),

    submitNewTopUpRequest: (successCallback) => dispatch(submitNewTopUpRequest(successCallback)),

    confirmPayment: (successCallback) => dispatch(confirmPayment(successCallback)),
  }
}

class WalletFlow extends Component {

  componentDidMount() { this.props.init() }

  render() {
    return (
      <Wallet {...this.props} />
    )
  }
}

const ConnectedWalletFlow = connect(mapStateToProps, mapDispatchToProps)(WalletFlow);

const TopUpModal = (props) => (
  <Provider store={createStore(props)}>
    <ConnectedWalletFlow />
  </Provider>
)

export default TopUpModal
