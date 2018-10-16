import React from 'react'
import PropTypes from 'prop-types'
import cls from './Title.scss'
import cx from 'classnames'

function Title({
  children,
  onClick,
  customClass,
  caption,
  type
}) {

  const titleClass = cx({
    [cls.panelTitle]: type === 'panel',
    [cls.sectionTitle]: type === 'section',
    [cls.formTitle]: type === 'form',
    [cls.clickable]: onClick
  }, customClass)

  return (
    <div className={titleClass} onClick={onClick}>
      <span>{children}</span>
      {caption}
    </div>
  )
}

const componentPropTypes = {
  customClass: PropTypes.string,
  onClick: PropTypes.func,
  caption: PropTypes.node,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['panel', 'section', 'form'])
}

const componentDefaultProps = {
  customClass: '',

};

Title.propTypes = componentPropTypes;
Title.defaultProps = componentDefaultProps;

export default Title
