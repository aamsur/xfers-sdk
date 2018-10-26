import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View } from 'XfersComponents'
import TopUp from 'TopUp'

import {
  navigate,
  initializeComponent,
  updateTopUpDetails,
  submitNewTopUpRequest,
  selectScreenType
} from 'TopUpFlow/actions'

function mapStateToProps({topUpFlow}, props) {
  return topUpFlow;
}

function mapDispatchToProps(dispatch) {
  return {
    init: (successCallback) => dispatch(initializeComponent(successCallback)),
    navigateToPage: (page) => dispatch(navigate(page)),
    navigateBack: () => dispatch(navigate('topUpForm')),
    updateForm: (k, v) => dispatch(updateTopUpDetails(k, v)),
    navigateToManageBank: () => dispatch(navigate("bank")),
    submit: (successCallback) => dispatch(submitNewTopUpRequest(successCallback)),
    selectScreenType: (screenType) => dispatch(selectScreenType(screenType))
  }
}

class TopUpFlow extends Component {

  componentDidMount() {
    const callback = (page) => {
      this.props.navigateToPage(page);
    }
    this.props.init(callback);
  }

  render() {
    const { navigateBack, ...topUpStore } = this.props;
    return (
      <View>
        <TopUp
          {...topUpStore}
          navigateBack={navigateBack}
        />
      </View>
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
