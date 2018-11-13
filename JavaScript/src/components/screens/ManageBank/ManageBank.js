import React, { Component } from 'react'
import { View, LoadingPanel, Stepper } from 'XfersComponents'
import { BankAccountIndex, BankAccountDelete, NewBankAccountForm } from './components'
import { VerifiedBankAccountCheck, BankAccountCheck } from 'EligibilityCheck'

export default class ManageBank extends Component {
  render() {
    const { route, closeModal, isIndo, userBanks, navigate } = this.props;
    const userBankExist = userBanks.length > 0
    const navigateToNew = () => navigate('new')

    return (
      <View>
        { route === '' && <LoadingPanel title="Bank Accounts" onClose={closeModal} /> }
        { route === 'index' &&
          <View>
            { userBankExist ? <BankAccountIndex {...this.props}  />
              : <View>
                  { isIndo ? <BankAccountCheck {...this.props} goNext={navigateToNew} />
                    : <VerifiedBankAccountCheck {...this.props} goNext={navigateToNew} />
                  }
                </View>
            }
          </View>
        }
        { route === 'new' && <NewBankAccountForm {...this.props}  /> }
        { route === 'delete' && <BankAccountDelete {...this.props} /> }
      </View>

    )
  }
}
