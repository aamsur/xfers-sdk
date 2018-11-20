import React, { Component } from 'react'
import {
  StickyPanel,
  ModalHeader,
  View,
  FooterButtonGroup,
  Button,
  Text,
  CenterContent
} from 'XfersComponents'

export default class BankAccountDelete extends Component {
  render() {
    const { selectedBankDetails, navigateInBankFlow, deleteBank } = this.props;

    const deleteBankWithCallback = (bankId) => {
      const successCallback = () => {
        navigateInBankFlow("index");
      }
      deleteBank(bankId, successCallback);
    }

    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader onBack={() => navigateInBankFlow('index')} title="Bank Accounts" />
        <View spBody>
          <CenterContent>
            <Text>Delete bank account</Text>
            <Text>{`${selectedBankDetails.bank_abbrev} ${selectedBankDetails.account_no}?`}</Text>
            <br/><br/><br/>
            <Text type="blur">This action cannot be reversed.</Text>
          </CenterContent>
        </View>
        <FooterButtonGroup spFooter>
          <Button onClick={() => navigateInBankFlow('index')}>Back</Button>
          <Button type="primary" onClick={() => deleteBankWithCallback(selectedBankDetails.id)}>Delete</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}
