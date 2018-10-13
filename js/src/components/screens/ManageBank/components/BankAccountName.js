import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Panel, FormTitle, ModalHeader, SectionContainer, FormInput, Button, FooterButtonGroup } from 'XfersComponents'
import { updateBankAccountDetails } from 'ManageBank/actions'

function mapStateToProps({manageBank}, props) {
  const { newBankAccountDetails: { accountHolderName } } = manageBank;
  return { accountHolderName };
}

function mapDispatchToProps(dispatch) {
  return {
    updateForm: (v) => dispatch(updateBankAccountDetails("accountHolderName", v)),
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
      <Panel>
        <ModalHeader title="ADD BANK ACCOUNT" />
        <SectionContainer paddingBtm>
          <FormTitle>Enter your full name</FormTitle>
          <FormInput
            placeholder="e.g. Alice"
            value={accountHolderName}
            onChange={updateForm}
            caption="As reflected in your bank account statement"
          />
        </SectionContainer>
        <FooterButtonGroup>
          <Button xType="primary" disabled={disabled}>Next</Button>
        </FooterButtonGroup>
      </Panel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountName)
