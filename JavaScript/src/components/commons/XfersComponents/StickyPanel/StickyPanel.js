import React from 'react'
import PropTypes from 'prop-types'
import cls from './StickyPanel.scss'
import cx from 'classnames'

import xfersPowered from 'XfersPower_SG_115.png'
import { Panel, View, FlexContainer, FlexItem } from 'XfersComponents'

/* COMPONENT USAGE TIPS */
// In order for StickyPanel Header, Body and Footer to function as expected,
// Can either provide "header" & "footer" props
// OR pass in boolean value true to the props "spHeader", "spBody", & "spFooter" respectively
// to indicate respective elements in the children[array].

function StickyPanel({ showBrand, ...elements }) {
  const { header, children, footer } = processElements(elements);
  return (
    <Panel customClass={cls.stickyPanel}>
      <FlexContainer orientation="vertical">
        { header &&
          <FlexItem noSidePadding customClass={cls.noSidePadding}>{header}</FlexItem>
        }

        <FlexItem noSidePadding>
          <View customClass={cls.sidePadding}>{children}</View>
        </FlexItem>

        <FlexItem noSidePadding customClass={cls.stickyPanelFooter}>
          { footer && <View customClass={cls.sidePadding}>{footer}</View> }
          { showBrand && <View customClass={cls.branding}><img src={xfersPowered} /></View> }
        </FlexItem>
      </FlexContainer>
    </Panel>
  );
}

function processElements({ header, footer, children }) {

  if ( !children || !children.length ) return { header, footer, children };

  // If header & footer are passed as children in an array, process the elements;
  let body;
  for ( let i = 0; i < children.length; i++ ) {
    header = (children[i] && children[i].props.spHeader) ? children[i] : header;
    body = (children[i] && children[i].props.spBody) ? children[i] : body;
    footer = (children[i] && children[i].props.spFooter) ? children[i] : footer;
  }
  return { header, footer, children: body }
}

const componentPropTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  showBrand: PropTypes.bool,
}

const componentDefaultProps = {
  showBrand: false
}

StickyPanel.propTypes = componentPropTypes;
StickyPanel.defaultProps = componentDefaultProps;

export default StickyPanel
