import React from 'react'
import PropTypes from 'prop-types'
import BootstrapFormGroup from 'react-bootstrap/lib/FormGroup'

import cx from 'classnames'
import classes from './FormGroup.scss'
import {Popover} from 'XfersBasicComponents'

function FormGroup({children, className, popover, ...props}) {
  return (
    <div className={classes.formGroup}>
      <BootstrapFormGroup className={cx(className)} {...props}>
        {popover && <Popover customClass={cx(classes.popover, classes.infoLabel)} {...popover} />}
        {children}
      </BootstrapFormGroup>
    </div>
  )
}

export default FormGroup;
