import React, { Component } from 'react'
import {
  StickyPanel,
  ModalHeader,
  View,
  CenterContent,
  PageLoader
} from 'XfersComponents'
import { TopUpForm } from './components'
import ManageBank from 'ManageBank'

export default class TopUp extends Component {
  render() {

    const {
      route,
      networkClient,
      closeModal,
      navigateBack,
      ...topUpStore
    } = this.props;

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
        { route === 'topUpForm' && <TopUpForm {...topUpStore} closeModal={closeModal} /> }
        { route === 'bank' &&
          <ManageBank
            networkClient={networkClient}
            goBackPreviousModule={navigateBack} />
        }
      </View>
    )
  }
}
