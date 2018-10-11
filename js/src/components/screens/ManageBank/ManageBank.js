import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { BankTypeList } from './components'

function mapStateToProps(state, props) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

class ManageBank extends Component {
  render() {
    return (
      <BankTypeList />
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
