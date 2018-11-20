import React, { Component } from 'react'
import { View, Stepper, LoadingPanel } from 'XfersComponents'
import {
  TopUpAmount,
  TopUpFundSource,
  TopUpStatus,
  TopUpInstructions,
} from './components'

import { AccountVerificationCheck, VerifiedBankAccountCheck } from 'EligibilityCheck'

export default class TopUp extends Component {
  render() {

    const { initialized, topupRoute, closeModal, kycVerified, verifiedBanks, navigateFlowType, navigateInBankFlow } = this.props;

    // Transwap requires the banks to be verified.
    const userBankExist = verifiedBanks.length > 0
    const userAllowedToContinue = userBankExist && kycVerified

    if ( !initialized ) return (<LoadingPanel title="Top-up" onClose={closeModal} />);

    return (
      <View>
        { userAllowedToContinue ? <TopUpProcessFlow {...this.props} />
          : <View>
              { !kycVerified ? <AccountVerificationCheck {...this.props} goNext={() => navigateFlowType('kyc')} />
                : <VerifiedBankAccountCheck {...this.props} goNext={() => navigateInBankFlow('new')} />
              }
            </View>
        }
      </View>
    );

  }
}

class TopUpProcessFlow extends Component {
  render() {

    const { walletId } = this.props;

    if ( walletId == "2") { // Digital Goods Wallet
      return (
        <Stepper>
          <TopUpAmount {...this.props} />
          <TopUpFundSource {...this.props} />

          <TopUpInstructions {...this.props} />
          <TopUpStatus {...this.props} />
        </Stepper>
      )
    }
    else if ( walletId == "5" ) { // Remittance Wallet
      return (
        <Stepper>
          <TopUpFundSource {...this.props} />
          <TopUpInstructions {...this.props} />
          <TopUpStatus {...this.props} />
        </Stepper>
      )
    }
    else {
      return (<View>No wallet Id given.</View>)
    }
  }
}
