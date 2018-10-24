import React, { Component } from 'react'
import { Stepper } from 'XfersComponents'
import {
  TopUpAmount,
  TopUpFundSource,
  TopUpConfirmation,
  TopUpStatus,
  TopUpInstructions
} from './components'

class TopUpForm extends Component {
  render() {
    return (
      <Stepper>
        <TopUpAmount />
        <TopUpFundSource />
        <TopUpConfirmation />
        <TopUpInstructions />
        <TopUpStatus />
      </Stepper>
    )
  }
}

export default TopUpForm
