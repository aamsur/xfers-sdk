import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View, Button, Modal } from 'XfersComponents'
import {
  BankAccountIndex,
  NewBankAccountForm,
} from './components'
import { openModal, closeModal } from './actions'

function mapStateToProps({manageBank}, props) {
  const { showModal, route } = manageBank;
  return { showModal, route }
}

function mapDispatchToProps(dispatch) {
  return {
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
  }
}
class ManageBank extends Component {
  render() {
    const { showModal, route, openModal } = this.props;
    return (
      <View>
        <Modal showModal={showModal} closeModal={closeModal}>
          { route === 'index' && <BankAccountIndex /> }
          { route === 'new' && <NewBankAccountForm /> }
        </Modal>
        <Button onClick={openModal}>Trigger Bank Modal</Button>
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
