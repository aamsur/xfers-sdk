import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import cls from './FooterButtonGroup.scss'

import {Button, FlexContainer, FlexItem} from 'XfersComponents'

const componentPropTypes = {
  customClass: PropTypes.string,
}

const componentDefaultProps = {
  customClass: '',
}

function FooterButtonGroup({customClass, children}) {

  const count = React.Children.count(children);

  return (
    <FlexContainer>
      {count == 1 && <ButtonItem customClass={customClass} btnNode={children} />}
      {count > 1 && children.map((btnNode, index) => {
        if (btnNode) return <ButtonItem key={index} customClass={customClass} btnNode={btnNode} />
      })}
    </FlexContainer>
  )
}

function ButtonItem({customClass, btnNode}) {
  return (
    <FlexItem evenGrowth customClass={cx(customClass, cls.footerButtonGroup)}>
      {React.cloneElement(btnNode, {block: true})}
    </FlexItem>
  );
}

FooterButtonGroup.propTypes = componentPropTypes;
FooterButtonGroup.defaultProps = componentDefaultProps;

export default FooterButtonGroup
