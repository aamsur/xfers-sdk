import React, { Component } from 'react'
import { connect } from 'react-redux'

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
import { navigate, initNewBankAccount } from 'ManageBank/actions'

function mapStateToProps(state, props) {
  return { ...props }
}

function mapDispatchToProps(dispatch) {
  return {
    initNewBankAccount: () => dispatch(initNewBankAccount()),
    goBack: () => dispatch(navigate('index'))
  }
}

class NewBankAccountForm extends Component {

  componentDidMount() {
    this.props.initNewBankAccount();
  }

  render() {
    const { goBack } = this.props;
    return (
      <Stepper>
        <BankTypeList goBack={goBack} />
        <BankAccountName />
        <BankAccountNumber />
        <BankAccountNumberRepeat />
        <AddBankAccountConfirmation />
        <AddBankAccountStatus />
      </Stepper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBankAccountForm)
