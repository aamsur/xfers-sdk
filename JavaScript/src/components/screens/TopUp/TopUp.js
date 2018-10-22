import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

function mapStateToProps(state, props) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

class TopUp extends Component {
  render() {
    return (
      <div></div>
    )
  }
}

const ConnectedTopUp = connect(mapStateToProps, mapDispatchToProps)(TopUp);

const TopUpModal = (props) => (
  <Provider store={createStore(props)}>
    <ConnectedTopUp />
  </Provider>
)

export default TopUpModal
