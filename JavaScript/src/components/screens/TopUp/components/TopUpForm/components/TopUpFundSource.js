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

export default class TopUpFundSource extends Component {
  render() {
    const { userBanks, updateForm, goBack, goNext, navigateToManageBank } = this.props;

    const onSelect = (bankAbbreviation) => {
      updateForm('bank', bankAbbreviation);
      goNext();
    }

    return (
      <StickyPanel showBrand>
        <ModalHeader onBack={goBack} spHeader title="Make Payment" />
        <View spBody>
          <Text type="panelTitle">Pay using bank account</Text>
          <View>
            { userBanks.map((bank, index) =>
              <SelectionButton
                key={index}
                image={bankIcon}
                title={`${bank.bank_abbrev} - ${bank.account_no}`}
                onClick={() => onSelect(bank.bank_abbrev)}
                />
            )}
          </View>
          <View marginTop="20px">
            <AnchorLink onClick={navigateToManageBank}>Edit bank accounts</AnchorLink>
          </View>
        </View>
      </StickyPanel>
    )
  }
}
