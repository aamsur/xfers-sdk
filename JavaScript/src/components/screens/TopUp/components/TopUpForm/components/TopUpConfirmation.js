import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  Button,
  FooterButtonGroup
} from 'XfersComponents'
import { submitNewTopUpRequest } from 'TopUp/actions/'

function mapStateToProps({topUp}, props) {
  const { error, newTopUpRequest: { topUpAmount }, bankOptions } = topUp;

  // Get the details of the selected Bank
  let bankDetails = {};
  for ( let i = 0; i < bankOptions.length; i++ ) {
    if (bankOptions[i].abbreviation === bank) {
      bankDetails = bankOptions[i];
      break;
    }
  }

  return { error, bankDetails, topUpAmount };
}

function mapDispatchToProps(dispatch) {
  return {
    submit: (successCallback) => dispatch(submitNewTopUpRequest(successCallback))
  }
}

class TopUpConfirmation extends Component {
  render() {
    const {
      error,
      bankDetails,
      topUpAmount,
      submit,
      goNext,
      goBack,
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

    const submitWithCallback = () => {
      submit(goNext);
    }

    return (
      <StickyPanel showBrand>
        <ModalHeader onBack={goBack} spHeader title="ADD BANK ACCOUNT" />
        <View spBody>
          <Text type="panelTitle">Confirm details</Text>
          <View marginBottom="40px">
            <Text type="label">Pay Using</Text>
            <Text type="boldValue">{`${bankDetails.name} (${bankDetails.abbreviation})`}</Text>
          </View>
          <View marginBottom="40px">
            <Text type="label">Payment To</Text>
            <Text type="boldValue"></Text>
          </View>
          <View marginBottom="40px">
            <Text type="label">Payment Amount</Text>
            <Text type="boldValue">{topUpAmount}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopUpConfirmation)
