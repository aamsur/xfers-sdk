import React, { Component } from 'react'
import { Stepper } from 'XfersComponents'
import { PhoneNumber, OTP, Status } from './components'

class Authentication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      phoneNo: '',
      phoneNoAccepted: false,
      otp: ''
    }
  }

  updatePhoneNo = (e) => {
    this.setState({ phoneNo: e.target.value });
  }

  updateOtp = (e) => {
    this.setState({ otp: e.target.value });
  }

  requestOtp = (e) => {
    this.setState({ phoneNoAccepted: true });
  }

  render() {

    const phoneProps = {
      phoneNo: this.state.phoneNo,
      phoneNoAccepted: this.state.phoneNoAccepted,
      updatePhoneNo: this.updatePhoneNo,
      requestOtp: this.requestOtp,
    }

    const otpProps = {
      otp: this.state.otp,
      updateOtp: this.updateOtp,
    }

    return (
      <Stepper>
        <PhoneNumber {...phoneProps} />
        <OTP {...otpProps} />
        <Status />
      </Stepper>
    )
  }
}

export default Authentication
