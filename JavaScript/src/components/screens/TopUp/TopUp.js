import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './store'

import { View, Button, Modal } from 'XfersComponents'
import { TopUpForm } from './components'
import { openModal, closeModal } from './actions'

function mapStateToProps({topUp}, props) {
  const { showModal } = topUp;
  return { showModal }
}

function mapDispatchToProps(dispatch) {
  return {
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
  }
}

class TopUp extends Component {
  render() {
    const { showModal, openModal } = this.props;
    return (
      <View>
        <TopUpForm />
        <Modal showModal={showModal} closeModal={closeModal}>

        </Modal>
        <Button onClick={openModal}>Trigger Top Up Modal</Button>
      </View>
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
