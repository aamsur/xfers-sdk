import React from 'react'
import ReactDOM from 'react-dom'

import XfersAPI from 'xfersWrapper.js'

import {
  ManageBank
} from './components/screens'

function selectComponent(name) {
  switch (name) {
    // This interface allow users to manage their bank accounts (index, create, delete)
    case 'bank':
      return ManageBank;
      break;
  }
}

module.exports = class Xfers {
  constructor(accessToken, options = {}) {
    if (!accessToken) throw new Error('Please provide a valid access token.');

    this.network = new XfersAPI(accessToken);
  }

  renderComponent(name) {
    return selectComponent(name);
  }

  mountComponent(mountingElementId, name) {
    const network = this.network;
    const element = selectComponent(name);
    ReactDOM.render(React.createElement(element, { network }), document.getElementById(mountingElementId));
  }
}
