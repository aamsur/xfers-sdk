import React, { Component } from 'react'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  FormInputGroup,
  Button,
  FooterButtonGroup
} from 'XfersComponents'
import { toCurrency } from 'UtilityFunctions'

export default class TopUpAmount extends Component {
  render() {
    const {
      availableBalance,
      newTopUpRequest: { topUpAmount },
      updateForm,
      goBack,
      goNext
    } = this.props;

    const disabled = topUpAmount ? false : true

    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader title="Transfer Funds" />
        <View spBody>
          <Text type="panelTitle">Enter top-up amount</Text>
          <FormInputGroup
            autoFocus
            leftAddonContent="SGD"
            placeholder="2000.00"
            value={topUpAmount}
            onChange={(e) => updateForm('topUpAmount', e.target.value)}
            />
          <View>
            <View display="inline" marginRight="12px">
              <Button size="small" type="secondary" onClick={() => updateForm('topUpAmount', 100)}>100.00</Button>
            </View>
            <View display="inline" marginRight="12px">
              <Button size="small" type="secondary" onClick={() => updateForm('topUpAmount', 500)}>500.00</Button>
            </View>
            <View display="inline" marginRight="12px">
              <Button size="small" type="secondary" onClick={() => updateForm('topUpAmount', 1000)}>1000.00</Button>
            </View>
          </View>
        </View>
        <View spFooter>
          <View marginBottom="10px"><Text>Current Balance: {toCurrency(availableBalance)}</Text></View>
          {false && <View marginBottom="20px"><Text type="note">Remaining top-up limit:</Text></View>}
          <FooterButtonGroup>
            <Button type="primary" disabled={disabled} onClick={goNext}>Next</Button>
          </FooterButtonGroup>
        </View>
      </StickyPanel>
    )
  }
}
