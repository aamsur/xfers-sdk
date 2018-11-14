import React, { Component } from 'react'
import { View, LoadingPanel } from 'XfersComponents'
import { TopUpForm } from './components'
import ManageBankFlow from 'ManageBankFlow'
import { AccountVerificationCheck } from 'EligibilityCheck'

export default class TopUp extends Component {
  render() {
    const { route, networkClient, closeModal, navigate, addUserBank } = this.props;
    const manageBankParams = {
      goBackPreviousModule: () => navigate('topUpForm'),
      addUserBank: (bank) => addUserBank(bank)
    }

    const navigateToKyc = () => navigate('kyc')

    return (
      <View>
        { route === '' && <LoadingPanel title="Make Payment" onClose={closeModal} /> }
        { route === 'topUpForm' &&
          <View>
            { kycVerified ? <TopUpForm {...this.props} />
            : <AccountVerificationCheck {...this.props} goNext={navigateToKyc} />
             }
          </View>
        }
        { route === 'kyc' &&
          <VerificationFlow networkClient={networkClient} closeModal={closeModal} />
        }
        { route === 'bank' &&
          <ManageBankFlow networkClient={networkClient} closeModal={closeModal} params={manageBankParams} />
        }
      </View>
    )
  }
}
