import React, { PureComponent } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View } from 'XfersComponents'
import { BankAccountIndex, NewBankAccountForm } from './components'

function mapStateToProps({manageBank}, props) {
  const { route } = manageBank;
  return { route, ...props }
}

class ManageBank extends PureComponent {
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

const ConnectedManageBank = connect(mapStateToProps, () => ({}))(ManageBank);

const ManageBankModal = ({ closeModal, networkClient }) => {
  const store = createStore({networkClient});
  console.log("yoyo;:");
  return (
    <Provider store={store}>
      <ConnectedManageBank closeModal={closeModal} networkClient={networkClient} />
    </Provider>
  )
}

export default ManageBankModal
