import React, { Component } from 'react'
import { View, LoadingPanel } from 'XfersComponents'

export default class Verification extends Component {
  render() {
    const { route, networkClient, closeModal } = this.props;
    return (
      <View>
        { route === '' && <LoadingPanel title="Identity Verification" onClose={closeModal} /> }
      </View>
    )
  }
}
