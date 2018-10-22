import React from 'react'
import PropTypes from 'prop-types'
import cls from './Panel.scss'
import cx from 'classnames'

const componentPropTypes = {
  customClass: PropTypes.string,
}

function Panel({children, customClass}) {
  return (
    <div className={cx(customClass, cls.panel)}>
      {children}
    </div>
  );
}

Panel.propTypes = componentPropTypes;

export default Panel
