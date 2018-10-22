import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View } from 'XfersComponents'
import {
  TopUpInstructions,
  TopUpAmount,
  TopUpFundSource,
  TopUpConfirmation,
  TopUpStatus,
} from './components'

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

class TopUpForm extends Component {

  render() {
    return (
      <View>
        <TopUpAmount />
        <TopUpFundSource />
        <TopUpConfirmation />
        <TopUpInstructions />
        <TopUpStatus />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUpForm)
