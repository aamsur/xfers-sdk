import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View, Button, Modal } from 'XfersComponents'
import { openModal, closeModal } from './actions'
import { PaymentSteps } from './components'

function mapStateToProps({payment}, props) {
  const { showModal, route } = payment;
  return { showModal, route }
}

function mapDispatchToProps(dispatch) {
  return {
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
  }
}

class Payment extends Component {
  render() {
    const { showModal, openModal, route } = this.props;
    return (
      <View>
        <PaymentSteps />
        <Modal showModal={showModal} closeModal={closeModal}>

        </Modal>
        <Button onClick={openModal}>Trigger Payment Modal</Button>
      </View>
    )
  }
}

const ConnectedPayment = connect(mapStateToProps, mapDispatchToProps)(Payment);

const PaymentModal = ({ closeModal, networkClient }) => {
  return (
    <Provider store={createStore()}>
      <ConnectedPayment />
    </Provider>
  )
}

export default PaymentModal
