import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  FooterButtonGroup,
  StatusPanel
} from 'XfersComponents'

export default class InfoSharingStatus extends Component {
  render() {
    const { closeModal } = this.props;

    return (
      <StatusPanel
        type="tertiary"
        iconType="pending"
        title="Linking Xfers Account"
        onClose={closeModal}
        >
        <View spBody>
          <View><Text>Your personal information has been submitted to our verification team. Please allow 7 working days for your account to be verified.</Text></View>
          <br/>
          <View><Text>You will receive an email notification once the verification is completed.</Text></View>
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" onClick={closeModal}>Got it</Button>
        </FooterButtonGroup>
      </StatusPanel>
    );
  }
}
