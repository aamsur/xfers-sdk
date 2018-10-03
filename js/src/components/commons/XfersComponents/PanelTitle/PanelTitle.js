import React from 'react'
import PropTypes from 'prop-types'
import cls from './PanelTitle.scss'
import cx from 'classnames'

function PanelTitle({
  children,
  onClick,
  customClass,
  caption
}) {

  const panelTitleClass = cx({
    [cls.clickable]: onClick
  }, cls.panelTitle, customClass)

  return (
    <div className={panelTitleClass} onClick={onClick}>
      <h4>{children}</h4>
      {caption}
    </div>
  )
}

const componentPropTypes = {
  customClass: PropTypes.string,
  onClick: PropTypes.func,
  caption: PropTypes.node,
  children: PropTypes.node.isRequired
}

const componentDefaultProps = {
  customClass: '',
};

PanelTitle.propTypes = componentPropTypes;
PanelTitle.defaultProps = componentDefaultProps;

export default PanelTitle
