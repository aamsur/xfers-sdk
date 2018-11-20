import React, { Component } from 'react'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  FormInput,
  Button,
  FooterButtonGroup
} from 'XfersComponents'

export default class BankAccountNumber extends Component {
  render() {
    const {
      newBankAccountDetails: { accountNo },
      updateBankAccountDetails,
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
            onChange={(e) => updateBankAccountDetails('accountNo', e.target.value)}
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
