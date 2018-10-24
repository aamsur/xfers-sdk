import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View } from 'XfersComponents'
import { PaymentIndex, PaymentSteps } from './components'
import { initializeComponent } from 'Payment/actions'
import TopUp from 'TopUp'

function mapStateToProps({payment}, props) {
  const { networkClient, route } = payment;
  return { networkClient, route }
}

class Payment extends Component {
  render() {
    const { networkClient, route } = this.props;
    return (
      <View>
        { route === 'index' && <PaymentIndex /> }
        { route === 'payment' && <PaymentSteps /> }
        { route === 'topup' && <TopUp networkClient={networkClient} close /> }
      </View>
    )
  }
}

const ConnectedPayment = connect(mapStateToProps, () => ({}))(Payment);

const PaymentModal = (props) => (
  <Provider store={createStore(props)}>
    <ConnectedPayment />
  </Provider>
)

export default PaymentModal
