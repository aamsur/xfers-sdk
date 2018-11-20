import React, { Component } from 'react'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  Button,
  FooterButtonGroup
} from 'XfersComponents'
import pdfPreviewIcon from 'icons/Preview_PDF_Logo.png'

export default class AddBankAccountConfirmation extends Component {
  render() {
    const {
      error,
      newBankAccountDetails: { bank, accountNo, accountHolderName, bankStatementFile},
      bankOptions,
      submitNewBankAccountDetails,
      goNext,
      goBack,
      params,
    } = this.props;

    // Get the details of the selected Bank
    let bankDetails = {};
    for ( let i = 0; i < bankOptions.length; i++ ) {
      if (bankOptions[i].abbreviation === bank) {
        bankDetails = bankOptions[i];
        break;
      }
    }

    /* Example bankDetails data
    bankDetails = {
      abbreviation: "DBS",
      bank_code: "7171",
      img_src: "/assets/bank-logo-dbs-d50c1eeac92967980cf421b7dd9b39fafb2620d9318e29cde5567dcdc1e77ff9.png",
      name: "Development Bank of Singapore",
      swift_code: "DBSS",
    }
    */

    const submitWithCallback = () => {
      submitNewBankAccountDetails((newBank) => {
        goNext();
      });
    }

    const isPdf = /(\.pdf)$/i.test(bankStatementFile.fileName);

    return (
      <StickyPanel showBrand>
        <ModalHeader onBack={goBack} spHeader title="ADD BANK ACCOUNT" />
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
          <View marginBottom="40px">
            <Text type="label">Bank Statement</Text>
            <img style={{maxHeight: "100px", maxWidth: "50px"}} src={isPdf ? pdfPreviewIcon : bankStatementFile.fileData} />
            {isPdf && <Text type="boldValue">{bankStatementFile.fileName}</Text>}
          </View>
        </View>
        <View spFooter>
          <View marginBottom="20px"><Text type="error">{error}</Text></View>
          <FooterButtonGroup spFooter>
            <Button type="primary" onClick={submitWithCallback}>Submit</Button>
          </FooterButtonGroup>
        </View>
      </StickyPanel>
    )
  }
}
