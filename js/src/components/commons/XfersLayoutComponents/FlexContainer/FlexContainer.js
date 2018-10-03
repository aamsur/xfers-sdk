import React from 'react';
import PropTypes from 'prop-types';
import classes from './FlexContainer.scss';
import cx from 'classnames';

function FlexContainer({alignment, customClass, children}) {

  let alignmentClass;

  if (alignment) {
    if (alignment.xs) {
      alignmentClass = classes[`${alignment.xs}-xs`];
    }

    if (alignment.sm) {
      alignmentClass = classes[`${alignment.sm}-sm`];
    }

    if (alignment.md) {
      alignmentClass = classes[`${alignment.md}-md`];
    }

    if (alignment.lg) {
      alignmentClass = classes[`${alignment.lg}-lg`];
    }
  }

  let flexContainerClass = cx(customClass, classes.row, {[alignmentClass]: alignment});

  return (
    <div className={flexContainerClass}>
      {children}
    </div>
  );
}

FlexContainer.propTypes = {
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
  customClass: ''
};

export default FlexContainer;
