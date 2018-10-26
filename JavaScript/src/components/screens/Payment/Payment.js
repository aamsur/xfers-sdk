import React, { Component } from 'react'
import {
  StickyPanel,
  ModalHeader,
  View,
  CenterContent,
  PageLoader
} from 'XfersComponents'
import { PaymentSteps } from './components'
import TopUp from 'TopUp'

export default class Payment extends Component {
  render() {
    const {
      params,
      route,
      networkClient,
      closeModal,
      ...paymentStore
    } = this.props;

    const topUpParams = {
      ...params,
      flowType: 'payment'
    }

    return (
      <View>
        { route === '' &&
          <StickyPanel showBrand>
            <ModalHeader spHeader onClose={closeModal} title="Make Payment" />
              <View spBody>
                <CenterContent>
                  <PageLoader />
                </CenterContent>
              </View>
          </StickyPanel>
        }
        { route === 'payment' && <PaymentSteps {...paymentStore} params={params} closeModal={closeModal} /> }
        { route === 'topup' &&
          <TopUp
            params={topUpParams}
            closeModal={closeModal}
            networkClient={networkClient}
            />
        }
      </View>
    )
  }
}
