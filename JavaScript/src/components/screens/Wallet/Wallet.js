import React, { Component } from 'react'
import { View, LoadingPanel } from 'XfersComponents'

import { ManageBank, Payment, TopUp, Withdrawal } from './components'
import VerificationFlow from 'VerificationFlow'

export default class Wallet extends Component {
  render() {
    const { flowType, networkClient, navigateFlowType, closeModal } = this.props;

    const manageBankParams = {
      goBackPreviousModule: () => navigateFlowType('index'),
    }

    return (
      <View>
        { flowType === '' && <LoadingPanel title="Wallet" onClose={closeModal} /> }
        { flowType === 'topup' && <TopUp {...this.props} /> }
        { flowType === 'payment' && <Payment {...this.props} /> }
        { flowType === 'bank' && <ManageBank {...this.props} /> }
        { flowType === 'withdrawal' && <Withdrawal {...this.props} /> }

        { flowType === 'kyc' &&
          <VerificationFlow networkClient={networkClient} closeModal={closeModal} />
        }

      </View>
    )
  }
}

// { flowType === 'bank' &&
//   <ManageBankFlow networkClient={networkClient} closeModal={closeModal} params={manageBankParams} />
// }
