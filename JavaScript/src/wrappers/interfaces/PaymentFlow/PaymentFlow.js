import React, { Component, PureComponent } from 'react'
import ReactDOM from 'react-dom'
import NetworkClient from 'NetworkClient'

import Payment from 'Payment'
import { Modal } from 'XfersComponents'

export default class PaymentFlow extends Component {
  constructor(mountingElementId, accessToken, options = {}) {
    super();
    if (!mountingElementId) throw new Error('Please provide a valid mounting element ID');
    if (!accessToken) throw new Error('Please provide a valid access token.');

      const networkClient = new NetworkClient("YTB7iBVauTzJ8zyk6cJ3ooTKUGJMQ-SYDPxFNFTDs4E");

    this.networkClient = networkClient;
    this.mountingElementId = mountingElementId;
  }

  startPaymentFlow = () => {
    if (this.element) {
      this.element.openModal();
    } else {
      this.element = ReactDOM.render(
        React.createElement(ModalWrapper, { networkClient: this.networkClient }),
        document.getElementById(this.mountingElementId)
      );
    }
  }
}


class ModalWrapper extends PureComponent {

  constructor(props) {
    super(props);
    this.state = { showModal: true }
  }

  openModal = () => {
    this.setState({ showModal: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { showModal } = this.state;
    const { networkClient } = this.props;
    return (
      <Modal showModal={showModal} closeModal={this.closeModal}>
        <Payment
          networkClient={networkClient}
          closeModal={this.closeModal}
          />
      </Modal>
    )
  }
}
