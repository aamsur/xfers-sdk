import React, { Component } from 'react'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  FormInputGroup,
  Button,
  AnchorLink,
  FlexContainer,
  FlexItem,
  TwoColsRowBar,
  LoadingPanel,
  FooterButtonGroup
} from 'XfersComponents'
import { toCurrency } from 'UtilityFunctions'

export default class WithdrawalConfirmation extends Component {
  render() {

    const {
      error,
      dataLoading,
      newWithdrawalRequest: { withdrawalAmount, requestBreakdownList, finalWithdrawalAmount },
      updateWithdrawalDetails,
      submitWithdrawalRequest,
      goNext,
      goBack,
      closeModal
    } = this.props;

    const confirmWithCallback = () => {
      submitWithdrawalRequest(goNext);
    }

    if (dataLoading) {
      return (<LoadingPanel title="Make Withdrawal"/>)
    }

    return (
      <StickyPanel showBrand>
        <ModalHeader onBack={goBack} spHeader title="Make Withdrawal" />
        <View spBody>
          <Text type="panelTitle">Withdrawal Overview</Text>

          <TwoColsRowBar leftColProps={{size: {xs: 4}, content: "Transfer from:"}} rightColProps={{content: <strong>Remittance Wallet</strong>}} />
          <TwoColsRowBar leftColProps={{size: {xs: 4}, content: "Transfer to:"}} rightColProps={{content: <strong>DBS 0576002483</strong>}} />
          <hr style={{margin: "18px 0"}}/>

          <View>
            <Text type="label">Request beakdown</Text>
            <View marginBottom="18px">
              <FlexContainer>
                <FlexItem evenGrowth></FlexItem>
                <FlexItem evenGrowth><strong>Amount</strong></FlexItem>
                <FlexItem evenGrowth><strong>WithdrawalFee</strong></FlexItem>
              </FlexContainer>
            </View>
            { requestBreakdownList.map((item, index) =>
              <BreakdownOverview
                key={index}
                amount={item.amount}
                fee={item.fees} />
            )}
          </View>
        </View>

        <View spFooter>
          <View
            textAlign="center"
            padding="20px 0"
            margin="20px 0 30px"
            borderTop="1px solid #ccc"
            borderBottom="1px solid #ccc" >
            <View><Text type="label">Total Amount You Will Receive</Text></View>
            <View><Text fontSize="24px" fontWeight="bold">{toCurrency(finalWithdrawalAmount)}</Text></View>
          </View>

          <View marginBottom="10px"><Text type="error">{error}</Text></View>

          <FooterButtonGroup>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="primary" onClick={confirmWithCallback}>Confirm</Button>
          </FooterButtonGroup>
        </View>

      </StickyPanel>
    )
  }
}

class BreakdownOverview extends Component {
  render() {
    const { amount, fee } = this.props;
    return (
      <View marginBottom="18px">
        <FlexContainer>
          <FlexItem evenGrowth><strong>{!fee ? "Free Tier" : "Chargeable"}</strong></FlexItem>
          <FlexItem evenGrowth>{toCurrency(amount)}</FlexItem>
          <FlexItem evenGrowth>{toCurrency(fee)}</FlexItem>
        </FlexContainer>
      </View>
    )
  }
}
