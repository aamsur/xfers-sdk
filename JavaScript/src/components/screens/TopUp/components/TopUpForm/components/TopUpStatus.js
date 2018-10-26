import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  FooterButtonGroup,
  StatusPanel
} from 'XfersComponents'

export default class TopUpStatus extends Component {
  render() {
    const { closeModal } = this.props;

    return (
      <StatusPanel
        type="tertiary"
        iconType="pending"
        title="Make Payment">
        <View spBody>
          <View><Text>Thank you for making a transfer via Xfers.</Text></View>
          <br/>
          <View><Text>You will receive an email notification once the payment has been processed.</Text></View>
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" onClick={closeModal}>Return to Merchant</Button>
        </FooterButtonGroup>
      </StatusPanel>
    )
  }
}
