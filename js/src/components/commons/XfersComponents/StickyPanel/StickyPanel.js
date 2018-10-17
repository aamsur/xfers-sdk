import React from 'react'
import PropTypes from 'prop-types'
import cls from './StickyPanel.scss'
import cx from 'classnames'

import xfersPowered from 'XfersPower_SG_115.png'
import { Panel, View, FlexContainer, FlexItem } from 'XfersComponents'

function StickyPanel({header, children, footer, showBrand}) {
  return (
    <Panel customClass={cls.stickyPanel}>
      <FlexContainer orientation="vertical">
        { header &&
          <FlexItem customClass={cls.noSidePadding}>{header}</FlexItem>
        }

        <FlexItem customClass={cls.noSidePadding}>
          <View customClass={cls.sidePadding}>{children}</View>
        </FlexItem>

        <FlexItem customClass={cx(cls.noSidePadding, cls.stickyPanelFooter)}>
          { footer && <View customClass={cls.sidePadding}>{footer}</View> }
          { showBrand && <View customClass={cls.branding}><img src={xfersPowered} /></View> }
        </FlexItem>
      </FlexContainer>
    </Panel>
  );
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
