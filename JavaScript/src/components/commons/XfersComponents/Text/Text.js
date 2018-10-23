import React from 'react'
import PropTypes from 'prop-types'
import cls from './Text.scss'
import cx from 'classnames'

function Text({
  children,
  customClass,
  type,
  ...style
}) {

  const titleClass = cx({
    [cls.error]: type === 'error',
    [cls.note]: type === 'note',
    [cls.modalHeader]: type === 'modalHeader',
    [cls.panelTitle]: type === 'panelTitle',
    [cls.label]: type === 'label',
    [cls.boldValue]: type === 'boldValue',
  }, customClass)

  return (
    <span className={titleClass} style={style}>
      {children}
    </span>
  )
}

const componentPropTypes = {
  customClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    'error', 'note', 'modalHeader', 'panelTitle', 'label', 'boldValue'
  ])
}

const componentDefaultProps = {
  customClass: '',

};

Text.propTypes = componentPropTypes;
Text.defaultProps = componentDefaultProps;

export default Text
