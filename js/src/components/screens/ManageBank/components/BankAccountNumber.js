import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Panel, Title, ModalHeader, FormInput, Button, FooterButtonGroup } from 'XfersComponents'
import { updateBankAccountDetails } from 'ManageBank/actions'

function mapStateToProps({manageBank}, props) {
  const { newBankAccountDetails: { accountNo } } = manageBank;
  return { accountNo };
}

function mapDispatchToProps(dispatch) {
  return {
    updateForm: (v) => dispatch(updateBankAccountDetails("accountNo", v)),
  }
}

class BankAccountNumber extends Component {
  render() {
    const {
      accountNo,
      updateForm,
    } = this.props;

    const disabled = accountNo ? false : true

    return (
      <Panel>
        <ModalHeader title="ADD BANK ACCOUNT" />
        <View layout="section" paddingBtm>
          <Title type="form">Enter your bank account number</Title>
          <FormInput
            type="number"
            placeholder="e.g. 1234567890"
            value={accountNo}
            onChange={updateForm}
            caption="Please exclude dashes"
          />
        </View>
        <FooterButtonGroup>
          <Button type="primary" disabled={disabled}>Next</Button>
        </FooterButtonGroup>
      </Panel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountNumber)
