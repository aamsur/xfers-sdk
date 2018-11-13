import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import Verification from 'Verification'
import {
  navigate,
  initializeComponent,
} from 'VerificationFlow/actions'

function mapStateToProps({verificationFlow}, props) {
  return verificationFlow;
}

function mapDispatchToProps(dispatch) {
  return {
    init: (successCallback) => dispatch(initializeComponent(successCallback)),

    navigate: (page) => dispatch(navigate(page)),
  }
}

class VerificationFlow extends Component {

  componentDidMount() { this.props.init((page) => this.props.navigate(page)) }

  render() {
    return (
      <Verification {...this.props} />
    )
  }
}

const ConnectedVerificationFlow = connect(mapStateToProps, mapDispatchToProps)(VerificationFlow);

const VerificationModal = (props) => (
  <Provider store={createStore(props)}>
    <ConnectedVerificationFlow />
  </Provider>
)

export default VerificationModal
