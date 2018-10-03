import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import cls from './SectionContainer.scss'

function SectionContainer({
  children,
  centerText,
  minHeight,
  paddingTop, paddingBtm,
  noLeftPadding, noRightPadding,
  noTopMargin, noBottomMargin,
  customClass
}) {

  const containerClasses = cx({
    [cls.centerText]: centerText,
    [cls.paddingTop]: paddingTop,
    [cls.paddingBtm]: paddingBtm,
    [cls.noTopMargin]: noTopMargin,
    [cls.noBottomMargin]: noBottomMargin,
    [cls.noLeftPadding]: noLeftPadding,
    [cls.noRightPadding]: noRightPadding
  }, cls.container, customClass);

  const containerStyle = minHeight && {minHeight};

  return (
    <div style={containerStyle} className={containerClasses}>
      {children}
    </div>
  );
}

const componentPropTypes = {
  minHeight: PropTypes.string,
  customClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  centerText: PropTypes.bool,
  paddingTop: PropTypes.bool,
  paddingBtm: PropTypes.bool,
  noTopMargin: PropTypes.bool,
  noBottomMargin: PropTypes.bool,
  noLeftPadding: PropTypes.bool,
  noRightPadding: PropTypes.bool,
}

const componentDefaultProps = {
  customClass: '',
  centerText: false,
  paddingTop: false,
  paddingBtm: false,
  noTopMargin: false,
  noBottomMargin: false,
  noLeftPadding: false,
  noRightPadding: false,
};

SectionContainer.propTypes = componentPropTypes;
SectionContainer.defaultProps = componentDefaultProps;

export default SectionContainer
