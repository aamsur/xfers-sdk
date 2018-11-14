import React, { Component } from 'react'
import getBankSpecifics from './bank_specific_instructions'

import {
  View, Text, Button, ModalHeader,
  AnchorLink, StickyPanel, FooterButtonGroup
} from 'XfersComponents'

import {
  DBSInstructions, UOBInstructions, OCBCInstructions, SCBInstructions,
  HSBCInstructions, CITIInstructions, CIMBInstructions, BOCInstructions, MBBInstructions
} from './components'

export default class Instructions extends Component {
  render() {

    const {
      xfersBankAccount,
      selectedBankDetails,
      closeModal,
      goNext
    } = this.props;

    const selectedBank = selectedBankDetails ? selectedBankDetails.bank_abbrev : '';
    const {externalBankUrl, bankCommentLabel, bankAcronyms} = getBankSpecifics(selectedBank);

    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader onClose={closeModal} title="Transfer Instructions">
          <Text spHeader>Make a FAST Transfer</Text>
          <Text spBody textAlign="center">To complete your payment, please proceed to make a transfer with the details below</Text>
        </ModalHeader>
        <View spBody>
          <View>
            <Text type="panelSubtitle">Please refer to these instructions while making a bank transfer.</Text>
            { /* screenType === "mobile" ?
              <AnchorLink onClick={() => selectScreenType("desktop")}>Transferring using desktop?</AnchorLink> :
              <AnchorLink onClick={() => selectScreenType("mobile")}>Transferring using mobile?</AnchorLink>
            */}
          </View>
          <View>
            {selectedBank === "POSB" && <DBSInstructions xfersBankAccount={xfersBankAccount} />}
            {selectedBank === "DBS" && <DBSInstructions xfersBankAccount={xfersBankAccount} />}
            {selectedBank === "UOB" && <UOBInstructions xfersBankAccount={xfersBankAccount} />}
            {selectedBank === "OCBC" && <OCBCInstructions xfersBankAccount={xfersBankAccount} />}
            {selectedBank === "SCB" && <SCBInstructions xfersBankAccount={xfersBankAccount} />}
            {selectedBank === "HSBC" && <HSBCInstructions xfersBankAccount={xfersBankAccount} />}
            {selectedBank === "CITI" && <CITIInstructions xfersBankAccount={xfersBankAccount} />}
            {selectedBank === "CIMB" && <CIMBInstructions xfersBankAccount={xfersBankAccount} />}
            {selectedBank === "BOC" && <BOCInstructions xfersBankAccount={xfersBankAccount} />}
            {selectedBank === "MBB" && <MBBInstructions xfersBankAccount={xfersBankAccount} />}
          </View>
          <FooterButtonGroup>
            <Button type="primary" onClick={goNext}>I have transferred</Button>
          </FooterButtonGroup>
        </View>
      </StickyPanel>
    )
  }
}
