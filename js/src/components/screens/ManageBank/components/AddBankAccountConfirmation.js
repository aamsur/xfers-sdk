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

    /* Example bankDetails data
    bankDetails = {
      abbreviation: "DBS",
      bank_code: "7171",
      img_src: "/assets/bank-logo-dbs-d50c1eeac92967980cf421b7dd9b39fafb2620d9318e29cde5567dcdc1e77ff9.png",
      name: "Development Bank of Singapore",
      swift_code: "DBSS",
    }
    */

    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader title="ADD BANK ACCOUNT" />
        <View spBody>
          <Text type="panelTitle">Confirm details</Text>
          <View marginBottom="40px">
            <Text type="label">Bank Name</Text>
            <Text type="boldValue">{`${bankDetails.name} (${bankDetails.abbreviation})`}</Text>
          </View>
          <View marginBottom="40px">
            <Text type="label">Name of Bank Account Holder</Text>
            <Text type="boldValue">{accountHolderName}</Text>
          </View>
          <View marginBottom="40px">
            <Text type="label">Bank Account Number</Text>
            <Text type="boldValue">{accountNo}</Text>
          </View>
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary">Submit</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBankAccountConfirmation)
