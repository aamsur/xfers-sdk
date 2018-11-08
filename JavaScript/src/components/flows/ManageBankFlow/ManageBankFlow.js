import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import ManageBank from 'ManageBank'
import {
  navigate,
  initializeComponent,
  selectBankForAction,
  updateBankAccountDetails,
  updateSearchFilter,
  initNewBankAccount,
  submitNewBankAccountDetails,
  deleteBankAccount
} from 'ManageBankFlow/actions'
import { getFilteredBankOptions, getSelectedBankDetails, sortUserBanksOnVerification } from 'ManageBankFlow/selectors'

function mapStateToProps({manageBankFlow}, props) {
  const filteredBankOptions = getFilteredBankOptions(manageBankFlow);
  const selectedBankDetails = getSelectedBankDetails(manageBankFlow);
  const { verifiedBanks, nonVerifiedBanks } = sortUserBanksOnVerification(manageBankFlow);

  return {
    ...manageBankFlow,
    filteredBankOptions,
    selectedBankDetails,
    verifiedBanks,
    nonVerifiedBanks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    init: (callback) => dispatch(initializeComponent(callback)),

    navigate: (page) => dispatch(navigate(page)),

    initNewBankAccount: () => dispatch(initNewBankAccount()),

    selectBankForAction: (bankId) => dispatch(selectBankForAction(bankId)),

    updateForm: (k, v) => dispatch(updateBankAccountDetails(k, v)),

    updateSearchFilter: (v) => dispatch(updateSearchFilter(v)),

    submit: (successCallback) => dispatch(submitNewBankAccountDetails(successCallback)),

    deleteBank: (bankId, successCallback) => dispatch(deleteBankAccount(bankId, successCallback)),
  }
}

class ManageBankFlow extends Component {

  componentDidMount() { this.props.init(() => this.props.navigate('index')) }

  render() {
    return (
      <ManageBank {...this.props} />
    )
  }
}

const ConnectedManageBankFlow = connect(mapStateToProps, mapDispatchToProps)(ManageBankFlow);

const ManageBankModal = (props) => (
  <Provider store={createStore(props)}>
    <ConnectedManageBankFlow />
  </Provider>
)

export default ManageBankModal
