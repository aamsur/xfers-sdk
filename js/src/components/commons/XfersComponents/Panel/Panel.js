import React from 'react'
import PropTypes from 'prop-types'
import cls from './Panel.scss'
import cx from 'classnames'

const componentPropTypes = {
  header: PropTypes.node,
  customClass: PropTypes.string,
}

function Panel({header, children, customClass}) {
  return (
    <div className={cx(customClass, cls.panel)}>
      {header && <div className={cls.panelHeader}>{header}</div>}
      <div>{children}</div>
    </div>
  );
}

Panel.propTypes = componentPropTypes;

export default Panel
