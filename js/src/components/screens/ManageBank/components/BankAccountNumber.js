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
      <StickyPanel showBrand>
        <ModalHeader spHeader title="ADD BANK ACCOUNT" />
        <View spBody>
          <Text type="panelTitle">Enter your bank account number</Text>
          <FormInput
            type="number"
            placeholder="e.g. 1234567890"
            value={accountNo}
            onChange={updateForm}
            caption="Please exclude dashes"
          />
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" disabled={disabled}>Next</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountNumber)
