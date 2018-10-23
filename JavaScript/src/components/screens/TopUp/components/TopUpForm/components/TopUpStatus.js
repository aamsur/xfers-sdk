import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Button,
  FooterButtonGroup,
  StatusPanel
} from 'XfersComponents'
import { navigate } from 'TopUp/actions'


function mapStateToProps({topUp}, props) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    navigateToHome: () => dispatch(navigate("index"))
  }
}

class TopUpStatus extends Component {
  render() {
    const { navigateToHome } = this.props;

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
          <Button type="primary" onClick={navigateToHome}>Return to Merchant</Button>
        </FooterButtonGroup>
      </StatusPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUpStatus)
