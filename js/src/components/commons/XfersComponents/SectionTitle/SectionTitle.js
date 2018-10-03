import React from 'react'
import PropTypes from 'prop-types'
import cls from './SectionTitle.scss'
import cx from 'classnames'

function SectionTitle({
  customClass,
  children,
  onClick
}) {

  const sectionTitleClass = cx({
    [cls.clickable]: onClick
  }, cls.sectionTitle, customClass)

  return (
    <div className={sectionTitleClass} onClick={onClick}>
      {children}
    </div>
  )
}

const componentPropTypes = {
  customClass: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

const componentDefaultProps = {
  customClass: '',
};

SectionTitle.propTypes = componentPropTypes;
SectionTitle.defaultProps = componentDefaultProps;

export default SectionTitle
