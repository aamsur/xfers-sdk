import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View } from 'XfersComponents'
import { BankAccountIndex, NewBankAccountForm } from './components'

function mapStateToProps({manageBank}, props) {
  const { route } = manageBank;
  return { route, ...props }
}

class ManageBank extends Component {
  render() {
    const { route, closeModal } = this.props;
    return (
      <View>
        { route === 'index' && <BankAccountIndex closeModal={closeModal} /> }
        { route === 'new' && <NewBankAccountForm closeModal={closeModal} /> }
      </View>

    )
  }
}

const ConnectedManageBank = connect(mapStateToProps, () => {})(ManageBank);

const ManageBankModal = (props) => (
  <Provider store={createStore(props)}>
    <ConnectedManageBank {...props} />
  </Provider>
)

export default ManageBankModal
