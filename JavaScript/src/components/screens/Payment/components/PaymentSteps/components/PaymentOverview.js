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
import { toCurrency } from 'UtilityFunctions'
import { confirmPayment } from 'Payment/actions'

function mapStateToProps({payment}, props) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    confirm: (successCallback) => dispatch(confirmPayment(successCallback))
  }
}

class TopUpConfirmation extends Component {
  render() {
    const {
      confirm,
      goNext,
      goBack,
    } = this.props;

    const confirmWithCallback = () => {
      confirm(goNext);
    }

    return (
      <StickyPanel showBrand>
        <ModalHeader onBack={goBack} spHeader title="ADD BANK ACCOUNT" />
        <View spBody>
          <Text type="panelTitle">Transaction Overview</Text>
          <View marginBottom="20px">
            <Text>Your are about to make a payment via your Xfers Wallet to the following details. Please confirm.</Text>
          </View>
          <View marginBottom="20px">
            <Text type="label">Pay Using</Text>
            <Text type="boldValue">sdfsd</Text>
          </View>
          <View marginBottom="20px">
            <Text type="label">Payment To</Text>
            <Text type="boldValue">nothing</Text>
          </View>
          <View marginBottom="20px">
            <Text type="label">Payment Amount</Text>
            <Text type="boldValue">{12312}</Text>
          </View>
        </View>
        <View spFooter>

          <View
            textAlign="center"
            padding="20px 0"
            margin="20px 0 30px"
            borderTop="1px solid #ccc"
            borderBottom="1px solid #ccc" >
            <View><Text type="label">Total Payment Amount</Text></View>
            <View><Text fontSize="24px" fontWeight="bold">{toCurrency(2000)}</Text></View>
          </View>

          <FooterButtonGroup>
            <Button onClick={() => console.log()}>Cancel</Button>
            <Button type="primary" onClick={confirmWithCallback}>Confirm</Button>
          </FooterButtonGroup>
        </View>

      </StickyPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUpConfirmation)
