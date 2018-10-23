import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  FormInputGroup,
  Button,
  FooterButtonGroup
} from 'XfersComponents'
import { updateTopUpDetails } from 'TopUp/actions'

function mapStateToProps({topUp}, props) {
  const { newTopUpRequest: { topUpAmount } } = topUp;
  return { topUpAmount, ...props }
}

function mapDispatchToProps(dispatch) {
  return {
    updateForm: (v) => dispatch(updateTopUpDetails("topUpAmount", v)),
  }
}

class TopUpAmount extends Component {
  render() {
    const {
      topUpAmount,
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
            onChange={(e) => updateForm(e.target.value)}
            />
          <View>
            <View display="inline" marginRight="12px">
              <Button size="small" type="secondary" onClick={() => updateForm(100)}>100.00</Button>
            </View>
            <View display="inline" marginRight="12px">
              <Button size="small" type="secondary" onClick={() => updateForm(500)}>500.00</Button>
            </View>
            <View display="inline" marginRight="12px">
              <Button size="small" type="secondary" onClick={() => updateForm(1000)}>1000.00</Button>
            </View>
          </View>
        </View>
        <View spFooter>
          <View marginBottom="10px"><Text>Current Balance: </Text></View>
          <View marginBottom="20px"><Text type="note">Remaining top-up limit:</Text></View>
          <FooterButtonGroup>
            <Button type="primary" disabled={disabled} onClick={goNext}>Next</Button>
          </FooterButtonGroup>
        </View>
      </StickyPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUpAmount)
