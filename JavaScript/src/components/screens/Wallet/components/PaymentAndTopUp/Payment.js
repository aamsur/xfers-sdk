import React, { Component } from 'react'
import { View, Stepper, LoadingPanel } from 'XfersComponents'
import {
  // Top Up Steps Components
  TopUpConfirmation,
  TopUpFundSource,
  TopUpStatus,
  TopUpInstructions,

  // Payment Steps Components
  PaymentOverview,
  PaymentStatus,
  PendingPaymentDetails,
  PendingPaymentNotification
} from './components'

import { AccountVerificationCheck, VerifiedBankAccountCheck } from 'EligibilityCheck'

export default class Payment extends Component {
  render() {

    const { initialized, paymentRoute, closeModal, kycVerified, verifiedBanks, navigateFlowType, navigateInBankFlow } = this.props;

    // Transwap requires the banks to be verified.
    const userBankExist = verifiedBanks.length > 0
    const userAllowedToContinue = userBankExist && kycVerified

    if ( !initialized ) return (<LoadingPanel title="Make Payment" onClose={closeModal} />);

    return (
      <View>
        { userAllowedToContinue ? <PaymentProcessFlow {...this.props} />
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

class PaymentProcessFlow extends Component {
  render() {

    const { availableBalance, params, pendingPaymentExist } = this.props;
    if ( pendingPaymentExist ) {
      return (
        <Stepper>
          <PendingPaymentNotification {...this.props} />
          <PendingPaymentDetails {...this.props} />
        </Stepper>
      )
    } else if ( availableBalance > params.amount ) {
      return (
        <Stepper>
          <PaymentOverview {...this.props} />
          <PaymentStatus {...this.props} />
        </Stepper>
      )
    } else {
      return (
        <Stepper>
          <TopUpFundSource {...this.props} />
          <TopUpConfirmation {...this.props} />
          <TopUpInstructions {...this.props} />
          <TopUpStatus {...this.props} />
        </Stepper>
      )
    }
  }
}
