import React, { Component } from 'react'
import { Stepper } from 'XfersComponents'
import { PaymentOverview, PaymentStatus } from './components'

class PaymentForm extends Component {
  render() {
    return (
      <Stepper>
        <PaymentOverview />
        <PaymentStatus />
      </Stepper>
    )
  }
}

export default PaymentForm
