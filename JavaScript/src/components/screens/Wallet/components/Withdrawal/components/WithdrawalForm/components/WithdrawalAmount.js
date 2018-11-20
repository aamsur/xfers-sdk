import React, { Component } from 'react'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  FormInputGroup,
  Button,
  AnchorLink,
  LoadingPanel,
  FooterButtonGroup
} from 'XfersComponents'
import { toCurrency } from 'UtilityFunctions'

export default class WithdrawalAmount extends Component {
  render() {
    const {
      error,
      dataLoading,
      availableBalance,
      newWithdrawalRequest: { withdrawalAmount },
      updateWithdrawalDetails,
      fetchFeeBreakdown,
      goBack,
      goNext,
    } = this.props;

    const disabled = withdrawalAmount ? false : true

    const fetchFeeBreakdownWithCallback = () => {
      fetchFeeBreakdown(goNext);
    }

    if (dataLoading) {
      return (<LoadingPanel title="Make Withdrawal"/>)
    }

    return (
      <StickyPanel showBrand>
        <ModalHeader onBack={goBack} spHeader title="Make Withdrawal" />
        <View spBody>
          <Text type="panelTitle">Enter withdrawal amount</Text>
          <FormInputGroup
            autoFocus
            leftAddonContent="SGD"
            placeholder="2000.00"
            value={withdrawalAmount}
            onChange={(e) => updateWithdrawalDetails('withdrawalAmount', e.target.value)}
            />
        </View>
        <View spFooter>
          <View marginBottom="10px"><Text type="error">{error}</Text></View>
          <View marginBottom="10px"><Text>Current Balance: {toCurrency(availableBalance)}</Text></View>
          { true &&
            <View marginBottom="20px">
              <Text type="blur">
                <strong>Note: </strong>
                You can <strong>withdraw up to $3000 per week without fees.</strong> Any amount exceeding $3000 in a 7-day period (Monday to Sunday) will be subjected to a withdrawal fee of 1% and processed as two separate transactions.
                <AnchorLink href="https://xfershelp.zendesk.com/hc/en-us/articles/360002442851" target> Learn more</AnchorLink>
              </Text>
            </View>
          }
          <FooterButtonGroup>
            <Button type="primary" disabled={disabled} onClick={fetchFeeBreakdownWithCallback}>Next</Button>
          </FooterButtonGroup>
        </View>
      </StickyPanel>
    )
  }
}
