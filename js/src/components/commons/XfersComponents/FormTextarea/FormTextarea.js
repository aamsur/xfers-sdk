import React from 'react';
import PropTypes from 'prop-types';
import BootstrapControlLabel from 'react-bootstrap/lib/ControlLabel';
import BootstrapHelpBlock from 'react-bootstrap/lib/HelpBlock';
import BootstrapFormControl from 'react-bootstrap/lib/FormControl';
import {FormGroup} from 'XfersComponents';

import classes from './FormTextarea.scss';

const componentPropTypes = {
  size: PropTypes.oneOf([
    'small', 'large',
  ]),
  className: PropTypes.string, // This classes will be applied on FormGroup Component
  label: PropTypes.string, // This label is to describe the form input
  helpBlock: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  /*
   * FormGroup Props **************************
   */
  controlId: PropTypes.string,
  validationState: PropTypes.oneOf([
    'success', 'warning', 'error', null,
  ]),
  /*
   * FormControl Props **************************
   */
   value: PropTypes.oneOfType([
     PropTypes.string,
     PropTypes.number,
   ]),
   defaultValue: PropTypes.oneOfType([
     PropTypes.string,
     PropTypes.number,
   ]),
   placeholder: PropTypes.string,
   onChange: PropTypes.func,
   inputRef: PropTypes.func,
   componentClass: PropTypes.string,
};

const componentDefaultProps = {
  className: '',
  disabled: false,
  rows: '8',
  cols: '40',
  componentClass: 'textarea',
};


function FormTextarea({size, label, helpBlock, className, controlId, validationState, ...formControlProps}) {
  const formGroupProps = {controlId, validationState, className};

  if (size) {
    formGroupProps.bsSize = size;
  }

  let labelDOM = null;
  if (label) {
    labelDOM = (<BootstrapControlLabel>{label}</BootstrapControlLabel>);
  }

  let helpBlockDOM = null;
  if (helpBlock) {
    helpBlockDOM = (<BootstrapHelpBlock>{helpBlock}</BootstrapHelpBlock>);
  }

  return (
    <div className={classes.formTextarea}>
      <FormGroup {...formGroupProps}>
        {labelDOM}
        <BootstrapFormControl {...formControlProps} />
        <BootstrapFormControl.Feedback />
        {helpBlockDOM}
      </FormGroup>
    </div>
  );
}

FormTextarea.propTypes = componentPropTypes;
FormTextarea.defaultProps = componentDefaultProps;

export default FormTextarea;
