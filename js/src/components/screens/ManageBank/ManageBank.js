import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View } from 'XfersComponents'
import {
  BankTypeList,
  BankAccountName,
  BankAccountNumber,
  BankAccountNumberRepeat,
  BankStatement,
  AddBankAccountConfirmation,
  AddBankAccountStatus,
} from './components'
import { initializeComponent } from './actions'

function mapStateToProps(state, props) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(initializeComponent())
  }
}
class ManageBank extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <View>
        <AddBankAccountStatus />
        <BankTypeList />
        <BankAccountName />
        <BankAccountNumber />
        <BankAccountNumberRepeat />
        <AddBankAccountConfirmation />
      </View>
    )
  }
}

const ConnectedManageBank = connect(mapStateToProps, mapDispatchToProps)(ManageBank);

const ManageBankModal = (props) => (
  <Provider store={createStore(props)}>
    <ConnectedManageBank />
  </Provider>
)

export default ManageBankModal
