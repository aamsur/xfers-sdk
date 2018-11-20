import React, { Component } from 'react'
import { View, LoadingPanel } from 'XfersComponents'
import { BankAccountIndex, BankAccountDelete, NewBankAccountForm } from './components'
import { VerifiedBankAccountCheck, BankAccountCheck } from 'EligibilityCheck'

export default class ManageBank extends Component {
  render() {
    const { initialized, bankRoute, closeModal, isIndo, userBanks, navigateInBankFlow } = this.props;

    const userBankExist = userBanks.length > 0
    const navigateToNew = () => navigateInBankFlow('new')

    if ( !initialized ) {
      return (<LoadingPanel title="Bank Accounts" onClose={closeModal} />)
    }

    return (
      <View>
        { bankRoute === 'index' &&
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
        { bankRoute === 'new' && <NewBankAccountForm {...this.props}  /> }
        { bankRoute === 'delete' && <BankAccountDelete {...this.props} /> }
      </View>
    )
  }
}
