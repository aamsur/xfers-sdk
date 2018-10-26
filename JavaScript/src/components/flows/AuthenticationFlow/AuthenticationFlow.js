import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import Authentication from 'Authentication'
import {} from 'AuthenticationFlow/actions'

function mapStateToProps({authenticationFlow}, props) {
  return authenticationFlow;
}

function mapDispatchToProps(dispatch) {
  return {}
}

class AuthenticationFlow extends Component {
  render() {
    return (
      <Authentication {...this.props} />
    )
  }
}

const ConnectedAuthenticationFlow = connect(mapStateToProps, mapDispatchToProps)(AuthenticationFlow);

const AuthenticationModal = (props) => (
  <Provider store={createStore(props)}>
    <ConnectedAuthenticationFlow />
  </Provider>
)

export default AuthenticationModal
