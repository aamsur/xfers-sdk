import React, { Component } from 'react'
import { View, LoadingPanel } from 'XfersComponents'
import { TopUpForm } from './components'
import ManageBankFlow from 'ManageBankFlow'

export default class TopUp extends Component {
  render() {
    const { route, networkClient, closeModal, navigate, addUserBank } = this.props;
    const manageBankParams = {
      goBackPreviousModule: () => navigate('topUpForm'),
      addUserBank: (bank) => addUserBank(bank)
    }
    return (
      <View>
        { route === '' && <LoadingPanel title="Make Payment" onClose={closeModal} /> }
        { route === 'topUpForm' && <TopUpForm {...this.props} /> }
        { route === 'bank' &&
          <ManageBankFlow networkClient={networkClient} closeModal={closeModal} {...manageBankParams} />
        }
      </View>
    )
  }
}
