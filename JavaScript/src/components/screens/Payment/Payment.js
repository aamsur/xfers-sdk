import React, { Component } from 'react'
import { View, LoadingPanel } from 'XfersComponents'
import { PaymentSteps } from './components'
import TopUpFlow from 'TopUpFlow'

export default class Payment extends Component {
  render() {
    const { params, route, networkClient, closeModal } = this.props;
    const topUpParams = { ...params, flowType: 'payment' }
    return (
      <View>
        { route === '' && <LoadingPanel title="Make Payment" onClose={closeModal} /> }
        { route === 'payment' && <PaymentSteps {...this.props} /> }
        { route === 'topup' &&
          <TopUpFlow networkClient={networkClient} closeModal={closeModal} {...topUpParams} />
        }
      </View>
    )
  }
}
