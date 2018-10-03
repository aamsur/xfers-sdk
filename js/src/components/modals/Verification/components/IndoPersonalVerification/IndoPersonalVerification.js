import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ModalHeader, View } from 'XfersComponents'


class IndoPersonalVerification extends Component {
  render() {
    return (
      <div>
        <ModalHeader title="IDENTITY VERIFICATION">
          <View textAlign="center">Please prepare your KTP for the following steps.</View>
        </ModalHeader>
      </div>
    )
  }
}

export default IndoPersonalVerification
