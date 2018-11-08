import React from 'react'
import PropTypes from 'prop-types'
import cls from './Panel.scss'
import cx from 'classnames'

const componentPropTypes = {
  customClass: PropTypes.string,
}

function Panel({children, blueBg, customClass}) {

  const panelClass = cx({
    [cls.blueBg]: blueBg,
  }, customClass, cls.panel)

  return (
    <div className={panelClass}>
      {children}
    </div>
  );
}

Panel.propTypes = componentPropTypes;

export default Panel
