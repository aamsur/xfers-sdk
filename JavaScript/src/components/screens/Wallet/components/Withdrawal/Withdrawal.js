import React, { Component } from 'react'
import { View, LoadingPanel } from 'XfersComponents'
import { WithdrawalForm } from './components'

import { AccountVerificationCheck, VerifiedBankAccountCheck } from 'EligibilityCheck'

export default class Withdrawal extends Component {
  render() {

    const { initialized, withdrawalRoute, closeModal, kycVerified, verifiedBanks, navigateFlowType, navigateInBankFlow } = this.props;

    const userBankExist = verifiedBanks.length > 0
    const userAllowedToContinue = userBankExist && kycVerified

    if ( !initialized ) {
      return (<LoadingPanel title="Withdrawal" onClose={closeModal} />)
    }

    return (
      <View>
        { userAllowedToContinue ? <WithdrawalForm {...this.props} />
          : <View>
            { !kycVerified ? <AccountVerificationCheck {...this.props} goNext={() => navigateFlowType('kyc')} />
              : <VerifiedBankAccountCheck {...this.props} goNext={() => navigateInBankFlow('new')} />
            }
            </View>
        }
      </View>
    )
  }
}
