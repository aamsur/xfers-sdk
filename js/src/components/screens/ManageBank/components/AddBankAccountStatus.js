import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Button,
  FooterButtonGroup,
  StatusPanel
} from 'XfersComponents'
import {  } from 'ManageBank/actions'

function mapStateToProps({manageBank}, props) {
  const { newBankAccountDetails: { bank, accountNo, accountHolderName }, bankOptions } = manageBank;

  // Get the details of the selected Bank
  let bankDetails = {};
  for ( let i = 0; i < bankOptions.length; i++ ) {
    if (bankOptions[i].abbreviation === bank) {
      bankDetails = bankOptions[i];
      break;
    }
  }

  return { bankDetails, accountHolderName, accountNo };
}

function mapDispatchToProps(dispatch) {
  return {}
}

class AddBankAccountConfirmation extends Component {
  render() {
    const {
      bankDetails,
      accountNo,
      accountHolderName,
      updateForm,
    } = this.props;

    return (
      <StatusPanel
        type="secondary"
        iconType="success"
        title="Add Bank Account">
        <View spBody>
          <Text>Your bank account has been added.</Text>
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary">Okay</Button>
        </FooterButtonGroup>
      </StatusPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBankAccountConfirmation)
