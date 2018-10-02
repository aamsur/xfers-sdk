import React from 'react';
import PropTypes from 'prop-types';
import classes from './FlexItem.scss';
import cx from 'classnames';

function FlexItem({xSize, offset, alignment, customClass, children, content}) {

  let flexItemClassArray = [customClass, classes['col-xs']];

  if (xSize) {
    if (xSize.xs) {
      flexItemClassArray.push(classes[`col-xs-${xSize.xs}`]);
    }

    if (xSize.sm) {
      flexItemClassArray.push(classes[`col-sm-${xSize.sm}`]);
    }

    if (xSize.md) {
      flexItemClassArray.push(classes[`col-md-${xSize.md}`]);
    }

    if (xSize.lg) {
      flexItemClassArray.push(classes[`col-lg-${xSize.lg}`]);
    }
  }

  if (offset) {
    if (offset.xs) {
      flexItemClassArray.push(classes[`col-xs-offset-${offset.xs}`]);
    }

    if (offset.sm) {
      flexItemClassArray.push(classes[`col-sm-offset-${offset.sm}`]);
    }

    if (offset.md) {
      flexItemClassArray.push(classes[`col-md-offset-${offset.md}`]);
    }

    if (offset.lg) {
      flexItemClassArray.push(classes[`col-lg-offset-${offset.lg}`]);
    }
  }

  if (alignment) {
    if (alignment.xs) {
      flexItemClassArray.push(classes[`${alignment.xs}-xs`]);
    }

    if (alignment.sm) {
      flexItemClassArray.push(classes[`${alignment.sm}-sm`]);
    }

    if (alignment.md) {
      flexItemClassArray.push(classes[`${alignment.md}-md`]);
    }

    if (alignment.lg) {
      flexItemClassArray.push(classes[`${alignment.lg}-lg`]);
    }
  }

  return (
    <div className={cx(flexItemClassArray)}>
      {children || content}
    </div>
  );
}

FlexItem.propTypes = {
  xSize: PropTypes.shape({
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
  customClass: ''
};

export default FlexItem;
