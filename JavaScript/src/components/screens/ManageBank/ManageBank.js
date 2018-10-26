import React, { Component } from 'react'
import {
  StickyPanel,
  ModalHeader,
  View,
  CenterContent,
  PageLoader
} from 'XfersComponents'
import { BankAccountIndex, NewBankAccountForm } from './components'


export default class ManageBank extends Component {
  render() {
    const { route, closeModal, ...manageBankStore } = this.props;
    return (
      <View>
        { route === '' &&
          <StickyPanel showBrand>
            <ModalHeader spHeader onClose={closeModal} title="Bank Accounts" />
              <View spBody>
                <CenterContent>
                  <PageLoader />
                </CenterContent>
              </View>
          </StickyPanel>
        }
        { route === 'index' && <BankAccountIndex {...manageBankStore} closeModal={closeModal} /> }
        { route === 'new' && <NewBankAccountForm {...manageBankStore} closeModal={closeModal} /> }
      </View>

    )
  }
}
