import React, { Component } from 'react'
import { View, LoadingPanel, Stepper } from 'XfersComponents'
import {
  PendingVerification,
  VerificationIndex,
  InfoSharingStatus,
  InfoSharingPermission
} from './components'

export default class Verification extends Component {
  render() {
    const { route, networkClient, closeModal } = this.props;
    return (
      <View>
        { route === '' && <LoadingPanel title="Identity Verification" onClose={closeModal} /> }
        { route === 'index' &&
          <Stepper>
            <InfoSharingPermission {...this.props} />
            <InfoSharingStatus {...this.props} />
          </Stepper>
        }
      </View>
    )
  }
}
