import React from 'react'
import ReactDOM from 'react-dom'

import {
  ManageBank
} from './components/screens'

module.exports = {
  Element: {
    init: ( mountingElementId, elementType, options = {} ) => {

      let element;
      switch( elementType ) {
        case 'banks':
          element = ManageBank;
          break;
      }

      ReactDOM.render(
        React.createElement(ManageBank),
        document.getElementById(mountingElementId)
      );
    },
  },
  Flow: {
    init: ( mountingElementId, options = {} ) => {

    }
  }
}
