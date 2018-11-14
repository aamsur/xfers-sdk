import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import TopUp from 'TopUp'
import {
  navigate,
  initializeComponent,
  updateTopUpDetails,
  submitNewTopUpRequest,
  addUserBank,
  selectBankForAction,
} from 'TopUpFlow/actions'
import { getSelectedBankDetails } from 'TopUpFlow/selectors'

function mapStateToProps({topUpFlow}, props) {
  const selectedBankDetails = getSelectedBankDetails(topUpFlow);
  return { ...topUpFlow, selectedBankDetails }
}

function mapDispatchToProps(dispatch) {
  return {
    init: (successCallback) => dispatch(initializeComponent(successCallback)),

    navigate: (page) => dispatch(navigate(page)),

    updateForm: (k, v) => dispatch(updateTopUpDetails(k, v)),

    submit: (successCallback) => dispatch(submitNewTopUpRequest(successCallback)),

    selectBankForAction: (bankId) => dispatch(selectBankForAction(bankId)),

    addUserBank: (bank) => dispatch(addUserBank(bank))
  }
}

class TopUpFlow extends Component {

  componentDidMount() { this.props.init(() => this.props.navigate('topUpForm')) }

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
