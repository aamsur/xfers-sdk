import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View } from 'XfersComponents'
import { PaymentIndex, PaymentSteps } from './components'
import { initializeComponent } from 'Payment/actions'

function mapStateToProps({payment}, props) {
  const { route } = payment;
  return { route }
}

class Payment extends Component {
  render() {
    const { route } = this.props;
    return (
      <View>
        { route === 'index' && <PaymentIndex /> }
        { route === 'payment' && <PaymentSteps /> }
      </View>
    )
  }
}

const ConnectedPayment = connect(mapStateToProps, () => ({}))(Payment);

const PaymentModal = ({ closeModal, networkClient }) => (
  <Provider store={createStore({networkClient})}>
    <ConnectedPayment closeModal={closeModal} />
  </Provider>
)

export default PaymentModal
