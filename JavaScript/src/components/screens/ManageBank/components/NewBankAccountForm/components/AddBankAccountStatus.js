import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  FooterButtonGroup,
  StatusPanel
} from 'XfersComponents'

export default class AddBankAccountStatus extends Component {
  render() {
    const {
      userBanks,
      navigate,
      params,
      closeModal,
      isIndo,
    } = this.props;

    const newBankDetails = userBanks.last;

    if (isIndo) {
      return (
        <StatusPanel
          type="secondary"
          iconType="success"
          title="Add Bank Account"
          onClose={closeModal}>
          <View spBody>
            <Text>Your bank account has been added.</Text>
          </View>
          <FooterButtonGroup spFooter>
            { params.goBackPreviousModule ?
              <Button type="primary" onClick={params.goBackPreviousModule}>Return to Top-up</Button>
              :
              <Button type="primary" onClick={() => navigate('index')}>Okay</Button>
            }
          </FooterButtonGroup>
        </StatusPanel>
      )
    } else {
      return (
        <StatusPanel
          type="tertiary"
          iconType="pending"
          title="Add Bank Account"
          onClose={closeModal}>
          <View spBody>
            <Text>Your bank account details has been sent to our verificaation team. Please allow 7 working days for your bank account to be verified.</Text>
            <br/><br/>
            <Text>You will receive an email notification once the verification is completed.</Text>
          </View>
          <FooterButtonGroup spFooter>
            { params.goBackPreviousModule ?
              <Button type="primary" onClick={params.goBackPreviousModule}>Return to Top-up</Button>
              :
              <Button type="primary" onClick={() => navigate('index')}>Okay</Button>
            }
          </FooterButtonGroup>
        </StatusPanel>
      )
    }
  }
}
