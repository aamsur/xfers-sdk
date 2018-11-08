import React, { Component } from 'react'
import { View, LoadingPanel } from 'XfersComponents'
import { BankAccountIndex, BankAccountDelete, NewBankAccountForm } from './components'

export default class ManageBank extends Component {
  render() {
    const { route, closeModal } = this.props;
    return (
      <View>
        { route === '' && <LoadingPanel title="Bank Accounts" onClose={closeModal} /> }
        { route === 'index' && <BankAccountIndex {...this.props}  /> }
        { route === 'new' && <NewBankAccountForm {...this.props}  /> }
        { route === 'delete' && <BankAccountDelete {...this.props} /> }
      </View>

    )
  }
}
