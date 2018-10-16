import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import {
  BankTypeList,
  BankAccountName,
  BankAccountNumber,
  BankAccountNumberRepeat,
  BankStatement,
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
      <BankAccountName />
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
