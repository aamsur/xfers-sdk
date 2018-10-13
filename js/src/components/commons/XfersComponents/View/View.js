import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import cls from './View.scss'


function View({
  centerText,
  paddingTop, paddingBtm,
  noLeftPadding, noRightPadding,
  noTopMargin, noBottomMargin,
  children, className, ...style
}) {

  // const containerClasses = cx({
  //   [cls.centerText]: centerText,
  //   [cls.paddingTop]: paddingTop,
  //   [cls.paddingBtm]: paddingBtm,
  //   [cls.noTopMargin]: noTopMargin,
  //   [cls.noBottomMargin]: noBottomMargin,
  //   [cls.noLeftPadding]: noLeftPadding,
  //   [cls.noRightPadding]: noRightPadding
  // }, cls.container, customClass);
  //
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

export default View
