import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import TopUp from 'TopUp'
import {
  navigate,
  initializeComponent,
  updateTopUpDetails,
  submitNewTopUpRequest,
  selectScreenType,
  addUserBank
} from 'TopUpFlow/actions'

function mapStateToProps({topUpFlow}, props) {
  return topUpFlow;
}

function mapDispatchToProps(dispatch) {
  return {
    init: (successCallback) => dispatch(initializeComponent(successCallback)),

    navigate: (page) => dispatch(navigate(page)),

    updateForm: (k, v) => dispatch(updateTopUpDetails(k, v)),

    submit: (successCallback) => dispatch(submitNewTopUpRequest(successCallback)),

    selectScreenType: (screenType) => dispatch(selectScreenType(screenType)),

    addUserBank: (bank) => dispatch(addUserBank(bank))
  }
}

class TopUpFlow extends Component {

  componentDidMount() { this.props.init((page) => this.props.navigate(page)) }

  render() {
    return (
      <TopUp {...this.props} />
    )
  }
}

const ConnectedTopUpFlow = connect(mapStateToProps, mapDispatchToProps)(TopUpFlow);

const TopUpModal = (props) => (
  <Provider store={createStore(props)}>
    <ConnectedTopUpFlow />
  </Provider>
)

export default TopUpModal
