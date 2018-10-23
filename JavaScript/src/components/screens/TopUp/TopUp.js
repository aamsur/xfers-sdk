import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View, Button, Modal } from 'XfersComponents'
import { TopUpIndex, TopUpForm } from './components'
import { openModal, closeModal } from './actions'

function mapStateToProps({topUp}, props) {
  const { showModal, route } = topUp;
  return { showModal, route }
}

function mapDispatchToProps(dispatch) {
  return {
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
  }
}

class TopUp extends Component {
  render() {
    const { showModal, openModal, route } = this.props;
    return (
      <View>
        { route === 'index' && <TopUpIndex /> }
        { route === 'topUpForm' && <TopUpForm /> }
        <Modal showModal={showModal} closeModal={closeModal}>

        </Modal>
        <Button onClick={openModal}>Trigger Top Up Modal</Button>
      </View>
    )
  }
}

const ConnectedTopUp = connect(mapStateToProps, mapDispatchToProps)(TopUp);

const TopUpModal = ({ closeModal, networkClient }) => {
  return (
    <Provider store={createStore()}>
      <ConnectedTopUp />
    </Provider>
  )
}

export default TopUpModal
