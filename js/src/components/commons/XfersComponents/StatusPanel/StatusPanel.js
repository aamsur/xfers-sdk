import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import cls from './StatusPanel.scss'

import pendingLogo from 'icons/Status_Pending_50.png'
import successLogo from 'icons/Status_Success_50.png'
import warningLogo from 'icons/Status_Alert_60.png'

import { Panel, View, Text, FlexContainer, FlexItem } from 'XfersComponents'

/* COMPONENT USAGE TIPS */
// In order for StatusPanel Body and Footer to function as expected,
// Can either provide "footer" props
// OR pass in boolean value true to the props "spBody", & "spFooter" respectively
// to indicate respective elements in the children[array].

function StatusPanel({ type, iconType, title, ...elements }) {

  const { children, footer } = processElements(elements);

  const backgroundClass = cx({
    [cls.primaryBg]: type === 'primary',
    [cls.secondaryBg]: type === 'secondary',
    [cls.tertiaryBg]: type === 'tertiary'
  }, cls.topBackgroundContainer)

  const icon = iconType == "success" ? successLogo :
               iconType == "pending" ? pendingLogo : warningLogo;

  return (
    <Panel customClass={cls.statusPanel}>
      <View customClass={backgroundClass}>
        <View customClass={cls.title}>
          <Text type="modalHeader">{title}</Text>
        </View>
      </View>

      <View customClass={cls.container}>
        <View customClass={cls.card}>
          <View customClass={cls.imgContainer}><img src={icon} /></View>
          <FlexContainer orientation="vertical"  alignment={{ xs: 'center' }}>
            <FlexItem noSidePadding customClass={cls.statusPanelBody}>
              {children}
            </FlexItem>
            <FlexItem noSidePadding customClass={cls.statusPanelFooter}>
              {footer}
            </FlexItem>
          </FlexContainer>
        </View>
      </View>
    </Panel>
  )
}

function processElements({ footer, children }) {

  if ( !children.length ) return { footer, children };

  // If footer is passed as children in an array, process the elements;
  let body;
  for ( let i = 0; i < children.length; i++ ) {
    body = children[i].props.spBody ? children[i] : body;
    footer = children[i].props.spFooter ? children[i] : footer;
  }
  return { footer, children: body }
}

const componentPropTypes = {
  type: PropTypes.oneOf([
    'primary', 'secondary', 'tertiary',
  ]).isRequired,
  iconType: PropTypes.oneOf([
    'success', 'pending', 'warning'
  ]).isRequired
}

const componentDefaultProps = {
  type: 'primary',
  iconType: 'success'
};

StatusPanel.propTypes = componentPropTypes;
StatusPanel.defaultProps = componentDefaultProps;

export default StatusPanel
