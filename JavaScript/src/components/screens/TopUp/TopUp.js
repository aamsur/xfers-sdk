import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View } from 'XfersComponents'
import { TopUpIndex, TopUpForm } from './components'
import ManageBank from 'ManageBank'
import { navigate } from 'TopUp/actions'

function mapStateToProps({topUp}, props) {
  const { networkClient, route } = topUp;
  return { networkClient, route }
}

function mapDispatchToProps(dispatch) {
  return {
    navigateBack: () => dispatch(navigate('topUpForm'))
  }
}

class TopUp extends Component {
  render() {
    const { networkClient, route, navigateBack } = this.props;
    return (
      <View>
        { route === 'index' && <TopUpIndex /> }
        { route === 'topUpForm' && <TopUpForm /> }
        { route === 'bank' && <ManageBank networkClient={networkClient} goBack={navigateBack} /> }
      </View>
    )
  }
}

const ConnectedTopUp = connect(mapStateToProps, () => ({}))(TopUp);

const TopUpModal = (props) => (
  <Provider store={createStore(props)}>
    <ConnectedTopUp />
  </Provider>
)

export default TopUpModal
