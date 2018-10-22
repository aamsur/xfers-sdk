import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import classes from './ProgressBar.scss';

const componentPropTypes = {
  className: PropTypes.string,
  topLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  bottomLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  percentage: PropTypes.number,
}

const componentDefaultProps = {
  className: '',
  topLabel: '',
  bottomLabel: '',
  percentage: 75.0
};

function ProgressBar({className, topLabel, bottomLabel, percentage}) {
  let progressWidth = {
    width: `${percentage}%`
  };

  const barClass = cx(classes.bar, {
    [classes.red]: percentage >= 75
  })

  return (
    <div className={cx(classes.progressBar, className)}>
      <label>{topLabel}</label>
      <div className={classes.progress}>
        <div className={barClass} style={progressWidth}></div>
      </div>
      <label>{bottomLabel}</label>
    </div>
  )
};

ProgressBar.propTypes = componentPropTypes;
ProgressBar.defaultProps = componentDefaultProps;

export default ProgressBar;
