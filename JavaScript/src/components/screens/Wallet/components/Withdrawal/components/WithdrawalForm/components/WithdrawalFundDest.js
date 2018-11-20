import React, { Component } from 'react'
import {
  StickyPanel,
  View,
  Text,
  AnchorLink,
  ModalHeader,
  SelectionButton
} from 'XfersComponents'
import bankIcon from 'icons/Bank_Acc_23.png'

export default class WithdrawalFundDest extends Component {
  render() {
    const { verifiedBanks, updateWithdrawalDetails, navigateFlowType, goBack, goNext } = this.props;

    const onSelect = (bank) => {
      updateWithdrawalDetails('withdrawalBankId', bank.id);
      goNext();
    }

    return (
      <StickyPanel showBrand>
        <ModalHeader onBack={goBack} spHeader title="Make Withdrawal" />
        <View spBody>
          <Text type="panelTitle">Withdraw funds to</Text>
          <View>
            { verifiedBanks.map((bank, index) =>
              <SelectionButton
                key={index}
                image={bankIcon}
                title={`${bank.bank_abbrev} - ${bank.account_no}`}
                onClick={() => onSelect(bank)}
                />
            )}
          </View>
          <View marginTop="20px">
            <AnchorLink onClick={() => navigateFlowType('bank')}>Edit bank accounts</AnchorLink>
          </View>
        </View>
      </StickyPanel>
    )
  }
}
