import React, { Component } from 'react'
import {
  StickyPanel,
  ModalHeader,
  View,
  FooterButtonGroup,
  Button,
  Text,
  CenterContent,
} from 'XfersComponents'

export default class BankAccountCheck extends Component {
  render() {
    const {
      closeModal,
      goNext
    } = this.props;

    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader onClose={closeModal} title="Bank Accounts" />
        <View spBody paddingTop="40px">
          <CenterContent>
            <Button block type="primary" onClick={goNext}>Add bank account</Button>
          </CenterContent>
        </View>
      </StickyPanel>
    )
  }
}
