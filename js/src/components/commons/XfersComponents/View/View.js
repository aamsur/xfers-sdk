import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import cls from './View.scss'

function View({
  layout,
  paddingTop,
  paddingBtm,
  children,
  customClass,
  onClick,
  ...style
}) {
  const containerClasses = cx({
    [cls.templateSection]: layout === 'section',
    [cls.paddingTop]: paddingTop,
    [cls.paddingBtm]: paddingBtm,
  }, customClass);

  return (
    <div className={containerClasses} style={style} onClick={onClick}>
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
    'section'
  ]),
  onClick: PropTypes.func
}

const componentDefaultProps = {
  customClass: '',
  paddingTop: false,
  paddingBtm: false,
};

export default View
