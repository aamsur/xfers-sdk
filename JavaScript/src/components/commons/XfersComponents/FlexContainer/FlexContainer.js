import React from 'react'
import PropTypes from 'prop-types'
import cls from './FlexContainer.scss'
import cx from 'classnames'

function FlexContainer({orientation, alignment, customClass, children}) {

  const flexContainerClasses = cx({
    // Container Alignment Classes
    [cls[`${alignment.xs}-xs`]]: alignment.xs,
    [cls[`${alignment.sm}-sm`]]: alignment.sm,
    [cls[`${alignment.md}-md`]]: alignment.md,
    [cls[`${alignment.lg}-lg`]]: alignment.lg,

    // Orientation
    [cls.row]: orientation === 'horizontal',
    [cls.col]: orientation === 'vertical'
  }, customClass)

  return (
    <div className={flexContainerClasses}>
      {children}
    </div>
  );
}

FlexContainer.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  alignment: PropTypes.shape({
    xs: PropTypes.oneOf([
      'start', 'center', 'end', 'top', 'middle', 'bottom', 'between', 'around', null,
    ]),
    sm: PropTypes.oneOf([
      'start', 'center', 'end', 'top', 'middle', 'bottom', 'between', 'around', null,
    ]),
    md: PropTypes.oneOf([
      'start', 'center', 'end', 'top', 'middle', 'bottom', 'between', 'around', null,
    ]),
    lg: PropTypes.oneOf([
      'start', 'center', 'end', 'top', 'middle', 'bottom', 'between', 'around', null,
    ]),
  }),
  customClass: PropTypes.string
}

FlexContainer.defaultProps = {
  customClass: '',
  orientation: 'horizontal',
  alignment: {}
};

export default FlexContainer
