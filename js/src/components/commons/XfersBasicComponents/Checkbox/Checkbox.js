import React from 'react'
import PropTypes from 'prop-types'
import BootstrapCheckbox from 'react-bootstrap/lib/Checkbox'

import cx from 'classnames'
import cls from './Checkbox.scss'
import checkedIcon from 'icons/Checkbox_White_Tick.png'

const componentPropTypes = {
  customClass: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  checked: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  light: PropTypes.bool,
}

const componentDefaultProps = {
  title: '',
  customClass: '',
  checked: false,
  disabled: false,
  readOnly: false,
  light: false,
}


function Checkbox({
  title, light, checked, customClass, ...props
}) {
  return (
    <BootstrapCheckbox bsClass={
        cx({
          [cls.checked]: checked,
          [cls.light]: light,
        }, cls.checkbox, customClass)} {...props}>
      <span className={cls.box}><div className={cls.circle}>{checked && <img src={checkedIcon} />}</div></span>
      <span className={cls.label}>{title}</span>
    </BootstrapCheckbox>
  )
}

Checkbox.propTypes = componentPropTypes;
Checkbox.defaultProps = componentDefaultProps;

export default Checkbox
