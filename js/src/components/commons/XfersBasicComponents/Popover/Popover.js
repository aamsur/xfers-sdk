import React from 'react'
import PropTypes from 'prop-types'
import BootstrapPopover from 'react-bootstrap/lib/Popover'
import BootstrapOverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'

import cx from 'classnames'
import classes from './Popover.scss';

const componentPropTypes = {
  customClass: PropTypes.string,
  label: PropTypes.node,
  message: PropTypes.string,
  placement: PropTypes.oneOf([
    'top', 'right', 'bottom', 'left',
  ])
}

const componentDefaultProps = {
  customClass: '',
  label: '?',
  message: '',
  placement: 'right',
};

function Popover({customClass, label, message, placement}) {
  const popoverDOM = (
    <BootstrapPopover className={classes.popover} id={`popover-positioned-${placement}`}>
      {message}
    </BootstrapPopover>
  );

  return (
    <BootstrapOverlayTrigger trigger={["hover","focus"]} placement={placement} overlay={popoverDOM}>
      <span className={customClass}>{label}</span>
    </BootstrapOverlayTrigger>
  )
}

Popover.propTypes = componentPropTypes;
Popover.defaultProps = componentDefaultProps;

export default Popover
