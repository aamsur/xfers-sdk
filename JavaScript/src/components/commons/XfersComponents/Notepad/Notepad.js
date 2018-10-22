import React from 'react'
import PropTypes from 'prop-types'
import cls from './Notepad.scss'
import cx from 'classnames'

const componentPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  customClass: PropTypes.string,
}

function Notepad({header, children, customClass}) {
  return (
    <div className={cls.notepadContainer}>
      <div className={cx(customClass, cls.notepad)}>
        {children}
      </div>
    </div>
  );
}

Notepad.propTypes = componentPropTypes;

export default Notepad
