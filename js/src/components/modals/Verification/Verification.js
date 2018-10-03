import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'
import { IndoPersonalVerification } from './components'

function mapStateToProps(state, props) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

class Verification extends Component {
  render() {
    return (
      <IndoPersonalVerification />
    )
  }
}

const ConnectedVerification = connect(mapStateToProps, mapDispatchToProps)(Verification);

const VerificationModal = (props) => (
  <Provider store={createStore(props)}>
    <ConnectedVerification />
  </Provider>
)

export default VerificationModal
