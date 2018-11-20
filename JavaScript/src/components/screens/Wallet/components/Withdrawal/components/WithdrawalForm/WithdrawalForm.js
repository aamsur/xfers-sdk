import React, { Component } from 'react'
import { Stepper } from 'XfersComponents'
import {
  WithdrawalAmount,
  WithdrawalFundDest,
  WithdrawalConfirmation,
  WithdrawalStatus,
} from './components'

export default class WithdrawalForm extends Component {
  render() {
    return (
      <Stepper>
        <WithdrawalFundDest {...this.props} />
        <WithdrawalAmount {...this.props} />
        <WithdrawalConfirmation {...this.props} />
        <WithdrawalStatus {...this.props} />
      </Stepper>
    )
  }
}
