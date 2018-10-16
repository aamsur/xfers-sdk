import React from 'react'
import PropTypes from 'prop-types'
import { FlexContainer, FlexItem } from 'XfersComponents'
import cx from 'classnames'
import cls from './View.scss'

function View({
  layout,
  paddingTop,
  paddingBtm,
  children,
  customClass,
  ...style
}) {
  const containerClasses = cx({
    [cls.templateModal]: layout === 'modal',
    [cls.templateSection]: layout === 'section',
    [cls.paddingTop]: paddingTop,
    [cls.paddingBtm]: paddingBtm,
  }, customClass);

  return (
    <div className={containerClasses} style={style}>
      {children}
    </div>
  )
}

const componentPropTypes = {
  customClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  paddingTop: PropTypes.bool,
  paddingBtm: PropTypes.bool,
  layout: PropTypes.oneOf([
    'section', 'modal'
  ]),
}

const componentDefaultProps = {
  customClass: '',
  paddingTop: false,
  paddingBtm: false,
};

export default View
