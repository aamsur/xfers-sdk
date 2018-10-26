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
      ...this.props
    }

    const otpProps = {
      otp: this.state.otp,
      updateOtp: this.updateOtp,
      ...this.props
    }

    return (
      <Stepper>
        <PhoneNumber {...phoneProps} />
        <OTP {...otpProps} />
        <Status {...this.props} />
      </Stepper>
    )
  }
}

export default Authentication
