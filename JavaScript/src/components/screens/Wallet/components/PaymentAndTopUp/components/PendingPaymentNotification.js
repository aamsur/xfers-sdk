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


export default class PendingPaymentNotification extends Component {
  render() {
    return (
      <StickyPanel showBrand>
        <ModalHeader onClose={closeModal} spHeader title="Make Payment" />
        <View spBody>
          <CenterContent>
            <View><Text>You have an existing payment request that has not been completed. Proceed to create new top-up request?</Text></View>
            <br/>
            <View>
              <Text>Note: The existing top-up request created on <strong>12 Oct 2018, 1:45pm</strong> will be cancelled.</Text>
            </View>
          </CenterContent>
        </View>
        <FooterButtonGroup>
          <Button onClick={goNext}>View Pending</Button>
          <Button type="primary" onClick={() => console.log()}>Proceed</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}
