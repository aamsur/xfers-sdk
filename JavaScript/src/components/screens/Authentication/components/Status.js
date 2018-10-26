import React, { Component } from 'react'
import { StatusPanel, View, Text, Button, FooterButtonGroup } from 'XfersComponents'
import xfersLogo from 'Xfers_Logo_72.png'

export default class Status extends Component {
  render() {
    const { closeModal } = this.props;

    return (
      <StatusPanel
        type="secondary"
        iconType="success"
        title="Link Xfers Account"
        onClose={closeModal}>
        <View spBody>
          <View maxWidth="200px" margin="auto">
            <View float="left">merchant</View>
            <View float="right"><img src={xfersLogo} /></View>
          </View>
          <br/><br/>
          <View><Text>Your Xfers account has now been successfully linked to [merchant].</Text></View>
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" onClick={closeModal}>Go to Wallet</Button>
        </FooterButtonGroup>
      </StatusPanel>
    )
  }
}
