import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Panel, ModalHeader, SectionContainer, SelectionButton } from 'XfersComponents'
import xfersLogo from 'xfersLogo.png'

import Xfers from 'Xfers'

class BankTypeList extends Component {

  constructor() {
    super();
    const xfers = new Xfers()
  }

  componentWillMount() {

  }

  render() {
    return (
      <Panel>
        <ModalHeader title="IDENTITY VERIFICATION">
          <View textAlign="center">Please prepare your KTP for the following steps.</View>
        </ModalHeader>
        <SectionContainer paddingBtm>
          <SelectionButton image={xfersLogo} title="Development Bank of Singapore (DBS)" />
        </SectionContainer>
      </Panel>
    )
  }
}

export default BankTypeList
