import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import Wallet from 'Wallet'
import {
  navigate,
  initializeComponent,
  updateTopUpDetails,
  submitNewTopUpRequest,
  addUserBank,
  selectBankForAction,
  confirmPayment
} from 'WalletFlow/actions'
import { getSelectedBankDetails, sortUserBanksOnVerification } from 'WalletFlow/selectors'

function mapStateToProps({walletFlow}, props) {
  const selectedBankDetails = getSelectedBankDetails(walletFlow);
  const { verifiedBanks, nonVerifiedBanks } = sortUserBanksOnVerification(walletFlow);
  return {
    ...walletFlow,
    selectedBankDetails,
    verifiedBanks,
    nonVerifiedBanks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    init: (successCallback) => dispatch(initializeComponent(successCallback)),

    navigate: (page) => dispatch(navigate(page)),

    updateForm: (k, v) => dispatch(updateTopUpDetails(k, v)),

    submit: (successCallback) => dispatch(submitNewTopUpRequest(successCallback)),

    selectBankForAction: (bankId) => dispatch(selectBankForAction(bankId)),

    addUserBank: (bank) => dispatch(addUserBank(bank)),

    confirm: (successCallback) => dispatch(confirmPayment(successCallback))
  }
}

class WalletFlow extends Component {

  componentDidMount() { this.props.init(() => this.props.navigate('index')) }

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
