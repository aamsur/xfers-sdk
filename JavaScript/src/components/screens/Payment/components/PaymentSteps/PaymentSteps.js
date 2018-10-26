import React, { Component } from 'react'
import { Stepper } from 'XfersComponents'
import { PaymentOverview, PaymentStatus } from './components'

export default class PaymentForm extends Component {
  render() {
    return (
      <Stepper>
        <PaymentOverview {...this.props} />
        <PaymentStatus {...this.props} />
      </Stepper>
    )
  }
}
