import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StickyPanel,
  View,
  Text,
  AnchorLink,
  ModalHeader,
  SelectionButton
} from 'XfersComponents'

import { updateTopUpDetails } from 'TopUp/actions'

function mapStateToProps({topUp}, props) {
  const { userBanks } = topUp;
  return { userBanks }
}

function mapDispatchToProps(dispatch) {
  return {
    updateForm: (v) => dispatch(updateTopUpDetails("bank", v)),
  }
}

class TopUpFundSource extends Component {
  render() {
    const { userBanks, updateForm, goBack, goNext } = this.props;

    const onSelect = (bankAbbreviation) => {
      updateForm(bankAbbreviation);
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
          <View><AnchorLink onClick={() => console.log()}>Edit bank accounts</AnchorLink></View>
        </View>
      </StickyPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUpFundSource)
