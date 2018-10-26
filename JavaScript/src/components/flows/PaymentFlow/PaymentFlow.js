import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View } from 'XfersComponents'
import Payment from 'Payment'

import {
  navigate,
  initializeComponent,
  confirmPayment
} from 'PaymentFlow/actions'

function mapStateToProps({paymentFlow}, props) {
  return paymentFlow;
}

function mapDispatchToProps(dispatch) {
  return {
    init: (successCallback) => dispatch(initializeComponent(successCallback)),
    navigateToPage: (page) => dispatch(navigate(page)),
    confirm: (successCallback) => dispatch(confirmPayment(successCallback))
  }
}

class PaymentFlow extends Component {

  componentDidMount() {
    const callback = (page) => {
      this.props.navigateToPage(page);
    }
    this.props.init(callback);
  }

  render() {
    return (
      <Payment {...this.props} />
    )
  }
}

const ConnectedPaymentFlow = connect(mapStateToProps, mapDispatchToProps)(PaymentFlow);

const PaymentModal = (props) => (
  <Provider store={createStore(props)}>
    <ConnectedPaymentFlow />
  </Provider>
)

export default PaymentModal
