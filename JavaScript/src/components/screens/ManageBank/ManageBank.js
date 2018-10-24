import React, { PureComponent } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View } from 'XfersComponents'
import { BankAccountIndex, NewBankAccountForm } from './components'

function mapStateToProps({manageBank}, props) {
  const { route } = manageBank;
  return { route }
}

class ManageBank extends PureComponent {
  render() {
    const { route } = this.props;
    return (
      <View>
        { route === 'index' && <BankAccountIndex /> }
        { route === 'new' && <NewBankAccountForm /> }
      </View>

    )
  }
}

const ConnectedManageBank = connect(mapStateToProps, () => ({}))(ManageBank);

const ManageBankModal = (props) => (
  <Provider store={createStore(props)}>
    <ConnectedManageBank />
  </Provider>
)

export default ManageBankModal
