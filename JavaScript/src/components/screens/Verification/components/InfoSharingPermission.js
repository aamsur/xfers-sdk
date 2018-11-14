import React, { Component } from 'react'
import {
  StickyPanel,
  ModalHeader,
  TwoColsRowBar,
  View,
  Text,
  FooterButtonGroup,
  Button,
} from 'XfersComponents'
import xfersLogo from 'Xfers_Logo_72.png'

export default class InfoSharingPermission extends Component {
  render() {
    const { closeModal, goBack, goNext } = this.props;

    return (
      <StickyPanel showBrand>
        <ModalHeader onClose={closeModal} spHeader title="Linking Xfers Account" />
        <View spBody>

          <View margin="40px 0">
            <TwoColsRowBar
              leftColProps={{
                content: <View textAlign="center"><img style={{maxHeight: "35px", maxWidth: "100%"}} src={xfersLogo} /></View>
              }}
              rightColProps={{
                content: <View textAlign="center"><img style={{maxHeight: "35px", maxWidth: "100%"}} src={xfersLogo} /></View>
              }}
            />
          </View>
          <View textAlign="center">
            <Text>Xfers would like to access your personal information from your [Merchant] account</Text>
          </View>
          <br/>
          <View textAlign="center">
            <Text type="boldValue">Name</Text>
            <Text type="boldValue">Birthdate</Text>
            <Text type="boldValue">Nationality</Text>
            <Text type="boldValue">Location</Text>
            <Text type="boldValue">NRIC</Text>
            <Text type="boldValue">Proof of Address</Text>
          </View>
        </View>
        <FooterButtonGroup spFooter>
          <Button onClick={goBack}>I Do Not Accept</Button>
          <Button type="primary" onClick={goNext}>I Accept</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}
