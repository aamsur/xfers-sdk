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
  const { newBankAccountDetails: { accountHolderName } } = manageBank;
  return { accountHolderName };
}

function mapDispatchToProps(dispatch) {
  return {
    updateForm: (e) => dispatch(updateBankAccountDetails("accountHolderName", e.target.value)),
  }
}

class BankAccountName extends Component {
  render() {
    const {
      accountHolderName,
      updateForm,
    } = this.props;

    const disabled = accountHolderName ? false : true

    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader title="ADD BANK ACCOUNT" />
        <View spBody>
          <Text type="panelTitle">Enter your full name</Text>
          <FormInput
            placeholder="e.g. Alice"
            value={accountHolderName}
            onChange={updateForm}
            caption="As reflected in your bank account statement"
          />
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" disabled={disabled}>Next</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountName)
