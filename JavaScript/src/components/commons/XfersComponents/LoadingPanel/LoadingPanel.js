import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  StickyPanel,
  ModalHeader,
  View,
  CenterContent,
  PageLoader
} from 'XfersComponents'

function LoadingPanel({ onClose, title }) {

  return (
    <StickyPanel showBrand>
      <ModalHeader spHeader onClose={onClose} title={title} />
        <View spBody>
          <CenterContent>
            <PageLoader />
          </CenterContent>
        </View>
    </StickyPanel>
  )
}

const componentPropTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
}

const componentDefaultProps = {};

LoadingPanel.propTypes = componentPropTypes;
LoadingPanel.defaultProps = componentDefaultProps;

export default LoadingPanel
