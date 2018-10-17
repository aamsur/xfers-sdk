import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StickyPanel, Title, ModalHeader, FormInput, Button, FooterButtonGroup } from 'XfersComponents'
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
      <StickyPanel showBrand
        header={
          <ModalHeader title="ADD BANK ACCOUNT" />
        }
        footer={
          <FooterButtonGroup>
            <Button type="primary" disabled={disabled}>Next</Button>
          </FooterButtonGroup>
        }>
        <View layout="modal">
          <Title type="form">Enter your full name</Title>
          <FormInput
            placeholder="e.g. Alice"
            value={accountHolderName}
            onChange={updateForm}
            caption="As reflected in your bank account statement"
          />
        </View>
      </StickyPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountName)
