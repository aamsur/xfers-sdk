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

export default class BankAccountName extends Component {
  render() {
    const {
      newBankAccountDetails: { accountHolderName },
      updateForm,
      goBack,
      goNext,
    } = this.props;

    const disabled = accountHolderName ? false : true

    return (
      <StickyPanel showBrand>
        <ModalHeader onBack={goBack} spHeader title="ADD BANK ACCOUNT" />
        <View spBody>
          <Text type="panelTitle">Enter your full name</Text>
          <FormInput
            autoFocus
            placeholder="e.g. Lau Tian Hao"
            value={accountHolderName}
            onChange={(e) => updateForm('accountHolderName', e.target.value)}
            caption="As reflected in your bank account statement"
          />
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" disabled={disabled} onClick={goNext}>Next</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}
