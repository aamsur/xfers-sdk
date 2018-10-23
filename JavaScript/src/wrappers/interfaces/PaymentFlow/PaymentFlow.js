import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import XfersNetwork from '../../helpers/NetworkClient'
import ManageBank from 'ManageBank'

function wrapWithModal(component) {
  return (
    <Modal showModal={showModal} closeModal={closeModal}>
      {component}
    </Modal>
  )
}

class PaymentFlow extends Component {
  constructor(mountingElementId, accessToken, options = {}) {
    super();
    if (!accessToken) throw new Error('Please provide a valid access token.');

    const network = new XfersNetwork("YTB7iBVauTzJ8zyk6cJ3ooTKUGJMQ-SYDPxFNFTDs4E");

    this.state = {
      network,
      showModal: false,
    }
    this.mountComponent(mountingElementId);
  }

  mountComponent(mountingElementId) {
    const network = this.network;
    const props = { ...this.state, closeModal: this.closeModal }
    const componentModal = wrapWithModal(ManageBank);
    ReactDOM.render(React.createElement(componentModal, props), document.getElementById(mountingElementId));
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  createCharge() {
    this.openModal()
  }
}

export default PaymentFlow
