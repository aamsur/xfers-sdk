import React, { Component } from 'react'
import {
  StickyPanel,
  ModalHeader,
  View,
  FooterButtonGroup,
  Button,
  Text,
  TwoColsRowBar,
  AnchorLink
} from 'XfersComponents'
import documentIcon from 'icons/Document_50.png'

export default class VerifiedBankAccountCheck extends Component {
  render() {
    const {
      closeModal,
      goNext
    } = this.props;

    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader onClose={closeModal} title="Bank Accounts" />
        <View spBody>
          <Text type="panelTitle">
            A verified bank account is required to proceed, please prepare the following documents for verification of your bank account
          </Text>
          <TwoColsRowBar
            noBottomMargin
            leftColProps={{
              size: { sm: 3, md: 2 },
              content: <img src={documentIcon} />
            }}
            rightColProps={{
              content: (
                <View>
                  <Text type="boldValue">Bank Statement</Text>
                  <View margin="8px 0"><Text fontWeight="500">A Valid Bank Statement includes:</Text></View>

                  <ol style={{paddingLeft: "15px"}}>
                    <li>Bank Logo</li>
                    <li>Statement of Account</li>
                    <li>Date</li>
                    <li>Name and Address</li>
                    <li>Account Number</li>
                    <li>Footer</li>
                  </ol>
                  <View><Text>Please ensure document was issued within the last 3 months.</Text></View>
                  <br/>
                  <View><AnchorLink href="https://xfershelp.zendesk.com/hc/en-us/articles/360002335071" target>Don't have a bank statement?</AnchorLink></View>
                  <br/>
                  <Text type="blur">You may choose to hide or blur out any optional information but cropping of document is strictly not allowed.</Text>
                </View>
              )
            }}
          />
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" onClick={goNext}>Add bank account</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}
