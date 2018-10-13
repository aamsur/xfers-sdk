import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import classes from './FormTitle.scss';

function FormTitle({children, className}) {
  return (
    <label className={cx(classes.title, className)}>{children}</label>
  )
}

export default FormTitle;
