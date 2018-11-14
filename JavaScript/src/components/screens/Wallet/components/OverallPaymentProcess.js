import React, { Component } from 'react'
import { Stepper } from 'XfersComponents'
import {
  // Top Up Steps Components
  TopUpConfirmation,
  TopUpFundSource,
  TopUpStatus,
  TopUpInstructions,

  // Payment Steps Components
  PaymentOverview,
  PaymentStatus,
  PendingPaymentDetails,
  PendingPaymentNotification
} from './components'

export default class OverallPaymentProcess extends Component {
  render() {
    return this.props.params.flowType === 'payment' ? <PaymentSteps {...this.props} />
                                                    : <TopUpSteps {...this.props} />
  }
}

class TopUpSteps extends Component {
  render() {
    return (
      <Stepper>
        <TopUpFundSource {...this.props} />
        <TopUpInstructions {...this.props} />
        <TopUpStatus {...this.props} />
      </Stepper>
    )
  }
}

class PaymentSteps extends Component {
  render() {
    const { availableBalance, params, pendingPaymentExist } = this.props;
    if ( pendingPaymentExist ) {
      return (
        <Stepper>
          <PendingPaymentNotification {...this.props} />
          <PendingPaymentDetails {...this.props} />
        </Stepper>
      )
    } else if ( availableBalance > params.amount ) {
      return (
        <Stepper>
          <PaymentOverview {...this.props} />
          <PaymentStatus {...this.props} />
        </Stepper>
      )
    } else {
      return (
        <Stepper>
          <TopUpFundSource {...this.props} />
          <TopUpConfirmation {...this.props} />
          <TopUpInstructions {...this.props} />
          <TopUpStatus {...this.props} />
        </Stepper>
      )
    }
  }
}
