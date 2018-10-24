import React, { Component } from 'react'
import { connect } from 'react-redux'
import cls from './Instructions.scss'
import getBankSpecifics from './bank_specific_instructions'

import {
  View, Text, Button, ModalHeader,
  AnchorLink, StickyPanel, FooterButtonGroup
} from 'XfersComponents'

import {
  DBSInstructions, UOBInstructions, OCBCInstructions, SCBInstructions,
  HSBCInstructions, CITIInstructions, CIMBInstructions, BOCInstructions, MBBInstructions
} from './components'

import { selectScreenType } from 'TopUp/actions'

function mapStateToProps({topUp}, props) {
  const { screenType, xfersBankAccount, userBanks, newTopUpRequest: { bank, topUpAmount } } = topUp;

  // let senderBankAccount;
  // for ( let i = 0; i < userBanks.length; i++ ) {
  //   if (userBanks[i].bank_abbrev == bank) {
  //     senderBankAccount = userBanks[i];
  //     break;
  //   }
  // }
  // const selectedBank = senderBankAccount.bank_abbrev.toUpperCase();
  const selectedBank = 'DBS'
  return { screenType, xfersBankAccount, topUpAmount, selectedBank }
}

function mapDispatchToProps(dispatch) {
  return {
    selectScreenType: (screenType) => dispatch(selectScreenType(screenType))
  }
}

class Instructions extends Component {
  render() {

    const {
      screenType,
      xfersBankAccount,
      topUpAmount,
      selectedBank,
      selectScreenType,
    } = this.props;

    const {externalBankUrl, bankCommentLabel, bankAcronyms} = getBankSpecifics(selectedBank);

    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader title="Transfer Instructions">
          <Text spHeader>Make a FAST Transfer</Text>
          <Text spBody textAlign="center">To complete your payment, please proceed to make a transfer with the details below</Text>
        </ModalHeader>
        <View spBody>
          <View textAlign="center">
            <Text type="panelSubtitle">Please refer to these instructions while making a bank transfer.</Text>
            { /* screenType === "mobile" ?
              <AnchorLink onClick={() => selectScreenType("desktop")}>Transferring using desktop?</AnchorLink> :
              <AnchorLink onClick={() => selectScreenType("mobile")}>Transferring using mobile?</AnchorLink>
            */}
          </View>
          <View background="#fff" overflow="auto" height="240px" padding="20px" boxShadow="inset 0px 1px 4px #ccc" width="540px">
            {selectedBank === "POSB" && <DBSInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
            {selectedBank === "DBS" && <DBSInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
          </View>
        </View>
        <View spFooter>
          <View marginBottom="10px">
            <Text fontWeight="bold">Note: </Text>
            <Text>
              An admin fee of 1% will be charged on your total amount transferred should you fail to comply with our
              <AnchorLink href="https://xfers.groovehq.com/knowledge_base/topics/when-will-you-incur-admin-fees" target> additional terms and conditions</AnchorLink>.
            </Text>
          </View>
          <FooterButtonGroup>
            <Button type="primary">I have transferred</Button>
          </FooterButtonGroup>
        </View>
      </StickyPanel>
    )
  }
}

// {selectedBank === "UOB" && <UOBInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
// {selectedBank === "OCBC" && <OCBCInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
// {selectedBank === "SCB" && <SCBInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
// {selectedBank === "HSBC" && <HSBCInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
// {selectedBank === "CITI" && <CITIInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
// {selectedBank === "CIMB" && <CIMBInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
// {selectedBank === "BOC" && <BOCInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
// {selectedBank === "MBB" && <MBBInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}


export default connect(mapStateToProps, mapDispatchToProps)(Instructions)
