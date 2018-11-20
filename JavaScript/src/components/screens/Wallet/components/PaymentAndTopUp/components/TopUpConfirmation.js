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
      params: {amount, orderId, flowType},
      availableBalance,
      error,
      goNext,
      goBack,
      closeModal,
    } = this.props;

    return (
      <StickyPanel showBrand>

        {flowType === 'payment' ?
          <ModalHeader onBack={goBack} spHeader title="Make Payment" />
          :
          <ModalHeader onBack={goBack} spHeader title="Transfer Funds" />
        }

        <View spBody>
          <Text type="panelTitle">Transaction Overview</Text>
          <Text type="panelSubtitle">There is insufficient amount in your wallet. Please make a transfer of the remaining amount to complete the payment.</Text>
          <View marginBottom="15px">
            <Text type="label">Order Id</Text>
            <Text type="boldValue">{orderId}</Text>
          </View>
          <View marginBottom="15px">
            <Text type="label">Total Amount</Text>
            <Text type="boldValue">{toCurrency(amount)}</Text>
          </View>
          <View marginBottom="15px">
            <Text type="label">Current Xfers Balance</Text>
            <Text type="boldValue">{toCurrency(availableBalance)}</Text>
          </View>
        </View>
        <View spFooter>

          <View
            textAlign="center"
            padding="20px 0"
            margin="20px 0 30px"
            borderTop="1px solid #ccc"
            borderBottom="1px solid #ccc" >
            <View><Text type="label">Balance Amount To Pay</Text></View>
            <View><Text fontSize="24px" fontWeight="bold">{toCurrency((amount - availableBalance).toFixed(2))}</Text></View>
          </View>

          <View marginBottom="20px"><Text type="error">{error}</Text></View>
          <FooterButtonGroup>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="primary" onClick={goNext}>Proceed</Button>
          </FooterButtonGroup>
        </View>
      </StickyPanel>
    )
  }
}
