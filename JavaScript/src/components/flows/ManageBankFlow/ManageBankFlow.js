import React, { PureComponent } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View } from 'XfersComponents'
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
    init: () => dispatch(initializeComponent()),
    navigateToPage: (page) => dispatch(navigate(page)),
    navigateToForm: () => dispatch(navigate('new')),
    initNewBankAccount: () => dispatch(initNewBankAccount()),
    goHome: () => dispatch(navigate('index')),

    updateForm: (k, v) => dispatch(updateBankAccountDetails(k, v)),
    updateSearchFilter: (v) => dispatch(updateSearchFilter(v)),
    submit: (successCallback) => dispatch(submitNewBankAccountDetails(successCallback))
  }
}

class ManageBankFlow extends PureComponent {

  componentDidMount() {
    const callback = (page) => {
      this.props.navigateToPage('index');
    }
    this.props.init(callback);
  }

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
