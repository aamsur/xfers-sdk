import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import NetworkClient from 'NetworkClient'

import AuthenticationFlow from 'AuthenticationFlow'
import ManageBankFlow from 'ManageBankFlow'
import PaymentFlow from 'PaymentFlow'
import TopUpFlow from 'TopUpFlow'
import VerificationFlow from 'VerificationFlow'

import { Modal } from 'XfersComponents'

const TOP_UP_FLOW = 'TOP_UP_FLOW';
const PAYMENT_FLOW = 'PAYMENT_FLOW';
const MANAGE_BANK_FLOW = 'MANAGE_BANK_FLOW';
const AUTHENTICATION_FLOW = 'AUTHENTICATION_FLOW';
const VERIFICATION_FLOW = 'VERIFICATION_FLOW';

function selectFlow(flow) {
  switch(flow) {
    case PAYMENT_FLOW:
      return PaymentFlow
      break;
    case AUTHENTICATION_FLOW:
      return AuthenticationFlow
      break;
    case TOP_UP_FLOW:
      return TopUpFlow
      break;
    case MANAGE_BANK_FLOW:
      return ManageBankFlow
      break;
    case VERIFICATION_FLOW:
      return VerificationFlow
      break;
    default:
      return null;
  }
}

class ModalWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flow: '',
      params: {},
      showModal: false,
    }

    this.networkClient = props.networkClient;
  }

  openModal = (flow, params = {}) =>  this.setState({ flow, params, showModal: true });

  closeModal = () => this.setState({ flow: '', params: {}, showModal: false });

  render() {
    const { flow, params, showModal } = this.state;
    const Element = selectFlow(flow);

    return (
      <Modal showModal={showModal} closeModal={this.closeModal}>
        { Element &&
          <Element
            params={params}
            closeModal={this.closeModal}
            networkClient={this.networkClient}
          />
        }
      </Modal>
    )
  }
}

module.exports = class Xfers {

  constructor(mountingElementId, accessToken, options = {}) {

    if (!mountingElementId)
      throw new Error('Please provide a valid mounting element ID');
    if (!accessToken)
      throw new Error('Please provide a valid access token.');

    const networkClient = new NetworkClient(accessToken);
    this.mountComponent(mountingElementId, networkClient);

  }

  mountComponent = (mountingElementId, networkClient) => {
    this.element = ReactDOM.render(
      React.createElement(ModalWrapper, { networkClient }),
      document.getElementById(mountingElementId)
    );
  }

  startVerificationFlow = () => this.element.openModal(VERIFICATION_FLOW);

  startManageBankFlow = () => this.element.openModal(MANAGE_BANK_FLOW);

  startTopUpFlow = () => this.element.openModal(TOP_UP_FLOW);

  startPaymentFlow = (params) => this.element.openModal(PAYMENT_FLOW, {...params});

  startAuthenticationFlow = () => this.element.openModal(AUTHENTICATION_FLOW);
}
