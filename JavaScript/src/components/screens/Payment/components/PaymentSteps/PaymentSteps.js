import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View } from 'XfersComponents'
import { PaymentOverview, PaymentStatus } from './components'
import { initializeComponent } from 'Payment/actions'

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

class PaymentForm extends Component {
  render() {
    return (
      <View>
        <PaymentOverview />
        <PaymentStatus />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm)
