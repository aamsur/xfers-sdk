import React, { Component } from 'react'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  Button,
  FooterButtonGroup
} from 'XfersComponents'
import { toCurrency } from 'UtilityFunctions'

export default class TopUpConfirmation extends Component {
  render() {
    const {
      params,
      error,
      newTopUpRequest: { bank, topUpAmount },
      userBanks,
      submit,
      goNext,
      goBack,
    } = this.props;

    // Get the details of the selected Bank
    let bankDetails = {};
    for ( let i = 0; i < userBanks.length; i++ ) {
      if (userBanks[i].bank_abbrev === bank) {
        bankDetails = userBanks[i];
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
      submit(goNext);
    }

    return (
      <StickyPanel showBrand>

        {params.flowType === 'payment' ?
          <ModalHeader onBack={goBack} spHeader title="Make Payment" />
          :
          <ModalHeader onBack={goBack} spHeader title="Transfer Funds" />
        }

        <View spBody>
          <Text type="panelTitle">Confirm details</Text>
          <View marginBottom="10px">
            <Text type="label">Pay Using</Text>
            <Text type="boldValue">{`${bankDetails.bank_abbrev} - ${bankDetails.account_no}`}</Text>
          </View>
          <View marginBottom="10px">
            <Text type="label">Payment To</Text>
            <Text type="boldValue">Merchant</Text>
          </View>
          <View marginBottom="10px">
            <Text type="label">Payment Amount</Text>
            <Text type="boldValue">{toCurrency(topUpAmount)}</Text>
          </View>
        </View>
        <View spFooter>
          <View marginBottom="20px"><Text type="error">{error}</Text></View>
          <FooterButtonGroup>
            <Button type="primary" onClick={submitWithCallback}>Submit</Button>
          </FooterButtonGroup>
        </View>
      </StickyPanel>
    )
  }
}
