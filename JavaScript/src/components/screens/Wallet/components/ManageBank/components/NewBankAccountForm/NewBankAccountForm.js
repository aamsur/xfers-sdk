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
    const { navigateInBankFlow, isIndo } = this.props;

    if (isIndo) {
      return (
        <Stepper>
          <BankTypeList goBack={() => navigateInBankFlow("index")} {...this.props} />
          <BankAccountName {...this.props} />
          <BankAccountNumber {...this.props} />
          <BankAccountNumberRepeat {...this.props} />
          <AddBankAccountConfirmation {...this.props} />
          <AddBankAccountStatus {...this.props} />
        </Stepper>
      )
    } else {
      return (
        <Stepper>
          <BankTypeList goBack={() => navigateInBankFlow("index")} {...this.props} />
          <BankAccountName {...this.props} />
          <BankAccountNumber {...this.props} />
          <BankAccountNumberRepeat {...this.props} />
          <BankStatement {...this.props} />
          <AddBankAccountConfirmation {...this.props} />
          <AddBankAccountStatus {...this.props} />
        </Stepper>
      )
    }
  }
}
