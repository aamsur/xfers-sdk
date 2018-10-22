import React from 'react'
import PropTypes from 'prop-types'
import BootstrapCollapse from 'react-bootstrap/lib/Collapse'

const componentPropTypes = {
  open: PropTypes.bool
}

const componentDefaultProps = {
  open: false
};

function Accordion({open, children}) {
  return (
    <BootstrapCollapse in={open}>
      <div>
        {children}
      </div>
    </BootstrapCollapse>
  )
}

Accordion.propTypes = componentPropTypes;
Accordion.defaultProps = componentDefaultProps;

export default Accordion
