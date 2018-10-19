import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Button,
  FooterButtonGroup,
  StatusPanel
} from 'XfersComponents'
import { navigate } from 'ManageBank/actions'

function mapStateToProps({manageBank}, props) {
  const { userBanks } = manageBank;
  return { newBankDetails: userBanks.last };
}

function mapDispatchToProps(dispatch) {
  return {
    navigateToHome: () => dispatch(navigate("index"))
  }
}

class AddBankAccountConfirmation extends Component {
  render() {
    const {
      newBankDetails,
      navigateToHome,
    } = this.props;

    return (
      <StatusPanel
        type="secondary"
        iconType="success"
        title="Add Bank Account">
        <View spBody>
          <Text>Your bank account has been added.</Text>
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" onClick={navigateToHome}>Okay</Button>
        </FooterButtonGroup>
      </StatusPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBankAccountConfirmation)
