import React from 'react'
import PropTypes from 'prop-types'
import cls from './FlexItem.scss'
import cx from 'classnames'

function FlexItem({evenGrowth, size, offset, alignment, customClass, children, content}) {

  const flexItemClasses = cx({
    [cls['col-xs']]: evenGrowth,
    // Size Classes
    [cls[`col-xs-${size.xs}`]]: size.xs,
    [cls[`col-xs-${size.sm}`]]: size.sm,
    [cls[`col-xs-${size.md}`]]: size.md,
    [cls[`col-xs-${size.lg}`]]: size.lg,

    // Offset Classes
    [cls[`col-xs-offset-${offset.xs}`]]: offset.xs,
    [cls[`col-xs-offset-${offset.sm}`]]: offset.sm,
    [cls[`col-xs-offset-${offset.md}`]]: offset.md,
    [cls[`col-xs-offset-${offset.lg}`]]: offset.lg,

    // Alignment Classes
    [cls[`${alignment.xs}-xs`]]: alignment.xs,
    [cls[`${alignment.sm}-xs`]]: alignment.sm,
    [cls[`${alignment.md}-xs`]]: alignment.md,
    [cls[`${alignment.lg}-xs`]]: alignment.lg,
  }, customClass, cls.container);

  return (
    <div className={flexItemClasses}>
      {children || content}
    </div>
  );
}

FlexItem.propTypes = {
  evenGrowth: PropTypes.bool,
  size: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
  }),
  offset: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
  }),
  alignment: PropTypes.shape({
    xs: PropTypes.oneOf([
      'start', 'center', 'end', 'top', 'middle', 'bottom', 'first', 'last', null,
    ]),
    sm: PropTypes.oneOf([
      'start', 'center', 'end', 'top', 'middle', 'bottom', 'first', 'last', null,
    ]),
    md: PropTypes.oneOf([
      'start', 'center', 'end', 'top', 'middle', 'bottom', 'first', 'last', null,
    ]),
    lg: PropTypes.oneOf([
      'start', 'center', 'end', 'top', 'middle', 'bottom', 'first', 'last', null,
    ]),
  }),
  customClass: PropTypes.string
}

FlexItem.defaultProps = {
  customClass: '',
  size: {},
  offset: {},
  alignment: {},
  evenGrowth: false
};

export default FlexItem
