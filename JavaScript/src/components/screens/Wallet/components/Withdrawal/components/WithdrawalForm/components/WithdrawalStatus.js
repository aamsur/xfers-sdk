import React, { Component } from 'react'
import {
  StatusPanel,
  FooterButtonGroup,
  Text,
  View,
  Button,
} from 'XfersComponents'
import { toCurrency } from 'UtilityFunctions'


export default class WithdrawalStatus extends Component {
  render() {
    const { newWithdrawalRequest: {withdrawalAmount}, availableBalance, walletName, closeModal } = this.props;

    return (
      <StatusPanel
        type="secondary"
        iconType="success"
        title="Make Withdrawal"
        onClose={closeModal}>
        <View spBody>
          <View><Text>Your withdrawal request is now being processed.</Text></View>
          <br/>
          <View><Text>
            Please allow approximately 7 business days for your funds to be reflected on your bank statement.
          </Text></View>
          <br/><br/><br/>
            <View>
              <Text fontSize="12px" fontWeight="300" textTransform="uppercase">{walletName + " Balance"}</Text>
              <br/><br/>
              <Text fontWeight="bold">Withdrawal Amount: {toCurrency(withdrawalAmount)}</Text>
              <br/><br/>
              <Text fontWeight="bold">New Balance: {toCurrency(availableBalance)}</Text>
            </View>
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" onClick={closeModal}>Return to Merchant</Button>
        </FooterButtonGroup>
      </StatusPanel>
    )
  }
}
