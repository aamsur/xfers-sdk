import React, { Component } from 'react'
import { View, LoadingPanel, Stepper } from 'XfersComponents'

import { OverallPaymentProcess } from './components'
import { AccountVerificationCheck, VerifiedBankAccountCheck } from 'EligibilityCheck'

import ManageBankFlow from 'ManageBankFlow'
import VerificationFlow from 'VerificationFlow'

export default class TopUp extends Component {
  render() {
    const {
      route, networkClient, kycVerified,
      closeModal, navigate, addUserBank,
      userBanks, verifiedBanks, nonVerifiedBanks
    } = this.props;
    // Transwap requires the banks to be verified.
    const userBankExist = verifiedBanks.length > 0
    const userAllowedToContinue = userBankExist && kycVerified

    const manageBankParams = {
      goBackPreviousModule: () => navigate('index'),
      addUserBank: (bank) => addUserBank(bank)
    }

    const navigateToKyc = () => navigate('kyc')
    const navigateToBank = () => navigate('bank')

    return (
      <View>
        { route === '' && <LoadingPanel title="Make Payment" onClose={closeModal} /> }
        { route === 'index' &&
          <View>
            { userAllowedToContinue ? <OverallPaymentProcess {...this.props} />
            : <View>
                { !kycVerified ? <AccountVerificationCheck {...this.props} goNext={navigateToKyc} />
                  : <VerifiedBankAccountCheck {...this.props} goNext={navigateToBank} />
                }
              </View>
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
