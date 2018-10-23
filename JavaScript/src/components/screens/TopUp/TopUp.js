import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View } from 'XfersComponents'
import { TopUpIndex, TopUpForm } from './components'

function mapStateToProps({topUp}, props) {
  const { route } = topUp;
  return { route }
}

class TopUp extends Component {
  render() {
    const { showModal, openModal, route } = this.props;
    return (
      <View>
        { route === 'index' && <TopUpIndex /> }
        { route === 'topUpForm' && <TopUpForm /> }
      </View>
    )
  }
}

const ConnectedTopUp = connect(mapStateToProps, () => ({}))(TopUp);

const TopUpModal = ({ closeModal, networkClient }) => (
  <Provider store={createStore({networkClient})}>
    <ConnectedTopUp closeModal={closeModal} />
  </Provider>
){

export default TopUpModal
