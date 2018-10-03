import React from 'react'
import PropTypes from 'prop-types'
import classes from './FormComponentGroup.scss'

function FormComponentGroup({children, className}) {
  return (
    <div className={classes.formComponentGroup}>
      {children}
    </div>
  )
}

export default FormComponentGroup;
