import React, { Component } from 'react'
import { View, LoadingPanel } from 'XfersComponents'
import { TopUpForm } from './components'
import ManageBankFlow from 'ManageBankFlow'

export default class TopUp extends Component {
  render() {
    const { route, networkClient, closeModal, navigate } = this.props;
    return (
      <View>
        { route === '' && <LoadingPanel title="Make Payment" onClose={closeModal} /> }
        { route === 'topUpForm' && <TopUpForm {...this.props} /> }
        { route === 'bank' &&
          <ManageBankFlow
            networkClient={networkClient}
            closeModal={closeModal}
            goBackPreviousModule={() => navigate('topUpForm')} />
        }
      </View>
    )
  }
}
