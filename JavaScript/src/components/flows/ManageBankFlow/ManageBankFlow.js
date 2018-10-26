import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import ManageBank from 'ManageBank'
import {
  navigate,
  initializeComponent,
  updateBankAccountDetails,
  updateSearchFilter,
  initNewBankAccount,
  submitNewBankAccountDetails
} from 'ManageBankFlow/actions'
import { getFilteredBankOptions } from 'ManageBankFlow/selectors'

function mapStateToProps({manageBankFlow}, props) {
  const filteredBankOptions = getFilteredBankOptions(manageBankFlow);
  return { ...manageBankFlow, filteredBankOptions };
}

function mapDispatchToProps(dispatch) {
  return {
    init: (callback) => dispatch(initializeComponent(callback)),

    navigate: (page) => dispatch(navigate(page)),

    initNewBankAccount: () => dispatch(initNewBankAccount()),

    updateForm: (k, v) => dispatch(updateBankAccountDetails(k, v)),

    updateSearchFilter: (v) => dispatch(updateSearchFilter(v)),

    submit: (successCallback) => dispatch(submitNewBankAccountDetails(successCallback))
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
