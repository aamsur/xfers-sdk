import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import classes from './FormLabel.scss';

function FormLabel({children, className}) {
  return (
    <label className={cx(classes.label, className)}>{children}</label>
  )
}

export default FormLabel;
