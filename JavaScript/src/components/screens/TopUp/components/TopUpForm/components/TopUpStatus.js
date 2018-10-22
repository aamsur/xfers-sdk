import React, { Component } from 'react'
import { connect } from ' react-redux'
import {
  View,
  Text,
  Button,
  FooterButtonGroup,
  StatusPanel
} from 'XfersComponents'


function mapStateToProps({topUp}, props) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

class TopUpStatus extends Component {
  render() {
    const {} = this.props;

    return (
      <StatusPanel
        type="tertiary"
        iconType="pending"
        title="Make Payment">
        <View spBody>
          <Text>Thank you for making a transfer via Xfers.</Text>
          <Text>You will receive an email notification once the payment has been processed.</Text>
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" onClick={navigateToHome}>Return to Merchant</Button>
        </FooterButtonGroup>
      </StatusPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUpStatus)
