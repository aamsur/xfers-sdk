import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  FormInput,
  Button,
  FooterButtonGroup
} from 'XfersComponents'
import { updateBankAccountDetails } from 'ManageBank/actions'

function mapStateToProps({manageBank}, props) {
  const { newBankAccountDetails: { accountNo } } = manageBank;
  return { accountNo };
}

function mapDispatchToProps(dispatch) {
  return {
    updateForm: (e) => dispatch(updateBankAccountDetails("accountNo", e.target.value)),
  }
}

class BankAccountNumber extends Component {
  render() {
    const {
      accountNo,
      updateForm,
      goBack,
      goNext,
    } = this.props;

    const disabled = accountNo ? false : true

    return (
      <StickyPanel showBrand>
        <ModalHeader onBack={goBack} spHeader title="ADD BANK ACCOUNT" />
        <View spBody>
          <Text type="panelTitle">Enter your bank account number</Text>
          <FormInput
            autoFocus
            type="number"
            placeholder="e.g. 1234567890"
            value={accountNo}
            onChange={updateForm}
            caption="Please exclude dashes"
          />
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" disabled={disabled} onClick={goNext}>Next</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountNumber)
