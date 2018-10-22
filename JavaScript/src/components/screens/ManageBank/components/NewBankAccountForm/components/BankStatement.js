import React from 'react'
import { connect } from 'react-redux'

import { View, Panel, ModalHeader, FormInput, Button, FooterButtonGroup } from 'XfersComponents'
import { updateBankAccountDetails } from 'ManageBank/actions'

function mapStateToProps({manageBank}, props) {
  const { newBankAccountDetails: { bankStatementFile } } = manageBank;
  return { bankStatementFile };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateBankAccountDetails: (type, data) => {
      dispatch(updateBankAccountDetails(type, data))
    },
    updateDocument: (file) => {
        dispatch(updateBankAccountDetails('bankStatementFile', file))
    },
  }
}

function BankStatement({
  bankStatementFile,

}) {
  return (
    <Panel>
      <ModalHeader title="ADD BANK ACCOUNT" />
      <View layout="section" paddingBtm>
        <View>Upload Bank Statement</View>
        <View>To verify your bank account, please submit a recent bank statement issued within the past 3 months.</View>
        <br/>
        <View>
          <span white bold>
            A Valid Bank Statement includes:
          </span>
          <span white>
            1. Bank Logo {"\n"}
            2. Statement of Account {"\n"}
            3. Date {"\n"}
            4. Name and Address {"\n"}
            5. Account Number {"\n"}
            6. Footer
          </span>
          <span>You may hide or blur out any optional information but cropping of document is not allowed.</span>
        </View>
        <View>
          <AnchorLink href="https://xfershelp.zendesk.com/hc/en-us/articles/360002335071" target>Don&#39;t have a bank statement?</AnchorLink>
        </View>
      </View>
      <FooterButtonGroup>
        <Button type="secondary">Proceed to upload</Button>
      </FooterButtonGroup>
    </Panel>
  )
}

const ConnectedBankStatement = connect(mapStateToProps, mapDispatchToProps)(BankStatement)

export default ConnectedBankStatement
