import React, { Component } from 'react'
import { StickyPanel, View, Text, FooterButtonGroup, Button, ModalHeader, FormInput, AnchorLink } from 'XfersComponents'

class OTP extends Component {

  constructor() {
    super();
    this.state = { interval: 0 }
  }

  tick = () => {
    if (this.state.interval === 0) {
      clearInterval(this.timer);
      return;
    }
    this.setState({ interval: this.state.interval - 1 })
  }

  resendOTPWithInterval = () => {
    // this.props.resendOTP();
    this.setState({ interval: 60 });
    this.timer = setInterval(() => {
      this.tick()
    }, 1000);
  }

  render() {
    const { interval } = this.state;
    const { otp, updateOtp, verifyOtp, goBack } = this.props

    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader onBack={goBack} title="Link Xfers Account" />
        <View spBody>
          <Text type="panelTitle">Enter verification code</Text>
          <FormInput
            value={otp}
            onChange={updateOtp}
            placeholder=""
            caption="We will text a one-time secure link to your mobile to proceed with a mobile verification"
          />

          { interval > 0 ?
            <Text type="note">Please wait for {interval} seconds before requesting again.</Text>
            :
            <AnchorLink onClick={this.resendOTPWithInterval}>Resend OTP</AnchorLink>
          }
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" onClick={verifyOtp}>Next</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}

export default OTP
