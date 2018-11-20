import React, { Component } from 'react'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  Button,
  CenterContent,
  FooterButtonGroup
} from 'XfersComponents'
import { toCurrency } from 'UtilityFunctions'


export default class PendingPaymentDetails extends Component {
  render() {
    return (
      <StickyPanel showBrand>
        <ModalHeader onClose={closeModal} spHeader title="Make Payment" />
        <View spBody>
          <Text type="panelTitle">Transaction Details</Text>
          <View marginBottom="15px">
            <View marginBottom="15px">
              <Text type="label">Transaction Type</Text>
              <Text type="boldValue">Payment Request</Text>
            </View>
            <View marginBottom="15px">
              <Text type="label">Deposit To</Text>
              <Text type="boldValue">Xfers Wallet</Text>
            </View>
          </View>
          <View marginBottom="15px">
            <Text type="label">From</Text>
            <Text type="boldValue">DBS 123-XXXX-6</Text>
          </View>
          <View marginBottom="15px">
            <Text type="label">Amount</Text>
            <Text type="boldValue">{toCurrency(amount)}</Text>
          </View>
          <View marginBottom="15px">
            <Text type="label">Transfer Expiry</Text>
            <Text type="boldValue">22/07/2018, 3:45pm</Text>
          </View>
        </View>
        <FooterButtonGroup>
          <Button type="tertiary" onClick={() => console.log()}>Cancel Request</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}
