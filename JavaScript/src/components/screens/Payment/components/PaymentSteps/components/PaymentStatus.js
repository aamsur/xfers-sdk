import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Button,
  FooterButtonGroup,
  StatusPanel
} from 'XfersComponents'
import { navigate } from 'Payment/actions'


function mapStateToProps({payment}, props) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    navigateToHome: () => dispatch(navigate("index"))
  }
}

class PaymentStatus extends Component {
  render() {
    const { navigateToHome } = this.props;

    return (
      <StatusPanel
        type="secondary"
        iconType="success"
        title="Make Payment">
        <View spBody>
          <View><Text>Your payment has been completed.</Text></View>
          <br/><br/><br/>
          <View>
            <Text fontSize="12px" fontWeight="300">XFERS WALLET BALANCE</Text>
            <br/><br/>
            <Text fontWeight="bold">Payment Amount: </Text>
            <br/><br/>
            <Text fontWeight="bold">New Balance: </Text>
          </View>
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" onClick={navigateToHome}>Return to Merchant</Button>
        </FooterButtonGroup>
      </StatusPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStatus)
