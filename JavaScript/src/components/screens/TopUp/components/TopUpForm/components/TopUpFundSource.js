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
    const { userBanks, updateForm, goBack, goNext, navigate, params } = this.props;

    const onSelect = (bankAbbreviation) => {
      updateForm('bank', bankAbbreviation);
      goNext();
    }

    return (
      <StickyPanel showBrand>
        
        {params.flowType === 'payment' ?
          <ModalHeader onBack={goBack} spHeader title="Make Payment" />
          :
          <ModalHeader onBack={goBack} spHeader title="Transfer Funds" />
        }

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
            <AnchorLink onClick={() => navigate('bank')}>Edit bank accounts</AnchorLink>
          </View>
        </View>
      </StickyPanel>
    )
  }
}
