import React, { Component } from 'react'
import { Stepper } from 'XfersComponents'
import {
  BankTypeList,
  BankAccountName,
  BankAccountNumber,
  BankAccountNumberRepeat,
  BankStatement,
  AddBankAccountConfirmation,
  AddBankAccountStatus,
} from './components'

export default class NewBankAccountForm extends Component {

  componentDidMount() {
    this.props.initNewBankAccount();
  }

  render() {
    const { goBack } = this.props;
    return (
      <Stepper>
        <BankTypeList goBack={goBack} {...this.props} />
        <BankAccountName {...this.props} />
        <BankAccountNumber {...this.props} />
        <BankAccountNumberRepeat {...this.props} />
        <AddBankAccountConfirmation {...this.props} />
        <AddBankAccountStatus {...this.props} />
      </Stepper>
    )
  }
}
