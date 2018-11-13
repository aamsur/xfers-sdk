import React, { Component } from 'react'
import { Stepper } from 'XfersComponents'
import {
  TopUpAmount,
  TopUpFundSource,
  TopUpConfirmation,
  TopUpStatus,
  TopUpInstructions
} from './components'

export default class TopUpForm extends Component {
  render() {
    if (this.props.params && this.props.params.flowType === 'payment') {
      return (
        <Stepper>
          <TopUpConfirmation {...this.props} />]
          <TopUpFundSource {...this.props} />
          <TopUpInstructions {...this.props} />
          <TopUpStatus {...this.props} />
        </Stepper>
      );
    } else {
      return (
        <Stepper>
          <TopUpFundSource {...this.props} />
          <TopUpInstructions {...this.props} />
          <TopUpStatus {...this.props} />
        </Stepper>
      )
    }
  }
}
